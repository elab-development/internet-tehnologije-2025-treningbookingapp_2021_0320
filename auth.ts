import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        console.log("LOGIN ATTEMPT:", { email, password });

        if (!email || !password) {
            console.log("MISSING EMAIL OR PASSWORD");
            return null;
        }

        const user = await prisma.user.findUnique({ where: { email } });
        console.log("USER FOUND:", user);
        if (!user){
            console.log("NO USER FOUND FOR EMAIL:", email);
            return null;
        } 

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("PASSWORD MATCH RESULT:", passwordMatch);
        if (!passwordMatch){

            console.log("PASSWORD DID NOT MATCH");
            return null;
        } 

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = (user as { role: string }).role;
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) session.user.role = token.role as string;
      return session;
    },
  },
});
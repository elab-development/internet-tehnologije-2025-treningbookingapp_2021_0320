import { NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../../lib/prisma"

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {name, email, password} = body;

        if(!name || !email || !password) {
            return NextResponse.json(
                {error: "Nisu uneti svi parametri."},
                {status: 400},
            );
        }

        const existing = await prisma.user.findUnique({
            where: {email},
        });

        if(existing) {
            return NextResponse.json(
                {error: "Korisnik sa ovim mejlom vec postoji!"},
                {status: 400},
            );
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPass,
                role: 'USER'
            },
        });

        return NextResponse.json({
            message: "User created!",
            user: {id: newUser.id, name: newUser.name, email: newUser.email}
        },
           {status: 200}
    );

    }
        catch (error) {
        console.error("Greška na serveru prilikom registracije:", error);
        return NextResponse.json(
            { error: "Došlo je do greške na serveru." },
            { status: 500 }
        );
    }
}
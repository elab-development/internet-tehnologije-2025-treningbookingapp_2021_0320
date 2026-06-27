/* eslint-disable prefer-const */
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Next.js u razvoju često osvežava kod, ovo sprečava da napravimo 100 konekcija ka bazi i zagušimo je
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Inicijalizujemo adapter SAMO ako Prisma već ne postoji
let prisma: PrismaClient;

if (!globalForPrisma.prisma) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  globalForPrisma.prisma = new PrismaClient({ adapter });
}

prisma = globalForPrisma.prisma;

export default prisma;



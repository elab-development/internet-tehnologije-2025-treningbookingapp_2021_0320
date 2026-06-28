import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.review.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.court.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log("Obrisani stari podaci, upisujemo nove...");

  const hashedPassword1 = await bcrypt.hash("password123", 10);
  const hashedPassword2 = await bcrypt.hash("adminpassword", 10);
  const hashedPassword3 = await bcrypt.hash("ownerpassword", 10);

  const user1 = await prisma.user.create({
    data: {
      name: "Ivana Igrač",
      email: "ivana@mail.com",
      password: hashedPassword1,
      role: "USER",
    },
  });
  const admin1 = await prisma.user.create({
    data: {
      name: "Vasilije Admin",
      email: "admin@sportspot.com",
      password: hashedPassword2,
      role: "ADMIN",
    },
  });
  const owner1 = await prisma.user.create({
    data: {
      name: "Filip Vlasnik",
      email: "filip@mail.com",
      password: hashedPassword3,
      role: "OWNER",
    },
  });

  const basketball = await prisma.category.create({
    data: { name: "Košarka" },
  });
  const football = await prisma.category.create({
    data: { name: "Fudbal" },
  });
  const tennis = await prisma.category.create({
    data: { name: "Tenis" },
  });
  const padel = await prisma.category.create({
    data: {name: "Padel"},
  })

  await prisma.court.createMany({
    data: [
      {
        name: "Padel Beograd",
        location: "Cara Dusana 15, Beograd",
        price: 7800.0,
        categoryId: padel.id,
        imageUrl: "/images/padel.jpg",
      },
      {
        name: "Sportski Centar Ada Fudbal",
        location: "Ada Ciganlija, Beograd",
        price: 4500.0,
        categoryId: football.id,
        imageUrl: "/images/fudbal.jpg",
      },
      {
        name: "Teniski tereni Dorćol",
        location: "Tadeuša Košćuška, Beograd",
        price: 2200.0,
        categoryId: tennis.id,
        imageUrl: "/images/tenis.jpg",
      },
      {
        name: "Hala Sportova - Premium Košarka",
        location: "Novi Beograd",
        price: 6000.0,
        categoryId: basketball.id,
        imageUrl: "/images/basket.jpg",
      },
    ],
  });

  console.log("Baza je uspešno napunjena testnim podacima.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
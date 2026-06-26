import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

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

    const user1 = await prisma.user.create({
        data: {
      name: "Ivana Igrač",
      email: "ivana@mail.com",
      password: "password123",
      role: "USER",
    },
    });

    const admin1 = await prisma.user.create({
    data: {
      name: "Vasilije Admin",
      email: "admin@sportspot.com",
      password: "adminpassword",
      role: "ADMIN",
    },
  });


  const owner1 = await prisma.user.create({
    data: {
      name: "Filip Vlasnik",
      email: "filip@mail.com",
      password: "ownerpassword",
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


  await prisma.court.createMany({
    data: [
      {
        name: "Otvoreni betonski teren FON",
        location: "Jove Ilića 154, Beograd",
        price: 0.0, // Besplatan studentski teren
        categoryId: basketball.id,
        imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHbwH80pHjIOrqASTcRxtaj4ZFwccoERBKoA-yaF1QvfLd_v2h40MJwiffcqT_PitLKhI96XGNJTr03Ix1xk9B-1cVs_vd3uCK8ge2hvAlWeqUu0MRTIqGhHCgByLj8MJEKHUlbjHV2I1C3=s1360-w1360-h1020",
      },
      {
        name: "Sportski Centar Ada Fudbal",
        location: "Ada Ciganlija, Beograd",
        price: 4500.0,
        categoryId: football.id,
        imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
      },
      {
        name: "Teniski tereni Dorćol",
        location: "Tadeuša Košćuška, Beograd",
        price: 2200.0,
        categoryId: tennis.id,
        imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0",
      },
      {
        name: "Hala Sportova - Premium Košarka",
        location: "Novi Beograd",
        price: 6000.0,
        categoryId: basketball.id,
        imageUrl: "https://images.unsplash.com/photo-1519766304817-4f37bda74a27",
      }
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
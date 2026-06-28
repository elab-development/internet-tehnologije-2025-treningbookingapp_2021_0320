import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { auth } from "../../../../auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Morate biti ulogovani." },
        { status: 401 }
      );
    }

    const reservations = await prisma.reservation.findMany({
      where: { userId: session.user.id as string },
      include: {
        court: {
          select: { name: true, location: true, imageUrl: true, price: true },
        },
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ reservations }, { status: 200 });
  } catch (error) {
    console.error("Greška prilikom dobavljanja rezervacija:", error);
    return NextResponse.json(
      { error: "Došlo je do greške na serveru." },
      { status: 500 }
    );
  }
}
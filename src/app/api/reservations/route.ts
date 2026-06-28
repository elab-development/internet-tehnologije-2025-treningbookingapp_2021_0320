import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { auth } from "../../../../auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courtId = searchParams.get("courtId");
    const date = searchParams.get("date");

    if (!courtId || !date) {
      return NextResponse.json(
        { error: "Nedostaju parametri courtId i date." },
        { status: 400 }
      );
    }

    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const reservations = await prisma.reservation.findMany({
      where: {
        courtId,
        date: {
          gte: dayStart,
          lt: dayEnd,
        },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    const reservedSlots = reservations.map((r) => `${r.startTime}-${r.endTime}`);

    return NextResponse.json({ reservedSlots }, { status: 200 });
  } catch (error) {
    console.error("Greška prilikom dobavljanja rezervacija:", error);
    return NextResponse.json(
      { error: "Došlo je do greške na serveru." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Morate biti ulogovani da napravite rezervaciju." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { courtId, date, startTime, endTime } = body;

    if (!courtId || !date || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Nisu uneti svi parametri." },
        { status: 400 }
      );
    }

    const court = await prisma.court.findUnique({ where: { id: courtId } });
    if (!court) {
      return NextResponse.json(
        { error: "Teren nije pronađen." },
        { status: 404 }
      );
    }

    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const existing = await prisma.reservation.findFirst({
      where: {
        courtId,
        date: {
          gte: dayStart,
          lt: dayEnd,
        },
        startTime,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Ovaj termin je već rezervisan." },
        { status: 409 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        date: new Date(date),
        startTime,
        endTime,
        userId: session.user.id as string,
        courtId,
      },
    });

    return NextResponse.json(
      { message: "Rezervacija uspešno napravljena!", reservation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Greška prilikom kreiranja rezervacije:", error);
    return NextResponse.json(
      { error: "Došlo je do greške na serveru." },
      { status: 500 }
    );
  }
}
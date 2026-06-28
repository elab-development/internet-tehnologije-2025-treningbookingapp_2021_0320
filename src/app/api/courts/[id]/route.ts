import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const court = await prisma.court.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: {
          include: {
            user: { select: { name: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!court) {
      return NextResponse.json(
        { error: "Teren nije pronađen." },
        { status: 404 }
      );
    }

    const avgRating =
      court.reviews.length > 0
        ? court.reviews.reduce((sum, r) => sum + r.rating, 0) / court.reviews.length
        : 0;

    return NextResponse.json(
      {
        id: court.id,
        name: court.name,
        location: court.location,
        price: court.price,
        imageUrl: court.imageUrl,
        sport: court.category.name,
        rating: avgRating,
        reviews: court.reviews.map((r) => ({
          id: r.id,
          rating: r.rating,
          comment: r.comment,
          userName: r.user.name,
          createdAt: r.createdAt,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Greška prilikom dobavljanja terena:", error);
    return NextResponse.json(
      { error: "Došlo je do greške na serveru." },
      { status: 500 }
    );
  }
}
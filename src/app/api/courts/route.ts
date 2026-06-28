import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
    try {
        const courts = await prisma.court.findMany({
            include: {
                category: true,
                reviews: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

       const formatted = courts.map((court) => {
      const avgRating =
        court.reviews.length > 0
          ? court.reviews.reduce((sum, r) => sum + r.rating, 0) / court.reviews.length
          : 0;

      return {
        id: court.id,
        name: court.name,
        location: court.location,
        price: court.price,
        imageUrl: court.imageUrl,
        sport: court.category.name,
        rating: avgRating,
      };
    });

    return NextResponse.json({ courts: formatted }, { status: 200 });

    } catch (error) {
    console.error("Greška prilikom dobavljanja terena:", error);
    return NextResponse.json(
      { error: "Došlo je do greške na serveru." },
      { status: 500 }
    );
  }
}
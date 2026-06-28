import prisma from "../../../lib/prisma";
import CourtCard from "../components/CourtCard";

export default async function TereniPage() {
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
      imageUrl: court.imageUrl ?? "",
      sport: court.category.name,
      price: court.price,
      rating: avgRating,
    };
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
      <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-8 text-center">
        Svi tereni
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {formatted.map((court) => (
          <CourtCard
            key={court.id}
            id={court.id}
            imageUrl={court.imageUrl}
            name={court.name}
            sport={court.sport}
            price={court.price}
            rating={court.rating}
          />
        ))}
      </div>
    </div>
  );
}
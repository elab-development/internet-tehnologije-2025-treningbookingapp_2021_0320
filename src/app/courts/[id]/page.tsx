import Image from "next/image";
import { notFound } from "next/navigation";
import prisma from "../../../../lib/prisma";
import ReservationForm from "../../components/ReservationForm";
import WeatherWidget from "@/app/components/WeatherWidget";


export default async function CourtDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const court = await prisma.court.findUnique({
    where: { id },
    include: {
      category: true,
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!court) {
    notFound();
  }

  const avgRating =
    court.reviews.length > 0
      ? court.reviews.reduce((sum, r) => sum + r.rating, 0) / court.reviews.length
      : 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto w-full">
      
      <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-zinc-800 mb-8">
        {court.imageUrl ? (
          <Image
            src={court.imageUrl}
            alt={court.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600">
            Bez slike
          </div>
        )}
        <span className="absolute top-4 left-4 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider bg-zinc-950/80 text-emerald-400 rounded-lg backdrop-blur-sm border border-emerald-500/20">
          {court.category.name}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">{court.name}</h1>
          <p className="text-zinc-400 mt-1">{court.location}</p>
           <div className="mt-3">
            <WeatherWidget location={court.location} />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-amber-400">★</span>
            <span className="text-zinc-300 font-medium">{avgRating.toFixed(1)}</span>
            <span className="text-zinc-500 text-sm">({court.reviews.length} recenzija)</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Cena po satu</div>
          <div className="text-2xl font-extrabold text-emerald-400">{court.price} RSD</div>
        </div>
      </div>

      <div className="border-t border-zinc-800/60 pt-8">
        <h2 className="text-xl font-bold text-zinc-100 mb-4">Recenzije</h2>
        {court.reviews.length === 0 ? (
          <p className="text-zinc-500">Ovaj teren još nema recenzija.</p>
        ) : (
          <div className="space-y-4">
            {court.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-zinc-200">{review.user.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="text-zinc-300 text-sm">{review.rating}</span>
                  </div>
                </div>
                {review.comment && (
                  <p className="text-zinc-400 text-sm">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <ReservationForm courtId={court.id} />
    </div>
  );
}
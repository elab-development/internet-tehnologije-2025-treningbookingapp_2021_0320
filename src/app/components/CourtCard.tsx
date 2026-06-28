"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface CourtCardProps {
  id: string;
  imageUrl: string;
  name: string;
  sport: string;
  price: number;
  rating: number;
}

export default function CourtCard({id, imageUrl, name, sport, price, rating }: CourtCardProps) {
  const router = useRouter();

  return (
    <div className="max-w-sm w-full bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/50 overflow-hidden shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      
      
      <div className="relative h-48 w-full bg-zinc-800 flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <span className="text-zinc-600 text-sm">Bez slike</span>
        )}
        
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-zinc-950/80 text-emerald-400 rounded-lg backdrop-blur-sm border border-emerald-500/20">
          {sport}
        </span>
      </div>
      
      
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-zinc-100 tracking-tight line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-amber-400 text-sm">★</span>
            <span className="text-sm font-medium text-zinc-300">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
          <div className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Cena po satu</div>
          <div className="text-base font-extrabold text-emerald-400">{price} RSD</div>
        </div>
        <Button
          text = "Rezervisi"
          variant="primary"
          onClick={() => router.push(`/tereni/${id}`)}
        />
      </div>
    </div>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Reservation {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  court: {
    name: string;
    location: string;
    imageUrl: string | null;
    price: number;
  };
}

export default function ReservationsPage() {
  const { data: session, status } = useSession();
  const [reservations, setReservations] = useState<Reservation[] | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    let active = true;

    fetch("/api/my-reservations")
      .then((res) => res.json())
      .then((data) => {
        if (active) setReservations(data.reservations ?? []);
      })
      .catch((err) => {
        console.error("Greška prilikom učitavanja rezervacija:", err);
      });

    return () => {
      active = false;
    };
  }, [status]);

  if (status === "loading") {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-16 max-w-5xl mx-auto w-full text-center text-zinc-400">
        Učitavanje...
      </div>
    );
  }

  if (status !== "authenticated" || !session) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-16 max-w-5xl mx-auto w-full text-center">
        <p className="text-zinc-400 mb-4">Morate biti ulogovani da vidite svoje rezervacije.</p>
        <Link href="/login" className="text-emerald-400 hover:underline">
          Prijavi se
        </Link>
      </div>
    );
  }

  if (reservations === null) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-16 max-w-5xl mx-auto w-full text-center text-zinc-400">
        Učitavanje rezervacija...
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-zinc-100 mb-8 text-center">
        Moje Rezervacije
      </h1>

      {reservations.length === 0 ? (
        <p className="text-zinc-500 text-center">Još nemate napravljenih rezervacija.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 flex items-center gap-4"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                {r.court.imageUrl && (
                  <Image
                    src={r.court.imageUrl}
                    alt={r.court.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-zinc-100">{r.court.name}</h3>
                <p className="text-sm text-zinc-400">{r.court.location}</p>
                <p className="text-sm text-zinc-300 mt-1">
                  {new Date(r.date).toLocaleDateString("sr-RS")} • {r.startTime}-{r.endTime}
                </p>
              </div>
              <div className="text-emerald-400 font-bold">{r.court.price} RSD</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
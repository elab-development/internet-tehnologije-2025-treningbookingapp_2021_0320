"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
}

export default function WeatherWidget({ location }: { location: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const city = location.split(",").pop()?.trim() ?? location;

    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setWeather(data);
        }
      })
      .catch(() => setError(true));
  }, [location]);

  if (error) return null;

  if (!weather) {
    return (
      <div className="text-sm text-zinc-500">Učitavanje vremena...</div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-zinc-900/40 border border-zinc-800/50 rounded-xl px-3 py-2">
      <Image
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        width={36}
        height={36}
        unoptimized
      />
      <div>
        <div className="text-zinc-100 font-semibold">{Math.round(weather.temp)}°C</div>
        <div className="text-zinc-400 text-xs capitalize">{weather.description}</div>
      </div>
    </div>
  );
}
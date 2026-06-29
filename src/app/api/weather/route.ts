import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json(
        { error: "Nedostaje parametar city." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenWeather API ključ nije podešen." },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )},RS&units=metric&lang=sr&appid=${apiKey}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Nije moguće dobaviti vremenske podatke." },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(
      {
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        city: data.name,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Greška prilikom dobavljanja vremena:", error);
    return NextResponse.json(
      { error: "Došlo je do greške na serveru." },
      { status: 500 }
    );
  }
}
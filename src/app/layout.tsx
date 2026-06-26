import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SportSpot",
  description: "Pronađi idealan teren i rezerviši svoj termin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Dodali smo 'relative' na body da bi video mogao da se zalepi u pozadinu */}
      <body className="bg-zinc-950 text-zinc-50 min-h-full flex flex-col font-sans relative overflow-x-hidden">
        
        {/* VIDEO POZADINA */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/background-video.mp4" type="video/mp4" />
          Pretraživač ne podržava video.
        </video>
        
<style dangerouslySetInnerHTML={{__html: `
  /* BRISANJE CRNOG PRAVOUGAONIKA SA SLIKE */
  main div.max-w-3xl {
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
    padding: 0 !important;
  }

  /* Smanjujemo zamućenje pozadine celog sajta da se video vidi čisto */
  main {
    backdrop-filter: blur(2px) !important;
  }

  /* Tekst stavljamo na 50% providnosti da se uklopi */
  main div.max-w-3xl h1 span,
  main div.max-w-3xl p {
    opacity: 0.35 !important;
  }
`}} />

        {/* GLAVNI SADRŽAJ SA EFEKTOM STAKLA (Zamućeno i zamračeno) */}
        <div className="flex flex-col min-h-full w-full relative z-10 flex-1">
          <Navbar />
          
          {/* bg-zinc-950/75 daje zamračenje od 75%, a backdrop-blur-lg daje ono jako zamućenje kroz prozor */}
          <main className="flex-1 flex flex-col bg-zinc-950/75 backdrop-blur-lg transition-all duration-300">
            {children}
          </main>

          <Footer />
        </div>

      </body>
    </html>
  );
}
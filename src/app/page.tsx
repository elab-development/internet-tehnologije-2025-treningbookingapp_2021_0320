import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* MALI BADGE NA VRHU */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Aplikacija je uspešno dockerizovana!
        </span>

        {/* GLAVNI NASLOV */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Pronađi idealan teren i <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            rezerviši svoj termin
          </span>
        </h1>

        {/* PODNASLOV */}
        <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto font-light">
          SportSpot ti omogućava da u nekoliko klikova pronađeš slobodne termine za fudbal, košarku ili tenis širom Beograda.
        </p>

        {/* DUGMIĆI */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/tereni" 
            className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 text-base text-center"
          >
            Istraži terene
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full sm:w-auto px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-xl border border-zinc-700 transition-all text-center text-base"
          >
            GitHub Spremište
          </a>
        </div>

      </div>
    </div>
  );
}
"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-400 hover:opacity-90 transition-opacity">
          <svg 
            className="w-8 h-8 stroke-emerald-400" 
            viewBox="0 0 24 24" 
            fill="none" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="6" cy="6" r="4" />
            <path d="M6 2v4L4 8" />
            <path d="M6 6l2 2" />
            
            <circle cx="18" cy="6" r="4" />
            <path d="M14 6h8" />
            <path d="M18 2c0 2.2-1.8 4-4 4" />
            <path d="M18 10c0-2.2 1.8-4 4-4" />
            <circle cx="6" cy="18" r="4" />
            <path d="M2 18c2.2 0 4-1.8 4-4" />
            <path d="M6 22c0-2.2-1.8-4-4-4" />
            <circle cx="18" cy="18" r="4" />
            <path d="M15.2 15.2l5.6 5.6" />
            <path d="M18 14c-1 1-2 2-2 4" />
            <path d="M22 18c-2 0-3-1-4-2" />
          </svg>
          <span>Sport<span className="text-zinc-100">Spot</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <Link href="/reservations" className="hover:text-emerald-400 transition-colors">Moje Rezervacije</Link>
        </nav>
        <div className="flex items-center gap-4">
          {status === "loading" ? null : session ? (
            <>
              <span className="text-sm font-medium text-zinc-300">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Odjavi se
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-emerald-400 transition-colors">
                Prijava
              </Link>
              <Link href="/register" className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                Registracija
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
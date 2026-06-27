"use client";

import React, { useState } from "react";
import Link from "next/link";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password) {
      setError("Molimo vas da popunite sva polja.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Nešto je pošlo po zlu.");
      }

      alert("Nalog uspešno kreiran!");
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Greška pri registraciji.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
     
      <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/50 p-8 shadow-2xl space-y-6">
        
        
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Kreiraj nalog 
          </h1>
          <p className="text-sm text-zinc-400">
            Pridruži se SportSpot zajednici i rezerviši terene brzo i lako.
          </p>
        </div>

        
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ime i prezime</label>
            <InputField
              type="text"
              placeholder="Npr. Nikola Nikolić"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email adresa</label>
            <InputField
              type="email"
              placeholder="ime@primer.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Lozinka</label>
            <InputField
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

         
          <div className="pt-2">
            <Button
              text={loading ? "Kreiranje..." : "Napravi nalog"}
              variant="primary"
              disabled={loading || !name || !email || !password}
            />
          </div>
        </form>

      
        <p className="text-center text-sm text-zinc-400">
          Već imaš nalog?{" "}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Prijavi se
          </Link>
        </p>

      </div>
    </div>
  );
}
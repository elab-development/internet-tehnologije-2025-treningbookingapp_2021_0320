"use client";

import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      /* 
         TODO: [Backend - NextAuth]
         Kada konfigurises NextAuth, ovde treba da pozoves signIn metodu.
         Primer:
         const result = await signIn("credentials", {
           email,
           password,
           redirect: true,
           callbackUrl: "/"
         });
      */
      console.log("Prijava u izradi - čeka se NextAuth konfiguracija", { email, password });
      alert("Backend povezivanje još nije implementirano.");
      
    } catch (err: any) {
      setError("Neuspela prijava. Proveri podatke.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/50 p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white">Dobrodošao/la nazad</h1>
          <p className="text-zinc-400 mt-2">Uloguj se da nastaviš rezervaciju</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField 
            type="email" 
            placeholder="Email adresa" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <InputField 
            type="password" 
            placeholder="Lozinka" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <Button 
            text={loading ? "Prijava..." : "Uloguj se"} 
            variant="primary" 
            disabled={loading || !email || !password} 
          />
        </form>

        <p className="text-center text-zinc-500 text-sm">
          Nemaš nalog?{" "}
          <Link href="/register" className="text-emerald-400 hover:underline">
            Registruj se
          </Link>
        </p>
      </div>
    </div>
  );
}
import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export default function Button({ text, onClick, variant = "primary", disabled = false }: ButtonProps) {
  //  zajedničke klase za dugme
  const baseStyles = "w-full sm:w-auto px-6 py-3 font-medium rounded-xl transition-all duration-200 text-center text-sm sm:text-base inline-flex items-center justify-center";
  
  
  const variants = {
    primary: "bg-emerald-500 text-zinc-950 font-bold shadow-lg shadow-emerald-500/10 hover:bg-emerald-600 hover:-translate-y-0.5 active:translate-y-0",
    secondary: "bg-zinc-800 text-zinc-200 border border-zinc-700/50 hover:bg-zinc-700 hover:border-zinc-600",
    danger: "bg-red-500 text-white shadow-lg shadow-red-500/10 hover:bg-red-600 hover:-translate-y-0.5 active:translate-y-0"
  };

  // kada je dugme onemogućeno
  const disabledStyles = "opacity-40 cursor-not-allowed pointer-events-none transform-none shadow-none";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ""}`}
    >
      {text}
    </button>
  );
}
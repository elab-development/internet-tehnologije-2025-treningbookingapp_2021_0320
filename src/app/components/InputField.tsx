import React from "react";

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ type = "text", placeholder, value, onChange }: InputFieldProps) {
  return (
    <div className="w-full text-left">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        /* 
           hover(blago posvetli ivica na kursor)
           focus(zeleni sjaj i okvir kad se klikne)
        */
        className="w-full px-4 py-3 bg-zinc-900/40 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 text-sm transition-all duration-200 backdrop-blur-sm outline-none hover:border-zinc-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      />
    </div>
  );
}
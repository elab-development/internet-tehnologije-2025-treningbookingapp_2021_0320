export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900/30 text-zinc-400 text-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div>
          <p className="font-semibold text-zinc-200">SportSpot © 2026</p>
          <p className="text-xs text-zinc-500 mt-1">Sva prava zadržana. Projekat iz Internet tehnologija.</p>
        </div>

        <div className="flex gap-6 text-zinc-500 text-xs">
          <a href="#" className="hover:text-zinc-300 transition-colors">Pravila privatnosti</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Uslovi korišćenja</a>
        </div>

      </div>
    </footer>
  );
}
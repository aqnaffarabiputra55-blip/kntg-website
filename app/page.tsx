'use client';
import Link from 'next/link';

export default function Home() {
  // Data game unggulan sesuai permintaan Anda
  const games = [
    {
      id: 'mobile-legends',
      name: 'Mobile Legends: Bang Bang',
      publisher: 'Moonton',
      imageBg: 'from-blue-600 to-indigo-900', // Placeholder warna/banner
    },
    {
      id: 'pubg-mobile',
      name: 'PUBG Mobile',
      publisher: 'Level Infinite',
      imageBg: 'from-amber-600 to-yellow-900',
    },
    {
      id: 'free-fire',
      name: 'Free Fire',
      publisher: 'Garena',
      imageBg: 'from-orange-600 to-red-900',
    },
    {
      id: 'cod-mobile',
      name: 'Call of Duty: Mobile',
      publisher: 'Activision / Garena',
      imageBg: 'from-zinc-700 to-zinc-900',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-16">
      {/* HEADER / NAVBAR SEDERHANA */}
      <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold tracking-wider text-sky-400">STORE-TOPUP</h1>
        <div className="text-sm text-slate-400">Cepat & Terpercaya</div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-6">
        {/* 1. BANNER PEMBUKA UTAMA (BESAR) */}
        <section className="mb-10">
          <div className="w-full h-48 md:h-80 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 md:p-10 flex flex-col justify-center shadow-2xl relative overflow-hidden border border-slate-700">
            <div className="absolute right-0 bottom-0 opacity-20 text-9xl font-extrabold select-none">🔥</div>
            <span className="bg-white/25 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3 backdrop-blur-sm">
              PROMO SPESIAL HARI INI
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2 leading-tight">
              Top Up Diamond & UC Game Terfavoritmu!
            </h2>
            <p className="text-slate-200 text-sm md:text-base max-w-xl mb-4">
              Proses instan, aman 100%, dan tersedia berbagai pilihan metode pembayaran lengkap.
            </p>
            <button className="bg-white text-slate-950 font-bold px-6 py-2.5 rounded-xl w-fit text-sm hover:bg-sky-100 transition shadow-lg">
              Lihat Promo
            </button>
          </div>
        </section>

        {/* 2. PILIHAN GAME UNGGULAN */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold border-l-4 border-sky-500 pl-3">
              Pilihan Game Unggulan
            </h3>
          </div>

          {/* GRID 4 GAME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <div 
                key={game.id} 
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500 transition duration-300 flex flex-col group shadow-lg"
              >
                {/* TEMPAT BANNER / GAMBAR GAME */}
                <div className={`w-full h-40 bg-gradient-to-br ${game.imageBg} p-4 flex items-end justify-start relative overflow-hidden group-hover:scale-105 transition duration-500`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <span className="relative text-xs bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md text-slate-200">
                    {game.publisher}
                  </span>
                </div>

                {/* KONTEN DETAIL */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-slate-100 group-hover:text-sky-400 transition">
                      {game.name}
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      Layanan top-up resmi, cepat, dan anti-ribet.
                    </p>
                  </div>

                  <Link 
                    href={`/game/${game.id}`}
                    className="w-full bg-sky-600 hover:bg-sky-500 text-white text-center py-2.5 rounded-xl font-semibold text-sm transition shadow-md"
                  >
                    Top Up Sekarang
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
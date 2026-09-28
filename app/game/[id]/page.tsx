'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params?.id as string;
  
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [selectedNominal, setSelectedNominal] = useState<{ id: number; name: string; price: string } | null>(null);

  const gameNames: Record<string, string> = {
    'mobile-legends': 'Mobile Legends: Bang Bang',
    'pubg-mobile': 'PUBG Mobile',
    'free-fire': 'Free Fire',
    'cod-mobile': 'Call of Duty: Mobile',
  };

  const title = gameNames[gameId] || 'Top Up Game';

  // Daftar pilihan nominal
  const nominals = [
    { id: 1, name: '86 Diamonds', price: 'Rp 20.000' },
    { id: 2, name: '172 Diamonds', price: 'Rp 40.000' },
    { id: 3, name: '257 Diamonds', price: 'Rp 60.000' },
  ];

  // Fungsi saat tombol pembayaran ditekan
  const handleCheckout = () => {
    if (!userId) {
      alert('Silakan masukkan ID Pengguna terlebih dahulu!');
      return;
    }
    if (gameId === 'mobile-legends' && !zoneId) {
      alert('Silakan masukkan ID Zona (Server) terlebih dahulu!');
      return;
    }
    if (!selectedNominal) {
      alert('Silakan pilih nominal top up terlebih dahulu!');
      return;
    }

    // Buat kode transaksi unik, lalu arahkan ke halaman /pay/TRX-...
    const trxId = 'TRX-' + Math.floor(100000 + Math.random() * 900000);
    router.push(`/pay/${trxId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20 px-4 pt-6 max-w-4xl mx-auto">
      {/* Tombol Kembali */}
      <Link href="/" className="text-sky-400 text-sm hover:underline mb-4 inline-block">
        ← Kembali ke Beranda
      </Link>

      <h1 className="text-2xl font-bold mb-2 text-sky-400">{title}</h1>
      <p className="text-slate-400 mb-6 text-sm">Lengkapi data akun dan pilih nominal top up Anda di bawah ini.</p>

      {/* 1. DATA AKUN */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-6 shadow-lg">
        <h2 className="font-semibold text-lg mb-4 text-slate-200">1. Masukkan Data Akun</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">ID Pengguna</label>
            <input 
              type="text" 
              placeholder="Contoh: 12345678" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500 text-white"
            />
          </div>
          {gameId === 'mobile-legends' && (
            <div>
              <label className="block text-xs text-slate-400 mb-1">ID Zona (Server)</label>
              <input 
                type="text" 
                placeholder="Contoh: 1234" 
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500 text-white"
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. PILIHAN NOMINAL (KINI BISA DIKLIK) */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-6 shadow-lg">
        <h2 className="font-semibold text-lg mb-4 text-slate-200">2. Pilih Isi Ulang Nominal</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {nominals.map((item) => {
            const isSelected = selectedNominal?.id === item.id;
            return (
              <div 
                key={item.id}
                onClick={() => setSelectedNominal(item)}
                className={`p-4 rounded-xl cursor-pointer transition border ${
                  isSelected 
                    ? 'bg-sky-950/60 border-sky-400 ring-2 ring-sky-500/50 shadow-md' 
                    : 'bg-slate-800 border-slate-700 hover:border-sky-500'
                }`}
              >
                <p className="font-bold text-sm text-slate-100">{item.name}</p>
                <p className="text-sky-400 text-xs mt-1">{item.price}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOMBOL LANJUT PEMBAYARAN */}
      <button 
        onClick={handleCheckout}
        className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg text-center"
      >
        Lanjut ke Pembayaran
      </button>
    </div>
  );
}
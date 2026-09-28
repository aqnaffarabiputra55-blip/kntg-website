'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function GameDetailPage() {
  const params = useParams();
  const gameId = params?.id as string;
  
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');

  // Kamus nama game berdasarkan ID
  const gameNames: Record<string, string> = {
    'mobile-legends': 'Mobile Legends: Bang Bang',
    'pubg-mobile': 'PUBG Mobile',
    'free-fire': 'Free Fire',
    'cod-mobile': 'Call of Duty: Mobile',
  };

  const title = gameNames[gameId] || 'Top Up Game';

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-16 px-4 pt-6 max-w-4xl mx-auto">
      {/* Tombol Kembali ke Beranda */}
      <Link href="/" className="text-sky-400 text-sm hover:underline mb-4 inline-block">
        ← Kembali ke Beranda
      </Link>

      <h1 className="text-2xl font-bold mb-2 text-sky-400">{title}</h1>
      <p className="text-slate-400 mb-6 text-sm">Lengkapi data akun dan pilih nominal top up Anda di bawah ini.</p>

      {/* FORM INPUT DATA AKUN */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-6 shadow-lg">
        <h2 className="font-semibold text-lg mb-4 text-slate-200">1. Masukkan Data Akun</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">User ID</label>
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
              <label className="block text-xs text-slate-400 mb-1">Zone ID (Server)</label>
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

      {/* PILIHAN NOMINAL TOP UP */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
        <h2 className="font-semibold text-lg mb-4 text-slate-200">2. Pilih Nominal Top Up</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl cursor-pointer hover:border-sky-500 transition">
            <p className="font-bold text-sm">86 Diamonds</p>
            <p className="text-sky-400 text-xs mt-1">Rp 20.000</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl cursor-pointer hover:border-sky-500 transition">
            <p className="font-bold text-sm">172 Diamonds</p>
            <p className="text-sky-400 text-xs mt-1">Rp 40.000</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl cursor-pointer hover:border-sky-500 transition">
            <p className="font-bold text-sm">257 Diamonds</p>
            <p className="text-sky-400 text-xs mt-1">Rp 60.000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
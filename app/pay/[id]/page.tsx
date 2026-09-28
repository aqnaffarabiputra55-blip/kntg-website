'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function PaymentPage() {
  const params = useParams();
  const id = params?.id;

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Daftar metode pembayaran lengkap dengan detail tujuannya
  const paymentMethods = [
    { id: 'qris', name: 'QRIS (Semua E-Wallet & Bank)', category: 'Pembayaran Instan', icon: '📱', details: 'Scan QR Code di bawah pakai GoPay, OVO, DANA, atau m-Banking.' },
    { id: 'dana', name: 'DANA', category: 'E-Wallet', icon: '💙', details: 'Nomor Tujuan: 0812-3456-7890 (a.n. Store Topup)' },
    { id: 'gopay', name: 'GoPay', category: 'E-Wallet', icon: '🟢', details: 'Nomor Tujuan: 0812-3456-7890 (a.n. Store Topup)' },
    { id: 'ovo', name: 'OVO', category: 'E-Wallet', icon: '🟣', details: 'Nomor Tujuan: 0812-3456-7890 (a.n. Store Topup)' },
    { id: 'shopeepay', name: 'ShopeePay', category: 'E-Wallet', icon: '🟠', details: 'Nomor Tujuan: 0812-3456-7890 (a.n. Store Topup)' },
    { id: 'bca', name: 'Transfer Bank BCA', category: 'Virtual Account', icon: '🏦', details: 'No. VA BCA: 88001829304123' },
    { id: 'mandiri', name: 'Transfer Bank Mandiri', category: 'Virtual Account', icon: '🏦', details: 'No. VA Mandiri: 89002829304123' },
    { id: 'bri', name: 'Transfer Bank BRI', category: 'Virtual Account', icon: '🏦', details: 'No. VA BRI: 88880829304123' },
  ];

  const currentMethod = paymentMethods.find((m) => m.id === selectedMethod);

  const handleConfirmPayment = () => {
    if (!selectedMethod) {
      alert('Silakan pilih salah satu metode pembayaran terlebih dahulu!');
      return;
    }
    setIsConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20 px-4 pt-6 max-w-2xl mx-auto">
      <Link href="/" className="text-sky-400 text-sm hover:underline mb-4 inline-block">
        ← Kembali ke Beranda
      </Link>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg mb-6">
        <h1 className="text-xl font-bold mb-1 text-sky-400">
          {!isConfirmed ? 'Pilih Metode Pembayaran' : 'Instruksi Pembayaran'}
        </h1>
        <p className="text-slate-400 text-xs mb-6">No. Transaksi: <span className="font-mono text-white font-bold">{id}</span></p>

        {!isConfirmed ? (
          <>
            <h2 className="font-semibold text-sm mb-3 text-slate-200">Daftar Metode Pembayaran:</h2>
            <div className="space-y-3 mb-6">
              {paymentMethods.map((method) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-xl cursor-pointer transition border flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-950/60 border-sky-400 ring-2 ring-sky-500/50 shadow-md'
                        : 'bg-slate-800 border-slate-700 hover:border-sky-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <p className="font-bold text-sm text-slate-100">{method.name}</p>
                        <p className="text-xs text-slate-400">{method.category}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-sky-400 bg-sky-500' : 'border-slate-600'}`}>
                      {isSelected && <span className="w-2 h-2 bg-white rounded-full"></span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleConfirmPayment}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg text-center text-sm"
            >
              Konfirmasi & Lanjut ke Pembayaran
            </button>
          </>
        ) : (
          <div className="space-y-6">
            {/* Batas Waktu 24 Jam */}
            <div className="bg-amber-950/40 border border-amber-600/50 p-4 rounded-xl text-amber-200 text-xs flex justify-between items-center">
              <span>⏱️ Batas Waktu Pembayaran</span>
              <span className="font-bold font-mono text-sm">23 Jam 59 Menit</span>
            </div>

            {/* Detail Tujuan Pembayaran */}
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
              <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                <span className="text-slate-400">Metode Pilihan:</span>
                <span className="font-bold text-white">{currentMethod?.name}</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block">Tujuan / Nomor Rekening:</span>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 font-mono text-sky-400 font-bold text-sm flex justify-between items-center">
                  <span>{currentMethod?.details}</span>
                  <button 
                    onClick={() => alert('Nomor tujuan berhasil disalin!')}
                    className="text-xs bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-md font-sans"
                  >
                    Salin
                  </button>
                </div>
              </div>
            </div>

            {/* Instruksi Langkah Pembayaran */}
            <div className="space-y-2 text-xs text-slate-300">
              <p className="font-semibold text-slate-200 text-sm">Cara Pembayaran:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-400">
                <li>Buka aplikasi m-Banking atau E-Wallet pilihan Anda.</li>
                <li>Pilih menu transfer atau bayar (Virtual Account / Nomor Tujuan).</li>
                <li>Masukkan nomor tujuan atau Virtual Account yang tertera di atas.</li>
                <li>Pastikan nominal pembayaran sudah sesuai, lalu selesaikan transaksi.</li>
                <li>Pesanan akan diproses otomatis oleh sistem setelah pembayaran berhasil.</li>
              </ol>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setIsConfirmed(false)}
                className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-xs transition border border-slate-700"
              >
                Ganti Metode
              </button>
              <Link
                href="/"
                className="w-1/2 bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl text-xs transition text-center flex items-center justify-center"
              >
                Selesai / Beranda
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
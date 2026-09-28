'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function PaymentPage() {
  const params = useParams();
  const id = params?.id;

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);

  // Daftar pilihan metode pembayaran
  const paymentMethods = [
    { id: 'qris', name: 'QRIS (Semua E-Wallet & Bank)', category: 'Pembayaran Instan', icon: '📱' },
    { id: 'dana', name: 'DANA', category: 'E-Wallet', icon: '💙' },
    { id: 'gopay', name: 'GoPay', category: 'E-Wallet', icon: '🟢' },
    { id: 'ovo', name: 'OVO', category: 'E-Wallet', icon: '🟣' },
    { id: 'shopeepay', name: 'ShopeePay', category: 'E-Wallet', icon: '🟠' },
    { id: 'bca', name: 'Transfer Bank BCA', category: 'Virtual Account', icon: '🏦' },
    { id: 'mandiri', name: 'Transfer Bank Mandiri', category: 'Virtual Account', icon: '🏦' },
    { id: 'bri', name: 'Transfer Bank BRI', category: 'Virtual Account', icon: '🏦' },
  ];

  const handleConfirmPayment = () => {
    if (!selectedMethod) {
      alert('Silakan pilih salah satu metode pembayaran terlebih dahulu!');
      return;
    }
    setIsPaid(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20 px-4 pt-6 max-w-2xl mx-auto">
      <Link href="/" className="text-sky-400 text-sm hover:underline mb-4 inline-block">
        ← Kembali ke Beranda
      </Link>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg mb-6">
        <h1 className="text-xl font-bold mb-1 text-sky-400">Pilih Metode Pembayaran</h1>
        <p className="text-slate-400 text-xs mb-6">No. Transaksi: <span className="font-mono text-white font-bold">{id}</span></p>

        {!isPaid ? (
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
              Konfirmasi & Bayar Sekarang
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="text-lg font-bold text-green-400 mb-2">Pesanan Berhasil Dibuat!</h3>
            <p className="text-slate-300 text-sm mb-4">
              Silakan selesaikan pembayaran Anda. Instruksi pembayaran dan rincian tagihan telah dikirimkan ke WhatsApp Anda.
            </p>
            <div className="bg-slate-800 p-4 rounded-xl text-xs text-slate-400 mb-6 border border-slate-700">
              Nomor Referensi: <span className="text-white font-bold">{id}</span>
            </div>
            <Link
              href="/"
              className="inline-block bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
            >
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
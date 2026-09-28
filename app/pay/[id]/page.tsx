'use client';
import { useParams } from 'next/navigation';

export default function PaymentPage() {
  const params = useParams();
  const id = params?.id;

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center', color: '#fff', background: '#0f172a', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Konfirmasi Pembayaran Top-Up</h1>
      <p style={{ color: '#94a3b8' }}>Nomor Referensi Transaksi Anda:</p>
      <div style={{ background: '#1e293b', padding: '15px 25px', fontSize: '20px', borderRadius: '8px', display: 'inline-block', margin: '20px 0', border: '1px solid #334155', color: '#38bdf8', fontWeight: 'bold' }}>
        {id}
      </div>
      <p style={{ marginTop: '20px', color: '#cbd5e1' }}>Silakan lakukan transfer sesuai nominal tagihan yang tertera di WhatsApp Anda.</p>
    </div>
  );
}
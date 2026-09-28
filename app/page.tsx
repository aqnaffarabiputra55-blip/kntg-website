'app/page.tsx'
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yvtwjbqxjbxqnkphhhhh.supabase.co'
const supabaseKey = 'sb_publishable_TeULTIXJdmp_ohymT6StrA_XyEiIzPP' 
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {
  const [produk, setProduk] = useState<any[]>([])
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [userId, setUserId] = useState('')
  const [zoneId, setZoneId] = useState('')
  const [whatsapp, setWhatsapp] = useState('') // State baru untuk No WhatsApp
  const [nickname, setNickname] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [loading, setLoading] = useState(false)
  const [receipt, setReceipt] = useState<any>(null)

  // State untuk Fitur Lacak Pesanan
  const [trackingRef, setTrackingRef] = useState('')
  const [trackedTransaction, setTrackedTransaction] = useState<any>(null)
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    async function fetchProduk() {
      const { data, error } = await supabase.from('PRODUCTS').select('*')
      if (error) {
        console.error('Gagal mengambil data:', error)
      } else {
        setProduk(data || [])
      }
    }
    fetchProduk()
  }, [])

  // Fungsi Cek Nickname
  const handleCheckNickname = async () => {
    if (!userId) {
      alert('Mohon masukkan User ID terlebih dahulu!')
      return
    }

    setIsChecking(true)
    setNickname('')

    try {
      const res = await fetch('/api/check-nickname', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, zoneId })
      })

      const data = await res.json()

      if (data.success) {
        setNickname(data.nickname)
      } else {
        alert(data.message || 'Gagal menemukan akun.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Terjadi kesalahan saat menghubungi server game.')
    } finally {
      setIsChecking(false)
    }
  }

  // Fungsi Top Up & Checkout
  const handleTopUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) {
      alert('Mohon masukkan User ID terlebih dahulu!')
      return
    }
    if (!nickname) {
      alert('Mohon cek Nickname terlebih dahulu!')
      return
    }
    if (!whatsapp) {
      alert('Mohon masukkan Nomor WhatsApp untuk pemberitahuan!')
      return
    }
    if (!paymentMethod) {
      alert('Mohon pilih metode pembayaran terlebih dahulu!')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemName: selectedItem['item-name'],
          price: selectedItem['price'],
          userId,
          zoneId,
          nickname,
          whatsapp,
          paymentMethod
        })
      })

      const apiResult = await res.json()

      if (!apiResult.success) {
        throw new Error(apiResult.message || 'Gagal memproses pembayaran')
      }

      const { error } = await supabase.from('transactions').insert([
        {
          'item-name': selectedItem['item-name'],
          'user-id': userId,
          'zone-id': zoneId || '-',
          'nickname': nickname,
          'whatsapp': whatsapp,
          'payment-method': paymentMethod,
          'price': selectedItem['price'],
          'status': 'Pending',
          'reference': apiResult.reference,
          'payment_url': apiResult.payment_url
        }
      ])

      if (error) throw error

      setReceipt({
        itemName: selectedItem['item-name'],
        userId: userId,
        zoneId: zoneId || '-',
        nickname: nickname,
        whatsapp: whatsapp,
        paymentMethod: paymentMethod,
        price: selectedItem['price'],
        reference: apiResult.reference,
        paymentUrl: apiResult.payment_url,
        date: new Date().toLocaleString('id-ID')
      })

      setSelectedItem(null)
      setUserId('')
      setZoneId('')
      setWhatsapp('')
      setNickname('')
      setPaymentMethod('')

    } catch (err: any) {
      console.error('Error transaksi:', err)
      alert('Terjadi kesalahan saat memproses transaksi.')
    } finally {
      setLoading(false)
    }
  }

  // Fungsi Lacak Pesanan
  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingRef.trim()) {
      alert('Mohon masukkan Kode Referensi / Invoice!')
      return
    }

    setIsTracking(true)
    setTrackedTransaction(null)

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('reference', trackingRef.trim())
        .single()

      if (error || !data) {
        alert('Transaksi tidak ditemukan. Periksa kembali kode referensi Anda.')
      } else {
        setTrackedTransaction(data)
      }
    } catch (err) {
      console.error('Gagal melacak pesanan:', err)
      alert('Terjadi kesalahan saat mencari data transaksi.')
    } finally {
      setIsTracking(false)
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Website Top-Up Game Profesional</h1>

      {/* Bagian Lacak Pesanan */}
      <div className="max-w-md mx-auto mb-10 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
        <h2 className="text-lg font-bold mb-3 text-yellow-400">🔍 Lacak Status Pesanan</h2>
        <form onSubmit={handleTrackOrder} className="flex gap-2">
          <input 
            type="text"
            placeholder="Masukkan No. Referensi (Cth: TRX-...)"
            value={trackingRef}
            onChange={(e) => setTrackingRef(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-yellow-400"
          />
          <button 
            type="submit"
            disabled={isTracking}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded text-sm transition disabled:opacity-50"
          >
            {isTracking ? 'Mencari...' : 'Cek'}
          </button>
        </form>

        {trackedTransaction && (
          <div className="mt-4 p-4 bg-gray-900 border border-gray-600 rounded-lg text-sm space-y-2">
            <div className="flex justify-between border-b border-gray-800 pb-1">
              <span className="text-gray-400">Status:</span>
              <span className={`font-bold ${trackedTransaction.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                {trackedTransaction.status}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-1">
              <span className="text-gray-400">Item:</span>
              <span className="font-bold">{trackedTransaction['item-name']}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-1">
              <span className="text-gray-400">User ID:</span>
              <span className="font-bold">{trackedTransaction['user-id']} ({trackedTransaction['zone-id']})</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-1">
              <span className="text-gray-400">Nickname:</span>
              <span className="font-bold text-blue-400">{trackedTransaction.nickname}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-1">
              <span className="text-gray-400">No. WhatsApp:</span>
              <span className="font-bold">{trackedTransaction.whatsapp}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-gray-400">Total Harga:</span>
              <span className="font-bold text-green-400">Rp {trackedTransaction.price}</span>
            </div>
            {trackedTransaction.payment_url && trackedTransaction.status === 'Pending' && (
              <a 
                href={trackedTransaction.payment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center mt-3 bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-bold py-1.5 rounded transition text-xs"
              >
                🔗 Bayar Sekarang
              </a>
            )}
          </div>
        )}
      </div>

      {receipt && (
        <div className="max-w-md mx-auto mb-10 bg-white text-gray-900 p-6 rounded-xl shadow-2xl border-4 border-dashed border-gray-400">
          <div className="text-center border-b pb-4 mb-4">
            <h2 className="text-2xl font-black tracking-wider text-blue-600">STRUK PEMBELIAN</h2>
            <p className="text-xs text-gray-500">Menunggu Pembayaran (Pending)</p>
            <p className="text-xs text-gray-400 mt-1">{receipt.date}</p>
          </div>
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">Ref / Invoice:</span>
              <span className="font-bold text-gray-900">{receipt.reference}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">Item Produk:</span>
              <span className="font-bold text-gray-900">{receipt.itemName}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">User ID (Zone):</span>
              <span className="font-bold text-gray-900">{receipt.userId} ({receipt.zoneId})</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">Nama Akun:</span>
              <span className="font-bold text-blue-600">{receipt.nickname}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">No. WhatsApp:</span>
              <span className="font-bold text-gray-900">{receipt.whatsapp}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">Metode Bayar:</span>
              <span className="font-bold text-gray-900">{receipt.paymentMethod}</span>
            </div>
            <div className="flex justify-between pt-2 text-base font-bold">
              <span>Total Harga:</span>
              <span className="text-green-600">Rp {receipt.price}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <a 
              href={receipt.paymentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-bold py-2 px-4 rounded-lg transition shadow"
            >
              🔗 Buka Halaman Pembayaran
            </a>
            <button 
              onClick={() => setReceipt(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition shadow"
            >
              Tutup Struk & Kembali
            </button>
          </div>
        </div>
      )}

      {selectedItem && !receipt && (
        <div className="max-w-md mx-auto mb-10 bg-gray-800 p-6 rounded-xl border border-blue-500 shadow-xl">
          <h2 className="text-xl font-bold mb-2 text-blue-400">Form Top-Up: {selectedItem['item-name']}</h2>
          <p className="text-gray-400 text-sm mb-4">Harga: Rp {selectedItem['price']}</p>
          
          <form onSubmit={handleTopUp} className="space-y-4">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-sm mb-1">User ID Game</label>
                <input 
                  type="text" 
                  placeholder="ID" 
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value)
                    setNickname('')
                  }}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-28">
                <label className="block text-sm mb-1">Zone ID</label>
                <input 
                  type="text" 
                  placeholder="Zone" 
                  value={zoneId}
                  onChange={(e) => {
                    setZoneId(e.target.value)
                    setNickname('')
                  }}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button 
                type="button"
                onClick={handleCheckNickname}
                disabled={isChecking}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm disabled:opacity-50"
              >
                {isChecking ? 'Mengecek Nickname...' : '🔍 Cek Nickname Akun'}
              </button>
            </div>

            {nickname && (
              <div className="bg-gray-900 border border-green-500 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-400">Akun Ditemukan:</p>
                <p className="text-green-400 font-bold text-lg">{nickname}</p>
              </div>
            )}

            {/* Input WhatsApp Baru */}
            <div>
              <label className="block text-sm mb-1">Nomor WhatsApp (Untuk Info / Bukti)</label>
              <input 
                type="tel" 
                placeholder="Cth: 081234567890" 
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 font-semibold text-yellow-400">Pilih Metode Pembayaran</label>
              <div className="grid grid-cols-2 gap-2">
                {['QRIS', 'DANA', 'OVO', 'Transfer Bank'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-2 rounded text-sm font-semibold border transition ${
                      paymentMethod === method 
                        ? 'bg-blue-600 border-blue-400 text-white shadow-md' 
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                type="submit" 
                disabled={loading || !nickname}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Memproses Tagihan...' : 'Konfirmasi Pembayaran'}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setSelectedItem(null)
                  setPaymentMethod('')
                  setNickname('')
                  setWhatsapp('')
                  setUserId('')
                  setZoneId('')
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {produk.map((item: any) => (
          <div key={item.id} className="bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{item['item-name']}</h2>
              <p className="text-gray-400 text-sm mb-2">Game ID: {item['game-id']}</p>
              <p className="text-green-400 font-bold text-lg mb-4">Rp {item['price']}</p>
            </div>
            <button 
              onClick={() => {
                setSelectedItem(item)
                setPaymentMethod('')
                setReceipt(null)
                setNickname('')
                setWhatsapp('')
                setUserId('')
                setZoneId('')
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Top Up Sekarang
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
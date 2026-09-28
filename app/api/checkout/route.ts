import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { itemName, price, userId, zoneId, nickname, whatsapp, paymentMethod } = body

    if (!userId || !itemName || !whatsapp || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: 'Data transaksi tidak lengkap.' },
        { status: 400 }
      )
    }

    const reference = 'TRX-' + Date.now()
    const payment_url = `https://simulator.pembayaran-store.com/pay/${reference}`

    // =========================================================================
    // INTEGRASI WHATSAPP GATEWAY (Fonnte)
    // =========================================================================
    const tokenFonnte = 'VCQstqmViY8WvuNTMFRh' // Ganti dengan token asli dari Fonnte
    
    const pesanWhatsApp = `Halo *${nickname}* (ID: ${userId}),\n\nTerima kasih telah melakukan pemesanan *${itemName}* di toko kami.\n\nDetail Tagihan:\n• Total: *Rp ${price}*\n• Metode Bayar: *${paymentMethod}*\n• No. Referensi: *${reference}*\n\nSilakan selesaikan pembayaran melalui link berikut:\n${payment_url}\n\nSimpan nomor referensi di atas untuk melacak status pesanan Anda.`

    try {
      await fetch('https://api.fonnte.com/send', {
        method: 'POST',
        headers: {
          'Authorization': tokenFonnte,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          target: whatsapp,
          message: pesanWhatsApp,
          countryCode: '62',
        })
      })
    } catch (waError) {
      console.error('Gagal mengirim WhatsApp:', waError)
    }

    return NextResponse.json({
      success: true,
      reference,
      payment_url,
      message: 'Tagihan dan pesan WhatsApp berhasil dikirim.'
    })

  } catch (error) {
    console.error('Error Checkout API:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server pembayaran.' },
      { status: 500 }
    )
  }
}
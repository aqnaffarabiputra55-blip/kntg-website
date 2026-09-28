import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId, zoneId } = await request.json()

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID harus diisi' }, { status: 400 })
    }

    // Simulasi data sementara (ID 1283888 mendeteksi 'asdk')
    if (userId === '1283888') {
      return NextResponse.json({
        success: true,
        nickname: 'asdk'
      })
    }

    return NextResponse.json({
      success: true,
      nickname: `Player_${userId}`
    })

  } catch (error) {
    console.error('Check Nickname Error:', error)
    return NextResponse.json({ success: false, message: 'Gagal mengecek nickname' }, { status: 500 })
  }
}
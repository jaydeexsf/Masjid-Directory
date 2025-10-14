import { NextRequest, NextResponse } from 'next/server'
import { connectDBSafe } from '@/lib/mongodb'
import SalahTimes from '@/models/SalahTimes'

export async function GET(request: NextRequest) {
  try {
    console.log('[API] GET /api/salah-times - incoming request', {
      url: request.url,
      ts: new Date().toISOString(),
    })
    const db = await connectDBSafe()

    const { searchParams } = new URL(request.url)
    const masjidId = searchParams.get('masjidId')
    const date = searchParams.get('date')

    if (!masjidId) {
      return NextResponse.json(
        { success: false, error: 'Masjid ID is required' },
        { status: 400 }
      )
    }

    const queryDate = date ? new Date(date) : new Date()
    queryDate.setHours(0, 0, 0, 0)

    if (!db) {
      console.log('[API] GET /api/salah-times - DB not available')
      return NextResponse.json({ success: false, error: 'Database unavailable' }, { status: 503 })
    }

    const salahTimes = await SalahTimes.findOne({
      masjidId,
      date: queryDate
    })

    if (!salahTimes) {
      return NextResponse.json(
        { success: false, error: 'Prayer times not found for this date' },
        { status: 404 }
      )
    }

    console.log('[API] GET /api/salah-times - success response', { hasSalahTimes: !!salahTimes })
    return NextResponse.json({
      success: true,
      salahTimes
    })

  } catch (error) {
    console.error('Error fetching prayer times:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prayer times' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('[API] POST /api/salah-times - incoming request', {
      url: request.url,
      ts: new Date().toISOString(),
    })
    const db = await connectDBSafe()

    if (!db) {
      console.log('[API] POST /api/salah-times - DB unavailable')
      return NextResponse.json(
        { success: false, error: 'Database unavailable in demo mode' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const {
      masjidId,
      date,
      fajr,
      dhuhr,
      asr,
      maghrib,
      isha,
      jumuah,
      jumuahSlots,
    } = body

    console.log('[API] POST /api/salah-times - payload received (summary)', {
      masjidId,
      date,
      hasJumuah: !!jumuah,
      jumuahSlotsCount: Array.isArray(jumuahSlots) ? jumuahSlots.length : 0,
    })

    // Validate required fields
    if (!masjidId || !date || !fajr || !dhuhr || !asr || !maghrib || !isha) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const queryDate = new Date(date)
    queryDate.setHours(0, 0, 0, 0)

    // Check if prayer times already exist for this date
    const existingTimes = await SalahTimes.findOne({ masjidId, date: queryDate })

    if (existingTimes) {
      // Update existing prayer times
      existingTimes.fajr = fajr
      existingTimes.dhuhr = dhuhr
      existingTimes.asr = asr
      existingTimes.maghrib = maghrib
      existingTimes.isha = isha
      existingTimes.jumuah = jumuah
      existingTimes.jumuahSlots = Array.isArray(jumuahSlots) ? jumuahSlots : existingTimes.jumuahSlots

      await existingTimes.save()

      const responsePayloadUpdate = { success: true, salahTimes: existingTimes, message: 'Prayer times updated successfully' }
      console.log('[API] POST /api/salah-times - update success response', responsePayloadUpdate)
      return NextResponse.json(responsePayloadUpdate)
    } else {
      // Create new prayer times
      const salahTimes = new SalahTimes({ masjidId, date: queryDate, fajr, dhuhr, asr, maghrib, isha, jumuah, jumuahSlots })

      await salahTimes.save()
      console.log('[API] POST /api/salah-times - created salah times', { id: salahTimes._id })

      const responsePayloadCreate = { success: true, salahTimes, message: 'Prayer times created successfully' }
      console.log('[API] POST /api/salah-times - create success response', responsePayloadCreate)
      return NextResponse.json(responsePayloadCreate)
    }

  } catch (error) {
    console.error('Error saving prayer times:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save prayer times' },
      { status: 500 }
    )
  }
}

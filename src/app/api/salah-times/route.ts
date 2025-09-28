import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import SalahTimes from '@/models/SalahTimes'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

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
    await connectDB()

    const body = await request.json()
    const {
      masjidId,
      date,
      fajr,
      dhuhr,
      asr,
      maghrib,
      isha,
      jumuah
    } = body

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
    const existingTimes = await SalahTimes.findOne({
      masjidId,
      date: queryDate
    })

    if (existingTimes) {
      // Update existing prayer times
      existingTimes.fajr = fajr
      existingTimes.dhuhr = dhuhr
      existingTimes.asr = asr
      existingTimes.maghrib = maghrib
      existingTimes.isha = isha
      existingTimes.jumuah = jumuah

      await existingTimes.save()

      return NextResponse.json({
        success: true,
        salahTimes: existingTimes,
        message: 'Prayer times updated successfully'
      })
    } else {
      // Create new prayer times
      const salahTimes = new SalahTimes({
        masjidId,
        date: queryDate,
        fajr,
        dhuhr,
        asr,
        maghrib,
        isha,
        jumuah
      })

      await salahTimes.save()

      return NextResponse.json({
        success: true,
        salahTimes,
        message: 'Prayer times created successfully'
      })
    }

  } catch (error) {
    console.error('Error saving prayer times:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save prayer times' },
      { status: 500 }
    )
  }
}

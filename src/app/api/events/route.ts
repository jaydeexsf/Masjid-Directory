import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Event from '@/models/Event'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const masjidId = searchParams.get('masjidId')
    const limit = parseInt(searchParams.get('limit') || '10')
    const upcoming = searchParams.get('upcoming') === 'true'

    const query: any = {}

    if (masjidId) {
      query.masjidId = masjidId
    }

    if (upcoming) {
      query.date = { $gte: new Date() }
    }

    const events = await Event.find(query)
      .sort({ date: 1 })
      .limit(limit)
      .populate('masjidId', 'name address city')

    return NextResponse.json({
      success: true,
      events,
      count: events.length
    })

  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
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
      title,
      description,
      date,
      time,
      image,
      isRecurring,
      recurringPattern
    } = body

    // Validate required fields
    if (!masjidId || !title || !description || !date || !time) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const event = new Event({
      masjidId,
      title,
      description,
      date: new Date(date),
      time,
      image,
      isRecurring: isRecurring || false,
      recurringPattern
    })

    await event.save()

    return NextResponse.json({
      success: true,
      event,
      message: 'Event created successfully'
    })

  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    )
  }
}

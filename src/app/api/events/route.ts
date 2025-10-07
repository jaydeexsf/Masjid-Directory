import { NextRequest, NextResponse } from 'next/server'
import { connectDBSafe } from '@/lib/mongodb'
import Event from '@/models/Event'

const EVENTS_FALLBACK = [
  { _id: 'e1', masjidId: 'demo-1', title: 'Community Halaqa', description: 'Weekly halaqa after Maghrib', date: new Date(), time: '19:30', isRecurring: true },
  { _id: 'e2', masjidId: 'demo-1', title: 'Youth Night', description: 'Games and reminders', date: new Date(Date.now() + 86400000), time: '18:00', isRecurring: false },
]

export async function GET(request: NextRequest) {
  try {
    console.log('[API] GET /api/events - incoming request', {
      url: request.url,
      ts: new Date().toISOString(),
    })
    const db = await connectDBSafe()

    const { searchParams } = new URL(request.url)
    const masjidId = searchParams.get('masjidId')
    const limit = parseInt(searchParams.get('limit') || '10')
    const upcoming = searchParams.get('upcoming') === 'true'

    if (!db) {
      console.log('[API] GET /api/events - DB not available, using fallback')
      const filtered = EVENTS_FALLBACK.filter((e) => (masjidId ? e.masjidId === masjidId : true)).slice(0, limit)
      console.log('[API] GET /api/events - returning fallback results', { count: filtered.length })
      return NextResponse.json({ success: true, events: filtered, count: filtered.length, fallback: true })
    }

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

    console.log('[API] GET /api/events - success', { count: events.length })
    return NextResponse.json({
      success: true,
      events,
      count: events.length
    })

  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: true, events: EVENTS_FALLBACK, count: EVENTS_FALLBACK.length, fallback: true },
      { status: 200 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('[API] POST /api/events - incoming request', {
      url: request.url,
      ts: new Date().toISOString(),
    })
    const db = await connectDBSafe()
    if (!db) {
      console.log('[API] POST /api/events - DB unavailable')
      return NextResponse.json({ success: false, error: 'Database unavailable in demo mode' }, { status: 503 })
    }

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

    console.log('[API] POST /api/events - payload received (summary)', {
      masjidId,
      title,
      date,
      time,
      isRecurring: !!isRecurring,
      hasImage: !!image,
    })

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
    console.log('[API] POST /api/events - event created', { eventId: event._id })

    const responsePayload = {
      success: true,
      event,
      message: 'Event created successfully'
    }
    console.log('[API] POST /api/events - success response', responsePayload)
    return NextResponse.json(responsePayload)

  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    )
  }
}

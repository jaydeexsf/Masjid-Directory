import { NextRequest, NextResponse } from 'next/server'
import { connectDBSafe } from '@/lib/mongodb'
import Mosque from '@/models/Mosque'
import SalahTimes from '@/models/SalahTimes'
import Event from '@/models/Event'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    console.log('[API] GET /api/mosques/:id - incoming request', {
      url: request.url,
      ts: new Date().toISOString(),
    })
    const db = await connectDBSafe()

    if (!db) {
      return NextResponse.json({ success: false, error: 'Database unavailable' }, { status: 503 })
    }

    const { id } = await context.params
    console.log('[API] GET /api/mosques/:id - params', { id })
    const mosque = await Mosque.findById(id)
    if (!mosque) {
      return NextResponse.json(
        { success: false, error: 'Mosque not found' },
        { status: 404 }
      )
    }

    // Get today's prayer times
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const salahTimes = await SalahTimes.findOne({
      masjidId: id,
      date: today
    })

    // Get upcoming events
    const upcomingEvents = await Event.find({
      masjidId: id,
      date: { $gte: today }
    }).sort({ date: 1 }).limit(5)

    console.log('[API] GET /api/mosques/:id - success response', {
      hasSalahTimes: !!salahTimes,
      eventsCount: upcomingEvents.length,
    })
    return NextResponse.json({
      success: true,
      mosque,
      salahTimes,
      upcomingEvents
    })

  } catch (error) {
    console.error('Error fetching mosque details:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch mosque details' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    console.log('[API] PUT /api/mosques/:id - incoming request', {
      url: request.url,
      ts: new Date().toISOString(),
    })
    const db = await connectDBSafe()
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database unavailable in demo mode' }, { status: 503 })
    }

    const body = await request.json()
    const updateData = { ...body }
    delete updateData._id
    delete updateData.createdAt

    const { id } = await context.params
    console.log('[API] PUT /api/mosques/:id - params and payload', { id, keys: Object.keys(updateData) })
    const mosque = await Mosque.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!mosque) {
      return NextResponse.json(
        { success: false, error: 'Mosque not found' },
        { status: 404 }
      )
    }

    const responsePayload = {
      success: true,
      mosque,
      message: 'Mosque updated successfully'
    }
    console.log('[API] PUT /api/mosques/:id - success response', responsePayload)
    return NextResponse.json(responsePayload)

  } catch (error) {
    console.error('Error updating mosque:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update mosque' },
      { status: 500 }
    )
  }
}

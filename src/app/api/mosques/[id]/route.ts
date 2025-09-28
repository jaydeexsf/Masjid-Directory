import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Mosque from '@/models/Mosque'
import SalahTimes from '@/models/SalahTimes'
import Event from '@/models/Event'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const mosque = await Mosque.findById(params.id)
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
      masjidId: params.id,
      date: today
    })

    // Get upcoming events
    const upcomingEvents = await Event.find({
      masjidId: params.id,
      date: { $gte: today }
    }).sort({ date: 1 }).limit(5)

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
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const body = await request.json()
    const updateData = { ...body }
    delete updateData._id
    delete updateData.createdAt

    const mosque = await Mosque.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!mosque) {
      return NextResponse.json(
        { success: false, error: 'Mosque not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      mosque,
      message: 'Mosque updated successfully'
    })

  } catch (error) {
    console.error('Error updating mosque:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update mosque' },
      { status: 500 }
    )
  }
}

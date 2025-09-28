import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Mosque from '@/models/Mosque'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const city = searchParams.get('city')
    const hasJumuah = searchParams.get('hasJumuah') === 'true'

    // Build query
    const query: any = { isApproved: true }

    if (name) {
      query.$or = [
        { name: { $regex: name, $options: 'i' } },
        { address: { $regex: name, $options: 'i' } }
      ]
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' }
    }

    // Find mosques
    const mosques = await Mosque.find(query)
      .select('-adminId')
      .sort({ name: 1 })
      .limit(50)

    return NextResponse.json({ 
      success: true, 
      mosques,
      count: mosques.length 
    })

  } catch (error) {
    console.error('Error fetching mosques:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch mosques' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const {
      name,
      address,
      city,
      state,
      country,
      postalCode,
      latitude,
      longitude,
      contactInfo,
      imam,
      adminId
    } = body

    // Validate required fields
    if (!name || !address || !city || !state || !country || !adminId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new mosque
    const mosque = new Mosque({
      name,
      address,
      city,
      state,
      country,
      postalCode,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      contactInfo: contactInfo || {},
      imam: imam || { name: '' },
      images: [],
      isApproved: false,
      adminId
    })

    await mosque.save()

    return NextResponse.json({ 
      success: true, 
      mosque,
      message: 'Mosque registered successfully. Awaiting approval.' 
    })

  } catch (error) {
    console.error('Error creating mosque:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create mosque' },
      { status: 500 }
    )
  }
}

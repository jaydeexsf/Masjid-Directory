import { NextRequest, NextResponse } from 'next/server'
import { connectDBSafe } from '@/lib/mongodb'
import Mosque from '@/models/Mosque'

const MOSQUE_FALLBACK = [
  {
    _id: 'demo-1',
    name: 'Central Masjid',
    address: '123 Main St',
    city: 'Demo City',
    state: 'DC',
    country: 'DemoLand',
    postalCode: '00000',
    latitude: 0,
    longitude: 0,
    contactInfo: { phone: '000-000-0000', email: 'info@central.demo' },
    imam: { name: 'Imam Demo' },
    images: [],
    isApproved: true,
    adminId: 'demo-admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'demo-2',
    name: 'Westside Islamic Center',
    address: '45 West Ave',
    city: 'Demo City',
    state: 'DC',
    country: 'DemoLand',
    postalCode: '00001',
    latitude: 0,
    longitude: 0,
    contactInfo: {},
    imam: { name: 'Shaykh Sample' },
    images: [],
    isApproved: true,
    adminId: 'demo-admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const db = await connectDBSafe()

    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const city = searchParams.get('city')

    if (!db) {
      // Filter fallback results in-memory for a realistic UI
      const filtered = MOSQUE_FALLBACK.filter((m) => {
        const nameMatch = name ? (m.name.toLowerCase().includes(name.toLowerCase()) || m.address.toLowerCase().includes(name.toLowerCase())) : true
        const cityMatch = city ? m.city.toLowerCase().includes(city.toLowerCase()) : true
        return nameMatch && cityMatch
      })
      return NextResponse.json({ success: true, mosques: filtered, count: filtered.length, fallback: true })
    }

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
      { success: true, mosques: MOSQUE_FALLBACK, count: MOSQUE_FALLBACK.length, fallback: true },
      { status: 200 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await connectDBSafe()
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database unavailable in demo mode' },
        { status: 503 }
      )
    }

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

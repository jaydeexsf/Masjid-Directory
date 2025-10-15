import { NextRequest, NextResponse } from 'next/server'
import { connectDBSafe } from '@/lib/mongodb'
import Mosque from '@/models/Mosque'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {
  try {
    console.log('[API] GET /api/mosques - incoming request', {
      url: request.url,
      ts: new Date().toISOString(),
    })
    const db = await connectDBSafe()

    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const city = searchParams.get('city')

    if (!db) {
      console.log('[API] GET /api/mosques - DB not available')
      return NextResponse.json({ success: false, error: 'Database unavailable' }, { status: 503 })
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

    console.log('[API] GET /api/mosques - success', {
      count: mosques.length,
    })
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
    console.log('[API] POST /api/mosques - incoming request', {
      url: request.url,
      ts: new Date().toISOString(),
    })
    const db = await connectDBSafe()
    if (!db) {
      console.log('[API] POST /api/mosques - DB unavailable', {
        hasMongoUri: !!process.env.MONGODB_URI,
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV,
        region: process.env.VERCEL_REGION,
      })
      return NextResponse.json(
        {
          success: false,
          error: 'Database unavailable',
          env: {
            hasMongoUri: !!process.env.MONGODB_URI,
            nodeEnv: process.env.NODE_ENV,
            vercelEnv: process.env.VERCEL_ENV,
            region: process.env.VERCEL_REGION,
          },
          hint:
            'Ensure MONGODB_URI is set on Vercel and Atlas Network Access allows your deployment/IP. Use the Vercel-MongoDB Atlas integration or temporarily 0.0.0.0/0 for testing.'
        },
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
      adminName,
      adminEmail,
      adminPassword
    } = body

    console.log('[API] POST /api/mosques - payload received (summary)', {
      name,
      city,
      state,
      country,
      adminEmail,
      hasPassword: !!adminPassword,
      hasCoords: !!latitude && !!longitude,
    })

    // Validate required fields
    if (!name || !address || !city || !state || !country || !adminName || !adminEmail || !adminPassword) {
      console.log('[API] POST /api/mosques - missing required fields')
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: adminEmail.toLowerCase() })
    if (existingUser) {
      console.log('[API] POST /api/mosques - user exists', { adminEmail })
      return NextResponse.json(
        { success: false, error: 'A user with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // Create new user first
    const user = new User({
      email: adminEmail.toLowerCase(),
      name: adminName,
      password: hashedPassword,
      role: 'masjid_admin',
    })

    await user.save()
    console.log('[API] POST /api/mosques - user created', { userId: user._id })

    // Create new mosque with the user's ID
    const safeLatitude = typeof latitude === 'number' ? latitude : parseFloat(latitude)
    const safeLongitude = typeof longitude === 'number' ? longitude : parseFloat(longitude)

    const mosque = new Mosque({
      name,
      address,
      city,
      state,
      country,
      postalCode,
      latitude: Number.isFinite(safeLatitude) ? safeLatitude : undefined,
      longitude: Number.isFinite(safeLongitude) ? safeLongitude : undefined,
      contactInfo: contactInfo || {},
      imam: imam || { name: '' },
      images: [],
      isApproved: false,
      adminId: user._id.toString()
    })

    await mosque.save()
    console.log('[API] POST /api/mosques - mosque created', { mosqueId: mosque._id })

    // Update user with masjid ID
    user.masjidId = mosque._id.toString()
    await user.save()
    console.log('[API] POST /api/mosques - user updated with masjidId', { userId: user._id, masjidId: user.masjidId })

    return NextResponse.json({ 
      success: true, 
      mosque,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
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

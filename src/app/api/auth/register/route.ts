import { NextRequest, NextResponse } from 'next/server'
import { connectDBSafe } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    console.log('[API] POST /api/auth/register - incoming request', {
      url: request.url,
      ts: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
    })
    const db = await connectDBSafe()
    
    if (!db) {
      console.log('[API] POST /api/auth/register - DB unavailable', {
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
    const { email, name, password, role, masjidId } = body
    console.log('[API] POST /api/auth/register - payload received (summary)', {
      email,
      name,
      hasPassword: !!password,
      role,
      hasMasjidId: !!masjidId,
    })

    // Validate required fields
    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      console.log('[API] POST /api/auth/register - user exists', { email })
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const user = new User({
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
      role: role || 'masjid_admin',
      masjidId,
    })

    await user.save()
    console.log('[API] POST /api/auth/register - user created', { userId: user._id })

    // Return user without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      masjidId: user.masjidId,
    }

    const responsePayload = {
      success: true,
      user: userResponse,
      message: 'User registered successfully',
    }
    console.log('[API] POST /api/auth/register - success response', responsePayload)
    return NextResponse.json(responsePayload)

  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to register user' },
      { status: 500 }
    )
  }
}

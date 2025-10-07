import { NextRequest, NextResponse } from 'next/server'
import { connectDBSafe } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    console.log('[API] POST /api/auth/login - incoming request', {
      url: request.url,
      ts: new Date().toISOString(),
    })
    const db = await connectDBSafe()
    
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database unavailable' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { email, password } = body
    console.log('[API] POST /api/auth/login - payload received (summary)', {
      email,
      hasPassword: !!password,
    })

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      console.log('[API] POST /api/auth/login - user not found', { email })
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      console.log('[API] POST /api/auth/login - invalid password', { userId: user._id })
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      masjidId: user.masjidId,
    })

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
      token,
      message: 'Login successful',
    }
    console.log('[API] POST /api/auth/login - success response', {
      userId: user._id,
      hasToken: !!token,
    })
    return NextResponse.json(responsePayload)

  } catch (error) {
    console.error('Error logging in:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to login' },
      { status: 500 }
    )
  }
}

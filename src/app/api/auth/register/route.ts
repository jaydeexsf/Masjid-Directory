import { NextRequest, NextResponse } from 'next/server'
import { connectDBSafe } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const db = await connectDBSafe()
    
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database unavailable' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { email, name, password, role, masjidId } = body

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

    // Return user without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      masjidId: user.masjidId,
    }

    return NextResponse.json({
      success: true,
      user: userResponse,
      message: 'User registered successfully',
    })

  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to register user' },
      { status: 500 }
    )
  }
}

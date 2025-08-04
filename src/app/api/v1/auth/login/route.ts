import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/lib/schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = loginSchema.parse(body)
    
    // Get credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }
    
    // Check credentials
    if (
      validatedData.username === adminUsername &&
      validatedData.password === adminPassword
    ) {
      return NextResponse.json(
        { success: true, message: 'Login successful' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

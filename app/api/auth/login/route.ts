import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser, createAuthCookie } from '@/lib/jwt'
import { rateLimit, loginRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request, loginRateLimit)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many attempts. Try again later.' },
        { status: 429 }
      )
    }

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const result = await authenticateUser(email, password)

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Créer le cookie avec le token
    const response = NextResponse.json({
      success: true,
      user: result.user
    })

    response.headers.set('Set-Cookie', createAuthCookie(result.token))

    return response
  } catch (error) {
    if (error instanceof Error && error.message === 'AccessDenied') {
      return NextResponse.json(
        { success: false, error: 'Account is not active' },
        { status: 403 }
      )
    }

    console.error('[Login API] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

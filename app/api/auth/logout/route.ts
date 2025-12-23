import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/jwt'

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })

    // Supprimer le cookie du token
    response.headers.set('Set-Cookie', clearAuthCookie())

    return response
  } catch (error) {
    console.error('[Logout API] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

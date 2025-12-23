import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/jwt'

export async function GET(request: NextRequest) {
  try {
    const { user, error } = await requireAuth(request)

    if (error) {
      return NextResponse.json(
        { success: false, error },
        { status: error === 'No token provided' ? 401 : 403 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('[Auth Me API] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

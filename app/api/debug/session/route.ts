import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const session = await auth()

    // Also try to read cookies raw to debug
    // Cast to check cookies if available on request object (standard Request doesn't have it, but NextRequest does)
    // We'll use headers to be safe for raw cookie inspection
    const cookieHeader = request.headers.get('cookie')

    return NextResponse.json({
        status: session ? "authenticated" : "unauthenticated",
        session,
        env: {
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,
            AUTH_URL: process.env.AUTH_URL,
            NODE_ENV: process.env.NODE_ENV,
            AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
        },
        cookies_present: !!cookieHeader,
        cookie_names: cookieHeader ? cookieHeader.split(';').map(c => c.split('=')[0].trim()) : []
    })
}

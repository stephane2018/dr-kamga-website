import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['fr', 'en']
const defaultLocale = 'fr'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
  // Check if locale is in pathname
  const pathname = request.nextUrl.pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameLocale) return pathnameLocale

  // Check if locale is in cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim())
      .find((lang) => {
        const langPrefix = lang.split('-')[0]
        return locales.includes(langPrefix)
      })

    if (preferredLocale) {
      const langPrefix = preferredLocale.split('-')[0]
      return langPrefix
    }
  }

  return defaultLocale
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle authentication for admin routes using session cookie check
  if (pathname.startsWith('/admin')) {
    const isOnLoginPage = pathname === '/admin/login'
    // Check for NextAuth session token (works with both JWT and database sessions)
    const sessionToken = request.cookies.get('authjs.session-token')?.value ||
                        request.cookies.get('__Secure-authjs.session-token')?.value

    if (!sessionToken && !isOnLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (sessionToken && isOnLoginPage) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    return NextResponse.next()
  }

  // Skip middleware for static files, API routes, and special Next.js routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/robots')
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    // Redirect to locale-prefixed URL
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    newUrl.search = request.nextUrl.search

    const response = NextResponse.redirect(newUrl)

    // Set locale cookie
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    })

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}

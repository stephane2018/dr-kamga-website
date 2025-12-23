import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken, extractToken } from '@/lib/jwt'

/**
 * Middleware NextAuth - Protection des routes et gestion multilingue
 */

// Configuration multilingue
const locales = ['fr', 'en']
const defaultLocale = 'fr'

/**
 * Détecte la locale à utiliser pour l'utilisateur
 */
function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname

  // Vérifier si la locale est déjà dans le pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameLocale) return pathnameLocale

  // Vérifier le cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie
  }

  // Vérifier le header Accept-Language
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

/**
 * Middleware principal
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. ROUTES À IGNORER (Fichiers, API, etc.)
  if (
    pathname.includes('.') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap')
  ) {
    return NextResponse.next()
  }

  // 2. PROTECTION DES ROUTES ADMIN
  if (pathname.startsWith('/admin')) {
    const isOnLoginPage = pathname === '/admin/login'

    try {
      // Récupération et vérification du token JWT
      const token = extractToken(request)
      const user = token ? verifyToken(token) : null

      if (process.env.NODE_ENV === 'development') {
        console.log(`[Middleware Admin] 🕵️ Path: ${pathname}`, {
          hasToken: !!token,
          user: user?.email,
          isOnLoginPage
        })
      }

      // Pas de token et pas sur la page de login → rediriger vers login
      if (!user && !isOnLoginPage) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Middleware Admin] 🔐 Pas de token valide, redirection vers login (depuis ${pathname})`)
        }
        const loginUrl = new URL('/admin/login', request.url)
        return NextResponse.redirect(loginUrl)
      }

      // Token présent et sur la page de login → rediriger vers dashboard
      if (user && isOnLoginPage) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Middleware Admin] 📋 Token valide trouvé sur login, redirection vers dashboard`)
        }
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }

      // Tout est bon, ou on est sur login sans token
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Middleware Admin] ✅ OK: ${pathname} (User: ${user?.email || 'anonymous'})`)
      }
      return NextResponse.next()

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Middleware Admin] ❌ Erreur critique:', error)
      }
      if (!isOnLoginPage) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      return NextResponse.next()
    }
  }

  // --- ARRET ICI POUR LES ROUTES ADMIN ---
  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // 3. GESTION MULTILINGUE (Uniquement pour les routes non-admin)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    // Rediriger vers l'URL avec le préfixe de locale
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    newUrl.search = request.nextUrl.search

    const response = NextResponse.redirect(newUrl)

    // Sauvegarder la locale dans un cookie si différente
    if (request.cookies.get('NEXT_LOCALE')?.value !== locale) {
      response.cookies.set('NEXT_LOCALE', locale, {
        maxAge: 60 * 60 * 24 * 365, // 1 an
        path: '/',
      })
    }

    return response
  }

  return NextResponse.next()
}

/**
 * Configuration du matcher
 * Définit les routes où le middleware s'applique
 */
export const config = {
  matcher: [
    // Matcher toutes les routes sauf :
    // - /api, /_next, /_vercel
    // - les fichiers statiques (contenant un point)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}

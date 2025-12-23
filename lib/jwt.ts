import { SignJWT, jwtVerify } from 'jose'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET!
)
const JWT_EXPIRES_IN = '30d'

export interface CustomJWTPayload {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
}

/**
 * Génère un token JWT pour un utilisateur
 */
export async function generateToken(user: {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
}): Promise<string> {
  const payload: CustomJWTPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isActive: user.isActive
  }

  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('cabinetdab.com')
    .setAudience('cabinetdab-admin')
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET)
}

/**
 * Vérifie et décode un token JWT (fonctionne dans Edge Runtime)
 */
export async function verifyToken(token: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: 'cabinetdab.com',
      audience: 'cabinetdab-admin'
    })

    return payload as unknown as CustomJWTPayload
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[JWT] Token verification failed:', error)
    }
    return null
  }
}

/**
 * Authentifie un utilisateur avec email/password et retourne un token
 */
export async function authenticateUser(email: string, password: string): Promise<{ token: string; user: Omit<CustomJWTPayload, 'isActive'> } | null> {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email }
    })

    if (!admin) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if (!isPasswordValid) {
      return null
    }

    if (!admin.isActive) {
      throw new Error('AccessDenied')
    }

    const token = await generateToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      isActive: admin.isActive
    })

    return {
      token,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[JWT] Authentication error:', error)
    }
    return null
  }
}

/**
 * Extrait le token du header Authorization ou des cookies
 */
export function extractToken(request: Request): string | null {
  // 1. Vérifier le header Authorization
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  // 2. Vérifier les cookies
  const cookies = request.headers.get('cookie')
  if (cookies) {
    const tokenMatch = cookies.match(/auth-token=([^;]+)/)
    if (tokenMatch) {
      return decodeURIComponent(tokenMatch[1])
    }
  }

  return null
}

/**
 * Middleware pour vérifier le token JWT dans les API routes
 */
export async function requireAuth(request: Request): Promise<{ user: CustomJWTPayload; error?: string }> {
  const token = extractToken(request)

  if (!token) {
    return { user: null as any, error: 'No token provided' }
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return { user: null as any, error: 'Invalid token' }
  }

  if (!payload.isActive) {
    return { user: null as any, error: 'Account inactive' }
  }

  return { user: payload }
}

/**
 * Vérifie si l'utilisateur a le rôle requis
 */
export function hasRole(user: CustomJWTPayload | null, role: string): boolean {
  return user?.role === role
}

/**
 * Vérifie si l'utilisateur est admin ou manager
 */
export function isAdmin(user: CustomJWTPayload | null): boolean {
  const userRole = user?.role
  return userRole === 'admin' || userRole === 'manager'
}

/**
 * Crée un cookie HTTP-only pour le token
 */
export function createAuthCookie(token: string): string {
  return `auth-token=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=lax; Max-Age=${30 * 24 * 60 * 60}; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`
}

/**
 * Crée un cookie pour supprimer le token
 */
export function clearAuthCookie(): string {
  return 'auth-token=; Path=/; HttpOnly; SameSite=lax; Max-Age=0;'
}

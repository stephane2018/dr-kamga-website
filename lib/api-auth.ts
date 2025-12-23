import { auth } from "@/lib/auth"
import type { Session } from "next-auth"

/**
 * Middleware pour vérifier l'authentification dans les API routes
 */
export async function withAuth(): Promise<{ session: Session | null; error?: string; status?: number }> {
  try {
    const session = await auth()
    
    if (!session) {
      return {
        session: null,
        error: "Unauthorized - No session",
        status: 401
      }
    }
    
    return { session }
  } catch (error) {
    console.error("[API Auth] Error verifying session:", error)
    return {
      session: null,
      error: "Internal server error",
      status: 500
    }
  }
}

/**
 * Middleware pour vérifier le rôle admin
 */
export async function requireAdmin(): Promise<{ session: Session | null; error?: string; status?: number }> {
  const authResult = await withAuth()
  
  if (authResult.error) {
    return authResult
  }
  
  if (!authResult.session || authResult.session.user?.role !== "admin") {
    return {
      session: authResult.session,
      error: "Unauthorized - Admin role required",
      status: 403
    }
  }
  
  return { session: authResult.session }
}

/**
 * Middleware pour vérifier les rôles admin ou manager
 */
export async function requireAdminOrManager(): Promise<{ session: Session | null; error?: string; status?: number }> {
  const authResult = await withAuth()
  
  if (authResult.error) {
    return authResult
  }
  
  const userRole = authResult.session?.user?.role
  if (!authResult.session || (userRole !== "admin" && userRole !== "manager")) {
    return {
      session: authResult.session,
      error: "Unauthorized - Admin or Manager role required",
      status: 403
    }
  }
  
  return { session: authResult.session }
}

/**
 * Vérifie si l'utilisateur peut accéder à une ressource (owner ou admin)
 */
export async function canAccessResource(
  resourceOwnerId?: string
): Promise<{ session: Session | null; error?: string; status?: number }> {
  const authResult = await withAuth()
  
  if (authResult.error) {
    return authResult
  }
  
  const userRole = authResult.session?.user?.role
  const userId = authResult.session?.user?.id
  
  // Admin peut tout accéder
  if (userRole === "admin") {
    return { session: authResult.session }
  }
  
  // Manager peut accéder si c'est sa ressource
  if (userRole === "manager" && resourceOwnerId && userId === resourceOwnerId) {
    return { session: authResult.session }
  }
  
  return {
    session: authResult.session,
    error: "Unauthorized - Insufficient permissions",
    status: 403
  }
}

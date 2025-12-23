import { NextRequest } from "next/server"
import { requireAuth, isAdmin, hasRole } from "@/lib/jwt"

/**
 * Middleware pour protéger les routes admin avec JWT
 */
export async function withAdminAuth(request: NextRequest) {
  const { user, error } = await requireAuth(request)
  
  if (error || !isAdmin(user)) {
    return {
      error: error || "Unauthorized",
      status: error === "No token provided" ? 401 : 403,
      user: null
    }
  }
  
  return { error: null, status: 200, user }
}

/**
 * Middleware pour protéger les routes admin avec rôle spécifique
 */
export async function withRoleAuth(request: NextRequest, requiredRole: string) {
  const { user, error } = await requireAuth(request)
  
  if (error || !hasRole(user, requiredRole)) {
    return {
      error: error || "Unauthorized",
      status: error === "No token provided" ? 401 : 403,
      user: null
    }
  }
  
  return { error: null, status: 200, user }
}

/**
 * Middleware pour protéger les routes admin ou manager
 */
export async function withAdminOrManagerAuth(request: NextRequest) {
  const { user, error } = await requireAuth(request)
  
  if (error || !isAdmin(user)) {
    return {
      error: error || "Unauthorized",
      status: error === "No token provided" ? 401 : 403,
      user: null
    }
  }
  
  return { error: null, status: 200, user }
}

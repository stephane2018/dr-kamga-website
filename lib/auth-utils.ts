/**
 * Utilitaires pour l'authentification
 * Helper functions pour gérer les sessions, tokens et contrôle d'accès
 */

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import type { Session } from "next-auth"
import { env } from "@/lib/env"

/**
 * Récupère la session côté serveur
 * Utiliser dans les Server Components et les API Routes
 */
export async function getServerSession(): Promise<Session | null> {
  try {
    const session = await auth()
    return session
  } catch (error) {
    console.error("[Auth Utils] Erreur récupération session:", error)
    return null
  }
}

/**
 * Vérifie si l'utilisateur est authentifié (côté serveur)
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession()
  return !!session?.user
}

/**
 * Exige l'authentification et redirige vers login si nécessaire
 */
export async function requireAuth(): Promise<Session> {
  const session = await getServerSession()
  
  if (!session || !session.user) {
    redirect("/admin/login")
  }
  
  return session
}

/**
 * Vérifie si l'utilisateur a un rôle spécifique
 */
export async function hasRole(role: string): Promise<boolean> {
  const session = await getServerSession()
  return session?.user?.role === role
}

/**
 * Vérifie si l'utilisateur a le rôle requis (avec session en paramètre)
 */
export function hasRoleSync(session: Session | null, role: string): boolean {
  return session?.user?.role === role
}

/**
 * Vérifie si l'utilisateur est admin ou manager
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession()
  const userRole = session?.user?.role
  return userRole === "admin" || userRole === "manager"
}

/**
 * Vérifie si l'utilisateur est admin ou manager (avec session en paramètre)
 */
export function isAdminSync(session: Session | null): boolean {
  const userRole = session?.user?.role
  return userRole === "admin" || userRole === "manager"
}

/**
 * Vérifie si l'utilisateur est super admin
 */
export async function isSuperAdmin(): Promise<boolean> {
  return await hasRole("admin")
}

/**
 * Récupère l'utilisateur actuel
 */
export async function getCurrentUser() {
  const session = await getServerSession()
  return session?.user || null
}

/**
 * Récupère le token JWT pour les appels API
 * Note: NextAuth gère les cookies automatiquement, cette fonction est utilitaire
 */
export async function getAuthToken(): Promise<string | null> {
  const session = await getServerSession()
  // Retourne l'ID de session comme identifiant unique
  return session?.user?.id || null
}

/**
 * Headers pour les requêtes API authentifiées
 * NextAuth utilise les cookies automatiquement, pas besoin d'Authorization header
 */
export async function getAuthHeaders(): Promise<HeadersInit> {
  return {
    'Content-Type': 'application/json',
  }
}

/**
 * Affiche les informations de session pour debugging (uniquement en développement)
 */
export async function debugSession(): Promise<Session | null> {
  if (!env.isDevelopment) {
    return null
  }
  
  const session = await getServerSession()

  console.log("=".repeat(50))
  console.log("🔍 DEBUG SESSION")
  console.log("=".repeat(50))

  if (session) {
    console.log("✅ Session active")
    console.log("📧 Email:", session.user?.email)
    console.log("👤 Nom:", session.user?.name)
    console.log("🎭 Rôle:", session.user?.role)
    console.log("🆔 ID:", session.user?.id)
    console.log("⏰ Expire:", session.expires)
  } else {
    console.log("❌ Aucune session active")
  }

  console.log("=".repeat(50))

  return session
}

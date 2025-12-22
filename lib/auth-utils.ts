/**
 * Utilitaires pour l'authentification
 * Helper functions pour gérer les sessions et le debugging
 */

import { auth } from "@/lib/auth"

/**
 * Récupère la session côté serveur
 * Utiliser dans les Server Components et les API Routes
 */
export async function getServerSession() {
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
export async function isAuthenticated() {
  const session = await getServerSession()
  return !!session?.user
}

/**
 * Vérifie si l'utilisateur a un rôle spécifique
 */
export async function hasRole(role: string) {
  const session = await getServerSession()
  return session?.user?.role === role
}

/**
 * Récupère l'utilisateur actuel
 */
export async function getCurrentUser() {
  const session = await getServerSession()
  return session?.user || null
}

/**
 * Affiche les informations de session pour debugging
 */
export async function debugSession() {
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

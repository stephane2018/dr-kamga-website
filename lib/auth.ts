import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { env, isProduction } from "@/lib/env"

/**
 * NextAuth v5 Configuration
 * Gestion unifiée des sessions pour local et production
 */
console.log("⚡️ [Auth] Config:", {
  isProduction: env.isProduction,
  siteUrl: env.siteUrl,
  hasSecret: !!env.nextAuthSecret,
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configuration de base pour la fiabilité des domaines
  trustHost: true,
  secret: env.nextAuthSecret,

  // Debug de la configuration pour le déploiement
  debug: env.isDevelopment && process.env.NODE_ENV !== 'test',

  // Configuration des sessions
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },

  // Provider d'authentification par credentials
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email as string },
          })

          if (!admin) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            admin.password
          )

          if (!isPasswordValid) {
            return null
          }

          if (!admin.isActive) {
            throw new Error("AccessDenied")
          }

          if (env.isDevelopment) {
            console.log("[Auth] ✅ Authentification réussie:", admin.email)
          }

          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            isActive: admin.isActive,
          }
        } catch (error) {
          if (env.isDevelopment) {
            console.error("[Auth] ❌ Erreur d'autorisation:", error)
          }
          return null
        }
      },
    }),
  ],

  // Pages personnalisées
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },

  // Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role
        token.isActive = user.isActive
      }
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.role = token.role as string
      }
      return session
    },

    async signIn({ user }) {
      return !!user.isActive
    },
  },

  // Gestion des cookies pour la production (HTTPS) et le développement (HTTP)
  useSecureCookies: isProduction,
  cookies: {
    sessionToken: {
      name: `${isProduction ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
                secure: isProduction
      },
    },
  },

  // Events pour le monitoring (uniquement en développement)
  events: {
    signIn: async ({ user }) => {
      if (env.isDevelopment) {
        console.log("[Auth] 🎉 Session démarrée pour:", user.email)
      }
    },
  },
})

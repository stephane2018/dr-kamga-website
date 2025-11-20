import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const admin = await prisma.admin.findUnique({
          where: {
            email: credentials.email as string,
          },
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

        // Check if user is active
        if (!admin.isActive) {
          return null
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdminPanel = nextUrl.pathname.startsWith('/admin')
      const isOnLoginPage = nextUrl.pathname === '/admin/login'

      if (isOnAdminPanel && !isOnLoginPage) {
        if (!isLoggedIn) return false
        return true
      }

      if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL('/admin/dashboard', nextUrl))
      }

      return true
    },
  },
  session: {
    strategy: "jwt",
  },
})

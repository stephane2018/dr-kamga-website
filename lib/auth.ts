import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
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

        // Return user data with isActive flag
        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          isActive: admin.isActive,
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
        token.role = (user as any).role
        token.isActive = (user as any).isActive
      }
      return token
    },
    async signIn({ user }) {
      // console.log("signIn callback - user:", user)
      if ((user as any).isActive === false) {
        // console.log("User is not active, blocking login")
        return false
      }
      // console.log("User is active, allowing login")
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 180, // 180 days
    updateAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 180,
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  useSecureCookies: process.env.NODE_ENV === "production",
})

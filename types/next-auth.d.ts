import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    username: string
    email: string | null
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
  }
}

"use client"

import { JWTProvider } from "@/contexts/jwt-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <JWTProvider>
      {children}
    </JWTProvider>
  )
}

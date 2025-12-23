"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface JWTContextType {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const JWTContext = createContext<JWTContextType | undefined>(undefined)

export function JWTProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('[JWT Context] Error refreshing user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('[JWT Context] Error logging out:', error)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <JWTContext.Provider value={{ user, loading, logout, refresh }}>
      {children}
    </JWTContext.Provider>
  )
}

export function useJWT() {
  const context = useContext(JWTContext)
  if (context === undefined) {
    throw new Error('useJWT must be used within a JWTProvider')
  }
  return context
}

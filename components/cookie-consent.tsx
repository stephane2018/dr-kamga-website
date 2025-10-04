"use client"

import { useState, useEffect } from "react"
import { X, Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = document.cookie.includes("cookie_consent=accepted")

    if (!hasAcceptedCookies) {
      // Show banner after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    // Set cookie to remember user has accepted (expires in 1 year)
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)
    document.cookie = `cookie_consent=accepted; expires=${expiryDate.toUTCString()}; path=/`
    setIsVisible(false)
  }

  const handleDecline = () => {
    // Set cookie to remember user has declined (expires in 30 days)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)
    document.cookie = `cookie_consent=declined; expires=${expiryDate.toUTCString()}; path=/`
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-1 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Cookie className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 mb-1">
              Nous utilisons des cookies
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et personnaliser le contenu.
              En continuant, vous acceptez notre utilisation des cookies.{" "}
              <Link
                href="/politique-cookies"
                className="text-primary hover:underline font-medium"
              >
                En savoir plus
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full sm:w-auto flex-shrink-0">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 sm:flex-none rounded-xl border-2"
            >
              Refuser
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 rounded-xl"
            >
              Accepter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

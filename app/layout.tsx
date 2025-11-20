import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { StructuredData } from "@/components/structured-data"
import { NewsletterModal } from "@/components/newsletter-modal"
import { CookieConsent } from "@/components/cookie-consent"
import { GA } from "@/components/google-analytics"
import { LanguageProvider } from "@/locales/LanguageProvider"
import { getMetadata } from "@/locales/metadata"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import "./globals.css"

// This will be overridden by generateMetadata in [lang]/layout.tsx for specific language routes
export const metadata: Metadata = getMetadata('fr')

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <StructuredData type="website" />
        <StructuredData type="organization" />
        <StructuredData type="person" />
        <StructuredData type="course" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SessionProvider>
          <LanguageProvider>
            <Suspense fallback={null}>{children}</Suspense>
            <NewsletterModal />
            <CookieConsent />
            <Analytics />
            <GA />
            <Toaster />
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

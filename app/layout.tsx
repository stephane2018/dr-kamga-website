import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { StructuredData } from "@/components/structured-data"
import { NewsletterModal } from "@/components/newsletter-modal"
import { CookieConsent } from "@/components/cookie-consent"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "CabinetDab - De la ferme aux Marchés Mondiaux",
    template: "%s | CabinetDab"
  },
  description:
    "Programme de formation agricole de CabinetDab pour transformer votre exploitation locale en entreprise exportatrice. Masterclass, séminaires et coaching avec le Dr. Kanga.",
  keywords: [
    "formation agricole",
    "export agricole",
    "transformation locale",
    "assurance agricole",
    "Dr Kanga",
    "CabinetDab",
    "agriculture internationale",
    "coaching agricole",
    "séminaires agriculture",
    "masterclass agriculture"
  ],
  authors: [{ name: "Dr. Kanga", url: "https://www.cabinetdab.com/a-propos" }],
  creator: "CabinetDab",
  publisher: "CabinetDab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.cabinetdab.com'),
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
      { url: '/new-logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/new-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
      'fr': '/',
    },
  },
  openGraph: {
    title: "CabinetDab - De la ferme aux Marchés Mondiaux",
    description: "Programme de formation agricole pour transformer votre exploitation locale en entreprise exportatrice. Masterclass, séminaires et coaching avec le Dr. Kanga.",
    url: 'https://www.cabinetdab.com',
    siteName: 'CabinetDab',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CabinetDab - Formation agricole pour l\'exportation',
      },
      {
        url: '/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'Dr. Kanga - Expert en agriculture',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "CabinetDab - De la ferme aux Marchés Mondiaux",
    description: "Programme de formation agricole pour transformer votre exploitation locale en entreprise exportatrice.",
    images: ['/twitter-image.jpg'],
    creator: '@cabinetdab',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <StructuredData type="website" />
        <StructuredData type="organization" />
        <StructuredData type="person" />
        <StructuredData type="course" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <NewsletterModal />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import type { Language } from "./translations"

interface MetadataTranslations {
  title: {
    default: string
    template: string
  }
  description: string
  keywords: string[]
  openGraph: {
    title: string
    description: string
    images: {
      url: string
      width: number
      height: number
      alt: string
    }[]
  }
  twitter: {
    title: string
    description: string
  }
}

const metadataTranslations: Record<Language, MetadataTranslations> = {
  fr: {
    title: {
      default: "CabinetDab - De la ferme aux Marchés Mondiaux",
      template: "%s | CabinetDab"
    },
    description: "Programme de formation agricole de CabinetDab pour transformer votre exploitation locale en entreprise exportatrice. Masterclass, séminaires et coaching avec le Dr. Kanga.",
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
    openGraph: {
      title: "CabinetDab - De la ferme aux Marchés Mondiaux",
      description: "Programme de formation agricole pour transformer votre exploitation locale en entreprise exportatrice. Masterclass, séminaires et coaching avec le Dr. Kanga.",
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
      title: "CabinetDab - De la ferme aux Marchés Mondiaux",
      description: "Programme de formation agricole pour transformer votre exploitation locale en entreprise exportatrice.",
    }
  },
  en: {
    title: {
      default: "CabinetDab - From Farm to Global Markets",
      template: "%s | CabinetDab"
    },
    description: "CabinetDab's agricultural training program to transform your local farm into an exporting business. Masterclass, seminars and coaching with Dr. Kanga.",
    keywords: [
      "agricultural training",
      "agricultural export",
      "local transformation",
      "agricultural insurance",
      "Dr Kanga",
      "CabinetDab",
      "international agriculture",
      "agricultural coaching",
      "agriculture seminars",
      "agriculture masterclass"
    ],
    openGraph: {
      title: "CabinetDab - From Farm to Global Markets",
      description: "Agricultural training program to transform your local farm into an exporting business. Masterclass, seminars and coaching with Dr. Kanga.",
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'CabinetDab - Agricultural training for export',
        },
        {
          url: '/og-image-square.jpg',
          width: 1200,
          height: 1200,
          alt: 'Dr. Kanga - Agriculture Expert',
        }
      ],
    },
    twitter: {
      title: "CabinetDab - From Farm to Global Markets",
      description: "Agricultural training program to transform your local farm into an exporting business.",
    }
  }
}

export function getMetadata(language: Language = 'fr'): Metadata {
  const meta = metadataTranslations[language]

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
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
        'en': '/en',
      },
    },
    openGraph: {
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      url: 'https://www.cabinetdab.com',
      siteName: 'CabinetDab',
      locale: language === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: meta.openGraph.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.twitter.title,
      description: meta.twitter.description,
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
      google: 'NEPTsymhFMhA-fUCBU1FPjjIUmsvHKENn07fhzk86a4',
    },
  }
}

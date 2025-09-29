import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'course'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  noIndex?: boolean
}

export function generateSEOMetadata({
  title = "Cabinet DAB - De la ferme aux Marchés Mondiaux",
  description = "Programme de formation agricole pour transformer votre exploitation locale en entreprise exportatrice. Masterclass, séminaires et coaching avec le Dr. Kanga.",
  keywords = [],
  image = "/og-image.jpg",
  url = "",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Dr. Kanga",
  section,
  noIndex = false
}: SEOProps): Metadata {
  const baseUrl = "https://www.cabinetdab.com"
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  const baseKeywords = [
    "formation agricole",
    "export agricole",
    "transformation locale",
    "assurance agricole",
    "Dr Kanga",
    "Cabinet DAB",
    "agriculture internationale",
    "coaching agricole"
  ]

  return {
    title: title === "Cabinetdab - De la ferme aux Marchés Mondiaux" ? title : `${title} | Cabinetdab`,
    description,
    keywords: [...baseKeywords, ...keywords],
    authors: [{ name: author, url: `${baseUrl}/a-propos` }],
    creator: "Cabinetdab",
    publisher: "Cabinetdab",
    robots: noIndex ? {
      index: false,
      follow: false
    } : {
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
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Cabinetdab',
      locale: 'fr_FR',
      type: type === 'article' ? 'article' : 'website',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [author],
        section,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: '@cabinetdab',
    },
  }
}

// Helper function for common page types
export const seoConfig = {
  home: {
    title: "Cabinet DAB - De la ferme aux Marchés Mondiaux",
    description: "Programme de formation agricole pour transformer votre exploitation locale en entreprise exportatrice. Masterclass, séminaires et coaching avec le Dr. Kanga.",
    keywords: ["programme signature", "formation complète", "méthode cabinetdab"],
    image: "/og-image.jpg"
  },
  masterclass: {
    title: "Masterclass Thématiques - Formation Agricole",
    description: "Sessions expertes et interactives avec le Dr. Kanga. Perfectionnez vos connaissances sur des sujets spécifiques avec vidéos complémentaires incluses.",
    keywords: ["masterclass", "formation en ligne", "sessions live", "expertise agricole"],
    image: "/og-masterclass.jpg"
  },
  seminaires: {
    title: "Séminaires Pratiques - Formation Agriculture",
    description: "Immersion totale avec exercices pratiques et networking. Appliquez concrètement les méthodes apprises dans nos séminaires de 3 jours.",
    keywords: ["séminaires", "formation présentielle", "networking", "exercices pratiques"],
    image: "/og-seminaires.jpg"
  },
  coaching: {
    title: "Coaching Privé Agricole - Accompagnement Personnalisé",
    description: "Accompagnement personnalisé pour accélérer vos résultats. Service premium pour entrepreneurs ambitieux avec suivi continu.",
    keywords: ["coaching privé", "accompagnement personnalisé", "suivi individuel", "plan sur-mesure"],
    image: "/og-coaching.jpg"
  },
  contact: {
    title: "Contact - Cabinetdab Formation Agricole",
    description: "Contactez notre équipe pour plus d'informations sur nos programmes de formation agricole et nos services d'accompagnement.",
    keywords: ["contact", "information", "devis", "consultation"],
    image: "/og-contact.jpg"
  },
  apropos: {
    title: "À Propos - Dr. Kanga et Cabinetdab",
    description: "Découvrez l'expertise du Dr. Kanga et l'histoire de Cabinetdab, plus de 20 ans d'expérience dans l'accompagnement d'agriculteurs vers l'export.",
    keywords: ["Dr Kanga", "équipe", "expertise", "expérience", "histoire"],
    image: "/og-apropos.jpg"
  }
}
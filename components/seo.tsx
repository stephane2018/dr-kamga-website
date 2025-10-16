import { Metadata } from 'next'
import { translations, type Language } from '@/locales/translations'

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
  lang?: Language
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image = "/og-image.jpg",
  url = "",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Dr. Kanga",
  section,
  noIndex = false,
  lang = 'fr'
}: SEOProps): Metadata {
  const t = translations[lang]
  
  // Use provided values or fall back to translated defaults
  const finalTitle = title || t.seo.home.title
  const finalDescription = description || t.seo.home.description
  const baseUrl = "https://www.cabinetdab.com"
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  const baseKeywords = lang === 'fr' ? [
    "formation agricole",
    "export agricole",
    "transformation locale",
    "Dr Kanga",
    "Cabinet DAB",
    "agriculture internationale",
    "coaching agricole"
  ] : [
    "agricultural training",
    "agricultural export",
    "local transformation",
    "Dr Kanga",
    "Cabinet DAB",
    "international agriculture",
    "agricultural coaching"
  ]

  return {
    title: finalTitle.includes('Cabinet DAB') ? finalTitle : `${finalTitle} | Cabinetdab`,
    description: finalDescription,
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
      languages: {
        'fr': fullUrl.replace(`/${lang}`, '/fr'),
        'en': fullUrl.replace(`/${lang}`, '/en'),
      },
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: fullUrl,
      siteName: 'Cabinetdab',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: type === 'article' ? 'article' : 'website',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
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
      title: finalTitle,
      description: finalDescription,
      images: [fullImageUrl],
      creator: '@cabinetdab',
    },
  }
}

export function getSEOConfig(lang: Language = 'fr') {
  const t = translations[lang]
  
  return {
    home: {
      title: t.seo.home.title,
      description: t.seo.home.description,
      keywords: t.seo.home.keywords,
      image: "/og-image.jpg",
      lang
    },
    masterclass: {
      title: t.seo.masterclass.title,
      description: t.seo.masterclass.description,
      keywords: t.seo.masterclass.keywords,
      image: "/og-masterclass.jpg",
      lang
    },
    seminaires: {
      title: t.seo.seminaires.title,
      description: t.seo.seminaires.description,
      keywords: t.seo.seminaires.keywords,
      image: "/og-seminaires.jpg",
      lang
    },
    coaching: {
      title: t.seo.coaching.title,
      description: t.seo.coaching.description,
      keywords: t.seo.coaching.keywords,
      image: "/og-coaching.jpg",
      lang
    },
    contact: {
      title: t.seo.contact.title,
      description: t.seo.contact.description,
      keywords: t.seo.contact.keywords,
      image: "/og-contact.jpg",
      lang
    },
    apropos: {
      title: t.seo.apropos.title,
      description: t.seo.apropos.description,
      keywords: t.seo.apropos.keywords,
      image: "/og-apropos.jpg",
      lang
    }
  }
}

export const seoConfig = getSEOConfig('fr')
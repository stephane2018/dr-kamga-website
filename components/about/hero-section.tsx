"use client";
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/locales/LanguageProvider"
import { getLocalizedField, getLocalizedArray } from "@/lib/helpers/language"
import { Skeleton } from "@/components/ui/skeleton"

interface AboutContent {
  id: string
  badgeFr: string
  badgeEn: string
  titleFr: string
  titleEn: string
  descriptionFr: string
  descriptionEn: string
  credentials: { fr: string[]; en: string[] }
  imageUrl: string
  isActive: boolean
}

export function AboutHeroSection() {
  const { t, language } = useLanguage()
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAboutContent() {
      try {
        setLoading(true)
        const response = await fetch('/api/about-content')
        const result = await response.json()

        if (result.success) {
          setAboutContent(result.data)
        } else {
          setError(result.error || 'Failed to load about content')
        }
      } catch (err) {
        setError('Failed to load about content')
        console.error('Error fetching about content:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutContent()
  }, [])

  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-800 py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Skeleton className="h-6 w-40 mb-4 bg-white/20" />
              <Skeleton className="h-12 w-3/4 mb-6 bg-white/20" />
              <Skeleton className="h-6 w-full mb-2 bg-white/20" />
              <Skeleton className="h-6 w-5/6 mb-6 bg-white/20" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-4 w-full bg-white/20" />
                ))}
              </div>
            </div>
            <div className="relative">
              <Skeleton className="w-full aspect-square rounded-[2rem] bg-white/20" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !aboutContent) {
    return (
      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-800 py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white">{error || 'Content not available'}</p>
          </div>
        </div>
      </section>
    )
  }

  const credentials = getLocalizedArray<string>(aboutContent, 'credentials', language)

  return (
    <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-800 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-10 left-10 w-24 h-24" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
          <path d="M30 50 L50 30 L70 50 L50 70 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        <svg className="absolute top-20 right-20 w-32 h-32" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="1.5" fill="none" rx="8" />
          <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-white/20 text-white border-white/30" variant="secondary">
              {getLocalizedField(aboutContent, 'badge', language)}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">
              {getLocalizedField(aboutContent, 'title', language)}
            </h1>
            <p className="text-xl text-white/90 mb-6 text-pretty leading-relaxed">
              {getLocalizedField(aboutContent, 'description', language)}
            </p>
            <div className="space-y-3 text-white/90">
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span>{credential}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-[3rem] rotate-3 scale-105"></div>
              <div className="relative bg-gradient-to-br from-primary-foreground to-secondary/20 rounded-[2.5rem] p-2 shadow-2xl">
                <img
                  src={aboutContent.imageUrl}
                  alt="Dr. Kanga - Expert en agriculture internationale"
                  className="rounded-[2rem] w-full h-full object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { ServiceCard } from "./service-card"
import { AnimatedBackground } from "./animated-background"
import { SectionHeader } from "./section-header"
import { useLanguage } from "@/locales/LanguageProvider"
import { getLocalizedField, getLocalizedArray } from "@/lib/helpers/language"
import { getIconComponent } from "@/lib/helpers/icons"
import { Skeleton } from "./ui/skeleton"
import { Card, CardContent, CardHeader } from "./ui/card"

interface HomeService {
  id: string
  slug: string
  icon: string
  categoryFr: string
  categoryEn: string
  titleFr: string
  titleEn: string
  subtitleFr: string
  subtitleEn: string
  descriptionFr: string
  descriptionEn: string
  features: { fr: string[]; en: string[] }
  ctaTextFr: string
  ctaTextEn: string
  ctaLink: string
  gradientPosition: string
  order: number
  isActive: boolean
}

export function ProgressPathSection() {
  const { t, language } = useLanguage()
  const [services, setServices] = useState<HomeService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true)
        const response = await fetch('/api/home-services')
        const result = await response.json()

        if (result.success) {
          setServices(result.data)
        } else {
          setError(result.error || 'Failed to load services')
        }
      } catch (err) {
        setError('Failed to load services')
        console.error('Error fetching services:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])
  
  if (loading) {
    return (
      <section className="relative py-20 bg-muted/30 overflow-hidden">
        <AnimatedBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardHeader>
                  <Skeleton className="h-6 w-20 mb-2" />
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative py-20 bg-muted/30 overflow-hidden">
        <AnimatedBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-20 bg-muted/30 overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title={t.progressPath.title}
          description={t.progressPath.subtitle}
          ctaText={t.progressPath.ctaText}
          ctaLink="/masterclass"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => {
            const featuresArray = getLocalizedArray<string>(service, 'features', language)
            // Transform string array to ServiceFeature format
            const features = featuresArray.map((feature) => {
              // Check if feature is already in object format
              if (typeof feature === 'object' && 'title' in feature) {
                return feature as { title: string; description: string }
              }
              // Otherwise, split by " — " or use whole string as title
              const parts = feature.split(' — ')
              return {
                title: parts[0] || feature,
                description: parts[1] || ''
              }
            })

            return (
              <ServiceCard
                key={service.id}
                icon={getIconComponent(service.icon)}
                category={getLocalizedField(service, 'category', language)}
                title={getLocalizedField(service, 'title', language)}
                subtitle={getLocalizedField(service, 'subtitle', language)}
                description={getLocalizedField(service, 'description', language)}
                features={features}
                ctaText={getLocalizedField(service, 'ctaText', language)}
                ctaLink={service.ctaLink}
                gradientPosition={service.gradientPosition as any}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
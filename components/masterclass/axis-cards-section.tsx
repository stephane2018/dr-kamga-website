"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  Users,
  Sprout,
  Factory,
  Globe,
  Shield,
  CookingPot,
  DollarSign,
  Package,
  Truck,
  Warehouse,
  Leaf,
  Lightbulb,
  Target,
  TrendingUp,
  Brain,
  BookOpen,
  Award,
  Briefcase,
  Heart,
  Zap,
  Star,
  type LucideIcon
} from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AxisCard {
  id: string
  axisKey: string
  icon: string
  iconColor: string
  titleFr: string
  titleEn: string
  descriptionFr: string
  descriptionEn: string
  contentFr: string
  contentEn: string
  features: { fr: string[]; en: string[] }
  duration: string
  maxParticipants: number
  order: number
  isVisibleOnHome: boolean
}

// Icon mapping from string name to Lucide component
const iconMap: Record<string, LucideIcon> = {
  Sprout,
  Factory,
  Globe,
  Shield,
  CookingPot,
  DollarSign,
  Package,
  Truck,
  Warehouse,
  Leaf,
  Lightbulb,
  Target,
  TrendingUp,
  Brain,
  BookOpen,
  Award,
  Briefcase,
  Heart,
  Zap,
  Star,
  Users,
  Calendar,
}

// Color mapping for background and text classes
const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary"
  },
  secondary: {
    bg: "bg-secondary/10",
    text: "text-secondary"
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent"
  }
}

interface AxisCardProps {
  data: AxisCard
}

function AxisCardComponent({ data }: AxisCardProps) {
  const { language, t } = useLanguage()
  const Icon = iconMap[data.icon] || Sprout

  const title = language === 'fr' ? data.titleFr : data.titleEn
  const description = language === 'fr' ? data.descriptionFr : data.descriptionEn
  const content = language === 'fr' ? data.contentFr : data.contentEn
  const features = language === 'fr' ? data.features.fr : data.features.en

  // Get color classes or fallback to primary
  const colors = colorClasses[data.iconColor as keyof typeof colorClasses] || colorClasses.primary

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colors.bg)}>
            <Icon className={cn("h-6 w-6", colors.text)} />
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          {content}
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground mb-4">
          {features.map((feature: string, index: number) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{data.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{t.masterclass.axisCards.maxParticipants.replace('{count}', String(data.maxParticipants))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AxisCardsSection() {
  const { t } = useLanguage()
  const [axisCards, setAxisCards] = useState<AxisCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAxisCards = async () => {
      try {
        const response = await fetch('/api/axis-cards')
        const data = await response.json()

        if (data.success) {
          const visibleCards = data.data
            .filter((card: AxisCard) => card.isVisibleOnHome)
            .sort((a: AxisCard, b: AxisCard) => a.order - b.order)

          setAxisCards(visibleCards)
        }
      } catch (error) {
        console.error('Error fetching axis cards:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAxisCards()
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.masterclass.axisCards.title}</h2>
            <p className="text-xl text-muted-foreground">
              {t.masterclass.axisCards.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (axisCards.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.masterclass.axisCards.title}</h2>
          <p className="text-xl text-muted-foreground">
            {t.masterclass.axisCards.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {axisCards.map((card) => (
            <AxisCardComponent key={card.id} data={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

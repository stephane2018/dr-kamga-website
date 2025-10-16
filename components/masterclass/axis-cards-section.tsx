"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Sprout, Factory, Globe, Shield, type LucideIcon, CookingPot, DollarSign } from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"

interface AxisCardData {
  icon: LucideIcon
  iconColor: string
  axisKey: 'axis1' | 'axis2' | 'axis3' | 'axis4' | 'axis5' | 'axis6'
}

const axisCardsConfig: AxisCardData[] = [
  { icon: Sprout, iconColor: "primary", axisKey: 'axis1' },
  { icon: Factory, iconColor: "secondary", axisKey: 'axis2' },
  { icon: Globe, iconColor: "accent", axisKey: 'axis3' },
  { icon: Shield, iconColor: "primary", axisKey: 'axis4' },
  { icon: CookingPot, iconColor: "secondary", axisKey: 'axis5' },
  { icon: DollarSign, iconColor: "secondary", axisKey: 'axis6' },
]

interface AxisCardProps {
  data: AxisCardData
}

function AxisCard({ data }: AxisCardProps) {
  const { t } = useLanguage()
  const Icon = data.icon
  const axisData = t.masterclass.axes[data.axisKey]

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-${data.iconColor}/10 rounded-lg flex items-center justify-center`}>
            <Icon className={`h-6 w-6 text-${data.iconColor}`} />
          </div>
          <div>
            <CardTitle className="text-xl">{axisData.title}</CardTitle>
            <CardDescription>{axisData.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          {axisData.content}
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground mb-4">
          {axisData.features.map((feature: string, index: number) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{axisData.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{t.masterclass.axisCards.maxParticipants.replace('{count}', String(axisData.maxParticipants))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AxisCardsSection() {
  const { t } = useLanguage()
  
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
          {axisCardsConfig.map((cardData, index) => (
            <AxisCard key={index} data={cardData} />
          ))}
        </div>
      </div>
    </section>
  )
}

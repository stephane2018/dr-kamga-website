"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Network } from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"

export function FeaturesSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.seminaires.features.title}</h2>
          <p className="text-xl text-muted-foreground">
            {t.seminaires.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>{t.seminaires.features.cards.collective.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t.seminaires.features.cards.collective.description}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle>{t.seminaires.features.cards.practical.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t.seminaires.features.cards.practical.description}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Network className="h-8 w-8 text-accent" />
              </div>
              <CardTitle>{t.seminaires.features.cards.networking.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t.seminaires.features.cards.networking.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

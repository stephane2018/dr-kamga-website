"use client"

import { Target, Users, Network, Clock } from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"

export function BenefitsSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.seminaires.benefits.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t.seminaires.benefits.items.collective.title}</h3>
                  <p className="text-muted-foreground">
                    {t.seminaires.benefits.items.collective.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t.seminaires.benefits.items.practical.title}</h3>
                  <p className="text-muted-foreground">
                    {t.seminaires.benefits.items.practical.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Network className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t.seminaires.benefits.items.networking.title}</h3>
                  <p className="text-muted-foreground">
                    {t.seminaires.benefits.items.networking.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.seminaires.benefits.intensive.title}</h3>
              <p className="text-muted-foreground mb-6">
                {t.seminaires.benefits.intensive.description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{t.seminaires.benefits.intensive.stats.satisfaction.value}</div>
                  <div className="text-sm text-muted-foreground">{t.seminaires.benefits.intensive.stats.satisfaction.label}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">{t.seminaires.benefits.intensive.stats.implementation.value}</div>
                  <div className="text-sm text-muted-foreground">{t.seminaires.benefits.intensive.stats.implementation.label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

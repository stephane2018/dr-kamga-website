"use client"

import { Users, Factory, Globe } from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"

export function BenefitsSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.masterclass.benefits.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t.masterclass.benefits.items.interaction.title}</h3>
            <p className="text-muted-foreground">
              {t.masterclass.benefits.items.interaction.description}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Factory className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t.masterclass.benefits.items.casStudies.title}</h3>
            <p className="text-muted-foreground">
              {t.masterclass.benefits.items.casStudies.description}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t.masterclass.benefits.items.questions.title}</h3>
            <p className="text-muted-foreground">
              {t.masterclass.benefits.items.questions.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

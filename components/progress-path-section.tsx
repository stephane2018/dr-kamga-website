"use client"

import { User, Users } from "lucide-react"
import { ServiceCard } from "./service-card"
import { AnimatedBackground } from "./animated-background"
import { SectionHeader } from "./section-header"
import { useLanguage } from "@/locales/LanguageProvider"

export function ProgressPathSection() {
  const { t } = useLanguage();
  
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
          <ServiceCard
            icon={User}
            category={t.progressPath.services.masterclass.category}
            title={t.progressPath.services.masterclass.title}
            subtitle={t.progressPath.services.masterclass.subtitle}
            description={t.progressPath.services.masterclass.description}
            features={[
              t.progressPath.services.masterclass.features.feature1,
              t.progressPath.services.masterclass.features.feature2,
              t.progressPath.services.masterclass.features.feature3
            ]}
            ctaText={t.progressPath.services.masterclass.ctaText}
            ctaLink="/masterclass"
            gradientPosition="top-left"
          />

          <ServiceCard
            icon={Users}
            category={t.progressPath.services.seminaires.category}
            title={t.progressPath.services.seminaires.title}
            subtitle={t.progressPath.services.seminaires.subtitle}
            description={t.progressPath.services.seminaires.description}
            features={[
              t.progressPath.services.seminaires.features.feature1,
              t.progressPath.services.seminaires.features.feature2,
              t.progressPath.services.seminaires.features.feature3
            ]}
            ctaText={t.progressPath.services.seminaires.ctaText}
            ctaLink="/seminaires"
            gradientPosition="top-right"
          />

          <ServiceCard
            icon={User}
            category={t.progressPath.services.coaching.category}
            title={t.progressPath.services.coaching.title}
            subtitle={t.progressPath.services.coaching.subtitle}
            description={t.progressPath.services.coaching.description}
            features={[
              t.progressPath.services.coaching.features.feature1,
              t.progressPath.services.coaching.features.feature2,
              t.progressPath.services.coaching.features.feature3
            ]}
            ctaText={t.progressPath.services.coaching.ctaText}
            ctaLink="/coaching"
            gradientPosition="bottom-left"
          />

          <ServiceCard
            icon={Users}
            category={t.progressPath.services.events.category}
            title={t.progressPath.services.events.title}
            subtitle={t.progressPath.services.events.subtitle}
            description={t.progressPath.services.events.description}
            features={[
              t.progressPath.services.events.features.feature1,
              t.progressPath.services.events.features.feature2,
              t.progressPath.services.events.features.feature3
            ]}
            ctaText={t.progressPath.services.events.ctaText}
            ctaLink="/seminaires"
            gradientPosition="top-right"
          />
        </div>
      </div>
    </section>
  )
}
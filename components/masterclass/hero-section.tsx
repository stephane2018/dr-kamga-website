"use client"

import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/locales/LanguageProvider"

export function MasterclassHeroSection() {
  const { t } = useLanguage()
  
  return (
    <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-800 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-16 left-16 w-28 h-28" viewBox="0 0 100 100" fill="none">
          <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute top-10 right-10 w-24 h-24" viewBox="0 0 100 100" fill="none">
          <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1.5" fill="none" rx="10" />
          <path d="M40 40 L60 60 M60 40 L40 60" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-16 left-1/3 w-32 h-32" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <svg className="absolute bottom-10 right-1/4 w-26 h-26" viewBox="0 0 100 100" fill="none">
          <polygon points="50,15 85,75 15,75" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M35 60 L65 60" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30" variant="secondary">
            {t.masterclass.hero.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">{t.masterclass.hero.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
            {t.masterclass.hero.description}
          </p>
        </div>
      </div>
    </section>
  )
}

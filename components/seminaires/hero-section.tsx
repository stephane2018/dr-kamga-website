"use client"

import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/locales/LanguageProvider"

export function SeminairesHeroSection() {
  const { t } = useLanguage()
  
  return (
    <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-800 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-12 left-12 w-30 h-30" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="2" fill="none" rx="12" />
          <path d="M35 35 L65 65 M65 35 L35 65" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg className="absolute top-20 right-16 w-26 h-26" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M30 50 L50 30 L70 50 L50 70 Z" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <svg className="absolute bottom-20 left-1/4 w-24 h-24" viewBox="0 0 100 100" fill="none">
          <polygon points="50,20 80,80 20,80" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="50" cy="60" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <svg className="absolute bottom-16 right-1/3 w-28 h-28" viewBox="0 0 100 100" fill="none">
          <path d="M25 25 L75 25 L75 75 L25 75 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M40 40 L60 40 L60 60 L40 60 Z" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30" variant="secondary">
            {t.seminaires.hero.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">{t.seminaires.hero.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
            {t.seminaires.hero.description}
          </p>
        </div>
      </div>
    </section>
  )
}

"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { translations, type Language, type Translations } from '@/locales/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const getLanguageFromPath = (pathname: string): Language | null => {
  const segments = pathname.split('/')
  const langSegment = segments[1]

  if (langSegment === 'en' || langSegment === 'fr') {
    return langSegment
  }

  return null
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const urlLang = getLanguageFromPath(pathname)
  const [language, setLanguageState] = useState<Language>(urlLang || 'fr')
  const [isInitialized, setIsInitialized] = useState(false)
  useEffect(() => {
    const urlLang = getLanguageFromPath(pathname)
    if (urlLang && urlLang !== language) {
      setLanguageState(urlLang)
    }
    setIsInitialized(true)
  }, [pathname, language])

  useEffect(() => {
    if (isInitialized && typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language, isInitialized])

  const setLanguage = (lang: Language) => {
    const pathWithoutLang = pathname.replace(/^\/(en|fr)/, '') || '/'
    router.push(`/${lang}${pathWithoutLang}`)

    setLanguageState(lang)

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

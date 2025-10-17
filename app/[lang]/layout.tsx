import type React from "react"
import type { Metadata } from "next"
import { LanguageProvider } from "@/locales/LanguageProvider"
import { getMetadata } from "@/locales/metadata"
import type { Language } from "@/locales/translations"

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = (params.lang === 'en' || params.lang === 'fr' ? params.lang : 'fr') as Language
  return getMetadata(lang)
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return <LanguageProvider>{children}</LanguageProvider>
}

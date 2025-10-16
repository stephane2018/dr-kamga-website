import type React from "react"
import { LanguageProvider } from "@/locales/LanguageProvider"

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return <LanguageProvider>{children}</LanguageProvider>
}

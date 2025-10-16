"use client";
import { Button } from "@/components/ui/button"
import { Users, Globe } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/locales/LanguageProvider"

export function WhyChooseSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.whyChoose.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t.whyChoose.services.management.title}</h3>
            <p className="text-muted-foreground mb-4">
              {t.whyChoose.services.management.description}
            </p>
            <Button variant="outline" asChild>
              <Link href="/a-propos">{t.whyChoose.services.management.ctaText}</Link>
            </Button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t.whyChoose.services.supplies.title}</h3>
            <p className="text-muted-foreground mb-4">
              {t.whyChoose.services.supplies.description}
            </p>
            <Button variant="outline" asChild>
              <Link href="/a-propos">{t.whyChoose.services.supplies.ctaText}</Link>
            </Button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t.whyChoose.services.mechanization.title}</h3>
            <p className="text-muted-foreground mb-4">
              {t.whyChoose.services.mechanization.description}
            </p>
            <Button variant="outline" asChild>
              <Link href="/a-propos">{t.whyChoose.services.mechanization.ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
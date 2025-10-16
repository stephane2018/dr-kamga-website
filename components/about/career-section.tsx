"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Building, Target, Briefcase } from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"

export function CareerSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            {t.about.career.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            {t.about.career.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{t.about.career.administration.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{t.about.career.administration.subtitle}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {t.about.career.administration.items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary/5 to-accent/5">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-xl">{t.about.career.international.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{t.about.career.international.subtitle}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2 text-secondary">{t.about.career.international.agencies}</p>
                <ul className="space-y-2 text-sm">
                  {t.about.career.international.agencyList.map((agency, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-secondary mt-1">•</span>
                      <span className="text-muted-foreground">{agency}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2 text-secondary">{t.about.career.international.other}</p>
                <ul className="space-y-2 text-sm">
                  {t.about.career.international.otherList.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-secondary mt-1">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-xl">{t.about.career.return.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{t.about.career.return.subtitle}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {t.about.career.return.items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{t.about.career.cabinet.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{t.about.career.cabinet.subtitle}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {t.about.career.cabinet.items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

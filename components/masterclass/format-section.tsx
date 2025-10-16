"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, MapPin } from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"

export function FormatSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.masterclass.format.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{t.masterclass.format.online.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                {t.masterclass.format.online.features.map((feature: string, index: number) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <CardTitle>{t.masterclass.format.inPerson.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                {t.masterclass.format.inPerson.features.map((feature: string, index: number) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

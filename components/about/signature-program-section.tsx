"use client";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Award, Users } from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"

export function SignatureProgramSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30" variant="secondary">
            {t.about.signature.badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance text-foreground">
            {t.about.signature.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
            {t.about.signature.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">{t.about.signature.pillars.awareness.title}</h3>
              <p className="text-muted-foreground">
                {t.about.signature.pillars.awareness.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-secondary">{t.about.signature.pillars.equip.title}</h3>
              <p className="text-muted-foreground">
                {t.about.signature.pillars.equip.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-accent">{t.about.signature.pillars.accompany.title}</h3>
              <p className="text-muted-foreground">
                {t.about.signature.pillars.accompany.description}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-bold mb-6 leading-relaxed">
            {t.about.signature.quote}
          </blockquote>
          <p className="text-lg text-muted-foreground">
            {t.about.signature.vision}
          </p>
        </div>
      </div>
    </section>
  )
}

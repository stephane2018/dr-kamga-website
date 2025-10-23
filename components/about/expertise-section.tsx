"use client";
import { Card, CardContent } from "@/components/ui/card"
import { Users, Globe, TrendingUp, Shield, Leaf, Package } from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"

export function ExpertiseSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            {t.about.expertise.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            {t.about.expertise.subtitle}
          </p>
        </div>

        {/* Domaines d'Expertise */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2 text-primary">{t.about.expertise.domains.policies.title}</h3>
              <p className="text-sm text-muted-foreground">
                {t.about.expertise.domains.policies.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2 text-primary">{t.about.expertise.domains.health.title}</h3>
              <p className="text-sm text-muted-foreground">
                {t.about.expertise.domains.health.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2 text-primary">{t.about.expertise.domains.transformation.title}</h3>
              <p className="text-sm text-muted-foreground">
                {t.about.expertise.domains.transformation.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2 text-primary">{t.about.expertise.domains.commercialization.title}</h3>
              <p className="text-sm text-muted-foreground">
                {t.about.expertise.domains.commercialization.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2 text-primary">{t.about.expertise.domains.management.title}</h3>
              <p className="text-sm text-muted-foreground">
                {t.about.expertise.domains.management.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2 text-primary">{t.about.expertise.domains.specialties.title}</h3>
              <p className="text-sm text-muted-foreground">
                {t.about.expertise.domains.specialties.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Formation & Langues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">{t.about.expertise.formation.title}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">{t.about.expertise.formation.items.item1.title}</p>
                    <p className="text-sm text-muted-foreground">{t.about.expertise.formation.items.item1.description}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">{t.about.expertise.formation.items.item2.title}</p>
                    <p className="text-sm text-muted-foreground">{t.about.expertise.formation.items.item2.description}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">{t.about.expertise.formation.items.item3.title}</p>
                    <p className="text-sm text-muted-foreground">{t.about.expertise.formation.items.item3.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary/5 to-accent/5">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-secondary">{t.about.expertise.languages.title}</h3>
              </div>
              <p className="text-lg mb-6 font-medium">{t.about.expertise.languages.subtitle}</p>
              
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3 text-muted-foreground">{t.about.expertise.languages.international}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm">Français</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm">Anglais</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm">Espagnol</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm">Italien</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-3 text-muted-foreground">{t.about.expertise.languages.local}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm">Baoulé / Agni</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm">Bété</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center col-span-2">
                    <p className="font-semibold text-sm">Malinké / Bambara</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

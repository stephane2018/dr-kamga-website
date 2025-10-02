import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

export function ExpertiseSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            Expert Reconnu en Agriculture
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Docteur vétérinaire, 40+ années d'expérience, spécialiste en transformation et exportation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Formation & Expertise</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Docteur Vétérinaire - Université de Liège</p>
                    <p className="text-sm text-muted-foreground">Formation en sécurité sanitaire et qualité des aliments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">40+ années d'expérience</p>
                    <p className="text-sm text-muted-foreground">Gestion de projets agricoles et planification stratégique</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Spécialités clés</p>
                    <p className="text-sm text-muted-foreground">Chaînes de valeur, transformation locale, marchés internationaux</p>
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
                <h3 className="text-2xl font-bold text-secondary">Expert Polyglotte</h3>
              </div>
              <p className="text-lg mb-4">Communication internationale et terrain</p>
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
              <p className="text-sm text-muted-foreground mt-4 text-center italic">
                + Langues locales africaines
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

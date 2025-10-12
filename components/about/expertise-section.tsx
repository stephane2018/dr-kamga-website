import { Card, CardContent } from "@/components/ui/card"
import { Users, Globe, TrendingUp, Shield, Leaf, Package } from "lucide-react"

export function ExpertiseSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            Expert Reconnu en Agriculture
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Dr Kanga et son équipe vous accompagnent dans la conquête des marchés mondiaux
          </p>
        </div>

        {/* Domaines d'Expertise */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2 text-primary">Politiques Agricoles</h3>
              <p className="text-sm text-muted-foreground">
                Analyse des politiques de production, exportation et importation pour la mise en œuvre de l'AGOA
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold mb-2 text-secondary">Santé Animale</h3>
              <p className="text-sm text-muted-foreground">
                Lutte contre les maladies animales et zoonotiques, contrôle sanitaire et phytosanitaire
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2 text-accent">Transformation</h3>
              <p className="text-sm text-muted-foreground">
                Conservation et transformation (préparations culinaires, emballage, packaging)
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2 text-primary">Commercialisation</h3>
              <p className="text-sm text-muted-foreground">
                Accès aux marchés, études de marché, promotion des produits, valorisation nutritionnelle
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold mb-2 text-secondary">Gestion d'Exploitations</h3>
              <p className="text-sm text-muted-foreground">
                Exploitations agro-sylvo-pastorales et halieutiques (plantation, élevage, pêche)
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2 text-primary">Spécialités Clés</h3>
              <p className="text-sm text-muted-foreground">
                Chaînes de valeur, transformation locale, marchés internationaux
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Formation & Langues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Formation & Qualifications</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Docteur en Médecine Vétérinaire</p>
                    <p className="text-sm text-muted-foreground">Université de Liège, Belgique - Spécialisé en production et santé animale, hygiène publique</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">40 années d'expérience</p>
                    <p className="text-sm text-muted-foreground">Contribution au développement et promotion de l'Agriculture Africaine</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Autorité Compétente Officielle</p>
                    <p className="text-sm text-muted-foreground">Agrément des établissements de traitement et certification des denrées animales</p>
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
              <p className="text-lg mb-6 font-medium">Communication internationale et terrain</p>
              
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3 text-muted-foreground">Langues Internationales</p>
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
                <p className="text-sm font-semibold mb-3 text-muted-foreground">Langues Locales Africaines</p>
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

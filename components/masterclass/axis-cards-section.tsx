import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Sprout, Factory, Globe, Shield } from "lucide-react"

export function AxisCardsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Une Masterclass par Axe Stratégique</h2>
          <p className="text-xl text-muted-foreground">
            Chaque session correspond à un axe du programme pour un apprentissage structuré
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Axe 1 - Matières Premières</CardTitle>
                  <CardDescription>Produire pour l'export dès le premier jour</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Maîtrisez les techniques de production qui répondent aux standards internationaux et optimisez vos
                rendements.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Sélection des variétés adaptées à l'export</li>
                <li>• Techniques de culture optimisées</li>
                <li>• Gestion de la qualité dès la production</li>
                <li>• Certification et traçabilité</li>
              </ul>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>3h30</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Max 20 participants</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Factory className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Axe 2 - Transformation</CardTitle>
                  <CardDescription>Les clés d'une transformation rentable et durable</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Développez votre unité de transformation pour maximiser la valeur ajoutée de vos produits.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Choix des équipements et technologies</li>
                <li>• Processus de transformation optimisés</li>
                <li>• Contrôle qualité et normes sanitaires</li>
                <li>• Calcul de rentabilité et pricing</li>
              </ul>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>4h</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Max 15 participants</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-xl">Axe 3 - Exportation</CardTitle>
                  <CardDescription>Devenir un exportateur compétitif</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Maîtrisez toutes les étapes de l'exportation, de la prospection à la livraison.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Étude de marché et prospection</li>
                <li>• Négociation et contrats internationaux</li>
                <li>• Logistique et transport</li>
                <li>• Gestion des risques à l'export</li>
              </ul>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>4h30</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Max 12 participants</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Module Assurance</CardTitle>
                  <CardDescription>Sécuriser vos produits pour inspirer confiance</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Protégez votre activité et rassurez vos partenaires avec les bonnes assurances.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Types d'assurances pour l'export</li>
                <li>• Évaluation des risques</li>
                <li>• Négociation avec les assureurs</li>
                <li>• Gestion des sinistres</li>
              </ul>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>2h30</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Max 25 participants</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

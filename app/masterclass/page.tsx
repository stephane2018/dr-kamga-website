import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Video, MapPin, Sprout, Factory, Globe, Shield } from "lucide-react"
import Link from "next/link"

export default function MasterclassPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-800 py-20 overflow-hidden">
        {/* Light SVG motifs */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute top-16 left-16 w-28 h-28" viewBox="0 0 100 100" fill="none">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" />
          </svg>
          <svg className="absolute top-10 right-10 w-24 h-24" viewBox="0 0 100 100" fill="none">
            <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1.5" fill="none" rx="10" />
            <path d="M40 40 L60 60 M60 40 L40 60" stroke="currentColor" strokeWidth="1" />
          </svg>
          <svg className="absolute bottom-16 left-1/3 w-32 h-32" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <svg className="absolute bottom-10 right-1/4 w-26 h-26" viewBox="0 0 100 100" fill="none">
            <polygon points="50,15 85,75 15,75" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M35 60 L65 60" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30" variant="secondary">
              Formation Expert
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">Masterclass Thématiques</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
              Approfondissez vos connaissances avec des sessions expertes et interactives directement avec le Dr. Kanga.
            </p>
          </div>
        </div>
      </section>

      {/* Organisation Section */}
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

      {/* Format Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Format des Masterclass</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>En Ligne (Zoom)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Sessions interactives en direct</li>
                  <li>• Possibilité de poser des questions</li>
                  <li>• Enregistrement disponible 30 jours</li>
                  <li>• Accessible depuis n'importe où</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle>Présentiel (Paris)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Interaction directe avec Dr. Kanga</li>
                  <li>• Networking avec autres participants</li>
                  <li>• Supports physiques inclus</li>
                  <li>• Pause déjeuner offerte</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Les Avantages des Masterclass</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interaction Directe</h3>
              <p className="text-muted-foreground">
                Posez vos questions directement au Dr. Kanga et obtenez des réponses personnalisées.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Factory className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Études de Cas Réels</h3>
              <p className="text-muted-foreground">
                Analysez des projets concrets et apprenez des succès et échecs d'autres agriculteurs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Réponses aux Questions</h3>
              <p className="text-muted-foreground">
                Clarifiez tous vos doutes et obtenez des conseils adaptés à votre situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vidéos Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Vidéos Complémentaires</h2>
            <p className="text-xl text-muted-foreground">
              Découvrez nos vidéos pédagogiques pour approfondir vos connaissances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-shadow border-0">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Video className="h-8 w-8 text-primary ml-1" />
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Capsule</Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>8 min</span>
                  </div>
                </div>
                <CardTitle className="text-lg">Les 3 règles pour produire selon les normes internationales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Découvrez les standards essentiels pour préparer vos produits à l'exportation.
                </p>
                <Button size="sm" className="w-full">
                  Voir la vidéo
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow border-0">
              <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-t-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                  <Video className="h-8 w-8 text-secondary ml-1" />
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Cours Long</Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>45 min</span>
                  </div>
                </div>
                <CardTitle className="text-lg">Comment transformer son produit et allonger sa durée de vie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Techniques de transformation pour maximiser la valeur ajoutée de vos produits.
                </p>
                <Button size="sm" className="w-full">
                  Voir la vidéo
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow border-0">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 rounded-t-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <Video className="h-8 w-8 text-accent ml-1" />
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Capsule</Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>12 min</span>
                  </div>
                </div>
                <CardTitle className="text-lg">Les étapes clés pour réussir son export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Roadmap complète pour structurer votre démarche d'exportation.
                </p>
                <Button size="sm" className="w-full">
                  Voir la vidéo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Inscription Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Prochaines Sessions</h2>
            <p className="text-xl text-muted-foreground">Choisissez votre masterclass et réservez votre place</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-primary text-primary-foreground">EN LIGNE</Badge>
                  <div className="text-sm text-muted-foreground">Places limitées</div>
                </div>
                <CardTitle className="text-xl">Masterclass Production - Axe 1</CardTitle>
                <CardDescription>Produire pour l'export dès le premier jour</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="font-medium">15 Décembre 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Horaire:</span>
                    <span className="font-medium">14h-17h30 (GMT+1)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Prix:</span>
                    <span className="font-medium text-lg">197€</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Places restantes:</span>
                    <span className="font-medium text-primary">8/20</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/contact?masterclass=production">S'inscrire maintenant</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-secondary text-secondary-foreground">PRÉSENTIEL</Badge>
                  <div className="text-sm text-muted-foreground">Paris</div>
                </div>
                <CardTitle className="text-xl">Masterclass Transformation - Axe 2</CardTitle>
                <CardDescription>Les clés d'une transformation rentable</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="font-medium">22 Décembre 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Horaire:</span>
                    <span className="font-medium">9h-13h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Prix:</span>
                    <span className="font-medium text-lg">297€</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Places restantes:</span>
                    <span className="font-medium text-primary">5/15</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/contact?masterclass=transformation">S'inscrire maintenant</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-white rounded-xl border border-primary/10">
            <h3 className="text-lg font-semibold mb-4 text-center">Modalités d'inscription</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold">1</span>
                </div>
                <p className="font-medium">Inscription</p>
                <p className="text-muted-foreground">Cliquez sur "S'inscrire"</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold">2</span>
                </div>
                <p className="font-medium">Paiement</p>
                <p className="text-muted-foreground">Paiement sécurisé par carte</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold">3</span>
                </div>
                <p className="font-medium">Confirmation</p>
                <p className="text-muted-foreground">Lien de connexion par email</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Questions sur les Masterclass ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
            Notre équipe est là pour vous aider à choisir la masterclass qui vous convient.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

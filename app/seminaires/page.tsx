import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Network, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function SeminairesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-800 py-20 overflow-hidden">
        {/* Light SVG motifs */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute top-12 left-12 w-30 h-30" viewBox="0 0 100 100" fill="none">
            <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="2" fill="none" rx="12" />
            <path d="M35 35 L65 65 M65 35 L35 65" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg className="absolute top-20 right-16 w-26 h-26" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M30 50 L50 30 L70 50 L50 70 Z" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <svg className="absolute bottom-20 left-1/4 w-24 h-24" viewBox="0 0 100 100" fill="none">
            <polygon points="50,20 80,80 20,80" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="60" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <svg className="absolute bottom-16 right-1/3 w-28 h-28" viewBox="0 0 100 100" fill="none">
            <path d="M25 25 L75 25 L75 75 L25 75 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M40 40 L60 40 L60 60 L40 60 Z" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30" variant="secondary">
              Formation Immersive
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">Séminaires Pratiques</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
              Vivez une immersion totale et pratique aux côtés d'experts et d'autres producteurs pour accélérer votre
              transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Caractéristiques Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Une Expérience d'Apprentissage Unique</h2>
            <p className="text-xl text-muted-foreground">
              Sessions collectives orientées pratique terrain pour un apprentissage concret
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Sessions Collectives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Apprenez en groupe avec d'autres agriculteurs motivés et partagez vos expériences.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>Orientées Pratique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Exercices concrets, simulations et ateliers pratiques pour une application immédiate.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Network className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Networking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Créez des liens durables avec d'autres acteurs de la filière agricole.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Exemples de Séminaires */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Nos Séminaires Phares</h2>
            <p className="text-xl text-muted-foreground">
              Des formations intensives pour maîtriser chaque aspect de votre développement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">2 jours</Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>12-15 participants</span>
                  </div>
                </div>
                <CardTitle className="text-2xl">Créer une unité de transformation compétitive</CardTitle>
                <CardDescription>Du concept à la mise en œuvre</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Apprenez à concevoir, dimensionner et lancer votre unité de transformation pour maximiser la valeur
                  ajoutée de vos produits.
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">Jour 1 : Conception et planification</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Étude de faisabilité et business plan</li>
                      <li>• Choix des équipements et technologies</li>
                      <li>• Dimensionnement et layout optimal</li>
                      <li>• Réglementation et normes sanitaires</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Jour 2 : Mise en œuvre pratique</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Simulation de processus de transformation</li>
                      <li>• Calcul des coûts et pricing</li>
                      <li>• Contrôle qualité et traçabilité</li>
                      <li>• Plan de lancement et commercialisation</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Prochaine session : 15-16 Mars</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Paris</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">3 jours</Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>8-12 participants</span>
                  </div>
                </div>
                <CardTitle className="text-2xl">Préparer un dossier export crédible</CardTitle>
                <CardDescription>De la prospection à la première vente</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Maîtrisez toutes les étapes pour construire un dossier export solide et convaincre vos premiers
                  clients internationaux.
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">Jour 1 : Étude de marché</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Analyse des marchés cibles</li>
                      <li>• Identification des opportunités</li>
                      <li>• Étude de la concurrence</li>
                      <li>• Positionnement produit</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Jour 2 : Dossier commercial</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Présentation entreprise et produits</li>
                      <li>• Certifications et références</li>
                      <li>• Conditions commerciales</li>
                      <li>• Supports marketing adaptés</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Jour 3 : Négociation et contrats</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Techniques de négociation internationale</li>
                      <li>• Rédaction de contrats export</li>
                      <li>• Gestion des risques</li>
                      <li>• Simulation de négociation</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Prochaine session : 22-24 Mars</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Lyon</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Valeur Ajoutée */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Pourquoi Choisir Nos Séminaires ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Apprentissage Collectif</h3>
                    <p className="text-muted-foreground">
                      Bénéficiez de l'expérience et des questions des autres participants pour enrichir votre
                      apprentissage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Pratique Réelle</h3>
                    <p className="text-muted-foreground">
                      Exercices concrets, simulations et études de cas pour une application immédiate sur le terrain.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Network className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Réseau Professionnel</h3>
                    <p className="text-muted-foreground">
                      Créez des liens durables avec d'autres agriculteurs et experts de la filière.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Format Intensif</h3>
                <p className="text-muted-foreground mb-6">
                  Des sessions concentrées sur 2-3 jours pour maximiser votre temps et votre apprentissage.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">87%</div>
                    <div className="text-sm text-muted-foreground">Mise en pratique</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Rejoignez le Prochain Séminaire
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
            Places limitées pour garantir un accompagnement personnalisé et des échanges de qualité.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Réserver ma place pour le prochain séminaire</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

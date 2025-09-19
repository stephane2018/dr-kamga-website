import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function VideosPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-800 py-20 overflow-hidden">
        {/* Light SVG motifs */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute top-10 left-10 w-24 h-24" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
            <path d="M30 50 L50 30 L70 50 L50 70 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <svg className="absolute top-20 right-20 w-32 h-32" viewBox="0 0 100 100" fill="none">
            <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="1.5" fill="none" rx="8" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" />
          </svg>
          <svg className="absolute bottom-20 left-1/4 w-20 h-20" viewBox="0 0 100 100" fill="none">
            <polygon points="50,10 90,90 10,90" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute bottom-10 right-1/3 w-28 h-28" viewBox="0 0 100 100" fill="none">
            <path d="M20 50 Q50 20 80 50 Q50 80 20 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30" variant="secondary">
              Formation Vidéo
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">Vidéos Pédagogiques</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
              Apprenez à votre rythme grâce à des vidéos pratiques et accessibles, conçues pour vous accompagner dans
              votre transformation agricole.
            </p>
          </div>
        </div>
      </section>

      {/* Formats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Capsules Courtes</CardTitle>
                    <CardDescription>5-10 minutes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Des astuces pratiques et des erreurs à éviter, directement applicables sur le terrain.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Conseils pratiques immédiats</li>
                  <li>• Erreurs courantes à éviter</li>
                  <li>• Solutions rapides aux problèmes fréquents</li>
                  <li>• Format idéal pour débuter</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Cours Longs</CardTitle>
                    <CardDescription>30-60 minutes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Des modules structurés et approfondis sur chaque axe stratégique du programme.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Formations complètes par axe</li>
                  <li>• Études de cas détaillées</li>
                  <li>• Méthodologies étape par étape</li>
                  <li>• Ressources complémentaires</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Exemples de Vidéos */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Exemples de Vidéos Disponibles</h2>
            <p className="text-xl text-muted-foreground">Découvrez un aperçu de notre bibliothèque de contenus</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-shadow border-0">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Play className="h-8 w-8 text-primary ml-1" />
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Capsule</Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>8 min</span>
                  </div>
                </div>
                <CardTitle className="text-lg">Les 3 règles pour produire selon les normes internationales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Découvrez les standards essentiels pour préparer vos produits à l'exportation.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(4.9)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow border-0">
              <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-t-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                  <Play className="h-8 w-8 text-secondary ml-1" />
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Cours Long</Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>45 min</span>
                  </div>
                </div>
                <CardTitle className="text-lg">Comment transformer son produit et allonger sa durée de vie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Techniques de transformation pour maximiser la valeur ajoutée de vos produits.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(4.8)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow border-0">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 rounded-t-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <Play className="h-8 w-8 text-accent ml-1" />
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Capsule</Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>12 min</span>
                  </div>
                </div>
                <CardTitle className="text-lg">Les étapes clés pour réussir son export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Roadmap complète pour structurer votre démarche d'exportation.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(4.9)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Commencez Votre Formation Dès Aujourd'hui
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Accédez à notre bibliothèque complète de vidéos pédagogiques et commencez à transformer votre agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Regarder une vidéo gratuite</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Accéder à toute la bibliothèque</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

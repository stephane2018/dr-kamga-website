import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Target, Calendar, CheckCircle, Star, Phone } from "lucide-react"
import Link from "next/link"

export default function CoachingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-800 py-20 overflow-hidden">
        {/* Light SVG motifs */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute top-14 left-14 w-32 h-32" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <svg className="absolute top-8 right-12 w-28 h-28" viewBox="0 0 100 100" fill="none">
            <path d="M20 20 L80 20 L80 80 L20 80 Z" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M35 35 L65 35 L65 65 L35 65 Z" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <svg className="absolute bottom-18 left-1/3 w-26 h-26" viewBox="0 0 100 100" fill="none">
            <polygon points="50,15 85,75 15,75" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M40 55 L60 55" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg className="absolute bottom-12 right-1/4 w-30 h-30" viewBox="0 0 100 100" fill="none">
            <path d="M25 50 Q50 25 75 50 Q50 75 25 50" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30" variant="secondary">
              Accompagnement Premium
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">Coaching Privé</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
              Un accompagnement personnalisé pour atteindre vos objectifs plus vite avec l'expertise directe du Dr.
              Kanga.
            </p>
          </div>
        </div>
      </section>

      {/* Positionnement Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="outline">
                Offre Haut de Gamme
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Réservé à Ceux Qui Veulent Accélérer</h2>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Le coaching privé est conçu pour les agriculteurs ambitieux qui souhaitent bénéficier d'un
                accompagnement sur mesure et atteindre leurs objectifs d'exportation dans les meilleurs délais.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Accompagnement 100% personnalisé</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Accès direct au Dr. Kanga</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Résultats accélérés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Suivi régulier et ajustements</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Dr. Kanga</h3>
                <p className="text-muted-foreground mb-6">
                  Expert international en développement agricole avec plus de 20 ans d'expérience dans l'accompagnement
                  d'agriculteurs vers l'exportation.
                </p>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">(4.9/5)</span>
                </div>
                <p className="text-sm text-muted-foreground">Basé sur 150+ accompagnements réussis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu du Coaching */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Contenu de l'Accompagnement</h2>
            <p className="text-xl text-muted-foreground">
              Un programme sur mesure adapté à votre situation et vos objectifs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Diagnostic Personnalisé</CardTitle>
                <CardDescription>Analyse complète de votre situation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Audit de votre exploitation actuelle</li>
                  <li>• Évaluation de votre potentiel export</li>
                  <li>• Identification des points forts et axes d'amélioration</li>
                  <li>• Définition d'objectifs SMART</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>2. Stratégie Sur Mesure</CardTitle>
                <CardDescription>Plan d'action personnalisé</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Roadmap détaillée vers l'export</li>
                  <li>• Priorisation des actions selon votre contexte</li>
                  <li>• Adaptation aux 4 axes du programme</li>
                  <li>• Planning de mise en œuvre réaliste</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>3. Suivi Régulier</CardTitle>
                <CardDescription>Accompagnement continu</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Appels mensuels avec le Dr. Kanga</li>
                  <li>• Ajustements de stratégie si nécessaire</li>
                  <li>• Résolution des blocages en temps réel</li>
                  <li>• Support par email entre les sessions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mise en avant */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Proximité Directe avec un Expert International
              </h2>
              <p className="text-xl text-muted-foreground">
                Bénéficiez de l'expérience et du réseau du Dr. Kanga pour accélérer votre développement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">20+</div>
                <div className="text-sm text-muted-foreground">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Agriculteurs accompagnés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">30+</div>
                <div className="text-sm text-muted-foreground">Pays d'exportation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3x</div>
                <div className="text-sm text-muted-foreground">Multiplication du CA moyen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ce Que Disent Nos Clients</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Marie Dubois</CardTitle>
                    <CardDescription>Productrice de légumes bio, Bretagne</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Grâce au coaching du Dr. Kanga, j'ai pu structurer mon approche export et décrocher mes premiers
                  contrats en Allemagne en seulement 6 mois. Son accompagnement personnalisé a fait toute la
                  différence."
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Jean-Pierre Martin</CardTitle>
                    <CardDescription>Producteur de fruits, Provence</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Le Dr. Kanga m'a aidé à transformer complètement mon exploitation. De producteur local, je suis
                  devenu exportateur vers 5 pays. Son expertise et ses conseils sont inestimables."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Prêt à Accélérer Votre Développement ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
            Réservez votre appel diagnostic gratuit de 30 minutes avec le Dr. Kanga pour évaluer votre potentiel et
            définir votre stratégie.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Prendre rendez-vous pour un appel diagnostic</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

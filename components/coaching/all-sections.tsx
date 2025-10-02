import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Target, Calendar, CheckCircle, Star, Phone } from "lucide-react"
import Link from "next/link"

export function CoachingHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-800 py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-14 left-14 w-32 h-32 animate-pulse" viewBox="0 0 100 100" fill="none">
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

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Premium badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-6 py-2 text-sm font-semibold backdrop-blur-sm" variant="secondary">
              ⭐ Accompagnement Premium
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-center text-white leading-tight">
            Coaching Privé
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 text-yellow-200/90 font-light">
              Votre Réussite à l'Export, Accélérée
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto text-center mb-12 leading-relaxed">
            Un accompagnement personnalisé pour atteindre vos objectifs  avec l'expertise directe du Dr. Kanga et sont équipe.
          </p>

          {/* Value props grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all">
              <div className="text-4xl font-bold text-white mb-2">1-on-1</div>
              <p className="text-white/80 text-sm">Accompagnement exclusif et personnalisé</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all">
              <div className="text-4xl font-bold text-white mb-2">20+ ans</div>
              <p className="text-white/80 text-sm">D'expertise internationale en agriculture</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all">
              <div className="text-4xl font-bold text-white mb-2">3-6 mois</div>
              <p className="text-white/80 text-sm">Pour voir des résultats concrets</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            <Link href="#contact" >
              <Button
              size="lg"
              className="bg-white text-amber-900 hover:bg-yellow-50 text-lg px-8 py-6 rounded-xl shadow-2xl font-bold"
              asChild
              
            >
              Réserver un Appel Découverte →
            </Button>
            </Link>
            
            <Link href="#content" >

            <Button
              size="lg"
            
              className="border-2 border-white/50 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
              asChild
            >
              Découvrir le Programme
            </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="text-center mt-12">
            <p className="text-white/70 text-sm mb-4">Places limitées - Seulement 10 agriculteurs accompagnés par trimestre</p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-700 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 border-2 border-white"></div>
              </div>
              <p className="text-white/80 text-sm ml-2">
                <strong className="text-white">150+</strong> agriculteurs accompagnés avec succès
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PositioningSection() {
  return (
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
  )
}

export function ContentSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-white to-secondary/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              Programme Sur Mesure
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Contenu de l'Accompagnement
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un programme sur mesure adapté à votre situation et vos objectifs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-white" />
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground">
                  Diagnostic Personnalisé
                </h3>
                <p className="text-muted-foreground font-medium">
                  Analyse complète de votre situation
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Audit de votre exploitation actuelle",
                  "Évaluation de votre potentiel export",
                  "Identification des points forts et axes d'amélioration",
                  "Définition d'objectifs SMART"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group/item">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors"></div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground">
                  Stratégie Sur Mesure
                </h3>
                <p className="text-muted-foreground font-medium">
                  Plan d'action personnalisé
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Roadmap détaillée vers l'export",
                  "Priorisation des actions selon votre contexte",
                  "Adaptation aux 4 axes du programme",
                  "Planning de mise en œuvre réaliste"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group/item">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors"></div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Phone className="h-8 w-8 text-white" />
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground">
                  Suivi Régulier
                </h3>
                <p className="text-muted-foreground font-medium">
                  Accompagnement continu
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Appels mensuels avec le Dr. Kanga",
                  "Ajustements de stratégie si nécessaire",
                  "Résolution des blocages en temps réel",
                  "Support par email entre les sessions"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group/item">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl px-8 py-6 border border-primary/20">
            <p className="text-muted-foreground">
              <span className="font-bold text-foreground">Résultat :</span> Un parcours unique, conçu pour transformer votre exploitation agricole en entreprise exportatrice prospère
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function StatsSection() {
  return (
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
  )
}

export function TestimonialsSection() {
  return (
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
  )
}

export function BookingSection() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Réserver Votre Appel Diagnostic</h2>
          <p className="text-xl text-muted-foreground">
            Choisissez le créneau qui vous convient pour un appel diagnostic gratuit de 30 minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-green-100 text-green-800">GRATUIT</Badge>
                <div className="text-sm text-muted-foreground">30 minutes</div>
              </div>
              <CardTitle className="text-xl">Appel Diagnostic</CardTitle>
              <CardDescription>Évaluation gratuite de votre potentiel export</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Analyse de votre situation actuelle</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Évaluation de votre potentiel export</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Conseils personnalisés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Plan d'action initial</span>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium">Créneaux disponibles cette semaine:</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div>
                      <div className="font-medium">Mardi 10 Décembre</div>
                      <div className="text-sm text-muted-foreground">14h00 - 14h30</div>
                    </div>
                    <Button size="sm" variant="outline">Choisir</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div>
                      <div className="font-medium">Jeudi 12 Décembre</div>
                      <div className="text-sm text-muted-foreground">10h00 - 10h30</div>
                    </div>
                    <Button size="sm" variant="outline">Choisir</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div>
                      <div className="font-medium">Vendredi 13 Décembre</div>
                      <div className="text-sm text-muted-foreground">16h00 - 16h30</div>
                    </div>
                    <Button size="sm" variant="outline">Choisir</Button>
                  </div>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="/contact?service=coaching-diagnostic">Voir plus de créneaux</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-primary text-primary-foreground">PREMIUM</Badge>
                <div className="text-sm text-muted-foreground">Programme complet</div>
              </div>
              <CardTitle className="text-xl">Coaching Complet</CardTitle>
              <CardDescription>Accompagnement personnalisé de 3 à 6 mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Diagnostic approfondi (2h)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Stratégie sur mesure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Appels mensuels (1h)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Support email illimité</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Accès aux ressources exclusives</span>
                </div>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Programme de 3 mois</div>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="/contact?service=coaching-premium">Demander un devis personnalisé</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
          <h3 className="text-lg font-semibold mb-4 text-center">Comment ça marche ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">1</span>
              </div>
              <p className="font-medium">Réservation</p>
              <p className="text-muted-foreground">Choisissez votre créneau</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">2</span>
              </div>
              <p className="font-medium">Préparation</p>
              <p className="text-muted-foreground">Questionnaire pré-appel</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">3</span>
              </div>
              <p className="font-medium">Appel</p>
              <p className="text-muted-foreground">Diagnostic avec Dr. Kanga</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">4</span>
              </div>
              <p className="font-medium">Suivi</p>
              <p className="text-muted-foreground">Plan d'action personnalisé</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CtaSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
          Une Question ? Besoin d'Aide ?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
          Notre équipe est là pour vous aider à choisir la formule d'accompagnement qui vous convient le mieux.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/contact">Nous contacter</Link>
        </Button>
      </div>
    </section>
  )
}

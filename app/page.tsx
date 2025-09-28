import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sprout, Factory, Globe, Shield, Users, User, Wheat, Tractor, Leaf, Download } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image Slider with Fade Animation */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {/* Image 1 */}
            <div className="absolute inset-0 animate-fadeBackground-1 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                 style={{ backgroundImage: "url('/kamga.jpg')" }}></div>
            {/* Image 2 */}
            <div className="absolute inset-0 animate-fadeBackground-2 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                 style={{ backgroundImage: "url('/dr-kanga-portrait-professional-agricultural-expert.jpg')" }}></div>
            {/* Image 3 */}
            <div className="absolute inset-0 animate-fadeBackground-3 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                 style={{ backgroundImage: "url('/c895b84c-2d0a-4a12-b109-199c93885de6.jpg')" }}></div>
          </div>
        </div>

        {/* Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge
                className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                variant="outline"
              >
                Programme Signature
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-primary-foreground">
                De la ferme aux <span className="text-secondary">Marchés Mondiaux</span>
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
                Transformez votre exploitation agricole locale en entreprise exportatrice grâce à la méthode éprouvée de
                Cabinetdab.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/methode-cabinetdab-guide.pdf" download="Methode-Cabinetdab-Guide.pdf" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Découvrir la méthode
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="/masterclass">Voir les masterclass</Link>
                </Button>
              </div>
            </div>

            {/* Three Images with Unequal Heights */}
            <div className="relative flex items-center justify-center h-80">
              <div className="grid grid-cols-2 gap-3 h-64 w-full max-w-sm">
                {/* Large Image 1 */}
                <div className="relative row-span-2 image-hover-effect">
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-2xl rotate-2 scale-105"></div>
                    <div className="relative bg-gradient-to-br from-primary-foreground to-secondary/20 rounded-xl p-1 shadow-2xl h-full">
                      <img
                        src="/kamga.jpg"
                        alt="Dr. Kanga - Expert en agriculture"
                        className="rounded-lg w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                      <Wheat className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  </div>
                </div>

                {/* Medium Image 2 */}
                <div className="relative image-hover-effect">
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/30 rounded-2xl -rotate-1 scale-105"></div>
                    <div className="relative bg-gradient-to-br from-primary-foreground to-accent/20 rounded-xl p-1 shadow-xl h-full">
                      <img
                        src="/dr-kanga-portrait-professional-agricultural-expert.jpg"
                        alt="Formation agricole"
                        className="rounded-lg w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
                      <Tractor className="h-3 w-3 text-accent-foreground" />
                    </div>
                  </div>
                </div>

                {/* Small Image 3 */}
                <div className="relative image-hover-effect">
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl rotate-3 scale-105"></div>
                    <div className="relative bg-gradient-to-br from-primary-foreground to-primary/20 rounded-xl p-1 shadow-xl h-full">
                      <img
                        src="/c895b84c-2d0a-4a12-b109-199c93885de6.jpg"
                        alt="Agriculture internationale"
                        className="rounded-lg w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-1/2 -right-2 w-6 h-6 bg-primary/80 rounded-full flex items-center justify-center shadow-lg">
                      <Leaf className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programme" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
              Un parcours structuré en 4 axes stratégiques
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
              pour transformer votre vision agricole et atteindre les marchés internationaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Axe 1 */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                1
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Ouverture de champs</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Maîtrisez votre production pour garantir la qualité en aval et choisir les bons marchés dès la
                production.
              </p>
            </div>

            {/* Axe 2 */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                2
              </div>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                <Factory className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Transformation locale</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprenez les enjeux de la transformation et structurez votre unité pour devenir compétitif et rentable.
              </p>
            </div>

            {/* Axe 3 */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                3
              </div>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <Globe className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-3">Exportation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Maîtrisez les 3 étapes clés pour réussir votre export et préparez un dossier compétitif et crédible.
              </p>
            </div>

            {/* Module Transversal */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                +
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Assurances agricoles</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Garantissez votre investissement et protégez vos produits pendant la transformation et l'export.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
              Votre Chemin de Progression
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
            Attaquez les marchés mondiaux sereinement... Comme des milliers d’exportateurs de produits locaux,nous vous aidons à organiser toute votre chaine 
            devaleur pour devenir éligible au commerce international en boostant ainsi votre chiffre d’affaires.
            </p>
            <div className=" p-6 max-w-2xl mx-auto">
              
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/masterclass">Découvrez comment</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Niveau 1 - Masterclass */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <Badge className="bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold">ETAPE 1</Badge>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">Masterclass Thématiques</h3>
              <p className="text-primary font-semibold mb-4">Commencer par les masterclass</p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Sessions expertes et interactives avec le Dr. Kanga. Perfectionnez vos connaissances sur des sujets
                spécifiques avec vidéos complémentaires incluses.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Sessions live de 2-4h</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Interaction directe avec l'expert</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Replays et vidéos complémentaires</span>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl"
                asChild
              >
                <Link href="/masterclass">Voir les masterclass</Link>
              </Button>
            </div>

            {/* Niveau 2 - Séminaires */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <Badge className="bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold">ETAPE 2</Badge>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">Séminaires Pratiques</h3>
              <p className="text-primary font-semibold mb-4">Mettre en pratique via des séminaires</p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Immersion totale avec exercices pratiques et networking. Appliquez concrètement les méthodes apprises.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Séminaires de 3 jours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Exercices pratiques en groupe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Networking avec autres agriculteurs</span>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl"
                asChild
              >
                <Link href="/seminaires">Rejoindre un séminaire</Link>
              </Button>
            </div>

            {/* Niveau 3 - Coaching Privé */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <Badge className="bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold">ETAPE 3</Badge>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">Coaching Privé</h3>
              <p className="text-primary font-semibold mb-4">Se perfectionner avec du coaching privé</p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Accompagnement personnalisé pour accélérer vos résultats. Service premium pour entrepreneurs ambitieux.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Sessions 1-à-1 personnalisées</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Plan d'action sur-mesure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Suivi continu et ajustements</span>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl"
                asChild
              >
                <Link href="/coaching">Réserver un appel</Link>
              </Button>
            </div>

            {/* Niveau 4 - Événements Futurs */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <Badge className="bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold">ETAPE 4</Badge>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">Événements à Venir</h3>
              <p className="text-primary font-semibold mb-4">Participer aux séminaires présentiels</p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Immersion totale avec exercices pratiques et networking. Appliquez concrètement les méthodes apprises.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Séminaires de 3 jours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Exercices pratiques en groupe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-600 text-sm">Networking avec autres agriculteurs</span>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl"
                asChild
              >
                <Link href="/seminaires">Voir les événements</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Valeur Ajoutée */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Pourquoi Choisir Cabinetdab ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expertise Reconnue</h3>
              <p className="text-muted-foreground mb-4">
                Plus de 20 ans d'expérience dans l'accompagnement d'agriculteurs vers l'export.
              </p>
              <Button variant="outline" asChild>
                <Link href="/a-propos">En savoir plus</Link>
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Méthode Éprouvée</h3>
              <p className="text-muted-foreground mb-4">
                Une approche structurée qui a fait ses preuves sur des centaines de projets.
              </p>
              <Button variant="outline" asChild>
                <Link href="/a-propos">En savoir plus</Link>
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Résultats Concrets</h3>
              <p className="text-muted-foreground mb-4">
                Nos participants multiplient en moyenne leur chiffre d'affaires par 3.
              </p>
              <Button variant="outline" asChild>
                <Link href="/a-propos">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Prêt à Transformer Votre Agriculture ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
            Rejoignez des centaines d'agriculteurs qui ont déjà franchi le pas vers l'international.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Je découvre le programme</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/coaching">Je réserve ma place</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

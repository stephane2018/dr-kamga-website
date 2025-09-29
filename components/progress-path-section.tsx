import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Users } from "lucide-react"
import Link from "next/link"

export function ProgressPathSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            Votre Chemin de Progression
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
          Attaquez les marchés mondiaux sereinement... Comme des milliers d'exportateurs de produits locaux,nous vous aidons à organiser toute votre chaine
          devaleur pour devenir éligible au commerce international en boostant ainsi votre chiffre d'affaires.
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
  )
}
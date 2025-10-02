import { User, Users } from "lucide-react"
import { ServiceCard } from "./service-card"
import { AnimatedBackground } from "./animated-background"
import { SectionHeader } from "./section-header"

export function ProgressPathSection() {
  return (
    <section className="relative py-20 bg-muted/30 overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="Votre Chemin de Progression"
          description="Attaquer les marchés mondiaux sereinement... Comme des milliers d'exportateurs de produits locaux, nous vous aidons à organiser toute votre chaine de valeur pour devenir éligible au commerce international en boostant ainsi votre chiffre d'affaires."
          ctaText="Découvrez comment"
          ctaLink="/masterclass"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <ServiceCard
            icon={User}
            category="Formation Individuelle"
            title="Masterclass Thématiques"
            subtitle="Commencer par les masterclass"
            description="Sessions expertes et interactives avec le Dr. Kanga. Perfectionnez vos connaissances sur des sujets spécifiques avec vidéos complémentaires incluses."
            features={[
              { title: "Sessions live de 2-4h", description: "Apprentissage en temps réel avec interaction directe" },
              { title: "Interaction directe avec l'expert", description: "Posez vos questions et obtenez des réponses personnalisées" },
              { title: "Replays et vidéos complémentaires", description: "Révisez à votre rythme, accès illimité" }
            ]}
            ctaText="Voir les masterclass"
            ctaLink="/masterclass"
            gradientPosition="top-left"
          />

          <ServiceCard
            icon={Users}
            category="Formation Collective"
            title="Séminaires Pratiques"
            subtitle="Mettre en pratique via des séminaires"
            description="Immersion totale avec exercices pratiques et networking. Appliquez concrètement les méthodes apprises."
            features={[
              { title: "Séminaires de 3 jours", description: "Formation intensive et immersive en présentiel" },
              { title: "Exercices pratiques en groupe", description: "Mettez en application immédiatement vos acquis" },
              { title: "Networking avec autres agriculteurs", description: "Créez votre réseau professionnel et partagez vos expériences" }
            ]}
            ctaText="Rejoindre un séminaire"
            ctaLink="/seminaires"
            gradientPosition="top-right"
          />

          <ServiceCard
            icon={User}
            category="Accompagnement Premium"
            title="Coaching Privé"
            subtitle="Se perfectionner avec du coaching privé"
            description="Accompagnement personnalisé pour accélérer vos résultats. Service premium pour entrepreneurs ambitieux."
            features={[
              { title: "Sessions 1-à-1 personnalisées", description: "Accompagnement individuel adapté à vos besoins spécifiques" },
              { title: "Plan d'action sur-mesure", description: "Stratégie personnalisée pour votre exploitation" },
              { title: "Suivi continu et ajustements", description: "Support régulier pour garantir vos résultats" }
            ]}
            ctaText="Réserver un appel"
            ctaLink="/coaching"
            gradientPosition="bottom-left"
          />

          <ServiceCard
            icon={Users}
            category="Événements Exclusifs"
            title="Événements à Venir"
            subtitle="Participer aux séminaires présentiels"
            description="Immersion totale avec exercices pratiques et networking. Appliquez concrètement les méthodes apprises."
            features={[
              { title: "Séminaires de 3 jours", description: "Événements intensifs pour transformer votre approche du commerce" },
              { title: "Exercices pratiques en groupe", description: "Travail collaboratif sur des cas réels d'exportation" },
              { title: "Networking avec autres agriculteurs", description: "Construisez des partenariats stratégiques durables" }
            ]}
            ctaText="Voir les événements"
            ctaLink="/seminaires"
            gradientPosition="top-right"
          />
        </div>
      </div>
    </section>
  )
}
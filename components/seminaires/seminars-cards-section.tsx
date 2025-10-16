"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, MapPin, Play, ChevronDown, ChevronUp, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/locales/LanguageProvider"

interface SeminarCardProps {
  slug: string
  duration: string
  participants: string
  title: string
  subtitle: string
  description: string
  image: string
  videoUrl?: string
  nextSession: string
  location: string
  program: {
    day: string
    title: string
    items: string[]
  }[]
}

function SeminarCard({
  slug,
  duration,
  participants,
  title,
  subtitle,
  description,
  image,
  videoUrl,
  nextSession,
  location,
  program
}: SeminarCardProps) {
  const { t } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Extract YouTube video ID
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop()
    return `https://www.youtube.com/embed/${videoId}`
  }

  const hasImage = image && !imageError
  const hasVideo = videoUrl && videoUrl.includes("youtube.com")

  return (
    <>
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
       
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
         
          {hasImage && (
            <>
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
              >
                <ImageIcon className="h-5 w-5 text-primary" />
              </button>
            </>
          )}

          {/* Show Video Play button if available */}
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <button
                onClick={() => setShowVideoModal(true)}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <Play className="h-8 w-8 text-primary ml-1" />
              </button>
            </div>
          )}

          {/* Fallback if no media */}
          {!hasImage && !hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
              </div>
            </div>
          )}
        </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header badges */}
        <div className="flex items-center justify-between mb-3">
          <Badge className="bg-primary text-white px-2.5 py-0.5 text-xs">{duration}</Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium">{participants}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-1.5 text-foreground leading-tight">{title}</h3>
        <p className="text-xs text-muted-foreground font-medium mb-2.5">{subtitle}</p>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{description}</p>

        {/* Highlighted Info */}
        <div className="space-y-2 mb-3">
          {/* Next Session - Highlighted */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-2.5 border-l-3 border-primary">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{t.seminaires.cards.labels.nextSession}</p>
                <p className="text-sm font-bold text-foreground">{nextSession}</p>
              </div>
            </div>
          </div>

          {/* Location - Highlighted */}
          <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-2.5 border-l-3 border-secondary">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-secondary flex-shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{t.seminaires.cards.labels.location}</p>
                <p className="text-sm font-bold text-foreground">{location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            className="w-full rounded-lg border-2 hover:bg-primary/5 py-2 text-sm"
          >
            {isExpanded ? (
              <>
                {t.seminaires.cards.labels.hideProgram}
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                {t.seminaires.cards.labels.showProgram}
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <Button
            asChild
            className="w-full bg-primary hover:bg-primary/90 py-2 text-sm rounded-lg"
          >
            <a href={`/seminaires/${slug}`}>
              {t.seminaires.cards.labels.learnMore}
            </a>
          </Button>
        </div>

        {/* Expandable Program Details */}
        {isExpanded && (
          <div className="space-y-3 pt-3 border-t border-gray-200 animate-in slide-in-from-top-2 duration-300">
            <h4 className="font-bold text-sm mb-2">{t.seminaires.cards.labels.detailedProgram}</h4>
            {program.map((day, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-primary/30">{day.day}</span>
                  <h5 className="font-bold text-xs text-foreground">{day.title}</h5>
                </div>
                <ul className="space-y-1 ml-8">
                  {day.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-xs text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Video Modal */}
    {showVideoModal && hasVideo && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowVideoModal(false)}>
        <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
          >
            <X className="h-6 w-6 text-gray-900" />
          </button>
          <iframe
            src={getYouTubeEmbedUrl(videoUrl!)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    )}

    {/* Image Modal */}
    {showImageModal && hasImage && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowImageModal(false)}>
        <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute -top-12 right-0 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
          >
            <X className="h-6 w-6 text-gray-900" />
          </button>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/80">{subtitle}</p>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

export function SeminarsCardsSection() {
  const seminars: SeminarCardProps[] = [
    {
      slug: "transformation-unit",
      duration: "2 jours",
      participants: "12-15 participants",
      title: "Créer une unité de transformation compétitive",
      subtitle: "Du concept à la mise en œuvre",
      description:
        "Apprenez à concevoir, dimensionner et lancer votre unité de transformation pour maximiser la valeur ajoutée de vos produits.",
      image: "/images/seminaires/transformation-unit.jpg",
      videoUrl: "https://www.youtube.com/watch?v=transformation-unit",
      nextSession: "15-16 Mars 2025",
      location: "Paris, France",
      program: [
        {
          day: "J1",
          title: "Conception et planification",
          items: [
            "Étude de faisabilité et business plan",
            "Choix des équipements et technologies",
            "Dimensionnement et layout optimal",
            "Réglementation et normes sanitaires"
          ]
        },
        {
          day: "J2",
          title: "Mise en œuvre pratique",
          items: [
            "Simulation de processus de transformation",
            "Calcul des coûts et pricing",
            "Contrôle qualité et traçabilité",
            "Plan de lancement et commercialisation"
          ]
        }
      ]
    },
    {
      slug: "export-dossier",
      duration: "3 jours",
      participants: "8-12 participants",
      title: "Préparer un dossier export crédible",
      subtitle: "De la prospection à la première vente",
      description:
        "Maîtrisez toutes les étapes pour construire un dossier export solide et convaincre vos premiers clients internationaux.",
      image: "/images/seminaires/export-dossier.jpg",
      videoUrl: "https://www.youtube.com/watch?v=export-dossier",
      nextSession: "22-24 Mars 2025",
      location: "Lyon, France",
      program: [
        {
          day: "J1",
          title: "Étude de marché",
          items: [
            "Analyse des marchés cibles",
            "Identification des opportunités",
            "Étude de la concurrence",
            "Positionnement produit"
          ]
        },
        {
          day: "J2",
          title: "Dossier commercial",
          items: [
            "Présentation entreprise et produits",
            "Certifications et références",
            "Conditions commerciales",
            "Supports marketing adaptés"
          ]
        },
        {
          day: "J3",
          title: "Négociation et contrats",
          items: [
            "Techniques de négociation internationale",
            "Rédaction de contrats export",
            "Gestion des risques",
            "Simulation de négociation"
          ]
        }
      ]
    },
    {
      slug: "assurance-agricole",
      duration: "2 jours",
      participants: "10-15 participants",
      title: "Sécuriser son exploitation avec l'assurance agricole",
      subtitle: "Protection et gestion des risques",
      description:
        "Comprenez les mécanismes d'assurance agricole et apprenez à protéger efficacement votre exploitation contre les aléas climatiques et économiques.",
      image: "/images/seminaires/assurance-agricole.jpg",
      videoUrl: "https://www.youtube.com/watch?v=assurance-agricole",
      nextSession: "5-6 Avril 2025",
      location: "Toulouse, France",
      program: [
        {
          day: "J1",
          title: "Comprendre l'assurance agricole",
          items: [
            "Types d'assurances disponibles",
            "Couverture des risques climatiques",
            "Garanties et indemnisations",
            "Cadre réglementaire et subventions"
          ]
        },
        {
          day: "J2",
          title: "Stratégie de protection",
          items: [
            "Évaluation des risques de votre exploitation",
            "Choix des couvertures adaptées",
            "Optimisation des cotisations",
            "Gestion des sinistres et réclamations"
          ]
        }
      ]
    },
    {
      slug: "certifications",
      duration: "3 jours",
      participants: "8-12 participants",
      title: "Certification et normes internationales",
      subtitle: "GlobalGAP, Bio, Fair Trade",
      description:
        "Maîtrisez les certifications essentielles pour accéder aux marchés internationaux et valorisez vos produits auprès des acheteurs exigeants.",
      image: "/images/seminaires/certifications.jpg",
      videoUrl: "https://www.youtube.com/watch?v=certifications",
      nextSession: "12-14 Avril 2025",
      location: "Bordeaux, France",
      program: [
        {
          day: "J1",
          title: "Panorama des certifications",
          items: [
            "GlobalGAP et bonnes pratiques agricoles",
            "Certifications biologiques (AB, Bio EU)",
            "Fair Trade et commerce équitable",
            "Certifications sectorielles spécifiques"
          ]
        },
        {
          day: "J2",
          title: "Mise en conformité",
          items: [
            "Diagnostic de votre exploitation",
            "Plan d'actions et investissements",
            "Documentation et traçabilité",
            "Préparation aux audits"
          ]
        },
        {
          day: "J3",
          title: "Valorisation commerciale",
          items: [
            "Communiquer sur vos certifications",
            "Premium price et négociation",
            "Accès aux marchés certifiés",
            "Retour sur investissement"
          ]
        }
      ]
    },
    {
      slug: "marketing-digital",
      duration: "2 jours",
      participants: "15-20 participants",
      title: "Marketing digital pour agriculteurs",
      subtitle: "De la visibilité en ligne aux ventes directes",
      description:
        "Développez votre présence digitale, créez votre marque et vendez directement vos produits grâce aux outils numériques modernes.",
      image: "/images/seminaires/marketing-digital.jpg",
      videoUrl: "https://www.youtube.com/watch?v=marketing-digital",
      nextSession: "26-27 Avril 2025",
      location: "Nantes, France",
      program: [
        {
          day: "J1",
          title: "Stratégie digitale",
          items: [
            "Construire votre identité de marque",
            "Réseaux sociaux et community management",
            "Site web et e-commerce",
            "Photographie et storytelling produit"
          ]
        },
        {
          day: "J2",
          title: "Vente en ligne",
          items: [
            "Plateformes de vente directe",
            "Logistique et livraison",
            "Paiement et sécurité",
            "Fidélisation client et avis"
          ]
        }
      ]
    },
    {
      slug: "finance-export",
      duration: "3 jours",
      participants: "8-10 participants",
      title: "Finance et gestion pour l'export",
      subtitle: "Optimiser sa rentabilité à l'international",
      description:
        "Maîtrisez les aspects financiers de l'export : calcul des coûts, tarification, financement, gestion des devises et optimisation fiscale.",
      image: "/images/seminaires/finance-export.jpg",
      videoUrl: "https://www.youtube.com/watch?v=finance-export",
      nextSession: "10-12 Mai 2025",
      location: "Marseille, France",
      program: [
        {
          day: "J1",
          title: "Coûts et prix export",
          items: [
            "Calcul du prix de revient export",
            "Incoterms et impact sur les coûts",
            "Stratégie de pricing international",
            "Marges et rentabilité"
          ]
        },
        {
          day: "J2",
          title: "Financement et paiement",
          items: [
            "Solutions de financement export",
            "Moyens de paiement internationaux",
            "Gestion du risque de change",
            "Crédit documentaire et garanties"
          ]
        },
        {
          day: "J3",
          title: "Optimisation fiscale",
          items: [
            "TVA à l'export et régimes spéciaux",
            "Douanes et droits de douane",
            "Aides et subventions export",
            "Structure juridique optimale"
          ]
        }
      ]
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              Formations Intensives
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Nos Séminaires Phares
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des formations intensives pour maîtriser chaque aspect de votre développement
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {seminars.map((seminar, index) => (
            <SeminarCard key={index} {...seminar} />
          ))}
        </div>
      </div>
    </section>
  )
}

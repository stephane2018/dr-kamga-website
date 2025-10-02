import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, CheckCircle, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This would typically come from a database or CMS
const seminarsData: Record<string, any> = {
  "transformation-unit": {
    duration: "2 jours",
    participants: "12-15 participants",
    title: "Créer une unité de transformation compétitive",
    subtitle: "Du concept à la mise en œuvre",
    description:
      "Apprenez à concevoir, dimensionner et lancer votre unité de transformation pour maximiser la valeur ajoutée de vos produits agricoles. Cette formation intensive vous guidera de l'idée initiale jusqu'au lancement opérationnel.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    nextSession: "15-16 Mars 2025",
    location: "Paris, France",
    price: "890€",
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
    ],
    objectives: [
      "Concevoir une unité de transformation adaptée à votre production",
      "Maîtriser les aspects réglementaires et normatifs",
      "Calculer la rentabilité de votre projet",
      "Élaborer un plan de mise en œuvre réaliste"
    ],
    targetAudience: "Agriculteurs et entrepreneurs agricoles souhaitant créer ou optimiser une unité de transformation",
    prerequisites: "Aucun prérequis. Formation accessible à tous.",
    includes: [
      "2 jours de formation intensive",
      "Support de formation complet",
      "Accès à des outils de calcul et modèles",
      "Déjeuners et pauses café",
      "Certificat de participation"
    ]
  },
  "export-dossier": {
    duration: "3 jours",
    participants: "8-12 participants",
    title: "Préparer un dossier export crédible",
    subtitle: "De la prospection à la première vente",
    description:
      "Maîtrisez toutes les étapes pour construire un dossier export solide et convaincre vos premiers clients internationaux. Une formation complète pour réussir votre entrée sur les marchés étrangers.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    nextSession: "22-24 Mars 2025",
    location: "Lyon, France",
    price: "1290€",
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
    ],
    objectives: [
      "Construire un dossier export professionnel et crédible",
      "Identifier et prospecter les marchés internationaux",
      "Maîtriser les techniques de négociation internationale",
      "Sécuriser vos premières transactions export"
    ],
    targetAudience: "Agriculteurs, coopératives et PME agroalimentaires prêts à se lancer à l'export",
    prerequisites: "Avoir un produit ou une gamme de produits prêts à l'export",
    includes: [
      "3 jours de formation intensive",
      "Kit export complet (modèles et documents)",
      "Séances de simulation pratique",
      "Déjeuners et pauses café",
      "Suivi post-formation (1 mois)"
    ]
  }
}

export async function generateStaticParams() {
  return Object.keys(seminarsData).map((slug) => ({
    slug: slug,
  }))
}

export default function SeminarDetailPage({ params }: { params: { slug: string } }) {
  const seminar = seminarsData[params.slug]

  if (!seminar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Séminaire non trouvé</h1>
          <Link href="/seminaires">
            <Button>Retour aux séminaires</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Extract YouTube video ID
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop()
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Image */}
      <section className="relative pt-24 pb-12 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="hover:bg-primary/5">
              <Link href="/seminaires" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour aux séminaires
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <Badge className="mb-4 bg-primary text-white">{seminar.duration}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{seminar.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{seminar.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{seminar.description}</p>

              {/* Key Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border-l-4 border-primary">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">PROCHAINE SESSION</p>
                      <p className="text-base font-bold text-foreground">{seminar.nextSession}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-4 border-l-4 border-secondary">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">LIEU</p>
                      <p className="text-base font-bold text-foreground">{seminar.location}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-4 border-l-4 border-accent">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">PARTICIPANTS</p>
                      <p className="text-base font-bold text-foreground">{seminar.participants}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border-l-4 border-primary">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">TARIF</p>
                      <p className="text-base font-bold text-foreground">{seminar.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg px-8" asChild>
                <Link href="#reservation">Réserver ma place →</Link>
              </Button>
            </div>

            {/* Right: Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={seminar.image}
                alt={seminar.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {seminar.videoUrl && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Découvrez la formation en vidéo</h2>
              <p className="text-muted-foreground">Un aperçu de ce qui vous attend</p>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src={getYouTubeEmbedUrl(seminar.videoUrl)}
                title={seminar.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* Program Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Programme détaillé</h2>
            <p className="text-xl text-muted-foreground">Contenu de la formation jour par jour</p>
          </div>

          <div className="space-y-6">
            {seminar.program.map((day: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{day.day}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{day.title}</h3>
                  </div>
                </div>
                <ul className="space-y-3 ml-20">
                  {day.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives & Details */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Objectives */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Objectifs de la formation</h3>
              <ul className="space-y-3">
                {seminar.objectives.map((objective: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Public visé</h3>
                <p className="text-muted-foreground">{seminar.targetAudience}</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Prérequis</h3>
                <p className="text-muted-foreground">{seminar.prerequisites}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Includes Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-6 text-center">La formation comprend</h3>
            <ul className="space-y-3">
              {seminar.includes.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section id="reservation" className="py-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Prêt à vous lancer ?</h2>
          <p className="text-xl text-white/90 mb-8">
            Réservez votre place dès maintenant - Places limitées à {seminar.participants}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 text-lg px-8" asChild>
              <Link href="/contact">Réserver ma place</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8" asChild>
              <Link href="/contact">Poser une question</Link>
            </Button>
          </div>
          <p className="text-white/80 mt-6 text-sm">
            Prochaine session : <strong>{seminar.nextSession}</strong> • {seminar.location}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

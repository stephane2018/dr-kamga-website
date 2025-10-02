import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Sprout, Factory, Globe, Shield, type LucideIcon, CookingPot, DollarSign } from "lucide-react"

interface AxisCardData {
  icon: LucideIcon
  iconColor: string
  title: string
  description: string
  content: string
  features: string[]
  duration: string
  maxParticipants: number
}

const axisCardsData: AxisCardData[] = [
  {
    icon: Sprout,
    iconColor: "primary",
    title: "Axe 1 - Matières Premières",
    description: "Produire pour l'export dès le premier jour",
    content: "Maîtrisez les techniques de production qui répondent aux standards internationaux et optimisez vos rendements.",
    features: [
      "Sélection des variétés adaptées à l'export",
      "Techniques de culture optimisées",
      "Gestion de la qualité dès la production",
      "Certification et traçabilité"
    ],
    duration: "3h30",
    maxParticipants: 20
  },
  {
    icon: Factory,
    iconColor: "secondary",
    title: "Axe 2 - Transformation",
    description: "Les clés d'une transformation rentable et durable",
    content: "Développez votre unité de transformation pour maximiser la valeur ajoutée de vos produits.",
    features: [
      "Choix des équipements et technologies",
      "Processus de transformation optimisés",
      "Contrôle qualité et normes sanitaires",
      "Calcul de rentabilité et pricing"
    ],
    duration: "4h",
    maxParticipants: 15
  },
  {
    icon: Globe,
    iconColor: "accent",
    title: "Axe 3 - Exportation",
    description: "Devenir un exportateur compétitif",
    content: "Maîtrisez toutes les étapes de l'exportation, de la prospection à la livraison.",
    features: [
      "Étude de marché et prospection",
      "Négociation et contrats internationaux",
      "Logistique et transport",
      "Gestion des risques à l'export"
    ],
    duration: "4h30",
    maxParticipants: 12
  },
  {
    icon: Shield,
    iconColor: "primary",
    title: "Module Assurance",
    description: "Sécuriser vos produits pour inspirer confiance",
    content: "Protégez votre activité et rassurez vos partenaires avec les bonnes assurances.",
    features: [
      "Types d'assurances pour l'export",
      "Évaluation des risques",
      "Négociation avec les assureurs",
      "Gestion des sinistres"
    ],
    duration: "2h30",
    maxParticipants: 25
  },
  {
    icon: CookingPot,
    iconColor: "secondary",
    title: "Module Gestion de la production",
    description: "Préparez votre dossier de production pour inspirer confiance",
    content: "Préparez votre dossier de production pour inspirer confiance.",
    features: [
      "Préparation du dossier de production",
      "Évaluation des financements",
      "Négociation avec les financements",
      "Gestion des financements"
    ],
    duration: "2h30",
    maxParticipants: 25
  },
  {
    icon: DollarSign,
    iconColor: "secondary",
    title: "Module Financement",
    description: "Accéder à des financements adaptés à votre projet agricole et à votre niveau de développement",
    content: "Accéder à des financements adaptés à votre projet agricole et à votre niveau de développement.",
    features: [
      "Préparation du dossier de financement",
      "Évaluation des financements",
      "Négociation avec les financements",
      "Gestion des financements"
    ],
    duration: "2h30",
    maxParticipants: 25
  }
]

interface AxisCardProps {
  data: AxisCardData
}

function AxisCard({ data }: AxisCardProps) {
  const Icon = data.icon

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-${data.iconColor}/10 rounded-lg flex items-center justify-center`}>
            <Icon className={`h-6 w-6 text-${data.iconColor}`} />
          </div>
          <div>
            <CardTitle className="text-xl">{data.title}</CardTitle>
            <CardDescription>{data.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          {data.content}
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground mb-4">
          {data.features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{data.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>Max {data.maxParticipants} participants</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AxisCardsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Une Masterclass par Axe Stratégique</h2>
          <p className="text-xl text-muted-foreground">
            Chaque session correspond à un axe du programme pour un apprentissage structuré
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {axisCardsData.map((cardData, index) => (
            <AxisCard key={index} data={cardData} />
          ))}
        </div>
      </div>
    </section>
  )
}

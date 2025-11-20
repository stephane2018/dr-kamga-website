import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const axisCardsData = [
  {
    axisKey: 'axis1',
    icon: 'Sprout',
    iconColor: 'primary',
    titleFr: 'Axe 1 - Matières Premières',
    titleEn: 'Axis 1 - Raw Materials',
    descriptionFr: 'Produire pour l\'export dès le premier jour',
    descriptionEn: 'Produce for export from day one',
    contentFr: 'Maîtrisez les techniques de production qui répondent aux standards internationaux et optimisez vos rendements.',
    contentEn: 'Master production techniques that meet international standards and optimize your yields.',
    features: JSON.stringify({
      fr: [
        'Sélection des variétés adaptées à l\'export',
        'Techniques de culture optimisées',
        'Gestion de la qualité dès la production',
        'Certification et traçabilité',
      ],
      en: [
        'Selection of export-adapted varieties',
        'Optimized cultivation techniques',
        'Quality management from production',
        'Certification and traceability',
      ],
    }),
    duration: '3h30',
    maxParticipants: 20,
    order: 1,
    isActive: true,
    isVisibleOnHome: true,
  },
  {
    axisKey: 'axis2',
    icon: 'Factory',
    iconColor: 'secondary',
    titleFr: 'Axe 2 - Transformation',
    titleEn: 'Axis 2 - Processing',
    descriptionFr: 'Les clés d\'une transformation rentable et durable',
    descriptionEn: 'Keys to profitable and sustainable processing',
    contentFr: 'Développez votre unité de transformation pour maximiser la valeur ajoutée de vos produits.',
    contentEn: 'Develop your processing unit to maximize the added value of your products.',
    features: JSON.stringify({
      fr: [
        'Choix des équipements et technologies',
        'Processus de transformation optimisés',
        'Contrôle qualité et normes sanitaires',
        'Calcul de rentabilité et pricing',
      ],
      en: [
        'Equipment and technology selection',
        'Optimized processing processes',
        'Quality control and sanitary standards',
        'Profitability calculation and pricing',
      ],
    }),
    duration: '4h',
    maxParticipants: 15,
    order: 2,
    isActive: true,
    isVisibleOnHome: true,
  },
  {
    axisKey: 'axis3',
    icon: 'Globe',
    iconColor: 'accent',
    titleFr: 'Axe 3 - Exportation',
    titleEn: 'Axis 3 - Export',
    descriptionFr: 'Devenir un exportateur compétitif',
    descriptionEn: 'Become a competitive exporter',
    contentFr: 'Maîtrisez toutes les étapes de l\'exportation, de la prospection à la livraison.',
    contentEn: 'Master all export stages, from prospecting to delivery.',
    features: JSON.stringify({
      fr: [
        'Étude de marché et prospection',
        'Négociation et contrats internationaux',
        'Logistique et transport',
        'Gestion des risques à l\'export',
      ],
      en: [
        'Market research and prospecting',
        'International negotiation and contracts',
        'Logistics and transport',
        'Export risk management',
      ],
    }),
    duration: '4h30',
    maxParticipants: 12,
    order: 3,
    isActive: true,
    isVisibleOnHome: true,
  },
  {
    axisKey: 'axis4',
    icon: 'Shield',
    iconColor: 'primary',
    titleFr: 'Axe 4 - Assurance',
    titleEn: 'Axis 4 - Insurance',
    descriptionFr: 'Sécuriser vos produits pour inspirer confiance',
    descriptionEn: 'Secure your products to inspire confidence',
    contentFr: 'Protégez votre activité et rassurez vos partenaires avec les bonnes assurances.',
    contentEn: 'Protect your business and reassure your partners with the right insurance.',
    features: JSON.stringify({
      fr: [
        'Types d\'assurances pour l\'export',
        'Évaluation des risques',
        'Négociation avec les assureurs',
        'Gestion des sinistres',
      ],
      en: [
        'Types of export insurance',
        'Risk assessment',
        'Negotiation with insurers',
        'Claims management',
      ],
    }),
    duration: '2h30',
    maxParticipants: 25,
    order: 4,
    isActive: true,
    isVisibleOnHome: true,
  },
  {
    axisKey: 'axis5',
    icon: 'CookingPot',
    iconColor: 'secondary',
    titleFr: 'Axe 5 - Gestion de la production',
    titleEn: 'Axis 5 - Production Management',
    descriptionFr: 'Préparez votre dossier de production pour inspirer confiance',
    descriptionEn: 'Prepare your production file to inspire confidence',
    contentFr: 'Préparez votre dossier de production pour inspirer confiance.',
    contentEn: 'Prepare your production file to inspire confidence.',
    features: JSON.stringify({
      fr: [
        'Préparation du dossier de production',
        'Évaluation des financements',
        'Négociation avec les financements',
        'Gestion des financements',
      ],
      en: [
        'Production file preparation',
        'Financing evaluation',
        'Negotiation with financing',
        'Financing management',
      ],
    }),
    duration: '2h30',
    maxParticipants: 25,
    order: 5,
    isActive: true,
    isVisibleOnHome: true,
  },
  {
    axisKey: 'axis6',
    icon: 'DollarSign',
    iconColor: 'secondary',
    titleFr: 'Axe 6 - Financement',
    titleEn: 'Axis 6 - Financing',
    descriptionFr: 'Accéder à des financements adaptés à votre projet agricole et à votre niveau de développement',
    descriptionEn: 'Access financing adapted to your agricultural project and development level',
    contentFr: 'Accéder à des financements adaptés à votre projet agricole et à votre niveau de développement.',
    contentEn: 'Access financing adapted to your agricultural project and development level.',
    features: JSON.stringify({
      fr: [
        'Préparation du dossier de financement',
        'Évaluation des financements',
        'Négociation avec les financements',
        'Gestion des financements',
      ],
      en: [
        'Financing file preparation',
        'Financing evaluation',
        'Negotiation with financing',
        'Financing management',
      ],
    }),
    duration: '2h30',
    maxParticipants: 25,
    order: 6,
    isActive: true,
    isVisibleOnHome: true,
  },
]

async function main() {
  console.log('🌱 Starting to seed Axis Cards...')

  for (const axisCard of axisCardsData) {
    const result = await prisma.axisCard.upsert({
      where: { axisKey: axisCard.axisKey },
      update: axisCard,
      create: axisCard,
    })
    console.log(`✅ Created/Updated: ${result.titleEn}`)
  }

  console.log('✨ Axis Cards seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Axis Cards:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting comprehensive seed...\n')

  // 1. Create admin user
  console.log('👤 Seeding Admin User...')
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@cabinetdab.com' },
    update: {
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
      isActive: true
    },
    create: {
      email: 'admin@cabinetdab.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
      isActive: true
    }
  })
  console.log('✅ Admin created:', admin.email, '\n')

  // 2. Create Masterclasses
  console.log('💻 Seeding Masterclasses...')
  const masterclassData = [
    {
      icon: '💻',
      titleFr: 'Formation en Ligne',
      titleEn: 'Online Training',
      descriptionFr: 'Sessions en ligne interactives avec le Dr. Kanga',
      descriptionEn: 'Interactive online sessions with Dr. Kanga',
      features: JSON.stringify({
        fr: [
          'Accès 24/7 aux enregistrements',
          'Support par chat en direct',
          'Certificat de complétion'
        ],
        en: [
          '24/7 access to recordings',
          'Live chat support',
          'Completion certificate'
        ]
      }),
      ctaFr: 'S\'inscrire maintenant',
      ctaEn: 'Register now',
      backgroundColor: 'from-blue-50 to-cyan-50',
      type: 'online',
      date: '15 Février 2025',
      time: '14h00 - 18h00',
      seats: '12 places',
      isActive: true,
      isVisibleOnHome: true
    },
    {
      icon: '👥',
      titleFr: 'Formation Présentielle',
      titleEn: 'In-Person Training',
      descriptionFr: 'Sessions en présentiel à Abidjan',
      descriptionEn: 'In-person sessions in Abidjan',
      features: JSON.stringify({
        fr: [
          'Interaction directe avec l\'expert',
          'Exercices pratiques',
          'Networking avec autres agriculteurs'
        ],
        en: [
          'Direct interaction with expert',
          'Practical exercises',
          'Networking with other farmers'
        ]
      }),
      ctaFr: 'Réserver ma place',
      ctaEn: 'Book my spot',
      backgroundColor: 'from-amber-50 to-orange-50',
      type: 'inPerson',
      date: '22-23 Février 2025',
      time: '09h00 - 17h00',
      seats: '8 places',
      isActive: true,
      isVisibleOnHome: true
    }
  ]

  for (const data of masterclassData) {
    await prisma.masterclass.create({ data })
  }
  console.log(`✅ Created ${masterclassData.length} masterclasses\n`)

  // 3. Create Seminars
  console.log('📚 Seeding Seminars...')
  const seminar = await prisma.seminar.upsert({
    where: { slug: 'transformation-locale' },
    update: {},
    create: {
      slug: 'transformation-locale',
      duration: '2 jours',
      participants: '12-15 participants',
      titleFr: 'Créer une unité de transformation compétitive',
      titleEn: 'Create a competitive processing unit',
      subtitleFr: 'Du concept à la mise en œuvre',
      subtitleEn: 'From concept to implementation',
      descriptionFr: 'Apprenez à concevoir, dimensionner et lancer votre unité de transformation pour maximiser la valeur ajoutée de vos produits.',
      descriptionEn: 'Learn how to design, size and launch your processing unit to maximize the added value of your products.',
      image: '/images/seminaires/transformation-unit.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=example',
      nextSession: '15-16 Mars 2025',
      location: 'Abidjan, Côte d\'Ivoire',
      program: JSON.stringify({
        fr: [
          {
            day: 'J1',
            title: 'Conception et planification',
            items: [
              'Étude de faisabilité et business plan',
              'Choix des équipements et technologies',
              'Dimensionnement et layout optimal'
            ]
          },
          {
            day: 'J2',
            title: 'Mise en œuvre pratique',
            items: [
              'Simulation de processus de transformation',
              'Calcul des coûts et pricing',
              'Contrôle qualité et traçabilité'
            ]
          }
        ],
        en: [
          {
            day: 'D1',
            title: 'Design and planning',
            items: [
              'Feasibility study and business plan',
              'Equipment and technology selection',
              'Optimal sizing and layout'
            ]
          },
          {
            day: 'D2',
            title: 'Practical implementation',
            items: [
              'Processing simulation',
              'Cost calculation and pricing',
              'Quality control and traceability'
            ]
          }
        ]
      }),
      isActive: true,
      isVisibleOnHome: true
    }
  })
  console.log('✅ Created seminar:', seminar.titleFr, '\n')

  // 4. Create Home Services
  console.log('🏠 Seeding Home Services...')
  const services = [
    {
      slug: 'masterclass',
      icon: 'User',
      categoryFr: 'Formation Individuelle',
      categoryEn: 'Individual Training',
      titleFr: 'Masterclass Thématiques',
      titleEn: 'Thematic Masterclasses',
      subtitleFr: 'Commencer par les masterclass',
      subtitleEn: 'Start with masterclasses',
      descriptionFr: 'Sessions expertes et interactives avec le Dr. Kanga. Perfectionnez vos connaissances sur des sujets spécifiques avec vidéos complémentaires incluses.',
      descriptionEn: 'Expert and interactive sessions with Dr. Kanga. Perfect your knowledge on specific topics with complementary videos included.',
      features: JSON.stringify({
        fr: [
          'Sessions live de 2-4h',
          'Interaction directe avec l\'expert',
          'Replays et vidéos complémentaires'
        ],
        en: [
          'Live sessions of 2-4h',
          'Direct interaction with expert',
          'Replays and complementary videos'
        ]
      }),
      ctaTextFr: 'Voir les masterclass',
      ctaTextEn: 'View masterclasses',
      ctaLink: '/masterclass',
      gradientPosition: 'top-left',
      order: 1,
      isActive: true
    },
    {
      slug: 'seminaires',
      icon: 'Users',
      categoryFr: 'Formation Collective',
      categoryEn: 'Group Training',
      titleFr: 'Séminaires Pratiques',
      titleEn: 'Practical Seminars',
      subtitleFr: 'Mettre en pratique via des séminaires',
      subtitleEn: 'Practice through seminars',
      descriptionFr: 'Immersion totale avec exercices pratiques et networking. Appliquez concrètement les méthodes apprises.',
      descriptionEn: 'Total immersion with practical exercises and networking. Apply the methods you learned concretely.',
      features: JSON.stringify({
        fr: [
          'Séminaires de 3 jours',
          'Exercices pratiques en groupe',
          'Networking avec autres agriculteurs'
        ],
        en: [
          '3-day seminars',
          'Practical group exercises',
          'Networking with other farmers'
        ]
      }),
      ctaTextFr: 'Rejoindre un séminaire',
      ctaTextEn: 'Join a seminar',
      ctaLink: '/seminaires',
      gradientPosition: 'top-right',
      order: 2,
      isActive: true
    },
    {
      slug: 'coaching',
      icon: 'User',
      categoryFr: 'Accompagnement Premium',
      categoryEn: 'Premium Support',
      titleFr: 'Coaching Privé',
      titleEn: 'Private Coaching',
      subtitleFr: 'Se perfectionner avec du coaching privé',
      subtitleEn: 'Improve with private coaching',
      descriptionFr: 'Accompagnement personnalisé pour accélérer vos résultats. Service premium pour entrepreneurs ambitieux.',
      descriptionEn: 'Personalized support to accelerate your results. Premium service for ambitious entrepreneurs.',
      features: JSON.stringify({
        fr: [
          'Sessions 1-à-1 personnalisées',
          'Plan d\'action sur-mesure',
          'Suivi continu et ajustements'
        ],
        en: [
          'Personalized 1-on-1 sessions',
          'Custom action plan',
          'Continuous follow-up and adjustments'
        ]
      }),
      ctaTextFr: 'Réserver un appel',
      ctaTextEn: 'Book a call',
      ctaLink: '/coaching',
      gradientPosition: 'bottom-left',
      order: 3,
      isActive: true
    },
    {
      slug: 'events',
      icon: 'Users',
      categoryFr: 'Événements Exclusifs',
      categoryEn: 'Exclusive Events',
      titleFr: 'Événements à Venir',
      titleEn: 'Upcoming Events',
      subtitleFr: 'Participer aux séminaires présentiels',
      subtitleEn: 'Participate in in-person seminars',
      descriptionFr: 'Immersion totale avec exercices pratiques et networking. Appliquez concrètement les méthodes apprises.',
      descriptionEn: 'Total immersion with practical exercises and networking. Apply the methods you learned concretely.',
      features: JSON.stringify({
        fr: [
          'Séminaires de 3 jours',
          'Exercices pratiques en groupe',
          'Networking avec autres agriculteurs'
        ],
        en: [
          '3-day seminars',
          'Practical group exercises',
          'Networking with other farmers'
        ]
      }),
      ctaTextFr: 'Voir les événements',
      ctaTextEn: 'View events',
      ctaLink: '/seminaires',
      gradientPosition: 'top-right',
      order: 4,
      isActive: true
    }
  ]

  for (const service of services) {
    await prisma.homeService.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    })
  }
  console.log(`✅ Created ${services.length} home services\n`)

  // 5. Create About Content
  console.log('ℹ️ Seeding About Content...')
  const aboutContent = await prisma.aboutContent.upsert({
    where: { id: 'default-about' },
    update: {},
    create: {
      id: 'default-about',
      badgeFr: 'Parcours Expert',
      badgeEn: 'Expert Journey',
      titleFr: '40 ans d\'expérience au service de l\'Agriculture Africaine',
      titleEn: '40 years of experience serving African Agriculture',
      descriptionFr: 'Docteur vétérinaire et expert reconnu de la transformation locale et de l\'exportation, le Dr Kanga Kouamé a conçu la méthode "De la ferme aux marchés mondiaux" pour accompagner les producteurs vers l\'autonomie et la compétitivité internationale.',
      descriptionEn: 'Veterinary doctor and recognized expert in local transformation and export, Dr Kanga Kouamé designed the "From Farm to Global Markets" method to guide producers towards autonomy and international competitiveness.',
      credentials: JSON.stringify({
        fr: [
          'Conseiller diplomatique de la CI en charge des questions agricoles auprès de la FAO, au PAM et le FIDA',
          'Dr en médecine vétérinaire, diplômé de l\'université de Liège en Belgique. Spécialisé en production et santé animale, hygiène publique.',
          'Point focal de l\'OMC (Organisation Mondiale du Commerce) pour le système de contrôle sanitaire et phyto sanitaire.',
          'Autorité compétente officielle de la CI pour l\'agrément des établissements de traitement et de certification des denrées animales et d\'origines animales.',
          'Gestion des exploitations agro-sylvo-pastorales et halieutiques (Plantation, Élevage, Pêche …)'
        ],
        en: [
          'Diplomatic advisor for CI in charge of agricultural issues at FAO, WFP and IFAD',
          'PhD in veterinary medicine, graduated from the University of Liège in Belgium. Specialized in production and animal health, public hygiene.',
          'Focal point of the WTO (World Trade Organization) for the sanitary and phytosanitary control system.',
          'Official competent authority of CI for the approval of treatment and certification facilities for animal and animal products.',
          'Management of agro-sylvo-pastoral and fisheries operations (Plantation, Livestock, Fishing...)'
        ]
      }),
      imageUrl: '/dr-kanga.jpeg',
      isActive: true
    }
  })
  console.log('✅ Created about content:', aboutContent.titleFr, '\n')

  // 6. Create Axis Cards
  console.log('🎯 Seeding Axis Cards...')
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

  for (const axisCard of axisCardsData) {
    await prisma.axisCard.upsert({
      where: { axisKey: axisCard.axisKey },
      update: axisCard,
      create: axisCard,
    })
  }
  console.log(`✅ Created ${axisCardsData.length} axis cards\n`)

  // Summary
  console.log('📊 Database Summary:')
  const counts = {
    admins: await prisma.admin.count(),
    masterclasses: await prisma.masterclass.count(),
    seminars: await prisma.seminar.count(),
    services: await prisma.homeService.count(),
    about: await prisma.aboutContent.count(),
    axisCards: await prisma.axisCard.count(),
  }

  console.log(`   - Admins: ${counts.admins}`)
  console.log(`   - Masterclasses: ${counts.masterclasses}`)
  console.log(`   - Seminars: ${counts.seminars}`)
  console.log(`   - Home Services: ${counts.services}`)
  console.log(`   - About Content: ${counts.about}`)
  console.log(`   - Axis Cards: ${counts.axisCards}`)

  console.log('\n✨ Comprehensive seed completed!\n')
  console.log('📝 Login credentials:')
  console.log('   Email: admin@cabinetdab.com')
  console.log('   Password: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting multilingual seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@cabinetdab.com' },
    update: {},
    create: {
      email: 'admin@cabinetdab.com',
      password: hashedPassword,
      name: 'Admin'
    }
  })

  console.log('Created admin:', admin.email)

  // Create Masterclasses (for registration section)
  const masterclass1 = await prisma.masterclass.create({
    data: {
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
      isActive: true
    }
  })

  const masterclass2 = await prisma.masterclass.create({
    data: {
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
      isActive: true
    }
  })

  console.log('Created masterclasses:', masterclass1.titleFr, masterclass2.titleFr)

  // Create Seminars
  const seminar1 = await prisma.seminar.create({
    data: {
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
      isActive: true
    }
  })

  console.log('Created seminar:', seminar1.titleFr)

  // Create Home Services (for ProgressPath section)
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
      order: 1
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
      order: 2
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
      order: 3
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
      order: 4
    }
  ]

  for (const service of services) {
    await prisma.homeService.create({
      data: service
    })
  }

  console.log('Created', services.length, 'home services')

  // Create About Content
  const aboutContent = await prisma.aboutContent.create({
    data: {
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

  console.log('Created about content:', aboutContent.titleFr)

  console.log('Multilingual seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

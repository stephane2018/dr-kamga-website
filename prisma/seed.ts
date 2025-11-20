import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

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

  // Create sample masterclasses
  const masterclass1 = await prisma.masterclass.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      icon: 'Sprout',
      titleFr: 'Transformation Locale',
      titleEn: 'Local Transformation',
      descriptionFr: 'Apprenez à transformer vos produits agricoles pour maximiser leur valeur',
      descriptionEn: 'Learn how to transform your agricultural products to maximize their value',
      features: JSON.stringify({
        fr: ['Techniques de conservation', 'Packaging et branding', 'Normes sanitaires'],
        en: ['Preservation techniques', 'Packaging and branding', 'Sanitary standards']
      }),
      ctaFr: 'Commencer',
      ctaEn: 'Start',
      type: 'online',
      date: '2025-03-15',
      time: '14:00',
      seats: '20'
    }
  })

  const masterclass2 = await prisma.masterclass.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      icon: 'Globe',
      titleFr: 'Export International',
      titleEn: 'International Export',
      descriptionFr: 'Maîtrisez les stratégies d\'exportation vers les marchés mondiaux',
      descriptionEn: 'Master export strategies for global markets',
      features: JSON.stringify({
        fr: ['Analyse de marché', 'Documentation export', 'Logistique internationale'],
        en: ['Market analysis', 'Export documentation', 'International logistics']
      }),
      ctaFr: 'Découvrir',
      ctaEn: 'Discover',
      type: 'online',
      date: '2025-04-10',
      time: '10:00',
      seats: '15'
    }
  })

  console.log('Created masterclasses:', masterclass1.titleFr, masterclass2.titleFr)

  // Create sample seminar
  const seminar = await prisma.seminar.upsert({
    where: { slug: 'transformation-unit' },
    update: {},
    create: {
      slug: 'transformation-unit',
      duration: '2 jours',
      participants: '12-15 participants',
      titleFr: 'Créer une unité de transformation compétitive',
      titleEn: 'Create a competitive transformation unit',
      subtitleFr: 'Du concept à la mise en œuvre',
      subtitleEn: 'From concept to implementation',
      descriptionFr: 'Apprenez à concevoir, dimensionner et lancer votre unité de transformation pour maximiser la valeur ajoutée de vos produits.',
      descriptionEn: 'Learn how to design, size, and launch your transformation unit to maximize the added value of your products.',
      image: '/images/seminaires/transformation-unit.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=example',
      nextSession: '15-16 Mars 2025',
      location: 'Paris, France',
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
              'Choice of equipment and technologies',
              'Sizing and optimal layout'
            ]
          },
          {
            day: 'D2',
            title: 'Practical implementation',
            items: [
              'Transformation process simulation',
              'Cost calculation and pricing',
              'Quality control and traceability'
            ]
          }
        ]
      })
    }
  })

  console.log('Created seminar:', seminar.titleFr)

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

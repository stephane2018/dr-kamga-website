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
      icon: '🌾',
      title: 'Transformation Locale',
      description: 'Apprenez à transformer vos produits agricoles pour maximiser leur valeur',
      features: JSON.stringify([
        'Techniques de conservation',
        'Packaging et branding',
        'Normes sanitaires'
      ]),
      cta: 'Commencer',
      backgroundColor: 'from-amber-50 to-orange-50'
    }
  })

  const masterclass2 = await prisma.masterclass.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      icon: '🌍',
      title: 'Export International',
      description: 'Maîtrisez les stratégies d\'exportation vers les marchés mondiaux',
      features: JSON.stringify([
        'Analyse de marché',
        'Documentation export',
        'Logistique internationale'
      ]),
      cta: 'Découvrir',
      backgroundColor: 'from-blue-50 to-cyan-50'
    }
  })

  console.log('Created masterclasses:', masterclass1.title, masterclass2.title)

  // Create sample seminar
  const seminar = await prisma.seminar.upsert({
    where: { slug: 'transformation-unit' },
    update: {},
    create: {
      slug: 'transformation-unit',
      duration: '2 jours',
      participants: '12-15 participants',
      title: 'Créer une unité de transformation compétitive',
      subtitle: 'Du concept à la mise en œuvre',
      description: 'Apprenez à concevoir, dimensionner et lancer votre unité de transformation pour maximiser la valeur ajoutée de vos produits.',
      image: '/images/seminaires/transformation-unit.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=example',
      nextSession: '15-16 Mars 2025',
      location: 'Paris, France',
      program: JSON.stringify([
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
      ])
    }
  })

  console.log('Created seminar:', seminar.title)

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

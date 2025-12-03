import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedEvents() {
  try {
    console.log('🌱 Seeding events...')

    // Delete existing events
    await prisma.event.deleteMany({})
    console.log('✅ Cleared existing events')

    // Create demo events
    const events = [
      {
        titleFr: "Journée Prévention Santé",
        titleEn: "Health Prevention Day",
        date: "Samedi 14 décembre 2025",
        eventDate: new Date('2025-12-14'),
        type: "Atelier communautaire",
        locationFr: "Centre Médical Dr Kamga – Douala",
        locationEn: "Dr Kamga Medical Center – Douala",
        descriptionFr: "Rencontres, dépistages et ateliers pratiques autour de la prévention et du suivi médical au quotidien. Rejoignez-nous pour une journée dédiée à votre santé et celle de votre famille.",
        descriptionEn: "Meetings, screenings and practical workshops on prevention and daily medical monitoring. Join us for a day dedicated to your health and that of your family.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
        socialMediaLink: "https://facebook.com/events/123456",
        socialMediaPlatform: "Facebook Event",
        status: "active",
        order: 0
      },
      {
        titleFr: "Lives Instagram : Santé & Bien-être",
        titleEn: "Instagram Lives: Health & Wellness",
        date: "Tous les mercredis 20h",
        eventDate: new Date('2025-12-10'), // Événement récurrent, date de référence
        type: "Évènement en ligne",
        locationFr: "Instagram @dr_kamga",
        locationEn: "Instagram @dr_kamga",
        descriptionFr: "Sessions interactives pour répondre aux questions les plus fréquentes et démystifier certains sujets de santé. Posez vos questions en direct et obtenez des réponses d'expert.",
        descriptionEn: "Interactive sessions to answer the most frequently asked questions and demystify certain health topics. Ask your questions live and get expert answers.",
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        socialMediaLink: "https://instagram.com/dr_kamga",
        socialMediaPlatform: "Instagram",
        status: "active",
        order: 1
      },
      {
        titleFr: "Rencontre avec la Communauté",
        titleEn: "Community Meetup",
        date: "Fin janvier 2026",
        eventDate: new Date('2026-01-31'),
        type: "Rencontre sociale",
        locationFr: "À confirmer – Douala",
        locationEn: "To be confirmed – Douala",
        descriptionFr: "Un moment d'échange convivial avec la communauté pour partager, poser des questions et créer du lien. Une occasion unique de rencontrer Dr Kamga et d'autres membres de la communauté.",
        descriptionEn: "A friendly time to exchange with the community to share, ask questions and create connections. A unique opportunity to meet Dr Kamga and other community members.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
        socialMediaLink: "https://facebook.com/dr.kamga",
        socialMediaPlatform: "Facebook",
        status: "active",
        order: 2
      },
      {
        titleFr: "Atelier Nutrition - Session Passée",
        titleEn: "Nutrition Workshop - Past Session",
        date: "Lundi 1er janvier 2024",
        eventDate: new Date('2024-01-01'), // Date passée pour tester
        type: "Atelier communautaire",
        locationFr: "Centre Médical Dr Kamga – Douala",
        locationEn: "Dr Kamga Medical Center – Douala",
        descriptionFr: "Session passée sur la nutrition et l'alimentation saine. Cet événement devrait apparaître comme expiré.",
        descriptionEn: "Past session on nutrition and healthy eating. This event should appear as outdated.",
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop",
        socialMediaLink: "https://facebook.com/events/789",
        socialMediaPlatform: "Facebook Event",
        status: "active", // Actif mais date passée
        order: 3
      }
    ]

    for (const event of events) {
      const created = await prisma.event.create({
        data: event
      })
      console.log(`✅ Created event: ${created.titleFr}`)
    }

    console.log('🎉 Events seeded successfully!')

  } catch (error) {
    console.error('❌ Error seeding events:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedEvents()

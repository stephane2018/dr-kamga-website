import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testEventCreation() {
  try {
    console.log('Testing Event model...')

    // Create a test event
    const event = await prisma.event.create({
      data: {
        titleFr: "Test Event",
        titleEn: "Test Event",
        date: "2025-12-15",
        type: "Atelier communautaire",
        locationFr: "Douala",
        locationEn: "Douala",
        descriptionFr: "Test description",
        descriptionEn: "Test description",
        imageUrl: "https://example.com/image.jpg",
        order: 0
      }
    })

    console.log('✅ Event created successfully:', event)

    // Clean up - delete the test event
    await prisma.event.delete({
      where: { id: event.id }
    })

    console.log('✅ Test event deleted')
    console.log('✅ Event model is working correctly!')

  } catch (error) {
    console.error('❌ Error testing Event model:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testEventCreation()

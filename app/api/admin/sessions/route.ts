import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// GET - Liste toutes les sessions
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const seminarId = searchParams.get("seminarId")
    const status = searchParams.get("status")

    const where: any = {}

    if (seminarId) {
      where.seminarId = seminarId
    }

    if (status) {
      where.status = status
    }

    const sessions = await prisma.session.findMany({
      where,
      include: {
        seminar: {
          select: {
            id: true,
            title: true,
            slug: true,
            duration: true,
          }
        },
        registrations: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            status: true,
            paymentStatus: true,
          }
        },
        createdBy: {
          select: {
            id: true,
            username: true,
          }
        }
      },
      orderBy: { startDate: "desc" }
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error("Error fetching sessions:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des sessions" },
      { status: 500 }
    )
  }
}

// POST - Crée une nouvelle session
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      seminarId,
      startDate,
      endDate,
      location,
      maxParticipants,
      price,
      currency,
      status: sessionStatus,
      isPublished,
      notes
    } = body

    // Validation
    if (!seminarId || !startDate || !endDate || !location || !maxParticipants) {
      return NextResponse.json(
        { error: "Tous les champs requis doivent être remplis" },
        { status: 400 }
      )
    }

    // Vérifier que le séminaire existe
    const seminar = await prisma.seminar.findUnique({
      where: { id: seminarId }
    })

    if (!seminar) {
      return NextResponse.json(
        { error: "Séminaire introuvable" },
        { status: 404 }
      )
    }

    const newSession = await prisma.session.create({
      data: {
        seminarId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        maxParticipants: parseInt(maxParticipants),
        price: price ? parseFloat(price) : null,
        currency: currency || "EUR",
        status: sessionStatus || "SCHEDULED",
        isPublished: isPublished || false,
        notes,
        createdById: session.user.id,
      },
      include: {
        seminar: true,
        registrations: true
      }
    })

    return NextResponse.json(newSession, { status: 201 })
  } catch (error) {
    console.error("Error creating session:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création de la session" },
      { status: 500 }
    )
  }
}

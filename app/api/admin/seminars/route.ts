import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// GET - Liste tous les séminaires
export async function GET() {
  try {
    const seminars = await prisma.seminar.findMany({
      include: {
        program: {
          orderBy: { order: "asc" }
        },
        sessions: {
          orderBy: { startDate: "asc" },
          where: {
            isPublished: true,
            status: { not: "CANCELLED" }
          }
        },
        createdBy: {
          select: {
            id: true,
            username: true,
          }
        }
      },
      orderBy: { displayOrder: "asc" }
    })

    return NextResponse.json(seminars)
  } catch (error) {
    console.error("Error fetching seminars:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des séminaires" },
      { status: 500 }
    )
  }
}

// POST - Crée un nouveau séminaire
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
      slug,
      duration,
      participants,
      title,
      subtitle,
      description,
      image,
      videoUrl,
      nextSession,
      location,
      programDays,
      displayOrder,
      isActive
    } = body

    // Validation
    if (!slug || !duration || !participants || !title || !subtitle || !description || !location) {
      return NextResponse.json(
        { error: "Tous les champs requis doivent être remplis" },
        { status: 400 }
      )
    }

    // Vérifier si le slug existe déjà
    const existingSeminar = await prisma.seminar.findUnique({
      where: { slug }
    })

    if (existingSeminar) {
      return NextResponse.json(
        { error: "Ce slug est déjà utilisé" },
        { status: 400 }
      )
    }

    const seminar = await prisma.seminar.create({
      data: {
        slug,
        duration,
        participants,
        title,
        subtitle,
        description,
        image,
        videoUrl,
        nextSession,
        location,
        displayOrder: displayOrder || 0,
        isActive: isActive !== undefined ? isActive : true,
        createdById: session.user.id,
        program: {
          create: programDays?.map((day: any, index: number) => ({
            day: day.day,
            title: day.title,
            items: Array.isArray(day.items)
              ? day.items
              : day.items.split('\n').filter((item: string) => item.trim()),
            order: index
          })) || []
        }
      },
      include: {
        program: {
          orderBy: { order: "asc" }
        }
      }
    })

    return NextResponse.json(seminar, { status: 201 })
  } catch (error) {
    console.error("Error creating seminar:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création du séminaire" },
      { status: 500 }
    )
  }
}

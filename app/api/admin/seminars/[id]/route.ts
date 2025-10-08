import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// GET - Récupère un séminaire par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const seminar = await prisma.seminar.findUnique({
      where: { id },
      include: {
        program: {
          orderBy: { order: "asc" }
        },
        sessions: {
          orderBy: { startDate: "asc" },
          include: {
            registrations: true
          }
        },
        createdBy: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    })

    if (!seminar) {
      return NextResponse.json(
        { error: "Séminaire introuvable" },
        { status: 404 }
      )
    }

    return NextResponse.json(seminar)
  } catch (error) {
    console.error("Error fetching seminar:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération du séminaire" },
      { status: 500 }
    )
  }
}

// PUT - Met à jour un séminaire
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const { id } = await params
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

    // Vérifier si le slug existe déjà pour un autre séminaire
    if (slug) {
      const existingSeminar = await prisma.seminar.findFirst({
        where: {
          slug,
          id: { not: id }
        }
      })

      if (existingSeminar) {
        return NextResponse.json(
          { error: "Ce slug est déjà utilisé" },
          { status: 400 }
        )
      }
    }

    // Supprimer les programmes existants si de nouveaux sont fournis
    if (programDays) {
      await prisma.seminarProgram.deleteMany({
        where: { seminarId: id }
      })
    }

    const seminar = await prisma.seminar.update({
      where: { id },
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
        displayOrder,
        isActive,
        ...(programDays && {
          program: {
            create: programDays.map((day: any, index: number) => ({
              day: day.day,
              title: day.title,
              items: Array.isArray(day.items)
                ? day.items
                : day.items.split('\n').filter((item: string) => item.trim()),
              order: index
            }))
          }
        })
      },
      include: {
        program: {
          orderBy: { order: "asc" }
        },
        sessions: true
      }
    })

    return NextResponse.json(seminar)
  } catch (error) {
    console.error("Error updating seminar:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du séminaire" },
      { status: 500 }
    )
  }
}

// DELETE - Supprime un séminaire
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const { id } = await params

    // Vérifier s'il y a des sessions actives
    const activeSessions = await prisma.session.findFirst({
      where: {
        seminarId: id,
        status: { in: ["SCHEDULED", "CONFIRMED", "IN_PROGRESS"] }
      }
    })

    if (activeSessions) {
      return NextResponse.json(
        { error: "Impossible de supprimer un séminaire avec des sessions actives" },
        { status: 400 }
      )
    }

    await prisma.seminar.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting seminar:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression du séminaire" },
      { status: 500 }
    )
  }
}

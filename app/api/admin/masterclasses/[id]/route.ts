import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// GET - Récupère une masterclass par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const masterclass = await prisma.masterclass.findUnique({
      where: { id },
      include: {
        videos: {
          orderBy: { displayOrder: "asc" }
        },
        createdBy: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    })

    if (!masterclass) {
      return NextResponse.json(
        { error: "Masterclass introuvable" },
        { status: 404 }
      )
    }

    return NextResponse.json(masterclass)
  } catch (error) {
    console.error("Error fetching masterclass:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la masterclass" },
      { status: 500 }
    )
  }
}

// PUT - Met à jour une masterclass
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
      icon,
      title,
      description,
      features,
      cta,
      backgroundColor,
      displayOrder,
      isActive,
      showVideosOnHome
    } = body

    const masterclass = await prisma.masterclass.update({
      where: { id },
      data: {
        icon,
        title,
        description,
        features: Array.isArray(features) ? features : features.split('\n').filter((f: string) => f.trim()),
        cta,
        backgroundColor,
        displayOrder,
        isActive,
        showVideosOnHome,
      },
      include: {
        videos: true
      }
    })

    return NextResponse.json(masterclass)
  } catch (error) {
    console.error("Error updating masterclass:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la masterclass" },
      { status: 500 }
    )
  }
}

// DELETE - Supprime une masterclass
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

    await prisma.masterclass.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting masterclass:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la masterclass" },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// GET - Liste toutes les masterclasses
export async function GET() {
  try {
    const masterclasses = await prisma.masterclass.findMany({
      include: {
        videos: {
          orderBy: { displayOrder: "asc" },
          where: { isActive: true }
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

    return NextResponse.json(masterclasses)
  } catch (error) {
    console.error("Error fetching masterclasses:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des masterclasses" },
      { status: 500 }
    )
  }
}

// POST - Crée une nouvelle masterclass
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

    // Validation
    if (!icon || !title || !description || !features || !cta || !backgroundColor) {
      return NextResponse.json(
        { error: "Tous les champs requis doivent être remplis" },
        { status: 400 }
      )
    }

    const masterclass = await prisma.masterclass.create({
      data: {
        icon,
        title,
        description,
        features: Array.isArray(features) ? features : features.split('\n').filter((f: string) => f.trim()),
        cta,
        backgroundColor,
        displayOrder: displayOrder || 0,
        isActive: isActive !== undefined ? isActive : true,
        showVideosOnHome: showVideosOnHome || false,
        createdById: session.user.id,
      },
      include: {
        videos: true
      }
    })

    return NextResponse.json(masterclass, { status: 201 })
  } catch (error) {
    console.error("Error creating masterclass:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création de la masterclass" },
      { status: 500 }
    )
  }
}

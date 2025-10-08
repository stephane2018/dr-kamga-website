import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// GET - Liste les vidéos d'une masterclass
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const videos = await prisma.masterclassVideo.findMany({
      where: { masterclassId: id },
      orderBy: { displayOrder: "asc" }
    })

    return NextResponse.json(videos)
  } catch (error) {
    console.error("Error fetching videos:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des vidéos" },
      { status: 500 }
    )
  }
}

// POST - Ajoute une vidéo à une masterclass
export async function POST(
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

    const { id: masterclassId } = await params
    const body = await request.json()
    const { title, description, videoUrl, thumbnailUrl, duration, displayOrder, isActive } = body

    if (!title || !videoUrl) {
      return NextResponse.json(
        { error: "Le titre et l'URL de la vidéo sont requis" },
        { status: 400 }
      )
    }

    const video = await prisma.masterclassVideo.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        duration,
        displayOrder: displayOrder || 0,
        isActive: isActive !== undefined ? isActive : true,
        masterclassId,
      }
    })

    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error("Error creating video:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création de la vidéo" },
      { status: 500 }
    )
  }
}

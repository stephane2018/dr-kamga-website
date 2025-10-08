import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// PUT - Met à jour une vidéo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; videoId: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const { videoId } = await params
    const body = await request.json()
    const { title, description, videoUrl, thumbnailUrl, duration, displayOrder, isActive } = body

    const video = await prisma.masterclassVideo.update({
      where: { id: videoId },
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        duration,
        displayOrder,
        isActive,
      }
    })

    return NextResponse.json(video)
  } catch (error) {
    console.error("Error updating video:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la vidéo" },
      { status: 500 }
    )
  }
}

// DELETE - Supprime une vidéo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; videoId: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const { videoId } = await params

    await prisma.masterclassVideo.delete({
      where: { id: videoId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting video:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la vidéo" },
      { status: 500 }
    )
  }
}

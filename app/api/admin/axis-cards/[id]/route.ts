import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Parse features if it's provided and is a string
    let features = body.features
    if (features) {
      if (typeof features === 'string') {
        try {
          features = JSON.parse(features)
        } catch {
          return NextResponse.json(
            { success: false, error: "Invalid features format" },
            { status: 400 }
          )
        }
      }
    }

    const updateData: any = {}

    if (body.axisKey) updateData.axisKey = body.axisKey.trim()
    if (body.icon) updateData.icon = body.icon.trim()
    if (body.iconColor) updateData.iconColor = body.iconColor.trim()
    if (body.titleFr) updateData.titleFr = body.titleFr.trim()
    if (body.titleEn) updateData.titleEn = body.titleEn.trim()
    if (body.descriptionFr) updateData.descriptionFr = body.descriptionFr.trim()
    if (body.descriptionEn) updateData.descriptionEn = body.descriptionEn.trim()
    if (body.contentFr) updateData.contentFr = body.contentFr.trim()
    if (body.contentEn) updateData.contentEn = body.contentEn.trim()
    if (features) updateData.features = JSON.stringify(features)
    if (body.duration) updateData.duration = body.duration.trim()
    if (body.maxParticipants !== undefined) updateData.maxParticipants = parseInt(body.maxParticipants)
    if (body.order !== undefined) updateData.order = body.order
    if (body.isActive !== undefined) updateData.isActive = body.isActive
    if (body.isVisibleOnHome !== undefined) updateData.isVisibleOnHome = body.isVisibleOnHome

    const updatedAxisCard = await prisma.axisCard.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: {
        ...updatedAxisCard,
        features: JSON.parse(updatedAxisCard.features),
      },
    })
  } catch (error) {
    console.error("Error updating axis card:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour de la carte" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    await prisma.axisCard.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Error deleting axis card:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la suppression de la carte" },
      { status: 500 }
    )
  }
}

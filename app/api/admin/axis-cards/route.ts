import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const axisCards = await prisma.axisCard.findMany({
      orderBy: {
        order: "asc",
      },
    })

    return NextResponse.json({
      success: true,
      data: axisCards,
    })
  } catch (error) {
    console.error("Error fetching axis cards:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des cartes" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    // Parse features if it's a string
    let features = body.features
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

    const axisCard = await prisma.axisCard.create({
      data: {
        axisKey: body.axisKey.trim(),
        icon: body.icon.trim(),
        iconColor: body.iconColor.trim(),
        titleFr: body.titleFr.trim(),
        titleEn: body.titleEn.trim(),
        descriptionFr: body.descriptionFr.trim(),
        descriptionEn: body.descriptionEn.trim(),
        contentFr: body.contentFr.trim(),
        contentEn: body.contentEn.trim(),
        features: JSON.stringify(features),
        duration: body.duration.trim(),
        maxParticipants: parseInt(body.maxParticipants),
        order: body.order || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
        isVisibleOnHome: body.isVisibleOnHome !== undefined ? body.isVisibleOnHome : true,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        ...axisCard,
        features: JSON.parse(axisCard.features),
      },
    })
  } catch (error) {
    console.error("Error creating axis card:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la création de la carte" },
      { status: 500 }
    )
  }
}

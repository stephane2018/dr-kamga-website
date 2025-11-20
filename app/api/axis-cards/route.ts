import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const axisCards = await prisma.axisCard.findMany({
      where: {
        isActive: true,
        isVisibleOnHome: true,
      },
      orderBy: {
        order: "asc",
      },
    })

    const parsedAxisCards = axisCards.map(card => ({
      ...card,
      features: JSON.parse(card.features)
    }))

    return NextResponse.json({
      success: true,
      data: parsedAxisCards,
    })
  } catch (error) {
    console.error("Error fetching axis cards:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des cartes" },
      { status: 500 }
    )
  }
}

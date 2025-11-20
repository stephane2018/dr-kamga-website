import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const subscriptions = await prisma.newsletter.findMany({
      orderBy: {
        subscribedAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      subscriptions,
    })
  } catch (error) {
    console.error("Error fetching newsletter subscriptions:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des abonnements" },
      { status: 500 }
    )
  }
}

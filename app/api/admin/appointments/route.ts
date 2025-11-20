import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const appointments = await prisma.contactAppointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      appointments,
    })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des rendez-vous" },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { withAdminOrManagerAuth } from "@/lib/api-jwt-helper"

export async function GET(request: NextRequest) {
  try {
    // Check authentication (admin or manager)
    const auth = await withAdminOrManagerAuth(request)
    if (auth.error) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status }
      )
    }
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

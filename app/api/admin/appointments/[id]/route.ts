import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { notes, status } = body

    const updatedAppointment = await prisma.contactAppointment.update({
      where: { id: params.id },
      data: {
        notes,
        status,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      appointment: updatedAppointment,
    })
  } catch (error) {
    console.error("Error updating appointment:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour du rendez-vous" },
      { status: 500 }
    )
  }
}

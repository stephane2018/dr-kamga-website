import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { notes, status, readAt: bodyReadAt } = body

    // Get current appointment to check readAt status
    const currentAppointment = await prisma.contactAppointment.findUnique({
      where: { id: params.id },
    })

    let readAt = currentAppointment?.updatedAt

    // If client provides readAt (e.g. from optimistic update), use it if we don't have one
    if (bodyReadAt && !readAt) {
      readAt = new Date(bodyReadAt)
    }
    // Fallback logic: if status is read and still no readAt, set it to now
    else if (status === "read" && !readAt) {
      readAt = new Date()
    }

    const updatedAppointment = await prisma.contactAppointment.update({
      where: { id: params.id },
      data: {
        notes,
        status,
        readAt,
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

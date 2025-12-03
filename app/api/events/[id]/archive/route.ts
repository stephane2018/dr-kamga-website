import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// POST archive event
export async function POST(
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

    const { id } = params

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      )
    }

    // Archive the event
    const event = await prisma.event.update({
      where: { id },
      data: {
        status: "archived",
        isActive: false
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Event archived successfully",
        data: event
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error archiving event:", error)
    return NextResponse.json(
      { success: false, error: "Failed to archive event" },
      { status: 500 }
    )
  }
}

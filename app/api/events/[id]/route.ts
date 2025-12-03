import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// PUT update event
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

    // Validate required fields
    if (!body.titleFr || !body.titleEn || !body.date || !body.type ||
        !body.locationFr || !body.locationEn ||
        !body.descriptionFr || !body.descriptionEn || !body.imageUrl) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        titleFr: body.titleFr.trim(),
        titleEn: body.titleEn.trim(),
        date: body.date.trim(),
        type: body.type.trim(),
        locationFr: body.locationFr.trim(),
        locationEn: body.locationEn.trim(),
        descriptionFr: body.descriptionFr.trim(),
        descriptionEn: body.descriptionEn.trim(),
        imageUrl: body.imageUrl.trim(),
        socialMediaLink: body.socialMediaLink?.trim() || null,
        socialMediaPlatform: body.socialMediaPlatform?.trim() || null,
        isActive: body.isActive !== undefined ? body.isActive : existingEvent.isActive,
        order: body.order !== undefined ? body.order : existingEvent.order
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Event updated successfully",
        data: event
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating event:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update event" },
      { status: 500 }
    )
  }
}

// DELETE event
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

    await prisma.event.delete({
      where: { id }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Event deleted successfully"
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting event:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete event" },
      { status: 500 }
    )
  }
}

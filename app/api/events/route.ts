import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeAll = searchParams.get('includeAll') === 'true'

    // For public page: only active events with status 'active'
    // For admin: all events
    const where = includeAll
      ? {}
      : {
          isActive: true,
          status: 'active'
        }

    const events = await prisma.event.findMany({
      where,
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json({ success: true, data: events }, { status: 200 })
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}

// POST create new event
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

    // Validate required fields
    if (!body.titleFr || !body.titleEn || !body.date || !body.type ||
        !body.locationFr || !body.locationEn ||
        !body.descriptionFr || !body.descriptionEn || !body.imageUrl) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
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
        inscriptionLink: body.inscriptionLink?.trim() || null,
        isActive: body.isActive !== undefined ? body.isActive : true,
        order: body.order !== undefined ? body.order : 0
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        data: event
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create event" },
      { status: 500 }
    )
  }
}

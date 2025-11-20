import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET all seminars
export async function GET() {
  try {
    const seminars = await prisma.seminar.findMany({
      where: { isActive: true },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Parse program JSON string back to object {fr: [], en: []}
    const parsedSeminars = seminars.map(sem => ({
      ...sem,
      program: JSON.parse(sem.program)
    }))

    return NextResponse.json({ success: true, data: parsedSeminars }, { status: 200 })
  } catch (error) {
    console.error("Error fetching seminars:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch seminars" },
      { status: 500 }
    )
  }
}

// POST create new seminar
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

    // Validate required fields (multilingual)
    if (!body.slug || !body.duration || !body.participants ||
        !body.titleFr || !body.titleEn ||
        !body.subtitleFr || !body.subtitleEn ||
        !body.descriptionFr || !body.descriptionEn ||
        !body.nextSession || !body.location) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingSlug = await prisma.seminar.findUnique({
      where: { slug: body.slug }
    })

    if (existingSlug) {
      return NextResponse.json(
        { success: false, error: "A seminar with this slug already exists" },
        { status: 400 }
      )
    }

    // Parse program if it's a string
    let program = body.program
    if (typeof program === 'string') {
      try {
        program = JSON.parse(program)
      } catch {
        return NextResponse.json(
          { success: false, error: "Invalid program format" },
          { status: 400 }
        )
      }
    }

    // Ensure program has fr and en arrays
    if (!program.fr || !program.en) {
      return NextResponse.json(
        { success: false, error: "Program must have 'fr' and 'en' arrays" },
        { status: 400 }
      )
    }

    const seminar = await prisma.seminar.create({
      data: {
        slug: body.slug.trim().toLowerCase(),
        duration: body.duration.trim(),
        participants: body.participants.trim(),
        titleFr: body.titleFr.trim(),
        titleEn: body.titleEn.trim(),
        subtitleFr: body.subtitleFr.trim(),
        subtitleEn: body.subtitleEn.trim(),
        descriptionFr: body.descriptionFr.trim(),
        descriptionEn: body.descriptionEn.trim(),
        image: body.image?.trim() || null,
        videoUrl: body.videoUrl?.trim() || null,
        nextSession: body.nextSession.trim(),
        location: body.location.trim(),
        program: JSON.stringify(program),
        isActive: body.isActive !== undefined ? body.isActive : true,
        isVisibleOnHome: body.isVisibleOnHome !== undefined ? body.isVisibleOnHome : true
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Seminar created successfully",
        data: {
          ...seminar,
          program: JSON.parse(seminar.program)
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating seminar:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create seminar" },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET single seminar
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const seminar = await prisma.seminar.findUnique({
      where: { id: params.id }
    })

    if (!seminar) {
      return NextResponse.json(
        { success: false, error: "Seminar not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...seminar,
        program: JSON.parse(seminar.program)
      }
    }, { status: 200 })
  } catch (error) {
    console.error("Error fetching seminar:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch seminar" },
      { status: 500 }
    )
  }
}

// PUT update seminar
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

    // Check if seminar exists
    const existing = await prisma.seminar.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Seminar not found" },
        { status: 404 }
      )
    }

    // If slug is being changed, check for conflicts
    if (body.slug && body.slug !== existing.slug) {
      const slugConflict = await prisma.seminar.findUnique({
        where: { slug: body.slug }
      })

      if (slugConflict) {
        return NextResponse.json(
          { success: false, error: "A seminar with this slug already exists" },
          { status: 400 }
        )
      }
    }

    // Parse program if it's a string
    let program = body.program
    if (program) {
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
    }

    const seminar = await prisma.seminar.update({
      where: { id: params.id },
      data: {
        slug: body.slug?.trim().toLowerCase(),
        duration: body.duration?.trim(),
        participants: body.participants?.trim(),
        titleFr: body.titleFr?.trim(),
        titleEn: body.titleEn?.trim(),
        subtitleFr: body.subtitleFr?.trim(),
        subtitleEn: body.subtitleEn?.trim(),
        descriptionFr: body.descriptionFr?.trim(),
        descriptionEn: body.descriptionEn?.trim(),
        image: body.image?.trim() || null,
        videoUrl: body.videoUrl?.trim() || null,
        nextSession: body.nextSession?.trim(),
        location: body.location?.trim(),
        program: program ? JSON.stringify(program) : undefined,
        isActive: body.isActive,
        isVisibleOnHome: body.isVisibleOnHome !== undefined ? body.isVisibleOnHome : undefined
      }
    })

    return NextResponse.json({
      success: true,
      message: "Seminar updated successfully",
      data: {
        ...seminar,
        program: JSON.parse(seminar.program)
      }
    }, { status: 200 })
  } catch (error) {
    console.error("Error updating seminar:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update seminar" },
      { status: 500 }
    )
  }
}

// DELETE seminar
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

    // Check if seminar exists
    const existing = await prisma.seminar.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Seminar not found" },
        { status: 404 }
      )
    }

    await prisma.seminar.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: "Seminar deleted successfully"
    }, { status: 200 })
  } catch (error) {
    console.error("Error deleting seminar:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete seminar" },
      { status: 500 }
    )
  }
}

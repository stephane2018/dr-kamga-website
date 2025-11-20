import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET single masterclass
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const masterclass = await prisma.masterclass.findUnique({
      where: { id: params.id }
    })

    if (!masterclass) {
      return NextResponse.json(
        { success: false, error: "Masterclass not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...masterclass,
        features: JSON.parse(masterclass.features)
      }
    }, { status: 200 })
  } catch (error) {
    console.error("Error fetching masterclass:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch masterclass" },
      { status: 500 }
    )
  }
}

// PUT update masterclass
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

    // Check if masterclass exists
    const existing = await prisma.masterclass.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Masterclass not found" },
        { status: 404 }
      )
    }

    // Ensure features is an object with fr and en arrays
    let features = body.features
    if (features && typeof features === 'string') {
      try {
        features = JSON.parse(features)
      } catch {
        return NextResponse.json(
          { success: false, error: "Invalid features format" },
          { status: 400 }
        )
      }
    }

    const masterclass = await prisma.masterclass.update({
      where: { id: params.id },
      data: {
        icon: body.icon?.trim(),
        titleFr: body.titleFr?.trim(),
        titleEn: body.titleEn?.trim(),
        descriptionFr: body.descriptionFr?.trim(),
        descriptionEn: body.descriptionEn?.trim(),
        features: features ? JSON.stringify(features) : undefined,
        ctaFr: body.ctaFr?.trim(),
        ctaEn: body.ctaEn?.trim(),
        backgroundColor: body.backgroundColor?.trim(),
        type: body.type?.trim(),
        date: body.date?.trim(),
        time: body.time?.trim(),
        seats: body.seats?.trim(),
        isActive: body.isActive,
        isVisibleOnHome: body.isVisibleOnHome !== undefined ? body.isVisibleOnHome : undefined
      }
    })

    return NextResponse.json({
      success: true,
      message: "Masterclass updated successfully",
      data: {
        ...masterclass,
        features: JSON.parse(masterclass.features)
      }
    }, { status: 200 })
  } catch (error) {
    console.error("Error updating masterclass:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update masterclass" },
      { status: 500 }
    )
  }
}

// DELETE masterclass
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

    // Check if masterclass exists
    const existing = await prisma.masterclass.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Masterclass not found" },
        { status: 404 }
      )
    }

    await prisma.masterclass.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: "Masterclass deleted successfully"
    }, { status: 200 })
  } catch (error) {
    console.error("Error deleting masterclass:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete masterclass" },
      { status: 500 }
    )
  }
}

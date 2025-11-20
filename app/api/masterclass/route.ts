import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET all masterclasses
export async function GET() {
  try {
    const masterclasses = await prisma.masterclass.findMany({
      where: { isActive: true },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Parse features JSON string back to object {fr: [], en: []}
    const parsedMasterclasses = masterclasses.map(mc => ({
      ...mc,
      features: JSON.parse(mc.features)
    }))

    return NextResponse.json({ success: true, data: parsedMasterclasses }, { status: 200 })
  } catch (error) {
    console.error("Error fetching masterclasses:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch masterclasses" },
      { status: 500 }
    )
  }
}

// POST create new masterclass
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
    if (!body.icon || !body.titleFr || !body.titleEn || !body.descriptionFr || !body.descriptionEn ||
      !body.ctaFr || !body.ctaEn || !body.type || !body.date ||
      !body.time || !body.seats) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Ensure features is an object with fr and en arrays
    let features = body.features
    if (typeof features === 'string') {
      try {
        features = JSON.parse(features)
      } catch {
        return NextResponse.json(
          { success: false, error: "Invalid features format" },
          { status: 400 }
        )
      }
    }

    if (!features.fr || !features.en) {
      return NextResponse.json(
        { success: false, error: "Features must have 'fr' and 'en' arrays" },
        { status: 400 }
      )
    }

    const masterclass = await prisma.masterclass.create({
      data: {
        icon: body.icon.trim(),
        titleFr: body.titleFr.trim(),
        titleEn: body.titleEn.trim(),
        descriptionFr: body.descriptionFr.trim(),
        descriptionEn: body.descriptionEn.trim(),
        features: JSON.stringify(features),
        ctaFr: body.ctaFr.trim(),
        ctaEn: body.ctaEn.trim(),
        type: body.type.trim(),
        date: body.date.trim(),
        time: body.time.trim(),
        seats: body.seats.trim(),
        isActive: body.isActive !== undefined ? body.isActive : true,
        isVisibleOnHome: body.isVisibleOnHome !== undefined ? body.isVisibleOnHome : true
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Masterclass created successfully",
        data: {
          ...masterclass,
          features: JSON.parse(masterclass.features)
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating masterclass:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create masterclass" },
      { status: 500 }
    )
  }
}

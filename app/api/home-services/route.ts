import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET all home services
export async function GET() {
  try {
    const services = await prisma.homeService.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    // Parse features JSON
    const parsedServices = services.map(service => ({
      ...service,
      features: JSON.parse(service.features)
    }))

    return NextResponse.json({ success: true, data: parsedServices }, { status: 200 })
  } catch (error) {
    console.error("Error fetching home services:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch home services" },
      { status: 500 }
    )
  }
}

// POST create new home service
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    const service = await prisma.homeService.create({
      data: {
        slug: body.slug,
        icon: body.icon,
        categoryFr: body.categoryFr,
        categoryEn: body.categoryEn,
        titleFr: body.titleFr,
        titleEn: body.titleEn,
        subtitleFr: body.subtitleFr,
        subtitleEn: body.subtitleEn,
        descriptionFr: body.descriptionFr,
        descriptionEn: body.descriptionEn,
        features: JSON.stringify(body.features),
        ctaTextFr: body.ctaTextFr,
        ctaTextEn: body.ctaTextEn,
        ctaLink: body.ctaLink,
        gradientPosition: body.gradientPosition,
        order: body.order || 0,
        isActive: body.isActive !== undefined ? body.isActive : true
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Home service created successfully",
        data: {
          ...service,
          features: JSON.parse(service.features)
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating home service:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create home service" },
      { status: 500 }
    )
  }
}

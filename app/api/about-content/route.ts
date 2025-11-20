import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET about content
export async function GET() {
  try {
    const content = await prisma.aboutContent.findFirst({
      where: { isActive: true }
    })

    if (!content) {
      return NextResponse.json(
        { success: false, error: "About content not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...content,
        credentials: JSON.parse(content.credentials)
      }
    }, { status: 200 })
  } catch (error) {
    console.error("Error fetching about content:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch about content" },
      { status: 500 }
    )
  }
}

// PUT update about content
export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    const existing = await prisma.aboutContent.findFirst({
      where: { isActive: true }
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "About content not found" },
        { status: 404 }
      )
    }

    const content = await prisma.aboutContent.update({
      where: { id: existing.id },
      data: {
        badgeFr: body.badgeFr,
        badgeEn: body.badgeEn,
        titleFr: body.titleFr,
        titleEn: body.titleEn,
        descriptionFr: body.descriptionFr,
        descriptionEn: body.descriptionEn,
        credentials: JSON.stringify(body.credentials),
        imageUrl: body.imageUrl
      }
    })

    return NextResponse.json({
      success: true,
      message: "About content updated successfully",
      data: {
        ...content,
        credentials: JSON.parse(content.credentials)
      }
    }, { status: 200 })
  } catch (error) {
    console.error("Error updating about content:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update about content" },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication and admin role
    const session = await auth()
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }
    const body = await request.json()
    const { name, email, password, isActive, role } = body

    const updateData: any = {}

    if (name) updateData.name = name
    if (email) updateData.email = email
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }
    if (isActive !== undefined) updateData.isActive = isActive
    if (role) updateData.role = role

    const user = await prisma.admin.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour de l'utilisateur" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication and admin role
    const session = await auth()
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }
    await prisma.admin.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la suppression de l'utilisateur" },
      { status: 500 }
    )
  }
}

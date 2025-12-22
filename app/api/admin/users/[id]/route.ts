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

    // Get current user to check role
    const currentUser = await prisma.admin.findUnique({
      where: { id: params.id },
      select: { role: true, isActive: true }
    })

    // Prevent blocking the last active admin
    if (currentUser?.role === "admin" && isActive === false && currentUser.isActive) {
      const activeAdmins = await prisma.admin.count({
        where: {
          role: "admin",
          isActive: true,
          id: { not: params.id }
        }
      })

      if (activeAdmins === 0) {
        return NextResponse.json(
          { success: false, error: "Impossible de bloquer le dernier administrateur actif. Créez d'abord un nouvel administrateur." },
          { status: 400 }
        )
      }
    }

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

    // Check if user is an admin
    const user = await prisma.admin.findUnique({
      where: { id: params.id },
      select: { role: true }
    })

    if (user?.role === "admin") {
      return NextResponse.json(
        { success: false, error: "Les comptes administrateurs ne peuvent pas être supprimés pour des raisons de sécurité. Vous pouvez uniquement les bloquer." },
        { status: 403 }
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

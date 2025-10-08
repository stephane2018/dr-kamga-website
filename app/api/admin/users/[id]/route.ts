import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth/password"

// GET - Récupère un admin par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const { id } = await params

    const admin = await prisma.admin.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        createdBy: true,
        creator: {
          select: {
            id: true,
            username: true,
          }
        },
        _count: {
          select: {
            subAdmins: true,
            masterclasses: true,
            seminars: true,
            sessions: true,
          }
        }
      }
    })

    if (!admin) {
      return NextResponse.json(
        { error: "Administrateur introuvable" },
        { status: 404 }
      )
    }

    return NextResponse.json(admin)
  } catch (error) {
    console.error("Error fetching admin:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'administrateur" },
      { status: 500 }
    )
  }
}

// PUT - Met à jour un admin
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { username, email, password, role, isActive } = body

    // Récupérer l'admin actuel pour vérifier son rôle
    const currentAdmin = await prisma.admin.findUnique({
      where: { id: session.user.id }
    })

    // Vérifier les permissions
    if (id !== session.user.id && currentAdmin?.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Accès refusé - vous ne pouvez modifier que votre propre compte" },
        { status: 403 }
      )
    }

    // Empêcher les SUB_ADMIN de changer leur rôle
    if (id === session.user.id && role && currentAdmin?.role === "SUB_ADMIN") {
      return NextResponse.json(
        { error: "Vous ne pouvez pas modifier votre propre rôle" },
        { status: 403 }
      )
    }

    // Vérifier si le username existe déjà
    if (username) {
      const existingAdmin = await prisma.admin.findFirst({
        where: {
          username,
          id: { not: id }
        }
      })

      if (existingAdmin) {
        return NextResponse.json(
          { error: "Ce nom d'utilisateur est déjà utilisé" },
          { status: 400 }
        )
      }
    }

    // Vérifier si l'email existe déjà
    if (email) {
      const existingEmail = await prisma.admin.findFirst({
        where: {
          email,
          id: { not: id }
        }
      })

      if (existingEmail) {
        return NextResponse.json(
          { error: "Cet email est déjà utilisé" },
          { status: 400 }
        )
      }
    }

    const updateData: any = {}

    if (username) updateData.username = username
    if (email !== undefined) updateData.email = email || null
    if (role && currentAdmin?.role === "SUPER_ADMIN") updateData.role = role
    if (isActive !== undefined && currentAdmin?.role === "SUPER_ADMIN") updateData.isActive = isActive

    // Hacher le nouveau mot de passe si fourni
    if (password) {
      if (password.length < 8) {
        return NextResponse.json(
          { error: "Le mot de passe doit contenir au moins 8 caractères" },
          { status: 400 }
        )
      }
      updateData.password = await hashPassword(password)
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    return NextResponse.json(updatedAdmin)
  } catch (error) {
    console.error("Error updating admin:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'administrateur" },
      { status: 500 }
    )
  }
}

// DELETE - Supprime un admin
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const { id } = await params

    // Récupérer l'admin actuel pour vérifier son rôle
    const currentAdmin = await prisma.admin.findUnique({
      where: { id: session.user.id }
    })

    if (!currentAdmin || currentAdmin.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Accès refusé - réservé aux super administrateurs" },
        { status: 403 }
      )
    }

    // Empêcher de se supprimer soi-même
    if (id === session.user.id) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas supprimer votre propre compte" },
        { status: 400 }
      )
    }

    await prisma.admin.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting admin:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'administrateur" },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth/password"

// GET - Liste tous les admins (seulement pour SUPER_ADMIN)
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

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

    const admins = await prisma.admin.findMany({
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
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(admins)
  } catch (error) {
    console.error("Error fetching admins:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des administrateurs" },
      { status: 500 }
    )
  }
}

// POST - Crée un nouveau sous-admin (seulement pour SUPER_ADMIN)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

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

    const body = await request.json()
    const { username, email, password, role } = body

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { error: "Le nom d'utilisateur et le mot de passe sont requis" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      )
    }

    // Vérifier si le username existe déjà
    const existingAdmin = await prisma.admin.findUnique({
      where: { username }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Ce nom d'utilisateur est déjà utilisé" },
        { status: 400 }
      )
    }

    // Vérifier si l'email existe déjà (si fourni)
    if (email) {
      const existingEmail = await prisma.admin.findUnique({
        where: { email }
      })

      if (existingEmail) {
        return NextResponse.json(
          { error: "Cet email est déjà utilisé" },
          { status: 400 }
        )
      }
    }

    // Hacher le mot de passe
    const hashedPassword = await hashPassword(password)

    const newAdmin = await prisma.admin.create({
      data: {
        username,
        email: email || null,
        password: hashedPassword,
        role: role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "SUB_ADMIN",
        createdBy: session.user.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        creator: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    })

    return NextResponse.json(newAdmin, { status: 201 })
  } catch (error) {
    console.error("Error creating admin:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création de l'administrateur" },
      { status: 500 }
    )
  }
}

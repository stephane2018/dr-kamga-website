import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth, isAdmin } from "@/lib/jwt"
import bcrypt from "bcryptjs"
import { sendWelcomeEmail } from "@/lib/email/send-welcome-email"

export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin role
    const { user, error } = await requireAuth(request)
    if (error || !isAdmin(user)) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized" },
        { status: error === "No token provided" ? 401 : 403 }
      )
    }

    const users = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdBy: true,
        createdAt: true,
        updatedAt: true,
        // Don't include password in response
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      data: users,
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des utilisateurs" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const { user: authUser, error } = await requireAuth(request)
    if (error || !isAdmin(authUser)) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized" },
        { status: error === "No token provided" ? 401 : 403 }
      )
    }

    const body = await request.json()
    const { email, name, password, role, sendEmail, createdBy } = body

    // Validation
    if (!email || !name || !password || !role) {
      return NextResponse.json(
        { success: false, error: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.admin.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Un utilisateur avec cet email existe déjà" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.admin.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        createdBy,
        isActive: true,
      },
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

    // Send welcome email if requested
    if (sendEmail) {
      try {
        await sendWelcomeEmail({
          email,
          name,
          password,
          role,
        })
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    )
  }
}

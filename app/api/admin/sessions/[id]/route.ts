import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// GET - Récupère une session par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        seminar: true,
        registrations: {
          orderBy: { createdAt: "desc" }
        },
        createdBy: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    })

    if (!session) {
      return NextResponse.json(
        { error: "Session introuvable" },
        { status: 404 }
      )
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error("Error fetching session:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la session" },
      { status: 500 }
    )
  }
}

// PUT - Met à jour une session
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authSession = await auth()

    if (!authSession?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const {
      startDate,
      endDate,
      location,
      maxParticipants,
      price,
      currency,
      status,
      isPublished,
      notes
    } = body

    const session = await prisma.session.update({
      where: { id },
      data: {
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(location && { location }),
        ...(maxParticipants && { maxParticipants: parseInt(maxParticipants) }),
        ...(price !== undefined && { price: price ? parseFloat(price) : null }),
        ...(currency && { currency }),
        ...(status && { status }),
        ...(isPublished !== undefined && { isPublished }),
        ...(notes !== undefined && { notes }),
      },
      include: {
        seminar: true,
        registrations: true
      }
    })

    return NextResponse.json(session)
  } catch (error) {
    console.error("Error updating session:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la session" },
      { status: 500 }
    )
  }
}

// DELETE - Supprime une session
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authSession = await auth()

    if (!authSession?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const { id } = await params

    // Vérifier s'il y a des inscriptions confirmées
    const confirmedRegistrations = await prisma.registration.findFirst({
      where: {
        sessionId: id,
        status: { in: ["CONFIRMED", "ATTENDED"] }
      }
    })

    if (confirmedRegistrations) {
      return NextResponse.json(
        { error: "Impossible de supprimer une session avec des inscriptions confirmées" },
        { status: 400 }
      )
    }

    await prisma.session.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting session:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la session" },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from "next/server"
import { sendUnsubscribeNotification, UnsubscribeData } from "@/lib/email/send-unsubscribe-email"

/**
 * API Route pour gérer les désinscriptions
 *
 * POST /api/unsubscribe
 */
export async function POST(request: NextRequest) {
  try {
    // Récupérer les données du formulaire
    const body = await request.json()

    // Validation de l'email
    if (!body.email || body.email.trim() === "") {
      return NextResponse.json(
        { success: false, error: "L'adresse email est requise" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "L'adresse email n'est pas valide" },
        { status: 400 }
      )
    }

    // Préparer les données pour l'envoi
    const unsubscribeData: UnsubscribeData = {
      email: body.email.trim().toLowerCase(),
    }

    // Envoyer l'email de notification à l'équipe
    const result = await sendUnsubscribeNotification(unsubscribeData)

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: "Votre demande de désinscription a été prise en compte.",
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { success: false, error: result.error || "Erreur lors de la désinscription" },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("Erreur dans l'API /api/unsubscribe:", error)
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors du traitement de votre demande" },
      { status: 500 }
    )
  }
}

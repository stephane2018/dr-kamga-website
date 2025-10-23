import { NextRequest, NextResponse } from "next/server"
import { sendCoachingDiagnosticEmails, CoachingDiagnosticData } from "@/lib/email/send-coaching-diagnostic-email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation du nom
    if (!body.name || body.name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Le nom est requis" },
        { status: 400 }
      )
    }

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

    // Validation du téléphone
    if (!body.phone || body.phone.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Le numéro de téléphone est requis" },
        { status: 400 }
      )
    }

    const diagnosticData: CoachingDiagnosticData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      language: body.language || 'fr',
    }

    const result = await sendCoachingDiagnosticEmails(diagnosticData)

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: "Votre demande d'appel diagnostic a été envoyée. Vérifiez votre boîte email.",
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { success: false, error: result.error || "Erreur lors de l'envoi de la demande" },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("Erreur dans l'API /api/coaching-diagnostic:", error)
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors du traitement de votre demande" },
      { status: 500 }
    )
  }
}

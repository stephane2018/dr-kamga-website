import { NextRequest, NextResponse } from "next/server"
import { sendContactEmail, ContactFormData } from "@/lib/email/send-contact-email"

/**
 * API Route pour gérer l'envoi du formulaire de contact
 *
 * POST /api/contact
 */
export async function POST(request: NextRequest) {
  try {
    // Récupérer les données du formulaire
    const body = await request.json()

    // Validation basique des champs requis
    const requiredFields = ["firstName", "lastName", "email", "phone", "interest", "message"]
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === "") {
        return NextResponse.json(
          { success: false, error: `Le champ ${field} est requis` },
          { status: 400 }
        )
      }
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "L'adresse email n'est pas valide" },
        { status: 400 }
      )
    }

    // Préparer les données pour l'envoi
    const formData: ContactFormData = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      interest: body.interest,
      situation: body.situation?.trim() || "",
      message: body.message.trim(),
    }

    // Envoyer l'email
    const result = await sendContactEmail(formData)

    if (result.success) {
      return NextResponse.json(
        { success: true, message: "Votre message a été envoyé avec succès. Nous vous répondrons sous 24h." },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { success: false, error: result.error || "Erreur lors de l'envoi du message" },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("Erreur dans l'API /api/contact:", error)
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors du traitement de votre demande" },
      { status: 500 }
    )
  }
}

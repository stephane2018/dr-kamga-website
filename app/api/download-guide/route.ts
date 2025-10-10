import { NextRequest, NextResponse } from "next/server"
import { sendGuideDownloadEmails, GuideDownloadData } from "@/lib/email/send-guide-download-email"

/**
 * API Route pour gérer le téléchargement du guide
 *
 * POST /api/download-guide
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
    const downloadData: GuideDownloadData = {
      email: body.email.trim().toLowerCase(),
    }

    // Envoyer les emails (à l'utilisateur et à l'équipe)
    const result = await sendGuideDownloadEmails(downloadData)

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: "Le guide va être téléchargé. Vérifiez également votre boîte email.",
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { success: false, error: result.error || "Erreur lors de l'envoi des emails" },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("Erreur dans l'API /api/download-guide:", error)
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors du traitement de votre demande" },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from "next/server"
import { sendContactEmail, ContactFormData } from "@/lib/email/send-contact-email"
import { sendContactConfirmationEmail } from "@/lib/email/send-contact-confirmation-email"
import { prisma } from "@/lib/prisma"

/**
 * API Route pour gérer l'envoi du formulaire de contact
 *
 * POST /api/contact
 */
export async function POST(request: NextRequest) {
  try {
    // Récupérer les données du formulaire
    const body = await request.json()

    // Déterminer la langue : utiliser celle du formulaire, sinon déterminer depuis Accept-Language header
    let detectedLanguage = body.language || 'fr'
    
    // Si pas de langue fournie, essayer de la détecter depuis Accept-Language header
    if (!body.language) {
      const acceptLanguage = request.headers.get('accept-language') || ''
      if (acceptLanguage.includes('en')) {
        detectedLanguage = 'en'
      } else if (acceptLanguage.includes('fr')) {
        detectedLanguage = 'fr'
      }
    }
    
    // Valider que la langue est supportée
    if (!['fr', 'en'].includes(detectedLanguage)) {
      detectedLanguage = 'fr'
    }
    
    console.log(`Contact form language detected: ${detectedLanguage} (from: ${body.language ? 'form' : 'Accept-Language header'})`)

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
      language: detectedLanguage as 'fr' | 'en', // Langue détectée
    }

    // Save appointment to database
    await prisma.contactAppointment.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        interest: formData.interest,
        situation: formData.situation,
        message: formData.message,
        language: formData.language,
        status: "pending",
      },
    })

    const result = await sendContactEmail(formData)

    if (result.success) {
      try {
        const confirmationResult = await sendContactConfirmationEmail({
          firstName: formData.firstName,
          email: formData.email,
          language: formData.language,
        })
        
        if (!confirmationResult.success) {
          console.error("Erreur lors de l'envoi de l'email de confirmation:", confirmationResult.error)
        }
      } catch (confirmationError) {
        console.error("Exception lors de l'envoi de l'email de confirmation:", confirmationError)
      }

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

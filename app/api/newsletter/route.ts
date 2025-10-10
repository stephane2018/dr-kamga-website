import { NextRequest, NextResponse } from "next/server"
import { sendNewsletterSubscriptionEmails, NewsletterSubscriptionData } from "@/lib/email/send-newsletter-subscription-email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

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

    const subscriptionData: NewsletterSubscriptionData = {
      email: body.email.trim().toLowerCase(),
    }

    const result = await sendNewsletterSubscriptionEmails(subscriptionData)

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: "Votre inscription à la newsletter est confirmée. Vérifiez votre boîte email.",
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { success: false, error: result.error || "Erreur lors de l'inscription" },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("Erreur dans l'API /api/newsletter:", error)
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors du traitement de votre demande" },
      { status: 500 }
    )
  }
}

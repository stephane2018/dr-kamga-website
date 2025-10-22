import { NextRequest, NextResponse } from "next/server"
import { sendWaitlistEmails, WaitlistData } from "@/lib/email/send-waitlist-email"

export async function POST(request: NextRequest) {
  try {
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

    // Validation du téléphone
    if (!body.phone || body.phone.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Le numéro de téléphone est requis" },
        { status: 400 }
      )
    }

    // Validation du titre de la masterclass
    if (!body.masterclassTitle || body.masterclassTitle.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Le titre de la masterclass est requis" },
        { status: 400 }
      )
    }

    const waitlistData: WaitlistData = {
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      expectations: body.expectations?.trim() || "",
      masterclassTitle: body.masterclassTitle.trim(),
      masterclassType: body.masterclassType?.trim() || undefined,
    }

    const result = await sendWaitlistEmails(waitlistData)

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: "Votre inscription à la liste d'attente est confirmée. Vérifiez votre boîte email.",
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
    console.error("Erreur dans l'API /api/waitlist:", error)
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors du traitement de votre demande" },
      { status: 500 }
    )
  }
}

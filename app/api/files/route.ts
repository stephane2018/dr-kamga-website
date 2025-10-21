import { NextRequest, NextResponse } from "next/server"

/**
 * API Route pour obtenir les URLs des fichiers
 *
 * GET /api/files?type=whitepaper
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const fileType = searchParams.get("type")

    if (!fileType) {
      return NextResponse.json(
        { success: false, error: "Le paramètre 'type' est requis" },
        { status: 400 }
      )
    }

    // Récupérer les URLs depuis les variables d'environnement
    const fileUrls: Record<string, string> = {
      whitepaper: process.env.WHITEPAPER_PDF_URL || "https://cabinetdab.com/site/LIVRE_BLANC.pdf",
    }

    if (!fileUrls[fileType]) {
      return NextResponse.json(
        { success: false, error: `Type de fichier '${fileType}' non trouvé` },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        url: fileUrls[fileType],
        type: fileType,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erreur dans l'API /api/files:", error)
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors de la récupération du fichier" },
      { status: 500 }
    )
  }
}

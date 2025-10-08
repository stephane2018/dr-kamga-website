import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Récupère les vidéos publiques pour la page masterclass
export async function GET() {
  try {
    // Récupérer toutes les vidéos actives
    const videos = await prisma.masterclassVideo.findMany({
      where: {
        isActive: true,
      },
      include: {
        masterclass: {
          select: {
            id: true,
            title: true,
            icon: true,
          }
        }
      },
      orderBy: {
        displayOrder: "asc"
      }
    })

    // Filtrer côté code pour gérer les cas où showOnHome n'existe pas encore
    const visibleVideos = videos.filter(video => {
      // @ts-ignore - Le champ peut ne pas exister pendant la migration
      return video.showOnHome === true || video.showOnHome === undefined
    })

    return NextResponse.json(visibleVideos)
  } catch (error) {
    console.error("Error fetching public videos:", error)
    // En cas d'erreur, retourner un tableau vide plutôt qu'une erreur
    // Le composant utilisera les données par défaut
    return NextResponse.json([])
  }
}

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Video } from "lucide-react"

interface MasterclassVideo {
  id: string
  title: string
  description: string | null
  videoUrl: string
  thumbnailUrl: string | null
  duration: string | null
  category: string | null
  displayOrder: number
  masterclass: {
    id: string
    title: string
    icon: string
  }
}

// Données par défaut si pas de vidéos en base
const defaultVideos = [
  {
    id: "default-1",
    title: "Les 3 règles pour produire selon les normes internationales",
    description: "Découvrez les standards essentiels pour préparer vos produits à l'exportation.",
    category: "Capsule",
    duration: "8 min",
    thumbnailUrl: null,
    videoUrl: "#",
  },
  {
    id: "default-2",
    title: "Comment transformer son produit et allonger sa durée de vie",
    description: "Techniques de transformation pour maximiser la valeur ajoutée de vos produits.",
    category: "Cours Long",
    duration: "45 min",
    thumbnailUrl: null,
    videoUrl: "#",
  },
  {
    id: "default-3",
    title: "Les étapes clés pour réussir son export",
    description: "Roadmap complète pour structurer votre démarche d'exportation.",
    category: "Capsule",
    duration: "12 min",
    thumbnailUrl: null,
    videoUrl: "#",
  }
]

export function VideosSection() {
  const [videos, setVideos] = useState<any[]>(defaultVideos)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/masterclass/videos')
      .then(res => res.json())
      .then(data => {
      
        if (data && data.length > 0) {
          setVideos(data)
        }
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching videos:", error)
        setLoading(false)
      })
  }, [])

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Vidéos Complémentaires</h2>
          <p className="text-xl text-muted-foreground">
            Découvrez nos vidéos pédagogiques pour approfondir vos connaissances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => {
            // Alterner les couleurs de gradient
            const gradientColors = [
              "from-primary/20 to-primary/5",
              "from-secondary/20 to-secondary/5",
              "from-accent/20 to-accent/5"
            ]
            const gradientClass = gradientColors[index % 3]

            return (
              <div
                key={video.id}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                {/* Thumbnail */}
                <div className={`aspect-video bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center group-hover:bg-white/60 transition-colors">
                      <Video className="h-8 w-8 text-gray-700 ml-1" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Duration */}
                  <div className="flex items-center justify-between mb-3">
                    {video.category && (
                      <Badge
                        variant={video.category === "Cours Long" ? "outline" : "secondary"}
                        className={video.category === "Capsule" ? "bg-[#5C3317] text-white hover:bg-[#5C3317]/90" : ""}
                      >
                        {video.category}
                      </Badge>
                    )}
                    {video.duration && (
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{video.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 min-h-[3.5rem]">
                    {video.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
                    {video.description || "Découvrez cette vidéo pour approfondir vos connaissances."}
                  </p>

                  {/* CTA */}
                  <Button
                    size="sm"
                    className="w-full bg-[#5C3317] hover:bg-[#5C3317]/90 text-white"
                    onClick={() => {
                      if (video.videoUrl && video.videoUrl !== "#") {
                        window.open(video.videoUrl, '_blank')
                      }
                    }}
                  >
                    Voir la vidéo
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

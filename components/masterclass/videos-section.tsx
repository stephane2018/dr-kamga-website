"use client"

import { useLanguage } from "@/locales/LanguageProvider"
import { VideoCard } from "./video-card"

export function VideosSection() {
  const { t } = useLanguage()

  const videos = [
    {
      id: 1,
      badge: t.masterclass.videos.video1.badge,
      badgeVariant: "secondary" as const,
      duration: t.masterclass.videos.video1.duration,
      title: t.masterclass.videos.video1.title,
      description: t.masterclass.videos.video1.description,
      gradientFrom: "from-primary/20",
      gradientTo: "to-primary/5",
      accentColor: "bg-primary/20",
      accentTextColor: "text-primary",
    },
    {
      id: 2,
      badge: t.masterclass.videos.video2.badge,
      badgeVariant: "outline" as const,
      duration: t.masterclass.videos.video2.duration,
      title: t.masterclass.videos.video2.title,
      description: t.masterclass.videos.video2.description,
      gradientFrom: "from-secondary/20",
      gradientTo: "to-secondary/5",
      accentColor: "bg-secondary/20",
      accentTextColor: "text-secondary",
    },
    {
      id: 3,
      badge: t.masterclass.videos.video3.badge,
      badgeVariant: "secondary" as const,
      duration: t.masterclass.videos.video3.duration,
      title: t.masterclass.videos.video3.title,
      description: t.masterclass.videos.video3.description,
      gradientFrom: "from-accent/20",
      gradientTo: "to-accent/5",
      accentColor: "bg-accent/20",
      accentTextColor: "text-accent",
    },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {t.masterclass.videos.title}
          </h2>
          <p className="text-xl text-muted-foreground">{t.masterclass.videos.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id}>
              <VideoCard
                badge={video.badge}
                badgeVariant={video.badgeVariant}
                duration={video.duration}
                title={video.title}
                description={video.description}
                viewButton={t.masterclass.videos.viewButton}
                comingSoon={t.masterclass.videos.comingSoon}
                gradientFrom={video.gradientFrom}
                gradientTo={video.gradientTo}
                accentColor={video.accentColor}
                isComingSoon={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

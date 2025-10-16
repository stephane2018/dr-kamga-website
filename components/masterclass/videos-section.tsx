"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Video } from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"

export function VideosSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.masterclass.videos.title}</h2>
          <p className="text-xl text-muted-foreground">
            {t.masterclass.videos.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group hover:shadow-lg transition-shadow border-0">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Video className="h-8 w-8 text-primary ml-1" />
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{t.masterclass.videos.video1.badge}</Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{t.masterclass.videos.video1.duration}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{t.masterclass.videos.video1.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {t.masterclass.videos.video1.description}
              </p>
              <Button size="sm" className="w-full">
                {t.masterclass.videos.viewButton}
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow border-0">
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-t-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                <Video className="h-8 w-8 text-secondary ml-1" />
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{t.masterclass.videos.video2.badge}</Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{t.masterclass.videos.video2.duration}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{t.masterclass.videos.video2.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {t.masterclass.videos.video2.description}
              </p>
              <Button size="sm" className="w-full">
                {t.masterclass.videos.viewButton}
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow border-0">
            <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 rounded-t-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <Video className="h-8 w-8 text-accent ml-1" />
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{t.masterclass.videos.video3.badge}</Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{t.masterclass.videos.video3.duration}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{t.masterclass.videos.video3.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {t.masterclass.videos.video3.description}
              </p>
              <Button size="sm" className="w-full">
                {t.masterclass.videos.viewButton}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

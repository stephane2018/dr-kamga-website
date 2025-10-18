"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Video } from "lucide-react"

interface VideoCardProps {
  badge: string
  badgeVariant?: "default" | "secondary" | "outline" | "destructive"
  duration: string
  title: string
  description: string
  viewButton: string
  comingSoon?: string
  gradientFrom: string
  gradientTo: string
  accentColor: string
  isComingSoon?: boolean
}

export function VideoCard({
  badge,
  badgeVariant = "secondary",
  duration,
  title,
  description,
  viewButton,
  comingSoon,
  gradientFrom,
  gradientTo,
  accentColor,
  isComingSoon = true,
}: VideoCardProps) {
  return (
    <div className="group shadow-lg hover:shadow-lg transition-shadow border-0 relative bg-white rounded-lg overflow-hidden">
      {isComingSoon && comingSoon && (
        <Badge className="absolute top-4 right-4 z-10 bg-yellow-500 hover:bg-yellow-600 text-white">
          {comingSoon}
        </Badge>
      )}


      <div
        className={`aspect-video bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center`}
      >
        <div
          className={`w-16 h-16 ${accentColor} rounded-full flex items-center justify-center group-hover:${accentColor.replace(
            "/20",
            "/30"
          )} transition-colors`}
        >
          <Video className={`h-8 w-8 ${accentColor.replace("bg-", "text-").replace("/20", "")} ml-1`} />
        </div>
      </div>

      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <Badge variant={badgeVariant}>{badge}</Badge>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      </div>

      <div className="px-6 pb-6">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button size="sm" className="w-full" disabled={isComingSoon}>
          {viewButton}
        </Button>
      </div>
    </div>
  )
}

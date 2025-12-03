"use client"

import React from "react"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"
import { EventImage, EventActions, EventNavigation, EventDetailsModal } from "./events"

type Event = {
  id: string
  titleFr: string
  titleEn: string
  date: string
  type: string
  locationFr: string
  locationEn: string
  descriptionFr: string
  descriptionEn: string
  imageUrl: string
  socialMediaLink?: string
  socialMediaPlatform?: string
  order: number
}

export function EventsSection() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [events, setEvents] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showDetailsDialog, setShowDetailsDialog] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null)

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        const data = await response.json()

        if (data.success && data.data.length > 0) {
          setEvents(data.data)
        }
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50/50 via-white to-blue-50/30 py-10 sm:py-12 md:py-16 lg:py-20">
        {/* Animated SVG Background */}
        <div className="absolute inset-0 opacity-30 sm:opacity-40">
          <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1-loading" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#0ea5e9", stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            <circle cx="10%" cy="20%" r="80" fill="url(#grad1-loading)" className="animate-pulse sm:r-120" />
            <circle
              cx="90%"
              cy="80%"
              r="100"
              fill="url(#grad1-loading)"
              className="animate-pulse"
              style={{ animationDelay: "1s", animationDuration: "3s" }}
            />
            <circle
              cx="50%"
              cy="50%"
              r="60"
              fill="url(#grad1-loading)"
              className="animate-pulse sm:r-100"
              style={{ animationDelay: "2s", animationDuration: "4s" }}
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="text-center px-4">
            <div className="mx-auto h-3 w-32 sm:h-4 sm:w-48 animate-pulse rounded-full bg-sky-200/60" />
            <div className="mx-auto mt-2 sm:mt-3 h-6 w-64 sm:h-8 sm:w-80 md:w-96 animate-pulse rounded-lg bg-slate-200/60" />
            <div className="mx-auto mt-3 sm:mt-4 h-4 w-full max-w-sm sm:h-5 sm:max-w-xl md:max-w-2xl animate-pulse rounded-lg bg-slate-200/50" />
          </div>

          {/* Card Skeleton */}
          <div className="mt-8 sm:mt-10 md:mt-12">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-primary via-primary to-primary shadow-xl sm:shadow-2xl">
              <div className="grid gap-0 md:grid-cols-2">
                {/* Image Side Skeleton */}
                <div className="relative h-48 sm:h-56 md:h-auto animate-pulse bg-sky-700/50" />

                {/* Content Side Skeleton */}
                <div className="relative flex flex-col justify-between p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    {/* Title */}
                    <div className="h-7 sm:h-8 md:h-10 w-4/5 sm:w-3/4 animate-pulse rounded-lg bg-white/20" />

                    {/* Date & Location */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="h-5 sm:h-6 w-3/4 sm:w-2/3 animate-pulse rounded-lg bg-white/15" />
                      <div className="h-5 sm:h-6 w-2/3 sm:w-1/2 animate-pulse rounded-lg bg-white/15" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div className="h-3 sm:h-4 w-full animate-pulse rounded-lg bg-white/15" />
                      <div className="h-3 sm:h-4 w-full animate-pulse rounded-lg bg-white/15" />
                      <div className="h-3 sm:h-4 w-4/5 sm:w-3/4 animate-pulse rounded-lg bg-white/15" />
                    </div>
                  </div>

                  {/* Actions Skeleton */}
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 sm:justify-between">
                    <div className="h-10 sm:h-12 w-full sm:w-40 md:w-48 animate-pulse rounded-full bg-white/20" />
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 animate-pulse rounded-full bg-white/20" />
                      <div className="flex gap-1.5 sm:gap-2">
                        <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 animate-pulse rounded-full bg-white/40" />
                        <div className="h-1.5 sm:h-2 w-6 sm:w-8 animate-pulse rounded-full bg-yellow-300/60" />
                        <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 animate-pulse rounded-full bg-white/40" />
                      </div>
                      <div className="h-8 w-8 sm:h-10 sm:w-10 animate-pulse rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (events.length === 0) {
    return null // Don't show section if no events
  }

  const currentEvent = events[currentIndex]

  const nextEvent = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length)
  }

  const prevEvent = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  return (
    <section className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-sky-50/80 via-white to-blue-50/60 animate-pulse" style={{ animationDuration: "8s" }} />
      
      {/* Secondary Animated Gradient */}
      <div className="absolute inset-0 bg-linear-to-tl from-cyan-50/40 via-transparent to-blue-50/40 animate-pulse" style={{ animationDuration: "10s", animationDelay: "1s" }} />

      {/* Tertiary Animated Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-sky-100/30 to-transparent animate-pulse" style={{ animationDuration: "12s", animationDelay: "2s" }} />

      {/* Quaternary Animated Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-50/50 via-transparent to-cyan-50/40 animate-pulse" style={{ animationDuration: "15s", animationDelay: "3s" }} />

      {/* Animated SVG Background */}
      <div className="absolute inset-0 opacity-30 sm:opacity-40">
        <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#0ea5e9", stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 0.2 }} />
            </linearGradient>
            <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{ stopColor: "#06b6d4", stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: "#0ea5e9", stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          {/* Animated Circles - Responsive sizes */}
          <circle cx="10%" cy="20%" r="80" fill="url(#grad1)" className="animate-pulse sm:r-120" />
          <circle
            cx="90%"
            cy="80%"
            r="100"
            fill="url(#grad1)"
            className="animate-pulse sm:r-150"
            style={{ animationDelay: "1s", animationDuration: "3s" }}
          />
          <circle
            cx="50%"
            cy="50%"
            r="60"
            fill="url(#grad1)"
            className="animate-pulse sm:r-100"
            style={{ animationDelay: "2s", animationDuration: "4s" }}
          />
          {/* Additional animated circles with radial gradient */}
          <circle
            cx="20%"
            cy="70%"
            r="70"
            fill="url(#grad2)"
            className="animate-pulse"
            style={{ animationDelay: "0.5s", animationDuration: "5s" }}
          />
          <circle
            cx="80%"
            cy="30%"
            r="90"
            fill="url(#grad2)"
            className="animate-pulse"
            style={{ animationDelay: "1.5s", animationDuration: "6s" }}
          />
          {/* Animated Paths */}
          <path
            d="M0,100 Q250,50 500,100 T1000,100"
            stroke="#0ea5e9"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
            className="animate-pulse"
          />
          <path
            d="M0,200 Q250,150 500,200 T1000,200"
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            opacity="0.15"
            className="animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <path
            d="M0,50 Q300,100 600,50 T1200,50"
            stroke="#06b6d4"
            strokeWidth="1.5"
            fill="none"
            opacity="0.1"
            className="animate-pulse"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          />
          
          {/* Animated Rectangles */}
          <rect
            x="5%"
            y="10%"
            width="60"
            height="60"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="1"
            opacity="0.15"
            className="animate-pulse"
            style={{ animationDelay: "0.3s", animationDuration: "6s" }}
          />
          <rect
            x="85%"
            y="60%"
            width="50"
            height="50"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1"
            opacity="0.12"
            className="animate-pulse"
            style={{ animationDelay: "1.2s", animationDuration: "7s" }}
          />

          {/* Animated Diamonds */}
          <polygon
            points="50%,5% 55%,15% 50%,25% 45%,15%"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1"
            opacity="0.2"
            className="animate-pulse"
            style={{ animationDelay: "0.7s", animationDuration: "5.5s" }}
          />
          <polygon
            points="15%,85% 18%,92% 15%,99% 12%,92%"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="1"
            opacity="0.15"
            className="animate-pulse"
            style={{ animationDelay: "1.8s", animationDuration: "6.5s" }}
          />

          {/* Animated Dots/Stars */}
          <circle cx="25%" cy="35%" r="3" fill="#0ea5e9" opacity="0.2" className="animate-pulse" style={{ animationDelay: "0.2s", animationDuration: "4s" }} />
          <circle cx="75%" cy="45%" r="2.5" fill="#3b82f6" opacity="0.15" className="animate-pulse" style={{ animationDelay: "1.1s", animationDuration: "5s" }} />
          <circle cx="35%" cy="75%" r="2" fill="#06b6d4" opacity="0.2" className="animate-pulse" style={{ animationDelay: "2.2s", animationDuration: "4.5s" }} />
          <circle cx="65%" cy="15%" r="2.5" fill="#0ea5e9" opacity="0.15" className="animate-pulse" style={{ animationDelay: "0.9s", animationDuration: "5.5s" }} />

          {/* Animated Wavy Lines */}
          <path
            d="M0,300 Q150,280 300,300 T600,300"
            stroke="#06b6d4"
            strokeWidth="1"
            fill="none"
            opacity="0.1"
            className="animate-pulse"
            style={{ animationDelay: "1.3s", animationDuration: "7s" }}
          />
          <path
            d="M0,400 Q200,420 400,400 T800,400"
            stroke="#0ea5e9"
            strokeWidth="1"
            fill="none"
            opacity="0.08"
            className="animate-pulse"
            style={{ animationDelay: "2.5s", animationDuration: "8s" }}
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center px-4">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-sky-600">
            Communauté & événements
          </p>
          <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 px-2">
            Les rendez-vous avec la communauté Dr Kamga
          </h2>
          <p className="mx-auto mt-3 max-w-xl sm:max-w-2xl text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed px-2">
            Lives, rencontres, ateliers prévention… Retrouvez ici les moments forts pour rester
            connecté à la communauté et ne rien manquer des prochains événements.
          </p>
        </div>

        {/* Main Event Card */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <article className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-primary via-primary to-primary shadow-xl sm:shadow-2xl transition-all duration-700 hover:shadow-sky-500/50">
            <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/5 to-white/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            <div className="relative grid gap-0 md:grid-cols-2">
              {/* Image Side - Limited height */}
              <EventImage
                imageUrl={currentEvent.imageUrl}
                title={language === 'fr' ? currentEvent.titleFr : currentEvent.titleEn}
                type={currentEvent.type}
              />

              {/* Content Side */}
              <div className="relative flex flex-col justify-between p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight line-clamp-2">
                    {language === 'fr' ? currentEvent.titleFr : currentEvent.titleEn}
                  </h3>

                  <div className="mt-4 sm:mt-5 md:mt-6 space-y-2 sm:space-y-2.5 md:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3 text-sky-50">
                      <Calendar className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-yellow-300" />
                      <span className="text-xs sm:text-sm md:text-base font-medium leading-snug">{currentEvent.date}</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3 text-sky-50">
                      <MapPin className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-yellow-300" />
                      <span className="text-xs sm:text-sm md:text-base font-medium leading-snug">
                        {language === 'fr' ? currentEvent.locationFr : currentEvent.locationEn}
                      </span>
                    </div>
                  </div>

                  {/* Description - Limited to 3 lines */}
                  <p className="mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm md:text-base leading-relaxed text-sky-50 line-clamp-3">
                    {language === 'fr' ? currentEvent.descriptionFr : currentEvent.descriptionEn}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 sm:mt-7 md:mt-8 space-y-3">
                  {/* Primary Actions Row */}
                  <EventActions
                    onViewDetails={() => {
                      setSelectedEvent(currentEvent)
                      setShowDetailsDialog(true)
                    }}
                    socialMediaLink={currentEvent.socialMediaLink}
                    socialMediaPlatform={currentEvent.socialMediaPlatform}
                  />

                  {/* Navigation Dots */}
                  <EventNavigation
                    events={events}
                    currentIndex={currentIndex}
                    onPrevious={prevEvent}
                    onNext={nextEvent}
                    onSelectIndex={setCurrentIndex}
                  />
                </div>

              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
        language={language}
      />
    </section>
  )
}

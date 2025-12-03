"use client"

import React from "react"
import Image from "next/image"
import { X, Calendar, MapPin, ExternalLink } from "lucide-react"

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
  inscriptionLink?: string
  order: number
}

type EventDetailsModalProps = {
  event: Event | null
  isOpen: boolean
  onClose: () => void
  language: 'fr' | 'en'
}

export function EventDetailsModal({
  event,
  isOpen,
  onClose,
  language,
}: EventDetailsModalProps) {
  if (!isOpen || !event) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300 overflow-hidden"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-slate-900 active:scale-95"
          aria-label="Fermer"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Image - Full natural size */}
        <div className="relative w-full overflow-auto shrink-0 bg-black rounded-t-2xl flex justify-center">
          <Image
            src={event.imageUrl}
            alt={language === 'fr' ? event.titleFr : event.titleEn}
            width={1200}
            height={500}
            className="max-w-[500px] w-full h-auto"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />

          {/* Event Type Badge */}
          <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6">
            <span className="rounded-full bg-yellow-400 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-900 shadow-lg">
              {event.type}
            </span>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 space-y-6">
          {/* Title */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight  bg-white pb-2">
            {language === 'fr' ? event.titleFr : event.titleEn}
          </h3>

          {/* Date & Location */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-slate-700">
              <Calendar className="mt-1 h-5 w-5 shrink-0 text-sky-600" />
              <span className="text-sm sm:text-base font-medium">{event.date}</span>
            </div>
            <div className="flex items-start gap-3 text-slate-700">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-sky-600" />
              <span className="text-sm sm:text-base font-medium">
                {language === 'fr' ? event.locationFr : event.locationEn}
              </span>
            </div>
          </div>

          {/* Full Description */}
          <div className="prose prose-sm sm:prose-base max-w-none mb-15">
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 whitespace-pre-wrap">
              {language === 'fr' ? event.descriptionFr : event.descriptionEn}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col p-4 sm:flex-row gap-3 rounded-b-2xl bg-white  border-slate-200 absolute bottom-0 left-0 right-0 w-full px-6 sm:px-8 md:px-10">
            {event.inscriptionLink && (
              <a
                href={event.inscriptionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-xl active:scale-95"
              >
                <span>S'inscrire</span>
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              </a>
            )}
            {event.socialMediaLink && (
              <a
                href={event.socialMediaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-sky-700 hover:shadow-xl active:scale-95"
              >
                <span>Voir sur {event.socialMediaPlatform}</span>
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-slate-200 px-6 py-3 text-sm sm:text-base font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-300 active:scale-95"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

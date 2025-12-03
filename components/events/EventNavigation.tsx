"use client"

import React from "react"

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

type EventNavigationProps = {
  events: Event[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
  onSelectIndex: (index: number) => void
}

export function EventNavigation({
  events,
  currentIndex,
  onPrevious,
  onNext,
  onSelectIndex,
}: EventNavigationProps) {
  return (
    <div className="flex items-center mx-auto justify-between gap-2 sm:gap-3 w-fit pt-3">
      <button
        onClick={onPrevious}
        className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/20 text-white text-xl sm:text-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30 active:scale-95 shrink-0"
        aria-label="Événement précédent"
      >
        ‹
      </button>

      <div className="flex gap-1.5 sm:gap-2 justify-center flex-1">
        {events.map((event, index) => (
          <button
            key={event.id}
            onClick={() => onSelectIndex(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "w-6 sm:w-8 bg-yellow-300"
                : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Aller à l'événement ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/20 text-white text-xl sm:text-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30 active:scale-95 shrink-0"
        aria-label="Événement suivant"
      >
        ›
      </button>
    </div>
  )
}

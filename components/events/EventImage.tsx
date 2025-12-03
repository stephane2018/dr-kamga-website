"use client"

import React from "react"
import Image from "next/image"

type EventImageProps = {
  imageUrl: string
  title: string
  type: string
}

export function EventImage({ imageUrl, title, type }: EventImageProps) {
  return (
    <div className="relative h-48 sm:h-56 md:h-full min-h-72 overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-sky-900/80 via-sky-900/40 to-transparent md:bg-linear-to-r" />

      {/* Event Type Badge */}
      <div className="absolute left-3 sm:left-4 md:left-6 top-3 sm:top-4 md:top-6">
        <span className="animate-pulse rounded-full bg-yellow-400 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-900 shadow-lg">
          {type}
        </span>
      </div>
    </div>
  )
}

"use client"

import React from "react"
import { Eye, ExternalLink } from "lucide-react"

type EventActionsProps = {
  onViewDetails: () => void
  socialMediaLink?: string
  socialMediaPlatform?: string
  inscriptionLink?: string
}

export function EventActions({
  onViewDetails,
  socialMediaLink,
  socialMediaPlatform,
  inscriptionLink,
}: EventActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
      {inscriptionLink && (
        <a
          href={inscriptionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-green-500 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-xl active:scale-95"
        >
          <span>S'inscrire</span>
          <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
        </a>
      )}

      <button
        onClick={onViewDetails}
        className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-yellow-300 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-400 hover:shadow-xl active:scale-95"
      >
        <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
        <span>Voir détails</span>
      </button>

      {socialMediaLink && (
        <a
          href={socialMediaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-sky-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-xl active:scale-95"
        >
          <span className="truncate">Voir sur {socialMediaPlatform}</span>
          <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
        </a>
      )}
    </div>
  )
}

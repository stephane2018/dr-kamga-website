/**
 * Vérifie si un événement est passé (outdated)
 * @param eventDate - Date de l'événement (DateTime ou null)
 * @param status - Statut actuel de l'événement
 * @returns true si l'événement est passé
 */
export function isEventOutdated(eventDate: Date | null | undefined, status: string): boolean {
  if (!eventDate || status === 'archived') return false

  const now = new Date()
  const eventDateTime = new Date(eventDate)

  // Ajouter 24h à la date de l'événement pour le considérer comme passé le jour suivant
  eventDateTime.setHours(23, 59, 59, 999)

  return eventDateTime < now
}

/**
 * Parse une date en format texte vers un DateTime
 * Essaie plusieurs formats français courants
 */
export function parseFrenchDate(dateStr: string): Date | null {
  try {
    // Nettoyer la chaîne
    const cleaned = dateStr.toLowerCase().trim()

    const months: { [key: string]: number } = {
      'janvier': 0, 'février': 1, 'fevrier': 1, 'mars': 2, 'avril': 3,
      'mai': 4, 'juin': 5, 'juillet': 6, 'août': 7, 'aout': 7,
      'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11, 'decembre': 11
    }

    // Format: "Samedi 14 décembre 2025" ou "14 décembre 2025"
    // Accepte aussi "1er", "2e", etc.
    let match = cleaned.match(/(\d{1,2})(?:er|e)?\s+(\w+)\s+(\d{4})/)
    if (match) {
      const day = parseInt(match[1])
      const monthName = match[2].toLowerCase()
      const year = parseInt(match[3])

      const month = months[monthName]
      if (month !== undefined) {
        return new Date(year, month, day)
      }
    }

    // Essayer sans le jour de la semaine: "14 décembre 2025"
    match = cleaned.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/)
    if (match) {
      const day = parseInt(match[1])
      const monthName = match[2].toLowerCase()
      const year = parseInt(match[3])

      const month = months[monthName]
      if (month !== undefined) {
        return new Date(year, month, day)
      }
    }

    // Format ISO ou autre format standard
    const parsedDate = new Date(dateStr)
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate
    }

    return null
  } catch {
    return null
  }
}

/**
 * Formate une date pour l'affichage
 */
export function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

/**
 * Get the localized field value based on the current language
 * @param obj - The object containing multilingual fields
 * @param field - The base field name (without Fr/En suffix)
 * @param language - The current language ('fr' or 'en')
 * @returns The localized field value, with fallback to French
 */
export function getLocalizedField<T extends Record<string, any>>(
  obj: T,
  field: string,
  language: 'fr' | 'en'
): string {
  const fieldName = field + (language === 'fr' ? 'Fr' : 'En')
  return obj[fieldName] || obj[field + 'Fr'] || '' // Fallback to French, then empty string
}

/**
 * Get the localized array field value based on the current language
 * Useful for JSON fields that store arrays in {fr: [], en: []} format
 * @param obj - The object containing multilingual array fields
 * @param field - The field name
 * @param language - The current language ('fr' or 'en')
 * @returns The localized array, with fallback to French array
 */
export function getLocalizedArray<T = any>(
  obj: Record<string, any>,
  field: string,
  language: 'fr' | 'en'
): T[] {
  const value = obj[field]
  if (!value) return []

  if (typeof value === 'object' && value[language]) {
    return value[language]
  }

  // Fallback to French
  if (typeof value === 'object' && value.fr) {
    return value.fr
  }

  return []
}

import { GoogleAnalytics } from '@next/third-parties/google'

export function GA() {
  const gaId = "G-0FKZLSPLGK"

  if (!gaId) {
    console.warn('Google Analytics ID (NEXT_PUBLIC_GA_ID) is not set')
    return null
  }

  return <GoogleAnalytics gaId={gaId} />
}

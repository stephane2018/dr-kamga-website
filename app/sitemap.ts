import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.cabinetdab.com'
  const currentDate = new Date()
  const languages = ['fr', 'en']

  // Define routes with their priorities
  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/masterclass', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/seminaires', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/coaching', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/a-propos', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/videos', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/politique-cookies', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const sitemap: MetadataRoute.Sitemap = []

  routes.forEach(route => {
    languages.forEach(lang => {
      const url = lang === 'fr' 
        ? `${baseUrl}${route.path}` 
        : `${baseUrl}/${lang}${route.path}`
      
      sitemap.push({
        url,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            fr: `${baseUrl}${route.path}`,
            en: `${baseUrl}/en${route.path}`,
          }
        }
      })
    })
  })

  // Note: Admin routes (/admin/*) and unsubscribe page are intentionally excluded from sitemap
  // Dynamic routes like /seminaires/[slug] would need database integration to be included

  return sitemap
}
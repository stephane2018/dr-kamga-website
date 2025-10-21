import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.cabinetdab.com'
  const currentDate = new Date()

  const routes = [
    { path: '/fr', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/en', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/fr/masterclass', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/en/masterclass', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/fr/seminaires', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/en/seminaires', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/fr/coaching', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/en/coaching', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/fr/a-propos', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/en/a-propos', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/fr/videos', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/en/videos', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/fr/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/en/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/fr/politique-cookies', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/en/politique-cookies', priority: 0.3, changeFrequency: 'yearly' as const },
  ]


  const sitemap: MetadataRoute.Sitemap = routes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return sitemap
}
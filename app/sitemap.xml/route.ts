import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://www.cabinetdab.com'
  const currentDate = new Date().toISOString()

  const routes = [
    { path: '/fr', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/en', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/fr/masterclass', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/en/masterclass', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/fr/seminaires', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/en/seminaires', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/fr/coaching', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/en/coaching', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/fr/a-propos', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/en/a-propos', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/fr/videos', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/en/videos', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/fr/contact', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/en/contact', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/fr/politique-cookies', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/en/politique-cookies', priority: 0.3, changeFrequency: 'yearly' },
  ]

  const urlEntries = routes
    .map(
      (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'noindex',
    },
  })
}

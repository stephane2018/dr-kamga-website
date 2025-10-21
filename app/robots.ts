import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.cabinetdab.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/api/*',
          '/unsubscribe',
          '/private/',
          '/_next/',
          '/static/',
          '/pdf/',
          '/*?*utm_*',
          '/*?*fbclid*',
          '/*?*gclid*',
        ],
        crawlDelay: 10,
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/*.jpg', '/*.jpeg', '/*.png', '/*.webp', '/*.svg', '/*.gif'],
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/api/*',
          '/unsubscribe',
          '/pdf/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/*.jpg', '/*.jpeg', '/*.png', '/*.webp', '/*.svg', '/*.gif'],
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/*.jpg', '/*.jpeg', '/*.png', '/*.webp', '/*.svg'],
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/api/*',
          '/unsubscribe',
          '/pdf/',
        ],
        crawlDelay: 10,
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        disallow: ['/admin/', '/api/', '/unsubscribe'],
        crawlDelay: 10,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/unsubscribe'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
/**
 * Centralized environment configuration
 * Handles both local and production environments seamlessly
 */

// Detect environment
export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = !isProduction

// Environment configuration
export const env = {
  // Auth
  nextAuthSecret: process.env.NEXTAUTH_SECRET!,
  nextAuthUrl: process.env.NEXTAUTH_URL || (isProduction ? 'https://cabinetdab.com' : 'http://localhost:3000'),

  // Environment flags
  isProduction,
  isDevelopment,

  // Site
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || (isProduction ? 'https://cabinetdab.com' : 'http://localhost:3000'),

  // Database
  databaseUrl: process.env.DATABASE_URL!,
} as const

// Validate required environment variables on startup
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is required')
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required')
}

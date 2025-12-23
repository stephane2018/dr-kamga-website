import { NextRequest } from "next/server"

// Simple in-memory rate limiter for development
// In production, use Redis or a database-based solution
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
}

/**
 * Rate limiting middleware for API routes
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<{ success: boolean; resetTime?: number }> {
  const identifier = request.ip ?? "anonymous"
  const now = Date.now()
  
  // Get or create rate limit entry
  let entry = rateLimitStore.get(identifier)
  
  if (!entry || now > entry.resetTime) {
    // Reset or create entry
    entry = {
      count: 1,
      resetTime: now + config.windowMs
    }
    rateLimitStore.set(identifier, entry)
    return { success: true }
  }
  
  // Increment count
  entry.count++
  
  // Check if exceeded
  if (entry.count > config.maxRequests) {
    return { 
      success: false, 
      resetTime: entry.resetTime 
    }
  }
  
  return { success: true }
}

/**
 * Rate limit configuration for login endpoint
 */
export const loginRateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5 // Max 5 login attempts per 15 minutes
}

/**
 * Rate limit configuration for general API
 */
export const apiRateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // Max 100 requests per 15 minutes
}

/**
 * Cleanup expired entries (call periodically)
 */
export function cleanupRateLimit() {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

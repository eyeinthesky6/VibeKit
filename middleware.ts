import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signToken, verifyToken } from '@/lib/auth/session';

// Token bucket rate limiter (in-memory, per-IP)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_TOKENS = 60; // max requests per window
const REFILL_RATE = MAX_TOKENS / (RATE_LIMIT_WINDOW / 1000); // tokens per second
const rateLimitMap = new Map<string, { tokens: number; lastRefill: number }>();
const CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes
let lastCleanup = Date.now();

const protectedRoutes = '/dashboard';

function refillTokens(entry: { tokens: number; lastRefill: number }, now: number) {
  const elapsed = (now - entry.lastRefill) / 1000;
  const refill = Math.floor(elapsed * REFILL_RATE);
  if (refill > 0) {
    entry.tokens = Math.min(MAX_TOKENS, entry.tokens + refill);
    entry.lastRefill = now;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // CORS and rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };
    // Cache GET API responses
    if (request.method === 'GET') {
      const cacheRes = NextResponse.next();
      Object.entries(corsHeaders).forEach(([key, value]) => cacheRes.headers.set(key, value));
      cacheRes.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
      return cacheRes;
    }
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: corsHeaders });
    }
    // Token bucket rate limiting by IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    let entry = rateLimitMap.get(ip);
    if (!entry) {
      entry = { tokens: MAX_TOKENS, lastRefill: now };
      rateLimitMap.set(ip, entry);
    } else {
      refillTokens(entry, now);
    }
    if (entry.tokens > 0) {
      entry.tokens -= 1;
    } else {
      const reset = Math.ceil((entry.lastRefill + RATE_LIMIT_WINDOW - now) / 1000);
      const res = new NextResponse('Rate limit exceeded', { status: 429, headers: corsHeaders });
      res.headers.set('X-RateLimit-Limit', MAX_TOKENS.toString());
      res.headers.set('X-RateLimit-Remaining', '0');
      res.headers.set('X-RateLimit-Reset', reset.toString());
      return res;
    }
    // Add rate limit headers
    const remaining = entry.tokens;
    const reset = Math.ceil((entry.lastRefill + RATE_LIMIT_WINDOW - now) / 1000);
    const apiRes = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => apiRes.headers.set(key, value));
    apiRes.headers.set('X-RateLimit-Limit', MAX_TOKENS.toString());
    apiRes.headers.set('X-RateLimit-Remaining', remaining.toString());
    apiRes.headers.set('X-RateLimit-Reset', reset.toString());
    // Periodic cleanup of old IPs
    if (now - lastCleanup > CLEANUP_INTERVAL) {
      for (const [ip, entry] of rateLimitMap.entries()) {
        if (now - entry.lastRefill > CLEANUP_INTERVAL) {
          rateLimitMap.delete(ip);
        }
      }
      lastCleanup = now;
    }
    return apiRes;
  }

  const sessionCookie = request.cookies.get('session');
  const isProtectedRoute = pathname.startsWith(protectedRoutes);

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const res = NextResponse.next();

  if (sessionCookie && request.method === 'GET') {
    try {
      const parsed = await verifyToken(sessionCookie.value);
      const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.cookies.set({
        name: 'session',
        value: await signToken({
          ...parsed,
          expires: expiresInOneDay.toISOString(),
        }),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: expiresInOneDay,
      });
    } catch (error) {
      console.error('Error updating session:', error);
      res.cookies.delete('session');
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

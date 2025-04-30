import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signToken, verifyToken } from '@/lib/auth/session';

// Simple in-memory rate limiter
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 60;
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const protectedRoutes = '/dashboard';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // CORS and rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: corsHeaders });
    }
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    if (now - entry.timestamp < RATE_LIMIT_WINDOW) {
      entry.count += 1;
    } else {
      entry.count = 1;
      entry.timestamp = now;
    }
    rateLimitMap.set(ip, entry);
    if (entry.count > MAX_REQUESTS) {
      return new NextResponse('Rate limit exceeded', { status: 429, headers: corsHeaders });
    }
    const apiRes = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => apiRes.headers.set(key, value));
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

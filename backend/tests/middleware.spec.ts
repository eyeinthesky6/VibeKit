import { middleware } from '@/middleware';
import { NextResponse } from 'next/server';

describe('Auth & CORS Middleware', () => {
  it('redirects unauthenticated user from protected route', async () => {
    const req: any = {
      nextUrl: { pathname: '/dashboard', toString: () => '/dashboard', clone: () => {} },
      cookies: { get: () => undefined },
      method: 'GET',
      headers: { get: () => null },
      url: 'http://localhost/dashboard',
    };
    const res = await middleware(req);
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/sign-in');
  });

  it('handles CORS preflight for API routes', async () => {
    const req: any = {
      nextUrl: { pathname: '/api/test', toString: () => '/api/test', clone: () => {} },
      cookies: { get: () => null },
      method: 'OPTIONS',
      headers: { get: () => null },
    };
    const res = await middleware(req);
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });

  it('sets rate limit headers for API routes', async () => {
    const req: any = {
      nextUrl: { pathname: '/api/test', toString: () => '/api/test', clone: () => {} },
      cookies: { get: () => null },
      method: 'POST',
      headers: { get: () => '127.0.0.1' },
    };
    const res = await middleware(req);
    expect(res.headers.get('X-RateLimit-Limit')).toBeDefined();
    expect(res.headers.get('X-RateLimit-Remaining')).toBeDefined();
    expect(res.headers.get('X-RateLimit-Reset')).toBeDefined();
  });
});

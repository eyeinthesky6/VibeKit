jest.mock('@/lib/db/queries', () => ({
  getUser: jest.fn().mockResolvedValue({ id: 1 }),
}));

import { POST } from '@/app/api/stripe/checkout/route';
import { NextRequest } from 'next/server';
import { loadEnv } from '@/config/env';

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => 'mock-session'),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Mock getSession for authentication
jest.mock('@/lib/auth/session', () => ({
  ...jest.requireActual('@/lib/auth/session'),
  getSession: jest.fn(),
}));

const { getSession } = require('@/lib/auth/session');

describe('API /api/stripe/checkout', () => {
  beforeAll(() => loadEnv());

  it('returns 400 when missing planId', async () => {
    getSession.mockResolvedValue({ user: { id: 1 } });
    const url = new URL('http://localhost/api/stripe/checkout');
    const req = new NextRequest(url, { method: 'POST', body: JSON.stringify({}) });
    req.json = async () => ({}); // Mock .json() to return empty object
    const res = await POST(req as any);
    expect(res.status).toBe(400);
    const json = await res.json() as any;
    expect(json.error).toEqual({ code: 'MISSING_PLAN_ID', message: 'Missing planId in request body' });
  });

  it('returns 401 when authentication is required', async () => {
    getSession.mockResolvedValue(null);
    const url = new URL('http://localhost/api/stripe/checkout');
    const req = new NextRequest(url, { method: 'POST' });
    req.json = async () => ({}); // Mock .json() to return empty object
    const res = await POST(req as any);
    expect(res.status).toBe(401);
    const json = await res.json() as any;
    expect(json.error).toEqual({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
  });
});

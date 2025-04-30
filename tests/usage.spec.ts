import { GET } from '@/app/api/usage/route';
import { NextRequest } from 'next/server';
import { loadEnv } from '@/config/env';

describe('API /api/usage', () => {
  beforeAll(() => {
    loadEnv();
  });

  it('should return usage data for a user', async () => {
    const url = new URL('http://localhost/api/usage?userId=1');
    const req = new NextRequest(url);
    const res = await GET(req as any);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(Array.isArray(json.usage)).toBe(true);
  });
});

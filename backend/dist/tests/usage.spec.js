import { GET } from '@/app/api/usage/route';
import { NextRequest } from 'next/server';
import { loadEnv } from '@/config/env';
jest.mock('next/headers', () => ({
    cookies: jest.fn(() => ({
        get: jest.fn(() => undefined),
        set: jest.fn(),
        delete: jest.fn(),
    })),
}));
jest.mock('@/lib/db/supabase', () => ({
    supabase: {
        storage: {
            from: () => ({
                upload: jest.fn(),
                getPublicUrl: jest.fn(() => ({ data: { publicUrl: 'mock-url' } })),
                list: jest.fn(() => ({ data: [], error: null })),
                download: jest.fn(),
            }),
        },
    },
}));
describe('API /api/usage', () => {
    beforeAll(() => {
        loadEnv();
    });
    it('should return usage data for a user', async () => {
        const url = new URL('http://localhost/api/usage?userId=1');
        const req = new NextRequest(url);
        const res = await GET(req);
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(Array.isArray(json.usage)).toBe(true);
    });
    it('returns error when missing userId and teamId', async () => {
        const url = new URL('http://localhost/api/usage');
        const req = new NextRequest(url);
        const res = await GET(req);
        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toEqual({ code: 'MISSING_USER_OR_TEAM_ID', message: 'Missing userId or teamId' });
    });
});

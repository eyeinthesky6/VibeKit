import { getSession } from '@/lib/auth/session';
import { NextResponse } from 'next/server';
export async function requireAuth(request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 });
    }
    return session;
}

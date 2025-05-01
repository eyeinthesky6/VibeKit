import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getStripePrices } from '@/lib/payments/stripe';
export async function GET(request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 });
    }
    try {
        const prices = await getStripePrices();
        return NextResponse.json({ prices });
    }
    catch (error) {
        return NextResponse.json({ error: { code: 'FAILED_TO_FETCH_PRICES', message: 'Failed to fetch prices' } }, { status: 500 });
    }
}

import { getSession } from '@/lib/auth/session';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe';
export async function POST(request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 });
    }
    const { planId } = (await request.json());
    if (!planId) {
        return NextResponse.json({ error: { code: 'MISSING_PLAN_ID', message: 'Missing planId in request body' } }, { status: 400 });
    }
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{ price: planId, quantity: 1 }],
            mode: 'subscription',
            success_url: `${process.env.BASE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/pricing`,
            client_reference_id: undefined,
        });
        return NextResponse.json({ url: session.url ?? undefined });
    }
    catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal error' } }, { status: 500 });
    }
}

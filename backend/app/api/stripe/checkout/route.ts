import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users, teams, team_members } from '@/lib/db/schema';
import { setSession } from '@/lib/auth/session';
import { getSession } from '@/lib/auth/session';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe';
import type { CheckoutRequest, CheckoutResponse } from '@/shared/types';

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json<CheckoutResponse>({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 });
  }

  const { planId } = (await request.json()) as CheckoutRequest;
  if (!planId) {
    return NextResponse.json<CheckoutResponse>({ error: { code: 'MISSING_PLAN_ID', message: 'Missing planId in request body' } }, { status: 400 });
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

    return NextResponse.json<CheckoutResponse>({ url: session.url ?? undefined });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json<CheckoutResponse>({ error: { code: 'INTERNAL_ERROR', message: 'Internal error' } }, { status: 500 });
  }
}

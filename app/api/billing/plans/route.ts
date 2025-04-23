import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  const prices = await stripe.prices.list({ active: true });
  const plans = prices.data.map(p => ({
    id: p.id,
    name: p.nickname,
    amount: p.unit_amount,
  }));
  return NextResponse.json({ plans });
}

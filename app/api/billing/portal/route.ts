import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  // Get user session from Supabase
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = user.id;

  // Fetch user from DB to get Stripe Customer ID
  const { data: userRow, error: userError } = await supabase
    .from('users')
    .select('stripeCustomerId')
    .eq('id', userId)
    .single();
  if (userError || !userRow?.stripeCustomerId) {
    return NextResponse.json({ error: 'Stripe customer not found' }, { status: 400 });
  }

  // Create Stripe portal session
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: userRow.stripeCustomerId,
    return_url: process.env.NEXT_PUBLIC_APP_URL + '/dashboard/billing',
  });
  // Redirect to portal
  return NextResponse.redirect(portalSession.url);
}

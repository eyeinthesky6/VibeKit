import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { priceId } = await req.json();
  // Verify session
  const { data: { session }, error: authError } = await supabaseAdmin.auth.getSession();
  if (authError || !session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Retrieve or create Stripe customer
  const { data: userRecord } = await supabaseAdmin
    .from('users')
    .select('id, stripe_customer_id')
    .eq('id', session.user.id)
    .single();
  let customerId = userRecord?.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({ email: session.user.email! });
    customerId = customer.id;
    await supabaseAdmin
      .from('users')
      .update({ stripe_customer_id: customerId })
      .eq('id', session.user.id);
  }
  // Create checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    customer: customerId,
  });
  return NextResponse.json({ url: checkoutSession.url });
}

import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  // Verify session
  const { data: { session }, error: authError } = await supabaseAdmin.auth.getSession();
  if (authError || !session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Fetch Stripe customer ID
  const { data: userRecord, error: userError } = await supabaseAdmin
    .from('users')
    .select('stripe_customer_id')
    .eq('id', session.user.id)
    .single();
  if (userError || !userRecord?.stripe_customer_id) {
    return NextResponse.json({ subscription: null });
  }
  // List active subscriptions
  const subs = await stripe.subscriptions.list({
    customer: userRecord.stripe_customer_id,
    status: 'active',
    expand: ['data.plan.product'],
    limit: 1,
  });
  const sub = subs.data[0];
  if (!sub) {
    return NextResponse.json({ subscription: null });
  }
  const item = sub.items.data[0];
  // Extract raw field, TS stripe types may not include snake_case
  const currentPeriodEnd = (sub as any).current_period_end as number;
  const subscription = {
    id: sub.id,
    status: sub.status,
    current_period_end: currentPeriodEnd,
    plan: item.price.nickname,
    amount: item.price.unit_amount,
  };
  return NextResponse.json({ subscription });
}

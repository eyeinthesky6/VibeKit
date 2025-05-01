import { handleSubscriptionChange, stripe } from '@/lib/payments/stripe';
import { NextResponse } from 'next/server';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!webhookSecret) {
    console.error('❌ Missing STRIPE_WEBHOOK_SECRET environment variable');
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable');
}
export async function POST(request) {
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature');
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    }
    catch (err) {
        console.error('Webhook signature verification failed.', err);
        return NextResponse.json({ error: { code: 'WEBHOOK_SIGNATURE_VERIFICATION_FAILED', message: 'Webhook signature verification failed.' } }, { status: 400 });
    }
    switch (event.type) {
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
            const subscription = event.data.object;
            await handleSubscriptionChange(subscription);
            break;
        case 'checkout.session.completed': {
            const session = event.data.object;
            if (session.subscription) {
                try {
                    const subscription = await stripe.subscriptions.retrieve(session.subscription);
                    await handleSubscriptionChange(subscription);
                }
                catch (err) {
                    console.error('Failed to handle checkout session subscription:', err);
                }
            }
            else {
                console.warn('No subscription found on checkout.session.completed event.');
            }
            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    return NextResponse.json({ received: true });
}

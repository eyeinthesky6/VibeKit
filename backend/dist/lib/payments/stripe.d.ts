import 'dotenv/config';
import Stripe from 'stripe';
import { Team } from '@/lib/db/schema';
export declare const stripe: Stripe;
export declare function createCheckoutSession({ team, priceId, }: {
    team: Team | null;
    priceId: string;
}): Promise<void>;
export declare function createCustomerPortalSession(team: Team): Promise<Stripe.Response<Stripe.BillingPortal.Session>>;
export declare function handleSubscriptionChange(subscription: Stripe.Subscription): Promise<void>;
export declare function getStripePrices(): Promise<{
    id: string;
    productId: string;
    unitAmount: number | null;
    currency: string;
    interval: Stripe.Price.Recurring.Interval | undefined;
    trialPeriodDays: number | null | undefined;
}[]>;
export declare function getStripeProducts(): Promise<{
    id: string;
    name: string;
    description: string | null;
    defaultPriceId: string | undefined;
}[]>;

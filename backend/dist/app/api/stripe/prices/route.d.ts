import { NextRequest, NextResponse } from 'next/server';
export declare function GET(request: NextRequest): Promise<NextResponse<{
    error: {
        code: string;
        message: string;
    };
}> | NextResponse<{
    prices: {
        id: string;
        productId: string;
        unitAmount: number | null;
        currency: string;
        interval: import("stripe").Stripe.Price.Recurring.Interval | undefined;
        trialPeriodDays: number | null | undefined;
    }[];
}>>;

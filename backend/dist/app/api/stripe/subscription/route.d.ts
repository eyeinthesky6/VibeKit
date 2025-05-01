import { NextRequest, NextResponse } from 'next/server';
export declare function GET(request: NextRequest): Promise<NextResponse<{
    error: {
        code: string;
        message: string;
    };
}> | NextResponse<{
    subscription_status: string | null;
    plan_name: string | null;
    stripe_product_id: string | null;
    stripe_subscription_id: string | null;
}>>;

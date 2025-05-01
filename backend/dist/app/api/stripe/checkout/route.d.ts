import { NextRequest, NextResponse } from 'next/server';
import type { CheckoutResponse } from '@/shared/types';
export declare function POST(request: NextRequest): Promise<NextResponse<CheckoutResponse>>;

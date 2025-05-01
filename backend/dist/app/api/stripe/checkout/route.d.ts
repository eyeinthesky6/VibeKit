import { NextRequest, NextResponse } from 'next/server';
import type { CheckoutResponse } from '@/types/api';
export declare function POST(request: NextRequest): Promise<NextResponse<CheckoutResponse>>;

import type { UsageResponse } from '@/shared/types';
import { NextRequest, NextResponse } from 'next/server';
export declare function GET(req: NextRequest): Promise<NextResponse<{
    error: {
        code: string;
        message: string;
    };
}> | NextResponse<UsageResponse & {
    page: number;
    limit: number;
}>>;

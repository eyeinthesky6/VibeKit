import { NextRequest, NextResponse } from 'next/server';
export declare function POST(request: NextRequest): Promise<NextResponse<{
    error: {
        code: string;
        message: string;
    };
}> | NextResponse<{
    url: string;
}>>;

import { NextResponse } from 'next/server';
export declare function requireAuth(request: any): Promise<{
    user: {
        id: number;
    };
    expires: string;
} | NextResponse<{
    error: {
        code: string;
        message: string;
    };
}>>;

import { z } from 'zod';
export declare const auditLogSchema: z.ZodObject<{
    user: z.ZodString;
    action: z.ZodString;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    action: string;
    timestamp: string;
    user: string;
}, {
    action: string;
    timestamp: string;
    user: string;
}>;

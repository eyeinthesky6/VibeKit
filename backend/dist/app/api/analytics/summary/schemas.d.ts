import { z } from 'zod';
export declare const analyticsSummarySchema: z.ZodObject<{
    visits: z.ZodNumber;
    conversions: z.ZodNumber;
    users: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    users: number;
    visits: number;
    conversions: number;
}, {
    users: number;
    visits: number;
    conversions: number;
}>;

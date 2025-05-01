import { z } from 'zod';
export declare const notificationSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    message: z.ZodString;
    read: z.ZodOptional<z.ZodBoolean>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    timestamp: string;
    title: string;
    message: string;
    id?: string | undefined;
    read?: boolean | undefined;
}, {
    timestamp: string;
    title: string;
    message: string;
    id?: string | undefined;
    read?: boolean | undefined;
}>;

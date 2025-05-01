import { z } from 'zod';
export declare const preferencesSchema: z.ZodObject<{
    theme: z.ZodOptional<z.ZodString>;
    notifications: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    notifications?: boolean | undefined;
    theme?: string | undefined;
}, {
    notifications?: boolean | undefined;
    theme?: string | undefined;
}>;

import { z } from 'zod';
export declare const profileSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    avatar?: string | undefined;
}, {
    name: string;
    email: string;
    avatar?: string | undefined;
}>;

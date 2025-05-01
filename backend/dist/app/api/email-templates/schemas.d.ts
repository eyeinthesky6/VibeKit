import { z } from 'zod';
export declare const emailTemplateSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    subject: z.ZodString;
    body: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    body: string;
    subject: string;
    id?: string | undefined;
}, {
    name: string;
    body: string;
    subject: string;
    id?: string | undefined;
}>;
export declare const emailTemplateIdParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;

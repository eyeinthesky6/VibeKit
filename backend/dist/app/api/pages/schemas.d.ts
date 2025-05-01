import { z } from 'zod';
export declare const pageSchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodString;
    blocks: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    slug: string;
    blocks: any[];
}, {
    title: string;
    slug: string;
    blocks: any[];
}>;
export declare const pageIdParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;

import { z } from 'zod';
export declare const seoSchema: z.ZodObject<{
    metaTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    sitemap: z.ZodOptional<z.ZodString>;
    robots: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sitemap?: string | undefined;
    robots?: string | undefined;
    metaTags?: string[] | undefined;
}, {
    sitemap?: string | undefined;
    robots?: string | undefined;
    metaTags?: string[] | undefined;
}>;

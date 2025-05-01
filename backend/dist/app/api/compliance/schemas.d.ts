import { z } from 'zod';
export declare const complianceSchema: z.ZodObject<{
    gdpr: z.ZodOptional<z.ZodBoolean>;
    ccpa: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    gdpr?: boolean | undefined;
    ccpa?: boolean | undefined;
}, {
    gdpr?: boolean | undefined;
    ccpa?: boolean | undefined;
}>;

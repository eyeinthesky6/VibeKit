import { z } from 'zod';
export declare const getOrganizationsResponseSchema: z.ZodObject<{
    organizations: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    organizations: any[];
}, {
    organizations: any[];
}>;

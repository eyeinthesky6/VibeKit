import { z } from 'zod';
export declare const featureFlagSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    enabled: boolean;
}, {
    id: string;
    name: string;
    enabled: boolean;
}>;
export declare const updateFeatureFlagSchema: z.ZodObject<{
    id: z.ZodString;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    enabled: boolean;
}, {
    id: string;
    enabled: boolean;
}>;

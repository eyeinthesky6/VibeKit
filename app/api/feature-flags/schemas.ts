import { z } from 'zod';

export const featureFlagSchema = z.object({ id: z.string(), name: z.string(), enabled: z.boolean() });
export const updateFeatureFlagSchema = z.object({ id: z.string(), enabled: z.boolean() }); 
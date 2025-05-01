import { z } from 'zod';

export const preferencesSchema = z.object({ theme: z.string().optional(), notifications: z.boolean().optional() }); 
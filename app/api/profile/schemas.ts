import { z } from 'zod';

export const profileSchema = z.object({ name: z.string(), email: z.string().email(), avatar: z.string().optional() }); 
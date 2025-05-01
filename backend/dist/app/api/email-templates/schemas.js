import { z } from 'zod';
export const emailTemplateSchema = z.object({ id: z.string().optional(), name: z.string(), subject: z.string(), body: z.string() });
export const emailTemplateIdParamSchema = z.object({ id: z.string() });

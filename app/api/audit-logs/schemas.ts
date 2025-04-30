import { z } from 'zod';

export const auditLogSchema = z.object({ user: z.string(), action: z.string(), timestamp: z.string() }); 
import { z } from 'zod';
export const notificationSchema = z.object({ id: z.string().optional(), title: z.string(), message: z.string(), read: z.boolean().optional(), timestamp: z.string() });

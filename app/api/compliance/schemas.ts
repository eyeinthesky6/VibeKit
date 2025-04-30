import { z } from 'zod';

export const complianceSchema = z.object({ gdpr: z.boolean().optional(), ccpa: z.boolean().optional() }); 
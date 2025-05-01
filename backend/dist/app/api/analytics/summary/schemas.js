import { z } from 'zod';
export const analyticsSummarySchema = z.object({
    visits: z.number(),
    conversions: z.number(),
    users: z.number(),
});

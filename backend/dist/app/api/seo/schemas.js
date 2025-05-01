import { z } from 'zod';
export const seoSchema = z.object({ metaTags: z.array(z.string()).optional(), sitemap: z.string().optional(), robots: z.string().optional() });

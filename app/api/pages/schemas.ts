import { z } from 'zod';

export const pageSchema = z.object({ title: z.string(), slug: z.string(), blocks: z.array(z.any()) });
export const pageIdParamSchema = z.object({ id: z.string() }); 
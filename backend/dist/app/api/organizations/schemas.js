import { z } from 'zod';
export const getOrganizationsResponseSchema = z.object({ organizations: z.array(z.any()) });

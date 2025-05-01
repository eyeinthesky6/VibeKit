import { z } from 'zod';

export const inviteTeamMemberRequestSchema = z.object({ email: z.string().email(), teamId: z.string() }); 
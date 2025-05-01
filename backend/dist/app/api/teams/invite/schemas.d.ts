import { z } from 'zod';
export declare const inviteTeamMemberRequestSchema: z.ZodObject<{
    email: z.ZodString;
    teamId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    teamId: string;
}, {
    email: string;
    teamId: string;
}>;

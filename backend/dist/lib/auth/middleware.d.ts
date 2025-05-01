import { z } from 'zod';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
export type ActionState = {
    error?: string;
    success?: string;
    [key: string]: unknown;
};
type ValidatedActionFunction<S extends z.ZodType<any, any>> = (data: z.infer<S>, formData: FormData) => Promise<ActionState>;
export declare function validatedAction<S extends z.ZodType<any, any>>(schema: S, action: ValidatedActionFunction<S>): (prevState: ActionState, formData: FormData) => Promise<ActionState>;
type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>> = (data: z.infer<S>, formData: FormData, user: User) => Promise<ActionState>;
export declare function validatedActionWithUser<S extends z.ZodType<any, any>>(schema: S, action: ValidatedActionWithUserFunction<S>): (prevState: ActionState, formData: FormData) => Promise<ActionState>;
type ActionWithTeamFunction<T> = (formData: FormData, team: TeamDataWithMembers) => Promise<T>;
export declare function withTeam<T>(action: ActionWithTeamFunction<T>): (formData: FormData) => Promise<T>;
export {};

import { z } from 'zod';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: unknown;
};

type ValidatedActionFunction<S extends z.ZodType<any, any>> = (
  data: z.infer<S>,
  formData: FormData,
) => Promise<ActionState>;

export function validatedAction<S extends z.ZodType<any, any>>(
  schema: S,
  action: ValidatedActionFunction<S>,
) {
  return async (
    prevState: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { ...prevState, error: result.error.errors[0].message };
    }

    const actionResult = await action(result.data, formData);
    return { ...prevState, ...actionResult };
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>> = (
  data: z.infer<S>,
  formData: FormData,
  user: User,
) => Promise<ActionState>;

export function validatedActionWithUser<S extends z.ZodType<any, any>>(
  schema: S,
  action: ValidatedActionWithUserFunction<S>,
) {
  return async (
    prevState: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    const user = await getUser();
    if (!user) throw new Error('User is not authenticated');

    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { ...prevState, error: result.error.errors[0].message };
    }

    const actionResult = await action(result.data, formData, user);
    return { ...prevState, ...actionResult };
  };
}

type ActionWithTeamFunction<T> = (formData: FormData, team: TeamDataWithMembers) => Promise<T>;

export function withTeam<T>(action: ActionWithTeamFunction<T>) {
  return async (formData: FormData): Promise<T> => {
    const user = await getUser();
    if (!user) {
      redirect('/sign-in');
    }

    const team = await getTeamForUser(user.id);
    if (!team) {
      throw new Error('Team not found');
    }

    return action(formData, team);
  };
}

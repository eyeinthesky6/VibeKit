import { getTeamForUser, getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
export function validatedAction(schema, action) {
    return async (prevState, formData) => {
        const result = schema.safeParse(Object.fromEntries(formData));
        if (!result.success) {
            return { ...prevState, error: result.error.errors[0].message };
        }
        const actionResult = await action(result.data, formData);
        return { ...prevState, ...actionResult };
    };
}
export function validatedActionWithUser(schema, action) {
    return async (prevState, formData) => {
        const user = await getUser();
        if (!user)
            throw new Error('User is not authenticated');
        const result = schema.safeParse(Object.fromEntries(formData));
        if (!result.success) {
            return { ...prevState, error: result.error.errors[0].message };
        }
        const actionResult = await action(result.data, formData, user);
        return { ...prevState, ...actionResult };
    };
}
export function withTeam(action) {
    return async (formData) => {
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

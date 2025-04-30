'use server';

import { z } from 'zod';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
  User,
  users,
  teams,
  team_members,
  activity_logs,
  type NewUser,
  type NewTeam,
  type NewTeamMember,
  type NewActivityLog,
  ActivityType,
  invitations,
} from '@/lib/db/schema';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createCheckoutSession } from '@/lib/payments/stripe';
import { getUser, getUserWithTeam } from '@/lib/db/queries';
import { validatedAction, validatedActionWithUser } from '@/lib/auth/middleware';
import { sendInvitationEmail } from '@/lib/utils/email';

async function logActivity(
  team_id: number | null | undefined,
  user_id: number,
  type: ActivityType,
  ip_address?: string,
) {
  if (team_id === null || team_id === undefined) {
    return;
  }
  const newActivity: NewActivityLog = {
    team_id,
    user_id,
    action: type,
    ip_address: ip_address || '',
  };
  await db.insert(activity_logs).values(newActivity);
}

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  const userWithTeam = await db
    .select({
      user: users,
      team: teams,
    })
    .from(users)
    .leftJoin(team_members, eq(users.id, team_members.user_id))
    .leftJoin(teams, eq(team_members.team_id, teams.id))
    .where(eq(users.email, email))
    .limit(1);

  if (userWithTeam.length === 0) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password,
    };
  }

  const { user: foundUser, team: foundTeam } = userWithTeam[0];

  const isPasswordValid = await comparePasswords(password, foundUser.password_hash);

  if (!isPasswordValid) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password,
    };
  }

  await Promise.all([
    setSession(foundUser),
    logActivity(foundTeam?.id, foundUser.id, ActivityType.SIGN_IN),
  ]);

  const redirectTo = formData.get('redirect') as string | null;
  if (redirectTo === 'checkout') {
    const priceId = formData.get('priceId') as string;
    await createCheckoutSession({ team: foundTeam, priceId });
    return { success: 'checkout' };
  }

  redirect('/dashboard');
  return { success: 'redirected' };
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  inviteId: z.string().optional(),
  role: z.enum(['basic', 'premium', 'admin']).optional(),
});

import { createClient } from '@supabase/supabase-js';
import { profiles } from '@/lib/db/profiles';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const { email, password, inviteId, role } = data;

  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (existingUser.length > 0) {
    return {
      error: 'Failed to create user. Please try again.',
      email,
      password,
    };
  }

  const password_hash = await hashPassword(password);

  // Store role in user_metadata and profiles table
  const roleTier = role || 'basic';

  // Create user in Supabase Auth (for magic link, etc.)
  const { data: supaUser, error: supaError } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { role: roleTier },
    email_confirm: true,
  });
  if (supaError) {
    return {
      error: 'Failed to create Supabase user: ' + supaError.message,
      email,
      password,
      success: undefined,
    };
  }

  // Insert profile
  await db.insert(profiles).values({
    id: supaUser.user?.id || '',
    email,
    role: roleTier,
  });

  const newUser: NewUser = {
    email,
    password_hash,
    role: 'owner', // Default role, will be overridden if there's an invitation
  };

  const [createdUser] = await db.insert(users).values(newUser).returning();

  if (!createdUser) {
    return {
      error: 'Failed to create user. Please try again.',
      email,
      password,
    };
  }

  let team_id: number;
  let userRole: string;
  let createdTeam: typeof teams.$inferSelect | null = null;

  if (inviteId) {
    // Check if there's a valid invitation
    const [invitation] = await db
      .select()
      .from(invitations)
      .where(
        and(
          eq(invitations.id, parseInt(inviteId)),
          eq(invitations.email, email),
          eq(invitations.status, 'pending'),
        ),
      )
      .limit(1);

    if (invitation) {
      team_id = invitation.team_id;
      userRole = invitation.role;

      await db
        .update(invitations)
        .set({ status: 'accepted' })
        .where(eq(invitations.id, invitation.id));

      await logActivity(team_id, createdUser.id, ActivityType.ACCEPT_INVITATION);

      [createdTeam] = await db.select().from(teams).where(eq(teams.id, team_id)).limit(1);
    } else {
      return {
      error: 'Invalid or expired invitation.',
      email,
      password,
      success: undefined,
    };
    }
  } else {
    // Create a new team if there's no invitation
    const newTeam: NewTeam = {
      name: `${email}'s Team`,
    };

    [createdTeam] = await db.insert(teams).values(newTeam).returning();

    if (!createdTeam) {
      return {
        error: 'Failed to create team. Please try again.',
        email,
        password,
      };
    }

    team_id = createdTeam.id;
    userRole = 'owner';

    await logActivity(team_id, createdUser.id, ActivityType.CREATE_TEAM);
  }

  const newTeamMember: NewTeamMember = {
    user_id: createdUser.id,
    team_id: team_id,
    role: userRole,
  };

  await Promise.all([
    db.insert(team_members).values(newTeamMember),
    logActivity(team_id, createdUser.id, ActivityType.SIGN_UP),
    setSession(createdUser),
  ]);

  const redirectTo = formData.get('redirect') as string | null;
  if (redirectTo === 'checkout') {
    const priceId = formData.get('priceId') as string;
    await createCheckoutSession({ team: createdTeam, priceId });
    return { success: 'checkout' };
  }

  redirect('/dashboard');
  return { success: 'redirected' };
});

export async function signOut() {
  const user = (await getUser()) as User;
  const userWithTeam = await getUserWithTeam(user.id);
  await logActivity(userWithTeam?.team_id, user.id, ActivityType.SIGN_OUT);
  (await cookies()).delete('session');
}

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _, user) => {
    const { currentPassword, newPassword } = data;

    const isPasswordValid = await comparePasswords(currentPassword, user.password_hash);

    if (!isPasswordValid) {
      return { error: 'Current password is incorrect.' };
    }

    if (currentPassword === newPassword) {
      return {
        error: 'New password must be different from the current password.',
      };
    }

    const newPassword_hash = await hashPassword(newPassword);
    const userWithTeam = await getUserWithTeam(user.id);

    await Promise.all([
      db.update(users).set({ password_hash: newPassword_hash }).where(eq(users.id, user.id)),
      logActivity(userWithTeam?.team_id, user.id, ActivityType.UPDATE_PASSWORD),
    ]);

    return { success: 'Password updated successfully.' };
  },
);

const deleteAccountSchema = z.object({
  password: z.string().min(8).max(100),
});

export const deleteAccount = validatedActionWithUser(deleteAccountSchema, async (data, _, user) => {
  const { password } = data;

  const isPasswordValid = await comparePasswords(password, user.password_hash);
  if (!isPasswordValid) {
    return {
      error: 'Incorrect password. Account deletion failed.',
      email: '',
      password: '',
      success: undefined,
    };
  }

  const userWithTeam = await getUserWithTeam(user.id);

  await logActivity(userWithTeam?.team_id, user.id, ActivityType.DELETE_ACCOUNT);

  // Soft delete
  await db
    .update(users)
    .set({
      deletedAt: sql`CURRENT_TIMESTAMP`,
      email: sql`CONCAT(email, '-', id, '-deleted')`, // Ensure email uniqueness
    })
    .where(eq(users.id, user.id));

  if (userWithTeam?.team_id) {
    await db
      .delete(team_members)
      .where(and(eq(team_members.user_id, user.id), eq(team_members.team_id, userWithTeam.team_id)));
  }

  (await cookies()).delete('session');
  redirect('/sign-in');
});

const updateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
});

export const updateAccount = validatedActionWithUser(updateAccountSchema, async (data, _, user) => {
  const { name, email } = data;
  const userWithTeam = await getUserWithTeam(user.id);

  await Promise.all([
    db.update(users).set({ name, email }).where(eq(users.id, user.id)),
    logActivity(userWithTeam?.team_id, user.id, ActivityType.UPDATE_ACCOUNT),
  ]);

  return { success: 'Account updated successfully.' };
});

const removeTeamMemberSchema = z.object({
  memberId: z.number(),
});

export const removeTeamMember = validatedActionWithUser(
  removeTeamMemberSchema,
  async (data, _, user) => {
    const { memberId } = data;
    const userWithTeam = await getUserWithTeam(user.id);

    if (!userWithTeam?.team_id) {
      return { error: 'User is not part of a team' };
    }

    await db
      .delete(team_members)
      .where(and(eq(team_members.id, memberId), eq(team_members.team_id, userWithTeam.team_id)));

    await logActivity(userWithTeam.team_id, user.id, ActivityType.REMOVE_TEAM_MEMBER);

    return { success: 'Team member removed successfully' };
  },
);

const inviteTeamMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['member', 'owner']),
});

export const inviteTeamMember = validatedActionWithUser(
  inviteTeamMemberSchema,
  async (data, _, user) => {
    const { email, role } = data;
    const userWithTeam = await getUserWithTeam(user.id);

    if (!userWithTeam?.team_id) {
      return { error: 'User is not part of a team' };
    }

    const existingMember = await db
      .select()
      .from(users)
      .leftJoin(team_members, eq(users.id, team_members.user_id))
      .where(and(eq(users.email, email), eq(team_members.team_id, userWithTeam.team_id)))
      .limit(1);

    if (existingMember.length > 0) {
      return { error: 'User is already a member of this team', email: '', password: '', success: undefined };
    }

    // Check if there's an existing invitation
    const existingInvitation = await db
      .select()
      .from(invitations)
      .where(
        and(
          eq(invitations.email, email),
          eq(invitations.team_id, userWithTeam.team_id),
          eq(invitations.status, 'pending'),
        ),
      )
      .limit(1);

    if (existingInvitation.length > 0) {
      return { error: 'An invitation has already been sent to this email', email: '', password: '', success: undefined };
    }

    // Create a new invitation
    await db.insert(invitations).values({
      team_id: userWithTeam.team_id,
      email,
      role,
      invitedBy: user.id,
      status: 'pending',
    });

    await logActivity(userWithTeam.team_id, user.id, ActivityType.INVITE_TEAM_MEMBER);

    // Send invitation email
    const invitation = await db
      .select()
      .from(invitations)
      .where(eq(invitations.email, email))
      .orderBy(eq(invitations.id, invitations.id))
      .limit(1);
    const inviteId = invitation[0]?.id;
    if (inviteId) {
      // Use team_id as teamName placeholder since name isn't fetched
      const teamName = userWithTeam.team_id?.toString() || '';
      await sendInvitationEmail(email, teamName, role, inviteId);
    }

    return { success: 'Invitation sent successfully' };
  },
);

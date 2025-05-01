import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { activity_logs, team_members, teams, users } from './schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';
export async function getUser() {
    const sessionCookie = (await cookies()).get('session');
    if (!sessionCookie || !sessionCookie.value) {
        return null;
    }
    const sessionData = await verifyToken(sessionCookie.value);
    if (!sessionData || !sessionData.user || typeof sessionData.user.id !== 'number') {
        return null;
    }
    if (new Date(sessionData.expires) < new Date()) {
        return null;
    }
    const user = await db
        .select()
        .from(users)
        .where(and(eq(users.id, sessionData.user.id), isNull(users.deleted_at)))
        .limit(1);
    if (user.length === 0) {
        return null;
    }
    return user[0];
}
export async function getTeamByStripeCustomerId(customerId) {
    const result = await db
        .select()
        .from(teams)
        .where(eq(teams.stripe_customer_id, customerId))
        .limit(1);
    return result.length > 0 ? result[0] : null;
}
export async function updateTeamSubscription(teamId, { stripe_subscription_id, stripe_product_id, plan_name, subscription_status, }) {
    await db
        .update(teams)
        .set({
        stripe_subscription_id,
        stripe_product_id,
        plan_name,
        subscription_status,
        updated_at: new Date(),
    })
        .where(eq(teams.id, teamId));
}
export async function getUserWithTeam(userId) {
    const result = await db
        .select({
        user: users,
        team_id: team_members.team_id,
    })
        .from(users)
        .leftJoin(team_members, eq(users.id, team_members.user_id))
        .where(eq(users.id, userId))
        .limit(1);
    return result[0];
}
export async function getActivityLogs() {
    const user = await getUser();
    if (!user) {
        throw new Error('User not authenticated');
    }
    return await db
        .select({
        id: activity_logs.id,
        action: activity_logs.action,
        timestamp: activity_logs.timestamp,
        ip_address: activity_logs.ip_address,
        user_name: users.name,
    })
        .from(activity_logs)
        .leftJoin(users, eq(activity_logs.user_id, users.id))
        .where(eq(activity_logs.user_id, user.id))
        .orderBy(desc(activity_logs.timestamp))
        .limit(10);
}
export async function getTeamForUser(userId) {
    const result = await db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            team_members: {
                with: {
                    team: {
                        with: {
                            team_members: {
                                with: {
                                    user: {
                                        columns: {
                                            id: true,
                                            name: true,
                                            email: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    return result?.team_members[0]?.team || null;
}
export async function getUserByEmail(email) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
}

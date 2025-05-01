import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { db } from '@/lib/db/drizzle';
import { teams, team_members, users } from '@/lib/db/schema';
import { createCustomerPortalSession } from '@/lib/payments/stripe';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 });
  }
  // Find the user's team
  const userId = session.user.id;
  const userTeam = await db
    .select({ team: teams })
    .from(users)
    .leftJoin(team_members, eq(users.id, team_members.user_id))
    .leftJoin(teams, eq(team_members.team_id, teams.id))
    .where(eq(users.id, userId))
    .limit(1);
  const team = userTeam[0]?.team;
  if (!team) {
    return NextResponse.json({ error: { code: 'NO_TEAM_FOUND', message: 'No team found for user' } }, { status: 404 });
  }
  try {
    const portalSession = await createCustomerPortalSession(team);
    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    return NextResponse.json({ error: { code: 'FAILED_TO_CREATE_PORTAL_SESSION', message: 'Failed to create portal session' } }, { status: 500 });
  }
} 
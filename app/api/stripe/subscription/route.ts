import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { db } from '@/lib/db/drizzle';
import { teams, team_members, users } from '@/lib/db/schema';

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Find the user's team
  const userId = session.user.id;
  const userTeam = await db
    .select({ team: teams })
    .from(users)
    .leftJoin(team_members, users.id.eq(team_members.user_id))
    .leftJoin(teams, team_members.team_id.eq(teams.id))
    .where(users.id.eq(userId))
    .limit(1);
  const team = userTeam[0]?.team;
  if (!team) {
    return NextResponse.json({ error: 'No team found for user' }, { status: 404 });
  }
  // Return subscription status fields
  return NextResponse.json({
    subscription_status: team.subscription_status,
    plan_name: team.plan_name,
    stripe_product_id: team.stripe_product_id,
    stripe_subscription_id: team.stripe_subscription_id,
  });
} 
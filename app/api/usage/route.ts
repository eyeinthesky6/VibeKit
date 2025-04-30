import type { UsageResponse, UsageRecord } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { usage } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const teamId = searchParams.get('teamId');
  if (!userId && !teamId) {
    return NextResponse.json({ error: 'Missing userId or teamId' }, { status: 400 });
  }

  const filters: any[] = [];
  if (userId) filters.push(eq(usage.user_id, Number(userId)));
  if (teamId) filters.push(eq(usage.team_id, Number(teamId)));

  const rows = await db
    .select()
    .from(usage)
    .where(filters.length > 1 ? and(...filters) : filters[0])
    .orderBy(usage.timestamp);

  const usageRecords: UsageRecord[] = rows.map((row) => ({
    id: row.id,
    user_id: row.user_id ?? undefined,
    team_id: row.team_id ?? undefined,
    action: row.action,
    timestamp: row.timestamp.toISOString(),
    detail: row.detail ?? undefined,
  }));

  return NextResponse.json<UsageResponse>({ usage: usageRecords });
}

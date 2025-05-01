import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { usage } from '@/lib/db/schema';
import { eq, and, gte, lte } from 'drizzle-orm';
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const teamId = searchParams.get('teamId');
    const page = Number(searchParams.get('page') ?? '1');
    const limit = Number(searchParams.get('limit') ?? '10');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    if (!userId && !teamId) {
        return NextResponse.json({ error: { code: 'MISSING_USER_OR_TEAM_ID', message: 'Missing userId or teamId' } }, { status: 400 });
    }
    const filters = [];
    if (userId)
        filters.push(eq(usage.user_id, Number(userId)));
    if (teamId)
        filters.push(eq(usage.team_id, Number(teamId)));
    if (startDate)
        filters.push(gte(usage.timestamp, new Date(startDate)));
    if (endDate)
        filters.push(lte(usage.timestamp, new Date(endDate)));
    const rows = await db
        .select()
        .from(usage)
        .where(filters.length > 1 ? and(...filters) : filters[0])
        .orderBy(usage.timestamp)
        .limit(limit)
        .offset((page - 1) * limit);
    const usageRecords = rows.map((row) => ({
        id: row.id,
        user_id: row.user_id ?? undefined,
        team_id: row.team_id ?? undefined,
        action: row.action,
        timestamp: row.timestamp.toISOString(),
        detail: row.detail ?? undefined,
    }));
    return NextResponse.json({
        usage: usageRecords,
        page,
        limit,
    });
}

import { NextResponse } from 'next/server';
import { inviteTeamMemberRequestSchema } from './schemas';

export async function POST() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
} 
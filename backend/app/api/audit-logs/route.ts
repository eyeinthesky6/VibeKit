import { NextResponse } from 'next/server';
import { auditLogSchema } from './schemas';

export async function GET() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
} 
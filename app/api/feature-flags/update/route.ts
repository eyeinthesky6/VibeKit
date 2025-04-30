import { NextResponse } from 'next/server';
import { updateFeatureFlagSchema } from '../schemas';

export async function POST() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
} 
import { NextResponse } from 'next/server';
import { notificationSchema } from './schemas';

export async function GET() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
} 
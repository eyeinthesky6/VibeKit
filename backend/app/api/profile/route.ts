import { NextResponse } from 'next/server';
import { profileSchema } from './schemas';

export async function GET() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
} 
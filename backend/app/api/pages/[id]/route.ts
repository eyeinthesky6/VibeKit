import { NextResponse } from 'next/server';
import { pageIdParamSchema } from '../schemas';

export async function PUT() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
} 
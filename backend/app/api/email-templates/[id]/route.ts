import { NextResponse } from 'next/server';
import { emailTemplateIdParamSchema } from '../schemas';

export async function DELETE() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
} 
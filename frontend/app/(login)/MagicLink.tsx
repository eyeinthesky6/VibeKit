'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function MagicLink() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <form onSubmit={handleSend} className="space-y-6">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" disabled={sent}>
        {sent ? 'Check your email' : 'Send Magic Link'}
      </Button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {sent && <div className="text-green-600 text-sm">Magic link sent! Check your email.</div>}
    </form>
  );
}

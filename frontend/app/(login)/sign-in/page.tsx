'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function SignInPage() {
  const [tab, setTab] = useState<'password' | 'magic'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message || 'Sign in failed');
    } else {
      toast.success('Signed in!');
      router.push('/dashboard');
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      toast.error(error.message || 'Failed to send magic link');
    } else {
      toast.success('Magic link sent! Check your email.');
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-xl shadow">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-center rounded-l-full border ${tab === 'password' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'} transition`}
            onClick={() => setTab('password')}
            type="button"
          >
            Password
          </button>
          <button
            className={`flex-1 py-2 text-center rounded-r-full border-l-0 border ${tab === 'magic' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'} transition`}
            onClick={() => setTab('magic')}
            type="button"
          >
            Magic Link
          </button>
        </div>
        {tab === 'password' ? (
          <form className="space-y-6" onSubmit={handlePasswordSignIn}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
              Sign in
            </Button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleMagicLink}>
            <div>
              <Label htmlFor="magic-email">Email</Label>
              <Input
                id="magic-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
              Send Magic Link
            </Button>
          </form>
        )}
        <div className="mt-6 text-center text-sm">
          <a href="/sign-up" className="text-orange-600 hover:underline">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}

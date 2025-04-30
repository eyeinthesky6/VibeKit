import { useEffect, useState } from 'react';
import { createClient, User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

/**
 * Placeholder hook for retrieving the current user
 */
export function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser({
          id: data.user.id,
          name: data.user.user_metadata?.name ?? null,
          email: data.user.email ?? null,
        });
      } else {
        setUser(null);
      }
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => getUser());
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);
  return user;
}

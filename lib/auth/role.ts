// Helper to fetch current user's role from Supabase
import { supabase } from '@/lib/db/supabase';

export async function getUserRole(userId: string): Promise<'basic' | 'premium' | 'admin'> {
  // Try to fetch from user_metadata first
  const { data: user, error } = await supabase.auth.admin.getUserById(userId);
  if (user?.user?.user_metadata?.role) {
    return user.user.user_metadata.role;
  }
  // Fallback: fetch from profiles table
  const { data, error: _profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();
  if (data?.role) return data.role;
  return 'basic';
}

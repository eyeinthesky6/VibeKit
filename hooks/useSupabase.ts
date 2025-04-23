import { useMemo } from 'react';
import { supabase } from '@/lib/db/supabase';

export function useSupabase() {
  // In a real app, you might want to scope this to user/session
  return useMemo(() => supabase, []);
}

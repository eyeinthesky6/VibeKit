import { supabase } from '@/lib/db/supabase';

export function getStorage(bucket: string) {
  return supabase.storage.from(bucket);
}

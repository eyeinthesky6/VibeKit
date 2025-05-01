import { supabase } from '@/lib/db/supabase';
export function getStorage(bucket) {
    return supabase.storage.from(bucket);
}

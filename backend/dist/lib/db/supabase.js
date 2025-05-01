import { createClient } from '@supabase/supabase-js';
import { loadEnv } from '@/config/env';
const env = loadEnv();
// Initialize Supabase client
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}
/**
 * Supabase client singleton
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { loadEnv } from '@/config/env';

// Validate environment variables at startup
loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

/**
 * Supabase client singleton
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

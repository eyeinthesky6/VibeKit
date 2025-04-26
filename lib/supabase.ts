import { createClient, SupabaseClient } from '@supabase/supabase-js';

const _supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const _supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase client singleton
 */
import { supabase } from './db/supabase';
export { supabase };

/**
 * Environment variable definitions
 */
export interface EnvConfig {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  STRIPE_PUBLIC_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  BASE_URL: string;
  POSTGRES_URL: string;
  AUTH_SECRET: string;
  FEATURE_X_ENABLED: boolean;
  REDIS_URL?: string;
  SENTRY_DSN?: string;
}

/**
 * Load and validate environment variables
 */
import { z } from 'zod';

// Environment variables are loaded in next.config.js
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(10),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(10),
  STRIPE_PUBLIC_KEY: z.string().min(10),
  STRIPE_SECRET_KEY: z.string().min(10),
  STRIPE_WEBHOOK_SECRET: z.string().min(10),
  BASE_URL: z.string().url(),
  POSTGRES_URL: z.string().url(),
  AUTH_SECRET: z.string().min(10),
  FEATURE_X_ENABLED: z.preprocess((val) => val === 'true', z.boolean()),
  REDIS_URL: z.string().url().optional(),
  SENTRY_DSN: z.string().url().optional(),
});

export function loadEnv(): EnvConfig {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('❌ Invalid or missing environment variables:', result.error.format());
    throw new Error('Invalid or missing environment variables. See above for details.');
  }
  return result.data;
}

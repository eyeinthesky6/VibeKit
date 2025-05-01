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
export declare function loadEnv(): EnvConfig;

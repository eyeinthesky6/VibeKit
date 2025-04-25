import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { loadEnv } from './config/env';
const env = loadEnv();
import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
} satisfies Config;

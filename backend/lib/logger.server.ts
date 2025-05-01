import pino from 'pino';
import * as Sentry from '@sentry/node';
import { loadEnv } from '@/config/env';

const env = loadEnv();
if (env.SENTRY_DSN) {
  Sentry.init({ dsn: env.SENTRY_DSN });
}

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
}); 
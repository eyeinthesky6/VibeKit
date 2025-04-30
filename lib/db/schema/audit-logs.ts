import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const audit_logs = pgTable('audit_logs', {
  id: varchar('id', { length: 36 }).primaryKey(),
  user: varchar('user', { length: 255 }),
  action: varchar('action', { length: 255 }),
  timestamp: timestamp('timestamp').defaultNow(),
}); 
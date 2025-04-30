import { pgTable, varchar, boolean } from 'drizzle-orm/pg-core';

export const preferences = pgTable('preferences', {
  id: varchar('id', { length: 36 }).primaryKey(),
  user_id: varchar('user_id', { length: 36 }),
  theme: varchar('theme', { length: 32 }),
  notifications: boolean('notifications'),
}); 
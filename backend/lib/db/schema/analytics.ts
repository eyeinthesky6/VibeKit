import { pgTable, varchar, integer } from 'drizzle-orm/pg-core';

export const analytics_summary = pgTable('analytics_summary', {
  id: varchar('id', { length: 36 }).primaryKey(),
  visits: integer('visits'),
  conversions: integer('conversions'),
  users: integer('users'),
}); 
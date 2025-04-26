import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: varchar('id', { length: 36 }).primaryKey(), // Supabase user id (uuid)
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 16 }).notNull().default('basic'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

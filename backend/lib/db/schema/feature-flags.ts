import { pgTable, varchar, boolean } from 'drizzle-orm/pg-core';

export const feature_flags = pgTable('feature_flags', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  enabled: boolean('enabled'),
}); 
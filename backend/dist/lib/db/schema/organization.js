import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
export const organizations = pgTable('organizations', {
    id: varchar('id', { length: 36 }).primaryKey(),
    name: varchar('name', { length: 255 }),
    created_at: timestamp('created_at').defaultNow(),
});

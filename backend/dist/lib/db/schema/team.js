import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
export const teams = pgTable('teams', {
    id: varchar('id', { length: 36 }).primaryKey(),
    name: varchar('name', { length: 255 }),
    created_at: timestamp('created_at').defaultNow(),
});
export const team_members = pgTable('team_members', {
    id: varchar('id', { length: 36 }).primaryKey(),
    team_id: varchar('team_id', { length: 36 }),
    user_id: varchar('user_id', { length: 36 }),
    role: varchar('role', { length: 32 }),
});

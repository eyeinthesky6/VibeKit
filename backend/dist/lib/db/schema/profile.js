import { pgTable, varchar } from 'drizzle-orm/pg-core';
export const profiles = pgTable('profiles', {
    id: varchar('id', { length: 36 }).primaryKey(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }),
    avatar: varchar('avatar', { length: 255 }),
});

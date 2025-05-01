import { pgTable, varchar, text } from 'drizzle-orm/pg-core';
export const pages = pgTable('pages', {
    id: varchar('id', { length: 36 }).primaryKey(),
    title: varchar('title', { length: 255 }),
    slug: varchar('slug', { length: 255 }),
    blocks: text('blocks'),
});

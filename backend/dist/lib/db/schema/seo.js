import { pgTable, varchar, text } from 'drizzle-orm/pg-core';
export const seo_settings = pgTable('seo_settings', {
    id: varchar('id', { length: 36 }).primaryKey(),
    meta_tags: text('meta_tags'),
    sitemap: text('sitemap'),
    robots: text('robots'),
});

import { pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const email_templates = pgTable('email_templates', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  subject: varchar('subject', { length: 255 }),
  body: text('body'),
}); 
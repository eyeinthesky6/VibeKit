import { pgTable, varchar, boolean } from 'drizzle-orm/pg-core';
export const compliance = pgTable('compliance', {
    id: varchar('id', { length: 36 }).primaryKey(),
    user_id: varchar('user_id', { length: 36 }),
    gdpr: boolean('gdpr'),
    ccpa: boolean('ccpa'),
});

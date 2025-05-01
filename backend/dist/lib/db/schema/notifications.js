import { pgTable, varchar, boolean, timestamp, text } from 'drizzle-orm/pg-core';
export const notifications = pgTable('notifications', {
    id: varchar('id', { length: 36 }).primaryKey(),
    user_id: varchar('user_id', { length: 36 }),
    title: varchar('title', { length: 255 }),
    message: text('message'),
    read: boolean('read'),
    timestamp: timestamp('timestamp').defaultNow(),
});

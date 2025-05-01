import { pgTable, serial, varchar, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password_hash: text('password_hash').notNull(),
    role: varchar('role', { length: 20 }).notNull().default('member'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    deleted_at: timestamp('deleted_at'),
}).enableRLS();
export const teams = pgTable('teams', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    stripe_customer_id: text('stripe_customer_id').unique(),
    stripe_subscription_id: text('stripe_subscription_id').unique(),
    stripe_product_id: text('stripe_product_id'),
    plan_name: varchar('plan_name', { length: 50 }),
    subscription_status: varchar('subscription_status', { length: 20 }),
}).enableRLS();
export const team_members = pgTable('team_members', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id')
        .notNull()
        .references(() => users.id),
    team_id: integer('team_id')
        .notNull()
        .references(() => teams.id),
    role: varchar('role', { length: 50 }).notNull(),
    joined_at: timestamp('joined_at').notNull().defaultNow(),
}).enableRLS();
export const usage = pgTable('usage', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => users.id),
    team_id: integer('team_id').references(() => teams.id),
    action: text('action').notNull(),
    timestamp: timestamp('timestamp').notNull().defaultNow(),
    detail: text('detail'),
}).enableRLS();
export const activity_logs = pgTable('activity_logs', {
    id: serial('id').primaryKey(),
    team_id: integer('team_id')
        .notNull()
        .references(() => teams.id),
    user_id: integer('user_id').references(() => users.id),
    action: text('action').notNull(),
    timestamp: timestamp('timestamp').notNull().defaultNow(),
    ip_address: varchar('ip_address', { length: 45 }),
}).enableRLS();
export const invitations = pgTable('invitations', {
    id: serial('id').primaryKey(),
    team_id: integer('team_id')
        .notNull()
        .references(() => teams.id),
    email: varchar('email', { length: 255 }).notNull(),
    role: varchar('role', { length: 50 }).notNull(),
    invited_by: integer('invited_by')
        .notNull()
        .references(() => users.id),
    invited_at: timestamp('invited_at').notNull().defaultNow(),
    status: varchar('status', { length: 20 }).notNull().default('pending'),
}).enableRLS();
export const teamsRelations = relations(teams, ({ many }) => ({
    team_members: many(team_members),
    activity_logs: many(activity_logs),
    invitations: many(invitations),
}));
export const usersRelations = relations(users, ({ many }) => ({
    team_members: many(team_members),
    invitations_sent: many(invitations),
}));
export const invitationsRelations = relations(invitations, ({ one }) => ({
    team: one(teams, {
        fields: [invitations.team_id],
        references: [teams.id],
    }),
    invited_by: one(users, {
        fields: [invitations.invited_by],
        references: [users.id],
    }),
}));
export const teamMembersRelations = relations(team_members, ({ one }) => ({
    user: one(users, {
        fields: [team_members.user_id],
        references: [users.id],
    }),
    team: one(teams, {
        fields: [team_members.team_id],
        references: [teams.id],
    }),
}));
export const activity_logs_relations = relations(activity_logs, ({ one }) => ({
    team: one(teams, {
        fields: [activity_logs.team_id],
        references: [teams.id],
    }),
    user: one(users, {
        fields: [activity_logs.user_id],
        references: [users.id],
    }),
}));
export var ActivityType;
(function (ActivityType) {
    ActivityType["SIGN_UP"] = "SIGN_UP";
    ActivityType["SIGN_IN"] = "SIGN_IN";
    ActivityType["SIGN_OUT"] = "SIGN_OUT";
    ActivityType["UPDATE_PASSWORD"] = "UPDATE_PASSWORD";
    ActivityType["DELETE_ACCOUNT"] = "DELETE_ACCOUNT";
    ActivityType["UPDATE_ACCOUNT"] = "UPDATE_ACCOUNT";
    ActivityType["CREATE_TEAM"] = "CREATE_TEAM";
    ActivityType["REMOVE_TEAM_MEMBER"] = "REMOVE_TEAM_MEMBER";
    ActivityType["INVITE_TEAM_MEMBER"] = "INVITE_TEAM_MEMBER";
    ActivityType["ACCEPT_INVITATION"] = "ACCEPT_INVITATION";
})(ActivityType || (ActivityType = {}));

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// export const users = sqliteTable('users', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   email: text('email').notNull().unique(),
//   emailToVerify: text('email_to_verify'),
//   name: text('name').notNull(),
//   avatar: text('avatar'),
//   githubId: integer('github_id').unique(),
//   githubToken: text('github_token'),
//   twitchId: text('twitch_id').unique(),
//   twitchToken: text('twitch_token'),
//   verifiedAt: text('verified_at'),
//   createdAt: text('created_at')
//     .notNull()
//     .$defaultFn(() => sql`(current_timestamp)`),
//   updatedAt: text('updated_at')
//     .notNull()
//     .$defaultFn(() => sql`(current_timestamp)`)
//     .$onUpdateFn(() => sql`(current_timestamp)`),
// });

export const domains = sqliteTable('domains', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  status: text('status').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => sql`(unixepoch())`),
  expiredAt: integer('expired_at', { mode: 'timestamp' }).notNull(),
  bill: integer('bill').references(() => bills.id),
  ownedBy: text('owned_by').notNull(),
});

export const emailDomains = sqliteTable('email_domains', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  status: text('status').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => sql`(unixepoch())`),
  expiredAt: integer('expired_at', { mode: 'timestamp' }).notNull(),
  bill: integer('bill').references(() => bills.id),
  ownedBy: text('owned_by').notNull(),
});

export const bills = sqliteTable('bills', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description'),
  status: text('status').notNull(),
  amount: integer('amount').notNull(),
  serviceType: text('service_type').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => sql`(unixepoch())`),
  dueAt: integer('due_at', { mode: 'timestamp' }).notNull(),
  ownedBy: text('owned_by').notNull(),
});

export const webBuilds = sqliteTable('web_builds', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description'),
  status: text('status').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => sql`(unixepoch())`),
  blobPath: text('blob_path').notNull(),
  ownedBy: text('owned_by').notNull(),
});

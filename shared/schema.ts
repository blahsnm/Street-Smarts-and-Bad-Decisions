import { pgTable, serial, varchar, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  isAdmin: boolean('is_admin').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const podcasts = pgTable('podcasts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  coverImage: varchar('cover_image', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const episodes = pgTable('episodes', {
  id: serial('id').primaryKey(),
  podcastId: integer('podcast_id').references(() => podcasts.id).notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  audioUrl: varchar('audio_url', { length: 255 }).notNull(),
  publishedAt: timestamp('published_at').defaultNow(),
});

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  episodeId: integer('episode_id').references(() => episodes.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  url: varchar('url', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }), // image, video, etc.
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});

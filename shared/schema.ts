import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 100 }),
  avatar: text('avatar'),
  plan: varchar('plan', { length: 50 }).default('Free'),
  credits: integer('credits').default(500),
  maxCredits: integer('max_credits').default(1000),
  createdAt: timestamp('created_at').defaultNow()
});

// AI Modes table
export const aiModes = pgTable('ai_modes', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  category: varchar('category', { length: 50 }),
  isActive: integer('is_active').default(1)
});

// Conversations table
export const conversations = pgTable('conversations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  title: varchar('title', { length: 200 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Messages table
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  conversationId: integer('conversation_id').references(() => conversations.id),
  content: text('content').notNull(),
  isUserMessage: integer('is_user_message').default(1),
  modeId: varchar('mode_id', { length: 50 }).references(() => aiModes.id),
  createdAt: timestamp('created_at').defaultNow()
});

// Stats table
export const stats = pgTable('stats', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  interactions: integer('interactions').default(0),
  interactionsChange: integer('interactions_change').default(0),
  credits: integer('credits').default(0),
  creditsChange: integer('credits_change').default(0),
  content: integer('content').default(0),
  contentChange: integer('content_change').default(0),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Zod schemas for insertion
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertAiModeSchema = createInsertSchema(aiModes);
export const insertConversationSchema = createInsertSchema(conversations).omit({ id: true, createdAt: true, updatedAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export const insertStatsSchema = createInsertSchema(stats).omit({ id: true, updatedAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type AIMode = typeof aiModes.$inferSelect;
export type InsertAIMode = z.infer<typeof insertAiModeSchema>;

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Stats = typeof stats.$inferSelect;
export type InsertStats = z.infer<typeof insertStatsSchema>;

// User profile type
export interface UserProfile {
  name: string;
  avatar: string;
  plan: string;
  credits: number;
  maxCredits: number;
}

// Chat response type
export interface ChatResponse {
  message: string;
  mode: string;
}
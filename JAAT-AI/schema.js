/**
 * JAAT-AI Database Schema
 * Defines all database tables and relationships
 */
const { pgTable, serial, varchar, text, timestamp, integer, pgEnum, boolean, json } = require('drizzle-orm/pg-core');
const { relations } = require('drizzle-orm');
const { createInsertSchema } = require('drizzle-zod');
const { z } = require('zod');

// Enums
const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'superadmin']);
const subscriptionTierEnum = pgEnum('subscription_tier', ['free', 'pro', 'enterprise']);
const aiModeStatusEnum = pgEnum('ai_mode_status', ['active', 'deprecated', 'beta']);
const aiModeCategoryEnum = pgEnum('ai_mode_category', ['creative', 'analytic', 'assistant', 'specialized']);

// Users Table
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  role: userRoleEnum('role').notNull().default('user'),
  subscriptionTier: subscriptionTierEnum('subscription_tier').notNull().default('free'),
  credits: integer('credits').notNull().default(100),
  maxCredits: integer('max_credits').notNull().default(100),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  lastLoginAt: timestamp('last_login_at'),
  isActive: boolean('is_active').notNull().default(true),
  settings: json('settings')
});

// AI Modes Table
const aiModes = pgTable('ai_modes', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  category: aiModeCategoryEnum('category').notNull(),
  icon: text('icon').notNull(),
  status: aiModeStatusEnum('status').notNull().default('active'),
  requiredTier: subscriptionTierEnum('required_tier').notNull().default('free'),
  creditCost: integer('credit_cost').notNull().default(1),
  settings: json('settings'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Conversations Table
const conversations = pgTable('conversations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  aiModeId: integer('ai_mode_id').references(() => aiModes.id),
  isArchived: boolean('is_archived').notNull().default(false)
});

// Messages Table
const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  conversationId: integer('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  role: varchar('role', { length: 50 }).notNull(), // 'user', 'assistant', 'system'
  createdAt: timestamp('created_at').notNull().defaultNow(),
  metadata: json('metadata')
});

// Usage Statistics Table
const usageStats = pgTable('usage_stats', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  interactions: integer('interactions').notNull().default(0),
  creditsUsed: integer('credits_used').notNull().default(0),
  contentGenerated: integer('content_generated').notNull().default(0), // in characters
  date: timestamp('date').notNull().defaultNow(),
});

// User API Keys Table
const apiKeys = pgTable('api_keys', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  keyName: varchar('key_name', { length: 100 }).notNull(),
  hashedKey: varchar('hashed_key', { length: 255 }).notNull(),
  lastUsed: timestamp('last_used'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').notNull().default(true)
});

// Relations
const usersRelations = relations(users, ({ many }) => ({
  conversations: many(conversations),
  usageStats: many(usageStats),
  apiKeys: many(apiKeys)
}));

const aiModesRelations = relations(aiModes, ({ many }) => ({
  conversations: many(conversations)
}));

const conversationsRelations = relations(conversations, ({ one, many }) => ({
  user: one(users, {
    fields: [conversations.userId],
    references: [users.id]
  }),
  aiMode: one(aiModes, {
    fields: [conversations.aiModeId],
    references: [aiModes.id]
  }),
  messages: many(messages)
}));

const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id]
  })
}));

const usageStatsRelations = relations(usageStats, ({ one }) => ({
  user: one(users, {
    fields: [usageStats.userId],
    references: [users.id]
  })
}));

const apiKeysRelations = relations(apiKeys, ({ one }) => ({
  user: one(users, {
    fields: [apiKeys.userId],
    references: [users.id]
  })
}));

// Zod Schemas
const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
  username: (schema) => schema.username.min(3).max(20),
  passwordHash: (schema) => schema.passwordHash.min(8),
}).omit({ id: true, createdAt: true, updatedAt: true });

const insertAiModeSchema = createInsertSchema(aiModes, {
  name: (schema) => schema.name.min(2),
  description: (schema) => schema.description.min(10),
}).omit({ id: true, createdAt: true, updatedAt: true });

const insertConversationSchema = createInsertSchema(conversations).omit({ id: true, createdAt: true, updatedAt: true });
const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
const insertUsageStatSchema = createInsertSchema(usageStats).omit({ id: true, date: true });
const insertApiKeySchema = createInsertSchema(apiKeys).omit({ id: true, createdAt: true });

// Export schema
module.exports = {
  users,
  aiModes,
  conversations,
  messages,
  usageStats,
  apiKeys,
  usersRelations,
  aiModesRelations,
  conversationsRelations,
  messagesRelations,
  usageStatsRelations,
  apiKeysRelations,
  insertUserSchema,
  insertAiModeSchema,
  insertConversationSchema,
  insertMessageSchema,
  insertUsageStatSchema,
  insertApiKeySchema
};
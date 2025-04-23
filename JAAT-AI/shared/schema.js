/**
 * JAAT-AI Database Schema
 * This file defines the PostgreSQL database schema for the JAAT-AI application
 */

const { pgTable, serial, text, timestamp, integer, boolean, jsonb } = require('drizzle-orm/pg-core');
const { relations } = require('drizzle-orm');

// Users table - Store user information
exports.users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: text('full_name'),
  avatar: text('avatar'),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  role: text('role').default('user').notNull(),
  creditBalance: integer('credit_balance').default(10).notNull(),
  planType: text('plan_type').default('free').notNull()
});

// AI Modes - Define available AI interaction modes
exports.aiModes = pgTable('ai_modes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  category: text('category').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  isDefault: boolean('is_default').default(false),
  isPremium: boolean('is_premium').default(false),
  systemPrompt: text('system_prompt').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Conversations - Store chat conversation metadata
exports.conversations = pgTable('conversations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => exports.users.id, { onDelete: 'cascade' }),
  title: text('title').default('New Conversation'),
  modeId: integer('mode_id').references(() => exports.aiModes.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isArchived: boolean('is_archived').default(false)
});

// Messages - Store individual chat messages
exports.messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  conversationId: integer('conversation_id').notNull().references(() => exports.conversations.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  isUserMessage: boolean('is_user_message').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  creditsCost: integer('credits_cost').default(0)
});

// User Stats - Track user activity statistics
exports.userStats = pgTable('user_stats', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => exports.users.id, { onDelete: 'cascade' }),
  totalInteractions: integer('total_interactions').default(0).notNull(),
  totalCreditsUsed: integer('total_credits_used').default(0).notNull(),
  totalContentGenerated: integer('total_content_generated').default(0).notNull(),
  lastInteractionAt: timestamp('last_interaction_at'),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// User Settings - User preferences
exports.userSettings = pgTable('user_settings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => exports.users.id, { onDelete: 'cascade' }),
  theme: text('theme').default('dark').notNull(),
  language: text('language').default('en').notNull(),
  notifications: boolean('notifications').default(true).notNull(),
  defaultModeId: integer('default_mode_id').references(() => exports.aiModes.id),
  interfaceLayout: text('interface_layout').default('default'),
  holographicEffects: boolean('holographic_effects').default(true),
  settings: jsonb('settings').default({})
});

// Subscription Plans
exports.subscriptionPlans = pgTable('subscription_plans', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
  monthlyPrice: integer('monthly_price').notNull(),
  yearlyPrice: integer('yearly_price').notNull(),
  creditsPerMonth: integer('credits_per_month').notNull(),
  features: jsonb('features').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// User Subscriptions
exports.userSubscriptions = pgTable('user_subscriptions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => exports.users.id, { onDelete: 'cascade' }),
  planId: integer('plan_id').notNull().references(() => exports.subscriptionPlans.id),
  startDate: timestamp('start_date').defaultNow().notNull(),
  endDate: timestamp('end_date'),
  status: text('status').default('active').notNull(),
  isYearly: boolean('is_yearly').default(false).notNull(),
  paymentMethod: text('payment_method'),
  lastPaymentDate: timestamp('last_payment_date'),
  nextPaymentDate: timestamp('next_payment_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// AI Features
exports.aiFeatures = pgTable('ai_features', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  category: text('category').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  isPremium: boolean('is_premium').default(false),
  configOptions: jsonb('config_options').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// User Feature Settings
exports.userFeatureSettings = pgTable('user_feature_settings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => exports.users.id, { onDelete: 'cascade' }),
  featureId: integer('feature_id').notNull().references(() => exports.aiFeatures.id),
  isEnabled: boolean('is_enabled').default(true).notNull(),
  config: jsonb('config').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Payment Transactions
exports.paymentTransactions = pgTable('payment_transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => exports.users.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(),
  currency: text('currency').default('USD').notNull(),
  status: text('status').notNull(),
  paymentMethod: text('payment_method').notNull(),
  paymentIntentId: text('payment_intent_id'),
  subscriptionId: integer('subscription_id').references(() => exports.userSubscriptions.id),
  creditsPurchased: integer('credits_purchased'),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Define relations between tables
exports.usersRelations = relations(exports.users, ({ many }) => ({
  conversations: many(exports.conversations),
  userStats: many(exports.userStats),
  userSettings: many(exports.userSettings),
  subscriptions: many(exports.userSubscriptions),
  featureSettings: many(exports.userFeatureSettings),
  paymentTransactions: many(exports.paymentTransactions)
}));

exports.aiModesRelations = relations(exports.aiModes, ({ many }) => ({
  conversations: many(exports.conversations),
  defaultSettings: many(exports.userSettings)
}));

exports.conversationsRelations = relations(exports.conversations, ({ one, many }) => ({
  user: one(exports.users, {
    fields: [exports.conversations.userId],
    references: [exports.users.id]
  }),
  mode: one(exports.aiModes, {
    fields: [exports.conversations.modeId],
    references: [exports.aiModes.id]
  }),
  messages: many(exports.messages)
}));

exports.messagesRelations = relations(exports.messages, ({ one }) => ({
  conversation: one(exports.conversations, {
    fields: [exports.messages.conversationId],
    references: [exports.conversations.id]
  })
}));

exports.userStatsRelations = relations(exports.userStats, ({ one }) => ({
  user: one(exports.users, {
    fields: [exports.userStats.userId],
    references: [exports.users.id]
  })
}));

exports.userSettingsRelations = relations(exports.userSettings, ({ one }) => ({
  user: one(exports.users, {
    fields: [exports.userSettings.userId],
    references: [exports.users.id]
  }),
  defaultMode: one(exports.aiModes, {
    fields: [exports.userSettings.defaultModeId],
    references: [exports.aiModes.id]
  })
}));

exports.subscriptionPlansRelations = relations(exports.subscriptionPlans, ({ many }) => ({
  userSubscriptions: many(exports.userSubscriptions)
}));

exports.userSubscriptionsRelations = relations(exports.userSubscriptions, ({ one, many }) => ({
  user: one(exports.users, {
    fields: [exports.userSubscriptions.userId],
    references: [exports.users.id]
  }),
  plan: one(exports.subscriptionPlans, {
    fields: [exports.userSubscriptions.planId],
    references: [exports.subscriptionPlans.id]
  }),
  paymentTransactions: many(exports.paymentTransactions)
}));

exports.aiFeaturesRelations = relations(exports.aiFeatures, ({ many }) => ({
  userFeatureSettings: many(exports.userFeatureSettings)
}));

exports.userFeatureSettingsRelations = relations(exports.userFeatureSettings, ({ one }) => ({
  user: one(exports.users, {
    fields: [exports.userFeatureSettings.userId],
    references: [exports.users.id]
  }),
  feature: one(exports.aiFeatures, {
    fields: [exports.userFeatureSettings.featureId],
    references: [exports.aiFeatures.id]
  })
}));

exports.paymentTransactionsRelations = relations(exports.paymentTransactions, ({ one }) => ({
  user: one(exports.users, {
    fields: [exports.paymentTransactions.userId],
    references: [exports.users.id]
  }),
  subscription: one(exports.userSubscriptions, {
    fields: [exports.paymentTransactions.subscriptionId],
    references: [exports.userSubscriptions.id]
  })
}));
/**
 * Drizzle ORM configuration for database migrations
 */
require('dotenv').config();

/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: './schema.js',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
};
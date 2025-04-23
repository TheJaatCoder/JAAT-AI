import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import * as schema from "../shared/schema";
import ws from 'ws';

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

// Create initial tables for our schema
async function setup() {
  console.log("Creating database tables...");
  
  try {
    // Create users table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        name VARCHAR(100),
        email VARCHAR(100),
        avatar TEXT,
        plan VARCHAR(50) DEFAULT 'Free',
        credits INTEGER DEFAULT 500,
        max_credits INTEGER DEFAULT 1000,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create AI modes table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS ai_modes (
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        icon VARCHAR(50),
        category VARCHAR(50),
        is_active INTEGER DEFAULT 1
      )
    `);

    // Create conversations table 
    await db.execute(`
      CREATE TABLE IF NOT EXISTS conversations (
        id SERIAL PRIMARY KEY NOT NULL,
        user_id INTEGER REFERENCES users(id),
        title VARCHAR(200),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create messages table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY NOT NULL,
        conversation_id INTEGER REFERENCES conversations(id),
        content TEXT NOT NULL,
        is_user_message INTEGER DEFAULT 1,
        mode_id VARCHAR(50) REFERENCES ai_modes(id),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create stats table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS stats (
        id SERIAL PRIMARY KEY NOT NULL,
        user_id INTEGER REFERENCES users(id),
        interactions INTEGER DEFAULT 0,
        interactions_change INTEGER DEFAULT 0,
        credits INTEGER DEFAULT 0,
        credits_change INTEGER DEFAULT 0,
        content INTEGER DEFAULT 0,
        content_change INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("Database tables created successfully!");
  } catch (error) {
    console.error("Error setting up database:", error);
  } finally {
    // Clean up the connection
    await pool.end();
  }
}

setup();
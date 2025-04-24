/**
 * JAAT-AI Database Connection
 * Sets up a PostgreSQL connection using Drizzle ORM
 */
const { Pool } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-serverless');
const schema = require('./schema');
const { sql } = require('drizzle-orm');
require('dotenv').config();

// Make sure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL must be set in environment or .env file');
  process.exit(1);
}

// Create connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create Drizzle instance with schema
const db = drizzle(pool, { schema });

/**
 * Initialize database and setup
 */
async function initializeDatabase() {
  try {
    console.log('Initializing database connection...');

    // Test connection
    const result = await db.execute(sql`SELECT NOW()`);
    console.log('Database connected successfully at:', result[0].now);

    // Check if tables exist by querying users table
    const userCount = await db.select({ count: sql`count(*)` }).from(schema.users);
    
    if (parseInt(userCount[0].count) === 0) {
      console.log('No users found. Seeding initial data...');
      await seedInitialData();
    }

    console.log('Database initialization complete');
    return db;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

/**
 * Seed initial data for a new database
 */
async function seedInitialData() {
  try {
    console.log('Adding initial admin user...');
    
    // Create admin user (using passwordHash for 'admin123' - this should be generated with bcrypt in production)
    await db.insert(schema.users).values({
      username: 'admin',
      email: 'admin@jaat-ai.com',
      passwordHash: '$2b$10$CjKfEQ7qHw4PjiVdjJvXGej3lpQyghDr36HxA0z0v7NS.K2pKrIBe', // admin123
      name: 'JAAT-AI Admin',
      role: 'admin',
      subscriptionTier: 'enterprise',
      credits: 10000,
      maxCredits: 10000,
      avatar: 'https://avatars.githubusercontent.com/u/123456?v=4',
      isActive: true,
      settings: { theme: 'dark', enableHolographicEffects: true }
    });
    
    console.log('Adding AI modes...');
    
    // Add AI modes
    const modes = [
      {
        slug: 'general-assistant',
        name: 'General Assistant',
        description: 'All-purpose AI assistant for everyday questions and tasks',
        category: 'assistant',
        icon: 'robot',
        status: 'active',
        requiredTier: 'free',
        creditCost: 1
      },
      {
        slug: 'creative-writer',
        name: 'Creative Writer',
        description: 'Specialized for creative writing, storytelling, and content creation',
        category: 'creative',
        icon: 'pencil',
        status: 'active',
        requiredTier: 'free',
        creditCost: 2
      },
      {
        slug: 'code-expert',
        name: 'Code Expert',
        description: 'Technical expert for programming and development questions',
        category: 'specialized',
        icon: 'code',
        status: 'active',
        requiredTier: 'pro',
        creditCost: 3
      },
      {
        slug: 'data-analyst',
        name: 'Data Analyst',
        description: 'Analyze and visualize data, generate insights and stats',
        category: 'analytic',
        icon: 'bar-chart',
        status: 'active',
        requiredTier: 'pro',
        creditCost: 3
      },
      {
        slug: 'advanced-reasoning',
        name: 'Advanced Reasoning',
        description: 'Complex problem solving and logical reasoning capabilities',
        category: 'specialized',
        icon: 'brain',
        status: 'active',
        requiredTier: 'enterprise',
        creditCost: 5
      }
    ];
    
    // Insert modes in batches
    for (const mode of modes) {
      await db.insert(schema.aiModes).values(mode);
    }
    
    console.log('Initial data seeding complete');
  } catch (error) {
    console.error('Error seeding initial data:', error);
    throw error;
  }
}

module.exports = {
  db,
  pool,
  initializeDatabase
};
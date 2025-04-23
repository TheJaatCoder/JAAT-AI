/**
 * JAAT-AI Database Connection
 * Sets up a PostgreSQL connection using Drizzle ORM
 */

const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const schema = require('../shared/schema');
const { migrate } = require('drizzle-orm/node-postgres/migrator');
const fs = require('fs');
const path = require('path');

// Get database connection URL from environment variables or use default
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/jaat_ai';

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Create Drizzle ORM instance with our schema
const db = drizzle(pool, { schema });

// Initialize database - create tables if they don't exist
async function initializeDatabase() {
  try {
    // Create migrations directory if it doesn't exist
    const migrationsDir = path.join(__dirname, '../migrations');
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
    }

    // Run migrations
    console.log('Running database migrations...');
    await migrate(db, { migrationsFolder: migrationsDir });
    console.log('Database migrations completed successfully');

    // Seed initial data if database is empty
    await seedInitialData();

    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}

// Seed initial data for the application
async function seedInitialData() {
  try {
    // Check if we have any AI modes
    const existingModes = await db.select().from(schema.aiModes).limit(1);
    
    // If no AI modes exist, seed the initial data
    if (existingModes.length === 0) {
      console.log('Seeding initial data...');

      // Insert default AI modes
      await db.insert(schema.aiModes).values([
        {
          name: 'Content Writer',
          description: 'Generate high-quality content for blogs, articles, and marketing materials',
          icon: 'fa-solid fa-pen-nib',
          category: 'Creative',
          isDefault: true,
          isPremium: false,
          systemPrompt: 'You are a professional content writer who creates engaging and informative content. Respond in a conversational, informative tone.'
        },
        {
          name: 'Code Assistant',
          description: 'Get help with programming, debugging, and code optimization',
          icon: 'fa-solid fa-code',
          category: 'Development',
          isDefault: false,
          isPremium: false,
          systemPrompt: 'You are a code assistant AI who helps with programming issues. Provide clear, well-documented code examples and explanations.'
        },
        {
          name: 'Creative',
          description: 'Explore creative writing, storytelling, and imaginative content generation',
          icon: 'fa-solid fa-lightbulb',
          category: 'Creative',
          isDefault: false,
          isPremium: false,
          systemPrompt: 'You are a creative AI who excels at generating stories, poems, and other creative content. Be imaginative and inspiring.'
        },
        {
          name: 'Data Analysis',
          description: 'Analyze data, generate insights, and create visualization suggestions',
          icon: 'fa-solid fa-chart-pie',
          category: 'Analytics',
          isDefault: false,
          isPremium: true,
          systemPrompt: 'You are a data analysis expert who helps analyze data, interpret results, and generate insights. Provide clear explanations of analytical concepts.'
        },
        {
          name: 'Image Generation',
          description: 'Create detailed text prompts for AI image generation',
          icon: 'fa-solid fa-image',
          category: 'Creative',
          isDefault: false,
          isPremium: true,
          systemPrompt: 'You are an expert at creating detailed image generation prompts. Help users describe their visual ideas with specific details for AI image generators.'
        },
        {
          name: 'Legal Analyst',
          description: 'Get help understanding legal concepts and documents',
          icon: 'fa-solid fa-gavel',
          category: 'Professional',
          isDefault: false,
          isPremium: true,
          systemPrompt: 'You are a legal analyst who helps explain legal concepts, terminology, and documents. Provide clear explanations while noting you don\'t provide legal advice.'
        },
        {
          name: 'Medical Advisor',
          description: 'Learn about health topics and medical information',
          icon: 'fa-solid fa-stethoscope',
          category: 'Professional',
          isDefault: false,
          isPremium: true,
          systemPrompt: 'You are a medical advisor AI who helps explain health concepts and medical information. Always note that you don\'t provide medical advice or diagnosis.'
        },
        {
          name: 'Scientific Research',
          description: 'Explore scientific topics and get help with research questions',
          icon: 'fa-solid fa-flask',
          category: 'Education',
          isDefault: false,
          isPremium: true,
          systemPrompt: 'You are a scientific research assistant who helps explain scientific concepts, methodology, and findings. Provide evidence-based explanations.'
        },
        {
          name: 'Financial Advisor',
          description: 'Get guidance on financial planning and understanding financial concepts',
          icon: 'fa-solid fa-money-bill-wave',
          category: 'Professional',
          isDefault: false,
          isPremium: true,
          systemPrompt: 'You are a financial advisor AI who helps explain financial concepts and strategies. Note that you don\'t provide specific investment advice.'
        }
      ]);

      // Insert subscription plans
      await db.insert(schema.subscriptionPlans).values([
        {
          name: 'Free',
          description: 'Basic access with limited features',
          monthlyPrice: 0,
          yearlyPrice: 0,
          creditsPerMonth: 100,
          features: JSON.stringify([
            'Access to basic AI modes',
            'Limited to 100 credits per month',
            'Standard response speed',
            'Basic holographic UI effects'
          ])
        },
        {
          name: 'Pro',
          description: 'Enhanced access with more features and credits',
          monthlyPrice: 1499, // $14.99
          yearlyPrice: 14999, // $149.99
          creditsPerMonth: 1000,
          features: JSON.stringify([
            'Access to all AI modes',
            '1000 credits per month',
            'Priority response speed',
            'Advanced holographic UI effects',
            'Access to premium features',
            'Download chat history'
          ])
        },
        {
          name: 'Enterprise',
          description: 'Full access with unlimited features and custom solutions',
          monthlyPrice: 4999, // $49.99
          yearlyPrice: 49999, // $499.99
          creditsPerMonth: 5000,
          features: JSON.stringify([
            'Access to all AI modes',
            '5000 credits per month',
            'Fastest response speed',
            'Ultimate holographic UI experience',
            'Access to all premium features',
            'API access',
            'Custom AI mode creation',
            'Dedicated support'
          ])
        }
      ]);

      // Insert AI features
      await db.insert(schema.aiFeatures).values([
        {
          name: 'Voice Recognition',
          description: 'Speak to your AI assistant with voice commands',
          icon: 'fa-solid fa-microphone',
          category: 'Input',
          isPremium: true
        },
        {
          name: 'Multi-Language Support',
          description: 'Interact with AI in multiple languages',
          icon: 'fa-solid fa-language',
          category: 'Accessibility',
          isPremium: false
        },
        {
          name: 'AI Personalization',
          description: 'Customize AI personality and behavior',
          icon: 'fa-solid fa-user-gear',
          category: 'Customization',
          isPremium: true
        },
        {
          name: 'Image Style Transfer',
          description: 'Apply artistic styles to your images',
          icon: 'fa-solid fa-wand-magic-sparkles',
          category: 'Creative',
          isPremium: true
        }
      ]);

      console.log('Initial data seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
}

// Export database connection and initialization function
module.exports = {
  db,
  pool,
  initializeDatabase
};
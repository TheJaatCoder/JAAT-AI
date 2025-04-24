/**
 * JAAT-AI Server
 * Express-based server with API routes for the JAAT-AI platform
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const PgStore = require('connect-pg-simple')(session);
const helmet = require('helmet');
const compression = require('compression');
const { initializeDatabase, pool } = require('./database');
require('dotenv').config();

// Create Express app
const app = express();

// Port configuration
const PORT = process.env.HTTP_PORT || 5001; // Using port 5001 to avoid conflict with template server
const DOMAIN = process.env.DOMAIN || 'localhost';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

// Security headers (with exceptions for holographic UI components)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "https://avatars.githubusercontent.com", "https://*.githubusercontent.com"],
        connectSrc: ["'self'", "https://*.githubusercontent.com"],
      },
    },
  })
);

// Session management
app.use(
  session({
    store: new PgStore({
      pool,
      tableName: 'user_sessions',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || 'jaat-ai-secure-session-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API Routes
const apiRouter = express.Router();

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// AI Modes endpoint
apiRouter.get('/modes', async (req, res) => {
  try {
    // Temporary hardcoded AI modes while database is not initialized
    const modes = [
      {
        id: 'chatgpt',
        name: 'ChatGPT Style',
        description: 'All-purpose AI assistant for everyday questions and tasks',
        icon: 'robot',
        category: 'assistant',
        status: 'active',
        requiredTier: 'free',
        creditCost: 1
      },
      {
        id: 'code',
        name: 'Code Assistant',
        description: 'Technical expert for programming and development questions',
        icon: 'code',
        category: 'specialized',
        status: 'active',
        requiredTier: 'pro',
        creditCost: 3
      },
      {
        id: 'content',
        name: 'Content Writer',
        description: 'Specialized for creative writing, storytelling, and content creation',
        icon: 'pencil',
        category: 'creative',
        status: 'active',
        requiredTier: 'free',
        creditCost: 2
      },
      {
        id: 'character',
        name: 'Character AI',
        description: 'Creative writing assistant for character development and role-playing',
        icon: 'theater-masks',
        category: 'creative',
        status: 'active',
        requiredTier: 'pro',
        creditCost: 3
      },
      {
        id: 'knowledge',
        name: 'Knowledge',
        description: 'Research assistant with factual, well-referenced information',
        icon: 'brain',
        category: 'specialized',
        status: 'active',
        requiredTier: 'enterprise',
        creditCost: 5
      }
    ];
    
    res.status(200).json(modes);
  } catch (error) {
    console.error('Error fetching AI modes:', error);
    res.status(500).json({ error: 'Failed to fetch AI modes' });
  }
});

// Chat endpoint
apiRouter.post('/chat', async (req, res) => {
  try {
    const { message, modeId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Get mode name based on modeId
    let modeName = 'ChatGPT Style';
    let systemPrompt = 'You are a helpful AI assistant.';
    
    // Determine the system prompt based on the mode
    switch(modeId) {
      case 'chatgpt':
        modeName = 'ChatGPT Style';
        systemPrompt = 'You are a helpful AI assistant.';
        break;
      case 'code':
        modeName = 'Code Assistant';
        systemPrompt = 'You are a programming expert. Provide concise, accurate code and explanations.';
        break;
      case 'content':
        modeName = 'Content Writer';
        systemPrompt = 'You are a content creation expert. Create well-structured, engaging content optimized for SEO.';
        break;
      case 'character':
        modeName = 'Character AI';
        systemPrompt = 'You are a creative writing assistant. Respond in character based on the user\'s requests.';
        break;
      case 'knowledge':
        modeName = 'Knowledge';
        systemPrompt = 'You are a research assistant. Provide factual, well-referenced information on any topic.';
        break;
      default:
        modeName = 'ChatGPT Style';
        systemPrompt = 'You are a helpful AI assistant.';
    }
    
    try {
      const OpenAI = require('openai');
      
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORGANIZATION_ID
      });
      
      // Use OpenAI to generate a response
      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });
      
      const response = {
        message: completion.choices[0].message.content,
        mode: modeName,
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError);
      
      // Fallback to simulated response
      const response = {
        message: `This is a response from ${modeName} mode. Your message was: "${message}"`,
        mode: modeName,
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    }
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

// Stats endpoint
apiRouter.get('/stats', (req, res) => {
  // Return simulated stats
  res.status(200).json({
    interactions: 1254,
    interactionsChange: 23,
    credits: 347,
    creditsChange: -12,
    content: 45321,
    contentChange: 1543
  });
});

// Profile endpoint
apiRouter.get('/profile', (req, res) => {
  // Return user profile
  res.status(200).json({
    name: "John Doe",
    avatar: "https://avatars.githubusercontent.com/u/123456?v=4",
    plan: "Premium",
    credits: 347,
    maxCredits: 1000
  });
});

// Config endpoints for AI services
apiRouter.get('/config/openai', (req, res) => {
  // Return safe configuration without API key
  res.status(200).json({
    organization: process.env.OPENAI_ORGANIZATION_ID || null,
    // Never return the full API key to the client
    hasApiKey: !!process.env.OPENAI_API_KEY
  });
});

apiRouter.get('/config/anthropic', (req, res) => {
  // Return safe configuration without API key
  res.status(200).json({
    // Never return the full API key to the client
    hasApiKey: !!process.env.ANTHROPIC_API_KEY
  });
});

apiRouter.get('/config/gemini', (req, res) => {
  // Return safe configuration without API key
  res.status(200).json({
    // Never return the full API key to the client
    hasApiKey: !!process.env.GEMINI_API_KEY
  });
});

// OpenAI proxy endpoint for sending requests server-side
apiRouter.post('/openai/:endpoint(*)', async (req, res) => {
  try {
    const endpoint = req.params.endpoint;
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }
    
    const url = `https://api.openai.com/v1/${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Organization': process.env.OPENAI_ORGANIZATION_ID || ''
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return res.status(response.status).json(data);
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error proxying to OpenAI:', error);
    res.status(500).json({ error: 'Failed to proxy request to OpenAI' });
  }
});

// Anthropic proxy endpoint for sending requests server-side
apiRouter.post('/anthropic/:endpoint(*)', async (req, res) => {
  try {
    const endpoint = req.params.endpoint;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Anthropic API key not configured' });
    }
    
    const url = `https://api.anthropic.com/v1/${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(response.status).json(data);
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error proxying to Anthropic:', error);
    res.status(500).json({ error: 'Failed to proxy request to Anthropic' });
  }
});

// Gemini proxy endpoint for sending requests server-side
apiRouter.post('/gemini/:endpoint(*)', async (req, res) => {
  try {
    const endpoint = req.params.endpoint;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/${endpoint}?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Gemini API error:', data);
      return res.status(response.status).json(data);
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error proxying to Gemini:', error);
    res.status(500).json({ error: 'Failed to proxy request to Gemini' });
  }
});

// Gemini image analysis endpoint (handles image URL to base64 conversion)
apiRouter.post('/gemini/analyze', async (req, res) => {
  try {
    const { imageUrl, prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }
    
    // Here we would fetch the image and convert to base64
    // This is just a placeholder implementation
    
    res.status(200).json({
      text: `Analysis of image at ${imageUrl} with prompt: ${prompt}`
    });
  } catch (error) {
    console.error('Error analyzing image with Gemini:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

// Register API routes
app.use('/api', apiRouter);

// Serve the dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Any other route not matched by the API or static files will serve the dashboard
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Initialize database and start server
async function startServer() {
  try {
    // Temporarily skip database initialization to focus on AI integration
    // await initializeDatabase();
    console.log('Database initialization skipped for development');
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✨ JAAT-AI server running at http://localhost:${PORT}`);
      console.log(`✨ In production, this will be accessible at https://${DOMAIN}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
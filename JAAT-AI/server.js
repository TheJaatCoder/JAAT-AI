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
const PORT = process.env.HTTP_PORT || 5000;
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
    const { db } = require('./database');
    const { aiModes } = require('./schema');
    
    const modes = await db.select().from(aiModes);
    res.status(200).json(modes);
  } catch (error) {
    console.error('Error fetching AI modes:', error);
    res.status(500).json({ error: 'Failed to fetch AI modes' });
  }
});

// Chat endpoint
apiRouter.post('/chat', (req, res) => {
  try {
    const { message, modeId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Generate a simulated response
    setTimeout(() => {
      const response = {
        message: `You said: "${message}".\nThis is a simulated response from the JAAT-AI server.`,
        mode: modeId || 'general-assistant',
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    }, 500); // Simulate processing time
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
    await initializeDatabase();
    
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
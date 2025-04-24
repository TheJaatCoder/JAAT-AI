import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Create ES module compatible __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create the Express app
const app = express();
const port = parseInt(process.env.PORT || "5000", 10);

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve JAAT-AI dashboard static files
app.use('/css', express.static(path.join(__dirname, '../JAAT-AI/css')));
app.use('/js', express.static(path.join(__dirname, '../JAAT-AI/js')));
app.use('/assets', express.static(path.join(__dirname, '../JAAT-AI/assets')));
app.use('/fonts', express.static(path.join(__dirname, '../JAAT-AI/fonts')));
app.use('/images', express.static(path.join(__dirname, '../JAAT-AI/images')));

// API routes
const apiRouter = express.Router();

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// AI Modes endpoint
apiRouter.get('/modes', async (req, res) => {
  try {
    // Temporary hardcoded AI modes (would come from database in production)
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

// Chat endpoint
apiRouter.post('/chat', async (req, res) => {
  try {
    const { message, modeId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Process the message through the selected AI mode
    // This is where we would route to different AI providers based on the mode
    
    const response = {
      message: `This is a simulated response to: "${message}"`,
      mode: modeId || 'default',
      timestamp: new Date().toISOString()
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// FastSpring config endpoint
apiRouter.get('/config/fastspring', (req, res) => {
  // Return safe configuration without API credentials
  const FASTSPRING_USERNAME = process.env.FASTSPRING_USERNAME || 'RHQQREB9QBARNLGHSZW3LG';
  const FASTSPRING_PASSWORD = process.env.FASTSPRING_PASSWORD || 'vGF65678SomKEBc5wXJr7w';
  
  res.status(200).json({
    available: !!FASTSPRING_USERNAME && !!FASTSPRING_PASSWORD,
    storeId: 'jaat-ai',
    testMode: process.env.NODE_ENV !== 'production'
  });
});

// Register API routes
app.use('/api', apiRouter);

// Serve JAAT-AI dashboard HTML for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../JAAT-AI/dashboard.html'));
});

// Fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../JAAT-AI/dashboard.html'));
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server started. Serving JAAT-AI dashboard on port ${port}`);
  console.log(`Access the dashboard at http://localhost:${port}/`);
  console.log(`Access the API at http://localhost:${port}/api`);
});
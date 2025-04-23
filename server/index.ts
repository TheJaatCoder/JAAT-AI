import express from 'express';
import session from 'express-session';
import { setupRoutes } from './routes';
import { storage } from './storage';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Setup session middleware
app.use(
  session({
    secret: 'jaat-ai-session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  })
);

// JSON body parser
app.use(express.json());

// Static files from client/public
app.use(express.static(path.join(process.cwd(), 'client', 'public')));

// Setup API routes
setupRoutes(app, storage);

// For all other routes, serve the index.html
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // Serve the index.html for client-side routing
  res.sendFile(path.resolve(process.cwd(), 'client', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started. Serving on port ${PORT}`);
  console.log(`Access the application at http://localhost:${PORT}`);
});
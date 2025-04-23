import { Express } from 'express';
import { IStorage } from './storage';

export function setupRoutes(app: Express, storage: IStorage) {
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Get all AI modes
  app.get('/api/modes', async (req, res) => {
    try {
      const modes = await storage.getModes();
      res.json(modes);
    } catch (error) {
      console.error('Error fetching modes:', error);
      res.status(500).json({ error: 'Failed to fetch AI modes' });
    }
  });

  // Get user stats
  app.get('/api/stats', async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Failed to fetch user stats' });
    }
  });

  // Send a message to AI
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, modeId } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }
      
      const response = await storage.sendMessage(message, modeId);
      res.json(response);
    } catch (error) {
      console.error('Error in chat:', error);
      res.status(500).json({ error: 'Failed to process message' });
    }
  });

  // Get user profile
  app.get('/api/profile', async (req, res) => {
    try {
      const profile = await storage.getUserProfile();
      res.json(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  });
}
/**
 * JAAT-AI Server with MongoDB Integration
 * This file handles the Node.js server with MongoDB integration
 */

// Load environment variables
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jaat-ai';
const SESSION_SECRET = process.env.SESSION_SECRET || 'jaat-ai-secret-key';
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session with MongoDB store
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    ttl: 14 * 24 * 60 * 60, // 14 days
    autoRemove: 'native'
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days in milliseconds
    secure: process.env.NODE_ENV === 'production'
  }
}));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  settings: {
    theme: { type: String, default: 'dark' },
    language: { type: String, default: 'en' },
    notifications: { type: Boolean, default: true }
  },
  subscription: {
    plan: { type: String, default: 'free' },
    validUntil: Date
  },
  lastLogin: Date
});

const User = mongoose.model('User', userSchema);

// Define Chat Schema and Model
const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mode: { type: String, default: 'default' },
  createdAt: { type: Date, default: Date.now },
  messages: [{
    isUser: { type: Boolean, default: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }]
});

const Chat = mongoose.model('Chat', chatSchema);

// API Routes

// User authentication routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    
    // Create new user
    const user = new User({
      username,
      email,
      password, // In production, hash the password
      lastLogin: new Date()
    });
    
    await user.save();
    
    // Set session
    req.session.userId = user._id;
    
    // Return user info (excluding password)
    const userObject = user.toObject();
    delete userObject.password;
    
    res.status(201).json(userObject);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Check password (in production, verify hash)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Set session
    req.session.userId = user._id;
    
    // Return user info (excluding password)
    const userObject = user.toObject();
    delete userObject.password;
    
    res.json(userObject);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});

app.get('/api/user', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Return user info (excluding password)
    const userObject = user.toObject();
    delete userObject.password;
    
    res.json(userObject);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Chat routes
app.post('/api/chats', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const { mode } = req.body;
    
    const chat = new Chat({
      userId: req.session.userId,
      mode,
      messages: []
    });
    
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error('Create chat error:', error);
    res.status(500).json({ error: 'Failed to create chat' });
  }
});

app.get('/api/chats', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const chats = await Chat.find({ userId: req.session.userId }).sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    console.error('Get chats error:', error);
    res.status(500).json({ error: 'Failed to get chats' });
  }
});

app.get('/api/chats/:id', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.session.userId });
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    
    res.json(chat);
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json({ error: 'Failed to get chat' });
  }
});

app.post('/api/chats/:id/messages', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const { text, isUser } = req.body;
    
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.session.userId });
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    
    chat.messages.push({
      isUser,
      text,
      timestamp: new Date()
    });
    
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ error: 'Failed to add message' });
  }
});

// User settings routes
app.put('/api/user/settings', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const { theme, language, notifications } = req.body;
    
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update settings
    if (theme) user.settings.theme = theme;
    if (language) user.settings.language = language;
    if (notifications !== undefined) user.settings.notifications = notifications;
    
    await user.save();
    
    // Return updated settings
    res.json(user.settings);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`JAAT-AI server listening on port ${PORT}`);
  });
}

module.exports = { app, User, Chat };
/**
 * JAAT-AI Server (CommonJS version)
 * Simple Express server to serve the JAAT-AI application
 * 
 * Made with ❤️ by Rohit Sangwan
 * support@jaat-ai.com
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve status endpoint for health checks
app.get('/status', (req, res) => {
  res.json({
    status: 'online',
    version: '1.0.0',
    serverTime: new Date().toISOString(),
    message: 'JAAT-AI Server is running'
  });
});

// Serve test page
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/test.html'));
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'splash.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Catch-all route to return to homepage
app.use((req, res) => {
  res.redirect('/');
});

// Start the server
console.log('Starting JAAT-AI server...');
app.listen(PORT, '0.0.0.0', () => {
  console.log(`JAAT-AI is running at http://0.0.0.0:${PORT}`);
  console.log(`Made with ❤️ by Rohit Sangwan | support@jaat-ai.com`);
});
/**
 * Simple Express server to view JAAT-AI UI components
 */
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from JAAT-AI directory
app.use('/JAAT-AI', express.static(join(__dirname, 'JAAT-AI')));

// Serve the viewer HTML
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'view-jaat-ai.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`JAAT-AI UI viewer running at http://localhost:${PORT}`);
});
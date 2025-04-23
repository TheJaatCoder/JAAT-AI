/**
 * JAAT-AI Launcher
 * This script starts the JAAT-AI server from any location
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Path to JAAT-AI folder
const jaatAiPath = path.join(__dirname, 'JAAT-AI');

// Check if JAAT-AI folder exists
if (!fs.existsSync(jaatAiPath)) {
  console.error('Error: JAAT-AI folder not found at:', jaatAiPath);
  process.exit(1);
}

console.log('Starting JAAT-AI server from:', jaatAiPath);

// Change to JAAT-AI directory
process.chdir(jaatAiPath);

// Start the JAAT-AI server
const server = spawn('node', ['server.js'], {
  stdio: 'inherit',
  cwd: jaatAiPath
});

// Handle server exit
server.on('exit', (code) => {
  console.log(`JAAT-AI server exited with code: ${code}`);
});

// Handle errors
server.on('error', (err) => {
  console.error('Failed to start JAAT-AI server:', err);
});

console.log('JAAT-AI server launched. Press Ctrl+C to stop.');
/**
 * JAAT-AI Server Launcher
 * This script starts the JAAT-AI server and handles environment setup
 */

require('dotenv').config();
const { spawn } = require('child_process');
const path = require('path');

// Log critical environment check
console.log('\n🔍 Checking environment...');

// Check for required API keys
const requiredKeys = [
  { name: 'OPENAI_API_KEY', label: 'OpenAI API Key' },
  { name: 'ANTHROPIC_API_KEY', label: 'Anthropic API Key' },
  { name: 'GEMINI_API_KEY', label: 'Google Gemini API Key' }
];

let missingKeys = false;
requiredKeys.forEach(key => {
  if (!process.env[key.name]) {
    console.log(`⚠️ Warning: ${key.label} (${key.name}) not found in environment`);
    missingKeys = true;
  } else {
    console.log(`✅ ${key.label} found`);
  }
});

if (missingKeys) {
  console.log('\n⚠️ Some API keys are missing. The server will still start, but some features may not work correctly.');
  console.log('   Edit the .env file to add the missing keys.');
}

// Start the server process
console.log('\n🚀 Starting JAAT-AI server...');
const serverPath = path.join(__dirname, 'server.js');

// Launch server in child process
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: process.env
});

// Handle server close
server.on('close', code => {
  if (code !== 0) {
    console.log(`\n⚠️ Server process exited with code ${code}`);
  }
  process.exit(code);
});

// Handle CTRL+C and other termination signals
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down JAAT-AI server...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down JAAT-AI server...');
  server.kill('SIGTERM');
});
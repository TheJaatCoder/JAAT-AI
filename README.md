# JAAT-AI Viewer

This repository contains the JAAT-AI project, which features an advanced AI-powered dashboard with holographic UI elements.

## Features

- **Modern Dashboard**: ChatGPT-style interface with dark mode and responsive design
- **Holographic UI**: Advanced visual effects including floating particles, data streams, and reflective cards
- **AI Modes**: Multiple specialized AI interaction modes for different tasks
- **PostgreSQL Integration**: Database connectivity for user data, conversations, and settings
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop

## Viewing the Interface

There are multiple ways to access the JAAT-AI interface:

### Option 1: Using the Python server (Recommended)

```bash
# Start the Python server
python serve-jaat-ai.py
```

Then open your browser to [http://localhost:8000](http://localhost:8000)

Use the navigation in the header to switch between:
- Landing Page
- Dashboard

### Option 2: Direct file access

You can also directly access the components through these HTML files:

- **Main Viewer**: `index.html` - Contains the viewer interface with navigation
- **Dashboard Direct**: `dashboard.html` - Direct access to the dashboard
- **Landing Page Direct**: `landing.html` - Direct access to the landing page

### Option 3: JAAT-AI components directly

Access the raw components in the JAAT-AI folder:

- `JAAT-AI/index.html` - Landing page
- `JAAT-AI/dashboard.html` - Dashboard interface

## Project Structure

- `JAAT-AI/`: Main project folder
  - `css/`: Stylesheet files
  - `js/`: JavaScript files including holographic UI effects
  - `index.html`: Landing page
  - `dashboard.html`: Main AI dashboard interface
  - `server.js`: Express server for the full application
  - `database.js`: Database connection and initialization
  - `schema.js`: Database schema definitions
  - `.env`: Environment configuration

- **Root files**:
  - `index.html`: Main viewer interface
  - `dashboard.html`: Direct dashboard access
  - `landing.html`: Direct landing page access
  - `serve-jaat-ai.py`: Python server script
  - `README.md`: This documentation

## Features of the Dashboard

1. **Holographic UI Elements**
   - Floating particles background
   - Data stream animations
   - Glowing, reflective cards
   - Subtle scanning animations

2. **ChatGPT-Style Interface**
   - Sidebar with conversation history
   - Clean message exchange interface
   - User/AI message distinction
   - Multiple AI modes

3. **Dashboard Statistics**
   - AI Interactions metrics
   - Credits monitoring
   - Content generation tracking
   - Visual charts and trends

4. **AI Modes Selection**
   - Mode filtering by category
   - Mode information cards
   - Modal selection interface
   - Tier-based access indicators

## File Links

All files are properly linked together so you can navigate from:
- Main viewer → JAAT-AI components
- Direct access files → Specific JAAT-AI components
- Within JAAT-AI components (dashboard has access to styles and scripts)
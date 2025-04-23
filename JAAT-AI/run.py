"""
JAAT-AI Launcher
This is the main entry point for the JAAT-AI application
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add server directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'server'))

# Import server module
from server.app import app

if __name__ == '__main__':
    # Get port from environment or use default
    port = int(os.environ.get('PORT', 5000))
    
    # Run app
    app.run(host='0.0.0.0', port=port, debug=True)
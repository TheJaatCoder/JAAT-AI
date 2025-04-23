#!/usr/bin/env python3
"""
Simple HTTP server to serve the JAAT-AI interface
"""

import http.server
import socketserver
import os
from pathlib import Path

PORT = 8000

# Set the directory to the current directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Custom request handler to handle directory requests
class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        """Serve a GET request."""
        if self.path == "/":
            self.path = "/index.html"
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

# Create a simple HTTP server
Handler = CustomHTTPRequestHandler
httpd = socketserver.TCPServer(("0.0.0.0", PORT), Handler)

print("\n" + "="*70)
print("  JAAT-AI Viewer Server")
print("="*70)
print(f"\n  Main viewer interface: http://localhost:{PORT}")
print(f"  Direct dashboard: http://localhost:{PORT}/dashboard.html")
print(f"  Direct landing page: http://localhost:{PORT}/landing.html")
print(f"  Documentation: http://localhost:{PORT}/README.md")
print("\n  Use the navigation in the header to switch between pages")
print("  or access the direct links above.")
print("\n  Press Ctrl+C to stop the server.")
print("="*70 + "\n")

try:
    print(f"Starting JAAT-AI server at http://localhost:{PORT}")
    # Serve forever
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
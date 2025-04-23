"""
JAAT-AI Server Application
This module provides the Flask application for JAAT-AI
"""

import os
import json
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

# Configure OpenAI API
openai_api_key = os.environ.get('OPENAI_API_KEY')
if openai_api_key:
    openai.api_key = openai_api_key
    print("OpenAI API key configured successfully.")
else:
    print("Warning: OpenAI API key not found in environment variables.")

# Initialize Flask app
app = Flask(__name__, static_folder='../static', static_url_path='/static')

# Set root directory
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@app.route('/')
def index():
    """Serve the index page"""
    return send_from_directory(ROOT_DIR, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    # First check if file exists in root directory
    file_path = os.path.join(ROOT_DIR, path)
    if os.path.exists(file_path) and not os.path.isdir(file_path):
        return send_from_directory(ROOT_DIR, path)
    
    # Otherwise check parent directory
    parent_dir = os.path.dirname(ROOT_DIR)
    parent_file_path = os.path.join(parent_dir, path)
    if os.path.exists(parent_file_path) and not os.path.isdir(parent_file_path):
        return send_from_directory(parent_dir, path)
    
    # If file not found
    return "File not found", 404

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat requests"""
    try:
        data = request.json
        message = data.get('message')
        mode = data.get('mode', 'default')
        history = data.get('history', [])
        
        # Simple echo response for testing
        if not openai_api_key:
            return jsonify({
                "response": "API key not configured. This is a test response.",
                "mode": mode
            })
        
        # Process with OpenAI if API key is available
        try:
            # Create system message based on mode
            system_message = f"You are JAAT-AI, an advanced AI assistant operating in {mode} mode. Provide helpful, accurate, and detailed responses."
            
            # Format conversation history for OpenAI
            messages = [{"role": "system", "content": system_message}]
            
            # Add history messages
            for entry in history[-10:]:  # Limit to last 10 messages to prevent token limit issues
                messages.append({
                    "role": "user" if entry.get("isUser") else "assistant", 
                    "content": entry.get("text", "")
                })
                
            # Add the new user message
            messages.append({"role": "user", "content": message})
            
            # Call OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-4o",  # Use GPT-4o as it's the latest model (May 13, 2024)
                messages=messages,
                max_tokens=1000,
                temperature=0.7
            )
            
            # Extract response text
            response_text = response.choices[0].message.content
            
            return jsonify({
                "response": response_text,
                "mode": mode
            })
            
        except Exception as e:
            print(f"OpenAI API error: {str(e)}")
            return jsonify({
                "response": f"I'm sorry, but there was an error processing your request. Please try again later. (Error: {str(e)})",
                "mode": mode
            })
    
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/features', methods=['GET'])
def get_features():
    """Get available features"""
    features_dir = os.path.join(ROOT_DIR, 'features')
    modes_dir = os.path.join(ROOT_DIR, 'modes')
    
    features = []
    
    # Get features from features directory
    if os.path.exists(features_dir):
        for filename in os.listdir(features_dir):
            if filename.endswith('.js'):
                feature_name = filename.replace('.js', '').replace('-', ' ').title()
                features.append({
                    "id": filename.replace('.js', ''),
                    "name": feature_name,
                    "type": "feature"
                })
    
    # Get modes from modes directory
    if os.path.exists(modes_dir):
        for filename in os.listdir(modes_dir):
            if filename.endswith('.js'):
                # Extract mode number and name
                mode_parts = filename.replace('.js', '').split('-')
                if len(mode_parts) > 1 and mode_parts[0].startswith('mode'):
                    mode_num = mode_parts[0].replace('mode', '')
                    mode_name = ' '.join(mode_parts[1:]).title()
                    features.append({
                        "id": filename.replace('.js', ''),
                        "name": mode_name,
                        "type": "mode",
                        "number": mode_num
                    })
    
    return jsonify(features)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
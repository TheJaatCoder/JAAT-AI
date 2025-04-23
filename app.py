import os
from flask import Flask, render_template, request, jsonify, send_from_directory
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder="JAAT-AI", static_url_path="")

# Set up OpenAI with the API key from environment
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    print("Warning: OPENAI_API_KEY is not set in the environment. API calls will fail.")
else:
    print("OpenAI API key configured successfully.")
    
# Configure the OpenAI client
client = openai.OpenAI(api_key=openai_api_key)

# Get the model from environment or use default
DEFAULT_MODEL = os.getenv("DEFAULT_MODEL", "gpt-4o")


@app.route('/')
def index():
    """Serve the index page"""
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory(app.static_folder, path)


@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat requests"""
    data = request.json
    
    if not data or 'message' not in data:
        return jsonify({"error": "Message is required"}), 400
    
    user_message = data.get('message', '')
    mode = data.get('mode', 'assistant')
    
    # If OpenAI API key is not set, return a default response
    if not openai_api_key:
        return jsonify({
            "response": "I'm sorry, I can't process your request at the moment. The OpenAI API key is not configured.",
            "mode": mode
        })
    
    try:
        # Call OpenAI API using the client
        response = client.chat.completions.create(
            model=DEFAULT_MODEL,
            messages=[
                {"role": "system", "content": f"You are JAAT-AI, an animated AI assistant in {mode} mode. Provide helpful, accurate, and concise responses."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=500
        )
        
        ai_response = response.choices[0].message.content
        
        return jsonify({
            "response": ai_response,
            "mode": mode
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/features', methods=['GET'])
def get_features():
    """Get available features"""
    # This would typically come from a database
    features = [
        {
            "id": "neural-machine-translation",
            "name": "Neural Machine Translation",
            "description": "Advanced AI-powered translation with neural networks for higher accuracy",
            "icon": "fas fa-language",
            "premium": False
        },
        {
            "id": "advanced-mental-health-chatbot",
            "name": "Mental Health Support",
            "description": "Specialized AI chatbot for mental health support and resources",
            "icon": "fas fa-heart",
            "premium": False
        },
        {
            "id": "social-media-content-creation",
            "name": "Social Media Content Creation",
            "description": "Generate and schedule content for various social media platforms",
            "icon": "fas fa-share-alt",
            "premium": False
        }
    ]
    
    return jsonify(features)


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "ok",
        "message": "JAAT-AI server is running"
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
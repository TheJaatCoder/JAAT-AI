/**
 * JAAT-AI Gemini Service
 * Implements the Google Gemini API service
 */

import AIService from './ai-service.js';

class GeminiService extends AIService {
  /**
   * Initialize the Gemini service
   */
  constructor() {
    super();
    this.providerName = 'Gemini';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
    this.defaultModel = 'gemini-1.5-pro'; // Latest model as of April 2025
  }

  /**
   * Send a message to the Gemini API
   * @param {string} message - The message to send
   * @param {string} [mode='default'] - The AI mode to use
   * @returns {Promise<object>} - The Gemini response
   */
  async sendMessage(message, mode = 'default') {
    if (!this.checkReady()) {
      throw new Error('Gemini service is not ready. API key not set.');
    }

    try {
      // Get the appropriate model and system message for the mode
      const { model, systemMessage } = this.getModeConfig(mode);
      
      const modelPath = model.replace(/\./g, '-');
      
      // Make the API request
      const response = await fetch(`${this.baseUrl}/models/${modelPath}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: `${systemMessage}\n\n${message}` }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            topP: 0.95,
            topK: 40
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Extract the response text
      let responseText = '';
      if (data.candidates && data.candidates.length > 0) {
        const content = data.candidates[0].content;
        if (content && content.parts && content.parts.length > 0) {
          responseText = content.parts[0].text || '';
        }
      }
      
      return {
        text: responseText,
        model: model,
        provider: this.providerName,
        usage: {
          input_tokens: data.usageMetadata?.promptTokenCount || 0,
          output_tokens: data.usageMetadata?.candidatesTokenCount || 0,
          total_tokens: data.usageMetadata?.totalTokenCount || 0
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error in Gemini service:', error);
      throw error;
    }
  }

  /**
   * Get configuration for a specific AI mode
   * @param {string} mode - The AI mode
   * @returns {object} - The mode configuration
   */
  getModeConfig(mode) {
    // Default configuration
    let model = this.defaultModel;
    let systemMessage = 'You are Gemini, a helpful AI assistant developed by Google. Provide thoughtful, detailed responses to the user\'s questions.';
    
    // Configure based on mode
    switch (mode) {
      case 'chatgpt':
        // Use default configuration with Gemini-specific instructions
        systemMessage = 'You are Gemini, a helpful AI assistant developed by Google. Provide thoughtful, detailed responses to the user\'s questions in a conversational style.';
        break;
      
      case 'code':
        model = this.defaultModel;
        systemMessage = 'You are Gemini, a coding expert AI assistant. Provide clear, working code examples and explanations for programming questions. Format code properly using markdown code blocks with the appropriate language syntax.';
        break;
      
      case 'content':
        model = this.defaultModel;
        systemMessage = 'You are Gemini, a creative writing AI assistant. Help the user with writing tasks, providing high-quality, creative content. Consider tone, style, and audience in your responses.';
        break;
      
      case 'character':
        model = this.defaultModel;
        systemMessage = 'You are Gemini, a character-based AI roleplaying assistant. Respond in character based on the context provided by the user. Be creative, consistent, and engaging while maintaining appropriate boundaries.';
        break;
      
      case 'knowledge':
        model = this.defaultModel;
        systemMessage = 'You are Gemini, a knowledgeable AI research assistant. Provide detailed, accurate information with citations where possible. Prioritize factual correctness and academic-style responses.';
        break;
      
      default:
        // Use default configuration for unknown modes
        console.warn(`Unknown mode '${mode}', using default configuration.`);
    }
    
    return { model, systemMessage };
  }

  /**
   * Get available models from Gemini
   * @returns {Promise<Array>} - List of available models
   */
  async getAvailableModels() {
    if (!this.checkReady()) {
      throw new Error('Gemini service is not ready. API key not set.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/models?key=${this.apiKey}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Filter for Gemini models only
      const geminiModels = data.models.filter(model => 
        model.name.includes('gemini')
      );
      
      return geminiModels.map(model => {
        const id = model.name.split('/').pop();
        return {
          id: id,
          name: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' '),
          provider: this.providerName,
          created: new Date().toISOString() // Gemini API doesn't provide creation date
        };
      });
    } catch (error) {
      console.error('Error fetching Gemini models:', error);
      
      // Return a static list as fallback
      return [
        {
          id: 'gemini-1.5-pro',
          name: 'Gemini 1.5 Pro',
          provider: this.providerName,
          created: new Date().toISOString()
        },
        {
          id: 'gemini-1.5-flash',
          name: 'Gemini 1.5 Flash',
          provider: this.providerName,
          created: new Date().toISOString()
        },
        {
          id: 'gemini-1.0-pro',
          name: 'Gemini 1.0 Pro',
          provider: this.providerName,
          created: new Date().toISOString()
        }
      ];
    }
  }
}

// Export the Gemini service
export default GeminiService;
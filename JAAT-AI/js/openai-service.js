/**
 * JAAT-AI OpenAI Service
 * Implements the OpenAI API service
 */

import AIService from './ai-service.js';

class OpenAIService extends AIService {
  /**
   * Initialize the OpenAI service
   */
  constructor() {
    super();
    this.providerName = 'OpenAI';
    this.baseUrl = 'https://api.openai.com/v1';
    this.defaultModel = 'gpt-4o'; // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
  }

  /**
   * Send a message to the OpenAI API
   * @param {string} message - The message to send
   * @param {string} [mode='default'] - The AI mode to use
   * @returns {Promise<object>} - The OpenAI response
   */
  async sendMessage(message, mode = 'default') {
    if (!this.checkReady()) {
      throw new Error('OpenAI service is not ready. API key not set.');
    }

    try {
      // Get the appropriate model and system message for the mode
      const { model, systemMessage } = this.getModeConfig(mode);
      
      // Create the messages array
      const messages = [
        { role: 'system', content: systemMessage },
        { role: 'user', content: message }
      ];
      
      // Make the API request
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        text: data.choices[0].message.content,
        model: model,
        provider: this.providerName,
        usage: data.usage,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error in OpenAI service:', error);
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
    let systemMessage = 'You are a helpful, friendly AI assistant. Provide thoughtful, detailed responses to the user\'s questions.';
    
    // Configure based on mode
    switch (mode) {
      case 'chatgpt':
        // Use default configuration
        break;
      
      case 'code':
        model = this.defaultModel;
        systemMessage = 'You are a coding expert AI assistant. Provide clear, working code examples and explanations for programming questions. Format code properly using markdown code blocks with the appropriate language syntax.';
        break;
      
      case 'content':
        model = this.defaultModel;
        systemMessage = 'You are a creative writing AI assistant. Help the user with writing tasks, providing high-quality, creative content. Consider tone, style, and audience in your responses.';
        break;
      
      case 'character':
        model = this.defaultModel;
        systemMessage = 'You are a character-based AI roleplaying assistant. Respond in character based on the context provided by the user. Be creative, consistent, and engaging while maintaining appropriate boundaries.';
        break;
      
      case 'knowledge':
        model = this.defaultModel;
        systemMessage = 'You are a knowledgeable AI research assistant. Provide detailed, accurate information with citations where possible. Prioritize factual correctness and academic-style responses.';
        break;
      
      default:
        // Use default configuration for unknown modes
        console.warn(`Unknown mode '${mode}', using default configuration.`);
    }
    
    return { model, systemMessage };
  }

  /**
   * Get available models from OpenAI
   * @returns {Promise<Array>} - List of available models
   */
  async getAvailableModels() {
    if (!this.checkReady()) {
      throw new Error('OpenAI service is not ready. API key not set.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Filter for chat models only
      const chatModels = data.data.filter(model => 
        model.id.includes('gpt') || 
        model.id.includes('davinci') ||
        model.id.includes('turbo')
      );
      
      return chatModels.map(model => ({
        id: model.id,
        name: model.id,
        provider: this.providerName,
        created: model.created
      }));
    } catch (error) {
      console.error('Error fetching OpenAI models:', error);
      throw error;
    }
  }
}

// Export the OpenAI service
export default OpenAIService;
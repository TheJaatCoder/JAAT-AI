/**
 * JAAT-AI Anthropic Service
 * Implements the Anthropic Claude API service
 */

import AIService from './ai-service.js';

class AnthropicService extends AIService {
  /**
   * Initialize the Anthropic service
   */
  constructor() {
    super();
    this.providerName = 'Anthropic';
    this.baseUrl = 'https://api.anthropic.com/v1';
    this.defaultModel = 'claude-3-7-sonnet-20250219'; // the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025. Do not change this unless explicitly requested by the user.
    this.apiVersion = '2023-06-01';
  }

  /**
   * Send a message to the Anthropic API
   * @param {string} message - The message to send
   * @param {string} [mode='default'] - The AI mode to use
   * @returns {Promise<object>} - The Anthropic response
   */
  async sendMessage(message, mode = 'default') {
    if (!this.checkReady()) {
      throw new Error('Anthropic service is not ready. API key not set.');
    }

    try {
      // Get the appropriate model and system message for the mode
      const { model, systemMessage } = this.getModeConfig(mode);
      
      // Make the API request
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': this.apiVersion
        },
        body: JSON.stringify({
          model: model,
          system: systemMessage,
          messages: [
            { role: 'user', content: message }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        text: data.content[0].text,
        model: model,
        provider: this.providerName,
        usage: {
          input_tokens: data.usage?.input_tokens || 0,
          output_tokens: data.usage?.output_tokens || 0
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error in Anthropic service:', error);
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
    let systemMessage = 'You are Claude, a helpful, harmless, and honest AI assistant. Provide thoughtful, detailed responses to the user\'s questions.';
    
    // Configure based on mode
    switch (mode) {
      case 'chatgpt':
        // Use default configuration with Claude-specific instructions
        systemMessage = 'You are Claude, a helpful, harmless, and honest AI assistant. Provide thoughtful, detailed responses to the user\'s questions in a conversational style.';
        break;
      
      case 'code':
        model = this.defaultModel;
        systemMessage = 'You are Claude, a coding expert AI assistant. Provide clear, working code examples and explanations for programming questions. Format code properly using markdown code blocks with the appropriate language syntax.';
        break;
      
      case 'content':
        model = this.defaultModel;
        systemMessage = 'You are Claude, a creative writing AI assistant. Help the user with writing tasks, providing high-quality, creative content. Consider tone, style, and audience in your responses.';
        break;
      
      case 'character':
        model = this.defaultModel;
        systemMessage = 'You are Claude, a character-based AI roleplaying assistant. Respond in character based on the context provided by the user. Be creative, consistent, and engaging while maintaining appropriate boundaries.';
        break;
      
      case 'knowledge':
        model = this.defaultModel;
        systemMessage = 'You are Claude, a knowledgeable AI research assistant. Provide detailed, accurate information with citations where possible. Prioritize factual correctness and academic-style responses.';
        break;
      
      default:
        // Use default configuration for unknown modes
        console.warn(`Unknown mode '${mode}', using default configuration.`);
    }
    
    return { model, systemMessage };
  }

  /**
   * Get available models from Anthropic
   * @returns {Promise<Array>} - List of available models
   */
  async getAvailableModels() {
    // Anthropic doesn't have a models endpoint, so we provide a static list
    return [
      {
        id: 'claude-3-7-sonnet-20250219',
        name: 'Claude 3.7 Sonnet',
        provider: this.providerName,
        created: new Date().toISOString()
      },
      {
        id: 'claude-3-5-sonnet-20240620',
        name: 'Claude 3.5 Sonnet',
        provider: this.providerName,
        created: new Date('2024-06-20').toISOString()
      },
      {
        id: 'claude-3-opus-20240229',
        name: 'Claude 3 Opus',
        provider: this.providerName,
        created: new Date('2024-02-29').toISOString()
      },
      {
        id: 'claude-3-sonnet-20240229',
        name: 'Claude 3 Sonnet',
        provider: this.providerName,
        created: new Date('2024-02-29').toISOString()
      },
      {
        id: 'claude-3-haiku-20240307',
        name: 'Claude 3 Haiku',
        provider: this.providerName,
        created: new Date('2024-03-07').toISOString()
      }
    ];
  }
}

// Export the Anthropic service
export default AnthropicService;
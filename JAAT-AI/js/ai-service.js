/**
 * JAAT-AI Service
 * Base service for AI providers
 */

class AIService {
  /**
   * Initialize the AI service
   */
  constructor() {
    this.apiKey = null;
    this.isReady = false;
    this.providerName = 'Base';
  }

  /**
   * Set the API key for the service
   * @param {string} apiKey - The API key
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
    this.isReady = !!apiKey;
    return this.isReady;
  }

  /**
   * Check if the service is ready to use
   * @returns {boolean} - Whether the service is ready
   */
  checkReady() {
    return this.isReady;
  }

  /**
   * Get the provider name
   * @returns {string} - The provider name
   */
  getProviderName() {
    return this.providerName;
  }

  /**
   * Send a message to the AI service
   * @param {string} message - The message to send
   * @param {string} [mode='default'] - The AI mode to use
   * @returns {Promise<object>} - The AI response
   */
  async sendMessage(message, mode = 'default') {
    throw new Error('sendMessage not implemented in base class');
  }

  /**
   * Get available models from the provider
   * @returns {Promise<Array>} - List of available models
   */
  async getAvailableModels() {
    throw new Error('getAvailableModels not implemented in base class');
  }
}

// Export the base service
export default AIService;
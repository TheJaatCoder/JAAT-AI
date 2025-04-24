/**
 * JAAT-AI Service
 * Provides unified interface to multiple AI providers (OpenAI, Anthropic, Google Gemini)
 */

class AIService {
    constructor() {
        this.provider = 'openai'; // Default provider
        this.apiKey = null;
        this.services = {
            openai: null,
            anthropic: null,
            gemini: null
        };
        
        // Initialize services when needed
        this.initializeServices();
    }
    
    /**
     * Initialize all AI services
     */
    async initializeServices() {
        try {
            // Initialize OpenAI service
            if (!this.services.openai) {
                const OpenAIService = await import('./openai-service.js');
                this.services.openai = new OpenAIService.default();
            }
            
            // Initialize Anthropic service
            if (!this.services.anthropic) {
                const AnthropicService = await import('./anthropic-service.js');
                this.services.anthropic = new AnthropicService.default();
            }
            
            // Initialize Gemini service
            if (!this.services.gemini) {
                const GeminiService = await import('./gemini-service.js');
                this.services.gemini = new GeminiService.default();
            }
        } catch (error) {
            console.error('Error initializing AI services:', error);
        }
    }
    
    /**
     * Set the active AI provider
     * @param {string} provider - Provider name ('openai', 'anthropic', 'gemini')
     */
    setProvider(provider) {
        if (['openai', 'anthropic', 'gemini'].includes(provider)) {
            this.provider = provider;
            console.log(`Set AI provider to ${provider}`);
            return true;
        } else {
            console.error(`Invalid provider: ${provider}`);
            return false;
        }
    }
    
    /**
     * Get the active AI provider
     * @returns {string} - Current provider name
     */
    getProvider() {
        return this.provider;
    }
    
    /**
     * Generate text completion
     * @param {string} prompt - The prompt to generate text from
     * @param {Object} options - Additional options including provider-specific settings
     * @returns {Promise<string>} - Generated text
     */
    async generateCompletion(prompt, options = {}) {
        await this.initializeServices();

        const provider = options.provider || this.provider;
        const fallbackProvider = options.fallbackProvider || 'openai';
        
        try {
            // Log the request
            console.log(`Generating completion with ${provider}:`, 
                        { prompt: prompt.substring(0, 100) + '...', options });
            
            let response;
            
            // Call the appropriate service based on provider
            switch (provider) {
                case 'openai':
                    if (!this.services.openai) {
                        throw new Error('OpenAI service not initialized');
                    }
                    response = await this.services.openai.generateCompletion(prompt, options);
                    break;
                case 'anthropic':
                    if (!this.services.anthropic) {
                        throw new Error('Anthropic service not initialized');
                    }
                    response = await this.services.anthropic.generateCompletion(prompt, options);
                    break;
                case 'gemini':
                    if (!this.services.gemini) {
                        throw new Error('Gemini service not initialized');
                    }
                    response = await this.services.gemini.generateCompletion(prompt, options);
                    break;
                default:
                    throw new Error(`Unknown provider: ${provider}`);
            }
            
            return response;
        } catch (error) {
            console.error(`Error with ${provider}:`, error);
            
            // Try fallback provider if specified and different from original
            if (fallbackProvider && fallbackProvider !== provider) {
                console.log(`Trying fallback provider: ${fallbackProvider}`);
                return this.generateCompletion(prompt, { 
                    ...options, 
                    provider: fallbackProvider,
                    fallbackProvider: null // Prevent infinite fallback loop
                });
            }
            
            throw error;
        }
    }
    
    /**
     * Analyze an image
     * @param {string} imageUrl - URL of the image to analyze
     * @param {string} prompt - Prompt for image analysis
     * @param {Object} options - Additional options including provider-specific settings
     * @returns {Promise<string>} - Analysis of the image
     */
    async analyzeImage(imageUrl, prompt, options = {}) {
        await this.initializeServices();

        const provider = options.provider || this.provider;
        const fallbackProvider = options.fallbackProvider || 'openai';
        
        try {
            console.log(`Analyzing image with ${provider}:`, { imageUrl, prompt });
            
            let response;
            
            switch (provider) {
                case 'openai':
                    if (!this.services.openai) {
                        throw new Error('OpenAI service not initialized');
                    }
                    response = await this.services.openai.analyzeImage(imageUrl, prompt, options);
                    break;
                case 'anthropic':
                    if (!this.services.anthropic) {
                        throw new Error('Anthropic service not initialized');
                    }
                    response = await this.services.anthropic.analyzeImage(imageUrl, prompt, options);
                    break;
                case 'gemini':
                    if (!this.services.gemini) {
                        throw new Error('Gemini service not initialized');
                    }
                    response = await this.services.gemini.analyzeImage(imageUrl, prompt, options);
                    break;
                default:
                    throw new Error(`Unknown provider: ${provider}`);
            }
            
            return response;
        } catch (error) {
            console.error(`Error analyzing image with ${provider}:`, error);
            
            // Try fallback provider if specified and different from original
            if (fallbackProvider && fallbackProvider !== provider) {
                console.log(`Trying fallback provider: ${fallbackProvider}`);
                return this.analyzeImage(imageUrl, prompt, { 
                    ...options, 
                    provider: fallbackProvider,
                    fallbackProvider: null // Prevent infinite fallback loop
                });
            }
            
            throw error;
        }
    }
    
    /**
     * Generate an image (only available with OpenAI)
     * @param {string} prompt - The prompt to generate an image from
     * @param {Object} options - Additional options
     * @returns {Promise<string>} - Generated image URL
     */
    async generateImage(prompt, options = {}) {
        await this.initializeServices();
        
        try {
            // Image generation only supported by OpenAI in our implementation
            if (!this.services.openai) {
                throw new Error('OpenAI service not initialized');
            }
            
            return await this.services.openai.generateImage(prompt, options);
        } catch (error) {
            console.error('Error generating image:', error);
            throw error;
        }
    }
    
    /**
     * Get provider-specific capabilities
     * @param {string} provider - Provider name
     * @returns {Object} - Provider capabilities
     */
    getProviderCapabilities(provider = null) {
        provider = provider || this.provider;
        
        const capabilities = {
            openai: {
                textCompletion: true,
                imageAnalysis: true,
                imageGeneration: true,
                audioTranscription: true,
                functionCalling: true
            },
            anthropic: {
                textCompletion: true,
                imageAnalysis: true,
                imageGeneration: false,
                audioTranscription: false,
                functionCalling: true
            },
            gemini: {
                textCompletion: true,
                imageAnalysis: true,
                imageGeneration: false,
                audioTranscription: false,
                functionCalling: true
            }
        };
        
        return capabilities[provider] || {};
    }
    
    /**
     * Send a message to the AI with automatic capabilities detection
     * @param {Object} message - Message object with properties: text, images, etc.
     * @param {Object} options - Additional options
     * @returns {Promise<string>} - AI response
     */
    async sendMessage(message, options = {}) {
        // If message contains images, use image analysis
        if (message.images && message.images.length > 0) {
            return this.analyzeImage(message.images[0], message.text, options);
        }
        
        // Otherwise use text completion
        return this.generateCompletion(message.text, options);
    }
}

// Create singleton instance
const aiService = new AIService();

// Expose to window object for global access
window.AIService = aiService;

export default aiService;
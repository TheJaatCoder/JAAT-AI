/**
 * Anthropic Service for JAAT-AI
 * Provides integration with Anthropic AI API
 */

class AnthropicService {
    constructor() {
        this.apiKey = null;
        this.baseUrl = 'https://api.anthropic.com/v1';
        this.model = 'claude-3-7-sonnet-20250219'; // the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
        
        // Try to get API key from environment or configuration
        this.loadConfiguration();
    }
    
    /**
     * Load configuration from environment or local storage
     */
    async loadConfiguration() {
        try {
            // Check if API key is available in session storage
            const storedKey = sessionStorage.getItem('anthropic_api_key');
            if (storedKey) {
                this.apiKey = storedKey;
                console.log('Anthropic API key loaded from session storage');
            }
            
            // For server-side use, the API key would be loaded from environment variables
        } catch (error) {
            console.error('Error loading Anthropic configuration:', error);
        }
    }
    
    /**
     * Set the API key
     * @param {string} apiKey - Anthropic API key
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        // Save to session storage for temporary persistence
        try {
            sessionStorage.setItem('anthropic_api_key', apiKey);
        } catch (error) {
            console.error('Error saving API key to session storage:', error);
        }
    }
    
    /**
     * Generate text completion
     * @param {string} prompt - The prompt to generate text from
     * @param {Object} options - Additional options
     * @returns {Promise<string>} - Generated text
     */
    async generateCompletion(prompt, options = {}) {
        await this.ensureApiKey();
        
        const systemPrompt = options.systemPrompt || 'You are a helpful AI assistant.';
        const model = options.model || this.model;
        const maxTokens = options.maxTokens || 1000;
        const temperature = options.temperature || 0.7;
        
        try {
            // Call our API endpoint wrapper
            const response = await this.sendRequest('/messages', {
                method: 'POST',
                body: JSON.stringify({
                    model: model,
                    system: systemPrompt,
                    messages: [
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: maxTokens,
                    temperature: temperature
                })
            });
            
            return response.content[0].text;
        } catch (error) {
            console.error('Anthropic completion error:', error);
            throw error;
        }
    }
    
    /**
     * Analyze an image
     * @param {string} imageUrl - URL of the image to analyze
     * @param {string} prompt - Prompt for image analysis
     * @param {Object} options - Additional options
     * @returns {Promise<string>} - Analysis of the image
     */
    async analyzeImage(imageUrl, prompt, options = {}) {
        await this.ensureApiKey();
        
        const model = options.model || this.model;
        const maxTokens = options.maxTokens || 1000;
        
        try {
            // Call our API endpoint wrapper
            const response = await this.sendRequest('/messages', {
                method: 'POST',
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: 'user',
                            content: [
                                { type: 'text', text: prompt },
                                {
                                    type: 'image',
                                    source: {
                                        type: 'url',
                                        url: imageUrl
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens: maxTokens
                })
            });
            
            return response.content[0].text;
        } catch (error) {
            console.error('Anthropic image analysis error:', error);
            throw error;
        }
    }
    
    /**
     * Make sure an API key is available
     * @returns {Promise<void>}
     */
    async ensureApiKey() {
        if (!this.apiKey) {
            // If API key not set, try to load it again
            await this.loadConfiguration();
            
            // If still not available, check if we can call the server to get it
            if (!this.apiKey) {
                try {
                    const response = await fetch('/api/config/anthropic');
                    const data = await response.json();
                    if (data.apiKey) {
                        this.setApiKey(data.apiKey);
                    } else {
                        throw new Error('API key not available');
                    }
                } catch (error) {
                    throw new Error('Anthropic API key not available. Please provide an API key.');
                }
            }
        }
    }
    
    /**
     * Send request to Anthropic API with API key
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} - API response
     */
    async sendRequest(endpoint, options = {}) {
        // Try client-side approach first
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const headers = {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey,
                'anthropic-version': '2023-06-01'
            };
            
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...headers,
                    ...(options.headers || {})
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
            }
            
            return await response.json();
        } catch (clientError) {
            console.error('Client-side API call failed:', clientError);
            
            // Try server-side approach as fallback
            try {
                const serverUrl = `/api/anthropic${endpoint}`;
                const response = await fetch(serverUrl, {
                    method: options.method || 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: options.body
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Server API error: ${errorData.error || response.statusText}`);
                }
                
                return await response.json();
            } catch (serverError) {
                console.error('Server-side API call failed:', serverError);
                throw serverError;
            }
        }
    }
}

export default AnthropicService;
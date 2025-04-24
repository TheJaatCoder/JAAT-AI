/**
 * OpenAI Service for JAAT-AI
 * Provides integration with OpenAI API
 */

class OpenAIService {
    constructor() {
        this.apiKey = null;
        this.organization = null;
        this.baseUrl = 'https://api.openai.com/v1';
        this.model = 'gpt-4o'; // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        this.imageModel = 'dall-e-3';
        
        // Try to get API key from environment or configuration
        this.loadConfiguration();
    }
    
    /**
     * Load configuration from environment or local storage
     */
    async loadConfiguration() {
        try {
            // Check if API key is available in session storage
            const storedKey = sessionStorage.getItem('openai_api_key');
            if (storedKey) {
                this.apiKey = storedKey;
                console.log('OpenAI API key loaded from session storage');
            }
            
            // For server-side use, the API key would be loaded from environment variables
        } catch (error) {
            console.error('Error loading OpenAI configuration:', error);
        }
    }
    
    /**
     * Set the API key
     * @param {string} apiKey - OpenAI API key
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        // Save to session storage for temporary persistence
        try {
            sessionStorage.setItem('openai_api_key', apiKey);
        } catch (error) {
            console.error('Error saving API key to session storage:', error);
        }
    }
    
    /**
     * Set OpenAI organization ID
     * @param {string} organization - Organization ID
     */
    setOrganization(organization) {
        this.organization = organization;
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
            const response = await this.sendRequest('/chat/completions', {
                method: 'POST',
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: maxTokens,
                    temperature: temperature
                })
            });
            
            return response.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI completion error:', error);
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
            const response = await this.sendRequest('/chat/completions', {
                method: 'POST',
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { 
                            role: 'user', 
                            content: [
                                { type: 'text', text: prompt },
                                { 
                                    type: 'image_url', 
                                    image_url: { url: imageUrl } 
                                }
                            ]
                        }
                    ],
                    max_tokens: maxTokens
                })
            });
            
            return response.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI image analysis error:', error);
            throw error;
        }
    }
    
    /**
     * Generate an image
     * @param {string} prompt - The prompt to generate an image from
     * @param {Object} options - Additional options
     * @returns {Promise<string>} - Generated image URL
     */
    async generateImage(prompt, options = {}) {
        await this.ensureApiKey();
        
        const model = options.model || this.imageModel;
        const size = options.size || '1024x1024';
        const quality = options.quality || 'standard';
        const style = options.style || 'vivid';
        
        try {
            const response = await this.sendRequest('/images/generations', {
                method: 'POST',
                body: JSON.stringify({
                    model: model,
                    prompt: prompt,
                    n: 1,
                    size: size,
                    quality: quality,
                    style: style
                })
            });
            
            return response.data[0].url;
        } catch (error) {
            console.error('OpenAI image generation error:', error);
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
                    const response = await fetch('/api/config/openai');
                    const data = await response.json();
                    if (data.apiKey) {
                        this.setApiKey(data.apiKey);
                    } else {
                        throw new Error('API key not available');
                    }
                } catch (error) {
                    throw new Error('OpenAI API key not available. Please provide an API key.');
                }
            }
        }
    }
    
    /**
     * Send request to OpenAI API with API key
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
                'Authorization': `Bearer ${this.apiKey}`
            };
            
            if (this.organization) {
                headers['OpenAI-Organization'] = this.organization;
            }
            
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...headers,
                    ...(options.headers || {})
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
            }
            
            return await response.json();
        } catch (clientError) {
            console.error('Client-side API call failed:', clientError);
            
            // Try server-side approach as fallback
            try {
                const serverUrl = `/api/openai${endpoint}`;
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

export default OpenAIService;
/**
 * Google Gemini Service for JAAT-AI
 * Provides integration with Google's Gemini AI API
 */

class GeminiService {
    constructor() {
        this.apiKey = null;
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
        this.model = 'models/gemini-1.5-pro'; // The most capable Gemini model
        
        // Try to get API key from environment or configuration
        this.loadConfiguration();
    }
    
    /**
     * Load configuration from environment or local storage
     */
    async loadConfiguration() {
        try {
            // Check if API key is available in session storage
            const storedKey = sessionStorage.getItem('gemini_api_key');
            if (storedKey) {
                this.apiKey = storedKey;
                console.log('Gemini API key loaded from session storage');
            }
            
            // For server-side use, the API key would be loaded from environment variables
        } catch (error) {
            console.error('Error loading Gemini configuration:', error);
        }
    }
    
    /**
     * Set the API key
     * @param {string} apiKey - Gemini API key
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        // Save to session storage for temporary persistence
        try {
            sessionStorage.setItem('gemini_api_key', apiKey);
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
        const temperature = options.temperature || 0.7;
        const modelEndpoint = `/${model}:generateContent`;
        
        try {
            // Call our API endpoint wrapper
            const response = await this.sendRequest(modelEndpoint, {
                method: 'POST',
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [
                                { text: systemPrompt },
                                { text: prompt }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: temperature,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 8192,
                    },
                    safetySettings: [
                        {
                            category: 'HARM_CATEGORY_HARASSMENT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_HATE_SPEECH',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        }
                    ]
                })
            });
            
            if (!response.candidates || response.candidates.length === 0) {
                throw new Error('No response generated');
            }
            
            // Extract the text content from the response
            const candidate = response.candidates[0];
            if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                return candidate.content.parts[0].text;
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            console.error('Gemini completion error:', error);
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
        const temperature = options.temperature || 0.7;
        const modelEndpoint = `/${model}:generateContent`;
        
        try {
            // For image URLs, we need to convert to base64 first if using API directly
            // For server-side approach, we'll send the URL directly
            
            try {
                // First try with server-side approach (which handles the image URL)
                const serverUrl = `/api/gemini/analyze`;
                const response = await fetch(serverUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        imageUrl: imageUrl,
                        prompt: prompt
                    })
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Server API error: ${errorData.error || response.statusText}`);
                }
                
                const data = await response.json();
                return data.text;
            } catch (serverError) {
                console.error('Server-side image analysis failed:', serverError);
                
                // Fallback to direct API approach
                // This would require loading the image and converting to base64
                // which might not work due to CORS restrictions on many image URLs
                
                throw new Error('Image analysis via direct API not implemented in client-side mode. Use server-side approach.');
            }
        } catch (error) {
            console.error('Gemini image analysis error:', error);
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
                    const response = await fetch('/api/config/gemini');
                    const data = await response.json();
                    if (data.apiKey) {
                        this.setApiKey(data.apiKey);
                    } else {
                        throw new Error('API key not available');
                    }
                } catch (error) {
                    throw new Error('Gemini API key not available. Please provide an API key.');
                }
            }
        }
    }
    
    /**
     * Send request to Gemini API with API key
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} - API response
     */
    async sendRequest(endpoint, options = {}) {
        // Try client-side approach first
        try {
            // Add API key to URL
            const url = `${this.baseUrl}${endpoint}?key=${this.apiKey}`;
            const headers = {
                'Content-Type': 'application/json'
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
                throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
            }
            
            return await response.json();
        } catch (clientError) {
            console.error('Client-side API call failed:', clientError);
            
            // Try server-side approach as fallback
            try {
                const serverUrl = `/api/gemini${endpoint}`;
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

export default GeminiService;
/**
 * JAAT-AI API Service
 * Provides a clean interface to interact with the JAAT-AI API endpoints
 */

class ApiService {
    constructor() {
        this.baseUrl = '/api';
        this.endpoints = {
            modes: '/modes',
            stats: '/stats',
            profile: '/profile',
            chat: '/chat',
            config: '/config'
        };
    }
    
    /**
     * Set the base URL for API calls
     * @param {string} url - The base URL
     */
    setBaseUrl(url) {
        this.baseUrl = url;
    }
    
    /**
     * Make an API request
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} - API response
     */
    async request(endpoint, options = {}) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const headers = {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            };
            
            const response = await fetch(url, {
                ...options,
                headers
            });
            
            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    errorData = { error: response.statusText };
                }
                throw new Error(errorData.error || 'API request failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error(`API request error (${endpoint}):`, error);
            throw error;
        }
    }
    
    /**
     * Get all available AI modes
     * @returns {Promise<Array>} - List of AI modes
     */
    async getModes() {
        return this.request(this.endpoints.modes);
    }
    
    /**
     * Get user statistics
     * @returns {Promise<Object>} - User stats
     */
    async getStats() {
        return this.request(this.endpoints.stats);
    }
    
    /**
     * Get user profile
     * @returns {Promise<Object>} - User profile
     */
    async getProfile() {
        return this.request(this.endpoints.profile);
    }
    
    /**
     * Send a chat message to the AI
     * @param {string} message - The user message
     * @param {string} modeId - The AI mode ID
     * @returns {Promise<Object>} - AI response
     */
    async sendMessage(message, modeId = null) {
        return this.request(this.endpoints.chat, {
            method: 'POST',
            body: JSON.stringify({
                message,
                modeId
            })
        });
    }
    
    /**
     * Get configuration for a specific service
     * @param {string} service - Service name (e.g., 'openai', 'anthropic')
     * @returns {Promise<Object>} - Service configuration
     */
    async getConfig(service) {
        return this.request(`${this.endpoints.config}/${service}`);
    }
}

// Create singleton instance
const apiService = new ApiService();

// Expose to window object for global access
window.ApiService = apiService;

export default apiService;
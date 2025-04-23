/**
 * JAAT-AI Environment Configuration
 * Securely manages API keys and environment variables
 * 
 * Created by: Rohit Sangwan
 * Contact: Infosec.rohit77@gmail.com
 */

// Initialize environment variables object
window.JAAT_ENV = window.JAAT_ENV || {};

// Secure configuration manager
class EnvConfig {
    constructor() {
        this.initialized = false;
        this.subscriptionActive = false;
        this.premiumFeaturesEnabled = false;
        this.apiKeysConfigured = {};
        
        // For security, we never store actual API keys in client-side JavaScript
        // Instead, we store flags indicating which services are configured
        this.availableServices = [
            'openai',
            'anthropic',
            'gemini',
            'firebase',
            'news',
            'search',
            'weather',
            'crypto'
        ];
        
        // Contact information
        this.contactInfo = {
            name: 'Rohit Sangwan',
            email: 'Infosec.rohit77@gmail.com',
            website: 'https://jaat-ai.com',
            support: 'support@jaat-ai.com'
        };
        
        // Initialize environment
        this.init();
    }
    
    /**
     * Initialize environment configuration
     */
    async init() {
        try {
            console.log('Initializing JAAT-AI environment configuration...');
            
            // In a real production environment, this would make a secure API call
            // to check which API keys are configured on the server-side
            // For demo purposes, we'll simulate this
            
            // Simulate checking environment variables (in a real app, this would be server-side only)
            await this.checkEnvironmentVariables();
            
            // Check subscription status
            await this.checkSubscriptionStatus();
            
            this.initialized = true;
            console.log('Environment configuration initialized successfully');
            
            // Dispatch initialization event
            this.dispatchEvent('initialized');
            
            return true;
        } catch (error) {
            console.error('Failed to initialize environment configuration:', error);
            return false;
        }
    }
    
    /**
     * Check which environment variables are configured
     * @returns {Promise<Object>} Status of environment variables
     */
    async checkEnvironmentVariables() {
        // This is a simulation - in a real app, this would be a server-side check
        // that returns only the status of which APIs are configured, never the actual keys
        return new Promise(resolve => {
            setTimeout(() => {
                // Simulate API check results
                this.apiKeysConfigured = {
                    openai: true,
                    anthropic: true,
                    gemini: true,
                    firebase: true,
                    news: true,
                    search: true,
                    weather: true,
                    crypto: true
                };
                
                resolve(this.apiKeysConfigured);
            }, 300);
        });
    }
    
    /**
     * Check subscription status
     * @returns {Promise<boolean>} Whether user has an active subscription
     */
    async checkSubscriptionStatus() {
        // In a real app, this would be a secure server-side check
        return new Promise(resolve => {
            setTimeout(() => {
                // For development, enable all features
                this.subscriptionActive = true;
                this.premiumFeaturesEnabled = true;
                
                // In production, this would check actual subscription status from backend
                
                resolve(this.subscriptionActive);
            }, 200);
        });
    }
    
    /**
     * Check if a specific service is configured
     * @param {string} serviceId - Service ID to check
     * @returns {boolean} Whether the service is configured
     */
    isServiceConfigured(serviceId) {
        if (!this.initialized) {
            console.warn('Environment configuration not yet initialized');
            return false;
        }
        
        return this.apiKeysConfigured[serviceId] || false;
    }
    
    /**
     * Check if premium features are enabled
     * @returns {boolean} Whether premium features are enabled
     */
    isPremiumEnabled() {
        return this.premiumFeaturesEnabled;
    }
    
    /**
     * Check if subscription is active
     * @returns {boolean} Whether subscription is active
     */
    isSubscriptionActive() {
        return this.subscriptionActive;
    }
    
    /**
     * Get available AI models based on configuration
     * @returns {Array} List of available AI models
     */
    getAvailableModels() {
        const models = [];
        
        if (this.apiKeysConfigured.openai) {
            models.push(
                { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', tier: 'premium' },
                { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai', tier: 'premium' },
                { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai', tier: 'standard' }
            );
        }
        
        if (this.apiKeysConfigured.anthropic) {
            models.push(
                { id: 'claude-3-7', name: 'Claude 3.7', provider: 'anthropic', tier: 'premium' },
                { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'anthropic', tier: 'premium' },
                { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'anthropic', tier: 'standard' },
                { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'anthropic', tier: 'standard' }
            );
        }
        
        if (this.apiKeysConfigured.gemini) {
            models.push(
                { id: 'gemini-pro', name: 'Gemini Pro', provider: 'google', tier: 'standard' },
                { id: 'gemini-ultra', name: 'Gemini Ultra', provider: 'google', tier: 'premium' }
            );
        }
        
        // Filter models based on subscription status
        if (!this.premiumFeaturesEnabled) {
            return models.filter(model => model.tier !== 'premium');
        }
        
        return models;
    }
    
    /**
     * Get contact information
     * @returns {Object} Contact information
     */
    getContactInfo() {
        return { ...this.contactInfo };
    }
    
    /**
     * Dispatch a custom event
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event details
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`jaat.env.${eventName}`, { 
            detail,
            bubbles: true
        });
        document.dispatchEvent(event);
    }
}

// Create environment configuration instance
window.JAAT_ENV.config = new EnvConfig();

// Export for module usage
export default window.JAAT_ENV.config;
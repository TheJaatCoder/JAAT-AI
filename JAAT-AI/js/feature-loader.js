/**
 * JAAT-AI Feature Loader
 * Manages registration and loading of JAAT-AI features
 */

// Initialize JAAT global object if it doesn't exist
window.JAAT = window.JAAT || {
    features: {},
    aiModes: {},
    settings: {
        theme: 'dark',
        animations: true,
        performance: 'balanced' // 'performance', 'balanced', 'quality'
    }
};

/**
 * Register a feature with JAAT-AI
 * @param {string} featureId - Unique identifier for the feature
 * @param {Object} featureInstance - Instance of the feature
 * @returns {boolean} Whether registration was successful
 */
window.JAAT.registerFeature = function(featureId, featureInstance) {
    if (!featureId || typeof featureId !== 'string') {
        console.error('Invalid feature ID');
        return false;
    }
    
    if (!featureInstance) {
        console.error('Invalid feature instance');
        return false;
    }
    
    if (this.features[featureId]) {
        console.warn(`Feature ${featureId} is already registered. Overwriting.`);
    }
    
    this.features[featureId] = featureInstance;
    console.log(`Feature ${featureId} registered successfully`);
    return true;
};

/**
 * Register an AI mode with JAAT-AI
 * @param {string} modeId - Unique identifier for the AI mode
 * @param {Object} modeConfig - Configuration for the AI mode
 * @returns {boolean} Whether registration was successful
 */
window.JAAT.registerAIMode = function(modeId, modeConfig) {
    if (!modeId || typeof modeId !== 'string') {
        console.error('Invalid AI mode ID');
        return false;
    }
    
    if (!modeConfig) {
        console.error('Invalid AI mode configuration');
        return false;
    }
    
    if (this.aiModes[modeId]) {
        console.warn(`AI mode ${modeId} is already registered. Overwriting.`);
    }
    
    this.aiModes[modeId] = modeConfig;
    console.log(`AI mode ${modeId} registered successfully`);
    return true;
};

/**
 * Get a registered feature
 * @param {string} featureId - ID of the feature to get
 * @returns {Object|null} The feature instance or null if not found
 */
window.JAAT.getFeature = function(featureId) {
    return this.features[featureId] || null;
};

/**
 * Get a registered AI mode
 * @param {string} modeId - ID of the AI mode to get
 * @returns {Object|null} The AI mode configuration or null if not found
 */
window.JAAT.getAIMode = function(modeId) {
    return this.aiModes[modeId] || null;
};

/**
 * Update a setting
 * @param {string} key - Setting key
 * @param {any} value - Setting value
 * @returns {boolean} Whether update was successful
 */
window.JAAT.updateSetting = function(key, value) {
    if (!(key in this.settings)) {
        console.error(`Invalid setting key: ${key}`);
        return false;
    }
    
    this.settings[key] = value;
    
    // Dispatch event for setting change
    const event = new CustomEvent('jaat.settings.changed', {
        detail: { key, value },
        bubbles: true
    });
    document.dispatchEvent(event);
    
    return true;
};

/**
 * JAAT Feature Loader Module
 * Dynamically loads features and AI modes
 */
class FeatureLoader {
    constructor() {
        this.loadedFeatures = [];
        this.loadedModes = [];
        this.loading = false;
    }
    
    /**
     * Initialize the feature loader
     */
    async init() {
        try {
            this.loading = true;
            
            // Load core features
            await this.loadCoreFeatures();
            
            // Load advanced features
            await this.loadAdvancedFeatures();
            
            // Load AI modes
            await this.loadAIModes();
            
            console.log('JAAT Feature Loader: All features loaded successfully');
            this.loading = false;
            
            // Dispatch event for features loaded
            const event = new CustomEvent('jaat.features.loaded', {
                detail: {
                    features: this.loadedFeatures,
                    modes: this.loadedModes
                },
                bubbles: true
            });
            document.dispatchEvent(event);
            
        } catch (error) {
            console.error('Failed to load features:', error);
            this.loading = false;
        }
    }
    
    /**
     * Load core features
     */
    async loadCoreFeatures() {
        // In a real implementation, this would load core features from a configuration
        // For demonstration, we'll simulate loading with a delay
        return new Promise(resolve => {
            console.log('Loading core features...');
            setTimeout(() => {
                // Core features are typically built into the application
                this.loadedFeatures.push('core:auth', 'core:settings', 'core:chat');
                resolve();
            }, 100);
        });
    }
    
    /**
     * Load advanced features
     */
    async loadAdvancedFeatures() {
        // Get the list of features from the server or a local configuration
        // For demonstration, we'll use a hardcoded list
        const featuresToLoad = [
            'voice-recognition',
            'multi-language-support',
            'ai-personalization',
            'image-style-transfer'
        ];
        
        console.log('Loading advanced features:', featuresToLoad);
        
        // Attempt to load each feature
        const promises = featuresToLoad.map(feature => this.loadFeature(feature));
        
        // Wait for all features to load
        await Promise.allSettled(promises);
    }
    
    /**
     * Load AI modes
     */
    async loadAIModes() {
        // Get the list of AI modes from the server or a local configuration
        // For demonstration, we'll use a hardcoded list
        const modesToLoad = [
            'content-writer',
            'code-assistant',
            'creative',
            'data-analysis',
            'image-generation',
            'legal-analyst',
            'medical-advisor',
            'scientific-research',
            'financial-advisor'
        ];
        
        console.log('Loading AI modes:', modesToLoad);
        
        // Attempt to load each mode
        const promises = modesToLoad.map(mode => this.loadMode(mode));
        
        // Wait for all modes to load
        await Promise.allSettled(promises);
    }
    
    /**
     * Load a specific feature
     * @param {string} featureId - ID of the feature to load
     * @returns {Promise<boolean>} Whether feature was loaded successfully
     */
    async loadFeature(featureId) {
        try {
            console.log(`Loading feature: ${featureId}`);
            
            // Simulate loading the feature script
            // In a real implementation, this would dynamically load the script
            // For example: await this.loadScript(`/features/${featureId}.js`);
            
            // If the feature is already registered, it means the script was included manually
            if (window.JAAT.features[featureId]) {
                console.log(`Feature ${featureId} is already loaded`);
                this.loadedFeatures.push(featureId);
                return true;
            }
            
            // For demonstration, we'll just add it to the loaded list
            // In reality, the script loading would register the feature
            this.loadedFeatures.push(featureId);
            
            return true;
        } catch (error) {
            console.error(`Failed to load feature ${featureId}:`, error);
            return false;
        }
    }
    
    /**
     * Load a specific AI mode
     * @param {string} modeId - ID of the AI mode to load
     * @returns {Promise<boolean>} Whether mode was loaded successfully
     */
    async loadMode(modeId) {
        try {
            console.log(`Loading AI mode: ${modeId}`);
            
            // Simulate loading the mode script
            // In a real implementation, this would dynamically load the script
            // For example: await this.loadScript(`/modes/${modeId}.js`);
            
            // If the mode is already registered, it means the script was included manually
            if (window.JAAT.aiModes[modeId]) {
                console.log(`AI mode ${modeId} is already loaded`);
                this.loadedModes.push(modeId);
                return true;
            }
            
            // For demonstration, we'll create a basic mode configuration
            const modeConfig = {
                id: modeId,
                name: this.formatModeId(modeId),
                description: `Advanced AI mode for ${this.formatModeId(modeId)}`,
                icon: this.getModeIcon(modeId),
                systemPrompt: `You are an expert ${this.formatModeId(modeId).toLowerCase()}. Provide helpful, accurate, and detailed responses in this field.`
            };
            
            // Register the mode
            window.JAAT.registerAIMode(modeId, modeConfig);
            
            this.loadedModes.push(modeId);
            
            return true;
        } catch (error) {
            console.error(`Failed to load AI mode ${modeId}:`, error);
            return false;
        }
    }
    
    /**
     * Format mode ID for display
     * @param {string} modeId - Mode ID to format
     * @returns {string} Formatted mode name
     */
    formatModeId(modeId) {
        return modeId
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    /**
     * Get icon for mode
     * @param {string} modeId - Mode ID
     * @returns {string} Icon class
     */
    getModeIcon(modeId) {
        const iconMap = {
            'content-writer': 'fas fa-pen-fancy',
            'code-assistant': 'fas fa-code',
            'creative': 'fas fa-palette',
            'data-analysis': 'fas fa-chart-column',
            'image-generation': 'fas fa-image',
            'legal-analyst': 'fas fa-gavel',
            'medical-advisor': 'fas fa-stethoscope',
            'scientific-research': 'fas fa-flask',
            'financial-advisor': 'fas fa-chart-line'
        };
        
        return iconMap[modeId] || 'fas fa-robot';
    }
    
    /**
     * Load a script dynamically
     * @param {string} src - Script source URL
     * @returns {Promise<void>} Promise that resolves when script is loaded
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            
            document.head.appendChild(script);
        });
    }
}

// Initialize the feature loader
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing JAAT-AI Feature Loader');
    const featureLoader = new FeatureLoader();
    featureLoader.init().then(() => {
        console.log('Feature loader initialization complete');
    });
});
/**
 * JAAT-AI Feature Engine
 * Central hub for managing and coordinating all feature modules
 */

class FeatureEngine {
    constructor(app) {
        // Reference to main app
        this.app = app;
        
        // Registered features
        this.features = {};
        
        // Feature instances
        this.instances = {};
        
        // Feature initialization status
        this.initStatus = {};
        
        // Feature dependencies
        this.dependencies = {};
        
        // Feature categories
        this.categories = {
            input: 'Input Methods',
            output: 'Output Methods',
            enhancement: 'Enhancements',
            integration: 'Integrations',
            utility: 'Utilities',
            visualization: 'Visualization',
            analysis: 'Analysis',
            customization: 'Customization',
            experimental: 'Experimental'
        };
        
        // Event listeners
        this.eventListeners = {};
        
        // Feature paths
        this.featurePaths = {
            'neural-drawing-canvas': './features/neural-drawing-canvas.js',
            'ai-prompt-generator': './features/ai-prompt-generator.js',
            'sentiment-tracker': './features/sentiment-tracker.js',
            'dream-journal-sync': './features/dream-journal-sync.js',
            'emoji-decoder': './features/emoji-decoder.js'
            // Other features would be listed here
        };
    }

    /**
     * Initialize the feature engine
     * @param {Object} options - Configuration options
     * @returns {Promise<void>}
     */
    async init(options = {}) {
        console.log('Initializing Feature Engine...');
        
        try {
            // Register core features
            await this.registerCoreFeatures();
            
            // Initialize features that should auto-initialize
            if (options.autoInitFeatures || true) {
                await this.initCoreFeatures();
            }
            
            console.log('Feature Engine initialized');
        } catch (error) {
            console.error('Error initializing Feature Engine:', error);
            throw error;
        }
    }

    /**
     * Register core features
     * @returns {Promise<void>}
     */
    async registerCoreFeatures() {
        const coreFeatures = [
            'neural-drawing-canvas',
            'ai-prompt-generator',
            'sentiment-tracker',
            'dream-journal-sync',
            'emoji-decoder'
        ];
        
        for (const featureId of coreFeatures) {
            await this.registerFeature(featureId);
        }
    }

    /**
     * Initialize core features
     * @returns {Promise<void>}
     */
    async initCoreFeatures() {
        const coreFeatures = [
            'neural-drawing-canvas',
            'ai-prompt-generator',
            'sentiment-tracker',
            'dream-journal-sync'
        ];
        
        for (const featureId of coreFeatures) {
            try {
                await this.initFeature(featureId);
            } catch (error) {
                console.error(`Error initializing core feature ${featureId}:`, error);
            }
        }
    }

    /**
     * Register a feature
     * @param {string} featureId - Feature ID
     * @param {Object} options - Feature options
     * @returns {Promise<boolean>} Success indicator
     */
    async registerFeature(featureId, options = {}) {
        // Skip if already registered
        if (this.features[featureId]) {
            return true;
        }
        
        try {
            const path = this.featurePaths[featureId];
            
            if (!path) {
                console.error(`Unknown feature: ${featureId}`);
                return false;
            }
            
            // Store feature info
            this.features[featureId] = {
                id: featureId,
                path,
                ...options
            };
            
            // Set initial init status
            this.initStatus[featureId] = {
                initialized: false,
                loaded: false,
                error: null
            };
            
            console.log(`Registered feature: ${featureId}`);
            return true;
        } catch (error) {
            console.error(`Error registering feature ${featureId}:`, error);
            return false;
        }
    }

    /**
     * Initialize a feature
     * @param {string} featureId - Feature ID
     * @returns {Promise<Object>} Feature instance
     */
    async initFeature(featureId) {
        // Skip if already initialized
        if (this.initStatus[featureId]?.initialized && this.instances[featureId]) {
            return this.instances[featureId];
        }
        
        // Check if feature is registered
        if (!this.features[featureId]) {
            throw new Error(`Feature not registered: ${featureId}`);
        }
        
        try {
            // Load feature module
            if (!this.initStatus[featureId].loaded) {
                const feature = this.features[featureId];
                
                // In a real dynamic import scenario, we would do:
                // const module = await import(feature.path);
                // const FeatureClass = module.default;
                
                // For this example, we'll simulate dynamic loading by using the app's feature classes
                // In practice, you would use dynamic imports
                const featureClassName = this.getFeatureClassName(featureId);
                const FeatureClass = window[featureClassName];
                
                if (!FeatureClass) {
                    throw new Error(`Feature class not found: ${featureClassName}`);
                }
                
                // Mark as loaded
                this.initStatus[featureId].loaded = true;
                
                // Create instance
                this.instances[featureId] = new FeatureClass(this.app);
            }
            
            // Initialize feature
            const instance = this.instances[featureId];
            await instance.init();
            
            // Mark as initialized
            this.initStatus[featureId].initialized = true;
            this.initStatus[featureId].error = null;
            
            // Trigger initialized event
            this.trigger('featureInitialized', {
                featureId,
                instance
            });
            
            console.log(`Initialized feature: ${featureId}`);
            return instance;
        } catch (error) {
            // Update init status
            this.initStatus[featureId].initialized = false;
            this.initStatus[featureId].error = error.message;
            
            // Trigger error event
            this.trigger('featureInitError', {
                featureId,
                error
            });
            
            console.error(`Error initializing feature ${featureId}:`, error);
            throw error;
        }
    }

    /**
     * Get feature instance
     * @param {string} featureId - Feature ID
     * @returns {Object|null} Feature instance or null if not initialized
     */
    getFeature(featureId) {
        return this.instances[featureId] || null;
    }

    /**
     * Check if a feature is initialized
     * @param {string} featureId - Feature ID
     * @returns {boolean} Whether the feature is initialized
     */
    isFeatureInitialized(featureId) {
        return this.initStatus[featureId]?.initialized || false;
    }

    /**
     * Get feature class name from feature ID
     * @param {string} featureId - Feature ID
     * @returns {string} Feature class name
     */
    getFeatureClassName(featureId) {
        // Convert kebab-case to PascalCase
        return featureId
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
    }

    /**
     * Call a feature method
     * @param {string} featureId - Feature ID
     * @param {string} method - Method name
     * @param {...any} args - Method arguments
     * @returns {Promise<any>} Method result
     */
    async callFeatureMethod(featureId, method, ...args) {
        // Get feature
        const feature = this.getFeature(featureId);
        
        if (!feature) {
            throw new Error(`Feature not initialized: ${featureId}`);
        }
        
        // Check if method exists
        if (typeof feature[method] !== 'function') {
            throw new Error(`Method not found in feature ${featureId}: ${method}`);
        }
        
        // Call method
        return feature[method](...args);
    }

    /**
     * Get all available features
     * @returns {Object} Available features
     */
    getAllFeatures() {
        return { ...this.features };
    }

    /**
     * Get features by category
     * @param {string} category - Category name
     * @returns {Object} Features in the category
     */
    getFeaturesByCategory(category) {
        const result = {};
        
        for (const [id, feature] of Object.entries(this.features)) {
            if (feature.category === category) {
                result[id] = feature;
            }
        }
        
        return result;
    }

    /**
     * Get feature initialization status
     * @param {string} featureId - Feature ID
     * @returns {Object} Initialization status
     */
    getFeatureStatus(featureId) {
        return this.initStatus[featureId] || {
            initialized: false,
            loaded: false,
            error: 'Feature not registered'
        };
    }

    /**
     * Unload a feature
     * @param {string} featureId - Feature ID
     * @returns {Promise<boolean>} Success indicator
     */
    async unloadFeature(featureId) {
        // Skip if not initialized
        if (!this.initStatus[featureId]?.initialized) {
            return true;
        }
        
        try {
            // Get feature
            const feature = this.getFeature(featureId);
            
            if (!feature) {
                return true;
            }
            
            // Call destroy method if it exists
            if (typeof feature.destroy === 'function') {
                await feature.destroy();
            }
            
            // Clean up
            delete this.instances[featureId];
            
            // Update init status
            this.initStatus[featureId].initialized = false;
            this.initStatus[featureId].loaded = false;
            
            // Trigger unloaded event
            this.trigger('featureUnloaded', {
                featureId
            });
            
            console.log(`Unloaded feature: ${featureId}`);
            return true;
        } catch (error) {
            console.error(`Error unloading feature ${featureId}:`, error);
            return false;
        }
    }

    /**
     * Register feature dependency
     * @param {string} featureId - Feature ID
     * @param {string} dependsOn - Dependency feature ID
     */
    registerDependency(featureId, dependsOn) {
        if (!this.dependencies[featureId]) {
            this.dependencies[featureId] = [];
        }
        
        this.dependencies[featureId].push(dependsOn);
    }

    /**
     * Check if feature has dependency
     * @param {string} featureId - Feature ID
     * @param {string} dependsOn - Dependency feature ID
     * @returns {boolean} Whether the feature depends on the dependency
     */
    hasDependency(featureId, dependsOn) {
        return this.dependencies[featureId]?.includes(dependsOn) || false;
    }

    /**
     * Get feature dependencies
     * @param {string} featureId - Feature ID
     * @returns {string[]} Dependencies
     */
    getDependencies(featureId) {
        return this.dependencies[featureId] || [];
    }

    /**
     * Register event handler for feature
     * @param {string} featureId - Feature ID
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     */
    registerFeatureEventHandler(featureId, event, handler) {
        // Get feature
        const feature = this.getFeature(featureId);
        
        if (!feature) {
            console.error(`Cannot register event handler for uninitialized feature: ${featureId}`);
            return;
        }
        
        // Register event handler
        if (typeof feature.on === 'function') {
            feature.on(event, handler);
        } else {
            console.error(`Feature does not support events: ${featureId}`);
        }
    }

    /**
     * Register an event listener
     * @param {string} event - Event name
     * @param {Function} callback - Event callback
     */
    on(event, callback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        
        this.eventListeners[event].push(callback);
    }

    /**
     * Trigger an event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    trigger(event, data) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FeatureEngine };
}
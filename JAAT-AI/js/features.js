/**
 * JAAT-AI Features Engine
 * Manages feature modules, their initialization, and interactions
 */

class Features {
    constructor(app) {
        // Reference to main app
        this.app = app;
        
        // Registered feature modules
        this.features = {};
        
        // Enabled features
        this.enabledFeatures = [];
        
        // Feature categories
        this.categories = {
            core: 'Core Features',
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
        
        // Feature metadata
        this.featureMetadata = {
            // AI features
            'ai-prompt-generator': {
                name: 'AI Prompt Generator',
                description: 'Generate effective prompts for various AI models and use cases',
                category: 'enhancement',
                icon: 'magic-wand',
                defaultEnabled: true,
                requiresSubscription: false,
                dependencies: [],
                incompatibleWith: []
            },
            'neural-drawing-canvas': {
                name: 'Neural Drawing Canvas',
                description: 'Interactive drawing canvas with AI-assisted generation and enhancement',
                category: 'visualization',
                icon: 'brush',
                defaultEnabled: true,
                requiresSubscription: true,
                dependencies: [],
                incompatibleWith: []
            },
            
            // Analysis features
            'sentiment-tracker': {
                name: 'Sentiment Tracker',
                description: 'Monitor emotional trends and sentiment analysis in text',
                category: 'analysis',
                icon: 'chart-line',
                defaultEnabled: true,
                requiresSubscription: true,
                dependencies: [],
                incompatibleWith: []
            },
            'dream-journal-sync': {
                name: 'Dream Journal Sync',
                description: 'Record, analyze, and get insights from your dreams',
                category: 'integration',
                icon: 'moon-stars',
                defaultEnabled: true,
                requiresSubscription: false,
                dependencies: [],
                incompatibleWith: []
            },
            
            // Export features
            'pdf-export': {
                name: 'PDF Export',
                description: 'Export conversations and content as PDF documents',
                category: 'output',
                icon: 'file-pdf',
                defaultEnabled: true,
                requiresSubscription: false,
                dependencies: [],
                incompatibleWith: []
            },
            'txt-export': {
                name: 'Text Export',
                description: 'Export conversations and content as plain text files',
                category: 'output',
                icon: 'file-text',
                defaultEnabled: true,
                requiresSubscription: false,
                dependencies: [],
                incompatibleWith: []
            },
            
            // Customization features
            'chatbot-skin-customizer': {
                name: 'Chatbot Skin Customizer',
                description: 'Customize the appearance and behavior of the chatbot interface',
                category: 'customization',
                icon: 'palette',
                defaultEnabled: true,
                requiresSubscription: false,
                dependencies: [],
                incompatibleWith: []
            },
            'emoji-decoder': {
                name: 'Emoji Decoder',
                description: 'Identify and explain emoji meanings and sentiment',
                category: 'enhancement',
                icon: 'emoji-smile',
                defaultEnabled: true,
                requiresSubscription: false,
                dependencies: [],
                incompatibleWith: []
            }
        };
        
        // Event listeners
        this.eventListeners = {};
        
        // Storage keys
        this.storageKeys = {
            enabledFeatures: 'jaat-enabled-features',
            featureSettings: 'jaat-feature-settings-'
        };
        
        // Feature instances
        this.instances = {};
        
        // Features settings
        this.settings = {};
    }

    /**
     * Initialize features engine
     * @param {Object} options - Configuration options
     * @returns {Promise<Features>} This instance
     */
    async init(options = {}) {
        console.log('Initializing Features engine...');
        
        // Load enabled features from storage
        await this.loadEnabledFeatures();
        
        // Register all available features
        await this.registerAvailableFeatures();
        
        // Initialize enabled features
        await this.initializeEnabledFeatures();
        
        console.log(`Features engine initialized with ${this.enabledFeatures.length} active features`);
        
        return this;
    }

    /**
     * Load enabled features from storage
     * @returns {Promise<void>}
     */
    async loadEnabledFeatures() {
        try {
            const savedFeatures = localStorage.getItem(this.storageKeys.enabledFeatures);
            
            if (savedFeatures) {
                // Parse saved features
                this.enabledFeatures = JSON.parse(savedFeatures);
                console.log(`Loaded ${this.enabledFeatures.length} enabled features from storage`);
            } else {
                // If no saved features, enable defaults
                this.enabledFeatures = Object.keys(this.featureMetadata)
                    .filter(featureId => this.featureMetadata[featureId].defaultEnabled);
                    
                console.log(`No saved features found, enabled ${this.enabledFeatures.length} default features`);
            }
        } catch (error) {
            console.error('Error loading enabled features:', error);
            
            // Fall back to defaults
            this.enabledFeatures = Object.keys(this.featureMetadata)
                .filter(featureId => this.featureMetadata[featureId].defaultEnabled);
        }
    }

    /**
     * Save enabled features to storage
     */
    saveEnabledFeatures() {
        try {
            localStorage.setItem(this.storageKeys.enabledFeatures, JSON.stringify(this.enabledFeatures));
        } catch (error) {
            console.error('Error saving enabled features:', error);
        }
    }

    /**
     * Register all available feature modules
     * @returns {Promise<void>}
     */
    async registerAvailableFeatures() {
        // This would normally dynamically import feature modules
        // For this example, we'll manually register them
        
        try {
            // Define feature registrations
            const featureRegistrations = [
                { id: 'ai-prompt-generator', className: 'AIPromptGenerator', path: '../features/ai-prompt-generator.js' },
                { id: 'neural-drawing-canvas', className: 'NeuralDrawingCanvas', path: '../features/neural-drawing-canvas.js' },
                { id: 'sentiment-tracker', className: 'SentimentTracker', path: '../features/sentiment-tracker.js' },
                { id: 'dream-journal-sync', className: 'DreamJournalSync', path: '../features/dream-journal-sync.js' },
                { id: 'pdf-export', className: 'PDFExport', path: '../features/pdf-export.js' },
                { id: 'txt-export', className: 'TXTExport', path: '../features/txt-export.js' },
                { id: 'chatbot-skin-customizer', className: 'ChatbotSkinCustomizer', path: '../features/chatbot-skin-customizer.js' },
                { id: 'emoji-decoder', className: 'EmojiDecoder', path: '../features/emoji-decoder.js' }
            ];
            
            // Register each feature
            for (const reg of featureRegistrations) {
                await this.registerFeature(reg.id, reg.className, reg.path);
            }
            
            console.log(`Registered ${featureRegistrations.length} features`);
        } catch (error) {
            console.error('Error registering features:', error);
        }
    }

    /**
     * Register a single feature
     * @param {string} featureId - Feature ID
     * @param {string} className - Feature class name
     * @param {string} path - Feature module path
     * @returns {Promise<boolean>} Success indicator
     */
    async registerFeature(featureId, className, path) {
        try {
            // Check if feature metadata exists
            if (!this.featureMetadata[featureId]) {
                console.warn(`No metadata found for feature: ${featureId}`);
                return false;
            }
            
            // Store feature registration info
            this.features[featureId] = {
                id: featureId,
                className,
                path,
                loaded: false,
                initialized: false,
                instance: null,
                ...this.featureMetadata[featureId]
            };
            
            return true;
        } catch (error) {
            console.error(`Error registering feature ${featureId}:`, error);
            return false;
        }
    }

    /**
     * Initialize all enabled features
     * @returns {Promise<void>}
     */
    async initializeEnabledFeatures() {
        const featuresToInit = [...this.enabledFeatures];
        
        for (const featureId of featuresToInit) {
            await this.initializeFeature(featureId);
        }
    }

    /**
     * Initialize a specific feature
     * @param {string} featureId - Feature ID to initialize
     * @returns {Promise<boolean>} Success indicator
     */
    async initializeFeature(featureId) {
        // Check if feature exists
        if (!this.features[featureId]) {
            console.error(`Cannot initialize unknown feature: ${featureId}`);
            return false;
        }
        
        // Check if feature is already initialized
        if (this.features[featureId].initialized) {
            console.log(`Feature already initialized: ${featureId}`);
            return true;
        }
        
        const feature = this.features[featureId];
        
        try {
            // Check dependencies
            for (const depId of feature.dependencies || []) {
                if (!this.isFeatureEnabled(depId)) {
                    console.log(`Enabling dependency ${depId} for feature ${featureId}`);
                    
                    // Enable and initialize dependency
                    this.enableFeature(depId);
                    await this.initializeFeature(depId);
                }
            }
            
            // Load feature module if not already loaded
            if (!feature.loaded) {
                // In a real implementation, this would dynamically import the module
                // For this example, we'll assume the module is already available globally
                
                /*
                // Dynamic import example that would be used in production:
                const module = await import(feature.path);
                const FeatureClass = module[feature.className];
                */
                
                // For this demo, assume the class is already available in the global scope
                // In a real implementation, you would use the dynamic import above
                const FeatureClass = window[feature.className];
                
                if (!FeatureClass) {
                    throw new Error(`Feature class not found: ${feature.className}`);
                }
                
                feature.loaded = true;
            }
            
            // Create instance if not already created
            if (!feature.instance) {
                // In a real implementation, this would use the dynamically imported class
                // For this demo, we'll use the global class
                const FeatureClass = window[feature.className];
                feature.instance = new FeatureClass();
                
                // Store instance in instances map
                this.instances[featureId] = feature.instance;
            }
            
            // Load feature settings
            await this.loadFeatureSettings(featureId);
            
            // Initialize feature with settings
            await feature.instance.init(this.settings[featureId] || {});
            
            // Mark as initialized
            feature.initialized = true;
            
            // Add to enabled features if not already there
            if (!this.enabledFeatures.includes(featureId)) {
                this.enabledFeatures.push(featureId);
                this.saveEnabledFeatures();
            }
            
            // Trigger feature initialized event
            this.trigger('featureInitialized', {
                featureId,
                feature
            });
            
            console.log(`Initialized feature: ${feature.name} (${featureId})`);
            return true;
        } catch (error) {
            console.error(`Error initializing feature ${featureId}:`, error);
            
            // Mark as not initialized
            feature.initialized = false;
            
            // Trigger feature initialization failed event
            this.trigger('featureInitializationFailed', {
                featureId,
                feature,
                error: error.message
            });
            
            return false;
        }
    }

    /**
     * Load settings for a specific feature
     * @param {string} featureId - Feature ID
     * @returns {Promise<void>}
     */
    async loadFeatureSettings(featureId) {
        try {
            const storageKey = `${this.storageKeys.featureSettings}${featureId}`;
            const savedSettings = localStorage.getItem(storageKey);
            
            if (savedSettings) {
                this.settings[featureId] = JSON.parse(savedSettings);
            } else {
                // Initialize empty settings object
                this.settings[featureId] = {};
            }
        } catch (error) {
            console.error(`Error loading settings for feature ${featureId}:`, error);
            this.settings[featureId] = {};
        }
    }

    /**
     * Save settings for a specific feature
     * @param {string} featureId - Feature ID
     * @param {Object} settings - Feature settings
     */
    saveFeatureSettings(featureId, settings) {
        try {
            const storageKey = `${this.storageKeys.featureSettings}${featureId}`;
            
            // Update settings
            this.settings[featureId] = settings;
            
            // Save to storage
            localStorage.setItem(storageKey, JSON.stringify(settings));
        } catch (error) {
            console.error(`Error saving settings for feature ${featureId}:`, error);
        }
    }

    /**
     * Enable a feature
     * @param {string} featureId - Feature ID to enable
     * @returns {Promise<boolean>} Success indicator
     */
    async enableFeature(featureId) {
        // Check if feature exists
        if (!this.features[featureId]) {
            console.error(`Cannot enable unknown feature: ${featureId}`);
            return false;
        }
        
        // Check if feature is already enabled
        if (this.isFeatureEnabled(featureId)) {
            return true;
        }
        
        const feature = this.features[featureId];
        
        // Check for incompatibilities
        for (const incompatibleId of feature.incompatibleWith || []) {
            if (this.isFeatureEnabled(incompatibleId)) {
                console.error(`Cannot enable feature ${featureId}: Incompatible with ${incompatibleId}`);
                
                // Trigger incompatibility event
                this.trigger('featureIncompatibility', {
                    featureId,
                    incompatibleWith: incompatibleId
                });
                
                return false;
            }
        }
        
        // Check subscription requirement
        if (feature.requiresSubscription) {
            const hasSubscription = await this.checkSubscription();
            
            if (!hasSubscription) {
                console.log(`Feature ${featureId} requires subscription`);
                
                // Trigger subscription required event
                this.trigger('subscriptionRequired', {
                    featureId,
                    feature
                });
                
                return false;
            }
        }
        
        // Add to enabled features
        this.enabledFeatures.push(featureId);
        
        // Save enabled features
        this.saveEnabledFeatures();
        
        // Initialize the feature
        const initialized = await this.initializeFeature(featureId);
        
        if (initialized) {
            // Trigger feature enabled event
            this.trigger('featureEnabled', {
                featureId,
                feature
            });
        }
        
        return initialized;
    }

    /**
     * Disable a feature
     * @param {string} featureId - Feature ID to disable
     * @returns {boolean} Success indicator
     */
    disableFeature(featureId) {
        // Check if feature exists
        if (!this.features[featureId]) {
            console.error(`Cannot disable unknown feature: ${featureId}`);
            return false;
        }
        
        // Check if feature is already disabled
        if (!this.isFeatureEnabled(featureId)) {
            return true;
        }
        
        // Check if there are dependent features
        const dependentFeatures = this.findDependentFeatures(featureId);
        
        if (dependentFeatures.length > 0) {
            console.error(`Cannot disable feature ${featureId}: Required by ${dependentFeatures.join(', ')}`);
            
            // Trigger dependency event
            this.trigger('featureDependencyBlocking', {
                featureId,
                dependentFeatures
            });
            
            return false;
        }
        
        // Remove from enabled features
        this.enabledFeatures = this.enabledFeatures.filter(id => id !== featureId);
        
        // Save enabled features
        this.saveEnabledFeatures();
        
        // Trigger feature disabled event
        this.trigger('featureDisabled', {
            featureId,
            feature: this.features[featureId]
        });
        
        return true;
    }

    /**
     * Find features that depend on a specific feature
     * @param {string} featureId - Feature ID to check dependencies for
     * @returns {string[]} List of feature IDs that depend on the specified feature
     */
    findDependentFeatures(featureId) {
        return Object.keys(this.features)
            .filter(id => this.isFeatureEnabled(id))
            .filter(id => {
                const feature = this.features[id];
                return feature.dependencies && feature.dependencies.includes(featureId);
            });
    }

    /**
     * Check if a feature is enabled
     * @param {string} featureId - Feature ID to check
     * @returns {boolean} Whether the feature is enabled
     */
    isFeatureEnabled(featureId) {
        return this.enabledFeatures.includes(featureId);
    }

    /**
     * Get all enabled features
     * @returns {string[]} List of enabled feature IDs
     */
    getEnabledFeatures() {
        return [...this.enabledFeatures];
    }

    /**
     * Get count of enabled features
     * @returns {number} Number of enabled features
     */
    getEnabledFeaturesCount() {
        return this.enabledFeatures.length;
    }

    /**
     * Get all available features
     * @returns {Object} Map of all available features
     */
    getAllFeatures() {
        return { ...this.features };
    }

    /**
     * Get features by category
     * @param {string} categoryId - Category ID
     * @returns {Object} Map of features in the category
     */
    getFeaturesByCategory(categoryId) {
        return Object.fromEntries(
            Object.entries(this.features)
                .filter(([_, feature]) => feature.category === categoryId)
        );
    }

    /**
     * Get available categories
     * @returns {Object} Map of category IDs to names
     */
    getCategories() {
        return { ...this.categories };
    }

    /**
     * Get an instance of a feature
     * @param {string} featureId - Feature ID
     * @returns {Object|null} Feature instance or null if not found
     */
    getFeatureInstance(featureId) {
        return this.instances[featureId] || null;
    }

    /**
     * Update settings for a feature
     * @param {string} featureId - Feature ID
     * @param {Object} settings - New settings
     * @returns {boolean} Success indicator
     */
    updateFeatureSettings(featureId, settings) {
        // Check if feature exists
        if (!this.features[featureId]) {
            console.error(`Cannot update settings for unknown feature: ${featureId}`);
            return false;
        }
        
        // Get feature instance
        const instance = this.getFeatureInstance(featureId);
        
        if (!instance) {
            console.error(`Feature instance not found: ${featureId}`);
            return false;
        }
        
        // Merge existing settings with new settings
        const updatedSettings = {
            ...(this.settings[featureId] || {}),
            ...settings
        };
        
        // Save updated settings
        this.saveFeatureSettings(featureId, updatedSettings);
        
        // Apply settings to instance if it has an updateSettings method
        if (typeof instance.updateSettings === 'function') {
            instance.updateSettings(updatedSettings);
        }
        
        // Trigger settings updated event
        this.trigger('featureSettingsUpdated', {
            featureId,
            settings: updatedSettings
        });
        
        return true;
    }

    /**
     * Check if user has required subscription for premium features
     * @returns {Promise<boolean>} Whether user has required subscription
     * @private
     */
    async checkSubscription() {
        // In a real implementation, this would check with a payment/license system
        // For this demo, we'll assume the user has access to all features
        
        // Example code that would be used in production:
        /*
        try {
            // Reference payment system through the main app
            const paymentSystem = this.app.components.payments;
            
            // Check subscription status
            const subscriptionStatus = await paymentSystem.getSubscriptionStatus();
            
            return subscriptionStatus.active && subscriptionStatus.plan !== 'free';
        } catch (error) {
            console.error('Error checking subscription:', error);
            return false;
        }
        */
        
        // For demo purposes, always return true
        return true;
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
    module.exports = { Features };
}
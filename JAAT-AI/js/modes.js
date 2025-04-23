/**
 * JAAT-AI Modes Controller
 * Manages different AI modes and their configurations
 */

class Modes {
    constructor(app) {
        // Reference to main app
        this.app = app;
        
        // Available modes
        this.modes = {
            // Default conversation mode
            'default': {
                id: 'default',
                name: 'Conversational AI',
                description: 'General purpose AI assistant for everyday conversations and questions',
                icon: 'chat-dots',
                color: '#7C3AED', // Violet
                model: 'gpt-4o',
                temperature: 0.7,
                maxTokens: 1000,
                systemPrompt: 'You are JAAT-AI, a helpful, friendly, and informative AI assistant. You aim to provide accurate and thoughtful responses while maintaining a conversational tone.',
                features: ['all'],
                requiresSubscription: false,
                settings: {}
            },
            
            // Creative writing assistant
            'creative': {
                id: 'creative',
                name: 'Creative Writer',
                description: 'Specialized in creative writing, storytelling, and artistic expression',
                icon: 'feather',
                color: '#EC4899', // Pink
                model: 'gpt-4o',
                temperature: 0.9,
                maxTokens: 2000,
                systemPrompt: 'You are JAAT-AI in Creative Writer mode. You excel at creative writing, storytelling, poetry, and generating imaginative content. Be expressive, use vivid language, and help users develop their creative ideas.',
                features: ['ai-prompt-generator', 'dream-journal-sync', 'txt-export', 'pdf-export'],
                requiresSubscription: false,
                settings: {
                    writingStyles: ['narrative', 'descriptive', 'poetic', 'journalistic', 'technical'],
                    defaultStyle: 'narrative',
                    toneOptions: ['casual', 'formal', 'humorous', 'serious', 'inspirational'],
                    defaultTone: 'casual'
                }
            },
            
            // Code assistant
            'coder': {
                id: 'coder',
                name: 'Code Assistant',
                description: 'Expert in programming, code generation, debugging, and technical documentation',
                icon: 'code',
                color: '#3B82F6', // Blue
                model: 'gpt-4o',
                temperature: 0.3,
                maxTokens: 2000,
                systemPrompt: 'You are JAAT-AI in Code Assistant mode. You excel at generating code, debugging, explaining programming concepts, and helping with technical documentation. Provide accurate, efficient code solutions and detailed explanations.',
                features: ['ai-prompt-generator', 'txt-export', 'pdf-export'],
                requiresSubscription: false,
                settings: {
                    languages: ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'TypeScript', 'PHP', 'Ruby', 'Swift'],
                    defaultLanguage: 'JavaScript',
                    codeStyle: 'readable',
                    includeComments: true,
                    indentationSpaces: 4
                }
            },
            
            // Business assistant
            'business': {
                id: 'business',
                name: 'Business Advisor',
                description: 'Specialized in business strategy, marketing, finance, and professional communication',
                icon: 'briefcase',
                color: '#059669', // Emerald
                model: 'gpt-4o',
                temperature: 0.4,
                maxTokens: 1500,
                systemPrompt: 'You are JAAT-AI in Business Advisor mode. You excel at providing business advice, strategic planning, marketing ideas, financial analysis, and professional communication assistance. Be practical, insightful, and focus on actionable advice.',
                features: ['sentiment-tracker', 'ai-prompt-generator', 'pdf-export'],
                requiresSubscription: true,
                settings: {
                    businessAreas: ['marketing', 'strategy', 'finance', 'operations', 'hr', 'sales'],
                    defaultArea: 'strategy',
                    formalityLevel: 'professional'
                }
            },
            
            // Academic assistant
            'academic': {
                id: 'academic',
                name: 'Academic Assistant',
                description: 'Expert in research, academic writing, and educational topics',
                icon: 'book',
                color: '#8B5CF6', // Purple
                model: 'gpt-4o',
                temperature: 0.2,
                maxTokens: 2000,
                systemPrompt: 'You are JAAT-AI in Academic Assistant mode. You excel at providing well-researched information, helping with academic writing, explaining complex concepts, and assisting with educational needs. Maintain a scholarly approach and emphasize accurate information.',
                features: ['ai-prompt-generator', 'pdf-export'],
                requiresSubscription: true,
                settings: {
                    citationStyle: 'APA',
                    academicLevel: 'university',
                    disciplineFocus: 'general'
                }
            },
            
            // Visual creator
            'visual': {
                id: 'visual',
                name: 'Visual Creator',
                description: 'Specialized in generating and editing images, design concepts, and visual content',
                icon: 'image',
                color: '#F97316', // Orange
                model: 'gpt-4o',
                temperature: 0.7,
                maxTokens: 1000,
                systemPrompt: 'You are JAAT-AI in Visual Creator mode. You excel at helping users create visual content, generate image prompts, describe design concepts, and provide artistic guidance. Focus on visual details and creative imagery.',
                features: ['neural-drawing-canvas', 'ai-prompt-generator'],
                requiresSubscription: true,
                settings: {
                    visualStyle: 'balanced',
                    colorPalette: 'vibrant',
                    detailLevel: 'high'
                }
            },
            
            // Personal coach
            'coach': {
                id: 'coach',
                name: 'Personal Coach',
                description: 'Supportive coach for personal development, motivation, and wellness',
                icon: 'sparkles',
                color: '#F59E0B', // Amber
                model: 'gpt-4o',
                temperature: 0.6,
                maxTokens: 1200,
                systemPrompt: 'You are JAAT-AI in Personal Coach mode. You excel at providing supportive coaching, personal development advice, motivation, goal-setting assistance, and wellness guidance. Be encouraging, empathetic, and focused on helping users achieve their best selves.',
                features: ['dream-journal-sync', 'sentiment-tracker'],
                requiresSubscription: true,
                settings: {
                    coachingStyle: 'supportive',
                    focusAreas: ['productivity', 'wellness', 'career', 'relationships', 'personal growth'],
                    defaultFocusArea: 'personal growth'
                }
            }
        };
        
        // Current active mode
        this.activeMode = 'default';
        
        // Custom user-created modes
        this.customModes = {};
        
        // Mode history
        this.modeHistory = [];
        
        // Max history size
        this.maxHistorySize = 10;
        
        // Mode change callbacks
        this.eventListeners = {};
        
        // Storage keys
        this.storageKeys = {
            customModes: 'jaat-custom-modes',
            lastActiveMode: 'jaat-last-active-mode'
        };
    }

    /**
     * Initialize modes
     * @param {Object} options - Configuration options
     * @returns {Promise<void>}
     */
    async init(options = {}) {
        console.log('Initializing Modes controller...');
        
        // Load custom modes from storage
        await this.loadCustomModes();
        
        // Load last active mode
        await this.loadLastActiveMode();
        
        // Apply any additional options
        if (options) {
            if (options.initialMode) {
                this.activeMode = this.hasMode(options.initialMode) ? 
                    options.initialMode : 'default';
            }
        }
        
        console.log(`Initialized with ${Object.keys(this.modes).length} built-in modes and ${Object.keys(this.customModes).length} custom modes`);
        console.log(`Active mode: ${this.activeMode}`);
    }

    /**
     * Load custom modes from storage
     * @returns {Promise<void>}
     */
    async loadCustomModes() {
        try {
            const savedModes = localStorage.getItem(this.storageKeys.customModes);
            
            if (savedModes) {
                this.customModes = JSON.parse(savedModes);
                console.log(`Loaded ${Object.keys(this.customModes).length} custom modes from storage`);
            }
        } catch (error) {
            console.error('Error loading custom modes:', error);
            this.customModes = {};
        }
    }

    /**
     * Save custom modes to storage
     */
    saveCustomModes() {
        try {
            localStorage.setItem(this.storageKeys.customModes, JSON.stringify(this.customModes));
        } catch (error) {
            console.error('Error saving custom modes:', error);
        }
    }

    /**
     * Load last active mode from storage
     * @returns {Promise<void>}
     */
    async loadLastActiveMode() {
        try {
            const lastMode = localStorage.getItem(this.storageKeys.lastActiveMode);
            
            if (lastMode && this.hasMode(lastMode)) {
                this.activeMode = lastMode;
                console.log(`Loaded last active mode: ${this.activeMode}`);
            }
        } catch (error) {
            console.error('Error loading last active mode:', error);
        }
    }

    /**
     * Save last active mode to storage
     */
    saveLastActiveMode() {
        try {
            localStorage.setItem(this.storageKeys.lastActiveMode, this.activeMode);
        } catch (error) {
            console.error('Error saving last active mode:', error);
        }
    }

    /**
     * Check if a mode exists
     * @param {string} modeId - Mode ID to check
     * @returns {boolean} Whether the mode exists
     */
    hasMode(modeId) {
        return (modeId in this.modes) || (modeId in this.customModes);
    }

    /**
     * Get all available modes
     * @param {boolean} includeCustom - Whether to include custom modes
     * @param {boolean} includeSubscriptionOnly - Whether to include subscription-only modes
     * @returns {Object} Available modes
     */
    getAllModes(includeCustom = true, includeSubscriptionOnly = true) {
        let result = { ...this.modes };
        
        // Filter out subscription-only modes if needed
        if (!includeSubscriptionOnly) {
            result = Object.fromEntries(
                Object.entries(result).filter(([_, mode]) => !mode.requiresSubscription)
            );
        }
        
        // Add custom modes if needed
        if (includeCustom) {
            result = { ...result, ...this.customModes };
        }
        
        return result;
    }

    /**
     * Get a specific mode by ID
     * @param {string} modeId - Mode ID
     * @returns {Object|null} Mode data or null if not found
     */
    getMode(modeId) {
        if (modeId in this.modes) {
            return this.modes[modeId];
        }
        
        if (modeId in this.customModes) {
            return this.customModes[modeId];
        }
        
        return null;
    }

    /**
     * Get the current active mode
     * @returns {Object} Active mode data
     */
    getActiveMode() {
        return this.getMode(this.activeMode);
    }

    /**
     * Get settings for a specific mode
     * @param {string} modeId - Mode ID
     * @returns {Object|null} Mode settings or null if mode not found
     */
    getModeSettings(modeId) {
        const mode = this.getMode(modeId);
        return mode ? mode.settings : null;
    }

    /**
     * Activate a specific mode
     * @param {string} modeId - Mode ID to activate
     * @returns {Promise<boolean>} Success indicator
     */
    async activateMode(modeId) {
        // Validate mode exists
        if (!this.hasMode(modeId)) {
            console.error(`Cannot activate mode ${modeId}: Mode not found`);
            return false;
        }
        
        // Get mode data
        const mode = this.getMode(modeId);
        
        // Check if mode requires subscription
        if (mode.requiresSubscription) {
            // Check if user has necessary subscription
            // This would typically call to the payment/license system
            const hasSubscription = await this.checkSubscription();
            
            if (!hasSubscription) {
                console.log(`Mode ${modeId} requires subscription`);
                this.trigger('subscriptionRequired', {
                    modeId,
                    mode
                });
                return false;
            }
        }
        
        // Record previous mode in history
        if (this.activeMode !== modeId) {
            this.modeHistory.push(this.activeMode);
            
            // Limit history size
            if (this.modeHistory.length > this.maxHistorySize) {
                this.modeHistory.shift();
            }
        }
        
        // Set active mode
        const previousMode = this.activeMode;
        this.activeMode = modeId;
        
        // Save last active mode
        this.saveLastActiveMode();
        
        // Trigger mode change event
        this.trigger('modeChanged', {
            previousMode,
            newMode: modeId,
            modeData: mode
        });
        
        console.log(`Activated mode: ${modeId}`);
        return true;
    }

    /**
     * Get previous mode from history
     * @returns {string|null} Previous mode ID or null if history is empty
     */
    getPreviousMode() {
        if (this.modeHistory.length === 0) {
            return null;
        }
        
        return this.modeHistory[this.modeHistory.length - 1];
    }

    /**
     * Switch to previous mode
     * @returns {Promise<boolean>} Success indicator
     */
    async switchToPreviousMode() {
        const previousMode = this.getPreviousMode();
        
        if (!previousMode) {
            return false;
        }
        
        // Remove from history since we're going back
        this.modeHistory.pop();
        
        // Activate previous mode
        return this.activateMode(previousMode);
    }

    /**
     * Create a new custom mode
     * @param {Object} modeData - Mode configuration data
     * @returns {string} Created mode ID
     */
    createCustomMode(modeData) {
        // Generate ID if not provided
        if (!modeData.id) {
            modeData.id = `custom_${Date.now()}`;
        }
        
        // Ensure ID doesn't conflict with built-in modes
        if (modeData.id in this.modes) {
            throw new Error(`Custom mode ID ${modeData.id} conflicts with a built-in mode`);
        }
        
        // Set default values for required fields
        const defaultMode = {
            name: `Custom Mode ${Object.keys(this.customModes).length + 1}`,
            description: 'User-created custom mode',
            icon: 'star',
            color: '#7C3AED',
            model: 'gpt-4o',
            temperature: 0.7,
            maxTokens: 1000,
            systemPrompt: 'You are JAAT-AI in a custom mode. Be helpful and respond according to the user\'s needs.',
            features: ['all'],
            requiresSubscription: false,
            settings: {}
        };
        
        // Merge with provided data
        const newMode = { ...defaultMode, ...modeData };
        
        // Add to custom modes
        this.customModes[newMode.id] = newMode;
        
        // Save to storage
        this.saveCustomModes();
        
        // Trigger event
        this.trigger('customModeCreated', newMode);
        
        console.log(`Created custom mode: ${newMode.id}`);
        return newMode.id;
    }

    /**
     * Update an existing custom mode
     * @param {string} modeId - Mode ID to update
     * @param {Object} modeData - New mode data
     * @returns {boolean} Success indicator
     */
    updateCustomMode(modeId, modeData) {
        // Check if mode exists and is a custom mode
        if (!(modeId in this.customModes)) {
            console.error(`Cannot update mode ${modeId}: Not a custom mode`);
            return false;
        }
        
        // Get current mode data
        const currentMode = this.customModes[modeId];
        
        // Update mode data
        const updatedMode = { ...currentMode, ...modeData };
        
        // Ensure ID cannot be changed
        updatedMode.id = modeId;
        
        // Update custom modes
        this.customModes[modeId] = updatedMode;
        
        // Save to storage
        this.saveCustomModes();
        
        // Trigger event
        this.trigger('customModeUpdated', updatedMode);
        
        // Update active mode if this is the currently active mode
        if (this.activeMode === modeId) {
            this.trigger('modeChanged', {
                previousMode: modeId,
                newMode: modeId,
                modeData: updatedMode
            });
        }
        
        console.log(`Updated custom mode: ${modeId}`);
        return true;
    }

    /**
     * Delete a custom mode
     * @param {string} modeId - Mode ID to delete
     * @returns {boolean} Success indicator
     */
    deleteCustomMode(modeId) {
        // Check if mode exists and is a custom mode
        if (!(modeId in this.customModes)) {
            console.error(`Cannot delete mode ${modeId}: Not a custom mode`);
            return false;
        }
        
        // Store mode data for event
        const deletedMode = this.customModes[modeId];
        
        // Remove from custom modes
        delete this.customModes[modeId];
        
        // Save to storage
        this.saveCustomModes();
        
        // If this was the active mode, switch to default
        if (this.activeMode === modeId) {
            this.activeMode = 'default';
            this.saveLastActiveMode();
            
            this.trigger('modeChanged', {
                previousMode: modeId,
                newMode: 'default',
                modeData: this.modes.default
            });
        }
        
        // Remove from history
        this.modeHistory = this.modeHistory.filter(id => id !== modeId);
        
        // Trigger event
        this.trigger('customModeDeleted', deletedMode);
        
        console.log(`Deleted custom mode: ${modeId}`);
        return true;
    }

    /**
     * Check if user has required subscription for subscription modes
     * @returns {Promise<boolean>} Whether user has required subscription
     * @private
     */
    async checkSubscription() {
        // In a real implementation, this would check with a payment/license system
        // For this demo, we'll assume the user has access to all modes
        
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
     * Register event listener
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
     * Trigger event
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
    module.exports = { Modes };
}
/**
 * JAAT-AI Chatbot Engine
 * Core chatbot functionality for processing messages and generating responses
 */

class ChatbotEngine {
    constructor(app) {
        // Reference to main app
        this.app = app;
        
        // Conversation history
        this.history = [];
        
        // Maximum history size
        this.maxHistorySize = 100;
        
        // Current context - additional info to enhance responses
        this.context = {
            location: null,
            time: new Date(),
            recentTopics: [],
            userPreferences: {},
            activeFeatures: []
        };
        
        // Message processing hooks
        this.hooks = {
            preProcessors: [],
            postProcessors: [],
            interceptors: []
        };
        
        // Response generator
        this.responseGenerator = null;
        
        // API settings
        this.apiSettings = {
            endpoint: '/api/chat',
            timeout: 30000,
            retries: 2,
            useStream: true
        };
        
        // Stream handling
        this.currentStream = null;
        this.streamController = null;
        
        // Queue for handling multiple requests
        this.messageQueue = [];
        this.isProcessing = false;
        
        // Model settings
        this.modelSettings = {
            model: 'gpt-4o',
            temperature: 0.7,
            maxTokens: 1500,
            topP: 1,
            frequencyPenalty: 0.5,
            presencePenalty: 0.5
        };
        
        // Rate limiting
        this.rateLimiter = {
            enabled: true,
            maxRequests: 10,
            interval: 60000, // 1 minute
            requestCount: 0,
            lastResetTime: Date.now()
        };
        
        // Event listeners
        this.eventListeners = {};
        
        // Storage keys
        this.storageKeys = {
            history: 'jaat-chat-history',
            settings: 'jaat-chatbot-settings'
        };
    }

    /**
     * Initialize the chatbot engine
     * @param {Object} options - Configuration options
     * @returns {Promise<void>}
     */
    async init(options = {}) {
        console.log('Initializing Chatbot Engine...');
        
        // Apply custom options
        if (options) {
            // API settings
            if (options.apiSettings) {
                Object.assign(this.apiSettings, options.apiSettings);
            }
            
            // Model settings
            if (options.modelSettings) {
                Object.assign(this.modelSettings, options.modelSettings);
            }
            
            // Rate limiting
            if (options.rateLimiter) {
                Object.assign(this.rateLimiter, options.rateLimiter);
            }
            
            // Max history size
            if (options.maxHistorySize) {
                this.maxHistorySize = options.maxHistorySize;
            }
        }
        
        // Initialize response generator
        this.responseGenerator = new ResponseGenerator(this.app);
        await this.responseGenerator.init();
        
        // Load conversation history
        await this.loadHistory();
        
        // Register default message processors
        this.registerDefaultProcessors();
        
        // Update context
        this.updateContext();
        
        console.log('Chatbot Engine initialized');
    }

    /**
     * Register default message processors
     */
    registerDefaultProcessors() {
        // Pre-processors
        this.registerPreProcessor(this.sanitizeInput.bind(this));
        this.registerPreProcessor(this.detectCommands.bind(this));
        this.registerPreProcessor(this.expandAcronyms.bind(this));
        
        // Post-processors
        this.registerPostProcessor(this.formatResponse.bind(this));
        this.registerPostProcessor(this.detectSentiment.bind(this));
        this.registerPostProcessor(this.trackTopics.bind(this));
        
        // Interceptors
        this.registerInterceptor(this.handleKeywords.bind(this));
    }

    /**
     * Load conversation history from storage
     * @returns {Promise<void>}
     */
    async loadHistory() {
        try {
            const saved = localStorage.getItem(this.storageKeys.history);
            
            if (saved) {
                this.history = JSON.parse(saved);
                console.log(`Loaded ${this.history.length} messages from history`);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
            this.history = [];
        }
    }

    /**
     * Save conversation history to storage
     */
    saveHistory() {
        try {
            localStorage.setItem(this.storageKeys.history, JSON.stringify(this.history));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }

    /**
     * Add a message to the history
     * @param {Object} message - Message to add
     */
    addToHistory(message) {
        this.history.push(message);
        
        // Limit history size
        if (this.history.length > this.maxHistorySize) {
            this.history = this.history.slice(-this.maxHistorySize);
        }
        
        // Save history
        this.saveHistory();
    }

    /**
     * Clear conversation history
     */
    clearHistory() {
        this.history = [];
        this.saveHistory();
        
        // Reset context
        this.context.recentTopics = [];
        
        // Trigger history cleared event
        this.trigger('historyCleared');
    }

    /**
     * Update current context
     */
    updateContext() {
        // Update time
        this.context.time = new Date();
        
        // Update active features
        if (this.app.components.features) {
            this.context.activeFeatures = this.app.components.features.getEnabledFeatures();
        }
        
        // Update active mode
        if (this.app.components.modes) {
            const activeMode = this.app.components.modes.getActiveMode();
            if (activeMode) {
                this.context.activeMode = activeMode.id;
            }
        }
    }

    /**
     * Set user location
     * @param {Object} location - User location
     */
    setLocation(location) {
        this.context.location = location;
    }

    /**
     * Set user preferences
     * @param {Object} preferences - User preferences
     */
    setUserPreferences(preferences) {
        this.context.userPreferences = {
            ...this.context.userPreferences,
            ...preferences
        };
    }

    /**
     * Register a pre-processor function
     * @param {Function} processor - Processor function
     */
    registerPreProcessor(processor) {
        this.hooks.preProcessors.push(processor);
    }

    /**
     * Register a post-processor function
     * @param {Function} processor - Processor function
     */
    registerPostProcessor(processor) {
        this.hooks.postProcessors.push(processor);
    }

    /**
     * Register an interceptor function
     * @param {Function} interceptor - Interceptor function
     */
    registerInterceptor(interceptor) {
        this.hooks.interceptors.push(interceptor);
    }

    /**
     * Process a user message
     * @param {string} message - User message
     * @param {Object} options - Processing options
     * @returns {Promise<Object>} Response object
     */
    async processMessage(message, options = {}) {
        // Check rate limiting
        if (this.rateLimiter.enabled && !this.checkRateLimit()) {
            return {
                type: 'error',
                content: 'You are sending messages too quickly. Please wait a moment and try again.',
                error: 'RATE_LIMITED'
            };
        }
        
        // Create message object
        const userMessage = {
            id: this.generateMessageId(),
            type: 'user',
            content: message,
            timestamp: new Date().toISOString(),
            options
        };
        
        // Add to history
        this.addToHistory(userMessage);
        
        // Trigger message received event
        this.trigger('messageReceived', userMessage);
        
        try {
            // Update context
            this.updateContext();
            
            // Apply pre-processors
            let processedMessage = message;
            for (const processor of this.hooks.preProcessors) {
                processedMessage = await processor(processedMessage, this.context);
            }
            
            // Check interceptors
            for (const interceptor of this.hooks.interceptors) {
                const interceptResult = await interceptor(processedMessage, this.context);
                
                if (interceptResult) {
                    // Interceptor handled the message
                    const responseMessage = {
                        id: this.generateMessageId(),
                        type: 'bot',
                        content: interceptResult,
                        timestamp: new Date().toISOString(),
                        intercepted: true
                    };
                    
                    // Add to history
                    this.addToHistory(responseMessage);
                    
                    // Apply post-processors
                    let processedResponse = responseMessage.content;
                    for (const processor of this.hooks.postProcessors) {
                        processedResponse = await processor(processedResponse, this.context);
                    }
                    
                    responseMessage.content = processedResponse;
                    
                    // Trigger response event
                    this.trigger('responseGenerated', responseMessage);
                    
                    return responseMessage;
                }
            }
            
            // Generate response
            const activeMode = this.app.components.modes ? 
                this.app.components.modes.getActiveMode() : null;
                
            const systemPrompt = activeMode ? 
                activeMode.systemPrompt : 
                'You are JAAT-AI, a helpful, friendly, and informative AI assistant.';
                
            const modelSettings = {
                ...this.modelSettings,
                ...(activeMode ? {
                    temperature: activeMode.temperature,
                    maxTokens: activeMode.maxTokens
                } : {})
            };
            
            let responseContent;
            
            if (options.stream !== false && this.apiSettings.useStream) {
                // Use streaming response
                const streamController = new AbortController();
                this.streamController = streamController;
                
                // Create response message placeholder
                const responseMessage = {
                    id: this.generateMessageId(),
                    type: 'bot',
                    content: '',
                    timestamp: new Date().toISOString(),
                    streaming: true
                };
                
                // Add to history
                this.addToHistory(responseMessage);
                
                // Trigger streaming start event
                this.trigger('streamingStarted', {
                    messageId: responseMessage.id
                });
                
                // Start streaming response
                responseContent = await this.streamResponse(
                    processedMessage, 
                    systemPrompt, 
                    modelSettings, 
                    responseMessage.id,
                    streamController.signal
                );
                
                // Update response message
                responseMessage.content = responseContent;
                responseMessage.streaming = false;
                
                // Save updated history
                this.saveHistory();
                
                // Trigger streaming end event
                this.trigger('streamingEnded', {
                    messageId: responseMessage.id,
                    content: responseContent
                });
                
                // Apply post-processors
                for (const processor of this.hooks.postProcessors) {
                    responseMessage.content = await processor(responseMessage.content, this.context);
                }
                
                // Trigger response event
                this.trigger('responseGenerated', responseMessage);
                
                return responseMessage;
            } else {
                // Use non-streaming response
                responseContent = await this.generateResponse(processedMessage, systemPrompt, modelSettings);
                
                // Apply post-processors
                for (const processor of this.hooks.postProcessors) {
                    responseContent = await processor(responseContent, this.context);
                }
                
                // Create response message
                const responseMessage = {
                    id: this.generateMessageId(),
                    type: 'bot',
                    content: responseContent,
                    timestamp: new Date().toISOString()
                };
                
                // Add to history
                this.addToHistory(responseMessage);
                
                // Trigger response event
                this.trigger('responseGenerated', responseMessage);
                
                return responseMessage;
            }
        } catch (error) {
            console.error('Error processing message:', error);
            
            // Create error response
            const errorResponse = {
                id: this.generateMessageId(),
                type: 'error',
                content: 'Sorry, I encountered an error while processing your message. Please try again.',
                error: error.message,
                timestamp: new Date().toISOString()
            };
            
            // Add to history
            this.addToHistory(errorResponse);
            
            // Trigger error event
            this.trigger('error', {
                error,
                message: userMessage
            });
            
            return errorResponse;
        }
    }

    /**
     * Generate a response to a message
     * @param {string} message - User message
     * @param {string} systemPrompt - System prompt
     * @param {Object} modelSettings - Model settings
     * @returns {Promise<string>} Generated response
     */
    async generateResponse(message, systemPrompt, modelSettings) {
        try {
            // Use response generator
            return await this.responseGenerator.generateResponse(
                message,
                this.history,
                systemPrompt,
                this.context,
                modelSettings
            );
        } catch (error) {
            console.error('Error generating response:', error);
            throw error;
        }
    }

    /**
     * Stream a response to a message
     * @param {string} message - User message
     * @param {string} systemPrompt - System prompt
     * @param {Object} modelSettings - Model settings
     * @param {string} messageId - Message ID
     * @param {AbortSignal} signal - Abort signal
     * @returns {Promise<string>} Complete response
     */
    async streamResponse(message, systemPrompt, modelSettings, messageId, signal) {
        try {
            // Use response generator streaming
            let fullResponse = '';
            
            const onChunk = (chunk) => {
                fullResponse += chunk;
                
                // Trigger chunk received event
                this.trigger('streamChunkReceived', {
                    messageId,
                    chunk
                });
            };
            
            await this.responseGenerator.streamResponse(
                message,
                this.history,
                systemPrompt,
                this.context,
                modelSettings,
                onChunk,
                signal
            );
            
            return fullResponse;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Response streaming was aborted');
                return 'Response streaming was aborted.';
            }
            
            console.error('Error streaming response:', error);
            throw error;
        }
    }

    /**
     * Stop the current streaming response
     */
    stopStreamingResponse() {
        if (this.streamController) {
            this.streamController.abort();
            this.streamController = null;
            
            // Trigger streaming stopped event
            this.trigger('streamingStopped');
        }
    }

    /**
     * Check if within rate limits
     * @returns {boolean} Whether within rate limits
     */
    checkRateLimit() {
        const now = Date.now();
        
        // Reset counter if interval has passed
        if (now - this.rateLimiter.lastResetTime > this.rateLimiter.interval) {
            this.rateLimiter.requestCount = 0;
            this.rateLimiter.lastResetTime = now;
        }
        
        // Check if over limit
        if (this.rateLimiter.requestCount >= this.rateLimiter.maxRequests) {
            return false;
        }
        
        // Increment counter
        this.rateLimiter.requestCount++;
        
        return true;
    }

    /**
     * Generate a unique message ID
     * @returns {string} Generated ID
     */
    generateMessageId() {
        return 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }

    /**
     * Get conversation history
     * @param {number} limit - Maximum number of messages to return
     * @returns {Array} Conversation history
     */
    getHistory(limit = 0) {
        if (limit <= 0 || limit >= this.history.length) {
            return [...this.history];
        }
        
        return this.history.slice(-limit);
    }

    /**
     * Export conversation history
     * @param {string} format - Export format ('json', 'text', 'html', 'markdown')
     * @returns {string} Exported history
     */
    exportHistory(format = 'json') {
        switch (format.toLowerCase()) {
            case 'json':
                return JSON.stringify(this.history, null, 2);
                
            case 'text':
                return this.history.map(msg => {
                    const role = msg.type === 'user' ? 'You' : 'JAAT-AI';
                    const time = new Date(msg.timestamp).toLocaleTimeString();
                    return `[${time}] ${role}: ${msg.content}`;
                }).join('\n\n');
                
            case 'html':
                let html = '<div class="chat-history">';
                for (const msg of this.history) {
                    const role = msg.type === 'user' ? 'You' : 'JAAT-AI';
                    const cssClass = msg.type === 'user' ? 'user-message' : 'bot-message';
                    const time = new Date(msg.timestamp).toLocaleTimeString();
                    html += `
                        <div class="message ${cssClass}">
                            <div class="message-header">
                                <span class="message-sender">${role}</span>
                                <span class="message-time">${time}</span>
                            </div>
                            <div class="message-content">${msg.content}</div>
                        </div>
                    `;
                }
                html += '</div>';
                return html;
                
            case 'markdown':
                return this.history.map(msg => {
                    const role = msg.type === 'user' ? 'You' : 'JAAT-AI';
                    const time = new Date(msg.timestamp).toLocaleTimeString();
                    return `### ${role} (${time})\n\n${msg.content}`;
                }).join('\n\n');
                
            default:
                throw new Error(`Unsupported export format: ${format}`);
        }
    }

    /**
     * Import conversation history
     * @param {string} data - Imported history data
     * @param {string} format - Import format ('json', 'text')
     * @returns {boolean} Success indicator
     */
    importHistory(data, format = 'json') {
        try {
            let history = [];
            
            switch (format.toLowerCase()) {
                case 'json':
                    history = JSON.parse(data);
                    // Validate structure
                    if (!Array.isArray(history)) {
                        throw new Error('Invalid history format: Expected an array');
                    }
                    break;
                    
                default:
                    throw new Error(`Unsupported import format: ${format}`);
            }
            
            // Set history
            this.history = history;
            
            // Save history
            this.saveHistory();
            
            // Trigger history imported event
            this.trigger('historyImported', {
                count: history.length
            });
            
            return true;
        } catch (error) {
            console.error('Error importing history:', error);
            
            // Trigger error event
            this.trigger('error', {
                error,
                context: 'importHistory'
            });
            
            return false;
        }
    }

    /**
     * Pre-processor: Sanitize input
     * @param {string} input - Raw input
     * @returns {string} Sanitized input
     */
    sanitizeInput(input) {
        // Basic sanitization
        return input.trim();
    }

    /**
     * Pre-processor: Detect commands
     * @param {string} input - User input
     * @param {Object} context - Current context
     * @returns {string} Processed input
     */
    detectCommands(input, context) {
        // Command detection (simplified example)
        const commandPattern = /^\/([a-zA-Z0-9]+)(.*)/;
        const match = input.match(commandPattern);
        
        if (match) {
            const command = match[1].toLowerCase();
            const args = match[2].trim();
            
            // Add command info to context
            context.command = {
                name: command,
                args: args
            };
        }
        
        return input;
    }

    /**
     * Pre-processor: Expand acronyms
     * @param {string} input - User input
     * @returns {string} Processed input
     */
    expandAcronyms(input) {
        // Simple acronym expansion
        const acronyms = {
            'AI': 'Artificial Intelligence',
            'ML': 'Machine Learning',
            'NLP': 'Natural Language Processing',
            'JAAT': 'Just Another AI Tool'
            // Add more as needed
        };
        
        // This is simplistic; a more robust solution would use word boundaries
        for (const [acronym, expansion] of Object.entries(acronyms)) {
            const regex = new RegExp(`\\b${acronym}\\b`, 'g');
            input = input.replace(regex, `${acronym} (${expansion})`);
        }
        
        return input;
    }

    /**
     * Post-processor: Format response
     * @param {string} response - Generated response
     * @returns {string} Formatted response
     */
    formatResponse(response) {
        // Basic formatting
        return response.trim();
    }

    /**
     * Post-processor: Detect sentiment
     * @param {string} response - Generated response
     * @param {Object} context - Current context
     * @returns {string} Processed response
     */
    detectSentiment(response, context) {
        // Very basic sentiment detection
        const positiveWords = ['happy', 'glad', 'great', 'excellent', 'good', 'wonderful', 'fantastic'];
        const negativeWords = ['sad', 'sorry', 'bad', 'unfortunate', 'terrible', 'awful', 'unhappy'];
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        // Count positive words
        for (const word of positiveWords) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = response.match(regex);
            if (matches) {
                positiveCount += matches.length;
            }
        }
        
        // Count negative words
        for (const word of negativeWords) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = response.match(regex);
            if (matches) {
                negativeCount += matches.length;
            }
        }
        
        // Determine sentiment
        let sentiment = 'neutral';
        if (positiveCount > negativeCount * 2) {
            sentiment = 'positive';
        } else if (negativeCount > positiveCount * 2) {
            sentiment = 'negative';
        }
        
        // Store sentiment in context
        context.lastResponseSentiment = sentiment;
        
        return response;
    }

    /**
     * Post-processor: Track topics
     * @param {string} response - Generated response
     * @param {Object} context - Current context
     * @returns {string} Processed response
     */
    trackTopics(response, context) {
        // Simple topic tracking (for a real implementation, use NLP)
        const topicKeywords = {
            'technology': ['computer', 'software', 'hardware', 'app', 'technology', 'code', 'programming'],
            'health': ['health', 'doctor', 'medical', 'exercise', 'diet', 'fitness'],
            'finance': ['money', 'finance', 'investment', 'stock', 'budget', 'financial'],
            'travel': ['travel', 'vacation', 'trip', 'flight', 'hotel', 'destination'],
            'food': ['food', 'recipe', 'cook', 'meal', 'restaurant', 'ingredient']
        };
        
        const topicCounts = {};
        
        // Count keywords for each topic
        for (const [topic, keywords] of Object.entries(topicKeywords)) {
            topicCounts[topic] = 0;
            for (const keyword of keywords) {
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                const matches = response.match(regex);
                if (matches) {
                    topicCounts[topic] += matches.length;
                }
            }
        }
        
        // Find most mentioned topic
        let maxCount = 0;
        let dominantTopic = null;
        
        for (const [topic, count] of Object.entries(topicCounts)) {
            if (count > maxCount) {
                maxCount = count;
                dominantTopic = topic;
            }
        }
        
        // Update recent topics if a dominant topic was found
        if (dominantTopic && maxCount > 2) {
            context.recentTopics.unshift(dominantTopic);
            
            // Limit to last 5 topics
            context.recentTopics = context.recentTopics.slice(0, 5);
            
            // Remove duplicates
            context.recentTopics = [...new Set(context.recentTopics)];
        }
        
        return response;
    }

    /**
     * Interceptor: Handle keywords
     * @param {string} message - User message
     * @param {Object} context - Current context
     * @returns {string|null} Response or null if not intercepted
     */
    handleKeywords(message, context) {
        const lowerMessage = message.toLowerCase();
        
        // Example keyword handling
        if (lowerMessage === 'help' || lowerMessage === '/help') {
            return `
                # JAAT-AI Help
                
                Here are some things you can do with JAAT-AI:
                
                - Ask any question for information and assistance
                - Switch modes using "/mode [modeName]" (e.g., "/mode creative")
                - Clear conversation history with "/clear"
                - Get information about features with "/features"
                - Change settings with "/settings"
                
                For more information about specific features, ask "Help with [feature]"
            `;
        }
        
        // Check for mode change command
        const modeMatch = lowerMessage.match(/^\/mode\s+([a-zA-Z0-9_]+)$/);
        if (modeMatch) {
            const modeName = modeMatch[1];
            
            // Check if mode exists and try to activate it
            if (this.app.components.modes && this.app.components.modes.hasMode(modeName)) {
                this.app.components.modes.activateMode(modeName)
                    .then(success => {
                        if (success) {
                            const mode = this.app.components.modes.getMode(modeName);
                            this.trigger('modeChanged', {
                                mode
                            });
                        } else {
                            this.trigger('error', {
                                error: new Error(`Failed to activate mode: ${modeName}`),
                                context: 'modeChange'
                            });
                        }
                    })
                    .catch(error => {
                        this.trigger('error', {
                            error,
                            context: 'modeChange'
                        });
                    });
                
                return `Switching to ${modeName} mode...`;
            } else {
                return `Mode "${modeName}" not found. Available modes: ${this.getAvailableModes()}`;
            }
        }
        
        // Check for clear command
        if (lowerMessage === '/clear') {
            this.clearHistory();
            return 'Conversation history cleared.';
        }
        
        // Not intercepted
        return null;
    }

    /**
     * Get list of available modes
     * @returns {string} List of available modes
     */
    getAvailableModes() {
        if (!this.app.components.modes) {
            return 'No modes available';
        }
        
        const modes = this.app.components.modes.getAllModes();
        
        return Object.keys(modes).join(', ');
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
            for (const callback of this.eventListeners[event]) {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            }
        }
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChatbotEngine };
}
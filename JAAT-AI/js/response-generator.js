/**
 * JAAT-AI Response Generator
 * Handles generating AI responses using various models and APIs
 */

class ResponseGenerator {
    constructor(app) {
        // Reference to main app
        this.app = app;
        
        // Default API config
        this.apiConfig = {
            endpoint: '/api/chat',
            fallbackEndpoint: '/api/generate',
            streamingEndpoint: '/api/chat/stream',
            timeout: 30000,
            retries: 2
        };
        
        // Model providers
        this.providers = {
            openai: {
                enabled: true,
                apiKey: null,
                models: {
                    'gpt-4o': {
                        maxTokens: 4096,
                        streaming: true
                    },
                    'gpt-3.5-turbo': {
                        maxTokens: 4096,
                        streaming: true
                    }
                }
            },
            anthropic: {
                enabled: false,
                apiKey: null,
                models: {
                    'claude-3-opus': {
                        maxTokens: 4096,
                        streaming: true
                    },
                    'claude-3-sonnet': {
                        maxTokens: 4096,
                        streaming: true
                    }
                }
            },
            local: {
                enabled: false,
                endpoint: 'http://localhost:1234/v1/chat/completions',
                models: {
                    'llama3': {
                        maxTokens: 2048,
                        streaming: true
                    }
                }
            }
        };
        
        // Response enhancement modules
        this.enhancementModules = {
            citation: {
                enabled: false,
                trigger: 'citation',
                processor: this.enhanceWithCitations.bind(this)
            },
            code: {
                enabled: true,
                trigger: 'code',
                processor: this.enhanceCodeBlocks.bind(this)
            },
            markdown: {
                enabled: true,
                trigger: 'markdown',
                processor: this.enhanceMarkdown.bind(this)
            },
            math: {
                enabled: false,
                trigger: 'math',
                processor: this.enhanceMathExpressions.bind(this)
            }
        };
        
        // Cache for common responses
        this.responseCache = new Map();
        
        // Cache settings
        this.cacheSettings = {
            enabled: true,
            maxSize: 100,
            ttl: 1000 * 60 * 60 * 24 // 24 hours
        };
        
        // Current fallback mode
        this.fallbackMode = 'template';
        
        // Fallback templates
        this.fallbackTemplates = {
            error: [
                "I'm sorry, I'm having trouble connecting to my knowledge database right now. Could we try again in a moment?",
                "It seems I'm experiencing a technical issue. Let me try to resolve this.",
                "I apologize, but I'm currently unable to process your request due to a connection issue."
            ],
            timeout: [
                "I apologize for the delay. It's taking longer than expected to process your request.",
                "It seems that this query is taking too long to complete. Could you try a simpler question?",
                "I'm sorry, but the response timed out. Let's try a different approach."
            ],
            moderation: [
                "I'm not able to provide a response to that. Let's talk about something else.",
                "That topic is outside the scope of what I can assist with. Is there something else I can help you with?",
                "I apologize, but I'm designed to provide helpful and ethical information. Let's focus on a different topic."
            ]
        };
        
        // Event listeners
        this.eventListeners = {};
        
        // Storage keys
        this.storageKeys = {
            settings: 'jaat-response-generator-settings',
            apiKeys: 'jaat-api-keys'
        };
    }

    /**
     * Initialize response generator
     * @param {Object} options - Configuration options
     * @returns {Promise<void>}
     */
    async init(options = {}) {
        console.log('Initializing Response Generator...');
        
        // Apply custom options
        if (options) {
            // API config
            if (options.apiConfig) {
                Object.assign(this.apiConfig, options.apiConfig);
            }
            
            // Model providers
            if (options.providers) {
                for (const [provider, config] of Object.entries(options.providers)) {
                    if (this.providers[provider]) {
                        Object.assign(this.providers[provider], config);
                    }
                }
            }
            
            // Cache settings
            if (options.cacheSettings) {
                Object.assign(this.cacheSettings, options.cacheSettings);
            }
            
            // Enhancement modules
            if (options.enhancementModules) {
                for (const [module, config] of Object.entries(options.enhancementModules)) {
                    if (this.enhancementModules[module]) {
                        Object.assign(this.enhancementModules[module], config);
                    }
                }
            }
        }
        
        // Load API keys and settings
        await this.loadSettings();
        
        console.log('Response Generator initialized');
    }

    /**
     * Load settings from storage
     * @returns {Promise<void>}
     */
    async loadSettings() {
        try {
            // Load settings
            const savedSettings = localStorage.getItem(this.storageKeys.settings);
            
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                
                // Apply provider settings
                if (settings.providers) {
                    for (const [provider, config] of Object.entries(settings.providers)) {
                        if (this.providers[provider]) {
                            // Don't overwrite API keys
                            const { apiKey, ...otherConfig } = config;
                            Object.assign(this.providers[provider], otherConfig);
                        }
                    }
                }
                
                // Apply enhancement module settings
                if (settings.enhancementModules) {
                    for (const [module, config] of Object.entries(settings.enhancementModules)) {
                        if (this.enhancementModules[module]) {
                            // Don't overwrite processor functions
                            const { processor, ...otherConfig } = config;
                            Object.assign(this.enhancementModules[module], otherConfig);
                        }
                    }
                }
                
                console.log('Loaded response generator settings');
            }
            
            // Load API keys
            const savedApiKeys = localStorage.getItem(this.storageKeys.apiKeys);
            
            if (savedApiKeys) {
                const apiKeys = JSON.parse(savedApiKeys);
                
                for (const [provider, apiKey] of Object.entries(apiKeys)) {
                    if (this.providers[provider]) {
                        this.providers[provider].apiKey = apiKey;
                    }
                }
                
                console.log('Loaded API keys');
            }
        } catch (error) {
            console.error('Error loading response generator settings:', error);
        }
    }

    /**
     * Save settings to storage
     */
    saveSettings() {
        try {
            // Save settings (excluding API keys and processor functions)
            const settings = {
                providers: {},
                enhancementModules: {}
            };
            
            // Save provider settings
            for (const [provider, config] of Object.entries(this.providers)) {
                const { apiKey, ...otherConfig } = config;
                settings.providers[provider] = otherConfig;
            }
            
            // Save enhancement module settings
            for (const [module, config] of Object.entries(this.enhancementModules)) {
                const { processor, ...otherConfig } = config;
                settings.enhancementModules[module] = otherConfig;
            }
            
            localStorage.setItem(this.storageKeys.settings, JSON.stringify(settings));
            
            console.log('Saved response generator settings');
        } catch (error) {
            console.error('Error saving response generator settings:', error);
        }
    }

    /**
     * Set API key for a provider
     * @param {string} provider - Provider name
     * @param {string} apiKey - API key
     */
    setApiKey(provider, apiKey) {
        if (!this.providers[provider]) {
            throw new Error(`Unknown provider: ${provider}`);
        }
        
        this.providers[provider].apiKey = apiKey;
        
        // Save API keys
        this.saveApiKeys();
    }

    /**
     * Save API keys to storage
     */
    saveApiKeys() {
        try {
            const apiKeys = {};
            
            for (const [provider, config] of Object.entries(this.providers)) {
                if (config.apiKey) {
                    apiKeys[provider] = config.apiKey;
                }
            }
            
            localStorage.setItem(this.storageKeys.apiKeys, JSON.stringify(apiKeys));
            
            console.log('Saved API keys');
        } catch (error) {
            console.error('Error saving API keys:', error);
        }
    }

    /**
     * Generate a response to a message
     * @param {string} message - User message
     * @param {Array} history - Conversation history
     * @param {string} systemPrompt - System prompt
     * @param {Object} context - Current context
     * @param {Object} modelSettings - Model settings
     * @returns {Promise<string>} Generated response
     */
    async generateResponse(message, history, systemPrompt, context, modelSettings) {
        // Check cache first
        if (this.cacheSettings.enabled) {
            const cacheKey = this.generateCacheKey(message, systemPrompt, modelSettings.model);
            const cachedResponse = this.getFromCache(cacheKey);
            
            if (cachedResponse) {
                console.log('Using cached response');
                return cachedResponse;
            }
        }
        
        try {
            // Prepare messages for API
            const messages = this.prepareMessages(message, history, systemPrompt, context);
            
            // Prepare API request
            const requestBody = {
                model: modelSettings.model || 'gpt-4o',
                messages,
                temperature: modelSettings.temperature || 0.7,
                max_tokens: modelSettings.maxTokens || 1000,
                top_p: modelSettings.topP || 1,
                frequency_penalty: modelSettings.frequencyPenalty || 0,
                presence_penalty: modelSettings.presencePenalty || 0
            };
            
            // Make API request with retries
            const response = await this.makeApiRequest(
                this.apiConfig.endpoint,
                requestBody,
                this.apiConfig.timeout,
                this.apiConfig.retries
            );
            
            // Extract response text
            const responseText = this.extractResponseText(response, modelSettings.model);
            
            // Apply enhancements
            const enhancedResponse = await this.enhanceResponse(responseText, message, context);
            
            // Cache response
            if (this.cacheSettings.enabled) {
                const cacheKey = this.generateCacheKey(message, systemPrompt, modelSettings.model);
                this.addToCache(cacheKey, enhancedResponse);
            }
            
            return enhancedResponse;
        } catch (error) {
            console.error('Error generating response:', error);
            
            // Try fallback
            return this.generateFallbackResponse('error', message, context);
        }
    }

    /**
     * Stream a response to a message
     * @param {string} message - User message
     * @param {Array} history - Conversation history
     * @param {string} systemPrompt - System prompt
     * @param {Object} context - Current context
     * @param {Object} modelSettings - Model settings
     * @param {Function} onChunk - Callback for each chunk
     * @param {AbortSignal} signal - Abort signal
     * @returns {Promise<void>}
     */
    async streamResponse(message, history, systemPrompt, context, modelSettings, onChunk, signal) {
        try {
            // Prepare messages for API
            const messages = this.prepareMessages(message, history, systemPrompt, context);
            
            // Prepare API request
            const requestBody = {
                model: modelSettings.model || 'gpt-4o',
                messages,
                temperature: modelSettings.temperature || 0.7,
                max_tokens: modelSettings.maxTokens || 1000,
                top_p: modelSettings.topP || 1,
                frequency_penalty: modelSettings.frequencyPenalty || 0,
                presence_penalty: modelSettings.presencePenalty || 0,
                stream: true
            };
            
            // Make streaming API request
            const response = await fetch(this.apiConfig.streamingEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to stream response');
            }
            
            // Check if response is actually a stream
            if (!response.body) {
                throw new Error('Response is not a stream');
            }
            
            // Parse the stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            
            let buffer = '';
            
            // Process stream chunks
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) {
                    break;
                }
                
                // Decode chunk
                const chunk = decoder.decode(value, { stream: true });
                
                // Add to buffer
                buffer += chunk;
                
                // Process complete chunks
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';
                
                for (const line of lines) {
                    if (line.trim() === '') continue;
                    
                    // Remove the "data: " prefix
                    const dataString = line.startsWith('data: ') ? line.slice(6) : line;
                    
                    if (dataString === '[DONE]') {
                        // End of stream
                        break;
                    }
                    
                    try {
                        const data = JSON.parse(dataString);
                        
                        // Extract content
                        const content = this.extractStreamContent(data);
                        
                        if (content) {
                            onChunk(content);
                        }
                    } catch (error) {
                        console.warn('Error parsing stream chunk:', error, line);
                    }
                }
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Response streaming was aborted');
                throw error;
            }
            
            console.error('Error streaming response:', error);
            
            // Send fallback response
            const fallbackResponse = this.generateFallbackResponse('error', message, context);
            onChunk(fallbackResponse);
        }
    }

    /**
     * Prepare messages for API request
     * @param {string} message - User message
     * @param {Array} history - Conversation history
     * @param {string} systemPrompt - System prompt
     * @param {Object} context - Current context
     * @returns {Array} Messages for API request
     */
    prepareMessages(message, history, systemPrompt, context) {
        const messages = [];
        
        // Add system message
        messages.push({
            role: 'system',
            content: systemPrompt
        });
        
        // Add context information if available
        if (context) {
            let contextMessage = 'Additional context:\n';
            
            if (context.location) {
                contextMessage += `- User location: ${context.location.city}, ${context.location.country}\n`;
            }
            
            if (context.time) {
                contextMessage += `- Current time: ${new Date(context.time).toLocaleString()}\n`;
            }
            
            if (context.recentTopics && context.recentTopics.length > 0) {
                contextMessage += `- Recent topics: ${context.recentTopics.join(', ')}\n`;
            }
            
            if (context.activeMode) {
                contextMessage += `- Active mode: ${context.activeMode}\n`;
            }
            
            if (context.activeFeatures && context.activeFeatures.length > 0) {
                contextMessage += `- Active features: ${context.activeFeatures.join(', ')}\n`;
            }
            
            if (contextMessage !== 'Additional context:\n') {
                messages.push({
                    role: 'system',
                    content: contextMessage
                });
            }
        }
        
        // Add conversation history (excluding the current message)
        const relevantHistory = this.getRelevantHistory(history, message);
        
        for (const msg of relevantHistory) {
            messages.push({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.content
            });
        }
        
        // Add current user message
        messages.push({
            role: 'user',
            content: message
        });
        
        return messages;
    }

    /**
     * Get relevant conversation history
     * @param {Array} history - Conversation history
     * @param {string} currentMessage - Current user message
     * @returns {Array} Relevant history
     */
    getRelevantHistory(history, currentMessage) {
        // Skip the last message if it's the current one
        let historyToUse = [...history];
        
        if (historyToUse.length > 0 && 
            historyToUse[historyToUse.length - 1].type === 'user' &&
            historyToUse[historyToUse.length - 1].content === currentMessage) {
            historyToUse = historyToUse.slice(0, -1);
        }
        
        // Use last N messages to stay within token limits (simple approach)
        // A more sophisticated approach would count tokens
        return historyToUse.slice(-10);
    }

    /**
     * Make API request with retries
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request data
     * @param {number} timeout - Request timeout
     * @param {number} maxRetries - Maximum number of retries
     * @returns {Promise<Object>} API response
     */
    async makeApiRequest(endpoint, data, timeout, maxRetries) {
        let retries = 0;
        let lastError = null;
        
        while (retries <= maxRetries) {
            try {
                // Create abort controller for timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);
                
                // Make request
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    signal: controller.signal
                });
                
                // Clear timeout
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `API error: ${response.status}`);
                }
                
                // Parse and return response
                return await response.json();
            } catch (error) {
                lastError = error;
                
                if (error.name === 'AbortError') {
                    throw new Error('Request timed out');
                }
                
                // Increment retry counter
                retries++;
                
                if (retries > maxRetries) {
                    break;
                }
                
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries - 1)));
            }
        }
        
        throw lastError || new Error('Failed to make API request after retries');
    }

    /**
     * Extract response text from API response
     * @param {Object} response - API response
     * @param {string} model - Model name
     * @returns {string} Response text
     */
    extractResponseText(response, model) {
        // Handle OpenAI response format
        if (response.choices && response.choices.length > 0) {
            if (response.choices[0].message && response.choices[0].message.content) {
                return response.choices[0].message.content;
            }
        }
        
        // Handle Anthropic response format
        if (response.content && response.content.length > 0) {
            if (response.content[0].text) {
                return response.content[0].text;
            }
        }
        
        // Handle simple responses
        if (response.text || response.content) {
            return response.text || response.content;
        }
        
        throw new Error('Could not extract response text from API response');
    }

    /**
     * Extract content from streaming response chunk
     * @param {Object} chunk - Response chunk
     * @returns {string|null} Content or null if no content
     */
    extractStreamContent(chunk) {
        // Handle OpenAI stream format
        if (chunk.choices && chunk.choices.length > 0) {
            const delta = chunk.choices[0].delta;
            if (delta && delta.content) {
                return delta.content;
            }
        }
        
        // Handle Anthropic stream format
        if (chunk.delta && chunk.delta.text) {
            return chunk.delta.text;
        }
        
        return null;
    }

    /**
     * Generate a fallback response
     * @param {string} type - Fallback type ('error', 'timeout', 'moderation')
     * @param {string} message - User message
     * @param {Object} context - Current context
     * @returns {string} Fallback response
     */
    generateFallbackResponse(type, message, context) {
        if (this.fallbackMode === 'template') {
            // Use template-based fallback
            const templates = this.fallbackTemplates[type] || this.fallbackTemplates.error;
            const template = templates[Math.floor(Math.random() * templates.length)];
            
            return template;
        } else {
            // Use rule-based fallback
            switch (type) {
                case 'error':
                    return "I'm sorry, I encountered an error while processing your request. Could you try rephrasing your question?";
                    
                case 'timeout':
                    return "I apologize, but your request timed out. This might be due to high server load or a complex query. Could we try a simpler question?";
                    
                case 'moderation':
                    return "I'm unable to provide a response to that query. Let's talk about something else I can help you with.";
                    
                default:
                    return "I'm unable to process your request at the moment. Let's try a different approach.";
            }
        }
    }

    /**
     * Generate cache key for a request
     * @param {string} message - User message
     * @param {string} systemPrompt - System prompt
     * @param {string} model - Model name
     * @returns {string} Cache key
     */
    generateCacheKey(message, systemPrompt, model) {
        // Simple cache key
        return `${model}:${systemPrompt.substring(0, 50)}:${message}`;
    }

    /**
     * Get response from cache
     * @param {string} key - Cache key
     * @returns {string|null} Cached response or null if not found
     */
    getFromCache(key) {
        if (!this.responseCache.has(key)) {
            return null;
        }
        
        const entry = this.responseCache.get(key);
        
        // Check if expired
        if (Date.now() > entry.expires) {
            this.responseCache.delete(key);
            return null;
        }
        
        return entry.response;
    }

    /**
     * Add response to cache
     * @param {string} key - Cache key
     * @param {string} response - Response to cache
     */
    addToCache(key, response) {
        // Check cache size
        if (this.responseCache.size >= this.cacheSettings.maxSize) {
            // Remove oldest entry
            const oldestKey = this.responseCache.keys().next().value;
            this.responseCache.delete(oldestKey);
        }
        
        // Add to cache
        this.responseCache.set(key, {
            response,
            expires: Date.now() + this.cacheSettings.ttl
        });
    }

    /**
     * Clear response cache
     */
    clearCache() {
        this.responseCache.clear();
    }

    /**
     * Enhance response with various enhancements
     * @param {string} response - Original response
     * @param {string} message - User message
     * @param {Object} context - Current context
     * @returns {Promise<string>} Enhanced response
     */
    async enhanceResponse(response, message, context) {
        let enhancedResponse = response;
        
        // Apply enhancement modules if enabled
        for (const module of Object.values(this.enhancementModules)) {
            if (module.enabled) {
                try {
                    enhancedResponse = await module.processor(enhancedResponse, message, context);
                } catch (error) {
                    console.error(`Error applying enhancement module ${module.trigger}:`, error);
                }
            }
        }
        
        return enhancedResponse;
    }

    /**
     * Enhancement module: Add citations
     * @param {string} response - Original response
     * @param {string} message - User message
     * @param {Object} context - Current context
     * @returns {Promise<string>} Enhanced response
     */
    async enhanceWithCitations(response, message, context) {
        // This would be a complex function that would:
        // 1. Parse the response to identify statements needing citation
        // 2. Look up relevant sources
        // 3. Add properly formatted citations
        // 
        // For demonstration purposes, we'll just add a simple footnote
        
        if (response.includes('According to') || response.includes('research shows')) {
            return response + '\n\n---\n*This response includes information that would benefit from citation. In a full implementation, relevant academic or trusted sources would be cited here.*';
        }
        
        return response;
    }

    /**
     * Enhancement module: Improve code blocks
     * @param {string} response - Original response
     * @param {string} message - User message
     * @param {Object} context - Current context
     * @returns {Promise<string>} Enhanced response
     */
    async enhanceCodeBlocks(response, message, context) {
        // Ensure code blocks have language specified
        return response.replace(/```([^`\n]*)\n/g, (match, language) => {
            // If language is already specified, keep it
            if (language.trim().length > 0) {
                return match;
            }
            
            // Try to infer language from context or use text as default
            let inferredLanguage = 'text';
            
            // Check message for language clues
            const languageKeywords = {
                'javascript': ['javascript', 'js', 'node', 'react', 'vue', 'angular'],
                'python': ['python', 'django', 'flask', 'numpy', 'pandas'],
                'java': ['java', 'spring', 'android'],
                'html': ['html', 'markup'],
                'css': ['css', 'style', 'scss', 'sass'],
                'sql': ['sql', 'query', 'database'],
                'c#': ['c#', 'csharp', '.net', 'dotnet'],
                'php': ['php', 'laravel', 'symfony']
            };
            
            const lowerMessage = message.toLowerCase();
            
            for (const [lang, keywords] of Object.entries(languageKeywords)) {
                for (const keyword of keywords) {
                    if (lowerMessage.includes(keyword)) {
                        inferredLanguage = lang;
                        break;
                    }
                }
                
                if (inferredLanguage !== 'text') {
                    break;
                }
            }
            
            return '```' + inferredLanguage + '\n';
        });
    }

    /**
     * Enhancement module: Improve markdown formatting
     * @param {string} response - Original response
     * @param {string} message - User message
     * @param {Object} context - Current context
     * @returns {Promise<string>} Enhanced response
     */
    async enhanceMarkdown(response, message, context) {
        // Add consistent formatting to markdown
        let enhanced = response;
        
        // Ensure headings have space after #
        enhanced = enhanced.replace(/^(#{1,6})([^ #])/gm, '$1 $2');
        
        // Ensure lists have space after marker
        enhanced = enhanced.replace(/^(\s*)([*+-])([^ ])/gm, '$1$2 $3');
        enhanced = enhanced.replace(/^(\s*)(\d+\.)([^ ])/gm, '$1$2 $3');
        
        return enhanced;
    }

    /**
     * Enhancement module: Format mathematical expressions
     * @param {string} response - Original response
     * @param {string} message - User message
     * @param {Object} context - Current context
     * @returns {Promise<string>} Enhanced response
     */
    async enhanceMathExpressions(response, message, context) {
        // This would integrate with a library like MathJax or KaTeX
        // For the demo, we'll just ensure math is properly formatted in markdown
        
        // Convert inline math expressions to LaTeX format
        let enhanced = response.replace(/\b(\d+\s*[\+\-\*\/\^\(\)]\s*\d+(\s*[\+\-\*\/\^\(\)]\s*\d+)*)\b/g, 
            (match) => `$${match.replace(/\s+/g, '')}$`);
        
        // Look for equations or formulas and put them in display math mode
        const mathKeywords = ['equation', 'formula', 'calculate'];
        
        if (mathKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
            // Find lines that look like equations
            enhanced = enhanced.replace(/^([^$\n]+=[^$\n]+)$/gm, 
                (match) => `$$${match.trim()}$$`);
        }
        
        return enhanced;
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
    module.exports = { ResponseGenerator };
}
/**
 * JAAT-AI Smart Assistant Mode
 * General-purpose AI assistant with broad knowledge
 * Mode ID: 01
 */

class SmartAssistantMode {
    constructor() {
        // Mode metadata
        this.id = "01";
        this.name = "Smart Assistant";
        this.description = "General-purpose AI helper for a wide range of tasks and questions";
        this.icon = "ri-brain-line";
        this.color = "#6366f1"; // Primary indigo color
        this.category = "general";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 2000,
            responseSpeed: "moderate", // fast, moderate, detailed
            personalityLevel: 7, // 1-10 scale (higher = more personality)
            creativityLevel: 6, // 1-10 scale
            formalityLevel: 5, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            voiceResponseEnabled: true,
            defaultVoice: "natural-female-1"
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            userInfo: {},
            sessionStartTime: new Date(),
            responseCount: 0
        };
        
        // Suggestions for this mode
        this.suggestions = [
            "What's the weather like today?",
            "Tell me about the latest news in technology",
            "How do I make pasta from scratch?",
            "What's the meaning of life?",
            "Can you help me plan my day?",
            "Tell me an interesting fact",
            "What's the capital of France?",
            "How do I improve my productivity?",
            "What are some good exercises for beginners?",
            "Tell me about the history of the internet"
        ];
        
        // Knowledge domains this mode excels at
        this.knowledgeDomains = [
            "General Knowledge",
            "Current Events",
            "Science & Technology",
            "Arts & Culture",
            "History",
            "Geography",
            "Health & Wellness",
            "Food & Cooking",
            "Travel",
            "Entertainment"
        ];
        
        // Special features
        this.features = {
            webSearch: true,
            imageRecognition: false,
            voiceInput: true,
            weatherInfo: true,
            calculations: true,
            translations: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 50,
            GREETING_PHRASES: [
                "Hello! How can I help you today?",
                "Hi there! What would you like to know?",
                "Good day! How may I assist you?",
                "Hello! I'm your smart assistant. What can I do for you?",
                "Hi! Ask me anything, and I'll do my best to help."
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Smart Assistant mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode01-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Smart Assistant mode");
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode01-history');
                if (savedHistory) {
                    this.state.conversationHistory = JSON.parse(savedHistory);
                    
                    // Trim history if it exceeds max length
                    if (this.state.conversationHistory.length > this.constants.MAX_MEMORY_ITEMS) {
                        this.state.conversationHistory = this.state.conversationHistory.slice(
                            -this.constants.MAX_MEMORY_ITEMS
                        );
                    }
                    
                    console.log(`Loaded ${this.state.conversationHistory.length} conversation items`);
                }
            } catch (error) {
                console.error("Error loading conversation history:", error);
                this.state.conversationHistory = [];
            }
        }
        
        // Record initialization time
        this.state.sessionStartTime = new Date();
        
        console.log(`Smart Assistant mode initialized`);
        return true;
    }
    
    /**
     * Get a greeting message
     * @returns {string} Greeting message
     */
    getGreeting() {
        const { GREETING_PHRASES } = this.constants;
        const randomIndex = Math.floor(Math.random() * GREETING_PHRASES.length);
        return GREETING_PHRASES[randomIndex];
    }
    
    /**
     * Process user input and generate a response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with text and metadata
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I didn't receive any input. How can I help you?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing input: "${userInput}"`);
        
        // Record interaction time
        this.state.lastInteractionTime = new Date();
        
        // Add user message to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "user",
                content: userInput,
                timestamp: this.state.lastInteractionTime
            });
        }
        
        // Process input and generate response
        // In a real implementation, this would call an AI model API
        const response = await this.generateResponse(userInput, context);
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date()
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode01-history',
                    JSON.stringify(this.state.conversationHistory)
                );
            } catch (error) {
                console.error("Error saving conversation history:", error);
            }
        }
        
        // Increment response counter
        this.state.responseCount++;
        
        return response;
    }
    
    /**
     * Generate a response based on user input
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with text and metadata
     */
    async generateResponse(userInput, context = {}) {
        // In a real implementation, this would call an AI model API
        // For now, we'll use a simple rule-based approach
        
        const normalizedInput = userInput.toLowerCase().trim();
        let responseText = "";
        let responseType = "text";
        
        // Simple pattern matching for demo purposes
        if (normalizedInput.includes("hello") || normalizedInput.includes("hi ")) {
            responseText = "Hello! How can I help you today?";
        } else if (normalizedInput.includes("how are you")) {
            responseText = "I'm doing well, thank you for asking! How about yourself?";
        } else if (normalizedInput.includes("your name")) {
            responseText = "I'm the JAAT-AI Smart Assistant, designed to help you with a wide range of tasks and questions.";
        } else if (normalizedInput.includes("time")) {
            responseText = `The current time is ${new Date().toLocaleTimeString()}.`;
        } else if (normalizedInput.includes("date")) {
            responseText = `Today is ${new Date().toLocaleDateString()}.`;
        } else if (normalizedInput.includes("weather")) {
            responseText = "I don't have access to real-time weather data at the moment, but I can help you find a weather forecast if you tell me your location.";
        } else if (normalizedInput.includes("joke")) {
            responseText = "Why don't scientists trust atoms? Because they make up everything!";
        } else if (normalizedInput.includes("thank")) {
            responseText = "You're welcome! Is there anything else I can help you with?";
        } else if (normalizedInput.includes("bye") || normalizedInput.includes("goodbye")) {
            responseText = "Goodbye! Feel free to chat again whenever you'd like assistance.";
        } else {
            // Default response
            responseText = "I understand you're asking about " + userInput + ". While I'm a demonstration version with limited capabilities, in the full version I'd connect to an AI model to provide a helpful and informative response tailored to your question.";
        }
        
        // Add a suggestion occasionally
        if (this.config.suggestionsEnabled && Math.random() > 0.7) {
            const suggestion = this.getRandomSuggestion();
            responseText += `\n\nYou might also want to ask: "${suggestion}"`;
        }
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            suggestions: this.config.suggestionsEnabled ? this.getRandomSuggestions(3) : []
        };
    }
    
    /**
     * Get a random suggestion from the suggestions list
     * @returns {string} A random suggestion
     */
    getRandomSuggestion() {
        const randomIndex = Math.floor(Math.random() * this.suggestions.length);
        return this.suggestions[randomIndex];
    }
    
    /**
     * Get multiple random suggestions
     * @param {number} count - Number of suggestions to return
     * @returns {Array<string>} Array of random suggestions
     */
    getRandomSuggestions(count = 3) {
        // Shuffle suggestions array copy
        const shuffled = [...this.suggestions].sort(() => 0.5 - Math.random());
        // Get first 'count' elements
        return shuffled.slice(0, count);
    }
    
    /**
     * Save user preferences
     * @param {Object} preferences - User preferences to save
     * @returns {boolean} Success status
     */
    savePreferences(preferences) {
        try {
            this.state.userPreferences = { ...this.state.userPreferences, ...preferences };
            localStorage.setItem(
                'jaat-mode01-preferences',
                JSON.stringify(this.state.userPreferences)
            );
            return true;
        } catch (error) {
            console.error("Error saving user preferences:", error);
            return false;
        }
    }
    
    /**
     * Clear conversation history
     * @returns {boolean} Success status
     */
    clearHistory() {
        try {
            this.state.conversationHistory = [];
            localStorage.removeItem('jaat-mode01-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Update mode configuration
     * @param {Object} newConfig - New configuration settings
     * @returns {Object} Updated configuration
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        return this.config;
    }
    
    /**
     * Get information about this mode
     * @returns {Object} Mode information
     */
    getModeInfo() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            icon: this.icon,
            color: this.color,
            category: this.category,
            version: this.version,
            suggestions: this.suggestions.slice(0, 5), // Return first 5 suggestions
            knowledgeDomains: this.knowledgeDomains,
            features: this.features
        };
    }
    
    /**
     * Check if the mode is ready to use
     * @returns {boolean} Ready status
     */
    isReady() {
        return true;
    }
}

// Create instance if in browser environment
if (typeof window !== 'undefined') {
    if (!window.jaatAIModes) {
        window.jaatAIModes = {};
    }
    window.jaatAIModes.smartAssistant = new SmartAssistantMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartAssistantMode;
}
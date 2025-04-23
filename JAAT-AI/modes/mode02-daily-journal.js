/**
 * JAAT-AI Daily Journal Mode
 * AI mode for journaling, mood tracking, and personal reflection
 * Mode ID: 02
 */

class DailyJournalMode {
    constructor() {
        // Mode metadata
        this.id = "02";
        this.name = "Daily Journal";
        this.description = "Personal journal assistant for reflection, mood tracking, and memory keeping";
        this.icon = "ri-book-open-line";
        this.color = "#10b981"; // Green color
        this.category = "personal";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 1500,
            responseSpeed: "moderate", // fast, moderate, detailed
            personalityLevel: 7, // 1-10 scale (higher = more personality)
            creativityLevel: 7, // 1-10 scale
            formalityLevel: 4, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            sentimentAnalysis: true,
            moodTracking: true,
            dailyPrompts: true
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            journalEntries: [],
            moodHistory: [],
            sessionStartTime: new Date(),
            currentPrompt: null,
            responseCount: 0
        };
        
        // Journal entry templates
        this.templates = {
            daily: {
                title: "Daily Reflection - {date}",
                prompts: [
                    "What made you smile today?",
                    "What was challenging today, and how did you overcome it?",
                    "What are you grateful for today?",
                    "What did you learn today?",
                    "How did you take care of yourself today?"
                ]
            },
            gratitude: {
                title: "Gratitude Journal - {date}",
                prompts: [
                    "List three things you're grateful for today:",
                    "Who made a positive impact on your day, and how?",
                    "What beauty or wonder did you notice in the world today?",
                    "What opportunity or resource are you thankful for?",
                    "What about yourself are you grateful for today?"
                ]
            },
            goals: {
                title: "Goal Setting - {date}",
                prompts: [
                    "What's one goal you're working toward right now?",
                    "What small step can you take tomorrow toward this goal?",
                    "What obstacles might you face, and how will you overcome them?",
                    "How will achieving this goal improve your life?",
                    "Who can support you in reaching this goal?"
                ]
            },
            mood: {
                title: "Mood Check-in - {date}",
                prompts: [
                    "How would you rate your mood today (1-10)?",
                    "What factors influenced your mood today?",
                    "What emotions were strongest for you today?",
                    "How did your mood affect your actions today?",
                    "What could you do tomorrow to support a positive mood?"
                ]
            }
        };
        
        // Journal prompts by category
        this.prompts = {
            reflection: [
                "What made today unique?",
                "What would you have done differently today?",
                "What are you looking forward to tomorrow?",
                "What was the most peaceful moment of your day?",
                "What was your biggest achievement today, no matter how small?"
            ],
            gratitude: [
                "What small pleasure did you enjoy today?",
                "What made you laugh or smile today?",
                "What's something you take for granted that you're actually grateful for?",
                "What kindness did you witness or receive today?",
                "What challenging situation are you grateful for because of what you learned?"
            ],
            growth: [
                "What did you learn about yourself today?",
                "How did you step out of your comfort zone today?",
                "What mistake taught you something valuable recently?",
                "What habit would you like to build or break?",
                "How have you grown in the past month?"
            ],
            mood: [
                "What's your emotional weather report today? (Sunny, cloudy, stormy, etc.)",
                "What music matches your mood today?",
                "What triggered strong emotions for you today?",
                "How did your body feel today? Any tension or ease?",
                "What's one word that describes your day?"
            ]
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Help me journal about my day",
            "I want to track my mood today",
            "Give me a reflection prompt",
            "What should I write about today?",
            "I'm feeling anxious and want to write about it",
            "Help me set up a gratitude practice",
            "I want to reflect on my progress this week",
            "How can journaling improve my mental health?",
            "Give me a creative writing prompt for my journal",
            "Help me identify patterns in my mood"
        ];
        
        // Special features
        this.features = {
            moodTracking: true,
            journalPrompts: true,
            habitTracking: true,
            sentimentAnalysis: true,
            reflectionGuides: true,
            exportEntries: true,
            reminderSystem: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 100,
            MOOD_LEVELS: [
                "Very Low", "Low", "Somewhat Low", 
                "Neutral", 
                "Somewhat High", "High", "Very High"
            ],
            GREETING_PHRASES: [
                "Welcome to your journal space. How are you feeling today?",
                "Hello! Ready for some reflection time?",
                "It's good to see you. What would you like to write about today?",
                "Welcome back to your journal. What's on your mind today?",
                "Time for some self-reflection! How has your day been going?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Daily Journal mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode02-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Daily Journal mode");
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load journal entries if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedEntries = localStorage.getItem('jaat-mode02-entries');
                if (savedEntries) {
                    this.state.journalEntries = JSON.parse(savedEntries);
                    console.log(`Loaded ${this.state.journalEntries.length} journal entries`);
                }
                
                const savedMoods = localStorage.getItem('jaat-mode02-moods');
                if (savedMoods) {
                    this.state.moodHistory = JSON.parse(savedMoods);
                    console.log(`Loaded ${this.state.moodHistory.length} mood entries`);
                }
                
                const savedHistory = localStorage.getItem('jaat-mode02-history');
                if (savedHistory) {
                    this.state.conversationHistory = JSON.parse(savedHistory);
                    
                    // Trim history if it exceeds max length
                    if (this.state.conversationHistory.length > this.constants.MAX_MEMORY_ITEMS) {
                        this.state.conversationHistory = this.state.conversationHistory.slice(
                            -this.constants.MAX_MEMORY_ITEMS
                        );
                    }
                }
            } catch (error) {
                console.error("Error loading journal data:", error);
                this.state.journalEntries = [];
                this.state.moodHistory = [];
                this.state.conversationHistory = [];
            }
        }
        
        // Select a random prompt for today
        this.selectDailyPrompt();
        
        // Record initialization time
        this.state.sessionStartTime = new Date();
        
        console.log(`Daily Journal mode initialized`);
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
                text: "Your journal is a safe space for reflection. What would you like to write about today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing journal input`);
        
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
        
        // Detect if this is a journal entry or a question/command
        const isJournalEntry = this.detectJournalEntry(userInput);
        
        // Generate appropriate response
        const response = await this.generateResponse(userInput, isJournalEntry, context);
        
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
                    'jaat-mode02-history',
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
     * @param {boolean} isJournalEntry - Whether input is a journal entry
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with text and metadata
     */
    async generateResponse(userInput, isJournalEntry, context = {}) {
        // In a real implementation, this would call an AI model API
        // For now, we'll use a simple rule-based approach
        
        let responseText = "";
        let responseType = "text";
        let moodDetected = null;
        let topicsDetected = [];
        
        if (isJournalEntry) {
            // Process as a journal entry
            const entryAnalysis = this.analyzeJournalEntry(userInput);
            moodDetected = entryAnalysis.mood;
            topicsDetected = entryAnalysis.topics;
            
            // Save journal entry if longer than 20 words
            if (userInput.split(' ').length > 20) {
                this.saveJournalEntry(userInput, entryAnalysis);
            }
            
            // Generate a reflective response
            responseText = this.generateReflectiveResponse(userInput, entryAnalysis);
        } else {
            // Process as a question or command
            const normalizedInput = userInput.toLowerCase().trim();
            
            if (normalizedInput.includes("prompt") || normalizedInput.includes("what should i write")) {
                // User is asking for a prompt
                responseText = this.getRandomPrompt();
            } else if (normalizedInput.includes("mood") && normalizedInput.includes("track")) {
                // User wants to track mood
                responseText = "How would you rate your mood today on a scale of 1-10? You can also describe it in words like 'happy', 'anxious', 'calm', etc.";
            } else if (normalizedInput.match(/mood.*(history|pattern|trend|track)/i) || normalizedInput.match(/(history|pattern|trend|track).*mood/i)) {
                // User wants to see mood patterns
                responseText = this.getMoodSummary();
            } else if (normalizedInput.includes("journal") && normalizedInput.includes("benefit")) {
                // User is asking about journaling benefits
                responseText = "Regular journaling has many benefits including reduced stress, improved mood, better memory, enhanced self-awareness, and stronger emotional processing skills. It gives you a safe space to express thoughts and feelings, helps track patterns in your life, and provides perspective on your growth over time.";
            } else if (normalizedInput.includes("my entries") || normalizedInput.includes("past journal") || normalizedInput.includes("previous entries")) {
                // User wants to see past entries
                responseText = this.getEntriesSummary();
            } else {
                // Default response for questions
                responseText = "I'm here to help with your journaling practice. You can write freely about your day, ask for prompts, track your mood, or review past entries. What would you like to focus on today?";
            }
        }
        
        // Get appropriate follow-up prompts
        const followUpPrompts = this.getFollowUpPrompts(isJournalEntry, moodDetected, topicsDetected);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            isJournalEntry: isJournalEntry,
            mood: moodDetected,
            topics: topicsDetected,
            suggestions: followUpPrompts
        };
    }
    
    /**
     * Detect if input is a journal entry vs a question/command
     * @param {string} input - User input
     * @returns {boolean} Whether input is likely a journal entry
     */
    detectJournalEntry(input) {
        // Simple heuristics to detect journal entries
        const wordCount = input.split(' ').length;
        const hasQuestion = input.includes('?');
        const startsWithCommand = /^(help|show|get|give|what|how|can|could|would|tell)/i.test(input);
        
        // Likely a journal entry if:
        // - Longer than 30 words, or
        // - Longer than 15 words and doesn't contain a question or start with a command
        return wordCount > 30 || (wordCount > 15 && !hasQuestion && !startsWithCommand);
    }
    
    /**
     * Analyze journal entry for mood and topics
     * @param {string} entry - Journal entry text
     * @returns {Object} Analysis results with mood and topics
     */
    analyzeJournalEntry(entry) {
        // In a real implementation, this would use sentiment analysis and NLP
        // Here's a simplified version
        
        const text = entry.toLowerCase();
        let mood = "neutral";
        let moodScore = 5; // 1-10 scale
        
        // Very simplified sentiment analysis
        const positiveWords = ["happy", "good", "great", "excellent", "joy", "excited", "wonderful", "love", "grateful", "thankful"];
        const negativeWords = ["sad", "bad", "terrible", "awful", "angry", "upset", "worried", "anxious", "frustrated", "disappointed"];
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        positiveWords.forEach(word => {
            const regex = new RegExp('\\b' + word + '\\b', 'gi');
            const matches = text.match(regex);
            if (matches) positiveCount += matches.length;
        });
        
        negativeWords.forEach(word => {
            const regex = new RegExp('\\b' + word + '\\b', 'gi');
            const matches = text.match(regex);
            if (matches) negativeCount += matches.length;
        });
        
        if (positiveCount > negativeCount) {
            mood = positiveCount > 2 ? "very positive" : "positive";
            moodScore = positiveCount > 2 ? 8 : 7;
        } else if (negativeCount > positiveCount) {
            mood = negativeCount > 2 ? "very negative" : "negative";
            moodScore = negativeCount > 2 ? 3 : 4;
        }
        
        // Very simplified topic detection
        const topicKeywords = {
            work: ["work", "job", "career", "office", "project", "boss", "colleague"],
            relationships: ["friend", "family", "partner", "relationship", "date", "love", "social"],
            health: ["health", "exercise", "workout", "run", "gym", "diet", "sleep", "tired"],
            creativity: ["create", "write", "art", "music", "book", "read", "design", "creative"],
            stress: ["stress", "anxiety", "worry", "overwhelm", "pressure", "deadline"]
        };
        
        const detectedTopics = [];
        
        for (const [topic, keywords] of Object.entries(topicKeywords)) {
            for (const keyword of keywords) {
                if (text.includes(keyword)) {
                    detectedTopics.push(topic);
                    break;
                }
            }
        }
        
        return {
            mood: mood,
            moodScore: moodScore,
            topics: [...new Set(detectedTopics)], // Remove duplicates
            wordCount: entry.split(' ').length,
            timestamp: new Date()
        };
    }
    
    /**
     * Generate a reflective response to a journal entry
     * @param {string} entry - User's journal entry
     * @param {Object} analysis - Analysis of the entry
     * @returns {string} Reflective response
     */
    generateReflectiveResponse(entry, analysis) {
        // Very simplified response generation
        const { mood, topics } = analysis;
        
        let response = "";
        
        // Acknowledge the journaling
        const acknowledgeOptions = [
            "Thank you for sharing your thoughts today.",
            "I appreciate you taking time to reflect.",
            "It's wonderful that you're taking this moment for yourself.",
            "Thank you for expressing yourself in your journal."
        ];
        response += acknowledgeOptions[Math.floor(Math.random() * acknowledgeOptions.length)] + " ";
        
        // Comment on mood if detected
        if (mood !== "neutral") {
            if (mood.includes("positive")) {
                response += "I notice a positive tone in your writing. It's great to see you experiencing these feelings. ";
            } else if (mood.includes("negative")) {
                response += "I'm noticing some challenging emotions in your entry. Remember that it's okay to feel this way, and journaling about it is a healthy way to process these feelings. ";
            }
        }
        
        // Comment on topics if detected
        if (topics.length > 0) {
            response += `You wrote about ${topics.join(", ")}. `;
            
            // Add a topic-specific reflection
            if (topics.includes("work")) {
                response += "Your work experiences shape a significant part of your life. How does writing about them help you process your professional journey? ";
            } else if (topics.includes("relationships")) {
                response += "Our connections with others are such an important part of life. Reflecting on them can bring valuable insights. ";
            } else if (topics.includes("health")) {
                response += "Taking care of your wellbeing is so important. Journaling about health can help you notice patterns and improvements over time. ";
            } else if (topics.includes("creativity")) {
                response += "Exploring your creative side is wonderful to see in your journal. These expressions reveal important parts of yourself. ";
            } else if (topics.includes("stress")) {
                response += "Writing about your stressors is a powerful way to understand and manage them better. ";
            }
        }
        
        // Add a follow-up question or suggestion
        const followUps = [
            "Is there anything specific from your entry you'd like to explore further?",
            "What part of your writing today feels most significant to you?",
            "Would you like to reflect on this entry, or are you ready for a new prompt?",
            "Is there anything you wrote that surprised you?",
            "How did it feel to write this entry?"
        ];
        response += followUps[Math.floor(Math.random() * followUps.length)];
        
        return response;
    }
    
    /**
     * Save a journal entry with its analysis
     * @param {string} entry - Journal entry text
     * @param {Object} analysis - Analysis results
     */
    saveJournalEntry(entry, analysis) {
        if (!this.config.memoryEnabled) return;
        
        const journalEntry = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            text: entry,
            analysis: analysis,
            timestamp: new Date()
        };
        
        // Add to journal entries
        this.state.journalEntries.push(journalEntry);
        
        // Add to mood history if mood detected
        if (analysis.mood !== "neutral") {
            this.state.moodHistory.push({
                timestamp: new Date(),
                mood: analysis.mood,
                moodScore: analysis.moodScore
            });
        }
        
        // Save to storage
        try {
            localStorage.setItem('jaat-mode02-entries', JSON.stringify(this.state.journalEntries));
            localStorage.setItem('jaat-mode02-moods', JSON.stringify(this.state.moodHistory));
            console.log("Journal entry saved");
        } catch (error) {
            console.error("Error saving journal entry:", error);
        }
    }
    
    /**
     * Get a random journal prompt
     * @returns {string} Journal prompt
     */
    getRandomPrompt() {
        // Get all prompt categories
        const categories = Object.keys(this.prompts);
        
        // Select a random category
        const category = categories[Math.floor(Math.random() * categories.length)];
        
        // Select a random prompt from that category
        const prompts = this.prompts[category];
        const prompt = prompts[Math.floor(Math.random() * prompts.length)];
        
        return `Journal Prompt: ${prompt}\n\nTake a few minutes to reflect and write about this. I'll be here to respond when you're done.`;
    }
    
    /**
     * Get follow-up prompts based on entry analysis
     * @param {boolean} isJournalEntry - Whether input was a journal entry
     * @param {string} mood - Detected mood
     * @param {Array<string>} topics - Detected topics
     * @returns {Array<string>} Follow-up prompt suggestions
     */
    getFollowUpPrompts(isJournalEntry, mood, topics) {
        const prompts = [];
        
        if (isJournalEntry) {
            // Add mood-based prompts
            if (mood && mood.includes("negative")) {
                prompts.push("I want to write about something positive that happened");
                prompts.push("Help me find some perspective on this situation");
            }
            
            // Add topic-based prompts
            if (topics.includes("work")) {
                prompts.push("How can I maintain better work-life balance?");
            }
            if (topics.includes("relationships")) {
                prompts.push("I want to reflect on how my relationships have evolved");
            }
            if (topics.includes("stress")) {
                prompts.push("Give me a prompt for stress relief reflection");
            }
            
            // Add general follow-ups
            prompts.push("I'd like another journal prompt");
            prompts.push("How have my journal entries been changing over time?");
        } else {
            // User wasn't journaling, suggest starting points
            prompts.push("I want to write about my day");
            prompts.push("Give me a gratitude prompt");
            prompts.push("Help me track my mood today");
            prompts.push("I need a prompt for self-reflection");
        }
        
        // Add suggestions from the main list if we need more
        while (prompts.length < 3) {
            const suggestion = this.suggestions[Math.floor(Math.random() * this.suggestions.length)];
            if (!prompts.includes(suggestion)) {
                prompts.push(suggestion);
            }
        }
        
        // Return no more than 3 prompts
        return prompts.slice(0, 3);
    }
    
    /**
     * Select a daily prompt
     */
    selectDailyPrompt() {
        // Select random category and prompt
        const categories = Object.keys(this.prompts);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const prompts = this.prompts[category];
        const prompt = prompts[Math.floor(Math.random() * prompts.length)];
        
        this.state.currentPrompt = {
            text: prompt,
            category: category,
            date: new Date()
        };
    }
    
    /**
     * Get a summary of the user's mood history
     * @returns {string} Mood summary
     */
    getMoodSummary() {
        if (!this.config.memoryEnabled || this.state.moodHistory.length === 0) {
            return "I don't have any mood data saved yet. You can start tracking your mood by telling me how you feel today.";
        }
        
        const moodCount = this.state.moodHistory.length;
        const recentMoods = this.state.moodHistory.slice(-5); // Last 5 moods
        
        let summary = `You've tracked your mood ${moodCount} times. `;
        
        // Recent moods
        summary += "Your recent moods include: ";
        summary += recentMoods.map(m => m.mood).join(", ") + ". ";
        
        // Simple trend analysis
        if (moodCount >= 3) {
            const recentScores = recentMoods.map(m => m.moodScore);
            const avgScore = recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length;
            
            if (avgScore > 6.5) {
                summary += "Overall, your recent mood has been quite positive. ";
            } else if (avgScore < 4.5) {
                summary += "Your recent entries show some challenging emotions. Remember that ups and downs are normal, and journaling can help process these feelings. ";
            } else {
                summary += "Your recent mood has been fairly balanced, with both highs and lows. ";
            }
        }
        
        summary += "Would you like to record your mood for today?";
        
        return summary;
    }
    
    /**
     * Get a summary of journal entries
     * @returns {string} Entries summary
     */
    getEntriesSummary() {
        if (!this.config.memoryEnabled || this.state.journalEntries.length === 0) {
            return "You haven't saved any journal entries yet. Would you like to start today?";
        }
        
        const entryCount = this.state.journalEntries.length;
        const recentEntry = this.state.journalEntries[this.state.journalEntries.length - 1];
        
        // Format date of last entry
        const lastEntryDate = new Date(recentEntry.timestamp);
        const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
        const formattedDate = lastEntryDate.toLocaleDateString('en-US', dateOptions);
        
        let summary = `You have ${entryCount} journal ${entryCount === 1 ? 'entry' : 'entries'} saved. `;
        summary += `Your most recent entry was on ${formattedDate}. `;
        
        // Topics summary
        const allTopics = [];
        this.state.journalEntries.forEach(entry => {
            if (entry.analysis && entry.analysis.topics) {
                allTopics.push(...entry.analysis.topics);
            }
        });
        
        // Count frequency of each topic
        const topicCounts = {};
        allTopics.forEach(topic => {
            topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        });
        
        // Get top 3 topics
        const topTopics = Object.entries(topicCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([topic]) => topic);
        
        if (topTopics.length > 0) {
            summary += `You often write about ${topTopics.join(", ")}. `;
        }
        
        summary += "Would you like to start a new entry or reflect on a specific topic from your past entries?";
        
        return summary;
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
                'jaat-mode02-preferences',
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
            localStorage.removeItem('jaat-mode02-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Clear journal entries
     * @returns {boolean} Success status
     */
    clearEntries() {
        try {
            this.state.journalEntries = [];
            this.state.moodHistory = [];
            localStorage.removeItem('jaat-mode02-entries');
            localStorage.removeItem('jaat-mode02-moods');
            return true;
        } catch (error) {
            console.error("Error clearing journal entries:", error);
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
            entryCount: this.state.journalEntries.length,
            currentPrompt: this.state.currentPrompt?.text,
            suggestions: this.suggestions.slice(0, 5), // Return first 5 suggestions
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
    window.jaatAIModes.dailyJournal = new DailyJournalMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DailyJournalMode;
}
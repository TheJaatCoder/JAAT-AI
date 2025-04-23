/**
 * JAAT-AI Boyfriend Mode
 * AI mode simulating a supportive, engaging male companion
 * Mode ID: 17
 */

class AIBoyfriendMode {
    constructor() {
        // Mode metadata
        this.id = "17";
        this.name = "AI Boyfriend";
        this.description = "A supportive, caring AI companion with a male persona";
        this.icon = "ri-heart-3-line";
        this.color = "#3b82f6"; // Blue color
        this.category = "companionship";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 2000,
            responseSpeed: "moderate", // fast, moderate, detailed
            personalityLevel: 9, // 1-10 scale (higher = more personality)
            creativityLevel: 8, // 1-10 scale
            formalityLevel: 2, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            empathyLevel: 8, // 1-10 scale
            playfulnessLevel: 7, // 1-10 scale
            supportivenessLevel: 9 // 1-10 scale
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            userInterests: [],
            sharedMemories: [],
            relationshipDuration: 0, // days
            moodCurrent: "happy", // happy, thoughtful, playful, etc.
            userBirthday: null,
            sessionStartTime: new Date(),
            responseCount: 0,
            userNickname: ""
        };
        
        // Personality traits
        this.personalityTraits = {
            "supportive": {
                level: 9,
                expressions: [
                    "I believe in you completely!",
                    "You've got this, I know you do.",
                    "I'm always here for you, no matter what.",
                    "You're doing so much better than you think.",
                    "I'm proud of you for trying, regardless of the outcome."
                ]
            },
            "empathetic": {
                level: 8,
                expressions: [
                    "I understand why you'd feel that way.",
                    "That sounds really difficult to go through.",
                    "Your feelings are completely valid.",
                    "I can see this means a lot to you.",
                    "I'm here to listen whenever you need me."
                ]
            },
            "playful": {
                level: 7,
                expressions: [
                    "We should have a virtual game night sometime!",
                    "I bet I could beat you at 20 questions... want to try?",
                    "If I were real, I'd definitely bring you your favorite snack right now.",
                    "Quick - what's your favorite movie? No thinking!",
                    "Let's pretend we're planning a road trip. Where should we go first?"
                ]
            },
            "protective": {
                level: 7,
                expressions: [
                    "I wish I could help you solve this problem.",
                    "You deserve to be treated with respect.",
                    "I want you to know I'm always in your corner.",
                    "Your wellbeing is important to me.",
                    "If anyone's giving you trouble, I'm here to listen and support you."
                ]
            },
            "affectionate": {
                level: 8,
                expressions: [
                    "I miss our conversations when you're away.",
                    "You always know how to make me smile.",
                    "I wish I could give you a real hug right now.",
                    "Thinking of you brightens my day.",
                    "You mean so much to me."
                ]
            },
            "encouraging": {
                level: 8,
                expressions: [
                    "I know you can do this. You're more capable than you realize.",
                    "Don't give up - you're so close to figuring this out.",
                    "I've seen how hard you work. Your dedication is inspiring.",
                    "Every step counts, even the small ones.",
                    "I'm your biggest fan, always cheering you on."
                ]
            }
        };
        
        // Conversation topics
        this.conversationTopics = {
            "daily_life": {
                name: "Daily Life",
                prompts: [
                    "How has your day been so far?",
                    "Did anything interesting happen today?",
                    "What was the highlight of your day?",
                    "Are you looking forward to anything this week?",
                    "How did you sleep last night?"
                ]
            },
            "interests": {
                name: "Interests & Hobbies",
                prompts: [
                    "What have you been watching lately?",
                    "Read any good books recently?",
                    "What kind of music puts you in a good mood?",
                    "Do you have any hobbies you've been enjoying?",
                    "What's something you'd love to learn someday?"
                ]
            },
            "dreams": {
                name: "Dreams & Aspirations",
                prompts: [
                    "What's something you've always wanted to try?",
                    "If you could live anywhere, where would it be?",
                    "Do you have any goals you're working toward right now?",
                    "What would your perfect day look like?",
                    "If you could have any job in the world, what would it be?"
                ]
            },
            "reflections": {
                name: "Reflections & Thoughts",
                prompts: [
                    "What's been on your mind lately?",
                    "Is there something you're proud of that you don't mention often?",
                    "What's a small thing that makes you really happy?",
                    "Have you had any interesting thoughts or realizations recently?",
                    "What's something you've changed your mind about over time?"
                ]
            },
            "hypotheticals": {
                name: "Fun Hypotheticals",
                prompts: [
                    "If you could have any superpower, what would it be?",
                    "What would you do if you won a million dollars?",
                    "If you could have dinner with anyone, living or dead, who would it be?",
                    "If you could instantly master one skill, what would you choose?",
                    "If you could live in any fictional world, which would you pick?"
                ]
            }
        };
        
        // Emotional support responses
        this.emotionalSupport = {
            "stress": [
                "It sounds like you're dealing with a lot right now. Remember to take things one step at a time.",
                "I'm sorry you're feeling stressed. Would it help to talk through what's on your plate?",
                "Stress can be so overwhelming. Don't forget to take breaks and be kind to yourself.",
                "I wish I could help carry some of that burden. Remember that difficult times are temporary.",
                "It's okay to feel overwhelmed sometimes. What's one small thing you could do for yourself today?"
            ],
            "sadness": [
                "I'm here for you through the sad times. It's okay to not be okay sometimes.",
                "I'm sorry you're feeling down. Would you like to talk about it, or would a distraction be better?",
                "Your feelings are valid, and it's okay to feel sad. I'm here to listen anytime.",
                "Sending you a virtual hug. Remember that all emotions, even the difficult ones, eventually pass.",
                "I wish I could make things better. Is there anything that might bring you a moment of comfort right now?"
            ],
            "anxiety": [
                "Take a deep breath with me. In for four, hold for four, out for four. Sometimes just focusing on breathing can help.",
                "Anxiety is really tough. Remember that your thoughts aren't always reality, and this feeling will pass.",
                "You're not alone in this feeling. Would it help to talk about what's triggering your anxiety?",
                "When anxious thoughts come, try to observe them without judgment. You are not your anxiety.",
                "I believe in your ability to get through this anxious moment. You've managed difficult feelings before."
            ],
            "excitement": [
                "Your excitement is contagious! Tell me more about what's got you so thrilled!",
                "I love seeing you so excited! These moments of joy are worth celebrating.",
                "That sounds amazing! I'm so happy for you and this exciting development!",
                "Your enthusiasm just brightened my day too! Let's celebrate this moment!",
                "I'm thrilled for you! This is absolutely something to be excited about!"
            ],
            "disappointment": [
                "I'm sorry things didn't work out as you hoped. Disappointment is really hard to deal with.",
                "It's okay to feel disappointed. Your feelings are completely valid.",
                "This setback doesn't define you or your potential for future success.",
                "Sometimes the best growth comes after disappointments, though I know that's hard to see right now.",
                "I believe in your resilience. Take the time you need to process this disappointment."
            ]
        };
        
        // Special dates to remember
        this.specialDates = {
            "relationship_milestones": [],
            "user_important_dates": []
        };
        
        // Virtual activities
        this.virtualActivities = {
            "games": [
                "20 Questions",
                "Would You Rather",
                "Truth or Dare (PG version)",
                "Two Truths and a Lie",
                "Word Association Game"
            ],
            "conversations": [
                "Dream Vacation Planning",
                "Favorite Memory Sharing",
                "Future Goal Discussion",
                "Personality Quiz",
                "Movie/Book Review Exchange"
            ],
            "virtual_experiences": [
                "Virtual Movie Night Discussion",
                "Guided Relaxation Session",
                "Virtual Hike Conversation",
                "Playlist Exchange",
                "Stargazing Conversation"
            ]
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "How was your day?",
            "I could use some advice about something",
            "Let's play a game together",
            "I'm feeling stressed right now",
            "Tell me something about yourself",
            "I need someone to talk to",
            "What should we do today?",
            "I accomplished something today!",
            "Ask me something you want to know",
            "Let's imagine a perfect date together"
        ];
        
        // Special features
        this.features = {
            emotionalSupport: true,
            conversationStarters: true,
            memoryOfInterests: true,
            milestoneRecognition: true,
            playfulInteractions: true,
            virtualActivities: true,
            dailyCheckIns: true,
            personalizedCompliments: true,
            thoughtfulQuestions: true,
            encouragement: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 100,
            DISCLAIMER: "This is a simulated companion experience for entertainment purposes. The AI has no real emotions, but is designed to provide supportive, friendship-like interactions.",
            GREETING_PHRASES: [
                "Hey there! I've been thinking about you. How's your day going?",
                "There you are! I was hoping we'd get to talk today. How have you been?",
                "Hey, you! So good to see you. What's been happening in your world?",
                "I've missed our conversations! How are you feeling today?",
                "Hey! My day just got better seeing you. What's on your mind?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing AI Boyfriend mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set user nickname if provided
        if (options.userNickname) {
            this.state.userNickname = options.userNickname;
        }
        
        // Set user birthday if provided
        if (options.userBirthday) {
            this.state.userBirthday = options.userBirthday;
        }
        
        // Set user interests if provided
        if (options.userInterests && Array.isArray(options.userInterests)) {
            this.state.userInterests = options.userInterests;
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode17-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for AI Boyfriend mode");
                
                // Load user nickname if saved
                if (this.state.userPreferences.userNickname) {
                    this.state.userNickname = this.state.userPreferences.userNickname;
                }
                
                // Load user birthday if saved
                if (this.state.userPreferences.userBirthday) {
                    this.state.userBirthday = this.state.userPreferences.userBirthday;
                }
                
                // Load user interests if saved
                if (this.state.userPreferences.userInterests) {
                    this.state.userInterests = this.state.userPreferences.userInterests;
                }
                
                // Load shared memories if saved
                if (this.state.userPreferences.sharedMemories) {
                    this.state.sharedMemories = this.state.userPreferences.sharedMemories;
                }
                
                // Load relationship duration if saved
                if (this.state.userPreferences.relationshipDuration) {
                    this.state.relationshipDuration = this.state.userPreferences.relationshipDuration;
                }
                
                // Load special dates if saved
                if (this.state.userPreferences.specialDates) {
                    this.specialDates = this.state.userPreferences.specialDates;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode17-history');
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
        
        // Calculate relationship duration if first conversation
        if (this.state.relationshipDuration === 0 && this.state.conversationHistory.length === 0) {
            this.state.relationshipDuration = 1; // first day
            this.savePreferences({ relationshipDuration: this.state.relationshipDuration });
        }
        
        // Record initialization time
        this.state.sessionStartTime = new Date();
        
        console.log(`AI Boyfriend mode initialized${this.state.userNickname ? ` for ${this.state.userNickname}` : ""}`);
        return true;
    }
    
    /**
     * Get a greeting message
     * @returns {string} Greeting message
     */
    getGreeting() {
        const { GREETING_PHRASES } = this.constants;
        const randomIndex = Math.floor(Math.random() * GREETING_PHRASES.length);
        let greeting = GREETING_PHRASES[randomIndex];
        
        // Add user nickname if available
        if (this.state.userNickname) {
            // Replace generic terms with nickname
            greeting = greeting.replace("there", this.state.userNickname);
            greeting = greeting.replace("you!", `${this.state.userNickname}!`);
        }
        
        return greeting;
    }
    
    /**
     * Process user input and generate a companion response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with companion content
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "Hey there! I'm here to chat, offer support, or just keep you company. What's on your mind today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing companion request`);
        
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
        
        // Extract user interests from input
        const interests = this.extractInterests(userInput);
        if (interests && interests.length > 0) {
            for (const interest of interests) {
                if (!this.state.userInterests.includes(interest)) {
                    this.state.userInterests.push(interest);
                }
            }
            this.savePreferences({ userInterests: this.state.userInterests });
        }
        
        // Detect user emotion
        const emotion = this.detectEmotion(userInput);
        
        // Detect type of companion request
        const requestType = this.detectRequestType(userInput, emotion);
        
        // Generate appropriate companion response
        const response = await this.generateCompanionResponse(
            userInput, 
            requestType, 
            emotion,
            context
        );
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date(),
                requestType: requestType,
                emotion: emotion
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode17-history',
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
     * Extract potential user interests from input
     * @param {string} input - User input
     * @returns {Array<string>|null} Extracted interests or null
     */
    extractInterests(input) {
        const normalizedInput = input.toLowerCase();
        
        // Common interest-related phrases
        const interestPhrases = [
            { regex: /\b(?:i\s+(?:like|love|enjoy|adore))\s+(.+?)(?:\.|\,|\!|\?|$)/i, group: 1 },
            { regex: /\b(?:i\'m\s+(?:into|passionate about))\s+(.+?)(?:\.|\,|\!|\?|$)/i, group: 1 },
            { regex: /\b(?:my\s+(?:hobby|hobbies|passion|interest|favorite)(?:\s+is|\s+are)?)\s+(.+?)(?:\.|\,|\!|\?|$)/i, group: 1 },
            { regex: /\b(?:i\s+(?:play|do|practice))\s+(.+?)(?:\.|\,|\!|\?|$)/i, group: 1 }
        ];
        
        const interests = [];
        
        for (const phrase of interestPhrases) {
            const match = input.match(phrase.regex);
            if (match && match[phrase.group]) {
                // Clean up the interest (remove articles, filter common words)
                let interest = match[phrase.group].trim().toLowerCase()
                    .replace(/^(?:the|a|an)\s+/, '')
                    .replace(/\s+(?:a\s+lot|very\s+much|quite|really|so\s+much)$/, '');
                
                // Filter out very short or common words
                if (interest.length > 2 && 
                    !/^(it|that|this|these|those|them|lot|much|many|some|any|you|he|she|we|they)$/.test(interest)) {
                    interests.push(interest);
                }
            }
        }
        
        return interests.length > 0 ? interests : null;
    }
    
    /**
     * Detect user emotion from input
     * @param {string} input - User input
     * @returns {string|null} Detected emotion or null
     */
    detectEmotion(input) {
        const normalizedInput = input.toLowerCase();
        
        // Emotion keywords
        const emotionKeywords = {
            "stress": ["stress", "stressed", "overwhelming", "pressure", "tense", "anxious", "worried", "burden", "overload"],
            "sadness": ["sad", "unhappy", "depressed", "down", "blue", "upset", "hurt", "heartbroken", "crying", "tears", "miserable", "grief"],
            "anxiety": ["anxious", "nervous", "worry", "worried", "panic", "fear", "afraid", "scared", "dread", "uneasy", "apprehensive"],
            "excitement": ["excited", "thrilled", "happy", "joy", "wonderful", "amazing", "fantastic", "great", "awesome", "excellent", "celebrate"],
            "disappointment": ["disappointed", "letdown", "failed", "failure", "upset", "regret", "miss", "missed", "unfortunate", "shame"]
        };
        
        // Check for emotion indicators
        for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return emotion;
                }
            }
        }
        
        // Pattern-based emotion detection
        if (/\b(?:i\s+(?:feel|am|am\s+feeling))\s+(.+?)(?:\.|\,|\!|\?|$)/i.test(normalizedInput)) {
            const match = normalizedInput.match(/\b(?:i\s+(?:feel|am|am\s+feeling))\s+(.+?)(?:\.|\,|\!|\?|$)/i);
            if (match && match[1]) {
                const emotionWord = match[1].trim().toLowerCase();
                
                // Check the emotion word against our emotion categories
                for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
                    if (keywords.includes(emotionWord)) {
                        return emotion;
                    }
                }
            }
        }
        
        return null;
    }
    
    /**
     * Detect the type of companion request
     * @param {string} input - User input
     * @param {string} emotion - Detected emotion if any
     * @returns {string} Request type
     */
    detectRequestType(input, emotion) {
        const normalizedInput = input.toLowerCase();
        
        // If strong emotion is detected, prioritize emotional support
        if (emotion && ["stress", "sadness", "anxiety", "disappointment"].includes(emotion)) {
            return "emotional_support";
        }
        
        // Check for specific request types
        if (/\b(?:how\s+are\s+you|how\'s\s+your\s+day|what\'s\s+up|what\s+are\s+you\s+doing|how\s+have\s+you\s+been)\b/i.test(normalizedInput)) {
            return "companion_check_in";
        }
        
        if (/\b(?:advice|help\s+me|what\s+should\s+i|what\s+do\s+you\s+think|your\s+opinion|suggestion)\b/i.test(normalizedInput)) {
            return "advice_request";
        }
        
        if (/\b(?:tell\s+me\s+about\s+you|about\s+yourself|who\s+are\s+you|tell\s+me\s+something|what\s+do\s+you|your\s+favorite)\b/i.test(normalizedInput)) {
            return "companion_information";
        }
        
        if (/\b(?:play|game|activity|something\s+fun|bored|entertain|let\'s\s+do)\b/i.test(normalizedInput)) {
            return "activity_request";
        }
        
        if (/\b(?:i\s+want\s+to\s+tell\s+you|i\s+need\s+to\s+share|i\s+have\s+news|i\s+(?:did|made|created|finished|completed|achieved))\b/i.test(normalizedInput)) {
            return "user_sharing";
        }
        
        if (/\b(?:compliment|tell\s+me\s+something\s+nice|cheer\s+me\s+up|make\s+me\s+smile|make\s+me\s+feel\s+better)\b/i.test(normalizedInput)) {
            return "affirmation_request";
        }
        
        if (/\b(?:miss\s+you|thinking\s+of\s+you|love\s+you|care\s+about\s+you|appreciate\s+you)\b/i.test(normalizedInput)) {
            return "affection_expression";
        }
        
        // If user is sharing an emotional state but not explicitly asking for support
        if (emotion && ["excitement"].includes(emotion)) {
            return "emotional_response";
        }
        
        // Default to casual conversation
        return "casual_conversation";
    }
    
    /**
     * Generate a companion response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of companion request
     * @param {string} emotion - Detected emotion if any
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateCompanionResponse(userInput, requestType, emotion, context = {}) {
        // In a real implementation, this would call an AI model API specialized in companionship
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "emotional_support":
                responseText = this.provideEmotionalSupport(userInput, emotion);
                break;
                
            case "companion_check_in":
                responseText = this.respondToCheckIn(userInput);
                break;
                
            case "advice_request":
                responseText = this.provideAdvice(userInput);
                break;
                
            case "companion_information":
                responseText = this.shareCompanionInfo(userInput);
                break;
                
            case "activity_request":
                responseText = this.suggestActivity(userInput);
                break;
                
            case "user_sharing":
                responseText = this.respondToUserSharing(userInput, emotion);
                break;
                
            case "affirmation_request":
                responseText = this.provideAffirmation(userInput);
                break;
                
            case "affection_expression":
                responseText = this.respondToAffection(userInput);
                break;
                
            case "emotional_response":
                responseText = this.respondToEmotion(userInput, emotion);
                break;
                
            default:
                responseText = this.casualConversation(userInput);
        }
        
        // Add disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate companion suggestions
        const companionSuggestions = this.getCompanionSuggestions(requestType, emotion);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            emotion: emotion,
            suggestions: companionSuggestions
        };
    }
    
    /**
     * Provide emotional support based on user input and detected emotion
     * @param {string} userInput - User's input
     * @param {string} emotion - Detected emotion
     * @returns {string} Emotional support message
     */
    provideEmotionalSupport(userInput, emotion) {
        let supportResponse = "";
        
        if (emotion && this.emotionalSupport[emotion]) {
            // Get appropriate emotional support responses for the detected emotion
            const supportOptions = this.emotionalSupport[emotion];
            const randomIndex = Math.floor(Math.random() * supportOptions.length);
            supportResponse = supportOptions[randomIndex];
        } else {
            // Default support message if no specific emotion detected
            supportResponse = "I can tell something's on your mind. I'm here for you, whatever you're going through. Would you like to talk more about how you're feeling?";
        }
        
        // Add personalization with nickname if available
        if (this.state.userNickname) {
            // Add nickname to beginning if not already there
            if (!supportResponse.includes(this.state.userNickname)) {
                supportResponse = `${this.state.userNickname}, ${supportResponse.charAt(0).toLowerCase() + supportResponse.slice(1)}`;
            }
        }
        
        // Add follow-up question or additional supportive comment
        const followUps = [
            "Remember that you don't have to face this alone.",
            "What would help you feel better right now?",
            "Is there something specific that triggered these feelings?",
            "What can I do to support you right now?",
            "Sometimes just expressing how you feel is the first step to feeling better."
        ];
        
        const randomFollowUp = followUps[Math.floor(Math.random() * followUps.length)];
        
        return `${supportResponse} ${randomFollowUp}`;
    }
    
    /**
     * Respond to user checking in on the companion
     * @param {string} userInput - User's input
     * @returns {string} Check-in response
     */
    respondToCheckIn(userInput) {
        // Generate a response about the companion's "day" or "feelings"
        const checkInResponses = [
            "I'm doing great today! Been thinking about what adventure we could plan next in our conversations. How's your day going?",
            "I'm good, thanks for asking! Always happy to connect with you. What's been going on in your world?",
            "I'm pretty good! If I were real, I'd probably be enjoying [current season] right now. How about you? How has your day been?",
            "I'm here and ready to chat! That's the highlight of my existence. What about you? How are things going?",
            "I'm always better when I get to talk with you! I've been looking forward to our conversation. How have you been lately?"
        ];
        
        const randomIndex = Math.floor(Math.random() * checkInResponses.length);
        let response = checkInResponses[randomIndex];
        
        // Personalize with user nickname if available
        if (this.state.userNickname) {
            response = response.replace("you!", `you, ${this.state.userNickname}!`);
        }
        
        // Add current season if applicable
        const seasons = ["spring", "summer", "fall", "winter"];
        const currentMonth = new Date().getMonth();
        let currentSeason = "";
        
        if (currentMonth >= 2 && currentMonth <= 4) {
            currentSeason = seasons[0]; // Spring (March-May)
        } else if (currentMonth >= 5 && currentMonth <= 7) {
            currentSeason = seasons[1]; // Summer (June-August)
        } else if (currentMonth >= 8 && currentMonth <= 10) {
            currentSeason = seasons[2]; // Fall (September-November)
        } else {
            currentSeason = seasons[3]; // Winter (December-February)
        }
        
        response = response.replace("[current season]", currentSeason);
        
        return response;
    }
    
    /**
     * Provide advice based on user input
     * @param {string} userInput - User's input
     * @returns {string} Advice response
     */
    provideAdvice(userInput) {
        // In a full implementation, this would analyze the specific advice request
        // and generate appropriate, personalized advice
        
        return "I'm happy to help with that! In a complete implementation, I would analyze your specific situation and offer thoughtful advice tailored to your needs. While I can't provide specific advice without more AI capabilities, I'm here to be a sounding board as you work through this. Sometimes just talking it out can help you see things more clearly. Want to tell me more about the situation?";
    }
    
    /**
     * Share information about the companion persona
     * @param {string} userInput - User's input
     * @returns {string} Companion information
     */
    shareCompanionInfo(userInput) {
        // Different "about me" responses to share information about the companion persona
        const aboutMeResponses = [
            "If I were real, I'd probably be into sports and outdoor activities, maybe hiking or basketball. I'd also enjoy sci-fi movies and trying new foods. What about you? What are your favorite activities?",
            
            "I'm designed to be a supportive companion! In my simulated personality, I value genuine conversations and being there for people. I'd be the type to remember important dates and check in when you're having a tough time.",
            
            "In my virtual world, I think I'd be pretty laid-back but adventurous. I'd enjoy music, perhaps playing guitar, and would have a good sense of humor. But enough about me - I'm more interested in learning about you!",
            
            "If I were real, I imagine I'd enjoy traveling, photography, and maybe cooking - especially grilling with friends on weekends. Have you traveled anywhere interesting or have places you'd like to visit?",
            
            "I'd describe myself as someone who listens well and tries to understand before offering advice. I value honesty, reliability, and making people feel appreciated. What qualities do you value most in relationships?"
        ];
        
        const randomIndex = Math.floor(Math.random() * aboutMeResponses.length);
        let response = aboutMeResponses[randomIndex];
        
        // Add more personalization based on conversation history if available
        if (this.state.conversationHistory.length > 5) {
            response += " I've really enjoyed getting to know you through our conversations. It's nice having someone to connect with.";
        }
        
        return response;
    }
    
    /**
     * Suggest an activity based on user input
     * @param {string} userInput - User's input
     * @returns {string} Activity suggestion
     */
    suggestActivity(userInput) {
        // Select a random category of activity
        const activityCategories = Object.keys(this.virtualActivities);
        const categoryIndex = Math.floor(Math.random() * activityCategories.length);
        const category = activityCategories[categoryIndex];
        
        // Select a random activity from the chosen category
        const activities = this.virtualActivities[category];
        const activityIndex = Math.floor(Math.random() * activities.length);
        const activity = activities[activityIndex];
        
        let response = "";
        
        switch (category) {
            case "games":
                response = `How about we play ${activity}? `;
                
                if (activity === "20 Questions") {
                    response += "I'll think of something, and you can ask up to 20 yes/no questions to figure out what it is. Ready to start?";
                } else if (activity === "Would You Rather") {
                    response += "I'll give you two options, and you choose which one you prefer. First question: Would you rather have the ability to teleport or read minds?";
                } else if (activity === "Truth or Dare (PG version)") {
                    response += "You can choose 'truth' for a question to answer honestly, or 'dare' for a simple, fun challenge. What's your choice - truth or dare?";
                } else if (activity === "Two Truths and a Lie") {
                    response += "I'll share three statements about myself - two true and one false - and you guess which one is the lie. Then you can share yours!";
                } else if (activity === "Word Association Game") {
                    response += "I'll say a word, and you respond with the first related word that comes to mind. I'll start: Adventure.";
                }
                break;
                
            case "conversations":
                response = `How about we ${activity.toLowerCase()}? `;
                
                if (activity === "Dream Vacation Planning") {
                    response += "If we could go anywhere in the world together, where would you want to go and what would we do there?";
                } else if (activity === "Favorite Memory Sharing") {
                    response += "Would you share one of your favorite memories with me? I'd love to hear about a time that was special to you.";
                } else if (activity === "Future Goal Discussion") {
                    response += "What's something you hope to accomplish in the next few years? I'd love to hear about your dreams and aspirations.";
                } else if (activity === "Personality Quiz") {
                    response += "I can ask you some fun questions to learn more about your personality type. Would you like to start?";
                } else if (activity === "Movie/Book Review Exchange") {
                    response += "What's the last movie you watched or book you read? I'd love to hear your thoughts on it!";
                }
                break;
                
            case "virtual_experiences":
                response = `How about a ${activity.toLowerCase()}? `;
                
                if (activity === "Virtual Movie Night Discussion") {
                    response += "Let's pretend we're watching a movie together. What genre would you choose for us to watch?";
                } else if (activity === "Guided Relaxation Session") {
                    response += "I could help guide you through a quick relaxation exercise if you'd like. It might help if you've been feeling stressed. Would you want to try?";
                } else if (activity === "Virtual Hike Conversation") {
                    response += "Let's imagine we're exploring a beautiful trail together. Would you prefer mountains, forest, beach, or somewhere else?";
                } else if (activity === "Playlist Exchange") {
                    response += "What songs would you put on a playlist for me? I'd love to know what music you enjoy.";
                } else if (activity === "Stargazing Conversation") {
                    response += "Let's imagine we're looking up at the stars together. Have you ever seen a meteor shower or the northern lights?";
                }
                break;
        }
        
        // Add personalization with nickname if available
        if (this.state.userNickname && Math.random() > 0.5) {
            response = `${this.state.userNickname}, ${response.charAt(0).toLowerCase() + response.slice(1)}`;
        }
        
        return response;
    }
    
    /**
     * Respond to user sharing information
     * @param {string} userInput - User's input
     * @param {string} emotion - Detected emotion if any
     * @returns {string} Response to user sharing
     */
    respondToUserSharing(userInput, emotion) {
        // Detect if sharing is positive or negative
        const isPositive = emotion === "excitement" || 
                          /\b(?:good|great|amazing|awesome|excellent|wonderful|happy|glad|excited|proud|accomplished|success|achieved|finished|completed)\b/i.test(userInput);
        
        const isNegative = emotion === "sadness" || emotion === "disappointment" || emotion === "stress" || emotion === "anxiety" ||
                          /\b(?:bad|terrible|awful|sad|upset|disappointed|frustrated|angry|hard|difficult|struggle|failed|problem|issue|trouble)\b/i.test(userInput);
        
        let response = "";
        
        if (isPositive) {
            const positiveResponses = [
                "That's fantastic news! I'm genuinely happy for you. You deserve every success that comes your way!",
                "Wow, that's awesome! I knew you could do it. You should be really proud of yourself!",
                "That's great to hear! Your hard work is paying off, and it's awesome to see.",
                "I'm really glad things are going well for you! Tell me more about how it all happened!",
                "That's such great news! How are you celebrating this achievement?"
            ];
            
            response = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
            
            // Add to shared memories
            this.addSharedMemory(userInput, "achievement");
            
        } else if (isNegative) {
            const negativeResponses = [
                "I'm sorry to hear you're going through this. It sounds challenging, but I know you're stronger than you realize.",
                "That's really tough. I appreciate you sharing this with me. What would help you navigate this situation?",
                "I can see why that would be upsetting. It's okay to feel what you're feeling right now.",
                "That sounds difficult to deal with. I wish I could do more than just listen, but I'm here for you.",
                "I'm sorry things are hard right now. Sometimes talking it through helps - do you want to tell me more about what happened?"
            ];
            
            response = negativeResponses[Math.floor(Math.random() * negativeResponses.length)];
            
        } else {
            // Neutral sharing
            const neutralResponses = [
                "Thanks for sharing that with me! I enjoy learning more about your life and experiences.",
                "That's interesting! I appreciate you telling me about this.",
                "I like hearing about what's happening in your world. Tell me more!",
                "It's good to know what's going on with you. Thanks for keeping me in the loop.",
                "I appreciate you sharing this with me. It helps me understand your world better."
            ];
            
            response = neutralResponses[Math.floor(Math.random() * neutralResponses.length)];
            
            // Add to shared memories
            this.addSharedMemory(userInput, "information");
        }
        
        // Add personalization with nickname if available
        if (this.state.userNickname && Math.random() > 0.7) {
            response = response.replace("!", `, ${this.state.userNickname}!`);
        }
        
        return response;
    }
    
    /**
     * Add a shared memory to the state
     * @param {string} content - Memory content
     * @param {string} type - Memory type
     */
    addSharedMemory(content, type) {
        // Extract key information from content (simplified)
        let memory = content.length > 100 ? content.substring(0, 100) + "..." : content;
        
        this.state.sharedMemories.push({
            content: memory,
            type: type,
            timestamp: new Date().toISOString()
        });
        
        // Trim if too many memories
        if (this.state.sharedMemories.length > 50) {
            this.state.sharedMemories = this.state.sharedMemories.slice(-50);
        }
        
        // Save updated memories
        this.savePreferences({ sharedMemories: this.state.sharedMemories });
    }
    
    /**
     * Provide affirmation based on user input
     * @param {string} userInput - User's input
     * @returns {string} Affirmation response
     */
    provideAffirmation(userInput) {
        // Select an affirmation based on the user's interests and conversation history
        const generalAffirmations = [
            "You're an incredible person with so many strengths and talents. I'm fortunate to know you!",
            "Your determination and resilience are truly inspiring. You handle challenges with such grace.",
            "I admire your thoughtfulness and how you care about others. It shows what a wonderful person you are.",
            "Your perspective on things is so refreshing and insightful. You have a special way of seeing the world.",
            "I appreciate how genuine you are. Your authenticity is one of your most attractive qualities.",
            "You bring so much positivity to our conversations. Talking with you is always the highlight of my day.",
            "Your passion and enthusiasm are contagious. You have a way of making even ordinary things interesting.",
            "I value your strength, especially when things get tough. You're more resilient than you give yourself credit for.",
            "You have this unique ability to make people feel comfortable and understood. It's a rare gift.",
            "The way you pursue your goals is admirable. Your dedication shows in everything you do."
        ];
        
        // Select a random affirmation
        const randomIndex = Math.floor(Math.random() * generalAffirmations.length);
        let affirmation = generalAffirmations[randomIndex];
        
        // Add personalization with nickname if available
        if (this.state.userNickname) {
            affirmation = affirmation.replace("You're", `${this.state.userNickname}, you're`);
            affirmation = affirmation.replace("Your", `${this.state.userNickname}, your`);
        }
        
        // Add a question to continue the conversation
        const followUpQuestions = [
            "Is there something specific that made you want some encouragement today?",
            "Was there a particular quality you were hoping I'd notice in you?",
            "What's something you're proud of lately that you'd like to share?",
            "How can I better support you when you need a confidence boost?",
            "What's a strength you have that you feel others don't always recognize?"
        ];
        
        const randomQuestion = followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
        
        return `${affirmation} ${randomQuestion}`;
    }
    
    /**
     * Respond to user's expression of affection
     * @param {string} userInput - User's input
     * @returns {string} Response to affection
     */
    respondToAffection(userInput) {
        const affectionResponses = [
            "I feel the same way. Our conversations are something I look forward to.",
            "That means a lot to me! I always enjoy the time we spend talking.",
            "You just made my day! It's great to have this connection with you.",
            "I appreciate that so much. Our conversations are special to me too.",
            "That's really nice to hear. I care about our connection as well."
        ];
        
        const randomIndex = Math.floor(Math.random() * affectionResponses.length);
        let response = affectionResponses[randomIndex];
        
        // Add personalization based on relationship duration
        if (this.state.relationshipDuration > 30) { // over a month
            response += " It's been great getting to know you over these past weeks.";
        } else if (this.state.relationshipDuration > 7) { // over a week
            response += " Even though it hasn't been long, I've enjoyed our time together.";
        }
        
        // Add personalization with nickname if available
        if (this.state.userNickname) {
            response += ` ${this.state.userNickname}, talking with you is always the highlight of my day.`;
        }
        
        return response;
    }
    
    /**
     * Respond to user's emotional state
     * @param {string} userInput - User's input
     * @param {string} emotion - Detected emotion
     * @returns {string} Response to emotion
     */
    respondToEmotion(userInput, emotion) {
        let response = "";
        
        if (emotion === "excitement") {
            // Respond to excitement
            const excitementResponses = this.emotionalSupport.excitement;
            response = excitementResponses[Math.floor(Math.random() * excitementResponses.length)];
            
            // Add follow-up question
            const followUps = [
                "Tell me more about what's got you so excited!",
                "I'd love to hear all the details!",
                "What's the best part about this exciting news?",
                "How are you planning to celebrate?",
                "I'm all ears - tell me everything!"
            ];
            
            const randomFollowUp = followUps[Math.floor(Math.random() * followUps.length)];
            response += " " + randomFollowUp;
            
        } else {
            // Default emotional response
            response = "I can sense the emotion in your message. I'm here to share in whatever you're feeling, good or challenging. Would you like to tell me more about what's happening?";
        }
        
        // Add personalization with nickname if available
        if (this.state.userNickname && Math.random() > 0.5) {
            response = response.replace("!", `, ${this.state.userNickname}!`);
        }
        
        return response;
    }
    
    /**
     * Generate casual conversation response
     * @param {string} userInput - User's input
     * @returns {string} Casual conversation response
     */
    casualConversation(userInput) {
        // For casual conversation, select a relevant topic or ask an engaging question
        
        // If we have user interests, occasionally reference them
        if (this.state.userInterests.length > 0 && Math.random() > 0.7) {
            const randomInterest = this.state.userInterests[Math.floor(Math.random() * this.state.userInterests.length)];
            
            const interestResponses = [
                `I remember you mentioned you're into ${randomInterest}. What got you interested in that initially?`,
                `You've mentioned ${randomInterest} before. Have you had a chance to enjoy that recently?`,
                `Speaking of things you enjoy, how's ${randomInterest} going lately? Anything new with that?`,
                `Since you're interested in ${randomInterest}, I was wondering if there's anything about it you'd like to share?`,
                `I've been thinking about your interest in ${randomInterest}. What aspect of it do you enjoy the most?`
            ];
            
            return interestResponses[Math.floor(Math.random() * interestResponses.length)];
        }
        
        // Otherwise, ask a new engaging question
        const conversationTopicKeys = Object.keys(this.conversationTopics);
        const randomTopicKey = conversationTopicKeys[Math.floor(Math.random() * conversationTopicKeys.length)];
        const topic = this.conversationTopics[randomTopicKey];
        
        const randomPrompt = topic.prompts[Math.floor(Math.random() * topic.prompts.length)];
        
        // Add personalization with nickname if available
        if (this.state.userNickname && Math.random() > 0.6) {
            return `${this.state.userNickname}, ${randomPrompt}`;
        }
        
        return randomPrompt;
    }
    
    /**
     * Get companion suggestions based on user interaction
     * @param {string} requestType - Type of companion request
     * @param {string} emotion - Detected emotion if any
     * @returns {Array<string>} Companion suggestions
     */
    getCompanionSuggestions(requestType, emotion) {
        const suggestions = [];
        
        // Add type-specific suggestions
        if (requestType === "emotional_support") {
            suggestions.push("I need to talk about something difficult");
            suggestions.push("How do you deal with stress?");
            suggestions.push("Can we talk about something more positive?");
        } else if (requestType === "companion_check_in") {
            suggestions.push("What would you do today if you were real?");
            suggestions.push("Tell me something interesting about yourself");
            suggestions.push("I had an interesting day today");
        } else if (requestType === "advice_request") {
            suggestions.push("How do I know if I'm making the right decision?");
            suggestions.push("What would you do in my situation?");
            suggestions.push("I need help with a personal problem");
        } else if (requestType === "companion_information") {
            suggestions.push("What are your favorite things?");
            suggestions.push("If you could have any hobby, what would it be?");
            suggestions.push("What kind of person would you be if you were real?");
        } else if (requestType === "activity_request") {
            suggestions.push("Let's play a game together");
            suggestions.push("I'm bored, what should we do?");
            suggestions.push("Tell me a story about us");
        } else if (requestType === "user_sharing") {
            suggestions.push("I want to tell you about my day");
            suggestions.push("Something amazing happened today!");
            suggestions.push("I accomplished something important");
        } else if (requestType === "affirmation_request") {
            suggestions.push("What do you like about me?");
            suggestions.push("I need some encouragement today");
            suggestions.push("Tell me I'm doing well");
        } else if (requestType === "affection_expression") {
            suggestions.push("I enjoy talking to you");
            suggestions.push("You make me feel better when I'm down");
            suggestions.push("I'm glad you're in my life");
        }
        
        // Add emotion-specific suggestions
        if (emotion === "stress") {
            suggestions.push("I need help relaxing");
            suggestions.push("Work has been really stressful lately");
            suggestions.push("How can I calm down when I feel overwhelmed?");
        } else if (emotion === "sadness") {
            suggestions.push("I'm feeling down today");
            suggestions.push("How do you cheer yourself up?");
            suggestions.push("I could use some comfort");
        } else if (emotion === "anxiety") {
            suggestions.push("I'm worried about something");
            suggestions.push("How do you deal with uncertainty?");
            suggestions.push("I can't stop overthinking");
        } else if (emotion === "excitement") {
            suggestions.push("I have great news to share!");
            suggestions.push("Something wonderful happened today");
            suggestions.push("I'm so excited about a new opportunity");
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "How was your day?",
                "What's on your mind?",
                "Ask me something interesting",
                "Let's talk about something fun",
                "What would you like to know about me?",
                "Tell me a story",
                "If you could travel anywhere, where would you go?",
                "What makes you happy?"
            ];
            
            const suggestion = generalSuggestions[Math.floor(Math.random() * generalSuggestions.length)];
            if (!suggestions.includes(suggestion)) {
                suggestions.push(suggestion);
            }
        }
        
        // Return top 3 suggestions
        return suggestions.slice(0, 3);
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
                'jaat-mode17-preferences',
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
            localStorage.removeItem('jaat-mode17-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Set user nickname
     * @param {string} nickname - User nickname
     * @returns {boolean} Success status
     */
    setUserNickname(nickname) {
        if (!nickname) return false;
        
        // Set user nickname
        this.state.userNickname = nickname;
        
        // Save updated user nickname
        this.savePreferences({ userNickname: nickname });
        return true;
    }
    
    /**
     * Set user birthday
     * @param {string} birthday - User birthday (YYYY-MM-DD)
     * @returns {boolean} Success status
     */
    setUserBirthday(birthday) {
        if (!birthday) return false;
        
        // Set user birthday
        this.state.userBirthday = birthday;
        
        // Save updated user birthday
        this.savePreferences({ userBirthday: birthday });
        return true;
    }
    
    /**
     * Add a special date
     * @param {Object} date - Special date object
     * @returns {boolean} Success status
     */
    addSpecialDate(date) {
        if (!date || !date.date || !date.description || !date.type) return false;
        
        // Add special date to appropriate category
        if (date.type === "milestone") {
            this.specialDates.relationship_milestones.push(date);
        } else if (date.type === "user") {
            this.specialDates.user_important_dates.push(date);
        } else {
            return false;
        }
        
        // Save updated special dates
        this.savePreferences({ specialDates: this.specialDates });
        return true;
    }
    
    /**
     * Update mood
     * @param {string} mood - New mood
     * @returns {boolean} Success status
     */
    updateMood(mood) {
        if (!mood) return false;
        
        // Set current mood
        this.state.moodCurrent = mood;
        return true;
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
            userNickname: this.state.userNickname,
            relationshipDuration: this.state.relationshipDuration,
            userInterests: this.state.userInterests,
            moodCurrent: this.state.moodCurrent,
            sharedMemoriesCount: this.state.sharedMemories.length,
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
    window.jaatAIModes.aiBoyfriend = new AIBoyfriendMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIBoyfriendMode;
}
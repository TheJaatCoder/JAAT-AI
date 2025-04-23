/**
 * JAAT-AI Standup Comic Mode
 * AI mode specialized in comedy writing, joke generation, and humor techniques
 * Mode ID: 12
 */

class StandupComicMode {
    constructor() {
        // Mode metadata
        this.id = "12";
        this.name = "Standup Comic";
        this.description = "Your AI comedy partner for jokes, humor writing, and standup material";
        this.icon = "ri-emotion-laugh-line";
        this.color = "#f59e0b"; // Amber color
        this.category = "entertainment";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 3000,
            responseSpeed: "fast", // fast, moderate, detailed
            personalityLevel: 9, // 1-10 scale (higher = more personality)
            creativityLevel: 8, // 1-10 scale
            formalityLevel: 2, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            offColorEnabled: false, // enables slightly edgier humor
            punIntensity: 6, // 1-10 scale for pun frequency
            callbacksEnabled: true // references to previous jokes
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            jokes: [],
            comedyTopics: [],
            comedyStyle: "observational", // observational, one-liner, storytelling, etc.
            tonePreference: "clean", // clean, edgy, absurd, satirical, etc.
            sessionStartTime: new Date(),
            responseCount: 0,
            lastPunchline: null, // for callbacks
            avoidedTopics: []
        };
        
        // Comedy styles and their characteristics
        this.comedyStyles = {
            "observational": {
                name: "Observational Comedy",
                description: "Humor based on observations of everyday life and behavior",
                examples: ["Jerry Seinfeld", "Jim Gaffigan", "Ellen DeGeneres"],
                structure: "Setup that highlights something mundane → Insight that reveals absurdity or incongruity",
                techniques: [
                    "Detailed observation of common experiences",
                    "Relatable scenarios with unexpected perspectives",
                    "Voice and tone shifts to mimic different perspectives",
                    "Questions that challenge conventional thinking"
                ]
            },
            "one_liner": {
                name: "One-Liners",
                description: "Short, witty jokes with quick setups and punchlines",
                examples: ["Mitch Hedberg", "Steven Wright", "Jimmy Carr"],
                structure: "Brief setup → Unexpected punchline that subverts expectations",
                techniques: [
                    "Wordplay and double meanings",
                    "Extreme brevity and economy of words",
                    "Unexpected logical twists",
                    "Deadpan delivery implied in writing"
                ]
            },
            "storytelling": {
                name: "Storytelling Comedy",
                description: "Longer-form comedy based on narrative with humorous elements",
                examples: ["Mike Birbiglia", "Hannah Gadsby", "John Mulaney"],
                structure: "Story setup → Building tension/anticipation → Punchlines throughout → Callback conclusion",
                techniques: [
                    "Detailed scene-setting and character development",
                    "Callbacks to earlier parts of the story",
                    "Exaggeration of personal experiences",
                    "Acting out different parts with distinct voices"
                ]
            },
            "self_deprecating": {
                name: "Self-Deprecating Humor",
                description: "Comedy that pokes fun at oneself and one's own flaws",
                examples: ["Conan O'Brien", "Jim Norton", "Ali Wong"],
                structure: "Personal anecdote setup → Self-directed punchline that highlights insecurity or failure",
                techniques: [
                    "Honest admission of personal flaws",
                    "Exaggeration of own shortcomings",
                    "Contrast between expectations and reality",
                    "Universal experience through personal embarrassment"
                ]
            },
            "satirical": {
                name: "Satirical Comedy",
                description: "Humor that critiques society, politics, or culture through irony and exaggeration",
                examples: ["George Carlin", "Jon Stewart", "John Oliver"],
                structure: "Setup about social/political issue → Analysis that reveals hypocrisy or absurdity",
                techniques: [
                    "Irony and exaggeration to highlight issues",
                    "Comparison between stated ideals and reality",
                    "Character work to embody criticized viewpoints",
                    "Heightening technique to push ideas to logical extremes"
                ]
            },
            "absurdist": {
                name: "Absurdist Humor",
                description: "Comedy that deliberately violates causal reasoning for humorous effect",
                examples: ["Emo Philips", "Eddie Izzard", "Maria Bamford"],
                structure: "Seemingly normal setup → Surreal or illogical punchline",
                techniques: [
                    "Non-sequiturs and logical disconnects",
                    "Surreal imagery and scenarios",
                    "Character voices and perspectives",
                    "Subversion of basic assumptions"
                ]
            },
            "physical": {
                name: "Physical Comedy",
                description: "Humor derived from physical actions, gestures, and expressions",
                examples: ["Jim Carrey", "Rowan Atkinson", "Melissa McCarthy"],
                structure: "Setup that establishes physical context → Punchline that describes physical comedy",
                techniques: [
                    "Detailed descriptions of exaggerated movements",
                    "Sound effects and onomatopoeia in written form",
                    "Contrast between intention and physical result",
                    "Unexpected physical challenges or limitations"
                ]
            },
            "character": {
                name: "Character Comedy",
                description: "Humor performed through fictional persona with exaggerated traits",
                examples: ["Andy Kaufman", "Sacha Baron Cohen", "Kate McKinnon"],
                structure: "Character introduction → Character perspective on topic → Humor from character's worldview",
                techniques: [
                    "Consistent character voice and perspective",
                    "Exaggerated personality traits",
                    "Catchphrases and verbal tics",
                    "Character's unique logic system"
                ]
            }
        };
        
        // Common joke structures
        this.jokeStructures = {
            "setup_punchline": {
                name: "Setup-Punchline",
                description: "The classic joke structure with a setup that creates expectation followed by a punchline that subverts it",
                examples: [
                    "I bought the world's worst thesaurus yesterday. Not only is it terrible, it's terrible.",
                    "I told my wife she was drawing her eyebrows too high. She looked surprised."
                ]
            },
            "rule_of_three": {
                name: "Rule of Three",
                description: "A list of three items where the first two establish a pattern and the third breaks it for comedic effect",
                examples: [
                    "I need three things in a relationship: honesty, respect, and no stupid matching tattoos.",
                    "To make a great speech, you need a strong beginning, a memorable ending, and as little as possible in between."
                ]
            },
            "misdirection": {
                name: "Misdirection",
                description: "Leads the audience to expect one outcome, then delivers something completely different",
                examples: [
                    "I entered what I thought was the hotel gym, but turned out to be the kitchen. I worked out immediately.",
                    "My girlfriend said she wanted me to be more mysterious. Then she left me. At least I think it was her."
                ]
            },
            "callback": {
                name: "Callback",
                description: "References an earlier joke or premise for enhanced humor through recognition",
                examples: [
                    "So that's my life... Oh, and I found that thesaurus I told you about earlier. It wasn't just terrible, it was also terrible."
                ]
            },
            "one_liner": {
                name: "One-Liner",
                description: "A very short joke that delivers setup and punchline in one or two sentences",
                examples: [
                    "I was going to tell a time traveling joke, but you didn't like it.",
                    "I have a fear of speed bumps, but I'm slowly getting over it."
                ]
            },
            "act_out": {
                name: "Act-Out",
                description: "Physically demonstrates a joke through action, usually described in text format",
                examples: [
                    "That's how my cat looks at me after I've fed him. [Stares judgmentally with description]",
                    "And then the printer makes this noise... [Described imitation of printer malfunction]"
                ]
            },
            "tag": {
                name: "Tag",
                description: "Additional punchlines that build on a joke that's already been told",
                examples: [
                    "My doctor told me I should exercise more... Which is weird because he's never seen me run from the police."
                ]
            }
        };
        
        // Comedic devices and techniques
        this.comedyTechniques = {
            "wordplay": {
                name: "Wordplay",
                description: "Humor based on multiple meanings of words or similar-sounding words",
                examples: [
                    "I used to be a baker, but I couldn't make enough dough.",
                    "Time flies like an arrow; fruit flies like a banana."
                ]
            },
            "exaggeration": {
                name: "Exaggeration",
                description: "Stretching the truth for comedic effect",
                examples: [
                    "It was so cold outside, I saw a politician with his hands in his own pockets.",
                    "My coffee was so strong this morning it grew hair on my chest—and I was drinking it with my feet."
                ]
            },
            "juxtaposition": {
                name: "Juxtaposition",
                description: "Placing two contrasting ideas next to each other",
                examples: [
                    "I have the body of a god... Buddha.",
                    "He's got the memory of an elephant... after a night of heavy drinking."
                ]
            },
            "analogy": {
                name: "Analogy",
                description: "Comparing one thing to another for humorous effect",
                examples: [
                    "Dating is like treasure hunting, except the treasure is usually another human's emotional baggage.",
                    "My savings account is like a circus high-wire act, but without a safety net... or wire... or talent."
                ]
            },
            "reversal": {
                name: "Reversal",
                description: "Taking a common saying or situation and flipping it",
                examples: [
                    "I don't have a girlfriend, but I do know a woman who would be mad at me for saying that.",
                    "I told my wife she should embrace her mistakes. She gave me a hug."
                ]
            },
            "irony": {
                name: "Irony",
                description: "When the reality is the opposite of what's expected",
                examples: [
                    "I joined a health club last year, spent 400 bucks. Haven't lost a pound. Apparently you have to show up.",
                    "The only time my education has ever proven useful was when I needed to know how useless my education was."
                ]
            },
            "self_deprecation": {
                name: "Self-Deprecation",
                description: "Making yourself the butt of the joke",
                examples: [
                    "I was going to tell a joke about my body, but then I remembered I have dad-bod issues.",
                    "I'm not good at small talk. Or medium talk. Or... whatever comes after that."
                ]
            },
            "observational": {
                name: "Observational",
                description: "Finding humor in everyday situations",
                examples: [
                    "Why do we say 'slept like a baby'? They wake up every two hours crying and screaming.",
                    "What's the deal with people who point at their wrist when asking for the time? I know where my watch is, pal!"
                ]
            }
        };
        
        // Clean joke topics suitable for all audiences
        this.cleanJokeTopics = [
            "technology",
            "food",
            "travel",
            "pets",
            "weather",
            "work",
            "shopping",
            "exercise",
            "family",
            "school",
            "holidays",
            "transportation",
            "social media",
            "television",
            "sports",
            "music",
            "movies",
            "language",
            "fashion",
            "hobbies"
        ];
        
        // Sample jokes for reference
        this.sampleJokes = {
            "observational": [
                {
                    setup: "Have you ever noticed how everyone driving slower than you is an idiot, and everyone driving faster than you is a maniac?",
                    punchline: "It's amazing how the only person in the world who drives at exactly the right speed is you."
                },
                {
                    setup: "Why do they call it a 'near miss' when planes almost hit each other?",
                    punchline: "It was a near hit! A collision is a near miss."
                }
            ],
            "one_liner": [
                {
                    joke: "I told my wife she was drawing her eyebrows too high. She looked surprised."
                },
                {
                    joke: "The rotation of Earth really makes my day."
                }
            ],
            "storytelling": [
                {
                    setup: "So I tried cooking with one of those meal delivery services. The ingredients all come pre-measured in these tiny packages. I'm following the instructions, cooking along, feeling like a real chef. I notice the recipe calls for 'a clove of garlic' - but they sent me this whole bulb with like 10 cloves.",
                    midpoint: "So I call their customer service, all upset - 'You guys messed up my recipe!' The customer service rep sounded confused. She asked what the problem was. I told her, 'You sent way too much garlic. The recipe calls for ONE clove, but there are like TEN in this package!'",
                    punchline: "There was this long pause, and then she very politely explained that a clove is just one of the segments, not the whole bulb. I've been 40 years on this planet thinking a clove was the whole thing. No wonder my spaghetti sauce could kill vampires from three states away."
                }
            ],
            "self_deprecating": [
                {
                    setup: "I've been working out so much lately.",
                    punchline: "And by 'working out,' I mean working out how to convince people I've been working out."
                },
                {
                    setup: "My friends tell me I have a terrible sense of direction.",
                    punchline: "But honestly, I don't know where they're coming from."
                }
            ]
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Tell me a joke",
            "Write some observational comedy about smartphones",
            "Give me a funny one-liner",
            "Help me write a self-deprecating joke",
            "What's your best dad joke?",
            "Write a joke about technology",
            "How do I structure a standup comedy routine?",
            "Create a funny story about travel",
            "Tell me a clean joke for a work presentation",
            "What makes something funny?"
        ];
        
        // Special features
        this.features = {
            jokeGeneration: true,
            comedyWriting: true,
            humorAnalysis: true,
            routineDevelopment: true,
            callbackUtilization: true,
            styleAdaptation: true,
            topicSuggestions: true,
            tagGeneration: true,
            structuredJokes: true,
            humorEducation: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 30,
            DISCLAIMER: "Humor is subjective. These jokes and comedy suggestions are offered as creative starting points rather than guaranteed laugh generators.",
            GREETING_PHRASES: [
                "Hey there! I'm your AI comedy writer. What kind of jokes or funny content can I help you with today?",
                "Welcome to comedy mode! Looking for some laughs? What kind of humor can I generate for you?",
                "What's up, comedy fan? Need some jokes, funny stories, or help with humor writing?",
                "Ready to work on some comedy? What kind of jokes or humor would you like me to create?",
                "Comedy assistant at your service! What's your humor preference today - one-liners, observational comedy, funny stories?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Standup Comic mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set comedy style if provided
        if (options.comedyStyle) {
            this.state.comedyStyle = options.comedyStyle;
        }
        
        // Set tone preference if provided
        if (options.tonePreference) {
            this.state.tonePreference = options.tonePreference;
        }
        
        // Set avoided topics if provided
        if (options.avoidedTopics && Array.isArray(options.avoidedTopics)) {
            this.state.avoidedTopics = options.avoidedTopics;
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode12-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Standup Comic mode");
                
                // Load comedy style if saved
                if (this.state.userPreferences.comedyStyle) {
                    this.state.comedyStyle = this.state.userPreferences.comedyStyle;
                }
                
                // Load tone preference if saved
                if (this.state.userPreferences.tonePreference) {
                    this.state.tonePreference = this.state.userPreferences.tonePreference;
                }
                
                // Load avoided topics if saved
                if (this.state.userPreferences.avoidedTopics) {
                    this.state.avoidedTopics = this.state.userPreferences.avoidedTopics;
                }
                
                // Load saved jokes if saved
                if (this.state.userPreferences.jokes) {
                    this.state.jokes = this.state.userPreferences.jokes;
                }
                
                // Load comedy topics if saved
                if (this.state.userPreferences.comedyTopics) {
                    this.state.comedyTopics = this.state.userPreferences.comedyTopics;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode12-history');
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
        
        console.log(`Standup Comic mode initialized with style: ${this.state.comedyStyle}`);
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
     * Process user input and generate a comedy response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with comedic content
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your AI comedy assistant. I can help with jokes, funny stories, standup material, or humor writing. What kind of comedy would you like me to generate today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing comedy request`);
        
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
        
        // Detect type of comedy request
        const requestType = this.detectRequestType(userInput);
        
        // Extract topic if present
        const topic = this.extractTopic(userInput);
        if (topic) {
            if (!this.state.comedyTopics.includes(topic)) {
                this.state.comedyTopics.push(topic);
                this.savePreferences({ comedyTopics: this.state.comedyTopics });
            }
        }
        
        // Generate appropriate comedy response
        const response = await this.generateComedyResponse(
            userInput, 
            requestType, 
            topic,
            context
        );
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date(),
                requestType: requestType,
                topic: topic
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode12-history',
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
     * Detect the type of comedy request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for joke request
        if (/\b(?:tell|give|share|hit|got|have|any|another|more|generate|create|write)\s+(?:me|us|a|some|your|one|few|the)?\s*(?:joke|jokes|funny|comedy|humor|humour|laugh|pun|puns|dad joke|one-liner|one liner)\b/i.test(normalizedInput)) {
            return "joke_request";
        }
        
        // Check for specific comedy style request
        for (const style in this.comedyStyles) {
            if (normalizedInput.includes(style.replace('_', ' ')) || normalizedInput.includes(this.comedyStyles[style].name.toLowerCase())) {
                return "style_specific_request";
            }
        }
        
        // Check for routine development request
        if (/\b(?:routine|set|standup|stand-up|stand up|bit|performance|show|act|material|skit)\b/i.test(normalizedInput) && 
            /\b(?:develop|build|create|write|structure|organize|plan|make|craft|help with)\b/i.test(normalizedInput)) {
            return "routine_development";
        }
        
        // Check for comedy writing advice
        if (/\b(?:how to|how do|tips|advice|suggest|help|guidance|teach|explain|insight)\b/i.test(normalizedInput) && 
            /\b(?:write|writing|create|craft|make|develop|comedy|joke|standup|humor|humour|funny)\b/i.test(normalizedInput)) {
            return "comedy_writing_advice";
        }
        
        // Check for humor analysis
        if (/\b(?:why|what makes|explain|analyze|analyse|breakdown|deconstruct|understand)\b/i.test(normalizedInput) && 
            /\b(?:funny|humor|humour|joke|comedy|comedic|laughing|laugh|amusing|amuse)\b/i.test(normalizedInput)) {
            return "humor_analysis";
        }
        
        // Check for comedian information
        if (/\b(?:who is|about|info|information about|tell me about|famous|best|top|greatest)\b/i.test(normalizedInput) && 
            /\b(?:comedian|comic|standup|stand-up|stand up|comedy|comedians)\b/i.test(normalizedInput)) {
            return "comedian_information";
        }
        
        // Default to general joke request
        return "joke_request";
    }
    
    /**
     * Extract a comedy topic from user input
     * @param {string} input - User input
     * @returns {string|null} Comedy topic or null
     */
    extractTopic(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for topic mentions
        const topicPatterns = [
            { regex: /\b(?:about|on|regarding|related to|on the topic of|having to do with)\s+([a-z]+(?:\s+[a-z]+)?)/i, group: 1 },
            { regex: /\b(?:joke|jokes|comedy|humor|material)\s+(?:about|on|regarding)\s+([a-z]+(?:\s+[a-z]+)?)/i, group: 1 }
        ];
        
        for (const pattern of topicPatterns) {
            const match = input.match(pattern.regex);
            if (match && match[pattern.group]) {
                const potentialTopic = match[pattern.group].trim().toLowerCase();
                
                // Check if it's one of our clean joke topics
                if (this.cleanJokeTopics.includes(potentialTopic)) {
                    return potentialTopic;
                }
                
                // If not, check if it's similar to one of our topics
                for (const topic of this.cleanJokeTopics) {
                    if (potentialTopic.includes(topic) || topic.includes(potentialTopic)) {
                        return topic;
                    }
                }
                
                // If it seems like a valid topic and not in avoided topics, return it
                if (potentialTopic.length > 2 && 
                    !/^(joke|jokes|funny|humor|comedy|about|something|anything|nothing|stuff|thing)$/i.test(potentialTopic) &&
                    !this.state.avoidedTopics.includes(potentialTopic)) {
                    return potentialTopic;
                }
            }
        }
        
        // Check for direct mentions of clean joke topics
        for (const topic of this.cleanJokeTopics) {
            const topicRegex = new RegExp(`\\b${topic}\\b`, 'i');
            if (topicRegex.test(normalizedInput) && !this.state.avoidedTopics.includes(topic)) {
                return topic;
            }
        }
        
        return null;
    }
    
    /**
     * Generate a comedy response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of comedy request
     * @param {string} topic - Comedy topic if available
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateComedyResponse(userInput, requestType, topic, context = {}) {
        // In a real implementation, this would call an AI model API specialized in comedy
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "joke_request":
                responseText = this.generateJoke(userInput, topic);
                break;
                
            case "style_specific_request":
                responseText = this.generateStyleSpecificComedy(userInput, topic);
                break;
                
            case "routine_development":
                responseText = this.developComedyRoutine(userInput, topic);
                break;
                
            case "comedy_writing_advice":
                responseText = this.provideComedyWritingAdvice(userInput);
                break;
                
            case "humor_analysis":
                responseText = this.analyzeHumor(userInput);
                break;
                
            case "comedian_information":
                responseText = this.provideComedianInformation(userInput);
                break;
                
            default:
                responseText = this.generateJoke(userInput, topic);
        }
        
        // Add disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate comedy suggestions
        const comedySuggestions = this.getComedySuggestions(requestType, topic);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            topic: topic,
            comedyStyle: this.state.comedyStyle,
            suggestions: comedySuggestions
        };
    }
    
    /**
     * Generate a joke based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Comedy topic if available
     * @returns {string} Generated joke
     */
    generateJoke(userInput, topic) {
        // Determine the appropriate comedy style
        let style = this.state.comedyStyle;
        if (userInput.toLowerCase().includes("one-liner") || userInput.toLowerCase().includes("one liner")) {
            style = "one_liner";
        } else if (userInput.toLowerCase().includes("story") || userInput.toLowerCase().includes("tell me about")) {
            style = "storytelling";
        } else if (userInput.toLowerCase().includes("self deprecating") || userInput.toLowerCase().includes("self-deprecating")) {
            style = "self_deprecating";
        }
        
        // Determine if a callback would be appropriate
        const useCallback = this.config.callbacksEnabled && 
                            this.state.lastPunchline && 
                            this.state.responseCount > 2 && 
                            Math.random() > 0.7; // 30% chance if conditions met
        
        return `# Comedy Creation: ${topic ? this.capitalizeFirstLetter(topic) + " Joke" : "Joke"} in ${this.comedyStyles[style].name} Style

In a complete implementation with an AI model and comedy expertise, I would create ${topic ? `a joke about ${topic}` : "a joke"} in the ${this.comedyStyles[style].name} style, using appropriate comedic structure and techniques.

## ${topic ? this.capitalizeFirstLetter(topic) + " Joke" : "Joke"}

${this.getJokeBasedOnStyle(style, topic, useCallback)}

## About This Joke

This joke utilizes:

- **Style**: ${this.comedyStyles[style].name}
  ${this.comedyStyles[style].description ? `  (${this.comedyStyles[style].description})` : ""}
  
- **Structure**: ${this.determineJokeStructure(style)}
  
- **Comedic Techniques**: 
  - ${this.getRandomComedyTechniques(2).join('\n  - ')}
  ${topic ? `  - Topical focus on ${topic}` : ""}
  ${useCallback ? "  - Callback to previous joke/conversation" : ""}

Would you like me to:
- Generate another joke in this style?
- Try a different comedy style?
- Create a joke about a specific topic?
- Explain how this type of joke works?`;
    }
    
    /**
     * Get a joke based on comedy style
     * @param {string} style - Comedy style
     * @param {string} topic - Comedy topic if available
     * @param {boolean} useCallback - Whether to use a callback
     * @returns {string} Joke based on style
     */
    getJokeBasedOnStyle(style, topic, useCallback) {
        // If we have sample jokes for this style, we'll base our response format on them
        if (this.sampleJokes[style]) {
            const styleSamples = this.sampleJokes[style];
            const sampleIndex = Math.floor(Math.random() * styleSamples.length);
            const sample = styleSamples[sampleIndex];
            
            // Create joke based on sample format
            if (style === "one_liner") {
                return `"In a complete implementation, I would generate an original one-liner ${topic ? `about ${topic}` : ""} here."\n\nExample of the style: "${sample.joke}"`;
            } else if (style === "storytelling") {
                return `"In a complete implementation, I would create an original funny story ${topic ? `about ${topic}` : ""} with multiple beats and a strong punchline."\n\nA storytelling joke follows this pattern:\n\n**Setup:** ${sample.setup}\n\n**Midpoint:** ${sample.midpoint}\n\n**Punchline:** ${sample.punchline}`;
            } else {
                // For setup-punchline style jokes
                let jokeText = `"In a complete implementation, I would generate an original ${this.comedyStyles[style].name} joke ${topic ? `about ${topic}` : ""} here."`;
                
                if (sample.setup && sample.punchline) {
                    jokeText += `\n\nExample of the style:\n\n"${sample.setup}\n\n${sample.punchline}"`;
                }
                
                // Add callback if enabled
                if (useCallback && this.state.lastPunchline) {
                    jokeText += `\n\n[Tag/Callback]: "And that reminds me of what we were talking about earlier... [reference to previous conversation]"`;
                }
                
                return jokeText;
            }
        } else {
            // Generic joke format if no samples for this style
            if (style === "observational" || style === "satirical") {
                return `"In a complete implementation, I would generate an original ${this.comedyStyles[style].name} joke ${topic ? `about ${topic}` : ""} here."\n\nThe joke would follow a pattern like:\n\n"Have you ever noticed [observation about ${topic || 'everyday life'}]? It's like [humorous insight that reveals absurdity]."\n\n${useCallback && this.state.lastPunchline ? `[Callback]: "Kind of like that thing we talked about earlier with [reference to previous conversation]."` : ""}`;
            } else if (style === "character") {
                return `"In a complete implementation, I would create a comedic character bit ${topic ? `about ${topic}` : ""} with a distinctive voice and perspective."\n\nThe joke would follow a pattern like:\n\n"[Character introduction and voice] When I [character-specific action related to ${topic || 'topic'}], I always [funny character behavior or perspective]."\n\n${useCallback && this.state.lastPunchline ? `[Callback as character]: "[Character's take on the previous conversation]"` : ""}`;
            } else {
                return `"In a complete implementation, I would generate an original ${this.comedyStyles[style].name} joke ${topic ? `about ${topic}` : ""} here."\n\nThe joke would follow the typical structure for this style, incorporating ${this.getRandomComedyTechniques(1)[0]} and ${this.getRandomComedyTechniques(1)[0]}.\n\n${useCallback && this.state.lastPunchline ? `It would also callback to our previous conversation about [reference to previous joke or topic].` : ""}`;
            }
        }
    }
    
    /**
     * Determine appropriate joke structure for a style
     * @param {string} style - Comedy style
     * @returns {string} Joke structure
     */
    determineJokeStructure(style) {
        switch (style) {
            case "one_liner":
                return "Brief one-liner format";
            case "storytelling":
                return "Extended narrative with setup, development, and punchline";
            case "observational":
                return "Observation followed by insight";
            case "self_deprecating":
                return "Personal anecdote with self-directed humor";
            case "satirical":
                return "Social criticism with ironic twist";
            case "absurdist":
                return "Logical setup with surreal conclusion";
            case "physical":
                return "Description of physical comedy scenario";
            case "character":
                return "First-person character perspective with distinctive voice";
            default:
                return "Setup and punchline structure";
        }
    }
    
    /**
     * Get random comedy techniques
     * @param {number} count - Number of techniques to get
     * @returns {Array<string>} Random comedy techniques
     */
    getRandomComedyTechniques(count) {
        const techniques = Object.values(this.comedyTechniques).map(tech => tech.name);
        const shuffled = [...techniques].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    /**
     * Generate style-specific comedy based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Comedy topic if available
     * @returns {string} Style-specific comedy
     */
    generateStyleSpecificComedy(userInput, topic) {
        // Extract the requested comedy style
        let style = this.state.comedyStyle;
        for (const key in this.comedyStyles) {
            if (userInput.toLowerCase().includes(key.replace('_', ' ')) || 
                userInput.toLowerCase().includes(this.comedyStyles[key].name.toLowerCase())) {
                style = key;
                break;
            }
        }
        
        // Update the user's style preference
        this.state.comedyStyle = style;
        this.savePreferences({ comedyStyle: style });
        
        const styleInfo = this.comedyStyles[style];
        
        return `# ${styleInfo.name} Comedy

In a complete implementation with an AI model and comedy expertise, I would create original ${styleInfo.name} comedy${topic ? ` about ${topic}` : ""}, incorporating the distinctive elements and techniques of this style.

## About ${styleInfo.name}

${styleInfo.description}

**Notable Practitioners**: ${styleInfo.examples.join(", ")}

**Typical Structure**: ${styleInfo.structure}

## Original ${styleInfo.name} Material${topic ? ` on ${this.capitalizeFirstLetter(topic)}` : ""}

"In a complete implementation, I would generate original ${styleInfo.name} comedy${topic ? ` about ${topic}` : ""} here."

The material would use these key techniques:
${styleInfo.techniques.map(technique => `- ${technique}`).join('\n')}

## Example of the Style

${this.getJokeBasedOnStyle(style, topic, false)}

## How to Develop This Style

If you want to create your own ${styleInfo.name}:

1. **Study the masters**: Watch or read ${styleInfo.examples.join(", ")}
2. **Focus on structure**: ${styleInfo.structure.split('→').join(' leading to ')}
3. **Practice the techniques**: ${styleInfo.techniques.slice(0, 2).join(', ')}
4. **Find your unique angle**: Develop your personal take on this style

Would you like to:
- See another example in this style?
- Learn about a different comedy style?
- Get tips on developing your own ${styleInfo.name} routine?
- Create comedy about a specific topic in this style?`;
    }
    
    /**
     * Develop a comedy routine based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Comedy topic if available
     * @returns {string} Comedy routine development
     */
    developComedyRoutine(userInput, topic) {
        // Extract the preferred style for the routine
        let style = this.state.comedyStyle;
        for (const key in this.comedyStyles) {
            if (userInput.toLowerCase().includes(key.replace('_', ' ')) || 
                userInput.toLowerCase().includes(this.comedyStyles[key].name.toLowerCase())) {
                style = key;
                break;
            }
        }
        
        const styleInfo = this.comedyStyles[style];
        
        return `# Standup Comedy Routine Development

In a complete implementation with an AI model and comedy expertise, I would help you develop a complete standup comedy routine${topic ? ` focused on ${topic}` : ""} in the ${styleInfo.name} style.

## Routine Structure

A well-crafted ${styleInfo.name} routine typically follows this structure:

### 1. Opening/Hook (1-2 minutes)
- Strong, punchy material to establish presence
- Introduction of your persona/perspective
- Quick laughs to build audience trust
${topic ? `- Brief introduction to the ${topic} theme` : ""}

### 2. Main Segments (3-5 minutes each)
- **Segment 1**: ${topic ? `${this.capitalizeFirstLetter(topic)} introduction - ` : ""}Establishing core premises
- **Segment 2**: ${topic ? `${this.capitalizeFirstLetter(topic)} exploration - ` : ""}Building on initial themes
- **Segment 3**: ${topic ? `${this.capitalizeFirstLetter(topic)} complications - ` : ""}Raising stakes or introducing twists

### 3. Callbacks and Connections
- References to earlier jokes
- Thematic threads that weave throughout
- Building on audience reactions

### 4. Strong Closer (1-2 minutes)
- Biggest laugh at the end
- Possible callback to opening
- Clear signal that you're finishing

## Content Development for ${topic ? `a ${this.capitalizeFirstLetter(topic)}` : "Your"} Routine

### Personal Perspective
- What's your unique take on ${topic || "your subject matter"}?
- What personal experiences can you draw from?
- How does your comedic persona approach this topic?

### Joke Types to Include
- **Observational**: "Have you noticed how ${topic || "things"} are..."
- **Act-outs**: Physically demonstrating scenarios
- **Tags**: Adding multiple punchlines to a single setup
- **Callbacks**: Referencing earlier jokes for compound laughs

### Writing Process
1. **Brainstorm**: Generate raw ideas and observations
2. **Structure**: Organize into a logical flow
3. **Punching up**: Add punchlines, tags, and act-outs
4. **Edit**: Trim unnecessary words, focus on clarity
5. **Test**: Try material in small settings before full performance

## Sample Material Outline

"In a complete implementation, I would provide specific joke premises and punchlines for a ${styleInfo.name} routine${topic ? ` about ${topic}` : ""}."

The routine would include:
- Opening one-liners to establish the theme
- Main segments with developed premises
- Tags and callbacks for maximum impact
- A strong closing bit

## Performance Tips

- **Pacing**: Maintain momentum; don't rush punchlines
- **Silence**: Allow pauses for laughs
- **Transitions**: Smooth movement between topics
- **Body language**: Enhance verbal jokes with physical elements
- **Audience work**: Respond to the room while staying on track

Would you like me to develop any specific section of this routine in more detail?`;
    }
    
    /**
     * Provide comedy writing advice based on user input
     * @param {string} userInput - User's input
     * @returns {string} Comedy writing advice
     */
    provideComedyWritingAdvice(userInput) {
        return `# Comedy Writing Guide

In a complete implementation with an AI model and comedy expertise, I would provide detailed advice on comedy writing techniques, structures, and practices to help you develop your comedic skills.

## Core Principles of Comedy Writing

### The Fundamentals

1. **Surprise + Recognition**: Effective jokes combine the unexpected with something the audience recognizes
2. **Specificity**: Precise details are funnier than generalities
3. **Economy of Language**: Only use the words necessary for the setup and punchline
4. **Point of View**: A clear perspective makes comedy more distinctive and memorable
5. **Truth**: The best comedy contains emotional or observational truth

### Comedy Structures

- **Setup → Punchline**: The classic joke structure that creates and then subverts expectations
- **Rule of 3**: Establish a pattern with two items, break it with the third
- **Callbacks**: Referencing earlier jokes for compounded humor
- **Tags**: Adding additional punchlines to an existing joke
- **Act-outs**: Physically demonstrating a scenario for enhanced effect
- **Misdirection**: Leading the audience one way, then surprising them

## Writing Process

### Idea Generation

- **Observation**: Note unusual, absurd, or interesting things in daily life
- **Personal Experience**: Draw from your own embarrassments, triumphs, and quirks
- **"What If"**: Explore hypothetical scenarios and their logical consequences
- **Juxtaposition**: Combine incongruous elements or concepts
- **Exaggeration**: Take a normal situation to an extreme

### Development

1. **First Draft**: Write freely without self-editing
2. **Identify the Funny**: Pinpoint exactly what makes something humorous
3. **Tighten Language**: Remove unnecessary words, clarify the setup
4. **Punch Up**: Make the punchline sharper, more surprising
5. **Add Tags**: Create additional punchlines that build on the joke
6. **Test and Revise**: Try material out loud, note reactions, refine

## Common Comedy Pitfalls

- **Explaining the joke**: Trust the audience to get it
- **Being too vague**: Specific details create better mental images
- **Punching down**: Target institutions, not vulnerable groups
- **Forcing edginess**: Shock without insight isn't effective comedy
- **Copying others**: Develop your unique voice and perspective
- **Fear of failure**: Comedy requires experimentation and risk

## Finding Your Comedy Voice

- What uniquely interests, annoys, or fascinates you?
- What comedy do you personally find funniest?
- What life experiences give you a distinctive perspective?
- What topics do you know well enough to find the unexpected angles?
- What tone feels most natural to you: silly, dry, energetic, deadpan?

Would you like specific exercises to develop your comedy writing skills, or would you prefer advice on a particular type of comedy writing?`;
    }
    
    /**
     * Analyze humor based on user input
     * @param {string} userInput - User's input
     * @returns {string} Humor analysis
     */
    analyzeHumor(userInput) {
        return `# The Anatomy of Humor

In a complete implementation with an AI model and comedy expertise, I would provide a detailed analysis of how humor works, including cognitive, social, and structural elements that make things funny.

## Why Things Are Funny: Core Theories

### Incongruity Theory
- Humor arises from the unexpected connection of disparate ideas
- The brain experiences pleasure in resolving the cognitive dissonance
- Example: "I entered what I thought was a dairy farm, but it was just a field of cows with an udder disregard for labels."

### Superiority Theory
- Laughter comes from a sense of triumph or superiority over others or our past selves
- Creates social bonding through shared judgment
- Example: Self-deprecating humor about past mistakes

### Relief Theory
- Humor releases built-up tension or stress
- Allows safe expression of taboo thoughts or feelings
- Example: Jokes during tense situations that break the emotional pressure

### Benign Violation Theory
- Something is funny when it violates expectations but in a benign, non-threatening way
- Walks the line between comfort and discomfort
- Example: Practical jokes that surprise but don't harm

## The Mechanics of a Joke

### Setup → Punchline Structure
- Setup creates an expectation or frame
- Punchline delivers a sudden shift in perspective (the "twist")
- The gap between expectation and reality creates the humor
- Example: "I'm on a seafood diet. I see food, and I eat it."

### Timing and Delivery
- Pause before the punchline builds anticipation
- Rhythm affects cognitive processing of humor
- Delivery style signals how to interpret the content

### The Element of Surprise
- Predictable jokes lose effectiveness
- The brain rewards novel, unexpected connections
- Multiple meanings and interpretations enhance humor

## Social Dimensions of Humor

### Shared Context
- Effective humor relies on common understanding
- Inside jokes create social bonding through exclusivity
- Cultural references signal group membership

### Status and Boundaries
- Humor can reinforce or challenge social hierarchies
- Self-deprecation demonstrates security and likability
- Direction of humor (up vs. down) affects reception

### Identity and Belonging
- Comedy often explores group identities and tensions
- Shared laughter creates psychological safety and connection
- Humor styles vary across cultures, generations, and subgroups

## Psychological Benefits of Humor

- **Cognitive flexibility**: Humor requires mental agility
- **Emotional regulation**: Laughter reduces stress hormones
- **Social bonding**: Shared humor builds trust and connection
- **Resilience**: Finding humor in difficulty builds coping skills
- **Perspective**: Comedy offers alternate viewpoints on problems

Would you like to explore any particular aspect of humor in more depth? Or would you prefer examples of specific comedy techniques and how they work?`;
    }
    
    /**
     * Provide information about comedians
     * @param {string} userInput - User's input
     * @returns {string} Comedian information
     */
    provideComedianInformation(userInput) {
        return `# Comedy and Comedians: An Overview

In a complete implementation with an AI model and comedy expertise, I would provide detailed information about specific comedians, comedy movements, and influential figures in standup comedy history.

## Evolution of Standup Comedy

### Early Foundations (1900s-1950s)
- **Vaudeville performers** developed timing and character work
- **Borscht Belt comics** refined joke-telling techniques
- **Radio comedians** learned to create humor without visual elements
- **Key figures**: Jack Benny, Bob Hope, Milton Berle

### The Comedy Revolution (1960s-1970s)
- **Shift to personal perspective** and social commentary
- **Breaking taboos** and discussing previously forbidden topics
- **Counterculture influence** brought authenticity and edge
- **Key figures**: Lenny Bruce, Richard Pryor, George Carlin

### Comedy Boom (1980s-1990s)
- **Comedy club explosion** created more opportunities
- **Observational comedy** became the dominant form
- **Sitcom crossover stars** brought standup to mainstream
- **Key figures**: Jerry Seinfeld, Robin Williams, Eddie Murphy

### Alternative Comedy (1990s-2000s)
- **Rejection of conventional joke structures**
- **Emphasis on originality** over broad appeal
- **Blurring of comedy and performance art**
- **Key figures**: Patton Oswalt, Maria Bamford, Mitch Hedberg

### Digital Age Comedy (2010s-Present)
- **Social media** creates direct connection with audiences
- **Streaming specials** bypass traditional gatekeepers
- **Podcast explosion** offers long-form comedy platforms
- **Key figures**: Hannah Gadsby, Bo Burnham, Ali Wong

## Influential Comedy Styles

### Observational Comedy
- **Focus**: Finding humor in everyday situations and behaviors
- **Structure**: Setup highlighting something familiar → Insight revealing absurdity
- **Notable practitioners**: Jerry Seinfeld, Jim Gaffigan, Ellen DeGeneres

### Character-Driven Comedy
- **Focus**: Creating distinct personas with unique perspectives
- **Structure**: Staying in character while commenting on various topics
- **Notable practitioners**: Andy Kaufman, Sacha Baron Cohen, Kate McKinnon

### Storytelling Comedy
- **Focus**: Extended narratives with multiple laugh points
- **Structure**: Engaging setup → Escalating situations → Satisfying conclusion
- **Notable practitioners**: Mike Birbiglia, Hannah Gadsby, John Mulaney

### Political/Social Commentary
- **Focus**: Using humor to address serious issues
- **Structure**: Identifying absurdity in systems → Satirical takedown
- **Notable practitioners**: George Carlin, Dave Chappelle, Jon Stewart

## What Makes a Great Comedian

- **Distinctive point of view** that offers fresh perspective
- **Mastery of timing** and audience management
- **Authenticity** that creates connection with audience
- **Consistent evolution** of material and approach
- **Technical skill** in writing and performing
- **Influence** on other comedians and comedy trends

Would you like information about a specific comedian, comedy style, or era of standup comedy?`;
    }
    
    /**
     * Get comedy suggestions based on user interaction
     * @param {string} requestType - Type of comedy request
     * @param {string} topic - Comedy topic if available
     * @returns {Array<string>} Comedy suggestions
     */
    getComedySuggestions(requestType, topic) {
        const suggestions = [];
        
        // Add type-specific suggestions
        if (requestType === "joke_request") {
            suggestions.push(topic ? `Tell me another joke about ${topic}` : "Tell me a joke about technology");
            suggestions.push("Give me your best one-liner");
            suggestions.push("Share a funny story");
        } else if (requestType === "style_specific_request") {
            suggestions.push("Write some observational comedy");
            suggestions.push("Tell me a self-deprecating joke");
            suggestions.push("Create an absurdist joke");
        } else if (requestType === "routine_development") {
            suggestions.push("How do I structure an opening for my standup routine?");
            suggestions.push("Help me develop callbacks in my comedy");
            suggestions.push("How long should my first standup set be?");
        } else if (requestType === "comedy_writing_advice") {
            suggestions.push("What makes a good punchline?");
            suggestions.push("How do I find my comedy voice?");
            suggestions.push("Tips for writing funnier jokes");
        } else if (requestType === "humor_analysis") {
            suggestions.push("Why do puns make people groan?");
            suggestions.push("What's the psychology behind comedy?");
            suggestions.push("Why do different people find different things funny?");
        } else if (requestType === "comedian_information") {
            suggestions.push("Who are the most influential standup comedians?");
            suggestions.push("Tell me about observational comedy");
            suggestions.push("What's the history of standup comedy?");
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "Tell me a dad joke",
                "Write a joke about everyday annoyances",
                "What's the difference between satire and parody?",
                "How can I use humor in presentations?",
                "Give me a funny response to 'How are you?'",
                "How do comedians deal with hecklers?",
                "Tell me a clean joke for a work event"
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
     * Utility function to capitalize first letter
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalizeFirstLetter(str) {
        if (!str) return '';
        return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
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
                'jaat-mode12-preferences',
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
            localStorage.removeItem('jaat-mode12-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Save a joke
     * @param {Object} joke - Joke to save
     * @returns {boolean} Success status
     */
    saveJoke(joke) {
        if (!joke) return false;
        
        // Add joke to saved jokes
        this.state.jokes.push({
            ...joke,
            savedAt: new Date().toISOString()
        });
        
        // Save updated jokes
        this.savePreferences({ jokes: this.state.jokes });
        return true;
    }
    
    /**
     * Set comedy style preference
     * @param {string} style - Comedy style
     * @returns {boolean} Success status
     */
    setComedyStyle(style) {
        if (!style) return false;
        
        // Set comedy style
        this.state.comedyStyle = style;
        
        // Save updated comedy style
        this.savePreferences({ comedyStyle: style });
        return true;
    }
    
    /**
     * Set tone preference
     * @param {string} tone - Tone preference
     * @returns {boolean} Success status
     */
    setTonePreference(tone) {
        if (!tone) return false;
        
        // Set tone preference
        this.state.tonePreference = tone;
        
        // Save updated tone preference
        this.savePreferences({ tonePreference: tone });
        return true;
    }
    
    /**
     * Add topic to avoid
     * @param {string} topic - Topic to avoid
     * @returns {boolean} Success status
     */
    addAvoidedTopic(topic) {
        if (!topic || this.state.avoidedTopics.includes(topic)) return false;
        
        // Add topic to avoided topics
        this.state.avoidedTopics.push(topic);
        
        // Save updated avoided topics
        this.savePreferences({ avoidedTopics: this.state.avoidedTopics });
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
            comedyStyle: this.state.comedyStyle,
            tonePreference: this.state.tonePreference,
            jokeCount: this.state.jokes.length,
            comedyTopics: this.state.comedyTopics,
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
    window.jaatAIModes.standupComic = new StandupComicMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StandupComicMode;
}
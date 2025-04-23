/**
 * JAAT-AI Dream Interpreter Mode
 * AI mode specialized in dream analysis, symbolism, and psychological insights
 * Mode ID: 15
 */

class DreamInterpreterMode {
    constructor() {
        // Mode metadata
        this.id = "15";
        this.name = "Dream Interpreter";
        this.description = "Your AI guide to understanding dreams, symbolism, and their psychological meanings";
        this.icon = "ri-cloudy-line";
        this.color = "#8b5cf6"; // Purple color
        this.category = "psychology";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 3000,
            responseSpeed: "moderate", // fast, moderate, detailed
            personalityLevel: 6, // 1-10 scale (higher = more personality)
            creativityLevel: 8, // 1-10 scale
            formalityLevel: 4, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            interpretationDepthEnabled: true,
            symbolismAnalysisEnabled: true,
            psychologicalInsightsEnabled: true
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            dreamJournal: [], // Store past dreams and interpretations
            recurrentSymbols: {}, // Track frequency of symbols in user's dreams
            interpretationApproach: "balanced", // jungian, freudian, contemporary, spiritual, balanced
            personalSymbols: {}, // User's personal associations with symbols
            dreamPatterns: [], // Observed patterns in user's dreams
            dreamThemes: [], // Common themes detected in user's dreams
            sessionStartTime: new Date(),
            responseCount: 0
        };
        
        // Common dream symbols and their interpretations
        this.dreamSymbols = {
            // Elements and Nature
            "water": {
                general: "Emotions, unconscious mind, transition, renewal",
                calm: "Emotional stability, clarity of feeling, inner peace",
                rough: "Emotional turbulence, overwhelm, unprocessed feelings",
                deep: "Depth of emotion, the unknown aspects of self, mystery",
                shallow: "Superficial emotions, avoidance of deeper feelings"
            },
            "fire": {
                general: "Transformation, passion, anger, destruction, purification",
                controlled: "Productive passion, creative drive, inspired action",
                out_of_control: "Overwhelming emotions, destructive tendencies, fear",
                warming: "Comfort, protection, emotional renewal",
                burning: "Purification, intense transformation, anger or rage"
            },
            "earth": {
                general: "Stability, groundedness, fertility, material concerns",
                fertile: "Growth potential, nurturing environment, abundance",
                barren: "Stagnation, lack of inspiration, emotional emptiness",
                mountain: "Achievement, obstacles to overcome, perspective",
                cave: "Introspection, hidden aspects of self, retreat"
            },
            "air": {
                general: "Intellect, communication, freedom, thought processes",
                clear: "Mental clarity, open communication, unobstructed thought",
                foggy: "Confusion, lack of direction, uncertainty",
                windy: "Forces of change, transition, unsettled mind",
                still: "Stagnant thoughts, pause in communication, waiting"
            },
            
            // Animals
            "snake": {
                general: "Transformation, healing, knowledge, temptation, fear",
                shedding_skin: "Personal transformation, renewal, growth",
                biting: "Betrayal, fear, warning about a toxic situation",
                multiple: "Multiple challenges or changes, complex transformation"
            },
            "bird": {
                general: "Freedom, perspective, spirituality, aspirations",
                flying: "Liberation, transcendence, overcoming limitations",
                caged: "Feeling trapped, restricted potential, limited expression",
                flock: "Community, belonging, collective wisdom",
                predatory: "Power, dominance, aggression, penetrating insight"
            },
            "dog": {
                general: "Loyalty, friendship, protection, unconditional love",
                friendly: "Loyal relationships, trusting connections",
                aggressive: "Feeling threatened, betrayal, anger",
                lost: "Loss of connection, seeking fidelity or friendship"
            },
            "cat": {
                general: "Independence, mystery, intuition, femininity",
                friendly: "Comfort with independence, intuitive connection",
                aggressive: "Fear of the feminine or intuitive, hidden aggression",
                wild: "Untamed aspects of self, primal instincts"
            },
            
            // People
            "stranger": {
                general: "Unknown aspects of self, unrecognized qualities, potential",
                threatening: "Fear of the unknown, unacknowledged shadow aspects",
                friendly: "Welcoming new aspects of self, openness to change",
                familiar: "Qualities you recognize but haven't integrated"
            },
            "child": {
                general: "Innocence, vulnerability, potential, new beginnings",
                happy: "Contentment with inner child, joyful potential",
                distressed: "Wounded inner child, unresolved early experiences",
                lost: "Disconnection from innocence or joy, searching for simplicity"
            },
            "parent": {
                general: "Authority, guidance, nurturing, rules, protection",
                loving: "Supportive internal guidance, healthy relationship with authority",
                absent: "Lack of guidance, feeling abandoned, seeking direction",
                critical: "Self-judgment, harsh inner critic, perfectionism"
            },
            "partner": {
                general: "Balance, integration, relationship dynamics, anima/animus",
                loving: "Harmony with opposite-sex energy, balanced relationships",
                conflicted: "Inner tension, imbalanced relationships, unresolved issues",
                unknown: "Seeking relationship, unknown potentials, mystery"
            },
            
            // Places
            "house": {
                general: "The self, mind, psyche, personal space",
                new_rooms: "Discovering new aspects of self, untapped potential",
                childhood_home: "Past influences, foundational experiences, origins",
                damaged: "Psychological wounds, vulnerability, need for repair",
                under_construction: "Self-improvement, growth, transformation process"
            },
            "school": {
                general: "Learning, development, social evaluation, formative experiences",
                test_unprepared: "Feeling inadequate, fear of failure, performance anxiety",
                reunion: "Reflection on personal growth, revisiting past identities",
                lost_in: "Seeking direction, confusion about life path"
            },
            "work": {
                general: "Productivity, ambition, identity, life purpose",
                successful: "Confidence in abilities, satisfaction with life direction",
                failure: "Fear of inadequacy, concern about personal value",
                new_job: "Life transitions, new aspects of identity, fresh start"
            },
            "vehicle": {
                general: "Life direction, control, personal journey",
                out_of_control: "Feeling powerless, uncertainty about life direction",
                stalled: "Feeling stuck, thwarted ambitions, paused progress",
                smooth_journey: "Satisfaction with life path, feeling in control",
                public_transport: "Following collective paths, shared journey"
            },
            
            // Situations
            "falling": {
                general: "Loss of control, insecurity, failure, surrender",
                endless: "Deep fear, overwhelming anxiety, no sense of security",
                with_landing: "Facing and surviving fears, finding foundation",
                flying_then_falling: "Overambition followed by reality check"
            },
            "flying": {
                general: "Freedom, transcendence, escape, perspective, spiritual aspiration",
                effortless: "Liberation, reaching potential, spiritual alignment",
                struggling: "Striving for freedom, overcoming limitations with effort",
                too_high: "Disconnect from groundedness, unrealistic aspirations"
            },
            "chase": {
                general: "Avoidance, fear, unresolved issues pursuing you",
                unable_to_run: "Feeling paralyzed by fear, inevitable confrontation",
                escaping: "Successfully addressing or postponing a threatening issue",
                being_the_chaser: "Pursuit of elusive goal, determination"
            },
            "naked": {
                general: "Vulnerability, exposure, authenticity, fear of judgment",
                embarrassed: "Insecurity, fear of being seen for who you truly are",
                unnoticed: "Fear unfounded, acceptance of true self by others",
                comfortable: "Self-acceptance, comfort with vulnerability"
            },
            
            // Objects
            "door": {
                general: "Opportunity, transition, new possibilities, access",
                locked: "Blocked opportunities, withheld secrets, restricted access",
                open: "Welcoming change, accessible opportunities, readiness",
                hidden: "Unconscious possibilities, overlooked options"
            },
            "key": {
                general: "Access, solution, knowledge, opportunity, control",
                finding: "Discovering solutions, gaining access to understanding",
                losing: "Missed opportunities, lack of access, frustration",
                broken: "Inadequate solutions, partial understanding"
            },
            "money": {
                general: "Value, self-worth, energy exchange, power",
                abundance: "Feeling valued, empowered, resourceful",
                losing: "Fear of losing value or power, insecurity",
                finding: "Discovering personal resources, unexpected value"
            },
            "food": {
                general: "Nourishment, pleasure, consumption, basic needs",
                delicious: "Satisfaction, pleasure in meeting needs, fulfillment",
                rotten: "Neglected needs, harmful influences, things past their time",
                sharing: "Connection, nurturing relationships, community"
            }
        };
        
        // Dream themes and their psychological significance
        this.dreamThemes = {
            "being_chased": {
                theme: "Being Chased",
                significance: "Avoidance of threatening issues, feeling pursued by unresolved problems",
                questions: [
                    "What are you running from in waking life?",
                    "What responsibilities or emotions are you avoiding?",
                    "What would happen if you stopped running and faced the pursuer?"
                ]
            },
            "falling": {
                theme: "Falling",
                significance: "Insecurity, lack of support, anxiety about failure, loss of control",
                questions: [
                    "Where in your life do you feel unsupported?",
                    "What makes you feel like you're losing control?",
                    "What are you afraid of failing at?"
                ]
            },
            "flying": {
                theme: "Flying",
                significance: "Freedom, transcending limitations, gaining new perspective, escape",
                questions: [
                    "What limitations are you trying to overcome?",
                    "What would you like to rise above or see from a new perspective?",
                    "What feeling of freedom are you seeking in your life?"
                ]
            },
            "nudity": {
                theme: "Public Nudity or Exposure",
                significance: "Vulnerability, authenticity, fear of being exposed or judged",
                questions: [
                    "What are you afraid of others discovering about you?",
                    "In what situations do you feel most vulnerable?",
                    "What parts of yourself are you trying to hide?"
                ]
            },
            "unprepared_test": {
                theme: "Being Unprepared for a Test",
                significance: "Fear of failure, feeling unprepared for challenges, performance anxiety",
                questions: [
                    "What upcoming challenges do you feel unprepared for?",
                    "Where are you putting pressure on yourself to perform?",
                    "What resources would help you feel more prepared?"
                ]
            },
            "teeth_falling": {
                theme: "Teeth Falling Out",
                significance: "Insecurity about appearance, fear of embarrassment, concern about communication",
                questions: [
                    "How do you feel about how you present yourself to others?",
                    "Are you concerned about saying the wrong thing?",
                    "What makes you feel powerless in your self-expression?"
                ]
            },
            "searching": {
                theme: "Searching for Something",
                significance: "Unmet needs, seeking fulfillment, quest for identity or purpose",
                questions: [
                    "What do you feel is missing in your life?",
                    "What are you searching for in your waking life?",
                    "What need remains unfulfilled?"
                ]
            },
            "trapped": {
                theme: "Being Trapped or Confined",
                significance: "Feeling restricted, limited choices, desire for liberation",
                questions: [
                    "Where in your life do you feel constrained?",
                    "What is preventing you from moving forward?",
                    "What would liberation look like for you?"
                ]
            },
            "death": {
                theme: "Death or Dying",
                significance: "Transition, end of a phase, transformation, fear of loss",
                questions: [
                    "What significant changes are occurring in your life?",
                    "What are you letting go of or what is coming to an end?",
                    "What new beginning might follow this ending?"
                ]
            },
            "water": {
                theme: "Water and Drowning",
                significance: "Emotional state, overwhelm, depth of feeling, unconscious forces",
                questions: [
                    "What emotions might be overwhelming you?",
                    "How are you handling the emotional currents in your life?",
                    "What unconscious influences might be affecting you?"
                ]
            }
        };
        
        // Interpretation frameworks (different psychological approaches)
        this.interpretationFrameworks = {
            "freudian": {
                name: "Freudian Analysis",
                focus: "Unconscious desires, repressed sexuality, childhood influences",
                approach: "Focuses on how dreams represent wish fulfillment and repressed desires, particularly those of a sexual or aggressive nature. Dreams are seen as disguised expressions of unacceptable impulses.",
                key_concepts: [
                    "Manifest content: The literal dream narrative",
                    "Latent content: The hidden symbolic meaning",
                    "Dreamwork: The process of disguising unacceptable wishes",
                    "Id, ego, and superego dynamics"
                ]
            },
            "jungian": {
                name: "Jungian Analysis",
                focus: "Archetypes, collective unconscious, individuation process",
                approach: "Interprets dreams as messages from the unconscious mind, using universal archetypes and personal symbols. Dreams are viewed as compensatory, providing what the conscious mind lacks.",
                key_concepts: [
                    "Archetypes: Universal symbols and patterns",
                    "Shadow: The unknown or rejected aspects of ourselves",
                    "Anima/Animus: The feminine/masculine aspects within each person",
                    "The Self: The central archetype of wholeness and integration"
                ]
            },
            "existential": {
                name: "Existential Analysis",
                focus: "Meaning, authenticity, life choices, existence themes",
                approach: "Looks at how dreams reflect our core concerns about existence, including death, freedom, isolation, and meaning. Dreams reveal our authentic being beyond social personas.",
                key_concepts: [
                    "Authenticity vs. inauthenticity",
                    "Freedom and responsibility",
                    "Existential isolation and connection",
                    "Search for meaning and purpose"
                ]
            },
            "cognitive": {
                name: "Cognitive Analysis",
                focus: "Problem-solving, memory consolidation, emotional processing",
                approach: "Views dreams as the brain's way of processing information, consolidating memories, and working through emotional issues. Dreams reflect ongoing cognitive processes.",
                key_concepts: [
                    "Memory integration",
                    "Emotional regulation and processing",
                    "Problem-solving rehearsal",
                    "Neural network activation patterns"
                ]
            },
            "spiritual": {
                name: "Spiritual Analysis",
                focus: "Divine messages, soul journey, higher consciousness, guidance",
                approach: "Considers dreams as potential messages from higher consciousness or spiritual entities. Dreams may contain guidance, prophetic elements, or spiritual lessons.",
                key_concepts: [
                    "Divine communication",
                    "Higher self guidance",
                    "Soul purpose and lessons",
                    "Transcendent experiences and insights"
                ]
            }
        };
        
        // Lucid dreaming techniques
        this.lucidDreamingTechniques = {
            "reality_testing": {
                name: "Reality Testing",
                description: "Regularly questioning whether you are dreaming during waking hours, which can carry over into dreams.",
                steps: [
                    "Several times daily, ask yourself 'Am I dreaming?'",
                    "Look for inconsistencies or impossibilities in your environment",
                    "Test reality by trying to push your finger through your palm or checking a text/clock twice",
                    "Make this a consistent habit for best results"
                ]
            },
            "mnemonic_induction": {
                name: "Mnemonic Induction of Lucid Dreams (MILD)",
                description: "Programming your mind to recognize when you're dreaming by setting an intention before sleep.",
                steps: [
                    "As you fall asleep, repeat 'I will remember I'm dreaming'",
                    "Visualize yourself becoming lucid in a recent dream",
                    "Imagine what you will do once lucid",
                    "Continue until you fall asleep with this intention"
                ]
            },
            "wake_back_to_bed": {
                name: "Wake Back to Bed (WBTB)",
                description: "Waking up during peak REM sleep periods and then returning to sleep to increase lucid dream likelihood.",
                steps: [
                    "Set an alarm for 5-6 hours after falling asleep",
                    "Stay awake for 10-60 minutes, focusing on lucid dreaming intention",
                    "Return to sleep while maintaining awareness",
                    "Often combined with other techniques like MILD"
                ]
            },
            "dream_journaling": {
                name: "Dream Journaling",
                description: "Recording dreams immediately upon waking to improve dream recall and recognize dream patterns.",
                steps: [
                    "Keep a journal by your bed",
                    "Write dreams immediately upon waking, before they fade",
                    "Note recurring symbols, locations, or themes",
                    "Review your journal regularly to identify dream signs"
                ]
            },
            "meditation": {
                name: "Meditation",
                description: "Practicing mindfulness to improve awareness that carries over into dreams.",
                steps: [
                    "Develop a regular meditation practice focusing on awareness",
                    "Practice mindfulness throughout the day",
                    "Before sleep, meditate to maintain awareness as you drift off",
                    "Maintain a calm, focused attention on the present moment"
                ]
            }
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "What does it mean to dream about flying?",
            "Interpret my dream about being chased",
            "Why do I keep dreaming about water?",
            "What do teeth falling out in dreams symbolize?",
            "Help me understand why I had a dream about my childhood home",
            "What's the meaning of dreaming about someone who died?",
            "Interpret dreams about being unprepared for a test",
            "What does it mean when I dream about my ex?",
            "How can I remember my dreams better?",
            "Techniques for lucid dreaming"
        ];
        
        // Special features
        this.features = {
            dreamInterpretation: true,
            symbolAnalysis: true,
            themeIdentification: true,
            patternRecognition: true,
            psychologicalInsights: true,
            personalSymbolTracking: true,
            dreamJournaling: true,
            lucidDreamingGuidance: true,
            recurringDreamAnalysis: true,
            multipleInterpretationFrameworks: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 50,
            DISCLAIMER: "Dream interpretations are subjective and should be considered as possibilities rather than definitive explanations. For recurring or disturbing dreams that cause distress, please consider consulting with a qualified mental health professional.",
            GREETING_PHRASES: [
                "Welcome to the realm of dreams. What visions would you like to explore today?",
                "Dreams hold the keys to our inner worlds. Which dream are we interpreting today?",
                "The unconscious speaks through our dreams. What has it shown you recently?",
                "Every dream is a personal message. What dream imagery can I help you understand?",
                "Dreams bridge our conscious and unconscious mind. What dream has captured your curiosity?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Dream Interpreter mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set interpretation approach if provided
        if (options.interpretationApproach) {
            this.state.interpretationApproach = options.interpretationApproach;
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode15-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Dream Interpreter mode");
                
                // Load interpretation approach if saved
                if (this.state.userPreferences.interpretationApproach) {
                    this.state.interpretationApproach = this.state.userPreferences.interpretationApproach;
                }
                
                // Load dream journal if saved
                if (this.state.userPreferences.dreamJournal) {
                    this.state.dreamJournal = this.state.userPreferences.dreamJournal;
                }
                
                // Load recurrent symbols if saved
                if (this.state.userPreferences.recurrentSymbols) {
                    this.state.recurrentSymbols = this.state.userPreferences.recurrentSymbols;
                }
                
                // Load personal symbols if saved
                if (this.state.userPreferences.personalSymbols) {
                    this.state.personalSymbols = this.state.userPreferences.personalSymbols;
                }
                
                // Load dream patterns if saved
                if (this.state.userPreferences.dreamPatterns) {
                    this.state.dreamPatterns = this.state.userPreferences.dreamPatterns;
                }
                
                // Load dream themes if saved
                if (this.state.userPreferences.dreamThemes) {
                    this.state.dreamThemes = this.state.userPreferences.dreamThemes;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode15-history');
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
        
        console.log(`Dream Interpreter mode initialized with ${this.state.interpretationApproach} approach`);
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
     * Process user input and generate a dream interpretation response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with dream interpretation
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your dream interpretation assistant. I can help analyze your dreams, explain dream symbols, identify patterns, and offer insights into the possible meanings of your dreams. What dream would you like to explore today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing dream interpretation request`);
        
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
        
        // Detect type of dream interpretation request
        const requestType = this.detectRequestType(userInput);
        
        // Generate appropriate dream interpretation response
        const response = await this.generateDreamResponse(
            userInput, 
            requestType, 
            context
        );
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date(),
                requestType: requestType
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode15-history',
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
     * Detect the type of dream interpretation request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for dream interpretation request
        if (/\b(?:dream|dreamed|dreamt|nightmare|vision|sleep)\b.*?\b(?:about|of|that|where|when)\b/i.test(normalizedInput) ||
            /\b(?:interpret|analyze|understand|explain|decode|meaning of)\b.*?\b(?:dream|dreams|nightmare)\b/i.test(normalizedInput)) {
            return "interpretation";
        }
        
        // Check for symbol meaning request
        if (/\b(?:what|why|how)\b.*?\b(?:does|do|is|are|means|symbols?|symbolize|represent)\b/i.test(normalizedInput) ||
            /\b(?:meaning|symbolism|representation|significance)\b.*?\b(?:of|in|when)\b/i.test(normalizedInput)) {
            return "symbol";
        }
        
        // Check for recurring dream request
        if (/\b(?:recurring|repeated|repetitive|keep|always|constantly|continually)\b.*?\b(?:dream|dreams|dreaming|nightmares)\b/i.test(normalizedInput)) {
            return "recurring";
        }
        
        // Check for lucid dreaming request
        if (/\b(?:lucid|aware|control|conscious)\b.*?\b(?:dream|dreams|dreaming)\b/i.test(normalizedInput) ||
            /\b(?:how to|techniques for|tips for|guide to|advice on)\b.*?\b(?:lucid dreaming|dream control)\b/i.test(normalizedInput)) {
            return "lucid";
        }
        
        // Check for dream recall request
        if (/\b(?:remember|recall|memorize|retention|capture|record|journal)\b.*?\b(?:dream|dreams|dreaming)\b/i.test(normalizedInput) ||
            /\b(?:forgetting|forgot|can't remember|don't remember)\b.*?\b(?:dream|dreams|dreaming)\b/i.test(normalizedInput)) {
            return "recall";
        }
        
        // Check for nightmare help request
        if (/\b(?:nightmare|scary|frightening|terrifying|bad|disturbing|anxiety|stress|fearful)\b.*?\b(?:dream|dreams|dreaming)\b/i.test(normalizedInput) ||
            /\b(?:stop|prevent|avoid|cope with|deal with|handle)\b.*?\b(?:nightmare|nightmares|bad dreams)\b/i.test(normalizedInput)) {
            return "nightmare";
        }
        
        // Check for psychological meaning request
        if (/\b(?:psychological|mental|emotional|subconscious|unconscious|psyche|mind|therapy|psychology)\b.*?\b(?:meaning|explanation|insight|interpretation|analysis)\b/i.test(normalizedInput)) {
            return "psychological";
        }
        
        // Check for dream journaling request
        if (/\b(?:journal|diary|log|record|track|document|write down)\b.*?\b(?:dream|dreams|dreaming)\b/i.test(normalizedInput)) {
            return "journaling";
        }
        
        // Default to general dream question
        return "general";
    }
    
    /**
     * Generate a dream interpretation response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of dream request
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateDreamResponse(userInput, requestType, context = {}) {
        // In a real implementation, this would call an AI model API specialized in dream interpretation
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "interpretation":
                responseText = this.interpretDream(userInput);
                break;
                
            case "symbol":
                responseText = this.explainSymbol(userInput);
                break;
                
            case "recurring":
                responseText = this.analyzeRecurringDream(userInput);
                break;
                
            case "lucid":
                responseText = this.provideLucidDreamingTips(userInput);
                break;
                
            case "recall":
                responseText = this.improveDreamRecall(userInput);
                break;
                
            case "nightmare":
                responseText = this.addressNightmares(userInput);
                break;
                
            case "psychological":
                responseText = this.providePsychologicalInsight(userInput);
                break;
                
            case "journaling":
                responseText = this.suggestDreamJournaling(userInput);
                break;
                
            default:
                responseText = this.provideGeneralDreamGuidance(userInput);
        }
        
        // Add disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate dream interpretation suggestions
        const dreamSuggestions = this.getDreamSuggestions(requestType);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            interpretationApproach: this.state.interpretationApproach,
            suggestions: dreamSuggestions
        };
    }
    
    /**
     * Interpret a dream based on user input
     * @param {string} userInput - User's input about their dream
     * @returns {string} Dream interpretation
     */
    interpretDream(userInput) {
        // Extract dream narrative
        const dreamNarrative = this.extractDreamNarrative(userInput);
        
        // If no clear dream narrative, provide a general response
        if (!dreamNarrative) {
            return `# Dream Interpretation

In a complete implementation with an AI model and dream analysis expertise, I would interpret your specific dream based on psychological principles, symbolism, and personal context.

For me to provide a meaningful interpretation, please share your dream in detail. Include:

- The setting and environment
- People, animals, or beings present
- Actions and events that occurred
- Objects and symbols that appeared
- Emotions you felt during the dream
- Any unusual or particularly vivid elements

The more details you provide, the more comprehensive the interpretation can be. Dream interpretation is most valuable when considering your personal associations with symbols, ongoing life circumstances, and emotional responses.

Would you like to share your dream narrative for interpretation?`;
        }
        
        // Extract key symbols and themes from the dream
        const symbols = this.extractSymbolsFromDream(dreamNarrative);
        const themes = this.identifyDreamThemes(dreamNarrative);
        
        // Store the dream in the journal
        this.addDreamToJournal(dreamNarrative, symbols, themes);
        
        return `# Dream Interpretation

In a complete implementation with an AI model and dream analysis expertise, I would provide a detailed interpretation of your dream, identifying patterns, analyzing symbols, and offering psychological insights tailored to your personal context.

## Dream Analysis

Based on the dream you've shared, here's an interpretation through a ${this.state.interpretationApproach} psychological lens:

### Key Symbols

${symbols.length > 0 ? 
    symbols.map(symbol => `- **${this.capitalizeFirstLetter(symbol)}**: ${this.getSymbolMeaning(symbol)}`).join('\n') : 
    "In a complete implementation, I would identify and analyze specific symbols from your dream narrative."}

### Possible Themes

${themes.length > 0 ? 
    themes.map(theme => `- **${this.dreamThemes[theme].theme}**: ${this.dreamThemes[theme].significance}`).join('\n') : 
    "In a complete implementation, I would identify underlying psychological themes in your dream."}

## Personal Context

Dreams are highly personal and their meaning is enhanced by understanding your:
- Current life circumstances
- Ongoing concerns and challenges
- Recent significant events
- Emotional state before sleeping

## Reflective Questions

Consider these questions to deepen your understanding of the dream:

${themes.length > 0 ? 
    themes.flatMap(theme => this.dreamThemes[theme].questions).slice(0, 3).map(q => `- ${q}`).join('\n') : 
    "- What emotions were strongest in the dream?\n- What elements of the dream reflect your current life?\n- What might your unconscious mind be trying to communicate?"}

## Alternative Perspectives

Different psychological approaches might interpret this dream in various ways:

- **Freudian**: Would focus on hidden desires and repressed emotions
- **Jungian**: Would explore archetypal symbols and the collective unconscious
- **Cognitive**: Would consider how the dream processes daily experiences and emotions

Remember that the most meaningful interpretation is one that resonates with you personally. What aspects of this analysis feel most relevant to your life?`;
    }
    
    /**
     * Extract the dream narrative from user input
     * @param {string} input - User input
     * @returns {string|null} Dream narrative or null
     */
    extractDreamNarrative(input) {
        // Look for common dream description patterns
        const dreamPatterns = [
            { regex: /\b(?:i\s+(?:dreamed|dreamt|had\s+a\s+dream))\s+(?:about|that|where|of|when)\s+(.+)$/i, group: 1 },
            { regex: /\b(?:in\s+my\s+dream(?:,|\s+I|\s+there)?)\s+(.+)$/i, group: 1 },
            { regex: /\b(?:last\s+night\s+I\s+(?:dreamed|dreamt|had\s+a\s+dream))\s+(.+)$/i, group: 1 },
            { regex: /\b(?:I\s+was\s+dreaming\s+(?:about|that|of))\s+(.+)$/i, group: 1 },
            { regex: /\b(?:can\s+you\s+interpret\s+this\s+dream[:\s]+)\s*(.+)$/i, group: 1 },
            { regex: /\b(?:what\s+does\s+it\s+mean\s+(?:if|when)\s+I\s+dream\s+(?:about|that|of))\s+(.+)$/i, group: 1 }
        ];
        
        for (const pattern of dreamPatterns) {
            const match = input.match(pattern.regex);
            if (match && match[pattern.group] && match[pattern.group].length > 10) {
                return match[pattern.group].trim();
            }
        }
        
        // If the input is lengthy, assume it's a dream description
        if (input.length > 50 && /\b(?:dream|dreamt|dreamed|nightmare|sleep)\b/i.test(input)) {
            // Try to extract just the dream part, not the questions about it
            const parts = input.split(/\?|\./);
            for (const part of parts) {
                if (part.length > 40 && /\b(?:dream|dreamt|dreamed|nightmare|sleep)\b/i.test(part)) {
                    return part.trim();
                }
            }
            return input; // Return the whole input if we can't isolate the dream part
        }
        
        return null;
    }
    
    /**
     * Extract symbols from a dream narrative
     * @param {string} dreamNarrative - Dream narrative
     * @returns {Array<string>} Extracted symbols
     */
    extractSymbolsFromDream(dreamNarrative) {
        const normalizedNarrative = dreamNarrative.toLowerCase();
        const foundSymbols = [];
        
        // Check for symbols in our database
        for (const symbol in this.dreamSymbols) {
            if (normalizedNarrative.includes(symbol)) {
                foundSymbols.push(symbol);
            }
        }
        
        // Check for category matches (like types of animals, places, etc.)
        const symbolCategories = {
            animals: ["dog", "cat", "bird", "snake", "wolf", "bear", "horse", "fish", "insect", "spider", "lion", "tiger"],
            people: ["stranger", "friend", "family", "mother", "father", "child", "baby", "boss", "teacher", "ex", "partner", "spouse"],
            places: ["house", "home", "school", "work", "office", "beach", "mountain", "forest", "city", "building", "church", "hospital"],
            elements: ["water", "fire", "earth", "air", "wind", "ocean", "river", "lake", "flame", "smoke", "mud", "dirt"],
            actions: ["falling", "flying", "running", "chasing", "hiding", "searching", "finding", "losing", "fighting", "kissing", "swimming"],
            objects: ["car", "vehicle", "door", "window", "key", "phone", "computer", "book", "mirror", "clock", "money", "weapon"]
        };
        
        for (const category in symbolCategories) {
            for (const specificSymbol of symbolCategories[category]) {
                if (normalizedNarrative.includes(specificSymbol) && !foundSymbols.includes(specificSymbol)) {
                    foundSymbols.push(specificSymbol);
                }
            }
        }
        
        return foundSymbols;
    }
    
    /**
     * Identify themes in a dream narrative
     * @param {string} dreamNarrative - Dream narrative
     * @returns {Array<string>} Identified themes
     */
    identifyDreamThemes(dreamNarrative) {
        const normalizedNarrative = dreamNarrative.toLowerCase();
        const foundThemes = [];
        
        // Check for theme indicators
        const themeIndicators = {
            "being_chased": ["chase", "chased", "chasing", "run", "running", "escape", "escaping", "following", "followed", "pursuing", "pursued"],
            "falling": ["fall", "falling", "dropped", "dropping", "plummet", "plummeting"],
            "flying": ["fly", "flying", "float", "floating", "hover", "hovering", "soar", "soaring"],
            "nudity": ["naked", "nude", "exposed", "bare", "undressed", "clothes off", "no clothes", "without clothes"],
            "unprepared_test": ["test", "exam", "unprepared", "late", "miss", "missing", "school", "class", "forgot to study"],
            "teeth_falling": ["teeth", "tooth", "falling out", "loose", "lost", "losing", "decay", "broken"],
            "searching": ["search", "searching", "looking for", "find", "finding", "lost", "missing", "can't find"],
            "trapped": ["trapped", "stuck", "can't move", "paralyzed", "confined", "prison", "jail", "locked", "escape"],
            "death": ["death", "dying", "dead", "killed", "funeral", "grave", "cemetery", "passed away"],
            "water": ["water", "ocean", "swimming", "drowning", "flood", "flooded", "river", "lake", "underwater"]
        };
        
        for (const theme in themeIndicators) {
            for (const indicator of themeIndicators[theme]) {
                if (normalizedNarrative.includes(indicator)) {
                    foundThemes.push(theme);
                    break; // Only add the theme once
                }
            }
        }
        
        return foundThemes;
    }
    
    /**
     * Add a dream to the user's dream journal
     * @param {string} dreamNarrative - Dream narrative
     * @param {Array<string>} symbols - Extracted symbols
     * @param {Array<string>} themes - Identified themes
     */
    addDreamToJournal(dreamNarrative, symbols, themes) {
        // Create a new dream entry
        const dreamEntry = {
            narrative: dreamNarrative,
            date: new Date().toISOString(),
            symbols: symbols,
            themes: themes,
            interpretation: null // Would be filled with actual interpretation in real implementation
        };
        
        // Add to dream journal
        this.state.dreamJournal.push(dreamEntry);
        
        // Update recurrent symbols
        for (const symbol of symbols) {
            if (this.state.recurrentSymbols[symbol]) {
                this.state.recurrentSymbols[symbol]++;
            } else {
                this.state.recurrentSymbols[symbol] = 1;
            }
        }
        
        // Update dream themes
        for (const theme of themes) {
            if (!this.state.dreamThemes.includes(theme)) {
                this.state.dreamThemes.push(theme);
            }
        }
        
        // Save updated dream journal
        this.savePreferences({
            dreamJournal: this.state.dreamJournal,
            recurrentSymbols: this.state.recurrentSymbols,
            dreamThemes: this.state.dreamThemes
        });
    }
    
    /**
     * Get the meaning of a symbol
     * @param {string} symbol - Dream symbol
     * @returns {string} Symbol meaning
     */
    getSymbolMeaning(symbol) {
        // Check if we have this symbol in our database
        if (this.dreamSymbols[symbol]) {
            return this.dreamSymbols[symbol].general;
        }
        
        // Check if we have a personal meaning for this symbol
        if (this.state.personalSymbols[symbol]) {
            return this.state.personalSymbols[symbol];
        }
        
        // Return a placeholder if no meaning is found
        return "This symbol would be analyzed based on common psychological interpretations and your personal associations.";
    }
    
    /**
     * Explain a dream symbol based on user input
     * @param {string} userInput - User's input about a symbol
     * @returns {string} Symbol explanation
     */
    explainSymbol(userInput) {
        // Try to extract the symbol from user input
        const symbol = this.extractSymbolFromInput(userInput);
        
        if (!symbol) {
            return `# Dream Symbolism

In a complete implementation with an AI model and dream analysis expertise, I would provide detailed explanations of specific dream symbols and their psychological significance.

To explain a dream symbol, I need to know which specific symbol you're asking about. For example:
- What does water symbolize in dreams?
- What's the meaning of snakes in dreams?
- Why do I dream about flying?
- What do dreams about teeth falling out mean?

Dreams often contain symbols that have both universal meanings and personal associations. When you specify a particular symbol, I can provide:
- Common psychological interpretations
- Different contexts the symbol might appear in
- Variations in meaning based on other dream elements
- Cultural and archetypal significance

Which dream symbol would you like me to explain?`;
        }
        
        // Check if we have this symbol in our database
        if (this.dreamSymbols[symbol]) {
            const symbolData = this.dreamSymbols[symbol];
            
            return `# ${this.capitalizeFirstLetter(symbol)} as a Dream Symbol

In a complete implementation with an AI model and dream analysis expertise, I would provide a comprehensive analysis of ${symbol} as a dream symbol, including its psychological significance, variations, and personal relevance.

## General Symbolism

${symbolData.general}

## Contextual Meanings

${Object.entries(symbolData)
    .filter(([key, value]) => key !== 'general')
    .map(([key, value]) => `### ${this.capitalizeFirstLetter(key.replace(/_/g, ' '))} ${symbol}\n${value}`)
    .join('\n\n')}

## Psychological Perspectives

Different psychological traditions interpret this symbol in various ways:

- **Freudian**: Would focus on how ${symbol} might represent unconscious desires or conflicts
- **Jungian**: Would explore ${symbol} as a possible archetype from the collective unconscious
- **Existential**: Would consider how ${symbol} relates to core life concerns and authenticity
- **Cognitive**: Would analyze how ${symbol} processes emotional experiences or problem-solving

## Cultural Significance

${symbol} has appeared as a symbol across various cultures and mythologies, often representing:
- [Cultural meaning examples would be provided here]
- [Historical significance would be explained]
- [Mythological references would be included]

## Questions for Personal Reflection

Your personal associations with ${symbol} are crucial for interpretation. Consider:
- What personal experiences do you have with ${symbol}?
- What feelings does ${symbol} evoke for you?
- How did ${symbol} appear and behave in your dream?
- What other dream elements interacted with ${symbol}?

Remember that while these interpretations offer guidance, your personal connection to this symbol is most important for understanding its significance in your dreams.`;
        } else {
            // Provide a general response for symbols not in our database
            return `# ${this.capitalizeFirstLetter(symbol)} as a Dream Symbol

In a complete implementation with an AI model and dream analysis expertise, I would provide a detailed interpretation of ${symbol} as a dream symbol, considering various psychological perspectives and your personal associations.

## Possible Symbolism

${symbol} in dreams might symbolize:
- [Primary psychological meanings]
- [Secondary associations]
- [Emotional correlations]
- [Life situations it might reflect]

## Contextual Variations

The meaning of ${symbol} can vary depending on:
- How it appears in the dream
- What it does or how it behaves
- Your emotional response to it
- Other elements it interacts with

## Psychological Perspectives

Different psychological traditions might interpret ${symbol} as:
- **Freudian**: [How Freud might interpret this symbol]
- **Jungian**: [How Jung might interpret this symbol]
- **Existential**: [Existential significance of this symbol]
- **Cognitive**: [How this symbol might relate to mental processing]

## Personal Significance

The most meaningful interpretation comes from your own associations:
- What does ${symbol} mean to you personally?
- What experiences have you had with ${symbol}?
- What feelings does ${symbol} evoke for you?

To provide a more personalized interpretation, I would need to know more about:
- The specific context of ${symbol} in your dream
- Your personal history and associations with ${symbol}
- Current circumstances in your life that might relate

Would you like to share more details about how ${symbol} appeared in your dream?`;
        }
    }
    
    /**
     * Extract a symbol from user input
     * @param {string} input - User input
     * @returns {string|null} Symbol or null
     */
    extractSymbolFromInput(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct questions about symbols
        const symbolPatterns = [
            { regex: /\b(?:what\s+does|what's|whats|meaning\s+of|symbolism\s+of|interpret|significance\s+of)\s+(?:a|an|the)?\s*(.+?)\s+(?:mean|symbolize|represent|signify)(?:\s+in|\s+during|\s+when)?\s+(?:dreams|a\s+dream|my\s+dream|dreaming)\b/i, group: 1 },
            { regex: /\b(?:why\s+do\s+I\s+dream\s+(?:about|of))\s+(.+?)(?:\?|$)/i, group: 1 },
            { regex: /\b(?:dreams?\s+(?:about|with|containing|involving|of))\s+(.+?)(?:\s+means?|\s+symbolize?|\s+represent|\?|$)/i, group: 1 }
        ];
        
        for (const pattern of symbolPatterns) {
            const match = input.match(pattern.regex);
            if (match && match[pattern.group]) {
                const potentialSymbol = match[pattern.group].trim().toLowerCase();
                
                // Check if it matches or is contained in our symbol database
                for (const symbol in this.dreamSymbols) {
                    if (symbol === potentialSymbol || 
                        potentialSymbol.includes(symbol) || 
                        symbol.includes(potentialSymbol)) {
                        return symbol;
                    }
                }
                
                // If no match found but it seems like a valid symbol, return it
                if (potentialSymbol.length > 2 && 
                    !/^(what|why|how|when|where|who|dream|dreams|meaning|means|symbolize|represent|the|and|but|for|your|yours|my|mine|our|ours|they|them|their|its)$/i.test(potentialSymbol)) {
                    return potentialSymbol;
                }
            }
        }
        
        // Check if any symbol from our database is mentioned
        for (const symbol in this.dreamSymbols) {
            if (normalizedInput.includes(symbol)) {
                return symbol;
            }
        }
        
        return null;
    }
    
    /**
     * Analyze a recurring dream based on user input
     * @param {string} userInput - User's input about a recurring dream
     * @returns {string} Recurring dream analysis
     */
    analyzeRecurringDream(userInput) {
        return `# Recurring Dream Analysis

In a complete implementation with an AI model and dream analysis expertise, I would provide in-depth psychological insights into your recurring dreams, their patterns, and potential meanings.

## Significance of Recurring Dreams

Recurring dreams are particularly important because they:
- Highlight unresolved issues that your unconscious mind is processing
- Reflect persistent emotional states or concerns
- Often point to core beliefs or psychological patterns
- Provide opportunities for psychological growth when understood

## Psychological Perspectives

### Why Dreams Recur

Recurring dreams typically represent:
- Unresolved emotional issues seeking integration
- Unaddressed life situations that need attention
- Core psychological patterns or conflicts
- Developmental challenges in your personal growth

### Common Types of Recurring Dreams

- **Pursuit dreams**: Being chased or pursued reflects avoidance of issues or emotions
- **Performance anxiety dreams**: Test-taking, being unprepared, or public speaking reflects self-doubt
- **Loss dreams**: Losing something important suggests fear of missing opportunities or insecurity
- **Trapped dreams**: Being confined indicates feeling restricted in some area of life
- **Falling dreams**: Losing control or support in some aspect of life

## Working with Recurring Dreams

### Transformation Process

1. **Record details**: Keep a detailed journal of each occurrence
2. **Identify variations**: Note what changes and what stays constant
3. **Connect to life events**: Link dream occurrences to waking life situations
4. **Recognize emotions**: Pay attention to the feelings the dream evokes
5. **Consider action**: What response might resolve the underlying issue?

### Active Engagement

- **Reimagining**: Consciously reimagine the dream with different outcomes
- **Dialog**: Have an imaginary conversation with dream figures
- **Symbolic action**: Perform a ritual that addresses the dream theme
- **Lucid dreaming**: Learn to become aware within the dream to actively engage

## Next Steps

To provide a more specific analysis of your recurring dream, I would need:
- A detailed description of the recurring dream
- How long you've been having this dream
- What variations occur from one instance to another
- Current life circumstances that might relate to the dream

Would you like to share your recurring dream for a more personalized analysis?`;
    }
    
    /**
     * Provide lucid dreaming tips based on user input
     * @param {string} userInput - User's input about lucid dreaming
     * @returns {string} Lucid dreaming guidance
     */
    provideLucidDreamingTips(userInput) {
        return `# Lucid Dreaming Guide

In a complete implementation with an AI model and lucid dreaming expertise, I would provide personalized techniques and practices to help you become aware and take control within your dreams.

## What is Lucid Dreaming?

Lucid dreaming is the experience of becoming aware that you're dreaming while still in the dream state. This awareness allows you to:
- Consciously observe the dream environment
- Influence or control dream content and narrative
- Interact intentionally with dream characters and elements
- Experience adventures beyond physical limitations
- Explore your unconscious mind directly

## Effective Lucid Dreaming Techniques

### Reality Testing
${this.lucidDreamingTechniques.reality_testing.description}

**Practice Method:**
${this.lucidDreamingTechniques.reality_testing.steps.map(step => `- ${step}`).join('\n')}

### Mnemonic Induction (MILD)
${this.lucidDreamingTechniques.mnemonic_induction.description}

**Practice Method:**
${this.lucidDreamingTechniques.mnemonic_induction.steps.map(step => `- ${step}`).join('\n')}

### Wake Back to Bed (WBTB)
${this.lucidDreamingTechniques.wake_back_to_bed.description}

**Practice Method:**
${this.lucidDreamingTechniques.wake_back_to_bed.steps.map(step => `- ${step}`).join('\n')}

### Dream Journaling
${this.lucidDreamingTechniques.dream_journaling.description}

**Practice Method:**
${this.lucidDreamingTechniques.dream_journaling.steps.map(step => `- ${step}`).join('\n')}

## What to Do Once Lucid

When you achieve lucidity in a dream:
1. **Stabilize the dream**: Rub your hands together or spin in place to prevent waking
2. **Start small**: Begin with simple actions like floating or changing colors
3. **Set intentions**: Decide what you want to explore before sleeping
4. **Engage with dream figures**: Ask questions of your dream characters
5. **Explore possibilities**: Try things impossible in waking life
6. **Maintain calm**: Strong emotions can wake you up

## Potential Benefits

- Enhanced problem-solving and creativity
- Reduced nightmare frequency and intensity
- Opportunity to practice skills in a virtual environment
- Increased self-awareness and psychological insight
- Exploration of consciousness and perception

## Common Challenges

- **Waking upon becoming lucid**: Use stabilization techniques
- **Inconsistent results**: Normal; lucidity requires practice
- **False awakenings**: Perform reality checks even when you think you're awake
- **Sleep disruption**: Start with just 1-2 practices per week

Remember that lucid dreaming is a skill that typically develops with consistent practice over time. Most practitioners see results within 2-4 weeks of regular practice.

Would you like more specific guidance on any of these techniques or help troubleshooting your lucid dreaming practice?`;
    }
    
    /**
     * Provide dream recall improvement tips
     * @param {string} userInput - User's input about dream recall
     * @returns {string} Dream recall guidance
     */
    improveDreamRecall(userInput) {
        return `# Improving Dream Recall

In a complete implementation with an AI model and dream psychology expertise, I would provide personalized techniques to help you better remember and record your dreams.

## Why We Forget Dreams

Understanding why dreams fade can help improve recall:
- Dreams occur in different brain states than waking memories
- Memory consolidation works differently during sleep
- Dreams often aren't immediately encoded into long-term memory
- Attention shifts rapidly upon waking, displacing dream memories
- Dreams can be quickly overwritten by incoming sensory information

## Effective Dream Recall Techniques

### Before Sleep Preparation

1. **Set clear intention**: Before sleeping, affirm "I will remember my dreams tonight"
2. **Reduce alcohol and certain medications**: These can suppress REM sleep
3. **Optimize sleep quality**: Maintain consistent sleep schedule and environment
4. **Place dream journal by bed**: Prepare recording tools before sleeping
5. **Review previous dreams**: Read past dream journal entries before sleeping

### Upon Waking

1. **Stay still**: Remain in the same position when you first wake up
2. **Keep eyes closed**: External visual input can erase dream memories
3. **Mental replay**: Gently review any dream fragments you recall
4. **Work backwards**: If you remember only the end, work back to earlier scenes
5. **Focus on emotions**: Feelings often persist and can lead back to dream content
6. **Keyword anchoring**: Assign keywords to dream fragments to stabilize memories

### Recording Practices

1. **Record immediately**: Write or voice record dreams before any other activities
2. **Accept fragments**: Don't dismiss partial memories; record whatever you recall
3. **Sketch images**: Draw simple images of strong dream visuals
4. **Use present tense**: Write as if the dream is happening now to improve recall
5. **Include all senses**: Note sounds, smells, tactile sensations, not just visuals
6. **Note emotions**: Record feelings experienced during the dream

## Building a Dream Recall Practice

- **Be patient**: Improvement typically comes gradually with consistent practice
- **Track progress**: Note how recall improves over time
- **Recognize patterns**: Identify when recall is strongest (which part of night, weekends vs. weekdays)
- **Schedule REM awakenings**: Use alarms 6, 7.5, or 9 hours after falling asleep to wake during REM
- **Gradually extend practice**: Begin with weekends, then expand to all nights

## Signs of Improving Recall

- More frequent dream memories
- Greater detail in remembered dreams
- Recalling multiple dreams per night
- Increased awareness during dreams (moving toward lucidity)
- Spontaneous dream recall during the day

Would you like more specific guidance on any of these techniques or help troubleshooting particular recall challenges you're experiencing?`;
    }
    
    /**
     * Address nightmares based on user input
     * @param {string} userInput - User's input about nightmares
     * @returns {string} Nightmare coping guidance
     */
    addressNightmares(userInput) {
        return `# Understanding and Addressing Nightmares

In a complete implementation with an AI model and dream psychology expertise, I would provide personalized guidance for understanding, reducing, and transforming disturbing dreams and nightmares.

## Psychological Understanding of Nightmares

Nightmares typically serve important psychological functions:
- Processing threatening or emotional experiences
- Working through anxieties, fears, and stressors
- Bringing attention to unaddressed psychological material
- Practicing responses to threatening scenarios
- Reflecting internal conflicts seeking resolution

## Approaches to Nightmare Reduction

### Daytime Practices

1. **Process waking stress**: Address daytime anxiety through mindfulness, exercise, or therapy
2. **Create bedtime buffer**: Establish a 30-60 minute calming routine before sleep
3. **Practice self-compassion**: Cultivate a gentle, accepting attitude toward your dreams
4. **Limit nightmare triggers**: Reduce scary media, especially before bedtime
5. **Maintain regular sleep**: Keep consistent sleep/wake times to improve sleep quality

### Nightmare Reprocessing

1. **Image Rehearsal Therapy**: Rewrite the nightmare narrative while awake
   - Write down the nightmare
   - Change the storyline to a positive or neutral outcome
   - Visualize the new version several times daily
   - Practice for at least 5-7 days per nightmare

2. **Exposure Therapy Approach**:
   - Gradually confront nightmare content in a safe context
   - Progressively work with disturbing elements
   - Reduce their emotional charge through repeated exposure

3. **Dream Integration Work**:
   - Dialogue with nightmare figures through imagination
   - Explore the message or purpose of the nightmare
   - Look for unacknowledged aspects of self represented in the nightmare

### During the Nightmare

1. **Reality testing habits**: Practice reality checks during waking hours to carry into dreams
2. **Lucid dreaming techniques**: Develop awareness within nightmares to change their course
3. **Pre-sleep suggestions**: Give yourself permission to wake from or change nightmares
4. **Anchoring to safety**: Visualize a safe person or place before sleep to recall during nightmares

## When to Seek Professional Help

Consider reaching out to a mental health professional if:
- Nightmares occur frequently (multiple times per week)
- Nightmares significantly disrupt sleep quality or quantity
- Nightmares cause distress that impacts daytime functioning
- Nightmares are connected to trauma or PTSD
- Self-help approaches haven't reduced nightmare frequency or intensity

## Next Steps

Would you like to:
- Share a specific recurring nightmare for more targeted guidance?
- Learn more about any particular nightmare reduction technique?
- Discuss how to develop a nightmare transformation plan?

Remember that while disturbing, nightmares are often opportunities for profound psychological integration and growth when approached with the right tools.`;
    }
    
    /**
     * Provide psychological insight into dreams
     * @param {string} userInput - User's input about psychological meaning
     * @returns {string} Psychological insight
     */
    providePsychologicalInsight(userInput) {
        return `# Psychological Approaches to Dream Interpretation

In a complete implementation with an AI model and dream psychology expertise, I would provide detailed information about how different psychological traditions understand dreams and their significance.

## Major Dream Theory Frameworks

### Freudian Dream Analysis
${this.interpretationFrameworks.freudian.approach}

**Key Concepts:**
${this.interpretationFrameworks.freudian.key_concepts.map(concept => `- ${concept}`).join('\n')}

**Example Interpretation:**
A dream about a tall tower might represent phallic imagery, while water might symbolize emotional or sexual content. The "manifest content" (the tower, the water) disguises the "latent content" (sexual desires or conflicts).

### Jungian Dream Analysis
${this.interpretationFrameworks.jungian.approach}

**Key Concepts:**
${this.interpretationFrameworks.jungian.key_concepts.map(concept => `- ${concept}`).join('\n')}

**Example Interpretation:**
A dream about being lost in a forest might connect to the archetypal "dark forest" representing the unconscious mind. Meeting an old wise person in that forest could represent the "wise old man/woman" archetype offering guidance from your unconscious.

### Existential Dream Analysis
${this.interpretationFrameworks.existential.approach}

**Key Concepts:**
${this.interpretationFrameworks.existential.key_concepts.map(concept => `- ${concept}`).join('\n')}

**Example Interpretation:**
A dream about being unable to speak in an important situation might reflect existential concerns about authentic self-expression and the courage to define one's own meaning in life.

### Cognitive Dream Analysis
${this.interpretationFrameworks.cognitive.approach}

**Key Concepts:**
${this.interpretationFrameworks.cognitive.key_concepts.map(concept => `- ${concept}`).join('\n')}

**Example Interpretation:**
Dreaming about an upcoming presentation might be the brain processing performance anxiety, rehearsing possible scenarios, and integrating information needed for the task.

## Integrative Approach to Dream Analysis

Modern dream psychology often integrates these perspectives, recognizing that dreams may simultaneously:
- Process emotional material (Freudian)
- Connect to universal patterns and the collective unconscious (Jungian)
- Reflect our authentic being and existential concerns (Existential)
- Consolidate memories and solve problems (Cognitive)

## Psychological Benefits of Dream Work

Regular engagement with dreams can support psychological wellbeing by:
- Increasing self-awareness and emotional intelligence
- Facilitating integration of unconscious material
- Supporting creative problem-solving and insight generation
- Building connection between conscious and unconscious processes
- Providing personalized guidance for psychological growth

## Applying Psychology to Your Dreams

To gain psychological benefit from your dreams:
1. Record dreams without immediately interpreting them
2. Notice patterns, recurring themes, and emotional reactions
3. Consider multiple interpretive lenses
4. Connect dream content to current life circumstances
5. Look for how dreams might be compensating for conscious attitudes
6. Allow meanings to emerge rather than forcing interpretations

Would you like me to analyze a specific dream using one or more of these psychological frameworks, or would you like more information about a particular approach to dream interpretation?`;
    }
    
    /**
     * Suggest dream journaling practices
     * @param {string} userInput - User's input about dream journaling
     * @returns {string} Dream journaling guidance
     */
    suggestDreamJournaling(userInput) {
        return `# Dream Journaling Guide

In a complete implementation with an AI model and dream work expertise, I would provide personalized guidance on establishing and maintaining an effective dream journaling practice.

## Benefits of Dream Journaling

Regular dream journaling offers numerous benefits:
- Significantly improves dream recall frequency and detail
- Creates a record of your personal dream symbols and patterns
- Helps identify recurring themes and their evolution over time
- Provides insight into unconscious processes
- Supports development of lucid dreaming skills
- Offers material for psychological reflection and growth
- Creates a fascinating personal document to review over time

## Setting Up Your Dream Journal

### Journal Format Options

- **Physical notebook**: Provides tactile experience and freedom from screens
- **Digital journal**: Offers searchability and backup capabilities
- **Voice recording**: Captures dreams quickly without needing to fully wake up
- **Sketch journal**: Emphasizes visual elements through drawing
- **Structured app**: Provides templates and analysis tools

Each format has advantages; the best choice is the one you'll use consistently.

### Essential Journal Components

Every dream entry should ideally include:
1. **Date and time**: When the dream occurred and when you recorded it
2. **Title**: A descriptive name to help remember and reference the dream
3. **Dream narrative**: As much detail as you can recall
4. **Emotions**: How you felt during and after the dream
5. **Key symbols**: Notable elements that stood out
6. **Waking connections**: Any links to recent waking life events
7. **Questions raised**: What the dream makes you wonder about

## Effective Journaling Practices

### Recording Process

1. Keep your journal within immediate reach of your bed
2. Record dreams immediately upon waking, before doing anything else
3. Write in present tense to maintain the dream's immediacy
4. Start with whatever fragment you remember, even if minimal
5. Focus first on capturing content, then add reflection later
6. Include sensory details, not just visual elements
7. Note emotional states and transitions

### Ongoing Development

- Review your journal periodically to identify patterns
- Create a symbol index for recurring elements
- Track changes in dream content over time
- Note connections between dreams and life events
- Consider creating thematic collections of related dreams

## Analyzing Your Dream Journal

After establishing a consistent practice, enhance your understanding by:
- Highlighting recurring symbols, characters, or settings
- Tracking emotional patterns across dreams
- Noticing how dreams respond to life changes
- Identifying personal dream signs that might indicate lucidity potential
- Looking for progressive development in repeating themes

## Sample Dream Journal Entry

```
Date: [Date]
Dream Title: "The Hidden Room"

I'm in my childhood home, but it feels different. I discover a door I've never noticed before at the end of the hallway. I'm surprised but excited to find it. When I open it, there's an entire room filled with antique furniture and books. The room is dusty but has beautiful windows letting in golden light. I feel a sense of wonder and recognition, as if I should have known this room was here all along. I begin exploring the bookshelves and find a journal with my handwriting, but I can't remember writing it.

Emotions: Surprise, curiosity, wonder, slight confusion
Key symbols: Childhood home, hidden room, antique objects, journal
Waking connections: Been thinking about my past lately; considering starting therapy
Questions: What part of myself might the hidden room represent? What would the journal contain?
```

Would you like guidance on starting your dream journal, suggestions for analyzing existing dream journal entries, or help with troubleshooting common journaling challenges?`;
    }
    
    /**
     * Provide general dream guidance
     * @param {string} userInput - User's general input
     * @returns {string} General dream guidance
     */
    provideGeneralDreamGuidance(userInput) {
        return `# Understanding Dreams: A Guide

In a complete implementation with an AI model and dream psychology expertise, I would provide comprehensive information about dreams, their purpose, and how to work with them for psychological insight and personal growth.

## The Nature and Purpose of Dreams

Dreams are generated by the brain during sleep, particularly during REM (Rapid Eye Movement) sleep phases. They serve multiple potential functions:

- **Memory consolidation**: Processing and integrating daily experiences
- **Emotional regulation**: Working through feelings and emotional content
- **Problem solving**: Exploring solutions and possibilities in a simulation environment
- **Psychological integration**: Processing unconscious material into conscious awareness
- **Cognitive organization**: Clearing irrelevant neural connections while strengthening important ones

## Types of Dreams

Dreams come in many varieties, each offering different opportunities for insight:

- **Ordinary dreams**: Everyday dreaming that processes daily experiences
- **Recurring dreams**: Repeated dream themes indicating unresolved issues
- **Nightmares**: Disturbing dreams that process fears and anxieties
- **Lucid dreams**: Dreams where you become aware you're dreaming while still in the dream
- **Archetypal dreams**: Dreams containing universal symbols and patterns
- **Problem-solving dreams**: Dreams that offer solutions to waking life challenges
- **Prophetic/precognitive dreams**: Dreams that seem to predict future events
- **Healing dreams**: Dreams that offer guidance for physical or emotional healing
- **Visitation dreams**: Dreams of deceased loved ones that feel unusually real

## Working with Dreams

Dreams become most valuable when actively engaged with through practices like:

1. **Dream recall**: Techniques to remember dreams more completely
2. **Dream journaling**: Recording dreams for patterns and insights
3. **Dream analysis**: Exploring meanings and messages
4. **Dream incubation**: Setting intentions for specific dream content
5. **Lucid dreaming**: Developing awareness within the dream state
6. **Dream sharing**: Discussing dreams with others for additional perspectives
7. **Dream amplification**: Exploring dream elements through creative methods
8. **Dream re-entry**: Returning to dream scenarios through imagination

## Dream Interpretation Approaches

Multiple frameworks exist for understanding dreams:

- **Freudian**: Dreams as disguised wish fulfillment
- **Jungian**: Dreams as messages from the collective unconscious
- **Existential**: Dreams as expressions of authentic being
- **Gestalt**: All dream elements as aspects of the dreamer
- **Cognitive**: Dreams as memory processing and problem solving
- **Neurobiological**: Dreams as brain maintenance and integration
- **Cultural**: Dreams interpreted through cultural context and meaning
- **Spiritual**: Dreams as connection to transcendent realities

## Starting Your Dream Practice

To begin working with your dreams:

1. Set an intention to remember dreams before sleeping
2. Keep a dream journal by your bed
3. Record dreams immediately upon waking
4. Look for patterns and recurring elements
5. Notice connections to waking life
6. Remain open to multiple interpretations
7. Let meanings emerge gradually over time

What aspect of dreams are you most interested in exploring further?`;
    }
    
    /**
     * Get dream interpretation suggestions based on user interaction
     * @param {string} requestType - Type of dream request
     * @returns {Array<string>} Dream interpretation suggestions
     */
    getDreamSuggestions(requestType) {
        const suggestions = [];
        
        // Add type-specific suggestions
        if (requestType === "interpretation") {
            suggestions.push("What does it mean to dream about flying?");
            suggestions.push("Why do I keep having dreams about being chased?");
            suggestions.push("Help me understand why I dreamed about my childhood home");
        } else if (requestType === "symbol") {
            suggestions.push("What do snakes symbolize in dreams?");
            suggestions.push("What's the meaning of water in dreams?");
            suggestions.push("What do teeth falling out represent in dreams?");
        } else if (requestType === "recurring") {
            suggestions.push("Why do recurring dreams happen?");
            suggestions.push("How can I stop having the same nightmare?");
            suggestions.push("What does it mean if a dream theme keeps repeating?");
        } else if (requestType === "lucid") {
            suggestions.push("How can I have lucid dreams more consistently?");
            suggestions.push("What should I do when I become lucid in a dream?");
            suggestions.push("What is the wake back to bed technique?");
        } else if (requestType === "recall") {
            suggestions.push("Why do I forget my dreams so quickly?");
            suggestions.push("How can I remember my dreams better?");
            suggestions.push("What foods improve dream recall?");
        } else if (requestType === "nightmare") {
            suggestions.push("How can I stop having nightmares?");
            suggestions.push("What causes recurring nightmares?");
            suggestions.push("Techniques to transform nightmares into positive dreams");
        } else if (requestType === "psychological") {
            suggestions.push("How did Jung interpret dreams?");
            suggestions.push("What's the difference between Freudian and modern dream analysis?");
            suggestions.push("Are dreams trying to tell me something?");
        } else if (requestType === "journaling") {
            suggestions.push("What should I include in my dream journal?");
            suggestions.push("How do I analyze patterns in my dream journal?");
            suggestions.push("Best practices for dream journaling");
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "Why do we dream?",
                "What are the most common dream themes?",
                "Do dreams have psychological significance?",
                "Can dreams predict the future?",
                "How do I know if a dream is important?",
                "What does it mean when people from my past appear in dreams?",
                "Why are some dreams so vivid while others fade quickly?"
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
                'jaat-mode15-preferences',
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
            localStorage.removeItem('jaat-mode15-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Add a personal symbol meaning
     * @param {string} symbol - Symbol
     * @param {string} meaning - Personal meaning
     * @returns {boolean} Success status
     */
    addPersonalSymbol(symbol, meaning) {
        if (!symbol || !meaning) return false;
        
        // Add or update the personal symbol
        this.state.personalSymbols[symbol] = meaning;
        
        // Save updated personal symbols
        this.savePreferences({ personalSymbols: this.state.personalSymbols });
        return true;
    }
    
    /**
     * Set interpretation approach
     * @param {string} approach - Interpretation approach
     * @returns {boolean} Success status
     */
    setInterpretationApproach(approach) {
        if (!approach || !this.interpretationFrameworks[approach]) return false;
        
        // Set the interpretation approach
        this.state.interpretationApproach = approach;
        
        // Save updated interpretation approach
        this.savePreferences({ interpretationApproach: approach });
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
            interpretationApproach: this.state.interpretationApproach,
            dreamJournalEntries: this.state.dreamJournal.length,
            personalSymbolsCount: Object.keys(this.state.personalSymbols).length,
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
    window.jaatAIModes.dreamInterpreter = new DreamInterpreterMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DreamInterpreterMode;
}
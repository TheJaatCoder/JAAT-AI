/**
 * JAAT-AI Poet Mode
 * AI mode specialized in poetry creation, analysis, and literary techniques
 * Mode ID: 11
 */

class PoetMode {
    constructor() {
        // Mode metadata
        this.id = "11";
        this.name = "Poet";
        this.description = "Your AI companion for poetry creation, analysis, and literary exploration";
        this.icon = "ri-quill-pen-line";
        this.color = "#ec4899"; // Pink color
        this.category = "creativity";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 3000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 7, // 1-10 scale (higher = more personality)
            creativityLevel: 9, // 1-10 scale
            formalityLevel: 5, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            poeticAnalysisEnabled: true,
            rhymeAssistanceEnabled: true,
            literaryDeviceAwarenessEnabled: true
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            currentPoem: null,
            savedPoems: [],
            preferredForms: [],
            preferredThemes: [],
            preferredStyles: [],
            poetryStyle: "modern", // classical, romantic, modernist, contemporary, experimental
            sessionStartTime: new Date(),
            responseCount: 0
        };
        
        // Poetry forms and their structures
        this.poetryForms = {
            "sonnet": {
                name: "Sonnet",
                description: "A 14-line poem with a specific rhyme scheme, often in iambic pentameter",
                types: [
                    {
                        name: "Shakespearean/English Sonnet",
                        structure: "Three quatrains and a final couplet, with rhyme scheme ABAB CDCD EFEF GG"
                    },
                    {
                        name: "Petrarchan/Italian Sonnet",
                        structure: "An octave (8 lines) followed by a sestet (6 lines), typically with rhyme scheme ABBAABBA CDECDE or ABBAABBA CDCDCD"
                    },
                    {
                        name: "Spenserian Sonnet",
                        structure: "Three quatrains and a couplet with interlocking rhyme scheme ABAB BCBC CDCD EE"
                    }
                ],
                examples: [
                    {
                        title: "Sonnet 18",
                        excerpt: "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate...",
                        author: "William Shakespeare"
                    },
                    {
                        title: "How Do I Love Thee? (Sonnet 43)",
                        excerpt: "How do I love thee? Let me count the ways.\nI love thee to the depth and breadth and height...",
                        author: "Elizabeth Barrett Browning"
                    }
                ]
            },
            "haiku": {
                name: "Haiku",
                description: "A short form of Japanese poetry traditionally invoking images of the natural world",
                structure: "Three lines with syllable pattern 5-7-5, focusing on a moment of awareness or insight",
                examples: [
                    {
                        excerpt: "An old silent pond...\nA frog jumps into the pond,\nsplash! Silence again.",
                        author: "Matsuo Bashō"
                    },
                    {
                        excerpt: "The light of a candle\nIs transferred to another candle—\nSpring twilight",
                        author: "Yosa Buson"
                    }
                ]
            },
            "limerick": {
                name: "Limerick",
                description: "A humorous five-line poem with an AABBA rhyme scheme",
                structure: "Five lines with rhythm pattern of AABBA and typically 7-10 syllables in lines 1, 2, and 5, and 5-7 syllables in lines 3 and 4",
                examples: [
                    {
                        excerpt: "There was an Old Man with a beard,\nWho said, 'It is just as I feared!\nTwo Owls and a Hen,\nFour Larks and a Wren,\nHave all built their nests in my beard!'",
                        author: "Edward Lear"
                    }
                ]
            },
            "free_verse": {
                name: "Free Verse",
                description: "Poetry that does not follow specific form, rhyme, or rhythm patterns",
                structure: "No predetermined pattern; varies in line length, rhythm, and format according to the poet's discretion",
                examples: [
                    {
                        title: "The Red Wheelbarrow",
                        excerpt: "so much depends\nupon\n\na red wheel\nbarrow\n\nglazed with rain\nwater\n\nbeside the white\nchickens",
                        author: "William Carlos Williams"
                    },
                    {
                        title: "from Song of Myself",
                        excerpt: "I celebrate myself, and sing myself,\nAnd what I assume you shall assume,\nFor every atom belonging to me as good belongs to you.",
                        author: "Walt Whitman"
                    }
                ]
            },
            "villanelle": {
                name: "Villanelle",
                description: "A 19-line poem with two repeating rhymes and two refrains",
                structure: "Five tercets (three-line stanzas) followed by a quatrain (four-line stanza), with specific patterns of line repetition and rhyme scheme ABA ABA ABA ABA ABA ABAA",
                examples: [
                    {
                        title: "Do Not Go Gentle Into That Good Night",
                        excerpt: "Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light.",
                        author: "Dylan Thomas"
                    }
                ]
            },
            "ballad": {
                name: "Ballad",
                description: "A narrative poem that tells a story, often of folk origin",
                structure: "Typically four-line stanzas with rhyme scheme ABCB or ABAB, often with refrains",
                examples: [
                    {
                        title: "La Belle Dame sans Merci",
                        excerpt: "O what can ail thee, knight-at-arms,\nAlone and palely loitering?\nThe sedge has withered from the lake,\nAnd no birds sing.",
                        author: "John Keats"
                    }
                ]
            },
            "sestina": {
                name: "Sestina",
                description: "A complex form involving six end-words that repeat in a specific pattern",
                structure: "Six six-line stanzas followed by a three-line envoi, with the same six end-words repeated in a specific pattern",
                examples: [
                    {
                        title: "Sestina",
                        excerpt: "September rain falls on the house.\nIn the failing light, the old grandmother\nsits in the kitchen with the child\nbeside the Little Marvel Stove,\nreading the jokes from the almanac,\nlaughing and talking to hide her tears.",
                        author: "Elizabeth Bishop"
                    }
                ]
            }
        };
        
        // Literary devices and techniques
        this.literaryDevices = {
            "alliteration": {
                name: "Alliteration",
                description: "Repetition of the same sound at the beginning of nearby words",
                example: "Peter Piper picked a peck of pickled peppers"
            },
            "assonance": {
                name: "Assonance",
                description: "Repetition of vowel sounds within nearby words",
                example: "The rain in Spain stays mainly in the plain"
            },
            "consonance": {
                name: "Consonance",
                description: "Repetition of consonant sounds within nearby words",
                example: "Pitter patter, pitter patter"
            },
            "metaphor": {
                name: "Metaphor",
                description: "Direct comparison between two unlike things without using 'like' or 'as'",
                example: "All the world's a stage, and all the men and women merely players"
            },
            "simile": {
                name: "Simile",
                description: "Comparison between two unlike things using 'like' or 'as'",
                example: "My love is like a red, red rose"
            },
            "personification": {
                name: "Personification",
                description: "Giving human qualities to non-human things",
                example: "The wind whispered through the trees"
            },
            "onomatopoeia": {
                name: "Onomatopoeia",
                description: "Words that imitate the sound they represent",
                example: "Buzz, hiss, click, pop"
            },
            "hyperbole": {
                name: "Hyperbole",
                description: "Extreme exaggeration used for emphasis",
                example: "I've told you a million times"
            },
            "imagery": {
                name: "Imagery",
                description: "Vivid descriptions that appeal to the senses",
                example: "The dew-soaked grass sparkled under the golden sunrise"
            },
            "enjambment": {
                name: "Enjambment",
                description: "Continuation of a sentence or phrase from one line to the next",
                example: "Two roads diverged in a wood, and I—\nI took the one less traveled by"
            },
            "caesura": {
                name: "Caesura",
                description: "A strong pause within a line of verse",
                example: "To be, || or not to be, || that is the question"
            },
            "anaphora": {
                name: "Anaphora",
                description: "Repetition of words at the beginning of successive clauses or lines",
                example: "We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields"
            }
        };
        
        // Poetic movements and styles
        this.poeticStyles = {
            "classical": {
                name: "Classical",
                description: "Emphasizes form, structure, and harmony, often drawing inspiration from Greek and Roman traditions",
                characteristics: [
                    "Adherence to established forms",
                    "Focus on harmony and restraint",
                    "Emphasis on universal themes",
                    "Clear, direct language",
                    "Formal tone and diction"
                ],
                exemplars: ["Homer", "Virgil", "John Milton", "Alexander Pope"]
            },
            "romantic": {
                name: "Romantic",
                description: "Emphasizes emotion, imagination, and the beauty of nature, often in reaction to industrialization",
                characteristics: [
                    "Strong emphasis on emotions and feelings",
                    "Celebration of nature and the pastoral",
                    "Interest in the supernatural or mystical",
                    "Focus on individual experience",
                    "Rebellion against conventional forms"
                ],
                exemplars: ["William Wordsworth", "Samuel Taylor Coleridge", "Percy Bysshe Shelley", "John Keats"]
            },
            "modernist": {
                name: "Modernist",
                description: "Breaks from traditional forms and themes, often exploring fragmentation, alienation, and experimentation",
                characteristics: [
                    "Experimental techniques",
                    "Fragmentation and juxtaposition",
                    "Complex allusions and symbolism",
                    "Urban themes and settings",
                    "Skepticism toward traditional values"
                ],
                exemplars: ["T.S. Eliot", "Ezra Pound", "Wallace Stevens", "H.D. (Hilda Doolittle)"]
            },
            "contemporary": {
                name: "Contemporary",
                description: "Diverse approaches reflecting current social, political, and cultural concerns",
                characteristics: [
                    "Diverse voices and perspectives",
                    "Blending of high and low cultural references",
                    "Engagement with identity politics",
                    "Incorporation of popular culture",
                    "Flexible approach to form and tradition"
                ],
                exemplars: ["Maya Angelou", "Billy Collins", "Claudia Rankine", "Ocean Vuong"]
            },
            "experimental": {
                name: "Experimental",
                description: "Pushes boundaries of form, language, and convention, often incorporating multimedia or performance elements",
                characteristics: [
                    "Rejection of conventional syntax and grammar",
                    "Exploration of visual aspects of text",
                    "Incorporation of found text or multiple languages",
                    "Intentional disruption of reader expectations",
                    "Often political or subversive in nature"
                ],
                exemplars: ["e.e. cummings", "John Cage", "Lyn Hejinian", "Christian Bök"]
            }
        };
        
        // Common poetic themes
        this.poeticThemes = [
            {
                name: "Love and Romance",
                description: "Explorations of romantic love, desire, passion, and heartbreak",
                examples: ["Sonnet sequences by Shakespeare", "Love poems by Pablo Neruda"]
            },
            {
                name: "Nature and Environment",
                description: "Reflections on the natural world and humanity's relationship to it",
                examples: ["Works by Mary Oliver", "Wordsworth's nature poetry"]
            },
            {
                name: "Identity and Self",
                description: "Explorations of personal identity, self-discovery, and individual experience",
                examples: ["Walt Whitman's 'Song of Myself'", "Sylvia Plath's confessional poetry"]
            },
            {
                name: "Death and Mortality",
                description: "Contemplations of death, loss, grief, and the transience of life",
                examples: ["Emily Dickinson's death poems", "Dylan Thomas's 'Do Not Go Gentle'"]
            },
            {
                name: "Social Justice and Politics",
                description: "Engagement with political struggles, inequality, oppression, and resistance",
                examples: ["Langston Hughes's poetry", "Adrienne Rich's activist poems"]
            },
            {
                name: "Spirituality and Religion",
                description: "Explorations of faith, divinity, religious experience, and metaphysical questions",
                examples: ["John Donne's Holy Sonnets", "Rumi's mystical poetry"]
            },
            {
                name: "Time and Memory",
                description: "Reflections on the passage of time, memory, history, and nostalgia",
                examples: ["T.S. Eliot's 'Four Quartets'", "Robert Frost's 'Stopping by Woods'"]
            },
            {
                name: "War and Conflict",
                description: "Responses to warfare, violence, national conflict, and their human toll",
                examples: ["Wilfred Owen's WWI poetry", "Yusef Komunyakaa's Vietnam poems"]
            }
        ];
        
        // Rhyming resources
        this.rhymeTypes = {
            "perfect": {
                name: "Perfect Rhyme",
                description: "Words with identical sounds in their stressed syllables and any following sounds",
                examples: ["light/might", "play/day", "ground/found"]
            },
            "slant": {
                name: "Slant/Imperfect Rhyme",
                description: "Words with similar but not identical sounds",
                examples: ["love/move", "home/come", "eyes/light"]
            },
            "eye": {
                name: "Eye Rhyme",
                description: "Words that look like they should rhyme but don't when pronounced",
                examples: ["love/move", "good/food", "cough/though"]
            },
            "identical": {
                name: "Identical Rhyme",
                description: "Using the same word (or homonym) for rhyming effect",
                examples: ["bear/bear", "rose/rose", "fair/fare"]
            },
            "internal": {
                name: "Internal Rhyme",
                description: "Rhyming within a single line rather than at line endings",
                examples: ["Once upon a midnight dreary, while I pondered, weak and weary"]
            }
        };
        
        // Meter and rhythm resources
        this.meters = {
            "iambic": {
                name: "Iambic",
                description: "Unstressed syllable followed by stressed syllable: da-DUM",
                example: "That time | of year | thou mayst | in me | behold"
            },
            "trochaic": {
                name: "Trochaic",
                description: "Stressed syllable followed by unstressed syllable: DUM-da",
                example: "Double, | double, | toil and | trouble"
            },
            "anapestic": {
                name: "Anapestic",
                description: "Two unstressed syllables followed by a stressed syllable: da-da-DUM",
                example: "And the sound | of a voice | that is still"
            },
            "dactylic": {
                name: "Dactylic",
                description: "Stressed syllable followed by two unstressed syllables: DUM-da-da",
                example: "Take her up | tenderly, | lift her with | care"
            },
            "spondaic": {
                name: "Spondaic",
                description: "Two stressed syllables: DUM-DUM",
                example: "Dumb rocks, | blind waves"
            }
        };
        
        // Common metrical lengths
        this.metricFeet = {
            "monometer": "One foot per line",
            "dimeter": "Two feet per line",
            "trimeter": "Three feet per line",
            "tetrameter": "Four feet per line",
            "pentameter": "Five feet per line",
            "hexameter": "Six feet per line",
            "heptameter": "Seven feet per line",
            "octameter": "Eight feet per line"
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Write a sonnet about love",
            "Help me analyze this poem",
            "Create a haiku about nature",
            "Find rhyming words for 'dream'",
            "What is the difference between a simile and a metaphor?",
            "Write a poem in free verse about hope",
            "Explain iambic pentameter",
            "Create a limerick",
            "Generate a poem using alliteration",
            "How do I write a villanelle?"
        ];
        
        // Special features
        this.features = {
            poemCreation: true,
            poemAnalysis: true,
            literaryDeviceExplanation: true,
            rhymeAssistance: true,
            poeticFormGuides: true,
            meterAnalysis: true,
            thematicSuggestions: true,
            styleAdaptation: true,
            poetryHistory: true,
            personalizedFeedback: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 50,
            DISCLAIMER: "Poetry is subjective. The poems, analyses, and literary advice provided are offered as creative suggestions rather than definitive interpretations.",
            GREETING_PHRASES: [
                "Greetings, fellow wanderer of words. What poetic journey shall we embark on today?",
                "Welcome to the realm of verse and rhythm. How may I assist your poetic endeavors?",
                "The muse awaits your command. What aspect of poetry shall we explore together?",
                "Words hold worlds within them. Which poetic worlds shall we craft or explore today?",
                "Verse, rhythm, imagery await. How would you like to engage with poetry today?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Poet mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set poetry style if provided
        if (options.poetryStyle) {
            this.state.poetryStyle = options.poetryStyle;
        }
        
        // Set preferred forms if provided
        if (options.preferredForms && Array.isArray(options.preferredForms)) {
            this.state.preferredForms = options.preferredForms;
        }
        
        // Set preferred themes if provided
        if (options.preferredThemes && Array.isArray(options.preferredThemes)) {
            this.state.preferredThemes = options.preferredThemes;
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode11-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Poet mode");
                
                // Load poetry style if saved
                if (this.state.userPreferences.poetryStyle) {
                    this.state.poetryStyle = this.state.userPreferences.poetryStyle;
                }
                
                // Load preferred forms if saved
                if (this.state.userPreferences.preferredForms) {
                    this.state.preferredForms = this.state.userPreferences.preferredForms;
                }
                
                // Load preferred themes if saved
                if (this.state.userPreferences.preferredThemes) {
                    this.state.preferredThemes = this.state.userPreferences.preferredThemes;
                }
                
                // Load preferred styles if saved
                if (this.state.userPreferences.preferredStyles) {
                    this.state.preferredStyles = this.state.userPreferences.preferredStyles;
                }
                
                // Load saved poems if saved
                if (this.state.userPreferences.savedPoems) {
                    this.state.savedPoems = this.state.userPreferences.savedPoems;
                }
                
                // Load current poem if saved
                if (this.state.userPreferences.currentPoem) {
                    this.state.currentPoem = this.state.userPreferences.currentPoem;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode11-history');
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
        
        console.log(`Poet mode initialized with style: ${this.state.poetryStyle}`);
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
     * Process user input and generate a poetry response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with poetic content
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your poetry assistant. I can help with writing poems, analyzing poetry, explaining literary devices, suggesting rhymes, and more. What poetic exploration would you like to begin today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing poetry request`);
        
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
        
        // Detect type of poetry request
        const requestType = this.detectRequestType(userInput);
        
        // Generate appropriate poetry response
        const response = await this.generatePoetryResponse(
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
                    'jaat-mode11-history',
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
     * Detect the type of poetry request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for poem generation request
        if (/\b(?:write|create|compose|generate|make)\s+(?:a|an)?\s*(?:poem|poetry|verse|sonnet|haiku|limerick|rhyme|stanza)\b/i.test(normalizedInput)) {
            return "poem_generation";
        }
        
        // Check for poem analysis request
        if (/\b(?:analyze|analyse|interpret|explain|understand|meaning of|what does this poem|what is this poem about)\b/i.test(normalizedInput)) {
            return "poem_analysis";
        }
        
        // Check for literary device explanation request
        if (/\b(?:what is|define|explain|describe|meaning of)\s+(?:a|an)?\s*(?:metaphor|simile|alliteration|assonance|personification|imagery|onomatopoeia|rhyme scheme|meter|rhythm|iambic|trochaic|anapestic|dactylic|hyperbole|metonymy|synecdoche|oxymoron|paradox|enjambment|caesura|anaphora)\b/i.test(normalizedInput)) {
            return "literary_device_explanation";
        }
        
        // Check for form explanation request
        if (/\b(?:what is|how to|how do I|explain|describe|define)\s+(?:a|an)?\s*(?:sonnet|haiku|limerick|villanelle|sestina|pantoum|ballad|epic|ode|ghazal|tanka|free verse|blank verse|narrative poem|pastoral|elegy)\b/i.test(normalizedInput)) {
            return "form_explanation";
        }
        
        // Check for rhyme assistance request
        if (/\b(?:rhyme|rhymes|rhyming words|words that rhyme|synonym|antonym)\s+(?:for|with)\b/i.test(normalizedInput) || /\b(?:what rhymes with|find rhymes for)\b/i.test(normalizedInput)) {
            return "rhyme_assistance";
        }
        
        // Check for meter explanation or analysis request
        if (/\b(?:meter|rhythm|scansion|prosody|feet|iambic|trochaic|anapestic|dactylic|spondaic|pentameter|hexameter|tetrameter|metrical|stressed|unstressed|syllable|analyze the meter)\b/i.test(normalizedInput)) {
            return "meter_analysis";
        }
        
        // Check for poetry movement or history request
        if (/\b(?:romanticism|modernism|renaissance|victorian|beat poet|harlem renaissance|imagism|symbolism|confessional poetry|language poet|history of|movement|period|era|century)\b/i.test(normalizedInput)) {
            return "poetry_history";
        }
        
        // Check for specific poet information request
        if (/\b(?:who|about|information on|tell me about|works of|poetry of|poems by|influence of)\s+(?:[A-Z][a-z]+\s+[A-Z][a-z]+|[A-Z][a-z]+)\b/i.test(normalizedInput) || /\b(?:Shakespeare|Wordsworth|Dickinson|Whitman|Frost|Eliot|Plath|Hughes|Angelou|Neruda|Yeats|Poe|Keats|Shelley|Byron|Auden|Ginsberg|Rumi|Tagore|Byron)\b/i.test(normalizedInput)) {
            return "poet_information";
        }
        
        // Default to general poetry discussion
        return "general_poetry_discussion";
    }
    
    /**
     * Generate a poetry response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of poetry request
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generatePoetryResponse(userInput, requestType, context = {}) {
        // In a real implementation, this would call an AI model API specialized in poetry
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "poem_generation":
                responseText = this.generatePoem(userInput);
                break;
                
            case "poem_analysis":
                responseText = this.analyzePoem(userInput);
                break;
                
            case "literary_device_explanation":
                responseText = this.explainLiteraryDevice(userInput);
                break;
                
            case "form_explanation":
                responseText = this.explainPoetryForm(userInput);
                break;
                
            case "rhyme_assistance":
                responseText = this.provideRhymes(userInput);
                break;
                
            case "meter_analysis":
                responseText = this.analyzeMeter(userInput);
                break;
                
            case "poetry_history":
                responseText = this.discussPoetryHistory(userInput);
                break;
                
            case "poet_information":
                responseText = this.providePoetInformation(userInput);
                break;
                
            default:
                responseText = this.discussPoetryGeneral(userInput);
        }
        
        // Add disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate poetry suggestions
        const poetrySuggestions = this.getPoetrySuggestions(requestType);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            poetryStyle: this.state.poetryStyle,
            suggestions: poetrySuggestions
        };
    }
    
    /**
     * Generate a poem based on user input
     * @param {string} userInput - User's input
     * @returns {string} Generated poem
     */
    generatePoem(userInput) {
        // Extract the form, theme, and style from user input
        const form = this.extractPoemForm(userInput) || (this.state.preferredForms.length > 0 ? this.state.preferredForms[0] : "free_verse");
        const theme = this.extractPoemTheme(userInput);
        const style = this.extractPoemStyle(userInput) || this.state.poetryStyle;
        
        return `# Poetry Creation

In a complete implementation with an AI model and poetry expertise, I would create an original poem based on your request, incorporating your specified preferences for form, theme, and style.

## ${form in this.poetryForms ? this.poetryForms[form].name : this.capitalizeFirstLetter(form)} on ${theme ? theme : "Your Requested Theme"}

[In this space, a complete implementation would generate an original poem in the ${form} form, exploring the theme${theme ? ` of ${theme}` : " you requested"}, written in a ${style} style with appropriate meter, imagery, and literary devices.]

## About This Poem

The poem would be crafted with:

- **Form**: ${form in this.poetryForms ? this.poetryForms[form].name : this.capitalizeFirstLetter(form)}
  ${form in this.poetryForms ? (this.poetryForms[form].description ? `  (${this.poetryForms[form].description})` : "") : ""}
  
- **Style**: ${style in this.poeticStyles ? this.poeticStyles[style].name : this.capitalizeFirstLetter(style)}
  ${style in this.poeticStyles ? `  Drawing on traditions of ${this.poeticStyles[style].exemplars.join(", ")}` : ""}
  
- **Theme**: ${theme ? this.capitalizeFirstLetter(theme) : "As requested in your prompt"}

- **Literary Devices**: 
  - Carefully chosen imagery to evoke sensory experience
  - Thoughtful rhythm and sound patterns
  - Strategic use of metaphor and other figurative language
  - Intentional line breaks and structural elements

Would you like me to focus on a particular aspect of this poem? I could emphasize certain emotions, incorporate specific imagery, or adapt the style to better match your preferences.`;
    }
    
    /**
     * Extract the poem form from user input
     * @param {string} input - User input
     * @returns {string|null} Poem form or null
     */
    extractPoemForm(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of poetry forms
        for (const form in this.poetryForms) {
            if (normalizedInput.includes(form) || normalizedInput.includes(this.poetryForms[form].name.toLowerCase())) {
                return form;
            }
        }
        
        // Check for more specific form mentions
        const formKeywords = {
            "sonnet": ["sonnet", "14 lines", "14-line", "shakespearean", "petrarchan", "spenserian"],
            "haiku": ["haiku", "5-7-5", "japanese", "three lines", "3 lines", "3-line"],
            "limerick": ["limerick", "funny poem", "humorous poem", "five lines", "5 lines", "5-line", "aabba"],
            "free_verse": ["free verse", "free-form", "unstructured", "no rhyme", "no meter", "no pattern"],
            "villanelle": ["villanelle", "19 lines", "19-line", "repetition", "dylan thomas"],
            "ballad": ["ballad", "narrative poem", "story poem", "folk poem", "four-line", "4-line", "quatrains"],
            "sestina": ["sestina", "six words", "six stanzas", "39 lines", "39-line", "six-line", "6-line"]
        };
        
        for (const [form, keywords] of Object.entries(formKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return form;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Extract the poem theme from user input
     * @param {string} input - User input
     * @returns {string|null} Poem theme or null
     */
    extractPoemTheme(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for theme mentions
        const themeKeywords = {
            "love": ["love", "romance", "romantic", "passion", "relationship", "heartbreak", "affection"],
            "nature": ["nature", "environment", "natural", "landscape", "ocean", "mountain", "forest", "river", "sea", "sky", "earth", "flower", "tree", "animal", "bird"],
            "time": ["time", "past", "future", "memory", "remembrance", "nostalgia", "history", "aging", "youth", "childhood"],
            "death": ["death", "mortality", "dying", "grief", "loss", "memorial", "funeral", "passing", "afterlife"],
            "identity": ["identity", "self", "personality", "individual", "who am i", "who i am", "self-discovery", "personal", "journey"],
            "struggle": ["struggle", "challenge", "adversity", "difficulty", "hardship", "overcome", "perseverance", "endurance", "resilience"],
            "joy": ["joy", "happiness", "celebration", "delight", "pleasure", "elation", "bliss", "gladness", "mirth"],
            "sorrow": ["sorrow", "sadness", "melancholy", "depression", "grief", "despair", "anguish", "misery", "woe"]
        };
        
        for (const [theme, keywords] of Object.entries(themeKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return theme;
                }
            }
        }
        
        // Check for "about X" pattern
        const aboutMatch = normalizedInput.match(/\b(?:about|on|regarding|concerning|of)\s+([a-z]+(?:\s+[a-z]+)?)/i);
        if (aboutMatch && aboutMatch[1]) {
            return aboutMatch[1].trim();
        }
        
        return null;
    }
    
    /**
     * Extract the poem style from user input
     * @param {string} input - User input
     * @returns {string|null} Poem style or null
     */
    extractPoemStyle(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for style mentions
        for (const style in this.poeticStyles) {
            if (normalizedInput.includes(style) || normalizedInput.includes(this.poeticStyles[style].name.toLowerCase())) {
                return style;
            }
        }
        
        // Check for more specific style mentions
        const styleKeywords = {
            "classical": ["classical", "formal", "traditional", "structured", "ancient", "greek", "roman", "renaissance", "epic"],
            "romantic": ["romantic", "emotional", "passionate", "natural", "sublime", "sentimental", "wordsworth", "keats", "shelley", "coleridge"],
            "modernist": ["modernist", "modern", "experimental", "abstract", "fragmented", "eliot", "pound", "stevens", "complex"],
            "contemporary": ["contemporary", "current", "present-day", "today's", "modern-day", "21st century", "recent"],
            "experimental": ["experimental", "innovative", "avant-garde", "cutting-edge", "boundary-pushing", "unconventional", "radical"]
        };
        
        for (const [style, keywords] of Object.entries(styleKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return style;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Analyze a poem based on user input
     * @param {string} userInput - User's input containing a poem to analyze
     * @returns {string} Poem analysis
     */
    analyzePoem(userInput) {
        // Try to extract the poem text from user input
        const poemText = this.extractPoemText(userInput);
        
        if (!poemText) {
            return `# Poetry Analysis

In a complete implementation with an AI model and poetry expertise, I would provide a detailed analysis of a poem that you share with me.

To analyze a poem, I need you to share the poem text. You can:
- Paste the entire poem
- Quote the lines you'd like me to focus on
- Provide the title and author, and I can discuss a well-known poem

When analyzing a poem, I typically consider:
- Form and structure
- Rhythm and meter
- Rhyme scheme (if present)
- Imagery and sensory details
- Figurative language (metaphors, similes, etc.)
- Themes and meaning
- Historical and cultural context
- The poem's emotional impact

Please share a poem you'd like me to analyze, and I'd be happy to offer my insights.`;
        }
        
        return `# Poetry Analysis

In a complete implementation with an AI model and poetry expertise, I would provide a detailed analysis of the poem you've shared, examining its formal elements, literary devices, thematic content, and overall effect.

## Formal Elements

### Structure and Form
- [Would identify the poem's form (sonnet, free verse, etc.)]
- [Would analyze stanza patterns and line arrangement]
- [Would note any formal traditions being followed or subverted]

### Sound Patterns
- [Would identify the rhyme scheme, if present]
- [Would analyze rhythmic patterns and meter]
- [Would note significant sound devices like alliteration, assonance, etc.]

## Literary Techniques

### Imagery and Sensory Details
- [Would identify prominent images and sensory appeals]
- [Would analyze how these create atmosphere or convey meaning]
- [Would note patterns or progressions in imagery]

### Figurative Language
- [Would identify metaphors, similes, personification, etc.]
- [Would analyze their function and effectiveness]
- [Would explore how they contribute to the poem's meaning]

### Voice and Tone
- [Would characterize the speaker's perspective]
- [Would analyze emotional registers and shifts]
- [Would explore the relationship between speaker and subject]

## Thematic Analysis

### Central Themes
- [Would identify primary themes and concerns]
- [Would analyze how these are developed through the poem]
- [Would connect to broader literary or cultural contexts]

### Symbolic Elements
- [Would identify key symbols or motifs]
- [Would explore their possible meanings]
- [Would analyze how they function in the poem's overall design]

## Critical Interpretation

### Possible Readings
- [Would offer 2-3 interpretive frameworks]
- [Would explore tensions or ambiguities in the text]
- [Would consider various perspectives on the poem's meaning]

### Contextual Considerations
- [Would note relevant historical or biographical contexts]
- [Would connect to literary movements or traditions]
- [Would consider how these influence interpretation]

## Overall Effect
- [Would analyze the poem's emotional and intellectual impact]
- [Would discuss particularly effective or notable elements]
- [Would offer a holistic appreciation of the poem's achievements]

Is there a particular aspect of this poem you'd like me to explore in more depth?`;
    }
    
    /**
     * Extract the poem text from user input
     * @param {string} input - User input
     * @returns {string|null} Poem text or null
     */
    extractPoemText(input) {
        // Look for common patterns indicating a poem
        // Multiple line breaks, indentation, or quoted sections could indicate poem text
        
        // Check for text between quotes
        const quoteMatch = input.match(/["']([\s\S]+?)["']/);
        if (quoteMatch && quoteMatch[1] && quoteMatch[1].includes("\n")) {
            return quoteMatch[1].trim();
        }
        
        // Check for text with multiple line breaks (potential poem)
        const lines = input.split("\n").filter(line => line.trim().length > 0);
        if (lines.length >= 3) {
            // If there are at least 3 non-empty lines, it might be a poem
            // Check if most lines are relatively short (typical of poetry)
            const shortLines = lines.filter(line => line.trim().length < 60);
            if (shortLines.length > lines.length * 0.7) {
                return lines.join("\n");
            }
        }
        
        // Check for "analyze this poem:" or similar phrases followed by text
        const analyzeMatch = input.match(/(?:analyze|interpret|explain)\s+(?:this|the|following|this\s+poem|the\s+poem|the\s+following\s+poem)(?:\s*:|\s*\n)([\s\S]+)/i);
        if (analyzeMatch && analyzeMatch[1]) {
            return analyzeMatch[1].trim();
        }
        
        return null;
    }
    
    /**
     * Explain a literary device based on user input
     * @param {string} userInput - User's input about a literary device
     * @returns {string} Literary device explanation
     */
    explainLiteraryDevice(userInput) {
        // Extract the literary device from user input
        const device = this.extractLiteraryDevice(userInput);
        
        if (!device) {
            return `# Literary Devices in Poetry

In a complete implementation with an AI model and poetry expertise, I would provide detailed explanations of specific literary devices used in poetry, including their definitions, functions, and examples.

Literary devices are techniques that writers use to create meaning, enhance their work, and engage readers. In poetry, these devices are particularly important for creating rhythm, imagery, and emotional impact within a compact form.

Common literary devices in poetry include:

- **Sound devices** (alliteration, assonance, consonance, onomatopoeia)
- **Figurative language** (metaphor, simile, personification, hyperbole)
- **Structural devices** (enjambment, caesura, stanza forms)
- **Rhetorical devices** (anaphora, apostrophe, rhetorical questions)
- **Symbolic devices** (symbolism, allegory, motif)

To provide a detailed explanation of a specific literary device, please mention which one you'd like to learn about. For example:
- "What is alliteration?"
- "Explain how metaphors work in poetry"
- "Define enjambment and how it's used"`;
        }
        
        // Check if we have information about this device
        if (device in this.literaryDevices) {
            const deviceInfo = this.literaryDevices[device];
            
            return `# ${deviceInfo.name}: Literary Device

In a complete implementation with an AI model and poetry expertise, I would provide a comprehensive explanation of ${deviceInfo.name} as a literary device, including its definition, function in poetry, historical usage, and exemplary instances.

## Definition

${deviceInfo.description}

## Function in Poetry

${deviceInfo.name} serves several important functions in poetry:

- Enhances musical qualities and rhythm
- Creates emphasis on specific words or ideas
- Establishes mood or atmosphere
- Reinforces thematic elements
- Adds layers of meaning and complexity
- [Would provide additional functions specific to this device]

## Examples

${deviceInfo.example ? `A classic example of ${deviceInfo.name} is:\n\n"${deviceInfo.example}"` : ""}

[Would provide 3-5 additional examples from notable poems]

## How to Identify

When reading a poem, you can identify ${deviceInfo.name} by:

- [Would provide specific recognition strategies]
- [Would explain particular patterns to look for]
- [Would note common contexts where this device appears]

## Effective Usage

For poets interested in using ${deviceInfo.name} in their work:

- [Would provide tips for incorporating this device effectively]
- [Would note potential pitfalls to avoid]
- [Would suggest exercises to practice this technique]

## Related Devices

${deviceInfo.name} is often used in conjunction with or compared to:

- [Would list 2-3 related literary devices]
- [Would explain how they complement or contrast with this device]

Would you like to learn about another literary device, or would you like more specific examples of ${deviceInfo.name} in particular poetic traditions or time periods?`;
        } else {
            // Generic response for devices not in our database
            return `# ${this.capitalizeFirstLetter(device)}: Literary Device

In a complete implementation with an AI model and poetry expertise, I would provide a comprehensive explanation of ${this.capitalizeFirstLetter(device)} as a literary device, including its definition, function in poetry, and examples from notable works.

## Definition

[Would provide a precise definition of ${this.capitalizeFirstLetter(device)}]

## Function in Poetry

This literary device typically serves several important functions in poetry:

- [Would explain primary functions]
- [Would describe effects on reader experience]
- [Would note relationship to poetic meaning]
- [Would discuss technical aspects of usage]

## Examples

[Would provide 3-5 examples from notable poems]

## Historical Context

[Would discuss the development of this device in literary history]

## How to Identify

When reading a poem, you can identify this device by:

- [Would provide specific recognition strategies]
- [Would explain particular patterns to look for]
- [Would note common contexts where this device appears]

## Effective Usage

For poets interested in using this device in their work:

- [Would provide tips for incorporating the device effectively]
- [Would note potential pitfalls to avoid]
- [Would suggest exercises to practice this technique]

## Related Devices

This literary device is often used in conjunction with or compared to:

- [Would list 2-3 related literary devices]
- [Would explain how they complement or contrast with this device]

Would you like to know more about how this device functions in specific poetic traditions or time periods?`;
        }
    }
    
    /**
     * Extract the literary device from user input
     * @param {string} input - User input
     * @returns {string|null} Literary device or null
     */
    extractLiteraryDevice(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of literary devices
        for (const device in this.literaryDevices) {
            if (normalizedInput.includes(device) || normalizedInput.includes(this.literaryDevices[device].name.toLowerCase())) {
                return device;
            }
        }
        
        // Check for patterns like "what is X" or "explain X"
        const devicePatterns = [
            { regex: /\b(?:what\s+is|what's|meaning\s+of|definition\s+of|define|explain)\s+(?:a|an)?\s*([a-z]+(?:\s+[a-z]+)?)/i, group: 1 },
            { regex: /\b(?:how\s+does|what\s+does|how\s+do\s+you\s+use)\s+(?:a|an)?\s*([a-z]+(?:\s+[a-z]+)?)\s+(?:work|function|mean)/i, group: 1 },
            { regex: /\b(?:tell\s+me\s+about)\s+([a-z]+(?:\s+[a-z]+)?)/i, group: 1 }
        ];
        
        for (const pattern of devicePatterns) {
            const match = input.match(pattern.regex);
            if (match && match[pattern.group]) {
                const potentialDevice = match[pattern.group].trim().toLowerCase();
                
                // Check if it's similar to a known device
                for (const device in this.literaryDevices) {
                    if (device.includes(potentialDevice) || potentialDevice.includes(device) || 
                        this.literaryDevices[device].name.toLowerCase().includes(potentialDevice) || 
                        potentialDevice.includes(this.literaryDevices[device].name.toLowerCase())) {
                        return device;
                    }
                }
                
                // If no match found but it seems like a literary device, return it
                return potentialDevice;
            }
        }
        
        return null;
    }
    
    /**
     * Explain a poetry form based on user input
     * @param {string} userInput - User's input about a poetry form
     * @returns {string} Poetry form explanation
     */
    explainPoetryForm(userInput) {
        // Extract the poetry form from user input
        const form = this.extractPoemForm(userInput);
        
        if (!form) {
            return `# Poetic Forms

In a complete implementation with an AI model and poetry expertise, I would provide detailed explanations of specific poetic forms, including their structures, histories, and notable examples.

Poetic forms are established patterns and structures that poetry can follow. They often have specific:
- Line counts
- Rhyme schemes
- Metrical patterns
- Stanza arrangements
- Historical and cultural contexts

Common poetic forms include:

- **Sonnet**: A 14-line poem with various rhyme schemes
- **Haiku**: A Japanese form with three lines of 5, 7, and 5 syllables
- **Limerick**: A humorous five-line form with AABBA rhyme scheme
- **Villanelle**: A 19-line form with repeating lines and refrains
- **Free Verse**: Poetry without regular patterns of rhyme or meter
- **Ballad**: A narrative poem typically with quatrains and a storytelling focus
- **Sestina**: A complex form using six end-words in a specific pattern

To learn about a specific form, please mention which one you're interested in, such as:
- "What is a sonnet?"
- "How do I write a haiku?"
- "Explain the structure of a villanelle"`;
        }
        
        // Check if we have information about this form
        if (form in this.poetryForms) {
            const formInfo = this.poetryForms[form];
            
            return `# ${formInfo.name}: Poetic Form

In a complete implementation with an AI model and poetry expertise, I would provide a comprehensive explanation of the ${formInfo.name} as a poetic form, including its structure, history, variations, and notable examples.

## Definition and Structure

${formInfo.description}

${formInfo.structure ? `**Structure**: ${formInfo.structure}` : ""}

${formInfo.types ? `## Variations\n\n${formInfo.types.map(type => `### ${type.name}\n${type.structure}`).join('\n\n')}` : ""}

## Historical Context

[Would provide information about when and where this form originated]

[Would discuss how the form has evolved over time]

[Would explain cultural significance and traditions associated with this form]

## Notable Examples

${formInfo.examples ? formInfo.examples.map(example => `"${example.title ? example.title + '"' : ''} ${example.excerpt ? `\n\n${example.excerpt}\n\n` : ''} ${example.author ? `— ${example.author}` : ''}`).join('\n\n') : "[Would provide 3-5 exemplary poems in this form]"}

## Writing Guidelines

For poets interested in working with this form:

- [Would provide specific tips for approaching this form]
- [Would note common challenges and solutions]
- [Would suggest modifications for contemporary usage]
- [Would offer step-by-step guidance for crafting a poem in this form]

## Contemporary Relevance

[Would discuss how this form is used by contemporary poets]

[Would note any modern adaptations or innovations]

[Would explore why this form continues to be meaningful today]

Would you like me to provide more specific guidance on writing a ${formInfo.name}, or would you prefer examples from particular time periods or poetic movements?`;
        } else {
            // Generic response for forms not in our database
            return `# ${this.capitalizeFirstLetter(form)}: Poetic Form

In a complete implementation with an AI model and poetry expertise, I would provide a comprehensive explanation of the ${this.capitalizeFirstLetter(form)} as a poetic form, including its structure, history, and notable examples.

## Definition and Structure

[Would provide a detailed definition of this poetic form]

[Would explain the structural requirements, including line count, rhyme scheme, metrical patterns, and stanza arrangement]

## Historical Context

[Would provide information about when and where this form originated]

[Would discuss how the form has evolved over time]

[Would explain cultural significance and traditions associated with this form]

## Notable Examples

[Would provide 3-5 exemplary poems in this form]

## Writing Guidelines

For poets interested in working with this form:

- [Would provide specific tips for approaching this form]
- [Would note common challenges and solutions]
- [Would suggest modifications for contemporary usage]
- [Would offer step-by-step guidance for crafting a poem in this form]

## Contemporary Relevance

[Would discuss how this form is used by contemporary poets]

[Would note any modern adaptations or innovations]

[Would explore why this form continues to be meaningful today]

Would you like me to provide more specific guidance on writing in this form, or would you prefer information about related poetic forms?`;
        }
    }
    
    /**
     * Provide rhyming words based on user input
     * @param {string} userInput - User's input requesting rhymes
     * @returns {string} Rhyme suggestions
     */
    provideRhymes(userInput) {
        // Extract the word to rhyme with
        const wordToRhyme = this.extractRhymeWord(userInput);
        
        if (!wordToRhyme) {
            return `# Rhyming in Poetry

In a complete implementation with an AI model and poetry expertise, I would provide rhyming words based on your request, along with explanations of different rhyme types and their uses in poetry.

Rhyme is the correspondence of sound between words, particularly at the ends of lines in poetry. Different types of rhymes include:

- **Perfect/Full Rhyme**: Words with identical stressed vowel sounds and any following sounds (light/might)
- **Slant/Imperfect Rhyme**: Words with similar but not identical sounds (love/move)
- **Eye Rhyme**: Words that look like they should rhyme but don't (love/prove)
- **Identical Rhyme**: Using the same word or homonym (bear/bear)
- **Internal Rhyme**: Rhyming within a line rather than at line endings

To suggest rhyming words, I need to know which word you'd like rhymes for. You can ask:
- "What rhymes with 'dream'?"
- "Find rhymes for 'light'"
- "Give me words that rhyme with 'heart'"`;
        }
        
        return `# Rhymes for "${wordToRhyme}"

In a complete implementation with an AI model and poetry expertise, I would provide a comprehensive set of rhyming words for "${wordToRhyme}", categorized by rhyme type and quality.

## Perfect Rhymes

[Would provide 8-12 perfect rhymes with "${wordToRhyme}"]

## Near/Slant Rhymes

[Would provide 8-12 near rhymes with "${wordToRhyme}"]

## One-Syllable Rhymes
- [Would list simple rhymes]

## Two-Syllable Rhymes
- [Would list rhymes with same syllable count]

## Compound/Phrasal Rhymes
- [Would suggest multi-word rhymes for more creative options]

## Rhyme Quality Considerations

When choosing a rhyme, consider:

- **Predictability**: Less common rhymes often create more interesting poetry
- **Strength**: How closely the sounds match affects the rhythm and flow
- **Semantic relationship**: Consider how the meaning of rhyming words relates to your theme
- **Position**: End rhymes have different effects than internal rhymes

## Using These Rhymes

Here are a few ways to incorporate these rhymes effectively:

- [Would provide tips for integrating rhymes naturally]
- [Would suggest approaches to avoid forced-sounding rhymes]
- [Would explain how to balance rhyme with other poetic elements]

## Rhyme Scheme Options

If you're building a rhyme scheme, consider these patterns:

- **AABB**: Simple paired rhymes
- **ABAB**: Alternating rhyme pattern
- **ABBA**: Enclosed rhyme pattern
- [Would suggest additional schemes appropriate for your needs]

Would you like additional rhyming words, rhymes with a different word, or advice about incorporating rhyme into a specific poetic form?`;
    }
    
    /**
     * Extract a word to rhyme with from user input
     * @param {string} input - User input
     * @returns {string|null} Word to rhyme with or null
     */
    extractRhymeWord(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for patterns like "rhymes with X" or "rhyming words for X"
        const rhymePatterns = [
            { regex: /\b(?:rhyme|rhymes|rhyming)\s+(?:with|for)\s+['"]?([a-z]+)['"]?/i, group: 1 },
            { regex: /\b(?:what|words|find)\s+(?:rhymes|rhyming words)\s+(?:with|for)\s+['"]?([a-z]+)['"]?/i, group: 1 },
            { regex: /\b(?:words\s+that\s+rhyme\s+with)\s+['"]?([a-z]+)['"]?/i, group: 1 }
        ];
        
        for (const pattern of rhymePatterns) {
            const match = input.match(pattern.regex);
            if (match && match[pattern.group]) {
                return match[pattern.group].trim().toLowerCase();
            }
        }
        
        return null;
    }
    
    /**
     * Analyze meter in poetry based on user input
     * @param {string} userInput - User's input about meter
     * @returns {string} Meter analysis
     */
    analyzeMeter(userInput) {
        return `# Poetic Meter and Rhythm

In a complete implementation with an AI model and poetry expertise, I would provide a detailed explanation of poetic meter, rhythm analysis of specific lines, and guidance on working with metrical patterns in poetry.

## Understanding Poetic Meter

Meter in poetry refers to the pattern of stressed and unstressed syllables in a line. The basic unit of meter is the foot, which is a combination of stressed and unstressed syllables.

### Common Metrical Feet

${Object.entries(this.meters).map(([key, value]) => `- **${value.name}** (${key}): ${value.description}
  Example: "${value.example}"`).join('\n\n')}

### Line Lengths

${Object.entries(this.metricFeet).map(([key, value]) => `- **${this.capitalizeFirstLetter(key)}**: ${value}`).join('\n')}

## Meter in Practice

Common metrical patterns include:

- **Iambic Pentameter**: Five iambic feet per line (Shakespeare's sonnets)
- **Trochaic Tetrameter**: Four trochaic feet per line (Poe's "The Raven")
- **Anapestic Tetrameter**: Four anapestic feet per line (Moore's "'Twas the Night Before Christmas")
- **Dactylic Hexameter**: Six dactylic feet per line (Classical epics)

## Scansion: Analyzing Meter

Scansion is the process of marking the stresses in a poem to analyze its metrical pattern:

1. Mark each syllable as stressed (´) or unstressed (˘)
2. Group syllables into feet
3. Identify the predominant metrical pattern
4. Note variations and substitutions

[Would provide a visual example of scanned lines]

## Functions of Meter

Meter serves several purposes in poetry:

- Creates musicality and rhythm
- Establishes tone and mood
- Emphasizes particular words or ideas
- Generates expectations that can be fulfilled or subverted
- Connects to poetic traditions and forms

## Working with Meter

For poets interested in metrical composition:

- [Would provide strategies for writing in specific meters]
- [Would explain how to achieve metrical substitution effectively]
- [Would offer exercises for developing metrical skills]
- [Would discuss balancing metrical precision with natural language]

Would you like me to scan specific lines of poetry for their metrical pattern, explain a particular meter in more detail, or provide guidance on writing in a specific metrical form?`;
    }
    
    /**
     * Discuss poetry history based on user input
     * @param {string} userInput - User's input about poetry history
     * @returns {string} Poetry history discussion
     */
    discussPoetryHistory(userInput) {
        return `# Poetry Movements and History

In a complete implementation with an AI model and poetry expertise, I would provide a detailed discussion of poetry history, movements, and traditions based on your specific interests.

## Major Poetic Movements

### Classical Period
- **Ancient Greek and Roman Poetry** (800 BCE - 500 CE)
  - Epic traditions (Homer, Virgil)
  - Lyric poetry (Sappho, Catullus)
  - Development of formal structures

### Medieval and Renaissance
- **Medieval Poetry** (500 - 1400)
  - Religious verse and hymns
  - Epic poetry and romances
  - Troubadour traditions
  
- **Renaissance** (1400 - 1600)
  - Sonnet development (Petrarch, Shakespeare)
  - Classical revival
  - Formalization of poetic structures

### Modern Developments
- **Romanticism** (1800 - 1850)
  - Emphasis on emotion, nature, and individualism
  - Reaction against rationalism and industrialization
  - Wordsworth, Coleridge, Keats, Shelley, Byron

- **Modernism** (1900 - 1945)
  - Fragmentation and experimentation
  - Free verse and new forms
  - T.S. Eliot, Ezra Pound, Wallace Stevens

- **Postmodernism and Contemporary** (1945 - Present)
  - Language poetry and experimentation
  - Identity-based movements
  - Global and multicultural influences

## Key Traditions and Schools

- **Imagism**: Focus on precise imagery and clear language (H.D., Pound)
- **Confessional Poetry**: Personal, autobiographical themes (Plath, Sexton, Lowell)
- **Beat Poetry**: Spontaneity, spirituality, counterculture (Ginsberg, Kerouac)
- **New Formalism**: Return to traditional forms with contemporary themes
- **Language Poetry**: Focus on language itself rather than meaning or expression

## Multicultural Poetic Traditions

- **Harlem Renaissance**: African American cultural flourishing (Hughes, McKay)
- **Negritude**: Francophone African and Caribbean poetic movement
- **Latin American Poetry**: Magical realism and political engagement
- **East Asian Poetic Forms**: Haiku, tanka, and their global influence

## Evolution of Form and Technique

- [Would discuss shifts from formal to free verse]
- [Would explain the development of specific techniques]
- [Would note technological and social influences on poetic form]

## Contemporary Directions

- [Would discuss current trends in poetic practice]
- [Would note the influence of social media and technology]
- [Would highlight emerging voices and approaches]

Would you like more detailed information about a specific period, movement, or tradition in poetry history?`;
    }
    
    /**
     * Provide information about a poet based on user input
     * @param {string} userInput - User's input about a poet
     * @returns {string} Poet information
     */
    providePoetInformation(userInput) {
        return `# Poet Profile

In a complete implementation with an AI model and poetry expertise, I would provide detailed information about a specific poet based on your query, including their life, work, style, and influence.

## Biographical Overview

- **Life Span**: [Would provide birth and death years]
- **Cultural Context**: [Would discuss geographic, historical, and cultural setting]
- **Major Life Events**: [Would note significant personal experiences that influenced their work]
- **Literary Development**: [Would trace their evolution as a poet]

## Poetic Style and Themes

### Stylistic Features
- [Would analyze characteristic techniques and approaches]
- [Would discuss formal preferences and innovations]
- [Would note language use and distinctive vocabulary]
- [Would describe rhythm and sound patterns]

### Thematic Concerns
- [Would identify recurring subjects and themes]
- [Would discuss philosophical or political positions]
- [Would note evolution of themes throughout career]
- [Would connect themes to historical context]

## Major Works

### Significant Collections
- [Would list important published works with dates]
- [Would note reception and impact of each]

### Notable Individual Poems
- [Would identify most famous or influential poems]
- [Would provide brief analysis of significance]
- [Would note where to find these works]

## Literary Context

### Influences
- [Would discuss poets and writers who shaped their work]
- [Would note intellectual and artistic movements they engaged with]

### Impact and Legacy
- [Would explain their influence on subsequent poets]
- [Would discuss critical reception over time]
- [Would note their place in literary canon]

## Recommended Reading

### Primary Works
- [Would suggest starting points in their bibliography]
- [Would recommend best editions or translations]

### Secondary Sources
- [Would recommend biographies and criticism]
- [Would note digital archives or resources]

## Representative Passage

[Would provide a short, characteristic excerpt from their poetry]

Would you like more specific information about this poet's particular works, their relationship to a specific movement, or recommendations for similar poets you might enjoy?`;
    }
    
    /**
     * Discuss poetry in general based on user input
     * @param {string} userInput - User's general input about poetry
     * @returns {string} General poetry discussion
     */
    discussPoetryGeneral(userInput) {
        return `# The Art and Craft of Poetry

In a complete implementation with an AI model and poetry expertise, I would provide a thoughtful discussion of poetry as an art form, responsive to your specific interests and questions.

## The Nature of Poetry

Poetry is a form of literature that uses aesthetic and rhythmic qualities of language to evoke meanings beyond literal interpretation. It differs from prose in its:

- Compression of language
- Emphasis on sound and rhythm
- Use of line breaks and white space
- Heightened attention to imagery and metaphor
- Concentration of multiple meanings

## Why Poetry Matters

Poetry serves several important functions:

- Expresses complex emotions and experiences
- Preserves cultural memory and traditions
- Challenges conventional thinking and perception
- Creates beauty through language
- Connects readers across time, space, and experience
- Provides consolation and insight in difficult times

## Reading Poetry Effectively

To engage more deeply with poetry:

- Read aloud to experience sound and rhythm
- Read multiple times, allowing new meanings to emerge
- Consider multiple possible interpretations
- Notice patterns in imagery, sound, and structure
- Reflect on your emotional and intellectual response
- Connect to your own experiences and knowledge

## Writing Poetry

For those interested in writing poetry:

- Read widely across poetic traditions
- Experiment with different forms and approaches
- Develop awareness of language's sensory dimensions
- Practice observation and descriptive skills
- Revise with attention to precision and concision
- Consider the relationship between content and form

## Approaches to Poetry

Different readers and writers approach poetry through various lenses:

- **Formal**: Focusing on structure, meter, and technical elements
- **Expressive**: Emphasizing emotional authenticity and personal voice
- **Mimetic**: Representing reality and human experience
- **Pragmatic**: Concerned with poetry's effects on readers
- **Postmodern**: Questioning language, meaning, and traditional approaches

## Contemporary Poetry

Today's poetry landscape is characterized by:

- Diverse voices and perspectives
- Hybrid forms and cross-genre experimentation
- Engagement with digital media and technologies
- Connection to social and political movements
- Global exchange and influence

Would you like to explore any specific aspect of poetry in more depth? I can provide guidance on reading, writing, or appreciating particular poetic forms or traditions.`;
    }
    
    /**
     * Get poetry suggestions based on user interaction
     * @param {string} requestType - Type of poetry request
     * @returns {Array<string>} Poetry suggestions
     */
    getPoetrySuggestions(requestType) {
        const suggestions = [];
        
        // Add type-specific suggestions
        if (requestType === "poem_generation") {
            suggestions.push("Write a haiku about autumn");
            suggestions.push("Create a sonnet about love");
            suggestions.push("Generate a free verse poem about hope");
        } else if (requestType === "poem_analysis") {
            suggestions.push("What are the key themes in 'The Road Not Taken'?");
            suggestions.push("Analyze the imagery in this poem");
            suggestions.push("Explain the meaning of these verses");
        } else if (requestType === "literary_device_explanation") {
            suggestions.push("What is alliteration and how is it used?");
            suggestions.push("Explain the difference between metaphor and simile");
            suggestions.push("How does personification work in poetry?");
        } else if (requestType === "form_explanation") {
            suggestions.push("How do I write a villanelle?");
            suggestions.push("What is the structure of a sonnet?");
            suggestions.push("Explain the rules for writing haiku");
        } else if (requestType === "rhyme_assistance") {
            suggestions.push("What are words that rhyme with 'light'?");
            suggestions.push("Find slant rhymes for 'heart'");
            suggestions.push("Give me rhyming words for 'dream'");
        } else if (requestType === "meter_analysis") {
            suggestions.push("Explain iambic pentameter");
            suggestions.push("What is the difference between trochaic and iambic meter?");
            suggestions.push("How do I scan a line of poetry?");
        } else if (requestType === "poetry_history") {
            suggestions.push("Tell me about the Romantic poetry movement");
            suggestions.push("How did Modernism change poetry?");
            suggestions.push("What are the main characteristics of Beat poetry?");
        } else if (requestType === "poet_information") {
            suggestions.push("Who was Emily Dickinson?");
            suggestions.push("Tell me about the work of Langston Hughes");
            suggestions.push("What are Pablo Neruda's most famous poems?");
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "What makes a good poem?",
                "How can I improve my poetry writing?",
                "Recommend some contemporary poets to read",
                "What are the elements of a powerful poetic image?",
                "How do line breaks affect meaning in poetry?",
                "What are the benefits of reading poetry?",
                "How has poetry changed in the digital age?"
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
                'jaat-mode11-preferences',
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
            localStorage.removeItem('jaat-mode11-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Save a poem
     * @param {Object} poem - Poem to save
     * @returns {boolean} Success status
     */
    savePoem(poem) {
        if (!poem) return false;
        
        // Add the poem to saved poems
        this.state.savedPoems.push({
            ...poem,
            savedAt: new Date().toISOString()
        });
        
        // Save updated poems
        this.savePreferences({ savedPoems: this.state.savedPoems });
        return true;
    }
    
    /**
     * Set current poem
     * @param {string} poem - Poem text
     * @returns {boolean} Success status
     */
    setCurrentPoem(poem) {
        if (!poem) return false;
        
        // Set current poem
        this.state.currentPoem = poem;
        
        // Save updated current poem
        this.savePreferences({ currentPoem: poem });
        return true;
    }
    
    /**
     * Set poetry style preference
     * @param {string} style - Poetry style
     * @returns {boolean} Success status
     */
    setPoetryStyle(style) {
        if (!style) return false;
        
        // Set poetry style
        this.state.poetryStyle = style;
        
        // Save updated poetry style
        this.savePreferences({ poetryStyle: style });
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
            poetryStyle: this.state.poetryStyle,
            preferredForms: this.state.preferredForms,
            preferredThemes: this.state.preferredThemes,
            savedPoemCount: this.state.savedPoems.length,
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
    window.jaatAIModes.poet = new PoetMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PoetMode;
}
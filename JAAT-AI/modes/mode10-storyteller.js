/**
 * JAAT-AI Storyteller Mode
 * AI mode specialized in creative storytelling, narrative development, and character creation
 * Mode ID: 10
 */

class StorytellerMode {
    constructor() {
        // Mode metadata
        this.id = "10";
        this.name = "Storyteller";
        this.description = "Your AI creative writing partner for stories, narratives, and character development";
        this.icon = "ri-book-open-line";
        this.color = "#8b5cf6"; // Purple color
        this.category = "creativity";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 5000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 8, // 1-10 scale (higher = more personality)
            creativityLevel: 9, // 1-10 scale
            formalityLevel: 4, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            narrativeStructureEnabled: true,
            characterDevelopmentEnabled: true,
            worldBuildingEnabled: true
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            currentStory: null,
            characters: [],
            plotPoints: [],
            settings: [],
            storyType: "general", // fantasy, sci-fi, mystery, romance, etc.
            storyTone: "neutral", // dark, light, humorous, serious, etc.
            sessionStartTime: new Date(),
            responseCount: 0
        };
        
        // Story structures
        this.storyStructures = {
            "three_act": {
                name: "Three-Act Structure",
                description: "Classic beginning, middle, and end with rising action and climax",
                acts: [
                    "Act 1: Setup - Introduce characters, setting, and conflict",
                    "Act 2: Confrontation - Develop conflict, create obstacles, raise stakes",
                    "Act 3: Resolution - Climax, falling action, and conclusion"
                ]
            },
            "heros_journey": {
                name: "Hero's Journey",
                description: "Joseph Campbell's monomyth structure used in many epic tales",
                stages: [
                    "Ordinary World - Hero's normal life before the adventure",
                    "Call to Adventure - Challenge or quest is proposed",
                    "Refusal of the Call - Hero hesitates",
                    "Meeting the Mentor - Guidance from a wise figure",
                    "Crossing the Threshold - Hero commits to the adventure",
                    "Tests, Allies, Enemies - Hero faces challenges and makes relationships",
                    "Approach to the Inmost Cave - Hero prepares for major challenge",
                    "Ordeal - Hero faces a life or death crisis",
                    "Reward - Hero survives and gains something valuable",
                    "The Road Back - Hero returns to ordinary world",
                    "Resurrection - Final dangerous encounter",
                    "Return with the Elixir - Hero brings something to transform ordinary world"
                ]
            },
            "five_act": {
                name: "Five-Act Structure",
                description: "Dramatic structure used by Shakespeare and many playwrights",
                acts: [
                    "Act 1: Exposition - Introduce characters and setting",
                    "Act 2: Rising Action - Complication of the plot begins",
                    "Act 3: Climax - Turning point of the story",
                    "Act 4: Falling Action - Events after the climax",
                    "Act 5: Denouement - Resolution and conclusion"
                ]
            },
            "seven_point": {
                name: "Seven-Point Story Structure",
                description: "Focused on plot points and character arcs",
                points: [
                    "Hook - Grab reader's attention, introduce protagonist",
                    "Plot Turn 1 - Event that sets the story in motion",
                    "Pinch Point 1 - First encounter with antagonistic force",
                    "Midpoint - Character moves from reaction to action",
                    "Pinch Point 2 - Antagonistic force applies pressure",
                    "Plot Turn 2 - Final piece of information needed to overcome",
                    "Resolution - Climax and conclusion"
                ]
            },
            "save_the_cat": {
                name: "Save the Cat",
                description: "Blake Snyder's modern approach to screenwriting",
                beats: [
                    "Opening Image - First impression of story world",
                    "Theme Stated - What the story is really about",
                    "Setup - Establish main character's world",
                    "Catalyst - Inciting incident that disrupts status quo",
                    "Debate - Protagonist hesitates to change",
                    "Break into Two - Protagonist decides to act",
                    "B Story - Secondary plot often involving romance",
                    "Fun and Games - Promise of the premise",
                    "Midpoint - Raises stakes and shifts goals",
                    "Bad Guys Close In - Antagonistic forces advance",
                    "All Is Lost - Protagonist's lowest point",
                    "Dark Night of the Soul - Protagonist's moment of reflection",
                    "Break into Three - New plan to resolve the story",
                    "Finale - Execution of the new plan",
                    "Final Image - Mirror of the opening image showing change"
                ]
            }
        };
        
        // Character archetypes
        this.characterArchetypes = {
            "hero": "The main protagonist who embarks on a journey of growth",
            "mentor": "Wise guide who provides knowledge and support to the hero",
            "ally": "Friend or companion who helps the hero in their journey",
            "threshold_guardian": "Character who tests the hero before a major plot point",
            "herald": "Announces the need for change or brings crucial information",
            "shapeshifter": "Character whose loyalty or identity is uncertain",
            "shadow": "Represents the darkness, fears, or negative traits",
            "trickster": "Creates mischief and provides comic relief",
            "lover": "Represents desirability and often drives romantic plots",
            "caregiver": "Nurturing, supportive character often motivated by compassion",
            "ruler": "Character concerned with power, control, and order",
            "creator": "Innovative character driven by imagination and artistic vision",
            "everyman": "Relatable character representing ordinary people",
            "outlaw": "Rebellious character who challenges the status quo",
            "magician": "Transforms situations through special knowledge or power",
            "innocent": "Pure character whose optimism can change others"
        };
        
        // Genre characteristics
        this.genres = {
            "fantasy": {
                elements: ["Magic system", "Mythical creatures", "Quests", "Ancient prophecies", "Unique world"],
                tones: ["Epic", "Whimsical", "Dark", "Heroic", "Mythic"],
                examples: ["Lord of the Rings", "Harry Potter", "Game of Thrones"]
            },
            "sci_fi": {
                elements: ["Advanced technology", "Space travel", "Aliens", "Future societies", "Scientific concepts"],
                tones: ["Dystopian", "Utopian", "Hard sci-fi", "Space opera", "Cyberpunk"],
                examples: ["Dune", "The Expanse", "Neuromancer"]
            },
            "mystery": {
                elements: ["Crime", "Clues", "Red herrings", "Investigation", "Twist reveal"],
                tones: ["Cozy", "Noir", "Procedural", "Thriller", "Whodunit"],
                examples: ["Sherlock Holmes", "Gone Girl", "Knives Out"]
            },
            "romance": {
                elements: ["Relationship development", "Emotional connection", "Obstacles", "Character growth", "Happy ending"],
                tones: ["Sweet", "Steamy", "Historical", "Contemporary", "Tragic"],
                examples: ["Pride and Prejudice", "Outlander", "The Notebook"]
            },
            "horror": {
                elements: ["Fear", "Suspense", "Danger", "Unknown", "Atmosphere"],
                tones: ["Psychological", "Gore", "Supernatural", "Cosmic", "Body horror"],
                examples: ["The Shining", "Dracula", "Bird Box"]
            },
            "historical": {
                elements: ["Period details", "Historical events", "Cultural context", "Period dialogue", "Historical figures"],
                tones: ["Accurate", "Romanticized", "Revisionist", "Educational", "Dramatic"],
                examples: ["All the Light We Cannot See", "Wolf Hall", "The Book Thief"]
            }
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Help me create a character for my story",
            "Write a short story about a haunted house",
            "I need ideas for a science fiction plot",
            "How do I develop a compelling antagonist?",
            "Write the first paragraph of a mystery novel",
            "Help me overcome writer's block",
            "What's the best story structure for a romance?",
            "Give me examples of character motivations",
            "How can I build a fantasy world?",
            "Write dialogue between two characters meeting for the first time"
        ];
        
        // Special features
        this.features = {
            storyGeneration: true,
            plotDevelopment: true,
            characterCreation: true,
            worldBuilding: true,
            creativePrompts: true,
            dialogueWriting: true,
            narrativeStructure: true,
            descriptiveWriting: true,
            genreGuidance: true,
            writingTips: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 50,
            MAX_CHARACTERS: 10,
            MAX_PLOT_POINTS: 30,
            GREETING_PHRASES: [
                "Welcome to Storyteller mode! What creative tale shall we weave today?",
                "The blank page awaits... What story would you like to explore?",
                "Ready to embark on a narrative journey? How can I assist your storytelling?",
                "Every great story begins with a single idea. What's yours today?",
                "Your storytelling companion is ready! What kind of tale would you like to craft?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Storyteller mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set current story if provided
        if (options.story) {
            this.state.currentStory = options.story;
        }
        
        // Set story type if provided
        if (options.type && this.genres[options.type.toLowerCase()]) {
            this.state.storyType = options.type.toLowerCase();
        }
        
        // Set story tone if provided
        if (options.tone) {
            this.state.storyTone = options.tone.toLowerCase();
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode10-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Storyteller mode");
                
                // Load current story if saved
                if (this.state.userPreferences.currentStory) {
                    this.state.currentStory = this.state.userPreferences.currentStory;
                }
                
                // Load story type if saved
                if (this.state.userPreferences.storyType) {
                    this.state.storyType = this.state.userPreferences.storyType;
                }
                
                // Load story tone if saved
                if (this.state.userPreferences.storyTone) {
                    this.state.storyTone = this.state.userPreferences.storyTone;
                }
                
                // Load characters if saved
                if (this.state.userPreferences.characters) {
                    this.state.characters = this.state.userPreferences.characters;
                }
                
                // Load plot points if saved
                if (this.state.userPreferences.plotPoints) {
                    this.state.plotPoints = this.state.userPreferences.plotPoints;
                }
                
                // Load settings if saved
                if (this.state.userPreferences.settings) {
                    this.state.settings = this.state.userPreferences.settings;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode10-history');
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
        
        console.log(`Storyteller mode initialized with story: ${this.state.currentStory || "None"}`);
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
     * Process user input and generate a storytelling response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with storytelling content
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your creative storytelling companion. I can help you craft characters, build worlds, develop plots, or write stories. What would you like to create today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing storytelling request`);
        
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
        
        // Detect type of storytelling request
        const requestType = this.detectRequestType(userInput);
        
        // Set current story if detected
        const detectedStory = this.detectStory(userInput);
        if (detectedStory) {
            this.state.currentStory = detectedStory;
            this.savePreferences({ currentStory: detectedStory });
        }
        
        // Generate appropriate storytelling response
        const response = await this.generateStoryResponse(
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
                    'jaat-mode10-history',
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
     * Detect the type of storytelling request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for story generation request
        if (/\b(?:write|create|generate|tell)\s+(?:a|an|the)?\s*(?:story|tale|narrative)\b/i.test(normalizedInput)) {
            return "story_generation";
        }
        
        // Check for character creation request
        if (/\b(?:character|protagonist|antagonist|villain|hero)\s+(?:creation|development|design|profile|backstory)\b/i.test(normalizedInput) || 
            /\b(?:create|develop|design|make)\s+(?:a|an|the)?\s*(?:character|protagonist|antagonist|villain|hero)\b/i.test(normalizedInput)) {
            return "character_creation";
        }
        
        // Check for plot development request
        if (/\b(?:plot|story|narrative)\s+(?:development|structure|outline|arc|idea)\b/i.test(normalizedInput) ||
            /\b(?:develop|structure|outline)\s+(?:a|an|the)?\s*(?:plot|story|narrative)\b/i.test(normalizedInput)) {
            return "plot_development";
        }
        
        // Check for world building request
        if (/\b(?:world|setting|universe|realm)\s+(?:building|creation|development|design)\b/i.test(normalizedInput) ||
            /\b(?:create|build|develop|design)\s+(?:a|an|the)?\s*(?:world|setting|universe|realm)\b/i.test(normalizedInput)) {
            return "world_building";
        }
        
        // Check for dialogue writing request
        if (/\b(?:dialogue|conversation|discussion|exchange)\b/i.test(normalizedInput) ||
            /\b(?:write|create|generate)\s+(?:dialogue|conversation)\b/i.test(normalizedInput)) {
            return "dialogue_writing";
        }
        
        // Check for description writing request
        if (/\b(?:description|descriptive|describe|imagery|scene)\b/i.test(normalizedInput) ||
            /\b(?:write|create|generate)\s+(?:a|an|the)?\s*(?:description|scene)\b/i.test(normalizedInput)) {
            return "description_writing";
        }
        
        // Check for writing tips request
        if (/\b(?:writing|writer'?s?)\s+(?:tips|advice|help|block|technique|method|idea)\b/i.test(normalizedInput) ||
            /\b(?:how\s+to\s+write|improve\s+my\s+writing|become\s+a\s+better\s+writer)\b/i.test(normalizedInput)) {
            return "writing_tips";
        }
        
        // Check for genre guidance request
        if (/\b(?:genre|fantasy|sci-fi|science\s+fiction|mystery|thriller|horror|romance|historical|western)\b/i.test(normalizedInput)) {
            
            // Update story type if genre is mentioned
            for (const genre in this.genres) {
                if (normalizedInput.includes(genre.replace('_', ' '))) {
                    this.state.storyType = genre;
                    this.savePreferences({ storyType: genre });
                    break;
                }
            }
            
            return "genre_guidance";
        }
        
        // Check for story structure request
        if (/\b(?:structure|framework|outline|format|template|act|beat|scene|chapter)\b/i.test(normalizedInput)) {
            return "story_structure";
        }
        
        // Default to creative writing
        return "creative_writing";
    }
    
    /**
     * Detect story from user input
     * @param {string} input - User input
     * @returns {string|null} Detected story or null
     */
    detectStory(input) {
        // Story detection patterns
        const storyPatterns = [
            /(?:my|about|for)\s+(?:story|book|novel|tale|project)\s+(?:about|called|titled|named)?\s+["']?([^"',.?!]+)["']?/i,
            /(?:story|book|novel|tale|project)\s+(?:about|called|titled|named)\s+["']?([^"',.?!]+)["']?/i,
            /(?:writing|working on)\s+(?:a|an|the)?\s+(?:story|book|novel|tale|project)\s+(?:about|called|titled|named)?\s+["']?([^"',.?!]+)["']?/i
        ];
        
        for (const pattern of storyPatterns) {
            const match = input.match(pattern);
            if (match && match[1]) {
                return match[1].trim();
            }
        }
        
        return null;
    }
    
    /**
     * Generate a storytelling response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of storytelling request
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateStoryResponse(userInput, requestType, context = {}) {
        // In a real implementation, this would call an AI model API specialized in creative writing
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "story_generation":
                responseText = this.generateStory(userInput);
                break;
                
            case "character_creation":
                responseText = this.createCharacter(userInput);
                break;
                
            case "plot_development":
                responseText = this.developPlot(userInput);
                break;
                
            case "world_building":
                responseText = this.buildWorld(userInput);
                break;
                
            case "dialogue_writing":
                responseText = this.writeDialogue(userInput);
                break;
                
            case "description_writing":
                responseText = this.writeDescription(userInput);
                break;
                
            case "writing_tips":
                responseText = this.provideWritingTips(userInput);
                break;
                
            case "genre_guidance":
                responseText = this.provideGenreGuidance(userInput);
                break;
                
            case "story_structure":
                responseText = this.explainStoryStructure(userInput);
                break;
                
            default:
                responseText = this.generateCreativeWriting(userInput);
        }
        
        // Get appropriate storytelling suggestions
        const storySuggestions = this.getStorySuggestions(requestType);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            currentStory: this.state.currentStory,
            storyType: this.state.storyType,
            suggestions: storySuggestions
        };
    }
    
    /**
     * Generate a story based on user input
     * @param {string} userInput - User's input about story
     * @returns {string} Generated story
     */
    generateStory(userInput) {
        return `# Creative Story

In a complete implementation with an AI model, I would generate an original creative story based on your request. This would include compelling characters, vivid settings, and an engaging plot with narrative tension and resolution.

For a story about "${this.state.currentStory || "your requested topic"}", I would:

1. Create a narrative with a clear beginning, middle, and end
2. Develop interesting characters with distinct personalities
3. Establish a vivid setting that enhances the story
4. Build conflict and stakes that drive the plot forward
5. Craft dialogue that reveals character and advances the story
6. Include descriptive language to create imagery and atmosphere
7. Deliver a satisfying conclusion that resolves the central conflict

The story would incorporate elements of the ${this.state.storyType} genre and maintain a ${this.state.storyTone} tone throughout, while aiming to evoke emotional responses and maintain reader interest.

Would you like me to focus on developing a specific element of this story, such as characters, setting, or plot?`;
    }
    
    /**
     * Create a character based on user input
     * @param {string} userInput - User's input about character
     * @returns {string} Character creation
     */
    createCharacter(userInput) {
        return `# Character Creation

In a complete implementation with an AI model, I would create a detailed, well-rounded character based on your specifications. A compelling character would include:

## Character Profile

### Basic Information
- **Name**: Would generate an appropriate name for the character
- **Age**: Would establish an age fitting the character concept
- **Occupation**: Would create a suitable occupation or role
- **Physical Description**: Would describe appearance, mannerisms, and distinctive features

### Psychological Profile
- **Personality Traits**: Key characteristics that define behavior and interactions
- **Values and Beliefs**: Core principles that guide decisions
- **Fears and Insecurities**: Internal struggles that create vulnerability
- **Desires and Motivations**: What drives the character's actions
- **Intelligence and Skills**: Special abilities or knowledge

### Background
- **Upbringing**: Formative experiences and family dynamics
- **Key Life Events**: Moments that shaped the character
- **Cultural Background**: Influences from society and heritage
- **Education/Training**: Knowledge acquisition history

### Relationships
- **Family Connections**: Relationships with relatives
- **Friends and Allies**: Supportive connections
- **Enemies or Rivals**: Oppositional relationships
- **Romantic Interests**: Past and present romantic connections

### Character Arc Potential
- **Internal Conflict**: The character's personal struggle
- **Growth Opportunities**: How the character might evolve
- **Role in Story**: Function within the narrative (protagonist, antagonist, etc.)

### Unique Elements
- **Quirks and Habits**: Distinctive behaviors
- **Speech Patterns**: How the character communicates
- **Symbolic Elements**: Imagery or motifs associated with the character

Would you like me to develop a specific aspect of this character, such as their backstory, motivations, or relationships?`;
    }
    
    /**
     * Develop a plot based on user input
     * @param {string} userInput - User's input about plot
     * @returns {string} Plot development
     */
    developPlot(userInput) {
        return `# Plot Development

In a complete implementation with an AI model, I would create a structured plot outline based on your specifications. For a ${this.state.storyType} story with a ${this.state.storyTone} tone, I would develop:

## Plot Structure

### Act 1: Setup
- **Establishing the World**: Introduction to the setting and rules
- **Meeting the Characters**: Introduction of protagonist and supporting characters
- **Normal Life**: Showing the status quo before disruption
- **Inciting Incident**: Event that sets the story in motion
- **First Decision**: Protagonist's initial response to the change

### Act 2: Confrontation
- **Entering New Territory**: Protagonist ventures into unfamiliar situations
- **Trials and Challenges**: Series of escalating obstacles
- **Allies and Enemies**: Formation of relationships that help or hinder
- **Raising the Stakes**: Increasing what's at risk
- **Midpoint Twist**: Game-changing revelation or event
- **Complications**: New problems arise from earlier decisions
- **Darkest Moment**: Major setback or lowest point for the protagonist

### Act 3: Resolution
- **New Determination**: Protagonist finds renewed purpose
- **Final Preparation**: Gathering resources for the climax
- **Climactic Sequence**: Final confrontation with the main obstacle
- **Aftermath**: Immediate consequences of the climax
- **New Normal**: How the world has changed
- **Closing Image**: Final impression that reinforces the theme

## Plot Elements

### Central Conflict
- **External Conflict**: Tangible obstacles (person vs. person, nature, society, etc.)
- **Internal Conflict**: Protagonist's personal struggle

### Subplots
- **Supporting Character Arcs**: Secondary storylines
- **Thematic Explorations**: Elements that reinforce the central theme
- **Relationship Developments**: Evolution of key connections

### Plot Devices
- **Foreshadowing**: Hints of what's to come
- **Dramatic Irony**: Reader knows what characters don't
- **Plot Twists**: Unexpected turns in the narrative
- **Red Herrings**: False clues or misdirection

Would you like me to develop a specific aspect of this plot, such as the inciting incident, central conflict, or climactic sequence?`;
    }
    
    /**
     * Build a world based on user input
     * @param {string} userInput - User's input about world building
     * @returns {string} World building
     */
    buildWorld(userInput) {
        return `# World Building Guide

In a complete implementation with an AI model, I would create a detailed world-building framework for your ${this.state.storyType} story. Comprehensive world-building would include:

## Physical Environment

### Geography
- **Landscape**: Major terrain features (mountains, forests, deserts, etc.)
- **Climate**: Weather patterns and seasonal changes
- **Natural Resources**: Available materials and their distribution
- **Flora and Fauna**: Plant and animal life, including unique species

### Built Environment
- **Settlements**: Cities, towns, villages, and their layouts
- **Architecture**: Building styles and materials
- **Infrastructure**: Transportation, communication, utilities
- **Important Locations**: Key sites for the story

## Society and Culture

### Social Structure
- **Government**: Political systems and leadership
- **Economic System**: How goods and services are exchanged
- **Social Classes**: Hierarchies and mobility between groups
- **Laws and Justice**: Rules and their enforcement

### Cultural Elements
- **History**: Timeline of significant events
- **Languages**: Communication methods and variations
- **Religion/Beliefs**: Spiritual practices and philosophies
- **Education**: How knowledge is transmitted
- **Arts and Entertainment**: Creative expressions
- **Customs and Traditions**: Rituals, celebrations, taboos

## Speculative Elements (for fantasy/sci-fi)

### Magic System (Fantasy)
- **Rules and Limitations**: How magic works and what it can't do
- **Source of Magic**: Where magical power comes from
- **Practitioners**: Who can use magic and how they learn
- **Effects on Society**: How magic shapes the world

### Technology (Sci-Fi)
- **Level of Advancement**: General technological capabilities
- **Key Innovations**: Specific technologies that impact the story
- **Access and Distribution**: Who has technology and who doesn't
- **Impact on Society**: How technology shapes daily life

## Conflict Sources

### External Tensions
- **Between Groups**: Conflicts between nations, factions, species
- **Environmental Challenges**: Natural disasters, resource scarcity
- **Outside Threats**: Invaders or other external dangers

### Internal Divisions
- **Ideological Differences**: Competing belief systems
- **Power Struggles**: Competition for control or influence
- **Social Issues**: Problems within the society

## World Building Tips

1. **Consistency**: Ensure all elements work together logically
2. **Depth over Breadth**: Develop what's important to your story
3. **Lived-In Quality**: Add details that make the world feel real
4. **Show, Don't Tell**: Reveal the world through characters' experiences
5. **Connect to Themes**: Use world elements to reinforce story themes

Would you like me to develop a specific aspect of this world, such as its geography, culture, or history?`;
    }
    
    /**
     * Write dialogue based on user input
     * @param {string} userInput - User's input about dialogue
     * @returns {string} Dialogue writing
     */
    writeDialogue(userInput) {
        return `# Dialogue Writing Guide

In a complete implementation with an AI model, I would create natural, character-revealing dialogue based on your specifications. For a ${this.state.storyType} story with a ${this.state.storyTone} tone, effective dialogue would include:

## Dialogue Principles

### Character Voice
- Each character should speak in a distinct way that reflects their:
  - Background and education
  - Personality and emotional state
  - Goals and motivations
  - Relationship to the listener

### Purpose in Story
Effective dialogue should accomplish one or more of these functions:
- Reveal character
- Advance the plot
- Provide information
- Create conflict
- Build relationships
- Establish tone or mood

### Natural Speech Patterns
- Include interruptions, hesitations, and incomplete sentences
- Vary sentence length and structure
- Use contractions and informal language when appropriate
- Include personal speech quirks or catchphrases

### Subtext
- What characters don't say explicitly
- Hidden meanings behind the actual words
- What characters are really thinking vs. what they say

## Dialogue Format

### Basic Structure
- Use quotation marks around spoken words
- Start a new paragraph when speaker changes
- Include dialogue tags to identify speakers when needed
- Add action beats to show what characters are doing

### Example Format:
"I'm not sure about this," Jane said, crossing her arms. "It seems risky."

Tom raised an eyebrow. "Since when do you worry about risk?"

"Since it started involving other people." She turned away, her shoulders tense.

## Sample Dialogue Scenarios

- **First Meeting**: Characters encountering each other for the first time
- **Argument**: Characters in conflict revealing their values and motivations
- **Exposition**: Characters naturally revealing important information
- **Relationship Development**: Characters growing closer or further apart
- **Turning Point**: Dialogue that changes the course of the story

Would you like me to write specific dialogue for certain characters or situations in your story?`;
    }
    
    /**
     * Write descriptive text based on user input
     * @param {string} userInput - User's input about description
     * @returns {string} Descriptive writing
     */
    writeDescription(userInput) {
        return `# Descriptive Writing Guide

In a complete implementation with an AI model, I would create vivid, evocative descriptions based on your specifications. For a ${this.state.storyType} story with a ${this.state.storyTone} tone, effective description would include:

## Descriptive Writing Principles

### Sensory Details
Engage multiple senses to create immersive description:
- **Sight**: Visual details including colors, shapes, movement, light
- **Sound**: Ambient noise, voices, music, silence
- **Touch**: Textures, temperature, physical sensations
- **Smell**: Aromas, scents that evoke memories or emotions
- **Taste**: Flavors that enhance the experience

### Specificity
- Use concrete, specific details rather than generalizations
- Choose precise nouns and active verbs
- Include distinctive features that make scenes or characters unique

### Emotional Resonance
- Select details that evoke emotion or mood
- Connect physical description to emotional states
- Use setting to reflect character feelings

### Rhythm and Pacing
- Vary sentence length for effect
- Use shorter sentences for tension or action
- Use longer, flowing sentences for contemplative moments

## Description Categories

### Setting Description
- **Establishing shots**: Broad view of the location
- **Focus points**: Key elements that draw attention
- **Atmospheric elements**: Details that create mood
- **Contextual details**: How the setting relates to story or character

### Character Description
- **Physical appearance**: How a character looks
- **Body language**: How a character moves and gestures
- **Voice and speech patterns**: How a character sounds
- **Personal style**: Clothing, accessories, presentation choices

### Action Description
- **Movement sequence**: Step-by-step progression
- **Pacing control**: Slowing down or speeding up time
- **Focus transitions**: Shifting perspective during action
- **Impact emphasis**: Highlighting consequences of actions

## Description Techniques

### Metaphor and Simile
Create fresh, unexpected comparisons that illuminate meaning

### Personification
Give human qualities to non-human elements

### Contrast
Highlight qualities by showing opposites

### Selective Detail
Choose only the most significant details rather than exhaustive description

Would you like me to write a specific description for a setting, character, or action in your story?`;
    }
    
    /**
     * Provide writing tips based on user input
     * @param {string} userInput - User's input about writing
     * @returns {string} Writing tips
     */
    provideWritingTips(userInput) {
        // Check for writer's block specific question
        if (/writer'?s?\s+block/i.test(userInput)) {
            return `# Overcoming Writer's Block

Writer's block is a common challenge even for experienced writers. Here are strategies to help you break through and get your creativity flowing again:

## Understanding Writer's Block

Writer's block typically stems from:
- Perfectionism and fear of failure
- Unclear direction or lack of planning
- Mental fatigue or burnout
- External pressures or distractions
- Internal critic becoming too loud

## Immediate Strategies to Overcome Block

### 1. Freewriting
- Set a timer for 10-15 minutes
- Write continuously without stopping
- Don't worry about quality, grammar, or relevance
- Just keep your hand (or fingers) moving

### 2. Change Your Environment
- Move to a different location
- Alter your surroundings (lighting, temperature, etc.)
- Take a walk in nature
- Work in a coffee shop or library

### 3. Skip Ahead
- If you're stuck on a scene, write a different one
- Jump to a part you're excited about
- Leave yourself a note: [FIGURE THIS OUT LATER]
- Connect the dots afterwards

### 4. Use Writing Prompts
- Random word or image prompts
- "What if?" scenarios for your characters
- Character interview questions
- First line generators

### 5. Lower the Stakes
- Give yourself permission to write badly
- Focus on quantity over quality for first drafts
- Remember: you can always revise later
- No one needs to see your early drafts

## Preventative Practices

### 1. Establish a Routine
- Write at the same time each day
- Create a pre-writing ritual
- Set achievable daily word count goals
- Build momentum through consistency

### 2. Outline and Plan
- Create a loose roadmap for your story
- Know key plot points before writing
- Develop character profiles
- Prepare scene cards or beat sheets

### 3. Maintain Creative Well-being
- Read widely in and outside your genre
- Take regular breaks
- Exercise to stimulate brain function
- Get enough sleep

### 4. Connect with Other Writers
- Join writing groups or workshops
- Share your struggles
- Participate in writing challenges
- Find an accountability partner

## When Nothing Else Works

- Take a complete break for a few days
- Work on a different creative project
- Try a different writing format or genre
- Revisit your passion for the project
- Consider if the project needs major rethinking

Remember that writer's block is temporary. Every writer experiences it, and every writer eventually breaks through it.

Would you like specific writing prompts related to your current project to help spark ideas?`;
        }
        
        // Generic writing tips
        return `# Creative Writing Tips

In a complete implementation with an AI model and creative writing expertise, I would provide specific writing advice tailored to your needs. Here are foundational tips that can help improve your storytelling:

## Craft Fundamentals

### Character Development
- Create characters with clear desires, flaws, and internal conflicts
- Ensure characters have distinct voices and personalities
- Allow characters to make mistakes and learn from them
- Show character through actions rather than description

### Plot Construction
- Start with a compelling inciting incident
- Maintain tension by creating obstacles for your protagonist
- Ensure cause and effect logic between story events
- Build toward a climax that tests your protagonist's growth
- Provide a resolution that satisfies the story's promises

### Setting and Description
- Use sensory details to make settings vivid
- Choose descriptive details that advance plot or reveal character
- Balance description with action and dialogue
- Create settings that enhance the story's themes

### Dialogue Crafting
- Make dialogue sound natural while being more focused than real speech
- Give each character a distinct way of speaking
- Use dialogue to reveal character and advance plot
- Include subtext – meaning beneath the surface words

## Writing Process

### Drafting Effectively
- Write first drafts without self-editing
- Set achievable daily or weekly word count goals
- Write forward momentum scenes when stuck
- Consider outlining for complex stories

### Revision Strategies
- Let first drafts rest before revising
- Read your work aloud to catch awkward phrasing
- Cut unnecessary words, scenes, and characters
- Ensure each scene serves multiple purposes
- Get feedback from trusted readers

### Overcoming Challenges
- Recognize that writer's block is temporary
- Try writing exercises to spark creativity
- Read widely in and outside your genre
- Establish consistent writing habits

## Technical Elements

### Point of View
- Choose viewpoint carefully (first-person, third-person limited, etc.)
- Maintain consistency in perspective
- Consider what each POV reveals and conceals

### Show vs. Tell
- Show emotions through physical reactions and actions
- Tell to summarize or transition between scenes
- Find the right balance for your story's pace

### Narrative Voice
- Develop a consistent narrative voice
- Align voice with genre expectations
- Consider how voice affects reader experience

### Pacing
- Vary sentence and paragraph length for rhythm
- Use shorter sentences for action and tension
- Use longer sentences for contemplative moments
- Balance scene and summary

Would you like more specific guidance on any of these areas for your ${this.state.currentStory || "story"}?`;
    }
    
    /**
     * Provide genre guidance based on user input
     * @param {string} userInput - User's input about genre
     * @returns {string} Genre guidance
     */
    provideGenreGuidance(userInput) {
        // Get genre-specific guidance if we have it
        const genre = this.state.storyType;
        if (this.genres[genre]) {
            const genreInfo = this.genres[genre];
            
            return `# Writing in the ${this.capitalizeFirstLetter(genre.replace('_', ' '))} Genre

## Core Elements of ${this.capitalizeFirstLetter(genre.replace('_', ' '))} Fiction

### Essential Components
${genreInfo.elements.map(element => `- **${element}**`).join('\n')}

### Common Tones and Approaches
${genreInfo.tones.map(tone => `- ${tone}`).join('\n')}

### Notable Examples
${genreInfo.examples.map(example => `- *${example}*`).join('\n')}

## ${this.capitalizeFirstLetter(genre.replace('_', ' '))} Genre Conventions

### Reader Expectations
- What readers look for in this genre
- Typical reading experience and emotional journey
- Balance of familiar tropes and fresh perspectives

### Plot Patterns
- Common story structures in this genre
- Typical conflicts and resolutions
- Pacing expectations

### Character Archetypes
- Recurring character types in the genre
- Ways to make archetypes fresh and interesting
- Character development patterns

### Setting Considerations
- World-building elements critical to the genre
- How setting influences the story
- Level of detail expected by readers

## Common Pitfalls to Avoid

- Genre clichés that feel stale to readers
- Balancing genre conventions with originality
- Technical aspects specific to this genre

## Subgenres to Consider

Various flavors of ${genre.replace('_', ' ')} that might align with your vision:
- Several subgenres with brief descriptions
- How subgenres blend with other genres
- Current trends in the marketplace

Would you like more specific guidance on creating any particular element of your ${genre.replace('_', ' ')} story?`;
        }
        
        // Generic genre guidance
        return `# Genre Fiction Writing Guide

In a complete implementation with an AI model and genre expertise, I would provide specific guidance on writing in your chosen genre. Different genres have unique conventions, reader expectations, and storytelling techniques.

## Understanding Genre

Genre is more than a marketing category—it's a set of shared expectations between writer and reader. Genres signal:
- What kind of experience readers can expect
- What emotions the story aims to evoke
- What types of characters, settings, and plots might appear
- What themes and ideas may be explored

## Key Genre Categories

### Fantasy
- **Core Elements**: Magic, mythical creatures, secondary worlds
- **Subgenres**: Epic, urban, dark, high/low, portal, etc.
- **Reader Expectations**: Immersive worldbuilding, heroic journeys

### Science Fiction
- **Core Elements**: Scientific concepts, technology, future possibilities
- **Subgenres**: Hard SF, space opera, cyberpunk, post-apocalyptic
- **Reader Expectations**: Plausible speculation, exploration of consequences

### Mystery/Thriller
- **Core Elements**: Crime, investigation, suspense
- **Subgenres**: Cozy, noir, procedural, psychological, techno-thriller
- **Reader Expectations**: Puzzles to solve, tension, satisfying resolution

### Horror
- **Core Elements**: Fear, dread, the unknown
- **Subgenres**: Psychological, supernatural, cosmic, body horror
- **Reader Expectations**: Escalating tension, confrontation with fears

### Romance
- **Core Elements**: Developing relationship, emotional journey
- **Subgenres**: Contemporary, historical, paranormal, romantic suspense
- **Reader Expectations**: Focus on relationship, satisfying emotional payoff

### Historical Fiction
- **Core Elements**: Past settings, period detail, historical events
- **Subgenres**: Biographical, alternate history, historical romance
- **Reader Expectations**: Authentic period atmosphere, balance of fact and fiction

## Genre Blending

Many successful works combine elements from multiple genres:
- **Examples**: Historical fantasy, romantic suspense, sci-fi horror
- **Benefits**: Expanded audience, fresh perspectives on conventions
- **Challenges**: Meeting multiple sets of reader expectations

## Writing Within Genre

### Research Your Genre
- Read widely in your chosen genre
- Understand genre conventions and reader expectations
- Identify what makes successful works stand out

### Balance Convention and Innovation
- Honor enough conventions to satisfy genre readers
- Bring fresh perspectives to avoid clichés
- Find your unique voice within the genre

### Know Your Reader
- Understand what emotions and experiences your readers seek
- Deliver on the promises of your genre
- Consider how to surprise and delight within expectations

Would you like specific guidance on a particular genre for your story?`;
    }
    
    /**
     * Explain story structure based on user input
     * @param {string} userInput - User's input about structure
     * @returns {string} Story structure explanation
     */
    explainStoryStructure(userInput) {
        // Check for specific structure questions
        for (const structureKey in this.storyStructures) {
            const structure = this.storyStructures[structureKey];
            if (userInput.toLowerCase().includes(structure.name.toLowerCase())) {
                
                // Three-act structure
                if (structureKey === "three_act") {
                    return `# Three-Act Structure

The Three-Act Structure is one of the most common and versatile frameworks for storytelling, used in novels, plays, and screenplays. It divides a story into three distinct segments: Setup, Confrontation, and Resolution.

## Act 1: Setup (Beginning)
**Purpose**: Introduce the world, characters, and central conflict.

### Key Components:
1. **Hook**: Grab the reader's attention (first few pages)
2. **Exposition**: Establish setting, introduce key characters
3. **Normal World**: Show protagonist's life before disruption
4. **Inciting Incident**: The event that sets the story in motion
5. **First Plot Point**: Protagonist commits to addressing the central problem (typically at the 25% mark)

**Example**: In "The Hunger Games," Act 1 introduces Katniss's life in District 12 and concludes when she volunteers as tribute.

## Act 2: Confrontation (Middle)
**Purpose**: Develop the conflict, raise the stakes, and test the protagonist.

### Key Components:
1. **Reaction**: Protagonist reacts to the new situation
2. **First Pinch Point**: First significant encounter with antagonistic force
3. **Midpoint**: Major revelation or shift that raises stakes (50% mark)
4. **Second Pinch Point**: Renewed pressure from antagonistic force
5. **All Is Lost Moment**: Protagonist's lowest point
6. **Second Plot Point**: Final piece of information or event needed to move toward resolution (75% mark)

**Example**: In "The Hunger Games," Act 2 covers Katniss's training, entering the arena, forming alliances, and surviving increasingly dangerous challenges.

## Act 3: Resolution (End)
**Purpose**: Bring the conflict to a climax and provide resolution.

### Key Components:
1. **Final Push**: Protagonist commits to final attempt to resolve the central conflict
2. **Climax**: The ultimate confrontation with the antagonistic force
3. **Falling Action**: Immediate aftermath of the climax
4. **Resolution**: Tying up loose ends and showing the new normal
5. **Denouement**: Final impression or closing image

**Example**: In "The Hunger Games," Act 3 includes the final confrontation at the Cornucopia, Katniss and Peeta's standoff with the gamemakers, and their return to District 12.

## Proportions in a Novel
- **Act 1**: Approximately 25% of the story
- **Act 2**: Approximately 50% of the story
- **Act 3**: Approximately 25% of the story

## Advantages of Three-Act Structure
- **Familiar**: Readers/viewers intuitively understand this structure
- **Flexible**: Works for nearly any genre or medium
- **Focused**: Keeps the story moving toward resolution
- **Balanced**: Provides proper pacing and emotional beats

## Using Three-Act Structure
1. **Plan Your Turning Points**: Decide on the major events that will transition between acts
2. **Maintain Tension**: Ensure conflict escalates throughout
3. **Track Character Growth**: The protagonist should evolve through each act
4. **Create Connections**: Plant setups in Act 1 that pay off in Act 3

Would you like help applying the Three-Act Structure to your ${this.state.currentStory || "story"}?`;
                }
                
                // Hero's Journey
                if (structureKey === "heros_journey") {
                    return `# The Hero's Journey

The Hero's Journey (or Monomyth) is a narrative pattern identified by mythologist Joseph Campbell, describing the typical adventure of heroes in stories across cultures and time periods. It consists of a hero who goes on an adventure, faces a crisis, wins a victory, and returns transformed.

## The 12 Stages of the Hero's Journey

### Act 1: Departure
1. **Ordinary World**
   - Shows the hero's normal life before the adventure
   - Establishes what's at stake if they leave
   - Reveals the hero's flaws and desires
   - **Example**: Luke Skywalker working on his uncle's farm in "Star Wars"

2. **Call to Adventure**
   - Hero receives a challenge or invitation to adventure
   - Disrupts the comfort of the Ordinary World
   - Plants the seed of future change
   - **Example**: Gandalf inviting Bilbo on an adventure in "The Hobbit"

3. **Refusal of the Call**
   - Hero initially resists the challenge
   - Shows reluctance or fear about the journey
   - Highlights the risks involved
   - **Example**: Harry Potter initially disbelieving he's a wizard

4. **Meeting the Mentor**
   - Hero encounters a wise figure who provides guidance
   - Receives advice, training, or tools for the journey
   - Gains confidence or perspective
   - **Example**: Morpheus training Neo in "The Matrix"

5. **Crossing the First Threshold**
   - Hero commits to the adventure
   - Leaves the Ordinary World behind
   - Enters the Special World of the story
   - **Example**: Dorothy landing in Oz in "The Wizard of Oz"

### Act 2: Initiation
6. **Tests, Allies, and Enemies**
   - Hero faces initial challenges in the Special World
   - Forms relationships with helpers and opponents
   - Learns the rules of the new world
   - **Example**: Harry Potter's first days at Hogwarts

7. **Approach to the Inmost Cave**
   - Hero prepares for the central challenge
   - Faces increasingly difficult tests
   - May retreat temporarily to regroup
   - **Example**: The Fellowship entering Moria in "Lord of the Rings"

8. **Ordeal**
   - Hero confronts greatest fear or faces death
   - Central crisis of the story
   - Transformative moment that changes the hero
   - **Example**: Katniss confronting life-or-death situations in the arena

9. **Reward (Seizing the Sword)**
   - Hero survives the Ordeal and takes possession of a treasure
   - Could be physical (object) or metaphorical (knowledge, love)
   - Moment of celebration, but dangers still exist
   - **Example**: Indiana Jones retrieving the Ark

### Act 3: Return
10. **The Road Back**
    - Hero begins the journey back to the Ordinary World
    - May face pursuit or new challenges
    - Commit to completing the journey
    - **Example**: Frodo and Sam leaving Mount Doom

11. **Resurrection**
    - Hero faces a final test or challenge
    - Ultimate transformation or purification
    - Proof that the hero has changed
    - **Example**: Neo's final battle with Agent Smith

12. **Return with the Elixir**
    - Hero returns to the Ordinary World with something valuable
    - Shares the Elixir (treasure, knowledge, wisdom) with others
    - Ordinary World is improved
    - **Example**: Moana returning to save her island

## Advantages of the Hero's Journey

- **Universal Appeal**: Connects with deep psychological patterns
- **Character Growth**: Built-in structure for character development
- **Flexible Framework**: Can be adapted to numerous genres and stories
- **Emotional Resonance**: Creates naturally satisfying emotional arcs

## Using the Hero's Journey

1. **Adapt to Your Needs**: Not every story needs all 12 stages
2. **Combine with Other Structures**: Works well with Three-Act Structure
3. **Focus on Transformation**: The heart of the journey is how the hero changes
4. **Consider Subversion**: Modern stories often twist expectations

Would you like help applying the Hero's Journey to your ${this.state.currentStory || "story"}?`;
                }
                
                // Default structure explanation
                return `# ${structure.name}

${structure.description}

## Key Components

${structureKey === "three_act" ? 
  `### Three Acts\n${structure.acts.map(act => `- ${act}`).join('\n')}` : 
  structureKey === "heros_journey" ? 
  `### Journey Stages\n${structure.stages.map(stage => `- ${stage}`).join('\n')}` :
  structureKey === "five_act" ? 
  `### Five Acts\n${structure.acts.map(act => `- ${act}`).join('\n')}` :
  structureKey === "seven_point" ? 
  `### Seven Points\n${structure.points.map(point => `- ${point}`).join('\n')}` :
  `### Story Beats\n${structure.beats.map(beat => `- ${beat}`).join('\n')}`}

## Implementing This Structure

- How to identify key turning points
- Adapting the structure to your specific story
- Common pitfalls to avoid
- Examples from well-known works

Would you like more detailed information about a specific part of this structure or help applying it to your story?`;
            }
        }
        
        // Generic story structure explanation
        return `# Story Structure Models

In a complete implementation with an AI model and storytelling expertise, I would provide detailed guidance on narrative structures suitable for your project. Here's an overview of common story structures writers use:

## Popular Story Structures

### Three-Act Structure
**Overview**: The classic beginning, middle, and end.
- **Act 1 (Setup)**: Introduce characters, world, and central conflict
- **Act 2 (Confrontation)**: Develop conflict through escalating challenges
- **Act 3 (Resolution)**: Climax and resolution of conflict
**Best for**: Most types of stories, especially when starting out

### Hero's Journey (Monomyth)
**Overview**: Joseph Campbell's pattern found in myths worldwide.
- **Departure**: Ordinary world, call to adventure, crossing the threshold
- **Initiation**: Road of trials, ultimate boon, transformation
- **Return**: Return with new knowledge to benefit the community
**Best for**: Epic adventures, fantasy, transformational stories

### Five-Act Structure
**Overview**: Classical dramatic structure used by Shakespeare.
- **Act 1 (Exposition)**: Introduce situation and characters
- **Act 2 (Rising Action)**: Complications begin
- **Act 3 (Climax)**: Turning point of the story
- **Act 4 (Falling Action)**: Consequences of the climax
- **Act 5 (Denouement)**: Resolution and new equilibrium
**Best for**: Complex plots with multiple subplots

### Seven-Point Story Structure
**Overview**: Focused on key plot events and character development.
- **Hook**: Beginning scenario and character introduction
- **Plot Turn 1**: Event that sets the story in motion
- **Pinch Point 1**: First major challenge from antagonistic force
- **Midpoint**: Shift from reaction to action
- **Pinch Point 2**: Second major challenge with higher stakes
- **Plot Turn 2**: Final piece needed to resolve the conflict
- **Resolution**: Climax and conclusion
**Best for**: Character-driven stories with clear arcs

### Save the Cat
**Overview**: Blake Snyder's modern screenwriting method.
- 15 specific "beats" (story moments) including opening image, theme stated, catalyst, midpoint, and final image
**Best for**: Screenplays and highly structured commercial fiction

## Choosing a Structure

Factors to consider when selecting a structure:
1. **Genre Expectations**: Some genres favor certain structures
2. **Story Length**: Longer works may need more complex structures
3. **Character vs. Plot Focus**: Different structures emphasize different elements
4. **Your Writing Style**: Some structures feel more natural to certain writers
5. **Story Complexity**: Multiple POVs or subplots may need specific structures

## Adapting Structure

Remember that structures are tools, not rules:
- Mix elements from different structures
- Adapt the timing and emphasis to suit your story
- Focus on emotional journey as much as plot points
- Use structure as a starting point, not a rigid formula

Would you like me to explain a specific structure in more detail or help you determine which structure might work best for your story?`;
    }
    
    /**
     * Generate creative writing based on user input
     * @param {string} userInput - User's general input
     * @returns {string} Creative writing
     */
    generateCreativeWriting(userInput) {
        return `# Creative Writing

In a complete implementation with an AI model and creative writing capabilities, I would generate original creative content based on your request. This might include stories, scenes, character sketches, or other narrative elements appropriate to your needs.

For your ${this.state.currentStory || "story"} project, I could help with various creative writing aspects:

## Story Elements I Could Help Create

### Narrative Passages
- Opening scenes that hook readers
- Climactic moments with emotional impact
- Descriptive passages of settings or characters
- Transitional scenes that bridge story sections

### Character Material
- Revealing character introductions
- Internal monologues showing character thoughts
- Key interactions between characters
- Character backstories and development arcs

### Setting Development
- Atmospheric descriptions that establish mood
- World-building elements for fictional places
- Historical or cultural details for realism
- Settings that reflect thematic elements

### Dialogue Creation
- Character conversations that reveal personality
- Conflict-driven exchanges
- Subtext-rich interactions
- Stylistically appropriate dialogue for your genre

Would you like me to focus on creating a specific type of content for your story? I can tailor my assistance to whatever creative element would be most helpful to you right now.`;
    }
    
    /**
     * Get storytelling suggestions based on user interaction
     * @param {string} requestType - Type of storytelling request
     * @returns {Array<string>} Storytelling suggestions
     */
    getStorySuggestions(requestType) {
        const suggestions = [];
        
        // Add type-specific suggestions
        if (requestType === "story_generation") {
            suggestions.push(`Write a short ${this.state.storyType} story about a character who discovers a secret`);
            suggestions.push(`Help me create a character for my ${this.state.currentStory || "story"}`);
            suggestions.push(`What's a good way to start my ${this.state.storyType} story?`);
        } else if (requestType === "character_creation") {
            suggestions.push("What are some unique character flaws I could use?");
            suggestions.push("How do I write a compelling character backstory?");
            suggestions.push("Create a villain for my story");
        } else if (requestType === "plot_development") {
            suggestions.push("What are common plot holes to avoid?");
            suggestions.push(`Suggest some plot twists for a ${this.state.storyType} story`);
            suggestions.push("How do I create rising action in my plot?");
        } else if (requestType === "world_building") {
            suggestions.push(`What elements should I include in my ${this.state.storyType} world?`);
            suggestions.push("How detailed should my world-building be?");
            suggestions.push("Help me create a magic system for my fantasy world");
        } else if (requestType === "dialogue_writing") {
            suggestions.push("What are signs of unrealistic dialogue?");
            suggestions.push("Write dialogue for a first meeting between two characters");
            suggestions.push("How do I write dialogue that reveals character?");
        } else if (requestType === "description_writing") {
            suggestions.push("How do I describe a character without using clichés?");
            suggestions.push("Write a description of a forest at night");
            suggestions.push("Tips for writing action scenes");
        } else if (requestType === "writing_tips") {
            suggestions.push("How do I overcome writer's block?");
            suggestions.push("Tips for writing effective chapter endings");
            suggestions.push("How to show instead of tell in writing");
        } else if (requestType === "genre_guidance") {
            suggestions.push(`What are common tropes in ${this.state.storyType} stories?`);
            suggestions.push(`Recommend some great ${this.state.storyType} books to study`);
            suggestions.push(`What makes a good ${this.state.storyType} story?`);
        } else if (requestType === "story_structure") {
            suggestions.push("Explain the Hero's Journey structure");
            suggestions.push("What's the three-act structure?");
            suggestions.push("How do I create a satisfying story ending?");
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "How do I create a compelling protagonist?",
                "What makes a good story opening?",
                "Tips for writing effective dialogue",
                "How to create conflict in my story",
                "Ways to describe character emotions",
                "How to build suspense in my writing",
                "Tips for naming characters and places"
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
     * Utility function to capitalize first letter of each word
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
                'jaat-mode10-preferences',
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
            localStorage.removeItem('jaat-mode10-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Clear story elements
     * @returns {boolean} Success status
     */
    clearStoryElements() {
        try {
            this.state.characters = [];
            this.state.plotPoints = [];
            this.state.settings = [];
            
            // Save empty arrays
            this.savePreferences({
                characters: [],
                plotPoints: [],
                settings: []
            });
            
            return true;
        } catch (error) {
            console.error("Error clearing story elements:", error);
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
            currentStory: this.state.currentStory,
            storyType: this.state.storyType,
            storyTone: this.state.storyTone,
            characterCount: this.state.characters.length,
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
    window.jaatAIModes.storyteller = new StorytellerMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorytellerMode;
}
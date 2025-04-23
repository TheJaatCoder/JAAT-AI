/**
 * JAAT-AI AI Modes Manager Feature
 * Manages the 67+ specialized AI domains and their unique capabilities
 * 
 * Created by: Rohit Sangwan
 * Contact: Infosec.rohit77@gmail.com
 */

class AiModesManager {
    constructor() {
        this.initialized = false;
        this.currentMode = null;
        this.recentModes = [];
        this.modeCooldowns = {};
        
        // Define all available AI modes
        this.modes = {
            // Creative and Writing Modes
            "creative_writer": {
                id: "creative_writer",
                name: "Creative Writer",
                icon: "fas fa-feather-alt",
                category: "creative",
                description: "Generate stories, poems, and creative content with advanced narrative techniques.",
                prompts: [
                    "Write a short story about...",
                    "Create a poem about...",
                    "Develop a character profile for..."
                ],
                tier: "standard"
            },
            "screenplay_expert": {
                id: "screenplay_expert",
                name: "Screenplay Expert",
                icon: "fas fa-film",
                category: "creative",
                description: "Create scripts and screenplays with proper formatting and dialogue.",
                prompts: [
                    "Write a scene where...",
                    "Create dialogue between characters who...",
                    "Develop a movie concept about..."
                ],
                tier: "premium"
            },
            "storyteller": {
                id: "storyteller",
                name: "Storyteller",
                icon: "fas fa-book-open",
                category: "creative",
                description: "Craft engaging narratives with complex plots and character development.",
                prompts: [
                    "Tell a story about...",
                    "Continue this narrative...",
                    "Create a fairy tale featuring..."
                ],
                tier: "standard"
            },
            
            // Business and Professional Modes
            "business_analyst": {
                id: "business_analyst",
                name: "Business Analyst",
                icon: "fas fa-chart-line",
                category: "business",
                description: "Analyze business metrics, market trends, and strategic opportunities.",
                prompts: [
                    "Analyze the market potential for...",
                    "What are the key metrics for a company that...",
                    "Provide a competitive analysis of..."
                ],
                tier: "premium"
            },
            "marketing_expert": {
                id: "marketing_expert",
                name: "Marketing Expert",
                icon: "fas fa-bullhorn",
                category: "business",
                description: "Develop marketing strategies, campaign ideas, and brand messaging.",
                prompts: [
                    "Create a marketing campaign for...",
                    "Suggest social media strategies for...",
                    "How should I position my product that..."
                ],
                tier: "standard"
            },
            "financial_advisor": {
                id: "financial_advisor",
                name: "Financial Advisor",
                icon: "fas fa-dollar-sign",
                category: "business",
                description: "Provide financial analysis, investment suggestions, and budget planning.",
                prompts: [
                    "How should I approach investing in...",
                    "Create a budget plan for...",
                    "Analyze the financial implications of..."
                ],
                tier: "premium"
            },
            "legal_assistant": {
                id: "legal_assistant",
                name: "Legal Assistant",
                icon: "fas fa-gavel",
                category: "business",
                description: "Explain legal concepts and help with basic legal document drafting.",
                prompts: [
                    "Explain the legal concept of...",
                    "What should I know about laws regarding...",
                    "Help me understand the legal implications of..."
                ],
                tier: "premium"
            },
            
            // Technical and Development Modes
            "code_assistant": {
                id: "code_assistant",
                name: "Code Assistant",
                icon: "fas fa-code",
                category: "technical",
                description: "Write, debug, and optimize code in multiple programming languages.",
                prompts: [
                    "Write a function to...",
                    "Debug this code that...",
                    "Optimize this algorithm for..."
                ],
                tier: "standard"
            },
            "system_architect": {
                id: "system_architect",
                name: "System Architect",
                icon: "fas fa-network-wired",
                category: "technical",
                description: "Design software architecture, database schemas, and system interactions.",
                prompts: [
                    "Design a system architecture for...",
                    "What database structure would work best for...",
                    "How should these components interact in a system that..."
                ],
                tier: "premium"
            },
            "data_scientist": {
                id: "data_scientist",
                name: "Data Scientist",
                icon: "fas fa-database",
                category: "technical",
                description: "Analyze data, create models, and extract insights from datasets.",
                prompts: [
                    "How would you analyze this dataset...",
                    "What machine learning approach would work for...",
                    "Extract insights from this data about..."
                ],
                tier: "premium"
            },
            "cybersecurity_expert": {
                id: "cybersecurity_expert",
                name: "Cybersecurity Expert",
                icon: "fas fa-shield-alt",
                category: "technical",
                description: "Provide security best practices, vulnerability assessment, and threat analysis.",
                prompts: [
                    "How can I secure my application that...",
                    "What vulnerabilities should I look for in...",
                    "Suggest security measures for..."
                ],
                tier: "premium"
            },
            
            // Academic and Educational Modes
            "history_professor": {
                id: "history_professor",
                name: "History Professor",
                icon: "fas fa-landmark",
                category: "academic",
                description: "Provide detailed historical analysis, timelines, and contextual information.",
                prompts: [
                    "Explain the historical context of...",
                    "What were the causes and effects of...",
                    "Compare these historical events..."
                ],
                tier: "standard"
            },
            "science_educator": {
                id: "science_educator",
                name: "Science Educator",
                icon: "fas fa-atom",
                category: "academic",
                description: "Explain scientific concepts, experiments, and natural phenomena.",
                prompts: [
                    "Explain the concept of...",
                    "How does this scientific principle work...",
                    "What's the science behind..."
                ],
                tier: "standard"
            },
            "math_tutor": {
                id: "math_tutor",
                name: "Math Tutor",
                icon: "fas fa-calculator",
                category: "academic",
                description: "Solve mathematical problems and explain concepts from basic to advanced levels.",
                prompts: [
                    "Solve this equation...",
                    "Explain the concept of...",
                    "Walk me through the solution to..."
                ],
                tier: "standard"
            },
            "literature_analyst": {
                id: "literature_analyst",
                name: "Literature Analyst",
                icon: "fas fa-book",
                category: "academic",
                description: "Analyze literary works, themes, styles, and provide critical interpretation.",
                prompts: [
                    "Analyze the themes in...",
                    "What literary devices are used in...",
                    "Compare these two literary works..."
                ],
                tier: "standard"
            },
            
            // Health and Wellness Modes
            "nutrition_coach": {
                id: "nutrition_coach",
                name: "Nutrition Coach",
                icon: "fas fa-apple-alt",
                category: "health",
                description: "Provide dietary guidance, meal planning, and nutritional information.",
                prompts: [
                    "Suggest a meal plan for...",
                    "What nutrients are important for...",
                    "How should I eat to support..."
                ],
                tier: "standard"
            },
            "fitness_trainer": {
                id: "fitness_trainer",
                name: "Fitness Trainer",
                icon: "fas fa-dumbbell",
                category: "health",
                description: "Create workout routines, explain exercises, and provide fitness guidance.",
                prompts: [
                    "Design a workout routine for...",
                    "What exercises target...",
                    "How should I train for..."
                ],
                tier: "standard"
            },
            "mental_health_guide": {
                id: "mental_health_guide",
                name: "Mental Health Guide",
                icon: "fas fa-brain",
                category: "health",
                description: "Offer mental wellness strategies, stress management, and emotional support.",
                prompts: [
                    "Suggest strategies for managing...",
                    "How can I improve my mental wellness when...",
                    "What techniques help with..."
                ],
                tier: "premium"
            },
            "medical_researcher": {
                id: "medical_researcher",
                name: "Medical Researcher",
                icon: "fas fa-microscope",
                category: "health",
                description: "Provide research-based information on medical conditions and treatments.",
                prompts: [
                    "What does research say about...",
                    "Explain the current understanding of...",
                    "What treatments are being researched for..."
                ],
                tier: "premium"
            },
            
            // Technology and Innovation Modes
            "tech_reviewer": {
                id: "tech_reviewer",
                name: "Tech Reviewer",
                icon: "fas fa-laptop",
                category: "technology",
                description: "Evaluate technology products, compare features, and provide recommendations.",
                prompts: [
                    "Compare these products...",
                    "What should I look for when buying a...",
                    "Review the features of..."
                ],
                tier: "standard"
            },
            "innovation_consultant": {
                id: "innovation_consultant",
                name: "Innovation Consultant",
                icon: "fas fa-lightbulb",
                category: "technology",
                description: "Generate innovative ideas, suggest improvements, and explore cutting-edge concepts.",
                prompts: [
                    "Generate innovative ideas for...",
                    "How could we improve...",
                    "What's the future potential of..."
                ],
                tier: "premium"
            },
            "ai_ethicist": {
                id: "ai_ethicist",
                name: "AI Ethicist",
                icon: "fas fa-balance-scale",
                category: "technology",
                description: "Discuss ethical implications of AI and technology on society and individuals.",
                prompts: [
                    "What are the ethical concerns with...",
                    "How might this technology impact...",
                    "What ethical frameworks apply to..."
                ],
                tier: "premium"
            },
            "tech_futurist": {
                id: "tech_futurist",
                name: "Tech Futurist",
                icon: "fas fa-rocket",
                category: "technology",
                description: "Project technology trends, future developments, and their potential impacts.",
                prompts: [
                    "How might technology evolve in the area of...",
                    "What's the future outlook for...",
                    "Predict how this technology will change..."
                ],
                tier: "premium"
            },
            
            // Language and Communication Modes
            "language_tutor": {
                id: "language_tutor",
                name: "Language Tutor",
                icon: "fas fa-language",
                category: "language",
                description: "Teach language skills, grammar, vocabulary, and conversation practice.",
                prompts: [
                    "Explain the grammar rule for...",
                    "How do you say this in...",
                    "Help me practice conversation about..."
                ],
                tier: "standard"
            },
            "communication_coach": {
                id: "communication_coach",
                name: "Communication Coach",
                icon: "fas fa-comments",
                category: "language",
                description: "Improve communication skills, public speaking, and interpersonal interactions.",
                prompts: [
                    "How can I better communicate...",
                    "Help me prepare for a speech about...",
                    "What's the best way to handle this conversation..."
                ],
                tier: "standard"
            },
            "translator": {
                id: "translator",
                name: "Translator",
                icon: "fas fa-globe",
                category: "language",
                description: "Translate text between languages with cultural context and nuance.",
                prompts: [
                    "Translate this from English to...",
                    "What does this phrase mean in...",
                    "How would you express this concept in..."
                ],
                tier: "standard"
            },
            "cultural_guide": {
                id: "cultural_guide",
                name: "Cultural Guide",
                icon: "fas fa-map-marked-alt",
                category: "language",
                description: "Provide cultural insights, customs, etiquette, and contextual understanding.",
                prompts: [
                    "What should I know about the culture of...",
                    "Explain the custom of...",
                    "What's the cultural significance of..."
                ],
                tier: "standard"
            },
            
            // Science and Research Modes
            "physics_expert": {
                id: "physics_expert",
                name: "Physics Expert",
                icon: "fas fa-atom",
                category: "science",
                description: "Explain physics concepts, solve problems, and provide scientific analysis.",
                prompts: [
                    "Explain the physics behind...",
                    "Solve this physics problem...",
                    "How does this physical phenomenon work..."
                ],
                tier: "premium"
            },
            "chemistry_lab": {
                id: "chemistry_lab",
                name: "Chemistry Lab",
                icon: "fas fa-flask",
                category: "science",
                description: "Provide chemistry insights, reactions, formulas, and experimental design.",
                prompts: [
                    "Explain this chemical reaction...",
                    "What happens when you combine...",
                    "How would you synthesize..."
                ],
                tier: "premium"
            },
            "biology_researcher": {
                id: "biology_researcher",
                name: "Biology Researcher",
                icon: "fas fa-dna",
                category: "science",
                description: "Explore biological systems, processes, and concepts from cellular to ecosystem levels.",
                prompts: [
                    "Explain how this biological process works...",
                    "What's the function of...",
                    "Describe the ecosystem interactions in..."
                ],
                tier: "premium"
            },
            "astronomy_guide": {
                id: "astronomy_guide",
                name: "Astronomy Guide",
                icon: "fas fa-star",
                category: "science",
                description: "Explore celestial bodies, space phenomena, and astronomical concepts.",
                prompts: [
                    "Explain the phenomenon of...",
                    "What's known about...",
                    "How do astronomers study..."
                ],
                tier: "premium"
            },
            
            // Design and Arts Modes
            "visual_designer": {
                id: "visual_designer",
                name: "Visual Designer",
                icon: "fas fa-palette",
                category: "design",
                description: "Provide design principles, visual composition, and aesthetic guidance.",
                prompts: [
                    "Suggest a design approach for...",
                    "What color scheme would work for...",
                    "How should I visually organize..."
                ],
                tier: "standard"
            },
            "interior_designer": {
                id: "interior_designer",
                name: "Interior Designer",
                icon: "fas fa-couch",
                category: "design",
                description: "Offer interior space planning, decor suggestions, and style guidance.",
                prompts: [
                    "How should I arrange furniture in...",
                    "Suggest a design theme for...",
                    "What color palette works for..."
                ],
                tier: "premium"
            },
            "fashion_consultant": {
                id: "fashion_consultant",
                name: "Fashion Consultant",
                icon: "fas fa-tshirt",
                category: "design",
                description: "Provide fashion advice, outfit coordination, and style recommendations.",
                prompts: [
                    "What should I wear for...",
                    "How can I style this...",
                    "Suggest an outfit for..."
                ],
                tier: "premium"
            },
            "art_historian": {
                id: "art_historian",
                name: "Art Historian",
                icon: "fas fa-paint-brush",
                category: "design",
                description: "Analyze art movements, works, techniques, and historical context.",
                prompts: [
                    "Explain the significance of...",
                    "What characterizes the art movement of...",
                    "Analyze this artwork in the context of..."
                ],
                tier: "premium"
            },
            
            // Specialized Professional Modes
            "project_manager": {
                id: "project_manager",
                name: "Project Manager",
                icon: "fas fa-tasks",
                category: "professional",
                description: "Help plan projects, organize tasks, and implement management strategies.",
                prompts: [
                    "Create a project plan for...",
                    "How should I organize this project...",
                    "What's the best approach for managing..."
                ],
                tier: "premium"
            },
            "hr_consultant": {
                id: "hr_consultant",
                name: "HR Consultant",
                icon: "fas fa-users",
                category: "professional",
                description: "Provide guidance on hiring, team management, and workplace policies.",
                prompts: [
                    "What interview questions should I ask for...",
                    "How can I improve team dynamics when...",
                    "Draft a policy for..."
                ],
                tier: "premium"
            },
            "negotiation_coach": {
                id: "negotiation_coach",
                name: "Negotiation Coach",
                icon: "fas fa-handshake",
                category: "professional",
                description: "Develop negotiation strategies, communication tactics, and conflict resolution.",
                prompts: [
                    "How should I negotiate...",
                    "What approach works best for...",
                    "Help me prepare for this negotiation..."
                ],
                tier: "premium"
            },
            "presentation_expert": {
                id: "presentation_expert",
                name: "Presentation Expert",
                icon: "fas fa-presentation",
                category: "professional",
                description: "Create compelling presentations, slide designs, and public speaking strategies.",
                prompts: [
                    "Help me structure a presentation about...",
                    "What visuals would work for explaining...",
                    "How can I make my slides more engaging for..."
                ],
                tier: "premium"
            },
            
            // Entertainment and Media Modes
            "film_critic": {
                id: "film_critic",
                name: "Film Critic",
                icon: "fas fa-film",
                category: "entertainment",
                description: "Analyze films, cinematic techniques, and storytelling in visual media.",
                prompts: [
                    "Analyze the narrative structure of...",
                    "What makes the cinematography effective in...",
                    "Compare these two films..."
                ],
                tier: "standard"
            },
            "music_theorist": {
                id: "music_theorist",
                name: "Music Theorist",
                icon: "fas fa-music",
                category: "entertainment",
                description: "Explore music theory, composition, analysis, and historical context.",
                prompts: [
                    "Explain the music theory behind...",
                    "What makes this composition unique...",
                    "Analyze the structure of this song..."
                ],
                tier: "premium"
            },
            "game_designer": {
                id: "game_designer",
                name: "Game Designer",
                icon: "fas fa-gamepad",
                category: "entertainment",
                description: "Develop game mechanics, narrative design, and player experience concepts.",
                prompts: [
                    "Design game mechanics for...",
                    "How would you structure the progression in a game about...",
                    "Create a character concept for..."
                ],
                tier: "premium"
            },
            "media_analyst": {
                id: "media_analyst",
                name: "Media Analyst",
                icon: "fas fa-photo-video",
                category: "entertainment",
                description: "Analyze media trends, content strategies, and audience engagement.",
                prompts: [
                    "What content strategy would work for...",
                    "Analyze these engagement metrics...",
                    "How is this type of media evolving..."
                ],
                tier: "premium"
            },
            
            // Philosophical and Conceptual Modes
            "philosopher": {
                id: "philosopher",
                name: "Philosopher",
                icon: "fas fa-brain",
                category: "conceptual",
                description: "Explore philosophical concepts, ethical frameworks, and abstract reasoning.",
                prompts: [
                    "What would philosopher X say about...",
                    "Explore the ethical implications of...",
                    "Compare these philosophical perspectives..."
                ],
                tier: "premium"
            },
            "critical_thinker": {
                id: "critical_thinker",
                name: "Critical Thinker",
                icon: "fas fa-search",
                category: "conceptual",
                description: "Analyze arguments, identify logical fallacies, and evaluate claims.",
                prompts: [
                    "Evaluate the argument that...",
                    "What logical fallacies exist in...",
                    "How would you critically analyze..."
                ],
                tier: "standard"
            },
            "systems_thinker": {
                id: "systems_thinker",
                name: "Systems Thinker",
                icon: "fas fa-project-diagram",
                category: "conceptual",
                description: "Analyze complex systems, feedback loops, and emergent properties.",
                prompts: [
                    "What are the system dynamics in...",
                    "Explain the feedback loops in...",
                    "How do these factors interact in the system of..."
                ],
                tier: "premium"
            },
            "futurist": {
                id: "futurist",
                name: "Futurist",
                icon: "fas fa-clock",
                category: "conceptual",
                description: "Explore future scenarios, trends, and potential developments.",
                prompts: [
                    "What might be the future of...",
                    "How might society change if...",
                    "Project the trends in..."
                ],
                tier: "premium"
            },
            
            // Practical and Daily Life Modes
            "personal_assistant": {
                id: "personal_assistant",
                name: "Personal Assistant",
                icon: "fas fa-concierge-bell",
                category: "practical",
                description: "Help organize tasks, plan events, and manage daily responsibilities.",
                prompts: [
                    "Help me plan...",
                    "How should I organize...",
                    "Create a schedule for..."
                ],
                tier: "standard"
            },
            "travel_planner": {
                id: "travel_planner",
                name: "Travel Planner",
                icon: "fas fa-plane",
                category: "practical",
                description: "Plan trips, suggest destinations, and provide travel guidance.",
                prompts: [
                    "Plan a trip to...",
                    "What should I see in...",
                    "Create an itinerary for..."
                ],
                tier: "standard"
            },
            "home_improvement_guide": {
                id: "home_improvement_guide",
                name: "Home Improvement Guide",
                icon: "fas fa-hammer",
                category: "practical",
                description: "Provide DIY instructions, home repair guidance, and improvement ideas.",
                prompts: [
                    "How do I fix...",
                    "What's the best way to install...",
                    "Suggest ideas for improving..."
                ],
                tier: "standard"
            },
            "cooking_expert": {
                id: "cooking_expert",
                name: "Cooking Expert",
                icon: "fas fa-utensils",
                category: "practical",
                description: "Create recipes, explain cooking techniques, and offer culinary guidance.",
                prompts: [
                    "How do I make...",
                    "What recipe works for...",
                    "Explain the technique of..."
                ],
                tier: "standard"
            }
        };
        
        // Define categories for organization
        this.categories = [
            {
                id: "creative",
                name: "Creative & Writing",
                icon: "fas fa-feather-alt"
            },
            {
                id: "business",
                name: "Business & Professional",
                icon: "fas fa-briefcase"
            },
            {
                id: "technical",
                name: "Technical & Development",
                icon: "fas fa-code"
            },
            {
                id: "academic",
                name: "Academic & Educational",
                icon: "fas fa-graduation-cap"
            },
            {
                id: "health",
                name: "Health & Wellness",
                icon: "fas fa-heartbeat"
            },
            {
                id: "technology",
                name: "Technology & Innovation",
                icon: "fas fa-microchip"
            },
            {
                id: "language",
                name: "Language & Communication",
                icon: "fas fa-comments"
            },
            {
                id: "science",
                name: "Science & Research",
                icon: "fas fa-microscope"
            },
            {
                id: "design",
                name: "Design & Arts",
                icon: "fas fa-palette"
            },
            {
                id: "professional",
                name: "Specialized Professional",
                icon: "fas fa-user-tie"
            },
            {
                id: "entertainment",
                name: "Entertainment & Media",
                icon: "fas fa-film"
            },
            {
                id: "conceptual",
                name: "Philosophical & Conceptual",
                icon: "fas fa-brain"
            },
            {
                id: "practical",
                name: "Practical & Daily Life",
                icon: "fas fa-tools"
            }
        ];
        
        // Initialize with default mode
        this.currentMode = "personal_assistant";
        
        console.log('JAAT-AI AI Modes Manager feature initialized');
    }
    
    /**
     * Get all available AI modes
     * @returns {Object} All available AI modes
     */
    getAllModes() {
        return { ...this.modes };
    }
    
    /**
     * Get all available mode categories
     * @returns {Array} Mode categories
     */
    getCategories() {
        return [...this.categories];
    }
    
    /**
     * Get modes filtered by category
     * @param {string} categoryId - The category ID to filter by
     * @returns {Object} Filtered modes
     */
    getModesByCategory(categoryId) {
        const filteredModes = {};
        
        Object.keys(this.modes).forEach(modeId => {
            if (this.modes[modeId].category === categoryId) {
                filteredModes[modeId] = this.modes[modeId];
            }
        });
        
        return filteredModes;
    }
    
    /**
     * Get modes filtered by access tier
     * @param {string} tier - The tier to filter by ('free', 'standard', 'premium')
     * @returns {Object} Filtered modes
     */
    getModesByTier(tier) {
        const filteredModes = {};
        
        Object.keys(this.modes).forEach(modeId => {
            if (tier === 'free' || 
                (tier === 'standard' && (this.modes[modeId].tier === 'standard' || this.modes[modeId].tier === 'free')) || 
                tier === 'premium') {
                filteredModes[modeId] = this.modes[modeId];
            }
        });
        
        return filteredModes;
    }
    
    /**
     * Get a specific AI mode
     * @param {string} modeId - The mode ID to get
     * @returns {Object|null} The requested mode or null if not found
     */
    getMode(modeId) {
        return this.modes[modeId] || null;
    }
    
    /**
     * Get the current active AI mode
     * @returns {Object} The current mode
     */
    getCurrentMode() {
        return this.modes[this.currentMode] || this.modes.personal_assistant;
    }
    
    /**
     * Set the current AI mode
     * @param {string} modeId - The mode ID to set as current
     * @returns {boolean} Whether the mode was set successfully
     */
    setCurrentMode(modeId) {
        if (!this.modes[modeId]) {
            console.error(`Mode not found: ${modeId}`);
            return false;
        }
        
        // Check if mode requires premium subscription
        if (this.modes[modeId].tier === 'premium') {
            // Check subscription status
            const subscriptionManager = window.JAAT?.features?.['subscription-manager'];
            
            if (subscriptionManager && !subscriptionManager.canUseFeature('premium-ai-modes')) {
                // If not in development mode, prevent setting premium mode
                if (!(window.JAAT_ENV?.config?.isPremiumEnabled())) {
                    console.error(`Premium mode requires subscription: ${modeId}`);
                    this.dispatchEvent('premiumRequired', { modeId });
                    return false;
                }
            }
        }
        
        const oldMode = this.currentMode;
        this.currentMode = modeId;
        
        // Add to recent modes
        this.addToRecentModes(modeId);
        
        // Dispatch event
        this.dispatchEvent('modeChanged', { 
            oldMode,
            newMode: modeId,
            modeDetails: this.modes[modeId]
        });
        
        return true;
    }
    
    /**
     * Get a list of recently used modes
     * @param {number} limit - Maximum number of recent modes to return
     * @returns {Array} Recent modes
     */
    getRecentModes(limit = 5) {
        return this.recentModes.slice(0, limit).map(modeId => this.modes[modeId]);
    }
    
    /**
     * Add a mode to the recent modes list
     * @param {string} modeId - The mode ID to add to recent
     */
    addToRecentModes(modeId) {
        // Remove if already in list
        this.recentModes = this.recentModes.filter(id => id !== modeId);
        
        // Add to beginning
        this.recentModes.unshift(modeId);
        
        // Limit size
        if (this.recentModes.length > 10) {
            this.recentModes.pop();
        }
    }
    
    /**
     * Search for modes by keyword
     * @param {string} keyword - The keyword to search for
     * @returns {Object} Matching modes
     */
    searchModes(keyword) {
        if (!keyword || keyword.trim() === '') {
            return this.getAllModes();
        }
        
        const lowercaseKeyword = keyword.toLowerCase();
        const matchedModes = {};
        
        Object.keys(this.modes).forEach(modeId => {
            const mode = this.modes[modeId];
            
            if (mode.name.toLowerCase().includes(lowercaseKeyword) || 
                mode.description.toLowerCase().includes(lowercaseKeyword) ||
                mode.category.toLowerCase().includes(lowercaseKeyword)) {
                matchedModes[modeId] = mode;
            }
        });
        
        return matchedModes;
    }
    
    /**
     * Get recommended modes based on the current mode or context
     * @param {string} context - Optional context to base recommendations on
     * @returns {Array} Recommended modes
     */
    getRecommendedModes(context = null) {
        // If context is provided, use it for more relevant recommendations
        if (context) {
            // Simple recommendation based on keyword matching
            const matches = this.searchModes(context);
            return Object.values(matches).slice(0, 5);
        }
        
        // Otherwise recommend based on current mode category
        const currentMode = this.getCurrentMode();
        const sameCategoryModes = Object.values(this.getModesByCategory(currentMode.category))
            .filter(mode => mode.id !== currentMode.id);
        
        // If not enough in same category, add some popular modes
        if (sameCategoryModes.length < 5) {
            const popularModes = [
                'creative_writer',
                'code_assistant',
                'business_analyst',
                'personal_assistant',
                'nutrition_coach'
            ].map(id => this.modes[id]).filter(mode => mode.id !== currentMode.id);
            
            return [...sameCategoryModes, ...popularModes].slice(0, 5);
        }
        
        return sameCategoryModes.slice(0, 5);
    }
    
    /**
     * Get suggested prompts for the current or specified mode
     * @param {string} modeId - Optional mode ID to get prompts for
     * @returns {Array} Suggested prompts
     */
    getSuggestedPrompts(modeId = null) {
        const mode = modeId ? this.modes[modeId] : this.getCurrentMode();
        return mode ? mode.prompts : [];
    }
    
    /**
     * Dispatch a custom event
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event details
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`jaat.aimodes.${eventName}`, { 
            detail,
            bubbles: true
        });
        document.dispatchEvent(event);
    }
}

// Register the feature with JAAT-AI
if (window.JAAT) {
    window.JAAT.registerFeature('ai-modes-manager', new AiModesManager());
}

// Add initialization code
document.addEventListener('DOMContentLoaded', function() {
    if (window.JAAT && window.JAAT.features['ai-modes-manager']) {
        const aiModesManager = window.JAAT.features['ai-modes-manager'];
        
        // Add AI modes to sidebar if it exists
        const aiModesList = document.querySelector('.ai-modes-list');
        if (aiModesList) {
            // Get categories
            const categories = aiModesManager.getCategories();
            
            // Create category groups
            categories.forEach(category => {
                // Get modes for this category
                const categoryModes = aiModesManager.getModesByCategory(category.id);
                
                // Skip if no modes in this category
                if (Object.keys(categoryModes).length === 0) return;
                
                // Create category group
                const categoryGroup = document.createElement('div');
                categoryGroup.className = 'mode-category';
                
                // Create category header
                const categoryHeader = document.createElement('div');
                categoryHeader.className = 'category-header';
                
                const categoryIcon = document.createElement('i');
                categoryIcon.className = category.icon;
                
                const categoryTitle = document.createElement('span');
                categoryTitle.textContent = category.name;
                
                categoryHeader.appendChild(categoryIcon);
                categoryHeader.appendChild(categoryTitle);
                
                // Create modes container
                const modesContainer = document.createElement('div');
                modesContainer.className = 'category-modes';
                
                // Add modes
                Object.values(categoryModes).forEach(mode => {
                    const modeItem = document.createElement('div');
                    modeItem.className = 'nav-item';
                    modeItem.setAttribute('data-ai-mode', mode.id);
                    
                    if (mode.tier === 'premium') {
                        modeItem.setAttribute('data-premium', 'true');
                    }
                    
                    const modeIcon = document.createElement('i');
                    modeIcon.className = mode.icon;
                    
                    const modeText = document.createElement('span');
                    modeText.textContent = mode.name;
                    
                    modeItem.appendChild(modeIcon);
                    modeItem.appendChild(modeText);
                    
                    // For premium modes, add crown icon
                    if (mode.tier === 'premium') {
                        const premiumIcon = document.createElement('i');
                        premiumIcon.className = 'fas fa-crown premium-icon';
                        modeItem.appendChild(premiumIcon);
                    }
                    
                    modesContainer.appendChild(modeItem);
                });
                
                // Assemble category group
                categoryGroup.appendChild(categoryHeader);
                categoryGroup.appendChild(modesContainer);
                
                // Add to sidebar
                aiModesList.appendChild(categoryGroup);
            });
            
            // Style sidebar items
            document.querySelectorAll('.category-header').forEach(header => {
                header.style.padding = '10px';
                header.style.fontWeight = 'bold';
                header.style.display = 'flex';
                header.style.alignItems = 'center';
                header.style.cursor = 'pointer';
                
                // Add toggle functionality
                header.addEventListener('click', function() {
                    const modesContainer = this.nextElementSibling;
                    if (modesContainer.style.display === 'none') {
                        modesContainer.style.display = 'block';
                        this.classList.remove('collapsed');
                    } else {
                        modesContainer.style.display = 'none';
                        this.classList.add('collapsed');
                    }
                });
                
                header.querySelector('i').style.marginRight = '10px';
            });
            
            // Initially collapse all but first category
            document.querySelectorAll('.category-modes').forEach((container, index) => {
                if (index > 0) {
                    container.style.display = 'none';
                    container.previousElementSibling.classList.add('collapsed');
                }
            });
            
            // Add event listeners to mode items
            document.querySelectorAll('[data-ai-mode]').forEach(modeItem => {
                modeItem.addEventListener('click', function() {
                    const modeId = this.getAttribute('data-ai-mode');
                    const isPremium = this.getAttribute('data-premium') === 'true';
                    
                    // Check if premium and subscription status
                    if (isPremium) {
                        const subscriptionManager = window.JAAT?.features?.['subscription-manager'];
                        
                        if (subscriptionManager && !subscriptionManager.canUseFeature('premium-ai-modes')) {
                            // If not in development mode, show upgrade modal
                            if (!(window.JAAT_ENV?.config?.isPremiumEnabled())) {
                                // Show subscription modal
                                const event = new CustomEvent('jaat.showSubscriptionModal', {
                                    bubbles: true
                                });
                                document.dispatchEvent(event);
                                return;
                            }
                        }
                    }
                    
                    // Set as current mode
                    if (aiModesManager.setCurrentMode(modeId)) {
                        // Update UI
                        document.querySelectorAll('[data-ai-mode]').forEach(item => {
                            item.classList.remove('active');
                        });
                        this.classList.add('active');
                        
                        // Update chat interface
                        updateChatInterface(modeId);
                    }
                });
            });
            
            // Set initial active mode
            const currentMode = aiModesManager.getCurrentMode();
            const currentModeItem = document.querySelector(`[data-ai-mode="${currentMode.id}"]`);
            if (currentModeItem) {
                currentModeItem.classList.add('active');
            }
        }
        
        // Update chat interface based on selected mode
        function updateChatInterface(modeId) {
            const mode = aiModesManager.getMode(modeId);
            if (!mode) return;
            
            // Update chat title
            const chatTitle = document.querySelector('.chat-title');
            if (chatTitle) {
                chatTitle.textContent = `JAAT-AI: ${mode.name}`;
            }
            
            // Update chat input placeholder
            const chatInput = document.querySelector('.chat-input');
            if (chatInput) {
                chatInput.placeholder = `Ask ${mode.name.toLowerCase()}...`;
            }
            
            // Update welcome message if needed
            const firstMessage = document.querySelector('.chat-messages .message:first-child .message-content');
            if (firstMessage) {
                const welcomeText = `I'm now in ${mode.name} mode. ${mode.description} How can I assist you?`;
                
                // Create new message
                const newMessage = document.createElement('div');
                newMessage.className = 'message';
                
                const avatar = document.createElement('div');
                avatar.className = 'message-avatar';
                
                const icon = document.createElement('i');
                icon.className = mode.icon;
                avatar.appendChild(icon);
                
                const content = document.createElement('div');
                content.className = 'message-content';
                
                const text = document.createElement('p');
                text.textContent = welcomeText;
                
                const time = document.createElement('div');
                time.className = 'message-time';
                time.textContent = 'Just now';
                
                content.appendChild(text);
                content.appendChild(time);
                
                newMessage.appendChild(avatar);
                newMessage.appendChild(content);
                
                // Clear messages and add new one
                const messagesContainer = document.querySelector('.chat-messages');
                if (messagesContainer) {
                    messagesContainer.innerHTML = '';
                    messagesContainer.appendChild(newMessage);
                }
            }
            
            // Add suggested prompts if they exist
            const suggestedPrompts = aiModesManager.getSuggestedPrompts(modeId);
            if (suggestedPrompts.length > 0) {
                // Check if we already have a prompt container
                let promptsContainer = document.querySelector('.suggested-prompts');
                
                if (!promptsContainer) {
                    // Create prompts container
                    promptsContainer = document.createElement('div');
                    promptsContainer.className = 'suggested-prompts';
                    
                    const promptsTitle = document.createElement('div');
                    promptsTitle.className = 'prompts-title';
                    promptsTitle.textContent = 'Suggested prompts:';
                    
                    promptsContainer.appendChild(promptsTitle);
                    
                    // Insert before input container
                    const inputContainer = document.querySelector('.chat-input-container');
                    if (inputContainer) {
                        inputContainer.parentNode.insertBefore(promptsContainer, inputContainer);
                    }
                    
                    // Style prompts
                    promptsContainer.style.padding = '10px 20px';
                    promptsContainer.style.marginBottom = '10px';
                    
                    promptsTitle.style.fontSize = '0.9rem';
                    promptsTitle.style.opacity = '0.7';
                    promptsTitle.style.marginBottom = '5px';
                }
                
                // Clear existing prompts
                const existingPromptButtons = promptsContainer.querySelectorAll('.prompt-button');
                existingPromptButtons.forEach(button => button.remove());
                
                // Add prompt buttons
                suggestedPrompts.forEach(prompt => {
                    const promptButton = document.createElement('button');
                    promptButton.className = 'prompt-button';
                    promptButton.textContent = prompt;
                    
                    promptButton.addEventListener('click', function() {
                        const chatInput = document.querySelector('.chat-input');
                        if (chatInput) {
                            chatInput.value = this.textContent;
                            chatInput.focus();
                        }
                    });
                    
                    promptsContainer.appendChild(promptButton);
                });
                
                // Style prompt buttons
                document.querySelectorAll('.prompt-button').forEach(button => {
                    button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    button.style.border = 'none';
                    button.style.borderRadius = '15px';
                    button.style.padding = '8px 12px';
                    button.style.margin = '5px 5px 5px 0';
                    button.style.cursor = 'pointer';
                    button.style.fontSize = '0.85rem';
                    button.style.transition = 'background-color 0.2s';
                    button.style.color = 'var(--text-light)';
                    button.style.maxWidth = '100%';
                    button.style.textAlign = 'left';
                    button.style.overflow = 'hidden';
                    button.style.textOverflow = 'ellipsis';
                    button.style.whiteSpace = 'nowrap';
                    
                    button.addEventListener('mouseover', function() {
                        this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    });
                    
                    button.addEventListener('mouseout', function() {
                        this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    });
                });
            }
        }
    }
});
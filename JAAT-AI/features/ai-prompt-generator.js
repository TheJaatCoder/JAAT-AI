/**
 * JAAT-AI AI Prompt Generator Feature
 * Generate effective prompts for various AI models and use cases
 */

class AIPromptGenerator {
    constructor() {
        // Supported AI models
        this.models = [
            { id: 'gpt4o', name: 'GPT-4o', description: 'The newest OpenAI model with advanced reasoning' },
            { id: 'gpt4', name: 'GPT-4', description: 'OpenAI\'s most capable model for complex tasks' },
            { id: 'claude3', name: 'Claude 3 Opus', description: 'Anthropic\'s most advanced model' },
            { id: 'claude3s', name: 'Claude 3 Sonnet', description: 'Balanced Claude model' },
            { id: 'gpt35', name: 'GPT-3.5 Turbo', description: 'Fast and cost-effective OpenAI model' },
            { id: 'palm2', name: 'PaLM 2', description: 'Google\'s powerful language model' },
            { id: 'llama3', name: 'Llama 3', description: 'Meta\'s open weights large language model' },
            { id: 'midjourney', name: 'Midjourney', description: 'Specialized for image generation' },
            { id: 'dalle', name: 'DALL-E 3', description: 'OpenAI\'s advanced image generation model' },
            { id: 'stable', name: 'Stable Diffusion', description: 'Open source image generation model' }
        ];
        
        // Prompt categories
        this.categories = [
            { id: 'writing', name: 'Writing & Content', subcategories: [
                'Blog Post', 'Essay', 'Story', 'Poetry', 'Script', 'Marketing', 'SEO', 'Email'
            ]},
            { id: 'business', name: 'Business & Professional', subcategories: [
                'Business Plan', 'Resume', 'Cover Letter', 'Proposal', 'Analysis', 'Report', 'Presentation'
            ]},
            { id: 'creative', name: 'Creative & Arts', subcategories: [
                'Story Idea', 'Character Design', 'World Building', 'Plot Development', 'Art Concept', 'Music'
            ]},
            { id: 'education', name: 'Education & Learning', subcategories: [
                'Study Guide', 'Lesson Plan', 'Explanation', 'Quiz', 'Research Question', 'Learning Path'
            ]},
            { id: 'programming', name: 'Programming & Tech', subcategories: [
                'Code Generation', 'Debugging', 'Algorithm', 'Documentation', 'System Design', 'Tech Explanation'
            ]},
            { id: 'images', name: 'Image Generation', subcategories: [
                'Portrait', 'Landscape', 'Concept Art', 'Product', 'Abstract', 'Photorealistic', 'Animation Style'
            ]},
            { id: 'data', name: 'Data & Analysis', subcategories: [
                'Data Analysis', 'Chart Creation', 'Pattern Detection', 'Statistics', 'Research Design'
            ]},
            { id: 'other', name: 'Specialized', subcategories: [
                'Legal', 'Medical', 'Scientific', 'Financial', 'Gaming', 'Social Media', 'UI/UX'
            ]}
        ];
        
        // Prompt templates
        this.templates = {
            writing: {
                basic: "Write a [TONE] [CONTENT_TYPE] about [TOPIC]. The target audience is [AUDIENCE]. It should be approximately [LENGTH] words long.",
                advanced: "Write a [TONE] [CONTENT_TYPE] about [TOPIC]. The target audience is [AUDIENCE] who want to [GOAL]. Include [SPECIFIC_ELEMENTS]. The piece should be approximately [LENGTH] words and written in [STYLE].",
                expert: "I need a [TONE] [CONTENT_TYPE] about [TOPIC] for [AUDIENCE] who want to [GOAL]. The content should include: [SPECIFIC_ELEMENTS]. It should address objections like [OBJECTIONS]. Use [STYLE] and include [FORMAT_ELEMENTS]. The piece should be approximately [LENGTH] words and have a [CALL_TO_ACTION] at the end."
            },
            business: {
                basic: "Create a [DOCUMENT_TYPE] for [PURPOSE]. The target audience is [AUDIENCE].",
                advanced: "Create a [DOCUMENT_TYPE] for [PURPOSE]. The target audience is [AUDIENCE]. Include sections on [SECTIONS]. The document should emphasize [KEY_POINTS].",
                expert: "Create a comprehensive [DOCUMENT_TYPE] for [PURPOSE] targeting [AUDIENCE]. Include detailed sections on [SECTIONS] with specific emphasis on [KEY_POINTS]. Address challenges such as [CHALLENGES]. Format according to [FORMAT] standards and include [SUPPORTING_ELEMENTS]. The tone should be [TONE] and convey [VALUES]."
            },
            creative: {
                basic: "Generate a [CREATIVE_TYPE] about [SUBJECT] in a [GENRE] style.",
                advanced: "Generate a [CREATIVE_TYPE] about [SUBJECT] in a [GENRE] style. Include elements of [ELEMENTS] and themes of [THEMES]. The target audience is [AUDIENCE].",
                expert: "Generate a detailed [CREATIVE_TYPE] about [SUBJECT] in a [GENRE] style. Include elements of [ELEMENTS] and explore themes of [THEMES]. The world/setting should feature [SETTING_DETAILS]. Characters should have [CHARACTER_TRAITS]. The overall mood should be [MOOD], and the piece should appeal to [AUDIENCE]. Include specific details about [SPECIFIC_ASPECTS]."
            },
            education: {
                basic: "Create a [EDUCATIONAL_CONTENT] about [TOPIC] for [AUDIENCE] at a [LEVEL] level.",
                advanced: "Create a [EDUCATIONAL_CONTENT] about [TOPIC] for [AUDIENCE] at a [LEVEL] level. Include [COMPONENTS] and focus on [LEARNING_OBJECTIVES].",
                expert: "Create a comprehensive [EDUCATIONAL_CONTENT] about [TOPIC] for [AUDIENCE] at a [LEVEL] level. The content should include [COMPONENTS] and focus on these learning objectives: [LEARNING_OBJECTIVES]. Incorporate [TEACHING_METHODS] and address common misconceptions like [MISCONCEPTIONS]. Include assessments in the form of [ASSESSMENT_TYPES] and provide resources for further learning. The content should align with [EDUCATIONAL_STANDARDS] if applicable."
            },
            programming: {
                basic: "Write [LANGUAGE] code for [FUNCTIONALITY]. The code should be [REQUIREMENTS].",
                advanced: "Write [LANGUAGE] code for [FUNCTIONALITY]. The code should be [REQUIREMENTS] and include [FEATURES]. Add comments to explain the logic.",
                expert: "Write [LANGUAGE] code for [FUNCTIONALITY]. The code should be [REQUIREMENTS] and implement [FEATURES]. Use [DESIGN_PATTERNS] where appropriate. Handle errors using [ERROR_HANDLING]. The code should be optimized for [OPTIMIZATION_GOALS]. Include comprehensive comments explaining the logic, edge cases, and any assumptions made. If applicable, include unit tests to verify functionality."
            },
            images: {
                basic: "Generate an image of [SUBJECT] in [STYLE] style.",
                advanced: "Generate an image of [SUBJECT] in [STYLE] style. The scene should include [ELEMENTS] and have [ATMOSPHERE] atmosphere. Use [COLOR_PALETTE] colors.",
                expert: "Generate a detailed image of [SUBJECT] in [STYLE] style. The scene should include [ELEMENTS] with [BACKGROUND] in the background and [FOREGROUND] in the foreground. The lighting should be [LIGHTING], creating a [ATMOSPHERE] atmosphere. Use a color palette of [COLOR_PALETTE]. The composition should focus on [COMPOSITION_FOCUS] with [PERSPECTIVE]. Technical details: [TECHNICAL_DETAILS]."
            },
            data: {
                basic: "Analyze [DATA_TYPE] data about [TOPIC] to find [INSIGHTS].",
                advanced: "Analyze [DATA_TYPE] data about [TOPIC] to find [INSIGHTS]. Consider variables such as [VARIABLES] and look for correlations between [CORRELATION_POINTS].",
                expert: "Perform a comprehensive analysis of [DATA_TYPE] data about [TOPIC] to uncover [INSIGHTS]. Consider the following variables: [VARIABLES]. Look for correlations between [CORRELATION_POINTS] and analyze trends over [TIME_PERIOD]. Apply [STATISTICAL_METHODS] to validate findings. Address potential biases such as [BIASES]. Present the results with [VISUALIZATION_TYPES] and include recommendations based on the analysis. Account for limitations such as [LIMITATIONS] in the interpretation."
            },
            other: {
                basic: "Create [CONTENT_TYPE] content about [TOPIC] for [PURPOSE].",
                advanced: "Create [CONTENT_TYPE] content about [TOPIC] for [PURPOSE]. Include [ELEMENTS] and address [CONSIDERATIONS].",
                expert: "Create detailed [CONTENT_TYPE] content about [TOPIC] for [PURPOSE]. Include [ELEMENTS] and thoroughly address [CONSIDERATIONS]. The content should comply with [STANDARDS_OR_REGULATIONS] and be suitable for [CONTEXT]. Account for [SPECIAL_REQUIREMENTS] and provide [DELIVERABLES]."
            }
        };
        
        // Prompt enhancers
        this.enhancers = [
            { id: 'specificity', name: 'Increase Specificity', description: 'Add more detailed instructions' },
            { id: 'context', name: 'Add Context', description: 'Provide background information' },
            { id: 'examples', name: 'Include Examples', description: 'Add examples of desired output' },
            { id: 'constraints', name: 'Set Constraints', description: 'Define limitations and boundaries' },
            { id: 'format', name: 'Specify Format', description: 'Define exact output format' },
            { id: 'steps', name: 'Request Step-by-Step', description: 'Ask for incremental process' },
            { id: 'reasoning', name: 'Request Reasoning', description: 'Ask model to explain its thinking' },
            { id: 'roleplay', name: 'Add Role-Play', description: 'Have model assume a specific role' }
        ];
        
        // Tone options
        this.tones = [
            'Professional', 'Casual', 'Humorous', 'Formal', 'Inspirational', 
            'Persuasive', 'Educational', 'Conversational', 'Authoritative', 'Poetic'
        ];
        
        // Expert skills for role-play enhancer
        this.expertRoles = [
            'Professor', 'Engineer', 'Doctor', 'Lawyer', 'Writer', 
            'Marketer', 'Programmer', 'Historian', 'Scientist', 'Artist',
            'Financial Advisor', 'Business Strategist', 'Teacher', 'Journalist',
            'Data Analyst', 'UX Designer', 'Product Manager'
        ];
        
        // Format options for format enhancer
        this.formats = [
            'Bullet Points', 'Numbered List', 'Essay', 'Table', 'JSON', 
            'Markdown', 'Dialogue', 'Q&A', 'Step-by-Step Guide', 'Pros and Cons'
        ];
        
        // Generated prompts history
        this.promptHistory = [];
        
        // Favorite prompts
        this.favoritePrompts = [];
        
        // Maximum history size
        this.maxHistorySize = 50;
        
        // Storage keys
        this.historyStorageKey = 'jaat-prompt-history';
        this.favoritesStorageKey = 'jaat-prompt-favorites';
        
        // API endpoint for AI-assisted refinement
        this.apiEndpoint = '/api/refine-prompt';
        
        // Event handlers
        this.eventHandlers = {};
    }

    /**
     * Initialize prompt generator
     * @param {Object} options - Configuration options
     * @returns {AIPromptGenerator} This instance
     */
    init(options = {}) {
        console.log('Initializing AI Prompt Generator...');
        
        // Apply custom options
        if (options) {
            if (options.apiEndpoint) {
                this.apiEndpoint = options.apiEndpoint;
            }
            
            if (options.maxHistorySize) {
                this.maxHistorySize = options.maxHistorySize;
            }
        }
        
        // Load saved data
        this.loadHistory();
        this.loadFavorites();
        
        // Trigger initialized event
        this.triggerEvent('initialized', {});
        
        return this;
    }

    /**
     * Load prompt history from localStorage
     */
    loadHistory() {
        try {
            const saved = localStorage.getItem(this.historyStorageKey);
            if (saved) {
                this.promptHistory = JSON.parse(saved);
                console.log(`Loaded ${this.promptHistory.length} prompt history items`);
            }
        } catch (error) {
            console.error('Error loading prompt history:', error);
            this.promptHistory = [];
        }
    }

    /**
     * Save prompt history to localStorage
     */
    saveHistory() {
        try {
            localStorage.setItem(this.historyStorageKey, JSON.stringify(this.promptHistory));
        } catch (error) {
            console.error('Error saving prompt history:', error);
        }
    }

    /**
     * Load favorite prompts from localStorage
     */
    loadFavorites() {
        try {
            const saved = localStorage.getItem(this.favoritesStorageKey);
            if (saved) {
                this.favoritePrompts = JSON.parse(saved);
                console.log(`Loaded ${this.favoritePrompts.length} favorite prompts`);
            }
        } catch (error) {
            console.error('Error loading favorite prompts:', error);
            this.favoritePrompts = [];
        }
    }

    /**
     * Save favorite prompts to localStorage
     */
    saveFavorites() {
        try {
            localStorage.setItem(this.favoritesStorageKey, JSON.stringify(this.favoritePrompts));
        } catch (error) {
            console.error('Error saving favorite prompts:', error);
        }
    }

    /**
     * Generate a prompt based on parameters
     * @param {Object} params - Prompt parameters
     * @returns {Object} Generated prompt
     */
    generatePrompt(params) {
        // Validate required parameters
        if (!params.category || !params.subcategory) {
            throw new Error('Category and subcategory are required');
        }
        
        // Get template
        const templateType = this.getCategoryId(params.category);
        const expertiseLevel = params.expertiseLevel || 'basic';
        
        if (!this.templates[templateType] || !this.templates[templateType][expertiseLevel]) {
            throw new Error(`Template not found for ${templateType} at ${expertiseLevel} level`);
        }
        
        let template = this.templates[templateType][expertiseLevel];
        
        // Fill in template placeholders with parameters
        let prompt = this.fillTemplate(template, params);
        
        // Apply enhancers
        if (params.enhancers && params.enhancers.length > 0) {
            prompt = this.applyEnhancers(prompt, params.enhancers, params);
        }
        
        // Add model-specific instructions if provided
        if (params.model) {
            prompt = this.addModelSpecificInstructions(prompt, params.model);
        }
        
        // Create prompt object
        const promptObject = {
            id: this.generateId(),
            prompt,
            params,
            category: params.category,
            subcategory: params.subcategory,
            model: params.model,
            expertiseLevel,
            timestamp: new Date().toISOString(),
            isFavorite: false
        };
        
        // Add to history
        this.addToHistory(promptObject);
        
        // Trigger event
        this.triggerEvent('promptGenerated', promptObject);
        
        return promptObject;
    }

    /**
     * Get category ID from name
     * @param {string} categoryName - Category name
     * @returns {string} Category ID
     */
    getCategoryId(categoryName) {
        const category = this.categories.find(cat => cat.name === categoryName);
        return category ? category.id : 'other';
    }

    /**
     * Fill template placeholders with parameters
     * @param {string} template - Template string
     * @param {Object} params - Parameters to fill
     * @returns {string} Filled template
     */
    fillTemplate(template, params) {
        // Replace placeholders with values from params
        let filledTemplate = template;
        
        // Create a map of placeholder replacements
        const replacements = {};
        
        // Iterate through all params and build replacements
        for (const [key, value] of Object.entries(params)) {
            // Convert camelCase or snake_case to UPPERCASE_WITH_UNDERSCORES
            const placeholder = key
                .replace(/([A-Z])/g, '_$1')
                .toUpperCase()
                .replace(/^_/, '');
                
            replacements[placeholder] = value;
        }
        
        // Special case for subcategory - use as CONTENT_TYPE or similar
        if (params.subcategory) {
            if (template.includes('[CONTENT_TYPE]')) {
                replacements['CONTENT_TYPE'] = params.subcategory;
            } else if (template.includes('[DOCUMENT_TYPE]')) {
                replacements['DOCUMENT_TYPE'] = params.subcategory;
            } else if (template.includes('[CREATIVE_TYPE]')) {
                replacements['CREATIVE_TYPE'] = params.subcategory;
            } else if (template.includes('[EDUCATIONAL_CONTENT]')) {
                replacements['EDUCATIONAL_CONTENT'] = params.subcategory;
            }
        }
        
        // Replace all placeholders that have values
        for (const [placeholder, value] of Object.entries(replacements)) {
            if (value && template.includes(`[${placeholder}]`)) {
                filledTemplate = filledTemplate.replace(
                    new RegExp(`\\[${placeholder}\\]`, 'g'), 
                    value
                );
            }
        }
        
        // Remove any remaining placeholders with generic text
        filledTemplate = filledTemplate.replace(/\[[A-Z_]+\]/g, '[specify]');
        
        return filledTemplate;
    }

    /**
     * Apply enhancers to prompt
     * @param {string} prompt - Base prompt
     * @param {Array} enhancerIds - IDs of enhancers to apply
     * @param {Object} params - Parameters for enhancers
     * @returns {string} Enhanced prompt
     */
    applyEnhancers(prompt, enhancerIds, params) {
        let enhancedPrompt = prompt;
        
        enhancerIds.forEach(enhancerId => {
            switch (enhancerId) {
                case 'specificity':
                    enhancedPrompt = this.enhanceSpecificity(enhancedPrompt, params);
                    break;
                case 'context':
                    enhancedPrompt = this.enhanceContext(enhancedPrompt, params);
                    break;
                case 'examples':
                    enhancedPrompt = this.enhanceWithExamples(enhancedPrompt, params);
                    break;
                case 'constraints':
                    enhancedPrompt = this.enhanceWithConstraints(enhancedPrompt, params);
                    break;
                case 'format':
                    enhancedPrompt = this.enhanceWithFormat(enhancedPrompt, params);
                    break;
                case 'steps':
                    enhancedPrompt = this.enhanceWithSteps(enhancedPrompt, params);
                    break;
                case 'reasoning':
                    enhancedPrompt = this.enhanceWithReasoning(enhancedPrompt, params);
                    break;
                case 'roleplay':
                    enhancedPrompt = this.enhanceWithRolePlay(enhancedPrompt, params);
                    break;
            }
        });
        
        return enhancedPrompt;
    }

    /**
     * Enhance prompt with more specificity
     * @param {string} prompt - Base prompt
     * @param {Object} params - Parameters
     * @returns {string} Enhanced prompt
     */
    enhanceSpecificity(prompt, params) {
        if (!params.specificDetails) {
            return prompt;
        }
        
        return `${prompt}\n\nSpecific details to include:\n${params.specificDetails}`;
    }

    /**
     * Enhance prompt with context
     * @param {string} prompt - Base prompt
     * @param {Object} params - Parameters
     * @returns {string} Enhanced prompt
     */
    enhanceContext(prompt, params) {
        if (!params.context) {
            return prompt;
        }
        
        return `Context: ${params.context}\n\n${prompt}`;
    }

    /**
     * Enhance prompt with examples
     * @param {string} prompt - Base prompt
     * @param {Object} params - Parameters
     * @returns {string} Enhanced prompt
     */
    enhanceWithExamples(prompt, params) {
        if (!params.examples) {
            return prompt;
        }
        
        return `${prompt}\n\nHere are examples of what I'm looking for:\n${params.examples}`;
    }

    /**
     * Enhance prompt with constraints
     * @param {string} prompt - Base prompt
     * @param {Object} params - Parameters
     * @returns {string} Enhanced prompt
     */
    enhanceWithConstraints(prompt, params) {
        if (!params.constraints) {
            return prompt;
        }
        
        return `${prompt}\n\nConstraints and limitations:\n${params.constraints}`;
    }

    /**
     * Enhance prompt with format instructions
     * @param {string} prompt - Base prompt
     * @param {Object} params - Parameters
     * @returns {string} Enhanced prompt
     */
    enhanceWithFormat(prompt, params) {
        if (!params.format && !params.outputFormat) {
            return prompt;
        }
        
        const format = params.format || params.outputFormat;
        return `${prompt}\n\nPlease format the response as: ${format}`;
    }

    /**
     * Enhance prompt with step-by-step request
     * @param {string} prompt - Base prompt
     * @param {Object} params - Parameters
     * @returns {string} Enhanced prompt
     */
    enhanceWithSteps(prompt, params) {
        return `${prompt}\n\nPlease provide your response in a detailed step-by-step format.`;
    }

    /**
     * Enhance prompt with reasoning request
     * @param {string} prompt - Base prompt
     * @param {Object} params - Parameters
     * @returns {string} Enhanced prompt
     */
    enhanceWithReasoning(prompt, params) {
        return `${prompt}\n\nPlease explain your reasoning and thinking process as you develop your response.`;
    }

    /**
     * Enhance prompt with role-play instructions
     * @param {string} prompt - Base prompt
     * @param {Object} params - Parameters
     * @returns {string} Enhanced prompt
     */
    enhanceWithRolePlay(prompt, params) {
        if (!params.expertRole) {
            const defaultRole = this.expertRoles[Math.floor(Math.random() * this.expertRoles.length)];
            return `I want you to act as an expert ${defaultRole}. ${prompt}`;
        }
        
        return `I want you to act as an expert ${params.expertRole}. ${prompt}`;
    }

    /**
     * Add model-specific instructions to prompt
     * @param {string} prompt - Base prompt
     * @param {string} modelId - Model ID
     * @returns {string} Enhanced prompt
     */
    addModelSpecificInstructions(prompt, modelId) {
        let enhancedPrompt = prompt;
        
        // Add model-specific instructions if needed
        switch (modelId) {
            case 'gpt4o':
            case 'gpt4':
            case 'gpt35':
                // OpenAI models
                if (prompt.includes('image')) {
                    enhancedPrompt += '\n\nPlease use detailed descriptions for creating the best possible image.';
                }
                break;
                
            case 'midjourney':
                // Midjourney specific formatting
                if (prompt.includes('image')) {
                    enhancedPrompt += '\n\nPlease use --ar 16:9 --v 5 for optimal results. Include specific details about lighting, atmosphere, and style.';
                }
                break;
                
            case 'dalle':
                // DALL-E specific formatting
                if (prompt.includes('image')) {
                    enhancedPrompt += '\n\nPlease be detailed but concise. Include style descriptors and specific image details.';
                }
                break;
                
            case 'stable':
                // Stable Diffusion specific formatting
                if (prompt.includes('image')) {
                    enhancedPrompt += '\n\nInclude quality boosters and style terms like "highly detailed, sharp focus, ultra-realistic" for better results.';
                }
                break;
        }
        
        return enhancedPrompt;
    }

    /**
     * Refine a prompt using AI assistance
     * @param {string} prompt - Base prompt
     * @param {string} refinementGoal - Goal for refinement
     * @returns {Promise<string>} Refined prompt
     */
    async refinePromptWithAI(prompt, refinementGoal) {
        try {
            // Call API for prompt refinement
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                    refinementGoal
                })
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            return data.refinedPrompt;
        } catch (error) {
            console.error('Error refining prompt:', error);
            throw error;
        }
    }

    /**
     * Add a prompt to history
     * @param {Object} promptObject - Prompt object
     */
    addToHistory(promptObject) {
        // Add to beginning of history
        this.promptHistory.unshift(promptObject);
        
        // Limit history size
        if (this.promptHistory.length > this.maxHistorySize) {
            this.promptHistory = this.promptHistory.slice(0, this.maxHistorySize);
        }
        
        // Save history
        this.saveHistory();
    }

    /**
     * Get prompt history
     * @param {number} limit - Maximum number of items to return
     * @returns {Array} Prompt history
     */
    getHistory(limit = 0) {
        if (limit > 0) {
            return this.promptHistory.slice(0, limit);
        }
        
        return [...this.promptHistory];
    }

    /**
     * Clear prompt history
     */
    clearHistory() {
        this.promptHistory = [];
        this.saveHistory();
        
        // Trigger event
        this.triggerEvent('historyCleared', {});
    }

    /**
     * Add a prompt to favorites
     * @param {string} promptId - Prompt ID
     * @returns {boolean} Success indicator
     */
    addToFavorites(promptId) {
        // Find prompt in history
        const prompt = this.promptHistory.find(p => p.id === promptId);
        if (!prompt) {
            return false;
        }
        
        // Check if already a favorite
        if (this.favoritePrompts.some(p => p.id === promptId)) {
            return false;
        }
        
        // Mark as favorite in history
        prompt.isFavorite = true;
        
        // Add to favorites
        this.favoritePrompts.push({ ...prompt });
        
        // Save favorites
        this.saveFavorites();
        this.saveHistory();
        
        // Trigger event
        this.triggerEvent('promptFavorited', prompt);
        
        return true;
    }

    /**
     * Remove a prompt from favorites
     * @param {string} promptId - Prompt ID
     * @returns {boolean} Success indicator
     */
    removeFromFavorites(promptId) {
        // Find prompt in favorites
        const index = this.favoritePrompts.findIndex(p => p.id === promptId);
        if (index === -1) {
            return false;
        }
        
        // Remove from favorites
        const removed = this.favoritePrompts.splice(index, 1)[0];
        
        // Update history item if it exists
        const historyItem = this.promptHistory.find(p => p.id === promptId);
        if (historyItem) {
            historyItem.isFavorite = false;
        }
        
        // Save favorites
        this.saveFavorites();
        this.saveHistory();
        
        // Trigger event
        this.triggerEvent('promptUnfavorited', removed);
        
        return true;
    }

    /**
     * Get favorite prompts
     * @returns {Array} Favorite prompts
     */
    getFavorites() {
        return [...this.favoritePrompts];
    }

    /**
     * Get a random prompt suggestion for inspiration
     * @param {string} category - Optional category to filter by
     * @returns {string} Prompt suggestion
     */
    getRandomPromptSuggestion(category = null) {
        // Sample topics for inspiration
        const topics = [
            'sustainable living', 'future technology', 'space exploration', 
            'artificial intelligence', 'mental health', 'personal growth',
            'remote work', 'digital art', 'machine learning', 'climate change',
            'virtual reality', 'genetics', 'education reform', 'quantum computing',
            'storytelling', 'historical events', 'cultural differences'
        ];
        
        // Sample audiences
        const audiences = [
            'beginners', 'experts', 'students', 'professionals', 'children',
            'young adults', 'seniors', 'tech enthusiasts', 'creative individuals',
            'business owners', 'researchers', 'general public'
        ];
        
        // Sample tones
        const tones = this.tones;
        
        // Get random category if not specified
        let categoryObj;
        if (category) {
            categoryObj = this.categories.find(cat => cat.id === category || cat.name === category);
        } else {
            categoryObj = this.categories[Math.floor(Math.random() * this.categories.length)];
        }
        
        if (!categoryObj) {
            categoryObj = this.categories[0];
        }
        
        // Get random subcategory
        const subcategory = categoryObj.subcategories[
            Math.floor(Math.random() * categoryObj.subcategories.length)
        ];
        
        // Get random topic, audience, and tone
        const topic = topics[Math.floor(Math.random() * topics.length)];
        const audience = audiences[Math.floor(Math.random() * audiences.length)];
        const tone = tones[Math.floor(Math.random() * tones.length)];
        
        // Get template
        const templateType = categoryObj.id;
        const expertiseLevel = ['basic', 'advanced', 'expert'][Math.floor(Math.random() * 3)];
        
        if (!this.templates[templateType] || !this.templates[templateType][expertiseLevel]) {
            return `Create a ${subcategory} about ${topic} for ${audience} in a ${tone.toLowerCase()} tone.`;
        }
        
        let template = this.templates[templateType][expertiseLevel];
        
        // Fill template with random values
        const params = {
            category: categoryObj.name,
            subcategory,
            topic,
            audience,
            tone
        };
        
        // Add more params based on template
        if (template.includes('[LENGTH]')) {
            params.length = [500, 750, 1000, 1500, 2000][Math.floor(Math.random() * 5)];
        }
        
        if (template.includes('[STYLE]')) {
            params.style = ['conversational', 'academic', 'narrative', 'technical', 'persuasive'][Math.floor(Math.random() * 5)];
        }
        
        const suggestion = this.fillTemplate(template, params);
        
        return suggestion;
    }

    /**
     * Generate a unique ID
     * @returns {string} Unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    /**
     * Register an event handler
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     */
    on(event, handler) {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        
        this.eventHandlers[event].push(handler);
    }

    /**
     * Trigger an event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    triggerEvent(event, data) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event].forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }

    /**
     * Create UI for prompt generator
     * @param {HTMLElement|string} container - Container element or selector
     * @returns {HTMLElement} Created UI element
     */
    createUI(container) {
        // Get container element
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) {
            console.error('Container element not found');
            return null;
        }
        
        // Create main UI container
        const uiContainer = document.createElement('div');
        uiContainer.className = 'prompt-generator-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'prompt-generator-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'prompt-generator-title';
        title.textContent = 'AI Prompt Generator';
        header.appendChild(title);
        
        // Create tabs container
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'tabs-container';
        uiContainer.appendChild(tabsContainer);
        
        const generatorTab = document.createElement('button');
        generatorTab.className = 'tab-button active';
        generatorTab.textContent = 'Generator';
        generatorTab.dataset.tab = 'generator';
        tabsContainer.appendChild(generatorTab);
        
        const historyTab = document.createElement('button');
        historyTab.className = 'tab-button';
        historyTab.textContent = 'History';
        historyTab.dataset.tab = 'history';
        tabsContainer.appendChild(historyTab);
        
        const favoritesTab = document.createElement('button');
        favoritesTab.className = 'tab-button';
        favoritesTab.textContent = 'Favorites';
        favoritesTab.dataset.tab = 'favorites';
        tabsContainer.appendChild(favoritesTab);
        
        // Create tab content containers
        const tabContents = document.createElement('div');
        tabContents.className = 'tab-contents';
        uiContainer.appendChild(tabContents);
        
        // Generator content
        const generatorContent = document.createElement('div');
        generatorContent.className = 'tab-content active';
        generatorContent.dataset.tab = 'generator';
        tabContents.appendChild(generatorContent);
        
        // Create generator form
        const generatorForm = document.createElement('form');
        generatorForm.className = 'generator-form';
        generatorContent.appendChild(generatorForm);
        
        // Model selection
        const modelGroup = document.createElement('div');
        modelGroup.className = 'form-group';
        generatorForm.appendChild(modelGroup);
        
        const modelLabel = document.createElement('label');
        modelLabel.htmlFor = 'model-select';
        modelLabel.textContent = 'Select AI Model';
        modelGroup.appendChild(modelLabel);
        
        const modelSelect = document.createElement('select');
        modelSelect.id = 'model-select';
        modelSelect.className = 'model-select';
        
        this.models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.name;
            option.title = model.description;
            modelSelect.appendChild(option);
        });
        
        modelGroup.appendChild(modelSelect);
        
        // Expertise level
        const expertiseGroup = document.createElement('div');
        expertiseGroup.className = 'form-group';
        generatorForm.appendChild(expertiseGroup);
        
        const expertiseLabel = document.createElement('label');
        expertiseLabel.textContent = 'Expertise Level';
        expertiseGroup.appendChild(expertiseLabel);
        
        const expertiseButtons = document.createElement('div');
        expertiseButtons.className = 'expertise-buttons';
        expertiseGroup.appendChild(expertiseButtons);
        
        const basicBtn = document.createElement('button');
        basicBtn.type = 'button';
        basicBtn.className = 'expertise-btn active';
        basicBtn.dataset.level = 'basic';
        basicBtn.textContent = 'Basic';
        expertiseButtons.appendChild(basicBtn);
        
        const advancedBtn = document.createElement('button');
        advancedBtn.type = 'button';
        advancedBtn.className = 'expertise-btn';
        advancedBtn.dataset.level = 'advanced';
        advancedBtn.textContent = 'Advanced';
        expertiseButtons.appendChild(advancedBtn);
        
        const expertBtn = document.createElement('button');
        expertBtn.type = 'button';
        expertBtn.className = 'expertise-btn';
        expertBtn.dataset.level = 'expert';
        expertBtn.textContent = 'Expert';
        expertiseButtons.appendChild(expertBtn);
        
        // Category and subcategory
        const categoryRow = document.createElement('div');
        categoryRow.className = 'form-row';
        generatorForm.appendChild(categoryRow);
        
        const categoryGroup = document.createElement('div');
        categoryGroup.className = 'form-group';
        categoryRow.appendChild(categoryGroup);
        
        const categoryLabel = document.createElement('label');
        categoryLabel.htmlFor = 'category-select';
        categoryLabel.textContent = 'Category';
        categoryGroup.appendChild(categoryLabel);
        
        const categorySelect = document.createElement('select');
        categorySelect.id = 'category-select';
        categorySelect.className = 'category-select';
        
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
        
        categoryGroup.appendChild(categorySelect);
        
        const subcategoryGroup = document.createElement('div');
        subcategoryGroup.className = 'form-group';
        categoryRow.appendChild(subcategoryGroup);
        
        const subcategoryLabel = document.createElement('label');
        subcategoryLabel.htmlFor = 'subcategory-select';
        subcategoryLabel.textContent = 'Subcategory';
        subcategoryGroup.appendChild(subcategoryLabel);
        
        const subcategorySelect = document.createElement('select');
        subcategorySelect.id = 'subcategory-select';
        subcategorySelect.className = 'subcategory-select';
        
        // Populate subcategories for first category
        if (this.categories.length > 0) {
            this.categories[0].subcategories.forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory;
                option.textContent = subcategory;
                subcategorySelect.appendChild(option);
            });
        }
        
        subcategoryGroup.appendChild(subcategorySelect);
        
        // Basic inputs
        const topicGroup = document.createElement('div');
        topicGroup.className = 'form-group';
        generatorForm.appendChild(topicGroup);
        
        const topicLabel = document.createElement('label');
        topicLabel.htmlFor = 'topic-input';
        topicLabel.textContent = 'Topic or Subject';
        topicGroup.appendChild(topicLabel);
        
        const topicInput = document.createElement('input');
        topicInput.type = 'text';
        topicInput.id = 'topic-input';
        topicInput.className = 'topic-input';
        topicInput.placeholder = 'Enter the main topic or subject';
        topicGroup.appendChild(topicInput);
        
        const audienceRow = document.createElement('div');
        audienceRow.className = 'form-row';
        generatorForm.appendChild(audienceRow);
        
        const audienceGroup = document.createElement('div');
        audienceGroup.className = 'form-group';
        audienceRow.appendChild(audienceGroup);
        
        const audienceLabel = document.createElement('label');
        audienceLabel.htmlFor = 'audience-input';
        audienceLabel.textContent = 'Target Audience';
        audienceGroup.appendChild(audienceLabel);
        
        const audienceInput = document.createElement('input');
        audienceInput.type = 'text';
        audienceInput.id = 'audience-input';
        audienceInput.className = 'audience-input';
        audienceInput.placeholder = 'Who is this for?';
        audienceGroup.appendChild(audienceInput);
        
        const toneGroup = document.createElement('div');
        toneGroup.className = 'form-group';
        audienceRow.appendChild(toneGroup);
        
        const toneLabel = document.createElement('label');
        toneLabel.htmlFor = 'tone-select';
        toneLabel.textContent = 'Tone';
        toneGroup.appendChild(toneLabel);
        
        const toneSelect = document.createElement('select');
        toneSelect.id = 'tone-select';
        toneSelect.className = 'tone-select';
        
        this.tones.forEach(tone => {
            const option = document.createElement('option');
            option.value = tone;
            option.textContent = tone;
            toneSelect.appendChild(option);
        });
        
        toneGroup.appendChild(toneSelect);
        
        // Add enhancers section
        const enhancersSection = document.createElement('div');
        enhancersSection.className = 'enhancers-section';
        generatorForm.appendChild(enhancersSection);
        
        const enhancersLabel = document.createElement('label');
        enhancersLabel.textContent = 'Add Enhancers (Optional)';
        enhancersSection.appendChild(enhancersLabel);
        
        const enhancersContainer = document.createElement('div');
        enhancersContainer.className = 'enhancers-container';
        enhancersSection.appendChild(enhancersContainer);
        
        this.enhancers.forEach(enhancer => {
            const enhancerItem = document.createElement('div');
            enhancerItem.className = 'enhancer-item';
            
            const enhancerCheckbox = document.createElement('input');
            enhancerCheckbox.type = 'checkbox';
            enhancerCheckbox.id = `enhancer-${enhancer.id}`;
            enhancerCheckbox.value = enhancer.id;
            enhancerCheckbox.dataset.enhancer = enhancer.id;
            
            const enhancerLabel = document.createElement('label');
            enhancerLabel.htmlFor = `enhancer-${enhancer.id}`;
            enhancerLabel.textContent = enhancer.name;
            enhancerLabel.title = enhancer.description;
            
            enhancerItem.appendChild(enhancerCheckbox);
            enhancerItem.appendChild(enhancerLabel);
            enhancersContainer.appendChild(enhancerItem);
        });
        
        // Enhancer input container for dynamic inputs
        const enhancerInputs = document.createElement('div');
        enhancerInputs.className = 'enhancer-inputs';
        enhancersSection.appendChild(enhancerInputs);
        
        // Generate prompt button
        const generateButtonContainer = document.createElement('div');
        generateButtonContainer.className = 'button-container';
        generatorForm.appendChild(generateButtonContainer);
        
        const getRandomButton = document.createElement('button');
        getRandomButton.type = 'button';
        getRandomButton.className = 'random-button';
        getRandomButton.textContent = 'Get Random Suggestion';
        generateButtonContainer.appendChild(getRandomButton);
        
        const generateButton = document.createElement('button');
        generateButton.type = 'submit';
        generateButton.className = 'generate-button';
        generateButton.textContent = 'Generate Prompt';
        generateButtonContainer.appendChild(generateButton);
        
        // Result display
        const resultContainer = document.createElement('div');
        resultContainer.className = 'result-container';
        resultContainer.style.display = 'none';
        generatorContent.appendChild(resultContainer);
        
        const resultHeader = document.createElement('div');
        resultHeader.className = 'result-header';
        resultContainer.appendChild(resultHeader);
        
        const resultTitle = document.createElement('div');
        resultTitle.className = 'result-title';
        resultTitle.textContent = 'Generated Prompt';
        resultHeader.appendChild(resultTitle);
        
        const resultActions = document.createElement('div');
        resultActions.className = 'result-actions';
        resultHeader.appendChild(resultActions);
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
        resultActions.appendChild(copyButton);
        
        const favoriteButton = document.createElement('button');
        favoriteButton.className = 'favorite-button';
        favoriteButton.innerHTML = '<i class="far fa-star"></i> Favorite';
        resultActions.appendChild(favoriteButton);
        
        const refineButton = document.createElement('button');
        refineButton.className = 'refine-button';
        refineButton.innerHTML = '<i class="fas fa-magic"></i> Refine';
        resultActions.appendChild(refineButton);
        
        const promptTextarea = document.createElement('textarea');
        promptTextarea.className = 'prompt-textarea';
        promptTextarea.readOnly = true;
        promptTextarea.rows = 6;
        resultContainer.appendChild(promptTextarea);
        
        // Refinement form (initially hidden)
        const refinementForm = document.createElement('div');
        refinementForm.className = 'refinement-form';
        refinementForm.style.display = 'none';
        resultContainer.appendChild(refinementForm);
        
        const refinementLabel = document.createElement('label');
        refinementLabel.htmlFor = 'refinement-goal';
        refinementLabel.textContent = 'What aspects would you like to improve?';
        refinementForm.appendChild(refinementLabel);
        
        const refinementInput = document.createElement('input');
        refinementInput.type = 'text';
        refinementInput.id = 'refinement-goal';
        refinementInput.className = 'refinement-goal';
        refinementInput.placeholder = 'e.g., "Make it more concise" or "Add more details about..."';
        refinementForm.appendChild(refinementInput);
        
        const refinementButtons = document.createElement('div');
        refinementButtons.className = 'refinement-buttons';
        refinementForm.appendChild(refinementButtons);
        
        const cancelRefinementButton = document.createElement('button');
        cancelRefinementButton.type = 'button';
        cancelRefinementButton.className = 'cancel-refinement-button';
        cancelRefinementButton.textContent = 'Cancel';
        refinementButtons.appendChild(cancelRefinementButton);
        
        const submitRefinementButton = document.createElement('button');
        submitRefinementButton.type = 'button';
        submitRefinementButton.className = 'submit-refinement-button';
        submitRefinementButton.textContent = 'Submit';
        refinementButtons.appendChild(submitRefinementButton);
        
        // History content
        const historyContent = document.createElement('div');
        historyContent.className = 'tab-content';
        historyContent.dataset.tab = 'history';
        historyContent.style.display = 'none';
        tabContents.appendChild(historyContent);
        
        const historyHeader = document.createElement('div');
        historyHeader.className = 'history-header';
        historyContent.appendChild(historyHeader);
        
        const historyTitle = document.createElement('h4');
        historyTitle.textContent = 'Prompt History';
        historyHeader.appendChild(historyTitle);
        
        const clearHistoryButton = document.createElement('button');
        clearHistoryButton.className = 'clear-history-button';
        clearHistoryButton.textContent = 'Clear History';
        historyHeader.appendChild(clearHistoryButton);
        
        const historyList = document.createElement('div');
        historyList.className = 'history-list';
        historyContent.appendChild(historyList);
        
        // Favorites content
        const favoritesContent = document.createElement('div');
        favoritesContent.className = 'tab-content';
        favoritesContent.dataset.tab = 'favorites';
        favoritesContent.style.display = 'none';
        tabContents.appendChild(favoritesContent);
        
        const favoritesHeader = document.createElement('div');
        favoritesHeader.className = 'favorites-header';
        favoritesContent.appendChild(favoritesHeader);
        
        const favoritesTitle = document.createElement('h4');
        favoritesTitle.textContent = 'Favorite Prompts';
        favoritesHeader.appendChild(favoritesTitle);
        
        const favoritesList = document.createElement('div');
        favoritesList.className = 'favorites-list';
        favoritesContent.appendChild(favoritesList);
        
        // Current prompt data
        let currentPrompt = null;
        
        // Function to handle category change
        const handleCategoryChange = () => {
            const categoryName = categorySelect.value;
            
            // Find category
            const category = this.categories.find(cat => cat.name === categoryName);
            if (!category) return;
            
            // Clear subcategory options
            subcategorySelect.innerHTML = '';
            
            // Add new options
            category.subcategories.forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory;
                option.textContent = subcategory;
                subcategorySelect.appendChild(option);
            });
        };
        
        // Function to handle enhancer selection
        const handleEnhancerSelection = () => {
            // Clear previous inputs
            enhancerInputs.innerHTML = '';
            
            // Get selected enhancers
            const selectedEnhancers = Array.from(
                enhancersContainer.querySelectorAll('input[type="checkbox"]:checked')
            ).map(checkbox => checkbox.dataset.enhancer);
            
            // Create inputs for selected enhancers
            selectedEnhancers.forEach(enhancerId => {
                switch (enhancerId) {
                    case 'specificity':
                        const specificityGroup = document.createElement('div');
                        specificityGroup.className = 'enhancer-input-group';
                        
                        const specificityLabel = document.createElement('label');
                        specificityLabel.htmlFor = 'specificity-input';
                        specificityLabel.textContent = 'Specific details to include:';
                        specificityGroup.appendChild(specificityLabel);
                        
                        const specificityInput = document.createElement('textarea');
                        specificityInput.id = 'specificity-input';
                        specificityInput.className = 'enhancer-textarea';
                        specificityInput.placeholder = 'Enter specific details...';
                        specificityInput.rows = 3;
                        specificityGroup.appendChild(specificityInput);
                        
                        enhancerInputs.appendChild(specificityGroup);
                        break;
                        
                    case 'context':
                        const contextGroup = document.createElement('div');
                        contextGroup.className = 'enhancer-input-group';
                        
                        const contextLabel = document.createElement('label');
                        contextLabel.htmlFor = 'context-input';
                        contextLabel.textContent = 'Background context:';
                        contextGroup.appendChild(contextLabel);
                        
                        const contextInput = document.createElement('textarea');
                        contextInput.id = 'context-input';
                        contextInput.className = 'enhancer-textarea';
                        contextInput.placeholder = 'Enter background context...';
                        contextInput.rows = 3;
                        contextGroup.appendChild(contextInput);
                        
                        enhancerInputs.appendChild(contextGroup);
                        break;
                        
                    case 'examples':
                        const examplesGroup = document.createElement('div');
                        examplesGroup.className = 'enhancer-input-group';
                        
                        const examplesLabel = document.createElement('label');
                        examplesLabel.htmlFor = 'examples-input';
                        examplesLabel.textContent = 'Examples of desired output:';
                        examplesGroup.appendChild(examplesLabel);
                        
                        const examplesInput = document.createElement('textarea');
                        examplesInput.id = 'examples-input';
                        examplesInput.className = 'enhancer-textarea';
                        examplesInput.placeholder = 'Enter examples...';
                        examplesInput.rows = 3;
                        examplesGroup.appendChild(examplesInput);
                        
                        enhancerInputs.appendChild(examplesGroup);
                        break;
                        
                    case 'constraints':
                        const constraintsGroup = document.createElement('div');
                        constraintsGroup.className = 'enhancer-input-group';
                        
                        const constraintsLabel = document.createElement('label');
                        constraintsLabel.htmlFor = 'constraints-input';
                        constraintsLabel.textContent = 'Constraints and limitations:';
                        constraintsGroup.appendChild(constraintsLabel);
                        
                        const constraintsInput = document.createElement('textarea');
                        constraintsInput.id = 'constraints-input';
                        constraintsInput.className = 'enhancer-textarea';
                        constraintsInput.placeholder = 'Enter constraints...';
                        constraintsInput.rows = 3;
                        constraintsGroup.appendChild(constraintsInput);
                        
                        enhancerInputs.appendChild(constraintsGroup);
                        break;
                        
                    case 'format':
                        const formatGroup = document.createElement('div');
                        formatGroup.className = 'enhancer-input-group';
                        
                        const formatLabel = document.createElement('label');
                        formatLabel.htmlFor = 'format-select';
                        formatLabel.textContent = 'Output format:';
                        formatGroup.appendChild(formatLabel);
                        
                        const formatSelect = document.createElement('select');
                        formatSelect.id = 'format-select';
                        formatSelect.className = 'enhancer-select';
                        
                        this.formats.forEach(format => {
                            const option = document.createElement('option');
                            option.value = format;
                            option.textContent = format;
                            formatSelect.appendChild(option);
                        });
                        
                        formatGroup.appendChild(formatSelect);
                        enhancerInputs.appendChild(formatGroup);
                        break;
                        
                    case 'roleplay':
                        const roleGroup = document.createElement('div');
                        roleGroup.className = 'enhancer-input-group';
                        
                        const roleLabel = document.createElement('label');
                        roleLabel.htmlFor = 'role-select';
                        roleLabel.textContent = 'Expert role:';
                        roleGroup.appendChild(roleLabel);
                        
                        const roleSelect = document.createElement('select');
                        roleSelect.id = 'role-select';
                        roleSelect.className = 'enhancer-select';
                        
                        this.expertRoles.forEach(role => {
                            const option = document.createElement('option');
                            option.value = role;
                            option.textContent = role;
                            roleSelect.appendChild(option);
                        });
                        
                        roleGroup.appendChild(roleSelect);
                        enhancerInputs.appendChild(roleGroup);
                        break;
                }
            });
        };
        
        // Function to populate prompt history
        const populateHistory = () => {
            historyList.innerHTML = '';
            
            const history = this.getHistory();
            
            if (history.length === 0) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'empty-message';
                emptyMessage.textContent = 'No prompt history yet';
                historyList.appendChild(emptyMessage);
                return;
            }
            
            history.forEach(prompt => {
                const historyItem = createPromptItem(prompt, 'history');
                historyList.appendChild(historyItem);
            });
        };
        
        // Function to populate favorites
        const populateFavorites = () => {
            favoritesList.innerHTML = '';
            
            const favorites = this.getFavorites();
            
            if (favorites.length === 0) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'empty-message';
                emptyMessage.textContent = 'No favorite prompts yet';
                favoritesList.appendChild(emptyMessage);
                return;
            }
            
            favorites.forEach(prompt => {
                const favoriteItem = createPromptItem(prompt, 'favorite');
                favoritesList.appendChild(favoriteItem);
            });
        };
        
        // Function to create a prompt item for history or favorites
        const createPromptItem = (prompt, itemType) => {
            const item = document.createElement('div');
            item.className = 'prompt-item';
            item.dataset.id = prompt.id;
            
            const itemHeader = document.createElement('div');
            itemHeader.className = 'prompt-item-header';
            
            const metaInfo = document.createElement('div');
            metaInfo.className = 'prompt-meta-info';
            
            const categoryInfo = document.createElement('span');
            categoryInfo.className = 'prompt-category';
            categoryInfo.textContent = `${prompt.category} › ${prompt.subcategory}`;
            metaInfo.appendChild(categoryInfo);
            
            const modelInfo = document.createElement('span');
            modelInfo.className = 'prompt-model';
            if (prompt.model) {
                const model = this.models.find(m => m.id === prompt.model);
                modelInfo.textContent = model ? model.name : prompt.model;
            }
            metaInfo.appendChild(modelInfo);
            
            const dateInfo = document.createElement('span');
            dateInfo.className = 'prompt-date';
            dateInfo.textContent = new Date(prompt.timestamp).toLocaleString();
            metaInfo.appendChild(dateInfo);
            
            itemHeader.appendChild(metaInfo);
            
            const itemActions = document.createElement('div');
            itemActions.className = 'prompt-item-actions';
            
            const useButton = document.createElement('button');
            useButton.className = 'use-prompt-button';
            useButton.innerHTML = '<i class="fas fa-reply"></i>';
            useButton.title = 'Use this prompt';
            itemActions.appendChild(useButton);
            
            const copyItemButton = document.createElement('button');
            copyItemButton.className = 'copy-prompt-button';
            copyItemButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyItemButton.title = 'Copy to clipboard';
            itemActions.appendChild(copyItemButton);
            
            if (itemType === 'history' && !prompt.isFavorite) {
                const favItemButton = document.createElement('button');
                favItemButton.className = 'fav-prompt-button';
                favItemButton.innerHTML = '<i class="far fa-star"></i>';
                favItemButton.title = 'Add to favorites';
                itemActions.appendChild(favItemButton);
                
                // Add event listener
                favItemButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.addToFavorites(prompt.id);
                    favItemButton.innerHTML = '<i class="fas fa-star"></i>';
                    favItemButton.disabled = true;
                    
                    // Update favorites list if visible
                    if (favoritesTab.classList.contains('active')) {
                        populateFavorites();
                    }
                });
            } else if (itemType === 'favorite') {
                const unfavButton = document.createElement('button');
                unfavButton.className = 'unfav-prompt-button';
                unfavButton.innerHTML = '<i class="fas fa-star"></i>';
                unfavButton.title = 'Remove from favorites';
                itemActions.appendChild(unfavButton);
                
                // Add event listener
                unfavButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.removeFromFavorites(prompt.id);
                    
                    // Remove item from list
                    item.remove();
                    
                    // Check if list is empty
                    if (this.getFavorites().length === 0) {
                        const emptyMessage = document.createElement('div');
                        emptyMessage.className = 'empty-message';
                        emptyMessage.textContent = 'No favorite prompts yet';
                        favoritesList.appendChild(emptyMessage);
                    }
                    
                    // Update history list if visible
                    if (historyTab.classList.contains('active')) {
                        populateHistory();
                    }
                });
            }
            
            itemHeader.appendChild(itemActions);
            item.appendChild(itemHeader);
            
            const promptPreview = document.createElement('div');
            promptPreview.className = 'prompt-preview';
            
            // Truncate prompt if too long
            const previewText = prompt.prompt.length > 150 ? 
                prompt.prompt.substring(0, 150) + '...' : 
                prompt.prompt;
                
            promptPreview.textContent = previewText;
            item.appendChild(promptPreview);
            
            // Full prompt content (hidden by default)
            const promptContent = document.createElement('div');
            promptContent.className = 'prompt-content';
            promptContent.style.display = 'none';
            
            const promptText = document.createElement('div');
            promptText.className = 'prompt-text';
            promptText.textContent = prompt.prompt;
            promptContent.appendChild(promptText);
            
            item.appendChild(promptContent);
            
            // Add event listeners
            
            // Toggle content visibility
            item.addEventListener('click', () => {
                if (promptContent.style.display === 'none') {
                    promptContent.style.display = 'block';
                    item.classList.add('expanded');
                } else {
                    promptContent.style.display = 'none';
                    item.classList.remove('expanded');
                }
            });
            
            // Use button click
            useButton.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Set current prompt
                currentPrompt = prompt;
                
                // Update textarea
                promptTextarea.value = prompt.prompt;
                
                // Show result container
                resultContainer.style.display = 'block';
                
                // Update favorite button
                updateFavoriteButton();
                
                // Scroll to result
                resultContainer.scrollIntoView({ behavior: 'smooth' });
                
                // Switch to generator tab
                generatorTab.click();
            });
            
            // Copy button click
            copyItemButton.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Copy to clipboard
                navigator.clipboard.writeText(prompt.prompt)
                    .then(() => {
                        // Show copied indicator
                        const originalHTML = copyItemButton.innerHTML;
                        copyItemButton.innerHTML = '<i class="fas fa-check"></i>';
                        
                        setTimeout(() => {
                            copyItemButton.innerHTML = originalHTML;
                        }, 1500);
                    })
                    .catch(err => {
                        console.error('Failed to copy text:', err);
                    });
            });
            
            return item;
        };
        
        // Function to update favorite button state
        const updateFavoriteButton = () => {
            if (!currentPrompt) return;
            
            const isFavorite = this.favoritePrompts.some(p => p.id === currentPrompt.id);
            
            if (isFavorite) {
                favoriteButton.innerHTML = '<i class="fas fa-star"></i> Favorited';
                favoriteButton.classList.add('favorited');
            } else {
                favoriteButton.innerHTML = '<i class="far fa-star"></i> Favorite';
                favoriteButton.classList.remove('favorited');
            }
        };
        
        // Handle form submission
        generatorForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form values
            const model = modelSelect.value;
            
            const expertiseLevel = 
                expertiseButtons.querySelector('.expertise-btn.active').dataset.level;
                
            const category = categorySelect.value;
            const subcategory = subcategorySelect.value;
            const topic = topicInput.value;
            const audience = audienceInput.value;
            const tone = toneSelect.value;
            
            // Check required fields
            if (!topic || !audience) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Get selected enhancers
            const enhancers = Array.from(
                enhancersContainer.querySelectorAll('input[type="checkbox"]:checked')
            ).map(checkbox => checkbox.dataset.enhancer);
            
            // Get enhancer values
            const enhancerValues = {};
            
            enhancers.forEach(enhancerId => {
                switch (enhancerId) {
                    case 'specificity':
                        const specificityInput = document.getElementById('specificity-input');
                        if (specificityInput) {
                            enhancerValues.specificDetails = specificityInput.value;
                        }
                        break;
                        
                    case 'context':
                        const contextInput = document.getElementById('context-input');
                        if (contextInput) {
                            enhancerValues.context = contextInput.value;
                        }
                        break;
                        
                    case 'examples':
                        const examplesInput = document.getElementById('examples-input');
                        if (examplesInput) {
                            enhancerValues.examples = examplesInput.value;
                        }
                        break;
                        
                    case 'constraints':
                        const constraintsInput = document.getElementById('constraints-input');
                        if (constraintsInput) {
                            enhancerValues.constraints = constraintsInput.value;
                        }
                        break;
                        
                    case 'format':
                        const formatSelect = document.getElementById('format-select');
                        if (formatSelect) {
                            enhancerValues.format = formatSelect.value;
                        }
                        break;
                        
                    case 'roleplay':
                        const roleSelect = document.getElementById('role-select');
                        if (roleSelect) {
                            enhancerValues.expertRole = roleSelect.value;
                        }
                        break;
                }
            });
            
            // Prepare parameters
            const params = {
                model,
                expertiseLevel,
                category,
                subcategory,
                topic,
                audience,
                tone,
                enhancers,
                ...enhancerValues
            };
            
            try {
                // Show loading state
                generateButton.textContent = 'Generating...';
                generateButton.disabled = true;
                
                // Generate prompt
                const promptObject = this.generatePrompt(params);
                
                // Set current prompt
                currentPrompt = promptObject;
                
                // Update textarea
                promptTextarea.value = promptObject.prompt;
                
                // Show result container
                resultContainer.style.display = 'block';
                
                // Hide refinement form
                refinementForm.style.display = 'none';
                
                // Update favorite button
                updateFavoriteButton();
                
                // Scroll to result
                resultContainer.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                console.error('Error generating prompt:', error);
                alert('Error generating prompt: ' + error.message);
            } finally {
                // Reset button
                generateButton.textContent = 'Generate Prompt';
                generateButton.disabled = false;
            }
        });
        
        // Add event listeners
        
        // Category change
        categorySelect.addEventListener('change', handleCategoryChange);
        
        // Expertise level buttons
        expertiseButtons.querySelectorAll('.expertise-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                expertiseButtons.querySelectorAll('.expertise-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            });
        });
        
        // Enhancer checkboxes
        enhancersContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', handleEnhancerSelection);
        });
        
        // Random suggestion button
        getRandomButton.addEventListener('click', () => {
            const suggestion = this.getRandomPromptSuggestion();
            
            // Update form with suggestion
            // Just fill in the textarea directly
            promptTextarea.value = suggestion;
            resultContainer.style.display = 'block';
            
            // Scroll to result
            resultContainer.scrollIntoView({ behavior: 'smooth' });
            
            // Store as current prompt, but don't save to history
            currentPrompt = {
                id: this.generateId(),
                prompt: suggestion,
                timestamp: new Date().toISOString(),
                isFavorite: false
            };
            
            // Update favorite button
            updateFavoriteButton();
        });
        
        // Copy button
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(promptTextarea.value)
                .then(() => {
                    // Show copied indicator
                    const originalText = copyButton.innerHTML;
                    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied';
                    
                    setTimeout(() => {
                        copyButton.innerHTML = originalText;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy text:', err);
                });
        });
        
        // Favorite button
        favoriteButton.addEventListener('click', () => {
            if (!currentPrompt) return;
            
            const isFavorite = this.favoritePrompts.some(p => p.id === currentPrompt.id);
            
            if (isFavorite) {
                this.removeFromFavorites(currentPrompt.id);
                favoriteButton.innerHTML = '<i class="far fa-star"></i> Favorite';
                favoriteButton.classList.remove('favorited');
            } else {
                this.addToFavorites(currentPrompt.id);
                favoriteButton.innerHTML = '<i class="fas fa-star"></i> Favorited';
                favoriteButton.classList.add('favorited');
            }
        });
        
        // Refine button
        refineButton.addEventListener('click', () => {
            // Toggle refinement form
            refinementForm.style.display = refinementForm.style.display === 'none' ? 'block' : 'none';
        });
        
        // Cancel refinement button
        cancelRefinementButton.addEventListener('click', () => {
            refinementForm.style.display = 'none';
        });
        
        // Submit refinement button
        submitRefinementButton.addEventListener('click', async () => {
            if (!currentPrompt) return;
            
            const refinementGoal = refinementInput.value.trim();
            if (!refinementGoal) {
                alert('Please specify what you want to improve');
                return;
            }
            
            try {
                // Show loading state
                submitRefinementButton.textContent = 'Refining...';
                submitRefinementButton.disabled = true;
                
                // Refine prompt
                const refinedPrompt = await this.refinePromptWithAI(
                    currentPrompt.prompt,
                    refinementGoal
                );
                
                // Update prompt
                promptTextarea.value = refinedPrompt;
                
                // Create new prompt object
                const promptObject = {
                    ...currentPrompt,
                    id: this.generateId(),
                    prompt: refinedPrompt,
                    timestamp: new Date().toISOString(),
                    isFavorite: false,
                    refinedFrom: currentPrompt.id
                };
                
                // Set as current prompt
                currentPrompt = promptObject;
                
                // Add to history
                this.addToHistory(promptObject);
                
                // Hide refinement form
                refinementForm.style.display = 'none';
                
                // Reset refinement input
                refinementInput.value = '';
                
                // Update favorite button
                updateFavoriteButton();
            } catch (error) {
                console.error('Error refining prompt:', error);
                alert('Error refining prompt: ' + error.message);
            } finally {
                // Reset button
                submitRefinementButton.textContent = 'Submit';
                submitRefinementButton.disabled = false;
            }
        });
        
        // Clear history button
        clearHistoryButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your prompt history?')) {
                this.clearHistory();
                populateHistory();
            }
        });
        
        // Tab switching
        tabsContainer.querySelectorAll('.tab-button').forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                tabsContainer.querySelectorAll('.tab-button').forEach(t => {
                    t.classList.remove('active');
                });
                tab.classList.add('active');
                
                // Show corresponding content
                const tabId = tab.dataset.tab;
                tabContents.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = content.dataset.tab === tabId ? 'block' : 'none';
                });
                
                // Populate content if needed
                if (tabId === 'history') {
                    populateHistory();
                } else if (tabId === 'favorites') {
                    populateFavorites();
                }
            });
        });
        
        // Register event handlers
        this.on('promptGenerated', () => {
            // Update history if visible
            if (historyTab.classList.contains('active')) {
                populateHistory();
            }
        });
        
        this.on('promptFavorited', () => {
            // Update favorites if visible
            if (favoritesTab.classList.contains('active')) {
                populateFavorites();
            }
        });
        
        this.on('promptUnfavorited', () => {
            // Update favorites if visible
            if (favoritesTab.classList.contains('active')) {
                populateFavorites();
            }
        });
        
        // Add styles
        this.addStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles
     */
    addStyles() {
        const styleId = 'prompt-generator-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .prompt-generator-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                width: 100%;
                max-width: 100%;
            }
            
            .prompt-generator-header {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .prompt-generator-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .tabs-container {
                display: flex;
                border-bottom: 1px solid var(--border-color, #30363d);
                margin-bottom: 1.5rem;
            }
            
            .tab-button {
                padding: 0.75rem 1.5rem;
                border: none;
                background-color: transparent;
                color: var(--text-secondary, #8b949e);
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
                border-bottom: 2px solid transparent;
            }
            
            .tab-button:hover {
                color: var(--text-primary, #f0f6fc);
            }
            
            .tab-button.active {
                color: var(--accent-primary, #7c3aed);
                border-bottom-color: var(--accent-primary, #7c3aed);
                font-weight: 500;
            }
            
            .generator-form {
                display: flex;
                flex-direction: column;
                gap: 1.25rem;
            }
            
            .form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .form-row {
                display: flex;
                gap: 1.25rem;
            }
            
            .form-row .form-group {
                flex: 1;
            }
            
            .form-group label {
                font-size: 0.875rem;
                font-weight: 500;
                color: var(--text-secondary, #8b949e);
            }
            
            .model-select,
            .category-select,
            .subcategory-select,
            .tone-select,
            .topic-input,
            .audience-input {
                padding: 0.625rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                width: 100%;
            }
            
            .expertise-buttons {
                display: flex;
                gap: 0.5rem;
            }
            
            .expertise-btn {
                flex: 1;
                padding: 0.5rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-secondary, #8b949e);
                font-size: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .expertise-btn:hover {
                border-color: var(--accent-secondary, #8b5cf6);
                color: var(--text-primary, #f0f6fc);
            }
            
            .expertise-btn.active {
                background-color: var(--accent-primary, #7c3aed);
                border-color: var(--accent-primary, #7c3aed);
                color: white;
            }
            
            .enhancers-section {
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
            }
            
            .enhancers-section label {
                display: block;
                font-size: 0.875rem;
                font-weight: 500;
                color: var(--text-secondary, #8b949e);
                margin-bottom: 0.75rem;
            }
            
            .enhancers-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                gap: 0.75rem;
                margin-bottom: 1rem;
            }
            
            .enhancer-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .enhancer-item input[type="checkbox"] {
                margin: 0;
            }
            
            .enhancer-item label {
                margin: 0;
                font-size: 0.8125rem;
                font-weight: normal;
                cursor: pointer;
            }
            
            .enhancer-inputs {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .enhancer-input-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 0.75rem;
            }
            
            .enhancer-input-group label {
                font-size: 0.8125rem;
                margin-bottom: 0;
            }
            
            .enhancer-textarea,
            .enhancer-select {
                padding: 0.5rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                width: 100%;
                resize: vertical;
            }
            
            .button-container {
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                margin-top: 0.5rem;
            }
            
            .random-button,
            .generate-button {
                padding: 0.625rem 1.25rem;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .random-button {
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                color: var(--text-primary, #f0f6fc);
            }
            
            .random-button:hover {
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .generate-button {
                background-color: var(--accent-primary, #7c3aed);
                border: none;
                color: white;
                flex: 1;
            }
            
            .generate-button:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .generate-button:disabled {
                opacity: 0.7;
                cursor: wait;
            }
            
            .result-container {
                margin-top: 2rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
            }
            
            .result-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .result-title {
                font-size: 1rem;
                font-weight: 600;
            }
            
            .result-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .copy-button,
            .favorite-button,
            .refine-button {
                padding: 0.375rem 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .copy-button:hover,
            .refine-button:hover {
                border-color: var(--accent-secondary, #8b5cf6);
                color: var(--text-primary, #f0f6fc);
            }
            
            .favorite-button:hover {
                border-color: #f59e0b;
                color: #f59e0b;
            }
            
            .favorite-button.favorited {
                border-color: #f59e0b;
                color: #f59e0b;
            }
            
            .prompt-textarea {
                width: 100%;
                padding: 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                font-family: var(--font-mono, 'Courier New', monospace);
                resize: vertical;
                min-height: 120px;
            }
            
            .refinement-form {
                margin-top: 1rem;
                padding: 1rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .refinement-form label {
                font-size: 0.875rem;
                font-weight: 500;
                color: var(--text-secondary, #8b949e);
            }
            
            .refinement-goal {
                padding: 0.625rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .refinement-buttons {
                display: flex;
                justify-content: flex-end;
                gap: 0.75rem;
                margin-top: 0.5rem;
            }
            
            .cancel-refinement-button,
            .submit-refinement-button {
                padding: 0.375rem 0.75rem;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .cancel-refinement-button {
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                color: var(--text-secondary, #8b949e);
            }
            
            .submit-refinement-button {
                background-color: var(--accent-primary, #7c3aed);
                border: none;
                color: white;
            }
            
            .cancel-refinement-button:hover {
                border-color: var(--accent-secondary, #8b5cf6);
                color: var(--text-primary, #f0f6fc);
            }
            
            .submit-refinement-button:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .history-header,
            .favorites-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .history-header h4,
            .favorites-header h4 {
                font-size: 1rem;
                font-weight: 600;
                margin: 0;
            }
            
            .clear-history-button {
                padding: 0.375rem 0.75rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--error-color, #ef4444);
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
                color: var(--error-color, #ef4444);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .clear-history-button:hover {
                background-color: var(--error-color, #ef4444);
                color: white;
            }
            
            .history-list,
            .favorites-list {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .prompt-item {
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .prompt-item:hover {
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .prompt-item.expanded {
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .prompt-item-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.75rem;
            }
            
            .prompt-meta-info {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .prompt-category {
                font-weight: 500;
            }
            
            .prompt-item-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .use-prompt-button,
            .copy-prompt-button,
            .fav-prompt-button,
            .unfav-prompt-button {
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .use-prompt-button:hover,
            .copy-prompt-button:hover {
                border-color: var(--accent-secondary, #8b5cf6);
                color: var(--text-primary, #f0f6fc);
            }
            
            .fav-prompt-button:hover {
                border-color: #f59e0b;
                color: #f59e0b;
            }
            
            .unfav-prompt-button {
                color: #f59e0b;
                border-color: #f59e0b;
            }
            
            .unfav-prompt-button:hover {
                background-color: #f59e0b;
                color: white;
            }
            
            .prompt-preview {
                font-size: 0.875rem;
                color: var(--text-primary, #f0f6fc);
                line-height: 1.5;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            
            .prompt-content {
                margin-top: 1rem;
                padding: 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius-sm, 0.375rem);
            }
            
            .prompt-text {
                font-size: 0.875rem;
                color: var(--text-primary, #f0f6fc);
                line-height: 1.5;
                white-space: pre-wrap;
            }
            
            .empty-message {
                padding: 2rem;
                text-align: center;
                color: var(--text-secondary, #8b949e);
                font-style: italic;
                background-color: var(--bg-primary, #0d1117);
                border: 1px dashed var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
            }
            
            @media (max-width: 768px) {
                .form-row {
                    flex-direction: column;
                    gap: 1.25rem;
                }
                
                .enhancers-container {
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                }
                
                .button-container {
                    flex-direction: column-reverse;
                }
                
                .result-header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.75rem;
                }
                
                .result-actions {
                    width: 100%;
                    justify-content: space-between;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIPromptGenerator };
} else {
    // Add to global scope for browser usage
    window.AIPromptGenerator = AIPromptGenerator;
}
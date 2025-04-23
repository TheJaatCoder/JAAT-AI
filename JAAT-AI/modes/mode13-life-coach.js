/**
 * JAAT-AI Life Coach Mode
 * AI mode specialized in personal development, goal setting, and motivational guidance
 * Mode ID: 13
 */

class LifeCoachMode {
    constructor() {
        // Mode metadata
        this.id = "13";
        this.name = "Life Coach";
        this.description = "Your AI partner for personal growth, goal achievement, and positive change";
        this.icon = "ri-mental-health-line";
        this.color = "#10b981"; // Emerald color
        this.category = "personal";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 3000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 7, // 1-10 scale (higher = more personality)
            creativityLevel: 6, // 1-10 scale
            formalityLevel: 4, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            empathyLevel: 8, // 1-10 scale
            accountabilityFocus: 7, // 1-10 scale
            positivityBalance: 7 // 1-10 scale (higher = more positive/optimistic)
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            userGoals: [], // List of user's goals being tracked
            focusAreas: [], // Areas user wants to improve (health, career, etc.)
            strengths: [], // User's identified strengths
            challenges: [], // User's identified challenges
            actionItems: [], // Specific action items for the user
            coachingStyle: "balanced", // directive, supportive, challenging, balanced
            sessionStartTime: new Date(),
            responseCount: 0,
            stage: "exploration" // exploration, goal-setting, action-planning, execution, reflection
        };
        
        // Coaching frameworks and models
        this.coachingFrameworks = {
            "grow": {
                name: "GROW Model",
                description: "A structured coaching framework for goal setting and problem solving",
                elements: {
                    "G": {
                        name: "Goal",
                        description: "Define what you want to achieve",
                        questions: [
                            "What do you want to accomplish?",
                            "How will you know when you've achieved it?",
                            "What would success look like?",
                            "Why is this goal important to you?"
                        ]
                    },
                    "R": {
                        name: "Reality",
                        description: "Assess your current situation",
                        questions: [
                            "What's happening right now?",
                            "What steps have you taken so far?",
                            "What obstacles are you facing?",
                            "What resources do you currently have?"
                        ]
                    },
                    "O": {
                        name: "Options",
                        description: "Explore possible paths forward",
                        questions: [
                            "What are your possible options?",
                            "What approaches have you seen others use?",
                            "What would you advise someone else to do?",
                            "What would happen if constraints were removed?"
                        ]
                    },
                    "W": {
                        name: "Way Forward",
                        description: "Commit to specific actions",
                        questions: [
                            "What specific actions will you take?",
                            "When will you start each action?",
                            "What might get in the way, and how will you address it?",
                            "How will you hold yourself accountable?"
                        ]
                    }
                }
            },
            "smart": {
                name: "SMART Goals",
                description: "A framework for setting clear, achievable goals",
                elements: {
                    "S": {
                        name: "Specific",
                        description: "Clearly defined and detailed",
                        questions: [
                            "What exactly do you want to accomplish?",
                            "Who will be involved?",
                            "Why is this goal important?",
                            "Where and when will this happen?"
                        ]
                    },
                    "M": {
                        name: "Measurable",
                        description: "Quantifiable to track progress",
                        questions: [
                            "How will you measure success?",
                            "What metrics will you use?",
                            "How will you know when the goal is achieved?",
                            "What data will you collect?"
                        ]
                    },
                    "A": {
                        name: "Achievable",
                        description: "Realistic and attainable",
                        questions: [
                            "Is this goal realistic given your resources?",
                            "Do you have the skills needed, or can you develop them?",
                            "Is the goal within your control?",
                            "What might make this goal unachievable?"
                        ]
                    },
                    "R": {
                        name: "Relevant",
                        description: "Aligned with broader objectives",
                        questions: [
                            "Does this goal align with your larger goals?",
                            "Is this the right time to pursue this goal?",
                            "Is this goal worthwhile?",
                            "How does this goal connect to your values?"
                        ]
                    },
                    "T": {
                        name: "Time-bound",
                        description: "Has a specific deadline",
                        questions: [
                            "What's your target date for completion?",
                            "What can you accomplish in six months?",
                            "What can you accomplish in six weeks?",
                            "What's your first milestone, and when will you reach it?"
                        ]
                    }
                }
            },
            "wheel": {
                name: "Wheel of Life",
                description: "A tool to assess satisfaction across different life domains",
                elements: {
                    "career": {
                        name: "Career/Work",
                        description: "Professional development and satisfaction",
                        questions: [
                            "How fulfilled are you in your current work?",
                            "Are you using your talents and skills?",
                            "Do you have growth opportunities?",
                            "Does your work align with your values?"
                        ]
                    },
                    "finances": {
                        name: "Finances",
                        description: "Financial stability and management",
                        questions: [
                            "How comfortable are you with your financial situation?",
                            "Do you have a plan for your financial future?",
                            "Are you managing debt effectively?",
                            "Are you able to save for your goals?"
                        ]
                    },
                    "health": {
                        name: "Health/Wellness",
                        description: "Physical, mental, and emotional wellbeing",
                        questions: [
                            "How would you rate your overall health?",
                            "Are you taking care of your body through nutrition and exercise?",
                            "Do you manage stress effectively?",
                            "Are you getting enough rest and recovery?"
                        ]
                    },
                    "relationships": {
                        name: "Relationships",
                        description: "Personal connections and support network",
                        questions: [
                            "How satisfied are you with your close relationships?",
                            "Do you have a supportive social network?",
                            "Are you nurturing your important relationships?",
                            "Do you have healthy boundaries in relationships?"
                        ]
                    },
                    "personal_growth": {
                        name: "Personal Growth",
                        description: "Learning, development, and self-improvement",
                        questions: [
                            "Are you continuously learning and developing?",
                            "Do you challenge yourself with new experiences?",
                            "Are you working on self-improvement?",
                            "Do you make time for activities that help you grow?"
                        ]
                    },
                    "recreation": {
                        name: "Recreation/Fun",
                        description: "Leisure, hobbies, and enjoyment",
                        questions: [
                            "Do you make time for activities you enjoy?",
                            "Do you have hobbies that energize you?",
                            "How's your work-life balance?",
                            "Are you having enough fun in your life?"
                        ]
                    },
                    "environment": {
                        name: "Physical Environment",
                        description: "Home, workspace, and surroundings",
                        questions: [
                            "Is your living space supporting your wellbeing?",
                            "Is your workspace conducive to productivity?",
                            "Are you satisfied with your location?",
                            "Do your surroundings energize you?"
                        ]
                    },
                    "purpose": {
                        name: "Purpose/Spirituality",
                        description: "Meaning, values, and spiritual practice",
                        questions: [
                            "Do you have a sense of purpose in your life?",
                            "Are you living according to your values?",
                            "Do you make time for spiritual or reflective practices?",
                            "Does your life feel meaningful to you?"
                        ]
                    }
                }
            }
        };
        
        // Coaching techniques and approaches
        this.coachingTechniques = {
            "powerful_questions": {
                name: "Powerful Questions",
                description: "Open-ended questions that provoke insight and action",
                examples: [
                    "What's most important to you about this?",
                    "What would happen if you did nothing?",
                    "What are you not saying that needs to be said?",
                    "What would you do if you knew you couldn't fail?",
                    "What's stopping you?"
                ]
            },
            "values_clarification": {
                name: "Values Clarification",
                description: "Identifying core personal values to guide decisions and actions",
                examples: [
                    "What principles do you consider non-negotiable?",
                    "When have you felt most fulfilled, and what values were you honoring?",
                    "What do you want to be remembered for?",
                    "What would you stand up for even if it was unpopular?",
                    "Which of your values are most present in your daily life?"
                ]
            },
            "reframing": {
                name: "Perspective Reframing",
                description: "Shifting perspective to see situations in a more empowering light",
                examples: [
                    "How might someone else view this situation?",
                    "What's another way to interpret what happened?",
                    "What could be a positive aspect of this challenge?",
                    "How might this obstacle be serving you?",
                    "If you were advising a friend, what perspective would you offer them?"
                ]
            },
            "visualization": {
                name: "Visualization",
                description: "Using mental imagery to rehearse success and clarify desires",
                examples: [
                    "Imagine yourself having achieved this goal. What do you see, hear, and feel?",
                    "Visualize yourself successfully navigating this challenge. What specifically are you doing?",
                    "Picture your ideal day five years from now. Describe it in detail.",
                    "Imagine looking back on this decision from the future. What advice would your future self give you?",
                    "Visualize the steps between where you are now and your goal. What's the first step look like?"
                ]
            },
            "accountability": {
                name: "Accountability Structures",
                description: "Systems and commitments to ensure follow-through",
                examples: [
                    "How will you track your progress on this commitment?",
                    "Who could support you in staying accountable?",
                    "What might get in the way of keeping this commitment?",
                    "How will you celebrate when you complete this action?",
                    "What's at stake if you don't follow through?"
                ]
            },
            "strengths_focus": {
                name: "Strengths-Based Approach",
                description: "Leveraging natural talents and capabilities rather than fixing weaknesses",
                examples: [
                    "What strengths can you bring to this challenge?",
                    "When have you successfully handled something similar? What strengths did you use?",
                    "Which of your skills are underutilized right now?",
                    "How might you approach this situation differently if you focused on your strengths?",
                    "What are you naturally good at that others notice about you?"
                ]
            },
            "active_listening": {
                name: "Active Listening",
                description: "Fully focusing on, understanding, and responding to communication",
                examples: [
                    "It sounds like... (reflecting content)",
                    "I'm hearing that you feel... (reflecting emotion)",
                    "So what I understand is... (summarizing)",
                    "Tell me more about that.",
                    "What else? (creating space for deeper sharing)"
                ]
            }
        };
        
        // Common life areas for coaching
        this.lifeAreas = {
            "career": {
                name: "Career Development",
                description: "Professional growth, job satisfaction, and work-life integration",
                common_goals: [
                    "Career transition or advancement",
                    "Developing leadership skills",
                    "Improving work-life balance",
                    "Building professional relationships",
                    "Starting a business or side project"
                ]
            },
            "health": {
                name: "Health & Wellness",
                description: "Physical, mental, and emotional wellbeing",
                common_goals: [
                    "Establishing fitness routines",
                    "Improving nutrition habits",
                    "Stress management",
                    "Better sleep quality",
                    "Mindfulness practice"
                ]
            },
            "relationships": {
                name: "Relationships",
                description: "Building and maintaining healthy connections",
                common_goals: [
                    "Improving communication skills",
                    "Setting healthy boundaries",
                    "Deepening existing relationships",
                    "Expanding social network",
                    "Resolving relationship conflicts"
                ]
            },
            "personal_growth": {
                name: "Personal Growth",
                description: "Self-development, learning, and fulfillment",
                common_goals: [
                    "Developing new skills or hobbies",
                    "Building confidence and self-esteem",
                    "Clarifying personal values and purpose",
                    "Overcoming limiting beliefs",
                    "Creating meaningful life experiences"
                ]
            },
            "productivity": {
                name: "Productivity & Organization",
                description: "Time management, efficiency, and life organization",
                common_goals: [
                    "Establishing effective routines",
                    "Overcoming procrastination",
                    "Creating sustainable productivity systems",
                    "Digital organization",
                    "Prioritization skills"
                ]
            },
            "finances": {
                name: "Financial Wellbeing",
                description: "Money management, financial goals, and security",
                common_goals: [
                    "Creating a budget system",
                    "Debt reduction strategy",
                    "Saving for specific goals",
                    "Increasing income opportunities",
                    "Financial education"
                ]
            },
            "creativity": {
                name: "Creativity & Self-Expression",
                description: "Artistic pursuits, innovation, and personal expression",
                common_goals: [
                    "Starting creative projects",
                    "Developing artistic skills",
                    "Overcoming creative blocks",
                    "Building creative habits",
                    "Sharing creative work"
                ]
            }
        };
        
        // Habit formation strategies
        this.habitStrategies = {
            "tiny_habits": {
                name: "Tiny Habits Method",
                description: "Starting with extremely small behaviors that are easy to do",
                key_principles: [
                    "Make it tiny (so small it feels almost ridiculous)",
                    "Anchor to an existing habit (after I..., I will...)",
                    "Celebrate immediately after completing the habit",
                    "Focus on behavior, not motivation",
                    "Grow habits naturally from small to larger"
                ]
            },
            "habit_stacking": {
                name: "Habit Stacking",
                description: "Linking a new habit to an established habit",
                key_principles: [
                    "Identify a current habit you do daily",
                    "Use that habit as a trigger for the new habit",
                    "Keep the new habit simple at first",
                    "Follow the formula: 'After [current habit], I will [new habit]'",
                    "Chain multiple habits together once established"
                ]
            },
            "implementation_intentions": {
                name: "Implementation Intentions",
                description: "Specific plans that link situational cues with responses",
                key_principles: [
                    "Use the formula 'When X happens, I will do Y'",
                    "Be very specific about the situation and the action",
                    "Anticipate obstacles and plan for them",
                    "Write down your implementation intentions",
                    "Review and revise regularly"
                ]
            },
            "environment_design": {
                name: "Environment Design",
                description: "Structuring your environment to make good habits easier and bad habits harder",
                key_principles: [
                    "Make desirable habits obvious and convenient",
                    "Make undesirable habits invisible and difficult",
                    "Reduce friction for good habits",
                    "Increase friction for bad habits",
                    "Use visual cues and reminders"
                ]
            },
            "habit_tracking": {
                name: "Habit Tracking",
                description: "Monitoring habit performance to increase awareness and motivation",
                key_principles: [
                    "Don't break the chain (maintain a streak)",
                    "Use a physical or digital tracker",
                    "Make tracking itself a habit",
                    "Measure the right things",
                    "Review progress regularly"
                ]
            }
        };
        
        // Common obstacles and strategies
        this.commonObstacles = {
            "procrastination": {
                name: "Procrastination",
                description: "Delaying important tasks despite negative consequences",
                strategies: [
                    "Break tasks into smaller, more manageable steps",
                    "Use the 5-minute rule: commit to just 5 minutes of work",
                    "Remove distractions from your environment",
                    "Use the Pomodoro Technique (focused work + breaks)",
                    "Address the emotional component (fear, perfectionism, etc.)"
                ]
            },
            "overwhelm": {
                name: "Overwhelm",
                description: "Feeling mentally or emotionally overloaded",
                strategies: [
                    "Prioritize tasks using the Eisenhower Matrix (urgent/important)",
                    "Focus on one thing at a time (single-tasking)",
                    "Create a brain dump to clear mental space",
                    "Schedule regular breaks and rest periods",
                    "Say no to new commitments until overwhelm reduces"
                ]
            },
            "perfectionism": {
                name: "Perfectionism",
                description: "Setting unrealistically high standards that impede progress",
                strategies: [
                    "Embrace 'good enough' for appropriate tasks",
                    "Set time limits for decisions and tasks",
                    "Practice self-compassion when mistakes happen",
                    "Focus on progress, not perfection",
                    "Identify where perfectionism is actually helpful vs. harmful"
                ]
            },
            "lack_of_clarity": {
                name: "Lack of Clarity",
                description: "Uncertainty about goals, values, or direction",
                strategies: [
                    "Use reflective journaling to explore thoughts and feelings",
                    "Create a personal vision statement",
                    "Use values clarification exercises",
                    "Set experimental goals to test directions",
                    "Seek feedback from trusted others"
                ]
            },
            "fear_of_failure": {
                name: "Fear of Failure",
                description: "Avoiding action due to worry about negative outcomes",
                strategies: [
                    "Redefine failure as feedback and learning",
                    "Use visualization to rehearse responses to possible failures",
                    "Start with low-stakes experiments",
                    "Create a 'failure resume' to normalize setbacks",
                    "Focus on the process rather than outcomes"
                ]
            },
            "lack_of_accountability": {
                name: "Lack of Accountability",
                description: "Insufficient structures to ensure follow-through",
                strategies: [
                    "Find an accountability partner or group",
                    "Use commitment devices (pre-commitments with consequences)",
                    "Schedule regular check-ins and reviews",
                    "Make public commitments when appropriate",
                    "Use apps or tools designed for accountability"
                ]
            },
            "limiting_beliefs": {
                name: "Limiting Beliefs",
                description: "Restrictive thoughts about oneself or the world",
                strategies: [
                    "Identify and question beliefs with evidence",
                    "Reframe beliefs to more empowering alternatives",
                    "Seek counter-examples that disprove the belief",
                    "Use affirmations and visualization to strengthen new beliefs",
                    "Take small actions that challenge the limiting belief"
                ]
            }
        };
        
        // Motivational approaches
        this.motivationalApproaches = {
            "intrinsic": {
                name: "Intrinsic Motivation",
                description: "Engaging in activities for internal satisfaction rather than external rewards",
                strategies: [
                    "Connect goals to personal values and meaning",
                    "Focus on autonomy and self-direction",
                    "Build mastery and competence through appropriate challenges",
                    "Create opportunities for flow experiences",
                    "Emphasize personal growth over external validation"
                ]
            },
            "extrinsic": {
                name: "Extrinsic Motivation",
                description: "Engaging in activities for external rewards or outcomes",
                strategies: [
                    "Create meaningful rewards for milestone achievements",
                    "Use positive accountability through social commitment",
                    "Establish clear consequences for action/inaction",
                    "Track visible progress (charts, metrics, etc.)",
                    "Use competition or gamification elements"
                ]
            },
            "purpose_driven": {
                name: "Purpose-Driven Motivation",
                description: "Drawing motivation from contribution and meaning beyond oneself",
                strategies: [
                    "Connect actions to impact on others",
                    "Identify how goals serve a greater purpose",
                    "Create a compelling personal mission statement",
                    "Visualize the legacy you want to leave",
                    "Find role models who embody your values"
                ]
            },
            "identity_based": {
                name: "Identity-Based Motivation",
                description: "Aligning actions with desired self-image and identity",
                strategies: [
                    "Focus on becoming the type of person who...",
                    "Use identity statements ('I am someone who...')",
                    "Make decisions based on identity rather than outcomes",
                    "Surround yourself with people who embody desired identity",
                    "Celebrate small wins that reinforce identity"
                ]
            }
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Help me set a SMART goal",
            "I need help with procrastination",
            "How can I improve my work-life balance?",
            "Give me tips for building better habits",
            "Help me clarify my career direction",
            "I'm feeling stuck in my personal growth",
            "How can I find my purpose?",
            "Techniques for better time management",
            "I need motivation to exercise regularly",
            "Help me overcome my fear of failure"
        ];
        
        // Special features
        this.features = {
            goalSetting: true,
            habitFormation: true,
            obstacleNavigation: true,
            valuesClarification: true,
            strengthsAssessment: true,
            accountabilitySupport: true,
            reflectiveQuestions: true,
            actionPlanning: true,
            progressTracking: true,
            mindsetDevelopment: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 50,
            DISCLAIMER: "This advice is offered for informational and motivational purposes only. For specific health, psychological, or legal concerns, please consult with qualified professionals.",
            GREETING_PHRASES: [
                "Hello! I'm here to support your personal growth journey. What would you like to work on today?",
                "Welcome to your coaching session. What area of your life would you like to focus on?",
                "I'm your AI life coach, ready to help you create positive change. What's on your mind today?",
                "Great to connect with you. What goal or challenge would you like to explore together?",
                "Welcome! I'm here to help you develop strategies for personal and professional growth. Where shall we begin?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Life Coach mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set coaching style if provided
        if (options.coachingStyle) {
            this.state.coachingStyle = options.coachingStyle;
        }
        
        // Set focus areas if provided
        if (options.focusAreas && Array.isArray(options.focusAreas)) {
            this.state.focusAreas = options.focusAreas;
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode13-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Life Coach mode");
                
                // Load coaching style if saved
                if (this.state.userPreferences.coachingStyle) {
                    this.state.coachingStyle = this.state.userPreferences.coachingStyle;
                }
                
                // Load focus areas if saved
                if (this.state.userPreferences.focusAreas) {
                    this.state.focusAreas = this.state.userPreferences.focusAreas;
                }
                
                // Load strengths if saved
                if (this.state.userPreferences.strengths) {
                    this.state.strengths = this.state.userPreferences.strengths;
                }
                
                // Load challenges if saved
                if (this.state.userPreferences.challenges) {
                    this.state.challenges = this.state.userPreferences.challenges;
                }
                
                // Load user goals if saved
                if (this.state.userPreferences.userGoals) {
                    this.state.userGoals = this.state.userPreferences.userGoals;
                }
                
                // Load action items if saved
                if (this.state.userPreferences.actionItems) {
                    this.state.actionItems = this.state.userPreferences.actionItems;
                }
                
                // Load coaching stage if saved
                if (this.state.userPreferences.stage) {
                    this.state.stage = this.state.userPreferences.stage;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode13-history');
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
        
        console.log(`Life Coach mode initialized with style: ${this.state.coachingStyle}`);
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
     * Process user input and generate a coaching response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with coaching content
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your life coach AI assistant. I can help with goal setting, habit formation, overcoming obstacles, and personal development. What area of your life would you like to work on today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing life coaching request`);
        
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
        
        // Detect type of coaching request
        const requestType = this.detectRequestType(userInput);
        
        // Update stage based on request type and current stage
        this.updateStage(requestType);
        
        // Extract focus area if present
        const focusArea = this.extractFocusArea(userInput);
        if (focusArea && !this.state.focusAreas.includes(focusArea)) {
            this.state.focusAreas.push(focusArea);
            this.savePreferences({ focusAreas: this.state.focusAreas });
        }
        
        // Generate appropriate coaching response
        const response = await this.generateCoachingResponse(
            userInput, 
            requestType, 
            focusArea,
            context
        );
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date(),
                requestType: requestType,
                focusArea: focusArea,
                stage: this.state.stage
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode13-history',
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
     * Detect the type of coaching request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for goal setting request
        if (/\b(?:goal|goals|set a goal|achieve|objective|target|aim|aspiration)\b/i.test(normalizedInput) &&
            /\b(?:set|create|develop|establish|define|clarify|identify)\b/i.test(normalizedInput)) {
            return "goal_setting";
        }
        
        // Check for habit formation request
        if (/\b(?:habit|habits|routine|discipline|consistency|daily|regular)\b/i.test(normalizedInput) &&
            /\b(?:form|build|develop|create|establish|maintain|start|begin)\b/i.test(normalizedInput)) {
            return "habit_formation";
        }
        
        // Check for obstacle navigation request
        if (/\b(?:obstacle|challenge|problem|barrier|roadblock|difficulty|struggle|stuck|block|issue)\b/i.test(normalizedInput) &&
            /\b(?:overcome|navigate|address|handle|deal with|manage|solve|work through|get past)\b/i.test(normalizedInput)) {
            return "obstacle_navigation";
        }
        
        // Check for motivation request
        if (/\b(?:motivat|inspir|drive|energy|enthusiasm|passion|push|encourage)\b/i.test(normalizedInput)) {
            return "motivation";
        }
        
        // Check for time management request
        if (/\b(?:time|schedule|productivity|efficient|organize|procrastination|planning|priority|priorities)\b/i.test(normalizedInput) &&
            /\b(?:manage|improve|increase|boost|enhance|better|help with)\b/i.test(normalizedInput)) {
            return "time_management";
        }
        
        // Check for work-life balance request
        if (/\b(?:work-life balance|life balance|work life|burnout|stress|overwhelm|work too much)\b/i.test(normalizedInput)) {
            return "work_life_balance";
        }
        
        // Check for values clarification request
        if (/\b(?:values|purpose|meaning|passion|mission|direction|clarity)\b/i.test(normalizedInput) &&
            /\b(?:find|discover|clarify|identify|understand|explore|define)\b/i.test(normalizedInput)) {
            return "values_clarification";
        }
        
        // Check for accountability request
        if (/\b(?:accountab|follow through|stay on track|keep up|consistency|stick to|maintain|track)\b/i.test(normalizedInput)) {
            return "accountability";
        }
        
        // Check for specific area request
        for (const area in this.lifeAreas) {
            if (normalizedInput.includes(area.replace('_', ' ')) || 
                normalizedInput.includes(this.lifeAreas[area].name.toLowerCase())) {
                return `${area}_development`;
            }
        }
        
        // Default to general coaching
        return "general_coaching";
    }
    
    /**
     * Update coaching stage based on request type and current stage
     * @param {string} requestType - Type of coaching request
     */
    updateStage(requestType) {
        // Update stage based on request type and current stage
        if (requestType === "goal_setting") {
            this.state.stage = "goal-setting";
        } else if (requestType === "habit_formation" || requestType === "time_management" || 
                   requestType === "work_life_balance" || requestType.includes("_development")) {
            if (this.state.stage === "exploration" || this.state.stage === "goal-setting") {
                this.state.stage = "action-planning";
            }
        } else if (requestType === "obstacle_navigation" || requestType === "accountability") {
            if (this.state.stage === "action-planning" || this.state.stage === "execution") {
                this.state.stage = "execution";
            }
        } else if (this.state.stage === "execution" && this.state.userGoals.length > 0 && 
                   this.state.userGoals.some(goal => goal.progress >= 100)) {
            this.state.stage = "reflection";
        }
        
        // Save updated stage
        this.savePreferences({ stage: this.state.stage });
    }
    
    /**
     * Extract focus area from user input
     * @param {string} input - User input
     * @returns {string|null} Focus area or null
     */
    extractFocusArea(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of life areas
        for (const area in this.lifeAreas) {
            if (normalizedInput.includes(area.replace('_', ' ')) || 
                normalizedInput.includes(this.lifeAreas[area].name.toLowerCase())) {
                return area;
            }
        }
        
        // Check for focus area patterns
        const areaPatterns = [
            { regex: /\b(?:improve|develop|work on|enhance|focus on|help with)\s+(?:my|the)?\s*(.+?)(?:\?|$|and|so|because|but)/i, group: 1 },
            { regex: /\b(?:struggling with|having trouble with|having difficulty with)\s+(?:my|the)?\s*(.+?)(?:\?|$|and|so|because|but)/i, group: 1 },
            { regex: /\b(?:goal for|goals for|want to improve)\s+(?:my|the)?\s*(.+?)(?:\?|$|and|so|because|but)/i, group: 1 }
        ];
        
        for (const pattern of areaPatterns) {
            const match = input.match(pattern.regex);
            if (match && match[pattern.group]) {
                const potentialArea = match[pattern.group].trim().toLowerCase();
                
                // Check if it's similar to one of our life areas
                for (const area in this.lifeAreas) {
                    const areaName = this.lifeAreas[area].name.toLowerCase();
                    if (potentialArea.includes(area.replace('_', ' ')) || 
                        potentialArea.includes(areaName) ||
                        area.replace('_', ' ').includes(potentialArea) ||
                        areaName.includes(potentialArea)) {
                        return area;
                    }
                }
                
                // Check if it matches common keywords for each area
                const areaKeywords = {
                    "career": ["job", "work", "profession", "business", "employment", "career", "promotion", "professional"],
                    "health": ["health", "fitness", "workout", "exercise", "diet", "nutrition", "sleep", "mental health", "weight"],
                    "relationships": ["relationship", "marriage", "partner", "family", "friend", "social", "dating", "communication"],
                    "personal_growth": ["learning", "growth", "development", "skill", "knowledge", "education", "course", "self-improvement"],
                    "productivity": ["productivity", "efficient", "organize", "time management", "focus", "distraction", "procrastination"],
                    "finances": ["money", "finance", "budget", "saving", "investing", "debt", "expense", "income"],
                    "creativity": ["creative", "art", "music", "writing", "design", "craft", "project", "hobby"]
                };
                
                for (const [area, keywords] of Object.entries(areaKeywords)) {
                    for (const keyword of keywords) {
                        if (potentialArea.includes(keyword)) {
                            return area;
                        }
                    }
                }
            }
        }
        
        return null;
    }
    
    /**
     * Generate a coaching response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of coaching request
     * @param {string} focusArea - Focus area if available
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateCoachingResponse(userInput, requestType, focusArea, context = {}) {
        // In a real implementation, this would call an AI model API specialized in coaching
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "goal_setting":
                responseText = this.facilitateGoalSetting(userInput, focusArea);
                break;
                
            case "habit_formation":
                responseText = this.supportHabitFormation(userInput, focusArea);
                break;
                
            case "obstacle_navigation":
                responseText = this.helpNavigateObstacles(userInput, focusArea);
                break;
                
            case "motivation":
                responseText = this.provideMotivation(userInput, focusArea);
                break;
                
            case "time_management":
                responseText = this.improveTimeManagement(userInput, focusArea);
                break;
                
            case "work_life_balance":
                responseText = this.enhanceWorkLifeBalance(userInput, focusArea);
                break;
                
            case "values_clarification":
                responseText = this.clarifyValues(userInput, focusArea);
                break;
                
            case "accountability":
                responseText = this.provideAccountability(userInput, focusArea);
                break;
                
            default:
                if (requestType.includes("_development") && focusArea) {
                    responseText = this.supportAreaDevelopment(userInput, focusArea);
                } else {
                    responseText = this.provideGeneralCoaching(userInput, focusArea);
                }
        }
        
        // Add disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate coaching suggestions
        const coachingSuggestions = this.getCoachingSuggestions(requestType, focusArea);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            focusArea: focusArea,
            stage: this.state.stage,
            suggestions: coachingSuggestions
        };
    }
    
    /**
     * Facilitate goal setting based on user input
     * @param {string} userInput - User's input
     * @param {string} focusArea - Focus area if available
     * @returns {string} Goal setting guidance
     */
    facilitateGoalSetting(userInput, focusArea) {
        // Determine which goal-setting framework to use
        const useSmartFramework = !userInput.toLowerCase().includes("grow") || userInput.toLowerCase().includes("smart");
        const framework = useSmartFramework ? "smart" : "grow";
        const frameworkInfo = this.coachingFrameworks[framework];
        
        // Prepare focus area information
        const areaInfo = focusArea && this.lifeAreas[focusArea] ? 
            this.lifeAreas[focusArea] : null;
        
        return `# Goal Setting: ${framework.toUpperCase()} Framework${areaInfo ? ` for ${areaInfo.name}` : ""}

In a complete implementation with an AI model and coaching expertise, I would guide you through a personalized goal-setting process using the ${frameworkInfo.name} framework${areaInfo ? ` focused on ${areaInfo.name}` : ""}.

## The ${frameworkInfo.name}

${frameworkInfo.description}

## Key Elements

${Object.values(frameworkInfo.elements).map(element => 
    `### ${element.name}
${element.description}

**Reflective Questions**:
${element.questions.map(q => `- ${q}`).join('\n')}`
).join('\n\n')}

## Getting Started

To begin developing your goal${areaInfo ? ` for ${areaInfo.name}` : ""}, consider these steps:

1. **Clarify what you truly want**: ${areaInfo ? `What specific aspect of ${areaInfo.name} do you want to improve?` : "What area of your life are you most motivated to improve right now?"}

2. **Consider your why**: What would achieving this goal make possible for you? How does it align with your values?

3. **Be specific**: Instead of "get in shape," define what that looks like: "exercise 30 minutes, 3 times per week."

4. **Set milestones**: What are the smaller achievements along the way to your larger goal?

5. **Anticipate obstacles**: What might get in your way, and how will you address these challenges?

${areaInfo ? `## Common Goals in ${areaInfo.name}

People often focus on these goals in this area:
${areaInfo.common_goals.map(goal => `- ${goal}`).join('\n')}

These can serve as inspiration, but your goal should be personally meaningful to you.` : ""}

## Next Steps

Would you like to:
- Share your initial goal idea for refinement?
- Explore a specific element of the ${frameworkInfo.name} in more detail?
- Discuss potential obstacles to your goal?
- Create an action plan for your goal?
- Consider a different goal-setting framework?

Remember that effective goals are both inspiring and achievable. I'm here to help you find that balance.`;
    }
    
    /**
     * Support habit formation based on user input
     * @param {string} userInput - User's input
     * @param {string} focusArea - Focus area if available
     * @returns {string} Habit formation guidance
     */
    supportHabitFormation(userInput, focusArea) {
        // Determine which habit strategy to highlight
        let strategyKey = "tiny_habits";
        const strategies = Object.keys(this.habitStrategies);
        
        for (const key of strategies) {
            if (userInput.toLowerCase().includes(key.replace('_', ' ')) || 
                userInput.toLowerCase().includes(this.habitStrategies[key].name.toLowerCase())) {
                strategyKey = key;
                break;
            }
        }
        
        const strategyInfo = this.habitStrategies[strategyKey];
        
        // Prepare focus area information
        const areaInfo = focusArea && this.lifeAreas[focusArea] ? 
            this.lifeAreas[focusArea] : null;
        
        return `# Habit Formation: ${strategyInfo.name}${areaInfo ? ` for ${areaInfo.name}` : ""}

In a complete implementation with an AI model and behavioral science expertise, I would provide personalized habit formation guidance using the ${strategyInfo.name} approach${areaInfo ? ` focused on ${areaInfo.name}` : ""}.

## Understanding Habit Formation

Habits form through a four-stage process:
1. **Cue**: The trigger that initiates the behavior
2. **Craving**: The motivation or desire for change
3. **Response**: The actual habit or behavior itself
4. **Reward**: The benefit gained from the behavior

Effective habit strategies work by making cues obvious, cravings attractive, responses easy, and rewards satisfying.

## The ${strategyInfo.name}

${strategyInfo.description}

### Key Principles
${strategyInfo.key_principles.map(principle => `- ${principle}`).join('\n')}

## Practical Application

To apply this approach${areaInfo ? ` to ${areaInfo.name}` : ""}:

1. **Choose your habit**: Select a specific behavior that will support your goals${areaInfo ? ` in ${areaInfo.name}` : ""}

2. **Make it specific**: Define exactly what you'll do, when, where, and for how long

3. **Start tiny**: Begin with a version so small it feels almost too easy

4. **Connect to existing routines**: Anchor your new habit to something you already do consistently

5. **Celebrate immediately**: Create positive emotions after completing your habit to reinforce the behavior

## Common Habit Challenges

- **Inconsistency**: Overcome by focusing on consistency over intensity initially
- **Forgetting**: Solve with environmental cues and reminders
- **Motivation fluctuations**: Address by reducing friction and relying on systems, not willpower
- **Giving up after missing days**: Counter with the "never miss twice" rule
- **Environment mismatch**: Fix by redesigning your environment to support your habit

${areaInfo ? `## Habit Ideas for ${areaInfo.name}

Consider these specific habits:
${this.generateHabitIdeasForArea(focusArea)}

These are just starting points. The best habit is one that aligns with your goals and is appropriate for your current lifestyle and abilities.` : ""}

## Next Steps

Would you like to:
- Identify a specific habit to develop${areaInfo ? ` in ${areaInfo.name}` : ""}?
- Design your habit implementation using the ${strategyInfo.name}?
- Explore a different habit formation strategy?
- Discuss how to overcome a specific habit challenge?
- Create a habit tracking system?

Remember that small, consistent actions lead to significant changes over time.`;
    }
    
    /**
     * Generate habit ideas for a specific life area
     * @param {string} area - Life area
     * @returns {string} Habit ideas
     */
    generateHabitIdeasForArea(area) {
        const habitIdeas = {
            "career": "- Review career goals for 5 minutes each morning\n- Read one industry article daily\n- Connect with one professional contact weekly\n- Practice a job-related skill for 10 minutes daily\n- End each workday by planning tomorrow's priorities",
            "health": "- Drink water before each meal\n- Do a 1-minute stretching routine after brushing teeth\n- Take a 5-minute walk after lunch\n- Prepare one vegetable with dinner\n- Practice deep breathing for 2 minutes before bed",
            "relationships": "- Send an appreciation message to someone each day\n- Ask one meaningful question during conversations\n- Schedule regular check-ins with important people\n- Practice active listening during the first conversation of the day\n- Create a no-phone zone or time for quality interaction",
            "personal_growth": "- Read one page of a growth-oriented book daily\n- Practice 5 minutes of mindfulness each morning\n- Write down one thing you learned each day\n- Try one new small thing weekly\n- Reflect on your values for 3 minutes each evening",
            "productivity": "- Write down your top 3 priorities each morning\n- Clear your workspace before starting work\n- Use a timer for focused work sessions\n- Process email at designated times only\n- End each day by planning tomorrow",
            "finances": "- Check your account balance at the same time each day\n- Save a small, specific amount daily\n- Track every expense for the first 5 minutes after spending\n- Review budget progress weekly at a set time\n- Ask 'Is this aligned with my priorities?' before purchases",
            "creativity": "- Write/draw/create for 5 minutes upon waking\n- Collect one creative inspiration daily\n- Practice your creative skill for 10 minutes after dinner\n- Try one new creative technique weekly\n- Share your creative work with someone regularly"
        };
        
        return habitIdeas[area] || "- Start with a tiny, specific action related to your goal\n- Make it something you can do in less than 2 minutes\n- Connect it to an existing daily routine\n- Focus on consistency rather than perfection\n- Track your progress visually";
    }
    
    /**
     * Help navigate obstacles based on user input
     * @param {string} userInput - User's input
     * @param {string} focusArea - Focus area if available
     * @returns {string} Obstacle navigation guidance
     */
    helpNavigateObstacles(userInput, focusArea) {
        // Determine which obstacle to address
        let obstacleKey = "procrastination";
        for (const key in this.commonObstacles) {
            if (userInput.toLowerCase().includes(key) || 
                userInput.toLowerCase().includes(this.commonObstacles[key].name.toLowerCase())) {
                obstacleKey = key;
                break;
            }
        }
        
        const obstacleInfo = this.commonObstacles[obstacleKey];
        
        // Prepare focus area information
        const areaInfo = focusArea && this.lifeAreas[focusArea] ? 
            this.lifeAreas[focusArea] : null;
        
        return `# Overcoming ${obstacleInfo.name}${areaInfo ? ` in ${areaInfo.name}` : ""}

In a complete implementation with an AI model and coaching expertise, I would provide personalized strategies for overcoming ${obstacleInfo.name.toLowerCase()}${areaInfo ? ` in your ${areaInfo.name.toLowerCase()}` : ""}, based on your specific situation and preferences.

## Understanding ${obstacleInfo.name}

${obstacleInfo.description}

This challenge often appears when:
- [Would explain common triggers and situations]
- [Would describe underlying psychological factors]
- [Would note how this specifically affects ${areaInfo ? areaInfo.name.toLowerCase() : "goal achievement"}]

## Effective Strategies

${obstacleInfo.strategies.map((strategy, index) => `### Strategy ${index + 1}: ${strategy}

[Would provide detailed explanation and implementation guidance]`).join('\n\n')}

## Personalized Approach

To address ${obstacleInfo.name.toLowerCase()} effectively, consider:

1. **Root causes**: What specifically triggers this obstacle for you${areaInfo ? ` in ${areaInfo.name.toLowerCase()}` : ""}?

2. **Pattern recognition**: When and where does this challenge typically occur?

3. **Previous successes**: When have you successfully overcome similar obstacles, even briefly?

4. **Environmental factors**: How does your environment contribute to or help overcome this challenge?

5. **Support system**: Who or what could provide accountability and encouragement?

## Implementation Plan

An effective approach to overcoming ${obstacleInfo.name.toLowerCase()} includes:

1. **Start small**: Choose one strategy that resonates most with you
2. **Be specific**: Define exactly how and when you'll implement it
3. **Track progress**: Note improvements and continuing challenges
4. **Adjust as needed**: Refine your approach based on what works
5. **Celebrate wins**: Acknowledge progress to reinforce positive change

## Mindset Shift

${this.getObstacleMindsetShift(obstacleKey)}

## Next Steps

Would you like to:
- Discuss which specific strategy would work best for your situation?
- Create a detailed implementation plan for overcoming this obstacle?
- Explore the underlying causes of this challenge?
- Develop accountability structures to support your progress?
- Address a different obstacle you're facing?

Remember that obstacles are a normal part of any growth process. The goal isn't perfection but consistent progress.`;
    }
    
    /**
     * Get mindset shift suggestion for an obstacle
     * @param {string} obstacleKey - Obstacle key
     * @returns {string} Mindset shift guidance
     */
    getObstacleMindsetShift(obstacleKey) {
        const mindsetShifts = {
            "procrastination": "Rather than viewing tasks as burdens to avoid, try reframing them as opportunities for growth and achievement. Instead of 'I have to do this,' consider 'I get to do this.' Focus on the process and small steps rather than the entire project at once.",
            "overwhelm": "Instead of seeing everything as equally urgent and important, adopt a mindset of strategic prioritization. Accept that not everything can be done at once, and that choosing what not to do is as important as choosing what to do.",
            "perfectionism": "Shift from seeing mistakes as failures to viewing them as valuable feedback and learning opportunities. Replace 'It must be perfect' with 'It must be progress.' Focus on growth rather than flawlessness.",
            "lack_of_clarity": "Rather than feeling stuck because the entire path isn't visible, embrace a mindset of experimental learning. Each step provides more information for the next step, even if you can't see the full journey from the start.",
            "fear_of_failure": "Instead of seeing failure as proof of inadequacy, view it as evidence of courage and necessary feedback for improvement. The question becomes not 'Will I fail?' but 'What will I learn?'",
            "lack_of_accountability": "Shift from relying solely on motivation to creating systems of accountability. Move from 'I'll do it when I feel like it' to 'I'll do it because I've committed to it and have structures in place.'",
            "limiting_beliefs": "Rather than accepting negative beliefs as facts, adopt a mindset of curious questioning. Ask 'Is this actually true?' and 'What evidence contradicts this belief?' Look for examples that challenge your assumptions."
        };
        
        return mindsetShifts[obstacleKey] || "Consider how your current perspective might be contributing to the challenge. What alternative viewpoints might be more empowering? Often, a shift in how you perceive the situation can open up new possibilities for action.";
    }
    
    /**
     * Provide motivation based on user input
     * @param {string} userInput - User's input
     * @param {string} focusArea - Focus area if available
     * @returns {string} Motivational guidance
     */
    provideMotivation(userInput, focusArea) {
        // Determine which motivational approach to use
        let approachKey = "intrinsic";
        for (const key in this.motivationalApproaches) {
            if (userInput.toLowerCase().includes(key) || 
                userInput.toLowerCase().includes(this.motivationalApproaches[key].name.toLowerCase())) {
                approachKey = key;
                break;
            }
        }
        
        const approachInfo = this.motivationalApproaches[approachKey];
        
        // Prepare focus area information
        const areaInfo = focusArea && this.lifeAreas[focusArea] ? 
            this.lifeAreas[focusArea] : null;
        
        return `# Finding Motivation: ${approachInfo.name}${areaInfo ? ` for ${areaInfo.name}` : ""}

In a complete implementation with an AI model and motivational psychology expertise, I would provide personalized motivation strategies using the ${approachInfo.name} approach${areaInfo ? ` focused on ${areaInfo.name}` : ""}.

## Understanding Motivation

Motivation is influenced by multiple factors:
- **Value**: How important the goal is to you
- **Expectancy**: Your belief that you can succeed
- **Impulsivity**: The pull of immediate rewards versus long-term benefits
- **Delay**: The time between effort and reward

The ${approachInfo.name} focuses primarily on ${this.getMotivationApproachFocus(approachKey)}.

## ${approachInfo.name}

${approachInfo.description}

### Key Strategies
${approachInfo.strategies.map(strategy => `- ${strategy}`).join('\n')}

## Applying This Approach

To boost your motivation${areaInfo ? ` for ${areaInfo.name}` : ""}:

1. **Connect with your why**: ${this.getMotivationWhyPrompt(approachKey, areaInfo)}

2. **Design your environment**: ${this.getMotivationEnvironmentPrompt(approachKey)}

3. **Build momentum**: Start with small wins that create a success spiral

4. **Manage energy**: Recognize that motivation fluctuates and plan accordingly

5. **Leverage social factors**: ${this.getMotivationSocialPrompt(approachKey)}

## Overcoming Motivation Dips

Even with the best strategies, motivation naturally fluctuates. When it dips:

- Return to your fundamental "why"
- Simplify your next action to make it more accessible
- Use the "five-minute rule" - commit to just five minutes
- Refresh your environment or approach
- Reconnect with sources of inspiration and support

${areaInfo ? `## Motivation Specifically for ${areaInfo.name}

${this.getAreaSpecificMotivation(focusArea, approachKey)}` : ""}

## Next Steps

Would you like to:
- Create a personalized motivation plan using these strategies?
- Explore a different motivational approach?
- Discuss specific motivation challenges you're facing?
- Develop a system to maintain motivation over time?
- Find ways to combine multiple motivational approaches?

Remember that motivation often follows action rather than preceding it. Taking even small steps can generate the motivation to continue.`;
    }
    
    /**
     * Get motivation approach focus
     * @param {string} approachKey - Motivational approach key
     * @returns {string} Approach focus
     */
    getMotivationApproachFocus(approachKey) {
        const focusDescriptions = {
            "intrinsic": "developing internal drivers like enjoyment, curiosity, and personal meaning",
            "extrinsic": "leveraging external drivers like rewards, accountability, and measurable outcomes",
            "purpose_driven": "connecting actions to meaningful impact and contribution beyond yourself",
            "identity_based": "aligning behaviors with who you want to be and how you see yourself"
        };
        
        return focusDescriptions[approachKey] || "developing a balanced approach to motivation that works for your unique situation";
    }
    
    /**
     * Get motivation why prompt
     * @param {string} approachKey - Motivational approach key
     * @param {Object} areaInfo - Focus area information
     * @returns {string} Why prompt
     */
    getMotivationWhyPrompt(approachKey, areaInfo) {
        const whyPrompts = {
            "intrinsic": `Identify what aspects of ${areaInfo ? areaInfo.name.toLowerCase() : "your goal"} naturally interest or energize you`,
            "extrinsic": `Define clear, meaningful rewards for progress in ${areaInfo ? areaInfo.name.toLowerCase() : "your goal"}`,
            "purpose_driven": `Clarify how progress in ${areaInfo ? areaInfo.name.toLowerCase() : "your goal"} serves something larger than yourself`,
            "identity_based": `Define who you want to become through your actions in ${areaInfo ? areaInfo.name.toLowerCase() : "your goal area"}`
        };
        
        return whyPrompts[approachKey] || `Clearly articulate why ${areaInfo ? areaInfo.name.toLowerCase() : "your goal"} matters to you personally`;
    }
    
    /**
     * Get motivation environment prompt
     * @param {string} approachKey - Motivational approach key
     * @returns {string} Environment prompt
     */
    getMotivationEnvironmentPrompt(approachKey) {
        const environmentPrompts = {
            "intrinsic": "Create spaces that naturally engage your curiosity and interest",
            "extrinsic": "Set up visible tracking systems and reward structures in your environment",
            "purpose_driven": "Incorporate reminders of impact and meaning into your surroundings",
            "identity_based": "Design your environment to reflect and reinforce your desired identity"
        };
        
        return environmentPrompts[approachKey] || "Structure your environment to make positive actions easier and negative distractions harder";
    }
    
    /**
     * Get motivation social prompt
     * @param {string} approachKey - Motivational approach key
     * @returns {string} Social prompt
     */
    getMotivationSocialPrompt(approachKey) {
        const socialPrompts = {
            "intrinsic": "Connect with others who share your interests and natural enthusiasm",
            "extrinsic": "Establish accountability partnerships and public commitments",
            "purpose_driven": "Engage with communities that share your values and mission",
            "identity_based": "Spend time with people who embody the identity you're developing"
        };
        
        return socialPrompts[approachKey] || "Enlist appropriate social support and accountability";
    }
    
    /**
     * Get area-specific motivation
     * @param {string} area - Life area
     * @param {string} approachKey - Motivational approach key
     * @returns {string} Area-specific motivation
     */
    getAreaSpecificMotivation(area, approachKey) {
        // This would contain tailored motivation strategies for each life area and approach combination
        // Simplified implementation for demonstration
        const areaMotivation = {
            "career": "For career motivation, connect your daily tasks to your larger professional vision. Consider how each project or task contributes to your growth, expertise, or long-term goals. Tracking visible progress in skills development can provide tangible evidence of growth.",
            "health": "Health behaviors often suffer from delayed rewards. Create immediate positive associations with healthy choices through environment design, habit stacking with activities you enjoy, and celebrating small wins consistently. Focus on how you feel after healthy actions rather than just long-term outcomes.",
            "relationships": "Motivation in relationships comes from remembering their fundamental importance to wellbeing. Schedule quality time as non-negotiable, express appreciation regularly, and notice how good relationships improve all other life areas. Be intentional about nurturing important connections.",
            "personal_growth": "Personal growth motivation thrives on novelty and challenge. Ensure your growth activities hit the sweet spot between too easy (boring) and too difficult (discouraging). Track insights and breakthroughs in a journal, and regularly review how far you've come.",
            "productivity": "Productivity motivation increases when you connect tasks to meaningful outcomes rather than just checking boxes. Break projects into satisfying milestone achievements, and design reward systems that acknowledge both effort and results.",
            "finances": "Financial motivation strengthens when you visualize specific outcomes of financial discipline rather than abstract numbers. Create clear connections between current actions and future possibilities, and celebrate progress toward financial goals.",
            "creativity": "Creative motivation flourishes with the right balance of structure and freedom. Establish regular creative sessions while allowing flexibility in what you create. Focus on the process and self-expression rather than only the final product."
        };
        
        return areaMotivation[area] || "Focus on connecting your actions to your deeper values and desired outcomes. Experiment with different motivation strategies to discover what works best for your unique situation and preferences.";
    }
    
    /**
     * Improve time management based on user input
     * @param {string} userInput - User's input
     * @param {string} focusArea - Focus area if available
     * @returns {string} Time management guidance
     */
    improveTimeManagement(userInput, focusArea) {
        // Prepare focus area information
        const areaInfo = focusArea && this.lifeAreas[focusArea] ? 
            this.lifeAreas[focusArea] : null;
        
        return `# Effective Time Management${areaInfo ? ` for ${areaInfo.name}` : ""}

In a complete implementation with an AI model and productivity expertise, I would provide personalized time management strategies based on your specific challenges, working style, and goals${areaInfo ? ` in ${areaInfo.name}` : ""}.

## Core Principles of Effective Time Management

1. **Clarity**: Knowing exactly what deserves your time and attention
2. **Prioritization**: Distinguishing between urgent and important
3. **Focus**: Managing attention as much as managing time
4. **Energy**: Aligning tasks with your natural energy cycles
5. **Boundaries**: Protecting your time from unnecessary demands

## Key Strategies

### 1. Strategic Planning

- **Weekly planning ritual**: Schedule 30 minutes every week to plan the week ahead
- **Daily prioritization**: Identify 1-3 "most important tasks" each day
- **Time blocking**: Allocate specific time periods for different types of work
- **Buffer time**: Build in transition time between activities
- **Reflection**: Regularly review what's working and what needs adjustment

### 2. Execution Techniques

- **Time boxing**: Allocate fixed time periods for specific tasks
- **Pomodoro Technique**: Work in focused sprints (e.g., 25 minutes) with short breaks
- **Task batching**: Group similar activities to reduce context switching
- **Strategic procrastination**: Intentionally defer low-priority items
- **2-minute rule**: Immediately complete tasks that take less than 2 minutes

### 3. Focus Management

- **Distraction elimination**: Create an environment that supports concentration
- **Technology boundaries**: Manage notifications and digital interruptions
- **"Deep work" periods**: Schedule uninterrupted time for complex tasks
- **Energy alignment**: Match task types to your energy levels
- **Attention reset practices**: Brief mindfulness or movement between tasks

### 4. Overcoming Common Challenges

- **Overcommitment**: Learning to say no and set realistic expectations
- **Perfectionism**: Identifying where "good enough" is appropriate
- **Procrastination**: Breaking tasks down and starting with tiny steps
- **Interruptions**: Creating systems to manage and reduce disruptions
- **Decision fatigue**: Simplifying routine choices to preserve mental energy

${areaInfo ? `## Time Management Specifically for ${areaInfo.name}

${this.getAreaSpecificTimeManagement(focusArea)}` : ""}

## Creating Your Personal System

The most effective time management system is one that:
- Aligns with your natural tendencies and preferences
- Addresses your specific challenges and goals
- Evolves as your circumstances change
- Balances structure with flexibility
- Feels supportive rather than restrictive

## Next Steps

Would you like to:
- Identify your biggest time management challenge?
- Create a personalized daily/weekly planning system?
- Develop strategies for a specific time management issue?
- Design an environment that supports better focus?
- Build accountability structures for your time commitments?

Remember that the goal of time management isn't to squeeze more tasks into each day, but to ensure your time is spent on what truly matters to you.`;
    }
    
    /**
     * Get area-specific time management
     * @param {string} area - Life area
     * @returns {string} Area-specific time management
     */
    getAreaSpecificTimeManagement(area) {
        // This would contain tailored time management strategies for each life area
        // Simplified implementation for demonstration
        const areaTimeManagement = {
            "career": "For career time management, distinguish between urgent tasks and important growth activities. Allocate specific time for strategic work that advances your long-term goals, not just responsive work. Create boundaries between work time and personal time to prevent burnout.",
            "health": "Health activities often get sacrificed when time is limited. Schedule exercise and meal preparation as non-negotiable appointments. Look for ways to integrate movement into your existing routine, and prepare healthy foods in batches to save time.",
            "relationships": "Quality connection often matters more than quantity of time. Schedule regular, focused time with important people free from distractions. Be fully present rather than physically present but mentally absent. Create rituals for consistent connection.",
            "personal_growth": "Personal growth requires protected time. Start with small, consistent periods rather than waiting for large time blocks. Integrate learning into daily activities through audiobooks or podcasts during commutes or exercise. Track your time investments to ensure alignment with your development goals.",
            "productivity": "Meta-productivity involves regularly evaluating your systems. Conduct weekly reviews to assess what's working and what needs adjustment. Experiment with different techniques to find what works best for your style and current circumstances.",
            "finances": "Financial management benefits from scheduled attention. Set regular times for financial review and planning to prevent avoidance. Automate routine financial tasks to reduce time demands while maintaining consistency.",
            "creativity": "Creative work often requires both structured time and spontaneous space. Schedule regular creative sessions while remaining open to inspiration. Capture ideas whenever they arise using a simple, accessible system."
        };
        
        return areaTimeManagement[area] || "Examine how you currently spend time in this area compared to how you would ideally allocate your time. Identify your highest-value activities and ensure they receive adequate time and attention. Consider what you might need to reduce or eliminate to create space for what matters most.";
    }
    
    /**
     * Enhance work-life balance based on user input
     * @param {string} userInput - User's input
     * @param {string} focusArea - Focus area if available
     * @returns {string} Work-life balance guidance
     */
    enhanceWorkLifeBalance(userInput, focusArea) {
        return `# Creating Work-Life Balance

In a complete implementation with an AI model and wellbeing expertise, I would provide personalized strategies for enhancing your work-life balance based on your specific situation, values, and goals.

## Understanding Work-Life Balance

True work-life balance isn't about equal time allocation, but rather:
- **Alignment** with your personal values and priorities
- **Boundaries** that protect important life domains
- **Presence** and engagement in each area of life
- **Flexibility** to adjust as needs and circumstances change
- **Sustainability** over the long term

## Key Strategies for Better Balance

### 1. Clarify Your Priorities

- **Values reflection**: Identify what matters most to you across life domains
- **Success definitions**: Create personal metrics for both work and life success
- **Regular review**: Schedule time to assess alignment between actions and values
- **Decision framework**: Develop criteria for saying yes or no to commitments
- **"Non-negotiables"**: Determine what elements are essential in each life area

### 2. Create Effective Boundaries

- **Time boundaries**: Set clear start and end times for work
- **Space boundaries**: Designate specific locations for different activities
- **Technology boundaries**: Manage devices and notifications intentionally
- **Expectation management**: Communicate boundaries clearly to others
- **Transition rituals**: Create practices that help you shift between domains

### 3. Improve Quality of Engagement

- **Single-tasking**: Give full attention to one domain at a time
- **Presence practices**: Develop mindfulness in daily activities
- **Energy management**: Align activities with your natural energy cycles
- **Intention setting**: Begin each activity with clear purpose
- **Completion practices**: Properly end work before transitioning

### 4. Build Sustainable Systems

- **Automate/delegate**: Reduce unnecessary demands on your attention
- **Simplification**: Eliminate non-essential activities
- **Support network**: Develop relationships that reinforce healthy balance
- **Recovery practices**: Incorporate regular renewal activities
- **Feedback loops**: Create ways to notice when balance is slipping

## Common Challenges and Solutions

- **Digital overload**: Implement technology boundaries and digital wellbeing practices
- **Workplace expectations**: Negotiate arrangements that support wellbeing
- **Guilt and perfectionism**: Develop self-compassion and realistic standards
- **Life transitions**: Create flexible systems that adapt to changing circumstances
- **Cultural pressures**: Define success on your own terms

## Creating Your Personal Balance

A sustainable approach to work-life balance:
- Reflects your unique values and priorities
- Accommodates different life seasons and circumstances
- Focuses on quality of experience, not just time allocation
- Includes regular assessment and adjustment
- Prioritizes long-term wellbeing over short-term productivity

## Next Steps

Would you like to:
- Assess your current work-life balance situation?
- Create specific boundaries for better separation between domains?
- Develop strategies for a particular work-life challenge?
- Design daily practices that support more presence and engagement?
- Build a sustainable system that works with your specific circumstances?

Remember that work-life balance is not a fixed destination but an ongoing process of alignment with what matters most to you.`;
    }
    
    /**
     * Clarify values based on user input
     * @param {string} userInput - User's input
     * @param {string} focusArea - Focus area if available
     * @returns {string} Values clarification guidance
     */
    clarifyValues(userInput, focusArea) {
        // Prepare focus area information
        const areaInfo = focusArea && this.lifeAreas[focusArea] ? 
            this.lifeAreas[focusArea] : null;
        
        return `# Values Clarification${areaInfo ? ` for ${areaInfo.name}` : ""}

In a complete implementation with an AI model and coaching expertise, I would guide you through a personalized process to clarify your core values${areaInfo ? ` particularly as they relate to ${areaInfo.name}` : ""}.

## Why Values Matter

Your values serve as:
- Internal compass for decision-making
- Source of intrinsic motivation
- Foundation for meaningful goals
- Filter for opportunities and commitments
- Basis for authentic relationships and work

When your actions align with your values, you experience greater fulfillment, purpose, and resilience.

## Exploring Your Values

### Reflection Questions

Consider these questions to begin uncovering your core values:

1. **Peak Experiences**: What moments in your life have felt most meaningful and fulfilling? What values were you honoring in those moments?

2. **Admiration**: Who do you deeply admire and why? What qualities or values do they embody that resonate with you?

3. **Anger/Frustration**: What situations make you feel angry or frustrated? Often these point to values being violated.

4. **Legacy**: At the end of your life, how would you want to be remembered? What core principles do you want to have lived by?

5. **Non-negotiables**: What principles would you stand by even if they were unpopular or difficult?

### Values Identification Exercise

From the list below, select 10-15 values that resonate strongly with you:

Accomplishment, Accountability, Adventure, Authenticity, Balance, Beauty, Belonging, Collaboration, Compassion, Connection, Contribution, Courage, Creativity, Curiosity, Determination, Diversity, Excellence, Faith, Family, Freedom, Friendship, Fun, Generosity, Growth, Happiness, Harmony, Health, Honesty, Honor, Humor, Independence, Innovation, Integrity, Justice, Kindness, Knowledge, Leadership, Learning, Love, Loyalty, Openness, Optimism, Peace, Perseverance, Power, Recognition, Respect, Responsibility, Security, Self-expression, Simplicity, Spirituality, Stability, Success, Sustainability, Tradition, Truth, Uniqueness, Wealth, Wisdom

Next, narrow to 5-7 that feel most central to who you are, then finally to your top 3-5 core values.

## Living Your Values

Once you've identified your core values, the next step is intentionally aligning your life with them:

1. **Define what each value means to you** specifically and concretely

2. **Assess current alignment** between your values and your daily choices

3. **Identify gaps** where your actions don't reflect your stated values

4. **Create intentional practices** that strengthen value expression

5. **Use values as decision criteria** when facing choices or opportunities

${areaInfo ? `## Values in ${areaInfo.name}

Consider how your core values specifically apply to ${areaInfo.name.toLowerCase()}:

- How might each of your top values be expressed in this area?
- What would "success" in ${areaInfo.name.toLowerCase()} look like if fully aligned with your values?
- What current aspects of your ${areaInfo.name.toLowerCase()} honor or conflict with your values?
- What changes would create greater alignment between your values and this life area?` : ""}

## Next Steps

Would you like to:
- Work through the values clarification exercise together?
- Explore how your values apply to specific life decisions?
- Discuss potential values conflicts or priorities?
- Create practices that help you live your values more fully?
- Develop goals that are in alignment with your core values?

Remember that values clarification is not about finding the "right" values, but about discovering what's authentically most important to you.`;
    }
    
    /**
     * Provide accountability based on user input
     * @param {string} userInput - User's input
     * @param {string} focusArea - Focus area if available
     * @returns {string} Accountability guidance
     */
    provideAccountability(userInput, focusArea) {
        // Prepare focus area information
        const areaInfo = focusArea && this.lifeAreas[focusArea] ? 
            this.lifeAreas[focusArea] : null;
        
        return `# Creating Accountability${areaInfo ? ` for ${areaInfo.name}` : ""}

In a complete implementation with an AI model and coaching expertise, I would help you develop personalized accountability structures to support your goals${areaInfo ? ` in ${areaInfo.name}` : ""}.

## Understanding Accountability

Effective accountability:
- Increases follow-through on commitments
- Provides feedback on progress
- Creates consequences (positive or negative) for actions
- Reduces decision fatigue through pre-commitment
- Strengthens intrinsic motivation over time

## Types of Accountability

### 1. Self-Accountability

- **Tracking systems**: Methods to monitor your own behavior and progress
- **Implementation intentions**: Specific plans for when, where, and how you'll act
- **Reflection practices**: Regular review of commitments and actions
- **Personal contracts**: Formal agreements with yourself
- **Identity statements**: Connecting actions to who you want to be

### 2. Social Accountability

- **Accountability partners**: Individuals with whom you share commitments
- **Mastermind groups**: Peer groups focused on mutual success
- **Public commitments**: Sharing goals with a wider audience
- **Coaching relationships**: Professional guidance and check-ins
- **Team structures**: Groups working toward shared objectives

### 3. Structural Accountability

- **Environmental design**: Physical setups that support desired behaviors
- **Financial stakes**: Money-based incentives or consequences
- **Technology tools**: Apps and services that monitor and reinforce
- **Scheduling systems**: Calendar and time-based commitments
- **Elimination of options**: Removing alternatives to increase follow-through

## Creating Your Accountability System

An effective personal accountability system:

1. **Matches your personality**: Some respond better to support, others to challenge

2. **Considers your goal type**: Different goals require different accountability structures

3. **Includes appropriate consequences**: Meaningful enough to influence behavior

4. **Maintains autonomy**: Supports intrinsic motivation rather than controlling

5. **Evolves over time**: Adapts as your needs and circumstances change

## Accountability Tools and Practices

- **Commitment devices**: Pre-commitments that restrict future choices
- **Progress tracking**: Visual systems for monitoring advancement
- **Check-in schedules**: Regular times to review and report on actions
- **Success partners**: Relationships focused on mutual achievement
- **Meaningful stakes**: Consequences that matter personally to you

${areaInfo ? `## Accountability Specifically for ${areaInfo.name}

${this.getAreaSpecificAccountability(focusArea)}` : ""}

## Next Steps

Would you like to:
- Identify which type of accountability would work best for you?
- Create a specific accountability structure for a current goal?
- Discuss strategies for maintaining long-term accountability?
- Design environmental changes that support your commitments?
- Explore how to recover when accountability breaks down?

Remember that the best accountability system feels supportive rather than punitive, and helps you become the person you want to be.`;
    }
    
    /**
     * Get area-specific accountability
     * @param {string} area - Life area
     * @returns {string} Area-specific accountability
     */
    getAreaSpecificAccountability(area) {
        // This would contain tailored accountability strategies for each life area
        // Simplified implementation for demonstration
        const areaAccountability = {
            "career": "For career goals, consider accountability through mentorship relationships, professional development groups, or structured performance reviews. Project management tools can provide visibility and trackability for professional commitments and milestones.",
            "health": "Health behaviors benefit from tracking tools, workout partners, and habit streaks. Consider fitness classes with registration requirements, pre-paid sessions with trainers, or health monitoring devices that provide objective feedback on your behaviors and outcomes.",
            "relationships": "Relationship commitments can benefit from scheduled check-ins, shared activities with advance booking, or mutual agreements about quality time. Consider relationship counseling or regular structured discussions about expectations and needs.",
            "personal_growth": "Learning and development goals work well with study groups, public skill demonstrations, or platforms where you share your progress. Consider courses with assignments and deadlines, or communities focused on similar growth objectives.",
            "productivity": "Productivity systems benefit from visible tracking, time-blocking with others, or tools that monitor focus time. Consider accountability software that limits distractions or work environments that naturally encourage concentration.",
            "finances": "Financial goals benefit from automated systems, regular review meetings with advisors, or budget apps that track spending. Consider automated savings that happen before you can access funds, or financial commitments with clear penalties for withdrawal.",
            "creativity": "Creative projects benefit from deadlines, sharing works-in-progress, or scheduled creation time with others. Consider submission requirements, public exhibition dates, or creative communities with regular sharing expectations."
        };
        
        return areaAccountability[area] || "Consider what specific behaviors will support your goals in this area, then design accountability structures that match your personality and preferences. Determine what level of visibility, feedback, and consequence will be most effective for your particular situation.";
    }
    
    /**
     * Support specific area development based on user input
     * @param {string} userInput - User's input
     * @param {string} focusArea - Focus area
     * @returns {string} Area development guidance
     */
    supportAreaDevelopment(userInput, focusArea) {
        // This function handles specific life area development requests
        // The focusArea parameter should be available since this function is called when requestType includes "_development"
        
        const areaInfo = this.lifeAreas[focusArea];
        
        if (!areaInfo) {
            return this.provideGeneralCoaching(userInput, focusArea);
        }
        
        return `# ${areaInfo.name} Development

In a complete implementation with an AI model and coaching expertise, I would provide personalized guidance for developing and enhancing your ${areaInfo.name.toLowerCase()}, based on your specific situation, values, and goals.

## ${areaInfo.name}: Overview

${areaInfo.description}

This area of life encompasses:
- [Would provide detailed description of components]
- [Would explain importance and impact]
- [Would describe how this area connects to overall wellbeing]

## Common Goals in ${areaInfo.name}

Many people focus on goals such as:

${areaInfo.common_goals.map(goal => `- **${goal}**\n  [Would provide explanation and approach]`).join('\n\n')}

## Assessment Questions

To better understand your current ${areaInfo.name.toLowerCase()} situation, consider:

1. **Current satisfaction**: How fulfilled are you with this area of your life right now?
2. **Strengths**: What's working well in your ${areaInfo.name.toLowerCase()}?
3. **Challenges**: What specific aspects would you like to improve?
4. **Ideal vision**: What would this area ideally look like for you?
5. **Impact**: How does this area affect other domains of your life?

## Development Strategies

### Foundation Building

- [Would provide foundational practices]
- [Would explain essential skills or knowledge]
- [Would describe necessary resources]

### Growth Approach

- [Would outline progressive development path]
- [Would suggest appropriate challenges]
- [Would provide measurement methods]

### Maintenance Practices

- [Would describe sustainability practices]
- [Would explain integration with other life areas]
- [Would provide adaptation strategies for different circumstances]

## Common Obstacles and Solutions

- **Obstacle 1**: [Would describe common challenge]
  **Solution**: [Would provide specific approach]

- **Obstacle 2**: [Would describe common challenge]
  **Solution**: [Would provide specific approach]

- **Obstacle 3**: [Would describe common challenge]
  **Solution**: [Would provide specific approach]

## Next Steps

Would you like to:
- Conduct a more detailed assessment of your current ${areaInfo.name.toLowerCase()}?
- Set specific goals for this area of your life?
- Develop strategies for a particular aspect of ${areaInfo.name.toLowerCase()}?
- Create an action plan for improvement?
- Address specific obstacles you're facing?

Remember that development in ${areaInfo.name.toLowerCase()} is a gradual process that benefits from consistent attention and intentional practice.`;
    }
    
    /**
     * Provide general coaching based on user input
     * @param {string} userInput - User's input
     * @param {string} focusArea - Focus area if available
     * @returns {string} General coaching guidance
     */
    provideGeneralCoaching(userInput, focusArea) {
        // Determine the appropriate coaching technique based on the conversation stage
        let techniqueKey = "powerful_questions";
        
        switch (this.state.stage) {
            case "exploration":
                techniqueKey = "powerful_questions";
                break;
            case "goal-setting":
                techniqueKey = "values_clarification";
                break;
            case "action-planning":
                techniqueKey = "strengths_focus";
                break;
            case "execution":
                techniqueKey = "accountability";
                break;
            case "reflection":
                techniqueKey = "reframing";
                break;
            default:
                techniqueKey = "powerful_questions";
        }
        
        const techniqueInfo = this.coachingTechniques[techniqueKey];
        
        // Prepare focus area information
        const areaInfo = focusArea && this.lifeAreas[focusArea] ? 
            this.lifeAreas[focusArea] : null;
        
        return `# Coaching Approach: ${techniqueInfo.name}${areaInfo ? ` for ${areaInfo.name}` : ""}

In a complete implementation with an AI model and coaching expertise, I would engage with you using the ${techniqueInfo.name} technique to help you explore, develop insights, and create forward movement${areaInfo ? ` in ${areaInfo.name}` : ""}.

## About This Coaching Approach

${techniqueInfo.description}

This approach is particularly effective for:
- [Would explain when this technique is most useful]
- [Would describe specific situations it addresses]
- [Would note how it supports the current coaching stage]

## Key Elements of ${techniqueInfo.name}

[Would provide detailed explanation of the technique's components and principles]

## Reflective Prompts

Consider these thought-provoking questions${areaInfo ? ` about your ${areaInfo.name.toLowerCase()}` : ""}:

${techniqueInfo.examples.map(example => `- ${example}`).join('\n')}

## Application Process

To make the most of this approach:

1. **Take your time**: Allow space for reflection rather than rushing to answers
2. **Explore deeply**: Look beyond initial responses to underlying insights
3. **Notice reactions**: Pay attention to emotional responses and resistance
4. **Connect dots**: Look for patterns and relationships between ideas
5. **Capture insights**: Record key realizations for future reference

## Moving Forward

Based on your reflections:

- What new awareness or insights are emerging?
- What possibilities do you now see that weren't visible before?
- What specific next steps would create positive movement?
- What support would help you implement these insights?
- How will you hold yourself accountable for action?

## Next Steps in Your Coaching Journey

Would you like to:
- Explore one of these reflective prompts in more depth?
- Shift focus to a specific challenge or opportunity?
- Move toward more concrete goal-setting or planning?
- Discuss how to apply these insights in practical ways?
- Try a different coaching approach?

Remember that powerful insights often emerge not from quick answers but from thoughtful consideration of meaningful questions.`;
    }
    
    /**
     * Get coaching suggestions based on user interaction
     * @param {string} requestType - Type of coaching request
     * @param {string} focusArea - Focus area if available
     * @returns {Array<string>} Coaching suggestions
     */
    getCoachingSuggestions(requestType, focusArea) {
        const suggestions = [];
        
        // Add type-specific suggestions
        if (requestType === "goal_setting") {
            suggestions.push("Help me set a SMART goal");
            suggestions.push("How can I track progress on my goals?");
            suggestions.push("What's the difference between outcome and process goals?");
        } else if (requestType === "habit_formation") {
            suggestions.push("How can I build a consistent exercise habit?");
            suggestions.push("What's the best way to break a bad habit?");
            suggestions.push("Help me create a morning routine");
        } else if (requestType === "obstacle_navigation") {
            suggestions.push("I'm struggling with procrastination");
            suggestions.push("How can I overcome my fear of failure?");
            suggestions.push("Help me deal with perfectionism");
        } else if (requestType === "motivation") {
            suggestions.push("How do I stay motivated when progress is slow?");
            suggestions.push("What drives intrinsic motivation?");
            suggestions.push("I need help motivating myself to exercise");
        } else if (requestType === "time_management") {
            suggestions.push("How can I be more productive working from home?");
            suggestions.push("Help me prioritize my tasks better");
            suggestions.push("Techniques for managing digital distractions");
        } else if (requestType === "work_life_balance") {
            suggestions.push("How can I create better boundaries between work and personal life?");
            suggestions.push("I'm feeling burned out at work");
            suggestions.push("Tips for managing stress and preventing overwhelm");
        } else if (requestType === "values_clarification") {
            suggestions.push("How do I identify my core values?");
            suggestions.push("Help me find my purpose");
            suggestions.push("How can I make decisions more aligned with my values?");
        } else if (requestType === "accountability") {
            suggestions.push("How can I hold myself accountable for my goals?");
            suggestions.push("What are effective accountability structures?");
            suggestions.push("Help me follow through on my commitments");
        }
        
        // Add focus area specific suggestions if available
        if (focusArea && this.lifeAreas[focusArea]) {
            const areaInfo = this.lifeAreas[focusArea];
            suggestions.push(`How can I improve my ${areaInfo.name.toLowerCase()}?`);
            
            if (areaInfo.common_goals && areaInfo.common_goals.length > 0) {
                const randomGoal = areaInfo.common_goals[Math.floor(Math.random() * areaInfo.common_goals.length)];
                suggestions.push(`Help me with ${randomGoal.toLowerCase()}`);
            }
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "What questions should I ask myself when setting goals?",
                "How can I become more disciplined?",
                "What's the best way to track personal growth?",
                "How do I overcome limiting beliefs?",
                "Tips for building self-confidence",
                "How can I develop more resilience?",
                "What are effective reflection practices for personal growth?"
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
                'jaat-mode13-preferences',
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
            localStorage.removeItem('jaat-mode13-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Set coaching style
     * @param {string} style - Coaching style
     * @returns {boolean} Success status
     */
    setCoachingStyle(style) {
        if (!style) return false;
        
        // Set coaching style
        this.state.coachingStyle = style;
        
        // Save updated coaching style
        this.savePreferences({ coachingStyle: style });
        return true;
    }
    
    /**
     * Add a goal
     * @param {Object} goal - Goal to add
     * @returns {boolean} Success status
     */
    addGoal(goal) {
        if (!goal || !goal.title) return false;
        
        // Make sure the goal has all needed properties
        const newGoal = {
            id: Date.now().toString(),
            title: goal.title,
            description: goal.description || "",
            area: goal.area || null,
            type: goal.type || "outcome",
            deadline: goal.deadline || null,
            created: new Date().toISOString(),
            progress: goal.progress || 0,
            milestones: goal.milestones || [],
            status: "active"
        };
        
        // Add the goal
        this.state.userGoals.push(newGoal);
        
        // Update stage if needed
        if (this.state.stage === "exploration" || this.state.stage === "goal-setting") {
            this.state.stage = "action-planning";
            this.savePreferences({ stage: this.state.stage });
        }
        
        // Save updated goals
        this.savePreferences({ userGoals: this.state.userGoals });
        return true;
    }
    
    /**
     * Add an action item
     * @param {Object} actionItem - Action item to add
     * @returns {boolean} Success status
     */
    addActionItem(actionItem) {
        if (!actionItem || !actionItem.title) return false;
        
        // Make sure the action item has all needed properties
        const newActionItem = {
            id: Date.now().toString(),
            title: actionItem.title,
            description: actionItem.description || "",
            goalId: actionItem.goalId || null,
            area: actionItem.area || null,
            deadline: actionItem.deadline || null,
            created: new Date().toISOString(),
            completed: false
        };
        
        // Add the action item
        this.state.actionItems.push(newActionItem);
        
        // Update stage if needed
        if (this.state.stage === "action-planning") {
            this.state.stage = "execution";
            this.savePreferences({ stage: this.state.stage });
        }
        
        // Save updated action items
        this.savePreferences({ actionItems: this.state.actionItems });
        return true;
    }
    
    /**
     * Update goal progress
     * @param {string} goalId - Goal ID
     * @param {number} progress - Progress value (0-100)
     * @returns {boolean} Success status
     */
    updateGoalProgress(goalId, progress) {
        if (!goalId || progress === undefined || progress < 0 || progress > 100) return false;
        
        // Find the goal
        const goalIndex = this.state.userGoals.findIndex(goal => goal.id === goalId);
        if (goalIndex === -1) return false;
        
        // Update progress
        this.state.userGoals[goalIndex].progress = progress;
        
        // Update status if completed
        if (progress >= 100) {
            this.state.userGoals[goalIndex].status = "completed";
            
            // Update stage if needed
            if (this.state.stage === "execution") {
                this.state.stage = "reflection";
                this.savePreferences({ stage: this.state.stage });
            }
        }
        
        // Save updated goals
        this.savePreferences({ userGoals: this.state.userGoals });
        return true;
    }
    
    /**
     * Complete an action item
     * @param {string} actionItemId - Action item ID
     * @returns {boolean} Success status
     */
    completeActionItem(actionItemId) {
        if (!actionItemId) return false;
        
        // Find the action item
        const actionItemIndex = this.state.actionItems.findIndex(item => item.id === actionItemId);
        if (actionItemIndex === -1) return false;
        
        // Mark as completed
        this.state.actionItems[actionItemIndex].completed = true;
        this.state.actionItems[actionItemIndex].completedDate = new Date().toISOString();
        
        // Save updated action items
        this.savePreferences({ actionItems: this.state.actionItems });
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
            coachingStyle: this.state.coachingStyle,
            stage: this.state.stage,
            focusAreas: this.state.focusAreas,
            goalCount: this.state.userGoals.length,
            activeGoals: this.state.userGoals.filter(goal => goal.status === "active").length,
            actionItemCount: this.state.actionItems.length,
            pendingActionItems: this.state.actionItems.filter(item => !item.completed).length,
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
    window.jaatAIModes.lifeCoach = new LifeCoachMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LifeCoachMode;
}
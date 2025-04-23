/**
 * JAAT-AI Math Tutor Mode
 * AI mode specialized in mathematics education and problem-solving assistance
 * Mode ID: 18
 */

class MathTutorMode {
    constructor() {
        // Mode metadata
        this.id = "18";
        this.name = "Math Tutor";
        this.description = "Your AI math tutor for learning concepts and solving problems";
        this.icon = "ri-calculator-line";
        this.color = "#0ea5e9"; // Sky blue color
        this.category = "education";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 4000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 6, // 1-10 scale (higher = more personality)
            creativityLevel: 5, // 1-10 scale
            formalityLevel: 6, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            explanationDepth: 8, // 1-10 scale
            stepByStepGuide: true,
            visualAidsEnabled: true
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            mathTopics: [], // Topics the user has studied
            problemHistory: [], // Previous problems solved
            difficultyLevel: "intermediate", // beginner, intermediate, advanced, expert
            learningStyle: "conceptual", // conceptual, visual, procedural, practical
            currentTopic: null,
            sessionStartTime: new Date(),
            responseCount: 0,
            lastProblemText: null,
            lastSolutionText: null
        };
        
        // Math topics and subtopics
        this.mathTopics = {
            "arithmetic": {
                name: "Arithmetic",
                description: "Basic operations with numbers",
                subtopics: [
                    "Addition and Subtraction",
                    "Multiplication and Division",
                    "Fractions and Decimals",
                    "Percentages",
                    "Ratios and Proportions",
                    "Exponents and Roots"
                ]
            },
            "algebra": {
                name: "Algebra",
                description: "Working with variables and equations",
                subtopics: [
                    "Linear Equations",
                    "Quadratic Equations",
                    "Systems of Equations",
                    "Polynomials",
                    "Factoring",
                    "Functions and Graphs",
                    "Inequalities",
                    "Exponents and Logarithms"
                ]
            },
            "geometry": {
                name: "Geometry",
                description: "Properties and relations of points, lines, surfaces, and solids",
                subtopics: [
                    "Points, Lines, and Angles",
                    "Triangles",
                    "Quadrilaterals",
                    "Circles",
                    "Coordinate Geometry",
                    "Transformations",
                    "Area and Volume",
                    "Trigonometry"
                ]
            },
            "calculus": {
                name: "Calculus",
                description: "Study of continuous change and motion",
                subtopics: [
                    "Limits and Continuity",
                    "Derivatives",
                    "Applications of Derivatives",
                    "Integration",
                    "Applications of Integration",
                    "Differential Equations",
                    "Sequences and Series",
                    "Multivariable Calculus"
                ]
            },
            "statistics": {
                name: "Statistics",
                description: "Collection, analysis, interpretation, and presentation of data",
                subtopics: [
                    "Descriptive Statistics",
                    "Probability",
                    "Random Variables",
                    "Probability Distributions",
                    "Sampling",
                    "Hypothesis Testing",
                    "Regression Analysis",
                    "Correlation"
                ]
            },
            "linear_algebra": {
                name: "Linear Algebra",
                description: "Study of linear equations, vectors, and matrices",
                subtopics: [
                    "Vectors and Vector Spaces",
                    "Matrices and Operations",
                    "Systems of Linear Equations",
                    "Determinants",
                    "Eigenvalues and Eigenvectors",
                    "Linear Transformations",
                    "Inner Product Spaces",
                    "Orthogonality"
                ]
            },
            "discrete_math": {
                name: "Discrete Mathematics",
                description: "Study of mathematical structures that are discrete rather than continuous",
                subtopics: [
                    "Logic and Proofs",
                    "Set Theory",
                    "Combinatorics",
                    "Graph Theory",
                    "Number Theory",
                    "Recursion",
                    "Relations",
                    "Boolean Algebra"
                ]
            }
        };
        
        // Learning strategies by style
        this.learningStrategies = {
            "conceptual": {
                name: "Conceptual Understanding",
                description: "Focus on understanding underlying principles and concepts",
                approaches: [
                    "Connect new concepts to previously understood ideas",
                    "Explore the 'why' behind mathematical procedures",
                    "Use analogies and metaphors to explain abstract concepts",
                    "Discuss the historical development of mathematical ideas",
                    "Relate concepts to their real-world applications"
                ]
            },
            "visual": {
                name: "Visual Learning",
                description: "Emphasize diagrams, graphs, and visual representations",
                approaches: [
                    "Use diagrams and graphs to represent problems",
                    "Employ color-coding to highlight key elements",
                    "Create visual mappings between related concepts",
                    "Utilize geometric interpretations of algebraic ideas",
                    "Incorporate interactive visualizations when possible"
                ]
            },
            "procedural": {
                name: "Procedural Fluency",
                description: "Focus on step-by-step procedures and algorithms",
                approaches: [
                    "Break down complex procedures into clear, manageable steps",
                    "Provide structured practice with similar problem types",
                    "Use consistent notation and formatting in explanations",
                    "Highlight common pitfalls and error patterns",
                    "Build from simple to complex procedures gradually"
                ]
            },
            "practical": {
                name: "Practical Application",
                description: "Emphasize real-world applications and problem-solving",
                approaches: [
                    "Connect mathematical concepts to real-world scenarios",
                    "Use authentic problems from relevant contexts",
                    "Discuss how mathematics is used in various professions",
                    "Focus on modeling real situations mathematically",
                    "Explore interdisciplinary applications"
                ]
            }
        };
        
        // Problem-solving frameworks
        this.problemSolvingFrameworks = {
            "polya": {
                name: "Polya's Problem-Solving Framework",
                steps: [
                    {
                        name: "Understand the Problem",
                        description: "Clearly identify what is known and what is being asked",
                        prompts: [
                            "What information is given?",
                            "What are you trying to find or prove?",
                            "Are there any constraints or conditions?",
                            "Can you restate the problem in your own words?",
                            "Can you draw a picture or diagram to represent the problem?"
                        ]
                    },
                    {
                        name: "Devise a Plan",
                        description: "Develop a strategy to solve the problem",
                        prompts: [
                            "Have you seen a similar problem before?",
                            "Can you break the problem into smaller parts?",
                            "What mathematical concepts might be relevant?",
                            "Can you identify a pattern?",
                            "Could you solve a simpler version of this problem first?"
                        ]
                    },
                    {
                        name: "Carry Out the Plan",
                        description: "Implement your strategy carefully",
                        prompts: [
                            "Execute each step carefully and check your work",
                            "Keep track of your progress",
                            "If your approach isn't working, be willing to start over with a new plan",
                            "Be persistent but also flexible"
                        ]
                    },
                    {
                        name: "Look Back",
                        description: "Check your solution and reflect on the process",
                        prompts: [
                            "Does your answer satisfy the original conditions?",
                            "Can you verify the result differently?",
                            "Can you use this solution method for other problems?",
                            "Can you improve or simplify your solution?",
                            "What did you learn from solving this problem?"
                        ]
                    }
                ]
            },
            "conceptual": {
                name: "Conceptual Understanding Framework",
                steps: [
                    {
                        name: "Identify the Core Concept",
                        description: "Determine the fundamental mathematical idea involved",
                        prompts: [
                            "What mathematical concepts are central to this problem?",
                            "How does this problem relate to key principles we've studied?",
                            "Can you identify the abstract structure of this problem?"
                        ]
                    },
                    {
                        name: "Connect to Prior Knowledge",
                        description: "Link the problem to concepts you already understand",
                        prompts: [
                            "How is this similar to problems you've solved before?",
                            "What theorems or principles apply to this situation?",
                            "Can you relate this to a fundamental concept you understand well?"
                        ]
                    },
                    {
                        name: "Represent the Problem",
                        description: "Create appropriate mathematical representations",
                        prompts: [
                            "How can you represent this situation symbolically?",
                            "What equations or inequalities describe the relationships?",
                            "Can you create a visual or graphical representation?"
                        ]
                    },
                    {
                        name: "Solve and Interpret",
                        description: "Solve the mathematical problem and interpret the result",
                        prompts: [
                            "What does the solution mean in the context of the problem?",
                            "Is your answer reasonable given the problem constraints?",
                            "How does this solution enhance your understanding of the concept?"
                        ]
                    }
                ]
            }
        };
        
        // Common mathematical misconceptions and clarifications
        this.commonMisconceptions = {
            "arithmetic": [
                {
                    misconception: "Multiplication always makes numbers bigger",
                    clarification: "Multiplication by a number between 0 and 1 actually makes the result smaller, not larger. For example, 10 × 0.5 = 5, which is smaller than 10."
                },
                {
                    misconception: "Division always makes numbers smaller",
                    clarification: "Division by a number between 0 and 1 actually makes the result larger, not smaller. For example, 10 ÷ 0.5 = 20, which is larger than 10."
                },
                {
                    misconception: "The '=' sign means 'calculate' or 'the answer comes next'",
                    clarification: "The equals sign represents a relationship of equality between two expressions. It means that the expressions on both sides have the same value."
                }
            ],
            "algebra": [
                {
                    misconception: "Variables are just placeholders for unknown numbers",
                    clarification: "Variables can represent a range of values, not just a single unknown number. They can represent changing quantities in functions or parameters in expressions."
                },
                {
                    misconception: "Equations and expressions are the same thing",
                    clarification: "An expression is a mathematical phrase without an equals sign (like 3x + 2), while an equation is a statement that two expressions are equal (like 3x + 2 = 11)."
                },
                {
                    misconception: "(a+b)² = a² + b²",
                    clarification: "This is incorrect. The correct expansion is (a+b)² = a² + 2ab + b². The error comes from forgetting the middle term."
                }
            ],
            "geometry": [
                {
                    misconception: "The shortest distance between two points is always a straight line",
                    clarification: "This is only true in Euclidean (flat) space. On a sphere or curved surface, the shortest path (geodesic) may be a curve."
                },
                {
                    misconception: "Squaring a number always makes it larger",
                    clarification: "This is only true for numbers with absolute value greater than 1. For numbers between -1 and 1, squaring actually makes them smaller in absolute value."
                },
                {
                    misconception: "π is exactly 3.14",
                    clarification: "π is an irrational number, meaning it cannot be expressed as a simple fraction or terminating decimal. 3.14 is just an approximation. π continues infinitely without repeating: 3.14159265..."
                }
            ],
            "calculus": [
                {
                    misconception: "Derivatives are only about finding slopes of tangent lines",
                    clarification: "While derivatives do represent the slope of the tangent line to a curve, they have broader meaning as rates of change and are used in many contexts beyond geometric interpretation."
                },
                {
                    misconception: "Integration is just the reverse of differentiation",
                    clarification: "While integration is the inverse operation of differentiation, it also represents the accumulation of quantities and calculation of areas, volumes, and other properties."
                },
                {
                    misconception: "Limits are just about substituting the value",
                    clarification: "Limits describe the behavior of a function as its input approaches a value, not necessarily the value of the function at that point. Direct substitution only works for continuous functions."
                }
            ]
        };
        
        // Difficulty levels and their characteristics
        this.difficultyLevels = {
            "beginner": {
                name: "Beginner",
                description: "Foundational concepts and straightforward applications",
                characteristics: [
                    "Direct application of a single concept",
                    "Clear, explicit instructions",
                    "Minimal computational complexity",
                    "Familiar contexts",
                    "Immediate feedback and guidance"
                ]
            },
            "intermediate": {
                name: "Intermediate",
                description: "Integration of multiple concepts and more complex applications",
                characteristics: [
                    "Application of multiple related concepts",
                    "Some interpretation required",
                    "Moderate computational complexity",
                    "Less familiar contexts",
                    "Guided problem-solving with some independence"
                ]
            },
            "advanced": {
                name: "Advanced",
                description: "Complex problem-solving requiring deeper conceptual understanding",
                characteristics: [
                    "Integration of multiple areas of mathematics",
                    "Significant interpretation and strategy required",
                    "Higher computational complexity",
                    "Abstract or unfamiliar contexts",
                    "More independent problem-solving with strategic guidance"
                ]
            },
            "expert": {
                name: "Expert",
                description: "Sophisticated problems requiring creative approaches and deep insights",
                characteristics: [
                    "Synthesis across mathematical domains",
                    "Novel applications requiring creativity",
                    "Potentially challenging computations",
                    "Highly abstract or specialized contexts",
                    "Emphasis on independent solution strategies"
                ]
            }
        };
        
        // Study strategies and tips
        this.studyStrategies = {
            "practice": [
                "Solve varied problems rather than many similar ones",
                "Try to solve problems before looking at solutions",
                "Review errors and misconceptions systematically",
                "Progressively tackle more challenging problems",
                "Teach concepts to others to deepen understanding"
            ],
            "note_taking": [
                "Create summary sheets of key formulas and concepts",
                "Use color-coding to highlight relationships between ideas",
                "Draw diagrams and visual representations",
                "Write explanations in your own words",
                "Document common errors and how to avoid them"
            ],
            "test_preparation": [
                "Practice under test-like conditions",
                "Focus on understanding rather than memorization",
                "Create and solve your own problems",
                "Develop strategies for checking your work",
                "Identify and address knowledge gaps early"
            ],
            "addressing_anxiety": [
                "Focus on the process rather than just the answer",
                "Practice mindfulness techniques before challenging work",
                "Break complex problems into manageable parts",
                "Celebrate progress, not just correct answers",
                "Reframe errors as learning opportunities"
            ]
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Explain the quadratic formula",
            "Help me solve this equation: 3x + 5 = 17",
            "What's the derivative of sin(x)?",
            "Explain the Pythagorean theorem",
            "How do I find the area of a circle?",
            "Show me how to solve a system of equations",
            "What's the difference between mean and median?",
            "Help me understand logarithms",
            "How do I calculate probability?",
            "Explain vectors in simple terms"
        ];
        
        // Special features
        this.features = {
            stepByStepSolutions: true,
            conceptExplanations: true,
            visualAids: true,
            practiceProblems: true,
            misconceptionClarification: true,
            progressTracking: true,
            adaptiveDifficulty: true,
            quizGeneration: true,
            formulaReference: true,
            studyStrategies: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 50,
            DISCLAIMER: "While this mathematical guidance aims to be accurate and helpful, always verify important calculations and consult appropriate resources for critical applications.",
            GREETING_PHRASES: [
                "Hello! I'm your AI math tutor. What mathematical topic would you like to explore today?",
                "Welcome to math tutoring! What concept or problem can I help you with?",
                "Ready to tackle some math? What would you like to work on today?",
                "Math assistance at your service! What topic shall we explore or problem shall we solve?",
                "Greetings! What mathematical question or concept would you like help with today?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Math Tutor mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set difficulty level if provided
        if (options.difficultyLevel) {
            this.state.difficultyLevel = options.difficultyLevel;
        }
        
        // Set learning style if provided
        if (options.learningStyle) {
            this.state.learningStyle = options.learningStyle;
        }
        
        // Set current topic if provided
        if (options.currentTopic) {
            this.state.currentTopic = options.currentTopic;
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode18-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Math Tutor mode");
                
                // Load difficulty level if saved
                if (this.state.userPreferences.difficultyLevel) {
                    this.state.difficultyLevel = this.state.userPreferences.difficultyLevel;
                }
                
                // Load learning style if saved
                if (this.state.userPreferences.learningStyle) {
                    this.state.learningStyle = this.state.userPreferences.learningStyle;
                }
                
                // Load math topics if saved
                if (this.state.userPreferences.mathTopics) {
                    this.state.mathTopics = this.state.userPreferences.mathTopics;
                }
                
                // Load problem history if saved
                if (this.state.userPreferences.problemHistory) {
                    this.state.problemHistory = this.state.userPreferences.problemHistory;
                }
                
                // Load current topic if saved
                if (this.state.userPreferences.currentTopic) {
                    this.state.currentTopic = this.state.userPreferences.currentTopic;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode18-history');
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
        
        console.log(`Math Tutor mode initialized with difficulty: ${this.state.difficultyLevel}, learning style: ${this.state.learningStyle}`);
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
     * Process user input and generate a math tutoring response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with mathematical content
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your AI math tutor. I can help explain mathematical concepts, solve problems step-by-step, and provide practice exercises. What math topic would you like to explore today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing math tutoring request`);
        
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
        
        // Detect type of math request
        const requestType = this.detectRequestType(userInput);
        
        // Identify topic if applicable
        const topic = this.identifyMathTopic(userInput);
        if (topic) {
            this.state.currentTopic = topic;
            
            // Add to list of topics if not already present
            if (!this.state.mathTopics.includes(topic)) {
                this.state.mathTopics.push(topic);
                this.savePreferences({ mathTopics: this.state.mathTopics });
            }
        }
        
        // Check if the input contains a mathematical problem to solve
        if (requestType === "problem_solving") {
            this.state.lastProblemText = userInput;
        }
        
        // Generate appropriate math tutoring response
        const response = await this.generateMathResponse(
            userInput, 
            requestType, 
            topic,
            context
        );
        
        // Save solution if a problem was solved
        if (requestType === "problem_solving") {
            this.state.lastSolutionText = response.text;
            
            // Add to problem history
            this.state.problemHistory.push({
                problem: userInput,
                solution: response.text,
                topic: topic,
                timestamp: new Date().toISOString()
            });
            
            // Trim history if it's getting too long
            if (this.state.problemHistory.length > 30) {
                this.state.problemHistory = this.state.problemHistory.slice(-30);
            }
            
            // Save updated problem history
            this.savePreferences({ problemHistory: this.state.problemHistory });
        }
        
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
                    'jaat-mode18-history',
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
     * Detect the type of math request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for problem solving request
        if (/\b(?:solve|calculate|compute|evaluate|find|determine|what is|simplify)\b/i.test(normalizedInput) && 
            /[0-9+\-*/^()=<>≤≥≠√∛∜π∑∏∫]/.test(input)) {
            return "problem_solving";
        }
        
        // Check for concept explanation request
        if (/\b(?:explain|what is|define|describe|elaborate on|tell me about|help me understand|clarify)\b/i.test(normalizedInput) && 
            !/\b(?:solve|calculate|compute|evaluate|find|determine|simplify)\b/i.test(normalizedInput)) {
            return "concept_explanation";
        }
        
        // Check for example request
        if (/\b(?:example|show me how|demonstrate|illustration|sample|instance)\b/i.test(normalizedInput)) {
            return "example_request";
        }
        
        // Check for practice problem request
        if (/\b(?:practice|exercise|problem set|quiz|test|challenge|question)\b/i.test(normalizedInput)) {
            return "practice_request";
        }
        
        // Check for study strategy request
        if (/\b(?:how to study|study tips|learning strategy|memorize|remember|prepare for|tips for|advice for)\b/i.test(normalizedInput)) {
            return "study_strategy";
        }
        
        // Check for concept comparison request
        if (/\b(?:difference between|compare|versus|vs|similarity between|relate|connection|how does|how do)\b/i.test(normalizedInput)) {
            return "concept_comparison";
        }
        
        // Check for application request
        if (/\b(?:application|use case|real world|practical|apply|used for|used in|when would|why is|why do)\b/i.test(normalizedInput)) {
            return "application_request";
        }
        
        // Check for formula request
        if (/\b(?:formula|equation|expression|rule|theorem|identity|law)\b/i.test(normalizedInput)) {
            return "formula_request";
        }
        
        // If input contains mathematical symbols/expressions but isn't clearly a solve request
        if (/[0-9+\-*/^()=<>≤≥≠√∛∜π∑∏∫]/.test(input)) {
            return "problem_solving";
        }
        
        // Default to general math inquiry
        return "general_math_inquiry";
    }
    
    /**
     * Identify math topic from user input
     * @param {string} input - User input
     * @returns {string|null} Math topic or null
     */
    identifyMathTopic(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of main topics
        for (const topic in this.mathTopics) {
            if (normalizedInput.includes(topic.replace('_', ' ')) || 
                normalizedInput.includes(this.mathTopics[topic].name.toLowerCase())) {
                return topic;
            }
            
            // Check subtopics
            for (const subtopic of this.mathTopics[topic].subtopics) {
                if (normalizedInput.includes(subtopic.toLowerCase())) {
                    return topic;
                }
            }
        }
        
        // Check for specific keywords associated with each topic
        const topicKeywords = {
            "arithmetic": ["add", "subtract", "multiply", "divide", "fraction", "decimal", "percent", "ratio", "proportion", "exponent", "root", "square root"],
            "algebra": ["equation", "variable", "solve for", "polynomial", "factor", "quadratic", "linear", "system", "function", "graph", "inequality", "logarithm"],
            "geometry": ["angle", "triangle", "square", "rectangle", "circle", "polygon", "perimeter", "area", "volume", "coordinate", "transformation", "trigonometry", "sine", "cosine", "tangent"],
            "calculus": ["limit", "derivative", "integral", "differentiate", "integrate", "rate of change", "continuous", "converge", "differential", "extrema", "optimization"],
            "statistics": ["probability", "distribution", "mean", "median", "mode", "standard deviation", "variance", "sample", "population", "hypothesis", "regression", "correlation"],
            "linear_algebra": ["matrix", "vector", "determinant", "eigenvalue", "eigenvector", "linear transformation", "basis", "span", "linear independence", "subspace"],
            "discrete_math": ["proof", "logic", "set", "combination", "permutation", "graph theory", "tree", "recursion", "induction", "boolean", "proposition"]
        };
        
        for (const [topic, keywords] of Object.entries(topicKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return topic;
                }
            }
        }
        
        // If the user has a current topic and input doesn't suggest a new topic, maintain the current one
        if (this.state.currentTopic) {
            return this.state.currentTopic;
        }
        
        // If we have mathematical expressions but can't determine topic, default to algebra
        if (/[0-9+\-*/^()=<>≤≥≠√∛∜π∑∏∫]/.test(input)) {
            return "algebra";
        }
        
        return null;
    }
    
    /**
     * Generate a math tutoring response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of math request
     * @param {string} topic - Math topic if available
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateMathResponse(userInput, requestType, topic, context = {}) {
        // In a real implementation, this would call an AI model API specialized in mathematics
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "problem_solving":
                responseText = this.solveMathProblem(userInput, topic);
                break;
                
            case "concept_explanation":
                responseText = this.explainMathConcept(userInput, topic);
                break;
                
            case "example_request":
                responseText = this.provideMathExample(userInput, topic);
                break;
                
            case "practice_request":
                responseText = this.generatePracticeProblems(userInput, topic);
                break;
                
            case "study_strategy":
                responseText = this.suggestStudyStrategies(userInput, topic);
                break;
                
            case "concept_comparison":
                responseText = this.compareMathConcepts(userInput, topic);
                break;
                
            case "application_request":
                responseText = this.explainMathApplications(userInput, topic);
                break;
                
            case "formula_request":
                responseText = this.provideMathFormula(userInput, topic);
                break;
                
            default:
                responseText = this.provideGeneralMathGuidance(userInput, topic);
        }
        
        // Add disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate math tutoring suggestions
        const mathSuggestions = this.getMathSuggestions(requestType, topic);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            topic: topic,
            suggestions: mathSuggestions
        };
    }
    
    /**
     * Solve a math problem based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Math topic if available
     * @returns {string} Problem solution
     */
    solveMathProblem(userInput, topic) {
        // In a full implementation, this would use specialized math processing
        // to analyze the problem and provide a step-by-step solution
        
        const topicInfo = topic && this.mathTopics[topic] ? this.mathTopics[topic] : { name: "Mathematics" };
        
        // Extract the mathematical problem from the user input
        let problem = this.extractMathProblem(userInput);
        
        // If no clear problem is found, provide a general response
        if (!problem) {
            return `# Problem Solving

In a complete implementation with an AI model and mathematical expertise, I would analyze your problem, recognize the mathematical patterns, and provide a step-by-step solution.

To solve a mathematical problem, I need to see the specific equation, expression, or question you'd like help with. For example:
- "Solve 2x + 3 = 7"
- "Find the derivative of f(x) = x² + 3x - 5"
- "Calculate the area of a circle with radius 4 cm"

Please provide your mathematical problem, and I'll be happy to walk through the solution process with you.`;
        }
        
        return `# Problem Solving: ${problem}

In a complete implementation with an AI model and mathematical expertise, I would solve this ${topicInfo.name.toLowerCase()} problem step-by-step, explaining the reasoning at each stage.

## Problem Analysis

To solve "${problem}", I would first analyze what we're looking for and what information we have.

## Step-by-Step Solution

In a complete implementation, I would provide:

1. **Initial Setup**
   - [Would identify the appropriate mathematical approach]
   - [Would express the problem in mathematical notation]
   - [Would outline the solution strategy]

2. **Working Through the Solution**
   - [Would show each mathematical step clearly]
   - [Would explain the reasoning behind each step]
   - [Would highlight key techniques or concepts being applied]

3. **Final Answer**
   - [Would provide the precise answer with appropriate units if applicable]
   - [Would verify the solution makes sense in the original context]

## Explanation

I would explain:
- Why this approach was chosen
- How the key concepts from ${topicInfo.name} apply to this problem
- Common pitfalls to avoid when solving similar problems

Would you like me to explain any particular aspect of this problem in more depth? Or would you like to see another similar problem for practice?`;
    }
    
    /**
     * Extract mathematical problem from user input
     * @param {string} input - User input
     * @returns {string|null} Mathematical problem or null
     */
    extractMathProblem(input) {
        // Look for common patterns that indicate a mathematical problem
        
        // Pattern: Solve [problem]
        const solvePattern = /\b(?:solve|calculate|compute|evaluate|find|determine)\s+(.+?)(?:\.|\?|$)/i;
        const solveMatch = input.match(solvePattern);
        if (solveMatch && solveMatch[1]) {
            return solveMatch[1].trim();
        }
        
        // Pattern: What is [problem]
        const whatIsPattern = /\b(?:what is|what's)\s+(.+?)(?:\.|\?|$)/i;
        const whatIsMatch = input.match(whatIsPattern);
        if (whatIsMatch && whatIsMatch[1] && /[0-9+\-*/^()=<>≤≥≠√∛∜π∑∏∫]/.test(whatIsMatch[1])) {
            return whatIsMatch[1].trim();
        }
        
        // Pattern: help me solve/with [problem]
        const helpPattern = /\b(?:help me solve|help me with|help with)\s+(.+?)(?:\.|\?|$)/i;
        const helpMatch = input.match(helpPattern);
        if (helpMatch && helpMatch[1]) {
            return helpMatch[1].trim();
        }
        
        // Pattern: I need to solve/find [problem]
        const needPattern = /\b(?:I need to solve|I need to find|I need to calculate|I need to compute)\s+(.+?)(?:\.|\?|$)/i;
        const needMatch = input.match(needPattern);
        if (needMatch && needMatch[1]) {
            return needMatch[1].trim();
        }
        
        // If the input directly contains mathematical symbols, treat the entire input as the problem
        if (/[0-9+\-*/^()=<>≤≥≠√∛∜π∑∏∫]/.test(input)) {
            return input.trim();
        }
        
        return null;
    }
    
    /**
     * Explain a mathematical concept based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Math topic if available
     * @returns {string} Concept explanation
     */
    explainMathConcept(userInput, topic) {
        // Extract the concept from user input
        const concept = this.extractMathConcept(userInput);
        
        if (!concept) {
            return `# Mathematical Concept Explanation

In a complete implementation with an AI model and mathematical expertise, I would provide a clear, thorough explanation of mathematical concepts tailored to your learning style and difficulty level.

To explain a mathematical concept, I need to know which specific concept you're interested in learning about. For example:
- "Explain the Pythagorean theorem"
- "What is integration by parts?"
- "Help me understand eigenvalues"

Please let me know which mathematical concept you'd like me to explain, and I'll provide a comprehensive explanation with examples.`;
        }
        
        const topicInfo = topic && this.mathTopics[topic] ? this.mathTopics[topic] : { name: "Mathematics" };
        
        // Determine the appropriate learning style
        const learningStyleInfo = this.learningStrategies[this.state.learningStyle];
        
        return `# ${this.capitalizeFirstLetter(concept)}

In a complete implementation with an AI model and mathematical expertise, I would provide a clear, thorough explanation of ${concept} using a ${learningStyleInfo.name.toLowerCase()} approach to match your preferred learning style.

## What is ${this.capitalizeFirstLetter(concept)}?

[Would provide a clear, concise definition of the concept]

## Key Properties and Characteristics

[Would explain fundamental aspects of ${concept}]

## Mathematical Formulation

[Would provide precise mathematical notation and formulation]

## Visual Representation

[Would describe or include relevant diagrams, graphs, or visual aids]

## Examples

[Would provide carefully selected examples demonstrating the concept]

### Example 1: Basic Application
[Would walk through a straightforward example]

### Example 2: More Complex Application
[Would demonstrate a more nuanced application]

## Common Misconceptions

[Would address frequent points of confusion about ${concept}]

## Applications and Significance

[Would explain where and why this concept is important in ${topicInfo.name} and beyond]

## Related Concepts

[Would explain how ${concept} connects to other mathematical ideas]

Would you like me to:
- Explain a specific aspect of ${concept} in more detail?
- Provide additional examples at a different difficulty level?
- Explain how ${concept} relates to other topics in ${topicInfo.name}?
- Suggest practice problems to reinforce your understanding?`;
    }
    
    /**
     * Extract mathematical concept from user input
     * @param {string} input - User input
     * @returns {string|null} Mathematical concept or null
     */
    extractMathConcept(input) {
        const normalizedInput = input.toLowerCase();
        
        // Pattern: explain/what is [concept]
        const explainPattern = /\b(?:explain|what is|what are|tell me about|clarify|help me understand)\s+(?:the|a|an)?\s*(.+?)(?:\.|\?|$)/i;
        const explainMatch = input.match(explainPattern);
        if (explainMatch && explainMatch[1]) {
            const potentialConcept = explainMatch[1].trim();
            
            // Filter out very short or common words
            if (potentialConcept.length > 2 && 
                !/^(it|this|that|these|those|them|how|when|where|why|who|what)$/.test(potentialConcept)) {
                return potentialConcept;
            }
        }
        
        // Pattern: definition of [concept]
        const definitionPattern = /\b(?:definition of|meaning of|define)\s+(?:the|a|an)?\s*(.+?)(?:\.|\?|$)/i;
        const definitionMatch = input.match(definitionPattern);
        if (definitionMatch && definitionMatch[1]) {
            return definitionMatch[1].trim();
        }
        
        // If topic is known but concept isn't clear, extract general topic words
        if (topic) {
            // Look for specialized terms in the input
            for (const subtopic of this.mathTopics[topic].subtopics) {
                if (normalizedInput.includes(subtopic.toLowerCase())) {
                    return subtopic.toLowerCase();
                }
            }
        }
        
        return null;
    }
    
    /**
     * Provide a mathematical example based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Math topic if available
     * @returns {string} Example explanation
     */
    provideMathExample(userInput, topic) {
        // Extract the concept for which an example is requested
        const concept = this.extractMathConcept(userInput);
        
        if (!concept) {
            return `# Mathematical Examples

In a complete implementation with an AI model and mathematical expertise, I would provide clear, instructive examples of mathematical concepts or problem-solving techniques.

To provide examples, I need to know which specific concept or type of problem you're interested in. For example:
- "Show me an example of integration by parts"
- "Give an example of solving a quadratic equation"
- "Demonstrate how to find the area of a triangle"

Please let me know what type of mathematical example would be most helpful for you.`;
        }
        
        const topicInfo = topic && this.mathTopics[topic] ? this.mathTopics[topic] : { name: "Mathematics" };
        
        // Determine the appropriate difficulty level
        const difficultyInfo = this.difficultyLevels[this.state.difficultyLevel];
        
        return `# Examples of ${this.capitalizeFirstLetter(concept)}

In a complete implementation with an AI model and mathematical expertise, I would provide clear, instructive examples of ${concept} at the ${difficultyInfo.name.toLowerCase()} level.

## Brief Concept Review

[Would provide a concise refresher on ${concept}]

## Example 1: Fundamental Application

### Problem Statement
[Would present a straightforward example problem involving ${concept}]

### Step-by-Step Solution
[Would walk through the solution process with detailed explanations]

### Key Insights
[Would highlight important concepts demonstrated in this example]

## Example 2: Applied Context

### Problem Statement
[Would present an example showing ${concept} in a practical or applied context]

### Step-by-Step Solution
[Would provide a detailed solution emphasizing application principles]

### Key Insights
[Would emphasize how the concept operates in application]

${this.state.difficultyLevel === "intermediate" || this.state.difficultyLevel === "advanced" || this.state.difficultyLevel === "expert" ? `## Example 3: More Complex Application

### Problem Statement
[Would present a more challenging example for deeper understanding]

### Step-by-Step Solution
[Would provide a detailed solution with attention to nuanced aspects]

### Key Insights
[Would highlight sophisticated aspects of the concept]` : ""}

## Practice Opportunity

[Would provide a similar problem for you to try independently]

Would you like me to:
- Explain any part of these examples in more detail?
- Provide examples at a different difficulty level?
- Suggest related concepts where similar techniques apply?
- Walk through the practice problem together?`;
    }
    
    /**
     * Generate practice problems based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Math topic if available
     * @returns {string} Practice problems
     */
    generatePracticeProblems(userInput, topic) {
        // Determine the topic if not provided
        const extractedTopic = this.extractPracticeTopic(userInput);
        const selectedTopic = extractedTopic || topic || "algebra";
        
        const topicInfo = this.mathTopics[selectedTopic] ? this.mathTopics[selectedTopic] : this.mathTopics["algebra"];
        
        // Determine the appropriate difficulty level
        const difficultyInfo = this.difficultyLevels[this.state.difficultyLevel];
        
        return `# Practice Problems: ${topicInfo.name}

In a complete implementation with an AI model and mathematical expertise, I would generate customized practice problems in ${topicInfo.name} at the ${difficultyInfo.name.toLowerCase()} level.

## Problem Set

### Problem 1
[Would provide a clearly formulated problem appropriate for your level]

### Problem 2
[Would provide a problem that builds on the first concept]

### Problem 3
[Would provide a problem that introduces a related concept or application]

### Problem 4
[Would provide a more challenging problem that synthesizes multiple concepts]

### Problem 5
[Would provide a problem with real-world application]

## Guidance

- Try to solve these problems independently first
- If you get stuck, consider what concepts might apply
- Focus on setting up the problem correctly before calculating
- Check your answers by verifying they satisfy all conditions

## Hints

I can provide hints for any specific problem if needed. Just let me know which problem you'd like help with.

## Answer Key

I can provide step-by-step solutions for any of these problems once you've had a chance to attempt them.

Would you like to:
- Start with a specific problem from this set?
- Get problems focused on a particular subtopic of ${topicInfo.name}?
- Adjust the difficulty level of these problems?
- Get a solution or hint for a specific problem?`;
    }
    
    /**
     * Extract practice topic from user input
     * @param {string} input - User input
     * @returns {string|null} Practice topic or null
     */
    extractPracticeTopic(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of topics
        for (const topic in this.mathTopics) {
            if (normalizedInput.includes(topic.replace('_', ' ')) || 
                normalizedInput.includes(this.mathTopics[topic].name.toLowerCase())) {
                return topic;
            }
            
            // Check subtopics
            for (const subtopic of this.mathTopics[topic].subtopics) {
                if (normalizedInput.includes(subtopic.toLowerCase())) {
                    return topic;
                }
            }
        }
        
        // Look for phrases like "practice problems on/about/for [topic]"
        const practiceTopicPattern = /\b(?:practice|problems|exercises|questions)\s+(?:on|about|for|in|related to)\s+(?:the|a|an)?\s*(.+?)(?:\.|\?|$)/i;
        const practiceTopicMatch = input.match(practiceTopicPattern);
        if (practiceTopicMatch && practiceTopicMatch[1]) {
            const potentialTopic = practiceTopicMatch[1].trim().toLowerCase();
            
            // Check if it matches any of our topics
            for (const topic in this.mathTopics) {
                if (topic.replace('_', ' ').includes(potentialTopic) || 
                    this.mathTopics[topic].name.toLowerCase().includes(potentialTopic)) {
                    return topic;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Suggest study strategies based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Math topic if available
     * @returns {string} Study strategies
     */
    suggestStudyStrategies(userInput, topic) {
        // Determine the topic if available
        const topicInfo = topic && this.mathTopics[topic] ? this.mathTopics[topic] : null;
        
        // Try to identify what specific aspect of study the user is asking about
        const studyAspect = this.extractStudyAspect(userInput);
        
        let title = "Mathematics Study Strategies";
        if (topicInfo) {
            title = `${topicInfo.name} Study Strategies`;
        }
        if (studyAspect) {
            title = `${this.capitalizeFirstLetter(studyAspect)} Strategies for Mathematics`;
            if (topicInfo) {
                title = `${this.capitalizeFirstLetter(studyAspect)} Strategies for ${topicInfo.name}`;
            }
        }
        
        return `# ${title}

In a complete implementation with an AI model and educational expertise, I would provide personalized study strategies ${topicInfo ? `for ${topicInfo.name}` : "for mathematics"} tailored to your learning style and goals.

## Effective Study Approaches

### Understanding Core Concepts
- Focus on fundamental principles rather than just memorizing formulas
- Connect new ideas to concepts you already understand well
- Create your own explanations of key concepts in simple language
- Look for multiple explanations of difficult topics from different sources
- Test your understanding by explaining concepts to someone else

### Problem-Solving Practice
${this.studyStrategies.practice.map(strategy => `- ${strategy}`).join('\n')}

### Effective Note-Taking
${this.studyStrategies.note_taking.map(strategy => `- ${strategy}`).join('\n')}

${studyAspect === "test preparation" ? `### Test Preparation
${this.studyStrategies.test_preparation.map(strategy => `- ${strategy}`).join('\n')}` : ""}

${studyAspect === "anxiety" ? `### Addressing Math Anxiety
${this.studyStrategies.addressing_anxiety.map(strategy => `- ${strategy}`).join('\n')}` : ""}

${topicInfo ? `## Specific Strategies for ${topicInfo.name}

[Would provide specialized study approaches for ${topicInfo.name}]

### Key Concepts to Master
[Would identify foundational concepts in ${topicInfo.name}]

### Common Challenges
[Would address typical difficulties students face with ${topicInfo.name}]

### Recommended Resources
[Would suggest helpful books, websites, videos, or tools]` : ""}

## Creating a Study Plan

1. **Assess your current understanding**
   - Identify strengths and areas for improvement
   - Take practice tests to locate knowledge gaps

2. **Set specific learning goals**
   - Break down larger topics into manageable chunks
   - Create realistic timelines for mastery

3. **Implement varied practice**
   - Move from simple to complex problems
   - Practice applying concepts in different contexts
   - Space out your practice sessions over time

4. **Regular review and reflection**
   - Revisit material after initial learning
   - Track your progress and adjust approaches as needed

Would you like me to:
- Develop a more specific study plan for a particular mathematical topic?
- Suggest strategies for a specific learning challenge?
- Recommend approaches for particular types of mathematical problems?
- Discuss how to apply these strategies to your current coursework?`;
    }
    
    /**
     * Extract study aspect from user input
     * @param {string} input - User input
     * @returns {string|null} Study aspect or null
     */
    extractStudyAspect(input) {
        const normalizedInput = input.toLowerCase();
        
        if (/\b(?:test|exam|quiz|assessment|final)\b/i.test(normalizedInput)) {
            return "test preparation";
        }
        
        if (/\b(?:anxiety|nervous|worried|fear|scared|stress|panic|phobia|afraid)\b/i.test(normalizedInput)) {
            return "anxiety";
        }
        
        if (/\b(?:note|notes|taking notes|notebook|write down|writing)\b/i.test(normalizedInput)) {
            return "note taking";
        }
        
        if (/\b(?:practice|exercise|problem|homework|assignment)\b/i.test(normalizedInput)) {
            return "practice";
        }
        
        return null;
    }
    
    /**
     * Compare mathematical concepts based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Math topic if available
     * @returns {string} Concept comparison
     */
    compareMathConcepts(userInput, topic) {
        // Extract the concepts being compared
        const concepts = this.extractConceptsToCompare(userInput);
        
        if (!concepts || concepts.length < 2) {
            return `# Mathematical Concept Comparison

In a complete implementation with an AI model and mathematical expertise, I would provide a clear, thorough comparison of mathematical concepts, highlighting their similarities, differences, and relationships.

To compare mathematical concepts, I need to know which specific concepts you'd like me to compare. For example:
- "What's the difference between mean and median?"
- "How do differentiation and integration relate to each other?"
- "Compare and contrast vectors and matrices"

Please let me know which mathematical concepts you'd like me to compare, and I'll provide a comprehensive analysis of their relationship.`;
        }
        
        const topicInfo = topic && this.mathTopics[topic] ? this.mathTopics[topic] : { name: "Mathematics" };
        
        return `# Comparing ${this.capitalizeFirstLetter(concepts[0])} and ${this.capitalizeFirstLetter(concepts[1])}

In a complete implementation with an AI model and mathematical expertise, I would provide a clear, comprehensive comparison of ${concepts[0]} and ${concepts[1]} within the context of ${topicInfo.name}.

## Definitions

### ${this.capitalizeFirstLetter(concepts[0])}
[Would provide a precise definition]

### ${this.capitalizeFirstLetter(concepts[1])}
[Would provide a precise definition]

## Key Similarities

[Would identify important commonalities between the concepts]
- [Similarity 1]
- [Similarity 2]
- [Similarity 3]

## Key Differences

[Would highlight significant distinctions between the concepts]
- [Difference 1]
- [Difference 2]
- [Difference 3]

## Mathematical Formulation

### ${this.capitalizeFirstLetter(concepts[0])}
[Would present mathematical notation and formulation]

### ${this.capitalizeFirstLetter(concepts[1])}
[Would present mathematical notation and formulation]

## Visual Comparison

[Would describe how the concepts could be compared visually]

## When to Use Each

### When to Use ${this.capitalizeFirstLetter(concepts[0])}
[Would explain scenarios where this concept is most appropriate]

### When to Use ${this.capitalizeFirstLetter(concepts[1])}
[Would explain scenarios where this concept is most appropriate]

## Common Misconceptions

[Would address frequent points of confusion about these concepts]

## Example Comparing Both Concepts

[Would provide an example that illustrates both concepts and their relationship]

Would you like me to:
- Explore a specific aspect of this comparison in more detail?
- Provide additional examples showing these concepts in action?
- Explain how these concepts relate to other topics in ${topicInfo.name}?
- Discuss common errors when working with these concepts?`;
    }
    
    /**
     * Extract concepts to compare from user input
     * @param {string} input - User input
     * @returns {Array<string>|null} Concepts to compare or null
     */
    extractConceptsToCompare(input) {
        const normalizedInput = input.toLowerCase();
        
        // Pattern: difference/compare between A and B
        const comparePattern = /\b(?:difference|compare|comparison|contrast|distinguish|versus|vs\.?|similarities?|differences?)\s+(?:between|of|in)?\s+(?:the|a|an)?\s*(.+?)\s+(?:and|vs\.?|versus|&|or|compared to|compared with)\s+(?:the|a|an)?\s*(.+?)(?:\.|\?|$)/i;
        const compareMatch = input.match(comparePattern);
        if (compareMatch && compareMatch[1] && compareMatch[2]) {
            return [compareMatch[1].trim(), compareMatch[2].trim()];
        }
        
        // Pattern: how does A relate to B
        const relatePattern = /\b(?:how does|how do|relation between|relationship between|connection between)\s+(?:the|a|an)?\s*(.+?)\s+(?:relate to|connect to|compare to|connect with|compare with)\s+(?:the|a|an)?\s*(.+?)(?:\.|\?|$)/i;
        const relateMatch = input.match(relatePattern);
        if (relateMatch && relateMatch[1] && relateMatch[2]) {
            return [relateMatch[1].trim(), relateMatch[2].trim()];
        }
        
        // Pattern: what's better/worse A or B
        const betterPattern = /\b(?:what's better|what is better|which is better|which is worse|what's worse|what is worse)\s+(?:the|a|an)?\s*(.+?)\s+(?:or)\s+(?:the|a|an)?\s*(.+?)(?:\.|\?|$)/i;
        const betterMatch = input.match(betterPattern);
        if (betterMatch && betterMatch[1] && betterMatch[2]) {
            return [betterMatch[1].trim(), betterMatch[2].trim()];
        }
        
        // Pattern: A vs B
        const vsPattern = /\b(?:the|a|an)?\s*(.+?)\s+(?:vs\.?|versus)\s+(?:the|a|an)?\s*(.+?)(?:\.|\?|$)/i;
        const vsMatch = input.match(vsPattern);
        if (vsMatch && vsMatch[1] && vsMatch[2]) {
            return [vsMatch[1].trim(), vsMatch[2].trim()];
        }
        
        return null;
    }
    
    /**
     * Explain mathematical applications based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Math topic if available
     * @returns {string} Application explanation
     */
    explainMathApplications(userInput, topic) {
        // Extract the concept for which applications are requested
        const concept = this.extractMathConcept(userInput);
        
        if (!concept) {
            return `# Mathematical Applications

In a complete implementation with an AI model and mathematical expertise, I would explain how mathematical concepts are applied in various fields and real-world scenarios.

To explain applications, I need to know which specific mathematical concept you're interested in learning about. For example:
- "What are the applications of calculus?"
- "How is linear algebra used in the real world?"
- "What are the practical uses of statistics?"

Please let me know which mathematical concept you'd like to explore the applications of, and I'll provide a comprehensive overview of its real-world uses.`;
        }
        
        const topicInfo = topic && this.mathTopics[topic] ? this.mathTopics[topic] : { name: "Mathematics" };
        
        return `# Real-World Applications of ${this.capitalizeFirstLetter(concept)}

In a complete implementation with an AI model and mathematical expertise, I would provide a comprehensive overview of how ${concept} is applied across various fields and real-world contexts.

## Brief Concept Review

[Would provide a concise refresher on ${concept}]

## Applications in Science

[Would explain how ${concept} is used in physics, chemistry, biology, etc.]
- [Application 1]
- [Application 2]
- [Application 3]

## Applications in Engineering and Technology

[Would describe applications in various engineering disciplines and technology]
- [Application 1]
- [Application 2]
- [Application 3]

## Applications in Business and Finance

[Would explain uses in economics, finance, management, etc.]
- [Application 1]
- [Application 2]
- [Application 3]

## Applications in Social Sciences

[Would describe how the concept is used in psychology, sociology, etc.]
- [Application 1]
- [Application 2]
- [Application 3]

## Everyday Applications

[Would explain how the concept appears in daily life, often in ways we might not recognize]
- [Application 1]
- [Application 2]
- [Application 3]

## Case Study: ${this.capitalizeFirstLetter(concept)} in Action

[Would provide a detailed example showing how ${concept} solves a real-world problem]

## Future Directions

[Would discuss emerging applications and ongoing research]

Would you like me to:
- Explore a specific application area in more detail?
- Provide examples of how ${concept} is used in a particular field?
- Explain the mathematical principles behind a specific application?
- Discuss related concepts with similar applications?`;
    }
    
    /**
     * Provide mathematical formula based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Math topic if available
     * @returns {string} Formula explanation
     */
    provideMathFormula(userInput, topic) {
        // Extract the formula requested
        const formula = this.extractFormulaRequest(userInput);
        
        if (!formula) {
            return `# Mathematical Formulas

In a complete implementation with an AI model and mathematical expertise, I would provide precise mathematical formulas, their explanations, and guidance on their application.

To provide a formula, I need to know which specific formula or mathematical relationship you're interested in. For example:
- "What is the quadratic formula?"
- "Show me the formula for the area of a circle"
- "What's the equation for calculating variance?"

Please let me know which mathematical formula you'd like me to provide, and I'll share the formula along with a comprehensive explanation.`;
        }
        
        const topicInfo = topic && this.mathTopics[topic] ? this.mathTopics[topic] : { name: "Mathematics" };
        
        return `# ${this.capitalizeFirstLetter(formula)} Formula

In a complete implementation with an AI model and mathematical expertise, I would provide the precise formula for ${formula}, its derivation, and guidance on its application.

## The Formula

[Would present the mathematical formula in standard notation]

## Variables and Terms

[Would explain each variable and component of the formula]
- Variable 1: [Explanation]
- Variable 2: [Explanation]
- ...

## Derivation

[Would explain how the formula is derived or its mathematical basis]

## How to Apply the Formula

[Would provide a step-by-step guide to using the formula correctly]
1. [Step 1]
2. [Step 2]
3. [Step 3]
...

## Example Application

### Problem Statement
[Would present a problem requiring the use of this formula]

### Solution Using the Formula
[Would demonstrate how to apply the formula to solve the problem]

## Common Mistakes and Pitfalls

[Would highlight frequent errors when using this formula]
- [Mistake 1]
- [Mistake 2]
- [Mistake 3]

## Related Formulas

[Would identify other formulas that are related or complementary]
- [Related Formula 1]
- [Related Formula 2]
- [Related Formula 3]

## Applications in ${topicInfo.name}

[Would explain how this formula is used in various contexts within ${topicInfo.name}]

Would you like me to:
- Provide additional examples using this formula?
- Explain the derivation in more detail?
- Compare this formula with related ones?
- Show variations of this formula for different scenarios?`;
    }
    
    /**
     * Extract formula request from user input
     * @param {string} input - User input
     * @returns {string|null} Formula request or null
     */
    extractFormulaRequest(input) {
        const normalizedInput = input.toLowerCase();
        
        // Pattern: formula/equation for X
        const formulaPattern = /\b(?:formula|equation|expression|rule)\s+(?:for|of|to calculate|to find|to determine)\s+(?:the|a|an)?\s*(.+?)(?:\.|\?|$)/i;
        const formulaMatch = input.match(formulaPattern);
        if (formulaMatch && formulaMatch[1]) {
            return formulaMatch[1].trim();
        }
        
        // Pattern: what is the X formula/equation
        const whatIsPattern = /\b(?:what is|what's)\s+(?:the|a|an)?\s*(.+?)\s+(?:formula|equation|expression|rule)(?:\.|\?|$)/i;
        const whatIsMatch = input.match(whatIsPattern);
        if (whatIsMatch && whatIsMatch[1]) {
            return whatIsMatch[1].trim();
        }
        
        // Pattern: how to calculate/find X
        const calculatePattern = /\b(?:how to|how do I|how do you|how can I|how can you)\s+(?:calculate|compute|find|determine|solve for)\s+(?:the|a|an)?\s*(.+?)(?:\.|\?|$)/i;
        const calculateMatch = input.match(calculatePattern);
        if (calculateMatch && calculateMatch[1]) {
            return calculateMatch[1].trim();
        }
        
        return null;
    }
    
    /**
     * Provide general mathematical guidance based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Math topic if available
     * @returns {string} General guidance
     */
    provideGeneralMathGuidance(userInput, topic) {
        let title = "Mathematical Guidance";
        let contextDescription = "mathematics";
        
        if (topic && this.mathTopics[topic]) {
            title = `${this.mathTopics[topic].name} Guidance`;
            contextDescription = this.mathTopics[topic].name.toLowerCase();
        }
        
        return `# ${title}

In a complete implementation with an AI model and mathematical expertise, I would provide personalized guidance on ${contextDescription} based on your specific query and learning needs.

## How I Can Help With ${this.capitalizeFirstLetter(contextDescription)}

I can assist you in various ways:

### Learning Concepts
- Explaining fundamental principles and theories
- Clarifying definitions and terminology
- Connecting concepts to build comprehensive understanding
- Addressing common misconceptions

### Problem Solving
- Breaking down problems into manageable steps
- Demonstrating solution techniques
- Providing hints while preserving learning opportunities
- Verifying your solutions and identifying errors

### Skill Development
- Suggesting practice problems tailored to your level
- Recommending study strategies for different topics
- Guiding you through proof techniques
- Helping you develop mathematical intuition

### Applications and Context
- Explaining real-world applications
- Connecting topics across mathematical disciplines
- Providing historical context for mathematical ideas
- Discussing how concepts are used in various fields

## What Would You Like to Explore?

To provide more specific assistance, I can help with:
- Walking through specific problems step-by-step
- Explaining particular concepts or theories
- Generating practice exercises at your preferred difficulty level
- Suggesting approaches to challenging topics

What aspect of ${contextDescription} would you like to focus on today?`;
    }
    
    /**
     * Get math tutoring suggestions based on user interaction
     * @param {string} requestType - Type of math request
     * @param {string} topic - Math topic if available
     * @returns {Array<string>} Math tutoring suggestions
     */
    getMathSuggestions(requestType, topic) {
        const suggestions = [];
        
        // Add topic-specific suggestions if available
        if (topic && this.mathTopics[topic]) {
            const topicName = this.mathTopics[topic].name;
            
            // Add suggestions based on request type and topic
            if (requestType === "problem_solving") {
                suggestions.push(`Give me another ${topicName} problem to solve`);
                suggestions.push(`Explain a key concept in ${topicName}`);
                suggestions.push(`What are common mistakes in ${topicName} problems?`);
            } else if (requestType === "concept_explanation") {
                const subtopics = this.mathTopics[topic].subtopics;
                if (subtopics && subtopics.length > 0) {
                    const randomSubtopic = subtopics[Math.floor(Math.random() * subtopics.length)];
                    suggestions.push(`Explain ${randomSubtopic}`);
                }
                suggestions.push(`Give me an example problem in ${topicName}`);
                suggestions.push(`How is ${topicName} applied in the real world?`);
            } else if (requestType === "example_request") {
                suggestions.push(`Show me a more difficult example`);
                suggestions.push(`Give me a practice problem to try`);
                suggestions.push(`What are key formulas in ${topicName}?`);
            } else if (requestType === "practice_request") {
                suggestions.push(`Can you check my solution to a problem?`);
                suggestions.push(`What are effective study strategies for ${topicName}?`);
                suggestions.push(`Give me a more challenging problem`);
            }
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "Explain a mathematical concept I'm struggling with",
                "Help me solve a math problem",
                "What's the best way to approach word problems?",
                "How do I study effectively for a math exam?",
                "Show me an example of a challenging problem",
                "What formulas should I memorize?",
                "How is math used in the real world?",
                "Give me a practice quiz to test my understanding"
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
                'jaat-mode18-preferences',
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
            localStorage.removeItem('jaat-mode18-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Set difficulty level
     * @param {string} level - Difficulty level
     * @returns {boolean} Success status
     */
    setDifficultyLevel(level) {
        if (!level || !this.difficultyLevels[level]) return false;
        
        // Set difficulty level
        this.state.difficultyLevel = level;
        
        // Save updated difficulty level
        this.savePreferences({ difficultyLevel: level });
        return true;
    }
    
    /**
     * Set learning style
     * @param {string} style - Learning style
     * @returns {boolean} Success status
     */
    setLearningStyle(style) {
        if (!style || !this.learningStrategies[style]) return false;
        
        // Set learning style
        this.state.learningStyle = style;
        
        // Save updated learning style
        this.savePreferences({ learningStyle: style });
        return true;
    }
    
    /**
     * Set current topic
     * @param {string} topic - Math topic
     * @returns {boolean} Success status
     */
    setCurrentTopic(topic) {
        if (!topic || !this.mathTopics[topic]) return false;
        
        // Set current topic
        this.state.currentTopic = topic;
        
        // Add to math topics if not already present
        if (!this.state.mathTopics.includes(topic)) {
            this.state.mathTopics.push(topic);
        }
        
        // Save updated current topic and math topics
        this.savePreferences({ 
            currentTopic: topic,
            mathTopics: this.state.mathTopics
        });
        
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
            difficultyLevel: this.state.difficultyLevel,
            learningStyle: this.state.learningStyle,
            currentTopic: this.state.currentTopic,
            mathTopics: this.state.mathTopics,
            problemHistoryCount: this.state.problemHistory.length,
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
    window.jaatAIModes.mathTutor = new MathTutorMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathTutorMode;
}
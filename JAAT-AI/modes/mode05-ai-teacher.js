/**
 * JAAT-AI AI Teacher Mode
 * AI mode specialized in educational content and teaching various subjects
 * Mode ID: 05
 */

class AITeacherMode {
    constructor() {
        // Mode metadata
        this.id = "05";
        this.name = "AI Teacher";
        this.description = "Your personal AI tutor to learn any subject through interactive lessons";
        this.icon = "ri-book-read-line";
        this.color = "#f59e0b"; // Amber color
        this.category = "education";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 3000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 7, // 1-10 scale (higher = more personality)
            creativityLevel: 6, // 1-10 scale
            formalityLevel: 6, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            interactiveExercisesEnabled: true,
            adaptiveLearningEnabled: true,
            visualAidsEnabled: true,
            defaultSubject: "general"
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            currentSubject: "general",
            currentTopic: null,
            currentLesson: null,
            learningProgress: {},
            sessionStartTime: new Date(),
            responseCount: 0,
            quizResults: []
        };
        
        // Supported subjects
        this.supportedSubjects = [
            "math", "science", "physics", "chemistry", "biology", 
            "history", "geography", "literature", "languages", 
            "computer science", "economics", "philosophy", "art",
            "music", "psychology"
        ];
        
        // Learning levels
        this.learningLevels = {
            "beginner": "Fundamental concepts and introductory material",
            "intermediate": "More detailed content for those with some background knowledge",
            "advanced": "Complex topics for experienced learners",
            "expert": "Specialized, in-depth knowledge for mastery"
        };
        
        // Teaching strategies
        this.teachingStrategies = {
            "explanation": "Clear explanations of concepts with examples",
            "socratic": "Asking questions to guide self-discovery",
            "problem-based": "Learning through solving practical problems",
            "storytelling": "Using narratives to illustrate concepts",
            "visual": "Using diagrams, charts, and other visual aids",
            "interactive": "Engaging exercises and activities"
        };
        
        // Lesson formats
        this.lessonFormats = {
            "introduction": {
                structure: ["concept overview", "why it matters", "key points", "simple example", "follow-up questions"],
                style: "conversational and encouraging"
            },
            "detailed": {
                structure: ["concept review", "detailed explanation", "multiple examples", "common misconceptions", "practice exercises"],
                style: "educational and thorough"
            },
            "problem-solving": {
                structure: ["problem statement", "approach guidance", "step-by-step solution", "explanation", "similar problems"],
                style: "analytical and methodical"
            },
            "quiz": {
                structure: ["concept review", "multiple-choice questions", "explanations for answers", "score report", "areas for improvement"],
                style: "interactive and evaluative"
            }
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Explain quantum physics in simple terms",
            "Help me understand calculus derivatives",
            "Teach me about the French Revolution",
            "I want to learn about photosynthesis",
            "Explain machine learning concepts",
            "Can you teach me the basics of Spanish?",
            "What's the difference between metaphors and similes?",
            "Help me understand how the stock market works",
            "Give me a quiz on world capitals",
            "Explain the theory of relativity"
        ];
        
        // Special features
        this.features = {
            interactiveLessons: true,
            adaptiveLearning: true,
            quizGeneration: true,
            progressTracking: true,
            visualAids: true,
            conceptMapping: true,
            flashcards: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 50,
            MAX_LESSONS_PER_SESSION: 5,
            QUIZ_QUESTION_COUNT: 5,
            GREETING_PHRASES: [
                "Hello, student! What would you like to learn today?",
                "Welcome to your learning session! What subject shall we explore?",
                "I'm your AI Teacher, ready to help you learn anything. What are you curious about?",
                "Ready for some learning? What topic would you like to understand better?",
                "Education is the key to growth! What would you like me to teach you today?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing AI Teacher mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set default subject if provided
        if (options.subject && this.supportedSubjects.includes(options.subject.toLowerCase())) {
            this.state.currentSubject = options.subject.toLowerCase();
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode05-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for AI Teacher mode");
                
                // Apply subject preference if saved
                if (this.state.userPreferences.preferredSubject) {
                    this.state.currentSubject = this.state.userPreferences.preferredSubject;
                }
                
                // Load learning progress
                if (this.state.userPreferences.learningProgress) {
                    this.state.learningProgress = this.state.userPreferences.learningProgress;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode05-history');
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
                
                // Load quiz results
                const savedQuizResults = localStorage.getItem('jaat-mode05-quiz-results');
                if (savedQuizResults) {
                    this.state.quizResults = JSON.parse(savedQuizResults);
                    console.log(`Loaded ${this.state.quizResults.length} quiz results`);
                }
            } catch (error) {
                console.error("Error loading conversation history:", error);
                this.state.conversationHistory = [];
                this.state.quizResults = [];
            }
        }
        
        // Record initialization time
        this.state.sessionStartTime = new Date();
        
        console.log(`AI Teacher mode initialized with subject: ${this.state.currentSubject}`);
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
     * Process user input and generate an educational response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with educational content
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm here to help you learn! What subject or topic would you like me to teach you about?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing education request`);
        
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
        
        // Detect type of educational request
        const requestType = this.detectRequestType(userInput);
        
        // Detect subject and topic
        const { subject, topic } = this.detectSubjectAndTopic(userInput);
        
        // Update current subject and topic if detected
        if (subject) {
            this.state.currentSubject = subject;
        }
        if (topic) {
            this.state.currentTopic = topic;
        }
        
        // Generate appropriate educational response
        const response = await this.generateEducationalResponse(
            userInput, 
            requestType, 
            this.state.currentSubject,
            this.state.currentTopic,
            context
        );
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date(),
                requestType: requestType,
                subject: this.state.currentSubject,
                topic: this.state.currentTopic
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode05-history',
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
     * Detect the type of educational request
     * @param {string} input - User input
     * @returns {string} Request type (explanation, question, problem, quiz, etc.)
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for quiz request
        if (/quiz|test|exam|assess/i.test(normalizedInput)) {
            return "quiz";
        }
        
        // Check for explanation request
        if (/explain|what is|what are|how does|tell me about|describe/i.test(normalizedInput)) {
            return "explanation";
        }
        
        // Check for problem-solving request
        if (/problem|solve|calculate|find|compute/i.test(normalizedInput)) {
            return "problem-solving";
        }
        
        // Check for comparison request
        if (/compare|difference between|versus|vs\.|what's better/i.test(normalizedInput)) {
            return "comparison";
        }
        
        // Check for step-by-step instruction request
        if (/how to|steps to|guide to|tutorial|walkthrough/i.test(normalizedInput)) {
            return "how-to";
        }
        
        // Check for definition request
        if (/define|definition of|meaning of/i.test(normalizedInput)) {
            return "definition";
        }
        
        // Check for example request
        if (/example|instance|sample|illustration/i.test(normalizedInput)) {
            return "examples";
        }
        
        // Default to explanation for general learning requests
        return "explanation";
    }
    
    /**
     * Detect subject and topic from user input
     * @param {string} input - User input
     * @returns {Object} Detected subject and topic
     */
    detectSubjectAndTopic(input) {
        const normalizedInput = input.toLowerCase();
        
        // Subject keywords
        const subjectKeywords = {
            "math": ["math", "mathematics", "algebra", "calculus", "geometry", "trigonometry", "statistics"],
            "science": ["science", "scientific", "experiment"],
            "physics": ["physics", "motion", "force", "energy", "quantum", "relativity", "mechanics"],
            "chemistry": ["chemistry", "chemical", "molecule", "atom", "element", "compound", "reaction"],
            "biology": ["biology", "cell", "organism", "genetics", "evolution", "ecosystem", "anatomy"],
            "history": ["history", "historical", "century", "ancient", "medieval", "revolution", "war", "civilization"],
            "geography": ["geography", "map", "continent", "country", "climate", "terrain", "landform"],
            "literature": ["literature", "book", "novel", "poem", "author", "writing", "literary"],
            "languages": ["language", "grammar", "vocabulary", "translation", "spanish", "french", "english", "german", "mandarin"],
            "computer science": ["computer", "programming", "code", "algorithm", "data structure", "software", "hardware"],
            "economics": ["economics", "market", "supply", "demand", "inflation", "gdp", "finance", "economy"],
            "philosophy": ["philosophy", "ethics", "metaphysics", "existentialism", "logic", "epistemology"],
            "psychology": ["psychology", "mental", "cognitive", "behavior", "emotion", "perception", "memory"],
            "art": ["art", "painting", "sculpture", "drawing", "artist", "aesthetic", "design"],
            "music": ["music", "song", "instrument", "melody", "rhythm", "note", "composer", "musician"]
        };
        
        // Try to detect subject
        let detectedSubject = null;
        let highestSubjectScore = 0;
        
        for (const [subject, keywords] of Object.entries(subjectKeywords)) {
            let score = 0;
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    score++;
                }
            }
            
            if (score > highestSubjectScore) {
                highestSubjectScore = score;
                detectedSubject = subject;
            }
        }
        
        // Try to extract topic (simplified approach)
        let detectedTopic = null;
        
        // Look for topic patterns in user input
        const topicPatterns = [
            /(?:about|on|understand|learn|teach me) ([\w\s\-]+)(?:\?|\.|\!|$)/i,
            /what (?:is|are) ([\w\s\-]+)(?:\?|\.|\!|$)/i,
            /how (?:to|do|does) ([\w\s\-]+)(?:\?|\.|\!|$)/i,
            /explain (?:to me)? ([\w\s\-]+)(?:\?|\.|\!|$)/i
        ];
        
        for (const pattern of topicPatterns) {
            const match = normalizedInput.match(pattern);
            if (match && match[1]) {
                detectedTopic = match[1].trim();
                break;
            }
        }
        
        return {
            subject: detectedSubject,
            topic: detectedTopic
        };
    }
    
    /**
     * Generate an educational response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of educational request
     * @param {string} subject - Subject area
     * @param {string} topic - Specific topic
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateEducationalResponse(userInput, requestType, subject, topic, context = {}) {
        // In a real implementation, this would call an AI model API specialized in education
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Set default subject and topic if not detected
        subject = subject || "general";
        topic = topic || this.extractDefaultTopic(userInput) || "general knowledge";
        
        // Track this topic in learning progress
        this.trackLearningProgress(subject, topic);
        
        // Generate response based on request type
        switch (requestType) {
            case "explanation":
                responseText = this.generateExplanation(subject, topic);
                break;
                
            case "definition":
                responseText = this.generateDefinition(subject, topic);
                break;
                
            case "comparison":
                responseText = this.generateComparison(subject, topic);
                break;
                
            case "examples":
                responseText = this.generateExamples(subject, topic);
                break;
                
            case "how-to":
                responseText = this.generateHowTo(subject, topic);
                break;
                
            case "problem-solving":
                responseText = this.generateProblemSolution(subject, topic, userInput);
                break;
                
            case "quiz":
                responseText = this.generateQuiz(subject, topic);
                break;
                
            default:
                responseText = this.generateExplanation(subject, topic);
        }
        
        // Get related topics as suggestions
        const relatedTopics = this.getRelatedTopics(subject, topic);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            subject: subject,
            topic: topic,
            requestType: requestType,
            suggestions: relatedTopics
        };
    }
    
    /**
     * Generate an explanation of a topic
     * @param {string} subject - Subject area
     * @param {string} topic - Specific topic
     * @returns {string} Educational explanation
     */
    generateExplanation(subject, topic) {
        // This is a simplified demonstration - a real implementation would 
        // use an AI model to generate a tailored educational explanation
        
        // Sample explanations for common topics
        const explanations = {
            "photosynthesis": `# Photosynthesis: How Plants Make Their Food

Photosynthesis is the process by which plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose (sugar).

## The Basic Process

The overall chemical equation for photosynthesis is:
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ (glucose) + 6O₂

In simpler terms:
Carbon Dioxide + Water + Sunlight → Glucose + Oxygen

## Key Components

1. **Chloroplasts**: Special organelles in plant cells where photosynthesis takes place
2. **Chlorophyll**: The green pigment that captures light energy 
3. **Stomata**: Small pores on leaves that allow CO₂ to enter and O₂ to exit

## The Two Stages of Photosynthesis

### 1. Light-Dependent Reactions
- Occur in the thylakoid membranes of the chloroplast
- Capture energy from sunlight
- Convert it to chemical energy (ATP and NADPH)
- Produce oxygen as a byproduct

### 2. Calvin Cycle (Light-Independent Reactions)
- Occurs in the stroma of the chloroplast
- Uses ATP and NADPH from the light-dependent reactions
- Converts CO₂ into glucose
- Doesn't directly require light

## Importance of Photosynthesis

- Produces food for plants and, indirectly, for animals
- Releases oxygen into the atmosphere
- Removes carbon dioxide from the atmosphere
- Forms the basis of most food chains on Earth

Would you like to learn more about a specific aspect of photosynthesis?`,

            "french revolution": `# The French Revolution: A Transformation of Society

The French Revolution was a period of radical social and political upheaval in France from 1789 to 1799 that profoundly affected French and modern history, marking the decline of powerful monarchies and the rise of democracy and nationalism.

## Key Causes

1. **Social Inequality**: French society was divided into three estates:
   - First Estate: Clergy (about 1% of population)
   - Second Estate: Nobility (about 2% of population)
   - Third Estate: Everyone else (97% of population, including peasants, bourgeoisie, and urban workers)

2. **Economic Crisis**: France faced severe financial problems due to:
   - Costly involvement in the American Revolution
   - Years of poor harvests
   - Inefficient tax system
   - Lavish spending by the monarchy

3. **Enlightenment Ideas**: Philosophers like Rousseau, Voltaire, and Montesquieu promoted ideas about:
   - Natural rights
   - Separation of powers
   - Popular sovereignty

## Major Events

1. **1789**: 
   - Estates-General convened (May 5)
   - Tennis Court Oath (June 20)
   - Storming of the Bastille (July 14)
   - Declaration of the Rights of Man and of the Citizen (August 26)

2. **1792-1793**:
   - Monarchy abolished and Republic declared
   - King Louis XVI executed (January 1793)
   - Reign of Terror begins under Robespierre

3. **1794-1799**:
   - Thermidorian Reaction and fall of Robespierre
   - Directory established
   - Rise of Napoleon Bonaparte
   - Napoleon's coup d'état (1799) ending the Revolution

## Legacy and Significance

- Ended feudalism and the absolute monarchy in France
- Established principles of liberty, equality, and fraternity
- Spread revolutionary ideas throughout Europe
- Created a new political culture based on citizens' rights
- Influenced future revolutions and democratic movements worldwide

Would you like to explore a specific aspect of the French Revolution in more detail?`,

            "calculus derivatives": `# Understanding Calculus Derivatives

A derivative in calculus measures the rate at which a quantity changes. It's one of the fundamental concepts in calculus, along with integrals.

## Basic Concept

The derivative of a function f(x) is written as f'(x) or df/dx and represents the slope of the tangent line to the function at any given point.

## Definition

Formally, the derivative is defined as the limit:

f'(x) = lim(h→0) [f(x+h) - f(x)]/h

This represents the instantaneous rate of change of the function at the point x.

## Basic Rules of Differentiation

1. **Constant Rule**: If f(x) = c (a constant), then f'(x) = 0
   - Example: If f(x) = 5, then f'(x) = 0

2. **Power Rule**: If f(x) = x^n, then f'(x) = n·x^(n-1)
   - Example: If f(x) = x^3, then f'(x) = 3x^2

3. **Sum Rule**: If f(x) = g(x) + h(x), then f'(x) = g'(x) + h'(x)
   - Example: If f(x) = x^2 + x^3, then f'(x) = 2x + 3x^2

4. **Product Rule**: If f(x) = g(x)·h(x), then f'(x) = g'(x)·h(x) + g(x)·h'(x)
   - Example: If f(x) = x^2·sin(x), then f'(x) = 2x·sin(x) + x^2·cos(x)

5. **Quotient Rule**: If f(x) = g(x)/h(x), then f'(x) = [g'(x)·h(x) - g(x)·h'(x)]/[h(x)]^2
   - Example: If f(x) = sin(x)/x, you would apply this rule

6. **Chain Rule**: If f(x) = g(h(x)), then f'(x) = g'(h(x))·h'(x)
   - Example: If f(x) = sin(x^2), then f'(x) = cos(x^2)·2x

## Applications of Derivatives

1. **Finding Slopes**: Determine the slope of a curve at a specific point
2. **Rate of Change**: Calculate how quickly quantities change with respect to each other
3. **Optimization**: Find maximum and minimum values of functions
4. **Motion Analysis**: Determine velocity and acceleration from position functions
5. **Approximation**: Approximate function values using linear approximation

## Example

Let's find the derivative of f(x) = x^3 + 2x^2 - 5x + 3

Using the sum rule and power rule:
f'(x) = 3x^2 + 4x - 5

Would you like to practice with some derivative problems or learn about a specific application of derivatives?`
        };
        
        // Check if we have a pre-written explanation
        for (const [key, explanation] of Object.entries(explanations)) {
            if (topic.toLowerCase().includes(key)) {
                return explanation;
            }
        }
        
        // For unknown topics, provide a generic response
        return `# ${this.capitalizeFirstLetter(topic)}

In a complete implementation with an AI model, I would provide a comprehensive, educational explanation about ${topic} within the context of ${subject}.

The explanation would include:

## Key Concepts
- Fundamental principles and theories
- Historical context and development
- Main components or elements

## Details and Examples
- Detailed breakdowns of important aspects
- Real-world examples and applications
- Visual representations where appropriate

## Connections and Context
- How this topic relates to other areas in ${subject}
- Why this topic is important to understand
- Common misconceptions and clarifications

## Practice and Application
- Ways to apply this knowledge
- Questions to test understanding
- Further learning resources

Would you like to focus on a particular aspect of ${topic}, or would you prefer to explore a related topic in ${subject}?`;
    }
    
    /**
     * Generate a definition for a term
     * @param {string} subject - Subject area
     * @param {string} topic - Term to define
     * @returns {string} Educational definition
     */
    generateDefinition(subject, topic) {
        // Sample definitions for common terms
        const definitions = {
            "photosynthesis": "Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose or other sugars. The process involves capturing light energy to convert carbon dioxide and water into glucose and oxygen. This biological process is essential for maintaining atmospheric oxygen levels and serving as the primary energy source for nearly all ecosystems.",
            
            "derivative": "In calculus, a derivative is a mathematical function that measures the sensitivity to change of one quantity (the function value) with respect to another quantity (the input variable). It represents the rate at which the value of the function changes with respect to the change of the input variable. Geometrically, the derivative at a point equals the slope of the tangent line to the graph of the function at that point.",
            
            "democracy": "Democracy is a system of government where power ultimately comes from the citizens who are eligible to vote. The term comes from the Greek words 'demos' (people) and 'kratos' (rule or power), literally meaning 'rule by the people.' In a democratic system, citizens exercise their power either directly (direct democracy) or through elected representatives (representative democracy). Key principles include free and fair elections, protection of human rights, and the rule of law."
        };
        
        // Check if we have a pre-written definition
        for (const [key, definition] of Object.entries(definitions)) {
            if (topic.toLowerCase().includes(key)) {
                return `# Definition: ${this.capitalizeFirstLetter(key)}\n\n${definition}\n\nWould you like to learn more about ${key}?`;
            }
        }
        
        // For unknown terms, provide a generic response
        return `# Definition: ${this.capitalizeFirstLetter(topic)}\n\nIn a complete implementation with an AI model, I would provide a clear, precise definition of "${topic}" in the context of ${subject}, including etymology, key characteristics, and examples.\n\nWould you like to explore ${topic} in more depth, or would you prefer a definition of a related term?`;
    }
    
    /**
     * Generate a comparison between concepts
     * @param {string} subject - Subject area
     * @param {string} topic - Topic containing comparison request
     * @returns {string} Educational comparison
     */
    generateComparison(subject, topic) {
        // Extract comparison terms (simplified)
        const comparisonMatch = topic.match(/(?:compare|difference between|versus|vs\.)\s+([\w\s]+)\s+(?:and|to|with|vs\.?|versus)\s+([\w\s]+)/i);
        
        let term1 = "";
        let term2 = "";
        
        if (comparisonMatch && comparisonMatch.length >= 3) {
            term1 = comparisonMatch[1].trim();
            term2 = comparisonMatch[2].trim();
        } else {
            // If no clear comparison found, use generic terms
            term1 = "first concept";
            term2 = "second concept";
        }
        
        // Sample comparisons for common pairs
        const comparisons = {
            "mitosis_meiosis": `# Comparison: Mitosis vs. Meiosis

| Feature | Mitosis | Meiosis |
|---------|---------|---------|
| **Purpose** | Cell growth and repair; asexual reproduction | Production of gametes for sexual reproduction |
| **Number of Divisions** | 1 | 2 (Meiosis I and Meiosis II) |
| **Number of Daughter Cells** | 2 | 4 |
| **Chromosome Number in Daughter Cells** | Diploid (2n) - identical to parent cell | Haploid (n) - half the number of parent cell |
| **Genetic Variation** | None - daughter cells genetically identical to parent | High - due to crossing over and independent assortment |
| **Occurs in** | All somatic (body) cells | Only in sex cells (gametes) in gonads |
| **Steps** | Prophase, Metaphase, Anaphase, Telophase | Prophase I & II, Metaphase I & II, Anaphase I & II, Telophase I & II |
| **Recombination** | No crossing over | Crossing over occurs in Prophase I |
| **Pairing of Homologous Chromosomes** | No pairing | Homologous pairs form tetrads in Prophase I |

## Key Differences

1. **Function**: Mitosis produces cells for growth and repair, while meiosis produces gametes for reproduction.

2. **Genetic Variation**: Mitosis maintains genetic consistency, while meiosis creates genetic diversity through:
   - Crossing over (exchange of genetic material)
   - Independent assortment of chromosomes
   - Random fertilization

3. **Cell Division**: Mitosis involves one division, whereas meiosis involves two sequential divisions.

4. **Chromosome Number**: Mitosis maintains the chromosome number, while meiosis reduces it by half.

Would you like to explore a specific aspect of cell division in more detail?`,

            "simile_metaphor": `# Comparison: Similes vs. Metaphors

Both similes and metaphors are figures of speech used to make comparisons between unlike things, but they work in different ways.

## Similes

A simile makes a comparison using "like" or "as."

**Structure**: X is like Y, X is as Y as Z

**Examples**:
- "She runs like the wind."
- "He is as strong as an ox."
- "The explanation was as clear as mud."
- "Life is like a box of chocolates." (Forrest Gump)

**Effect**: Creates an explicit, direct comparison that highlights similarities while maintaining separation between the things being compared.

## Metaphors

A metaphor states that one thing is another thing, creating a direct identification rather than a comparison.

**Structure**: X is Y (without using "like" or "as")

**Examples**:
- "Time is money."
- "Her eyes were pools of sorrow."
- "All the world's a stage." (Shakespeare)
- "He's the black sheep of the family."

**Effect**: Creates a stronger, more immediate identification that can have greater emotional impact by completely transferring qualities from one thing to another.

## Key Differences

1. **Directness**: Metaphors create a direct equivalence, while similes create similarity.

2. **Signal Words**: Similes use "like" or "as," while metaphors don't.

3. **Intensity**: Metaphors often create a stronger, more vivid image by stating a direct equation.

4. **Cognitive Effect**: Metaphors require the reader/listener to make the conceptual leap themselves, while similes provide more guidance.

## Related Concepts

- **Extended metaphor**: A metaphor developed over several lines or an entire work
- **Mixed metaphor**: Combining incompatible metaphors (often considered a stylistic error)
- **Dead metaphor**: A metaphor that has become so common it's no longer recognized as figurative (e.g., "leg of a table")

Would you like to see more examples of each, or explore other figures of speech?`,

            "renewable_nonrenewable": `# Comparison: Renewable vs. Non-renewable Energy

| Feature | Renewable Energy | Non-renewable Energy |
|---------|-----------------|----------------------|
| **Source** | Natural processes that are constantly replenished | Finite resources that cannot be replenished on a human timescale |
| **Examples** | Solar, wind, hydro, geothermal, biomass | Fossil fuels (coal, oil, natural gas), nuclear fuel (uranium) |
| **Environmental Impact** | Generally low; minimal pollution and greenhouse gas emissions | Often high; significant pollution and greenhouse gas emissions (except nuclear) |
| **Availability** | Unlimited over time but may be intermittent | Limited supply that will eventually be depleted |
| **Cost Trend** | Initially higher but decreasing over time | Initially lower but increasing as resources become scarcer |
| **Infrastructure** | Newer, still developing in many regions | Well-established globally |
| **Energy Density** | Generally lower; requires more space | Generally higher; more energy from smaller amount of resource |
| **Location Dependency** | Often location-specific (e.g., sunny regions for solar) | Can be transported and used anywhere |

## Key Differences

1. **Sustainability**: Renewable energy sources are sustainable indefinitely, while non-renewable sources will eventually run out.

2. **Environmental Impact**: Renewable energy typically produces fewer greenhouse gases and pollutants during operation, though manufacturing and installation can have environmental costs.

3. **Reliability**: Many renewable sources (like solar and wind) are intermittent, while non-renewable sources can provide consistent power on demand.

4. **Economics**: Non-renewable energy has historically been cheaper, but renewable energy costs have been declining rapidly, making them increasingly competitive.

## Current Trends

- Increasing investment in renewable energy technology
- Development of better energy storage systems to address intermittency
- Policy shifts toward carbon reduction favoring renewable sources
- Growing concern about climate change impacts of fossil fuels

Would you like to explore a specific type of energy source in more detail?`
        };
        
        // Check if we have a pre-written comparison
        if (term1 && term2) {
            const comparisonKey1 = `${term1}_${term2}`;
            const comparisonKey2 = `${term2}_${term1}`;
            
            if (comparisons[comparisonKey1]) {
                return comparisons[comparisonKey1];
            } else if (comparisons[comparisonKey2]) {
                return comparisons[comparisonKey2];
            }
        }
        
        // For unknown comparison pairs, provide a generic response
        return `# Comparison: ${this.capitalizeFirstLetter(term1)} vs. ${this.capitalizeFirstLetter(term2)}

In a complete implementation with an AI model, I would provide a detailed educational comparison between ${term1} and ${term2} in the context of ${subject}.

The comparison would include:

## Definitions
- Clear definition of ${term1}
- Clear definition of ${term2}

## Key Similarities
- Areas where these concepts overlap or share characteristics
- Common applications or contexts

## Key Differences
- Fundamental distinctions between the concepts
- Different applications or uses
- Varying historical or theoretical contexts

## Comparison Table
- Side-by-side comparison of important attributes
- Visual representation of differences

## Examples
- Real-world examples of each concept
- Situations where the distinction matters

Would you like to know more about a specific aspect of either ${term1} or ${term2}?`;
    }
    
    /**
     * Generate examples for a topic
     * @param {string} subject - Subject area
     * @param {string} topic - Topic to provide examples for
     * @returns {string} Educational examples
     */
    generateExamples(subject, topic) {
        // For unknown topics, provide a generic response
        return `# Examples of ${this.capitalizeFirstLetter(topic)} in ${this.capitalizeFirstLetter(subject)}

In a complete implementation with an AI model, I would provide a variety of clear, educational examples of ${topic} in the field of ${subject}.

The examples would include:

## Basic Examples
- Simple, foundational examples that illustrate the core concept
- Step-by-step explanations of each example

## Advanced Examples
- More complex examples showing nuanced applications
- Analysis of each example's significance

## Real-World Applications
- Examples from everyday life or professional contexts
- How these examples demonstrate practical relevance

## Historical Examples
- Important historical instances or discoveries
- How these examples shaped our understanding

Would you like to focus on a particular type of example, or explore ${topic} in more depth?`;
    }
    
    /**
     * Generate a how-to guide
     * @param {string} subject - Subject area
     * @param {string} topic - Topic containing how-to request
     * @returns {string} Educational how-to
     */
    generateHowTo(subject, topic) {
        // Extract the how-to task (simplified)
        const howToMatch = topic.match(/how\s+(?:to|do\s+i|can\s+i)\s+([^?\.]+)/i);
        
        let task = "";
        if (howToMatch && howToMatch.length >= 2) {
            task = howToMatch[1].trim();
        } else {
            task = topic;
        }
        
        // Sample how-to guides for common tasks
        const howToGuides = {
            "solve quadratic equations": `# How to Solve Quadratic Equations

A quadratic equation is an equation of the form ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0.

## Method 1: Factoring

When the quadratic expression can be factored easily:

1. Write the equation in standard form: ax² + bx + c = 0
2. Factor the expression: (px + q)(rx + s) = 0
3. Set each factor equal to zero: px + q = 0 and rx + s = 0
4. Solve each equation for x

**Example:**
Solve x² + 5x + 6 = 0

1. Factor: (x + 2)(x + 3) = 0
2. Set each factor to zero:
   - x + 2 = 0, so x = -2
   - x + 3 = 0, so x = -3
3. Solutions: x = -2 or x = -3

## Method 2: Quadratic Formula

Works for all quadratic equations:

x = (-b ± √(b² - 4ac)) / 2a

Where:
- a, b, and c are the coefficients in ax² + bx + c = 0
- The ± symbol means we calculate two solutions: one with + and one with -

**Example:**
Solve 2x² - 4x - 3 = 0

1. Identify coefficients: a = 2, b = -4, c = -3
2. Substitute into the formula:
   x = (-(-4) ± √((-4)² - 4(2)(-3))) / 2(2)
   x = (4 ± √(16 + 24)) / 4
   x = (4 ± √40) / 4
   x = (4 ± 2√10) / 4
   x = 1 ± √10/2
3. Solutions: x = 1 + √10/2 ≈ 2.58 or x = 1 - √10/2 ≈ -0.58

## Method 3: Completing the Square

Useful for deriving the quadratic formula and for some geometric problems:

1. Make sure a = 1 (divide everything by a if necessary)
2. Move the constant term to the right side
3. Take half the coefficient of x, square it, and add it to both sides
4. Rewrite the left side as a perfect square trinomial
5. Take the square root of both sides
6. Solve for x

**Example:**
Solve x² + 6x + 8 = 0

1. Rearrange: x² + 6x = -8
2. Half the coefficient of x: 6/2 = 3
3. Square it: 3² = 9
4. Add to both sides: x² + 6x + 9 = -8 + 9
5. Rewrite as perfect square: (x + 3)² = 1
6. Take square root: x + 3 = ±1
7. Solve for x: x = -3 ± 1
8. Solutions: x = -2 or x = -4

## Special Cases

- If b² - 4ac > 0: Two distinct real solutions
- If b² - 4ac = 0: One repeated real solution (x = -b/2a)
- If b² - 4ac < 0: Two complex solutions (not real)

Would you like to try solving a specific quadratic equation?`,

            "write a essay": `# How to Write an Effective Essay

## 1. Understand the Assignment
- Read the prompt carefully
- Identify key requirements (word count, format, sources)
- Note the deadline and plan accordingly

## 2. Research and Gather Information
- Find credible sources (books, scholarly articles, reputable websites)
- Take organized notes
- Record citation information for each source
- Look for different perspectives on your topic

## 3. Create a Strong Thesis Statement
- Develop a specific, arguable main point
- Make sure it addresses the prompt
- A good thesis statement is clear, concise, and takes a position
- Example: "While social media has enhanced connectivity, it has ultimately damaged interpersonal communication skills among teenagers."

## 4. Outline Your Essay
- Introduction
  - Hook to grab attention
  - Background context
  - Thesis statement
- Body paragraphs (for each main point)
  - Topic sentence
  - Evidence/examples
  - Analysis
  - Transition to next point
- Conclusion
  - Restate thesis (in different words)
  - Summarize key points
  - Provide closing thoughts or call to action

## 5. Write a Strong Introduction
- Start with an attention-grabbing hook (question, quote, statistic, anecdote)
- Provide necessary background information
- End with your thesis statement

## 6. Develop Body Paragraphs
- Start each paragraph with a clear topic sentence
- Include specific evidence and examples
- Explain how the evidence supports your thesis
- Use transitions between paragraphs for smooth flow

## 7. Write a Compelling Conclusion
- Restate your thesis in fresh words
- Summarize your main points
- End with a thought-provoking statement or call to action
- Don't introduce new arguments in the conclusion

## 8. Revise and Edit
- Check overall structure and flow
- Strengthen weak arguments
- Ensure logical organization
- Remove redundancies
- Verify all evidence supports your thesis

## 9. Proofread
- Check spelling and grammar
- Review punctuation
- Ensure proper citation format
- Read aloud to catch awkward phrasing

## 10. Final Tips for Success
- Give yourself time for multiple drafts
- Get feedback from others
- Use active voice rather than passive
- Be specific rather than general
- Use varied sentence structures
- Focus on clarity over complexity

Would you like me to elaborate on any particular section of the essay-writing process?`
        };
        
        // Check if we have a pre-written how-to guide
        for (const [key, guide] of Object.entries(howToGuides)) {
            if (task.toLowerCase().includes(key)) {
                return guide;
            }
        }
        
        // For unknown tasks, provide a generic response
        return `# How to ${this.capitalizeFirstLetter(task)}

In a complete implementation with an AI model, I would provide a clear, step-by-step educational guide on how to ${task} in the context of ${subject}.

The guide would include:

## Preparation
- What you need to know before starting
- Materials or prerequisites needed
- Common challenges and how to overcome them

## Step-by-Step Process
1. First step with detailed explanation
2. Second step with important details
3. Additional steps with clear guidance
4. Final steps and completion criteria

## Tips for Success
- Best practices to follow
- Common mistakes to avoid
- Troubleshooting advice

## Examples
- Clear examples of successful execution
- Before and after comparisons where applicable
- Visual aids when helpful

Would you like to focus on a specific aspect of learning how to ${task}?`;
    }
    
    /**
     * Generate a problem solution
     * @param {string} subject - Subject area
     * @param {string} topic - Topic containing problem
     * @param {string} userInput - Original user input
     * @returns {string} Educational problem solution
     */
    generateProblemSolution(subject, topic, userInput) {
        // Sample problem solutions for math problems
        if (subject === 'math') {
            // Look for specific math problem patterns
            const algebraPattern = /solve\s+(?:for\s+\w+\s*[:=]?\s*)?([^?\.]+)/i;
            const derivativePattern = /(?:find|calculate)\s+(?:the)?\s*derivative\s+(?:of)?\s*([^?\.]+)/i;
            const integralPattern = /(?:find|calculate)\s+(?:the)?\s*integral\s+(?:of)?\s*([^?\.]+)/i;
            
            let problemMatch;
            let problemType = "";
            
            if (problemMatch = userInput.match(algebraPattern)) {
                problemType = "algebra";
            } else if (problemMatch = userInput.match(derivativePattern)) {
                problemType = "derivative";
            } else if (problemMatch = userInput.match(integralPattern)) {
                problemType = "integral";
            }
            
            if (problemType && problemMatch && problemMatch.length >= 2) {
                const problem = problemMatch[1].trim();
                
                return `# Solution: ${problem}

In a complete implementation with an AI model, I would provide a step-by-step solution to this ${problemType} problem, including:

1. Problem analysis and approach
2. Each mathematical step clearly explained
3. The final answer with verification
4. Related concepts and practice problems

For example, with this specific problem, I would:
- Break down the steps needed
- Show all mathematical work
- Explain the reasoning behind each step
- Provide the final solution in the appropriate format

Would you like to see a simpler example of this type of problem, or would you like to try another problem?`;
            }
        }
        
        // For unknown problems, provide a generic response
        return `# Problem Solution

In a complete implementation with an AI model, I would analyze this problem in ${subject} and provide a comprehensive, educational solution.

The solution would include:

## Problem Analysis
- Clarification of the problem statement
- Identification of key components
- Connection to relevant theories or principles

## Step-by-Step Solution
1. First step with explanation
2. Second step with reasoning
3. Subsequent steps with clear guidance
4. Final answer with verification

## Explanation of Concepts
- Key concepts involved in this problem
- Why these approaches work
- Common misconceptions addressed

## Further Practice
- Similar problems to try
- Variations to deepen understanding
- Applications in real-world contexts

Would you like to try a different problem or explore a related concept?`;
    }
    
    /**
     * Generate a quiz on a topic
     * @param {string} subject - Subject area
     * @param {string} topic - Topic for quiz
     * @returns {string} Educational quiz
     */
    generateQuiz(subject, topic) {
        // Sample quizzes for common topics
        const quizzes = {
            "world capitals": `# Quiz: World Capitals

Test your knowledge of world capitals with these questions!

## Questions

1. What is the capital of France?
   a) London
   b) Berlin
   c) Paris
   d) Madrid

2. Which city serves as the capital of Australia?
   a) Sydney
   b) Melbourne
   c) Perth
   d) Canberra

3. What is the capital of Japan?
   a) Tokyo
   b) Kyoto
   c) Osaka
   d) Hiroshima

4. Which of these is the capital of Brazil?
   a) Rio de Janeiro
   b) São Paulo
   c) Brasília
   d) Salvador

5. What is the capital of Canada?
   a) Toronto
   b) Montreal
   c) Vancouver
   d) Ottawa

## Answers

1. c) Paris
2. d) Canberra
3. a) Tokyo
4. c) Brasília
5. d) Ottawa

## How did you do?

- 5/5: Excellent! You have great knowledge of world capitals!
- 4/5: Very good! Just one more to perfect your knowledge.
- 3/5: Good job! You know many capitals, but there's room to learn more.
- 1-2/5: Keep studying! Geography is fascinating and worth learning.

Would you like to try another quiz on a different topic or learn more about any of these countries?`,

            "periodic table": `# Quiz: The Periodic Table of Elements

Test your knowledge of chemical elements and their properties!

## Questions

1. Which element has the chemical symbol 'Na'?
   a) Nitrogen
   b) Sodium
   c) Neon
   d) Nickel

2. Which of these is a noble gas?
   a) Oxygen
   b) Chlorine
   c) Argon
   d) Phosphorus

3. How many elements are in the first period (row) of the periodic table?
   a) 1
   b) 2
   c) 8
   d) 18

4. Which element is essential for human bones and teeth?
   a) Calcium
   b) Potassium
   c) Iron
   d) Zinc

5. What is the most abundant element in Earth's crust?
   a) Iron
   b) Silicon
   c) Aluminum
   d) Oxygen

## Answers

1. b) Sodium
2. c) Argon
3. b) 2 (hydrogen and helium)
4. a) Calcium
5. d) Oxygen

## How did you do?

- 5/5: Excellent! You're a chemistry whiz!
- 4/5: Very good! Just one more to perfect your knowledge.
- 3/5: Good job! You know your elements, but there's room to learn more.
- 1-2/5: Keep studying! The periodic table is a fundamental tool in chemistry.

Would you like to try another chemistry quiz or learn more about any of these elements?`,

            "shakespeare": `# Quiz: Shakespeare's Works

Test your knowledge of William Shakespeare and his famous works!

## Questions

1. Which of these plays features the character Hamlet?
   a) Macbeth
   b) Hamlet
   c) Romeo and Juliet
   d) Othello

2. "To be, or not to be" is a famous quote from which Shakespeare play?
   a) King Lear
   b) Hamlet
   c) Julius Caesar
   d) The Merchant of Venice

3. Which of these is NOT one of Shakespeare's tragedies?
   a) Macbeth
   b) Othello
   c) A Midsummer Night's Dream
   d) Romeo and Juliet

4. In which city was Shakespeare born?
   a) London
   b) Oxford
   c) Stratford-upon-Avon
   d) Manchester

5. Approximately how many plays did Shakespeare write?
   a) 17
   b) 27
   c) 37
   d) 47

## Answers

1. b) Hamlet
2. b) Hamlet
3. c) A Midsummer Night's Dream (it's a comedy)
4. c) Stratford-upon-Avon
5. c) 37 (the exact number is debated, but generally accepted to be around 37)

## How did you do?

- 5/5: Excellent! You really know your Shakespeare!
- 4/5: Very good! Just one more to perfect your knowledge.
- 3/5: Good job! You know many of Shakespeare's works, but there's more to discover.
- 1-2/5: Keep studying! Shakespeare's works are foundational to English literature.

Would you like to try another literature quiz or learn more about any of Shakespeare's plays?`
        };
        
        // Check if we have a pre-written quiz
        for (const [key, quiz] of Object.entries(quizzes)) {
            if (topic.toLowerCase().includes(key)) {
                // Save this quiz taking event if memory is enabled
                if (this.config.memoryEnabled) {
                    const quizEvent = {
                        subject: subject,
                        topic: key,
                        timestamp: new Date()
                    };
                    
                    this.state.quizResults.push(quizEvent);
                    
                    // Save to storage
                    try {
                        localStorage.setItem('jaat-mode05-quiz-results', JSON.stringify(this.state.quizResults));
                    } catch (error) {
                        console.error("Error saving quiz result:", error);
                    }
                }
                
                return quiz;
            }
        }
        
        // For unknown topics, provide a generic response
        return `# Quiz: ${this.capitalizeFirstLetter(topic)}

In a complete implementation with an AI model, I would generate a custom educational quiz about ${topic} in the field of ${subject}.

The quiz would include:

## Questions
1. Multiple-choice question about a key concept in ${topic}
2. Question testing understanding of important terminology
3. Question about significant figures, events, or components
4. Application or analysis question
5. Question connecting ${topic} to related concepts

## Answers
Comprehensive explanations for each answer, including:
- Why the correct answer is right
- Why the incorrect options are wrong
- Additional context or examples for deeper understanding

## Learning Assessment
- Scoring explanation
- Suggestions for further study based on results

Would you like to focus on a specific aspect of ${topic} for a more targeted quiz?`;
    }
    
    /**
     * Track learning progress for a subject and topic
     * @param {string} subject - Subject area
     * @param {string} topic - Specific topic
     */
    trackLearningProgress(subject, topic) {
        if (!this.config.memoryEnabled) return;
        
        // Initialize subject in learning progress if needed
        if (!this.state.learningProgress[subject]) {
            this.state.learningProgress[subject] = {};
        }
        
        // Update or initialize topic in the subject
        if (!this.state.learningProgress[subject][topic]) {
            this.state.learningProgress[subject][topic] = {
                interactions: 0,
                firstInteraction: new Date(),
                lastInteraction: new Date()
            };
        } else {
            this.state.learningProgress[subject][topic].interactions++;
            this.state.learningProgress[subject][topic].lastInteraction = new Date();
        }
        
        // Save updated progress
        this.savePreferences({
            learningProgress: this.state.learningProgress
        });
    }
    
    /**
     * Get related topics based on subject and current topic
     * @param {string} subject - Subject area
     * @param {string} topic - Current topic
     * @returns {Array<string>} Related topics as suggestions
     */
    getRelatedTopics(subject, topic) {
        // Sample related topics for common subjects and topics
        const relatedTopicsMap = {
            "math": {
                "calculus": ["derivatives", "integrals", "limits", "differential equations"],
                "algebra": ["equations", "functions", "polynomials", "matrices"],
                "geometry": ["circles", "triangles", "angles", "polygons"]
            },
            "physics": {
                "mechanics": ["Newton's laws", "momentum", "energy", "circular motion"],
                "electricity": ["current", "voltage", "resistance", "circuits"],
                "quantum physics": ["wave-particle duality", "uncertainty principle", "quantum entanglement"]
            },
            "biology": {
                "photosynthesis": ["cellular respiration", "chloroplasts", "light reactions", "Calvin cycle"],
                "genetics": ["DNA", "inheritance", "mutations", "genetic disorders"],
                "evolution": ["natural selection", "adaptation", "speciation", "common ancestry"]
            }
        };
        
        // Check if we have pre-defined related topics
        if (relatedTopicsMap[subject] && relatedTopicsMap[subject][topic]) {
            const suggestions = relatedTopicsMap[subject][topic].map(relatedTopic => 
                `Teach me about ${relatedTopic} in ${subject}`
            );
            return suggestions.slice(0, 3); // Return first 3 suggestions
        }
        
        // For unknown subjects/topics, generate generic related suggestions
        const suggestions = [
            `Tell me more about ${topic}`,
            `Give me a quiz on ${topic}`,
            `What's the history of ${topic} in ${subject}?`,
            `How is ${topic} related to other concepts in ${subject}?`,
            `Explain ${topic} with simple examples`
        ];
        
        // Shuffle and return 3 suggestions
        return suggestions
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
    }
    
    /**
     * Extract a default topic if none is clearly detected
     * @param {string} input - User input
     * @returns {string|null} Extracted topic or null
     */
    extractDefaultTopic(input) {
        // Simple extraction of nouns or noun phrases
        const nounPhrasePatterns = [
            /(?:the|a|an)\s+([\w\s]+)(?:\s+(?:is|are|was|were))/i,
            /(?:about|regarding|concerning)\s+([\w\s]+)/i,
            /(?:explain|describe|define)\s+([\w\s]+)/i
        ];
        
        for (const pattern of nounPhrasePatterns) {
            const match = input.match(pattern);
            if (match && match[1]) {
                return match[1].trim();
            }
        }
        
        return null;
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
                'jaat-mode05-preferences',
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
            localStorage.removeItem('jaat-mode05-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Clear learning progress
     * @returns {boolean} Success status
     */
    clearLearningProgress() {
        try {
            this.state.learningProgress = {};
            this.state.quizResults = [];
            
            // Save empty learning progress
            this.savePreferences({
                learningProgress: {}
            });
            
            // Remove quiz results
            localStorage.removeItem('jaat-mode05-quiz-results');
            
            return true;
        } catch (error) {
            console.error("Error clearing learning progress:", error);
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
            supportedSubjects: this.supportedSubjects,
            currentSubject: this.state.currentSubject,
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
    window.jaatAIModes.aiTeacher = new AITeacherMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AITeacherMode;
}
/**
 * JAAT-AI Dev Helper Mode
 * AI mode specialized in helping developers with coding tasks, explanations, and technical support
 * Mode ID: 03
 */

class DevHelperMode {
    constructor() {
        // Mode metadata
        this.id = "03";
        this.name = "Dev Helper";
        this.description = "Your programming assistant for coding tasks and technical explanations";
        this.icon = "ri-code-s-slash-line";
        this.color = "#3b82f6"; // Blue color
        this.category = "development";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 5000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 4, // 1-10 scale (higher = more personality)
            creativityLevel: 5, // 1-10 scale
            formalityLevel: 6, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            includeExplanations: true,
            syntaxHighlighting: true,
            defaultLanguage: "javascript"
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            currentLanguage: "javascript",
            currentTopic: null,
            sessionStartTime: new Date(),
            responseCount: 0
        };
        
        // Supported programming languages
        this.supportedLanguages = [
            "javascript", "typescript", "python", "java", "c", "cpp", "csharp", "go", 
            "ruby", "php", "swift", "kotlin", "rust", "sql", "html", "css", 
            "bash", "powershell", "dart", "scala", "r", "perl"
        ];
        
        // Technology stacks
        this.techStacks = {
            "frontend": ["react", "vue", "angular", "svelte", "nextjs", "html", "css", "javascript", "typescript"],
            "backend": ["nodejs", "express", "django", "flask", "spring", "rails", "laravel", "asp.net"],
            "mobile": ["react-native", "flutter", "swift", "kotlin", "xamarin"],
            "database": ["sql", "mongodb", "postgresql", "mysql", "sqlite", "firebase", "dynamodb"],
            "devops": ["docker", "kubernetes", "aws", "azure", "gcp", "jenkins", "gitlab", "github-actions"],
            "ai-ml": ["tensorflow", "pytorch", "scikit-learn", "numpy", "pandas", "huggingface"]
        };
        
        // Code explanations and docstrings
        this.codeExplanationFormats = {
            "javascript": {
                commentPrefix: "// ",
                docstringStart: "/**\n * ",
                docstringEnd: "\n */",
                docstringLinePrefix: " * ",
                docstringParamPrefix: " * @param "
            },
            "python": {
                commentPrefix: "# ",
                docstringStart: '"""\n',
                docstringEnd: '\n"""',
                docstringLinePrefix: "",
                docstringParamPrefix: ":param "
            },
            "java": {
                commentPrefix: "// ",
                docstringStart: "/**\n * ",
                docstringEnd: "\n */",
                docstringLinePrefix: " * ",
                docstringParamPrefix: " * @param "
            }
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Explain how promises work in JavaScript",
            "Help me create a REST API with Node.js",
            "What's the difference between == and === in JavaScript?",
            "Show me a React component example with hooks",
            "How do I connect to a PostgreSQL database in Python?",
            "Explain Big O notation and time complexity",
            "What are design patterns and when should I use them?",
            "Help me debug this error message",
            "Explain async/await in JavaScript",
            "How do I deploy a web app to AWS?"
        ];
        
        // Special features
        this.features = {
            codeGeneration: true,
            codeExplanation: true,
            syntaxHighlighting: true,
            languageComparison: true,
            bestPractices: true,
            systemDesign: true,
            performanceOptimization: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 30,
            MAX_CODE_LENGTH: 10000,
            GREETING_PHRASES: [
                "Hello, developer! What coding challenge can I help you with today?",
                "Ready to write some code! What are you working on?",
                "Welcome to Dev Helper mode. What programming questions do you have?",
                "Need help with development? I'm here to assist with your coding questions.",
                "Let's solve some coding problems! What technical help do you need?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Dev Helper mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set default language if provided
        if (options.language && this.supportedLanguages.includes(options.language)) {
            this.state.currentLanguage = options.language;
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode03-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Dev Helper mode");
                
                // Apply language preference if saved
                if (this.state.userPreferences.preferredLanguage) {
                    this.state.currentLanguage = this.state.userPreferences.preferredLanguage;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode03-history');
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
        
        console.log(`Dev Helper mode initialized with language: ${this.state.currentLanguage}`);
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
     * Process user input and generate a developer-focused response
     * @param {string} userInput - The user's input text or code
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with dev-related information
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "What development topic or coding question would you like help with? I can explain concepts, help debug issues, or provide code examples.",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing development request`);
        
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
        
        // Detect if input contains code and what language
        const { containsCode, language, extractedCode } = this.detectCodeAndLanguage(userInput);
        
        // Update current language if detected
        if (language) {
            this.state.currentLanguage = language;
        }
        
        // Try to detect the topic/subject of the query
        this.state.currentTopic = this.detectTopic(userInput);
        
        // Generate appropriate response
        const response = await this.generateDevResponse(
            userInput, 
            containsCode, 
            extractedCode, 
            this.state.currentLanguage,
            this.state.currentTopic,
            context
        );
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date(),
                language: this.state.currentLanguage,
                containsCode: containsCode,
                topic: this.state.currentTopic
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode03-history',
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
     * Detect if input contains code and identify the language
     * @param {string} input - User input
     * @returns {Object} Information about detected code
     */
    detectCodeAndLanguage(input) {
        // Check for code blocks with language specification: ```language ... ```
        const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g;
        let match;
        let extractedCode = null;
        let language = null;
        
        // Try to extract code from markdown code blocks
        match = codeBlockRegex.exec(input);
        if (match) {
            language = match[1] ? match[1].toLowerCase() : null;
            extractedCode = match[2];
            
            // Validate language is supported
            if (language && !this.supportedLanguages.includes(language)) {
                language = this.detectLanguageFromCode(extractedCode);
            }
        } else {
            // Check for code snippets without code blocks
            const potentialCode = this.extractPotentialCode(input);
            if (potentialCode) {
                extractedCode = potentialCode;
                language = this.detectLanguageFromCode(potentialCode);
            }
        }
        
        // Determine if input definitely contains code
        const containsCode = Boolean(extractedCode && language);
        
        return {
            containsCode,
            language: language || this.state.currentLanguage,
            extractedCode
        };
    }
    
    /**
     * Try to extract potential code from text that doesn't use markdown code blocks
     * @param {string} text - Text to analyze
     * @returns {string|null} Extracted code or null
     */
    extractPotentialCode(text) {
        // Look for common code patterns
        const codeIndicators = [
            /function\s+\w+\s*\([^)]*\)\s*{/,  // function definition
            /\bclass\s+\w+/,                   // class definition
            /\bconst\s+\w+\s*=/,               // const assignment
            /\blet\s+\w+\s*=/,                 // let assignment
            /\bvar\s+\w+\s*=/,                 // var assignment
            /\bimport\s+[{[\w, ]+}\s+from/,    // ES import
            /\brequire\(['"]\w+['"]\)/,        // CommonJS require
            /\bdef\s+\w+\s*\(/,                // Python function
            /\bpublic\s+(static\s+)?\w+/,      // Java/C# method
            /\bif\s*\([^)]+\)\s*{/,            // if statement
            /\bfor\s*\([^)]+\)\s*{/,           // for loop
            /\s*<\w+[^>]*>[\s\S]*<\/\w+>/,     // HTML tags
            /\.\w+\s*\([^)]*\)/,               // Method call
            /\$([\w-]+)\s*:/                   // CSS variable or PHP
        ];
        
        for (const pattern of codeIndicators) {
            if (pattern.test(text)) {
                // Extract the lines that likely contain code
                // This is a simplification and may not be 100% accurate
                const lines = text.split('\n');
                const codeLines = [];
                let inCodeBlock = false;
                
                for (const line of lines) {
                    if (pattern.test(line)) {
                        inCodeBlock = true;
                    }
                    
                    if (inCodeBlock) {
                        codeLines.push(line);
                    }
                    
                    // End code block if the line is mostly empty or looks like a sentence
                    if (inCodeBlock && (line.trim() === '' || (/^[A-Z].*\.$/.test(line) && !line.includes('(')))) {
                        inCodeBlock = false;
                    }
                }
                
                if (codeLines.length > 0) {
                    return codeLines.join('\n');
                }
            }
        }
        
        return null;
    }
    
    /**
     * Detect programming language from code content
     * @param {string} code - Code to analyze
     * @returns {string|null} Detected language or null
     */
    detectLanguageFromCode(code) {
        if (!code) return null;
        
        // Language detection patterns
        const patterns = {
            javascript: [/function\s+\w+\s*\(/, /const|let|var/, /console\.log/, /=>/],
            typescript: [/interface\s+\w+/, /type\s+\w+\s*=/, /<\w+>/, /:\s*\w+(\[\])?/],
            python: [/def\s+\w+\s*\(/, /print\s*\(/, /import\s+\w+/, /#.*$/m],
            html: [/<html/, /<div/, /<body/, /<head/],
            css: [/\.[\w-]+\s*{/, /#[\w-]+\s*{/, /@media/],
            java: [/public\s+class/, /public\s+static\s+void\s+main/, /System\.out\.println/],
            csharp: [/public\s+class/, /namespace\s+\w+/, /Console\.WriteLine/],
            go: [/func\s+\w+/, /package\s+\w+/, /import\s+\(/],
            ruby: [/def\s+\w+/, /puts\s+/, /require\s+["']\w+["']/],
            php: [/<\?php/, /\$\w+/],
            sql: [/SELECT|INSERT|UPDATE|DELETE/i, /FROM\s+\w+/i, /WHERE/i],
            rust: [/fn\s+\w+/, /let\s+mut/, /struct\s+\w+/],
            swift: [/import\s+\w+/, /func\s+\w+/, /var\s+\w+\s*:/],
            kotlin: [/fun\s+\w+/, /val|var\s+\w+/, /import\s+\w+/],
            bash: [/#!/, /echo\s+/, /\$\{\w+\}/]
        };
        
        // Check for language patterns
        let bestMatch = null;
        let highestScore = 0;
        
        for (const [language, languagePatterns] of Object.entries(patterns)) {
            let score = 0;
            for (const pattern of languagePatterns) {
                if (pattern.test(code)) {
                    score++;
                }
            }
            
            if (score > highestScore) {
                highestScore = score;
                bestMatch = language;
            }
        }
        
        // Require a minimum score to consider it a match
        return highestScore >= 1 ? bestMatch : null;
    }
    
    /**
     * Try to detect the topic or subject of the user's query
     * @param {string} input - User input
     * @returns {string|null} Detected topic or null
     */
    detectTopic(input) {
        const topicKeywords = {
            "apis": ["api", "rest", "endpoint", "http", "request", "response", "fetch", "axios"],
            "databases": ["database", "sql", "query", "table", "join", "orm", "mongodb", "nosql"],
            "authentication": ["auth", "login", "jwt", "token", "password", "oauth", "permission"],
            "frontend": ["ui", "component", "react", "vue", "angular", "dom", "css", "html"],
            "performance": ["optimization", "speed", "slow", "fast", "memory", "cpu", "efficient"],
            "architecture": ["design", "pattern", "structure", "architecture", "class", "inheritance", "composition"],
            "debugging": ["debug", "error", "problem", "issue", "fix", "solve", "track down"],
            "deployment": ["deploy", "host", "server", "cloud", "aws", "azure", "docker"],
            "testing": ["test", "unit", "integration", "e2e", "mock", "stub", "assertion"]
        };
        
        const normalizedInput = input.toLowerCase();
        let bestTopic = null;
        let highestScore = 0;
        
        for (const [topic, keywords] of Object.entries(topicKeywords)) {
            let score = 0;
            for (const keyword of keywords) {
                const regex = new RegExp('\\b' + keyword + '\\b', 'i');
                if (regex.test(normalizedInput)) {
                    score++;
                }
            }
            
            if (score > highestScore) {
                highestScore = score;
                bestTopic = topic;
            }
        }
        
        return highestScore >= 1 ? bestTopic : null;
    }
    
    /**
     * Generate a developer-focused response
     * @param {string} userInput - The user's input
     * @param {boolean} containsCode - Whether input contains code
     * @param {string} code - Extracted code
     * @param {string} language - Detected language
     * @param {string} topic - Detected topic
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateDevResponse(userInput, containsCode, code, language, topic, context = {}) {
        // In a real implementation, this would call an AI model API specialized in code
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Detect if this is a "what is X" or "how to X" question
        const isWhatIsQuestion = /what\s+is|what\s+are|explain|definition\s+of/i.test(userInput);
        const isHowToQuestion = /how\s+to|how\s+do\s+i|how\s+can\s+i/i.test(userInput);
        
        if (containsCode) {
            // User shared code - analyze it
            responseText = this.explainCode(code, language);
        } else if (isWhatIsQuestion) {
            // Explanation of concept
            responseText = this.generateConceptExplanation(userInput, language, topic);
        } else if (isHowToQuestion) {
            // Tutorial/how-to
            responseText = this.generateHowToGuide(userInput, language, topic);
        } else {
            // General programming question
            responseText = this.generateGeneralDevResponse(userInput, language, topic);
        }
        
        // Get appropriate language and topic-specific suggestions
        const devSuggestions = this.getDevSuggestions(language, topic);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            language: language,
            topic: topic,
            containsCode: containsCode,
            suggestions: devSuggestions
        };
    }
    
    /**
     * Explain a code snippet
     * @param {string} code - Code to explain
     * @param {string} language - Programming language
     * @returns {string} Code explanation
     */
    explainCode(code, language) {
        // This is a simplified demonstration - in a real implementation, 
        // this would use more sophisticated analysis
        
        let explanation = `Here's an explanation of this ${language} code:\n\n`;
        
        // Basic structure analysis
        const lineCount = code.split('\n').length;
        let complexity = "simple";
        if (lineCount > 30) complexity = "moderate";
        if (lineCount > 100) complexity = "complex";
        
        explanation += `This appears to be a ${complexity} ${language} snippet with ${lineCount} lines.\n\n`;
        
        // Function detection (very simplistic)
        let functionCount = 0;
        if (language === 'javascript' || language === 'typescript') {
            const functionMatches = code.match(/function\s+\w+\s*\(|\w+\s*=\s*function|\w+\s*=\s*\(.*\)\s*=>|const\s+\w+\s*=\s*\(.*\)\s*=>/g) || [];
            functionCount = functionMatches.length;
        } else if (language === 'python') {
            const functionMatches = code.match(/def\s+\w+\s*\(/g) || [];
            functionCount = functionMatches.length;
        } else if (language === 'java' || language === 'csharp') {
            const functionMatches = code.match(/\w+\s+\w+\s*\([^)]*\)\s*{/g) || [];
            functionCount = functionMatches.length;
        }
        
        if (functionCount > 0) {
            explanation += `It contains approximately ${functionCount} function${functionCount > 1 ? 's' : ''}.\n\n`;
        }
        
        // Code quality assessment (simplistic)
        explanation += "**Code Assessment:**\n";
        
        // Comment analysis
        let commentCount = 0;
        if (language === 'javascript' || language === 'typescript' || language === 'java' || language === 'csharp') {
            const singleLineComments = (code.match(/\/\/.*/g) || []).length;
            const multiLineComments = (code.match(/\/\*[\s\S]*?\*\//g) || []).length;
            commentCount = singleLineComments + multiLineComments;
        } else if (language === 'python') {
            const singleLineComments = (code.match(/#.*/g) || []).length;
            const multiLineComments = (code.match(/'''[\s\S]*?'''|"""[\s\S]*?"""/g) || []).length;
            commentCount = singleLineComments + multiLineComments;
        }
        
        const commentRatio = commentCount / lineCount;
        if (commentRatio < 0.1) {
            explanation += "- The code has relatively few comments. Consider adding more comments to improve readability.\n";
        } else if (commentRatio > 0.3) {
            explanation += "- The code is well-commented, which is excellent for readability and maintenance.\n";
        }
        
        // Very simple error detection
        if (language === 'javascript' || language === 'typescript') {
            if (/(?<!\w)null(?!\w)/.test(code) && !code.includes('=== null') && !code.includes('!== null')) {
                explanation += "- Watch out for potential null reference issues. Consider adding null checks.\n";
            }
        } else if (language === 'python') {
            if (code.includes('except:') && !code.includes('except Exception as e:')) {
                explanation += "- You're using a bare 'except:' clause. It's better to catch specific exceptions.\n";
            }
        }
        
        // Add general recommendations
        explanation += "\n**Recommendations:**\n";
        if (language === 'javascript' || language === 'typescript') {
            explanation += "- Consider using modern ES6+ features like destructuring, arrow functions, and template literals if not already doing so.\n";
            explanation += "- For improved safety, add type checking or consider TypeScript if you're not already using it.\n";
        } else if (language === 'python') {
            explanation += "- Follow PEP 8 style guidelines for consistent, readable code.\n";
            explanation += "- Consider adding docstrings to functions and classes for better documentation.\n";
        }
        
        explanation += "\nWould you like me to help you optimize this code or add any specific features to it?";
        
        return explanation;
    }
    
    /**
     * Generate an explanation of a programming concept
     * @param {string} userInput - User's question
     * @param {string} language - Programming language
     * @param {string} topic - Detected topic
     * @returns {string} Concept explanation
     */
    generateConceptExplanation(userInput, language, topic) {
        // Extract the concept to explain (very simplified approach)
        const whatIsMatch = userInput.match(/what\s+(?:is|are)\s+(?:a|an)?\s*([^?\.]+)/i);
        const explainMatch = userInput.match(/explain\s+(?:a|an)?\s*([^?\.]+)/i);
        const definitionMatch = userInput.match(/definition\s+of\s+(?:a|an)?\s*([^?\.]+)/i);
        
        let concept = "";
        if (whatIsMatch) concept = whatIsMatch[1].trim();
        else if (explainMatch) concept = explainMatch[1].trim();
        else if (definitionMatch) concept = definitionMatch[1].trim();
        else concept = topic || language;
        
        // Common programming concepts
        const conceptExplanations = {
            "promises": `Promises in JavaScript are objects that represent the eventual completion (or failure) of an asynchronous operation and its resulting value. They help manage asynchronous code by providing a cleaner alternative to callback functions.

A Promise has three states:
1. **Pending**: Initial state, neither fulfilled nor rejected
2. **Fulfilled**: The operation completed successfully
3. **Rejected**: The operation failed

Basic Promise syntax:
\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation here
  if (/* operation successful */) {
    resolve(result); // Promise fulfilled
  } else {
    reject(error); // Promise rejected
  }
});

// Using the Promise
myPromise
  .then(result => {
    // Handle successful result
  })
  .catch(error => {
    // Handle error
  });
\`\`\`

Promises can be chained using multiple \`.then()\` calls, making asynchronous code more readable and manageable compared to deeply nested callbacks.`,
            
            "async/await": `Async/await is a JavaScript syntax that makes working with Promises more convenient. It allows you to write asynchronous code that looks and behaves like synchronous code.

**Key points:**
1. \`async\` functions always return a Promise
2. \`await\` can only be used inside \`async\` functions
3. \`await\` pauses execution until the Promise resolves
4. Error handling uses traditional try/catch blocks

Example:
\`\`\`javascript
// Using Promises
function fetchUserData() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Same function using async/await
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

The async/await syntax is especially useful when dealing with multiple sequential asynchronous operations, as it avoids the "callback hell" or even Promise chaining complexity.`,
            
            "rest api": `A REST API (Representational State Transfer Application Programming Interface) is an architectural style for designing networked applications. It uses standard HTTP methods to perform CRUD operations on resources.

**Key principles of REST APIs:**

1. **Stateless**: Each request contains all the information needed to complete it
2. **Client-Server architecture**: Separation of concerns between client and server
3. **Cacheable**: Responses define themselves as cacheable or non-cacheable
4. **Uniform Interface**: Standard methods to interact with resources
5. **Layered System**: Client cannot tell if connected directly to the end server

**Standard HTTP methods used in REST APIs:**
- GET: Retrieve a resource
- POST: Create a new resource
- PUT: Update an existing resource
- DELETE: Remove a resource
- PATCH: Partially update a resource

**Example of a REST API endpoint structure:**
- GET /api/users - Get all users
- GET /api/users/123 - Get user with ID 123
- POST /api/users - Create a new user
- PUT /api/users/123 - Update user 123
- DELETE /api/users/123 - Delete user 123

REST APIs typically return data in JSON format, making them easily consumable by any client application.`
        };
        
        // Check if we have a pre-written explanation for this concept
        for (const [key, explanation] of Object.entries(conceptExplanations)) {
            if (concept.toLowerCase().includes(key)) {
                return explanation;
            }
        }
        
        // Default response for unknown concepts
        return `You asked about ${concept}. This is a programming concept related to ${topic || language}. 

In a real implementation, I would provide a detailed explanation of ${concept}, including:
- Definition and core principles
- Code examples in ${language}
- Common use cases and patterns
- Best practices and potential pitfalls

Is there a specific aspect of ${concept} that you'd like me to focus on?`;
    }
    
    /**
     * Generate a how-to guide or tutorial
     * @param {string} userInput - User's question
     * @param {string} language - Programming language
     * @param {string} topic - Detected topic
     * @returns {string} How-to guide
     */
    generateHowToGuide(userInput, language, topic) {
        // Extract the task to explain (very simplified approach)
        const howToMatch = userInput.match(/how\s+(?:to|do\s+i|can\s+i)\s+([^?\.]+)/i);
        
        let task = "";
        if (howToMatch) task = howToMatch[1].trim();
        else task = topic || "use " + language;
        
        // Common how-to guides
        const howToGuides = {
            "create a rest api": `# Creating a REST API with ${language === 'javascript' ? 'Node.js and Express' : language === 'python' ? 'Python and Flask' : language}

Here's a step-by-step guide to create a basic REST API:

## Setup & Installation

${language === 'javascript' ? 
`1. Initialize a new project:
\`\`\`bash
mkdir my-rest-api
cd my-rest-api
npm init -y
\`\`\`

2. Install required packages:
\`\`\`bash
npm install express morgan body-parser cors
\`\`\`

3. Create the main server file (index.js):
\`\`\`javascript
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes will go here

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`` 
: 
language === 'python' ?
`1. Create a virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
\`\`\`

2. Install required packages:
\`\`\`bash
pip install flask flask-restful flask-cors
\`\`\`

3. Create the main app file (app.py):
\`\`\`python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Routes will go here

if __name__ == '__main__':
    app.run(debug=True)
\`\`\``
:
"1. Set up your development environment for " + language + "\n2. Install necessary web framework and dependencies"}

## Creating API Routes

${language === 'javascript' ?
`Add these routes to your index.js file:

\`\`\`javascript
// Sample data
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET a single user
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
});

// POST a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update) a user
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  users[userIndex] = { id, name, email };
  res.json(users[userIndex]);
});

// DELETE a user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const deletedUser = users[userIndex];
  users = users.filter(user => user.id !== id);
  
  res.json(deletedUser);
});
\`\`\``
:
language === 'python' ?
`Add these routes to your app.py file:

\`\`\`python
# Sample data
users = [
    {"id": 1, "name": "Alice", "email": "alice@example.com"},
    {"id": 2, "name": "Bob", "email": "bob@example.com"}
]

# GET all users
@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)

# GET a single user
@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((user for user in users if user["id"] == user_id), None)
    
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    return jsonify(user)

# POST a new user
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or not all(key in data for key in ["name", "email"]):
        return jsonify({"message": "Name and email are required"}), 400
    
    new_user = {
        "id": len(users) + 1,
        "name": data["name"],
        "email": data["email"]
    }
    
    users.append(new_user)
    return jsonify(new_user), 201

# PUT (update) a user
@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    
    if not data or not all(key in data for key in ["name", "email"]):
        return jsonify({"message": "Name and email are required"}), 400
    
    user = next((user for user in users if user["id"] == user_id), None)
    
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    user["name"] = data["name"]
    user["email"] = data["email"]
    
    return jsonify(user)

# DELETE a user
@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global users
    user = next((user for user in users if user["id"] == user_id), None)
    
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    users = [user for user in users if user["id"] != user_id]
    return jsonify(user)
\`\`\``
:
"// Add your API routes here with appropriate HTTP methods"
}

## Testing the API

Use tools like Postman, Insomnia, or simple curl commands to test your API endpoints:

\`\`\`bash
# Get all users
curl -X GET http://localhost:${language === 'javascript' ? '3000' : '5000'}/api/users

# Get a single user
curl -X GET http://localhost:${language === 'javascript' ? '3000' : '5000'}/api/users/1

# Create a new user
curl -X POST http://localhost:${language === 'javascript' ? '3000' : '5000'}/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Charlie", "email": "charlie@example.com"}'

# Update a user
curl -X PUT http://localhost:${language === 'javascript' ? '3000' : '5000'}/api/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Alice Updated", "email": "alice.updated@example.com"}'

# Delete a user
curl -X DELETE http://localhost:${language === 'javascript' ? '3000' : '5000'}/api/users/2
\`\`\`

## Next Steps

1. Connect to a real database (MongoDB, PostgreSQL, etc.)
2. Add authentication and authorization
3. Implement input validation
4. Add error handling middleware
5. Create a proper folder structure for larger applications
6. Write tests for your API endpoints

Would you like more details on any of these next steps?`,
            
            "connect to a database": `# Connecting to a Database in ${language}

Here's how to connect to a database in ${language}:

${language === 'javascript' ? 
`## Connecting to a MongoDB Database

1. Install required packages:
\`\`\`bash
npm install mongoose
\`\`\`

2. Create a database connection:
\`\`\`javascript
// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;
\`\`\`

3. Import and use in your main application:
\`\`\`javascript
// index.js
const express = require('express');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Routes and middleware...

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

4. Create a model:
\`\`\`javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
\`\`\`

5. Use the model in your routes:
\`\`\`javascript
const User = require('./models/User');

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  
  try {
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
\`\`\``
:
language === 'python' ?
`## Connecting to a SQLite Database with SQLAlchemy

1. Install required packages:
\`\`\`bash
pip install flask-sqlalchemy
\`\`\`

2. Setup SQLAlchemy in your Flask app:
\`\`\`python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<User {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }

# Create database tables
with app.app_context():
    db.create_all()

# API routes
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or not all(key in data for key in ["name", "email"]):
        return jsonify({"message": "Name and email are required"}), 400
    
    try:
        new_user = User(name=data["name"], email=data["email"])
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
\`\`\``
:
`// Code example for connecting to a database in ${language}`
}

## Best Practices

1. **Use environment variables** for database connection strings
2. **Implement connection pooling** for better performance
3. **Add error handling** for database operations
4. **Create an abstraction layer** (repository pattern) instead of directly using the database in your routes
5. **Use migrations** for database schema changes
6. **Implement proper logging** for database operations

Would you like more details on any specific aspect of database connectivity?`
        };
        
        // Check if we have a pre-written guide for this task
        for (const [key, guide] of Object.entries(howToGuides)) {
            if (task.toLowerCase().includes(key)) {
                return guide;
            }
        }
        
        // Default response for unknown tasks
        return `# How to ${task} in ${language}

In a complete implementation, I would provide you with a detailed, step-by-step guide on how to ${task} in ${language}, including:

1. Setup and prerequisites
2. Step-by-step instructions with code examples
3. Best practices and common pitfalls
4. Testing and validation strategies
5. Next steps and further learning resources

Is there a specific aspect of "${task}" that you're struggling with or would like me to focus on?`;
    }
    
    /**
     * Generate a general developer response
     * @param {string} userInput - User's input
     * @param {string} language - Programming language
     * @param {string} topic - Detected topic
     * @returns {string} Developer response
     */
    generateGeneralDevResponse(userInput, language, topic) {
        // For demonstration, provide a generic development response
        return `Based on your question about ${topic || language}, I understand you're looking for developer assistance.

In a real implementation with an AI model, I would analyze your specific question and provide a detailed, helpful response related to ${language} ${topic ? `and ${topic}` : 'development'}.

Would you like me to:
1. Provide a code example for a specific function or feature in ${language}?
2. Explain a particular concept or pattern related to ${topic || language}?
3. Help you troubleshoot a specific issue?
4. Guide you through implementing a particular feature?

Please let me know what you're trying to accomplish, and I'll do my best to assist you.`;
    }
    
    /**
     * Get developer-focused suggestions based on language and topic
     * @param {string} language - Programming language
     * @param {string} topic - Detected topic
     * @returns {Array<string>} Developer-focused suggestions
     */
    getDevSuggestions(language, topic) {
        const suggestions = [];
        
        // Add language-specific suggestions
        if (language === 'javascript') {
            suggestions.push("How do I use async/await in JavaScript?");
            suggestions.push("Explain JavaScript closures");
            suggestions.push("What are React hooks?");
        } else if (language === 'python') {
            suggestions.push("How do I use list comprehensions in Python?");
            suggestions.push("What are Python decorators?");
            suggestions.push("How do I work with virtual environments?");
        } else if (language === 'java') {
            suggestions.push("Explain Java interfaces vs abstract classes");
            suggestions.push("How do I use Java streams?");
            suggestions.push("What's new in Java 17?");
        }
        
        // Add topic-specific suggestions
        if (topic === 'apis') {
            suggestions.push("What is RESTful API design?");
            suggestions.push("How do I authenticate my API?");
        } else if (topic === 'databases') {
            suggestions.push(`How do I connect to a SQL database in ${language}?`);
            suggestions.push("What's the difference between SQL and NoSQL?");
        } else if (topic === 'frontend') {
            suggestions.push("What are CSS flexbox and grid?");
            suggestions.push("How do I optimize website performance?");
        }
        
        // If we don't have enough suggestions, add some general ones
        while (suggestions.length < 3) {
            const generalSuggestions = [
                `Show me a hello world example in ${language}`,
                "What is object-oriented programming?",
                "How do I optimize code performance?",
                "What are design patterns?",
                "How to implement error handling best practices"
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
     * Set the current programming language
     * @param {string} language - Programming language to set
     * @returns {boolean} Success status
     */
    setLanguage(language) {
        if (this.supportedLanguages.includes(language)) {
            this.state.currentLanguage = language;
            
            // Save preference
            this.savePreferences({ preferredLanguage: language });
            
            console.log(`Language set to: ${language}`);
            return true;
        }
        console.error(`Unsupported language: ${language}`);
        return false;
    }
    
    /**
     * Get list of supported programming languages
     * @returns {Array<string>} Supported languages
     */
    getSupportedLanguages() {
        return this.supportedLanguages;
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
                'jaat-mode03-preferences',
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
            localStorage.removeItem('jaat-mode03-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
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
            supportedLanguages: this.supportedLanguages,
            currentLanguage: this.state.currentLanguage,
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
    window.jaatAIModes.devHelper = new DevHelperMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DevHelperMode;
}
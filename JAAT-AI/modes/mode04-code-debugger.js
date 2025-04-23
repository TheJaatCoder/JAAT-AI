/**
 * JAAT-AI Code Debugger Mode
 * AI mode specialized in debugging and fixing code across different programming languages
 * Mode ID: 04
 */

class CodeDebuggerMode {
    constructor() {
        // Mode metadata
        this.id = "04";
        this.name = "Code Debugger";
        this.description = "Specialized in identifying and fixing bugs in your code";
        this.icon = "ri-bug-line";
        this.color = "#ef4444"; // Red color
        this.category = "development";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 5000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 4, // 1-10 scale (higher = more personality)
            creativityLevel: 5, // 1-10 scale
            formalityLevel: 7, // 1-10 scale (higher = more formal)
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
            debuggingSessions: [],
            sessionStartTime: new Date(),
            responseCount: 0
        };
        
        // Supported programming languages
        this.supportedLanguages = [
            "javascript", "python", "java", "c", "cpp", "csharp", "go", 
            "ruby", "php", "swift", "kotlin", "rust", "typescript", 
            "html", "css", "sql", "bash", "powershell"
        ];
        
        // Language detection patterns
        this.languagePatterns = {
            javascript: [/function\s+\w+\s*\(/, /const|let|var/, /console\.log/, /=>/],
            python: [/def\s+\w+\s*\(/, /print\s*\(/, /import\s+\w+/, /#.*$/m],
            html: [/<html/, /<div/, /<body/, /<head/],
            css: [/\.[\w-]+\s*{/, /#[\w-]+\s*{/, /@media/],
            java: [/public\s+class/, /public\s+static\s+void\s+main/, /System\.out\.println/],
            sql: [/SELECT|INSERT|UPDATE|DELETE/i, /FROM\s+\w+/i, /WHERE/i],
            php: [/<\?php/, /\$\w+/],
            ruby: [/def\s+\w+/, /puts\s+/, /require\s+["']\w+["']/],
            csharp: [/public\s+class/, /namespace\s+\w+/, /Console\.WriteLine/],
            go: [/func\s+\w+/, /package\s+\w+/, /import\s+\(/],
            rust: [/fn\s+\w+/, /let\s+mut/, /struct\s+\w+/],
            bash: [/#!/, /echo\s+/, /\$\{\w+\}/]
        };
        
        // Common code issues and fixes
        this.commonIssues = {
            javascript: {
                "undefined variable": "Make sure the variable is declared before use or check for typos in the variable name.",
                "cannot read property of undefined": "Check if the object exists before accessing its properties or use optional chaining (?.).",
                "syntax error": "Look for missing brackets, parentheses, or semicolons in your code.",
                "is not a function": "Verify that the function exists and is spelled correctly, or check if a variable is overriding it."
            },
            python: {
                "indentation error": "Python is sensitive to indentation. Make sure your code blocks are properly indented.",
                "name error": "The variable or function name is not defined. Check for typos or make sure it's defined before use.",
                "import error": "The module you're trying to import doesn't exist or isn't installed. Use pip to install it.",
                "index error": "You're trying to access an index that's out of range. Check your array/list length."
            }
            // More languages would be added here
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Can you help me fix this JavaScript error?",
            "Why is my Python code not working?",
            "Debug this function for me",
            "What's wrong with my loop?",
            "Fix the syntax error in this code",
            "How can I optimize this algorithm?",
            "Explain what this code does",
            "Help me understand this error message",
            "What's a better way to write this?",
            "Check my SQL query for errors"
        ];
        
        // Special features
        this.features = {
            codeParsing: true,
            errorDetection: true,
            syntaxHighlighting: true,
            refactoringSuggestions: true,
            performanceAnalysis: true,
            securityAudit: true,
            bestPractices: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 30,
            MAX_CODE_LENGTH: 10000,
            GREETING_PHRASES: [
                "I'm ready to help you debug your code. What seems to be the issue?",
                "Let's squash some bugs! What code are you working on?",
                "Send me the code you're having trouble with, and I'll help you debug it.",
                "Code not behaving as expected? I can help you identify and fix issues.",
                "Share your code with me, and let's solve those frustrating bugs together."
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Code Debugger mode...`);
        
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
            const savedPreferences = localStorage.getItem('jaat-mode04-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Code Debugger mode");
                
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
                const savedHistory = localStorage.getItem('jaat-mode04-history');
                if (savedHistory) {
                    this.state.conversationHistory = JSON.parse(savedHistory);
                    
                    // Trim history if it exceeds max length
                    if (this.state.conversationHistory.length > this.constants.MAX_MEMORY_ITEMS) {
                        this.state.conversationHistory = this.state.conversationHistory.slice(
                            -this.constants.MAX_MEMORY_ITEMS
                        );
                    }
                    
                    console.log(`Loaded ${this.state.conversationHistory.length} debugging conversation items`);
                }
            } catch (error) {
                console.error("Error loading conversation history:", error);
                this.state.conversationHistory = [];
            }
        }
        
        // Record initialization time
        this.state.sessionStartTime = new Date();
        
        console.log(`Code Debugger mode initialized with language: ${this.state.currentLanguage}`);
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
     * Process user input and generate a debugging response
     * @param {string} userInput - The user's input text or code
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with debugging information
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I need to see your code to help debug it. Please share the code you're having trouble with.",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing code debugging request`);
        
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
        
        // Generate appropriate response based on whether code was detected
        const response = await this.generateDebuggingResponse(
            userInput, 
            containsCode, 
            extractedCode, 
            this.state.currentLanguage,
            context
        );
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date(),
                language: this.state.currentLanguage,
                containsCode: containsCode
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode04-history',
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
            // If no code block found, check if the entire input might be code
            extractedCode = input;
            language = this.detectLanguageFromCode(input);
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
     * Detect programming language from code content
     * @param {string} code - Code to analyze
     * @returns {string|null} Detected language or null
     */
    detectLanguageFromCode(code) {
        if (!code) return null;
        
        // Check for language patterns
        let bestMatch = null;
        let highestScore = 0;
        
        for (const [language, patterns] of Object.entries(this.languagePatterns)) {
            let score = 0;
            for (const pattern of patterns) {
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
     * Generate a debugging response
     * @param {string} userInput - The user's input
     * @param {boolean} containsCode - Whether input contains code
     * @param {string} code - Extracted code
     * @param {string} language - Detected language
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object with debugging information
     */
    async generateDebuggingResponse(userInput, containsCode, code, language, context = {}) {
        // In a real implementation, this would call an AI model API specialized in code
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        if (!containsCode) {
            // If no code was detected, ask for code or respond to general questions
            const normalizedInput = userInput.toLowerCase().trim();
            
            if (normalizedInput.includes("how") && normalizedInput.includes("debug")) {
                responseText = `To debug ${language} code effectively:\n\n1. Add console.log() statements to trace variable values\n2. Use breakpoints in your IDE/browser\n3. Check for common errors like typos or off-by-one errors\n4. Validate your assumptions about how the code should work\n\nShare your specific code, and I can help diagnose the exact issue.`;
            } else if (normalizedInput.includes("best practices") || normalizedInput.includes("tips")) {
                responseText = this.getLanguageBestPractices(language);
            } else {
                responseText = `I can help debug your ${language} code. Please share the specific code snippet you're having trouble with, preferably in a code block using triple backticks.`;
            }
        } else {
            // Generate a debugging response for the code
            responseText = this.analyzeCode(code, language);
        }
        
        // Add language-specific suggestions
        const languageSuggestions = this.getLanguageSpecificSuggestions(language);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            language: language,
            containsCode: containsCode,
            suggestions: languageSuggestions
        };
    }
    
    /**
     * Analyze code and provide debugging insights
     * @param {string} code - Code to analyze
     * @param {string} language - Programming language
     * @returns {string} Analysis and suggestions
     */
    analyzeCode(code, language) {
        // This is a simplified demonstration - a real implementation would use
        // sophisticated code analysis and AI models
        
        // Check code length
        if (code.length > this.constants.MAX_CODE_LENGTH) {
            return `The code snippet is quite long (${code.length} characters). To provide better debugging help, please share a smaller, specific section where you're encountering issues.`;
        }
        
        // Look for common issues in the language
        const issues = this.findCommonIssues(code, language);
        
        // Create a response
        let response = `I've analyzed your ${language} code. `;
        
        if (issues.length === 0) {
            response += "I don't see any obvious issues at first glance, but here are some general observations:\n\n";
            response += this.getGeneralCodeFeedback(code, language);
        } else {
            response += `I've identified the following potential issues:\n\n`;
            issues.forEach((issue, index) => {
                response += `**Issue ${index + 1}:** ${issue.problem}\n`;
                response += `**Solution:** ${issue.solution}\n\n`;
            });
        }
        
        // Add best practices and optimization suggestions
        response += `\n### Best Practices for ${language}:\n`;
        response += this.getBestPracticesSuggestions(language);
        
        return response;
    }
    
    /**
     * Find common issues in code
     * @param {string} code - Code to analyze
     * @param {string} language - Programming language
     * @returns {Array} Array of identified issues
     */
    findCommonIssues(code, language) {
        const issues = [];
        
        // Simple pattern matching for demo purposes
        // In a real implementation, this would use proper parsing and analysis
        
        if (language === 'javascript') {
            // Check for undefined variables (very simplistic check)
            const varDeclarations = code.match(/(?:let|const|var)\s+(\w+)/g) || [];
            const declaredVars = varDeclarations.map(v => v.replace(/(?:let|const|var)\s+/, ''));
            const usedVars = code.match(/\b\w+\b(?!\s*[:=\(])/g) || [];
            
            // This is overly simplistic and will have false positives, but serves as a demo
            const potentialUndefined = usedVars.filter(v => 
                !declaredVars.includes(v) && 
                !['if', 'else', 'return', 'function', 'true', 'false', 'null', 'undefined', 'for', 'while', 'console', 'log'].includes(v)
            );
            
            if (potentialUndefined.length > 0) {
                issues.push({
                    problem: `Potential use of undefined variables: ${potentialUndefined.slice(0, 3).join(', ')}${potentialUndefined.length > 3 ? '...' : ''}`,
                    solution: "Make sure all variables are properly declared before use."
                });
            }
            
            // Check for missing semicolons (simplistic)
            if (code.includes('\n') && !/;[\s\n]*$/.test(code)) {
                issues.push({
                    problem: "Possible missing semicolons at the end of statements.",
                    solution: "While JavaScript has automatic semicolon insertion, it's good practice to explicitly end statements with semicolons to avoid unexpected behavior."
                });
            }
            
            // Check for potential callback issues
            if (code.includes('callback(') && !code.includes('try') && !code.includes('catch')) {
                issues.push({
                    problem: "Callbacks without error handling.",
                    solution: "When using callbacks, implement error handling using try/catch blocks or check for errors in the callback function."
                });
            }
        } else if (language === 'python') {
            // Check for common Python issues
            
            // Indentation inconsistency (very simplistic check)
            const indentations = code.match(/^\s+/gm) || [];
            const uniqueIndentSizes = new Set(indentations.map(i => i.length));
            if (uniqueIndentSizes.size > 1 && !code.includes('"""') && !code.includes("'''")) {
                issues.push({
                    problem: "Inconsistent indentation detected.",
                    solution: "Python is sensitive to indentation. Ensure you're using consistent indentation throughout your code (either tabs or spaces, but not mixed)."
                });
            }
            
            // Check for common Python error patterns
            if (code.includes('print') && !code.includes('print(')) {
                issues.push({
                    problem: "Potential syntax error with print statement.",
                    solution: "In Python 3, print is a function and requires parentheses: print('Hello') instead of print 'Hello'."
                });
            }
            
            // Check for missing colons
            if (/^\s*(if|for|while|def|class|try|except|finally|with|else|elif)(?!\s*:).*$/m.test(code)) {
                issues.push({
                    problem: "Missing colon after control flow statement.",
                    solution: "Python requires a colon at the end of control flow statements like if, for, while, def, etc."
                });
            }
        }
        
        return issues;
    }
    
    /**
     * Provide general feedback on code
     * @param {string} code - Code to analyze
     * @param {string} language - Programming language
     * @returns {string} General feedback
     */
    getGeneralCodeFeedback(code, language) {
        // Very simplified analysis for demo purposes
        let feedback = "";
        
        // Check code complexity (simplistic)
        const lineCount = code.split('\n').length;
        const complexityLevel = lineCount < 10 ? "simple" : lineCount < 30 ? "moderate" : "complex";
        
        feedback += `- This appears to be a ${complexityLevel} ${language} script with approximately ${lineCount} lines of code.\n`;
        
        // Check for comments
        const commentLines = language === 'javascript' ? 
            (code.match(/\/\/.*$/gm) || []).length + (code.match(/\/\*[\s\S]*?\*\//g) || []).length :
            language === 'python' ? 
                (code.match(/#.*$/gm) || []).length + (code.match(/"""[\s\S]*?"""/g) || []).length :
                0;
        
        const commentRatio = commentLines / lineCount;
        if (commentRatio < 0.1) {
            feedback += "- The code has relatively few comments. Adding more comments would improve readability and maintainability.\n";
        } else if (commentRatio > 0.3) {
            feedback += "- The code is well-commented, which is excellent for readability and maintenance.\n";
        }
        
        // Check for potential function length issues
        if (language === 'javascript') {
            const functionMatches = code.match(/function\s+\w+\s*\([^)]*\)\s*{[\s\S]*?}/g) || [];
            for (const fn of functionMatches) {
                const fnLines = fn.split('\n').length;
                if (fnLines > 20) {
                    feedback += "- Some functions appear quite long. Consider breaking down large functions into smaller, more focused ones for better maintainability.\n";
                    break;
                }
            }
        } else if (language === 'python') {
            const functionMatches = code.match(/def\s+\w+\s*\([^)]*\)[\s\S]*?(?=\n\S|$)/g) || [];
            for (const fn of functionMatches) {
                const fnLines = fn.split('\n').length;
                if (fnLines > 20) {
                    feedback += "- Some functions appear quite long. Consider breaking down large functions into smaller, more focused ones for better maintainability.\n";
                    break;
                }
            }
        }
        
        return feedback;
    }
    
    /**
     * Get language-specific best practices suggestions
     * @param {string} language - Programming language
     * @returns {string} Best practices suggestions
     */
    getBestPracticesSuggestions(language) {
        switch (language) {
            case 'javascript':
                return "1. Use `const` for variables that don't change\n2. Prefer `let` over `var` for better scoping\n3. Use template literals for string concatenation\n4. Use async/await instead of plain promises for better readability\n5. Add proper error handling with try/catch blocks";
                
            case 'python':
                return "1. Follow PEP 8 style guidelines\n2. Use list comprehensions for concise code\n3. Utilize context managers (with statements) for resource management\n4. Use virtual environments for dependency management\n5. Write meaningful docstrings for functions and classes";
                
            case 'java':
                return "1. Follow Java naming conventions (camelCase for variables/methods, PascalCase for classes)\n2. Use proper exception handling\n3. Implement proper resource closing with try-with-resources\n4. Use the enhanced for loop when possible\n5. Leverage Java's type system for better code safety";
                
            case 'csharp':
                return "1. Use C# naming conventions (PascalCase for public members)\n2. Leverage LINQ for data operations\n3. Use properties instead of direct field access\n4. Implement proper IDisposable pattern\n5. Use the 'var' keyword when the type is obvious";
                
            default:
                return "1. Use consistent formatting and indentation\n2. Add meaningful comments to explain complex logic\n3. Follow the language's standard naming conventions\n4. Break down complex functions into smaller ones\n5. Write tests for your code to catch issues early";
        }
    }
    
    /**
     * Get language-specific best practices
     * @param {string} language - Programming language
     * @returns {string} Best practices
     */
    getLanguageBestPractices(language) {
        switch (language) {
            case 'javascript':
                return "### JavaScript Best Practices:\n\n" +
                    "1. **Use strict mode**: Add `'use strict';` at the top of your files\n" +
                    "2. **Prefer const/let over var**: They provide better scoping rules\n" +
                    "3. **Use template literals**: `Hello ${name}` is more readable than concatenation\n" +
                    "4. **Handle promise rejections**: Always include .catch() or use try/await with async/await\n" +
                    "5. **Avoid global variables**: Encapsulate code in modules or functions\n" +
                    "6. **Use linting tools**: ESLint helps catch common mistakes\n" +
                    "7. **Use modern features**: Arrow functions, destructuring, and spread syntax make code cleaner\n" +
                    "8. **Validate inputs**: Always check function parameters for expected types/values";
                    
            case 'python':
                return "### Python Best Practices:\n\n" +
                    "1. **Follow PEP 8**: Python's style guide for consistent, readable code\n" +
                    "2. **Use virtual environments**: Keep dependencies isolated per project\n" +
                    "3. **Write docstrings**: Document your functions and classes properly\n" +
                    "4. **Use list comprehensions** when appropriate for cleaner, faster code\n" +
                    "5. **Leverage context managers**: Use `with` statements for resource management\n" +
                    "6. **Type hints**: Add type annotations for better code clarity (Python 3.5+)\n" +
                    "7. **Use proper exception handling**: Catch specific exceptions rather than generic ones\n" +
                    "8. **Avoid mutable default arguments**: Never use `def func(arg=[])`, use `None` instead";
            
            default:
                return `I can provide best practices for ${language} programming. Please specify what aspects you're interested in (e.g., code organization, performance, error handling).`;
        }
    }
    
    /**
     * Get language-specific suggestions for user
     * @param {string} language - Programming language
     * @returns {Array<string>} Language-specific suggestions
     */
    getLanguageSpecificSuggestions(language) {
        // Base suggestions
        const baseSuggestions = [
            `How do I debug a ${language} application?`,
            `What are common bugs in ${language}?`,
            `Explain this error message in ${language}`
        ];
        
        // Language-specific suggestions
        const specificSuggestions = {
            javascript: [
                "How do I use the JavaScript debugger in Chrome?",
                "What's wrong with my async/await code?",
                "Debug my React component",
                "How do I fix 'undefined is not a function'?"
            ],
            python: [
                "How do I debug my Django application?",
                "Fix my Python indentation errors",
                "What's causing this ImportError?",
                "Debug my Pandas DataFrame code"
            ],
            java: [
                "Debug my Spring Boot application",
                "What does this NullPointerException mean?",
                "How to fix OutOfMemoryError in Java",
                "Debug my Android application"
            ]
        };
        
        // Combine base suggestions with language-specific ones
        const combinedSuggestions = [
            ...baseSuggestions,
            ...(specificSuggestions[language] || [])
        ];
        
        // Shuffle and return 3 suggestions
        return combinedSuggestions
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
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
                'jaat-mode04-preferences',
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
            localStorage.removeItem('jaat-mode04-history');
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
    window.jaatAIModes.codeDebugger = new CodeDebuggerMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeDebuggerMode;
}
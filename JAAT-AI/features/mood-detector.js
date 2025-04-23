/**
 * JAAT-AI Mood Detector Feature
 * Analyze user messages to detect mood and sentiment, adapting the UI and responses accordingly
 */

class MoodDetector {
    constructor() {
        // Supported moods with associated emotions and keywords
        this.moods = [
            {
                id: 'happy',
                name: 'Happy',
                emoji: '😊',
                color: '#4ade80',
                keywords: [
                    'happy', 'glad', 'excited', 'thrilled', 'delighted', 'joyful', 'pleased',
                    'cheerful', 'content', 'satisfied', 'enjoy', 'loving', 'wonderful', 'great',
                    'excellent', 'amazing', 'fantastic', 'awesome', 'superb', 'terrific', 'love',
                    'yay', 'hooray', 'woohoo', 'hurray', ':)', ':-)', ':D', ':-D'
                ],
                negation: false
            },
            {
                id: 'sad',
                name: 'Sad',
                emoji: '😢',
                color: '#60a5fa',
                keywords: [
                    'sad', 'unhappy', 'miserable', 'depressed', 'down', 'upset', 'blue',
                    'gloomy', 'somber', 'melancholy', 'disappointed', 'disheartened', 'heartbroken',
                    'grief', 'sorrow', 'regret', 'miss', 'hurt', 'crying', 'tears', 'lonely',
                    'alone', 'abandoned', ':(', ':-(', '😢', '😭'
                ],
                negation: false
            },
            {
                id: 'angry',
                name: 'Angry',
                emoji: '😠',
                color: '#f87171',
                keywords: [
                    'angry', 'mad', 'furious', 'outraged', 'upset', 'annoyed', 'irritated',
                    'irate', 'enraged', 'exasperated', 'livid', 'infuriated', 'cross',
                    'hate', 'frustrated', 'fuming', 'raging', 'hostile', 'hate', 'dislike',
                    'resent', 'despise', 'loathe', '😠', '😡', '>:(', '>:-('
                ],
                negation: false
            },
            {
                id: 'anxious',
                name: 'Anxious',
                emoji: '😟',
                color: '#fbbf24',
                keywords: [
                    'anxious', 'worried', 'nervous', 'afraid', 'scared', 'frightened', 'fearful',
                    'terrified', 'concerned', 'apprehensive', 'uneasy', 'tense', 'stressed',
                    'overwhelmed', 'panic', 'dread', 'scared', 'stress', 'trouble', 'alarmed',
                    'terror', 'horror', 'disturbed', 'worried', 'uncertainty', 'doubt'
                ],
                negation: false
            },
            {
                id: 'surprised',
                name: 'Surprised',
                emoji: '😲',
                color: '#c084fc',
                keywords: [
                    'surprised', 'shocked', 'astonished', 'amazed', 'astounded', 'stunned',
                    'speechless', 'startled', 'taken aback', 'dumbfounded', 'flabbergasted',
                    'unexpected', 'wow', 'whoa', 'oh my', 'gosh', 'really', 'seriously',
                    'unbelievable', 'incredible', 'omg', 'seriously', '😲', '😮', '😯'
                ],
                negation: false
            },
            {
                id: 'confused',
                name: 'Confused',
                emoji: '😕',
                color: '#f59e0b',
                keywords: [
                    'confused', 'puzzled', 'perplexed', 'bewildered', 'baffled', 'disoriented',
                    'uncertain', 'unsure', 'doubtful', 'hesitant', 'ambivalent', 'undecided',
                    'unclear', 'lost', 'clueless', 'dazed', 'not sure', 'misunderstand',
                    'don\'t understand', 'don\'t get it', 'what?', 'huh?', '🤔', '😕'
                ],
                negation: false
            },
            {
                id: 'neutral',
                name: 'Neutral',
                emoji: '😐',
                color: '#94a3b8',
                keywords: [
                    'ok', 'okay', 'fine', 'alright', 'neutral', 'average', 'normal', 'meh',
                    'mediocre', 'indifferent', 'impartial', 'neither', 'so-so', 'standard',
                    'ordinary', 'regular', 'typical', 'usual', 'basic', ':|', ':-|'
                ],
                negation: false
            }
        ];
        
        // Negation words to detect when a mood is being negated
        this.negationWords = [
            'not', 'no', 'never', 'don\'t', 'doesn\'t', 'didn\'t', 'isn\'t', 'aren\'t', 'wasn\'t',
            'weren\'t', 'haven\'t', 'hasn\'t', 'hadn\'t', 'won\'t', 'wouldn\'t', 'shouldn\'t',
            'can\'t', 'cannot', 'couldn\'t', 'nothing', 'nobody'
        ];
        
        // Intensity modifiers to detect strength of mood
        this.intensityModifiers = {
            high: ['very', 'extremely', 'really', 'so', 'incredibly', 'absolutely', 'totally', 'completely'],
            low: ['slightly', 'somewhat', 'a bit', 'a little', 'kind of', 'kinda', 'sort of', 'barely']
        };
        
        // Default mood
        this.defaultMood = 'neutral';
        
        // Current user mood
        this.currentMood = this.defaultMood;
        
        // Mood history
        this.moodHistory = [];
        
        // Max mood history entries
        this.maxMoodHistoryEntries = 100;
        
        // Confidence threshold for mood detection
        this.confidenceThreshold = 0.5;
        
        // Storage key
        this.storageKey = 'jaat-user-mood-data';
        
        // Callback for mood change
        this.onMoodChange = null;
        
        // Callback for UI adaptation
        this.onUIAdaptation = null;
    }

    /**
     * Initialize mood detector
     * @param {Object} options - Configuration options
     * @returns {MoodDetector} This instance
     */
    init(options = {}) {
        // Apply custom options
        if (options.defaultMood && this.getMoodById(options.defaultMood)) {
            this.defaultMood = options.defaultMood;
            this.currentMood = options.defaultMood;
        }
        
        if (typeof options.confidenceThreshold === 'number') {
            this.confidenceThreshold = Math.max(0, Math.min(1, options.confidenceThreshold));
        }
        
        if (typeof options.maxMoodHistoryEntries === 'number') {
            this.maxMoodHistoryEntries = options.maxMoodHistoryEntries;
        }
        
        if (typeof options.onMoodChange === 'function') {
            this.onMoodChange = options.onMoodChange;
        }
        
        if (typeof options.onUIAdaptation === 'function') {
            this.onUIAdaptation = options.onUIAdaptation;
        }
        
        // Load mood data from storage
        this.loadMoodData();
        
        console.log('Mood Detector initialized with mood:', this.currentMood);
        return this;
    }

    /**
     * Load mood data from localStorage
     */
    loadMoodData() {
        try {
            const savedData = localStorage.getItem(this.storageKey);
            if (savedData) {
                const data = JSON.parse(savedData);
                
                if (data.currentMood && this.getMoodById(data.currentMood)) {
                    this.currentMood = data.currentMood;
                }
                
                if (Array.isArray(data.moodHistory)) {
                    this.moodHistory = data.moodHistory;
                }
            }
        } catch (error) {
            console.error('Error loading mood data:', error);
        }
    }

    /**
     * Save mood data to localStorage
     */
    saveMoodData() {
        try {
            const data = {
                currentMood: this.currentMood,
                moodHistory: this.moodHistory
            };
            
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving mood data:', error);
        }
    }

    /**
     * Get mood object by ID
     * @param {string} id - Mood ID
     * @returns {Object|null} Mood object or null if not found
     */
    getMoodById(id) {
        return this.moods.find(mood => mood.id === id) || null;
    }

    /**
     * Analyze text to detect mood
     * @param {string} text - Text to analyze
     * @returns {Object} Analysis result with mood, confidence, etc.
     */
    analyzeText(text) {
        if (!text || typeof text !== 'string') {
            return {
                mood: this.defaultMood,
                previousMood: this.currentMood,
                confidence: 0,
                moodChanged: false,
                text
            };
        }
        
        // Normalize text
        const normalizedText = text.toLowerCase().trim();
        
        // Split into words
        const words = normalizedText.split(/\s+/);
        
        // Detect negation patterns
        const negationIndices = this.detectNegation(words);
        
        // Initialize scores for each mood
        const scores = {};
        this.moods.forEach(mood => {
            scores[mood.id] = 0;
        });
        
        // Calculate score for each mood based on keywords
        words.forEach((word, index) => {
            // Check if word is in negation context
            const isNegated = negationIndices.some(negIndex => {
                // Consider words up to 3 positions after negation
                return index > negIndex && index <= negIndex + 3;
            });
            
            // Check each mood's keywords
            this.moods.forEach(mood => {
                // Check if the word is a keyword for this mood
                if (mood.keywords.some(keyword => {
                    // For multi-word keywords, check if they exist in the original text
                    if (keyword.includes(' ')) {
                        return normalizedText.includes(keyword);
                    }
                    
                    // For emojis and symbols, do exact match
                    if (keyword.length < 3 || keyword.match(/[^\w\s]/)) {
                        return word === keyword;
                    }
                    
                    // For regular words, check if word starts with the keyword
                    // This handles variations (e.g., "happy" matches "happily")
                    return word === keyword || 
                           word.startsWith(keyword + 'ly') || 
                           word.startsWith(keyword + 'ing') || 
                           word.startsWith(keyword + 'ed') || 
                           word.startsWith(keyword + 's');
                })) {
                    // Calculate base score for match
                    let score = 1;
                    
                    // Check for intensity modifiers
                    if (index > 0) {
                        const prevWord = words[index - 1];
                        
                        if (this.intensityModifiers.high.includes(prevWord)) {
                            score = 2;
                        } else if (this.intensityModifiers.low.includes(prevWord)) {
                            score = 0.5;
                        }
                    }
                    
                    // If negated, apply to the opposite mood or reduce score
                    if (isNegated) {
                        // For example, "not happy" could mean "sad"
                        if (mood.id === 'happy') {
                            scores['sad'] += score;
                        } else if (mood.id === 'sad') {
                            scores['neutral'] += score;
                        } else {
                            // For other moods, just reduce the score
                            scores[mood.id] -= score;
                        }
                    } else {
                        // Add score to the mood
                        scores[mood.id] += score;
                    }
                }
            });
        });
        
        // Find the mood with the highest score
        let highestScore = -Infinity;
        let detectedMood = this.defaultMood;
        
        Object.entries(scores).forEach(([moodId, score]) => {
            if (score > highestScore) {
                highestScore = score;
                detectedMood = moodId;
            }
        });
        
        // Calculate confidence (normalize score)
        let confidence = 0;
        
        if (highestScore > 0) {
            // Normalize with a sigmoid-like function to get value between 0 and 1
            confidence = 1 / (1 + Math.exp(-highestScore + 1));
        }
        
        // If confidence is below threshold, use current mood
        if (confidence < this.confidenceThreshold) {
            detectedMood = this.currentMood;
        }
        
        // Check if mood has changed
        const moodChanged = detectedMood !== this.currentMood;
        
        // Update current mood
        const previousMood = this.currentMood;
        this.currentMood = detectedMood;
        
        // Add to history
        this.addToMoodHistory(detectedMood, confidence, text);
        
        // Save mood data
        this.saveMoodData();
        
        // Call mood change callback if provided
        if (moodChanged && this.onMoodChange) {
            this.onMoodChange(detectedMood, previousMood, confidence);
        }
        
        // Apply UI adaptations if provided
        if (this.onUIAdaptation) {
            this.onUIAdaptation(detectedMood, confidence);
        }
        
        // Return analysis result
        return {
            mood: detectedMood,
            previousMood,
            confidence,
            moodChanged,
            text,
            scores
        };
    }

    /**
     * Detect negation patterns in words
     * @param {Array<string>} words - Array of words
     * @returns {Array<number>} Indices of negation words
     */
    detectNegation(words) {
        const negationIndices = [];
        
        words.forEach((word, index) => {
            if (this.negationWords.includes(word)) {
                negationIndices.push(index);
            }
        });
        
        return negationIndices;
    }

    /**
     * Add mood to history
     * @param {string} moodId - Mood ID
     * @param {number} confidence - Detection confidence
     * @param {string} text - Text that triggered the mood
     */
    addToMoodHistory(moodId, confidence, text) {
        // Create history entry
        const entry = {
            mood: moodId,
            confidence,
            text: text.substring(0, 100), // Limit text length
            timestamp: new Date().toISOString()
        };
        
        // Add to history
        this.moodHistory.unshift(entry);
        
        // Trim history if exceeds max entries
        if (this.moodHistory.length > this.maxMoodHistoryEntries) {
            this.moodHistory = this.moodHistory.slice(0, this.maxMoodHistoryEntries);
        }
    }

    /**
     * Manually set user mood
     * @param {string} moodId - Mood ID
     * @returns {boolean} Whether the mood was set successfully
     */
    setMood(moodId) {
        // Check if mood exists
        if (!this.getMoodById(moodId)) {
            console.warn(`Invalid mood: ${moodId}`);
            return false;
        }
        
        // Update current mood
        const previousMood = this.currentMood;
        this.currentMood = moodId;
        
        // Add to history with manual flag
        this.addToMoodHistory(moodId, 1, '[Manually set]');
        
        // Save mood data
        this.saveMoodData();
        
        // Call mood change callback if provided
        if (this.onMoodChange && previousMood !== moodId) {
            this.onMoodChange(moodId, previousMood, 1);
        }
        
        // Apply UI adaptations if provided
        if (this.onUIAdaptation) {
            this.onUIAdaptation(moodId, 1);
        }
        
        return true;
    }

    /**
     * Reset mood to default
     */
    resetMood() {
        this.setMood(this.defaultMood);
    }

    /**
     * Get current mood object
     * @returns {Object} Current mood object
     */
    getCurrentMood() {
        return this.getMoodById(this.currentMood) || this.getMoodById(this.defaultMood);
    }

    /**
     * Get mood history
     * @param {number} limit - Maximum number of entries to return
     * @returns {Array} Mood history entries
     */
    getMoodHistory(limit = 10) {
        return this.moodHistory.slice(0, limit);
    }

    /**
     * Clear mood history
     */
    clearMoodHistory() {
        this.moodHistory = [];
        this.saveMoodData();
    }

    /**
     * Apply mood-based UI adaptations
     * @param {string} moodId - Mood ID to apply
     * @param {HTMLElement} container - Container element to adapt
     */
    applyMoodUI(moodId, container = document.body) {
        const mood = this.getMoodById(moodId) || this.getMoodById(this.defaultMood);
        
        // Remove previous mood classes
        this.moods.forEach(m => {
            container.classList.remove(`mood-${m.id}`);
        });
        
        // Add current mood class
        container.classList.add(`mood-${mood.id}`);
        
        // Set mood color as CSS variable
        container.style.setProperty('--mood-color', mood.color);
        
        // Add mood indicator if not already present
        let moodIndicator = container.querySelector('.mood-indicator');
        
        if (!moodIndicator) {
            moodIndicator = document.createElement('div');
            moodIndicator.className = 'mood-indicator';
            
            // Determine where to add the indicator
            const header = container.querySelector('.header, .chat-header, header');
            if (header) {
                header.appendChild(moodIndicator);
            } else {
                // Add to top-right of container
                moodIndicator.style.position = 'absolute';
                moodIndicator.style.top = '10px';
                moodIndicator.style.right = '10px';
                container.appendChild(moodIndicator);
            }
        }
        
        // Update mood indicator
        moodIndicator.innerHTML = `
            <span class="mood-emoji">${mood.emoji}</span>
            <span class="mood-name">${mood.name}</span>
        `;
        
        // Additional UI adaptations based on mood
        switch (mood.id) {
            case 'happy':
                // Brighter, more vibrant UI
                container.style.setProperty('--mood-brightness', '1.1');
                container.style.setProperty('--mood-saturation', '1.2');
                break;
                
            case 'sad':
                // Muted, slightly darker UI
                container.style.setProperty('--mood-brightness', '0.9');
                container.style.setProperty('--mood-saturation', '0.8');
                break;
                
            case 'angry':
                // High contrast, slightly warmer
                container.style.setProperty('--mood-brightness', '1');
                container.style.setProperty('--mood-saturation', '1.1');
                container.style.setProperty('--mood-temperature', '1.1');
                break;
                
            case 'anxious':
                // Slightly muted, cooler tones
                container.style.setProperty('--mood-brightness', '0.95');
                container.style.setProperty('--mood-saturation', '0.9');
                container.style.setProperty('--mood-temperature', '0.9');
                break;
                
            default:
                // Reset to neutral
                container.style.setProperty('--mood-brightness', '1');
                container.style.setProperty('--mood-saturation', '1');
                container.style.setProperty('--mood-temperature', '1');
                break;
        }
    }

    /**
     * Generate mood-based response adaptations
     * @param {string} baseResponse - Original response text
     * @param {string} moodId - Mood ID
     * @returns {string} Adapted response
     */
    adaptResponse(baseResponse, moodId = null) {
        const mood = this.getMoodById(moodId || this.currentMood) || this.getMoodById(this.defaultMood);
        
        // Skip adaptation for neutral mood
        if (mood.id === 'neutral') {
            return baseResponse;
        }
        
        // Adaptation based on mood
        let adaptedResponse = baseResponse;
        
        switch (mood.id) {
            case 'happy':
                // More enthusiastic, positive language
                adaptedResponse = this.addPositiveEmphasis(baseResponse);
                break;
                
            case 'sad':
                // More empathetic, supportive language
                adaptedResponse = this.addEmpathyEmphasis(baseResponse);
                break;
                
            case 'angry':
                // Calming, solution-focused language
                adaptedResponse = this.addCalmmingEmphasis(baseResponse);
                break;
                
            case 'anxious':
                // Reassuring, clear language
                adaptedResponse = this.addReassuranceEmphasis(baseResponse);
                break;
                
            case 'confused':
                // Clearer explanations, simplified language
                adaptedResponse = this.addClarityEmphasis(baseResponse);
                break;
        }
        
        return adaptedResponse;
    }

    /**
     * Add positive emphasis to text
     * @param {string} text - Original text
     * @returns {string} Text with positive emphasis
     */
    addPositiveEmphasis(text) {
        // Split into sentences
        const sentences = text.split(/(?<=[.!?])\s+/);
        
        // Positive interjections to possibly add
        const positiveInterjections = [
            'Great!',
            'Excellent!',
            'Awesome!',
            'Fantastic!',
            'Wonderful!'
        ];
        
        // Positive emphasis phrases to possibly add
        const positiveEmphasis = [
            ' This is exciting! ',
            ' I\'m thrilled to share this with you! ',
            ' This is really fun! ',
            ' I\'m happy to help with this! '
        ];
        
        // Process sentences
        let result = sentences.map((sentence, index) => {
            // For the first or last sentence, possibly add an interjection
            if ((index === 0 || index === sentences.length - 1) && Math.random() < 0.3) {
                const interjection = positiveInterjections[Math.floor(Math.random() * positiveInterjections.length)];
                
                if (index === 0) {
                    return `${interjection} ${sentence}`;
                } else {
                    return `${sentence} ${interjection}`;
                }
            }
            
            // For a middle sentence, possibly add emphasis
            if (index > 0 && index < sentences.length - 1 && sentences.length > 2 && Math.random() < 0.2) {
                const emphasis = positiveEmphasis[Math.floor(Math.random() * positiveEmphasis.length)];
                return sentence + emphasis;
            }
            
            return sentence;
        }).join(' ');
        
        // Add a positive emoji at the end ~30% of the time
        if (Math.random() < 0.3) {
            const happyEmojis = ['😊', '😄', '🙂', '👍', '✨'];
            const emoji = happyEmojis[Math.floor(Math.random() * happyEmojis.length)];
            result += ` ${emoji}`;
        }
        
        return result;
    }

    /**
     * Add empathy emphasis to text
     * @param {string} text - Original text
     * @returns {string} Text with empathy emphasis
     */
    addEmpathyEmphasis(text) {
        // Split into sentences
        const sentences = text.split(/(?<=[.!?])\s+/);
        
        // Empathetic interjections to possibly add
        const empatheticInterjections = [
            'I understand.',
            'I hear you.',
            'That sounds difficult.',
            'I know this can be challenging.'
        ];
        
        // Empathetic emphasis phrases to possibly add
        const empatheticEmphasis = [
            ' I hope this helps you feel better. ',
            ' Remember, it\'s okay to feel this way. ',
            ' Let me know if you need more support. ',
            ' We\'ll work through this together. '
        ];
        
        // Process sentences
        let result = sentences.map((sentence, index) => {
            // For the first sentence, possibly add an interjection
            if (index === 0 && Math.random() < 0.4) {
                const interjection = empatheticInterjections[Math.floor(Math.random() * empatheticInterjections.length)];
                return `${interjection} ${sentence}`;
            }
            
            // For the last sentence, possibly add emphasis
            if (index === sentences.length - 1 && Math.random() < 0.4) {
                const emphasis = empatheticEmphasis[Math.floor(Math.random() * empatheticEmphasis.length)];
                return sentence + emphasis;
            }
            
            return sentence;
        }).join(' ');
        
        return result;
    }

    /**
     * Add calming emphasis to text
     * @param {string} text - Original text
     * @returns {string} Text with calming emphasis
     */
    addCalmmingEmphasis(text) {
        // Split into sentences
        const sentences = text.split(/(?<=[.!?])\s+/);
        
        // Calming interjections to possibly add
        const calmingInterjections = [
            'I understand your concern.',
            'Let\'s take a step back.',
            'I see your point.',
            'I appreciate your feedback.'
        ];
        
        // Process sentences
        let result = sentences.map((sentence, index) => {
            // For the first sentence, possibly add a calming interjection
            if (index === 0 && Math.random() < 0.5) {
                const interjection = calmingInterjections[Math.floor(Math.random() * calmingInterjections.length)];
                return `${interjection} ${sentence}`;
            }
            
            return sentence;
        }).join(' ');
        
        // Add a constructive closing statement
        if (Math.random() < 0.4) {
            const closings = [
                ' Let me know if this addresses your concern.',
                ' I hope this helps clarify things.',
                ' Please let me know if you have any other questions.',
                ' I\'m here to help resolve this.'
            ];
            
            const closing = closings[Math.floor(Math.random() * closings.length)];
            result += closing;
        }
        
        return result;
    }

    /**
     * Add reassurance emphasis to text
     * @param {string} text - Original text
     * @returns {string} Text with reassurance emphasis
     */
    addReassuranceEmphasis(text) {
        // Split into sentences
        const sentences = text.split(/(?<=[.!?])\s+/);
        
        // Reassuring phrases to possibly add
        const reassuringPhrases = [
            'Don\'t worry, ',
            'Rest assured, ',
            'You\'re on the right track. ',
            'This is actually simpler than it might seem. '
        ];
        
        // Process sentences
        let result = sentences.map((sentence, index) => {
            // For the first sentence, possibly add reassurance
            if (index === 0 && Math.random() < 0.5) {
                const phrase = reassuringPhrases[Math.floor(Math.random() * reassuringPhrases.length)];
                return `${phrase}${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
            }
            
            return sentence;
        }).join(' ');
        
        // Add a reassuring closing statement
        if (Math.random() < 0.3) {
            const closings = [
                ' Take your time with this.',
                ' There\'s no rush, we\'ll figure this out.',
                ' One step at a time.',
                ' You\'re doing great.'
            ];
            
            const closing = closings[Math.floor(Math.random() * closings.length)];
            result += closing;
        }
        
        return result;
    }

    /**
     * Add clarity emphasis to text
     * @param {string} text - Original text
     * @returns {string} Text with clarity emphasis
     */
    addClarityEmphasis(text) {
        // Split into sentences
        const sentences = text.split(/(?<=[.!?])\s+/);
        
        // Clarity phrases to possibly add
        const clarityPhrases = [
            'To clarify, ',
            'In simple terms, ',
            'To put it simply, ',
            'Here\'s the key point: '
        ];
        
        // Process sentences
        let result = sentences.map((sentence, index) => {
            // For an important sentence, add clarity emphasis
            if (sentence.length > 40 && Math.random() < 0.3) {
                const phrase = clarityPhrases[Math.floor(Math.random() * clarityPhrases.length)];
                return `${phrase}${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
            }
            
            return sentence;
        }).join(' ');
        
        // Add a summarizing statement
        if (sentences.length > 3 && Math.random() < 0.4) {
            const summaries = [
                ' To summarize: ',
                ' The main takeaway is: ',
                ' In short: ',
                ' The key points to remember are: '
            ];
            
            const summary = summaries[Math.floor(Math.random() * summaries.length)];
            result += summary;
        }
        
        return result;
    }

    /**
     * Create mood detector UI
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
        uiContainer.className = 'mood-detector-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'mood-detector-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'mood-detector-title';
        title.textContent = 'Mood Detection';
        header.appendChild(title);
        
        // Create current mood display
        const currentMoodSection = document.createElement('div');
        currentMoodSection.className = 'mood-detector-section';
        uiContainer.appendChild(currentMoodSection);
        
        const currentMoodTitle = document.createElement('h4');
        currentMoodTitle.className = 'section-title';
        currentMoodTitle.textContent = 'Current Mood';
        currentMoodSection.appendChild(currentMoodTitle);
        
        const currentMoodDisplay = document.createElement('div');
        currentMoodDisplay.className = 'current-mood-display';
        currentMoodSection.appendChild(currentMoodDisplay);
        
        // Create mood selector
        const moodSelectorSection = document.createElement('div');
        moodSelectorSection.className = 'mood-detector-section';
        uiContainer.appendChild(moodSelectorSection);
        
        const moodSelectorTitle = document.createElement('h4');
        moodSelectorTitle.className = 'section-title';
        moodSelectorTitle.textContent = 'Select Your Mood';
        moodSelectorSection.appendChild(moodSelectorTitle);
        
        const moodSelector = document.createElement('div');
        moodSelector.className = 'mood-selector';
        moodSelectorSection.appendChild(moodSelector);
        
        // Add mood options
        this.moods.forEach(mood => {
            const moodOption = document.createElement('button');
            moodOption.className = 'mood-option';
            moodOption.dataset.mood = mood.id;
            
            if (mood.id === this.currentMood) {
                moodOption.classList.add('active');
            }
            
            moodOption.innerHTML = `
                <span class="mood-emoji">${mood.emoji}</span>
                <span class="mood-name">${mood.name}</span>
            `;
            
            // Add click handler
            moodOption.addEventListener('click', () => {
                // Set mood
                this.setMood(mood.id);
                
                // Update UI
                updateCurrentMoodDisplay();
                
                // Update active state
                moodSelector.querySelectorAll('.mood-option').forEach(option => {
                    option.classList.remove('active');
                });
                moodOption.classList.add('active');
            });
            
            moodSelector.appendChild(moodOption);
        });
        
        // Create mood history section
        const historySection = document.createElement('div');
        historySection.className = 'mood-detector-section';
        uiContainer.appendChild(historySection);
        
        const historyTitle = document.createElement('h4');
        historyTitle.className = 'section-title';
        historyTitle.textContent = 'Mood History';
        historySection.appendChild(historyTitle);
        
        const historyList = document.createElement('div');
        historyList.className = 'mood-history-list';
        historySection.appendChild(historyList);
        
        // Create settings section
        const settingsSection = document.createElement('div');
        settingsSection.className = 'mood-detector-section';
        uiContainer.appendChild(settingsSection);
        
        const settingsTitle = document.createElement('h4');
        settingsTitle.className = 'section-title';
        settingsTitle.textContent = 'Settings';
        settingsSection.appendChild(settingsTitle);
        
        const settingsForm = document.createElement('div');
        settingsForm.className = 'mood-settings-form';
        settingsSection.appendChild(settingsForm);
        
        // Confidence threshold setting
        const thresholdContainer = document.createElement('div');
        thresholdContainer.className = 'settings-group';
        settingsForm.appendChild(thresholdContainer);
        
        const thresholdLabel = document.createElement('label');
        thresholdLabel.textContent = 'Detection Sensitivity:';
        thresholdContainer.appendChild(thresholdLabel);
        
        const thresholdSlider = document.createElement('input');
        thresholdSlider.type = 'range';
        thresholdSlider.min = '0.1';
        thresholdSlider.max = '0.9';
        thresholdSlider.step = '0.1';
        thresholdSlider.value = this.confidenceThreshold.toString();
        thresholdContainer.appendChild(thresholdSlider);
        
        const thresholdValue = document.createElement('span');
        thresholdValue.className = 'threshold-value';
        thresholdValue.textContent = `${Math.round(this.confidenceThreshold * 100)}%`;
        thresholdContainer.appendChild(thresholdValue);
        
        // Clear history button
        const clearHistoryButton = document.createElement('button');
        clearHistoryButton.className = 'clear-history-button';
        clearHistoryButton.textContent = 'Clear Mood History';
        settingsForm.appendChild(clearHistoryButton);
        
        // Update current mood display
        const updateCurrentMoodDisplay = () => {
            const mood = this.getCurrentMood();
            
            currentMoodDisplay.innerHTML = `
                <div class="current-mood-emoji" style="background-color: ${mood.color}">
                    ${mood.emoji}
                </div>
                <div class="current-mood-info">
                    <div class="current-mood-name">${mood.name}</div>
                    <div class="current-mood-desc">AI responses will adapt to your mood</div>
                </div>
            `;
        };
        
        // Update mood history list
        const updateMoodHistory = () => {
            historyList.innerHTML = '';
            
            const history = this.getMoodHistory(5);
            
            if (history.length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'mood-history-empty';
                emptyState.textContent = 'No mood history yet';
                historyList.appendChild(emptyState);
                return;
            }
            
            history.forEach(entry => {
                const mood = this.getMoodById(entry.mood);
                if (!mood) return;
                
                const historyItem = document.createElement('div');
                historyItem.className = 'mood-history-item';
                
                const itemContent = document.createElement('div');
                itemContent.className = 'mood-history-content';
                
                const itemEmoji = document.createElement('span');
                itemEmoji.className = 'mood-history-emoji';
                itemEmoji.style.backgroundColor = mood.color;
                itemEmoji.textContent = mood.emoji;
                itemContent.appendChild(itemEmoji);
                
                const itemInfo = document.createElement('div');
                itemInfo.className = 'mood-history-info';
                
                const itemHeader = document.createElement('div');
                itemHeader.className = 'mood-history-header';
                
                const itemName = document.createElement('span');
                itemName.className = 'mood-history-name';
                itemName.textContent = mood.name;
                itemHeader.appendChild(itemName);
                
                const itemTime = document.createElement('span');
                itemTime.className = 'mood-history-time';
                
                // Format time
                const date = new Date(entry.timestamp);
                const now = new Date();
                const diffMs = now.getTime() - date.getTime();
                const diffMins = Math.round(diffMs / (1000 * 60));
                
                if (diffMins < 1) {
                    itemTime.textContent = 'just now';
                } else if (diffMins < 60) {
                    itemTime.textContent = `${diffMins}m ago`;
                } else if (diffMins < 24 * 60) {
                    itemTime.textContent = `${Math.round(diffMins / 60)}h ago`;
                } else {
                    itemTime.textContent = `${Math.round(diffMins / (60 * 24))}d ago`;
                }
                
                itemHeader.appendChild(itemTime);
                itemInfo.appendChild(itemHeader);
                
                if (entry.text) {
                    const itemText = document.createElement('div');
                    itemText.className = 'mood-history-text';
                    itemText.textContent = entry.text;
                    itemInfo.appendChild(itemText);
                }
                
                itemContent.appendChild(itemInfo);
                historyItem.appendChild(itemContent);
                
                historyList.appendChild(historyItem);
            });
        };
        
        // Add event listeners
        
        // Threshold slider
        thresholdSlider.addEventListener('input', () => {
            const value = parseFloat(thresholdSlider.value);
            this.confidenceThreshold = value;
            thresholdValue.textContent = `${Math.round(value * 100)}%`;
        });
        
        // Clear history button
        clearHistoryButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear mood history?')) {
                this.clearMoodHistory();
                updateMoodHistory();
            }
        });
        
        // Initial updates
        updateCurrentMoodDisplay();
        updateMoodHistory();
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles
     */
    addUIStyles() {
        const styleId = 'mood-detector-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .mood-detector-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .mood-detector-header {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .mood-detector-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .mood-detector-section {
                margin-bottom: 1.5rem;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .section-title {
                font-size: 1rem;
                font-weight: 600;
                margin: 0 0 1rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .current-mood-display {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .current-mood-emoji {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                color: white;
            }
            
            .current-mood-info {
                flex: 1;
            }
            
            .current-mood-name {
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 0.25rem;
            }
            
            .current-mood-desc {
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .mood-selector {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 0.75rem;
            }
            
            .mood-option {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .mood-option:hover {
                transform: translateY(-2px);
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .mood-option.active {
                border-color: var(--accent-primary, #7c3aed);
                background-color: rgba(124, 58, 237, 0.1);
            }
            
            .mood-emoji {
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
            }
            
            .mood-name {
                font-size: 0.75rem;
                text-align: center;
            }
            
            .mood-history-list {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                max-height: 300px;
                overflow-y: auto;
            }
            
            .mood-history-item {
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                overflow: hidden;
            }
            
            .mood-history-content {
                display: flex;
                gap: 0.75rem;
                padding: 0.75rem;
            }
            
            .mood-history-emoji {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.25rem;
                color: white;
                flex-shrink: 0;
            }
            
            .mood-history-info {
                flex: 1;
                min-width: 0;
            }
            
            .mood-history-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.25rem;
            }
            
            .mood-history-name {
                font-weight: 500;
            }
            
            .mood-history-time {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .mood-history-text {
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .mood-history-empty {
                text-align: center;
                padding: 2rem 0;
                color: var(--text-secondary, #8b949e);
                font-style: italic;
            }
            
            .settings-group {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .settings-group label {
                flex-shrink: 0;
                width: 150px;
                font-size: 0.875rem;
            }
            
            .settings-group input[type="range"] {
                flex: 1;
            }
            
            .threshold-value {
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
                width: 40px;
                text-align: right;
            }
            
            .clear-history-button {
                padding: 0.625rem 1.25rem;
                background-color: var(--error-color, #ef4444);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
                margin-top: 0.5rem;
            }
            
            .clear-history-button:hover {
                background-color: var(--error-hover, #dc2626);
            }
            
            /* Global mood indicator styles */
            .mood-indicator {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 0.75rem;
                background-color: var(--bg-primary, #0d1117);
                border-radius: var(--radius-full, 9999px);
                font-size: 0.875rem;
                animation: fadeIn 0.3s ease-in-out;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* Mood-based UI adaptations */
            .mood-happy {
                --mood-accent: var(--mood-color, #4ade80);
                filter: brightness(var(--mood-brightness, 1.1)) 
                        saturate(var(--mood-saturation, 1.2));
            }
            
            .mood-sad {
                --mood-accent: var(--mood-color, #60a5fa);
                filter: brightness(var(--mood-brightness, 0.9)) 
                        saturate(var(--mood-saturation, 0.8));
            }
            
            .mood-angry {
                --mood-accent: var(--mood-color, #f87171);
                filter: brightness(var(--mood-brightness, 1)) 
                        saturate(var(--mood-saturation, 1.1))
                        sepia(var(--mood-temperature, 0.1));
            }
            
            .mood-anxious {
                --mood-accent: var(--mood-color, #fbbf24);
                filter: brightness(var(--mood-brightness, 0.95)) 
                        saturate(var(--mood-saturation, 0.9))
                        hue-rotate(calc(var(--mood-temperature, 0.9) * 10deg));
            }
            
            .mood-surprised {
                --mood-accent: var(--mood-color, #c084fc);
                filter: brightness(var(--mood-brightness, 1.05)) 
                        saturate(var(--mood-saturation, 1.1));
            }
            
            .mood-confused {
                --mood-accent: var(--mood-color, #f59e0b);
                filter: brightness(var(--mood-brightness, 0.98)) 
                        saturate(var(--mood-saturation, 0.95));
            }
            
            .mood-neutral {
                --mood-accent: var(--mood-color, #94a3b8);
                filter: brightness(var(--mood-brightness, 1)) 
                        saturate(var(--mood-saturation, 1));
            }
            
            @media (max-width: 640px) {
                .mood-selector {
                    grid-template-columns: repeat(3, 1fr);
                }
                
                .settings-group {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }
                
                .settings-group label {
                    width: 100%;
                }
                
                .threshold-value {
                    position: absolute;
                    right: 1.5rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MoodDetector };
} else {
    // Add to global scope for browser usage
    window.MoodDetector = MoodDetector;
}
/**
 * JAAT-AI Auto Corrector Feature
 * Automatically correct typos and grammar in user input
 */

class AutoCorrector {
    constructor() {
        // Common spelling mistakes and their corrections
        this.commonSpellingMistakes = {
            // Common misspellings
            'teh': 'the',
            'hte': 'the',
            'adn': 'and',
            'nad': 'and',
            'ont': 'not',
            'ahve': 'have',
            'haev': 'have',
            'recieve': 'receive',
            'beleive': 'believe',
            'wierd': 'weird',
            'thier': 'their',
            'theyre': 'they\'re',
            'thre': 'there',
            'ther': 'there',
            'theres': 'there\'s',
            'wheres': 'where\'s',
            'whos': 'who\'s',
            'its': 'it\'s',
            'youre': 'you\'re',
            'hes': 'he\'s',
            'shes': 'she\'s',
            'shouldnt': 'shouldn\'t',
            'wouldnt': 'wouldn\'t',
            'couldnt': 'couldn\'t',
            'dont': 'don\'t',
            'didnt': 'didn\'t',
            'isnt': 'isn\'t',
            'arent': 'aren\'t',
            'wasnt': 'wasn\'t',
            'werent': 'weren\'t',
            'hasnt': 'hasn\'t',
            'havent': 'haven\'t',
            'wont': 'won\'t',
            'cant': 'can\'t',
            'alot': 'a lot',
            'definately': 'definitely',
            'definatly': 'definitely',
            'difinitely': 'definitely',
            'seperate': 'separate',
            'occured': 'occurred',
            'occuring': 'occurring',
            'untill': 'until',
            'doesnt': 'doesn\'t',
            'goverment': 'government',
            'suprise': 'surprise',
            'suprize': 'surprise',
            'tommorrow': 'tomorrow',
            'tommorow': 'tomorrow',
            'tomorro': 'tomorrow',
            'reccommend': 'recommend',
            'recomend': 'recommend',
            'accomodate': 'accommodate',
            'acommodate': 'accommodate',
            'persue': 'pursue',
            'arguement': 'argument',
            'wich': 'which',
            'wich': 'which',
            'buisness': 'business',
            'bussiness': 'business',
            'busness': 'business',
            'neccessary': 'necessary',
            'necesary': 'necessary',
            'neccesary': 'necessary',
            'concious': 'conscious',
            'conscous': 'conscious',
            'existance': 'existence',
            'exsistence': 'existence',
            'appearence': 'appearance',
            'aquire': 'acquire',
            'aquit': 'acquit',
            'calender': 'calendar',
            'catagory': 'category',
            'cemetary': 'cemetery',
            'committ': 'commit',
            'commitee': 'committee',
            'comming': 'coming',
            'conceed': 'concede',
            'congradulate': 'congratulate',
            'decieve': 'deceive',
            'desparate': 'desperate',
            'dissapoint': 'disappoint',
            'embarass': 'embarrass',
            'enviroment': 'environment',
            'exagerate': 'exaggerate',
            'excellant': 'excellent',
            'familar': 'familiar',
            'finaly': 'finally',
            'flourescent': 'fluorescent',
            'foriegn': 'foreign',
            'freind': 'friend',
            'guarentee': 'guarantee',
            'happend': 'happened',
            'harrassment': 'harassment',
            'honourary': 'honorary',
            'humourous': 'humorous',
            'imediate': 'immediate',
            'independant': 'independent',
            'interuption': 'interruption',
            'irresistable': 'irresistible',
            'knowlege': 'knowledge',
            'libary': 'library',
            'lisence': 'license',
            'maintainance': 'maintenance',
            'memorie': 'memory',
            'millenium': 'millennium',
            'miniscule': 'minuscule',
            'mispell': 'misspell',
            'negoitate': 'negotiate',
            'nieghbor': 'neighbor',
            'noticable': 'noticeable',
            'ocasion': 'occasion',
            'occassion': 'occasion',
            'occassionally': 'occasionally',
            'ocurr': 'occur',
            'oppurtunity': 'opportunity',
            'parliment': 'parliament',
            'particulaly': 'particularly',
            'posession': 'possession',
            'potatos': 'potatoes',
            'preceeding': 'preceding',
            'prefered': 'preferred',
            'prefering': 'preferring',
            'priviledge': 'privilege',
            'probaly': 'probably',
            'pronuncation': 'pronunciation',
            'prufe': 'proof',
            'querrie': 'query',
            'recieve': 'receive',
            'reccomend': 'recommend',
            'referance': 'reference',
            'relevent': 'relevant',
            'religous': 'religious',
            'repitition': 'repetition',
            'rythm': 'rhythm',
            'secratary': 'secretary',
            'sieze': 'seize',
            'similer': 'similar',
            'simultaneus': 'simultaneous',
            'sincerly': 'sincerely',
            'somwhere': 'somewhere',
            'succesful': 'successful',
            'supercede': 'supersede',
            'suposed': 'supposed',
            'surprize': 'surprise',
            'threshhold': 'threshold',
            'tounge': 'tongue',
            'truely': 'truly',
            'unforseen': 'unforeseen',
            'unfortunatly': 'unfortunately',
            'unneccesary': 'unnecessary',
            'untill': 'until',
            'vacum': 'vacuum',
            'vehical': 'vehicle',
            'visious': 'vicious',
            'wether': 'whether',
            'writting': 'writing',
            
            // Common grammar fixes
            'i ': 'I ',
            'i\'m': 'I\'m',
            'i\'ll': 'I\'ll',
            'i\'ve': 'I\'ve',
            'i\'d': 'I\'d',
            
            // Contractions
            'ive': 'I\'ve',
            'im': 'I\'m',
            'id': 'I\'d',
            'ill': 'I\'ll',
            'theyll': 'they\'ll',
            'itll': 'it\'ll',
            'thatll': 'that\'ll',
            'theyd': 'they\'d',
            'thatd': 'that\'d',
            'theyve': 'they\'ve',
            'thatve': 'that\'ve',
            
            // Double words
            'the the': 'the',
            'and and': 'and',
            'of of': 'of',
            'to to': 'to',
            'in in': 'in',
            'is is': 'is',
            'it it': 'it',
            'for for': 'for',
            'on on': 'on',
            'with with': 'with',
            'at at': 'at',
            'by by': 'by',
            'was was': 'was',
            'that that': 'that'
        };
        
        // Common grammar rules
        this.grammarRules = [
            // Multiple spaces
            { pattern: /\s{2,}/g, replacement: ' ' },
            
            // Capitalize first letter of sentences
            { pattern: /(^|[.!?]\s+)([a-z])/g, replacement: (match, p1, p2) => p1 + p2.toUpperCase() },
            
            // Fix spacing after punctuation
            { pattern: /([.!?,;:])([^\s\d])/g, replacement: '$1 $2' },
            
            // Fix spacing before punctuation
            { pattern: /\s+([.!?,;:])/g, replacement: '$1' },
            
            // Fix multiple punctuation
            { pattern: /([.!?]){2,}/g, replacement: '$1' },
            
            // Fix capitalization after quotes
            { pattern: /(["'])([a-z])/g, replacement: (match, p1, p2) => {
                // Only capitalize if it looks like the start of a sentence
                if (match.match(/[.!?]\s*["'][a-z]/)) {
                    return p1 + p2.toUpperCase();
                }
                return match;
            }}
        ];
        
        // Word context fixes (situational corrections)
        this.contextRules = [
            // "your" vs "you're"
            { 
                pattern: /\b(your)\b\s+(going|doing|trying|getting|making|looking|feeling|being|talking|working|trying|coming|having|taking|using|saying|thinking|starting|playing|leaving|putting|helping|showing|giving|letting)\b/gi,
                replacement: "you're $2"
            },
            // "their" vs "there" vs "they're"
            {
                pattern: /\b(their)\b\s+(is|are|was|were|will|would|should|could|must|might|may|can|have|has|had|be|been|go|goes|going)\b/gi,
                replacement: "they're $2"
            },
            {
                pattern: /\b(there)\b\s+(car|house|dog|cat|phone|computer|book|idea|opinion|suggestion|problem|solution|family|friends|parents|children|kids|stuff|things|belongings|property|money|clothes|food|home|school|work|job|business|company)\b/gi,
                replacement: "their $2"
            },
            // "its" vs "it's"
            {
                pattern: /\b(its)\b\s+(going|time|getting|okay|fine|good|bad|great|awesome|terrible|horrible|amazing|interesting|boring|fun|funny|sad|disappointing|exciting|important|necessary|required|needed|critical|essential|possible|impossible|difficult|easy|hard|simple|complicated|expected|surprising|shocking|confusing|clear|obvious|apparent|evident|likely|unlikely|true|false|correct|incorrect|right|wrong|broken|fixed|working|not working|raining|snowing|hot|cold|warm|cool)\b/gi,
                replacement: "it's $2"
            },
            // "then" vs "than"
            {
                pattern: /\b(more|less|better|worse|faster|slower|higher|lower|bigger|smaller|stronger|weaker|easier|harder|earlier|later|cheaper|more expensive|older|younger|longer|shorter|taller|shorter|lighter|heavier|smarter|dumber|nicer|meaner|prettier|uglier|richer|poorer|busier|lazier|funnier|more serious|healthier|sicker)\s+(then)\b/gi,
                replacement: "$1 than"
            },
            // "affect" vs "effect"
            {
                pattern: /\b(the|an|this|that|any|no|some|positive|negative|side|after|beneficial|harmful|desired|unexpected|dramatic|significant|major|minor|lasting|temporary|immediate|delayed|overall|net|direct|indirect|cumulative|potential|possible|probable|likely|unlikely|known|unknown|measurable|immeasurable|intended|unintended|adverse|therapeutic|placebo|psychological|physiological|physical|emotional|mental|cognitive|neurological|behavioral|calming|stimulating|sedative|harmful|toxic|environmental|economic|financial|social|political|cultural|historical|profound|subtle|noticeable|visible|invisible|tangible|intangible|widespread|isolated|global|local|regional|national|international|primary|secondary|tertiary|main|strong|weak|negligible|substantial|minimal|maximal|principal|greater|lesser|domino|butterfly|ripple|cascade|downstream|upstream|trickle-down|short-term|long-term|medium-term)\s+(affect)\b/gi,
                replacement: "$1 effect"
            },
            {
                pattern: /\b(to|will|would|could|can|may|might|must|shall|should|not|adversely|negatively|positively|substantially|significantly|dramatically|directly|indirectly|immediately|eventually|ultimately|primarily|secondarily|seriously|severely|minimally|maximally|permanently|temporarily|hardly|barely|scarcely|definitely|certainly|possibly|probably|likely|unlikely|greatly|enormously|tremendously|immensely|profoundly|deeply|emotionally|physically|mentally|psychologically|physiologically|neurologically|cognitively|behaviorally|financially|economically|politically|socially|culturally|environmentally|globally|locally|regionally|nationally|internationally)\s+(effect)\b/gi,
                replacement: "$1 affect"
            },
            // "loose" vs "lose"
            {
                pattern: /\b(to|will|would|could|can|may|might|must|shall|should|not|never|always|sometimes|often|rarely|usually|occasionally|frequently|seldom|ever|don't|doesn't|didn't|won't|wouldn't|couldn't|can't|might not|must not|shall not|should not|about to|going to|want to|need to|try to|plan to|intend to|expect to|hope to|hate to|love to|prefer to|choose to|decide to|likely to|unlikely to|bound to|destined to|afraid to|scared to|excited to|happy to|sad to|prepared to|ready to|reluctant to|eager to|anxious to|willing to|unwilling to|certain to|sure to|doomed to)\s+(loose)\b/gi,
                replacement: "$1 lose"
            },
            {
                pattern: /\b(a|the|this|that|these|those|my|your|his|her|its|our|their|some|any|another|one|two|three|several|many|few|little|more|most|all|every|each|either|neither|both|such|what|whatever|which|whichever|whose|very|quite|rather|too|so|really|extremely|incredibly|remarkably|noticeably|surprisingly|shockingly|unusually|exceptionally|particularly|especially|somewhat|slightly|partially|relatively|comparatively|moderately|reasonably|fairly|pretty|rather|incredibly|amazingly|astonishingly|alarmingly|disturbingly|strikingly|decidedly|distinctly|markedly|dramatically|increasingly|decreasingly|progressively|gradually|steadily|absurdly|ridiculously|ludicrously|excessively|overly|unnecessarily|unduly|unjustifiably|unwarrantedly|inexcusably|unacceptably|inappropriately|improperly|unseemly|unsuitably|unbefitting|indecently|indecorously|unprofessionally)\s+(lose)\b/gi,
                replacement: "$1 loose"
            },
            // "accept" vs "except"
            {
                pattern: /\b(to|will|would|could|can|may|might|must|shall|should|not|never|always|sometimes|often|rarely|usually|occasionally|frequently|seldom|ever|don't|doesn't|didn't|won't|wouldn't|couldn't|can't|might not|must not|shall not|should not|about to|going to|want to|need to|try to|plan to|intend to|expect to|hope to|hate to|love to|prefer to|choose to|decide to|likely to|unlikely to|bound to|destined to|afraid to|scared to|excited to|happy to|sad to|prepared to|ready to|reluctant to|eager to|anxious to|willing to|unwilling to|certain to|sure to|doomed to|hard to|difficult to|easy to|challenging to|important to|necessary to|essential to|critical to|vital to|crucial to|unable to|able to|ready to|slow to|quick to|hesitant to|eager to|willing to|refusing to|declining to|agreeing to|consenting to|reluctant to)\s+(except)\b/gi,
                replacement: "$1 accept"
            },
            {
                pattern: /\b(all|everything|everyone|everybody|anywhere|everywhere|anything|nothing|nobody|no one|anyone|anybody|someone|somebody|somewhere|anywhere|everywhere|nowhere|each|every|any|some|few|many|most|several|various|diverse|numerous|countless|innumerable|certain|particular|specific|identified|listed|mentioned|cited|referenced|indicated|specified|designated|selected|chosen|picked|singled out)\s+(accept)\b/gi,
                replacement: "$1 except"
            }
        ];
        
        // Feature settings
        this.settings = {
            enabled: true,
            autoCorrectOnTyping: false,
            autoCorrectOnSubmit: true,
            fixSpelling: true,
            fixGrammar: true,
            fixContext: true,
            showCorrectionIndicator: true,
            suggestionMode: false, // If true, corrections are only suggestions
            ignoreCaseSensitiveWords: true, // Don't correct words that look like proper nouns
            ignoreUrls: true, // Don't correct text inside URLs
            ignoreCodeBlocks: true, // Don't correct code blocks
            minWordLength: 2, // Minimum word length to consider for correction
            correctionDelay: 500 // Milliseconds to wait after typing before correcting
        };
        
        // Input elements to monitor
        this.textInputs = [];
        this.prevInputValues = new Map();
        
        // Correction count for stats
        this.stats = {
            spellingCorrections: 0,
            grammarCorrections: 0,
            contextCorrections: 0,
            totalCorrections: 0,
            sessionStart: new Date()
        };
        
        // Correction indicator element
        this.indicatorElement = null;
        
        // Timers
        this.correctionTimers = new Map();
        
        // Storage key
        this.storageKey = 'jaat-auto-corrector-settings';
    }

    /**
     * Initialize auto corrector
     * @param {Object} options - Configuration options
     * @returns {AutoCorrector} This instance
     */
    init(options = {}) {
        // Apply custom options
        if (options.settings) {
            this.settings = { ...this.settings, ...options.settings };
        }
        
        // Load saved settings
        this.loadSettings();
        
        // If enabled, set up event listeners
        if (this.settings.enabled) {
            this.attachToInputs();
            
            // Create correction indicator if needed
            if (this.settings.showCorrectionIndicator) {
                this.createIndicator();
            }
            
            // Create mutation observer to watch for new inputs
            this.observeNewInputs();
        }
        
        console.log('Auto Corrector initialized with settings:', this.settings);
        return this;
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem(this.storageKey);
            if (savedSettings) {
                this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            }
        } catch (error) {
            console.error('Error loading auto corrector settings:', error);
        }
    }

    /**
     * Save settings to localStorage
     */
    saveSettings() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
        } catch (error) {
            console.error('Error saving auto corrector settings:', error);
        }
    }

    /**
     * Find all text input fields and attach event listeners
     */
    attachToInputs() {
        // Find text inputs in the document
        const textElements = document.querySelectorAll('input[type="text"], input:not([type]), textarea, [contenteditable="true"]');
        
        textElements.forEach(element => this.attachToInput(element));
    }

    /**
     * Attach to a specific input element
     * @param {HTMLElement} element - Input element to attach to
     */
    attachToInput(element) {
        // Skip if already attached
        if (this.textInputs.includes(element)) {
            return;
        }
        
        // Add to tracked inputs
        this.textInputs.push(element);
        
        // Store initial value
        this.prevInputValues.set(element, element.value || element.textContent || '');
        
        // Add input event listener for real-time corrections
        if (this.settings.autoCorrectOnTyping) {
            element.addEventListener('input', this.handleInputEvent.bind(this));
        }
        
        // Add blur event listener for on-submit corrections
        if (this.settings.autoCorrectOnSubmit) {
            element.addEventListener('blur', this.handleBlurEvent.bind(this));
        }
        
        // For chat applications, add correction before form submit
        const form = element.closest('form');
        if (form && this.settings.autoCorrectOnSubmit) {
            // Check if we've already attached to this form
            if (!form.dataset.jaatAutoCorrectorAttached) {
                form.addEventListener('submit', (event) => {
                    // Find all inputs in the form and correct them
                    const formInputs = form.querySelectorAll('input[type="text"], input:not([type]), textarea, [contenteditable="true"]');
                    formInputs.forEach(input => this.correctText(input));
                });
                
                // Mark form as having auto-corrector attached
                form.dataset.jaatAutoCorrectorAttached = 'true';
            }
        }
    }

    /**
     * Create mutation observer to watch for new input elements
     */
    observeNewInputs() {
        const observer = new MutationObserver(mutations => {
            let shouldCheckForInputs = false;
            
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if any of the added nodes are inputs or contain inputs
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (
                                node.matches && (
                                    node.matches('input[type="text"], input:not([type]), textarea, [contenteditable="true"]') ||
                                    node.querySelector('input[type="text"], input:not([type]), textarea, [contenteditable="true"]')
                                )
                            ) {
                                shouldCheckForInputs = true;
                                break;
                            }
                        }
                    }
                }
            });
            
            if (shouldCheckForInputs) {
                this.attachToInputs();
            }
        });
        
        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Handle input event for real-time corrections
     * @param {Event} event - Input event
     */
    handleInputEvent(event) {
        const element = event.target;
        
        // Clear any existing timer for this element
        if (this.correctionTimers.has(element)) {
            clearTimeout(this.correctionTimers.get(element));
        }
        
        // Set a new timer to correct after delay
        this.correctionTimers.set(element, setTimeout(() => {
            this.correctText(element);
            this.correctionTimers.delete(element);
        }, this.settings.correctionDelay));
    }

    /**
     * Handle blur event for on-submit corrections
     * @param {Event} event - Blur event
     */
    handleBlurEvent(event) {
        const element = event.target;
        
        // Clear any pending correction timer
        if (this.correctionTimers.has(element)) {
            clearTimeout(this.correctionTimers.get(element));
            this.correctionTimers.delete(element);
        }
        
        // Correct text immediately
        this.correctText(element);
    }

    /**
     * Correct text in an input element
     * @param {HTMLElement} element - Input element to correct
     * @returns {boolean} Whether any corrections were made
     */
    correctText(element) {
        // Get current text
        const isContentEditable = element.getAttribute('contenteditable') === 'true';
        const currentText = isContentEditable ? element.textContent : element.value;
        
        // Skip if empty
        if (!currentText || currentText.trim() === '') {
            return false;
        }
        
        // Get the previous value to compare with
        const prevValue = this.prevInputValues.get(element) || '';
        
        // Skip if no change since last correction
        if (prevValue === currentText) {
            return false;
        }
        
        // Split text into chunks (words, code blocks, URLs)
        const chunks = this.splitTextIntoChunks(currentText);
        
        // Track if any corrections were made
        let correctionsMade = false;
        const corrections = {
            spelling: 0,
            grammar: 0,
            context: 0
        };
        
        // Process each chunk
        const correctedChunks = chunks.map(chunk => {
            // Skip code blocks and URLs if configured to ignore them
            if (
                (chunk.type === 'code' && this.settings.ignoreCodeBlocks) ||
                (chunk.type === 'url' && this.settings.ignoreUrls)
            ) {
                return chunk.text;
            }
            
            // Only correct text chunks
            if (chunk.type === 'text') {
                let text = chunk.text;
                
                // Fix spelling if enabled
                if (this.settings.fixSpelling) {
                    const spellingCorrected = this.fixSpelling(text);
                    if (spellingCorrected !== text) {
                        corrections.spelling += this.countDifferences(text, spellingCorrected);
                        text = spellingCorrected;
                        correctionsMade = true;
                    }
                }
                
                // Fix grammar if enabled
                if (this.settings.fixGrammar) {
                    const grammarCorrected = this.fixGrammar(text);
                    if (grammarCorrected !== text) {
                        corrections.grammar += this.countDifferences(text, grammarCorrected);
                        text = grammarCorrected;
                        correctionsMade = true;
                    }
                }
                
                // Fix context-specific issues if enabled
                if (this.settings.fixContext) {
                    const contextCorrected = this.fixWordContext(text);
                    if (contextCorrected !== text) {
                        corrections.context += this.countDifferences(text, contextCorrected);
                        text = contextCorrected;
                        correctionsMade = true;
                    }
                }
                
                return text;
            }
            
            return chunk.text;
        });
        
        // Only update if corrections were made
        if (correctionsMade) {
            const correctedText = correctedChunks.join('');
            
            // Update the element's value
            if (isContentEditable) {
                element.textContent = correctedText;
            } else {
                element.value = correctedText;
            }
            
            // Update statistics
            this.stats.spellingCorrections += corrections.spelling;
            this.stats.grammarCorrections += corrections.grammar;
            this.stats.contextCorrections += corrections.context;
            this.stats.totalCorrections += corrections.spelling + corrections.grammar + corrections.context;
            
            // Show correction indicator
            if (this.settings.showCorrectionIndicator) {
                this.showCorrectionIndicator(
                    corrections.spelling,
                    corrections.grammar,
                    corrections.context,
                    element
                );
            }
            
            // Dispatch input event to trigger any listeners
            const inputEvent = new Event('input', { bubbles: true });
            element.dispatchEvent(inputEvent);
        }
        
        // Update previous value
        this.prevInputValues.set(element, isContentEditable ? element.textContent : element.value);
        
        return correctionsMade;
    }

    /**
     * Split text into chunks for processing (text, code blocks, URLs)
     * @param {string} text - Text to split
     * @returns {Array} Array of chunks with type and text
     */
    splitTextIntoChunks(text) {
        const chunks = [];
        let lastIndex = 0;
        
        // Regular expressions for code blocks and URLs
        const codeBlockRegex = /```[\s\S]*?```|`[^`]*`/g;
        const urlRegex = /https?:\/\/[^\s]+/g;
        
        // Find code blocks
        if (this.settings.ignoreCodeBlocks) {
            let match;
            while ((match = codeBlockRegex.exec(text)) !== null) {
                // Add text before the code block
                if (match.index > lastIndex) {
                    chunks.push({ type: 'text', text: text.substring(lastIndex, match.index) });
                }
                
                // Add the code block
                chunks.push({ type: 'code', text: match[0] });
                
                lastIndex = match.index + match[0].length;
            }
        }
        
        // Find URLs in the remaining text
        if (this.settings.ignoreUrls) {
            let remainingText = text.substring(lastIndex);
            lastIndex = 0; // Reset for the remaining text
            
            let match;
            while ((match = urlRegex.exec(remainingText)) !== null) {
                // Add text before the URL
                if (match.index > lastIndex) {
                    chunks.push({ type: 'text', text: remainingText.substring(lastIndex, match.index) });
                }
                
                // Add the URL
                chunks.push({ type: 'url', text: match[0] });
                
                lastIndex = match.index + match[0].length;
            }
            
            // Add remaining text after the last URL
            if (lastIndex < remainingText.length) {
                chunks.push({ type: 'text', text: remainingText.substring(lastIndex) });
            }
        } else {
            // Add all remaining text
            if (lastIndex < text.length) {
                chunks.push({ type: 'text', text: text.substring(lastIndex) });
            }
        }
        
        // If no chunks were created, add the entire text
        if (chunks.length === 0) {
            chunks.push({ type: 'text', text });
        }
        
        return chunks;
    }

    /**
     * Fix spelling mistakes in text
     * @param {string} text - Text to correct
     * @returns {string} Corrected text
     */
    fixSpelling(text) {
        if (!text) return text;
        
        // Split text into words
        const words = text.split(/(\s+)/);
        
        // Process each word
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            
            // Skip punctuation and spaces
            if (word.match(/^\s+$/) || word.match(/^[^\w]+$/)) {
                continue;
            }
            
            // Skip short words
            if (word.length < this.settings.minWordLength) {
                continue;
            }
            
            // Skip words that look like proper nouns if configured
            if (this.settings.ignoreCaseSensitiveWords && 
                word.length > 1 && 
                word[0] === word[0].toUpperCase() && 
                word.substring(1) === word.substring(1).toLowerCase()) {
                continue;
            }
            
            // Check if word is in common mistakes dictionary
            const lowercaseWord = word.toLowerCase();
            if (this.commonSpellingMistakes[lowercaseWord]) {
                // Preserve capitalization
                let replacement = this.commonSpellingMistakes[lowercaseWord];
                
                if (word[0] === word[0].toUpperCase()) {
                    replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
                }
                
                words[i] = replacement;
            }
        }
        
        // Join words back into text
        return words.join('');
    }

    /**
     * Fix grammar issues in text
     * @param {string} text - Text to correct
     * @returns {string} Corrected text
     */
    fixGrammar(text) {
        if (!text) return text;
        
        // Apply grammar rules
        let correctedText = text;
        
        for (const rule of this.grammarRules) {
            correctedText = correctedText.replace(rule.pattern, rule.replacement);
        }
        
        return correctedText;
    }

    /**
     * Fix context-specific word usage
     * @param {string} text - Text to correct
     * @returns {string} Corrected text
     */
    fixWordContext(text) {
        if (!text) return text;
        
        // Apply context rules
        let correctedText = text;
        
        for (const rule of this.contextRules) {
            correctedText = correctedText.replace(rule.pattern, rule.replacement);
        }
        
        return correctedText;
    }

    /**
     * Count differences between original and corrected text
     * @param {string} original - Original text
     * @param {string} corrected - Corrected text
     * @returns {number} Number of differences
     */
    countDifferences(original, corrected) {
        // Simple approach: count words that changed
        const originalWords = original.split(/\s+/);
        const correctedWords = corrected.split(/\s+/);
        
        // Match words up to the shorter length
        const minLength = Math.min(originalWords.length, correctedWords.length);
        let differences = 0;
        
        for (let i = 0; i < minLength; i++) {
            if (originalWords[i] !== correctedWords[i]) {
                differences++;
            }
        }
        
        // Add differences for extra words
        differences += Math.abs(originalWords.length - correctedWords.length);
        
        return differences;
    }

    /**
     * Create correction indicator element
     */
    createIndicator() {
        // Check if indicator already exists
        if (this.indicatorElement) {
            return;
        }
        
        // Create indicator element
        this.indicatorElement = document.createElement('div');
        this.indicatorElement.className = 'auto-corrector-indicator';
        this.indicatorElement.style.display = 'none';
        
        // Add to document
        document.body.appendChild(this.indicatorElement);
    }

    /**
     * Show correction indicator
     * @param {number} spelling - Number of spelling corrections
     * @param {number} grammar - Number of grammar corrections
     * @param {number} context - Number of context corrections
     * @param {HTMLElement} element - Element that was corrected
     */
    showCorrectionIndicator(spelling, grammar, context, element) {
        if (!this.indicatorElement || !element) {
            return;
        }
        
        // Skip if no corrections were made
        const total = spelling + grammar + context;
        if (total === 0) {
            return;
        }
        
        // Update indicator content
        this.indicatorElement.innerHTML = `
            <div class="indicator-content">
                <div class="indicator-title">
                    <span class="indicator-icon">✓</span>
                    <span>Auto-corrected</span>
                </div>
                <div class="indicator-details">
                    <div class="indicator-counts">
                        ${spelling > 0 ? `<div class="indicator-count">Spelling: ${spelling}</div>` : ''}
                        ${grammar > 0 ? `<div class="indicator-count">Grammar: ${grammar}</div>` : ''}
                        ${context > 0 ? `<div class="indicator-count">Context: ${context}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        // Position indicator near the element
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        this.indicatorElement.style.top = `${rect.top + scrollTop - this.indicatorElement.offsetHeight - 10}px`;
        this.indicatorElement.style.left = `${rect.left + scrollLeft}px`;
        
        // Show indicator
        this.indicatorElement.style.display = 'block';
        this.indicatorElement.classList.add('show');
        
        // Hide after a delay
        setTimeout(() => {
            this.indicatorElement.classList.remove('show');
            setTimeout(() => {
                this.indicatorElement.style.display = 'none';
            }, 300);
        }, 3000);
    }

    /**
     * Enable or disable auto-correction
     * @param {boolean} enabled - Whether auto-correction is enabled
     */
    setEnabled(enabled) {
        if (this.settings.enabled === enabled) {
            return;
        }
        
        this.settings.enabled = enabled;
        
        if (enabled) {
            // Attach to inputs
            this.attachToInputs();
            
            // Create indicator if needed
            if (this.settings.showCorrectionIndicator && !this.indicatorElement) {
                this.createIndicator();
            }
            
            // Set up observer
            this.observeNewInputs();
        } else {
            // Remove event listeners from inputs
            this.textInputs.forEach(element => {
                element.removeEventListener('input', this.handleInputEvent);
                element.removeEventListener('blur', this.handleBlurEvent);
            });
            
            // Clear tracked inputs
            this.textInputs = [];
            this.prevInputValues = new Map();
            
            // Clear correction timers
            this.correctionTimers.forEach(timer => clearTimeout(timer));
            this.correctionTimers.clear();
        }
        
        // Save settings
        this.saveSettings();
    }

    /**
     * Update settings
     * @param {Object} newSettings - New settings to apply
     */
    updateSettings(newSettings) {
        // Update settings
        this.settings = { ...this.settings, ...newSettings };
        
        // Apply changes
        if (this.settings.showCorrectionIndicator && !this.indicatorElement) {
            this.createIndicator();
        }
        
        // If enabled/disabled state changed, apply it
        if ('enabled' in newSettings) {
            this.setEnabled(this.settings.enabled);
        }
        
        // Save settings
        this.saveSettings();
    }

    /**
     * Get current correction statistics
     * @returns {Object} Correction statistics
     */
    getStats() {
        const now = new Date();
        const sessionDuration = (now - this.stats.sessionStart) / 1000; // in seconds
        
        return {
            ...this.stats,
            sessionDuration,
            correctionsPerMinute: this.stats.totalCorrections / (sessionDuration / 60)
        };
    }

    /**
     * Reset correction statistics
     */
    resetStats() {
        this.stats = {
            spellingCorrections: 0,
            grammarCorrections: 0,
            contextCorrections: 0,
            totalCorrections: 0,
            sessionStart: new Date()
        };
    }

    /**
     * Create auto corrector UI
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
        uiContainer.className = 'auto-corrector-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'auto-corrector-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'auto-corrector-title';
        title.textContent = 'Auto Corrector';
        header.appendChild(title);
        
        // Create toggle switch
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'toggle-container';
        header.appendChild(toggleContainer);
        
        const toggleLabel = document.createElement('span');
        toggleLabel.className = 'toggle-label';
        toggleLabel.textContent = this.settings.enabled ? 'Enabled' : 'Disabled';
        toggleContainer.appendChild(toggleLabel);
        
        const toggleSwitch = document.createElement('label');
        toggleSwitch.className = 'switch';
        toggleContainer.appendChild(toggleSwitch);
        
        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.checked = this.settings.enabled;
        toggleSwitch.appendChild(toggleInput);
        
        const toggleSlider = document.createElement('span');
        toggleSlider.className = 'slider';
        toggleSwitch.appendChild(toggleSlider);
        
        // Create settings section
        const settingsSection = document.createElement('div');
        settingsSection.className = 'auto-corrector-section';
        uiContainer.appendChild(settingsSection);
        
        const settingsTitle = document.createElement('h4');
        settingsTitle.className = 'section-title';
        settingsTitle.textContent = 'Settings';
        settingsSection.appendChild(settingsTitle);
        
        const settingsForm = document.createElement('div');
        settingsForm.className = 'settings-form';
        settingsSection.appendChild(settingsForm);
        
        // Create settings options
        const createSettingsOption = (id, label, checked) => {
            const option = document.createElement('div');
            option.className = 'settings-option';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = id;
            checkbox.checked = checked;
            option.appendChild(checkbox);
            
            const optionLabel = document.createElement('label');
            optionLabel.htmlFor = id;
            optionLabel.textContent = label;
            option.appendChild(optionLabel);
            
            return { option, checkbox };
        };
        
        // Add settings options
        const options = [
            { id: 'autoCorrectOnTyping', label: 'Auto-correct while typing', checked: this.settings.autoCorrectOnTyping },
            { id: 'autoCorrectOnSubmit', label: 'Auto-correct on submit/blur', checked: this.settings.autoCorrectOnSubmit },
            { id: 'fixSpelling', label: 'Fix spelling mistakes', checked: this.settings.fixSpelling },
            { id: 'fixGrammar', label: 'Fix grammar issues', checked: this.settings.fixGrammar },
            { id: 'fixContext', label: 'Fix contextual word usage', checked: this.settings.fixContext },
            { id: 'showCorrectionIndicator', label: 'Show correction indicator', checked: this.settings.showCorrectionIndicator },
            { id: 'suggestionMode', label: 'Suggestion mode (don\'t auto-correct)', checked: this.settings.suggestionMode },
            { id: 'ignoreCaseSensitiveWords', label: 'Ignore proper nouns', checked: this.settings.ignoreCaseSensitiveWords },
            { id: 'ignoreUrls', label: 'Ignore URLs', checked: this.settings.ignoreUrls },
            { id: 'ignoreCodeBlocks', label: 'Ignore code blocks', checked: this.settings.ignoreCodeBlocks }
        ];
        
        options.forEach(({ id, label, checked }) => {
            const { option, checkbox } = createSettingsOption(id, label, checked);
            settingsForm.appendChild(option);
            
            // Add change event listener
            checkbox.addEventListener('change', () => {
                this.updateSettings({ [id]: checkbox.checked });
            });
        });
        
        // Create statistics section
        const statsSection = document.createElement('div');
        statsSection.className = 'auto-corrector-section';
        uiContainer.appendChild(statsSection);
        
        const statsTitle = document.createElement('h4');
        statsTitle.className = 'section-title';
        statsTitle.textContent = 'Correction Statistics';
        statsSection.appendChild(statsTitle);
        
        const statsContent = document.createElement('div');
        statsContent.className = 'stats-content';
        statsSection.appendChild(statsContent);
        
        // Add stats display
        const updateStats = () => {
            const stats = this.getStats();
            
            // Format session duration
            const hours = Math.floor(stats.sessionDuration / 3600);
            const minutes = Math.floor((stats.sessionDuration % 3600) / 60);
            const seconds = Math.floor(stats.sessionDuration % 60);
            const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            statsContent.innerHTML = `
                <div class="stats-grid">
                    <div class="stats-item">
                        <div class="stats-value">${stats.spellingCorrections}</div>
                        <div class="stats-label">Spelling</div>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">${stats.grammarCorrections}</div>
                        <div class="stats-label">Grammar</div>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">${stats.contextCorrections}</div>
                        <div class="stats-label">Context</div>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">${stats.totalCorrections}</div>
                        <div class="stats-label">Total</div>
                    </div>
                </div>
                <div class="stats-details">
                    <div class="stats-row">
                        <span class="stats-detail-label">Session time:</span>
                        <span class="stats-detail-value">${formattedDuration}</span>
                    </div>
                    <div class="stats-row">
                        <span class="stats-detail-label">Corrections per minute:</span>
                        <span class="stats-detail-value">${stats.correctionsPerMinute.toFixed(2)}</span>
                    </div>
                </div>
                <button class="reset-stats-btn">Reset Statistics</button>
            `;
            
            // Add event listener to reset button
            const resetButton = statsContent.querySelector('.reset-stats-btn');
            resetButton.addEventListener('click', () => {
                this.resetStats();
                updateStats();
            });
        };
        
        // Initial stats update
        updateStats();
        
        // Set up periodic stats updates
        const statsInterval = setInterval(updateStats, 1000);
        
        // Add event listener to toggle switch
        toggleInput.addEventListener('change', () => {
            this.setEnabled(toggleInput.checked);
            toggleLabel.textContent = toggleInput.checked ? 'Enabled' : 'Disabled';
        });
        
        // Add cleanup function to remove interval when UI is removed
        uiContainer.cleanup = () => {
            clearInterval(statsInterval);
        };
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles for UI
     */
    addUIStyles() {
        const styleId = 'auto-corrector-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .auto-corrector-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .auto-corrector-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .auto-corrector-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .toggle-container {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .toggle-label {
                font-size: 0.875rem;
            }
            
            .switch {
                position: relative;
                display: inline-block;
                width: 48px;
                height: 24px;
            }
            
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                transition: .4s;
                border-radius: 34px;
            }
            
            .slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 2px;
                background-color: var(--text-primary, #f0f6fc);
                transition: .4s;
                border-radius: 50%;
            }
            
            input:checked + .slider {
                background-color: var(--accent-primary, #7c3aed);
            }
            
            input:focus + .slider {
                box-shadow: 0 0 1px var(--accent-primary, #7c3aed);
            }
            
            input:checked + .slider:before {
                transform: translateX(24px);
            }
            
            .auto-corrector-section {
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
            
            .settings-form {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 0.75rem;
            }
            
            .settings-option {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .settings-option label {
                font-size: 0.875rem;
                cursor: pointer;
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .stats-item {
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 0.75rem;
                text-align: center;
            }
            
            .stats-value {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 0.25rem;
                color: var(--accent-primary, #7c3aed);
            }
            
            .stats-label {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .stats-details {
                margin-bottom: 1rem;
            }
            
            .stats-row {
                display: flex;
                justify-content: space-between;
                font-size: 0.875rem;
                padding: 0.25rem 0;
            }
            
            .stats-detail-label {
                color: var(--text-secondary, #8b949e);
            }
            
            .reset-stats-btn {
                padding: 0.5rem 1rem;
                background-color: var(--error-color, #f87171);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                margin-top: 0.5rem;
            }
            
            .reset-stats-btn:hover {
                background-color: var(--error-hover, #ef4444);
            }
            
            /* Correction indicator styles */
            .auto-corrector-indicator {
                position: absolute;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                padding: 0.75rem 1rem;
                max-width: 250px;
                z-index: 9999;
                opacity: 0;
                transform: translateY(10px);
                transition: opacity 0.3s, transform 0.3s;
                pointer-events: none;
                color: var(--text-primary, #f0f6fc);
            }
            
            .auto-corrector-indicator.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .indicator-content {
                font-size: 0.875rem;
            }
            
            .indicator-title {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
                font-weight: 500;
            }
            
            .indicator-icon {
                color: #10b981;
            }
            
            .indicator-details {
                font-size: 0.75rem;
            }
            
            .indicator-counts {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .indicator-count {
                background-color: var(--bg-secondary, #161b22);
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-secondary, #8b949e);
            }
            
            @media (max-width: 768px) {
                .settings-form {
                    grid-template-columns: 1fr;
                }
                
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AutoCorrector };
} else {
    // Add to global scope for browser usage
    window.AutoCorrector = AutoCorrector;
}
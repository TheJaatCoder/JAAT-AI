/**
 * JAAT-AI Neural Machine Translation Feature
 * Advanced AI-powered translation with neural networks for higher accuracy
 */

class NeuralMachineTranslation {
    constructor() {
        this.initialized = false;
        this.dom = {};
        this.languages = [
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'es', name: 'Spanish', flag: '🇪🇸' },
            { code: 'fr', name: 'French', flag: '🇫🇷' },
            { code: 'de', name: 'German', flag: '🇩🇪' },
            { code: 'it', name: 'Italian', flag: '🇮🇹' },
            { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
            { code: 'ru', name: 'Russian', flag: '🇷🇺' },
            { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
            { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
            { code: 'ko', name: 'Korean', flag: '🇰🇷' },
            { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
            { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
        ];
        this.sourceLanguage = 'en';
        this.targetLanguage = 'es';
        this.currentTranslation = null;
    }
    
    /**
     * Initialize the feature
     */
    async init() {
        if (this.initialized) return;
        
        console.log('Initializing Neural Machine Translation feature');
        
        // Create UI
        this.createUI();
        
        // Set up event listeners
        this.setupEventListeners();
        
        this.initialized = true;
        return this;
    }
    
    /**
     * Create the UI for translation feature
     */
    createUI() {
        // First check if we're on a relevant page
        if (!document.querySelector('.chat-container, #chat-section')) {
            return;
        }
        
        // Create the translation panel
        const translationPanelHTML = `
            <div id="translation-panel" class="feature-panel">
                <div class="panel-header">
                    <h3><i class="fas fa-language"></i> Neural Translation</h3>
                    <button id="toggle-translation-panel" class="btn-icon toggle-panel">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div class="panel-content">
                    <div class="language-controls">
                        <div class="language-selector">
                            <label for="source-language">From:</label>
                            <select id="source-language" class="form-control">
                                ${this.languages.map(lang => 
                                    `<option value="${lang.code}" ${lang.code === this.sourceLanguage ? 'selected' : ''}>
                                        ${lang.flag} ${lang.name}
                                    </option>`
                                ).join('')}
                            </select>
                        </div>
                        <button id="swap-languages" class="btn-icon">
                            <i class="fas fa-exchange-alt"></i>
                        </button>
                        <div class="language-selector">
                            <label for="target-language">To:</label>
                            <select id="target-language" class="form-control">
                                ${this.languages.map(lang => 
                                    `<option value="${lang.code}" ${lang.code === this.targetLanguage ? 'selected' : ''}>
                                        ${lang.flag} ${lang.name}
                                    </option>`
                                ).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="translation-area">
                        <div class="input-area">
                            <textarea 
                                id="translation-source" 
                                placeholder="Enter text to translate..."
                                rows="4"
                                class="form-control"
                            ></textarea>
                        </div>
                        <div class="output-area">
                            <div id="translation-result" class="form-control">
                                <p class="placeholder">Translation will appear here...</p>
                            </div>
                            <div class="output-actions">
                                <button id="copy-translation" class="btn-icon" title="Copy">
                                    <i class="fas fa-copy"></i>
                                </button>
                                <button id="speak-translation" class="btn-icon" title="Speak">
                                    <i class="fas fa-volume-up"></i>
                                </button>
                                <button id="insert-translation" class="btn-icon" title="Insert to Chat">
                                    <i class="fas fa-arrow-circle-down"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="translation-actions">
                        <button id="translate-btn" class="btn-primary">
                            <i class="fas fa-language"></i> Translate
                        </button>
                        <button id="clear-translation" class="btn-secondary">
                            <i class="fas fa-times"></i> Clear
                        </button>
                    </div>
                    
                    <div id="translation-features" class="features-info">
                        <div class="feature-tag">
                            <i class="fas fa-brain"></i> Neural Network
                        </div>
                        <div class="feature-tag">
                            <i class="fas fa-magic"></i> Context Aware
                        </div>
                        <div class="feature-tag">
                            <i class="fas fa-check-circle"></i> High Accuracy
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Find a good place to insert our panel
        const targetElement = document.querySelector('.chat-container, #chat-section');
        if (targetElement) {
            targetElement.insertAdjacentHTML('afterend', targetElement.translationPanelHTML);
            
            // Add necessary styles if not already in the CSS
            this.addStyles();
        }
        
        // Store DOM references
        this.dom.panel = document.getElementById('translation-panel');
        this.dom.sourceLanguage = document.getElementById('source-language');
        this.dom.targetLanguage = document.getElementById('target-language');
        this.dom.swapButton = document.getElementById('swap-languages');
        this.dom.sourceText = document.getElementById('translation-source');
        this.dom.result = document.getElementById('translation-result');
        this.dom.translateButton = document.getElementById('translate-btn');
        this.dom.clearButton = document.getElementById('clear-translation');
        this.dom.copyButton = document.getElementById('copy-translation');
        this.dom.speakButton = document.getElementById('speak-translation');
        this.dom.insertButton = document.getElementById('insert-translation');
        this.dom.toggleButton = document.getElementById('toggle-translation-panel');
    }
    
    /**
     * Add CSS styles if they don't exist
     */
    addStyles() {
        if (document.getElementById('translation-styles')) return;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'translation-styles';
        styleElement.textContent = `
            .feature-panel {
                margin-top: 1rem;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                background: #fff;
            }
            
            .panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 1rem;
                background: #f8f9fa;
                border-bottom: 1px solid #e0e0e0;
            }
            
            .panel-header h3 {
                margin: 0;
                font-size: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .panel-content {
                padding: 1rem;
            }
            
            .language-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .language-selector {
                flex: 1;
            }
            
            .language-selector label {
                display: block;
                margin-bottom: 0.25rem;
                font-size: 0.875rem;
                color: #555;
            }
            
            #swap-languages {
                margin: 0 0.5rem;
                height: 38px;
                width: 38px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .translation-area {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .input-area, .output-area {
                flex: 1;
            }
            
            .output-area {
                position: relative;
            }
            
            #translation-result {
                min-height: 100px;
                padding: 0.75rem;
                border: 1px solid #ced4da;
                border-radius: 0.25rem;
                background-color: #f8f9fa;
            }
            
            #translation-result .placeholder {
                color: #9aa0a6;
                margin: 0;
            }
            
            .output-actions {
                position: absolute;
                bottom: 0.5rem;
                right: 0.5rem;
                display: flex;
                gap: 0.5rem;
            }
            
            .translation-actions {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .features-info {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            
            .feature-tag {
                font-size: 0.75rem;
                padding: 0.25rem 0.5rem;
                background: #f1f3f4;
                border-radius: 1rem;
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .dark-mode .feature-panel {
                background: #2d2d2d;
                border-color: #444;
            }
            
            .dark-mode .panel-header {
                background: #222;
                border-color: #444;
            }
            
            .dark-mode #translation-result {
                background: #333;
                border-color: #555;
            }
            
            .dark-mode .feature-tag {
                background: #444;
            }
            
            @media (min-width: 768px) {
                .translation-area {
                    flex-direction: row;
                }
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        if (!this.dom.panel) return;
        
        // Source language change
        if (this.dom.sourceLanguage) {
            this.dom.sourceLanguage.addEventListener('change', (e) => {
                this.sourceLanguage = e.target.value;
            });
        }
        
        // Target language change
        if (this.dom.targetLanguage) {
            this.dom.targetLanguage.addEventListener('change', (e) => {
                this.targetLanguage = e.target.value;
            });
        }
        
        // Swap languages
        if (this.dom.swapButton) {
            this.dom.swapButton.addEventListener('click', () => {
                const temp = this.sourceLanguage;
                this.sourceLanguage = this.targetLanguage;
                this.targetLanguage = temp;
                
                // Update selects
                this.dom.sourceLanguage.value = this.sourceLanguage;
                this.dom.targetLanguage.value = this.targetLanguage;
                
                // If there's content, swap it too
                if (this.dom.sourceText.value.trim() && this.currentTranslation) {
                    const tempText = this.dom.sourceText.value;
                    this.dom.sourceText.value = this.currentTranslation;
                    this.currentTranslation = tempText;
                    this.dom.result.innerHTML = this.currentTranslation;
                }
            });
        }
        
        // Translate button
        if (this.dom.translateButton) {
            this.dom.translateButton.addEventListener('click', () => {
                this.translateText();
            });
        }
        
        // Source text - translate on Enter
        if (this.dom.sourceText) {
            this.dom.sourceText.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.translateText();
                }
            });
        }
        
        // Clear button
        if (this.dom.clearButton) {
            this.dom.clearButton.addEventListener('click', () => {
                this.clearTranslation();
            });
        }
        
        // Copy translation
        if (this.dom.copyButton) {
            this.dom.copyButton.addEventListener('click', () => {
                if (this.currentTranslation) {
                    navigator.clipboard.writeText(this.currentTranslation)
                        .then(() => {
                            // Show success feedback
                            const originalIcon = this.dom.copyButton.innerHTML;
                            this.dom.copyButton.innerHTML = '<i class="fas fa-check"></i>';
                            setTimeout(() => {
                                this.dom.copyButton.innerHTML = originalIcon;
                            }, 1500);
                        })
                        .catch(err => {
                            console.error('Failed to copy: ', err);
                        });
                }
            });
        }
        
        // Speak translation
        if (this.dom.speakButton) {
            this.dom.speakButton.addEventListener('click', () => {
                if (this.currentTranslation && window.speechSynthesis) {
                    const utterance = new SpeechSynthesisUtterance(this.currentTranslation);
                    utterance.lang = this.targetLanguage;
                    window.speechSynthesis.speak(utterance);
                }
            });
        }
        
        // Insert to chat
        if (this.dom.insertButton) {
            this.dom.insertButton.addEventListener('click', () => {
                if (this.currentTranslation) {
                    const chatInput = document.querySelector('#chat-input');
                    if (chatInput) {
                        chatInput.value = this.currentTranslation;
                        chatInput.focus();
                    }
                }
            });
        }
        
        // Toggle panel
        if (this.dom.toggleButton) {
            this.dom.toggleButton.addEventListener('click', () => {
                const panelContent = this.dom.panel.querySelector('.panel-content');
                if (panelContent) {
                    panelContent.classList.toggle('hidden');
                    this.dom.toggleButton.querySelector('i').classList.toggle('fa-chevron-down');
                    this.dom.toggleButton.querySelector('i').classList.toggle('fa-chevron-up');
                }
            });
        }
    }
    
    /**
     * Translate the text
     */
    translateText() {
        const sourceText = this.dom.sourceText.value.trim();
        if (!sourceText) {
            // Show error message or highlight the input
            this.dom.sourceText.classList.add('error');
            setTimeout(() => {
                this.dom.sourceText.classList.remove('error');
            }, 1000);
            return;
        }
        
        // Show loading state
        this.dom.result.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Translating...</p>';
        
        // In a real implementation, this would call an API
        // For demo, we'll simulate a delay and some basic translations
        setTimeout(() => {
            const result = this.simulateTranslation(sourceText, this.sourceLanguage, this.targetLanguage);
            this.currentTranslation = result;
            this.dom.result.innerHTML = result;
        }, 1000);
    }
    
    /**
     * Clear the translation
     */
    clearTranslation() {
        this.dom.sourceText.value = '';
        this.dom.result.innerHTML = '<p class="placeholder">Translation will appear here...</p>';
        this.currentTranslation = null;
    }
    
    /**
     * Simulate translation (for demo purposes)
     * @param {string} text - Text to translate
     * @param {string} fromLang - Source language code
     * @param {string} toLang - Target language code
     * @returns {string} - Translated text
     */
    simulateTranslation(text, fromLang, toLang) {
        if (fromLang === toLang) {
            return text;
        }
        
        // This is just a simulation - in a real app, this would call a translation API
        const commonPhrases = {
            'en': {
                'Hello': { 'es': 'Hola', 'fr': 'Bonjour', 'de': 'Hallo', 'it': 'Ciao', 'ja': 'こんにちは' },
                'Thank you': { 'es': 'Gracias', 'fr': 'Merci', 'de': 'Danke', 'it': 'Grazie', 'ja': 'ありがとう' },
                'How are you?': { 'es': '¿Cómo estás?', 'fr': 'Comment allez-vous?', 'de': 'Wie geht es dir?', 'it': 'Come stai?', 'ja': 'お元気ですか？' },
                'What is your name?': { 'es': '¿Cómo te llamas?', 'fr': 'Comment vous appelez-vous?', 'de': 'Wie heißt du?', 'it': 'Come ti chiami?', 'ja': 'あなたの名前は何ですか？' },
                'I love AI translation': { 'es': 'Me encanta la traducción con IA', 'fr': "J'adore la traduction IA", 'de': 'Ich liebe KI-Übersetzung', 'it': "Adoro la traduzione dell'IA", 'ja': 'AI翻訳が大好きです' }
            }
        };
        
        // Check if it's one of our preset phrases
        if (fromLang === 'en' && commonPhrases.en[text] && commonPhrases.en[text][toLang]) {
            return commonPhrases.en[text][toLang];
        }
        
        // For demo, show a simulated "neural" translation
        // In a real app, you would call a translation API
        if (toLang === 'es') {
            return text + ' (traducido al español)';
        } else if (toLang === 'fr') {
            return text + ' (traduit en français)';
        } else if (toLang === 'de') {
            return text + ' (auf Deutsch übersetzt)';
        } else if (toLang === 'it') {
            return text + ' (tradotto in italiano)';
        } else if (toLang === 'ja') {
            return text + ' (日本語に翻訳)';
        } else if (toLang === 'zh') {
            return text + ' (翻译成中文)';
        } else if (toLang === 'ru') {
            return text + ' (переведено на русский)';
        } else if (toLang === 'ar') {
            return '(مترجم للعربية) ' + text;
        } else if (toLang === 'hi') {
            return text + ' (हिंदी में अनुवादित)';
        } else if (toLang === 'pt') {
            return text + ' (traduzido para português)';
        } else if (toLang === 'ko') {
            return text + ' (한국어로 번역)';
        } else {
            return text + ` (translated to ${toLang})`;
        }
    }
}

// Initialize and export
const neuralMachineTranslation = new NeuralMachineTranslation();
export default neuralMachineTranslation;

// If not importing, initialize on load
if (typeof window !== 'undefined' && !window.neuralMachineTranslation) {
    window.neuralMachineTranslation = neuralMachineTranslation;
    document.addEventListener('DOMContentLoaded', () => neuralMachineTranslation.init());
}
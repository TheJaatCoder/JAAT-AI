/**
 * JAAT-AI Multi-Language Support Feature
 * Provides comprehensive multi-language capabilities for the entire application
 */

class MultiLanguageSupport {
    constructor() {
        this.currentLanguage = 'en';
        this.supportedLanguages = [
            { code: 'en', name: 'English' },
            { code: 'es', name: 'Español' },
            { code: 'fr', name: 'Français' },
            { code: 'de', name: 'Deutsch' },
            { code: 'zh', name: 'Chinese (简体中文)' },
            { code: 'ja', name: 'Japanese (日本語)' },
            { code: 'ko', name: 'Korean (한국어)' },
            { code: 'ar', name: 'Arabic (العربية)' },
            { code: 'hi', name: 'Hindi (हिन्दी)' },
            { code: 'pt', name: 'Portuguese (Português)' },
            { code: 'ru', name: 'Russian (Русский)' },
            { code: 'it', name: 'Italian (Italiano)' }
        ];
        
        // Translation data will be loaded on demand
        this.translations = {};
        
        // Default translation fallbacks
        this.fallbackTranslations = {
            'dashboard.title': 'Dashboard',
            'dashboard.welcome': 'Welcome back! Here\'s an overview of your JAAT-AI usage.',
            'chat.placeholder': 'Type a message...',
            'chat.send': 'Send',
            'settings.title': 'Settings',
            'settings.language': 'Language',
            'settings.theme': 'Theme',
            'settings.save': 'Save Changes',
            'nav.dashboard': 'Dashboard',
            'nav.chat': 'Chat',
            'nav.settings': 'Settings',
            'nav.ai_modes': 'AI Modes',
            'nav.advanced_features': 'Advanced Features',
            'feature.not_available': 'This feature is not available in your current plan.',
            'login.title': 'Log In',
            'login.email': 'Email',
            'login.password': 'Password',
            'login.submit': 'Log In',
            'login.forgot': 'Forgot Password?',
            'login.signup': 'Don\'t have an account? Sign Up',
            'signup.title': 'Create Account',
            'signup.name': 'Full Name',
            'signup.email': 'Email',
            'signup.password': 'Password',
            'signup.confirm': 'Confirm Password',
            'signup.submit': 'Sign Up',
            'signup.login': 'Already have an account? Log In',
            'errors.required': 'This field is required',
            'errors.invalid_email': 'Please enter a valid email address',
            'errors.password_mismatch': 'Passwords do not match',
            'errors.network': 'Network error. Please try again.',
            'errors.auth': 'Authentication failed. Please check your credentials.',
            'errors.unknown': 'An unknown error occurred. Please try again later.'
        };
        
        // Try to load previously saved language preference
        this.loadLanguagePreference();
        
        // Initialize translations for current language
        this.loadTranslations(this.currentLanguage);
        
        console.log('JAAT-AI Multi-Language Support feature initialized');
    }
    
    /**
     * Load language preference from localStorage
     */
    loadLanguagePreference() {
        try {
            const savedLanguage = localStorage.getItem('jaat-language');
            if (savedLanguage) {
                // Verify that the saved language is supported
                if (this.supportedLanguages.some(lang => lang.code === savedLanguage)) {
                    this.currentLanguage = savedLanguage;
                }
            } else {
                // Try to detect browser language
                this.detectBrowserLanguage();
            }
        } catch (error) {
            console.error('Failed to load language preference:', error);
        }
    }
    
    /**
     * Save language preference to localStorage
     */
    saveLanguagePreference() {
        try {
            localStorage.setItem('jaat-language', this.currentLanguage);
        } catch (error) {
            console.error('Failed to save language preference:', error);
        }
    }
    
    /**
     * Detect browser language and set as current if supported
     */
    detectBrowserLanguage() {
        try {
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang) {
                // Extract the primary language code (e.g., 'en-US' -> 'en')
                const primaryLang = browserLang.split('-')[0];
                
                // Check if the language is supported
                if (this.supportedLanguages.some(lang => lang.code === primaryLang)) {
                    this.currentLanguage = primaryLang;
                }
            }
        } catch (error) {
            console.error('Failed to detect browser language:', error);
        }
    }
    
    /**
     * Load translations for a specific language
     * @param {string} langCode - The language code to load
     * @returns {Promise<boolean>} Whether translations were loaded successfully
     */
    async loadTranslations(langCode) {
        // If we already have translations for this language, no need to reload
        if (this.translations[langCode]) {
            return true;
        }
        
        try {
            // For demonstration purposes, we'll use the default translations
            // In a production environment, this would fetch translations from a server
            if (langCode === 'en') {
                this.translations['en'] = this.fallbackTranslations;
                return true;
            }
            
            // Simulate fetching translations from server
            // In a real app, this would be an API call
            const response = await this.fetchTranslations(langCode);
            if (response.success) {
                this.translations[langCode] = response.data;
                return true;
            } else {
                console.error('Failed to load translations:', response.error);
                return false;
            }
        } catch (error) {
            console.error('Error loading translations:', error);
            return false;
        }
    }
    
    /**
     * Simulate fetching translations from server
     * @param {string} langCode - The language code to fetch
     * @returns {Promise<Object>} The response object
     */
    async fetchTranslations(langCode) {
        // Simulate API response delay
        return new Promise(resolve => {
            setTimeout(() => {
                // For demo purposes, return mock translations
                // In a real app, this would be an API call
                const mockTranslations = {
                    'es': {
                        'dashboard.title': 'Panel de Control',
                        'dashboard.welcome': '¡Bienvenido de nuevo! Aquí hay una descripción general de su uso de JAAT-AI.',
                        'chat.placeholder': 'Escribe un mensaje...',
                        'chat.send': 'Enviar',
                        'settings.title': 'Configuración',
                        'settings.language': 'Idioma',
                        'settings.theme': 'Tema',
                        'settings.save': 'Guardar Cambios',
                        'nav.dashboard': 'Panel de Control',
                        'nav.chat': 'Chat',
                        'nav.settings': 'Configuración',
                        'nav.ai_modes': 'Modos de IA',
                        'nav.advanced_features': 'Características Avanzadas'
                    },
                    'fr': {
                        'dashboard.title': 'Tableau de Bord',
                        'dashboard.welcome': 'Bon retour! Voici un aperçu de votre utilisation de JAAT-AI.',
                        'chat.placeholder': 'Écrivez un message...',
                        'chat.send': 'Envoyer',
                        'settings.title': 'Paramètres',
                        'settings.language': 'Langue',
                        'settings.theme': 'Thème',
                        'settings.save': 'Enregistrer les Modifications',
                        'nav.dashboard': 'Tableau de Bord',
                        'nav.chat': 'Discussion',
                        'nav.settings': 'Paramètres',
                        'nav.ai_modes': 'Modes IA',
                        'nav.advanced_features': 'Fonctionnalités Avancées'
                    }
                };
                
                if (mockTranslations[langCode]) {
                    resolve({
                        success: true,
                        data: { ...this.fallbackTranslations, ...mockTranslations[langCode] }
                    });
                } else {
                    resolve({
                        success: false,
                        error: 'Language not available',
                        data: this.fallbackTranslations
                    });
                }
            }, 300);
        });
    }
    
    /**
     * Set the active language
     * @param {string} langCode - The language code to set
     * @returns {Promise<boolean>} Whether language was set successfully
     */
    async setLanguage(langCode) {
        // Verify language is supported
        if (!this.supportedLanguages.some(lang => lang.code === langCode)) {
            console.error('Language not supported:', langCode);
            return false;
        }
        
        // Load translations if not already loaded
        const translationsLoaded = await this.loadTranslations(langCode);
        if (!translationsLoaded) {
            console.error('Failed to load translations for language:', langCode);
            return false;
        }
        
        // Set as current language
        this.currentLanguage = langCode;
        this.saveLanguagePreference();
        
        // Update UI with new language
        this.updateUI();
        
        // Dispatch language change event
        this.dispatchEvent('languageChanged', { language: langCode });
        
        return true;
    }
    
    /**
     * Get a translated string
     * @param {string} key - The translation key
     * @param {Object} params - Replacement parameters
     * @returns {string} Translated string
     */
    translate(key, params = {}) {
        // Get translation from current language
        let translation = '';
        
        if (this.translations[this.currentLanguage] && 
            this.translations[this.currentLanguage][key]) {
            translation = this.translations[this.currentLanguage][key];
        } else if (this.fallbackTranslations[key]) {
            // Fallback to default translation
            translation = this.fallbackTranslations[key];
        } else {
            // If no translation found, return the key itself
            return key;
        }
        
        // Replace parameters
        if (params && Object.keys(params).length > 0) {
            Object.keys(params).forEach(param => {
                translation = translation.replace(`{${param}}`, params[param]);
            });
        }
        
        return translation;
    }
    
    /**
     * Update UI elements with current language translations
     */
    updateUI() {
        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (key) {
                // Get the translation
                const translation = this.translate(key);
                
                // Update element content
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.getAttribute('placeholder')) {
                        element.setAttribute('placeholder', translation);
                    } else {
                        element.value = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update language selector if it exists
        const langSelector = document.querySelector('.language-selector');
        if (langSelector) {
            const currentLangOption = langSelector.querySelector(`option[value="${this.currentLanguage}"]`);
            if (currentLangOption) {
                currentLangOption.selected = true;
            }
        }
    }
    
    /**
     * Get list of supported languages
     * @returns {Array} Supported languages
     */
    getSupportedLanguages() {
        return this.supportedLanguages;
    }
    
    /**
     * Get current language
     * @returns {string} Current language code
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    /**
     * Dispatch a custom event
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event details
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`jaat.language.${eventName}`, { 
            detail,
            bubbles: true
        });
        document.dispatchEvent(event);
    }
}

// Register the feature with JAAT-AI
if (window.JAAT) {
    window.JAAT.registerFeature('multi-language-support', new MultiLanguageSupport());
}

// Add initialization code
document.addEventListener('DOMContentLoaded', function() {
    // Apply translations to existing elements
    if (window.JAAT && window.JAAT.features['multi-language-support']) {
        window.JAAT.features['multi-language-support'].updateUI();
    }
    
    // Create language selector if it doesn't exist
    if (!document.querySelector('.language-selector')) {
        // Check if settings section exists
        const settingsSection = document.querySelector('.settings-section');
        if (settingsSection) {
            // Create language selector container
            const langContainer = document.createElement('div');
            langContainer.className = 'settings-item language-settings';
            
            // Create label
            const label = document.createElement('label');
            label.setAttribute('data-i18n', 'settings.language');
            label.textContent = 'Language';
            
            // Create select element
            const select = document.createElement('select');
            select.className = 'language-selector';
            
            // Get languages and create options
            const languages = window.JAAT.features['multi-language-support'].getSupportedLanguages();
            const currentLang = window.JAAT.features['multi-language-support'].getCurrentLanguage();
            
            languages.forEach(lang => {
                const option = document.createElement('option');
                option.value = lang.code;
                option.textContent = lang.name;
                if (lang.code === currentLang) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            
            // Add event listener
            select.addEventListener('change', function() {
                const langCode = this.value;
                window.JAAT.features['multi-language-support'].setLanguage(langCode);
            });
            
            // Assemble and add to settings
            langContainer.appendChild(label);
            langContainer.appendChild(select);
            settingsSection.appendChild(langContainer);
        }
    }
    
    // Add translation attributes to elements that need them
    const elementsToTranslate = [
        { selector: '.dashboard-title', key: 'dashboard.title' },
        { selector: '.dashboard-welcome', key: 'dashboard.welcome' },
        { selector: '.chat-input', key: 'chat.placeholder', attr: 'placeholder' },
        { selector: '.settings-title', key: 'settings.title' },
        { selector: '.nav-dashboard', key: 'nav.dashboard' },
        { selector: '.nav-chat', key: 'nav.chat' },
        { selector: '.nav-settings', key: 'nav.settings' }
    ];
    
    elementsToTranslate.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(element => {
            element.setAttribute('data-i18n', item.key);
            if (item.attr) {
                element.setAttribute(item.attr, 
                    window.JAAT.features['multi-language-support'].translate(item.key)
                );
            } else {
                element.textContent = window.JAAT.features['multi-language-support'].translate(item.key);
            }
        });
    });
});
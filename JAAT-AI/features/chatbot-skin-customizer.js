/**
 * JAAT-AI Chatbot Skin Customizer Feature
 * Customize the appearance of the chat interface with themes, colors, and styles
 */

class ChatbotSkinCustomizer {
    constructor() {
        // Available themes
        this.themes = [
            {
                id: 'default',
                name: 'Default',
                description: 'Clean modern interface with purple accents',
                colors: {
                    primary: '#7c3aed',
                    secondary: '#8b5cf6',
                    background: '#f9fafb',
                    surface: '#ffffff',
                    text: '#111827',
                    textSecondary: '#6b7280',
                    userMessage: '#e9f5fe',
                    userMessageText: '#1e3a8a',
                    aiMessage: '#f1f5f9',
                    aiMessageText: '#0f172a',
                    inputBackground: '#ffffff',
                    border: '#e5e7eb'
                },
                fonts: {
                    primary: 'Inter, sans-serif',
                    secondary: 'system-ui, sans-serif',
                    size: 'medium',
                    weight: 'normal'
                },
                borderRadius: 'medium', // small, medium, large, round
                shadows: 'medium', // none, small, medium, large
                density: 'comfortable', // compact, comfortable, spacious
                animation: 'subtle' // none, subtle, playful
            },
            {
                id: 'dark',
                name: 'Dark Theme',
                description: 'Dark interface with vibrant accents',
                colors: {
                    primary: '#8b5cf6',
                    secondary: '#a78bfa',
                    background: '#111827',
                    surface: '#1f2937',
                    text: '#f9fafb',
                    textSecondary: '#d1d5db',
                    userMessage: '#374151',
                    userMessageText: '#e5e7eb',
                    aiMessage: '#2a374b',
                    aiMessageText: '#f3f4f6',
                    inputBackground: '#1f2937',
                    border: '#4b5563'
                },
                fonts: {
                    primary: 'Inter, sans-serif',
                    secondary: 'system-ui, sans-serif',
                    size: 'medium',
                    weight: 'normal'
                },
                borderRadius: 'medium',
                shadows: 'large',
                density: 'comfortable',
                animation: 'subtle'
            },
            {
                id: 'light',
                name: 'Light Minimal',
                description: 'Clean light interface with minimal styling',
                colors: {
                    primary: '#3b82f6',
                    secondary: '#60a5fa',
                    background: '#ffffff',
                    surface: '#f9fafb',
                    text: '#111827',
                    textSecondary: '#6b7280',
                    userMessage: '#eff6ff',
                    userMessageText: '#1e40af',
                    aiMessage: '#f9fafb',
                    aiMessageText: '#111827',
                    inputBackground: '#ffffff',
                    border: '#e5e7eb'
                },
                fonts: {
                    primary: 'system-ui, sans-serif',
                    secondary: 'system-ui, sans-serif',
                    size: 'medium',
                    weight: 'light'
                },
                borderRadius: 'small',
                shadows: 'small',
                density: 'compact',
                animation: 'none'
            },
            {
                id: 'contrast',
                name: 'High Contrast',
                description: 'High contrast theme for better accessibility',
                colors: {
                    primary: '#2563eb',
                    secondary: '#1d4ed8',
                    background: '#ffffff',
                    surface: '#f8fafc',
                    text: '#000000',
                    textSecondary: '#334155',
                    userMessage: '#000000',
                    userMessageText: '#ffffff',
                    aiMessage: '#ffffff',
                    aiMessageText: '#000000',
                    inputBackground: '#ffffff',
                    border: '#94a3b8'
                },
                fonts: {
                    primary: 'system-ui, sans-serif',
                    secondary: 'system-ui, sans-serif',
                    size: 'large',
                    weight: 'bold'
                },
                borderRadius: 'small',
                shadows: 'none',
                density: 'spacious',
                animation: 'none'
            },
            {
                id: 'cozy',
                name: 'Cozy Warm',
                description: 'Warm colors with a cozy feel',
                colors: {
                    primary: '#f59e0b',
                    secondary: '#fbbf24',
                    background: '#fffbeb',
                    surface: '#ffffff',
                    text: '#422006',
                    textSecondary: '#92400e',
                    userMessage: '#fef3c7',
                    userMessageText: '#78350f',
                    aiMessage: '#ffedd5',
                    aiMessageText: '#7c2d12',
                    inputBackground: '#ffffff',
                    border: '#fed7aa'
                },
                fonts: {
                    primary: 'Georgia, serif',
                    secondary: 'system-ui, sans-serif',
                    size: 'medium',
                    weight: 'normal'
                },
                borderRadius: 'large',
                shadows: 'medium',
                density: 'comfortable',
                animation: 'playful'
            },
            {
                id: 'forest',
                name: 'Forest Green',
                description: 'Calming green theme inspired by nature',
                colors: {
                    primary: '#059669',
                    secondary: '#10b981',
                    background: '#ecfdf5',
                    surface: '#ffffff',
                    text: '#064e3b',
                    textSecondary: '#065f46',
                    userMessage: '#d1fae5',
                    userMessageText: '#065f46',
                    aiMessage: '#f0fdfa',
                    aiMessageText: '#134e4a',
                    inputBackground: '#ffffff',
                    border: '#a7f3d0'
                },
                fonts: {
                    primary: 'system-ui, sans-serif',
                    secondary: 'system-ui, sans-serif',
                    size: 'medium',
                    weight: 'normal'
                },
                borderRadius: 'medium',
                shadows: 'small',
                density: 'spacious',
                animation: 'subtle'
            },
            {
                id: 'midnight',
                name: 'Midnight Blue',
                description: 'Deep blue dark theme',
                colors: {
                    primary: '#3b82f6',
                    secondary: '#60a5fa',
                    background: '#0f172a',
                    surface: '#1e293b',
                    text: '#f8fafc',
                    textSecondary: '#cbd5e1',
                    userMessage: '#1e3a8a',
                    userMessageText: '#e0f2fe',
                    aiMessage: '#334155',
                    aiMessageText: '#f1f5f9',
                    inputBackground: '#1e293b',
                    border: '#475569'
                },
                fonts: {
                    primary: 'Inter, sans-serif',
                    secondary: 'system-ui, sans-serif',
                    size: 'medium',
                    weight: 'normal'
                },
                borderRadius: 'medium',
                shadows: 'large',
                density: 'comfortable',
                animation: 'subtle'
            },
            {
                id: 'bubbles',
                name: 'Chat Bubbles',
                description: 'Familiar chat bubble interface',
                colors: {
                    primary: '#0284c7',
                    secondary: '#0ea5e9',
                    background: '#f0f9ff',
                    surface: '#f0f9ff',
                    text: '#0c4a6e',
                    textSecondary: '#0369a1',
                    userMessage: '#06b6d4',
                    userMessageText: '#f0f9ff',
                    aiMessage: '#e0f2fe',
                    aiMessageText: '#0c4a6e',
                    inputBackground: '#ffffff',
                    border: '#bae6fd'
                },
                fonts: {
                    primary: 'system-ui, sans-serif',
                    secondary: 'system-ui, sans-serif',
                    size: 'medium',
                    weight: 'normal'
                },
                borderRadius: 'round',
                shadows: 'small',
                density: 'comfortable',
                animation: 'playful'
            },
            {
                id: 'retro',
                name: 'Retro Terminal',
                description: 'Old school terminal look',
                colors: {
                    primary: '#84cc16',
                    secondary: '#a3e635',
                    background: '#000000',
                    surface: '#171717',
                    text: '#a7f3d0',
                    textSecondary: '#86efac',
                    userMessage: '#1a2e05',
                    userMessageText: '#d9f99d',
                    aiMessage: '#022c22',
                    aiMessageText: '#a7f3d0',
                    inputBackground: '#171717',
                    border: '#365314'
                },
                fonts: {
                    primary: 'monospace',
                    secondary: 'monospace',
                    size: 'medium',
                    weight: 'normal'
                },
                borderRadius: 'small',
                shadows: 'none',
                density: 'compact',
                animation: 'none'
            }
        ];
        
        // Font options
        this.fontOptions = {
            families: [
                { id: 'system', name: 'System Default', value: 'system-ui, sans-serif' },
                { id: 'inter', name: 'Inter', value: 'Inter, sans-serif' },
                { id: 'roboto', name: 'Roboto', value: 'Roboto, sans-serif' },
                { id: 'opensans', name: 'Open Sans', value: 'Open Sans, sans-serif' },
                { id: 'montserrat', name: 'Montserrat', value: 'Montserrat, sans-serif' },
                { id: 'lato', name: 'Lato', value: 'Lato, sans-serif' },
                { id: 'poppins', name: 'Poppins', value: 'Poppins, sans-serif' },
                { id: 'georgia', name: 'Georgia', value: 'Georgia, serif' },
                { id: 'times', name: 'Times New Roman', value: 'Times New Roman, serif' },
                { id: 'courier', name: 'Courier New', value: 'Courier New, monospace' },
                { id: 'mono', name: 'Monospace', value: 'monospace' }
            ],
            sizes: [
                { id: 'small', name: 'Small', value: '0.875rem' },
                { id: 'medium', name: 'Medium', value: '1rem' },
                { id: 'large', name: 'Large', value: '1.125rem' },
                { id: 'xlarge', name: 'Extra Large', value: '1.25rem' }
            ],
            weights: [
                { id: 'light', name: 'Light', value: '300' },
                { id: 'normal', name: 'Normal', value: '400' },
                { id: 'medium', name: 'Medium', value: '500' },
                { id: 'bold', name: 'Bold', value: '700' }
            ]
        };
        
        // Layout options
        this.layoutOptions = {
            borderRadius: [
                { id: 'small', name: 'Small', value: '0.25rem' },
                { id: 'medium', name: 'Medium', value: '0.5rem' },
                { id: 'large', name: 'Large', value: '1rem' },
                { id: 'round', name: 'Round', value: '9999px' }
            ],
            shadows: [
                { id: 'none', name: 'None', value: 'none' },
                { id: 'small', name: 'Small', value: '0 1px 3px rgba(0, 0, 0, 0.1)' },
                { id: 'medium', name: 'Medium', value: '0 4px 6px rgba(0, 0, 0, 0.1)' },
                { id: 'large', name: 'Large', value: '0 10px 15px rgba(0, 0, 0, 0.1)' }
            ],
            density: [
                { id: 'compact', name: 'Compact', padding: '0.5rem', spacing: '0.5rem' },
                { id: 'comfortable', name: 'Comfortable', padding: '1rem', spacing: '1rem' },
                { id: 'spacious', name: 'Spacious', padding: '1.5rem', spacing: '1.5rem' }
            ],
            animation: [
                { id: 'none', name: 'None', value: 'none' },
                { id: 'subtle', name: 'Subtle', value: 'subtle' },
                { id: 'playful', name: 'Playful', value: 'playful' }
            ]
        };
        
        // UI elements selectors
        this.selectors = {
            chatContainer: '.chat-container',
            messagesContainer: '.messages-container',
            messagesList: '.messages-list',
            userMessage: '.user-message',
            aiMessage: '.ai-message',
            inputContainer: '.input-container',
            chatInput: '.chat-input',
            sendButton: '.send-button',
            header: '.chat-header',
            sidebar: '.chat-sidebar'
        };
        
        // Current theme (default to first theme)
        this.currentTheme = { ...this.themes[0] };
        
        // Custom theme (for user customizations)
        this.customTheme = null;
        
        // Storage key
        this.storageKey = 'jaat-skin-customizer';
    }

    /**
     * Initialize the skin customizer
     * @param {Object} options - Configuration options
     * @returns {ChatbotSkinCustomizer} This instance
     */
    init(options = {}) {
        // Load saved theme
        this.loadSavedTheme();
        
        // Apply options if provided
        if (options.theme) {
            const themeToApply = this.themes.find(t => t.id === options.theme);
            if (themeToApply) {
                this.currentTheme = { ...themeToApply };
            }
        }
        
        // Apply current theme
        this.applyTheme(this.currentTheme);
        
        console.log('Chatbot Skin Customizer initialized');
        return this;
    }

    /**
     * Load saved theme from localStorage
     */
    loadSavedTheme() {
        try {
            const savedData = localStorage.getItem(this.storageKey);
            if (savedData) {
                const data = JSON.parse(savedData);
                
                if (data.themeId) {
                    // Load predefined theme
                    const theme = this.themes.find(t => t.id === data.themeId);
                    if (theme) {
                        this.currentTheme = { ...theme };
                    }
                } else if (data.customTheme) {
                    // Load custom theme
                    this.customTheme = data.customTheme;
                    this.currentTheme = { ...this.customTheme };
                }
            }
        } catch (error) {
            console.error('Error loading saved theme:', error);
        }
    }

    /**
     * Save current theme to localStorage
     */
    saveTheme() {
        try {
            let dataToSave;
            
            // If using a predefined theme
            const isPredefined = this.themes.some(t => t.id === this.currentTheme.id && t.id !== 'custom');
            if (isPredefined) {
                dataToSave = {
                    themeId: this.currentTheme.id
                };
            } else {
                // Save as custom theme
                this.customTheme = { ...this.currentTheme, id: 'custom', name: 'Custom Theme' };
                dataToSave = {
                    customTheme: this.customTheme
                };
            }
            
            localStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    }

    /**
     * Apply a theme to the chat interface
     * @param {Object} theme - Theme to apply
     */
    applyTheme(theme) {
        if (!theme) return;
        
        // Create CSS variables string
        const cssVars = this.generateCSSVariables(theme);
        
        // Create element for theme styles
        let styleEl = document.getElementById('jaat-theme-styles');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'jaat-theme-styles';
            document.head.appendChild(styleEl);
        }
        
        // Set style content
        styleEl.textContent = cssVars;
        
        // Set current theme
        this.currentTheme = { ...theme };
        
        // Add theme class to body
        document.body.classList.forEach(cls => {
            if (cls.startsWith('theme-')) {
                document.body.classList.remove(cls);
            }
        });
        document.body.classList.add(`theme-${theme.id}`);
        
        // Apply animation classes based on theme
        this.applyAnimationClasses(theme.animation);
        
        // Add fonts if needed
        this.loadThemeFonts(theme);
        
        // Save theme to localStorage
        this.saveTheme();
        
        console.log(`Applied theme: ${theme.name}`);
    }

    /**
     * Generate CSS variables from theme
     * @param {Object} theme - Theme object
     * @returns {string} CSS variables styles
     */
    generateCSSVariables(theme) {
        // Get font settings
        const primaryFont = this.getFontValue(theme.fonts.primary);
        const secondaryFont = this.getFontValue(theme.fonts.secondary);
        const fontSize = this.getFontSizeValue(theme.fonts.size);
        const fontWeight = this.getFontWeightValue(theme.fonts.weight);
        
        // Get layout settings
        const borderRadius = this.getBorderRadiusValue(theme.borderRadius);
        const shadowValue = this.getShadowValue(theme.shadows);
        const density = this.getDensityValues(theme.density);
        
        // Create CSS variables
        return `
            :root {
                /* Colors */
                --primary: ${theme.colors.primary};
                --primary-hover: ${this.adjustColorBrightness(theme.colors.primary, -10)};
                --primary-focus: ${this.adjustColorBrightness(theme.colors.primary, 10)};
                --primary-subtle: ${this.adjustColorBrightness(theme.colors.primary, 40)};
                --primary-transparent: ${this.hexToRgba(theme.colors.primary, 0.1)};
                
                --secondary: ${theme.colors.secondary};
                --secondary-hover: ${this.adjustColorBrightness(theme.colors.secondary, -10)};
                --secondary-focus: ${this.adjustColorBrightness(theme.colors.secondary, 10)};
                
                --background: ${theme.colors.background};
                --surface: ${theme.colors.surface};
                --surface-hover: ${this.adjustColorBrightness(theme.colors.surface, -3)};
                
                --text: ${theme.colors.text};
                --text-secondary: ${theme.colors.textSecondary};
                --text-disabled: ${this.hexToRgba(theme.colors.text, 0.5)};
                
                --user-message: ${theme.colors.userMessage};
                --user-message-text: ${theme.colors.userMessageText};
                
                --ai-message: ${theme.colors.aiMessage};
                --ai-message-text: ${theme.colors.aiMessageText};
                
                --input-background: ${theme.colors.inputBackground};
                --border: ${theme.colors.border};
                --border-hover: ${this.adjustColorBrightness(theme.colors.border, -10)};
                --border-focus: ${theme.colors.primary};
                
                /* Typography */
                --font-primary: ${primaryFont};
                --font-secondary: ${secondaryFont};
                --font-size: ${fontSize};
                --font-weight: ${fontWeight};
                
                /* Layout */
                --border-radius: ${borderRadius};
                --shadow: ${shadowValue};
                --padding: ${density.padding};
                --spacing: ${density.spacing};
                
                /* Transitions */
                --transition-fast: 0.1s ease;
                --transition-normal: 0.2s ease;
                --transition-slow: 0.3s ease;
            }
            
            /* Apply theme styles to elements */
            body {
                background-color: var(--background);
                color: var(--text);
                font-family: var(--font-primary);
                font-size: var(--font-size);
                font-weight: var(--font-weight);
            }
            
            /* Chat container */
            ${this.selectors.chatContainer} {
                background-color: var(--surface);
                border-radius: var(--border-radius);
                box-shadow: var(--shadow);
            }
            
            /* Messages container */
            ${this.selectors.messagesContainer} {
                padding: var(--padding);
            }
            
            /* Messages */
            ${this.selectors.messagesList} {
                gap: var(--spacing);
            }
            
            /* User message */
            ${this.selectors.userMessage} {
                background-color: var(--user-message);
                color: var(--user-message-text);
                border-radius: var(--border-radius);
                padding: var(--padding);
            }
            
            /* AI message */
            ${this.selectors.aiMessage} {
                background-color: var(--ai-message);
                color: var(--ai-message-text);
                border-radius: var(--border-radius);
                padding: var(--padding);
            }
            
            /* Input container */
            ${this.selectors.inputContainer} {
                padding: var(--padding);
                border-top: 1px solid var(--border);
            }
            
            /* Chat input */
            ${this.selectors.chatInput} {
                background-color: var(--input-background);
                color: var(--text);
                border: 1px solid var(--border);
                border-radius: var(--border-radius);
                padding: var(--padding);
                font-family: var(--font-primary);
                font-size: var(--font-size);
            }
            
            ${this.selectors.chatInput}:focus {
                border-color: var(--border-focus);
                outline: none;
                box-shadow: 0 0 0 2px var(--primary-transparent);
            }
            
            /* Send button */
            ${this.selectors.sendButton} {
                background-color: var(--primary);
                color: white;
                border-radius: var(--border-radius);
                transition: background-color var(--transition-normal);
            }
            
            ${this.selectors.sendButton}:hover {
                background-color: var(--primary-hover);
            }
            
            /* Header */
            ${this.selectors.header} {
                background-color: var(--surface);
                border-bottom: 1px solid var(--border);
                padding: var(--padding);
            }
            
            /* Sidebar */
            ${this.selectors.sidebar} {
                background-color: var(--surface);
                border-right: 1px solid var(--border);
            }
        `;
    }

    /**
     * Apply animation classes based on theme
     * @param {string} animationType - Animation type
     */
    applyAnimationClasses(animationType) {
        // Remove existing animation classes
        document.body.classList.forEach(cls => {
            if (cls.startsWith('animation-')) {
                document.body.classList.remove(cls);
            }
        });
        
        // Add new animation class
        document.body.classList.add(`animation-${animationType}`);
        
        // Add animation styles if not already present
        let animStyleEl = document.getElementById('jaat-theme-animations');
        if (!animStyleEl) {
            animStyleEl = document.createElement('style');
            animStyleEl.id = 'jaat-theme-animations';
            document.head.appendChild(animStyleEl);
            
            animStyleEl.textContent = `
                /* Animation: Subtle */
                .animation-subtle ${this.selectors.userMessage},
                .animation-subtle ${this.selectors.aiMessage} {
                    transition: opacity 0.3s ease, transform 0.3s ease;
                    opacity: 0;
                    transform: translateY(10px);
                }
                
                .animation-subtle ${this.selectors.userMessage}.show,
                .animation-subtle ${this.selectors.aiMessage}.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                /* Animation: Playful */
                .animation-playful ${this.selectors.userMessage} {
                    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    opacity: 0;
                    transform: translateX(-20px) scale(0.95);
                }
                
                .animation-playful ${this.selectors.aiMessage} {
                    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    opacity: 0;
                    transform: translateX(20px) scale(0.95);
                }
                
                .animation-playful ${this.selectors.userMessage}.show {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
                
                .animation-playful ${this.selectors.aiMessage}.show {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
                
                /* Button animations */
                .animation-playful ${this.selectors.sendButton} {
                    transition: transform 0.2s ease, background-color 0.2s ease;
                }
                
                .animation-playful ${this.selectors.sendButton}:hover {
                    transform: scale(1.05);
                }
                
                .animation-playful ${this.selectors.sendButton}:active {
                    transform: scale(0.95);
                }
            `;
        }
    }

    /**
     * Load fonts needed for the theme
     * @param {Object} theme - Theme object
     */
    loadThemeFonts(theme) {
        const fontFamilies = [
            theme.fonts.primary,
            theme.fonts.secondary
        ];
        
        // Check which fonts need to be loaded
        const fontsToLoad = new Set();
        
        fontFamilies.forEach(font => {
            if (font.includes('Inter')) fontsToLoad.add('Inter');
            if (font.includes('Roboto')) fontsToLoad.add('Roboto');
            if (font.includes('Open Sans')) fontsToLoad.add('Open Sans');
            if (font.includes('Montserrat')) fontsToLoad.add('Montserrat');
            if (font.includes('Lato')) fontsToLoad.add('Lato');
            if (font.includes('Poppins')) fontsToLoad.add('Poppins');
        });
        
        // Skip if no fonts to load or already loaded
        if (fontsToLoad.size === 0 || document.getElementById('jaat-theme-fonts')) {
            return;
        }
        
        // Create Google Fonts link
        const fontFamiliesList = Array.from(fontsToLoad).join('|').replace(/ /g, '+');
        const fontLink = document.createElement('link');
        fontLink.id = 'jaat-theme-fonts';
        fontLink.rel = 'stylesheet';
        fontLink.href = `https://fonts.googleapis.com/css2?family=${fontFamiliesList}&display=swap`;
        
        document.head.appendChild(fontLink);
    }

    /**
     * Get font CSS value from font ID
     * @param {string} fontFamily - Font family ID or value
     * @returns {string} Font CSS value
     */
    getFontValue(fontFamily) {
        // If it's already a CSS value, return it
        if (fontFamily.includes(',')) {
            return fontFamily;
        }
        
        // Find font in options
        const font = this.fontOptions.families.find(f => f.id === fontFamily || f.name === fontFamily);
        return font ? font.value : 'system-ui, sans-serif';
    }

    /**
     * Get font size CSS value from size ID
     * @param {string} size - Font size ID or value
     * @returns {string} Font size CSS value
     */
    getFontSizeValue(size) {
        // If it's already a CSS value, return it
        if (size.includes('rem') || size.includes('px')) {
            return size;
        }
        
        // Find size in options
        const fontSize = this.fontOptions.sizes.find(s => s.id === size || s.name === size);
        return fontSize ? fontSize.value : '1rem';
    }

    /**
     * Get font weight CSS value from weight ID
     * @param {string} weight - Font weight ID or value
     * @returns {string} Font weight CSS value
     */
    getFontWeightValue(weight) {
        // If it's already a CSS value (numeric), return it
        if (!isNaN(weight)) {
            return weight;
        }
        
        // Find weight in options
        const fontWeight = this.fontOptions.weights.find(w => w.id === weight || w.name === weight);
        return fontWeight ? fontWeight.value : '400';
    }

    /**
     * Get border radius CSS value from radius ID
     * @param {string} radius - Border radius ID or value
     * @returns {string} Border radius CSS value
     */
    getBorderRadiusValue(radius) {
        // If it's already a CSS value, return it
        if (radius.includes('rem') || radius.includes('px') || radius.includes('%')) {
            return radius;
        }
        
        // Find radius in options
        const borderRadius = this.layoutOptions.borderRadius.find(r => r.id === radius || r.name === radius);
        return borderRadius ? borderRadius.value : '0.5rem';
    }

    /**
     * Get shadow CSS value from shadow ID
     * @param {string} shadow - Shadow ID or value
     * @returns {string} Shadow CSS value
     */
    getShadowValue(shadow) {
        // If it's already a CSS value, return it
        if (shadow.includes('rgba') || shadow.includes('rgb') || shadow === 'none') {
            return shadow;
        }
        
        // Find shadow in options
        const shadowOption = this.layoutOptions.shadows.find(s => s.id === shadow || s.name === shadow);
        return shadowOption ? shadowOption.value : 'none';
    }

    /**
     * Get density padding and spacing values
     * @param {string} density - Density ID or name
     * @returns {Object} Density values
     */
    getDensityValues(density) {
        // Find density in options
        const densityOption = this.layoutOptions.density.find(d => d.id === density || d.name === density);
        return densityOption ? 
            { padding: densityOption.padding, spacing: densityOption.spacing } : 
            { padding: '1rem', spacing: '1rem' };
    }

    /**
     * Change theme to a predefined one
     * @param {string} themeId - Theme ID
     * @returns {boolean} Success
     */
    changeTheme(themeId) {
        const theme = this.themes.find(t => t.id === themeId);
        if (!theme) {
            console.warn(`Theme not found: ${themeId}`);
            return false;
        }
        
        this.applyTheme(theme);
        return true;
    }

    /**
     * Create a custom theme by modifying an existing theme
     * @param {string} baseThemeId - Base theme ID
     * @param {Object} modifications - Theme modifications
     * @returns {Object} Created custom theme
     */
    createCustomTheme(baseThemeId, modifications) {
        // Find base theme
        const baseTheme = this.themes.find(t => t.id === baseThemeId) || this.themes[0];
        
        // Create new theme with modifications
        const customTheme = {
            id: 'custom',
            name: 'Custom Theme',
            description: 'Your custom theme',
            ...baseTheme,
            ...modifications
        };
        
        // If modifications include colors, merge them
        if (modifications.colors) {
            customTheme.colors = { ...baseTheme.colors, ...modifications.colors };
        }
        
        // If modifications include fonts, merge them
        if (modifications.fonts) {
            customTheme.fonts = { ...baseTheme.fonts, ...modifications.fonts };
        }
        
        // Apply custom theme
        this.applyTheme(customTheme);
        
        // Return created theme
        return customTheme;
    }

    /**
     * Reset to default theme
     */
    resetToDefault() {
        const defaultTheme = this.themes[0];
        this.applyTheme(defaultTheme);
    }

    /**
     * Adjust color brightness
     * @param {string} color - Hex color
     * @param {number} percent - Percent to adjust (-100 to 100)
     * @returns {string} Adjusted color
     */
    adjustColorBrightness(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        
        return '#' + (
            0x1000000 +
            (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 0 ? 0 : B) : 255)
        ).toString(16).slice(1);
    }

    /**
     * Convert hex color to rgba
     * @param {string} hex - Hex color
     * @param {number} alpha - Alpha value (0-1)
     * @returns {string} RGBA color
     */
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    /**
     * Create UI for skin customizer
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
        uiContainer.className = 'skin-customizer-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'skin-customizer-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'skin-customizer-title';
        title.textContent = 'Chat Interface Customizer';
        header.appendChild(title);
        
        // Create themes section
        const themesSection = document.createElement('div');
        themesSection.className = 'skin-customizer-section';
        uiContainer.appendChild(themesSection);
        
        const themesTitle = document.createElement('h4');
        themesTitle.className = 'section-title';
        themesTitle.textContent = 'Themes';
        themesSection.appendChild(themesTitle);
        
        const themesGrid = document.createElement('div');
        themesGrid.className = 'themes-grid';
        themesSection.appendChild(themesGrid);
        
        // Add theme options
        this.themes.forEach(theme => {
            const themeCard = document.createElement('div');
            themeCard.className = 'theme-card';
            themeCard.dataset.themeId = theme.id;
            
            if (theme.id === this.currentTheme.id) {
                themeCard.classList.add('active');
            }
            
            // Theme preview
            const themePreview = document.createElement('div');
            themePreview.className = 'theme-preview';
            themePreview.style.backgroundColor = theme.colors.background;
            themeCard.appendChild(themePreview);
            
            // Preview content
            const previewContent = document.createElement('div');
            previewContent.className = 'preview-content';
            themePreview.appendChild(previewContent);
            
            // AI message preview
            const aiMessage = document.createElement('div');
            aiMessage.className = 'preview-ai-message';
            aiMessage.style.backgroundColor = theme.colors.aiMessage;
            aiMessage.style.color = theme.colors.aiMessageText;
            aiMessage.style.borderRadius = this.getBorderRadiusValue(theme.borderRadius);
            aiMessage.textContent = 'AI';
            previewContent.appendChild(aiMessage);
            
            // User message preview
            const userMessage = document.createElement('div');
            userMessage.className = 'preview-user-message';
            userMessage.style.backgroundColor = theme.colors.userMessage;
            userMessage.style.color = theme.colors.userMessageText;
            userMessage.style.borderRadius = this.getBorderRadiusValue(theme.borderRadius);
            userMessage.textContent = 'You';
            previewContent.appendChild(userMessage);
            
            // Theme info
            const themeInfo = document.createElement('div');
            themeInfo.className = 'theme-info';
            themeCard.appendChild(themeInfo);
            
            const themeName = document.createElement('div');
            themeName.className = 'theme-name';
            themeName.textContent = theme.name;
            themeInfo.appendChild(themeName);
            
            // Add click handler
            themeCard.addEventListener('click', () => {
                // Remove active class from all cards
                themesGrid.querySelectorAll('.theme-card').forEach(card => {
                    card.classList.remove('active');
                });
                
                // Add active class to clicked card
                themeCard.classList.add('active');
                
                // Apply theme
                this.changeTheme(theme.id);
                
                // Update customization controls
                updateCustomizationControls(theme);
            });
            
            themesGrid.appendChild(themeCard);
        });
        
        // Create customization section
        const customizeSection = document.createElement('div');
        customizeSection.className = 'skin-customizer-section';
        uiContainer.appendChild(customizeSection);
        
        const customizeTitle = document.createElement('h4');
        customizeTitle.className = 'section-title';
        customizeTitle.textContent = 'Customize Theme';
        customizeSection.appendChild(customizeTitle);
        
        // Create accordion for customization options
        const accordionContainer = document.createElement('div');
        accordionContainer.className = 'accordion-container';
        customizeSection.appendChild(accordionContainer);
        
        // Colors accordion
        const colorsAccordion = this.createAccordionItem('Colors', true);
        accordionContainer.appendChild(colorsAccordion);
        
        const colorsContent = colorsAccordion.querySelector('.accordion-content');
        
        // Add color pickers
        const colorGroups = [
            { id: 'primary', label: 'Primary Color' },
            { id: 'background', label: 'Background' },
            { id: 'surface', label: 'Surface' },
            { id: 'text', label: 'Text' },
            { id: 'userMessage', label: 'User Message' },
            { id: 'userMessageText', label: 'User Message Text' },
            { id: 'aiMessage', label: 'AI Message' },
            { id: 'aiMessageText', label: 'AI Message Text' }
        ];
        
        colorGroups.forEach(color => {
            const colorGroup = document.createElement('div');
            colorGroup.className = 'customizer-group';
            colorsContent.appendChild(colorGroup);
            
            const colorLabel = document.createElement('label');
            colorLabel.htmlFor = `color-${color.id}`;
            colorLabel.textContent = color.label;
            colorGroup.appendChild(colorLabel);
            
            const colorPicker = document.createElement('input');
            colorPicker.type = 'color';
            colorPicker.id = `color-${color.id}`;
            colorPicker.className = 'color-picker';
            colorPicker.value = this.currentTheme.colors[color.id];
            
            colorPicker.addEventListener('input', () => {
                // Create custom theme with updated color
                const modifications = {
                    colors: {
                        [color.id]: colorPicker.value
                    }
                };
                
                this.createCustomTheme(this.currentTheme.id, modifications);
            });
            
            colorGroup.appendChild(colorPicker);
        });
        
        // Typography accordion
        const typographyAccordion = this.createAccordionItem('Typography', false);
        accordionContainer.appendChild(typographyAccordion);
        
        const typographyContent = typographyAccordion.querySelector('.accordion-content');
        
        // Font family select
        const fontFamilyGroup = document.createElement('div');
        fontFamilyGroup.className = 'customizer-group';
        typographyContent.appendChild(fontFamilyGroup);
        
        const fontFamilyLabel = document.createElement('label');
        fontFamilyLabel.htmlFor = 'font-family';
        fontFamilyLabel.textContent = 'Font Family';
        fontFamilyGroup.appendChild(fontFamilyLabel);
        
        const fontFamilySelect = document.createElement('select');
        fontFamilySelect.id = 'font-family';
        fontFamilySelect.className = 'customizer-select';
        
        this.fontOptions.families.forEach(font => {
            const option = document.createElement('option');
            option.value = font.id;
            option.textContent = font.name;
            
            // Select current font
            if (this.currentTheme.fonts.primary === font.value || 
                this.currentTheme.fonts.primary === font.id) {
                option.selected = true;
            }
            
            fontFamilySelect.appendChild(option);
        });
        
        fontFamilySelect.addEventListener('change', () => {
            const selectedFont = this.fontOptions.families.find(f => f.id === fontFamilySelect.value);
            
            if (selectedFont) {
                const modifications = {
                    fonts: {
                        primary: selectedFont.value
                    }
                };
                
                this.createCustomTheme(this.currentTheme.id, modifications);
            }
        });
        
        fontFamilyGroup.appendChild(fontFamilySelect);
        
        // Font size select
        const fontSizeGroup = document.createElement('div');
        fontSizeGroup.className = 'customizer-group';
        typographyContent.appendChild(fontSizeGroup);
        
        const fontSizeLabel = document.createElement('label');
        fontSizeLabel.htmlFor = 'font-size';
        fontSizeLabel.textContent = 'Font Size';
        fontSizeGroup.appendChild(fontSizeLabel);
        
        const fontSizeSelect = document.createElement('select');
        fontSizeSelect.id = 'font-size';
        fontSizeSelect.className = 'customizer-select';
        
        this.fontOptions.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size.id;
            option.textContent = size.name;
            
            // Select current size
            if (this.currentTheme.fonts.size === size.id || 
                this.currentTheme.fonts.size === size.value) {
                option.selected = true;
            }
            
            fontSizeSelect.appendChild(option);
        });
        
        fontSizeSelect.addEventListener('change', () => {
            const selectedSize = this.fontOptions.sizes.find(s => s.id === fontSizeSelect.value);
            
            if (selectedSize) {
                const modifications = {
                    fonts: {
                        size: selectedSize.id
                    }
                };
                
                this.createCustomTheme(this.currentTheme.id, modifications);
            }
        });
        
        fontSizeGroup.appendChild(fontSizeSelect);
        
        // Font weight select
        const fontWeightGroup = document.createElement('div');
        fontWeightGroup.className = 'customizer-group';
        typographyContent.appendChild(fontWeightGroup);
        
        const fontWeightLabel = document.createElement('label');
        fontWeightLabel.htmlFor = 'font-weight';
        fontWeightLabel.textContent = 'Font Weight';
        fontWeightGroup.appendChild(fontWeightLabel);
        
        const fontWeightSelect = document.createElement('select');
        fontWeightSelect.id = 'font-weight';
        fontWeightSelect.className = 'customizer-select';
        
        this.fontOptions.weights.forEach(weight => {
            const option = document.createElement('option');
            option.value = weight.id;
            option.textContent = weight.name;
            
            // Select current weight
            if (this.currentTheme.fonts.weight === weight.id || 
                this.currentTheme.fonts.weight === weight.value) {
                option.selected = true;
            }
            
            fontWeightSelect.appendChild(option);
        });
        
        fontWeightSelect.addEventListener('change', () => {
            const selectedWeight = this.fontOptions.weights.find(w => w.id === fontWeightSelect.value);
            
            if (selectedWeight) {
                const modifications = {
                    fonts: {
                        weight: selectedWeight.id
                    }
                };
                
                this.createCustomTheme(this.currentTheme.id, modifications);
            }
        });
        
        fontWeightGroup.appendChild(fontWeightSelect);
        
        // Layout accordion
        const layoutAccordion = this.createAccordionItem('Layout', false);
        accordionContainer.appendChild(layoutAccordion);
        
        const layoutContent = layoutAccordion.querySelector('.accordion-content');
        
        // Border radius select
        const borderRadiusGroup = document.createElement('div');
        borderRadiusGroup.className = 'customizer-group';
        layoutContent.appendChild(borderRadiusGroup);
        
        const borderRadiusLabel = document.createElement('label');
        borderRadiusLabel.htmlFor = 'border-radius';
        borderRadiusLabel.textContent = 'Border Radius';
        borderRadiusGroup.appendChild(borderRadiusLabel);
        
        const borderRadiusSelect = document.createElement('select');
        borderRadiusSelect.id = 'border-radius';
        borderRadiusSelect.className = 'customizer-select';
        
        this.layoutOptions.borderRadius.forEach(radius => {
            const option = document.createElement('option');
            option.value = radius.id;
            option.textContent = radius.name;
            
            // Select current radius
            if (this.currentTheme.borderRadius === radius.id) {
                option.selected = true;
            }
            
            borderRadiusSelect.appendChild(option);
        });
        
        borderRadiusSelect.addEventListener('change', () => {
            const modifications = {
                borderRadius: borderRadiusSelect.value
            };
            
            this.createCustomTheme(this.currentTheme.id, modifications);
        });
        
        borderRadiusGroup.appendChild(borderRadiusSelect);
        
        // Shadow select
        const shadowGroup = document.createElement('div');
        shadowGroup.className = 'customizer-group';
        layoutContent.appendChild(shadowGroup);
        
        const shadowLabel = document.createElement('label');
        shadowLabel.htmlFor = 'shadow';
        shadowLabel.textContent = 'Shadows';
        shadowGroup.appendChild(shadowLabel);
        
        const shadowSelect = document.createElement('select');
        shadowSelect.id = 'shadow';
        shadowSelect.className = 'customizer-select';
        
        this.layoutOptions.shadows.forEach(shadow => {
            const option = document.createElement('option');
            option.value = shadow.id;
            option.textContent = shadow.name;
            
            // Select current shadow
            if (this.currentTheme.shadows === shadow.id) {
                option.selected = true;
            }
            
            shadowSelect.appendChild(option);
        });
        
        shadowSelect.addEventListener('change', () => {
            const modifications = {
                shadows: shadowSelect.value
            };
            
            this.createCustomTheme(this.currentTheme.id, modifications);
        });
        
        shadowGroup.appendChild(shadowSelect);
        
        // Density select
        const densityGroup = document.createElement('div');
        densityGroup.className = 'customizer-group';
        layoutContent.appendChild(densityGroup);
        
        const densityLabel = document.createElement('label');
        densityLabel.htmlFor = 'density';
        densityLabel.textContent = 'Spacing Density';
        densityGroup.appendChild(densityLabel);
        
        const densitySelect = document.createElement('select');
        densitySelect.id = 'density';
        densitySelect.className = 'customizer-select';
        
        this.layoutOptions.density.forEach(density => {
            const option = document.createElement('option');
            option.value = density.id;
            option.textContent = density.name;
            
            // Select current density
            if (this.currentTheme.density === density.id) {
                option.selected = true;
            }
            
            densitySelect.appendChild(option);
        });
        
        densitySelect.addEventListener('change', () => {
            const modifications = {
                density: densitySelect.value
            };
            
            this.createCustomTheme(this.currentTheme.id, modifications);
        });
        
        densityGroup.appendChild(densitySelect);
        
        // Animation select
        const animationGroup = document.createElement('div');
        animationGroup.className = 'customizer-group';
        layoutContent.appendChild(animationGroup);
        
        const animationLabel = document.createElement('label');
        animationLabel.htmlFor = 'animation';
        animationLabel.textContent = 'Animation';
        animationGroup.appendChild(animationLabel);
        
        const animationSelect = document.createElement('select');
        animationSelect.id = 'animation';
        animationSelect.className = 'customizer-select';
        
        this.layoutOptions.animation.forEach(animation => {
            const option = document.createElement('option');
            option.value = animation.id;
            option.textContent = animation.name;
            
            // Select current animation
            if (this.currentTheme.animation === animation.id) {
                option.selected = true;
            }
            
            animationSelect.appendChild(option);
        });
        
        animationSelect.addEventListener('change', () => {
            const modifications = {
                animation: animationSelect.value
            };
            
            this.createCustomTheme(this.currentTheme.id, modifications);
        });
        
        animationGroup.appendChild(animationSelect);
        
        // Function to update customization controls based on theme
        const updateCustomizationControls = (theme) => {
            // Update color pickers
            colorGroups.forEach(color => {
                const picker = document.getElementById(`color-${color.id}`);
                if (picker) {
                    picker.value = theme.colors[color.id];
                }
            });
            
            // Update font family select
            const primaryFontValue = this.getFontValue(theme.fonts.primary);
            const primaryFontOption = this.fontOptions.families.find(f => f.value === primaryFontValue);
            if (primaryFontOption && fontFamilySelect) {
                fontFamilySelect.value = primaryFontOption.id;
            }
            
            // Update font size select
            const fontSize = theme.fonts.size;
            if (fontSizeSelect) {
                const fontSizeOption = this.fontOptions.sizes.find(s => s.id === fontSize || s.value === fontSize);
                if (fontSizeOption) {
                    fontSizeSelect.value = fontSizeOption.id;
                }
            }
            
            // Update font weight select
            const fontWeight = theme.fonts.weight;
            if (fontWeightSelect) {
                const fontWeightOption = this.fontOptions.weights.find(w => w.id === fontWeight || w.value === fontWeight);
                if (fontWeightOption) {
                    fontWeightSelect.value = fontWeightOption.id;
                }
            }
            
            // Update border radius select
            if (borderRadiusSelect) {
                borderRadiusSelect.value = theme.borderRadius;
            }
            
            // Update shadow select
            if (shadowSelect) {
                shadowSelect.value = theme.shadows;
            }
            
            // Update density select
            if (densitySelect) {
                densitySelect.value = theme.density;
            }
            
            // Update animation select
            if (animationSelect) {
                animationSelect.value = theme.animation;
            }
        };
        
        // Reset button
        const resetButton = document.createElement('button');
        resetButton.className = 'reset-button';
        resetButton.textContent = 'Reset to Default';
        customizeSection.appendChild(resetButton);
        
        resetButton.addEventListener('click', () => {
            this.resetToDefault();
            
            // Update theme card selection
            themesGrid.querySelectorAll('.theme-card').forEach(card => {
                card.classList.remove('active');
                if (card.dataset.themeId === 'default') {
                    card.classList.add('active');
                }
            });
            
            // Update controls
            updateCustomizationControls(this.themes[0]);
        });
        
        // Add accordion event listeners
        const accordionHeaders = accordionContainer.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                header.classList.toggle('active');
                const content = header.nextElementSibling;
                
                if (header.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
            });
        });
        
        // Trigger active accordions
        const activeAccordions = accordionContainer.querySelectorAll('.accordion-header.active');
        activeAccordions.forEach(header => {
            const content = header.nextElementSibling;
            content.style.maxHeight = content.scrollHeight + 'px';
        });
        
        // Add styles
        this.addStyles();
        
        return uiContainer;
    }

    /**
     * Create an accordion item
     * @param {string} title - Accordion title
     * @param {boolean} isOpen - Whether accordion is open by default
     * @returns {HTMLElement} Accordion item element
     */
    createAccordionItem(title, isOpen = false) {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        
        const header = document.createElement('div');
        header.className = 'accordion-header';
        if (isOpen) {
            header.classList.add('active');
        }
        
        header.textContent = title;
        item.appendChild(header);
        
        const content = document.createElement('div');
        content.className = 'accordion-content';
        content.style.maxHeight = isOpen ? 'auto' : '0';
        item.appendChild(content);
        
        return item;
    }

    /**
     * Add CSS styles
     */
    addStyles() {
        const styleId = 'skin-customizer-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .skin-customizer-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .skin-customizer-header {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .skin-customizer-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .skin-customizer-section {
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
            
            /* Themes grid */
            .themes-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                gap: 1rem;
            }
            
            .theme-card {
                border: 2px solid transparent;
                border-radius: var(--radius-sm, 0.375rem);
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.2s, border-color 0.2s;
            }
            
            .theme-card:hover {
                transform: translateY(-3px);
            }
            
            .theme-card.active {
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .theme-preview {
                height: 80px;
                padding: 0.5rem;
                position: relative;
                overflow: hidden;
            }
            
            .preview-content {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                align-items: flex-end;
                transform: scale(0.7);
                transform-origin: right bottom;
            }
            
            .preview-ai-message,
            .preview-user-message {
                padding: 0.5rem;
                font-size: 0.75rem;
                font-weight: 500;
            }
            
            .theme-info {
                background-color: var(--bg-secondary, #161b22);
                padding: 0.5rem;
                border-top: 1px solid var(--border-color, #30363d);
            }
            
            .theme-name {
                font-size: 0.875rem;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            /* Accordion */
            .accordion-container {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .accordion-item {
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                overflow: hidden;
            }
            
            .accordion-header {
                padding: 0.75rem 1rem;
                background-color: var(--bg-secondary, #161b22);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                position: relative;
            }
            
            .accordion-header::after {
                content: '+';
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
            }
            
            .accordion-header.active::after {
                content: '−';
            }
            
            .accordion-content {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
                padding: 0 1rem;
            }
            
            .accordion-header.active + .accordion-content {
                padding: 1rem;
            }
            
            /* Customizer controls */
            .customizer-group {
                margin-bottom: 1rem;
            }
            
            .customizer-group label {
                display: block;
                font-size: 0.875rem;
                margin-bottom: 0.5rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .color-picker {
                width: 100%;
                height: 2.5rem;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                cursor: pointer;
            }
            
            .customizer-select {
                width: 100%;
                padding: 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .reset-button {
                padding: 0.625rem 1.25rem;
                background-color: var(--error-color, #ef4444);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
                margin-top: 1rem;
            }
            
            .reset-button:hover {
                background-color: var(--error-hover, #dc2626);
            }
            
            @media (max-width: 768px) {
                .themes-grid {
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                }
            }
            
            @media (max-width: 480px) {
                .themes-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChatbotSkinCustomizer };
} else {
    // Add to global scope for browser usage
    window.ChatbotSkinCustomizer = ChatbotSkinCustomizer;
}
/**
 * JAAT-AI Font Switcher Feature
 * Change and customize chat font styles with various options
 */

class FontSwitcher {
    constructor() {
        this.fonts = [
            { id: 'default', name: 'Default', family: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', category: 'system' },
            { id: 'inter', name: 'Inter', family: '"Inter", sans-serif', category: 'sans-serif' },
            { id: 'roboto', name: 'Roboto', family: '"Roboto", sans-serif', category: 'sans-serif' },
            { id: 'open-sans', name: 'Open Sans', family: '"Open Sans", sans-serif', category: 'sans-serif' },
            { id: 'lato', name: 'Lato', family: '"Lato", sans-serif', category: 'sans-serif' },
            { id: 'montserrat', name: 'Montserrat', family: '"Montserrat", sans-serif', category: 'sans-serif' },
            { id: 'poppins', name: 'Poppins', family: '"Poppins", sans-serif', category: 'sans-serif' },
            { id: 'nunito', name: 'Nunito', family: '"Nunito", sans-serif', category: 'sans-serif' },
            { id: 'merriweather', name: 'Merriweather', family: '"Merriweather", serif', category: 'serif' },
            { id: 'playfair', name: 'Playfair Display', family: '"Playfair Display", serif', category: 'serif' },
            { id: 'libre-baskerville', name: 'Libre Baskerville', family: '"Libre Baskerville", serif', category: 'serif' },
            { id: 'fira-code', name: 'Fira Code', family: '"Fira Code", monospace', category: 'monospace' },
            { id: 'jetbrains-mono', name: 'JetBrains Mono', family: '"JetBrains Mono", monospace', category: 'monospace' },
            { id: 'source-code-pro', name: 'Source Code Pro', family: '"Source Code Pro", monospace', category: 'monospace' },
            { id: 'comic-neue', name: 'Comic Neue', family: '"Comic Neue", cursive', category: 'display' },
            { id: 'pacifico', name: 'Pacifico', family: '"Pacifico", cursive', category: 'display' },
            { id: 'caveat', name: 'Caveat', family: '"Caveat", cursive', category: 'handwriting' }
        ];
        
        // Categories for UI organization
        this.categories = [
            { id: 'system', name: 'System' },
            { id: 'sans-serif', name: 'Sans-Serif' },
            { id: 'serif', name: 'Serif' },
            { id: 'monospace', name: 'Monospace' },
            { id: 'display', name: 'Display' },
            { id: 'handwriting', name: 'Handwriting' }
        ];
        
        // Font size options
        this.fontSizes = [
            { id: 'xs', name: 'Extra Small', value: '12px' },
            { id: 'sm', name: 'Small', value: '14px' },
            { id: 'md', name: 'Medium', value: '16px' },
            { id: 'lg', name: 'Large', value: '18px' },
            { id: 'xl', name: 'Extra Large', value: '20px' },
            { id: '2xl', name: '2X Large', value: '24px' },
            { id: '3xl', name: 'Huge', value: '30px' }
        ];
        
        // Line spacing options
        this.lineSpacings = [
            { id: 'tight', name: 'Tight', value: 1.2 },
            { id: 'normal', name: 'Normal', value: 1.5 },
            { id: 'relaxed', name: 'Relaxed', value: 1.8 },
            { id: 'loose', name: 'Loose', value: 2 }
        ];
        
        // Letter spacing options
        this.letterSpacings = [
            { id: 'tighter', name: 'Tighter', value: '-0.05em' },
            { id: 'tight', name: 'Tight', value: '-0.025em' },
            { id: 'normal', name: 'Normal', value: '0' },
            { id: 'wide', name: 'Wide', value: '0.025em' },
            { id: 'wider', name: 'Wider', value: '0.05em' }
        ];
        
        // Current settings
        this.currentFont = 'default';
        this.currentFontSize = 'md';
        this.currentLineSpacing = 'normal';
        this.currentLetterSpacing = 'normal';
        this.fontWeight = 400;
        this.isItalic = false;
        
        // Storage keys
        this.storageKeyPrefix = 'jaat-font-';
        
        // Font loading status
        this.loadedFonts = new Set(['default']);
    }

    /**
     * Initialize font switcher
     * @param {Object} options - Configuration options
     * @returns {FontSwitcher} This instance
     */
    init(options = {}) {
        // Apply custom options
        if (options.defaultFont && this.getFontById(options.defaultFont)) {
            this.currentFont = options.defaultFont;
        }
        
        if (options.defaultFontSize && this.getFontSizeById(options.defaultFontSize)) {
            this.currentFontSize = options.defaultFontSize;
        }
        
        if (options.defaultLineSpacing && this.getLineSpacingById(options.defaultLineSpacing)) {
            this.currentLineSpacing = options.defaultLineSpacing;
        }
        
        if (options.defaultLetterSpacing && this.getLetterSpacingById(options.defaultLetterSpacing)) {
            this.currentLetterSpacing = options.defaultLetterSpacing;
        }
        
        if (typeof options.defaultFontWeight === 'number') {
            this.fontWeight = Math.max(100, Math.min(900, options.defaultFontWeight));
        }
        
        if (typeof options.defaultItalic === 'boolean') {
            this.isItalic = options.defaultItalic;
        }
        
        // Load saved preferences
        this.loadPreferences();
        
        // Apply font settings
        this.applyFontSettings();
        
        console.log('Font Switcher initialized with font:', this.currentFont);
        return this;
    }

    /**
     * Load saved preferences from localStorage
     */
    loadPreferences() {
        try {
            const savedFont = localStorage.getItem(`${this.storageKeyPrefix}font`);
            if (savedFont && this.getFontById(savedFont)) {
                this.currentFont = savedFont;
            }
            
            const savedFontSize = localStorage.getItem(`${this.storageKeyPrefix}size`);
            if (savedFontSize && this.getFontSizeById(savedFontSize)) {
                this.currentFontSize = savedFontSize;
            }
            
            const savedLineSpacing = localStorage.getItem(`${this.storageKeyPrefix}line-spacing`);
            if (savedLineSpacing && this.getLineSpacingById(savedLineSpacing)) {
                this.currentLineSpacing = savedLineSpacing;
            }
            
            const savedLetterSpacing = localStorage.getItem(`${this.storageKeyPrefix}letter-spacing`);
            if (savedLetterSpacing && this.getLetterSpacingById(savedLetterSpacing)) {
                this.currentLetterSpacing = savedLetterSpacing;
            }
            
            const savedFontWeight = localStorage.getItem(`${this.storageKeyPrefix}weight`);
            if (savedFontWeight) {
                this.fontWeight = parseInt(savedFontWeight, 10);
            }
            
            const savedItalic = localStorage.getItem(`${this.storageKeyPrefix}italic`);
            if (savedItalic !== null) {
                this.isItalic = savedItalic === 'true';
            }
        } catch (error) {
            console.error('Error loading font preferences:', error);
        }
    }

    /**
     * Save current settings to localStorage
     */
    savePreferences() {
        try {
            localStorage.setItem(`${this.storageKeyPrefix}font`, this.currentFont);
            localStorage.setItem(`${this.storageKeyPrefix}size`, this.currentFontSize);
            localStorage.setItem(`${this.storageKeyPrefix}line-spacing`, this.currentLineSpacing);
            localStorage.setItem(`${this.storageKeyPrefix}letter-spacing`, this.currentLetterSpacing);
            localStorage.setItem(`${this.storageKeyPrefix}weight`, this.fontWeight.toString());
            localStorage.setItem(`${this.storageKeyPrefix}italic`, this.isItalic.toString());
        } catch (error) {
            console.error('Error saving font preferences:', error);
        }
    }

    /**
     * Get font by ID
     * @param {string} id - Font ID
     * @returns {Object|null} Font object or null if not found
     */
    getFontById(id) {
        return this.fonts.find(font => font.id === id) || null;
    }

    /**
     * Get font size by ID
     * @param {string} id - Font size ID
     * @returns {Object|null} Font size object or null if not found
     */
    getFontSizeById(id) {
        return this.fontSizes.find(size => size.id === id) || null;
    }

    /**
     * Get line spacing by ID
     * @param {string} id - Line spacing ID
     * @returns {Object|null} Line spacing object or null if not found
     */
    getLineSpacingById(id) {
        return this.lineSpacings.find(spacing => spacing.id === id) || null;
    }

    /**
     * Get letter spacing by ID
     * @param {string} id - Letter spacing ID
     * @returns {Object|null} Letter spacing object or null if not found
     */
    getLetterSpacingById(id) {
        return this.letterSpacings.find(spacing => spacing.id === id) || null;
    }

    /**
     * Load a web font
     * @param {string} fontId - Font ID to load
     * @returns {Promise<void>}
     */
    async loadFont(fontId) {
        // Skip if font is already loaded or it's the default system font
        if (this.loadedFonts.has(fontId) || fontId === 'default') {
            return;
        }
        
        const font = this.getFontById(fontId);
        if (!font) {
            throw new Error(`Font not found: ${fontId}`);
        }
        
        try {
            // In a real implementation, we'd load the font using the FontFace API or Web Font Loader
            console.log(`Loading font: ${font.name}`);
            
            // For this example, we'll simulate loading
            // In a real implementation, this would be:
            
            /*
            // Using FontFace API
            const fontFace = new FontFace(font.name, `url('/fonts/${font.id}.woff2')`, {
                style: 'normal',
                weight: '400'
            });
            
            // Wait for font to load
            await fontFace.load();
            
            // Add to document fonts
            document.fonts.add(fontFace);
            */
            
            // Mark as loaded
            this.loadedFonts.add(fontId);
            
            // For Google Fonts, we would create a link element
            this.addGoogleFontLink(font);
            
        } catch (error) {
            console.error(`Failed to load font ${font.name}:`, error);
            throw error;
        }
    }

    /**
     * Add Google Font link to the document
     * @param {Object} font - Font object
     */
    addGoogleFontLink(font) {
        // Skip for default font
        if (font.id === 'default') {
            return;
        }
        
        // Check if link already exists
        const existingLink = document.querySelector(`link[href*="${font.id}"]`);
        if (existingLink) {
            return;
        }
        
        // Format font name for URL
        const formattedName = font.name.replace(/\s+/g, '+');
        
        // Calculate weight and style for URL
        const weights = [this.fontWeight];
        const styles = [this.isItalic ? 'italic' : 'normal'];
        
        // Create link element
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${formattedName}:ital,wght@${styles.map((style, i) => `${style === 'italic' ? 1 : 0},${weights[i]}`).join(';')}&display=swap`;
        
        // Add to document head
        document.head.appendChild(link);
    }

    /**
     * Apply current font settings to the document
     */
    applyFontSettings() {
        // Get current font
        const font = this.getFontById(this.currentFont);
        if (!font) {
            return;
        }
        
        // Load font if not loaded
        if (!this.loadedFonts.has(this.currentFont)) {
            this.loadFont(this.currentFont)
                .catch(error => console.error('Failed to load font:', error));
        }
        
        // Get font size
        const fontSize = this.getFontSizeById(this.currentFontSize);
        
        // Get line spacing
        const lineSpacing = this.getLineSpacingById(this.currentLineSpacing);
        
        // Get letter spacing
        const letterSpacing = this.getLetterSpacingById(this.currentLetterSpacing);
        
        // Create or update style element
        let styleEl = document.getElementById('jaat-font-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'jaat-font-style';
            document.head.appendChild(styleEl);
        }
        
        // Update CSS
        styleEl.textContent = `
            :root {
                --jaat-font-family: ${font.family};
                --jaat-font-size: ${fontSize ? fontSize.value : '16px'};
                --jaat-line-height: ${lineSpacing ? lineSpacing.value : 1.5};
                --jaat-letter-spacing: ${letterSpacing ? letterSpacing.value : '0'};
                --jaat-font-weight: ${this.fontWeight};
                --jaat-font-style: ${this.isItalic ? 'italic' : 'normal'};
            }
            
            body, .chat-container, .message-container, .input-container, textarea, input, button, .message {
                font-family: var(--jaat-font-family) !important;
                font-weight: var(--jaat-font-weight) !important;
                font-style: var(--jaat-font-style) !important;
            }
            
            .chat-container, .message-container, .message, .chat-input, .chat-content {
                font-size: var(--jaat-font-size) !important;
                line-height: var(--jaat-line-height) !important;
                letter-spacing: var(--jaat-letter-spacing) !important;
            }
            
            /* Preserve monospace fonts in code blocks */
            pre, code, .code-block, .syntax-highlighted {
                font-family: "Fira Code", "JetBrains Mono", monospace !important;
            }
        `;
    }

    /**
     * Change the current font
     * @param {string} fontId - Font ID to use
     * @returns {Promise<boolean>} Whether the font was changed successfully
     */
    async changeFont(fontId) {
        // Check if font exists
        const font = this.getFontById(fontId);
        if (!font) {
            console.warn(`Font not found: ${fontId}`);
            return false;
        }
        
        // Load font if necessary
        try {
            await this.loadFont(fontId);
        } catch (error) {
            console.error(`Failed to load font ${fontId}:`, error);
            return false;
        }
        
        // Update current font
        this.currentFont = fontId;
        
        // Apply settings
        this.applyFontSettings();
        
        // Save preferences
        this.savePreferences();
        
        return true;
    }

    /**
     * Change the current font size
     * @param {string} sizeId - Font size ID to use
     * @returns {boolean} Whether the font size was changed successfully
     */
    changeFontSize(sizeId) {
        // Check if font size exists
        const fontSize = this.getFontSizeById(sizeId);
        if (!fontSize) {
            console.warn(`Font size not found: ${sizeId}`);
            return false;
        }
        
        // Update current font size
        this.currentFontSize = sizeId;
        
        // Apply settings
        this.applyFontSettings();
        
        // Save preferences
        this.savePreferences();
        
        return true;
    }

    /**
     * Change the current line spacing
     * @param {string} spacingId - Line spacing ID to use
     * @returns {boolean} Whether the line spacing was changed successfully
     */
    changeLineSpacing(spacingId) {
        // Check if line spacing exists
        const lineSpacing = this.getLineSpacingById(spacingId);
        if (!lineSpacing) {
            console.warn(`Line spacing not found: ${spacingId}`);
            return false;
        }
        
        // Update current line spacing
        this.currentLineSpacing = spacingId;
        
        // Apply settings
        this.applyFontSettings();
        
        // Save preferences
        this.savePreferences();
        
        return true;
    }

    /**
     * Change the current letter spacing
     * @param {string} spacingId - Letter spacing ID to use
     * @returns {boolean} Whether the letter spacing was changed successfully
     */
    changeLetterSpacing(spacingId) {
        // Check if letter spacing exists
        const letterSpacing = this.getLetterSpacingById(spacingId);
        if (!letterSpacing) {
            console.warn(`Letter spacing not found: ${spacingId}`);
            return false;
        }
        
        // Update current letter spacing
        this.currentLetterSpacing = spacingId;
        
        // Apply settings
        this.applyFontSettings();
        
        // Save preferences
        this.savePreferences();
        
        return true;
    }

    /**
     * Change the font weight
     * @param {number} weight - Font weight (100-900)
     * @returns {boolean} Whether the font weight was changed successfully
     */
    changeFontWeight(weight) {
        // Validate weight
        if (weight < 100 || weight > 900 || weight % 100 !== 0) {
            console.warn(`Invalid font weight: ${weight}. Must be 100-900 in increments of 100.`);
            return false;
        }
        
        // Update current font weight
        this.fontWeight = weight;
        
        // Apply settings
        this.applyFontSettings();
        
        // Save preferences
        this.savePreferences();
        
        return true;
    }

    /**
     * Toggle italic font style
     * @returns {boolean} New italic state
     */
    toggleItalic() {
        // Toggle italic state
        this.isItalic = !this.isItalic;
        
        // Apply settings
        this.applyFontSettings();
        
        // Save preferences
        this.savePreferences();
        
        return this.isItalic;
    }

    /**
     * Reset all font settings to defaults
     * @returns {boolean} Whether the reset was successful
     */
    resetToDefaults() {
        // Reset to defaults
        this.currentFont = 'default';
        this.currentFontSize = 'md';
        this.currentLineSpacing = 'normal';
        this.currentLetterSpacing = 'normal';
        this.fontWeight = 400;
        this.isItalic = false;
        
        // Apply settings
        this.applyFontSettings();
        
        // Save preferences
        this.savePreferences();
        
        return true;
    }

    /**
     * Create font switcher UI
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
        uiContainer.className = 'font-switcher-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'font-switcher-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'font-switcher-title';
        title.textContent = 'Font Customization';
        header.appendChild(title);
        
        // Create tabs for font categories
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'font-switcher-tabs';
        uiContainer.appendChild(tabsContainer);
        
        // Add All Fonts tab
        const allTab = document.createElement('button');
        allTab.className = 'font-tab active';
        allTab.dataset.category = 'all';
        allTab.textContent = 'All Fonts';
        tabsContainer.appendChild(allTab);
        
        // Add category tabs
        this.categories.forEach(category => {
            // Skip if no fonts in this category
            if (!this.fonts.some(font => font.category === category.id)) {
                return;
            }
            
            const tab = document.createElement('button');
            tab.className = 'font-tab';
            tab.dataset.category = category.id;
            tab.textContent = category.name;
            tabsContainer.appendChild(tab);
        });
        
        // Create fonts grid
        const fontsContainer = document.createElement('div');
        fontsContainer.className = 'fonts-container';
        uiContainer.appendChild(fontsContainer);
        
        const fontsGrid = document.createElement('div');
        fontsGrid.className = 'fonts-grid';
        fontsContainer.appendChild(fontsGrid);
        
        // Add fonts to grid
        this.fonts.forEach(font => {
            const fontItem = document.createElement('div');
            fontItem.className = 'font-item';
            fontItem.dataset.category = font.category;
            if (font.id === this.currentFont) {
                fontItem.classList.add('active');
            }
            
            const fontPreview = document.createElement('div');
            fontPreview.className = 'font-preview';
            fontPreview.style.fontFamily = font.family;
            fontPreview.textContent = 'The quick brown fox jumps over the lazy dog';
            fontItem.appendChild(fontPreview);
            
            const fontInfo = document.createElement('div');
            fontInfo.className = 'font-info';
            fontItem.appendChild(fontInfo);
            
            const fontName = document.createElement('div');
            fontName.className = 'font-name';
            fontName.textContent = font.name;
            fontInfo.appendChild(fontName);
            
            const fontCategory = document.createElement('div');
            fontCategory.className = 'font-category';
            const category = this.categories.find(c => c.id === font.category);
            fontCategory.textContent = category ? category.name : font.category;
            fontInfo.appendChild(fontCategory);
            
            // Add click handler for font selection
            fontItem.addEventListener('click', async () => {
                // Show loading state
                fontItem.classList.add('loading');
                
                // Change font
                const success = await this.changeFont(font.id);
                
                // Remove loading state
                fontItem.classList.remove('loading');
                
                if (success) {
                    // Remove active class from all items
                    fontsGrid.querySelectorAll('.font-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // Add active class to selected item
                    fontItem.classList.add('active');
                }
            });
            
            fontsGrid.appendChild(fontItem);
        });
        
        // Create settings container
        const settingsContainer = document.createElement('div');
        settingsContainer.className = 'font-settings-container';
        uiContainer.appendChild(settingsContainer);
        
        // Font size selector
        const fontSizeContainer = document.createElement('div');
        fontSizeContainer.className = 'font-setting-group';
        settingsContainer.appendChild(fontSizeContainer);
        
        const fontSizeLabel = document.createElement('label');
        fontSizeLabel.className = 'font-setting-label';
        fontSizeLabel.textContent = 'Font Size';
        fontSizeContainer.appendChild(fontSizeLabel);
        
        const fontSizeSelect = document.createElement('select');
        fontSizeSelect.className = 'font-size-select';
        this.fontSizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size.id;
            option.textContent = size.name;
            if (size.id === this.currentFontSize) {
                option.selected = true;
            }
            fontSizeSelect.appendChild(option);
        });
        fontSizeContainer.appendChild(fontSizeSelect);
        
        // Line spacing selector
        const lineSpacingContainer = document.createElement('div');
        lineSpacingContainer.className = 'font-setting-group';
        settingsContainer.appendChild(lineSpacingContainer);
        
        const lineSpacingLabel = document.createElement('label');
        lineSpacingLabel.className = 'font-setting-label';
        lineSpacingLabel.textContent = 'Line Spacing';
        lineSpacingContainer.appendChild(lineSpacingLabel);
        
        const lineSpacingSelect = document.createElement('select');
        lineSpacingSelect.className = 'line-spacing-select';
        this.lineSpacings.forEach(spacing => {
            const option = document.createElement('option');
            option.value = spacing.id;
            option.textContent = spacing.name;
            if (spacing.id === this.currentLineSpacing) {
                option.selected = true;
            }
            lineSpacingSelect.appendChild(option);
        });
        lineSpacingContainer.appendChild(lineSpacingSelect);
        
        // Letter spacing selector
        const letterSpacingContainer = document.createElement('div');
        letterSpacingContainer.className = 'font-setting-group';
        settingsContainer.appendChild(letterSpacingContainer);
        
        const letterSpacingLabel = document.createElement('label');
        letterSpacingLabel.className = 'font-setting-label';
        letterSpacingLabel.textContent = 'Letter Spacing';
        letterSpacingContainer.appendChild(letterSpacingLabel);
        
        const letterSpacingSelect = document.createElement('select');
        letterSpacingSelect.className = 'letter-spacing-select';
        this.letterSpacings.forEach(spacing => {
            const option = document.createElement('option');
            option.value = spacing.id;
            option.textContent = spacing.name;
            if (spacing.id === this.currentLetterSpacing) {
                option.selected = true;
            }
            letterSpacingSelect.appendChild(option);
        });
        letterSpacingContainer.appendChild(letterSpacingSelect);
        
        // Font weight selector
        const fontWeightContainer = document.createElement('div');
        fontWeightContainer.className = 'font-setting-group';
        settingsContainer.appendChild(fontWeightContainer);
        
        const fontWeightLabel = document.createElement('label');
        fontWeightLabel.className = 'font-setting-label';
        fontWeightLabel.textContent = 'Font Weight';
        fontWeightContainer.appendChild(fontWeightLabel);
        
        const fontWeightSelect = document.createElement('select');
        fontWeightSelect.className = 'font-weight-select';
        [100, 200, 300, 400, 500, 600, 700, 800, 900].forEach(weight => {
            const option = document.createElement('option');
            option.value = weight;
            option.textContent = weight === 400 ? 'Regular (400)' : 
                                weight < 400 ? `Light (${weight})` : 
                                `Bold (${weight})`;
            if (weight === this.fontWeight) {
                option.selected = true;
            }
            fontWeightSelect.appendChild(option);
        });
        fontWeightContainer.appendChild(fontWeightSelect);
        
        // Italic toggle
        const italicContainer = document.createElement('div');
        italicContainer.className = 'font-setting-group';
        settingsContainer.appendChild(italicContainer);
        
        const italicLabel = document.createElement('label');
        italicLabel.className = 'font-setting-label italic-label';
        italicLabel.htmlFor = 'font-italic-toggle';
        italicLabel.textContent = 'Italic';
        italicContainer.appendChild(italicLabel);
        
        const italicToggle = document.createElement('input');
        italicToggle.type = 'checkbox';
        italicToggle.id = 'font-italic-toggle';
        italicToggle.className = 'font-italic-toggle';
        italicToggle.checked = this.isItalic;
        italicContainer.appendChild(italicToggle);
        
        // Reset button
        const resetButton = document.createElement('button');
        resetButton.className = 'font-reset-button';
        resetButton.textContent = 'Reset to Defaults';
        settingsContainer.appendChild(resetButton);
        
        // Add event listeners
        
        // Font size change
        fontSizeSelect.addEventListener('change', () => {
            this.changeFontSize(fontSizeSelect.value);
        });
        
        // Line spacing change
        lineSpacingSelect.addEventListener('change', () => {
            this.changeLineSpacing(lineSpacingSelect.value);
        });
        
        // Letter spacing change
        letterSpacingSelect.addEventListener('change', () => {
            this.changeLetterSpacing(letterSpacingSelect.value);
        });
        
        // Font weight change
        fontWeightSelect.addEventListener('change', () => {
            this.changeFontWeight(parseInt(fontWeightSelect.value, 10));
        });
        
        // Italic toggle
        italicToggle.addEventListener('change', () => {
            this.toggleItalic();
            italicToggle.checked = this.isItalic;
        });
        
        // Reset button
        resetButton.addEventListener('click', () => {
            if (confirm('Reset all font settings to defaults?')) {
                this.resetToDefaults();
                
                // Update UI to reflect defaults
                fontSizeSelect.value = this.currentFontSize;
                lineSpacingSelect.value = this.currentLineSpacing;
                letterSpacingSelect.value = this.currentLetterSpacing;
                fontWeightSelect.value = this.fontWeight.toString();
                italicToggle.checked = this.isItalic;
                
                // Update active font
                fontsGrid.querySelectorAll('.font-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                const defaultFontItem = fontsGrid.querySelector(`.font-item[data-id="${this.currentFont}"]`);
                if (defaultFontItem) {
                    defaultFontItem.classList.add('active');
                }
            }
        });
        
        // Tab switching
        tabsContainer.querySelectorAll('.font-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabsContainer.querySelectorAll('.font-tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Filter fonts grid
                const category = tab.dataset.category;
                if (category === 'all') {
                    // Show all fonts
                    fontsGrid.querySelectorAll('.font-item').forEach(item => {
                        item.style.display = '';
                    });
                } else {
                    // Show only fonts in the selected category
                    fontsGrid.querySelectorAll('.font-item').forEach(item => {
                        if (item.dataset.category === category) {
                            item.style.display = '';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles for the UI
     */
    addUIStyles() {
        const styleId = 'font-switcher-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .font-switcher-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .font-switcher-header {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .font-switcher-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .font-switcher-tabs {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }
            
            .font-tab {
                padding: 0.5rem 1rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .font-tab:hover {
                background-color: var(--bg-secondary, #161b22);
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .font-tab.active {
                background-color: var(--accent-primary, #7c3aed);
                border-color: var(--accent-primary, #7c3aed);
                color: white;
            }
            
            .fonts-container {
                margin-bottom: 1.5rem;
                max-height: 300px;
                overflow-y: auto;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .fonts-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
            }
            
            .font-item {
                border: 2px solid transparent;
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-secondary, #161b22);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .font-item:hover {
                transform: translateY(-2px);
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .font-item.active {
                border-color: var(--accent-primary, #7c3aed);
                background-color: rgba(124, 58, 237, 0.1);
            }
            
            .font-item.loading {
                opacity: 0.7;
                pointer-events: none;
            }
            
            .font-preview {
                margin-bottom: 0.75rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 1rem;
                line-height: 1.5;
            }
            
            .font-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.875rem;
            }
            
            .font-name {
                font-weight: 600;
            }
            
            .font-category {
                color: var(--text-secondary, #8b949e);
                font-size: 0.75rem;
            }
            
            .font-settings-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1rem;
                margin-bottom: 1rem;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .font-setting-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .font-setting-label {
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .italic-label {
                display: flex;
                align-items: center;
                cursor: pointer;
            }
            
            .font-size-select,
            .line-spacing-select,
            .letter-spacing-select,
            .font-weight-select {
                padding: 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .font-italic-toggle {
                margin-top: 0.5rem;
            }
            
            .font-reset-button {
                grid-column: 1 / -1;
                padding: 0.75rem 1rem;
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
            
            .font-reset-button:hover {
                background-color: var(--error-hover, #ef4444);
            }
            
            @media (max-width: 768px) {
                .fonts-grid {
                    grid-template-columns: 1fr;
                }
                
                .font-settings-container {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FontSwitcher };
} else {
    // Add to global scope for browser usage
    window.FontSwitcher = FontSwitcher;
}
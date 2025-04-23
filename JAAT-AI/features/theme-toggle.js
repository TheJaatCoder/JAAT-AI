/**
 * JAAT-AI Theme Toggle Feature
 * Dynamic theme switching with animations and persistence
 */

class ThemeToggle {
    constructor() {
        this.themes = [
            { id: 'dark', name: 'Dark', icon: 'ri-moon-fill' },
            { id: 'light', name: 'Light', icon: 'ri-sun-fill' },
            { id: 'cyberpunk', name: 'Cyberpunk', icon: 'ri-cpu-line' },
            { id: 'retro', name: 'Retro', icon: 'ri-gamepad-line' },
            { id: 'sunset', name: 'Sunset', icon: 'ri-sun-cloudy-fill' }
        ];
        
        this.currentThemeId = 'dark'; // Default theme
        this.previousThemeId = null;
        this.storageKey = 'jaat-theme-preference';
        this.transitionDuration = 600; // ms
        
        // Event callbacks
        this.onThemeChange = null;
        this.onTransitionStart = null;
        this.onTransitionEnd = null;
    }

    /**
     * Initialize the theme toggle feature
     * @param {Object} options - Options for initialization
     * @returns {ThemeToggle} This instance
     */
    init(options = {}) {
        // Apply options
        if (options.themes) this.themes = options.themes;
        if (options.defaultTheme) this.currentThemeId = options.defaultTheme;
        if (options.storageKey) this.storageKey = options.storageKey;
        if (options.transitionDuration) this.transitionDuration = options.transitionDuration;
        if (options.onThemeChange) this.onThemeChange = options.onThemeChange;
        if (options.onTransitionStart) this.onTransitionStart = options.onTransitionStart;
        if (options.onTransitionEnd) this.onTransitionEnd = options.onTransitionEnd;
        
        // Load theme preference
        this.loadThemePreference();
        
        // Apply current theme
        this.applyTheme(this.currentThemeId, false);
        
        // Listen for system theme changes if using system theme
        if (this.currentThemeId === 'system') {
            this.setupSystemThemeListener();
        }
        
        console.log('Theme Toggle initialized with theme:', this.currentThemeId);
        return this;
    }

    /**
     * Load theme preference from localStorage
     */
    loadThemePreference() {
        try {
            const savedTheme = localStorage.getItem(this.storageKey);
            if (savedTheme) {
                // Check if saved theme exists in available themes
                const themeExists = this.themes.some(theme => theme.id === savedTheme);
                if (themeExists || savedTheme === 'system') {
                    this.currentThemeId = savedTheme;
                }
            } else {
                // If no saved preference, check if should use system preference
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.currentThemeId = prefersDark ? 'dark' : 'light';
            }
        } catch (error) {
            console.warn('Error loading theme preference:', error);
        }
    }

    /**
     * Save theme preference to localStorage
     */
    saveThemePreference() {
        try {
            localStorage.setItem(this.storageKey, this.currentThemeId);
        } catch (error) {
            console.warn('Error saving theme preference:', error);
        }
    }

    /**
     * Get the system theme
     * @returns {string} 'dark' or 'light'
     */
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * Set up listeners for system theme changes
     */
    setupSystemThemeListener() {
        if (window.matchMedia) {
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Initial check
            this.applyTheme(this.getSystemTheme(), false);
            
            // Listen for changes
            const handleChange = (e) => {
                if (this.currentThemeId === 'system') {
                    this.applyTheme(e.matches ? 'dark' : 'light', true);
                }
            };
            
            // Use modern event listener if available
            if (darkModeMediaQuery.addEventListener) {
                darkModeMediaQuery.addEventListener('change', handleChange);
            } else if (darkModeMediaQuery.addListener) {
                darkModeMediaQuery.addListener(handleChange);
            }
        }
    }

    /**
     * Apply theme to the document
     * @param {string} themeId - Theme ID to apply
     * @param {boolean} animate - Whether to animate the transition
     */
    applyTheme(themeId, animate = true) {
        // If system theme, get actual theme to apply
        let actualThemeId = themeId;
        if (themeId === 'system') {
            actualThemeId = this.getSystemTheme();
        }
        
        // Store previous theme for transition
        this.previousThemeId = document.body.dataset.theme || this.currentThemeId;
        
        // Update current theme
        this.currentThemeId = themeId;
        
        // Skip animation if not needed
        if (!animate) {
            document.body.dataset.theme = actualThemeId;
            document.body.className = `theme-${actualThemeId}`;
            document.documentElement.style.colorScheme = actualThemeId === 'dark' || actualThemeId === 'cyberpunk' ? 'dark' : 'light';
            this.updateThemeStylesheets(actualThemeId);
            
            // Call change callback
            if (typeof this.onThemeChange === 'function') {
                this.onThemeChange(actualThemeId, this.previousThemeId, false);
            }
            
            return;
        }
        
        // Call transition start callback
        if (typeof this.onTransitionStart === 'function') {
            this.onTransitionStart(actualThemeId, this.previousThemeId);
        }
        
        // Create overlay for transition
        const overlay = this.createTransitionOverlay();
        
        // Animate overlay in
        overlay.style.opacity = '1';
        
        // After overlay is fully visible, change theme
        setTimeout(() => {
            document.body.dataset.theme = actualThemeId;
            document.body.className = `theme-${actualThemeId}`;
            document.documentElement.style.colorScheme = actualThemeId === 'dark' || actualThemeId === 'cyberpunk' ? 'dark' : 'light';
            this.updateThemeStylesheets(actualThemeId);
            
            // Call change callback
            if (typeof this.onThemeChange === 'function') {
                this.onThemeChange(actualThemeId, this.previousThemeId, true);
            }
            
            // Animate overlay out
            overlay.style.opacity = '0';
            
            // Remove overlay after animation
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
                
                // Call transition end callback
                if (typeof this.onTransitionEnd === 'function') {
                    this.onTransitionEnd(actualThemeId, this.previousThemeId);
                }
            }, this.transitionDuration);
        }, this.transitionDuration);
    }

    /**
     * Create transition overlay element
     * @returns {HTMLElement} The overlay element
     */
    createTransitionOverlay() {
        const existingOverlay = document.getElementById('theme-transition-overlay');
        if (existingOverlay) {
            return existingOverlay;
        }
        
        const overlay = document.createElement('div');
        overlay.id = 'theme-transition-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        overlay.style.zIndex = '9999';
        overlay.style.opacity = '0';
        overlay.style.transition = `opacity ${this.transitionDuration}ms ease`;
        overlay.style.pointerEvents = 'none';
        
        document.body.appendChild(overlay);
        return overlay;
    }

    /**
     * Update theme stylesheets
     * @param {string} themeId - Theme ID
     */
    updateThemeStylesheets(themeId) {
        // Find theme stylesheet links
        const themeStylesheets = document.querySelectorAll('link[id^="theme-stylesheet-"]');
        
        // If no theme stylesheets found, try to find by rel and href
        if (themeStylesheets.length === 0) {
            const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
            stylesheets.forEach(sheet => {
                if (sheet.href && sheet.href.includes('/themes/')) {
                    // Disable all theme stylesheets
                    sheet.disabled = true;
                    
                    // Enable the selected theme
                    if (sheet.href.includes(`/${themeId}-theme.css`) || 
                        sheet.href.includes(`/${themeId}.css`)) {
                        sheet.disabled = false;
                    }
                }
            });
            
            return;
        }
        
        // Disable all theme stylesheets
        themeStylesheets.forEach(stylesheet => {
            stylesheet.disabled = true;
        });
        
        // Enable the selected theme
        const selectedStylesheet = document.getElementById(`theme-stylesheet-${themeId}`);
        if (selectedStylesheet) {
            selectedStylesheet.disabled = false;
        } else {
            console.warn(`Theme stylesheet for '${themeId}' not found`);
        }
    }

    /**
     * Toggle between themes
     */
    toggleTheme() {
        // Get current index
        const currentIndex = this.themes.findIndex(theme => theme.id === this.currentThemeId);
        
        // Calculate next index
        const nextIndex = currentIndex >= this.themes.length - 1 ? 0 : currentIndex + 1;
        
        // Apply next theme
        this.setTheme(this.themes[nextIndex].id);
    }

    /**
     * Set theme by ID
     * @param {string} themeId - Theme ID to set
     */
    setTheme(themeId) {
        // Check if theme exists
        const themeExists = themeId === 'system' || this.themes.some(theme => theme.id === themeId);
        if (!themeExists) {
            console.warn(`Theme '${themeId}' not found`);
            return;
        }
        
        // Apply theme
        this.applyTheme(themeId);
        
        // Save preference
        this.saveThemePreference();
    }

    /**
     * Get current theme
     * @returns {Object} Current theme object
     */
    getCurrentTheme() {
        if (this.currentThemeId === 'system') {
            const systemThemeId = this.getSystemTheme();
            const systemTheme = this.themes.find(theme => theme.id === systemThemeId);
            
            return {
                id: 'system',
                name: 'System',
                icon: 'ri-computer-line',
                actualTheme: systemTheme || { id: systemThemeId, name: systemThemeId.charAt(0).toUpperCase() + systemThemeId.slice(1) }
            };
        }
        
        return this.themes.find(theme => theme.id === this.currentThemeId) || {
            id: this.currentThemeId,
            name: this.currentThemeId.charAt(0).toUpperCase() + this.currentThemeId.slice(1)
        };
    }

    /**
     * Get all available themes
     * @returns {Array} Array of theme objects
     */
    getThemes() {
        // Add system theme if not already in list
        if (!this.themes.some(theme => theme.id === 'system')) {
            return [
                { id: 'system', name: 'System', icon: 'ri-computer-line' },
                ...this.themes
            ];
        }
        
        return this.themes;
    }

    /**
     * Create theme toggle UI
     * @param {HTMLElement|string} container - Container element or selector
     * @param {Object} options - Options for UI
     * @returns {HTMLElement} The created UI element
     */
    createUI(container, options = {}) {
        // Get container element
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) {
            console.error('Theme toggle container not found');
            return null;
        }
        
        // Default options
        const defaultOptions = {
            buttonStyle: 'icon', // 'icon', 'text', 'both'
            showName: true,
            dropdownMode: false,
            compact: false,
            showAllThemes: false
        };
        
        const uiOptions = { ...defaultOptions, ...options };
        
        // Create UI element
        const themeToggleEl = document.createElement('div');
        themeToggleEl.className = `theme-toggle ${uiOptions.compact ? 'theme-toggle-compact' : ''} ${uiOptions.dropdownMode ? 'theme-toggle-dropdown' : ''}`;
        container.appendChild(themeToggleEl);
        
        // Current theme
        const currentTheme = this.getCurrentTheme();
        
        if (uiOptions.dropdownMode) {
            // Create dropdown toggle
            const dropdownToggle = document.createElement('button');
            dropdownToggle.className = 'theme-toggle-dropdown-toggle';
            dropdownToggle.setAttribute('aria-label', 'Toggle theme');
            dropdownToggle.setAttribute('aria-haspopup', 'true');
            dropdownToggle.setAttribute('aria-expanded', 'false');
            themeToggleEl.appendChild(dropdownToggle);
            
            // Toggle content based on style
            if (uiOptions.buttonStyle === 'icon' || uiOptions.buttonStyle === 'both') {
                const toggleIcon = document.createElement('i');
                toggleIcon.className = currentTheme.icon || 'ri-contrast-2-line';
                dropdownToggle.appendChild(toggleIcon);
            }
            
            if (uiOptions.buttonStyle === 'text' || uiOptions.buttonStyle === 'both') {
                if (uiOptions.buttonStyle === 'both') {
                    dropdownToggle.appendChild(document.createTextNode(' '));
                }
                
                const toggleText = document.createElement('span');
                toggleText.className = 'theme-toggle-text';
                toggleText.textContent = uiOptions.showName ? currentTheme.name : 'Theme';
                dropdownToggle.appendChild(toggleText);
            }
            
            // Add dropdown arrow
            const dropdownArrow = document.createElement('i');
            dropdownArrow.className = 'ri-arrow-down-s-line theme-toggle-dropdown-arrow';
            dropdownToggle.appendChild(dropdownArrow);
            
            // Create dropdown content
            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'theme-toggle-dropdown-content';
            themeToggleEl.appendChild(dropdownContent);
            
            // Add themes to dropdown
            const themes = uiOptions.showAllThemes ? this.getThemes() : this.themes;
            themes.forEach(theme => {
                const themeItem = document.createElement('button');
                themeItem.className = 'theme-toggle-dropdown-item';
                themeItem.dataset.theme = theme.id;
                if (theme.id === this.currentThemeId) {
                    themeItem.classList.add('active');
                }
                
                // Theme icon
                if (theme.icon) {
                    const themeIcon = document.createElement('i');
                    themeIcon.className = theme.icon;
                    themeItem.appendChild(themeIcon);
                    themeItem.appendChild(document.createTextNode(' '));
                }
                
                // Theme name
                const themeName = document.createElement('span');
                themeName.textContent = theme.name;
                themeItem.appendChild(themeName);
                
                // Theme item click handler
                themeItem.addEventListener('click', () => {
                    this.setTheme(theme.id);
                    
                    // Update active class
                    dropdownContent.querySelectorAll('.theme-toggle-dropdown-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    themeItem.classList.add('active');
                    
                    // Update toggle display
                    if (uiOptions.buttonStyle === 'icon' || uiOptions.buttonStyle === 'both') {
                        const toggleIcon = dropdownToggle.querySelector('i:not(.theme-toggle-dropdown-arrow)');
                        if (toggleIcon) {
                            toggleIcon.className = theme.icon || 'ri-contrast-2-line';
                        }
                    }
                    
                    if (uiOptions.buttonStyle === 'text' || uiOptions.buttonStyle === 'both') {
                        const toggleText = dropdownToggle.querySelector('.theme-toggle-text');
                        if (toggleText) {
                            toggleText.textContent = uiOptions.showName ? theme.name : 'Theme';
                        }
                    }
                    
                    // Close dropdown
                    dropdownContent.style.display = 'none';
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                });
                
                dropdownContent.appendChild(themeItem);
            });
            
            // Toggle dropdown on click
            dropdownToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
                
                if (isExpanded) {
                    dropdownContent.style.display = 'none';
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                } else {
                    dropdownContent.style.display = 'block';
                    dropdownToggle.setAttribute('aria-expanded', 'true');
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                dropdownContent.style.display = 'none';
                dropdownToggle.setAttribute('aria-expanded', 'false');
            });
            
            // Prevent closing when clicking inside dropdown
            dropdownContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        } else {
            // Create simple button
            const toggleButton = document.createElement('button');
            toggleButton.className = 'theme-toggle-button';
            toggleButton.setAttribute('aria-label', 'Toggle theme');
            themeToggleEl.appendChild(toggleButton);
            
            // Button content based on style
            if (uiOptions.buttonStyle === 'icon' || uiOptions.buttonStyle === 'both') {
                const toggleIcon = document.createElement('i');
                toggleIcon.className = currentTheme.icon || 'ri-contrast-2-line';
                toggleButton.appendChild(toggleIcon);
            }
            
            if (uiOptions.buttonStyle === 'text' || uiOptions.buttonStyle === 'both') {
                if (uiOptions.buttonStyle === 'both') {
                    toggleButton.appendChild(document.createTextNode(' '));
                }
                
                const toggleText = document.createElement('span');
                toggleText.className = 'theme-toggle-text';
                toggleText.textContent = uiOptions.showName ? currentTheme.name : 'Theme';
                toggleButton.appendChild(toggleText);
            }
            
            // Toggle button click handler
            toggleButton.addEventListener('click', () => {
                this.toggleTheme();
                
                // Update button content
                const newTheme = this.getCurrentTheme();
                
                if (uiOptions.buttonStyle === 'icon' || uiOptions.buttonStyle === 'both') {
                    const toggleIcon = toggleButton.querySelector('i');
                    if (toggleIcon) {
                        toggleIcon.className = newTheme.icon || 'ri-contrast-2-line';
                    }
                }
                
                if (uiOptions.buttonStyle === 'text' || uiOptions.buttonStyle === 'both') {
                    const toggleText = toggleButton.querySelector('.theme-toggle-text');
                    if (toggleText) {
                        toggleText.textContent = uiOptions.showName ? newTheme.name : 'Theme';
                    }
                }
            });
        }
        
        // Add styles
        this.addUIStyles();
        
        return themeToggleEl;
    }

    /**
     * Add CSS styles for the UI
     */
    addUIStyles() {
        const styleId = 'theme-toggle-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .theme-toggle {
                position: relative;
                display: inline-block;
            }
            
            .theme-toggle-button,
            .theme-toggle-dropdown-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--bg-secondary, #f1f5f9);
                color: var(--text-primary, #1e293b);
                border: 1px solid var(--border-color, #e2e8f0);
                border-radius: var(--radius, 0.375rem);
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .theme-dark .theme-toggle-button,
            .theme-dark .theme-toggle-dropdown-toggle {
                background-color: var(--dm-background-soft, #1e293b);
                color: var(--dm-foreground, #f8fafc);
                border-color: var(--dm-border, #334155);
            }
            
            .theme-toggle-button:hover,
            .theme-toggle-dropdown-toggle:hover {
                background-color: var(--accent-primary, #6366f1);
                color: white;
                border-color: var(--accent-primary, #6366f1);
            }
            
            .theme-toggle-dropdown-toggle {
                width: 100%;
                justify-content: space-between;
            }
            
            .theme-toggle-dropdown-arrow {
                margin-left: 0.5rem;
                font-size: 1rem;
            }
            
            .theme-toggle-dropdown-content {
                display: none;
                position: absolute;
                right: 0;
                top: calc(100% + 0.5rem);
                min-width: 160px;
                background-color: var(--bg-primary, #ffffff);
                color: var(--text-primary, #1e293b);
                border: 1px solid var(--border-color, #e2e8f0);
                border-radius: var(--radius, 0.375rem);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                z-index: 100;
            }
            
            .theme-dark .theme-toggle-dropdown-content {
                background-color: var(--dm-background, #0f172a);
                color: var(--dm-foreground, #f8fafc);
                border-color: var(--dm-border, #334155);
            }
            
            .theme-toggle-dropdown-item {
                display: flex;
                align-items: center;
                width: 100%;
                text-align: left;
                padding: 0.5rem 1rem;
                border: none;
                background: none;
                color: inherit;
                cursor: pointer;
                font-size: 0.875rem;
                transition: background-color 0.2s ease;
            }
            
            .theme-toggle-dropdown-item:hover {
                background-color: var(--bg-secondary, #f1f5f9);
            }
            
            .theme-dark .theme-toggle-dropdown-item:hover {
                background-color: var(--dm-background-soft, #1e293b);
            }
            
            .theme-toggle-dropdown-item.active {
                background-color: var(--accent-primary, #6366f1);
                color: white;
            }
            
            .theme-toggle-dropdown-item i {
                margin-right: 0.5rem;
                font-size: 1rem;
            }
            
            .theme-toggle-text {
                font-weight: 500;
            }
            
            .theme-toggle-compact .theme-toggle-button,
            .theme-toggle-compact .theme-toggle-dropdown-toggle {
                padding: 0.25rem 0.5rem;
                font-size: 0.75rem;
            }
            
            .theme-toggle-compact .theme-toggle-dropdown-item {
                padding: 0.25rem 0.5rem;
                font-size: 0.75rem;
            }
            
            /* Theme transition effect */
            @keyframes theme-transition-fade {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            
            .theme-transition {
                animation: theme-transition-fade 0.5s ease-out;
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeToggle };
} else {
    // Add to global scope for browser usage
    window.ThemeToggle = ThemeToggle;
}
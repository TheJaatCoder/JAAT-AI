/**
 * JAAT-AI Theme Manager
 * Handles theme switching and customization
 */

class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.availableThemes = ['light', 'dark', 'blue', 'purple', 'green'];
        this.themeStylesheets = {
            light: 'css/themes/light-theme.css',
            dark: 'css/themes/dark-theme.css',
            blue: 'css/themes/blue-theme.css',
            purple: 'css/themes/purple-theme.css',
            green: 'css/themes/green-theme.css'
        };
        this.customThemes = [];
        this.themeListeners = [];
        this.themeStylesheet = null;
        
        // Get system preference if available
        this.systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Bind methods
        this.handleSystemThemeChange = this.handleSystemThemeChange.bind(this);
    }
    
    /**
     * Initialize the theme manager
     * @param {string} initialTheme - Initial theme to use, or 'system' for system preference
     * @returns {ThemeManager} This instance
     */
    init(initialTheme = 'dark') {
        // Set up system preference listener
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', this.handleSystemThemeChange);
        }
        
        // Try to load saved theme from localStorage
        const savedTheme = localStorage.getItem('jaat-theme');
        
        // Determine initial theme
        let themeToUse = initialTheme;
        
        if (savedTheme && this.isValidTheme(savedTheme)) {
            themeToUse = savedTheme;
        } else if (initialTheme === 'system') {
            themeToUse = this.systemPrefersDark ? 'dark' : 'light';
        }
        
        // Apply the theme
        this.setTheme(themeToUse);
        
        return this;
    }
    
    /**
     * Handle system theme preference change
     * @param {MediaQueryListEvent} event - Media query change event
     */
    handleSystemThemeChange(event) {
        this.systemPrefersDark = event.matches;
        
        // Only auto-switch if theme is set to 'system'
        if (localStorage.getItem('jaat-theme-source') === 'system') {
            this.setTheme(this.systemPrefersDark ? 'dark' : 'light');
        }
    }
    
    /**
     * Check if a theme is valid
     * @param {string} theme - Theme name
     * @returns {boolean} Whether the theme is valid
     */
    isValidTheme(theme) {
        return this.availableThemes.includes(theme) || 
               this.customThemes.some(customTheme => customTheme.id === theme);
    }
    
    /**
     * Set the active theme
     * @param {string} theme - Theme name
     * @param {boolean} savePreference - Whether to save the preference
     * @returns {boolean} Whether the theme was successfully applied
     */
    setTheme(theme, savePreference = true) {
        if (!this.isValidTheme(theme)) {
            console.error(`Invalid theme: ${theme}`);
            return false;
        }
        
        // Skip if already using this theme
        if (theme === this.currentTheme) {
            return true;
        }
        
        // Find custom theme if applicable
        const customTheme = this.customThemes.find(ct => ct.id === theme);
        
        // Apply theme class to body
        document.body.classList.remove(...this.availableThemes.map(t => `theme-${t}`));
        document.body.classList.add(`theme-${theme}`);
        
        // Load theme stylesheet if different from current
        if (this.themeStylesheets[theme] && (!this.themeStylesheet || this.themeStylesheet.getAttribute('href') !== this.themeStylesheets[theme])) {
            // Remove current theme stylesheet if exists
            if (this.themeStylesheet) {
                document.head.removeChild(this.themeStylesheet);
            }
            
            // Create and add new theme stylesheet
            this.themeStylesheet = document.createElement('link');
            this.themeStylesheet.setAttribute('rel', 'stylesheet');
            this.themeStylesheet.setAttribute('type', 'text/css');
            this.themeStylesheet.setAttribute('href', this.themeStylesheets[theme]);
            this.themeStylesheet.setAttribute('id', 'theme-stylesheet');
            document.head.appendChild(this.themeStylesheet);
        }
        
        // Apply custom theme properties if applicable
        if (customTheme) {
            this.applyCustomThemeProperties(customTheme);
        } else {
            // Reset any custom theme properties
            this.resetCustomThemeProperties();
        }
        
        // Save theme preference
        if (savePreference) {
            localStorage.setItem('jaat-theme', theme);
            localStorage.setItem('jaat-theme-updated', new Date().toISOString());
        }
        
        // Update current theme
        this.currentTheme = theme;
        
        // Notify listeners
        this.notifyThemeChange(theme);
        
        console.log(`Theme set to: ${theme}`);
        return true;
    }
    
    /**
     * Toggle between light and dark themes
     * @returns {string} The new active theme
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        return newTheme;
    }
    
    /**
     * Apply custom theme properties to document
     * @param {Object} customTheme - Custom theme object
     */
    applyCustomThemeProperties(customTheme) {
        // Apply CSS variables
        if (customTheme.properties) {
            Object.entries(customTheme.properties).forEach(([property, value]) => {
                document.documentElement.style.setProperty(`--${property}`, value);
            });
        }
    }
    
    /**
     * Reset custom theme properties
     */
    resetCustomThemeProperties() {
        // Get default theme variables (could be extended to load from a file)
        const defaultProperties = [
            'primary', 'primary-dark', 'primary-light', 'primary-soft',
            'secondary', 'secondary-dark', 'secondary-light', 'secondary-soft',
            'accent', 'accent-dark', 'accent-light', 'accent-soft',
            'success', 'success-dark', 'success-light', 'success-soft',
            'warning', 'warning-dark', 'warning-light', 'warning-soft',
            'danger', 'danger-dark', 'danger-light', 'danger-soft',
            'info', 'info-dark', 'info-light', 'info-soft'
        ];
        
        // Reset properties
        defaultProperties.forEach(property => {
            document.documentElement.style.removeProperty(`--${property}`);
        });
    }
    
    /**
     * Add a new custom theme
     * @param {Object} theme - Custom theme definition
     * @param {string} theme.id - Unique theme identifier
     * @param {string} theme.name - Display name
     * @param {Object} theme.properties - CSS custom properties
     * @returns {boolean} Whether the theme was successfully added
     */
    addCustomTheme(theme) {
        if (!theme.id || !theme.properties) {
            console.error('Invalid custom theme definition');
            return false;
        }
        
        // Check if theme already exists
        if (this.availableThemes.includes(theme.id) || this.customThemes.some(ct => ct.id === theme.id)) {
            console.error(`Theme with id ${theme.id} already exists`);
            return false;
        }
        
        // Add theme
        this.customThemes.push(theme);
        
        console.log(`Custom theme added: ${theme.id}`);
        return true;
    }
    
    /**
     * Remove a custom theme
     * @param {string} themeId - Theme identifier
     * @returns {boolean} Whether the theme was successfully removed
     */
    removeCustomTheme(themeId) {
        const initialLength = this.customThemes.length;
        
        this.customThemes = this.customThemes.filter(theme => theme.id !== themeId);
        
        // If currently using this theme, revert to default
        if (this.currentTheme === themeId) {
            this.setTheme('dark');
        }
        
        const removed = this.customThemes.length < initialLength;
        if (removed) {
            console.log(`Custom theme removed: ${themeId}`);
        }
        
        return removed;
    }
    
    /**
     * Get the current theme ID
     * @returns {string} Current theme ID
     */
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    /**
     * Get list of available themes
     * @returns {Array} List of theme objects with id and name
     */
    getAvailableThemes() {
        // Default built-in themes
        const builtInThemes = this.availableThemes.map(id => ({
            id,
            name: id.charAt(0).toUpperCase() + id.slice(1),
            isBuiltIn: true
        }));
        
        // Custom themes
        const customThemes = this.customThemes.map(theme => ({
            id: theme.id,
            name: theme.name || theme.id,
            isBuiltIn: false
        }));
        
        return [...builtInThemes, ...customThemes];
    }
    
    /**
     * Add a theme change listener
     * @param {Function} listener - Callback function
     */
    addThemeChangeListener(listener) {
        if (typeof listener === 'function' && !this.themeListeners.includes(listener)) {
            this.themeListeners.push(listener);
        }
    }
    
    /**
     * Remove a theme change listener
     * @param {Function} listener - Callback function to remove
     */
    removeThemeChangeListener(listener) {
        this.themeListeners = this.themeListeners.filter(l => l !== listener);
    }
    
    /**
     * Notify listeners of theme change
     * @param {string} theme - New theme ID
     */
    notifyThemeChange(theme) {
        this.themeListeners.forEach(listener => {
            try {
                listener(theme);
            } catch (error) {
                console.error('Error in theme change listener:', error);
            }
        });
    }
    
    /**
     * Detect if system is in dark mode
     * @returns {boolean} Whether the system prefers dark mode
     */
    isSystemDarkMode() {
        return this.systemPrefersDark;
    }
    
    /**
     * Use system theme preference
     * @param {boolean} save - Whether to save this preference
     */
    useSystemTheme(save = true) {
        const theme = this.systemPrefersDark ? 'dark' : 'light';
        this.setTheme(theme, save);
        
        if (save) {
            localStorage.setItem('jaat-theme-source', 'system');
        }
        
        return theme;
    }
}

// Create global instance
const themeManager = new ThemeManager();

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
});

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, themeManager };
} else {
    // Expose to window
    window.themeManager = themeManager;
}
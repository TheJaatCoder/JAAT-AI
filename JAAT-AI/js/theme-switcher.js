/**
 * JAAT-AI Theme Switcher
 * Handles theme switching functionality for the application
 * 
 * Made with ❤️ by Rohit Sangwan
 * support@jaat-ai.com
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme switcher
    const themeSwitcher = {
        // DOM elements
        themeToggleBtn: document.getElementById('theme-toggle'),
        themeStylesheet: document.getElementById('theme-css'),
        body: document.body,
        
        // Available themes
        themes: {
            dark: {
                stylesheet: '/css/themes/dark.css',
                icon: 'fa-sun',
                next: 'light'
            },
            light: {
                stylesheet: '/css/themes/light.css',
                icon: 'fa-moon',
                next: 'cyberpunk'
            },
            cyberpunk: {
                stylesheet: '/css/themes/cyberpunk.css',
                icon: 'fa-microchip',
                next: 'retro'
            },
            retro: {
                stylesheet: '/css/themes/retro.css',
                icon: 'fa-gamepad',
                next: 'minimalist'
            },
            minimalist: {
                stylesheet: '/css/themes/minimalist.css',
                icon: 'fa-feather',
                next: 'dark'
            }
        },
        
        // Current theme (default to dark)
        currentTheme: 'dark',
        
        // Initialize theme switcher
        init() {
            // Load saved theme from localStorage
            this.loadSavedTheme();
            
            // Set up event listeners
            if (this.themeToggleBtn) {
                this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
            }
            
            // Apply initial theme
            this.applyTheme(this.currentTheme);
        },
        
        // Load saved theme from localStorage
        loadSavedTheme() {
            const savedTheme = localStorage.getItem('jaat-theme');
            if (savedTheme && this.themes[savedTheme]) {
                this.currentTheme = savedTheme;
            }
        },
        
        // Save theme to localStorage
        saveTheme() {
            localStorage.setItem('jaat-theme', this.currentTheme);
        },
        
        // Toggle to next theme in rotation
        toggleTheme() {
            const nextTheme = this.themes[this.currentTheme].next;
            this.applyTheme(nextTheme);
        },
        
        // Apply specified theme
        applyTheme(themeName) {
            if (!this.themes[themeName]) {
                console.error(`Theme "${themeName}" not found`);
                return;
            }
            
            const theme = this.themes[themeName];
            
            // Update theme stylesheet
            if (this.themeStylesheet) {
                this.themeStylesheet.href = theme.stylesheet;
            }
            
            // Update body class
            this.body.classList.remove(...Object.keys(this.themes).map(t => `theme-${t}`));
            this.body.classList.add(`theme-${themeName}`);
            
            // Update toggle button icon
            if (this.themeToggleBtn) {
                const iconElement = this.themeToggleBtn.querySelector('i');
                if (iconElement) {
                    iconElement.className = '';
                    iconElement.classList.add('fas', theme.icon);
                }
            }
            
            // Update current theme
            this.currentTheme = themeName;
            
            // Save to localStorage
            this.saveTheme();
            
            // Dispatch theme change event
            window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: themeName } }));
        }
    };
    
    // Initialize theme switcher
    themeSwitcher.init();
    
    // Make themeSwitcher available globally
    window.themeSwitcher = themeSwitcher;
});
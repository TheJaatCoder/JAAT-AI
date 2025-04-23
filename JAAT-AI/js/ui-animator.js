/**
 * JAAT-AI UI Animator
 * Handles animations and visual effects throughout the UI
 */

class UIAnimator {
    constructor() {
        // Animation settings
        this.settings = {
            enabled: true,
            intensity: 'medium', // 'light', 'medium', 'heavy'
            reducedMotion: false,
            theme: 'default',
            customEffects: true,
            transitionSpeed: 300, // in ms
            animateChats: true,
            animateFeatures: true,
            animateBackgrounds: true,
            enableParticles: true,
            particlesDensity: 50
        };
        
        // Animation elements
        this.elements = {
            chatBubbles: [],
            featureIcons: [],
            backgrounds: [],
            loadingIndicators: [],
            modals: [],
            menus: []
        };
        
        // Particle systems
        this.particles = {
            background: null,
            interactive: null
        };
        
        // Animation timers and frames
        this.timers = {
            backgroundEffect: null,
            chatBubbleTyping: null,
            featureIconPulse: null
        };
        
        this.frames = {
            backgroundAnimation: null
        };
        
        // Theme colors
        this.themes = {
            default: {
                primary: '#7C3AED', // Violet
                secondary: '#2563EB', // Blue
                accent: '#F59E0B', // Amber
                success: '#10B981', // Emerald
                danger: '#EF4444', // Red
                warning: '#F59E0B', // Amber
                info: '#3B82F6', // Blue
                light: '#F3F4F6', // Gray-100
                dark: '#1F2937', // Gray-800
                background: '#FFFFFF',
                text: '#1F2937'
            },
            dark: {
                primary: '#8B5CF6', // Violet
                secondary: '#3B82F6', // Blue
                accent: '#F59E0B', // Amber
                success: '#10B981', // Emerald
                danger: '#EF4444', // Red
                warning: '#F59E0B', // Amber
                info: '#3B82F6', // Blue
                light: '#1F2937', // Gray-800
                dark: '#F3F4F6', // Gray-100
                background: '#111827',
                text: '#F3F4F6'
            },
            ocean: {
                primary: '#06B6D4', // Cyan
                secondary: '#0EA5E9', // Light Blue
                accent: '#8B5CF6', // Violet
                success: '#10B981', // Emerald
                danger: '#EF4444', // Red
                warning: '#F59E0B', // Amber
                info: '#3B82F6', // Blue
                light: '#F3F4F6', // Gray-100
                dark: '#0F172A', // Slate-900
                background: '#F0F9FF', // Blue-50
                text: '#0F172A'
            },
            sunset: {
                primary: '#F97316', // Orange
                secondary: '#EC4899', // Pink
                accent: '#8B5CF6', // Violet
                success: '#10B981', // Emerald
                danger: '#DC2626', // Red
                warning: '#F59E0B', // Amber
                info: '#3B82F6', // Blue
                light: '#FFF7ED', // Orange-50
                dark: '#7C2D12', // Orange-900
                background: '#FFF7ED', // Orange-50
                text: '#431407' // Orange-950
            },
            forest: {
                primary: '#059669', // Emerald
                secondary: '#16A34A', // Green
                accent: '#F97316', // Orange
                success: '#10B981', // Emerald
                danger: '#DC2626', // Red
                warning: '#F59E0B', // Amber
                info: '#3B82F6', // Blue
                light: '#F0FDF4', // Green-50
                dark: '#14532D', // Green-900
                background: '#F0FDF4', // Green-50
                text: '#052e16' // Green-950
            },
            midnight: {
                primary: '#6366F1', // Indigo
                secondary: '#8B5CF6', // Violet
                accent: '#EC4899', // Pink
                success: '#10B981', // Emerald
                danger: '#EF4444', // Red
                warning: '#F59E0B', // Amber
                info: '#3B82F6', // Blue
                light: '#312E81', // Indigo-900
                dark: '#E0E7FF', // Indigo-100
                background: '#0F172A', // Slate-900
                text: '#E2E8F0' // Slate-200
            }
        };
        
        // Animation presets
        this.presets = {
            chat: {
                light: {
                    entryAnimation: 'fadeIn',
                    exitAnimation: 'fadeOut',
                    typingAnimation: 'simpleEllipsis'
                },
                medium: {
                    entryAnimation: 'slideInWithFade',
                    exitAnimation: 'slideOutWithFade',
                    typingAnimation: 'bouncingEllipsis'
                },
                heavy: {
                    entryAnimation: 'bounceIn',
                    exitAnimation: 'bounceOut',
                    typingAnimation: 'pulsingText'
                }
            },
            features: {
                light: {
                    hoverEffect: 'simpleFade',
                    clickEffect: 'simpleScale',
                    idleAnimation: 'none'
                },
                medium: {
                    hoverEffect: 'glow',
                    clickEffect: 'pulse',
                    idleAnimation: 'gentlePulse'
                },
                heavy: {
                    hoverEffect: 'float',
                    clickEffect: 'bounce',
                    idleAnimation: 'breathe'
                }
            },
            background: {
                light: {
                    effect: 'subtleGradient',
                    particlesDensity: 20
                },
                medium: {
                    effect: 'gradientShift',
                    particlesDensity: 50
                },
                heavy: {
                    effect: 'wavesAndParticles',
                    particlesDensity: 100
                }
            }
        };
        
        // Event listeners
        this.eventListeners = {};
        
        // Check for reduced motion preference
        this.checkReducedMotionPreference();
    }

    /**
     * Initialize the UI animator
     * @param {Object} options - Configuration options
     * @returns {Promise<UIAnimator>} This instance
     */
    async init(options = {}) {
        console.log('Initializing UI Animator...');
        
        // Apply custom options
        if (options) {
            Object.assign(this.settings, options);
        }
        
        // Load saved settings if available
        await this.loadSettings();
        
        // Set up mutation observer to watch for new UI elements
        this.setupMutationObserver();
        
        // Initialize animations based on current intensity
        this.applyAnimationIntensity(this.settings.intensity);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize theme
        this.setTheme(this.settings.theme);
        
        // Initialize background effects if enabled
        if (this.settings.animateBackgrounds) {
            this.initBackgroundEffects();
        }
        
        // Initialize particles if enabled
        if (this.settings.enableParticles) {
            this.initParticles();
        }
        
        // Trigger initialized event
        this.trigger('initialized', this.settings);
        
        return this;
    }

    /**
     * Load settings from localStorage
     * @returns {Promise<void>}
     */
    async loadSettings() {
        try {
            const savedSettings = localStorage.getItem('jaat-ui-animator-settings');
            
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                
                // Apply saved settings but respect reduced motion preference
                const reducedMotion = this.settings.reducedMotion;
                Object.assign(this.settings, settings);
                
                // System preference for reduced motion overrides saved settings
                if (reducedMotion) {
                    this.settings.reducedMotion = true;
                    this.settings.intensity = 'light';
                    this.settings.enableParticles = false;
                }
            }
        } catch (error) {
            console.error('Error loading UI animator settings:', error);
        }
    }

    /**
     * Save settings to localStorage
     */
    saveSettings() {
        try {
            localStorage.setItem('jaat-ui-animator-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Error saving UI animator settings:', error);
        }
    }

    /**
     * Check for user's reduced motion preference
     */
    checkReducedMotionPreference() {
        if (window.matchMedia) {
            const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            
            if (motionQuery.matches) {
                this.settings.reducedMotion = true;
                this.settings.intensity = 'light';
                this.settings.enableParticles = false;
            }
            
            // Listen for changes to the prefers-reduced-motion media query
            motionQuery.addEventListener('change', () => {
                this.settings.reducedMotion = motionQuery.matches;
                
                if (motionQuery.matches) {
                    this.settings.intensity = 'light';
                    this.settings.enableParticles = false;
                    this.applyAnimationIntensity('light');
                }
                
                this.saveSettings();
            });
        }
    }

    /**
     * Set up mutation observer to watch for new UI elements
     */
    setupMutationObserver() {
        // Create observer to watch for new elements that need animations
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check for chat bubbles
                            if (node.classList.contains('chat-bubble') || 
                                node.classList.contains('message') || 
                                node.querySelector('.chat-bubble, .message')) {
                                this.animateElement(node, 'chatBubbleEntry');
                            }
                            
                            // Check for feature icons
                            if (node.classList.contains('feature-icon') || 
                                node.classList.contains('feature-card') || 
                                node.querySelector('.feature-icon, .feature-card')) {
                                this.animateElement(node, 'featureEntry');
                            }
                            
                            // Check for modals
                            if (node.classList.contains('modal') || 
                                node.classList.contains('dialog') || 
                                node.querySelector('.modal, .dialog')) {
                                this.animateElement(node, 'modalEntry');
                            }
                        }
                    });
                }
            });
        });
        
        // Start observing the document
        observer.observe(document.body, { childList: true, subtree: true });
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Window resize event
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Theme change event
        document.addEventListener('jaat-theme-change', (e) => {
            if (e.detail && e.detail.theme) {
                this.setTheme(e.detail.theme);
            }
        });
        
        // Custom event listener for animation complete
        document.addEventListener('animationend', (e) => {
            // Handle animation end events
            if (e.target.classList.contains('chat-bubble') || 
                e.target.classList.contains('message')) {
                // Remove animation classes after completion
                e.target.classList.remove('animating', 'animate-in', 'animate-out');
            }
        });
    }

    /**
     * Handle window resize event
     */
    handleResize() {
        // Adjust background effects on resize
        if (this.settings.animateBackgrounds) {
            this.resizeBackgroundEffects();
        }
        
        // Adjust particles on resize
        if (this.settings.enableParticles && this.particles.background) {
            this.resizeParticles();
        }
    }

    /**
     * Apply animation intensity settings
     * @param {string} intensity - 'light', 'medium', or 'heavy'
     */
    applyAnimationIntensity(intensity) {
        // Validate intensity
        if (!['light', 'medium', 'heavy'].includes(intensity)) {
            console.warn(`Invalid animation intensity: ${intensity}, using 'medium'`);
            intensity = 'medium';
        }
        
        // Override with light if reduced motion is preferred
        if (this.settings.reducedMotion) {
            intensity = 'light';
        }
        
        // Update settings
        this.settings.intensity = intensity;
        
        // Apply preset for this intensity
        const chatPreset = this.presets.chat[intensity];
        const featuresPreset = this.presets.features[intensity];
        const backgroundPreset = this.presets.background[intensity];
        
        // Update particle density
        this.settings.particlesDensity = backgroundPreset.particlesDensity;
        
        // Update CSS variables for animation durations
        this.updateCSSVariables();
        
        // Update existing animations
        this.updateExistingAnimations();
        
        // Save settings
        this.saveSettings();
        
        // Trigger event
        this.trigger('intensityChanged', {
            intensity,
            chatPreset,
            featuresPreset,
            backgroundPreset
        });
    }

    /**
     * Update CSS variables for animations
     */
    updateCSSVariables() {
        const root = document.documentElement;
        
        // Set transition speed based on intensity and reduced motion
        let transitionSpeed = this.settings.transitionSpeed;
        
        if (this.settings.reducedMotion) {
            transitionSpeed = this.settings.transitionSpeed * 0.5; // Faster transitions for reduced motion
        } else if (this.settings.intensity === 'light') {
            transitionSpeed = this.settings.transitionSpeed * 0.8;
        } else if (this.settings.intensity === 'heavy') {
            transitionSpeed = this.settings.transitionSpeed * 1.2;
        }
        
        // Set CSS variables
        root.style.setProperty('--animation-speed', `${transitionSpeed}ms`);
        root.style.setProperty('--animation-speed-fast', `${transitionSpeed * 0.5}ms`);
        root.style.setProperty('--animation-speed-slow', `${transitionSpeed * 1.5}ms`);
        
        // Additional variables specific to each intensity
        switch (this.settings.intensity) {
            case 'light':
                root.style.setProperty('--hover-scale', '1.02');
                root.style.setProperty('--click-scale', '0.98');
                root.style.setProperty('--pulse-opacity', '0.8');
                root.style.setProperty('--glow-size', '5px');
                root.style.setProperty('--glow-intensity', '0.3');
                root.style.setProperty('--hover-rotation', '2deg');
                root.style.setProperty('--parallax-strength', '5');
                root.style.setProperty('--transition-bounce', 'cubic-bezier(0.34, 1.56, 0.64, 1)');
                break;
            case 'medium':
                root.style.setProperty('--hover-scale', '1.05');
                root.style.setProperty('--click-scale', '0.95');
                root.style.setProperty('--pulse-opacity', '0.6');
                root.style.setProperty('--glow-size', '10px');
                root.style.setProperty('--glow-intensity', '0.5');
                root.style.setProperty('--hover-rotation', '5deg');
                root.style.setProperty('--parallax-strength', '10');
                root.style.setProperty('--transition-bounce', 'cubic-bezier(0.2, 1.8, 0.6, 0.8)');
                break;
            case 'heavy':
                root.style.setProperty('--hover-scale', '1.1');
                root.style.setProperty('--click-scale', '0.9');
                root.style.setProperty('--pulse-opacity', '0.4');
                root.style.setProperty('--glow-size', '15px');
                root.style.setProperty('--glow-intensity', '0.7');
                root.style.setProperty('--hover-rotation', '8deg');
                root.style.setProperty('--parallax-strength', '15');
                root.style.setProperty('--transition-bounce', 'cubic-bezier(0.1, 2, 0.5, 0.7)');
                break;
        }
        
        // Add holographic theme-specific variables
        const theme = this.themes[this.settings.theme] || this.themes.default;
        root.style.setProperty('--hologram-primary', theme.primary);
        root.style.setProperty('--hologram-secondary', theme.secondary);
        root.style.setProperty('--hologram-accent', theme.accent);
        root.style.setProperty('--hologram-glow', 'rgba(111, 227, 255, var(--glow-intensity))');
        root.style.setProperty('--energy-pulse-color', 'rgba(111, 227, 255, 0.4)');
    }

    /**
     * Update existing animations to match current settings
     */
    updateExistingAnimations() {
        // Update chat bubbles
        this.elements.chatBubbles.forEach(element => {
            // Refresh animation classes
            this.applyChatBubbleAnimations(element);
        });
        
        // Update feature icons
        this.elements.featureIcons.forEach(element => {
            // Refresh animation classes
            this.applyFeatureAnimations(element);
        });
        
        // Update background effects
        if (this.settings.animateBackgrounds) {
            this.updateBackgroundEffects();
        }
        
        // Update particle effects
        if (this.settings.enableParticles) {
            this.updateParticles();
        } else {
            this.destroyParticles();
        }
    }

    /**
     * Set the UI theme
     * @param {string} themeName - Theme name
     */
    setTheme(themeName) {
        // Check if theme exists
        if (!this.themes[themeName]) {
            console.warn(`Theme '${themeName}' not found, using default`);
            themeName = 'default';
        }
        
        // Get theme colors
        const theme = this.themes[themeName];
        
        // Update settings
        this.settings.theme = themeName;
        
        // Apply theme colors as CSS variables
        const root = document.documentElement;
        
        for (const [key, value] of Object.entries(theme)) {
            root.style.setProperty(`--color-${key}`, value);
        }
        
        // Add theme class to body
        document.body.className = document.body.className
            .split(' ')
            .filter(cls => !cls.startsWith('theme-'))
            .join(' ');
            
        document.body.classList.add(`theme-${themeName}`);
        
        // Update background effects
        if (this.settings.animateBackgrounds) {
            this.updateBackgroundEffects();
        }
        
        // Save settings
        this.saveSettings();
        
        // Trigger theme change event
        this.trigger('themeChanged', themeName);
    }

    /**
     * Get the current theme
     * @returns {string} Current theme name
     */
    getTheme() {
        return this.settings.theme;
    }

    /**
     * Animate an element
     * @param {HTMLElement} element - Element to animate
     * @param {string} animationType - Type of animation to apply
     * @param {Object} options - Animation options
     */
    animateElement(element, animationType, options = {}) {
        if (!element || !this.settings.enabled) {
            return;
        }
        
        // Apply appropriate animation based on type
        switch (animationType) {
            case 'chatBubbleEntry':
                this.applyChatBubbleAnimations(element, 'entry');
                break;
            case 'chatBubbleExit':
                this.applyChatBubbleAnimations(element, 'exit');
                break;
            case 'featureEntry':
                this.applyFeatureAnimations(element, 'entry');
                break;
            case 'featureHover':
                this.applyFeatureAnimations(element, 'hover');
                break;
            case 'featureClick':
                this.applyFeatureAnimations(element, 'click');
                break;
            case 'modalEntry':
                this.applyModalAnimations(element, 'entry');
                break;
            case 'modalExit':
                this.applyModalAnimations(element, 'exit');
                break;
            default:
                // Apply custom animation
                if (typeof options.animation === 'string') {
                    element.style.animation = options.animation;
                }
        }
    }

    /**
     * Apply chat bubble animations
     * @param {HTMLElement} element - Chat bubble element
     * @param {string} phase - Animation phase ('entry', 'exit', 'typing')
     */
    applyChatBubbleAnimations(element, phase = 'entry') {
        if (!this.settings.animateChats || !element) {
            return;
        }
        
        // Store reference for later updates
        if (!this.elements.chatBubbles.includes(element)) {
            this.elements.chatBubbles.push(element);
        }
        
        // Get animation preset based on intensity
        const preset = this.presets.chat[this.settings.intensity];
        
        // Apply animation classes based on phase
        element.classList.add('animating');
        
        if (phase === 'entry') {
            element.classList.add('animate-in');
            element.style.animationName = preset.entryAnimation;
        } else if (phase === 'exit') {
            element.classList.add('animate-out');
            element.style.animationName = preset.exitAnimation;
        } else if (phase === 'typing') {
            const typingIndicator = element.querySelector('.typing-indicator');
            
            if (typingIndicator) {
                typingIndicator.dataset.animation = preset.typingAnimation;
                this.startTypingAnimation(typingIndicator, preset.typingAnimation);
            }
        }
    }

    /**
     * Start typing animation for chat bubbles
     * @param {HTMLElement} element - Typing indicator element
     * @param {string} animationType - Type of typing animation
     */
    startTypingAnimation(element, animationType) {
        if (!element) return;
        
        // Clear existing animation
        if (this.timers.chatBubbleTyping) {
            clearInterval(this.timers.chatBubbleTyping);
        }
        
        // Apply appropriate typing animation
        switch (animationType) {
            case 'simpleEllipsis':
                let dots = 0;
                this.timers.chatBubbleTyping = setInterval(() => {
                    dots = (dots + 1) % 4;
                    element.textContent = '.'.repeat(dots);
                }, 500);
                break;
                
            case 'bouncingEllipsis':
                element.innerHTML = '<span>.</span><span>.</span><span>.</span>';
                element.querySelectorAll('span').forEach((dot, index) => {
                    dot.style.animationDelay = `${index * 0.15}s`;
                    dot.style.animation = 'bounce 1.2s infinite';
                });
                break;
                
            case 'pulsingText':
                element.innerHTML = 'typing';
                element.style.animation = 'pulseFade 1.5s infinite';
                break;
        }
    }

    /**
     * Apply feature animations
     * @param {HTMLElement} element - Feature element
     * @param {string} phase - Animation phase ('entry', 'hover', 'click', 'idle')
     */
    applyFeatureAnimations(element, phase = 'entry') {
        if (!this.settings.animateFeatures || !element) {
            return;
        }
        
        // Store reference for later updates
        if (!this.elements.featureIcons.includes(element)) {
            this.elements.featureIcons.push(element);
        }
        
        // Get animation preset based on intensity
        const preset = this.presets.features[this.settings.intensity];
        
        // Apply animation based on phase
        switch (phase) {
            case 'entry':
                element.classList.add('animate-feature-in');
                break;
                
            case 'hover':
                // Apply hover effect
                const hoverEffect = preset.hoverEffect;
                
                // Remove existing hover classes
                element.className = element.className
                    .split(' ')
                    .filter(cls => !cls.startsWith('hover-effect-'))
                    .join(' ');
                
                // Add new hover effect class
                element.classList.add(`hover-effect-${hoverEffect}`);
                break;
                
            case 'click':
                // Apply click effect
                const clickEffect = preset.clickEffect;
                
                // Create temporary animation
                element.style.animation = `${clickEffect} 0.5s 1`;
                
                // Remove animation when complete
                setTimeout(() => {
                    element.style.animation = '';
                }, 500);
                break;
                
            case 'idle':
                // Apply idle animation
                const idleAnimation = preset.idleAnimation;
                
                if (idleAnimation !== 'none') {
                    element.classList.add(`idle-animation-${idleAnimation}`);
                }
                break;
        }
    }

    /**
     * Apply modal animations
     * @param {HTMLElement} element - Modal element
     * @param {string} phase - Animation phase ('entry', 'exit')
     */
    applyModalAnimations(element, phase = 'entry') {
        if (!element) return;
        
        // Store reference for later updates
        if (!this.elements.modals.includes(element)) {
            this.elements.modals.push(element);
        }
        
        // Apply animation based on intensity
        let animationName;
        
        if (phase === 'entry') {
            switch (this.settings.intensity) {
                case 'light':
                    animationName = 'fadeIn';
                    break;
                case 'medium':
                    animationName = 'slideInFromTop';
                    break;
                case 'heavy':
                    animationName = 'scaleInBounce';
                    break;
            }
            
            element.classList.add('modal-entering');
            element.style.animation = `${animationName} var(--animation-speed) forwards`;
        } else if (phase === 'exit') {
            switch (this.settings.intensity) {
                case 'light':
                    animationName = 'fadeOut';
                    break;
                case 'medium':
                    animationName = 'slideOutToTop';
                    break;
                case 'heavy':
                    animationName = 'scaleOutBounce';
                    break;
            }
            
            element.classList.add('modal-exiting');
            element.style.animation = `${animationName} var(--animation-speed) forwards`;
            
            // Remove element after animation completes
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, this.settings.transitionSpeed);
        }
    }

    /**
     * Initialize background effects
     */
    initBackgroundEffects() {
        // Get background elements to animate
        const backgroundElements = document.querySelectorAll('.animated-background, .chat-background, .main-background');
        
        if (backgroundElements.length === 0) {
            // Create a background element if none exists
            const background = document.createElement('div');
            background.className = 'animated-background main-background';
            document.body.insertBefore(background, document.body.firstChild);
            
            this.elements.backgrounds.push(background);
        } else {
            // Store references to existing backgrounds
            backgroundElements.forEach(element => {
                this.elements.backgrounds.push(element);
            });
        }
        
        // Apply background effect based on current settings
        this.updateBackgroundEffects();
    }

    /**
     * Update background effects
     */
    updateBackgroundEffects() {
        if (!this.settings.animateBackgrounds || this.elements.backgrounds.length === 0) {
            return;
        }
        
        // Get effect based on intensity
        const effectName = this.presets.background[this.settings.intensity].effect;
        
        // Apply to all background elements
        this.elements.backgrounds.forEach(element => {
            // Clear existing classes
            element.className = element.className
                .split(' ')
                .filter(cls => !cls.startsWith('bg-effect-'))
                .join(' ');
                
            // Add new effect class
            element.classList.add(`bg-effect-${effectName}`);
            
            // Apply appropriate background animation
            switch (effectName) {
                case 'subtleGradient':
                    element.style.background = 'linear-gradient(120deg, var(--color-background), var(--color-light))';
                    break;
                    
                case 'gradientShift':
                    // Create gradient animation
                    element.style.background = 'linear-gradient(120deg, var(--color-background), var(--color-primary), var(--color-secondary), var(--color-background))';
                    element.style.backgroundSize = '300% 300%';
                    element.style.animation = 'gradientShift 15s ease infinite';
                    break;
                    
                case 'wavesAndParticles':
                    // Create waves with SVG
                    const wavesSVG = `
                        <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                            <path class="wave1" d="M0,160L40,138.7C80,117,160,75,240,64C320,53,400,75,480,106.7C560,139,640,181,720,181.3C800,181,880,139,960,122.7C1040,107,1120,117,1200,122.7C1280,128,1360,128,1400,128L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                            <path class="wave2" d="M0,224L40,229.3C80,235,160,245,240,234.7C320,224,400,192,480,176C560,160,640,160,720,176C800,192,880,224,960,224C1040,224,1120,192,1200,176C1280,160,1360,160,1400,160L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                        </svg>
                    `;
                    
                    element.innerHTML = wavesSVG;
                    element.style.background = 'linear-gradient(180deg, var(--color-background), var(--color-primary))';
                    element.style.backgroundSize = '100% 100%';
                    
                    // Animate waves
                    const wave1 = element.querySelector('.wave1');
                    const wave2 = element.querySelector('.wave2');
                    
                    if (wave1 && wave2) {
                        wave1.style.fill = 'var(--color-primary)';
                        wave1.style.opacity = '0.3';
                        wave1.style.animation = 'wave 15s linear infinite';
                        
                        wave2.style.fill = 'var(--color-secondary)';
                        wave2.style.opacity = '0.2';
                        wave2.style.animation = 'wave 12s linear -2s infinite';
                    }
                    break;
            }
        });
    }

    /**
     * Resize background effects when window size changes
     */
    resizeBackgroundEffects() {
        // Update any size-dependent effects
        if (this.settings.animateBackgrounds && this.elements.backgrounds.length > 0) {
            // Force redraw of background effects
            this.updateBackgroundEffects();
        }
    }

    /**
     * Initialize particle effects
     */
    initParticles() {
        if (!this.settings.enableParticles) {
            return;
        }
        
        try {
            // For simplicity, we're assuming we have a function to create particle systems
            // In a real implementation, you'd use a library like particles.js or implement your own
            this.createParticleSystem();
        } catch (error) {
            console.error('Failed to initialize particles:', error);
            this.settings.enableParticles = false;
        }
    }

    /**
     * Create particle system
     * This is a placeholder - you would typically use a library or more complex implementation
     */
    createParticleSystem() {
        // Check if a particle container already exists
        let particleContainer = document.querySelector('.particle-container');
        
        if (!particleContainer) {
            // Create a container for particles
            particleContainer = document.createElement('div');
            particleContainer.className = 'particle-container';
            document.body.appendChild(particleContainer);
        }
        
        // Create particles based on density setting
        const density = this.settings.particlesDensity;
        
        // Clear existing particles
        particleContainer.innerHTML = '';
        
        // Create new particles
        for (let i = 0; i < density; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Randomize particle properties
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = Math.random() * 0.6 + 0.2;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 10;
            
            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = `${opacity}`;
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            
            // Set color based on theme
            particle.style.backgroundColor = 'var(--color-primary)';
            
            // Add to container
            particleContainer.appendChild(particle);
        }
        
        // Store reference
        this.particles.background = particleContainer;
    }

    /**
     * Update particle effects
     */
    updateParticles() {
        if (!this.settings.enableParticles) {
            this.destroyParticles();
            return;
        }
        
        // Re-create particles with new settings
        this.createParticleSystem();
    }

    /**
     * Resize particle effects
     */
    resizeParticles() {
        if (this.settings.enableParticles && this.particles.background) {
            // Simply recreate the particles
            this.createParticleSystem();
        }
    }

    /**
     * Destroy particle effects
     */
    destroyParticles() {
        if (this.particles.background) {
            // Remove particle container
            if (this.particles.background.parentNode) {
                this.particles.background.parentNode.removeChild(this.particles.background);
            }
            
            this.particles.background = null;
        }
    }

    /**
     * Create a loading indicator
     * @param {HTMLElement|string} container - Container element or selector
     * @param {string} type - Type of loading indicator
     * @param {Object} options - Options for the indicator
     * @returns {HTMLElement} Created loading indicator
     */
    createLoadingIndicator(container, type = 'spinner', options = {}) {
        // Get container element
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) {
            console.error('Container element for loading indicator not found');
            return null;
        }
        
        // Create loading indicator
        const loader = document.createElement('div');
        loader.className = `loading-indicator loading-${type}`;
        
        // Apply options
        if (options.size) {
            loader.style.width = options.size;
            loader.style.height = options.size;
        }
        
        if (options.color) {
            loader.style.color = options.color;
        }
        
        if (options.text) {
            const loaderText = document.createElement('div');
            loaderText.className = 'loading-text';
            loaderText.textContent = options.text;
            loader.appendChild(loaderText);
        }
        
        // Create appropriate loading animation based on type
        switch (type) {
            case 'spinner':
                // Create spinner
                const spinner = document.createElement('div');
                spinner.className = 'spinner';
                loader.appendChild(spinner);
                break;
                
            case 'dots':
                // Create bouncing dots
                for (let i = 0; i < 3; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'loading-dot';
                    dot.style.animationDelay = `${i * 0.15}s`;
                    loader.appendChild(dot);
                }
                break;
                
            case 'progress':
                // Create progress bar
                const progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                
                const progressFill = document.createElement('div');
                progressFill.className = 'progress-fill';
                if (options.progress) {
                    progressFill.style.width = `${options.progress}%`;
                }
                
                progressBar.appendChild(progressFill);
                loader.appendChild(progressBar);
                
                // Method to update progress
                loader.updateProgress = (percent) => {
                    progressFill.style.width = `${percent}%`;
                };
                break;
                
            case 'pulse':
                // Create pulsing circle
                const pulse = document.createElement('div');
                pulse.className = 'pulse-circle';
                loader.appendChild(pulse);
                break;
        }
        
        // Add to container
        container.appendChild(loader);
        
        // Store reference
        this.elements.loadingIndicators.push(loader);
        
        return loader;
    }

    /**
     * Create toast notification
     * @param {string} message - Notification message
     * @param {string} type - Notification type ('info', 'success', 'warning', 'error')
     * @param {Object} options - Options for the notification
     * @returns {HTMLElement} Created notification element
     */
    createToast(message, type = 'info', options = {}) {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');
        
        // Set animation based on intensity
        switch (this.settings.intensity) {
            case 'light':
                toast.style.animation = 'fadeIn var(--animation-speed-fast) forwards';
                break;
            case 'medium':
                toast.style.animation = 'slideInRight var(--animation-speed) forwards';
                break;
            case 'heavy':
                toast.style.animation = 'bounceIn var(--animation-speed) forwards';
                break;
        }
        
        // Create toast content
        const icon = document.createElement('div');
        icon.className = 'toast-icon';
        
        // Set icon based on type
        switch (type) {
            case 'info':
                icon.innerHTML = '<i class="fas fa-info-circle"></i>';
                break;
            case 'success':
                icon.innerHTML = '<i class="fas fa-check-circle"></i>';
                break;
            case 'warning':
                icon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            case 'error':
                icon.innerHTML = '<i class="fas fa-times-circle"></i>';
                break;
        }
        
        const content = document.createElement('div');
        content.className = 'toast-content';
        
        if (options.title) {
            const title = document.createElement('div');
            title.className = 'toast-title';
            title.textContent = options.title;
            content.appendChild(title);
        }
        
        const text = document.createElement('div');
        text.className = 'toast-text';
        text.textContent = message;
        content.appendChild(text);
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Close');
        
        // Add elements to toast
        toast.appendChild(icon);
        toast.appendChild(content);
        toast.appendChild(closeBtn);
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Set up auto-dismiss
        const duration = options.duration || 5000;
        const timeoutId = setTimeout(() => {
            this.dismissToast(toast);
        }, duration);
        
        // Set up close button
        closeBtn.addEventListener('click', () => {
            clearTimeout(timeoutId);
            this.dismissToast(toast);
        });
        
        return toast;
    }

    /**
     * Dismiss a toast notification
     * @param {HTMLElement} toast - Toast element to dismiss
     */
    dismissToast(toast) {
        if (!toast) return;
        
        // Set exit animation based on intensity
        switch (this.settings.intensity) {
            case 'light':
                toast.style.animation = 'fadeOut var(--animation-speed-fast) forwards';
                break;
            case 'medium':
                toast.style.animation = 'slideOutRight var(--animation-speed) forwards';
                break;
            case 'heavy':
                toast.style.animation = 'bounceOut var(--animation-speed) forwards';
                break;
        }
        
        // Remove after animation completes
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
                
                // Check if container is empty and remove it
                const container = document.querySelector('.toast-container');
                if (container && !container.children.length) {
                    container.parentNode.removeChild(container);
                }
            }
        }, this.settings.transitionSpeed);
    }

    /**
     * Register an event listener
     * @param {string} event - Event name
     * @param {Function} handler - Event handler function
     */
    on(event, handler) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        
        this.eventListeners[event].push(handler);
    }

    /**
     * Trigger an event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    trigger(event, data) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UIAnimator };
}
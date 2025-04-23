/**
 * JAAT-AI Keyboard Effects Feature
 * Add visual and audio effects to keyboard interactions for a more engaging experience
 */

class KeyboardEffects {
    constructor() {
        // Available visual effects
        this.visualEffects = [
            { id: 'none', name: 'None' },
            { id: 'ripple', name: 'Ripple Effect' },
            { id: 'particles', name: 'Particle Burst' },
            { id: 'highlight', name: 'Key Highlight' },
            { id: 'shake', name: 'Shake' },
            { id: 'glow', name: 'Glow' },
            { id: 'confetti', name: 'Confetti' }
        ];
        
        // Available sound effects
        this.soundEffects = [
            { id: 'none', name: 'None' },
            { id: 'mechanical', name: 'Mechanical Keyboard', file: 'sounds/keyboard-mechanical.mp3' },
            { id: 'typewriter', name: 'Typewriter', file: 'sounds/keyboard-typewriter.mp3' },
            { id: 'soft', name: 'Soft Click', file: 'sounds/keyboard-soft.mp3' },
            { id: 'scifi', name: 'Sci-Fi', file: 'sounds/keyboard-scifi.mp3' },
            { id: 'bubble', name: 'Bubble Pop', file: 'sounds/keyboard-bubble.mp3' },
            { id: 'retro', name: 'Retro Beep', file: 'sounds/keyboard-retro.mp3' }
        ];
        
        // Special event effects
        this.specialEffects = [
            { id: 'enter', name: 'Enter Key', visual: 'confetti', sound: 'sounds/keyboard-enter.mp3' },
            { id: 'delete', name: 'Delete Key', visual: 'shake', sound: 'sounds/keyboard-delete.mp3' },
            { id: 'space', name: 'Space Key', visual: 'ripple', sound: 'sounds/keyboard-space.mp3' }
        ];
        
        // Current settings
        this.currentVisualEffect = 'none';
        this.currentSoundEffect = 'none';
        this.enableSpecialEffects = true;
        this.visualEffectOpacity = 0.7;
        this.soundEffectVolume = 0.5;
        
        // State
        this.isEnabled = false;
        this.isInitialized = false;
        this.audioContext = null;
        this.audioBuffers = new Map();
        this.targetSelector = '.chat-input, textarea, input[type="text"]';
        this.trackedElements = [];
        
        // Storage keys
        this.storageKeyPrefix = 'jaat-keyboard-effects-';
        
        // Keyboard event handling
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
        this.boundHandleKeyUp = this.handleKeyUp.bind(this);
        
        // Configuration for particle effects
        this.particleConfig = {
            count: 15, // Number of particles
            speed: 6, // Base speed of particles
            spread: 50, // How far particles can spread
            colors: ['#FF5F6D', '#FFC371', '#38FFDD', '#7C3AED', '#3B82F6'],
            lifetime: 500, // Particle lifetime in ms
            gravity: 0.2 // Gravity factor
        };
    }

    /**
     * Initialize keyboard effects
     * @param {Object} options - Configuration options
     * @returns {KeyboardEffects} This instance
     */
    init(options = {}) {
        // Don't initialize twice
        if (this.isInitialized) {
            return this;
        }
        
        // Apply custom options
        if (options.visualEffect && this.visualEffects.some(e => e.id === options.visualEffect)) {
            this.currentVisualEffect = options.visualEffect;
        }
        
        if (options.soundEffect && this.soundEffects.some(e => e.id === options.soundEffect)) {
            this.currentSoundEffect = options.soundEffect;
        }
        
        if (typeof options.enableSpecialEffects === 'boolean') {
            this.enableSpecialEffects = options.enableSpecialEffects;
        }
        
        if (typeof options.visualEffectOpacity === 'number') {
            this.visualEffectOpacity = Math.max(0, Math.min(1, options.visualEffectOpacity));
        }
        
        if (typeof options.soundEffectVolume === 'number') {
            this.soundEffectVolume = Math.max(0, Math.min(1, options.soundEffectVolume));
        }
        
        if (options.targetSelector) {
            this.targetSelector = options.targetSelector;
        }
        
        // Load saved preferences
        this.loadPreferences();
        
        // Create audio context if sound effects are enabled
        if (this.currentSoundEffect !== 'none' || this.enableSpecialEffects) {
            this.initAudio();
        }
        
        // Add CSS styles
        this.addStyles();
        
        // Mark as initialized
        this.isInitialized = true;
        
        // Enable effects if requested
        if (options.enabled !== false) {
            this.enable();
        }
        
        console.log('Keyboard Effects initialized');
        return this;
    }

    /**
     * Load saved preferences from localStorage
     */
    loadPreferences() {
        try {
            const savedVisualEffect = localStorage.getItem(`${this.storageKeyPrefix}visual`);
            if (savedVisualEffect && this.visualEffects.some(e => e.id === savedVisualEffect)) {
                this.currentVisualEffect = savedVisualEffect;
            }
            
            const savedSoundEffect = localStorage.getItem(`${this.storageKeyPrefix}sound`);
            if (savedSoundEffect && this.soundEffects.some(e => e.id === savedSoundEffect)) {
                this.currentSoundEffect = savedSoundEffect;
            }
            
            const savedSpecialEffects = localStorage.getItem(`${this.storageKeyPrefix}special`);
            if (savedSpecialEffects !== null) {
                this.enableSpecialEffects = savedSpecialEffects === 'true';
            }
            
            const savedVisualOpacity = localStorage.getItem(`${this.storageKeyPrefix}visual-opacity`);
            if (savedVisualOpacity !== null) {
                this.visualEffectOpacity = parseFloat(savedVisualOpacity);
            }
            
            const savedSoundVolume = localStorage.getItem(`${this.storageKeyPrefix}sound-volume`);
            if (savedSoundVolume !== null) {
                this.soundEffectVolume = parseFloat(savedSoundVolume);
            }
            
            const savedEnabled = localStorage.getItem(`${this.storageKeyPrefix}enabled`);
            if (savedEnabled !== null) {
                this.isEnabled = savedEnabled === 'true';
            }
        } catch (error) {
            console.error('Error loading keyboard effects preferences:', error);
        }
    }

    /**
     * Save current settings to localStorage
     */
    savePreferences() {
        try {
            localStorage.setItem(`${this.storageKeyPrefix}visual`, this.currentVisualEffect);
            localStorage.setItem(`${this.storageKeyPrefix}sound`, this.currentSoundEffect);
            localStorage.setItem(`${this.storageKeyPrefix}special`, this.enableSpecialEffects.toString());
            localStorage.setItem(`${this.storageKeyPrefix}visual-opacity`, this.visualEffectOpacity.toString());
            localStorage.setItem(`${this.storageKeyPrefix}sound-volume`, this.soundEffectVolume.toString());
            localStorage.setItem(`${this.storageKeyPrefix}enabled`, this.isEnabled.toString());
        } catch (error) {
            console.error('Error saving keyboard effects preferences:', error);
        }
    }

    /**
     * Initialize Web Audio API
     */
    initAudio() {
        try {
            // Create audio context
            if (window.AudioContext) {
                this.audioContext = new window.AudioContext();
            } else if (window.webkitAudioContext) {
                this.audioContext = new window.webkitAudioContext();
            }
            
            // Pre-load sound effects
            this.preloadSounds();
        } catch (error) {
            console.error('Failed to initialize audio:', error);
        }
    }

    /**
     * Preload sound effect audio files
     */
    preloadSounds() {
        // Skip if no audio context
        if (!this.audioContext) {
            return;
        }
        
        // Get sound files to preload
        const soundsToLoad = new Set();
        
        // Add current sound effect
        if (this.currentSoundEffect !== 'none') {
            const soundEffect = this.soundEffects.find(s => s.id === this.currentSoundEffect);
            if (soundEffect && soundEffect.file) {
                soundsToLoad.add(soundEffect.file);
            }
        }
        
        // Add special effect sounds if enabled
        if (this.enableSpecialEffects) {
            this.specialEffects.forEach(effect => {
                if (effect.sound) {
                    soundsToLoad.add(effect.sound);
                }
            });
        }
        
        // Load each sound file
        soundsToLoad.forEach(file => {
            this.loadSound(file);
        });
    }

    /**
     * Load a sound file
     * @param {string} file - Sound file path
     * @returns {Promise<AudioBuffer>} Loaded audio buffer
     */
    async loadSound(file) {
        // Skip if already loaded
        if (this.audioBuffers.has(file)) {
            return this.audioBuffers.get(file);
        }
        
        // Skip if no audio context
        if (!this.audioContext) {
            return null;
        }
        
        try {
            const response = await fetch(file);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            
            // Store in cache
            this.audioBuffers.set(file, audioBuffer);
            
            return audioBuffer;
        } catch (error) {
            console.error(`Failed to load sound: ${file}`, error);
            return null;
        }
    }

    /**
     * Play a sound effect
     * @param {string} file - Sound file path
     */
    async playSound(file) {
        // Skip if no audio context or sounds disabled
        if (!this.audioContext || this.currentSoundEffect === 'none' && !this.enableSpecialEffects) {
            return;
        }
        
        try {
            // Resume audio context if suspended (needed for Chrome autoplay policy)
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            
            // Get audio buffer
            let buffer = this.audioBuffers.get(file);
            
            // Load if not cached
            if (!buffer) {
                buffer = await this.loadSound(file);
                if (!buffer) {
                    return; // Failed to load
                }
            }
            
            // Create source
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            
            // Create gain node for volume control
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = this.soundEffectVolume;
            
            // Connect nodes
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Play sound
            source.start(0);
        } catch (error) {
            console.error(`Failed to play sound: ${file}`, error);
        }
    }

    /**
     * Enable keyboard effects
     */
    enable() {
        if (this.isEnabled) {
            return;
        }
        
        // Find and track editable elements
        this.scanForEditableElements();
        
        // Create MutationObserver to track new elements
        this.createElementObserver();
        
        // Add keyboard event listeners
        document.addEventListener('keydown', this.boundHandleKeyDown);
        document.addEventListener('keyup', this.boundHandleKeyUp);
        
        // Mark as enabled
        this.isEnabled = true;
        
        // Save preferences
        this.savePreferences();
        
        console.log('Keyboard effects enabled');
    }

    /**
     * Disable keyboard effects
     */
    disable() {
        if (!this.isEnabled) {
            return;
        }
        
        // Remove event listeners
        document.removeEventListener('keydown', this.boundHandleKeyDown);
        document.removeEventListener('keyup', this.boundHandleKeyUp);
        
        // Disconnect observer
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        // Clear tracked elements
        this.trackedElements = [];
        
        // Mark as disabled
        this.isEnabled = false;
        
        // Save preferences
        this.savePreferences();
        
        console.log('Keyboard effects disabled');
    }

    /**
     * Scan the document for editable elements
     */
    scanForEditableElements() {
        // Get elements matching the target selector
        const elements = document.querySelectorAll(this.targetSelector);
        
        // Add each element to tracking
        elements.forEach(element => {
            if (!this.trackedElements.includes(element)) {
                this.trackedElements.push(element);
            }
        });
    }

    /**
     * Create MutationObserver to track new editable elements
     */
    createElementObserver() {
        // Create observer
        this.observer = new MutationObserver(mutations => {
            let needsScan = false;
            
            mutations.forEach(mutation => {
                // Check for added nodes
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    needsScan = true;
                }
            });
            
            // Scan for new elements if needed
            if (needsScan) {
                this.scanForEditableElements();
            }
        });
        
        // Start observing
        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Handle keydown event
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyDown(event) {
        // Check if event target is a tracked element
        if (!this.isEditableElement(event.target)) {
            return;
        }
        
        // Get cursor position for visual effects
        const cursorPos = this.getCursorPosition(event.target);
        if (!cursorPos) {
            return;
        }
        
        // Check for special keys
        const specialEffect = this.getSpecialEffect(event.key);
        
        // Apply visual effect
        if (specialEffect && this.enableSpecialEffects) {
            this.applyVisualEffect(specialEffect.visual, cursorPos.x, cursorPos.y, event.key);
        } else if (this.currentVisualEffect !== 'none') {
            this.applyVisualEffect(this.currentVisualEffect, cursorPos.x, cursorPos.y, event.key);
        }
        
        // Play sound effect
        if (specialEffect && this.enableSpecialEffects) {
            this.playSound(specialEffect.sound);
        } else if (this.currentSoundEffect !== 'none') {
            const soundEffect = this.soundEffects.find(s => s.id === this.currentSoundEffect);
            if (soundEffect && soundEffect.file) {
                this.playSound(soundEffect.file);
            }
        }
    }

    /**
     * Handle keyup event
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyUp(event) {
        // Additional handling if needed
    }

    /**
     * Check if an element is a tracked editable element
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} Whether the element is editable
     */
    isEditableElement(element) {
        // Check if element is in tracked elements
        if (this.trackedElements.includes(element)) {
            return true;
        }
        
        // Check if element matches selector
        if (element.matches && element.matches(this.targetSelector)) {
            // Add to tracked elements
            this.trackedElements.push(element);
            return true;
        }
        
        return false;
    }

    /**
     * Get cursor position in an editable element
     * @param {HTMLElement} element - Element to get cursor position from
     * @returns {Object|null} Cursor position (x, y) or null if not available
     */
    getCursorPosition(element) {
        if (!element) {
            return null;
        }
        
        try {
            // Get element position
            const rect = element.getBoundingClientRect();
            
            // For input/textarea, get caret position
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // Get selection
                const start = element.selectionStart;
                if (start === null) {
                    return {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    };
                }
                
                // Create a temporary span to measure text width
                const span = document.createElement('span');
                span.style.position = 'absolute';
                span.style.visibility = 'hidden';
                span.style.whiteSpace = 'pre';
                span.style.font = window.getComputedStyle(element).font;
                
                // Get text before caret
                const textBefore = element.value.substring(0, start);
                span.textContent = textBefore || 'x';
                document.body.appendChild(span);
                
                // Calculate caret position
                const offsetX = textBefore ? span.offsetWidth : 0;
                document.body.removeChild(span);
                
                // Calculate line based on newlines
                const lines = (textBefore.match(/\n/g) || []).length;
                const lineHeight = parseInt(window.getComputedStyle(element).lineHeight) || 20;
                
                // Calculate cursor position
                const caretX = rect.left + offsetX + 4; // Add padding offset
                const caretY = rect.top + 4 + (lines * lineHeight); // Add padding offset
                
                return { x: caretX, y: caretY };
            }
            
            // For contenteditable, use selection range
            if (element.isContentEditable) {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const rects = range.getClientRects();
                    
                    if (rects.length > 0) {
                        const lastRect = rects[rects.length - 1];
                        return {
                            x: lastRect.right,
                            y: lastRect.top + (lastRect.height / 2)
                        };
                    }
                }
            }
            
            // Fallback to element center
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        } catch (error) {
            console.error('Error getting cursor position:', error);
            return null;
        }
    }

    /**
     * Get special effect for a key
     * @param {string} key - Key pressed
     * @returns {Object|null} Special effect or null if not found
     */
    getSpecialEffect(key) {
        // Skip if special effects are disabled
        if (!this.enableSpecialEffects) {
            return null;
        }
        
        // Check key against special effects
        if (key === 'Enter') {
            return this.specialEffects.find(e => e.id === 'enter');
        } else if (key === 'Backspace' || key === 'Delete') {
            return this.specialEffects.find(e => e.id === 'delete');
        } else if (key === ' ') {
            return this.specialEffects.find(e => e.id === 'space');
        }
        
        return null;
    }

    /**
     * Apply visual effect at the specified position
     * @param {string} effectType - Effect type
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {string} key - Key pressed
     */
    applyVisualEffect(effectType, x, y, key) {
        switch (effectType) {
            case 'ripple':
                this.createRippleEffect(x, y);
                break;
            case 'particles':
                this.createParticleEffect(x, y);
                break;
            case 'highlight':
                this.createHighlightEffect(x, y, key);
                break;
            case 'shake':
                this.createShakeEffect(x, y);
                break;
            case 'glow':
                this.createGlowEffect(x, y);
                break;
            case 'confetti':
                this.createConfettiEffect(x, y);
                break;
        }
    }

    /**
     * Create ripple effect
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    createRippleEffect(x, y) {
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.className = 'keyboard-effect ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.opacity = this.visualEffectOpacity.toString();
        
        // Add to document
        document.body.appendChild(ripple);
        
        // Remove after animation
        setTimeout(() => {
            document.body.removeChild(ripple);
        }, 1000);
    }

    /**
     * Create particle effect
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    createParticleEffect(x, y) {
        // Create particles
        for (let i = 0; i < this.particleConfig.count; i++) {
            // Create particle element
            const particle = document.createElement('div');
            particle.className = 'keyboard-effect particle-effect';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = this.visualEffectOpacity.toString();
            
            // Set random color
            const color = this.particleConfig.colors[Math.floor(Math.random() * this.particleConfig.colors.length)];
            particle.style.backgroundColor = color;
            
            // Calculate random direction
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * this.particleConfig.speed + 2;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            // Add to document
            document.body.appendChild(particle);
            
            // Animate particle
            let posX = x;
            let posY = y;
            let opacity = 1;
            let size = Math.random() * 4 + 3;
            
            // Update function
            const update = () => {
                // Apply gravity
                posX += vx;
                posY += vy + this.particleConfig.gravity;
                
                // Decrease opacity and size
                opacity -= 1 / (this.particleConfig.lifetime / 16);
                size -= 0.1;
                
                // Update particle style
                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}px`;
                particle.style.opacity = (opacity * this.visualEffectOpacity).toString();
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Continue if not expired
                if (opacity > 0 && size > 0) {
                    requestAnimationFrame(update);
                } else {
                    document.body.removeChild(particle);
                }
            };
            
            // Start animation
            requestAnimationFrame(update);
        }
    }

    /**
     * Create key highlight effect
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {string} key - Key pressed
     */
    createHighlightEffect(x, y, key) {
        // Create highlight element
        const highlight = document.createElement('div');
        highlight.className = 'keyboard-effect highlight-effect';
        highlight.style.left = `${x - 20}px`;
        highlight.style.top = `${y - 20}px`;
        highlight.style.opacity = this.visualEffectOpacity.toString();
        highlight.textContent = key.length === 1 ? key : '';
        
        // Add to document
        document.body.appendChild(highlight);
        
        // Remove after animation
        setTimeout(() => {
            highlight.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(highlight);
            }, 200);
        }, 300);
    }

    /**
     * Create shake effect
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    createShakeEffect(x, y) {
        // Find closest input element
        let target = null;
        for (const element of this.trackedElements) {
            const rect = element.getBoundingClientRect();
            if (
                x >= rect.left && x <= rect.right &&
                y >= rect.top && y <= rect.bottom
            ) {
                target = element;
                break;
            }
        }
        
        if (!target) {
            return;
        }
        
        // Add shake class
        target.classList.add('keyboard-shake-effect');
        
        // Remove after animation
        setTimeout(() => {
            target.classList.remove('keyboard-shake-effect');
        }, 500);
    }

    /**
     * Create glow effect
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    createGlowEffect(x, y) {
        // Create glow element
        const glow = document.createElement('div');
        glow.className = 'keyboard-effect glow-effect';
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        glow.style.opacity = this.visualEffectOpacity.toString();
        
        // Add to document
        document.body.appendChild(glow);
        
        // Remove after animation
        setTimeout(() => {
            document.body.removeChild(glow);
        }, 700);
    }

    /**
     * Create confetti effect
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    createConfettiEffect(x, y) {
        // Create confetti pieces
        const confettiCount = 30;
        const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#4d908e', '#577590', '#277da1'];
        const shapes = ['square', 'circle', 'triangle', 'line'];
        
        for (let i = 0; i < confettiCount; i++) {
            // Create confetti element
            const confetti = document.createElement('div');
            confetti.className = 'keyboard-effect confetti-effect';
            
            // Set position
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.opacity = this.visualEffectOpacity.toString();
            
            // Randomize appearance
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.backgroundColor = color;
            confetti.classList.add(`confetti-${shape}`);
            
            // Randomize size
            const size = Math.random() * 8 + 5;
            confetti.style.width = `${size}px`;
            confetti.style.height = shape === 'line' ? '2px' : `${size}px`;
            
            // Add to document
            document.body.appendChild(confetti);
            
            // Animate confetti
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 10 + 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 10; // Initial upward velocity
            const rotationSpeed = Math.random() * 600 - 300;
            
            let posX = x;
            let posY = y;
            let rotation = 0;
            let opacity = 1;
            
            // Update function
            const update = () => {
                // Apply gravity
                posX += vx;
                posY += vy;
                vy += 0.6; // Gravity
                
                // Apply rotation
                rotation += rotationSpeed;
                
                // Fade out
                opacity -= 0.02;
                
                // Update element
                confetti.style.left = `${posX}px`;
                confetti.style.top = `${posY}px`;
                confetti.style.transform = `rotate(${rotation}deg)`;
                confetti.style.opacity = (opacity * this.visualEffectOpacity).toString();
                
                // Continue if not expired
                if (opacity > 0) {
                    requestAnimationFrame(update);
                } else {
                    document.body.removeChild(confetti);
                }
            };
            
            // Start animation
            requestAnimationFrame(update);
        }
    }

    /**
     * Set visual effect
     * @param {string} effectId - Effect ID
     * @returns {boolean} Whether the effect was set successfully
     */
    setVisualEffect(effectId) {
        // Check if effect exists
        if (!this.visualEffects.some(e => e.id === effectId)) {
            console.warn(`Visual effect not found: ${effectId}`);
            return false;
        }
        
        // Update current effect
        this.currentVisualEffect = effectId;
        
        // Save preferences
        this.savePreferences();
        
        return true;
    }

    /**
     * Set sound effect
     * @param {string} effectId - Effect ID
     * @returns {Promise<boolean>} Whether the effect was set successfully
     */
    async setSoundEffect(effectId) {
        // Check if effect exists
        if (!this.soundEffects.some(e => e.id === effectId)) {
            console.warn(`Sound effect not found: ${effectId}`);
            return false;
        }
        
        // Update current effect
        this.currentSoundEffect = effectId;
        
        // Initialize audio if needed
        if (effectId !== 'none' && !this.audioContext) {
            this.initAudio();
        }
        
        // Preload sound
        if (effectId !== 'none') {
            const soundEffect = this.soundEffects.find(s => s.id === effectId);
            if (soundEffect && soundEffect.file) {
                await this.loadSound(soundEffect.file);
            }
        }
        
        // Save preferences
        this.savePreferences();
        
        return true;
    }

    /**
     * Set special effects enabled state
     * @param {boolean} enabled - Whether special effects are enabled
     */
    setSpecialEffectsEnabled(enabled) {
        this.enableSpecialEffects = !!enabled;
        
        // Initialize audio if needed
        if (enabled && !this.audioContext) {
            this.initAudio();
            this.preloadSounds();
        }
        
        // Save preferences
        this.savePreferences();
    }

    /**
     * Set visual effect opacity
     * @param {number} opacity - Opacity value (0-1)
     */
    setVisualEffectOpacity(opacity) {
        this.visualEffectOpacity = Math.max(0, Math.min(1, opacity));
        
        // Save preferences
        this.savePreferences();
    }

    /**
     * Set sound effect volume
     * @param {number} volume - Volume value (0-1)
     */
    setSoundEffectVolume(volume) {
        this.soundEffectVolume = Math.max(0, Math.min(1, volume));
        
        // Save preferences
        this.savePreferences();
    }

    /**
     * Add CSS styles
     */
    addStyles() {
        const styleId = 'keyboard-effects-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            /* Ripple effect */
            .keyboard-effect {
                position: absolute;
                z-index: 9999;
                pointer-events: none;
            }
            
            .ripple-effect {
                width: 10px;
                height: 10px;
                background-color: rgba(124, 58, 237, 0.8);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple-animation 1s ease-out;
            }
            
            @keyframes ripple-animation {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 0.7;
                }
                100% {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
            
            /* Particle effect */
            .particle-effect {
                position: absolute;
                width: 6px;
                height: 6px;
                background-color: rgba(124, 58, 237, 0.8);
                border-radius: 50%;
                transform: translate(-50%, -50%);
            }
            
            /* Highlight effect */
            .highlight-effect {
                position: absolute;
                width: 40px;
                height: 40px;
                background-color: rgba(124, 58, 237, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                font-weight: bold;
                color: rgba(255, 255, 255, 0.9);
                animation: highlight-animation 0.5s ease-out;
            }
            
            @keyframes highlight-animation {
                0% {
                    transform: translate(-50%, -50%) scale(0.5);
                    opacity: 0.9;
                }
                100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0;
                }
            }
            
            /* Shake effect */
            .keyboard-shake-effect {
                animation: shake-animation 0.5s ease-in-out;
            }
            
            @keyframes shake-animation {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                20%, 40%, 60%, 80% { transform: translateX(2px); }
            }
            
            /* Glow effect */
            .glow-effect {
                position: absolute;
                width: 40px;
                height: 40px;
                background: radial-gradient(circle, rgba(124, 58, 237, 0.7) 0%, rgba(124, 58, 237, 0) 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: glow-animation 0.7s ease-out;
            }
            
            @keyframes glow-animation {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 0.9;
                }
                100% {
                    width: 80px;
                    height: 80px;
                    opacity: 0;
                }
            }
            
            /* Confetti effect */
            .confetti-effect {
                position: absolute;
                width: 8px;
                height: 8px;
                transform: translate(-50%, -50%);
            }
            
            .confetti-square {
                border-radius: 0;
            }
            
            .confetti-circle {
                border-radius: 50%;
            }
            
            .confetti-triangle {
                width: 0 !important;
                height: 0 !important;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 10px solid currentColor;
                background-color: transparent !important;
            }
            
            .confetti-line {
                width: 10px;
                height: 2px;
            }
        `;
        
        document.head.appendChild(style);
    }

    /**
     * Create keyboard effects UI
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
        uiContainer.className = 'keyboard-effects-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'keyboard-effects-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'keyboard-effects-title';
        title.textContent = 'Keyboard Effects';
        header.appendChild(title);
        
        // Create toggle switch
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'keyboard-effects-toggle-container';
        header.appendChild(toggleContainer);
        
        const toggleLabel = document.createElement('span');
        toggleLabel.className = 'keyboard-effects-toggle-label';
        toggleLabel.textContent = this.isEnabled ? 'Enabled' : 'Disabled';
        toggleContainer.appendChild(toggleLabel);
        
        const toggleSwitch = document.createElement('label');
        toggleSwitch.className = 'keyboard-effects-switch';
        toggleContainer.appendChild(toggleSwitch);
        
        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.checked = this.isEnabled;
        toggleSwitch.appendChild(toggleInput);
        
        const toggleSlider = document.createElement('span');
        toggleSlider.className = 'keyboard-effects-slider';
        toggleSwitch.appendChild(toggleSlider);
        
        // Create settings container
        const settingsContainer = document.createElement('div');
        settingsContainer.className = 'keyboard-effects-settings';
        uiContainer.appendChild(settingsContainer);
        
        // Visual effects section
        const visualSection = document.createElement('div');
        visualSection.className = 'keyboard-effects-section';
        settingsContainer.appendChild(visualSection);
        
        const visualLabel = document.createElement('h4');
        visualLabel.className = 'keyboard-effects-section-title';
        visualLabel.textContent = 'Visual Effects';
        visualSection.appendChild(visualLabel);
        
        const visualSelect = document.createElement('select');
        visualSelect.className = 'keyboard-effects-select';
        this.visualEffects.forEach(effect => {
            const option = document.createElement('option');
            option.value = effect.id;
            option.textContent = effect.name;
            if (effect.id === this.currentVisualEffect) {
                option.selected = true;
            }
            visualSelect.appendChild(option);
        });
        visualSection.appendChild(visualSelect);
        
        // Visual effect opacity
        const opacityContainer = document.createElement('div');
        opacityContainer.className = 'keyboard-effects-slider-container';
        visualSection.appendChild(opacityContainer);
        
        const opacityLabel = document.createElement('span');
        opacityLabel.className = 'keyboard-effects-slider-label';
        opacityLabel.textContent = 'Opacity:';
        opacityContainer.appendChild(opacityLabel);
        
        const opacityValue = document.createElement('span');
        opacityValue.className = 'keyboard-effects-slider-value';
        opacityValue.textContent = Math.round(this.visualEffectOpacity * 100) + '%';
        opacityContainer.appendChild(opacityValue);
        
        const opacitySlider = document.createElement('input');
        opacitySlider.type = 'range';
        opacitySlider.min = '0';
        opacitySlider.max = '1';
        opacitySlider.step = '0.1';
        opacitySlider.value = this.visualEffectOpacity.toString();
        opacitySlider.className = 'keyboard-effects-range';
        opacityContainer.appendChild(opacitySlider);
        
        // Sound effects section
        const soundSection = document.createElement('div');
        soundSection.className = 'keyboard-effects-section';
        settingsContainer.appendChild(soundSection);
        
        const soundLabel = document.createElement('h4');
        soundLabel.className = 'keyboard-effects-section-title';
        soundLabel.textContent = 'Sound Effects';
        soundSection.appendChild(soundLabel);
        
        const soundSelect = document.createElement('select');
        soundSelect.className = 'keyboard-effects-select';
        this.soundEffects.forEach(effect => {
            const option = document.createElement('option');
            option.value = effect.id;
            option.textContent = effect.name;
            if (effect.id === this.currentSoundEffect) {
                option.selected = true;
            }
            soundSelect.appendChild(option);
        });
        soundSection.appendChild(soundSelect);
        
        // Sound effect volume
        const volumeContainer = document.createElement('div');
        volumeContainer.className = 'keyboard-effects-slider-container';
        soundSection.appendChild(volumeContainer);
        
        const volumeLabel = document.createElement('span');
        volumeLabel.className = 'keyboard-effects-slider-label';
        volumeLabel.textContent = 'Volume:';
        volumeContainer.appendChild(volumeLabel);
        
        const volumeValue = document.createElement('span');
        volumeValue.className = 'keyboard-effects-slider-value';
        volumeValue.textContent = Math.round(this.soundEffectVolume * 100) + '%';
        volumeContainer.appendChild(volumeValue);
        
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = '0';
        volumeSlider.max = '1';
        volumeSlider.step = '0.1';
        volumeSlider.value = this.soundEffectVolume.toString();
        volumeSlider.className = 'keyboard-effects-range';
        volumeContainer.appendChild(volumeSlider);
        
        // Special effects toggle
        const specialContainer = document.createElement('div');
        specialContainer.className = 'keyboard-effects-checkbox-container';
        settingsContainer.appendChild(specialContainer);
        
        const specialLabel = document.createElement('label');
        specialLabel.className = 'keyboard-effects-checkbox-label';
        specialContainer.appendChild(specialLabel);
        
        const specialCheckbox = document.createElement('input');
        specialCheckbox.type = 'checkbox';
        specialCheckbox.className = 'keyboard-effects-checkbox';
        specialCheckbox.checked = this.enableSpecialEffects;
        specialLabel.appendChild(specialCheckbox);
        
        const specialText = document.createElement('span');
        specialText.textContent = 'Enable special effects for Enter, Delete, Space keys';
        specialLabel.appendChild(specialText);
        
        // Create test area
        const testArea = document.createElement('div');
        testArea.className = 'keyboard-effects-test-area';
        uiContainer.appendChild(testArea);
        
        const testLabel = document.createElement('h4');
        testLabel.className = 'keyboard-effects-test-title';
        testLabel.textContent = 'Test Keyboard Effects';
        testArea.appendChild(testLabel);
        
        const testInput = document.createElement('input');
        testInput.type = 'text';
        testInput.className = 'keyboard-effects-test-input';
        testInput.placeholder = 'Type here to test keyboard effects...';
        testArea.appendChild(testInput);
        
        // Add event listeners
        
        // Main toggle
        toggleInput.addEventListener('change', () => {
            if (toggleInput.checked) {
                this.enable();
            } else {
                this.disable();
            }
            toggleLabel.textContent = this.isEnabled ? 'Enabled' : 'Disabled';
        });
        
        // Visual effect
        visualSelect.addEventListener('change', () => {
            this.setVisualEffect(visualSelect.value);
        });
        
        // Visual opacity
        opacitySlider.addEventListener('input', () => {
            const value = parseFloat(opacitySlider.value);
            this.setVisualEffectOpacity(value);
            opacityValue.textContent = Math.round(value * 100) + '%';
        });
        
        // Sound effect
        soundSelect.addEventListener('change', () => {
            this.setSoundEffect(soundSelect.value);
        });
        
        // Sound volume
        volumeSlider.addEventListener('input', () => {
            const value = parseFloat(volumeSlider.value);
            this.setSoundEffectVolume(value);
            volumeValue.textContent = Math.round(value * 100) + '%';
        });
        
        // Special effects
        specialCheckbox.addEventListener('change', () => {
            this.setSpecialEffectsEnabled(specialCheckbox.checked);
        });
        
        // Add styles
        this.addUIStyles();
        
        // Make sure the test input is tracked
        this.trackedElements.push(testInput);
        
        return uiContainer;
    }

    /**
     * Add UI styles
     */
    addUIStyles() {
        const styleId = 'keyboard-effects-ui-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .keyboard-effects-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .keyboard-effects-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .keyboard-effects-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .keyboard-effects-toggle-container {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .keyboard-effects-toggle-label {
                font-size: 0.875rem;
            }
            
            .keyboard-effects-switch {
                position: relative;
                display: inline-block;
                width: 48px;
                height: 24px;
            }
            
            .keyboard-effects-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .keyboard-effects-slider {
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
            
            .keyboard-effects-slider:before {
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
            
            input:checked + .keyboard-effects-slider {
                background-color: var(--accent-primary, #7c3aed);
            }
            
            input:focus + .keyboard-effects-slider {
                box-shadow: 0 0 1px var(--accent-primary, #7c3aed);
            }
            
            input:checked + .keyboard-effects-slider:before {
                transform: translateX(24px);
            }
            
            .keyboard-effects-settings {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 1.5rem;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .keyboard-effects-section {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .keyboard-effects-section-title {
                font-size: 1rem;
                font-weight: 600;
                margin: 0;
                color: var(--text-secondary, #8b949e);
            }
            
            .keyboard-effects-select {
                padding: 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .keyboard-effects-slider-container {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .keyboard-effects-slider-label {
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .keyboard-effects-slider-value {
                font-size: 0.875rem;
                color: var(--text-primary, #f0f6fc);
                margin-left: 0.5rem;
            }
            
            .keyboard-effects-range {
                width: 100%;
                height: 5px;
                -webkit-appearance: none;
                background: var(--bg-secondary, #161b22);
                border-radius: var(--radius-sm, 0.375rem);
                outline: none;
            }
            
            .keyboard-effects-range::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: var(--accent-primary, #7c3aed);
                cursor: pointer;
            }
            
            .keyboard-effects-range::-moz-range-thumb {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: var(--accent-primary, #7c3aed);
                cursor: pointer;
                border: none;
            }
            
            .keyboard-effects-checkbox-container {
                grid-column: span 2;
                margin-top: 0.5rem;
            }
            
            .keyboard-effects-checkbox-label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.875rem;
                cursor: pointer;
            }
            
            .keyboard-effects-checkbox {
                margin: 0;
            }
            
            .keyboard-effects-test-area {
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .keyboard-effects-test-title {
                font-size: 1rem;
                font-weight: 600;
                margin: 0 0 1rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .keyboard-effects-test-input {
                width: 100%;
                padding: 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            @media (max-width: 768px) {
                .keyboard-effects-settings {
                    grid-template-columns: 1fr;
                }
                
                .keyboard-effects-checkbox-container {
                    grid-column: 1;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KeyboardEffects };
} else {
    // Add to global scope for browser usage
    window.KeyboardEffects = KeyboardEffects;
}
/**
 * Enhanced Holographic UI Components for JAAT-AI
 * Extends the existing holographic functionality with more advanced effects
 */

/**
 * Initialize enhanced holographic UI elements
 */
function initEnhancedHolographicUI() {
    console.log('Initializing enhanced holographic UI...');
    
    // Create background effects
    createFloatingParticles();
    createDataStreams();
    
    // Add holographic effects to cards
    addHolographicEffectsToCards();
    
    // Add interactive effects to elements
    addInteractiveEffectsToElements();
    
    // Setup glitch effects
    setupGlitchEffects();
    
    // Setup responsive effects
    setupResponsiveEffects();
    
    // Start scanning effect on mode cards
    startScanning();
    
    // Initialize holographic elements with reflections
    initHolographicEffects();
    
    console.log('Enhanced holographic UI initialized successfully');
}

/**
 * Add holographic card effects to elements
 */
function addHolographicEffectsToCards() {
    const cards = document.querySelectorAll('.stats-card, .mode-card');
    
    cards.forEach(card => {
        // Add glow effect on hover
        card.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            this.style.boxShadow = `
                0 10px 25px rgba(0, 0, 0, 0.2),
                0 0 15px rgba(123, 53, 231, 0.3),
                0 0 30px rgba(123, 53, 231, 0.2)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
        
        // Add dynamic reflection effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * Create floating particles in the background
 */
function createFloatingParticles() {
    const container = document.querySelector('.floating-particles');
    if (!container) return;
    
    // Clear any existing particles
    container.innerHTML = '';
    
    // Create particles
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

/**
 * Create a single floating particle
 * @param {HTMLElement} container - The container to add the particle to
 */
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random color
    const colors = [
        'rgba(123, 53, 231, 0.7)',
        'rgba(61, 106, 242, 0.7)',
        'rgba(16, 202, 231, 0.7)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Random animation duration between 20s and 40s
    const duration = Math.random() * 20 + 20;
    
    // Random delay
    const delay = Math.random() * 10;
    
    // Set particle styles
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        top: ${posY}%;
        left: ${posX}%;
        opacity: ${Math.random() * 0.5 + 0.3};
        filter: blur(1px);
        box-shadow: 0 0 ${size * 2}px ${color};
        animation: float ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

/**
 * Create animated data streams for a cyberpunk effect
 */
function createDataStreams() {
    const container = document.querySelector('.data-streams');
    if (!container) return;
    
    // Clear any existing streams
    container.innerHTML = '';
    
    // Create CSS styles for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dataStream {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Create streams
    const streamCount = window.innerWidth < 768 ? 10 : 20;
    
    for (let i = 0; i < streamCount; i++) {
        const stream = document.createElement('div');
        
        // Random position and properties
        const posX = Math.random() * 100;
        const length = Math.random() * 100 + 100;
        const width = Math.random() * 1 + 1;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 10;
        const opacity = Math.random() * 0.4 + 0.1;
        
        // Random color
        const colors = [
            'rgba(123, 53, 231, 0.7)',
            'rgba(61, 106, 242, 0.7)',
            'rgba(16, 202, 231, 0.7)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set stream styles
        stream.style.cssText = `
            position: absolute;
            width: ${width}px;
            height: ${length}px;
            background: linear-gradient(to bottom, transparent, ${color}, transparent);
            left: ${posX}%;
            top: 0;
            opacity: ${opacity};
            animation: dataStream ${duration}s linear ${delay}s infinite;
            pointer-events: none;
        `;
        
        container.appendChild(stream);
    }
}

/**
 * Add interactive effects to all interactive elements
 */
function addInteractiveEffectsToElements() {
    const buttons = document.querySelectorAll('button:not(.action-btn):not(.select-mode-btn):not(.filter-btn)');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(123, 53, 231, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add pulse effect to AI chat messages
    const aiMessages = document.querySelectorAll('.ai-message');
    aiMessages.forEach(message => {
        message.addEventListener('mouseenter', function() {
            this.style.borderLeft = '2px solid rgba(123, 53, 231, 1)';
            this.style.boxShadow = '0 0 15px rgba(123, 53, 231, 0.1)';
        });
        
        message.addEventListener('mouseleave', function() {
            this.style.borderLeft = '2px solid var(--primary)';
            this.style.boxShadow = '';
        });
    });
}

/**
 * Setup random glitch effects for a futuristic feel
 */
function setupGlitchEffects() {
    // Create glitch overlay
    const overlay = document.createElement('div');
    overlay.className = 'glitch-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.1s ease;
    `;
    document.body.appendChild(overlay);
    
    // Trigger glitch effects at random intervals
    setInterval(() => {
        if (Math.random() > 0.9) { // 10% chance to trigger
            triggerGlitchEffect(overlay);
        }
    }, 5000);
}

/**
 * Trigger a glitch visual effect
 * @param {HTMLElement} overlay - The overlay element for glitch effects
 */
function triggerGlitchEffect(overlay) {
    // Choose a random glitch effect
    const effectType = Math.floor(Math.random() * 3);
    
    switch (effectType) {
        case 0: // RGB split
            overlay.style.boxShadow = 'inset 0 0 0 1px rgba(255, 0, 0, 0.2), inset 0 0 0 3px rgba(0, 255, 0, 0.2), inset 0 0 0 5px rgba(0, 0, 255, 0.2)';
            overlay.style.opacity = '0.7';
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                overlay.style.boxShadow = 'none';
            }, 150);
            break;
            
        case 1: // Horizontal shift
            overlay.style.transform = 'translateX(10px)';
            overlay.style.opacity = '0.5';
            overlay.style.backdropFilter = 'blur(2px)';
            
            setTimeout(() => {
                overlay.style.transform = 'translateX(-5px)';
                
                setTimeout(() => {
                    overlay.style.transform = '';
                    overlay.style.opacity = '0';
                    overlay.style.backdropFilter = '';
                }, 50);
            }, 50);
            break;
            
        case 2: // Noise glitch
            overlay.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFoSURBVGhD7ZixCsIwFEXzr/2AgqtfIW7iB+gk6CYuXQXBRRzETRQEcejSD+hmO1W8l7wHaV7SpqHtcA9c0uTldZfQJtCGUChRqWCCiO9SlhsZjcfYbre4XC64H2uz2aDT6YjZ3JyfH7PZDEmSiNk4U0S32+XnfD7HdDrFYrEQO/VZLpdoNBri22dqkVarJUY+DP1OXQrx3klVQshkkO/3e1wuF677/c5d93FQr9f5PhiMFvA8D4vFgtvBPc0wn8+TyWQcTSOslg2v1wvH45G7UPRut+OOvJ9wB7rd7t9e8Vu+eRSiLDdSj+z5LJUOlUpHpdJRqXRUKh2VSkel0vEvpVmWic+yxJIajUY8UFxLiI9c+/1eDBXnzxHf97kTPNztdlwul3MnvOFw+JGgXq+L0XxiiQyHQ+52ux1Pp5OYKcZ6g5qmKXe8JIoi3g8GgxjdblfsvIe/qNR/tFgsxFf5wmDwBgbV+TxmD+5fAAAAAElFTkSuQmCC')";
            overlay.style.opacity = '0.3';
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                overlay.style.backgroundImage = 'none';
            }, 100);
            break;
    }
}

/**
 * Setup responsive effects based on device size
 */
function setupResponsiveEffects() {
    // Initial check
    checkResponsiveEffects();
    
    // Listen for window resize
    window.addEventListener('resize', checkResponsiveEffects);
}

/**
 * Check and apply responsive effects based on window size
 */
function checkResponsiveEffects() {
    const width = window.innerWidth;
    const particleContainer = document.querySelector('.floating-particles');
    const streamContainer = document.querySelector('.data-streams');
    
    if (width < 768) { // Mobile
        if (particleContainer) {
            particleContainer.style.opacity = '0.5'; // Reduce particles on mobile
        }
        if (streamContainer) {
            streamContainer.style.opacity = '0.1'; // Reduce streams on mobile
        }
        
        // Reduce animations on cards for performance
        document.querySelectorAll('.stats-card, .mode-card').forEach(card => {
            card.style.transition = 'transform 0.3s ease';
        });
    } else {
        if (particleContainer) {
            particleContainer.style.opacity = '1';
        }
        if (streamContainer) {
            streamContainer.style.opacity = '0.2';
        }
    }
}

/**
 * Start scanning effect animation on AI mode cards
 */
function startScanning() {
    const modeCards = document.querySelectorAll('.mode-card');
    
    modeCards.forEach(card => {
        // Create scan line effect
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(to right, 
                transparent, 
                rgba(123, 53, 231, 0.8), 
                transparent);
            opacity: 0;
            pointer-events: none;
            z-index: 2;
        `;
        
        // Ensure card has relative positioning
        if (getComputedStyle(card).position === 'static') {
            card.style.position = 'relative';
        }
        
        card.appendChild(scanLine);
        
        // Start scan animation randomly
        setTimeout(() => {
            startScanAnimation(scanLine);
        }, Math.random() * 5000);
    });
}

/**
 * Start scan animation on an element
 * @param {HTMLElement} element - The scan line element
 */
function startScanAnimation(element) {
    // Set initial position
    element.style.opacity = '1';
    element.style.top = '0';
    
    // Animate from top to bottom
    const duration = 2000;
    const startTime = performance.now();
    
    function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.top = `${progress * 100}%`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animation complete
            element.style.opacity = '0';
            
            // Restart after random delay
            setTimeout(() => {
                startScanAnimation(element);
            }, Math.random() * 10000 + 3000);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Initialize holographic effects from hologram ui
 */
function initHolographicEffects() {
    // Add message pulse keyframes
    addMessagePulseKeyframes();
    
    // Apply holographic effect to each element that needs it
    document.querySelectorAll('.stats-card, .mode-card, .message, .user-profile').forEach(element => {
        applyHolographicEffect(element);
    });
    
    // Initialize message hover effects
    initMessageEffects();
}

/**
 * Add message pulse keyframes to the document if not already present
 */
function addMessagePulseKeyframes() {
    // Check if already added
    if (document.querySelector('#holographic-keyframes')) return;
    
    const style = document.createElement('style');
    style.id = 'holographic-keyframes';
    style.textContent = `
        @keyframes messagePulse {
            0% { box-shadow: 0 0 0 0 rgba(123, 53, 231, 0.2); }
            70% { box-shadow: 0 0 0 10px rgba(123, 53, 231, 0); }
            100% { box-shadow: 0 0 0 0 rgba(123, 53, 231, 0); }
        }
        
        @keyframes holographicShine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Apply holographic effect to an element
 * @param {HTMLElement} element - The element to apply effect to
 */
function applyHolographicEffect(element) {
    // Set position to relative if not already
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    
    // Add holographic outline
    element.style.boxShadow = `
        0 0 1px rgba(255, 255, 255, 0.2),
        0 0 3px rgba(123, 53, 231, 0.1),
        inset 0 0 15px rgba(0, 0, 0, 0.1)
    `;
    
    // Add shiny edges
    const shine = document.createElement('div');
    shine.className = 'holographic-shine';
    shine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0) 0%, 
            rgba(255, 255, 255, 0.05) 50%, 
            rgba(255, 255, 255, 0) 100%);
        background-size: 200% 200%;
        pointer-events: none;
        animation: holographicShine 5s ease infinite;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    element.appendChild(shine);
    
    // Show shine on hover
    element.addEventListener('mouseenter', () => {
        shine.style.opacity = '1';
    });
    
    element.addEventListener('mouseleave', () => {
        shine.style.opacity = '0';
    });
}

/**
 * Initialize message hover effects
 */
function initMessageEffects() {
    const messages = document.querySelectorAll('.message');
    
    messages.forEach(message => {
        message.addEventListener('mouseenter', function() {
            this.style.animation = 'messagePulse 2s infinite';
        });
        
        message.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

/**
 * Initialize holographic cards with interactive effects
 */
function initHolographicCards() {
    const cards = document.querySelectorAll('.stats-card, .mode-card');
    
    cards.forEach(card => {
        // Create dynamic particles for the cards
        createDynamicParticles(card);
    });
}

/**
 * Create dynamic particles for hologram
 * @param {HTMLElement} container - The container to add particles to
 */
function createDynamicParticles(container) {
    const particleCount = 5;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'card-particle';
        
        // Set random initial position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Set particle styles
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background-color: rgba(123, 53, 231, 0.5);
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            opacity: 0;
            filter: blur(1px);
            box-shadow: 0 0 10px rgba(123, 53, 231, 0.8);
            pointer-events: none;
            transition: opacity 0.5s ease;
        `;
        
        container.appendChild(particle);
    }
    
    // Show particles on hover
    container.addEventListener('mouseenter', () => {
        const particles = container.querySelectorAll('.card-particle');
        particles.forEach(particle => {
            particle.style.opacity = '1';
            
            // Animate to a new position
            const newPosX = Math.random() * 100;
            const newPosY = Math.random() * 100;
            
            particle.style.left = `${newPosX}%`;
            particle.style.top = `${newPosY}%`;
            particle.style.transition = 'left 3s ease, top 3s ease, opacity 0.5s ease';
        });
    });
    
    // Hide particles on mouse leave
    container.addEventListener('mouseleave', () => {
        const particles = container.querySelectorAll('.card-particle');
        particles.forEach(particle => {
            particle.style.opacity = '0';
        });
    });
}

// Export functions if needed in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initEnhancedHolographicUI,
        applyHolographicEffect
    };
}
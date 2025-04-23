/**
 * JAAT-AI Advanced Background Effects
 * Handles all cosmic background and holographic animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize cosmic background
    initCosmicBackground();
    
    // Initialize particle system
    initParticleSystem();
    
    // Initialize holographic interfaces
    initHolographicInterfaces();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize shooting stars
    initShootingStars();
});

/**
 * Initialize cosmic background with stars and nebula
 */
function initCosmicBackground() {
    // Create stars container if it doesn't exist
    if (!document.querySelector('.stars-container')) {
        const starsContainer = document.createElement('div');
        starsContainer.classList.add('stars-container');
        document.body.prepend(starsContainer);
        
        // Create stars with different sizes
        createStars(starsContainer);
    }
    
    // Add depth to nebula elements
    const nebulas = document.querySelectorAll('.nebula');
    nebulas.forEach((nebula, index) => {
        // Set random depth for parallax effect
        nebula.setAttribute('data-depth', (0.05 + index * 0.02).toString());
    });
}

/**
 * Create stars with different sizes and animations
 */
function createStars(container) {
    // Create small stars (more numerous)
    for (let i = 0; i < 150; i++) {
        createStar(container, 'size-1', 0.6);
    }
    
    // Create medium stars
    for (let i = 0; i < 50; i++) {
        createStar(container, 'size-2', 0.8);
    }
    
    // Create large stars (fewer)
    for (let i = 0; i < 25; i++) {
        createStar(container, 'size-3', 1);
    }
}

/**
 * Create a single star with animation
 */
function createStar(container, sizeClass, maxOpacity) {
    const star = document.createElement('div');
    star.classList.add('star', sizeClass);
    
    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration and delay
    const duration = 2 + Math.random() * 4;
    const delay = Math.random() * 5;
    
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--delay', `${delay}s`);
    star.style.setProperty('--opacity', maxOpacity);
    
    container.appendChild(star);
}

/**
 * Initialize particle system for cosmic dust effect
 */
function initParticleSystem() {
    // Create particles container if it doesn't exist
    if (!document.querySelector('.particles-container')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles-container');
        document.body.appendChild(particlesContainer);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            createParticle(particlesContainer);
        }
    }
}

/**
 * Create a single animated particle
 */
function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random color class
    const colorClasses = ['blue', 'purple', 'pink'];
    const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];
    particle.classList.add(randomColor);
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation properties
    const duration = 15 + Math.random() * 30;
    const delay = Math.random() * 10;
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;
    
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--delay', `${delay}s`);
    particle.style.setProperty('--x', `${x}px`);
    particle.style.setProperty('--y', `${y}px`);
    
    container.appendChild(particle);
    
    // Remove and recreate particles periodically for performance
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, duration * 1000 + delay * 1000);
}

/**
 * Initialize holographic interface elements
 */
function initHolographicInterfaces() {
    // Add holographic grid effect if it doesn't exist
    if (!document.querySelector('.holographic-grid')) {
        const grid = document.createElement('div');
        grid.classList.add('holographic-grid');
        document.body.appendChild(grid);
    }
    
    // Add scan line effect if it doesn't exist
    if (!document.querySelector('.scan-line')) {
        const scanLine = document.createElement('div');
        scanLine.classList.add('scan-line');
        document.body.appendChild(scanLine);
    }
    
    // Initialize hologram containers
    initHologramElements();
    
    // Initialize demo holograms
    initDemoHolograms();
}

/**
 * Initialize hologram container elements
 */
function initHologramElements() {
    const hologramContainers = document.querySelectorAll('.hologram-container');
    
    hologramContainers.forEach(container => {
        if (!container.querySelector('.hologram')) {
            const hologram = document.createElement('div');
            hologram.classList.add('hologram');
            
            // Create rings
            for (let i = 0; i < 3; i++) {
                const ring = document.createElement('div');
                ring.classList.add('hologram-ring');
                hologram.appendChild(ring);
            }
            
            container.appendChild(hologram);
        }
    });
}

/**
 * Initialize demo hologram elements
 */
function initDemoHolograms() {
    const demoHolograms = document.querySelectorAll('.demo-hologram');
    
    demoHolograms.forEach(demo => {
        if (!demo.querySelector('.hologram-element')) {
            // Create central element
            const element = document.createElement('div');
            element.classList.add('hologram-element');
            
            // Create beam effect
            const beam = document.createElement('div');
            beam.classList.add('hologram-beam');
            
            demo.appendChild(beam);
            demo.appendChild(element);
        }
    });
}

/**
 * Initialize parallax effects for background elements
 */
function initParallaxEffects() {
    // Add data-depth attributes if not present
    const parallaxElements = document.querySelectorAll('.nebula, .holographic-grid');
    
    parallaxElements.forEach((element, index) => {
        if (!element.getAttribute('data-depth')) {
            element.setAttribute('data-depth', (0.05 + index * 0.02).toString());
        }
    });
    
    // Add mousemove event listener for parallax effect
    document.addEventListener('mousemove', handleParallax);
}

/**
 * Handle parallax effect based on mouse position
 */
function handleParallax(e) {
    const parallaxElements = document.querySelectorAll('[data-depth]');
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    parallaxElements.forEach(element => {
        const depth = parseFloat(element.getAttribute('data-depth'));
        const moveX = (mouseX - 0.5) * depth * 100;
        const moveY = (mouseY - 0.5) * depth * 100;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

/**
 * Initialize shooting stars animation
 */
function initShootingStars() {
    const starsContainer = document.querySelector('.stars-container');
    
    if (starsContainer) {
        // Create initial shooting stars
        for (let i = 0; i < 3; i++) {
            createShootingStar(starsContainer);
        }
        
        // Periodically create new shooting stars
        setInterval(() => {
            createShootingStar(starsContainer);
        }, 8000);
    }
}

/**
 * Create a shooting star animation
 */
function createShootingStar(container) {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    
    // Random position and angle
    const top = Math.random() * 50; // Top half of the screen
    const left = Math.random() * 100;
    const angle = 35 + Math.random() * 55; // Angle between 35-90 degrees
    const distance = 150 + Math.random() * 250;
    
    // Set CSS variables for animation
    shootingStar.style.setProperty('--top', `${top}%`);
    shootingStar.style.setProperty('--left', `${left}%`);
    shootingStar.style.setProperty('--angle', `${angle}deg`);
    shootingStar.style.setProperty('--distance', `${distance}px`);
    
    // Random delay
    const delay = Math.random() * 8;
    shootingStar.style.setProperty('--delay', `${delay}s`);
    
    container.appendChild(shootingStar);
    
    // Remove after animation completes
    setTimeout(() => {
        shootingStar.remove();
    }, (delay + 3) * 1000); // 3s is the animation duration
}

/**
 * Add observer to animate elements when they enter the viewport
 */
function addScrollObserver() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}
/**
 * JAAT-AI Application
 * Main JavaScript file handling UI interactions, animations, and API integration
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize FastSpring integration
    initFastSpring();
    
    // Initialize Navigation
    initNavigation();
    
    // Initialize animation elements
    initAnimations();
    
    // Initialize holographic elements
    initHolographicEffects();
    
    // Initialize form validations
    initForms();
    
    // Set theme variables
    setThemeVariables();
});

// ====== FastSpring Integration ======

/**
 * Initialize FastSpring for subscription management
 */
function initFastSpring() {
    // Check if we're on a subscription/pricing page
    const isPricingPage = window.location.pathname.includes('premium');
    
    if (isPricingPage) {
        // Load FastSpring library
        loadFastSpringLibrary();
        
        // Setup pricing toggle
        const planToggle = document.getElementById('plan-toggle');
        if (planToggle) {
            planToggle.addEventListener('change', updatePricing);
        }
        
        // Setup subscribe buttons
        setupSubscribeButtons();
    }
}

/**
 * Load the FastSpring library dynamically
 */
function loadFastSpringLibrary() {
    // Create script tag
    const script = document.createElement('script');
    script.src = 'https://d1f8f9xcsvx3ha.cloudfront.net/popupbridge/popupbridge.js';
    script.id = 'fsc-api';
    script.type = 'text/javascript';
    script.setAttribute('data-continuous', 'true');
    script.setAttribute('data-storefront', 'jaat-ai.test.onfastspring.com/popup-jaat-ai');
    
    // Append to document head
    document.head.appendChild(script);
    
    // Initialize FastSpring when loaded
    script.onload = function() {
        if (typeof fastspring !== 'undefined') {
            // FastSpring library is loaded
            console.log('FastSpring library loaded');
            
            // Decorate the buttons after library loads
            fastspring.builder.decorate();
        }
    };
}

/**
 * Set up subscription buttons with FastSpring integration
 */
function setupSubscribeButtons() {
    const subscribeButtons = document.querySelectorAll('.subscribe-button');
    
    subscribeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product path from data attribute
            const product = this.getAttribute('data-product');
            
            if (product && typeof fastspring !== 'undefined') {
                // Open FastSpring popup with the product
                fastspring.builder.push({
                    'products': [
                        {
                            'path': product
                        }
                    ]
                });
                fastspring.builder.checkout();
            } else {
                console.error('FastSpring not loaded or product not specified');
            }
        });
    });
}

/**
 * Update pricing based on billing cycle toggle (monthly/annual)
 */
function updatePricing() {
    const isAnnual = document.getElementById('plan-toggle').checked;
    const priceElements = document.querySelectorAll('.price-amount');
    const savingElements = document.querySelectorAll('.annual-saving');
    
    priceElements.forEach(element => {
        const monthlyPrice = element.getAttribute('data-monthly');
        const annualPrice = element.getAttribute('data-annual');
        
        element.textContent = isAnnual ? annualPrice : monthlyPrice;
    });
    
    // Toggle visibility of saving badges
    savingElements.forEach(element => {
        element.style.display = isAnnual ? 'block' : 'none';
    });
    
    // Update billing period text
    const periodTexts = document.querySelectorAll('.billing-period');
    periodTexts.forEach(text => {
        text.textContent = isAnnual ? 'per year' : 'per month';
    });
}

// ====== Navigation ======

/**
 * Initialize navigation elements and interactions
 */
function initNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sideNav = document.querySelector('.side-nav');
    const overlay = document.querySelector('.overlay');
    const closeNav = document.querySelector('.side-nav-close');
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            sideNav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close navigation
    if (closeNav) {
        closeNav.addEventListener('click', closeNavigation);
    }
    
    // Overlay click to close
    if (overlay) {
        overlay.addEventListener('click', closeNavigation);
    }
    
    // Smooth scroll for navigation links
    initSmoothScroll();
    
    // Set active links based on current page
    setActiveNavLinks();
}

/**
 * Close mobile navigation
 */
function closeNavigation() {
    const sideNav = document.querySelector('.side-nav');
    const overlay = document.querySelector('.overlay');
    
    if (sideNav) sideNav.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile navigation if open
                closeNavigation();
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Set active state on navigation links based on current page
 */
function setActiveNavLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a, .side-nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if the link path is in the current path
        if (currentPath.includes(linkPath) && linkPath !== '/' && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if ((currentPath === '/' || currentPath.includes('index.html')) && 
                  (linkPath === '/' || linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ====== Animations ======

/**
 * Initialize animations for all animated elements
 */
function initAnimations() {
    // Initialize fade-in animations on scroll
    initScrollAnimations();
    
    // Initialize particle animations
    initParticles();
    
    // Initialize counter animations
    initCounters();
    
    // Initialize typing animations
    initTypingAnimation();
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right');
    
    // Initial check for elements already in viewport
    checkElementsInViewport(animatedElements);
    
    // Check on scroll
    window.addEventListener('scroll', () => {
        checkElementsInViewport(animatedElements);
    });
}

/**
 * Check if elements are in viewport and trigger animations
 */
function checkElementsInViewport(elements) {
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (position.top < windowHeight * 0.9) {
            element.style.animationPlayState = 'running';
        }
    });
}

/**
 * Initialize particle animations
 */
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    
    if (particlesContainer) {
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
    
    // Randomly assign color class
    const colorClasses = ['blue', 'purple', 'pink'];
    const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
    particle.classList.add(randomColorClass);
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    // Random animation properties
    const duration = 15 + Math.random() * 20;
    const delay = Math.random() * 5;
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    const opacity = 0.2 + Math.random() * 0.5;
    
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--delay', `${delay}s`);
    particle.style.setProperty('--x', `${x}px`);
    particle.style.setProperty('--y', `${y}px`);
    particle.style.setProperty('--opacity', opacity);
    
    container.appendChild(particle);
}

/**
 * Initialize number counter animations
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        // Observer to start the counter when in viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let count = 0;
                    const updateCount = () => {
                        const increment = target / 100;
                        if (count < target) {
                            count += increment;
                            counter.textContent = Math.ceil(count);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

/**
 * Initialize typing animation for elements with .typing class
 */
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start typing animation
                    let charIndex = 0;
                    const typeChar = () => {
                        if (charIndex < text.length) {
                            element.textContent += text.charAt(charIndex);
                            element.style.width = `${(charIndex + 1) / text.length * 100}%`;
                            charIndex++;
                            setTimeout(typeChar, 100);
                        }
                    };
                    typeChar();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// ====== Holographic Effects ======

/**
 * Initialize holographic UI elements and effects
 */
function initHolographicEffects() {
    // Create star field background
    createStarField();
    
    // Initialize hologram elements
    initHologramContainers();
    
    // Initialize holographic cards with hover effects
    initHolographicCards();
    
    // Initialize 3D parallax effects
    init3DParallax();
}

/**
 * Create star field background with animated stars
 */
function createStarField() {
    const starsContainer = document.querySelector('.stars-container');
    
    if (!starsContainer) {
        // Create stars container if it doesn't exist
        const container = document.createElement('div');
        container.classList.add('stars-container');
        document.body.prepend(container);
        
        // Create stars
        for (let i = 0; i < 150; i++) {
            createStar(container);
        }
        
        // Create shooting stars
        for (let i = 0; i < 5; i++) {
            createShootingStar(container);
        }
    }
}

/**
 * Create a single animated star
 */
function createStar(container) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Random size class
    const sizeClasses = ['size-1', 'size-2', 'size-3'];
    const weights = [0.6, 0.3, 0.1]; // More small stars than large ones
    
    let randomNum = Math.random();
    let sizeIndex = 0;
    let cumulativeWeight = 0;
    
    for (let i = 0; i < weights.length; i++) {
        cumulativeWeight += weights[i];
        if (randomNum <= cumulativeWeight) {
            sizeIndex = i;
            break;
        }
    }
    
    star.classList.add(sizeClasses[sizeIndex]);
    
    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Random animation properties
    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * 5;
    const opacity = 0.5 + Math.random() * 0.5;
    
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--delay', `${delay}s`);
    star.style.setProperty('--opacity', opacity);
    
    container.appendChild(star);
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
    const angle = 45 + Math.random() * 45; // Angle between 45-90 degrees
    const distance = 100 + Math.random() * 200;
    
    shootingStar.style.setProperty('--top', `${top}%`);
    shootingStar.style.setProperty('--left', `${left}%`);
    shootingStar.style.setProperty('--angle', `${angle}deg`);
    shootingStar.style.setProperty('--distance', `${distance}px`);
    
    // Random animation delay
    const delay = 5 + Math.random() * 15;
    shootingStar.style.setProperty('--delay', `${delay}s`);
    
    container.appendChild(shootingStar);
}

/**
 * Initialize hologram container elements
 */
function initHologramContainers() {
    const hologramContainers = document.querySelectorAll('.hologram-container');
    
    hologramContainers.forEach(container => {
        // Create hologram element if it doesn't exist
        if (!container.querySelector('.hologram')) {
            const hologram = document.createElement('div');
            hologram.classList.add('hologram');
            
            // Create hologram rings
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
 * Initialize holographic cards with interactive effects
 */
function initHolographicCards() {
    const cards = document.querySelectorAll('.feature-card, .category-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            // Calculate mouse position relative to card
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply 3D rotation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Apply highlight effect
            const percentX = x / rect.width * 100;
            const percentY = y / rect.height * 100;
            card.style.backgroundImage = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset styling on mouse leave
            card.style.transform = '';
            card.style.backgroundImage = '';
        });
    });
}

/**
 * Initialize 3D parallax effects for background elements
 */
function init3DParallax() {
    const parallaxItems = document.querySelectorAll('.nebula');
    
    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxItems.forEach(item => {
            const depth = parseFloat(item.getAttribute('data-depth') || 0.05);
            const moveX = (mouseX - 0.5) * depth * 100;
            const moveY = (mouseY - 0.5) * depth * 100;
            
            item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// ====== Forms ======

/**
 * Initialize form validations and interactions
 */
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form inputs
            if (validateForm(this)) {
                // Determine form type and handle appropriately
                if (this.classList.contains('login-form')) {
                    await handleLogin(this);
                } else if (this.classList.contains('signup-form')) {
                    await handleSignup(this);
                } else if (this.classList.contains('contact-form')) {
                    await handleContactForm(this);
                } else {
                    // Generic form submission
                    showSuccess('Form submitted successfully!');
                    this.reset();
                }
            }
        });
    });
    
    // Add validation on input change
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
}

/**
 * Validate all form inputs
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate a single form input
 */
function validateInput(input) {
    // Skip validation for optional fields
    if (!input.required && input.value === '') {
        removeError(input);
        return true;
    }
    
    // Check for different validation types
    let isValid = true;
    let errorMessage = '';
    
    if (input.value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (input.type === 'password' && input.minLength > 0 && input.value.length < input.minLength) {
        isValid = false;
        errorMessage = `Password must be at least ${input.minLength} characters`;
    } else if (input.id === 'password-confirm') {
        const password = document.getElementById('password');
        if (password && input.value !== password.value) {
            isValid = false;
            errorMessage = 'Passwords do not match';
        }
    }
    
    // Show or remove error
    if (isValid) {
        removeError(input);
    } else {
        showError(input, errorMessage);
    }
    
    return isValid;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show error message for an input
 */
function showError(input, message) {
    removeError(input);
    
    // Add error class to input
    input.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    
    // Insert error after input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

/**
 * Remove error message from an input
 */
function removeError(input) {
    input.classList.remove('error');
    
    // Remove any existing error message
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Handle login form submission
 */
async function handleLogin(form) {
    showLoading(form);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response for demo
    showSuccess('Login successful! Redirecting...');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

/**
 * Handle signup form submission
 */
async function handleSignup(form) {
    showLoading(form);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response for demo
    showSuccess('Account created successfully! Redirecting...');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

/**
 * Handle contact form submission
 */
async function handleContactForm(form) {
    showLoading(form);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response for demo
    showSuccess('Your message has been sent! We will get back to you soon.');
    form.reset();
    
    hideLoading(form);
}

/**
 * Show loading state on form
 */
function showLoading(form) {
    // Disable submit button
    const submitButton = form.querySelector('[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }
}

/**
 * Hide loading state on form
 */
function hideLoading(form) {
    // Re-enable submit button
    const submitButton = form.querySelector('[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = submitButton.getAttribute('data-original-text') || 'Submit';
    }
}

/**
 * Show success message
 */
function showSuccess(message) {
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.classList.add('toast', 'toast-success');
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas fa-check-circle"></i></div>
        <div class="toast-content">${message}</div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    document.querySelector('.toast-container').appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        dismissToast(toast);
    }, 5000);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        dismissToast(toast);
    });
}

/**
 * Show error toast message
 */
function showError(message) {
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.classList.add('toast', 'toast-error');
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas fa-exclamation-circle"></i></div>
        <div class="toast-content">${message}</div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    document.querySelector('.toast-container').appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        dismissToast(toast);
    }, 5000);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        dismissToast(toast);
    });
}

/**
 * Dismiss a toast notification
 */
function dismissToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
        toast.remove();
    }, 300);
}

// ====== Theme ======

/**
 * Set CSS variables for theme customization
 */
function setThemeVariables() {
    const root = document.documentElement;
    
    // Primary colors
    root.style.setProperty('--primary-color', '#6366F1');
    root.style.setProperty('--secondary-color', '#8B5CF6');
    root.style.setProperty('--accent-color', '#EC4899');
    
    // Text colors
    root.style.setProperty('--text-primary', 'rgba(255, 255, 255, 0.95)');
    root.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.7)');
    
    // Background colors
    root.style.setProperty('--background', '#0c0e1b');
    root.style.setProperty('--card-bg', 'rgba(13, 16, 33, 0.7)');
    root.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.05)');
    
    // UI elements
    root.style.setProperty('--button-primary', 'linear-gradient(135deg, #6366F1, #8B5CF6)');
    root.style.setProperty('--primary-glow', 'rgba(99, 102, 241, 0.3)');
    root.style.setProperty('--border-radius', '10px');
    
    // Add more variables as needed
}
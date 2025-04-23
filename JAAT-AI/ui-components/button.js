/**
 * JAAT-AI Button Component JavaScript
 * Handles button interactions and effects
 */

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeButtons();
});

/**
 * Initialize all button functionality
 */
function initializeButtons() {
    // Set up ripple effect for buttons
    setupRippleEffect();
    
    // Set up button demonstrations
    setupButtonDemos();
    
    console.log('JAAT-AI Button components initialized');
}

/**
 * Set up ripple effect for buttons
 */
function setupRippleEffect() {
    const buttons = document.querySelectorAll('.jaat-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Skip if button is disabled
            if (button.disabled || button.classList.contains('jaat-button-loading')) {
                return;
            }
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Get button dimensions
            const rect = button.getBoundingClientRect();
            
            // Calculate ripple size (should be larger of width and height)
            const size = Math.max(rect.width, rect.height);
            
            // Calculate ripple position relative to button
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Set ripple style
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Add ripple to button
            button.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600); // Match animation duration
        });
    });
}

/**
 * Set up button demo functionality
 */
function setupButtonDemos() {
    // Example: Toggle loading state on loading button
    const loadingButton = document.querySelector('.jaat-button-loading');
    if (loadingButton) {
        let isLoading = true;
        
        // Toggle loading state every 3 seconds for demonstration
        setInterval(() => {
            if (isLoading) {
                loadingButton.innerHTML = 'Loaded';
                loadingButton.classList.remove('jaat-button-loading');
            } else {
                loadingButton.innerHTML = '<span class="jaat-button-loader"></span><span>Loading...</span>';
                loadingButton.classList.add('jaat-button-loading');
            }
            isLoading = !isLoading;
        }, 3000);
    }
}

/**
 * Create a button programmatically
 * 
 * @param {string} text - Button text content
 * @param {string} variant - Button variant ('default', 'secondary', 'outline', 'ghost')
 * @param {string} size - Button size ('default', 'sm', 'lg')
 * @param {Function} onClick - Click event handler
 * @returns {HTMLButtonElement} - The created button element
 */
function createButton(text, variant = 'default', size = 'default', onClick = null) {
    const button = document.createElement('button');
    button.classList.add('jaat-button');
    button.textContent = text;
    
    // Add variant class if not default
    if (variant !== 'default') {
        button.classList.add(`jaat-button-${variant}`);
    }
    
    // Add size class if not default
    if (size !== 'default') {
        button.classList.add(`jaat-button-${size}`);
    }
    
    // Add click handler if provided
    if (onClick && typeof onClick === 'function') {
        button.addEventListener('click', onClick);
    }
    
    return button;
}

// Export functions for external use
window.jaatUI = window.jaatUI || {};
window.jaatUI.button = {
    create: createButton
};
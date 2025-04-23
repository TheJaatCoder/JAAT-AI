/**
 * Holographic components and effects for JAAT-AI platform
 */

// Initialize holographic elements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initHolographicDevice();
});

/**
 * Initialize holographic device with dynamic elements
 */
function initHolographicDevice() {
    // Get device frame element
    const deviceFrame = document.querySelector('.device-frame');
    if (!deviceFrame) return;
    
    // Create and add holographic circles
    createHolographicCircles(deviceFrame);
    
    // Animate holographic elements
    animateHolographicElements();
}

/**
 * Create holographic circles inside the device frame
 * @param {HTMLElement} container - The container to add circles to
 */
function createHolographicCircles(container) {
    // Create outer circle
    const outerCircle = document.createElement('div');
    outerCircle.className = 'holo-circle';
    outerCircle.style.width = '220px';
    outerCircle.style.height = '220px';
    outerCircle.style.top = '50%';
    outerCircle.style.left = '50%';
    outerCircle.style.transform = 'translate(-50%, -50%)';
    container.appendChild(outerCircle);
    
    // Create middle circle
    const middleCircle = document.createElement('div');
    middleCircle.className = 'holo-circle';
    middleCircle.style.width = '180px';
    middleCircle.style.height = '180px';
    middleCircle.style.top = '50%';
    middleCircle.style.left = '50%';
    middleCircle.style.transform = 'translate(-50%, -50%)';
    container.appendChild(middleCircle);
    
    // Create inner circle (outline for orb)
    const innerCircle = document.createElement('div');
    innerCircle.className = 'holo-circle';
    innerCircle.style.width = '140px';
    innerCircle.style.height = '140px';
    innerCircle.style.top = '50%';
    innerCircle.style.left = '50%';
    innerCircle.style.transform = 'translate(-50%, -50%)';
    innerCircle.style.borderColor = 'rgba(74, 123, 255, 0.5)';
    container.appendChild(innerCircle);
}

/**
 * Animate holographic elements with subtle movements
 */
function animateHolographicElements() {
    const orbCore = document.querySelector('.orb-core');
    if (orbCore) {
        orbCore.style.animation = 'float 6s ease-in-out infinite';
    }
    
    // Animate rings with variable speeds
    const rings = document.querySelectorAll('.holo-ring');
    rings.forEach((ring, index) => {
        ring.style.animationDuration = `${20 + (index * 5)}s`;
        if (index % 2 === 1) {
            ring.style.animationDirection = 'reverse';
        }
    });
}

/**
 * Add interactive effects to holographic elements
 * @param {HTMLElement} element - The element to add effects to
 */
function addInteractiveEffects(element) {
    element.addEventListener('mousemove', function(e) {
        // Calculate mouse position relative to element center
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate rotation based on mouse position
        const rotateX = mouseY * -0.05;
        const rotateY = mouseX * 0.05;
        
        // Apply rotation and slight movement
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    element.addEventListener('mouseleave', function() {
        // Reset transform on mouse leave
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}
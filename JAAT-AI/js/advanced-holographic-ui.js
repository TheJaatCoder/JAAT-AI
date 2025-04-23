/**
 * Advanced Holographic UI Elements for JAAT-AI
 * Creates sophisticated holographic interface elements with 3D effects and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeAdvancedHolographicUI();
});

/**
 * Initialize all advanced holographic UI components
 */
function initializeAdvancedHolographicUI() {
    // Create holographic ambient background elements
    createHolographicAmbience();
    
    // Add dynamic 3D tilt effects to cards
    enhance3DCards();
    
    // Create holographic data visualization elements
    createHolographicDataVisualizers();
    
    // Add interactive circuit patterns to UI elements
    addCircuitPatterns();
    
    // Add dynamic highlight effects to navigation
    enhanceNavigationElements();
    
    // Create holographic focus rings
    createFocusRings();
    
    // Add quantum particle effects
    addQuantumParticleEffects();
    
    // Initialize audio feedback for holographic elements
    initializeAudioFeedback();
    
    // Add custom cursor with holographic trail
    createHolographicCursor();
    
    // Add responsive behavior
    setupResponsiveHolographicUI();
}

/**
 * Create holographic ambient elements that float in the background
 */
function createHolographicAmbience() {
    // Create container for ambient elements
    const ambienceContainer = document.createElement('div');
    ambienceContainer.className = 'holographic-ambience';
    ambienceContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(ambienceContainer);
    
    // Create floating geometric shapes
    const shapeCount = 6;
    const shapes = ['hexagon', 'triangle', 'circle', 'square', 'diamond', 'octagon'];
    
    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        
        // Calculate random properties
        const size = Math.random() * 80 + 40;  // 40-120px
        const posX = Math.random() * 100;      // 0-100%
        const posY = Math.random() * 100;      // 0-100%
        const rotation = Math.random() * 360;  // 0-360deg
        const duration = Math.random() * 60 + 60; // 60-120s
        const delay = Math.random() * -30;     // -30-0s
        const shapeName = shapes[i % shapes.length];
        
        // Set shape style
        shape.className = `holographic-ambient-shape shape-${shapeName}`;
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            opacity: 0.03;
            transform: rotate(${rotation}deg);
            animation: floatShape ${duration}s ease-in-out infinite alternate, 
                       pulseOpacity 15s ease-in-out infinite alternate;
            animation-delay: ${delay}s;
            filter: blur(2px);
        `;
        
        // Add shape-specific styles
        let shapeStyle = '';
        switch(shapeName) {
            case 'hexagon':
                shapeStyle = `
                    background: linear-gradient(45deg, rgba(123, 53, 231, 0.1), rgba(123, 53, 231, 0.3));
                    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                `;
                break;
            case 'triangle':
                shapeStyle = `
                    background: linear-gradient(135deg, rgba(123, 53, 231, 0.1), rgba(123, 53, 231, 0.3));
                    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
                `;
                break;
            case 'circle':
                shapeStyle = `
                    background: radial-gradient(circle, rgba(123, 53, 231, 0.3), rgba(123, 53, 231, 0.1));
                    border-radius: 50%;
                `;
                break;
            case 'square':
                shapeStyle = `
                    background: linear-gradient(90deg, rgba(123, 53, 231, 0.1), rgba(123, 53, 231, 0.3));
                `;
                break;
            case 'diamond':
                shapeStyle = `
                    background: linear-gradient(45deg, rgba(123, 53, 231, 0.1), rgba(123, 53, 231, 0.3));
                    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
                `;
                break;
            case 'octagon':
                shapeStyle = `
                    background: linear-gradient(135deg, rgba(123, 53, 231, 0.1), rgba(123, 53, 231, 0.3));
                    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
                `;
                break;
        }
        
        shape.style.cssText += shapeStyle;
        ambienceContainer.appendChild(shape);
    }
    
    // Add animation keyframes
    if (!document.getElementById('holographic-ambience-keyframes')) {
        const style = document.createElement('style');
        style.id = 'holographic-ambience-keyframes';
        style.textContent = `
            @keyframes floatShape {
                0% {
                    transform: translate(0, 0) rotate(0deg) scale(1);
                }
                33% {
                    transform: translate(5%, 10%) rotate(120deg) scale(1.1);
                }
                66% {
                    transform: translate(-8%, -5%) rotate(240deg) scale(0.9);
                }
                100% {
                    transform: translate(8%, 8%) rotate(360deg) scale(1);
                }
            }
            
            @keyframes pulseOpacity {
                0%, 100% {
                    opacity: 0.02;
                }
                50% {
                    opacity: 0.06;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Enhance cards with advanced 3D effects
 */
function enhance3DCards() {
    // Target all cards
    const cards = document.querySelectorAll('.stats-card, .mode-card, .holographic');
    
    cards.forEach(card => {
        // Skip cards that already have 3D effects
        if (card.classList.contains('enhanced-3d')) return;
        
        // Add class to mark as enhanced
        card.classList.add('enhanced-3d');
        
        // Add smooth transition to card
        card.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
        
        // Create light reflection layer
        const reflection = document.createElement('div');
        reflection.className = 'holographic-reflection';
        reflection.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.03) 50%, 
                rgba(255, 255, 255, 0) 100%);
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            pointer-events: none;
            z-index: 10;
            border-radius: inherit;
        `;
        
        // Ensure card has position relative
        if (getComputedStyle(card).position === 'static') {
            card.style.position = 'relative';
        }
        
        // Add edge glow effect
        const edgeGlow = document.createElement('div');
        edgeGlow.className = 'holographic-edge-glow';
        edgeGlow.style.cssText = `
            position: absolute;
            top: -1px;
            left: -1px;
            right: -1px;
            bottom: -1px;
            border-radius: inherit;
            pointer-events: none;
            box-shadow: 0 0 8px rgba(123, 53, 231, 0.2);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1;
        `;
        
        // Add perspective depth layer
        const depthLayer = document.createElement('div');
        depthLayer.className = 'holographic-depth-layer';
        depthLayer.style.cssText = `
            position: absolute;
            top: 5px;
            left: 5px;
            right: 5px;
            bottom: 5px;
            background: rgba(20, 20, 22, 0.4);
            border-radius: inherit;
            transform: translateZ(-10px);
            filter: blur(10px);
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            z-index: -1;
        `;
        
        // Add the layers to the card
        card.appendChild(depthLayer);
        card.appendChild(edgeGlow);
        card.appendChild(reflection);
        
        // Add enhanced 3D tilt effect
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            
            // Calculate mouse position relative to card
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate tilt angles
            const tiltX = (mouseY / rect.height - 0.5) * 10; // -5 to 5 degrees
            const tiltY = (mouseX / rect.width - 0.5) * -10; // -5 to 5 degrees
            
            // Apply 3D transform
            card.style.transform = `
                perspective(1000px)
                rotateX(${tiltX}deg)
                rotateY(${tiltY}deg)
                scale3d(1.02, 1.02, 1.02)
                translateZ(10px)
            `;
            
            // Position reflection based on mouse
            reflection.style.opacity = '1';
            reflection.style.transform = `
                rotate(${(mouseX / rect.width - 0.5) * 20}deg)
                translateX(${(mouseX / rect.width - 0.5) * 50}%)
            `;
            
            // Show edge glow
            edgeGlow.style.opacity = '1';
            
            // Show depth layer
            depthLayer.style.opacity = '1';
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)';
            reflection.style.opacity = '0';
            edgeGlow.style.opacity = '0';
            depthLayer.style.opacity = '0';
        });
    });
}

/**
 * Create holographic data visualization elements
 */
function createHolographicDataVisualizers() {
    // Find chart containers
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        // Skip if already enhanced
        if (container.classList.contains('holographic-enhanced')) return;
        
        container.classList.add('holographic-enhanced');
        
        // Find the chart element
        const chart = container.querySelector('.chart');
        if (!chart) return;
        
        // Add holographic overlay
        const holographicOverlay = document.createElement('div');
        holographicOverlay.className = 'holographic-chart-overlay';
        holographicOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            border-radius: inherit;
            overflow: hidden;
            z-index: 5;
        `;
        
        // Add scan line effect
        const scanLine = document.createElement('div');
        scanLine.className = 'holographic-scan-line';
        scanLine.style.cssText = `
            position: absolute;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, 
                rgba(123, 53, 231, 0), 
                rgba(123, 53, 231, 0.8), 
                rgba(123, 53, 231, 0));
            opacity: 0.7;
            filter: blur(1px);
            animation: scanAnimation 3s ease-in-out infinite;
            pointer-events: none;
        `;
        
        // Add data points with glow
        for (let i = 0; i < 7; i++) {
            const dataPoint = document.createElement('div');
            const posX = (i / 6) * 100;
            const posY = 30 + Math.random() * 50; // random height
            
            dataPoint.className = 'holographic-data-point';
            dataPoint.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: rgba(123, 53, 231, 0.8);
                left: ${posX}%;
                bottom: ${posY}%;
                box-shadow: 0 0 8px 2px rgba(123, 53, 231, 0.6);
                animation: pulseDataPoint 3s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            
            holographicOverlay.appendChild(dataPoint);
        }
        
        holographicOverlay.appendChild(scanLine);
        container.appendChild(holographicOverlay);
    });
    
    // Add animation keyframes
    if (!document.getElementById('holographic-chart-keyframes')) {
        const style = document.createElement('style');
        style.id = 'holographic-chart-keyframes';
        style.textContent = `
            @keyframes scanAnimation {
                0% {
                    top: 0;
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                }
                90% {
                    opacity: 0.7;
                }
                100% {
                    top: 100%;
                    opacity: 0;
                }
            }
            
            @keyframes pulseDataPoint {
                0%, 100% {
                    transform: scale(1);
                    opacity: 0.8;
                }
                50% {
                    transform: scale(1.5);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Add circuit-like patterns to UI elements
 */
function addCircuitPatterns() {
    // Target larger sections for circuit patterns
    const targets = document.querySelectorAll('.sidebar, .dashboard-content');
    
    targets.forEach(target => {
        // Skip if already enhanced
        if (target.classList.contains('circuit-enhanced')) return;
        
        target.classList.add('circuit-enhanced');
        
        // Create circuit container
        const circuitContainer = document.createElement('div');
        circuitContainer.className = 'holographic-circuit-container';
        circuitContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            opacity: 0.03;
            z-index: 0;
            overflow: hidden;
        `;
        
        // Ensure target has position relative
        if (getComputedStyle(target).position === 'static') {
            target.style.position = 'relative';
        }
        
        // Create 8-12 circuit lines
        const lineCount = Math.floor(Math.random() * 5) + 8;
        
        for (let i = 0; i < lineCount; i++) {
            createCircuitLine(circuitContainer);
        }
        
        // Add to target
        target.appendChild(circuitContainer);
    });
}

/**
 * Create a single circuit line with paths and nodes
 * @param {HTMLElement} container - The container element to add the circuit line to
 */
function createCircuitLine(container) {
    const circuit = document.createElement('div');
    
    // Random starting position on the edges
    const edge = Math.floor(Math.random() * 4); // 0:top, 1:right, 2:bottom, 3:left
    let startX, startY;
    
    switch(edge) {
        case 0: // top
            startX = Math.random() * 100;
            startY = 0;
            break;
        case 1: // right
            startX = 100;
            startY = Math.random() * 100;
            break;
        case 2: // bottom
            startX = Math.random() * 100;
            startY = 100;
            break;
        case 3: // left
            startX = 0;
            startY = Math.random() * 100;
            break;
    }
    
    // Set circuit style
    circuit.className = 'holographic-circuit';
    circuit.style.cssText = `
        position: absolute;
        left: ${startX}%;
        top: ${startY}%;
        width: 1px;
        height: 1px;
    `;
    
    // Create the path using SVG for more control
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.overflow = 'visible';
    
    // Build a path with multiple segments
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let pathD = `M ${startX} ${startY}`;
    
    // Create 3-6 path segments
    const segmentCount = Math.floor(Math.random() * 4) + 3;
    let currentX = startX;
    let currentY = startY;
    
    for (let i = 0; i < segmentCount; i++) {
        // Decide direction: horizontal or vertical
        const isHorizontal = (i % 2 === 0);
        
        // Calculate new coordinates
        let newX = isHorizontal ? currentX + (Math.random() * 30 - 15) : currentX;
        let newY = !isHorizontal ? currentY + (Math.random() * 30 - 15) : currentY;
        
        // Keep within bounds
        newX = Math.max(0, Math.min(100, newX));
        newY = Math.max(0, Math.min(100, newY));
        
        // Add line segment
        pathD += ` L ${newX} ${newY}`;
        
        // Create a node at the junction
        const node = document.createElement('div');
        node.className = 'circuit-node';
        node.style.cssText = `
            position: absolute;
            left: ${newX}%;
            top: ${newY}%;
            width: 3px;
            height: 3px;
            background-color: rgba(123, 53, 231, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 3px rgba(123, 53, 231, 0.5);
            animation: pulseNode 4s infinite ease-in-out;
            animation-delay: ${Math.random() * 4}s;
        `;
        
        circuit.appendChild(node);
        
        // Update current position
        currentX = newX;
        currentY = newY;
    }
    
    // Set path attributes
    path.setAttribute('d', pathD);
    path.setAttribute('stroke', 'rgba(123, 53, 231, 0.5)');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-dasharray', '4,3');
    path.style.animation = `dashAnimation ${Math.random() * 10 + 20}s linear infinite`;
    
    svg.appendChild(path);
    circuit.appendChild(svg);
    container.appendChild(circuit);
    
    // Add animation keyframes if not present
    if (!document.getElementById('circuit-animation-keyframes')) {
        const style = document.createElement('style');
        style.id = 'circuit-animation-keyframes';
        style.textContent = `
            @keyframes dashAnimation {
                to {
                    stroke-dashoffset: 1000;
                }
            }
            
            @keyframes pulseNode {
                0%, 100% {
                    opacity: 0.5;
                    transform: translate(-50%, -50%) scale(1);
                }
                50% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.5);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Enhance navigation elements with highlight effects
 */
function enhanceNavigationElements() {
    // Target navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Skip if already enhanced
        if (link.classList.contains('holographic-nav-enhanced')) return;
        
        link.classList.add('holographic-nav-enhanced');
        
        // Create hover effect container
        const hoverEffect = document.createElement('div');
        hoverEffect.className = 'nav-hover-effect';
        hoverEffect.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, 
                rgba(123, 53, 231, 0.05), 
                rgba(123, 53, 231, 0.1), 
                rgba(123, 53, 231, 0.05));
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            border-radius: inherit;
            pointer-events: none;
            z-index: -1;
        `;
        
        // Ensure link has position relative
        if (getComputedStyle(link).position === 'static') {
            link.style.position = 'relative';
        }
        
        link.appendChild(hoverEffect);
        
        // Add hover effects
        link.addEventListener('mouseenter', () => {
            hoverEffect.style.opacity = '1';
            hoverEffect.style.transform = 'scaleX(1)';
            
            // Animate icons in the link
            const icons = link.querySelectorAll('i');
            icons.forEach(icon => {
                icon.style.transition = 'transform 0.3s ease, color 0.3s ease';
                icon.style.transform = 'scale(1.2)';
                icon.style.color = 'var(--accent-color)';
            });
        });
        
        link.addEventListener('mouseleave', () => {
            hoverEffect.style.opacity = '0';
            hoverEffect.style.transform = 'scaleX(0.8)';
            
            // Reset icon animations
            const icons = link.querySelectorAll('i');
            icons.forEach(icon => {
                icon.style.transform = 'scale(1)';
                
                // Only reset color if not an active link
                if (!link.classList.contains('active')) {
                    icon.style.color = '';
                }
            });
        });
    });
}

/**
 * Create holographic focus rings for interactive elements
 */
function createFocusRings() {
    // Target interactive elements
    const interactiveElements = document.querySelectorAll('button, input, select, textarea, .mode-card');
    
    interactiveElements.forEach(element => {
        // Skip if already enhanced
        if (element.classList.contains('holographic-focus-enhanced')) return;
        
        element.classList.add('holographic-focus-enhanced');
        
        // Create focus ring
        const focusRing = document.createElement('div');
        focusRing.className = 'holographic-focus-ring';
        focusRing.style.cssText = `
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            border-radius: inherit;
            pointer-events: none;
            z-index: 9;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
        `;
        
        // Add animation elements to the focus ring
        for (let i = 0; i < 2; i++) {
            const ringLayer = document.createElement('div');
            ringLayer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: inherit;
                border: 1px solid rgba(123, 53, 231, ${0.4 - i * 0.2});
                box-shadow: 0 0 ${8 + i * 4}px rgba(123, 53, 231, ${0.3 - i * 0.15});
                animation: pulseRing ${2 + i * 1}s infinite ease-in-out alternate;
                opacity: 0.8;
            `;
            focusRing.appendChild(ringLayer);
        }
        
        // Ensure element has position relative
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        
        element.appendChild(focusRing);
        
        // Show focus ring on focus/hover
        element.addEventListener('focusin', () => {
            focusRing.style.opacity = '1';
            focusRing.style.transform = 'scale(1)';
        });
        
        element.addEventListener('mouseenter', () => {
            focusRing.style.opacity = '1';
            focusRing.style.transform = 'scale(1)';
        });
        
        // Hide focus ring on blur/leave
        element.addEventListener('focusout', () => {
            focusRing.style.opacity = '0';
            focusRing.style.transform = 'scale(0.9)';
        });
        
        element.addEventListener('mouseleave', () => {
            if (document.activeElement !== element) {
                focusRing.style.opacity = '0';
                focusRing.style.transform = 'scale(0.9)';
            }
        });
    });
    
    // Add animation keyframes
    if (!document.getElementById('focus-ring-keyframes')) {
        const style = document.createElement('style');
        style.id = 'focus-ring-keyframes';
        style.textContent = `
            @keyframes pulseRing {
                0% {
                    opacity: 0.6;
                    transform: scale(1);
                }
                100% {
                    opacity: 0.8;
                    transform: scale(1.05);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Add quantum particle effects for interaction feedback
 */
function addQuantumParticleEffects() {
    // Create container for particle effects
    const particleContainer = document.createElement('div');
    particleContainer.id = 'quantum-particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    // Add click handler to body to create particles on any click
    document.body.addEventListener('click', e => {
        // Only create particles for clicks on interface elements
        if (e.target.closest('button, .nav-link, .mode-card, .stats-card, a')) {
            createQuantumParticlesAtPosition(e.clientX, e.clientY);
        }
    });
}

/**
 * Create quantum particles at specified position
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function createQuantumParticlesAtPosition(x, y) {
    const container = document.getElementById('quantum-particle-container');
    if (!container) return;
    
    // Create 10-15 particles
    const particleCount = Math.floor(Math.random() * 6) + 10;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Random properties
        const size = Math.random() * 3 + 2;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        const duration = Math.random() * 0.8 + 0.6;
        const hue = Math.random() * 40 + 260; // Purple to blue hue
        
        // Set particle style
        particle.className = 'quantum-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background-color: hsla(${hue}, 70%, 60%, 0.8);
            box-shadow: 0 0 ${size * 2}px hsla(${hue}, 70%, 60%, 0.6);
            top: ${y}px;
            left: ${x}px;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            animation: quantumParticle ${duration}s ease-out forwards;
        `;
        
        // Calculate end position
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        // Add animation keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes quantumParticle {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
            style.remove();
        }, duration * 1000);
    }
}

/**
 * Initialize audio feedback for holographic elements
 */
function initializeAudioFeedback() {
    // Create audio elements
    const hoverSound = new Audio('sounds/hover.mp3');
    const clickSound = new Audio('sounds/click.mp3');
    
    hoverSound.volume = 0.2;
    clickSound.volume = 0.3;
    
    // Preload sounds
    hoverSound.load();
    clickSound.load();
    
    // Add sound to interactive elements
    const interactiveElements = document.querySelectorAll('button, .nav-link, .mode-card, .stats-card, a');
    
    interactiveElements.forEach(element => {
        // Skip if already enhanced
        if (element.classList.contains('sound-enhanced')) return;
        
        element.classList.add('sound-enhanced');
        
        // Add hover sound
        element.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            const clone = hoverSound.cloneNode();
            clone.volume = 0.2;
            clone.play();
            
            // Clean up cloned audio
            clone.addEventListener('ended', () => {
                clone.remove();
            });
        });
        
        // Add click sound
        element.addEventListener('click', () => {
            clickSound.currentTime = 0;
            const clone = clickSound.cloneNode();
            clone.volume = 0.3;
            clone.play();
            
            // Clean up cloned audio
            clone.addEventListener('ended', () => {
                clone.remove();
            });
        });
    });
}

/**
 * Create holographic cursor with trail effect
 */
function createHolographicCursor() {
    // Create custom cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'holographic-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid rgba(123, 53, 231, 0.7);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s, width 0.2s, height 0.2s, border-color 0.2s;
        mix-blend-mode: screen;
    `;
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'holographic-cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(123, 53, 231, 0.9);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s;
        box-shadow: 0 0 5px rgba(123, 53, 231, 0.8);
    `;
    
    // Create cursor trail
    const trail = document.createElement('div');
    trail.className = 'holographic-cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(123, 53, 231, 0.3);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    document.body.appendChild(trail);
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let cursorVisible = false;
    let trailX = 0;
    let trailY = 0;
    
    // Update cursor position
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor if not visible
        if (!cursorVisible) {
            cursorVisible = true;
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
            trail.style.opacity = '0.6';
        }
        
        // Position dot at mouse position
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        
        // Position cursor with slight delay for smooth effect
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
        trail.style.opacity = '0';
    });
    
    // Change cursor on interactive elements
    document.addEventListener('mouseover', e => {
        if (e.target.closest('button, a, input, .mode-card, .stats-card, .nav-link')) {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.borderColor = 'rgba(138, 74, 243, 0.7)';
        } else {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'rgba(123, 53, 231, 0.7)';
        }
    });
    
    // Animate trail with smoother movement
    function animateTrail() {
        if (!cursorVisible) return requestAnimationFrame(animateTrail);
        
        // Smoothly follow cursor with trail
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = `${trailX}px`;
        trail.style.top = `${trailY}px`;
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

/**
 * Setup responsive behavior for holographic UI elements
 */
function setupResponsiveHolographicUI() {
    // Initial check
    updateResponsiveHolographicUI();
    
    // Listen for window resize
    window.addEventListener('resize', updateResponsiveHolographicUI);
}

/**
 * Update holographic UI elements based on screen size
 */
function updateResponsiveHolographicUI() {
    const width = window.innerWidth;
    
    // Get all holographic elements
    const holographicElements = document.querySelectorAll('.holographic-ambience, .holographic-circuit-container, .floating-particles, .data-streams');
    
    if (width < 768) { // Mobile devices
        // Reduce visual effects on mobile
        holographicElements.forEach(element => {
            element.style.opacity = '0.1';
        });
        
        // Hide cursor on mobile
        const cursor = document.querySelector('.holographic-cursor');
        const cursorDot = document.querySelector('.holographic-cursor-dot');
        const trail = document.querySelector('.holographic-cursor-trail');
        
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
        if (trail) trail.style.display = 'none';
    } else { // Tablets and desktops
        // Restore visual effects
        holographicElements.forEach(element => {
            if (element.classList.contains('holographic-ambience')) {
                element.style.opacity = '1';
            } else if (element.classList.contains('holographic-circuit-container')) {
                element.style.opacity = '0.03';
            } else if (element.classList.contains('floating-particles')) {
                element.style.opacity = '1';
            } else if (element.classList.contains('data-streams')) {
                element.style.opacity = '0.15';
            }
        });
        
        // Show cursor on desktop
        const cursor = document.querySelector('.holographic-cursor');
        const cursorDot = document.querySelector('.holographic-cursor-dot');
        const trail = document.querySelector('.holographic-cursor-trail');
        
        if (cursor) cursor.style.display = 'block';
        if (cursorDot) cursorDot.style.display = 'block';
        if (trail) trail.style.display = 'block';
    }
}
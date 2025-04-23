/**
 * JAAT-AI 3D Background Animation
 * Creates advanced 3D visual effects for the background
 */

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Start background effects
  initBackgroundEffects();
});

/**
 * Initialize background visual effects
 */
function initBackgroundEffects() {
  // Create parallax star layers
  createParallaxStars();
  
  // Create floating 3D elements
  createFloatingElements();
  
  // Create cosmic glow effects
  createCosmicGlows();
  
  // Initialize scroll-based animations
  initScrollAnimations();
  
  // Initialize mouse tracking for 3D movement
  initMouseTracking();
  
  console.log('3D background effects initialized');
}

/**
 * Create parallax star layers that move at different speeds
 */
function createParallaxStars() {
  const starsContainer = document.querySelector('.stars-container');
  if (!starsContainer) return;
  
  // Create multiple star layers with different parallax strengths
  const layers = 3;
  
  for (let layer = 0; layer < layers; layer++) {
    const layerDiv = document.createElement('div');
    layerDiv.className = `star-layer layer-${layer + 1}`;
    
    // Apply layer-specific styles
    layerDiv.style.zIndex = layer;
    starsContainer.appendChild(layerDiv);
    
    // Generate stars for this layer
    const starCount = 30 - (layer * 10); // More stars in the background layers
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = `parallax-star star-layer-${layer + 1}`;
      
      // Randomize star properties
      const size = Math.random() * (layer + 1) + 1; // Bigger stars in foreground layers
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.2;
      
      // Apply styles
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${posY}%`;
      star.style.left = `${posX}%`;
      star.style.opacity = opacity.toString();
      
      // Add to layer
      layerDiv.appendChild(star);
    }
  }
  
  console.log('Parallax stars created');
}

/**
 * Create floating 3D elements in the background
 */
function createFloatingElements() {
  const bgContainer = document.querySelector('.star-background');
  if (!bgContainer) return;
  
  // Create container for floating elements
  const floatingContainer = document.createElement('div');
  floatingContainer.className = 'floating-elements';
  bgContainer.appendChild(floatingContainer);
  
  // Create floating geometric shapes
  const shapes = ['circle', 'triangle', 'square', 'hexagon'];
  const count = 8;
  
  for (let i = 0; i < count; i++) {
    const shape = document.createElement('div');
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    shape.className = `floating-shape ${shapeType}`;
    
    // Randomize shape properties
    const size = Math.random() * 50 + 20;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const opacity = Math.random() * 0.2 + 0.05;
    const rotate = Math.random() * 360;
    const animationDuration = Math.random() * 100 + 50;
    const rotationDuration = Math.random() * 100 + 50;
    
    // Apply styles
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.top = `${posY}%`;
    shape.style.left = `${posX}%`;
    shape.style.opacity = opacity.toString();
    shape.style.transform = `rotate(${rotate}deg)`;
    shape.style.animationDuration = `${animationDuration}s, ${rotationDuration}s`;
    
    // Add to container
    floatingContainer.appendChild(shape);
  }
  
  console.log('Floating elements created');
}

/**
 * Create dynamic cosmic glow effects
 */
function createCosmicGlows() {
  const bgContainer = document.querySelector('.star-background');
  if (!bgContainer) return;
  
  // Create additional cosmic glows that move slowly
  const count = 3;
  
  for (let i = 0; i < count; i++) {
    const glow = document.createElement('div');
    glow.className = 'dynamic-cosmic-glow';
    
    // Randomize glow properties
    const size = Math.random() * 300 + 100;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const opacity = Math.random() * 0.15 + 0.05;
    const hue = Math.random() * 60 + 200; // Blue to purple range
    
    // Apply styles
    glow.style.width = `${size}px`;
    glow.style.height = `${size}px`;
    glow.style.top = `${posY}%`;
    glow.style.left = `${posX}%`;
    glow.style.opacity = opacity.toString();
    glow.style.background = `radial-gradient(circle at center, 
      hsla(${hue}, 80%, 70%, 0.3) 0%, 
      hsla(${hue + 20}, 70%, 60%, 0.2) 40%, 
      hsla(${hue + 40}, 70%, 50%, 0.1) 70%, 
      transparent 100%)`;
    
    // Add animation with random duration
    glow.style.animationDuration = `${Math.random() * 30 + 20}s`;
    
    // Add to container
    bgContainer.appendChild(glow);
  }
  
  console.log('Cosmic glows created');
}

/**
 * Initialize scroll-based animations for the background
 */
function initScrollAnimations() {
  // Add scroll listener
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
    
    // Rotate star layers based on scroll
    const starLayers = document.querySelectorAll('.star-layer');
    starLayers.forEach((layer, index) => {
      const speed = (index + 1) * 0.1;
      layer.style.transform = `rotate(${scrollY * speed * 0.05}deg)`;
    });
    
    // Adjust opacity of background elements based on scroll
    const bgElements = document.querySelectorAll('.floating-elements, .dynamic-cosmic-glow');
    bgElements.forEach(element => {
      const baseOpacity = parseFloat(element.getAttribute('data-base-opacity') || element.style.opacity);
      
      // Store original opacity if not already stored
      if (!element.getAttribute('data-base-opacity')) {
        element.setAttribute('data-base-opacity', baseOpacity.toString());
      }
      
      // Fade out slightly as the user scrolls down
      element.style.opacity = (baseOpacity * (1 - scrollPercent * 0.5)).toString();
    });
  });
  
  console.log('Scroll animations initialized');
}

/**
 * Initialize mouse tracking for 3D movement effects
 */
function initMouseTracking() {
  document.addEventListener('mousemove', e => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Move star layers for parallax effect
    const starLayers = document.querySelectorAll('.star-layer');
    starLayers.forEach((layer, index) => {
      const speed = (index + 1) * 10;
      const offsetX = (mouseX - 0.5) * speed;
      const offsetY = (mouseY - 0.5) * speed;
      
      layer.style.transform = `translate(${offsetX}px, ${offsetY}px) ${layer.style.transform || ''}`;
    });
    
    // Move floating elements
    const floatingElements = document.querySelectorAll('.floating-shape');
    floatingElements.forEach(element => {
      const speedFactor = Math.random() * 0.5 + 0.5;
      const offsetX = (mouseX - 0.5) * 20 * speedFactor;
      const offsetY = (mouseY - 0.5) * 20 * speedFactor;
      
      element.style.transform = `translate(${offsetX}px, ${offsetY}px) ${element.style.transform || ''}`;
    });
    
    // Adjust dynamic glows slightly based on mouse position
    const dynamicGlows = document.querySelectorAll('.dynamic-cosmic-glow');
    dynamicGlows.forEach(glow => {
      const offsetX = (mouseX - 0.5) * 40;
      const offsetY = (mouseY - 0.5) * 40;
      
      glow.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });
  
  console.log('Mouse tracking initialized');
}

/**
 * Add a 3D holographic grid effect to the background
 * @param {HTMLElement} container - The container to add the grid to
 */
function createHolographicGrid(container) {
  // Create grid container
  const gridContainer = document.createElement('div');
  gridContainer.className = 'holographic-grid';
  container.appendChild(gridContainer);
  
  // Create grid lines
  const linesCount = 20; // Number of lines in each direction
  
  // Create horizontal lines
  for (let i = 0; i <= linesCount; i++) {
    const line = document.createElement('div');
    line.className = 'grid-line horizontal';
    line.style.top = `${(i / linesCount) * 100}%`;
    gridContainer.appendChild(line);
  }
  
  // Create vertical lines
  for (let i = 0; i <= linesCount; i++) {
    const line = document.createElement('div');
    line.className = 'grid-line vertical';
    line.style.left = `${(i / linesCount) * 100}%`;
    gridContainer.appendChild(line);
  }
  
  console.log('Holographic grid created');
}

/**
 * Create a floating nebula effect
 * @param {HTMLElement} container - The container to add the nebula to
 */
function createNebula(container) {
  const nebula = document.createElement('div');
  nebula.className = 'nebula-effect';
  
  // Add multiple nebula layers
  for (let i = 0; i < 3; i++) {
    const nebulaLayer = document.createElement('div');
    nebulaLayer.className = `nebula-layer layer-${i + 1}`;
    
    // Apply layer-specific styles
    const hue = 220 + (i * 30); // Blue to purple range
    nebulaLayer.style.background = `radial-gradient(
      ellipse at center,
      hsla(${hue}, 80%, 70%, 0.1) 0%,
      hsla(${hue + 20}, 70%, 60%, 0.05) 40%,
      hsla(${hue + 40}, 70%, 50%, 0.02) 70%,
      transparent 100%
    )`;
    
    nebula.appendChild(nebulaLayer);
  }
  
  container.appendChild(nebula);
  console.log('Nebula effect created');
}
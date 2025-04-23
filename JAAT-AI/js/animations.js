/**
 * JAAT-AI Animations Manager
 * Handles all animations and interactive elements throughout the site
 */

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Start all animation systems
  initializeAnimations();
  createStarBackground();
  setupScrollEffects();
  initializeHolographicElements();
});

/**
 * Initialize all animations across the site
 */
function initializeAnimations() {
  // Add animation classes to elements that should animate on scroll
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Set initial states (hidden)
  animatedElements.forEach(element => {
    element.classList.add('hidden');
    observeElement(element);
  });
  
  // Initialize interactive buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      button.classList.add('hover');
    });
    
    button.addEventListener('mouseout', () => {
      button.classList.remove('hover');
    });
    
    button.addEventListener('mousedown', () => {
      button.classList.add('active');
    });
    
    button.addEventListener('mouseup', () => {
      button.classList.remove('active');
    });
    
    // Add holographic effect to special buttons
    if (button.classList.contains('btn-primary') || button.classList.contains('btn-subscribe') || button.classList.contains('btn-signup')) {
      addHolographicEffect(button);
    }
  });
  
  // Initialize nav links with hover effects
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      // Create glow effect
      const glow = document.createElement('div');
      glow.className = 'nav-glow';
      link.appendChild(glow);
      
      setTimeout(() => {
        glow.remove();
      }, 1000);
    });
  });
  
  // Add parallax effect to cosmic glows
  const cosmicGlows = document.querySelectorAll('.cosmic-glow');
  window.addEventListener('mousemove', e => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cosmicGlows.forEach(glow => {
      const offsetX = (mouseX - 0.5) * 30;
      const offsetY = (mouseY - 0.5) * 30;
      
      glow.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });
  
  console.log('All animations initialized');
}

/**
 * Create the star background
 */
function createStarBackground() {
  const starsContainer = document.querySelector('.stars-container');
  if (!starsContainer) return;
  
  // Generate stars with different sizes and animations
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Randomize star properties
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const animationDelay = Math.random() * 10;
    const animationDuration = Math.random() * 3 + 2;
    
    // Apply styles
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${posY}%`;
    star.style.left = `${posX}%`;
    star.style.animationDelay = `${animationDelay}s`;
    star.style.animationDuration = `${animationDuration}s`;
    
    // Add to container
    starsContainer.appendChild(star);
  }
  
  // Create occasional shooting stars
  setInterval(() => {
    createShootingStar(starsContainer);
  }, 8000);
  
  console.log('Star background created');
}

/**
 * Create a shooting star
 * @param {HTMLElement} container - The container to add the shooting star to
 */
function createShootingStar(container) {
  const shootingStar = document.createElement('div');
  shootingStar.className = 'shooting-star';
  
  // Randomize position and angle
  const startX = Math.random() * 100;
  const startY = Math.random() * 50;
  const angle = Math.random() * 60 - 30; // -30 to 30 degrees
  
  // Apply styles
  shootingStar.style.top = `${startY}%`;
  shootingStar.style.left = `${startX}%`;
  shootingStar.style.transform = `rotate(${angle}deg)`;
  
  // Add to container
  container.appendChild(shootingStar);
  
  // Remove after animation completes
  setTimeout(() => {
    if (shootingStar.parentNode === container) {
      container.removeChild(shootingStar);
    }
  }, 1000);
}

/**
 * Setup scroll-based animation effects
 */
function setupScrollEffects() {
  // Observe elements for scroll-based animations
  function observeElement(element) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.remove('hidden');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(element);
  }
  
  // Add scroll listener for parallax effects
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Parallax for hero section
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      heroVisual.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
    
    // Header transparency effect
    const header = document.querySelector('.main-header');
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
  
  console.log('Scroll effects initialized');
}

/**
 * Initialize all holographic elements
 */
function initializeHolographicElements() {
  // Select all holographic elements
  const hologramContainers = document.querySelectorAll('.hologram-container');
  
  hologramContainers.forEach(container => {
    // Create particles inside the hologram
    createHologramParticles(container);
    
    // Add interaction effects
    container.addEventListener('mousemove', e => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Tilt effect
      container.style.transform = `perspective(1000px) rotateX(${y * 10}deg) rotateY(${-x * 10}deg)`;
      
      // Particles follow mouse
      const particles = container.querySelectorAll('.hologram-particle');
      particles.forEach(particle => {
        const speed = parseFloat(particle.dataset.speed);
        const offsetX = x * 50 * speed;
        const offsetY = y * 50 * speed;
        
        particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    });
    
    // Reset on mouse leave
    container.addEventListener('mouseleave', () => {
      container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      
      const particles = container.querySelectorAll('.hologram-particle');
      particles.forEach(particle => {
        particle.style.transform = 'translate(0, 0)';
      });
    });
  });
  
  console.log('Holographic elements initialized');
}

/**
 * Create particles inside a hologram container
 * @param {HTMLElement} container - The hologram container
 */
function createHologramParticles(container) {
  const particlesContainer = container.querySelector('.hologram-particles');
  if (!particlesContainer) return;
  
  // Create random particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'hologram-particle';
    
    // Random particle properties
    const size = Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const speed = Math.random() * 0.5 + 0.2;
    const opacity = Math.random() * 0.5 + 0.2;
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.top = `${posY}%`;
    particle.style.left = `${posX}%`;
    particle.style.opacity = opacity.toString();
    
    // Store speed for later use
    particle.dataset.speed = speed.toString();
    
    // Add to container
    particlesContainer.appendChild(particle);
  }
}

/**
 * Add holographic effect to an element
 * @param {HTMLElement} element - The element to apply the effect to
 */
function addHolographicEffect(element) {
  // Add hover effects
  element.addEventListener('mousemove', e => {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Calculate gradient position
    element.style.setProperty('--x-pos', `${x * 100}%`);
    element.style.setProperty('--y-pos', `${y * 100}%`);
    
    // Add subtle tilt
    const tiltX = (y - 0.5) * 5;
    const tiltY = (x - 0.5) * -5;
    element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    
    // Add shine effect
    if (!element.querySelector('.shine')) {
      const shine = document.createElement('div');
      shine.className = 'shine';
      element.appendChild(shine);
      
      // Position shine based on mouse
      shine.style.top = `${y * 100}%`;
      shine.style.left = `${x * 100}%`;
    }
  });
  
  // Reset on mouse leave
  element.addEventListener('mouseleave', () => {
    element.style.transform = '';
    const shine = element.querySelector('.shine');
    if (shine) shine.remove();
  });
}

/**
 * Check if an element is in the viewport
 * @param {HTMLElement} el - The element to check
 * @returns {boolean} - Whether the element is in the viewport
 */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
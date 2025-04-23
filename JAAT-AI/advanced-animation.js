/**
 * JAAT-AI Advanced Animation System
 * This file contains advanced holographic UI animations and effects
 * Enhanced with elements from hologram UI scripts
 */

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Core animation initializations
  startAnimations();
  handleScrollEffects();
  initializeHolographicDevice();
  createStars();
  
  // Hologram UI initializations
  initHolographicEffects();
  initHolographicCards();
  initHolographicButtons();
  
  // Setup intersection observer for elements
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe animated elements
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    intersectionObserver.observe(element);
  });
});

/**
 * Start the core animations for the UI
 */
function startAnimations() {
  // Set up animations that run continuously
  cycleInterfaceDots();
  
  // Add event listeners for interactive elements
  document.querySelectorAll('.holographic-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Add highlight effect
      const highlightX = (x / rect.width) * 100;
      const highlightY = (y / rect.height) * 100;
      card.style.background = `
        linear-gradient(135deg, rgba(26, 31, 46, 0.5), rgba(10, 14, 23, 0.5)), 
        radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(58, 134, 255, 0.2), transparent 80%)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      card.style.background = 'linear-gradient(135deg, rgba(26, 31, 46, 0.5), rgba(10, 14, 23, 0.5))';
    });
  });
}

/**
 * Handle scroll-based animations and effects
 */
function handleScrollEffects() {
  // Variables for tracking scroll position
  let lastScrollTop = 0;
  let scrollDirection = 'down';
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Detect scroll direction
    scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    lastScrollTop = scrollTop;
    
    // Parallax effect for cosmic glows
    const cosmicGlows = document.querySelectorAll('.cosmic-glow');
    cosmicGlows.forEach(glow => {
      const speed = glow.classList.contains('top-left') ? 0.3 : 0.2;
      const yValue = scrollTop * speed;
      
      if (glow.classList.contains('top-left')) {
        glow.style.transform = `translateY(${yValue}px)`;
      } else {
        glow.style.transform = `translateY(-${yValue}px)`;
      }
    });
    
    // Header effect
    const header = document.querySelector('header');
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Apply effects to elements based on their position in viewport
    document.querySelectorAll('.scroll-effect').forEach(element => {
      if (isElementInViewport(element)) {
        const distanceFromTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const scrollPercentage = 1 - (distanceFromTop / windowHeight);
        
        if (element.classList.contains('fade-in')) {
          element.style.opacity = Math.min(scrollPercentage * 2, 1);
        }
        
        if (element.classList.contains('scale-in')) {
          const scaleValue = 0.5 + Math.min(scrollPercentage, 0.5);
          element.style.transform = `scale(${scaleValue})`;
        }
      }
    });
  });
}

/**
 * Initialize holographic device animations
 */
function initializeHolographicDevice() {
  const devices = document.querySelectorAll('.holographic-device');
  
  devices.forEach(device => {
    // Add mouseenter animation
    device.addEventListener('mouseenter', () => {
      device.querySelector('.orb')?.classList.add('pulse');
      device.querySelectorAll('.ring').forEach(ring => {
        ring.style.animationDuration = '10s';
      });
      
      // Increase glow intensity
      const orbGlow = device.querySelector('.orb-glow');
      if (orbGlow) {
        orbGlow.style.opacity = '1';
        orbGlow.style.filter = 'blur(20px)';
      }
    });
    
    // Add mouseleave reset
    device.addEventListener('mouseleave', () => {
      device.querySelector('.orb')?.classList.remove('pulse');
      device.querySelectorAll('.ring').forEach(ring => {
        ring.style.animationDuration = '';
      });
      
      // Reset glow intensity
      const orbGlow = device.querySelector('.orb-glow');
      if (orbGlow) {
        orbGlow.style.opacity = '';
        orbGlow.style.filter = '';
      }
    });
  });
}

/**
 * Cycle through interface dots to create "processing" effect
 */
function cycleInterfaceDots() {
  const interfaceDotContainers = document.querySelectorAll('.interface-dots');
  
  interfaceDotContainers.forEach(container => {
    const dots = container.querySelectorAll('.interface-dot');
    if (dots.length === 0) return;
    
    let activeIndex = 0;
    
    // Initial state
    dots.forEach(dot => dot.classList.remove('active'));
    dots[activeIndex].classList.add('active');
    
    // Set interval for cycling
    setInterval(() => {
      dots[activeIndex].classList.remove('active');
      activeIndex = (activeIndex + 1) % dots.length;
      dots[activeIndex].classList.add('active');
    }, 2000);
  });
}

/**
 * Create stars background dynamically with enhanced visual effects
 */
function createStars() {
  const starsContainers = document.querySelectorAll('.stars-container');
  
  starsContainers.forEach(container => {
    // Clear existing stars for refresh
    const existingStars = container.querySelectorAll('.star');
    existingStars.forEach(star => star.remove());
    
    // Create different star layers for parallax effect
    const layers = [
      { count: 50, size: [0.5, 1.5], speed: [8, 15], class: 'star layer-1', opacity: [0.4, 0.8] },
      { count: 30, size: [1, 2.5], speed: [10, 20], class: 'star layer-2', opacity: [0.5, 0.9] },
      { count: 20, size: [1.5, 3], speed: [15, 25], class: 'star layer-3', opacity: [0.6, 1] }
    ];
    
    // Generate stars for each layer
    layers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const star = document.createElement('div');
        star.className = layer.class;
        
        // Random position
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        // Random size within layer range
        const size = layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random opacity within layer range
        const opacity = layer.opacity[0] + Math.random() * (layer.opacity[1] - layer.opacity[0]);
        star.style.opacity = opacity.toString();
        
        // Random animation delay and duration
        const duration = layer.speed[0] + Math.random() * (layer.speed[1] - layer.speed[0]);
        star.style.animationDelay = `${Math.random() * duration}s`;
        star.style.animationDuration = `${duration}s`;
        
        // Random subtle glow effect
        if (Math.random() > 0.7) {
          const hue = Math.floor(Math.random() * 60) + 180; // Blue-ish hues
          star.style.boxShadow = `0 0 ${size * 2}px rgba(${hue}, ${hue + 30}, 255, ${opacity * 0.8})`;
        }
        
        container.appendChild(star);
      }
    });
    
    // Add occasional shooting stars
    if (Math.random() > 0.5) {
      setInterval(() => {
        if (Math.random() > 0.7 && document.visibilityState === 'visible') {
          createShootingStar(container);
        }
      }, 8000);
    }
  });
}

/**
 * Create a shooting star animation
 * @param {HTMLElement} container - The container to add the shooting star to
 */
function createShootingStar(container) {
  const shootingStar = document.createElement('div');
  shootingStar.className = 'shooting-star';
  
  // Random position and angle
  const startX = Math.random() * 100;
  const startY = Math.random() * 50;
  const angle = 30 + Math.random() * 30; // Angle in degrees
  
  shootingStar.style.top = `${startY}%`;
  shootingStar.style.left = `${startX}%`;
  shootingStar.style.transform = `rotate(${angle}deg)`;
  
  // Random shooting star properties
  const length = 50 + Math.random() * 100;
  const speed = 0.5 + Math.random() * 0.5;
  
  shootingStar.style.width = `${length}px`;
  shootingStar.style.animationDuration = `${speed}s`;
  
  // Add to container
  container.appendChild(shootingStar);
  
  // Remove after animation completes
  setTimeout(() => {
    if (shootingStar.parentNode) {
      shootingStar.parentNode.removeChild(shootingStar);
    }
  }, speed * 1000);
}

/**
 * Check if an element is in the viewport
 * @param {HTMLElement} el - The element to check
 * @returns {boolean} - Whether the element is in viewport
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

/**
 * Apply holographic effect to an element
 * @param {HTMLElement} element - The element to apply effect to
 */
function applyHolographicEffect(element) {
  element.classList.add('holographic-effect');
  
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = x / rect.width;
    const yPercent = y / rect.height;
    
    const gradX = xPercent * 100;
    const gradY = yPercent * 100;
    
    element.style.background = `
      radial-gradient(circle at ${gradX}% ${gradY}%, 
        rgba(58, 134, 255, 0.3), 
        transparent 80%
      ),
      linear-gradient(135deg, rgba(26, 31, 46, 0.8), rgba(10, 14, 23, 0.8))
    `;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.background = '';
  });
}

/**
 * Initialize holographic effects from hologram ui
 */
function initHolographicEffects() {
  // Add required CSS keyframes if not present
  addMessagePulseKeyframes();
  
  // Initialize the main hologram if it exists
  const hologram = document.querySelector('.holographic-container');
  if (hologram) {
    initMainHologram(hologram);
  }
  
  // Initialize message hover effects
  initMessageEffects();
}

/**
 * Add message pulse keyframes to the document if not already present
 */
function addMessagePulseKeyframes() {
  if (!document.getElementById('message-pulse-keyframes')) {
    const style = document.createElement('style');
    style.id = 'message-pulse-keyframes';
    style.textContent = `
      @keyframes messagePulse {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(1.05); opacity: 0; }
      }
      
      @keyframes textGlow {
        0%, 100% { text-shadow: 0 0 5px rgba(111, 227, 255, 0.8), 0 0 10px rgba(111, 227, 255, 0.5); }
        50% { text-shadow: 0 0 15px rgba(111, 227, 255, 0.9), 0 0 25px rgba(111, 227, 255, 0.7); }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Initialize the main hologram container with effects
 * @param {HTMLElement} hologram - The hologram container element
 */
function initMainHologram(hologram) {
  // Create dynamic particles
  createDynamicParticles(hologram);
  
  // Add interaction effects
  hologram.addEventListener('mousemove', (e) => {
    const rect = hologram.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate angle based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angleX = (centerY - y) / 15;
    const angleY = (x - centerX) / 15;
    
    // Apply subtle 3D rotation
    hologram.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    
    // Add glow effect where mouse is
    const holographicText = hologram.querySelector('.holographic-text');
    if (holographicText) {
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
      const brightness = 1 - (distance / maxDistance) * 0.5;
      
      holographicText.style.textShadow = `
        0 0 5px rgba(111, 227, 255, ${brightness * 0.8}),
        0 0 10px rgba(111, 227, 255, ${brightness * 0.6}),
        0 0 15px rgba(111, 227, 255, ${brightness * 0.4}),
        0 0 20px rgba(111, 227, 255, ${brightness * 0.2})
      `;
    }
  });
  
  // Reset transform when mouse leaves
  hologram.addEventListener('mouseleave', () => {
    hologram.style.transform = '';
    const holographicText = hologram.querySelector('.holographic-text');
    if (holographicText) {
      holographicText.style.textShadow = '';
    }
  });
  
  // Add click effect
  hologram.addEventListener('click', () => {
    hologram.classList.add('model-switch-effect');
    setTimeout(() => {
      hologram.classList.remove('model-switch-effect');
    }, 1000);
  });
}

/**
 * Create dynamic particles for hologram
 * @param {HTMLElement} container - The container to add particles to
 */
function createDynamicParticles(container) {
  const particlesContainer = container.querySelector('.particles');
  if (!particlesContainer) return;
  
  // Clear existing particles
  particlesContainer.innerHTML = '';
  
  // Create new particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.width = `${Math.random() * 3 + 1}px`;
    particle.style.height = particle.style.width;
    
    // Randomize opacity
    particle.style.opacity = Math.random() * 0.7 + 0.3;
    
    particlesContainer.appendChild(particle);
  }
}

/**
 * Initialize message hover effects
 */
function initMessageEffects() {
  // Add glowing effect to messages on hover and 3D effect
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.holographic-message')) {
      const messageContent = e.target.closest('.holographic-message');
      
      // Add enhanced glow effect based on message type
      if (messageContent.closest('.ai-message')) {
        messageContent.style.boxShadow = '0 0 20px rgba(111, 227, 255, 0.3)';
      } else if (messageContent.closest('.user-message')) {
        messageContent.style.boxShadow = '0 0 20px rgba(155, 89, 182, 0.3)';
      } else if (messageContent.classList.contains('holographic-system-message')) {
        messageContent.style.boxShadow = '0 0 20px rgba(52, 152, 219, 0.3)';
      } else if (messageContent.classList.contains('holographic-error-message')) {
        messageContent.style.boxShadow = '0 0 20px rgba(231, 76, 60, 0.3)';
      } else {
        messageContent.style.boxShadow = '0 0 15px rgba(111, 227, 255, 0.2)';
      }
      
      // Add subtle 3D effect
      messageContent.style.transform = 'scale(1.01) translateZ(5px)';
      messageContent.style.transition = 'all 0.3s ease';
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.holographic-message')) {
      const messageContent = e.target.closest('.holographic-message');
      messageContent.style.boxShadow = '';
      messageContent.style.transform = '';
    }
  });
  
  // Add special interaction for holographic messages
  document.addEventListener('click', (e) => {
    if (e.target.closest('.holographic-message')) {
      const messageContent = e.target.closest('.holographic-message');
      
      // Add pulse effect on click
      const pulse = document.createElement('div');
      pulse.className = 'click-pulse';
      pulse.style.position = 'absolute';
      pulse.style.top = '0';
      pulse.style.left = '0';
      pulse.style.right = '0';
      pulse.style.bottom = '0';
      pulse.style.borderRadius = 'inherit';
      pulse.style.zIndex = '1';
      pulse.style.backgroundColor = 'rgba(111, 227, 255, 0.1)';
      pulse.style.transformOrigin = 'center';
      pulse.style.animation = 'messagePulse 0.6s ease-out forwards';
      
      if (messageContent.closest('.user-message')) {
        pulse.style.backgroundColor = 'rgba(155, 89, 182, 0.1)';
      }
      
      messageContent.appendChild(pulse);
      
      // Remove after animation
      setTimeout(() => {
        if (pulse.parentNode) {
          pulse.parentNode.removeChild(pulse);
        }
      }, 600);
    }
  });
}

/**
 * Initialize holographic cards with interactive effects
 */
function initHolographicCards() {
  // Add tilt effect to all holographic cards
  const cards = document.querySelectorAll('.holographic-card');
  
  cards.forEach(card => {
    // Add tilt effect on mousemove
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate percentages
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      // Calculate rotation angles (max 5 degrees)
      const rotateY = (xPercent - 0.5) * 10;
      const rotateX = (0.5 - yPercent) * 10;
      
      // Apply rotation
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      
      // Add dynamic shine effect
      const shine = card.querySelector('.shine-effect');
      if (!shine) {
        const shineElement = document.createElement('div');
        shineElement.classList.add('shine-effect');
        card.appendChild(shineElement);
      }
      
      if (shine || card.querySelector('.shine-effect')) {
        const shineEl = shine || card.querySelector('.shine-effect');
        shineEl.style.background = `radial-gradient(circle at ${xPercent * 100}% ${yPercent * 100}%, rgba(111, 227, 255, 0.2) 0%, rgba(111, 227, 255, 0) 50%)`;
      }
    });
    
    // Reset on mouseout
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
      
      // Remove shine effect
      const shine = card.querySelector('.shine-effect');
      if (shine) {
        shine.style.background = 'none';
      }
    });
    
    // Add click animation
    card.addEventListener('click', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(0.95)';
      
      setTimeout(() => {
        if (!card.matches(':hover')) {
          card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        } else {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          
          const xPercent = x / rect.width;
          const yPercent = y / rect.height;
          
          const rotateY = (xPercent - 0.5) * 10;
          const rotateX = (0.5 - yPercent) * 10;
          
          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
      }, 200);
    });
  });
}

/**
 * Initialize holographic buttons with interactive effects
 */
function initHolographicButtons() {
  // Add advanced holographic effects to all holographic buttons
  const buttons = document.querySelectorAll('.holographic-button');
  
  buttons.forEach(button => {
    // Create holographic glow effect
    const glow = document.createElement('div');
    glow.className = 'button-glow';
    glow.style.position = 'absolute';
    glow.style.top = '-5px';
    glow.style.left = '-5px';
    glow.style.right = '-5px';
    glow.style.bottom = '-5px';
    glow.style.borderRadius = 'inherit';
    glow.style.background = 'radial-gradient(circle at center, rgba(111, 227, 255, 0.3) 0%, transparent 70%)';
    glow.style.opacity = '0';
    glow.style.transition = 'opacity 0.3s ease';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '-1';
    
    // Add glow to button if not already present
    if (!button.querySelector('.button-glow')) {
      button.style.position = 'relative';
      button.appendChild(glow);
    }
    
    // Add pulsing glow on hover with 3D effect
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateZ(15px) scale(1.08)';
      button.style.boxShadow = '0 0 20px rgba(111, 227, 255, 0.3), 0 0 10px rgba(111, 227, 255, 0.2)';
      const buttonGlow = button.querySelector('.button-glow');
      if (buttonGlow) {
        buttonGlow.style.opacity = '1';
      }
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
      button.style.boxShadow = '';
      const buttonGlow = button.querySelector('.button-glow');
      if (buttonGlow) {
        buttonGlow.style.opacity = '0';
      }
    });
    
    // Add click effect
    button.addEventListener('click', () => {
      button.style.transform = 'translateZ(5px) scale(0.95)';
      button.style.boxShadow = '0 0 10px rgba(111, 227, 255, 0.2)';
      
      setTimeout(() => {
        if (button.matches(':hover')) {
          button.style.transform = 'translateZ(15px) scale(1.08)';
          button.style.boxShadow = '0 0 20px rgba(111, 227, 255, 0.3), 0 0 10px rgba(111, 227, 255, 0.2)';
        } else {
          button.style.transform = '';
          button.style.boxShadow = '';
        }
      }, 300);
    });
  });
}
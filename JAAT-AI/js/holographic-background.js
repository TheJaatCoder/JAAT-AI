/**
 * JAAT-AI Holographic Background
 * Creates an animated holographic background effect
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the holographic background
  initHolographicBackground();
});

/**
 * Initialize the holographic background
 */
function initHolographicBackground() {
  // Get background container
  const background = document.querySelector('.holographic-background');
  const particlesContainer = document.querySelector('.floating-particles');
  const dataStreamsContainer = document.querySelector('.data-streams');
  
  if (!background || !particlesContainer || !dataStreamsContainer) return;
  
  // Create particles
  createParticles(particlesContainer, 50);
  
  // Create data streams
  createDataStreams(dataStreamsContainer, 20);
  
  // Create floating effect for entire background
  animateBackground(background);
}

/**
 * Create floating particles
 * @param {HTMLElement} container - The container to add particles to
 * @param {number} count - The number of particles to create
 */
function createParticles(container, count) {
  // Clear container
  container.innerHTML = '';
  
  // Create CSS for particles
  const style = document.createElement('style');
  style.textContent = `
    .particle {
      position: absolute;
      width: 3px;
      height: 3px;
      background-color: rgba(84, 100, 247, 0.5);
      border-radius: 50%;
      pointer-events: none;
      filter: blur(1px);
      box-shadow: 0 0 6px rgba(84, 100, 247, 0.7);
    }
    
    .particle.blue {
      background-color: rgba(60, 108, 255, 0.5);
      box-shadow: 0 0 6px rgba(60, 108, 255, 0.7);
    }
    
    .particle.teal {
      background-color: rgba(62, 255, 189, 0.5);
      box-shadow: 0 0 6px rgba(62, 255, 189, 0.7);
    }
    
    .particle.purple {
      background-color: rgba(168, 145, 255, 0.5);
      box-shadow: 0 0 6px rgba(168, 145, 255, 0.7);
    }
    
    @keyframes float {
      0% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(var(--x-offset), var(--y-offset));
      }
      100% {
        transform: translate(0, 0);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Create particles
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Randomize color
    const colors = ['blue', 'teal', 'purple'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.classList.add(randomColor);
    
    // Randomize size
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Randomize position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    
    // Randomize animation
    const xOffset = (Math.random() * 40 - 20) + 'px';
    const yOffset = (Math.random() * 40 - 20) + 'px';
    particle.style.setProperty('--x-offset', xOffset);
    particle.style.setProperty('--y-offset', yOffset);
    
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    // Add to container
    container.appendChild(particle);
  }
}

/**
 * Create data streams
 * @param {HTMLElement} container - The container to add data streams to
 * @param {number} count - The number of data streams to create
 */
function createDataStreams(container, count) {
  // Clear container
  container.innerHTML = '';
  
  // Create CSS for data streams
  const style = document.createElement('style');
  style.textContent = `
    .data-stream {
      position: absolute;
      width: 1px;
      background: linear-gradient(to bottom, 
        rgba(84, 100, 247, 0) 0%,
        rgba(84, 100, 247, 0.5) 50%,
        rgba(84, 100, 247, 0) 100%);
      pointer-events: none;
      overflow: hidden;
      opacity: 0.2;
    }
    
    .data-stream.blue {
      background: linear-gradient(to bottom, 
        rgba(60, 108, 255, 0) 0%,
        rgba(60, 108, 255, 0.5) 50%,
        rgba(60, 108, 255, 0) 100%);
    }
    
    .data-stream.teal {
      background: linear-gradient(to bottom, 
        rgba(62, 255, 189, 0) 0%,
        rgba(62, 255, 189, 0.5) 50%,
        rgba(62, 255, 189, 0) 100%);
    }
    
    .data-stream.purple {
      background: linear-gradient(to bottom, 
        rgba(168, 145, 255, 0) 0%,
        rgba(168, 145, 255, 0.5) 50%,
        rgba(168, 145, 255, 0) 100%);
    }
    
    @keyframes stream {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100vh);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Create data streams
  for (let i = 0; i < count; i++) {
    const stream = document.createElement('div');
    stream.className = 'data-stream';
    
    // Randomize color
    const colors = ['blue', 'teal', 'purple'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    stream.classList.add(randomColor);
    
    // Randomize position
    const x = Math.random() * 100;
    stream.style.left = `${x}%`;
    
    // Randomize height
    const height = Math.random() * 100 + 50;
    stream.style.height = `${height}px`;
    
    // Randomize animation
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    
    stream.style.animation = `stream ${duration}s linear ${delay}s infinite`;
    
    // Add to container
    container.appendChild(stream);
  }
}

/**
 * Create floating effect for the entire background
 * @param {HTMLElement} background - The background element
 */
function animateBackground(background) {
  // Add subtle animation to the background
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-background {
      0% {
        background-position: 0% 0%;
      }
      50% {
        background-position: 2% 1%;
      }
      100% {
        background-position: 0% 0%;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Apply animation
  background.style.animation = 'float-background 30s ease-in-out infinite';
  
  // Add parallax effect on mouse move
  document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const xOffset = 10 * (x - 0.5);
    const yOffset = 10 * (y - 0.5);
    
    background.style.backgroundPosition = `calc(50% + ${xOffset}px) calc(50% + ${yOffset}px)`;
    
    // Move particles container with mouse
    const particlesContainer = document.querySelector('.floating-particles');
    if (particlesContainer) {
      particlesContainer.style.transform = `translate(${xOffset / 2}px, ${yOffset / 2}px)`;
    }
  });
}
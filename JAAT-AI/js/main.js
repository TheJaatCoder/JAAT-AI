/**
 * JAAT-AI Main Script
 * Central script for the JAAT-AI application
 */

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

/**
 * Initialize the main application
 */
function initializeApp() {
  // Initialize background animations
  initBackgroundAnimations();
  
  // Initialize mobile menu toggle
  initMobileMenu();
  
  // Handle URL parameters
  handleURLParameters();
  
  // Handle user login status
  checkLoginStatus();
}

/**
 * Initialize background animations
 */
function initBackgroundAnimations() {
  // Initialize particles.js if the container exists
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer && window.particlesJS) {
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#3b82f6"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#3b82f6",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
  
  // Initialize star background if the container exists
  const starsContainer = document.querySelector('.stars-container');
  if (starsContainer) {
    createStars(starsContainer);
    
    // Create shooting stars occasionally
    setInterval(() => {
      if (Math.random() < 0.3) {
        createShootingStar(starsContainer);
      }
    }, 5000);
  }
}

/**
 * Create stars in the background
 * @param {HTMLElement} container - The container for stars
 */
function createStars(container) {
  const count = window.innerWidth < 768 ? 100 : 200;
  
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    
    // Random size
    const size = Math.random() * 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random opacity
    star.style.opacity = Math.random() * 0.8 + 0.2;
    
    // Random animation delay
    star.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(star);
  }
}

/**
 * Create shooting star animation
 * @param {HTMLElement} container - The container for the shooting star
 */
function createShootingStar(container) {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  
  // Random position - always start from the top left quadrant
  star.style.top = `${Math.random() * 50}%`;
  star.style.left = `${Math.random() * 50}%`;
  
  // Random angle
  const angle = Math.random() * 30 + 15; // 15-45 degrees
  star.style.transform = `rotate(${angle}deg)`;
  
  container.appendChild(star);
  
  // Remove after animation completes
  setTimeout(() => {
    star.remove();
  }, 1000);
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }
}

/**
 * Handle URL parameters
 */
function handleURLParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Check for error parameter
  const error = urlParams.get('error');
  if (error) {
    // Display error message
    showNotification(error, 'error');
    
    // Remove the parameter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('error');
    window.history.replaceState({}, document.title, url);
  }
  
  // Check for success parameter
  const success = urlParams.get('success');
  if (success) {
    // Display success message
    showNotification(success, 'success');
    
    // Remove the parameter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('success');
    window.history.replaceState({}, document.title, url);
  }
}

/**
 * Show notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
  // Create notification container if it doesn't exist
  let container = document.querySelector('.notification-container');
  
  if (!container) {
    container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
      }
      
      .notification {
        padding: 15px 20px;
        margin-bottom: 10px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
        animation: notification-slide-in 0.3s ease-out forwards;
        max-width: 350px;
      }
      
      .notification.success {
        background: rgba(16, 185, 129, 0.1);
        border-left: 4px solid #10b981;
        color: #10b981;
      }
      
      .notification.error {
        background: rgba(239, 68, 68, 0.1);
        border-left: 4px solid #ef4444;
        color: #ef4444;
      }
      
      .notification.info {
        background: rgba(59, 130, 246, 0.1);
        border-left: 4px solid #3b82f6;
        color: #3b82f6;
      }
      
      @keyframes notification-slide-in {
        0% {
          transform: translateX(100%);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes notification-slide-out {
        0% {
          transform: translateX(0);
          opacity: 1;
        }
        100% {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add to container
  container.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'notification-slide-out 0.3s ease-out forwards';
    
    notification.addEventListener('animationend', () => {
      notification.remove();
    });
  }, 5000);
}

/**
 * Check user login status
 */
function checkLoginStatus() {
  // Check if auth system is available
  if (window.authSystem) {
    window.authSystem.checkAuthStatus();
  }
}
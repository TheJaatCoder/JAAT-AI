/**
 * JAAT-AI Homepage JavaScript
 * Handles functionality for the JAAT-AI homepage
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize holographic cube animation
  initHolographicCube();
  
  // Initialize scroll effects
  initScrollEffects();
  
  // Initialize the testimonials slider
  initTestimonialsSlider();
});

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      
      // Add mobile menu styles if they don't exist
      if (!document.getElementById('mobile-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-menu-styles';
        style.textContent = `
          .main-nav.active {
            display: block;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: var(--bg-dark);
            padding: 20px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            z-index: 100;
            animation: slideDown 0.3s ease forwards;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .main-nav.active ul {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .main-nav.active li {
            width: 100%;
            margin-bottom: 15px;
          }
          
          .main-nav.active .btn-login,
          .main-nav.active .btn-signup {
            display: inline-block;
            width: 100%;
            text-align: center;
            margin-top: 10px;
          }
        `;
        document.head.appendChild(style);
      }
    });
  }
}

/**
 * Initialize the holographic cube animation
 */
function initHolographicCube() {
  const cube = document.querySelector('.holographic-cube');
  
  if (cube) {
    // Add cube animation pause on hover
    cube.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
    });
    
    cube.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
    });
    
    // Add glow effect to cube faces
    const faces = document.querySelectorAll('.cube-face');
    faces.forEach(face => {
      face.innerHTML = '<div class="cube-glow"></div>';
      
      // Add CSS for glow effect if it doesn't exist
      if (!document.getElementById('cube-glow-styles')) {
        const style = document.createElement('style');
        style.id = 'cube-glow-styles';
        style.textContent = `
          .cube-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(84, 100, 247, 0.3) 0%, rgba(84, 100, 247, 0) 70%);
            opacity: 0.7;
            animation: pulse-glow 3s infinite alternate;
          }
          
          @keyframes pulse-glow {
            0% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            100% {
              opacity: 0.7;
              transform: scale(1.1);
            }
          }
        `;
        document.head.appendChild(style);
      }
    });
  }
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
  // Add header scroll effect
  const header = document.querySelector('.site-header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(13, 15, 27, 0.95)';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.padding = '16px 0';
        header.style.backgroundColor = 'rgba(13, 15, 27, 0.8)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      }
    });
  }
  
  // Add reveal animation for sections
  const sections = document.querySelectorAll('section');
  
  // Add CSS for scroll reveal if it doesn't exist
  if (!document.getElementById('scroll-reveal-styles')) {
    const style = document.createElement('style');
    style.id = 'scroll-reveal-styles';
    style.textContent = `
      .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .reveal.active {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    
    // Add reveal class to all sections
    sections.forEach(section => {
      if (!section.classList.contains('hero-section')) {
        section.classList.add('reveal');
      }
    });
  }
  
  // Reveal sections on scroll
  function revealSections() {
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (sectionTop < windowHeight - revealPoint) {
        section.classList.add('active');
      }
    });
  }
  
  // Initial check on page load
  revealSections();
  
  // Check on scroll
  window.addEventListener('scroll', revealSections);
}

/**
 * Initialize the testimonials slider
 */
function initTestimonialsSlider() {
  const slider = document.querySelector('.testimonials-slider');
  const testimonials = document.querySelectorAll('.testimonial');
  
  if (slider && testimonials.length > 1) {
    // If there are multiple testimonials, add automatic sliding
    let currentIndex = 0;
    
    // Add CSS for slider if it doesn't exist
    if (!document.getElementById('slider-styles')) {
      const style = document.createElement('style');
      style.id = 'slider-styles';
      style.textContent = `
        .testimonials-slider {
          overflow: hidden;
          position: relative;
        }
        
        .testimonial {
          opacity: 0.4;
          transform: scale(0.9);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .testimonial.active {
          opacity: 1;
          transform: scale(1);
        }
        
        @media (max-width: 768px) {
          .testimonials-slider {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Set initial active testimonial
    testimonials[currentIndex].classList.add('active');
    
    // Create slider navigation if more than one testimonial
    if (testimonials.length > 1) {
      const navContainer = document.createElement('div');
      navContainer.className = 'slider-nav';
      navContainer.style.display = 'flex';
      navContainer.style.justifyContent = 'center';
      navContainer.style.gap = '10px';
      navContainer.style.marginTop = '20px';
      
      for (let i = 0; i < testimonials.length; i++) {
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.borderRadius = '50%';
        dot.style.background = i === 0 ? 'var(--primary)' : 'var(--text-muted)';
        dot.style.border = 'none';
        dot.style.cursor = 'pointer';
        dot.style.transition = 'background 0.3s ease';
        
        dot.addEventListener('click', function() {
          goToSlide(i);
        });
        
        navContainer.appendChild(dot);
      }
      
      slider.parentNode.appendChild(navContainer);
    }
    
    // Function to go to a specific slide
    function goToSlide(index) {
      // Remove active class from all testimonials
      testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
      });
      
      // Update current index
      currentIndex = index;
      
      // Add active class to current testimonial
      testimonials[currentIndex].classList.add('active');
      
      // Update navigation dots
      const dots = document.querySelectorAll('.slider-dot');
      if (dots.length) {
        dots.forEach((dot, i) => {
          dot.style.background = i === currentIndex ? 'var(--primary)' : 'var(--text-muted)';
        });
      }
    }
    
    // Auto-scroll function
    function autoScroll() {
      let nextIndex = (currentIndex + 1) % testimonials.length;
      goToSlide(nextIndex);
    }
    
    // Start auto-scroll
    let interval = setInterval(autoScroll, 5000);
    
    // Pause auto-scroll on hover
    slider.addEventListener('mouseenter', function() {
      clearInterval(interval);
    });
    
    // Resume auto-scroll on mouse leave
    slider.addEventListener('mouseleave', function() {
      interval = setInterval(autoScroll, 5000);
    });
  }
}
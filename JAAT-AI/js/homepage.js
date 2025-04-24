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
      
      .scroll-indicator {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: rgba(84, 100, 247, 0.2);
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(5px);
        z-index: 100;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }
      
      .scroll-indicator:hover {
        background: rgba(84, 100, 247, 0.4);
        transform: translateY(-3px);
      }
      
      .scroll-indicator.up {
        bottom: 90px;
      }
      
      .scroll-to-top {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      
      .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-10px);
        }
        60% {
          transform: translateY(-5px);
        }
      }
    `;
    document.head.appendChild(style);
    
    // Add reveal class to all sections
    sections.forEach(section => {
      if (!section.classList.contains('hero-section')) {
        section.classList.add('reveal');
      }
    });
    
    // Add scroll indicators
    addScrollIndicators();
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
    
    // Show/hide scroll to top button
    updateScrollToTop();
  }
  
  // Initial check on page load
  revealSections();
  
  // Check on scroll
  window.addEventListener('scroll', revealSections);
  
  // Initialize auto-scrolling
  initAutoScroll();
}

/**
 * Add scroll indicators to the page
 */
function addScrollIndicators() {
  const body = document.body;
  
  // Create scroll down indicator
  const scrollDownIndicator = document.createElement('div');
  scrollDownIndicator.className = 'scroll-indicator down';
  scrollDownIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
  scrollDownIndicator.addEventListener('click', () => {
    scrollToNextSection();
  });
  
  // Create scroll up indicator
  const scrollUpIndicator = document.createElement('div');
  scrollUpIndicator.className = 'scroll-indicator up scroll-to-top';
  scrollUpIndicator.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollUpIndicator.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Add indicators to the page
  body.appendChild(scrollDownIndicator);
  body.appendChild(scrollUpIndicator);
  
  // Add animation to scroll down indicator
  scrollDownIndicator.style.animation = 'bounce 2s infinite';
}

/**
 * Scroll to the next section
 */
function scrollToNextSection() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  
  // Find the next section
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    // If the current scroll position is above the middle of this section,
    // scroll to this section
    if (scrollPosition < sectionTop + (section.offsetHeight / 2)) {
      section.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  }
  
  // If we're at the bottom, scroll to the top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * Update the scroll to top button visibility
 */
function updateScrollToTop() {
  const scrollUpIndicator = document.querySelector('.scroll-to-top');
  
  if (scrollUpIndicator) {
    if (window.scrollY > window.innerHeight) {
      scrollUpIndicator.classList.add('visible');
    } else {
      scrollUpIndicator.classList.remove('visible');
    }
  }
}

/**
 * Initialize auto-scrolling
 */
function initAutoScroll() {
  // Set up auto-scroll for testimonials
  const testimonials = document.querySelectorAll('.testimonial');
  if (testimonials.length > 1) {
    // Add CSS for auto-scrolling testimonials
    if (!document.getElementById('auto-scroll-styles')) {
      const style = document.createElement('style');
      style.id = 'auto-scroll-styles';
      style.textContent = `
        .testimonials-slider {
          position: relative;
          overflow: hidden;
          height: 280px;
        }
        
        .testimonial {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          opacity: 0;
          transform: translateX(100px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .testimonial.active {
          opacity: 1;
          transform: translateX(0);
        }
        
        .testimonial.prev {
          opacity: 0;
          transform: translateX(-100px);
        }
      `;
      document.head.appendChild(style);
    }
    
    // Set initial active testimonial
    testimonials[0].classList.add('active');
    
    // Auto-scroll testimonials
    let currentTestimonial = 0;
    setInterval(() => {
      // Remove active class from current testimonial
      testimonials[currentTestimonial].classList.remove('active');
      testimonials[currentTestimonial].classList.add('prev');
      
      // Update current testimonial index
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      
      // Remove prev class from all testimonials
      testimonials.forEach((testimonial, index) => {
        if (index !== currentTestimonial - 1 && index !== testimonials.length - 1) {
          testimonial.classList.remove('prev');
        }
      });
      
      // Add active class to next testimonial
      testimonials[currentTestimonial].classList.remove('prev');
      testimonials[currentTestimonial].classList.add('active');
    }, 5000);
  }
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
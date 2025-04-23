/**
 * Landing Page JavaScript for JAAT-AI
 * Created by Rohit Sangwan
 *
 * Provides interactive functionality for the JAAT-AI landing page
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Initialize holographic effects
  if (typeof window.initHolographicEffects === 'function') {
    window.initHolographicEffects();
  }
  
  // Header scroll effect
  const header = document.querySelector('.main-header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.style.padding = '1rem 0';
      header.style.backdropFilter = 'blur(15px)';
      header.style.borderBottom = '1px solid rgba(0, 172, 239, 0.1)';
    } else {
      header.style.padding = '1.5rem 0';
      header.style.backdropFilter = 'blur(10px)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      
      if (!expanded) {
        mainNav.style.display = 'block';
        mainNav.style.position = 'absolute';
        mainNav.style.top = '100%';
        mainNav.style.left = '0';
        mainNav.style.width = '100%';
        mainNav.style.padding = '1rem';
        mainNav.style.backgroundColor = 'rgba(5, 13, 20, 0.95)';
        mainNav.style.backdropFilter = 'blur(10px)';
        mainNav.style.borderBottom = '1px solid rgba(0, 172, 239, 0.1)';
        mainNav.style.zIndex = '1000';
        
        // Convert horizontal menu to vertical
        const navUl = mainNav.querySelector('ul');
        if (navUl) {
          navUl.style.flexDirection = 'column';
          navUl.style.gap = '1rem';
        }
      } else {
        mainNav.style.display = '';
        mainNav.style.position = '';
        mainNav.style.top = '';
        mainNav.style.left = '';
        mainNav.style.width = '';
        mainNav.style.padding = '';
        mainNav.style.backgroundColor = '';
        mainNav.style.backdropFilter = '';
        mainNav.style.borderBottom = '';
        mainNav.style.zIndex = '';
        
        // Reset menu styles
        const navUl = mainNav.querySelector('ul');
        if (navUl) {
          navUl.style.flexDirection = '';
          navUl.style.gap = '';
        }
      }
    });
  }
  
  // Testimonial slider
  const testimonialSlider = document.querySelector('.testimonials-slider');
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.control-dots .dot');
  const prevBtn = document.querySelector('.control-btn.prev');
  const nextBtn = document.querySelector('.control-btn.next');
  
  if (testimonialSlider && testimonials.length > 0) {
    let currentSlide = 0;
    const maxSlide = testimonials.length - 1;
    
    // Function to go to slide
    function goToSlide(slideIndex) {
      testimonialSlider.style.transform = `translateX(-${slideIndex * 100}%)`;
      
      // Update active dot
      dots.forEach((dot, index) => {
        if (index === slideIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
      
      currentSlide = slideIndex;
    }
    
    // Previous slide button
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        if (currentSlide === 0) {
          goToSlide(maxSlide);
        } else {
          goToSlide(currentSlide - 1);
        }
      });
    }
    
    // Next slide button
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (currentSlide === maxSlide) {
          goToSlide(0);
        } else {
          goToSlide(currentSlide + 1);
        }
      });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        goToSlide(index);
      });
    });
    
    // Auto slide
    let slideInterval = setInterval(function() {
      if (currentSlide === maxSlide) {
        goToSlide(0);
      } else {
        goToSlide(currentSlide + 1);
      }
    }, 5000);
    
    // Pause auto slide on hover
    testimonialSlider.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
      slideInterval = setInterval(function() {
        if (currentSlide === maxSlide) {
          goToSlide(0);
        } else {
          goToSlide(currentSlide + 1);
        }
      }, 5000);
    });
  }
  
  // Smooth scrolling for navigation
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      if (window.innerWidth < 992 && mainNav.style.display === 'block') {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mainNav.style.display = '';
        mainNav.style.position = '';
        mainNav.style.top = '';
        mainNav.style.left = '';
        mainNav.style.width = '';
        mainNav.style.padding = '';
        mainNav.style.backgroundColor = '';
        mainNav.style.backdropFilter = '';
        mainNav.style.borderBottom = '';
        mainNav.style.zIndex = '';
        
        // Reset menu styles
        const navUl = mainNav.querySelector('ul');
        if (navUl) {
          navUl.style.flexDirection = '';
          navUl.style.gap = '';
        }
      }
    });
  });
  
  // Category tabs interaction
  const categoryTabs = document.querySelectorAll('.category-tab');
  
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      categoryTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // In a real implementation, this would filter the modes
      const category = this.dataset.category;
    });
  });
  
  // Animation on scroll
  const animateElements = document.querySelectorAll('.feature-card, .mode-card, .pricing-card');
  
  function checkIfInView() {
    const windowHeight = window.innerHeight;
    const windowTop = window.pageYOffset;
    const windowBottom = windowTop + windowHeight;
    
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top + windowTop;
      const elementBottom = elementTop + element.offsetHeight;
      
      if (elementBottom > windowTop && elementTop < windowBottom) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Set initial state for animation
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Check elements on load
  window.addEventListener('load', checkIfInView);
  
  // Check elements on scroll
  window.addEventListener('scroll', checkIfInView);
  
  // Pricing toggle
  const billingToggle = document.getElementById('billing-toggle');
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  if (billingToggle && pricingCards.length > 0) {
    billingToggle.addEventListener('change', function() {
      if (this.checked) {
        // Annually
        pricingCards[1].querySelector('.price').textContent = '$15';
        pricingCards[1].querySelector('.period').textContent = '/month';
        pricingCards[2].querySelector('.price').textContent = '$79';
        pricingCards[2].querySelector('.period').textContent = '/month';
      } else {
        // Monthly
        pricingCards[1].querySelector('.price').textContent = '$19';
        pricingCards[1].querySelector('.period').textContent = '/month';
        pricingCards[2].querySelector('.price').textContent = '$99';
        pricingCards[2].querySelector('.period').textContent = '/month';
      }
    });
  }
  
  // Modal functionality
  const signUpBtn = document.querySelector('.sign-up-btn');
  const signupModal = document.getElementById('signup-modal');
  const modalClose = document.querySelector('.modal-close');
  
  if (signUpBtn && signupModal) {
    signUpBtn.addEventListener('click', function(e) {
      e.preventDefault();
      signupModal.classList.add('active');
    });
  }
  
  if (modalClose && signupModal) {
    modalClose.addEventListener('click', function() {
      signupModal.classList.remove('active');
    });
  }
  
  // Close modal on outside click
  window.addEventListener('click', function(e) {
    if (e.target === signupModal) {
      signupModal.classList.remove('active');
    }
  });
  
  // Escape key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && signupModal.classList.contains('active')) {
      signupModal.classList.remove('active');
    }
  });
  
  // Form submission
  const signupForm = document.querySelector('.signup-form');
  
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, this would handle form submission
      // For demo purposes, just close the modal
      signupModal.classList.remove('active');
      
      // Show success notification
      showNotification('Account created successfully!', 'success');
    });
  }
  
  // Notification function
  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Apply holographic effect
    if (typeof window.applyHolographicEffect === 'function') {
      window.applyHolographicEffect(notification);
    }
    
    // Animate in
    setTimeout(() => {
      notification.classList.add('visible');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('visible');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }
  
  // Redirect "Try Free Mode" buttons to the app interface
  const appLinks = document.querySelectorAll('a[href="app.html"]');
  appLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'jaat-ai-app';
    });
  });
});
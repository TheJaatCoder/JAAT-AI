/**
 * JAAT-AI Home Page
 * Manages interactions and animations specific to the home page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize home page functionality
    initHomePage();
});

function initHomePage() {
    // Add scroll event to change header on scroll
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize staggered animations for features and modes sections
    initSectionAnimations();
    
    // Handle smooth scrolling for navigation links
    initSmoothScrolling();
    
    console.log('JAAT-AI Home Page initialized');
}

/**
 * Change header appearance on scroll
 */
function handleHeaderScroll() {
    const header = document.querySelector('.home-header');
    if (!header) return;
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

/**
 * Setup mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('visible');
        menuToggle.classList.toggle('active');
        
        // Toggle between menu and close icon
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('ri-menu-line')) {
            icon.classList.remove('ri-menu-line');
            icon.classList.add('ri-close-line');
        } else {
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mainNav.classList.contains('visible') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.mobile-menu-toggle')) {
            mainNav.classList.remove('visible');
            menuToggle.classList.remove('active');
            
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        }
    });
    
    // Close menu when clicking a nav link (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                mainNav.classList.remove('visible');
                menuToggle.classList.remove('active');
                
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });
    });
}

/**
 * Setup animations for sections
 */
function initSectionAnimations() {
    // Staggered animations for features cards
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        featureCards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // Staggered animations for mode cards
    const modeCards = document.querySelectorAll('.mode-card');
    if (modeCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        modeCards.forEach(card => {
            observer.observe(card);
        });
    }
}

/**
 * Handle smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.home-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Handle user authentication on home page
 */
function setupAuthUI() {
    // Check if AuthManager is available (auth.js must be loaded)
    if (typeof AuthManager !== 'undefined') {
        // Auth is handled by AuthManager
        console.log('Auth manager detected');
    } else {
        console.warn('Auth manager not loaded');
        
        // Simplified auth for home page if auth.js isn't loaded
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', () => {
                console.log('Login clicked, redirecting to app');
                window.location.href = 'index.html';
            });
        }
    }
}
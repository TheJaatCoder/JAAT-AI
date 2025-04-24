/**
 * JAAT-AI Authentication JavaScript
 * Handles functionality for login and signup pages
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize password toggles
  initPasswordToggles();
  
  // Initialize password strength meter
  initPasswordStrength();
  
  // Initialize form submission
  initFormSubmission();
});

/**
 * Initialize password toggle functionality
 */
function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.toggle-password');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
}

/**
 * Initialize password strength meter
 */
function initPasswordStrength() {
  const passwordInput = document.getElementById('password');
  const strengthLevel = document.querySelector('.strength-level');
  const strengthText = document.querySelector('.strength-text');
  
  if (!passwordInput || !strengthLevel || !strengthText) return;
  
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = calculatePasswordStrength(password);
    
    // Update strength level
    strengthLevel.setAttribute('data-level', strength);
    
    // Update strength text
    const strengthLabels = ['Empty', 'Weak', 'Fair', 'Good', 'Strong'];
    strengthText.textContent = `Password strength: ${strengthLabels[strength]}`;
  });
}

/**
 * Calculate password strength
 * @param {string} password - The password to check
 * @returns {number} - Strength level from 0 to 4
 */
function calculatePasswordStrength(password) {
  if (!password) return 0;
  
  // Calculate score based on various criteria
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Normalize score to 0-4
  return Math.min(4, Math.floor(score / 2));
}

/**
 * Initialize form submission
 */
function initFormSubmission() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignupSubmit);
  }
}

/**
 * Handle login form submission
 * @param {Event} e - Form submit event
 */
async function handleLoginSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('remember-me')?.checked;
  
  try {
    // Show loading state
    toggleFormLoading(true);
    
    // Send login request
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        rememberMe
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed. Please check your credentials.');
    }
    
    // Login successful
    window.location.href = '/dashboard.html';
  } catch (error) {
    showFormError(error.message);
  } finally {
    toggleFormLoading(false);
  }
}

/**
 * Handle signup form submission
 * @param {Event} e - Form submit event
 */
async function handleSignupSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const agreeTerms = document.getElementById('agree-terms')?.checked;
  
  // Validate form
  if (password !== confirmPassword) {
    showFormError('Passwords do not match');
    return;
  }
  
  if (!agreeTerms) {
    showFormError('You must agree to the Terms of Service and Privacy Policy');
    return;
  }
  
  try {
    // Show loading state
    toggleFormLoading(true);
    
    // Send signup request
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Sign up failed. Please try again.');
    }
    
    // Sign up successful
    window.location.href = '/dashboard.html';
  } catch (error) {
    showFormError(error.message);
  } finally {
    toggleFormLoading(false);
  }
}

/**
 * Toggle form loading state
 * @param {boolean} isLoading - Whether the form is loading
 */
function toggleFormLoading(isLoading) {
  const submitButton = document.querySelector('button[type="submit"]');
  
  if (submitButton) {
    if (isLoading) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
    } else {
      submitButton.disabled = false;
      submitButton.textContent = submitButton.dataset.originalText || (document.getElementById('login-form') ? 'Log In' : 'Create Account');
    }
  }
}

/**
 * Show form error message
 * @param {string} message - Error message to display
 */
function showFormError(message) {
  // Check if error container already exists
  let errorContainer = document.querySelector('.form-error');
  
  if (!errorContainer) {
    // Create error container
    errorContainer = document.createElement('div');
    errorContainer.className = 'form-error';
    errorContainer.style.color = 'var(--error)';
    errorContainer.style.marginBottom = 'var(--spacing-md)';
    errorContainer.style.padding = 'var(--spacing-sm)';
    errorContainer.style.backgroundColor = 'rgba(255, 77, 106, 0.1)';
    errorContainer.style.borderRadius = 'var(--radius-sm)';
    errorContainer.style.borderLeft = '3px solid var(--error)';
    
    // Insert before submit button
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.parentNode.insertBefore(errorContainer, submitButton);
  }
  
  // Set error message
  errorContainer.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
  
  // Add animation
  errorContainer.style.animation = 'none';
  setTimeout(() => {
    errorContainer.style.animation = 'shake 0.5s';
  }, 10);
  
  // Add shake animation style if it doesn't exist
  if (!document.getElementById('error-animation-style')) {
    const style = document.createElement('style');
    style.id = 'error-animation-style';
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Handle social authentication
 * @param {string} provider - The authentication provider
 */
function handleSocialAuth(provider) {
  // Implement social authentication handling
}
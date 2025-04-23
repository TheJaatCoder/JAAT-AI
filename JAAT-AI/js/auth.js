/**
 * JAAT-AI Authentication System
 * Handles user login, registration, and session management
 * Supports both form-based and Google OAuth login
 */

// Initialize the auth system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initAuthSystem();
  checkAuthStatus();
  setupAuthForms();
  setupSocialLogin();
});

/**
 * Initialize the authentication system
 */
function initAuthSystem() {
  // Set up auth-related button listeners
  const loginButtons = document.querySelectorAll('.btn-login, [data-action="login"]');
  loginButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  });
  
  const signupButtons = document.querySelectorAll('.btn-signup, [data-action="signup"]');
  signupButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = 'register.html';
    });
  });
  
  const logoutButtons = document.querySelectorAll('[data-action="logout"]');
  logoutButtons.forEach(button => {
    button.addEventListener('click', handleLogout);
  });
  
  // Check for authentication errors in URL parameters
  checkAuthErrors();
  
  // Update UI based on authentication status
  updateUIBasedOnAuth();
}

/**
 * Check for authentication errors in URL parameters
 */
function checkAuthErrors() {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error');
  
  if (error) {
    let errorMessage = 'Authentication error occurred. Please try again.';
    
    switch (error) {
      case 'invalid_state':
        errorMessage = 'Security validation failed. Please try again.';
        break;
      case 'no_code':
        errorMessage = 'Authorization code missing. Please try again.';
        break;
      case 'curl_error':
        errorMessage = 'Connection error. Please try again later.';
        break;
      case 'token_error':
        errorMessage = 'Could not retrieve authentication token. Please try again.';
        break;
      case 'user_info_error':
        errorMessage = 'Could not retrieve user information. Please try again.';
        break;
      case 'user_creation_error':
        errorMessage = 'Could not create user account. Please try again.';
        break;
      case 'user_retrieval_error':
        errorMessage = 'Could not retrieve user account. Please try again.';
        break;
      case 'invalid_credentials':
        errorMessage = 'Invalid email or password.';
        break;
    }
    
    showAuthError(errorMessage);
    
    // Remove error parameter from URL to prevent showing error again on refresh
    const url = new URL(window.location.href);
    url.searchParams.delete('error');
    window.history.replaceState({}, document.title, url);
  }
}

/**
 * Set up social login buttons
 */
function setupSocialLogin() {
  // Google login button
  const googleButtons = document.querySelectorAll('.social-button[data-provider="google"]');
  googleButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = 'google_login.php';
    });
  });
  
  // Other social login buttons can be added here
}

/**
 * Check authentication status via server-side session
 * @returns {Object|null} - The user object or null
 */
function checkAuthStatus() {
  // First check auth cookie
  if (document.cookie.includes('auth_token=')) {
    // We have an auth token, check server session
    checkServerSession();
  } else {
    // No auth token, check localStorage fallback
    const user = getLocalUser();
    updateUIBasedOnAuth(user);
  }
}

/**
 * Check server-side session via AJAX
 */
function checkServerSession() {
  // Create XHR request
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'check_session.php', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        const response = JSON.parse(xhr.responseText);
        
        if (response.authenticated) {
          // Update local storage with user data
          localStorage.setItem('current_user', JSON.stringify(response.user));
          updateUIBasedOnAuth(response.user);
        } else {
          // Not authenticated on server, clear local storage
          localStorage.removeItem('current_user');
          updateUIBasedOnAuth(null);
        }
      } catch (error) {
        console.error('Error parsing session response:', error);
        // Fallback to local storage
        const user = getLocalUser();
        updateUIBasedOnAuth(user);
      }
    } else {
      console.error('Session check failed:', xhr.status);
      // Fallback to local storage
      const user = getLocalUser();
      updateUIBasedOnAuth(user);
    }
  };
  
  xhr.onerror = function() {
    console.error('Session check request failed');
    // Fallback to local storage
    const user = getLocalUser();
    updateUIBasedOnAuth(user);
  };
  
  xhr.send();
}

/**
 * Get current user from local storage
 * @returns {Object|null} - The user object or null
 */
function getLocalUser() {
  try {
    const userJson = localStorage.getItem('current_user');
    if (!userJson) return null;
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Update UI elements based on authentication status
 * @param {Object|null} user - The user object or null
 */
function updateUIBasedOnAuth(user = null) {
  if (!user) {
    user = getLocalUser();
  }
  
  // Update body class
  document.body.classList.toggle('is-authenticated', !!user);
  document.body.classList.toggle('is-guest', !user);
  
  // Update auth buttons visibility
  const authButtons = document.querySelector('.auth-buttons');
  const userMenu = document.querySelector('.user-menu');
  
  if (authButtons) {
    authButtons.style.display = user ? 'none' : 'flex';
  }
  
  if (userMenu) {
    userMenu.style.display = user ? 'flex' : 'none';
    
    // Update user avatar and name if available
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.querySelector('.user-name');
    
    if (userAvatar && user) {
      // If we have a profile photo URL, use it
      if (user.profilePhoto) {
        userAvatar.src = user.profilePhoto;
      }
    }
    
    if (userName && user) {
      const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      userName.textContent = name || user.username || user.email.split('@')[0];
    }
  }
  
  // If on dashboard or protected pages and not logged in, redirect to login
  const protectedPages = [
    'dashboard.html',
    'account.html',
    'chat.html'
  ];
  
  const currentPage = window.location.pathname.split('/').pop();
  
  if (!user && protectedPages.includes(currentPage)) {
    window.location.href = 'login.html?redirect=' + encodeURIComponent(currentPage);
  }
  
  // If on login/register page and already logged in, redirect to dashboard
  const authPages = ['login.html', 'register.html'];
  
  if (user && authPages.includes(currentPage)) {
    // Check if there's a redirect parameter
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    if (redirect) {
      window.location.href = redirect;
    } else {
      window.location.href = 'dashboard.html';
    }
  }
  
  // Update subscription status
  if (typeof window.subscriptionSystem !== 'undefined') {
    window.subscriptionSystem.updateUIBasedOnSubscription();
  }
}

/**
 * Set up authentication forms
 */
function setupAuthForms() {
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Registration form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegistration);
  }
  
  // Password reset form
  const resetForm = document.getElementById('reset-form');
  if (resetForm) {
    resetForm.addEventListener('submit', handlePasswordReset);
  }
}

/**
 * Handle login form submission
 * @param {Event} e - The submit event
 */
function handleLogin(e) {
  e.preventDefault();
  
  // Get form elements and their values
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberMeInput = document.getElementById('remember-me');
  
  // Safely extract values, using empty string/false as fallback
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';
  const rememberMe = rememberMeInput ? rememberMeInput.checked : false;
  
  // Basic validation
  if (!email || !password) {
    showAuthError('Please enter both email and password.');
    return;
  }
  
  // Show loading indicator
  const submitButton = document.querySelector('#login-form button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="loading-spinner"></span> Signing in...';
  
  try {
    // Get all registered users from local storage
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users')) || [];
    
    // Find the user with matching email
    const user = registeredUsers.find(user => user.email === email);
    
    if (user && user.password === password) {
      // Login successful
      console.log('Login successful');
      
      // Update user's last login timestamp
      user.lastLogin = new Date().toISOString();
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
      
      // Store current user in local storage
      localStorage.setItem('current_user', JSON.stringify(user));
      
      // Redirect to dashboard or requested page
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect') || 'index.html';
      
      window.location.href = redirect;
    } else {
      // Invalid credentials
      console.error('Invalid credentials');
      showAuthError('Invalid email or password.');
      
      // Restore button
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  } catch (error) {
    console.error('Login error:', error);
    showAuthError('An error occurred during login. Please try again.');
    
    // Restore button
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
}

/**
 * Handle registration form submission
 * @param {Event} e - The submit event
 */
function handleRegistration(e) {
  e.preventDefault();
  
  // Get form elements and their values
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const agreeTermsInput = document.getElementById('agree-terms');
  
  // Safely extract values, using empty string as fallback
  const firstName = firstNameInput ? firstNameInput.value.trim() : '';
  const lastName = lastNameInput ? lastNameInput.value.trim() : '';
  const username = usernameInput ? usernameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';
  const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value.trim() : '';
  const agreeTerms = agreeTermsInput ? agreeTermsInput.checked : false;
  
  // Basic validation
  if (!firstName || !lastName || !email || !password) {
    showAuthError('Please fill in all required fields.');
    return;
  }
  
  if (password !== confirmPassword) {
    showAuthError('Passwords do not match.');
    return;
  }
  
  if (!agreeTerms) {
    showAuthError('You must agree to the Terms of Service and Privacy Policy.');
    return;
  }
  
  // Show loading indicator
  const submitButton = document.querySelector('#register-form button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="loading-spinner"></span> Creating account...';
  
  try {
    // Get all registered users from local storage
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users')) || [];
    
    // Check if the email is already registered
    if (registeredUsers.some(user => user.email === email)) {
      showAuthError('This email is already registered. Please use a different email or login.');
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
      return;
    }
    
    // Create new user object
    const newUser = {
      id: 'user_' + Date.now(),
      email: email,
      password: password, // In a real app, this should be hashed
      username: username || email.split('@')[0],
      firstName: firstName,
      lastName: lastName,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    // Add user to registered users
    registeredUsers.push(newUser);
    
    // Save updated registered users to local storage
    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
    
    // Also set as the current user
    localStorage.setItem('current_user', JSON.stringify(newUser));
    
    console.log('Registration successful');
    
    // Redirect to index page
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Registration error:', error);
    showAuthError('An error occurred during registration. Please try again.');
    
    // Restore button
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
}

/**
 * Handle password reset form submission
 * @param {Event} e - The submit event
 */
function handlePasswordReset(e) {
  e.preventDefault();
  
  // Get form element and its value
  const emailInput = document.getElementById('email');
  
  // Safely extract value, using empty string as fallback
  const email = emailInput ? emailInput.value : '';
  
  // Basic validation
  if (!email) {
    showAuthError('Please enter your email address.');
    return;
  }
  
  // Show loading indicator
  const submitButton = resetForm.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="loading-spinner"></span> Sending reset email...';
  
  // Send password reset request to server
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'reset_password.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        const response = JSON.parse(xhr.responseText);
        
        if (response.success) {
          // Show success message
          const formContainer = document.querySelector('.form-container') || resetForm.parentElement;
          
          if (formContainer) {
            formContainer.innerHTML = `
              <div class="auth-success">
                <div class="success-icon">✓</div>
                <h2>Password Reset Email Sent</h2>
                <p>We've sent an email to ${email} with instructions to reset your password.</p>
                <a href="login.html" class="holographic-button">Back to Login</a>
              </div>
            `;
          }
        } else {
          // Show error message
          showAuthError(response.message || 'Password reset failed. Please try again.');
          
          // Restore button
          submitButton.disabled = false;
          submitButton.innerHTML = originalText;
        }
      } catch (error) {
        console.error('Error parsing password reset response:', error);
        showAuthError('An error occurred. Please try again.');
        
        // Restore button
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    } else {
      console.error('Password reset request failed:', xhr.status);
      showAuthError('Server error. Please try again later.');
      
      // Restore button
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  };
  
  xhr.onerror = function() {
    console.error('Password reset request failed');
    showAuthError('Connection error. Please try again later.');
    
    // Restore button
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  };
  
  // For demo purposes, we'll simulate a password reset if server request fails
  xhr.addEventListener('error', () => {
    console.log('Falling back to demo password reset');
    
    // Show success message
    const formContainer = document.querySelector('.form-container') || resetForm.parentElement;
    
    if (formContainer) {
      formContainer.innerHTML = `
        <div class="auth-success">
          <div class="success-icon">✓</div>
          <h2>Password Reset Email Sent</h2>
          <p>We've sent an email to ${email} with instructions to reset your password.</p>
          <a href="login.html" class="holographic-button">Back to Login</a>
        </div>
      `;
    }
  });
  
  xhr.send('email=' + encodeURIComponent(email));
}

/**
 * Handle logout
 */
function handleLogout() {
  try {
    // Clear current user from local storage
    localStorage.removeItem('current_user');
    console.log('User logged out successfully');
    
    // Redirect to home page
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Logout error:', error);
    // Fallback - force redirect to login page
    window.location.href = 'login.html';
  }
}

/**
 * Show authentication error message
 * @param {string} message - The error message
 */
function showAuthError(message) {
  const errorElement = document.querySelector('.auth-error');
  
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000);
  } else {
    // Create error element if it doesn't exist
    const formContainer = document.querySelector('form');
    
    if (formContainer) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'auth-error';
      errorDiv.textContent = message;
      formContainer.prepend(errorDiv);
      
      // Hide after 5 seconds
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 5000);
    } else {
      // Fallback to alert
      alert(message);
    }
  }
}

// Export functions for use in other files
window.authSystem = {
  getCurrentUser: getLocalUser,
  checkAuthStatus,
  handleLogout,
  updateUIBasedOnAuth,
  showAuthError
};
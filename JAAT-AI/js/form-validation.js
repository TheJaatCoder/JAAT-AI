/**
 * JAAT-AI Form Validation
 * Handles client-side form validation and error messaging
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize form validation for all forms
    initFormValidation();
});

/**
 * Initialize form validation
 */
function initFormValidation() {
    // Find all forms that need validation
    const forms = document.querySelectorAll('form[id$="-form"]');
    
    forms.forEach(form => {
        // Add form validation event listeners
        form.addEventListener('submit', validateForm);
        
        // Add input validation event listeners
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
            });
            
            input.addEventListener('blur', () => {
                validateInput(input);
            });
        });
        
        // Add password match validation for registration forms
        if (form.id === 'register-form') {
            const passwordInput = form.querySelector('#password');
            const confirmPasswordInput = form.querySelector('#confirm-password');
            
            if (passwordInput && confirmPasswordInput) {
                confirmPasswordInput.addEventListener('input', () => {
                    validatePasswordMatch(passwordInput, confirmPasswordInput);
                });
                
                passwordInput.addEventListener('input', () => {
                    if (confirmPasswordInput.value) {
                        validatePasswordMatch(passwordInput, confirmPasswordInput);
                    }
                });
            }
        }
    });
}

/**
 * Validate a form before submission
 * @param {Event} e - The submit event
 */
function validateForm(e) {
    const form = e.target;
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    // Clear all previous errors
    clearFormErrors(form);
    
    // Validate each input
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    // Validate password match for registration forms
    if (form.id === 'register-form') {
        const passwordInput = form.querySelector('#password');
        const confirmPasswordInput = form.querySelector('#confirm-password');
        
        if (passwordInput && confirmPasswordInput) {
            if (!validatePasswordMatch(passwordInput, confirmPasswordInput)) {
                isValid = false;
            }
        }
    }
    
    // If form is not valid, prevent submission
    if (!isValid) {
        e.preventDefault();
        showFormError(form, 'Please fix the errors in the form before submitting.');
    }
}

/**
 * Validate an individual input
 * @param {HTMLElement} input - The input element to validate
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(input) {
    // Don't validate disabled or non-required empty inputs
    if (input.disabled || (!input.required && !input.value)) {
        return true;
    }
    
    const inputValue = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear any existing error for this input
    clearInputError(input);
    
    // Basic required validation
    if (input.required && !inputValue) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Email validation
    if (isValid && input.type === 'email' && inputValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Password validation
    if (isValid && input.type === 'password' && input.minLength && inputValue) {
        if (inputValue.length < input.minLength) {
            isValid = false;
            errorMessage = `Password must be at least ${input.minLength} characters long.`;
        }
    }
    
    // Show error message if input is invalid
    if (!isValid) {
        showInputError(input, errorMessage);
    }
    
    return isValid;
}

/**
 * Validate that passwords match
 * @param {HTMLElement} passwordInput - The password input
 * @param {HTMLElement} confirmPasswordInput - The confirm password input
 * @returns {boolean} - Whether the passwords match
 */
function validatePasswordMatch(passwordInput, confirmPasswordInput) {
    // Clear any existing error
    clearInputError(confirmPasswordInput);
    
    if (passwordInput.value !== confirmPasswordInput.value) {
        showInputError(confirmPasswordInput, 'Passwords do not match.');
        return false;
    }
    
    return true;
}

/**
 * Show an error message for an input
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function showInputError(input, message) {
    // Create or find the error element
    let errorElement = input.parentNode.querySelector('.input-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'input-error';
        errorElement.style.color = '#ff3860';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.25rem';
        input.parentNode.appendChild(errorElement);
    }
    
    // Add error class to the input
    input.classList.add('input-error');
    input.style.borderColor = '#ff3860';
    
    // Set the error message
    errorElement.textContent = message;
}

/**
 * Clear an error message for an input
 * @param {HTMLElement} input - The input element
 */
function clearInputError(input) {
    // Remove error class from the input
    input.classList.remove('input-error');
    input.style.borderColor = '';
    
    // Remove the error element
    const errorElement = input.parentNode.querySelector('.input-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Show a general form error message
 * @param {HTMLElement} form - The form element
 * @param {string} message - The error message
 */
function showFormError(form, message) {
    // Find or create the form error element
    let errorElement = form.querySelector('.auth-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'auth-error';
        errorElement.style.color = '#ff3860';
        errorElement.style.backgroundColor = 'rgba(255, 56, 96, 0.1)';
        errorElement.style.borderRadius = '8px';
        errorElement.style.padding = '10px';
        errorElement.style.marginBottom = '20px';
        errorElement.style.fontSize = '14px';
        errorElement.style.borderLeft = '4px solid #ff3860';
        form.insertBefore(errorElement, form.firstChild);
    }
    
    // Display the error element and set the message
    errorElement.style.display = 'block';
    errorElement.textContent = message;
    
    // Scroll to the error message
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Clear all form error messages
 * @param {HTMLElement} form - The form element
 */
function clearFormErrors(form) {
    // Clear the general form error
    const formError = form.querySelector('.auth-error');
    if (formError) {
        formError.style.display = 'none';
        formError.textContent = '';
    }
    
    // Clear all input errors
    const inputs = form.querySelectorAll('.input-error');
    inputs.forEach(input => {
        input.classList.remove('input-error');
        input.style.borderColor = '';
    });
    
    // Remove all error messages
    const errorMessages = form.querySelectorAll('.input-error-message');
    errorMessages.forEach(errorMessage => {
        errorMessage.remove();
    });
}
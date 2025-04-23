/**
 * JAAT-AI Select Component JavaScript
 * Handles custom select functionality
 */

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSelects();
});

/**
 * Initialize all select functionality
 */
function initializeSelects() {
    // Initialize custom selects
    initializeCustomSelects();
    
    // Initialize basic selects (for validation, etc.)
    initializeBasicSelects();
    
    console.log('JAAT-AI Select components initialized');
}

/**
 * Initialize custom select dropdowns
 */
function initializeCustomSelects() {
    const customSelects = document.querySelectorAll('.jaat-custom-select');
    
    customSelects.forEach(select => {
        const container = select.querySelector('.jaat-select-container');
        const trigger = select.querySelector('.jaat-select-trigger');
        const dropdown = select.querySelector('.jaat-select-dropdown');
        const options = select.querySelectorAll('.jaat-select-option');
        const valueDisplay = select.querySelector('.jaat-select-value');
        
        if (!container || !trigger || !dropdown || !options.length || !valueDisplay) return;
        
        // Toggle dropdown on trigger click
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close all other open dropdowns
            document.querySelectorAll('.jaat-select-container.open').forEach(openSelect => {
                if (openSelect !== container) {
                    openSelect.classList.remove('open');
                    const selectTrigger = openSelect.querySelector('.jaat-select-trigger');
                    if (selectTrigger) {
                        selectTrigger.setAttribute('aria-expanded', 'false');
                    }
                }
            });
            
            // Toggle current dropdown
            container.classList.toggle('open');
            
            // Update ARIA attributes
            const isOpen = container.classList.contains('open');
            trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        
        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.dataset.value;
                const text = option.textContent;
                
                // Update displayed value
                valueDisplay.textContent = text;
                
                // Update selected state
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                // Store selected value
                container.dataset.value = value;
                
                // Close dropdown
                container.classList.remove('open');
                trigger.setAttribute('aria-expanded', 'false');
                
                // Dispatch change event
                const changeEvent = new CustomEvent('change', {
                    bubbles: true,
                    detail: { value, text }
                });
                container.dispatchEvent(changeEvent);
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                container.classList.remove('open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Handle keyboard navigation
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger.click();
            } else if (e.key === 'Escape') {
                container.classList.remove('open');
                trigger.setAttribute('aria-expanded', 'false');
            } else if (e.key === 'ArrowDown' && container.classList.contains('open')) {
                e.preventDefault();
                const firstOption = options[0];
                if (firstOption) firstOption.focus();
            }
        });
        
        // Arrow key navigation for options
        options.forEach((option, index) => {
            option.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextOption = options[index + 1];
                    if (nextOption) nextOption.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (index > 0) {
                        options[index - 1].focus();
                    } else {
                        trigger.focus();
                    }
                } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    option.click();
                } else if (e.key === 'Escape') {
                    container.classList.remove('open');
                    trigger.setAttribute('aria-expanded', 'false');
                    trigger.focus();
                }
            });
            
            // Make options focusable
            option.setAttribute('tabindex', '0');
        });
    });
}

/**
 * Initialize basic select elements
 */
function initializeBasicSelects() {
    const selects = document.querySelectorAll('.jaat-select-input');
    
    selects.forEach(select => {
        // Add change event listener
        select.addEventListener('change', () => {
            validateSelect(select);
        });
        
        // Initialize validation state
        if (select.hasAttribute('required')) {
            validateSelect(select);
        }
    });
}

/**
 * Validate a select element
 * @param {HTMLSelectElement} select - The select element to validate
 * @returns {boolean} - Whether the select is valid
 */
function validateSelect(select) {
    if (!select.hasAttribute('required')) return true;
    
    const isValid = select.value !== '';
    const wrapper = select.closest('.jaat-select-wrapper');
    
    if (wrapper) {
        if (isValid) {
            wrapper.classList.remove('error');
        } else {
            wrapper.classList.add('error');
        }
    }
    
    return isValid;
}

/**
 * Get value from custom select
 * @param {string} selectId - The ID of the custom select container
 * @returns {string} - The selected value
 */
function getCustomSelectValue(selectId) {
    const container = document.getElementById(selectId);
    return container ? container.dataset.value || '' : '';
}

/**
 * Set value for custom select
 * @param {string} selectId - The ID of the custom select container
 * @param {string} value - The value to set
 * @returns {boolean} - Whether the operation was successful
 */
function setCustomSelectValue(selectId, value) {
    const container = document.getElementById(selectId);
    if (!container) return false;
    
    const options = container.querySelectorAll('.jaat-select-option');
    const valueDisplay = container.querySelector('.jaat-select-value');
    
    for (const option of options) {
        if (option.dataset.value === value) {
            // Update displayed value
            valueDisplay.textContent = option.textContent;
            
            // Update selected state
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            // Store selected value
            container.dataset.value = value;
            
            return true;
        }
    }
    
    return false;
}

/**
 * Create a select element programmatically
 * @param {Object} config - Select configuration
 * @param {string} config.id - Select ID
 * @param {string} config.label - Select label
 * @param {Array} config.options - Array of {value, label} objects
 * @param {string} config.placeholder - Placeholder text
 * @param {boolean} config.required - Whether the select is required
 * @param {Function} config.onChange - Change event handler
 * @returns {HTMLElement} - The created select wrapper element
 */
function createSelect(config) {
    const {
        id,
        label = '',
        options = [],
        placeholder = 'Select an option',
        required = false,
        onChange = null
    } = config;
    
    // Create wrapper element
    const wrapper = document.createElement('div');
    wrapper.className = 'jaat-select';
    
    // Create label if provided
    if (label) {
        const labelEl = document.createElement('label');
        labelEl.className = 'jaat-select-label';
        labelEl.setAttribute('for', id);
        labelEl.textContent = label;
        wrapper.appendChild(labelEl);
    }
    
    // Create select wrapper
    const selectWrapper = document.createElement('div');
    selectWrapper.className = 'jaat-select-wrapper';
    
    // Create select element
    const select = document.createElement('select');
    select.className = 'jaat-select-input';
    select.id = id;
    
    if (required) {
        select.setAttribute('required', 'required');
    }
    
    // Add placeholder option
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    select.appendChild(placeholderOption);
    
    // Add options
    options.forEach(option => {
        const optionEl = document.createElement('option');
        optionEl.value = option.value;
        optionEl.textContent = option.label;
        select.appendChild(optionEl);
    });
    
    // Add change handler
    if (onChange && typeof onChange === 'function') {
        select.addEventListener('change', onChange);
    }
    
    // Add dropdown icon
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'jaat-select-icon';
    iconWrapper.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    `;
    
    // Assemble select component
    selectWrapper.appendChild(select);
    selectWrapper.appendChild(iconWrapper);
    wrapper.appendChild(selectWrapper);
    
    return wrapper;
}

// Export functions for external use
window.jaatUI = window.jaatUI || {};
window.jaatUI.select = {
    getCustomValue: getCustomSelectValue,
    setCustomValue: setCustomSelectValue,
    create: createSelect,
    validate: validateSelect
};
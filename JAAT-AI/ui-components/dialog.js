/**
 * JAAT-AI Dialog Component JavaScript
 * Handles dialog interactions, opening, and closing
 */

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeDialogs();
});

/**
 * Initialize all dialog functionality
 */
function initializeDialogs() {
    // Find all dialogs and add event listeners
    const dialogs = document.querySelectorAll('.jaat-dialog');
    dialogs.forEach(dialog => setupDialog(dialog));
    
    // Set up buttons that open dialogs
    setupDialogOpenButtons();
    
    console.log('JAAT-AI Dialog components initialized');
}

/**
 * Set up dialog functionality
 * @param {HTMLElement} dialog - The dialog element
 */
function setupDialog(dialog) {
    const overlay = dialog.querySelector('.jaat-dialog-overlay');
    const closeButton = dialog.querySelector('.jaat-dialog-close');
    const cancelButton = dialog.querySelector('.jaat-dialog-cancel');
    const confirmButton = dialog.querySelector('.jaat-dialog-confirm');
    
    // Close when clicking the overlay (if not an alert dialog)
    if (overlay && !dialog.classList.contains('jaat-alert-dialog')) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeDialog(dialog);
            }
        });
    }
    
    // Close button functionality
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            closeDialog(dialog);
        });
    }
    
    // Cancel button functionality
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            closeDialog(dialog);
            
            // Dispatch cancel event
            const cancelEvent = new CustomEvent('dialog-cancel', {
                bubbles: true,
                detail: { dialog }
            });
            dialog.dispatchEvent(cancelEvent);
        });
    }
    
    // Confirm button functionality
    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            closeDialog(dialog);
            
            // Dispatch confirm event
            const confirmEvent = new CustomEvent('dialog-confirm', {
                bubbles: true,
                detail: { dialog }
            });
            dialog.dispatchEvent(confirmEvent);
        });
    }
    
    // Handle Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dialog.classList.contains('open')) {
            closeDialog(dialog);
        }
    });
}

/**
 * Set up buttons that open dialogs
 */
function setupDialogOpenButtons() {
    // Basic dialog
    const openBasicButton = document.getElementById('openBasicDialog');
    if (openBasicButton) {
        openBasicButton.addEventListener('click', () => {
            openDialog('basicDialog');
        });
    }
    
    // Alert dialog
    const openAlertButton = document.getElementById('openAlertDialog');
    if (openAlertButton) {
        openAlertButton.addEventListener('click', () => {
            openDialog('alertDialog');
        });
    }
    
    // Form dialog
    const openFormButton = document.getElementById('openFormDialog');
    if (openFormButton) {
        openFormButton.addEventListener('click', () => {
            openDialog('formDialog');
        });
    }
}

/**
 * Open a dialog by its ID
 * @param {string} dialogId - The ID of the dialog to open
 */
function openDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        // Add open class to show the dialog
        dialog.classList.add('open');
        
        // Set focus trap
        setFocusTrap(dialog);
        
        // Add no-scroll to body
        document.body.style.overflow = 'hidden';
        
        // Dispatch open event
        const openEvent = new CustomEvent('dialog-open', {
            bubbles: true,
            detail: { dialog }
        });
        dialog.dispatchEvent(openEvent);
    }
}

/**
 * Close a dialog
 * @param {HTMLElement} dialog - The dialog element to close
 */
function closeDialog(dialog) {
    // Remove open class to hide the dialog
    dialog.classList.remove('open');
    
    // Reset body scroll
    document.body.style.overflow = '';
    
    // Dispatch close event
    const closeEvent = new CustomEvent('dialog-close', {
        bubbles: true,
        detail: { dialog }
    });
    dialog.dispatchEvent(closeEvent);
}

/**
 * Set focus trap within dialog
 * @param {HTMLElement} dialog - The dialog element
 */
function setFocusTrap(dialog) {
    // Find focusable elements
    const focusableElements = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
        // Focus the first element
        focusableElements[0].focus();
        
        // Create a focus trap
        dialog.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Get the first and last focusable elements
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                // Handle tab and shift+tab navigation
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

/**
 * Create a dialog programmatically
 * 
 * @param {Object} config - Dialog configuration
 * @param {string} config.title - Dialog title
 * @param {string} config.content - Dialog content (HTML supported)
 * @param {string} config.confirmText - Text for confirm button
 * @param {string} config.cancelText - Text for cancel button
 * @param {boolean} config.isAlert - Whether this is an alert dialog
 * @param {Function} config.onConfirm - Confirmation callback
 * @param {Function} config.onCancel - Cancellation callback
 * @returns {HTMLElement} - The created dialog element
 */
function createDialog(config) {
    const {
        title = 'Dialog Title',
        content = '',
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        isAlert = false,
        onConfirm = null,
        onCancel = null
    } = config;
    
    // Create dialog element
    const dialog = document.createElement('div');
    dialog.className = `jaat-dialog ${isAlert ? 'jaat-alert-dialog' : ''}`;
    dialog.setAttribute('aria-labelledby', 'dialog-title');
    dialog.setAttribute('aria-modal', 'true');
    
    // Create dialog HTML
    dialog.innerHTML = `
        <div class="jaat-dialog-overlay"></div>
        <div class="jaat-dialog-content">
            <div class="jaat-dialog-header">
                <h3 class="jaat-dialog-title" id="dialog-title">${title}</h3>
                <button class="jaat-dialog-close" aria-label="Close Dialog">
                    <span class="jaat-dialog-close-icon">&times;</span>
                </button>
            </div>
            <div class="jaat-dialog-body">
                ${content}
            </div>
            <div class="jaat-dialog-footer">
                <button class="jaat-button jaat-button-ghost jaat-dialog-cancel">${cancelText}</button>
                <button class="jaat-button ${isAlert ? 'jaat-button-danger' : ''} jaat-dialog-confirm">${confirmText}</button>
            </div>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(dialog);
    
    // Setup dialog functionality
    setupDialog(dialog);
    
    // Add event listeners for callbacks
    if (onConfirm && typeof onConfirm === 'function') {
        dialog.addEventListener('dialog-confirm', onConfirm);
    }
    
    if (onCancel && typeof onCancel === 'function') {
        dialog.addEventListener('dialog-cancel', onCancel);
    }
    
    return dialog;
}

// Export functions for external use
window.jaatUI = window.jaatUI || {};
window.jaatUI.dialog = {
    open: openDialog,
    close: closeDialog,
    create: createDialog
};
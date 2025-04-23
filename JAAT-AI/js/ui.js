/**
 * UI functionality for JAAT-AI
 * Handles basic UI interactions and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    initUI();
});

/**
 * Initialize UI components
 */
function initUI() {
    setupModals();
    setupMenuToggle();
    setupChatSidebar();
    setupEventListeners();
    applyTheme();
}

/**
 * Setup modal functionality
 */
function setupModals() {
    // Settings modal
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsModal = document.getElementById('closeSettingsModal');
    
    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', function() {
            settingsModal.classList.add('active');
        });
    }
    
    if (closeSettingsModal && settingsModal) {
        closeSettingsModal.addEventListener('click', function() {
            settingsModal.classList.remove('active');
        });
    }
    
    // Rename modal
    const closeRenameModal = document.getElementById('closeRenameModal');
    const renameModal = document.getElementById('renameModal');
    const cancelRename = document.getElementById('cancelRename');
    
    if (closeRenameModal && renameModal) {
        closeRenameModal.addEventListener('click', function() {
            renameModal.classList.remove('active');
        });
    }
    
    if (cancelRename && renameModal) {
        cancelRename.addEventListener('click', function() {
            renameModal.classList.remove('active');
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (settingsModal && e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
        
        if (renameModal && e.target === renameModal) {
            renameModal.classList.remove('active');
        }
    });
    
    // Prevent closing when clicking on modal content
    const modalContents = document.querySelectorAll('.modal-content');
    modalContents.forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

/**
 * Setup mobile menu toggle
 */
function setupMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('expanded');
            this.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('expanded') && 
                !sidebar.contains(e.target) &&
                e.target !== menuToggle) {
                sidebar.classList.remove('expanded');
                menuToggle.classList.remove('active');
            }
        });
    }
}

/**
 * Setup chat sidebar functionality
 */
function setupChatSidebar() {
    // Add hover animation to history items
    const historyItems = document.querySelectorAll('.chat-history li');
    historyItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('holo-effect');
        });
        
        item.addEventListener('animationend', function() {
            this.classList.remove('holo-effect');
        });
    });
}

/**
 * Setup general event listeners
 */
function setupEventListeners() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button:not(.close-modal):not(.feedback-btn)');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Theme selector
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        themeSelector.addEventListener('change', function() {
            changeTheme(this.value);
        });
    }
    
    // Animations toggle
    const animationsToggle = document.getElementById('animationsToggle');
    if (animationsToggle) {
        animationsToggle.addEventListener('change', function() {
            toggleAnimations(this.checked);
        });
        
        // Set initial state
        const settings = getSettings();
        animationsToggle.checked = settings.animations !== false;
    }
    
    // Auto save toggle
    const autoSaveToggle = document.getElementById('autoSaveToggle');
    if (autoSaveToggle) {
        autoSaveToggle.addEventListener('change', function() {
            const settings = getSettings();
            settings.autoSave = this.checked;
            saveSettings(settings);
        });
        
        // Set initial state
        const settings = getSettings();
        autoSaveToggle.checked = settings.autoSave !== false;
    }
    
    // Response speed selector
    const responseSpeed = document.getElementById('responseSpeed');
    if (responseSpeed) {
        responseSpeed.addEventListener('change', function() {
            const settings = getSettings();
            settings.responseSpeed = this.value;
            saveSettings(settings);
        });
        
        // Set initial state
        const settings = getSettings();
        if (settings.responseSpeed) {
            responseSpeed.value = settings.responseSpeed;
        }
    }
    
    // API key input
    const apiKeyInput = document.getElementById('apiKeyInput');
    if (apiKeyInput) {
        // Set initial value
        const settings = getSettings();
        if (settings.apiKey) {
            apiKeyInput.value = settings.apiKey;
        }
    }
    
    // Model selector
    const modelSelector = document.getElementById('modelSelector');
    if (modelSelector) {
        // Set initial value
        const settings = getSettings();
        if (settings.model) {
            modelSelector.value = settings.model;
        }
    }
    
    // Save settings button
    const saveSettings = document.getElementById('saveSettings');
    if (saveSettings) {
        saveSettings.addEventListener('click', function() {
            saveAppSettings();
        });
    }
    
    // Reset settings button
    const resetSettings = document.getElementById('resetSettings');
    if (resetSettings) {
        resetSettings.addEventListener('click', function() {
            if (confirm('Reset all settings to defaults?')) {
                resetAppSettings();
            }
        });
    }
    
    // Clear chats button
    const clearChats = document.getElementById('clearChats');
    if (clearChats) {
        clearChats.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete all chats? This cannot be undone.')) {
                clearAllChats();
            }
        });
    }
    
    // Export chats button
    const exportChats = document.getElementById('exportChats');
    if (exportChats) {
        exportChats.addEventListener('click', function() {
            exportAllChats();
        });
    }
    
    // Import chats button
    const importChats = document.getElementById('importChats');
    if (importChats) {
        importChats.addEventListener('click', function() {
            importAllChats();
        });
    }
}

/**
 * Create ripple effect on button click
 * @param {Event} e - Click event
 */
function createRipple(e) {
    const button = e.currentTarget;
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.querySelector('.ripple');
    
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

/**
 * Apply theme based on settings or system preference
 */
function applyTheme() {
    const settings = getSettings();
    const theme = settings.theme || 'dark';
    
    if (theme === 'system') {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
        
        // Listen for changes in system preference
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            setTheme(e.matches ? 'dark' : 'light');
        });
    } else {
        setTheme(theme);
    }
    
    // Set theme selector value
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        themeSelector.value = theme;
    }
    
    // Apply animations setting
    toggleAnimations(settings.animations !== false);
}

/**
 * Set specific theme
 * @param {string} theme - Theme name ('dark' or 'light')
 */
function setTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
}

/**
 * Change theme and save to settings
 * @param {string} theme - Theme name
 */
function changeTheme(theme) {
    if (theme === 'system') {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    } else {
        setTheme(theme);
    }
    
    // Save to settings
    const settings = getSettings();
    settings.theme = theme;
    saveSettings(settings);
}

/**
 * Toggle animations on/off
 * @param {boolean} enabled - Whether animations are enabled
 */
function toggleAnimations(enabled) {
    if (enabled) {
        document.body.classList.remove('reduce-animations');
    } else {
        document.body.classList.add('reduce-animations');
    }
    
    // Save to settings
    const settings = getSettings();
    settings.animations = enabled;
    saveSettings(settings);
}

/**
 * Save all app settings
 */
function saveAppSettings() {
    const settings = getSettings();
    
    // Get values from inputs
    const themeSelector = document.getElementById('themeSelector');
    const animationsToggle = document.getElementById('animationsToggle');
    const autoSaveToggle = document.getElementById('autoSaveToggle');
    const responseSpeed = document.getElementById('responseSpeed');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const modelSelector = document.getElementById('modelSelector');
    
    if (themeSelector) settings.theme = themeSelector.value;
    if (animationsToggle) settings.animations = animationsToggle.checked;
    if (autoSaveToggle) settings.autoSave = autoSaveToggle.checked;
    if (responseSpeed) settings.responseSpeed = responseSpeed.value;
    if (apiKeyInput) settings.apiKey = apiKeyInput.value.trim();
    if (modelSelector) settings.model = modelSelector.value;
    
    // Save settings
    saveSettings(settings);
    
    // Close modal
    const settingsModal = document.getElementById('settingsModal');
    if (settingsModal) {
        settingsModal.classList.remove('active');
    }
    
    // Show confirmation
    showToast('Settings saved successfully');
}

/**
 * Reset all app settings to defaults
 */
function resetAppSettings() {
    // Default settings
    const defaultSettings = {
        theme: 'dark',
        animations: true,
        autoSave: true,
        responseSpeed: 'moderate',
        apiKey: '',
        model: 'gpt-4o'
    };
    
    // Save default settings
    saveSettings(defaultSettings);
    
    // Update UI
    const themeSelector = document.getElementById('themeSelector');
    const animationsToggle = document.getElementById('animationsToggle');
    const autoSaveToggle = document.getElementById('autoSaveToggle');
    const responseSpeed = document.getElementById('responseSpeed');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const modelSelector = document.getElementById('modelSelector');
    
    if (themeSelector) themeSelector.value = defaultSettings.theme;
    if (animationsToggle) animationsToggle.checked = defaultSettings.animations;
    if (autoSaveToggle) autoSaveToggle.checked = defaultSettings.autoSave;
    if (responseSpeed) responseSpeed.value = defaultSettings.responseSpeed;
    if (apiKeyInput) apiKeyInput.value = defaultSettings.apiKey;
    if (modelSelector) modelSelector.value = defaultSettings.model;
    
    // Apply theme
    setTheme(defaultSettings.theme);
    
    // Toggle animations
    toggleAnimations(defaultSettings.animations);
    
    // Show confirmation
    showToast('Settings reset to defaults');
}

/**
 * Clear all chats from storage
 */
function clearAllChats() {
    // Clear from storage
    localStorage.removeItem('jaat-ai-chats');
    localStorage.removeItem('jaat-ai-current-chat');
    
    // Reload page to reset state
    window.location.reload();
}

/**
 * Export all chats to a JSON file
 */
function exportAllChats() {
    try {
        // Get chats from storage
        const chats = JSON.parse(localStorage.getItem('jaat-ai-chats') || '[]');
        
        if (chats.length === 0) {
            showToast('No chats to export');
            return;
        }
        
        // Create export data
        const exportData = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            chats: chats
        };
        
        // Convert to JSON
        const jsonString = JSON.stringify(exportData, null, 2);
        
        // Create download link
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "jaat-ai-chats.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        
        // Show confirmation
        showToast('Chats exported successfully');
    } catch (err) {
        console.error('Export error:', err);
        showToast('Failed to export chats', 'error');
    }
}

/**
 * Import chats from a JSON file
 */
function importAllChats() {
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.addEventListener('change', function(e) {
        if (!e.target.files.length) return;
        
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                // Parse JSON
                const importData = JSON.parse(e.target.result);
                
                // Validate format
                if (!importData.chats || !Array.isArray(importData.chats)) {
                    throw new Error('Invalid file format');
                }
                
                // Get existing chats
                const existingChats = JSON.parse(localStorage.getItem('jaat-ai-chats') || '[]');
                
                // Merge chats
                const mergedChats = [...importData.chats, ...existingChats];
                
                // Remove duplicates by ID
                const uniqueChats = [];
                const chatIds = new Set();
                
                mergedChats.forEach(chat => {
                    if (!chatIds.has(chat.id)) {
                        chatIds.add(chat.id);
                        uniqueChats.push(chat);
                    }
                });
                
                // Save to storage
                localStorage.setItem('jaat-ai-chats', JSON.stringify(uniqueChats));
                
                // Show confirmation
                showToast(`Imported ${importData.chats.length} chats successfully`);
                
                // Reload page to update UI
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } catch (err) {
                console.error('Import error:', err);
                showToast('Failed to import chats. Invalid file format.', 'error');
            }
        };
        
        reader.readAsText(file);
    });
    
    // Trigger file selection
    fileInput.click();
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type ('success', 'error', 'info')
 */
function showToast(message, type = 'success') {
    // Check if toast container exists
    let toastContainer = document.querySelector('.toast-container');
    
    // Create container if it doesn't exist
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.classList.add(type);
    toast.textContent = message;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            
            // Remove container if empty
            if (toastContainer.children.length === 0 && toastContainer.parentNode) {
                toastContainer.parentNode.removeChild(toastContainer);
            }
        }, 300);
    }, 3000);
}

/**
 * Get settings from storage
 * @returns {Object} Settings object
 */
function getSettings() {
    try {
        const savedSettings = localStorage.getItem('jaat-ai-settings');
        if (savedSettings) {
            return JSON.parse(savedSettings);
        }
    } catch (err) {
        console.error('Error loading settings:', err);
    }
    
    // Default settings
    return {
        theme: 'dark',
        animations: true,
        autoSave: true,
        responseSpeed: 'moderate',
        apiKey: '',
        model: 'gpt-4o'
    };
}

/**
 * Save settings to storage
 * @param {Object} settings - Settings object
 */
function saveSettings(settings) {
    try {
        localStorage.setItem('jaat-ai-settings', JSON.stringify(settings));
    } catch (err) {
        console.error('Error saving settings:', err);
        showToast('Failed to save settings', 'error');
    }
}
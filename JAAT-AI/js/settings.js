/**
 * Settings functionality for JAAT-AI
 * Handles user customization options and preferences
 */

document.addEventListener('DOMContentLoaded', function() {
    initSettings();
});

/**
 * Initialize settings
 */
function initSettings() {
    loadSettings();
    setupSettingsEventListeners();
}

/**
 * Load settings from storage
 */
function loadSettings() {
    const settings = getSettings();
    applySettingsToUI(settings);
}

/**
 * Apply settings to UI elements
 * @param {Object} settings - Settings object
 */
function applySettingsToUI(settings) {
    // Theme selector
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector && settings.theme) {
        themeSelector.value = settings.theme;
    }
    
    // Apply theme
    if (typeof setTheme === 'function' && settings.theme) {
        if (settings.theme === 'system') {
            const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(isDarkMode ? 'dark' : 'light');
        } else {
            setTheme(settings.theme);
        }
    }
    
    // Animations toggle
    const animationsToggle = document.getElementById('animationsToggle');
    if (animationsToggle && settings.animations !== undefined) {
        animationsToggle.checked = settings.animations;
        
        // Apply animations setting
        if (settings.animations) {
            document.body.classList.remove('reduce-animations');
        } else {
            document.body.classList.add('reduce-animations');
        }
    }
    
    // Auto save toggle
    const autoSaveToggle = document.getElementById('autoSaveToggle');
    if (autoSaveToggle && settings.autoSave !== undefined) {
        autoSaveToggle.checked = settings.autoSave;
    }
    
    // Response speed selector
    const responseSpeed = document.getElementById('responseSpeed');
    if (responseSpeed && settings.responseSpeed) {
        responseSpeed.value = settings.responseSpeed;
    }
    
    // API key input
    const apiKeyInput = document.getElementById('apiKeyInput');
    if (apiKeyInput && settings.apiKey) {
        apiKeyInput.value = settings.apiKey;
    }
    
    // Model selector
    const modelSelector = document.getElementById('modelSelector');
    if (modelSelector && settings.model) {
        modelSelector.value = settings.model;
    }
}

/**
 * Setup settings event listeners
 */
function setupSettingsEventListeners() {
    // Theme change
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        themeSelector.addEventListener('change', function() {
            const theme = this.value;
            updateSetting('theme', theme);
            
            if (typeof changeTheme === 'function') {
                changeTheme(theme);
            } else {
                // Fallback if changeTheme isn't available
                if (theme === 'system') {
                    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
                } else {
                    document.body.className = `${theme}-theme`;
                }
            }
        });
    }
    
    // Animations toggle
    const animationsToggle = document.getElementById('animationsToggle');
    if (animationsToggle) {
        animationsToggle.addEventListener('change', function() {
            const enabled = this.checked;
            updateSetting('animations', enabled);
            
            if (typeof toggleAnimations === 'function') {
                toggleAnimations(enabled);
            } else {
                // Fallback if toggleAnimations isn't available
                if (enabled) {
                    document.body.classList.remove('reduce-animations');
                } else {
                    document.body.classList.add('reduce-animations');
                }
            }
        });
    }
    
    // Auto save toggle
    const autoSaveToggle = document.getElementById('autoSaveToggle');
    if (autoSaveToggle) {
        autoSaveToggle.addEventListener('change', function() {
            updateSetting('autoSave', this.checked);
        });
    }
    
    // Response speed selector
    const responseSpeed = document.getElementById('responseSpeed');
    if (responseSpeed) {
        responseSpeed.addEventListener('change', function() {
            updateSetting('responseSpeed', this.value);
        });
    }
    
    // Save settings button
    const saveSettingsBtn = document.getElementById('saveSettings');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveAllSettings);
    }
    
    // Reset settings button
    const resetSettingsBtn = document.getElementById('resetSettings');
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', function() {
            if (confirm('Reset all settings to defaults?')) {
                resetSettings();
            }
        });
    }
}

/**
 * Update a single setting
 * @param {string} key - Setting key
 * @param {any} value - Setting value
 */
function updateSetting(key, value) {
    const settings = getSettings();
    settings[key] = value;
    saveSettings(settings);
}

/**
 * Save all settings from UI inputs
 */
function saveAllSettings() {
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
    
    // Apply changes
    applySettingsToUI(settings);
    
    // Close settings modal
    const settingsModal = document.getElementById('settingsModal');
    if (settingsModal) {
        settingsModal.classList.remove('active');
    }
    
    // Show confirmation
    if (typeof showToast === 'function') {
        showToast('Settings saved successfully');
    }
}

/**
 * Reset settings to defaults
 */
function resetSettings() {
    // Default settings
    const defaultSettings = {
        theme: 'dark',
        animations: true,
        autoSave: true,
        responseSpeed: 'moderate',
        apiKey: '',
        model: 'gpt-4o'
    };
    
    // Save defaults
    saveSettings(defaultSettings);
    
    // Apply to UI
    applySettingsToUI(defaultSettings);
    
    // Show confirmation
    if (typeof showToast === 'function') {
        showToast('Settings reset to defaults');
    }
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
        
        // Show error toast if available
        if (typeof showToast === 'function') {
            showToast('Failed to save settings', 'error');
        }
    }
}

/**
 * Apply setting to specific features
 * @param {string} setting - Setting name
 * @param {any} value - Setting value
 */
function applySetting(setting, value) {
    switch (setting) {
        case 'theme':
            if (typeof setTheme === 'function') {
                if (value === 'system') {
                    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    setTheme(isDarkMode ? 'dark' : 'light');
                } else {
                    setTheme(value);
                }
            } else {
                // Fallback
                if (value === 'system') {
                    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
                } else {
                    document.body.className = `${value}-theme`;
                }
            }
            break;
            
        case 'animations':
            if (typeof toggleAnimations === 'function') {
                toggleAnimations(value);
            } else {
                // Fallback
                if (value) {
                    document.body.classList.remove('reduce-animations');
                } else {
                    document.body.classList.add('reduce-animations');
                }
            }
            break;
    }
}
/**
 * Storage functionality for JAAT-AI
 * Handles persistence of chats, user preferences, and application state
 */

// Initialize storage when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    initStorage();
});

/**
 * Initialize storage functionality
 */
function initStorage() {
    // Ensure storage is available
    if (!storageAvailable('localStorage')) {
        console.error('Local storage is not available. Chat history and settings will not be saved.');
        showStorageWarning();
        return;
    }
    
    // Initialize settings if not already done
    if (!localStorage.getItem('jaat-ai-settings')) {
        // Set default settings
        const defaultSettings = {
            theme: 'dark', 
            animations: true,
            autoSave: true,
            responseSpeed: 'moderate',
            apiKey: '',
            model: 'gpt-4o'
        };
        
        saveSettings(defaultSettings);
    }
    
    // Add storage event listener to sync across tabs
    window.addEventListener('storage', handleStorageChange);
}

/**
 * Check if storage is available
 * @param {string} type - Type of storage ('localStorage' or 'sessionStorage')
 * @returns {boolean} - Whether storage is available
 */
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

/**
 * Show storage warning
 */
function showStorageWarning() {
    // Create warning element
    const warningEl = document.createElement('div');
    warningEl.className = 'storage-warning';
    warningEl.innerHTML = `
        <div class="warning-content">
            <strong>Warning:</strong> Local storage is not available. 
            Chat history and settings will not be saved between sessions.
            <button class="close-warning">×</button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .storage-warning {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: rgba(255, 193, 7, 0.9);
            color: #333;
            z-index: 1000;
            text-align: center;
            padding: 10px 20px;
            font-size: 14px;
        }
        
        .warning-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .close-warning {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            padding: 0 5px;
        }
    `;
    document.head.appendChild(style);
    
    // Add to body
    document.body.prepend(warningEl);
    
    // Setup close button
    const closeBtn = warningEl.querySelector('.close-warning');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            warningEl.remove();
        });
    }
}

/**
 * Handle storage change event (for syncing across tabs)
 * @param {StorageEvent} event - Storage event
 */
function handleStorageChange(event) {
    // Only handle relevant changes
    if (!event.key || !event.key.startsWith('jaat-ai-')) return;
    
    // Handle different types of changes
    switch (event.key) {
        case 'jaat-ai-settings':
            // Update theme and animations
            if (event.newValue) {
                const settings = JSON.parse(event.newValue);
                applySettings(settings);
            }
            break;
            
        case 'jaat-ai-chats':
            // Re-render chat history if on the same chat
            if (window.currentChatId && event.newValue) {
                const chats = JSON.parse(event.newValue);
                window.chats = chats;
                
                // Re-render chat history
                if (typeof renderChatHistory === 'function') {
                    renderChatHistory();
                }
                
                // Update current chat if it exists
                const currentChat = chats.find(chat => chat.id === window.currentChatId);
                if (currentChat && typeof renderMessages === 'function') {
                    renderMessages(currentChat.messages);
                }
            }
            break;
            
        case 'jaat-ai-current-chat':
            // Change current chat if different
            if (event.newValue && event.newValue !== window.currentChatId) {
                window.currentChatId = event.newValue;
                
                // Load chat
                if (typeof loadChat === 'function') {
                    loadChat(event.newValue);
                }
            }
            break;
    }
}

/**
 * Apply settings
 * @param {Object} settings - Settings object
 */
function applySettings(settings) {
    // Apply theme
    if (settings.theme) {
        if (typeof setTheme === 'function') {
            setTheme(settings.theme === 'system' ? 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
                settings.theme);
        } else {
            // Fallback if setTheme isn't available
            document.body.className = settings.theme === 'system' ? 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme') : 
                `${settings.theme}-theme`;
        }
    }
    
    // Apply animations
    if (typeof settings.animations !== 'undefined') {
        if (typeof toggleAnimations === 'function') {
            toggleAnimations(settings.animations);
        } else {
            // Fallback if toggleAnimations isn't available
            if (settings.animations) {
                document.body.classList.remove('reduce-animations');
            } else {
                document.body.classList.add('reduce-animations');
            }
        }
    }
    
    // Update inputs if they exist
    const themeSelector = document.getElementById('themeSelector');
    const animationsToggle = document.getElementById('animationsToggle');
    const autoSaveToggle = document.getElementById('autoSaveToggle');
    const responseSpeed = document.getElementById('responseSpeed');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const modelSelector = document.getElementById('modelSelector');
    
    if (themeSelector && settings.theme) themeSelector.value = settings.theme;
    if (animationsToggle && settings.animations !== undefined) animationsToggle.checked = settings.animations;
    if (autoSaveToggle && settings.autoSave !== undefined) autoSaveToggle.checked = settings.autoSave;
    if (responseSpeed && settings.responseSpeed) responseSpeed.value = settings.responseSpeed;
    if (apiKeyInput && settings.apiKey) apiKeyInput.value = settings.apiKey;
    if (modelSelector && settings.model) modelSelector.value = settings.model;
}

/**
 * Save settings to localStorage
 * @param {Object} settings - Settings object
 */
function saveSettings(settings) {
    try {
        localStorage.setItem('jaat-ai-settings', JSON.stringify(settings));
    } catch (err) {
        console.error('Error saving settings:', err);
        
        // Show error toast if available
        if (typeof showToast === 'function') {
            showToast('Failed to save settings. Local storage may be full.', 'error');
        }
    }
}

/**
 * Save chats to localStorage
 */
function saveChats() {
    try {
        if (!window.chats || !Array.isArray(window.chats)) return;
        
        // Get settings to check if auto-save is enabled
        const settings = getSettings();
        if (settings.autoSave === false) return;
        
        // Save chats
        localStorage.setItem('jaat-ai-chats', JSON.stringify(window.chats));
        
        // Save current chat ID
        if (window.currentChatId) {
            localStorage.setItem('jaat-ai-current-chat', window.currentChatId);
        }
    } catch (err) {
        console.error('Error saving chats:', err);
        
        // Check if error is due to quota exceeded
        if (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            showStorageFullWarning();
        }
    }
}

/**
 * Show storage full warning
 */
function showStorageFullWarning() {
    // Show error toast if available
    if (typeof showToast === 'function') {
        showToast(
            'Storage space is full. Try exporting and clearing some chats to free up space.',
            'error'
        );
        
        // Open settings modal if available
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            settingsModal.classList.add('active');
        }
    } else {
        // Fallback alert
        alert('Storage space is full. Try exporting and clearing some chats to free up space.');
    }
}

/**
 * Get settings from localStorage
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
 * Export all chats to a file
 * @returns {Promise<boolean>} Whether export was successful
 */
async function exportAllChats() {
    try {
        // Get chats from storage
        const chats = JSON.parse(localStorage.getItem('jaat-ai-chats') || '[]');
        
        if (chats.length === 0) {
            if (typeof showToast === 'function') {
                showToast('No chats to export', 'info');
            }
            return false;
        }
        
        // Create export data
        const exportData = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            chats: chats
        };
        
        // Convert to JSON
        const jsonString = JSON.stringify(exportData, null, 2);
        
        // Create and download file
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `jaat-ai-chats-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (typeof showToast === 'function') {
            showToast('Chats exported successfully', 'success');
        }
        
        return true;
    } catch (err) {
        console.error('Export error:', err);
        
        if (typeof showToast === 'function') {
            showToast('Failed to export chats: ' + err.message, 'error');
        }
        
        return false;
    }
}

/**
 * Import chats from a file
 * @param {File} file - JSON file to import
 * @returns {Promise<boolean>} Whether import was successful
 */
async function importChats(file) {
    return new Promise((resolve, reject) => {
        try {
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
                            
                            // Fix dates
                            chat.created = new Date(chat.created);
                            chat.lastUpdated = new Date(chat.lastUpdated || chat.created);
                            
                            if (chat.messages) {
                                chat.messages.forEach(message => {
                                    message.timestamp = new Date(message.timestamp);
                                });
                            }
                            
                            uniqueChats.push(chat);
                        }
                    });
                    
                    // Save to storage
                    localStorage.setItem('jaat-ai-chats', JSON.stringify(uniqueChats));
                    
                    // Update window.chats
                    window.chats = uniqueChats;
                    
                    // Re-render chat history
                    if (typeof renderChatHistory === 'function') {
                        renderChatHistory();
                    }
                    
                    if (typeof showToast === 'function') {
                        showToast(`Imported ${importData.chats.length} chats successfully`, 'success');
                    }
                    
                    resolve(true);
                } catch (err) {
                    console.error('Import error:', err);
                    
                    if (typeof showToast === 'function') {
                        showToast('Failed to import chats: ' + err.message, 'error');
                    }
                    
                    reject(err);
                }
            };
            
            reader.onerror = function() {
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsText(file);
        } catch (err) {
            console.error('Import error:', err);
            reject(err);
        }
    });
}

/**
 * Clear all chats
 * @returns {Promise<boolean>} Whether clear was successful
 */
async function clearAllChats() {
    try {
        // Confirm again
        if (!confirm('Are you sure you want to delete all chats? This cannot be undone.')) {
            return false;
        }
        
        // Clear chats from storage
        localStorage.removeItem('jaat-ai-chats');
        localStorage.removeItem('jaat-ai-current-chat');
        
        // Reset variables
        window.chats = [];
        window.currentChatId = null;
        
        // Reset UI
        if (typeof renderChatHistory === 'function') {
            renderChatHistory();
        }
        
        // Show welcome screen
        const welcomeScreen = document.getElementById('welcomeScreen');
        const chatArea = document.getElementById('chatArea');
        
        if (welcomeScreen) {
            welcomeScreen.style.display = 'flex';
        }
        
        if (chatArea) {
            chatArea.style.display = 'none';
        }
        
        if (typeof showToast === 'function') {
            showToast('All chats have been deleted', 'success');
        }
        
        return true;
    } catch (err) {
        console.error('Clear chats error:', err);
        
        if (typeof showToast === 'function') {
            showToast('Failed to clear chats: ' + err.message, 'error');
        }
        
        return false;
    }
}

/**
 * Load chats from storage
 */
function loadChats() {
    try {
        // Load chats
        const savedChats = localStorage.getItem('jaat-ai-chats');
        if (savedChats) {
            window.chats = JSON.parse(savedChats);
            
            // Fix dates
            window.chats.forEach(chat => {
                chat.created = new Date(chat.created);
                chat.lastUpdated = new Date(chat.lastUpdated || chat.created);
                
                if (chat.messages) {
                    chat.messages.forEach(message => {
                        message.timestamp = new Date(message.timestamp);
                    });
                }
            });
        } else {
            window.chats = [];
        }
        
        // Load current chat ID
        const savedCurrentChatId = localStorage.getItem('jaat-ai-current-chat');
        if (savedCurrentChatId && window.chats.some(chat => chat.id === savedCurrentChatId)) {
            window.currentChatId = savedCurrentChatId;
            
            // Load current chat
            const currentChat = window.chats.find(chat => chat.id === window.currentChatId);
            if (currentChat) {
                // Show chat interface
                const welcomeScreen = document.getElementById('welcomeScreen');
                const chatArea = document.getElementById('chatArea');
                
                if (welcomeScreen) {
                    welcomeScreen.style.display = 'none';
                }
                
                if (chatArea) {
                    chatArea.style.display = 'flex';
                }
                
                // Update chat title
                const chatTitle = document.getElementById('chatTitle');
                if (chatTitle) {
                    chatTitle.textContent = currentChat.title;
                }
                
                // Render messages
                if (typeof renderMessages === 'function') {
                    renderMessages(currentChat.messages || []);
                }
            }
        }
        
        // Render chat history
        if (typeof renderChatHistory === 'function') {
            renderChatHistory();
        }
        
        return true;
    } catch (err) {
        console.error('Error loading chats:', err);
        
        // Initialize with empty array
        window.chats = [];
        
        return false;
    }
}
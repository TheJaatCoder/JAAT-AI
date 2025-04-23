/**
 * JAAT-AI Chatbot Notifier Feature
 * Send desktop notifications for new chat messages and events
 */

class ChatbotNotifier {
    constructor() {
        // Notification settings
        this.settings = {
            enabled: true,
            sound: true,
            soundVolume: 0.5,
            desktop: true,
            inApp: true,
            showPreview: true,
            durationMS: 5000,
            requireInteraction: false,
            muteChatTab: true,
            muteWhenDnd: true,
            groupNotifications: true,
            maxStackSize: 5,
            notifyOnNewMessages: true,
            notifyOnMentions: true,
            notifyOnKeywords: true,
            notifyOnExport: true,
            notifyOnProcessComplete: true,
            keywords: []
        };
        
        // Notification sounds
        this.sounds = [
            { id: 'ding', name: 'Ding', file: 'sounds/notifications/ding.mp3' },
            { id: 'bell', name: 'Bell', file: 'sounds/notifications/bell.mp3' },
            { id: 'chime', name: 'Chime', file: 'sounds/notifications/chime.mp3' },
            { id: 'pop', name: 'Pop', file: 'sounds/notifications/pop.mp3' },
            { id: 'note', name: 'Note', file: 'sounds/notifications/note.mp3' },
            { id: 'chirp', name: 'Chirp', file: 'sounds/notifications/chirp.mp3' },
            { id: 'subtle', name: 'Subtle', file: 'sounds/notifications/subtle.mp3' },
            { id: 'knock', name: 'Knock', file: 'sounds/notifications/knock.mp3' },
            { id: 'bubble', name: 'Bubble', file: 'sounds/notifications/bubble.mp3' }
        ];
        
        // Current sound
        this.currentSound = 'ding';
        
        // Audio context for playing sounds
        this.audioContext = null;
        
        // Cache for loaded audio
        this.audioCache = new Map();
        
        // Notification queue
        this.notificationQueue = [];
        
        // Active notifications
        this.activeNotifications = [];
        
        // In-app notification element
        this.inAppNotificationElement = null;
        
        // Notification badge element
        this.badgeElement = null;
        
        // Unread count
        this.unreadCount = 0;
        
        // Permission state
        this.permissionState = null;
        
        // Storage key
        this.storageKey = 'jaat-notifier-settings';
        
        // Event listeners
        this.eventListeners = {};
    }

    /**
     * Initialize notifier
     * @param {Object} options - Configuration options
     * @returns {ChatbotNotifier} This instance
     */
    init(options = {}) {
        // Apply custom options
        if (options.settings) {
            this.settings = { ...this.settings, ...options.settings };
        }
        
        if (options.currentSound && this.sounds.some(s => s.id === options.currentSound)) {
            this.currentSound = options.currentSound;
        }
        
        // Load saved settings
        this.loadSettings();
        
        // Check notification permission
        this.checkNotificationPermission();
        
        // Set up audio context
        this.setupAudioContext();
        
        // Create in-app notification element
        if (this.settings.inApp) {
            this.createInAppNotificationElement();
        }
        
        // Add badge element
        this.createBadgeElement();
        
        console.log('Chatbot Notifier initialized with settings:', this.settings);
        return this;
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem(this.storageKey);
            if (savedSettings) {
                const parsed = JSON.parse(savedSettings);
                this.settings = { ...this.settings, ...parsed.settings };
                
                if (parsed.currentSound && this.sounds.some(s => s.id === parsed.currentSound)) {
                    this.currentSound = parsed.currentSound;
                }
            }
        } catch (error) {
            console.error('Error loading notifier settings:', error);
        }
    }

    /**
     * Save settings to localStorage
     */
    saveSettings() {
        try {
            const data = {
                settings: this.settings,
                currentSound: this.currentSound
            };
            
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving notifier settings:', error);
        }
    }

    /**
     * Check notification permission
     * @returns {string} Permission state: 'granted', 'denied', or 'default'
     */
    checkNotificationPermission() {
        if (!('Notification' in window)) {
            this.permissionState = 'unsupported';
            console.warn('This browser does not support desktop notifications');
            return this.permissionState;
        }
        
        this.permissionState = Notification.permission;
        return this.permissionState;
    }

    /**
     * Request notification permission
     * @returns {Promise<string>} Permission state
     */
    async requestNotificationPermission() {
        if (!('Notification' in window)) {
            this.permissionState = 'unsupported';
            return this.permissionState;
        }
        
        try {
            const permission = await Notification.requestPermission();
            this.permissionState = permission;
            
            // Update settings based on permission
            if (permission === 'granted') {
                this.settings.desktop = true;
            } else {
                this.settings.desktop = false;
            }
            
            this.saveSettings();
            
            return permission;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return 'error';
        }
    }

    /**
     * Set up audio context for notification sounds
     */
    setupAudioContext() {
        try {
            // Create audio context
            if (window.AudioContext) {
                this.audioContext = new window.AudioContext();
            } else if (window.webkitAudioContext) {
                this.audioContext = new window.webkitAudioContext();
            }
            
            // Preload current sound
            if (this.audioContext && this.settings.sound) {
                this.preloadSound(this.currentSound);
            }
        } catch (error) {
            console.error('Failed to set up audio context:', error);
        }
    }

    /**
     * Preload a sound for faster playback
     * @param {string} soundId - ID of sound to preload
     * @returns {Promise<AudioBuffer|null>} Loaded audio buffer or null if error
     */
    async preloadSound(soundId) {
        // Skip if no audio context
        if (!this.audioContext) {
            return null;
        }
        
        // Skip if already cached
        if (this.audioCache.has(soundId)) {
            return this.audioCache.get(soundId);
        }
        
        // Find sound
        const sound = this.sounds.find(s => s.id === soundId);
        if (!sound) {
            console.error(`Sound not found: ${soundId}`);
            return null;
        }
        
        try {
            // Load sound
            const response = await fetch(sound.file);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            
            // Cache audio buffer
            this.audioCache.set(soundId, audioBuffer);
            
            return audioBuffer;
        } catch (error) {
            console.error(`Failed to load sound: ${soundId}`, error);
            return null;
        }
    }

    /**
     * Create in-app notification element
     */
    createInAppNotificationElement() {
        // Skip if already created
        if (this.inAppNotificationElement) {
            return;
        }
        
        // Create container element
        this.inAppNotificationElement = document.createElement('div');
        this.inAppNotificationElement.className = 'jaat-notification-container';
        
        // Append to document
        document.body.appendChild(this.inAppNotificationElement);
        
        // Add styles
        this.addStyles();
    }

    /**
     * Create badge element for showing unread count
     */
    createBadgeElement() {
        // Skip if already created
        if (this.badgeElement) {
            return;
        }
        
        // Create badge element
        this.badgeElement = document.createElement('div');
        this.badgeElement.className = 'jaat-notification-badge';
        this.badgeElement.style.display = 'none';
        
        // Add to document
        document.body.appendChild(this.badgeElement);
    }

    /**
     * Send a notification
     * @param {Object} options - Notification options
     * @param {string} options.title - Notification title
     * @param {string} options.message - Notification message
     * @param {string} [options.icon] - URL of notification icon
     * @param {string} [options.type='info'] - Notification type: 'info', 'success', 'warning', 'error'
     * @param {Function} [options.onClick] - Click handler for the notification
     * @param {boolean} [options.playSound=true] - Whether to play sound
     * @param {string} [options.soundId] - ID of sound to play, defaults to current sound
     * @param {boolean} [options.desktop=true] - Whether to show desktop notification
     * @param {boolean} [options.inApp=true] - Whether to show in-app notification
     * @returns {string} Notification ID
     */
    notify(options) {
        // Skip if disabled
        if (!this.settings.enabled) {
            return null;
        }
        
        // Generate notification ID
        const id = `notification-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        // Default options
        const defaultOptions = {
            title: 'JAAT-AI',
            message: '',
            icon: 'assets/icons/notification-icon.png',
            type: 'info',
            onClick: null,
            playSound: true,
            soundId: this.currentSound,
            desktop: this.settings.desktop,
            inApp: this.settings.inApp
        };
        
        // Merge options
        const notificationOptions = { ...defaultOptions, ...options, id };
        
        // Don't show desktop notifications if permission is not granted
        if (notificationOptions.desktop && this.permissionState !== 'granted') {
            notificationOptions.desktop = false;
        }
        
        // Add to queue
        this.notificationQueue.push(notificationOptions);
        
        // Process queue
        this.processNotificationQueue();
        
        // Return notification ID
        return id;
    }

    /**
     * Process notification queue
     */
    processNotificationQueue() {
        // Skip if queue is empty
        if (this.notificationQueue.length === 0) {
            return;
        }
        
        // Get next notification
        const notification = this.notificationQueue.shift();
        
        // Show notification
        this.showNotification(notification);
        
        // Process next in queue if any
        if (this.notificationQueue.length > 0) {
            // Slight delay to avoid flooding
            setTimeout(() => this.processNotificationQueue(), 300);
        }
    }

    /**
     * Show a notification
     * @param {Object} options - Notification options
     */
    showNotification(options) {
        // Show desktop notification
        if (options.desktop) {
            this.showDesktopNotification(options);
        }
        
        // Show in-app notification
        if (options.inApp) {
            this.showInAppNotification(options);
        }
        
        // Play sound
        if (options.playSound && this.settings.sound) {
            this.playNotificationSound(options.soundId);
        }
        
        // Increment unread count
        this.incrementUnreadCount();
        
        // Update badge
        this.updateBadge();
    }

    /**
     * Show desktop notification
     * @param {Object} options - Notification options
     * @returns {Notification|null} Notification object or null if error
     */
    showDesktopNotification(options) {
        // Skip if not supported or permission not granted
        if (!('Notification' in window) || Notification.permission !== 'granted') {
            return null;
        }
        
        try {
            // Create notification
            const notification = new Notification(options.title, {
                body: options.message,
                icon: options.icon,
                tag: options.id,
                requireInteraction: this.settings.requireInteraction
            });
            
            // Add to active notifications
            this.activeNotifications.push({
                id: options.id,
                notification,
                timestamp: Date.now()
            });
            
            // Add event listeners
            notification.onclick = (event) => {
                // Focus window
                window.focus();
                
                // Close notification
                notification.close();
                
                // Call custom click handler
                if (typeof options.onClick === 'function') {
                    options.onClick(event);
                }
                
                // Remove from active notifications
                this.removeActiveNotification(options.id);
                
                // Decrement unread count
                this.decrementUnreadCount();
                this.updateBadge();
            };
            
            notification.onclose = () => {
                // Remove from active notifications
                this.removeActiveNotification(options.id);
            };
            
            // Auto close after duration
            if (!this.settings.requireInteraction) {
                setTimeout(() => {
                    notification.close();
                    this.removeActiveNotification(options.id);
                }, this.settings.durationMS);
            }
            
            return notification;
        } catch (error) {
            console.error('Failed to show desktop notification:', error);
            return null;
        }
    }

    /**
     * Show in-app notification
     * @param {Object} options - Notification options
     */
    showInAppNotification(options) {
        // Skip if no container
        if (!this.inAppNotificationElement) {
            this.createInAppNotificationElement();
        }
        
        // Create notification element
        const notificationElement = document.createElement('div');
        notificationElement.className = `jaat-notification jaat-notification-${options.type}`;
        notificationElement.dataset.id = options.id;
        
        // Create notification content
        notificationElement.innerHTML = `
            <div class="jaat-notification-icon">${this.getNotificationIcon(options.type)}</div>
            <div class="jaat-notification-content">
                <div class="jaat-notification-title">${options.title}</div>
                <div class="jaat-notification-message">${options.message}</div>
            </div>
            <button class="jaat-notification-close" aria-label="Close">&times;</button>
        `;
        
        // Add to container
        this.inAppNotificationElement.appendChild(notificationElement);
        
        // Add event listeners
        const closeButton = notificationElement.querySelector('.jaat-notification-close');
        closeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.removeInAppNotification(options.id);
        });
        
        notificationElement.addEventListener('click', (event) => {
            // Call custom click handler
            if (typeof options.onClick === 'function') {
                options.onClick(event);
            }
            
            // Remove notification
            this.removeInAppNotification(options.id);
            
            // Decrement unread count
            this.decrementUnreadCount();
            this.updateBadge();
        });
        
        // Auto close after duration
        setTimeout(() => {
            this.removeInAppNotification(options.id);
        }, this.settings.durationMS);
        
        // Animate in
        setTimeout(() => {
            notificationElement.classList.add('show');
        }, 10);
        
        // Limit the number of in-app notifications
        this.limitInAppNotifications();
    }

    /**
     * Limit the number of in-app notifications to max stack size
     */
    limitInAppNotifications() {
        if (!this.inAppNotificationElement) {
            return;
        }
        
        const notifications = this.inAppNotificationElement.querySelectorAll('.jaat-notification');
        if (notifications.length > this.settings.maxStackSize) {
            // Remove oldest notifications
            const count = notifications.length - this.settings.maxStackSize;
            for (let i = 0; i < count; i++) {
                this.inAppNotificationElement.removeChild(notifications[i]);
            }
        }
    }

    /**
     * Remove an in-app notification
     * @param {string} id - Notification ID
     */
    removeInAppNotification(id) {
        if (!this.inAppNotificationElement) {
            return;
        }
        
        const notification = this.inAppNotificationElement.querySelector(`.jaat-notification[data-id="${id}"]`);
        if (notification) {
            // Animate out
            notification.classList.remove('show');
            
            // Remove after animation
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }

    /**
     * Remove an active desktop notification
     * @param {string} id - Notification ID
     */
    removeActiveNotification(id) {
        const index = this.activeNotifications.findIndex(n => n.id === id);
        if (index !== -1) {
            this.activeNotifications.splice(index, 1);
        }
    }

    /**
     * Get SVG icon for notification type
     * @param {string} type - Notification type
     * @returns {string} SVG icon
     */
    getNotificationIcon(type) {
        switch (type) {
            case 'success':
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 12l2 2 6-6"></path></svg>';
                
            case 'warning':
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
                
            case 'error':
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
                
            case 'info':
            default:
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
        }
    }

    /**
     * Play notification sound
     * @param {string} soundId - ID of sound to play
     */
    async playNotificationSound(soundId = null) {
        // Skip if sound is disabled
        if (!this.settings.sound || !this.audioContext) {
            return;
        }
        
        // Use default sound if none specified
        const id = soundId || this.currentSound;
        
        try {
            // Resume audio context if suspended
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            
            // Get audio buffer
            let buffer = this.audioCache.get(id);
            
            // Load if not cached
            if (!buffer) {
                buffer = await this.preloadSound(id);
            }
            
            // Skip if no buffer
            if (!buffer) {
                return;
            }
            
            // Create source
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            
            // Create gain node for volume
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = this.settings.soundVolume;
            
            // Connect nodes
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Play sound
            source.start(0);
        } catch (error) {
            console.error('Failed to play notification sound:', error);
        }
    }

    /**
     * Increment unread notification count
     */
    incrementUnreadCount() {
        this.unreadCount++;
    }

    /**
     * Decrement unread notification count
     */
    decrementUnreadCount() {
        this.unreadCount = Math.max(0, this.unreadCount - 1);
    }

    /**
     * Reset unread notification count
     */
    resetUnreadCount() {
        this.unreadCount = 0;
        this.updateBadge();
    }

    /**
     * Update notification badge
     */
    updateBadge() {
        if (!this.badgeElement) {
            return;
        }
        
        if (this.unreadCount > 0) {
            this.badgeElement.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount.toString();
            this.badgeElement.style.display = 'flex';
            
            // Update document title if page is not focused
            if (!document.hasFocus() && !this.settings.muteChatTab) {
                document.title = `(${this.unreadCount}) ${document.title.replace(/^\(\d+\)\s+/, '')}`;
            }
        } else {
            this.badgeElement.style.display = 'none';
            
            // Reset document title
            if (document.title.match(/^\(\d+\)\s+/)) {
                document.title = document.title.replace(/^\(\d+\)\s+/, '');
            }
        }
    }

    /**
     * Set badge position
     * @param {Object} position - Badge position
     * @param {number} position.top - Top position
     * @param {number} position.right - Right position
     */
    setBadgePosition(position) {
        if (!this.badgeElement) {
            return;
        }
        
        if (position.top !== undefined) {
            this.badgeElement.style.top = `${position.top}px`;
        }
        
        if (position.right !== undefined) {
            this.badgeElement.style.right = `${position.right}px`;
        }
    }

    /**
     * Check if a message should trigger a notification
     * @param {Object} message - Message object
     * @returns {boolean} Whether notification should be triggered
     */
    shouldNotifyForMessage(message) {
        // Skip if notifications are disabled
        if (!this.settings.enabled) {
            return false;
        }
        
        // Skip if new message notifications are disabled
        if (!this.settings.notifyOnNewMessages) {
            return false;
        }
        
        // Always notify for mentions
        if (this.settings.notifyOnMentions && this.containsMention(message.content)) {
            return true;
        }
        
        // Notify for keywords
        if (this.settings.notifyOnKeywords && this.containsKeyword(message.content)) {
            return true;
        }
        
        // Default notification behavior for new messages
        return true;
    }

    /**
     * Check if text contains a mention
     * @param {string} text - Text to check
     * @returns {boolean} Whether text contains a mention
     */
    containsMention(text) {
        // This implementation depends on your mention format
        // Assumes @username format
        return /@\w+/.test(text);
    }

    /**
     * Check if text contains a watched keyword
     * @param {string} text - Text to check
     * @returns {boolean} Whether text contains a keyword
     */
    containsKeyword(text) {
        // Skip if no keywords
        if (!this.settings.keywords || this.settings.keywords.length === 0) {
            return false;
        }
        
        // Convert text to lowercase for case-insensitive matching
        const lowercaseText = text.toLowerCase();
        
        // Check each keyword
        return this.settings.keywords.some(keyword => 
            lowercaseText.includes(keyword.toLowerCase())
        );
    }

    /**
     * Notify for new message
     * @param {Object} message - Message object
     * @returns {string|null} Notification ID or null if no notification
     */
    notifyNewMessage(message) {
        // Check if should notify
        if (!this.shouldNotifyForMessage(message)) {
            return null;
        }
        
        // Create notification options
        const options = {
            title: message.sender || 'New Message',
            message: this.settings.showPreview ? message.content : 'New message received',
            type: 'info',
            icon: message.avatar || 'assets/icons/notification-icon.png',
            onClick: () => {
                // Scroll to message if callback provided
                if (typeof this.eventListeners.messageClick === 'function') {
                    this.eventListeners.messageClick(message);
                }
            }
        };
        
        // Send notification
        return this.notify(options);
    }

    /**
     * Notify for process complete
     * @param {Object} process - Process object
     * @returns {string|null} Notification ID or null if no notification
     */
    notifyProcessComplete(process) {
        // Skip if process complete notifications are disabled
        if (!this.settings.notifyOnProcessComplete) {
            return null;
        }
        
        // Create notification options
        const options = {
            title: 'Process Complete',
            message: process.name || 'A process has completed',
            type: 'success',
            onClick: () => {
                // Process click handler
                if (typeof this.eventListeners.processClick === 'function') {
                    this.eventListeners.processClick(process);
                }
            }
        };
        
        // Send notification
        return this.notify(options);
    }

    /**
     * Notify for export complete
     * @param {Object} exportData - Export data
     * @returns {string|null} Notification ID or null if no notification
     */
    notifyExportComplete(exportData) {
        // Skip if export notifications are disabled
        if (!this.settings.notifyOnExport) {
            return null;
        }
        
        // Create notification options
        const options = {
            title: 'Export Complete',
            message: `Your ${exportData.type || 'data'} has been exported successfully`,
            type: 'success',
            onClick: () => {
                // Export click handler
                if (typeof this.eventListeners.exportClick === 'function') {
                    this.eventListeners.exportClick(exportData);
                }
            }
        };
        
        // Send notification
        return this.notify(options);
    }

    /**
     * Set event listener
     * @param {string} event - Event name
     * @param {Function} callback - Event callback
     */
    on(event, callback) {
        if (typeof callback === 'function') {
            this.eventListeners[event] = callback;
        }
    }

    /**
     * Remove event listener
     * @param {string} event - Event name
     */
    off(event) {
        delete this.eventListeners[event];
    }

    /**
     * Update notifier settings
     * @param {Object} newSettings - New settings
     */
    updateSettings(newSettings) {
        // Update settings
        this.settings = { ...this.settings, ...newSettings };
        
        // Save settings
        this.saveSettings();
    }

    /**
     * Set notification sound
     * @param {string} soundId - Sound ID
     */
    setSound(soundId) {
        // Check if sound exists
        if (!this.sounds.some(s => s.id === soundId)) {
            console.warn(`Sound not found: ${soundId}`);
            return;
        }
        
        // Update current sound
        this.currentSound = soundId;
        
        // Preload sound
        if (this.audioContext) {
            this.preloadSound(soundId);
        }
        
        // Save settings
        this.saveSettings();
    }

    /**
     * Set sound volume
     * @param {number} volume - Volume level (0-1)
     */
    setSoundVolume(volume) {
        // Validate volume
        const validVolume = Math.max(0, Math.min(1, volume));
        
        // Update volume setting
        this.settings.soundVolume = validVolume;
        
        // Save settings
        this.saveSettings();
    }

    /**
     * Add keyword to watch list
     * @param {string} keyword - Keyword to add
     */
    addKeyword(keyword) {
        if (!keyword || typeof keyword !== 'string') {
            return;
        }
        
        // Skip if already exists
        if (this.settings.keywords.includes(keyword)) {
            return;
        }
        
        // Add keyword
        this.settings.keywords.push(keyword);
        
        // Save settings
        this.saveSettings();
    }

    /**
     * Remove keyword from watch list
     * @param {string} keyword - Keyword to remove
     */
    removeKeyword(keyword) {
        // Remove keyword
        this.settings.keywords = this.settings.keywords.filter(k => k !== keyword);
        
        // Save settings
        this.saveSettings();
    }

    /**
     * Create notifier UI
     * @param {HTMLElement|string} container - Container element or selector
     * @returns {HTMLElement} Created UI element
     */
    createUI(container) {
        // Get container element
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) {
            console.error('Container element not found');
            return null;
        }
        
        // Create main UI container
        const uiContainer = document.createElement('div');
        uiContainer.className = 'notifier-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'notifier-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'notifier-title';
        title.textContent = 'Notification Settings';
        header.appendChild(title);
        
        // Create main toggle
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'toggle-container';
        header.appendChild(toggleContainer);
        
        const toggleLabel = document.createElement('span');
        toggleLabel.className = 'toggle-label';
        toggleLabel.textContent = this.settings.enabled ? 'Enabled' : 'Disabled';
        toggleContainer.appendChild(toggleLabel);
        
        const toggleSwitch = document.createElement('label');
        toggleSwitch.className = 'switch';
        toggleContainer.appendChild(toggleSwitch);
        
        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.checked = this.settings.enabled;
        toggleSwitch.appendChild(toggleInput);
        
        const toggleSlider = document.createElement('span');
        toggleSlider.className = 'slider';
        toggleSwitch.appendChild(toggleSlider);
        
        // Create sections
        
        // Notification types section
        const typesSection = document.createElement('div');
        typesSection.className = 'notifier-section';
        uiContainer.appendChild(typesSection);
        
        const typesTitle = document.createElement('h4');
        typesTitle.className = 'section-title';
        typesTitle.textContent = 'Notification Types';
        typesSection.appendChild(typesTitle);
        
        const typesForm = document.createElement('div');
        typesForm.className = 'notifier-form';
        typesSection.appendChild(typesForm);
        
        // Create checkboxes for notification types
        const typeOptions = [
            { id: 'notifyOnNewMessages', label: 'New messages' },
            { id: 'notifyOnMentions', label: 'Mentions (@username)' },
            { id: 'notifyOnKeywords', label: 'Keywords' },
            { id: 'notifyOnExport', label: 'Export complete' },
            { id: 'notifyOnProcessComplete', label: 'Process complete' }
        ];
        
        typeOptions.forEach(option => {
            const optionContainer = document.createElement('div');
            optionContainer.className = 'notifier-option';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = option.id;
            checkbox.checked = this.settings[option.id];
            optionContainer.appendChild(checkbox);
            
            const label = document.createElement('label');
            label.htmlFor = option.id;
            label.textContent = option.label;
            optionContainer.appendChild(label);
            
            typesForm.appendChild(optionContainer);
            
            // Add change event listener
            checkbox.addEventListener('change', () => {
                this.updateSettings({ [option.id]: checkbox.checked });
            });
        });
        
        // Create keywords section (visible only if notifyOnKeywords is checked)
        const keywordsSection = document.createElement('div');
        keywordsSection.className = 'notifier-section keywords-section';
        keywordsSection.style.display = this.settings.notifyOnKeywords ? 'block' : 'none';
        uiContainer.appendChild(keywordsSection);
        
        const keywordsTitle = document.createElement('h4');
        keywordsTitle.className = 'section-title';
        keywordsTitle.textContent = 'Notification Keywords';
        keywordsSection.appendChild(keywordsTitle);
        
        const keywordsForm = document.createElement('div');
        keywordsForm.className = 'keywords-form';
        keywordsSection.appendChild(keywordsForm);
        
        const keywordInput = document.createElement('input');
        keywordInput.type = 'text';
        keywordInput.className = 'keyword-input';
        keywordInput.placeholder = 'Add a keyword...';
        keywordsForm.appendChild(keywordInput);
        
        const addKeywordButton = document.createElement('button');
        addKeywordButton.className = 'add-keyword-btn';
        addKeywordButton.textContent = 'Add';
        keywordsForm.appendChild(addKeywordButton);
        
        const keywordsList = document.createElement('div');
        keywordsList.className = 'keywords-list';
        keywordsSection.appendChild(keywordsList);
        
        // Update keywords list
        const updateKeywordsList = () => {
            keywordsList.innerHTML = '';
            
            if (this.settings.keywords.length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'keywords-empty-state';
                emptyState.textContent = 'No keywords added yet';
                keywordsList.appendChild(emptyState);
                return;
            }
            
            this.settings.keywords.forEach(keyword => {
                const keywordItem = document.createElement('div');
                keywordItem.className = 'keyword-item';
                
                const keywordText = document.createElement('span');
                keywordText.className = 'keyword-text';
                keywordText.textContent = keyword;
                keywordItem.appendChild(keywordText);
                
                const removeButton = document.createElement('button');
                removeButton.className = 'remove-keyword-btn';
                removeButton.innerHTML = '&times;';
                removeButton.title = 'Remove keyword';
                keywordItem.appendChild(removeButton);
                
                // Add click handler for remove button
                removeButton.addEventListener('click', () => {
                    this.removeKeyword(keyword);
                    updateKeywordsList();
                });
                
                keywordsList.appendChild(keywordItem);
            });
        };
        
        // Initial keywords list update
        updateKeywordsList();
        
        // Add keyword button click handler
        addKeywordButton.addEventListener('click', () => {
            const keyword = keywordInput.value.trim();
            if (keyword) {
                this.addKeyword(keyword);
                keywordInput.value = '';
                updateKeywordsList();
            }
        });
        
        // Add keyword on enter key
        keywordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const keyword = keywordInput.value.trim();
                if (keyword) {
                    this.addKeyword(keyword);
                    keywordInput.value = '';
                    updateKeywordsList();
                }
            }
        });
        
        // Show/hide keywords section based on checkbox
        const keywordsCheckbox = document.getElementById('notifyOnKeywords');
        keywordsCheckbox.addEventListener('change', () => {
            keywordsSection.style.display = keywordsCheckbox.checked ? 'block' : 'none';
        });
        
        // Notification delivery section
        const deliverySection = document.createElement('div');
        deliverySection.className = 'notifier-section';
        uiContainer.appendChild(deliverySection);
        
        const deliveryTitle = document.createElement('h4');
        deliveryTitle.className = 'section-title';
        deliveryTitle.textContent = 'Notification Delivery';
        deliverySection.appendChild(deliveryTitle);
        
        const deliveryForm = document.createElement('div');
        deliveryForm.className = 'notifier-form';
        deliverySection.appendChild(deliveryForm);
        
        // Create checkboxes for delivery options
        const deliveryOptions = [
            { id: 'desktop', label: 'Desktop notifications' },
            { id: 'inApp', label: 'In-app notifications' },
            { id: 'sound', label: 'Play sound' },
            { id: 'showPreview', label: 'Show message preview' },
            { id: 'requireInteraction', label: 'Require interaction to dismiss' },
            { id: 'muteChatTab', label: 'Silent when tab is active' },
            { id: 'muteWhenDnd', label: 'Respect Do Not Disturb mode' },
            { id: 'groupNotifications', label: 'Group similar notifications' }
        ];
        
        deliveryOptions.forEach(option => {
            const optionContainer = document.createElement('div');
            optionContainer.className = 'notifier-option';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = option.id;
            checkbox.checked = this.settings[option.id];
            optionContainer.appendChild(checkbox);
            
            const label = document.createElement('label');
            label.htmlFor = option.id;
            label.textContent = option.label;
            optionContainer.appendChild(label);
            
            deliveryForm.appendChild(optionContainer);
            
            // Add change event listener
            checkbox.addEventListener('change', () => {
                this.updateSettings({ [option.id]: checkbox.checked });
                
                // Handle special cases
                if (option.id === 'desktop' && checkbox.checked && this.permissionState !== 'granted') {
                    this.requestNotificationPermission();
                }
            });
        });
        
        // Sound settings section (visible only if sound is checked)
        const soundSection = document.createElement('div');
        soundSection.className = 'notifier-section sound-section';
        soundSection.style.display = this.settings.sound ? 'block' : 'none';
        uiContainer.appendChild(soundSection);
        
        const soundTitle = document.createElement('h4');
        soundTitle.className = 'section-title';
        soundTitle.textContent = 'Sound Settings';
        soundSection.appendChild(soundTitle);
        
        const soundForm = document.createElement('div');
        soundForm.className = 'sound-form';
        soundSection.appendChild(soundForm);
        
        // Sound selector
        const soundSelectContainer = document.createElement('div');
        soundSelectContainer.className = 'sound-select-container';
        soundForm.appendChild(soundSelectContainer);
        
        const soundSelectLabel = document.createElement('label');
        soundSelectLabel.htmlFor = 'sound-select';
        soundSelectLabel.textContent = 'Notification Sound:';
        soundSelectContainer.appendChild(soundSelectLabel);
        
        const soundSelect = document.createElement('select');
        soundSelect.id = 'sound-select';
        soundSelect.className = 'sound-select';
        
        this.sounds.forEach(sound => {
            const option = document.createElement('option');
            option.value = sound.id;
            option.textContent = sound.name;
            if (sound.id === this.currentSound) {
                option.selected = true;
            }
            soundSelect.appendChild(option);
        });
        
        soundSelectContainer.appendChild(soundSelect);
        
        // Sound preview button
        const previewButton = document.createElement('button');
        previewButton.className = 'sound-preview-btn';
        previewButton.textContent = 'Preview';
        soundSelectContainer.appendChild(previewButton);
        
        // Volume slider
        const volumeContainer = document.createElement('div');
        volumeContainer.className = 'volume-container';
        soundForm.appendChild(volumeContainer);
        
        const volumeLabel = document.createElement('label');
        volumeLabel.htmlFor = 'volume-slider';
        volumeLabel.textContent = 'Volume:';
        volumeContainer.appendChild(volumeLabel);
        
        const volumeValue = document.createElement('span');
        volumeValue.className = 'volume-value';
        volumeValue.textContent = `${Math.round(this.settings.soundVolume * 100)}%`;
        volumeContainer.appendChild(volumeValue);
        
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.id = 'volume-slider';
        volumeSlider.className = 'volume-slider';
        volumeSlider.min = '0';
        volumeSlider.max = '1';
        volumeSlider.step = '0.05';
        volumeSlider.value = this.settings.soundVolume.toString();
        volumeContainer.appendChild(volumeSlider);
        
        // Sound select change handler
        soundSelect.addEventListener('change', () => {
            this.setSound(soundSelect.value);
        });
        
        // Preview button click handler
        previewButton.addEventListener('click', () => {
            this.playNotificationSound(soundSelect.value);
        });
        
        // Volume slider change handler
        volumeSlider.addEventListener('input', () => {
            const volume = parseFloat(volumeSlider.value);
            this.setSoundVolume(volume);
            volumeValue.textContent = `${Math.round(volume * 100)}%`;
        });
        
        // Show/hide sound section based on checkbox
        const soundCheckbox = document.getElementById('sound');
        soundCheckbox.addEventListener('change', () => {
            soundSection.style.display = soundCheckbox.checked ? 'block' : 'none';
        });
        
        // Add main toggle event listener
        toggleInput.addEventListener('change', () => {
            this.updateSettings({ enabled: toggleInput.checked });
            toggleLabel.textContent = toggleInput.checked ? 'Enabled' : 'Disabled';
        });
        
        // Add permission request button if needed
        if (this.permissionState !== 'granted' && this.permissionState !== 'unsupported') {
            const permissionSection = document.createElement('div');
            permissionSection.className = 'notifier-section permission-section';
            uiContainer.insertBefore(permissionSection, uiContainer.firstChild.nextSibling);
            
            const permissionMessage = document.createElement('div');
            permissionMessage.className = 'permission-message';
            permissionMessage.innerHTML = `
                <p>Desktop notifications are not enabled for this site. Click the button below to enable them.</p>
                <button class="request-permission-btn">Enable Desktop Notifications</button>
            `;
            permissionSection.appendChild(permissionMessage);
            
            // Add click handler for permission button
            const permissionButton = permissionMessage.querySelector('.request-permission-btn');
            permissionButton.addEventListener('click', async () => {
                const permission = await this.requestNotificationPermission();
                
                if (permission === 'granted') {
                    // Update desktop checkbox
                    const desktopCheckbox = document.getElementById('desktop');
                    if (desktopCheckbox) {
                        desktopCheckbox.checked = true;
                    }
                    
                    // Remove permission section
                    uiContainer.removeChild(permissionSection);
                }
            });
        }
        
        // Add styles
        this.addStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles for UI
     */
    addStyles() {
        const styleId = 'notifier-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .notifier-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .notifier-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .notifier-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .toggle-container {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .toggle-label {
                font-size: 0.875rem;
            }
            
            .switch {
                position: relative;
                display: inline-block;
                width: 48px;
                height: 24px;
            }
            
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                transition: .4s;
                border-radius: 34px;
            }
            
            .slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 2px;
                background-color: var(--text-primary, #f0f6fc);
                transition: .4s;
                border-radius: 50%;
            }
            
            input:checked + .slider {
                background-color: var(--accent-primary, #7c3aed);
            }
            
            input:focus + .slider {
                box-shadow: 0 0 1px var(--accent-primary, #7c3aed);
            }
            
            input:checked + .slider:before {
                transform: translateX(24px);
            }
            
            .notifier-section {
                margin-bottom: 1.5rem;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .section-title {
                font-size: 1rem;
                font-weight: 600;
                margin: 0 0 1rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .notifier-form {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 0.75rem;
            }
            
            .notifier-option {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .notifier-option input[type="checkbox"] {
                margin: 0;
            }
            
            .notifier-option label {
                font-size: 0.875rem;
                cursor: pointer;
            }
            
            .keywords-form {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .keyword-input {
                flex: 1;
                padding: 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .add-keyword-btn {
                padding: 0.5rem 1rem;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .add-keyword-btn:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .keywords-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .keyword-item {
                display: flex;
                align-items: center;
                gap: 0.25rem;
                padding: 0.25rem 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
            }
            
            .remove-keyword-btn {
                width: 16px;
                height: 16px;
                border: none;
                background: none;
                color: var(--text-secondary, #8b949e);
                font-size: 1rem;
                line-height: 1;
                cursor: pointer;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .remove-keyword-btn:hover {
                color: var(--error-color, #f87171);
            }
            
            .keywords-empty-state {
                color: var(--text-secondary, #8b949e);
                font-style: italic;
                font-size: 0.875rem;
                text-align: center;
                padding: 1rem;
            }
            
            .sound-select-container {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .sound-select-container label {
                min-width: 140px;
                font-size: 0.875rem;
            }
            
            .sound-select {
                flex: 1;
                padding: 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .sound-preview-btn {
                padding: 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.75rem;
                cursor: pointer;
            }
            
            .sound-preview-btn:hover {
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .volume-container {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .volume-container label {
                min-width: 140px;
                font-size: 0.875rem;
            }
            
            .volume-slider {
                flex: 1;
                height: 5px;
                -webkit-appearance: none;
                background: var(--bg-secondary, #161b22);
                border-radius: var(--radius-sm, 0.375rem);
                outline: none;
            }
            
            .volume-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: var(--accent-primary, #7c3aed);
                cursor: pointer;
            }
            
            .volume-slider::-moz-range-thumb {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: var(--accent-primary, #7c3aed);
                cursor: pointer;
                border: none;
            }
            
            .volume-value {
                width: 40px;
                text-align: right;
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .permission-section {
                background-color: rgba(239, 68, 68, 0.1);
                border-color: rgba(239, 68, 68, 0.3);
                margin-bottom: 1rem;
            }
            
            .permission-message {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .permission-message p {
                margin: 0;
                font-size: 0.875rem;
            }
            
            .request-permission-btn {
                align-self: flex-start;
                padding: 0.5rem 1rem;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .request-permission-btn:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            /* In-app notification styles */
            .jaat-notification-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 300px;
                max-width: calc(100vw - 40px);
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .jaat-notification {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                background-color: var(--bg-primary, #0d1117);
                border-left: 4px solid var(--accent-primary, #7c3aed);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 12px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                transform: translateX(100%);
                opacity: 0;
                transition: transform 0.3s, opacity 0.3s;
                cursor: pointer;
            }
            
            .jaat-notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .jaat-notification-info {
                border-left-color: var(--info-color, #3b82f6);
            }
            
            .jaat-notification-success {
                border-left-color: var(--success-color, #10b981);
            }
            
            .jaat-notification-warning {
                border-left-color: var(--warning-color, #f59e0b);
            }
            
            .jaat-notification-error {
                border-left-color: var(--error-color, #ef4444);
            }
            
            .jaat-notification-icon {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-secondary, #8b949e);
                flex-shrink: 0;
            }
            
            .jaat-notification-info .jaat-notification-icon {
                color: var(--info-color, #3b82f6);
            }
            
            .jaat-notification-success .jaat-notification-icon {
                color: var(--success-color, #10b981);
            }
            
            .jaat-notification-warning .jaat-notification-icon {
                color: var(--warning-color, #f59e0b);
            }
            
            .jaat-notification-error .jaat-notification-icon {
                color: var(--error-color, #ef4444);
            }
            
            .jaat-notification-content {
                flex: 1;
                min-width: 0;
            }
            
            .jaat-notification-title {
                font-weight: 600;
                font-size: 0.875rem;
                margin-bottom: 4px;
                color: var(--text-primary, #f0f6fc);
            }
            
            .jaat-notification-message {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            
            .jaat-notification-close {
                background: none;
                border: none;
                color: var(--text-secondary, #8b949e);
                font-size: 1.25rem;
                line-height: 1;
                cursor: pointer;
                padding: 0;
                margin-left: 8px;
                flex-shrink: 0;
            }
            
            .jaat-notification-close:hover {
                color: var(--text-primary, #f0f6fc);
            }
            
            /* Badge styles */
            .jaat-notification-badge {
                position: fixed;
                top: 10px;
                right: 10px;
                width: 20px;
                height: 20px;
                background-color: var(--error-color, #ef4444);
                color: white;
                border-radius: 50%;
                font-size: 0.75rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                z-index: 9999;
            }
            
            @media (max-width: 768px) {
                .notifier-form {
                    grid-template-columns: 1fr;
                }
                
                .sound-select-container {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }
                
                .sound-select-container label {
                    min-width: auto;
                }
                
                .volume-container {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }
                
                .volume-container label {
                    min-width: auto;
                }
                
                .jaat-notification-container {
                    bottom: 10px;
                    right: 10px;
                    width: calc(100% - 20px);
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChatbotNotifier };
} else {
    // Add to global scope for browser usage
    window.ChatbotNotifier = ChatbotNotifier;
}
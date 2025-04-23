/**
 * JAAT-AI Avatar Changer Feature
 * Customize the AI assistant's avatar with various characters and styles
 */

class AIAvatarChanger {
    constructor() {
        this.currentAvatar = null;
        this.currentAnimation = 'pulse';
        this.customAvatars = [];
        this.defaultAvatars = [
            {
                id: 'ai-orb-blue',
                name: 'AI Orb (Blue)',
                url: null, // Uses CSS default
                category: 'abstract'
            },
            {
                id: 'ai-orb-purple',
                name: 'AI Orb (Purple)',
                url: '#6a11cb',
                category: 'abstract'
            },
            {
                id: 'ai-orb-cyan',
                name: 'AI Orb (Cyan)',
                url: '#00c6ff',
                category: 'abstract'
            },
            {
                id: 'ai-assistant',
                name: 'AI Assistant',
                url: 'assets/avatars/assistant.svg',
                category: 'character'
            },
            {
                id: 'robot',
                name: 'Robot',
                url: 'assets/avatars/robot.svg',
                category: 'character'
            },
            {
                id: 'scientist',
                name: 'Scientist',
                url: 'assets/avatars/scientist.svg',
                category: 'character'
            },
            {
                id: 'astronaut',
                name: 'Astronaut',
                url: 'assets/avatars/astronaut.svg',
                category: 'character'
            },
            {
                id: 'hologram',
                name: 'Hologram',
                url: 'assets/avatars/hologram.svg',
                category: 'abstract'
            }
        ];
        
        this.animationStyles = [
            { id: 'none', name: 'None' },
            { id: 'pulse', name: 'Pulse' },
            { id: 'bounce', name: 'Bounce' },
            { id: 'rotate', name: 'Rotate' },
            { id: 'glitch', name: 'Glitch' },
            { id: 'flicker', name: 'Flicker' },
            { id: 'holo-scan', name: 'Holographic Scan' }
        ];
        
        this.preferences = {
            avatar: 'ai-orb-blue',
            animation: 'pulse',
            animationSpeed: 'normal'
        };
    }

    /**
     * Initialize avatar changer
     * @param {Object} options - Configuration options
     * @returns {AIAvatarChanger} This instance
     */
    init(options = {}) {
        // Load saved preferences
        this.loadPreferences();
        
        // Set initial avatar from preferences
        this.currentAvatar = this.preferences.avatar;
        this.currentAnimation = this.preferences.animation;
        
        // Set up mutation observer
        this.initAvatarObserver();
        
        // Initial scan for elements
        this.scanForAvatarElements();
        
        return this;
    }

    /**
     * Load saved preferences from localStorage
     */
    loadPreferences() {
        try {
            const saved = localStorage.getItem('jaat_avatar_preferences');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.preferences = { ...this.preferences, ...parsed };
            }
            
            // Load custom avatars
            const customAvatars = localStorage.getItem('jaat_custom_avatars');
            if (customAvatars) {
                this.customAvatars = JSON.parse(customAvatars);
            }
        } catch (error) {
            console.error('Failed to load avatar preferences:', error);
        }
    }

    /**
     * Save preferences to localStorage
     */
    savePreferences() {
        try {
            localStorage.setItem('jaat_avatar_preferences', JSON.stringify(this.preferences));
            localStorage.setItem('jaat_custom_avatars', JSON.stringify(this.customAvatars));
        } catch (error) {
            console.error('Failed to save avatar preferences:', error);
        }
    }

    /**
     * Initialize MutationObserver to automatically apply avatars to new messages
     */
    initAvatarObserver() {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length) {
                    // Scan for new avatar elements
                    this.scanForAvatarElements();
                }
            }
        });
        
        // Start observing the entire document
        observer.observe(document.body, { childList: true, subtree: true });
    }

    /**
     * Scan the DOM for AI avatar elements and update them
     */
    scanForAvatarElements() {
        const avatarElements = document.querySelectorAll('.ai-avatar, .jaat-avatar, .assistant-avatar');
        
        avatarElements.forEach(element => {
            if (!element.dataset.avatarInitialized) {
                this.updateAvatarElement(element);
                element.dataset.avatarInitialized = 'true';
            }
        });
    }

    /**
     * Update a specific avatar element with the current avatar
     * @param {HTMLElement} element - Avatar element to update
     */
    updateAvatarElement(element) {
        // Get avatar info
        let avatarInfo = this.defaultAvatars.find(a => a.id === this.currentAvatar);
        
        if (!avatarInfo) {
            // Check custom avatars
            avatarInfo = this.customAvatars.find(a => a.id === this.currentAvatar);
        }
        
        if (!avatarInfo) {
            // Fallback to first default avatar
            avatarInfo = this.defaultAvatars[0];
        }
        
        // Style the element
        element.classList.add('avatar-container');
        
        // Either use background color or image
        if (avatarInfo.url && avatarInfo.url.startsWith('#')) {
            // It's a color
            element.style.backgroundColor = avatarInfo.url;
            element.style.backgroundImage = 'none';
        } else if (avatarInfo.url) {
            // It's an image
            element.style.backgroundImage = `url(${avatarInfo.url})`;
            element.style.backgroundColor = 'transparent';
        } else {
            // Use default styles
            element.style.backgroundImage = 'none';
            element.style.backgroundColor = '#3a86ff';
        }
        
        // Apply animation
        this.applyAnimationStyle([element]);
    }

    /**
     * Change the current avatar
     * @param {string} avatarId - Avatar ID to select
     * @returns {boolean} Whether the avatar was changed successfully
     */
    changeAvatar(avatarId) {
        // Validate avatar exists
        const isDefault = this.defaultAvatars.some(a => a.id === avatarId);
        const isCustom = this.customAvatars.some(a => a.id === avatarId);
        
        if (!isDefault && !isCustom) {
            console.error(`Avatar ${avatarId} not found`);
            return false;
        }
        
        // Update current avatar
        this.currentAvatar = avatarId;
        this.preferences.avatar = avatarId;
        this.savePreferences();
        
        // Update all avatar elements
        this.scanForAvatarElements();
        
        return true;
    }

    /**
     * Change animation style
     * @param {string} animationId - Animation style ID
     * @returns {boolean} Whether the animation was changed successfully
     */
    changeAnimation(animationId) {
        // Validate animation exists
        const animation = this.animationStyles.find(a => a.id === animationId);
        
        if (!animation) {
            console.error(`Animation ${animationId} not found`);
            return false;
        }
        
        // Update current animation
        this.currentAnimation = animationId;
        this.preferences.animation = animationId;
        this.savePreferences();
        
        // Update all avatar elements
        this.scanForAvatarElements();
        
        return true;
    }

    /**
     * Stop current animation
     */
    stopAnimation() {
        this.changeAnimation('none');
    }

    /**
     * Apply current animation style to elements
     * @param {Array<HTMLElement>} elements - Elements to animate
     */
    applyAnimationStyle(elements) {
        // Remove existing animation classes
        const animationClasses = this.animationStyles.map(a => `avatar-${a.id}`);
        
        elements.forEach(element => {
            element.classList.remove(...animationClasses);
            
            // Remove any inline animation styles
            element.style.animation = '';
            
            // If animation is 'none', we're done
            if (this.currentAnimation === 'none') return;
            
            // Add the new animation class
            element.classList.add(`avatar-${this.currentAnimation}`);
            
            // Special handling for glitch animation
            if (this.currentAnimation === 'glitch') {
                this.applyGlitchAnimation(elements);
            }
        });
    }

    /**
     * Apply glitch animation using JavaScript
     * @param {Array<HTMLElement>} elements - Elements to animate
     */
    applyGlitchAnimation(elements) {
        elements.forEach(element => {
            // Create glitch effect elements
            const before = document.createElement('div');
            before.className = 'glitch-before';
            
            const after = document.createElement('div');
            after.className = 'glitch-after';
            
            // Copy background properties
            before.style.backgroundImage = element.style.backgroundImage;
            after.style.backgroundImage = element.style.backgroundImage;
            
            before.style.backgroundColor = element.style.backgroundColor;
            after.style.backgroundColor = element.style.backgroundColor;
            
            // Add to element
            if (!element.querySelector('.glitch-before')) {
                element.appendChild(before);
                element.appendChild(after);
            }
        });
    }

    /**
     * Check if an element is visible in the viewport
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} Whether the element is visible
     */
    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Upload a custom avatar image
     * @param {File} file - Image file to upload
     * @returns {Promise<string>} New avatar ID
     */
    async uploadCustomAvatar(file) {
        // Check file type
        if (!file.type.startsWith('image/')) {
            throw new Error('File must be an image');
        }
        
        try {
            // Read file as data URL
            const reader = new FileReader();
            
            const dataUrl = await new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
            
            // Generate unique ID
            const id = `custom-${Date.now()}`;
            
            // Create custom avatar
            const customAvatar = {
                id,
                name: file.name.split('.')[0] || 'Custom Avatar',
                url: dataUrl,
                category: 'custom'
            };
            
            // Add to custom avatars
            this.customAvatars.push(customAvatar);
            this.savePreferences();
            
            // Set as current avatar
            this.changeAvatar(id);
            
            return id;
        } catch (error) {
            console.error('Failed to upload custom avatar:', error);
            throw error;
        }
    }

    /**
     * Delete a custom avatar
     * @param {string} avatarId - Avatar ID to delete
     * @returns {boolean} Whether the avatar was deleted successfully
     */
    deleteCustomAvatar(avatarId) {
        // Check if avatar is custom
        const index = this.customAvatars.findIndex(a => a.id === avatarId);
        
        if (index === -1) {
            console.error(`Avatar ${avatarId} is not a custom avatar or does not exist`);
            return false;
        }
        
        // Remove from custom avatars
        this.customAvatars.splice(index, 1);
        this.savePreferences();
        
        // If current avatar was deleted, switch to default
        if (this.currentAvatar === avatarId) {
            this.changeAvatar(this.defaultAvatars[0].id);
        }
        
        return true;
    }

    /**
     * Create avatar changer UI
     * @param {HTMLElement|string} container - Container element or selector
     * @returns {HTMLElement} Created UI container
     */
    createUI(container) {
        // Find container element
        let containerElement;
        
        if (typeof container === 'string') {
            containerElement = document.querySelector(container);
        } else {
            containerElement = container;
        }
        
        if (!containerElement) {
            console.error('Avatar changer UI container not found');
            return null;
        }
        
        // Add CSS styles
        this.addUIStyles();
        
        // Create UI container
        const uiContainer = document.createElement('div');
        uiContainer.className = 'avatar-changer-ui';
        
        // Add title
        const title = document.createElement('h3');
        title.textContent = 'AI Assistant Appearance';
        title.className = 'avatar-changer-title';
        uiContainer.appendChild(title);
        
        // Add avatar grid
        const gridContainer = document.createElement('div');
        gridContainer.className = 'avatar-grid-container';
        
        // Add category filter
        const categoryFilter = document.createElement('div');
        categoryFilter.className = 'avatar-category-filter';
        
        const filterItems = [
            { id: 'all', name: 'All' },
            { id: 'abstract', name: 'Abstract' },
            { id: 'character', name: 'Characters' },
            { id: 'custom', name: 'Custom' }
        ];
        
        filterItems.forEach(filter => {
            const filterButton = document.createElement('button');
            filterButton.textContent = filter.name;
            filterButton.className = 'avatar-filter-button';
            filterButton.dataset.category = filter.id;
            
            if (filter.id === 'all') {
                filterButton.classList.add('active');
            }
            
            filterButton.addEventListener('click', () => {
                // Update active state
                categoryFilter.querySelectorAll('.avatar-filter-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                filterButton.classList.add('active');
                
                // Filter grid
                this.filterAvatarsByCategory(avatarGrid, filter.id);
            });
            
            categoryFilter.appendChild(filterButton);
        });
        
        gridContainer.appendChild(categoryFilter);
        
        // Create avatar grid
        const avatarGrid = document.createElement('div');
        avatarGrid.className = 'avatar-grid';
        
        // Populate avatar grid
        this.populateAvatarsGrid(avatarGrid);
        
        gridContainer.appendChild(avatarGrid);
        uiContainer.appendChild(gridContainer);
        
        // Add animation selector
        const animationContainer = document.createElement('div');
        animationContainer.className = 'avatar-animation-container';
        
        const animationLabel = document.createElement('label');
        animationLabel.textContent = 'Animation:';
        animationLabel.className = 'avatar-option-label';
        animationContainer.appendChild(animationLabel);
        
        const animationSelect = document.createElement('select');
        animationSelect.className = 'avatar-animation-select';
        
        this.animationStyles.forEach(animation => {
            const option = document.createElement('option');
            option.value = animation.id;
            option.textContent = animation.name;
            
            if (animation.id === this.currentAnimation) {
                option.selected = true;
            }
            
            animationSelect.appendChild(option);
        });
        
        animationSelect.addEventListener('change', () => {
            this.changeAnimation(animationSelect.value);
        });
        
        animationContainer.appendChild(animationSelect);
        uiContainer.appendChild(animationContainer);
        
        // Add custom avatar upload
        const uploadContainer = document.createElement('div');
        uploadContainer.className = 'avatar-upload-container';
        
        const uploadLabel = document.createElement('label');
        uploadLabel.textContent = 'Upload Custom Avatar:';
        uploadLabel.className = 'avatar-option-label';
        uploadContainer.appendChild(uploadLabel);
        
        const uploadInput = document.createElement('input');
        uploadInput.type = 'file';
        uploadInput.accept = 'image/*';
        uploadInput.className = 'avatar-upload-input';
        
        uploadInput.addEventListener('change', async () => {
            if (uploadInput.files && uploadInput.files[0]) {
                try {
                    await this.uploadCustomAvatar(uploadInput.files[0]);
                    
                    // Refresh avatar grid
                    this.populateAvatarsGrid(avatarGrid);
                    
                    // Reset file input
                    uploadInput.value = '';
                } catch (error) {
                    console.error('Failed to upload avatar:', error);
                }
            }
        });
        
        uploadContainer.appendChild(uploadInput);
        uiContainer.appendChild(uploadContainer);
        
        // Add to container
        containerElement.appendChild(uiContainer);
        
        return uiContainer;
    }

    /**
     * Populate avatars grid with avatar options
     * @param {HTMLElement} grid - Avatars grid element
     */
    populateAvatarsGrid(grid) {
        // Clear grid
        grid.innerHTML = '';
        
        // Add default avatars
        this.defaultAvatars.forEach(avatar => {
            const avatarItem = document.createElement('div');
            avatarItem.className = 'avatar-grid-item';
            avatarItem.dataset.category = avatar.category;
            
            if (avatar.id === this.currentAvatar) {
                avatarItem.classList.add('active');
            }
            
            const avatarPreview = document.createElement('div');
            avatarPreview.className = 'avatar-preview';
            
            // Set background color or image
            if (avatar.url && avatar.url.startsWith('#')) {
                avatarPreview.style.backgroundColor = avatar.url;
            } else if (avatar.url) {
                avatarPreview.style.backgroundImage = `url(${avatar.url})`;
            } else {
                // Use default styles
                avatarPreview.style.backgroundColor = '#3a86ff';
            }
            
            avatarItem.appendChild(avatarPreview);
            
            const avatarName = document.createElement('div');
            avatarName.className = 'avatar-name';
            avatarName.textContent = avatar.name;
            
            avatarItem.appendChild(avatarName);
            
            // Add click handler
            avatarItem.addEventListener('click', () => {
                this.changeAvatar(avatar.id);
                
                // Update active state
                grid.querySelectorAll('.avatar-grid-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                avatarItem.classList.add('active');
            });
            
            grid.appendChild(avatarItem);
        });
        
        // Add custom avatars
        this.customAvatars.forEach(avatar => {
            const avatarItem = document.createElement('div');
            avatarItem.className = 'avatar-grid-item';
            avatarItem.dataset.category = 'custom';
            
            if (avatar.id === this.currentAvatar) {
                avatarItem.classList.add('active');
            }
            
            const avatarPreview = document.createElement('div');
            avatarPreview.className = 'avatar-preview';
            avatarPreview.style.backgroundImage = `url(${avatar.url})`;
            
            avatarItem.appendChild(avatarPreview);
            
            const avatarName = document.createElement('div');
            avatarName.className = 'avatar-name';
            avatarName.textContent = avatar.name;
            
            avatarItem.appendChild(avatarName);
            
            // Add delete button for custom avatars
            const deleteButton = document.createElement('button');
            deleteButton.className = 'avatar-delete-button';
            deleteButton.innerHTML = '&times;';
            deleteButton.title = 'Delete custom avatar';
            
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (confirm(`Delete custom avatar "${avatar.name}"?`)) {
                    this.deleteCustomAvatar(avatar.id);
                    
                    // Refresh grid
                    this.populateAvatarsGrid(grid);
                }
            });
            
            avatarItem.appendChild(deleteButton);
            
            // Add click handler
            avatarItem.addEventListener('click', () => {
                this.changeAvatar(avatar.id);
                
                // Update active state
                grid.querySelectorAll('.avatar-grid-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                avatarItem.classList.add('active');
            });
            
            grid.appendChild(avatarItem);
        });
    }

    /**
     * Filter avatars grid by category
     * @param {HTMLElement} grid - Avatars grid element
     * @param {string} category - Category to filter by, or 'all' for all categories
     */
    filterAvatarsByCategory(grid, category) {
        const items = grid.querySelectorAll('.avatar-grid-item');
        
        if (category === 'all') {
            items.forEach(item => {
                item.style.display = '';
            });
        } else {
            items.forEach(item => {
                if (item.dataset.category === category) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    }

    /**
     * Add CSS styles for the avatar changer UI
     */
    addUIStyles() {
        // Check if styles are already added
        if (document.getElementById('avatar-changer-styles')) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = 'avatar-changer-styles';
        
        style.textContent = `
            .avatar-changer-ui {
                background: rgba(20, 25, 39, 0.7);
                border-radius: 12px;
                border: 1px solid rgba(58, 134, 255, 0.3);
                padding: 20px;
                max-width: 500px;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }
            
            .avatar-changer-title {
                color: #ffffff;
                font-size: 18px;
                margin: 0 0 15px 0;
                text-align: center;
            }
            
            .avatar-grid-container {
                margin-bottom: 20px;
            }
            
            .avatar-category-filter {
                display: flex;
                margin-bottom: 15px;
                border-bottom: 1px solid rgba(58, 134, 255, 0.2);
                padding-bottom: 10px;
            }
            
            .avatar-filter-button {
                background: none;
                border: none;
                color: #a0aec0;
                cursor: pointer;
                font-size: 14px;
                margin-right: 15px;
                padding: 5px 10px;
                transition: all 0.2s;
            }
            
            .avatar-filter-button:hover {
                color: #ffffff;
            }
            
            .avatar-filter-button.active {
                color: #3a86ff;
                border-bottom: 2px solid #3a86ff;
            }
            
            .avatar-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .avatar-grid-item {
                cursor: pointer;
                position: relative;
                text-align: center;
                transition: transform 0.2s;
            }
            
            .avatar-grid-item:hover {
                transform: scale(1.05);
            }
            
            .avatar-grid-item.active .avatar-preview {
                border-color: #3a86ff;
                box-shadow: 0 0 12px rgba(58, 134, 255, 0.5);
            }
            
            .avatar-preview {
                aspect-ratio: 1;
                background-color: #3a86ff;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 50%;
                border: 2px solid rgba(255, 255, 255, 0.1);
                height: 60px;
                margin: 0 auto 8px;
                width: 60px;
            }
            
            .avatar-name {
                color: #edf2f7;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            .avatar-delete-button {
                background: rgba(255, 0, 0, 0.6);
                border-radius: 50%;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 16px;
                height: 20px;
                line-height: 1;
                position: absolute;
                right: 0;
                top: 0;
                width: 20px;
            }
            
            .avatar-delete-button:hover {
                background: rgba(255, 0, 0, 0.8);
            }
            
            .avatar-animation-container,
            .avatar-upload-container {
                margin-bottom: 15px;
            }
            
            .avatar-option-label {
                color: #edf2f7;
                display: block;
                font-size: 14px;
                margin-bottom: 8px;
            }
            
            .avatar-animation-select {
                background: rgba(20, 30, 50, 0.5);
                border-radius: 4px;
                border: 1px solid rgba(58, 134, 255, 0.3);
                color: #ffffff;
                padding: 8px 12px;
                width: 100%;
            }
            
            .avatar-upload-input {
                color: #ffffff;
                margin-top: 5px;
                width: 100%;
            }
            
            /* Avatar container style */
            .avatar-container {
                border-radius: 50%;
                height: 40px;
                width: 40px;
                background-position: center;
                background-size: cover;
                position: relative;
                overflow: hidden;
            }
            
            /* Animation styles */
            .avatar-pulse {
                animation: avatar-pulse 2s ease-in-out infinite;
            }
            
            @keyframes avatar-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .avatar-bounce {
                animation: avatar-bounce 1s ease-in-out infinite;
            }
            
            @keyframes avatar-bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            .avatar-rotate {
                animation: avatar-rotate 3s linear infinite;
            }
            
            @keyframes avatar-rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .avatar-flicker {
                animation: avatar-flicker 2s linear infinite;
            }
            
            @keyframes avatar-flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
                52% { opacity: 0.9; }
                54% { opacity: 0.8; }
                56% { opacity: 1; }
                80% { opacity: 0.9; }
                82% { opacity: 1; }
            }
            
            .avatar-holo-scan {
                position: relative;
                overflow: hidden;
            }
            
            .avatar-holo-scan::after {
                content: "";
                position: absolute;
                top: -100%;
                left: -100%;
                width: 300%;
                height: 300%;
                background: linear-gradient(
                    45deg,
                    transparent 0%,
                    rgba(58, 134, 255, 0.1) 45%,
                    rgba(58, 134, 255, 0.2) 50%,
                    rgba(58, 134, 255, 0.1) 55%,
                    transparent 100%
                );
                animation: holo-scan 3s linear infinite;
            }
            
            @keyframes holo-scan {
                from { transform: rotate(0deg) translateY(0); }
                to { transform: rotate(360deg) translateY(0); }
            }
            
            /* Glitch animation */
            .avatar-glitch {
                position: relative;
            }
            
            .glitch-before,
            .glitch-after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
            
            .glitch-before {
                left: -2px;
                background-color: inherit;
                background-image: inherit;
                opacity: 0.8;
                animation: glitch-anim-1 2.5s infinite;
            }
            
            .glitch-after {
                left: 2px;
                background-color: inherit;
                background-image: inherit;
                opacity: 0.8;
                animation: glitch-anim-2 3s infinite;
            }
            
            @keyframes glitch-anim-1 {
                0%, 100% { opacity: 0; transform: translate(0, 0); filter: blur(0); }
                1%, 3%, 5%, 7% { opacity: 0.3; transform: translate(-5px, 0); filter: blur(0); }
                2%, 4%, 6%, 8% { opacity: 0.3; transform: translate(5px, 0); filter: blur(0); }
                42%, 47% { opacity: 0.3; transform: translate(0, 0); filter: blur(2px); }
            }
            
            @keyframes glitch-anim-2 {
                0%, 100% { opacity: 0; transform: translate(0, 0); filter: blur(0); }
                10%, 12%, 14%, 16% { opacity: 0.3; transform: translate(-5px, 0); filter: blur(0); }
                11%, 13%, 15%, 17% { opacity: 0.3; transform: translate(5px, 0); filter: blur(0); }
                72%, 77% { opacity: 0.3; transform: translate(0, 0); filter: blur(2px); }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export singleton instance
const avatarChanger = new AIAvatarChanger();
export default avatarChanger;
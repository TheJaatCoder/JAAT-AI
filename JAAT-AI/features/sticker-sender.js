/**
 * JAAT-AI Sticker Sender Feature
 * Send animated stickers and emojis in chat conversations
 */

class StickerSender {
    constructor() {
        // Sticker packs
        this.stickerPacks = [
            {
                id: 'emoji',
                name: 'Emoji Stickers',
                description: 'Classic emoji as stickers',
                stickers: [
                    { id: 'emoji-smile', name: 'Smile', url: 'assets/stickers/emoji/smile.png' },
                    { id: 'emoji-laugh', name: 'Laugh', url: 'assets/stickers/emoji/laugh.png' },
                    { id: 'emoji-heart', name: 'Heart', url: 'assets/stickers/emoji/heart.png' },
                    { id: 'emoji-sad', name: 'Sad', url: 'assets/stickers/emoji/sad.png' },
                    { id: 'emoji-angry', name: 'Angry', url: 'assets/stickers/emoji/angry.png' },
                    { id: 'emoji-surprise', name: 'Surprise', url: 'assets/stickers/emoji/surprise.png' },
                    { id: 'emoji-cool', name: 'Cool', url: 'assets/stickers/emoji/cool.png' },
                    { id: 'emoji-thumbsup', name: 'Thumbs Up', url: 'assets/stickers/emoji/thumbsup.png' },
                    { id: 'emoji-thumbsdown', name: 'Thumbs Down', url: 'assets/stickers/emoji/thumbsdown.png' },
                    { id: 'emoji-party', name: 'Party', url: 'assets/stickers/emoji/party.png' },
                    { id: 'emoji-clap', name: 'Clap', url: 'assets/stickers/emoji/clap.png' },
                    { id: 'emoji-fire', name: 'Fire', url: 'assets/stickers/emoji/fire.png' }
                ]
            },
            {
                id: 'animals',
                name: 'Animals',
                description: 'Cute animal stickers',
                stickers: [
                    { id: 'animal-cat', name: 'Cat', url: 'assets/stickers/animals/cat.png' },
                    { id: 'animal-dog', name: 'Dog', url: 'assets/stickers/animals/dog.png' },
                    { id: 'animal-rabbit', name: 'Rabbit', url: 'assets/stickers/animals/rabbit.png' },
                    { id: 'animal-fox', name: 'Fox', url: 'assets/stickers/animals/fox.png' },
                    { id: 'animal-bear', name: 'Bear', url: 'assets/stickers/animals/bear.png' },
                    { id: 'animal-panda', name: 'Panda', url: 'assets/stickers/animals/panda.png' },
                    { id: 'animal-penguin', name: 'Penguin', url: 'assets/stickers/animals/penguin.png' },
                    { id: 'animal-lion', name: 'Lion', url: 'assets/stickers/animals/lion.png' }
                ]
            },
            {
                id: 'reactions',
                name: 'Reactions',
                description: 'Express yourself with these reaction stickers',
                stickers: [
                    { id: 'reaction-yes', name: 'Yes', url: 'assets/stickers/reactions/yes.png' },
                    { id: 'reaction-no', name: 'No', url: 'assets/stickers/reactions/no.png' },
                    { id: 'reaction-ok', name: 'OK', url: 'assets/stickers/reactions/ok.png' },
                    { id: 'reaction-thanks', name: 'Thanks', url: 'assets/stickers/reactions/thanks.png' },
                    { id: 'reaction-wow', name: 'Wow', url: 'assets/stickers/reactions/wow.png' },
                    { id: 'reaction-haha', name: 'Haha', url: 'assets/stickers/reactions/haha.png' },
                    { id: 'reaction-congrats', name: 'Congrats', url: 'assets/stickers/reactions/congrats.png' },
                    { id: 'reaction-love', name: 'Love', url: 'assets/stickers/reactions/love.png' },
                    { id: 'reaction-confused', name: 'Confused', url: 'assets/stickers/reactions/confused.png' },
                    { id: 'reaction-thinking', name: 'Thinking', url: 'assets/stickers/reactions/thinking.png' }
                ]
            },
            {
                id: 'tech',
                name: 'Tech & Coding',
                description: 'Stickers for tech enthusiasts',
                stickers: [
                    { id: 'tech-code', name: 'Code', url: 'assets/stickers/tech/code.png' },
                    { id: 'tech-bug', name: 'Bug', url: 'assets/stickers/tech/bug.png' },
                    { id: 'tech-robot', name: 'Robot', url: 'assets/stickers/tech/robot.png' },
                    { id: 'tech-lightbulb', name: 'Idea', url: 'assets/stickers/tech/lightbulb.png' },
                    { id: 'tech-rocket', name: 'Rocket', url: 'assets/stickers/tech/rocket.png' },
                    { id: 'tech-coffee', name: 'Coffee', url: 'assets/stickers/tech/coffee.png' },
                    { id: 'tech-laptop', name: 'Laptop', url: 'assets/stickers/tech/laptop.png' },
                    { id: 'tech-deploy', name: 'Deploy', url: 'assets/stickers/tech/deploy.png' }
                ]
            },
            {
                id: 'custom',
                name: 'Custom Stickers',
                description: 'Your custom stickers',
                stickers: []
            }
        ];
        
        // Recently used stickers
        this.recentStickers = [];
        
        // Maximum number of recent stickers to keep
        this.maxRecentStickers = 12;
        
        // Storage keys
        this.storageKeyPrefix = 'jaat-stickers-';
        
        // DOM elements for chat input and container
        this.chatInputSelector = '.chat-input, textarea[name="message"], [contenteditable="true"]';
        this.chatContainerSelector = '.chat-container, .messages-container';
        
        // Sticker picker element
        this.stickerPickerElement = null;
        
        // Event listeners
        this.boundDocumentClickHandler = this.handleDocumentClick.bind(this);
    }

    /**
     * Initialize sticker sender
     * @param {Object} options - Configuration options
     * @returns {StickerSender} This instance
     */
    init(options = {}) {
        // Apply custom options
        if (options.chatInputSelector) {
            this.chatInputSelector = options.chatInputSelector;
        }
        
        if (options.chatContainerSelector) {
            this.chatContainerSelector = options.chatContainerSelector;
        }
        
        if (typeof options.maxRecentStickers === 'number') {
            this.maxRecentStickers = options.maxRecentStickers;
        }
        
        // Load custom stickers and recent stickers
        this.loadSavedStickers();
        
        // Add sticker button to chat inputs
        this.addStickerButtonsToChatInputs();
        
        // Add styles
        this.addStyles();
        
        console.log('Sticker Sender initialized');
        return this;
    }

    /**
     * Load saved stickers from localStorage
     */
    loadSavedStickers() {
        try {
            // Load custom stickers
            const customStickers = localStorage.getItem(`${this.storageKeyPrefix}custom`);
            if (customStickers) {
                const customPack = this.stickerPacks.find(pack => pack.id === 'custom');
                if (customPack) {
                    customPack.stickers = JSON.parse(customStickers);
                }
            }
            
            // Load recent stickers
            const recentStickers = localStorage.getItem(`${this.storageKeyPrefix}recent`);
            if (recentStickers) {
                this.recentStickers = JSON.parse(recentStickers);
            }
        } catch (error) {
            console.error('Error loading saved stickers:', error);
        }
    }

    /**
     * Save stickers to localStorage
     */
    saveStickers() {
        try {
            // Save custom stickers
            const customPack = this.stickerPacks.find(pack => pack.id === 'custom');
            if (customPack) {
                localStorage.setItem(`${this.storageKeyPrefix}custom`, JSON.stringify(customPack.stickers));
            }
            
            // Save recent stickers
            localStorage.setItem(`${this.storageKeyPrefix}recent`, JSON.stringify(this.recentStickers));
        } catch (error) {
            console.error('Error saving stickers:', error);
        }
    }

    /**
     * Add sticker buttons to all matching chat inputs
     */
    addStickerButtonsToChatInputs() {
        // Find all chat inputs
        const chatInputs = document.querySelectorAll(this.chatInputSelector);
        
        chatInputs.forEach(input => {
            // Skip if already has sticker button
            if (input.parentElement.querySelector('.sticker-button')) {
                return;
            }
            
            // Create sticker button
            const stickerButton = document.createElement('button');
            stickerButton.className = 'sticker-button';
            stickerButton.innerHTML = '<i class="ri-emotion-laugh-line"></i>';
            stickerButton.title = 'Send a sticker';
            
            // Determine where to add the button based on input type
            if (input.tagName === 'TEXTAREA') {
                // For textarea, add after the input in its parent
                input.parentElement.insertBefore(stickerButton, input.nextSibling);
            } else if (input.getAttribute('contenteditable') === 'true') {
                // For contenteditable, add inside the input container
                input.parentElement.appendChild(stickerButton);
            } else {
                // Default: add after the input
                input.after(stickerButton);
            }
            
            // Add click event listener
            stickerButton.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();
                this.toggleStickerPicker(input, stickerButton);
            });
        });
        
        // Set up a MutationObserver to detect new chat inputs
        this.observeChatInputs();
    }

    /**
     * Observe DOM changes to detect new chat inputs
     */
    observeChatInputs() {
        // Create observer
        const observer = new MutationObserver(mutations => {
            let needsCheck = false;
            
            mutations.forEach(mutation => {
                // Check for added nodes
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    needsCheck = true;
                }
            });
            
            // Check for new chat inputs if needed
            if (needsCheck) {
                this.addStickerButtonsToChatInputs();
            }
        });
        
        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Toggle sticker picker display
     * @param {HTMLElement} inputElement - Chat input element
     * @param {HTMLElement} buttonElement - Sticker button element
     */
    toggleStickerPicker(inputElement, buttonElement) {
        // If picker already exists, remove it
        if (this.stickerPickerElement) {
            this.closeStickerPicker();
            return;
        }
        
        // Create sticker picker
        this.stickerPickerElement = document.createElement('div');
        this.stickerPickerElement.className = 'sticker-picker';
        
        // Get button position for placement
        const buttonRect = buttonElement.getBoundingClientRect();
        const inputRect = inputElement.getBoundingClientRect();
        
        // Calculate position (above the button)
        const top = buttonRect.top - 350; // Height of picker plus some margin
        const left = buttonRect.left + (buttonRect.width / 2) - 160; // Center the picker horizontally
        
        this.stickerPickerElement.style.top = `${top < 10 ? inputRect.bottom + 5 : top}px`;
        this.stickerPickerElement.style.left = `${Math.max(10, left)}px`;
        
        // Add content to picker
        this.populateStickerPicker(inputElement);
        
        // Add to document
        document.body.appendChild(this.stickerPickerElement);
        
        // Add document click listener to close picker
        setTimeout(() => {
            document.addEventListener('click', this.boundDocumentClickHandler);
        }, 100);
    }

    /**
     * Close the sticker picker
     */
    closeStickerPicker() {
        if (this.stickerPickerElement) {
            document.body.removeChild(this.stickerPickerElement);
            this.stickerPickerElement = null;
            document.removeEventListener('click', this.boundDocumentClickHandler);
        }
    }

    /**
     * Handle document click to close picker when clicking outside
     * @param {MouseEvent} event - Click event
     */
    handleDocumentClick(event) {
        // Check if click is outside the picker
        if (
            this.stickerPickerElement && 
            !this.stickerPickerElement.contains(event.target) && 
            !event.target.classList.contains('sticker-button')
        ) {
            this.closeStickerPicker();
        }
    }

    /**
     * Populate sticker picker with tabs and stickers
     * @param {HTMLElement} inputElement - Chat input element
     */
    populateStickerPicker(inputElement) {
        // Create header with tabs
        const header = document.createElement('div');
        header.className = 'sticker-picker-header';
        this.stickerPickerElement.appendChild(header);
        
        // Add title
        const title = document.createElement('div');
        title.className = 'sticker-picker-title';
        title.textContent = 'Stickers';
        header.appendChild(title);
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.className = 'sticker-picker-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => this.closeStickerPicker());
        header.appendChild(closeButton);
        
        // Create tabs
        const tabs = document.createElement('div');
        tabs.className = 'sticker-picker-tabs';
        this.stickerPickerElement.appendChild(tabs);
        
        // Add Recent tab
        const recentTab = document.createElement('button');
        recentTab.className = 'sticker-tab active';
        recentTab.dataset.packId = 'recent';
        recentTab.innerHTML = '<i class="ri-time-line"></i>';
        recentTab.title = 'Recent Stickers';
        tabs.appendChild(recentTab);
        
        // Add tabs for each sticker pack
        this.stickerPacks.forEach(pack => {
            const tab = document.createElement('button');
            tab.className = 'sticker-tab';
            tab.dataset.packId = pack.id;
            tab.innerHTML = this.getPackIcon(pack.id);
            tab.title = pack.name;
            tabs.appendChild(tab);
        });
        
        // Add Upload tab
        const uploadTab = document.createElement('button');
        uploadTab.className = 'sticker-tab';
        uploadTab.dataset.packId = 'upload';
        uploadTab.innerHTML = '<i class="ri-upload-2-line"></i>';
        uploadTab.title = 'Upload Sticker';
        tabs.appendChild(uploadTab);
        
        // Create content container
        const content = document.createElement('div');
        content.className = 'sticker-picker-content';
        this.stickerPickerElement.appendChild(content);
        
        // Load Recent stickers initially
        this.loadStickerPack('recent', content, inputElement);
        
        // Add tab click handlers
        tabs.querySelectorAll('.sticker-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                tabs.querySelectorAll('.sticker-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Load stickers for selected pack
                this.loadStickerPack(tab.dataset.packId, content, inputElement);
            });
        });
    }

    /**
     * Get icon for a sticker pack
     * @param {string} packId - Sticker pack ID
     * @returns {string} HTML for the icon
     */
    getPackIcon(packId) {
        switch (packId) {
            case 'emoji':
                return '<i class="ri-emotion-line"></i>';
            case 'animals':
                return '<i class="ri-bear-smile-line"></i>';
            case 'reactions':
                return '<i class="ri-chat-smile-3-line"></i>';
            case 'tech':
                return '<i class="ri-code-line"></i>';
            case 'custom':
                return '<i class="ri-user-smile-line"></i>';
            default:
                return '<i class="ri-emotion-line"></i>';
        }
    }

    /**
     * Load stickers from a pack into the content area
     * @param {string} packId - Sticker pack ID
     * @param {HTMLElement} contentElement - Content container element
     * @param {HTMLElement} inputElement - Chat input element
     */
    loadStickerPack(packId, contentElement, inputElement) {
        // Clear content
        contentElement.innerHTML = '';
        
        if (packId === 'upload') {
            // Show upload interface
            this.showUploadInterface(contentElement);
            return;
        }
        
        // Get stickers to display
        let stickers = [];
        
        if (packId === 'recent') {
            // Get recent stickers
            stickers = this.recentStickers;
        } else {
            // Get stickers from pack
            const pack = this.stickerPacks.find(p => p.id === packId);
            if (pack) {
                stickers = pack.stickers;
            }
        }
        
        // Create sticker grid
        const grid = document.createElement('div');
        grid.className = 'sticker-grid';
        contentElement.appendChild(grid);
        
        // Add pack title
        if (packId !== 'recent') {
            const pack = this.stickerPacks.find(p => p.id === packId);
            if (pack) {
                const packTitle = document.createElement('div');
                packTitle.className = 'sticker-pack-title';
                packTitle.textContent = pack.name;
                contentElement.insertBefore(packTitle, grid);
                
                if (pack.description) {
                    const packDescription = document.createElement('div');
                    packDescription.className = 'sticker-pack-description';
                    packDescription.textContent = pack.description;
                    contentElement.insertBefore(packDescription, grid);
                }
            }
        } else {
            const recentTitle = document.createElement('div');
            recentTitle.className = 'sticker-pack-title';
            recentTitle.textContent = 'Recently Used';
            contentElement.insertBefore(recentTitle, grid);
        }
        
        // Show empty state if no stickers
        if (stickers.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'sticker-empty-state';
            
            if (packId === 'recent') {
                emptyState.textContent = 'No recently used stickers';
            } else if (packId === 'custom') {
                emptyState.textContent = 'No custom stickers added yet';
            } else {
                emptyState.textContent = 'No stickers available';
            }
            
            contentElement.appendChild(emptyState);
            return;
        }
        
        // Add stickers to grid
        stickers.forEach(sticker => {
            const stickerElement = document.createElement('div');
            stickerElement.className = 'sticker-item';
            stickerElement.title = sticker.name;
            
            const stickerImage = document.createElement('img');
            stickerImage.src = sticker.url;
            stickerImage.alt = sticker.name;
            stickerImage.loading = 'lazy';
            stickerElement.appendChild(stickerImage);
            
            // Add click handler to send sticker
            stickerElement.addEventListener('click', () => {
                this.sendSticker(sticker, inputElement);
                this.closeStickerPicker();
            });
            
            grid.appendChild(stickerElement);
        });
        
        // Add delete buttons for custom stickers
        if (packId === 'custom') {
            grid.querySelectorAll('.sticker-item').forEach((element, index) => {
                const deleteButton = document.createElement('button');
                deleteButton.className = 'sticker-delete-btn';
                deleteButton.innerHTML = '&times;';
                deleteButton.title = 'Delete sticker';
                
                deleteButton.addEventListener('click', event => {
                    event.stopPropagation(); // Prevent sending the sticker
                    
                    const customPack = this.stickerPacks.find(p => p.id === 'custom');
                    if (customPack && index < customPack.stickers.length) {
                        // Remove from custom stickers
                        customPack.stickers.splice(index, 1);
                        
                        // Remove from recent stickers if present
                        const sticker = customPack.stickers[index];
                        if (sticker) {
                            this.recentStickers = this.recentStickers.filter(s => s.id !== sticker.id);
                        }
                        
                        // Save changes
                        this.saveStickers();
                        
                        // Reload pack
                        this.loadStickerPack('custom', contentElement, inputElement);
                    }
                });
                
                element.appendChild(deleteButton);
            });
        }
    }

    /**
     * Show sticker upload interface
     * @param {HTMLElement} contentElement - Content container element
     */
    showUploadInterface(contentElement) {
        // Create upload form
        const uploadForm = document.createElement('div');
        uploadForm.className = 'sticker-upload-form';
        contentElement.appendChild(uploadForm);
        
        // Title
        const title = document.createElement('div');
        title.className = 'sticker-upload-title';
        title.textContent = 'Upload Custom Sticker';
        uploadForm.appendChild(title);
        
        // Instructions
        const instructions = document.createElement('div');
        instructions.className = 'sticker-upload-instructions';
        instructions.textContent = 'Upload a PNG or GIF image (max 1MB)';
        uploadForm.appendChild(instructions);
        
        // File input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/png,image/gif';
        fileInput.className = 'sticker-file-input';
        uploadForm.appendChild(fileInput);
        
        // Name input
        const nameContainer = document.createElement('div');
        nameContainer.className = 'sticker-name-container';
        uploadForm.appendChild(nameContainer);
        
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Sticker Name:';
        nameContainer.appendChild(nameLabel);
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'sticker-name-input';
        nameInput.placeholder = 'Enter a name for your sticker';
        nameInput.maxLength = 20;
        nameContainer.appendChild(nameInput);
        
        // Upload button
        const uploadButton = document.createElement('button');
        uploadButton.className = 'sticker-upload-button';
        uploadButton.textContent = 'Upload Sticker';
        uploadButton.disabled = true;
        uploadForm.appendChild(uploadButton);
        
        // Enable/disable upload button based on inputs
        const updateButtonState = () => {
            uploadButton.disabled = !fileInput.files.length || !nameInput.value.trim();
        };
        
        fileInput.addEventListener('change', updateButtonState);
        nameInput.addEventListener('input', updateButtonState);
        
        // Handle upload
        uploadButton.addEventListener('click', async () => {
            if (!fileInput.files.length || !nameInput.value.trim()) {
                return;
            }
            
            const file = fileInput.files[0];
            
            // Check file size (max 1MB)
            if (file.size > 1024 * 1024) {
                alert('Sticker file size must be less than 1MB');
                return;
            }
            
            // Check file type
            if (!file.type.match(/image\/(png|gif)/)) {
                alert('Sticker must be a PNG or GIF image');
                return;
            }
            
            try {
                uploadButton.disabled = true;
                uploadButton.textContent = 'Uploading...';
                
                // Read file as data URL
                const dataUrl = await this.readFileAsDataURL(file);
                
                // Create sticker object
                const sticker = {
                    id: `custom-${Date.now()}`,
                    name: nameInput.value.trim(),
                    url: dataUrl
                };
                
                // Add to custom stickers pack
                const customPack = this.stickerPacks.find(p => p.id === 'custom');
                if (customPack) {
                    customPack.stickers.push(sticker);
                    
                    // Save stickers
                    this.saveStickers();
                    
                    // Show success message
                    alert('Sticker uploaded successfully!');
                    
                    // Reset form
                    fileInput.value = '';
                    nameInput.value = '';
                    uploadButton.textContent = 'Upload Sticker';
                    uploadButton.disabled = true;
                }
            } catch (error) {
                console.error('Error uploading sticker:', error);
                alert('Failed to upload sticker: ' + error.message);
                uploadButton.textContent = 'Upload Sticker';
                uploadButton.disabled = false;
            }
        });
    }

    /**
     * Send a sticker to the chat
     * @param {Object} sticker - Sticker object
     * @param {HTMLElement} inputElement - Chat input element
     */
    sendSticker(sticker, inputElement) {
        // Add to recent stickers
        this.addToRecentStickers(sticker);
        
        // Get chat container
        const chatContainer = this.getChatContainer();
        if (!chatContainer) {
            console.warn('Chat container not found');
            return;
        }
        
        // Create sticker message element
        const stickerMessage = document.createElement('div');
        stickerMessage.className = 'message user-message sticker-message';
        
        const stickerImage = document.createElement('img');
        stickerImage.src = sticker.url;
        stickerImage.alt = sticker.name;
        stickerImage.className = 'sticker-image';
        stickerMessage.appendChild(stickerImage);
        
        // Find messages container and append sticker
        const messagesContainer = chatContainer.querySelector('.messages, .message-list, .chat-messages');
        if (messagesContainer) {
            messagesContainer.appendChild(stickerMessage);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
            // If no messages container found, append to chat container
            chatContainer.appendChild(stickerMessage);
        }
        
        // Trigger sticker sent event
        this.triggerStickerSentEvent(sticker, inputElement);
    }

    /**
     * Get the chat container element
     * @returns {HTMLElement|null} Chat container element or null if not found
     */
    getChatContainer() {
        return document.querySelector(this.chatContainerSelector);
    }

    /**
     * Add a sticker to recent stickers
     * @param {Object} sticker - Sticker object
     */
    addToRecentStickers(sticker) {
        // Remove if already in recent stickers
        this.recentStickers = this.recentStickers.filter(s => s.id !== sticker.id);
        
        // Add to beginning of array
        this.recentStickers.unshift(sticker);
        
        // Limit to max recent stickers
        if (this.recentStickers.length > this.maxRecentStickers) {
            this.recentStickers = this.recentStickers.slice(0, this.maxRecentStickers);
        }
        
        // Save recent stickers
        this.saveStickers();
    }

    /**
     * Trigger a custom event when a sticker is sent
     * @param {Object} sticker - Sticker object
     * @param {HTMLElement} inputElement - Chat input element
     */
    triggerStickerSentEvent(sticker, inputElement) {
        // Create and dispatch event
        const event = new CustomEvent('stickerSent', {
            detail: {
                sticker,
                inputElement
            },
            bubbles: true
        });
        
        inputElement.dispatchEvent(event);
    }

    /**
     * Read a file as data URL
     * @param {File} file - File to read
     * @returns {Promise<string>} Data URL
     */
    readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = event => {
                resolve(event.target.result);
            };
            
            reader.onerror = error => {
                reject(error);
            };
            
            reader.readAsDataURL(file);
        });
    }

    /**
     * Add CSS styles
     */
    addStyles() {
        const styleId = 'sticker-sender-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            /* Sticker button */
            .sticker-button {
                position: absolute;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                margin-left: 10px;
                bottom: 10px;
                right: 10px;
                z-index: 10;
                transition: background-color 0.2s, transform 0.2s;
            }
            
            .sticker-button:hover {
                background-color: var(--accent-hover, #6d28d9);
                transform: scale(1.05);
            }
            
            /* Sticker picker */
            .sticker-picker {
                position: fixed;
                width: 320px;
                height: 350px;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius, 0.5rem);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .sticker-picker-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 12px;
                border-bottom: 1px solid var(--border-color, #30363d);
            }
            
            .sticker-picker-title {
                font-weight: 600;
                font-size: 14px;
                color: var(--text-primary, #f0f6fc);
            }
            
            .sticker-picker-close {
                background: none;
                border: none;
                color: var(--text-secondary, #8b949e);
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .sticker-picker-close:hover {
                color: var(--text-primary, #f0f6fc);
            }
            
            .sticker-picker-tabs {
                display: flex;
                border-bottom: 1px solid var(--border-color, #30363d);
                overflow-x: auto;
                scrollbar-width: thin;
            }
            
            .sticker-picker-tabs::-webkit-scrollbar {
                height: 4px;
            }
            
            .sticker-picker-tabs::-webkit-scrollbar-thumb {
                background-color: var(--border-color, #30363d);
                border-radius: 4px;
            }
            
            .sticker-tab {
                padding: 8px 12px;
                background: none;
                border: none;
                color: var(--text-secondary, #8b949e);
                font-size: 16px;
                cursor: pointer;
                flex-shrink: 0;
                position: relative;
            }
            
            .sticker-tab.active {
                color: var(--accent-primary, #7c3aed);
            }
            
            .sticker-tab.active::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 2px;
                background-color: var(--accent-primary, #7c3aed);
            }
            
            .sticker-picker-content {
                flex: 1;
                overflow-y: auto;
                padding: 12px;
            }
            
            .sticker-pack-title {
                font-size: 13px;
                font-weight: 600;
                margin-bottom: 4px;
                color: var(--text-primary, #f0f6fc);
            }
            
            .sticker-pack-description {
                font-size: 12px;
                color: var(--text-secondary, #8b949e);
                margin-bottom: 10px;
            }
            
            .sticker-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                padding-bottom: 10px;
            }
            
            .sticker-item {
                width: 64px;
                height: 64px;
                border-radius: var(--radius-sm, 0.375rem);
                background-color: var(--bg-secondary, #161b22);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                overflow: hidden;
                position: relative;
                transition: transform 0.2s;
            }
            
            .sticker-item:hover {
                transform: scale(1.05);
            }
            
            .sticker-item img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            
            .sticker-delete-btn {
                position: absolute;
                top: 2px;
                right: 2px;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background-color: rgba(239, 68, 68, 0.8);
                color: white;
                border: none;
                font-size: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s;
            }
            
            .sticker-item:hover .sticker-delete-btn {
                opacity: 1;
            }
            
            .sticker-empty-state {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 150px;
                color: var(--text-secondary, #8b949e);
                font-size: 13px;
                text-align: center;
                font-style: italic;
            }
            
            .sticker-upload-form {
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 10px 0;
            }
            
            .sticker-upload-title {
                font-size: 14px;
                font-weight: 600;
                color: var(--text-primary, #f0f6fc);
            }
            
            .sticker-upload-instructions {
                font-size: 12px;
                color: var(--text-secondary, #8b949e);
                margin-bottom: 5px;
            }
            
            .sticker-file-input {
                padding: 8px;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                background-color: var(--bg-secondary, #161b22);
                color: var(--text-primary, #f0f6fc);
                font-size: 12px;
            }
            
            .sticker-name-container {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            
            .sticker-name-container label {
                font-size: 12px;
                color: var(--text-secondary, #8b949e);
            }
            
            .sticker-name-input {
                padding: 8px;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                background-color: var(--bg-secondary, #161b22);
                color: var(--text-primary, #f0f6fc);
                font-size: 12px;
            }
            
            .sticker-upload-button {
                padding: 8px;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
                margin-top: 5px;
            }
            
            .sticker-upload-button:hover:not(:disabled) {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .sticker-upload-button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            
            /* Sticker message in chat */
            .sticker-message {
                display: inline-block;
                max-width: 150px;
                margin: 10px;
                background: none !important;
                border: none !important;
                box-shadow: none !important;
            }
            
            .sticker-image {
                width: 100%;
                max-width: 120px;
                max-height: 120px;
                object-fit: contain;
            }
            
            @media (max-width: 480px) {
                .sticker-picker {
                    width: 280px;
                    height: 320px;
                    bottom: 70px;
                    right: 10px;
                    left: auto !important;
                    top: auto !important;
                }
                
                .sticker-grid {
                    grid-template-columns: repeat(3, 1fr);
                }
                
                .sticker-item {
                    width: 56px;
                    height: 56px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StickerSender };
} else {
    // Add to global scope for browser usage
    window.StickerSender = StickerSender;
}
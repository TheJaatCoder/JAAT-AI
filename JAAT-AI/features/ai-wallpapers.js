/**
 * JAAT-AI Wallpapers Feature
 * Generate and apply AI-created background wallpapers for the chat interface
 */

class AIWallpapers {
    constructor() {
        this.wallpapers = [
            { id: 'default', name: 'Default', url: null, type: 'solid', color: '#121212' },
            { id: 'gradient-blue', name: 'Blue Gradient', url: null, type: 'gradient', colors: ['#1a237e', '#4fc3f7'] },
            { id: 'gradient-purple', name: 'Purple Dream', url: null, type: 'gradient', colors: ['#4a148c', '#7c4dff'] },
            { id: 'gradient-sunset', name: 'Sunset', url: null, type: 'gradient', colors: ['#bf360c', '#ffb300'] },
            { id: 'gradient-mint', name: 'Fresh Mint', url: null, type: 'gradient', colors: ['#1b5e20', '#00bfa5'] },
            { id: 'pattern-dots', name: 'Dots', url: 'assets/wallpapers/pattern-dots.png', type: 'pattern' },
            { id: 'pattern-grid', name: 'Grid', url: 'assets/wallpapers/pattern-grid.png', type: 'pattern' },
            { id: 'pattern-waves', name: 'Waves', url: 'assets/wallpapers/pattern-waves.png', type: 'pattern' },
            { id: 'ai-abstract-1', name: 'Abstract Flow', url: 'assets/wallpapers/ai-abstract-1.jpg', type: 'ai' },
            { id: 'ai-abstract-2', name: 'Neon Dreams', url: 'assets/wallpapers/ai-abstract-2.jpg', type: 'ai' },
            { id: 'ai-landscape-1', name: 'Misty Mountains', url: 'assets/wallpapers/ai-landscape-1.jpg', type: 'ai' },
            { id: 'ai-landscape-2', name: 'Ocean Sunset', url: 'assets/wallpapers/ai-landscape-2.jpg', type: 'ai' },
            { id: 'ai-space-1', name: 'Cosmic Voyage', url: 'assets/wallpapers/ai-space-1.jpg', type: 'ai' },
            { id: 'ai-space-2', name: 'Nebula', url: 'assets/wallpapers/ai-space-2.jpg', type: 'ai' }
        ];
        
        // Categories for UI organization
        this.categories = [
            { id: 'solid', name: 'Solid Colors' },
            { id: 'gradient', name: 'Gradients' },
            { id: 'pattern', name: 'Patterns' },
            { id: 'ai', name: 'AI Generated' },
            { id: 'custom', name: 'My Wallpapers' }
        ];
        
        // Current wallpaper
        this.currentWallpaper = 'default';
        
        // Custom user-generated wallpapers
        this.customWallpapers = [];
        
        // Wallpaper display options
        this.options = {
            opacity: 1.0,
            blur: 0,
            brightness: 1.0,
            overlay: false,
            overlayColor: 'rgba(0, 0, 0, 0.3)',
            animateWallpaper: false
        };
        
        // Wallpaper target element selector
        this.targetSelector = '.chat-container, .app-container, body';
        
        // Storage keys
        this.storageKeyPrefix = 'jaat-wallpaper-';
        
        // AI generation settings
        this.generationSettings = {
            model: 'dall-e-3',
            size: '1024x1024',
            style: 'vivid', // or 'natural'
            quality: 'standard', // or 'hd'
            apiKey: null
        };
        
        // API endpoint for generating images (if available)
        this.apiEndpoint = '/api/generate-image';
    }

    /**
     * Initialize wallpapers feature
     * @param {Object} options - Configuration options
     * @returns {AIWallpapers} This instance
     */
    init(options = {}) {
        // Apply custom options
        if (options.defaultWallpaper && this.getWallpaperById(options.defaultWallpaper)) {
            this.currentWallpaper = options.defaultWallpaper;
        }
        
        if (options.targetSelector) {
            this.targetSelector = options.targetSelector;
        }
        
        if (options.displayOptions) {
            this.options = { ...this.options, ...options.displayOptions };
        }
        
        if (options.apiEndpoint) {
            this.apiEndpoint = options.apiEndpoint;
        }
        
        if (options.apiKey) {
            this.generationSettings.apiKey = options.apiKey;
        }
        
        // Load saved preferences
        this.loadPreferences();
        
        // Apply current wallpaper
        this.applyWallpaper();
        
        console.log('AI Wallpapers initialized with wallpaper:', this.currentWallpaper);
        return this;
    }

    /**
     * Load saved preferences from localStorage
     */
    loadPreferences() {
        try {
            // Load selected wallpaper
            const savedWallpaper = localStorage.getItem(`${this.storageKeyPrefix}current`);
            if (savedWallpaper) {
                this.currentWallpaper = savedWallpaper;
            }
            
            // Load display options
            const savedOptions = localStorage.getItem(`${this.storageKeyPrefix}options`);
            if (savedOptions) {
                this.options = { ...this.options, ...JSON.parse(savedOptions) };
            }
            
            // Load custom wallpapers
            const savedCustomWallpapers = localStorage.getItem(`${this.storageKeyPrefix}custom`);
            if (savedCustomWallpapers) {
                this.customWallpapers = JSON.parse(savedCustomWallpapers);
                
                // Add custom wallpapers to main list
                this.customWallpapers.forEach(wallpaper => {
                    if (!this.wallpapers.some(w => w.id === wallpaper.id)) {
                        this.wallpapers.push({
                            ...wallpaper,
                            type: 'custom'
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Error loading wallpaper preferences:', error);
        }
    }

    /**
     * Save preferences to localStorage
     */
    savePreferences() {
        try {
            localStorage.setItem(`${this.storageKeyPrefix}current`, this.currentWallpaper);
            localStorage.setItem(`${this.storageKeyPrefix}options`, JSON.stringify(this.options));
            localStorage.setItem(`${this.storageKeyPrefix}custom`, JSON.stringify(this.customWallpapers));
        } catch (error) {
            console.error('Error saving wallpaper preferences:', error);
        }
    }

    /**
     * Get a wallpaper by ID
     * @param {string} id - Wallpaper ID
     * @returns {Object|null} Wallpaper object or null if not found
     */
    getWallpaperById(id) {
        return this.wallpapers.find(wallpaper => wallpaper.id === id) || null;
    }

    /**
     * Apply the current wallpaper to the target element
     */
    applyWallpaper() {
        // Get target elements
        const targets = document.querySelectorAll(this.targetSelector);
        if (targets.length === 0) {
            console.warn('No target elements found for wallpaper');
            return;
        }
        
        // Get current wallpaper
        const wallpaper = this.getWallpaperById(this.currentWallpaper);
        if (!wallpaper) {
            console.warn(`Wallpaper not found: ${this.currentWallpaper}`);
            return;
        }
        
        // Create or update wallpaper style
        let styleEl = document.getElementById('jaat-wallpaper-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'jaat-wallpaper-style';
            document.head.appendChild(styleEl);
        }
        
        // Generate CSS based on wallpaper type
        const { css, inlineStyle } = this.generateWallpaperCSS(wallpaper);
        
        // Apply styles
        styleEl.textContent = css;
        
        // Apply inline styles if needed
        targets.forEach(target => {
            // Add class to target
            target.classList.add('jaat-wallpaper-target');
            
            // Apply inline styles if any
            if (inlineStyle) {
                Object.keys(inlineStyle).forEach(key => {
                    target.style[key] = inlineStyle[key];
                });
            }
        });
    }

    /**
     * Generate CSS for wallpaper
     * @param {Object} wallpaper - Wallpaper object
     * @returns {Object} CSS and inline styles
     */
    generateWallpaperCSS(wallpaper) {
        let css = '';
        let inlineStyle = null;
        
        // Basic wallpaper class
        css += `
            .jaat-wallpaper-target {
                position: relative;
                transition: background 0.3s ease, background-image 0.3s ease;
                filter: brightness(${this.options.brightness});
            }
            
            /* Clear previous backgrounds first */
            .jaat-wallpaper-target::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
                opacity: ${this.options.opacity};
                pointer-events: none;
                filter: blur(${this.options.blur}px);
                transition: opacity 0.3s ease, filter 0.3s ease;
            }
        `;
        
        // Generate specific CSS based on wallpaper type
        switch (wallpaper.type) {
            case 'solid':
                css += `
                    .jaat-wallpaper-target {
                        background-color: ${wallpaper.color};
                    }
                `;
                break;
                
            case 'gradient':
                const { colors } = wallpaper;
                css += `
                    .jaat-wallpaper-target {
                        background: linear-gradient(135deg, ${colors[0]}, ${colors[1]});
                    }
                `;
                
                // Add animation if enabled
                if (this.options.animateWallpaper) {
                    css += `
                        .jaat-wallpaper-target {
                            background-size: 400% 400%;
                            animation: gradient-animation 15s ease infinite;
                        }
                        
                        @keyframes gradient-animation {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                    `;
                }
                break;
                
            case 'pattern':
            case 'ai':
            case 'custom':
                // For images and patterns
                if (wallpaper.url) {
                    css += `
                        .jaat-wallpaper-target::before {
                            background-image: url('${wallpaper.url}');
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                        }
                    `;
                    
                    // For patterns, use repeat instead of cover
                    if (wallpaper.type === 'pattern') {
                        css += `
                            .jaat-wallpaper-target::before {
                                background-size: auto;
                                background-repeat: repeat;
                            }
                        `;
                    }
                }
                break;
        }
        
        // Add overlay if enabled
        if (this.options.overlay) {
            css += `
                .jaat-wallpaper-target::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: ${this.options.overlayColor};
                    z-index: -1;
                    pointer-events: none;
                }
            `;
        }
        
        return { css, inlineStyle };
    }

    /**
     * Change the current wallpaper
     * @param {string} wallpaperId - Wallpaper ID
     * @returns {boolean} Whether the wallpaper was changed successfully
     */
    changeWallpaper(wallpaperId) {
        // Check if wallpaper exists
        const wallpaper = this.getWallpaperById(wallpaperId);
        if (!wallpaper) {
            console.warn(`Wallpaper not found: ${wallpaperId}`);
            return false;
        }
        
        // Update current wallpaper
        this.currentWallpaper = wallpaperId;
        
        // Apply wallpaper
        this.applyWallpaper();
        
        // Save preferences
        this.savePreferences();
        
        return true;
    }

    /**
     * Update wallpaper display options
     * @param {Object} options - New display options
     * @returns {boolean} Whether the options were updated successfully
     */
    updateOptions(options) {
        if (!options || typeof options !== 'object') {
            return false;
        }
        
        // Update options
        this.options = { ...this.options, ...options };
        
        // Apply wallpaper with new options
        this.applyWallpaper();
        
        // Save preferences
        this.savePreferences();
        
        return true;
    }

    /**
     * Upload a custom wallpaper
     * @param {File} file - Image file
     * @returns {Promise<string>} Wallpaper ID
     */
    async uploadWallpaper(file) {
        return new Promise((resolve, reject) => {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                reject(new Error('File must be an image'));
                return;
            }
            
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                reject(new Error('Image size must be less than 5MB'));
                return;
            }
            
            // Read file as data URL
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const dataUrl = e.target.result;
                    
                    // Create unique ID for custom wallpaper
                    const id = `custom-${Date.now()}`;
                    
                    // Create wallpaper object
                    const wallpaper = {
                        id,
                        name: file.name.split('.')[0] || 'Custom Wallpaper',
                        url: dataUrl,
                        type: 'custom'
                    };
                    
                    // Add to custom wallpapers
                    this.customWallpapers.push(wallpaper);
                    
                    // Add to main wallpapers list
                    this.wallpapers.push(wallpaper);
                    
                    // Save preferences
                    this.savePreferences();
                    
                    // Resolve with wallpaper ID
                    resolve(id);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsDataURL(file);
        });
    }

    /**
     * Delete a custom wallpaper
     * @param {string} wallpaperId - Wallpaper ID
     * @returns {boolean} Whether the wallpaper was deleted successfully
     */
    deleteWallpaper(wallpaperId) {
        // Check if wallpaper exists and is custom
        const wallpaper = this.getWallpaperById(wallpaperId);
        if (!wallpaper || wallpaper.type !== 'custom') {
            console.warn(`Cannot delete wallpaper ${wallpaperId}: not found or not custom`);
            return false;
        }
        
        // Remove from custom wallpapers
        this.customWallpapers = this.customWallpapers.filter(w => w.id !== wallpaperId);
        
        // Remove from main wallpapers list
        this.wallpapers = this.wallpapers.filter(w => w.id !== wallpaperId);
        
        // If current wallpaper was deleted, switch to default
        if (this.currentWallpaper === wallpaperId) {
            this.changeWallpaper('default');
        }
        
        // Save preferences
        this.savePreferences();
        
        return true;
    }

    /**
     * Generate a new AI wallpaper with the given prompt
     * @param {string} prompt - Text prompt for AI image generation
     * @returns {Promise<string>} ID of the generated wallpaper
     */
    async generateAIWallpaper(prompt) {
        try {
            // Check if API key is available
            if (!this.generationSettings.apiKey && !this.apiEndpoint) {
                throw new Error('No API key or endpoint configured for AI image generation');
            }
            
            let imageUrl;
            
            // If using API endpoint
            if (this.apiEndpoint) {
                const response = await fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt,
                        ...this.generationSettings
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`API error: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                imageUrl = data.url || data.image;
                
                if (!imageUrl) {
                    throw new Error('No image URL returned from API');
                }
            } else {
                // For demonstration purposes
                throw new Error('Direct API access is not implemented in this example');
            }
            
            // Create unique ID for AI wallpaper
            const id = `ai-gen-${Date.now()}`;
            
            // Create wallpaper object
            const wallpaper = {
                id,
                name: prompt.substring(0, 30) + (prompt.length > 30 ? '...' : ''),
                url: imageUrl,
                type: 'custom',
                aiGenerated: true,
                prompt
            };
            
            // Add to custom wallpapers
            this.customWallpapers.push(wallpaper);
            
            // Add to main wallpapers list
            this.wallpapers.push(wallpaper);
            
            // Save preferences
            this.savePreferences();
            
            return id;
        } catch (error) {
            console.error('Error generating AI wallpaper:', error);
            throw error;
        }
    }

    /**
     * Create AI wallpapers UI
     * @param {HTMLElement|string} container - Container element or selector
     * @returns {HTMLElement} Created UI container
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
        uiContainer.className = 'ai-wallpapers-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'ai-wallpapers-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'ai-wallpapers-title';
        title.textContent = 'Background Wallpapers';
        header.appendChild(title);
        
        // Create categories tabs
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'ai-wallpapers-tabs';
        uiContainer.appendChild(tabsContainer);
        
        // Add All category first
        const allTab = document.createElement('button');
        allTab.className = 'wallpaper-tab active';
        allTab.dataset.category = 'all';
        allTab.textContent = 'All Wallpapers';
        tabsContainer.appendChild(allTab);
        
        // Add category tabs
        this.categories.forEach(category => {
            // Skip if no wallpapers in this category
            if (!this.wallpapers.some(w => w.type === category.id)) {
                return;
            }
            
            const tab = document.createElement('button');
            tab.className = 'wallpaper-tab';
            tab.dataset.category = category.id;
            tab.textContent = category.name;
            tabsContainer.appendChild(tab);
        });
        
        // Create wallpapers grid
        const wallpapersContainer = document.createElement('div');
        wallpapersContainer.className = 'wallpapers-container';
        uiContainer.appendChild(wallpapersContainer);
        
        const wallpapersGrid = document.createElement('div');
        wallpapersGrid.className = 'wallpapers-grid';
        wallpapersContainer.appendChild(wallpapersGrid);
        
        // Populate grid with wallpapers
        this.wallpapers.forEach(wallpaper => {
            const wallpaperItem = document.createElement('div');
            wallpaperItem.className = 'wallpaper-item';
            wallpaperItem.dataset.id = wallpaper.id;
            wallpaperItem.dataset.type = wallpaper.type;
            
            if (wallpaper.id === this.currentWallpaper) {
                wallpaperItem.classList.add('active');
            }
            
            // Wallpaper preview
            const preview = document.createElement('div');
            preview.className = 'wallpaper-preview';
            
            // Create preview based on wallpaper type
            switch (wallpaper.type) {
                case 'solid':
                    preview.style.backgroundColor = wallpaper.color;
                    break;
                    
                case 'gradient':
                    preview.style.background = `linear-gradient(135deg, ${wallpaper.colors[0]}, ${wallpaper.colors[1]})`;
                    break;
                    
                case 'pattern':
                case 'ai':
                case 'custom':
                    if (wallpaper.url) {
                        preview.style.backgroundImage = `url('${wallpaper.url}')`;
                        preview.style.backgroundSize = wallpaper.type === 'pattern' ? 'auto' : 'cover';
                        preview.style.backgroundRepeat = wallpaper.type === 'pattern' ? 'repeat' : 'no-repeat';
                    }
                    break;
            }
            
            wallpaperItem.appendChild(preview);
            
            // Wallpaper name
            const name = document.createElement('div');
            name.className = 'wallpaper-name';
            name.textContent = wallpaper.name;
            wallpaperItem.appendChild(name);
            
            // Add delete button for custom wallpapers
            if (wallpaper.type === 'custom') {
                const deleteButton = document.createElement('button');
                deleteButton.className = 'wallpaper-delete-btn';
                deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i>';
                deleteButton.title = 'Delete wallpaper';
                
                // Delete button click handler
                deleteButton.addEventListener('click', event => {
                    event.stopPropagation(); // Prevent selection of wallpaper
                    
                    if (confirm(`Are you sure you want to delete the wallpaper "${wallpaper.name}"?`)) {
                        this.deleteWallpaper(wallpaper.id);
                        wallpaperItem.remove();
                    }
                });
                
                wallpaperItem.appendChild(deleteButton);
            }
            
            // Wallpaper click handler
            wallpaperItem.addEventListener('click', () => {
                // Remove active class from all items
                wallpapersGrid.querySelectorAll('.wallpaper-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked item
                wallpaperItem.classList.add('active');
                
                // Change wallpaper
                this.changeWallpaper(wallpaper.id);
            });
            
            wallpapersGrid.appendChild(wallpaperItem);
        });
        
        // Create display options section
        const optionsSection = document.createElement('div');
        optionsSection.className = 'wallpaper-options-section';
        uiContainer.appendChild(optionsSection);
        
        const optionsTitle = document.createElement('h4');
        optionsTitle.className = 'section-title';
        optionsTitle.textContent = 'Display Options';
        optionsSection.appendChild(optionsTitle);
        
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'wallpaper-options-grid';
        optionsSection.appendChild(optionsGrid);
        
        // Opacity slider
        const opacityContainer = this.createSliderOption(
            'Opacity',
            this.options.opacity,
            0,
            1,
            0.1,
            value => {
                this.updateOptions({ opacity: value });
            }
        );
        optionsGrid.appendChild(opacityContainer);
        
        // Blur slider
        const blurContainer = this.createSliderOption(
            'Blur',
            this.options.blur,
            0,
            10,
            1,
            value => {
                this.updateOptions({ blur: value });
            }
        );
        optionsGrid.appendChild(blurContainer);
        
        // Brightness slider
        const brightnessContainer = this.createSliderOption(
            'Brightness',
            this.options.brightness,
            0.5,
            1.5,
            0.1,
            value => {
                this.updateOptions({ brightness: value });
            }
        );
        optionsGrid.appendChild(brightnessContainer);
        
        // Overlay toggle
        const overlayContainer = document.createElement('div');
        overlayContainer.className = 'wallpaper-option-group';
        optionsGrid.appendChild(overlayContainer);
        
        const overlayLabel = document.createElement('label');
        overlayLabel.className = 'wallpaper-checkbox-label';
        overlayContainer.appendChild(overlayLabel);
        
        const overlayCheckbox = document.createElement('input');
        overlayCheckbox.type = 'checkbox';
        overlayCheckbox.checked = this.options.overlay;
        overlayCheckbox.className = 'wallpaper-checkbox';
        overlayLabel.appendChild(overlayCheckbox);
        
        const overlayText = document.createElement('span');
        overlayText.textContent = 'Dark Overlay';
        overlayLabel.appendChild(overlayText);
        
        // Overlay checkbox change handler
        overlayCheckbox.addEventListener('change', () => {
            this.updateOptions({ overlay: overlayCheckbox.checked });
        });
        
        // Animation toggle
        const animationContainer = document.createElement('div');
        animationContainer.className = 'wallpaper-option-group';
        optionsGrid.appendChild(animationContainer);
        
        const animationLabel = document.createElement('label');
        animationLabel.className = 'wallpaper-checkbox-label';
        animationContainer.appendChild(animationLabel);
        
        const animationCheckbox = document.createElement('input');
        animationCheckbox.type = 'checkbox';
        animationCheckbox.checked = this.options.animateWallpaper;
        animationCheckbox.className = 'wallpaper-checkbox';
        animationLabel.appendChild(animationCheckbox);
        
        const animationText = document.createElement('span');
        animationText.textContent = 'Animate Gradients';
        animationLabel.appendChild(animationText);
        
        // Animation checkbox change handler
        animationCheckbox.addEventListener('change', () => {
            this.updateOptions({ animateWallpaper: animationCheckbox.checked });
        });
        
        // Create upload section
        const uploadSection = document.createElement('div');
        uploadSection.className = 'wallpaper-upload-section';
        uiContainer.appendChild(uploadSection);
        
        const uploadTabsContainer = document.createElement('div');
        uploadTabsContainer.className = 'wallpaper-upload-tabs';
        uploadSection.appendChild(uploadTabsContainer);
        
        const uploadTab = document.createElement('button');
        uploadTab.className = 'wallpaper-upload-tab active';
        uploadTab.dataset.tab = 'upload';
        uploadTab.textContent = 'Upload Image';
        uploadTabsContainer.appendChild(uploadTab);
        
        const generateTab = document.createElement('button');
        generateTab.className = 'wallpaper-upload-tab';
        generateTab.dataset.tab = 'generate';
        generateTab.textContent = 'Generate with AI';
        uploadTabsContainer.appendChild(generateTab);
        
        // Create upload content
        const uploadContent = document.createElement('div');
        uploadContent.className = 'wallpaper-upload-content active';
        uploadContent.dataset.tab = 'upload';
        uploadSection.appendChild(uploadContent);
        
        const uploadForm = document.createElement('div');
        uploadForm.className = 'wallpaper-upload-form';
        uploadContent.appendChild(uploadForm);
        
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.className = 'wallpaper-file-input';
        uploadForm.appendChild(fileInput);
        
        const uploadButton = document.createElement('button');
        uploadButton.className = 'wallpaper-upload-btn';
        uploadButton.textContent = 'Upload Wallpaper';
        uploadForm.appendChild(uploadButton);
        
        // Create AI generation content
        const generateContent = document.createElement('div');
        generateContent.className = 'wallpaper-upload-content';
        generateContent.dataset.tab = 'generate';
        uploadSection.appendChild(generateContent);
        
        const generateForm = document.createElement('div');
        generateForm.className = 'wallpaper-generate-form';
        generateContent.appendChild(generateForm);
        
        const promptInput = document.createElement('textarea');
        promptInput.className = 'wallpaper-prompt-input';
        promptInput.placeholder = 'Describe the wallpaper you want to generate...';
        promptInput.rows = 3;
        generateForm.appendChild(promptInput);
        
        const generateInfoText = document.createElement('p');
        generateInfoText.className = 'wallpaper-generate-info';
        generateInfoText.textContent = 'AI image generation requires an API key. Make sure to configure it in settings.';
        generateForm.appendChild(generateInfoText);
        
        const generateButton = document.createElement('button');
        generateButton.className = 'wallpaper-generate-btn';
        generateButton.textContent = 'Generate Wallpaper';
        generateButton.disabled = !this.generationSettings.apiKey && !this.apiEndpoint;
        generateForm.appendChild(generateButton);
        
        // Add event listeners
        
        // Upload button
        uploadButton.addEventListener('click', async () => {
            if (!fileInput.files.length) {
                alert('Please select an image file');
                return;
            }
            
            try {
                uploadButton.textContent = 'Uploading...';
                uploadButton.disabled = true;
                
                // Upload wallpaper
                const wallpaperId = await this.uploadWallpaper(fileInput.files[0]);
                
                // Refresh UI with new wallpaper
                this.refreshWallpapersGrid(wallpapersGrid, wallpaperId);
                
                // Reset file input
                fileInput.value = '';
                
                uploadButton.textContent = 'Upload Wallpaper';
                uploadButton.disabled = false;
            } catch (error) {
                alert(`Error uploading wallpaper: ${error.message}`);
                uploadButton.textContent = 'Upload Wallpaper';
                uploadButton.disabled = false;
            }
        });
        
        // Generate button
        generateButton.addEventListener('click', async () => {
            const prompt = promptInput.value.trim();
            if (!prompt) {
                alert('Please enter a description for the wallpaper');
                return;
            }
            
            try {
                generateButton.textContent = 'Generating...';
                generateButton.disabled = true;
                
                // Generate wallpaper
                const wallpaperId = await this.generateAIWallpaper(prompt);
                
                // Refresh UI with new wallpaper
                this.refreshWallpapersGrid(wallpapersGrid, wallpaperId);
                
                // Reset prompt input
                promptInput.value = '';
                
                generateButton.textContent = 'Generate Wallpaper';
                generateButton.disabled = false;
            } catch (error) {
                alert(`Error generating wallpaper: ${error.message}`);
                generateButton.textContent = 'Generate Wallpaper';
                generateButton.disabled = false;
            }
        });
        
        // Upload/Generate tab switching
        uploadTabsContainer.querySelectorAll('.wallpaper-upload-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                uploadTabsContainer.querySelectorAll('.wallpaper-upload-tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding content
                const tabId = tab.dataset.tab;
                uploadSection.querySelectorAll('.wallpaper-upload-content').forEach(content => {
                    if (content.dataset.tab === tabId) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
        
        // Category tab switching
        tabsContainer.querySelectorAll('.wallpaper-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabsContainer.querySelectorAll('.wallpaper-tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Filter wallpapers
                const category = tab.dataset.category;
                if (category === 'all') {
                    // Show all wallpapers
                    wallpapersGrid.querySelectorAll('.wallpaper-item').forEach(item => {
                        item.style.display = '';
                    });
                } else {
                    // Show only wallpapers of selected type
                    wallpapersGrid.querySelectorAll('.wallpaper-item').forEach(item => {
                        if (item.dataset.type === category) {
                            item.style.display = '';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Create a slider option control
     * @param {string} label - Option label
     * @param {number} value - Current value
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @param {number} step - Step value
     * @param {Function} onChange - Change handler
     * @returns {HTMLElement} Option container
     */
    createSliderOption(label, value, min, max, step, onChange) {
        const container = document.createElement('div');
        container.className = 'wallpaper-option-group';
        
        const labelElement = document.createElement('label');
        labelElement.className = 'wallpaper-option-label';
        container.appendChild(labelElement);
        
        const labelText = document.createElement('span');
        labelText.textContent = label;
        labelElement.appendChild(labelText);
        
        const valueText = document.createElement('span');
        valueText.className = 'wallpaper-option-value';
        
        // Format value display
        let displayValue;
        if (label === 'Blur') {
            displayValue = `${value}px`;
        } else {
            displayValue = Math.round(value * 100) + '%';
        }
        
        valueText.textContent = displayValue;
        labelElement.appendChild(valueText);
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.step = step;
        slider.value = value;
        slider.className = 'wallpaper-option-slider';
        container.appendChild(slider);
        
        // Add change handler
        slider.addEventListener('input', () => {
            const newValue = parseFloat(slider.value);
            
            // Update value display
            if (label === 'Blur') {
                valueText.textContent = `${newValue}px`;
            } else {
                valueText.textContent = Math.round(newValue * 100) + '%';
            }
            
            // Call change handler
            onChange(newValue);
        });
        
        return container;
    }

    /**
     * Refresh wallpapers grid with new wallpaper
     * @param {HTMLElement} grid - Wallpapers grid element
     * @param {string} newWallpaperId - ID of new wallpaper to select
     */
    refreshWallpapersGrid(grid, newWallpaperId) {
        // Clear grid
        grid.innerHTML = '';
        
        // Re-populate grid
        this.wallpapers.forEach(wallpaper => {
            const wallpaperItem = document.createElement('div');
            wallpaperItem.className = 'wallpaper-item';
            wallpaperItem.dataset.id = wallpaper.id;
            wallpaperItem.dataset.type = wallpaper.type;
            
            if (wallpaper.id === this.currentWallpaper || wallpaper.id === newWallpaperId) {
                wallpaperItem.classList.add('active');
                
                // Change to new wallpaper if specified
                if (wallpaper.id === newWallpaperId && this.currentWallpaper !== newWallpaperId) {
                    this.changeWallpaper(newWallpaperId);
                }
            }
            
            // Wallpaper preview
            const preview = document.createElement('div');
            preview.className = 'wallpaper-preview';
            
            // Create preview based on wallpaper type
            switch (wallpaper.type) {
                case 'solid':
                    preview.style.backgroundColor = wallpaper.color;
                    break;
                    
                case 'gradient':
                    preview.style.background = `linear-gradient(135deg, ${wallpaper.colors[0]}, ${wallpaper.colors[1]})`;
                    break;
                    
                case 'pattern':
                case 'ai':
                case 'custom':
                    if (wallpaper.url) {
                        preview.style.backgroundImage = `url('${wallpaper.url}')`;
                        preview.style.backgroundSize = wallpaper.type === 'pattern' ? 'auto' : 'cover';
                        preview.style.backgroundRepeat = wallpaper.type === 'pattern' ? 'repeat' : 'no-repeat';
                    }
                    break;
            }
            
            wallpaperItem.appendChild(preview);
            
            // Wallpaper name
            const name = document.createElement('div');
            name.className = 'wallpaper-name';
            name.textContent = wallpaper.name;
            wallpaperItem.appendChild(name);
            
            // Add delete button for custom wallpapers
            if (wallpaper.type === 'custom') {
                const deleteButton = document.createElement('button');
                deleteButton.className = 'wallpaper-delete-btn';
                deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i>';
                deleteButton.title = 'Delete wallpaper';
                
                // Delete button click handler
                deleteButton.addEventListener('click', event => {
                    event.stopPropagation(); // Prevent selection of wallpaper
                    
                    if (confirm(`Are you sure you want to delete the wallpaper "${wallpaper.name}"?`)) {
                        this.deleteWallpaper(wallpaper.id);
                        wallpaperItem.remove();
                    }
                });
                
                wallpaperItem.appendChild(deleteButton);
            }
            
            // Wallpaper click handler
            wallpaperItem.addEventListener('click', () => {
                // Remove active class from all items
                grid.querySelectorAll('.wallpaper-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked item
                wallpaperItem.classList.add('active');
                
                // Change wallpaper
                this.changeWallpaper(wallpaper.id);
            });
            
            grid.appendChild(wallpaperItem);
        });
    }

    /**
     * Add CSS styles for UI
     */
    addUIStyles() {
        const styleId = 'ai-wallpapers-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .ai-wallpapers-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .ai-wallpapers-header {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .ai-wallpapers-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .ai-wallpapers-tabs {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }
            
            .wallpaper-tab {
                padding: 0.5rem 1rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .wallpaper-tab:hover {
                background-color: var(--bg-secondary, #161b22);
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .wallpaper-tab.active {
                background-color: var(--accent-primary, #7c3aed);
                border-color: var(--accent-primary, #7c3aed);
                color: white;
            }
            
            .wallpapers-container {
                margin-bottom: 1.5rem;
                max-height: 300px;
                overflow-y: auto;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .wallpapers-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                gap: 1rem;
            }
            
            .wallpaper-item {
                display: flex;
                flex-direction: column;
                border: 2px solid transparent;
                border-radius: var(--radius-sm, 0.375rem);
                overflow: hidden;
                background-color: var(--bg-secondary, #161b22);
                cursor: pointer;
                transition: transform 0.2s, border-color 0.2s;
                position: relative;
            }
            
            .wallpaper-item:hover {
                transform: translateY(-3px);
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .wallpaper-item.active {
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .wallpaper-preview {
                width: 100%;
                height: 100px;
                background-color: var(--bg-primary, #0d1117);
                background-size: cover;
                background-position: center;
            }
            
            .wallpaper-name {
                padding: 0.5rem;
                font-size: 0.875rem;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            .wallpaper-delete-btn {
                position: absolute;
                top: 0.25rem;
                right: 0.25rem;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: rgba(239, 68, 68, 0.7);
                color: white;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.75rem;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s;
            }
            
            .wallpaper-item:hover .wallpaper-delete-btn {
                opacity: 1;
            }
            
            .wallpaper-delete-btn:hover {
                background-color: rgba(239, 68, 68, 1);
            }
            
            .wallpaper-options-section {
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
            
            .wallpaper-options-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1.5rem;
            }
            
            .wallpaper-option-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .wallpaper-option-label {
                display: flex;
                justify-content: space-between;
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .wallpaper-option-value {
                font-weight: 500;
                color: var(--text-primary, #f0f6fc);
            }
            
            .wallpaper-option-slider {
                width: 100%;
                height: 5px;
                -webkit-appearance: none;
                background: var(--bg-secondary, #161b22);
                border-radius: var(--radius-sm, 0.375rem);
                outline: none;
            }
            
            .wallpaper-option-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: var(--accent-primary, #7c3aed);
                cursor: pointer;
            }
            
            .wallpaper-option-slider::-moz-range-thumb {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: var(--accent-primary, #7c3aed);
                cursor: pointer;
                border: none;
            }
            
            .wallpaper-checkbox-label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.875rem;
                cursor: pointer;
            }
            
            .wallpaper-checkbox {
                margin: 0;
            }
            
            .wallpaper-upload-section {
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .wallpaper-upload-tabs {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.5rem;
            }
            
            .wallpaper-upload-tab {
                padding: 0.5rem 1rem;
                background: none;
                border: none;
                color: var(--text-secondary, #8b949e);
                font-size: 0.875rem;
                cursor: pointer;
                transition: color 0.2s;
                position: relative;
            }
            
            .wallpaper-upload-tab:hover {
                color: var(--text-primary, #f0f6fc);
            }
            
            .wallpaper-upload-tab.active {
                color: var(--accent-primary, #7c3aed);
                font-weight: 500;
            }
            
            .wallpaper-upload-tab.active::after {
                content: '';
                position: absolute;
                bottom: -0.5rem;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: var(--accent-primary, #7c3aed);
            }
            
            .wallpaper-upload-content {
                display: none;
            }
            
            .wallpaper-upload-content.active {
                display: block;
            }
            
            .wallpaper-upload-form,
            .wallpaper-generate-form {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .wallpaper-file-input {
                padding: 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
            }
            
            .wallpaper-prompt-input {
                padding: 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-family: inherit;
                resize: vertical;
            }
            
            .wallpaper-generate-info {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
                margin: 0;
            }
            
            .wallpaper-upload-btn,
            .wallpaper-generate-btn {
                padding: 0.625rem 1.25rem;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .wallpaper-upload-btn:hover,
            .wallpaper-generate-btn:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .wallpaper-upload-btn:disabled,
            .wallpaper-generate-btn:disabled {
                background-color: var(--accent-primary, #7c3aed);
                opacity: 0.6;
                cursor: not-allowed;
            }
            
            @media (max-width: 768px) {
                .wallpapers-grid {
                    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                }
                
                .wallpaper-options-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIWallpapers };
} else {
    // Add to global scope for browser usage
    window.AIWallpapers = AIWallpapers;
}
/**
 * JAAT-AI Image Style Transfer Feature
 * Applies artistic styles to images using AI
 */

class ImageStyleTransfer {
    constructor() {
        this.availableStyles = [
            {
                id: 'impressionist',
                name: 'Impressionist',
                description: 'Inspired by Monet and Renoir with vibrant colors and visible brushstrokes',
                previewUrl: 'assets/styles/impressionist.jpg'
            },
            {
                id: 'cubism',
                name: 'Cubism',
                description: 'Geometric shapes in abstract form inspired by Picasso and Braque',
                previewUrl: 'assets/styles/cubism.jpg'
            },
            {
                id: 'pop-art',
                name: 'Pop Art',
                description: 'Bold colors and sharp lines in the style of Warhol and Lichtenstein',
                previewUrl: 'assets/styles/pop-art.jpg'
            },
            {
                id: 'van-gogh',
                name: 'Van Gogh',
                description: 'Swirling brushstrokes and intense colors inspired by Van Gogh\'s paintings',
                previewUrl: 'assets/styles/van-gogh.jpg'
            },
            {
                id: 'ukiyo-e',
                name: 'Ukiyo-e',
                description: 'Traditional Japanese woodblock print style with flat colors and strong outlines',
                previewUrl: 'assets/styles/ukiyo-e.jpg'
            },
            {
                id: 'art-nouveau',
                name: 'Art Nouveau',
                description: 'Ornate, flowing lines and natural forms in the style of Mucha and Klimt',
                previewUrl: 'assets/styles/art-nouveau.jpg'
            },
            {
                id: 'pixel-art',
                name: 'Pixel Art',
                description: 'Retro-style digital art with visible pixels and limited color palette',
                previewUrl: 'assets/styles/pixel-art.jpg'
            },
            {
                id: 'cyberpunk',
                name: 'Cyberpunk',
                description: 'Futuristic, neon-infused style with high contrast and digital artifacts',
                previewUrl: 'assets/styles/cyberpunk.jpg'
            },
            {
                id: 'watercolor',
                name: 'Watercolor',
                description: 'Soft edges and transparent colors in traditional watercolor style',
                previewUrl: 'assets/styles/watercolor.jpg'
            }
        ];
        
        // Internal state
        this.canvasElement = null;
        this.canvasContext = null;
        this.originalImage = null;
        this.processedImage = null;
        this.processingStatus = 'idle'; // idle, loading, processing, complete, error
        this.selectedStyle = null;
        this.intensityLevel = 0.7; // 0.0 to 1.0
        
        console.log('JAAT-AI Image Style Transfer feature initialized');
    }
    
    /**
     * Initialize the canvas element
     * @param {HTMLCanvasElement} canvas - Canvas element to use
     * @returns {boolean} Whether initialization was successful
     */
    initializeCanvas(canvas) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            console.error('Invalid canvas element');
            return false;
        }
        
        this.canvasElement = canvas;
        this.canvasContext = canvas.getContext('2d');
        
        return true;
    }
    
    /**
     * Load an image from a file
     * @param {File} imageFile - Image file to load
     * @returns {Promise<boolean>} Whether image was loaded successfully
     */
    async loadImage(imageFile) {
        if (!imageFile || !(imageFile instanceof File)) {
            console.error('Invalid image file');
            return false;
        }
        
        // Check if it's an image file
        if (!imageFile.type.startsWith('image/')) {
            console.error('File is not an image');
            return false;
        }
        
        try {
            this.processingStatus = 'loading';
            this.dispatchEvent('statusChange', { status: 'loading' });
            
            // Create a URL for the file
            const imageUrl = URL.createObjectURL(imageFile);
            
            // Load the image
            this.originalImage = await this.loadImageFromUrl(imageUrl);
            
            // Revoke URL to free memory
            URL.revokeObjectURL(imageUrl);
            
            // Draw the image on the canvas if available
            if (this.canvasElement && this.canvasContext) {
                this.displayOriginalImage();
            }
            
            this.processingStatus = 'idle';
            this.dispatchEvent('statusChange', { status: 'idle' });
            this.dispatchEvent('imageLoaded', { width: this.originalImage.width, height: this.originalImage.height });
            
            return true;
        } catch (error) {
            console.error('Failed to load image:', error);
            this.processingStatus = 'error';
            this.dispatchEvent('statusChange', { status: 'error', error: 'Failed to load image' });
            return false;
        }
    }
    
    /**
     * Load an image from a URL
     * @param {string} url - URL of the image
     * @returns {Promise<HTMLImageElement>} The loaded image
     */
    loadImageFromUrl(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = url;
        });
    }
    
    /**
     * Display the original image on the canvas
     */
    displayOriginalImage() {
        if (!this.originalImage || !this.canvasContext) return;
        
        // Resize canvas to match image dimensions
        this.canvasElement.width = this.originalImage.width;
        this.canvasElement.height = this.originalImage.height;
        
        // Clear canvas and draw image
        this.canvasContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.canvasContext.drawImage(this.originalImage, 0, 0);
    }
    
    /**
     * Get list of available styles
     * @returns {Array} List of available styles
     */
    getAvailableStyles() {
        return [...this.availableStyles];
    }
    
    /**
     * Set the style to apply
     * @param {string} styleId - ID of the style to apply
     * @returns {boolean} Whether style was set successfully
     */
    setStyle(styleId) {
        const style = this.availableStyles.find(s => s.id === styleId);
        if (!style) {
            console.error('Style not found:', styleId);
            return false;
        }
        
        this.selectedStyle = style;
        this.dispatchEvent('styleChanged', { styleId });
        return true;
    }
    
    /**
     * Set the intensity level for style application
     * @param {number} level - Intensity level (0.0 to 1.0)
     * @returns {boolean} Whether intensity was set successfully
     */
    setIntensity(level) {
        if (typeof level !== 'number' || level < 0 || level > 1) {
            console.error('Invalid intensity level, must be between 0 and 1');
            return false;
        }
        
        this.intensityLevel = level;
        this.dispatchEvent('intensityChanged', { level });
        return true;
    }
    
    /**
     * Apply the selected style to the loaded image
     * @returns {Promise<boolean>} Whether style was applied successfully
     */
    async applyStyle() {
        if (!this.originalImage) {
            console.error('No image loaded');
            return false;
        }
        
        if (!this.selectedStyle) {
            console.error('No style selected');
            return false;
        }
        
        try {
            this.processingStatus = 'processing';
            this.dispatchEvent('statusChange', { status: 'processing' });
            
            // In a real implementation, this would call a server API
            // For demonstration, we'll simulate style transfer with a delay
            await this.simulateStyleTransfer();
            
            this.processingStatus = 'complete';
            this.dispatchEvent('statusChange', { status: 'complete' });
            this.dispatchEvent('styleApplied', { 
                styleId: this.selectedStyle.id, 
                intensity: this.intensityLevel 
            });
            
            return true;
        } catch (error) {
            console.error('Style transfer failed:', error);
            this.processingStatus = 'error';
            this.dispatchEvent('statusChange', { 
                status: 'error', 
                error: 'Style transfer failed' 
            });
            return false;
        }
    }
    
    /**
     * Simulate style transfer (for demonstration)
     * @returns {Promise<void>}
     */
    async simulateStyleTransfer() {
        return new Promise((resolve) => {
            // Simulate processing delay
            setTimeout(() => {
                if (!this.canvasContext) {
                    resolve();
                    return;
                }
                
                // Apply a simple filter effect as a demonstration
                // In a real app, this would be replaced with actual style transfer
                const imageData = this.canvasContext.getImageData(
                    0, 0, this.canvasElement.width, this.canvasElement.height
                );
                const data = imageData.data;
                
                // Apply different filters based on the selected style
                switch (this.selectedStyle.id) {
                    case 'impressionist':
                        this.applyImpressionist(data);
                        break;
                    case 'cubism':
                        this.applyCubism(data);
                        break;
                    case 'pop-art':
                        this.applyPopArt(data);
                        break;
                    case 'van-gogh':
                        this.applyVanGogh(data);
                        break;
                    case 'watercolor':
                        this.applyWatercolor(data);
                        break;
                    default:
                        // Apply a generic filter
                        this.applyGenericFilter(data);
                }
                
                this.canvasContext.putImageData(imageData, 0, 0);
                this.processedImage = this.canvasElement.toDataURL('image/jpeg');
                resolve();
            }, 1500);
        });
    }
    
    /**
     * Apply impressionist style (simplified for demonstration)
     * @param {Uint8ClampedArray} data - Image data to modify
     */
    applyImpressionist(data) {
        const intensity = this.intensityLevel * 30;
        for (let i = 0; i < data.length; i += 4) {
            // Randomize pixel positions slightly for brush stroke effect
            const offset = Math.floor(Math.random() * intensity) - intensity/2;
            if (i + offset * 4 >= 0 && i + offset * 4 < data.length) {
                data[i] = data[i + offset * 4]; // R
                data[i + 1] = data[i + offset * 4 + 1]; // G
                data[i + 2] = data[i + offset * 4 + 2]; // B
            }
            
            // Enhance colors slightly
            data[i] = Math.min(255, data[i] * 1.1);
            data[i + 1] = Math.min(255, data[i + 1] * 1.1);
            data[i + 2] = Math.min(255, data[i + 2] * 1.05);
        }
    }
    
    /**
     * Apply cubism style (simplified for demonstration)
     * @param {Uint8ClampedArray} data - Image data to modify
     */
    applyCubism(data) {
        const width = this.canvasElement.width;
        const cellSize = Math.max(5, Math.floor(width * this.intensityLevel / 10));
        
        // Create geometric patterns
        for (let y = 0; y < this.canvasElement.height; y += cellSize) {
            for (let x = 0; x < width; x += cellSize) {
                // Get color from center of cell
                const centerX = Math.min(x + Math.floor(cellSize/2), width - 1);
                const centerY = Math.min(y + Math.floor(cellSize/2), this.canvasElement.height - 1);
                const centerIndex = (centerY * width + centerX) * 4;
                
                // Fill the cell with that color
                for (let cy = 0; cy < cellSize && y + cy < this.canvasElement.height; cy++) {
                    for (let cx = 0; cx < cellSize && x + cx < width; cx++) {
                        const index = ((y + cy) * width + (x + cx)) * 4;
                        data[index] = data[centerIndex];
                        data[index + 1] = data[centerIndex + 1];
                        data[index + 2] = data[centerIndex + 2];
                    }
                }
            }
        }
    }
    
    /**
     * Apply pop art style (simplified for demonstration)
     * @param {Uint8ClampedArray} data - Image data to modify
     */
    applyPopArt(data) {
        const colors = [
            [255, 0, 0],    // Red
            [255, 255, 0],  // Yellow
            [0, 0, 255],    // Blue
            [0, 255, 0]     // Green
        ];
        
        const threshold = 128 + this.intensityLevel * 60;
        
        for (let i = 0; i < data.length; i += 4) {
            // Convert to grayscale
            const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
            
            // Apply posterization effect with pop art colors
            if (gray > threshold) {
                // Use bright colors for highlights
                const colorIndex = Math.floor(i/4) % colors.length;
                data[i] = colors[colorIndex][0];
                data[i + 1] = colors[colorIndex][1];
                data[i + 2] = colors[colorIndex][2];
            } else {
                // Dark areas become black
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
            }
        }
    }
    
    /**
     * Apply Van Gogh style (simplified for demonstration)
     * @param {Uint8ClampedArray} data - Image data to modify
     */
    applyVanGogh(data) {
        const width = this.canvasElement.width;
        const swirl = this.intensityLevel * 10;
        
        // Create a copy of the original data
        const origData = new Uint8ClampedArray(data);
        
        for (let y = 0; y < this.canvasElement.height; y++) {
            for (let x = 0; x < width; x++) {
                // Create swirling effect
                const angle = (x + y) / 20 * Math.PI * 2 / 180;
                const dx = Math.floor(Math.cos(angle) * swirl);
                const dy = Math.floor(Math.sin(angle) * swirl);
                
                // Get source coordinates
                const sx = Math.max(0, Math.min(width - 1, x + dx));
                const sy = Math.max(0, Math.min(this.canvasElement.height - 1, y + dy));
                
                // Get indices
                const srcIndex = (sy * width + sx) * 4;
                const destIndex = (y * width + x) * 4;
                
                // Copy color
                data[destIndex] = origData[srcIndex];
                data[destIndex + 1] = origData[srcIndex + 1];
                data[destIndex + 2] = origData[srcIndex + 2];
            }
        }
        
        // Enhance yellows and blues for Van Gogh feel
        for (let i = 0; i < data.length; i += 4) {
            // Enhance yellows
            if (data[i] > 100 && data[i + 1] > 100) {
                data[i] = Math.min(255, data[i] * 1.2);      // Increase red
                data[i + 1] = Math.min(255, data[i + 1] * 1.2); // Increase green
            }
            
            // Enhance blues
            if (data[i + 2] > 100 && data[i] < 100) {
                data[i + 2] = Math.min(255, data[i + 2] * 1.3); // Increase blue
            }
        }
    }
    
    /**
     * Apply watercolor style (simplified for demonstration)
     * @param {Uint8ClampedArray} data - Image data to modify
     */
    applyWatercolor(data) {
        const width = this.canvasElement.width;
        const blurRadius = Math.floor(this.intensityLevel * 3) + 1;
        
        // Create a copy of the original data
        const origData = new Uint8ClampedArray(data);
        
        // Apply blur effect
        for (let y = 0; y < this.canvasElement.height; y++) {
            for (let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0, count = 0;
                
                // Average nearby pixels
                for (let ky = -blurRadius; ky <= blurRadius; ky++) {
                    for (let kx = -blurRadius; kx <= blurRadius; kx++) {
                        const sx = x + kx;
                        const sy = y + ky;
                        
                        if (sx >= 0 && sx < width && sy >= 0 && sy < this.canvasElement.height) {
                            const srcIndex = (sy * width + sx) * 4;
                            r += origData[srcIndex];
                            g += origData[srcIndex + 1];
                            b += origData[srcIndex + 2];
                            count++;
                        }
                    }
                }
                
                // Calculate average and set new value
                const destIndex = (y * width + x) * 4;
                data[destIndex] = r / count;
                data[destIndex + 1] = g / count;
                data[destIndex + 2] = b / count;
            }
        }
        
        // Apply light color variations to simulate bleeding effect
        for (let i = 0; i < data.length; i += 4) {
            const variation = (Math.random() - 0.5) * this.intensityLevel * 20;
            data[i] = Math.max(0, Math.min(255, data[i] + variation));
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + variation));
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + variation));
        }
    }
    
    /**
     * Apply a generic filter (for demonstration)
     * @param {Uint8ClampedArray} data - Image data to modify
     */
    applyGenericFilter(data) {
        // Adjust saturation and contrast based on intensity
        const satFactor = 1 + this.intensityLevel;
        const contrastFactor = 1 + this.intensityLevel * 0.5;
        
        for (let i = 0; i < data.length; i += 4) {
            // Convert RGB to HSL
            const r = data[i] / 255;
            const g = data[i + 1] / 255;
            const b = data[i + 2] / 255;
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            
            if (max === min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                
                h /= 6;
            }
            
            // Adjust saturation
            s = Math.min(1, s * satFactor);
            
            // Adjust contrast
            l = (l - 0.5) * contrastFactor + 0.5;
            l = Math.max(0, Math.min(1, l));
            
            // Convert back to RGB
            let r1, g1, b1;
            
            if (s === 0) {
                r1 = g1 = b1 = l; // achromatic
            } else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };
                
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                
                r1 = hue2rgb(p, q, h + 1/3);
                g1 = hue2rgb(p, q, h);
                b1 = hue2rgb(p, q, h - 1/3);
            }
            
            // Set the new values
            data[i] = Math.round(r1 * 255);
            data[i + 1] = Math.round(g1 * 255);
            data[i + 2] = Math.round(b1 * 255);
        }
    }
    
    /**
     * Get the current processing status
     * @returns {string} Current processing status
     */
    getStatus() {
        return this.processingStatus;
    }
    
    /**
     * Get the processed image data URL
     * @returns {string|null} Data URL of processed image or null if not available
     */
    getProcessedImageUrl() {
        return this.processedImage;
    }
    
    /**
     * Download the processed image
     * @param {string} [filename='styled-image.jpg'] - Filename for the download
     * @returns {boolean} Whether download was initiated
     */
    downloadProcessedImage(filename = 'styled-image.jpg') {
        if (!this.processedImage) {
            console.error('No processed image available');
            return false;
        }
        
        // Create a download link
        const link = document.createElement('a');
        link.href = this.processedImage;
        link.download = filename;
        link.style.display = 'none';
        
        // Append to document, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return true;
    }
    
    /**
     * Reset to original image
     */
    resetToOriginal() {
        if (!this.originalImage || !this.canvasContext) return;
        
        this.displayOriginalImage();
        this.processedImage = null;
        this.processingStatus = 'idle';
        this.dispatchEvent('statusChange', { status: 'idle' });
        this.dispatchEvent('reset');
    }
    
    /**
     * Dispatch a custom event
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event details
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`jaat.imageStyle.${eventName}`, { 
            detail,
            bubbles: true
        });
        document.dispatchEvent(event);
    }
}

// Register the feature with JAAT-AI
if (window.JAAT) {
    window.JAAT.registerFeature('image-style-transfer', new ImageStyleTransfer());
}

// Add initialization code
document.addEventListener('DOMContentLoaded', function() {
    // Find or create the image style transfer UI if it doesn't exist
    if (!document.querySelector('.image-style-transfer-container') && window.JAAT) {
        // Check if we have the feature module
        const styleTransfer = window.JAAT.features['image-style-transfer'];
        if (!styleTransfer) return;
        
        // Find the advanced features section or create it
        let advancedFeaturesSection = document.querySelector('.advanced-features-section');
        if (!advancedFeaturesSection) {
            const mainContainer = document.querySelector('.main-container');
            if (!mainContainer) return;
            
            advancedFeaturesSection = document.createElement('div');
            advancedFeaturesSection.className = 'advanced-features-section';
            advancedFeaturesSection.style.display = 'none';
            
            const title = document.createElement('h1');
            title.textContent = 'Advanced Features';
            advancedFeaturesSection.appendChild(title);
            
            mainContainer.appendChild(advancedFeaturesSection);
        }
        
        // Create the style transfer container
        const container = document.createElement('div');
        container.className = 'image-style-transfer-container feature-module';
        
        // Create header
        const header = document.createElement('div');
        header.className = 'feature-header';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-paint-brush';
        
        const title = document.createElement('h2');
        title.textContent = 'Image Style Transfer';
        
        header.appendChild(icon);
        header.appendChild(title);
        
        // Create content
        const content = document.createElement('div');
        content.className = 'feature-content';
        
        // Create the canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'style-transfer-canvas';
        canvas.width = 400;
        canvas.height = 300;
        
        // Initialize the canvas
        styleTransfer.initializeCanvas(canvas);
        
        // Create controls
        const controls = document.createElement('div');
        controls.className = 'style-transfer-controls';
        
        // Create file input
        const fileInputContainer = document.createElement('div');
        fileInputContainer.className = 'control-group';
        
        const fileInputLabel = document.createElement('label');
        fileInputLabel.textContent = 'Upload Image';
        fileInputLabel.htmlFor = 'style-transfer-file-input';
        
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = 'style-transfer-file-input';
        fileInput.accept = 'image/*';
        
        fileInputContainer.appendChild(fileInputLabel);
        fileInputContainer.appendChild(fileInput);
        
        // Create style selector
        const styleSelectorContainer = document.createElement('div');
        styleSelectorContainer.className = 'control-group';
        
        const styleSelectorLabel = document.createElement('label');
        styleSelectorLabel.textContent = 'Select Style';
        styleSelectorLabel.htmlFor = 'style-transfer-style-selector';
        
        const styleSelector = document.createElement('select');
        styleSelector.id = 'style-transfer-style-selector';
        styleSelector.disabled = true;
        
        // Add styles to selector
        const styles = styleTransfer.getAvailableStyles();
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a style...';
        styleSelector.appendChild(defaultOption);
        
        styles.forEach(style => {
            const option = document.createElement('option');
            option.value = style.id;
            option.textContent = style.name;
            option.title = style.description;
            styleSelector.appendChild(option);
        });
        
        styleSelectorContainer.appendChild(styleSelectorLabel);
        styleSelectorContainer.appendChild(styleSelector);
        
        // Create intensity slider
        const intensityContainer = document.createElement('div');
        intensityContainer.className = 'control-group';
        
        const intensityLabel = document.createElement('label');
        intensityLabel.textContent = 'Effect Intensity';
        intensityLabel.htmlFor = 'style-transfer-intensity';
        
        const intensityValue = document.createElement('span');
        intensityValue.className = 'intensity-value';
        intensityValue.textContent = '70%';
        
        const intensitySlider = document.createElement('input');
        intensitySlider.type = 'range';
        intensitySlider.id = 'style-transfer-intensity';
        intensitySlider.min = '0';
        intensitySlider.max = '100';
        intensitySlider.value = '70';
        intensitySlider.disabled = true;
        
        intensityContainer.appendChild(intensityLabel);
        intensityContainer.appendChild(intensitySlider);
        intensityContainer.appendChild(intensityValue);
        
        // Create buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        
        const applyButton = document.createElement('button');
        applyButton.className = 'primary-button apply-style-button';
        applyButton.textContent = 'Apply Style';
        applyButton.disabled = true;
        
        const resetButton = document.createElement('button');
        resetButton.className = 'secondary-button reset-style-button';
        resetButton.textContent = 'Reset';
        resetButton.disabled = true;
        
        const downloadButton = document.createElement('button');
        downloadButton.className = 'secondary-button download-style-button';
        downloadButton.textContent = 'Download';
        downloadButton.disabled = true;
        
        buttonsContainer.appendChild(applyButton);
        buttonsContainer.appendChild(resetButton);
        buttonsContainer.appendChild(downloadButton);
        
        // Create status indicator
        const statusContainer = document.createElement('div');
        statusContainer.className = 'status-container';
        
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'status-indicator';
        statusIndicator.textContent = 'Ready';
        
        statusContainer.appendChild(statusIndicator);
        
        // Add all controls
        controls.appendChild(fileInputContainer);
        controls.appendChild(styleSelectorContainer);
        controls.appendChild(intensityContainer);
        controls.appendChild(buttonsContainer);
        controls.appendChild(statusContainer);
        
        // Add canvas and controls to content
        content.appendChild(canvas);
        content.appendChild(controls);
        
        // Assemble the UI
        container.appendChild(header);
        container.appendChild(content);
        
        // Add to the advanced features section
        advancedFeaturesSection.appendChild(container);
        
        // Event listeners for UI interaction
        fileInput.addEventListener('change', async (e) => {
            if (e.target.files && e.target.files[0]) {
                const success = await styleTransfer.loadImage(e.target.files[0]);
                if (success) {
                    styleSelector.disabled = false;
                    resetButton.disabled = false;
                    statusIndicator.textContent = 'Image loaded. Select a style to continue.';
                }
            }
        });
        
        styleSelector.addEventListener('change', (e) => {
            if (e.target.value) {
                styleTransfer.setStyle(e.target.value);
                intensitySlider.disabled = false;
                applyButton.disabled = false;
                statusIndicator.textContent = 'Style selected. Adjust intensity and click Apply.';
            } else {
                intensitySlider.disabled = true;
                applyButton.disabled = true;
            }
        });
        
        intensitySlider.addEventListener('input', (e) => {
            const value = e.target.value;
            intensityValue.textContent = `${value}%`;
            styleTransfer.setIntensity(value / 100);
        });
        
        applyButton.addEventListener('click', async () => {
            statusIndicator.textContent = 'Processing...';
            applyButton.disabled = true;
            const success = await styleTransfer.applyStyle();
            if (success) {
                statusIndicator.textContent = 'Style applied successfully!';
                downloadButton.disabled = false;
            } else {
                statusIndicator.textContent = 'Error applying style. Please try again.';
            }
            applyButton.disabled = false;
        });
        
        resetButton.addEventListener('click', () => {
            styleTransfer.resetToOriginal();
            statusIndicator.textContent = 'Reset to original image.';
            downloadButton.disabled = true;
        });
        
        downloadButton.addEventListener('click', () => {
            const now = new Date();
            const timestamp = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
            const selectedStyle = styleSelector.options[styleSelector.selectedIndex].textContent;
            const filename = `jaat_styled_${selectedStyle.toLowerCase().replace(/\s+/g, '-')}_${timestamp}.jpg`;
            
            styleTransfer.downloadProcessedImage(filename);
        });
        
        // Event listeners for feature events
        document.addEventListener('jaat.imageStyle.statusChange', (e) => {
            const status = e.detail.status;
            switch (status) {
                case 'loading':
                    statusIndicator.textContent = 'Loading image...';
                    break;
                case 'processing':
                    statusIndicator.textContent = 'Applying style...';
                    break;
                case 'complete':
                    statusIndicator.textContent = 'Style applied successfully!';
                    break;
                case 'error':
                    statusIndicator.textContent = `Error: ${e.detail.error || 'Unknown error'}`;
                    break;
                default:
                    statusIndicator.textContent = 'Ready';
            }
        });
        
        // Style the UI elements
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        container.style.borderRadius = '10px';
        container.style.margin = '20px 0';
        container.style.overflow = 'hidden';
        
        header.style.padding = '15px 20px';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        
        icon.style.marginRight = '10px';
        icon.style.color = 'var(--primary-color)';
        
        title.style.margin = '0';
        title.style.fontSize = '1.4rem';
        
        content.style.padding = '20px';
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.gap = '20px';
        
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        canvas.style.borderRadius = '5px';
        
        controls.style.display = 'flex';
        controls.style.flexDirection = 'column';
        controls.style.gap = '15px';
        
        document.querySelectorAll('.control-group').forEach(group => {
            group.style.display = 'flex';
            group.style.flexDirection = 'column';
            group.style.gap = '5px';
        });
        
        document.querySelectorAll('.image-style-transfer-container label').forEach(label => {
            label.style.fontSize = '0.9rem';
            label.style.opacity = '0.8';
        });
        
        document.querySelectorAll('.image-style-transfer-container select, .image-style-transfer-container input[type="file"]').forEach(input => {
            input.style.padding = '8px 12px';
            input.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            input.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            input.style.borderRadius = '4px';
            input.style.color = 'inherit';
        });
        
        intensitySlider.style.width = '100%';
        intensitySlider.style.margin = '10px 0 5px';
        
        intensityValue.style.fontSize = '0.8rem';
        intensityValue.style.opacity = '0.7';
        intensityValue.style.alignSelf = 'flex-end';
        
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.gap = '10px';
        buttonsContainer.style.marginTop = '10px';
        
        document.querySelectorAll('.image-style-transfer-container button').forEach(button => {
            button.style.padding = '8px 16px';
            button.style.borderRadius = '4px';
            button.style.border = 'none';
            button.style.cursor = 'pointer';
            button.style.fontWeight = 'bold';
            button.style.opacity = '0.9';
            button.style.transition = 'all 0.2s ease';
        });
        
        document.querySelectorAll('.image-style-transfer-container button:hover').forEach(button => {
            button.style.opacity = '1';
        });
        
        document.querySelectorAll('.image-style-transfer-container button:disabled').forEach(button => {
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
        });
        
        document.querySelectorAll('.primary-button').forEach(button => {
            button.style.backgroundColor = 'var(--primary-color)';
            button.style.color = 'white';
        });
        
        document.querySelectorAll('.secondary-button').forEach(button => {
            button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            button.style.color = 'var(--text-light)';
        });
        
        statusContainer.style.marginTop = '15px';
        statusContainer.style.textAlign = 'center';
        
        statusIndicator.style.fontSize = '0.9rem';
        statusIndicator.style.padding = '8px';
        statusIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        statusIndicator.style.borderRadius = '4px';
    }
});
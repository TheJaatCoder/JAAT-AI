/**
 * JAAT-AI QR Code Generator Feature
 * Generate customizable QR codes with different styles and options
 */

class QRGenerator {
    constructor() {
        this.canvas = null;
        this.options = {
            text: '',
            width: 256,
            height: 256,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: 'H', // 'L', 'M', 'Q', 'H'
            logo: null,
            logoWidth: 60,
            logoHeight: 60,
            logoBackgroundColor: '#ffffff',
            quietZone: 0,
            border: true,
            borderColor: '#000000',
            borderWidth: 4,
            borderRadius: 0,
            backgroundImage: null,
            backgroundDimming: 0,
            dotStyle: 'square', // 'square', 'rounded', 'dots', 'classy'
            dotScale: 1,
            positionMarkerStyle: 'square' // 'square', 'rounded', 'extra-rounded'
        };
        
        // QR Code instance
        this.qrcode = null;
        
        // Current result
        this.result = {
            dataURL: null,
            blob: null
        };
    }

    /**
     * Initialize QR code generator
     * @param {Object} options - Configuration options
     * @returns {Promise<QRGenerator>} This instance
     */
    async init(options = {}) {
        // Apply custom options
        if (options.options) {
            this.options = { ...this.options, ...options.options };
        }
        
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;
        
        // Load dependencies if needed
        await this.loadDependencies();
        
        console.log('QR Generator initialized');
        return this;
    }

    /**
     * Load required dependencies
     * @returns {Promise<void>}
     */
    async loadDependencies() {
        // In a real implementation, we'd load QRCode.js or similar library
        // For this simulation, we'll use a placeholder implementation
        
        // Check if already loaded
        if (window.QRCode) {
            return;
        }
        
        console.log('Dependencies would be loaded here in a real implementation');
        
        // Simulate loading QRCode library
        window.QRCode = function(options) {
            this.options = options;
            
            this.makeCode = function(text) {
                console.log(`Generated QR code for: ${text}`);
                // In a real implementation, this would generate the actual QR code
            };
            
            this.clear = function() {
                // Clear QR code
            };
        };
    }

    /**
     * Generate QR code from text
     * @param {string} text - Text to encode in QR code
     * @param {Object} customOptions - Custom options for this specific QR code
     * @returns {Promise<Object>} Result with dataURL and blob
     */
    async generate(text, customOptions = {}) {
        // Merge default options with custom options
        const options = { ...this.options, ...customOptions, text };
        
        try {
            // In a real implementation, we'd use a QR code library
            // Here we'll create a simulated QR code
            
            // Create or get canvas context
            const canvas = this.canvas;
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions
            canvas.width = options.width;
            canvas.height = options.height;
            
            // Clear canvas
            ctx.fillStyle = options.colorLight;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw background image if provided
            if (options.backgroundImage) {
                await this.drawBackgroundImage(ctx, options);
            }
            
            // Draw border if enabled
            if (options.border) {
                const borderOffset = options.borderWidth / 2;
                ctx.strokeStyle = options.borderColor;
                ctx.lineWidth = options.borderWidth;
                
                if (options.borderRadius > 0) {
                    // Round corners if border radius is set
                    this.roundRect(
                        ctx, 
                        borderOffset, 
                        borderOffset, 
                        canvas.width - options.borderWidth, 
                        canvas.height - options.borderWidth, 
                        options.borderRadius
                    );
                    ctx.stroke();
                } else {
                    // Simple rectangle
                    ctx.strokeRect(
                        borderOffset, 
                        borderOffset, 
                        canvas.width - options.borderWidth, 
                        canvas.height - options.borderWidth
                    );
                }
            }
            
            // Simulate QR code pattern drawing
            this.drawSimulatedQR(ctx, options);
            
            // Draw logo if provided
            if (options.logo) {
                await this.drawLogo(ctx, options);
            }
            
            // Get result data
            const dataURL = canvas.toDataURL('image/png');
            
            // Create blob from data URL
            const blob = await this.dataURLToBlob(dataURL);
            
            // Update and return result
            this.result = { dataURL, blob };
            return this.result;
        } catch (error) {
            console.error('Error generating QR code:', error);
            throw error;
        }
    }

    /**
     * Draw simulated QR code pattern on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Object} options - QR code options
     */
    drawSimulatedQR(ctx, options) {
        const width = options.width;
        const height = options.height;
        const dotScale = options.dotScale;
        
        // Calculate code size
        const quietZone = options.quietZone;
        const borderSize = options.border ? options.borderWidth : 0;
        const codeSize = Math.min(width, height) - (quietZone * 2) - (borderSize * 2);
        
        // Calculate module size (dot size)
        const moduleCount = 25; // Simulated 25x25 QR code
        const moduleSize = codeSize / moduleCount;
        
        // Calculate starting position (centered)
        const startX = (width - codeSize) / 2;
        const startY = (height - codeSize) / 2;
        
        // Set dot color
        ctx.fillStyle = options.colorDark;
        
        // Create a simulated QR code pattern
        const pattern = this.generateSimulatedPattern(moduleCount);
        
        // Draw QR code modules
        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                // Skip if module is not set (white)
                if (!pattern[row][col]) {
                    continue;
                }
                
                // Check if this is a position marker
                const isPositionMarker = (
                    // Top-left marker
                    (row < 7 && col < 7) ||
                    // Top-right marker
                    (row < 7 && col >= moduleCount - 7) ||
                    // Bottom-left marker
                    (row >= moduleCount - 7 && col < 7)
                );
                
                // Calculate module position
                const x = startX + col * moduleSize;
                const y = startY + row * moduleSize;
                
                // Calculate module size with scale
                let modSize = moduleSize;
                if (!isPositionMarker) {
                    modSize *= dotScale;
                }
                
                // Calculate offset to center scaled module
                const offset = (moduleSize - modSize) / 2;
                
                // Draw module with appropriate style
                if (isPositionMarker) {
                    // Position marker
                    this.drawPositionMarker(ctx, x, y, moduleSize, options.positionMarkerStyle);
                } else {
                    // Regular module
                    this.drawModule(ctx, x + offset, y + offset, modSize, options.dotStyle);
                }
            }
        }
    }

    /**
     * Generate a simulated QR code pattern
     * @param {number} size - Size of the pattern
     * @returns {Array<Array<boolean>>} 2D array of boolean values
     */
    generateSimulatedPattern(size) {
        const pattern = Array(size).fill().map(() => Array(size).fill(false));
        
        // Position detection patterns (3 corners)
        this.fillPositionDetectionPattern(pattern, 0, 0);
        this.fillPositionDetectionPattern(pattern, 0, size - 7);
        this.fillPositionDetectionPattern(pattern, size - 7, 0);
        
        // Timing patterns
        for (let i = 8; i < size - 8; i++) {
            if (i % 2 === 0) {
                pattern[6][i] = true; // Horizontal
                pattern[i][6] = true; // Vertical
            }
        }
        
        // Alignment pattern (for larger QR codes)
        if (size >= 25) {
            this.fillAlignmentPattern(pattern, size - 9, size - 9);
        }
        
        // Add random data modules
        this.fillRandomModules(pattern, size);
        
        return pattern;
    }

    /**
     * Fill a position detection pattern in the QR code
     * @param {Array<Array<boolean>>} pattern - QR code pattern
     * @param {number} row - Starting row
     * @param {number} col - Starting column
     */
    fillPositionDetectionPattern(pattern, row, col) {
        // Outer square
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
                if (
                    r === 0 || r === 6 || // Top and bottom rows
                    c === 0 || c === 6 || // Left and right columns
                    (r >= 2 && r <= 4 && c >= 2 && c <= 4) // Inner square
                ) {
                    pattern[row + r][col + c] = true;
                }
            }
        }
    }

    /**
     * Fill an alignment pattern in the QR code
     * @param {Array<Array<boolean>>} pattern - QR code pattern
     * @param {number} row - Center row
     * @param {number} col - Center column
     */
    fillAlignmentPattern(pattern, row, col) {
        for (let r = -2; r <= 2; r++) {
            for (let c = -2; c <= 2; c++) {
                if (
                    r === -2 || r === 2 || // Top and bottom rows
                    c === -2 || c === 2 || // Left and right columns
                    (r === 0 && c === 0) // Center
                ) {
                    pattern[row + r][col + c] = true;
                }
            }
        }
    }

    /**
     * Fill random modules to simulate data in QR code
     * @param {Array<Array<boolean>>} pattern - QR code pattern
     * @param {number} size - Size of the pattern
     */
    fillRandomModules(pattern, size) {
        // Seed random number generator for consistent results
        const seededRandom = (seed) => {
            let x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };
        
        // Fill with pseudo-random data
        let seed = 1;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                // Skip if already filled
                if (pattern[r][c]) {
                    continue;
                }
                
                // Skip reserved areas
                if (
                    // Format information area
                    (r < 9 && c < 9) ||
                    (r < 9 && c >= size - 8) ||
                    (r >= size - 8 && c < 9) ||
                    // Version information area (for version > 6)
                    (size > 21 && ((r < 6 && c >= size - 11) || (c < 6 && r >= size - 11)))
                ) {
                    continue;
                }
                
                // Create stable pattern based on position
                seed = (r * size + c + 1) * 1000;
                pattern[r][c] = seededRandom(seed) < 0.35; // ~35% fill density for data
            }
        }
    }

    /**
     * Draw a position marker with specified style
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} size - Module size
     * @param {string} style - Marker style
     */
    drawPositionMarker(ctx, x, y, size, style) {
        const radius = size * 0.5;
        
        if (style === 'rounded' || style === 'extra-rounded') {
            // For rounded style, just use the square style with rounded corners
            ctx.fillRect(x, y, size, size);
        } else {
            // Default square style
            ctx.fillRect(x, y, size, size);
        }
    }

    /**
     * Draw a QR code module with specified style
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} size - Module size
     * @param {string} style - Dot style
     */
    drawModule(ctx, x, y, size, style) {
        const radius = size * 0.5;
        
        switch (style) {
            case 'rounded':
                // Rounded rectangle
                this.roundRect(ctx, x, y, size, size, size * 0.25);
                ctx.fill();
                break;
                
            case 'dots':
                // Circle
                ctx.beginPath();
                ctx.arc(x + radius, y + radius, radius * 0.9, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                break;
                
            case 'classy':
                // Diamond shape
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + size, y + radius);
                ctx.lineTo(x + radius, y + size);
                ctx.lineTo(x, y + radius);
                ctx.closePath();
                ctx.fill();
                break;
                
            case 'square':
            default:
                // Default square
                ctx.fillRect(x, y, size, size);
                break;
        }
    }

    /**
     * Draw a rounded rectangle
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} width - Rectangle width
     * @param {number} height - Rectangle height
     * @param {number} radius - Corner radius
     */
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    /**
     * Draw background image on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Object} options - QR code options
     * @returns {Promise<void>}
     */
    async drawBackgroundImage(ctx, options) {
        return new Promise((resolve, reject) => {
            if (!options.backgroundImage) {
                resolve();
                return;
            }
            
            const img = new Image();
            
            img.onload = () => {
                try {
                    // Draw background image
                    ctx.save();
                    
                    // Apply dimming if specified
                    if (options.backgroundDimming > 0) {
                        ctx.globalAlpha = 1 - options.backgroundDimming;
                    }
                    
                    // Draw image centered and scaled to fit
                    const scale = Math.max(
                        options.width / img.width,
                        options.height / img.height
                    );
                    
                    const scaledWidth = img.width * scale;
                    const scaledHeight = img.height * scale;
                    const offsetX = (options.width - scaledWidth) / 2;
                    const offsetY = (options.height - scaledHeight) / 2;
                    
                    ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
                    
                    // Reset global alpha
                    ctx.globalAlpha = 1;
                    ctx.restore();
                    
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };
            
            img.onerror = () => {
                reject(new Error('Failed to load background image'));
            };
            
            img.src = options.backgroundImage;
        });
    }

    /**
     * Draw logo on QR code
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Object} options - QR code options
     * @returns {Promise<void>}
     */
    async drawLogo(ctx, options) {
        return new Promise((resolve, reject) => {
            if (!options.logo) {
                resolve();
                return;
            }
            
            const img = new Image();
            
            img.onload = () => {
                try {
                    // Calculate logo position (centered)
                    const logoWidth = options.logoWidth;
                    const logoHeight = options.logoHeight;
                    const logoX = (options.width - logoWidth) / 2;
                    const logoY = (options.height - logoHeight) / 2;
                    
                    // Draw logo background if specified
                    if (options.logoBackgroundColor) {
                        ctx.fillStyle = options.logoBackgroundColor;
                        this.roundRect(ctx, logoX - 5, logoY - 5, logoWidth + 10, logoHeight + 10, 5);
                        ctx.fill();
                    }
                    
                    // Draw logo
                    ctx.drawImage(img, logoX, logoY, logoWidth, logoHeight);
                    
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };
            
            img.onerror = () => {
                reject(new Error('Failed to load logo image'));
            };
            
            img.src = options.logo;
        });
    }

    /**
     * Convert data URL to Blob
     * @param {string} dataURL - Data URL
     * @returns {Promise<Blob>} Blob object
     */
    async dataURLToBlob(dataURL) {
        return new Promise((resolve) => {
            const parts = dataURL.split(';base64,');
            const contentType = parts[0].split(':')[1];
            const raw = window.atob(parts[1]);
            const rawLength = raw.length;
            const uInt8Array = new Uint8Array(rawLength);
            
            for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            
            resolve(new Blob([uInt8Array], { type: contentType }));
        });
    }

    /**
     * Download the generated QR code
     * @param {string} filename - Filename for the download
     */
    download(filename = 'qr-code.png') {
        if (!this.result.dataURL) {
            console.error('No QR code generated yet');
            return;
        }
        
        // Create download link
        const link = document.createElement('a');
        link.href = this.result.dataURL;
        link.download = filename;
        
        // Append to document, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Create QR generator UI
     * @param {HTMLElement|string} container - Container element or selector
     * @returns {HTMLElement} The created UI
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
        uiContainer.className = 'qr-generator-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'qr-generator-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'qr-generator-title';
        title.textContent = 'QR Code Generator';
        header.appendChild(title);
        
        // Create main content area
        const contentArea = document.createElement('div');
        contentArea.className = 'qr-generator-content';
        uiContainer.appendChild(contentArea);
        
        // Create input area
        const inputArea = document.createElement('div');
        inputArea.className = 'qr-input-area';
        contentArea.appendChild(inputArea);
        
        // QR code content input
        const contentGroup = document.createElement('div');
        contentGroup.className = 'qr-input-group';
        inputArea.appendChild(contentGroup);
        
        const contentLabel = document.createElement('label');
        contentLabel.className = 'qr-input-label';
        contentLabel.htmlFor = 'qr-content-input';
        contentLabel.textContent = 'QR Code Content';
        contentGroup.appendChild(contentLabel);
        
        const contentInput = document.createElement('textarea');
        contentInput.className = 'qr-content-input';
        contentInput.id = 'qr-content-input';
        contentInput.placeholder = 'Enter text, URL, or data to encode...';
        contentInput.rows = 4;
        contentGroup.appendChild(contentInput);
        
        // Create options area
        const optionsArea = document.createElement('div');
        optionsArea.className = 'qr-options-area';
        inputArea.appendChild(optionsArea);
        
        // Size options
        const sizeGroup = document.createElement('div');
        sizeGroup.className = 'qr-input-group';
        optionsArea.appendChild(sizeGroup);
        
        const sizeLabel = document.createElement('label');
        sizeLabel.className = 'qr-input-label';
        sizeLabel.htmlFor = 'qr-size-input';
        sizeLabel.textContent = 'Size (px)';
        sizeGroup.appendChild(sizeLabel);
        
        const sizeInput = document.createElement('input');
        sizeInput.type = 'number';
        sizeInput.className = 'qr-size-input';
        sizeInput.id = 'qr-size-input';
        sizeInput.min = 128;
        sizeInput.max = 1024;
        sizeInput.step = 32;
        sizeInput.value = this.options.width;
        sizeGroup.appendChild(sizeInput);
        
        // Error correction level
        const correctionGroup = document.createElement('div');
        correctionGroup.className = 'qr-input-group';
        optionsArea.appendChild(correctionGroup);
        
        const correctionLabel = document.createElement('label');
        correctionLabel.className = 'qr-input-label';
        correctionLabel.htmlFor = 'qr-correction-select';
        correctionLabel.textContent = 'Error Correction';
        correctionGroup.appendChild(correctionLabel);
        
        const correctionSelect = document.createElement('select');
        correctionSelect.className = 'qr-correction-select';
        correctionSelect.id = 'qr-correction-select';
        correctionSelect.innerHTML = `
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H" selected>High (30%)</option>
        `;
        correctionSelect.value = this.options.correctLevel;
        correctionGroup.appendChild(correctionSelect);
        
        // Colors
        const colorsGroup = document.createElement('div');
        colorsGroup.className = 'qr-input-group';
        optionsArea.appendChild(colorsGroup);
        
        const colorsLabel = document.createElement('div');
        colorsLabel.className = 'qr-input-label';
        colorsLabel.textContent = 'Colors';
        colorsGroup.appendChild(colorsLabel);
        
        const colorsContainer = document.createElement('div');
        colorsContainer.className = 'qr-colors-container';
        colorsGroup.appendChild(colorsContainer);
        
        const darkColorLabel = document.createElement('label');
        darkColorLabel.textContent = 'Dark:';
        darkColorLabel.htmlFor = 'qr-dark-color';
        colorsContainer.appendChild(darkColorLabel);
        
        const darkColorInput = document.createElement('input');
        darkColorInput.type = 'color';
        darkColorInput.className = 'qr-color-input';
        darkColorInput.id = 'qr-dark-color';
        darkColorInput.value = this.options.colorDark;
        colorsContainer.appendChild(darkColorInput);
        
        const lightColorLabel = document.createElement('label');
        lightColorLabel.textContent = 'Light:';
        lightColorLabel.htmlFor = 'qr-light-color';
        colorsContainer.appendChild(lightColorLabel);
        
        const lightColorInput = document.createElement('input');
        lightColorInput.type = 'color';
        lightColorInput.className = 'qr-color-input';
        lightColorInput.id = 'qr-light-color';
        lightColorInput.value = this.options.colorLight;
        colorsContainer.appendChild(lightColorInput);
        
        // Style options
        const styleGroup = document.createElement('div');
        styleGroup.className = 'qr-input-group';
        optionsArea.appendChild(styleGroup);
        
        const styleLabel = document.createElement('label');
        styleLabel.className = 'qr-input-label';
        styleLabel.htmlFor = 'qr-dot-style-select';
        styleLabel.textContent = 'Dot Style';
        styleGroup.appendChild(styleLabel);
        
        const styleSelect = document.createElement('select');
        styleSelect.className = 'qr-dot-style-select';
        styleSelect.id = 'qr-dot-style-select';
        styleSelect.innerHTML = `
            <option value="square">Square</option>
            <option value="rounded">Rounded</option>
            <option value="dots">Dots</option>
            <option value="classy">Classy</option>
        `;
        styleSelect.value = this.options.dotStyle;
        styleGroup.appendChild(styleSelect);
        
        // Logo upload area
        const logoGroup = document.createElement('div');
        logoGroup.className = 'qr-input-group';
        inputArea.appendChild(logoGroup);
        
        const logoLabel = document.createElement('label');
        logoLabel.className = 'qr-input-label';
        logoLabel.textContent = 'Logo Image (optional)';
        logoGroup.appendChild(logoLabel);
        
        const logoUploadContainer = document.createElement('div');
        logoUploadContainer.className = 'qr-logo-upload';
        logoGroup.appendChild(logoUploadContainer);
        
        const logoInput = document.createElement('input');
        logoInput.type = 'file';
        logoInput.className = 'qr-logo-input';
        logoInput.accept = 'image/*';
        logoUploadContainer.appendChild(logoInput);
        
        const logoSizeContainer = document.createElement('div');
        logoSizeContainer.className = 'qr-logo-size-container';
        logoGroup.appendChild(logoSizeContainer);
        
        const logoSizeLabel = document.createElement('label');
        logoSizeLabel.textContent = 'Logo Size:';
        logoSizeLabel.htmlFor = 'qr-logo-size';
        logoSizeContainer.appendChild(logoSizeLabel);
        
        const logoSizeInput = document.createElement('input');
        logoSizeInput.type = 'range';
        logoSizeInput.className = 'qr-logo-size';
        logoSizeInput.id = 'qr-logo-size';
        logoSizeInput.min = 20;
        logoSizeInput.max = 150;
        logoSizeInput.value = this.options.logoWidth;
        logoSizeContainer.appendChild(logoSizeInput);
        
        const logoSizeValue = document.createElement('span');
        logoSizeValue.className = 'qr-logo-size-value';
        logoSizeValue.textContent = `${this.options.logoWidth}px`;
        logoSizeContainer.appendChild(logoSizeValue);
        
        // Create preview area
        const previewArea = document.createElement('div');
        previewArea.className = 'qr-preview-area';
        contentArea.appendChild(previewArea);
        
        const previewContainer = document.createElement('div');
        previewContainer.className = 'qr-preview-container';
        previewArea.appendChild(previewContainer);
        
        // Create QR code preview image
        const previewImage = document.createElement('img');
        previewImage.className = 'qr-preview-image';
        previewImage.alt = 'QR Code Preview';
        previewContainer.appendChild(previewImage);
        
        // Create actions area
        const actionsArea = document.createElement('div');
        actionsArea.className = 'qr-actions-area';
        previewArea.appendChild(actionsArea);
        
        // Generate button
        const generateButton = document.createElement('button');
        generateButton.className = 'qr-action-btn qr-generate-btn';
        generateButton.textContent = 'Generate QR Code';
        actionsArea.appendChild(generateButton);
        
        // Download button
        const downloadButton = document.createElement('button');
        downloadButton.className = 'qr-action-btn qr-download-btn';
        downloadButton.textContent = 'Download QR Code';
        downloadButton.disabled = true;
        actionsArea.appendChild(downloadButton);
        
        // Event listeners
        
        // Generate button click
        generateButton.addEventListener('click', async () => {
            // Get input values
            const text = contentInput.value.trim();
            if (!text) {
                alert('Please enter content for the QR code');
                return;
            }
            
            // Update options from inputs
            const size = parseInt(sizeInput.value, 10);
            const correctLevel = correctionSelect.value;
            const colorDark = darkColorInput.value;
            const colorLight = lightColorInput.value;
            const dotStyle = styleSelect.value;
            
            // Process logo if provided
            let logoDataUrl = null;
            if (logoInput.files.length > 0) {
                try {
                    logoDataUrl = await this.readFileAsDataURL(logoInput.files[0]);
                } catch (error) {
                    console.error('Error reading logo file:', error);
                }
            }
            
            // Set logo size
            const logoSize = parseInt(logoSizeInput.value, 10);
            
            generateButton.textContent = 'Generating...';
            generateButton.disabled = true;
            
            try {
                // Generate QR code
                const result = await this.generate(text, {
                    width: size,
                    height: size,
                    colorDark,
                    colorLight,
                    correctLevel,
                    dotStyle,
                    logo: logoDataUrl,
                    logoWidth: logoSize,
                    logoHeight: logoSize
                });
                
                // Update preview
                previewImage.src = result.dataURL;
                
                // Enable download button
                downloadButton.disabled = false;
                
                generateButton.textContent = 'Generate QR Code';
                generateButton.disabled = false;
            } catch (error) {
                console.error('Error generating QR code:', error);
                alert('Failed to generate QR code');
                
                generateButton.textContent = 'Generate QR Code';
                generateButton.disabled = false;
            }
        });
        
        // Download button click
        downloadButton.addEventListener('click', () => {
            // Get filename from content
            let filename = 'qr-code.png';
            
            const text = contentInput.value.trim();
            if (text) {
                // Use first few characters of content for filename
                const filenameBase = text.substring(0, 20)
                    .replace(/[^a-z0-9]/gi, '-')
                    .toLowerCase();
                filename = `qr-${filenameBase}.png`;
            }
            
            this.download(filename);
        });
        
        // Logo size slider event
        logoSizeInput.addEventListener('input', () => {
            const size = logoSizeInput.value;
            logoSizeValue.textContent = `${size}px`;
        });
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Read file as data URL
     * @param {File} file - File to read
     * @returns {Promise<string>} Data URL
     */
    readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    }

    /**
     * Add CSS styles for the UI
     */
    addUIStyles() {
        const styleId = 'qr-generator-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .qr-generator-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .qr-generator-header {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .qr-generator-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .qr-generator-content {
                display: flex;
                flex-wrap: wrap;
                gap: 1.5rem;
            }
            
            .qr-input-area {
                flex: 1;
                min-width: 300px;
            }
            
            .qr-input-group {
                margin-bottom: 1rem;
            }
            
            .qr-input-label {
                display: block;
                font-size: 0.875rem;
                font-weight: 500;
                margin-bottom: 0.5rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .qr-content-input {
                width: 100%;
                padding: 0.75rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
                font-family: inherit;
                resize: vertical;
            }
            
            .qr-content-input:focus {
                outline: none;
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .qr-options-area {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                gap: 1rem;
            }
            
            .qr-size-input,
            .qr-correction-select,
            .qr-dot-style-select {
                width: 100%;
                padding: 0.5rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
            }
            
            .qr-colors-container {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            
            .qr-color-input {
                width: 40px;
                height: 30px;
                padding: 0;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                overflow: hidden;
                cursor: pointer;
                background-color: transparent;
            }
            
            .qr-color-input::-webkit-color-swatch-wrapper {
                padding: 0;
            }
            
            .qr-color-input::-webkit-color-swatch {
                border: none;
            }
            
            .qr-logo-upload {
                margin-bottom: 0.5rem;
            }
            
            .qr-logo-size-container {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .qr-logo-size {
                flex: 1;
            }
            
            .qr-logo-size-value {
                min-width: 40px;
                text-align: right;
                font-size: 0.75rem;
            }
            
            .qr-preview-area {
                flex: 1;
                min-width: 300px;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                align-items: center;
            }
            
            .qr-preview-container {
                width: 256px;
                height: 256px;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            
            .qr-preview-image {
                max-width: 100%;
                max-height: 100%;
            }
            
            .qr-actions-area {
                display: flex;
                gap: 0.75rem;
                width: 100%;
            }
            
            .qr-action-btn {
                flex: 1;
                padding: 0.75rem 1rem;
                border-radius: var(--radius-sm, 0.375rem);
                font-weight: 500;
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
                border: 1px solid transparent;
                text-align: center;
            }
            
            .qr-generate-btn {
                background-color: var(--accent-primary, #7c3aed);
                color: white;
            }
            
            .qr-generate-btn:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .qr-download-btn {
                background-color: var(--bg-primary, #0d1117);
                border-color: var(--border-color, #30363d);
                color: var(--text-primary, #f0f6fc);
            }
            
            .qr-download-btn:hover:not(:disabled) {
                background-color: var(--bg-secondary, #161b22);
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .qr-action-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            
            @media (max-width: 768px) {
                .qr-generator-content {
                    flex-direction: column;
                }
                
                .qr-preview-container {
                    width: 200px;
                    height: 200px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QRGenerator };
} else {
    // Add to global scope for browser usage
    window.QRGenerator = QRGenerator;
}
/**
 * JAAT-AI Neural Drawing Canvas Feature
 * An interactive drawing canvas with AI-assisted generation and enhancement
 */

class NeuralDrawingCanvas {
    constructor() {
        // Canvas properties
        this.canvas = null;
        this.ctx = null;
        this.width = 800;
        this.height = 600;
        
        // Drawing state
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        
        // Drawing properties
        this.brushSize = 5;
        this.brushColor = '#000000';
        this.opacity = 1.0;
        this.brushType = 'round';
        
        // History and layers
        this.history = [];
        this.historyIndex = -1;
        this.maxHistorySize = 20;
        this.layers = [];
        this.activeLayerIndex = 0;
        
        // Tools
        this.currentTool = 'brush';
        this.tools = {
            brush: { cursor: 'round', supportPressure: true },
            eraser: { cursor: 'round', supportPressure: true },
            line: { cursor: 'crosshair', supportPressure: false },
            rectangle: { cursor: 'crosshair', supportPressure: false },
            circle: { cursor: 'crosshair', supportPressure: false },
            fill: { cursor: 'crosshair', supportPressure: false },
            eyedropper: { cursor: 'crosshair', supportPressure: false },
            text: { cursor: 'text', supportPressure: false },
        };
        
        // AI generation settings
        this.aiModel = 'stable-diffusion';
        this.generationStrength = 0.7;
        this.guidanceScale = 7.5;
        this.promptText = '';
        this.negativePrompt = '';
        this.generationSteps = 30;
        
        // Preset styles
        this.stylePresets = [
            { name: 'Realistic', prompt: 'highly detailed, realistic, 8k, high quality' },
            { name: 'Anime', prompt: 'anime style, cel shading, vibrant colors, studio ghibli inspired' },
            { name: 'Watercolor', prompt: 'watercolor style, soft edges, flowing pigments, artistic' },
            { name: 'Oil Painting', prompt: 'oil painting, textured canvas, brushstrokes, impasto' },
            { name: 'Pencil Sketch', prompt: 'detailed pencil sketch, graphite, shading, realistic drawing' },
            { name: 'Digital Art', prompt: 'digital art, vibrant colors, clean lines, professional illustration' },
            { name: 'Comic Book', prompt: 'comic book style, bold outlines, flat colors, dynamic composition' },
            { name: 'Pixel Art', prompt: 'pixel art style, retro game aesthetic, limited color palette' },
            { name: 'Cyberpunk', prompt: 'cyberpunk style, neon colors, futuristic, high tech low life' },
            { name: 'Fantasy', prompt: 'fantasy art style, magical, ethereal, detailed, mystical' }
        ];
        
        // API endpoint for AI generation
        this.apiEndpoint = '/api/neural-draw';
        
        // Event handlers
        this.eventHandlers = {};
        
        // Drawing stats
        this.stats = {
            sessionDuration: 0,
            strokeCount: 0,
            eraserUsed: 0,
            aiGenerationCount: 0,
            toolChanges: 0
        };
        
        // Pressure sensitivity support
        this.pressureSensitivityEnabled = false;
        
        // Touch support variables
        this.isTouchDevice = false;
        this.touchStartHandler = null;
        this.touchMoveHandler = null;
        this.touchEndHandler = null;
        
        // Pointer events variables
        this.pointerEnabled = false;
        this.pointerDownHandler = null;
        this.pointerMoveHandler = null;
        this.pointerUpHandler = null;
        
        // Storage keys
        this.settingsStorageKey = 'jaat-neural-draw-settings';
        
        // Session timer
        this.sessionStartTime = null;
        this.sessionTimer = null;
        
        // UI state
        this.isFullscreenMode = false;
        this.isPenMenuOpen = false;
        this.isLayersPanelOpen = false;
        this.isAIPanelOpen = false;
        this.isSaving = false;
        
        // UI elements references
        this.elements = {};
    }

    /**
     * Initialize neural drawing canvas
     * @param {Object} options - Configuration options
     * @returns {NeuralDrawingCanvas} This instance
     */
    init(options = {}) {
        console.log('Initializing Neural Drawing Canvas...');
        
        // Apply custom options
        if (options) {
            if (options.width) this.width = options.width;
            if (options.height) this.height = options.height;
            if (options.apiEndpoint) this.apiEndpoint = options.apiEndpoint;
            if (options.brushSize) this.brushSize = options.brushSize;
            if (options.brushColor) this.brushColor = options.brushColor;
        }
        
        // Load saved settings
        this.loadSettings();
        
        // Initialize default layer
        this.initLayers();
        
        // Start session timer
        this.startSessionTimer();
        
        // Trigger initialized event
        this.triggerEvent('initialized', {
            width: this.width,
            height: this.height
        });
        
        return this;
    }

    /**
     * Create canvas element and initialize context
     * @param {HTMLElement|string} container - Container element or selector
     */
    createCanvas(container) {
        // Get container element
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) {
            console.error('Container element not found');
            return;
        }
        
        // Create main canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.classList.add('neural-drawing-canvas');
        
        // Get context
        this.ctx = this.canvas.getContext('2d');
        
        // Clear canvas
        this.clearCanvas();
        
        // Append to container
        container.appendChild(this.canvas);
        
        // Add event listeners
        this.addCanvasEventListeners();
        
        // Check for pressure sensitivity and pointer events support
        this.checkInputSupport();
    }

    /**
     * Add event listeners to canvas
     */
    addCanvasEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        // Touch events
        if ('ontouchstart' in window) {
            this.isTouchDevice = true;
            
            this.touchStartHandler = this.handleTouchStart.bind(this);
            this.touchMoveHandler = this.handleTouchMove.bind(this);
            this.touchEndHandler = this.handleTouchEnd.bind(this);
            
            this.canvas.addEventListener('touchstart', this.touchStartHandler);
            this.canvas.addEventListener('touchmove', this.touchMoveHandler);
            this.canvas.addEventListener('touchend', this.touchEndHandler);
        }
        
        // Pointer events
        if (window.PointerEvent) {
            this.pointerEnabled = true;
            
            this.pointerDownHandler = this.handlePointerDown.bind(this);
            this.pointerMoveHandler = this.handlePointerMove.bind(this);
            this.pointerUpHandler = this.handlePointerUp.bind(this);
            
            this.canvas.addEventListener('pointerdown', this.pointerDownHandler);
            this.canvas.addEventListener('pointermove', this.pointerMoveHandler);
            this.canvas.addEventListener('pointerup', this.pointerUpHandler);
            this.canvas.addEventListener('pointerout', this.pointerUpHandler);
        }
        
        // Prevent right-click context menu
        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    /**
     * Check for pressure sensitivity and pointer events support
     */
    checkInputSupport() {
        // Check if pressure sensitivity is supported
        if (window.PointerEvent) {
            try {
                // Create a test pointer event
                const testEvent = new PointerEvent('pointerdown', {
                    pressure: 0.5,
                    pointerType: 'pen'
                });
                
                // Check if pressure property is accessible
                if (typeof testEvent.pressure === 'number') {
                    this.pressureSensitivityEnabled = true;
                    console.log('Pressure sensitivity supported');
                }
            } catch (error) {
                console.log('Pressure sensitivity not supported', error);
            }
        }
    }

    /**
     * Initialize canvas layers
     */
    initLayers() {
        // Create a default background layer
        this.layers = [
            {
                id: this.generateId(),
                name: 'Background',
                visible: true,
                opacity: 1,
                data: null, // Will be created when canvas is initialized
                locked: false
            }
        ];
        
        this.activeLayerIndex = 0;
    }

    /**
     * Handle mouse down event
     * @param {MouseEvent} e - Mouse event
     */
    handleMouseDown(e) {
        // Skip if pointer events are enabled (will use those instead)
        if (this.pointerEnabled) return;
        
        // Skip if touch device (will use touch events)
        if (this.isTouchDevice) return;
        
        // Get current position
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        
        this.startDrawing(x, y);
    }

    /**
     * Handle mouse move event
     * @param {MouseEvent} e - Mouse event
     */
    handleMouseMove(e) {
        // Skip if pointer events are enabled
        if (this.pointerEnabled) return;
        
        // Skip if touch device
        if (this.isTouchDevice) return;
        
        if (!this.isDrawing) return;
        
        // Get current position
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        
        this.draw(x, y);
    }

    /**
     * Handle mouse up event
     * @param {MouseEvent} e - Mouse event
     */
    handleMouseUp(e) {
        // Skip if pointer events are enabled
        if (this.pointerEnabled) return;
        
        // Skip if touch device
        if (this.isTouchDevice) return;
        
        this.endDrawing();
    }

    /**
     * Handle mouse leave event
     * @param {MouseEvent} e - Mouse event
     */
    handleMouseLeave(e) {
        // Skip if pointer events are enabled
        if (this.pointerEnabled) return;
        
        // Skip if touch device
        if (this.isTouchDevice) return;
        
        this.endDrawing();
    }

    /**
     * Handle touch start event
     * @param {TouchEvent} e - Touch event
     */
    handleTouchStart(e) {
        e.preventDefault();
        
        // Get touch position
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);
        
        this.startDrawing(x, y);
    }

    /**
     * Handle touch move event
     * @param {TouchEvent} e - Touch event
     */
    handleTouchMove(e) {
        e.preventDefault();
        
        if (!this.isDrawing) return;
        
        // Get touch position
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);
        
        this.draw(x, y);
    }

    /**
     * Handle touch end event
     * @param {TouchEvent} e - Touch event
     */
    handleTouchEnd(e) {
        e.preventDefault();
        this.endDrawing();
    }

    /**
     * Handle pointer down event
     * @param {PointerEvent} e - Pointer event
     */
    handlePointerDown(e) {
        // Capture pointer to improve drawing experience
        this.canvas.setPointerCapture(e.pointerId);
        
        // Get position
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        
        // Get pressure if available
        let pressure = e.pressure;
        
        // Default pressure if not supported or not available
        if (pressure === 0 || pressure === null || pressure === undefined) {
            pressure = 1.0;
        }
        
        this.startDrawing(x, y, pressure);
    }

    /**
     * Handle pointer move event
     * @param {PointerEvent} e - Pointer event
     */
    handlePointerMove(e) {
        if (!this.isDrawing) return;
        
        // Get position
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        
        // Get pressure if available
        let pressure = e.pressure;
        
        // Default pressure if not supported or not available
        if (pressure === 0 || pressure === null || pressure === undefined) {
            pressure = 1.0;
        }
        
        this.draw(x, y, pressure);
    }

    /**
     * Handle pointer up event
     * @param {PointerEvent} e - Pointer event
     */
    handlePointerUp(e) {
        this.endDrawing();
        
        // Release pointer capture
        if (this.canvas.hasPointerCapture(e.pointerId)) {
            this.canvas.releasePointerCapture(e.pointerId);
        }
    }

    /**
     * Start drawing
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} pressure - Pen pressure (0.0-1.0)
     */
    startDrawing(x, y, pressure = 1.0) {
        // Skip if the current layer is locked
        if (this.layers[this.activeLayerIndex].locked) {
            return;
        }
        
        // Set drawing state
        this.isDrawing = true;
        this.lastX = x;
        this.lastY = y;
        
        // Save canvas state before starting to draw
        this.saveCanvasState();
        
        // Handle special tools
        switch (this.currentTool) {
            case 'eyedropper':
                this.pickColor(x, y);
                this.isDrawing = false;
                break;
            case 'fill':
                this.fillArea(x, y);
                this.isDrawing = false;
                break;
            case 'text':
                this.showTextInput(x, y);
                this.isDrawing = false;
                break;
            default:
                // For drawing tools, start the stroke
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                
                // Apply tool settings
                this.applyToolSettings(pressure);
                
                // For shape tools, just record the start position
                if (['line', 'rectangle', 'circle'].includes(this.currentTool)) {
                    this.shapeStartX = x;
                    this.shapeStartY = y;
                }
                // For brush tools, draw a single point
                else {
                    this.ctx.arc(x, y, this.brushSize * pressure / 2, 0, Math.PI * 2);
                    this.ctx.fill();
                }
                break;
        }
        
        // Update stats
        this.stats.strokeCount++;
        if (this.currentTool === 'eraser') {
            this.stats.eraserUsed++;
        }
    }

    /**
     * Continue drawing
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} pressure - Pen pressure (0.0-1.0)
     */
    draw(x, y, pressure = 1.0) {
        if (!this.isDrawing) return;
        
        // Get active layer context
        const ctx = this.ctx;
        
        // Apply tool settings for consistent appearance
        this.applyToolSettings(pressure);
        
        // Handle different tools
        switch (this.currentTool) {
            case 'brush':
            case 'eraser':
                // Draw line from last position to current
                ctx.beginPath();
                ctx.moveTo(this.lastX, this.lastY);
                ctx.lineTo(x, y);
                ctx.stroke();
                
                // For smoother lines, also draw a small arc at the current position
                ctx.beginPath();
                ctx.arc(x, y, this.brushSize * pressure / 2, 0, Math.PI * 2);
                ctx.fill();
                break;
            
            case 'line':
            case 'rectangle':
            case 'circle':
                // For shape tools, we'll keep redrawing the entire shape
                // First, restore canvas to before we started drawing
                this.restoreCanvasState();
                
                // Now draw the shape based on start and current position
                ctx.beginPath();
                
                if (this.currentTool === 'line') {
                    ctx.moveTo(this.shapeStartX, this.shapeStartY);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                }
                else if (this.currentTool === 'rectangle') {
                    const width = x - this.shapeStartX;
                    const height = y - this.shapeStartY;
                    ctx.rect(this.shapeStartX, this.shapeStartY, width, height);
                    ctx.stroke();
                }
                else if (this.currentTool === 'circle') {
                    const radius = Math.sqrt(
                        Math.pow(x - this.shapeStartX, 2) + 
                        Math.pow(y - this.shapeStartY, 2)
                    );
                    ctx.arc(this.shapeStartX, this.shapeStartY, radius, 0, Math.PI * 2);
                    ctx.stroke();
                }
                break;
        }
        
        // Update last position
        this.lastX = x;
        this.lastY = y;
    }

    /**
     * End drawing
     */
    endDrawing() {
        this.isDrawing = false;
        
        // Add to history
        if (this.currentTool !== 'eyedropper') {
            this.addToHistory();
        }
    }

    /**
     * Apply the current tool settings to the canvas context
     * @param {number} pressure - Pen pressure (0.0-1.0)
     */
    applyToolSettings(pressure = 1.0) {
        const ctx = this.ctx;
        
        // Calculate pressure-adjusted brush size if tool supports pressure
        const tool = this.tools[this.currentTool];
        let adjustedSize = this.brushSize;
        
        if (tool && tool.supportPressure && this.pressureSensitivityEnabled) {
            adjustedSize = this.brushSize * pressure;
        }
        
        // Set line width
        ctx.lineWidth = adjustedSize;
        
        // Set line join and cap for smoother lines
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        // Set color and opacity
        if (this.currentTool === 'eraser') {
            // For eraser, we use destination-out composite operation
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.fillStyle = 'rgba(0,0,0,1)';
        } else {
            // Normal drawing
            ctx.globalCompositeOperation = 'source-over';
            
            // Convert hex color to rgba with opacity
            const rgba = this.hexToRgba(this.brushColor, this.opacity);
            ctx.strokeStyle = rgba;
            ctx.fillStyle = rgba;
        }
    }

    /**
     * Convert hex color to rgba string
     * @param {string} hex - Hex color string
     * @param {number} opacity - Opacity value (0.0-1.0)
     * @returns {string} RGBA color string
     */
    hexToRgba(hex, opacity) {
        hex = hex.replace('#', '');
        
        // Handle shorthand hex color
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    /**
     * Pick color at the specified position
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    pickColor(x, y) {
        try {
            // Get pixel data
            const pixelData = this.ctx.getImageData(x, y, 1, 1).data;
            
            // Convert to hex
            const hex = '#' + 
                ('0' + pixelData[0].toString(16)).slice(-2) +
                ('0' + pixelData[1].toString(16)).slice(-2) +
                ('0' + pixelData[2].toString(16)).slice(-2);
                
            // Set as current brush color
            this.brushColor = hex;
            
            // Get opacity
            const alpha = pixelData[3] / 255;
            if (alpha > 0) {
                this.opacity = alpha;
            }
            
            // Trigger event for UI update
            this.triggerEvent('colorPicked', {
                color: hex,
                opacity: this.opacity
            });
        } catch (error) {
            console.error('Error picking color:', error);
        }
    }

    /**
     * Fill an area with the current color
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    fillArea(x, y) {
        // Implementation of a basic flood fill algorithm
        try {
            // Round coordinates to integers
            x = Math.floor(x);
            y = Math.floor(y);
            
            // Get canvas image data
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            const data = imageData.data;
            const width = this.canvas.width;
            const height = this.canvas.height;
            
            // Get the color at the clicked position
            const targetColor = this.getColorAtPixel(data, x, y, width);
            
            // Convert current brush color to RGBA values
            const fillColorHex = this.brushColor.replace('#', '');
            const fillColor = [
                parseInt(fillColorHex.substring(0, 2), 16),
                parseInt(fillColorHex.substring(2, 4), 16),
                parseInt(fillColorHex.substring(4, 6), 16),
                Math.round(this.opacity * 255)
            ];
            
            // Check if fill color is same as target color
            if (this.colorMatch(targetColor, fillColor)) {
                return;
            }
            
            // Create a queue for the flood fill
            const queue = [[x, y]];
            const visited = new Set();
            
            // Process queue
            while (queue.length > 0) {
                const [px, py] = queue.pop();
                
                // Check if this pixel is valid and needs to be filled
                if (
                    px < 0 || px >= width || py < 0 || py >= height ||
                    visited.has(px + ',' + py)
                ) {
                    continue;
                }
                
                const currentColor = this.getColorAtPixel(data, px, py, width);
                
                // If current color doesn't match target, skip it
                if (!this.colorMatch(currentColor, targetColor)) {
                    continue;
                }
                
                // Mark as visited
                visited.add(px + ',' + py);
                
                // Fill this pixel
                this.setColorAtPixel(data, px, py, fillColor, width);
                
                // Add neighboring pixels to the queue
                queue.push([px + 1, py]);
                queue.push([px - 1, py]);
                queue.push([px, py + 1]);
                queue.push([px, py - 1]);
            }
            
            // Put the modified image data back
            this.ctx.putImageData(imageData, 0, 0);
            
            // Add to history
            this.addToHistory();
        } catch (error) {
            console.error('Error filling area:', error);
        }
    }

    /**
     * Get color at a specific pixel
     * @param {Uint8ClampedArray} data - Image data
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} width - Image width
     * @returns {Array} RGBA color values
     */
    getColorAtPixel(data, x, y, width) {
        const index = (y * width + x) * 4;
        return [
            data[index],
            data[index + 1],
            data[index + 2],
            data[index + 3]
        ];
    }

    /**
     * Set color at a specific pixel
     * @param {Uint8ClampedArray} data - Image data
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {Array} color - RGBA color values
     * @param {number} width - Image width
     */
    setColorAtPixel(data, x, y, color, width) {
        const index = (y * width + x) * 4;
        data[index] = color[0];
        data[index + 1] = color[1];
        data[index + 2] = color[2];
        data[index + 3] = color[3];
    }

    /**
     * Check if two colors match within a tolerance
     * @param {Array} color1 - First RGBA color
     * @param {Array} color2 - Second RGBA color
     * @param {number} tolerance - Tolerance value (0-255)
     * @returns {boolean} Whether colors match
     */
    colorMatch(color1, color2, tolerance = 10) {
        return (
            Math.abs(color1[0] - color2[0]) <= tolerance &&
            Math.abs(color1[1] - color2[1]) <= tolerance &&
            Math.abs(color1[2] - color2[2]) <= tolerance &&
            Math.abs(color1[3] - color2[3]) <= tolerance
        );
    }

    /**
     * Show text input at specified coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    showTextInput(x, y) {
        // Create a temporary input
        const input = document.createElement('input');
        input.type = 'text';
        input.style.position = 'absolute';
        input.style.left = x + 'px';
        input.style.top = y + 'px';
        input.style.minWidth = '100px';
        input.style.fontFamily = 'sans-serif';
        input.style.fontSize = this.brushSize + 'px';
        input.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        input.style.border = '1px solid #ccc';
        input.style.zIndex = '1000';
        
        document.body.appendChild(input);
        
        // Focus the input
        input.focus();
        
        // Handle input submission
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.addTextToCanvas(x, y, input.value);
                document.body.removeChild(input);
            }
        });
        
        // Handle blur
        input.addEventListener('blur', () => {
            if (input.value) {
                this.addTextToCanvas(x, y, input.value);
            }
            document.body.removeChild(input);
        });
    }

    /**
     * Add text to canvas
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {string} text - Text to add
     */
    addTextToCanvas(x, y, text) {
        if (!text) return;
        
        // Save current canvas state
        this.saveCanvasState();
        
        // Configure text style
        this.ctx.font = `${this.brushSize}px sans-serif`;
        this.ctx.fillStyle = this.hexToRgba(this.brushColor, this.opacity);
        this.ctx.textBaseline = 'middle';
        
        // Add text
        this.ctx.fillText(text, x, y);
        
        // Add to history
        this.addToHistory();
    }

    /**
     * Save current canvas state for undo
     */
    saveCanvasState() {
        if (!this.canvas) return;
        
        try {
            // Save current canvas state as image data
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            this.currentState = imageData;
        } catch (error) {
            console.error('Error saving canvas state:', error);
        }
    }

    /**
     * Restore canvas to saved state
     */
    restoreCanvasState() {
        if (!this.canvas || !this.currentState) return;
        
        try {
            this.ctx.putImageData(this.currentState, 0, 0);
        } catch (error) {
            console.error('Error restoring canvas state:', error);
        }
    }

    /**
     * Add current state to history
     */
    addToHistory() {
        if (!this.canvas) return;
        
        try {
            // Get current state
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            
            // If we've done undo operations and then draw something new,
            // we need to remove any "future" states
            if (this.historyIndex < this.history.length - 1) {
                this.history = this.history.slice(0, this.historyIndex + 1);
            }
            
            // Add to history
            this.history.push(imageData);
            
            // Update index
            this.historyIndex = this.history.length - 1;
            
            // Limit history size
            if (this.history.length > this.maxHistorySize) {
                this.history.shift();
                this.historyIndex--;
            }
            
            // Trigger event
            this.triggerEvent('historyChanged', {
                canUndo: this.canUndo(),
                canRedo: this.canRedo(),
                historySize: this.history.length
            });
        } catch (error) {
            console.error('Error adding to history:', error);
        }
    }

    /**
     * Undo the last action
     * @returns {boolean} Whether undo was successful
     */
    undo() {
        if (!this.canUndo()) return false;
        
        try {
            // Decrement index
            this.historyIndex--;
            
            // Restore from history
            this.ctx.putImageData(this.history[this.historyIndex], 0, 0);
            
            // Trigger event
            this.triggerEvent('historyChanged', {
                canUndo: this.canUndo(),
                canRedo: this.canRedo(),
                historySize: this.history.length
            });
            
            return true;
        } catch (error) {
            console.error('Error during undo:', error);
            return false;
        }
    }

    /**
     * Redo the last undone action
     * @returns {boolean} Whether redo was successful
     */
    redo() {
        if (!this.canRedo()) return false;
        
        try {
            // Increment index
            this.historyIndex++;
            
            // Restore from history
            this.ctx.putImageData(this.history[this.historyIndex], 0, 0);
            
            // Trigger event
            this.triggerEvent('historyChanged', {
                canUndo: this.canUndo(),
                canRedo: this.canRedo(),
                historySize: this.history.length
            });
            
            return true;
        } catch (error) {
            console.error('Error during redo:', error);
            return false;
        }
    }

    /**
     * Check if undo is available
     * @returns {boolean} Whether undo is available
     */
    canUndo() {
        return this.historyIndex > 0;
    }

    /**
     * Check if redo is available
     * @returns {boolean} Whether redo is available
     */
    canRedo() {
        return this.historyIndex < this.history.length - 1;
    }

    /**
     * Clear the canvas
     */
    clearCanvas() {
        if (!this.canvas) return;
        
        // Save state before clearing
        this.saveCanvasState();
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add to history
        this.addToHistory();
        
        // Trigger event
        this.triggerEvent('canvasCleared', {});
    }

    /**
     * Resize the canvas
     * @param {number} width - New width
     * @param {number} height - New height
     * @param {boolean} scaleContent - Whether to scale content
     */
    resizeCanvas(width, height, scaleContent = true) {
        if (!this.canvas) return;
        
        // Save current image data if scaling content
        let imageData = null;
        if (scaleContent) {
            imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        }
        
        // Update dimensions
        this.width = width;
        this.height = height;
        
        // Resize canvas
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Restore content if scaling
        if (scaleContent && imageData) {
            // Create a temporary canvas to scale the image
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = imageData.width;
            tempCanvas.height = imageData.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.putImageData(imageData, 0, 0);
            
            // Draw scaled image to main canvas
            this.ctx.drawImage(
                tempCanvas, 0, 0, imageData.width, imageData.height,
                0, 0, width, height
            );
        }
        
        // Add to history
        this.addToHistory();
        
        // Trigger event
        this.triggerEvent('canvasResized', {
            width,
            height,
            scaleContent
        });
    }

    /**
     * Set the active drawing tool
     * @param {string} toolName - Tool name
     */
    setTool(toolName) {
        if (!this.tools[toolName]) {
            console.warn(`Unknown tool: ${toolName}`);
            return;
        }
        
        this.currentTool = toolName;
        
        // Update cursor if canvas exists
        if (this.canvas) {
            const tool = this.tools[toolName];
            if (tool.cursor === 'round') {
                // Create custom cursor for brushes
                const size = Math.max(10, this.brushSize);
                const cursorCanvas = document.createElement('canvas');
                cursorCanvas.width = size * 2;
                cursorCanvas.height = size * 2;
                const cursorCtx = cursorCanvas.getContext('2d');
                
                // Draw circle
                cursorCtx.beginPath();
                cursorCtx.arc(size, size, this.brushSize / 2, 0, Math.PI * 2);
                cursorCtx.strokeStyle = 'white';
                cursorCtx.lineWidth = 1.5;
                cursorCtx.stroke();
                cursorCtx.strokeStyle = 'black';
                cursorCtx.lineWidth = 1;
                cursorCtx.stroke();
                
                // Set cursor
                const cursorUrl = cursorCanvas.toDataURL();
                this.canvas.style.cursor = `url(${cursorUrl}) ${size} ${size}, auto`;
            } else {
                this.canvas.style.cursor = tool.cursor;
            }
        }
        
        // Increment tool changes stat
        this.stats.toolChanges++;
        
        // Trigger event
        this.triggerEvent('toolChanged', {
            tool: toolName
        });
    }

    /**
     * Set brush size
     * @param {number} size - Brush size
     */
    setBrushSize(size) {
        this.brushSize = size;
        
        // Update cursor if needed
        if (this.canvas && this.tools[this.currentTool].cursor === 'round') {
            this.setTool(this.currentTool); // Refresh cursor
        }
        
        // Trigger event
        this.triggerEvent('brushSizeChanged', {
            size
        });
    }

    /**
     * Set brush color
     * @param {string} color - Hex color string
     */
    setBrushColor(color) {
        // Validate hex color
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            this.brushColor = color;
            
            // Trigger event
            this.triggerEvent('brushColorChanged', {
                color
            });
        } else {
            console.warn('Invalid hex color:', color);
        }
    }

    /**
     * Set brush opacity
     * @param {number} opacity - Opacity value (0.0-1.0)
     */
    setOpacity(opacity) {
        // Validate opacity
        if (opacity >= 0 && opacity <= 1) {
            this.opacity = opacity;
            
            // Trigger event
            this.triggerEvent('opacityChanged', {
                opacity
            });
        } else {
            console.warn('Invalid opacity:', opacity);
        }
    }

    /**
     * Generate image using AI
     * @param {string} prompt - Text prompt
     * @param {Object} options - Generation options
     * @returns {Promise<string>} Generated image URL
     */
    async generateImageWithAI(prompt, options = {}) {
        // Validate prompt
        if (!prompt) {
            throw new Error('Prompt is required for AI generation');
        }
        
        try {
            // Save current canvas as mask/initial image
            const canvasDataUrl = this.canvas.toDataURL('image/png');
            
            // Prepare request
            const requestData = {
                prompt: prompt,
                negative_prompt: options.negativePrompt || this.negativePrompt,
                image: canvasDataUrl,
                model: options.model || this.aiModel,
                strength: options.strength || this.generationStrength,
                guidance_scale: options.guidanceScale || this.guidanceScale,
                steps: options.steps || this.generationSteps
            };
            
            // Show loading state
            this.triggerEvent('generationStarted', {
                prompt,
                options: requestData
            });
            
            // Send request to API
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            
            // Get response
            const result = await response.json();
            
            if (!result.image) {
                throw new Error('No image in API response');
            }
            
            // Load generated image to canvas
            await this.loadImageToCanvas(result.image);
            
            // Update stats
            this.stats.aiGenerationCount++;
            
            // Trigger event
            this.triggerEvent('generationCompleted', {
                prompt,
                result
            });
            
            return result.image;
        } catch (error) {
            console.error('Error generating image with AI:', error);
            
            // Trigger event
            this.triggerEvent('generationFailed', {
                prompt,
                error: error.message
            });
            
            throw error;
        }
    }

    /**
     * Load image to canvas
     * @param {string} imageUrl - Image URL or Data URL
     * @returns {Promise<void>}
     */
    loadImageToCanvas(imageUrl) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            
            image.onload = () => {
                // Save state before changing
                this.saveCanvasState();
                
                // Clear canvas
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Draw image
                this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
                
                // Add to history
                this.addToHistory();
                
                resolve();
            };
            
            image.onerror = (error) => {
                reject(new Error('Failed to load image'));
            };
            
            // Set crossOrigin to anonymous for external URLs
            if (!imageUrl.startsWith('data:')) {
                image.crossOrigin = 'anonymous';
            }
            
            image.src = imageUrl;
        });
    }

    /**
     * Export canvas as image
     * @param {string} format - Image format ('png', 'jpeg', 'webp')
     * @param {number} quality - Image quality for lossy formats (0.0-1.0)
     * @returns {string} Data URL of exported image
     */
    exportImage(format = 'png', quality = 0.9) {
        if (!this.canvas) return null;
        
        // Validate format
        const validFormats = ['png', 'jpeg', 'webp'];
        if (!validFormats.includes(format)) {
            format = 'png';
        }
        
        // Validate quality
        if (quality < 0 || quality > 1) {
            quality = 0.9;
        }
        
        // Export to data URL
        return this.canvas.toDataURL(`image/${format}`, quality);
    }

    /**
     * Download canvas as image
     * @param {string} filename - Filename without extension
     * @param {string} format - Image format ('png', 'jpeg', 'webp')
     * @param {number} quality - Image quality for lossy formats (0.0-1.0)
     */
    downloadImage(filename = 'neural-drawing', format = 'png', quality = 0.9) {
        if (!this.canvas) return;
        
        // Get data URL
        const dataUrl = this.exportImage(format, quality);
        
        // Create download link
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${filename}.${format}`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);
        
        // Trigger event
        this.triggerEvent('imageDownloaded', {
            filename,
            format,
            quality
        });
    }

    /**
     * Create a layer
     * @param {string} name - Layer name
     * @returns {Object} Created layer
     */
    createLayer(name) {
        // Generate layer object
        const layer = {
            id: this.generateId(),
            name: name || `Layer ${this.layers.length + 1}`,
            visible: true,
            opacity: 1,
            data: null,
            locked: false
        };
        
        // Add to layers
        this.layers.push(layer);
        
        // Set as active layer
        this.activeLayerIndex = this.layers.length - 1;
        
        // Trigger event
        this.triggerEvent('layerCreated', layer);
        
        return layer;
    }

    /**
     * Delete a layer
     * @param {number} index - Layer index
     * @returns {boolean} Whether deletion was successful
     */
    deleteLayer(index) {
        // Validate index
        if (index < 0 || index >= this.layers.length) {
            return false;
        }
        
        // Cannot delete if only one layer
        if (this.layers.length <= 1) {
            return false;
        }
        
        // Get layer to delete
        const deletedLayer = this.layers[index];
        
        // Remove from layers
        this.layers.splice(index, 1);
        
        // Update active layer index if needed
        if (this.activeLayerIndex >= this.layers.length) {
            this.activeLayerIndex = this.layers.length - 1;
        } else if (this.activeLayerIndex === index) {
            this.activeLayerIndex = Math.max(0, index - 1);
        }
        
        // Trigger event
        this.triggerEvent('layerDeleted', {
            index,
            layer: deletedLayer
        });
        
        return true;
    }

    /**
     * Set the active layer
     * @param {number} index - Layer index
     * @returns {boolean} Whether layer activation was successful
     */
    setActiveLayer(index) {
        // Validate index
        if (index < 0 || index >= this.layers.length) {
            return false;
        }
        
        // Set active layer
        this.activeLayerIndex = index;
        
        // Trigger event
        this.triggerEvent('layerActivated', {
            index,
            layer: this.layers[index]
        });
        
        return true;
    }

    /**
     * Toggle layer visibility
     * @param {number} index - Layer index
     * @returns {boolean} Whether layer is now visible
     */
    toggleLayerVisibility(index) {
        // Validate index
        if (index < 0 || index >= this.layers.length) {
            return false;
        }
        
        // Toggle visibility
        this.layers[index].visible = !this.layers[index].visible;
        
        // Trigger event
        this.triggerEvent('layerVisibilityChanged', {
            index,
            visible: this.layers[index].visible
        });
        
        return this.layers[index].visible;
    }

    /**
     * Set layer opacity
     * @param {number} index - Layer index
     * @param {number} opacity - Opacity value (0.0-1.0)
     * @returns {boolean} Whether opacity change was successful
     */
    setLayerOpacity(index, opacity) {
        // Validate index
        if (index < 0 || index >= this.layers.length) {
            return false;
        }
        
        // Validate opacity
        if (opacity < 0 || opacity > 1) {
            return false;
        }
        
        // Set opacity
        this.layers[index].opacity = opacity;
        
        // Trigger event
        this.triggerEvent('layerOpacityChanged', {
            index,
            opacity
        });
        
        return true;
    }

    /**
     * Toggle layer lock
     * @param {number} index - Layer index
     * @returns {boolean} Whether layer is now locked
     */
    toggleLayerLock(index) {
        // Validate index
        if (index < 0 || index >= this.layers.length) {
            return false;
        }
        
        // Toggle lock
        this.layers[index].locked = !this.layers[index].locked;
        
        // Trigger event
        this.triggerEvent('layerLockChanged', {
            index,
            locked: this.layers[index].locked
        });
        
        return this.layers[index].locked;
    }

    /**
     * Move layer up in the stack
     * @param {number} index - Layer index
     * @returns {boolean} Whether move was successful
     */
    moveLayerUp(index) {
        // Validate index
        if (index < 0 || index >= this.layers.length - 1) {
            return false;
        }
        
        // Swap layers
        [this.layers[index], this.layers[index + 1]] = [this.layers[index + 1], this.layers[index]];
        
        // Update active layer index if needed
        if (this.activeLayerIndex === index) {
            this.activeLayerIndex++;
        } else if (this.activeLayerIndex === index + 1) {
            this.activeLayerIndex--;
        }
        
        // Trigger event
        this.triggerEvent('layerOrderChanged', {
            layers: this.layers
        });
        
        return true;
    }

    /**
     * Move layer down in the stack
     * @param {number} index - Layer index
     * @returns {boolean} Whether move was successful
     */
    moveLayerDown(index) {
        // Validate index
        if (index <= 0 || index >= this.layers.length) {
            return false;
        }
        
        // Swap layers
        [this.layers[index], this.layers[index - 1]] = [this.layers[index - 1], this.layers[index]];
        
        // Update active layer index if needed
        if (this.activeLayerIndex === index) {
            this.activeLayerIndex--;
        } else if (this.activeLayerIndex === index - 1) {
            this.activeLayerIndex++;
        }
        
        // Trigger event
        this.triggerEvent('layerOrderChanged', {
            layers: this.layers
        });
        
        return true;
    }

    /**
     * Rename a layer
     * @param {number} index - Layer index
     * @param {string} name - New layer name
     * @returns {boolean} Whether rename was successful
     */
    renameLayer(index, name) {
        // Validate index
        if (index < 0 || index >= this.layers.length) {
            return false;
        }
        
        // Set name
        this.layers[index].name = name;
        
        // Trigger event
        this.triggerEvent('layerRenamed', {
            index,
            name
        });
        
        return true;
    }

    /**
     * Start session timer
     */
    startSessionTimer() {
        this.sessionStartTime = Date.now();
        
        // Update session duration every second
        this.sessionTimer = setInterval(() => {
            this.stats.sessionDuration = Math.floor((Date.now() - this.sessionStartTime) / 1000);
            
            // Trigger event every minute
            if (this.stats.sessionDuration % 60 === 0) {
                this.triggerEvent('sessionDurationUpdated', {
                    duration: this.stats.sessionDuration
                });
            }
        }, 1000);
    }

    /**
     * Stop session timer
     */
    stopSessionTimer() {
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
            this.sessionTimer = null;
        }
    }

    /**
     * Get drawing statistics
     * @returns {Object} Drawing statistics
     */
    getStats() {
        return { ...this.stats };
    }

    /**
     * Reset drawing statistics
     */
    resetStats() {
        this.stats = {
            sessionDuration: 0,
            strokeCount: 0,
            eraserUsed: 0,
            aiGenerationCount: 0,
            toolChanges: 0
        };
        
        this.startSessionTimer();
        
        // Trigger event
        this.triggerEvent('statsReset', this.stats);
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem(this.settingsStorageKey);
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                
                // Apply settings
                if (settings.brushSize) this.brushSize = settings.brushSize;
                if (settings.brushColor) this.brushColor = settings.brushColor;
                if (settings.opacity) this.opacity = settings.opacity;
                if (settings.aiModel) this.aiModel = settings.aiModel;
                if (settings.generationStrength) this.generationStrength = settings.generationStrength;
                if (settings.guidanceScale) this.guidanceScale = settings.guidanceScale;
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    /**
     * Save settings to localStorage
     */
    saveSettings() {
        try {
            const settings = {
                brushSize: this.brushSize,
                brushColor: this.brushColor,
                opacity: this.opacity,
                aiModel: this.aiModel,
                generationStrength: this.generationStrength,
                guidanceScale: this.guidanceScale
            };
            
            localStorage.setItem(this.settingsStorageKey, JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    /**
     * Generate a unique ID
     * @returns {string} Unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    /**
     * Register an event handler
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     */
    on(event, handler) {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        
        this.eventHandlers[event].push(handler);
    }

    /**
     * Trigger an event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    triggerEvent(event, data) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event].forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }

    /**
     * Clean up resources
     */
    destroy() {
        // Remove event listeners
        if (this.canvas) {
            this.canvas.removeEventListener('mousedown', this.handleMouseDown.bind(this));
            this.canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            this.canvas.removeEventListener('mouseup', this.handleMouseUp.bind(this));
            this.canvas.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
            
            if (this.isTouchDevice) {
                this.canvas.removeEventListener('touchstart', this.touchStartHandler);
                this.canvas.removeEventListener('touchmove', this.touchMoveHandler);
                this.canvas.removeEventListener('touchend', this.touchEndHandler);
            }
            
            if (this.pointerEnabled) {
                this.canvas.removeEventListener('pointerdown', this.pointerDownHandler);
                this.canvas.removeEventListener('pointermove', this.pointerMoveHandler);
                this.canvas.removeEventListener('pointerup', this.pointerUpHandler);
                this.canvas.removeEventListener('pointerout', this.pointerUpHandler);
            }
        }
        
        // Stop session timer
        this.stopSessionTimer();
        
        // Clear references
        this.canvas = null;
        this.ctx = null;
        
        // Trigger event
        this.triggerEvent('destroyed', {});
    }

    /**
     * Create UI for neural drawing canvas
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
        uiContainer.className = 'neural-drawing-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'drawing-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'drawing-title';
        title.textContent = 'Neural Drawing Canvas';
        header.appendChild(title);
        
        // Create toolbar
        const toolbar = document.createElement('div');
        toolbar.className = 'drawing-toolbar';
        uiContainer.appendChild(toolbar);
        
        // Tools group
        const toolsGroup = document.createElement('div');
        toolsGroup.className = 'toolbar-group tools-group';
        toolbar.appendChild(toolsGroup);
        
        // Create tool buttons
        Object.keys(this.tools).forEach(toolName => {
            const toolButton = document.createElement('button');
            toolButton.className = `tool-button ${toolName}-tool`;
            toolButton.dataset.tool = toolName;
            toolButton.title = toolName.charAt(0).toUpperCase() + toolName.slice(1);
            
            // Add icon
            const icon = document.createElement('span');
            icon.className = 'tool-icon';
            
            // Set icon based on tool
            switch (toolName) {
                case 'brush':
                    icon.innerHTML = '<i class="fas fa-paint-brush"></i>';
                    break;
                case 'eraser':
                    icon.innerHTML = '<i class="fas fa-eraser"></i>';
                    break;
                case 'line':
                    icon.innerHTML = '<i class="fas fa-slash"></i>';
                    break;
                case 'rectangle':
                    icon.innerHTML = '<i class="far fa-square"></i>';
                    break;
                case 'circle':
                    icon.innerHTML = '<i class="far fa-circle"></i>';
                    break;
                case 'fill':
                    icon.innerHTML = '<i class="fas fa-fill-drip"></i>';
                    break;
                case 'eyedropper':
                    icon.innerHTML = '<i class="fas fa-eye-dropper"></i>';
                    break;
                case 'text':
                    icon.innerHTML = '<i class="fas fa-font"></i>';
                    break;
                default:
                    icon.textContent = toolName.charAt(0).toUpperCase();
            }
            
            toolButton.appendChild(icon);
            
            // Make brush tool active by default
            if (toolName === this.currentTool) {
                toolButton.classList.add('active');
            }
            
            // Add click handler
            toolButton.addEventListener('click', () => {
                // Update active button
                toolsGroup.querySelectorAll('.tool-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                toolButton.classList.add('active');
                
                // Set tool
                this.setTool(toolName);
            });
            
            toolsGroup.appendChild(toolButton);
        });
        
        // Brush settings group
        const brushGroup = document.createElement('div');
        brushGroup.className = 'toolbar-group brush-group';
        toolbar.appendChild(brushGroup);
        
        // Color picker
        const colorContainer = document.createElement('div');
        colorContainer.className = 'color-container';
        brushGroup.appendChild(colorContainer);
        
        const colorPickerLabel = document.createElement('span');
        colorPickerLabel.className = 'control-label';
        colorPickerLabel.textContent = 'Color';
        colorContainer.appendChild(colorPickerLabel);
        
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.className = 'color-picker';
        colorPicker.value = this.brushColor;
        colorPicker.title = 'Brush color';
        colorContainer.appendChild(colorPicker);
        
        // Brush size
        const sizeContainer = document.createElement('div');
        sizeContainer.className = 'size-container';
        brushGroup.appendChild(sizeContainer);
        
        const sizeLabel = document.createElement('span');
        sizeLabel.className = 'control-label';
        sizeLabel.textContent = 'Size';
        sizeContainer.appendChild(sizeLabel);
        
        const sizeSlider = document.createElement('input');
        sizeSlider.type = 'range';
        sizeSlider.className = 'size-slider';
        sizeSlider.min = '1';
        sizeSlider.max = '50';
        sizeSlider.value = this.brushSize.toString();
        sizeSlider.title = 'Brush size';
        sizeContainer.appendChild(sizeSlider);
        
        const sizeValue = document.createElement('span');
        sizeValue.className = 'size-value';
        sizeValue.textContent = this.brushSize.toString();
        sizeContainer.appendChild(sizeValue);
        
        // Opacity
        const opacityContainer = document.createElement('div');
        opacityContainer.className = 'opacity-container';
        brushGroup.appendChild(opacityContainer);
        
        const opacityLabel = document.createElement('span');
        opacityLabel.className = 'control-label';
        opacityLabel.textContent = 'Opacity';
        opacityContainer.appendChild(opacityLabel);
        
        const opacitySlider = document.createElement('input');
        opacitySlider.type = 'range';
        opacitySlider.className = 'opacity-slider';
        opacitySlider.min = '0';
        opacitySlider.max = '1';
        opacitySlider.step = '0.05';
        opacitySlider.value = this.opacity.toString();
        opacitySlider.title = 'Brush opacity';
        opacityContainer.appendChild(opacitySlider);
        
        const opacityValue = document.createElement('span');
        opacityValue.className = 'opacity-value';
        opacityValue.textContent = Math.round(this.opacity * 100) + '%';
        opacityContainer.appendChild(opacityValue);
        
        // Action buttons group
        const actionsGroup = document.createElement('div');
        actionsGroup.className = 'toolbar-group actions-group';
        toolbar.appendChild(actionsGroup);
        
        // Undo button
        const undoButton = document.createElement('button');
        undoButton.className = 'action-button undo-button';
        undoButton.innerHTML = '<i class="fas fa-undo"></i>';
        undoButton.title = 'Undo';
        undoButton.disabled = !this.canUndo();
        actionsGroup.appendChild(undoButton);
        
        // Redo button
        const redoButton = document.createElement('button');
        redoButton.className = 'action-button redo-button';
        redoButton.innerHTML = '<i class="fas fa-redo"></i>';
        redoButton.title = 'Redo';
        redoButton.disabled = !this.canRedo();
        actionsGroup.appendChild(redoButton);
        
        // Clear button
        const clearButton = document.createElement('button');
        clearButton.className = 'action-button clear-button';
        clearButton.innerHTML = '<i class="fas fa-trash"></i>';
        clearButton.title = 'Clear canvas';
        actionsGroup.appendChild(clearButton);
        
        // Save button
        const saveButton = document.createElement('button');
        saveButton.className = 'action-button save-button';
        saveButton.innerHTML = '<i class="fas fa-save"></i>';
        saveButton.title = 'Save image';
        actionsGroup.appendChild(saveButton);
        
        // AI generation button
        const aiButton = document.createElement('button');
        aiButton.className = 'action-button ai-button';
        aiButton.innerHTML = '<i class="fas fa-magic"></i> AI';
        aiButton.title = 'Generate with AI';
        actionsGroup.appendChild(aiButton);
        
        // Create canvas container
        const canvasContainer = document.createElement('div');
        canvasContainer.className = 'canvas-container';
        uiContainer.appendChild(canvasContainer);
        
        // Create canvas
        this.createCanvas(canvasContainer);
        
        // Create AI panel (initially hidden)
        const aiPanel = document.createElement('div');
        aiPanel.className = 'ai-panel';
        aiPanel.style.display = 'none';
        uiContainer.appendChild(aiPanel);
        
        // AI panel header
        const aiPanelHeader = document.createElement('div');
        aiPanelHeader.className = 'panel-header';
        aiPanel.appendChild(aiPanelHeader);
        
        const aiPanelTitle = document.createElement('h4');
        aiPanelTitle.textContent = 'AI Image Generation';
        aiPanelHeader.appendChild(aiPanelTitle);
        
        const aiPanelClose = document.createElement('button');
        aiPanelClose.className = 'panel-close';
        aiPanelClose.innerHTML = '&times;';
        aiPanelHeader.appendChild(aiPanelClose);
        
        // AI panel content
        const aiPanelContent = document.createElement('div');
        aiPanelContent.className = 'panel-content';
        aiPanel.appendChild(aiPanelContent);
        
        // AI model selection
        const modelContainer = document.createElement('div');
        modelContainer.className = 'form-group';
        aiPanelContent.appendChild(modelContainer);
        
        const modelLabel = document.createElement('label');
        modelLabel.htmlFor = 'ai-model';
        modelLabel.textContent = 'AI Model';
        modelContainer.appendChild(modelLabel);
        
        const modelSelect = document.createElement('select');
        modelSelect.id = 'ai-model';
        modelSelect.className = 'form-control';
        
        const models = [
            { id: 'stable-diffusion', name: 'Stable Diffusion v2' },
            { id: 'sdxl', name: 'Stable Diffusion XL' },
            { id: 'dalle', name: 'DALL-E 3' },
            { id: 'midjourney', name: 'Midjourney v5' }
        ];
        
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.name;
            
            if (model.id === this.aiModel) {
                option.selected = true;
            }
            
            modelSelect.appendChild(option);
        });
        
        modelContainer.appendChild(modelSelect);
        
        // Prompt input
        const promptContainer = document.createElement('div');
        promptContainer.className = 'form-group';
        aiPanelContent.appendChild(promptContainer);
        
        const promptLabel = document.createElement('label');
        promptLabel.htmlFor = 'prompt-input';
        promptLabel.textContent = 'Prompt';
        promptContainer.appendChild(promptLabel);
        
        const promptInput = document.createElement('textarea');
        promptInput.id = 'prompt-input';
        promptInput.className = 'form-control';
        promptInput.placeholder = 'Describe what you want to generate...';
        promptInput.rows = 3;
        promptContainer.appendChild(promptInput);
        
        // Negative prompt input
        const negativePromptContainer = document.createElement('div');
        negativePromptContainer.className = 'form-group';
        aiPanelContent.appendChild(negativePromptContainer);
        
        const negativePromptLabel = document.createElement('label');
        negativePromptLabel.htmlFor = 'negative-prompt-input';
        negativePromptLabel.textContent = 'Negative Prompt (Optional)';
        negativePromptContainer.appendChild(negativePromptLabel);
        
        const negativePromptInput = document.createElement('textarea');
        negativePromptInput.id = 'negative-prompt-input';
        negativePromptInput.className = 'form-control';
        negativePromptInput.placeholder = 'What to avoid in the generation...';
        negativePromptInput.rows = 2;
        negativePromptInput.value = this.negativePrompt;
        negativePromptContainer.appendChild(negativePromptInput);
        
        // Style presets
        const presetsContainer = document.createElement('div');
        presetsContainer.className = 'form-group';
        aiPanelContent.appendChild(presetsContainer);
        
        const presetsLabel = document.createElement('label');
        presetsLabel.textContent = 'Style Presets';
        presetsContainer.appendChild(presetsLabel);
        
        const presetList = document.createElement('div');
        presetList.className = 'preset-list';
        presetsContainer.appendChild(presetList);
        
        this.stylePresets.forEach(preset => {
            const presetButton = document.createElement('button');
            presetButton.className = 'preset-button';
            presetButton.textContent = preset.name;
            presetButton.title = preset.prompt;
            
            presetButton.addEventListener('click', () => {
                // Append preset prompt to current prompt
                const currentPrompt = promptInput.value.trim();
                const separator = currentPrompt.length > 0 ? ', ' : '';
                promptInput.value = currentPrompt + separator + preset.prompt;
            });
            
            presetList.appendChild(presetButton);
        });
        
        // Generation strength
        const strengthContainer = document.createElement('div');
        strengthContainer.className = 'form-group';
        aiPanelContent.appendChild(strengthContainer);
        
        const strengthLabel = document.createElement('label');
        strengthLabel.htmlFor = 'strength-slider';
        strengthLabel.textContent = `Generation Strength: ${this.generationStrength.toFixed(2)}`;
        strengthContainer.appendChild(strengthLabel);
        
        const strengthSlider = document.createElement('input');
        strengthSlider.type = 'range';
        strengthSlider.id = 'strength-slider';
        strengthSlider.className = 'form-control';
        strengthSlider.min = '0.1';
        strengthSlider.max = '0.99';
        strengthSlider.step = '0.01';
        strengthSlider.value = this.generationStrength.toString();
        strengthContainer.appendChild(strengthSlider);
        
        // Guidance scale
        const guidanceContainer = document.createElement('div');
        guidanceContainer.className = 'form-group';
        aiPanelContent.appendChild(guidanceContainer);
        
        const guidanceLabel = document.createElement('label');
        guidanceLabel.htmlFor = 'guidance-slider';
        guidanceLabel.textContent = `Guidance Scale: ${this.guidanceScale.toFixed(1)}`;
        guidanceContainer.appendChild(guidanceLabel);
        
        const guidanceSlider = document.createElement('input');
        guidanceSlider.type = 'range';
        guidanceSlider.id = 'guidance-slider';
        guidanceSlider.className = 'form-control';
        guidanceSlider.min = '1';
        guidanceSlider.max = '20';
        guidanceSlider.step = '0.1';
        guidanceSlider.value = this.guidanceScale.toString();
        guidanceContainer.appendChild(guidanceSlider);
        
        // Generation steps
        const stepsContainer = document.createElement('div');
        stepsContainer.className = 'form-group';
        aiPanelContent.appendChild(stepsContainer);
        
        const stepsLabel = document.createElement('label');
        stepsLabel.htmlFor = 'steps-slider';
        stepsLabel.textContent = `Generation Steps: ${this.generationSteps}`;
        stepsContainer.appendChild(stepsLabel);
        
        const stepsSlider = document.createElement('input');
        stepsSlider.type = 'range';
        stepsSlider.id = 'steps-slider';
        stepsSlider.className = 'form-control';
        stepsSlider.min = '10';
        stepsSlider.max = '50';
        stepsSlider.step = '1';
        stepsSlider.value = this.generationSteps.toString();
        stepsContainer.appendChild(stepsSlider);
        
        // Generate button
        const generateContainer = document.createElement('div');
        generateContainer.className = 'form-group';
        aiPanelContent.appendChild(generateContainer);
        
        const generateButton = document.createElement('button');
        generateButton.className = 'generate-button';
        generateButton.innerHTML = '<i class="fas fa-magic"></i> Generate Image';
        generateContainer.appendChild(generateButton);
        
        // Generation status
        const statusContainer = document.createElement('div');
        statusContainer.className = 'generation-status';
        statusContainer.style.display = 'none';
        aiPanelContent.appendChild(statusContainer);
        
        // Create footer
        const footer = document.createElement('div');
        footer.className = 'drawing-footer';
        uiContainer.appendChild(footer);
        
        // Current tool and size indicator
        const toolIndicator = document.createElement('div');
        toolIndicator.className = 'tool-indicator';
        toolIndicator.innerHTML = `<span class="indicator-label">Tool:</span> <span class="indicator-value">${this.currentTool}</span>`;
        footer.appendChild(toolIndicator);
        
        const sizeIndicator = document.createElement('div');
        sizeIndicator.className = 'size-indicator';
        sizeIndicator.innerHTML = `<span class="indicator-label">Size:</span> <span class="indicator-value">${this.brushSize}px</span>`;
        footer.appendChild(sizeIndicator);
        
        // Canvas size indicator
        const canvasSizeIndicator = document.createElement('div');
        canvasSizeIndicator.className = 'canvas-size-indicator';
        canvasSizeIndicator.innerHTML = `<span class="indicator-label">Canvas:</span> <span class="indicator-value">${this.width}×${this.height}</span>`;
        footer.appendChild(canvasSizeIndicator);
        
        // Store UI elements references
        this.elements = {
            container: uiContainer,
            toolbar,
            toolsGroup,
            brushGroup,
            actionsGroup,
            colorPicker,
            sizeSlider,
            sizeValue,
            opacitySlider,
            opacityValue,
            undoButton,
            redoButton,
            clearButton,
            saveButton,
            aiButton,
            aiPanel,
            promptInput,
            negativePromptInput,
            modelSelect,
            strengthSlider,
            strengthLabel,
            guidanceSlider,
            guidanceLabel,
            stepsSlider,
            stepsLabel,
            generateButton,
            statusContainer,
            toolIndicator,
            sizeIndicator
        };
        
        // Add event listeners
        
        // Color picker
        colorPicker.addEventListener('input', () => {
            this.setBrushColor(colorPicker.value);
        });
        
        colorPicker.addEventListener('change', () => {
            this.setBrushColor(colorPicker.value);
        });
        
        // Size slider
        sizeSlider.addEventListener('input', () => {
            const size = parseInt(sizeSlider.value, 10);
            this.setBrushSize(size);
            sizeValue.textContent = size.toString();
            sizeIndicator.querySelector('.indicator-value').textContent = `${size}px`;
        });
        
        // Opacity slider
        opacitySlider.addEventListener('input', () => {
            const opacity = parseFloat(opacitySlider.value);
            this.setOpacity(opacity);
            opacityValue.textContent = Math.round(opacity * 100) + '%';
        });
        
        // Undo button
        undoButton.addEventListener('click', () => {
            this.undo();
            undoButton.disabled = !this.canUndo();
            redoButton.disabled = !this.canRedo();
        });
        
        // Redo button
        redoButton.addEventListener('click', () => {
            this.redo();
            undoButton.disabled = !this.canUndo();
            redoButton.disabled = !this.canRedo();
        });
        
        // Clear button
        clearButton.addEventListener('click', () => {
            if (confirm('Clear the canvas? This cannot be undone.')) {
                this.clearCanvas();
            }
        });
        
        // Save button
        saveButton.addEventListener('click', () => {
            // Create a dropdown menu for save options
            const saveMenu = document.createElement('div');
            saveMenu.className = 'save-menu';
            
            const pngOption = document.createElement('button');
            pngOption.className = 'save-option';
            pngOption.textContent = 'Save as PNG';
            pngOption.addEventListener('click', () => {
                this.downloadImage('neural-drawing', 'png');
                document.body.removeChild(saveMenu);
            });
            saveMenu.appendChild(pngOption);
            
            const jpgOption = document.createElement('button');
            jpgOption.className = 'save-option';
            jpgOption.textContent = 'Save as JPEG';
            jpgOption.addEventListener('click', () => {
                this.downloadImage('neural-drawing', 'jpeg');
                document.body.removeChild(saveMenu);
            });
            saveMenu.appendChild(jpgOption);
            
            const webpOption = document.createElement('button');
            webpOption.className = 'save-option';
            webpOption.textContent = 'Save as WebP';
            webpOption.addEventListener('click', () => {
                this.downloadImage('neural-drawing', 'webp');
                document.body.removeChild(saveMenu);
            });
            saveMenu.appendChild(webpOption);
            
            // Position menu
            const buttonRect = saveButton.getBoundingClientRect();
            saveMenu.style.position = 'absolute';
            saveMenu.style.top = (buttonRect.bottom + window.scrollY) + 'px';
            saveMenu.style.left = (buttonRect.left + window.scrollX) + 'px';
            saveMenu.style.zIndex = '1000';
            
            // Add to document
            document.body.appendChild(saveMenu);
            
            // Close when clicking outside
            const clickOutside = (e) => {
                if (!saveMenu.contains(e.target) && e.target !== saveButton) {
                    document.body.removeChild(saveMenu);
                    document.removeEventListener('click', clickOutside);
                }
            };
            
            // Delay adding click listener to prevent immediate triggering
            setTimeout(() => {
                document.addEventListener('click', clickOutside);
            }, 10);
        });
        
        // AI button
        aiButton.addEventListener('click', () => {
            // Toggle AI panel
            const isVisible = aiPanel.style.display !== 'none';
            aiPanel.style.display = isVisible ? 'none' : 'block';
        });
        
        // AI panel close button
        aiPanelClose.addEventListener('click', () => {
            aiPanel.style.display = 'none';
        });
        
        // Strength slider
        strengthSlider.addEventListener('input', () => {
            this.generationStrength = parseFloat(strengthSlider.value);
            strengthLabel.textContent = `Generation Strength: ${this.generationStrength.toFixed(2)}`;
        });
        
        // Guidance slider
        guidanceSlider.addEventListener('input', () => {
            this.guidanceScale = parseFloat(guidanceSlider.value);
            guidanceLabel.textContent = `Guidance Scale: ${this.guidanceScale.toFixed(1)}`;
        });
        
        // Steps slider
        stepsSlider.addEventListener('input', () => {
            this.generationSteps = parseInt(stepsSlider.value, 10);
            stepsLabel.textContent = `Generation Steps: ${this.generationSteps}`;
        });
        
        // Model select
        modelSelect.addEventListener('change', () => {
            this.aiModel = modelSelect.value;
        });
        
        // Generate button
        generateButton.addEventListener('click', async () => {
            const prompt = promptInput.value.trim();
            if (!prompt) {
                alert('Please enter a prompt for image generation');
                return;
            }
            
            // Update negative prompt
            this.negativePrompt = negativePromptInput.value.trim();
            
            // Show loading state
            generateButton.disabled = true;
            generateButton.textContent = 'Generating...';
            statusContainer.style.display = 'block';
            statusContainer.innerHTML = '<div class="status-spinner"></div><div class="status-text">Generating image, please wait...</div>';
            
            try {
                // Generate image
                await this.generateImageWithAI(prompt, {
                    model: this.aiModel,
                    negativePrompt: this.negativePrompt,
                    strength: this.generationStrength,
                    guidanceScale: this.guidanceScale,
                    steps: this.generationSteps
                });
                
                // Update status
                statusContainer.innerHTML = '<div class="status-success">Image generated successfully!</div>';
                
                // Hide AI panel after short delay
                setTimeout(() => {
                    aiPanel.style.display = 'none';
                    statusContainer.style.display = 'none';
                }, 1500);
            } catch (error) {
                // Show error
                statusContainer.innerHTML = `<div class="status-error">Generation failed: ${error.message}</div>`;
            } finally {
                // Reset button
                generateButton.disabled = false;
                generateButton.innerHTML = '<i class="fas fa-magic"></i> Generate Image';
                
                // Save settings
                this.saveSettings();
            }
        });
        
        // Register event handlers
        
        // History changed event
        this.on('historyChanged', (data) => {
            undoButton.disabled = !data.canUndo;
            redoButton.disabled = !data.canRedo;
        });
        
        // Tool changed event
        this.on('toolChanged', (data) => {
            toolIndicator.querySelector('.indicator-value').textContent = data.tool;
        });
        
        // Add styles
        this.addStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles
     */
    addStyles() {
        const styleId = 'neural-drawing-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .neural-drawing-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .drawing-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .drawing-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .drawing-toolbar {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                padding: 0.75rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
            }
            
            .toolbar-group {
                display: flex;
                gap: 0.5rem;
                padding-right: 1rem;
                border-right: 1px solid var(--border-color, #30363d);
            }
            
            .toolbar-group:last-child {
                border-right: none;
                padding-right: 0;
            }
            
            .tool-button {
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-secondary, #8b949e);
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .tool-button:hover {
                border-color: var(--accent-secondary, #8b5cf6);
                color: var(--text-primary, #f0f6fc);
            }
            
            .tool-button.active {
                background-color: var(--accent-primary, #7c3aed);
                border-color: var(--accent-primary, #7c3aed);
                color: white;
            }
            
            .color-container,
            .size-container,
            .opacity-container {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .control-label {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .color-picker {
                width: 36px;
                height: 36px;
                padding: 0;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                cursor: pointer;
            }
            
            .size-value,
            .opacity-value {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
                text-align: center;
            }
            
            .size-slider,
            .opacity-slider {
                width: 100px;
                margin: 0;
            }
            
            .action-button {
                padding: 0.375rem 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-secondary, #8b949e);
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 0.375rem;
            }
            
            .action-button:hover:not(:disabled) {
                border-color: var(--accent-secondary, #8b5cf6);
                color: var(--text-primary, #f0f6fc);
            }
            
            .action-button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .ai-button {
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .ai-button:hover {
                background-color: var(--accent-hover, #6d28d9);
                color: white;
                border-color: var(--accent-hover, #6d28d9);
            }
            
            .canvas-container {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f5f5f5;
                border-radius: var(--radius-sm, 0.375rem);
                overflow: hidden;
                position: relative;
            }
            
            .neural-drawing-canvas {
                display: block;
                background-color: white;
                max-width: 100%;
                height: auto;
                cursor: crosshair;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            .drawing-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem 0.75rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .indicator-label {
                font-weight: 500;
            }
            
            .ai-panel {
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                margin-top: 1rem;
            }
            
            .panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
            }
            
            .panel-header h4 {
                font-size: 1rem;
                font-weight: 600;
                margin: 0;
            }
            
            .panel-close {
                background: none;
                border: none;
                color: var(--text-secondary, #8b949e);
                font-size: 1.5rem;
                line-height: 1;
                cursor: pointer;
                padding: 0;
            }
            
            .panel-close:hover {
                color: var(--text-primary, #f0f6fc);
            }
            
            .panel-content {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .form-group label {
                font-size: 0.875rem;
                font-weight: 500;
            }
            
            .form-control {
                padding: 0.625rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                width: 100%;
            }
            
            .preset-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .preset-button {
                padding: 0.375rem 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-secondary, #8b949e);
                font-size: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .preset-button:hover {
                border-color: var(--accent-secondary, #8b5cf6);
                color: var(--text-primary, #f0f6fc);
            }
            
            .generate-button {
                padding: 0.75rem 1rem;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
            
            .generate-button:hover:not(:disabled) {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .generate-button:disabled {
                opacity: 0.7;
                cursor: wait;
            }
            
            .generation-status {
                padding: 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius-sm, 0.375rem);
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .status-spinner {
                width: 20px;
                height: 20px;
                border: 2px solid rgba(124, 58, 237, 0.3);
                border-top-color: var(--accent-primary, #7c3aed);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .status-text {
                font-size: 0.875rem;
            }
            
            .status-success {
                color: #10b981;
                font-size: 0.875rem;
            }
            
            .status-error {
                color: #ef4444;
                font-size: 0.875rem;
            }
            
            .save-menu {
                display: flex;
                flex-direction: column;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                overflow: hidden;
            }
            
            .save-option {
                padding: 0.5rem 1rem;
                background: none;
                border: none;
                text-align: left;
                color: var(--text-primary, #f0f6fc);
                cursor: pointer;
            }
            
            .save-option:hover {
                background-color: var(--accent-primary, #7c3aed);
            }
            
            .save-option + .save-option {
                border-top: 1px solid var(--border-color, #30363d);
            }
            
            @media (max-width: 768px) {
                .drawing-toolbar {
                    flex-direction: column;
                    gap: 0.75rem;
                    padding: 0.75rem;
                }
                
                .toolbar-group {
                    flex-wrap: wrap;
                    border-right: none;
                    border-bottom: 1px solid var(--border-color, #30363d);
                    padding-right: 0;
                    padding-bottom: 0.75rem;
                }
                
                .toolbar-group:last-child {
                    border-bottom: none;
                    padding-bottom: 0;
                }
                
                .drawing-footer {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NeuralDrawingCanvas };
} else {
    // Add to global scope for browser usage
    window.NeuralDrawingCanvas = NeuralDrawingCanvas;
}
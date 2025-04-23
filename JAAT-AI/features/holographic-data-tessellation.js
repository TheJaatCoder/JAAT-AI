/**
 * JAAT-AI Holographic Data Tessellation
 * Advanced data visualization and interactive manipulation in 3D space
 */

class HolographicDataTessellation {
    constructor() {
        this.container = null;
        this.canvas = null;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.controls = null;
        this.raycaster = null;
        this.mouse = null;
        this.datasets = {};
        this.visualizations = {};
        this.activeVisualization = null;
        this.frameId = null;
        this.lastUpdateTime = 0;
        this.interactions = [];
        this.settings = {
            rotationSpeed: 0.005,
            cameraDistance: 5,
            backgroundColor: 0x111133,
            highlightColor: 0x88ccff,
            animationDuration: 1000,
            dataPointSize: 0.05,
            maxDataPoints: 5000,
            lodLevels: 3, // Levels of detail
            autoRotate: true,
            renderQuality: 'medium', // low, medium, high
            lightIntensity: 1.2,
            ambientLightIntensity: 0.5,
            shadows: true
        };
        
        // Initialize if auto-init is enabled
        const autoInit = localStorage.getItem('jaat-holographic-auto-init');
        if (autoInit === 'true') {
            this.initialize();
        }
        
        console.log('JAAT-AI Holographic Data Tessellation initialized');
    }
    
    /**
     * Initialize the holographic visualization system
     * @param {HTMLElement} [container] - Container element (will create one if not provided)
     * @returns {boolean} Whether initialization was successful
     */
    initialize(container = null) {
        try {
            // Check for WebGL support
            if (!this.checkWebGLSupport()) {
                console.error('WebGL not supported - holographic visualization disabled');
                return false;
            }
            
            // Set container
            if (container) {
                this.container = container;
            } else {
                // Look for existing container
                const existingContainer = document.getElementById('holographic-container');
                if (existingContainer) {
                    this.container = existingContainer;
                } else {
                    // Create container if needed
                    this.container = document.createElement('div');
                    this.container.id = 'holographic-container';
                    this.container.style.position = 'relative';
                    this.container.style.width = '100%';
                    this.container.style.height = '100%';
                    this.container.style.overflow = 'hidden';
                    
                    // Add to document if possible
                    const featureSection = document.querySelector('.advanced-features-section');
                    if (featureSection) {
                        featureSection.appendChild(this.container);
                    } else {
                        document.body.appendChild(this.container);
                        this.container.style.position = 'fixed';
                        this.container.style.top = '0';
                        this.container.style.left = '0';
                        this.container.style.width = '100vw';
                        this.container.style.height = '100vh';
                        this.container.style.zIndex = '-1';
                        this.container.style.opacity = '0.7';
                    }
                }
            }
            
            // Initialize the visualization system
            this.initRenderer();
            this.initScene();
            this.initCamera();
            this.initControls();
            this.initEvents();
            
            // Add some demo objects if no visualizations exist
            if (Object.keys(this.visualizations).length === 0) {
                this.createDemoVisualization();
            }
            
            // Start animation loop
            this.startAnimationLoop();
            
            return true;
        } catch (error) {
            console.error('Failed to initialize holographic visualization:', error);
            return false;
        }
    }
    
    /**
     * Check for WebGL support
     * @returns {boolean} Whether WebGL is supported
     */
    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(
                window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
            );
        } catch (e) {
            return false;
        }
    }
    
    /**
     * Initialize the WebGL renderer
     */
    initRenderer() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.display = 'block';
        this.container.appendChild(this.canvas);
        
        // Configure renderer
        // In a real implementation, we would initialize a Three.js renderer
        // For this demo, we'll use a 2D canvas renderer that simulates 3D
        this.renderer = {
            domElement: this.canvas,
            context: this.canvas.getContext('2d'),
            render: this.simulateRender.bind(this),
            clear: () => {
                const ctx = this.canvas.getContext('2d');
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },
            setSize: (width, height) => {
                this.canvas.width = width;
                this.canvas.height = height;
            }
        };
        
        // Set initial size
        this.resizeRenderer();
    }
    
    /**
     * Initialize the scene
     */
    initScene() {
        // Create a simulated scene object
        this.scene = {
            children: [],
            add: (object) => {
                this.scene.children.push(object);
            },
            remove: (object) => {
                const index = this.scene.children.indexOf(object);
                if (index !== -1) {
                    this.scene.children.splice(index, 1);
                }
            },
            traverse: (callback) => {
                this.scene.children.forEach(callback);
            }
        };
        
        // Add lighting (simulated)
        this.addLighting();
    }
    
    /**
     * Add lighting to the scene
     */
    addLighting() {
        // Simulate lighting objects
        // In a real implementation, these would be Three.js light objects
        const mainLight = {
            type: 'directional',
            position: { x: 1, y: 1, z: 1 },
            intensity: this.settings.lightIntensity,
            castShadow: this.settings.shadows
        };
        
        const ambientLight = {
            type: 'ambient',
            intensity: this.settings.ambientLightIntensity
        };
        
        // Add to scene
        this.scene.add(mainLight);
        this.scene.add(ambientLight);
    }
    
    /**
     * Initialize the camera
     */
    initCamera() {
        // Create a simulated camera object
        this.camera = {
            position: { x: 0, y: 0, z: this.settings.cameraDistance },
            target: { x: 0, y: 0, z: 0 },
            fieldOfView: 45,
            aspect: this.canvas.width / this.canvas.height,
            near: 0.1,
            far: 1000,
            updateProjectionMatrix: () => {
                this.camera.aspect = this.canvas.width / this.canvas.height;
            }
        };
    }
    
    /**
     * Initialize user controls
     */
    initControls() {
        // Create simulated user controls
        this.controls = {
            update: () => {
                // In a real implementation, this would update orbit controls
                if (this.settings.autoRotate) {
                    this.autoRotateScene();
                }
            },
            enabled: true
        };
        
        // Initialize raycaster and mouse for interaction
        this.raycaster = {
            setFromCamera: (mouse, camera) => {
                // Simulate raycaster setup
            },
            intersectObjects: (objects) => {
                // Simulate ray intersection
                return [];
            }
        };
        
        this.mouse = { x: 0, y: 0 };
    }
    
    /**
     * Initialize event listeners
     */
    initEvents() {
        // Resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Mouse events for interaction
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('click', this.handleClick.bind(this));
        this.canvas.addEventListener('wheel', this.handleScroll.bind(this));
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }
    
    /**
     * Resize the renderer when window size changes
     */
    resizeRenderer() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        // Update renderer size
        this.renderer.setSize(width, height);
        
        // Update camera aspect ratio
        if (this.camera) {
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    }
    
    /**
     * Handle window resize event
     */
    handleResize() {
        this.resizeRenderer();
    }
    
    /**
     * Handle mouse move event
     * @param {MouseEvent} event - Mouse event
     */
    handleMouseMove(event) {
        // Calculate normalized mouse coordinates
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / this.canvas.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / this.canvas.height) * 2 + 1;
        
        // Record interaction
        this.recordInteraction('mousemove', { x: this.mouse.x, y: this.mouse.y });
        
        // Check for hover interactions
        this.checkHoverInteractions();
    }
    
    /**
     * Handle mouse click event
     * @param {MouseEvent} event - Mouse event
     */
    handleClick(event) {
        // Calculate normalized mouse coordinates
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / this.canvas.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / this.canvas.height) * 2 + 1;
        
        // Record interaction
        this.recordInteraction('click', { x: this.mouse.x, y: this.mouse.y });
        
        // Check for click interactions
        this.checkClickInteractions();
    }
    
    /**
     * Handle mouse scroll event
     * @param {WheelEvent} event - Wheel event
     */
    handleScroll(event) {
        // Prevent default scroll behavior
        event.preventDefault();
        
        // Record interaction
        this.recordInteraction('scroll', { delta: Math.sign(event.deltaY) });
        
        // Adjust camera distance
        this.camera.position.z += Math.sign(event.deltaY) * 0.5;
        
        // Clamp camera distance
        this.camera.position.z = Math.max(2, Math.min(20, this.camera.position.z));
    }
    
    /**
     * Handle touch start event
     * @param {TouchEvent} event - Touch event
     */
    handleTouchStart(event) {
        // Prevent default touch behavior
        event.preventDefault();
        
        if (event.touches.length === 1) {
            // Single touch - record as mouse move
            const touch = event.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = ((touch.clientX - rect.left) / this.canvas.width) * 2 - 1;
            this.mouse.y = -((touch.clientY - rect.top) / this.canvas.height) * 2 + 1;
            
            // Record interaction
            this.recordInteraction('touchstart', { x: this.mouse.x, y: this.mouse.y });
        }
    }
    
    /**
     * Handle touch move event
     * @param {TouchEvent} event - Touch event
     */
    handleTouchMove(event) {
        // Prevent default touch behavior
        event.preventDefault();
        
        if (event.touches.length === 1) {
            // Single touch - record as mouse move
            const touch = event.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = ((touch.clientX - rect.left) / this.canvas.width) * 2 - 1;
            this.mouse.y = -((touch.clientY - rect.top) / this.canvas.height) * 2 + 1;
            
            // Record interaction
            this.recordInteraction('touchmove', { x: this.mouse.x, y: this.mouse.y });
        }
    }
    
    /**
     * Handle touch end event
     * @param {TouchEvent} event - Touch event
     */
    handleTouchEnd(event) {
        // Prevent default touch behavior
        event.preventDefault();
        
        // Record interaction
        this.recordInteraction('touchend', {});
        
        // Simulate click
        this.checkClickInteractions();
    }
    
    /**
     * Check for hover interactions with objects
     */
    checkHoverInteractions() {
        // In a real implementation, we would use the raycaster
        // For this demo, we'll just simulate hover effects
        
        // Trigger hover event
        this.dispatchEvent('hover', { 
            position: { x: this.mouse.x, y: this.mouse.y }
        });
    }
    
    /**
     * Check for click interactions with objects
     */
    checkClickInteractions() {
        // In a real implementation, we would use the raycaster
        // For this demo, we'll just simulate click effects
        
        // Trigger click event
        this.dispatchEvent('objectClick', { 
            position: { x: this.mouse.x, y: this.mouse.y }
        });
    }
    
    /**
     * Record user interaction
     * @param {string} type - Type of interaction
     * @param {Object} data - Interaction data
     */
    recordInteraction(type, data) {
        this.interactions.push({
            type,
            data,
            timestamp: Date.now()
        });
        
        // Limit array size
        if (this.interactions.length > 100) {
            this.interactions.shift();
        }
    }
    
    /**
     * Start the animation loop
     */
    startAnimationLoop() {
        // Cancel any existing animation frame
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
        }
        
        // Start new animation loop
        const animate = () => {
            this.frameId = requestAnimationFrame(animate);
            this.update();
            this.render();
        };
        
        animate();
    }
    
    /**
     * Stop the animation loop
     */
    stopAnimationLoop() {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }
    
    /**
     * Update the scene (called every frame)
     */
    update() {
        // Update controls
        if (this.controls) {
            this.controls.update();
        }
        
        // Update any active animations
        this.updateAnimations();
        
        // Update any active visualization
        if (this.activeVisualization && this.visualizations[this.activeVisualization]) {
            const viz = this.visualizations[this.activeVisualization];
            if (viz.update) {
                viz.update();
            }
        }
    }
    
    /**
     * Render the scene (called every frame)
     */
    render() {
        // In a real implementation, this would use Three.js renderer
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    /**
     * Simulate rendering for demo purposes
     * This is a simple 2D canvas renderer that simulates 3D objects
     */
    simulateRender() {
        const ctx = this.renderer.context;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Convert background color to RGB
        const bgColor = this.settings.backgroundColor;
        const r = (bgColor >> 16) & 255;
        const g = (bgColor >> 8) & 255;
        const b = bgColor & 255;
        
        // Fill background
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid for reference
        this.drawGrid(ctx, width, height);
        
        // Render all objects in the scene
        if (this.activeVisualization && this.visualizations[this.activeVisualization]) {
            const viz = this.visualizations[this.activeVisualization];
            if (viz.objects) {
                this.renderObjects(ctx, viz.objects, width, height);
            }
        }
    }
    
    /**
     * Draw a grid for reference
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     */
    drawGrid(ctx, width, height) {
        const gridSize = 50;
        const centerX = width / 2;
        const centerY = height / 2;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        // Draw horizontal grid lines
        for (let y = centerY % gridSize; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw vertical grid lines
        for (let x = centerX % gridSize; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Draw coordinate axes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();
    }
    
    /**
     * Render 3D objects on 2D canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Array} objects - Objects to render
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     */
    renderObjects(ctx, objects, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const scale = Math.min(width, height) / 10;
        
        // Sort objects by z-position for correct rendering order
        const sortedObjects = [...objects].sort((a, b) => {
            return (b.position.z || 0) - (a.position.z || 0);
        });
        
        // Render each object
        sortedObjects.forEach(object => {
            // Skip if object is not visible
            if (object.visible === false) return;
            
            // Calculate screen position
            const screenX = centerX + (object.position.x || 0) * scale;
            const screenY = centerY - (object.position.y || 0) * scale; // Invert Y for screen coordinates
            
            // Calculate size based on z-position
            const zFactor = 5 / (5 + (object.position.z || 0));
            const size = (object.size || this.settings.dataPointSize) * scale * zFactor;
            
            // Determine object color
            const color = object.color || '#ffffff';
            
            // Determine object transparency
            const opacity = object.opacity !== undefined ? object.opacity : 1;
            
            // Draw based on object type
            switch (object.shape || 'sphere') {
                case 'sphere':
                    this.drawSphere(ctx, screenX, screenY, size, color, opacity);
                    break;
                    
                case 'cube':
                    this.drawCube(ctx, screenX, screenY, size, color, opacity);
                    break;
                    
                case 'plane':
                    this.drawPlane(ctx, screenX, screenY, size * 2, size * 2, color, opacity);
                    break;
                    
                case 'line':
                    if (object.target) {
                        const targetScreenX = centerX + (object.target.x || 0) * scale;
                        const targetScreenY = centerY - (object.target.y || 0) * scale;
                        this.drawLine(ctx, screenX, screenY, targetScreenX, targetScreenY, color, opacity, object.lineWidth);
                    }
                    break;
                    
                case 'text':
                    this.drawText(ctx, screenX, screenY, object.text || '', color, opacity);
                    break;
                    
                default:
                    this.drawSphere(ctx, screenX, screenY, size, color, opacity);
            }
        });
    }
    
    /**
     * Draw a sphere
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} size - Sphere size
     * @param {string} color - Sphere color
     * @param {number} opacity - Sphere opacity
     */
    drawSphere(ctx, x, y, size, color, opacity) {
        ctx.globalAlpha = opacity;
        
        // Outer circle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Highlight
        ctx.beginPath();
        ctx.arc(x - size * 0.3, y - size * 0.3, size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
        
        ctx.globalAlpha = 1;
    }
    
    /**
     * Draw a cube
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} size - Cube size
     * @param {string} color - Cube color
     * @param {number} opacity - Cube opacity
     */
    drawCube(ctx, x, y, size, color, opacity) {
        ctx.globalAlpha = opacity;
        
        // Make slightly smaller for visual balance
        size *= 0.8;
        
        // Calculate corner offset
        const offset = size * 0.3;
        
        // Main square
        ctx.fillStyle = color;
        ctx.fillRect(x - size, y - size, size * 2, size * 2);
        
        // Top face
        ctx.beginPath();
        ctx.moveTo(x - size, y - size);
        ctx.lineTo(x - size + offset, y - size - offset);
        ctx.lineTo(x + size + offset, y - size - offset);
        ctx.lineTo(x + size, y - size);
        ctx.closePath();
        ctx.fillStyle = this.lightenColor(color, 30);
        ctx.fill();
        
        // Right face
        ctx.beginPath();
        ctx.moveTo(x + size, y - size);
        ctx.lineTo(x + size + offset, y - size - offset);
        ctx.lineTo(x + size + offset, y + size - offset);
        ctx.lineTo(x + size, y + size);
        ctx.closePath();
        ctx.fillStyle = this.lightenColor(color, 10);
        ctx.fill();
        
        ctx.globalAlpha = 1;
    }
    
    /**
     * Draw a plane
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} width - Plane width
     * @param {number} height - Plane height
     * @param {string} color - Plane color
     * @param {number} opacity - Plane opacity
     */
    drawPlane(ctx, x, y, width, height, color, opacity) {
        ctx.globalAlpha = opacity;
        
        // Draw the plane as a simple rectangle
        ctx.fillStyle = color;
        ctx.fillRect(x - width / 2, y - height / 2, width, height);
        
        // Add a subtle border
        ctx.strokeStyle = this.lightenColor(color, 20);
        ctx.lineWidth = 1;
        ctx.strokeRect(x - width / 2, y - height / 2, width, height);
        
        ctx.globalAlpha = 1;
    }
    
    /**
     * Draw a line
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x1 - Start X position
     * @param {number} y1 - Start Y position
     * @param {number} x2 - End X position
     * @param {number} y2 - End Y position
     * @param {string} color - Line color
     * @param {number} opacity - Line opacity
     * @param {number} [width=1] - Line width
     */
    drawLine(ctx, x1, y1, x2, y2, color, opacity, width = 1) {
        ctx.globalAlpha = opacity;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        
        ctx.globalAlpha = 1;
    }
    
    /**
     * Draw text
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {string} text - Text to draw
     * @param {string} color - Text color
     * @param {number} opacity - Text opacity
     */
    drawText(ctx, x, y, text, color, opacity) {
        ctx.globalAlpha = opacity;
        
        ctx.font = '12px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
        
        ctx.globalAlpha = 1;
    }
    
    /**
     * Lighten a color by a percentage
     * @param {string} color - Color to lighten (hex or rgb)
     * @param {number} percent - Percentage to lighten
     * @returns {string} Lightened color
     */
    lightenColor(color, percent) {
        // Convert hex to rgb if needed
        if (color.startsWith('#')) {
            const r = parseInt(color.substr(1, 2), 16);
            const g = parseInt(color.substr(3, 2), 16);
            const b = parseInt(color.substr(5, 2), 16);
            return this.lightenRgb(r, g, b, percent);
        }
        
        // Parse rgb string
        if (color.startsWith('rgb')) {
            const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (match) {
                const r = parseInt(match[1], 10);
                const g = parseInt(match[2], 10);
                const b = parseInt(match[3], 10);
                return this.lightenRgb(r, g, b, percent);
            }
        }
        
        return color;
    }
    
    /**
     * Lighten RGB values by a percentage
     * @param {number} r - Red value
     * @param {number} g - Green value
     * @param {number} b - Blue value
     * @param {number} percent - Percentage to lighten
     * @returns {string} Lightened RGB color
     */
    lightenRgb(r, g, b, percent) {
        const amount = 255 * (percent / 100);
        const newR = Math.min(255, r + amount);
        const newG = Math.min(255, g + amount);
        const newB = Math.min(255, b + amount);
        return `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)})`;
    }
    
    /**
     * Auto-rotate the scene
     */
    autoRotateScene() {
        // In a real implementation, this would rotate the camera or scene
        // For this demo, we'll just update the object positions when rendering
        
        if (this.activeVisualization && this.visualizations[this.activeVisualization]) {
            const viz = this.visualizations[this.activeVisualization];
            if (viz.objects) {
                const time = Date.now() * 0.001; // Convert to seconds
                const rotationSpeed = this.settings.rotationSpeed;
                
                viz.objects.forEach(obj => {
                    if (obj.autoRotate !== false) {
                        // Store original position if not already stored
                        if (!obj.originalPosition) {
                            obj.originalPosition = {
                                x: obj.position.x || 0,
                                y: obj.position.y || 0,
                                z: obj.position.z || 0
                            };
                        }
                        
                        // Calculate rotation
                        const distance = Math.sqrt(
                            obj.originalPosition.x * obj.originalPosition.x +
                            obj.originalPosition.z * obj.originalPosition.z
                        );
                        
                        if (distance > 0.1) {
                            const angle = time * rotationSpeed;
                            obj.position.x = Math.cos(angle) * distance;
                            obj.position.z = Math.sin(angle) * distance;
                        }
                    }
                });
            }
        }
    }
    
    /**
     * Update animations
     */
    updateAnimations() {
        // In a real implementation, this would update TWEEN animations
        // For this demo, we'll just simulate simple animations
        
        const now = Date.now();
        const elapsed = now - this.lastUpdateTime;
        
        if (elapsed > 0) {
            this.lastUpdateTime = now;
            
            // Update any animated properties
            if (this.activeVisualization && this.visualizations[this.activeVisualization]) {
                const viz = this.visualizations[this.activeVisualization];
                if (viz.objects) {
                    viz.objects.forEach(obj => {
                        // Update any animation properties
                        if (obj.animation) {
                            this.updateObjectAnimation(obj, elapsed);
                        }
                    });
                }
            }
        }
    }
    
    /**
     * Update object animation
     * @param {Object} obj - Object to animate
     * @param {number} elapsed - Elapsed time in ms
     */
    updateObjectAnimation(obj, elapsed) {
        if (!obj.animation) return;
        
        // Update animation progress
        obj.animation.progress = (obj.animation.progress || 0) + elapsed / obj.animation.duration;
        
        // If animation completed
        if (obj.animation.progress >= 1) {
            // Apply final values
            Object.assign(obj, obj.animation.to);
            
            // Handle completion
            if (obj.animation.onComplete) {
                obj.animation.onComplete();
            }
            
            // Check if animation should repeat
            if (obj.animation.repeat) {
                obj.animation.progress = 0;
                
                // Swap to/from for ping-pong effect if yoyo is true
                if (obj.animation.yoyo) {
                    const temp = obj.animation.to;
                    obj.animation.to = obj.animation.from;
                    obj.animation.from = temp;
                }
            } else {
                // Remove animation
                delete obj.animation;
                return;
            }
        }
        
        // Interpolate values
        const t = obj.animation.progress;
        const easedT = this.applyEasing(t, obj.animation.easing || 'easeOutQuad');
        
        // Apply interpolated values
        Object.keys(obj.animation.to).forEach(key => {
            if (typeof obj.animation.to[key] === 'number') {
                const from = obj.animation.from[key] || 0;
                const to = obj.animation.to[key];
                
                if (key === 'color') {
                    // Handle color interpolation
                    obj[key] = this.interpolateColor(from, to, easedT);
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    // Handle nested properties (e.g., position.x)
                    const parts = key.split('.');
                    let target = obj;
                    
                    for (let i = 0; i < parts.length - 1; i++) {
                        target = target[parts[i]];
                    }
                    
                    const lastPart = parts[parts.length - 1];
                    target[lastPart] = from + (to - from) * easedT;
                } else {
                    // Simple property
                    obj[key] = from + (to - from) * easedT;
                }
            }
        });
    }
    
    /**
     * Apply easing function
     * @param {number} t - Time progress (0-1)
     * @param {string} easing - Easing function name
     * @returns {number} Eased value
     */
    applyEasing(t, easing) {
        switch (easing) {
            case 'linear':
                return t;
                
            case 'easeInQuad':
                return t * t;
                
            case 'easeOutQuad':
                return t * (2 - t);
                
            case 'easeInOutQuad':
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                
            case 'easeInCubic':
                return t * t * t;
                
            case 'easeOutCubic':
                return (--t) * t * t + 1;
                
            case 'easeInOutCubic':
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                
            case 'easeInElastic':
                return (t === 0) ? 0 : (t === 1) ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
                
            case 'easeOutElastic':
                return (t === 0) ? 0 : (t === 1) ? 1 : Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
                
            default:
                return t;
        }
    }
    
    /**
     * Interpolate between two colors
     * @param {string|number} color1 - First color (hex or rgb)
     * @param {string|number} color2 - Second color (hex or rgb)
     * @param {number} t - Interpolation factor (0-1)
     * @returns {string} Interpolated color
     */
    interpolateColor(color1, color2, t) {
        // Handle numeric colors (hex numbers)
        if (typeof color1 === 'number' && typeof color2 === 'number') {
            const r1 = (color1 >> 16) & 255;
            const g1 = (color1 >> 8) & 255;
            const b1 = color1 & 255;
            
            const r2 = (color2 >> 16) & 255;
            const g2 = (color2 >> 8) & 255;
            const b2 = color2 & 255;
            
            const r = Math.round(r1 + (r2 - r1) * t);
            const g = Math.round(g1 + (g2 - g1) * t);
            const b = Math.round(b1 + (b2 - b1) * t);
            
            return (r << 16) | (g << 8) | b;
        }
        
        // Handle string colors
        return color1; // Simplified for demo
    }
    
    /**
     * Create a simple demo visualization
     */
    createDemoVisualization() {
        // Create a basic dataset
        this.datasets['demo'] = this.createDemoDataset();
        
        // Create a visualization for the dataset
        this.createVisualization('demo', 'scatter3d', {
            dataset: 'demo',
            name: 'Demo Visualization',
            description: 'A simple 3D scatter plot demonstration',
            colorScale: {
                type: 'gradient',
                field: 'value',
                min: 0,
                max: 100,
                minColor: 0x0088ff,
                maxColor: 0xff8800
            }
        });
        
        // Set as active visualization
        this.setActiveVisualization('demo');
    }
    
    /**
     * Create a demo dataset
     * @returns {Object} Demo dataset
     */
    createDemoDataset() {
        const data = [];
        
        // Generate some sample data points
        for (let i = 0; i < 100; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const r = 2 + Math.random() * 0.5;
            
            data.push({
                id: `point-${i}`,
                x: r * Math.sin(phi) * Math.cos(theta),
                y: r * Math.sin(phi) * Math.sin(theta),
                z: r * Math.cos(phi),
                value: Math.random() * 100,
                size: 0.05 + Math.random() * 0.1
            });
        }
        
        return {
            id: 'demo',
            name: 'Demo Dataset',
            data,
            metadata: {
                dimensions: ['x', 'y', 'z', 'value', 'size'],
                types: {
                    x: 'number',
                    y: 'number',
                    z: 'number',
                    value: 'number',
                    size: 'number'
                }
            }
        };
    }
    
    /**
     * Create a data visualization
     * @param {string} id - Visualization ID
     * @param {string} type - Visualization type
     * @param {Object} options - Visualization options
     * @returns {boolean} Whether creation was successful
     */
    createVisualization(id, type, options) {
        if (this.visualizations[id]) {
            console.warn(`Visualization with ID ${id} already exists`);
            return false;
        }
        
        // Get the dataset
        const dataset = this.datasets[options.dataset];
        if (!dataset) {
            console.error(`Dataset ${options.dataset} not found`);
            return false;
        }
        
        // Create visualization based on type
        let visualization;
        
        switch (type) {
            case 'scatter3d':
                visualization = this.createScatter3DVisualization(dataset, options);
                break;
                
            case 'network':
                visualization = this.createNetworkVisualization(dataset, options);
                break;
                
            case 'surface':
                visualization = this.createSurfaceVisualization(dataset, options);
                break;
                
            default:
                console.error(`Unknown visualization type: ${type}`);
                return false;
        }
        
        // Store the visualization
        this.visualizations[id] = visualization;
        
        // Trigger event
        this.dispatchEvent('visualizationCreated', { id, type });
        
        return true;
    }
    
    /**
     * Create a 3D scatter plot visualization
     * @param {Object} dataset - Dataset to visualize
     * @param {Object} options - Visualization options
     * @returns {Object} Visualization object
     */
    createScatter3DVisualization(dataset, options) {
        const objects = [];
        
        // Create a visualization object for each data point
        dataset.data.forEach(point => {
            // Get the color based on the color scale
            const color = this.getColorFromScale(point.value, options.colorScale);
            
            // Create an object for the point
            objects.push({
                id: point.id,
                position: {
                    x: point.x,
                    y: point.y,
                    z: point.z
                },
                shape: 'sphere',
                size: point.size || this.settings.dataPointSize,
                color,
                opacity: 0.8,
                data: point,
                autoRotate: true
            });
        });
        
        // Add some reference objects
        objects.push({
            id: 'x-axis',
            position: { x: 0, y: 0, z: 0 },
            target: { x: 3, y: 0, z: 0 },
            shape: 'line',
            color: '#ff5555',
            lineWidth: 2,
            opacity: 0.7,
            autoRotate: false
        });
        
        objects.push({
            id: 'y-axis',
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 3, z: 0 },
            shape: 'line',
            color: '#55ff55',
            lineWidth: 2,
            opacity: 0.7,
            autoRotate: false
        });
        
        objects.push({
            id: 'z-axis',
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 3 },
            shape: 'line',
            color: '#5555ff',
            lineWidth: 2,
            opacity: 0.7,
            autoRotate: false
        });
        
        // Create some text labels
        objects.push({
            id: 'x-label',
            position: { x: 3.2, y: 0, z: 0 },
            shape: 'text',
            text: 'X',
            color: '#ff5555',
            opacity: 0.9,
            autoRotate: false
        });
        
        objects.push({
            id: 'y-label',
            position: { x: 0, y: 3.2, z: 0 },
            shape: 'text',
            text: 'Y',
            color: '#55ff55',
            opacity: 0.9,
            autoRotate: false
        });
        
        objects.push({
            id: 'z-label',
            position: { x: 0, y: 0, z: 3.2 },
            shape: 'text',
            text: 'Z',
            color: '#5555ff',
            opacity: 0.9,
            autoRotate: false
        });
        
        // Return the visualization object
        return {
            id: options.id,
            name: options.name || 'Scatter 3D',
            description: options.description || 'A 3D scatter plot visualization',
            type: 'scatter3d',
            dataset: dataset.id,
            objects,
            options,
            update: function() {
                // This function will be called every frame
                // We could update object properties here
            }
        };
    }
    
    /**
     * Create a network visualization
     * @param {Object} dataset - Dataset to visualize
     * @param {Object} options - Visualization options
     * @returns {Object} Visualization object
     */
    createNetworkVisualization(dataset, options) {
        // For demo, return a simple network visualization
        return {
            id: options.id,
            name: options.name || 'Network Visualization',
            description: options.description || 'A network visualization',
            type: 'network',
            dataset: dataset.id,
            objects: [],
            options
        };
    }
    
    /**
     * Create a surface visualization
     * @param {Object} dataset - Dataset to visualize
     * @param {Object} options - Visualization options
     * @returns {Object} Visualization object
     */
    createSurfaceVisualization(dataset, options) {
        // For demo, return a simple surface visualization
        return {
            id: options.id,
            name: options.name || 'Surface Visualization',
            description: options.description || 'A surface visualization',
            type: 'surface',
            dataset: dataset.id,
            objects: [],
            options
        };
    }
    
    /**
     * Get color from a color scale
     * @param {number} value - Value to map
     * @param {Object} scale - Color scale configuration
     * @returns {string} Color as hex string
     */
    getColorFromScale(value, scale) {
        if (!scale) return '#ffffff';
        
        switch (scale.type) {
            case 'gradient': {
                // Map value to range 0-1
                const t = Math.max(0, Math.min(1, (value - scale.min) / (scale.max - scale.min)));
                
                // Extract RGB components
                const r1 = (scale.minColor >> 16) & 255;
                const g1 = (scale.minColor >> 8) & 255;
                const b1 = scale.minColor & 255;
                
                const r2 = (scale.maxColor >> 16) & 255;
                const g2 = (scale.maxColor >> 8) & 255;
                const b2 = scale.maxColor & 255;
                
                // Interpolate
                const r = Math.round(r1 + (r2 - r1) * t);
                const g = Math.round(g1 + (g2 - g1) * t);
                const b = Math.round(b1 + (b2 - b1) * t);
                
                // Convert to hex
                return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            }
                
            case 'categorical': {
                const categories = scale.categories || {};
                return categories[value] || scale.defaultColor || '#ffffff';
            }
                
            default:
                return '#ffffff';
        }
    }
    
    /**
     * Set the active visualization
     * @param {string} id - Visualization ID
     * @returns {boolean} Whether set was successful
     */
    setActiveVisualization(id) {
        if (!this.visualizations[id]) {
            console.error(`Visualization ${id} not found`);
            return false;
        }
        
        this.activeVisualization = id;
        
        // Trigger event
        this.dispatchEvent('visualizationChanged', { id });
        
        return true;
    }
    
    /**
     * Load a dataset from a file or URL
     * @param {string} source - File or URL source
     * @param {string} format - Data format (json, csv, etc.)
     * @param {Object} options - Load options
     * @returns {Promise<string>} Dataset ID
     */
    async loadDataset(source, format, options = {}) {
        try {
            let data;
            
            // In a real implementation, we would load data from the source
            // For this demo, we'll return a fake dataset
            data = this.createDemoDataset().data;
            
            // Create a dataset ID if not provided
            const id = options.id || `dataset-${Date.now()}`;
            
            // Create the dataset object
            this.datasets[id] = {
                id,
                name: options.name || 'Loaded Dataset',
                data,
                metadata: options.metadata || {
                    dimensions: ['x', 'y', 'z', 'value'],
                    types: {
                        x: 'number',
                        y: 'number',
                        z: 'number',
                        value: 'number'
                    }
                },
                source
            };
            
            // Trigger event
            this.dispatchEvent('datasetLoaded', { id });
            
            return id;
        } catch (error) {
            console.error('Failed to load dataset:', error);
            throw error;
        }
    }
    
    /**
     * Transform a dataset
     * @param {string} sourceId - Source dataset ID
     * @param {string} targetId - Target dataset ID
     * @param {Function} transformFn - Transformation function
     * @returns {Promise<string>} Transformed dataset ID
     */
    async transformDataset(sourceId, targetId, transformFn) {
        try {
            // Get source dataset
            const sourceDataset = this.datasets[sourceId];
            if (!sourceDataset) {
                throw new Error(`Source dataset ${sourceId} not found`);
            }
            
            // Apply transformation
            const transformedData = sourceDataset.data.map(transformFn);
            
            // Create the transformed dataset
            this.datasets[targetId] = {
                id: targetId,
                name: `Transformed ${sourceDataset.name}`,
                data: transformedData,
                metadata: { ...sourceDataset.metadata },
                source: sourceDataset.id
            };
            
            // Trigger event
            this.dispatchEvent('datasetTransformed', { sourceId, targetId });
            
            return targetId;
        } catch (error) {
            console.error('Failed to transform dataset:', error);
            throw error;
        }
    }
    
    /**
     * Export a visualization
     * @param {string} id - Visualization ID
     * @param {string} format - Export format (png, json, etc.)
     * @param {Object} options - Export options
     * @returns {Promise<Object>} Export result
     */
    async exportVisualization(id, format, options = {}) {
        try {
            // Get the visualization
            const visualization = this.visualizations[id];
            if (!visualization) {
                throw new Error(`Visualization ${id} not found`);
            }
            
            // Handle different export formats
            switch (format) {
                case 'png': {
                    // Capture the current view as a PNG
                    const dataUrl = this.canvas.toDataURL('image/png');
                    
                    // Create a download link
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = options.filename || `${id}.png`;
                    
                    // Trigger the download
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    return { success: true, format, url: dataUrl };
                }
                
                case 'json': {
                    // Export the visualization configuration
                    const exportData = {
                        id: visualization.id,
                        name: visualization.name,
                        description: visualization.description,
                        type: visualization.type,
                        options: visualization.options,
                        dataset: this.datasets[visualization.dataset]
                    };
                    
                    // Create a JSON blob
                    const blob = new Blob([JSON.stringify(exportData, null, 2)], {type: 'application/json'});
                    const dataUrl = URL.createObjectURL(blob);
                    
                    // Create a download link
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = options.filename || `${id}.json`;
                    
                    // Trigger the download
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Clean up the URL object
                    setTimeout(() => URL.revokeObjectURL(dataUrl), 100);
                    
                    return { success: true, format, data: exportData };
                }
                
                default:
                    throw new Error(`Export format ${format} not supported`);
            }
        } catch (error) {
            console.error('Failed to export visualization:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Animate an object
     * @param {string} objectId - Object ID
     * @param {Object} properties - Properties to animate
     * @param {Object} options - Animation options
     * @returns {boolean} Whether animation was started
     */
    animateObject(objectId, properties, options = {}) {
        if (!this.activeVisualization) return false;
        
        const visualization = this.visualizations[this.activeVisualization];
        if (!visualization || !visualization.objects) return false;
        
        // Find the object
        const obj = visualization.objects.find(o => o.id === objectId);
        if (!obj) {
            console.error(`Object ${objectId} not found in visualization ${this.activeVisualization}`);
            return false;
        }
        
        // Store current properties as the starting point
        const from = {};
        Object.keys(properties).forEach(key => {
            from[key] = obj[key];
        });
        
        // Set up animation
        obj.animation = {
            from,
            to: properties,
            duration: options.duration || this.settings.animationDuration,
            easing: options.easing || 'easeOutQuad',
            progress: 0,
            repeat: options.repeat || false,
            yoyo: options.yoyo || false,
            onComplete: options.onComplete
        };
        
        return true;
    }
    
    /**
     * Highlight an object
     * @param {string} objectId - Object ID
     * @param {boolean} [highlight=true] - Whether to highlight or un-highlight
     * @returns {boolean} Whether highlight was successful
     */
    highlightObject(objectId, highlight = true) {
        if (!this.activeVisualization) return false;
        
        const visualization = this.visualizations[this.activeVisualization];
        if (!visualization || !visualization.objects) return false;
        
        // Find the object
        const obj = visualization.objects.find(o => o.id === objectId);
        if (!obj) {
            console.error(`Object ${objectId} not found in visualization ${this.activeVisualization}`);
            return false;
        }
        
        // Store original color if highlighting
        if (highlight && !obj.originalColor) {
            obj.originalColor = obj.color;
            obj.color = this.settings.highlightColor;
            obj.size = (obj.originalSize || obj.size) * 1.5;
        } 
        // Restore original color if un-highlighting
        else if (!highlight && obj.originalColor) {
            obj.color = obj.originalColor;
            obj.size = obj.originalSize || obj.size;
            delete obj.originalColor;
            delete obj.originalSize;
        }
        
        return true;
    }
    
    /**
     * Dispatch a custom event
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event details
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`jaat.holographic.${eventName}`, { 
            detail,
            bubbles: true
        });
        document.dispatchEvent(event);
    }
}

// Register the feature with JAAT-AI
if (window.JAAT) {
    window.JAAT.registerFeature('holographic-data-tessellation', new HolographicDataTessellation());
}
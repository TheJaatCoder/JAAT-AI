/**
 * JAAT-AI Scale Utility
 * Handles dynamic UI scaling based on viewport size and device
 */

class ScaleUtility {
    constructor() {
        this.initialized = false;
        this.scalableElements = [];
        this.scaleConfig = {
            enabled: true,
            autoApply: true,
            minScale: 0.5,
            maxScale: 1.2,
            defaultElements: [
                '.scale-container',
                '.chat-container',
                '.feature-card',
                '.dashboard-widget',
                '.ai-mode-card'
            ]
        };
    }

    /**
     * Initialize the scale utility
     * @param {Object} config - Scale configuration
     * @returns {ScaleUtility} This instance
     */
    init(config = {}) {
        if (this.initialized) return this;
        
        // Apply custom configuration
        this.scaleConfig = { ...this.scaleConfig, ...config };
        
        // Wait for viewport helper to be available
        this.waitForViewportHelper()
            .then(() => {
                // Find and register default scalable elements
                if (this.scaleConfig.autoApply) {
                    this.registerDefaultElements();
                }
                
                // Listen for viewport changes
                document.addEventListener('viewportchange', this.handleViewportChange.bind(this));
                
                this.initialized = true;
                console.log('Scale utility initialized');
                
                // Initial scaling
                this.applyScaling();
            })
            .catch(error => {
                console.error('Failed to initialize scale utility:', error);
            });
        
        return this;
    }

    /**
     * Wait for viewport helper to be available
     * @returns {Promise<void>}
     */
    waitForViewportHelper() {
        return new Promise((resolve, reject) => {
            // Check if viewport helper is already available
            if (window.viewportHelper && window.viewportHelper.initialized) {
                resolve();
                return;
            }
            
            // Set timeout for waiting
            const timeout = setTimeout(() => {
                reject(new Error('Viewport helper not available after timeout'));
            }, 5000); // 5 second timeout
            
            // Check periodically for viewport helper
            const checkInterval = setInterval(() => {
                if (window.viewportHelper && window.viewportHelper.initialized) {
                    clearInterval(checkInterval);
                    clearTimeout(timeout);
                    resolve();
                }
            }, 100);
            
            // Listen for DOMContentLoaded if viewport helper might be initialized later
            document.addEventListener('DOMContentLoaded', () => {
                if (window.viewportHelper && window.viewportHelper.initialized) {
                    clearInterval(checkInterval);
                    clearTimeout(timeout);
                    resolve();
                }
            });
        });
    }

    /**
     * Register default scalable elements
     */
    registerDefaultElements() {
        // Find elements matching default selectors
        this.scaleConfig.defaultElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.registerElement(element);
            });
        });
    }

    /**
     * Register an element for scaling
     * @param {HTMLElement|string} element - Element or selector to register
     * @param {Object} options - Scaling options for this element
     */
    registerElement(element, options = {}) {
        // Get element if selector string is provided
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        
        if (!el) {
            console.warn(`Scale utility: Element not found: ${element}`);
            return;
        }
        
        // Default options
        const defaultOptions = {
            minScale: this.scaleConfig.minScale,
            maxScale: this.scaleConfig.maxScale,
            scaleDown: true,  // Scale down when viewport is smaller
            scaleUp: false,   // Don't scale up when viewport is larger
            preserveWidth: false, // Don't preserve width when scaling
            preserveHeight: false, // Don't preserve height when scaling
            baseScale: 1      // Base scale factor
        };
        
        // Merge with provided options
        const elementOptions = { ...defaultOptions, ...options };
        
        // Add to scalable elements
        this.scalableElements.push({
            element: el,
            options: elementOptions
        });
        
        // Apply scaling to this element
        this.applyElementScaling(el, elementOptions);
    }

    /**
     * Unregister an element from scaling
     * @param {HTMLElement} element - Element to unregister
     */
    unregisterElement(element) {
        const index = this.scalableElements.findIndex(item => item.element === element);
        
        if (index !== -1) {
            // Reset element scaling
            this.resetElementScaling(element);
            
            // Remove from array
            this.scalableElements.splice(index, 1);
        }
    }

    /**
     * Apply scaling to all registered elements
     */
    applyScaling() {
        if (!this.scaleConfig.enabled || !window.viewportHelper) return;
        
        // Get scale factor from viewport helper
        const scaleFactor = window.viewportHelper.getScaleFactor();
        
        // Apply scaling to each registered element
        this.scalableElements.forEach(({ element, options }) => {
            this.applyElementScaling(element, options, scaleFactor);
        });
    }

    /**
     * Apply scaling to a specific element
     * @param {HTMLElement} element - Element to scale
     * @param {Object} options - Scaling options
     * @param {number} scaleFactor - Override scale factor (optional)
     */
    applyElementScaling(element, options, scaleFactor = null) {
        if (!element || !this.scaleConfig.enabled || !window.viewportHelper) return;
        
        // Get scale factor from viewport helper if not provided
        const factor = scaleFactor || window.viewportHelper.getScaleFactor();
        
        // Determine if we should scale
        const shouldScaleDown = options.scaleDown && factor < 1;
        const shouldScaleUp = options.scaleUp && factor > 1;
        
        if (shouldScaleDown || shouldScaleUp) {
            // Calculate element scale
            let elementScale = factor * options.baseScale;
            
            // Clamp to min/max scale
            elementScale = Math.max(options.minScale, Math.min(options.maxScale, elementScale));
            
            // Apply scale transform
            element.style.transform = `scale(${elementScale})`;
            
            // Set transform origin
            element.style.transformOrigin = 'center center';
            
            // Handle dimensions preservation
            if (options.preserveWidth) {
                element.style.width = `${100 / elementScale}%`;
            }
            
            if (options.preserveHeight) {
                element.style.height = `${100 / elementScale}%`;
            }
            
            // Add scaled class
            element.classList.add('scaled');
        } else {
            // Reset scaling
            this.resetElementScaling(element);
        }
    }

    /**
     * Reset scaling for a specific element
     * @param {HTMLElement} element - Element to reset
     */
    resetElementScaling(element) {
        if (!element) return;
        
        // Reset transform
        element.style.transform = '';
        element.style.transformOrigin = '';
        
        // Reset preserved dimensions
        element.style.width = '';
        element.style.height = '';
        
        // Remove scaled class
        element.classList.remove('scaled');
    }

    /**
     * Handle viewport change event
     * @param {Event} event - Viewport change event
     */
    handleViewportChange(event) {
        // Apply scaling on viewport change
        this.applyScaling();
    }

    /**
     * Enable or disable scaling
     * @param {boolean} enabled - Whether scaling is enabled
     */
    setEnabled(enabled) {
        this.scaleConfig.enabled = enabled;
        
        if (enabled) {
            // Apply scaling when enabled
            this.applyScaling();
        } else {
            // Reset all elements when disabled
            this.scalableElements.forEach(({ element }) => {
                this.resetElementScaling(element);
            });
        }
    }

    /**
     * Get all registered scalable elements
     * @returns {Array} Array of registered elements and their options
     */
    getScalableElements() {
        return this.scalableElements;
    }

    /**
     * Manually trigger scaling recalculation
     */
    refresh() {
        this.applyScaling();
    }

    /**
     * Change the scale configuration
     * @param {Object} config - New scale configuration
     */
    updateConfig(config) {
        this.scaleConfig = { ...this.scaleConfig, ...config };
        this.refresh();
    }

    /**
     * Create a new scalable container element
     * @param {string} content - HTML content for the container
     * @param {Object} options - Container and scaling options
     * @returns {HTMLElement} The created container element
     */
    createScalableContainer(content, options = {}) {
        // Default container options
        const defaultContainerOptions = {
            className: 'scale-container',
            parentSelector: 'body',
            styles: {}
        };
        
        // Merge with provided options
        const containerOptions = { ...defaultContainerOptions, ...options };
        
        // Create container element
        const container = document.createElement('div');
        container.className = containerOptions.className;
        container.innerHTML = content;
        
        // Apply custom styles
        Object.entries(containerOptions.styles).forEach(([property, value]) => {
            container.style[property] = value;
        });
        
        // Append to parent
        const parent = document.querySelector(containerOptions.parentSelector) || document.body;
        parent.appendChild(container);
        
        // Register for scaling if required
        if (containerOptions.scale !== false) {
            this.registerElement(container, containerOptions.scaleOptions || {});
        }
        
        return container;
    }
}

// Create instance if running in browser
if (typeof window !== 'undefined') {
    window.scaleUtility = new ScaleUtility();
    
    // Initialize on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        window.scaleUtility.init();
    });
}
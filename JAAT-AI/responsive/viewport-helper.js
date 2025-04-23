/**
 * JAAT-AI Viewport Helper
 * Detects device type, screen size, orientation and sets appropriate classes
 * Provides utilities for responsive design
 */

class ViewportHelper {
    constructor() {
        // Viewport breakpoints (in pixels)
        this.breakpoints = {
            mobile: { max: 767 },
            tablet: { min: 768, max: 991 },
            desktop: { min: 992, max: 1199 },
            largeDesktop: { min: 1200, max: 1599 },
            xlDesktop: { min: 1600 }
        };
        
        // Device classes
        this.deviceClasses = {
            mobile: 'device-mobile',
            tablet: 'device-tablet',
            desktop: 'device-desktop',
            largeDesktop: 'device-large-desktop',
            xlDesktop: 'device-xl-desktop'
        };
        
        // Orientation classes
        this.orientationClasses = {
            portrait: 'orientation-portrait',
            landscape: 'orientation-landscape'
        };
        
        // Scale classes (for zoomed viewports)
        this.scaleClasses = {
            xs: 'scale-xs',     // < 0.6
            sm: 'scale-sm',     // 0.6 - 0.8
            md: 'scale-md',     // 0.8 - 1.0
            lg: 'scale-lg',     // 1.0 - 1.2
            xl: 'scale-xl'      // > 1.2
        };
        
        // Current state
        this.currentDevice = null;
        this.currentOrientation = null;
        this.currentScale = null;
        this.viewportWidth = 0;
        this.viewportHeight = 0;
        this.pixelRatio = 1;
        
        // Bind methods
        this.onResize = this.onResize.bind(this);
        this.onOrientationChange = this.onOrientationChange.bind(this);
    }
    
    /**
     * Initialize the viewport helper
     * @returns {ViewportHelper} This instance
     */
    init() {
        // Check if already initialized
        if (this.initialized) return this;
        
        // Set initial viewport size
        this.updateViewportSize();
        
        // Set initial device, orientation and scale
        this.detectDevice();
        this.detectOrientation();
        this.detectScale();
        
        // Add event listeners
        window.addEventListener('resize', this.onResize);
        window.addEventListener('orientationchange', this.onOrientationChange);
        
        // Special handling for mobile devices to catch orientation changes
        if ('orientation' in window) {
            window.addEventListener('deviceorientation', this.onOrientationChange);
        }
        
        // Custom event for viewport changes
        this.viewportChangeEvent = new CustomEvent('viewportchange', {
            detail: {
                device: this.currentDevice,
                orientation: this.currentOrientation,
                scale: this.currentScale,
                width: this.viewportWidth,
                height: this.viewportHeight
            }
        });
        
        // Mark as initialized
        this.initialized = true;
        
        console.log(`Viewport Helper initialized: ${this.currentDevice}, ${this.currentOrientation}, scale: ${this.currentScale}`);
        return this;
    }
    
    /**
     * Update viewport size measurements
     */
    updateViewportSize() {
        // Get viewport dimensions
        this.viewportWidth = window.innerWidth;
        this.viewportHeight = window.innerHeight;
        this.pixelRatio = window.devicePixelRatio || 1;
        
        // Set CSS variables
        document.documentElement.style.setProperty('--viewport-width', `${this.viewportWidth}px`);
        document.documentElement.style.setProperty('--viewport-height', `${this.viewportHeight}px`);
        document.documentElement.style.setProperty('--pixel-ratio', this.pixelRatio);
    }
    
    /**
     * Detect current device based on viewport width
     */
    detectDevice() {
        const prevDevice = this.currentDevice;
        const width = this.viewportWidth;
        
        // Determine device type based on viewport width
        if (width <= this.breakpoints.mobile.max) {
            this.currentDevice = 'mobile';
        } else if (width >= this.breakpoints.tablet.min && width <= this.breakpoints.tablet.max) {
            this.currentDevice = 'tablet';
        } else if (width >= this.breakpoints.desktop.min && width <= this.breakpoints.desktop.max) {
            this.currentDevice = 'desktop';
        } else if (width >= this.breakpoints.largeDesktop.min && width <= this.breakpoints.largeDesktop.max) {
            this.currentDevice = 'largeDesktop';
        } else if (width >= this.breakpoints.xlDesktop.min) {
            this.currentDevice = 'xlDesktop';
        }
        
        // Update body classes if device changed
        if (prevDevice !== this.currentDevice) {
            // Remove all device classes
            Object.values(this.deviceClasses).forEach(className => {
                document.body.classList.remove(className);
            });
            
            // Add current device class
            document.body.classList.add(this.deviceClasses[this.currentDevice]);
            
            console.log(`Device changed: ${prevDevice} -> ${this.currentDevice}`);
        }
    }
    
    /**
     * Detect current orientation
     */
    detectOrientation() {
        const prevOrientation = this.currentOrientation;
        
        // Determine orientation
        if (this.viewportWidth < this.viewportHeight) {
            this.currentOrientation = 'portrait';
        } else {
            this.currentOrientation = 'landscape';
        }
        
        // Update body classes if orientation changed
        if (prevOrientation !== this.currentOrientation) {
            // Remove all orientation classes
            Object.values(this.orientationClasses).forEach(className => {
                document.body.classList.remove(className);
            });
            
            // Add current orientation class
            document.body.classList.add(this.orientationClasses[this.currentOrientation]);
            
            console.log(`Orientation changed: ${prevOrientation} -> ${this.currentOrientation}`);
        }
    }
    
    /**
     * Detect current scale/zoom level
     */
    detectScale() {
        const prevScale = this.currentScale;
        const ratio = this.pixelRatio;
        
        // Determine scale class based on pixel ratio
        if (ratio < 0.6) {
            this.currentScale = 'xs';
        } else if (ratio >= 0.6 && ratio < 0.8) {
            this.currentScale = 'sm';
        } else if (ratio >= 0.8 && ratio < 1.0) {
            this.currentScale = 'md';
        } else if (ratio >= 1.0 && ratio < 1.2) {
            this.currentScale = 'lg';
        } else {
            this.currentScale = 'xl';
        }
        
        // Update body classes if scale changed
        if (prevScale !== this.currentScale) {
            // Remove all scale classes
            Object.values(this.scaleClasses).forEach(className => {
                document.body.classList.remove(className);
            });
            
            // Add current scale class
            document.body.classList.add(this.scaleClasses[this.currentScale]);
            
            console.log(`Scale changed: ${prevScale} -> ${this.currentScale}`);
        }
    }
    
    /**
     * Handle window resize
     */
    onResize() {
        // Throttle resize events
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        
        this.resizeTimeout = setTimeout(() => {
            // Update viewport size
            this.updateViewportSize();
            
            // Detect device, orientation, and scale
            this.detectDevice();
            this.detectOrientation();
            this.detectScale();
            
            // Dispatch viewport change event
            this.dispatchViewportChangeEvent();
        }, 200);
    }
    
    /**
     * Handle orientation change
     */
    onOrientationChange() {
        // Need a delay to get accurate dimensions after orientation change
        setTimeout(() => {
            // Update viewport size
            this.updateViewportSize();
            
            // Detect device, orientation, and scale
            this.detectDevice();
            this.detectOrientation();
            this.detectScale();
            
            // Dispatch viewport change event
            this.dispatchViewportChangeEvent();
        }, 300);
    }
    
    /**
     * Dispatch viewport change event
     */
    dispatchViewportChangeEvent() {
        // Update event details
        this.viewportChangeEvent.detail = {
            device: this.currentDevice,
            orientation: this.currentOrientation,
            scale: this.currentScale,
            width: this.viewportWidth,
            height: this.viewportHeight
        };
        
        // Dispatch the event
        window.dispatchEvent(this.viewportChangeEvent);
    }
    
    /**
     * Check if viewport is mobile
     * @returns {boolean} Whether viewport is mobile
     */
    isMobile() {
        return this.currentDevice === 'mobile';
    }
    
    /**
     * Check if viewport is tablet
     * @returns {boolean} Whether viewport is tablet
     */
    isTablet() {
        return this.currentDevice === 'tablet';
    }
    
    /**
     * Check if viewport is desktop (any size)
     * @returns {boolean} Whether viewport is desktop (regular, large, or xl)
     */
    isDesktop() {
        return ['desktop', 'largeDesktop', 'xlDesktop'].includes(this.currentDevice);
    }
    
    /**
     * Check if viewport is in portrait mode
     * @returns {boolean} Whether viewport is in portrait orientation
     */
    isPortrait() {
        return this.currentOrientation === 'portrait';
    }
    
    /**
     * Check if viewport is in landscape mode
     * @returns {boolean} Whether viewport is in landscape orientation
     */
    isLandscape() {
        return this.currentOrientation === 'landscape';
    }
    
    /**
     * Check if viewport width is at least a specific size
     * @param {number} width - Width to check
     * @returns {boolean} Whether viewport width is at least the specified width
     */
    isMinWidth(width) {
        return this.viewportWidth >= width;
    }
    
    /**
     * Check if viewport width is at most a specific size
     * @param {number} width - Width to check
     * @returns {boolean} Whether viewport width is at most the specified width
     */
    isMaxWidth(width) {
        return this.viewportWidth <= width;
    }
    
    /**
     * Get current viewport width
     * @returns {number} Current viewport width
     */
    getWidth() {
        return this.viewportWidth;
    }
    
    /**
     * Get current viewport height
     * @returns {number} Current viewport height
     */
    getHeight() {
        return this.viewportHeight;
    }
    
    /**
     * Get current device pixel ratio
     * @returns {number} Current device pixel ratio
     */
    getPixelRatio() {
        return this.pixelRatio;
    }
    
    /**
     * Get current device type
     * @returns {string} Current device type
     */
    getDevice() {
        return this.currentDevice;
    }
    
    /**
     * Get current orientation
     * @returns {string} Current orientation
     */
    getOrientation() {
        return this.currentOrientation;
    }
    
    /**
     * Get all current viewport information
     * @returns {Object} Object with all viewport information
     */
    getViewportInfo() {
        return {
            device: this.currentDevice,
            orientation: this.currentOrientation,
            scale: this.currentScale,
            width: this.viewportWidth,
            height: this.viewportHeight,
            pixelRatio: this.pixelRatio
        };
    }
}

// Create global instance
const viewportHelper = new ViewportHelper();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    viewportHelper.init();
});

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ViewportHelper, viewportHelper };
} else {
    // Expose to window
    window.viewportHelper = viewportHelper;
}
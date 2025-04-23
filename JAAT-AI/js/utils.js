/**
 * JAAT-AI Utilities
 * General utility functions for the application
 */

class Utils {
    constructor() {
        // Cache for expensive operations
        this.cache = new Map();
        
        // Constants
        this.constants = {
            MAX_CACHE_SIZE: 100,
            CACHE_EXPIRY: 1000 * 60 * 60, // 1 hour
            DATE_FORMAT: 'YYYY-MM-DD',
            TIME_FORMAT: 'HH:mm:ss',
            FILE_SIZE_UNITS: ['B', 'KB', 'MB', 'GB', 'TB'],
            DEFAULT_TIMEOUT: 30000, // 30 seconds
            MAX_RETRIES: 3,
            RETRY_DELAY: 1000, // 1 second
            DEBOUNCE_DELAY: 300 // 300ms
        };
        
        // Currently active timers
        this.timers = {
            debounce: new Map(),
            throttle: new Map(),
            interval: new Map(),
            timeout: new Map()
        };
    }

    /**
     * Generate a UUID v4
     * @returns {string} Generated UUID
     */
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Generate a random ID of specified length
     * @param {number} length - Length of the ID
     * @returns {string} Generated ID
     */
    generateRandomId(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return result;
    }

    /**
     * Format a date
     * @param {Date|string|number} date - Date to format
     * @param {string} format - Format string (e.g., 'YYYY-MM-DD')
     * @returns {string} Formatted date
     */
    formatDate(date, format = this.constants.DATE_FORMAT) {
        const d = new Date(date);
        
        if (isNaN(d.getTime())) {
            return 'Invalid Date';
        }
        
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        const milliseconds = String(d.getMilliseconds()).padStart(3, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds)
            .replace('SSS', milliseconds);
    }

    /**
     * Format a date relative to now (e.g., "5 minutes ago")
     * @param {Date|string|number} date - Date to format
     * @returns {string} Relative time
     */
    formatRelativeTime(date) {
        const d = new Date(date);
        
        if (isNaN(d.getTime())) {
            return 'Invalid Date';
        }
        
        const now = new Date();
        const diffMs = now - d;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        const diffMonth = Math.floor(diffDay / 30);
        const diffYear = Math.floor(diffDay / 365);
        
        if (diffSec < 5) {
            return 'just now';
        } else if (diffSec < 60) {
            return `${diffSec} second${diffSec === 1 ? '' : 's'} ago`;
        } else if (diffMin < 60) {
            return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
        } else if (diffHour < 24) {
            return `${diffHour} hour${diffHour === 1 ? '' : 's'} ago`;
        } else if (diffDay < 30) {
            return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
        } else if (diffMonth < 12) {
            return `${diffMonth} month${diffMonth === 1 ? '' : 's'} ago`;
        } else {
            return `${diffYear} year${diffYear === 1 ? '' : 's'} ago`;
        }
    }

    /**
     * Format a file size
     * @param {number} bytes - File size in bytes
     * @param {number} decimals - Number of decimal places
     * @returns {string} Formatted file size
     */
    formatFileSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 B';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = this.constants.FILE_SIZE_UNITS;
        
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    /**
     * Truncate a string to a maximum length
     * @param {string} str - String to truncate
     * @param {number} maxLength - Maximum length
     * @param {string} suffix - Suffix to add when truncated
     * @returns {string} Truncated string
     */
    truncateString(str, maxLength = 50, suffix = '...') {
        if (!str || str.length <= maxLength) {
            return str;
        }
        
        return str.substring(0, maxLength - suffix.length) + suffix;
    }

    /**
     * Sanitize a string for safe HTML insertion
     * @param {string} str - String to sanitize
     * @returns {string} Sanitized string
     */
    sanitizeString(str) {
        if (!str) return '';
        
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Debounce a function
     * @param {Function} func - Function to debounce
     * @param {number} delay - Delay in milliseconds
     * @param {string} id - Optional identifier for the function
     * @returns {Function} Debounced function
     */
    debounce(func, delay = this.constants.DEBOUNCE_DELAY, id = null) {
        const timerId = id || func.toString().substring(0, 100);
        
        return (...args) => {
            // Clear previous timer
            if (this.timers.debounce.has(timerId)) {
                clearTimeout(this.timers.debounce.get(timerId));
            }
            
            // Set new timer
            const timer = setTimeout(() => {
                func(...args);
                this.timers.debounce.delete(timerId);
            }, delay);
            
            this.timers.debounce.set(timerId, timer);
        };
    }

    /**
     * Throttle a function
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @param {string} id - Optional identifier for the function
     * @returns {Function} Throttled function
     */
    throttle(func, limit = this.constants.DEBOUNCE_DELAY, id = null) {
        const timerId = id || func.toString().substring(0, 100);
        
        return (...args) => {
            // If not currently throttled, execute and set throttle
            if (!this.timers.throttle.has(timerId)) {
                func(...args);
                
                const timer = setTimeout(() => {
                    this.timers.throttle.delete(timerId);
                }, limit);
                
                this.timers.throttle.set(timerId, timer);
            }
        };
    }

    /**
     * Retry a function multiple times
     * @param {Function} func - Function to retry
     * @param {number} maxRetries - Maximum number of retries
     * @param {number} delay - Delay between retries in milliseconds
     * @returns {Promise<*>} Function result
     */
    async retry(func, maxRetries = this.constants.MAX_RETRIES, delay = this.constants.RETRY_DELAY) {
        let retries = 0;
        let lastError = null;
        
        while (retries < maxRetries) {
            try {
                return await func();
            } catch (error) {
                lastError = error;
                retries++;
                
                if (retries >= maxRetries) {
                    break;
                }
                
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, delay * retries)); // Exponential backoff
            }
        }
        
        throw lastError;
    }

    /**
     * Set a function to run after a delay
     * @param {Function} func - Function to run
     * @param {number} delay - Delay in milliseconds
     * @param {string} id - Optional identifier for the timeout
     * @returns {number} Timeout ID
     */
    setTimeout(func, delay, id = null) {
        const timerId = id || this.generateRandomId();
        
        const timeoutId = setTimeout(() => {
            func();
            this.timers.timeout.delete(timerId);
        }, delay);
        
        this.timers.timeout.set(timerId, timeoutId);
        
        return timerId;
    }

    /**
     * Clear a timeout by ID
     * @param {string} id - Timeout ID
     * @returns {boolean} Whether the timeout was cleared
     */
    clearTimeout(id) {
        if (this.timers.timeout.has(id)) {
            clearTimeout(this.timers.timeout.get(id));
            this.timers.timeout.delete(id);
            return true;
        }
        
        return false;
    }

    /**
     * Set a function to run at regular intervals
     * @param {Function} func - Function to run
     * @param {number} interval - Interval in milliseconds
     * @param {string} id - Optional identifier for the interval
     * @returns {string} Interval ID
     */
    setInterval(func, interval, id = null) {
        const timerId = id || this.generateRandomId();
        
        const intervalId = setInterval(func, interval);
        
        this.timers.interval.set(timerId, intervalId);
        
        return timerId;
    }

    /**
     * Clear an interval by ID
     * @param {string} id - Interval ID
     * @returns {boolean} Whether the interval was cleared
     */
    clearInterval(id) {
        if (this.timers.interval.has(id)) {
            clearInterval(this.timers.interval.get(id));
            this.timers.interval.delete(id);
            return true;
        }
        
        return false;
    }

    /**
     * Clear all timers
     */
    clearAllTimers() {
        // Clear debounce timers
        for (const timerId of this.timers.debounce.values()) {
            clearTimeout(timerId);
        }
        this.timers.debounce.clear();
        
        // Clear throttle timers
        for (const timerId of this.timers.throttle.values()) {
            clearTimeout(timerId);
        }
        this.timers.throttle.clear();
        
        // Clear interval timers
        for (const timerId of this.timers.interval.values()) {
            clearInterval(timerId);
        }
        this.timers.interval.clear();
        
        // Clear timeout timers
        for (const timerId of this.timers.timeout.values()) {
            clearTimeout(timerId);
        }
        this.timers.timeout.clear();
    }

    /**
     * Cache a value with an expiration time
     * @param {string} key - Cache key
     * @param {*} value - Value to cache
     * @param {number} expiry - Expiration time in milliseconds
     */
    setCacheValue(key, value, expiry = this.constants.CACHE_EXPIRY) {
        // If cache is full, remove oldest entry
        if (this.cache.size >= this.constants.MAX_CACHE_SIZE) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        
        this.cache.set(key, {
            value,
            expiry: Date.now() + expiry
        });
    }

    /**
     * Get a cached value
     * @param {string} key - Cache key
     * @returns {*} Cached value or null if not found or expired
     */
    getCacheValue(key) {
        if (!this.cache.has(key)) {
            return null;
        }
        
        const entry = this.cache.get(key);
        
        // Check if expired
        if (Date.now() > entry.expiry) {
            this.cache.delete(key);
            return null;
        }
        
        return entry.value;
    }

    /**
     * Clear all cached values
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Parse URL query parameters
     * @param {string} url - URL to parse
     * @returns {Object} Parsed query parameters
     */
    parseQueryParams(url) {
        const params = {};
        
        if (!url) {
            url = window.location.href;
        }
        
        const queryString = url.split('?')[1];
        
        if (!queryString) {
            return params;
        }
        
        queryString.split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
        
        return params;
    }

    /**
     * Build a URL with query parameters
     * @param {string} baseUrl - Base URL
     * @param {Object} params - Query parameters
     * @returns {string} URL with query parameters
     */
    buildUrl(baseUrl, params = {}) {
        const url = new URL(baseUrl);
        
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value);
            }
        });
        
        return url.toString();
    }

    /**
     * Download a file
     * @param {string} url - File URL
     * @param {string} filename - Filename
     */
    downloadFile(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    /**
     * Download data as a file
     * @param {string} data - File data
     * @param {string} filename - Filename
     * @param {string} mimeType - MIME type
     */
    downloadData(data, filename, mimeType = 'text/plain') {
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        this.downloadFile(url, filename);
        
        // Clean up
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 100);
    }

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Success indicator
     */
    async copyToClipboard(text) {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback for older browsers
                const el = document.createElement('textarea');
                el.value = text;
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                document.body.appendChild(el);
                
                const selected = document.getSelection().rangeCount > 0 ?
                    document.getSelection().getRangeAt(0) : false;
                    
                el.select();
                const success = document.execCommand('copy');
                document.body.removeChild(el);
                
                if (selected) {
                    document.getSelection().removeAllRanges();
                    document.getSelection().addRange(selected);
                }
                
                return success;
            }
        } catch (error) {
            console.error('Failed to copy text to clipboard:', error);
            return false;
        }
    }

    /**
     * Get file extension from filename
     * @param {string} filename - Filename
     * @returns {string} File extension
     */
    getFileExtension(filename) {
        if (!filename) return '';
        
        return filename.split('.').pop().toLowerCase();
    }

    /**
     * Get MIME type from file extension
     * @param {string} extension - File extension
     * @returns {string} MIME type
     */
    getMimeType(extension) {
        const mimeTypes = {
            'txt': 'text/plain',
            'html': 'text/html',
            'css': 'text/css',
            'js': 'text/javascript',
            'json': 'application/json',
            'xml': 'application/xml',
            'pdf': 'application/pdf',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'svg': 'image/svg+xml',
            'webp': 'image/webp',
            'mp3': 'audio/mpeg',
            'mp4': 'video/mp4',
            'webm': 'video/webm',
            'zip': 'application/zip',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'ppt': 'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        };
        
        return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
    }

    /**
     * Escape HTML special characters
     * @param {string} html - HTML string
     * @returns {string} Escaped HTML
     */
    escapeHtml(html) {
        if (!html) return '';
        
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Strip HTML tags from string
     * @param {string} html - HTML string
     * @returns {string} Plain text
     */
    stripHtml(html) {
        if (!html) return '';
        
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    }

    /**
     * Detect if the user is on a mobile device
     * @returns {boolean} Whether the user is on a mobile device
     */
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Detect browser
     * @returns {string} Browser name
     */
    detectBrowser() {
        const userAgent = navigator.userAgent;
        
        if (userAgent.indexOf('Chrome') > -1) {
            return 'Chrome';
        } else if (userAgent.indexOf('Safari') > -1) {
            return 'Safari';
        } else if (userAgent.indexOf('Firefox') > -1) {
            return 'Firefox';
        } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
            return 'Internet Explorer';
        } else if (userAgent.indexOf('Edge') > -1) {
            return 'Edge';
        } else {
            return 'Unknown';
        }
    }

    /**
     * Detect operating system
     * @returns {string} Operating system name
     */
    detectOS() {
        const userAgent = navigator.userAgent;
        
        if (userAgent.indexOf('Win') > -1) {
            return 'Windows';
        } else if (userAgent.indexOf('Mac') > -1) {
            return 'macOS';
        } else if (userAgent.indexOf('Linux') > -1) {
            return 'Linux';
        } else if (userAgent.indexOf('Android') > -1) {
            return 'Android';
        } else if (userAgent.indexOf('iOS') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
            return 'iOS';
        } else {
            return 'Unknown';
        }
    }

    /**
     * Get browser language
     * @returns {string} Browser language
     */
    getBrowserLanguage() {
        return navigator.language || 'en-US';
    }

    /**
     * Check if dark mode is enabled
     * @returns {boolean} Whether dark mode is enabled
     */
    isDarkModeEnabled() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    /**
     * Check if reduced motion preference is enabled
     * @returns {boolean} Whether reduced motion is enabled
     */
    isReducedMotionEnabled() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Wait for a specified amount of time
     * @param {number} ms - Time to wait in milliseconds
     * @returns {Promise<void>} Promise that resolves after the specified time
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Deep clone an object
     * @param {*} obj - Object to clone
     * @returns {*} Cloned object
     */
    deepClone(obj) {
        // Handle primitive types, null, and undefined
        if (obj === null || obj === undefined || typeof obj !== 'object') {
            return obj;
        }
        
        // Handle Date
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        
        // Handle Array
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepClone(item));
        }
        
        // Handle Object
        if (obj instanceof Object) {
            const copy = {};
            Object.keys(obj).forEach(key => {
                copy[key] = this.deepClone(obj[key]);
            });
            return copy;
        }
        
        // Fallback for unknown types
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * Deep merge two objects
     * @param {Object} target - Target object
     * @param {Object} source - Source object
     * @returns {Object} Merged object
     */
    deepMerge(target, source) {
        // Make sure both inputs are objects
        target = typeof target === 'object' ? target : {};
        source = typeof source === 'object' ? source : {};
        
        const result = this.deepClone(target);
        
        for (const key in source) {
            // Skip inherited properties
            if (!Object.prototype.hasOwnProperty.call(source, key)) {
                continue;
            }
            
            // If property exists in both and both are objects, recursively merge
            if (key in result && typeof result[key] === 'object' && typeof source[key] === 'object') {
                result[key] = this.deepMerge(result[key], source[key]);
            } else {
                // Otherwise, just copy the property
                result[key] = this.deepClone(source[key]);
            }
        }
        
        return result;
    }

    /**
     * Find the index of an object in an array by property value
     * @param {Array} array - Array to search
     * @param {string} property - Property name
     * @param {*} value - Property value
     * @returns {number} Index of the matching object, or -1 if not found
     */
    findIndexByProperty(array, property, value) {
        if (!Array.isArray(array)) {
            return -1;
        }
        
        return array.findIndex(item => item[property] === value);
    }

    /**
     * Group array items by a property
     * @param {Array} array - Array to group
     * @param {string} property - Property to group by
     * @returns {Object} Grouped items
     */
    groupBy(array, property) {
        if (!Array.isArray(array)) {
            return {};
        }
        
        return array.reduce((result, item) => {
            const key = item[property];
            
            if (!result[key]) {
                result[key] = [];
            }
            
            result[key].push(item);
            
            return result;
        }, {});
    }

    /**
     * Sort array by property
     * @param {Array} array - Array to sort
     * @param {string} property - Property to sort by
     * @param {boolean} ascending - Sort in ascending order
     * @returns {Array} Sorted array
     */
    sortByProperty(array, property, ascending = true) {
        if (!Array.isArray(array)) {
            return [];
        }
        
        const sorted = [...array].sort((a, b) => {
            // Handle undefined or null values
            if (a[property] === undefined || a[property] === null) {
                return ascending ? -1 : 1;
            }
            
            if (b[property] === undefined || b[property] === null) {
                return ascending ? 1 : -1;
            }
            
            // Sort by property
            if (a[property] < b[property]) {
                return ascending ? -1 : 1;
            }
            
            if (a[property] > b[property]) {
                return ascending ? 1 : -1;
            }
            
            return 0;
        });
        
        return sorted;
    }

    /**
     * Get a random element from an array
     * @param {Array} array - Array to get random element from
     * @returns {*} Random element
     */
    getRandomElement(array) {
        if (!Array.isArray(array) || array.length === 0) {
            return null;
        }
        
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Get object size in bytes (approximate)
     * @param {*} obj - Object to measure
     * @returns {number} Size in bytes
     */
    getObjectSize(obj) {
        const str = JSON.stringify(obj);
        
        // Convert string to bytes
        const bytes = new TextEncoder().encode(str).length;
        
        return bytes;
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} Whether the email is valid
     */
    isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Get domain from URL
     * @param {string} url - URL
     * @returns {string} Domain
     */
    getDomain(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch (e) {
            // If invalid URL, try to extract domain with regex
            const domainMatch = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/);
            return domainMatch ? domainMatch[1] : '';
        }
    }

    /**
     * Get platform information
     * @returns {Object} Platform information
     */
    getPlatformInfo() {
        return {
            browser: this.detectBrowser(),
            os: this.detectOS(),
            language: this.getBrowserLanguage(),
            isMobile: this.isMobileDevice(),
            isDarkMode: this.isDarkModeEnabled(),
            isReducedMotion: this.isReducedMotionEnabled(),
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio || 1
        };
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils };
}
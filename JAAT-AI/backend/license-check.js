/**
 * JAAT-AI License Check System
 * Validates and manages license keys for features and access control
 */

class LicenseCheck {
    constructor() {
        this.licenseInfo = null;
        this.initialized = false;
        this.usageStats = {
            chatCount: 0,
            uploadedBytes: 0,
            resetDate: null
        };
        
        // Define license tiers and their capabilities
        this.licenseTiers = {
            free: {
                name: 'Free',
                capabilities: {
                    maxChatsPerPeriod: 20,
                    maxUploadSizeMB: 5,
                    allowedModes: ['basic', 'creative', 'precise'],
                    features: ['basic_ui', 'text_generation']
                }
            },
            basic: {
                name: 'Basic',
                capabilities: {
                    maxChatsPerPeriod: 1000,
                    maxUploadSizeMB: 20,
                    allowedModes: ['basic', 'creative', 'precise', 'academic', 'business', 'storyteller', 'tutor', 'coder', 'assistant', 'summarizer'],
                    features: ['basic_ui', 'enhanced_ui', 'text_generation', 'text_analysis', 'priority_support']
                }
            },
            premium: {
                name: 'Premium',
                capabilities: {
                    maxChatsPerPeriod: -1, // Unlimited
                    maxUploadSizeMB: 100,
                    allowedModes: ['basic', 'creative', 'precise', 'academic', 'business', 'storyteller', 'tutor', 'coder', 'assistant', 'summarizer', 'researcher', 'translator', 'editor', 'marketer', 'analyst', 'designer', 'planner', 'mentor', 'critic', 'consultant', 'expert', 'poet', 'philosopher', 'historian', 'scientist', 'engineer', 'mathematician', 'linguist', 'journalist', 'legal_advisor'],
                    features: ['basic_ui', 'enhanced_ui', 'advanced_ui', 'holographic_ui', 'text_generation', 'text_analysis', 'image_generation', 'code_analysis', 'priority_support', 'custom_training']
                }
            },
            enterprise: {
                name: 'Enterprise',
                capabilities: {
                    maxChatsPerPeriod: -1, // Unlimited
                    maxUploadSizeMB: 500,
                    allowedModes: ['*'], // All modes
                    features: ['*'] // All features
                }
            }
        };
    }

    /**
     * Initialize the license checker
     * @returns {Promise<LicenseCheck>} This instance
     */
    async init() {
        if (this.initialized) return this;
        
        try {
            // Attempt to restore license from storage
            const restored = await this.restoreLicense();
            
            // Setup usage tracking
            this.setupUsageTracking();
            
            this.initialized = true;
            return this;
        } catch (error) {
            console.error('Failed to initialize LicenseCheck:', error);
            throw error;
        }
    }

    /**
     * Restore license from local storage
     * @returns {Promise<boolean>} Whether a valid license was restored
     */
    async restoreLicense() {
        try {
            const storedLicense = localStorage.getItem('jaat_license');
            
            if (storedLicense) {
                this.licenseInfo = JSON.parse(storedLicense);
                
                // Check if license is still valid
                if (this.licenseInfo.expiryDate && new Date(this.licenseInfo.expiryDate) < new Date()) {
                    // License expired, downgrade to free
                    this.licenseInfo = {
                        tier: 'free',
                        key: null,
                        activationDate: new Date().toISOString(),
                        expiryDate: null,
                        features: this.licenseTiers.free.capabilities.features,
                        modes: this.licenseTiers.free.capabilities.allowedModes
                    };
                }
                
                // Restore usage stats
                const storedUsage = localStorage.getItem('jaat_usage_stats');
                if (storedUsage) {
                    this.usageStats = JSON.parse(storedUsage);
                    
                    // Check if reset is needed
                    const now = new Date();
                    const resetDate = new Date(this.usageStats.resetDate || 0);
                    
                    if (!this.usageStats.resetDate || now > resetDate) {
                        this.resetUsageStats();
                    }
                }
                
                return true;
            } else {
                // No license, create free tier
                this.licenseInfo = {
                    tier: 'free',
                    key: null,
                    activationDate: new Date().toISOString(),
                    expiryDate: null,
                    features: this.licenseTiers.free.capabilities.features,
                    modes: this.licenseTiers.free.capabilities.allowedModes
                };
                
                this.saveLicense();
                return false;
            }
        } catch (error) {
            console.error('Failed to restore license:', error);
            
            // Create default free license
            this.licenseInfo = {
                tier: 'free',
                key: null,
                activationDate: new Date().toISOString(),
                expiryDate: null,
                features: this.licenseTiers.free.capabilities.features,
                modes: this.licenseTiers.free.capabilities.allowedModes
            };
            
            this.saveLicense();
            return false;
        }
    }

    /**
     * Get the current license information
     * @returns {Object} Current license information
     */
    getLicenseInfo() {
        return this.licenseInfo;
    }

    /**
     * Get the current license tier
     * @returns {string} License tier name
     */
    getLicenseTier() {
        return this.licenseInfo ? this.licenseInfo.tier : 'free';
    }

    /**
     * Get days left until license expiry
     * @returns {number} Days left, or 0 if expired
     */
    getDaysLeft() {
        if (!this.licenseInfo || !this.licenseInfo.expiryDate) return 0;
        
        const now = new Date();
        const expiryDate = new Date(this.licenseInfo.expiryDate);
        
        if (expiryDate <= now) return 0;
        
        const diffTime = Math.abs(expiryDate - now);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    }

    /**
     * Get remaining chat count for current period
     * @returns {number} Remaining chats, or -1 if unlimited
     */
    getRemainingChats() {
        if (!this.licenseInfo) return 0;
        
        const tier = this.licenseTiers[this.licenseInfo.tier];
        if (!tier) return 0;
        
        const maxChats = tier.capabilities.maxChatsPerPeriod;
        
        // -1 means unlimited
        if (maxChats === -1) return -1;
        
        return Math.max(0, maxChats - this.usageStats.chatCount);
    }

    /**
     * Set up usage tracking and resets
     */
    setupUsageTracking() {
        if (!this.usageStats.resetDate) {
            // Set initial reset date to end of month
            const resetDate = new Date();
            resetDate.setMonth(resetDate.getMonth() + 1);
            resetDate.setDate(1);
            resetDate.setHours(0, 0, 0, 0);
            
            this.usageStats.resetDate = resetDate.toISOString();
            localStorage.setItem('jaat_usage_stats', JSON.stringify(this.usageStats));
        }
    }

    /**
     * Reset usage statistics
     */
    resetUsageStats() {
        // Reset counters
        this.usageStats.chatCount = 0;
        this.usageStats.uploadedBytes = 0;
        
        // Set next reset date
        const resetDate = new Date();
        resetDate.setMonth(resetDate.getMonth() + 1);
        resetDate.setDate(1); // First day of next month
        resetDate.setHours(0, 0, 0, 0);
        
        this.usageStats.resetDate = resetDate.toISOString();
        
        // Save to storage
        localStorage.setItem('jaat_usage_stats', JSON.stringify(this.usageStats));
    }

    /**
     * Save license data to storage
     */
    saveLicense() {
        if (this.licenseInfo) {
            localStorage.setItem('jaat_license', JSON.stringify(this.licenseInfo));
        }
        
        localStorage.setItem('jaat_usage_stats', JSON.stringify(this.usageStats));
    }

    /**
     * Activate a license with the given key
     * @param {string} licenseKey - The license key to activate
     * @returns {Promise<Object>} Activation result
     */
    async activateLicense(licenseKey) {
        try {
            if (!licenseKey || typeof licenseKey !== 'string' || licenseKey.length < 10) {
                throw new Error('Invalid license key format');
            }
            
            // In a real system, this would validate with a server
            // For demo, we'll simulate validation
            const validationResult = await this.validateLicenseKey(licenseKey);
            
            if (!validationResult.valid) {
                throw new Error(validationResult.message || 'Invalid license key');
            }
            
            // Update license info
            this.licenseInfo = {
                tier: validationResult.tier,
                key: licenseKey,
                activationDate: new Date().toISOString(),
                expiryDate: validationResult.expiryDate,
                features: this.licenseTiers[validationResult.tier].capabilities.features,
                modes: this.licenseTiers[validationResult.tier].capabilities.allowedModes
            };
            
            // Save to storage
            this.saveLicense();
            
            return {
                success: true,
                message: `Successfully activated ${this.licenseTiers[validationResult.tier].name} license`,
                tier: validationResult.tier,
                expiryDate: validationResult.expiryDate
            };
        } catch (error) {
            console.error('License activation failed:', error);
            throw error;
        }
    }

    /**
     * Validate a license key (simulated)
     * @param {string} licenseKey - The license key to validate
     * @returns {Promise<Object>} Validation result
     */
    async validateLicenseKey(licenseKey) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Demo validation logic based on license key format
        // In a real system, this would check with a licensing server
        
        // For demonstration, we'll use simple format validation
        // Format: TIER-YYYYMMDD-XXXX where:
        // - TIER is the license tier (BASIC, PREMIUM, ENT)
        // - YYYYMMDD is the expiry date
        // - XXXX is a unique identifier
        
        try {
            const parts = licenseKey.split('-');
            
            if (parts.length !== 3) {
                return { valid: false, message: 'Invalid license key format' };
            }
            
            const tierCode = parts[0].toUpperCase();
            const dateStr = parts[1];
            
            // Map tier code to tier
            let tier;
            switch (tierCode) {
                case 'BASIC':
                    tier = 'basic';
                    break;
                case 'PREMIUM':
                    tier = 'premium';
                    break;
                case 'ENT':
                    tier = 'enterprise';
                    break;
                default:
                    return { valid: false, message: 'Invalid license tier' };
            }
            
            // Validate date format (YYYYMMDD)
            if (!/^\d{8}$/.test(dateStr)) {
                return { valid: false, message: 'Invalid date format in license key' };
            }
            
            // Parse date
            const year = parseInt(dateStr.substring(0, 4), 10);
            const month = parseInt(dateStr.substring(4, 6), 10) - 1;
            const day = parseInt(dateStr.substring(6, 8), 10);
            
            const expiryDate = new Date(year, month, day);
            
            // Check if date is valid
            if (isNaN(expiryDate.getTime())) {
                return { valid: false, message: 'Invalid date in license key' };
            }
            
            // Check if license is expired
            if (expiryDate < new Date()) {
                return { valid: false, message: 'License key has expired' };
            }
            
            return {
                valid: true,
                tier,
                expiryDate: expiryDate.toISOString()
            };
        } catch (error) {
            console.error('License validation error:', error);
            return { valid: false, message: 'Failed to validate license key' };
        }
    }

    /**
     * Check if the current license allows a specific AI mode
     * @param {string} modeId - The mode ID to check
     * @returns {boolean} Whether the mode is allowed
     */
    canUseAIMode(modeId) {
        if (!this.licenseInfo) return false;
        
        // Check if tier offers all modes
        if (this.licenseInfo.modes.includes('*')) return true;
        
        // Check if mode is in allowed list
        return this.licenseInfo.modes.includes(modeId);
    }

    /**
     * Check if the current license allows a specific feature
     * @param {string} featureId - The feature ID to check
     * @returns {boolean} Whether the feature is allowed
     */
    canUseFeature(featureId) {
        if (!this.licenseInfo) return false;
        
        // Check if tier offers all features
        if (this.licenseInfo.features.includes('*')) return true;
        
        // Check if feature is in allowed list
        return this.licenseInfo.features.includes(featureId);
    }

    /**
     * Record a chat interaction
     * @returns {boolean} Whether the interaction was allowed
     */
    recordChatInteraction() {
        if (!this.licenseInfo) return false;
        
        const tier = this.licenseTiers[this.licenseInfo.tier];
        if (!tier) return false;
        
        const maxChats = tier.capabilities.maxChatsPerPeriod;
        
        // -1 means unlimited
        if (maxChats === -1) {
            return true;
        }
        
        // Check if limit reached
        if (this.usageStats.chatCount >= maxChats) {
            return false;
        }
        
        // Increment counter and save
        this.usageStats.chatCount++;
        localStorage.setItem('jaat_usage_stats', JSON.stringify(this.usageStats));
        
        return true;
    }

    /**
     * Check if a file can be uploaded
     * @param {number} fileSize - Size of the file in bytes
     * @returns {boolean} Whether the file can be uploaded
     */
    canUploadFile(fileSize) {
        if (!this.licenseInfo) return false;
        
        const tier = this.licenseTiers[this.licenseInfo.tier];
        if (!tier) return false;
        
        const maxUploadSizeBytes = tier.capabilities.maxUploadSizeMB * 1024 * 1024;
        
        // Check if file size exceeds max single file size
        if (fileSize > maxUploadSizeBytes) {
            return false;
        }
        
        // In a real implementation, we might also check the total upload quota
        
        return true;
    }

    /**
     * Record a file upload
     * @param {number} fileSize - Size of the file in bytes
     * @returns {boolean} Whether the upload was allowed
     */
    recordFileUpload(fileSize) {
        if (!this.canUploadFile(fileSize)) {
            return false;
        }
        
        // Increment uploaded bytes counter
        this.usageStats.uploadedBytes += fileSize;
        localStorage.setItem('jaat_usage_stats', JSON.stringify(this.usageStats));
        
        return true;
    }
}

// Export singleton instance
const licenseCheck = new LicenseCheck();
export default licenseCheck;
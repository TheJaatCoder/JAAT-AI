/**
 * JAAT-AI Subscription Manager Feature
 * Handles subscriptions, premium features, and payment processing
 * 
 * Created by: Rohit Sangwan
 * Contact: Infosec.rohit77@gmail.com
 */

class SubscriptionManager {
    constructor() {
        this.initialized = false;
        this.currentPlan = null;
        this.paymentMethod = null;
        this.subscriptionHistory = [];
        this.usageStats = {};
        this.featureAccess = {};
        
        // Define subscription plans
        this.plans = {
            free: {
                id: 'free',
                name: 'Free Plan',
                price: 0,
                billingCycle: 'monthly',
                features: [
                    'Basic AI chat (GPT-3.5)',
                    'Up to 50 messages per day',
                    'Text-based interactions only',
                    'Basic AI modes (5 included)'
                ],
                limits: {
                    messagesPerDay: 50,
                    aiModes: 5,
                    maxFileSize: 5 * 1024 * 1024, // 5MB
                    imageGeneration: 5
                }
            },
            standard: {
                id: 'standard',
                name: 'Standard Plan',
                price: 9.99,
                billingCycle: 'monthly',
                features: [
                    'Advanced AI models (GPT-4, Claude)',
                    'Up to 500 messages per day',
                    'Voice interactions',
                    '25 AI modes included',
                    'Image generation & analysis',
                    'Multi-language support'
                ],
                limits: {
                    messagesPerDay: 500,
                    aiModes: 25,
                    maxFileSize: 25 * 1024 * 1024, // 25MB
                    imageGeneration: 50
                }
            },
            premium: {
                id: 'premium',
                name: 'Premium Plan',
                price: 29.99,
                billingCycle: 'monthly',
                features: [
                    'All AI models (including GPT-4o, Claude 3.7)',
                    'Unlimited messages',
                    'All 70+ specialized AI modes',
                    'Advanced voice & visual interactions',
                    'Priority response time',
                    'Holographic interface',
                    'All advanced features included'
                ],
                limits: {
                    messagesPerDay: -1, // Unlimited
                    aiModes: -1, // All modes
                    maxFileSize: 100 * 1024 * 1024, // 100MB
                    imageGeneration: 500
                }
            },
            enterprise: {
                id: 'enterprise',
                name: 'Enterprise Plan',
                price: 'Custom',
                billingCycle: 'custom',
                features: [
                    'Custom AI model deployment',
                    'Team collaboration features',
                    'API access',
                    'Dedicated support',
                    'Custom AI mode development',
                    'Data privacy enhancements',
                    'On-premise deployment option'
                ],
                limits: {
                    messagesPerDay: -1, // Unlimited
                    aiModes: -1, // All modes
                    maxFileSize: 1024 * 1024 * 1024, // 1GB
                    imageGeneration: -1 // Unlimited
                }
            }
        };
        
        // Define annual pricing with discount
        this.annualPlans = {
            standard: {
                ...this.plans.standard,
                price: 99.99, // ~17% discount
                billingCycle: 'annually'
            },
            premium: {
                ...this.plans.premium,
                price: 299.99, // ~17% discount
                billingCycle: 'annually'
            }
        };
        
        // Define feature access map for each plan
        this.planFeatureAccess = {
            free: {
                'voice-recognition': false,
                'multi-language-support': false,
                'ai-personalization': false,
                'image-style-transfer': false,
                'deepfake-detection': false
                // Additional features would be defined here
            },
            standard: {
                'voice-recognition': true,
                'multi-language-support': true,
                'ai-personalization': true,
                'image-style-transfer': false,
                'deepfake-detection': false
                // Additional features would be defined here
            },
            premium: {
                'voice-recognition': true,
                'multi-language-support': true,
                'ai-personalization': true,
                'image-style-transfer': true,
                'deepfake-detection': true
                // All features would be enabled
            },
            enterprise: {
                // All features enabled plus custom features
            }
        };
        
        // Initialize subscription
        this.loadSubscription();
        
        console.log('JAAT-AI Subscription Manager feature initialized');
    }
    
    /**
     * Load subscription from localStorage or server
     */
    loadSubscription() {
        try {
            // In a real app, this would make a server request to get current subscription
            // For demo, we'll use localStorage and fallback to free plan
            const savedSubscription = localStorage.getItem('jaat-subscription');
            
            if (savedSubscription) {
                const subscription = JSON.parse(savedSubscription);
                this.currentPlan = subscription.plan;
                this.paymentMethod = subscription.paymentMethod;
                this.subscriptionHistory = subscription.history || [];
                this.usageStats = subscription.usage || {};
                
                // Generate feature access based on plan
                this.updateFeatureAccess();
                
                this.initialized = true;
                this.dispatchEvent('subscriptionLoaded', { plan: this.currentPlan });
            } else {
                // No subscription found, default to free plan
                this.setFreePlan();
            }
        } catch (error) {
            console.error('Failed to load subscription:', error);
            // Default to free plan on error
            this.setFreePlan();
        }
    }
    
    /**
     * Set user to free plan
     */
    setFreePlan() {
        this.currentPlan = 'free';
        this.paymentMethod = null;
        this.subscriptionHistory = [];
        this.usageStats = {
            messagesUsed: 0,
            lastReset: new Date().toISOString()
        };
        
        // Update feature access for free plan
        this.updateFeatureAccess();
        
        this.saveSubscription();
        this.initialized = true;
        this.dispatchEvent('subscriptionLoaded', { plan: this.currentPlan });
    }
    
    /**
     * Save subscription to localStorage
     */
    saveSubscription() {
        try {
            const subscription = {
                plan: this.currentPlan,
                paymentMethod: this.paymentMethod,
                history: this.subscriptionHistory,
                usage: this.usageStats
            };
            
            localStorage.setItem('jaat-subscription', JSON.stringify(subscription));
        } catch (error) {
            console.error('Failed to save subscription:', error);
        }
    }
    
    /**
     * Update feature access based on current plan
     */
    updateFeatureAccess() {
        if (!this.currentPlan) return;
        
        // Get feature access map for current plan
        this.featureAccess = this.planFeatureAccess[this.currentPlan] || {};
        
        // In development mode, can enable all features regardless of plan
        if (window.JAAT_ENV && window.JAAT_ENV.config && window.JAAT_ENV.config.isPremiumEnabled()) {
            // Enable all features
            Object.keys(this.featureAccess).forEach(feature => {
                this.featureAccess[feature] = true;
            });
        }
    }
    
    /**
     * Get subscription plans
     * @param {string} billingCycle - 'monthly' or 'annually'
     * @returns {Object} Subscription plans
     */
    getSubscriptionPlans(billingCycle = 'monthly') {
        if (billingCycle === 'annually') {
            return {
                free: this.plans.free,
                standard: this.annualPlans.standard,
                premium: this.annualPlans.premium,
                enterprise: this.plans.enterprise
            };
        }
        
        return this.plans;
    }
    
    /**
     * Get current subscription plan
     * @returns {Object} Current subscription plan
     */
    getCurrentPlan() {
        if (!this.currentPlan) return this.plans.free;
        
        return this.plans[this.currentPlan];
    }
    
    /**
     * Get feature access
     * @returns {Object} Feature access map
     */
    getFeatureAccess() {
        return { ...this.featureAccess };
    }
    
    /**
     * Check if a specific feature is available on current plan
     * @param {string} featureId - Feature ID to check
     * @returns {boolean} Whether feature is available
     */
    canUseFeature(featureId) {
        // In development mode, return true for all features
        if (window.JAAT_ENV && window.JAAT_ENV.config && window.JAAT_ENV.config.isPremiumEnabled()) {
            return true;
        }
        
        return this.featureAccess[featureId] || false;
    }
    
    /**
     * Check if usage limit is reached
     * @param {string} limitType - Type of limit to check
     * @returns {boolean} Whether limit is reached
     */
    isLimitReached(limitType) {
        if (!this.currentPlan) return true;
        
        // Get plan limits
        const plan = this.getCurrentPlan();
        const limit = plan.limits[limitType];
        
        // Unlimited if limit is -1
        if (limit === -1) return false;
        
        // Get current usage
        const usage = this.usageStats[limitType] || 0;
        
        return usage >= limit;
    }
    
    /**
     * Record usage of a limited resource
     * @param {string} resourceType - Type of resource used
     * @param {number} amount - Amount used
     * @returns {boolean} Whether usage was allowed
     */
    recordUsage(resourceType, amount = 1) {
        // No limit tracking needed in development mode
        if (window.JAAT_ENV && window.JAAT_ENV.config && window.JAAT_ENV.config.isPremiumEnabled()) {
            return true;
        }
        
        // Check if limit is already reached
        if (this.isLimitReached(resourceType)) {
            return false;
        }
        
        // Update usage
        if (!this.usageStats[resourceType]) {
            this.usageStats[resourceType] = 0;
        }
        
        this.usageStats[resourceType] += amount;
        
        // Save updated usage
        this.saveSubscription();
        
        return true;
    }
    
    /**
     * Reset daily usage stats
     */
    resetDailyUsage() {
        this.usageStats.messagesUsed = 0;
        this.usageStats.lastReset = new Date().toISOString();
        this.saveSubscription();
    }
    
    /**
     * Check if daily usage needs to be reset
     */
    checkDailyReset() {
        if (!this.usageStats.lastReset) {
            this.resetDailyUsage();
            return;
        }
        
        const lastReset = new Date(this.usageStats.lastReset);
        const now = new Date();
        
        // Reset if last reset was yesterday or earlier
        if (lastReset.getDate() !== now.getDate() || 
            lastReset.getMonth() !== now.getMonth() ||
            lastReset.getFullYear() !== now.getFullYear()) {
            this.resetDailyUsage();
        }
    }
    
    /**
     * Upgrade subscription to a new plan
     * @param {string} planId - ID of the plan to upgrade to
     * @param {string} billingCycle - 'monthly' or 'annually'
     * @returns {Promise<Object>} Upgrade result
     */
    async upgradeToPlan(planId, billingCycle = 'monthly') {
        try {
            // Validate plan
            if (!this.plans[planId]) {
                throw new Error(`Invalid plan: ${planId}`);
            }
            
            // Record current plan for history
            const oldPlan = this.currentPlan;
            
            // Start payment flow for paid plans
            if (planId !== 'free') {
                // In a real app, this would open a payment processing flow
                // For demo purposes, we'll simulate a successful payment
                
                const paymentResult = await this.processPayment(planId, billingCycle);
                
                if (!paymentResult.success) {
                    throw new Error(paymentResult.error || 'Payment failed');
                }
                
                // Update payment method
                this.paymentMethod = paymentResult.paymentMethod;
            }
            
            // Update subscription
            this.currentPlan = planId;
            
            // Add to subscription history
            this.subscriptionHistory.push({
                date: new Date().toISOString(),
                action: 'upgrade',
                fromPlan: oldPlan,
                toPlan: planId,
                billingCycle
            });
            
            // Update feature access for new plan
            this.updateFeatureAccess();
            
            // Save subscription
            this.saveSubscription();
            
            // Dispatch upgrade event
            this.dispatchEvent('subscriptionUpgraded', { 
                plan: planId,
                billingCycle
            });
            
            return {
                success: true,
                plan: this.getCurrentPlan()
            };
            
        } catch (error) {
            console.error('Failed to upgrade subscription:', error);
            
            this.dispatchEvent('subscriptionError', { 
                error: error.message,
                action: 'upgrade'
            });
            
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Simulate payment processing (for demonstration)
     * @param {string} planId - ID of the plan
     * @param {string} billingCycle - 'monthly' or 'annually'
     * @returns {Promise<Object>} Payment result
     */
    async processPayment(planId, billingCycle) {
        // This is a simulation of payment processing
        // In a real app, this would integrate with Stripe or another payment processor
        
        return new Promise(resolve => {
            setTimeout(() => {
                // Simulate successful payment
                resolve({
                    success: true,
                    transactionId: 'sim_' + Math.random().toString(36).substr(2, 9),
                    paymentMethod: {
                        type: 'card',
                        last4: '4242',
                        expiryMonth: 12,
                        expiryYear: 2028
                    }
                });
                
                // To simulate a failed payment, uncomment this:
                /*
                resolve({
                    success: false,
                    error: 'Payment failed: Card declined'
                });
                */
            }, 1500);
        });
    }
    
    /**
     * Cancel current subscription
     * @returns {Promise<Object>} Cancellation result
     */
    async cancelSubscription() {
        try {
            // Record current plan for history
            const oldPlan = this.currentPlan;
            
            // In a real app, this would call a server to cancel the subscription
            // For demo purposes, we'll simulate a successful cancellation
            
            // Downgrade to free plan
            this.currentPlan = 'free';
            this.paymentMethod = null;
            
            // Add to subscription history
            this.subscriptionHistory.push({
                date: new Date().toISOString(),
                action: 'cancel',
                fromPlan: oldPlan,
                toPlan: 'free'
            });
            
            // Update feature access for free plan
            this.updateFeatureAccess();
            
            // Save subscription
            this.saveSubscription();
            
            // Dispatch cancel event
            this.dispatchEvent('subscriptionCancelled');
            
            return {
                success: true
            };
            
        } catch (error) {
            console.error('Failed to cancel subscription:', error);
            
            this.dispatchEvent('subscriptionError', { 
                error: error.message,
                action: 'cancel'
            });
            
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Get subscription history
     * @returns {Array} Subscription history
     */
    getSubscriptionHistory() {
        return [...this.subscriptionHistory];
    }
    
    /**
     * Get payment method details
     * @returns {Object|null} Payment method details
     */
    getPaymentMethod() {
        return this.paymentMethod ? { ...this.paymentMethod } : null;
    }
    
    /**
     * Update payment method
     * @returns {Promise<Object>} Update result
     */
    async updatePaymentMethod() {
        try {
            // In a real app, this would open a payment method update flow
            // For demo purposes, we'll simulate a successful update
            
            const updateResult = await this.simulatePaymentMethodUpdate();
            
            if (!updateResult.success) {
                throw new Error(updateResult.error || 'Failed to update payment method');
            }
            
            // Update payment method
            this.paymentMethod = updateResult.paymentMethod;
            
            // Save subscription
            this.saveSubscription();
            
            // Dispatch update event
            this.dispatchEvent('paymentMethodUpdated', { 
                paymentMethod: this.paymentMethod 
            });
            
            return {
                success: true,
                paymentMethod: this.paymentMethod
            };
            
        } catch (error) {
            console.error('Failed to update payment method:', error);
            
            this.dispatchEvent('subscriptionError', { 
                error: error.message,
                action: 'updatePayment'
            });
            
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Simulate payment method update (for demonstration)
     * @returns {Promise<Object>} Update result
     */
    async simulatePaymentMethodUpdate() {
        // This is a simulation of payment method update
        // In a real app, this would integrate with Stripe or another payment processor
        
        return new Promise(resolve => {
            setTimeout(() => {
                // Simulate successful update
                resolve({
                    success: true,
                    paymentMethod: {
                        type: 'card',
                        last4: '5678',
                        expiryMonth: 3,
                        expiryYear: 2029
                    }
                });
            }, 1500);
        });
    }
    
    /**
     * Get current usage statistics
     * @returns {Object} Usage statistics
     */
    getUsageStats() {
        // Check if daily reset is needed
        this.checkDailyReset();
        
        // Get current plan
        const plan = this.getCurrentPlan();
        
        // Calculate usage percentages
        const usageStats = {
            messagesUsed: this.usageStats.messagesUsed || 0,
            messagesLimit: plan.limits.messagesPerDay,
            messagesPercentage: plan.limits.messagesPerDay === -1 ? 0 : 
                Math.min(100, Math.round((this.usageStats.messagesUsed || 0) / plan.limits.messagesPerDay * 100)),
            
            imageGeneration: this.usageStats.imageGeneration || 0,
            imageGenerationLimit: plan.limits.imageGeneration,
            imageGenerationPercentage: plan.limits.imageGeneration === -1 ? 0 :
                Math.min(100, Math.round((this.usageStats.imageGeneration || 0) / plan.limits.imageGeneration * 100)),
                
            // Add other usage stats as needed
        };
        
        return usageStats;
    }
    
    /**
     * Check if premium content should be shown
     * @returns {boolean} Whether to show premium content
     */
    shouldShowPremiumContent() {
        // In development mode, show all content
        if (window.JAAT_ENV && window.JAAT_ENV.config && window.JAAT_ENV.config.isPremiumEnabled()) {
            return true;
        }
        
        // Otherwise show based on current plan
        return this.currentPlan === 'premium' || this.currentPlan === 'enterprise';
    }
    
    /**
     * Dispatch a custom event
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event details
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`jaat.subscription.${eventName}`, { 
            detail,
            bubbles: true
        });
        document.dispatchEvent(event);
    }
}

// Register the feature with JAAT-AI
if (window.JAAT) {
    window.JAAT.registerFeature('subscription-manager', new SubscriptionManager());
}

// Add initialization code
document.addEventListener('DOMContentLoaded', function() {
    if (window.JAAT && window.JAAT.features['subscription-manager']) {
        const subscriptionManager = window.JAAT.features['subscription-manager'];
        
        // Check for premium content elements to hide/show based on subscription
        const premiumElements = document.querySelectorAll('[data-premium]');
        
        function updatePremiumElements() {
            const showPremium = subscriptionManager.shouldShowPremiumContent();
            
            premiumElements.forEach(element => {
                if (showPremium) {
                    element.classList.remove('premium-locked');
                    
                    // Remove any premium overlay
                    const overlay = element.querySelector('.premium-overlay');
                    if (overlay) {
                        element.removeChild(overlay);
                    }
                } else {
                    element.classList.add('premium-locked');
                    
                    // Add premium overlay if not already present
                    if (!element.querySelector('.premium-overlay')) {
                        const overlay = document.createElement('div');
                        overlay.className = 'premium-overlay';
                        
                        const icon = document.createElement('i');
                        icon.className = 'fas fa-crown';
                        
                        const text = document.createElement('span');
                        text.textContent = 'Premium Feature';
                        
                        const button = document.createElement('button');
                        button.className = 'upgrade-button';
                        button.textContent = 'Upgrade';
                        button.addEventListener('click', (e) => {
                            e.stopPropagation();
                            // Show subscription modal
                            showSubscriptionModal();
                        });
                        
                        overlay.appendChild(icon);
                        overlay.appendChild(text);
                        overlay.appendChild(button);
                        
                        element.appendChild(overlay);
                    }
                }
            });
        }
        
        // Create a function to show the subscription modal
        function showSubscriptionModal() {
            // Check if modal already exists
            let modal = document.querySelector('.subscription-modal');
            
            if (!modal) {
                // Create modal
                modal = document.createElement('div');
                modal.className = 'subscription-modal';
                
                // Create modal content
                const modalContent = document.createElement('div');
                modalContent.className = 'modal-content';
                
                // Create header
                const header = document.createElement('div');
                header.className = 'modal-header';
                
                const title = document.createElement('h2');
                title.textContent = 'Upgrade Your JAAT-AI Experience';
                
                const closeButton = document.createElement('button');
                closeButton.className = 'modal-close';
                closeButton.innerHTML = '&times;';
                closeButton.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                header.appendChild(title);
                header.appendChild(closeButton);
                
                // Create plans container
                const plansContainer = document.createElement('div');
                plansContainer.className = 'subscription-plans';
                
                // Get all plans
                const plans = subscriptionManager.getSubscriptionPlans();
                
                // Create plan cards
                Object.values(plans).forEach(plan => {
                    // Skip enterprise plan from display
                    if (plan.id === 'enterprise') return;
                    
                    const planCard = document.createElement('div');
                    planCard.className = `plan-card ${plan.id}`;
                    if (plan.id === subscriptionManager.getCurrentPlan().id) {
                        planCard.classList.add('current-plan');
                    }
                    
                    const planHeader = document.createElement('div');
                    planHeader.className = 'plan-header';
                    
                    const planName = document.createElement('h3');
                    planName.textContent = plan.name;
                    
                    const planPrice = document.createElement('div');
                    planPrice.className = 'plan-price';
                    if (plan.price === 0) {
                        planPrice.textContent = 'Free';
                    } else {
                        planPrice.innerHTML = `$${plan.price}<span>/month</span>`;
                    }
                    
                    planHeader.appendChild(planName);
                    planHeader.appendChild(planPrice);
                    
                    const planFeatures = document.createElement('ul');
                    planFeatures.className = 'plan-features';
                    
                    plan.features.forEach(feature => {
                        const featureItem = document.createElement('li');
                        featureItem.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
                        planFeatures.appendChild(featureItem);
                    });
                    
                    const planAction = document.createElement('div');
                    planAction.className = 'plan-action';
                    
                    const actionButton = document.createElement('button');
                    if (plan.id === subscriptionManager.getCurrentPlan().id) {
                        actionButton.textContent = 'Current Plan';
                        actionButton.disabled = true;
                    } else if (plan.id === 'free') {
                        actionButton.textContent = 'Downgrade';
                        actionButton.classList.add('downgrade-button');
                    } else {
                        actionButton.textContent = 'Upgrade';
                        actionButton.classList.add('upgrade-button');
                    }
                    
                    actionButton.addEventListener('click', async () => {
                        if (plan.id === subscriptionManager.getCurrentPlan().id) return;
                        
                        // Show loading state
                        actionButton.textContent = 'Processing...';
                        actionButton.disabled = true;
                        
                        // Process subscription change
                        if (plan.id === 'free') {
                            // Confirm cancellation
                            if (confirm('Are you sure you want to cancel your subscription and downgrade to the free plan?')) {
                                const result = await subscriptionManager.cancelSubscription();
                                
                                if (result.success) {
                                    // Close modal and update UI
                                    document.body.removeChild(modal);
                                    updatePremiumElements();
                                } else {
                                    alert(`Failed to cancel subscription: ${result.error}`);
                                    actionButton.textContent = 'Downgrade';
                                    actionButton.disabled = false;
                                }
                            } else {
                                actionButton.textContent = 'Downgrade';
                                actionButton.disabled = false;
                            }
                        } else {
                            // Process upgrade
                            const result = await subscriptionManager.upgradeToPlan(plan.id);
                            
                            if (result.success) {
                                // Close modal and update UI
                                document.body.removeChild(modal);
                                updatePremiumElements();
                            } else {
                                alert(`Failed to upgrade: ${result.error}`);
                                actionButton.textContent = 'Upgrade';
                                actionButton.disabled = false;
                            }
                        }
                    });
                    
                    planAction.appendChild(actionButton);
                    
                    // Assemble plan card
                    planCard.appendChild(planHeader);
                    planCard.appendChild(planFeatures);
                    planCard.appendChild(planAction);
                    
                    plansContainer.appendChild(planCard);
                });
                
                // Add enterprise plan contact option
                const enterpriseContact = document.createElement('div');
                enterpriseContact.className = 'enterprise-contact';
                enterpriseContact.innerHTML = `
                    <h3>Need Enterprise Features?</h3>
                    <p>Contact our sales team for custom enterprise solutions.</p>
                    <a href="mailto:sales@jaat-ai.com" class="contact-button">Contact Sales</a>
                `;
                
                // Assemble modal
                modalContent.appendChild(header);
                modalContent.appendChild(plansContainer);
                modalContent.appendChild(enterpriseContact);
                modal.appendChild(modalContent);
                
                // Add modal to document
                document.body.appendChild(modal);
                
                // Add modal styles if not already in document
                if (!document.querySelector('#subscription-modal-styles')) {
                    const styleEl = document.createElement('style');
                    styleEl.id = 'subscription-modal-styles';
                    styleEl.textContent = `
                        .subscription-modal {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0, 0, 0, 0.7);
                            z-index: 1000;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        
                        .modal-content {
                            background-color: #1a1a2e;
                            border-radius: 10px;
                            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
                            width: 90%;
                            max-width: 900px;
                            max-height: 90vh;
                            overflow-y: auto;
                            color: #e9e9ea;
                        }
                        
                        .modal-header {
                            padding: 20px;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }
                        
                        .modal-header h2 {
                            margin: 0;
                            font-size: 1.8rem;
                            color: #e9e9ea;
                        }
                        
                        .modal-close {
                            background: transparent;
                            border: none;
                            color: #e9e9ea;
                            font-size: 1.5rem;
                            cursor: pointer;
                        }
                        
                        .subscription-plans {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: center;
                            gap: 20px;
                            padding: 30px;
                        }
                        
                        .plan-card {
                            background-color: rgba(255, 255, 255, 0.05);
                            border-radius: 10px;
                            padding: 25px;
                            width: 280px;
                            display: flex;
                            flex-direction: column;
                            transition: transform 0.3s, box-shadow 0.3s;
                        }
                        
                        .plan-card:hover {
                            transform: translateY(-5px);
                            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                        }
                        
                        .plan-card.current-plan {
                            border: 2px solid var(--primary-color);
                        }
                        
                        .plan-card.premium {
                            background-color: rgba(74, 144, 226, 0.1);
                        }
                        
                        .plan-header {
                            margin-bottom: 20px;
                            text-align: center;
                        }
                        
                        .plan-header h3 {
                            margin: 0 0 10px 0;
                            font-size: 1.5rem;
                            color: #e9e9ea;
                        }
                        
                        .plan-price {
                            font-size: 2rem;
                            font-weight: bold;
                            color: var(--primary-color);
                        }
                        
                        .plan-price span {
                            font-size: 1rem;
                            opacity: 0.7;
                        }
                        
                        .plan-features {
                            list-style: none;
                            padding: 0;
                            margin: 0 0 30px 0;
                            flex: 1;
                        }
                        
                        .plan-features li {
                            margin-bottom: 10px;
                            display: flex;
                            align-items: flex-start;
                        }
                        
                        .plan-features li i {
                            color: var(--primary-color);
                            margin-right: 10px;
                            margin-top: 4px;
                        }
                        
                        .plan-action {
                            text-align: center;
                        }
                        
                        .plan-action button {
                            width: 100%;
                            padding: 12px;
                            border: none;
                            border-radius: 5px;
                            font-size: 1rem;
                            font-weight: bold;
                            cursor: pointer;
                            transition: background-color 0.3s;
                        }
                        
                        .plan-action button:disabled {
                            opacity: 0.6;
                            cursor: not-allowed;
                        }
                        
                        .upgrade-button {
                            background-color: var(--primary-color);
                            color: white;
                        }
                        
                        .upgrade-button:hover {
                            background-color: var(--primary-hover);
                        }
                        
                        .downgrade-button {
                            background-color: rgba(255, 255, 255, 0.1);
                            color: #e9e9ea;
                        }
                        
                        .downgrade-button:hover {
                            background-color: rgba(255, 255, 255, 0.2);
                        }
                        
                        .enterprise-contact {
                            text-align: center;
                            padding: 20px;
                            margin: 0 30px 30px;
                            background-color: rgba(255, 255, 255, 0.05);
                            border-radius: 10px;
                        }
                        
                        .enterprise-contact h3 {
                            margin: 0 0 10px 0;
                            font-size: 1.3rem;
                        }
                        
                        .enterprise-contact p {
                            margin: 0 0 15px 0;
                            opacity: 0.8;
                        }
                        
                        .contact-button {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: transparent;
                            border: 1px solid var(--primary-color);
                            color: var(--primary-color);
                            border-radius: 5px;
                            text-decoration: none;
                            transition: all 0.3s;
                        }
                        
                        .contact-button:hover {
                            background-color: var(--primary-color);
                            color: white;
                        }
                        
                        .premium-overlay {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0, 0, 0, 0.8);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            z-index: 10;
                            backdrop-filter: blur(4px);
                        }
                        
                        .premium-overlay i {
                            font-size: 2rem;
                            color: gold;
                            margin-bottom: 10px;
                        }
                        
                        .premium-overlay span {
                            font-size: 1.2rem;
                            margin-bottom: 15px;
                            color: white;
                        }
                        
                        .premium-overlay .upgrade-button {
                            padding: 8px 16px;
                            background-color: var(--primary-color);
                            color: white;
                            border: none;
                            border-radius: 5px;
                            font-weight: bold;
                            cursor: pointer;
                        }
                        
                        @media (max-width: 768px) {
                            .subscription-plans {
                                flex-direction: column;
                                align-items: center;
                            }
                            
                            .plan-card {
                                width: 100%;
                                max-width: 350px;
                            }
                        }
                    `;
                    document.head.appendChild(styleEl);
                }
                
                // Close modal when clicking outside content
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
            }
        }
        
        // Add subscription status indicator to header if exists
        const headerActions = document.querySelector('.header-actions');
        if (headerActions && !document.querySelector('.subscription-status')) {
            const statusIndicator = document.createElement('div');
            statusIndicator.className = 'subscription-status';
            
            // Update subscription status display
            function updateStatusIndicator() {
                const currentPlan = subscriptionManager.getCurrentPlan();
                
                // Clear previous content
                statusIndicator.innerHTML = '';
                
                // Create plan badge
                const planBadge = document.createElement('div');
                planBadge.className = `plan-badge ${currentPlan.id}`;
                planBadge.textContent = currentPlan.id === 'free' ? 'Free Plan' : currentPlan.name;
                
                // Create upgrade button for non-premium plans
                if (currentPlan.id !== 'premium' && currentPlan.id !== 'enterprise') {
                    const upgradeLink = document.createElement('button');
                    upgradeLink.className = 'upgrade-link';
                    upgradeLink.textContent = 'Upgrade';
                    upgradeLink.addEventListener('click', () => {
                        showSubscriptionModal();
                    });
                    
                    statusIndicator.appendChild(planBadge);
                    statusIndicator.appendChild(upgradeLink);
                } else {
                    statusIndicator.appendChild(planBadge);
                }
                
                // Style the subscription status
                statusIndicator.style.display = 'flex';
                statusIndicator.style.alignItems = 'center';
                statusIndicator.style.marginRight = '20px';
                
                planBadge.style.padding = '4px 10px';
                planBadge.style.borderRadius = '12px';
                planBadge.style.fontSize = '0.8rem';
                planBadge.style.fontWeight = 'bold';
                
                if (currentPlan.id === 'free') {
                    planBadge.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    planBadge.style.color = '#e9e9ea';
                } else if (currentPlan.id === 'standard') {
                    planBadge.style.backgroundColor = 'rgba(106, 191, 64, 0.15)';
                    planBadge.style.color = '#6abf40';
                } else if (currentPlan.id === 'premium') {
                    planBadge.style.backgroundColor = 'rgba(74, 144, 226, 0.15)';
                    planBadge.style.color = '#4a90e2';
                } else if (currentPlan.id === 'enterprise') {
                    planBadge.style.backgroundColor = 'rgba(155, 89, 182, 0.15)';
                    planBadge.style.color = '#9b59b6';
                }
                
                if (statusIndicator.querySelector('.upgrade-link')) {
                    const upgradeLink = statusIndicator.querySelector('.upgrade-link');
                    upgradeLink.style.marginLeft = '10px';
                    upgradeLink.style.padding = '3px 8px';
                    upgradeLink.style.backgroundColor = 'rgba(74, 144, 226, 0.2)';
                    upgradeLink.style.color = '#4a90e2';
                    upgradeLink.style.borderRadius = '4px';
                    upgradeLink.style.fontSize = '0.8rem';
                    upgradeLink.style.border = 'none';
                    upgradeLink.style.cursor = 'pointer';
                    upgradeLink.style.transition = 'background-color 0.3s';
                }
            }
            
            // Initialize status indicator
            updateStatusIndicator();
            
            // Add to header
            headerActions.prepend(statusIndicator);
            
            // Listen for subscription changes to update status
            document.addEventListener('jaat.subscription.subscriptionUpgraded', updateStatusIndicator);
            document.addEventListener('jaat.subscription.subscriptionCancelled', updateStatusIndicator);
        }
        
        // Add upgrade button to features section if exists
        const featuresSection = document.querySelector('.features-section');
        if (featuresSection && !featuresSection.querySelector('.upgrade-banner') && 
            subscriptionManager.getCurrentPlan().id === 'free') {
            
            const upgradeBanner = document.createElement('div');
            upgradeBanner.className = 'upgrade-banner';
            upgradeBanner.innerHTML = `
                <div class="banner-content">
                    <h3>Unlock Premium Features</h3>
                    <p>Get access to all 70+ AI modes and advanced features with JAAT-AI Premium.</p>
                </div>
                <button class="banner-button">Upgrade Now</button>
            `;
            
            // Style the banner
            upgradeBanner.style.margin = '30px 0';
            upgradeBanner.style.padding = '20px';
            upgradeBanner.style.borderRadius = '10px';
            upgradeBanner.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
            upgradeBanner.style.border = '1px solid rgba(74, 144, 226, 0.3)';
            upgradeBanner.style.display = 'flex';
            upgradeBanner.style.justifyContent = 'space-between';
            upgradeBanner.style.alignItems = 'center';
            
            const bannerContent = upgradeBanner.querySelector('.banner-content');
            bannerContent.style.flex = '1';
            
            const bannerTitle = upgradeBanner.querySelector('h3');
            bannerTitle.style.margin = '0 0 5px 0';
            bannerTitle.style.fontSize = '1.3rem';
            bannerTitle.style.color = '#4a90e2';
            
            const bannerDescription = upgradeBanner.querySelector('p');
            bannerDescription.style.margin = '0';
            bannerDescription.style.opacity = '0.9';
            
            const bannerButton = upgradeBanner.querySelector('.banner-button');
            bannerButton.style.padding = '10px 20px';
            bannerButton.style.backgroundColor = '#4a90e2';
            bannerButton.style.color = 'white';
            bannerButton.style.border = 'none';
            bannerButton.style.borderRadius = '5px';
            bannerButton.style.fontWeight = 'bold';
            bannerButton.style.cursor = 'pointer';
            bannerButton.style.transition = 'background-color 0.3s';
            
            // Add hover effect
            bannerButton.addEventListener('mouseover', () => {
                bannerButton.style.backgroundColor = '#3a80d2';
            });
            
            bannerButton.addEventListener('mouseout', () => {
                bannerButton.style.backgroundColor = '#4a90e2';
            });
            
            // Add click handler
            bannerButton.addEventListener('click', () => {
                showSubscriptionModal();
            });
            
            // Add to features section
            featuresSection.appendChild(upgradeBanner);
        }
        
        // Initial update of premium elements
        updatePremiumElements();
        
        // Listen for subscription changes
        document.addEventListener('jaat.subscription.subscriptionUpgraded', updatePremiumElements);
        document.addEventListener('jaat.subscription.subscriptionCancelled', updatePremiumElements);
    }
});
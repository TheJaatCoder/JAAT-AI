/**
 * Payment Status Management for JAAT-AI
 * Handles subscription status, payments, and plan features
 */

class PaymentStatus {
    constructor() {
        this.subscriptionInfo = null;
        this.customerInfo = null;
        this.paymentHistory = [];
        this.initialized = false;
        this.subscriptionPlans = {
            monthly: [
                {
                    id: 'free',
                    name: 'Free Trial',
                    price: 0,
                    duration: 1, // days
                    features: ['Basic AI Mode', 'Limited Messages', 'Standard UI']
                },
                {
                    id: 'basic',
                    name: 'Basic Plan',
                    price: 49,
                    duration: 30, // days
                    features: ['10+ AI Modes', '1000 Messages/month', 'Enhanced UI', 'Priority Support']
                },
                {
                    id: 'premium',
                    name: 'Premium Plan',
                    price: 99,
                    duration: 30, // days
                    features: ['30+ AI Modes', 'Unlimited Messages', 'Advanced UI & Effects', 'Priority Support', 'Custom AI Training']
                },
                {
                    id: 'enterprise',
                    name: 'Enterprise Plan',
                    price: 199,
                    duration: 30, // days
                    features: ['All 46+ AI Modes', 'Unlimited Messages', 'Premium UI & Effects', 'Dedicated Support', 'Custom AI Training', 'API Access']
                }
            ],
            annual: [
                {
                    id: 'free',
                    name: 'Free Trial',
                    price: 0,
                    duration: 1, // days
                    features: ['Basic AI Mode', 'Limited Messages', 'Standard UI']
                },
                {
                    id: 'basic',
                    name: 'Basic Plan - Annual',
                    price: 470,
                    duration: 365, // days
                    features: ['10+ AI Modes', '1000 Messages/month', 'Enhanced UI', 'Priority Support', '2 Months Free']
                },
                {
                    id: 'premium',
                    name: 'Premium Plan - Annual',
                    price: 950,
                    duration: 365, // days
                    features: ['30+ AI Modes', 'Unlimited Messages', 'Advanced UI & Effects', 'Priority Support', 'Custom AI Training', '2 Months Free']
                },
                {
                    id: 'enterprise',
                    name: 'Enterprise Plan - Annual',
                    price: 1990,
                    duration: 365, // days
                    features: ['All 46+ AI Modes', 'Unlimited Messages', 'Premium UI & Effects', 'Dedicated Support', 'Custom AI Training', 'API Access', '2 Months Free']
                }
            ]
        };
    }

    /**
     * Initialize the payment status module
     * @returns {Promise<PaymentStatus>} This instance
     */
    async init() {
        if (this.initialized) return this;
        
        try {
            // Attempt to restore subscription from storage
            const restored = await this.restoreSubscription();
            
            // Initialize payment history
            this.paymentHistory = JSON.parse(localStorage.getItem('jaat_payment_history') || '[]');
            
            this.initialized = true;
            return this;
        } catch (error) {
            console.error('Failed to initialize PaymentStatus:', error);
            throw error;
        }
    }

    /**
     * Restore subscription from local storage
     * @returns {Promise<boolean>} Whether a valid subscription was restored
     */
    async restoreSubscription() {
        try {
            const storedSubscription = localStorage.getItem('jaat_subscription');
            
            if (storedSubscription) {
                this.subscriptionInfo = JSON.parse(storedSubscription);
                
                // Check if subscription is still valid
                if (this.subscriptionInfo.expiryDate && new Date(this.subscriptionInfo.expiryDate) < new Date()) {
                    // Subscription expired
                    this.subscriptionInfo.active = false;
                }
                
                // Restore customer info if available
                const storedCustomer = localStorage.getItem('jaat_customer');
                if (storedCustomer) {
                    this.customerInfo = JSON.parse(storedCustomer);
                }
                
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Failed to restore subscription:', error);
            return false;
        }
    }

    /**
     * Get subscription plans
     * @param {string} billingCycle - 'monthly' or 'annual'
     * @returns {Array} List of subscription plans with prices
     */
    getSubscriptionPlans(billingCycle = 'monthly') {
        if (billingCycle !== 'monthly' && billingCycle !== 'annual') {
            billingCycle = 'monthly';
        }
        
        return this.subscriptionPlans[billingCycle];
    }

    /**
     * Get subscription plan by ID
     * @param {string} planId - The plan ID
     * @param {string} billingCycle - 'monthly' or 'annual'
     * @returns {Object|null} The subscription plan or null if not found
     */
    getSubscriptionPlan(planId, billingCycle = 'monthly') {
        const plans = this.getSubscriptionPlans(billingCycle);
        return plans.find(plan => plan.id === planId) || null;
    }

    /**
     * Get current subscription information
     * @returns {Object|null} Current subscription information or null if no subscription
     */
    getSubscriptionInfo() {
        return this.subscriptionInfo;
    }

    /**
     * Check if the current subscription is active
     * @returns {boolean} Whether the subscription is active
     */
    isSubscriptionActive() {
        if (!this.subscriptionInfo) return false;
        return this.subscriptionInfo.active === true;
    }

    /**
     * Get days left until subscription expires
     * @returns {number} Days left, or 0 if expired
     */
    getDaysLeft() {
        if (!this.subscriptionInfo || !this.subscriptionInfo.expiryDate) return 0;
        
        const now = new Date();
        const expiryDate = new Date(this.subscriptionInfo.expiryDate);
        
        if (expiryDate <= now) return 0;
        
        const diffTime = Math.abs(expiryDate - now);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    }

    /**
     * Save subscription data to storage
     */
    saveSubscription() {
        if (this.subscriptionInfo) {
            localStorage.setItem('jaat_subscription', JSON.stringify(this.subscriptionInfo));
        }
        
        if (this.customerInfo) {
            localStorage.setItem('jaat_customer', JSON.stringify(this.customerInfo));
        }
        
        localStorage.setItem('jaat_payment_history', JSON.stringify(this.paymentHistory));
    }

    /**
     * Create a checkout session for a subscription
     * @param {string} planId - The plan ID
     * @param {string} billingCycle - 'monthly' or 'annual'
     * @returns {Promise<Object>} Checkout result
     */
    async createCheckoutSession(planId, billingCycle = 'monthly') {
        try {
            const plan = this.getSubscriptionPlan(planId, billingCycle);
            
            if (!plan) {
                throw new Error(`Invalid plan: ${planId}`);
            }
            
            // In a real implementation, this would call a backend API
            // to create a Stripe checkout session
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return {
                success: true,
                sessionId: `checkout_${Date.now()}`,
                plan: plan,
                redirectUrl: '#/checkout',
                amount: plan.price
            };
        } catch (error) {
            console.error('Failed to create checkout session:', error);
            throw error;
        }
    }

    /**
     * Process a successful payment (simulated)
     * @param {string} planId - The plan ID
     * @param {string} billingCycle - 'monthly' or 'annual'
     * @param {Object} customerInfo - Customer information
     * @returns {Promise<Object>} Payment result
     */
    async processPayment(planId, billingCycle = 'monthly', customerInfo = {}) {
        try {
            const plan = this.getSubscriptionPlan(planId, billingCycle);
            
            if (!plan) {
                throw new Error(`Invalid plan: ${planId}`);
            }
            
            // Update customer info
            this.customerInfo = {
                ...this.customerInfo,
                ...customerInfo,
                updatedAt: new Date().toISOString()
            };
            
            // Create subscription
            const startDate = new Date();
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + plan.duration);
            
            this.subscriptionInfo = {
                planId: plan.id,
                planName: plan.name,
                billingCycle,
                price: plan.price,
                features: plan.features,
                startDate: startDate.toISOString(),
                expiryDate: expiryDate.toISOString(),
                active: true,
                paymentId: `payment_${Date.now()}`
            };
            
            // Add to payment history
            this.paymentHistory.push({
                id: this.subscriptionInfo.paymentId,
                planId: plan.id,
                planName: plan.name,
                amount: plan.price,
                date: new Date().toISOString(),
                status: 'success'
            });
            
            // Save to storage
            this.saveSubscription();
            
            return {
                success: true,
                subscription: this.subscriptionInfo,
                transactionId: this.subscriptionInfo.paymentId
            };
        } catch (error) {
            console.error('Failed to process payment:', error);
            throw error;
        }
    }

    /**
     * Cancel the current subscription
     * @returns {Promise<Object>} Cancellation result
     */
    async cancelSubscription() {
        if (!this.subscriptionInfo) {
            throw new Error('No active subscription to cancel');
        }
        
        try {
            // In a real implementation, this would call a backend API
            // to cancel the subscription in Stripe
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Update subscription status
            this.subscriptionInfo.active = false;
            this.subscriptionInfo.canceledAt = new Date().toISOString();
            
            // Save to storage
            this.saveSubscription();
            
            return {
                success: true,
                message: 'Subscription canceled successfully'
            };
        } catch (error) {
            console.error('Failed to cancel subscription:', error);
            throw error;
        }
    }

    /**
     * Get payment history
     * @param {number} limit - Maximum number of payments to return
     * @returns {Array} Payment history
     */
    getPaymentHistory(limit = 10) {
        return this.paymentHistory.slice(0, limit);
    }

    /**
     * Get customer information
     * @returns {Object|null} Customer information or null if not available
     */
    getCustomerInfo() {
        return this.customerInfo;
    }

    /**
     * Update customer information
     * @param {Object} customerInfo - New customer information
     * @returns {Object} Updated customer info
     */
    updateCustomerInfo(customerInfo) {
        this.customerInfo = {
            ...this.customerInfo,
            ...customerInfo,
            updatedAt: new Date().toISOString()
        };
        
        this.saveSubscription();
        return this.customerInfo;
    }
}

// Export singleton instance
const paymentStatus = new PaymentStatus();
export default paymentStatus;
/**
 * JAAT-AI FastSpring Subscription Service
 * Handles all subscription management functionality through FastSpring API
 * Author: JAAT-AI Professional Development Team
 */

class FastSpringService {
  constructor() {
    // Credentials are accessed via environment variables for security
    this.username = process.env.FASTSPRING_USERNAME;
    this.password = process.env.FASTSPRING_PASSWORD;
    this.apiBase = 'https://api.fastspring.com';
    this.storeUrl = 'https://JAAT-AI.onfastspring.com/';
    this.initialized = false;
    
    // Subscription plans
    this.plans = {
      freeTrial: {
        id: 'jaat-ai-free-trial',
        name: 'Free Trial',
        description: '1 Day Access - Basic features to try out the platform',
        price: 0,
        duration: '1 day',
        features: [
          'Access to basic AI modes',
          'Limited message quota',
          'Standard response time',
          'Basic customization options'
        ]
      },
      basic: {
        id: 'jaat-ai-basic-plan',
        name: 'Basic Plan',
        description: 'Essential features for regular users',
        price: 49,
        billingPeriod: 'month',
        features: [
          'Access to 10 AI modes',
          'Standard message quota',
          'Enhanced response quality',
          'Basic customization options',
          'Email support'
        ]
      },
      premium: {
        id: 'jaat-ai-premium-plan',
        name: 'Premium Plan',
        description: 'Full access to all AI modes and features',
        price: 99,
        billingPeriod: 'month',
        features: [
          'Access to all AI modes',
          'Extended message quota',
          'Priority response time',
          'Advanced customization options',
          'Priority email support',
          'API access'
        ]
      },
      enterprise: {
        id: 'jaat-ai-enterprise-plan',
        name: 'Enterprise Plan',
        description: 'Team access and advanced customization',
        price: 199,
        billingPeriod: 'month',
        features: [
          'Team access (up to 10 users)',
          'Unlimited message quota',
          'Fastest response time',
          'Full customization capabilities',
          'Dedicated support agent',
          'Advanced analytics',
          'White-labeled API access',
          'Custom AI training options'
        ]
      }
    };
    
    // UPI payment details - stored securely and only accessed on backend
    this.upiDetails = {
      id: '9813072447@fam',
      displayName: 'JAAT-AI Payment Service'
    };
  }
  
  /**
   * Initialize the FastSpring service
   * @returns {Promise<boolean>} Success status
   */
  async initialize() {
    if (this.initialized) return true;
    
    // Validate credentials are available
    if (!this.username || !this.password) {
      console.error('FastSpring credentials not available. Subscription features will be limited.');
      return false;
    }
    
    // Attempt to authenticate with FastSpring
    try {
      const authResponse = await this.makeRequest('/auth/validate', 'GET');
      if (authResponse && authResponse.success) {
        console.log('FastSpring service initialized successfully');
        this.initialized = true;
        return true;
      }
      console.error('FastSpring authentication failed');
      return false;
    } catch (error) {
      console.error('FastSpring initialization error:', error.message);
      return false;
    }
  }
  
  /**
   * Make an authenticated request to the FastSpring API
   * @param {string} endpoint - API endpoint
   * @param {string} method - HTTP method
   * @param {Object} data - Request payload
   * @returns {Promise<Object>} API response
   */
  async makeRequest(endpoint, method = 'GET', data = null) {
    const url = `${this.apiBase}${endpoint}`;
    const auth = Buffer.from(`${this.username}:${this.password}`).toString('base64');
    
    const options = {
      method,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    };
    
    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }
    
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`FastSpring API error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('FastSpring API request failed:', error.message);
      throw error;
    }
  }
  
  /**
   * Get all available subscription plans
   * @returns {Object} Subscription plans
   */
  getSubscriptionPlans() {
    return this.plans;
  }
  
  /**
   * Get details for a specific subscription plan
   * @param {string} planId - Plan identifier
   * @returns {Object|null} Plan details or null if not found
   */
  getPlanDetails(planId) {
    const plan = Object.values(this.plans).find(p => p.id === planId);
    return plan || null;
  }
  
  /**
   * Create a subscription for a user
   * @param {string} planId - Plan identifier
   * @param {Object} user - User information
   * @returns {Promise<Object>} Subscription result
   */
  async createSubscription(planId, user) {
    if (!this.initialized) await this.initialize();
    
    const plan = this.getPlanDetails(planId);
    if (!plan) {
      throw new Error(`Invalid plan ID: ${planId}`);
    }
    
    // Create subscription via FastSpring API
    try {
      const subscriptionData = {
        account: {
          contact: {
            email: user.email,
            firstName: user.firstName || '',
            lastName: user.lastName || ''
          }
        },
        items: [
          {
            product: plan.id,
            quantity: 1
          }
        ]
      };
      
      const result = await this.makeRequest('/orders', 'POST', subscriptionData);
      
      return {
        success: true,
        subscription: {
          id: result.id,
          planId: planId,
          planName: plan.name,
          created: new Date().toISOString(),
          status: 'active'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Cancel a user's subscription
   * @param {string} subscriptionId - Subscription identifier
   * @returns {Promise<Object>} Cancel result
   */
  async cancelSubscription(subscriptionId) {
    if (!this.initialized) await this.initialize();
    
    try {
      const result = await this.makeRequest(`/subscriptions/${subscriptionId}`, 'DELETE');
      
      return {
        success: true,
        message: 'Subscription canceled successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Get subscription status for a user
   * @param {string} subscriptionId - Subscription identifier
   * @returns {Promise<Object>} Subscription status
   */
  async getSubscriptionStatus(subscriptionId) {
    if (!this.initialized) await this.initialize();
    
    try {
      const result = await this.makeRequest(`/subscriptions/${subscriptionId}`, 'GET');
      
      return {
        success: true,
        subscription: {
          id: result.id,
          planId: result.product,
          status: result.state,
          nextBilling: result.next_billing_date,
          created: result.begin
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Update a user's subscription plan
   * @param {string} subscriptionId - Subscription identifier
   * @param {string} newPlanId - New plan identifier
   * @returns {Promise<Object>} Update result
   */
  async updateSubscription(subscriptionId, newPlanId) {
    if (!this.initialized) await this.initialize();
    
    const plan = this.getPlanDetails(newPlanId);
    if (!plan) {
      throw new Error(`Invalid plan ID: ${newPlanId}`);
    }
    
    try {
      const updateData = {
        product: plan.id
      };
      
      const result = await this.makeRequest(`/subscriptions/${subscriptionId}`, 'POST', updateData);
      
      return {
        success: true,
        subscription: {
          id: result.id,
          planId: newPlanId,
          planName: plan.name,
          status: result.state
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Generate a secure payment link for direct checkout
   * @param {string} planId - Plan identifier
   * @param {Object} user - User information
   * @returns {string} Checkout URL
   */
  generateCheckoutUrl(planId, user) {
    const plan = this.getPlanDetails(planId);
    if (!plan) {
      throw new Error(`Invalid plan ID: ${planId}`);
    }
    
    let checkoutUrl = `${this.storeUrl}/popup-jaat-ai-${planId}`;
    
    // Add user information if available
    if (user && user.email) {
      checkoutUrl += `?contact_email=${encodeURIComponent(user.email)}`;
      
      if (user.firstName) {
        checkoutUrl += `&contact_firstName=${encodeURIComponent(user.firstName)}`;
      }
      
      if (user.lastName) {
        checkoutUrl += `&contact_lastName=${encodeURIComponent(user.lastName)}`;
      }
    }
    
    return checkoutUrl;
  }
  
  /**
   * Process a direct UPI payment (Indian users) - Backend only
   * Used for manual payments via UPI
   * @param {Object} paymentDetails - Payment details
   * @returns {Object} UPI payment instructions
   */
  processUpiPayment(paymentDetails) {
    // Generate a unique reference ID for this transaction
    const referenceId = `JAAT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Store payment record in database
    // In a real implementation, this would be stored in a secure database
    
    // Return payment instructions (UPI ID hidden from frontend)
    return {
      success: true,
      referenceId: referenceId,
      instructions: {
        message: 'Please complete your payment using the following details',
        amount: paymentDetails.amount,
        reference: referenceId,
        verificationRequired: true
      }
    };
  }
  
  /**
   * Get the UPI ID for the payment receiver
   * This is a protected method that should only be called from the server
   * @returns {string} UPI ID
   */
  getUpiId() {
    // This should only be accessible on the backend to protect the UPI ID
    return this.upiDetails.id;
  }
  
  /**
   * Verify a manual payment based on transaction reference
   * @param {string} referenceId - Payment reference ID
   * @param {Object} verificationData - Verification information
   * @returns {Promise<Object>} Verification result
   */
  async verifyManualPayment(referenceId, verificationData) {
    // In a real implementation, this would verify against a database record
    // and possibly confirm with a payment gateway
    
    // For demonstration purposes, we'll simulate a successful verification
    const isValid = referenceId && referenceId.startsWith('JAAT-');
    
    if (isValid) {
      return {
        success: true,
        message: 'Payment verified successfully',
        subscription: {
          id: `sub-${referenceId}`,
          planId: verificationData.planId,
          created: new Date().toISOString(),
          status: 'active'
        }
      };
    } else {
      return {
        success: false,
        error: 'Invalid payment reference'
      };
    }
  }
}

// Export the service
module.exports = new FastSpringService();
/**
 * JAAT-AI Subscription UI Component
 * Provides subscription management interface for users
 * Author: JAAT-AI Professional Development Team
 */

// Import the FastSpring service
const fastSpringService = require('./fastspring-service');

class SubscriptionUI {
  constructor() {
    this.container = null;
    this.currentUser = null;
    this.initialized = false;
    
    // Store DOM references
    this.elements = {
      planCards: {},
      checkoutButtons: {},
      upiPaymentForm: null,
      subscriptionInfo: null
    };
    
    // Payment method options
    this.paymentMethods = [
      { id: 'credit-card', name: 'Credit/Debit Card', icon: 'credit-card' },
      { id: 'paypal', name: 'PayPal', icon: 'paypal' },
      { id: 'upi', name: 'UPI Payment (India Only)', icon: 'bank-transfer' }
    ];
    
    // Company name
    this.companyName = 'JAAT-AI';
  }
  
  /**
   * Initialize the subscription UI
   * @param {HTMLElement} container - Container element
   * @param {Object} user - Current user information
   * @returns {Promise<boolean>} Success status
   */
  async initialize(container, user) {
    if (!container) return false;
    
    this.container = container;
    this.currentUser = user || {};
    
    // Attempt to initialize FastSpring service
    await fastSpringService.initialize();
    
    // Render subscription UI
    this.render();
    this.attachEventListeners();
    
    this.initialized = true;
    return true;
  }
  
  /**
   * Render the subscription UI
   */
  render() {
    if (!this.container) return;
    
    // Get subscription plans
    const plans = fastSpringService.getSubscriptionPlans();
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create main container
    const wrapper = document.createElement('div');
    wrapper.className = 'jaat-subscription-wrapper';
    wrapper.innerHTML = `
      <div class="subscription-header">
        <h2>Choose Your JAAT-AI Subscription</h2>
        <p>Select the plan that best fits your needs and unlock the full power of JAAT-AI</p>
      </div>
      
      <div class="subscription-plans" id="subscription-plans">
        <!-- Plan cards will be inserted here -->
      </div>
      
      <div class="subscription-info" id="subscription-info">
        <!-- Subscription information will be displayed here if user has an active subscription -->
      </div>
      
      <div class="payment-methods" id="payment-methods" style="display: none;">
        <h3>Select Payment Method</h3>
        <div class="payment-method-options">
          ${this.paymentMethods.map(method => `
            <div class="payment-method-option" data-method="${method.id}">
              <span class="payment-icon ${method.icon}"></span>
              <span class="payment-name">${method.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="upi-payment-form" id="upi-payment-form" style="display: none;">
        <h3>UPI Payment</h3>
        <p>Complete your payment using the following UPI details:</p>
        <div class="upi-details">
          <p>Reference ID: <span id="upi-reference"></span></p>
          <p>Amount: <span id="upi-amount"></span></p>
          <div class="verification-form">
            <h4>Verify Payment</h4>
            <input type="text" id="upi-transaction-id" placeholder="UPI Transaction ID" />
            <button id="verify-upi-payment">Verify Payment</button>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(wrapper);
    
    // Get plans container
    const plansContainer = document.getElementById('subscription-plans');
    
    // Render each plan card
    Object.values(plans).forEach(plan => {
      const planCard = document.createElement('div');
      planCard.className = 'plan-card';
      planCard.dataset.planId = plan.id;
      
      // Add special highlight for recommended plan (Premium)
      if (plan.id === 'jaat-ai-premium-plan') {
        planCard.classList.add('recommended-plan');
      }
      
      planCard.innerHTML = `
        <div class="plan-header">
          <h3 class="plan-name">${plan.name}</h3>
          ${plan.id === 'jaat-ai-premium-plan' ? '<span class="recommended-badge">Recommended</span>' : ''}
        </div>
        <div class="plan-price">
          ${plan.price > 0 ? `$${plan.price}<span class="billing-period">/${plan.billingPeriod || 'once'}</span>` : 'Free'}
        </div>
        <div class="plan-description">${plan.description}</div>
        <ul class="plan-features">
          ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="plan-action">
          <button class="subscribe-button" data-plan-id="${plan.id}">
            ${plan.price > 0 ? 'Subscribe Now' : 'Start Free Trial'}
          </button>
        </div>
      `;
      
      plansContainer.appendChild(planCard);
      
      // Store reference to the plan card
      this.elements.planCards[plan.id] = planCard;
      
      // Store reference to the checkout button
      this.elements.checkoutButtons[plan.id] = planCard.querySelector(`.subscribe-button[data-plan-id="${plan.id}"]`);
    });
    
    // Store references to other elements
    this.elements.paymentMethods = document.getElementById('payment-methods');
    this.elements.upiPaymentForm = document.getElementById('upi-payment-form');
    this.elements.subscriptionInfo = document.getElementById('subscription-info');
    
    // Add CSS styles
    this.addStyles();
    
    // Update subscription info if user has an active subscription
    this.updateSubscriptionInfo();
  }
  
  /**
   * Add CSS styles for the subscription UI
   */
  addStyles() {
    // Check if styles already exist
    if (document.getElementById('jaat-subscription-styles')) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'jaat-subscription-styles';
    styleEl.textContent = `
      .jaat-subscription-wrapper {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
        color: #333;
      }
      
      .subscription-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      
      .subscription-header h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #2563eb;
        font-weight: 700;
      }
      
      .subscription-header p {
        font-size: 1.2rem;
        color: #4b5563;
        max-width: 700px;
        margin: 0 auto;
      }
      
      .subscription-plans {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }
      
      .plan-card {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
      }
      
      .plan-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }
      
      .recommended-plan {
        border: 2px solid #2563eb;
        transform: scale(1.03);
      }
      
      .recommended-plan:hover {
        transform: translateY(-5px) scale(1.03);
      }
      
      .recommended-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #2563eb;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
      }
      
      .plan-header {
        margin-bottom: 1.5rem;
        position: relative;
      }
      
      .plan-name {
        font-size: 1.8rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.5rem;
      }
      
      .plan-price {
        font-size: 2.5rem;
        font-weight: 700;
        color: #2563eb;
        margin-bottom: 1rem;
      }
      
      .billing-period {
        font-size: 1rem;
        font-weight: normal;
        color: #6b7280;
      }
      
      .plan-description {
        margin-bottom: 1.5rem;
        color: #4b5563;
      }
      
      .plan-features {
        list-style-type: none;
        padding: 0;
        margin: 0 0 2rem 0;
        flex-grow: 1;
      }
      
      .plan-features li {
        padding: 0.5rem 0;
        position: relative;
        padding-left: 1.8rem;
        color: #4b5563;
      }
      
      .plan-features li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #2563eb;
        font-weight: bold;
      }
      
      .plan-action {
        margin-top: auto;
      }
      
      .subscribe-button {
        width: 100%;
        padding: 1rem;
        border: none;
        border-radius: 8px;
        background: #2563eb;
        color: white;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      
      .subscribe-button:hover {
        background: #1d4ed8;
      }
      
      .payment-methods {
        background: #f9fafb;
        border-radius: 12px;
        padding: 2rem;
        margin-bottom: 2rem;
      }
      
      .payment-methods h3 {
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: #1f2937;
      }
      
      .payment-method-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }
      
      .payment-method-option {
        padding: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: white;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: border-color 0.3s ease, background 0.3s ease;
      }
      
      .payment-method-option:hover {
        border-color: #2563eb;
        background: #f0f9ff;
      }
      
      .payment-method-option.selected {
        border-color: #2563eb;
        background: #eff6ff;
      }
      
      .payment-icon {
        margin-right: 1rem;
        font-size: 1.5rem;
      }
      
      .upi-payment-form {
        background: #f9fafb;
        border-radius: 12px;
        padding: 2rem;
        margin-bottom: 2rem;
      }
      
      .upi-payment-form h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: #1f2937;
      }
      
      .upi-details {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid #e5e7eb;
      }
      
      .upi-details p {
        margin: 0.5rem 0;
      }
      
      .verification-form {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid #e5e7eb;
      }
      
      .verification-form h4 {
        margin-top: 0;
        margin-bottom: 1rem;
      }
      
      .verification-form input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        margin-bottom: 1rem;
      }
      
      .verification-form button {
        padding: 0.75rem 1.5rem;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      
      .verification-form button:hover {
        background: #1d4ed8;
      }
      
      .subscription-info {
        background: #f0f9ff;
        border-radius: 12px;
        padding: 2rem;
        margin-bottom: 2rem;
        border: 1px solid #bae6fd;
      }
      
      .subscription-info h3 {
        margin-top: 0;
        color: #0369a1;
      }
      
      .subscription-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
      }
      
      .subscription-detail-item {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      }
      
      .detail-label {
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
      }
      
      .detail-value {
        font-weight: 600;
        color: #1f2937;
      }
      
      .subscription-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
      }
      
      .subscription-action-button {
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .button-primary {
        background: #0ea5e9;
        color: white;
        border: none;
      }
      
      .button-primary:hover {
        background: #0284c7;
      }
      
      .button-secondary {
        background: white;
        color: #0ea5e9;
        border: 1px solid #0ea5e9;
      }
      
      .button-secondary:hover {
        background: #f0f9ff;
      }
      
      .button-danger {
        background: white;
        color: #ef4444;
        border: 1px solid #ef4444;
      }
      
      .button-danger:hover {
        background: #fef2f2;
      }
      
      @media (max-width: 768px) {
        .subscription-plans {
          grid-template-columns: 1fr;
        }
        
        .plan-card {
          max-width: 400px;
          margin: 0 auto;
        }
        
        .recommended-plan {
          transform: none;
          order: -1;
        }
        
        .recommended-plan:hover {
          transform: translateY(-5px);
        }
      }
    `;
    
    document.head.appendChild(styleEl);
  }
  
  /**
   * Attach event listeners to UI elements
   */
  attachEventListeners() {
    // Add click handlers for subscription buttons
    Object.keys(this.elements.checkoutButtons).forEach(planId => {
      const button = this.elements.checkoutButtons[planId];
      if (button) {
        button.addEventListener('click', () => this.handleSubscription(planId));
      }
    });
    
    // Add click handlers for payment method options
    const paymentOptions = document.querySelectorAll('.payment-method-option');
    paymentOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove selected class from all options
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        option.classList.add('selected');
        
        // Handle payment method selection
        const method = option.dataset.method;
        this.handlePaymentMethodSelection(method);
      });
    });
    
    // Add click handler for UPI payment verification
    const verifyButton = document.getElementById('verify-upi-payment');
    if (verifyButton) {
      verifyButton.addEventListener('click', () => this.verifyUpiPayment());
    }
  }
  
  /**
   * Handle subscription button click
   * @param {string} planId - Plan identifier
   */
  async handleSubscription(planId) {
    // Get plan details
    const plan = fastSpringService.getPlanDetails(planId);
    if (!plan) {
      console.error(`Invalid plan ID: ${planId}`);
      return;
    }
    
    // Check if user is logged in
    if (!this.currentUser || !this.currentUser.id) {
      alert('Please log in to subscribe');
      return;
    }
    
    // Show payment methods for paid plans
    if (plan.price > 0) {
      this.selectedPlan = plan;
      this.elements.paymentMethods.style.display = 'block';
      this.elements.paymentMethods.scrollIntoView({ behavior: 'smooth' });
    } else {
      // For free trial, direct subscription
      try {
        const result = await fastSpringService.createSubscription(planId, this.currentUser);
        if (result.success) {
          alert(`Successfully subscribed to ${plan.name}`);
          this.updateSubscriptionInfo(result.subscription);
        } else {
          alert(`Subscription failed: ${result.error}`);
        }
      } catch (error) {
        console.error('Subscription error:', error);
        alert(`Subscription error: ${error.message}`);
      }
    }
  }
  
  /**
   * Handle payment method selection
   * @param {string} method - Payment method identifier
   */
  handlePaymentMethodSelection(method) {
    if (!this.selectedPlan) return;
    
    // Handle different payment methods
    switch (method) {
      case 'credit-card':
      case 'paypal':
        // For FastSpring handled payments, redirect to checkout
        const checkoutUrl = fastSpringService.generateCheckoutUrl(
          this.selectedPlan.id,
          this.currentUser
        );
        window.open(checkoutUrl, '_blank');
        break;
        
      case 'upi':
        // For UPI payments, show UPI form
        this.showUpiPaymentForm();
        break;
        
      default:
        alert('Please select a valid payment method');
    }
  }
  
  /**
   * Show UPI payment form
   */
  showUpiPaymentForm() {
    if (!this.selectedPlan) return;
    
    // Show UPI form
    this.elements.upiPaymentForm.style.display = 'block';
    this.elements.upiPaymentForm.scrollIntoView({ behavior: 'smooth' });
    
    // Process UPI payment (backend call)
    const paymentDetails = {
      planId: this.selectedPlan.id,
      userId: this.currentUser.id,
      amount: this.selectedPlan.price,
      currency: 'USD'
    };
    
    // This would normally be a server call
    // For demo purposes, we'll simulate it
    const result = fastSpringService.processUpiPayment(paymentDetails);
    
    if (result.success) {
      // Update UPI form with payment details
      document.getElementById('upi-reference').textContent = result.referenceId;
      document.getElementById('upi-amount').textContent = `$${paymentDetails.amount}`;
      
      // Store reference ID for verification
      this.upiReferenceId = result.referenceId;
    } else {
      alert(`UPI payment processing error: ${result.error}`);
      this.elements.upiPaymentForm.style.display = 'none';
    }
  }
  
  /**
   * Verify UPI payment
   */
  async verifyUpiPayment() {
    if (!this.upiReferenceId || !this.selectedPlan) return;
    
    const transactionId = document.getElementById('upi-transaction-id').value;
    if (!transactionId) {
      alert('Please enter the UPI transaction ID');
      return;
    }
    
    // Verification data
    const verificationData = {
      transactionId,
      planId: this.selectedPlan.id,
      userId: this.currentUser.id
    };
    
    // Verify payment (backend call)
    try {
      const result = await fastSpringService.verifyManualPayment(
        this.upiReferenceId,
        verificationData
      );
      
      if (result.success) {
        alert('Payment verified successfully!');
        this.elements.upiPaymentForm.style.display = 'none';
        this.elements.paymentMethods.style.display = 'none';
        
        // Update subscription info
        this.updateSubscriptionInfo(result.subscription);
      } else {
        alert(`Payment verification failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      alert(`Payment verification error: ${error.message}`);
    }
  }
  
  /**
   * Update subscription information display
   * @param {Object} subscription - Subscription details
   */
  updateSubscriptionInfo(subscription) {
    // If no subscription info element, or no subscription, hide and return
    if (!this.elements.subscriptionInfo || (!subscription && !this.currentUser.subscription)) {
      this.elements.subscriptionInfo.style.display = 'none';
      return;
    }
    
    // Use provided subscription data or from current user
    const subData = subscription || this.currentUser.subscription;
    if (!subData) {
      this.elements.subscriptionInfo.style.display = 'none';
      return;
    }
    
    // Get plan details
    const plan = fastSpringService.getPlanDetails(subData.planId);
    
    // Show subscription info
    this.elements.subscriptionInfo.style.display = 'block';
    this.elements.subscriptionInfo.innerHTML = `
      <h3>Your Current Subscription</h3>
      <div class="subscription-details">
        <div class="subscription-detail-item">
          <div class="detail-label">Plan</div>
          <div class="detail-value">${plan ? plan.name : subData.planId}</div>
        </div>
        <div class="subscription-detail-item">
          <div class="detail-label">Status</div>
          <div class="detail-value">${subData.status}</div>
        </div>
        <div class="subscription-detail-item">
          <div class="detail-label">Started</div>
          <div class="detail-value">${new Date(subData.created).toLocaleDateString()}</div>
        </div>
        ${subData.nextBilling ? `
          <div class="subscription-detail-item">
            <div class="detail-label">Next Billing</div>
            <div class="detail-value">${new Date(subData.nextBilling).toLocaleDateString()}</div>
          </div>
        ` : ''}
      </div>
      <div class="subscription-actions">
        ${subData.status === 'active' ? `
          <button class="subscription-action-button button-primary" id="upgrade-subscription">Upgrade Plan</button>
          <button class="subscription-action-button button-secondary" id="manage-subscription">Manage Subscription</button>
          <button class="subscription-action-button button-danger" id="cancel-subscription">Cancel Subscription</button>
        ` : ''}
      </div>
    `;
    
    // Add event listeners for subscription actions
    const upgradeButton = document.getElementById('upgrade-subscription');
    if (upgradeButton) {
      upgradeButton.addEventListener('click', () => this.showUpgradeOptions());
    }
    
    const manageButton = document.getElementById('manage-subscription');
    if (manageButton) {
      manageButton.addEventListener('click', () => this.manageSubscription());
    }
    
    const cancelButton = document.getElementById('cancel-subscription');
    if (cancelButton) {
      cancelButton.addEventListener('click', () => this.cancelSubscription());
    }
    
    // Scroll to subscription info
    this.elements.subscriptionInfo.scrollIntoView({ behavior: 'smooth' });
  }
  
  /**
   * Show upgrade options for current subscription
   */
  showUpgradeOptions() {
    // Get current plan
    const currentPlanId = this.currentUser.subscription.planId;
    const currentPlan = fastSpringService.getPlanDetails(currentPlanId);
    
    // If enterprise plan, nothing to upgrade to
    if (currentPlanId === 'jaat-ai-enterprise-plan') {
      alert('You are already on our highest tier plan');
      return;
    }
    
    // Show options based on current plan
    const availablePlans = Object.values(fastSpringService.getSubscriptionPlans())
      .filter(plan => plan.price > (currentPlan ? currentPlan.price : 0));
    
    // Highlight available upgrade options
    Object.values(this.elements.planCards).forEach(card => {
      card.classList.remove('highlight-upgrade');
      
      // Add highlight to upgrade options
      const planId = card.dataset.planId;
      const isPotentialUpgrade = availablePlans.some(plan => plan.id === planId);
      
      if (isPotentialUpgrade) {
        card.classList.add('highlight-upgrade');
        card.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  /**
   * Manage current subscription
   */
  manageSubscription() {
    if (!this.currentUser || !this.currentUser.subscription) return;
    
    // Open FastSpring customer portal
    window.open('https://jaat-ai.onfastspring.com/account', '_blank');
  }
  
  /**
   * Cancel the current subscription
   */
  async cancelSubscription() {
    if (!this.currentUser || !this.currentUser.subscription) return;
    
    // Confirm cancellation
    if (!confirm('Are you sure you want to cancel your subscription? This will take effect at the end of your current billing period.')) {
      return;
    }
    
    // Cancel subscription
    try {
      const result = await fastSpringService.cancelSubscription(
        this.currentUser.subscription.id
      );
      
      if (result.success) {
        alert('Your subscription has been canceled');
        
        // Update subscription status
        this.currentUser.subscription.status = 'canceled';
        this.updateSubscriptionInfo();
      } else {
        alert(`Cancellation failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Cancellation error:', error);
      alert(`Cancellation error: ${error.message}`);
    }
  }
  
  /**
   * Update the current user
   * @param {Object} user - User information
   */
  updateUser(user) {
    this.currentUser = user;
    if (this.initialized) {
      this.updateSubscriptionInfo();
    }
  }
  
  /**
   * Clean up subscription UI
   */
  cleanup() {
    if (this.container) {
      this.container.innerHTML = '';
    }
    
    this.initialized = false;
  }
}

// Export the UI component
module.exports = new SubscriptionUI();
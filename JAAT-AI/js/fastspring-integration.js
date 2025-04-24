/**
 * JAAT-AI FastSpring Integration
 * Handles subscription management and payment processing through FastSpring
 */

// FastSpring API Configuration (connection details stored securely server-side)
const FastSpringConfig = {
  // These values will be set from environment variables on the server side
  // Never expose actual API keys in client-side code
  username: null, // Set through secure server proxy 
  password: null, // Set through secure server proxy
  storeId: 'jaat-ai',
  secureMode: true,
  testMode: false,
  debug: false
};

// Establish a namespace for the FastSpring integration
const FastSpringService = (() => {
  /**
   * Initialize the FastSpring service
   * @returns {Promise} Promise that resolves when initialization is complete
   */
  async function initialize() {
    try {
      // Fetch config from server (proxies the actual credentials)
      const config = await fetchConfig();
      if (!config.available) {
        console.warn('FastSpring subscription system not configured');
        return false;
      }
      
      console.log('FastSpring subscription system initialized');
      loadFastSpringLibrary();
      return true;
    } catch (error) {
      console.error('Failed to initialize FastSpring:', error);
      return false;
    }
  }
  
  /**
   * Fetch FastSpring configuration from server
   * This avoids exposing credentials in client-side code
   * @returns {Promise<Object>} Configuration object
   */
  async function fetchConfig() {
    try {
      const response = await fetch('/api/config/fastspring');
      if (!response.ok) {
        throw new Error('Failed to fetch FastSpring configuration');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching FastSpring config:', error);
      return { available: false };
    }
  }
  
  /**
   * Load the FastSpring library dynamically
   */
  function loadFastSpringLibrary() {
    const script = document.createElement('script');
    script.src = 'https://d1f8f9xcsvx3ha.cloudfront.net/sbl/0.8.3/fastspring-builder.min.js';
    script.id = 'fastspring-script';
    script.defer = true;
    script.onload = setupFastSpringEvents;
    document.head.appendChild(script);
  }
  
  /**
   * Set up FastSpring event handlers
   */
  function setupFastSpringEvents() {
    if (typeof fastspring === 'undefined') {
      console.error('FastSpring library not loaded');
      return;
    }
    
    fastspring.builder.secure = FastSpringConfig.secureMode;
    fastspring.builder.debug = FastSpringConfig.debug;
    fastspring.builder.testMode = FastSpringConfig.testMode;
    
    fastspring.builder.add({
      'products': {
        'jaat-ai-monthly': {
          'path': 'jaat-ai-monthly',
          'priceValue': 19.99,
          'discountValue': 0
        },
        'jaat-ai-annual': {
          'path': 'jaat-ai-annual',
          'priceValue': 199.99,
          'discountValue': 39.99
        },
        'jaat-ai-enterprise': {
          'path': 'jaat-ai-enterprise',
          'priceValue': 49.99,
          'discountValue': 0
        }
      }
    });
    
    // Setup event listeners
    fastspring.builder.checkout.complete(handleCheckoutComplete);
    fastspring.builder.checkout.error(handleCheckoutError);
  }
  
  /**
   * Handle successful checkout completion
   * @param {Object} data FastSpring checkout data
   */
  function handleCheckoutComplete(data) {
    console.log('Checkout complete:', data);
    
    if (data && data.id) {
      // Record subscription in our system
      recordSubscription(data)
        .then(result => {
          if (result.success) {
            // Redirect to success page or update UI
            window.location.href = '/subscription/success?order=' + data.id;
          } else {
            console.error('Failed to record subscription:', result.error);
            showErrorMessage('Your payment was processed, but we had trouble updating your account. Please contact support.');
          }
        })
        .catch(error => {
          console.error('Error recording subscription:', error);
          showErrorMessage('Your payment was processed, but we had trouble updating your account. Please contact support.');
        });
    }
  }
  
  /**
   * Handle checkout errors
   * @param {Object} error FastSpring error data
   */
  function handleCheckoutError(error) {
    console.error('Checkout error:', error);
    showErrorMessage('There was an error processing your payment. Please try again or contact support.');
  }
  
  /**
   * Record subscription in our system
   * @param {Object} data Subscription data from FastSpring
   * @returns {Promise<Object>} Result of the operation
   */
  async function recordSubscription(data) {
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: data.id,
          plan: data.products[0].product,
          startDate: new Date().toISOString(),
          status: 'active',
          details: data
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error recording subscription:', error);
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Open the FastSpring popup for a specific product
   * @param {string} productId The product ID to purchase
   */
  function purchaseProduct(productId) {
    if (typeof fastspring === 'undefined') {
      console.error('FastSpring library not loaded');
      showErrorMessage('Payment system is not available right now. Please try again later.');
      return;
    }
    
    // Set the current user data
    const user = getCurrentUser();
    if (user) {
      fastspring.builder.push({
        'tags': {
          'userId': user.id
        },
        'recipient': {
          'email': user.email,
          'firstName': user.firstName || '',
          'lastName': user.lastName || ''
        }
      });
    }
    
    // Launch the checkout
    fastspring.builder.checkout(productId);
  }
  
  /**
   * Get information about the current user
   * @returns {Object|null} User information or null if not logged in
   */
  function getCurrentUser() {
    // This would typically come from your auth system
    // For now, return placeholder data or fetch from a user API endpoint
    return {
      id: 'user-123',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe'
    };
  }
  
  /**
   * Display an error message to the user
   * @param {string} message The error message to display
   */
  function showErrorMessage(message) {
    // Implementation depends on your UI, could show a toast, modal, etc.
    alert(message);
  }
  
  /**
   * Get active subscription for the current user
   * @returns {Promise<Object>} User's subscription data
   */
  async function getUserSubscription() {
    try {
      const response = await fetch('/api/user/subscription');
      if (!response.ok) {
        throw new Error('Failed to fetch subscription data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching subscription:', error);
      return { status: 'error', message: error.message };
    }
  }
  
  /**
   * Cancel the user's subscription
   * @returns {Promise<Object>} Result of the cancellation
   */
  async function cancelSubscription() {
    try {
      const response = await fetch('/api/user/subscription/cancel', {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Upgrade user's subscription plan
   * @param {string} newPlanId The ID of the new plan
   * @returns {Promise<Object>} Result of the upgrade
   */
  async function upgradePlan(newPlanId) {
    try {
      const response = await fetch('/api/user/subscription/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ planId: newPlanId })
      });
      
      if (!response.ok) {
        throw new Error('Failed to upgrade subscription');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Public API
  return {
    initialize,
    purchaseProduct,
    getUserSubscription,
    cancelSubscription,
    upgradePlan
  };
})();

// Auto-initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  FastSpringService.initialize()
    .then(initialized => {
      if (initialized) {
        console.log('FastSpring integration ready');
      } else {
        console.warn('FastSpring integration failed to initialize');
      }
    });
});
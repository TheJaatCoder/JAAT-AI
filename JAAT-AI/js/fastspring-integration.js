/**
 * JAAT-AI FastSpring Integration
 * Handles subscription management through FastSpring
 */

// Create FastSpring integration namespace
window.FastSpringIntegration = (function() {
    // Variable to store the FastSpring storefront ID
    let storefrontId = null;

    // Plans configuration - maps our internal plan IDs to FastSpring products
    const plans = {
        premium: {
            monthly: 'jaat-premium-monthly',
            annual: 'jaat-premium-annual',
        },
        enterprise: {
            monthly: 'jaat-enterprise-monthly',
            annual: 'jaat-enterprise-annual',
        }
    };

    /**
     * Initialize FastSpring integration
     * @param {string} customStorefrontId - Custom storefront ID (optional)
     */
    function initialize(customStorefrontId = null) {
        // Get storefront ID from server or use a custom one if provided
        fetchStorefrontId(customStorefrontId)
            .then(id => {
                storefrontId = id;
                
                // Load FastSpring script if not already loaded
                if (!document.getElementById('fsc-api')) {
                    loadFastSpringScript(storefrontId);
                }
                
                // Configure FastSpring helpers when API is ready
                window.fastSpringCallbackFunction = onFastSpringReady;
            })
            .catch(error => {
                console.error('Failed to initialize FastSpring:', error);
            });
    }

    /**
     * Fetch storefront ID from the server or use default
     * @param {string} customId - Custom storefront ID (optional)
     * @returns {Promise<string>} FastSpring storefront ID
     */
    function fetchStorefrontId(customId = null) {
        // If a custom ID is provided, use it
        if (customId) {
            return Promise.resolve(customId);
        }
        
        // Check for ID in URL parameters (for testing)
        const urlParams = new URLSearchParams(window.location.search);
        const paramId = urlParams.get('fs_storefront');
        if (paramId) {
            return Promise.resolve(paramId);
        }
        
        // Otherwise use the environment variable (injected by the server)
        if (window.ENV && window.ENV.FASTSPRING_STOREFRONT_ID) {
            return Promise.resolve(window.ENV.FASTSPRING_STOREFRONT_ID);
        }
        
        // If no ID is available, fetch from server
        return fetch('/api/fastspring-config')
            .then(response => response.json())
            .then(config => {
                if (config.storefrontId) {
                    return config.storefrontId;
                }
                throw new Error('No FastSpring storefront ID available');
            })
            .catch(() => {
                // Fallback to a default value if server request fails
                console.warn('Using fallback FastSpring storefront ID');
                return 'example.test.onfastspring.com';
            });
    }

    /**
     * Load the FastSpring script dynamically
     * @param {string} storefrontId - FastSpring storefront ID
     */
    function loadFastSpringScript(storefrontId) {
        const script = document.createElement('script');
        script.id = 'fsc-api';
        script.src = 'https://d1f8f9xcsvx3ha.cloudfront.net/sbl/0.9.5/fastspring-builder.min.js';
        script.type = 'text/javascript';
        script.setAttribute('data-storefront', storefrontId);
        script.setAttribute('data-popup-closed', 'onPopupClose');
        script.setAttribute('data-data-callback', 'fastSpringCallbackFunction');
        
        document.head.appendChild(script);
        
        // Add global callback for popup close
        window.onPopupClose = onFastSpringPopupClose;
    }

    /**
     * Callback when FastSpring is ready
     * @param {Object} data - FastSpring session data
     */
    function onFastSpringReady(data) {
        console.log('FastSpring is ready');
        
        // Set up UI elements after FastSpring is ready
        setupSubscriptionButtons();
    }

    /**
     * Setup subscription buttons
     */
    function setupSubscriptionButtons() {
        // Get all premium/subscription buttons with class 'fastspring-btn'
        const buttons = document.querySelectorAll('.fastspring-btn, #premium-buy-btn, #cta-buy-btn');
        
        buttons.forEach(button => {
            // Get plan ID and billing cycle from button attributes
            const planId = button.getAttribute('data-plan') || 'premium';
            const billingCycle = button.getAttribute('data-billing') || getCurrentBillingCycle();
            
            // Replace the click event listener
            button.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Save user info to localStorage for reference
                saveUserInfo();
                
                // Launch FastSpring checkout for the selected plan
                launchCheckout(planId, billingCycle);
            });
        });
    }

    /**
     * Get current billing cycle based on active tab
     * @returns {string} Billing cycle ('monthly' or 'annual')
     */
    function getCurrentBillingCycle() {
        const activeBillingTab = document.querySelector('.pricing-tab.active');
        return activeBillingTab ? activeBillingTab.getAttribute('data-billing') : 'monthly';
    }

    /**
     * Save user information to localStorage
     */
    function saveUserInfo() {
        // Get user info from form if available
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        
        if (nameInput && nameInput.value) {
            localStorage.setItem('jaat_name', nameInput.value);
        }
        
        if (emailInput && emailInput.value) {
            localStorage.setItem('jaat_email', emailInput.value);
        }
    }

    /**
     * Launch FastSpring checkout
     * @param {string} planId - Plan ID ('premium' or 'enterprise')
     * @param {string} billingCycle - Billing cycle ('monthly' or 'annual')
     */
    function launchCheckout(planId, billingCycle) {
        // Get FastSpring product ID from plan configuration
        const product = plans[planId]?.[billingCycle];
        
        if (!product) {
            console.error('Invalid plan or billing cycle:', planId, billingCycle);
            return;
        }
        
        try {
            // Get customer info
            const customerName = localStorage.getItem('jaat_name') || '';
            const customerEmail = localStorage.getItem('jaat_email') || '';
            
            // Launch FastSpring popup with the selected product
            window.fastspring.builder.push({
                reset: true,
                products: [
                    {
                        path: product
                    }
                ],
                paymentContact: {
                    firstName: customerName.split(' ')[0] || '',
                    lastName: customerName.split(' ').slice(1).join(' ') || '',
                    email: customerEmail
                },
                checkout: true
            });
            
            // Close payment modal if it's open
            const paymentModal = document.getElementById('payment-modal');
            if (paymentModal && paymentModal.classList.contains('active')) {
                paymentModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        } catch (error) {
            console.error('Error launching FastSpring checkout:', error);
            alert('Sorry, there was an error launching the checkout. Please try again later.');
        }
    }

    /**
     * Callback when FastSpring popup is closed
     * @param {Object} data - FastSpring order data
     */
    function onFastSpringPopupClose(data) {
        // Check if an order was completed
        if (data && data.id && data.reference) {
            console.log('FastSpring order completed:', data.reference);
            
            // Redirect to success page with order reference
            const successUrl = new URL('payment-success.html', window.location.origin);
            successUrl.searchParams.set('reference', data.reference);
            
            if (data.products && data.products.length > 0) {
                successUrl.searchParams.set('product', data.products[0].product);
            }
            
            if (data.total) {
                successUrl.searchParams.set('total', data.total);
            }
            
            window.location.href = successUrl.toString();
        }
    }

    /**
     * Check if user has an active subscription
     * @returns {boolean} Whether user has an active subscription
     */
    function hasActiveSubscription() {
        const subscription = JSON.parse(localStorage.getItem('jaat_subscription') || '{}');
        
        if (!subscription.active) {
            return false;
        }
        
        // Check if subscription has expired
        if (subscription.expiryDate) {
            const expiryDate = new Date(subscription.expiryDate);
            const now = new Date();
            
            if (expiryDate < now) {
                // Subscription has expired
                subscription.active = false;
                localStorage.setItem('jaat_subscription', JSON.stringify(subscription));
                return false;
            }
        }
        
        return true;
    }

    /**
     * Get current user subscription details
     * @returns {Object|null} Subscription details or null if none
     */
    function getSubscription() {
        const subscription = JSON.parse(localStorage.getItem('jaat_subscription') || '{}');
        
        if (Object.keys(subscription).length === 0) {
            return null;
        }
        
        return subscription;
    }

    // Initialize FastSpring when the DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initialize();
    });

    // Public API
    return {
        initialize,
        launchCheckout,
        hasActiveSubscription,
        getSubscription
    };
})();
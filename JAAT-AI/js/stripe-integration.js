/**
 * JAAT-AI Stripe Payment Integration
 * Handles Stripe-based payment processing and subscriptions
 */

// Initialize Stripe - make sure to replace with your publishable key
// Using a variable for easier replacement via environment variables in production
let STRIPE_PUBLISHABLE_KEY = 'pk_test_placeholder';

// Initialize Stripe.js
let stripe = null;
let elements = null;
let cardElement = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Stripe payment integration
    initStripePayment();
});

/**
 * Initialize Stripe payment functionality
 */
function initStripePayment() {
    // Only initialize on premium/checkout pages
    if (!document.getElementById('card-payment-form')) return;
    
    // Check for Stripe script
    const stripeScript = document.createElement('script');
    stripeScript.src = 'https://js.stripe.com/v3/';
    stripeScript.onload = onStripeLoaded;
    document.head.appendChild(stripeScript);
    
    // Replace payment form submission
    const cardPaymentForm = document.getElementById('card-payment-form');
    if (cardPaymentForm) {
        cardPaymentForm.addEventListener('submit', handleStripePayment);
    }
}

/**
 * Handle Stripe script loaded
 */
function onStripeLoaded() {
    // Initialize Stripe with publishable key
    try {
        // Check if we have a Stripe public key in the query string (useful for testing)
        const urlParams = new URLSearchParams(window.location.search);
        const queryParamKey = urlParams.get('stripe_key');
        if (queryParamKey) {
            STRIPE_PUBLISHABLE_KEY = queryParamKey;
        }
        
        stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
        
        // Set up Stripe Elements
        setupStripeElements();
    } catch (error) {
        console.error('Error initializing Stripe:', error);
    }
}

/**
 * Set up Stripe Elements
 */
function setupStripeElements() {
    if (!stripe) return;
    
    // Create Elements instance
    elements = stripe.elements();
    
    // Find the card input container
    const cardInputContainer = document.querySelector('.card-input-wrapper');
    if (!cardInputContainer) return;
    
    // Clear existing inputs and prepare for Stripe Elements
    const cardNumberInput = document.getElementById('card-number');
    const cardInputParent = cardNumberInput.parentElement;
    
    // Save the card icons if they exist
    const cardIcons = cardInputParent.querySelector('.card-icons');
    
    // Clear the container
    cardInputParent.innerHTML = '';
    
    // Create a container for the card element
    const cardElementContainer = document.createElement('div');
    cardElementContainer.id = 'card-element';
    cardElementContainer.classList.add('stripe-card-element');
    
    cardInputParent.appendChild(cardElementContainer);
    
    // Add back the card icons if they existed
    if (cardIcons) {
        cardInputParent.appendChild(cardIcons);
    }
    
    // Create card Element and mount it
    cardElement = elements.create('card', {
        style: {
            base: {
                color: 'var(--text-color, #333)',
                fontFamily: '"Inter", "Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: 'var(--text-secondary, #6b7280)'
                }
            },
            invalid: {
                color: '#ff5b5b',
                iconColor: '#ff5b5b'
            }
        }
    });
    
    cardElement.mount('#card-element');
    
    // Create error display element
    const errorElement = document.createElement('div');
    errorElement.id = 'card-errors';
    errorElement.classList.add('card-error-message');
    errorElement.style.color = '#ff5b5b';
    errorElement.style.marginTop = '8px';
    errorElement.style.fontSize = '0.9rem';
    
    cardInputParent.appendChild(errorElement);
    
    // Add event listener for card validation errors
    cardElement.addEventListener('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });
    
    // Hide the expiry and CVV inputs since they're now in the card element
    const expiryRow = document.querySelector('.form-row');
    if (expiryRow) {
        expiryRow.style.display = 'none';
    }
}

/**
 * Handle payment submission through Stripe
 * @param {Event} event - The form submission event
 */
async function handleStripePayment(event) {
    event.preventDefault();
    
    if (!stripe || !elements) {
        alert('Stripe has not been properly initialized. Please try again later.');
        return;
    }
    
    // Get the submit button and show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    
    try {
        // Get the name from the form
        const cardholderName = document.getElementById('card-name').value;
        
        if (!cardholderName) {
            throw new Error('Please enter the cardholder name.');
        }
        
        // Calculate total amount from the total display
        const totalAmountElement = document.querySelector('.total-amount');
        if (!totalAmountElement) throw new Error('Could not determine payment amount.');
        
        // Extract the numeric amount from the text (e.g., "₹116.82" -> 116.82)
        const amountText = totalAmountElement.textContent.replace(/[^0-9.]/g, '');
        const amount = parseFloat(amountText);
        
        if (isNaN(amount) || amount <= 0) {
            throw new Error('Invalid payment amount.');
        }
        
        // Determine if this is a subscription or one-time payment
        const billingCycleElement = document.querySelector('.billing-cycle');
        const isSubscription = billingCycleElement && billingCycleElement.textContent.includes('billing');
        
        if (isSubscription) {
            await handleSubscription(cardholderName, amount);
        } else {
            await handleOneTimePayment(cardholderName, amount);
        }
        
        // Show success message or redirect
        window.location.href = 'payment-success.html';
    } catch (error) {
        // Show error message
        const errorElement = document.getElementById('card-errors');
        if (errorElement) {
            errorElement.textContent = error.message;
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert('Payment Error: ' + error.message);
        }
        
        // Reset button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        
        console.error('Payment error:', error);
    }
}

/**
 * Handle a one-time payment through Stripe
 * @param {string} cardholderName - The cardholder's name
 * @param {number} amount - The payment amount
 */
async function handleOneTimePayment(cardholderName, amount) {
    // Create payment intent on server
    const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment intent');
    }
    
    const { clientSecret } = await response.json();
    
    // Confirm card payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement,
            billing_details: { name: cardholderName }
        }
    });
    
    if (error) {
        throw new Error(error.message);
    }
    
    // Create or update subscription in local storage
    saveSubscription(paymentIntent);
}

/**
 * Handle a subscription payment through Stripe
 * @param {string} cardholderName - The cardholder's name
 * @param {number} amount - The payment amount
 */
async function handleSubscription(cardholderName, amount) {
    // Get the plan type from the displayed plan
    const planElement = document.querySelector('.plan-info h3');
    let planId = 'premium'; // Default to premium
    
    if (planElement) {
        const planName = planElement.textContent.toLowerCase();
        if (planName.includes('basic')) {
            planId = 'basic';
        } else if (planName.includes('premium')) {
            planId = 'premium';
        } else if (planName.includes('enterprise')) {
            planId = 'enterprise';
        }
    }
    
    // Get billing cycle
    const billingCycleElement = document.querySelector('.billing-cycle');
    const billingCycle = billingCycleElement && billingCycleElement.textContent.includes('Annual') ? 'annual' : 'monthly';
    
    // Create payment method
    const { error: createError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { name: cardholderName }
    });
    
    if (createError) {
        throw new Error(createError.message);
    }
    
    // Create subscription on server
    const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: localStorage.getItem('jaat_email') || 'customer@example.com',
            planId,
            billingCycle,
            paymentMethod: paymentMethod.id
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create subscription');
    }
    
    const { subscriptionId, clientSecret } = await response.json();
    
    if (clientSecret) {
        // Confirm payment if needed
        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);
        
        if (confirmError) {
            throw new Error(confirmError.message);
        }
    }
    
    // Save subscription info to local storage
    const now = new Date();
    const expiryDate = new Date();
    
    if (billingCycle === 'annual') {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
        expiryDate.setMonth(expiryDate.getMonth() + 1);
    }
    
    const subscription = {
        id: subscriptionId,
        planId,
        planName: planId.charAt(0).toUpperCase() + planId.slice(1),
        billingCycle,
        price: amount,
        startDate: now.toISOString(),
        expiryDate: expiryDate.toISOString(),
        active: true,
        paymentId: `pm_${Date.now()}`
    };
    
    // Add features based on plan
    subscription.features = getFeaturesByPlan(planId);
    
    // Save subscription
    localStorage.setItem('jaat_subscription', JSON.stringify(subscription));
    
    // Add to payment history
    const paymentHistory = JSON.parse(localStorage.getItem('jaat_payment_history') || '[]');
    paymentHistory.push({
        id: subscription.paymentId,
        planId,
        planName: subscription.planName,
        amount,
        date: new Date().toISOString(),
        status: 'success'
    });
    
    localStorage.setItem('jaat_payment_history', JSON.stringify(paymentHistory));
}

/**
 * Save subscription to local storage after payment
 * @param {Object} paymentIntent - Stripe payment intent
 */
function saveSubscription(paymentIntent) {
    // Determine plan based on amount
    const amount = paymentIntent.amount / 100;
    let planId = 'basic';
    
    if (amount >= 150) {
        planId = 'enterprise';
    } else if (amount >= 90) {
        planId = 'premium';
    }
    
    // Create subscription object
    const now = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1); // Default to 1 month
    
    const subscription = {
        id: paymentIntent.id,
        planId,
        planName: planId.charAt(0).toUpperCase() + planId.slice(1),
        billingCycle: 'monthly',
        price: amount,
        startDate: now.toISOString(),
        expiryDate: expiryDate.toISOString(),
        active: true,
        paymentId: paymentIntent.id
    };
    
    // Add features based on plan
    subscription.features = getFeaturesByPlan(planId);
    
    // Save subscription
    localStorage.setItem('jaat_subscription', JSON.stringify(subscription));
    
    // Add to payment history
    const paymentHistory = JSON.parse(localStorage.getItem('jaat_payment_history') || '[]');
    paymentHistory.push({
        id: subscription.paymentId,
        planId,
        planName: subscription.planName,
        amount,
        date: new Date().toISOString(),
        status: 'success'
    });
    
    localStorage.setItem('jaat_payment_history', JSON.stringify(paymentHistory));
}

/**
 * Get features by plan ID
 * @param {string} planId - Plan ID
 * @returns {Array} Array of features
 */
function getFeaturesByPlan(planId) {
    switch (planId) {
        case 'basic':
            return [
                '10+ AI Modes',
                '1000 Messages/month',
                'Enhanced UI',
                'Priority Support'
            ];
        case 'premium':
            return [
                '30+ AI Modes',
                'Unlimited Messages',
                'Advanced UI & Effects',
                'Priority Support',
                'Custom AI Training'
            ];
        case 'enterprise':
            return [
                'All 46+ AI Modes',
                'Unlimited Messages',
                'Premium UI & Effects',
                'Dedicated Support',
                'Custom AI Training',
                'API Access',
                'Team Collaboration'
            ];
        default:
            return [
                'Basic AI Mode',
                'Limited Messages',
                'Standard UI'
            ];
    }
}

// Export functions for use in other scripts
window.StripePayment = {
    // Public API
    initialize: (publishableKey) => {
        STRIPE_PUBLISHABLE_KEY = publishableKey;
        if (stripe) {
            stripe = Stripe(publishableKey);
            setupStripeElements();
        }
    }
};
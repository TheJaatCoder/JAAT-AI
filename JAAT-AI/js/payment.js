/**
 * JAAT-AI Payment JavaScript
 * Handles payment processing, subscription management, and UPI payments
 */

document.addEventListener('DOMContentLoaded', function() {
    // Constants
    const UPI_ID = '9813072447@fam'; // Stored securely in production
    
    /**
     * Initialize payment functionality
     */
    function initPayment() {
        // Set up modal functionality
        initModals();
        
        // Set up pricing tabs
        initPricingTabs();
        
        // Set up credit card formatting
        initCardFormatting();
        
        // Set up form submissions
        initFormSubmissions();
        
        // Set up FAQ accordion
        initFaqAccordion();
    }
    
    /**
     * Initialize modal functionality
     */
    function initModals() {
        // Buy buttons to open modal
        const buyButtons = document.querySelectorAll('#premium-buy-btn, #cta-buy-btn');
        const paymentModal = document.getElementById('payment-modal');
        
        if (!paymentModal) return;
        
        // Open modal on button click
        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                paymentModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal when clicking the close button
        const closeButton = paymentModal.querySelector('.close-modal');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                paymentModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close modal when clicking outside
        paymentModal.addEventListener('click', (event) => {
            if (event.target === paymentModal) {
                paymentModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    /**
     * Initialize pricing tabs
     */
    function initPricingTabs() {
        const pricingTabs = document.querySelectorAll('.pricing-tab');
        if (!pricingTabs.length) return;
        
        const pricingAmounts = document.querySelectorAll('.pricing-card .amount');
        const totalAmount = document.querySelector('.total-amount');
        const payButtons = document.querySelectorAll('.btn-primary');
        const billingCycle = document.querySelector('.billing-cycle');
        
        pricingTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const billingType = tab.getAttribute('data-billing');
                
                // Toggle active class
                pricingTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update prices based on billing type
                if (billingType === 'annual') {
                    // 20% discount for annual
                    if (pricingAmounts && pricingAmounts.length > 1) {
                        pricingAmounts[1].textContent = '₹79';
                        if (pricingAmounts.length > 2) {
                            pricingAmounts[2].textContent = '₹159';
                        }
                    }
                    
                    if (totalAmount) {
                        totalAmount.textContent = '₹93.46';
                    }
                    
                    // Update pay buttons
                    payButtons.forEach(btn => {
                        if (btn.textContent.includes('₹')) {
                            btn.textContent = 'Pay ₹93.46';
                        }
                    });
                    
                    // Update billing cycle text
                    if (billingCycle) {
                        billingCycle.textContent = 'Annual billing (cancel anytime)';
                    }
                } else {
                    // Regular monthly pricing
                    if (pricingAmounts && pricingAmounts.length > 1) {
                        pricingAmounts[1].textContent = '₹99';
                        if (pricingAmounts.length > 2) {
                            pricingAmounts[2].textContent = '₹199';
                        }
                    }
                    
                    if (totalAmount) {
                        totalAmount.textContent = '₹116.82';
                    }
                    
                    // Update pay buttons
                    payButtons.forEach(btn => {
                        if (btn.textContent.includes('₹')) {
                            btn.textContent = 'Pay ₹116.82';
                        }
                    });
                    
                    // Update billing cycle text
                    if (billingCycle) {
                        billingCycle.textContent = 'Monthly billing (cancel anytime)';
                    }
                }
            });
        });
    }
    
    /**
     * Initialize payment method tabs
     */
    function initPaymentTabs() {
        const paymentTabs = document.querySelectorAll('.payment-tab');
        if (!paymentTabs.length) return;
        
        const paymentForms = document.querySelectorAll('.payment-form');
        
        paymentTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const paymentMethod = tab.getAttribute('data-method');
                
                // Toggle active class
                paymentTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show active form
                paymentForms.forEach(form => {
                    form.classList.remove('active');
                    if (form.id === `${paymentMethod}-payment-form`) {
                        form.classList.add('active');
                    }
                });
            });
        });
    }
    
    /**
     * Initialize card input formatting
     */
    function initCardFormatting() {
        // Card number formatting
        const cardNumber = document.getElementById('card-number');
        if (cardNumber) {
            cardNumber.addEventListener('input', (e) => {
                // Remove non-digits
                let value = e.target.value.replace(/\D/g, '');
                let formattedValue = '';
                
                // Format with spaces every 4 digits
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formattedValue += ' ';
                    }
                    formattedValue += value[i];
                }
                
                // Update input value
                e.target.value = formattedValue;
            });
        }
        
        // Expiry date formatting
        const expiryDate = document.getElementById('expiry-date');
        if (expiryDate) {
            expiryDate.addEventListener('input', (e) => {
                // Remove non-digits
                let value = e.target.value.replace(/\D/g, '');
                let formattedValue = '';
                
                // Format as MM/YY
                if (value.length > 0) {
                    formattedValue = value.substr(0, 2);
                    if (value.length > 2) {
                        formattedValue += '/' + value.substr(2, 2);
                    }
                }
                
                // Update input value
                e.target.value = formattedValue;
            });
        }
    }
    
    /**
     * Initialize form submissions
     */
    function initFormSubmissions() {
        // Card payment form
        const cardForm = document.getElementById('card-payment-form');
        if (cardForm) {
            cardForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                
                try {
                    // Show loading state
                    const submitButton = cardForm.querySelector('button[type="submit"]');
                    const originalButtonText = submitButton.innerHTML;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                    submitButton.disabled = true;
                    
                    // Validate form
                    const cardName = document.getElementById('card-name').value;
                    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
                    const expiryDate = document.getElementById('expiry-date').value;
                    const cvv = document.getElementById('cvv').value;
                    
                    if (!cardName || cardNumber.length < 16 || !expiryDate || !cvv) {
                        throw new Error('Please fill in all required fields.');
                    }
                    
                    // In a real app, this would be an API call to a payment processor
                    // For demo purposes, we'll simulate payment processing
                    await simulateApiCall();
                    
                    // Redirect to success page
                    window.location.href = 'payment-success.html';
                } catch (error) {
                    // Show error message
                    alert('Payment Error: ' + error.message);
                    
                    // Reset button
                    const submitButton = cardForm.querySelector('button[type="submit"]');
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    
                    console.error('Payment error:', error);
                }
            });
        }
        
        // UPI payment form
        const upiForm = document.getElementById('upi-payment-form');
        if (upiForm) {
            upiForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                
                try {
                    // Show loading state
                    const submitButton = upiForm.querySelector('button[type="submit"]');
                    const originalButtonText = submitButton.innerHTML;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                    submitButton.disabled = true;
                    
                    // Validate form
                    const upiId = document.getElementById('upi-id').value;
                    
                    if (!upiId || !upiId.includes('@')) {
                        throw new Error('Please enter a valid UPI ID.');
                    }
                    
                    // In a real app, this would initiate a UPI payment request
                    // For demo purposes, we'll simulate UPI payment
                    await simulateApiCall();
                    
                    // Get billing info from price display
                    const totalAmount = document.querySelector('.total-amount').textContent;
                    const billingCycle = document.querySelector('.billing-cycle').textContent.includes('Annual') ? 'annual' : 'monthly';
                    
                    // Create UPI payment reference
                    const referenceCode = generateReferenceCode();
                    
                    // Store payment intent in localStorage
                    const paymentIntent = {
                        referenceCode,
                        amount: totalAmount,
                        billingCycle,
                        upiId: UPI_ID,
                        customerUpiId: upiId,
                        status: 'pending',
                        timestamp: new Date().toISOString()
                    };
                    
                    localStorage.setItem('jaat-payment-intent', JSON.stringify(paymentIntent));
                    
                    // Redirect to UPI verification page
                    window.location.href = 'upi-verification.html';
                } catch (error) {
                    // Show error message
                    alert('Payment Error: ' + error.message);
                    
                    // Reset button
                    const submitButton = upiForm.querySelector('button[type="submit"]');
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    
                    console.error('UPI payment error:', error);
                }
            });
        }
    }
    
    /**
     * Initialize FAQ accordion
     */
    function initFaqAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        if (!faqQuestions.length) return;
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const answer = faqItem.querySelector('.faq-answer');
                const icon = question.querySelector('.toggle-icon i');
                
                // Toggle active class
                faqItem.classList.toggle('active');
                
                // Toggle icon
                if (faqItem.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                    answer.style.maxHeight = '0';
                }
            });
        });
    }
    
    /**
     * Generate a reference code for UPI payments
     * @returns {string} Reference code
     */
    function generateReferenceCode() {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `JAAT${timestamp}${random}`;
    }
    
    /**
     * Simulate API call with delay
     * @returns {Promise} Promise that resolves after a delay
     */
    function simulateApiCall() {
        // Add random delay between 1000ms and 2000ms
        const delay = Math.floor(Math.random() * 1000) + 1000;
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    
    /**
     * Create a subscription after payment
     * @param {string} plan - Plan type ('premium' or 'enterprise')
     * @param {string} billingCycle - Billing cycle ('monthly' or 'annual')
     * @returns {Object} Subscription data
     */
    function createSubscription(plan, billingCycle) {
        // Calculate expiry date based on billing cycle
        const now = new Date();
        let expiresAt;
        
        if (billingCycle === 'annual') {
            // Add 1 year
            expiresAt = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
        } else {
            // Add 1 month
            expiresAt = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
        }
        
        // Create subscription object
        const subscription = {
            plan,
            billingCycle,
            expiresAt: expiresAt.toISOString(),
            createdAt: now.toISOString(),
            autoRenew: true,
            status: 'active'
        };
        
        // Add features based on plan
        if (plan === 'premium') {
            subscription.features = [
                'all_modes',
                'premium_animations',
                'unlimited_messages',
                'voice_features',
                'custom_avatars',
                'priority_support'
            ];
        } else if (plan === 'enterprise') {
            subscription.features = [
                'all_modes',
                'premium_animations',
                'unlimited_messages',
                'voice_features',
                'custom_avatars',
                'dedicated_support',
                'team_collaboration',
                'custom_ai_modes',
                'api_access',
                'usage_analytics'
            ];
        }
        
        // In a real app, this would be saved to a database
        // For demo purposes, we'll save to localStorage
        localStorage.setItem('jaat-subscription', JSON.stringify(subscription));
        
        return subscription;
    }
    
    // Initialize payment functionality
    initPayment();
    
    // Initialize payment tabs (for modal)
    initPaymentTabs();
    
    // Export functions for use in other scripts
    window.JaatPayment = {
        createSubscription,
        generateReferenceCode
    };
});
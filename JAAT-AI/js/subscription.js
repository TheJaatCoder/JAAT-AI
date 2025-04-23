/**
 * JAAT-AI Subscription System
 * Handles FastSpring subscription management and user plans
 */

// Initialize the subscription system
const subscriptionSystem = (function() {
    // Subscription plans configuration
    const plans = {
        basic: {
            id: 'basic-monthly',
            name: 'Basic Plan',
            monthlyPrice: 4.99,
            annualPrice: 49.99,
            monthlyId: 'basic-monthly',
            annualId: 'basic-annual',
            features: [
                '1,000 messages per month',
                'Access to 5 AI modes',
                'Basic holographic interface',
                'Email support',
                'Mobile access'
            ]
        },
        pro: {
            id: 'pro-monthly',
            name: 'Pro Plan',
            monthlyPrice: 9.99,
            annualPrice: 99.99,
            monthlyId: 'pro-monthly',
            annualId: 'pro-annual',
            recommended: true,
            features: [
                'Unlimited messages',
                'Access to 15 AI modes',
                'Advanced holographic interface',
                'Priority support',
                'File uploads up to 100MB',
                'API access',
                'No ads'
            ]
        },
        ultimate: {
            id: 'ultimate-monthly',
            name: 'Ultimate Plan',
            monthlyPrice: 19.99,
            annualPrice: 199.99,
            monthlyId: 'ultimate-monthly',
            annualId: 'ultimate-annual',
            features: [
                'Unlimited everything',
                'Access to all AI modes',
                'Premium holographic interface',
                'Priority support with 2-hour response time',
                'Unlimited file uploads',
                'Advanced API access',
                'Custom AI training',
                'Exclusive early access to new features'
            ]
        }
    };

    // FastSpring store ID
    const storeId = 'GL1OZXAWQJ6EN3P7THPZBG';

    /**
     * Initialize subscription system
     * Sets up event listeners and loads FastSpring library
     */
    function init() {
        // Set up FastSpring library if on subscription page
        if (window.location.pathname.includes('pricing.html')) {
            loadFastSpringLibrary();
            renderSubscriptionPlans();
        }

        // Update UI based on subscription status
        updateUIBasedOnSubscription();

        // Set up billing toggle on pricing page
        const billingToggle = document.getElementById('billing-toggle');
        if (billingToggle) {
            billingToggle.addEventListener('change', toggleBillingPeriod);
        }

        // Initialize subscription UI
        initSubscriptionUI();
    }

    /**
     * Load FastSpring library
     */
    function loadFastSpringLibrary() {
        // Load FastSpring library dynamically
        const script = document.createElement('script');
        script.id = 'fsc-api';
        script.src = 'https://d1f8f9xcsvx3ha.cloudfront.net/sbl/0.9.7/fastspring-builder.min.js';
        script.type = 'text/javascript';
        script.data = storeId;
        document.head.appendChild(script);

        // Add FastSpring configuration
        window.fastSpringConfig = {
            storeId: storeId,
            storeDomain: 'fastaispringcloud.com',
            contact: getContactInfo()
        };
    }

    /**
     * Get contact info from current user
     * @returns {Object} Contact info object
     */
    function getContactInfo() {
        const user = window.authSystem ? window.authSystem.getCurrentUser() : null;
        
        if (!user) {
            return {};
        }

        return {
            email: user.email,
            firstName: user.firstName || '',
            lastName: user.lastName || ''
        };
    }

    /**
     * Render subscription plans on pricing page
     */
    function renderSubscriptionPlans() {
        const plansContainer = document.getElementById('subscription-plans');
        
        if (!plansContainer) {
            return;
        }

        // Clear container
        plansContainer.innerHTML = '';

        // Get billing period
        const isAnnual = document.getElementById('billing-toggle')?.checked || false;

        // Show annual savings notice
        const savingsNotice = document.querySelector('.annual-savings');
        if (savingsNotice) {
            savingsNotice.style.display = isAnnual ? 'block' : 'none';
        }

        // Update billing period labels
        const billingLabels = document.querySelectorAll('.billing-period');
        billingLabels.forEach((label, index) => {
            label.classList.toggle('active', (index === 0 && !isAnnual) || (index === 1 && isAnnual));
        });

        // Render each plan
        Object.values(plans).forEach(plan => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const period = isAnnual ? 'year' : 'month';
            const productId = isAnnual ? plan.annualId : plan.monthlyId;
            
            const planCard = document.createElement('div');
            planCard.className = `plan-card ${plan.recommended ? 'recommended' : ''}`;
            
            planCard.innerHTML = `
                <div class="plan-header ${plan.recommended ? 'recommended' : ''}">
                    ${plan.recommended ? '<div class="recommended-badge">Recommended</div>' : ''}
                    <h3>${plan.name}</h3>
                    <div class="plan-price">
                        <span class="price">$${price}</span>
                        <span class="period">/${period}</span>
                    </div>
                </div>
                
                <div class="plan-features">
                    <ul>
                        ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="plan-footer">
                    <button class="holographic-button subscribe-button" data-fsc-item-path="${productId}" data-fsc-action="Add,Checkout">
                        Subscribe Now
                    </button>
                </div>
            `;
            
            plansContainer.appendChild(planCard);
        });
    }

    /**
     * Toggle between monthly and annual billing
     */
    function toggleBillingPeriod() {
        renderSubscriptionPlans();
    }

    /**
     * Get user's current subscription
     * @returns {Object|null} Subscription object or null
     */
    function getUserSubscription() {
        try {
            const subscriptionJson = localStorage.getItem('user_subscription');
            if (!subscriptionJson) return null;
            return JSON.parse(subscriptionJson);
        } catch (error) {
            console.error('Error getting user subscription:', error);
            return null;
        }
    }

    /**
     * Check if user has an active subscription
     * @param {string} planId - Optional plan ID to check for
     * @returns {boolean} Whether user has an active subscription
     */
    function hasActiveSubscription(planId = null) {
        const subscription = getUserSubscription();
        
        if (!subscription || subscription.status !== 'active') {
            return false;
        }
        
        if (planId) {
            return subscription.planId.includes(planId);
        }
        
        return true;
    }

    /**
     * Update UI elements based on subscription status
     */
    function updateUIBasedOnSubscription() {
        const subscription = getUserSubscription();
        
        // Update status badge in header
        const statusBadge = document.querySelector('.status-badge');
        
        if (statusBadge) {
            if (subscription && subscription.status === 'active') {
                // Extract plan tier from planId (basic, pro, ultimate)
                const planTier = subscription.planId.includes('basic') ? 'basic' :
                                subscription.planId.includes('pro') ? 'pro' :
                                subscription.planId.includes('ultimate') ? 'ultimate' : 'premium';
                
                statusBadge.textContent = planTier.charAt(0).toUpperCase() + planTier.slice(1);
                statusBadge.className = 'status-badge premium';
            } else {
                statusBadge.textContent = 'Free Plan';
                statusBadge.className = 'status-badge free';
            }
        }
        
        // Update subscription info on account page
        const currentSubscription = document.getElementById('current-subscription');
        
        if (currentSubscription) {
            if (subscription && subscription.status === 'active') {
                // Get plan details
                const planId = subscription.planId;
                const planTier = planId.includes('basic') ? 'basic' :
                                planId.includes('pro') ? 'pro' :
                                planId.includes('ultimate') ? 'ultimate' : 'custom';
                const plan = plans[planTier] || { name: 'Custom Plan' };
                const isAnnual = planId.includes('annual');
                
                currentSubscription.innerHTML = `
                    <div class="subscription-info">
                        <h3>Current Subscription</h3>
                        
                        <div style="display: flex; flex-wrap: wrap; gap: 2rem; margin-bottom: 1.5rem;">
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--color-muted);">Plan</label>
                                <div style="font-weight: 500;">${plan.name}</div>
                            </div>
                            
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--color-muted);">Status</label>
                                <div class="status active">Active</div>
                            </div>
                            
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--color-muted);">Billing Cycle</label>
                                <div>${isAnnual ? 'Annual' : 'Monthly'}</div>
                            </div>
                            
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--color-muted);">Next Billing Date</label>
                                <div>${subscription.nextBillingDate ? new Date(subscription.nextBillingDate).toLocaleDateString() : 'Not available'}</div>
                            </div>
                        </div>
                        
                        <div class="subscription-actions">
                            <button class="holographic-button" id="change-plan">
                                <span class="material-symbols-rounded" style="font-size: 1.2rem; margin-right: 0.5rem;">swap_horiz</span>
                                Change Plan
                            </button>
                            
                            <button class="holographic-button" id="cancel-subscription" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);">
                                <span class="material-symbols-rounded" style="font-size: 1.2rem; margin-right: 0.5rem;">cancel</span>
                                Cancel Subscription
                            </button>
                        </div>
                    </div>
                `;
                
                // Add event listeners for subscription actions
                document.getElementById('change-plan')?.addEventListener('click', () => {
                    window.location.href = 'pricing.html';
                });
                
                document.getElementById('cancel-subscription')?.addEventListener('click', () => {
                    if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing period.')) {
                        cancelSubscription();
                    }
                });
            } else {
                // No active subscription
                currentSubscription.innerHTML = `
                    <div style="text-align: center; padding: 3rem 2rem; background: rgba(26, 28, 49, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-lg);">
                        <h3 style="margin-bottom: 1.5rem; font-size: 1.3rem;">You don't have an active subscription</h3>
                        <p style="color: var(--color-muted); margin-bottom: 2rem;">Upgrade to a premium plan to unlock all features and capabilities of JAAT-AI.</p>
                        <a href="pricing.html" class="holographic-button">View Plans</a>
                    </div>
                `;
            }
        }
        
        // Update premium feature locks
        document.querySelectorAll('.premium-feature').forEach(feature => {
            // Determine which level of subscription is required for this feature
            const requiredTier = feature.dataset.requiredTier || 'pro'; // Default to pro
            
            // Check if user has access to this tier
            const hasAccess = subscription && 
                           subscription.status === 'active' && 
                           (requiredTier === 'basic' || 
                            (requiredTier === 'pro' && (subscription.planId.includes('pro') || subscription.planId.includes('ultimate'))) ||
                            (requiredTier === 'ultimate' && subscription.planId.includes('ultimate')));
            
            // Toggle locked class
            feature.classList.toggle('locked', !hasAccess);
        });
    }

    /**
     * Initialize subscription UI elements
     */
    function initSubscriptionUI() {
        // Handle subscription success message
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.get('subscription') === 'success') {
            showSubscriptionSuccessMessage();
            
            // Remove query parameter
            const url = new URL(window.location);
            url.searchParams.delete('subscription');
            window.history.replaceState({}, '', url);
        }
    }

    /**
     * Show subscription success message
     */
    function showSubscriptionSuccessMessage() {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'subscription-success-message';
        
        messageContainer.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✓</div>
                <h2>Subscription Successful!</h2>
                <p>Thank you for subscribing to JAAT-AI. Your account has been upgraded and you now have access to premium features.</p>
                <button class="holographic-button close-success-message">Continue</button>
            </div>
        `;
        
        document.body.appendChild(messageContainer);
        
        // Add event listener to close button
        messageContainer.querySelector('.close-success-message').addEventListener('click', () => {
            messageContainer.remove();
        });
    }

    /**
     * Cancel user subscription
     */
    function cancelSubscription() {
        // In a real implementation, this would call a server endpoint
        // For demo purposes, we'll just update the local storage
        
        const subscription = getUserSubscription();
        
        if (subscription) {
            subscription.status = 'canceled';
            subscription.canceledAt = new Date().toISOString();
            
            localStorage.setItem('user_subscription', JSON.stringify(subscription));
            
            // Update UI
            updateUIBasedOnSubscription();
            
            // Show success message
            alert('Your subscription has been canceled. You will have access to premium features until the end of your current billing period.');
        }
    }

    /**
     * Set demo subscription for testing
     * @param {string} planTier - Plan tier (basic, pro, ultimate)
     * @param {boolean} isAnnual - Whether subscription is annual
     */
    function setDemoSubscription(planTier = 'pro', isAnnual = false) {
        const planId = `${planTier}-${isAnnual ? 'annual' : 'monthly'}`;
        
        const subscription = {
            id: 'sub_' + Date.now(),
            planId: planId,
            status: 'active',
            startDate: new Date().toISOString(),
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem('user_subscription', JSON.stringify(subscription));
        
        // Update UI
        updateUIBasedOnSubscription();
        
        return subscription;
    }

    // Initialize on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', init);

    // Public API
    return {
        getUserSubscription,
        hasActiveSubscription,
        updateUIBasedOnSubscription,
        setDemoSubscription
    };
})();

// Expose to global scope
window.subscriptionSystem = subscriptionSystem;
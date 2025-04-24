/**
 * JAAT-AI FastSpring API Routes
 * Secure server-side endpoints for FastSpring subscription management
 */
const express = require('express');
const axios = require('axios');
const router = express.Router();

// FastSpring API credentials (stored in environment variables)
const FASTSPRING_USERNAME = process.env.FASTSPRING_USERNAME || 'RHQQREB9QBARNLGHSZW3LG';
const FASTSPRING_PASSWORD = process.env.FASTSPRING_PASSWORD || 'vGF65678SomKEBc5wXJr7w';
const FASTSPRING_API_URL = 'https://api.fastspring.com';

/**
 * Get FastSpring configuration
 * Returns safe client-side configuration without exposing credentials
 */
router.get('/config/fastspring', (req, res) => {
  // Return safe configuration without API credentials
  res.status(200).json({
    available: !!FASTSPRING_USERNAME && !!FASTSPRING_PASSWORD,
    storeId: 'jaat-ai',
    testMode: process.env.NODE_ENV !== 'production'
  });
});

/**
 * Create a FastSpring client-side session
 */
router.post('/fastspring/session', async (req, res) => {
  try {
    const { products, customer } = req.body;
    
    if (!products || !products.length) {
      return res.status(400).json({ error: 'Products are required' });
    }
    
    const response = await axios.post(`${FASTSPRING_API_URL}/sessions`, {
      products,
      customer
    }, {
      auth: {
        username: FASTSPRING_USERNAME,
        password: FASTSPRING_PASSWORD
      }
    });
    
    res.status(200).json({ 
      sessionId: response.data.id,
      expires: response.data.expires 
    });
  } catch (error) {
    console.error('Error creating FastSpring session:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create FastSpring session' });
  }
});

/**
 * Create a subscription in FastSpring
 */
router.post('/subscriptions', async (req, res) => {
  try {
    const { planId, customer } = req.body;
    
    if (!planId) {
      return res.status(400).json({ error: 'Plan ID is required' });
    }
    
    if (!customer || !customer.email) {
      return res.status(400).json({ error: 'Customer data is required' });
    }
    
    const response = await axios.post(`${FASTSPRING_API_URL}/orders`, {
      products: [{ product: planId }],
      customer
    }, {
      auth: {
        username: FASTSPRING_USERNAME,
        password: FASTSPRING_PASSWORD
      }
    });
    
    // Store the subscription in our database
    // This would be implemented with your database layer
    
    res.status(200).json({ 
      success: true, 
      orderId: response.data.id,
      subscription: response.data.subscriptions[0]
    });
  } catch (error) {
    console.error('Error creating subscription:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

/**
 * Get user subscription details
 */
router.get('/user/subscription', async (req, res) => {
  try {
    // Get user ID from authenticated session
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Get subscription from database
    // This would be implemented with your database layer
    const subscription = await getUserSubscription(userId);
    
    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }
    
    // If we have a FastSpring subscription ID, fetch the latest details
    if (subscription.subscriptionId) {
      try {
        const response = await axios.get(`${FASTSPRING_API_URL}/subscriptions/${subscription.subscriptionId}`, {
          auth: {
            username: FASTSPRING_USERNAME,
            password: FASTSPRING_PASSWORD
          }
        });
        
        // Update local subscription with latest data
        subscription.status = response.data.state;
        subscription.nextBillingDate = response.data.next_charge_date;
        
        // Update subscription in database
        // await updateSubscription(userId, subscription);
      } catch (fastspringError) {
        console.error('Error fetching subscription from FastSpring:', fastspringError?.response?.data || fastspringError.message);
        // Continue with local data
      }
    }
    
    res.status(200).json(subscription);
  } catch (error) {
    console.error('Error getting user subscription:', error);
    res.status(500).json({ error: 'Failed to get subscription details' });
  }
});

/**
 * Cancel user subscription
 */
router.post('/user/subscription/cancel', async (req, res) => {
  try {
    // Get user ID from authenticated session
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Get subscription from database
    // This would be implemented with your database layer
    const subscription = await getUserSubscription(userId);
    
    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }
    
    if (!subscription.subscriptionId) {
      return res.status(400).json({ error: 'Subscription ID not found' });
    }
    
    // Cancel subscription with FastSpring
    await axios.post(`${FASTSPRING_API_URL}/subscriptions/${subscription.subscriptionId}`, {
      action: 'cancel'
    }, {
      auth: {
        username: FASTSPRING_USERNAME,
        password: FASTSPRING_PASSWORD
      }
    });
    
    // Update subscription in database
    subscription.status = 'canceled';
    // await updateSubscription(userId, subscription);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error cancelling subscription:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

/**
 * Upgrade user subscription
 */
router.post('/user/subscription/upgrade', async (req, res) => {
  try {
    const { planId } = req.body;
    
    // Get user ID from authenticated session
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!planId) {
      return res.status(400).json({ error: 'New plan ID is required' });
    }
    
    // Get subscription from database
    // This would be implemented with your database layer
    const subscription = await getUserSubscription(userId);
    
    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }
    
    if (!subscription.subscriptionId) {
      return res.status(400).json({ error: 'Subscription ID not found' });
    }
    
    // Upgrade subscription with FastSpring
    await axios.post(`${FASTSPRING_API_URL}/subscriptions/${subscription.subscriptionId}`, {
      action: 'update',
      product: planId
    }, {
      auth: {
        username: FASTSPRING_USERNAME,
        password: FASTSPRING_PASSWORD
      }
    });
    
    // Update subscription in database
    subscription.planId = planId;
    // await updateSubscription(userId, subscription);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error upgrading subscription:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to upgrade subscription' });
  }
});

/**
 * FastSpring webhook handler for subscription events
 */
router.post('/webhooks/fastspring', async (req, res) => {
  try {
    const event = req.body;
    
    // Verify webhook signature
    // This would be implemented with your FastSpring webhook security
    
    // Process different event types
    switch (event.type) {
      case 'subscription.activated':
        // Handle subscription activation
        break;
      case 'subscription.canceled':
        // Handle subscription cancellation
        break;
      case 'subscription.updated':
        // Handle subscription update
        break;
      case 'subscription.payment.completed':
        // Handle successful payment
        break;
      case 'subscription.payment.failed':
        // Handle failed payment
        break;
      default:
        console.log(`Unhandled FastSpring event type: ${event.type}`);
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing FastSpring webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

// Mock functions for database access
// These would be replaced with your actual database implementation
async function getUserSubscription(userId) {
  // Mock subscription data
  return {
    userId,
    planId: 'jaat-ai-monthly',
    subscriptionId: 'sub_123456',
    status: 'active',
    startDate: new Date('2023-01-01'),
    nextBillingDate: new Date('2023-02-01'),
    creditCount: 5000
  };
}

module.exports = router;
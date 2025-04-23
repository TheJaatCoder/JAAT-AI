/**
 * JAAT-AI Subscription Validation
 * 
 * This module provides functionality to validate user subscriptions
 * without revealing any sensitive payment details in the frontend.
 */

// Import dependencies
const fs = require('fs').promises;
const path = require('path');

// Define paths for subscription data
const CURRENT_PLAN_PATH = path.join(__dirname, 'current-plan.json');
const PLANS_PATH = path.join(__dirname, 'plans.json');

/**
 * Validates if a user has an active subscription
 * @param {string} userId - The user ID to validate
 * @returns {Promise<Object>} - Subscription status and plan details if active
 */
async function validateSubscription(userId) {
  try {
    // Read current plan data
    const currentPlanData = await readCurrentPlan();
    
    // Check if the user exists in the current plan data
    if (!currentPlanData || !currentPlanData.users || !currentPlanData.users[userId]) {
      return {
        isActive: false,
        message: 'No active subscription found',
        planId: null,
        expiresAt: null
      };
    }
    
    const userPlan = currentPlanData.users[userId];
    
    // Check if the plan has expired
    const now = new Date();
    const expiryDate = new Date(userPlan.expiresAt);
    
    if (expiryDate < now) {
      return {
        isActive: false,
        message: 'Subscription has expired',
        planId: userPlan.planId,
        expiresAt: userPlan.expiresAt
      };
    }
    
    // Read available plans
    const plansData = await readPlans();
    const planDetails = plansData.plans.find(plan => plan.id === userPlan.planId);
    
    // Return active subscription details
    return {
      isActive: true,
      message: 'Subscription is active',
      planId: userPlan.planId,
      planName: planDetails ? planDetails.name : 'Unknown Plan',
      expiresAt: userPlan.expiresAt,
      features: planDetails ? planDetails.features : []
    };
  } catch (error) {
    console.error('Error validating subscription:', error);
    return {
      isActive: false,
      message: 'Error validating subscription',
      error: error.message
    };
  }
}

/**
 * Reads the current-plan.json file
 * @returns {Promise<Object>} - Current plan data
 */
async function readCurrentPlan() {
  try {
    const data = await fs.readFile(CURRENT_PLAN_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or has invalid JSON, return empty object
    if (error.code === 'ENOENT' || error instanceof SyntaxError) {
      return { users: {} };
    }
    throw error;
  }
}

/**
 * Reads the plans.json file
 * @returns {Promise<Object>} - Plans data
 */
async function readPlans() {
  try {
    const data = await fs.readFile(PLANS_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading plans data:', error);
    throw error;
  }
}

/**
 * Checks if a specific feature is available for a user's plan
 * @param {string} userId - The user ID to check
 * @param {string} featureId - The feature ID to check
 * @returns {Promise<boolean>} - Whether the feature is available
 */
async function hasFeatureAccess(userId, featureId) {
  const subscription = await validateSubscription(userId);
  
  // If subscription is not active, user doesn't have access
  if (!subscription.isActive) {
    return false;
  }
  
  // Define feature access based on plan
  const featureAccessMap = {
    'ai_modes': {
      'basic_monthly': 15,     // Number of AI modes for basic plan
      'premium_monthly': 45,   // Number of AI modes for premium plan
      'enterprise_monthly': 45 // Number of AI modes for enterprise plan
    },
    'image_generation': {
      'basic_monthly': false,
      'premium_monthly': true,
      'enterprise_monthly': true
    },
    'api_access': {
      'basic_monthly': false,
      'premium_monthly': false,
      'enterprise_monthly': true
    },
    'team_accounts': {
      'basic_monthly': false,
      'premium_monthly': false,
      'enterprise_monthly': true
    }
    // Add more features as needed
  };
  
  // Check if the feature exists in the access map
  if (featureAccessMap[featureId]) {
    return !!featureAccessMap[featureId][subscription.planId];
  }
  
  // For features not explicitly defined, check if they exist in the plan features
  return subscription.features.some(feature => 
    feature.toLowerCase().includes(featureId.toLowerCase())
  );
}

/**
 * Get available AI modes count based on user's plan
 * @param {string} userId - The user ID to check
 * @returns {Promise<number>} - Number of available AI modes
 */
async function getAvailableAiModes(userId) {
  const subscription = await validateSubscription(userId);
  
  // Default mode count for free users
  let modeCount = 3;
  
  if (subscription.isActive) {
    switch (subscription.planId) {
      case 'basic_monthly':
        modeCount = 15;
        break;
      case 'premium_monthly':
      case 'enterprise_monthly':
        modeCount = 45;
        break;
      default:
        modeCount = 3;
    }
  }
  
  return modeCount;
}

// Export functions
module.exports = {
  validateSubscription,
  hasFeatureAccess,
  getAvailableAiModes
};
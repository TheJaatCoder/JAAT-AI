/**
 * JAAT-AI Plan Activation
 * 
 * This module handles activating subscription plans for users
 * after payment has been confirmed.
 */

// Import dependencies
const fs = require('fs').promises;
const path = require('path');

// Define paths for subscription data
const CURRENT_PLAN_PATH = path.join(__dirname, 'current-plan.json');
const PLANS_PATH = path.join(__dirname, 'plans.json');

/**
 * Activates a subscription plan for a user
 * @param {string} userId - The user ID to activate the plan for
 * @param {string} planId - The plan ID to activate
 * @param {string} paymentId - The payment ID or reference
 * @param {string} [paymentMethod='manual'] - The payment method used
 * @returns {Promise<Object>} - Activation result
 */
async function activatePlan(userId, planId, paymentId, paymentMethod = 'manual') {
  try {
    // Validate inputs
    if (!userId || !planId || !paymentId) {
      throw new Error('Missing required parameters: userId, planId, or paymentId');
    }
    
    // Read available plans to validate plan ID
    const plansData = await readPlans();
    const planDetails = plansData.plans.find(plan => plan.id === planId);
    
    if (!planDetails) {
      throw new Error(`Invalid plan ID: ${planId}`);
    }
    
    // Calculate expiry date based on plan duration
    const expiryDate = calculateExpiryDate(planDetails);
    
    // Read current plan data
    let currentPlanData = await readCurrentPlan();
    
    // Create users object if it doesn't exist
    if (!currentPlanData.users) {
      currentPlanData.users = {};
    }
    
    // Update user's plan
    currentPlanData.users[userId] = {
      planId,
      activatedAt: new Date().toISOString(),
      expiresAt: expiryDate.toISOString(),
      paymentId,
      paymentMethod,
      status: 'active'
    };
    
    // Save updated plan data
    await saveCurrentPlan(currentPlanData);
    
    return {
      success: true,
      message: `Successfully activated ${planDetails.name} for user ${userId}`,
      expiresAt: expiryDate.toISOString(),
      planDetails: {
        name: planDetails.name,
        features: planDetails.features
      }
    };
  } catch (error) {
    console.error('Error activating plan:', error);
    return {
      success: false,
      message: 'Failed to activate plan',
      error: error.message
    };
  }
}

/**
 * Calculates the expiry date based on plan duration
 * @param {Object} planDetails - The plan details
 * @returns {Date} - The expiry date
 */
function calculateExpiryDate(planDetails) {
  const now = new Date();
  const expiryDate = new Date(now);
  
  // Parse duration from plan
  const durationMatch = planDetails.duration?.match(/(\d+)\s+(\w+)/);
  if (!durationMatch) {
    // Default to 30 days if duration format is invalid
    expiryDate.setDate(expiryDate.getDate() + 30);
    return expiryDate;
  }
  
  const [, amount, unit] = durationMatch;
  const numAmount = parseInt(amount, 10);
  
  // Add appropriate time based on unit
  switch (unit.toLowerCase()) {
    case 'day':
    case 'days':
      expiryDate.setDate(expiryDate.getDate() + numAmount);
      break;
    case 'week':
    case 'weeks':
      expiryDate.setDate(expiryDate.getDate() + (numAmount * 7));
      break;
    case 'month':
    case 'months':
      expiryDate.setMonth(expiryDate.getMonth() + numAmount);
      break;
    case 'year':
    case 'years':
      expiryDate.setFullYear(expiryDate.getFullYear() + numAmount);
      break;
    default:
      // Default to 30 days if unit is not recognized
      expiryDate.setDate(expiryDate.getDate() + 30);
  }
  
  return expiryDate;
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
 * Saves the current plan data to file
 * @param {Object} planData - The plan data to save
 * @returns {Promise<void>}
 */
async function saveCurrentPlan(planData) {
  try {
    const data = JSON.stringify(planData, null, 2);
    await fs.writeFile(CURRENT_PLAN_PATH, data, 'utf8');
  } catch (error) {
    console.error('Error saving current plan data:', error);
    throw error;
  }
}

/**
 * Cancel a user's subscription plan
 * @param {string} userId - The user ID to cancel the plan for
 * @returns {Promise<Object>} - Cancellation result
 */
async function cancelPlan(userId) {
  try {
    // Validate input
    if (!userId) {
      throw new Error('Missing required parameter: userId');
    }
    
    // Read current plan data
    let currentPlanData = await readCurrentPlan();
    
    // Check if user has an active plan
    if (!currentPlanData.users || !currentPlanData.users[userId]) {
      return {
        success: false,
        message: `No active subscription found for user ${userId}`
      };
    }
    
    // Mark the plan as cancelled
    currentPlanData.users[userId].status = 'cancelled';
    currentPlanData.users[userId].cancelledAt = new Date().toISOString();
    
    // Save updated plan data
    await saveCurrentPlan(currentPlanData);
    
    return {
      success: true,
      message: `Successfully cancelled subscription for user ${userId}`,
      cancelledAt: currentPlanData.users[userId].cancelledAt
    };
  } catch (error) {
    console.error('Error cancelling plan:', error);
    return {
      success: false,
      message: 'Failed to cancel plan',
      error: error.message
    };
  }
}

// Export functions
module.exports = {
  activatePlan,
  cancelPlan
};
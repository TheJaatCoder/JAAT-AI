/**
 * JAAT-AI UPI Payment Backend
 * Handles UPI payments for Indian users
 * This is a secure module that should only run on the server side
 */

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

// UPI ID is never exposed to the client
const UPI_ID = '9813072447@fam';
const UPI_DISPLAY_NAME = 'JAAT-AI Payment Service';

// Path to payment logs (in a secure location not accessible to clients)
const PAYMENT_LOG_PATH = path.join(__dirname, '../secure/payment-logs.json');

/**
 * Get UPI ID securely from file system
 * Never expose this directly to frontend
 * @returns {Promise<string>} The UPI ID
 */
async function getUpiId() {
  return UPI_ID;
}

/**
 * Log a payment intent
 * @param {Object} paymentIntent - The payment intent data
 * @returns {Promise<Object>} - The result with reference code
 */
async function logPaymentIntent(paymentIntent) {
  try {
    // Generate unique reference code
    const referenceCode = generateReferenceCode();
    
    // Create payment log entry
    const paymentLog = await readPaymentLog();
    
    paymentLog.pendingPayments.push({
      referenceCode,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency || 'USD',
      planId: paymentIntent.planId,
      userId: paymentIntent.userId,
      created: new Date().toISOString(),
      status: 'pending',
      upiId: UPI_ID
    });
    
    // Save updated log
    await savePaymentLog(paymentLog);
    
    return {
      success: true,
      referenceCode,
      displayName: UPI_DISPLAY_NAME,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency || 'USD'
    };
  } catch (error) {
    console.error('Error logging payment intent:', error);
    return {
      success: false,
      error: 'Failed to process payment intent'
    };
  }
}

/**
 * Verify and confirm a payment
 * @param {string} referenceCode - The payment reference code
 * @param {Object} verificationData - Additional verification data
 * @returns {Promise<Object>} - The verification result
 */
async function verifyPayment(referenceCode, verificationData) {
  try {
    // Read payment log
    const paymentLog = await readPaymentLog();
    
    // Find pending payment with matching reference code
    const pendingPaymentIndex = paymentLog.pendingPayments.findIndex(
      payment => payment.referenceCode === referenceCode
    );
    
    if (pendingPaymentIndex === -1) {
      return {
        success: false,
        error: 'Invalid payment reference code'
      };
    }
    
    const pendingPayment = paymentLog.pendingPayments[pendingPaymentIndex];
    
    // Check if payment amount and plan match
    if (
      pendingPayment.planId !== verificationData.planId ||
      pendingPayment.userId !== verificationData.userId
    ) {
      return {
        success: false,
        error: 'Payment details do not match'
      };
    }
    
    // Move payment from pending to confirmed
    paymentLog.pendingPayments.splice(pendingPaymentIndex, 1);
    paymentLog.confirmedPayments.push({
      ...pendingPayment,
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
      transactionId: verificationData.transactionId
    });
    
    // Save updated log
    await savePaymentLog(paymentLog);
    
    // Return success with subscription info
    return {
      success: true,
      message: 'Payment verified successfully',
      subscription: {
        id: `sub-${referenceCode}`,
        planId: pendingPayment.planId,
        created: new Date().toISOString(),
        status: 'active'
      }
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      success: false,
      error: 'Payment verification failed'
    };
  }
}

/**
 * Generate a unique reference code for payments
 * @returns {string} - A reference code
 */
function generateReferenceCode() {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(4).toString('hex');
  return `JAAT-${timestamp.slice(-6)}-${random}`;
}

/**
 * Read the payment log file
 * @returns {Promise<Object>} - The payment log data
 */
async function readPaymentLog() {
  try {
    // Make sure directory exists
    const dir = path.dirname(PAYMENT_LOG_PATH);
    await fs.mkdir(dir, { recursive: true });
    
    // Read file or create empty structure if it doesn't exist
    try {
      const data = await fs.readFile(PAYMENT_LOG_PATH, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        // File doesn't exist, return empty structure
        return {
          pendingPayments: [],
          confirmedPayments: []
        };
      }
      throw err;
    }
  } catch (error) {
    console.error('Error reading payment log:', error);
    // Return empty structure as fallback
    return {
      pendingPayments: [],
      confirmedPayments: []
    };
  }
}

/**
 * Save the payment log to file
 * @param {Object} paymentLog - The payment log to save
 * @returns {Promise<void>}
 */
async function savePaymentLog(paymentLog) {
  try {
    // Make sure directory exists
    const dir = path.dirname(PAYMENT_LOG_PATH);
    await fs.mkdir(dir, { recursive: true });
    
    // Write log to file
    await fs.writeFile(
      PAYMENT_LOG_PATH,
      JSON.stringify(paymentLog, null, 2),
      'utf8'
    );
  } catch (error) {
    console.error('Error saving payment log:', error);
    throw new Error('Failed to save payment log');
  }
}

/**
 * Get pending payments for admin review
 * @returns {Promise<Array>} - List of pending payments
 */
async function getPendingPayments() {
  try {
    const paymentLog = await readPaymentLog();
    return paymentLog.pendingPayments;
  } catch (error) {
    console.error('Error getting pending payments:', error);
    return [];
  }
}

/**
 * Handle secure manual payment request
 * This doesn't expose UPI ID in the response, only in the logs
 * @param {Object} paymentData - The payment data
 * @returns {Promise<Object>} - Payment instructions
 */
async function handleManualPayment(paymentData) {
  try {
    // Log payment intent securely
    const result = await logPaymentIntent(paymentData);
    
    if (result.success) {
      // Return only the reference code, not the UPI ID
      return {
        success: true,
        referenceCode: result.referenceCode,
        displayName: result.displayName,
        amount: result.amount,
        currency: result.currency,
        message: 'Please complete your payment using the reference code'
      };
    } else {
      return {
        success: false,
        error: result.error
      };
    }
  } catch (error) {
    console.error('Error handling manual payment:', error);
    return {
      success: false,
      error: 'Failed to process manual payment'
    };
  }
}

// Export functions (for server use only)
module.exports = {
  getUpiId,
  logPaymentIntent,
  verifyPayment,
  getPendingPayments,
  handleManualPayment
};
/**
 * JAAT-AI API Keys Manager
 * 
 * IMPORTANT: 
 * This file contains API keys for various AI services.
 * In a production environment, these should be stored in environment variables
 * or a secure server-side configuration, NOT in client-side JavaScript.
 * 
 * For development and demo purposes only.
 */

// API Keys for various services (all placeholders for demo)
const apiKeys = {
    // OpenAI API Keys
    openai: {
        key: process.env.OPENAI_API_KEY || 'sk_test_openai_key',
        organization: process.env.OPENAI_ORG_ID || '',
    },
    
    // Google AI / Vertex AI
    googleAI: {
        key: process.env.GOOGLE_AI_API_KEY || 'google_ai_key',
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'jaat-ai-project',
    },
    
    // Anthropic Claude API Key
    anthropic: {
        key: process.env.ANTHROPIC_API_KEY || 'sk_test_anthropic_key',
    },
    
    // Cohere API Key
    cohere: {
        key: process.env.COHERE_API_KEY || 'cohere_test_key',
    },
    
    // Payment Providers
    fastspring: {
        storeId: 'GL1OZXAWQJ6EN3P7THPZBG', // Your FastSpring store ID
        webhookSecret: process.env.FASTSPRING_WEBHOOK_SECRET || '',
    },
    
    // Firebase Configuration
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY || 'firebase_api_key',
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'jaat-ai.firebaseapp.com',
        projectId: process.env.FIREBASE_PROJECT_ID || 'jaat-ai',
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'jaat-ai.appspot.com',
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '000000000000',
        appId: process.env.FIREBASE_APP_ID || '1:000000000000:web:0000000000000000000000',
    },
    
    // Other AI Services
    stability: {
        key: process.env.STABILITY_API_KEY || 'stability_test_key',
    },
    
    replicate: {
        key: process.env.REPLICATE_API_KEY || 'replicate_test_key',
    },
};

/**
 * Check if API keys are properly configured
 * @returns {Object} Result with missing keys
 */
function checkApiKeys() {
    const missingKeys = {};
    const placeholderRegex = /test_|00000/;
    
    // Check for missing or placeholder keys
    for (const [service, keys] of Object.entries(apiKeys)) {
        const serviceKeys = [];
        
        for (const [keyName, keyValue] of Object.entries(keys)) {
            if (!keyValue || placeholderRegex.test(keyValue)) {
                serviceKeys.push(keyName);
            }
        }
        
        if (serviceKeys.length > 0) {
            missingKeys[service] = serviceKeys;
        }
    }
    
    return {
        allKeysConfigured: Object.keys(missingKeys).length === 0,
        missingKeys,
    };
}

// Export the API keys manager
export { apiKeys, checkApiKeys };
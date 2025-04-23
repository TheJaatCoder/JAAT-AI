/**
 * JAAT-AI API Service
 * Handles all API interactions for the JAAT-AI dashboard
 */

const API_BASE_URL = 'http://localhost:5000/api';

// API Service object
const ApiService = {
    /**
     * Get all available AI modes
     * @returns {Promise<Array>} - List of AI modes
     */
    getModes: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/modes`);
            if (!response.ok) {
                throw new Error(`Failed to fetch modes: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching AI modes:', error);
            return [];
        }
    },

    /**
     * Get user statistics
     * @returns {Promise<Object>} - User stats
     */
    getStats: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/stats`);
            if (!response.ok) {
                throw new Error(`Failed to fetch stats: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching stats:', error);
            return null;
        }
    },

    /**
     * Get user profile information
     * @returns {Promise<Object>} - User profile
     */
    getUserProfile: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/profile`);
            if (!response.ok) {
                throw new Error(`Failed to fetch profile: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    },

    /**
     * Send a message to the AI
     * @param {string} message - The message to send
     * @param {string} modeId - The mode ID (optional)
     * @returns {Promise<Object>} - AI response
     */
    sendMessage: async function(message, modeId = null) {
        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    modeId
                })
            });
            
            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error sending message:', error);
            return {
                message: "Sorry, I couldn't process your request. Please try again.",
                mode: "Error"
            };
        }
    }
};

// Export the API Service
window.ApiService = ApiService;
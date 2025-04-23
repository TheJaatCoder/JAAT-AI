/**
 * JAAT-AI Customizable AI Personality Feature
 * Allows users to customize the AI's personality, tone, and response style
 */

class CustomizableAIPersonality {
    constructor() {
        this.personalities = {
            friendly: {
                name: "Friendly",
                description: "Warm, approachable, and conversational tone",
                emoji: "😊",
                responseStyle: "casual",
                greetingMessage: "Hey there! How can I help you today?",
                responseTemplate: "I'm happy to {action} for you! {content}"
            },
            professional: {
                name: "Professional",
                description: "Formal, precise, and business-oriented",
                emoji: "👔",
                responseStyle: "formal",
                greetingMessage: "Good day. How may I assist you?",
                responseTemplate: "I would like to {action}. {content}"
            },
            technical: {
                name: "Technical",
                description: "Detailed, technical, and precise explanations",
                emoji: "🔧",
                responseStyle: "technical",
                greetingMessage: "Ready for technical assistance. What can I help with?",
                responseTemplate: "Analysis complete. {action} result: {content}"
            },
            creative: {
                name: "Creative",
                description: "Imaginative, expressive, and artistic",
                emoji: "🎨",
                responseStyle: "creative",
                greetingMessage: "Ready to create and inspire! What's on your mind?",
                responseTemplate: "Creatively {action}... {content}"
            },
            humorous: {
                name: "Humorous",
                description: "Lighthearted, funny, and entertaining",
                emoji: "😄",
                responseStyle: "humorous",
                greetingMessage: "Hey there! Ready for some fun and helpful AI magic?",
                responseTemplate: "Well, I just {action}... *drum roll* {content}"
            }
        };
        
        this.currentPersonality = this.getPersonality() || 'friendly';
        this.dom = {};
        this.initialized = false;
    }
    
    /**
     * Initialize the feature
     */
    async init() {
        if (this.initialized) return;
        
        console.log('Initializing Customizable AI Personality feature');
        
        // Create the UI elements if they don't exist
        this.createUI();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Apply the current personality
        this.applyPersonality(this.currentPersonality);
        
        this.initialized = true;
        return this;
    }
    
    /**
     * Create UI elements for personality selection
     */
    createUI() {
        // Check if sidebar exists
        const sidebar = document.querySelector('#sidebar');
        if (!sidebar) return;
        
        // Check if settings section exists, create if not
        let settingsSection = document.querySelector('#settings-section');
        if (!settingsSection) {
            // Find the last hr in the sidebar
            const lastHr = Array.from(sidebar.querySelectorAll('hr')).pop();
            if (lastHr) {
                // Create settings section
                const settingsSectionHtml = `
                    <div id="settings-section" class="px-3 mb-3">
                        <h6 class="text-muted mb-2">Settings</h6>
                        <div id="personality-settings">
                            <label class="form-label text-light mb-1">AI Personality</label>
                            <select id="personality-selector" class="form-select form-select-sm bg-dark text-light border-secondary">
                                ${Object.entries(this.personalities).map(([key, personality]) => 
                                    `<option value="${key}">${personality.emoji} ${personality.name}</option>`
                                ).join('')}
                            </select>
                            <div id="personality-description" class="text-muted mt-1 small"></div>
                        </div>
                    </div>
                `;
                lastHr.insertAdjacentHTML('afterend', settingsSectionHtml);
                
                // Store DOM references
                this.dom.select = document.querySelector('#personality-selector');
                this.dom.description = document.querySelector('#personality-description');
            }
        }
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        if (this.dom.select) {
            this.dom.select.addEventListener('change', (e) => {
                const personality = e.target.value;
                this.applyPersonality(personality);
                this.savePersonality(personality);
            });
        }
    }
    
    /**
     * Apply selected personality
     * @param {string} personalityKey - Key of personality to apply
     */
    applyPersonality(personalityKey) {
        const personality = this.personalities[personalityKey];
        if (!personality) return;
        
        // Update UI
        if (this.dom.select) {
            this.dom.select.value = personalityKey;
        }
        
        if (this.dom.description) {
            this.dom.description.textContent = personality.description;
        }
        
        // Set as current
        this.currentPersonality = personalityKey;
        
        // Update greeting message if empty chat
        const chatMessages = document.querySelector('#chat-messages');
        if (chatMessages && chatMessages.childElementCount <= 1) {
            const systemMessage = chatMessages.querySelector('.system-message .message-content p');
            if (systemMessage) {
                systemMessage.textContent = personality.greetingMessage;
            }
        }
        
        console.log(`Personality changed to ${personality.name}`);
    }
    
    /**
     * Format a response based on the current personality
     * @param {string} action - The action being performed
     * @param {string} content - The content of the response
     * @returns {string} - Formatted response
     */
    formatResponse(action, content) {
        const personality = this.personalities[this.currentPersonality];
        if (!personality) return content;
        
        return personality.responseTemplate
            .replace('{action}', action)
            .replace('{content}', content);
    }
    
    /**
     * Save selected personality to local storage
     * @param {string} personalityKey - Key of personality to save
     */
    savePersonality(personalityKey) {
        try {
            localStorage.setItem('jaat_ai_personality', personalityKey);
        } catch (e) {
            console.error('Failed to save personality setting:', e);
        }
    }
    
    /**
     * Get saved personality from local storage
     * @returns {string|null} - Saved personality key or null
     */
    getPersonality() {
        try {
            return localStorage.getItem('jaat_ai_personality');
        } catch (e) {
            console.error('Failed to get personality setting:', e);
            return null;
        }
    }
}

// Initialize and export
const customizableAIPersonality = new CustomizableAIPersonality();
export default customizableAIPersonality;

// If not importing, initialize on load
if (typeof window !== 'undefined' && !window.customizableAIPersonality) {
    window.customizableAIPersonality = customizableAIPersonality;
    document.addEventListener('DOMContentLoaded', () => customizableAIPersonality.init());
}
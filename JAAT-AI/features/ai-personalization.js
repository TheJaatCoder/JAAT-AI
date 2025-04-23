/**
 * JAAT-AI Personalization Feature
 * Provides advanced AI personalization options with adaptive learning
 */

class AIPersonalization {
    constructor() {
        this.userPreferences = {
            responseLength: 'medium', // 'brief', 'medium', 'detailed'
            technicalLevel: 'balanced', // 'beginner', 'balanced', 'expert'
            tone: 'professional', // 'casual', 'professional', 'enthusiastic', 'empathetic', 'humorous'
            examples: true, // whether to include examples in responses
            citations: false, // whether to include citations/sources
            visuals: true, // whether to include charts/diagrams when applicable
            creativity: 0.7, // 0.0 to 1.0 scale
            priorityTopics: [], // user's preferred topics/domains
            avoidTopics: [] // topics to avoid
        };
        
        // Interaction history summary (for personalization learning)
        this.interactionHistory = {
            totalInteractions: 0,
            positiveFeedback: 0,
            topicsEngaged: {},
            preferredStyles: {},
            lastUpdate: null
        };
        
        // AI personalities with predefined settings
        this.personalities = {
            assistant: {
                name: 'Professional Assistant',
                description: 'A balanced, helpful assistant focused on providing clear and accurate information.',
                settings: {
                    responseLength: 'medium',
                    technicalLevel: 'balanced',
                    tone: 'professional',
                    examples: true,
                    citations: true,
                    creativity: 0.5
                }
            },
            expert: {
                name: 'Technical Expert',
                description: 'Detailed, technical responses with in-depth analysis and specialized terminology.',
                settings: {
                    responseLength: 'detailed',
                    technicalLevel: 'expert',
                    tone: 'professional',
                    examples: true,
                    citations: true,
                    creativity: 0.3
                }
            },
            teacher: {
                name: 'Friendly Teacher',
                description: 'Patient explanations with examples and analogies to help understanding.',
                settings: {
                    responseLength: 'medium',
                    technicalLevel: 'beginner',
                    tone: 'empathetic',
                    examples: true,
                    citations: false,
                    creativity: 0.6
                }
            },
            creative: {
                name: 'Creative Partner',
                description: 'Imaginative and inspiring responses that encourage creativity and exploration.',
                settings: {
                    responseLength: 'medium',
                    technicalLevel: 'balanced',
                    tone: 'enthusiastic',
                    examples: true,
                    citations: false,
                    creativity: 0.9
                }
            },
            concise: {
                name: 'Efficient Summarizer',
                description: 'Brief, to-the-point responses focusing on key information without extra details.',
                settings: {
                    responseLength: 'brief',
                    technicalLevel: 'balanced',
                    tone: 'professional',
                    examples: false,
                    citations: false,
                    creativity: 0.2
                }
            },
            friendly: {
                name: 'Casual Friend',
                description: 'Warm, conversational responses with a friendly and approachable tone.',
                settings: {
                    responseLength: 'medium',
                    technicalLevel: 'beginner',
                    tone: 'casual',
                    examples: true,
                    citations: false,
                    creativity: 0.7
                }
            },
            humorous: {
                name: 'Witty Companion',
                description: 'Responses with a touch of humor and lightheartedness while still being informative.',
                settings: {
                    responseLength: 'medium',
                    technicalLevel: 'balanced',
                    tone: 'humorous',
                    examples: true,
                    citations: false,
                    creativity: 0.8
                }
            }
        };
        
        // Load saved preferences if available
        this.loadPreferences();
        
        console.log('JAAT-AI Personalization feature initialized');
    }
    
    /**
     * Load user preferences from localStorage
     */
    loadPreferences() {
        try {
            const savedPreferences = localStorage.getItem('jaat-user-preferences');
            if (savedPreferences) {
                this.userPreferences = { ...this.userPreferences, ...JSON.parse(savedPreferences) };
            }
            
            const savedHistory = localStorage.getItem('jaat-interaction-history');
            if (savedHistory) {
                this.interactionHistory = { ...this.interactionHistory, ...JSON.parse(savedHistory) };
            }
        } catch (error) {
            console.error('Failed to load personalization preferences:', error);
        }
    }
    
    /**
     * Save user preferences to localStorage
     */
    savePreferences() {
        try {
            localStorage.setItem('jaat-user-preferences', JSON.stringify(this.userPreferences));
            localStorage.setItem('jaat-interaction-history', JSON.stringify(this.interactionHistory));
        } catch (error) {
            console.error('Failed to save personalization preferences:', error);
        }
    }
    
    /**
     * Apply a predefined personality
     * @param {string} personalityId - The ID of the personality to apply
     * @returns {boolean} Whether personality was applied successfully
     */
    applyPersonality(personalityId) {
        if (!this.personalities[personalityId]) {
            console.error('Personality not found:', personalityId);
            return false;
        }
        
        // Apply personality settings
        const personality = this.personalities[personalityId];
        this.userPreferences = { ...this.userPreferences, ...personality.settings };
        
        // Save the updated preferences
        this.savePreferences();
        
        // Dispatch personality change event
        this.dispatchEvent('personalityChanged', { 
            personalityId, 
            name: personality.name 
        });
        
        return true;
    }
    
    /**
     * Update a specific preference setting
     * @param {string} key - Preference key to update
     * @param {any} value - New value for the preference
     * @returns {boolean} Whether preference was updated successfully
     */
    updatePreference(key, value) {
        // Validate that the key exists in preferences
        if (!(key in this.userPreferences)) {
            console.error('Invalid preference key:', key);
            return false;
        }
        
        // Validate value based on preference type
        if (key === 'responseLength' && !['brief', 'medium', 'detailed'].includes(value)) {
            console.error('Invalid value for responseLength:', value);
            return false;
        } else if (key === 'technicalLevel' && !['beginner', 'balanced', 'expert'].includes(value)) {
            console.error('Invalid value for technicalLevel:', value);
            return false;
        } else if (key === 'tone' && !['casual', 'professional', 'enthusiastic', 'empathetic', 'humorous'].includes(value)) {
            console.error('Invalid value for tone:', value);
            return false;
        } else if ((key === 'examples' || key === 'citations' || key === 'visuals') && typeof value !== 'boolean') {
            console.error(`Invalid value for ${key}, expected boolean:`, value);
            return false;
        } else if (key === 'creativity' && (typeof value !== 'number' || value < 0 || value > 1)) {
            console.error('Invalid value for creativity, expected number between 0 and 1:', value);
            return false;
        } else if ((key === 'priorityTopics' || key === 'avoidTopics') && !Array.isArray(value)) {
            console.error(`Invalid value for ${key}, expected array:`, value);
            return false;
        }
        
        // Update preference
        this.userPreferences[key] = value;
        
        // Save the updated preferences
        this.savePreferences();
        
        // Dispatch preference change event
        this.dispatchEvent('preferenceChanged', { key, value });
        
        return true;
    }
    
    /**
     * Record an interaction for adaptive learning
     * @param {Object} interaction - Interaction data
     * @param {string} interaction.query - User's query
     * @param {string} interaction.response - AI response
     * @param {Array} interaction.topics - Topics detected in the interaction
     * @param {boolean} interaction.positiveFeedback - Whether user gave positive feedback
     */
    recordInteraction(interaction) {
        // Update interaction counts
        this.interactionHistory.totalInteractions++;
        if (interaction.positiveFeedback) {
            this.interactionHistory.positiveFeedback++;
        }
        
        // Update topics engaged
        if (interaction.topics && Array.isArray(interaction.topics)) {
            interaction.topics.forEach(topic => {
                if (!this.interactionHistory.topicsEngaged[topic]) {
                    this.interactionHistory.topicsEngaged[topic] = 1;
                } else {
                    this.interactionHistory.topicsEngaged[topic]++;
                }
            });
        }
        
        // Record last update time
        this.interactionHistory.lastUpdate = new Date().toISOString();
        
        // Save the updated history
        this.savePreferences();
        
        // If we have enough data, analyze patterns and adjust preferences
        if (this.interactionHistory.totalInteractions % 10 === 0) {
            this.analyzeInteractionPatterns();
        }
    }
    
    /**
     * Analyze interaction patterns and adjust preferences
     */
    analyzeInteractionPatterns() {
        // Identify frequently engaged topics
        const topTopics = Object.entries(this.interactionHistory.topicsEngaged)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(entry => entry[0]);
        
        // Update priority topics if we have new insights
        if (topTopics.length > 0) {
            const currentTopics = new Set(this.userPreferences.priorityTopics);
            topTopics.forEach(topic => currentTopics.add(topic));
            this.userPreferences.priorityTopics = Array.from(currentTopics).slice(0, 10);
        }
        
        // Save the updated preferences
        this.savePreferences();
    }
    
    /**
     * Prepare personalization data for chat request
     * @returns {Object} Personalization data to include with chat request
     */
    preparePersonalizationData() {
        return {
            preferences: { ...this.userPreferences },
            interactionSummary: {
                totalInteractions: this.interactionHistory.totalInteractions,
                preferredTopics: this.userPreferences.priorityTopics,
                avoidTopics: this.userPreferences.avoidTopics
            }
        };
    }
    
    /**
     * Get list of available personalities
     * @returns {Array} Array of personality objects
     */
    getPersonalities() {
        return Object.entries(this.personalities).map(([id, personality]) => ({
            id,
            name: personality.name,
            description: personality.description
        }));
    }
    
    /**
     * Get current user preferences
     * @returns {Object} Current user preferences
     */
    getPreferences() {
        return { ...this.userPreferences };
    }
    
    /**
     * Reset preferences to defaults
     */
    resetPreferences() {
        this.userPreferences = {
            responseLength: 'medium',
            technicalLevel: 'balanced',
            tone: 'professional',
            examples: true,
            citations: false,
            visuals: true,
            creativity: 0.7,
            priorityTopics: [],
            avoidTopics: []
        };
        
        // Save the reset preferences
        this.savePreferences();
        
        // Dispatch reset event
        this.dispatchEvent('preferencesReset');
    }
    
    /**
     * Dispatch a custom event
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event details
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`jaat.personalization.${eventName}`, { 
            detail,
            bubbles: true
        });
        document.dispatchEvent(event);
    }
}

// Register the feature with JAAT-AI
if (window.JAAT) {
    window.JAAT.registerFeature('ai-personalization', new AIPersonalization());
}

// Add initialization code
document.addEventListener('DOMContentLoaded', function() {
    // If the chat space exists, add personality selector
    const chatHeader = document.querySelector('.chat-header');
    if (chatHeader && window.JAAT && window.JAAT.features['ai-personalization']) {
        // Create personality selector if it doesn't exist
        if (!document.querySelector('.personality-selector')) {
            // Get all personalities
            const personalities = window.JAAT.features['ai-personalization'].getPersonalities();
            
            // Create selector container
            const selectorContainer = document.createElement('div');
            selectorContainer.className = 'personality-selector-container';
            
            // Create label
            const label = document.createElement('span');
            label.className = 'personality-label';
            label.textContent = 'AI Personality:';
            
            // Create select element
            const select = document.createElement('select');
            select.className = 'personality-selector';
            
            // Add options
            personalities.forEach(personality => {
                const option = document.createElement('option');
                option.value = personality.id;
                option.textContent = personality.name;
                option.title = personality.description;
                select.appendChild(option);
            });
            
            // Add event listener
            select.addEventListener('change', function() {
                const personalityId = this.value;
                window.JAAT.features['ai-personalization'].applyPersonality(personalityId);
                
                // Visual feedback
                select.classList.add('personality-changed');
                setTimeout(() => {
                    select.classList.remove('personality-changed');
                }, 1000);
            });
            
            // Assemble and add to chat header
            selectorContainer.appendChild(label);
            selectorContainer.appendChild(select);
            
            // Find the chat title element and insert after it
            const chatTitle = chatHeader.querySelector('.chat-title');
            if (chatTitle) {
                chatTitle.parentNode.insertBefore(selectorContainer, chatTitle.nextSibling);
            } else {
                chatHeader.appendChild(selectorContainer);
            }
            
            // Apply basic styles
            selectorContainer.style.display = 'flex';
            selectorContainer.style.alignItems = 'center';
            selectorContainer.style.marginLeft = '20px';
            
            label.style.marginRight = '10px';
            label.style.fontSize = '0.9rem';
            
            select.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            select.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            select.style.borderRadius = '4px';
            select.style.padding = '4px 8px';
            select.style.color = 'inherit';
            select.style.fontSize = '0.9rem';
            
            // Add transition for visual feedback
            select.style.transition = 'background-color 0.3s ease';
        }
        
        // Add feedback buttons to messages
        const addFeedbackToMessages = () => {
            const aiMessages = document.querySelectorAll('.message:not(.user):not(.has-feedback)');
            
            aiMessages.forEach(message => {
                // Mark message as processed
                message.classList.add('has-feedback');
                
                // Create feedback container
                const feedbackContainer = document.createElement('div');
                feedbackContainer.className = 'message-feedback';
                feedbackContainer.style.display = 'flex';
                feedbackContainer.style.justifyContent = 'flex-end';
                feedbackContainer.style.marginTop = '8px';
                
                // Create thumbs up button
                const thumbsUp = document.createElement('button');
                thumbsUp.className = 'feedback-button thumbs-up';
                thumbsUp.innerHTML = '<i class="fas fa-thumbs-up"></i>';
                thumbsUp.title = 'Helpful response';
                thumbsUp.style.backgroundColor = 'transparent';
                thumbsUp.style.border = 'none';
                thumbsUp.style.color = 'rgba(255, 255, 255, 0.5)';
                thumbsUp.style.margin = '0 4px';
                thumbsUp.style.cursor = 'pointer';
                thumbsUp.style.transition = 'color 0.2s ease';
                
                // Create thumbs down button
                const thumbsDown = document.createElement('button');
                thumbsDown.className = 'feedback-button thumbs-down';
                thumbsDown.innerHTML = '<i class="fas fa-thumbs-down"></i>';
                thumbsDown.title = 'Unhelpful response';
                thumbsDown.style.backgroundColor = 'transparent';
                thumbsDown.style.border = 'none';
                thumbsDown.style.color = 'rgba(255, 255, 255, 0.5)';
                thumbsDown.style.margin = '0 4px';
                thumbsDown.style.cursor = 'pointer';
                thumbsDown.style.transition = 'color 0.2s ease';
                
                // Add hover effects
                thumbsUp.addEventListener('mouseover', () => {
                    thumbsUp.style.color = '#4CAF50';
                });
                thumbsUp.addEventListener('mouseout', () => {
                    if (!thumbsUp.classList.contains('selected')) {
                        thumbsUp.style.color = 'rgba(255, 255, 255, 0.5)';
                    }
                });
                
                thumbsDown.addEventListener('mouseover', () => {
                    thumbsDown.style.color = '#F44336';
                });
                thumbsDown.addEventListener('mouseout', () => {
                    if (!thumbsDown.classList.contains('selected')) {
                        thumbsDown.style.color = 'rgba(255, 255, 255, 0.5)';
                    }
                });
                
                // Add click handlers
                thumbsUp.addEventListener('click', () => {
                    thumbsUp.classList.add('selected');
                    thumbsUp.style.color = '#4CAF50';
                    thumbsDown.classList.remove('selected');
                    thumbsDown.style.color = 'rgba(255, 255, 255, 0.5)';
                    
                    // Record positive feedback
                    if (window.JAAT && window.JAAT.features['ai-personalization']) {
                        window.JAAT.features['ai-personalization'].recordInteraction({
                            query: message.previousElementSibling?.textContent || '',
                            response: message.textContent,
                            topics: [], // Would be detected by NLP in a real app
                            positiveFeedback: true
                        });
                    }
                });
                
                thumbsDown.addEventListener('click', () => {
                    thumbsDown.classList.add('selected');
                    thumbsDown.style.color = '#F44336';
                    thumbsUp.classList.remove('selected');
                    thumbsUp.style.color = 'rgba(255, 255, 255, 0.5)';
                    
                    // Record negative feedback
                    if (window.JAAT && window.JAAT.features['ai-personalization']) {
                        window.JAAT.features['ai-personalization'].recordInteraction({
                            query: message.previousElementSibling?.textContent || '',
                            response: message.textContent,
                            topics: [], // Would be detected by NLP in a real app
                            positiveFeedback: false
                        });
                    }
                });
                
                // Add feedback buttons to container
                feedbackContainer.appendChild(thumbsUp);
                feedbackContainer.appendChild(thumbsDown);
                
                // Find message content and append feedback
                const messageContent = message.querySelector('.message-content');
                if (messageContent) {
                    messageContent.appendChild(feedbackContainer);
                } else {
                    message.appendChild(feedbackContainer);
                }
            });
        };
        
        // Run initially and set up mutation observer to handle new messages
        addFeedbackToMessages();
        
        // Create an observer instance
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    addFeedbackToMessages();
                }
            });
        });
        
        // Start observing the chat messages container
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages) {
            observer.observe(chatMessages, {
                childList: true,
                subtree: true
            });
        }
    }
});
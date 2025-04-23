/**
 * JAAT-AI Advanced Mental Health Chatbot
 * A specialized AI chatbot for mental health support and resources
 */

class AdvancedMentalHealthChatbot {
    constructor() {
        this.initialized = false;
        this.dom = {};
        this.active = false;
        this.resources = [
            {
                name: "Crisis Text Line",
                description: "Text HOME to 741741 for free 24/7 crisis counseling in the US",
                url: "https://www.crisistextline.org/"
            },
            {
                name: "National Suicide Prevention Lifeline",
                description: "Call 988 or 1-800-273-8255 for 24/7 support in the US",
                url: "https://suicidepreventionlifeline.org/"
            },
            {
                name: "SAMHSA's National Helpline",
                description: "1-800-662-4357 - Treatment referral and information service",
                url: "https://www.samhsa.gov/find-help/national-helpline"
            },
            {
                name: "7 Cups",
                description: "Online therapy and free support",
                url: "https://www.7cups.com/"
            },
            {
                name: "Mindfulness Exercises",
                description: "Free mindfulness resources",
                url: "https://www.mindfulnessexercises.com/"
            }
        ];
        
        // Sample coping strategies
        this.copingStrategies = [
            { 
                name: "Deep Breathing", 
                description: "Breathe in slowly for 4 counts, hold for 2, and exhale for 6 counts. Repeat 5 times."
            },
            { 
                name: "5-4-3-2-1 Grounding", 
                description: "Acknowledge 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste."
            },
            { 
                name: "Progressive Muscle Relaxation", 
                description: "Tense and then relax each muscle group in your body, starting from your toes and working up to your head."
            },
            { 
                name: "Thought Challenging", 
                description: "Identify negative thoughts and challenge them with evidence-based alternatives."
            },
            { 
                name: "Mindful Walking", 
                description: "Take a walk while focusing on each step, your breathing, and the sensations in your body."
            }
        ];
    }
    
    /**
     * Initialize the feature
     */
    async init() {
        if (this.initialized) return;
        
        console.log('Initializing Advanced Mental Health Chatbot feature');
        
        // Check if we're on the chat page
        if (!document.querySelector('.chat-container, #chat-section, #chat-messages')) {
            return;
        }
        
        // Create the UI elements
        this.createUI();
        
        // Set up event listeners
        this.setupEventListeners();
        
        this.initialized = true;
        return this;
    }
    
    /**
     * Create the UI for mental health chatbot
     */
    createUI() {
        // Add mode selection option
        this.addModeOption();
        
        // Add mental health resources panel
        this.addResourcesPanel();
        
        // Add custom styles
        this.addStyles();
    }
    
    /**
     * Add Mental Health mode to mode selector
     */
    addModeOption() {
        const modesGrid = document.querySelector('.modes-grid');
        if (!modesGrid) return;
        
        // Check if the mode already exists
        if (document.querySelector('[data-mode="mental-health"]')) return;
        
        // Find where to insert our mode before the "View All" button
        const viewAllButton = modesGrid.querySelector('.view-all-modes');
        
        if (viewAllButton) {
            const modeCardHTML = `
                <div class="mode-card" data-mode="mental-health">
                    <div class="mode-icon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <h3>Mental Health Support</h3>
                    <p>Emotional support and resources</p>
                </div>
            `;
            
            viewAllButton.insertAdjacentHTML('beforebegin', modeCardHTML);
            
            // Store DOM reference
            this.dom.modeCard = document.querySelector('[data-mode="mental-health"]');
        }
    }
    
    /**
     * Add mental health resources panel
     */
    addResourcesPanel() {
        const chatContainer = document.querySelector('.chat-container');
        if (!chatContainer) return;
        
        const resourcesPanelHTML = `
            <div id="mental-health-resources" class="resources-panel hidden">
                <div class="resources-header">
                    <h3><i class="fas fa-heart"></i> Mental Health Resources</h3>
                    <button class="btn-icon" id="close-resources">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="resources-disclaimer">
                    <p><strong>Important:</strong> This AI provides information and support, but is not a substitute for professional mental health care. If you're in crisis, please use one of the resources below to get immediate help.</p>
                </div>
                
                <div class="resources-content">
                    <div class="resources-section">
                        <h4>Crisis Support</h4>
                        <ul class="resources-list">
                            ${this.resources.slice(0, 3).map(resource => `
                                <li class="resource-item">
                                    <a href="${resource.url}" target="_blank" rel="noopener noreferrer">
                                        <strong>${resource.name}</strong>
                                    </a>
                                    <p>${resource.description}</p>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="resources-section">
                        <h4>Self-Help Resources</h4>
                        <ul class="resources-list">
                            ${this.resources.slice(3).map(resource => `
                                <li class="resource-item">
                                    <a href="${resource.url}" target="_blank" rel="noopener noreferrer">
                                        <strong>${resource.name}</strong>
                                    </a>
                                    <p>${resource.description}</p>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="resources-section">
                        <h4>Coping Strategies</h4>
                        <div class="coping-strategies">
                            ${this.copingStrategies.map(strategy => `
                                <div class="coping-card">
                                    <h5>${strategy.name}</h5>
                                    <p>${strategy.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="resources-footer">
                    <button id="share-resources" class="btn-outline">
                        <i class="fas fa-share-alt"></i> Share Resources
                    </button>
                </div>
            </div>
        `;
        
        chatContainer.insertAdjacentHTML('afterend', resourcesPanelHTML);
        
        // Store DOM references
        this.dom.resourcesPanel = document.getElementById('mental-health-resources');
        this.dom.closeResourcesBtn = document.getElementById('close-resources');
        this.dom.shareResourcesBtn = document.getElementById('share-resources');
    }
    
    /**
     * Add custom styles for mental health chatbot
     */
    addStyles() {
        if (document.getElementById('mental-health-styles')) return;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'mental-health-styles';
        styleElement.textContent = `
            /* Mental Health Mode Specific Styles */
            .mode-card[data-mode="mental-health"] .mode-icon {
                background: linear-gradient(135deg, #ff7e7e, #ff5252);
            }
            
            .mode-card[data-mode="mental-health"].active .mode-icon {
                animation: pulse-heart 2s infinite;
            }
            
            @keyframes pulse-heart {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            /* Mental Health Chat Styling */
            .mental-health-mode .chat-header {
                background: linear-gradient(135deg, #ff7e7e, #ff5252);
                color: white;
            }
            
            .mental-health-mode .chat-header h2 {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .mental-health-mode .message.ai-message .message-avatar {
                border-color: #ff5252;
            }
            
            /* Resources Panel */
            .resources-panel {
                margin-top: 1rem;
                border-radius: 8px;
                background: white;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                max-height: 0;
                transition: max-height 0.3s ease;
            }
            
            .resources-panel:not(.hidden) {
                max-height: 1000px;
            }
            
            .resources-header {
                padding: 1rem;
                background: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .resources-header h3 {
                margin: 0;
                font-size: 1.1rem;
                display: flex;
                align-items: center;
                gap: 8px;
                color: #ff5252;
            }
            
            .resources-disclaimer {
                padding: 0.75rem 1rem;
                background: #fff4f4;
                border-bottom: 1px solid #ffe0e0;
            }
            
            .resources-disclaimer p {
                margin: 0;
                font-size: 0.9rem;
                color: #e63946;
            }
            
            .resources-content {
                padding: 1rem;
            }
            
            .resources-section {
                margin-bottom: 1.5rem;
            }
            
            .resources-section h4 {
                margin-top: 0;
                margin-bottom: 0.75rem;
                font-size: 1rem;
                color: #343a40;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid #e9ecef;
            }
            
            .resources-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .resource-item {
                padding: 0.75rem;
                border-radius: 4px;
                background: #f8f9fa;
                margin-bottom: 0.5rem;
            }
            
            .resource-item a {
                color: #ff5252;
                text-decoration: none;
            }
            
            .resource-item p {
                margin: 0.5rem 0 0 0;
                font-size: 0.85rem;
                color: #6c757d;
            }
            
            .coping-strategies {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 0.75rem;
            }
            
            .coping-card {
                padding: 0.75rem;
                border-radius: 4px;
                background: #f8f9fa;
                border-left: 3px solid #ff5252;
            }
            
            .coping-card h5 {
                margin: 0 0 0.5rem 0;
                font-size: 0.9rem;
                color: #343a40;
            }
            
            .coping-card p {
                margin: 0;
                font-size: 0.85rem;
                color: #6c757d;
            }
            
            .resources-footer {
                padding: 1rem;
                background: #f8f9fa;
                border-top: 1px solid #e9ecef;
                text-align: center;
            }
            
            /* Dark Mode Support */
            .theme-dark .resources-panel {
                background: #2d2d2d;
            }
            
            .theme-dark .resources-header {
                background: #222;
                border-color: #444;
            }
            
            .theme-dark .resources-disclaimer {
                background: #3a2c2d;
                border-color: #5c3739;
            }
            
            .theme-dark .resources-section h4 {
                color: #e9ecef;
                border-color: #444;
            }
            
            .theme-dark .resource-item,
            .theme-dark .coping-card {
                background: #333;
            }
            
            .theme-dark .resource-item p,
            .theme-dark .coping-card p {
                color: #adb5bd;
            }
            
            .theme-dark .resources-footer {
                background: #222;
                border-color: #444;
            }
            
            /* Helper classes */
            .hidden {
                display: none !important;
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Mode selection
        if (this.dom.modeCard) {
            this.dom.modeCard.addEventListener('click', () => {
                this.activateMentalHealthMode();
            });
        }
        
        // Close resources panel
        if (this.dom.closeResourcesBtn) {
            this.dom.closeResourcesBtn.addEventListener('click', () => {
                this.toggleResourcesPanel(false);
            });
        }
        
        // Share resources
        if (this.dom.shareResourcesBtn) {
            this.dom.shareResourcesBtn.addEventListener('click', () => {
                this.shareResources();
            });
        }
        
        // Listen for messages to detect mental health related queries
        this.listenForMentalHealthQueries();
    }
    
    /**
     * Activate mental health mode
     */
    activateMentalHealthMode() {
        // Toggle active state on the mode card
        document.querySelectorAll('.mode-card').forEach(card => {
            card.classList.remove('active');
        });
        this.dom.modeCard.classList.add('active');
        
        // Update chat header
        const chatHeader = document.querySelector('.chat-header h2');
        if (chatHeader) {
            chatHeader.innerHTML = '<i class="fas fa-heart"></i> Mental Health Support';
        }
        
        // Add mental health mode class to chat container
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.classList.add('mental-health-mode');
        }
        
        // Show welcome message
        this.showMentalHealthWelcome();
        
        // Show resources panel
        this.toggleResourcesPanel(true);
        
        // Set mode as active
        this.active = true;
    }
    
    /**
     * Toggle resources panel
     * @param {boolean} show - Whether to show or hide the panel
     */
    toggleResourcesPanel(show) {
        if (!this.dom.resourcesPanel) return;
        
        if (show) {
            this.dom.resourcesPanel.classList.remove('hidden');
        } else {
            this.dom.resourcesPanel.classList.add('hidden');
        }
    }
    
    /**
     * Show mental health welcome message
     */
    showMentalHealthWelcome() {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const welcomeHTML = `
            <div class="message ai-message fade-in">
                <div class="message-avatar animated">
                    <img src="/assets/images/logo.png" alt="AI Avatar">
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="sender-name">JAAT-AI Mental Health Support</span>
                        <span class="message-time">Just now</span>
                    </div>
                    <div class="message-text typing">
                        <p>Hello, I'm here to provide emotional support and resources for mental wellbeing. I'm not a replacement for professional help, but I can offer information, coping strategies, and a space to talk.</p>
                        <p>How are you feeling today? Remember, it's okay to not be okay sometimes.</p>
                    </div>
                    <div class="message-actions">
                        <button class="btn-icon" title="Read Aloud"><i class="fas fa-volume-up"></i></button>
                        <button class="btn-icon" title="Copy to Clipboard"><i class="fas fa-copy"></i></button>
                        <button class="btn-icon" title="Like"><i class="far fa-thumbs-up"></i></button>
                        <button class="btn-icon" title="Dislike"><i class="far fa-thumbs-down"></i></button>
                    </div>
                </div>
            </div>
            
            <div class="message-suggestions">
                <div class="suggestion-chip">I'm feeling anxious</div>
                <div class="suggestion-chip">I'm having trouble sleeping</div>
                <div class="suggestion-chip">I need coping strategies</div>
                <div class="suggestion-chip">I'd like to see resources</div>
            </div>
        `;
        
        // Clear existing messages
        chatMessages.innerHTML = welcomeHTML;
        
        // Add click events to suggestion chips
        chatMessages.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const chatInput = document.getElementById('chat-input');
                const sendButton = document.getElementById('send-btn');
                
                if (chatInput && sendButton) {
                    chatInput.value = chip.textContent;
                    sendButton.click();
                }
            });
        });
    }
    
    /**
     * Share resources via clipboard
     */
    shareResources() {
        const resourcesList = this.resources.map(resource => 
            `${resource.name}: ${resource.description}\n${resource.url}`
        ).join('\n\n');
        
        const shareText = `Mental Health Resources:\n\n${resourcesList}`;
        
        navigator.clipboard.writeText(shareText)
            .then(() => {
                // Show success feedback
                const originalText = this.dom.shareResourcesBtn.innerHTML;
                this.dom.shareResourcesBtn.innerHTML = '<i class="fas fa-check"></i> Copied to Clipboard';
                
                setTimeout(() => {
                    this.dom.shareResourcesBtn.innerHTML = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy resources: ', err);
            });
    }
    
    /**
     * Listen for mental health related queries
     */
    listenForMentalHealthQueries() {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-btn');
        
        if (!chatInput || !sendButton) return;
        
        // Original send function
        const originalSendFunction = sendButton.onclick;
        
        // Override send button click
        sendButton.onclick = (event) => {
            const text = chatInput.value.trim().toLowerCase();
            
            // Check if it's a mental health query while not in mental health mode
            if (!this.active && this.isMentalHealthQuery(text)) {
                // Suggest mental health mode
                this.suggestMentalHealthMode(text);
                return; // Prevent original send
            }
            
            // Process in mental health mode
            if (this.active) {
                this.processMentalHealthQuery(text);
            }
            
            // Call original function
            if (originalSendFunction) {
                originalSendFunction.call(sendButton, event);
            }
        };
    }
    
    /**
     * Check if text is a mental health related query
     * @param {string} text - Input text
     * @returns {boolean} - True if mental health related
     */
    isMentalHealthQuery(text) {
        const mentalHealthKeywords = [
            'anxious', 'anxiety', 'depressed', 'depression', 'stress', 'stressed',
            'suicide', 'suicidal', 'therapy', 'therapist', 'counseling', 'counselor',
            'mental health', 'panic attack', 'trauma', 'ptsd', 'bipolar', 'ocd',
            'adhd', 'schizophrenia', 'eating disorder', 'anorexia', 'bulimia',
            'self-harm', 'emotional support', 'coping', 'loneliness', 'lonely'
        ];
        
        return mentalHealthKeywords.some(keyword => text.includes(keyword));
    }
    
    /**
     * Suggest mental health mode when a relevant query is detected
     * @param {string} query - The user query
     */
    suggestMentalHealthMode(query) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const suggestionHTML = `
            <div class="message system-message fade-in">
                <div class="system-content">
                    <i class="fas fa-heart"></i>
                    <span>
                        It seems you're asking about mental health. Would you like to switch to 
                        <button class="link-button" id="switch-mental-health">Mental Health Support Mode</button>
                        for a more supportive conversation?
                    </span>
                </div>
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', suggestionHTML);
        
        // Add click event to switch button
        document.getElementById('switch-mental-health').addEventListener('click', () => {
            this.activateMentalHealthMode();
        });
    }
    
    /**
     * Process a mental health query
     * @param {string} query - The user query
     */
    processMentalHealthQuery(query) {
        // In a real implementation, this would call a specialized mental health AI model
        // For demo purposes, we'll use predefined responses
        
        // Show resources panel if asking about resources
        if (query.includes('resource') || query.includes('help') || query.includes('support')) {
            this.toggleResourcesPanel(true);
        }
        
        // Offer a coping strategy if asking about coping
        if (query.includes('coping') || query.includes('strategy') || query.includes('technique')) {
            // This would happen through the chat response
        }
    }
}

// Initialize and export
const advancedMentalHealthChatbot = new AdvancedMentalHealthChatbot();
export default advancedMentalHealthChatbot;

// If not importing, initialize on load
if (typeof window !== 'undefined' && !window.advancedMentalHealthChatbot) {
    window.advancedMentalHealthChatbot = advancedMentalHealthChatbot;
    document.addEventListener('DOMContentLoaded', () => advancedMentalHealthChatbot.init());
}
/**
 * Chat functionality for JAAT-AI
 * Handles the main chat interface logic
 */

// Store chat state
let currentChatId = null;
let chats = [];
let isProcessing = false;
let aiMode = 'assistant';

document.addEventListener('DOMContentLoaded', function() {
    initChat();
});

/**
 * Initialize chat functionality
 */
function initChat() {
    // Load existing chats
    loadChats();
    
    // Setup UI
    setupChatEventListeners();
    setupAIModeSelector();
    
    // Focus input if available
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.focus();
    }
}

/**
 * Setup chat-related event listeners
 */
function setupChatEventListeners() {
    // Send message form
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMessage();
        });
    }
    
    // Input auto-resize
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.addEventListener('input', function() {
            // Auto-resize textarea
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            
            // Enable/disable send button
            const sendBtn = document.getElementById('sendBtn');
            if (sendBtn) {
                sendBtn.disabled = !this.value.trim();
            }
        });
        
        // Enter to submit, Shift+Enter for new line
        userInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const sendBtn = document.getElementById('sendBtn');
                if (sendBtn && !sendBtn.disabled) {
                    sendMessage();
                }
            }
        });
    }
    
    // New chat button
    const newChatBtn = document.getElementById('newChatBtn');
    if (newChatBtn) {
        newChatBtn.addEventListener('click', createNewChat);
    }
    
    // Suggestion chips
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const prompt = this.getAttribute('data-prompt');
            if (prompt) {
                // Set prompt in input
                const userInput = document.getElementById('userInput');
                if (userInput) {
                    userInput.value = prompt;
                    
                    // Enable send button
                    const sendBtn = document.getElementById('sendBtn');
                    if (sendBtn) {
                        sendBtn.disabled = false;
                    }
                    
                    // Show chat interface
                    showChatInterface();
                    
                    // Send message after a short delay
                    setTimeout(sendMessage, 300);
                }
            }
        });
    });
    
    // Chat actions
    const renameBtn = document.getElementById('renameBtn');
    if (renameBtn) {
        renameBtn.addEventListener('click', openRenameModal);
    }
    
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareConversation);
    }
    
    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteConversation);
    }
    
    // Rename modal
    const confirmRenameBtn = document.getElementById('confirmRename');
    if (confirmRenameBtn) {
        confirmRenameBtn.addEventListener('click', renameConversation);
    }
    
    const newChatNameInput = document.getElementById('newChatName');
    if (newChatNameInput) {
        newChatNameInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                renameConversation();
            }
        });
    }
}

/**
 * Setup AI mode selection
 */
function setupAIModeSelector() {
    const modeOptions = document.querySelectorAll('.ai-mode-option');
    
    modeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            
            // Remove active class from all options
            modeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            // Set current AI mode
            aiMode = mode;
            
            // Display mode change message if in a chat
            if (currentChatId && document.getElementById('chatArea').style.display !== 'none') {
                const modeMessage = document.createElement('div');
                modeMessage.className = 'mode-change-message';
                modeMessage.textContent = `Switched to ${mode} mode`;
                
                const messagesContainer = document.getElementById('messagesContainer');
                if (messagesContainer) {
                    messagesContainer.appendChild(modeMessage);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    
                    // Remove message after a few seconds
                    setTimeout(() => {
                        modeMessage.style.opacity = '0';
                        setTimeout(() => {
                            if (modeMessage.parentNode) {
                                modeMessage.parentNode.removeChild(modeMessage);
                            }
                        }, 500);
                    }, 3000);
                }
            }
        });
    });
}

/**
 * Create a new chat
 */
function createNewChat() {
    // Skip if already processing
    if (isProcessing) return;
    
    // Generate ID for new chat
    const chatId = 'chat_' + Date.now();
    
    // Create chat object
    const newChat = {
        id: chatId,
        title: 'New Conversation',
        created: new Date(),
        messages: [],
        lastUpdated: new Date()
    };
    
    // Add to chats array
    chats.unshift(newChat);
    currentChatId = chatId;
    
    // Update UI
    renderChatHistory();
    showChatInterface(true);
    updateChatTitle('New Conversation');
    
    // Focus on input
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.focus();
    }
    
    // Save to storage
    saveChats();
}

/**
 * Load a chat
 * @param {string} chatId - Chat ID to load
 */
function loadChat(chatId) {
    // Skip if already processing or same chat
    if (isProcessing || currentChatId === chatId) return;
    
    // Find chat by ID
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;
    
    // Set current chat
    currentChatId = chatId;
    
    // Update UI
    renderChatHistory();
    showChatInterface();
    updateChatTitle(chat.title);
    
    // Render messages
    renderMessages(chat.messages);
    
    // Update last accessed timestamp
    chat.lastAccessed = new Date();
    saveChats();
}

/**
 * Show chat interface (hide welcome screen)
 * @param {boolean} resetMessages - Whether to clear messages container
 */
function showChatInterface(resetMessages = false) {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const chatArea = document.getElementById('chatArea');
    
    if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
    }
    
    if (chatArea) {
        chatArea.style.display = 'flex';
    }
    
    if (resetMessages) {
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
        }
    }
}

/**
 * Render chat history in sidebar
 */
function renderChatHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    
    // Clear list
    historyList.innerHTML = '';
    
    // Add chat items
    chats.forEach(chat => {
        const li = document.createElement('li');
        li.textContent = chat.title;
        li.dataset.chatId = chat.id;
        
        if (chat.id === currentChatId) {
            li.classList.add('active');
        }
        
        li.addEventListener('click', function() {
            loadChat(chat.id);
        });
        
        historyList.appendChild(li);
    });
}

/**
 * Render messages in chat
 * @param {Array} messages - Array of message objects
 */
function renderMessages(messages) {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;
    
    // Clear container
    messagesContainer.innerHTML = '';
    
    // Add messages
    messages.forEach(message => {
        const messageElement = createMessageElement(message);
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom
    scrollToBottom();
}

/**
 * Create message element
 * @param {Object} message - Message object
 * @returns {HTMLElement} Message element
 */
function createMessageElement(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.classList.add(message.role === 'user' ? 'user-message' : 'ai-message');
    messageEl.dataset.messageId = message.id;
    
    // Create avatar
    const avatarEl = document.createElement('div');
    avatarEl.className = 'message-avatar';
    
    if (message.role === 'user') {
        avatarEl.textContent = 'U';
    } else {
        const avatarOrb = document.createElement('div');
        avatarOrb.className = 'avatar-orb';
        avatarEl.appendChild(avatarOrb);
    }
    
    // Create content
    const contentEl = document.createElement('div');
    contentEl.className = 'message-content';
    contentEl.innerHTML = message.content;
    
    // Add timestamp
    const timeEl = document.createElement('div');
    timeEl.className = 'message-time';
    timeEl.textContent = formatMessageTime(message.timestamp);
    contentEl.appendChild(timeEl);
    
    // Add feedback buttons for AI messages
    if (message.role === 'assistant') {
        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'message-feedback';
        
        const thumbsUpBtn = document.createElement('button');
        thumbsUpBtn.className = 'feedback-btn thumbs-up';
        thumbsUpBtn.textContent = '👍';
        thumbsUpBtn.addEventListener('click', () => provideFeedback(message.id, 'positive'));
        
        const thumbsDownBtn = document.createElement('button');
        thumbsDownBtn.className = 'feedback-btn thumbs-down';
        thumbsDownBtn.textContent = '👎';
        thumbsDownBtn.addEventListener('click', () => provideFeedback(message.id, 'negative'));
        
        feedbackEl.appendChild(thumbsUpBtn);
        feedbackEl.appendChild(thumbsDownBtn);
        contentEl.appendChild(feedbackEl);
    }
    
    // Assemble message
    messageEl.appendChild(avatarEl);
    messageEl.appendChild(contentEl);
    
    return messageEl;
}

/**
 * Format message timestamp
 * @param {string|Date} timestamp - Message timestamp
 * @returns {string} Formatted timestamp
 */
function formatMessageTime(timestamp) {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const now = new Date();
    
    // If today, show only time
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If within the last week, show day name and time
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    if (date > weekAgo) {
        return date.toLocaleDateString([], { weekday: 'short' }) + ' ' +
               date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Otherwise show date and time
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' +
           date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Send a message
 */
function sendMessage() {
    // Get user input
    const userInput = document.getElementById('userInput');
    if (!userInput) return;
    
    const message = userInput.value.trim();
    
    // Skip if empty or already processing
    if (!message || isProcessing) return;
    
    // Set processing flag
    isProcessing = true;
    
    // Create new chat if none exists
    if (!currentChatId) {
        createNewChat();
    }
    
    // Find current chat
    const currentChat = chats.find(chat => chat.id === currentChatId);
    if (!currentChat) {
        isProcessing = false;
        return;
    }
    
    // Add user message
    const userMessage = {
        id: 'msg_' + Date.now(),
        role: 'user',
        content: message,
        timestamp: new Date()
    };
    
    // Add to UI
    const messagesContainer = document.getElementById('messagesContainer');
    if (messagesContainer) {
        const messageElement = createMessageElement(userMessage);
        messagesContainer.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Add to chat
    currentChat.messages.push(userMessage);
    currentChat.lastUpdated = new Date();
    
    // Update chat title if first message
    if (currentChat.messages.length === 1) {
        // Generate chat title from first few words
        const words = message.split(' ');
        const title = words.slice(0, Math.min(5, words.length)).join(' ') + 
                      (words.length > 5 ? '...' : '');
        
        currentChat.title = title;
        updateChatTitle(title);
        renderChatHistory();
    }
    
    // Save to storage
    saveChats();
    
    // Clear input
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Disable send button
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
        sendBtn.disabled = true;
    }
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process with API or simulation
    if (window.JAAT_API && window.JAAT_API.sendMessageToAPI) {
        processWithAPI(message, currentChat);
    } else {
        // Fallback to simulation
        processWithSimulation(message, currentChat);
    }
}

/**
 * Process message with API
 * @param {string} message - User message
 * @param {Object} currentChat - Current chat object
 */
async function processWithAPI(message, currentChat) {
    try {
        // Get settings
        const settings = getSettings();
        
        // Always use server-side API key
        
        // Send to API
        const response = await window.JAAT_API.sendMessageToAPI(currentChat.id, message, aiMode);
        
        // Hide typing indicator
        hideTypingIndicator();
        
        // Process response
        const aiMessage = {
            id: 'msg_' + Date.now(),
            role: 'assistant',
            content: response.content,
            timestamp: new Date(),
            metadata: {
                model: response.model,
                usage: response.usage
            }
        };
        
        // Add to UI
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            const messageElement = createMessageElement(aiMessage);
            messagesContainer.appendChild(messageElement);
            scrollToBottom();
        }
        
        // Add to chat
        currentChat.messages.push(aiMessage);
        currentChat.lastUpdated = new Date();
        
        // Save to storage
        saveChats();
    } catch (error) {
        console.error('API error:', error);
        
        // Hide typing indicator
        hideTypingIndicator();
        
        // Show error message
        const errorMessage = {
            id: 'msg_' + Date.now(),
            role: 'assistant',
            content: `<p class="error-message">Error: ${error.message || 'Failed to get response from AI.'}</p>
                     <p>Please check your API key in Settings or try again later.</p>`,
            timestamp: new Date(),
            isError: true
        };
        
        // Add to UI
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            const messageElement = createMessageElement(errorMessage);
            messagesContainer.appendChild(messageElement);
            scrollToBottom();
        }
        
        // Add to chat
        currentChat.messages.push(errorMessage);
        currentChat.lastUpdated = new Date();
        
        // Save to storage
        saveChats();
    } finally {
        // Reset processing flag
        isProcessing = false;
    }
}

/**
 * Process message with simulation
 * @param {string} message - User message
 * @param {Object} currentChat - Current chat object
 * @param {boolean} apiKeyMissing - Whether API key is missing
 */
function processWithSimulation(message, currentChat, apiKeyMissing = false) {
    // Get thinking times
    const thinkingTimes = {
        fast: [500, 1500],
        moderate: [1000, 2500],
        detailed: [2000, 4000]
    };
    
    // Get settings
    const settings = getSettings();
    const [minTime, maxTime] = thinkingTimes[settings.responseSpeed] || thinkingTimes.moderate;
    const thinkingTime = Math.random() * (maxTime - minTime) + minTime;
    
    // Simulate thinking
    setTimeout(() => {
        // Hide typing indicator
        hideTypingIndicator();
        
        let aiResponse;
        
        // Generate response
        if (apiKeyMissing) {
            aiResponse = `<p class="note">⚠️ Server API configuration issue. Using simulated responses.</p>
                          <p>It appears you're trying to ask about "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"</p>
                          <p>The OpenAI API may be temporarily unavailable or not properly configured on the server.</p>
                          <p>You can still use the chat interface with simulated responses in the meantime.</p>`;
        } else {
            // Generate pattern-matched response
            aiResponse = generateSimulatedResponse(message, aiMode);
        }
        
        // Create message
        const aiMessage = {
            id: 'msg_' + Date.now(),
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date(),
            simulated: true
        };
        
        // Add to UI
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            const messageElement = createMessageElement(aiMessage);
            messagesContainer.appendChild(messageElement);
            scrollToBottom();
        }
        
        // Add to chat
        currentChat.messages.push(aiMessage);
        currentChat.lastUpdated = new Date();
        
        // Save to storage
        saveChats();
        
        // Reset processing flag
        isProcessing = false;
    }, thinkingTime);
}

/**
 * Generate simulated response based on pattern matching
 * @param {string} message - User message
 * @param {string} mode - AI mode
 * @returns {string} Generated response
 */
function generateSimulatedResponse(message, mode) {
    // Clean up message for comparison
    const lowerMessage = message.toLowerCase().trim();
    
    // Look for specific patterns
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage === 'hi') {
        return '<p>Hello! I\'m JAAT-AI, your holographic assistant. How can I help you today?</p>';
    }
    
    if (lowerMessage.includes('how are you')) {
        return '<p>I\'m functioning well, thank you for asking! As a holographic AI assistant, I\'m always ready to help. How can I assist you today?</p>';
    }
    
    if (lowerMessage.includes('your name') || lowerMessage.includes('who are you')) {
        return '<p>I am JAAT-AI, an advanced holographic AI assistant created by Rohit Sangwan. I\'m designed to help with a wide range of tasks including answering questions, providing information, and assisting with various topics. How can I help you today?</p>';
    }
    
    if (lowerMessage.includes('thank')) {
        return '<p>You\'re welcome! If you have any more questions or need further assistance, don\'t hesitate to ask. I\'m here to help!</p>';
    }
    
    // Topic-specific responses
    if (lowerMessage.includes('quantum') || lowerMessage.includes('physics')) {
        return `<p>Quantum physics is a fascinating field that explores the behavior of matter and energy at the smallest scales. Key concepts include:</p>
                <ul>
                    <li><strong>Quantum Superposition</strong>: Particles existing in multiple states simultaneously</li>
                    <li><strong>Quantum Entanglement</strong>: Particles becoming correlated so that the quantum state of each particle cannot be described independently</li>
                    <li><strong>Wave-Particle Duality</strong>: Matter exhibiting properties of both waves and particles</li>
                </ul>
                <p>Quantum mechanics has led to many technologies including lasers, transistors, and is the foundation for quantum computing.</p>`;
    }
    
    if (lowerMessage.includes('code') || lowerMessage.includes('javascript') || lowerMessage.includes('program')) {
        return `<p>Here's a simple JavaScript function example that creates a counter:</p>
                <pre><code class="language-javascript">function createCounter(initialValue = 0) {
  let count = initialValue;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
    reset: () => { count = initialValue; return count; }
  };
}

// Usage
const counter = createCounter(10);
console.log(counter.getValue()); // 10
counter.increment();
counter.increment();
console.log(counter.getValue()); // 12
counter.reset();
console.log(counter.getValue()); // 10</code></pre>
                <p>This function demonstrates closure in JavaScript, where the inner functions maintain access to the variables from their outer scope even after the outer function has finished executing.</p>`;
    }
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
        return `<p>Artificial Intelligence (AI) refers to systems or machines that mimic human intelligence to perform tasks and can iteratively improve themselves based on the information they collect.</p>
                <p>Key AI subfields include:</p>
                <ul>
                    <li><strong>Machine Learning</strong>: Systems that learn from data rather than explicit programming</li>
                    <li><strong>Natural Language Processing</strong>: Enabling computers to understand and generate human language</li>
                    <li><strong>Computer Vision</strong>: Systems that can interpret and understand visual information</li>
                    <li><strong>Reinforcement Learning</strong>: Training agents to make sequences of decisions</li>
                </ul>
                <p>Modern AI applications include virtual assistants, autonomous vehicles, recommendation systems, and much more. The field continues to rapidly evolve with advances in deep learning and neural network architectures.</p>`;
    }
    
    // Mode-specific default responses
    switch (mode) {
        case 'creative':
            return `<p>Looking at your request about "${message.substring(0, 30)}${message.length > 30 ? '...' : ''}", I'd like to offer a creative perspective:</p>
                    <p>Imagination is the doorway to innovation. When we approach problems with creative thinking, we discover solutions that logical analysis alone might miss. Every question contains the seed of a story waiting to be told.</p>
                    <p>If you'd like me to explore this topic with more specific creative angles like storytelling, metaphors, or artistic concepts, please let me know!</p>`;
        
        case 'coder':
            return `<p>Regarding your question about "${message.substring(0, 30)}${message.length > 30 ? '...' : ''}", let's approach this from a programming perspective.</p>
                    <p>When solving problems through code, we often need to break down complex tasks into smaller, manageable pieces. This is similar to how we might approach algorithm design with techniques like divide-and-conquer or dynamic programming.</p>
                    <p>If you'd like specific code examples or implementation details, feel free to ask for a particular programming language, and I'll provide more concrete guidance.</p>`;
        
        case 'analyst':
            return `<p>Analyzing your question about "${message.substring(0, 30)}${message.length > 30 ? '...' : ''}":</p>
                    <p>When examining this topic objectively, we should consider multiple perspectives and data points. A thorough analysis would involve identifying key variables, examining relationships between factors, and drawing evidence-based conclusions.</p>
                    <p>To provide a more detailed analysis, I'd need to know what specific aspects you're interested in exploring or what particular data points you'd like me to focus on.</p>`;
        
        case 'researcher':
            return `<p>Your query about "${message.substring(0, 30)}${message.length > 30 ? '...' : ''}" touches on an interesting subject that warrants further investigation.</p>
                    <p>Current research in this area suggests multiple approaches and findings. To properly address your question, we should examine peer-reviewed literature, identify key studies, and synthesize findings to form a comprehensive understanding.</p>
                    <p>If you're interested in a specific aspect of this topic or particular research methodologies, please let me know so I can provide more targeted information.</p>`;
        
        default: // assistant mode
            return `<p>Thank you for your message about "${message.substring(0, 30)}${message.length > 30 ? '...' : ''}".</p>
                    <p>I'd be happy to help with this topic. To provide the most relevant information, could you please share any specific aspects you're interested in or particular questions you have?</p>
                    <p>I'm here to assist with information, explanations, or guidance on a wide range of subjects. Just let me know what you're looking for!</p>`;
    }
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.id = 'typingIndicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingIndicator.appendChild(dot);
    }
    
    messagesContainer.appendChild(typingIndicator);
    scrollToBottom();
}

/**
 * Hide typing indicator
 */
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

/**
 * Scroll messages container to bottom
 */
function scrollToBottom() {
    const messagesContainer = document.getElementById('messagesContainer');
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

/**
 * Update chat title
 * @param {string} title - New title
 */
function updateChatTitle(title) {
    const chatTitle = document.getElementById('chatTitle');
    if (chatTitle) {
        chatTitle.textContent = title;
    }
}

/**
 * Provide feedback on a message
 * @param {string} messageId - ID of message
 * @param {string} feedbackType - Type of feedback (positive/negative)
 */
function provideFeedback(messageId, feedbackType) {
    // Find message element
    const messageEl = document.querySelector(`.message[data-message-id="${messageId}"]`);
    if (!messageEl) return;
    
    // Get feedback buttons
    const feedbackBtns = messageEl.querySelectorAll('.feedback-btn');
    
    // Disable buttons
    feedbackBtns.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = 0.5;
    });
    
    // Highlight selected button
    const selectedBtn = messageEl.querySelector(`.${feedbackType === 'positive' ? 'thumbs-up' : 'thumbs-down'}`);
    if (selectedBtn) {
        selectedBtn.style.opacity = 1;
        selectedBtn.style.transform = 'scale(1.2)';
    }
    
    // Show thank you message
    const feedbackContainer = messageEl.querySelector('.message-feedback');
    if (feedbackContainer) {
        const thankYouEl = document.createElement('span');
        thankYouEl.textContent = 'Thanks for your feedback';
        thankYouEl.style.fontSize = '0.75rem';
        thankYouEl.style.marginLeft = '10px';
        thankYouEl.style.opacity = '0';
        thankYouEl.style.transition = 'opacity 0.5s ease';
        
        feedbackContainer.appendChild(thankYouEl);
        
        // Fade in
        setTimeout(() => {
            thankYouEl.style.opacity = '1';
        }, 10);
        
        // Fade out after delay
        setTimeout(() => {
            thankYouEl.style.opacity = '0';
            setTimeout(() => {
                if (thankYouEl.parentNode) {
                    thankYouEl.parentNode.removeChild(thankYouEl);
                }
            }, 500);
        }, 3000);
    }
    
    // Save feedback in chat (in a real app, would send to server)
    if (currentChatId) {
        const currentChat = chats.find(chat => chat.id === currentChatId);
        if (currentChat) {
            const message = currentChat.messages.find(msg => msg.id === messageId);
            if (message) {
                message.feedback = feedbackType;
                saveChats();
            }
        }
    }
}

/**
 * Open rename modal
 */
function openRenameModal() {
    if (!currentChatId) return;
    
    const modal = document.getElementById('renameModal');
    const newChatNameInput = document.getElementById('newChatName');
    
    if (!modal || !newChatNameInput) return;
    
    // Get current title
    const chatTitle = document.getElementById('chatTitle');
    if (chatTitle) {
        newChatNameInput.value = chatTitle.textContent;
    }
    
    // Show modal
    modal.classList.add('active');
    
    // Focus input
    setTimeout(() => {
        newChatNameInput.focus();
        newChatNameInput.select();
    }, 100);
}

/**
 * Rename conversation
 */
function renameConversation() {
    if (!currentChatId) return;
    
    const newChatNameInput = document.getElementById('newChatName');
    const modal = document.getElementById('renameModal');
    
    if (!newChatNameInput || !modal) return;
    
    const newTitle = newChatNameInput.value.trim();
    if (!newTitle) return;
    
    // Update chat object
    const currentChat = chats.find(chat => chat.id === currentChatId);
    if (currentChat) {
        currentChat.title = newTitle;
        
        // Update UI
        updateChatTitle(newTitle);
        renderChatHistory();
        
        // Save to storage
        saveChats();
    }
    
    // Hide modal
    modal.classList.remove('active');
}

/**
 * Share conversation
 */
function shareConversation() {
    if (!currentChatId) return;
    
    const currentChat = chats.find(chat => chat.id === currentChatId);
    if (!currentChat) return;
    
    // Build share text
    let shareText = `JAAT-AI Chat: ${currentChat.title}\n\n`;
    
    currentChat.messages.forEach(message => {
        const role = message.role === 'user' ? 'You' : 'JAAT-AI';
        
        // Strip HTML for sharing
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = message.content;
        const contentText = tempDiv.textContent || tempDiv.innerText || message.content;
        
        shareText += `${role}: ${contentText}\n\n`;
    });
    
    // In a real app, might implement share via API
    // For now, copy to clipboard
    
    try {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Conversation copied to clipboard!');
        });
    } catch (err) {
        console.error('Failed to copy:', err);
        
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = shareText;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            alert('Conversation copied to clipboard!');
        } catch (err) {
            console.error('Fallback copy failed:', err);
            alert('Failed to copy conversation. Please try again.');
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

/**
 * Delete conversation
 */
function deleteConversation() {
    if (!currentChatId) return;
    
    if (confirm('Are you sure you want to delete this conversation?')) {
        // Remove from array
        chats = chats.filter(chat => chat.id !== currentChatId);
        
        // Update UI
        if (chats.length > 0) {
            // Load first chat
            currentChatId = chats[0].id;
            loadChat(currentChatId);
        } else {
            // No chats left, show welcome screen
            currentChatId = null;
            const welcomeScreen = document.getElementById('welcomeScreen');
            const chatArea = document.getElementById('chatArea');
            
            if (welcomeScreen) {
                welcomeScreen.style.display = 'flex';
            }
            
            if (chatArea) {
                chatArea.style.display = 'none';
            }
        }
        
        // Save to storage
        saveChats();
    }
}

/**
 * Save chats to storage
 */
function saveChats() {
    try {
        localStorage.setItem('jaat-ai-chats', JSON.stringify(chats));
        localStorage.setItem('jaat-ai-current-chat', currentChatId);
    } catch (err) {
        console.error('Error saving chats:', err);
    }
}

/**
 * Load chats from storage
 */
function loadChats() {
    try {
        // Load chats
        const savedChats = localStorage.getItem('jaat-ai-chats');
        if (savedChats) {
            chats = JSON.parse(savedChats);
            
            // Fix dates
            chats.forEach(chat => {
                chat.created = new Date(chat.created);
                chat.lastUpdated = new Date(chat.lastUpdated || chat.created);
                
                if (chat.messages) {
                    chat.messages.forEach(message => {
                        message.timestamp = new Date(message.timestamp);
                    });
                }
            });
        }
        
        // Load current chat ID
        const savedCurrentChatId = localStorage.getItem('jaat-ai-current-chat');
        if (savedCurrentChatId && chats.some(chat => chat.id === savedCurrentChatId)) {
            currentChatId = savedCurrentChatId;
            
            // Load current chat
            const currentChat = chats.find(chat => chat.id === currentChatId);
            if (currentChat) {
                showChatInterface();
                updateChatTitle(currentChat.title);
                renderMessages(currentChat.messages || []);
            }
        }
        
        // Render chat history
        renderChatHistory();
    } catch (err) {
        console.error('Error loading chats:', err);
        
        // Initialize with empty array
        chats = [];
    }
}

/**
 * Get settings from storage
 * @returns {Object} Settings object
 */
function getSettings() {
    try {
        const savedSettings = localStorage.getItem('jaat-ai-settings');
        if (savedSettings) {
            return JSON.parse(savedSettings);
        }
    } catch (err) {
        console.error('Error loading settings:', err);
    }
    
    // Default settings
    return {
        theme: 'dark',
        animations: true,
        autoSave: true,
        responseSpeed: 'moderate',
        model: 'gpt-4o'
    };
}
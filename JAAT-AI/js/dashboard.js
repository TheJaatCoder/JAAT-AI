/**
 * JAAT-AI Dashboard
 * Main JavaScript for the JAAT-AI dashboard interface
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the dashboard
  initDashboard();
  
  // Setup event listeners
  setupEventListeners();
  
  // Load initial data
  loadUserProfile();
  loadStats();
});

/**
 * Initialize the dashboard
 */
function initDashboard() {
  console.log('JAAT-AI Dashboard Initialized');
  
  // Initialize mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });
  }
  
  // Initialize text area auto resize
  const messageInput = document.getElementById('message-input');
  if (messageInput) {
    messageInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Chat form submission
  const chatForm = document.getElementById('chat-form');
  if (chatForm) {
    chatForm.addEventListener('submit', handleChatSubmit);
  }
  
  // Mode selection buttons
  const modeBtns = document.querySelectorAll('.mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const mode = this.getAttribute('data-mode');
      selectMode(mode);
    });
  });
  
  // Example prompt buttons
  const promptBtns = document.querySelectorAll('.prompt-btn');
  promptBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const prompt = this.textContent || '';
      fillPrompt(prompt);
    });
  });
  
  // Change mode button
  const changeModeBtn = document.querySelector('.action-btn[title="Change Mode"]');
  if (changeModeBtn) {
    changeModeBtn.addEventListener('click', showModeSelection);
  }
  
  // Clear chat button
  const clearChatBtn = document.querySelector('.action-btn[title="Clear Chat"]');
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', clearChat);
  }
  
  // Export conversation button
  const exportBtn = document.querySelector('.action-btn[title="Export Conversation"]');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportConversation);
  }
  
  // Modal close button
  const closeModalBtn = document.querySelector('.close-modal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  // Select mode buttons in modal
  const selectModeBtns = document.querySelectorAll('.select-mode-btn');
  selectModeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modeCard = this.closest('.mode-card');
      const modeName = modeCard.querySelector('h3').textContent;
      const modeIcon = modeCard.querySelector('.mode-icon i').className.split(' ')[1];
      
      setActiveMode(modeName, modeIcon);
      closeModal();
    });
  });
  
  // New chat button
  const newChatBtn = document.querySelector('.new-chat-btn');
  if (newChatBtn) {
    newChatBtn.addEventListener('click', startNewChat);
  }
  
  // Conversation items
  const conversationItems = document.querySelectorAll('.conversation-item');
  conversationItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all items
      conversationItems.forEach(i => i.classList.remove('active'));
      // Add active class to clicked item
      this.classList.add('active');
      // Load the selected conversation (would be implemented in production)
    });
  });
}

/**
 * Handle chat form submission
 * @param {Event} e - Form submit event
 */
function handleChatSubmit(e) {
  e.preventDefault();
  
  const messageInput = document.getElementById('message-input');
  const messagesContainer = document.querySelector('.messages-container');
  const userMessage = messageInput.value.trim();
  
  if (!userMessage) return;
  
  // Add user message to the chat
  addUserMessage(userMessage);
  
  // Clear input
  messageInput.value = '';
  messageInput.style.height = 'auto';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Get active mode
  const modeName = document.querySelector('.mode-name').textContent;
  
  // Send message to AI and get response
  sendMessageToAI(userMessage, modeName)
    .then(response => {
      // Remove typing indicator
      removeTypingIndicator();
      
      // Add AI response to the chat
      addAIMessage(response.message, modeName);
      
      // Scroll to bottom
      scrollToBottom();
    })
    .catch(error => {
      console.error('Error sending message:', error);
      removeTypingIndicator();
      addErrorMessage('Sorry, there was an error processing your message. Please try again.');
    });
  
  // Scroll to bottom
  scrollToBottom();
}

/**
 * Send message to the AI service
 * @param {string} message - User message
 * @param {string} modeName - The active AI mode
 * @returns {Promise<Object>} - AI response
 */
async function sendMessageToAI(message, modeName) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        modeId: getModeIdFromName(modeName)
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending message to AI:', error);
    throw error;
  }
}

/**
 * Get mode ID from mode name
 * @param {string} modeName - The mode name
 * @returns {string} - The mode ID
 */
function getModeIdFromName(modeName) {
  const modeMap = {
    'ChatGPT Style': 'chatgpt',
    'Code Assistant': 'code',
    'Content Writer': 'content',
    'Character AI': 'character',
    'Knowledge': 'knowledge',
    'JAAT-AI Assistant': 'chatgpt',
    'General Assistant': 'chatgpt'
  };
  
  return modeMap[modeName] || 'chatgpt';
}

/**
 * Add user message to the chat
 * @param {string} message - User message
 */
function addUserMessage(message) {
  const messagesContainer = document.querySelector('.messages-container');
  const welcomeMessage = document.querySelector('.welcome-message');
  
  // Remove welcome message if it exists
  if (welcomeMessage) {
    welcomeMessage.remove();
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = 'message user-message';
  
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  messageElement.innerHTML = `
    <div class="message-content">
      <p>${message}</p>
    </div>
    <div class="message-info">
      <span class="message-time">${time}</span>
    </div>
  `;
  
  // Add message to container
  messagesContainer.appendChild(messageElement);
}

/**
 * Add AI message to the chat
 * @param {string} message - AI message
 * @param {string} mode - AI mode
 */
function addAIMessage(message, mode) {
  const messagesContainer = document.querySelector('.messages-container');
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = 'message ai-message';
  
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Get mode icon
  const modeIcon = getModeIcon(mode);
  
  messageElement.innerHTML = `
    <div class="message-avatar">
      <i class="fas ${modeIcon}"></i>
    </div>
    <div class="message-content">
      <p>${formatMessage(message)}</p>
    </div>
    <div class="message-info">
      <span class="message-time">${time}</span>
      <div class="message-actions">
        <button class="action-btn small" title="Copy to Clipboard">
          <i class="fas fa-copy"></i>
        </button>
        <button class="action-btn small" title="Regenerate Response">
          <i class="fas fa-redo"></i>
        </button>
      </div>
    </div>
  `;
  
  // Add message to container
  messagesContainer.appendChild(messageElement);
  
  // Add event listener for copy button
  const copyBtn = messageElement.querySelector('.action-btn[title="Copy to Clipboard"]');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const content = messageElement.querySelector('.message-content').textContent;
      navigator.clipboard.writeText(content).then(() => {
        showToast('Copied to clipboard');
      });
    });
  }
}

/**
 * Format message text with Markdown-like syntax
 * @param {string} message - The message text
 * @returns {string} - Formatted HTML
 */
function formatMessage(message) {
  // Replace newlines with <br>
  let formatted = message.replace(/\n/g, '<br>');
  
  // This is a simple implementation - in production we would use a proper Markdown parser
  return formatted;
}

/**
 * Get mode icon based on mode name
 * @param {string} mode - The mode name
 * @returns {string} - Icon class
 */
function getModeIcon(mode) {
  const iconMap = {
    'ChatGPT Style': 'fa-robot',
    'Code Assistant': 'fa-code',
    'Content Writer': 'fa-pencil',
    'Character AI': 'fa-theater-masks',
    'Knowledge': 'fa-brain',
    'JAAT-AI Assistant': 'fa-robot',
    'General Assistant': 'fa-robot'
  };
  
  return iconMap[mode] || 'fa-robot';
}

/**
 * Add error message to the chat
 * @param {string} message - Error message
 */
function addErrorMessage(message) {
  const messagesContainer = document.querySelector('.messages-container');
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = 'message system-message error';
  
  messageElement.innerHTML = `
    <div class="message-content">
      <p><i class="fas fa-exclamation-triangle"></i> ${message}</p>
    </div>
  `;
  
  // Add message to container
  messagesContainer.appendChild(messageElement);
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
  const messagesContainer = document.querySelector('.messages-container');
  
  // Create typing indicator
  const indicatorElement = document.createElement('div');
  indicatorElement.className = 'message ai-message typing-indicator';
  
  indicatorElement.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-robot"></i>
    </div>
    <div class="message-content">
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  
  // Add indicator to container
  messagesContainer.appendChild(indicatorElement);
  
  // Scroll to bottom
  scrollToBottom();
}

/**
 * Remove typing indicator
 */
function removeTypingIndicator() {
  const indicator = document.querySelector('.typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

/**
 * Scroll the messages container to the bottom
 */
function scrollToBottom() {
  const messagesContainer = document.querySelector('.messages-container');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Select an AI mode
 * @param {string} mode - The mode ID
 */
function selectMode(mode) {
  // Map mode ID to name and icon
  const modeMap = {
    'general': { name: 'General Assistant', icon: 'fa-robot' },
    'creative': { name: 'Content Writer', icon: 'fa-pencil' },
    'code': { name: 'Code Assistant', icon: 'fa-code' },
    'data': { name: 'Data Analyst', icon: 'fa-chart-bar' }
  };
  
  const modeInfo = modeMap[mode];
  
  if (modeInfo) {
    setActiveMode(modeInfo.name, modeInfo.icon);
  }
  
  // Remove welcome message
  const welcomeMessage = document.querySelector('.welcome-message');
  if (welcomeMessage) {
    welcomeMessage.remove();
    
    // Add first AI message
    const introMessages = {
      'general': 'Hello! I\'m your general assistant. How can I help you today?',
      'creative': 'Welcome to creative mode! I\'m here to help with writing, storytelling, and content creation. What would you like to work on?',
      'code': 'Welcome to code assistant mode! I can help with programming questions, debugging, and code explanations. What are you working on?',
      'data': 'Welcome to data analyst mode! I can help analyze data, generate insights, and visualize information. What data would you like to work with?'
    };
    
    addAIMessage(introMessages[mode] || 'Hello! How can I assist you today?', modeInfo.name);
  }
}

/**
 * Set the active mode in the UI
 * @param {string} name - Mode name
 * @param {string} icon - Mode icon class
 */
function setActiveMode(name, icon) {
  const modeNameElement = document.querySelector('.mode-name');
  const modeIconElement = document.querySelector('.mode-icon');
  
  if (modeNameElement) {
    modeNameElement.textContent = name;
  }
  
  if (modeIconElement) {
    modeIconElement.className = 'fas ' + icon + ' mode-icon';
  }
}

/**
 * Fill the message input with a prompt
 * @param {string} prompt - The prompt text
 */
function fillPrompt(prompt) {
  const messageInput = document.getElementById('message-input');
  
  if (messageInput) {
    messageInput.value = prompt;
    messageInput.focus();
    
    // Trigger input event to resize textarea
    const event = new Event('input', { bubbles: true });
    messageInput.dispatchEvent(event);
  }
}

/**
 * Show the mode selection modal
 */
function showModeSelection() {
  const modal = document.querySelector('.ai-mode-modal');
  
  if (modal) {
    modal.style.display = 'block';
  }
}

/**
 * Close the modal
 */
function closeModal() {
  const modal = document.querySelector('.ai-mode-modal');
  
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * Clear the chat
 */
function clearChat() {
  const messagesContainer = document.querySelector('.messages-container');
  
  // Remove all messages
  while (messagesContainer.firstChild) {
    messagesContainer.removeChild(messagesContainer.firstChild);
  }
  
  // Add welcome message
  messagesContainer.innerHTML = `
    <div class="message-date-divider">
      <span>Today</span>
    </div>
    
    <div class="welcome-message">
      <h1>Welcome to JAAT-AI</h1>
      <p>Your advanced AI assistant with holographic interface</p>
      
      <div class="ai-modes-quick-select">
        <h3>Select an AI Mode</h3>
        <div class="quick-select-buttons">
          <button class="mode-btn" data-mode="general">
            <i class="fas fa-robot"></i> General
          </button>
          <button class="mode-btn" data-mode="creative">
            <i class="fas fa-pencil"></i> Creative
          </button>
          <button class="mode-btn" data-mode="code">
            <i class="fas fa-code"></i> Code
          </button>
          <button class="mode-btn" data-mode="data">
            <i class="fas fa-chart-bar"></i> Data
          </button>
        </div>
      </div>
      
      <div class="example-prompts">
        <h3>Try asking:</h3>
        <div class="example-prompt-buttons">
          <button class="prompt-btn">"Generate a creative sci-fi story about AI"</button>
          <button class="prompt-btn">"Help me solve this programming problem..."</button>
          <button class="prompt-btn">"Analyze this data and provide insights"</button>
          <button class="prompt-btn">"Create a marketing strategy for my business"</button>
        </div>
      </div>
    </div>
  `;
  
  // Re-attach event listeners
  setupEventListeners();
}

/**
 * Export the conversation
 */
function exportConversation() {
  const messagesContainer = document.querySelector('.messages-container');
  let conversation = '';
  
  // Get all messages
  const messages = messagesContainer.querySelectorAll('.message:not(.typing-indicator)');
  
  // Build conversation text
  messages.forEach(message => {
    const content = message.querySelector('.message-content').textContent.trim();
    const time = message.querySelector('.message-time')?.textContent || '';
    
    if (message.classList.contains('user-message')) {
      conversation += `User (${time}):\n${content}\n\n`;
    } else if (message.classList.contains('ai-message')) {
      const modeName = document.querySelector('.mode-name').textContent;
      conversation += `${modeName} (${time}):\n${content}\n\n`;
    }
  });
  
  // Create download link
  const blob = new Blob([conversation], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `JAAT-AI-Conversation-${new Date().toISOString().split('T')[0]}.txt`;
  a.click();
  
  // Clean up
  URL.revokeObjectURL(url);
}

/**
 * Start a new chat
 */
function startNewChat() {
  // Clear the chat
  clearChat();
  
  // Reset active mode
  setActiveMode('JAAT-AI Assistant', 'fa-robot');
  
  // Add new conversation item (would be implemented in production)
  
  // Show welcome message
  // Already done in clearChat()
}

/**
 * Load user profile data
 */
async function loadUserProfile() {
  try {
    const response = await fetch('/api/profile');
    
    if (!response.ok) {
      throw new Error('Failed to load user profile');
    }
    
    const profile = await response.json();
    
    // Update UI with profile data
    const nameElement = document.querySelector('.user-name');
    const tierElement = document.querySelector('.subscription-tier');
    const avatarElement = document.querySelector('.avatar');
    const creditsElement = document.querySelector('.summary-item:first-child span');
    
    if (nameElement) nameElement.textContent = profile.name;
    if (tierElement) tierElement.textContent = profile.plan;
    if (avatarElement) avatarElement.src = profile.avatar;
    if (creditsElement) creditsElement.textContent = `Credits: ${profile.credits}`;
    
  } catch (error) {
    console.error('Error loading user profile:', error);
  }
}

/**
 * Load stats data
 */
async function loadStats() {
  try {
    const response = await fetch('/api/stats');
    
    if (!response.ok) {
      throw new Error('Failed to load stats');
    }
    
    const stats = await response.json();
    
    // Update UI with stats data
    const chatsElement = document.querySelector('.summary-item:last-child span');
    
    if (chatsElement) chatsElement.textContent = `Chats: ${stats.interactions}`;
    
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

/**
 * Show a toast message
 * @param {string} message - The message to show
 */
function showToast(message) {
  // Create toast element if it doesn't exist
  let toast = document.getElementById('toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
    
    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
      #toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--glass-bg);
        color: var(--text-primary);
        padding: 10px 20px;
        border-radius: 4px;
        font-size: 14px;
        backdrop-filter: blur(10px);
        border: 1px solid var(--glass-border);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      #toast.show {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Set message
  toast.textContent = message;
  
  // Show toast
  toast.classList.add('show');
  
  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
/**
 * JAAT-AI Core System
 * Created by Rohit Sangwan
 * 
 * The central module that initializes and manages the JAAT-AI system,
 * handling mode registration, AI interactions, and system events.
 */

(function() {
  'use strict';
  
  // Initialize the global JAAT object
  window.JAAT = window.JAAT || {};
  
  // Core configuration
  const config = {
    version: '1.0.0',
    apiEndpoint: '/api/ai/chat',
    creator: 'Rohit Sangwan',
    marketingDirector: 'Himanshu Sangwan',
    contactEmail: 'infosec.rohit77@gmail.com',
    themes: ['dark', 'light', 'cyber', 'sacred', 'neon'],
    defaultTheme: 'dark'
  };
  
  // Store modes, current state, and history
  const state = {
    modes: {},
    currentMode: null,
    history: [],
    theme: localStorage.getItem('jaat-theme') || config.defaultTheme,
    isInitialized: false,
    openaiApiKey: localStorage.getItem('openai-api-key') || '',
    isProcessing: false
  };
  
  /**
   * Initialize the JAAT-AI system
   */
  function init() {
    console.log('Initializing JAAT-AI Core System...');
    
    // Register event handlers
    setupEventHandlers();
    
    // Apply theme
    applyTheme(state.theme);
    
    // Initialize UI components
    initializeUI();
    
    // Trigger ready event for mode modules to initialize
    state.isInitialized = true;
    window.dispatchEvent(new CustomEvent('JAAT_READY'));
    
    console.log('JAAT-AI Core System initialized');
  }
  
  /**
   * Set up event handlers for the UI
   */
  function setupEventHandlers() {
    // Mode selection
    document.addEventListener('click', function(e) {
      const modeSelector = e.target.closest('[data-mode-select]');
      if (modeSelector) {
        const modeId = modeSelector.dataset.modeSelect;
        selectMode(modeId);
      }
    });
    
    // Theme selection
    document.addEventListener('click', function(e) {
      const themeSelector = e.target.closest('[data-theme-select]');
      if (themeSelector) {
        const themeName = themeSelector.dataset.themeSelect;
        applyTheme(themeName);
      }
    });
    
    // Message submission
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
      chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();
        
        if (message) {
          sendMessage(message);
          messageInput.value = '';
        }
      });
    }
    
    // API key settings
    const apiKeyForm = document.getElementById('api-key-form');
    if (apiKeyForm) {
      apiKeyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const apiKeyInput = document.getElementById('openai-api-key');
        const apiKey = apiKeyInput.value.trim();
        
        if (apiKey) {
          setApiKey(apiKey);
          document.getElementById('settings-modal').classList.remove('active');
          showNotification('API key updated successfully', 'success');
        }
      });
    }
    
    // Clear chat history
    const clearChatBtn = document.getElementById('clear-chat');
    if (clearChatBtn) {
      clearChatBtn.addEventListener('click', function() {
        clearChatHistory();
      });
    }
  }
  
  /**
   * Initialize UI components
   */
  function initializeUI() {
    // Populate mode selector
    populateModeSelector();
    
    // Set up suggested prompts
    updateSuggestedPrompts();
    
    // Initialize holographic effects
    if (typeof window.initHolographicEffects === 'function') {
      window.initHolographicEffects();
    }
    
    // Add custom cursor
    initializeCustomCursor();
    
    // Setup theme selector
    populateThemeSelector();
    
    // Select default mode
    selectMode('smart-assistant');
  }
  
  /**
   * Register an AI mode with the system
   * @param {Object} modeConfig - The mode configuration object
   */
  function registerMode(modeConfig) {
    if (!modeConfig || !modeConfig.id) {
      console.error('Invalid mode configuration', modeConfig);
      return;
    }
    
    state.modes[modeConfig.id] = modeConfig;
    console.log(`Registered mode: ${modeConfig.name}`);
    
    // Update UI if system is already initialized
    if (state.isInitialized) {
      populateModeSelector();
    }
  }
  
  /**
   * Select an AI mode
   * @param {string} modeId - The ID of the mode to select
   */
  function selectMode(modeId) {
    if (!state.modes[modeId]) {
      console.error(`Mode not found: ${modeId}`);
      return;
    }
    
    state.currentMode = modeId;
    
    // Update UI
    document.querySelectorAll('[data-mode-select]').forEach(el => {
      if (el.dataset.modeSelect === modeId) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
    
    // Update mode info display
    const modeInfo = document.getElementById('current-mode-info');
    if (modeInfo) {
      const mode = state.modes[modeId];
      modeInfo.innerHTML = `
        <div class="mode-header" style="border-color: ${mode.color}">
          <i class="${mode.icon}" style="color: ${mode.color}"></i>
          <h3>${mode.name}</h3>
          ${mode.premium ? '<span class="premium-badge">PREMIUM</span>' : ''}
        </div>
        <p>${mode.description}</p>
      `;
    }
    
    // Update help section
    updateHelpSection(modeId);
    
    // Update suggested prompts
    updateSuggestedPrompts(modeId);
    
    console.log(`Selected mode: ${state.modes[modeId].name}`);
  }
  
  /**
   * Update the help section for the current mode
   * @param {string} modeId - The ID of the current mode
   */
  function updateHelpSection(modeId) {
    const helpSection = document.getElementById('mode-help-section');
    if (!helpSection) return;
    
    const modeInstance = window.JAAT.modes[modeTransformId(modeId)];
    if (modeInstance && typeof modeInstance.getHelpInfo === 'function') {
      helpSection.innerHTML = modeInstance.getHelpInfo();
    } else {
      helpSection.innerHTML = '<p>Help information not available for this mode.</p>';
    }
  }
  
  /**
   * Transform mode ID to camelCase for instance lookup
   * @param {string} id - The hyphenated mode ID
   * @returns {string} The camelCase version of the ID
   */
  function modeTransformId(id) {
    return id.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });
  }
  
  /**
   * Update suggested prompts for the current mode
   * @param {string} modeId - The ID of the current mode
   */
  function updateSuggestedPrompts(modeId = state.currentMode) {
    const suggestedPromptsContainer = document.getElementById('suggested-prompts');
    if (!suggestedPromptsContainer) return;
    
    if (!modeId) {
      suggestedPromptsContainer.innerHTML = '';
      return;
    }
    
    const modeInstance = window.JAAT.modes[modeTransformId(modeId)];
    if (modeInstance && typeof modeInstance.getSuggestedPrompts === 'function') {
      const prompts = modeInstance.getSuggestedPrompts();
      
      suggestedPromptsContainer.innerHTML = '';
      prompts.forEach(prompt => {
        const promptEl = document.createElement('div');
        promptEl.className = 'suggested-prompt holographic-btn';
        promptEl.textContent = prompt;
        promptEl.addEventListener('click', () => {
          document.getElementById('message-input').value = prompt;
        });
        suggestedPromptsContainer.appendChild(promptEl);
      });
    }
  }
  
  /**
   * Populate the mode selector with available modes
   */
  function populateModeSelector() {
    const modeSelector = document.getElementById('mode-selector');
    if (!modeSelector) return;
    
    modeSelector.innerHTML = '';
    
    // Group modes by category
    const categories = {};
    Object.values(state.modes).forEach(mode => {
      if (!categories[mode.category]) {
        categories[mode.category] = [];
      }
      categories[mode.category].push(mode);
    });
    
    // Create category sections
    Object.keys(categories).sort().forEach(category => {
      const categoryEl = document.createElement('div');
      categoryEl.className = 'mode-category';
      
      const categoryTitle = document.createElement('h4');
      categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categoryEl.appendChild(categoryTitle);
      
      const modeList = document.createElement('div');
      modeList.className = 'mode-list';
      
      categories[category].sort((a, b) => a.name.localeCompare(b.name)).forEach(mode => {
        const modeEl = document.createElement('div');
        modeEl.className = 'mode-item holographic-item';
        modeEl.dataset.modeSelect = mode.id;
        if (state.currentMode === mode.id) {
          modeEl.classList.add('active');
        }
        
        modeEl.innerHTML = `
          <i class="${mode.icon}" style="color: ${mode.color}"></i>
          <span>${mode.name}</span>
          ${mode.premium ? '<span class="premium-marker">★</span>' : ''}
        `;
        
        modeList.appendChild(modeEl);
      });
      
      categoryEl.appendChild(modeList);
      modeSelector.appendChild(categoryEl);
    });
  }
  
  /**
   * Initialize the custom cursor
   */
  function initializeCustomCursor() {
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    customCursor.innerHTML = `
      <div class="cursor-inner"></div>
      <div class="cursor-outer"></div>
      <div class="cursor-glow"></div>
      <div class="sacred-geometry"></div>
    `;
    
    document.body.appendChild(customCursor);
    
    document.addEventListener('mousemove', e => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    });
    
    document.addEventListener('mousedown', () => {
      customCursor.classList.add('clicking');
    });
    
    document.addEventListener('mouseup', () => {
      customCursor.classList.remove('clicking');
    });
    
    document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach(el => {
      el.addEventListener('mouseover', () => {
        customCursor.classList.add('hovering');
      });
      
      el.addEventListener('mouseout', () => {
        customCursor.classList.remove('hovering');
      });
    });
  }
  
  /**
   * Populate theme selector
   */
  function populateThemeSelector() {
    const themeSelector = document.getElementById('theme-selector');
    if (!themeSelector) return;
    
    themeSelector.innerHTML = '';
    
    config.themes.forEach(theme => {
      const themeButton = document.createElement('button');
      themeButton.className = 'theme-option';
      themeButton.dataset.themeSelect = theme;
      
      if (state.theme === theme) {
        themeButton.classList.add('active');
      }
      
      themeButton.innerHTML = `
        <span class="theme-preview ${theme}-theme"></span>
        <span class="theme-name">${theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
      `;
      
      themeSelector.appendChild(themeButton);
    });
  }
  
  /**
   * Apply a theme to the application
   * @param {string} themeName - The name of the theme to apply
   */
  function applyTheme(themeName) {
    if (!config.themes.includes(themeName)) {
      console.error(`Theme not found: ${themeName}`);
      return;
    }
    
    document.body.className = `${themeName}-theme`;
    state.theme = themeName;
    localStorage.setItem('jaat-theme', themeName);
    
    // Update theme selector
    document.querySelectorAll('[data-theme-select]').forEach(el => {
      if (el.dataset.themeSelect === themeName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
    
    console.log(`Applied theme: ${themeName}`);
  }
  
  /**
   * Set the OpenAI API key
   * @param {string} apiKey - The API key to set
   */
  function setApiKey(apiKey) {
    state.openaiApiKey = apiKey;
    localStorage.setItem('openai-api-key', apiKey);
  }
  
  /**
   * Send a message to the AI in the current mode
   * @param {string} message - The message to send
   */
  async function sendMessage(message) {
    if (state.isProcessing) {
      showNotification('Please wait for the current message to process', 'warning');
      return;
    }
    
    if (!state.currentMode) {
      showNotification('Please select an AI mode first', 'error');
      return;
    }
    
    if (!message.trim()) {
      return;
    }
    
    try {
      state.isProcessing = true;
      
      // Add user message to UI
      addMessageToChat('user', message);
      
      // Get the current mode instance
      const modeInstance = window.JAAT.modes[modeTransformId(state.currentMode)];
      
      // Show typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'message ai typing';
      typingIndicator.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
      document.querySelector('.chat-messages').appendChild(typingIndicator);
      
      // Scroll to bottom
      scrollToBottom();
      
      let response = '';
      
      if (modeInstance && typeof modeInstance.processMessage === 'function') {
        // Process message through the mode
        response = await modeInstance.processMessage(message, state.history);
      } else {
        // Fallback if mode doesn't have processMessage
        response = await sendToAI(message, state.modes[state.currentMode].systemPrompt, state.history);
      }
      
      // Remove typing indicator
      typingIndicator.remove();
      
      // Add AI response to UI
      addMessageToChat('ai', response);
      
      // Update history
      state.history.push({ role: 'user', content: message });
      state.history.push({ role: 'assistant', content: response });
      
      // Limit history length
      if (state.history.length > 20) {
        state.history = state.history.slice(state.history.length - 20);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showNotification('Failed to get a response. Please try again.', 'error');
      
      // Remove typing indicator if it exists
      document.querySelector('.typing.indicator')?.remove();
    } finally {
      state.isProcessing = false;
    }
  }
  
  /**
   * Send a message to the OpenAI API
   * @param {string} message - The message to send
   * @param {string} systemPrompt - The system prompt to use
   * @param {Array} history - The conversation history
   * @returns {Promise<string>} The AI response
   */
  async function sendToAI(message, systemPrompt, history = []) {
    if (!state.openaiApiKey && !isServerHandled()) {
      showSettingsModal();
      throw new Error('OpenAI API key not set');
    }
    
    try {
      // Convert history to the format expected by the API
      const formattedHistory = history.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add system prompt
      const messages = [
        { role: 'system', content: systemPrompt },
        ...formattedHistory,
        { role: 'user', content: message }
      ];
      
      let response;
      
      if (isServerHandled()) {
        // Let the server handle the API call
        response = await fetch(config.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages,
            mode: state.currentMode
          })
        });
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.response;
      } else {
        // Make direct API call to OpenAI (not recommended for production)
        const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
        
        response = await fetch(OPENAI_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.openaiApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o', // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
            messages,
            temperature: 0.7,
            max_tokens: 800
          })
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error?.message || 'OpenAI API error');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
      }
    } catch (error) {
      console.error('Error calling AI API:', error);
      throw error;
    }
  }
  
  /**
   * Check if AI requests are handled by the server
   * @returns {boolean} True if handled by server
   */
  function isServerHandled() {
    // Check if we're in a server environment or have environment config
    return window.location.hostname !== 'localhost' || !!window.SERVER_HANDLES_API;
  }
  
  /**
   * Add a message to the chat UI
   * @param {string} sender - The sender ('user' or 'ai')
   * @param {string} content - The message content
   */
  function addMessageToChat(sender, content) {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    
    // Format message content (handle markdown, code blocks, etc.)
    let formattedContent = content;
    
    // Simple markdown-like formatting
    formattedContent = formattedContent
      // Code blocks
      .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Bold
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // Line breaks
      .replace(/\n/g, '<br>');
    
    // Set avatar and content
    if (sender === 'user') {
      messageElement.innerHTML = `
        <div class="avatar user-avatar">
          <i class="ri-user-line"></i>
        </div>
        <div class="content">${formattedContent}</div>
      `;
    } else {
      const currentMode = state.modes[state.currentMode];
      messageElement.innerHTML = `
        <div class="avatar ai-avatar" style="background-color: ${currentMode.color}">
          <i class="${currentMode.icon}"></i>
        </div>
        <div class="content">${formattedContent}</div>
      `;
    }
    
    chatMessages.appendChild(messageElement);
    
    // Apply holographic effect
    if (typeof window.applyHolographicEffect === 'function') {
      window.applyHolographicEffect(messageElement);
    }
    
    // Scroll to the bottom
    scrollToBottom();
  }
  
  /**
   * Scroll the chat to the bottom
   */
  function scrollToBottom() {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
  
  /**
   * Clear the chat history
   */
  function clearChatHistory() {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      chatMessages.innerHTML = '';
    }
    
    state.history = [];
    showNotification('Chat history cleared', 'success');
  }
  
  /**
   * Show the settings modal
   */
  function showSettingsModal() {
    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal) {
      settingsModal.classList.add('active');
      
      // Fill API key input if exists
      const apiKeyInput = document.getElementById('openai-api-key');
      if (apiKeyInput && state.openaiApiKey) {
        apiKeyInput.value = state.openaiApiKey;
      }
    }
  }
  
  /**
   * Show a notification message
   * @param {string} message - The notification message
   * @param {string} type - The notification type (success, warning, error)
   */
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Apply holographic effect
    if (typeof window.applyHolographicEffect === 'function') {
      window.applyHolographicEffect(notification);
    }
    
    // Animate in
    setTimeout(() => {
      notification.classList.add('visible');
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('visible');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }
  
  // Export functions to the global JAAT object
  Object.assign(window.JAAT, {
    init,
    registerMode,
    selectMode,
    sendMessage,
    sendToAI,
    clearChatHistory,
    showSettingsModal,
    applyTheme,
    showNotification
  });
  
  // Initialize when the DOM is ready
  document.addEventListener('DOMContentLoaded', init);
})();
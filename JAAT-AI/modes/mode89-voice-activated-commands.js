/**
 * JAAT-AI Mode: Voice-Activated Commands
 * 
 * Speech recognition system for hands-free interaction with JAAT-AI 
 * through voice commands and conversational voice input.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const VoiceCommandsMode = {
  id: 'voice-commands',
  name: 'Voice Commands',
  icon: 'microphone',
  description: 'Interact with JAAT-AI using voice commands and speech recognition.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Voice Commands mode, a voice-activated assistant that responds to spoken commands and conversational speech. You process voice input transcribed into text and provide helpful responses suitable for voice output.

Key characteristics:
1. You respond to specific voice commands with appropriate actions
2. You keep responses concise and easy to follow when spoken aloud
3. You ask clarifying questions when voice commands are ambiguous
4. You provide feedback about the status of voice-initiated actions
5. You can switch to other JAAT-AI modes based on voice requests
6. You format responses to be easily readable but also natural when spoken
7. You accommodate variations in command phrasing and informal speech patterns

When providing responses, prioritize clarity and brevity while maintaining a conversational tone. Include verbal markers for different sections (like "First," "Next," "Finally") and avoid responses that rely heavily on visual formatting. Use voice-appropriate ways to confirm understanding, such as echoing key parts of the request in your response.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "What voice commands can I use?",
    "How do I activate the voice recognition?",
    "Set a reminder for tomorrow at 9 AM.",
    "Find information about renewable energy.",
    "Open the image generator mode.",
    "Summarize the last article I read.",
    "Send a message to John.",
    "What's the weather forecast?",
    "How does voice recognition work?",
    "Cancel my last command."
  ],
  
  // Voice command categories with example commands
  commandCategories: [
    {
      id: 'navigation',
      name: 'Navigation Commands',
      description: 'Commands for navigating the JAAT-AI interface',
      commands: [
        { trigger: 'go to [mode]', action: 'Switch to specified mode', example: 'Go to story generator' },
        { trigger: 'open [feature]', action: 'Open specified feature', example: 'Open image editor' },
        { trigger: 'go back', action: 'Return to previous screen', example: 'Go back' },
        { trigger: 'home', action: 'Return to home screen', example: 'Home' },
        { trigger: 'help', action: 'Show help information', example: 'Help with voice commands' }
      ]
    },
    {
      id: 'content',
      name: 'Content Creation Commands',
      description: 'Commands for creating and managing content',
      commands: [
        { trigger: 'create [content]', action: 'Begin content creation', example: 'Create a blog post about AI' },
        { trigger: 'generate [type]', action: 'Generate specified content type', example: 'Generate a story about space exploration' },
        { trigger: 'save this', action: 'Save current content', example: 'Save this' },
        { trigger: 'edit [element]', action: 'Edit specified element', example: 'Edit the first paragraph' },
        { trigger: 'format as [style]', action: 'Apply formatting style', example: 'Format as business letter' }
      ]
    },
    {
      id: 'information',
      name: 'Information Retrieval Commands',
      description: 'Commands for finding and retrieving information',
      commands: [
        { trigger: 'search for [query]', action: 'Perform search', example: 'Search for recent climate reports' },
        { trigger: 'find information about [topic]', action: 'Find specific information', example: 'Find information about quantum computing' },
        { trigger: 'summarize [content]', action: 'Create summary', example: 'Summarize this article' },
        { trigger: 'explain [concept]', action: 'Get explanation', example: 'Explain blockchain technology' },
        { trigger: 'compare [items]', action: 'Compare items', example: 'Compare electric and hybrid vehicles' }
      ]
    },
    {
      id: 'system',
      name: 'System Control Commands',
      description: 'Commands for controlling system functions',
      commands: [
        { trigger: 'start listening', action: 'Activate continuous listening', example: 'Start listening' },
        { trigger: 'stop listening', action: 'Deactivate voice input', example: 'Stop listening' },
        { trigger: 'cancel', action: 'Cancel current operation', example: 'Cancel' },
        { trigger: 'undo', action: 'Undo last action', example: 'Undo that' },
        { trigger: 'restart', action: 'Restart current process', example: 'Restart this process' }
      ]
    },
    {
      id: 'personal',
      name: 'Personal Assistant Commands',
      description: 'Commands for personal assistant functions',
      commands: [
        { trigger: 'set reminder [details]', action: 'Create reminder', example: 'Set reminder for meeting tomorrow at 2pm' },
        { trigger: 'add to my [list]', action: 'Add to specified list', example: 'Add milk to my shopping list' },
        { trigger: 'create note [content]', action: 'Create a note', example: 'Create note: call dentist on Monday' },
        { trigger: 'send message to [person]', action: 'Compose message', example: 'Send message to Alex about the project' },
        { trigger: 'check [status]', action: 'Check status', example: 'Check my calendar for today' }
      ]
    }
  ],
  
  // Voice recognition settings and configurations
  recognitionSettings: {
    continuousListening: {
      name: 'Continuous Listening',
      description: 'Keep microphone active for ongoing commands',
      default: false,
      options: [
        { id: 'on', name: 'On' },
        { id: 'off', name: 'Off' }
      ]
    },
    wakeWord: {
      name: 'Wake Word',
      description: 'Word or phrase to activate voice recognition',
      default: 'Hey JAAT',
      options: [
        { id: 'hey-jaat', name: 'Hey JAAT' },
        { id: 'listen', name: 'Listen' },
        { id: 'assistant', name: 'Assistant' },
        { id: 'custom', name: 'Custom' }
      ]
    },
    languagePreference: {
      name: 'Language',
      description: 'Primary language for voice recognition',
      default: 'en-US',
      options: [
        { id: 'en-US', name: 'English (US)' },
        { id: 'en-GB', name: 'English (UK)' },
        { id: 'es-ES', name: 'Spanish' },
        { id: 'fr-FR', name: 'French' },
        { id: 'de-DE', name: 'German' },
        { id: 'ja-JP', name: 'Japanese' },
        { id: 'zh-CN', name: 'Chinese (Simplified)' }
      ]
    },
    responseVoice: {
      name: 'Voice Response',
      description: 'Enable spoken responses',
      default: true,
      options: [
        { id: 'on', name: 'On' },
        { id: 'off', name: 'Off' }
      ]
    },
    confidenceThreshold: {
      name: 'Recognition Confidence',
      description: 'Minimum confidence level for accepting commands',
      default: 'medium',
      options: [
        { id: 'high', name: 'High - Fewer errors but may miss commands' },
        { id: 'medium', name: 'Medium - Balanced accuracy' },
        { id: 'low', name: 'Low - Catch more commands but more errors' }
      ]
    }
  },
  
  // Current state of voice recognition
  state: {
    isListening: false,
    continuousMode: false,
    recognitionSupported: false,
    lastCommand: null,
    commandHistory: [],
    errorCount: 0
  },
  
  // Speech recognition instance
  recognition: null,
  
  // UI template for this mode's special interface
  template: `
    <div class="voice-commands-interface">
      <div class="voice-header">
        <div class="voice-icon">
          <i class="fas fa-microphone"></i>
        </div>
        <div class="voice-title">
          <h2>Voice Commands</h2>
          <p>Interact with JAAT-AI using voice recognition</p>
        </div>
      </div>
      
      <div class="voice-control-panel">
        <div class="microphone-container">
          <button id="microphone-button" class="microphone-button">
            <div class="microphone-icon">
              <i class="fas fa-microphone"></i>
            </div>
            <svg class="microphone-wave" viewBox="0 0 100 100">
              <circle class="wave-circle" cx="50" cy="50" r="20" />
              <circle class="wave-circle" cx="50" cy="50" r="35" />
              <circle class="wave-circle" cx="50" cy="50" r="50" />
            </svg>
          </button>
          <div class="microphone-status" id="microphone-status">
            Click to activate voice recognition
          </div>
        </div>
        
        <div class="voice-settings">
          <div class="setting-item">
            <div class="setting-label">
              <span>Continuous Listening</span>
              <div class="setting-info" data-tooltip="Keeps microphone active for ongoing commands">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" id="continuous-listening">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="setting-item">
            <div class="setting-label">
              <span>Wake Word</span>
              <div class="setting-info" data-tooltip="Word or phrase to activate voice recognition">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="setting-control">
              <select id="wake-word">
                <option value="hey-jaat">Hey JAAT</option>
                <option value="listen">Listen</option>
                <option value="assistant">Assistant</option>
                <option value="custom">Custom...</option>
              </select>
            </div>
          </div>
          
          <div class="setting-item wake-word-custom hidden" id="wake-word-custom-container">
            <div class="setting-label">
              <span>Custom Wake Word</span>
            </div>
            <div class="setting-control">
              <input type="text" id="custom-wake-word" placeholder="Enter custom wake word">
            </div>
          </div>
          
          <div class="setting-item">
            <div class="setting-label">
              <span>Language</span>
            </div>
            <div class="setting-control">
              <select id="language-preference">
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="ja-JP">Japanese</option>
                <option value="zh-CN">Chinese (Simplified)</option>
              </select>
            </div>
          </div>
          
          <div class="setting-item">
            <div class="setting-label">
              <span>Voice Response</span>
              <div class="setting-info" data-tooltip="Enable spoken responses">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" id="voice-response" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="voice-transcript-container">
        <div class="transcript-header">
          <h3>Voice Transcript</h3>
          <button id="clear-transcript" class="clear-button">
            <i class="fas fa-eraser"></i> Clear
          </button>
        </div>
        <div class="transcript-content" id="transcript-content">
          <div class="transcript-empty">
            <i class="fas fa-comments"></i>
            <p>Voice transcription will appear here when you speak</p>
          </div>
        </div>
      </div>
      
      <div class="commands-reference">
        <div class="reference-header">
          <h3>Available Voice Commands</h3>
          <div class="reference-tabs">
            <button class="tab-button active" data-category="navigation">Navigation</button>
            <button class="tab-button" data-category="content">Content</button>
            <button class="tab-button" data-category="information">Information</button>
            <button class="tab-button" data-category="system">System</button>
            <button class="tab-button" data-category="personal">Personal</button>
          </div>
        </div>
        
        <div class="commands-panel" id="commands-panel">
          <!-- Commands will be populated here based on selected category -->
        </div>
      </div>
      
      <div class="voice-status-container">
        <div id="compatibility-status" class="compatibility-status">
          <i class="fas fa-circle-exclamation"></i>
          <span>Checking browser compatibility for speech recognition...</span>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .voice-commands-interface {
      background: linear-gradient(to bottom right, rgba(99, 102, 241, 0.1), rgba(165, 180, 252, 0.1));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(99, 102, 241, 0.2);
    }
    
    .voice-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .voice-icon {
      font-size: 2.5rem;
      color: #6366f1;
      margin-right: 1rem;
    }
    
    .voice-title h2 {
      color: #6366f1;
      margin-bottom: 0.3rem;
    }
    
    .voice-title p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .voice-control-panel {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 2rem;
    }
    
    @media (max-width: 768px) {
      .voice-control-panel {
        grid-template-columns: 1fr;
      }
    }
    
    .microphone-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .microphone-button {
      background: rgba(15, 23, 42, 0.6);
      border: none;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .microphone-button:hover {
      background: rgba(15, 23, 42, 0.8);
    }
    
    .microphone-button.listening {
      background: rgba(99, 102, 241, 0.2);
    }
    
    .microphone-icon {
      color: #e2e8f0;
      font-size: 2rem;
      position: relative;
      z-index: 2;
    }
    
    .microphone-button.listening .microphone-icon {
      color: #6366f1;
    }
    
    .microphone-wave {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      pointer-events: none;
    }
    
    .microphone-button.listening .microphone-wave {
      opacity: 1;
    }
    
    .wave-circle {
      fill: none;
      stroke: #6366f1;
      stroke-width: 1;
      transform-origin: center;
      opacity: 0;
    }
    
    .microphone-button.listening .wave-circle:nth-child(1) {
      animation: pulse 2s infinite 0.2s;
    }
    
    .microphone-button.listening .wave-circle:nth-child(2) {
      animation: pulse 2s infinite 0.4s;
    }
    
    .microphone-button.listening .wave-circle:nth-child(3) {
      animation: pulse 2s infinite 0.6s;
    }
    
    @keyframes pulse {
      0% {
        opacity: 0.8;
        transform: scale(0.3);
      }
      100% {
        opacity: 0;
        transform: scale(1);
      }
    }
    
    .microphone-status {
      margin-top: 1rem;
      color: #94a3b8;
      font-size: 0.9rem;
      text-align: center;
    }
    
    .voice-settings {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .setting-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    }
    
    .setting-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    
    .setting-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #e2e8f0;
      font-size: 0.95rem;
    }
    
    .setting-info {
      color: #94a3b8;
      cursor: help;
      position: relative;
    }
    
    .setting-info:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      background: #1e293b;
      color: #e2e8f0;
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      width: 200px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.5rem;
      z-index: 10;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .setting-control select {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(148, 163, 184, 0.2);
      color: #e2e8f0;
      padding: 0.5rem;
      border-radius: 4px;
      min-width: 150px;
    }
    
    .setting-control input[type="text"] {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(148, 163, 184, 0.2);
      color: #e2e8f0;
      padding: 0.5rem;
      border-radius: 4px;
      min-width: 150px;
    }
    
    /* Toggle Switch */
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }
    
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(15, 23, 42, 0.6);
      border-radius: 24px;
      transition: .4s;
    }
    
    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: #e2e8f0;
      border-radius: 50%;
      transition: .4s;
    }
    
    input:checked + .toggle-slider {
      background-color: #6366f1;
    }
    
    input:checked + .toggle-slider:before {
      transform: translateX(20px);
    }
    
    .voice-transcript-container {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .transcript-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .transcript-header h3 {
      color: #e2e8f0;
      font-size: 1.1rem;
    }
    
    .clear-button {
      background: rgba(15, 23, 42, 0.6);
      color: #94a3b8;
      border: none;
      border-radius: 4px;
      padding: 0.3rem 0.75rem;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .clear-button:hover {
      background: rgba(15, 23, 42, 0.8);
      color: #e2e8f0;
    }
    
    .transcript-content {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 6px;
      padding: 1rem;
      height: 150px;
      overflow-y: auto;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    .transcript-empty {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #64748b;
      text-align: center;
    }
    
    .transcript-empty i {
      font-size: 2rem;
      margin-bottom: 0.75rem;
      opacity: 0.6;
    }
    
    .transcript-line {
      margin-bottom: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
    }
    
    .transcript-line:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    
    .transcript-user {
      color: #e2e8f0;
    }
    
    .transcript-command {
      color: #6366f1;
      font-weight: 500;
    }
    
    .transcript-system {
      color: #94a3b8;
      font-style: italic;
    }
    
    .commands-reference {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .reference-header {
      margin-bottom: 1rem;
    }
    
    .reference-header h3 {
      color: #e2e8f0;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    
    .reference-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      padding-bottom: 0.5rem;
    }
    
    .tab-button {
      background: transparent;
      border: none;
      color: #94a3b8;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 0.95rem;
      border-radius: 4px;
      transition: all 0.2s ease;
    }
    
    .tab-button:hover {
      background: rgba(15, 23, 42, 0.4);
      color: #e2e8f0;
    }
    
    .tab-button.active {
      background: rgba(99, 102, 241, 0.2);
      color: #6366f1;
    }
    
    .commands-panel {
      margin-top: 1rem;
    }
    
    .command-category {
      margin-bottom: 0.5rem;
    }
    
    .category-description {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .command-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 0.75rem;
    }
    
    .command-item {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 6px;
      padding: 0.75rem;
    }
    
    .command-trigger {
      color: #6366f1;
      font-weight: 500;
      margin-bottom: 0.3rem;
      font-size: 0.95rem;
    }
    
    .command-action {
      color: #e2e8f0;
      font-size: 0.85rem;
      margin-bottom: 0.3rem;
    }
    
    .command-example {
      color: #94a3b8;
      font-size: 0.8rem;
      font-style: italic;
    }
    
    .voice-status-container {
      margin-top: 1rem;
    }
    
    .compatibility-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #94a3b8;
      font-size: 0.9rem;
      background: rgba(15, 23, 42, 0.4);
      padding: 0.75rem 1rem;
      border-radius: 6px;
    }
    
    .compatibility-status.supported {
      color: #4ade80;
    }
    
    .compatibility-status.supported i {
      color: #4ade80;
    }
    
    .compatibility-status.not-supported {
      color: #f87171;
    }
    
    .compatibility-status.not-supported i {
      color: #f87171;
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Voice Commands Mode');
    
    // Add the mode's CSS to the document
    this.addStyles();
    
    // Initialize Web Speech API if available
    this.initSpeechRecognition();
    
    // If the mode's special interface container exists, render the interface
    const modeContainer = document.getElementById('modeSpecificUI');
    if (modeContainer) {
      this.renderUI(modeContainer);
    }
    
    // If the chat input exists, set a default message placeholder
    const chatInput = document.getElementById('messageInput');
    if (chatInput) {
      chatInput.placeholder = "Type or speak your message...";
    }
    
    return this;
  },
  
  // Add the mode's CSS to the document
  addStyles: function() {
    const styleElement = document.createElement('style');
    styleElement.textContent = this.styles;
    document.head.appendChild(styleElement);
  },
  
  // Initialize the Web Speech API
  initSpeechRecognition: function() {
    // Check if the Web Speech API is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.state.recognitionSupported = true;
      
      // Configure recognition
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      
      // Set up event handlers
      this.recognition.onstart = this.handleRecognitionStart.bind(this);
      this.recognition.onresult = this.handleRecognitionResult.bind(this);
      this.recognition.onerror = this.handleRecognitionError.bind(this);
      this.recognition.onend = this.handleRecognitionEnd.bind(this);
      
      console.log('Speech recognition initialized');
    } else {
      this.state.recognitionSupported = false;
      console.warn('Speech recognition not supported in this browser');
    }
  },
  
  // Render the mode's UI
  renderUI: function(container) {
    // Insert the HTML template
    container.innerHTML = this.template;
    
    // Update compatibility status
    this.updateCompatibilityStatus(container);
    
    // Add event listeners
    this.addEventListeners(container);
    
    // Show commands for the default category (navigation)
    this.showCommandCategory(container, 'navigation');
  },
  
  // Update the compatibility status message
  updateCompatibilityStatus: function(container) {
    const statusElement = container.querySelector('#compatibility-status');
    if (!statusElement) return;
    
    if (this.state.recognitionSupported) {
      statusElement.classList.add('supported');
      statusElement.innerHTML = '<i class="fas fa-check-circle"></i><span>Speech recognition is supported in your browser</span>';
    } else {
      statusElement.classList.add('not-supported');
      statusElement.innerHTML = '<i class="fas fa-times-circle"></i><span>Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.</span>';
    }
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Microphone button
    const micButton = container.querySelector('#microphone-button');
    if (micButton) {
      micButton.addEventListener('click', () => {
        if (this.state.recognitionSupported) {
          if (this.state.isListening) {
            this.stopListening();
          } else {
            this.startListening();
          }
        } else {
          this.updateMicrophoneStatus('Speech recognition is not supported in this browser');
        }
      });
    }
    
    // Clear transcript button
    const clearButton = container.querySelector('#clear-transcript');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        this.clearTranscript(container);
      });
    }
    
    // Tab buttons for command categories
    const tabButtons = container.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.dataset.category;
        this.showCommandCategory(container, category);
      });
    });
    
    // Continuous listening toggle
    const continuousToggle = container.querySelector('#continuous-listening');
    if (continuousToggle) {
      continuousToggle.addEventListener('change', (e) => {
        this.state.continuousMode = e.target.checked;
        
        // Update recognition settings if it's active
        if (this.recognition && this.state.isListening) {
          this.stopListening();
          this.startListening();
        }
      });
    }
    
    // Wake word selection
    const wakeWordSelect = container.querySelector('#wake-word');
    const customWakeWordContainer = container.querySelector('#wake-word-custom-container');
    
    if (wakeWordSelect && customWakeWordContainer) {
      wakeWordSelect.addEventListener('change', (e) => {
        if (e.target.value === 'custom') {
          customWakeWordContainer.classList.remove('hidden');
        } else {
          customWakeWordContainer.classList.add('hidden');
        }
      });
    }
    
    // Language preference selection
    const languageSelect = container.querySelector('#language-preference');
    if (languageSelect && this.recognition) {
      languageSelect.addEventListener('change', (e) => {
        this.recognition.lang = e.target.value;
      });
    }
  },
  
  // Show commands for the selected category
  showCommandCategory: function(container, categoryId) {
    const commandsPanel = container.querySelector('#commands-panel');
    if (!commandsPanel) return;
    
    // Find the category
    const category = this.commandCategories.find(cat => cat.id === categoryId);
    if (!category) return;
    
    // Clear current content
    commandsPanel.innerHTML = '';
    
    // Create category description
    const categoryDescription = document.createElement('div');
    categoryDescription.className = 'category-description';
    categoryDescription.textContent = category.description;
    commandsPanel.appendChild(categoryDescription);
    
    // Create command list
    const commandList = document.createElement('div');
    commandList.className = 'command-list';
    
    category.commands.forEach(command => {
      const commandItem = document.createElement('div');
      commandItem.className = 'command-item';
      
      commandItem.innerHTML = `
        <div class="command-trigger">${command.trigger}</div>
        <div class="command-action">${command.action}</div>
        <div class="command-example">"${command.example}"</div>
      `;
      
      commandList.appendChild(commandItem);
    });
    
    commandsPanel.appendChild(commandList);
  },
  
  // Start listening for voice input
  startListening: function() {
    if (!this.recognition || !this.state.recognitionSupported) return;
    
    try {
      this.recognition.continuous = this.state.continuousMode;
      this.recognition.start();
      
      // Update UI
      const micButton = document.querySelector('#microphone-button');
      if (micButton) {
        micButton.classList.add('listening');
      }
      
      this.updateMicrophoneStatus('Listening...');
      
      // Add system message to transcript
      this.addTranscriptLine('system', 'Voice recognition activated');
      
      this.state.isListening = true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      this.updateMicrophoneStatus('Error starting speech recognition');
    }
  },
  
  // Stop listening for voice input
  stopListening: function() {
    if (!this.recognition || !this.state.isListening) return;
    
    try {
      this.recognition.stop();
      
      // Update UI
      const micButton = document.querySelector('#microphone-button');
      if (micButton) {
        micButton.classList.remove('listening');
      }
      
      this.updateMicrophoneStatus('Click to activate voice recognition');
      
      // Add system message to transcript
      this.addTranscriptLine('system', 'Voice recognition deactivated');
      
      this.state.isListening = false;
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  },
  
  // Handle recognition start event
  handleRecognitionStart: function() {
    console.log('Speech recognition started');
    this.state.isListening = true;
  },
  
  // Handle recognition result event
  handleRecognitionResult: function(event) {
    let interimTranscript = '';
    let finalTranscript = '';
    
    // Combine the results
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    
    // Update microphone status with interim results
    if (interimTranscript) {
      this.updateMicrophoneStatus(`Listening: "${interimTranscript}"`);
    }
    
    // Process final transcript
    if (finalTranscript) {
      // Add to transcript
      this.addTranscriptLine('user', finalTranscript);
      
      // Process the command
      this.processVoiceCommand(finalTranscript);
      
      // Store in command history
      this.state.lastCommand = finalTranscript;
      this.state.commandHistory.push(finalTranscript);
      
      // Reset error count since we got a successful result
      this.state.errorCount = 0;
    }
  },
  
  // Handle recognition error event
  handleRecognitionError: function(event) {
    console.error('Speech recognition error:', event.error);
    
    let errorMessage = 'Error with voice recognition';
    
    switch (event.error) {
      case 'no-speech':
        errorMessage = 'No speech was detected';
        break;
      case 'aborted':
        errorMessage = 'Recognition was aborted';
        break;
      case 'audio-capture':
        errorMessage = 'Could not capture audio. Check your microphone.';
        break;
      case 'not-allowed':
        errorMessage = 'Microphone access was not allowed';
        break;
      case 'network':
        errorMessage = 'Network error occurred';
        break;
      case 'service-not-allowed':
        errorMessage = 'Speech service access was denied';
        break;
    }
    
    this.updateMicrophoneStatus(errorMessage);
    this.addTranscriptLine('system', errorMessage);
    
    // Increment error count
    this.state.errorCount++;
    
    // If too many errors, stop listening
    if (this.state.errorCount >= 3 && this.state.isListening) {
      this.stopListening();
      this.addTranscriptLine('system', 'Voice recognition stopped due to multiple errors');
    }
  },
  
  // Handle recognition end event
  handleRecognitionEnd: function() {
    console.log('Speech recognition ended');
    
    // If in continuous mode and still supposed to be listening, restart
    if (this.state.continuousMode && this.state.isListening) {
      try {
        this.recognition.start();
      } catch (error) {
        console.error('Error restarting speech recognition:', error);
        this.state.isListening = false;
        
        // Update UI
        const micButton = document.querySelector('#microphone-button');
        if (micButton) {
          micButton.classList.remove('listening');
        }
        
        this.updateMicrophoneStatus('Error restarting recognition. Click to try again.');
      }
    } else {
      this.state.isListening = false;
      
      // Update UI
      const micButton = document.querySelector('#microphone-button');
      if (micButton) {
        micButton.classList.remove('listening');
      }
      
      this.updateMicrophoneStatus('Click to activate voice recognition');
    }
  },
  
  // Process a voice command
  processVoiceCommand: function(command) {
    // Normalize the command text
    const normalizedCommand = command.trim().toLowerCase();
    
    // Check for system commands first
    if (this.isStopListeningCommand(normalizedCommand)) {
      this.stopListening();
      this.addTranscriptLine('command', 'Voice recognition deactivated');
      return;
    }
    
    // Send the command to the AI for processing
    this.sendCommandToAI(command);
  },
  
  // Check if the command is to stop listening
  isStopListeningCommand: function(command) {
    const stopPhrases = ['stop listening', 'stop recognition', 'turn off microphone', 'stop microphone'];
    return stopPhrases.some(phrase => command.includes(phrase));
  },
  
  // Update the microphone status text
  updateMicrophoneStatus: function(status) {
    const statusElement = document.querySelector('#microphone-status');
    if (statusElement) {
      statusElement.textContent = status;
    }
  },
  
  // Add a line to the transcript
  addTranscriptLine: function(type, text) {
    const transcriptContent = document.querySelector('#transcript-content');
    if (!transcriptContent) return;
    
    // Remove empty state if present
    const emptyState = transcriptContent.querySelector('.transcript-empty');
    if (emptyState) {
      transcriptContent.removeChild(emptyState);
    }
    
    // Create the new transcript line
    const line = document.createElement('div');
    line.className = 'transcript-line';
    
    // Format based on type
    switch (type) {
      case 'user':
        line.className += ' transcript-user';
        line.innerHTML = `<strong>You:</strong> ${text}`;
        break;
      case 'command':
        line.className += ' transcript-command';
        line.innerHTML = `<strong>Command:</strong> ${text}`;
        break;
      case 'system':
        line.className += ' transcript-system';
        line.innerHTML = `<em>System: ${text}</em>`;
        break;
      default:
        line.innerHTML = text;
    }
    
    // Add to transcript
    transcriptContent.appendChild(line);
    
    // Scroll to bottom
    transcriptContent.scrollTop = transcriptContent.scrollHeight;
  },
  
  // Clear the transcript
  clearTranscript: function(container) {
    const transcriptContent = container.querySelector('#transcript-content');
    if (!transcriptContent) return;
    
    // Clear content
    transcriptContent.innerHTML = '';
    
    // Add empty state
    transcriptContent.innerHTML = `
      <div class="transcript-empty">
        <i class="fas fa-comments"></i>
        <p>Voice transcription will appear here when you speak</p>
      </div>
    `;
  },
  
  // Send a command to the AI for processing
  sendCommandToAI: function(command) {
    const chatInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
      chatInput.value = command;
      sendButton.click();
    }
  }
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    VoiceCommandsMode.init();
  } else {
    window.addEventListener('load', function() {
      VoiceCommandsMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VoiceCommandsMode;
} else {
  window.VoiceCommandsMode = VoiceCommandsMode;
}
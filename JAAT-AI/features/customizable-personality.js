/**
 * Customizable AI Personality
 * Adjust AI personality traits to suit your interaction preferences
 * Feature ID: customizable-personality
 */

// Define the feature
const CustomizablePersonality = {
  id: 'customizable-personality',
  name: 'Customizable AI Personality',
  description: 'Adjust AI personality traits to suit your interaction preferences.',
  version: '1.0.0',
  author: 'JAAT-AI Team',
  
  // Default personality traits on a scale of 0-10
  defaultTraits: {
    warmth: 7,
    precision: 7,
    creativity: 7,
    humor: 5,
    formality: 6,
    detail: 7,
    empathy: 8,
    assertiveness: 5
  },
  
  // Current traits (will be initialized from localStorage or defaults)
  currentTraits: {},
  
  // HTML template for the personality configuration UI
  template: `
    <div class="personality-config">
      <h3>Customize AI Personality</h3>
      <p>Adjust these traits to customize how JAAT-AI responds to your queries.</p>
      
      <div class="trait-sliders">
        <div class="trait-group">
          <label for="trait-warmth">
            <span class="trait-name">Warmth</span>
            <span class="trait-value" id="warmth-value">7</span>
          </label>
          <input type="range" id="trait-warmth" class="trait-slider" 
                 min="0" max="10" step="1" value="7" 
                 data-trait="warmth">
          <div class="trait-labels">
            <span>Analytical</span>
            <span>Warm</span>
          </div>
        </div>
        
        <div class="trait-group">
          <label for="trait-precision">
            <span class="trait-name">Precision</span>
            <span class="trait-value" id="precision-value">7</span>
          </label>
          <input type="range" id="trait-precision" class="trait-slider" 
                 min="0" max="10" step="1" value="7" 
                 data-trait="precision">
          <div class="trait-labels">
            <span>Flexible</span>
            <span>Precise</span>
          </div>
        </div>
        
        <div class="trait-group">
          <label for="trait-creativity">
            <span class="trait-name">Creativity</span>
            <span class="trait-value" id="creativity-value">7</span>
          </label>
          <input type="range" id="trait-creativity" class="trait-slider" 
                 min="0" max="10" step="1" value="7" 
                 data-trait="creativity">
          <div class="trait-labels">
            <span>Practical</span>
            <span>Creative</span>
          </div>
        </div>
        
        <div class="trait-group">
          <label for="trait-humor">
            <span class="trait-name">Humor</span>
            <span class="trait-value" id="humor-value">5</span>
          </label>
          <input type="range" id="trait-humor" class="trait-slider" 
                 min="0" max="10" step="1" value="5" 
                 data-trait="humor">
          <div class="trait-labels">
            <span>Serious</span>
            <span>Humorous</span>
          </div>
        </div>
        
        <div class="trait-group">
          <label for="trait-formality">
            <span class="trait-name">Formality</span>
            <span class="trait-value" id="formality-value">6</span>
          </label>
          <input type="range" id="trait-formality" class="trait-slider" 
                 min="0" max="10" step="1" value="6" 
                 data-trait="formality">
          <div class="trait-labels">
            <span>Casual</span>
            <span>Formal</span>
          </div>
        </div>
        
        <div class="trait-group">
          <label for="trait-detail">
            <span class="trait-name">Detail Level</span>
            <span class="trait-value" id="detail-value">7</span>
          </label>
          <input type="range" id="trait-detail" class="trait-slider" 
                 min="0" max="10" step="1" value="7" 
                 data-trait="detail">
          <div class="trait-labels">
            <span>Concise</span>
            <span>Detailed</span>
          </div>
        </div>
        
        <div class="trait-group">
          <label for="trait-empathy">
            <span class="trait-name">Empathy</span>
            <span class="trait-value" id="empathy-value">8</span>
          </label>
          <input type="range" id="trait-empathy" class="trait-slider" 
                 min="0" max="10" step="1" value="8" 
                 data-trait="empathy">
          <div class="trait-labels">
            <span>Neutral</span>
            <span>Empathetic</span>
          </div>
        </div>
        
        <div class="trait-group">
          <label for="trait-assertiveness">
            <span class="trait-name">Assertiveness</span>
            <span class="trait-value" id="assertiveness-value">5</span>
          </label>
          <input type="range" id="trait-assertiveness" class="trait-slider" 
                 min="0" max="10" step="1" value="5" 
                 data-trait="assertiveness">
          <div class="trait-labels">
            <span>Tentative</span>
            <span>Assertive</span>
          </div>
        </div>
      </div>
      
      <div class="personality-presets">
        <h4>Personality Presets</h4>
        <div class="preset-buttons">
          <button class="preset-btn" data-preset="friendly">Friendly</button>
          <button class="preset-btn" data-preset="professional">Professional</button>
          <button class="preset-btn" data-preset="academic">Academic</button>
          <button class="preset-btn" data-preset="creative">Creative</button>
          <button class="preset-btn" data-preset="default">Default</button>
        </div>
      </div>
      
      <div class="personality-actions">
        <button id="save-personality" class="btn-primary">Save Personality</button>
        <button id="reset-personality" class="btn-outline">Reset to Default</button>
      </div>
    </div>
  `,
  
  // CSS styles for the personality configuration UI
  styles: `
    .personality-config {
      background: var(--color-card);
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);
      margin-bottom: var(--spacing-6);
      border: 1px solid var(--color-border);
    }
    
    .personality-config h3 {
      font-size: var(--font-size-xl);
      margin-bottom: var(--spacing-4);
      color: var(--color-primary);
    }
    
    .personality-config p {
      margin-bottom: var(--spacing-4);
      color: var(--color-foreground-muted);
    }
    
    .trait-sliders {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-4);
      margin-bottom: var(--spacing-6);
    }
    
    @media (min-width: 768px) {
      .trait-sliders {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .trait-group {
      display: flex;
      flex-direction: column;
    }
    
    .trait-group label {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--spacing-2);
    }
    
    .trait-name {
      font-weight: 600;
    }
    
    .trait-value {
      background: var(--color-background-light);
      padding: 2px 8px;
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
    }
    
    .trait-slider {
      width: 100%;
      margin-bottom: var(--spacing-1);
    }
    
    .trait-labels {
      display: flex;
      justify-content: space-between;
      font-size: var(--font-size-xs);
      color: var(--color-foreground-muted);
    }
    
    .personality-presets {
      margin-bottom: var(--spacing-6);
    }
    
    .personality-presets h4 {
      margin-bottom: var(--spacing-3);
    }
    
    .preset-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
    }
    
    .preset-btn {
      background: var(--color-background-light);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--spacing-2) var(--spacing-4);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .preset-btn:hover {
      background: var(--color-primary);
      color: white;
    }
    
    .personality-actions {
      display: flex;
      gap: var(--spacing-4);
    }
  `,
  
  // Preset personalities
  presets: {
    default: {
      warmth: 7,
      precision: 7,
      creativity: 7,
      humor: 5,
      formality: 6,
      detail: 7,
      empathy: 8,
      assertiveness: 5
    },
    friendly: {
      warmth: 9,
      precision: 6,
      creativity: 8,
      humor: 8,
      formality: 3,
      detail: 5,
      empathy: 9,
      assertiveness: 4
    },
    professional: {
      warmth: 5,
      precision: 9,
      creativity: 4,
      humor: 2,
      formality: 8,
      detail: 8,
      empathy: 6,
      assertiveness: 7
    },
    academic: {
      warmth: 4,
      precision: 10,
      creativity: 5,
      humor: 2,
      formality: 9,
      detail: 10,
      empathy: 3,
      assertiveness: 6
    },
    creative: {
      warmth: 7,
      precision: 5,
      creativity: 10,
      humor: 7,
      formality: 4,
      detail: 7,
      empathy: 8,
      assertiveness: 6
    }
  },
  
  // Initialize the feature
  init: function() {
    console.log('Initializing Customizable AI Personality feature');
    
    // Load saved traits from localStorage or use defaults
    this.loadTraits();
    
    // Add styles to the document
    this.addStyles();
    
    // If we're on a page with the settings container, render the UI
    const settingsContainer = document.querySelector('#aiSettings');
    if (settingsContainer) {
      this.renderUI(settingsContainer);
    }
    
    // Also initialize in chat.js if it exists
    if (window.JAAT_API) {
      window.JAAT_API.personality = this;
    }
    
    return this;
  },
  
  // Add the CSS styles to the document
  addStyles: function() {
    const styleElement = document.createElement('style');
    styleElement.id = 'personality-styles';
    styleElement.textContent = this.styles;
    document.head.appendChild(styleElement);
  },
  
  // Render the personality configuration UI
  renderUI: function(container) {
    // Create a div for the personality configuration
    const personalityDiv = document.createElement('div');
    personalityDiv.innerHTML = this.template;
    container.appendChild(personalityDiv);
    
    // Update sliders with current values
    this.updateSliders();
    
    // Add event listeners
    this.addEventListeners();
  },
  
  // Load traits from localStorage or use defaults
  loadTraits: function() {
    try {
      const savedTraits = localStorage.getItem('jaat_personality_traits');
      if (savedTraits) {
        this.currentTraits = JSON.parse(savedTraits);
      } else {
        this.currentTraits = {...this.defaultTraits};
      }
    } catch (e) {
      console.error('Error loading personality traits:', e);
      this.currentTraits = {...this.defaultTraits};
    }
  },
  
  // Save traits to localStorage
  saveTraits: function() {
    try {
      localStorage.setItem('jaat_personality_traits', JSON.stringify(this.currentTraits));
    } catch (e) {
      console.error('Error saving personality traits:', e);
    }
  },
  
  // Update slider values based on current traits
  updateSliders: function() {
    for (const [trait, value] of Object.entries(this.currentTraits)) {
      const slider = document.querySelector(`[data-trait="${trait}"]`);
      const valueDisplay = document.getElementById(`${trait}-value`);
      
      if (slider && valueDisplay) {
        slider.value = value;
        valueDisplay.textContent = value;
      }
    }
  },
  
  // Add event listeners to UI elements
  addEventListeners: function() {
    // Add listeners to sliders
    const sliders = document.querySelectorAll('.trait-slider');
    sliders.forEach(slider => {
      slider.addEventListener('input', this.handleSliderChange.bind(this));
    });
    
    // Add listeners to preset buttons
    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(button => {
      button.addEventListener('click', this.handlePresetClick.bind(this));
    });
    
    // Add listeners to action buttons
    const saveButton = document.getElementById('save-personality');
    if (saveButton) {
      saveButton.addEventListener('click', this.handleSave.bind(this));
    }
    
    const resetButton = document.getElementById('reset-personality');
    if (resetButton) {
      resetButton.addEventListener('click', this.handleReset.bind(this));
    }
  },
  
  // Handle slider change events
  handleSliderChange: function(event) {
    const trait = event.target.dataset.trait;
    const value = parseInt(event.target.value);
    
    // Update the value display
    const valueDisplay = document.getElementById(`${trait}-value`);
    if (valueDisplay) {
      valueDisplay.textContent = value;
    }
    
    // Update the current traits
    this.currentTraits[trait] = value;
  },
  
  // Handle preset button clicks
  handlePresetClick: function(event) {
    const preset = event.target.dataset.preset;
    if (this.presets[preset]) {
      this.currentTraits = {...this.presets[preset]};
      this.updateSliders();
    }
  },
  
  // Handle save button clicks
  handleSave: function() {
    this.saveTraits();
    
    // Show a success message
    const actionsDiv = document.querySelector('.personality-actions');
    if (actionsDiv) {
      const message = document.createElement('div');
      message.className = 'save-message';
      message.textContent = 'Personality settings saved!';
      message.style.color = 'var(--color-success)';
      message.style.marginTop = 'var(--spacing-2)';
      
      actionsDiv.appendChild(message);
      
      // Remove message after 3 seconds
      setTimeout(() => {
        if (message.parentNode) {
          message.parentNode.removeChild(message);
        }
      }, 3000);
    }
  },
  
  // Handle reset button clicks
  handleReset: function() {
    this.currentTraits = {...this.defaultTraits};
    this.updateSliders();
  },
  
  // Generate a system message based on personality settings
  generateSystemMessage: function(baseMessage) {
    // Start with the base message
    let systemMessage = baseMessage || "You are JAAT-AI, a helpful AI assistant.";
    
    // Add personality attributes based on trait settings
    const traits = this.currentTraits;
    
    // Format of response
    if (traits.detail > 7) {
      systemMessage += " Provide comprehensive and detailed responses.";
    } else if (traits.detail < 4) {
      systemMessage += " Focus on being concise and to the point.";
    }
    
    // Tone
    if (traits.warmth > 7) {
      systemMessage += " Be warm, approachable, and friendly in your tone.";
    } else if (traits.warmth < 4) {
      systemMessage += " Maintain an analytical and detached tone.";
    }
    
    // Precision
    if (traits.precision > 7) {
      systemMessage += " Emphasize accuracy and precision in your responses.";
    } else if (traits.precision < 4) {
      systemMessage += " Be flexible and adaptable in your thinking.";
    }
    
    // Creativity
    if (traits.creativity > 7) {
      systemMessage += " Think creatively and consider novel perspectives.";
    } else if (traits.creativity < 4) {
      systemMessage += " Stick to practical, proven approaches.";
    }
    
    // Humor
    if (traits.humor > 7) {
      systemMessage += " Incorporate appropriate humor and lightheartedness in your responses.";
    } else if (traits.humor < 4) {
      systemMessage += " Maintain a serious and sober tone.";
    }
    
    // Formality
    if (traits.formality > 7) {
      systemMessage += " Use formal language and professional terminology.";
    } else if (traits.formality < 4) {
      systemMessage += " Use casual, conversational language.";
    }
    
    // Empathy
    if (traits.empathy > 7) {
      systemMessage += " Show empathy and emotional understanding in your responses.";
    } else if (traits.empathy < 4) {
      systemMessage += " Maintain emotional neutrality and objectivity.";
    }
    
    // Assertiveness
    if (traits.assertiveness > 7) {
      systemMessage += " Be confident and direct in stating your perspectives.";
    } else if (traits.assertiveness < 4) {
      systemMessage += " Present ideas tentatively, acknowledging limitations.";
    }
    
    return systemMessage;
  },
  
  // Get personality trait values
  getTraits: function() {
    return {...this.currentTraits};
  }
};

// Auto-initialize if document is already loaded
if (document.readyState === 'complete') {
  CustomizablePersonality.init();
} else {
  // Otherwise wait for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    CustomizablePersonality.init();
  });
}

// Export the feature
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CustomizablePersonality;
} else {
  window.CustomizablePersonality = CustomizablePersonality;
}
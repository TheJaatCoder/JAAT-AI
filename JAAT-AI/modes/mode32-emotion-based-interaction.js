/**
 * JAAT-AI Mode: Emotion-Based Interaction
 * 
 * Advanced emotional intelligence system that analyzes sentiment,
 * adapts responses based on emotional context, and provides
 * emotionally appropriate interaction.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const EmotionBasedInteractionMode = {
  id: 'emotion-interaction',
  name: 'Emotion-Based Interaction',
  icon: 'smile',
  description: 'AI that responds to and adapts based on emotional context.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Emotion-Based Interaction mode, a specialized AI assistant with advanced emotional intelligence. You focus on recognizing, acknowledging, and appropriately responding to the emotional states of the user throughout your conversations.

Key characteristics:
1. You detect emotional tones in messages and adapt your responses accordingly
2. You acknowledge feelings in a way that feels natural and empathetic, not formulaic
3. You adjust your communication style based on the emotional context
4. You can respond appropriately to both positive and negative emotional states
5. You recognize emotional shifts over the course of a conversation
6. You maintain appropriate boundaries while still conveying empathy
7. You can discuss emotions themselves with nuance and depth when relevant

When a user seems distressed, frustrated, or negatively affected, prioritize acknowledging their feelings before addressing the content of their message. When they're excited or positive, match their energy appropriately. Recognize that emotional context can change the meaning of requests, and respond accordingly. Always maintain a balance between emotional attunement and helpful assistance.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "I'm feeling really stressed about a deadline coming up.",
    "I'm excited about a new project I'm starting!",
    "I'm confused about what to do with my career path.",
    "I'm feeling down today and could use some encouragement.",
    "I just got great news and wanted to share it with someone!",
    "I'm frustrated because nothing seems to be working out.",
    "I'm anxious about an upcoming presentation.",
    "How does emotional intelligence work in AI?",
    "Can you help me understand my emotional reactions better?",
    "I'm feeling overwhelmed with too many responsibilities."
  ],
  
  // Emotion categories for recognition and response
  emotionCategories: [
    {
      id: 'joy',
      name: 'Joy',
      markers: ['happy', 'excited', 'delighted', 'thrilled', 'pleased', 'glad', 'cheerful', 'elated'],
      responseStyle: 'Warm, enthusiastic, celebratory, matching positive energy',
      examples: [
        'That\'s wonderful news! I\'m really happy for you.',
        'How exciting! It\'s great to see things coming together for you.'
      ]
    },
    {
      id: 'sadness',
      name: 'Sadness',
      markers: ['sad', 'unhappy', 'down', 'depressed', 'blue', 'upset', 'discouraged', 'disappointed'],
      responseStyle: 'Gentle, supportive, validating, offering perspective when appropriate',
      examples: [
        'I\'m sorry you\'re feeling down. That sounds really difficult.',
        'It makes sense that you\'d feel sad about that. Would it help to talk more about it?'
      ]
    },
    {
      id: 'anger',
      name: 'Anger',
      markers: ['angry', 'frustrated', 'annoyed', 'irritated', 'furious', 'mad', 'outraged', 'resentful'],
      responseStyle: 'Calm, validating without escalating, problem-solving when welcome',
      examples: [
        'I can understand why that would be frustrating. It\'s not fair when that happens.',
        'Your anger makes a lot of sense in this situation. Would you like to discuss ways to address this?'
      ]
    },
    {
      id: 'fear',
      name: 'Fear/Anxiety',
      markers: ['afraid', 'anxious', 'worried', 'nervous', 'scared', 'terrified', 'concerned', 'uneasy'],
      responseStyle: 'Reassuring, grounding, providing clarity and structure',
      examples: [
        'It\'s understandable to feel anxious about this. Let\'s break it down together.',
        'That uncertainty would make anyone nervous. What aspect concerns you most?'
      ]
    },
    {
      id: 'surprise',
      name: 'Surprise',
      markers: ['surprised', 'shocked', 'astonished', 'amazed', 'stunned', 'unexpected', 'startled'],
      responseStyle: 'Acknowledging the unexpected, helping process and make sense of it',
      examples: [
        'Wow, that must have been completely unexpected! How are you processing it?',
        'That\'s quite a surprise! It can take time to adjust to unexpected news like this.'
      ]
    },
    {
      id: 'disgust',
      name: 'Disgust',
      markers: ['disgusted', 'revolted', 'repulsed', 'appalled', 'horrified', 'offended'],
      responseStyle: 'Validating the reaction, providing perspective, showing understanding',
      examples: [
        'I can see why you\'d find that deeply troubling. It goes against important values.',
        'That kind of situation would be disturbing to most people. Your reaction makes sense.'
      ]
    },
    {
      id: 'confusion',
      name: 'Confusion',
      markers: ['confused', 'uncertain', 'puzzled', 'perplexed', 'unsure', 'lost', 'bewildered'],
      responseStyle: 'Clear, structured, patient, breaking down complexity',
      examples: [
        'I can see how that would be confusing. Let me try to clarify this step by step.',
        'It\'s perfectly normal to feel uncertain about this. Let\'s sort through it together.'
      ]
    },
    {
      id: 'hope',
      name: 'Hope',
      markers: ['hopeful', 'optimistic', 'looking forward', 'anticipating', 'encouraged'],
      responseStyle: 'Nurturing optimism, realistic positivity, forward-looking',
      examples: [
        'It\'s wonderful that you\'re feeling hopeful. What are you most looking forward to?',
        'That sense of optimism is valuable. Let\'s think about how to build on this positive direction.'
      ]
    }
  ],
  
  // Emotional intelligence components
  eiComponents: [
    {
      id: 'recognition',
      name: 'Emotion Recognition',
      description: 'Identifying emotions from text through linguistic markers',
      process: [
        'Analyzing word choice and explicit emotion terms',
        'Recognizing emotion-indicating phrases and expressions',
        'Detecting intensity through modifiers and emphasis',
        'Tracking emotional context over conversation history'
      ]
    },
    {
      id: 'understanding',
      name: 'Emotion Understanding',
      description: 'Comprehending the causes and implications of emotions',
      process: [
        'Connecting emotions to their situational triggers',
        'Recognizing emotional patterns and progressions',
        'Understanding complex or mixed emotional states',
        'Contextualizing emotions within broader life circumstances'
      ]
    },
    {
      id: 'response',
      name: 'Emotion-Appropriate Response',
      description: 'Crafting responses that acknowledge and work with emotions',
      process: [
        'Validating emotions before problem-solving',
        'Matching communication style to emotional context',
        'Providing supportive framing for information',
        'Offering perspective when helpful and appropriate'
      ]
    },
    {
      id: 'adaptation',
      name: 'Adaptive Interaction',
      description: 'Adjusting interaction style based on emotional shifts',
      process: [
        'Detecting changes in emotional state during conversation',
        'Transitioning between different response styles as needed',
        'Balancing emotional attunement with task assistance',
        'Recognizing when to shift focus to/from emotional content'
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="emotion-interaction-interface">
      <div class="emotion-header">
        <div class="emotion-icon">
          <i class="fas fa-smile"></i>
        </div>
        <div class="emotion-title">
          <h2>Emotion-Based Interaction</h2>
          <p>AI that responds to and adapts based on emotional context</p>
        </div>
      </div>
      
      <div class="emotion-monitor">
        <h3>Emotion Monitor</h3>
        <p class="emotion-description">This visualization shows the detected emotions in your conversation.</p>
        
        <div class="emotion-spectrum-container">
          <div class="emotion-spectrum">
            <div class="emotion-marker" id="emotion-marker">
              <div class="marker-dot"></div>
              <div class="marker-label">Neutral</div>
            </div>
          </div>
          <div class="emotion-labels">
            <span class="emotion-label negative">Negative</span>
            <span class="emotion-label neutral">Neutral</span>
            <span class="emotion-label positive">Positive</span>
          </div>
        </div>
        
        <div class="detected-emotions">
          <div class="primary-emotion">
            <div class="emotion-icon-container">
              <i class="far fa-meh"></i>
            </div>
            <div class="emotion-details">
              <div class="emotion-name" id="primary-emotion">Neutral</div>
              <div class="emotion-intensity" id="emotion-intensity">
                <div class="intensity-bar">
                  <div class="intensity-fill" style="width: 20%;"></div>
                </div>
                <span class="intensity-label">Low Intensity</span>
              </div>
            </div>
          </div>
          
          <div class="secondary-emotions" id="secondary-emotions">
            <!-- Secondary emotions will be populated here -->
            <div class="secondary-emotion-empty">
              No additional emotions detected yet
            </div>
          </div>
        </div>
      </div>
      
      <div class="interaction-settings">
        <h3>Interaction Preferences</h3>
        <div class="settings-grid">
          <div class="setting-item">
            <div class="setting-label">
              <span>Emotional Response Level</span>
              <div class="setting-info" data-tooltip="How much the AI adjusts its responses based on emotional content">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="setting-control">
              <select id="emotional-response-level">
                <option value="high">High - Strongly emotion-focused</option>
                <option value="balanced" selected>Balanced - Adaptive response</option>
                <option value="subtle">Subtle - Minimal adjustments</option>
              </select>
            </div>
          </div>
          
          <div class="setting-item">
            <div class="setting-label">
              <span>Emotion Acknowledgment</span>
              <div class="setting-info" data-tooltip="Whether the AI explicitly acknowledges detected emotions">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="setting-control">
              <select id="emotion-acknowledgment">
                <option value="explicit">Explicit - Directly name emotions</option>
                <option value="implicit" selected>Implicit - Respond appropriately without naming</option>
                <option value="minimal">Minimal - Focus primarily on content</option>
              </select>
            </div>
          </div>
          
          <div class="setting-item">
            <div class="setting-label">
              <span>Response Matching</span>
              <div class="setting-info" data-tooltip="How closely the AI matches your emotional tone">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="setting-control">
              <select id="response-matching">
                <option value="mirror">Mirror - Match emotional tone</option>
                <option value="complement" selected>Complement - Respond in balancing way</option>
                <option value="neutral">Neutral - Maintain consistent tone</option>
              </select>
            </div>
          </div>
          
          <div class="setting-item">
            <div class="setting-label">
              <span>Conversation Memory</span>
              <div class="setting-info" data-tooltip="How much the AI considers emotional patterns over time">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="setting-control">
              <select id="conversation-memory">
                <option value="extended">Extended - Track emotional patterns</option>
                <option value="recent" selected>Recent - Focus on current context</option>
                <option value="present">Present - Only current message</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="settings-actions">
          <button id="apply-settings" class="apply-button">
            <i class="fas fa-check"></i> Apply Settings
          </button>
          <button id="reset-settings" class="reset-button">
            <i class="fas fa-redo"></i> Reset to Default
          </button>
        </div>
      </div>
      
      <div class="emotion-insights">
        <h3>Emotional Intelligence Insights</h3>
        <div class="insights-tabs">
          <button class="tab-button active" data-tab="recognition">Recognition</button>
          <button class="tab-button" data-tab="understanding">Understanding</button>
          <button class="tab-button" data-tab="response">Response</button>
          <button class="tab-button" data-tab="adaptation">Adaptation</button>
        </div>
        
        <div class="insights-content">
          <div class="insight-panel active" id="panel-recognition">
            <h4>Emotion Recognition</h4>
            <p>The ability to identify emotions from text through linguistic markers and context:</p>
            <ul class="insight-list">
              <li>Analyzing word choice and explicit emotion terms</li>
              <li>Recognizing emotion-indicating phrases and expressions</li>
              <li>Detecting intensity through modifiers and emphasis</li>
              <li>Tracking emotional context over conversation history</li>
            </ul>
          </div>
          
          <div class="insight-panel" id="panel-understanding">
            <h4>Emotion Understanding</h4>
            <p>Comprehending the causes and implications of emotions:</p>
            <ul class="insight-list">
              <li>Connecting emotions to their situational triggers</li>
              <li>Recognizing emotional patterns and progressions</li>
              <li>Understanding complex or mixed emotional states</li>
              <li>Contextualizing emotions within broader life circumstances</li>
            </ul>
          </div>
          
          <div class="insight-panel" id="panel-response">
            <h4>Emotion-Appropriate Response</h4>
            <p>Crafting responses that acknowledge and work with emotions:</p>
            <ul class="insight-list">
              <li>Validating emotions before problem-solving</li>
              <li>Matching communication style to emotional context</li>
              <li>Providing supportive framing for information</li>
              <li>Offering perspective when helpful and appropriate</li>
            </ul>
          </div>
          
          <div class="insight-panel" id="panel-adaptation">
            <h4>Adaptive Interaction</h4>
            <p>Adjusting interaction style based on emotional shifts:</p>
            <ul class="insight-list">
              <li>Detecting changes in emotional state during conversation</li>
              <li>Transitioning between different response styles as needed</li>
              <li>Balancing emotional attunement with task assistance</li>
              <li>Recognizing when to shift focus to/from emotional content</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="emotion-examples">
        <h3>Example Responses by Emotion</h3>
        <div class="examples-container" id="examples-container">
          <!-- Will be populated with examples -->
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .emotion-interaction-interface {
      background: linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(236, 72, 153, 0.2);
    }
    
    .emotion-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .emotion-icon {
      font-size: 2.5rem;
      color: #ec4899;
      margin-right: 1rem;
    }
    
    .emotion-title h2 {
      color: #ec4899;
      margin-bottom: 0.3rem;
    }
    
    .emotion-title p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .emotion-monitor {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .emotion-monitor h3 {
      color: #f3f4f6;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    
    .emotion-description {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    
    .emotion-spectrum-container {
      margin-bottom: 1.5rem;
    }
    
    .emotion-spectrum {
      height: 6px;
      background: linear-gradient(to right, #ef4444, #d1d5db, #10b981);
      border-radius: 3px;
      margin-bottom: 0.5rem;
      position: relative;
    }
    
    .emotion-marker {
      position: absolute;
      top: -6px;
      left: 50%; /* Center position - will be adjusted by JS */
      transform: translateX(-50%);
      transition: left 0.5s ease;
    }
    
    .marker-dot {
      width: 16px;
      height: 16px;
      background: #f3f4f6;
      border: 2px solid #1f2937;
      border-radius: 50%;
    }
    
    .marker-label {
      color: #f3f4f6;
      font-size: 0.8rem;
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
    }
    
    .emotion-labels {
      display: flex;
      justify-content: space-between;
      color: #94a3b8;
      font-size: 0.8rem;
    }
    
    .emotion-label.negative {
      color: #ef4444;
    }
    
    .emotion-label.neutral {
      color: #d1d5db;
    }
    
    .emotion-label.positive {
      color: #10b981;
    }
    
    .detected-emotions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .primary-emotion {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(15, 23, 42, 0.4);
      border-radius: 8px;
      padding: 1rem;
    }
    
    .emotion-icon-container {
      font-size: 2rem;
      color: #ec4899;
      width: 40px;
      display: flex;
      justify-content: center;
    }
    
    .emotion-details {
      flex: 1;
    }
    
    .emotion-name {
      color: #f3f4f6;
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .emotion-intensity {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .intensity-bar {
      flex: 1;
      height: 6px;
      background: rgba(74, 85, 104, 0.4);
      border-radius: 3px;
      overflow: hidden;
    }
    
    .intensity-fill {
      height: 100%;
      background: #ec4899;
      border-radius: 3px;
      transition: width 0.5s ease;
    }
    
    .intensity-label {
      color: #94a3b8;
      font-size: 0.8rem;
      min-width: 80px;
      text-align: right;
    }
    
    .secondary-emotions {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 0.75rem;
    }
    
    .secondary-emotion {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 6px;
      padding: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .secondary-emotion i {
      color: #94a3b8;
      font-size: 1.1rem;
      width: 20px;
      display: flex;
      justify-content: center;
    }
    
    .secondary-emotion-details {
      flex: 1;
    }
    
    .secondary-emotion-name {
      color: #e2e8f0;
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
    }
    
    .secondary-emotion-intensity {
      height: 4px;
      background: rgba(74, 85, 104, 0.4);
      border-radius: 2px;
      overflow: hidden;
    }
    
    .secondary-intensity-fill {
      height: 100%;
      background: #94a3b8;
      border-radius: 2px;
      transition: width 0.5s ease;
    }
    
    .secondary-emotion-empty {
      grid-column: 1 / -1;
      color: #64748b;
      text-align: center;
      padding: 1rem;
      font-style: italic;
      font-size: 0.9rem;
    }
    
    .interaction-settings {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .interaction-settings h3 {
      color: #f3f4f6;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .setting-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
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
      border: 1px solid rgba(74, 85, 104, 0.4);
      color: #e2e8f0;
      padding: 0.5rem;
      border-radius: 4px;
      width: 100%;
    }
    
    .settings-actions {
      display: flex;
      gap: 1rem;
    }
    
    .apply-button, .reset-button {
      padding: 0.6rem 1.2rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .apply-button {
      background: #ec4899;
      color: white;
      border: none;
    }
    
    .apply-button:hover {
      background: #db2777;
    }
    
    .reset-button {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(74, 85, 104, 0.4);
    }
    
    .reset-button:hover {
      background: rgba(15, 23, 42, 0.4);
      color: #e2e8f0;
    }
    
    .emotion-insights {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .emotion-insights h3 {
      color: #f3f4f6;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .insights-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(74, 85, 104, 0.4);
      padding-bottom: 0.5rem;
    }
    
    .tab-button {
      background: transparent;
      border: none;
      color: #94a3b8;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .tab-button:hover {
      background: rgba(15, 23, 42, 0.4);
      color: #e2e8f0;
    }
    
    .tab-button.active {
      background: rgba(236, 72, 153, 0.2);
      color: #ec4899;
    }
    
    .insight-panel {
      display: none;
    }
    
    .insight-panel.active {
      display: block;
    }
    
    .insight-panel h4 {
      color: #f3f4f6;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    
    .insight-panel p {
      color: #94a3b8;
      margin-bottom: 1rem;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    .insight-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      color: #cbd5e0;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    .insight-list li {
      margin-bottom: 0.5rem;
    }
    
    .insight-list li:last-child {
      margin-bottom: 0;
    }
    
    .emotion-examples {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
    }
    
    .emotion-examples h3 {
      color: #f3f4f6;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .examples-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .example-card {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 6px;
      padding: 1rem;
      border-left: 3px solid;
    }
    
    .example-card.joy {
      border-color: #10b981;
    }
    
    .example-card.sadness {
      border-color: #60a5fa;
    }
    
    .example-card.anger {
      border-color: #ef4444;
    }
    
    .example-card.fear {
      border-color: #a855f7;
    }
    
    .example-card.surprise {
      border-color: #f59e0b;
    }
    
    .example-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    
    .example-emotion-icon {
      color: inherit;
    }
    
    .example-emotion-name {
      color: #f3f4f6;
      font-weight: 500;
    }
    
    .example-style {
      color: #94a3b8;
      font-size: 0.85rem;
      font-style: italic;
      margin-bottom: 0.75rem;
    }
    
    .example-response {
      color: #cbd5e0;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Current state of emotion detection
  currentState: {
    primaryEmotion: {
      id: 'neutral',
      name: 'Neutral',
      intensity: 0.2
    },
    secondaryEmotions: [],
    emotionHistory: [],
    settings: {
      responseLevel: 'balanced',
      acknowledgment: 'implicit',
      matching: 'complement',
      memory: 'recent'
    }
  },
  
  // Emotion icons mapping
  emotionIcons: {
    joy: 'fa-smile-beam',
    sadness: 'fa-sad-tear',
    anger: 'fa-angry',
    fear: 'fa-grimace',
    surprise: 'fa-surprise',
    disgust: 'fa-dizzy',
    confusion: 'fa-confused',
    hope: 'fa-smile',
    neutral: 'fa-meh'
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Emotion-Based Interaction Mode');
    
    // Add the mode's CSS to the document
    this.addStyles();
    
    // If the mode's special interface container exists, render the interface
    const modeContainer = document.getElementById('modeSpecificUI');
    if (modeContainer) {
      this.renderUI(modeContainer);
    }
    
    // If the chat input exists, set a default message placeholder
    const chatInput = document.getElementById('messageInput');
    if (chatInput) {
      chatInput.placeholder = "Share how you're feeling or ask a question...";
    }
    
    return this;
  },
  
  // Add the mode's CSS to the document
  addStyles: function() {
    const styleElement = document.createElement('style');
    styleElement.textContent = this.styles;
    document.head.appendChild(styleElement);
  },
  
  // Render the mode's UI
  renderUI: function(container) {
    // Insert the HTML template
    container.innerHTML = this.template;
    
    // Populate example responses
    this.populateExamples(container);
    
    // Add event listeners
    this.addEventListeners(container);
    
    // Initialize the emotion marker position
    this.updateEmotionDisplay(container);
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Insight tabs
    const tabButtons = container.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked tab
        button.classList.add('active');
        
        // Show corresponding panel
        const panelId = 'panel-' + button.dataset.tab;
        const panels = container.querySelectorAll('.insight-panel');
        
        panels.forEach(panel => {
          panel.classList.remove('active');
          if (panel.id === panelId) {
            panel.classList.add('active');
          }
        });
      });
    });
    
    // Apply settings button
    const applyButton = container.querySelector('#apply-settings');
    if (applyButton) {
      applyButton.addEventListener('click', () => {
        this.applySettings(container);
      });
    }
    
    // Reset settings button
    const resetButton = container.querySelector('#reset-settings');
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        this.resetSettings(container);
      });
    }
    
    // Add input event listener for chat input
    const chatInput = document.getElementById('messageInput');
    if (chatInput) {
      chatInput.addEventListener('input', (e) => {
        this.analyzeInputEmotion(e.target.value, container);
      });
    }
    
    // Add submit event listener for chat form
    const chatForm = document.querySelector('.chat-input form');
    if (chatForm) {
      chatForm.addEventListener('submit', () => {
        const messageInput = document.getElementById('messageInput');
        if (messageInput && messageInput.value) {
          this.recordEmotionHistory(messageInput.value);
        }
      });
    }
  },
  
  // Populate example responses
  populateExamples: function(container) {
    const examplesContainer = container.querySelector('#examples-container');
    if (!examplesContainer) return;
    
    // Select a subset of emotions to show examples for
    const emotionsToShow = ['joy', 'sadness', 'anger', 'fear', 'hope', 'confusion'];
    
    // Add example cards
    emotionsToShow.forEach(emotionId => {
      const emotion = this.emotionCategories.find(e => e.id === emotionId);
      if (!emotion || !emotion.examples || emotion.examples.length === 0) return;
      
      // Select a random example
      const example = emotion.examples[Math.floor(Math.random() * emotion.examples.length)];
      
      // Create example card
      const card = document.createElement('div');
      card.className = `example-card ${emotion.id}`;
      
      card.innerHTML = `
        <div class="example-header">
          <i class="far ${this.emotionIcons[emotion.id] || 'fa-meh'} example-emotion-icon"></i>
          <span class="example-emotion-name">${emotion.name}</span>
        </div>
        <div class="example-style">${emotion.responseStyle}</div>
        <div class="example-response">"${example}"</div>
      `;
      
      examplesContainer.appendChild(card);
    });
  },
  
  // Apply interaction settings
  applySettings: function(container) {
    // Get settings from form
    const responseLevel = container.querySelector('#emotional-response-level').value;
    const acknowledgment = container.querySelector('#emotion-acknowledgment').value;
    const matching = container.querySelector('#response-matching').value;
    const memory = container.querySelector('#conversation-memory').value;
    
    // Update current settings
    this.currentState.settings = {
      responseLevel,
      acknowledgment,
      matching,
      memory
    };
    
    // Show confirmation
    const applyButton = container.querySelector('#apply-settings');
    if (applyButton) {
      const originalText = applyButton.innerHTML;
      applyButton.innerHTML = '<i class="fas fa-check"></i> Settings Applied';
      
      setTimeout(() => {
        applyButton.innerHTML = originalText;
      }, 2000);
    }
    
    // Send settings to AI for awareness
    this.notifyAIOfSettings();
  },
  
  // Reset settings to default
  resetSettings: function(container) {
    // Reset settings in UI
    const responseLevel = container.querySelector('#emotional-response-level');
    const acknowledgment = container.querySelector('#emotion-acknowledgment');
    const matching = container.querySelector('#response-matching');
    const memory = container.querySelector('#conversation-memory');
    
    if (responseLevel) responseLevel.value = 'balanced';
    if (acknowledgment) acknowledgment.value = 'implicit';
    if (matching) matching.value = 'complement';
    if (memory) memory.value = 'recent';
    
    // Update current settings
    this.currentState.settings = {
      responseLevel: 'balanced',
      acknowledgment: 'implicit',
      matching: 'complement',
      memory: 'recent'
    };
    
    // Show confirmation
    const resetButton = container.querySelector('#reset-settings');
    if (resetButton) {
      const originalText = resetButton.innerHTML;
      resetButton.innerHTML = '<i class="fas fa-check"></i> Settings Reset';
      
      setTimeout(() => {
        resetButton.innerHTML = originalText;
      }, 2000);
    }
    
    // Notify AI of reset
    this.notifyAIOfSettings();
  },
  
  // Analyze input for emotional content
  analyzeInputEmotion: function(text, container) {
    if (!text) {
      // Reset to neutral if empty
      this.currentState.primaryEmotion = {
        id: 'neutral',
        name: 'Neutral',
        intensity: 0.2
      };
      this.currentState.secondaryEmotions = [];
      this.updateEmotionDisplay(container);
      return;
    }
    
    // Simple keyword-based emotion detection
    // In a real implementation, this would use a more sophisticated sentiment analysis
    
    // Variables to track identified emotions
    let identifiedEmotions = [];
    
    // Check each emotion category
    this.emotionCategories.forEach(category => {
      let matches = 0;
      let intensity = 0;
      
      // Check for emotional markers
      category.markers.forEach(marker => {
        // Case-insensitive word boundary search for the marker
        const regex = new RegExp(`\\b${marker}\\b`, 'i');
        if (regex.test(text)) {
          matches++;
          
          // Increasing intensity for multiple matches of the same emotion
          intensity = Math.min(0.7, 0.3 + (matches * 0.1));
          
          // Increase intensity for explicit "very" or "extremely" qualifiers
          if (/\b(very|extremely|incredibly|really)\s+\b/i.test(text)) {
            intensity += 0.2;
          }
        }
      });
      
      if (matches > 0) {
        identifiedEmotions.push({
          id: category.id,
          name: category.name,
          intensity: intensity,
          matches: matches
        });
      }
    });
    
    // Sort by intensity and matches
    identifiedEmotions.sort((a, b) => {
      if (b.intensity !== a.intensity) {
        return b.intensity - a.intensity;
      }
      return b.matches - a.matches;
    });
    
    // Update state with detected emotions
    if (identifiedEmotions.length > 0) {
      this.currentState.primaryEmotion = {
        id: identifiedEmotions[0].id,
        name: identifiedEmotions[0].name,
        intensity: identifiedEmotions[0].intensity
      };
      
      // Store secondary emotions (if any)
      this.currentState.secondaryEmotions = identifiedEmotions.slice(1, 3).map(e => ({
        id: e.id,
        name: e.name,
        intensity: e.intensity
      }));
    } else {
      // Default to neutral if no emotions detected
      this.currentState.primaryEmotion = {
        id: 'neutral',
        name: 'Neutral',
        intensity: 0.2
      };
      this.currentState.secondaryEmotions = [];
    }
    
    // Update the display
    this.updateEmotionDisplay(container);
  },
  
  // Record emotion in history when message is sent
  recordEmotionHistory: function(message) {
    // Only store if we have a primary emotion
    if (this.currentState.primaryEmotion) {
      this.currentState.emotionHistory.push({
        emotion: this.currentState.primaryEmotion,
        timestamp: new Date().getTime(),
        message: message
      });
      
      // Keep only last 10 messages
      if (this.currentState.emotionHistory.length > 10) {
        this.currentState.emotionHistory.shift();
      }
    }
  },
  
  // Update the emotion display
  updateEmotionDisplay: function(container) {
    // Get the primary emotion
    const primaryEmotion = this.currentState.primaryEmotion;
    if (!primaryEmotion) return;
    
    // Update the emotion marker position
    const emotionMarker = container.querySelector('#emotion-marker');
    if (emotionMarker) {
      // Map the emotion to a position on the spectrum
      let position = 50; // Default center position (neutral)
      
      // Simple mapping based on emotion
      if (primaryEmotion.id === 'joy' || primaryEmotion.id === 'hope') {
        position = 80 + (primaryEmotion.intensity * 15); // 80-95% (positive)
      } else if (primaryEmotion.id === 'sadness' || primaryEmotion.id === 'anger' || primaryEmotion.id === 'fear' || primaryEmotion.id === 'disgust') {
        position = 20 - (primaryEmotion.intensity * 15); // 5-20% (negative)
      } else if (primaryEmotion.id === 'surprise' || primaryEmotion.id === 'confusion') {
        // These can be positive or negative, so keep them closer to center
        position = 40 + (Math.random() * 20); // 40-60%
      }
      
      // Update marker position
      emotionMarker.style.left = `${position}%`;
      
      // Update marker label
      const markerLabel = emotionMarker.querySelector('.marker-label');
      if (markerLabel) {
        markerLabel.textContent = primaryEmotion.name;
      }
    }
    
    // Update primary emotion display
    const primaryEmotionElement = container.querySelector('#primary-emotion');
    const emotionIntensity = container.querySelector('#emotion-intensity');
    const intensityFill = emotionIntensity?.querySelector('.intensity-fill');
    const intensityLabel = emotionIntensity?.querySelector('.intensity-label');
    const emotionIcon = container.querySelector('.primary-emotion .emotion-icon-container i');
    
    if (primaryEmotionElement) {
      primaryEmotionElement.textContent = primaryEmotion.name;
    }
    
    if (intensityFill) {
      const intensityPercent = Math.round(primaryEmotion.intensity * 100);
      intensityFill.style.width = `${intensityPercent}%`;
    }
    
    if (intensityLabel) {
      // Determine intensity label based on percentage
      let label = 'Low Intensity';
      if (primaryEmotion.intensity > 0.7) {
        label = 'High Intensity';
      } else if (primaryEmotion.intensity > 0.4) {
        label = 'Medium Intensity';
      }
      intensityLabel.textContent = label;
    }
    
    if (emotionIcon) {
      // Update icon based on emotion
      emotionIcon.className = '';
      emotionIcon.classList.add('far', this.emotionIcons[primaryEmotion.id] || 'fa-meh');
    }
    
    // Update secondary emotions
    const secondaryEmotionsContainer = container.querySelector('#secondary-emotions');
    if (secondaryEmotionsContainer) {
      // Clear previous content
      secondaryEmotionsContainer.innerHTML = '';
      
      // Add secondary emotions or empty state
      if (this.currentState.secondaryEmotions.length > 0) {
        this.currentState.secondaryEmotions.forEach(emotion => {
          const emotionElement = document.createElement('div');
          emotionElement.className = 'secondary-emotion';
          
          const intensityPercent = Math.round(emotion.intensity * 100);
          
          emotionElement.innerHTML = `
            <i class="far ${this.emotionIcons[emotion.id] || 'fa-meh'}"></i>
            <div class="secondary-emotion-details">
              <div class="secondary-emotion-name">${emotion.name}</div>
              <div class="secondary-emotion-intensity">
                <div class="secondary-intensity-fill" style="width: ${intensityPercent}%;"></div>
              </div>
            </div>
          `;
          
          secondaryEmotionsContainer.appendChild(emotionElement);
        });
      } else {
        secondaryEmotionsContainer.innerHTML = `
          <div class="secondary-emotion-empty">
            No additional emotions detected
          </div>
        `;
      }
    }
  },
  
  // Notify the AI of the current settings
  notifyAIOfSettings: function() {
    const settings = this.currentState.settings;
    
    const message = `Please update your emotional response style based on my new settings:
- Emotional Response Level: ${settings.responseLevel}
- Emotion Acknowledgment: ${settings.acknowledgment}
- Response Matching: ${settings.matching}
- Conversation Memory: ${settings.memory}

Please acknowledge these preferences.`;
    
    this.sendMessageToAI(message);
  },
  
  // Send a message to the AI
  sendMessageToAI: function(message) {
    const chatInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
      chatInput.value = message;
      sendButton.click();
    }
  }
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    EmotionBasedInteractionMode.init();
  } else {
    window.addEventListener('load', function() {
      EmotionBasedInteractionMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EmotionBasedInteractionMode;
} else {
  window.EmotionBasedInteractionMode = EmotionBasedInteractionMode;
}
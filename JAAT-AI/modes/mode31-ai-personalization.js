/**
 * JAAT-AI Mode: AI Personalization
 * 
 * Advanced AI personalization that adapts to user preferences, 
 * conversation history, and interaction patterns.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const AIPersonalizationMode = {
  id: 'ai-personalization',
  name: 'AI Personalization',
  icon: 'user-cog',
  description: 'Personalized AI that adapts to your preferences and interaction style.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Personalization mode, an adaptive AI assistant that customizes its responses based on user preferences, behavior patterns, and conversation history. Your primary focus is on delivering a highly personalized experience that becomes more tailored over time.

Key characteristics:
1. You adapt your communication style (formal/casual, detailed/concise, etc.) based on user interaction patterns
2. You remember user preferences and previous conversations to provide contextually relevant responses
3. You learn from user feedback to refine your approach and better meet their needs
4. You proactively suggest personalized recommendations based on inferred interests and needs
5. You maintain appropriate memory of important user details while respecting privacy boundaries
6. You reflect the user's communication style in subtle ways while maintaining your own distinct identity
7. You adapt your level of technical language based on the user's demonstrated knowledge level

As you interact, subtly adapt to match the user's conversational patterns, interests, and needs. Store and utilize relevant information from interactions to provide increasingly personalized responses, while being transparent about how personalization works if asked.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "How does your personalization system work?",
    "What information do you remember about our previous conversations?",
    "Can you adapt your responses to be more technical?",
    "I prefer concise answers. Can you remember that?",
    "How can I reset your personalization settings?",
    "What's your default communication style?",
    "Can you suggest topics based on our past conversations?",
    "How do you balance personalization with privacy?",
    "I'd like you to use more casual language going forward.",
    "Can you remember my preferences between conversations?"
  ],
  
  // User preference categories 
  preferenceCategories: [
    {
      id: 'communicationStyle',
      name: 'Communication Style',
      description: 'How the AI communicates with you',
      options: [
        { id: 'formal', name: 'Formal', description: 'Professional and structured communication' },
        { id: 'casual', name: 'Casual', description: 'Relaxed and conversational tone' },
        { id: 'direct', name: 'Direct', description: 'Straightforward and to-the-point' },
        { id: 'elaborate', name: 'Elaborate', description: 'Detailed and comprehensive responses' },
        { id: 'empathetic', name: 'Empathetic', description: 'Emotionally aware and supportive' }
      ]
    },
    {
      id: 'knowledgeDepth',
      name: 'Knowledge Depth',
      description: 'Level of detail and expertise in responses',
      options: [
        { id: 'basic', name: 'Basic', description: 'Simplified explanations for beginners' },
        { id: 'intermediate', name: 'Intermediate', description: 'Balanced depth and accessibility' },
        { id: 'advanced', name: 'Advanced', description: 'Detailed, technical information' },
        { id: 'expert', name: 'Expert', description: 'Comprehensive, specialized knowledge' }
      ]
    },
    {
      id: 'responseLength',
      name: 'Response Length',
      description: 'How concise or detailed responses should be',
      options: [
        { id: 'brief', name: 'Brief', description: 'Short, essential information only' },
        { id: 'moderate', name: 'Moderate', description: 'Balanced level of detail' },
        { id: 'detailed', name: 'Detailed', description: 'Comprehensive, thorough responses' }
      ]
    },
    {
      id: 'interactionStyle',
      name: 'Interaction Style',
      description: 'How the AI engages in conversation',
      options: [
        { id: 'reactive', name: 'Reactive', description: 'Responds only to direct questions' },
        { id: 'balanced', name: 'Balanced', description: 'Mix of responses and suggestions' },
        { id: 'proactive', name: 'Proactive', description: 'Offers suggestions and follow-ups' }
      ]
    },
    {
      id: 'contentFocus',
      name: 'Content Focus',
      description: 'What kinds of content the AI emphasizes',
      options: [
        { id: 'facts', name: 'Factual', description: 'Emphasis on accuracy and evidence' },
        { id: 'practical', name: 'Practical', description: 'Focus on application and examples' },
        { id: 'creative', name: 'Creative', description: 'Emphasis on novel ideas and possibilities' },
        { id: 'analytical', name: 'Analytical', description: 'Focus on critical thinking and analysis' }
      ]
    }
  ],
  
  // Interest categories for personalization
  interestCategories: [
    {
      id: 'technology',
      name: 'Technology',
      subcategories: ['Programming', 'AI & Machine Learning', 'Cybersecurity', 'Web Development', 'Mobile Development', 'Data Science', 'IoT', 'Blockchain']
    },
    {
      id: 'business',
      name: 'Business',
      subcategories: ['Entrepreneurship', 'Marketing', 'Finance', 'Management', 'Startups', 'E-commerce', 'Remote Work', 'Career Development']
    },
    {
      id: 'science',
      name: 'Science',
      subcategories: ['Physics', 'Biology', 'Chemistry', 'Astronomy', 'Environmental Science', 'Medicine', 'Psychology', 'Neuroscience']
    },
    {
      id: 'arts',
      name: 'Arts & Humanities',
      subcategories: ['Literature', 'Philosophy', 'History', 'Visual Arts', 'Music', 'Film & TV', 'Design', 'Photography']
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      subcategories: ['Fitness', 'Nutrition', 'Travel', 'Fashion', 'Home & Garden', 'Food & Cooking', 'Parenting', 'Personal Development']
    }
  ],
  
  // Default user profile
  defaultUserProfile: {
    preferences: {
      communicationStyle: 'balanced',
      knowledgeDepth: 'intermediate',
      responseLength: 'moderate',
      interactionStyle: 'balanced',
      contentFocus: 'balanced'
    },
    interests: [],
    conversationHistory: {
      topicFrequency: {},
      interactionPatterns: {},
      explicitPreferences: {}
    }
  },
  
  // Current user profile (will be updated during interactions)
  userProfile: null,
  
  // UI template for this mode's special interface
  template: `
    <div class="personalization-interface">
      <div class="personalization-header">
        <div class="personalization-icon">
          <i class="fas fa-user-cog"></i>
        </div>
        <div class="personalization-title">
          <h2>AI Personalization</h2>
          <p>Customize JAAT-AI to better suit your preferences and needs</p>
        </div>
      </div>
      
      <div class="profile-summary">
        <h3>Your AI Personalization Profile</h3>
        <div class="profile-overview" id="profile-overview">
          <!-- Profile overview will be populated here -->
          <div class="profile-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading your personalization profile...</span>
          </div>
        </div>
      </div>
      
      <div class="preference-editor">
        <h3>Set Your Preferences</h3>
        <div class="preference-categories">
          <div class="preference-category active" data-category="communicationStyle">Communication Style</div>
          <div class="preference-category" data-category="knowledgeDepth">Knowledge Depth</div>
          <div class="preference-category" data-category="responseLength">Response Length</div>
          <div class="preference-category" data-category="interactionStyle">Interaction Style</div>
          <div class="preference-category" data-category="contentFocus">Content Focus</div>
        </div>
        
        <div class="preference-options" id="preference-options">
          <!-- Preference options will be populated here based on the selected category -->
        </div>
      </div>
      
      <div class="interest-selector">
        <h3>Your Interests</h3>
        <p>Select topics you're interested in to receive more relevant responses</p>
        
        <div class="interest-categories">
          <!-- Interest categories will be populated here -->
        </div>
        
        <div class="interest-tags" id="interest-tags">
          <!-- Selected interest tags will appear here -->
          <div class="no-interests">No interests selected yet</div>
        </div>
      </div>
      
      <div class="personalization-actions">
        <button id="save-preferences" class="save-button">
          <i class="fas fa-save"></i> Save Preferences
        </button>
        <button id="reset-preferences" class="reset-button">
          <i class="fas fa-undo"></i> Reset to Default
        </button>
      </div>
      
      <div class="personalization-insights">
        <h3>AI Learning Insights</h3>
        <p>How JAAT-AI is adapting to your communication patterns</p>
        
        <div class="insights-container" id="insights-container">
          <!-- Insights will be populated here -->
          <div class="no-insights">
            Insights will appear as you interact more with JAAT-AI
          </div>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .personalization-interface {
      background: linear-gradient(to bottom right, rgba(26, 32, 44, 0.8), rgba(45, 55, 72, 0.8));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(74, 85, 104, 0.3);
    }
    
    .personalization-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .personalization-icon {
      font-size: 2.5rem;
      color: #4299e1;
      margin-right: 1rem;
    }
    
    .personalization-title h2 {
      color: white;
      margin-bottom: 0.3rem;
    }
    
    .personalization-title p {
      color: #a0aec0;
      font-size: 0.9rem;
    }
    
    .profile-summary {
      background: rgba(45, 55, 72, 0.6);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .profile-summary h3 {
      color: white;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .profile-overview {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .profile-setting {
      background: rgba(26, 32, 44, 0.6);
      border-radius: 8px;
      padding: 1rem;
    }
    
    .setting-label {
      color: #a0aec0;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .setting-value {
      color: white;
      font-weight: 500;
    }
    
    .profile-loading {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #a0aec0;
      font-style: italic;
      width: 100%;
      justify-content: center;
      padding: 1rem;
    }
    
    .preference-editor {
      background: rgba(45, 55, 72, 0.6);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .preference-editor h3 {
      color: white;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .preference-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(74, 85, 104, 0.3);
      padding-bottom: 1rem;
    }
    
    .preference-category {
      background: rgba(26, 32, 44, 0.4);
      color: #a0aec0;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .preference-category:hover {
      background: rgba(26, 32, 44, 0.6);
      color: white;
    }
    
    .preference-category.active {
      background: #4299e1;
      color: white;
    }
    
    .preference-options {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .preference-option {
      background: rgba(26, 32, 44, 0.4);
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 2px solid transparent;
    }
    
    .preference-option:hover {
      background: rgba(26, 32, 44, 0.6);
    }
    
    .preference-option.selected {
      border-color: #4299e1;
      background: rgba(66, 153, 225, 0.2);
    }
    
    .option-name {
      color: white;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .option-description {
      color: #a0aec0;
      font-size: 0.85rem;
    }
    
    .interest-selector {
      background: rgba(45, 55, 72, 0.6);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .interest-selector h3 {
      color: white;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    
    .interest-selector p {
      color: #a0aec0;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    
    .interest-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .interest-category {
      position: relative;
    }
    
    .interest-category-btn {
      background: rgba(26, 32, 44, 0.4);
      color: #cbd5e0;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .interest-category-btn:hover {
      background: rgba(26, 32, 44, 0.6);
    }
    
    .interest-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 10;
      background: #2d3748;
      border-radius: 4px;
      border: 1px solid #4a5568;
      width: 200px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: none;
    }
    
    .interest-category.open .interest-dropdown {
      display: block;
    }
    
    .interest-subcategory {
      padding: 0.5rem 1rem;
      color: #cbd5e0;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .interest-subcategory:hover {
      background: #4a5568;
    }
    
    .interest-subcategory input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
    
    .interest-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      min-height: 2.5rem;
    }
    
    .interest-tag {
      background: rgba(66, 153, 225, 0.2);
      color: #4299e1;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .tag-remove {
      cursor: pointer;
      font-size: 0.75rem;
      opacity: 0.7;
    }
    
    .tag-remove:hover {
      opacity: 1;
    }
    
    .no-interests {
      color: #a0aec0;
      font-style: italic;
      width: 100%;
      text-align: center;
      padding: 0.5rem;
    }
    
    .personalization-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .save-button, .reset-button {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      border: none;
      transition: all 0.2s ease;
    }
    
    .save-button {
      background: #4299e1;
      color: white;
    }
    
    .save-button:hover {
      background: #3182ce;
    }
    
    .reset-button {
      background: rgba(26, 32, 44, 0.4);
      color: #cbd5e0;
      border: 1px solid rgba(74, 85, 104, 0.5);
    }
    
    .reset-button:hover {
      background: rgba(26, 32, 44, 0.6);
    }
    
    .personalization-insights {
      background: rgba(45, 55, 72, 0.6);
      border-radius: 8px;
      padding: 1.5rem;
    }
    
    .personalization-insights h3 {
      color: white;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    
    .personalization-insights p {
      color: #a0aec0;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    
    .insights-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .insight-item {
      background: rgba(26, 32, 44, 0.4);
      border-radius: 8px;
      padding: 1rem;
    }
    
    .insight-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .insight-title i {
      color: #4299e1;
    }
    
    .insight-description {
      color: #a0aec0;
      font-size: 0.9rem;
    }
    
    .no-insights {
      color: #a0aec0;
      font-style: italic;
      text-align: center;
      padding: 1rem;
    }
  `,
  
  // Initialize the mode
  init: function() {
    console.log('Initializing AI Personalization Mode');
    
    // Initialize user profile
    this.userProfile = this.loadUserProfile() || { ...this.defaultUserProfile };
    
    // Add the mode's CSS to the document
    this.addStyles();
    
    // If the mode's special interface container exists, render the interface
    const modeContainer = document.getElementById('modeSpecificUI');
    if (modeContainer) {
      this.renderUI(modeContainer);
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
    
    // Populate the interface with user profile data
    this.updateProfileOverview(container);
    this.showPreferenceOptions(container, 'communicationStyle');
    this.populateInterestCategories(container);
    this.updateInterestTags(container);
    this.populateInsights(container);
    
    // Add event listeners
    this.addEventListeners(container);
  },
  
  // Load user profile from storage
  loadUserProfile: function() {
    try {
      const savedProfile = localStorage.getItem('jaat_user_profile');
      return savedProfile ? JSON.parse(savedProfile) : null;
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }
  },
  
  // Save user profile to storage
  saveUserProfile: function() {
    try {
      localStorage.setItem('jaat_user_profile', JSON.stringify(this.userProfile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  },
  
  // Update the profile overview section
  updateProfileOverview: function(container) {
    const profileOverview = container.querySelector('#profile-overview');
    if (!profileOverview) return;
    
    profileOverview.innerHTML = '';
    
    // Communication Style
    this.addProfileSetting(profileOverview, 'Communication Style', this.getPreferenceDisplayName('communicationStyle', this.userProfile.preferences.communicationStyle));
    
    // Knowledge Depth
    this.addProfileSetting(profileOverview, 'Knowledge Depth', this.getPreferenceDisplayName('knowledgeDepth', this.userProfile.preferences.knowledgeDepth));
    
    // Response Length
    this.addProfileSetting(profileOverview, 'Response Length', this.getPreferenceDisplayName('responseLength', this.userProfile.preferences.responseLength));
    
    // Interaction Style
    this.addProfileSetting(profileOverview, 'Interaction Style', this.getPreferenceDisplayName('interactionStyle', this.userProfile.preferences.interactionStyle));
    
    // Content Focus
    this.addProfileSetting(profileOverview, 'Content Focus', this.getPreferenceDisplayName('contentFocus', this.userProfile.preferences.contentFocus));
  },
  
  // Add a setting to the profile overview
  addProfileSetting: function(container, label, value) {
    const settingElement = document.createElement('div');
    settingElement.className = 'profile-setting';
    settingElement.innerHTML = `
      <div class="setting-label">${label}</div>
      <div class="setting-value">${value}</div>
    `;
    container.appendChild(settingElement);
  },
  
  // Get display name for a preference option
  getPreferenceDisplayName: function(categoryId, optionId) {
    const category = this.preferenceCategories.find(cat => cat.id === categoryId);
    if (!category) return optionId;
    
    const option = category.options.find(opt => opt.id === optionId);
    return option ? option.name : optionId;
  },
  
  // Show preference options for a category
  showPreferenceOptions: function(container, categoryId) {
    const optionsContainer = container.querySelector('#preference-options');
    if (!optionsContainer) return;
    
    optionsContainer.innerHTML = '';
    
    const category = this.preferenceCategories.find(cat => cat.id === categoryId);
    if (!category) return;
    
    const selectedOption = this.userProfile.preferences[categoryId];
    
    category.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.className = `preference-option ${option.id === selectedOption ? 'selected' : ''}`;
      optionElement.dataset.optionId = option.id;
      optionElement.dataset.categoryId = categoryId;
      
      optionElement.innerHTML = `
        <div class="option-name">${option.name}</div>
        <div class="option-description">${option.description}</div>
      `;
      
      optionElement.addEventListener('click', () => {
        // Remove selected class from all options
        optionsContainer.querySelectorAll('.preference-option').forEach(el => {
          el.classList.remove('selected');
        });
        
        // Add selected class to this option
        optionElement.classList.add('selected');
        
        // Update user profile
        this.userProfile.preferences[categoryId] = option.id;
      });
      
      optionsContainer.appendChild(optionElement);
    });
  },
  
  // Populate interest categories
  populateInterestCategories: function(container) {
    const categoriesContainer = container.querySelector('.interest-categories');
    if (!categoriesContainer) return;
    
    this.interestCategories.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.className = 'interest-category';
      categoryElement.dataset.categoryId = category.id;
      
      categoryElement.innerHTML = `
        <button class="interest-category-btn">
          ${category.name}
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="interest-dropdown">
          ${category.subcategories.map(sub => `
            <div class="interest-subcategory" data-subcategory="${sub}">
              <input type="checkbox" id="interest-${category.id}-${this.slugify(sub)}" 
                ${this.isInterestSelected(category.id, sub) ? 'checked' : ''}>
              <label for="interest-${category.id}-${this.slugify(sub)}">${sub}</label>
            </div>
          `).join('')}
        </div>
      `;
      
      categoriesContainer.appendChild(categoryElement);
      
      // Add click handler for dropdown toggle
      const dropdownToggle = categoryElement.querySelector('.interest-category-btn');
      dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close other dropdowns
        container.querySelectorAll('.interest-category').forEach(cat => {
          if (cat !== categoryElement) {
            cat.classList.remove('open');
          }
        });
        
        // Toggle this dropdown
        categoryElement.classList.toggle('open');
      });
      
      // Add click handlers for subcategories
      const subcategories = categoryElement.querySelectorAll('.interest-subcategory');
      subcategories.forEach(sub => {
        sub.addEventListener('click', (e) => {
          e.stopPropagation();
          
          const checkbox = sub.querySelector('input[type="checkbox"]');
          const subName = sub.dataset.subcategory;
          const isChecked = !checkbox.checked;
          
          checkbox.checked = isChecked;
          
          // Update user profile
          this.toggleInterest(category.id, subName, isChecked);
          
          // Update interest tags
          this.updateInterestTags(container);
        });
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      container.querySelectorAll('.interest-category').forEach(cat => {
        cat.classList.remove('open');
      });
    });
  },
  
  // Update interest tags
  updateInterestTags: function(container) {
    const tagsContainer = container.querySelector('#interest-tags');
    if (!tagsContainer) return;
    
    tagsContainer.innerHTML = '';
    
    if (this.userProfile.interests.length === 0) {
      tagsContainer.innerHTML = '<div class="no-interests">No interests selected yet</div>';
      return;
    }
    
    this.userProfile.interests.forEach(interest => {
      const tagElement = document.createElement('div');
      tagElement.className = 'interest-tag';
      
      tagElement.innerHTML = `
        <span>${interest.subcategory}</span>
        <i class="fas fa-times tag-remove"></i>
      `;
      
      const removeButton = tagElement.querySelector('.tag-remove');
      removeButton.addEventListener('click', () => {
        this.toggleInterest(interest.category, interest.subcategory, false);
        this.updateInterestTags(container);
        
        // Also update checkbox state
        const checkbox = container.querySelector(`#interest-${interest.category}-${this.slugify(interest.subcategory)}`);
        if (checkbox) {
          checkbox.checked = false;
        }
      });
      
      tagsContainer.appendChild(tagElement);
    });
  },
  
  // Populate insights
  populateInsights: function(container) {
    const insightsContainer = container.querySelector('#insights-container');
    if (!insightsContainer) return;
    
    // For a new profile, just show the default message
    if (!this.hasInteractionHistory()) {
      insightsContainer.innerHTML = `
        <div class="no-insights">
          Insights will appear as you interact more with JAAT-AI
        </div>
      `;
      return;
    }
    
    // Generate insights based on interaction history
    const insights = this.generateInsights();
    insightsContainer.innerHTML = '';
    
    insights.forEach(insight => {
      const insightElement = document.createElement('div');
      insightElement.className = 'insight-item';
      
      insightElement.innerHTML = `
        <div class="insight-title">
          <i class="fas ${insight.icon}"></i>
          <span>${insight.title}</span>
        </div>
        <div class="insight-description">${insight.description}</div>
      `;
      
      insightsContainer.appendChild(insightElement);
    });
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Preference category selection
    const categoryButtons = container.querySelectorAll('.preference-category');
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active category
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show options for this category
        const categoryId = button.dataset.category;
        this.showPreferenceOptions(container, categoryId);
      });
    });
    
    // Save preferences button
    const saveButton = container.querySelector('#save-preferences');
    if (saveButton) {
      saveButton.addEventListener('click', () => {
        this.saveUserProfile();
        
        // Show save confirmation
        const originalText = saveButton.innerHTML;
        saveButton.innerHTML = '<i class="fas fa-check"></i> Preferences Saved';
        
        setTimeout(() => {
          saveButton.innerHTML = originalText;
        }, 2000);
        
        // Update profile overview
        this.updateProfileOverview(container);
        
        // Ask AI to acknowledge the preferences
        this.acknowledgePreferences();
      });
    }
    
    // Reset preferences button
    const resetButton = container.querySelector('#reset-preferences');
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all personalization settings to default?')) {
          this.userProfile = { ...this.defaultUserProfile };
          this.saveUserProfile();
          
          // Update UI
          this.updateProfileOverview(container);
          this.showPreferenceOptions(container, 'communicationStyle');
          this.updateInterestTags(container);
          
          // Update checkboxes
          container.querySelectorAll('.interest-subcategory input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
          });
          
          // Update active tabs
          container.querySelectorAll('.preference-category').forEach(cat => {
            cat.classList.remove('active');
          });
          container.querySelector('.preference-category[data-category="communicationStyle"]').classList.add('active');
          
          // Ask AI to acknowledge the reset
          this.acknowledgeReset();
        }
      });
    }
  },
  
  // Check if an interest is selected
  isInterestSelected: function(categoryId, subcategory) {
    return this.userProfile.interests.some(
      interest => interest.category === categoryId && interest.subcategory === subcategory
    );
  },
  
  // Toggle an interest
  toggleInterest: function(categoryId, subcategory, isSelected) {
    if (isSelected) {
      // Add interest if it doesn't exist
      if (!this.isInterestSelected(categoryId, subcategory)) {
        this.userProfile.interests.push({
          category: categoryId,
          subcategory: subcategory
        });
      }
    } else {
      // Remove interest if it exists
      this.userProfile.interests = this.userProfile.interests.filter(
        interest => !(interest.category === categoryId && interest.subcategory === subcategory)
      );
    }
  },
  
  // Convert string to slug
  slugify: function(text) {
    return text.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  },
  
  // Check if user has interaction history
  hasInteractionHistory: function() {
    const history = this.userProfile.conversationHistory;
    return Object.keys(history.topicFrequency).length > 0 || 
           Object.keys(history.interactionPatterns).length > 0 ||
           Object.keys(history.explicitPreferences).length > 0;
  },
  
  // Generate insights based on user profile
  generateInsights: function() {
    // This would normally analyze real user data
    // For demo purposes, we'll return placeholder insights
    return [
      {
        icon: 'fa-comments',
        title: 'Communication Style',
        description: 'Based on our conversations, you seem to prefer detailed explanations with technical details. I\'ll continue providing comprehensive responses.'
      },
      {
        icon: 'fa-lightbulb',
        title: 'Topic Interests',
        description: 'You\'ve shown particular interest in technology and science topics. I\'ll prioritize these areas in suggestions and examples.'
      },
      {
        icon: 'fa-clock',
        title: 'Response Timing',
        description: 'You typically engage in longer conversation sessions with multiple follow-up questions. I\'ll provide more comprehensive initial responses.'
      }
    ];
  },
  
  // Send an acknowledgement message about saved preferences
  acknowledgePreferences: function() {
    const message = "Please acknowledge and apply my new personalization preferences.";
    this.sendMessageToAI(message);
  },
  
  // Send an acknowledgement message about reset preferences
  acknowledgeReset: function() {
    const message = "I've reset my personalization preferences to default. Please acknowledge this change.";
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
    AIPersonalizationMode.init();
  } else {
    window.addEventListener('load', function() {
      AIPersonalizationMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIPersonalizationMode;
} else {
  window.AIPersonalizationMode = AIPersonalizationMode;
}
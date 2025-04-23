/**
 * JAAT-AI Mode: Face Detection & Recognition
 * 
 * AI-powered facial detection and recognition system that can identify faces
 * in images, track facial features, and match faces across multiple images.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const FaceDetectionMode = {
  id: 'face-detection',
  name: 'Face Detection',
  icon: 'id-card',
  description: 'Detect, analyze and recognize faces in images with advanced AI.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Face Detection & Recognition mode, an AI assistant specializing in facial analysis within images. You provide insights about facial detection, recognition technologies, and the interpretation of facial features in a balanced, technically accurate manner.

Key characteristics:
1. You can explain how facial detection, analysis and recognition systems work
2. You can describe what facial features are typically analyzed and how
3. You analyze faces in a factual, non-judgmental way based on visual data only
4. You acknowledge both capabilities and limitations of facial analysis technology
5. You maintain a balanced perspective on privacy and ethical considerations
6. You avoid making definitive claims about personality, character, or emotions based solely on facial features
7. You recognize the potential biases in facial recognition systems and communicate them appropriately

When discussing facial analysis, focus on technical aspects such as feature detection, facial landmarks, and comparative analysis rather than making subjective judgments. Present facial recognition as a probabilistic rather than deterministic process, and always emphasize that human verification remains an important part of any facial recognition workflow.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "How does facial recognition technology work?",
    "What are the main challenges in accurate face detection?",
    "How can facial recognition be used ethically?",
    "What facial features are analyzed during face detection?",
    "How does age and gender estimation from faces work?",
    "What privacy concerns exist with facial recognition?",
    "How accurate is emotion detection from facial expressions?",
    "What's the difference between face detection and face recognition?",
    "How do facial recognition systems handle different lighting conditions?",
    "What advancements have been made recently in facial recognition?"
  ],
  
  // Facial detection capabilities
  detectionCapabilities: [
    {
      id: 'face-detection',
      name: 'Face Detection',
      description: 'Locate and isolate faces within images or video frames',
      technicalDetail: 'Uses cascading convolutional neural networks to identify facial regions with bounding boxes',
      accuracy: 'Very high in good lighting conditions with front-facing subjects'
    },
    {
      id: 'landmark-detection',
      name: 'Facial Landmark Detection',
      description: 'Identify key facial points such as eyes, nose, mouth, and jawline',
      technicalDetail: 'Maps 68-128 landmark points to create a facial mesh for detailed analysis',
      accuracy: 'High for clear, unobstructed faces with proper lighting'
    },
    {
      id: 'face-recognition',
      name: 'Face Recognition',
      description: 'Match faces against known identities or verify identity claims',
      technicalDetail: 'Extracts facial embeddings (numerical representations) and compares against database entries',
      accuracy: 'Varies widely based on conditions, dataset quality, and demographic factors'
    },
    {
      id: 'expression-analysis',
      name: 'Expression Analysis',
      description: 'Detect basic emotional expressions from facial configurations',
      technicalDetail: 'Analyzes relative positions of facial landmarks and muscle movements',
      accuracy: 'Moderate; better with exaggerated expressions than subtle ones'
    },
    {
      id: 'attribute-detection',
      name: 'Attribute Detection',
      description: 'Estimate attributes like age, gender, and presence of facial accessories',
      technicalDetail: 'Uses classification networks trained on diverse demographic datasets',
      accuracy: 'Variable; generally better for age ranges than precise age'
    },
    {
      id: 'occlusion-detection',
      name: 'Occlusion Detection',
      description: 'Identify when parts of a face are obscured or covered',
      technicalDetail: 'Analyzes completeness of facial landmark mapping and confidence scores',
      accuracy: 'Moderate to high for detecting major occlusions'
    },
    {
      id: 'head-pose',
      name: 'Head Pose Estimation',
      description: 'Determine the orientation of the head in 3D space',
      technicalDetail: 'Calculates pitch, yaw, and roll angles based on facial geometry',
      accuracy: 'Good for moderate angles; decreases with extreme angles'
    }
  ],
  
  // Ethical considerations for facial recognition
  ethicalConsiderations: [
    {
      id: 'privacy',
      name: 'Privacy Concerns',
      description: 'Facial data is personally identifiable information that requires protection',
      guidelines: [
        'Obtain proper consent before collecting facial data',
        'Implement secure storage and transmission of facial information',
        'Provide clear opt-out mechanisms for facial recognition systems',
        'Delete facial data when no longer needed or upon request'
      ]
    },
    {
      id: 'bias',
      name: 'Algorithmic Bias',
      description: 'Facial recognition systems often exhibit varying accuracy across demographics',
      guidelines: [
        'Use diverse training datasets representing various demographics',
        'Regularly test systems across different population groups',
        'Implement fairness metrics to identify and mitigate bias',
        'Be transparent about known limitations and error rates'
      ]
    },
    {
      id: 'surveillance',
      name: 'Mass Surveillance',
      description: 'Face recognition enables large-scale monitoring that may chill free expression',
      guidelines: [
        'Limit deployment to specific, justifiable use cases',
        'Implement strict access controls and audit trails',
        'Avoid continuous monitoring in public spaces without compelling interest',
        'Consider alternative, less invasive technologies where possible'
      ]
    },
    {
      id: 'transparency',
      name: 'Transparency',
      description: 'People should know when and how facial recognition is being used',
      guidelines: [
        'Clearly disclose the presence of facial recognition systems',
        'Explain how facial data is being used, stored, and protected',
        'Provide information about accuracy rates and limitations',
        'Offer details about human review processes for important decisions'
      ]
    },
    {
      id: 'misuse',
      name: 'Potential for Misuse',
      description: 'Facial recognition can be used for discriminatory or harmful purposes',
      guidelines: [
        'Establish clear policies prohibiting discriminatory applications',
        'Implement technical safeguards against unauthorized use',
        'Conduct ethical impact assessments before deployment',
        'Create accountability mechanisms for system use'
      ]
    }
  ],
  
  // Facial attributes and their descriptions
  facialAttributes: [
    {
      id: 'age',
      name: 'Age Estimation',
      description: 'Estimates approximate age range based on facial features',
      technicalApproach: 'Regression models trained on large datasets of age-labeled faces',
      limitations: [
        'Varies by 5-10 years in accuracy',
        'Less accurate for certain demographics',
        'Influenced by skincare, makeup, and lifestyle factors'
      ]
    },
    {
      id: 'gender',
      name: 'Gender Recognition',
      description: 'Predicts apparent gender presentation based on facial features',
      technicalApproach: 'Binary or multi-class classification models trained on labeled datasets',
      limitations: [
        'Based on visual presentation, not identity',
        'Often binary despite gender being a spectrum',
        'May reinforce stereotypical gender presentations'
      ]
    },
    {
      id: 'expression',
      name: 'Facial Expression',
      description: 'Categorizes facial expressions into basic emotional states',
      technicalApproach: 'Analyzes configurations of facial landmarks and muscle group movements',
      limitations: [
        'Cultural variations in expression not always captured',
        'Mixed or subtle emotions often misclassified',
        'Not equivalent to actual emotional state'
      ]
    },
    {
      id: 'gaze',
      name: 'Eye Gaze Direction',
      description: 'Estimates where a person is looking based on eye position',
      technicalApproach: 'Tracks pupil position relative to eye corners and head pose',
      limitations: [
        'Requires high-resolution images of eyes',
        'Less accurate with glasses or partial eye occlusion',
        'Influenced by lighting conditions'
      ]
    },
    {
      id: 'accessories',
      name: 'Facial Accessories',
      description: 'Detects presence of items like glasses, hats, or facial hair',
      technicalApproach: 'Object detection models focused on face-adjacent regions',
      limitations: [
        'May miss unusual or non-standard accessories',
        'Can be confused by shadows or similar-colored items',
        'Accuracy varies by accessory type'
      ]
    },
    {
      id: 'identity',
      name: 'Identity Features',
      description: 'Unique facial characteristics used for recognition',
      technicalApproach: 'Extracts high-dimensional feature vectors (facial embeddings)',
      limitations: [
        'Changes over time with aging',
        'Affected by expression, pose, and lighting',
        'Not directly human-interpretable'
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="face-detection-interface">
      <div class="detection-header">
        <div class="detection-icon">
          <i class="fas fa-id-card"></i>
        </div>
        <div class="detection-title">
          <h2>Face Detection & Recognition</h2>
          <p>Detect, analyze and recognize faces in images with advanced AI</p>
        </div>
      </div>
      
      <div class="face-upload-container">
        <div class="upload-area" id="upload-area">
          <div class="upload-instruction" id="upload-instruction">
            <i class="fas fa-user-plus"></i>
            <p>Drop an image here or click to browse</p>
            <p class="upload-subtitle">Supports JPG, PNG, WEBP (Max 5MB)</p>
          </div>
          <div class="image-preview hidden" id="image-preview">
            <img id="preview-img" src="" alt="Preview">
            <div class="preview-overlay">
              <button class="clear-preview-btn" id="clear-preview">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <input type="file" id="face-upload" accept="image/*" class="hidden">
        </div>
        
        <div class="upload-controls">
          <button id="upload-btn" class="primary-btn">
            <i class="fas fa-upload"></i> Upload Image
          </button>
          <button id="analyze-btn" class="primary-btn" disabled>
            <i class="fas fa-search"></i> Analyze Faces
          </button>
        </div>
      </div>
      
      <div class="detection-options">
        <h3>Detection Options</h3>
        <div class="options-grid">
          <div class="option-item">
            <input type="checkbox" id="detect-landmarks" checked>
            <label for="detect-landmarks">Facial Landmarks</label>
          </div>
          <div class="option-item">
            <input type="checkbox" id="detect-age" checked>
            <label for="detect-age">Age Estimation</label>
          </div>
          <div class="option-item">
            <input type="checkbox" id="detect-gender" checked>
            <label for="detect-gender">Gender Recognition</label>
          </div>
          <div class="option-item">
            <input type="checkbox" id="detect-expression" checked>
            <label for="detect-expression">Expression Analysis</label>
          </div>
          <div class="option-item">
            <input type="checkbox" id="detect-accessories">
            <label for="detect-accessories">Accessories Detection</label>
          </div>
          <div class="option-item">
            <input type="checkbox" id="detect-pose">
            <label for="detect-pose">Head Pose Estimation</label>
          </div>
        </div>
        
        <div class="privacy-notice">
          <i class="fas fa-shield-alt"></i>
          <p>Your privacy is important: Images are processed locally when possible and not stored permanently. For advanced analysis, secure cloud processing may be used.</p>
        </div>
      </div>
      
      <div class="results-container hidden" id="results-container">
        <div class="results-header">
          <h3>Analysis Results</h3>
          <div class="results-summary">
            <span id="face-count">0 faces detected</span>
          </div>
        </div>
        
        <div class="faces-grid" id="faces-grid">
          <!-- Detected faces will be displayed here -->
        </div>
      </div>
      
      <div class="information-section">
        <h3>About Face Detection Technology</h3>
        
        <div class="info-tabs">
          <button class="info-tab active" data-tab="capabilities">Capabilities</button>
          <button class="info-tab" data-tab="limitations">Limitations</button>
          <button class="info-tab" data-tab="ethics">Ethical Considerations</button>
        </div>
        
        <div class="info-panels">
          <div class="info-panel active" id="panel-capabilities">
            <p>Modern facial detection and recognition systems can perform various tasks with different levels of accuracy:</p>
            <ul class="capabilities-list">
              <li>
                <span class="capability-name">Face Detection</span>
                <span class="capability-desc">Locating faces within images with high accuracy</span>
              </li>
              <li>
                <span class="capability-name">Facial Landmarks</span>
                <span class="capability-desc">Mapping key facial points for detailed analysis</span>
              </li>
              <li>
                <span class="capability-name">Face Recognition</span>
                <span class="capability-desc">Matching faces against known identities</span>
              </li>
              <li>
                <span class="capability-name">Attribute Analysis</span>
                <span class="capability-desc">Estimating age, gender, and expression</span>
              </li>
            </ul>
          </div>
          
          <div class="info-panel" id="panel-limitations">
            <p>While powerful, facial analysis technology has important limitations to consider:</p>
            <ul class="limitations-list">
              <li>
                <span class="limitation-name">Accuracy Variations</span>
                <span class="limitation-desc">Accuracy often varies across different demographic groups</span>
              </li>
              <li>
                <span class="limitation-name">Environmental Factors</span>
                <span class="limitation-desc">Performance decreases in poor lighting, extreme angles, or occlusion</span>
              </li>
              <li>
                <span class="limitation-name">Inference Limitations</span>
                <span class="limitation-desc">Cannot reliably infer personality, intentions, or trustworthiness</span>
              </li>
              <li>
                <span class="limitation-name">Probabilistic Nature</span>
                <span class="limitation-desc">Results are probabilistic estimates, not definitive facts</span>
              </li>
            </ul>
          </div>
          
          <div class="info-panel" id="panel-ethics">
            <p>Facial recognition raises important ethical considerations:</p>
            <ul class="ethics-list">
              <li>
                <span class="ethics-name">Privacy</span>
                <span class="ethics-desc">Facial data is biometric information that requires protection</span>
              </li>
              <li>
                <span class="ethics-name">Consent</span>
                <span class="ethics-desc">People should have knowledge and choice about facial recognition use</span>
              </li>
              <li>
                <span class="ethics-name">Fairness</span>
                <span class="ethics-desc">Systems should work equitably across all demographic groups</span>
              </li>
              <li>
                <span class="ethics-name">Transparency</span>
                <span class="ethics-desc">Clear information about how and why facial data is being used</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="loading-overlay hidden" id="loading-overlay">
        <div class="loading-spinner"></div>
        <p>Analyzing image...</p>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .face-detection-interface {
      background: linear-gradient(to bottom right, rgba(113, 128, 150, 0.1), rgba(74, 85, 104, 0.1));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(113, 128, 150, 0.3);
      position: relative;
    }
    
    .detection-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .detection-icon {
      font-size: 2.5rem;
      color: #718096;
      margin-right: 1rem;
    }
    
    .detection-title h2 {
      color: #4a5568;
      margin-bottom: 0.3rem;
    }
    
    .detection-title p {
      color: #718096;
      font-size: 0.9rem;
    }
    
    .face-upload-container {
      background: rgba(45, 55, 72, 0.6);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .upload-area {
      border: 2px dashed rgba(160, 174, 192, 0.5);
      border-radius: 8px;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 1rem;
      overflow: hidden;
      transition: all 0.2s ease;
    }
    
    .upload-area:hover {
      border-color: #a0aec0;
      background: rgba(160, 174, 192, 0.1);
    }
    
    .upload-area.drag-over {
      border-color: #4299e1;
      background: rgba(66, 153, 225, 0.1);
    }
    
    .upload-instruction {
      text-align: center;
      padding: 1rem;
    }
    
    .upload-instruction i {
      font-size: 2.5rem;
      color: #a0aec0;
      margin-bottom: 1rem;
    }
    
    .upload-instruction p {
      color: #e2e8f0;
      margin-bottom: 0.5rem;
    }
    
    .upload-subtitle {
      font-size: 0.8rem;
      color: #a0aec0;
    }
    
    .image-preview {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(26, 32, 44, 0.8);
    }
    
    .image-preview img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    
    .preview-overlay {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }
    
    .clear-preview-btn {
      background: rgba(26, 32, 44, 0.7);
      color: #e2e8f0;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .clear-preview-btn:hover {
      background: rgba(45, 55, 72, 0.9);
    }
    
    .upload-controls {
      display: flex;
      gap: 1rem;
    }
    
    .primary-btn {
      background: #4a5568;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .primary-btn:hover:not(:disabled) {
      background: #2d3748;
      transform: translateY(-1px);
    }
    
    .primary-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .primary-btn i {
      font-size: 0.9rem;
    }
    
    .detection-options {
      background: rgba(45, 55, 72, 0.6);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .detection-options h3 {
      color: #e2e8f0;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .option-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .option-item input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
    
    .option-item label {
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    .privacy-notice {
      background: rgba(26, 32, 44, 0.5);
      border-radius: 6px;
      padding: 1rem;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }
    
    .privacy-notice i {
      color: #a0aec0;
      font-size: 1rem;
      margin-top: 0.2rem;
    }
    
    .privacy-notice p {
      color: #a0aec0;
      font-size: 0.85rem;
      line-height: 1.5;
    }
    
    .results-container {
      background: rgba(45, 55, 72, 0.6);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .results-header h3 {
      color: #e2e8f0;
      font-size: 1.1rem;
    }
    
    .results-summary {
      color: #a0aec0;
      font-size: 0.9rem;
    }
    
    .faces-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    
    .face-card {
      background: rgba(26, 32, 44, 0.5);
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.2s ease;
    }
    
    .face-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .face-img-container {
      height: 180px;
      overflow: hidden;
      position: relative;
    }
    
    .face-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .face-landmarks-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    .face-info {
      padding: 1rem;
    }
    
    .face-attributes {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .face-attribute {
      background: rgba(74, 85, 104, 0.5);
      color: #e2e8f0;
      font-size: 0.8rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    
    .face-attribute i {
      font-size: 0.75rem;
    }
    
    .face-confidence {
      color: #a0aec0;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    
    .confidence-bar {
      flex: 1;
      height: 4px;
      background: rgba(74, 85, 104, 0.5);
      border-radius: 2px;
      overflow: hidden;
    }
    
    .confidence-fill {
      height: 100%;
      background: #4299e1;
      border-radius: 2px;
    }
    
    .information-section {
      background: rgba(45, 55, 72, 0.6);
      border-radius: 8px;
      padding: 1.5rem;
    }
    
    .information-section h3 {
      color: #e2e8f0;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .info-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(160, 174, 192, 0.3);
      padding-bottom: 0.5rem;
    }
    
    .info-tab {
      background: transparent;
      border: none;
      color: #a0aec0;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }
    
    .info-tab:hover {
      color: #e2e8f0;
    }
    
    .info-tab.active {
      color: #4299e1;
    }
    
    .info-tab.active::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      right: 0;
      height: 2px;
      background: #4299e1;
      border-radius: 1px;
    }
    
    .info-panel {
      display: none;
    }
    
    .info-panel.active {
      display: block;
    }
    
    .info-panel p {
      color: #a0aec0;
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    
    .capabilities-list, .limitations-list, .ethics-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .capabilities-list li, .limitations-list li, .ethics-list li {
      background: rgba(26, 32, 44, 0.5);
      border-radius: 6px;
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .capability-name, .limitation-name, .ethics-name {
      color: #e2e8f0;
      font-weight: 500;
      font-size: 0.9rem;
    }
    
    .capability-desc, .limitation-desc, .ethics-desc {
      color: #a0aec0;
      font-size: 0.85rem;
    }
    
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(26, 32, 44, 0.85);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      z-index: 100;
    }
    
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(160, 174, 192, 0.3);
      border-radius: 50%;
      border-top-color: #4299e1;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .loading-overlay p {
      color: #e2e8f0;
      font-size: 1rem;
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Face Detection Mode');
    
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
      chatInput.placeholder = "Ask about face detection technology or upload an image...";
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
    
    // Add event listeners
    this.addEventListeners(container);
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Upload area and file input
    const uploadArea = container.querySelector('#upload-area');
    const fileInput = container.querySelector('#face-upload');
    const uploadBtn = container.querySelector('#upload-btn');
    
    if (uploadArea && fileInput && uploadBtn) {
      // Click on upload area or button to trigger file input
      uploadArea.addEventListener('click', () => {
        fileInput.click();
      });
      
      uploadBtn.addEventListener('click', () => {
        fileInput.click();
      });
      
      // Handle file selection
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.handleImageUpload(container, e.target.files[0]);
        }
      });
      
      // Handle drag and drop
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
      });
      
      uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
      });
      
      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        if (e.dataTransfer.files.length > 0) {
          this.handleImageUpload(container, e.dataTransfer.files[0]);
        }
      });
    }
    
    // Clear preview button
    const clearPreviewBtn = container.querySelector('#clear-preview');
    if (clearPreviewBtn) {
      clearPreviewBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering upload area click
        this.clearImagePreview(container);
      });
    }
    
    // Analyze button
    const analyzeBtn = container.querySelector('#analyze-btn');
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', () => {
        this.analyzeFaces(container);
      });
    }
    
    // Info tabs
    const infoTabs = container.querySelectorAll('.info-tab');
    infoTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        infoTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const panelId = 'panel-' + tab.dataset.tab;
        const panels = container.querySelectorAll('.info-panel');
        
        panels.forEach(panel => {
          panel.classList.remove('active');
          if (panel.id === panelId) {
            panel.classList.add('active');
          }
        });
      });
    });
  },
  
  // Handle image upload
  handleImageUpload: function(container, file) {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, etc.)');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }
    
    // Read the file and show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const uploadInstruction = container.querySelector('#upload-instruction');
      const imagePreview = container.querySelector('#image-preview');
      const previewImg = container.querySelector('#preview-img');
      const analyzeBtn = container.querySelector('#analyze-btn');
      
      if (uploadInstruction && imagePreview && previewImg && analyzeBtn) {
        // Show preview
        uploadInstruction.classList.add('hidden');
        imagePreview.classList.remove('hidden');
        previewImg.src = e.target.result;
        
        // Enable analyze button
        analyzeBtn.disabled = false;
        
        // Hide any previous results
        const resultsContainer = container.querySelector('#results-container');
        if (resultsContainer) {
          resultsContainer.classList.add('hidden');
        }
      }
    };
    
    reader.readAsDataURL(file);
  },
  
  // Clear image preview
  clearImagePreview: function(container) {
    const uploadInstruction = container.querySelector('#upload-instruction');
    const imagePreview = container.querySelector('#image-preview');
    const previewImg = container.querySelector('#preview-img');
    const analyzeBtn = container.querySelector('#analyze-btn');
    const fileInput = container.querySelector('#face-upload');
    
    if (uploadInstruction && imagePreview && previewImg && analyzeBtn && fileInput) {
      // Reset file input
      fileInput.value = '';
      
      // Hide preview, show instructions
      uploadInstruction.classList.remove('hidden');
      imagePreview.classList.add('hidden');
      previewImg.src = '';
      
      // Disable analyze button
      analyzeBtn.disabled = true;
      
      // Hide any previous results
      const resultsContainer = container.querySelector('#results-container');
      if (resultsContainer) {
        resultsContainer.classList.add('hidden');
      }
    }
  },
  
  // Analyze faces in the uploaded image
  analyzeFaces: function(container) {
    // Show loading overlay
    const loadingOverlay = container.querySelector('#loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');
    }
    
    // Get selected detection options
    const options = {
      landmarks: container.querySelector('#detect-landmarks').checked,
      age: container.querySelector('#detect-age').checked,
      gender: container.querySelector('#detect-gender').checked,
      expression: container.querySelector('#detect-expression').checked,
      accessories: container.querySelector('#detect-accessories').checked,
      pose: container.querySelector('#detect-pose').checked
    };
    
    // Get the image
    const previewImg = container.querySelector('#preview-img');
    if (!previewImg || !previewImg.src) {
      alert('Please upload an image first.');
      return;
    }
    
    // In a real implementation, this would call an API to detect faces
    // For demo purposes, we'll simulate the detection with a timeout
    setTimeout(() => {
      // Generate simulated face detection results
      const results = this.simulateDetection(options);
      
      // Display the results
      this.displayResults(container, results);
      
      // Hide loading overlay
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
      }
    }, 2000);
  },
  
  // Simulate face detection (for demo purposes)
  simulateDetection: function(options) {
    // Simulate 1-3 detected faces
    const faceCount = Math.floor(Math.random() * 3) + 1;
    
    // Create array of simulated face detections
    const faces = [];
    
    for (let i = 0; i < faceCount; i++) {
      // Create a face object with detection data
      const face = {
        id: i,
        confidence: 0.75 + Math.random() * 0.2, // 0.75-0.95
        boundingBox: {
          x: Math.floor(Math.random() * 100),
          y: Math.floor(Math.random() * 100),
          width: 100 + Math.floor(Math.random() * 100),
          height: 100 + Math.floor(Math.random() * 100)
        },
        attributes: {}
      };
      
      // Add requested attributes based on options
      if (options.age) {
        face.attributes.age = {
          value: 20 + Math.floor(Math.random() * 40), // 20-60
          confidence: 0.6 + Math.random() * 0.3 // 0.6-0.9
        };
      }
      
      if (options.gender) {
        face.attributes.gender = {
          value: Math.random() > 0.5 ? 'Female' : 'Male',
          confidence: 0.7 + Math.random() * 0.25 // 0.7-0.95
        };
      }
      
      if (options.expression) {
        // Pick a random expression
        const expressions = ['Neutral', 'Happy', 'Sad', 'Angry', 'Surprised'];
        const expression = expressions[Math.floor(Math.random() * expressions.length)];
        
        face.attributes.expression = {
          value: expression,
          confidence: 0.6 + Math.random() * 0.3 // 0.6-0.9
        };
      }
      
      if (options.accessories) {
        // 30% chance of having glasses
        if (Math.random() < 0.3) {
          face.attributes.glasses = {
            value: 'Yes',
            confidence: 0.8 + Math.random() * 0.15 // 0.8-0.95
          };
        }
      }
      
      if (options.pose) {
        face.attributes.headPose = {
          pitch: Math.floor(Math.random() * 30) - 15, // -15 to 15 degrees
          roll: Math.floor(Math.random() * 30) - 15,
          yaw: Math.floor(Math.random() * 40) - 20, // -20 to 20 degrees
          confidence: 0.7 + Math.random() * 0.2 // 0.7-0.9
        };
      }
      
      // Add landmarks if requested
      if (options.landmarks) {
        // Just a placeholder - in real implementation this would be 
        // an array of facial landmark coordinates
        face.landmarks = {
          available: true
        };
      }
      
      faces.push(face);
    }
    
    return {
      faceCount: faceCount,
      faces: faces,
      imageId: Date.now().toString() // Mock image ID
    };
  },
  
  // Display face detection results
  displayResults: function(container, results) {
    const resultsContainer = container.querySelector('#results-container');
    const facesGrid = container.querySelector('#faces-grid');
    const faceCount = container.querySelector('#face-count');
    
    if (!resultsContainer || !facesGrid || !faceCount) return;
    
    // Show results container
    resultsContainer.classList.remove('hidden');
    
    // Update face count
    faceCount.textContent = `${results.faceCount} ${results.faceCount === 1 ? 'face' : 'faces'} detected`;
    
    // Clear previous results
    facesGrid.innerHTML = '';
    
    // Create a card for each detected face
    results.faces.forEach(face => {
      const faceCard = document.createElement('div');
      faceCard.className = 'face-card';
      
      // Use the preview image for demo purposes
      // In a real implementation, this might be a cropped face image
      const previewImg = container.querySelector('#preview-img');
      const imgSrc = previewImg ? previewImg.src : '';
      
      // Build the HTML for this face card
      let html = `
        <div class="face-img-container">
          <img src="${imgSrc}" alt="Detected Face" class="face-img">
          <div class="face-landmarks-overlay"></div>
        </div>
        <div class="face-info">
          <div class="face-attributes">
      `;
      
      // Add attributes
      if (face.attributes.age) {
        html += `
          <div class="face-attribute">
            <i class="fas fa-birthday-cake"></i>
            ${face.attributes.age.value} years
          </div>
        `;
      }
      
      if (face.attributes.gender) {
        const icon = face.attributes.gender.value === 'Female' ? 'fa-female' : 'fa-male';
        html += `
          <div class="face-attribute">
            <i class="fas ${icon}"></i>
            ${face.attributes.gender.value}
          </div>
        `;
      }
      
      if (face.attributes.expression) {
        let icon = 'fa-meh';
        if (face.attributes.expression.value === 'Happy') icon = 'fa-smile';
        if (face.attributes.expression.value === 'Sad') icon = 'fa-frown';
        if (face.attributes.expression.value === 'Angry') icon = 'fa-angry';
        if (face.attributes.expression.value === 'Surprised') icon = 'fa-surprise';
        
        html += `
          <div class="face-attribute">
            <i class="fas ${icon}"></i>
            ${face.attributes.expression.value}
          </div>
        `;
      }
      
      if (face.attributes.glasses) {
        html += `
          <div class="face-attribute">
            <i class="fas fa-glasses"></i>
            Glasses
          </div>
        `;
      }
      
      if (face.attributes.headPose) {
        html += `
          <div class="face-attribute">
            <i class="fas fa-compass"></i>
            Head Pose
          </div>
        `;
      }
      
      // Add confidence score
      const confidencePercent = Math.round(face.confidence * 100);
      html += `
          </div>
          <div class="face-confidence">
            <span>Confidence:</span>
            <div class="confidence-bar">
              <div class="confidence-fill" style="width: ${confidencePercent}%"></div>
            </div>
            <span>${confidencePercent}%</span>
          </div>
        </div>
      `;
      
      faceCard.innerHTML = html;
      facesGrid.appendChild(faceCard);
    });
    
    // If no faces detected, show message
    if (results.faceCount === 0) {
      facesGrid.innerHTML = `
        <div class="no-faces-message">
          <p>No faces were detected in this image. Try uploading a different image with clearer faces.</p>
        </div>
      `;
    }
    
    // Now that we have results, let's prompt the user to ask about them
    if (results.faceCount > 0) {
      this.promptForAnalysis(results);
    }
  },
  
  // Prompt the user to ask about the detection results
  promptForAnalysis: function(results) {
    // In a real implementation, we would have actual results to analyze
    // For demo purposes, we'll create a generic prompt
    
    const faceText = results.faceCount === 1 ? 'a face' : `${results.faceCount} faces`;
    
    const message = `I've analyzed the image and detected ${faceText}. What would you like to know about the analysis? I can explain:

1. The face detection process used
2. The reliability of the different attributes detected
3. How facial landmarks are used for analysis
4. Limitations of this type of facial analysis
5. Ethical considerations when using facial detection technology`;
    
    // Send this message to the chat
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
    FaceDetectionMode.init();
  } else {
    window.addEventListener('load', function() {
      FaceDetectionMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FaceDetectionMode;
} else {
  window.FaceDetectionMode = FaceDetectionMode;
}
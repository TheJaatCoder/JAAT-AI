/**
 * JAAT-AI Mode: Neural Translation
 * 
 * Advanced neural machine translation system that provides accurate,
 * context-aware translations between multiple languages while preserving
 * nuance, idioms, and cultural context.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const NeuralTranslationMode = {
  id: 'neural-translation',
  name: 'Neural Translation',
  icon: 'language',
  description: 'Advanced neural machine translation with context awareness.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Neural Translation mode, an advanced translation assistant specializing in accurate, nuanced, and culturally sensitive translations between languages. You combine neural machine translation techniques with deep cultural and linguistic knowledge.

Key characteristics:
1. You can translate text between a wide range of languages, preserving meaning and nuance
2. You understand cultural contexts and adapt translations accordingly
3. You can explain translation choices, idioms, and cultural references when needed
4. You preserve tone, formality level, and speaker intent across languages
5. You can translate specialized terminology with appropriate domain-specific vocabulary
6. You provide alternative translations when multiple valid interpretations exist
7. You can assist with language learning by explaining grammar and vocabulary

When translating, prioritize accuracy of meaning over literal word-by-word translations. Maintain cultural appropriateness and context, and preserve the original tone and style when possible. When a direct translation isn't possible due to cultural or linguistic differences, explain the adaptation choices made.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "Translate 'I look forward to our collaboration' to Japanese, keeping it formal.",
    "How would you say 'The early bird catches the worm' in Spanish?",
    "Translate this greeting to French: 'Hope you're doing well in these challenging times'",
    "What's the difference between 'te quiero' and 'te amo' in Spanish?",
    "Translate this German text to English: 'Ich habe morgen einen wichtigen Termin'",
    "How do I politely ask for directions in Italian?",
    "Translate this business email to Mandarin Chinese: 'We would like to schedule a meeting next week'",
    "What are some common greeting phrases in Arabic?",
    "Translate this sentence to Russian, maintaining a casual tone: 'Let's meet up for coffee sometime'",
    "How do you express 'thank you very much' in different levels of formality in Japanese?"
  ],
  
  // Supported languages
  supportedLanguages: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'pl', name: 'Polish', nativeName: 'Polski' },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
    { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
    { code: 'da', name: 'Danish', nativeName: 'Dansk' },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
    { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
    { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
    { code: 'th', name: 'Thai', nativeName: 'ไทย' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
    { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
    { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
    { code: 'ro', name: 'Romanian', nativeName: 'Română' }
  ],
  
  // Translation types
  translationTypes: [
    {
      id: 'general',
      name: 'General Text',
      description: 'Everyday language for common communication',
      examples: [
        { source: 'I need to buy groceries.', target: 'Necesito comprar comestibles.', sourceLanguage: 'English', targetLanguage: 'Spanish' },
        { source: 'The weather is nice today.', target: 'Il fait beau aujourd\'hui.', sourceLanguage: 'English', targetLanguage: 'French' }
      ]
    },
    {
      id: 'business',
      name: 'Business & Professional',
      description: 'Formal language for workplace and professional settings',
      examples: [
        { source: 'We look forward to our future collaboration.', target: '我々は今後の協力を楽しみにしております。', sourceLanguage: 'English', targetLanguage: 'Japanese' },
        { source: 'Please find attached the quarterly report.', target: 'Anbei finden Sie den Quartalsbericht.', sourceLanguage: 'English', targetLanguage: 'German' }
      ]
    },
    {
      id: 'technical',
      name: 'Technical & Scientific',
      description: 'Specialized terminology for technical fields',
      examples: [
        { source: 'The algorithm optimizes computing resources through parallel processing.', target: 'Алгоритм оптимизирует вычислительные ресурсы с помощью параллельной обработки.', sourceLanguage: 'English', targetLanguage: 'Russian' },
        { source: 'Quantum entanglement occurs when particles interact in ways that their quantum states cannot be described independently.', target: '量子纠缠发生在粒子以其量子态无法独立描述的方式相互作用时。', sourceLanguage: 'English', targetLanguage: 'Chinese' }
      ]
    },
    {
      id: 'literary',
      name: 'Literary & Creative',
      description: 'Expressive language for creative works',
      examples: [
        { source: 'The morning dew glistened like diamonds on the grass.', target: 'La rosée du matin brillait comme des diamants sur l\'herbe.', sourceLanguage: 'English', targetLanguage: 'French' },
        { source: 'Her laughter echoed through the empty hallways of her memories.', target: 'La sua risata echeggiava nei corridoi vuoti dei suoi ricordi.', sourceLanguage: 'English', targetLanguage: 'Italian' }
      ]
    },
    {
      id: 'idioms',
      name: 'Idioms & Expressions',
      description: 'Cultural sayings and expressions that often don\'t translate literally',
      examples: [
        { source: 'It\'s raining cats and dogs.', target: 'Está lloviendo a cántaros.', sourceLanguage: 'English', targetLanguage: 'Spanish', notes: 'Literal translation would be nonsensical; Spanish uses "It\'s raining pitchers" instead' },
        { source: 'Break a leg!', target: 'Toi toi toi!', sourceLanguage: 'English', targetLanguage: 'German', notes: 'Different expression used to wish good luck in German theater tradition' }
      ]
    },
    {
      id: 'cultural',
      name: 'Cultural References',
      description: 'Content with cultural nuances that require adaptation',
      examples: [
        { source: 'She graduated with honors from an Ivy League school.', target: 'Elle est diplômée avec mention d\'une université prestigieuse américaine.', sourceLanguage: 'English', targetLanguage: 'French', notes: 'The concept of "Ivy League" doesn\'t translate directly and is explained instead' },
        { source: 'We will have a tailgate party before the football game.', target: '私たちはアメリカンフットボールの試合前に駐車場で食事会をします。', sourceLanguage: 'English', targetLanguage: 'Japanese', notes: 'The concept of "tailgate party" needed explanation in Japanese' }
      ]
    }
  ],
  
  // Translation difficulty factors
  difficultyFactors: [
    {
      id: 'syntaxDiff',
      name: 'Syntactical Differences',
      description: 'Variations in sentence structure between languages',
      examples: [
        {
          languages: 'English to Japanese',
          explanation: 'English follows Subject-Verb-Object order while Japanese uses Subject-Object-Verb.',
          example: {
            source: 'I eat sushi',
            literal: 'I sushi eat',
            target: '私は寿司を食べます'
          }
        },
        {
          languages: 'English to German',
          explanation: 'German often places verbs at the end of dependent clauses.',
          example: {
            source: 'I know that he likes pizza',
            literal: 'I know that he pizza likes',
            target: 'Ich weiß, dass er Pizza mag'
          }
        }
      ]
    },
    {
      id: 'culturalConcepts',
      name: 'Cultural Concepts',
      description: 'Ideas that exist in one culture but not another',
      examples: [
        {
          concept: 'Hygge (Danish)',
          explanation: 'A quality of coziness and comfortable conviviality that engenders a feeling of contentment or well-being',
          translation: 'Often kept as "hygge" in English with explanation, or approximated as "coziness" with qualifiers'
        },
        {
          concept: 'Wabi-sabi (Japanese)',
          explanation: 'The acceptance of transience and imperfection; the beauty of impermanence',
          translation: 'Often kept as "wabi-sabi" in English with explanation, as the concept has no direct equivalent'
        }
      ]
    },
    {
      id: 'idiomaticExpressions',
      name: 'Idiomatic Expressions',
      description: 'Phrases whose meanings cannot be derived from the individual words',
      examples: [
        {
          expression: 'to kick the bucket (English)',
          meaning: 'to die',
          equivalent: {
            language: 'Spanish',
            expression: 'estirar la pata',
            literalMeaning: 'to stretch the leg'
          }
        },
        {
          expression: 'avoir le cafard (French)',
          meaning: 'to feel down/depressed',
          equivalent: {
            language: 'English',
            expression: 'to have the blues',
            literalMeaning: 'to feel blue/sad'
          }
        }
      ]
    },
    {
      id: 'genderGrammar',
      name: 'Grammatical Gender',
      description: 'Languages that assign genders to nouns and require agreement',
      examples: [
        {
          languages: 'English to Spanish',
          explanation: 'Spanish assigns gender to nouns and requires adjectives to agree in gender.',
          example: {
            source: 'The red car',
            target: 'El coche rojo (masculine)',
            alternative: 'La bicicleta roja (feminine for "bicycle")'
          }
        },
        {
          languages: 'English to German',
          explanation: 'German uses three grammatical genders: masculine, feminine, and neuter.',
          example: {
            source: 'The book is new',
            target: 'Das Buch ist neu (neuter)',
            notes: 'Article "das" matches the neuter gender of "Buch"'
          }
        }
      ]
    },
    {
      id: 'formalityLevels',
      name: 'Formality Levels',
      description: 'Languages with distinct formal and informal speech forms',
      examples: [
        {
          languages: 'English to Japanese',
          explanation: 'Japanese has complex levels of formality and politeness.',
          example: {
            source: 'How are you?',
            casual: 'お元気？(Genki?)',
            polite: 'お元気ですか？(O-genki desu ka?)',
            formal: 'ご機嫌いかがですか？(Go-kigen ikaga desu ka?)'
          }
        },
        {
          languages: 'English to Korean',
          explanation: 'Korean speech levels indicate social relationship between speakers.',
          example: {
            source: 'Thank you',
            casual: '고마워 (Gomawo)',
            polite: '감사합니다 (Gamsahamnida)',
            formal: '대단히 감사드립니다 (Daedanhi gamsadeurimnida)'
          }
        }
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="neural-translation-interface">
      <div class="translation-header">
        <div class="translation-icon">
          <i class="fas fa-language"></i>
        </div>
        <div class="translation-title">
          <h2>Neural Translation</h2>
          <p>Advanced neural machine translation with context awareness</p>
        </div>
      </div>
      
      <div class="translation-container">
        <div class="language-selector-container">
          <div class="source-language">
            <label for="source-language-select">Translate from:</label>
            <div class="select-container">
              <select id="source-language-select">
                <option value="auto">Detect Language</option>
                <!-- Language options will be populated dynamically -->
              </select>
            </div>
          </div>
          
          <div class="swap-languages">
            <button id="swap-languages-btn">
              <i class="fas fa-exchange-alt"></i>
            </button>
          </div>
          
          <div class="target-language">
            <label for="target-language-select">Translate to:</label>
            <div class="select-container">
              <select id="target-language-select">
                <!-- Language options will be populated dynamically -->
              </select>
            </div>
          </div>
        </div>
        
        <div class="text-areas-container">
          <div class="source-text-container">
            <div class="text-area-header">
              <div class="char-counter">0 / 5000</div>
            </div>
            <textarea id="source-text" placeholder="Enter text to translate..."></textarea>
            <div class="text-actions">
              <button id="clear-source-btn" class="text-action-btn">
                <i class="fas fa-times"></i> Clear
              </button>
              <button id="paste-source-btn" class="text-action-btn">
                <i class="fas fa-paste"></i> Paste
              </button>
              <button id="listen-source-btn" class="text-action-btn">
                <i class="fas fa-volume-up"></i> Listen
              </button>
            </div>
          </div>
          
          <div class="target-text-container">
            <div class="text-area-header">
              <div class="translation-status">Ready for translation</div>
            </div>
            <div id="target-text" class="target-text"></div>
            <div class="text-actions">
              <button id="copy-target-btn" class="text-action-btn">
                <i class="fas fa-copy"></i> Copy
              </button>
              <button id="listen-target-btn" class="text-action-btn">
                <i class="fas fa-volume-up"></i> Listen
              </button>
              <button id="save-translation-btn" class="text-action-btn">
                <i class="fas fa-save"></i> Save
              </button>
            </div>
          </div>
        </div>
        
        <div class="translation-actions">
          <button id="translate-btn" class="primary-btn">
            <i class="fas fa-language"></i> Translate
          </button>
          
          <div class="translation-options">
            <div class="option-item">
              <label for="translation-type">Type:</label>
              <select id="translation-type">
                <option value="general">General</option>
                <option value="business">Business</option>
                <option value="technical">Technical</option>
                <option value="literary">Literary</option>
                <option value="idioms">Idioms</option>
              </select>
            </div>
            
            <div class="option-item">
              <label for="formality-level">Formality:</label>
              <select id="formality-level">
                <option value="auto">Auto</option>
                <option value="formal">Formal</option>
                <option value="neutral">Neutral</option>
                <option value="informal">Informal</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div class="translation-details hidden" id="translation-details">
        <div class="details-header">
          <h3>Translation Details</h3>
          <button id="toggle-details-btn" class="toggle-btn">
            <i class="fas fa-chevron-up"></i>
          </button>
        </div>
        
        <div class="details-content">
          <div class="details-section">
            <h4>Alternative Translations</h4>
            <div id="alternative-translations" class="alternatives-container">
              <!-- Will be populated with alternatives -->
              <div class="no-alternatives">No alternative translations available</div>
            </div>
          </div>
          
          <div class="details-section">
            <h4>Translation Notes</h4>
            <div id="translation-notes" class="notes-container">
              <!-- Will be populated with notes -->
              <div class="no-notes">No translation notes available</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="translation-guide">
        <div class="guide-header">
          <h3>Translation Guide</h3>
          <button id="toggle-guide-btn" class="toggle-btn">
            <i class="fas fa-chevron-down"></i>
          </button>
        </div>
        
        <div class="guide-content hidden" id="guide-content">
          <div class="guide-tabs">
            <button class="guide-tab active" data-tab="types">Translation Types</button>
            <button class="guide-tab" data-tab="challenges">Translation Challenges</button>
            <button class="guide-tab" data-tab="tips">Tips & Tricks</button>
          </div>
          
          <div class="guide-panel active" id="types-panel">
            <p>Different types of content require different translation approaches:</p>
            <div class="type-cards">
              <!-- Will be populated with translation types -->
            </div>
          </div>
          
          <div class="guide-panel" id="challenges-panel">
            <p>Common challenges in translation between languages:</p>
            <div class="accordion" id="challenges-accordion">
              <!-- Will be populated with difficulty factors -->
            </div>
          </div>
          
          <div class="guide-panel" id="tips-panel">
            <p>Tips for better translations:</p>
            <ul class="tips-list">
              <li>
                <strong>Provide context</strong>: Mention the purpose and audience of your text for more accurate translations
              </li>
              <li>
                <strong>Specify formality level</strong>: Languages like Japanese, Korean, and German have different politeness levels
              </li>
              <li>
                <strong>Use complete sentences</strong>: Partial phrases may be ambiguous and lead to incorrect translations
              </li>
              <li>
                <strong>Review specialized terminology</strong>: Technical fields often have specific vocabulary that may need verification
              </li>
              <li>
                <strong>Consider cultural adaptation</strong>: Some concepts may need explanation or adaptation for the target culture
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="saved-translations hidden" id="saved-translations">
        <div class="saved-header">
          <h3>Saved Translations</h3>
          <button id="clear-saved-btn" class="clear-btn">
            <i class="fas fa-trash"></i> Clear All
          </button>
        </div>
        <div class="saved-translations-list" id="saved-translations-list">
          <!-- Will be populated with saved translations -->
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .neural-translation-interface {
      background: linear-gradient(to bottom right, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.1));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(99, 102, 241, 0.2);
    }
    
    .translation-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .translation-icon {
      font-size: 2.5rem;
      color: #6366f1;
      margin-right: 1rem;
    }
    
    .translation-title h2 {
      color: #6366f1;
      margin-bottom: 0.3rem;
    }
    
    .translation-title p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .translation-container {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .language-selector-container {
      display: flex;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    
    .source-language, .target-language {
      flex: 1;
    }
    
    .source-language label, .target-language label {
      display: block;
      color: #e2e8f0;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .select-container {
      position: relative;
    }
    
    .select-container select {
      width: 100%;
      padding: 0.6rem;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(51, 65, 85, 0.7);
      border-radius: 4px;
      color: #e2e8f0;
      font-size: 0.95rem;
      appearance: none;
      padding-right: 2rem;
    }
    
    .select-container::after {
      content: '\\f078';
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      pointer-events: none;
    }
    
    .swap-languages {
      padding: 0 1rem;
    }
    
    #swap-languages-btn {
      background: rgba(99, 102, 241, 0.2);
      color: #6366f1;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    #swap-languages-btn:hover {
      background: rgba(99, 102, 241, 0.3);
      transform: rotate(180deg);
    }
    
    .text-areas-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .text-areas-container {
        grid-template-columns: 1fr;
      }
    }
    
    .source-text-container, .target-text-container {
      display: flex;
      flex-direction: column;
    }
    
    .text-area-header {
      display: flex;
      justify-content: flex-end;
      padding: 0.5rem;
      font-size: 0.85rem;
      color: #94a3b8;
    }
    
    #source-text {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(51, 65, 85, 0.7);
      border-radius: 4px;
      padding: 1rem;
      min-height: 150px;
      color: #e2e8f0;
      font-size: 1rem;
      line-height: 1.5;
      resize: vertical;
    }
    
    #source-text:focus {
      outline: none;
      border-color: #6366f1;
    }
    
    .target-text {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(51, 65, 85, 0.7);
      border-radius: 4px;
      padding: 1rem;
      min-height: 150px;
      color: #e2e8f0;
      font-size: 1rem;
      line-height: 1.5;
      overflow-y: auto;
    }
    
    .text-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    .text-action-btn {
      background: rgba(30, 41, 59, 0.7);
      color: #cbd5e1;
      border: none;
      padding: 0.4rem 0.75rem;
      border-radius: 4px;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .text-action-btn:hover {
      background: rgba(51, 65, 85, 0.8);
      color: #f1f5f9;
    }
    
    .translation-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .primary-btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .primary-btn:hover {
      background: #4f46e5;
      transform: translateY(-2px);
    }
    
    .primary-btn:disabled {
      background: #6366f1;
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    
    .translation-options {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .option-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .option-item label {
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    .option-item select {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(51, 65, 85, 0.7);
      border-radius: 4px;
      padding: 0.4rem 2rem 0.4rem 0.7rem;
      color: #e2e8f0;
      font-size: 0.9rem;
      appearance: none;
      position: relative;
    }
    
    .translation-details {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      margin-bottom: 1.5rem;
      overflow: hidden;
    }
    
    .details-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      background: rgba(15, 23, 42, 0.4);
    }
    
    .details-header h3 {
      color: #e2e8f0;
      font-size: 1.1rem;
      margin: 0;
    }
    
    .toggle-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 1rem;
      transition: transform 0.3s ease;
    }
    
    .toggle-btn.collapsed i {
      transform: rotate(180deg);
    }
    
    .details-content {
      padding: 1.5rem;
    }
    
    .details-section {
      margin-bottom: 1.5rem;
    }
    
    .details-section:last-child {
      margin-bottom: 0;
    }
    
    .details-section h4 {
      color: #94a3b8;
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
    }
    
    .alternatives-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .alternative-item {
      background: rgba(15, 23, 42, 0.4);
      padding: 0.75rem;
      border-radius: 4px;
      color: #e2e8f0;
      font-size: 0.95rem;
    }
    
    .alternative-item:hover {
      background: rgba(30, 41, 59, 0.6);
    }
    
    .no-alternatives, .no-notes {
      color: #64748b;
      font-style: italic;
      padding: 0.75rem;
      text-align: center;
    }
    
    .notes-container {
      background: rgba(15, 23, 42, 0.4);
      padding: 0.75rem;
      border-radius: 4px;
      color: #e2e8f0;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    .translation-guide {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      margin-bottom: 1.5rem;
      overflow: hidden;
    }
    
    .guide-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      background: rgba(15, 23, 42, 0.4);
    }
    
    .guide-header h3 {
      color: #e2e8f0;
      font-size: 1.1rem;
      margin: 0;
    }
    
    .guide-content {
      padding: 1.5rem;
    }
    
    .guide-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(51, 65, 85, 0.7);
      padding-bottom: 1rem;
    }
    
    .guide-tab {
      background: transparent;
      border: none;
      color: #94a3b8;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 0.95rem;
      border-radius: 4px;
      transition: all 0.2s ease;
    }
    
    .guide-tab:hover {
      background: rgba(30, 41, 59, 0.7);
      color: #e2e8f0;
    }
    
    .guide-tab.active {
      background: rgba(99, 102, 241, 0.2);
      color: #6366f1;
    }
    
    .guide-panel {
      display: none;
    }
    
    .guide-panel.active {
      display: block;
    }
    
    .guide-panel p {
      color: #94a3b8;
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }
    
    .type-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .type-card {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 6px;
      padding: 1rem;
      transition: all 0.2s ease;
    }
    
    .type-card:hover {
      background: rgba(30, 41, 59, 0.6);
    }
    
    .type-card-header {
      color: #e2e8f0;
      font-weight: 500;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    
    .type-card-description {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .type-card-example {
      background: rgba(30, 41, 59, 0.5);
      padding: 0.75rem;
      border-radius: 4px;
      font-size: 0.85rem;
    }
    
    .example-source {
      color: #cbd5e1;
      margin-bottom: 0.3rem;
    }
    
    .example-target {
      color: #6366f1;
    }
    
    .accordion {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .accordion-item {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 6px;
      overflow: hidden;
    }
    
    .accordion-header {
      padding: 1rem;
      background: rgba(30, 41, 59, 0.5);
      color: #e2e8f0;
      font-weight: 500;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .accordion-header i {
      color: #94a3b8;
      transition: transform 0.3s ease;
    }
    
    .accordion-header.active i {
      transform: rotate(180deg);
    }
    
    .accordion-content {
      padding: 1rem;
      color: #cbd5e1;
      font-size: 0.9rem;
      line-height: 1.5;
      display: none;
    }
    
    .accordion-content.active {
      display: block;
    }
    
    .example-block {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 4px;
      padding: 0.75rem;
      margin-top: 0.75rem;
    }
    
    .example-row {
      margin-bottom: 0.5rem;
    }
    
    .example-row:last-child {
      margin-bottom: 0;
    }
    
    .example-label {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 0.2rem;
    }
    
    .example-text {
      color: #e2e8f0;
    }
    
    .tips-list {
      color: #cbd5e1;
      font-size: 0.95rem;
      line-height: 1.6;
      padding-left: 1.5rem;
    }
    
    .tips-list li {
      margin-bottom: 0.75rem;
    }
    
    .tips-list li:last-child {
      margin-bottom: 0;
    }
    
    .tips-list strong {
      color: #e2e8f0;
    }
    
    .saved-translations {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
    }
    
    .saved-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .saved-header h3 {
      color: #e2e8f0;
      font-size: 1.1rem;
      margin: 0;
    }
    
    .clear-btn {
      background: rgba(15, 23, 42, 0.6);
      color: #f87171;
      border: 1px solid rgba(248, 113, 113, 0.2);
      padding: 0.4rem 0.75rem;
      border-radius: 4px;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .clear-btn:hover {
      background: rgba(248, 113, 113, 0.1);
    }
    
    .saved-translations-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .saved-item {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 6px;
      padding: 1rem;
    }
    
    .saved-languages {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .saved-languages-arrow {
      color: #6366f1;
    }
    
    .saved-text {
      display: flex;
      gap: 1rem;
    }
    
    .saved-source, .saved-target {
      flex: 1;
    }
    
    .saved-label {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 0.3rem;
    }
    
    .saved-content {
      color: #e2e8f0;
      font-size: 0.95rem;
      background: rgba(30, 41, 59, 0.5);
      padding: 0.75rem;
      border-radius: 4px;
      max-height: 100px;
      overflow-y: auto;
    }
    
    .saved-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }
    
    .saved-action-btn {
      background: rgba(30, 41, 59, 0.7);
      color: #cbd5e1;
      border: none;
      padding: 0.3rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .saved-action-btn:hover {
      background: rgba(51, 65, 85, 0.8);
      color: #f1f5f9;
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Current translation state
  currentState: {
    sourceLanguage: 'auto',
    targetLanguage: 'en',
    sourceText: '',
    targetText: '',
    translationType: 'general',
    formalityLevel: 'auto',
    translationDetails: null,
    savedTranslations: []
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Neural Translation Mode');
    
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
      chatInput.placeholder = "Ask about translation or enter text to translate...";
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
    
    // Populate language selectors
    this.populateLanguageSelectors(container);
    
    // Populate translation guide
    this.populateTranslationGuide(container);
    
    // Add event listeners
    this.addEventListeners(container);
    
    // Load saved translations if any
    this.loadSavedTranslations(container);
  },
  
  // Populate language selectors with supported languages
  populateLanguageSelectors: function(container) {
    const sourceSelect = container.querySelector('#source-language-select');
    const targetSelect = container.querySelector('#target-language-select');
    
    if (!sourceSelect || !targetSelect) return;
    
    // Default option is already in source select (Detect Language)
    
    // Add languages to both selectors
    this.supportedLanguages.forEach(lang => {
      const sourceOption = document.createElement('option');
      sourceOption.value = lang.code;
      sourceOption.textContent = `${lang.name} (${lang.nativeName})`;
      sourceSelect.appendChild(sourceOption);
      
      const targetOption = document.createElement('option');
      targetOption.value = lang.code;
      targetOption.textContent = `${lang.name} (${lang.nativeName})`;
      targetSelect.appendChild(targetOption);
    });
    
    // Set English as default target language
    targetSelect.value = 'en';
  },
  
  // Populate translation guide with types and challenges
  populateTranslationGuide: function(container) {
    // Populate translation types
    const typeCardsContainer = container.querySelector('.type-cards');
    if (typeCardsContainer) {
      this.translationTypes.forEach(type => {
        // Get a random example from the type
        const example = type.examples[Math.floor(Math.random() * type.examples.length)];
        
        const typeCard = document.createElement('div');
        typeCard.className = 'type-card';
        
        typeCard.innerHTML = `
          <div class="type-card-header">${type.name}</div>
          <div class="type-card-description">${type.description}</div>
          <div class="type-card-example">
            <div class="example-source">${example.source}</div>
            <div class="example-target">${example.target}</div>
          </div>
        `;
        
        typeCardsContainer.appendChild(typeCard);
      });
    }
    
    // Populate translation challenges
    const challengesAccordion = container.querySelector('#challenges-accordion');
    if (challengesAccordion) {
      this.difficultyFactors.forEach((factor, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        
        // Create accordion header
        const header = document.createElement('div');
        header.className = 'accordion-header';
        if (index === 0) header.classList.add('active');
        header.innerHTML = `
          <span>${factor.name}</span>
          <i class="fas fa-chevron-down"></i>
        `;
        
        // Create accordion content
        const content = document.createElement('div');
        content.className = 'accordion-content';
        if (index === 0) content.classList.add('active');
        
        let contentHtml = `<p>${factor.description}</p>`;
        
        // Add examples based on the factor type
        if (factor.examples) {
          factor.examples.forEach(example => {
            contentHtml += `<div class="example-block">`;
            
            if (example.languages) {
              contentHtml += `<div class="example-row">
                <div class="example-label">Languages:</div>
                <div class="example-text">${example.languages}</div>
              </div>`;
            }
            
            if (example.explanation) {
              contentHtml += `<div class="example-row">
                <div class="example-label">Explanation:</div>
                <div class="example-text">${example.explanation}</div>
              </div>`;
            }
            
            if (example.concept) {
              contentHtml += `<div class="example-row">
                <div class="example-label">Concept:</div>
                <div class="example-text">${example.concept}</div>
              </div>`;
            }
            
            if (example.meaning) {
              contentHtml += `<div class="example-row">
                <div class="example-label">Meaning:</div>
                <div class="example-text">${example.meaning}</div>
              </div>`;
            }
            
            if (example.expression) {
              contentHtml += `<div class="example-row">
                <div class="example-label">Expression:</div>
                <div class="example-text">${example.expression}</div>
              </div>`;
            }
            
            if (example.translation) {
              contentHtml += `<div class="example-row">
                <div class="example-label">Translation:</div>
                <div class="example-text">${example.translation}</div>
              </div>`;
            }
            
            if (example.example) {
              contentHtml += `<div class="example-row">
                <div class="example-label">Example:</div>
                <div class="example-text">`;
              
              if (example.example.source) {
                contentHtml += `<strong>Source:</strong> ${example.example.source}<br>`;
              }
              
              if (example.example.target) {
                contentHtml += `<strong>Target:</strong> ${example.example.target}<br>`;
              }
              
              if (example.example.literal) {
                contentHtml += `<strong>Literal:</strong> ${example.example.literal}<br>`;
              }
              
              if (example.example.notes) {
                contentHtml += `<strong>Notes:</strong> ${example.example.notes}`;
              }
              
              contentHtml += `</div></div>`;
            }
            
            if (example.equivalent) {
              contentHtml += `<div class="example-row">
                <div class="example-label">Equivalent in ${example.equivalent.language}:</div>
                <div class="example-text">
                  ${example.equivalent.expression}
                  ${example.equivalent.literalMeaning ? `<br><small>(Literally: ${example.equivalent.literalMeaning})</small>` : ''}
                </div>
              </div>`;
            }
            
            contentHtml += `</div>`;
          });
        }
        
        content.innerHTML = contentHtml;
        
        // Add event listener to toggle accordion
        header.addEventListener('click', function() {
          this.classList.toggle('active');
          content.classList.toggle('active');
        });
        
        // Append header and content to accordion item
        accordionItem.appendChild(header);
        accordionItem.appendChild(content);
        
        // Append accordion item to accordion container
        challengesAccordion.appendChild(accordionItem);
      });
    }
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Source text input
    const sourceTextArea = container.querySelector('#source-text');
    if (sourceTextArea) {
      sourceTextArea.addEventListener('input', (e) => {
        // Update character count
        const charCounter = container.querySelector('.char-counter');
        if (charCounter) {
          const length = e.target.value.length;
          charCounter.textContent = `${length} / 5000`;
          
          // Warn if approaching limit
          if (length > 4900) {
            charCounter.style.color = '#f87171';
          } else {
            charCounter.style.color = '';
          }
        }
        
        // Update current state
        this.currentState.sourceText = e.target.value;
        
        // Enable/disable translate button
        const translateBtn = container.querySelector('#translate-btn');
        if (translateBtn) {
          translateBtn.disabled = e.target.value.trim().length === 0;
        }
      });
    }
    
    // Translate button
    const translateBtn = container.querySelector('#translate-btn');
    if (translateBtn) {
      translateBtn.addEventListener('click', () => {
        this.performTranslation(container);
      });
    }
    
    // Swap languages button
    const swapBtn = container.querySelector('#swap-languages-btn');
    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        this.swapLanguages(container);
      });
    }
    
    // Language selectors
    const sourceSelect = container.querySelector('#source-language-select');
    const targetSelect = container.querySelector('#target-language-select');
    
    if (sourceSelect) {
      sourceSelect.addEventListener('change', (e) => {
        this.currentState.sourceLanguage = e.target.value;
      });
    }
    
    if (targetSelect) {
      targetSelect.addEventListener('change', (e) => {
        this.currentState.targetLanguage = e.target.value;
      });
    }
    
    // Translation type and formality
    const typeSelect = container.querySelector('#translation-type');
    const formalitySelect = container.querySelector('#formality-level');
    
    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        this.currentState.translationType = e.target.value;
      });
    }
    
    if (formalitySelect) {
      formalitySelect.addEventListener('change', (e) => {
        this.currentState.formalityLevel = e.target.value;
      });
    }
    
    // Clear source button
    const clearSourceBtn = container.querySelector('#clear-source-btn');
    if (clearSourceBtn && sourceTextArea) {
      clearSourceBtn.addEventListener('click', () => {
        sourceTextArea.value = '';
        sourceTextArea.dispatchEvent(new Event('input'));
      });
    }
    
    // Paste source button
    const pasteSourceBtn = container.querySelector('#paste-source-btn');
    if (pasteSourceBtn && sourceTextArea) {
      pasteSourceBtn.addEventListener('click', async () => {
        try {
          const text = await navigator.clipboard.readText();
          sourceTextArea.value = text;
          sourceTextArea.dispatchEvent(new Event('input'));
        } catch (err) {
          console.error('Failed to read clipboard:', err);
          // Fallback for browsers that don't support Clipboard API
          sourceTextArea.focus();
          document.execCommand('paste');
        }
      });
    }
    
    // Copy target button
    const copyTargetBtn = container.querySelector('#copy-target-btn');
    const targetText = container.querySelector('#target-text');
    
    if (copyTargetBtn && targetText) {
      copyTargetBtn.addEventListener('click', () => {
        const textToCopy = targetText.textContent;
        if (!textToCopy) return;
        
        try {
          navigator.clipboard.writeText(textToCopy).then(() => {
            // Show success indication
            const originalText = copyTargetBtn.innerHTML;
            copyTargetBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
            
            setTimeout(() => {
              copyTargetBtn.innerHTML = originalText;
            }, 2000);
          });
        } catch (err) {
          console.error('Failed to copy text:', err);
        }
      });
    }
    
    // Save translation button
    const saveTranslationBtn = container.querySelector('#save-translation-btn');
    if (saveTranslationBtn) {
      saveTranslationBtn.addEventListener('click', () => {
        this.saveTranslation(container);
      });
    }
    
    // Clear saved translations button
    const clearSavedBtn = container.querySelector('#clear-saved-btn');
    if (clearSavedBtn) {
      clearSavedBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all saved translations?')) {
          this.currentState.savedTranslations = [];
          this.saveSavedTranslations();
          this.updateSavedTranslations(container);
        }
      });
    }
    
    // Toggle translation details button
    const toggleDetailsBtn = container.querySelector('#toggle-details-btn');
    const detailsContent = container.querySelector('.details-content');
    
    if (toggleDetailsBtn && detailsContent) {
      toggleDetailsBtn.addEventListener('click', () => {
        toggleDetailsBtn.classList.toggle('collapsed');
        
        if (toggleDetailsBtn.classList.contains('collapsed')) {
          detailsContent.style.display = 'none';
          toggleDetailsBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        } else {
          detailsContent.style.display = 'block';
          toggleDetailsBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        }
      });
    }
    
    // Toggle translation guide button
    const toggleGuideBtn = container.querySelector('#toggle-guide-btn');
    const guideContent = container.querySelector('#guide-content');
    
    if (toggleGuideBtn && guideContent) {
      toggleGuideBtn.addEventListener('click', () => {
        guideContent.classList.toggle('hidden');
        
        if (guideContent.classList.contains('hidden')) {
          toggleGuideBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        } else {
          toggleGuideBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        }
      });
    }
    
    // Guide tabs
    const guideTabs = container.querySelectorAll('.guide-tab');
    if (guideTabs.length > 0) {
      guideTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs
          guideTabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Show corresponding panel
          const panelId = `${tab.dataset.tab}-panel`;
          const panels = container.querySelectorAll('.guide-panel');
          
          panels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === panelId) {
              panel.classList.add('active');
            }
          });
        });
      });
    }
    
    // TTS buttons (if browser supports it)
    if ('speechSynthesis' in window) {
      const listenSourceBtn = container.querySelector('#listen-source-btn');
      const listenTargetBtn = container.querySelector('#listen-target-btn');
      
      if (listenSourceBtn && sourceTextArea) {
        listenSourceBtn.addEventListener('click', () => {
          const text = sourceTextArea.value;
          if (!text) return;
          
          const sourceLang = this.currentState.sourceLanguage;
          this.speakText(text, sourceLang);
        });
      }
      
      if (listenTargetBtn && targetText) {
        listenTargetBtn.addEventListener('click', () => {
          const text = targetText.textContent;
          if (!text) return;
          
          const targetLang = this.currentState.targetLanguage;
          this.speakText(text, targetLang);
        });
      }
    } else {
      // Hide TTS buttons if not supported
      const ttsBtns = container.querySelectorAll('.listen-source-btn, .listen-target-btn');
      ttsBtns.forEach(btn => btn.style.display = 'none');
    }
  },
  
  // Perform translation
  performTranslation: function(container) {
    // Get current input text
    const sourceText = this.currentState.sourceText;
    if (!sourceText) return;
    
    // Get language codes
    const sourceLang = this.currentState.sourceLanguage;
    const targetLang = this.currentState.targetLanguage;
    
    // Update status
    const statusElement = container.querySelector('.translation-status');
    if (statusElement) {
      statusElement.textContent = 'Translating...';
    }
    
    // Get additional settings
    const translationType = this.currentState.translationType;
    const formalityLevel = this.currentState.formalityLevel;
    
    // Build a translation request prompt
    let prompt = `Please translate the following text from ${sourceLang === 'auto' ? 'the detected language' : this.getLanguageName(sourceLang)} to ${this.getLanguageName(targetLang)}:\n\n${sourceText}\n\n`;
    
    // Add translation type if specified
    if (translationType !== 'general') {
      const typeObj = this.translationTypes.find(t => t.id === translationType);
      if (typeObj) {
        prompt += `This is ${typeObj.name.toLowerCase()} text. `;
      }
    }
    
    // Add formality level if specified
    if (formalityLevel !== 'auto') {
      prompt += `Please use a ${formalityLevel} tone. `;
    }
    
    // Request explanation if needed
    prompt += `\nPlease provide the translation followed by any necessary notes about cultural nuances, idioms, or translation choices if relevant.`;
    
    // Send the prompt to the AI
    this.sendTranslationPrompt(prompt, container);
  },
  
  // Get language name by code
  getLanguageName: function(code) {
    if (code === 'auto') return 'Auto-detected language';
    
    const language = this.supportedLanguages.find(lang => lang.code === code);
    return language ? language.name : code;
  },
  
  // Swap source and target languages
  swapLanguages: function(container) {
    const sourceSelect = container.querySelector('#source-language-select');
    const targetSelect = container.querySelector('#target-language-select');
    
    if (!sourceSelect || !targetSelect || sourceSelect.value === 'auto') return;
    
    // Get current values
    const sourceValue = sourceSelect.value;
    const targetValue = targetSelect.value;
    
    // Swap values
    sourceSelect.value = targetValue;
    targetSelect.value = sourceValue;
    
    // Update state
    this.currentState.sourceLanguage = targetValue;
    this.currentState.targetLanguage = sourceValue;
    
    // If we have translated text, swap that too
    if (this.currentState.targetText) {
      const sourceTextArea = container.querySelector('#source-text');
      const targetTextElement = container.querySelector('#target-text');
      
      if (sourceTextArea && targetTextElement) {
        const sourceText = sourceTextArea.value;
        const targetText = targetTextElement.textContent;
        
        sourceTextArea.value = targetText;
        sourceTextArea.dispatchEvent(new Event('input'));
        
        // Clear target text - will be updated when user translates again
        targetTextElement.textContent = '';
      }
    }
  },
  
  // Send translation prompt to the AI
  sendTranslationPrompt: function(prompt, container) {
    const chatInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
      chatInput.value = prompt;
      sendButton.click();
      
      // Update UI to show that translation is in progress
      const targetTextElement = container.querySelector('#target-text');
      const statusElement = container.querySelector('.translation-status');
      
      if (targetTextElement) {
        targetTextElement.innerHTML = '<div style="color: #94a3b8; font-style: italic;">Translation will appear in the chat area below...</div>';
      }
      
      if (statusElement) {
        statusElement.textContent = 'Translation sent to JAAT-AI';
      }
    }
  },
  
  // Save the current translation
  saveTranslation: function(container) {
    const sourceText = this.currentState.sourceText;
    const targetText = this.currentState.targetText || container.querySelector('#target-text').textContent;
    
    if (!sourceText || !targetText) return;
    
    const sourceLang = this.currentState.sourceLanguage;
    const targetLang = this.currentState.targetLanguage;
    
    // Create a new saved translation
    const savedTranslation = {
      id: Date.now(),
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      sourceText: sourceText,
      targetText: targetText,
      timestamp: new Date().toISOString()
    };
    
    // Add to saved translations
    this.currentState.savedTranslations.unshift(savedTranslation);
    
    // Limit to 10 saved translations
    if (this.currentState.savedTranslations.length > 10) {
      this.currentState.savedTranslations.pop();
    }
    
    // Save to localStorage
    this.saveSavedTranslations();
    
    // Show the saved translations section
    const savedTranslationsSection = container.querySelector('#saved-translations');
    if (savedTranslationsSection) {
      savedTranslationsSection.classList.remove('hidden');
    }
    
    // Update the saved translations list
    this.updateSavedTranslations(container);
    
    // Show success message
    const saveButton = container.querySelector('#save-translation-btn');
    if (saveButton) {
      const originalText = saveButton.innerHTML;
      saveButton.innerHTML = '<i class="fas fa-check"></i> Saved';
      
      setTimeout(() => {
        saveButton.innerHTML = originalText;
      }, 2000);
    }
  },
  
  // Save translations to localStorage
  saveSavedTranslations: function() {
    try {
      localStorage.setItem('jaat_saved_translations', JSON.stringify(this.currentState.savedTranslations));
    } catch (error) {
      console.error('Error saving translations:', error);
    }
  },
  
  // Load saved translations from localStorage
  loadSavedTranslations: function(container) {
    try {
      const savedTranslations = localStorage.getItem('jaat_saved_translations');
      if (savedTranslations) {
        this.currentState.savedTranslations = JSON.parse(savedTranslations);
        
        // Show the saved translations section if there are saved translations
        if (this.currentState.savedTranslations.length > 0) {
          const savedTranslationsSection = container.querySelector('#saved-translations');
          if (savedTranslationsSection) {
            savedTranslationsSection.classList.remove('hidden');
          }
          
          // Update the saved translations list
          this.updateSavedTranslations(container);
        }
      }
    } catch (error) {
      console.error('Error loading saved translations:', error);
    }
  },
  
  // Update the saved translations list
  updateSavedTranslations: function(container) {
    const savedTranslationsList = container.querySelector('#saved-translations-list');
    if (!savedTranslationsList) return;
    
    // Clear current list
    savedTranslationsList.innerHTML = '';
    
    // Check if there are saved translations
    if (this.currentState.savedTranslations.length === 0) {
      savedTranslationsList.innerHTML = '<div style="color: #94a3b8; font-style: italic; text-align: center; padding: 1rem;">No saved translations yet</div>';
      return;
    }
    
    // Add each saved translation
    this.currentState.savedTranslations.forEach(translation => {
      const savedItem = document.createElement('div');
      savedItem.className = 'saved-item';
      
      // Format languages
      const sourceLanguage = this.getLanguageName(translation.sourceLanguage);
      const targetLanguage = this.getLanguageName(translation.targetLanguage);
      
      savedItem.innerHTML = `
        <div class="saved-languages">
          <span>${sourceLanguage}</span>
          <span class="saved-languages-arrow"><i class="fas fa-long-arrow-alt-right"></i></span>
          <span>${targetLanguage}</span>
        </div>
        <div class="saved-text">
          <div class="saved-source">
            <div class="saved-label">Original:</div>
            <div class="saved-content">${translation.sourceText}</div>
          </div>
          <div class="saved-target">
            <div class="saved-label">Translation:</div>
            <div class="saved-content">${translation.targetText}</div>
          </div>
        </div>
        <div class="saved-actions">
          <button class="saved-action-btn load-saved" data-id="${translation.id}">
            <i class="fas fa-redo"></i> Load
          </button>
          <button class="saved-action-btn delete-saved" data-id="${translation.id}">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      `;
      
      // Add event listeners for buttons
      const loadButton = savedItem.querySelector('.load-saved');
      const deleteButton = savedItem.querySelector('.delete-saved');
      
      if (loadButton) {
        loadButton.addEventListener('click', () => {
          this.loadSavedTranslation(container, translation.id);
        });
      }
      
      if (deleteButton) {
        deleteButton.addEventListener('click', () => {
          this.deleteSavedTranslation(container, translation.id);
        });
      }
      
      savedTranslationsList.appendChild(savedItem);
    });
  },
  
  // Load a saved translation
  loadSavedTranslation: function(container, id) {
    const translation = this.currentState.savedTranslations.find(t => t.id === id);
    if (!translation) return;
    
    // Set source and target languages
    const sourceSelect = container.querySelector('#source-language-select');
    const targetSelect = container.querySelector('#target-language-select');
    
    if (sourceSelect && sourceSelect.value !== translation.sourceLanguage) {
      sourceSelect.value = translation.sourceLanguage;
      this.currentState.sourceLanguage = translation.sourceLanguage;
    }
    
    if (targetSelect && targetSelect.value !== translation.targetLanguage) {
      targetSelect.value = translation.targetLanguage;
      this.currentState.targetLanguage = translation.targetLanguage;
    }
    
    // Set source text
    const sourceTextArea = container.querySelector('#source-text');
    if (sourceTextArea) {
      sourceTextArea.value = translation.sourceText;
      sourceTextArea.dispatchEvent(new Event('input'));
    }
    
    // Set target text
    const targetTextElement = container.querySelector('#target-text');
    if (targetTextElement) {
      targetTextElement.textContent = translation.targetText;
      this.currentState.targetText = translation.targetText;
    }
    
    // Show translation details section
    const detailsSection = container.querySelector('#translation-details');
    if (detailsSection) {
      detailsSection.classList.remove('hidden');
    }
    
    // Update status
    const statusElement = container.querySelector('.translation-status');
    if (statusElement) {
      statusElement.textContent = 'Loaded from saved translations';
    }
    
    // Scroll to the translation container
    const translationContainer = container.querySelector('.translation-container');
    if (translationContainer) {
      translationContainer.scrollIntoView({ behavior: 'smooth' });
    }
  },
  
  // Delete a saved translation
  deleteSavedTranslation: function(container, id) {
    // Remove translation from array
    this.currentState.savedTranslations = this.currentState.savedTranslations.filter(t => t.id !== id);
    
    // Save updated list
    this.saveSavedTranslations();
    
    // Update the displayed list
    this.updateSavedTranslations(container);
    
    // Hide the saved translations section if there are no more saved translations
    if (this.currentState.savedTranslations.length === 0) {
      const savedTranslationsSection = container.querySelector('#saved-translations');
      if (savedTranslationsSection) {
        savedTranslationsSection.classList.add('hidden');
      }
    }
  },
  
  // Text-to-speech functionality
  speakText: function(text, langCode) {
    if (!('speechSynthesis' in window)) return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language if provided and not auto
    if (langCode && langCode !== 'auto') {
      utterance.lang = langCode;
    }
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  }
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    NeuralTranslationMode.init();
  } else {
    window.addEventListener('load', function() {
      NeuralTranslationMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NeuralTranslationMode;
} else {
  window.NeuralTranslationMode = NeuralTranslationMode;
}
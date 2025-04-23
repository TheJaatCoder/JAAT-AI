/**
 * JAAT-AI Feature: Contextual Understanding
 * Version: 1.0.0
 * 
 * This module provides advanced contextual understanding capabilities including:
 * - Conversation history tracking and analysis
 * - Intent recognition with contextual awareness
 * - Entity tracking across conversations
 * - Reference resolution (anaphora, etc.)
 * - Contextual knowledge application
 * - Topic detection and tracking
 * - Context-aware response generation
 */

class ContextualUnderstanding {
  constructor() {
    // Core properties
    this.version = "1.0.0";
    this.initialized = false;
    
    // Context settings
    this.maxHistoryLength = 20; // Maximum conversation turns to remember
    this.memoryDecayRate = 0.9; // How quickly to forget old information (0-1)
    this.contextWindowSize = 10; // How many turns to consider for immediate context
    this.minConfidenceThreshold = 0.6; // Minimum confidence for detected intents/entities
    
    // Features
    this.enableIntentTracking = true;
    this.enableEntityTracking = true;
    this.enableReferenceResolution = true;
    this.enableTopicTracking = true;
    this.enablePersonalization = true;
    this.enableKnowledgeRetrieval = true;
    this.enableEmotionTracking = true;
    
    // Advanced settings
    this.entityMemoryDuration = 100; // How many turns to remember entities
    this.topicShiftThreshold = 0.7; // Threshold for detecting topic shifts (0-1)
    this.intentConfidenceBoost = 0.1; // Boost for contextually relevant intents
    this.prioritizeRecency = true; // Weight recent messages higher
    this.conflictResolutionStrategy = "recency"; // recency, frequency, confidence
    
    // API Keys (should be set securely)
    this.apiKeys = {};
    
    // Internal state
    this._conversationHistory = [];
    this._entityMemory = {};
    this._topicMemory = [];
    this._currentContext = null;
    this._activeTimelines = {};
    this._detectedIntents = [];
    this._listeners = {
      onContextUpdate: [],
      onEntityDetection: [],
      onIntentDetection: [],
      onTopicShift: [],
      onReferenceResolution: []
    };
    
    // NLP models and processors
    this._nlpModels = {};
    this._referenceResolver = null;
    this._intentClassifier = null;
    this._entityRecognizer = null;
    this._topicDetector = null;
    this._knowledgeBase = null;
    this._sentimentAnalyzer = null;
  }
  
  /**
   * Initialize the contextual understanding system
   * @param {Object} options - Configuration options
   * @returns {Promise<boolean>} Success status
   */
  async initialize(options = {}) {
    try {
      console.log("Initializing Contextual Understanding system...");
      
      // Apply custom options
      if (options.maxHistoryLength !== undefined) this.maxHistoryLength = options.maxHistoryLength;
      if (options.memoryDecayRate !== undefined) this.memoryDecayRate = options.memoryDecayRate;
      if (options.contextWindowSize !== undefined) this.contextWindowSize = options.contextWindowSize;
      if (options.minConfidenceThreshold !== undefined) this.minConfidenceThreshold = options.minConfidenceThreshold;
      if (options.enableIntentTracking !== undefined) this.enableIntentTracking = options.enableIntentTracking;
      if (options.enableEntityTracking !== undefined) this.enableEntityTracking = options.enableEntityTracking;
      if (options.enableReferenceResolution !== undefined) this.enableReferenceResolution = options.enableReferenceResolution;
      if (options.enableTopicTracking !== undefined) this.enableTopicTracking = options.enableTopicTracking;
      if (options.enablePersonalization !== undefined) this.enablePersonalization = options.enablePersonalization;
      if (options.enableKnowledgeRetrieval !== undefined) this.enableKnowledgeRetrieval = options.enableKnowledgeRetrieval;
      if (options.enableEmotionTracking !== undefined) this.enableEmotionTracking = options.enableEmotionTracking;
      if (options.entityMemoryDuration !== undefined) this.entityMemoryDuration = options.entityMemoryDuration;
      if (options.topicShiftThreshold !== undefined) this.topicShiftThreshold = options.topicShiftThreshold;
      if (options.intentConfidenceBoost !== undefined) this.intentConfidenceBoost = options.intentConfidenceBoost;
      if (options.prioritizeRecency !== undefined) this.prioritizeRecency = options.prioritizeRecency;
      if (options.conflictResolutionStrategy) this.conflictResolutionStrategy = options.conflictResolutionStrategy;
      if (options.apiKeys) this.apiKeys = {...this.apiKeys, ...options.apiKeys};
      
      // Initialize NLP models and processors
      await this.initializeNLPModels();
      
      // Initialize knowledge base if enabled
      if (this.enableKnowledgeRetrieval) {
        await this.initializeKnowledgeBase();
      }
      
      // Load conversation history if provided
      if (options.conversationHistory) {
        this.loadConversationHistory(options.conversationHistory);
      }
      
      this.initialized = true;
      console.log("Contextual Understanding system initialized successfully.");
      return true;
    } catch (error) {
      console.error("Failed to initialize Contextual Understanding:", error);
      return false;
    }
  }
  
  /**
   * Initialize NLP models and processors
   * @returns {Promise<void>}
   * @private
   */
  async initializeNLPModels() {
    // Initialize models based on enabled features
    
    if (this.enableIntentTracking) {
      this._intentClassifier = {
        detect: async (text, context) => this.detectIntents(text, context),
        getIntentExamples: () => this.getDefaultIntentExamples()
      };
    }
    
    if (this.enableEntityTracking) {
      this._entityRecognizer = {
        extract: async (text, context) => this.extractEntities(text, context),
        getEntityTypes: () => this.getDefaultEntityTypes()
      };
    }
    
    if (this.enableReferenceResolution) {
      this._referenceResolver = {
        resolve: async (text, context) => this.resolveReferences(text, context)
      };
    }
    
    if (this.enableTopicTracking) {
      this._topicDetector = {
        detect: async (text, context) => this.detectTopics(text, context),
        getTopicList: () => this.getDefaultTopics()
      };
    }
    
    if (this.enableEmotionTracking) {
      this._sentimentAnalyzer = {
        analyze: async (text) => this.analyzeSentiment(text)
      };
    }
  }
  
  /**
   * Initialize knowledge base
   * @returns {Promise<void>}
   * @private
   */
  async initializeKnowledgeBase() {
    // In a real implementation, this would load a knowledge base
    // from a database or external source
    this._knowledgeBase = {
      query: async (query, context) => this.queryKnowledge(query, context),
      getFacts: () => this.getDefaultFacts()
    };
  }
  
  /**
   * Process a message with contextual understanding
   * @param {string} text - Message text
   * @param {string} sender - Message sender (user or system)
   * @param {Object} metadata - Additional message metadata
   * @returns {Promise<Object>} Processing result
   */
  async processMessage(text, sender = "user", metadata = {}) {
    if (!this.initialized) {
      throw new Error("Contextual Understanding system not initialized");
    }
    
    if (!text || typeof text !== 'string') {
      throw new Error("Invalid message text");
    }
    
    try {
      // Generate message ID and timestamp
      const messageId = this.generateMessageId();
      const timestamp = metadata.timestamp || Date.now();
      
      // Get current context
      const currentContext = this.getCurrentContext();
      
      // Create message object
      const message = {
        id: messageId,
        text,
        sender,
        timestamp,
        turnIndex: this._conversationHistory.length,
        metadata: { ...metadata }
      };
      
      // Process with NLP
      let intents = [];
      let entities = [];
      let topics = [];
      let sentiment = null;
      let resolvedText = text;
      
      // Resolve references if enabled
      if (this.enableReferenceResolution && this._referenceResolver) {
        const resolution = await this._referenceResolver.resolve(text, currentContext);
        if (resolution.success) {
          resolvedText = resolution.resolvedText;
          message.resolvedText = resolvedText;
          
          // Notify listeners about reference resolution
          this._notifyListeners("onReferenceResolution", {
            original: text,
            resolved: resolvedText,
            references: resolution.references
          });
        }
      }
      
      // Extract and track entities
      if (this.enableEntityTracking && this._entityRecognizer) {
        const extractedEntities = await this._entityRecognizer.extract(resolvedText, currentContext);
        entities = extractedEntities.entities;
        
        // Add entities to message
        message.entities = entities;
        
        // Update entity memory
        if (entities.length > 0) {
          this.updateEntityMemory(entities, message);
          
          // Notify listeners about entity detection
          this._notifyListeners("onEntityDetection", {
            message,
            entities,
            entityMemory: this.getTrackedEntities()
          });
        }
      }
      
      // Detect intents
      if (this.enableIntentTracking && this._intentClassifier) {
        const detectedIntents = await this._intentClassifier.detect(resolvedText, currentContext);
        intents = detectedIntents.intents;
        
        // Add intents to message
        message.intents = intents;
        
        // Add to detected intents history
        if (intents.length > 0) {
          const primaryIntent = intents[0];
          this._detectedIntents.push({
            intent: primaryIntent.intent,
            confidence: primaryIntent.confidence,
            timestamp,
            messageId
          });
          
          // Truncate detected intents history if needed
          if (this._detectedIntents.length > this.maxHistoryLength) {
            this._detectedIntents = this._detectedIntents.slice(-this.maxHistoryLength);
          }
          
          // Notify listeners about intent detection
          this._notifyListeners("onIntentDetection", {
            message,
            intents,
            primaryIntent
          });
        }
      }
      
      // Detect topics
      if (this.enableTopicTracking && this._topicDetector) {
        const detectedTopics = await this._topicDetector.detect(resolvedText, currentContext);
        topics = detectedTopics.topics;
        
        // Add topics to message
        message.topics = topics;
        
        // Check for topic shifts
        if (topics.length > 0) {
          const topicShift = this.detectTopicShift(topics, currentContext);
          
          // Update topic memory
          this.updateTopicMemory(topics);
          
          // Notify listeners if topic shifted
          if (topicShift.shifted) {
            this._notifyListeners("onTopicShift", {
              message,
              previousTopic: topicShift.previousTopic,
              newTopic: topicShift.newTopic,
              confidence: topicShift.confidence
            });
          }
        }
      }
      
      // Analyze sentiment
      if (this.enableEmotionTracking && this._sentimentAnalyzer) {
        sentiment = await this._sentimentAnalyzer.analyze(text);
        message.sentiment = sentiment;
      }
      
      // Add message to conversation history
      this._conversationHistory.push(message);
      
      // Trim conversation history if exceeds max length
      if (this._conversationHistory.length > this.maxHistoryLength) {
        this._conversationHistory = this._conversationHistory.slice(-this.maxHistoryLength);
      }
      
      // Update current context
      this._currentContext = this.buildContext();
      
      // Notify listeners about context update
      this._notifyListeners("onContextUpdate", {
        context: this._currentContext,
        newMessage: message
      });
      
      // Return processing result
      return {
        id: messageId,
        text,
        resolvedText,
        intents,
        entities,
        topics,
        sentiment,
        context: this._currentContext
      };
    } catch (error) {
      console.error("Message processing error:", error);
      throw error;
    }
  }
  
  /**
   * Get contextually enhanced output
   * @param {string} baseOutput - Base output text
   * @param {Object} options - Enhancement options
   * @returns {Promise<Object>} Enhanced output
   */
  async enhanceWithContext(baseOutput, options = {}) {
    if (!this.initialized) {
      throw new Error("Contextual Understanding system not initialized");
    }
    
    if (!baseOutput || typeof baseOutput !== 'string') {
      throw new Error("Invalid base output");
    }
    
    try {
      // Get current context
      const context = this.getCurrentContext();
      
      // Apply entity references
      let enhancedOutput = baseOutput;
      
      if (this.enableEntityTracking) {
        enhancedOutput = this.insertEntityReferences(enhancedOutput, context);
      }
      
      // Apply conversation continuity
      if (options.ensureContinuity) {
        enhancedOutput = this.ensureConversationContinuity(enhancedOutput, context);
      }
      
      // Adapt tone based on sentiment history
      if (this.enableEmotionTracking && options.adaptTone) {
        enhancedOutput = this.adaptToneBasedOnSentiment(enhancedOutput, context);
      }
      
      // Add contextual knowledge if available and relevant
      if (this.enableKnowledgeRetrieval && options.addKnowledge) {
        enhancedOutput = await this.enrichWithKnowledge(enhancedOutput, context);
      }
      
      // Create enhanced output message
      const outputMessage = {
        id: this.generateMessageId(),
        text: enhancedOutput,
        original: baseOutput,
        sender: "system",
        timestamp: Date.now(),
        turnIndex: this._conversationHistory.length,
        metadata: { contextualized: true }
      };
      
      // Add to conversation history
      if (options.addToHistory) {
        this._conversationHistory.push(outputMessage);
        
        // Trim conversation history if needed
        if (this._conversationHistory.length > this.maxHistoryLength) {
          this._conversationHistory = this._conversationHistory.slice(-this.maxHistoryLength);
        }
        
        // Update context
        this._currentContext = this.buildContext();
        
        // Notify context update
        this._notifyListeners("onContextUpdate", {
          context: this._currentContext,
          newMessage: outputMessage
        });
      }
      
      return {
        originalText: baseOutput,
        enhancedText: enhancedOutput,
        message: outputMessage,
        contextApplied: enhancedOutput !== baseOutput
      };
    } catch (error) {
      console.error("Context enhancement error:", error);
      return {
        originalText: baseOutput,
        enhancedText: baseOutput,
        contextApplied: false,
        error: error.message
      };
    }
  }
  
  /**
   * Get current conversation context
   * @returns {Object} Current context
   */
  getCurrentContext() {
    // If we already have a current context, return it
    if (this._currentContext) {
      return this._currentContext;
    }
    
    // Otherwise, build a new context
    return this.buildContext();
  }
  
  /**
   * Build conversation context from history
   * @returns {Object} Conversation context
   * @private
   */
  buildContext() {
    // Get recent history based on context window size
    const recentHistory = this._conversationHistory.slice(-this.contextWindowSize);
    
    // Build context object
    const context = {
      conversationId: this.generateConversationId(),
      turnCount: this._conversationHistory.length,
      recentMessages: recentHistory,
      entities: this.getTrackedEntities(),
      intents: this.getRecentIntents(),
      topics: this.getActiveTopics(),
      sentiment: this.getConversationSentiment(),
      timestamp: Date.now()
    };
    
    return context;
  }
  
  /**
   * Detect intents in text
   * @param {string} text - Text to analyze
   * @param {Object} context - Current context
   * @returns {Promise<Object>} Detected intents
   * @private
   */
  async detectIntents(text, context) {
    // This is a simplified intent detection implementation
    // In a real system, this would use a trained model
    
    // Define common intent patterns (simplified)
    const intentPatterns = [
      { intent: "greeting", patterns: ["hello", "hi", "hey", "greetings", "howdy", "good morning", "good afternoon", "good evening"] },
      { intent: "farewell", patterns: ["goodbye", "bye", "see you", "farewell", "later", "take care"] },
      { intent: "thanks", patterns: ["thanks", "thank you", "appreciate it", "grateful", "thanking you"] },
      { intent: "help", patterns: ["help", "assist", "support", "guidance", "instruction", "how do i", "how to"] },
      { intent: "confirm", patterns: ["yes", "yeah", "sure", "certainly", "absolutely", "confirm", "correct", "right"] },
      { intent: "deny", patterns: ["no", "nope", "not", "never", "incorrect", "wrong", "don't", "do not"] },
      { intent: "query", patterns: ["what", "where", "when", "why", "how", "which", "who", "whose", "can you tell me", "?"] },
      { intent: "request", patterns: ["could you", "would you", "can you", "please", "i need", "i want", "i'd like"] }
    ];
    
    const lowerText = text.toLowerCase();
    const intents = [];
    
    // Check each intent pattern
    for (const { intent, patterns } of intentPatterns) {
      let maxScore = 0;
      
      for (const pattern of patterns) {
        if (lowerText.includes(pattern)) {
          // Calculate a simple confidence score
          const score = pattern.length / Math.min(10, text.length);
          maxScore = Math.max(maxScore, score);
        }
      }
      
      // Apply context boost if it's a contextually relevant intent
      if (context && this.isIntentContextuallyRelevant(intent, context)) {
        maxScore += this.intentConfidenceBoost;
      }
      
      // Add to results if confidence is high enough
      if (maxScore > this.minConfidenceThreshold) {
        intents.push({
          intent,
          confidence: Math.min(0.99, maxScore), // Cap at 0.99
          parameters: {} // Would extract parameters in a real implementation
        });
      }
    }
    
    // Sort by confidence
    intents.sort((a, b) => b.confidence - a.confidence);
    
    return { intents };
  }
  
  /**
   * Check if an intent is contextually relevant
   * @param {string} intent - Intent to check
   * @param {Object} context - Current context
   * @returns {boolean} Whether the intent is contextually relevant
   * @private
   */
  isIntentContextuallyRelevant(intent, context) {
    if (!context || !context.intents || context.intents.length === 0) {
      return false;
    }
    
    // Intent sequences that are contextually relevant
    const relevantSequences = {
      "greeting": ["farewell", "query", "request"],
      "query": ["confirm", "deny", "query", "thanks"],
      "request": ["confirm", "deny", "thanks"],
      "help": ["thanks", "confirm", "deny", "query"],
      "farewell": ["thanks", "confirm"]
    };
    
    // Get most recent intent
    const lastIntent = context.intents[0]?.intent;
    
    // Check if our current intent is a relevant follow-up
    return lastIntent && 
           relevantSequences[lastIntent] && 
           relevantSequences[lastIntent].includes(intent);
  }
  
  /**
   * Extract entities from text
   * @param {string} text - Text to analyze
   * @param {Object} context - Current context
   * @returns {Promise<Object>} Extracted entities
   * @private
   */
  async extractEntities(text, context) {
    // This is a simplified entity extraction implementation
    // In a real system, this would use a named entity recognition model
    
    // Define common entity patterns (simplified)
    const entityPatterns = [
      { 
        type: "person", 
        patterns: [
          /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, // Names like "John Smith"
          /\bMr\. [A-Z][a-z]+\b/g, // Mr. Smith
          /\bMrs\. [A-Z][a-z]+\b/g, // Mrs. Smith
          /\bDr\. [A-Z][a-z]+\b/g, // Dr. Smith
          /\bMs\. [A-Z][a-z]+\b/g // Ms. Smith
        ]
      },
      { 
        type: "location", 
        patterns: [
          /\b(New York|London|Paris|Tokyo|Sydney|Los Angeles|Chicago|Berlin|Rome|Moscow)\b/g,
          /\b[A-Z][a-z]+ (Street|Avenue|Road|Boulevard|Lane)\b/g // Main Street, etc.
        ]
      },
      { 
        type: "organization", 
        patterns: [
          /\b(Google|Microsoft|Apple|Amazon|Facebook|Twitter|Netflix)\b/g,
          /\b[A-Z][a-z]+ (Inc|Corp|Corporation|Company|Co|Ltd)\b/g // Acme Corp, etc.
        ]
      },
      { 
        type: "date", 
        patterns: [
          /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, // MM/DD/YYYY
          /\b(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}(st|nd|rd|th)?, \d{4}\b/g, // January 1st, 2024
          /\b(today|tomorrow|yesterday)\b/gi // Relative dates
        ]
      },
      { 
        type: "time", 
        patterns: [
          /\b\d{1,2}:\d{2}\s?(am|pm)?\b/gi, // 12:30 PM
          /\b(noon|midnight)\b/gi // noon/midnight
        ]
      },
      { 
        type: "email", 
        patterns: [
          /\b[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}\b/g // email@domain.com
        ]
      },
      { 
        type: "phone", 
        patterns: [
          /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g, // 555-123-4567
          /\b\(\d{3}\)\s?\d{3}[-.\s]?\d{4}\b/g // (555) 123-4567
        ]
      },
      { 
        type: "number", 
        patterns: [
          /\b\d+\b/g // Simple numbers
        ]
      },
      {
        type: "url",
        patterns: [
          /\b(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/[^\s]*)?\b/gi // URLs
        ]
      },
      {
        type: "product",
        patterns: [
          /\b(iPhone|iPad|MacBook|Galaxy|Surface|Echo|Alexa)\b/g // Product names
        ]
      }
    ];
    
    const entities = [];
    
    // Extract entities using patterns
    for (const { type, patterns } of entityPatterns) {
      for (const pattern of patterns) {
        const matches = text.match(pattern) || [];
        
        for (const match of matches) {
          // Check if already found (avoid duplicates)
          const isDuplicate = entities.some(
            entity => entity.value.toLowerCase() === match.toLowerCase() && entity.type === type
          );
          
          if (!isDuplicate) {
            entities.push({
              type,
              value: match,
              confidence: 0.9, // Fixed confidence for pattern-based entities
              startIndex: text.indexOf(match),
              endIndex: text.indexOf(match) + match.length
            });
          }
        }
      }
    }
    
    // Look for references to previously mentioned entities
    if (context && context.entities) {
      // Check for pronouns or references
      const pronounMap = {
        "he": "person",
        "she": "person",
        "him": "person",
        "her": "person",
        "they": "person",
        "them": "person",
        "it": "object",
        "this": "object",
        "that": "object",
        "these": "object",
        "those": "object",
        "there": "location",
        "here": "location"
      };
      
      const words = text.toLowerCase().split(/\s+/);
      
      for (const word of words) {
        const entityType = pronounMap[word];
        
        if (entityType) {
          // Find the most recent entity of this type
          const recentEntities = context.entities.filter(e => e.type === entityType || 
            (entityType === "object" && ["product", "organization", "number"].includes(e.type)));
          
          if (recentEntities.length > 0) {
            // Add reference to most recent matching entity
            const referencedEntity = recentEntities[0];
            
            entities.push({
              type: "reference",
              value: word,
              confidence: 0.8,
              referenceTo: {
                type: referencedEntity.type,
                value: referencedEntity.value
              },
              startIndex: text.indexOf(word),
              endIndex: text.indexOf(word) + word.length
            });
          }
        }
      }
    }
    
    return { entities };
  }
  
  /**
   * Resolve references in text
   * @param {string} text - Text to analyze
   * @param {Object} context - Current context
   * @returns {Promise<Object>} Text with resolved references
   * @private
   */
  async resolveReferences(text, context) {
    if (!context || !context.entities || context.entities.length === 0) {
      return { success: false, resolvedText: text, references: [] };
    }
    
    // Define reference patterns
    const referencePatterns = [
      { type: "pronoun", patterns: [/\b(he|she|it|they|them|him|her|his|hers|their|its)\b/gi], priority: 1 },
      { type: "demonstrative", patterns: [/\b(this|that|these|those)\b/gi], priority: 2 },
      { type: "relative", patterns: [/\b(which|who|whom|whose)\b/gi], priority: 3 },
      { type: "location", patterns: [/\b(here|there)\b/gi], priority: 4 },
      { type: "time", patterns: [/\b(then|at that time)\b/gi], priority: 5 }
    ];
    
    let resolvedText = text;
    const references = [];
    
    // First pass: identify all references
    for (const { type, patterns } of referencePatterns) {
      for (const pattern of patterns) {
        const matches = [...text.matchAll(pattern)];
        
        for (const match of matches) {
          const word = match[0];
          const startIndex = match.index;
          const endIndex = startIndex + word.length;
          
          // Try to resolve this reference
          const resolution = this.findReferentForWord(word, context);
          
          if (resolution.found) {
            references.push({
              type,
              word,
              startIndex,
              endIndex,
              referentType: resolution.type,
              referentValue: resolution.value,
              confidence: resolution.confidence
            });
          }
        }
      }
    }
    
    // Sort references by start index (descending so we can replace from end to start)
    references.sort((a, b) => b.startIndex - a.startIndex);
    
    // Second pass: replace references in the text
    for (const reference of references) {
      // Only replace if confidence is high enough
      if (reference.confidence >= this.minConfidenceThreshold) {
        const before = resolvedText.substring(0, reference.startIndex);
        const after = resolvedText.substring(reference.endIndex);
        
        // Replace with referent value
        resolvedText = before + reference.referentValue + after;
        
        // Mark reference as resolved
        reference.resolved = true;
      }
    }
    
    return {
      success: references.some(ref => ref.resolved),
      resolvedText,
      references
    };
  }
  
  /**
   * Find the referent for a word
   * @param {string} word - Reference word
   * @param {Object} context - Current context
   * @returns {Object} Reference resolution
   * @private
   */
  findReferentForWord(word, context) {
    const lowerWord = word.toLowerCase();
    
    // Handle personal pronouns
    if (["he", "him", "his"].includes(lowerWord)) {
      // Find most recent male person
      const person = context.entities.find(e => 
        e.type === "person" && e.gender === "male"
      );
      
      if (person) {
        return {
          found: true,
          type: "person",
          value: person.value,
          confidence: 0.9
        };
      }
    }
    
    if (["she", "her", "hers"].includes(lowerWord)) {
      // Find most recent female person
      const person = context.entities.find(e => 
        e.type === "person" && e.gender === "female"
      );
      
      if (person) {
        return {
          found: true,
          type: "person",
          value: person.value,
          confidence: 0.9
        };
      }
    }
    
    if (["it", "its"].includes(lowerWord)) {
      // Find most recent non-person entity
      const entity = context.entities.find(e => 
        e.type !== "person" && e.type !== "location" && e.type !== "organization"
      );
      
      if (entity) {
        return {
          found: true,
          type: entity.type,
          value: entity.value,
          confidence: 0.8
        };
      }
    }
    
    if (["they", "them", "their"].includes(lowerWord)) {
      // Could be plural or gender-neutral singular
      // Try to find most recent group or organization
      const group = context.entities.find(e => 
        e.type === "organization" || e.isPlural
      );
      
      if (group) {
        return {
          found: true,
          type: group.type,
          value: group.value,
          confidence: 0.8
        };
      }
      
      // Fall back to most recent person if no group found
      const person = context.entities.find(e => e.type === "person");
      
      if (person) {
        return {
          found: true,
          type: "person",
          value: person.value,
          confidence: 0.7 // Lower confidence for this fallback
        };
      }
    }
    
    if (["this", "that"].includes(lowerWord)) {
      // Usually refers to the most recently mentioned entity or concept
      if (context.entities.length > 0) {
        const mostRecent = context.entities[0];
        
        return {
          found: true,
          type: mostRecent.type,
          value: mostRecent.value,
          confidence: 0.7
        };
      }
    }
    
    if (["these", "those"].includes(lowerWord)) {
      // Usually refers to plural entities
      const pluralEntities = context.entities.filter(e => e.isPlural);
      
      if (pluralEntities.length > 0) {
        const mostRecent = pluralEntities[0];
        
        return {
          found: true,
          type: mostRecent.type,
          value: mostRecent.value,
          confidence: 0.7
        };
      }
    }
    
    if (["here", "there"].includes(lowerWord)) {
      // Find most recent location
      const location = context.entities.find(e => e.type === "location");
      
      if (location) {
        return {
          found: true,
          type: "location",
          value: location.value,
          confidence: 0.8
        };
      }
    }
    
    // No referent found
    return { found: false };
  }
  
  /**
   * Detect topics in text
   * @param {string} text - Text to analyze
   * @param {Object} context - Current context
   * @returns {Promise<Object>} Detected topics
   * @private
   */
  async detectTopics(text, context) {
    // This is a simplified topic detection implementation
    // In a real system, this would use a topic model
    
    // Define keyword-based topics
    const topicKeywords = {
      "weather": ["weather", "temperature", "forecast", "rain", "sunny", "cloudy", "humidity", "storm", "snow", "cold", "hot"],
      "travel": ["travel", "vacation", "trip", "flight", "hotel", "booking", "destination", "tourism", "tourist", "journey", "visit"],
      "food": ["food", "restaurant", "meal", "dinner", "lunch", "breakfast", "recipe", "cook", "dish", "cuisine", "taste", "flavor"],
      "technology": ["technology", "computer", "software", "hardware", "app", "application", "device", "digital", "tech", "smartphone", "laptop"],
      "health": ["health", "medical", "doctor", "hospital", "symptom", "medication", "treatment", "disease", "cure", "wellness", "fitness"],
      "finance": ["finance", "money", "bank", "investment", "stock", "financial", "market", "economy", "economic", "budget", "savings"],
      "entertainment": ["entertainment", "movie", "film", "music", "concert", "show", "performance", "artist", "actor", "actress", "singer"],
      "sports": ["sports", "game", "player", "team", "match", "tournament", "championship", "competition", "score", "win", "lose"],
      "education": ["education", "school", "university", "college", "course", "study", "learning", "student", "teacher", "professor", "academic"],
      "news": ["news", "report", "article", "headline", "media", "press", "journalist", "broadcast", "current events", "breaking"]
    };
    
    const topics = [];
    const lowerText = text.toLowerCase();
    
    // Check each topic
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      let score = 0;
      let matchedKeywords = [];
      
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          score += 1;
          matchedKeywords.push(keyword);
        }
      }
      
      // Normalize score
      const normalizedScore = score / keywords.length;
      
      // Add to results if score is high enough
      if (normalizedScore > 0.1) {
        topics.push({
          topic,
          confidence: normalizedScore,
          keywords: matchedKeywords
        });
      }
    }
    
    // Sort by confidence
    topics.sort((a, b) => b.confidence - a.confidence);
    
    return { topics };
  }
  
  /**
   * Detect topic shift
   * @param {Array<Object>} newTopics - New topics
   * @param {Object} context - Current context
   * @returns {Object} Topic shift information
   * @private
   */
  detectTopicShift(newTopics, context) {
    if (!context || !context.topics || context.topics.length === 0 || newTopics.length === 0) {
      return { shifted: false };
    }
    
    // Get current main topic
    const currentTopic = context.topics[0];
    
    // Get new main topic
    const newTopic = newTopics[0];
    
    // Check if topic has changed
    if (newTopic.topic !== currentTopic.topic) {
      // Check if confidence exceeds threshold
      if (newTopic.confidence >= this.topicShiftThreshold) {
        return {
          shifted: true,
          previousTopic: currentTopic.topic,
          newTopic: newTopic.topic,
          confidence: newTopic.confidence
        };
      }
    }
    
    return { shifted: false };
  }
  
  /**
   * Analyze sentiment in text
   * @param {string} text - Text to analyze
   * @returns {Promise<Object>} Sentiment analysis
   * @private
   */
  async analyzeSentiment(text) {
    // This is a simplified sentiment analysis implementation
    // In a real system, this would use a sentiment analysis model
    
    // Define sentiment lexicons
    const positiveWords = [
      "good", "great", "excellent", "amazing", "wonderful", "fantastic",
      "happy", "glad", "pleased", "delighted", "joy", "love", "like",
      "best", "perfect", "outstanding", "awesome", "superb", "brilliant",
      "helpful", "useful", "beneficial", "valuable", "appreciate", "thanks"
    ];
    
    const negativeWords = [
      "bad", "terrible", "awful", "horrible", "poor", "disappointing",
      "sad", "upset", "angry", "annoyed", "frustrated", "hate", "dislike",
      "worst", "useless", "worthless", "unhelpful", "ineffective", "broken",
      "problem", "issue", "bug", "error", "fail", "failure", "wrong"
    ];
    
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    // Count sentiment words
    for (const word of words) {
      if (positiveWords.includes(word)) {
        positiveScore += 1;
      } else if (negativeWords.includes(word)) {
        negativeScore += 1;
      }
    }
    
    // Simple negation handling
    const negationWords = ["not", "no", "never", "don't", "doesn't", "isn't", "aren't", "wasn't", "weren't"];
    
    for (let i = 0; i < words.length - 1; i++) {
      if (negationWords.includes(words[i])) {
        // Check next word
        const nextWord = words[i + 1];
        
        if (positiveWords.includes(nextWord)) {
          // Negated positive becomes negative
          positiveScore -= 1;
          negativeScore += 1;
        } else if (negativeWords.includes(nextWord)) {
          // Negated negative becomes positive
          negativeScore -= 1;
          positiveScore += 1;
        }
      }
    }
    
    // Calculate compound score (-1 to 1)
    const total = positiveScore + negativeScore;
    let compoundScore = 0;
    
    if (total > 0) {
      compoundScore = (positiveScore - negativeScore) / total;
    }
    
    // Determine sentiment label
    let sentiment;
    
    if (compoundScore > 0.05) {
      sentiment = "positive";
    } else if (compoundScore < -0.05) {
      sentiment = "negative";
    } else {
      sentiment = "neutral";
    }
    
    // Determine emotion (simplified)
    let emotion = "neutral";
    
    if (lowerText.includes("happy") || lowerText.includes("glad") || lowerText.includes("joy")) {
      emotion = "happy";
    } else if (lowerText.includes("sad") || lowerText.includes("upset")) {
      emotion = "sad";
    } else if (lowerText.includes("angry") || lowerText.includes("annoyed") || lowerText.includes("frustrated")) {
      emotion = "angry";
    } else if (lowerText.includes("surprised") || lowerText.includes("shocked") || lowerText.includes("amazed")) {
      emotion = "surprised";
    } else if (lowerText.includes("afraid") || lowerText.includes("scared") || lowerText.includes("fearful")) {
      emotion = "afraid";
    }
    
    return {
      sentiment,
      emotion,
      scores: {
        positive: positiveScore / Math.max(1, words.length),
        negative: negativeScore / Math.max(1, words.length),
        compound: compoundScore
      },
      confidence: Math.abs(compoundScore) + 0.5 // Simple confidence estimation
    };
  }
  
  /**
   * Query knowledge base
   * @param {string} query - Query string
   * @param {Object} context - Current context
   * @returns {Promise<Object>} Knowledge query result
   * @private
   */
  async queryKnowledge(query, context) {
    // In a real implementation, this would query a knowledge base
    // For this example, we'll use a simple pattern matching approach
    
    const facts = this.getDefaultFacts();
    const relevantFacts = [];
    
    // Check entities in context
    if (context && context.entities) {
      for (const entity of context.entities) {
        // Look for facts related to this entity
        for (const fact of facts) {
          if (fact.entities.some(e => 
            e.value.toLowerCase() === entity.value.toLowerCase() || 
            (e.type === entity.type && e.value.toLowerCase().includes(entity.value.toLowerCase()))
          )) {
            relevantFacts.push(fact);
          }
        }
      }
    }
    
    // Check topics in context
    if (context && context.topics) {
      for (const topicObj of context.topics) {
        const topic = topicObj.topic;
        
        // Look for facts related to this topic
        for (const fact of facts) {
          if (fact.topics.includes(topic) && !relevantFacts.includes(fact)) {
            relevantFacts.push(fact);
          }
        }
      }
    }
    
    // Direct query match
    const lowerQuery = query.toLowerCase();
    for (const fact of facts) {
      if (fact.keywords.some(keyword => lowerQuery.includes(keyword)) && !relevantFacts.includes(fact)) {
        relevantFacts.push(fact);
      }
    }
    
    // Sort by relevance
    relevantFacts.sort((a, b) => b.relevance - a.relevance);
    
    return {
      query,
      facts: relevantFacts.slice(0, 3), // Return top 3 most relevant facts
      totalResults: relevantFacts.length
    };
  }
  
  /**
   * Get default facts for the knowledge base
   * @returns {Array<Object>} Default facts
   * @private
   */
  getDefaultFacts() {
    return [
      {
        fact: "Paris is the capital city of France.",
        entities: [
          { type: "location", value: "Paris" },
          { type: "location", value: "France" }
        ],
        topics: ["travel", "geography"],
        keywords: ["paris", "france", "capital"],
        relevance: 0.8
      },
      {
        fact: "The Eiffel Tower is 330 meters tall.",
        entities: [
          { type: "location", value: "Eiffel Tower" }
        ],
        topics: ["travel", "architecture"],
        keywords: ["eiffel", "tower", "tall", "height"],
        relevance: 0.7
      },
      {
        fact: "The average temperature in New York City in January is 0°C (32°F).",
        entities: [
          { type: "location", value: "New York City" }
        ],
        topics: ["weather", "travel"],
        keywords: ["new york", "temperature", "january", "cold"],
        relevance: 0.6
      },
      {
        fact: "Apple Inc. was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in 1976.",
        entities: [
          { type: "organization", value: "Apple Inc." },
          { type: "person", value: "Steve Jobs" },
          { type: "person", value: "Steve Wozniak" },
          { type: "person", value: "Ronald Wayne" }
        ],
        topics: ["technology", "business"],
        keywords: ["apple", "founded", "steve jobs", "wozniak"],
        relevance: 0.9
      },
      {
        fact: "The Pacific Ocean is the largest and deepest ocean on Earth.",
        entities: [
          { type: "location", value: "Pacific Ocean" },
          { type: "location", value: "Earth" }
        ],
        topics: ["geography", "nature"],
        keywords: ["pacific", "ocean", "largest", "deepest"],
        relevance: 0.7
      }
    ];
  }
  
  /**
   * Get default intent examples
   * @returns {Object} Intent examples
   * @private
   */
  getDefaultIntentExamples() {
    return {
      "greeting": [
        "Hello there!",
        "Hi, how are you?",
        "Hey, good to see you!",
        "Good morning!",
        "Greetings!"
      ],
      "farewell": [
        "Goodbye!",
        "See you later!",
        "Bye for now!",
        "Until next time!",
        "Take care!"
      ],
      "thanks": [
        "Thank you so much!",
        "Thanks for your help!",
        "I appreciate it!",
        "Thanks a lot!",
        "Thank you for your assistance!"
      ],
      "help": [
        "Can you help me?",
        "I need some assistance.",
        "How do I use this?",
        "Could you give me some guidance?",
        "I'm looking for help with something."
      ],
      "confirm": [
        "Yes, that's correct.",
        "Yeah, I agree.",
        "That's right.",
        "Absolutely!",
        "Yes, please proceed."
      ],
      "deny": [
        "No, that's not right.",
        "I don't agree with that.",
        "That's incorrect.",
        "No, please don't.",
        "That's not what I meant."
      ],
      "query": [
        "What is the weather like today?",
        "How does this work?",
        "Where can I find more information?",
        "When is the deadline?",
        "Why is this happening?"
      ],
      "request": [
        "Could you please send me the document?",
        "I'd like to schedule a meeting.",
        "Please process my application.",
        "Can you show me how to do this?",
        "I want to order a new product."
      ]
    };
  }
  
  /**
   * Get default entity types
   * @returns {Object} Entity types
   * @private
   */
  getDefaultEntityTypes() {
    return {
      "person": {
        name: "Person",
        description: "Names of individuals",
        examples: ["John Smith", "Mary Johnson", "Dr. Brown"]
      },
      "location": {
        name: "Location",
        description: "Geographic locations",
        examples: ["New York", "Paris", "123 Main Street", "Mount Everest"]
      },
      "organization": {
        name: "Organization",
        description: "Companies, institutions, and groups",
        examples: ["Apple Inc.", "United Nations", "University of California"]
      },
      "date": {
        name: "Date",
        description: "Calendar dates",
        examples: ["January 1, 2023", "12/25/2022", "next Monday"]
      },
      "time": {
        name: "Time",
        description: "Times of day",
        examples: ["3:30 PM", "noon", "midnight", "morning"]
      },
      "number": {
        name: "Number",
        description: "Numeric values",
        examples: ["42", "one thousand", "3.14"]
      },
      "email": {
        name: "Email",
        description: "Email addresses",
        examples: ["user@example.com"]
      },
      "phone": {
        name: "Phone",
        description: "Phone numbers",
        examples: ["555-123-4567", "(800) 555-1234"]
      },
      "url": {
        name: "URL",
        description: "Web addresses",
        examples: ["https://example.com", "www.example.org"]
      },
      "product": {
        name: "Product",
        description: "Product names",
        examples: ["iPhone 13", "Tesla Model 3", "Microsoft Office"]
      }
    };
  }
  
  /**
   * Get default topics
   * @returns {Array<string>} List of topics
   * @private
   */
  getDefaultTopics() {
    return [
      "weather",
      "travel",
      "food",
      "technology",
      "health",
      "finance",
      "entertainment",
      "sports",
      "education",
      "news",
      "politics",
      "science",
      "art",
      "fashion",
      "business",
      "environment",
      "history",
      "literature",
      "music",
      "religion"
    ];
  }
  
  /**
   * Update entity memory
   * @param {Array<Object>} entities - Detected entities
   * @param {Object} message - Message containing entities
   * @private
   */
  updateEntityMemory(entities, message) {
    for (const entity of entities) {
      const key = `${entity.type}:${entity.value.toLowerCase()}`;
      
      if (!this._entityMemory[key]) {
        // New entity
        this._entityMemory[key] = {
          type: entity.type,
          value: entity.value,
          firstSeen: message.timestamp,
          lastSeen: message.timestamp,
          occurrences: 1,
          mentions: [{ messageId: message.id, turnIndex: message.turnIndex }],
          attributes: {}
        };
      } else {
        // Update existing entity
        const entityRecord = this._entityMemory[key];
        entityRecord.lastSeen = message.timestamp;
        entityRecord.occurrences += 1;
        entityRecord.mentions.push({ messageId: message.id, turnIndex: message.turnIndex });
        
        // Trim mentions if too many
        if (entityRecord.mentions.length > this.entityMemoryDuration) {
          entityRecord.mentions = entityRecord.mentions.slice(-this.entityMemoryDuration);
        }
      }
      
      // Add additional attributes
      if (entity.attributes) {
        this._entityMemory[key].attributes = {
          ...this._entityMemory[key].attributes,
          ...entity.attributes
        };
      }
    }
  }
  
  /**
   * Update topic memory
   * @param {Array<Object>} topics - Detected topics
   * @private
   */
  updateTopicMemory(topics) {
    if (!topics || topics.length === 0) {
      return;
    }
    
    // Add topics to memory
    for (const topic of topics) {
      // Check if topic already exists
      const existingTopic = this._topicMemory.find(t => t.topic === topic.topic);
      
      if (existingTopic) {
        // Update existing topic
        existingTopic.lastSeen = Date.now();
        existingTopic.occurrences += 1;
        existingTopic.confidence = (existingTopic.confidence * 0.7) + (topic.confidence * 0.3);
      } else {
        // Add new topic
        this._topicMemory.push({
          topic: topic.topic,
          firstSeen: Date.now(),
          lastSeen: Date.now(),
          occurrences: 1,
          confidence: topic.confidence
        });
      }
    }
    
    // Sort by recency
    this._topicMemory.sort((a, b) => b.lastSeen - a.lastSeen);
    
    // Trim if needed
    if (this._topicMemory.length > this.maxHistoryLength) {
      this._topicMemory = this._topicMemory.slice(0, this.maxHistoryLength);
    }
  }
  
  /**
   * Insert entity references into text
   * @param {string} text - Text to enhance
   * @param {Object} context - Current context
   * @returns {string} Enhanced text
   * @private
   */
  insertEntityReferences(text, context) {
    let enhancedText = text;
    
    // Check if we have entities to reference
    if (!context || !context.entities || context.entities.length === 0) {
      return enhancedText;
    }
    
    // Simple placeholder replacement
    const placeholders = {
      "{user}": context.entities.find(e => e.type === "person"),
      "{location}": context.entities.find(e => e.type === "location"),
      "{organization}": context.entities.find(e => e.type === "organization"),
      "{date}": context.entities.find(e => e.type === "date"),
      "{time}": context.entities.find(e => e.type === "time"),
      "{product}": context.entities.find(e => e.type === "product")
    };
    
    // Replace placeholders
    for (const [placeholder, entity] of Object.entries(placeholders)) {
      if (enhancedText.includes(placeholder) && entity) {
        enhancedText = enhancedText.replace(new RegExp(placeholder, 'g'), entity.value);
      }
    }
    
    return enhancedText;
  }
  
  /**
   * Ensure conversation continuity
   * @param {string} text - Text to enhance
   * @param {Object} context - Current context
   * @returns {string} Enhanced text
   * @private
   */
  ensureConversationContinuity(text, context) {
    let enhancedText = text;
    
    // Check if we have context
    if (!context || !context.recentMessages || context.recentMessages.length === 0) {
      return enhancedText;
    }
    
    // Get most recent user message
    const lastUserMessage = [...context.recentMessages]
      .reverse()
      .find(msg => msg.sender === "user");
    
    if (!lastUserMessage) {
      return enhancedText;
    }
    
    // Get most recent intent if any
    const lastIntent = (lastUserMessage.intents && lastUserMessage.intents.length > 0) 
      ? lastUserMessage.intents[0].intent 
      : null;
    
    // Add continuity-enhancing prefixes based on intent
    if (lastIntent === "query" && !enhancedText.match(/^(yes|no|indeed|correct|right|sure)/i)) {
      // For queries, ensure we're answering directly
      if (!enhancedText.match(/^(to answer your question|regarding your question|about that|as for)/i)) {
        enhancedText = this.addContinuityPrefix(enhancedText, [
          "To answer your question, ",
          "Regarding your question, ",
          "About that, ",
          "As for that, "
        ]);
      }
    } else if (lastIntent === "greeting" && !enhancedText.match(/^(hello|hi|hey|greetings)/i)) {
      // For greetings, ensure we greet back if we haven't
      enhancedText = this.addContinuityPrefix(enhancedText, [
        "Hello! ",
        "Hi there! ",
        "Greetings! "
      ]);
    } else if (lastIntent === "thanks" && !enhancedText.match(/^(you're welcome|no problem|happy to help)/i)) {
      // For thanks, ensure we acknowledge
      enhancedText = this.addContinuityPrefix(enhancedText, [
        "You're welcome! ",
        "Happy to help! ",
        "No problem! "
      ]);
    }
    
    return enhancedText;
  }
  
  /**
   * Add continuity prefix to text
   * @param {string} text - Text to modify
   * @param {Array<string>} prefixes - Possible prefixes
   * @returns {string} Modified text
   * @private
   */
  addContinuityPrefix(text, prefixes) {
    // Only add prefix if it makes sense
    if (text.length < 100) {
      // For short responses, always add a prefix
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      return prefix + text;
    } else if (Math.random() < 0.7) {
      // For longer responses, add prefix 70% of the time
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      return prefix + text;
    }
    
    return text;
  }
  
  /**
   * Adapt tone based on sentiment history
   * @param {string} text - Text to adapt
   * @param {Object} context - Current context
   * @returns {string} Adapted text
   * @private
   */
  adaptToneBasedOnSentiment(text, context) {
    let adaptedText = text;
    
    if (!context || !context.sentiment) {
      return adaptedText;
    }
    
    const sentiment = context.sentiment;
    
    // Adapt tone based on detected sentiment
    if (sentiment.emotion === "happy") {
      // Match positive tone
      adaptedText = this.increasePositivity(adaptedText);
    } else if (sentiment.emotion === "sad") {
      // Be more empathetic
      adaptedText = this.increaseEmpathy(adaptedText);
    } else if (sentiment.emotion === "angry") {
      // Be calming
      adaptedText = this.increaseCalm(adaptedText);
    } else if (sentiment.emotion === "afraid") {
      // Be reassuring
      adaptedText = this.increaseReassurance(adaptedText);
    }
    
    return adaptedText;
  }
  
  /**
   * Increase positivity in text
   * @param {string} text - Text to modify
   * @returns {string} Modified text
   * @private
   */
  increasePositivity(text) {
    // Simple positivity enhancers
    const positivityPhrases = [
      "Great! ",
      "Excellent! ",
      "Fantastic! ",
      "Awesome! ",
      "Wonderful! "
    ];
    
    // Add positive phrase at the beginning if not already positive
    if (!text.match(/^(great|excellent|fantastic|awesome|wonderful|good|nice)/i)) {
      const phrase = positivityPhrases[Math.floor(Math.random() * positivityPhrases.length)];
      return phrase + text;
    }
    
    return text;
  }
  
  /**
   * Increase empathy in text
   * @param {string} text - Text to modify
   * @returns {string} Modified text
   * @private
   */
  increaseEmpathy(text) {
    // Simple empathy enhancers
    const empathyPhrases = [
      "I understand how you feel. ",
      "I'm sorry to hear that. ",
      "That must be difficult. ",
      "I appreciate you sharing that. "
    ];
    
    // Add empathetic phrase at the beginning if not already empathetic
    if (!text.match(/^(i understand|i'm sorry|that must be|i appreciate)/i)) {
      const phrase = empathyPhrases[Math.floor(Math.random() * empathyPhrases.length)];
      return phrase + text;
    }
    
    return text;
  }
  
  /**
   * Increase calm in text
   * @param {string} text - Text to modify
   * @returns {string} Modified text
   * @private
   */
  increaseCalm(text) {
    // Simple calming enhancers
    const calmingPhrases = [
      "I understand your concern. ",
      "Let's take a step back. ",
      "I appreciate your feedback. ",
      "Let's work through this together. "
    ];
    
    // Add calming phrase at the beginning if not already calming
    if (!text.match(/^(i understand|let's take|i appreciate|let's work)/i)) {
      const phrase = calmingPhrases[Math.floor(Math.random() * calmingPhrases.length)];
      return phrase + text;
    }
    
    return text;
  }
  
  /**
   * Increase reassurance in text
   * @param {string} text - Text to modify
   * @returns {string} Modified text
   * @private
   */
  increaseReassurance(text) {
    // Simple reassurance enhancers
    const reassurancePhrases = [
      "Don't worry, ",
      "Rest assured, ",
      "Everything will be okay. ",
      "I'm here to help. "
    ];
    
    // Add reassuring phrase at the beginning if not already reassuring
    if (!text.match(/^(don't worry|rest assured|everything will be|i'm here)/i)) {
      const phrase = reassurancePhrases[Math.floor(Math.random() * reassurancePhrases.length)];
      return phrase + text;
    }
    
    return text;
  }
  
  /**
   * Enrich text with contextual knowledge
   * @param {string} text - Text to enrich
   * @param {Object} context - Current context
   * @returns {Promise<string>} Enriched text
   * @private
   */
  async enrichWithKnowledge(text, context) {
    if (!this.enableKnowledgeRetrieval || !this._knowledgeBase) {
      return text;
    }
    
    try {
      // Query knowledge base
      const result = await this._knowledgeBase.query(text, context);
      
      // Check if we found relevant facts
      if (result.facts.length === 0) {
        return text;
      }
      
      // Get most relevant fact
      const mostRelevantFact = result.facts[0];
      
      // Only add if highly relevant
      if (mostRelevantFact.relevance > 0.7) {
        // Check if the fact is already included in the text
        if (!text.includes(mostRelevantFact.fact)) {
          return text + " " + mostRelevantFact.fact;
        }
      }
      
      return text;
    } catch (error) {
      console.error("Error enriching with knowledge:", error);
      return text;
    }
  }
  
  /**
   * Get tracked entities
   * @returns {Array<Object>} Tracked entities
   */
  getTrackedEntities() {
    // Get entities from memory
    const entities = Object.values(this._entityMemory);
    
    // Sort by recency
    entities.sort((a, b) => b.lastSeen - a.lastSeen);
    
    return entities;
  }
  
  /**
   * Get recent intents
   * @param {number} limit - Maximum number of intents to return
   * @returns {Array<Object>} Recent intents
   */
  getRecentIntents(limit = 5) {
    // Sort by recency
    const sortedIntents = [...this._detectedIntents].sort((a, b) => b.timestamp - a.timestamp);
    
    // Return limited number
    return sortedIntents.slice(0, limit);
  }
  
  /**
   * Get active topics
   * @param {number} limit - Maximum number of topics to return
   * @returns {Array<Object>} Active topics
   */
  getActiveTopics(limit = 3) {
    // Sort by recency
    const recentTopics = [...this._topicMemory].sort((a, b) => b.lastSeen - a.lastSeen);
    
    // Return limited number
    return recentTopics.slice(0, limit);
  }
  
  /**
   * Get conversation sentiment
   * @returns {Object} Conversation sentiment
   */
  getConversationSentiment() {
    // Get recent messages
    const recentMessages = this._conversationHistory.slice(-this.contextWindowSize);
    
    // Filter messages with sentiment
    const messagesWithSentiment = recentMessages.filter(msg => msg.sentiment);
    
    if (messagesWithSentiment.length === 0) {
      return {
        sentiment: "neutral",
        emotion: "neutral",
        confidence: 0.5
      };
    }
    
    // Calculate average sentiment
    let positiveSum = 0;
    let negativeSum = 0;
    const emotions = {};
    
    for (const msg of messagesWithSentiment) {
      positiveSum += msg.sentiment.scores.positive;
      negativeSum += msg.sentiment.scores.negative;
      
      // Count emotions
      const emotion = msg.sentiment.emotion;
      emotions[emotion] = (emotions[emotion] || 0) + 1;
    }
    
    // Calculate average scores
    const avgPositive = positiveSum / messagesWithSentiment.length;
    const avgNegative = negativeSum / messagesWithSentiment.length;
    const compoundScore = avgPositive - avgNegative;
    
    // Determine sentiment label
    let sentiment;
    
    if (compoundScore > 0.05) {
      sentiment = "positive";
    } else if (compoundScore < -0.05) {
      sentiment = "negative";
    } else {
      sentiment = "neutral";
    }
    
    // Find most common emotion
    let dominantEmotion = "neutral";
    let maxCount = 0;
    
    for (const [emotion, count] of Object.entries(emotions)) {
      if (count > maxCount) {
        maxCount = count;
        dominantEmotion = emotion;
      }
    }
    
    return {
      sentiment,
      emotion: dominantEmotion,
      confidence: Math.abs(compoundScore) + 0.5, // Simple confidence estimation
      scores: {
        positive: avgPositive,
        negative: avgNegative,
        compound: compoundScore
      }
    };
  }
  
  /**
   * Load conversation history
   * @param {Array<Object>} history - Conversation history
   * @returns {boolean} Success status
   */
  loadConversationHistory(history) {
    if (!history || !Array.isArray(history)) {
      return false;
    }
    
    try {
      // Validate and process history
      const validHistory = history.filter(msg => 
        msg && typeof msg === 'object' && 
        msg.text && typeof msg.text === 'string' &&
        msg.sender && typeof msg.sender === 'string'
      ).map((msg, index) => ({
        id: msg.id || this.generateMessageId(),
        text: msg.text,
        sender: msg.sender,
        timestamp: msg.timestamp || Date.now() - (history.length - index) * 60000, // Estimate timestamps if not provided
        turnIndex: index,
        metadata: msg.metadata || {},
        entities: msg.entities || [],
        intents: msg.intents || [],
        topics: msg.topics || [],
        sentiment: msg.sentiment || null
      }));
      
      if (validHistory.length === 0) {
        return false;
      }
      
      // Limit to max history length
      this._conversationHistory = validHistory.slice(-this.maxHistoryLength);
      
      // Extract entities and intents
      for (const msg of this._conversationHistory) {
        if (msg.entities && msg.entities.length > 0) {
          this.updateEntityMemory(msg.entities, msg);
        }
        
        if (msg.intents && msg.intents.length > 0) {
          const primaryIntent = msg.intents[0];
          this._detectedIntents.push({
            intent: primaryIntent.intent,
            confidence: primaryIntent.confidence,
            timestamp: msg.timestamp,
            messageId: msg.id
          });
        }
        
        if (msg.topics && msg.topics.length > 0) {
          this.updateTopicMemory(msg.topics);
        }
      }
      
      // Build current context
      this._currentContext = this.buildContext();
      
      return true;
    } catch (error) {
      console.error("Error loading conversation history:", error);
      return false;
    }
  }
  
  /**
   * Clear conversation history
   * @returns {boolean} Success status
   */
  clearConversationHistory() {
    this._conversationHistory = [];
    this._entityMemory = {};
    this._topicMemory = [];
    this._detectedIntents = [];
    this._currentContext = null;
    
    return true;
  }
  
  /**
   * Register an event listener
   * @param {string} event - Event type
   * @param {Function} callback - Callback function
   * @returns {string} Listener ID
   */
  on(event, callback) {
    if (!this._listeners[event]) {
      throw new Error(`Unknown event: ${event}`);
    }
    
    if (typeof callback !== 'function') {
      throw new Error("Callback must be a function");
    }
    
    const id = this.generateListenerId();
    this._listeners[event].push({ id, callback });
    
    return id;
  }
  
  /**
   * Remove an event listener
   * @param {string} event - Event type
   * @param {string|Function} idOrCallback - Listener ID or callback function
   * @returns {boolean} Success status
   */
  off(event, idOrCallback) {
    if (!this._listeners[event]) {
      throw new Error(`Unknown event: ${event}`);
    }
    
    const listeners = this._listeners[event];
    let index = -1;
    
    if (typeof idOrCallback === 'string') {
      // Remove by ID
      index = listeners.findIndex(listener => listener.id === idOrCallback);
    } else if (typeof idOrCallback === 'function') {
      // Remove by callback reference
      index = listeners.findIndex(listener => listener.callback === idOrCallback);
    }
    
    if (index !== -1) {
      listeners.splice(index, 1);
      return true;
    }
    
    return false;
  }
  
  /**
   * Notify all listeners of an event
   * @param {string} event - Event type
   * @param {Object} data - Event data
   * @private
   */
  _notifyListeners(event, data) {
    if (!this._listeners[event]) {
      return;
    }
    
    for (const { callback } of this._listeners[event]) {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${event} listener:`, error);
      }
    }
  }
  
  /**
   * Generate a unique message ID
   * @returns {string} Message ID
   * @private
   */
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  
  /**
   * Generate a unique conversation ID
   * @returns {string} Conversation ID
   * @private
   */
  generateConversationId() {
    // Use existing ID if available
    if (this._currentContext && this._currentContext.conversationId) {
      return this._currentContext.conversationId;
    }
    
    return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  
  /**
   * Generate a unique listener ID
   * @returns {string} Listener ID
   * @private
   */
  generateListenerId() {
    return `listener_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  
  /**
   * Get conversation history
   * @param {number} limit - Maximum number of messages to return
   * @returns {Array<Object>} Conversation history
   */
  getConversationHistory(limit = 0) {
    if (limit <= 0 || limit >= this._conversationHistory.length) {
      return [...this._conversationHistory];
    }
    
    return this._conversationHistory.slice(-limit);
  }
  
  /**
   * Get current configuration
   * @returns {Object} Current configuration
   */
  getConfiguration() {
    return {
      version: this.version,
      initialized: this.initialized,
      features: {
        intentTracking: this.enableIntentTracking,
        entityTracking: this.enableEntityTracking,
        referenceResolution: this.enableReferenceResolution,
        topicTracking: this.enableTopicTracking,
        personalization: this.enablePersonalization,
        knowledgeRetrieval: this.enableKnowledgeRetrieval,
        emotionTracking: this.enableEmotionTracking
      },
      settings: {
        maxHistoryLength: this.maxHistoryLength,
        memoryDecayRate: this.memoryDecayRate,
        contextWindowSize: this.contextWindowSize,
        minConfidenceThreshold: this.minConfidenceThreshold,
        entityMemoryDuration: this.entityMemoryDuration,
        topicShiftThreshold: this.topicShiftThreshold,
        intentConfidenceBoost: this.intentConfidenceBoost,
        prioritizeRecency: this.prioritizeRecency,
        conflictResolutionStrategy: this.conflictResolutionStrategy
      },
      state: {
        conversationLength: this._conversationHistory.length,
        trackedEntities: Object.keys(this._entityMemory).length,
        activeTopics: this._topicMemory.length,
        detectedIntents: this._detectedIntents.length
      }
    };
  }
}

// Export the class for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContextualUnderstanding;
} else if (typeof window !== 'undefined') {
  window.ContextualUnderstanding = ContextualUnderstanding;
}
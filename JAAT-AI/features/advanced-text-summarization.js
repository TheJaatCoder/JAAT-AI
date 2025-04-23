/**
 * JAAT-AI Feature: Advanced Text Summarization
 * Version: 1.0.0
 * 
 * This module provides sophisticated text summarization capabilities including:
 * - Extractive summarization
 * - Abstractive summarization
 * - Multi-document summarization
 * - Key point extraction
 * - Customizable summarization parameters
 * - Domain-specific summarization
 * - Multi-language support
 */

class AdvancedTextSummarization {
  constructor() {
    // Core properties
    this.version = "1.0.0";
    this.initialized = false;
    
    // Summarization settings
    this.provider = "local"; // local, openai, azure, google, custom
    this.defaultMethod = "extractive"; // extractive, abstractive, hybrid
    this.defaultModel = "default"; // Model to use
    this.defaultCompressionRatio = 0.3; // Target compression ratio (0.0 to 1.0)
    this.maxInputLength = 50000; // Maximum input text length in characters
    
    // Advanced settings
    this.enableKeyPointExtraction = true; // Extract key points
    this.enableCustomParams = true; // Allow custom parameters
    this.enableMultiDocument = true; // Support multiple document summarization
    this.enableMultiLanguage = true; // Support multiple languages
    this.defaultLanguage = "en"; // Default language
    
    // Domain-specific settings
    this.enableDomainSpecific = true; // Enable domain-specific summarization
    this.domains = {
      general: { enabled: true },
      academic: { enabled: true },
      news: { enabled: true },
      legal: { enabled: true },
      medical: { enabled: true },
      technical: { enabled: true },
      financial: { enabled: true }
    };
    
    // API Keys (should be set securely)
    this.apiKeys = {};
    
    // Internal state
    this._cache = {}; // Cache of generated summaries
    this._models = {}; // Loaded models
    this._listeners = {
      onSummarizationStart: [],
      onSummarizationComplete: [],
      onKeyPointsExtracted: [],
      onError: []
    };
  }
  
  /**
   * Initialize the summarization system
   * @param {Object} options - Configuration options
   * @returns {Promise<boolean>} Success status
   */
  async initialize(options = {}) {
    try {
      console.log("Initializing Advanced Text Summarization system...");
      
      // Apply custom options
      if (options.provider) this.provider = options.provider;
      if (options.defaultMethod) this.defaultMethod = options.defaultMethod;
      if (options.defaultModel) this.defaultModel = options.defaultModel;
      if (options.defaultCompressionRatio !== undefined) this.defaultCompressionRatio = options.defaultCompressionRatio;
      if (options.maxInputLength !== undefined) this.maxInputLength = options.maxInputLength;
      if (options.enableKeyPointExtraction !== undefined) this.enableKeyPointExtraction = options.enableKeyPointExtraction;
      if (options.enableCustomParams !== undefined) this.enableCustomParams = options.enableCustomParams;
      if (options.enableMultiDocument !== undefined) this.enableMultiDocument = options.enableMultiDocument;
      if (options.enableMultiLanguage !== undefined) this.enableMultiLanguage = options.enableMultiLanguage;
      if (options.defaultLanguage) this.defaultLanguage = options.defaultLanguage;
      if (options.enableDomainSpecific !== undefined) this.enableDomainSpecific = options.enableDomainSpecific;
      if (options.domains) {
        for (const [domain, settings] of Object.entries(options.domains)) {
          if (this.domains[domain]) {
            this.domains[domain] = { ...this.domains[domain], ...settings };
          } else if (settings.enabled) {
            this.domains[domain] = settings;
          }
        }
      }
      if (options.apiKeys) this.apiKeys = {...this.apiKeys, ...options.apiKeys};
      
      // Initialize provider
      switch (this.provider) {
        case 'local':
          await this.initializeLocal();
          break;
          
        case 'openai':
          await this.initializeOpenAI();
          break;
          
        case 'azure':
          await this.initializeAzure();
          break;
          
        case 'google':
          await this.initializeGoogle();
          break;
          
        case 'custom':
          await this.initializeCustom(options.customConfig);
          break;
          
        default:
          throw new Error(`Unsupported summarization provider: ${this.provider}`);
      }
      
      this.initialized = true;
      console.log("Advanced Text Summarization system initialized successfully.");
      return true;
    } catch (error) {
      console.error("Failed to initialize Advanced Text Summarization:", error);
      return false;
    }
  }
  
  /**
   * Initialize local summarization
   * @returns {Promise<void>}
   * @private
   */
  async initializeLocal() {
    try {
      console.log("Initializing local summarization...");
      
      // Initialize extractive summarization methods
      this._models.extractive = {
        default: { loaded: true },
        textrank: { loaded: true },
        lexrank: { loaded: true }
      };
      
      // Initialize abstractive summarization methods
      this._models.abstractive = {
        default: { loaded: true }
      };
      
      console.log("Local summarization initialized successfully.");
    } catch (error) {
      console.error("Error initializing local summarization:", error);
      throw error;
    }
  }
  
  /**
   * Initialize OpenAI summarization
   * @returns {Promise<void>}
   * @private
   */
  async initializeOpenAI() {
    // Check for required API key
    if (!this.apiKeys.openai) {
      throw new Error("OpenAI API key is required");
    }
    
    try {
      // In a real implementation, this would initialize the OpenAI client
      console.log("OpenAI summarization would be initialized here");
      
      // Initialize with available models
      this._models.extractive = {};
      this._models.abstractive = {
        "gpt-4o": { loaded: true },
        "gpt-4": { loaded: true },
        "gpt-3.5-turbo": { loaded: true }
      };
      
      console.log("OpenAI summarization initialized successfully.");
    } catch (error) {
      console.error("Error initializing OpenAI:", error);
      throw error;
    }
  }
  
  /**
   * Initialize Azure OpenAI summarization
   * @returns {Promise<void>}
   * @private
   */
  async initializeAzure() {
    // Check for required API key
    if (!this.apiKeys.azure) {
      throw new Error("Azure OpenAI API key is required");
    }
    
    try {
      // In a real implementation, this would initialize the Azure OpenAI client
      console.log("Azure OpenAI summarization would be initialized here");
      
      // Initialize with available models
      this._models.extractive = {};
      this._models.abstractive = {
        "gpt-4": { loaded: true },
        "gpt-35-turbo": { loaded: true }
      };
      
      console.log("Azure OpenAI summarization initialized successfully.");
    } catch (error) {
      console.error("Error initializing Azure OpenAI:", error);
      throw error;
    }
  }
  
  /**
   * Initialize Google summarization
   * @returns {Promise<void>}
   * @private
   */
  async initializeGoogle() {
    // Check for required API key
    if (!this.apiKeys.google) {
      throw new Error("Google API key is required");
    }
    
    try {
      // In a real implementation, this would initialize the Google AI client
      console.log("Google AI summarization would be initialized here");
      
      // Initialize with available models
      this._models.extractive = {};
      this._models.abstractive = {
        "gemini-pro": { loaded: true }
      };
      
      console.log("Google AI summarization initialized successfully.");
    } catch (error) {
      console.error("Error initializing Google AI:", error);
      throw error;
    }
  }
  
  /**
   * Initialize custom summarization
   * @param {Object} customConfig - Custom configuration
   * @returns {Promise<void>}
   * @private
   */
  async initializeCustom(customConfig) {
    if (!customConfig || typeof customConfig !== 'object') {
      throw new Error("Custom configuration is required for custom provider");
    }
    
    try {
      console.log("Custom summarization would be initialized here");
      
      // Store custom configuration
      this._customConfig = customConfig;
      
      // Initialize with custom models
      this._models.extractive = customConfig.extractiveModels || {};
      this._models.abstractive = customConfig.abstractiveModels || {};
      
      console.log("Custom summarization initialized successfully.");
    } catch (error) {
      console.error("Error initializing custom provider:", error);
      throw error;
    }
  }
  
  /**
   * Summarize text content
   * @param {string|Array<string>} content - Text content to summarize (string or array of strings for multi-document)
   * @param {Object} options - Summarization options
   * @returns {Promise<Object>} Summarization result
   */
  async summarize(content, options = {}) {
    if (!this.initialized) {
      throw new Error("Advanced Text Summarization system not initialized");
    }
    
    // Validate content
    if (!content) {
      throw new Error("Content is required for summarization");
    }
    
    // Handle multi-document input
    let isMultiDocument = Array.isArray(content);
    
    if (isMultiDocument && !this.enableMultiDocument) {
      throw new Error("Multi-document summarization is not enabled");
    }
    
    try {
      // Start timestamp
      const startTime = Date.now();
      
      // Generate a unique ID for this summarization
      const summarizationId = this.generateSummarizationId();
      
      // Prepare options by combining defaults with provided options
      const summarizationOptions = {
        method: options.method || this.defaultMethod,
        model: options.model || this.defaultModel,
        compressionRatio: options.compressionRatio !== undefined ? options.compressionRatio : this.defaultCompressionRatio,
        maxLength: options.maxLength,
        minLength: options.minLength,
        extractKeyPoints: options.extractKeyPoints !== undefined ? options.extractKeyPoints : this.enableKeyPointExtraction,
        language: options.language || this.defaultLanguage,
        domain: options.domain || 'general',
        customParams: this.enableCustomParams ? options.customParams : undefined,
        ...options
      };
      
      // Validate options
      this.validateSummarizationOptions(summarizationOptions, isMultiDocument);
      
      // Check cache if appropriate
      if (!options.skipCache) {
        const cacheKey = this.getCacheKey(content, summarizationOptions);
        
        if (this._cache[cacheKey]) {
          return {
            ...this._cache[cacheKey],
            fromCache: true
          };
        }
      }
      
      // Notify start of summarization
      this._notifyListeners("onSummarizationStart", {
        id: summarizationId,
        options: summarizationOptions,
        isMultiDocument,
        timestamp: startTime
      });
      
      // Process content
      let processedContent;
      if (isMultiDocument) {
        // Validate each document and combine
        processedContent = await this.preprocessMultiDocument(content, summarizationOptions);
      } else {
        // Preprocess single document
        processedContent = await this.preprocessText(content, summarizationOptions);
      }
      
      // Generate summary based on provider and method
      let result;
      
      switch (this.provider) {
        case 'local':
          if (summarizationOptions.method === 'extractive') {
            result = await this.summarizeExtractiveLocal(processedContent, summarizationOptions);
          } else if (summarizationOptions.method === 'abstractive') {
            result = await this.summarizeAbstractiveLocal(processedContent, summarizationOptions);
          } else { // hybrid
            result = await this.summarizeHybridLocal(processedContent, summarizationOptions);
          }
          break;
          
        case 'openai':
          result = await this.summarizeWithOpenAI(processedContent, summarizationOptions);
          break;
          
        case 'azure':
          result = await this.summarizeWithAzure(processedContent, summarizationOptions);
          break;
          
        case 'google':
          result = await this.summarizeWithGoogle(processedContent, summarizationOptions);
          break;
          
        case 'custom':
          result = await this.summarizeWithCustomProvider(processedContent, summarizationOptions);
          break;
          
        default:
          throw new Error(`Unsupported provider: ${this.provider}`);
      }
      
      // Extract key points if requested
      if (summarizationOptions.extractKeyPoints) {
        const keyPoints = await this.extractKeyPoints(processedContent, result.summary, summarizationOptions);
        result.keyPoints = keyPoints;
        
        // Notify key points extraction
        this._notifyListeners("onKeyPointsExtracted", {
          id: summarizationId,
          keyPoints,
          timestamp: Date.now()
        });
      }
      
      // Add metadata to result
      const endTime = Date.now();
      const finalResult = {
        ...result,
        id: summarizationId,
        processingTime: endTime - startTime,
        provider: this.provider,
        method: summarizationOptions.method,
        model: summarizationOptions.model,
        timestamp: endTime,
        options: summarizationOptions
      };
      
      // Cache result
      if (!options.skipCache) {
        const cacheKey = this.getCacheKey(content, summarizationOptions);
        this._cache[cacheKey] = finalResult;
      }
      
      // Notify completion
      this._notifyListeners("onSummarizationComplete", {
        id: summarizationId,
        result: finalResult,
        timestamp: endTime
      });
      
      return finalResult;
    } catch (error) {
      // Notify error
      this._notifyListeners("onError", {
        error: error.message,
        timestamp: Date.now()
      });
      
      console.error("Error in summarization:", error);
      throw error;
    }
  }
  
  /**
   * Validate summarization options
   * @param {Object} options - Options to validate
   * @param {boolean} isMultiDocument - Whether multi-document summarization is being used
   * @throws {Error} If options are invalid
   * @private
   */
  validateSummarizationOptions(options, isMultiDocument) {
    // Check method
    if (!['extractive', 'abstractive', 'hybrid'].includes(options.method)) {
      throw new Error(`Invalid summarization method: ${options.method}`);
    }
    
    // Check compression ratio
    if (options.compressionRatio !== undefined && 
        (options.compressionRatio < 0.01 || options.compressionRatio > 0.9)) {
      throw new Error("Compression ratio must be between 0.01 and 0.9");
    }
    
    // Check model availability
    if (options.model !== 'default' && 
        this._models[options.method] && 
        !this._models[options.method][options.model]) {
      throw new Error(`Model ${options.model} is not available for ${options.method} summarization`);
    }
    
    // Check multi-document
    if (isMultiDocument && !this.enableMultiDocument) {
      throw new Error("Multi-document summarization is not enabled");
    }
    
    // Check language
    if (options.language !== this.defaultLanguage && !this.enableMultiLanguage) {
      throw new Error("Multi-language support is not enabled");
    }
    
    // Check domain
    if (options.domain !== 'general' && 
        (!this.enableDomainSpecific || !this.domains[options.domain] || !this.domains[options.domain].enabled)) {
      throw new Error(`Domain-specific summarization for '${options.domain}' is not enabled`);
    }
  }
  
  /**
   * Preprocess text for summarization
   * @param {string} text - Text to preprocess
   * @param {Object} options - Summarization options
   * @returns {Promise<Object>} Processed text data
   * @private
   */
  async preprocessText(text, options) {
    // Validate and clean input
    if (typeof text !== 'string') {
      throw new Error("Content must be a string");
    }
    
    if (text.trim().length === 0) {
      throw new Error("Content cannot be empty");
    }
    
    // Truncate if too long
    let processedText = text;
    if (text.length > this.maxInputLength) {
      processedText = text.substring(0, this.maxInputLength);
      console.warn(`Text exceeded maximum length and was truncated from ${text.length} to ${this.maxInputLength} characters`);
    }
    
    // Clean up text
    processedText = processedText
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    // Perform basic text analysis
    const lines = processedText.split('\n');
    const sentences = this.splitIntoSentences(processedText);
    const words = processedText.split(/\s+/).filter(w => w.length > 0);
    const paragraphs = processedText.split(/\n{2,}/).filter(p => p.trim().length > 0);
    
    // Calculate target summary length based on compression ratio
    let targetLength;
    if (options.maxLength) {
      targetLength = options.maxLength;
    } else if (options.compressionRatio) {
      targetLength = Math.ceil(words.length * options.compressionRatio);
    } else {
      targetLength = Math.ceil(words.length * 0.3); // Default 30% of original
    }
    
    // Adjust target length to respect minimum length
    if (options.minLength && targetLength < options.minLength) {
      targetLength = options.minLength;
    }
    
    return {
      text: processedText,
      analysis: {
        characterCount: processedText.length,
        wordCount: words.length,
        sentenceCount: sentences.length,
        lineCount: lines.length,
        paragraphCount: paragraphs.length
      },
      sentences,
      paragraphs,
      targetLength,
      language: options.language
    };
  }
  
  /**
   * Preprocess multiple documents for summarization
   * @param {Array<string>} documents - Array of documents to summarize
   * @param {Object} options - Summarization options
   * @returns {Promise<Object>} Processed documents data
   * @private
   */
  async preprocessMultiDocument(documents, options) {
    if (!Array.isArray(documents)) {
      throw new Error("Multi-document content must be an array of strings");
    }
    
    if (documents.length === 0) {
      throw new Error("No documents provided for summarization");
    }
    
    // Process each document
    const processedDocuments = [];
    let totalWordCount = 0;
    
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      
      if (typeof document !== 'string') {
        throw new Error(`Document at index ${i} is not a string`);
      }
      
      const processed = await this.preprocessText(document, options);
      processedDocuments.push(processed);
      totalWordCount += processed.analysis.wordCount;
    }
    
    // Calculate overall target length
    let targetLength;
    if (options.maxLength) {
      targetLength = options.maxLength;
    } else if (options.compressionRatio) {
      targetLength = Math.ceil(totalWordCount * options.compressionRatio);
    } else {
      targetLength = Math.ceil(totalWordCount * 0.3); // Default 30% of original
    }
    
    // Adjust target length to respect minimum length
    if (options.minLength && targetLength < options.minLength) {
      targetLength = options.minLength;
    }
    
    return {
      documents: processedDocuments,
      analysis: {
        documentCount: documents.length,
        totalWordCount,
        averageWordCount: Math.floor(totalWordCount / documents.length)
      },
      targetLength,
      language: options.language
    };
  }
  
  /**
   * Split text into sentences
   * @param {string} text - Text to split
   * @returns {Array<string>} Array of sentences
   * @private
   */
  splitIntoSentences(text) {
    // Basic sentence splitting - can be improved for different languages
    return text
      .replace(/([.?!])\s+(?=[A-Z])/g, "$1|")
      .split("|")
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }
  
  /**
   * Summarize text using local extractive method
   * @param {Object} processedContent - Processed content
   * @param {Object} options - Summarization options
   * @returns {Promise<Object>} Summarization result
   * @private
   */
  async summarizeExtractiveLocal(processedContent, options) {
    console.log("Generating extractive summary using local algorithms");
    
    try {
      let sentences, summary;
      
      // Handle multi-document vs single document
      if (processedContent.documents) {
        // Multi-document summarization
        const allSentences = [];
        
        // Collect sentences from all documents
        for (const doc of processedContent.documents) {
          allSentences.push(...doc.sentences);
        }
        
        sentences = allSentences;
      } else {
        // Single document summarization
        sentences = processedContent.sentences;
      }
      
      // Calculate sentence scores based on algorithm
      const scoredSentences = this.scoreSentences(sentences, options);
      
      // Determine how many sentences to include based on target length
      const targetSentenceCount = this.calculateTargetSentenceCount(
        sentences, 
        processedContent.targetLength
      );
      
      // Select top sentences
      const selectedSentences = scoredSentences
        .slice(0, targetSentenceCount)
        .sort((a, b) => a.index - b.index); // Restore original order
      
      // Build summary by joining selected sentences
      summary = selectedSentences.map(s => s.text).join(' ');
      
      const wordCount = summary.split(/\s+/).filter(w => w.length > 0).length;
      
      return {
        summary,
        originalLength: processedContent.documents 
          ? processedContent.analysis.totalWordCount 
          : processedContent.analysis.wordCount,
        summaryLength: wordCount,
        compressionRatio: wordCount / (processedContent.documents 
          ? processedContent.analysis.totalWordCount 
          : processedContent.analysis.wordCount),
        sentences: selectedSentences.length,
        algorithm: options.model === 'default' ? 'textrank' : options.model,
        selectedSentences: selectedSentences.map(s => ({ 
          index: s.index, 
          score: s.score,
          text: s.text.substring(0, 100) + (s.text.length > 100 ? '...' : '')
        }))
      };
    } catch (error) {
      console.error("Error in extractive summarization:", error);
      throw error;
    }
  }
  
  /**
   * Score sentences for extractive summarization
   * @param {Array<string>} sentences - Sentences to score
   * @param {Object} options - Summarization options
   * @returns {Array<Object>} Scored sentences
   * @private
   */
  scoreSentences(sentences, options) {
    // Create a copy of sentences with index
    const indexedSentences = sentences.map((text, index) => ({
      text,
      index,
      score: 0
    }));
    
    // Basic scoring algorithm (TextRank simplified)
    for (let i = 0; i < indexedSentences.length; i++) {
      const sentence = indexedSentences[i];
      const words = sentence.text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
      
      // Score based on position (first and last sentences are important)
      const positionScore = this.getPositionScore(i, sentences.length);
      
      // Score based on sentence length (not too short, not too long)
      const lengthScore = this.getLengthScore(words.length);
      
      // Score based on word frequency
      const frequencyScore = this.getWordFrequencyScore(words, sentences);
      
      // Combine scores with weights
      sentence.score = (positionScore * 0.3) + (lengthScore * 0.2) + (frequencyScore * 0.5);
      
      // Apply domain-specific adjustments if enabled
      if (this.enableDomainSpecific && options.domain !== 'general') {
        sentence.score = this.applyDomainAdjustment(sentence, options.domain);
      }
    }
    
    // Sort by score (descending)
    return [...indexedSentences].sort((a, b) => b.score - a.score);
  }
  
  /**
   * Calculate target sentence count based on target word length
   * @param {Array<string>} sentences - All sentences
   * @param {number} targetWordCount - Target word count
   * @returns {number} Target sentence count
   * @private
   */
  calculateTargetSentenceCount(sentences, targetWordCount) {
    // Calculate average words per sentence
    let totalWords = 0;
    for (const sentence of sentences) {
      totalWords += sentence.split(/\s+/).filter(w => w.length > 0).length;
    }
    
    const avgWordsPerSentence = totalWords / sentences.length;
    
    // Calculate target sentence count
    return Math.max(1, Math.ceil(targetWordCount / avgWordsPerSentence));
  }
  
  /**
   * Get score based on sentence position
   * @param {number} index - Sentence index
   * @param {number} total - Total number of sentences
   * @returns {number} Position score (0-1)
   * @private
   */
  getPositionScore(index, total) {
    // First sentence gets highest score
    if (index === 0) {
      return 1.0;
    }
    
    // Last sentence gets high score
    if (index === total - 1) {
      return 0.8;
    }
    
    // First few sentences get higher scores
    if (index < Math.ceil(total * 0.2)) {
      return 0.7 - (index * 0.1);
    }
    
    // Middle sentences get lower scores
    return 0.3;
  }
  
  /**
   * Get score based on sentence length
   * @param {number} wordCount - Number of words in sentence
   * @returns {number} Length score (0-1)
   * @private
   */
  getLengthScore(wordCount) {
    // Very short sentences are likely not informative
    if (wordCount < 4) {
      return 0.3;
    }
    
    // Medium length sentences are ideal
    if (wordCount >= 5 && wordCount <= 20) {
      return 0.9;
    }
    
    // Long sentences are less ideal but still valuable
    if (wordCount > 20 && wordCount <= 40) {
      return 0.7;
    }
    
    // Very long sentences are less preferred
    return 0.5;
  }
  
  /**
   * Get score based on word frequency
   * @param {Array<string>} words - Words in the sentence
   * @param {Array<string>} allSentences - All sentences
   * @returns {number} Word frequency score (0-1)
   * @private
   */
  getWordFrequencyScore(words, allSentences) {
    // Create word frequency map across all sentences
    const wordFrequencies = {};
    
    for (const sentence of allSentences) {
      const sentenceWords = sentence.toLowerCase().split(/\s+/).filter(w => w.length > 0);
      
      for (const word of sentenceWords) {
        // Skip very short words and common stopwords
        if (word.length <= 2 || this.isStopword(word)) {
          continue;
        }
        
        wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
      }
    }
    
    // Calculate score based on word frequencies
    let totalFrequency = 0;
    let wordCount = 0;
    
    for (const word of words) {
      // Skip very short words and common stopwords
      if (word.length <= 2 || this.isStopword(word)) {
        continue;
      }
      
      totalFrequency += wordFrequencies[word] || 0;
      wordCount++;
    }
    
    // Average frequency score
    return wordCount > 0 ? 
      (totalFrequency / wordCount) / Math.max(...Object.values(wordFrequencies)) : 
      0.3;
  }
  
  /**
   * Check if a word is a stopword
   * @param {string} word - Word to check
   * @returns {boolean} True if stopword
   * @private
   */
  isStopword(word) {
    // Basic English stopwords
    const stopwords = new Set([
      'a', 'an', 'the', 'and', 'or', 'but', 'if', 'because', 'as', 'what',
      'which', 'this', 'that', 'these', 'those', 'then', 'just', 'so', 'than',
      'such', 'both', 'through', 'about', 'for', 'is', 'of', 'while', 'during',
      'to', 'from', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
      'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why',
      'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other',
      'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
      'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should',
      'now'
    ]);
    
    return stopwords.has(word.toLowerCase());
  }
  
  /**
   * Apply domain-specific scoring adjustments
   * @param {Object} sentence - Sentence with score
   * @param {string} domain - Domain name
   * @returns {number} Adjusted score
   * @private
   */
  applyDomainAdjustment(sentence, domain) {
    const text = sentence.text.toLowerCase();
    let score = sentence.score;
    
    switch (domain) {
      case 'academic':
        // Favor sentences with citations and references
        if (text.includes('et al') || /\(\d{4}\)/.test(text) || /\[\d+\]/.test(text)) {
          score *= 1.2;
        }
        break;
        
      case 'news':
        // Favor sentences with quotes and attributions
        if (text.includes('"') || text.includes('"') || text.includes('said') || text.includes('according to')) {
          score *= 1.15;
        }
        break;
        
      case 'legal':
        // Favor sentences with legal terms
        if (text.includes('court') || text.includes('law') || text.includes('legal') || 
            text.includes('ruling') || text.includes('judge') || text.includes('rights')) {
          score *= 1.3;
        }
        break;
        
      case 'medical':
        // Favor sentences with medical terms
        if (text.includes('patient') || text.includes('treatment') || text.includes('clinical') || 
            text.includes('health') || text.includes('medical') || text.includes('disease')) {
          score *= 1.25;
        }
        break;
        
      case 'technical':
        // Favor sentences with technical terms and numbers
        if (/\d+/.test(text) || text.includes('system') || text.includes('algorithm') || 
            text.includes('technology') || text.includes('process')) {
          score *= 1.2;
        }
        break;
        
      case 'financial':
        // Favor sentences with financial terms and numbers
        if (/\$\d+|\d+%/.test(text) || text.includes('market') || text.includes('investment') || 
            text.includes('financial') || text.includes('revenue') || text.includes('profit')) {
          score *= 1.3;
        }
        break;
    }
    
    return score;
  }
  
  /**
   * Summarize text using local abstractive method
   * @param {Object} processedContent - Processed content
   * @param {Object} options - Summarization options
   * @returns {Promise<Object>} Summarization result
   * @private
   */
  async summarizeAbstractiveLocal(processedContent, options) {
    console.log("Generating abstractive summary using local algorithms");
    
    try {
      // Local abstractive summarization is limited without ML models
      // First generate an extractive summary
      const extractiveResult = await this.summarizeExtractiveLocal(processedContent, options);
      
      // Then attempt to "abstract" it by simple transformations
      let abstractiveSummary = extractiveResult.summary;
      
      // Remove redundant phrases
      abstractiveSummary = this.removeRedundancies(abstractiveSummary);
      
      // Connect sentences more fluidly
      abstractiveSummary = this.improveConnections(abstractiveSummary);
      
      const wordCount = abstractiveSummary.split(/\s+/).filter(w => w.length > 0).length;
      
      return {
        summary: abstractiveSummary,
        originalLength: processedContent.documents
          ? processedContent.analysis.totalWordCount
          : processedContent.analysis.wordCount,
        summaryLength: wordCount,
        compressionRatio: wordCount / (processedContent.documents
          ? processedContent.analysis.totalWordCount
          : processedContent.analysis.wordCount),
        algorithm: 'local-abstractive',
        extractiveBase: true
      };
    } catch (error) {
      console.error("Error in abstractive summarization:", error);
      throw error;
    }
  }
  
  /**
   * Remove redundant phrases from text
   * @param {string} text - Text to process
   * @returns {string} Processed text
   * @private
   */
  removeRedundancies(text) {
    // Split into sentences
    const sentences = this.splitIntoSentences(text);
    
    // Track phrases to detect redundancy
    const seenPhrases = new Set();
    const filteredSentences = [];
    
    for (const sentence of sentences) {
      // Extract key phrases (3-5 word sequences)
      const words = sentence.split(/\s+/).filter(w => w.length > 0);
      let isRedundant = false;
      
      // Check for redundancy in longer phrases
      for (let i = 0; i < words.length - 4; i++) {
        const phrase = words.slice(i, i + 5).join(' ').toLowerCase();
        
        if (seenPhrases.has(phrase)) {
          isRedundant = true;
          break;
        }
        
        seenPhrases.add(phrase);
      }
      
      // Keep non-redundant sentences
      if (!isRedundant) {
        filteredSentences.push(sentence);
      }
    }
    
    return filteredSentences.join(' ');
  }
  
  /**
   * Improve connections between sentences
   * @param {string} text - Text to process
   * @returns {string} Processed text
   * @private
   */
  improveConnections(text) {
    // Split into sentences
    const sentences = this.splitIntoSentences(text);
    
    // Skip if only one sentence
    if (sentences.length <= 1) {
      return text;
    }
    
    // Common transition words to remove from sentence beginnings
    const transitionWords = [
      'however', 'furthermore', 'moreover', 'additionally', 'consequently',
      'therefore', 'thus', 'hence', 'accordingly', 'as a result'
    ];
    
    // Process sentences
    for (let i = 1; i < sentences.length; i++) {
      const sentence = sentences[i];
      const lowerSentence = sentence.toLowerCase();
      
      // Remove transition words at the beginning
      for (const word of transitionWords) {
        if (lowerSentence.startsWith(word)) {
          sentences[i] = sentence.substring(word.length).trim();
          
          // Capitalize first letter if needed
          if (sentences[i].length > 0) {
            sentences[i] = sentences[i].charAt(0).toUpperCase() + sentences[i].slice(1);
          }
          
          break;
        }
      }
    }
    
    return sentences.join(' ');
  }
  
  /**
   * Summarize text using hybrid (extractive + abstractive) method
   * @param {Object} processedContent - Processed content
   * @param {Object} options - Summarization options
   * @returns {Promise<Object>} Summarization result
   * @private
   */
  async summarizeHybridLocal(processedContent, options) {
    console.log("Generating hybrid summary using local algorithms");
    
    try {
      // First generate an extractive summary with higher compression ratio
      const extractiveOptions = { 
        ...options, 
        method: 'extractive',
        compressionRatio: options.compressionRatio * 1.5 // More content for refinement
      };
      
      const extractiveResult = await this.summarizeExtractiveLocal(processedContent, extractiveOptions);
      
      // Then refine it using abstractive techniques
      const abstractiveOptions = {
        ...options,
        method: 'abstractive'
      };
      
      // Create a new processed content object with the extractive summary
      const refinementContent = await this.preprocessText(extractiveResult.summary, abstractiveOptions);
      
      // Apply abstractive summarization
      const abstractiveResult = await this.summarizeAbstractiveLocal(refinementContent, abstractiveOptions);
      
      return {
        summary: abstractiveResult.summary,
        originalLength: processedContent.documents
          ? processedContent.analysis.totalWordCount
          : processedContent.analysis.wordCount,
        summaryLength: abstractiveResult.summaryLength,
        compressionRatio: abstractiveResult.summaryLength / (processedContent.documents
          ? processedContent.analysis.totalWordCount
          : processedContent.analysis.wordCount),
        algorithm: 'hybrid-local',
        extractiveBase: true
      };
    } catch (error) {
      console.error("Error in hybrid summarization:", error);
      throw error;
    }
  }
  
  /**
   * Summarize text using OpenAI
   * @param {Object} processedContent - Processed content
   * @param {Object} options - Summarization options
   * @returns {Promise<Object>} Summarization result
   * @private
   */
  async summarizeWithOpenAI(processedContent, options) {
    // Ensure we have an API key
    if (!this.apiKeys.openai) {
      throw new Error("OpenAI API key is required");
    }
    
    try {
      console.log(`Generating summary with OpenAI using model: ${options.model}`);
      
      // Prepare the text
      let text;
      if (processedContent.documents) {
        // Join multiple documents with clear separation
        text = processedContent.documents.map(
          (doc, i) => `Document ${i + 1}:\n${doc.text}`
        ).join('\n\n');
      } else {
        text = processedContent.text;
      }
      
      // Prepare prompt based on summarization method and domain
      let prompt = '';
      
      if (options.method === 'extractive') {
        prompt = `Extract the most important sentences from the following ${options.domain} text to create a summary. Do not generate new sentences.`;
      } else if (options.method === 'abstractive') {
        prompt = `Create a concise, coherent summary of the following ${options.domain} text in your own words.`;
      } else { // hybrid
        prompt = `Create a comprehensive yet concise summary of the following ${options.domain} text, preserving key information while reformulating for clarity.`;
      }
      
      // Add length guidance
      prompt += ` The summary should be approximately ${processedContent.targetLength} words in length.`;
      
      // Add domain-specific instructions
      prompt += this.getDomainSpecificInstructions(options.domain);
      
      // Prepare the API request
      const apiEndpoint = "https://api.openai.com/v1/chat/completions";
      
      const requestBody = {
        model: options.model === 'default' ? 'gpt-4o' : options.model,
        messages: [
          {
            role: "system",
            content: prompt
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.3, // Lower temperature for more deterministic summaries
        max_tokens: Math.min(4000, Math.ceil(processedContent.targetLength * 10))
      };
      
      // Make the API request
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKeys.openai}`
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      const summary = data.choices[0].message.content.trim();
      
      // Count words in summary
      const wordCount = summary.split(/\s+/).filter(w => w.length > 0).length;
      
      return {
        summary,
        originalLength: processedContent.documents
          ? processedContent.analysis.totalWordCount
          : processedContent.analysis.wordCount,
        summaryLength: wordCount,
        compressionRatio: wordCount / (processedContent.documents
          ? processedContent.analysis.totalWordCount
          : processedContent.analysis.wordCount),
        model: requestBody.model,
        method: options.method,
        apiResponse: {
          model: data.model,
          usage: data.usage
        }
      };
    } catch (error) {
      console.error("OpenAI summarization error:", error);
      throw error;
    }
  }
  
  /**
   * Summarize text using Azure OpenAI
   * @param {Object} processedContent - Processed content
   * @param {Object} options - Summarization options
   * @returns {Promise<Object>} Summarization result
   * @private
   */
  async summarizeWithAzure(processedContent, options) {
    // Ensure we have an API key
    if (!this.apiKeys.azure) {
      throw new Error("Azure OpenAI API key is required");
    }
    
    try {
      console.log(`Generating summary with Azure OpenAI using model: ${options.model}`);
      
      // Prepare the text
      let text;
      if (processedContent.documents) {
        // Join multiple documents with clear separation
        text = processedContent.documents.map(
          (doc, i) => `Document ${i + 1}:\n${doc.text}`
        ).join('\n\n');
      } else {
        text = processedContent.text;
      }
      
      // Prepare prompt based on summarization method and domain
      let prompt = '';
      
      if (options.method === 'extractive') {
        prompt = `Extract the most important sentences from the following ${options.domain} text to create a summary. Do not generate new sentences.`;
      } else if (options.method === 'abstractive') {
        prompt = `Create a concise, coherent summary of the following ${options.domain} text in your own words.`;
      } else { // hybrid
        prompt = `Create a comprehensive yet concise summary of the following ${options.domain} text, preserving key information while reformulating for clarity.`;
      }
      
      // Add length guidance
      prompt += ` The summary should be approximately ${processedContent.targetLength} words in length.`;
      
      // Add domain-specific instructions
      prompt += this.getDomainSpecificInstructions(options.domain);
      
      // In a real implementation, this would use the Azure OpenAI SDK
      // For this example, we'll simulate with a response
      
      // Simulate Azure OpenAI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a plausible summary based on the content
      let summary;
      if (processedContent.documents) {
        summary = `This is a simulated summary of multiple documents using ${options.method} method with Azure OpenAI. The summary would cover key points from all ${processedContent.documents.length} documents, focusing on ${options.domain} domain specific elements. In a real implementation, this would be a coherent summary of approximately ${processedContent.targetLength} words.`;
      } else {
        const firstSentences = processedContent.sentences.slice(0, 3).join(' ');
        summary = `This is a simulated summary using ${options.method} method with Azure OpenAI. It would start with key information like: ${firstSentences} ...and continue with other important points from the text. In a real implementation, this would be a coherent summary of approximately ${processedContent.targetLength} words.`;
      }
      
      // Count words in summary
      const wordCount = summary.split(/\s+/).filter(w => w.length > 0).length;
      
      return {
        summary,
        originalLength: processedContent.documents
          ? processedContent.analysis.totalWordCount
          : processedContent.analysis.wordCount,
        summaryLength: wordCount,
        compressionRatio: wordCount / (processedContent.documents
          ? processedContent.analysis.totalWordCount
          : processedContent.analysis.wordCount),
        model: options.model === 'default' ? 'gpt-4' : options.model,
        method: options.method,
        simulated: true
      };
    } catch (error) {
      console.error("Azure OpenAI summarization error:", error);
      throw error;
    }
  }
  
  /**
   * Summarize text using Google AI
   * @param {Object} processedContent - Processed content
   * @param {Object} options - Summarization options
   * @returns {Promise<Object>} Summarization result
   * @private
   */
  async summarizeWithGoogle(processedContent, options) {
    // Ensure we have an API key
    if (!this.apiKeys.google) {
      throw new Error("Google API key is required");
    }
    
    try {
      console.log(`Generating summary with Google AI using model: ${options.model}`);
      
      // Prepare the text
      let text;
      if (processedContent.documents) {
        // Join multiple documents with clear separation
        text = processedContent.documents.map(
          (doc, i) => `Document ${i + 1}:\n${doc.text}`
        ).join('\n\n');
      } else {
        text = processedContent.text;
      }
      
      // Prepare prompt based on summarization method and domain
      let prompt = '';
      
      if (options.method === 'extractive') {
        prompt = `Extract the most important sentences from the following ${options.domain} text to create a summary. Do not generate new sentences.`;
      } else if (options.method === 'abstractive') {
        prompt = `Create a concise, coherent summary of the following ${options.domain} text in your own words.`;
      } else { // hybrid
        prompt = `Create a comprehensive yet concise summary of the following ${options.domain} text, preserving key information while reformulating for clarity.`;
      }
      
      // Add length guidance
      prompt += ` The summary should be approximately ${processedContent.targetLength} words in length.`;
      
      // Add domain-specific instructions
      prompt += this.getDomainSpecificInstructions(options.domain);
      
      // In a real implementation, this would use the Google Generative AI SDK
      // For this example, we'll simulate with a response
      
      // Simulate Google AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a plausible summary based on the content
      let summary;
      if (processedContent.documents) {
        summary = `This is a simulated summary of multiple documents using ${options.method} method with Google AI. The summary would cover key points from all ${processedContent.documents.length} documents, focusing on ${options.domain} domain specific elements. In a real implementation, this would be a coherent summary of approximately ${processedContent.targetLength} words.`;
      } else {
        const firstSentences = processedContent.sentences.slice(0, 3).join(' ');
        summary = `This is a simulated summary using ${options.method} method with Google AI. It would start with key information like: ${firstSentences} ...and continue with other important points from the text. In a real implementation, this would be a coherent summary of approximately ${processedContent.targetLength} words.`;
      }
      
      // Count words in summary
      const wordCount = summary.split(/\s+/).filter(w => w.length > 0).length;
      
      return {
        summary,
        originalLength: processedContent.documents
          ? processedContent.analysis.totalWordCount
          : processedContent.analysis.wordCount,
        summaryLength: wordCount,
        compressionRatio: wordCount / (processedContent.documents
          ? processedContent.analysis.totalWordCount
          : processedContent.analysis.wordCount),
        model: options.model === 'default' ? 'gemini-pro' : options.model,
        method: options.method,
        simulated: true
      };
    } catch (error) {
      console.error("Google AI summarization error:", error);
      throw error;
    }
  }
  
  /**
   * Summarize text using custom provider
   * @param {Object} processedContent - Processed content
   * @param {Object} options - Summarization options
   * @returns {Promise<Object>} Summarization result
   * @private
   */
  async summarizeWithCustomProvider(processedContent, options) {
    // Use custom provider implementation
    if (!this._customConfig || !this._customConfig.summarize) {
      throw new Error("Custom provider missing summarize function");
    }
    
    try {
      // Call custom summarize function
      const result = await this._customConfig.summarize(processedContent, options);
      
      return {
        success: true,
        provider: 'custom',
        ...result
      };
    } catch (error) {
      console.error("Error in custom summarization:", error);
      throw error;
    }
  }
  
  /**
   * Extract key points from text
   * @param {Object} processedContent - Processed content
   * @param {string} summary - Generated summary
   * @param {Object} options - Summarization options
   * @returns {Promise<Array<string>>} Extracted key points
   * @private
   */
  async extractKeyPoints(processedContent, summary, options) {
    try {
      console.log("Extracting key points from text");
      
      let keyPoints = [];
      
      // Extract key points based on provider
      switch (this.provider) {
        case 'local':
          keyPoints = await this.extractKeyPointsLocal(processedContent, summary, options);
          break;
          
        case 'openai':
          keyPoints = await this.extractKeyPointsOpenAI(processedContent, summary, options);
          break;
          
        case 'azure':
        case 'google':
        case 'custom':
          // Default to local method for other providers
          keyPoints = await this.extractKeyPointsLocal(processedContent, summary, options);
          break;
      }
      
      return keyPoints;
    } catch (error) {
      console.error("Error extracting key points:", error);
      // Return empty array on error to avoid breaking the main summarization
      return [];
    }
  }
  
  /**
   * Extract key points using local methods
   * @param {Object} processedContent - Processed content
   * @param {string} summary - Generated summary
   * @param {Object} options - Summarization options
   * @returns {Promise<Array<string>>} Extracted key points
   * @private
   */
  async extractKeyPointsLocal(processedContent, summary, options) {
    // Split summary into sentences
    const summarySentences = this.splitIntoSentences(summary);
    
    // Target number of key points (3-7 based on content length)
    const targetKeyPoints = Math.min(
      7,
      Math.max(
        3,
        Math.ceil(summarySentences.length / 3)
      )
    );
    
    // Score sentences using the same algorithm as extractive summarization
    const scoredSentences = this.scoreSentences(summarySentences, options);
    
    // Select top sentences as key points
    const selectedSentences = scoredSentences
      .slice(0, targetKeyPoints)
      .sort((a, b) => a.index - b.index);
    
    // Convert sentences to bullet points
    return selectedSentences.map(sentence => {
      let point = sentence.text.trim();
      
      // Remove transition words at beginning
      const transitionWords = [
        'however', 'furthermore', 'moreover', 'additionally', 'consequently',
        'therefore', 'thus', 'hence', 'accordingly', 'as a result'
      ];
      
      const lowerPoint = point.toLowerCase();
      for (const word of transitionWords) {
        if (lowerPoint.startsWith(word)) {
          point = point.substring(word.length).trim();
          // Capitalize first letter
          point = point.charAt(0).toUpperCase() + point.slice(1);
          break;
        }
      }
      
      return point;
    });
  }
  
  /**
   * Extract key points using OpenAI
   * @param {Object} processedContent - Processed content
   * @param {string} summary - Generated summary
   * @param {Object} options - Summarization options
   * @returns {Promise<Array<string>>} Extracted key points
   * @private
   */
  async extractKeyPointsOpenAI(processedContent, summary, options) {
    // Ensure we have an API key
    if (!this.apiKeys.openai) {
      // Fall back to local method
      return this.extractKeyPointsLocal(processedContent, summary, options);
    }
    
    try {
      // Prepare prompt
      const prompt = `Extract 3-7 key points from the following summary of ${options.domain} content. Return the points as a bulleted list, starting each point with a hyphen (-).`;
      
      // Prepare the API request
      const apiEndpoint = "https://api.openai.com/v1/chat/completions";
      
      const requestBody = {
        model: options.model === 'default' ? 'gpt-4o' : options.model,
        messages: [
          {
            role: "system",
            content: prompt
          },
          {
            role: "user",
            content: summary
          }
        ],
        temperature: 0.3
      };
      
      // Make the API request
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKeys.openai}`
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      const keyPointsText = data.choices[0].message.content.trim();
      
      // Parse bulleted list
      return keyPointsText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-') || line.startsWith('*') || /^\d+\./.test(line))
        .map(line => {
          // Remove bullet or number and trim
          return line.replace(/^[-*]\s+|^\d+\.\s+/, '').trim();
        })
        .filter(point => point.length > 0);
    } catch (error) {
      console.error("OpenAI key point extraction error:", error);
      // Fall back to local method
      return this.extractKeyPointsLocal(processedContent, summary, options);
    }
  }
  
  /**
   * Get domain-specific instructions for AI prompts
   * @param {string} domain - Domain name
   * @returns {string} Domain-specific instructions
   * @private
   */
  getDomainSpecificInstructions(domain) {
    switch (domain) {
      case 'academic':
        return " Focus on research findings, methodologies, and theoretical contributions. Preserve citations where appropriate.";
        
      case 'news':
        return " Focus on the key events, individuals involved, and the most significant details. Include relevant dates and locations.";
        
      case 'legal':
        return " Focus on legal principles, rulings, precedents, and implications. Maintain precise legal terminology.";
        
      case 'medical':
        return " Focus on medical findings, treatments, clinical implications, and patient outcomes. Maintain precise medical terminology.";
        
      case 'technical':
        return " Focus on technical specifications, methodologies, algorithms, and results. Preserve important technical details and metrics.";
        
      case 'financial':
        return " Focus on financial figures, market trends, investment implications, and economic factors. Include relevant percentages and monetary values.";
        
      case 'general':
      default:
        return "";
    }
  }
  
  /**
   * Get cache key for summarization options
   * @param {string|Array<string>} content - Content to summarize
   * @param {Object} options - Summarization options
   * @returns {string} Cache key
   * @private
   */
  getCacheKey(content, options) {
    // Create a unique key based on content and options
    const contentHash = typeof content === 'string' ? 
      this.hashString(content) : 
      this.hashString(content.join('|'));
    
    const optionsKey = JSON.stringify({
      method: options.method,
      model: options.model,
      compressionRatio: options.compressionRatio,
      language: options.language,
      domain: options.domain
    });
    
    return `${contentHash}|${this.hashString(optionsKey)}`;
  }
  
  /**
   * Create a simple hash of a string
   * @param {string} str - String to hash
   * @returns {string} Hashed string
   * @private
   */
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
  }
  
  /**
   * Generate a unique summarization ID
   * @returns {string} Summarization ID
   * @private
   */
  generateSummarizationId() {
    return `sum_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
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
   * Generate a unique listener ID
   * @returns {string} Listener ID
   * @private
   */
  generateListenerId() {
    return `listener_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  
  /**
   * Get current configuration
   * @returns {Object} Current configuration
   */
  getConfiguration() {
    return {
      version: this.version,
      initialized: this.initialized,
      provider: this.provider,
      settings: {
        defaultMethod: this.defaultMethod,
        defaultModel: this.defaultModel,
        defaultCompressionRatio: this.defaultCompressionRatio,
        maxInputLength: this.maxInputLength,
        defaultLanguage: this.defaultLanguage
      },
      features: {
        keyPointExtraction: this.enableKeyPointExtraction,
        customParams: this.enableCustomParams,
        multiDocument: this.enableMultiDocument,
        multiLanguage: this.enableMultiLanguage,
        domainSpecific: this.enableDomainSpecific
      },
      domains: Object.fromEntries(
        Object.entries(this.domains)
          .map(([domain, settings]) => [domain, settings.enabled])
      ),
      models: this._models,
      cacheSize: Object.keys(this._cache).length
    };
  }
}

// Export the class for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdvancedTextSummarization;
} else if (typeof window !== 'undefined') {
  window.AdvancedTextSummarization = AdvancedTextSummarization;
}
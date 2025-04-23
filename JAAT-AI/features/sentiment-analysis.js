/**
 * JAAT-AI Feature: Sentiment Analysis
 * Version: 1.0.0
 * 
 * This module provides advanced sentiment analysis capabilities including:
 * - Text sentiment scoring (positive/negative/neutral)
 * - Emotion detection (joy, anger, sadness, fear, etc.)
 * - Opinion mining and aspect-based sentiment analysis
 * - Real-time sentiment tracking
 * - Multi-language sentiment analysis
 * - Visual sentiment indicators
 * - Context-aware sentiment detection
 */

class SentimentAnalysis {
  constructor() {
    // Core properties
    this.version = "1.0.0";
    this.initialized = false;
    
    // Analysis configuration
    this.analysisProvider = "local"; // local, openai, azure, custom
    this.analysisMode = "standard"; // standard, detailed, academic, social
    this.language = "en"; // ISO language code
    this.sensitivityLevel = "medium"; // low, medium, high
    
    // Features
    this.enableEmotionDetection = true;
    this.enableAspectBasedAnalysis = true;
    this.enableContextAwareness = true;
    this.enableMultiLanguage = true;
    this.enableRealtimeAnalysis = true;
    this.enableSarcasmDetection = false; // Advanced feature, disabled by default
    
    // Analysis settings
    this.confidenceThreshold = 0.6; // Minimum confidence for results
    this.maxTextLength = 5000; // Maximum text length for analysis
    this.contextWindowSize = 3; // Number of previous texts to consider for context
    this.customCategories = []; // Custom sentiment categories
    this.domainSpecificVocabulary = {}; // Domain-specific sentiment words
    
    // Performance settings
    this.cacheSentimentResults = true;
    this.maxCacheSize = 1000;
    this.batchProcessingEnabled = true;
    this.batchSize = 10;
    
    // API keys (should be set securely)
    this.apiKeys = {};
    
    // Internal state
    this._analysisCache = {};
    this._contextHistory = [];
    this._currentAnalysis = null;
    this._analysisBatch = [];
    this._processingBatch = false;
    this._analyzerModels = {};
    this._emotionModels = {};
    this._listeners = {
      onAnalysisComplete: [],
      onEmotionDetected: [],
      onContextUpdate: [],
      onError: []
    };
    this._defaultSentimentLexicon = this.getDefaultSentimentLexicon();
    this._defaultEmotionLexicon = this.getDefaultEmotionLexicon();
    this._analysisProviders = {};
  }
  
  /**
   * Initialize the sentiment analysis system
   * @param {Object} options - Configuration options
   * @returns {Promise<boolean>} Success status
   */
  async initialize(options = {}) {
    try {
      console.log("Initializing Sentiment Analysis system...");
      
      // Apply custom options
      if (options.analysisProvider) this.analysisProvider = options.analysisProvider;
      if (options.analysisMode) this.analysisMode = options.analysisMode;
      if (options.language) this.language = options.language;
      if (options.sensitivityLevel) this.sensitivityLevel = options.sensitivityLevel;
      if (options.enableEmotionDetection !== undefined) this.enableEmotionDetection = options.enableEmotionDetection;
      if (options.enableAspectBasedAnalysis !== undefined) this.enableAspectBasedAnalysis = options.enableAspectBasedAnalysis;
      if (options.enableContextAwareness !== undefined) this.enableContextAwareness = options.enableContextAwareness;
      if (options.enableMultiLanguage !== undefined) this.enableMultiLanguage = options.enableMultiLanguage;
      if (options.enableRealtimeAnalysis !== undefined) this.enableRealtimeAnalysis = options.enableRealtimeAnalysis;
      if (options.enableSarcasmDetection !== undefined) this.enableSarcasmDetection = options.enableSarcasmDetection;
      if (options.confidenceThreshold !== undefined) this.confidenceThreshold = options.confidenceThreshold;
      if (options.maxTextLength !== undefined) this.maxTextLength = options.maxTextLength;
      if (options.contextWindowSize !== undefined) this.contextWindowSize = options.contextWindowSize;
      if (options.customCategories) this.customCategories = options.customCategories;
      if (options.domainSpecificVocabulary) this.domainSpecificVocabulary = options.domainSpecificVocabulary;
      if (options.cacheSentimentResults !== undefined) this.cacheSentimentResults = options.cacheSentimentResults;
      if (options.maxCacheSize !== undefined) this.maxCacheSize = options.maxCacheSize;
      if (options.batchProcessingEnabled !== undefined) this.batchProcessingEnabled = options.batchProcessingEnabled;
      if (options.batchSize !== undefined) this.batchSize = options.batchSize;
      if (options.apiKeys) this.apiKeys = {...this.apiKeys, ...options.apiKeys};
      
      // Initialize analyzers
      await this.initializeAnalyzers();
      
      // Initialize emotion detection if enabled
      if (this.enableEmotionDetection) {
        await this.initializeEmotionDetection();
      }
      
      // Initialize custom vocabularies if provided
      if (Object.keys(this.domainSpecificVocabulary).length > 0) {
        this.initializeDomainVocabulary();
      }
      
      // Load models for selected provider
      await this.loadModels();
      
      this.initialized = true;
      console.log("Sentiment Analysis system initialized successfully.");
      return true;
    } catch (error) {
      console.error("Failed to initialize Sentiment Analysis:", error);
      return false;
    }
  }
  
  /**
   * Initialize sentiment analyzers
   * @returns {Promise<void>}
   * @private
   */
  async initializeAnalyzers() {
    // Initialize different analysis providers
    
    // Local lexicon-based analyzer
    this._analysisProviders.local = {
      name: "Local Lexicon Analyzer",
      type: "lexicon-based",
      supportedLanguages: ["en", "es", "fr", "de", "it", "pt", "nl"],
      supportedModes: ["standard", "detailed"],
      maxTextLength: 10000,
      
      /**
       * Analyze text sentiment using lexicon-based approach
       * @param {string} text - Text to analyze
       * @param {Object} options - Analysis options
       * @returns {Promise<Object>} Analysis result
       */
      analyze: async (text, options = {}) => {
        try {
          // Prepare text
          const processedText = this.preprocessText(text);
          const words = processedText.split(/\s+/);
          
          // Get appropriate lexicon based on language
          const language = options.language || this.language;
          const lexicon = this._defaultSentimentLexicon[language] || this._defaultSentimentLexicon.en;
          
          // Add domain-specific vocabulary if available
          const domainLexicon = this.domainSpecificVocabulary[options.domain] || {};
          const combinedLexicon = {...lexicon, ...domainLexicon};
          
          // Calculate sentiment scores
          let positiveScore = 0;
          let negativeScore = 0;
          let neutralScore = 0;
          
          // Track sentiment-bearing words
          const positiveWords = [];
          const negativeWords = [];
          const neutralWords = [];
          
          // Process each word
          for (const word of words) {
            if (!word) continue;
            
            const lowerWord = word.toLowerCase();
            
            if (combinedLexicon[lowerWord]) {
              const score = combinedLexicon[lowerWord];
              
              if (score > 0) {
                positiveScore += score;
                positiveWords.push(word);
              } else if (score < 0) {
                negativeScore += Math.abs(score);
                negativeWords.push(word);
              } else {
                neutralScore += 1;
                neutralWords.push(word);
              }
            }
          }
          
          // Apply sensitivity adjustment
          const sensitivityFactor = this.getSensitivityFactor();
          positiveScore *= sensitivityFactor;
          negativeScore *= sensitivityFactor;
          
          // Calculate compound score (-1 to +1)
          const totalScore = positiveScore + negativeScore;
          let compoundScore = 0;
          
          if (totalScore > 0) {
            compoundScore = (positiveScore - negativeScore) / totalScore;
          }
          
          // Determine sentiment label
          let sentiment = "neutral";
          if (compoundScore >= 0.05) {
            sentiment = "positive";
          } else if (compoundScore <= -0.05) {
            sentiment = "negative";
          }
          
          // Calculate confidence
          const confidence = Math.min(0.99, Math.abs(compoundScore) + 0.5);
          
          // Create result
          const result = {
            text,
            sentiment,
            scores: {
              positive: positiveScore / (totalScore || 1),
              negative: negativeScore / (totalScore || 1),
              neutral: neutralScore / words.length,
              compound: compoundScore
            },
            confidence,
            sentimentWords: {
              positive: positiveWords,
              negative: negativeWords,
              neutral: neutralWords
            },
            provider: "local"
          };
          
          // Add detailed analysis if requested
          if (options.mode === "detailed" || this.analysisMode === "detailed") {
            result.details = {
              wordCount: words.length,
              sentimentBearingWordCount: positiveWords.length + negativeWords.length + neutralWords.length,
              sentimentRatio: (positiveWords.length + negativeWords.length) / (words.length || 1),
              intensity: Math.abs(compoundScore),
              topPositiveWords: this.getTopScoringWords(positiveWords, combinedLexicon, 5),
              topNegativeWords: this.getTopScoringWords(negativeWords, combinedLexicon, 5, true)
            };
          }
          
          return result;
        } catch (error) {
          console.error("Local sentiment analysis error:", error);
          throw error;
        }
      },
      
      /**
       * Batch analyze multiple texts
       * @param {Array<string>} texts - Array of texts to analyze
       * @param {Object} options - Analysis options
       * @returns {Promise<Array<Object>>} Analysis results
       */
      batchAnalyze: async (texts, options = {}) => {
        try {
          // Process each text
          const results = await Promise.all(
            texts.map(text => this._analysisProviders.local.analyze(text, options))
          );
          
          return results;
        } catch (error) {
          console.error("Local batch sentiment analysis error:", error);
          throw error;
        }
      }
    };
    
    // OpenAI-based analyzer
    this._analysisProviders.openai = {
      name: "OpenAI Analyzer",
      type: "ai-based",
      supportedLanguages: ["en", "es", "fr", "de", "it", "pt", "zh", "ja", "ko", "ru", "ar"],
      supportedModes: ["standard", "detailed", "academic", "social"],
      maxTextLength: 4000,
      
      /**
       * Analyze text sentiment using OpenAI API
       * @param {string} text - Text to analyze
       * @param {Object} options - Analysis options
       * @returns {Promise<Object>} Analysis result
       */
      analyze: async (text, options = {}) => {
        if (!this.apiKeys.openai) {
          throw new Error("OpenAI API key not configured");
        }
        
        try {
          // Prepare system prompt based on mode
          let systemPrompt = "You are a sentiment analysis expert. ";
          
          if (options.mode === "academic" || this.analysisMode === "academic") {
            systemPrompt += "Analyze the sentiment of the following text using academic research methods with fine-grained analysis.";
          } else if (options.mode === "social" || this.analysisMode === "social") {
            systemPrompt += "Analyze the sentiment of the following text in the context of social media communication.";
          } else if (options.mode === "detailed" || this.analysisMode === "detailed") {
            systemPrompt += "Provide a detailed sentiment analysis of the following text.";
          } else {
            systemPrompt += "Analyze the sentiment of the following text.";
          }
          
          systemPrompt += " Return JSON with the following structure: { sentiment: \"positive\"|\"negative\"|\"neutral\", scores: { positive: number, negative: number, neutral: number, compound: number }, confidence: number, analysis: string }";
          
          // Make API request
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.apiKeys.openai}`
            },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: [
                {
                  role: "system",
                  content: systemPrompt
                },
                {
                  role: "user",
                  content: text
                }
              ],
              temperature: 0.3,
              response_format: { type: "json_object" }
            })
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`OpenAI API Error: ${errorData.error?.message || response.statusText}`);
          }
          
          const data = await response.json();
          
          if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
            throw new Error("No analysis returned from OpenAI API");
          }
          
          // Parse the JSON response
          const analysisResult = JSON.parse(data.choices[0].message.content);
          
          // Create standardized result
          const result = {
            text,
            sentiment: analysisResult.sentiment,
            scores: {
              positive: analysisResult.scores.positive,
              negative: analysisResult.scores.negative,
              neutral: analysisResult.scores.neutral,
              compound: analysisResult.scores.compound
            },
            confidence: analysisResult.confidence,
            analysis: analysisResult.analysis,
            provider: "openai"
          };
          
          return result;
        } catch (error) {
          console.error("OpenAI sentiment analysis error:", error);
          throw error;
        }
      }
    };
    
    // Azure Text Analytics-based analyzer
    this._analysisProviders.azure = {
      name: "Azure Text Analytics",
      type: "api-based",
      supportedLanguages: ["en", "es", "fr", "de", "it", "pt", "zh", "ja", "nl", "ar"],
      supportedModes: ["standard", "detailed"],
      maxTextLength: 5000,
      
      /**
       * Analyze text sentiment using Azure Text Analytics API
       * @param {string} text - Text to analyze
       * @param {Object} options - Analysis options
       * @returns {Promise<Object>} Analysis result
       */
      analyze: async (text, options = {}) => {
        if (!this.apiKeys.azure) {
          throw new Error("Azure Text Analytics API key not configured");
        }
        
        try {
          const endpoint = this.apiKeys.azureEndpoint || "https://api.cognitive.microsofttranslator.com";
          const region = this.apiKeys.azureRegion || "global";
          
          // Make API request
          const response = await fetch(`${endpoint}/text/analytics/v3.1/sentiment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key': this.apiKeys.azure,
              'Ocp-Apim-Subscription-Region': region
            },
            body: JSON.stringify({
              documents: [
                {
                  id: "1",
                  language: options.language || this.language,
                  text: text
                }
              ]
            })
          });
          
          if (!response.ok) {
            throw new Error(`Azure Text Analytics API Error: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (!data.documents || data.documents.length === 0) {
            throw new Error("No analysis returned from Azure API");
          }
          
          const azureResult = data.documents[0];
          
          // Map Azure sentiment to our standard format
          const sentiment = azureResult.sentiment;
          
          // Create standardized result
          const result = {
            text,
            sentiment,
            scores: {
              positive: azureResult.confidenceScores.positive,
              negative: azureResult.confidenceScores.negative,
              neutral: azureResult.confidenceScores.neutral,
              compound: azureResult.confidenceScores.positive - azureResult.confidenceScores.negative
            },
            confidence: Math.max(
              azureResult.confidenceScores.positive,
              azureResult.confidenceScores.negative,
              azureResult.confidenceScores.neutral
            ),
            provider: "azure"
          };
          
          // Add sentence-level analysis for detailed mode
          if (options.mode === "detailed" || this.analysisMode === "detailed") {
            result.details = {
              sentences: azureResult.sentences.map(sentence => ({
                text: sentence.text,
                sentiment: sentence.sentiment,
                scores: {
                  positive: sentence.confidenceScores.positive,
                  negative: sentence.confidenceScores.negative,
                  neutral: sentence.confidenceScores.neutral
                }
              }))
            };
            
            // Extract aspects if available
            if (azureResult.aspects && azureResult.aspects.length > 0) {
              result.aspects = azureResult.aspects.map(aspect => ({
                text: aspect.text,
                sentiment: aspect.sentiment,
                confidence: aspect.confidenceScores[aspect.sentiment]
              }));
            }
          }
          
          return result;
        } catch (error) {
          console.error("Azure sentiment analysis error:", error);
          throw error;
        }
      },
      
      /**
       * Batch analyze multiple texts
       * @param {Array<string>} texts - Array of texts to analyze
       * @param {Object} options - Analysis options
       * @returns {Promise<Array<Object>>} Analysis results
       */
      batchAnalyze: async (texts, options = {}) => {
        if (!this.apiKeys.azure) {
          throw new Error("Azure Text Analytics API key not configured");
        }
        
        try {
          const endpoint = this.apiKeys.azureEndpoint || "https://api.cognitive.microsofttranslator.com";
          const region = this.apiKeys.azureRegion || "global";
          
          // Prepare documents for batch analysis
          const documents = texts.map((text, index) => ({
            id: String(index + 1),
            language: options.language || this.language,
            text
          }));
          
          // Make API request
          const response = await fetch(`${endpoint}/text/analytics/v3.1/sentiment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key': this.apiKeys.azure,
              'Ocp-Apim-Subscription-Region': region
            },
            body: JSON.stringify({
              documents
            })
          });
          
          if (!response.ok) {
            throw new Error(`Azure Text Analytics API Error: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (!data.documents || data.documents.length === 0) {
            throw new Error("No analysis returned from Azure API");
          }
          
          // Map results to our standard format
          const results = data.documents.map((doc, index) => {
            const result = {
              text: texts[index],
              sentiment: doc.sentiment,
              scores: {
                positive: doc.confidenceScores.positive,
                negative: doc.confidenceScores.negative,
                neutral: doc.confidenceScores.neutral,
                compound: doc.confidenceScores.positive - doc.confidenceScores.negative
              },
              confidence: Math.max(
                doc.confidenceScores.positive,
                doc.confidenceScores.negative,
                doc.confidenceScores.neutral
              ),
              provider: "azure"
            };
            
            // Add sentence-level analysis for detailed mode
            if (options.mode === "detailed" || this.analysisMode === "detailed") {
              result.details = {
                sentences: doc.sentences.map(sentence => ({
                  text: sentence.text,
                  sentiment: sentence.sentiment,
                  scores: {
                    positive: sentence.confidenceScores.positive,
                    negative: sentence.confidenceScores.negative,
                    neutral: sentence.confidenceScores.neutral
                  }
                }))
              };
              
              // Extract aspects if available
              if (doc.aspects && doc.aspects.length > 0) {
                result.aspects = doc.aspects.map(aspect => ({
                  text: aspect.text,
                  sentiment: aspect.sentiment,
                  confidence: aspect.confidenceScores[aspect.sentiment]
                }));
              }
            }
            
            return result;
          });
          
          return results;
        } catch (error) {
          console.error("Azure batch sentiment analysis error:", error);
          throw error;
        }
      }
    };
  }
  
  /**
   * Initialize emotion detection models
   * @returns {Promise<void>}
   * @private
   */
  async initializeEmotionDetection() {
    if (!this.enableEmotionDetection) {
      return;
    }
    
    try {
      // Initialize emotion lexicons for supported languages
      for (const language of ["en", "es", "fr", "de"]) {
        this._emotionModels[language] = {
          lexicon: this._defaultEmotionLexicon[language] || this._defaultEmotionLexicon.en,
          loaded: true
        };
      }
      
      // Initialize advanced emotion detection for selected provider
      if (this.analysisProvider === "openai" && this.apiKeys.openai) {
        this._emotionModels.openai = {
          name: "OpenAI Emotion Analyzer",
          loaded: true,
          
          /**
           * Detect emotions using OpenAI API
           * @param {string} text - Text to analyze
           * @param {Object} options - Analysis options
           * @returns {Promise<Object>} Emotion analysis result
           */
          detectEmotions: async (text, options = {}) => {
            try {
              // Create system prompt based on mode
              let systemPrompt = "You are an emotion analysis expert. ";
              
              if (options.mode === "detailed" || this.analysisMode === "detailed") {
                systemPrompt += "Analyze the text for emotions with detailed explanations of emotional cues.";
              } else {
                systemPrompt += "Identify the emotions expressed in the text.";
              }
              
              systemPrompt += " Return JSON with the following structure: { primaryEmotion: string, emotions: { joy: number, sadness: number, anger: number, fear: number, surprise: number, disgust: number, trust: number, anticipation: number }, intensity: number, explanation: string }";
              
              // Make API request
              const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.apiKeys.openai}`
                },
                body: JSON.stringify({
                  model: "gpt-4o",
                  messages: [
                    {
                      role: "system",
                      content: systemPrompt
                    },
                    {
                      role: "user",
                      content: text
                    }
                  ],
                  temperature: 0.3,
                  response_format: { type: "json_object" }
                })
              });
              
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`OpenAI API Error: ${errorData.error?.message || response.statusText}`);
              }
              
              const data = await response.json();
              
              if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
                throw new Error("No analysis returned from OpenAI API");
              }
              
              // Parse the JSON response
              const emotionResult = JSON.parse(data.choices[0].message.content);
              
              return {
                text,
                primaryEmotion: emotionResult.primaryEmotion,
                emotions: emotionResult.emotions,
                intensity: emotionResult.intensity,
                explanation: emotionResult.explanation,
                provider: "openai"
              };
            } catch (error) {
              console.error("OpenAI emotion detection error:", error);
              throw error;
            }
          }
        };
      } else if (this.analysisProvider === "azure" && this.apiKeys.azure) {
        // Azure Text Analytics does not have a dedicated emotions API
        // We could implement a custom mapping from sentiment to emotions
        this._emotionModels.azure = {
          name: "Azure Emotion Mapper",
          loaded: true,
          
          /**
           * Map Azure sentiment analysis to emotions
           * @param {string} text - Text to analyze
           * @param {Object} options - Analysis options
           * @returns {Promise<Object>} Emotion analysis result
           */
          detectEmotions: async (text, options = {}) => {
            try {
              // Get sentiment analysis first
              const sentimentResult = await this._analysisProviders.azure.analyze(text, options);
              
              // Map sentiment scores to basic emotions
              // This is a simple approximation
              const emotions = {
                joy: sentimentResult.scores.positive * 0.8,
                sadness: sentimentResult.scores.negative * 0.6,
                anger: sentimentResult.scores.negative * 0.4,
                fear: sentimentResult.scores.negative * 0.3,
                surprise: sentimentResult.scores.neutral * 0.5,
                disgust: sentimentResult.scores.negative * 0.2,
                trust: sentimentResult.scores.positive * 0.5,
                anticipation: sentimentResult.scores.neutral * 0.4
              };
              
              // Determine primary emotion
              let primaryEmotion = "neutral";
              let maxScore = 0;
              
              for (const [emotion, score] of Object.entries(emotions)) {
                if (score > maxScore) {
                  maxScore = score;
                  primaryEmotion = emotion;
                }
              }
              
              return {
                text,
                primaryEmotion,
                emotions,
                intensity: maxScore,
                explanation: `Mapped from sentiment analysis: ${sentimentResult.sentiment}`,
                provider: "azure"
              };
            } catch (error) {
              console.error("Azure emotion mapping error:", error);
              throw error;
            }
          }
        };
      }
      
      console.log("Emotion detection initialized successfully.");
    } catch (error) {
      console.error("Failed to initialize emotion detection:", error);
      throw error;
    }
  }
  
  /**
   * Initialize domain-specific vocabulary
   * @private
   */
  initializeDomainVocabulary() {
    try {
      // Process each domain vocabulary and merge it with default lexicon
      for (const [domain, vocabulary] of Object.entries(this.domainSpecificVocabulary)) {
        // Validate vocabulary format
        if (typeof vocabulary !== 'object') {
          console.warn(`Invalid vocabulary format for domain: ${domain}`);
          continue;
        }
        
        // Log the domain vocabulary size
        console.log(`Initialized domain vocabulary for '${domain}' with ${Object.keys(vocabulary).length} terms`);
      }
    } catch (error) {
      console.error("Failed to initialize domain vocabulary:", error);
    }
  }
  
  /**
   * Load models for selected provider
   * @returns {Promise<void>}
   * @private
   */
  async loadModels() {
    try {
      // No actual model loading for basic lexicon-based analysis
      if (this.analysisProvider === "local") {
        this._analyzerModels.local = {
          type: "lexicon",
          loaded: true,
          accuracy: "medium"
        };
      }
      
      // For API-based providers, just check if the API keys are set
      if (this.analysisProvider === "openai") {
        this._analyzerModels.openai = {
          type: "api",
          loaded: !!this.apiKeys.openai,
          accuracy: "high"
        };
      } else if (this.analysisProvider === "azure") {
        this._analyzerModels.azure = {
          type: "api",
          loaded: !!this.apiKeys.azure,
          accuracy: "high"
        };
      }
      
      console.log(`Loaded sentiment analysis models for provider: ${this.analysisProvider}`);
    } catch (error) {
      console.error("Failed to load sentiment analysis models:", error);
      throw error;
    }
  }
  
  /**
   * Get default sentiment lexicon
   * @returns {Object} Default sentiment lexicon
   * @private
   */
  getDefaultSentimentLexicon() {
    // This is a simplified lexicon for demonstration
    // A real implementation would use a much larger lexicon
    return {
      en: {
        "good": 0.6,
        "great": 0.8,
        "excellent": 0.9,
        "amazing": 0.9,
        "wonderful": 0.8,
        "fantastic": 0.9,
        "terrific": 0.8,
        "outstanding": 0.8,
        "superb": 0.9,
        "awesome": 0.8,
        "bad": -0.6,
        "terrible": -0.8,
        "awful": -0.8,
        "horrible": -0.9,
        "poor": -0.6,
        "disappointing": -0.6,
        "dreadful": -0.8,
        "abysmal": -0.9,
        "appalling": -0.8,
        "like": 0.5,
        "love": 0.8,
        "hate": -0.8,
        "dislike": -0.6,
        "enjoy": 0.7,
        "happy": 0.7,
        "sad": -0.7,
        "angry": -0.7,
        "frustrated": -0.6,
        "pleased": 0.6,
        "satisfied": 0.6,
        "dissatisfied": -0.6,
        "delighted": 0.8,
        "annoyed": -0.5,
        "irritated": -0.6
      },
      es: {
        "bueno": 0.6,
        "genial": 0.8,
        "excelente": 0.9,
        "increíble": 0.9,
        "maravilloso": 0.8,
        "fantástico": 0.9,
        "estupendo": 0.8,
        "excepcional": 0.8,
        "magnífico": 0.9,
        "malo": -0.6,
        "terrible": -0.8,
        "horrible": -0.8,
        "pésimo": -0.8,
        "pobre": -0.6,
        "decepcionante": -0.6,
        "espantoso": -0.8,
        "abismal": -0.9,
        "gustar": 0.5,
        "amar": 0.8,
        "odiar": -0.8,
        "disfrutar": 0.7,
        "feliz": 0.7,
        "triste": -0.7,
        "enfadado": -0.7,
        "frustrado": -0.6,
        "complacido": 0.6,
        "satisfecho": 0.6,
        "insatisfecho": -0.6,
        "encantado": 0.8,
        "molesto": -0.5,
        "irritado": -0.6
      },
      fr: {
        "bon": 0.6,
        "bien": 0.6,
        "génial": 0.8,
        "excellent": 0.9,
        "incroyable": 0.9,
        "merveilleux": 0.8,
        "fantastique": 0.9,
        "formidable": 0.8,
        "exceptionnel": 0.8,
        "superbe": 0.9,
        "mauvais": -0.6,
        "terrible": -0.8,
        "affreux": -0.8,
        "horrible": -0.9,
        "médiocre": -0.6,
        "décevant": -0.6,
        "épouvantable": -0.8,
        "abyssal": -0.9,
        "aimer": 0.5,
        "adorer": 0.8,
        "détester": -0.8,
        "apprécier": 0.6,
        "heureux": 0.7,
        "triste": -0.7,
        "énervé": -0.7,
        "frustré": -0.6,
        "satisfait": 0.6,
        "insatisfait": -0.6,
        "ravi": 0.8,
        "agacé": -0.5,
        "irrité": -0.6
      },
      de: {
        "gut": 0.6,
        "großartig": 0.8,
        "ausgezeichnet": 0.9,
        "erstaunlich": 0.9,
        "wunderbar": 0.8,
        "fantastisch": 0.9,
        "hervorragend": 0.8,
        "außergewöhnlich": 0.8,
        "superb": 0.9,
        "schlecht": -0.6,
        "furchtbar": -0.8,
        "schrecklich": -0.8,
        "grauenhaft": -0.9,
        "arm": -0.6,
        "enttäuschend": -0.6,
        "entsetzlich": -0.8,
        "abgrundtief": -0.9,
        "mögen": 0.5,
        "lieben": 0.8,
        "hassen": -0.8,
        "genießen": 0.7,
        "glücklich": 0.7,
        "traurig": -0.7,
        "wütend": -0.7,
        "frustriert": -0.6,
        "zufrieden": 0.6,
        "unzufrieden": -0.6,
        "erfreut": 0.8,
        "verärgert": -0.5,
        "gereizt": -0.6
      }
    };
  }
  
  /**
   * Get default emotion lexicon
   * @returns {Object} Default emotion lexicon
   * @private
   */
  getDefaultEmotionLexicon() {
    // This is a simplified emotion lexicon for demonstration
    // A real implementation would use a much larger lexicon
    return {
      en: {
        "happy": "joy",
        "delighted": "joy",
        "joyful": "joy",
        "ecstatic": "joy",
        "pleased": "joy",
        "glad": "joy",
        "cheerful": "joy",
        "sad": "sadness",
        "unhappy": "sadness",
        "depressed": "sadness",
        "gloomy": "sadness",
        "miserable": "sadness",
        "heartbroken": "sadness",
        "upset": "sadness",
        "angry": "anger",
        "furious": "anger",
        "enraged": "anger",
        "annoyed": "anger",
        "irritated": "anger",
        "agitated": "anger",
        "afraid": "fear",
        "fearful": "fear",
        "scared": "fear",
        "terrified": "fear",
        "anxious": "fear",
        "worried": "fear",
        "surprised": "surprise",
        "astonished": "surprise",
        "amazed": "surprise",
        "shocked": "surprise",
        "disgusted": "disgust",
        "revolted": "disgust",
        "repulsed": "disgust",
        "trust": "trust",
        "believe": "trust",
        "confident": "trust",
        "assured": "trust",
        "eager": "anticipation",
        "expectant": "anticipation",
        "waiting": "anticipation",
        "looking forward": "anticipation"
      }
    };
  }
  
  /**
   * Analyze sentiment of text
   * @param {string} text - Text to analyze
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Analysis result
   */
  async analyzeSentiment(text, options = {}) {
    if (!this.initialized) {
      throw new Error("Sentiment Analysis system not initialized");
    }
    
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      throw new Error("No text provided for analysis");
    }
    
    // Limit text length
    if (text.length > this.maxTextLength) {
      text = text.substring(0, this.maxTextLength);
    }
    
    // Generate a unique ID for this analysis
    const analysisId = this.generateAnalysisId();
    
    try {
      // Check cache if enabled
      if (this.cacheSentimentResults) {
        const cacheKey = this.getCacheKey(text, options);
        const cachedResult = this._analysisCache[cacheKey];
        
        if (cachedResult) {
          return {
            ...cachedResult,
            fromCache: true
          };
        }
      }
      
      // Select provider based on configuration
      const provider = this._analysisProviders[options.provider || this.analysisProvider];
      
      if (!provider) {
        throw new Error(`Provider not available: ${options.provider || this.analysisProvider}`);
      }
      
      // Set current analysis for tracking
      this._currentAnalysis = {
        id: analysisId,
        text,
        options,
        startTime: Date.now()
      };
      
      // Apply context if enabled
      let contextAwareText = text;
      let contextData = null;
      
      if (this.enableContextAwareness && this._contextHistory.length > 0) {
        const contextResult = this.applyContext(text);
        contextAwareText = contextResult.text;
        contextData = contextResult.context;
      }
      
      // Perform sentiment analysis
      const result = await provider.analyze(contextAwareText, {
        ...options,
        language: options.language || this.language,
        mode: options.mode || this.analysisMode
      });
      
      // Add analysis ID and timestamp
      result.id = analysisId;
      result.timestamp = Date.now();
      
      // Add context data if available
      if (contextData) {
        result.context = contextData;
      }
      
      // Calculate processing time
      result.processingTime = result.timestamp - this._currentAnalysis.startTime;
      
      // Add to context history if enabled
      if (this.enableContextAwareness) {
        this.updateContext(text, result);
      }
      
      // Cache result if enabled
      if (this.cacheSentimentResults) {
        const cacheKey = this.getCacheKey(text, options);
        this._analysisCache[cacheKey] = result;
        
        // Trim cache if needed
        this.trimCache();
      }
      
      // Reset current analysis
      this._currentAnalysis = null;
      
      // Notify listeners
      this._notifyListeners("onAnalysisComplete", result);
      
      return result;
    } catch (error) {
      console.error("Sentiment analysis error:", error);
      
      // Reset current analysis
      this._currentAnalysis = null;
      
      // Notify listeners of error
      this._notifyListeners("onError", {
        id: analysisId,
        text,
        error: error.message,
        timestamp: Date.now()
      });
      
      throw error;
    }
  }
  
  /**
   * Analyze sentiment in batch mode
   * @param {Array<string>} texts - Array of texts to analyze
   * @param {Object} options - Analysis options
   * @returns {Promise<Array<Object>>} Array of analysis results
   */
  async batchAnalyzeSentiment(texts, options = {}) {
    if (!this.initialized) {
      throw new Error("Sentiment Analysis system not initialized");
    }
    
    if (!this.batchProcessingEnabled) {
      throw new Error("Batch processing is not enabled");
    }
    
    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return [];
    }
    
    try {
      // Filter out invalid texts
      const validTexts = texts.filter(text => 
        text && typeof text === 'string' && text.trim().length > 0
      );
      
      if (validTexts.length === 0) {
        return [];
      }
      
      // Check cache for each text if enabled
      let resultsFromCache = [];
      let textsToAnalyze = [];
      
      if (this.cacheSentimentResults) {
        // Check each text against the cache
        validTexts.forEach((text, index) => {
          const cacheKey = this.getCacheKey(text, options);
          const cachedResult = this._analysisCache[cacheKey];
          
          if (cachedResult) {
            resultsFromCache.push({
              ...cachedResult,
              fromCache: true
            });
          } else {
            textsToAnalyze.push(text);
          }
        });
      } else {
        // Skip cache check
        textsToAnalyze = validTexts;
      }
      
      // If all results were found in cache, return immediately
      if (textsToAnalyze.length === 0) {
        return resultsFromCache;
      }
      
      // Select provider based on configuration
      const provider = this._analysisProviders[options.provider || this.analysisProvider];
      
      if (!provider) {
        throw new Error(`Provider not available: ${options.provider || this.analysisProvider}`);
      }
      
      // Check if provider supports batch analysis
      if (provider.batchAnalyze) {
        // Perform batch analysis
        const results = await provider.batchAnalyze(textsToAnalyze, {
          ...options,
          language: options.language || this.language,
          mode: options.mode || this.analysisMode
        });
        
        // Add timestamp to each result
        const timestamp = Date.now();
        results.forEach(result => {
          result.id = this.generateAnalysisId();
          result.timestamp = timestamp;
        });
        
        // Cache results if enabled
        if (this.cacheSentimentResults) {
          results.forEach(result => {
            const cacheKey = this.getCacheKey(result.text, options);
            this._analysisCache[cacheKey] = result;
          });
          
          // Trim cache if needed
          this.trimCache();
        }
        
        // Combine with cached results
        return [...resultsFromCache, ...results];
      } else {
        // Fall back to individual analysis
        const results = await Promise.all(
          textsToAnalyze.map(text => this.analyzeSentiment(text, options))
        );
        
        // Combine with cached results
        return [...resultsFromCache, ...results];
      }
    } catch (error) {
      console.error("Batch sentiment analysis error:", error);
      throw error;
    }
  }
  
  /**
   * Detect emotions in text
   * @param {string} text - Text to analyze
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Emotion analysis result
   */
  async detectEmotions(text, options = {}) {
    if (!this.initialized) {
      throw new Error("Sentiment Analysis system not initialized");
    }
    
    if (!this.enableEmotionDetection) {
      throw new Error("Emotion detection is not enabled");
    }
    
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      throw new Error("No text provided for emotion analysis");
    }
    
    try {
      // Determine which emotion detection model to use
      let emotionDetector;
      
      // If provider has a specific emotion detector, use it
      if (this._emotionModels[this.analysisProvider]) {
        emotionDetector = this._emotionModels[this.analysisProvider];
      } else {
        // Fall back to lexicon-based detection
        const language = options.language || this.language;
        emotionDetector = this._emotionModels[language] || this._emotionModels.en;
      }
      
      // Use the provider-specific emotion detector if available
      if (emotionDetector.detectEmotions) {
        const result = await emotionDetector.detectEmotions(text, options);
        
        // Notify listeners
        this._notifyListeners("onEmotionDetected", result);
        
        return result;
      }
      
      // Fall back to lexicon-based emotion detection
      const emotions = this.detectEmotionsWithLexicon(text, emotionDetector.lexicon);
      
      // Create result
      const result = {
        text,
        primaryEmotion: emotions.primaryEmotion,
        emotions: emotions.scores,
        intensity: emotions.intensity,
        emotionalWords: emotions.emotionalWords,
        provider: "lexicon"
      };
      
      // Notify listeners
      this._notifyListeners("onEmotionDetected", result);
      
      return result;
    } catch (error) {
      console.error("Emotion detection error:", error);
      throw error;
    }
  }
  
  /**
   * Detect emotions using lexicon-based approach
   * @param {string} text - Text to analyze
   * @param {Object} lexicon - Emotion lexicon
   * @returns {Object} Emotion analysis result
   * @private
   */
  detectEmotionsWithLexicon(text, lexicon) {
    // Process text
    const processedText = this.preprocessText(text);
    const words = processedText.split(/\s+/);
    
    // Initialize emotion scores
    const scores = {
      joy: 0,
      sadness: 0,
      anger: 0,
      fear: 0,
      surprise: 0,
      disgust: 0,
      trust: 0,
      anticipation: 0
    };
    
    // Track emotional words
    const emotionalWords = {};
    
    // Process each word
    for (const word of words) {
      if (!word) continue;
      
      const lowerWord = word.toLowerCase();
      
      if (lexicon[lowerWord]) {
        const emotion = lexicon[lowerWord];
        scores[emotion] += 1;
        
        if (!emotionalWords[emotion]) {
          emotionalWords[emotion] = [];
        }
        
        emotionalWords[emotion].push(word);
      }
    }
    
    // Normalize scores by word count
    const totalWords = words.length || 1;
    
    for (const emotion in scores) {
      scores[emotion] = scores[emotion] / totalWords;
    }
    
    // Find primary emotion
    let primaryEmotion = "neutral";
    let maxScore = 0;
    
    for (const [emotion, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        primaryEmotion = emotion;
      }
    }
    
    // If no clear emotion detected, set as neutral
    if (maxScore < 0.05) {
      primaryEmotion = "neutral";
    }
    
    return {
      primaryEmotion,
      scores,
      intensity: maxScore,
      emotionalWords
    };
  }
  
  /**
   * Analyze aspects and extract opinion targets
   * @param {string} text - Text to analyze
   * @param {Array<string>} aspectCategories - Categories to look for
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Aspect-based sentiment analysis result
   */
  async analyzeAspects(text, aspectCategories = [], options = {}) {
    if (!this.initialized) {
      throw new Error("Sentiment Analysis system not initialized");
    }
    
    if (!this.enableAspectBasedAnalysis) {
      throw new Error("Aspect-based analysis is not enabled");
    }
    
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      throw new Error("No text provided for aspect analysis");
    }
    
    try {
      // For OpenAI-based analysis
      if (this.analysisProvider === "openai" && this.apiKeys.openai) {
        return this.analyzeAspectsWithOpenAI(text, aspectCategories, options);
      }
      
      // For Azure-based analysis (if it supports aspect extraction)
      if (this.analysisProvider === "azure" && this.apiKeys.azure) {
        // First perform sentiment analysis to get aspects if available
        const sentimentResult = await this._analysisProviders.azure.analyze(text, {
          ...options,
          mode: "detailed" // Ensure detailed mode to get aspects
        });
        
        if (sentimentResult.aspects) {
          return {
            text,
            aspects: sentimentResult.aspects,
            overallSentiment: sentimentResult.sentiment,
            provider: "azure"
          };
        }
      }
      
      // Fall back to simple rule-based aspect extraction
      return this.extractAspectsRuleBased(text, aspectCategories);
    } catch (error) {
      console.error("Aspect analysis error:", error);
      throw error;
    }
  }
  
  /**
   * Analyze aspects using OpenAI
   * @param {string} text - Text to analyze
   * @param {Array<string>} aspectCategories - Categories to look for
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Aspect-based sentiment analysis result
   * @private
   */
  async analyzeAspectsWithOpenAI(text, aspectCategories = [], options = {}) {
    try {
      // Prepare system prompt
      let systemPrompt = "You are an expert in aspect-based sentiment analysis. ";
      
      if (aspectCategories && aspectCategories.length > 0) {
        systemPrompt += `Extract sentiments for these specific aspects: ${aspectCategories.join(", ")}. `;
      } else {
        systemPrompt += "Identify all aspects mentioned in the text and analyze the sentiment for each. ";
      }
      
      systemPrompt += "Return JSON with the following structure: { aspects: [{ aspect: string, sentiment: \"positive\"|\"negative\"|\"neutral\", confidence: number, text: string }], overallSentiment: string }";
      
      // Make API request
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKeys.openai}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: text
            }
          ],
          temperature: 0.3,
          response_format: { type: "json_object" }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API Error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
        throw new Error("No analysis returned from OpenAI API");
      }
      
      // Parse the JSON response
      const aspectResult = JSON.parse(data.choices[0].message.content);
      
      return {
        text,
        aspects: aspectResult.aspects,
        overallSentiment: aspectResult.overallSentiment,
        provider: "openai"
      };
    } catch (error) {
      console.error("OpenAI aspect analysis error:", error);
      throw error;
    }
  }
  
  /**
   * Extract aspects using rule-based approach
   * @param {string} text - Text to analyze
   * @param {Array<string>} aspectCategories - Categories to look for
   * @returns {Object} Aspect-based sentiment analysis result
   * @private
   */
  extractAspectsRuleBased(text, aspectCategories = []) {
    // Simple rule-based aspect extraction
    // This is a very basic implementation
    
    // First get overall sentiment
    const sentimentResult = this._analysisProviders.local.analyze(text, {
      language: this.language
    });
    
    // If no specific categories provided, use some defaults
    const categories = aspectCategories.length > 0 ? 
      aspectCategories : 
      ["price", "quality", "service", "performance", "design", "usability"];
    
    // Extract sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    // Initialize aspect results
    const aspects = [];
    
    // Check each category in each sentence
    for (const category of categories) {
      const categoryRegex = new RegExp(`\\b${category}\\b`, "i");
      
      for (const sentence of sentences) {
        if (categoryRegex.test(sentence)) {
          // Found category in sentence, analyze sentiment
          const sentimentResult = this._analysisProviders.local.analyze(sentence, {
            language: this.language
          });
          
          aspects.push({
            aspect: category,
            sentiment: sentimentResult.sentiment,
            confidence: sentimentResult.confidence,
            text: sentence.trim()
          });
          
          // Only use the first mention of this aspect
          break;
        }
      }
    }
    
    return {
      text,
      aspects,
      overallSentiment: sentimentResult.sentiment,
      provider: "rule-based"
    };
  }
  
  /**
   * Preprocess text for analysis
   * @param {string} text - Text to preprocess
   * @returns {string} Preprocessed text
   * @private
   */
  preprocessText(text) {
    // Convert to lowercase for case-insensitive matching
    let processedText = text.toLowerCase();
    
    // Remove URLs
    processedText = processedText.replace(/https?:\/\/\S+/g, "");
    
    // Remove email addresses
    processedText = processedText.replace(/[\w.-]+@[\w.-]+\.\w+/g, "");
    
    // Remove extra whitespace
    processedText = processedText.replace(/\s+/g, " ").trim();
    
    return processedText;
  }
  
  /**
   * Apply context to the current text
   * @param {string} text - Current text
   * @returns {Object} Text with context and context data
   * @private
   */
  applyContext(text) {
    if (!this.enableContextAwareness || this._contextHistory.length === 0) {
      return { text, context: null };
    }
    
    // Get recent context entries
    const recentContext = this._contextHistory.slice(-this.contextWindowSize);
    
    // Extract context data
    const contextData = {
      entries: recentContext,
      overallSentiment: this.getContextOverallSentiment(recentContext)
    };
    
    // In a real implementation, you might modify the text based on context
    // For this example, we'll just return the original text with context data
    
    return { 
      text,
      context: contextData
    };
  }
  
  /**
   * Update context with new analysis
   * @param {string} text - Analyzed text
   * @param {Object} result - Analysis result
   * @private
   */
  updateContext(text, result) {
    if (!this.enableContextAwareness) {
      return;
    }
    
    // Add to context history
    this._contextHistory.push({
      text: text.substring(0, 200), // Limit text length
      sentiment: result.sentiment,
      timestamp: result.timestamp || Date.now()
    });
    
    // Limit context history size
    if (this._contextHistory.length > this.contextWindowSize * 2) {
      this._contextHistory = this._contextHistory.slice(-this.contextWindowSize);
    }
    
    // Notify context update
    this._notifyListeners("onContextUpdate", {
      contextSize: this._contextHistory.length,
      recentSentiment: result.sentiment,
      overallSentiment: this.getContextOverallSentiment(this._contextHistory)
    });
  }
  
  /**
   * Get overall sentiment from context
   * @param {Array<Object>} context - Context entries
   * @returns {string} Overall sentiment
   * @private
   */
  getContextOverallSentiment(context) {
    if (!context || context.length === 0) {
      return "neutral";
    }
    
    // Count sentiments
    let positive = 0;
    let negative = 0;
    let neutral = 0;
    
    for (const entry of context) {
      if (entry.sentiment === "positive") {
        positive++;
      } else if (entry.sentiment === "negative") {
        negative++;
      } else {
        neutral++;
      }
    }
    
    // Determine majority sentiment
    if (positive > negative && positive > neutral) {
      return "positive";
    } else if (negative > positive && negative > neutral) {
      return "negative";
    } else {
      return "neutral";
    }
  }
  
  /**
   * Get top scoring words from a list
   * @param {Array<string>} wordList - List of words
   * @param {Object} lexicon - Sentiment lexicon
   * @param {number} limit - Maximum number of words
   * @param {boolean} isNegative - Whether these are negative words
   * @returns {Array<Object>} Top scoring words with scores
   * @private
   */
  getTopScoringWords(wordList, lexicon, limit = 5, isNegative = false) {
    if (!wordList || wordList.length === 0) {
      return [];
    }
    
    // Get unique words
    const uniqueWords = [...new Set(wordList)];
    
    // Map words to their scores
    const scoredWords = uniqueWords.map(word => ({
      word,
      score: Math.abs(lexicon[word.toLowerCase()] || 0)
    }));
    
    // Sort by score (highest first)
    scoredWords.sort((a, b) => b.score - a.score);
    
    // Return top words
    return scoredWords.slice(0, limit);
  }
  
  /**
   * Get a cache key for an analysis
   * @param {string} text - Text to analyze
   * @param {Object} options - Analysis options
   * @returns {string} Cache key
   * @private
   */
  getCacheKey(text, options = {}) {
    // For very long texts, use a hash instead
    const textToUse = text.length > 100 ? this.hashString(text) : text;
    
    const optionsString = JSON.stringify({
      provider: options.provider || this.analysisProvider,
      language: options.language || this.language,
      mode: options.mode || this.analysisMode
    });
    
    return `${textToUse}|${optionsString}`;
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
   * Trim the analysis cache if it exceeds the maximum size
   * @private
   */
  trimCache() {
    const cacheKeys = Object.keys(this._analysisCache);
    
    if (cacheKeys.length > this.maxCacheSize) {
      // Remove oldest entries to bring size back to 75% of max
      const keysToRemove = cacheKeys.slice(0, cacheKeys.length - Math.floor(this.maxCacheSize * 0.75));
      
      for (const key of keysToRemove) {
        delete this._analysisCache[key];
      }
    }
  }
  
  /**
   * Get sensitivity factor based on level
   * @returns {number} Sensitivity factor
   * @private
   */
  getSensitivityFactor() {
    switch (this.sensitivityLevel) {
      case "low":
        return 0.7;
      case "high":
        return 1.3;
      case "medium":
      default:
        return 1.0;
    }
  }
  
  /**
   * Generate a unique ID for an analysis
   * @returns {string} Analysis ID
   * @private
   */
  generateAnalysisId() {
    return `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  
  /**
   * Register an event listener
   * @param {string} event - Event name
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
   * @param {string} event - Event name
   * @param {string|Function} idOrCallback - Listener ID or callback function
   * @returns {boolean} Whether the listener was removed
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
   * @param {string} event - Event name
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
   * Generate a unique ID for a listener
   * @returns {string} Listener ID
   * @private
   */
  generateListenerId() {
    return `listener_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  
  /**
   * Set the analysis provider
   * @param {string} provider - Provider name
   * @returns {boolean} Success status
   */
  setAnalysisProvider(provider) {
    if (!this._analysisProviders[provider]) {
      console.warn(`Provider not available: ${provider}`);
      return false;
    }
    
    this.analysisProvider = provider;
    return true;
  }
  
  /**
   * Set the analysis mode
   * @param {string} mode - Analysis mode
   * @returns {boolean} Success status
   */
  setAnalysisMode(mode) {
    const provider = this._analysisProviders[this.analysisProvider];
    
    if (!provider || !provider.supportedModes.includes(mode)) {
      console.warn(`Mode not supported: ${mode}`);
      return false;
    }
    
    this.analysisMode = mode;
    return true;
  }
  
  /**
   * Set an API key for a provider
   * @param {string} provider - Provider name
   * @param {string} apiKey - API key
   * @returns {boolean} Success status
   */
  setApiKey(provider, apiKey) {
    this.apiKeys[provider] = apiKey;
    return true;
  }
  
  /**
   * Set the language for analysis
   * @param {string} language - Language code
   * @returns {boolean} Success status
   */
  setLanguage(language) {
    const provider = this._analysisProviders[this.analysisProvider];
    
    if (!provider || !provider.supportedLanguages.includes(language)) {
      console.warn(`Language not supported: ${language}`);
      return false;
    }
    
    this.language = language;
    return true;
  }
  
  /**
   * Add custom domain-specific vocabulary
   * @param {string} domain - Domain name
   * @param {Object} vocabulary - Sentiment lexicon for the domain
   * @returns {boolean} Success status
   */
  addDomainVocabulary(domain, vocabulary) {
    if (!domain || typeof domain !== 'string' || !vocabulary || typeof vocabulary !== 'object') {
      return false;
    }
    
    this.domainSpecificVocabulary[domain] = vocabulary;
    return true;
  }
  
  /**
   * Clear the analysis cache
   * @returns {boolean} Success status
   */
  clearCache() {
    this._analysisCache = {};
    return true;
  }
  
  /**
   * Clear context history
   * @returns {boolean} Success status
   */
  clearContext() {
    this._contextHistory = [];
    return true;
  }
  
  /**
   * Get current context history
   * @param {number} limit - Maximum number of entries to return
   * @returns {Array<Object>} Context history
   */
  getContextHistory(limit = 0) {
    if (!this.enableContextAwareness) {
      return [];
    }
    
    if (limit <= 0 || limit >= this._contextHistory.length) {
      return [...this._contextHistory];
    }
    
    return this._contextHistory.slice(-limit);
  }
  
  /**
   * Get current configuration
   * @returns {Object} Current configuration
   */
  getConfiguration() {
    return {
      version: this.version,
      initialized: this.initialized,
      provider: this.analysisProvider,
      mode: this.analysisMode,
      language: this.language,
      features: {
        emotionDetection: this.enableEmotionDetection,
        aspectAnalysis: this.enableAspectBasedAnalysis,
        contextAwareness: this.enableContextAwareness,
        multiLanguage: this.enableMultiLanguage,
        realtimeAnalysis: this.enableRealtimeAnalysis,
        sarcasmDetection: this.enableSarcasmDetection
      },
      settings: {
        confidenceThreshold: this.confidenceThreshold,
        maxTextLength: this.maxTextLength,
        contextWindowSize: this.contextWindowSize,
        sensitivityLevel: this.sensitivityLevel
      },
      performance: {
        cacheSentimentResults: this.cacheSentimentResults,
        maxCacheSize: this.maxCacheSize,
        batchProcessingEnabled: this.batchProcessingEnabled,
        batchSize: this.batchSize
      }
    };
  }
  
  /**
   * Get available providers
   * @returns {Array<Object>} List of available providers
   */
  getAvailableProviders() {
    return Object.entries(this._analysisProviders).map(([id, provider]) => ({
      id,
      name: provider.name,
      type: provider.type,
      supportedLanguages: provider.supportedLanguages,
      supportedModes: provider.supportedModes,
      maxTextLength: provider.maxTextLength
    }));
  }
  
  /**
   * Get analysis statistics
   * @returns {Object} Statistics
   */
  getStatistics() {
    return {
      cacheSize: Object.keys(this._analysisCache).length,
      maxCacheSize: this.maxCacheSize,
      contextHistorySize: this._contextHistory.length,
      domainVocabularies: Object.keys(this.domainSpecificVocabulary).length
    };
  }
}

// Export the class for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SentimentAnalysis;
} else if (typeof window !== 'undefined') {
  window.SentimentAnalysis = SentimentAnalysis;
}
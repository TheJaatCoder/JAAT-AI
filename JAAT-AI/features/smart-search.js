/**
 * JAAT-AI Feature: Smart Search
 * Version: 1.0.0
 * 
 * This module provides advanced search capabilities including:
 * - Semantic search with NLP understanding
 * - Multi-term query processing
 * - Fuzzy matching and typo tolerance
 * - Contextual result ranking
 * - Search history and suggestions
 * - Faceted search and filtering
 * - Cross-source aggregated results
 */

class SmartSearch {
  constructor() {
    // Core properties
    this.version = "1.0.0";
    this.initialized = false;
    
    // Search settings
    this.searchProvider = "local"; // local, elasticsearch, openai, custom
    this.searchMode = "standard"; // standard, semantic, hybrid
    this.language = "en"; // ISO language code
    this.maxResults = 50; // Maximum results to return
    this.minScore = 0.3; // Minimum relevance score (0-1)
    this.timeout = 10000; // Search timeout in milliseconds
    
    // Features
    this.enableFuzzyMatching = true;
    this.enableSemanticSearch = true;
    this.enableContextualRanking = true;
    this.enableSuggestions = true;
    this.enableFacetedSearch = true;
    this.enableCrossSourceSearch = true;
    this.enablePredictiveSearch = false; // Advanced feature, disabled by default
    
    // Search settings
    this.fuzzyMatchingLevel = "medium"; // low, medium, high
    this.contextWindow = 3; // Number of previous searches to consider
    this.boostingFactors = { // Factors to boost certain fields
      title: 2.0,
      tags: 1.5,
      content: 1.0,
      description: 1.2,
      author: 0.8
    };
    this.customStopWords = []; // Additional stop words to ignore
    
    // Performance settings
    this.cacheResults = true;
    this.maxCacheSize = 100;
    this.searchThrottleTime = 300; // Milliseconds to wait for typing to finish
    
    // API Keys (should be set securely)
    this.apiKeys = {};
    
    // Internal state
    this._searchIndex = {};
    this._searchCache = {};
    this._searchHistory = [];
    this._pendingSearch = null;
    this._currentSearch = null;
    this._listeners = {
      onSearchStart: [],
      onSearchComplete: [],
      onSearchError: [],
      onSuggestions: []
    };
    this._searchProviders = {};
    this._defaultStopWords = this.getDefaultStopWords();
    this._vocabularyIndex = {};
    this._vectorIndex = {};
    this._dataSources = [];
  }
  
  /**
   * Initialize the smart search system
   * @param {Object} options - Configuration options
   * @returns {Promise<boolean>} Success status
   */
  async initialize(options = {}) {
    try {
      console.log("Initializing Smart Search system...");
      
      // Apply custom options
      if (options.searchProvider) this.searchProvider = options.searchProvider;
      if (options.searchMode) this.searchMode = options.searchMode;
      if (options.language) this.language = options.language;
      if (options.maxResults !== undefined) this.maxResults = options.maxResults;
      if (options.minScore !== undefined) this.minScore = options.minScore;
      if (options.timeout !== undefined) this.timeout = options.timeout;
      if (options.enableFuzzyMatching !== undefined) this.enableFuzzyMatching = options.enableFuzzyMatching;
      if (options.enableSemanticSearch !== undefined) this.enableSemanticSearch = options.enableSemanticSearch;
      if (options.enableContextualRanking !== undefined) this.enableContextualRanking = options.enableContextualRanking;
      if (options.enableSuggestions !== undefined) this.enableSuggestions = options.enableSuggestions;
      if (options.enableFacetedSearch !== undefined) this.enableFacetedSearch = options.enableFacetedSearch;
      if (options.enableCrossSourceSearch !== undefined) this.enableCrossSourceSearch = options.enableCrossSourceSearch;
      if (options.enablePredictiveSearch !== undefined) this.enablePredictiveSearch = options.enablePredictiveSearch;
      if (options.fuzzyMatchingLevel) this.fuzzyMatchingLevel = options.fuzzyMatchingLevel;
      if (options.contextWindow !== undefined) this.contextWindow = options.contextWindow;
      if (options.boostingFactors) this.boostingFactors = {...this.boostingFactors, ...options.boostingFactors};
      if (options.customStopWords) this.customStopWords = options.customStopWords;
      if (options.cacheResults !== undefined) this.cacheResults = options.cacheResults;
      if (options.maxCacheSize !== undefined) this.maxCacheSize = options.maxCacheSize;
      if (options.searchThrottleTime !== undefined) this.searchThrottleTime = options.searchThrottleTime;
      if (options.apiKeys) this.apiKeys = {...this.apiKeys, ...options.apiKeys};
      
      // Initialize search providers
      await this.initializeSearchProviders();
      
      // Initialize data sources if provided
      if (options.dataSources) {
        await this.addDataSources(options.dataSources);
      }
      
      // Initialize vocabularies for suggestions
      await this.initializeVocabularies();
      
      // Initialize vector index if semantic search is enabled
      if (this.enableSemanticSearch) {
        await this.initializeVectorIndex();
      }
      
      this.initialized = true;
      console.log("Smart Search system initialized successfully.");
      return true;
    } catch (error) {
      console.error("Failed to initialize Smart Search:", error);
      return false;
    }
  }
  
  /**
   * Initialize search providers
   * @returns {Promise<void>}
   * @private
   */
  async initializeSearchProviders() {
    // Initialize local search provider
    this._searchProviders.local = {
      name: "Local Search Engine",
      type: "in-memory",
      supportsSemanticSearch: false,
      supportsFuzzyMatching: true,
      supportsFacetedSearch: true,
      
      /**
       * Search using local in-memory index
       * @param {string} query - Search query
       * @param {Object} options - Search options
       * @returns {Promise<Object>} Search results
       */
      search: async (query, options) => {
        return this.searchLocalIndex(query, options);
      },
      
      /**
       * Get suggestions based on partial query
       * @param {string} partial - Partial query
       * @param {Object} options - Suggestion options
       * @returns {Promise<Array<string>>} Suggestions
       */
      getSuggestions: async (partial, options) => {
        return this.getLocalSuggestions(partial, options);
      }
    };
    
    // Initialize Elasticsearch provider if API key exists
    if (this.apiKeys.elasticsearch) {
      this._searchProviders.elasticsearch = {
        name: "Elasticsearch",
        type: "external",
        supportsSemanticSearch: true,
        supportsFuzzyMatching: true,
        supportsFacetedSearch: true,
        
        /**
         * Search using Elasticsearch
         * @param {string} query - Search query
         * @param {Object} options - Search options
         * @returns {Promise<Object>} Search results
         */
        search: async (query, options) => {
          return this.searchElasticsearch(query, options);
        },
        
        /**
         * Get suggestions from Elasticsearch
         * @param {string} partial - Partial query
         * @param {Object} options - Suggestion options
         * @returns {Promise<Array<string>>} Suggestions
         */
        getSuggestions: async (partial, options) => {
          return this.getElasticsearchSuggestions(partial, options);
        }
      };
    }
    
    // Initialize OpenAI-based semantic search if API key exists
    if (this.apiKeys.openai) {
      this._searchProviders.openai = {
        name: "OpenAI Semantic Search",
        type: "ai",
        supportsSemanticSearch: true,
        supportsFuzzyMatching: false,
        supportsFacetedSearch: false,
        
        /**
         * Search using OpenAI embeddings
         * @param {string} query - Search query
         * @param {Object} options - Search options
         * @returns {Promise<Object>} Search results
         */
        search: async (query, options) => {
          return this.searchWithOpenAI(query, options);
        },
        
        /**
         * Get suggestions using OpenAI
         * @param {string} partial - Partial query
         * @param {Object} options - Suggestion options
         * @returns {Promise<Array<string>>} Suggestions
         */
        getSuggestions: async (partial, options) => {
          return this.getOpenAISuggestions(partial, options);
        }
      };
    }
  }
  
  /**
   * Initialize vocabularies for suggestions
   * @returns {Promise<void>}
   * @private
   */
  async initializeVocabularies() {
    // In a real implementation, this would load domain-specific vocabularies
    // Here we'll initialize with some sample data
    
    this._vocabularyIndex = {
      general: [
        "search", "find", "query", "lookup", "discover", "explore",
        "information", "data", "results", "content", "documents",
        "recent", "popular", "trending", "new", "relevant"
      ],
      tech: [
        "algorithm", "programming", "software", "hardware", "database",
        "network", "cloud", "security", "encryption", "development",
        "framework", "library", "API", "interface", "system"
      ],
      business: [
        "marketing", "strategy", "finance", "management", "startup",
        "investment", "revenue", "customer", "product", "service",
        "analysis", "report", "presentation", "meeting", "project"
      ]
    };
    
    // Common n-grams for predictive suggestions
    this._vocabularyIndex.ngrams = {
      "how to": ["make", "create", "build", "find", "setup", "configure", "use"],
      "where is": ["located", "found", "situated", "available", "placed"],
      "what is": ["the difference", "the meaning", "the purpose", "the best", "the cost"],
      "best practice": ["for", "when", "to", "in", "with"]
    };
  }
  
  /**
   * Initialize vector index for semantic search
   * @returns {Promise<void>}
   * @private
   */
  async initializeVectorIndex() {
    if (!this.enableSemanticSearch) {
      return;
    }
    
    try {
      // If using OpenAI for embeddings
      if (this.searchProvider === 'openai' && this.apiKeys.openai) {
        // In a real implementation, this would create vector embeddings for indexed documents
        // Here we'll just simulate the initialization
        console.log("Initialized semantic vector index for OpenAI embeddings");
      } 
      else {
        // Local vector index simulation
        this._vectorIndex = {
          dimensions: 128,
          vectors: {},
          initialized: true
        };
        
        console.log("Initialized local vector index for semantic search");
      }
    } catch (error) {
      console.error("Failed to initialize vector index:", error);
      throw error;
    }
  }
  
  /**
   * Add data sources for searching
   * @param {Array<Object>} dataSources - Data sources to add
   * @returns {Promise<boolean>} Success status
   */
  async addDataSources(dataSources) {
    if (!dataSources || !Array.isArray(dataSources) || dataSources.length === 0) {
      return false;
    }
    
    let indexedCount = 0;
    
    for (const source of dataSources) {
      try {
        // Validate source
        if (!source.id || !source.type || !source.data) {
          console.warn(`Invalid data source: ${source.id || 'unknown'}`);
          continue;
        }
        
        // Skip if already added
        if (this._dataSources.some(ds => ds.id === source.id)) {
          console.warn(`Data source already exists: ${source.id}`);
          continue;
        }
        
        // Add to data sources
        this._dataSources.push(source);
        
        // Index the data
        const indexed = await this.indexDataSource(source);
        
        if (indexed) {
          indexedCount++;
        }
      } catch (error) {
        console.error(`Error adding data source: ${source.id}`, error);
      }
    }
    
    return indexedCount > 0;
  }
  
  /**
   * Index a data source
   * @param {Object} source - Data source to index
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async indexDataSource(source) {
    try {
      switch (source.type) {
        case 'documents':
          return this.indexDocuments(source.id, source.data);
        
        case 'database':
          return this.indexDatabaseResults(source.id, source.data);
        
        case 'api':
          // For API sources, we don't index in advance but query in real-time
          return true;
        
        default:
          console.warn(`Unsupported data source type: ${source.type}`);
          return false;
      }
    } catch (error) {
      console.error(`Error indexing data source: ${source.id}`, error);
      return false;
    }
  }
  
  /**
   * Index an array of documents
   * @param {string} sourceId - Source identifier
   * @param {Array<Object>} documents - Documents to index
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async indexDocuments(sourceId, documents) {
    if (!documents || !Array.isArray(documents) || documents.length === 0) {
      return false;
    }
    
    // Initialize index for this source if needed
    if (!this._searchIndex[sourceId]) {
      this._searchIndex[sourceId] = {
        documents: [],
        invertedIndex: {},
        documentMap: {},
        fieldStats: {}
      };
    }
    
    const index = this._searchIndex[sourceId];
    let indexedCount = 0;
    
    for (const doc of documents) {
      // Skip if no id
      if (!doc.id) {
        continue;
      }
      
      // Add a source reference
      const docWithSource = {
        ...doc,
        _source: sourceId
      };
      
      // Add to documents array
      index.documents.push(docWithSource);
      
      // Add to document map
      index.documentMap[doc.id] = docWithSource;
      
      // Index the document fields
      this.indexDocumentFields(index, docWithSource);
      
      // Generate vector embedding if semantic search is enabled
      if (this.enableSemanticSearch) {
        await this.generateDocumentEmbedding(sourceId, docWithSource);
      }
      
      indexedCount++;
    }
    
    // Update field statistics
    this.updateFieldStats(index);
    
    return indexedCount > 0;
  }
  
  /**
   * Index database results
   * @param {string} sourceId - Source identifier
   * @param {Array<Object>} results - Database results to index
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async indexDatabaseResults(sourceId, results) {
    // Similar to indexDocuments but might have different field handling
    return this.indexDocuments(sourceId, results);
  }
  
  /**
   * Index the fields of a document
   * @param {Object} index - Search index
   * @param {Object} doc - Document to index
   * @private
   */
  indexDocumentFields(index, doc) {
    // Process each field in the document
    for (const [field, value] of Object.entries(doc)) {
      // Skip internal fields
      if (field.startsWith('_')) {
        continue;
      }
      
      // Skip non-string fields
      if (typeof value !== 'string' && !Array.isArray(value)) {
        continue;
      }
      
      // Process string field
      if (typeof value === 'string') {
        this.indexTextField(index, doc.id, field, value);
      } 
      // Process array field (like tags)
      else if (Array.isArray(value)) {
        // Handle arrays of strings
        if (value.every(item => typeof item === 'string')) {
          value.forEach(item => this.indexTextField(index, doc.id, field, item));
        }
      }
    }
  }
  
  /**
   * Index a text field
   * @param {Object} index - Search index
   * @param {string} docId - Document ID
   * @param {string} field - Field name
   * @param {string} text - Field value
   * @private
   */
  indexTextField(index, docId, field, text) {
    if (!text || typeof text !== 'string') {
      return;
    }
    
    // Tokenize the text
    const tokens = this.tokenize(text);
    
    // Get inverted index
    const invertedIndex = index.invertedIndex;
    
    // Update inverted index for each token
    for (const token of tokens) {
      // Skip stop words
      if (this.isStopWord(token)) {
        continue;
      }
      
      // Initialize token entry if needed
      if (!invertedIndex[token]) {
        invertedIndex[token] = {};
      }
      
      // Initialize field entry if needed
      if (!invertedIndex[token][field]) {
        invertedIndex[token][field] = {};
      }
      
      // Update document reference
      invertedIndex[token][field][docId] = (invertedIndex[token][field][docId] || 0) + 1;
    }
  }
  
  /**
   * Update field statistics
   * @param {Object} index - Search index
   * @private
   */
  updateFieldStats(index) {
    const fieldStats = {};
    
    // Count documents with each field
    for (const doc of index.documents) {
      for (const field in doc) {
        // Skip internal fields
        if (field.startsWith('_')) {
          continue;
        }
        
        if (!fieldStats[field]) {
          fieldStats[field] = {
            count: 0,
            values: new Set()
          };
        }
        
        fieldStats[field].count++;
        
        // For faceted search, collect unique values for categorical fields
        if (this.isCategoricalField(field) && doc[field]) {
          if (Array.isArray(doc[field])) {
            for (const value of doc[field]) {
              fieldStats[field].values.add(value);
            }
          } else {
            fieldStats[field].values.add(doc[field]);
          }
        }
      }
    }
    
    // Convert sets to arrays for easier handling
    for (const field in fieldStats) {
      fieldStats[field].values = Array.from(fieldStats[field].values);
    }
    
    index.fieldStats = fieldStats;
  }
  
  /**
   * Check if a field is categorical (for faceted search)
   * @param {string} field - Field name
   * @returns {boolean} Whether the field is categorical
   * @private
   */
  isCategoricalField(field) {
    // Common categorical fields
    const categoricalFields = [
      'category', 'tags', 'type', 'status', 'language',
      'author', 'source', 'country', 'genre', 'year'
    ];
    
    return categoricalFields.includes(field.toLowerCase());
  }
  
  /**
   * Generate vector embedding for a document
   * @param {string} sourceId - Source identifier
   * @param {Object} doc - Document
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async generateDocumentEmbedding(sourceId, doc) {
    if (!this.enableSemanticSearch) {
      return false;
    }
    
    try {
      // Prepare text for embedding
      const textToEmbed = this.getDocumentText(doc);
      
      if (!textToEmbed) {
        return false;
      }
      
      // For OpenAI-based embeddings
      if (this.searchProvider === 'openai' && this.apiKeys.openai) {
        return this.generateOpenAIEmbedding(sourceId, doc.id, textToEmbed);
      }
      
      // For local vector embeddings (simplified)
      if (!this._vectorIndex.vectors[sourceId]) {
        this._vectorIndex.vectors[sourceId] = {};
      }
      
      // Generate a simple mock vector (in a real implementation, this would use a proper embedding model)
      const mockVector = Array(this._vectorIndex.dimensions).fill(0)
        .map(() => Math.random() * 2 - 1); // Random values between -1 and 1
      
      // Normalize the vector
      const magnitude = Math.sqrt(mockVector.reduce((sum, val) => sum + val * val, 0));
      const normalizedVector = mockVector.map(val => val / magnitude);
      
      // Store the vector
      this._vectorIndex.vectors[sourceId][doc.id] = normalizedVector;
      
      return true;
    } catch (error) {
      console.error(`Error generating embedding for document ${doc.id}:`, error);
      return false;
    }
  }
  
  /**
   * Generate OpenAI embedding for a document
   * @param {string} sourceId - Source identifier
   * @param {string} docId - Document ID
   * @param {string} text - Text to embed
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async generateOpenAIEmbedding(sourceId, docId, text) {
    if (!this.apiKeys.openai) {
      return false;
    }
    
    try {
      // In a real implementation, this would call the OpenAI API
      // For this example, we'll simulate it
      
      // Initialize source vector store if needed
      if (!this._vectorIndex.vectors[sourceId]) {
        this._vectorIndex.vectors[sourceId] = {};
      }
      
      // Generate a mock embedding (in reality, this would be from OpenAI)
      const mockEmbedding = Array(1536).fill(0) // OpenAI embeddings are 1536 dimensions
        .map(() => Math.random() * 2 - 1);
      
      // Normalize the vector
      const magnitude = Math.sqrt(mockEmbedding.reduce((sum, val) => sum + val * val, 0));
      const normalizedVector = mockEmbedding.map(val => val / magnitude);
      
      // Store the vector
      this._vectorIndex.vectors[sourceId][docId] = normalizedVector;
      
      return true;
    } catch (error) {
      console.error(`Error generating OpenAI embedding for document ${docId}:`, error);
      return false;
    }
  }
  
  /**
   * Get text representation of a document for embedding
   * @param {Object} doc - Document
   * @returns {string} Text representation
   * @private
   */
  getDocumentText(doc) {
    // Combine relevant fields for embedding
    const relevantFields = ['title', 'content', 'description', 'text', 'body'];
    const textParts = [];
    
    for (const field of relevantFields) {
      if (doc[field] && typeof doc[field] === 'string') {
        textParts.push(doc[field]);
      }
    }
    
    // Add other string fields if no content found
    if (textParts.length === 0) {
      for (const [field, value] of Object.entries(doc)) {
        if (typeof value === 'string' && !field.startsWith('_')) {
          textParts.push(`${field}: ${value}`);
        }
      }
    }
    
    return textParts.join(' ');
  }
  
  /**
   * Perform a search
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Object>} Search results
   */
  async search(query, options = {}) {
    if (!this.initialized) {
      throw new Error("Smart Search system not initialized");
    }
    
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return {
        query: query,
        results: [],
        totalResults: 0,
        executionTime: 0,
        facets: {}
      };
    }
    
    // Clean and normalize query
    const normalizedQuery = query.trim();
    
    // Generate search ID
    const searchId = this.generateSearchId();
    
    try {
      // Notify search start
      this._notifyListeners("onSearchStart", {
        id: searchId,
        query: normalizedQuery,
        options,
        timestamp: Date.now()
      });
      
      // Check cache if enabled
      if (this.cacheResults) {
        const cacheKey = this.getCacheKey(normalizedQuery, options);
        const cachedResult = this._searchCache[cacheKey];
        
        if (cachedResult) {
          // Update search history
          this.updateSearchHistory(normalizedQuery, cachedResult.results.length);
          
          // Notify search complete with cached results
          this._notifyListeners("onSearchComplete", {
            id: searchId,
            ...cachedResult,
            fromCache: true
          });
          
          return cachedResult;
        }
      }
      
      // Start execution timer
      const startTime = Date.now();
      
      // Set as current search
      this._currentSearch = {
        id: searchId,
        query: normalizedQuery,
        options,
        startTime,
        status: 'executing'
      };
      
      // Select search provider
      const providerName = options.provider || this.searchProvider;
      const provider = this._searchProviders[providerName];
      
      if (!provider) {
        throw new Error(`Search provider not available: ${providerName}`);
      }
      
      // Apply context if enabled
      let contextualOptions = options;
      
      if (this.enableContextualRanking && this._searchHistory.length > 0) {
        contextualOptions = this.applySearchContext(options);
      }
      
      // Prepare complete options
      const searchOptions = {
        ...this.getDefaultOptions(),
        ...contextualOptions,
        searchId
      };
      
      // Execute search with provider
      const result = await provider.search(normalizedQuery, searchOptions);
      
      // Calculate execution time
      const executionTime = Date.now() - startTime;
      
      // Add execution metadata
      const finalResult = {
        ...result,
        query: normalizedQuery,
        executionTime,
        provider: providerName
      };
      
      // Cache result if enabled
      if (this.cacheResults) {
        const cacheKey = this.getCacheKey(normalizedQuery, options);
        this._searchCache[cacheKey] = finalResult;
        
        // Trim cache if needed
        this.trimCache();
      }
      
      // Update search history
      this.updateSearchHistory(normalizedQuery, finalResult.results.length);
      
      // Reset current search
      this._currentSearch = null;
      
      // Notify search complete
      this._notifyListeners("onSearchComplete", {
        id: searchId,
        ...finalResult,
        fromCache: false
      });
      
      return finalResult;
    } catch (error) {
      console.error("Search error:", error);
      
      // Reset current search
      this._currentSearch = null;
      
      // Notify search error
      this._notifyListeners("onSearchError", {
        id: searchId,
        query: normalizedQuery,
        error: error.message,
        timestamp: Date.now()
      });
      
      throw error;
    }
  }
  
  /**
   * Perform search with debouncing for real-time search
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Object>} Search results
   */
  async searchWithDebounce(query, options = {}) {
    if (!this.initialized) {
      throw new Error("Smart Search system not initialized");
    }
    
    // Clean and normalize query
    const normalizedQuery = query.trim();
    
    // Cancel any pending search
    if (this._pendingSearch) {
      clearTimeout(this._pendingSearch.timeoutId);
    }
    
    // Create a new promise for this search
    return new Promise((resolve, reject) => {
      // If query is empty, resolve immediately with empty results
      if (!normalizedQuery) {
        resolve({
          query: normalizedQuery,
          results: [],
          totalResults: 0,
          executionTime: 0,
          facets: {}
        });
        return;
      }
      
      // Set a timeout to perform the search after delay
      const timeoutId = setTimeout(async () => {
        try {
          // Perform the actual search
          const result = await this.search(normalizedQuery, options);
          
          // Resolve the promise with the result
          resolve(result);
          
          // Clean up
          this._pendingSearch = null;
        } catch (error) {
          // Reject the promise with the error
          reject(error);
          
          // Clean up
          this._pendingSearch = null;
        }
      }, this.searchThrottleTime);
      
      // Store the pending search
      this._pendingSearch = {
        timeoutId,
        promise: { resolve, reject },
        query: normalizedQuery,
        options
      };
    });
  }
  
  /**
   * Search using local in-memory index
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Object>} Search results
   * @private
   */
  async searchLocalIndex(query, options) {
    const processedQuery = this.preprocessQuery(query);
    const searchTerms = this.tokenize(processedQuery);
    const results = [];
    const facets = {};
    const filters = options.filters || {};
    const boosting = options.boosting || this.boostingFactors;
    const maxResults = options.maxResults || this.maxResults;
    
    // Skip search if no valid terms
    if (searchTerms.length === 0) {
      return {
        query,
        results: [],
        totalResults: 0,
        facets: {}
      };
    }
    
    // Filter data sources
    const sources = options.sources || Object.keys(this._searchIndex);
    
    // Collect document scores from all sources
    const documentScores = {};
    
    for (const sourceId of sources) {
      // Skip if source doesn't exist
      if (!this._searchIndex[sourceId]) {
        continue;
      }
      
      const index = this._searchIndex[sourceId];
      
      // Calculate document scores
      for (const doc of index.documents) {
        // Skip if doesn't match filters
        if (!this.matchesFilters(doc, filters)) {
          continue;
        }
        
        // Calculate term match score
        const termScore = this.calculateTermScore(doc, searchTerms, index, boosting);
        
        // Calculate fuzzy match score if enabled
        let fuzzyScore = 0;
        if (this.enableFuzzyMatching && termScore === 0) {
          fuzzyScore = this.calculateFuzzyScore(doc, searchTerms, boosting);
        }
        
        // Get final score
        const finalScore = termScore + fuzzyScore;
        
        // Skip if score is below threshold
        if (finalScore < this.minScore) {
          continue;
        }
        
        // Get document key
        const docKey = `${sourceId}:${doc.id}`;
        
        // Add or update score
        documentScores[docKey] = {
          doc,
          score: finalScore,
          source: sourceId
        };
      }
    }
    
    // Convert scores to array and sort
    const scoredDocs = Object.values(documentScores)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
    
    // Convert to result format
    for (const {doc, score, source} of scoredDocs) {
      results.push({
        id: doc.id,
        score,
        source,
        document: doc
      });
    }
    
    // Build facets if enabled
    if (this.enableFacetedSearch) {
      for (const {doc} of scoredDocs) {
        for (const [field, value] of Object.entries(doc)) {
          // Skip non-categorical fields
          if (!this.isCategoricalField(field)) {
            continue;
          }
          
          // Initialize facet if needed
          if (!facets[field]) {
            facets[field] = {};
          }
          
          // Handle array values
          if (Array.isArray(value)) {
            for (const val of value) {
              facets[field][val] = (facets[field][val] || 0) + 1;
            }
          } 
          // Handle scalar values
          else if (value) {
            facets[field][value] = (facets[field][value] || 0) + 1;
          }
        }
      }
    }
    
    return {
      query,
      results,
      totalResults: results.length,
      facets
    };
  }
  
  /**
   * Calculate term match score for a document
   * @param {Object} doc - Document
   * @param {Array<string>} terms - Search terms
   * @param {Object} index - Search index
   * @param {Object} boosting - Field boosting factors
   * @returns {number} Term match score
   * @private
   */
  calculateTermScore(doc, terms, index, boosting) {
    let score = 0;
    const termMatches = {};
    
    // Calculate score for each term
    for (const term of terms) {
      // Skip if term not in index
      if (!index.invertedIndex[term]) {
        continue;
      }
      
      // Calculate field contribution
      for (const [field, docs] of Object.entries(index.invertedIndex[term])) {
        // Skip if document doesn't have this term in this field
        if (!docs[doc.id]) {
          continue;
        }
        
        // Get field boosting factor
        const boostFactor = boosting[field] || 1.0;
        
        // Get term frequency in document field
        const termFreq = docs[doc.id];
        
        // Get inverse document frequency
        const docsWithTerm = Object.keys(docs).length;
        const totalDocs = index.documents.length;
        const idf = Math.log(totalDocs / (docsWithTerm || 1));
        
        // TF-IDF score for this term in this field
        const fieldScore = termFreq * idf * boostFactor;
        
        // Add to total score
        score += fieldScore;
        
        // Track term match
        termMatches[term] = true;
      }
    }
    
    // Bonus for matching all terms (phrase bonus)
    if (Object.keys(termMatches).length === terms.length) {
      score *= 1.5;
    }
    
    return score;
  }
  
  /**
   * Calculate fuzzy match score for a document
   * @param {Object} doc - Document
   * @param {Array<string>} terms - Search terms
   * @param {Object} boosting - Field boosting factors
   * @returns {number} Fuzzy match score
   * @private
   */
  calculateFuzzyScore(doc, terms, boosting) {
    if (!this.enableFuzzyMatching) {
      return 0;
    }
    
    let totalScore = 0;
    
    // Fields to check for fuzzy matches
    const fieldsToCheck = ['title', 'content', 'description', 'text', 'body', 'tags'];
    
    for (const field of fieldsToCheck) {
      // Skip if document doesn't have this field
      if (!doc[field]) {
        continue;
      }
      
      // Get field value
      const fieldValue = doc[field];
      
      // Skip non-string fields that aren't arrays
      if (typeof fieldValue !== 'string' && !Array.isArray(fieldValue)) {
        continue;
      }
      
      // Tokenize field value
      const fieldTokens = typeof fieldValue === 'string' 
        ? this.tokenize(fieldValue)
        : fieldValue.filter(v => typeof v === 'string').flatMap(v => this.tokenize(v));
      
      // Get boosting factor
      const boostFactor = boosting[field] || 1.0;
      
      // Calculate score for each search term
      for (const term of terms) {
        let bestDistance = Infinity;
        
        // Find best fuzzy match
        for (const token of fieldTokens) {
          // Skip very short tokens
          if (token.length < 3) continue;
          
          // Calculate Levenshtein distance
          const distance = this.levenshteinDistance(term, token);
          
          // Track best distance
          if (distance < bestDistance) {
            bestDistance = distance;
          }
        }
        
        // Convert distance to score (closer is better)
        if (bestDistance < Infinity) {
          // Only count as match if distance is small enough
          const maxDistance = this.getFuzzyDistanceThreshold();
          
          if (bestDistance <= maxDistance) {
            // Score decreases as distance increases
            const fuzzyScore = (maxDistance - bestDistance) / maxDistance;
            totalScore += fuzzyScore * boostFactor;
          }
        }
      }
    }
    
    return totalScore;
  }
  
  /**
   * Check if a document matches the given filters
   * @param {Object} doc - Document to check
   * @param {Object} filters - Filters to apply
   * @returns {boolean} Whether the document matches all filters
   * @private
   */
  matchesFilters(doc, filters) {
    if (!filters || Object.keys(filters).length === 0) {
      return true;
    }
    
    // Check each filter
    for (const [field, filter] of Object.entries(filters)) {
      // Skip if document doesn't have the field
      if (!(field in doc)) {
        return false;
      }
      
      const value = doc[field];
      
      // Handle array values
      if (Array.isArray(value)) {
        // Array should contain at least one of the filter values
        if (Array.isArray(filter)) {
          if (!filter.some(f => value.includes(f))) {
            return false;
          }
        } 
        // Array should contain the filter value
        else {
          if (!value.includes(filter)) {
            return false;
          }
        }
      }
      // Handle range filters for numeric fields
      else if (typeof filter === 'object' && (filter.min !== undefined || filter.max !== undefined)) {
        if (typeof value !== 'number') {
          return false;
        }
        
        if (filter.min !== undefined && value < filter.min) {
          return false;
        }
        
        if (filter.max !== undefined && value > filter.max) {
          return false;
        }
      }
      // Handle date range filters
      else if (typeof filter === 'object' && (filter.before !== undefined || filter.after !== undefined)) {
        const dateValue = typeof value === 'string' ? new Date(value) : value;
        
        if (!(dateValue instanceof Date) || isNaN(dateValue)) {
          return false;
        }
        
        if (filter.after !== undefined) {
          const afterDate = typeof filter.after === 'string' ? new Date(filter.after) : filter.after;
          if (dateValue < afterDate) {
            return false;
          }
        }
        
        if (filter.before !== undefined) {
          const beforeDate = typeof filter.before === 'string' ? new Date(filter.before) : filter.before;
          if (dateValue > beforeDate) {
            return false;
          }
        }
      }
      // Handle array of possible values
      else if (Array.isArray(filter)) {
        if (!filter.includes(value)) {
          return false;
        }
      }
      // Handle simple equality
      else if (value !== filter) {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Search using Elasticsearch
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Object>} Search results
   * @private
   */
  async searchElasticsearch(query, options) {
    if (!this.apiKeys.elasticsearch) {
      throw new Error("Elasticsearch API key not configured");
    }
    
    try {
      // In a real implementation, this would use the Elasticsearch API
      // Here we'll just simulate it
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate results
      return {
        query,
        results: [],
        totalResults: 0,
        facets: {}
      };
    } catch (error) {
      console.error("Elasticsearch search error:", error);
      throw error;
    }
  }
  
  /**
   * Search using OpenAI
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Object>} Search results
   * @private
   */
  async searchWithOpenAI(query, options) {
    if (!this.apiKeys.openai) {
      throw new Error("OpenAI API key not configured");
    }
    
    try {
      // In a real implementation, this would use the OpenAI API to generate embeddings
      // and perform semantic search. Here we'll just simulate it
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Simulate results
      return {
        query,
        results: [],
        totalResults: 0,
        facets: {}
      };
    } catch (error) {
      console.error("OpenAI search error:", error);
      throw error;
    }
  }
  
  /**
   * Get local suggestions based on partial query
   * @param {string} partial - Partial query
   * @param {Object} options - Suggestion options
   * @returns {Promise<Array<string>>} Suggestions
   * @private
   */
  async getLocalSuggestions(partial, options) {
    if (!partial || typeof partial !== 'string' || partial.length < 2) {
      return [];
    }
    
    const limit = options.limit || 10;
    const suggestions = new Set();
    
    // Get search term prefix
    const partialLower = partial.toLowerCase();
    
    // Check vocabulary index
    for (const domain in this._vocabularyIndex) {
      // Skip ngrams
      if (domain === 'ngrams') continue;
      
      const vocabulary = this._vocabularyIndex[domain];
      
      for (const term of vocabulary) {
        if (term.toLowerCase().startsWith(partialLower)) {
          suggestions.add(term);
          
          if (suggestions.size >= limit) {
            break;
          }
        }
      }
      
      if (suggestions.size >= limit) {
        break;
      }
    }
    
    // Check ngram completions
    for (const [prefix, completions] of Object.entries(this._vocabularyIndex.ngrams || {})) {
      if (partialLower.endsWith(prefix + ' ')) {
        for (const completion of completions) {
          suggestions.add(`${partial}${completion}`);
          
          if (suggestions.size >= limit) {
            break;
          }
        }
      }
    }
    
    // Check search history for similar queries
    for (const entry of this._searchHistory) {
      if (entry.query.toLowerCase().startsWith(partialLower)) {
        suggestions.add(entry.query);
        
        if (suggestions.size >= limit) {
          break;
        }
      }
    }
    
    // Check search index for matching terms (to suggest entity names)
    for (const sourceId in this._searchIndex) {
      const index = this._searchIndex[sourceId];
      
      for (const doc of index.documents) {
        // Check title field for matches
        if (doc.title && typeof doc.title === 'string') {
          const titleLower = doc.title.toLowerCase();
          
          if (titleLower.startsWith(partialLower)) {
            suggestions.add(doc.title);
            
            if (suggestions.size >= limit) {
              break;
            }
          }
        }
      }
      
      if (suggestions.size >= limit) {
        break;
      }
    }
    
    return Array.from(suggestions).slice(0, limit);
  }
  
  /**
   * Get suggestions from Elasticsearch
   * @param {string} partial - Partial query
   * @param {Object} options - Suggestion options
   * @returns {Promise<Array<string>>} Suggestions
   * @private
   */
  async getElasticsearchSuggestions(partial, options) {
    if (!this.apiKeys.elasticsearch) {
      throw new Error("Elasticsearch API key not configured");
    }
    
    // In a real implementation, this would use Elasticsearch's completion suggester
    // Here we'll just simulate it
    return this.getLocalSuggestions(partial, options);
  }
  
  /**
   * Get suggestions from OpenAI
   * @param {string} partial - Partial query
   * @param {Object} options - Suggestion options
   * @returns {Promise<Array<string>>} Suggestions
   * @private
   */
  async getOpenAISuggestions(partial, options) {
    if (!this.apiKeys.openai) {
      throw new Error("OpenAI API key not configured");
    }
    
    // In a real implementation, this would use OpenAI's API
    // Here we'll just simulate it
    return this.getLocalSuggestions(partial, options);
  }
  
  /**
   * Get search suggestions
   * @param {string} partial - Partial query
   * @param {Object} options - Suggestion options
   * @returns {Promise<Array<string>>} Suggestions
   */
  async getSuggestions(partial, options = {}) {
    if (!this.initialized) {
      throw new Error("Smart Search system not initialized");
    }
    
    if (!this.enableSuggestions) {
      return [];
    }
    
    if (!partial || typeof partial !== 'string') {
      return [];
    }
    
    try {
      // Select provider
      const providerName = options.provider || this.searchProvider;
      const provider = this._searchProviders[providerName];
      
      if (!provider) {
        throw new Error(`Provider not available: ${providerName}`);
      }
      
      // Get suggestions
      const suggestions = await provider.getSuggestions(partial, {
        ...this.getDefaultOptions(),
        ...options
      });
      
      // Notify listeners
      this._notifyListeners("onSuggestions", {
        partial,
        suggestions,
        timestamp: Date.now()
      });
      
      return suggestions;
    } catch (error) {
      console.error("Error getting suggestions:", error);
      return [];
    }
  }
  
  /**
   * Get facet values for a specific field
   * @param {string} field - Field name
   * @returns {Promise<Object>} Facet values and counts
   */
  async getFacets(field) {
    if (!this.initialized) {
      throw new Error("Smart Search system not initialized");
    }
    
    if (!this.enableFacetedSearch) {
      return {};
    }
    
    if (!field || typeof field !== 'string') {
      return {};
    }
    
    try {
      const facets = {};
      
      // Collect facets from all sources
      for (const sourceId in this._searchIndex) {
        const index = this._searchIndex[sourceId];
        
        // Skip if no field stats
        if (!index.fieldStats || !index.fieldStats[field]) {
          continue;
        }
        
        // Get values for this field
        const values = index.fieldStats[field].values || [];
        
        // Count occurrences of each value
        for (const value of values) {
          facets[value] = (facets[value] || 0) + 1;
        }
      }
      
      return facets;
    } catch (error) {
      console.error(`Error getting facets for field ${field}:`, error);
      return {};
    }
  }
  
  /**
   * Apply search context to options
   * @param {Object} options - Original search options
   * @returns {Object} Options with context applied
   * @private
   */
  applySearchContext(options) {
    if (!this.enableContextualRanking || this._searchHistory.length === 0) {
      return options;
    }
    
    // Get recent history
    const recentHistory = this._searchHistory.slice(-this.contextWindow);
    
    // Extract contextual boosting
    const contextualBoosting = {...(options.boosting || this.boostingFactors)};
    
    // Analyze recent searches for patterns
    const recentTerms = new Set();
    
    for (const entry of recentHistory) {
      // Add terms to context
      const terms = this.tokenize(entry.query);
      terms.forEach(term => recentTerms.add(term));
    }
    
    // Create contextual filters
    const contextualFilters = {...(options.filters || {})};
    
    // Return options with context applied
    return {
      ...options,
      boosting: contextualBoosting,
      filters: contextualFilters,
      context: {
        recentTerms: Array.from(recentTerms),
        recentQueries: recentHistory.map(h => h.query)
      }
    };
  }
  
  /**
   * Update search history
   * @param {string} query - Search query
   * @param {number} resultCount - Number of results
   * @private
   */
  updateSearchHistory(query, resultCount) {
    // Add to history
    this._searchHistory.push({
      query,
      timestamp: Date.now(),
      resultCount
    });
    
    // Limit history size
    if (this._searchHistory.length > 100) {
      this._searchHistory = this._searchHistory.slice(-100);
    }
  }
  
  /**
   * Get default search options
   * @returns {Object} Default options
   * @private
   */
  getDefaultOptions() {
    return {
      maxResults: this.maxResults,
      minScore: this.minScore,
      fuzzyMatching: this.enableFuzzyMatching,
      fuzzyMatchingLevel: this.fuzzyMatchingLevel,
      semanticSearch: this.enableSemanticSearch,
      facetedSearch: this.enableFacetedSearch,
      boosting: this.boostingFactors,
      timeout: this.timeout
    };
  }
  
  /**
   * Preprocess search query
   * @param {string} query - Original query
   * @returns {string} Processed query
   * @private
   */
  preprocessQuery(query) {
    if (!query) {
      return '';
    }
    
    let processed = query;
    
    // Remove extra whitespace
    processed = processed.replace(/\s+/g, ' ').trim();
    
    // Handle special operators if needed
    // ...
    
    return processed;
  }
  
  /**
   * Tokenize text into terms
   * @param {string} text - Text to tokenize
   * @returns {Array<string>} Tokens
   * @private
   */
  tokenize(text) {
    if (!text || typeof text !== 'string') {
      return [];
    }
    
    // Convert to lowercase
    const lowerText = text.toLowerCase();
    
    // Split into words
    const words = lowerText.match(/\b(\w+)\b/g) || [];
    
    // Remove empty strings and stop words
    return words.filter(word => word && !this.isStopWord(word));
  }
  
  /**
   * Check if a word is a stop word
   * @param {string} word - Word to check
   * @returns {boolean} Whether the word is a stop word
   * @private
   */
  isStopWord(word) {
    // Check default stop words
    if (this._defaultStopWords.includes(word)) {
      return true;
    }
    
    // Check custom stop words
    if (this.customStopWords.includes(word)) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Get list of common stop words
   * @returns {Array<string>} List of stop words
   * @private
   */
  getDefaultStopWords() {
    return [
      "a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
      "has", "he", "in", "is", "it", "its", "of", "on", "that", "the",
      "to", "was", "were", "will", "with"
    ];
  }
  
  /**
   * Calculate Levenshtein distance between two strings
   * @param {string} a - First string
   * @param {string} b - Second string
   * @returns {number} Edit distance
   * @private
   */
  levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    
    const matrix = [];
    
    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (let i = 0; i <= a.length; i++) {
      matrix[0][i] = i;
    }
    
    // Fill matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  }
  
  /**
   * Get maximum edit distance for fuzzy matching
   * @returns {number} Maximum edit distance
   * @private
   */
  getFuzzyDistanceThreshold() {
    switch (this.fuzzyMatchingLevel) {
      case 'low':
        return 1;
      case 'high':
        return 3;
      case 'medium':
      default:
        return 2;
    }
  }
  
  /**
   * Generate a cache key
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {string} Cache key
   * @private
   */
  getCacheKey(query, options) {
    // Extract relevant options for cache key
    const cacheOptions = {
      provider: options.provider || this.searchProvider,
      filters: options.filters || {},
      sources: options.sources || [],
      maxResults: options.maxResults || this.maxResults
    };
    
    // Join query and options
    return `${query}|${JSON.stringify(cacheOptions)}`;
  }
  
  /**
   * Trim the search cache
   * @private
   */
  trimCache() {
    const cacheKeys = Object.keys(this._searchCache);
    
    if (cacheKeys.length > this.maxCacheSize) {
      // Find oldest entries
      const entriesWithTime = cacheKeys.map(key => ({
        key,
        time: this._searchCache[key].timestamp || 0
      }));
      
      // Sort by time (oldest first)
      entriesWithTime.sort((a, b) => a.time - b.time);
      
      // Remove oldest entries to bring size back to 75% of max
      const entriesToRemove = entriesWithTime.slice(0, entriesWithTime.length - Math.floor(this.maxCacheSize * 0.75));
      
      for (const {key} of entriesToRemove) {
        delete this._searchCache[key];
      }
    }
  }
  
  /**
   * Generate a unique search ID
   * @returns {string} Search ID
   * @private
   */
  generateSearchId() {
    return `search_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
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
   * Set API key for a provider
   * @param {string} provider - Provider name
   * @param {string} apiKey - API key
   * @returns {boolean} Success status
   */
  setApiKey(provider, apiKey) {
    this.apiKeys[provider] = apiKey;
    return true;
  }
  
  /**
   * Set the search provider
   * @param {string} provider - Provider name
   * @returns {boolean} Success status
   */
  setSearchProvider(provider) {
    if (!this._searchProviders[provider]) {
      console.warn(`Provider not available: ${provider}`);
      return false;
    }
    
    this.searchProvider = provider;
    return true;
  }
  
  /**
   * Set the search mode
   * @param {string} mode - Search mode
   * @returns {boolean} Success status
   */
  setSearchMode(mode) {
    const validModes = ['standard', 'semantic', 'hybrid'];
    
    if (!validModes.includes(mode)) {
      console.warn(`Invalid search mode: ${mode}`);
      return false;
    }
    
    this.searchMode = mode;
    return true;
  }
  
  /**
   * Set boosting factors for fields
   * @param {Object} boosting - Boosting factors
   * @returns {boolean} Success status
   */
  setBoostingFactors(boosting) {
    if (!boosting || typeof boosting !== 'object') {
      return false;
    }
    
    this.boostingFactors = {...this.boostingFactors, ...boosting};
    return true;
  }
  
  /**
   * Clear the search cache
   * @returns {boolean} Success status
   */
  clearCache() {
    this._searchCache = {};
    return true;
  }
  
  /**
   * Clear the search history
   * @returns {boolean} Success status
   */
  clearHistory() {
    this._searchHistory = [];
    return true;
  }
  
  /**
   * Get search history
   * @param {number} limit - Maximum entries to return
   * @returns {Array<Object>} Search history
   */
  getSearchHistory(limit = 0) {
    if (limit <= 0 || limit >= this._searchHistory.length) {
      return [...this._searchHistory];
    }
    
    return this._searchHistory.slice(-limit);
  }
  
  /**
   * Get available data sources
   * @returns {Array<Object>} Data sources
   */
  getDataSources() {
    return this._dataSources.map(source => ({
      id: source.id,
      type: source.type,
      documentCount: this._searchIndex[source.id]?.documents.length || 0
    }));
  }
  
  /**
   * Get available fields across all sources
   * @returns {Object} Fields and their statistics
   */
  getAvailableFields() {
    const fields = {};
    
    for (const sourceId in this._searchIndex) {
      const index = this._searchIndex[sourceId];
      
      if (!index.fieldStats) {
        continue;
      }
      
      for (const [field, stats] of Object.entries(index.fieldStats)) {
        if (!fields[field]) {
          fields[field] = {
            count: 0,
            sources: [],
            categorical: this.isCategoricalField(field),
            values: []
          };
        }
        
        fields[field].count += stats.count;
        
        if (!fields[field].sources.includes(sourceId)) {
          fields[field].sources.push(sourceId);
        }
        
        // Add unique values for categorical fields
        if (fields[field].categorical && stats.values) {
          for (const value of stats.values) {
            if (!fields[field].values.includes(value)) {
              fields[field].values.push(value);
            }
          }
        }
      }
    }
    
    return fields;
  }
  
  /**
   * Get current configuration
   * @returns {Object} Current configuration
   */
  getConfiguration() {
    return {
      version: this.version,
      initialized: this.initialized,
      provider: this.searchProvider,
      mode: this.searchMode,
      language: this.language,
      features: {
        fuzzyMatching: this.enableFuzzyMatching,
        semanticSearch: this.enableSemanticSearch,
        contextualRanking: this.enableContextualRanking,
        suggestions: this.enableSuggestions,
        facetedSearch: this.enableFacetedSearch,
        crossSourceSearch: this.enableCrossSourceSearch,
        predictiveSearch: this.enablePredictiveSearch
      },
      settings: {
        maxResults: this.maxResults,
        minScore: this.minScore,
        fuzzyMatchingLevel: this.fuzzyMatchingLevel,
        contextWindow: this.contextWindow,
        boostingFactors: this.boostingFactors
      },
      performance: {
        cacheResults: this.cacheResults,
        maxCacheSize: this.maxCacheSize,
        searchThrottleTime: this.searchThrottleTime,
        timeout: this.timeout
      },
      stats: {
        dataSources: this._dataSources.length,
        cacheSize: Object.keys(this._searchCache).length,
        historySize: this._searchHistory.length
      }
    };
  }
}

// Export the class for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmartSearch;
} else if (typeof window !== 'undefined') {
  window.SmartSearch = SmartSearch;
}
/**
 * JAAT-AI Feature: Knowledge Management
 * Version: 1.0.0
 * 
 * This module provides comprehensive knowledge management capabilities including:
 * - Knowledge base creation and maintenance
 * - Information retrieval with semantic search
 * - Knowledge graph construction and navigation
 * - Fact verification and source tracking
 * - Automatic knowledge updating
 * - Knowledge organization with hierarchical taxonomy
 */

class KnowledgeManagement {
  constructor() {
    // Core properties
    this.version = "1.0.0";
    this.initialized = false;
    
    // Knowledge settings
    this.storageProvider = "memory"; // memory, database, vector-db
    this.vectorDimensions = 1536; // OpenAI uses 1536-dimensional vectors
    this.maxResults = 10; // Maximum search results
    this.minRelevanceScore = 0.7; // Minimum relevance score (0-1)
    this.autoUpdateInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    // Features
    this.enableSemanticSearch = true;
    this.enableFactVerification = true;
    this.enableSourceTracking = true;
    this.enableKnowledgeGraph = true;
    this.enableAutoUpdate = false;
    this.enableHierarchicalTaxonomy = true;
    
    // Security settings
    this.enableAccessControl = false;
    this.requireSourceVerification = true;
    this.enforceTrustScores = true;
    this.minimumTrustScore = 0.6; // Minimum trust score for facts (0-1)
    
    // API Keys (should be set securely)
    this.apiKeys = {};
    
    // Internal state
    this._knowledgeBase = {};
    this._knowledgeGraph = {};
    this._vectorStore = {};
    this._sources = {};
    this._taxonomyTree = {};
    this._listeners = {
      onKnowledgeAdded: [],
      onKnowledgeUpdated: [],
      onKnowledgeRemoved: [],
      onKnowledgeSearched: [],
      onSourceVerified: []
    };
    this._searchIndex = {};
    this._lastUpdateTime = Date.now();
  }
  
  /**
   * Initialize the knowledge management system
   * @param {Object} options - Configuration options
   * @returns {Promise<boolean>} Success status
   */
  async initialize(options = {}) {
    try {
      console.log("Initializing Knowledge Management system...");
      
      // Apply custom options
      if (options.storageProvider) this.storageProvider = options.storageProvider;
      if (options.vectorDimensions) this.vectorDimensions = options.vectorDimensions;
      if (options.maxResults) this.maxResults = options.maxResults;
      if (options.minRelevanceScore) this.minRelevanceScore = options.minRelevanceScore;
      if (options.autoUpdateInterval) this.autoUpdateInterval = options.autoUpdateInterval;
      if (options.enableSemanticSearch !== undefined) this.enableSemanticSearch = options.enableSemanticSearch;
      if (options.enableFactVerification !== undefined) this.enableFactVerification = options.enableFactVerification;
      if (options.enableSourceTracking !== undefined) this.enableSourceTracking = options.enableSourceTracking;
      if (options.enableKnowledgeGraph !== undefined) this.enableKnowledgeGraph = options.enableKnowledgeGraph;
      if (options.enableAutoUpdate !== undefined) this.enableAutoUpdate = options.enableAutoUpdate;
      if (options.enableHierarchicalTaxonomy !== undefined) this.enableHierarchicalTaxonomy = options.enableHierarchicalTaxonomy;
      if (options.enableAccessControl !== undefined) this.enableAccessControl = options.enableAccessControl;
      if (options.requireSourceVerification !== undefined) this.requireSourceVerification = options.requireSourceVerification;
      if (options.enforceTrustScores !== undefined) this.enforceTrustScores = options.enforceTrustScores;
      if (options.minimumTrustScore !== undefined) this.minimumTrustScore = options.minimumTrustScore;
      if (options.apiKeys) this.apiKeys = {...this.apiKeys, ...options.apiKeys};
      
      // Initialize storage provider
      await this.initializeStorage();
      
      // Initialize search index
      if (this.enableSemanticSearch) {
        await this.initializeSearchIndex();
      }
      
      // Initialize knowledge graph
      if (this.enableKnowledgeGraph) {
        await this.initializeKnowledgeGraph();
      }
      
      // Initialize taxonomy if enabled
      if (this.enableHierarchicalTaxonomy) {
        await this.initializeTaxonomy();
      }
      
      // Load initial knowledge if provided
      if (options.initialKnowledge) {
        await this.loadInitialKnowledge(options.initialKnowledge);
      }
      
      // Set up auto-update if enabled
      if (this.enableAutoUpdate) {
        this.setupAutoUpdate();
      }
      
      this.initialized = true;
      console.log("Knowledge Management system initialized successfully.");
      return true;
    } catch (error) {
      console.error("Failed to initialize Knowledge Management:", error);
      return false;
    }
  }
  
  /**
   * Initialize storage provider
   * @returns {Promise<void>}
   * @private
   */
  async initializeStorage() {
    // Set up storage based on provider type
    switch (this.storageProvider) {
      case "memory":
        // In-memory storage (default)
        this._knowledgeBase = {};
        break;
      
      case "database":
        // Here you would connect to a database
        // Simulated for this implementation
        console.log("Simulating database connection for knowledge storage");
        this._knowledgeBase = {};
        break;
        
      case "vector-db":
        // Here you would connect to a vector database
        // Simulated for this implementation
        console.log("Simulating vector database connection for knowledge storage");
        this._knowledgeBase = {};
        this._vectorStore = {
          vectors: {},
          metadata: {}
        };
        break;
        
      default:
        // Fall back to in-memory
        console.warn(`Unsupported storage provider: ${this.storageProvider}. Using in-memory storage.`);
        this._knowledgeBase = {};
    }
  }
  
  /**
   * Initialize search index
   * @returns {Promise<void>}
   * @private
   */
  async initializeSearchIndex() {
    // Initialize search index based on storage type
    if (this.storageProvider === "vector-db") {
      // Vector DB already handles search
      return;
    }
    
    // Simple in-memory search index
    this._searchIndex = {
      texts: [],
      vectors: [],
      metadata: []
    };
    
    console.log("Initialized semantic search index");
  }
  
  /**
   * Initialize knowledge graph
   * @returns {Promise<void>}
   * @private
   */
  async initializeKnowledgeGraph() {
    // Initialize empty graph
    this._knowledgeGraph = {
      nodes: {},
      edges: {},
      nodeTypes: {},
      edgeTypes: {},
      metadata: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        nodeCount: 0,
        edgeCount: 0
      }
    };
    
    // Initialize default node types
    this._knowledgeGraph.nodeTypes = {
      concept: {
        name: "Concept",
        color: "#6495ED", // Cornflower blue
        description: "A general concept or idea",
        properties: ["name", "description", "examples"]
      },
      entity: {
        name: "Entity",
        color: "#9ACD32", // Yellow green
        description: "A specific named entity",
        properties: ["name", "description", "category", "aliases"]
      },
      event: {
        name: "Event",
        color: "#FF7F50", // Coral
        description: "An event or occurrence",
        properties: ["name", "description", "date", "location", "participants"]
      },
      fact: {
        name: "Fact",
        color: "#FFD700", // Gold
        description: "A specific fact or piece of information",
        properties: ["statement", "truth", "confidence", "sources"]
      },
      category: {
        name: "Category",
        color: "#BA55D3", // Medium orchid
        description: "A category or classification",
        properties: ["name", "description", "parent"]
      }
    };
    
    // Initialize default edge types
    this._knowledgeGraph.edgeTypes = {
      isA: {
        name: "is a",
        description: "Represents an 'is a' relationship (hyponymy)",
        bidirectional: false,
        color: "#4682B4" // Steel blue
      },
      hasPart: {
        name: "has part",
        description: "Represents a 'has part' relationship (meronymy)",
        bidirectional: false,
        color: "#2E8B57" // Sea green
      },
      relatedTo: {
        name: "related to",
        description: "Represents a generic relation between nodes",
        bidirectional: true,
        color: "#A9A9A9" // Dark gray
      },
      causes: {
        name: "causes",
        description: "Represents a causal relationship",
        bidirectional: false,
        color: "#CD5C5C" // Indian red
      },
      synonym: {
        name: "synonym of",
        description: "Represents synonyms",
        bidirectional: true,
        color: "#20B2AA" // Light sea green
      }
    };
    
    console.log("Initialized knowledge graph structure");
  }
  
  /**
   * Initialize taxonomy
   * @returns {Promise<void>}
   * @private
   */
  async initializeTaxonomy() {
    // Create root taxonomy node
    this._taxonomyTree = {
      id: "root",
      name: "Knowledge Root",
      description: "Root of the knowledge taxonomy",
      children: [],
      metadata: {
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    };
    
    // Add basic top-level categories
    const topCategories = [
      {
        id: "science",
        name: "Science",
        description: "Scientific knowledge and concepts"
      },
      {
        id: "technology",
        name: "Technology",
        description: "Technology and computing concepts"
      },
      {
        id: "arts",
        name: "Arts & Culture",
        description: "Arts, culture, and humanities"
      },
      {
        id: "society",
        name: "Society",
        description: "Society, social sciences, and human interactions"
      }
    ];
    
    // Add top categories as children of root
    for (const category of topCategories) {
      this._taxonomyTree.children.push({
        ...category,
        children: [],
        metadata: {
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      });
    }
    
    // Add some second-level categories
    await this.addTaxonomyNode("science", {
      id: "physics",
      name: "Physics",
      description: "Physical sciences"
    });
    
    await this.addTaxonomyNode("science", {
      id: "biology",
      name: "Biology",
      description: "Life sciences"
    });
    
    await this.addTaxonomyNode("technology", {
      id: "computers",
      name: "Computers",
      description: "Computer science and hardware"
    });
    
    await this.addTaxonomyNode("technology", {
      id: "software",
      name: "Software",
      description: "Software and applications"
    });
    
    console.log("Initialized knowledge taxonomy");
  }
  
  /**
   * Load initial knowledge
   * @param {Array<Object>} items - Knowledge items to load
   * @returns {Promise<number>} Number of items loaded
   * @private
   */
  async loadInitialKnowledge(items) {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return 0;
    }
    
    let loadedCount = 0;
    
    for (const item of items) {
      try {
        await this.addKnowledgeItem(item);
        loadedCount++;
      } catch (error) {
        console.error(`Error loading knowledge item: ${error.message}`);
      }
    }
    
    console.log(`Loaded ${loadedCount} initial knowledge items`);
    return loadedCount;
  }
  
  /**
   * Setup automatic knowledge updates
   * @private
   */
  setupAutoUpdate() {
    // This would typically set up a recurring job to update knowledge
    // For this implementation, we'll just log a message
    console.log(`Auto-update configured to run every ${this.autoUpdateInterval / (60 * 60 * 1000)} hours`);
    
    // In a real implementation, you would use setInterval or a job scheduler
    // setInterval(() => this.performAutoUpdate(), this.autoUpdateInterval);
  }
  
  /**
   * Add a knowledge item to the system
   * @param {Object} item - Knowledge item to add
   * @returns {Promise<Object>} Added knowledge item
   */
  async addKnowledgeItem(item) {
    if (!this.initialized) {
      throw new Error("Knowledge Management system not initialized");
    }
    
    // Validate item
    if (!item || typeof item !== 'object') {
      throw new Error("Invalid knowledge item format");
    }
    
    if (!item.content) {
      throw new Error("Knowledge item must contain content");
    }
    
    try {
      // Generate ID if not provided
      const id = item.id || this.generateKnowledgeId();
      
      // Check for duplicates
      if (this._knowledgeBase[id]) {
        throw new Error(`Knowledge item with ID ${id} already exists`);
      }
      
      // Process item metadata
      const timestamp = Date.now();
      
      // Create knowledge item with standard structure
      const knowledgeItem = {
        id,
        content: item.content,
        title: item.title || `Item ${id}`,
        type: item.type || "fact",
        tags: item.tags || [],
        category: item.category || "general",
        metadata: {
          ...item.metadata,
          createdAt: timestamp,
          updatedAt: timestamp,
          createdBy: item.author || "system"
        }
      };
      
      // Add source information if provided
      if (item.source) {
        knowledgeItem.source = this.processSource(item.source);
      }
      
      // Calculate trust score
      knowledgeItem.trustScore = item.trustScore || await this.calculateTrustScore(knowledgeItem);
      
      // Verify fact if enabled and sufficient information is provided
      if (this.enableFactVerification && knowledgeItem.type === "fact" && knowledgeItem.content) {
        knowledgeItem.verified = await this.verifyFact(knowledgeItem);
      }
      
      // Skip if trust score is too low and enforcement is enabled
      if (this.enforceTrustScores && knowledgeItem.trustScore < this.minimumTrustScore) {
        throw new Error(`Trust score too low: ${knowledgeItem.trustScore.toFixed(2)}`);
      }
      
      // Generate vector embedding if semantic search is enabled
      if (this.enableSemanticSearch) {
        const embedding = await this.generateEmbedding(knowledgeItem.content);
        
        // Store embedding based on storage type
        if (this.storageProvider === "vector-db") {
          this._vectorStore.vectors[id] = embedding;
          this._vectorStore.metadata[id] = {
            title: knowledgeItem.title,
            type: knowledgeItem.type,
            category: knowledgeItem.category,
            tags: knowledgeItem.tags
          };
        } else {
          // Store in search index
          this._searchIndex.texts.push(knowledgeItem.content);
          this._searchIndex.vectors.push(embedding);
          this._searchIndex.metadata.push({
            id,
            title: knowledgeItem.title,
            type: knowledgeItem.type,
            category: knowledgeItem.category,
            tags: knowledgeItem.tags
          });
        }
      }
      
      // Add to knowledge base
      this._knowledgeBase[id] = knowledgeItem;
      
      // Add to knowledge graph if enabled
      if (this.enableKnowledgeGraph) {
        await this.addToKnowledgeGraph(knowledgeItem);
      }
      
      // Add to taxonomy if enabled
      if (this.enableHierarchicalTaxonomy && knowledgeItem.category) {
        await this.addToTaxonomy(knowledgeItem);
      }
      
      // Notify listeners
      this._notifyListeners("onKnowledgeAdded", {
        item: knowledgeItem,
        timestamp: Date.now()
      });
      
      return knowledgeItem;
    } catch (error) {
      console.error("Error adding knowledge item:", error);
      throw error;
    }
  }
  
  /**
   * Process source information
   * @param {Object|string} source - Source information
   * @returns {Object} Processed source
   * @private
   */
  processSource(source) {
    // Handle string sources (convert to object)
    if (typeof source === 'string') {
      return {
        url: source.startsWith('http') ? source : null,
        name: source,
        type: "unknown",
        retrievedAt: Date.now(),
        verified: false
      };
    }
    
    // Handle object sources
    const processedSource = {
      url: source.url || null,
      name: source.name || "Unknown Source",
      type: source.type || "unknown",
      retrievedAt: source.retrievedAt || Date.now(),
      verified: source.verified || false,
      authors: source.authors || [],
      publishedAt: source.publishedAt || null,
      credibilityScore: source.credibilityScore || 0.5
    };
    
    // Store in sources collection if tracking enabled
    if (this.enableSourceTracking && processedSource.url) {
      this._sources[processedSource.url] = processedSource;
    }
    
    return processedSource;
  }
  
  /**
   * Calculate trust score for a knowledge item
   * @param {Object} item - Knowledge item
   * @returns {Promise<number>} Trust score (0-1)
   * @private
   */
  async calculateTrustScore(item) {
    // Simple trust score calculation
    let score = 0.5; // Default score
    
    // Adjust based on presence of a source
    if (item.source) {
      score += 0.2;
      
      // Adjust based on source credibility
      if (item.source.credibilityScore) {
        score += item.source.credibilityScore * 0.2;
      }
      
      // Adjust based on source verification
      if (item.source.verified) {
        score += 0.1;
      }
    }
    
    // Adjust based on fact verification
    if (item.verified) {
      score += 0.2;
    }
    
    // Cap at 0-1 range
    return Math.max(0, Math.min(1, score));
  }
  
  /**
   * Verify a fact
   * @param {Object} item - Fact to verify
   * @returns {Promise<Object>} Verification result
   * @private
   */
  async verifyFact(item) {
    // In a real implementation, this would verify facts against trusted sources
    // or use AI/LLM to assess factual accuracy
    
    // For demonstration purposes, we'll do a simplified check
    
    // Check if we have a source
    if (this.requireSourceVerification && (!item.source || !item.source.url)) {
      return {
        verified: false,
        confidence: 0.3,
        method: "source_check",
        reason: "No source provided"
      };
    }
    
    // Simple word-based verification (simulation)
    const content = item.content.toLowerCase();
    
    // Flag potentially unreliable content
    const unreliablePatterns = [
      "always", "never", "all", "none", "every", "absolutely", 
      "guaranteed", "definitely", "100%", "certainly", "undoubtedly"
    ];
    
    for (const pattern of unreliablePatterns) {
      if (content.includes(pattern)) {
        return {
          verified: false,
          confidence: 0.4,
          method: "pattern_match",
          reason: `Contains absolute term: ${pattern}`
        };
      }
    }
    
    // Simulate verification success for most items
    return {
      verified: true,
      confidence: 0.8,
      method: "simulated",
      verifiedAt: Date.now()
    };
  }
  
  /**
   * Generate a vector embedding
   * @param {string} text - Text to embed
   * @returns {Promise<Array<number>>} Vector embedding
   * @private
   */
  async generateEmbedding(text) {
    // In a real implementation, this would call an embedding model API
    // like OpenAI or use a local model
    
    // For this example, we'll generate a simple random vector
    // Note: This is not suitable for real semantic search!
    
    if (this.apiKeys.openai && false) { // Disabled for simulation
      // This would use OpenAI's embeddings API
      // Left commented as a placeholder for actual implementation
      /*
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKeys.openai}`
        },
        body: JSON.stringify({
          model: "text-embedding-ada-002",
          input: text
        })
      });
      
      const data = await response.json();
      return data.data[0].embedding;
      */
    }
    
    // Generate a mock embedding vector
    return Array(this.vectorDimensions).fill(0)
      .map(() => Math.random() * 2 - 1); // Values between -1 and 1
  }
  
  /**
   * Add an item to the knowledge graph
   * @param {Object} item - Knowledge item to add
   * @returns {Promise<Object>} Added node
   * @private
   */
  async addToKnowledgeGraph(item) {
    // Skip if knowledge graph is not enabled
    if (!this.enableKnowledgeGraph) {
      return null;
    }
    
    // Determine node type (default to concept for unknown types)
    const nodeType = this._knowledgeGraph.nodeTypes[item.type] ? 
      item.type : "concept";
    
    // Create node
    const nodeId = `node_${item.id}`;
    
    const node = {
      id: nodeId,
      type: nodeType,
      label: item.title,
      properties: {
        name: item.title,
        description: item.content,
        createdAt: item.metadata.createdAt,
        knowledgeItemId: item.id
      }
    };
    
    // Add to nodes
    this._knowledgeGraph.nodes[nodeId] = node;
    this._knowledgeGraph.metadata.nodeCount++;
    
    // Update graph metadata
    this._knowledgeGraph.metadata.updatedAt = Date.now();
    
    // If categories exist, connect to category nodes
    if (item.category) {
      await this.connectToCategoryInGraph(nodeId, item.category);
    }
    
    // If tags exist, create connections
    if (item.tags && item.tags.length > 0) {
      await this.connectToTagsInGraph(nodeId, item.tags);
    }
    
    return node;
  }
  
  /**
   * Connect a node to a category in the knowledge graph
   * @param {string} nodeId - Node ID
   * @param {string} category - Category name
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async connectToCategoryInGraph(nodeId, category) {
    // Check if category node exists
    let categoryNodeId = Object.keys(this._knowledgeGraph.nodes).find(
      id => this._knowledgeGraph.nodes[id].type === "category" && 
           this._knowledgeGraph.nodes[id].properties.name.toLowerCase() === category.toLowerCase()
    );
    
    // Create category node if it doesn't exist
    if (!categoryNodeId) {
      categoryNodeId = `cat_${this.generateId()}`;
      
      this._knowledgeGraph.nodes[categoryNodeId] = {
        id: categoryNodeId,
        type: "category",
        label: category,
        properties: {
          name: category,
          description: `Category: ${category}`,
          createdAt: Date.now()
        }
      };
      
      this._knowledgeGraph.metadata.nodeCount++;
    }
    
    // Create edge
    const edgeId = `edge_${this.generateId()}`;
    
    this._knowledgeGraph.edges[edgeId] = {
      id: edgeId,
      source: nodeId,
      target: categoryNodeId,
      type: "isA",
      properties: {
        createdAt: Date.now()
      }
    };
    
    this._knowledgeGraph.metadata.edgeCount++;
    
    return true;
  }
  
  /**
   * Connect a node to tags in the knowledge graph
   * @param {string} nodeId - Node ID
   * @param {Array<string>} tags - Tags
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async connectToTagsInGraph(nodeId, tags) {
    for (const tag of tags) {
      // Check if tag node exists
      let tagNodeId = Object.keys(this._knowledgeGraph.nodes).find(
        id => this._knowledgeGraph.nodes[id].type === "concept" && 
             this._knowledgeGraph.nodes[id].properties.name.toLowerCase() === tag.toLowerCase() &&
             this._knowledgeGraph.nodes[id].properties.isTag
      );
      
      // Create tag node if it doesn't exist
      if (!tagNodeId) {
        tagNodeId = `tag_${this.generateId()}`;
        
        this._knowledgeGraph.nodes[tagNodeId] = {
          id: tagNodeId,
          type: "concept",
          label: tag,
          properties: {
            name: tag,
            description: `Tag: ${tag}`,
            isTag: true,
            createdAt: Date.now()
          }
        };
        
        this._knowledgeGraph.metadata.nodeCount++;
      }
      
      // Create edge
      const edgeId = `edge_${this.generateId()}`;
      
      this._knowledgeGraph.edges[edgeId] = {
        id: edgeId,
        source: nodeId,
        target: tagNodeId,
        type: "relatedTo",
        properties: {
          createdAt: Date.now()
        }
      };
      
      this._knowledgeGraph.metadata.edgeCount++;
    }
    
    return true;
  }
  
  /**
   * Add a knowledge item to the taxonomy
   * @param {Object} item - Knowledge item
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async addToTaxonomy(item) {
    if (!this.enableHierarchicalTaxonomy) {
      return false;
    }
    
    // Find the appropriate category in the taxonomy
    const categoryPath = item.category.split('/');
    let currentNode = this._taxonomyTree;
    let foundPath = true;
    
    // Traverse the path
    for (const segment of categoryPath) {
      const childNode = currentNode.children.find(
        child => child.name.toLowerCase() === segment.toLowerCase()
      );
      
      if (childNode) {
        currentNode = childNode;
      } else {
        foundPath = false;
        break;
      }
    }
    
    // If we didn't find the full path, assign to general category
    if (!foundPath) {
      // Find or create general category
      let generalNode = this._taxonomyTree.children.find(
        child => child.name === "General"
      );
      
      if (!generalNode) {
        generalNode = {
          id: "general",
          name: "General",
          description: "General uncategorized knowledge",
          children: [],
          metadata: {
            createdAt: Date.now(),
            updatedAt: Date.now()
          }
        };
        
        this._taxonomyTree.children.push(generalNode);
      }
      
      currentNode = generalNode;
    }
    
    // Add reference to the knowledge item
    if (!currentNode.items) {
      currentNode.items = [];
    }
    
    currentNode.items.push({
      id: item.id,
      title: item.title
    });
    
    // Update node metadata
    currentNode.metadata.updatedAt = Date.now();
    if (!currentNode.metadata.itemCount) {
      currentNode.metadata.itemCount = 0;
    }
    currentNode.metadata.itemCount++;
    
    return true;
  }
  
  /**
   * Update a knowledge item
   * @param {string} id - Item ID
   * @param {Object} updates - Updates to apply
   * @returns {Promise<Object>} Updated knowledge item
   */
  async updateKnowledgeItem(id, updates) {
    if (!this.initialized) {
      throw new Error("Knowledge Management system not initialized");
    }
    
    // Check if item exists
    if (!this._knowledgeBase[id]) {
      throw new Error(`Knowledge item not found: ${id}`);
    }
    
    try {
      const item = this._knowledgeBase[id];
      const timestamp = Date.now();
      
      // Create updated version
      const updatedItem = {
        ...item,
        ...updates,
        metadata: {
          ...item.metadata,
          ...updates.metadata,
          updatedAt: timestamp
        }
      };
      
      // Recalculate trust score if necessary
      if (updates.content || updates.source) {
        updatedItem.trustScore = await this.calculateTrustScore(updatedItem);
        
        // Skip update if trust score is too low and enforcement is enabled
        if (this.enforceTrustScores && updatedItem.trustScore < this.minimumTrustScore) {
          throw new Error(`Trust score too low: ${updatedItem.trustScore.toFixed(2)}`);
        }
      }
      
      // Reverify fact if content changed
      if (this.enableFactVerification && updatedItem.type === "fact" && updates.content) {
        updatedItem.verified = await this.verifyFact(updatedItem);
      }
      
      // Update vector embedding if content changed and semantic search is enabled
      if (this.enableSemanticSearch && updates.content) {
        const embedding = await this.generateEmbedding(updatedItem.content);
        
        // Update embedding based on storage type
        if (this.storageProvider === "vector-db") {
          this._vectorStore.vectors[id] = embedding;
          this._vectorStore.metadata[id] = {
            title: updatedItem.title,
            type: updatedItem.type,
            category: updatedItem.category,
            tags: updatedItem.tags
          };
        } else {
          // Update in search index
          const indexPosition = this._searchIndex.metadata.findIndex(meta => meta.id === id);
          
          if (indexPosition >= 0) {
            this._searchIndex.texts[indexPosition] = updatedItem.content;
            this._searchIndex.vectors[indexPosition] = embedding;
            this._searchIndex.metadata[indexPosition] = {
              id,
              title: updatedItem.title,
              type: updatedItem.type,
              category: updatedItem.category,
              tags: updatedItem.tags
            };
          }
        }
      }
      
      // Update knowledge base
      this._knowledgeBase[id] = updatedItem;
      
      // Update in knowledge graph if enabled
      if (this.enableKnowledgeGraph) {
        await this.updateInKnowledgeGraph(updatedItem);
      }
      
      // Update in taxonomy if enabled and category changed
      if (this.enableHierarchicalTaxonomy && updates.category) {
        await this.updateInTaxonomy(id, item.category, updatedItem.category);
      }
      
      // Notify listeners
      this._notifyListeners("onKnowledgeUpdated", {
        id,
        previousVersion: item,
        updatedVersion: updatedItem,
        timestamp
      });
      
      return updatedItem;
    } catch (error) {
      console.error(`Error updating knowledge item ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Update an item in the knowledge graph
   * @param {Object} item - Updated knowledge item
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async updateInKnowledgeGraph(item) {
    if (!this.enableKnowledgeGraph) {
      return false;
    }
    
    // Find corresponding node
    const nodeId = Object.keys(this._knowledgeGraph.nodes).find(
      id => this._knowledgeGraph.nodes[id].properties.knowledgeItemId === item.id
    );
    
    if (!nodeId) {
      // Node doesn't exist, add it
      await this.addToKnowledgeGraph(item);
      return true;
    }
    
    // Update node
    const node = this._knowledgeGraph.nodes[nodeId];
    
    node.label = item.title;
    node.properties.name = item.title;
    node.properties.description = item.content;
    
    // Update graph metadata
    this._knowledgeGraph.metadata.updatedAt = Date.now();
    
    return true;
  }
  
  /**
   * Update an item in the taxonomy
   * @param {string} itemId - Item ID
   * @param {string} oldCategory - Old category
   * @param {string} newCategory - New category
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async updateInTaxonomy(itemId, oldCategory, newCategory) {
    if (!this.enableHierarchicalTaxonomy) {
      return false;
    }
    
    // Remove from old category
    const oldCategoryPath = oldCategory.split('/');
    let oldCategoryNode = this._taxonomyTree;
    
    for (const segment of oldCategoryPath) {
      const childNode = oldCategoryNode.children.find(
        child => child.name.toLowerCase() === segment.toLowerCase()
      );
      
      if (childNode) {
        oldCategoryNode = childNode;
      } else {
        break;
      }
    }
    
    if (oldCategoryNode.items) {
      // Remove item reference
      const itemIndex = oldCategoryNode.items.findIndex(item => item.id === itemId);
      
      if (itemIndex >= 0) {
        oldCategoryNode.items.splice(itemIndex, 1);
        oldCategoryNode.metadata.updatedAt = Date.now();
        oldCategoryNode.metadata.itemCount--;
      }
    }
    
    // Get the item
    const item = this._knowledgeBase[itemId];
    
    // Add to new category
    return this.addToTaxonomy(item);
  }
  
  /**
   * Remove a knowledge item
   * @param {string} id - Item ID
   * @returns {Promise<boolean>} Success status
   */
  async removeKnowledgeItem(id) {
    if (!this.initialized) {
      throw new Error("Knowledge Management system not initialized");
    }
    
    // Check if item exists
    if (!this._knowledgeBase[id]) {
      throw new Error(`Knowledge item not found: ${id}`);
    }
    
    try {
      // Store item for notification
      const item = this._knowledgeBase[id];
      
      // Remove from knowledge base
      delete this._knowledgeBase[id];
      
      // Remove from vector store if applicable
      if (this.storageProvider === "vector-db") {
        if (this._vectorStore.vectors[id]) {
          delete this._vectorStore.vectors[id];
          delete this._vectorStore.metadata[id];
        }
      } else if (this.enableSemanticSearch) {
        // Remove from search index
        const indexPosition = this._searchIndex.metadata.findIndex(meta => meta.id === id);
        
        if (indexPosition >= 0) {
          this._searchIndex.texts.splice(indexPosition, 1);
          this._searchIndex.vectors.splice(indexPosition, 1);
          this._searchIndex.metadata.splice(indexPosition, 1);
        }
      }
      
      // Remove from knowledge graph if enabled
      if (this.enableKnowledgeGraph) {
        await this.removeFromKnowledgeGraph(id);
      }
      
      // Remove from taxonomy if enabled
      if (this.enableHierarchicalTaxonomy) {
        await this.removeFromTaxonomy(id, item.category);
      }
      
      // Notify listeners
      this._notifyListeners("onKnowledgeRemoved", {
        id,
        item,
        timestamp: Date.now()
      });
      
      return true;
    } catch (error) {
      console.error(`Error removing knowledge item ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Remove an item from the knowledge graph
   * @param {string} itemId - Item ID
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async removeFromKnowledgeGraph(itemId) {
    if (!this.enableKnowledgeGraph) {
      return false;
    }
    
    // Find corresponding node
    const nodeId = Object.keys(this._knowledgeGraph.nodes).find(
      id => this._knowledgeGraph.nodes[id].properties.knowledgeItemId === itemId
    );
    
    if (!nodeId) {
      return false; // Node not found
    }
    
    // Find all edges connected to this node
    const connectedEdgeIds = Object.keys(this._knowledgeGraph.edges).filter(
      edgeId => this._knowledgeGraph.edges[edgeId].source === nodeId || 
               this._knowledgeGraph.edges[edgeId].target === nodeId
    );
    
    // Remove all connected edges
    for (const edgeId of connectedEdgeIds) {
      delete this._knowledgeGraph.edges[edgeId];
      this._knowledgeGraph.metadata.edgeCount--;
    }
    
    // Remove node
    delete this._knowledgeGraph.nodes[nodeId];
    this._knowledgeGraph.metadata.nodeCount--;
    
    // Update graph metadata
    this._knowledgeGraph.metadata.updatedAt = Date.now();
    
    return true;
  }
  
  /**
   * Remove an item from the taxonomy
   * @param {string} itemId - Item ID
   * @param {string} category - Item category
   * @returns {Promise<boolean>} Success status
   * @private
   */
  async removeFromTaxonomy(itemId, category) {
    if (!this.enableHierarchicalTaxonomy) {
      return false;
    }
    
    // Find category node
    const categoryPath = category.split('/');
    let categoryNode = this._taxonomyTree;
    
    for (const segment of categoryPath) {
      const childNode = categoryNode.children.find(
        child => child.name.toLowerCase() === segment.toLowerCase()
      );
      
      if (childNode) {
        categoryNode = childNode;
      } else {
        return false; // Category not found
      }
    }
    
    if (!categoryNode.items) {
      return false; // No items in this category
    }
    
    // Remove item reference
    const itemIndex = categoryNode.items.findIndex(item => item.id === itemId);
    
    if (itemIndex < 0) {
      return false; // Item not found in this category
    }
    
    // Remove item
    categoryNode.items.splice(itemIndex, 1);
    categoryNode.metadata.updatedAt = Date.now();
    categoryNode.metadata.itemCount--;
    
    return true;
  }
  
  /**
   * Search for knowledge items
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Object>} Search results
   */
  async searchKnowledge(query, options = {}) {
    if (!this.initialized) {
      throw new Error("Knowledge Management system not initialized");
    }
    
    try {
      const searchOptions = {
        limit: options.limit || this.maxResults,
        offset: options.offset || 0,
        filters: options.filters || {},
        categories: options.categories || [],
        tags: options.tags || [],
        minScore: options.minScore || this.minRelevanceScore,
        useSemanticSearch: options.useSemanticSearch ?? this.enableSemanticSearch,
        boostRecent: options.boostRecent ?? true
      };
      
      // Execute search
      let results;
      let totalResults = 0;
      
      // Use semantic search if enabled and requested
      if (searchOptions.useSemanticSearch && this.enableSemanticSearch) {
        results = await this.semanticSearch(query, searchOptions);
        totalResults = results.length;
        
        // Apply pagination
        results = results.slice(searchOptions.offset, searchOptions.offset + searchOptions.limit);
      } else {
        // Fall back to keyword search
        results = await this.keywordSearch(query, searchOptions);
        totalResults = results.length;
        
        // Apply pagination
        results = results.slice(searchOptions.offset, searchOptions.offset + searchOptions.limit);
      }
      
      // Notify listeners
      this._notifyListeners("onKnowledgeSearched", {
        query,
        options: searchOptions,
        resultCount: results.length,
        totalResults,
        timestamp: Date.now()
      });
      
      return {
        query,
        results,
        totalResults,
        offset: searchOptions.offset,
        limit: searchOptions.limit
      };
    } catch (error) {
      console.error("Knowledge search error:", error);
      throw error;
    }
  }
  
  /**
   * Perform semantic search
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Array<Object>>} Search results
   * @private
   */
  async semanticSearch(query, options) {
    // Generate query embedding
    const queryEmbedding = await this.generateEmbedding(query);
    
    // Execute search based on storage provider
    if (this.storageProvider === "vector-db") {
      return this.semanticSearchVectorDb(queryEmbedding, options);
    } else {
      return this.semanticSearchInMemory(queryEmbedding, options);
    }
  }
  
  /**
   * Perform semantic search using in-memory index
   * @param {Array<number>} queryEmbedding - Query embedding
   * @param {Object} options - Search options
   * @returns {Promise<Array<Object>>} Search results
   * @private
   */
  async semanticSearchInMemory(queryEmbedding, options) {
    const results = [];
    
    // Calculate similarity scores
    for (let i = 0; i < this._searchIndex.vectors.length; i++) {
      const embedding = this._searchIndex.vectors[i];
      const metadata = this._searchIndex.metadata[i];
      const id = metadata.id;
      
      // Skip if item doesn't exist
      if (!this._knowledgeBase[id]) {
        continue;
      }
      
      // Get item
      const item = this._knowledgeBase[id];
      
      // Apply filters
      if (!this.matchesFilters(item, options)) {
        continue;
      }
      
      // Calculate cosine similarity
      const similarity = this.calculateCosineSimilarity(queryEmbedding, embedding);
      
      // Skip if below threshold
      if (similarity < options.minScore) {
        continue;
      }
      
      // Apply recency boost if requested
      let finalScore = similarity;
      
      if (options.boostRecent && item.metadata.updatedAt) {
        const recencyBoost = this.calculateRecencyBoost(item.metadata.updatedAt);
        finalScore = similarity * (1 + recencyBoost);
      }
      
      // Add to results
      results.push({
        id,
        title: item.title,
        content: item.content,
        type: item.type,
        category: item.category,
        tags: item.tags,
        score: finalScore,
        updatedAt: item.metadata.updatedAt
      });
    }
    
    // Sort by score (descending)
    results.sort((a, b) => b.score - a.score);
    
    return results;
  }
  
  /**
   * Perform semantic search using vector database
   * @param {Array<number>} queryEmbedding - Query embedding
   * @param {Object} options - Search options
   * @returns {Promise<Array<Object>>} Search results
   * @private
   */
  async semanticSearchVectorDb(queryEmbedding, options) {
    const results = [];
    
    // In a real implementation, this would query a vector database
    // For this example, we'll simulate with in-memory vectors
    
    // Calculate similarity scores for all vectors
    for (const id in this._vectorStore.vectors) {
      // Skip if item doesn't exist
      if (!this._knowledgeBase[id]) {
        continue;
      }
      
      // Get item
      const item = this._knowledgeBase[id];
      
      // Apply filters
      if (!this.matchesFilters(item, options)) {
        continue;
      }
      
      // Get vector
      const embedding = this._vectorStore.vectors[id];
      
      // Calculate cosine similarity
      const similarity = this.calculateCosineSimilarity(queryEmbedding, embedding);
      
      // Skip if below threshold
      if (similarity < options.minScore) {
        continue;
      }
      
      // Apply recency boost if requested
      let finalScore = similarity;
      
      if (options.boostRecent && item.metadata.updatedAt) {
        const recencyBoost = this.calculateRecencyBoost(item.metadata.updatedAt);
        finalScore = similarity * (1 + recencyBoost);
      }
      
      // Add to results
      results.push({
        id,
        title: item.title,
        content: item.content,
        type: item.type,
        category: item.category,
        tags: item.tags,
        score: finalScore,
        updatedAt: item.metadata.updatedAt
      });
    }
    
    // Sort by score (descending)
    results.sort((a, b) => b.score - a.score);
    
    return results;
  }
  
  /**
   * Perform keyword search
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Array<Object>>} Search results
   * @private
   */
  async keywordSearch(query, options) {
    const results = [];
    
    // Normalize query
    const normalizedQuery = query.toLowerCase();
    const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 1);
    
    // Skip if no valid terms
    if (queryTerms.length === 0) {
      return [];
    }
    
    // Search through all items
    for (const id in this._knowledgeBase) {
      const item = this._knowledgeBase[id];
      
      // Apply filters
      if (!this.matchesFilters(item, options)) {
        continue;
      }
      
      // Calculate keyword match score
      const score = this.calculateKeywordScore(item, queryTerms);
      
      // Skip if below threshold
      if (score < options.minScore) {
        continue;
      }
      
      // Apply recency boost if requested
      let finalScore = score;
      
      if (options.boostRecent && item.metadata.updatedAt) {
        const recencyBoost = this.calculateRecencyBoost(item.metadata.updatedAt);
        finalScore = score * (1 + recencyBoost);
      }
      
      // Add to results
      results.push({
        id,
        title: item.title,
        content: item.content,
        type: item.type,
        category: item.category,
        tags: item.tags,
        score: finalScore,
        updatedAt: item.metadata.updatedAt
      });
    }
    
    // Sort by score (descending)
    results.sort((a, b) => b.score - a.score);
    
    return results;
  }
  
  /**
   * Calculate keyword match score
   * @param {Object} item - Knowledge item
   * @param {Array<string>} queryTerms - Query terms
   * @returns {number} Match score
   * @private
   */
  calculateKeywordScore(item, queryTerms) {
    // Fields to check for matches
    const fields = [
      { name: "title", weight: 3.0 },
      { name: "content", weight: 1.0 },
      { name: "tags", weight: 2.0, isArray: true }
    ];
    
    let totalScore = 0;
    
    // Check each field
    for (const field of fields) {
      let fieldValue = item[field.name];
      
      // Skip if field not present
      if (fieldValue === undefined) {
        continue;
      }
      
      // Handle arrays
      if (field.isArray && Array.isArray(fieldValue)) {
        fieldValue = fieldValue.join(" ");
      }
      
      // Skip non-string fields
      if (typeof fieldValue !== "string") {
        continue;
      }
      
      // Normalize field value
      const normalizedValue = fieldValue.toLowerCase();
      
      // Calculate field score
      let fieldScore = 0;
      
      for (const term of queryTerms) {
        if (normalizedValue.includes(term)) {
          // Exact match
          fieldScore += 1.0;
        } else {
          // Check for partial matches
          const words = normalizedValue.split(/\s+/);
          
          for (const word of words) {
            if (word.startsWith(term) || word.endsWith(term)) {
              fieldScore += 0.5; // Partial match
              break;
            }
          }
        }
      }
      
      // Apply field weight
      totalScore += fieldScore * field.weight;
    }
    
    // Normalize score based on number of query terms
    return totalScore / (queryTerms.length * 2); // 2 is a normalizing factor
  }
  
  /**
   * Calculate recency boost
   * @param {number} timestamp - Item timestamp
   * @returns {number} Recency boost factor
   * @private
   */
  calculateRecencyBoost(timestamp) {
    const now = Date.now();
    const ageInDays = (now - timestamp) / (1000 * 60 * 60 * 24);
    
    // Boost decreases with age (max 20% boost for very recent items)
    return Math.max(0, 0.2 - (ageInDays / 30) * 0.2);
  }
  
  /**
   * Calculate cosine similarity between two vectors
   * @param {Array<number>} vec1 - First vector
   * @param {Array<number>} vec2 - Second vector
   * @returns {number} Cosine similarity
   * @private
   */
  calculateCosineSimilarity(vec1, vec2) {
    if (vec1.length !== vec2.length) {
      throw new Error("Vector dimensions don't match");
    }
    
    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;
    
    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      mag1 += vec1[i] * vec1[i];
      mag2 += vec2[i] * vec2[i];
    }
    
    mag1 = Math.sqrt(mag1);
    mag2 = Math.sqrt(mag2);
    
    if (mag1 === 0 || mag2 === 0) {
      return 0;
    }
    
    return dotProduct / (mag1 * mag2);
  }
  
  /**
   * Check if an item matches search filters
   * @param {Object} item - Knowledge item
   * @param {Object} options - Search options
   * @returns {boolean} Whether the item matches
   * @private
   */
  matchesFilters(item, options) {
    // Check type filter
    if (options.filters.type && item.type !== options.filters.type) {
      return false;
    }
    
    // Check categories
    if (options.categories && options.categories.length > 0) {
      // If item has no category or doesn't match any of the requested categories
      if (!item.category || !options.categories.includes(item.category)) {
        return false;
      }
    }
    
    // Check tags
    if (options.tags && options.tags.length > 0) {
      // If item has no tags or none match the requested tags
      if (!item.tags || !item.tags.some(tag => options.tags.includes(tag))) {
        return false;
      }
    }
    
    // Check trust score
    if (options.filters.minTrustScore !== undefined) {
      if (item.trustScore < options.filters.minTrustScore) {
        return false;
      }
    }
    
    // Check verified status
    if (options.filters.verified !== undefined) {
      if (!!item.verified !== options.filters.verified) {
        return false;
      }
    }
    
    // Check date range
    if (options.filters.fromDate !== undefined && item.metadata.createdAt < options.filters.fromDate) {
      return false;
    }
    
    if (options.filters.toDate !== undefined && item.metadata.createdAt > options.filters.toDate) {
      return false;
    }
    
    return true;
  }
  
  /**
   * Perform a graph query
   * @param {Object} query - Graph query parameters
   * @returns {Promise<Object>} Query results
   */
  async queryKnowledgeGraph(query) {
    if (!this.initialized) {
      throw new Error("Knowledge Management system not initialized");
    }
    
    if (!this.enableKnowledgeGraph) {
      throw new Error("Knowledge graph feature is not enabled");
    }
    
    try {
      let results = {
        nodes: [],
        edges: [],
        rootNode: null
      };
      
      // Handle different query types
      switch (query.type) {
        case "node":
          // Get a specific node and its connections
          results = await this.queryNodeAndConnections(query.nodeId, query.depth || 1);
          break;
          
        case "path":
          // Find path between nodes
          results = await this.findPath(query.fromNodeId, query.toNodeId);
          break;
          
        case "search":
          // Search for nodes matching criteria
          results = await this.searchNodes(query.searchTerm, query.nodeTypes);
          break;
          
        case "related":
          // Find related knowledge
          results = await this.findRelatedKnowledge(query.itemId, query.maxResults || 10);
          break;
          
        default:
          throw new Error(`Unsupported graph query type: ${query.type}`);
      }
      
      return results;
    } catch (error) {
      console.error("Knowledge graph query error:", error);
      throw error;
    }
  }
  
  /**
   * Query a node and its connections
   * @param {string} nodeId - Node ID
   * @param {number} depth - Traversal depth
   * @returns {Promise<Object>} Query results
   * @private
   */
  async queryNodeAndConnections(nodeId, depth) {
    // Check if node exists
    if (!this._knowledgeGraph.nodes[nodeId]) {
      throw new Error(`Node not found: ${nodeId}`);
    }
    
    // Start with the root node
    const result = {
      nodes: [this._knowledgeGraph.nodes[nodeId]],
      edges: [],
      rootNode: nodeId
    };
    
    // Use BFS to find connections up to the specified depth
    const visitedNodes = new Set([nodeId]);
    const visitedEdges = new Set();
    const queue = [{ node: nodeId, level: 0 }];
    
    while (queue.length > 0) {
      const { node, level } = queue.shift();
      
      // Stop if we've reached the maximum depth
      if (level >= depth) {
        continue;
      }
      
      // Find all edges connected to this node
      const connectedEdges = Object.entries(this._knowledgeGraph.edges)
        .filter(([id, edge]) => edge.source === node || edge.target === node)
        .map(([id, edge]) => ({ id, ...edge }));
      
      for (const edge of connectedEdges) {
        // Skip if we've already visited this edge
        if (visitedEdges.has(edge.id)) {
          continue;
        }
        
        // Add edge to results
        result.edges.push(edge);
        visitedEdges.add(edge.id);
        
        // Get the connected node
        const connectedNodeId = edge.source === node ? edge.target : edge.source;
        
        // Skip if we've already visited this node
        if (visitedNodes.has(connectedNodeId)) {
          continue;
        }
        
        // Add node to results
        result.nodes.push(this._knowledgeGraph.nodes[connectedNodeId]);
        visitedNodes.add(connectedNodeId);
        
        // Add connected node to queue
        queue.push({ node: connectedNodeId, level: level + 1 });
      }
    }
    
    return result;
  }
  
  /**
   * Find path between nodes
   * @param {string} fromNodeId - Source node ID
   * @param {string} toNodeId - Target node ID
   * @returns {Promise<Object>} Path result
   * @private
   */
  async findPath(fromNodeId, toNodeId) {
    // Check if nodes exist
    if (!this._knowledgeGraph.nodes[fromNodeId]) {
      throw new Error(`Source node not found: ${fromNodeId}`);
    }
    
    if (!this._knowledgeGraph.nodes[toNodeId]) {
      throw new Error(`Target node not found: ${toNodeId}`);
    }
    
    // Use BFS to find shortest path
    const visited = new Set([fromNodeId]);
    const queue = [{ node: fromNodeId, path: [], edges: [] }];
    
    while (queue.length > 0) {
      const { node, path, edges } = queue.shift();
      
      // Check if we've reached the target
      if (node === toNodeId) {
        // Return the complete path
        const pathNodes = [...path, node].map(id => this._knowledgeGraph.nodes[id]);
        const pathEdges = edges.map(id => this._knowledgeGraph.edges[id]);
        
        return {
          nodes: pathNodes,
          edges: pathEdges,
          pathFound: true
        };
      }
      
      // Find all edges connected to this node
      const connectedEdges = Object.entries(this._knowledgeGraph.edges)
        .filter(([id, edge]) => edge.source === node || edge.target === node)
        .map(([id, edge]) => ({ id, ...edge }));
      
      for (const edge of connectedEdges) {
        // Get the connected node
        const connectedNodeId = edge.source === node ? edge.target : edge.source;
        
        // Skip if we've already visited this node
        if (visited.has(connectedNodeId)) {
          continue;
        }
        
        // Add node to visited set
        visited.add(connectedNodeId);
        
        // Add to queue with updated path
        queue.push({ 
          node: connectedNodeId, 
          path: [...path, node],
          edges: [...edges, edge.id]
        });
      }
    }
    
    // No path found
    return {
      nodes: [],
      edges: [],
      pathFound: false
    };
  }
  
  /**
   * Search for nodes in the knowledge graph
   * @param {string} searchTerm - Search term
   * @param {Array<string>} nodeTypes - Node types to include
   * @returns {Promise<Object>} Search results
   * @private
   */
  async searchNodes(searchTerm, nodeTypes = []) {
    const results = {
      nodes: [],
      edges: [],
      searchTerm
    };
    
    // Normalize search term
    const normalizedTerm = searchTerm.toLowerCase();
    
    // Filter nodes based on search term and types
    const matchingNodes = Object.values(this._knowledgeGraph.nodes)
      .filter(node => {
        // Filter by type if specified
        if (nodeTypes && nodeTypes.length > 0 && !nodeTypes.includes(node.type)) {
          return false;
        }
        
        // Check if node label or properties match the search term
        if (node.label.toLowerCase().includes(normalizedTerm)) {
          return true;
        }
        
        if (node.properties.name && node.properties.name.toLowerCase().includes(normalizedTerm)) {
          return true;
        }
        
        if (node.properties.description && node.properties.description.toLowerCase().includes(normalizedTerm)) {
          return true;
        }
        
        return false;
      });
    
    // Add matching nodes to results
    results.nodes = matchingNodes;
    
    // Find edges between these nodes
    if (matchingNodes.length > 1) {
      const nodeIds = matchingNodes.map(node => node.id);
      
      // Find edges that connect any two nodes in the result set
      const connectingEdges = Object.values(this._knowledgeGraph.edges)
        .filter(edge => 
          nodeIds.includes(edge.source) && 
          nodeIds.includes(edge.target)
        );
      
      results.edges = connectingEdges;
    }
    
    return results;
  }
  
  /**
   * Find knowledge related to an item
   * @param {string} itemId - Knowledge item ID
   * @param {number} maxResults - Maximum number of results
   * @returns {Promise<Object>} Related knowledge
   * @private
   */
  async findRelatedKnowledge(itemId, maxResults = 10) {
    // Check if item exists
    if (!this._knowledgeBase[itemId]) {
      throw new Error(`Knowledge item not found: ${itemId}`);
    }
    
    const item = this._knowledgeBase[itemId];
    
    // Find the item's node in the graph
    const nodeId = Object.keys(this._knowledgeGraph.nodes).find(
      id => this._knowledgeGraph.nodes[id].properties.knowledgeItemId === itemId
    );
    
    if (!nodeId) {
      // Item is not represented in the graph
      // Fall back to category and tag-based matching
      return this.findSimilarByMetadata(item, maxResults);
    }
    
    // Query node and connections
    const graphResults = await this.queryNodeAndConnections(nodeId, 2);
    
    // Get knowledge items connected to these nodes
    const relatedItems = [];
    
    for (const node of graphResults.nodes) {
      if (node.id === nodeId) {
        continue; // Skip the original item's node
      }
      
      // Check if this node represents a knowledge item
      if (node.properties.knowledgeItemId && 
          this._knowledgeBase[node.properties.knowledgeItemId]) {
        
        const relatedItem = this._knowledgeBase[node.properties.knowledgeItemId];
        
        relatedItems.push({
          id: relatedItem.id,
          title: relatedItem.title,
          type: relatedItem.type,
          category: relatedItem.category,
          relationPath: [] // Would calculate in a full implementation
        });
      }
    }
    
    return {
      itemId,
      relatedItems: relatedItems.slice(0, maxResults),
      graphResults
    };
  }
  
  /**
   * Find similar items by metadata
   * @param {Object} item - Reference item
   * @param {number} maxResults - Maximum number of results
   * @returns {Promise<Object>} Similar items
   * @private
   */
  async findSimilarByMetadata(item, maxResults) {
    const results = [];
    
    // Calculate similarity for all items
    for (const [id, otherItem] of Object.entries(this._knowledgeBase)) {
      // Skip the reference item
      if (id === item.id) {
        continue;
      }
      
      // Calculate similarity score
      let score = 0;
      
      // Category match
      if (item.category && otherItem.category && item.category === otherItem.category) {
        score += 0.5;
      }
      
      // Tag matches
      if (item.tags && otherItem.tags) {
        const commonTags = item.tags.filter(tag => otherItem.tags.includes(tag));
        score += commonTags.length * 0.2;
      }
      
      // Only include items with some similarity
      if (score > 0.2) {
        results.push({
          id,
          title: otherItem.title,
          type: otherItem.type,
          category: otherItem.category,
          score
        });
      }
    }
    
    // Sort by score
    results.sort((a, b) => b.score - a.score);
    
    return {
      itemId: item.id,
      relatedItems: results.slice(0, maxResults)
    };
  }
  
  /**
   * Get the taxonomy tree
   * @param {string} rootId - Root node ID (optional)
   * @returns {Promise<Object>} Taxonomy tree or subtree
   */
  async getTaxonomy(rootId = null) {
    if (!this.initialized) {
      throw new Error("Knowledge Management system not initialized");
    }
    
    if (!this.enableHierarchicalTaxonomy) {
      throw new Error("Hierarchical taxonomy feature is not enabled");
    }
    
    try {
      if (!rootId) {
        // Return the full taxonomy
        return this._taxonomyTree;
      }
      
      // Find the specified node
      const node = this.findTaxonomyNode(this._taxonomyTree, rootId);
      
      if (!node) {
        throw new Error(`Taxonomy node not found: ${rootId}`);
      }
      
      return node;
    } catch (error) {
      console.error("Error getting taxonomy:", error);
      throw error;
    }
  }
  
  /**
   * Find a node in the taxonomy tree
   * @param {Object} node - Current node
   * @param {string} id - Target node ID
   * @returns {Object|null} Found node or null
   * @private
   */
  findTaxonomyNode(node, id) {
    if (node.id === id) {
      return node;
    }
    
    if (!node.children) {
      return null;
    }
    
    for (const child of node.children) {
      const found = this.findTaxonomyNode(child, id);
      if (found) {
        return found;
      }
    }
    
    return null;
  }
  
  /**
   * Add a node to the taxonomy
   * @param {string} parentId - Parent node ID
   * @param {Object} node - Node to add
   * @returns {Promise<Object>} Added node
   */
  async addTaxonomyNode(parentId, node) {
    if (!this.initialized) {
      throw new Error("Knowledge Management system not initialized");
    }
    
    if (!this.enableHierarchicalTaxonomy) {
      throw new Error("Hierarchical taxonomy feature is not enabled");
    }
    
    try {
      // Find parent node
      const parentNode = this.findTaxonomyNode(this._taxonomyTree, parentId);
      
      if (!parentNode) {
        throw new Error(`Parent node not found: ${parentId}`);
      }
      
      // Check if a node with this ID already exists
      if (this.findTaxonomyNode(this._taxonomyTree, node.id)) {
        throw new Error(`Node with ID ${node.id} already exists`);
      }
      
      // Ensure parent has children array
      if (!parentNode.children) {
        parentNode.children = [];
      }
      
      // Add metadata if not present
      if (!node.metadata) {
        node.metadata = {};
      }
      
      node.metadata.createdAt = Date.now();
      node.metadata.updatedAt = Date.now();
      
      // Add children array if not present
      if (!node.children) {
        node.children = [];
      }
      
      // Add to parent's children
      parentNode.children.push(node);
      
      // Update parent metadata
      parentNode.metadata.updatedAt = Date.now();
      
      return node;
    } catch (error) {
      console.error("Error adding taxonomy node:", error);
      throw error;
    }
  }
  
  /**
   * Update a taxonomy node
   * @param {string} nodeId - Node ID
   * @param {Object} updates - Updates to apply
   * @returns {Promise<Object>} Updated node
   */
  async updateTaxonomyNode(nodeId, updates) {
    if (!this.initialized) {
      throw new Error("Knowledge Management system not initialized");
    }
    
    if (!this.enableHierarchicalTaxonomy) {
      throw new Error("Hierarchical taxonomy feature is not enabled");
    }
    
    try {
      // Find the node
      const node = this.findTaxonomyNode(this._taxonomyTree, nodeId);
      
      if (!node) {
        throw new Error(`Node not found: ${nodeId}`);
      }
      
      // Apply updates
      if (updates.name) node.name = updates.name;
      if (updates.description) node.description = updates.description;
      
      // Update metadata
      node.metadata.updatedAt = Date.now();
      
      return node;
    } catch (error) {
      console.error("Error updating taxonomy node:", error);
      throw error;
    }
  }
  
  /**
   * Remove a taxonomy node
   * @param {string} nodeId - Node ID
   * @returns {Promise<boolean>} Success status
   */
  async removeTaxonomyNode(nodeId) {
    if (!this.initialized) {
      throw new Error("Knowledge Management system not initialized");
    }
    
    if (!this.enableHierarchicalTaxonomy) {
      throw new Error("Hierarchical taxonomy feature is not enabled");
    }
    
    // Don't allow removing the root node
    if (nodeId === "root") {
      throw new Error("Cannot remove the root taxonomy node");
    }
    
    try {
      // Find the node's parent
      const result = this.findTaxonomyNodeParent(this._taxonomyTree, nodeId);
      
      if (!result) {
        throw new Error(`Node not found: ${nodeId}`);
      }
      
      const { parent, index } = result;
      
      // Get the node before removing it
      const node = parent.children[index];
      
      // Check if node has items and handle them
      if (node.items && node.items.length > 0) {
        // Move items to parent or general category
        const targetNode = parent.id === "root" ? 
          this.getOrCreateGeneralCategory() : parent;
        
        if (!targetNode.items) {
          targetNode.items = [];
        }
        
        // Move items
        targetNode.items.push(...node.items);
        
        // Update item count
        if (!targetNode.metadata.itemCount) {
          targetNode.metadata.itemCount = 0;
        }
        targetNode.metadata.itemCount += node.items.length;
        targetNode.metadata.updatedAt = Date.now();
      }
      
      // Handle children if any
      if (node.children && node.children.length > 0) {
        // Move children to parent
        if (!parent.children) {
          parent.children = [];
        }
        
        // Remove the node from parent's children
        parent.children.splice(index, 1);
        
        // Add its children to parent
        parent.children.push(...node.children);
      } else {
        // Just remove the node
        parent.children.splice(index, 1);
      }
      
      // Update parent metadata
      parent.metadata.updatedAt = Date.now();
      
      return true;
    } catch (error) {
      console.error("Error removing taxonomy node:", error);
      throw error;
    }
  }
  
  /**
   * Find a taxonomy node's parent
   * @param {Object} node - Current node
   * @param {string} targetId - Target node ID
   * @returns {Object|null} Parent node and index, or null if not found
   * @private
   */
  findTaxonomyNodeParent(node, targetId) {
    if (!node.children) {
      return null;
    }
    
    // Check if target is a direct child
    const index = node.children.findIndex(child => child.id === targetId);
    
    if (index >= 0) {
      return { parent: node, index };
    }
    
    // Recursively check children
    for (const child of node.children) {
      const result = this.findTaxonomyNodeParent(child, targetId);
      if (result) {
        return result;
      }
    }
    
    return null;
  }
  
  /**
   * Get or create the general category
   * @returns {Object} General category node
   * @private
   */
  getOrCreateGeneralCategory() {
    // Find general category
    let generalNode = this._taxonomyTree.children.find(
      child => child.id === "general"
    );
    
    if (!generalNode) {
      // Create it
      generalNode = {
        id: "general",
        name: "General",
        description: "General uncategorized knowledge",
        children: [],
        metadata: {
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      };
      
      this._taxonomyTree.children.push(generalNode);
    }
    
    return generalNode;
  }
  
  /**
   * Verify a source
   * @param {string} url - Source URL
   * @param {Object} options - Verification options
   * @returns {Promise<Object>} Verification result
   */
  async verifySource(url, options = {}) {
    if (!this.initialized) {
      throw new Error("Knowledge Management system not initialized");
    }
    
    if (!this.enableSourceTracking) {
      throw new Error("Source tracking feature is not enabled");
    }
    
    try {
      // Check if source is already tracked
      let source = this._sources[url];
      
      if (!source) {
        source = {
          url,
          name: options.name || url,
          type: options.type || "unknown",
          retrievedAt: Date.now(),
          verified: false,
          credibilityScore: 0.5
        };
      }
      
      // Simulate verification
      // In a real implementation, this would check against trusted sources,
      // analyze website credibility, etc.
      
      const verificationResult = {
        url,
        verified: true,
        credibilityScore: 0.8,
        verifiedAt: Date.now(),
        factors: {
          domainTrust: 0.8,
          contentQuality: 0.7,
          references: 0.8,
          consistency: 0.9
        }
      };
      
      // Update source information
      source.verified = verificationResult.verified;
      source.credibilityScore = verificationResult.credibilityScore;
      source.verifiedAt = verificationResult.verifiedAt;
      source.verificationFactors = verificationResult.factors;
      
      // Save updated source
      this._sources[url] = source;
      
      // Notify listeners
      this._notifyListeners("onSourceVerified", {
        source,
        result: verificationResult,
        timestamp: Date.now()
      });
      
      return {
        source,
        verification: verificationResult
      };
    } catch (error) {
      console.error("Source verification error:", error);
      throw error;
    }
  }
  
  /**
   * Get knowledge statistics
   * @returns {Object} Statistics
   */
  getStatistics() {
    const stats = {
      totalItems: Object.keys(this._knowledgeBase).length,
      itemsByType: {},
      itemsByCategory: {},
      sourcesCount: Object.keys(this._sources).length,
      trustedSources: 0,
      averageTrustScore: 0,
      verifiedItems: 0,
      taxonomySize: 0,
      graphSize: {
        nodes: 0,
        edges: 0
      }
    };
    
    // Calculate detailed statistics
    let trustScoreSum = 0;
    
    for (const item of Object.values(this._knowledgeBase)) {
      // Count by type
      stats.itemsByType[item.type] = (stats.itemsByType[item.type] || 0) + 1;
      
      // Count by category
      stats.itemsByCategory[item.category] = (stats.itemsByCategory[item.category] || 0) + 1;
      
      // Count verified items
      if (item.verified) {
        stats.verifiedItems++;
      }
      
      // Sum trust scores
      trustScoreSum += item.trustScore || 0;
    }
    
    // Calculate average trust score
    if (stats.totalItems > 0) {
      stats.averageTrustScore = trustScoreSum / stats.totalItems;
    }
    
    // Count trusted sources
    for (const source of Object.values(this._sources)) {
      if (source.verified) {
        stats.trustedSources++;
      }
    }
    
    // Count taxonomy nodes
    if (this.enableHierarchicalTaxonomy) {
      stats.taxonomySize = this.countTaxonomyNodes(this._taxonomyTree);
    }
    
    // Count graph size
    if (this.enableKnowledgeGraph) {
      stats.graphSize.nodes = this._knowledgeGraph.metadata.nodeCount;
      stats.graphSize.edges = this._knowledgeGraph.metadata.edgeCount;
    }
    
    return stats;
  }
  
  /**
   * Count nodes in the taxonomy tree
   * @param {Object} node - Current node
   * @returns {number} Node count
   * @private
   */
  countTaxonomyNodes(node) {
    if (!node) {
      return 0;
    }
    
    let count = 1; // Count the current node
    
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        count += this.countTaxonomyNodes(child);
      }
    }
    
    return count;
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
   * Generate a unique knowledge item ID
   * @returns {string} Knowledge item ID
   * @private
   */
  generateKnowledgeId() {
    return `k_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
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
   * Generate a simple unique ID
   * @returns {string} Unique ID
   * @private
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
  
  /**
   * Get current configuration
   * @returns {Object} Current configuration
   */
  getConfiguration() {
    return {
      version: this.version,
      initialized: this.initialized,
      storageProvider: this.storageProvider,
      features: {
        semanticSearch: this.enableSemanticSearch,
        factVerification: this.enableFactVerification,
        sourceTracking: this.enableSourceTracking,
        knowledgeGraph: this.enableKnowledgeGraph,
        autoUpdate: this.enableAutoUpdate,
        hierarchicalTaxonomy: this.enableHierarchicalTaxonomy
      },
      security: {
        accessControl: this.enableAccessControl,
        requireSourceVerification: this.requireSourceVerification,
        enforceTrustScores: this.enforceTrustScores,
        minimumTrustScore: this.minimumTrustScore
      },
      performance: {
        vectorDimensions: this.vectorDimensions,
        maxResults: this.maxResults,
        minRelevanceScore: this.minRelevanceScore,
        autoUpdateInterval: this.autoUpdateInterval
      }
    };
  }
}

// Export the class for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KnowledgeManagement;
} else if (typeof window !== 'undefined') {
  window.KnowledgeManagement = KnowledgeManagement;
}
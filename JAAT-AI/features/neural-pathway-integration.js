/**
 * JAAT-AI Neural Pathway Integration
 * Provides advanced neural learning patterns and memory integration
 */

class NeuralPathwayIntegration {
    constructor() {
        this.memoryNodes = {};
        this.connectionStrengths = {};
        this.activationThreshold = 0.65;
        this.decayRate = 0.05;
        this.learningRate = 0.2;
        this.maxConnections = 50;
        this.lastRestructure = Date.now();
        this.restructureInterval = 24 * 60 * 60 * 1000; // 24 hours
        
        // Load saved neural pathways if available
        this.loadPathways();
        
        // Schedule periodic maintenance
        setInterval(() => this.performMaintenance(), 3600000); // Every hour
        
        console.log('JAAT-AI Neural Pathway Integration initialized');
    }
    
    /**
     * Load saved neural pathways from storage
     */
    loadPathways() {
        try {
            const savedMemoryNodes = localStorage.getItem('jaat-memory-nodes');
            const savedConnectionStrengths = localStorage.getItem('jaat-connection-strengths');
            
            if (savedMemoryNodes && savedConnectionStrengths) {
                this.memoryNodes = JSON.parse(savedMemoryNodes);
                this.connectionStrengths = JSON.parse(savedConnectionStrengths);
                console.log('Neural pathways loaded from storage');
            } else {
                console.log('No saved neural pathways found, initializing new network');
                this.initializeBaseNetwork();
            }
        } catch (error) {
            console.error('Failed to load neural pathways:', error);
            this.initializeBaseNetwork();
        }
    }
    
    /**
     * Save neural pathways to storage
     */
    savePathways() {
        try {
            localStorage.setItem('jaat-memory-nodes', JSON.stringify(this.memoryNodes));
            localStorage.setItem('jaat-connection-strengths', JSON.stringify(this.connectionStrengths));
        } catch (error) {
            console.error('Failed to save neural pathways:', error);
        }
    }
    
    /**
     * Initialize a basic neural network structure
     */
    initializeBaseNetwork() {
        // Create base categories
        const baseCategories = [
            'general', 'science', 'technology', 'arts', 
            'history', 'math', 'language', 'business'
        ];
        
        baseCategories.forEach(category => {
            this.memoryNodes[category] = {
                type: 'category',
                lastAccessed: Date.now(),
                accessCount: 1,
                connections: []
            };
        });
        
        // Create initial connections between categories
        this.establishBasicConnections(baseCategories);
        
        // Save the initial network
        this.savePathways();
    }
    
    /**
     * Establish basic connections between categories
     * @param {Array} categories - List of categories to connect
     */
    establishBasicConnections(categories) {
        categories.forEach((category, index) => {
            // Connect each category to 2-3 other categories
            const numConnections = Math.floor(Math.random() * 2) + 2;
            const possibleConnections = [...categories];
            possibleConnections.splice(index, 1); // Remove self
            
            const connections = [];
            for (let i = 0; i < numConnections && possibleConnections.length > 0; i++) {
                const randIndex = Math.floor(Math.random() * possibleConnections.length);
                const target = possibleConnections[randIndex];
                possibleConnections.splice(randIndex, 1);
                
                connections.push(target);
                
                // Initialize connection strength (bidirectional)
                const connectionKey = this.getConnectionKey(category, target);
                this.connectionStrengths[connectionKey] = 0.5 + (Math.random() * 0.3);
            }
            
            this.memoryNodes[category].connections = connections;
        });
    }
    
    /**
     * Process a new concept and integrate it into the neural network
     * @param {string} concept - The concept to process
     * @param {Object} metadata - Additional metadata about the concept
     * @returns {boolean} Whether integration was successful
     */
    processConcept(concept, metadata = {}) {
        if (!concept || typeof concept !== 'string') {
            console.error('Invalid concept provided');
            return false;
        }
        
        // Normalize the concept ID
        const conceptId = this.normalizeId(concept);
        
        // If concept already exists, strengthen it
        if (this.memoryNodes[conceptId]) {
            this.strengthenNode(conceptId);
        } else {
            // Create new memory node
            this.createMemoryNode(conceptId, concept, metadata);
        }
        
        // Establish connections to related concepts
        if (metadata.relatedConcepts && Array.isArray(metadata.relatedConcepts)) {
            metadata.relatedConcepts.forEach(related => {
                const relatedId = this.normalizeId(related);
                
                // Create related concept if it doesn't exist
                if (!this.memoryNodes[relatedId]) {
                    this.createMemoryNode(relatedId, related, { type: 'auto-generated' });
                }
                
                // Create or strengthen connection
                this.createOrStrengthenConnection(conceptId, relatedId);
            });
        }
        
        // Connect to a category if provided
        if (metadata.category && this.memoryNodes[metadata.category]) {
            this.createOrStrengthenConnection(conceptId, metadata.category);
        } else {
            // Auto-categorize based on content
            this.autoCategorize(conceptId, concept);
        }
        
        // Save the updated network periodically
        // (Not saving on every concept to reduce performance impact)
        if (Math.random() < 0.1) {
            this.savePathways();
        }
        
        return true;
    }
    
    /**
     * Create a new memory node
     * @param {string} id - Node ID
     * @param {string} label - Display label for the node
     * @param {Object} metadata - Additional metadata
     */
    createMemoryNode(id, label, metadata = {}) {
        this.memoryNodes[id] = {
            type: metadata.type || 'concept',
            label: label,
            lastAccessed: Date.now(),
            accessCount: 1,
            connections: [],
            metadata: { ...metadata }
        };
    }
    
    /**
     * Strengthen a memory node by updating its access information
     * @param {string} nodeId - ID of the node to strengthen
     */
    strengthenNode(nodeId) {
        if (!this.memoryNodes[nodeId]) return;
        
        this.memoryNodes[nodeId].lastAccessed = Date.now();
        this.memoryNodes[nodeId].accessCount += 1;
    }
    
    /**
     * Create or strengthen a connection between two nodes
     * @param {string} sourceId - Source node ID
     * @param {string} targetId - Target node ID
     * @param {number} [strengthIncrease=0.1] - Amount to increase connection strength
     */
    createOrStrengthenConnection(sourceId, targetId, strengthIncrease = 0.1) {
        if (!this.memoryNodes[sourceId] || !this.memoryNodes[targetId]) return;
        
        // Add connection if it doesn't exist
        if (!this.memoryNodes[sourceId].connections.includes(targetId)) {
            this.memoryNodes[sourceId].connections.push(targetId);
            
            // Limit the number of connections
            if (this.memoryNodes[sourceId].connections.length > this.maxConnections) {
                this.pruneConnections(sourceId);
            }
        }
        
        // Add reverse connection if it doesn't exist (bidirectional)
        if (!this.memoryNodes[targetId].connections.includes(sourceId)) {
            this.memoryNodes[targetId].connections.push(sourceId);
            
            // Limit the number of connections
            if (this.memoryNodes[targetId].connections.length > this.maxConnections) {
                this.pruneConnections(targetId);
            }
        }
        
        // Update connection strength
        const connectionKey = this.getConnectionKey(sourceId, targetId);
        if (!this.connectionStrengths[connectionKey]) {
            this.connectionStrengths[connectionKey] = 0.5; // Initial strength
        } else {
            // Increase strength but cap at 1.0
            this.connectionStrengths[connectionKey] = Math.min(
                1.0, 
                this.connectionStrengths[connectionKey] + strengthIncrease
            );
        }
    }
    
    /**
     * Prune connections from a node, removing the weakest ones
     * @param {string} nodeId - ID of the node to prune
     */
    pruneConnections(nodeId) {
        if (!this.memoryNodes[nodeId]) return;
        
        const connections = this.memoryNodes[nodeId].connections;
        
        // Calculate strength values for all connections
        const connectionStrengths = connections.map(targetId => {
            const key = this.getConnectionKey(nodeId, targetId);
            return {
                targetId,
                strength: this.connectionStrengths[key] || 0
            };
        });
        
        // Sort by strength (ascending)
        connectionStrengths.sort((a, b) => a.strength - b.strength);
        
        // Remove the weakest connections
        const toRemove = connectionStrengths.slice(
            0, 
            connections.length - this.maxConnections
        );
        
        // Update the connections array
        this.memoryNodes[nodeId].connections = connections.filter(
            targetId => !toRemove.some(item => item.targetId === targetId)
        );
    }
    
    /**
     * Auto-categorize a concept based on its content
     * @param {string} conceptId - ID of the concept to categorize
     * @param {string} conceptText - Text content of the concept
     */
    autoCategorize(conceptId, conceptText) {
        // Get all category nodes
        const categories = Object.keys(this.memoryNodes).filter(
            id => this.memoryNodes[id].type === 'category'
        );
        
        // Simple keyword-based categorization
        // In a real implementation, this would use NLP or ML techniques
        const categorizations = categories.map(categoryId => {
            let score = 0;
            
            // Simple keyword matching
            const keywordMap = {
                'science': ['science', 'scientific', 'experiment', 'hypothesis', 'theory', 'research'],
                'technology': ['technology', 'tech', 'computer', 'digital', 'software', 'hardware'],
                'arts': ['art', 'design', 'creative', 'music', 'film', 'painting'],
                'history': ['history', 'historical', 'ancient', 'past', 'war', 'century'],
                'math': ['math', 'mathematics', 'calculation', 'formula', 'equation', 'number'],
                'language': ['language', 'word', 'grammar', 'vocabulary', 'writing', 'speaking'],
                'business': ['business', 'finance', 'company', 'market', 'profit', 'economy'],
                'general': ['general', 'common', 'basic', 'everyday', 'universal']
            };
            
            const keywords = keywordMap[categoryId] || [];
            
            // Check for keyword matches
            keywords.forEach(keyword => {
                if (conceptText.toLowerCase().includes(keyword.toLowerCase())) {
                    score += 1;
                }
            });
            
            return { categoryId, score };
        });
        
        // Sort by score (descending)
        categorizations.sort((a, b) => b.score - a.score);
        
        // Connect to the top 2 categories or categories with a score > 0
        categorizations
            .filter(cat => cat.score > 0)
            .slice(0, 2)
            .forEach(cat => {
                this.createOrStrengthenConnection(conceptId, cat.categoryId);
            });
        
        // If no categories matched, connect to 'general'
        if (categorizations[0].score === 0) {
            this.createOrStrengthenConnection(conceptId, 'general');
        }
    }
    
    /**
     * Find related concepts for a given concept
     * @param {string} conceptId - ID of the concept to find relations for
     * @param {number} [maxResults=10] - Maximum number of results to return
     * @returns {Array} Array of related concepts with relevance scores
     */
    findRelatedConcepts(conceptId, maxResults = 10) {
        if (!this.memoryNodes[conceptId]) {
            return [];
        }
        
        // Direct connections (1st degree)
        const directConnections = this.memoryNodes[conceptId].connections.map(targetId => {
            const strength = this.connectionStrengths[this.getConnectionKey(conceptId, targetId)] || 0;
            return { 
                id: targetId, 
                label: this.memoryNodes[targetId].label || targetId,
                relevance: strength,
                degree: 1
            };
        });
        
        // 2nd degree connections (connections of connections)
        const secondDegreeConnections = [];
        directConnections.forEach(direct => {
            if (!this.memoryNodes[direct.id]) return;
            
            this.memoryNodes[direct.id].connections.forEach(secondaryId => {
                // Skip if it's the original concept or already a direct connection
                if (secondaryId === conceptId || this.memoryNodes[conceptId].connections.includes(secondaryId)) {
                    return;
                }
                
                const secondaryStrength = this.connectionStrengths[this.getConnectionKey(direct.id, secondaryId)] || 0;
                
                // Calculate diminished relevance for 2nd degree connections
                const relevance = direct.relevance * secondaryStrength * 0.7;
                
                secondDegreeConnections.push({
                    id: secondaryId,
                    label: this.memoryNodes[secondaryId].label || secondaryId,
                    relevance: relevance,
                    degree: 2,
                    viaId: direct.id,
                    viaLabel: direct.label
                });
            });
        });
        
        // Combine and sort all connections by relevance
        const allConnections = [...directConnections, ...secondDegreeConnections];
        allConnections.sort((a, b) => b.relevance - a.relevance);
        
        // Return top results
        return allConnections.slice(0, maxResults);
    }
    
    /**
     * Perform neural network maintenance
     * - Decay unused connections
     * - Remove very weak connections
     * - Restructure network if needed
     */
    performMaintenance() {
        console.log('Performing neural network maintenance...');
        
        // Decay unused connections
        this.decayUnusedConnections();
        
        // Remove very weak connections
        this.removeWeakConnections();
        
        // Check if network restructuring is needed
        const now = Date.now();
        if (now - this.lastRestructure > this.restructureInterval) {
            this.restructureNetwork();
            this.lastRestructure = now;
        }
        
        // Save changes
        this.savePathways();
    }
    
    /**
     * Decay connection strengths for unused connections
     */
    decayUnusedConnections() {
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;
        
        // Iterate through all connections
        Object.keys(this.connectionStrengths).forEach(key => {
            const [sourceId, targetId] = key.split('-to-');
            
            // Check if both nodes still exist
            if (!this.memoryNodes[sourceId] || !this.memoryNodes[targetId]) {
                delete this.connectionStrengths[key];
                return;
            }
            
            // Calculate days since last access for both nodes
            const sourceDaysSinceAccess = (now - this.memoryNodes[sourceId].lastAccessed) / oneDayMs;
            const targetDaysSinceAccess = (now - this.memoryNodes[targetId].lastAccessed) / oneDayMs;
            
            // Apply decay based on the more recently accessed node
            const daysSinceAccess = Math.min(sourceDaysSinceAccess, targetDaysSinceAccess);
            
            // More aggressive decay for older connections
            let decayFactor = 1.0;
            if (daysSinceAccess > 30) decayFactor = 3.0;
            else if (daysSinceAccess > 7) decayFactor = 1.5;
            
            const decayAmount = this.decayRate * decayFactor * (daysSinceAccess / 7);
            
            // Apply decay
            this.connectionStrengths[key] = Math.max(0.1, this.connectionStrengths[key] - decayAmount);
        });
    }
    
    /**
     * Remove connections that have fallen below threshold
     */
    removeWeakConnections() {
        const weakThreshold = 0.2;
        
        // Find weak connections
        const weakConnections = Object.keys(this.connectionStrengths).filter(
            key => this.connectionStrengths[key] < weakThreshold
        );
        
        // Remove weak connections
        weakConnections.forEach(key => {
            const [sourceId, targetId] = key.split('-to-');
            
            // Remove from connection lists if nodes exist
            if (this.memoryNodes[sourceId]) {
                this.memoryNodes[sourceId].connections = this.memoryNodes[sourceId].connections.filter(
                    id => id !== targetId
                );
            }
            
            if (this.memoryNodes[targetId]) {
                this.memoryNodes[targetId].connections = this.memoryNodes[targetId].connections.filter(
                    id => id !== sourceId
                );
            }
            
            // Remove the connection strength entry
            delete this.connectionStrengths[key];
        });
    }
    
    /**
     * Restructure the neural network by reinforcing important pathways
     * and identifying emergent patterns
     */
    restructureNetwork() {
        console.log('Restructuring neural network...');
        
        // Identify highly connected nodes
        const nodeConnectionCounts = {};
        Object.keys(this.memoryNodes).forEach(nodeId => {
            nodeConnectionCounts[nodeId] = this.memoryNodes[nodeId].connections.length;
        });
        
        // Sort nodes by connection count
        const sortedNodes = Object.keys(nodeConnectionCounts).sort(
            (a, b) => nodeConnectionCounts[b] - nodeConnectionCounts[a]
        );
        
        // Top 10% are considered "hub" nodes
        const hubCount = Math.max(3, Math.floor(sortedNodes.length * 0.1));
        const hubNodes = sortedNodes.slice(0, hubCount);
        
        // Reinforce connections between hub nodes
        hubNodes.forEach(sourceId => {
            hubNodes.forEach(targetId => {
                if (sourceId === targetId) return;
                
                this.createOrStrengthenConnection(sourceId, targetId, 0.05);
            });
        });
        
        // Mark hub nodes in their metadata
        hubNodes.forEach(nodeId => {
            if (this.memoryNodes[nodeId]) {
                this.memoryNodes[nodeId].metadata = this.memoryNodes[nodeId].metadata || {};
                this.memoryNodes[nodeId].metadata.isHub = true;
            }
        });
    }
    
    /**
     * Get a standardized connection key for two node IDs
     * @param {string} id1 - First node ID
     * @param {string} id2 - Second node ID
     * @returns {string} Connection key
     */
    getConnectionKey(id1, id2) {
        // Always put the lexicographically smaller ID first for consistency
        return id1 < id2 ? `${id1}-to-${id2}` : `${id2}-to-${id1}`;
    }
    
    /**
     * Normalize a string into a valid node ID
     * @param {string} input - String to normalize
     * @returns {string} Normalized ID
     */
    normalizeId(input) {
        return input.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
    }
    
    /**
     * Get a graph representation of the neural network
     * @param {number} [maxNodes=50] - Maximum number of nodes to include
     * @returns {Object} Graph data structure for visualization
     */
    getNetworkGraph(maxNodes = 50) {
        // Get the most active nodes
        const nodes = Object.keys(this.memoryNodes)
            .map(id => ({
                id,
                accessCount: this.memoryNodes[id].accessCount || 0,
                type: this.memoryNodes[id].type,
                label: this.memoryNodes[id].label || id
            }))
            .sort((a, b) => b.accessCount - a.accessCount)
            .slice(0, maxNodes);
        
        // Generate edges from the selected nodes
        const edges = [];
        const nodeIds = nodes.map(n => n.id);
        
        // Add edges only between nodes in our selection
        nodeIds.forEach(sourceId => {
            const connections = this.memoryNodes[sourceId].connections;
            
            connections.forEach(targetId => {
                if (nodeIds.includes(targetId)) {
                    const key = this.getConnectionKey(sourceId, targetId);
                    const strength = this.connectionStrengths[key] || 0;
                    
                    edges.push({
                        source: sourceId,
                        target: targetId,
                        strength: strength
                    });
                }
            });
        });
        
        return { nodes, edges };
    }
}

// Register the feature with JAAT-AI
if (window.JAAT) {
    window.JAAT.registerFeature('neural-pathway-integration', new NeuralPathwayIntegration());
}
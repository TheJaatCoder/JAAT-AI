/**
 * JAAT-AI Sentiment Tracker Feature
 * Monitor emotional trends and sentiment analysis in social media and other text sources
 */

class SentimentTracker {
    constructor() {
        // Supported content sources
        this.contentSources = [
            { id: 'twitter', name: 'Twitter', enabled: true, requiresAuth: true },
            { id: 'reddit', name: 'Reddit', enabled: true, requiresAuth: true },
            { id: 'custom', name: 'Custom Text', enabled: true, requiresAuth: false },
            { id: 'news', name: 'News Articles', enabled: true, requiresAuth: false },
            { id: 'historical', name: 'Historical Data', enabled: true, requiresAuth: false }
        ];
        
        // Sentiment analysis models
        this.models = [
            { id: 'basic', name: 'Basic (Fast)', description: 'Simple sentiment scoring from -1 to 1' },
            { id: 'advanced', name: 'Advanced (Detailed)', description: 'Emotion detection with detailed analysis' },
            { id: 'finbert', name: 'FinBERT (Finance)', description: 'Specialized for financial text' }
        ];
        
        // Default settings
        this.settings = {
            defaultSource: 'twitter',
            defaultModel: 'basic',
            refreshInterval: 3600, // in seconds
            cacheResults: true,
            cacheExpiry: 86400, // in seconds
            maxEntries: 1000,
            alertThreshold: 0.7, // sentiment must be > 0.7 or < -0.7 to trigger
            enableAlerts: false,
            includeEmotions: true,
            aggregateData: true,
            autoRefresh: true,
            historyLength: 30 // days
        };
        
        // Tracked terms
        this.trackedTerms = [];
        
        // Analysis results
        this.results = {
            current: {},
            historical: []
        };
        
        // Cache storage
        this.cache = new Map();
        
        // API endpoints
        this.endpoints = {
            sentiment: '/api/sentiment-analysis',
            twitter: '/api/twitter-feed',
            reddit: '/api/reddit-feed',
            news: '/api/news-articles'
        };
        
        // Rate limiting information
        this.rateLimits = {
            twitter: { remaining: 450, reset: Date.now() + 900000 },
            reddit: { remaining: 60, reset: Date.now() + 60000 },
            news: { remaining: 100, reset: Date.now() + 3600000 },
            sentiment: { remaining: 1000, reset: Date.now() + 86400000 }
        };
        
        // Background timers
        this.timers = {};
        
        // Authentication status for content sources
        this.authStatus = {
            twitter: false,
            reddit: false
        };
        
        // Event handlers
        this.eventHandlers = {};
    }

    /**
     * Initialize sentiment tracker
     * @param {Object} options - Configuration options
     * @returns {SentimentTracker} This instance
     */
    init(options = {}) {
        console.log('Initializing Sentiment Tracker...');
        
        // Apply custom options
        if (options) {
            this.settings = { ...this.settings, ...options };
        }
        
        // Check content source authentication
        this.checkAuthStatus();
        
        // Start auto-refresh if enabled
        if (this.settings.autoRefresh) {
            this.startAutoRefresh();
        }
        
        // Trigger initialization event
        this.triggerEvent('initialized', this.settings);
        
        return this;
    }

    /**
     * Check authentication status for content sources
     */
    async checkAuthStatus() {
        try {
            // Check Twitter auth
            const twitterAuth = localStorage.getItem('twitter_auth');
            this.authStatus.twitter = !!twitterAuth;
            
            // Check Reddit auth
            const redditAuth = localStorage.getItem('reddit_auth');
            this.authStatus.reddit = !!redditAuth;
            
            console.log('Content source auth status:', this.authStatus);
        } catch (error) {
            console.error('Error checking auth status:', error);
        }
    }

    /**
     * Start auto-refresh timer
     */
    startAutoRefresh() {
        // Clear existing timer
        if (this.timers.refresh) {
            clearInterval(this.timers.refresh);
        }
        
        // Set refresh timer
        const intervalMs = this.settings.refreshInterval * 1000;
        this.timers.refresh = setInterval(() => {
            // Refresh data for all active tracked terms
            const activeTerms = this.trackedTerms.filter(term => term.active);
            
            if (activeTerms.length > 0) {
                console.log(`Auto-refreshing data for ${activeTerms.length} terms...`);
                
                activeTerms.forEach(term => {
                    this.trackTerm(term.text, term.sources, term.options);
                });
            }
        }, intervalMs);
        
        console.log(`Auto-refresh started with interval of ${this.settings.refreshInterval} seconds`);
    }

    /**
     * Stop auto-refresh timer
     */
    stopAutoRefresh() {
        if (this.timers.refresh) {
            clearInterval(this.timers.refresh);
            delete this.timers.refresh;
            
            console.log('Auto-refresh stopped');
        }
    }

    /**
     * Track a term for sentiment analysis
     * @param {string} term - Term to track
     * @param {Array} sources - Content sources to use
     * @param {Object} options - Tracking options
     * @returns {Promise<Object>} Tracking results
     */
    async trackTerm(term, sources = [], options = {}) {
        // Validate term
        if (!term || typeof term !== 'string') {
            throw new Error('Invalid term');
        }
        
        // Use default sources if none provided
        if (!sources || sources.length === 0) {
            sources = [this.settings.defaultSource];
        }
        
        // Merge default options with provided options
        const trackingOptions = {
            model: this.settings.defaultModel,
            includeEmotions: this.settings.includeEmotions,
            ...options
        };
        
        console.log(`Tracking term: "${term}" using sources:`, sources);
        
        // Check if term is already being tracked
        const existingIndex = this.trackedTerms.findIndex(t => 
            t.text.toLowerCase() === term.toLowerCase()
        );
        
        // Update or add tracked term
        if (existingIndex >= 0) {
            this.trackedTerms[existingIndex] = {
                ...this.trackedTerms[existingIndex],
                sources,
                options: trackingOptions,
                active: true,
                lastUpdated: new Date().toISOString()
            };
        } else {
            this.trackedTerms.push({
                id: this.generateId(),
                text: term,
                sources,
                options: trackingOptions,
                active: true,
                created: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            });
        }
        
        // Collect content from sources
        const contentBySource = {};
        
        // Process each source in parallel
        await Promise.all(sources.map(async (sourceId) => {
            try {
                const source = this.contentSources.find(s => s.id === sourceId);
                
                // Skip disabled sources
                if (!source || !source.enabled) {
                    return;
                }
                
                // Check if auth required but not available
                if (source.requiresAuth && !this.authStatus[sourceId]) {
                    console.warn(`Auth required for ${source.name} but not authenticated`);
                    return;
                }
                
                // Check rate limits
                if (this.isRateLimited(sourceId)) {
                    console.warn(`Rate limited for ${source.name}`);
                    return;
                }
                
                // Check cache
                const cacheKey = `${sourceId}:${term}`;
                if (this.settings.cacheResults && this.isInCache(cacheKey)) {
                    contentBySource[sourceId] = this.getFromCache(cacheKey);
                    return;
                }
                
                // Fetch content
                const content = await this.fetchContentFromSource(sourceId, term);
                
                // Store in cache
                if (this.settings.cacheResults && content) {
                    this.addToCache(cacheKey, content);
                }
                
                contentBySource[sourceId] = content;
            } catch (error) {
                console.error(`Error fetching content from ${sourceId}:`, error);
            }
        }));
        
        // Analyze sentiment for each source's content
        const sentimentResults = {};
        
        for (const [sourceId, content] of Object.entries(contentBySource)) {
            if (!content || content.length === 0) {
                continue;
            }
            
            try {
                // Check rate limits for sentiment analysis
                if (this.isRateLimited('sentiment')) {
                    console.warn('Rate limited for sentiment analysis');
                    break;
                }
                
                // Check cache
                const cacheKey = `sentiment:${sourceId}:${term}:${trackingOptions.model}`;
                if (this.settings.cacheResults && this.isInCache(cacheKey)) {
                    sentimentResults[sourceId] = this.getFromCache(cacheKey);
                    continue;
                }
                
                // Analyze sentiment
                const analysis = await this.analyzeSentiment(content, trackingOptions.model);
                
                // Store in cache
                if (this.settings.cacheResults && analysis) {
                    this.addToCache(cacheKey, analysis);
                }
                
                sentimentResults[sourceId] = analysis;
            } catch (error) {
                console.error(`Error analyzing sentiment for ${sourceId}:`, error);
            }
        }
        
        // Aggregate results if requested
        let aggregatedResults = null;
        if (this.settings.aggregateData && Object.keys(sentimentResults).length > 0) {
            aggregatedResults = this.aggregateResults(sentimentResults);
        }
        
        // Store results
        this.results.current[term] = {
            term,
            sources: sentimentResults,
            aggregated: aggregatedResults,
            timestamp: new Date().toISOString()
        };
        
        // Add to historical data
        this.results.historical.push({
            term,
            sentiment: aggregatedResults ? aggregatedResults.sentiment : null,
            emotions: aggregatedResults ? aggregatedResults.emotions : null,
            timestamp: new Date().toISOString()
        });
        
        // Limit historical data
        const maxHistoryEntries = this.settings.maxEntries;
        if (this.results.historical.length > maxHistoryEntries) {
            this.results.historical = this.results.historical.slice(-maxHistoryEntries);
        }
        
        // Check for alerts
        if (this.settings.enableAlerts && aggregatedResults) {
            this.checkAlertThresholds(term, aggregatedResults);
        }
        
        // Trigger event
        this.triggerEvent('resultUpdated', {
            term,
            results: this.results.current[term]
        });
        
        return this.results.current[term];
    }

    /**
     * Stop tracking a term
     * @param {string} termId - Term ID to stop tracking
     * @returns {boolean} Success indicator
     */
    stopTrackingTerm(termId) {
        const index = this.trackedTerms.findIndex(t => t.id === termId);
        if (index === -1) {
            return false;
        }
        
        // Update term status
        this.trackedTerms[index].active = false;
        
        // Trigger event
        this.triggerEvent('termStopped', this.trackedTerms[index]);
        
        return true;
    }

    /**
     * Remove a tracked term
     * @param {string} termId - Term ID to remove
     * @returns {boolean} Success indicator
     */
    removeTrackedTerm(termId) {
        const index = this.trackedTerms.findIndex(t => t.id === termId);
        if (index === -1) {
            return false;
        }
        
        // Store term for event
        const term = this.trackedTerms[index];
        
        // Remove term
        this.trackedTerms.splice(index, 1);
        
        // Remove from results
        if (this.results.current[term.text]) {
            delete this.results.current[term.text];
        }
        
        // Remove from historical data
        this.results.historical = this.results.historical.filter(h => h.term !== term.text);
        
        // Trigger event
        this.triggerEvent('termRemoved', term);
        
        return true;
    }

    /**
     * Fetch content from a source
     * @param {string} sourceId - Source ID
     * @param {string} term - Term to search for
     * @returns {Promise<Array>} Content items
     */
    async fetchContentFromSource(sourceId, term) {
        switch (sourceId) {
            case 'twitter':
                return this.fetchTwitterContent(term);
            case 'reddit':
                return this.fetchRedditContent(term);
            case 'news':
                return this.fetchNewsContent(term);
            case 'custom':
                return this.getCustomContent(term);
            case 'historical':
                return this.getHistoricalContent(term);
            default:
                console.warn(`Unknown source: ${sourceId}`);
                return [];
        }
    }

    /**
     * Fetch content from Twitter
     * @param {string} term - Term to search for
     * @returns {Promise<Array>} Twitter posts
     */
    async fetchTwitterContent(term) {
        try {
            // Update rate limit info
            this.updateRateLimit('twitter');
            
            // Call Twitter API endpoint
            const response = await fetch(`${this.endpoints.twitter}?q=${encodeURIComponent(term)}`);
            
            if (!response.ok) {
                throw new Error(`Twitter API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Format results
            return data.tweets.map(tweet => ({
                id: tweet.id,
                text: tweet.text,
                author: tweet.author,
                timestamp: tweet.created_at,
                likes: tweet.like_count,
                retweets: tweet.retweet_count,
                source: 'twitter'
            }));
        } catch (error) {
            console.error('Error fetching Twitter content:', error);
            return [];
        }
    }

    /**
     * Fetch content from Reddit
     * @param {string} term - Term to search for
     * @returns {Promise<Array>} Reddit posts
     */
    async fetchRedditContent(term) {
        try {
            // Update rate limit info
            this.updateRateLimit('reddit');
            
            // Call Reddit API endpoint
            const response = await fetch(`${this.endpoints.reddit}?q=${encodeURIComponent(term)}`);
            
            if (!response.ok) {
                throw new Error(`Reddit API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Format results
            return data.posts.map(post => ({
                id: post.id,
                title: post.title,
                text: post.selftext,
                author: post.author,
                timestamp: post.created_utc,
                upvotes: post.ups,
                downvotes: post.downs,
                comments: post.num_comments,
                subreddit: post.subreddit,
                source: 'reddit'
            }));
        } catch (error) {
            console.error('Error fetching Reddit content:', error);
            return [];
        }
    }

    /**
     * Fetch content from news sources
     * @param {string} term - Term to search for
     * @returns {Promise<Array>} News articles
     */
    async fetchNewsContent(term) {
        try {
            // Update rate limit info
            this.updateRateLimit('news');
            
            // Call News API endpoint
            const response = await fetch(`${this.endpoints.news}?q=${encodeURIComponent(term)}`);
            
            if (!response.ok) {
                throw new Error(`News API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Format results
            return data.articles.map(article => ({
                id: article.id || article.url,
                title: article.title,
                description: article.description,
                content: article.content,
                author: article.author,
                timestamp: article.publishedAt,
                source: article.source.name,
                url: article.url,
                type: 'news'
            }));
        } catch (error) {
            console.error('Error fetching news content:', error);
            return [];
        }
    }

    /**
     * Get custom content (input by user)
     * @param {string} term - Term identifier
     * @returns {Array} Custom content
     */
    getCustomContent(term) {
        // This would typically come from user input form
        // For now, return empty array
        return [];
    }

    /**
     * Get historical content for a term
     * @param {string} term - Term to get history for
     * @returns {Array} Historical content
     */
    getHistoricalContent(term) {
        // Filter historical data for this term
        return this.results.historical
            .filter(item => item.term === term)
            .map(item => ({
                id: `hist-${item.timestamp}`,
                text: term,
                timestamp: item.timestamp,
                sentiment: item.sentiment,
                emotions: item.emotions,
                type: 'historical'
            }));
    }

    /**
     * Analyze sentiment of content
     * @param {Array} content - Content items to analyze
     * @param {string} model - Model to use
     * @returns {Promise<Object>} Sentiment analysis results
     */
    async analyzeSentiment(content, model = 'basic') {
        try {
            // If no content, return null
            if (!content || content.length === 0) {
                return null;
            }
            
            // Extract text from content
            const texts = content.map(item => {
                if (item.text) return item.text;
                if (item.title && item.description) return `${item.title}. ${item.description}`;
                if (item.title) return item.title;
                if (item.description) return item.description;
                if (item.content) return item.content;
                return '';
            }).filter(text => text.trim().length > 0);
            
            // Update rate limit
            this.updateRateLimit('sentiment');
            
            // Call API for sentiment analysis
            const response = await fetch(this.endpoints.sentiment, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    texts,
                    model,
                    includeEmotions: this.settings.includeEmotions
                })
            });
            
            if (!response.ok) {
                throw new Error(`Sentiment API error: ${response.status} ${response.statusText}`);
            }
            
            // Process results
            const results = await response.json();
            
            // Calculate aggregate sentiment
            const totalSentiment = results.sentiments.reduce((sum, s) => sum + s.score, 0);
            const avgSentiment = totalSentiment / results.sentiments.length;
            
            // Process emotions if included
            let emotions = {};
            if (results.emotions && results.emotions.length > 0) {
                // Aggregate emotions across all content
                for (const emotionSet of results.emotions) {
                    for (const [emotion, score] of Object.entries(emotionSet)) {
                        if (!emotions[emotion]) {
                            emotions[emotion] = 0;
                        }
                        emotions[emotion] += score;
                    }
                }
                
                // Calculate averages
                for (const emotion in emotions) {
                    emotions[emotion] /= results.emotions.length;
                }
            }
            
            return {
                sentiment: {
                    score: avgSentiment,
                    magnitude: results.magnitude || Math.abs(avgSentiment),
                    label: this.getSentimentLabel(avgSentiment),
                    individual: results.sentiments
                },
                emotions: Object.keys(emotions).length > 0 ? emotions : null,
                metadata: {
                    contentCount: texts.length,
                    model,
                    timestamp: new Date().toISOString()
                }
            };
        } catch (error) {
            console.error('Error analyzing sentiment:', error);
            return null;
        }
    }

    /**
     * Get sentiment label based on score
     * @param {number} score - Sentiment score
     * @returns {string} Sentiment label
     */
    getSentimentLabel(score) {
        if (score >= 0.7) return 'Very Positive';
        if (score >= 0.3) return 'Positive';
        if (score > -0.3) return 'Neutral';
        if (score > -0.7) return 'Negative';
        return 'Very Negative';
    }

    /**
     * Aggregate results from multiple sources
     * @param {Object} resultsBySource - Results by source
     * @returns {Object} Aggregated results
     */
    aggregateResults(resultsBySource) {
        // Count number of sources with results
        const sourcesWithResults = Object.values(resultsBySource)
            .filter(result => result && result.sentiment)
            .length;
            
        if (sourcesWithResults === 0) {
            return null;
        }
        
        // Aggregate sentiment scores
        let totalSentiment = 0;
        let totalMagnitude = 0;
        let allEmotions = {};
        
        for (const result of Object.values(resultsBySource)) {
            if (!result || !result.sentiment) continue;
            
            totalSentiment += result.sentiment.score;
            totalMagnitude += result.sentiment.magnitude;
            
            // Aggregate emotions
            if (result.emotions) {
                for (const [emotion, score] of Object.entries(result.emotions)) {
                    if (!allEmotions[emotion]) {
                        allEmotions[emotion] = 0;
                    }
                    allEmotions[emotion] += score;
                }
            }
        }
        
        // Calculate averages
        const avgSentiment = totalSentiment / sourcesWithResults;
        const avgMagnitude = totalMagnitude / sourcesWithResults;
        
        // Average emotions
        for (const emotion in allEmotions) {
            allEmotions[emotion] /= sourcesWithResults;
        }
        
        return {
            sentiment: {
                score: avgSentiment,
                magnitude: avgMagnitude,
                label: this.getSentimentLabel(avgSentiment)
            },
            emotions: Object.keys(allEmotions).length > 0 ? allEmotions : null,
            sourcesCount: sourcesWithResults,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Check if alerts should be triggered based on sentiment thresholds
     * @param {string} term - Term being analyzed
     * @param {Object} results - Analysis results
     */
    checkAlertThresholds(term, results) {
        if (!this.settings.enableAlerts || !results || !results.sentiment) {
            return;
        }
        
        const score = results.sentiment.score;
        const threshold = this.settings.alertThreshold;
        
        // Check if sentiment exceeds threshold (positive or negative)
        if (Math.abs(score) >= threshold) {
            const isPositive = score > 0;
            
            // Create alert data
            const alertData = {
                term,
                sentiment: score,
                label: results.sentiment.label,
                isPositive,
                timestamp: new Date().toISOString()
            };
            
            // Add top emotions if available
            if (results.emotions) {
                const topEmotions = Object.entries(results.emotions)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([emotion, score]) => ({ emotion, score }));
                    
                alertData.topEmotions = topEmotions;
            }
            
            // Trigger alert event
            this.triggerEvent('sentimentAlert', alertData);
        }
    }

    /**
     * Check if a source is rate limited
     * @param {string} sourceId - Source ID
     * @returns {boolean} Whether source is rate limited
     */
    isRateLimited(sourceId) {
        if (!this.rateLimits[sourceId]) {
            return false;
        }
        
        const limit = this.rateLimits[sourceId];
        return limit.remaining <= 0 && Date.now() < limit.reset;
    }

    /**
     * Update rate limit info for a source
     * @param {string} sourceId - Source ID
     * @param {Object} info - Rate limit info
     */
    updateRateLimit(sourceId, info = null) {
        if (!this.rateLimits[sourceId]) {
            return;
        }
        
        if (info) {
            this.rateLimits[sourceId] = { ...info };
        } else {
            // Simulate decrementing the remaining calls
            this.rateLimits[sourceId].remaining = Math.max(0, this.rateLimits[sourceId].remaining - 1);
        }
    }

    /**
     * Check if an item is in the cache
     * @param {string} key - Cache key
     * @returns {boolean} Whether item is in cache
     */
    isInCache(key) {
        if (!this.cache.has(key)) {
            return false;
        }
        
        const entry = this.cache.get(key);
        return Date.now() < entry.expiry;
    }

    /**
     * Get an item from the cache
     * @param {string} key - Cache key
     * @returns {*} Cached item or null
     */
    getFromCache(key) {
        if (!this.isInCache(key)) {
            return null;
        }
        
        return this.cache.get(key).data;
    }

    /**
     * Add an item to the cache
     * @param {string} key - Cache key
     * @param {*} data - Data to cache
     */
    addToCache(key, data) {
        const expiry = Date.now() + (this.settings.cacheExpiry * 1000);
        this.cache.set(key, { data, expiry });
        
        // Trim cache if it gets too large
        if (this.cache.size > 1000) {
            const keysToDelete = [];
            const now = Date.now();
            
            for (const [key, entry] of this.cache.entries()) {
                if (entry.expiry < now) {
                    keysToDelete.push(key);
                }
                
                if (keysToDelete.length >= 100) {
                    break;
                }
            }
            
            keysToDelete.forEach(key => this.cache.delete(key));
        }
    }

    /**
     * Clear the cache
     * @param {string} sourceId - Optional source to clear cache for
     */
    clearCache(sourceId = null) {
        if (sourceId) {
            // Clear cache for specific source
            for (const key of this.cache.keys()) {
                if (key.startsWith(`${sourceId}:`)) {
                    this.cache.delete(key);
                }
            }
        } else {
            // Clear entire cache
            this.cache.clear();
        }
    }

    /**
     * Get current sentiment results
     * @param {string} term - Term to get results for (optional)
     * @returns {Object} Sentiment results
     */
    getCurrentResults(term = null) {
        if (term) {
            return this.results.current[term] || null;
        }
        
        return this.results.current;
    }

    /**
     * Get historical sentiment data
     * @param {string} term - Term to get history for (optional)
     * @param {Object} options - Options for filtering
     * @returns {Array} Historical sentiment data
     */
    getHistoricalData(term = null, options = {}) {
        let data = [...this.results.historical];
        
        // Filter by term if provided
        if (term) {
            data = data.filter(item => item.term === term);
        }
        
        // Filter by date range if provided
        if (options.startDate) {
            const startDate = new Date(options.startDate);
            data = data.filter(item => new Date(item.timestamp) >= startDate);
        }
        
        if (options.endDate) {
            const endDate = new Date(options.endDate);
            data = data.filter(item => new Date(item.timestamp) <= endDate);
        }
        
        // Sort by timestamp
        if (options.sortOrder === 'asc') {
            data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        } else {
            data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        }
        
        // Limit results
        if (options.limit && options.limit > 0) {
            data = data.slice(0, options.limit);
        }
        
        return data;
    }

    /**
     * Get tracked terms
     * @param {boolean} activeOnly - Whether to get only active terms
     * @returns {Array} Tracked terms
     */
    getTrackedTerms(activeOnly = false) {
        if (activeOnly) {
            return this.trackedTerms.filter(term => term.active);
        }
        
        return [...this.trackedTerms];
    }

    /**
     * Update settings
     * @param {Object} settings - New settings
     */
    updateSettings(settings) {
        const oldSettings = { ...this.settings };
        this.settings = { ...this.settings, ...settings };
        
        // Restart auto-refresh if the interval changed
        if (this.settings.autoRefresh && oldSettings.refreshInterval !== this.settings.refreshInterval) {
            this.stopAutoRefresh();
            this.startAutoRefresh();
        } else if (!this.settings.autoRefresh && this.timers.refresh) {
            this.stopAutoRefresh();
        } else if (this.settings.autoRefresh && !oldSettings.autoRefresh) {
            this.startAutoRefresh();
        }
        
        // Trigger settings updated event
        this.triggerEvent('settingsUpdated', this.settings);
    }

    /**
     * Authenticate with a content source
     * @param {string} sourceId - Source ID
     * @param {Object} credentials - Authentication credentials
     * @returns {Promise<boolean>} Success indicator
     */
    async authenticateSource(sourceId, credentials) {
        // This would typically call an API to authenticate
        // For now, simulate successful authentication
        console.log(`Authenticating with ${sourceId}...`);
        
        try {
            // Store auth info in localStorage
            localStorage.setItem(`${sourceId}_auth`, JSON.stringify({
                authenticated: true,
                timestamp: Date.now()
            }));
            
            // Update auth status
            this.authStatus[sourceId] = true;
            
            // Trigger event
            this.triggerEvent('sourceAuthenticated', { sourceId });
            
            return true;
        } catch (error) {
            console.error(`Error authenticating with ${sourceId}:`, error);
            return false;
        }
    }

    /**
     * Deauthenticate from a content source
     * @param {string} sourceId - Source ID
     * @returns {boolean} Success indicator
     */
    deauthenticateSource(sourceId) {
        try {
            // Remove auth info from localStorage
            localStorage.removeItem(`${sourceId}_auth`);
            
            // Update auth status
            this.authStatus[sourceId] = false;
            
            // Trigger event
            this.triggerEvent('sourceDeauthenticated', { sourceId });
            
            return true;
        } catch (error) {
            console.error(`Error deauthenticating from ${sourceId}:`, error);
            return false;
        }
    }

    /**
     * Generate a unique ID
     * @returns {string} Unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    /**
     * Register an event handler
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     */
    on(event, handler) {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        
        this.eventHandlers[event].push(handler);
    }

    /**
     * Trigger an event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    triggerEvent(event, data) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event].forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }

    /**
     * Create UI for sentiment tracker
     * @param {HTMLElement|string} container - Container element or selector
     * @returns {HTMLElement} Created UI element
     */
    createUI(container) {
        // Get container element
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) {
            console.error('Container element not found');
            return null;
        }
        
        // Create main UI container
        const uiContainer = document.createElement('div');
        uiContainer.className = 'sentiment-tracker-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'sentiment-tracker-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'sentiment-tracker-title';
        title.textContent = 'Sentiment Tracker';
        header.appendChild(title);
        
        // Create add term form
        const addForm = document.createElement('div');
        addForm.className = 'add-term-form';
        uiContainer.appendChild(addForm);
        
        const termInput = document.createElement('input');
        termInput.type = 'text';
        termInput.className = 'term-input';
        termInput.placeholder = 'Enter keyword, hashtag, or phrase to track';
        addForm.appendChild(termInput);
        
        const sourceSelect = document.createElement('select');
        sourceSelect.className = 'source-select';
        sourceSelect.multiple = true;
        
        this.contentSources.forEach(source => {
            const option = document.createElement('option');
            option.value = source.id;
            option.textContent = source.name;
            
            // Select default source by default
            if (source.id === this.settings.defaultSource) {
                option.selected = true;
            }
            
            // Disable if source requires auth but not authenticated
            if (source.requiresAuth && !this.authStatus[source.id]) {
                option.disabled = true;
                option.textContent += ' (Auth Required)';
            }
            
            sourceSelect.appendChild(option);
        });
        
        addForm.appendChild(sourceSelect);
        
        const trackButton = document.createElement('button');
        trackButton.className = 'track-button';
        trackButton.textContent = 'Track Sentiment';
        addForm.appendChild(trackButton);
        
        // Create tabs container
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'tabs-container';
        uiContainer.appendChild(tabsContainer);
        
        const trackedTab = document.createElement('button');
        trackedTab.className = 'tab-button active';
        trackedTab.textContent = 'Tracked Terms';
        trackedTab.dataset.tab = 'tracked';
        tabsContainer.appendChild(trackedTab);
        
        const resultsTab = document.createElement('button');
        resultsTab.className = 'tab-button';
        resultsTab.textContent = 'Analysis Results';
        resultsTab.dataset.tab = 'results';
        tabsContainer.appendChild(resultsTab);
        
        const historyTab = document.createElement('button');
        historyTab.className = 'tab-button';
        historyTab.textContent = 'Historical Data';
        historyTab.dataset.tab = 'history';
        tabsContainer.appendChild(historyTab);
        
        const settingsTab = document.createElement('button');
        settingsTab.className = 'tab-button';
        settingsTab.textContent = 'Settings';
        settingsTab.dataset.tab = 'settings';
        tabsContainer.appendChild(settingsTab);
        
        // Create tab content containers
        const tabContents = document.createElement('div');
        tabContents.className = 'tab-contents';
        uiContainer.appendChild(tabContents);
        
        // Tracked terms content
        const trackedContent = document.createElement('div');
        trackedContent.className = 'tab-content active';
        trackedContent.dataset.tab = 'tracked';
        tabContents.appendChild(trackedContent);
        
        const trackedList = document.createElement('div');
        trackedList.className = 'tracked-terms-list';
        trackedContent.appendChild(trackedList);
        
        // Results content
        const resultsContent = document.createElement('div');
        resultsContent.className = 'tab-content';
        resultsContent.dataset.tab = 'results';
        resultsContent.style.display = 'none';
        tabContents.appendChild(resultsContent);
        
        const resultsTerm = document.createElement('select');
        resultsTerm.className = 'results-term-select';
        resultsTerm.innerHTML = '<option value="">Select a term</option>';
        resultsContent.appendChild(resultsTerm);
        
        const resultsDisplay = document.createElement('div');
        resultsDisplay.className = 'results-display';
        resultsContent.appendChild(resultsDisplay);
        
        // History content
        const historyContent = document.createElement('div');
        historyContent.className = 'tab-content';
        historyContent.dataset.tab = 'history';
        historyContent.style.display = 'none';
        tabContents.appendChild(historyContent);
        
        const historyControls = document.createElement('div');
        historyControls.className = 'history-controls';
        historyContent.appendChild(historyControls);
        
        const historyTerm = document.createElement('select');
        historyTerm.className = 'history-term-select';
        historyTerm.innerHTML = '<option value="">All terms</option>';
        historyControls.appendChild(historyTerm);
        
        const timeframeSelect = document.createElement('select');
        timeframeSelect.className = 'timeframe-select';
        
        const timeframes = [
            { value: '1d', label: 'Last 24 hours' },
            { value: '7d', label: 'Last 7 days' },
            { value: '30d', label: 'Last 30 days' },
            { value: '90d', label: 'Last 90 days' },
            { value: 'all', label: 'All time' }
        ];
        
        timeframes.forEach(tf => {
            const option = document.createElement('option');
            option.value = tf.value;
            option.textContent = tf.label;
            
            if (tf.value === '30d') {
                option.selected = true;
            }
            
            timeframeSelect.appendChild(option);
        });
        
        historyControls.appendChild(timeframeSelect);
        
        const historyDisplay = document.createElement('div');
        historyDisplay.className = 'history-display';
        historyContent.appendChild(historyDisplay);
        
        // Settings content
        const settingsContent = document.createElement('div');
        settingsContent.className = 'tab-content';
        settingsContent.dataset.tab = 'settings';
        settingsContent.style.display = 'none';
        tabContents.appendChild(settingsContent);
        
        // Create settings form
        const settingsForm = document.createElement('form');
        settingsForm.className = 'settings-form';
        settingsContent.appendChild(settingsForm);
        
        // Create settings groups
        const generalSettings = this.createSettingsGroup('General Settings');
        settingsForm.appendChild(generalSettings);
        
        // Add settings fields
        this.addSettingField(generalSettings, 'auto-refresh', 'checkbox', 'Auto-refresh data', this.settings.autoRefresh);
        this.addSettingField(generalSettings, 'refresh-interval', 'number', 'Refresh interval (seconds)', this.settings.refreshInterval);
        this.addSettingField(generalSettings, 'enable-alerts', 'checkbox', 'Enable alerts', this.settings.enableAlerts);
        this.addSettingField(generalSettings, 'alert-threshold', 'range', 'Alert threshold', this.settings.alertThreshold, { min: 0, max: 1, step: 0.1 });
        
        const dataSettings = this.createSettingsGroup('Data Settings');
        settingsForm.appendChild(dataSettings);
        
        this.addSettingField(dataSettings, 'cache-results', 'checkbox', 'Cache results', this.settings.cacheResults);
        this.addSettingField(dataSettings, 'cache-expiry', 'number', 'Cache expiry (seconds)', this.settings.cacheExpiry);
        this.addSettingField(dataSettings, 'max-entries', 'number', 'Maximum history entries', this.settings.maxEntries);
        this.addSettingField(dataSettings, 'include-emotions', 'checkbox', 'Include emotion analysis', this.settings.includeEmotions);
        this.addSettingField(dataSettings, 'aggregate-data', 'checkbox', 'Aggregate data from sources', this.settings.aggregateData);
        
        const authSettings = this.createSettingsGroup('Authentication');
        settingsForm.appendChild(authSettings);
        
        // Add auth buttons for sources that require auth
        this.contentSources.forEach(source => {
            if (source.requiresAuth) {
                const authContainer = document.createElement('div');
                authContainer.className = 'auth-container';
                
                const authLabel = document.createElement('div');
                authLabel.className = 'auth-label';
                authLabel.textContent = `${source.name} Authentication`;
                authContainer.appendChild(authLabel);
                
                const authStatus = document.createElement('div');
                authStatus.className = 'auth-status';
                authStatus.textContent = this.authStatus[source.id] ? 'Authenticated' : 'Not Authenticated';
                authStatus.classList.add(this.authStatus[source.id] ? 'authenticated' : 'not-authenticated');
                authContainer.appendChild(authStatus);
                
                const authButton = document.createElement('button');
                authButton.type = 'button';
                authButton.className = 'auth-button';
                authButton.textContent = this.authStatus[source.id] ? 'Disconnect' : 'Connect';
                authButton.dataset.source = source.id;
                authContainer.appendChild(authButton);
                
                authSettings.appendChild(authContainer);
                
                // Add click handler
                authButton.addEventListener('click', async () => {
                    if (this.authStatus[source.id]) {
                        // Deauthenticate
                        const success = this.deauthenticateSource(source.id);
                        if (success) {
                            authStatus.textContent = 'Not Authenticated';
                            authStatus.classList.remove('authenticated');
                            authStatus.classList.add('not-authenticated');
                            authButton.textContent = 'Connect';
                            
                            // Update source select options
                            updateSourceSelectOptions();
                        }
                    } else {
                        // Authenticate
                        // In a real app, this would open a popup or redirect to auth flow
                        // For now, simulate successful authentication
                        const success = await this.authenticateSource(source.id, {});
                        if (success) {
                            authStatus.textContent = 'Authenticated';
                            authStatus.classList.remove('not-authenticated');
                            authStatus.classList.add('authenticated');
                            authButton.textContent = 'Disconnect';
                            
                            // Update source select options
                            updateSourceSelectOptions();
                        }
                    }
                });
            }
        });
        
        // Save settings button
        const saveSettings = document.createElement('button');
        saveSettings.type = 'button';
        saveSettings.className = 'save-settings-button';
        saveSettings.textContent = 'Save Settings';
        settingsForm.appendChild(saveSettings);
        
        // Update source select options
        const updateSourceSelectOptions = () => {
            sourceSelect.innerHTML = '';
            
            this.contentSources.forEach(source => {
                const option = document.createElement('option');
                option.value = source.id;
                option.textContent = source.name;
                
                // Select default source by default
                if (source.id === this.settings.defaultSource) {
                    option.selected = true;
                }
                
                // Disable if source requires auth but not authenticated
                if (source.requiresAuth && !this.authStatus[source.id]) {
                    option.disabled = true;
                    option.textContent += ' (Auth Required)';
                }
                
                sourceSelect.appendChild(option);
            });
        };
        
        // Update tracked terms list
        const updateTrackedTermsList = () => {
            trackedList.innerHTML = '';
            
            const terms = this.getTrackedTerms();
            
            if (terms.length === 0) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'empty-message';
                emptyMessage.textContent = 'No terms are currently being tracked. Add terms above to start tracking sentiment.';
                trackedList.appendChild(emptyMessage);
                return;
            }
            
            terms.forEach(term => {
                const termItem = document.createElement('div');
                termItem.className = 'term-item';
                termItem.dataset.id = term.id;
                
                if (!term.active) {
                    termItem.classList.add('inactive');
                }
                
                const termInfo = document.createElement('div');
                termInfo.className = 'term-info';
                
                const termText = document.createElement('div');
                termText.className = 'term-text';
                termText.textContent = term.text;
                termInfo.appendChild(termText);
                
                const termMeta = document.createElement('div');
                termMeta.className = 'term-meta';
                
                const sourcesLabel = document.createElement('span');
                sourcesLabel.className = 'sources-label';
                sourcesLabel.textContent = 'Sources: ';
                termMeta.appendChild(sourcesLabel);
                
                const sourcesList = document.createElement('span');
                sourcesList.className = 'sources-list';
                sourcesList.textContent = term.sources.join(', ');
                termMeta.appendChild(sourcesList);
                
                termInfo.appendChild(termMeta);
                termItem.appendChild(termInfo);
                
                // Get current sentiment for this term if available
                const currentResults = this.getCurrentResults(term.text);
                if (currentResults && currentResults.aggregated) {
                    const sentiment = currentResults.aggregated.sentiment;
                    
                    const sentimentIndicator = document.createElement('div');
                    sentimentIndicator.className = 'sentiment-indicator';
                    
                    const sentimentScore = document.createElement('div');
                    sentimentScore.className = 'sentiment-score';
                    sentimentScore.textContent = sentiment.score.toFixed(2);
                    sentimentScore.classList.add(this.getSentimentClass(sentiment.score));
                    sentimentIndicator.appendChild(sentimentScore);
                    
                    const sentimentLabel = document.createElement('div');
                    sentimentLabel.className = 'sentiment-label';
                    sentimentLabel.textContent = sentiment.label;
                    sentimentIndicator.appendChild(sentimentLabel);
                    
                    termItem.appendChild(sentimentIndicator);
                }
                
                const termActions = document.createElement('div');
                termActions.className = 'term-actions';
                
                const toggleButton = document.createElement('button');
                toggleButton.className = 'term-toggle';
                toggleButton.textContent = term.active ? 'Pause' : 'Resume';
                toggleButton.title = term.active ? 'Pause tracking' : 'Resume tracking';
                termActions.appendChild(toggleButton);
                
                const refreshButton = document.createElement('button');
                refreshButton.className = 'term-refresh';
                refreshButton.innerHTML = '<i class="fas fa-sync"></i>';
                refreshButton.title = 'Refresh now';
                termActions.appendChild(refreshButton);
                
                const removeButton = document.createElement('button');
                removeButton.className = 'term-remove';
                removeButton.innerHTML = '<i class="fas fa-trash"></i>';
                removeButton.title = 'Remove term';
                termActions.appendChild(removeButton);
                
                termItem.appendChild(termActions);
                
                // Add event listeners
                toggleButton.addEventListener('click', () => {
                    if (term.active) {
                        this.stopTrackingTerm(term.id);
                        toggleButton.textContent = 'Resume';
                        termItem.classList.add('inactive');
                    } else {
                        // Reactivate term
                        const index = this.trackedTerms.findIndex(t => t.id === term.id);
                        if (index !== -1) {
                            this.trackedTerms[index].active = true;
                            this.trackTerm(term.text, term.sources, term.options);
                            toggleButton.textContent = 'Pause';
                            termItem.classList.remove('inactive');
                        }
                    }
                });
                
                refreshButton.addEventListener('click', () => {
                    // Refresh this term
                    this.trackTerm(term.text, term.sources, term.options);
                    
                    // Show loading indicator
                    refreshButton.classList.add('loading');
                    setTimeout(() => {
                        refreshButton.classList.remove('loading');
                        updateTrackedTermsList();
                    }, 1000);
                });
                
                removeButton.addEventListener('click', () => {
                    if (confirm(`Are you sure you want to remove the term "${term.text}"?`)) {
                        this.removeTrackedTerm(term.id);
                        updateTrackedTermsList();
                        updateResultsOptions();
                        updateHistoryOptions();
                    }
                });
                
                trackedList.appendChild(termItem);
            });
        };
        
        // Update results term select options
        const updateResultsOptions = () => {
            resultsTerm.innerHTML = '<option value="">Select a term</option>';
            
            const terms = this.getTrackedTerms();
            
            terms.forEach(term => {
                const option = document.createElement('option');
                option.value = term.text;
                option.textContent = term.text;
                resultsTerm.appendChild(option);
            });
        };
        
        // Update history term select options
        const updateHistoryOptions = () => {
            historyTerm.innerHTML = '<option value="">All terms</option>';
            
            const terms = this.getTrackedTerms();
            
            terms.forEach(term => {
                const option = document.createElement('option');
                option.value = term.text;
                option.textContent = term.text;
                historyTerm.appendChild(option);
            });
        };
        
        // Display results for selected term
        const displayResults = (term) => {
            resultsDisplay.innerHTML = '';
            
            if (!term) {
                const selectMessage = document.createElement('div');
                selectMessage.className = 'select-message';
                selectMessage.textContent = 'Please select a term to view results';
                resultsDisplay.appendChild(selectMessage);
                return;
            }
            
            const results = this.getCurrentResults(term);
            
            if (!results || !results.aggregated) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = `No results available for "${term}"`;
                resultsDisplay.appendChild(noResults);
                return;
            }
            
            // Create results container
            const resultsContainer = document.createElement('div');
            resultsContainer.className = 'results-container';
            
            // Create summary section
            const summarySection = document.createElement('div');
            summarySection.className = 'results-summary';
            
            const termTitle = document.createElement('h4');
            termTitle.className = 'results-term-title';
            termTitle.textContent = term;
            summarySection.appendChild(termTitle);
            
            const updateTime = document.createElement('div');
            updateTime.className = 'update-time';
            updateTime.textContent = `Last updated: ${new Date(results.timestamp).toLocaleString()}`;
            summarySection.appendChild(updateTime);
            
            // Add overall sentiment
            const overallSentiment = document.createElement('div');
            overallSentiment.className = 'overall-sentiment';
            
            const sentimentValue = results.aggregated.sentiment.score;
            const sentimentClass = this.getSentimentClass(sentimentValue);
            
            const sentimentTitle = document.createElement('div');
            sentimentTitle.className = 'sentiment-title';
            sentimentTitle.textContent = 'Overall Sentiment';
            overallSentiment.appendChild(sentimentTitle);
            
            const sentimentDisplay = document.createElement('div');
            sentimentDisplay.className = `sentiment-display ${sentimentClass}`;
            
            const scoreDisplay = document.createElement('div');
            scoreDisplay.className = 'score-display';
            scoreDisplay.textContent = sentimentValue.toFixed(2);
            sentimentDisplay.appendChild(scoreDisplay);
            
            const labelDisplay = document.createElement('div');
            labelDisplay.className = 'label-display';
            labelDisplay.textContent = results.aggregated.sentiment.label;
            sentimentDisplay.appendChild(labelDisplay);
            
            overallSentiment.appendChild(sentimentDisplay);
            summarySection.appendChild(overallSentiment);
            
            // Add emotions if available
            if (results.aggregated.emotions) {
                const emotionsSection = document.createElement('div');
                emotionsSection.className = 'emotions-section';
                
                const emotionsTitle = document.createElement('div');
                emotionsTitle.className = 'emotions-title';
                emotionsTitle.textContent = 'Detected Emotions';
                emotionsSection.appendChild(emotionsTitle);
                
                const emotionsList = document.createElement('div');
                emotionsList.className = 'emotions-list';
                
                // Sort emotions by score
                const sortedEmotions = Object.entries(results.aggregated.emotions)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5); // Top 5 emotions
                
                sortedEmotions.forEach(([emotion, score]) => {
                    const emotionItem = document.createElement('div');
                    emotionItem.className = 'emotion-item';
                    
                    const emotionName = document.createElement('div');
                    emotionName.className = 'emotion-name';
                    emotionName.textContent = emotion;
                    emotionItem.appendChild(emotionName);
                    
                    const emotionScore = document.createElement('div');
                    emotionScore.className = 'emotion-score';
                    emotionScore.textContent = score.toFixed(2);
                    emotionItem.appendChild(emotionScore);
                    
                    const emotionBar = document.createElement('div');
                    emotionBar.className = 'emotion-bar';
                    
                    const emotionFill = document.createElement('div');
                    emotionFill.className = 'emotion-fill';
                    emotionFill.style.width = `${Math.min(score * 100, 100)}%`;
                    emotionBar.appendChild(emotionFill);
                    
                    emotionItem.appendChild(emotionBar);
                    
                    emotionsList.appendChild(emotionItem);
                });
                
                emotionsSection.appendChild(emotionsList);
                summarySection.appendChild(emotionsSection);
            }
            
            resultsContainer.appendChild(summarySection);
            
            // Create source breakdown section
            const sourcesSection = document.createElement('div');
            sourcesSection.className = 'sources-section';
            
            const sourcesTitle = document.createElement('h4');
            sourcesTitle.className = 'sources-title';
            sourcesTitle.textContent = 'Source Breakdown';
            sourcesSection.appendChild(sourcesTitle);
            
            // Create table for source data
            const sourcesTable = document.createElement('table');
            sourcesTable.className = 'sources-table';
            
            const tableHeader = document.createElement('thead');
            tableHeader.innerHTML = `
                <tr>
                    <th>Source</th>
                    <th>Sentiment</th>
                    <th>Content Count</th>
                </tr>
            `;
            sourcesTable.appendChild(tableHeader);
            
            const tableBody = document.createElement('tbody');
            
            for (const [sourceId, sourceResult] of Object.entries(results.sources)) {
                if (!sourceResult || !sourceResult.sentiment) continue;
                
                const row = document.createElement('tr');
                
                const sourceCell = document.createElement('td');
                sourceCell.textContent = this.contentSources.find(s => s.id === sourceId)?.name || sourceId;
                row.appendChild(sourceCell);
                
                const sentimentCell = document.createElement('td');
                const sentimentClass = this.getSentimentClass(sourceResult.sentiment.score);
                sentimentCell.innerHTML = `<span class="source-sentiment ${sentimentClass}">${sourceResult.sentiment.score.toFixed(2)}</span>`;
                row.appendChild(sentimentCell);
                
                const countCell = document.createElement('td');
                countCell.textContent = sourceResult.metadata?.contentCount || 'N/A';
                row.appendChild(countCell);
                
                tableBody.appendChild(row);
            }
            
            sourcesTable.appendChild(tableBody);
            sourcesSection.appendChild(sourcesTable);
            
            resultsContainer.appendChild(sourcesSection);
            
            // Add to display
            resultsDisplay.appendChild(resultsContainer);
        };
        
        // Display historical data
        const displayHistoricalData = (term, timeframe) => {
            historyDisplay.innerHTML = '';
            
            // Parse timeframe
            let startDate = null;
            if (timeframe !== 'all') {
                startDate = new Date();
                const days = parseInt(timeframe.replace('d', ''), 10);
                startDate.setDate(startDate.getDate() - days);
            }
            
            // Get historical data
            const historyData = this.getHistoricalData(term, {
                startDate,
                sortOrder: 'asc'
            });
            
            if (historyData.length === 0) {
                const noData = document.createElement('div');
                noData.className = 'no-data';
                noData.textContent = term ? 
                    `No historical data available for "${term}"` :
                    'No historical data available';
                historyDisplay.appendChild(noData);
                return;
            }
            
            // Create chart container
            const chartContainer = document.createElement('div');
            chartContainer.className = 'chart-container';
            historyDisplay.appendChild(chartContainer);
            
            // Normally we would use a charting library like Chart.js here
            // For simplicity, we'll just render a basic representation
            
            const chartTitle = document.createElement('h4');
            chartTitle.className = 'chart-title';
            chartTitle.textContent = term ? 
                `Sentiment Trend for "${term}"` :
                'Sentiment Trend for All Terms';
            chartContainer.appendChild(chartTitle);
            
            // Create a simple line chart visualization
            const chartViz = document.createElement('div');
            chartViz.className = 'chart-viz';
            
            // Group data by day for the timeline
            const dataByDay = new Map();
            historyData.forEach(item => {
                const date = new Date(item.timestamp);
                const day = date.toISOString().split('T')[0];
                
                if (!dataByDay.has(day)) {
                    dataByDay.set(day, []);
                }
                
                dataByDay.get(day).push(item);
            });
            
            // Calculate daily averages
            const dailyAverages = Array.from(dataByDay.entries()).map(([day, items]) => {
                const total = items.reduce((sum, item) => sum + (item.sentiment || 0), 0);
                const avg = items.length > 0 ? total / items.length : 0;
                return { date: day, value: avg };
            });
            
            // Create the points for the chart
            const chartLine = document.createElement('div');
            chartLine.className = 'chart-line';
            
            // Find min and max for scaling
            const values = dailyAverages.map(d => d.value);
            const min = Math.min(...values, -1);
            const max = Math.max(...values, 1);
            const range = Math.max(Math.abs(min), Math.abs(max));
            
            // Create a point for each day
            dailyAverages.forEach((point, index) => {
                const pointEl = document.createElement('div');
                pointEl.className = 'chart-point';
                pointEl.dataset.date = point.date;
                pointEl.dataset.value = point.value.toFixed(2);
                
                // Position vertically based on sentiment value
                const normalized = 0.5 - (point.value / (range * 2));
                pointEl.style.top = `${normalized * 100}%`;
                
                // Position horizontally based on index
                pointEl.style.left = `${(index / (dailyAverages.length - 1)) * 100}%`;
                
                // Set color based on sentiment
                const sentimentClass = this.getSentimentClass(point.value);
                pointEl.classList.add(sentimentClass);
                
                chartLine.appendChild(pointEl);
                
                // Add tooltip
                pointEl.title = `${point.date}: ${point.value.toFixed(2)}`;
                
                // Add line to next point if not the last one
                if (index < dailyAverages.length - 1) {
                    const nextPoint = dailyAverages[index + 1];
                    const nextNormalized = 0.5 - (nextPoint.value / (range * 2));
                    
                    const line = document.createElement('div');
                    line.className = 'chart-line-segment';
                    
                    // Set line position
                    const x1 = (index / (dailyAverages.length - 1)) * 100;
                    const y1 = normalized * 100;
                    const x2 = ((index + 1) / (dailyAverages.length - 1)) * 100;
                    const y2 = nextNormalized * 100;
                    
                    // Calculate length and angle
                    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
                    
                    line.style.width = `${length}%`;
                    line.style.transform = `rotate(${angle}deg)`;
                    line.style.left = `${x1}%`;
                    line.style.top = `${y1}%`;
                    
                    chartLine.appendChild(line);
                }
            });
            
            // Add center line
            const centerLine = document.createElement('div');
            centerLine.className = 'chart-center-line';
            chartLine.appendChild(centerLine);
            
            chartViz.appendChild(chartLine);
            chartContainer.appendChild(chartViz);
            
            // Add timeframe label
            const timeframeLabel = document.createElement('div');
            timeframeLabel.className = 'timeframe-label';
            
            if (dailyAverages.length > 0) {
                const startDate = new Date(dailyAverages[0].date);
                const endDate = new Date(dailyAverages[dailyAverages.length - 1].date);
                
                timeframeLabel.textContent = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            } else {
                timeframeLabel.textContent = 'No data available for the selected timeframe';
            }
            
            chartContainer.appendChild(timeframeLabel);
            
            // Add table view of data
            const tableContainer = document.createElement('div');
            tableContainer.className = 'history-table-container';
            historyDisplay.appendChild(tableContainer);
            
            const tableTitle = document.createElement('h4');
            tableTitle.className = 'table-title';
            tableTitle.textContent = 'Historical Data';
            tableContainer.appendChild(tableTitle);
            
            const historyTable = document.createElement('table');
            historyTable.className = 'history-table';
            
            const historyHeader = document.createElement('thead');
            historyHeader.innerHTML = `
                <tr>
                    <th>Date</th>
                    <th>Term</th>
                    <th>Sentiment</th>
                    ${this.settings.includeEmotions ? '<th>Top Emotions</th>' : ''}
                </tr>
            `;
            historyTable.appendChild(historyHeader);
            
            const historyBody = document.createElement('tbody');
            
            // Show most recent entries first in the table
            historyData.slice().reverse().forEach(item => {
                const row = document.createElement('tr');
                
                const dateCell = document.createElement('td');
                dateCell.textContent = new Date(item.timestamp).toLocaleString();
                row.appendChild(dateCell);
                
                const termCell = document.createElement('td');
                termCell.textContent = item.term;
                row.appendChild(termCell);
                
                const sentimentCell = document.createElement('td');
                if (item.sentiment !== null) {
                    const sentimentClass = this.getSentimentClass(item.sentiment);
                    sentimentCell.innerHTML = `<span class="history-sentiment ${sentimentClass}">${item.sentiment.toFixed(2)}</span>`;
                } else {
                    sentimentCell.textContent = 'N/A';
                }
                row.appendChild(sentimentCell);
                
                if (this.settings.includeEmotions) {
                    const emotionsCell = document.createElement('td');
                    
                    if (item.emotions) {
                        const topEmotions = Object.entries(item.emotions)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 3)
                            .map(([emotion, score]) => `${emotion} (${score.toFixed(2)})`)
                            .join(', ');
                            
                        emotionsCell.textContent = topEmotions || 'None';
                    } else {
                        emotionsCell.textContent = 'N/A';
                    }
                    
                    row.appendChild(emotionsCell);
                }
                
                historyBody.appendChild(row);
            });
            
            historyTable.appendChild(historyBody);
            tableContainer.appendChild(historyTable);
        };
        
        // Add event listeners
        
        // Add track button handler
        trackButton.addEventListener('click', async () => {
            const term = termInput.value.trim();
            if (!term) {
                alert('Please enter a term to track');
                return;
            }
            
            // Get selected sources
            const selectedSources = Array.from(sourceSelect.selectedOptions).map(opt => opt.value);
            if (selectedSources.length === 0) {
                alert('Please select at least one source');
                return;
            }
            
            // Show loading state
            trackButton.textContent = 'Tracking...';
            trackButton.disabled = true;
            
            try {
                // Track term
                await this.trackTerm(term, selectedSources);
                
                // Reset form
                termInput.value = '';
                
                // Update tracked terms list
                updateTrackedTermsList();
                
                // Update result options
                updateResultsOptions();
                
                // Update history options
                updateHistoryOptions();
                
                // Switch to tracked tab
                trackedTab.click();
            } catch (error) {
                console.error('Error tracking term:', error);
                alert(`Error tracking term: ${error.message}`);
            } finally {
                // Reset button
                trackButton.textContent = 'Track Sentiment';
                trackButton.disabled = false;
            }
        });
        
        // Tab switching
        tabsContainer.querySelectorAll('.tab-button').forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                tabsContainer.querySelectorAll('.tab-button').forEach(t => {
                    t.classList.remove('active');
                });
                tab.classList.add('active');
                
                // Show corresponding content
                const tabId = tab.dataset.tab;
                tabContents.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = content.dataset.tab === tabId ? 'block' : 'none';
                });
                
                // Refresh content if needed
                if (tabId === 'tracked') {
                    updateTrackedTermsList();
                } else if (tabId === 'results') {
                    displayResults(resultsTerm.value);
                } else if (tabId === 'history') {
                    displayHistoricalData(historyTerm.value, timeframeSelect.value);
                }
            });
        });
        
        // Results term select change
        resultsTerm.addEventListener('change', () => {
            displayResults(resultsTerm.value);
        });
        
        // History term select change
        historyTerm.addEventListener('change', () => {
            displayHistoricalData(historyTerm.value, timeframeSelect.value);
        });
        
        // Timeframe select change
        timeframeSelect.addEventListener('change', () => {
            displayHistoricalData(historyTerm.value, timeframeSelect.value);
        });
        
        // Save settings button
        saveSettings.addEventListener('click', () => {
            // Gather settings from form
            const newSettings = {
                autoRefresh: document.getElementById('auto-refresh').checked,
                refreshInterval: parseInt(document.getElementById('refresh-interval').value, 10),
                enableAlerts: document.getElementById('enable-alerts').checked,
                alertThreshold: parseFloat(document.getElementById('alert-threshold').value),
                cacheResults: document.getElementById('cache-results').checked,
                cacheExpiry: parseInt(document.getElementById('cache-expiry').value, 10),
                maxEntries: parseInt(document.getElementById('max-entries').value, 10),
                includeEmotions: document.getElementById('include-emotions').checked,
                aggregateData: document.getElementById('aggregate-data').checked
            };
            
            // Update settings
            this.updateSettings(newSettings);
            
            // Show confirmation
            const confirmMessage = document.createElement('div');
            confirmMessage.className = 'confirm-message';
            confirmMessage.textContent = 'Settings saved successfully';
            settingsForm.appendChild(confirmMessage);
            
            // Remove confirmation after delay
            setTimeout(() => {
                confirmMessage.remove();
            }, 3000);
        });
        
        // Initialize UI
        updateTrackedTermsList();
        updateResultsOptions();
        updateHistoryOptions();
        
        // Register event handler for result updates
        this.on('resultUpdated', () => {
            // Update current tab content
            const activeTab = tabsContainer.querySelector('.tab-button.active').dataset.tab;
            
            if (activeTab === 'tracked') {
                updateTrackedTermsList();
            } else if (activeTab === 'results' && resultsTerm.value) {
                displayResults(resultsTerm.value);
            } else if (activeTab === 'history') {
                displayHistoricalData(historyTerm.value, timeframeSelect.value);
            }
        });
        
        // Add styles
        this.addStyles();
        
        return uiContainer;
    }

    /**
     * Create a settings group
     * @param {string} title - Group title
     * @returns {HTMLElement} Settings group
     */
    createSettingsGroup(title) {
        const group = document.createElement('div');
        group.className = 'settings-group';
        
        const groupTitle = document.createElement('h4');
        groupTitle.className = 'settings-group-title';
        groupTitle.textContent = title;
        group.appendChild(groupTitle);
        
        return group;
    }

    /**
     * Add a setting field to a group
     * @param {HTMLElement} group - Settings group
     * @param {string} id - Field ID
     * @param {string} type - Field type
     * @param {string} label - Field label
     * @param {*} value - Field value
     * @param {Object} attrs - Additional attributes
     * @returns {HTMLElement} Field element
     */
    addSettingField(group, id, type, label, value, attrs = {}) {
        const field = document.createElement('div');
        field.className = 'settings-field';
        
        const fieldLabel = document.createElement('label');
        fieldLabel.htmlFor = id;
        fieldLabel.textContent = label;
        field.appendChild(fieldLabel);
        
        let input;
        
        if (type === 'checkbox') {
            input = document.createElement('input');
            input.type = 'checkbox';
            input.id = id;
            input.checked = value;
        } else if (type === 'select') {
            input = document.createElement('select');
            input.id = id;
            
            if (attrs.options) {
                attrs.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option.value;
                    opt.textContent = option.label;
                    
                    if (option.value === value) {
                        opt.selected = true;
                    }
                    
                    input.appendChild(opt);
                });
            }
        } else {
            input = document.createElement('input');
            input.type = type;
            input.id = id;
            input.value = value;
            
            // Add attributes
            for (const [key, val] of Object.entries(attrs)) {
                input.setAttribute(key, val);
            }
        }
        
        field.appendChild(input);
        
        // Add help text if provided
        if (attrs.help) {
            const helpText = document.createElement('div');
            helpText.className = 'help-text';
            helpText.textContent = attrs.help;
            field.appendChild(helpText);
        }
        
        group.appendChild(field);
        return field;
    }

    /**
     * Get CSS class for sentiment score
     * @param {number} score - Sentiment score
     * @returns {string} CSS class
     */
    getSentimentClass(score) {
        if (score >= 0.7) return 'very-positive';
        if (score >= 0.3) return 'positive';
        if (score > -0.3) return 'neutral';
        if (score > -0.7) return 'negative';
        return 'very-negative';
    }

    /**
     * Add CSS styles
     */
    addStyles() {
        const styleId = 'sentiment-tracker-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .sentiment-tracker-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                width: 100%;
                max-width: 100%;
            }
            
            .sentiment-tracker-header {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .sentiment-tracker-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .add-term-form {
                display: flex;
                gap: 0.75rem;
                margin-bottom: 1.5rem;
                background-color: var(--bg-primary, #0d1117);
                padding: 1rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
            }
            
            .term-input {
                flex: 2;
                padding: 0.625rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .source-select {
                flex: 1;
                padding: 0.625rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .track-button {
                padding: 0.625rem 1.25rem;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
                white-space: nowrap;
            }
            
            .track-button:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .track-button:disabled {
                background-color: var(--accent-primary, #7c3aed);
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            .tabs-container {
                display: flex;
                border-bottom: 1px solid var(--border-color, #30363d);
                margin-bottom: 1rem;
                gap: 0.25rem;
            }
            
            .tab-button {
                padding: 0.625rem 1.25rem;
                background-color: transparent;
                border: none;
                border-bottom: 2px solid transparent;
                color: var(--text-secondary, #8b949e);
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .tab-button:hover {
                color: var(--text-primary, #f0f6fc);
                border-bottom-color: var(--border-color, #30363d);
            }
            
            .tab-button.active {
                color: var(--accent-primary, #7c3aed);
                border-bottom-color: var(--accent-primary, #7c3aed);
                font-weight: 500;
            }
            
            .tab-content {
                min-height: 200px;
            }
            
            .tracked-terms-list {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .term-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                transition: all 0.2s;
            }
            
            .term-item:hover {
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .term-item.inactive {
                opacity: 0.7;
                border-style: dashed;
            }
            
            .term-info {
                flex: 1;
            }
            
            .term-text {
                font-weight: 500;
                margin-bottom: 0.25rem;
            }
            
            .term-meta {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .sentiment-indicator {
                margin: 0 1rem;
                text-align: center;
            }
            
            .sentiment-score {
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 0.25rem;
            }
            
            .sentiment-label {
                font-size: 0.75rem;
            }
            
            .term-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .term-toggle,
            .term-refresh,
            .term-remove {
                padding: 0.375rem 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .term-toggle:hover {
                border-color: var(--accent-secondary, #8b5cf6);
                color: var(--text-primary, #f0f6fc);
            }
            
            .term-refresh:hover {
                border-color: var(--info-color, #3b82f6);
                color: var(--info-color, #3b82f6);
            }
            
            .term-remove:hover {
                border-color: var(--error-color, #ef4444);
                color: var(--error-color, #ef4444);
            }
            
            .term-refresh.loading {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .empty-message {
                padding: 2rem;
                text-align: center;
                color: var(--text-secondary, #8b949e);
                font-style: italic;
                background-color: var(--bg-primary, #0d1117);
                border: 1px dashed var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
            }
            
            .results-term-select,
            .history-term-select,
            .timeframe-select {
                padding: 0.625rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                margin-bottom: 1rem;
                width: 100%;
                max-width: 300px;
            }
            
            .results-display,
            .history-display {
                min-height: 100px;
            }
            
            .select-message,
            .no-results,
            .no-data {
                padding: 2rem;
                text-align: center;
                color: var(--text-secondary, #8b949e);
                font-style: italic;
                background-color: var(--bg-primary, #0d1117);
                border: 1px dashed var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
            }
            
            .very-positive {
                color: #10b981;
            }
            
            .positive {
                color: #34d399;
            }
            
            .neutral {
                color: #9ca3af;
            }
            
            .negative {
                color: #f97316;
            }
            
            .very-negative {
                color: #ef4444;
            }
            
            .results-container {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .results-summary {
                padding: 1.5rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
            }
            
            .results-term-title {
                font-size: 1.125rem;
                font-weight: 600;
                margin: 0 0 0.5rem;
            }
            
            .update-time {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
                margin-bottom: 1rem;
            }
            
            .overall-sentiment {
                text-align: center;
                margin: 1.5rem 0;
            }
            
            .sentiment-title {
                font-size: 0.875rem;
                font-weight: 500;
                margin-bottom: 0.5rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .sentiment-display {
                display: inline-block;
                padding: 1rem 2rem;
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
            }
            
            .score-display {
                font-size: 2.5rem;
                font-weight: bold;
                margin-bottom: 0.25rem;
            }
            
            .label-display {
                font-size: 0.875rem;
            }
            
            .emotions-section {
                margin-top: 1.5rem;
            }
            
            .emotions-title {
                font-size: 0.875rem;
                font-weight: 500;
                margin-bottom: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .emotions-list {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .emotion-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .emotion-name {
                min-width: 100px;
                font-size: 0.875rem;
            }
            
            .emotion-score {
                min-width: 50px;
                font-size: 0.875rem;
                text-align: right;
            }
            
            .emotion-bar {
                flex: 1;
                height: 8px;
                background-color: var(--bg-secondary, #161b22);
                border-radius: 4px;
                overflow: hidden;
            }
            
            .emotion-fill {
                height: 100%;
                background-color: var(--accent-primary, #7c3aed);
                border-radius: 4px;
            }
            
            .sources-section {
                padding: 1.5rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
            }
            
            .sources-title {
                font-size: 1.125rem;
                font-weight: 600;
                margin: 0 0 1rem;
            }
            
            .sources-table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .sources-table th,
            .sources-table td {
                padding: 0.75rem;
                text-align: left;
                border-bottom: 1px solid var(--border-color, #30363d);
            }
            
            .sources-table th {
                font-weight: 500;
                color: var(--text-secondary, #8b949e);
            }
            
            .source-sentiment {
                font-weight: 600;
            }
            
            .history-controls {
                display: flex;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            
            .chart-container {
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .chart-title {
                font-size: 1.125rem;
                font-weight: 600;
                margin: 0 0 1rem;
                text-align: center;
            }
            
            .chart-viz {
                height: 300px;
                position: relative;
                margin: 0 2rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                margin-bottom: 1rem;
            }
            
            .chart-line {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
            
            .chart-center-line {
                position: absolute;
                left: 0;
                right: 0;
                top: 50%;
                height: 1px;
                background-color: var(--border-color, #30363d);
                opacity: 0.5;
            }
            
            .chart-point {
                position: absolute;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-left: -6px;
                margin-top: -6px;
                background-color: currentColor;
                z-index: 2;
            }
            
            .chart-line-segment {
                position: absolute;
                height: 2px;
                background-color: var(--accent-primary, #7c3aed);
                transform-origin: left center;
                z-index: 1;
            }
            
            .timeframe-label {
                text-align: center;
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .history-table-container {
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1.5rem;
                overflow-x: auto;
            }
            
            .table-title {
                font-size: 1.125rem;
                font-weight: 600;
                margin: 0 0 1rem;
            }
            
            .history-table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .history-table th,
            .history-table td {
                padding: 0.75rem;
                text-align: left;
                border-bottom: 1px solid var(--border-color, #30363d);
            }
            
            .history-table th {
                font-weight: 500;
                color: var(--text-secondary, #8b949e);
            }
            
            .history-sentiment {
                font-weight: 600;
            }
            
            .settings-form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .settings-group {
                padding: 1.5rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
            }
            
            .settings-group-title {
                font-size: 1.125rem;
                font-weight: 600;
                margin: 0 0 1rem;
                color: var(--accent-primary, #7c3aed);
            }
            
            .settings-field {
                margin-bottom: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .settings-field:last-child {
                margin-bottom: 0;
            }
            
            .settings-field label {
                font-size: 0.875rem;
                font-weight: 500;
            }
            
            .settings-field input[type="text"],
            .settings-field input[type="number"],
            .settings-field input[type="range"],
            .settings-field select {
                padding: 0.625rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .settings-field input[type="range"] {
                padding: 0;
            }
            
            .help-text {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
                margin-top: 0.25rem;
            }
            
            .save-settings-button {
                padding: 0.625rem 1.25rem;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
                align-self: flex-end;
                margin-top: 1rem;
            }
            
            .save-settings-button:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .confirm-message {
                padding: 0.75rem;
                background-color: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.2);
                border-radius: var(--radius-sm, 0.375rem);
                color: #10b981;
                margin-top: 1rem;
                text-align: center;
            }
            
            .auth-container {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .auth-container:last-child {
                margin-bottom: 0;
            }
            
            .auth-label {
                flex: 1;
                font-size: 0.875rem;
                font-weight: 500;
            }
            
            .auth-status {
                font-size: 0.875rem;
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius-sm, 0.375rem);
            }
            
            .auth-status.authenticated {
                background-color: rgba(16, 185, 129, 0.1);
                color: #10b981;
            }
            
            .auth-status.not-authenticated {
                background-color: rgba(239, 68, 68, 0.1);
                color: #ef4444;
            }
            
            .auth-button {
                padding: 0.375rem 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .auth-button:hover {
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            @media (max-width: 768px) {
                .add-term-form {
                    flex-direction: column;
                }
                
                .tabs-container {
                    flex-wrap: wrap;
                }
                
                .tab-button {
                    flex: 1;
                    text-align: center;
                    min-width: 120px;
                }
                
                .history-controls {
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .term-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 1rem;
                }
                
                .term-actions {
                    align-self: flex-end;
                }
                
                .auth-container {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SentimentTracker };
} else {
    // Add to global scope for browser usage
    window.SentimentTracker = SentimentTracker;
}
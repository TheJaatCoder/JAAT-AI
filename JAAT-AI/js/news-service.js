/**
 * JAAT-AI News API Integration Service
 * Handles all GNews API interactions
 */

// News API configuration
const NEWS_CONFIG = {
    apiKey: process.env.GNEWS_API_KEY,
    baseUrl: 'https://gnews.io/api/v4'
};

// News Service object
const NewsService = {
    /**
     * Search for news articles
     * @param {string} query - Search query
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} - News search results
     */
    searchNews: async function(query, options = {}) {
        try {
            const defaultOptions = {
                max: 10, // Maximum number of results
                lang: 'en', // Language
                country: 'us', // Country
                sortby: 'publishedAt' // Sort by ('relevance', 'publishedAt')
            };
            
            const requestOptions = { ...defaultOptions, ...options };
            
            const url = new URL(`${NEWS_CONFIG.baseUrl}/search`);
            url.searchParams.append('apikey', NEWS_CONFIG.apiKey);
            url.searchParams.append('q', query);
            url.searchParams.append('max', requestOptions.max);
            url.searchParams.append('lang', requestOptions.lang);
            url.searchParams.append('country', requestOptions.country);
            url.searchParams.append('sortby', requestOptions.sortby);
            
            if (options.from) {
                url.searchParams.append('from', options.from);
            }
            
            if (options.to) {
                url.searchParams.append('to', options.to);
            }
            
            const response = await fetch(url);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`News API Error: ${error.error?.message || response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('News Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Get top headlines
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} - Top headlines
     */
    getTopHeadlines: async function(options = {}) {
        try {
            const defaultOptions = {
                max: 10, // Maximum number of results
                lang: 'en', // Language
                country: 'us' // Country
            };
            
            const requestOptions = { ...defaultOptions, ...options };
            
            const url = new URL(`${NEWS_CONFIG.baseUrl}/top-headlines`);
            url.searchParams.append('apikey', NEWS_CONFIG.apiKey);
            url.searchParams.append('max', requestOptions.max);
            url.searchParams.append('lang', requestOptions.lang);
            url.searchParams.append('country', requestOptions.country);
            
            if (options.category) {
                url.searchParams.append('category', options.category);
            }
            
            if (options.source) {
                url.searchParams.append('source', options.source);
            }
            
            const response = await fetch(url);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`News API Error: ${error.error?.message || response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('News Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Get headlines by category
     * @param {string} category - News category
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} - Category headlines
     */
    getHeadlinesByCategory: async function(category, options = {}) {
        try {
            return await this.getTopHeadlines({
                ...options,
                category
            });
        } catch (error) {
            console.error('News Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Format news articles for display
     * @param {Object} newsData - News data from API
     * @returns {Array} - Formatted news articles
     */
    formatNewsArticles: function(newsData) {
        if (!newsData || !newsData.articles || !newsData.articles.length) {
            return [];
        }
        
        return newsData.articles.map(article => ({
            title: article.title,
            description: article.description,
            content: article.content,
            url: article.url,
            image: article.image,
            publishedAt: article.publishedAt,
            source: {
                name: article.source.name,
                url: article.source.url
            }
        }));
    },
    
    /**
     * Format article date for display
     * @param {string} dateString - ISO date string
     * @returns {string} - Formatted date
     */
    formatArticleDate: function(dateString) {
        const date = new Date(dateString);
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return '';
        }
        
        // Format as readable date
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        return date.toLocaleDateString(undefined, options);
    }
};

// Export the News Service
window.NewsService = NewsService;
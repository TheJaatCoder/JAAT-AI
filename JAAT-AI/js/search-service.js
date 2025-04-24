/**
 * JAAT-AI Google Search API Integration Service
 * Handles all Google Custom Search API interactions
 */

// Google Search API configuration
const SEARCH_CONFIG = {
    apiKey: process.env.GOOGLE_SEARCH_API_KEY,
    cx: '017576662512468239146:omuauf_lfve' // This is a sample search engine ID, replace with your own
};

// Search Service object
const SearchService = {
    /**
     * Perform a web search
     * @param {string} query - Search query
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} - Search results
     */
    search: async function(query, options = {}) {
        try {
            const defaultOptions = {
                num: 10, // Number of results (1-10)
                start: 1, // Start index
                safe: 'active' // SafeSearch setting ('active', 'off')
            };
            
            const requestOptions = { ...defaultOptions, ...options };
            
            const url = new URL('https://www.googleapis.com/customsearch/v1');
            url.searchParams.append('key', SEARCH_CONFIG.apiKey);
            url.searchParams.append('cx', SEARCH_CONFIG.cx);
            url.searchParams.append('q', query);
            url.searchParams.append('num', requestOptions.num);
            url.searchParams.append('start', requestOptions.start);
            url.searchParams.append('safe', requestOptions.safe);
            
            if (options.searchType) {
                url.searchParams.append('searchType', options.searchType);
            }
            
            if (options.fileType) {
                url.searchParams.append('fileType', options.fileType);
            }
            
            if (options.siteSearch) {
                url.searchParams.append('siteSearch', options.siteSearch);
            }
            
            const response = await fetch(url);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Google Search API Error: ${error.error?.message || response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Search Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Perform an image search
     * @param {string} query - Search query
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} - Image search results
     */
    imageSearch: async function(query, options = {}) {
        try {
            const searchOptions = {
                ...options,
                searchType: 'image'
            };
            
            return await this.search(query, searchOptions);
        } catch (error) {
            console.error('Image Search Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Format search results into a simplified structure
     * @param {Object} searchData - Search results from API
     * @returns {Array} - Formatted search results
     */
    formatSearchResults: function(searchData) {
        if (!searchData || !searchData.items || !searchData.items.length) {
            return [];
        }
        
        return searchData.items.map(item => ({
            title: item.title,
            link: item.link,
            displayLink: item.displayLink,
            snippet: item.snippet,
            formattedUrl: item.formattedUrl,
            htmlSnippet: item.htmlSnippet,
            pagemap: item.pagemap
        }));
    },
    
    /**
     * Format image search results into a simplified structure
     * @param {Object} searchData - Image search results from API
     * @returns {Array} - Formatted image search results
     */
    formatImageResults: function(searchData) {
        if (!searchData || !searchData.items || !searchData.items.length) {
            return [];
        }
        
        return searchData.items.map(item => ({
            title: item.title,
            link: item.link,
            displayLink: item.displayLink,
            snippet: item.snippet,
            mime: item.mime,
            fileFormat: item.fileFormat,
            image: {
                contextLink: item.image?.contextLink,
                height: item.image?.height,
                width: item.image?.width,
                byteSize: item.image?.byteSize,
                thumbnailLink: item.image?.thumbnailLink,
                thumbnailHeight: item.image?.thumbnailHeight,
                thumbnailWidth: item.image?.thumbnailWidth
            }
        }));
    }
};

// Export the Search Service
window.SearchService = SearchService;
/**
 * JAAT-AI CoinMarketCap API Integration Service
 * Handles all cryptocurrency data API interactions
 */

// CoinMarketCap API configuration
const CRYPTO_CONFIG = {
    apiKey: process.env.COINMARKETCAP_API_KEY,
    baseUrl: 'https://pro-api.coinmarketcap.com/v1'
};

// Crypto Service object
const CryptoService = {
    /**
     * Get latest cryptocurrency listings
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} - Cryptocurrency listings
     */
    getLatestListings: async function(options = {}) {
        try {
            const defaultOptions = {
                limit: 100, // Number of results
                sort: 'market_cap', // Sort by ('market_cap', 'volume_24h', 'percent_change_24h', etc.)
                sort_dir: 'desc', // Sort direction ('asc', 'desc')
                cryptocurrency_type: 'all', // Type ('all', 'coins', 'tokens')
                convert: 'USD' // Currency to convert to
            };
            
            const requestOptions = { ...defaultOptions, ...options };
            
            const url = new URL(`${CRYPTO_CONFIG.baseUrl}/cryptocurrency/listings/latest`);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-CMC_PRO_API_KEY': CRYPTO_CONFIG.apiKey,
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`CoinMarketCap API Error: ${error.status?.error_message || response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Crypto Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Get cryptocurrency price quotes
     * @param {Array|string} symbols - Cryptocurrency symbols or IDs
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} - Cryptocurrency quotes
     */
    getQuotes: async function(symbols, options = {}) {
        try {
            const defaultOptions = {
                convert: 'USD' // Currency to convert to
            };
            
            const requestOptions = { ...defaultOptions, ...options };
            
            // Convert array to comma-separated string
            const symbolsParam = Array.isArray(symbols) ? symbols.join(',') : symbols;
            
            const url = new URL(`${CRYPTO_CONFIG.baseUrl}/cryptocurrency/quotes/latest`);
            
            const isNumeric = !isNaN(symbolsParam.split(',')[0]);
            const paramName = isNumeric ? 'id' : 'symbol';
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-CMC_PRO_API_KEY': CRYPTO_CONFIG.apiKey,
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`CoinMarketCap API Error: ${error.status?.error_message || response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Crypto Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Get cryptocurrency metadata
     * @param {Array|string} symbols - Cryptocurrency symbols or IDs
     * @returns {Promise<Object>} - Cryptocurrency metadata
     */
    getMetadata: async function(symbols) {
        try {
            // Convert array to comma-separated string
            const symbolsParam = Array.isArray(symbols) ? symbols.join(',') : symbols;
            
            const url = new URL(`${CRYPTO_CONFIG.baseUrl}/cryptocurrency/info`);
            
            const isNumeric = !isNaN(symbolsParam.split(',')[0]);
            const paramName = isNumeric ? 'id' : 'symbol';
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-CMC_PRO_API_KEY': CRYPTO_CONFIG.apiKey,
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`CoinMarketCap API Error: ${error.status?.error_message || response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Crypto Service Error:', error);
            throw error;
        }
    },
    
    /**
     * Format cryptocurrency listings for display
     * @param {Object} listingsData - Listings data from API
     * @returns {Array} - Formatted cryptocurrency listings
     */
    formatListings: function(listingsData) {
        if (!listingsData || !listingsData.data || !listingsData.data.length) {
            return [];
        }
        
        return listingsData.data.map(crypto => {
            const quote = crypto.quote.USD || {};
            
            return {
                id: crypto.id,
                name: crypto.name,
                symbol: crypto.symbol,
                slug: crypto.slug,
                rank: crypto.cmc_rank,
                price: quote.price,
                marketCap: quote.market_cap,
                volume24h: quote.volume_24h,
                percentChange1h: quote.percent_change_1h,
                percentChange24h: quote.percent_change_24h,
                percentChange7d: quote.percent_change_7d,
                lastUpdated: quote.last_updated
            };
        });
    },
    
    /**
     * Format price with appropriate precision
     * @param {number} price - Price to format
     * @param {string} currency - Currency code
     * @returns {string} - Formatted price
     */
    formatPrice: function(price, currency = 'USD') {
        if (typeof price !== 'number') {
            return '';
        }
        
        // Determine appropriate precision based on price
        let precision = 2;
        
        if (price < 0.01) {
            precision = 6;
        } else if (price < 1) {
            precision = 4;
        }
        
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: precision,
            maximumFractionDigits: precision
        }).format(price);
    },
    
    /**
     * Format change percentage
     * @param {number} percent - Percentage to format
     * @returns {Object} - Formatted percentage with CSS class
     */
    formatChangePercent: function(percent) {
        if (typeof percent !== 'number') {
            return { text: '0.00%', class: '' };
        }
        
        const formatted = percent.toFixed(2) + '%';
        const cssClass = percent > 0 ? 'positive' : percent < 0 ? 'negative' : '';
        
        return {
            text: (percent > 0 ? '+' : '') + formatted,
            class: cssClass
        };
    }
};

// Export the Crypto Service
window.CryptoService = CryptoService;
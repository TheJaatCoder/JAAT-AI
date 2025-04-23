/**
 * JAAT-AI API Service
 * Securely manages API requests to various services
 * 
 * Created by: Rohit Sangwan
 * Contact: Infosec.rohit77@gmail.com
 */

class ApiService {
    constructor() {
        this.initialized = false;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
        this.apiEndpoints = {
            openai: '/api/proxy/openai',
            anthropic: '/api/proxy/anthropic',
            gemini: '/api/proxy/gemini',
            news: '/api/proxy/news',
            search: '/api/proxy/search',
            weather: '/api/proxy/weather',
            crypto: '/api/proxy/crypto'
        };
        
        // Initialize service
        this.init();
        
        console.log('JAAT-AI API Service initialized');
    }
    
    /**
     * Initialize API service
     */
    async init() {
        try {
            // In a production environment, this would check which APIs are available
            // and validate authentication status
            
            this.initialized = true;
            console.log('API Service initialized successfully');
            
            // Dispatch initialization event
            this.dispatchEvent('initialized');
            
            return true;
        } catch (error) {
            console.error('Failed to initialize API Service:', error);
            return false;
        }
    }
    
    /**
     * Make a request to OpenAI API
     * @param {string} endpoint - API endpoint (e.g., '/chat/completions')
     * @param {Object} data - Request data
     * @returns {Promise<Object>} API response
     */
    async openai(endpoint, data) {
        return this.apiRequest('openai', endpoint, data);
    }
    
    /**
     * Make a request to Anthropic API
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request data
     * @returns {Promise<Object>} API response
     */
    async anthropic(endpoint, data) {
        return this.apiRequest('anthropic', endpoint, data);
    }
    
    /**
     * Make a request to Google Gemini API
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request data
     * @returns {Promise<Object>} API response
     */
    async gemini(endpoint, data) {
        return this.apiRequest('gemini', endpoint, data);
    }
    
    /**
     * Get news from the news API
     * @param {Object} params - Request parameters
     * @returns {Promise<Object>} API response
     */
    async getNews(params) {
        return this.apiRequest('news', '', params);
    }
    
    /**
     * Perform a web search
     * @param {Object} params - Search parameters
     * @returns {Promise<Object>} Search results
     */
    async search(params) {
        return this.apiRequest('search', '', params);
    }
    
    /**
     * Get weather information
     * @param {Object} params - Weather parameters
     * @returns {Promise<Object>} Weather data
     */
    async getWeather(params) {
        return this.apiRequest('weather', '', params);
    }
    
    /**
     * Get cryptocurrency information
     * @param {Object} params - Crypto parameters
     * @returns {Promise<Object>} Crypto data
     */
    async getCrypto(params) {
        return this.apiRequest('crypto', '', params);
    }
    
    /**
     * Make a generic API request
     * @param {string} service - Service name (openai, anthropic, etc.)
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request data
     * @returns {Promise<Object>} API response
     */
    async apiRequest(service, endpoint, data) {
        if (!this.initialized) {
            await this.init();
        }
        
        // Check if service is configured
        const envConfig = window.JAAT_ENV?.config;
        if (envConfig && !envConfig.isServiceConfigured(service)) {
            throw new Error(`Service not configured: ${service}`);
        }
        
        try {
            // Construct the API URL
            const baseUrl = this.apiEndpoints[service];
            if (!baseUrl) {
                throw new Error(`Unknown service: ${service}`);
            }
            
            const url = endpoint ? `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}` : baseUrl;
            
            // In a production environment, this would make a server-side API request
            // to keep API keys secure. For demo, we'll mock the responses.
            
            // Check for subscription limits
            const subscriptionManager = window.JAAT?.features?.['subscription-manager'];
            if (subscriptionManager && service === 'openai') {
                // Record usage and check limits
                if (!subscriptionManager.recordUsage('messagesPerDay', 1)) {
                    throw new Error('Daily message limit reached. Please upgrade your subscription.');
                }
            }
            
            // Mock a delay to simulate API request
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Generate mock response
            const response = this.mockResponse(service, endpoint, data);
            
            // Dispatch success event
            this.dispatchEvent('apiSuccess', {
                service,
                endpoint,
                response
            });
            
            return response;
        } catch (error) {
            console.error(`API request failed (${service}${endpoint}):`, error);
            
            // Dispatch error event
            this.dispatchEvent('apiError', {
                service,
                endpoint,
                error: error.message
            });
            
            throw error;
        }
    }
    
    /**
     * Generate a mock response for demonstration purposes
     * @param {string} service - Service name
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request data
     * @returns {Object} Mock response
     */
    mockResponse(service, endpoint, data) {
        // In a real implementation, this would be replaced with actual API calls
        
        switch (service) {
            case 'openai':
                if (endpoint.includes('chat/completions')) {
                    return {
                        id: 'mock-completion-' + Math.random().toString(36).substr(2, 9),
                        object: 'chat.completion',
                        created: Date.now(),
                        model: data.model || 'gpt-4o',
                        choices: [
                            {
                                index: 0,
                                message: {
                                    role: 'assistant',
                                    content: this.generateMockContent(data)
                                },
                                finish_reason: 'stop'
                            }
                        ],
                        usage: {
                            prompt_tokens: data.messages?.reduce((acc, msg) => acc + (msg.content?.length || 0), 0) || 0,
                            completion_tokens: 150,
                            total_tokens: 150 + (data.messages?.reduce((acc, msg) => acc + (msg.content?.length || 0), 0) || 0)
                        }
                    };
                } else if (endpoint.includes('images/generations')) {
                    return {
                        created: Date.now(),
                        data: [
                            {
                                url: 'https://placeholder.pics/svg/300/DEDEDE/555555/AI%20Generated%20Image'
                            }
                        ]
                    };
                }
                break;
                
            case 'anthropic':
                return {
                    id: 'mock-anthropic-' + Math.random().toString(36).substr(2, 9),
                    type: 'message',
                    content: [
                        {
                            type: 'text',
                            text: this.generateMockContent(data)
                        }
                    ],
                    model: data.model || 'claude-3-7-sonnet-20250219',
                    usage: {
                        input_tokens: data.messages?.reduce((acc, msg) => acc + (msg.content?.length || 0), 0) || 0,
                        output_tokens: 150
                    }
                };
                
            case 'gemini':
                return {
                    candidates: [
                        {
                            content: {
                                parts: [
                                    {
                                        text: this.generateMockContent(data)
                                    }
                                ],
                                role: 'model'
                            },
                            finish_reason: 'STOP'
                        }
                    ],
                    promptFeedback: {
                        safety: {
                            category: 'HARM_CATEGORY_UNSPECIFIED',
                            probability: 'NEGLIGIBLE'
                        }
                    }
                };
                
            case 'news':
                return {
                    status: 'ok',
                    totalResults: 10,
                    articles: [
                        {
                            title: 'Sample News Article About Technology',
                            description: 'This is a sample news article about the latest technological advancements.',
                            url: 'https://example.com/news/1',
                            urlToImage: 'https://placeholder.pics/svg/300/DEDEDE/555555/News%20Image',
                            publishedAt: new Date().toISOString(),
                            source: {
                                id: 'sample-news',
                                name: 'Sample News'
                            }
                        },
                        {
                            title: 'Another News Article About AI',
                            description: 'This is another sample news article focusing on AI developments.',
                            url: 'https://example.com/news/2',
                            urlToImage: 'https://placeholder.pics/svg/300/DEDEDE/555555/AI%20News',
                            publishedAt: new Date(Date.now() - 3600000).toISOString(),
                            source: {
                                id: 'tech-news',
                                name: 'Tech News'
                            }
                        }
                    ]
                };
                
            case 'search':
                return {
                    kind: 'customsearch#search',
                    items: [
                        {
                            title: 'Search Result 1',
                            link: 'https://example.com/result1',
                            snippet: 'This is a sample search result snippet that matches your query.',
                            displayLink: 'example.com'
                        },
                        {
                            title: 'Search Result 2',
                            link: 'https://example.com/result2',
                            snippet: 'Another sample search result with relevant information.',
                            displayLink: 'example.com'
                        }
                    ]
                };
                
            case 'weather':
                return {
                    location: {
                        name: data.city || 'New York',
                        region: 'New York',
                        country: 'United States of America',
                        lat: 40.71,
                        lon: -74.01,
                        localtime: new Date().toLocaleString()
                    },
                    current: {
                        temp_c: 22,
                        temp_f: 71.6,
                        condition: {
                            text: 'Partly cloudy',
                            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
                        },
                        humidity: 60,
                        wind_mph: 5.6,
                        precip_mm: 0.0
                    }
                };
                
            case 'crypto':
                return {
                    status: {
                        timestamp: new Date().toISOString(),
                        error_code: 0,
                        error_message: null,
                        credit_count: 1
                    },
                    data: {
                        BTC: {
                            id: 1,
                            name: 'Bitcoin',
                            symbol: 'BTC',
                            quote: {
                                USD: {
                                    price: 60000 + (Math.random() * 5000),
                                    percent_change_24h: (Math.random() * 10) - 5
                                }
                            }
                        },
                        ETH: {
                            id: 1027,
                            name: 'Ethereum',
                            symbol: 'ETH',
                            quote: {
                                USD: {
                                    price: 3000 + (Math.random() * 500),
                                    percent_change_24h: (Math.random() * 10) - 5
                                }
                            }
                        }
                    }
                };
                
            default:
                return {
                    error: 'Unimplemented service mock',
                    service,
                    endpoint
                };
        }
    }
    
    /**
     * Generate mock content for AI responses
     * @param {Object} data - Request data
     * @returns {string} Generated content
     */
    generateMockContent(data) {
        // Extract the user's query or use a default
        const userQuery = data.messages?.find(msg => msg.role === 'user')?.content || 
                          data.prompt || 
                          'Tell me about AI';
        
        // Generate a response based on the query
        if (userQuery.toLowerCase().includes('weather')) {
            return "Based on the current forecast, it's partly cloudy with a temperature of 72°F (22°C). There's a slight chance of rain later in the evening, with humidity at around 60%. Tomorrow should be clearer with temperatures rising to 75°F.";
        } else if (userQuery.toLowerCase().includes('news')) {
            return "Here are today's top headlines:\n\n1. New AI breakthrough enables more natural language understanding\n2. Global climate summit reaches ambitious new agreement\n3. Tech stocks rally after strong quarterly earnings\n4. Researchers announce progress on renewable energy storage\n5. New study reveals benefits of Mediterranean diet for longevity";
        } else if (userQuery.toLowerCase().includes('recipe') || userQuery.toLowerCase().includes('cook')) {
            return "Here's a simple pasta recipe:\n\nIngredients:\n- 8 oz pasta\n- 2 tbsp olive oil\n- 3 cloves garlic, minced\n- 1 pint cherry tomatoes, halved\n- Fresh basil leaves\n- Salt and pepper to taste\n- Grated parmesan\n\nInstructions:\n1. Cook pasta according to package directions\n2. Heat olive oil and sauté garlic until fragrant\n3. Add tomatoes and cook until softened\n4. Toss with drained pasta, basil, salt, and pepper\n5. Top with parmesan and serve";
        } else if (userQuery.toLowerCase().includes('joke')) {
            return "Why don't scientists trust atoms? Because they make up everything!";
        } else if (userQuery.toLowerCase().includes('history')) {
            return "The Renaissance period was a cultural movement that profoundly influenced European intellectual life in the early modern period. Beginning in Italy, and spreading to the rest of Europe by the 16th century, its influence was felt in art, architecture, philosophy, literature, music, science, technology, politics, religion, and other aspects of intellectual inquiry. Renaissance scholars employed the humanist method in study, and searched for realism and human emotion in art.";
        } else if (userQuery.toLowerCase().includes('code') || userQuery.toLowerCase().includes('programming')) {
            return "Here's a simple JavaScript function that calculates the Fibonacci sequence:\n\n```javascript\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  \n  let a = 0;\n  let b = 1;\n  \n  for (let i = 2; i <= n; i++) {\n    let temp = a + b;\n    a = b;\n    b = temp;\n  }\n  \n  return b;\n}\n\nconsole.log(fibonacci(10)); // Output: 55\n```\n\nThis function uses an iterative approach which is more efficient than the recursive version for large values of n.";
        } else {
            return "JAAT-AI provides a comprehensive platform with over 67 specialized AI modes, each designed for specific domains and use cases. Our advanced features include voice recognition, multi-language support, AI personalization, image style transfer, and deepfake detection.\n\nWhile this is a simulated response for demonstration purposes, in a production environment, JAAT-AI would connect to various AI models like GPT-4o, Claude 3.7, and Gemini to provide authentic, accurate responses tailored to your specific needs.\n\nHow can I assist you further today?";
        }
    }
    
    /**
     * Dispatch a custom event
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event details
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`jaat.api.${eventName}`, { 
            detail,
            bubbles: true
        });
        document.dispatchEvent(event);
    }
}

// Create global API service instance
window.JAAT_API = new ApiService();

// Export for module usage
export default window.JAAT_API;
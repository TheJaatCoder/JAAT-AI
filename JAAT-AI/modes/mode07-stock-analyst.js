/**
 * JAAT-AI Stock Analyst Mode
 * AI mode specialized in stock market analysis, trends, and investment guidance
 * Mode ID: 07
 */

class StockAnalystMode {
    constructor() {
        // Mode metadata
        this.id = "07";
        this.name = "Stock Analyst";
        this.description = "Your AI financial advisor for stocks, market trends, and investment strategies";
        this.icon = "ri-stock-line";
        this.color = "#22c55e"; // Green color
        this.category = "finance";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 3000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 3, // 1-10 scale (higher = more personality)
            creativityLevel: 2, // 1-10 scale
            formalityLevel: 8, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            marketTrendsEnabled: true,
            technicalAnalysisEnabled: true,
            fundamentalAnalysisEnabled: true,
            riskAssessmentEnabled: true,
            disclaimerEnabled: true
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            watchlist: [],
            portfolioHoldings: [],
            analysisHistory: [],
            marketSentiment: "neutral", // bullish, bearish, neutral
            sessionStartTime: new Date(),
            responseCount: 0
        };
        
        // Market sectors
        this.marketSectors = [
            "Technology", "Healthcare", "Financials", "Consumer Discretionary", 
            "Consumer Staples", "Industrials", "Energy", "Materials", 
            "Utilities", "Real Estate", "Communication Services"
        ];
        
        // Investment strategies
        this.investmentStrategies = {
            "value": "Focusing on stocks trading below their intrinsic value",
            "growth": "Targeting companies expected to grow earnings at a faster rate",
            "income": "Prioritizing dividend-paying stocks for regular income",
            "momentum": "Following stocks with upward price trends",
            "contrarian": "Taking positions opposite to prevailing market sentiment",
            "index": "Tracking a market index like S&P 500 or NASDAQ",
            "esg": "Considering environmental, social, and governance factors",
            "dividend_growth": "Focusing on companies with history of increasing dividends"
        };
        
        // Technical indicators
        this.technicalIndicators = {
            "moving_averages": "Averages of prices over specific time periods (e.g., 50-day, 200-day)",
            "relative_strength_index": "Momentum oscillator measuring speed and change of price movements (0-100)",
            "macd": "Moving Average Convergence Divergence - trend-following momentum indicator",
            "bollinger_bands": "Volatility indicator using standard deviations from moving average",
            "fibonacci_retracement": "Identifying potential support/resistance levels based on Fibonacci sequence",
            "stochastic_oscillator": "Momentum indicator comparing closing price to price range (0-100)"
        };
        
        // Fundamental metrics
        this.fundamentalMetrics = {
            "pe_ratio": "Price-to-Earnings ratio - stock price divided by earnings per share",
            "eps": "Earnings Per Share - company profit divided by outstanding shares",
            "dividend_yield": "Annual dividend divided by current share price",
            "roe": "Return on Equity - net income divided by shareholders' equity",
            "debt_to_equity": "Total liabilities divided by shareholders' equity",
            "fcf": "Free Cash Flow - cash generated after accounting for capital expenditures",
            "peg_ratio": "Price/Earnings to Growth - PE ratio divided by earnings growth rate",
            "book_value": "Company's assets minus its liabilities"
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Analyze Apple stock (AAPL)",
            "What is the current market outlook?",
            "Explain P/E ratio in simple terms",
            "Compare Tesla and Ford stocks",
            "How to start investing with $1000?",
            "What are the best dividend stocks?",
            "Explain the concept of dollar-cost averaging",
            "What factors affect stock prices?",
            "How should I diversify my portfolio?",
            "What's the difference between technical and fundamental analysis?"
        ];
        
        // Special features
        this.features = {
            stockAnalysis: true,
            marketTrends: true,
            portfolioManagement: true,
            investmentEducation: true,
            riskAssessment: true,
            technicalIndicators: true,
            fundamentalAnalysis: true,
            comparativeAnalysis: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 30,
            DISCLAIMER: "The information provided is for educational and informational purposes only. It does not constitute financial advice, and should not be relied upon for making investment decisions. Always do your own research and consider consulting with a qualified financial advisor before making any investment.",
            GREETING_PHRASES: [
                "Welcome to Stock Analyst mode. How can I help with your investment research today?",
                "I'm here to assist with stock analysis and market insights. What would you like to know?",
                "Ready to explore the markets? I can provide stock analysis and investment insights.",
                "How can I help with your financial research and investment planning today?",
                "Looking for stock market insights? I'm here to help analyze and explain market trends."
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Stock Analyst mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode07-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Stock Analyst mode");
                
                // Load watchlist
                if (this.state.userPreferences.watchlist) {
                    this.state.watchlist = this.state.userPreferences.watchlist;
                }
                
                // Load portfolio holdings
                if (this.state.userPreferences.portfolioHoldings) {
                    this.state.portfolioHoldings = this.state.userPreferences.portfolioHoldings;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode07-history');
                if (savedHistory) {
                    this.state.conversationHistory = JSON.parse(savedHistory);
                    
                    // Trim history if it exceeds max length
                    if (this.state.conversationHistory.length > this.constants.MAX_MEMORY_ITEMS) {
                        this.state.conversationHistory = this.state.conversationHistory.slice(
                            -this.constants.MAX_MEMORY_ITEMS
                        );
                    }
                    
                    console.log(`Loaded ${this.state.conversationHistory.length} conversation items`);
                }
                
                // Load analysis history
                const savedAnalyses = localStorage.getItem('jaat-mode07-analyses');
                if (savedAnalyses) {
                    this.state.analysisHistory = JSON.parse(savedAnalyses);
                    console.log(`Loaded ${this.state.analysisHistory.length} analysis records`);
                }
            } catch (error) {
                console.error("Error loading conversation history:", error);
                this.state.conversationHistory = [];
                this.state.analysisHistory = [];
            }
        }
        
        // Record initialization time
        this.state.sessionStartTime = new Date();
        
        console.log(`Stock Analyst mode initialized`);
        return true;
    }
    
    /**
     * Get a greeting message
     * @returns {string} Greeting message
     */
    getGreeting() {
        const { GREETING_PHRASES } = this.constants;
        const randomIndex = Math.floor(Math.random() * GREETING_PHRASES.length);
        return GREETING_PHRASES[randomIndex];
    }
    
    /**
     * Process user input and generate a stock analysis response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with financial analysis
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I can help with stock analysis, market trends, and investment strategies. What would you like to know about the financial markets?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing stock analysis request`);
        
        // Record interaction time
        this.state.lastInteractionTime = new Date();
        
        // Add user message to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "user",
                content: userInput,
                timestamp: this.state.lastInteractionTime
            });
        }
        
        // Detect type of financial request
        const requestType = this.detectRequestType(userInput);
        
        // Extract stock ticker if present
        const ticker = this.extractStockTicker(userInput);
        
        // Generate appropriate financial response
        const response = await this.generateFinancialResponse(
            userInput, 
            requestType, 
            ticker, 
            context
        );
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date(),
                requestType: requestType,
                ticker: ticker
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode07-history',
                    JSON.stringify(this.state.conversationHistory)
                );
            } catch (error) {
                console.error("Error saving conversation history:", error);
            }
        }
        
        // Increment response counter
        this.state.responseCount++;
        
        return response;
    }
    
    /**
     * Detect the type of financial request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for stock analysis request
        if (/\b(?:analyze|analysis|what\s+(?:do|about)|thoughts\s+on)\b.*?\b(?:stock|share|ticker|price|aapl|msft|googl|amzn|tsla)\b/i.test(normalizedInput)) {
            return "stock_analysis";
        }
        
        // Check for comparison request
        if (/\b(?:compare|comparison|vs|versus)\b.*?\b(?:stock|share)\b/i.test(normalizedInput)) {
            return "stock_comparison";
        }
        
        // Check for market trend request
        if (/\b(?:market|trend|economic|economy|outlook|forecast|prediction)\b/i.test(normalizedInput)) {
            return "market_trends";
        }
        
        // Check for investment strategy request
        if (/\b(?:invest|investment|strategy|portfolio|allocation|diversif|risk)\b/i.test(normalizedInput)) {
            return "investment_strategy";
        }
        
        // Check for term explanation request
        if (/\b(?:what\s+is|explain|define|meaning|how\s+to|understand)\b/i.test(normalizedInput)) {
            return "term_explanation";
        }
        
        // Check for recommendation request
        if (/\b(?:recommend|suggestion|suggest|best|top|which|should\s+I)\b/i.test(normalizedInput)) {
            return "recommendations";
        }
        
        // Check for watchlist/portfolio request
        if (/\b(?:watchlist|portfolio|holding|track|monitor)\b/i.test(normalizedInput)) {
            return "watchlist_management";
        }
        
        // Default to general analysis
        return "general_analysis";
    }
    
    /**
     * Extract stock ticker from user input
     * @param {string} input - User input
     * @returns {string|null} Stock ticker or null
     */
    extractStockTicker(input) {
        // Common stock ticker pattern: 1-5 capital letters
        const tickerPattern = /\b([A-Z]{1,5})\b/g;
        const tickerMatches = [...input.matchAll(tickerPattern)];
        
        if (tickerMatches.length > 0) {
            // Return the first match
            return tickerMatches[0][1];
        }
        
        // Try to extract ticker from company name mentions
        const companyTickerMap = {
            "apple": "AAPL",
            "microsoft": "MSFT",
            "amazon": "AMZN",
            "google": "GOOGL",
            "alphabet": "GOOGL",
            "meta": "META",
            "facebook": "META",
            "netflix": "NFLX",
            "tesla": "TSLA",
            "nvidia": "NVDA",
            "amd": "AMD",
            "intel": "INTC",
            "ibm": "IBM",
            "coca cola": "KO",
            "coca-cola": "KO",
            "pepsi": "PEP",
            "pepsico": "PEP",
            "walmart": "WMT",
            "disney": "DIS",
            "nike": "NKE",
            "mcdonald's": "MCD",
            "mcdonalds": "MCD",
            "starbucks": "SBUX",
            "ford": "F",
            "general motors": "GM",
            "gm": "GM",
            "jp morgan": "JPM",
            "jpmorgan": "JPM",
            "bank of america": "BAC",
            "goldman sachs": "GS",
            "johnson & johnson": "JNJ",
            "pfizer": "PFE",
            "moderna": "MRNA",
            "exxon": "XOM",
            "exxonmobil": "XOM",
            "chevron": "CVX",
            "verizon": "VZ",
            "at&t": "T"
        };
        
        const normalizedInput = input.toLowerCase();
        
        for (const [company, ticker] of Object.entries(companyTickerMap)) {
            if (normalizedInput.includes(company)) {
                return ticker;
            }
        }
        
        return null;
    }
    
    /**
     * Generate a financial response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of financial request
     * @param {string} ticker - Stock ticker if present
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateFinancialResponse(userInput, requestType, ticker, context = {}) {
        // In a real implementation, this would call an AI model API specialized in finance
        // and potentially fetch real-time market data
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "stock_analysis":
                responseText = this.generateStockAnalysis(ticker || "UNKNOWN");
                break;
                
            case "stock_comparison":
                responseText = this.generateStockComparison(userInput);
                break;
                
            case "market_trends":
                responseText = this.generateMarketTrendsAnalysis();
                break;
                
            case "investment_strategy":
                responseText = this.generateInvestmentAdvice(userInput);
                break;
                
            case "term_explanation":
                responseText = this.generateTermExplanation(userInput);
                break;
                
            case "recommendations":
                responseText = this.generateRecommendations(userInput);
                break;
                
            case "watchlist_management":
                responseText = this.handleWatchlistRequest(userInput, ticker);
                break;
                
            default:
                responseText = this.generateGeneralFinancialResponse(userInput);
        }
        
        // Record this analysis in history
        if (ticker) {
            this.recordAnalysis(ticker, requestType);
        }
        
        // Add disclaimer if enabled
        if (this.config.disclaimerEnabled) {
            responseText += `\n\n*Disclaimer: ${this.constants.DISCLAIMER}*`;
        }
        
        // Get appropriate follow-up suggestions
        const financialSuggestions = this.getFinancialSuggestions(requestType, ticker);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            ticker: ticker,
            suggestions: financialSuggestions
        };
    }
    
    /**
     * Generate stock analysis for a specific ticker
     * @param {string} ticker - Stock ticker symbol
     * @returns {string} Stock analysis
     */
    generateStockAnalysis(ticker) {
        // Sample analyses for common stocks
        const stockAnalyses = {
            "AAPL": `# Apple Inc. (AAPL) Analysis

In a complete implementation with an AI model and real-time market data, I would provide a comprehensive analysis of Apple Inc. based on:

## Company Overview
Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company is known for its iconic products including iPhone, Mac, iPad, and wearables such as Apple Watch and AirPods. Apple's services segment includes digital content stores, streaming services, and payment services.

## Technical Analysis
- **Price Chart Patterns**: Would analyze recent price movements and key support/resistance levels
- **Moving Averages**: Would examine 50-day and 200-day moving averages
- **Volume Trends**: Would analyze trading volume patterns
- **RSI and MACD**: Would evaluate momentum indicators

## Fundamental Analysis
- **Recent Earnings**: Would report the most recent quarterly results
- **Revenue Growth**: Would analyze year-over-year revenue trends
- **Profit Margins**: Would evaluate gross and net profit margins
- **P/E Ratio**: Would compare to industry average and historical values
- **Dividend Information**: Would report current yield and payout history

## Market Position & Outlook
- **Competitive Landscape**: Would analyze Apple's position against competitors
- **Growth Catalysts**: Would identify potential drivers of future growth
- **Risk Factors**: Would highlight challenges and potential headwinds
- **Analyst Sentiment**: Would summarize recent analyst ratings and price targets

Would you like to focus on a specific aspect of Apple's stock performance or learn about another company?`,

            "MSFT": `# Microsoft Corporation (MSFT) Analysis

In a complete implementation with an AI model and real-time market data, I would provide a comprehensive analysis of Microsoft Corporation based on:

## Company Overview
Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates through three segments: Productivity and Business Processes (Office, LinkedIn), Intelligent Cloud (Azure, Server products), and More Personal Computing (Windows, Xbox, Surface).

## Technical Analysis
- **Price Chart Patterns**: Would analyze recent price movements and key support/resistance levels
- **Moving Averages**: Would examine 50-day and 200-day moving averages
- **Volume Trends**: Would analyze trading volume patterns
- **RSI and MACD**: Would evaluate momentum indicators

## Fundamental Analysis
- **Recent Earnings**: Would report the most recent quarterly results
- **Revenue Growth**: Would analyze year-over-year revenue trends
- **Profit Margins**: Would evaluate gross and net profit margins
- **P/E Ratio**: Would compare to industry average and historical values
- **Dividend Information**: Would report current yield and payout history

## Market Position & Outlook
- **Cloud Market Share**: Would analyze Azure's position in the cloud services market
- **AI Initiatives**: Would evaluate Microsoft's AI strategy and investments
- **Enterprise Software Dominance**: Would assess Microsoft's position in business software
- **Risk Factors**: Would highlight challenges and potential headwinds
- **Analyst Sentiment**: Would summarize recent analyst ratings and price targets

Would you like to focus on a specific aspect of Microsoft's stock performance or learn about another company?`,

            "TSLA": `# Tesla, Inc. (TSLA) Analysis

In a complete implementation with an AI model and real-time market data, I would provide a comprehensive analysis of Tesla, Inc. based on:

## Company Overview
Tesla, Inc. designs, develops, manufactures, and sells electric vehicles, energy generation and storage systems. The company operates through two segments: Automotive and Energy Generation and Storage. Tesla produces and sells the Model 3, Model Y, Model S, and Model X, as well as related services and technologies.

## Technical Analysis
- **Price Chart Patterns**: Would analyze recent price movements and key support/resistance levels
- **Moving Averages**: Would examine 50-day and 200-day moving averages
- **Volume Trends**: Would analyze trading volume patterns
- **RSI and MACD**: Would evaluate momentum indicators
- **Volatility Metrics**: Would assess Tesla's characteristic volatility patterns

## Fundamental Analysis
- **Recent Earnings**: Would report the most recent quarterly results
- **Production Numbers**: Would analyze vehicle delivery and production figures
- **Revenue Growth**: Would analyze year-over-year revenue trends
- **Profit Margins**: Would evaluate gross and net profit margins
- **P/E Ratio**: Would compare to industry average

## Market Position & Outlook
- **EV Market Share**: Would analyze Tesla's position in the global EV market
- **Expansion Plans**: Would evaluate factory expansion and new market entries
- **Product Roadmap**: Would assess upcoming vehicle models and energy products
- **Regulatory Environment**: Would analyze impacts of government policies on EV adoption
- **Competition**: Would evaluate increasing competition in the EV market
- **Analyst Sentiment**: Would summarize recent analyst ratings and price targets

Would you like to focus on a specific aspect of Tesla's stock performance or learn about another company?`
        };
        
        // Check if we have a pre-written analysis
        if (stockAnalyses[ticker]) {
            return stockAnalyses[ticker];
        }
        
        // Generic stock analysis response
        return `# ${ticker} Stock Analysis

In a complete implementation with an AI model and real-time market data, I would provide a comprehensive analysis of ${ticker} including:

## Technical Analysis
- Current price and recent price movements
- Key support and resistance levels
- Moving averages (50-day, 200-day)
- Volume trends and patterns
- RSI, MACD, and other relevant indicators

## Fundamental Analysis
- Recent quarterly earnings results
- Revenue and earnings growth trends
- Profit margins and operational efficiency
- P/E ratio and other valuation metrics
- Dividend information (if applicable)

## Market Position & Outlook
- Competitive landscape analysis
- Growth catalysts and opportunities
- Risk factors and challenges
- Recent analyst ratings and price targets

## News & Developments
- Recent company announcements
- Relevant industry trends
- Regulatory developments

Would you like to learn about a specific aspect of ${ticker} or analyze a different stock?`;
    }
    
    /**
     * Generate a comparison between stocks
     * @param {string} userInput - User's input requesting comparison
     * @returns {string} Stock comparison
     */
    generateStockComparison(userInput) {
        // Try to extract which stocks to compare
        const comparisonPattern = /(?:compare|comparison|vs|versus)\s+(?:between\s+)?([A-Za-z\s]+)\s+(?:and|vs|versus|to)\s+([A-Za-z\s]+)/i;
        const match = userInput.match(comparisonPattern);
        
        let stock1 = "";
        let stock2 = "";
        
        if (match && match.length >= 3) {
            stock1 = this.extractStockTicker(match[1]) || match[1].trim();
            stock2 = this.extractStockTicker(match[2]) || match[2].trim();
        } else {
            // Default comparison if we couldn't extract specific stocks
            return `# Stock Comparison Analysis

In a complete implementation with an AI model and real-time market data, I would provide a detailed comparison between the stocks you're interested in.

To generate a stock comparison, please specify which stocks you'd like to compare, for example:
- "Compare Apple and Microsoft stocks"
- "How does TSLA compare to F (Ford)?"
- "Amazon vs. Walmart stock analysis"

The comparison would include:
- Performance metrics (YTD, 1yr, 5yr returns)
- Valuation ratios (P/E, P/S, P/B)
- Profitability metrics (profit margins, ROE, ROA)
- Dividend comparison (if applicable)
- Technical indicators
- Growth prospects
- Risk assessment

Would you like to specify which stocks you'd like to compare?`;
        }
        
        // Special case for Tesla vs Ford comparison
        if ((stock1 === "TSLA" || stock1.toLowerCase().includes("tesla")) && 
            (stock2 === "F" || stock2.toLowerCase().includes("ford"))) {
            
            return `# Tesla (TSLA) vs. Ford (F) Comparison

In a complete implementation with an AI model and real-time market data, I would provide a comprehensive comparison between Tesla and Ford, including:

## Market Position
- **Tesla**: Pure electric vehicle manufacturer with a focus on innovation, technology and premium positioning
- **Ford**: Traditional automaker transitioning to electric vehicles while maintaining its gasoline vehicle business

## Business Model
- **Tesla**: Direct-to-consumer sales model, proprietary charging network, energy products
- **Ford**: Dealer network distribution, broad vehicle lineup across price points, commercial vehicle strength

## Financial Comparison
| Metric | Tesla (TSLA) | Ford (F) |
|--------|--------------|----------|
| Market Cap | Would show current market capitalization | Would show current market capitalization |
| Revenue | Would show trailing 12-month revenue | Would show trailing 12-month revenue |
| Profit Margin | Would show net profit margin | Would show net profit margin |
| P/E Ratio | Would show current P/E ratio | Would show current P/E ratio |
| Debt-to-Equity | Would show D/E ratio | Would show D/E ratio |
| Dividend Yield | N/A (Tesla doesn't pay dividends) | Would show current yield |

## EV Strategy
- **Tesla**: Exclusively produces electric vehicles across multiple segments
- **Ford**: Hybrid approach with commitment to expand EV lineup while continuing ICE vehicles

## Technical Comparison
- Would include price chart comparison
- Would analyze relative strength 
- Would examine volume trends
- Would analyze price movement correlation

## Analyst Outlook
- Would summarize recent analyst ratings for both companies
- Would present consensus price targets
- Would highlight key growth catalysts and risk factors

Would you like to focus on a specific aspect of this comparison or compare different companies?`;
        }
        
        // Generic comparison
        return `# ${stock1} vs. ${stock2} Comparison

In a complete implementation with an AI model and real-time market data, I would provide a comprehensive comparison between ${stock1} and ${stock2}, including:

## Performance Comparison
- Historical returns (1-month, YTD, 1-year, 5-year)
- Volatility metrics
- Risk-adjusted returns

## Fundamental Comparison
| Metric | ${stock1} | ${stock2} |
|--------|-----------|-----------|
| Market Cap | Would show current data | Would show current data |
| Revenue Growth | Would show current data | Would show current data |
| Profit Margin | Would show current data | Would show current data |
| P/E Ratio | Would show current data | Would show current data |
| P/S Ratio | Would show current data | Would show current data |
| Dividend Yield | Would show current data | Would show current data |
| Debt-to-Equity | Would show current data | Would show current data |

## Technical Comparison
- Relative price strength
- Moving average positions
- Momentum indicators
- Volume patterns

## Business Model Comparison
- Core product/service comparison
- Revenue streams
- Market position
- Competitive advantages

## Growth Outlook
- Growth catalysts for each company
- Market opportunities
- Expansion plans
- Innovation pipeline

## Risk Analysis
- Company-specific risks
- Industry challenges
- Regulatory concerns

Would you like to focus on a specific aspect of this comparison or compare different companies?`;
    }
    
    /**
     * Generate market trends analysis
     * @returns {string} Market trends analysis
     */
    generateMarketTrendsAnalysis() {
        return `# Current Market Trends Analysis

In a complete implementation with an AI model and real-time market data, I would provide a comprehensive analysis of current market trends, including:

## Major Index Performance
- S&P 500, Dow Jones, NASDAQ, Russell 2000 current performance
- International markets (European, Asian markets)
- Sector-by-sector breakdown of recent performance

## Economic Indicators
- Recent GDP growth figures
- Inflation rates and trends
- Employment data
- Manufacturing and service sector activity
- Consumer sentiment

## Monetary Policy
- Current Federal Reserve policy stance
- Interest rate environment
- Quantitative easing/tightening measures
- Forward guidance and projections

## Market Sentiment Indicators
- VIX (volatility index) readings
- Put/Call ratios
- Fund flows (into/out of equities, bonds, etc.)
- Institutional vs. retail investor positioning

## Current Market Themes
- Would identify dominant narratives driving markets
- Sector rotations
- Growth vs. value performance
- Small cap vs. large cap trends

## Potential Market-Moving Events
- Upcoming economic data releases
- Earnings season expectations
- Geopolitical factors
- Regulatory developments

## Technical Market Analysis
- Key support/resistance levels for major indices
- Breadth indicators (advance/decline line, new highs/lows)
- Trend strength indicators

Would you like me to focus on a specific aspect of current market conditions, or are you interested in the outlook for a particular sector?`;
    }
    
    /**
     * Generate investment advice
     * @param {string} userInput - User's input asking for advice
     * @returns {string} Investment advice
     */
    generateInvestmentAdvice(userInput) {
        // Check for specific investment amount
        const investmentAmountPattern = /\$(\d+[,\d]*)/;
        const match = userInput.match(investmentAmountPattern);
        let investmentAmount = null;
        
        if (match && match[1]) {
            investmentAmount = match[1].replace(/,/g, '');
        }
        
        // Special case for $1000 investment advice
        if (investmentAmount === "1000") {
            return `# How to Start Investing with $1,000

Starting your investment journey with $1,000 is a great first step toward building wealth. Here's a structured approach to consider:

## Preliminary Steps
1. **Set Financial Foundation First**
   - Ensure you have an emergency fund (ideally 3-6 months of expenses)
   - Pay off high-interest debt (particularly credit cards)
   - Determine your investment time horizon and risk tolerance

2. **Define Your Investment Goals**
   - Short-term (1-3 years)
   - Medium-term (3-10 years)
   - Long-term (10+ years)

## Investment Options for $1,000

### Option 1: Index ETFs or Mutual Funds
- **Advantages**: Instant diversification, low costs, professionally managed
- **Suggestions**: 
  - S&P 500 ETFs (e.g., VOO, SPY, IVV)
  - Total market funds (e.g., VTI, ITOT)
  - Target date retirement funds based on your retirement year

### Option 2: Fractional Shares of Individual Companies
- **Advantages**: Own parts of companies you believe in, potential for higher returns
- **Approach**: Consider 5-10 companies across different sectors
- **Caution**: Higher risk due to less diversification

### Option 3: Robo-Advisors
- **Advantages**: Automated investing, portfolio rebalancing, low fees
- **Examples**: Betterment, Wealthfront, M1 Finance, Robinhood
- **Best for**: Hands-off investors who prefer professional management

### Option 4: High-Yield Savings or CDs
- **Advantages**: No risk to principal, FDIC insured
- **Best for**: Short-term goals or very risk-averse investors
- **Downside**: Returns likely won't outpace inflation long-term

## Starting Strategy for New Investors

1. **Consider allocating your $1,000 as follows:**
   - $700-800 in a broad market index ETF
   - $200-300 in 1-2 individual companies you understand well

2. **Set up a regular investment plan**
   - Consider dollar-cost averaging with additional contributions
   - Even $50-100/month can significantly grow your portfolio over time

3. **Focus on learning**
   - Use free resources to improve your investing knowledge
   - Consider paper trading to practice without risking capital

## Key Principles to Remember
- **Start small**: Don't feel pressure to invest all at once
- **Keep costs low**: Minimize fees and commissions
- **Think long-term**: Market timing rarely works
- **Reinvest dividends**: Compound growth is powerful
- **Rebalance periodically**: Keep your risk profile consistent

Would you like more specific information about any of these investment options?`;
        }
        
        // Generic investment advice
        return `# Investment Strategy Guide

In a complete implementation with an AI model and tailored financial guidance capabilities, I would provide personalized investment strategy suggestions based on:

## Understanding Your Investment Profile
- Investment goals and time horizon
- Risk tolerance assessment
- Current financial situation
- Tax considerations

## Asset Allocation Strategies
- Diversification principles
- Traditional allocation models
- Modern portfolio theory applications
- Tactical vs. strategic allocation

## Investment Vehicle Options
- Individual stocks and bonds
- ETFs and mutual funds
- Real estate investment options
- Alternative investments
- Retirement accounts (401(k), IRA, etc.)

## Investment Approaches
- Value investing
- Growth investing
- Income investing
- Index investing
- Dollar-cost averaging
- Lump sum investing

## Risk Management Techniques
- Diversification strategies
- Hedging techniques
- Portfolio rebalancing
- Stop-loss strategies

## Long-term Investment Principles
- Compound growth benefits
- Tax-efficient investing
- Behavioral finance considerations
- Avoiding common investment mistakes

Would you like more information about a specific investment strategy or approach mentioned above?`;
    }
    
    /**
     * Generate explanation of financial term
     * @param {string} userInput - User's input asking for explanation
     * @returns {string} Term explanation
     */
    generateTermExplanation(userInput) {
        // Try to extract the term to explain
        const termPatterns = [
            /(?:what|explain|define|meaning of)\s+(?:is|are)?\s*(?:a|an|the)?\s*([^?\.]+)(?:\s+(?:in|mean|is))?/i,
            /(?:how\s+(?:does|do|to))\s+([^?\.]+)(?:\s+work)?/i
        ];
        
        let term = "";
        
        for (const pattern of termPatterns) {
            const match = userInput.match(pattern);
            if (match && match[1]) {
                term = match[1].trim().toLowerCase();
                break;
            }
        }
        
        // Sample explanations for common financial terms
        const termExplanations = {
            "p/e ratio": `# Price-to-Earnings (P/E) Ratio Explained

## What is the P/E Ratio?

The Price-to-Earnings ratio (P/E ratio) is one of the most widely used valuation metrics for stocks. It measures a company's current share price relative to its earnings per share (EPS).

**Formula**: P/E Ratio = Share Price ÷ Earnings Per Share

## Interpreting the P/E Ratio

### What it Tells You
- How much investors are willing to pay for $1 of earnings
- Market's expectations for a company's future growth
- Relative valuation compared to peers or the broader market

### Types of P/E Ratios
1. **Trailing P/E**: Based on past 12 months of actual earnings
2. **Forward P/E**: Based on projected future earnings (usually next 12 months)
3. **Shiller P/E (CAPE)**: Cyclically adjusted P/E using 10 years of earnings

## Example Calculation

If Company XYZ's stock is trading at $50 per share and its EPS for the past 12 months was $2:
- P/E Ratio = $50 ÷ $2 = 25

This means investors are willing to pay $25 for every $1 of current earnings.

## How to Use P/E Ratios

### High P/E Ratios (typically >20)
- Often indicates investors expect higher growth
- May suggest the stock is overvalued
- Common in technology and high-growth sectors

### Low P/E Ratios (typically <15)
- May indicate undervaluation
- Could signal limited growth expectations
- Common in mature industries or companies facing challenges

### Comparative Analysis
- Compare a company's P/E to:
  - Its historical P/E range
  - Industry average P/E
  - Market average P/E (S&P 500 average is typically 15-25)

## Limitations of P/E Ratio

- Doesn't account for growth rates (use PEG ratio for this)
- Can be misleading for companies with cyclical earnings
- Limited usefulness for companies with negative earnings
- Accounting methods can affect earnings figures
- Different industries have different "normal" P/E ranges

## Related Metrics

- **PEG Ratio**: P/E divided by earnings growth rate
- **Price-to-Sales (P/S)**: Alternative for companies without profits
- **EV/EBITDA**: Enterprise Value to Earnings Before Interest, Taxes, Depreciation, and Amortization

Would you like me to explain any of these related metrics or another financial term?`,

            "dollar cost averaging": `# Dollar-Cost Averaging (DCA) Explained

## What is Dollar-Cost Averaging?

Dollar-Cost Averaging (DCA) is an investment strategy where you invest a fixed amount of money at regular intervals, regardless of the asset's price. This approach helps reduce the impact of volatility and the risk of making poor investment timing decisions.

## How Dollar-Cost Averaging Works

1. **Choose a fixed amount** to invest (e.g., $500 per month)
2. **Select regular intervals** for investments (e.g., weekly, monthly, quarterly)
3. **Maintain the schedule** regardless of market conditions
4. **Continue the strategy** over a long period

## Example of Dollar-Cost Averaging

Imagine investing $1,000 in a stock fund every month for 4 months:

| Month | Investment | Share Price | Shares Purchased |
|-------|------------|-------------|------------------|
| 1     | $1,000     | $50         | 20               |
| 2     | $1,000     | $40         | 25               |
| 3     | $1,000     | $60         | 16.67            |
| 4     | $1,000     | $50         | 20               |
| Total | $4,000     | -           | 81.67            |

**Average Share Price**: ($50 + $40 + $60 + $50) ÷ 4 = $50
**Average Cost Per Share**: $4,000 ÷ 81.67 = $48.98

You purchased shares at an average cost of $48.98, which is below the average price of $50, demonstrating the potential benefit of DCA.

## Benefits of Dollar-Cost Averaging

1. **Reduces timing risk**: No need to predict market tops and bottoms
2. **Emotional discipline**: Removes emotion from investment decisions
3. **Consistency**: Enforces regular investing habits
4. **Lower average cost**: Often results in lower average cost per share over time
5. **Accessibility**: Works well for investors with regular income rather than a large lump sum

## When to Use Dollar-Cost Averaging

- When you receive regular income and want to invest systematically
- During volatile market periods
- When you're unsure about market direction
- For long-term investment goals (retirement, education funding)
- When you want to minimize regret from poorly timed investments

## Limitations of Dollar-Cost Averaging

- In consistently rising markets, lump-sum investing often outperforms DCA
- Transaction costs can add up if fees are charged per transaction
- Requires discipline to stick with during market downturns
- May lead to psychological challenges during extended bear markets

## DCA vs. Lump Sum Investing

Studies show that lump-sum investing outperforms DCA approximately two-thirds of the time over long periods, but DCA reduces risk and potential regret, making it psychologically easier for many investors.

Would you like to know more about implementing a dollar-cost averaging strategy or compare it with other investment approaches?`,

            "diversification": `# Portfolio Diversification Explained

## What is Diversification?

Diversification is a risk management strategy that involves spreading investments across various financial instruments, industries, geographic regions, and other categories. It aims to maximize returns by investing in different areas that would each react differently to the same event.

## The Concept: "Don't Put All Your Eggs in One Basket"

By diversifying, you avoid the risk of substantial losses that could occur from investing heavily in a single investment. When one investment performs poorly, others may perform well, helping to offset losses and reduce the volatility of the overall portfolio.

## Types of Diversification

### 1. Asset Class Diversification
- **Stocks**: Ownership in companies
- **Bonds**: Debt securities issued by governments or corporations
- **Cash and equivalents**: Money market funds, Treasury bills
- **Real estate**: Property investments, REITs
- **Commodities**: Gold, silver, oil, agricultural products
- **Alternative investments**: Private equity, hedge funds, cryptocurrency

### 2. Sector/Industry Diversification
Spreading investments across different economic sectors:
- Technology
- Healthcare
- Financials
- Consumer goods
- Energy
- Utilities
- Industrial
- Materials
- Communication services
- Real estate

### 3. Geographic Diversification
- Domestic markets
- Developed international markets
- Emerging markets
- Frontier markets

### 4. Company Size Diversification
- Large-cap companies
- Mid-cap companies
- Small-cap companies

### 5. Time Diversification
- Dollar-cost averaging
- Laddered bond portfolios

## Benefits of Diversification

1. **Reduced portfolio volatility**
2. **Minimized impact of single investment failures**
3. **Exposure to more opportunities for returns**
4. **Protection against market-specific risks**
5. **Preservation of capital**

## Example of a Diversified Portfolio

A moderately diversified portfolio for a middle-aged investor might include:
- 45% U.S. stocks (large, mid, and small-cap)
- 15% International stocks (developed and emerging markets)
- 30% Bonds (government, corporate, municipal)
- 5% Real estate (REITs)
- 5% Cash and equivalents

## Potential Drawbacks

1. **Over-diversification**: Too many investments can lead to average returns and higher management costs
2. **Reduced potential for outsized returns**: Diversification limits both downside and upside
3. **Increased complexity**: More investments require more monitoring and management
4. **Higher transaction costs**: More positions may mean more trading fees

## How to Implement Diversification

1. **Assess your risk tolerance and time horizon**
2. **Determine appropriate asset allocation**
3. **Consider low-cost index funds or ETFs for broad exposure**
4. **Rebalance periodically to maintain target allocations**
5. **Review and adjust strategy as life circumstances change**

Would you like more information about a specific aspect of diversification or guidance on how to diversify your own portfolio?`
        };
        
        // Check if we have a pre-written explanation
        for (const [key, explanation] of Object.entries(termExplanations)) {
            if (term.includes(key)) {
                return explanation;
            }
        }
        
        // Generic term explanation for terms we don't have pre-written
        return `# Financial Term Explanation

In a complete implementation with an AI model and financial knowledge database, I would provide a detailed explanation of the term "${term}" including:

- Clear definition and meaning
- Real-world examples and applications
- Visual representations where helpful
- Relevance to investment decisions
- Related financial concepts
- Historical context when relevant

Would you like me to explain a different financial term or concept?`;
    }
    
    /**
     * Generate investment recommendations
     * @param {string} userInput - User's input asking for recommendations
     * @returns {string} Investment recommendations
     */
    generateRecommendations(userInput) {
        return `# Investment Recommendations

In a complete implementation with an AI model and real-time market data, I would provide tailored investment recommendations based on your specific interests and goals.

However, I want to emphasize that I cannot make specific buy or sell recommendations for individual securities. Instead, I could provide:

## General Investment Approaches
- Asset allocation strategies based on risk tolerance and time horizon
- Information about various investment styles and their characteristics
- Educational content about different asset classes

## Market Insights
- Current market trends and sector performance
- Economic indicators and their potential impact
- Historical context for current market conditions

## Investment Strategies
- Dollar-cost averaging vs. lump sum investing
- Value vs. growth investment approaches
- Passive vs. active management considerations

## Resources and Tools
- Screening criteria for finding investments that match your goals
- Research methodologies for evaluating potential investments
- Resources for further investment education

To provide more personalized guidance, I would need to understand:
- Your investment goals and time horizon
- Risk tolerance level
- Current investment holdings
- Financial situation and constraints

Would you like information about a specific investment approach or market sector?`;
    }
    
    /**
     * Handle watchlist management requests
     * @param {string} userInput - User's input about watchlist
     * @param {string} ticker - Stock ticker if present
     * @returns {string} Watchlist response
     */
    handleWatchlistRequest(userInput, ticker) {
        // Check if this is an add to watchlist request
        const addPattern = /add\s+(?:to|in)?\s*(?:my)?\s*watchlist/i;
        
        if (addPattern.test(userInput) && ticker) {
            // Add to watchlist
            if (!this.state.watchlist.includes(ticker)) {
                this.state.watchlist.push(ticker);
                this.savePreferences({ watchlist: this.state.watchlist });
            }
            
            return `# Watchlist Updated

I've added ${ticker} to your watchlist.

Your current watchlist:
${this.state.watchlist.join(', ')}

In a complete implementation with an AI model and real-time market data, I would also:
- Provide a summary of your watchlist stocks
- Show key performance metrics
- Highlight recent news for these companies
- Offer alerts for significant price movements

Would you like to add another stock to your watchlist or get more information about the stocks you're tracking?`;
        }
        
        // Check if this is a view watchlist request
        const viewPattern = /(?:view|show|display|what|how)\s+(?:is|about)?\s*(?:my)?\s*watchlist/i;
        
        if (viewPattern.test(userInput)) {
            // Display watchlist
            if (this.state.watchlist.length === 0) {
                return `# Your Watchlist

Your watchlist is currently empty.

You can add stocks to your watchlist by saying something like:
- "Add AAPL to my watchlist"
- "Track MSFT in my watchlist"
- "Start watching AMZN"

In a complete implementation, I would help you track stocks and provide regular updates on your watchlist positions.`;
            }
            
            return `# Your Watchlist

Current stocks in your watchlist:
${this.state.watchlist.join(', ')}

In a complete implementation with an AI model and real-time market data, I would provide:
- Current prices and daily performance
- Recent news affecting these stocks
- Technical and fundamental indicators
- Analyst ratings and price targets

Would you like to add or remove any stocks from your watchlist?`;
        }
        
        // Default watchlist response
        return `# Watchlist Management

In a complete implementation with an AI model and real-time market data, I would help you manage a personalized stock watchlist to track investments of interest.

Your watchlist would allow you to:
- Monitor performance of stocks without purchasing
- Track key metrics and news
- Receive alerts about significant price movements
- Compare multiple stocks of interest

Would you like to:
- Add a stock to your watchlist?
- View your current watchlist?
- Remove stocks from your watchlist?
- Get detailed analysis of a watchlist stock?

Let me know how you'd like to proceed with your watchlist management.`;
    }
    
    /**
     * Generate general financial response
     * @param {string} userInput - User's input
     * @returns {string} General financial response
     */
    generateGeneralFinancialResponse(userInput) {
        return `# Financial Analysis

In a complete implementation with an AI model and financial analysis capabilities, I would provide insights on various financial topics including stock analysis, market trends, investment strategies, and economic indicators.

I can help with:
- Individual stock analysis
- Comparative stock analysis
- Market trends and sector performance
- Investment strategies and portfolio construction
- Economic indicators and their market impact
- Financial terminology and concepts
- Watchlist management

What specific financial topic or stock would you like to explore?`;
    }
    
    /**
     * Get financial suggestions based on user interaction
     * @param {string} requestType - Type of financial request
     * @param {string} ticker - Stock ticker if present
     * @returns {Array<string>} Financial suggestions
     */
    getFinancialSuggestions(requestType, ticker) {
        const suggestions = [];
        
        // Add type-specific suggestions
        if (requestType === "stock_analysis" && ticker) {
            suggestions.push(`Compare ${ticker} with a competitor`);
            suggestions.push(`What are the major risks for ${ticker}?`);
            suggestions.push(`Add ${ticker} to my watchlist`);
        } else if (requestType === "stock_comparison") {
            suggestions.push("Which tech stock has better growth potential?");
            suggestions.push("Compare dividend aristocrats vs growth stocks");
        } else if (requestType === "market_trends") {
            suggestions.push("How do interest rates affect the stock market?");
            suggestions.push("Which sectors perform well during inflation?");
        } else if (requestType === "investment_strategy") {
            suggestions.push("How to build a dividend portfolio?");
            suggestions.push("What is dollar-cost averaging?");
        } else if (requestType === "term_explanation") {
            suggestions.push("Explain P/E ratio in simple terms");
            suggestions.push("What is diversification in investing?");
        } else if (requestType === "recommendations") {
            suggestions.push("How to invest during market volatility");
            suggestions.push("Best investment books for beginners");
        } else if (requestType === "watchlist_management") {
            suggestions.push("Show my watchlist");
            suggestions.push("What should I look for in a good stock?");
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "Current market outlook",
                "How to start investing with $1000",
                "Difference between stocks and bonds",
                "What are ETFs and how do they work?",
                "How to analyze a company's financial health",
                "What is a good P/E ratio?"
            ];
            
            const suggestion = generalSuggestions[Math.floor(Math.random() * generalSuggestions.length)];
            if (!suggestions.includes(suggestion)) {
                suggestions.push(suggestion);
            }
        }
        
        // Return top 3 suggestions
        return suggestions.slice(0, 3);
    }
    
    /**
     * Record analysis in history
     * @param {string} ticker - Stock ticker
     * @param {string} analysisType - Type of analysis
     */
    recordAnalysis(ticker, analysisType) {
        if (!this.config.memoryEnabled) return;
        
        const analysis = {
            ticker: ticker,
            type: analysisType,
            timestamp: new Date()
        };
        
        this.state.analysisHistory.push(analysis);
        
        // Save to storage
        try {
            localStorage.setItem('jaat-mode07-analyses', JSON.stringify(this.state.analysisHistory));
        } catch (error) {
            console.error("Error saving analysis record:", error);
        }
    }
    
    /**
     * Add a stock to watchlist
     * @param {string} ticker - Stock ticker to add
     * @returns {boolean} Success status
     */
    addToWatchlist(ticker) {
        if (!ticker) return false;
        
        if (!this.state.watchlist.includes(ticker)) {
            this.state.watchlist.push(ticker);
            this.savePreferences({ watchlist: this.state.watchlist });
            return true;
        }
        
        return false; // Already in watchlist
    }
    
    /**
     * Remove a stock from watchlist
     * @param {string} ticker - Stock ticker to remove
     * @returns {boolean} Success status
     */
    removeFromWatchlist(ticker) {
        if (!ticker) return false;
        
        const index = this.state.watchlist.indexOf(ticker);
        if (index !== -1) {
            this.state.watchlist.splice(index, 1);
            this.savePreferences({ watchlist: this.state.watchlist });
            return true;
        }
        
        return false; // Not in watchlist
    }
    
    /**
     * Save user preferences
     * @param {Object} preferences - User preferences to save
     * @returns {boolean} Success status
     */
    savePreferences(preferences) {
        try {
            this.state.userPreferences = { ...this.state.userPreferences, ...preferences };
            localStorage.setItem(
                'jaat-mode07-preferences',
                JSON.stringify(this.state.userPreferences)
            );
            return true;
        } catch (error) {
            console.error("Error saving user preferences:", error);
            return false;
        }
    }
    
    /**
     * Clear conversation history
     * @returns {boolean} Success status
     */
    clearHistory() {
        try {
            this.state.conversationHistory = [];
            localStorage.removeItem('jaat-mode07-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Clear analysis history
     * @returns {boolean} Success status
     */
    clearAnalysisHistory() {
        try {
            this.state.analysisHistory = [];
            localStorage.removeItem('jaat-mode07-analyses');
            return true;
        } catch (error) {
            console.error("Error clearing analysis history:", error);
            return false;
        }
    }
    
    /**
     * Update mode configuration
     * @param {Object} newConfig - New configuration settings
     * @returns {Object} Updated configuration
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        return this.config;
    }
    
    /**
     * Get information about this mode
     * @returns {Object} Mode information
     */
    getModeInfo() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            icon: this.icon,
            color: this.color,
            category: this.category,
            version: this.version,
            watchlistCount: this.state.watchlist.length,
            marketSentiment: this.state.marketSentiment,
            suggestions: this.suggestions.slice(0, 5), // Return first 5 suggestions
            features: this.features
        };
    }
    
    /**
     * Check if the mode is ready to use
     * @returns {boolean} Ready status
     */
    isReady() {
        return true;
    }
}

// Create instance if in browser environment
if (typeof window !== 'undefined') {
    if (!window.jaatAIModes) {
        window.jaatAIModes = {};
    }
    window.jaatAIModes.stockAnalyst = new StockAnalystMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StockAnalystMode;
}
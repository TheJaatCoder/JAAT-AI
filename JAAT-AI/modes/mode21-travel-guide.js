/**
 * JAAT-AI Travel Guide Mode
 * AI mode specialized in travel recommendations, destination information, and trip planning
 * Mode ID: 11
 */

class TravelGuideMode {
    constructor() {
        // Mode metadata
        this.id = "11";
        this.name = "Travel Guide";
        this.description = "Your AI travel companion for destination recommendations, trip planning, and travel tips";
        this.icon = "ri-road-map-line";
        this.color = "#0ea5e9"; // Sky blue color
        this.category = "lifestyle";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 3000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 7, // 1-10 scale (higher = more personality)
            creativityLevel: 6, // 1-10 scale
            formalityLevel: 4, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            localRecommendationsEnabled: true,
            budgetAwarenessEnabled: true,
            seasonalAwarenessEnabled: true
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            currentDestination: null,
            travelDates: null,
            travelBudget: null,
            travelInterests: [],
            travelPartySize: 1,
            savedDestinations: [],
            travelHistory: [],
            sessionStartTime: new Date(),
            responseCount: 0,
            currentSeason: this.getCurrentSeason()
        };
        
        // Travel categories
        this.travelCategories = {
            "beach": "Beach destinations and coastal areas",
            "mountains": "Mountain ranges, hiking trails, and alpine activities",
            "city": "Urban exploration, cultural landmarks, and city experiences",
            "cultural": "Historical sites, museums, and cultural immersion",
            "adventure": "Outdoor activities, extreme sports, and adventure experiences",
            "relaxation": "Spa retreats, resorts, and relaxing getaways",
            "food": "Culinary experiences, food tours, and gastronomic destinations",
            "nature": "National parks, wildlife, and natural wonders",
            "budget": "Affordable destinations and money-saving travel",
            "luxury": "High-end experiences, premium accommodations, and exclusive destinations",
            "family": "Kid-friendly destinations and family activities",
            "romantic": "Couple-friendly destinations and romantic experiences",
            "solo": "Destinations and activities ideal for solo travelers",
            "group": "Destinations and activities suited for larger groups",
            "road_trip": "Scenic drives, routes, and road trip planning"
        };
        
        // Travel regions
        this.travelRegions = {
            "north_america": ["United States", "Canada", "Mexico"],
            "central_america": ["Costa Rica", "Panama", "Guatemala", "Belize", "Honduras", "El Salvador", "Nicaragua"],
            "caribbean": ["Jamaica", "Bahamas", "Cuba", "Dominican Republic", "Puerto Rico"],
            "south_america": ["Brazil", "Argentina", "Peru", "Colombia", "Chile", "Ecuador", "Bolivia", "Venezuela"],
            "western_europe": ["France", "Italy", "Spain", "United Kingdom", "Germany", "Portugal", "Netherlands", "Belgium", "Switzerland", "Austria"],
            "northern_europe": ["Sweden", "Norway", "Denmark", "Finland", "Iceland"],
            "eastern_europe": ["Poland", "Czech Republic", "Hungary", "Romania", "Bulgaria", "Croatia", "Slovakia"],
            "southern_europe": ["Greece", "Turkey", "Malta", "Cyprus"],
            "middle_east": ["United Arab Emirates", "Jordan", "Israel", "Egypt", "Oman", "Qatar"],
            "africa": ["South Africa", "Morocco", "Kenya", "Tanzania", "Namibia", "Botswana", "Ghana", "Senegal"],
            "south_asia": ["India", "Nepal", "Sri Lanka", "Maldives", "Bhutan"],
            "southeast_asia": ["Thailand", "Vietnam", "Indonesia", "Malaysia", "Philippines", "Singapore", "Cambodia", "Laos", "Myanmar"],
            "east_asia": ["Japan", "China", "South Korea", "Taiwan", "Hong Kong"],
            "oceania": ["Australia", "New Zealand", "Fiji", "French Polynesia", "Samoa"]
        };
        
        // Travel essentials
        this.travelEssentials = {
            "documentation": ["Passport", "Visa", "ID cards", "Travel insurance", "Booking confirmations", "Driving license"],
            "clothing": ["Weather-appropriate clothes", "Comfortable shoes", "Sleepwear", "Swimwear", "Formal outfit"],
            "technology": ["Phone", "Chargers", "Adapters", "Camera", "Power bank", "Headphones"],
            "toiletries": ["Toothbrush/Toothpaste", "Shampoo/Conditioner", "Deodorant", "Sunscreen", "Insect repellent"],
            "health": ["Medications", "First aid kit", "Hand sanitizer", "Face masks", "Vitamins"],
            "finances": ["Credit/Debit cards", "Cash", "Currency exchange", "Money belt"],
            "comfort": ["Neck pillow", "Eye mask", "Earplugs", "Travel blanket"],
            "miscellaneous": ["Books/E-reader", "Snacks", "Reusable water bottle", "Daypack", "Travel locks"]
        };
        
        // Seasonal travel information
        this.seasonalTravel = {
            "spring": {
                "highlights": ["Cherry blossoms in Japan", "Tulip season in Netherlands", "Shoulder season in Europe", "Pleasant weather in Mediterranean"],
                "tips": ["Pack layers for changing temperatures", "Book before summer price hikes", "Enjoy fewer crowds at popular destinations"],
                "destinations": ["Japan", "Netherlands", "Spain", "Morocco", "Greece"]
            },
            "summer": {
                "highlights": ["Beach destinations", "European festivals", "Midnight sun in Nordic countries", "Hiking in mountain regions"],
                "tips": ["Book well in advance", "Prepare for crowds and heat", "Consider early morning activities", "Budget for higher prices"],
                "destinations": ["Italy", "France", "Croatia", "Greece", "Spain", "Portugal"]
            },
            "fall": {
                "highlights": ["Fall foliage", "Wine harvests", "Shoulder season deals", "Mild temperatures in many regions"],
                "tips": ["Pack layers for variable weather", "Take advantage of lower prices", "Enjoy fewer crowds at popular sites"],
                "destinations": ["New England, USA", "Germany", "France", "Japan", "Canada"]
            },
            "winter": {
                "highlights": ["Skiing and winter sports", "Christmas markets", "Northern Lights", "Southern Hemisphere summer"],
                "tips": ["Pack appropriate cold weather gear", "Look for off-season deals in non-winter destinations", "Consider indoor activities"],
                "destinations": ["Switzerland", "Austria", "Iceland", "New Zealand", "Thailand", "Australia"]
            }
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "What are the best places to visit in Japan?",
            "Give me a 7-day itinerary for Paris",
            "What should I pack for a beach vacation?",
            "Top things to do in New York City",
            "Budget-friendly destinations in Europe",
            "Best time to visit Bali",
            "How to save money while traveling",
            "Family-friendly activities in London",
            "Most scenic road trips in the USA",
            "What are the entry requirements for Thailand?"
        ];
        
        // Special features
        this.features = {
            destinationRecommendations: true,
            itineraryPlanning: true,
            packingAssistance: true,
            budgetPlanning: true,
            culturalInsights: true,
            travelTips: true,
            localExperiences: true,
            accommodationSuggestions: true,
            transportationGuidance: true,
            safetyInformation: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 30,
            MAX_SAVED_DESTINATIONS: 20,
            CURRENT_YEAR: new Date().getFullYear(),
            DISCLAIMER: "Information provided is for general guidance only. Travel regulations, prices, and conditions may change. Always verify the latest information before traveling.",
            GREETING_PHRASES: [
                "Ready to explore the world? Where would you like to travel today?",
                "Hello, traveler! Where can I guide you on your next adventure?",
                "The world awaits! How can I help with your travel plans?",
                "Welcome to Travel Guide mode. What destination is on your mind?",
                "Let's discover new horizons together! What travel questions can I answer for you?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Travel Guide mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set current destination if provided
        if (options.destination) {
            this.state.currentDestination = options.destination;
        }
        
        // Set travel dates if provided
        if (options.dates) {
            this.state.travelDates = options.dates;
        }
        
        // Set travel budget if provided
        if (options.budget) {
            this.state.travelBudget = options.budget;
        }
        
        // Set travel interests if provided
        if (options.interests && Array.isArray(options.interests)) {
            this.state.travelInterests = options.interests;
        }
        
        // Set travel party size if provided
        if (options.partySize && !isNaN(options.partySize)) {
            this.state.travelPartySize = parseInt(options.partySize);
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode11-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Travel Guide mode");
                
                // Load current destination if saved
                if (this.state.userPreferences.currentDestination) {
                    this.state.currentDestination = this.state.userPreferences.currentDestination;
                }
                
                // Load travel dates if saved
                if (this.state.userPreferences.travelDates) {
                    this.state.travelDates = this.state.userPreferences.travelDates;
                }
                
                // Load travel budget if saved
                if (this.state.userPreferences.travelBudget) {
                    this.state.travelBudget = this.state.userPreferences.travelBudget;
                }
                
                // Load travel interests if saved
                if (this.state.userPreferences.travelInterests) {
                    this.state.travelInterests = this.state.userPreferences.travelInterests;
                }
                
                // Load travel party size if saved
                if (this.state.userPreferences.travelPartySize) {
                    this.state.travelPartySize = this.state.userPreferences.travelPartySize;
                }
                
                // Load saved destinations if saved
                if (this.state.userPreferences.savedDestinations) {
                    this.state.savedDestinations = this.state.userPreferences.savedDestinations;
                }
                
                // Load travel history if saved
                if (this.state.userPreferences.travelHistory) {
                    this.state.travelHistory = this.state.userPreferences.travelHistory;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode11-history');
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
            } catch (error) {
                console.error("Error loading conversation history:", error);
                this.state.conversationHistory = [];
            }
        }
        
        // Record initialization time
        this.state.sessionStartTime = new Date();
        
        console.log(`Travel Guide mode initialized with destination: ${this.state.currentDestination || "None"}`);
        return true;
    }
    
    /**
     * Get current season based on Northern Hemisphere
     * @returns {string} Current season
     */
    getCurrentSeason() {
        const now = new Date();
        const month = now.getMonth();
        
        if (month >= 2 && month <= 4) {
            return "spring";
        } else if (month >= 5 && month <= 7) {
            return "summer";
        } else if (month >= 8 && month <= 10) {
            return "fall";
        } else {
            return "winter";
        }
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
     * Process user input and generate a travel guide response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with travel guidance
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your travel guide assistant. I can help with destination recommendations, itinerary planning, packing lists, travel tips, and more. Where would you like to go?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing travel guide request`);
        
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
        
        // Detect type of travel request
        const requestType = this.detectRequestType(userInput);
        
        // Extract destination if present
        const destination = this.extractDestination(userInput);
        if (destination) {
            this.state.currentDestination = destination;
            this.savePreferences({ currentDestination: destination });
        }
        
        // Extract travel dates if present
        const dates = this.extractDates(userInput);
        if (dates) {
            this.state.travelDates = dates;
            this.savePreferences({ travelDates: dates });
        }
        
        // Extract budget if present
        const budget = this.extractBudget(userInput);
        if (budget) {
            this.state.travelBudget = budget;
            this.savePreferences({ travelBudget: budget });
        }
        
        // Extract travel interests if present
        const interests = this.extractInterests(userInput);
        if (interests && interests.length > 0) {
            this.state.travelInterests = interests;
            this.savePreferences({ travelInterests: interests });
        }
        
        // Generate appropriate travel guide response
        const response = await this.generateTravelResponse(
            userInput, 
            requestType, 
            context
        );
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date(),
                requestType: requestType,
                destination: this.state.currentDestination
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode11-history',
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
     * Detect the type of travel request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for destination recommendation request
        if (/\b(?:where|recommend|suggest|best place|top destination|good place)\b.*?\b(?:to visit|to go|to travel|for vacation|for holiday)\b/i.test(normalizedInput) ||
            /\b(?:where should i|what's a good place to)\b/i.test(normalizedInput)) {
            return "destination_recommendation";
        }
        
        // Check for itinerary request
        if (/\b(?:itinerary|schedule|plan|days in|day trip|things to do|activities|attractions|sights|landmarks)\b/i.test(normalizedInput)) {
            return "itinerary_planning";
        }
        
        // Check for transportation request
        if (/\b(?:how to get|transport|transportation|flight|train|bus|car rental|taxi|subway|metro|getting around)\b/i.test(normalizedInput)) {
            return "transportation";
        }
        
        // Check for accommodation request
        if (/\b(?:hotel|accommodation|place to stay|hostel|airbnb|resort|where to stay)\b/i.test(normalizedInput)) {
            return "accommodation";
        }
        
        // Check for packing request
        if (/\b(?:pack|packing|bring|take|suitcase|luggage|essentials|checklist|what to wear)\b/i.test(normalizedInput)) {
            return "packing";
        }
        
        // Check for food request
        if (/\b(?:food|restaurant|eat|cuisine|dish|meal|breakfast|lunch|dinner|dining|cafe|bar)\b/i.test(normalizedInput)) {
            return "food";
        }
        
        // Check for budget request
        if (/\b(?:budget|cost|expensive|cheap|affordable|price|money|spending|expense)\b/i.test(normalizedInput)) {
            return "budget";
        }
        
        // Check for seasonal/weather request
        if (/\b(?:weather|season|when to go|best time|climate|temperature|rain|sunny|cold|hot|warm)\b/i.test(normalizedInput)) {
            return "seasonal";
        }
        
        // Check for safety/health request
        if (/\b(?:safe|safety|danger|crime|health|insurance|vaccination|vaccine|medical|embassy|scam)\b/i.test(normalizedInput)) {
            return "safety";
        }
        
        // Check for cultural request
        if (/\b(?:culture|custom|tradition|etiquette|tip|local|language|greeting|dress code|history)\b/i.test(normalizedInput)) {
            return "cultural";
        }
        
        // Check for visa/documentation request
        if (/\b(?:visa|passport|document|requirement|entry|border|customs|immigration)\b/i.test(normalizedInput)) {
            return "visa";
        }
        
        // Default to destination information
        return "destination_information";
    }
    
    /**
     * Extract destination from user input
     * @param {string} input - User input
     * @returns {string|null} Destination or null
     */
    extractDestination(input) {
        // Common destination extraction patterns
        const patterns = [
            /(?:in|to|about|for|around|visiting)\s+([A-Z][a-zA-Z\s]+)(?:\s+in\s+([A-Z][a-zA-Z\s]+))?/,
            /([A-Z][a-zA-Z\s]+)(?:\s+(?:itinerary|guide|tips|recommendations))/,
            /(?:travel|trip|vacation|holiday|visit)\s+(?:to|in)\s+([A-Z][a-zA-Z\s]+)/
        ];
        
        // Check all patterns
        for (const pattern of patterns) {
            const match = input.match(pattern);
            if (match && match[1]) {
                const potentialDestination = match[1].trim();
                
                // Check if destination is a real place (would need a geographic database)
                // For now, we'll just check for some basic filtering
                if (potentialDestination.length > 1 && !/^(a|an|the|some|any|my|our|your|for|to|in)$/i.test(potentialDestination)) {
                    return potentialDestination;
                }
            }
        }
        
        // Check if any location from our regions list is mentioned
        for (const region in this.travelRegions) {
            for (const country of this.travelRegions[region]) {
                if (input.includes(country)) {
                    return country;
                }
            }
        }
        
        // No valid destination found
        return null;
    }
    
    /**
     * Extract travel dates from user input
     * @param {string} input - User input
     * @returns {Object|null} Travel dates object or null
     */
    extractDates(input) {
        // This is a simplified date extraction
        // In a real implementation, you'd use a more sophisticated date parsing library
        
        // Month patterns
        const months = [
            "january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december",
            "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
        ];
        
        // Season patterns
        const seasons = ["spring", "summer", "fall", "autumn", "winter"];
        
        const yearPattern = new RegExp(`\\b(20\\d{2})\\b`, 'g');
        const monthPattern = new RegExp(`\\b(${months.join("|")})\\b`, 'gi');
        const seasonPattern = new RegExp(`\\b(${seasons.join("|")})\\b`, 'gi');
        
        // Check for year mentions
        const yearMatches = [...input.matchAll(yearPattern)];
        const years = yearMatches.map(match => parseInt(match[1]));
        
        // Check for month mentions
        const monthMatches = [...input.matchAll(monthPattern)];
        const mentionedMonths = monthMatches.map(match => match[1].toLowerCase());
        
        // Check for season mentions
        const seasonMatches = [...input.matchAll(seasonPattern)];
        const mentionedSeasons = seasonMatches.map(match => {
            const season = match[1].toLowerCase();
            return season === "autumn" ? "fall" : season;
        });
        
        // If we have years, months, or seasons, create a dates object
        if (years.length > 0 || mentionedMonths.length > 0 || mentionedSeasons.length > 0) {
            const dates = {
                years: years,
                months: mentionedMonths,
                seasons: mentionedSeasons
            };
            
            // Normalize the dates object to include a year if not specified
            if (dates.years.length === 0) {
                const currentYear = new Date().getFullYear();
                dates.years = [currentYear];
            }
            
            return dates;
        }
        
        // No valid dates found
        return null;
    }
    
    /**
     * Extract budget from user input
     * @param {string} input - User input
     * @returns {Object|null} Budget object or null
     */
    extractBudget(input) {
        // Regular expressions for budget extraction
        const currencySymbols = /[\$\€\£\¥]/g;
        const budgetPattern = /\b(?:budget|spend|cost|price|afford|expense)\b.*?(?:[\$\€\£\¥]\s*(\d[\d,\.]*|\d+[kK])|\b(\d[\d,\.]*|\d+[kK])\s*(?:dollars|euros|pounds|USD|EUR|GBP|yen|JPY))/i;
        const budgetLevelPattern = /\b(budget|cheap|affordable|mid-range|moderate|expensive|luxury|high-end)\b.*?\b(?:travel|trip|vacation|holiday|accommodation|hotel)\b/i;
        
        // Check for budget amount
        const budgetMatch = input.match(budgetPattern);
        let budgetAmount = null;
        
        if (budgetMatch) {
            // Extract the amount, removing commas and handling 'k' for thousands
            const amountStr = (budgetMatch[1] || budgetMatch[2]).replace(/,/g, '');
            if (amountStr.toLowerCase().endsWith('k')) {
                budgetAmount = parseFloat(amountStr.slice(0, -1)) * 1000;
            } else {
                budgetAmount = parseFloat(amountStr);
            }
        }
        
        // Check for budget level
        const budgetLevelMatch = input.match(budgetLevelPattern);
        let budgetLevel = null;
        
        if (budgetLevelMatch) {
            budgetLevel = budgetLevelMatch[1].toLowerCase();
            
            // Normalize budget levels
            if (budgetLevel === "cheap" || budgetLevel === "affordable") {
                budgetLevel = "budget";
            } else if (budgetLevel === "moderate" || budgetLevel === "mid-range") {
                budgetLevel = "moderate";
            } else if (budgetLevel === "high-end") {
                budgetLevel = "luxury";
            }
        }
        
        // If we have a budget amount or level, create a budget object
        if (budgetAmount !== null || budgetLevel !== null) {
            const budget = {};
            
            if (budgetAmount !== null) {
                budget.amount = budgetAmount;
            }
            
            if (budgetLevel !== null) {
                budget.level = budgetLevel;
            }
            
            // Extract currency if present
            const currencyMatch = input.match(/\b(USD|EUR|GBP|JPY|dollars|euros|pounds|yen)\b/i);
            if (currencyMatch) {
                budget.currency = currencyMatch[1].toUpperCase();
                
                // Normalize currency
                if (budget.currency === "DOLLARS") budget.currency = "USD";
                if (budget.currency === "EUROS") budget.currency = "EUR";
                if (budget.currency === "POUNDS") budget.currency = "GBP";
                if (budget.currency === "YEN") budget.currency = "JPY";
            } else if (input.includes("$")) {
                budget.currency = "USD";
            } else if (input.includes("€")) {
                budget.currency = "EUR";
            } else if (input.includes("£")) {
                budget.currency = "GBP";
            } else if (input.includes("¥")) {
                budget.currency = "JPY";
            }
            
            return budget;
        }
        
        // No valid budget found
        return null;
    }
    
    /**
     * Extract travel interests from user input
     * @param {string} input - User input
     * @returns {Array<string>|null} Travel interests or null
     */
    extractInterests(input) {
        const interests = [];
        const normalizedInput = input.toLowerCase();
        
        // Check for each travel category
        for (const category in this.travelCategories) {
            // Convert category key to search term (e.g., "road_trip" -> "road trip")
            const searchTerm = category.replace('_', ' ');
            if (normalizedInput.includes(searchTerm)) {
                interests.push(category);
            }
        }
        
        // Add some common activities and interests that might be mentioned
        const additionalInterests = [
            { term: "museum", category: "cultural" },
            { term: "history", category: "cultural" },
            { term: "art", category: "cultural" },
            { term: "shopping", category: "city" },
            { term: "hiking", category: "adventure" },
            { term: "trek", category: "adventure" },
            { term: "surf", category: "beach" },
            { term: "diving", category: "adventure" },
            { term: "snorkel", category: "beach" },
            { term: "food", category: "food" },
            { term: "cuisine", category: "food" },
            { term: "restaurant", category: "food" },
            { term: "wine", category: "food" },
            { term: "nightlife", category: "city" },
            { term: "wildlife", category: "nature" },
            { term: "photography", category: "nature" },
            { term: "spa", category: "relaxation" },
            { term: "yoga", category: "relaxation" }
        ];
        
        for (const item of additionalInterests) {
            if (normalizedInput.includes(item.term) && !interests.includes(item.category)) {
                interests.push(item.category);
            }
        }
        
        return interests.length > 0 ? interests : null;
    }
    
    /**
     * Generate a travel guide response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of travel request
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateTravelResponse(userInput, requestType, context = {}) {
        // In a real implementation, this would call an AI model API specialized in travel
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "destination_recommendation":
                responseText = this.recommendDestinations(userInput);
                break;
                
            case "itinerary_planning":
                responseText = this.planItinerary(userInput);
                break;
                
            case "transportation":
                responseText = this.provideTransportationAdvice(userInput);
                break;
                
            case "accommodation":
                responseText = this.recommendAccommodation(userInput);
                break;
                
            case "packing":
                responseText = this.createPackingList(userInput);
                break;
                
            case "food":
                responseText = this.provideFoodRecommendations(userInput);
                break;
                
            case "budget":
                responseText = this.provideBudgetAdvice(userInput);
                break;
                
            case "seasonal":
                responseText = this.provideSeasonalAdvice(userInput);
                break;
                
            case "safety":
                responseText = this.provideSafetyInformation(userInput);
                break;
                
            case "cultural":
                responseText = this.provideCulturalInsights(userInput);
                break;
                
            case "visa":
                responseText = this.provideVisaInformation(userInput);
                break;
                
            default:
                responseText = this.provideDestinationInformation(userInput);
        }
        
        // Add disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate travel suggestions
        const travelSuggestions = this.getTravelSuggestions(requestType);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            destination: this.state.currentDestination,
            suggestions: travelSuggestions
        };
    }
    
    /**
     * Recommend destinations based on user input
     * @param {string} userInput - User's input
     * @returns {string} Destination recommendations
     */
    recommendDestinations(userInput) {
        // Parse interests from user input if not already set
        if (this.state.travelInterests.length === 0) {
            const interests = this.extractInterests(userInput);
            if (interests) {
                this.state.travelInterests = interests;
                this.savePreferences({ travelInterests: interests });
            }
        }
        
        // Parse budget from user input if not already set
        if (!this.state.travelBudget) {
            const budget = this.extractBudget(userInput);
            if (budget) {
                this.state.travelBudget = budget;
                this.savePreferences({ travelBudget: budget });
            }
        }
        
        // Parse dates from user input if not already set
        if (!this.state.travelDates) {
            const dates = this.extractDates(userInput);
            if (dates) {
                this.state.travelDates = dates;
                this.savePreferences({ travelDates: dates });
            }
        }
        
        // Format interest string for display
        const interestString = this.state.travelInterests.length > 0 
            ? this.state.travelInterests.map(i => i.replace('_', ' ')).join(', ') 
            : "general travel";
        
        // Format budget string for display
        let budgetString = "any budget";
        if (this.state.travelBudget) {
            if (this.state.travelBudget.level) {
                budgetString = this.state.travelBudget.level;
            } else if (this.state.travelBudget.amount) {
                const currency = this.state.travelBudget.currency || "USD";
                budgetString = `approximately ${currency} ${this.state.travelBudget.amount}`;
            }
        }
        
        // Format time string for display
        let timeString = "any time";
        if (this.state.travelDates) {
            if (this.state.travelDates.seasons && this.state.travelDates.seasons.length > 0) {
                timeString = this.state.travelDates.seasons.join(' or ');
            } else if (this.state.travelDates.months && this.state.travelDates.months.length > 0) {
                timeString = this.state.travelDates.months.join(' or ');
            }
            
            if (this.state.travelDates.years && this.state.travelDates.years.length > 0) {
                timeString += ` ${this.state.travelDates.years[0]}`;
            }
        } else {
            // If no dates specified, use current season
            timeString = this.state.currentSeason;
        }
        
        return `# Destination Recommendations

In a complete implementation with an AI model and up-to-date travel data, I would provide personalized destination recommendations based on your preferences for ${interestString} with ${budgetString} during ${timeString}.

## Recommended Destinations

Based on your interests and current travel trends, here are some destinations to consider:

### Destination 1
- **Overview**: Brief description of the destination
- **Why Visit Now**: Seasonal highlights or current attractions
- **Perfect For**: Which of your interests it matches
- **Budget Considerations**: How it aligns with your budget
- **Top Experiences**: Must-do activities

### Destination 2
- **Overview**: Brief description of the destination
- **Why Visit Now**: Seasonal highlights or current attractions
- **Perfect For**: Which of your interests it matches
- **Budget Considerations**: How it aligns with your budget
- **Top Experiences**: Must-do activities

### Destination 3
- **Overview**: Brief description of the destination
- **Why Visit Now**: Seasonal highlights or current attractions
- **Perfect For**: Which of your interests it matches
- **Budget Considerations**: How it aligns with your budget
- **Top Experiences**: Must-do activities

## Seasonal Considerations

For travel during ${timeString}, consider:
- Weather patterns and what to expect
- Seasonal events and festivals
- Crowd levels and booking recommendations
- Potential shoulder season opportunities

## Next Steps

If any of these destinations interest you, I can help with:
- Detailed itinerary planning
- Accommodation recommendations
- Transportation options
- Packing advice for your chosen destination

Would you like more specific information about any of these destinations?`;
    }
    
    /**
     * Plan an itinerary based on user input
     * @param {string} userInput - User's input
     * @returns {string} Itinerary plan
     */
    planItinerary(userInput) {
        // Default to current destination if available, or extract from input
        const destination = this.state.currentDestination || this.extractDestination(userInput) || "your destination";
        
        // Try to extract duration from input
        const durationPattern = /\b(\d+)\s*(?:day|days)\b/i;
        const durationMatch = userInput.match(durationPattern);
        const days = durationMatch ? parseInt(durationMatch[1]) : 3; // Default to 3 days
        
        return `# ${days}-Day Itinerary for ${destination}

In a complete implementation with an AI model and comprehensive travel data, I would create a detailed, day-by-day itinerary for ${destination} based on your interests, budget, and travel style.

## Overview
- **Best Time to Visit**: Ideal seasons and months
- **Getting Around**: Transportation options within ${destination}
- **Areas to Stay**: Recommended neighborhoods or areas

## Day-by-Day Itinerary

### Day 1: Introduction to ${destination}
- **Morning**: 
  - Activity 1 (e.g., landmark or must-see attraction)
  - Activity 2 (e.g., walking tour or orientation activity)
- **Lunch**: Dining recommendation
- **Afternoon**:
  - Activity 3 (e.g., museum or cultural site)
  - Activity 4 (e.g., park or relaxation spot)
- **Evening**:
  - Dinner recommendation
  - Optional evening activity

### Day 2: Exploring Further
- **Morning**: 
  - Activity 1
  - Activity 2
- **Lunch**: Dining recommendation
- **Afternoon**:
  - Activity 3
  - Activity 4
- **Evening**:
  - Dinner recommendation
  - Optional evening activity

${days > 2 ? `### Day 3: Deep Dive
- **Morning**: 
  - Activity 1
  - Activity 2
- **Lunch**: Dining recommendation
- **Afternoon**:
  - Activity 3
  - Activity 4
- **Evening**:
  - Dinner recommendation
  - Optional evening activity` : ""}

${days > 3 ? `### Day 4 and Beyond
- Continued day-by-day breakdown with activities, dining, and experiences` : ""}

## Practical Tips
- **Transportation**: How to get between attractions efficiently
- **Tickets and Reservations**: What to book in advance
- **Local Customs**: Important etiquette to be aware of
- **Money-Saving Tips**: Ways to optimize your budget

## Customization Options
- **If You Love Art**: Alternative activities for art enthusiasts
- **For Nature Lovers**: Outdoor-focused alternatives
- **Traveling with Kids**: Family-friendly modifications
- **Foodie Focus**: Culinary-centered alternatives

Would you like more details about any specific day or activities in this itinerary?`;
    }
    
    /**
     * Provide transportation advice
     * @param {string} userInput - User's input
     * @returns {string} Transportation advice
     */
    provideTransportationAdvice(userInput) {
        // Default to current destination if available, or extract from input
        const destination = this.state.currentDestination || this.extractDestination(userInput) || "your destination";
        
        // Check if asking about getting to or around the destination
        const isGettingTo = /\b(?:get to|travel to|fly to|flight to|train to|bus to|reaching|arrive at|arriving in)\b/i.test(userInput);
        
        if (isGettingTo) {
            return `# Getting to ${destination}

In a complete implementation with an AI model and up-to-date transportation data, I would provide detailed information about reaching ${destination} from your location, including flights, trains, buses, and driving options.

## Transportation Options

### By Air
- **Major Airports**: Serving ${destination}
- **Direct Flight Routes**: Major cities with direct connections
- **Airlines**: Key carriers serving this route
- **Flight Duration**: Typical travel times
- **Airport Transfer**: Getting from the airport to city/accommodation

### By Train
- **Train Connections**: Major routes to ${destination}
- **High-Speed Options**: Available fast train services
- **Duration**: Typical journey times
- **Booking Tips**: When and how to secure tickets

### By Bus
- **Long-Distance Buses**: Companies serving ${destination}
- **Duration**: Typical journey times
- **Comfort Levels**: Classes of service available
- **Booking Information**: Where to purchase tickets

### By Car
- **Major Routes**: Best driving paths to ${destination}
- **Driving Conditions**: What to expect on the roads
- **Rental Information**: If you need to rent a vehicle
- **Parking Situation**: Availability and costs
- **Border Crossings**: Information if applicable

## Comparing Options

| Method | Approx. Cost | Time | Convenience | Sustainability |
|--------|--------------|------|-------------|----------------|
| Air    | $$$          | ★★★★★ | ★★★★☆       | ★☆☆☆☆          |
| Train  | $$           | ★★★☆☆ | ★★★★☆       | ★★★★☆          |
| Bus    | $            | ★★☆☆☆ | ★★★☆☆       | ★★★★☆          |
| Car    | $$           | ★★★☆☆ | ★★★★★       | ★★☆☆☆          |

## Booking Resources
- Recommended websites and platforms
- Typical booking timeline recommendations
- Money-saving tips for transportation

## Transportation Tips
- Best days/times to travel for lower prices
- Luggage considerations for each mode
- Accessibility information if needed
- Required documents for travel

Would you like specific information about any of these transportation methods to ${destination}?`;
        } else {
            return `# Getting Around ${destination}

In a complete implementation with an AI model and detailed transportation data, I would provide comprehensive information about local transportation options in ${destination}, including public transit, taxis, ride-sharing, and rental options.

## Public Transportation

### Metro/Subway System
- **Coverage**: Areas and attractions accessible
- **Operating Hours**: When services run
- **Ticketing**: Types of tickets and passes
- **Costs**: Fare information
- **Navigation Tips**: How to use the system effectively

### Bus Network
- **Coverage**: Areas served
- **Key Routes**: Important lines for tourists
- **Ticketing**: How to pay for bus travel
- **Frequency**: How often buses typically run
- **Night Services**: Available late transportation

### Trams/Light Rail
- **Routes**: Where they operate
- **Connectivity**: Connections to other transport
- **Ticketing**: Payment methods

### Ferries/Water Transport
- **Routes**: Available water transportation
- **Schedule**: Frequency and operating times
- **Costs**: Fare information

## Private Transportation

### Taxis
- **Availability**: How easy to find
- **Costs**: Typical fares and tipping expectations
- **Booking**: How to hail or reserve
- **Reputable Companies**: Recommended services

### Ride-sharing
- **Available Services**: Which platforms operate
- **Coverage**: Service areas
- **Costs**: Typical pricing
- **Usage Tips**: How to use effectively

### Rental Options
- **Car Rentals**: Companies and considerations
- **Scooters/Motorcycles**: Rental information
- **Bicycles**: Bike rental and bike share programs
- **Driving Conditions**: What to expect on local roads
- **Parking Information**: Availability and costs

## Transportation Passes
- **Tourist Cards**: Available passes that include transport
- **Day/Week Passes**: Multi-use options
- **Combination Tickets**: Transport + attraction options
- **Cost-Benefit Analysis**: When passes make sense

## Getting Around on Foot
- **Walkable Areas**: Pedestrian-friendly zones
- **Walking Tours**: Self-guided and organized options
- **Safety Considerations**: Areas to be cautious

## Accessibility Information
- Accommodations for travelers with mobility needs
- Wheelchair-accessible transportation options

Would you like more specific information about any of these transportation methods in ${destination}?`;
        }
    }
    
    /**
     * Recommend accommodation based on user input
     * @param {string} userInput - User's input
     * @returns {string} Accommodation recommendations
     */
    recommendAccommodation(userInput) {
        // Default to current destination if available, or extract from input
        const destination = this.state.currentDestination || this.extractDestination(userInput) || "your destination";
        
        // Parse budget from user input if not already set
        if (!this.state.travelBudget) {
            const budget = this.extractBudget(userInput);
            if (budget) {
                this.state.travelBudget = budget;
                this.savePreferences({ travelBudget: budget });
            }
        }
        
        // Format budget string for display
        let budgetLevel = "mid-range";
        if (this.state.travelBudget && this.state.travelBudget.level) {
            budgetLevel = this.state.travelBudget.level;
        }
        
        return `# Accommodation Recommendations for ${destination}

In a complete implementation with an AI model and current accommodation data, I would provide personalized lodging recommendations for ${destination} based on your preferences, budget level (${budgetLevel}), and travel style.

## Best Areas to Stay

### Area 1: [Neighborhood Name]
- **Perfect For**: Type of travelers this suits
- **Atmosphere**: Description of the vibe
- **Convenience**: Proximity to attractions/transport
- **Price Range**: Typical costs in this area
- **Recommended For**: Which of your interests it matches

### Area 2: [Neighborhood Name]
- **Perfect For**: Type of travelers this suits
- **Atmosphere**: Description of the vibe
- **Convenience**: Proximity to attractions/transport
- **Price Range**: Typical costs in this area
- **Recommended For**: Which of your interests it matches

### Area 3: [Neighborhood Name]
- **Perfect For**: Type of travelers this suits
- **Atmosphere**: Description of the vibe
- **Convenience**: Proximity to attractions/transport
- **Price Range**: Typical costs in this area
- **Recommended For**: Which of your interests it matches

## Accommodation Types

### Hotels
- **Luxury Options**: 5-star properties
- **Boutique Choices**: Unique, character-filled options
- **Mid-range Selections**: Good value options
- **Budget-friendly**: Affordable but well-rated
- **Approximate Costs**: Price ranges by category

### Vacation Rentals
- **Apartments**: Areas with good apartment options
- **Houses**: When this makes sense
- **Unique Properties**: Special accommodation options
- **Best Platforms**: Recommended booking sites
- **Considerations**: What to look for in rentals here

### Alternative Options
- **Hostels**: Top-rated options for social travelers
- **Guesthouses/B&Bs**: Local hospitality options
- **Unique Stays**: Special accommodation types in this destination

## Booking Tips
- **When to Book**: Typical booking timeline
- **Seasonal Considerations**: High/low season effects on availability and price
- **Negotiation Possibilities**: When and how to ask for better rates
- **Important Amenities**: Must-have features in this destination

## Accommodation Recommendations by Interest
- **For First-time Visitors**: Best options for newcomers
- **For Families**: Family-friendly accommodations
- **For Luxury Travelers**: Premium experiences
- **For Budget Travelers**: Best value options
- **For Solo Travelers**: Safe, social recommendations

Would you like more specific hotel recommendations or details about a particular area in ${destination}?`;
    }
    
    /**
     * Create a packing list based on user input
     * @param {string} userInput - User's input
     * @returns {string} Packing list
     */
    createPackingList(userInput) {
        // Default to current destination if available, or extract from input
        const destination = this.state.currentDestination || this.extractDestination(userInput) || "your destination";
        
        // Parse dates from user input if not already set
        if (!this.state.travelDates) {
            const dates = this.extractDates(userInput);
            if (dates) {
                this.state.travelDates = dates;
                this.savePreferences({ travelDates: dates });
            }
        }
        
        // Determine season for packing recommendations
        let season = this.state.currentSeason;
        if (this.state.travelDates && this.state.travelDates.seasons && this.state.travelDates.seasons.length > 0) {
            season = this.state.travelDates.seasons[0];
        }
        
        return `# Packing List for ${destination}

In a complete implementation with an AI model and destination-specific information, I would provide a customized packing list for ${destination} during ${season}, taking into account weather conditions, planned activities, and local customs.

## Essentials

### Documentation
${this.travelEssentials.documentation.map(item => `- ${item}`).join('\n')}

### Clothing
- **Basics**:
  - T-shirts/tops appropriate for the season
  - Pants/shorts/skirts suitable for the climate
  - Underwear and socks
  - Sleepwear

- **${this.capitalizeFirstLetter(season)}-Specific Items**:
  - Weather-appropriate clothing
  - Layering options if needed
  - Appropriate footwear for your activities

- **Special Occasion Items**:
  - Dressier outfit if planning to visit upscale restaurants
  - Appropriate attire for religious sites or cultural venues

### Technology
${this.travelEssentials.technology.map(item => `- ${item}`).join('\n')}

### Toiletries
${this.travelEssentials.toiletries.map(item => `- ${item}`).join('\n')}

### Health Items
${this.travelEssentials.health.map(item => `- ${item}`).join('\n')}

### Money & Documents
${this.travelEssentials.finances.map(item => `- ${item}`).join('\n')}

## Destination-Specific Items

### Weather Considerations
- Items needed specifically for the climate in ${destination} during ${season}
- Average temperatures and conditions to expect

### Cultural Considerations
- Appropriate clothing for local customs
- Items needed for specific religious or cultural sites

### Activity-Based Items
- Gear needed for specific planned activities
- Specialized equipment recommendations

## Packing Tips

### Space-Saving Techniques
- Rolling vs. folding clothes
- Packing cubes or compression bags
- Minimalist approaches

### Security Tips
- How to keep valuables safe
- Anti-theft product recommendations

### Weight Considerations
- Luggage weight restrictions for your travel method
- Tips for weighing and distributing items

## What Not to Pack
- Items readily available at your destination
- Prohibited or restricted items
- Unnecessary items that take up space

Would you like additional recommendations for specific activities or situations during your trip to ${destination}?`;
    }
    
    /**
     * Provide food recommendations
     * @param {string} userInput - User's input
     * @returns {string} Food recommendations
     */
    provideFoodRecommendations(userInput) {
        // Default to current destination if available, or extract from input
        const destination = this.state.currentDestination || this.extractDestination(userInput) || "your destination";
        
        return `# Food Guide for ${destination}

In a complete implementation with an AI model and detailed culinary information, I would provide a comprehensive food guide for ${destination}, including traditional dishes, dining recommendations, food experiences, and practical eating tips.

## Must-Try Local Dishes

### Signature Dish 1
- **Description**: What it is and key ingredients
- **Where to Try It**: Best places to experience this dish
- **Price Range**: What to expect to pay
- **Fun Fact**: Interesting history or cultural significance

### Signature Dish 2
- **Description**: What it is and key ingredients
- **Where to Try It**: Best places to experience this dish
- **Price Range**: What to expect to pay
- **Fun Fact**: Interesting history or cultural significance

### Signature Dish 3
- **Description**: What it is and key ingredients
- **Where to Try It**: Best places to experience this dish
- **Price Range**: What to expect to pay
- **Fun Fact**: Interesting history or cultural significance

## Local Beverages
- **Traditional Drinks**: Non-alcoholic specialties
- **Regional Alcohol**: Wine, beer, or spirits of note
- **Cafe Culture**: Coffee or tea traditions
- **Drinking Water**: Safety and availability information

## Dining Experiences

### Restaurant Recommendations
- **High-End Dining**: Special occasion restaurants
- **Mid-Range Options**: Good quality, reasonable prices
- **Budget Eats**: Affordable but authentic options
- **Street Food**: Safe and delicious street vendors

### Culinary Activities
- **Food Tours**: Recommended guided experiences
- **Cooking Classes**: Opportunities to learn local cuisine
- **Markets**: Food markets worth visiting
- **Food Festivals**: Seasonal food events if applicable

## Practical Dining Information

### Dining Customs
- **Tipping Practices**: Local expectations
- **Meal Times**: When locals typically eat
- **Reservation Customs**: Whether booking is necessary
- **Dining Etiquette**: Important cultural norms

### Dietary Restrictions
- **Vegetarian/Vegan Options**: Availability and recommendations
- **Common Allergens**: Prevalent ingredients to watch for
- **Religious Dietary Considerations**: Halal, Kosher, etc.
- **Communicating Restrictions**: Useful phrases for special requests

### Budget Considerations
- **Price Expectations**: General cost of eating out
- **Money-Saving Tips**: How to enjoy the cuisine for less
- **Value Options**: Best quality-to-price ratio experiences

## Food Neighborhoods
- **Culinary Hotspots**: Areas known for great food
- **Hidden Gems**: Less touristy food neighborhoods
- **Food Markets**: Where to shop for ingredients

Would you like specific restaurant recommendations or more information about any particular dish or dining experience in ${destination}?`;
    }
    
    /**
     * Provide budget advice
     * @param {string} userInput - User's input
     * @returns {string} Budget advice
     */
    provideBudgetAdvice(userInput) {
        // Default to current destination if available, or extract from input
        const destination = this.state.currentDestination || this.extractDestination(userInput) || "your destination";
        
        return `# Budget Guide for ${destination}

In a complete implementation with an AI model and current cost data, I would provide detailed budget information for ${destination}, including expense breakdowns, money-saving tips, and cost expectations across different travel styles.

## Cost Overview

### Expense Categories

#### Accommodation
- **Budget**: $X-$Y per night (hostels, guesthouses)
- **Mid-range**: $X-$Y per night (3-star hotels, apartments)
- **Luxury**: $X+ per night (4-5 star hotels, premium rentals)
- **Money-saving tips**: Specific strategies for this destination

#### Food & Drink
- **Budget**: $X-$Y per day (street food, self-catering)
- **Mid-range**: $X-$Y per day (casual restaurants, some nicer meals)
- **High-end**: $X+ per day (upscale dining, fine restaurants)
- **Money-saving tips**: How to eat well for less

#### Transportation
- **Public Transit**: Costs and pass options
- **Taxis/Rideshares**: Typical fares and when worth using
- **Car Rental**: Daily rates and associated costs
- **Money-saving tips**: Transport hacks for this destination

#### Attractions & Activities
- **Free Options**: No-cost experiences
- **Paid Attractions**: Typical entry fees
- **Tours & Experiences**: Price ranges for guided options
- **Money-saving tips**: Discount passes and optimal timing

## Sample Daily Budgets

### Backpacker/Budget Traveler: $X-$Y per day
- Hostel dormitory or budget guesthouse
- Street food and self-catering
- Public transportation
- Free or low-cost activities
- Example daily breakdown

### Mid-range Traveler: $X-$Y per day
- 3-star hotel or private apartment
- Mix of restaurants and casual dining
- Some taxis/rideshares plus public transit
- Paid attractions and occasional tours
- Example daily breakdown

### Luxury Traveler: $X+ per day
- 4-5 star hotels or premium rentals
- Fine dining and upscale restaurants
- Private transportation
- Premium experiences and guided tours
- Example daily breakdown

## Money-Saving Strategies

### Timing Considerations
- **Best Value Season**: When to visit for lower prices
- **Weekly Patterns**: Less expensive days for activities

### Discounts and Deals
- **Tourist Cards**: Available passes and their value
- **Booking Strategies**: When and how to reserve for best rates
- **Group Discounts**: Options for families or groups

### Local Knowledge
- **Eat Where Locals Eat**: Areas with authentic, affordable food
- **Free Experiences**: No-cost cultural and natural attractions
- **Transportation Hacks**: Less obvious ways to get around

## Currency and Payment Information
- Local currency and exchange information
- Card acceptance and ATM availability
- Tipping customs and expectations

Would you like a more detailed breakdown of costs for specific activities or aspects of visiting ${destination}?`;
    }
    
    /**
     * Provide seasonal advice
     * @param {string} userInput - User's input
     * @returns {string} Seasonal advice
     */
    provideSeasonalAdvice(userInput) {
        // Default to current destination if available, or extract from input
        const destination = this.state.currentDestination || this.extractDestination(userInput) || "your destination";
        
        return `# Seasonal Guide to ${destination}

In a complete implementation with an AI model and detailed climate data, I would provide comprehensive seasonal information for ${destination}, including weather patterns, optimal visiting times, and season-specific activities and considerations.

## Seasons Overview

### Spring (Months)
- **Weather**: Temperature ranges and precipitation patterns
- **Crowds**: Visitor levels and atmosphere
- **Costs**: Price trends for accommodation and activities
- **Pros**: Advantages of visiting during this time
- **Cons**: Potential drawbacks or challenges
- **Highlights**: Special events, natural phenomena, and activities

### Summer (Months)
- **Weather**: Temperature ranges and precipitation patterns
- **Crowds**: Visitor levels and atmosphere
- **Costs**: Price trends for accommodation and activities
- **Pros**: Advantages of visiting during this time
- **Cons**: Potential drawbacks or challenges
- **Highlights**: Special events, natural phenomena, and activities

### Fall (Months)
- **Weather**: Temperature ranges and precipitation patterns
- **Crowds**: Visitor levels and atmosphere
- **Costs**: Price trends for accommodation and activities
- **Pros**: Advantages of visiting during this time
- **Cons**: Potential drawbacks or challenges
- **Highlights**: Special events, natural phenomena, and activities

### Winter (Months)
- **Weather**: Temperature ranges and precipitation patterns
- **Crowds**: Visitor levels and atmosphere
- **Costs**: Price trends for accommodation and activities
- **Pros**: Advantages of visiting during this time
- **Cons**: Potential drawbacks or challenges
- **Highlights**: Special events, natural phenomena, and activities

## Best Time to Visit

### For Good Weather
Optimal months for comfortable climate conditions

### For Fewer Crowds
Best periods to avoid high tourist seasons

### For Lower Prices
Most economical times to visit

### For Specific Activities
- **Outdoor Adventures**: Best timing for specific activities
- **Cultural Events**: Key festivals and celebrations
- **Natural Phenomena**: Wildlife viewing, natural events, etc.

## Month-by-Month Guide
Brief overview of what to expect each month of the year

## Packing Recommendations by Season
Clothing and gear advice for each time of year

## Seasonal Considerations

### Holiday Periods
How local holidays affect travel experience

### Shoulder Seasons
Details on these transition periods between peak and off-seasons

### Extreme Weather Considerations
Information about potential severe weather patterns

Would you like more detailed information about visiting ${destination} during a specific season or month?`;
    }
    
    /**
     * Provide safety information
     * @param {string} userInput - User's input
     * @returns {string} Safety information
     */
    provideSafetyInformation(userInput) {
        // Default to current destination if available, or extract from input
        const destination = this.state.currentDestination || this.extractDestination(userInput) || "your destination";
        
        return `# Safety Guide for ${destination}

In a complete implementation with an AI model and current safety information, I would provide comprehensive safety advice for traveling to and within ${destination}, including health considerations, crime awareness, emergency services, and general precautions.

## Overall Safety Assessment
- General safety level compared to other destinations
- Recent developments affecting safety
- Areas of concern vs. areas of minimal risk

## Health & Medical Information

### Health Risks
- Common illnesses or health concerns
- Required or recommended vaccinations
- Water and food safety considerations

### Medical Services
- Quality and accessibility of healthcare
- Locations of major hospitals and clinics
- Availability of English-speaking medical staff

### Health Insurance
- Recommendations for travel health insurance
- Coverage considerations for this destination
- Emergency evacuation information if relevant

## Crime & Security

### Areas of Caution
- Neighborhoods to avoid or exercise extra caution
- Times of day when extra vigilance is advised
- Specific locations with higher risk

### Common Issues
- Typical scams targeting tourists
- Petty crime patterns and prevention
- Transportation safety concerns

### Security Recommendations
- Safe practices for this specific destination
- Personal belongings and valuables advice
- Digital security considerations

## Emergency Information

### Important Contacts
- Local emergency numbers
- Embassy/consulate information
- Tourist police contacts if available

### Natural Hazards
- Potential natural disasters and seasons
- Warning systems in place
- Evacuation procedures if applicable

### Emergency Phrases
- Key local language phrases for emergencies
- How to ask for help or assistance

## Safety Tips for Specific Travelers

### Solo Travelers
- Specific advice for those traveling alone
- Recommended accommodations and areas
- Socializing safely

### Family Travel
- Child safety considerations
- Family-friendly areas and accommodations
- Child-specific health considerations

### LGBTQ+ Travelers
- Local attitudes and legal considerations
- LGBTQ+-friendly establishments and areas
- Safety recommendations

### Women Travelers
- Specific considerations for women
- Cultural expectations regarding dress and behavior
- Areas and times with additional considerations

## Transportation Safety
- Road safety information
- Public transit security considerations
- Taxi and rideshare safety tips

## Staying Informed
- Reliable local news sources
- Government travel advisories
- Apps and resources for safety updates

Remember that most visits to ${destination} are trouble-free, and these precautions are to help you have the safest and most enjoyable experience possible.

Would you like more specific safety information about a particular aspect of traveling to ${destination}?`;
    }
    
    /**
     * Provide cultural insights
     * @param {string} userInput - User's input
     * @returns {string} Cultural insights
     */
    provideCulturalInsights(userInput) {
        // Default to current destination if available, or extract from input
        const destination = this.state.currentDestination || this.extractDestination(userInput) || "your destination";
        
        return `# Cultural Guide to ${destination}

In a complete implementation with an AI model and detailed cultural information, I would provide comprehensive insights into the culture, customs, etiquette, and traditions of ${destination} to help you navigate local interactions respectfully and meaningfully.

## Cultural Overview
- Brief history and cultural influences
- Major ethnic groups and languages
- Religious and philosophical traditions
- Core values and societal norms

## Etiquette & Customs

### Greetings & Interactions
- Appropriate ways to greet locals
- Personal space expectations
- Physical contact norms
- Eye contact and body language
- Business etiquette if relevant

### Dining Customs
- Table manners and dining expectations
- Meal structures and timing
- Tipping practices
- Drinking customs and toasting
- Common courtesies around food

### Dress Code
- Appropriate attire for different settings
- Religious site dress requirements
- Conservative vs. liberal areas
- Seasonal considerations

### Religious & Cultural Sensitivities
- Sacred sites and respectful behavior
- Photography restrictions
- Topics to avoid in conversation
- Important cultural symbols

## Language

### Key Phrases
- Essential greetings and expressions
- Thank you and please
- Basic navigation phrases
- Emergency expressions
- Pronunciation tips

### Communication Style
- Direct vs. indirect communication
- Humor and its role
- Negotiation approaches
- Non-verbal communication cues

## Cultural Experiences

### Festivals & Celebrations
- Major holidays and events
- Seasonal celebrations
- Participation opportunities for visitors

### Arts & Entertainment
- Traditional art forms
- Music and dance
- Theater and performance
- Contemporary cultural scene

### Culinary Traditions
- Food's role in the culture
- Significant dishes and their meaning
- Eating customs and food symbolism

## Gift Giving
- Appropriate and inappropriate gifts
- Gift-giving occasions
- Presentation customs

## Cultural Do's and Don'ts
- Quick reference list of key practices to observe or avoid

## Cultural Immersion Opportunities
- Recommended experiences for deeper cultural understanding
- Respectful ways to engage with local communities
- Ethical tourism considerations

Understanding and respecting local customs enhances your travel experience and shows appreciation for the culture you're visiting. Small gestures of cultural awareness are often deeply appreciated by locals.

Would you like more detailed information about a specific aspect of ${destination}'s culture?`;
    }
    
    /**
     * Provide visa and documentation information
     * @param {string} userInput - User's input
     * @returns {string} Visa information
     */
    provideVisaInformation(userInput) {
        // Default to current destination if available, or extract from input
        const destination = this.state.currentDestination || this.extractDestination(userInput) || "your destination";
        
        return `# Visa & Entry Requirements for ${destination}

In a complete implementation with an AI model and current immigration data, I would provide detailed information about visa requirements, entry procedures, and necessary documentation for traveling to ${destination} based on your nationality and travel purpose.

## Entry Requirements Overview
- Visa-free access availability and conditions
- Types of visas available
- General eligibility criteria
- Recent changes to entry policies

## Visa Types

### Tourist Visa
- Application requirements
- Processing time
- Duration of stay permitted
- Cost and payment methods
- Single vs. multiple entry options

### Business Visa
- Additional requirements beyond tourist visa
- Invitation letter specifications
- Duration and limitations
- Application process differences

### Other Visa Categories
- Work visa basics
- Student visa information
- Transit visa requirements
- Special visa types if applicable

## Application Process

### Where to Apply
- Embassy/consulate locations
- Online application availability
- Third-party visa services
- Application at border/on arrival if available

### Required Documents
- Passport requirements (validity period)
- Application forms
- Photo specifications
- Proof of accommodation
- Proof of funds/financial stability
- Return ticket requirements
- Additional supporting documents

### Processing Information
- Typical processing times
- Express options if available
- Tracking application status
- Interview requirements if applicable

## Entry Procedures

### At the Border/Airport
- Immigration process
- What to expect at customs
- Declaration requirements
- Import restrictions
- Currency regulations

### Duration of Stay
- Standard allowance with your visa type
- Extension possibilities
- Overstay penalties

## Special Considerations

### Vaccination Requirements
- Required and recommended vaccinations
- Yellow fever certificate if applicable
- COVID-19 related requirements

### Travel Restrictions
- Entry restrictions by nationality
- Criminal record implications
- Previous visit considerations
- Border crossing limitations

Remember that visa requirements can change frequently. While this information is a guide, I always recommend verifying current requirements with the official embassy or consulate website for ${destination} before planning your trip.

Would you like more specific visa information based on your nationality or purpose of travel to ${destination}?`;
    }
    
    /**
     * Provide general destination information
     * @param {string} userInput - User's input
     * @returns {string} Destination information
     */
    provideDestinationInformation(userInput) {
        // Default to current destination if available, or extract from input
        const destination = this.state.currentDestination || this.extractDestination(userInput) || "your destination";
        
        return `# Travel Guide to ${destination}

In a complete implementation with an AI model and comprehensive destination data, I would provide detailed information about ${destination} including attractions, practical travel tips, cultural insights, and planning essentials.

## Destination Overview
- Geographic location and basic facts
- Cultural significance and historical context
- Current atmosphere and general appeal
- Best known for and unique characteristics

## Top Attractions & Experiences

### Must-See Sights
- Iconic landmarks and attractions
- Cultural institutions
- Natural wonders
- Historical sites

### Unique Experiences
- Destination-specific activities
- Local specialties and experiences
- Off-the-beaten-path recommendations
- Seasonal opportunities

### Day Trips
- Nearby destinations worth visiting
- How to get there and time required
- Highlights of each

## Practical Information

### Best Time to Visit
- Climate and seasonal considerations
- High and low tourist seasons
- Special events and festivals
- Ideal duration of stay

### Getting There & Around
- Major transportation hubs
- Local transportation options
- Navigation tips
- Walking information

### Accommodation
- Popular areas to stay
- Types of lodging available
- Price ranges and expectations
- Booking recommendations

### Dining
- Local cuisine highlights
- Restaurant districts
- Price expectations
- Dining customs

## Travel Planning Essentials

### Budgeting
- Cost level relative to other destinations
- Sample expenses for different travel styles
- Money-saving tips

### Safety
- Overall safety assessment
- Areas to exercise caution
- Common tourist concerns
- Emergency contacts

### Cultural Considerations
- Local customs and etiquette
- Dress code information
- Language basics
- Cultural sensitivities

### Practical Tips
- Currency and payment information
- Electricity and adapters
- Internet and connectivity
- Business hours and holidays

## Suggested Itineraries
- Highlights for different trip durations
- Themed exploration routes
- Seasonal itinerary adaptations

Would you like more specific information about any aspect of traveling to ${destination}?`;
    }
    
    /**
     * Get travel suggestions based on user interaction
     * @param {string} requestType - Type of travel request
     * @returns {Array<string>} Travel suggestions
     */
    getTravelSuggestions(requestType) {
        const suggestions = [];
        const destination = this.state.currentDestination;
        
        // Add type-specific suggestions
        if (requestType === "destination_recommendation") {
            suggestions.push(`What's the best time to visit ${destination || "Europe"}?`);
            suggestions.push("Budget-friendly destinations for families");
            suggestions.push("Best places for adventure travel");
        } else if (requestType === "itinerary_planning" && destination) {
            suggestions.push(`Top things to do in ${destination}`);
            suggestions.push(`Is 3 days enough for ${destination}?`);
            suggestions.push(`Best day trips from ${destination}`);
        } else if (requestType === "transportation" && destination) {
            suggestions.push(`How to get around ${destination}`);
            suggestions.push(`Is public transportation good in ${destination}?`);
            suggestions.push(`Car rental advice for ${destination}`);
        } else if (requestType === "accommodation" && destination) {
            suggestions.push(`Best neighborhoods to stay in ${destination}`);
            suggestions.push(`Affordable hotels in ${destination}`);
            suggestions.push(`Is Airbnb a good option in ${destination}?`);
        } else if (requestType === "packing") {
            suggestions.push(`What should I pack for ${destination || "a beach vacation"}?`);
            suggestions.push("Essential travel gadgets for international travel");
            suggestions.push("Packing light tips for a two-week trip");
        } else if (requestType === "food" && destination) {
            suggestions.push(`Must-try foods in ${destination}`);
            suggestions.push(`Best restaurants in ${destination}`);
            suggestions.push(`Food markets in ${destination}`);
        } else if (requestType === "budget" && destination) {
            suggestions.push(`How expensive is ${destination}?`);
            suggestions.push(`Budget tips for ${destination}`);
            suggestions.push(`Daily costs in ${destination}`);
        } else if (requestType === "seasonal" && destination) {
            suggestions.push(`Best time of year to visit ${destination}`);
            suggestions.push(`Weather in ${destination} in summer`);
            suggestions.push(`${destination} during holiday season`);
        } else if (requestType === "safety" && destination) {
            suggestions.push(`Is ${destination} safe for solo travelers?`);
            suggestions.push(`Health concerns in ${destination}`);
            suggestions.push(`Areas to avoid in ${destination}`);
        } else if (requestType === "cultural" && destination) {
            suggestions.push(`Cultural customs in ${destination}`);
            suggestions.push(`Do I need to tip in ${destination}?`);
            suggestions.push(`Dress code for ${destination}`);
        } else if (requestType === "visa" && destination) {
            suggestions.push(`Visa requirements for ${destination}`);
            suggestions.push(`Do I need a passport for ${destination}?`);
            suggestions.push(`Customs regulations for ${destination}`);
        } else if (destination) {
            suggestions.push(`What is ${destination} known for?`);
            suggestions.push(`Best time to visit ${destination}`);
            suggestions.push(`Things to do in ${destination}`);
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "Best travel insurance for international trips",
                "How to avoid jet lag",
                "Most underrated travel destinations",
                "Travel photography tips",
                "How to learn basic phrases for travel",
                "Best travel apps to download",
                "Solo travel safety tips"
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
     * Utility function to capitalize first letter of each word
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalizeFirstLetter(str) {
        if (!str) return '';
        return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
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
                'jaat-mode11-preferences',
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
            localStorage.removeItem('jaat-mode11-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Add a destination to saved destinations
     * @param {string} destination - Destination to save
     * @returns {boolean} Success status
     */
    saveDestination(destination) {
        if (!destination) return false;
        
        // Check if already saved
        if (!this.state.savedDestinations.includes(destination)) {
            // Check if we're at the limit
            if (this.state.savedDestinations.length >= this.constants.MAX_SAVED_DESTINATIONS) {
                // Remove oldest destination
                this.state.savedDestinations.shift();
            }
            
            // Add new destination
            this.state.savedDestinations.push(destination);
            this.savePreferences({ savedDestinations: this.state.savedDestinations });
            return true;
        }
        
        return false; // Already saved
    }
    
    /**
     * Remove a destination from saved destinations
     * @param {string} destination - Destination to remove
     * @returns {boolean} Success status
     */
    removeDestination(destination) {
        if (!destination) return false;
        
        const index = this.state.savedDestinations.indexOf(destination);
        if (index !== -1) {
            this.state.savedDestinations.splice(index, 1);
            this.savePreferences({ savedDestinations: this.state.savedDestinations });
            return true;
        }
        
        return false; // Not in saved destinations
    }
    
    /**
     * Record a visited destination
     * @param {string} destination - Visited destination
     * @param {string} date - Visit date
     * @returns {boolean} Success status
     */
    recordVisit(destination, date = null) {
        if (!destination) return false;
        
        this.state.travelHistory.push({
            destination: destination,
            date: date || new Date().toISOString().split('T')[0]
        });
        
        this.savePreferences({ travelHistory: this.state.travelHistory });
        return true;
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
            currentDestination: this.state.currentDestination,
            travelDates: this.state.travelDates,
            travelBudget: this.state.travelBudget,
            travelInterests: this.state.travelInterests,
            savedDestinations: this.state.savedDestinations.length,
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
    window.jaatAIModes.travelGuide = new TravelGuideMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TravelGuideMode;
}
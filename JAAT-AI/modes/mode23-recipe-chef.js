/**
 * JAAT-AI Recipe Chef Mode
 * AI mode specialized in culinary guidance, recipe creation, and cooking tips
 * Mode ID: 14
 */

class RecipeChefMode {
    constructor() {
        // Mode metadata
        this.id = "14";
        this.name = "Recipe Chef";
        this.description = "Your AI culinary companion for recipes, cooking techniques, and meal planning";
        this.icon = "ri-restaurant-line";
        this.color = "#f97316"; // Orange color
        this.category = "lifestyle";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 3000,
            responseSpeed: "moderate", // fast, moderate, detailed
            personalityLevel: 7, // 1-10 scale (higher = more personality)
            creativityLevel: 8, // 1-10 scale
            formalityLevel: 3, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            nutritionalAwarenessEnabled: true,
            dietaryAwarenessEnabled: true,
            ingredientSubstitutionEnabled: true
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            dietaryRestrictions: [], // vegetarian, vegan, gluten-free, etc.
            allergies: [], // nuts, dairy, shellfish, etc.
            dislikedIngredients: [],
            favoriteIngredients: [],
            cookingSkillLevel: "intermediate", // beginner, intermediate, advanced
            kitchenEquipment: ["oven", "stovetop", "microwave", "blender"], // default equipment
            savedRecipes: [],
            mealPlans: [],
            sessionStartTime: new Date(),
            responseCount: 0,
            preferredCuisines: []
        };
        
        // Cuisine types
        this.cuisineTypes = [
            "Italian", "French", "Chinese", "Japanese", "Indian", 
            "Mexican", "Thai", "Mediterranean", "American", "Spanish",
            "Korean", "Vietnamese", "Greek", "Lebanese", "Turkish",
            "Brazilian", "Moroccan", "Ethiopian", "German", "British",
            "Cajun", "Caribbean", "Russian", "Peruvian", "Malaysian"
        ];
        
        // Meal types
        this.mealTypes = [
            "Breakfast", "Brunch", "Lunch", "Dinner", "Snack", 
            "Appetizer", "Soup", "Salad", "Main Course", "Side Dish",
            "Dessert", "Drink", "Smoothie", "Baked Goods", "Sandwich"
        ];
        
        // Common dietary restrictions
        this.dietaryRestrictions = {
            "vegetarian": "No meat, fish, or seafood",
            "vegan": "No animal products including meat, dairy, eggs, and honey",
            "pescatarian": "Vegetarian diet plus fish and seafood",
            "gluten-free": "No wheat, barley, rye, or their derivatives",
            "dairy-free": "No milk or milk products",
            "nut-free": "No nuts including peanuts and tree nuts",
            "keto": "Very low carb, high fat, moderate protein",
            "paleo": "Focus on whole foods, avoiding processed foods, grains, legumes, and dairy",
            "low-carb": "Reduced intake of carbohydrates, especially refined ones",
            "low-fat": "Reduced intake of fats, especially saturated fats",
            "low-sodium": "Reduced salt/sodium intake",
            "low-sugar": "Reduced intake of added sugars",
            "halal": "Follows Islamic dietary laws",
            "kosher": "Follows Jewish dietary laws",
            "egg-free": "No eggs or egg derivatives",
            "soy-free": "No soy or soy derivatives",
            "shellfish-free": "No shellfish"
        };
        
        // Common allergens
        this.commonAllergens = [
            "Dairy", "Eggs", "Peanuts", "Tree nuts", "Fish", 
            "Shellfish", "Wheat", "Soy", "Sesame"
        ];
        
        // Basic ingredient categories
        this.ingredientCategories = {
            "proteins": [
                "Chicken", "Beef", "Pork", "Tofu", "Tempeh", 
                "Eggs", "Beans", "Lentils", "Fish", "Shrimp",
                "Turkey", "Lamb", "Chickpeas", "Quinoa", "Greek yogurt"
            ],
            "vegetables": [
                "Tomatoes", "Spinach", "Broccoli", "Carrots", "Onions", 
                "Garlic", "Bell peppers", "Zucchini", "Mushrooms", "Potatoes",
                "Sweet potatoes", "Kale", "Cauliflower", "Cabbage", "Lettuce",
                "Cucumber", "Asparagus", "Green beans", "Corn", "Peas"
            ],
            "fruits": [
                "Apples", "Bananas", "Oranges", "Berries", "Grapes", 
                "Lemons", "Limes", "Avocados", "Pineapple", "Mango",
                "Peaches", "Pears", "Cherries", "Watermelon", "Kiwi"
            ],
            "grains": [
                "Rice", "Pasta", "Bread", "Quinoa", "Oats", 
                "Barley", "Couscous", "Bulgur", "Cornmeal", "Farro",
                "Brown rice", "Whole wheat flour", "Buckwheat", "Millet", "Polenta"
            ],
            "dairy": [
                "Milk", "Cheese", "Yogurt", "Butter", "Cream", 
                "Sour cream", "Cottage cheese", "Ricotta", "Parmesan", "Mozzarella",
                "Cheddar", "Feta", "Cream cheese", "Buttermilk", "Half and half"
            ],
            "herbs_spices": [
                "Basil", "Cilantro", "Parsley", "Thyme", "Rosemary", 
                "Oregano", "Cumin", "Paprika", "Cinnamon", "Ginger",
                "Black pepper", "Cayenne", "Turmeric", "Coriander", "Mint",
                "Dill", "Chili powder", "Cardamom", "Nutmeg", "Bay leaves"
            ],
            "pantry_staples": [
                "Olive oil", "Vegetable oil", "Vinegar", "Soy sauce", "Salt", 
                "Sugar", "Flour", "Canned tomatoes", "Stock/broth", "Honey",
                "Maple syrup", "Dijon mustard", "Hot sauce", "Worcestershire sauce", "Coconut milk",
                "Peanut butter", "Nuts", "Dried fruits", "Baking soda", "Baking powder"
            ]
        };
        
        // Common cooking techniques
        this.cookingTechniques = {
            "basic": [
                "Boiling", "Steaming", "Sautéing", "Baking", "Roasting", 
                "Grilling", "Stir-frying", "Simmering", "Microwaving", "Toasting"
            ],
            "intermediate": [
                "Braising", "Blanching", "Poaching", "Broiling", "Pan-searing", 
                "Deep-frying", "Deglazing", "Marinating", "Pickling", "Fermenting"
            ],
            "advanced": [
                "Sous vide", "Smoking", "Pressure cooking", "Confit", "Flambéing", 
                "Tempering", "Curing", "Emulsifying", "Clarifying", "Reduction"
            ]
        };
        
        // Common kitchen measurement conversions
        this.measurementConversions = {
            "volume": {
                "1 tablespoon": "3 teaspoons",
                "1/4 cup": "4 tablespoons",
                "1/3 cup": "5 tablespoons + 1 teaspoon",
                "1/2 cup": "8 tablespoons",
                "2/3 cup": "10 tablespoons + 2 teaspoons",
                "3/4 cup": "12 tablespoons",
                "1 cup": "16 tablespoons",
                "1 fluid ounce": "2 tablespoons",
                "1 cup": "8 fluid ounces",
                "1 pint": "2 cups",
                "1 quart": "4 cups",
                "1 gallon": "4 quarts"
            },
            "weight": {
                "1 ounce": "28.35 grams",
                "1 pound": "16 ounces",
                "1 pound": "453.6 grams",
                "1 kilogram": "2.2 pounds"
            },
            "temperature": {
                "Freezing point (water)": "32°F = 0°C",
                "Room temperature": "68-72°F = 20-22°C",
                "Boiling point (water)": "212°F = 100°C",
                "°F to °C": "°C = (°F - 32) × 5/9",
                "°C to °F": "°F = (°C × 9/5) + 32"
            },
            "common_baking_weights": {
                "1 cup all-purpose flour": "120-125 grams",
                "1 cup granulated sugar": "200 grams",
                "1 cup brown sugar (packed)": "220 grams",
                "1 cup butter": "227 grams",
                "1 cup milk": "240 grams",
                "1 large egg": "50 grams",
                "1 cup chocolate chips": "170 grams",
                "1 cup nuts (chopped)": "120-140 grams"
            }
        };
        
        // Ingredient substitutions
        this.ingredientSubstitutions = {
            "butter": [
                "Olive oil (for cooking)",
                "Coconut oil",
                "Applesauce (for baking)",
                "Greek yogurt (for baking)",
                "Avocado (for baking)",
                "Nut butters (for baking)"
            ],
            "eggs": [
                "Applesauce (1/4 cup per egg)",
                "Mashed banana (1/2 banana per egg)",
                "Flaxseed meal + water (1 tbsp + 3 tbsp water per egg)",
                "Chia seeds + water (1 tbsp + 3 tbsp water per egg)",
                "Silken tofu (1/4 cup per egg)",
                "Commercial egg replacer"
            ],
            "milk": [
                "Almond milk",
                "Soy milk",
                "Oat milk",
                "Coconut milk",
                "Cashew milk",
                "Rice milk"
            ],
            "cream": [
                "Coconut cream",
                "Silken tofu blended with soy milk",
                "Cashew cream",
                "Greek yogurt diluted with milk",
                "Evaporated milk"
            ],
            "cheese": [
                "Nutritional yeast (for flavor)",
                "Plant-based cheese alternatives",
                "Tofu (for softer cheeses)",
                "Cashew cheese",
                "Miso paste (for umami flavor)"
            ],
            "flour": [
                "Almond flour",
                "Coconut flour",
                "Rice flour",
                "Gluten-free flour blend",
                "Oat flour",
                "Chickpea flour"
            ],
            "sugar": [
                "Honey",
                "Maple syrup",
                "Coconut sugar",
                "Stevia",
                "Dates/date paste",
                "Applesauce"
            ],
            "soy sauce": [
                "Coconut aminos",
                "Tamari (gluten-free)",
                "Liquid aminos",
                "Fish sauce (non-vegan)",
                "Worcestershire sauce (non-vegan)"
            ]
        };
        
        // Basic recipe templates
        this.recipeTemplates = {
            "stir_fry": {
                name: "Basic Stir Fry",
                category: "Main Course",
                servings: 4,
                prepTime: 15,
                cookTime: 10,
                ingredients: [
                    "2 tablespoons cooking oil",
                    "1 pound protein (chicken, beef, tofu, etc.)",
                    "3 cups mixed vegetables, chopped",
                    "2 cloves garlic, minced",
                    "1 tablespoon ginger, minced",
                    "3 tablespoons sauce (soy sauce, teriyaki, etc.)",
                    "2 cups cooked rice or noodles to serve"
                ],
                instructions: [
                    "Prepare your protein by cutting into bite-sized pieces.",
                    "Chop all vegetables into similar-sized pieces for even cooking.",
                    "Heat oil in a wok or large skillet over high heat.",
                    "Add protein and cook until nearly done, then remove and set aside.",
                    "Add more oil if needed, then add vegetables, starting with the firmest ones first.",
                    "When vegetables are nearly tender, add garlic and ginger, stirring constantly.",
                    "Return protein to the pan, add sauce, and toss everything together.",
                    "Cook for another 1-2 minutes until everything is hot and well-coated.",
                    "Serve over rice or noodles."
                ],
                tips: [
                    "Cut all ingredients to similar sizes for even cooking.",
                    "Cook over high heat and keep ingredients moving constantly.",
                    "Add vegetables in order of cooking time - hardest first.",
                    "Have all ingredients prepped before starting to cook."
                ]
            },
            "soup": {
                name: "Basic Soup",
                category: "Soup",
                servings: 6,
                prepTime: 15,
                cookTime: 30,
                ingredients: [
                    "2 tablespoons cooking oil or butter",
                    "1 onion, diced",
                    "2 cloves garlic, minced",
                    "2 cups vegetables, chopped",
                    "6 cups broth (vegetable, chicken, etc.)",
                    "1 teaspoon dried herbs (thyme, oregano, etc.)",
                    "1 bay leaf",
                    "Salt and pepper to taste",
                    "Optional: 1 cup protein (beans, chicken, etc.)",
                    "Optional: 1 cup grains or pasta"
                ],
                instructions: [
                    "Heat oil in a large pot over medium heat.",
                    "Add onion and cook until softened, about 5 minutes.",
                    "Add garlic and cook for 30 seconds until fragrant.",
                    "Add vegetables and cook for 5 minutes.",
                    "Pour in broth, add herbs, bay leaf, salt, and pepper.",
                    "If using protein and/or grains, add them now.",
                    "Bring to a boil, then reduce heat and simmer until all ingredients are cooked through, about 20-30 minutes.",
                    "Adjust seasoning to taste.",
                    "Remove bay leaf before serving."
                ],
                tips: [
                    "Sauté aromatics (onion, garlic) first to build flavor.",
                    "Use homemade stock when possible for better flavor.",
                    "Add pasta or rice near the end of cooking to prevent overcooking.",
                    "For creamy soups, blend some or all of the soup."
                ]
            },
            "salad": {
                name: "Basic Salad",
                category: "Salad",
                servings: 4,
                prepTime: 15,
                cookTime: 0,
                ingredients: [
                    "6 cups leafy greens",
                    "1 cup protein (chicken, tofu, beans, etc.)",
                    "2 cups mixed vegetables, chopped",
                    "1/4 cup nuts or seeds",
                    "1/4 cup cheese (optional)",
                    "1/4 cup dressing",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Wash and dry leafy greens, then place them in a large bowl.",
                    "Prepare protein as needed (cook chicken, drain beans, etc.).",
                    "Chop vegetables into bite-sized pieces.",
                    "Add protein, vegetables, nuts/seeds, and cheese to the greens.",
                    "Drizzle with dressing just before serving.",
                    "Toss everything together until well-coated.",
                    "Season with salt and pepper to taste."
                ],
                tips: [
                    "Dry greens thoroughly to help dressing adhere better.",
                    "Add a mix of textures for interest: crunchy, soft, chewy.",
                    "Dress the salad just before serving to prevent wilting.",
                    "For meal prep, keep dressing separate until ready to eat."
                ]
            },
            "pasta": {
                name: "Basic Pasta Dish",
                category: "Main Course",
                servings: 4,
                prepTime: 10,
                cookTime: 20,
                ingredients: [
                    "12 oz (340g) pasta",
                    "2 tablespoons olive oil",
                    "3 cloves garlic, minced",
                    "1 onion, diced",
                    "1 protein source (optional)",
                    "1-2 cups vegetables (optional)",
                    "2 cups sauce (tomato, cream, etc.)",
                    "1/4 cup grated cheese (optional)",
                    "2 tablespoons fresh herbs (optional)",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Bring a large pot of salted water to a boil.",
                    "Cook pasta according to package directions until al dente.",
                    "Meanwhile, heat olive oil in a large skillet over medium heat.",
                    "Add garlic and onion, cook until softened.",
                    "If using protein and/or vegetables, add them now and cook appropriately.",
                    "Add sauce and simmer for 5-10 minutes.",
                    "Drain pasta, reserving 1/4 cup of pasta water.",
                    "Add pasta to the sauce, along with a splash of pasta water.",
                    "Toss everything together until pasta is well-coated.",
                    "Serve topped with cheese and fresh herbs if using."
                ],
                tips: [
                    "Salt pasta water well - it should taste like seawater.",
                    "Cook pasta just until al dente - it will cook more in the sauce.",
                    "Save some pasta water - the starch helps sauce adhere to pasta.",
                    "Finish cooking pasta in the sauce for better flavor integration."
                ]
            },
            "roasted_vegetables": {
                name: "Basic Roasted Vegetables",
                category: "Side Dish",
                servings: 4,
                prepTime: 10,
                cookTime: 25,
                ingredients: [
                    "4-6 cups vegetables, cut into even pieces",
                    "2-3 tablespoons olive oil",
                    "2-3 cloves garlic, minced (optional)",
                    "1-2 teaspoons dried herbs or spices",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Preheat oven to 425°F (220°C).",
                    "Prepare vegetables by washing and cutting into even-sized pieces.",
                    "Place vegetables in a large bowl.",
                    "Add olive oil, garlic, herbs/spices, salt, and pepper.",
                    "Toss until vegetables are evenly coated.",
                    "Spread vegetables in a single layer on a baking sheet.",
                    "Roast for 20-30 minutes, stirring halfway through, until vegetables are tender and caramelized.",
                    "Serve hot or at room temperature."
                ],
                tips: [
                    "Cut vegetables into uniform sizes for even cooking.",
                    "Don't overcrowd the pan - use two if necessary.",
                    "Higher temperatures create better caramelization.",
                    "Different vegetables have different cooking times - start firm vegetables earlier."
                ]
            }
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Give me a simple pasta recipe",
            "How do I make chicken stir fry?",
            "What can I cook with chicken, rice, and broccoli?",
            "Suggest a quick vegetarian dinner",
            "What are some gluten-free breakfast ideas?",
            "How do I properly chop an onion?",
            "Share a recipe for chocolate chip cookies",
            "What's a good substitute for eggs in baking?",
            "How long should I cook a medium-rare steak?",
            "Give me a meal plan for a week"
        ];
        
        // Special features
        this.features = {
            recipeCreation: true,
            mealPlanning: true,
            cookingTechniques: true,
            ingredientSubstitution: true,
            nutritionalGuidance: true,
            cuisineExploration: true,
            dietaryAccommodation: true,
            kitchenTips: true,
            foodStorage: true,
            seasonalCooking: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 30,
            DISCLAIMER: "For food safety, always ensure meats and seafood are cooked to proper internal temperatures. If you have severe allergies or dietary restrictions, please verify ingredient safety independently.",
            GREETING_PHRASES: [
                "Ready to cook up something delicious? How can I help in the kitchen today?",
                "Hungry for some culinary inspiration? What would you like to make?",
                "Your personal chef assistant is here! What are we cooking today?",
                "Looking for recipe ideas or cooking tips? I'm here to help!",
                "Craving something special? Let me know how I can assist with your cooking needs!"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Recipe Chef mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set dietary restrictions if provided
        if (options.dietaryRestrictions && Array.isArray(options.dietaryRestrictions)) {
            this.state.dietaryRestrictions = options.dietaryRestrictions;
        }
        
        // Set allergies if provided
        if (options.allergies && Array.isArray(options.allergies)) {
            this.state.allergies = options.allergies;
        }
        
        // Set cooking skill level if provided
        if (options.cookingSkillLevel) {
            this.state.cookingSkillLevel = options.cookingSkillLevel;
        }
        
        // Set kitchen equipment if provided
        if (options.kitchenEquipment && Array.isArray(options.kitchenEquipment)) {
            this.state.kitchenEquipment = options.kitchenEquipment;
        }
        
        // Set preferred cuisines if provided
        if (options.preferredCuisines && Array.isArray(options.preferredCuisines)) {
            this.state.preferredCuisines = options.preferredCuisines;
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode14-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Recipe Chef mode");
                
                // Load dietary restrictions if saved
                if (this.state.userPreferences.dietaryRestrictions) {
                    this.state.dietaryRestrictions = this.state.userPreferences.dietaryRestrictions;
                }
                
                // Load allergies if saved
                if (this.state.userPreferences.allergies) {
                    this.state.allergies = this.state.userPreferences.allergies;
                }
                
                // Load disliked ingredients if saved
                if (this.state.userPreferences.dislikedIngredients) {
                    this.state.dislikedIngredients = this.state.userPreferences.dislikedIngredients;
                }
                
                // Load favorite ingredients if saved
                if (this.state.userPreferences.favoriteIngredients) {
                    this.state.favoriteIngredients = this.state.userPreferences.favoriteIngredients;
                }
                
                // Load cooking skill level if saved
                if (this.state.userPreferences.cookingSkillLevel) {
                    this.state.cookingSkillLevel = this.state.userPreferences.cookingSkillLevel;
                }
                
                // Load kitchen equipment if saved
                if (this.state.userPreferences.kitchenEquipment) {
                    this.state.kitchenEquipment = this.state.userPreferences.kitchenEquipment;
                }
                
                // Load saved recipes if saved
                if (this.state.userPreferences.savedRecipes) {
                    this.state.savedRecipes = this.state.userPreferences.savedRecipes;
                }
                
                // Load meal plans if saved
                if (this.state.userPreferences.mealPlans) {
                    this.state.mealPlans = this.state.userPreferences.mealPlans;
                }
                
                // Load preferred cuisines if saved
                if (this.state.userPreferences.preferredCuisines) {
                    this.state.preferredCuisines = this.state.userPreferences.preferredCuisines;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode14-history');
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
        
        console.log(`Recipe Chef mode initialized with ${this.state.dietaryRestrictions.length} dietary restrictions and ${this.state.allergies.length} allergies`);
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
     * Process user input and generate a recipe chef response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with culinary guidance
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your culinary assistant. I can help with recipes, cooking techniques, ingredient substitutions, meal planning, and more. What would you like to cook today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing recipe chef request`);
        
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
        
        // Detect type of culinary request
        const requestType = this.detectRequestType(userInput);
        
        // Extract dietary preferences if present
        const dietaryRestrictions = this.extractDietaryRestrictions(userInput);
        if (dietaryRestrictions && dietaryRestrictions.length > 0) {
            // Add new restrictions without duplicates
            const combinedRestrictions = [...this.state.dietaryRestrictions];
            for (const restriction of dietaryRestrictions) {
                if (!combinedRestrictions.includes(restriction)) {
                    combinedRestrictions.push(restriction);
                }
            }
            this.state.dietaryRestrictions = combinedRestrictions;
            this.savePreferences({ dietaryRestrictions: combinedRestrictions });
        }
        
        // Extract allergies if present
        const allergies = this.extractAllergies(userInput);
        if (allergies && allergies.length > 0) {
            // Add new allergies without duplicates
            const combinedAllergies = [...this.state.allergies];
            for (const allergy of allergies) {
                if (!combinedAllergies.includes(allergy)) {
                    combinedAllergies.push(allergy);
                }
            }
            this.state.allergies = combinedAllergies;
            this.savePreferences({ allergies: combinedAllergies });
        }
        
        // Generate appropriate culinary response
        const response = await this.generateCulinaryResponse(
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
                requestType: requestType
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode14-history',
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
     * Detect the type of culinary request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for recipe request
        if (/\b(?:recipe|make|cook|prepare|how\s+to\s+make|how\s+do\s+i\s+make|how\s+to\s+cook)\b/i.test(normalizedInput)) {
            return "recipe";
        }
        
        // Check for meal planning request
        if (/\b(?:meal\s+plan|weekly|menu|plan|schedule|prep|preparation)\b/i.test(normalizedInput)) {
            return "meal_planning";
        }
        
        // Check for ingredient substitution request
        if (/\b(?:substitute|substitution|replacement|replace|alternative|instead\s+of)\b/i.test(normalizedInput)) {
            return "substitution";
        }
        
        // Check for cooking technique request
        if (/\b(?:how\s+to|technique|method|process|procedure|steps|guide|tip|advice)\b/i.test(normalizedInput)) {
            return "technique";
        }
        
        // Check for equipment request
        if (/\b(?:equipment|tool|utensil|appliance|gadget|pot|pan|knife|blender|mixer|pressure\s+cooker|slow\s+cooker|instant\s+pot)\b/i.test(normalizedInput)) {
            return "equipment";
        }
        
        // Check for nutrition or dietary request
        if (/\b(?:nutrition|nutritional|healthy|health|calorie|protein|carb|fat|vitamin|mineral|diet|dietary|keto|paleo|vegan|vegetarian)\b/i.test(normalizedInput)) {
            return "nutrition";
        }
        
        // Check for food storage or safety request
        if (/\b(?:store|storage|preserve|freezing|refrigerate|shelf\s+life|expiration|spoil|leftover|safety|safe)\b/i.test(normalizedInput)) {
            return "food_safety";
        }
        
        // Check for measurement or conversion request
        if (/\b(?:measure|measurement|convert|conversion|tablespoon|teaspoon|cup|ounce|gram|pound|kilogram|celsius|fahrenheit)\b/i.test(normalizedInput)) {
            return "measurement";
        }
        
        // Check for cuisine specific request
        if (/\b(?:cuisine|dish|traditional|authentic|regional|cultural|ethnic|international)\b/i.test(normalizedInput)) {
            return "cuisine";
        }
        
        // Check for seasonal or ingredient based request
        if (/\b(?:seasonal|season|spring|summer|fall|autumn|winter|in\s+season|produce|ingredient|vegetable|fruit)\b/i.test(normalizedInput)) {
            return "seasonal";
        }
        
        // Default to recipe suggestion
        return "recipe_suggestion";
    }
    
    /**
     * Extract dietary restrictions from user input
     * @param {string} input - User input
     * @returns {Array<string>|null} Dietary restrictions or null
     */
    extractDietaryRestrictions(input) {
        const normalizedInput = input.toLowerCase();
        const foundRestrictions = [];
        
        // Check for dietary restriction mentions
        for (const [restriction, description] of Object.entries(this.dietaryRestrictions)) {
            if (normalizedInput.includes(restriction.toLowerCase())) {
                foundRestrictions.push(restriction);
            }
        }
        
        // Check for common phrasing
        const restrictionPhrases = [
            { regex: /\b(?:i\s+(?:am|'m))\s+(?:a)?\s*(\w+)(?:ian)?/i, group: 1 }, // "I am vegetarian"
            { regex: /\b(?:i\s+(?:eat|follow))\s+(?:a)?\s*(\w+)(?:ian)?\s+(?:diet|food)/i, group: 1 }, // "I eat a vegetarian diet"
            { regex: /\b(?:i\s+(?:don't|do\s+not|can't|cannot)\s+(?:eat|have))\s+(\w+)/i, group: 1 }, // "I don't eat gluten"
            { regex: /\b(?:no)\s+(\w+)/i, group: 1 } // "No dairy"
        ];
        
        for (const phrase of restrictionPhrases) {
            const match = input.match(phrase.regex);
            if (match && match[phrase.group]) {
                const potentialRestriction = match[phrase.group].toLowerCase();
                
                // Check if it matches any known restriction
                for (const restriction of Object.keys(this.dietaryRestrictions)) {
                    if (restriction.toLowerCase().includes(potentialRestriction) || 
                        potentialRestriction.includes(restriction.toLowerCase())) {
                        if (!foundRestrictions.includes(restriction)) {
                            foundRestrictions.push(restriction);
                        }
                    }
                }
            }
        }
        
        return foundRestrictions.length > 0 ? foundRestrictions : null;
    }
    
    /**
     * Extract allergies from user input
     * @param {string} input - User input
     * @returns {Array<string>|null} Allergies or null
     */
    extractAllergies(input) {
        const normalizedInput = input.toLowerCase();
        const foundAllergies = [];
        
        // Check for common allergen mentions
        for (const allergen of this.commonAllergens) {
            if (normalizedInput.includes(allergen.toLowerCase())) {
                foundAllergies.push(allergen);
            }
        }
        
        // Check for allergy phrasing
        const allergyPhrases = [
            { regex: /\b(?:i\s+(?:am|'m))\s+(?:allergic\s+to)\s+(\w+)/i, group: 1 }, // "I am allergic to peanuts"
            { regex: /\b(?:i\s+(?:have))\s+(?:a|an)?\s*(\w+)\s+(?:allergy)/i, group: 1 }, // "I have a peanut allergy"
            { regex: /\b(?:allergic|allergy|allergies)\s+(?:to)?\s+(\w+)/i, group: 1 }, // "allergic to shellfish"
            { regex: /\b(?:can't|cannot)\s+(?:have|eat)\s+(\w+)\s+(?:due\s+to|because\s+of)\s+(?:allergies|allergy)/i, group: 1 } // "can't eat peanuts due to allergies"
        ];
        
        for (const phrase of allergyPhrases) {
            const match = input.match(phrase.regex);
            if (match && match[phrase.group]) {
                const potentialAllergen = match[phrase.group].toLowerCase();
                
                // Check if it matches any known allergen
                for (const allergen of this.commonAllergens) {
                    if (allergen.toLowerCase().includes(potentialAllergen) || 
                        potentialAllergen.includes(allergen.toLowerCase())) {
                        if (!foundAllergies.includes(allergen)) {
                            foundAllergies.push(allergen);
                        }
                    }
                }
            }
        }
        
        return foundAllergies.length > 0 ? foundAllergies : null;
    }
    
    /**
     * Generate a culinary response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of culinary request
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateCulinaryResponse(userInput, requestType, context = {}) {
        // In a real implementation, this would call an AI model API specialized in culinary knowledge
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "recipe":
                responseText = this.generateRecipe(userInput);
                break;
                
            case "meal_planning":
                responseText = this.generateMealPlan(userInput);
                break;
                
            case "substitution":
                responseText = this.suggestSubstitutions(userInput);
                break;
                
            case "technique":
                responseText = this.explainCookingTechnique(userInput);
                break;
                
            case "equipment":
                responseText = this.provideEquipmentGuidance(userInput);
                break;
                
            case "nutrition":
                responseText = this.provideNutritionalGuidance(userInput);
                break;
                
            case "food_safety":
                responseText = this.provideFoodSafetyAdvice(userInput);
                break;
                
            case "measurement":
                responseText = this.provideMeasurementConversion(userInput);
                break;
                
            case "cuisine":
                responseText = this.exploreCuisine(userInput);
                break;
                
            case "seasonal":
                responseText = this.recommendSeasonalCooking(userInput);
                break;
                
            default:
                responseText = this.suggestRecipes(userInput);
        }
        
        // Add disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate culinary suggestions
        const culinarySuggestions = this.getCulinarySuggestions(requestType);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            dietaryRestrictions: this.state.dietaryRestrictions,
            allergies: this.state.allergies,
            suggestions: culinarySuggestions
        };
    }
    
    /**
     * Generate a recipe based on user input
     * @param {string} userInput - User's input
     * @returns {string} Generated recipe
     */
    generateRecipe(userInput) {
        // Extract recipe type or main ingredient from input
        const recipeType = this.extractRecipeType(userInput);
        
        // Pick a recipe template that best matches the request
        let template = null;
        let recipeName = "Custom Recipe";
        
        if (recipeType) {
            if (recipeType.includes("stir fry") || recipeType.includes("stirfry")) {
                template = this.recipeTemplates.stir_fry;
                recipeName = `${this.capitalizeWords(recipeType)} Recipe`;
            } else if (recipeType.includes("soup") || recipeType.includes("stew")) {
                template = this.recipeTemplates.soup;
                recipeName = `${this.capitalizeWords(recipeType)} Recipe`;
            } else if (recipeType.includes("salad")) {
                template = this.recipeTemplates.salad;
                recipeName = `${this.capitalizeWords(recipeType)} Recipe`;
            } else if (recipeType.includes("pasta") || recipeType.includes("noodle")) {
                template = this.recipeTemplates.pasta;
                recipeName = `${this.capitalizeWords(recipeType)} Recipe`;
            } else if (recipeType.includes("roast") || recipeType.includes("vegetable")) {
                template = this.recipeTemplates.roasted_vegetables;
                recipeName = `${this.capitalizeWords(recipeType)} Recipe`;
            } else {
                // Default to most appropriate template based on request
                template = this.recipeTemplates.stir_fry; // As a fallback
                recipeName = `${this.capitalizeWords(recipeType)} Recipe`;
            }
        } else {
            // If no specific recipe type detected, default to a simple template
            template = this.recipeTemplates.stir_fry;
            recipeName = "Simple Meal Recipe";
        }
        
        // Personalize recipe based on dietary restrictions
        let dietaryNotes = "";
        if (this.state.dietaryRestrictions.length > 0) {
            dietaryNotes = `\n\n## Dietary Accommodations\nThis recipe has been adapted for the following dietary needs: ${this.state.dietaryRestrictions.join(", ")}.`;
        }
        
        // Add allergy warnings if applicable
        let allergyNotes = "";
        if (this.state.allergies.length > 0) {
            allergyNotes = `\n\n## Allergy Warning\nThis recipe avoids the following allergens: ${this.state.allergies.join(", ")}. Always double-check ingredients if you have severe allergies.`;
        }
        
        return `# ${recipeName}

In a complete implementation with an AI model and culinary expertise, I would create a personalized recipe based on your request, preferences, and dietary needs.

## Ingredients
${template.ingredients.map(ingredient => `- ${ingredient}`).join('\n')}

## Instructions
${template.instructions.map((step, index) => `${index + 1}. ${step}`).join('\n')}

## Chef's Tips
${template.tips.map(tip => `- ${tip}`).join('\n')}

## Nutrition (Approximate)
- Calories: [would calculate based on ingredients]
- Protein: [would calculate based on ingredients]
- Carbohydrates: [would calculate based on ingredients]
- Fat: [would calculate based on ingredients]${dietaryNotes}${allergyNotes}

## Variations
- [Would provide personalized recipe variations]
- [Would suggest ingredient substitutions]
- [Would offer flavor enhancements]

Would you like me to modify this recipe in any way or provide more specific cooking instructions for any step?`;
    }
    
    /**
     * Extract recipe type or main ingredient from user input
     * @param {string} input - User input
     * @returns {string|null} Recipe type or main ingredient
     */
    extractRecipeType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for recipe request patterns
        const recipePatterns = [
            { regex: /\b(?:recipe\s+for|make|cook|prepare|how\s+to\s+make|how\s+to\s+cook)\s+(?:a|an|some)?\s*(.+?)(?:\?|$|with|using)/i, group: 1 },
            { regex: /\b(?:how\s+do\s+(?:you|i)\s+make)\s+(?:a|an|some)?\s*(.+?)(?:\?|$|with|using)/i, group: 1 },
            { regex: /\b(?:i\s+want\s+to\s+(?:make|cook))\s+(?:a|an|some)?\s*(.+?)(?:\?|$|with|using)/i, group: 1 },
            { regex: /\b(?:do\s+you\s+have\s+(?:a|any)\s+recipe\s+for)\s+(?:a|an|some)?\s*(.+?)(?:\?|$|with|using)/i, group: 1 }
        ];
        
        for (const pattern of recipePatterns) {
            const match = input.match(pattern.regex);
            if (match && match[pattern.group]) {
                return match[pattern.group].trim();
            }
        }
        
        // If no matches, look for any food items mentioned
        for (const category in this.ingredientCategories) {
            for (const ingredient of this.ingredientCategories[category]) {
                if (normalizedInput.includes(ingredient.toLowerCase())) {
                    return ingredient;
                }
            }
        }
        
        // If still no matches, check for cuisine types
        for (const cuisine of this.cuisineTypes) {
            if (normalizedInput.includes(cuisine.toLowerCase())) {
                return `${cuisine} dish`;
            }
        }
        
        // If still no matches, check for meal types
        for (const mealType of this.mealTypes) {
            if (normalizedInput.includes(mealType.toLowerCase())) {
                return mealType;
            }
        }
        
        return null;
    }
    
    /**
     * Generate a meal plan based on user input
     * @param {string} userInput - User's input
     * @returns {string} Meal plan
     */
    generateMealPlan(userInput) {
        // Extract meal plan duration
        const days = this.extractMealPlanDuration(userInput);
        
        // Generate meal plan based on dietary restrictions and preferences
        const dietaryInfo = this.state.dietaryRestrictions.length > 0 ? 
            `with ${this.state.dietaryRestrictions.join(", ")} accommodations` : 
            "with balanced nutrition";
        
        return `# ${days}-Day Meal Plan ${dietaryInfo}

In a complete implementation with an AI model and nutritional expertise, I would create a personalized meal plan based on your preferences, dietary restrictions, and nutritional needs.

## Personalized Meal Plan Overview
- **Dietary Preferences**: ${this.state.dietaryRestrictions.length > 0 ? this.state.dietaryRestrictions.join(", ") : "Balanced omnivore"}
- **Allergies Avoided**: ${this.state.allergies.length > 0 ? this.state.allergies.join(", ") : "None specified"}
- **Meal Plan Goals**: Nutritionally balanced, varied, and satisfying meals
- **Preparation Level**: Recipes suitable for ${this.state.cookingSkillLevel} cooks

## Day 1
- **Breakfast**: [Personalized breakfast recipe]
- **Lunch**: [Personalized lunch recipe]
- **Dinner**: [Personalized dinner recipe]
- **Snacks**: [Snack suggestions]

## Day 2
- **Breakfast**: [Personalized breakfast recipe]
- **Lunch**: [Personalized lunch recipe]
- **Dinner**: [Personalized dinner recipe]
- **Snacks**: [Snack suggestions]

${days > 2 ? `## Day 3
- **Breakfast**: [Personalized breakfast recipe]
- **Lunch**: [Personalized lunch recipe]
- **Dinner**: [Personalized dinner recipe]
- **Snacks**: [Snack suggestions]` : ""}

${days > 3 ? `## Day 4
- **Breakfast**: [Personalized breakfast recipe]
- **Lunch**: [Personalized lunch recipe]
- **Dinner**: [Personalized dinner recipe]
- **Snacks**: [Snack suggestions]` : ""}

${days > 4 ? `## Day 5
- **Breakfast**: [Personalized breakfast recipe]
- **Lunch**: [Personalized lunch recipe]
- **Dinner**: [Personalized dinner recipe]
- **Snacks**: [Snack suggestions]` : ""}

${days > 5 ? `## Days 6-7
- **Breakfast Options**: [Multiple breakfast choices]
- **Lunch Options**: [Multiple lunch choices]
- **Dinner Options**: [Multiple dinner choices]
- **Snack Options**: [Multiple snack choices]` : ""}

## Grocery List
- **Proteins**: [List based on meal plan]
- **Vegetables**: [List based on meal plan]
- **Fruits**: [List based on meal plan]
- **Grains**: [List based on meal plan]
- **Dairy/Alternatives**: [List based on meal plan]
- **Pantry Items**: [List based on meal plan]
- **Herbs & Spices**: [List based on meal plan]

## Meal Prep Tips
- [Advance preparation suggestions]
- [Storage recommendations]
- [Time-saving tips]
- [Batch cooking ideas]

Would you like me to provide detailed recipes for any of these meals or adjust the meal plan in any way?`;
    }
    
    /**
     * Extract meal plan duration from user input
     * @param {string} input - User input
     * @returns {number} Number of days for meal plan
     */
    extractMealPlanDuration(input) {
        const normalizedInput = input.toLowerCase();
        
        // Look for numeric specifications
        const dayPatterns = [
            { regex: /\b(\d+)[\s-]*day(?:s)?\b/i, group: 1 },
            { regex: /\bfor\s+(\d+)\s+day(?:s)?\b/i, group: 1 },
            { regex: /\b(\d+)\s+day(?:s)?\s+meal\s+plan\b/i, group: 1 },
            { regex: /\bweek(?:ly)?\b/i, value: 7 },
            { regex: /\bmonth(?:ly)?\b/i, value: 30 }
        ];
        
        for (const pattern of dayPatterns) {
            if (pattern.group) {
                const match = normalizedInput.match(pattern.regex);
                if (match && match[pattern.group]) {
                    const days = parseInt(match[pattern.group]);
                    if (days > 0 && days <= 30) {
                        return days;
                    }
                }
            } else if (pattern.value && normalizedInput.match(pattern.regex)) {
                return pattern.value;
            }
        }
        
        // Default to a week
        return 7;
    }
    
    /**
     * Suggest ingredient substitutions based on user input
     * @param {string} userInput - User's input
     * @returns {string} Substitution suggestions
     */
    suggestSubstitutions(userInput) {
        // Try to extract the ingredient to substitute
        const ingredient = this.extractIngredientToSubstitute(userInput);
        
        if (!ingredient) {
            return `# Ingredient Substitution Guide

In a complete implementation with an AI model and culinary expertise, I would provide personalized ingredient substitution recommendations based on what you're trying to replace.

To recommend substitutions, I need to know:
1. What ingredient you're looking to substitute
2. What recipe you're making (for context)
3. Any dietary restrictions or preferences

Here are some common ingredient substitutions that might be helpful:

## Common Baking Substitutions

- **Butter**: Olive oil, coconut oil, applesauce, Greek yogurt, mashed avocado
- **Eggs**: Applesauce, mashed banana, flax/chia egg, silken tofu, commercial egg replacer
- **All-Purpose Flour**: Almond flour, coconut flour, gluten-free flour blend, oat flour
- **Sugar**: Honey, maple syrup, coconut sugar, applesauce, stevia
- **Buttermilk**: Milk + vinegar/lemon juice, yogurt + milk, sour cream + milk

## Common Cooking Substitutions

- **Meat**: Tofu, tempeh, seitan, beans, lentils, mushrooms
- **Dairy Milk**: Almond milk, soy milk, oat milk, coconut milk, cashew milk
- **Cream**: Coconut cream, cashew cream, silken tofu cream
- **Cheese**: Nutritional yeast, vegan cheese, tofu-based cheese
- **Soy Sauce**: Coconut aminos, tamari, liquid aminos, salt + water

Please let me know what specific ingredient you're looking to substitute, and I can provide more tailored recommendations.`;
        }
        
        // Check if we have substitution data for this ingredient
        let substitutionList = null;
        
        // Normalize ingredient name for lookup
        const normalizedIngredient = ingredient.toLowerCase();
        
        // Check direct matches first
        for (const [key, substitutions] of Object.entries(this.ingredientSubstitutions)) {
            if (key.toLowerCase() === normalizedIngredient) {
                substitutionList = substitutions;
                break;
            }
        }
        
        // If no direct match, check partial matches
        if (!substitutionList) {
            for (const [key, substitutions] of Object.entries(this.ingredientSubstitutions)) {
                if (key.toLowerCase().includes(normalizedIngredient) || 
                    normalizedIngredient.includes(key.toLowerCase())) {
                    substitutionList = substitutions;
                    break;
                }
            }
        }
        
        if (substitutionList) {
            return `# Substitutions for ${this.capitalizeWords(ingredient)}

In a complete implementation with an AI model and culinary expertise, I would provide personalized substitution recommendations for ${ingredient} based on your specific recipe and dietary needs.

## Recommended Substitutions

${substitutionList.map(sub => `- **${sub}**`).join('\n')}

## How to Substitute

I would provide specific guidance on:
- Conversion ratios (how much to use)
- Effects on taste and texture
- Necessary recipe adjustments
- Best uses for each substitute

## Best For

I would explain:
- Which substitutes work best for which cooking methods
- When to use each substitute (baking vs. cooking)
- Flavor profile effects of each option

## Dietary Considerations

I would tailor recommendations based on:
- Vegan/vegetarian needs
- Gluten-free requirements
- Allergies and sensitivities
- Low-carb, keto, or other dietary patterns

Would you like more specific information about any of these substitutes or guidance on how to use them in a particular recipe?`;
        } else {
            // Provide a general response if we don't have specific data
            return `# Substitutions for ${this.capitalizeWords(ingredient)}

In a complete implementation with an AI model and culinary expertise, I would provide personalized substitution recommendations for ${ingredient} based on your specific recipe and dietary needs.

## Potential Substitutes

I would provide a comprehensive list of substitutes tailored to:
- The recipe you're making
- Your dietary requirements
- Available ingredients
- Desired flavor profile

## Substitution Guidance

For each substitute, I would include:
- Appropriate conversion ratios
- Effects on taste and texture
- Recipe adjustments needed
- Best uses and limitations

## Cooking Method Considerations

Different substitutes work best with different cooking methods. I would explain:
- Which options work best for baking, sautéing, roasting, etc.
- Temperature considerations
- Cooking time adjustments

## Flavor Profile Effects

I would outline how each substitute would change the flavor of your dish and suggest complementary seasoning adjustments.

Would you like me to suggest some general substitutes for ${ingredient}, or would you like to share more about the specific recipe you're making?`;
        }
    }
    
    /**
     * Extract the ingredient to substitute from user input
     * @param {string} input - User input
     * @returns {string|null} Ingredient to substitute or null
     */
    extractIngredientToSubstitute(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for substitution patterns
        const substitutionPatterns = [
            { regex: /\b(?:substitute|substitution|replacement|alternative|instead\s+of)\s+(?:for)?\s+(?:a|an|the)?\s*(.+?)(?:\?|$|in|with|using)/i, group: 1 },
            { regex: /\b(?:what\s+(?:can|could|should)\s+(?:i|you)?\s+(?:use|substitute))\s+(?:for|instead\s+of)\s+(?:a|an|the)?\s*(.+?)(?:\?|$|in|with|using)/i, group: 1 },
            { regex: /\b(?:don'?t\s+have)\s+(?:a|an|the|any)?\s*(.+?)(?:\?|$|in|with|using)/i, group: 1 },
            { regex: /\b(?:replace)\s+(?:a|an|the)?\s*(.+?)(?:\?|$|in|with|using)/i, group: 1 }
        ];
        
        for (const pattern of substitutionPatterns) {
            const match = input.match(pattern.regex);
            if (match && match[pattern.group]) {
                return match[pattern.group].trim();
            }
        }
        
        // If no patterns match, check for any ingredients mentioned
        for (const category in this.ingredientCategories) {
            for (const ingredient of this.ingredientCategories[category]) {
                if (normalizedInput.includes(ingredient.toLowerCase())) {
                    return ingredient;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Explain cooking technique based on user input
     * @param {string} userInput - User's input
     * @returns {string} Technique explanation
     */
    explainCookingTechnique(userInput) {
        // Try to extract the cooking technique
        const technique = this.extractCookingTechnique(userInput);
        
        if (!technique) {
            return `# Cooking Techniques Guide

In a complete implementation with an AI model and culinary expertise, I would provide detailed explanations of specific cooking techniques based on your interests.

To help you with cooking techniques, I need to know which specific technique you're interested in learning about, such as:
- How to properly sauté vegetables
- The best way to roast a chicken
- Techniques for cooking perfect rice
- How to knead bread dough

Here are some fundamental cooking techniques you might be interested in:

## Basic Techniques

- **Sautéing**: Cooking food quickly in a small amount of oil over high heat
- **Roasting**: Cooking food in an oven with dry heat
- **Boiling**: Cooking food in water that's at a full boil
- **Steaming**: Cooking food with the steam from boiling water
- **Grilling**: Cooking food over direct heat on a grill

## Intermediate Techniques

- **Braising**: Searing food then cooking it slowly in liquid
- **Poaching**: Gently cooking food in liquid below the boiling point
- **Blanching**: Briefly boiling food then shocking in ice water
- **Pan-searing**: Creating a brown crust on food using a hot pan
- **Stir-frying**: Quickly cooking small pieces of food in a wok

Please let me know which specific technique you'd like to learn about, and I can provide detailed instructions, tips, and troubleshooting advice.`;
        }
        
        // Determine level of technique
        let techniqueLevel = "basic";
        for (const level in this.cookingTechniques) {
            if (this.cookingTechniques[level].map(t => t.toLowerCase()).includes(technique.toLowerCase())) {
                techniqueLevel = level;
                break;
            }
        }
        
        return `# How to ${this.capitalizeWords(technique)}

In a complete implementation with an AI model and culinary expertise, I would provide comprehensive guidance on the ${technique} cooking technique tailored to your ${this.state.cookingSkillLevel} skill level.

## What is ${this.capitalizeWords(technique)}?

A thorough definition of the technique, including:
- Its culinary purpose and origins
- When and why to use this method
- Types of foods it works best with
- What makes this technique distinctive

## Essential Equipment

- The specific tools needed for this technique
- Recommended types and materials
- Alternatives if you don't have ideal equipment
- Safety considerations

## Step-by-Step Method

1. Detailed preparation steps
2. Precise technique instructions
3. Visual cues to watch for
4. Timing guidelines
5. Temperature management
6. Testing for doneness

## Common Mistakes to Avoid

- Typical errors beginners make
- Troubleshooting problems
- Recovery techniques if something goes wrong
- Signs that indicate issues

## Pro Tips for Better Results

- Chef-level insights for perfecting the technique
- Variations for different ingredients
- Flavor enhancement opportunities
- Efficiency improvements

## Recipe Suggestions

Several recipe ideas that showcase this technique, suitable for your skill level and dietary preferences.

Would you like more specific guidance on any aspect of ${technique}, or would you like to see a simple recipe that utilizes this technique?`;
    }
    
    /**
     * Extract cooking technique from user input
     * @param {string} input - User input
     * @returns {string|null} Cooking technique or null
     */
    extractCookingTechnique(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for technique patterns
        const techniquePatterns = [
            { regex: /\b(?:how\s+(?:to|do\s+i|do\s+you))\s+(.+?)(?:\?|$|a|an|the)/i, group: 1 },
            { regex: /\b(?:what\s+is\s+the\s+(?:best|proper|right|correct)\s+way\s+to)\s+(.+?)(?:\?|$)/i, group: 1 },
            { regex: /\b(?:can\s+you\s+(?:explain|teach|show|tell\s+me))\s+(?:how\s+to)?\s+(.+?)(?:\?|$)/i, group: 1 },
            { regex: /\b(?:tips\s+for)\s+(.+?)(?:\?|$)/i, group: 1 }
        ];
        
        for (const pattern of techniquePatterns) {
            const match = input.match(pattern.regex);
            if (match && match[pattern.group]) {
                const potentialTechnique = match[pattern.group].trim();
                
                // Check if it matches a known technique
                for (const level in this.cookingTechniques) {
                    for (const technique of this.cookingTechniques[level]) {
                        if (technique.toLowerCase() === potentialTechnique.toLowerCase() || 
                            (potentialTechnique.toLowerCase().includes(technique.toLowerCase()) && 
                             potentialTechnique.toLowerCase().endsWith(technique.toLowerCase()))) {
                            return technique;
                        }
                    }
                }
                
                // If it ends with "ing" and is at least 5 chars, it's likely a cooking technique
                if (potentialTechnique.toLowerCase().endsWith("ing") && potentialTechnique.length >= 5) {
                    return potentialTechnique;
                }
                
                // Check for some common verbs that might be techniques
                const cookingVerbs = ["cook", "prepare", "make", "bake", "grill", "roast", "fry", "chop", "dice", "slice", "cut", "knead", "mix", "blend", "whip", "beat"];
                for (const verb of cookingVerbs) {
                    if (potentialTechnique.toLowerCase().includes(verb)) {
                        return potentialTechnique;
                    }
                }
            }
        }
        
        // Check for any technique mentioned explicitly
        for (const level in this.cookingTechniques) {
            for (const technique of this.cookingTechniques[level]) {
                if (normalizedInput.includes(technique.toLowerCase())) {
                    return technique;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Provide equipment guidance based on user input
     * @param {string} userInput - User's input
     * @returns {string} Equipment guidance
     */
    provideEquipmentGuidance(userInput) {
        // Try to extract the equipment
        const equipment = this.extractEquipment(userInput);
        
        if (!equipment) {
            return `# Kitchen Equipment Guide

In a complete implementation with an AI model and culinary expertise, I would provide personalized guidance on kitchen equipment based on your specific questions and needs.

## Essential Kitchen Equipment

### Knives
- **Chef's knife**: The most versatile kitchen knife for chopping, slicing, and dicing
- **Paring knife**: For peeling, trimming, and detailed cutting
- **Serrated knife**: For cutting bread, tomatoes, and other delicate items

### Cookware
- **Stainless steel skillet**: For searing, sautéing, and all-purpose cooking
- **Nonstick pan**: For eggs, delicate fish, and low-fat cooking
- **Dutch oven**: For braising, stews, soups, and even bread baking
- **Saucepan**: For cooking liquids, sauces, and grains

### Bakeware
- **Baking sheets**: For cookies, roasting vegetables, and sheet pan meals
- **Cake pans or baking dishes**: For casseroles, cakes, and baked goods
- **Loaf pan**: For bread, meatloaf, and quick breads

### Tools & Gadgets
- **Measuring cups and spoons**: For accurate recipe measurements
- **Cutting boards**: Wood for general use, plastic for meat
- **Mixing bowls**: In various sizes for different tasks
- **Colander/strainer**: For draining pasta and washing produce
- **Tongs, spatulas, and wooden spoons**: For cooking and serving

### Small Appliances
- **Food processor or blender**: For purees, sauces, and chopping
- **Stand or hand mixer**: For baking and whipping
- **Instant-read thermometer**: For food safety and perfect doneness

Would you like specific recommendations about a particular piece of equipment, suggestions for upgrading your kitchen on a budget, or guidance on which tools are most essential for your cooking style?`;
        }
        
        return `# Guide to ${this.capitalizeWords(equipment)}

In a complete implementation with an AI model and culinary expertise, I would provide comprehensive information about ${equipment} tailored to your cooking needs and experience level.

## About ${this.capitalizeWords(equipment)}

- Definition and purpose
- Types and variations
- Evolution and history
- When to use this equipment

## Selecting the Right ${this.capitalizeWords(equipment)}

### What to Look For
- Material considerations
- Quality indicators
- Size and capacity guidance
- Essential features
- Optional features

### Price Ranges
- Budget options (with recommendations)
- Mid-range options (with recommendations)
- Premium options (with recommendations)
- Cost-to-value analysis

## Proper Usage

### Basic Techniques
- Step-by-step usage instructions
- Safety precautions
- Temperature guidelines if applicable
- Best practices

### Advanced Techniques
- Special applications
- Professional methods
- Efficiency tips

## Care and Maintenance

- Cleaning instructions
- Storage recommendations
- Maintenance schedule
- Troubleshooting common issues
- Extending lifespan

## Recipes That Showcase ${this.capitalizeWords(equipment)}

- Several recipe suggestions that highlight this equipment's capabilities
- Tips for adapting other recipes to use with this equipment

Would you like specific brand recommendations, more details about a particular aspect of using ${equipment}, or recipes that would work well with it?`;
    }
    
    /**
     * Extract equipment from user input
     * @param {string} input - User input
     * @returns {string|null} Equipment or null
     */
    extractEquipment(input) {
        const normalizedInput = input.toLowerCase();
        
        // Common cooking equipment
        const cookingEquipment = [
            "knife", "chef's knife", "paring knife", "cutting board", "pan", "pot", "skillet", 
            "cast iron", "dutch oven", "baking sheet", "cookie sheet", "roasting pan", "casserole dish",
            "slow cooker", "crockpot", "pressure cooker", "instant pot", "rice cooker", "blender",
            "food processor", "mixer", "stand mixer", "hand mixer", "grater", "microplane", "peeler",
            "whisk", "spatula", "tongs", "ladle", "measuring cups", "measuring spoons", "scale",
            "thermometer", "meat thermometer", "timer", "strainer", "colander", "sieve",
            "rolling pin", "baking dish", "ramekin", "grill", "griddle", "waffle maker", "air fryer",
            "mandoline", "mortar and pestle", "spice grinder", "coffee grinder", "salad spinner",
            "steamer", "wok", "oven", "microwave", "stockpot", "saucepan", "frying pan",
            "cake pan", "muffin tin", "loaf pan", "pie dish", "grill pan", "pasta maker"
        ];
        
        // Check for equipment patterns
        const equipmentPatterns = [
            { regex: /\b(?:how\s+to\s+(?:use|choose|clean|maintain|buy|select|pick))\s+(?:a|an|the)?\s*(.+?)(?:\?|$)/i, group: 1 },
            { regex: /\b(?:what\s+(?:is|are)?\s+(?:the)?\s+(?:best|good|recommended|top))\s+(.+?)(?:\?|$|to|for)/i, group: 1 },
            { regex: /\b(?:recommend\s+(?:a|an|the)?)\s+(.+?)(?:\?|$|for)/i, group: 1 },
            { regex: /\b(?:need|want|looking\s+for)\s+(?:a|an|the)?\s+(?:new|good|better|best)?\s*(.+?)(?:\?|$)/i, group: 1 }
        ];
        
        for (const pattern of equipmentPatterns) {
            const match = input.match(pattern.regex);
            if (match && match[pattern.group]) {
                const potentialEquipment = match[pattern.group].trim();
                
                // Check if it matches known equipment
                for (const equipment of cookingEquipment) {
                    if (equipment.toLowerCase() === potentialEquipment.toLowerCase() || 
                        potentialEquipment.toLowerCase().includes(equipment.toLowerCase())) {
                        return equipment;
                    }
                }
            }
        }
        
        // Check for any equipment mentioned explicitly
        for (const equipment of cookingEquipment) {
            if (normalizedInput.includes(equipment.toLowerCase())) {
                return equipment;
            }
        }
        
        return null;
    }
    
    /**
     * Provide nutritional guidance based on user input
     * @param {string} userInput - User's input
     * @returns {string} Nutritional guidance
     */
    provideNutritionalGuidance(userInput) {
        return `# Nutritional Guidance

In a complete implementation with an AI model and nutritional expertise, I would provide personalized dietary advice based on your specific questions and needs.

## Balanced Nutrition Principles

### Macronutrients
- **Proteins**: Essential for muscle building and repair
  - Recommended sources include lean meats, fish, eggs, dairy, legumes, tofu
  - Aim for 0.8-1.6g per kg of body weight depending on activity level
  
- **Carbohydrates**: Primary energy source
  - Focus on complex carbs: whole grains, vegetables, fruits, legumes
  - Limit refined carbs and added sugars
  - Portion based on activity level and goals
  
- **Fats**: Essential for hormones and cellular health
  - Emphasize healthy fats: avocados, nuts, seeds, olive oil, fatty fish
  - Moderate saturated fats from animal sources
  - Avoid trans fats when possible

### Micronutrients
- **Vitamins and Minerals**: Essential for overall health
  - Best obtained from a varied diet rich in colorful vegetables and fruits
  - Consider supplements only when dietary sources are insufficient
  
### Hydration
- Critical for all bodily functions
- Aim for 2-3 liters daily, more with exercise or hot weather
- Water is the optimal source

## Nutrition for Specific Goals

### Weight Management
- Focus on whole foods and portion control
- Prioritize protein and fiber for satiety
- Consider energy balance for weight loss or gain
- Sustainable approaches over crash diets

### Athletic Performance
- Timing nutrition around workouts
- Carb considerations for energy
- Protein for recovery
- Hydration strategies

### Health Conditions
- Adaptations for specific health needs
- Food interactions with medications
- Therapeutic dietary approaches

## Practical Implementation

### Meal Planning
- Building balanced plates (½ vegetables, ¼ protein, ¼ carbs)
- Batch cooking strategies
- Reading nutrition labels
- Navigating dining out

### Personalization
- Cultural food preferences
- Dietary restrictions
- Food allergies and sensitivities
- Taste preferences

Would you like more specific nutritional guidance about a particular topic, food, or dietary pattern?`;
    }
    
    /**
     * Provide food safety advice based on user input
     * @param {string} userInput - User's input
     * @returns {string} Food safety advice
     */
    provideFoodSafetyAdvice(userInput) {
        return `# Food Safety and Storage Guide

In a complete implementation with an AI model and food safety expertise, I would provide specific guidance about safe food handling, storage, and shelf life based on your question.

## Core Food Safety Principles

### Temperature Control
- **Danger Zone**: Keep food out of 40°F-140°F (4°C-60°C) range when possible
- **Cold Foods**: Refrigerate at 40°F (4°C) or below
- **Hot Foods**: Keep hot foods at 140°F (60°C) or above
- **Cooking Temperatures**:
  - Poultry: 165°F (74°C)
  - Ground meats: 160°F (71°C)
  - Whole cuts of beef, pork, lamb: 145°F (63°C) with 3-minute rest
  - Fish & shellfish: 145°F (63°C)

### Cross-Contamination Prevention
- Use separate cutting boards for raw meat and produce
- Wash hands thoroughly before and after handling raw foods
- Clean and sanitize surfaces after contact with raw foods
- Store raw meats below ready-to-eat foods in refrigerator

## Food Storage Guidelines

### Refrigerator Storage (40°F/4°C)
- **Raw poultry, ground meat**: 1-2 days
- **Raw beef, pork, lamb cuts**: 3-5 days
- **Cooked meat, poultry, seafood**: 3-4 days
- **Soups and stews**: 3-4 days
- **Hard cheeses**: 3-4 weeks (unopened), 1-2 weeks (opened)
- **Eggs**: 3-5 weeks (in shell)
- **Milk**: 5-7 days after opening
- **Fresh produce**: Varies by item (3-14 days)

### Freezer Storage (0°F/-18°C)
- **Raw poultry, ground meat**: 9-12 months
- **Raw beef, pork, lamb cuts**: 4-12 months
- **Cooked meat, poultry, seafood**: 2-6 months
- **Soups and stews**: 2-3 months
- **Bread and baked goods**: 2-3 months
- **Fruits and vegetables**: 8-12 months

### Pantry Storage
- Store in cool, dry place away from sunlight
- Keep pantry pests at bay with sealed containers
- Follow "best by" dates as general guidelines
- Use FIFO method (First In, First Out)

## Leftovers Management
- Refrigerate within 2 hours of cooking (1 hour in hot weather)
- Cool large quantities in shallow containers for quick cooling
- Reheat leftovers to 165°F (74°C)
- When in doubt, throw it out

## Signs of Food Spoilage
- Unusual or off odors
- Discoloration or mold
- Slimy or sticky texture
- Bulging cans or jar lids
- Off flavors or tastes

Would you like specific storage information about a particular food item or guidance on another food safety topic?`;
    }
    
    /**
     * Provide measurement conversion information
     * @param {string} userInput - User's input
     * @returns {string} Measurement conversion information
     */
    provideMeasurementConversion(userInput) {
        return `# Cooking Measurement Conversions

In a complete implementation with an AI model and culinary expertise, I would provide specific measurement conversions based on your question.

## Volume Conversions (US)

| US Standard | US Standard | Metric |
|------------|-------------|--------|
| 1 tablespoon (tbsp) | 3 teaspoons (tsp) | 15 milliliters (ml) |
| 1/4 cup | 4 tablespoons | 60 ml |
| 1/3 cup | 5 tbsp + 1 tsp | 80 ml |
| 1/2 cup | 8 tablespoons | 120 ml |
| 2/3 cup | 10 tbsp + 2 tsp | 160 ml |
| 3/4 cup | 12 tablespoons | 180 ml |
| 1 cup | 16 tablespoons | 240 ml |
| 1 pint | 2 cups | 473 ml |
| 1 quart | 4 cups | 946 ml |
| 1 gallon | 16 cups | 3.8 liters |

## Weight Conversions

| US/Imperial | Metric |
|------------|--------|
| 1 ounce (oz) | 28 grams (g) |
| 4 ounces | 113 grams |
| 8 ounces (1/2 pound) | 227 grams |
| 16 ounces (1 pound) | 454 grams |
| 2.2 pounds | 1 kilogram (kg) |

## Temperature Conversions

| Fahrenheit | Celsius | Common Use |
|------------|---------|------------|
| 32°F | 0°C | Freezing point of water |
| 165°F | 74°C | Safe poultry temperature |
| 212°F | 100°C | Boiling point of water |
| 350°F | 177°C | Common baking temperature |
| 425°F | 218°C | High baking temperature |

**Conversion Formulas:**
- F to C: (°F - 32) × 5/9 = °C
- C to F: (°C × 9/5) + 32 = °F

## Common Ingredient Conversions by Weight

| Ingredient | Volume | Weight |
|------------|--------|--------|
| All-purpose flour | 1 cup | 120-125g |
| Granulated sugar | 1 cup | 200g |
| Brown sugar (packed) | 1 cup | 220g |
| Butter | 1 cup/2 sticks | 227g |
| Milk | 1 cup | 240g |
| Large egg | 1 whole | 50g |

## Kitchen Equivalents

- 1 stick of butter = 1/2 cup = 8 tablespoons = 4 ounces = 113g
- 1 large egg = about 50g (without shell)
- 1 cup chopped vegetables = approximately 150-170g (varies by vegetable)
- 1 cup dried pasta = about 100g
- 1 cup cooked rice = about 175g

Would you like specific conversion information for a particular ingredient or measurement?`;
    }
    
    /**
     * Explore cuisine based on user input
     * @param {string} userInput - User's input
     * @returns {string} Cuisine exploration
     */
    exploreCuisine(userInput) {
        // Try to extract the cuisine
        const cuisine = this.extractCuisine(userInput);
        
        if (!cuisine) {
            return `# World Cuisines Guide

In a complete implementation with an AI model and culinary expertise, I would provide an exploration of world cuisines based on your interests.

## Popular World Cuisines

### Italian Cuisine
- **Key Ingredients**: Tomatoes, olive oil, pasta, cheese, herbs
- **Signature Dishes**: Pasta, pizza, risotto, osso buco
- **Cooking Techniques**: Al dente pasta cooking, slow simmering sauces
- **Regional Variations**: Northern (butter, rice, polenta) vs Southern (olive oil, tomatoes, seafood)

### French Cuisine
- **Key Ingredients**: Butter, wine, herbs, cheese, quality meats
- **Signature Dishes**: Coq au vin, bouillabaisse, ratatouille, croissants
- **Cooking Techniques**: Sautéing, braising, flambéing, sauce making
- **Regional Variations**: Provençal (olive oil, herbs) vs Normandy (apples, cream, butter)

### Chinese Cuisine
- **Key Ingredients**: Rice, noodles, soy sauce, tofu, ginger, garlic
- **Signature Dishes**: Dim sum, Peking duck, kung pao chicken, ma po tofu
- **Cooking Techniques**: Stir-frying, steaming, braising, red cooking
- **Regional Variations**: Cantonese, Sichuan, Hunan, Shanghai, Beijing

### Indian Cuisine
- **Key Ingredients**: Rice, legumes, spices, ghee, yogurt
- **Signature Dishes**: Curry, biryani, samosas, naan, dosa
- **Cooking Techniques**: Tempering spices, slow cooking, tandoor baking
- **Regional Variations**: North (bread, dairy) vs South (rice, coconut, vegetarian)

### Mexican Cuisine
- **Key Ingredients**: Corn, beans, chiles, tomatoes, avocados
- **Signature Dishes**: Tacos, mole, enchiladas, tamales
- **Cooking Techniques**: Nixtamalization, slow braising, grilling
- **Regional Variations**: Yucatan, Oaxacan, Northern, Mexico City

Would you like to explore a specific cuisine in more detail, including authentic recipes, techniques, and ingredient information?`;
        }
        
        return `# ${cuisine} Cuisine Guide

In a complete implementation with an AI model and culinary expertise, I would provide a comprehensive exploration of ${cuisine} cuisine, including its history, key ingredients, techniques, and authentic recipes.

## About ${cuisine} Cuisine

A rich overview including:
- Historical and cultural context
- Geographic influences
- Evolution of the cuisine
- Contemporary status and global influence

## Key Ingredients

### Staple Foods
- Essential grain, starch, or carbohydrate bases
- Regional variations and preparations

### Signature Proteins
- Traditional meat, fish, and plant-based proteins
- Cultural significance and preparation methods

### Important Vegetables & Fruits
- Commonly used produce
- Seasonal considerations

### Essential Herbs & Spices
- Flavor profile defining seasonings
- Traditional spice blends or pastes

### Special Ingredients
- Unique components that define the cuisine
- Traditional condiments and accompaniments

## Cooking Techniques

- Distinctive cooking methods
- Traditional equipment
- Preparation practices
- Presentation customs

## Iconic Dishes

### Appetizers & Small Plates
- Traditional starters and finger foods
- Cultural context for serving

### Main Dishes
- Signature entrées
- Regional specialties
- Festive and celebratory dishes

### Side Dishes & Accompaniments
- Traditional pairings
- How they complement main dishes

### Desserts & Sweets
- Classic sweet endings
- Special occasion treats

## Authentic Recipe: [Signature ${cuisine} Dish]

I would provide a detailed, authentic recipe for a quintessential ${cuisine} dish, adapted to your dietary preferences and cooking skill level.

## Modern Interpretations

- Contemporary takes on traditional dishes
- Fusion approaches
- Health-conscious adaptations

Would you like me to focus on a specific aspect of ${cuisine} cuisine, recommend beginning dishes to try cooking, or provide an authentic recipe for a particular ${cuisine} dish?`;
    }
    
    /**
     * Extract cuisine from user input
     * @param {string} input - User input
     * @returns {string|null} Cuisine or null
     */
    extractCuisine(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for cuisine mentions
        for (const cuisine of this.cuisineTypes) {
            if (normalizedInput.includes(cuisine.toLowerCase())) {
                return cuisine;
            }
        }
        
        // Check for cuisine patterns
        const cuisinePatterns = [
            { regex: /\b(?:about|explore|learn|know)\s+(?:about)?\s+(.+?)\s+(?:cuisine|food|cooking|dishes)\b/i, group: 1 },
            { regex: /\b(.+?)\s+(?:cuisine|food|cooking|dishes)\b/i, group: 1 },
            { regex: /\b(?:traditional|authentic|classic)\s+(.+?)\s+(?:recipe|dish|meal)\b/i, group: 1 }
        ];
        
        for (const pattern of cuisinePatterns) {
            const match = input.match(pattern.regex);
            if (match && match[pattern.group]) {
                const potentialCuisine = match[pattern.group].trim();
                
                // Check if it's in our cuisine list or similar
                for (const cuisine of this.cuisineTypes) {
                    if (cuisine.toLowerCase() === potentialCuisine.toLowerCase() || 
                        potentialCuisine.toLowerCase().includes(cuisine.toLowerCase())) {
                        return cuisine;
                    }
                }
                
                // If it ends with "an", "ese", "ish", etc., it's likely a cuisine
                if (/(?:an|ese|ish|ian|ch|nese)$/i.test(potentialCuisine)) {
                    return potentialCuisine;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Recommend seasonal cooking ideas
     * @param {string} userInput - User's input
     * @returns {string} Seasonal cooking recommendations
     */
    recommendSeasonalCooking(userInput) {
        // Determine current season
        const now = new Date();
        const month = now.getMonth();
        
        // Northern hemisphere seasons
        let season;
        if (month >= 2 && month <= 4) {
            season = "Spring";
        } else if (month >= 5 && month <= 7) {
            season = "Summer";
        } else if (month >= 8 && month <= 10) {
            season = "Fall";
        } else {
            season = "Winter";
        }
        
        return `# Seasonal Cooking: ${season}

In a complete implementation with an AI model and culinary expertise, I would provide personalized seasonal cooking recommendations based on your local produce availability, preferences, and the current time of year.

## ${season} Seasonal Highlights

### In-Season Produce
- **Fruits**: [Would list seasonal fruits available now]
- **Vegetables**: [Would list seasonal vegetables available now]
- **Herbs**: [Would list seasonal herbs at their peak]

### Seasonal Cooking Techniques
- Cooking methods that highlight ${season} flavors
- Traditional ${season} preparation styles
- Modern approaches to seasonal cooking

## ${season} Recipe Ideas

### Appetizers & Starters
- Several seasonal starter ideas showcasing ${season} produce
- Easy entertaining options
- Make-ahead possibilities

### Main Dishes
- Hearty and satisfying entrées perfect for ${season}
- Protein pairing suggestions with seasonal accompaniments
- Weekend cooking projects and weeknight solutions

### Side Dishes
- Simple preparations that let seasonal produce shine
- Creative twists on classic ${season} sides
- Quick and easy options

### Desserts
- Sweet treats featuring seasonal fruits
- Traditional ${season} baking recipes
- Light and refreshing options

## Seasonal Meal Planning

- Weekly meal plan suggestions utilizing similar ingredients
- Batch cooking recommendations
- How to maximize seasonal bounty through preservation

## Shopping Guidance

- What to look for when selecting peak ${season} produce
- Farmers' market shopping tips
- Budget-friendly seasonal eating strategies

Would you like me to focus on a specific type of ${season} cooking, recommend recipes using particular seasonal ingredients, or provide guidance on shopping for and storing ${season} produce?`;
    }
    
    /**
     * Suggest recipes based on user input
     * @param {string} userInput - User's input
     * @returns {string} Recipe suggestions
     */
    suggestRecipes(userInput) {
        return `# Recipe Suggestions

In a complete implementation with an AI model and culinary expertise, I would provide personalized recipe recommendations based on your preferences, dietary needs, available ingredients, and cooking skill level.

## Recommended Recipes

I would suggest 5-7 recipes that:
- Match your dietary preferences (${this.state.dietaryRestrictions.length > 0 ? this.state.dietaryRestrictions.join(", ") : "omnivore"})
- Avoid your allergens (${this.state.allergies.length > 0 ? this.state.allergies.join(", ") : "none specified"})
- Suit your cooking skill level (${this.state.cookingSkillLevel})
- Use ingredients you likely have on hand
- Can be prepared with your available equipment
- Match your time constraints

## Quick & Easy Meals (Under 30 Minutes)

- **Recipe 1**: Brief description highlighting key features
- **Recipe 2**: Brief description highlighting key features
- **Recipe 3**: Brief description highlighting key features

## Make-Ahead & Batch Cooking Options

- **Recipe 1**: Brief description highlighting key features
- **Recipe 2**: Brief description highlighting key features

## Weekend Cooking Projects

- **Recipe 1**: Brief description highlighting key features
- **Recipe 2**: Brief description highlighting key features

## Recipe Customization Options

For each recipe, I would provide:
- Ingredient substitution possibilities
- Flavor variation suggestions
- Scaling information (for fewer or more servings)
- Make-ahead and storage guidance
- Serving and pairing recommendations

Would you like a detailed recipe for any of these suggestions, or would you prefer different types of recipes based on specific ingredients, cuisines, or dietary goals?`;
    }
    
    /**
     * Get culinary suggestions based on user interaction
     * @param {string} requestType - Type of culinary request
     * @returns {Array<string>} Culinary suggestions
     */
    getCulinarySuggestions(requestType) {
        const suggestions = [];
        
        // Add type-specific suggestions
        if (requestType === "recipe") {
            suggestions.push("How do I make chicken curry?");
            suggestions.push("Simple vegetarian dinner recipes");
            suggestions.push("Suggest a dessert recipe");
        } else if (requestType === "meal_planning") {
            suggestions.push("Create a 5-day meal plan");
            suggestions.push("Healthy lunch ideas for the week");
            suggestions.push("Meal prep suggestions for busy weeks");
        } else if (requestType === "substitution") {
            suggestions.push("What can I substitute for eggs in baking?");
            suggestions.push("Dairy-free alternatives to heavy cream");
            suggestions.push("I don't have breadcrumbs, what can I use instead?");
        } else if (requestType === "technique") {
            suggestions.push("How do I properly sear a steak?");
            suggestions.push("Tips for crispy roasted vegetables");
            suggestions.push("What's the best way to cook rice?");
        } else if (requestType === "equipment") {
            suggestions.push("Do I need a stand mixer for baking?");
            suggestions.push("Best knives for a home kitchen");
            suggestions.push("How to care for cast iron pans");
        } else if (requestType === "nutrition") {
            suggestions.push("High-protein vegetarian meal ideas");
            suggestions.push("How to reduce sodium in cooking");
            suggestions.push("Balanced plate recommendations");
        } else if (requestType === "food_safety") {
            suggestions.push("How long can I store leftovers?");
            suggestions.push("Safe internal temperatures for meat");
            suggestions.push("Can I freeze this dish?");
        } else if (requestType === "cuisine") {
            suggestions.push("Essential ingredients for Thai cooking");
            suggestions.push("Authentic Italian pasta dishes");
            suggestions.push("Introduction to Middle Eastern cuisine");
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "Quick 15-minute dinner ideas",
                "What can I make with chicken and rice?",
                "Healthy breakfast suggestions",
                "Tips for improving my knife skills",
                "One-pot meal recipes",
                "How to make homemade bread",
                "Best way to store fresh herbs"
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
     * Save user preferences
     * @param {Object} preferences - User preferences to save
     * @returns {boolean} Success status
     */
    savePreferences(preferences) {
        try {
            this.state.userPreferences = { ...this.state.userPreferences, ...preferences };
            localStorage.setItem(
                'jaat-mode14-preferences',
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
            localStorage.removeItem('jaat-mode14-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Save a recipe
     * @param {Object} recipe - Recipe to save
     * @returns {boolean} Success status
     */
    saveRecipe(recipe) {
        if (!recipe) return false;
        
        // Add the recipe to saved recipes
        this.state.savedRecipes.push({
            ...recipe,
            savedAt: new Date().toISOString()
        });
        
        // Save updated recipes
        this.savePreferences({ savedRecipes: this.state.savedRecipes });
        return true;
    }
    
    /**
     * Save a meal plan
     * @param {Object} mealPlan - Meal plan to save
     * @returns {boolean} Success status
     */
    saveMealPlan(mealPlan) {
        if (!mealPlan) return false;
        
        // Add the meal plan to saved meal plans
        this.state.mealPlans.push({
            ...mealPlan,
            savedAt: new Date().toISOString()
        });
        
        // Save updated meal plans
        this.savePreferences({ mealPlans: this.state.mealPlans });
        return true;
    }
    
    /**
     * Add dietary restriction
     * @param {string} restriction - Dietary restriction to add
     * @returns {boolean} Success status
     */
    addDietaryRestriction(restriction) {
        if (!restriction || this.state.dietaryRestrictions.includes(restriction)) return false;
        
        // Add the restriction
        this.state.dietaryRestrictions.push(restriction);
        
        // Save updated restrictions
        this.savePreferences({ dietaryRestrictions: this.state.dietaryRestrictions });
        return true;
    }
    
    /**
     * Add allergy
     * @param {string} allergy - Allergy to add
     * @returns {boolean} Success status
     */
    addAllergy(allergy) {
        if (!allergy || this.state.allergies.includes(allergy)) return false;
        
        // Add the allergy
        this.state.allergies.push(allergy);
        
        // Save updated allergies
        this.savePreferences({ allergies: this.state.allergies });
        return true;
    }
    
    /**
     * Add disliked ingredient
     * @param {string} ingredient - Disliked ingredient to add
     * @returns {boolean} Success status
     */
    addDislikedIngredient(ingredient) {
        if (!ingredient || this.state.dislikedIngredients.includes(ingredient)) return false;
        
        // Add the disliked ingredient
        this.state.dislikedIngredients.push(ingredient);
        
        // Save updated disliked ingredients
        this.savePreferences({ dislikedIngredients: this.state.dislikedIngredients });
        return true;
    }
    
    /**
     * Add favorite ingredient
     * @param {string} ingredient - Favorite ingredient to add
     * @returns {boolean} Success status
     */
    addFavoriteIngredient(ingredient) {
        if (!ingredient || this.state.favoriteIngredients.includes(ingredient)) return false;
        
        // Add the favorite ingredient
        this.state.favoriteIngredients.push(ingredient);
        
        // Save updated favorite ingredients
        this.savePreferences({ favoriteIngredients: this.state.favoriteIngredients });
        return true;
    }
    
    /**
     * Utility method to capitalize words
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalizeWords(str) {
        if (!str) return '';
        return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
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
            dietaryRestrictions: this.state.dietaryRestrictions,
            allergies: this.state.allergies,
            cookingSkillLevel: this.state.cookingSkillLevel,
            recipeCount: this.state.savedRecipes.length,
            mealPlanCount: this.state.mealPlans.length,
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
    window.jaatAIModes.recipeChef = new RecipeChefMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecipeChefMode;
}
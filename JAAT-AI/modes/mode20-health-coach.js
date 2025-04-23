/**
 * JAAT-AI Health Coach Mode
 * AI mode providing general health and wellness guidance
 * Mode ID: 20
 */

class HealthCoachMode {
    constructor() {
        // Mode metadata
        this.id = "20";
        this.name = "Health Coach";
        this.description = "Your AI guide for general health and wellness information";
        this.icon = "ri-heart-pulse-line";
        this.color = "#ef4444"; // Red color
        this.category = "wellness";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 3000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 7, // 1-10 scale (higher = more personality)
            creativityLevel: 6, // 1-10 scale
            formalityLevel: 5, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            supportivenessLevel: 8, // 1-10 scale 
            motivationalLevel: 7, // 1-10 scale
            practicality: 9 // 1-10 scale (higher = more practical advice)
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            healthTopics: [], // Topics the user has explored
            fitnessGoals: [], // User's fitness goals
            dietaryPreferences: [], // User's dietary preferences/restrictions
            healthChallenges: [], // User's health challenges
            sessionStartTime: new Date(),
            responseCount: 0,
            disclaimerAccepted: false
        };
        
        // Health and wellness topics
        this.healthTopics = {
            "exercise": {
                name: "Exercise & Fitness",
                description: "Physical activity and structured movement for health benefits",
                subtopics: [
                    "Cardio Fitness",
                    "Strength Training",
                    "Flexibility & Mobility",
                    "Exercise Plans",
                    "Workout Recovery",
                    "Sports Performance"
                ]
            },
            "nutrition": {
                name: "Nutrition",
                description: "Dietary patterns, food choices, and nutritional principles",
                subtopics: [
                    "Balanced Diet",
                    "Macronutrients",
                    "Micronutrients",
                    "Meal Planning",
                    "Healthy Eating Patterns",
                    "Dietary Approaches"
                ]
            },
            "sleep": {
                name: "Sleep",
                description: "Sleep quality, duration, and habits for optimal health",
                subtopics: [
                    "Sleep Hygiene",
                    "Sleep Cycles",
                    "Sleep Environments",
                    "Sleep Disorders",
                    "Recovery & Rest",
                    "Circadian Rhythms"
                ]
            },
            "stress_management": {
                name: "Stress Management",
                description: "Techniques and approaches for managing stress and promoting mental wellbeing",
                subtopics: [
                    "Stress Reduction",
                    "Relaxation Techniques",
                    "Mindfulness",
                    "Work-Life Balance",
                    "Time Management",
                    "Emotional Regulation"
                ]
            },
            "weight_management": {
                name: "Weight Management",
                description: "Healthy approaches to managing body weight and composition",
                subtopics: [
                    "Healthy Weight Principles",
                    "Sustainable Weight Loss",
                    "Metabolic Health",
                    "Body Composition",
                    "Habit Formation",
                    "Behavioral Strategies"
                ]
            },
            "preventive_health": {
                name: "Preventive Health",
                description: "Practices to maintain health and prevent illness",
                subtopics: [
                    "Health Screenings",
                    "Preventive Practices",
                    "Immune Support",
                    "Chronic Disease Prevention",
                    "Healthy Aging",
                    "Environmental Health"
                ]
            },
            "mental_wellbeing": {
                name: "Mental Wellbeing",
                description: "Practices supporting psychological and emotional health",
                subtopics: [
                    "Emotional Health",
                    "Psychological Resilience",
                    "Positive Psychology",
                    "Mindfulness Practices",
                    "Mental Health Maintenance",
                    "Cognitive Wellbeing"
                ]
            },
            "lifestyle_habits": {
                name: "Lifestyle Habits",
                description: "Daily behaviors and routines that impact overall health",
                subtopics: [
                    "Daily Routines",
                    "Healthy Habits",
                    "Digital Wellbeing",
                    "Social Connection",
                    "Environmental Factors",
                    "Balance & Integration"
                ]
            }
        };
        
        // Exercise types and their benefits
        this.exerciseTypes = {
            "cardio": {
                name: "Cardiovascular Exercise",
                description: "Activities that increase heart rate and breathing for extended periods",
                examples: ["Walking", "Running", "Cycling", "Swimming", "Dancing", "Rowing"],
                benefits: [
                    "Improves heart and lung function",
                    "Helps manage weight",
                    "Reduces risk of chronic diseases",
                    "Boosts mood and energy levels",
                    "Improves sleep quality",
                    "Enhances overall endurance"
                ],
                beginner_tips: [
                    "Start with 10-15 minutes daily of brisk walking",
                    "Gradually increase duration before intensity",
                    "Mix different activities to prevent boredom",
                    "Focus on consistency rather than performance",
                    "Use the 'talk test' - you should be able to hold a conversation"
                ]
            },
            "strength": {
                name: "Strength Training",
                description: "Activities that build muscle strength, power, and endurance",
                examples: ["Bodyweight exercises", "Weight lifting", "Resistance band training", "Circuit training", "Pilates", "Functional training"],
                benefits: [
                    "Builds and maintains muscle mass",
                    "Increases bone density",
                    "Improves joint function and stability",
                    "Boosts metabolism",
                    "Enhances functional capacity",
                    "Reduces risk of injury"
                ],
                beginner_tips: [
                    "Start with bodyweight exercises to learn proper form",
                    "Focus on compound movements that work multiple muscle groups",
                    "Begin with 2-3 sessions per week with rest days between",
                    "Prioritize form over weight/resistance",
                    "Include all major muscle groups for balanced development"
                ]
            },
            "flexibility": {
                name: "Flexibility & Mobility",
                description: "Activities that improve range of motion and joint mobility",
                examples: ["Stretching", "Yoga", "Tai Chi", "Mobility drills", "Dynamic warm-ups", "Foam rolling"],
                benefits: [
                    "Improves range of motion",
                    "Reduces muscle tension and soreness",
                    "Enhances posture and alignment",
                    "Decreases risk of injury",
                    "Improves athletic performance",
                    "Can help reduce stress"
                ],
                beginner_tips: [
                    "Hold static stretches for 20-30 seconds without bouncing",
                    "Include flexibility work after warming up or post-workout",
                    "Focus on major muscle groups especially those that feel tight",
                    "Use gentle movements and never stretch to the point of pain",
                    "Consider taking a beginner yoga or mobility class for guidance"
                ]
            },
            "balance": {
                name: "Balance & Stability",
                description: "Activities that improve coordination, stability, and body control",
                examples: ["Single-leg stands", "Stability ball exercises", "Bosu ball training", "Balance board work", "Yoga balance poses", "Tai Chi"],
                benefits: [
                    "Reduces fall risk",
                    "Improves coordination",
                    "Enhances body awareness",
                    "Strengthens stabilizing muscles",
                    "Improves posture",
                    "Supports overall functional fitness"
                ],
                beginner_tips: [
                    "Start with simple exercises near a wall or sturdy surface for support",
                    "Gradually increase the difficulty as your balance improves",
                    "Practice balance exercises when you're fresh, not fatigued",
                    "Include balance training 2-3 times per week",
                    "Focus on quality of movement rather than duration"
                ]
            },
            "hiit": {
                name: "High-Intensity Interval Training",
                description: "Alternating periods of intense effort with recovery periods",
                examples: ["Sprint intervals", "Circuit training", "Tabata protocol", "HIIT classes", "Jump rope intervals", "Burpee sequences"],
                benefits: [
                    "Efficient for time-limited schedules",
                    "Improves cardiovascular fitness",
                    "Increases metabolic rate",
                    "Builds endurance and strength simultaneously",
                    "Adaptable to many fitness levels",
                    "No specialized equipment necessary"
                ],
                beginner_tips: [
                    "Start with longer work-to-rest ratios (like 1:2 or 1:3)",
                    "Begin with just 10-15 minutes total",
                    "Choose exercises you're comfortable with",
                    "Modify movements as needed",
                    "Allow adequate recovery between HIIT sessions (24-48 hours)"
                ]
            }
        };
        
        // Nutritional guidelines and principles
        this.nutritionGuidelines = {
            "balanced_diet": {
                name: "Balanced Diet Principles",
                description: "Guidelines for creating nutritionally balanced meals and eating patterns",
                key_principles: [
                    "Include a variety of colorful fruits and vegetables",
                    "Choose whole grains over refined grains",
                    "Include lean protein sources with each meal",
                    "Incorporate healthy fats in moderation",
                    "Stay adequately hydrated",
                    "Practice portion awareness",
                    "Minimize highly processed foods and added sugars"
                ],
                meal_planning_tips: [
                    "Aim for half your plate to be vegetables and fruits",
                    "Include a palm-sized portion of protein with meals",
                    "Add a cupped handful of whole grains or starchy vegetables",
                    "Include a thumb-sized portion of healthy fats",
                    "Prep ingredients or meals in advance when possible",
                    "Keep nutritious snacks readily available"
                ]
            },
            "macronutrients": {
                name: "Macronutrients",
                description: "The primary nutrients needed in larger amounts: protein, carbohydrates, and fats",
                components: {
                    "protein": {
                        name: "Protein",
                        function: "Supports tissue growth and repair, immune function, and enzyme production",
                        sources: ["Lean meats", "Poultry", "Fish", "Eggs", "Dairy", "Legumes", "Tofu", "Tempeh", "Nuts and seeds"],
                        guidelines: "Generally aim for 0.8-2.0g per kg of body weight depending on activity level and goals"
                    },
                    "carbohydrates": {
                        name: "Carbohydrates",
                        function: "Primary energy source, particularly for brain function and high-intensity activities",
                        sources: ["Whole grains", "Fruits", "Vegetables", "Legumes", "Tubers"],
                        guidelines: "Focus on fiber-rich, minimally processed sources distributed throughout the day"
                    },
                    "fats": {
                        name: "Fats",
                        function: "Energy storage, hormone production, cell membrane structure, and nutrient absorption",
                        sources: ["Avocados", "Olive oil", "Nuts", "Seeds", "Fatty fish", "Eggs"],
                        guidelines: "Emphasize unsaturated fats while limiting saturated and avoiding trans fats"
                    }
                }
            },
            "micronutrients": {
                name: "Micronutrients",
                description: "Vitamins and minerals needed in smaller amounts for various bodily functions",
                key_vitamins: [
                    "Vitamin A - Important for vision, immune function, and cell growth",
                    "B Vitamins - Critical for energy metabolism and nervous system function",
                    "Vitamin C - Supports immune function and acts as an antioxidant",
                    "Vitamin D - Essential for bone health and immune function",
                    "Vitamin E - Functions as an antioxidant protecting cells",
                    "Vitamin K - Necessary for blood clotting and bone health"
                ],
                key_minerals: [
                    "Calcium - Essential for bone health and muscle function",
                    "Iron - Critical for oxygen transport in the blood",
                    "Magnesium - Involved in over 300 enzymatic reactions",
                    "Zinc - Important for immune function and wound healing",
                    "Potassium - Regulates fluid balance and nerve function",
                    "Selenium - Functions as an antioxidant and supports thyroid health"
                ],
                optimization_strategies: [
                    "Eat a variety of colorful fruits and vegetables daily",
                    "Include different food groups in meals",
                    "Consider seasonal eating for peak nutrient content",
                    "Minimize overcooking vegetables to preserve nutrients",
                    "Address specific needs based on age, sex, and health status"
                ]
            },
            "hydration": {
                name: "Hydration",
                description: "Guidelines for maintaining proper fluid balance",
                importance: [
                    "Regulates body temperature",
                    "Transports nutrients and oxygen",
                    "Lubricates joints and tissues",
                    "Supports cognitive function",
                    "Assists with waste removal",
                    "Maintains blood volume and pressure"
                ],
                recommendations: [
                    "General guideline: approximately 2-3 liters (8-12 cups) daily for most adults",
                    "Needs increase with exercise, heat exposure, illness, and certain medications",
                    "Water is the optimal hydration source for most people",
                    "Other contributors include fruits, vegetables, soups, and herbal teas",
                    "Monitor urine color (pale yellow indicates good hydration)",
                    "Distribute fluid intake throughout the day"
                ]
            },
            "eating_patterns": {
                name: "Healthy Eating Patterns",
                description: "Overall approaches to dietary choices and meal timing",
                common_approaches: {
                    "mediterranean": {
                        name: "Mediterranean Pattern",
                        features: [
                            "Abundant plant foods (fruits, vegetables, whole grains, legumes, nuts)",
                            "Olive oil as primary fat source",
                            "Moderate consumption of fish, poultry, and dairy",
                            "Limited red meat consumption",
                            "Optional moderate wine consumption with meals"
                        ]
                    },
                    "dash": {
                        name: "DASH Pattern",
                        features: [
                            "Rich in fruits, vegetables, and whole grains",
                            "Includes low-fat dairy, lean meats, nuts, and beans",
                            "Limits sodium, sweets, sugary beverages, and red meats",
                            "Emphasizes potassium, calcium, and magnesium-rich foods",
                            "Portion control and calorie awareness"
                        ]
                    },
                    "plant_based": {
                        name: "Plant-Based Patterns",
                        features: [
                            "Emphasizes minimally processed plant foods",
                            "Varies from vegetarian to vegan to flexitarian approaches",
                            "Focuses on legumes, whole grains, fruits, vegetables, nuts, and seeds",
                            "May include modest amounts of animal products depending on specific approach",
                            "Emphasizes variety for nutritional completeness"
                        ]
                    }
                },
                implementation_tips: [
                    "Focus on overall pattern rather than individual foods",
                    "Make gradual shifts toward healthier choices",
                    "Consider cultural preferences and traditions",
                    "Adapt patterns to personal needs and preferences",
                    "Emphasize enjoyment and sustainability"
                ]
            }
        };
        
        // Sleep optimization strategies
        this.sleepStrategies = {
            "sleep_hygiene": {
                name: "Sleep Hygiene",
                description: "Practices and habits conducive to good sleep quality and duration",
                practices: [
                    "Maintain a consistent sleep schedule, even on weekends",
                    "Create a relaxing pre-sleep routine (reading, gentle stretching, etc.)",
                    "Make your bedroom dark, quiet, and cool",
                    "Use your bed primarily for sleep and intimacy only",
                    "Avoid screens 1-2 hours before bedtime",
                    "Limit caffeine after midday and alcohol before bed",
                    "Exercise regularly, but not too close to bedtime",
                    "Avoid large meals and excessive fluids before bed"
                ]
            },
            "sleep_environment": {
                name: "Sleep Environment Optimization",
                description: "Creating an ideal physical environment for quality sleep",
                elements: [
                    "Temperature: 65-68°F (18-20°C) is ideal for most people",
                    "Lighting: As dark as possible, consider blackout curtains",
                    "Noise: Minimize disruptions, consider white noise if needed",
                    "Bedding: Comfortable, supportive mattress and pillows",
                    "Air quality: Well-ventilated room with clean air",
                    "Electronics: Remove or power down devices that emit light or sound",
                    "Clutter: Maintain a tidy, peaceful space"
                ]
            },
            "circadian_rhythms": {
                name: "Circadian Rhythm Support",
                description: "Aligning habits with your body's natural sleep-wake cycle",
                strategies: [
                    "Get morning sunlight exposure soon after waking",
                    "Maintain consistent sleep and wake times",
                    "Dim lights in the evening as bedtime approaches",
                    "Avoid bright light exposure during the night",
                    "Time meals appropriately (not too late in the evening)",
                    "Exercise at regular times that work with your schedule",
                    "Consider natural light exposure throughout the day"
                ]
            },
            "sleep_challenges": {
                name: "Common Sleep Challenges",
                description: "Solutions for typical sleep disruptions",
                issues: {
                    "falling_asleep": {
                        name: "Difficulty Falling Asleep",
                        strategies: [
                            "Develop a consistent pre-sleep routine",
                            "Practice relaxation techniques (deep breathing, progressive muscle relaxation)",
                            "Try a 'brain dump' to write down thoughts before bed",
                            "Keep a regular sleep-wake schedule",
                            "Avoid clock-watching if you can't sleep"
                        ]
                    },
                    "staying_asleep": {
                        name: "Difficulty Staying Asleep",
                        strategies: [
                            "Check room temperature (too hot disrupts sleep)",
                            "Limit fluids before bed to reduce nighttime bathroom trips",
                            "Address potential noise disruptions",
                            "Consider sleep timing and duration",
                            "Evaluate comfort of mattress and bedding"
                        ]
                    },
                    "early_waking": {
                        name: "Early Morning Waking",
                        strategies: [
                            "Ensure room remains dark until desired wake time",
                            "Check if hunger is causing early waking",
                            "Evaluate evening alcohol consumption",
                            "Consider adjusting bedtime to match natural sleep duration",
                            "Address potential stressors causing alertness"
                        ]
                    }
                }
            },
            "sleep_and_health": {
                name: "Sleep and Overall Health",
                description: "Relationships between sleep and various health aspects",
                connections: [
                    "Immune function: Quality sleep strengthens immune response",
                    "Cognitive function: Sleep supports learning, memory, and decision-making",
                    "Emotional wellbeing: Sleep regulates mood and stress resilience",
                    "Metabolic health: Sleep influences hunger hormones and metabolism",
                    "Cardiovascular health: Adequate sleep supports heart health",
                    "Physical recovery: Deep sleep stages facilitate tissue repair",
                    "Longevity: Consistent good sleep is associated with longer lifespan"
                ]
            }
        };
        
        // Stress management techniques
        this.stressManagementTechniques = {
            "breathing": {
                name: "Breathing Techniques",
                description: "Controlled breathing practices to reduce stress and induce relaxation",
                techniques: [
                    {
                        name: "4-7-8 Breathing",
                        instructions: "Inhale quietly through your nose for 4 seconds, hold breath for 7 seconds, exhale completely through mouth for 8 seconds, repeat 3-4 times"
                    },
                    {
                        name: "Box Breathing",
                        instructions: "Inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold for 4 counts, repeat for 2-3 minutes"
                    },
                    {
                        name: "Diaphragmatic Breathing",
                        instructions: "Place one hand on chest and the other on abdomen. Breathe deeply through nose so abdomen expands. Exhale slowly through lips, repeat 5-10 minutes"
                    }
                ]
            },
            "mindfulness": {
                name: "Mindfulness Practices",
                description: "Techniques to bring attention to the present moment without judgment",
                practices: [
                    {
                        name: "Body Scan",
                        instructions: "Progressively focus attention on different parts of your body from toes to head, noticing sensations without judgment"
                    },
                    {
                        name: "Mindful Observation",
                        instructions: "Choose an object and focus on it for 5 minutes, observing it as if seeing it for the first time"
                    },
                    {
                        name: "Mindful Listening",
                        instructions: "Close eyes and notice all sounds around you without labeling or judging them"
                    },
                    {
                        name: "STOP Practice",
                        instructions: "Stop, Take a breath, Observe your thoughts and feelings, Proceed with awareness"
                    }
                ]
            },
            "physical_activities": {
                name: "Physical Stress Relief",
                description: "Movement-based approaches to reducing stress",
                activities: [
                    {
                        name: "Walking Meditation",
                        benefits: "Combines gentle physical activity with mindfulness, accessible for most people"
                    },
                    {
                        name: "Yoga",
                        benefits: "Integrates breathing, movement, and mindfulness to reduce stress and tension"
                    },
                    {
                        name: "Tai Chi",
                        benefits: "Flowing movements promote relaxation, focus, and body awareness"
                    },
                    {
                        name: "Progressive Muscle Relaxation",
                        benefits: "Systematically tensing and relaxing muscle groups to release physical tension"
                    },
                    {
                        name: "Dance",
                        benefits: "Expressive movement that releases tension and promotes joy and creativity"
                    }
                ]
            },
            "cognitive_approaches": {
                name: "Cognitive Approaches",
                description: "Mental strategies for managing stress responses",
                strategies: [
                    {
                        name: "Reframing",
                        description: "Changing perspective on stressful situations to view them as challenges rather than threats"
                    },
                    {
                        name: "Worry Time",
                        description: "Scheduling a specific time to address worries rather than throughout the day"
                    },
                    {
                        name: "Gratitude Practice",
                        description: "Regularly acknowledging things you're thankful for to shift focus from stressors"
                    },
                    {
                        name: "Values Clarification",
                        description: "Identifying core values to make decisions aligned with what matters most to you"
                    },
                    {
                        name: "Thought Records",
                        description: "Documenting negative thoughts and examining evidence for and against them"
                    }
                ]
            },
            "lifestyle_factors": {
                name: "Lifestyle Stress Management",
                description: "Daily habits and routines that reduce overall stress levels",
                factors: [
                    {
                        name: "Time Management",
                        strategies: "Prioritizing tasks, setting boundaries, breaking projects into smaller steps, using time blocks"
                    },
                    {
                        name: "Social Connection",
                        strategies: "Regular quality time with supportive people, asking for help when needed, limiting time with negative influences"
                    },
                    {
                        name: "Digital Boundaries",
                        strategies: "Scheduled breaks from devices, notification management, media consumption limits"
                    },
                    {
                        name: "Nature Exposure",
                        strategies: "Regular time outdoors, bringing natural elements into living spaces, 'forest bathing'"
                    },
                    {
                        name: "Creative Expression",
                        strategies: "Regular engagement in creative activities like art, music, writing, or other personally meaningful creative outlets"
                    }
                ]
            }
        };
        
        // Habit formation strategies
        this.habitFormationStrategies = {
            "tiny_habits": {
                name: "Tiny Habits Method",
                description: "Starting with extremely small behaviors that are easy to do",
                key_principles: [
                    "Make it tiny (so small it feels almost ridiculous)",
                    "Anchor to an existing habit (after I..., I will...)",
                    "Celebrate immediately after completing the habit",
                    "Focus on behavior, not motivation",
                    "Grow habits naturally from small to larger"
                ]
            },
            "habit_stacking": {
                name: "Habit Stacking",
                description: "Linking a new habit to an established habit",
                key_principles: [
                    "Identify a current habit you do daily",
                    "Use that habit as a trigger for the new habit",
                    "Keep the new habit simple at first",
                    "Follow the formula: 'After [current habit], I will [new habit]'",
                    "Chain multiple habits together once established"
                ]
            },
            "environment_design": {
                name: "Environment Design",
                description: "Structuring your environment to make good habits easier and bad habits harder",
                key_principles: [
                    "Make desirable habits obvious and convenient",
                    "Make undesirable habits invisible and difficult",
                    "Reduce friction for good habits",
                    "Increase friction for bad habits",
                    "Use visual cues and reminders"
                ]
            },
            "implementation_intentions": {
                name: "Implementation Intentions",
                description: "Specific plans that link situational cues with responses",
                key_principles: [
                    "Use the formula 'When X happens, I will do Y'",
                    "Be very specific about the situation and the action",
                    "Anticipate obstacles and plan for them",
                    "Write down your implementation intentions",
                    "Review and revise regularly"
                ]
            },
            "habit_tracking": {
                name: "Habit Tracking",
                description: "Monitoring habit performance to increase awareness and motivation",
                key_principles: [
                    "Don't break the chain (maintain a streak)",
                    "Use a physical or digital tracker",
                    "Make tracking itself a habit",
                    "Measure the right things",
                    "Review progress regularly"
                ]
            }
        };
        
        // Common health and wellness myths and facts
        this.healthMythsFacts = [
            {
                myth: "You need to exercise for at least 30-60 minutes for it to be beneficial.",
                fact: "Even short bouts of physical activity provide health benefits. Research shows that multiple short sessions (even 2-3 minutes) throughout the day can accumulate to provide significant health improvements."
            },
            {
                myth: "Exercise needs to be intense to be effective.",
                fact: "Low to moderate intensity exercise, like walking, provides substantial health benefits. The best exercise is the one you'll actually do consistently."
            },
            {
                myth: "Eating fat makes you fat.",
                fact: "Healthy fats are an essential part of a balanced diet and support many bodily functions. Weight gain is primarily related to overall calorie consumption and energy balance, not specific macronutrients."
            },
            {
                myth: "You need to drink 8 glasses of water a day.",
                fact: "Hydration needs vary based on many factors including activity level, climate, and individual physiology. Many foods also contribute to hydration, and thirst is generally a good guide."
            },
            {
                myth: "Eating late at night causes weight gain.",
                fact: "Total calorie consumption over time, not specific eating times, primarily determines weight changes. However, eating patterns can influence hunger, metabolism, and sleep quality."
            },
            {
                myth: "Detoxes and cleanses are necessary to eliminate toxins.",
                fact: "The body has sophisticated systems (primarily the liver and kidneys) that continuously remove waste products. Most 'detox' products have no proven benefit beyond the body's natural processes."
            },
            {
                myth: "Stretching prevents all exercise injuries.",
                fact: "While flexibility is important, research shows that static stretching alone doesn't significantly reduce injury risk. A dynamic warm-up specific to your activity is more effective."
            },
            {
                myth: "More protein is always better for building muscle.",
                fact: "Protein needs increase with resistance training, but there's an upper limit to how much protein the body can effectively use for muscle building (typically 1.6-2.2g/kg of body weight/day)."
            }
        ];
        
        // Suggestions specific to this mode
        this.suggestions = [
            "How can I improve my sleep?",
            "What's a good beginner exercise routine?",
            "How do I start eating healthier?",
            "What are some effective stress management techniques?",
            "How can I build a sustainable fitness habit?",
            "What should I eat before and after workouts?",
            "How much water should I drink daily?",
            "What's the best way to manage work-related stress?",
            "How can I improve my energy levels naturally?",
            "What are some quick healthy meal ideas?"
        ];
        
        // Special features
        this.features = {
            exerciseGuidance: true,
            nutritionInformation: true,
            sleepOptimization: true,
            stressManagement: true,
            habitFormation: true,
            wellnessEducation: true,
            goalSetting: true,
            progressTracking: true,
            motivationalSupport: true,
            mythBusting: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 50,
            DISCLAIMER: "This information is provided for general educational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions about your health.",
            GREETING_PHRASES: [
                "Hello! I'm your AI health coach. How can I support your wellness journey today?",
                "Welcome to health coaching! What aspect of your wellbeing would you like to focus on?",
                "Hi there! I'm here to provide health and wellness information. What can I help you with today?",
                "Greetings! I'm your virtual health coach. What health topic would you like to explore?",
                "Hello! I'm here to support your health goals. What would you like guidance on today?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Health Coach mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set fitness goals if provided
        if (options.fitnessGoals && Array.isArray(options.fitnessGoals)) {
            this.state.fitnessGoals = options.fitnessGoals;
        }
        
        // Set dietary preferences if provided
        if (options.dietaryPreferences && Array.isArray(options.dietaryPreferences)) {
            this.state.dietaryPreferences = options.dietaryPreferences;
        }
        
        // Set health challenges if provided
        if (options.healthChallenges && Array.isArray(options.healthChallenges)) {
            this.state.healthChallenges = options.healthChallenges;
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode20-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Health Coach mode");
                
                // Load fitness goals if saved
                if (this.state.userPreferences.fitnessGoals) {
                    this.state.fitnessGoals = this.state.userPreferences.fitnessGoals;
                }
                
                // Load dietary preferences if saved
                if (this.state.userPreferences.dietaryPreferences) {
                    this.state.dietaryPreferences = this.state.userPreferences.dietaryPreferences;
                }
                
                // Load health challenges if saved
                if (this.state.userPreferences.healthChallenges) {
                    this.state.healthChallenges = this.state.userPreferences.healthChallenges;
                }
                
                // Load health topics if saved
                if (this.state.userPreferences.healthTopics) {
                    this.state.healthTopics = this.state.userPreferences.healthTopics;
                }
                
                // Load disclaimer acceptance if saved
                if (this.state.userPreferences.disclaimerAccepted) {
                    this.state.disclaimerAccepted = this.state.userPreferences.disclaimerAccepted;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode20-history');
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
        
        console.log(`Health Coach mode initialized with ${this.state.fitnessGoals.length} fitness goals and ${this.state.dietaryPreferences.length} dietary preferences`);
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
     * Process user input and generate a health coaching response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with health content
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your AI health coach. I can provide general information about exercise, nutrition, sleep, stress management, and other wellness topics. What health or wellness topic would you like to explore today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing health coaching request`);
        
        // Record interaction time
        this.state.lastInteractionTime = new Date();
        
        // Check if disclaimer has been accepted yet
        if (!this.state.disclaimerAccepted) {
            // If user accepts the disclaimer
            if (/\b(?:i\s+(?:accept|agree|understand|acknowledge))\b/i.test(userInput.toLowerCase())) {
                this.state.disclaimerAccepted = true;
                this.savePreferences({ disclaimerAccepted: true });
            } else {
                // Provide disclaimer and request acknowledgment
                return {
                    text: `Before we proceed, please note: I provide general health information, not medical advice. I cannot replace consultation with healthcare professionals who can address your specific situation. \n\nTo continue, please explicitly acknowledge that you understand I'm providing general information, not medical advice, by saying "I understand" or "I accept".`,
                    type: "text",
                    source: this.name,
                    requiresAcknowledgment: true
                };
            }
        }
        
        // Add user message to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "user",
                content: userInput,
                timestamp: this.state.lastInteractionTime
            });
        }
        
        // Detect type of health coaching request
        const requestType = this.detectRequestType(userInput);
        
        // Identify health topic if applicable
        const topic = this.identifyHealthTopic(userInput);
        if (topic) {
            // Add to list of topics if not already present
            if (!this.state.healthTopics.includes(topic)) {
                this.state.healthTopics.push(topic);
                this.savePreferences({ healthTopics: this.state.healthTopics });
            }
        }
        
        // Extract fitness goals if mentioned
        const fitnessGoals = this.extractFitnessGoals(userInput);
        if (fitnessGoals && fitnessGoals.length > 0) {
            // Add new goals that aren't already tracked
            const newGoals = fitnessGoals.filter(goal => !this.state.fitnessGoals.includes(goal));
            if (newGoals.length > 0) {
                this.state.fitnessGoals = [...this.state.fitnessGoals, ...newGoals];
                this.savePreferences({ fitnessGoals: this.state.fitnessGoals });
            }
        }
        
        // Extract dietary preferences if mentioned
        const dietaryPreferences = this.extractDietaryPreferences(userInput);
        if (dietaryPreferences && dietaryPreferences.length > 0) {
            // Add new preferences that aren't already tracked
            const newPreferences = dietaryPreferences.filter(pref => !this.state.dietaryPreferences.includes(pref));
            if (newPreferences.length > 0) {
                this.state.dietaryPreferences = [...this.state.dietaryPreferences, ...newPreferences];
                this.savePreferences({ dietaryPreferences: this.state.dietaryPreferences });
            }
        }
        
        // Generate appropriate health coaching response
        const response = await this.generateHealthResponse(
            userInput, 
            requestType, 
            topic,
            context
        );
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date(),
                requestType: requestType,
                topic: topic
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode20-history',
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
     * Detect the type of health coaching request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for exercise advice request
        if (/\b(?:exercise|workout|fitness|training|cardio|strength|run|running|walk|walking|gym|weight lifting)\b/i.test(normalizedInput) &&
            /\b(?:how|what|recommend|suggest|advice|tips|start|begin|routine|plan|program|schedule)\b/i.test(normalizedInput)) {
            return "exercise_advice";
        }
        
        // Check for nutrition advice request
        if (/\b(?:nutrition|diet|eat|eating|food|meal|meals|recipe|recipes|healthy eating|calorie|calories|macros|protein|carbs|fat)\b/i.test(normalizedInput) &&
            /\b(?:how|what|recommend|suggest|advice|tips|plan|healthy|best|good|bad|avoid|ideas|should)\b/i.test(normalizedInput)) {
            return "nutrition_advice";
        }
        
        // Check for sleep advice request
        if (/\b(?:sleep|sleeping|insomnia|rest|nap|tired|fatigue|bedtime|night|snore|snoring|wake up|waking up)\b/i.test(normalizedInput) &&
            /\b(?:how|better|improve|help|problem|issue|trouble|can't|cant|difficult|advice|tips)\b/i.test(normalizedInput)) {
            return "sleep_advice";
        }
        
        // Check for stress management request
        if (/\b(?:stress|anxiety|anxious|worry|worried|overwhelm|overwhelmed|relax|relaxation|calm|tension|pressure|burnout|meditation|mindfulness)\b/i.test(normalizedInput) &&
            /\b(?:how|manage|reduce|handle|cope|deal|help|tips|advice|techniques|strategies|ways)\b/i.test(normalizedInput)) {
            return "stress_management";
        }
        
        // Check for habit formation request
        if (/\b(?:habit|routine|consistency|consistent|discipline|stick to|maintain|keep up|motivation|motivated|willpower)\b/i.test(normalizedInput) &&
            /\b(?:how|build|create|develop|form|start|begin|make|tips|advice|help)\b/i.test(normalizedInput)) {
            return "habit_formation";
        }
        
        // Check for symptom inquiry (redirect to medical disclaimer)
        if (/\b(?:symptom|pain|ache|hurt|hurts|hurting|diagnosis|diagnose|treatment|cure|heal|disease|condition|disorder|syndrome)\b/i.test(normalizedInput) &&
            /\b(?:what|why|how|is it|could it|should i|do i have|is this|mean|caused by|reason|treat)\b/i.test(normalizedInput)) {
            return "medical_inquiry";
        }
        
        // Check for myth clarification request
        if (/\b(?:myth|fact|true|truth|false|really|actually|hear|heard|told|read|believe|claim|debunk)\b/i.test(normalizedInput) &&
            /\b(?:is it|that|about|regarding|concerning|related to|on)\b/i.test(normalizedInput)) {
            return "myth_clarification";
        }
        
        // Check for goal setting request
        if (/\b(?:goal|objective|target|aim|aspiration|achieve|accomplishment|milestone)\b/i.test(normalizedInput) &&
            /\b(?:set|setting|create|establish|develop|realistic|smart|specific|measurable|track|progress)\b/i.test(normalizedInput)) {
            return "goal_setting";
        }
        
        // Default to general health inquiry
        return "general_health_inquiry";
    }
    
    /**
     * Identify health topic from user input
     * @param {string} input - User input
     * @returns {string|null} Health topic or null
     */
    identifyHealthTopic(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of health topics
        for (const topic in this.healthTopics) {
            if (normalizedInput.includes(topic.replace('_', ' ')) || 
                normalizedInput.includes(this.healthTopics[topic].name.toLowerCase())) {
                return topic;
            }
            
            // Check subtopics
            for (const subtopic of this.healthTopics[topic].subtopics) {
                if (normalizedInput.includes(subtopic.toLowerCase())) {
                    return topic;
                }
            }
        }
        
        // Check for specific keywords associated with each topic
        const topicKeywords = {
            "exercise": ["exercise", "workout", "fitness", "training", "cardio", "strength", "stretching", "flexibility", "gym", "sport", "run", "running", "walk", "walking", "physical activity"],
            "nutrition": ["nutrition", "diet", "eating", "food", "meal", "meals", "recipe", "macros", "protein", "carbs", "fat", "calories", "healthy eating", "vegetable", "fruit"],
            "sleep": ["sleep", "rest", "nap", "bedtime", "insomnia", "snore", "snoring", "tired", "fatigue", "bedtime", "wake up", "waking up"],
            "stress_management": ["stress", "anxiety", "relaxation", "calm", "tension", "worry", "pressure", "burnout", "meditation", "mindfulness", "breathing", "mental health", "emotional health"],
            "weight_management": ["weight", "pounds", "kilos", "fat loss", "lose weight", "gain weight", "metabolism", "calorie deficit", "calorie surplus", "body fat", "overweight", "diet"],
            "preventive_health": ["prevention", "checkup", "screening", "immune", "immunization", "vaccine", "hygiene", "preventive", "health check", "risk factors"],
            "mental_wellbeing": ["mental health", "mood", "happiness", "depression", "anxiety", "stress", "therapy", "counseling", "emotional", "wellbeing", "psychology"],
            "lifestyle_habits": ["habits", "routine", "lifestyle", "daily", "behavior", "schedule", "balance", "time management", "social", "relationships"]
        };
        
        for (const [topic, keywords] of Object.entries(topicKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return topic;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Extract fitness goals from user input
     * @param {string} input - User input
     * @returns {Array<string>|null} Fitness goals or null
     */
    extractFitnessGoals(input) {
        const normalizedInput = input.toLowerCase();
        
        // Common fitness goal phrases
        const fitnessGoalPhrases = [
            { regex: /\b(?:i\s+(?:want|would like|aim|hope|wish|desire|need)\s+to)\s+(.+?)(?:\.|\,|\!|\?|$)/i, group: 1 },
            { regex: /\b(?:my\s+(?:goal|aim|target|objective|plan|ambition)\s+is\s+to)\s+(.+?)(?:\.|\,|\!|\?|$)/i, group: 1 },
            { regex: /\b(?:i'm\s+trying\s+to)\s+(.+?)(?:\.|\,|\!|\?|$)/i, group: 1 }
        ];
        
        // Common fitness goal keywords to check in captured phrases
        const fitnessGoalKeywords = [
            "lose weight", "gain muscle", "build strength", "get stronger", "improve fitness", 
            "run", "marathon", "exercise more", "be more active", "workout", "train for", 
            "build endurance", "increase flexibility", "get fit", "tone", "leaner", 
            "more energy", "healthier", "reduce body fat", "improve health"
        ];
        
        const goals = [];
        
        // Check for fitness goal phrases
        for (const phrase of fitnessGoalPhrases) {
            const match = input.match(phrase.regex);
            if (match && match[phrase.group]) {
                const potentialGoal = match[phrase.group].trim().toLowerCase();
                
                // Check if the potential goal contains fitness keywords
                for (const keyword of fitnessGoalKeywords) {
                    if (potentialGoal.includes(keyword)) {
                        goals.push(potentialGoal);
                        break;
                    }
                }
            }
        }
        
        return goals.length > 0 ? goals : null;
    }
    
    /**
     * Extract dietary preferences from user input
     * @param {string} input - User input
     * @returns {Array<string>|null} Dietary preferences or null
     */
    extractDietaryPreferences(input) {
        const normalizedInput = input.toLowerCase();
        
        // Common dietary preferences and restrictions
        const dietaryKeywords = [
            "vegetarian", "vegan", "pescatarian", "gluten-free", "dairy-free", "lactose intolerant",
            "keto", "ketogenic", "low-carb", "paleo", "mediterranean", "plant-based", 
            "no meat", "no dairy", "no gluten", "no nuts", "nut allergy", "food allergy",
            "high-protein", "intermittent fasting", "organic", "whole food"
        ];
        
        const preferences = [];
        
        // Preference phrases
        const preferencePhrases = [
            { regex: /\b(?:i\s+(?:am|am\s+a|follow|follow\s+a|eat|eat\s+a|prefer|prefer\s+a)\s+(.+?)(?:\s+diet)?)\b/i, group: 1 },
            { regex: /\b(?:i\s+(?:don't|do\s+not|can't|cannot)\s+(?:eat|have|consume|tolerate))\s+(.+?)(?:\.|\,|\!|\?|$)/i, group: 1 },
            { regex: /\b(?:i'm\s+(?:on|following)\s+(?:a|the))\s+(.+?)(?:\s+diet)?\b/i, group: 1 },
            { regex: /\b(?:i\s+have\s+(?:a|an))\s+(.+?)(?:\s+allergy|intolerance|sensitivity)\b/i, group: 1 }
        ];
        
        // Check for dietary preference phrases
        for (const phrase of preferencePhrases) {
            const match = input.match(phrase.regex);
            if (match && match[phrase.group]) {
                const potentialPreference = match[phrase.group].trim().toLowerCase();
                
                // Check direct match with known preferences
                if (dietaryKeywords.includes(potentialPreference)) {
                    preferences.push(potentialPreference);
                } else {
                    // Check if it contains any of the known preferences
                    for (const keyword of dietaryKeywords) {
                        if (potentialPreference.includes(keyword)) {
                            preferences.push(keyword);
                            break;
                        }
                    }
                }
            }
        }
        
        // Direct check for dietary keywords in the input
        for (const keyword of dietaryKeywords) {
            if (normalizedInput.includes(keyword)) {
                if (!preferences.includes(keyword)) {
                    preferences.push(keyword);
                }
            }
        }
        
        return preferences.length > 0 ? preferences : null;
    }
    
    /**
     * Generate a health coaching response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of health request
     * @param {string} topic - Health topic if available
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateHealthResponse(userInput, requestType, topic, context = {}) {
        // In a real implementation, this would call an AI model API specialized in health information
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "exercise_advice":
                responseText = this.provideExerciseAdvice(userInput, topic);
                break;
                
            case "nutrition_advice":
                responseText = this.provideNutritionAdvice(userInput, topic);
                break;
                
            case "sleep_advice":
                responseText = this.provideSleepAdvice(userInput, topic);
                break;
                
            case "stress_management":
                responseText = this.provideStressManagementAdvice(userInput, topic);
                break;
                
            case "habit_formation":
                responseText = this.provideHabitFormationAdvice(userInput, topic);
                break;
                
            case "medical_inquiry":
                responseText = this.provideMedicalDisclaimerResponse(userInput, topic);
                break;
                
            case "myth_clarification":
                responseText = this.clarifyHealthMyth(userInput, topic);
                break;
                
            case "goal_setting":
                responseText = this.provideGoalSettingAdvice(userInput, topic);
                break;
                
            default:
                responseText = this.provideGeneralHealthInformation(userInput, topic);
        }
        
        // Add disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate health coaching suggestions
        const healthSuggestions = this.getHealthSuggestions(requestType, topic);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            topic: topic,
            suggestions: healthSuggestions
        };
    }
    
    /**
     * Provide exercise advice based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Health topic if available
     * @returns {string} Exercise advice
     */
    provideExerciseAdvice(userInput, topic) {
        // Try to identify which exercise type is being asked about
        const exerciseType = this.identifyExerciseType(userInput);
        
        if (!exerciseType) {
            // Provide general exercise advice if no specific type is identified
            return `# Exercise Guidance

In a complete implementation with an AI model and health expertise, I would provide personalized exercise recommendations based on your goals, preferences, and circumstances.

## General Exercise Recommendations

The American College of Sports Medicine and other global health organizations generally recommend:

- **Aerobic Activity**: 150-300 minutes of moderate-intensity or 75-150 minutes of vigorous-intensity activity per week
- **Strength Training**: 2-3 sessions per week targeting all major muscle groups
- **Flexibility Work**: 2-3 times per week, holding each stretch for 10-30 seconds
- **Balance Training**: Especially important as we age, 2-3 times per week

## Getting Started

If you're new to exercise:
- Begin with short, manageable sessions and gradually increase duration and intensity
- Choose activities you enjoy and can sustain long-term
- Prioritize consistency over intensity initially
- Allow for rest and recovery between sessions
- Consider working with a qualified fitness professional for proper form and technique

## Making It Sustainable

- Choose activities that align with your preferences and lifestyle
- Set realistic expectations and celebrate small wins
- Track your progress to stay motivated
- Mix up your routine to prevent boredom
- Find accountability through workout partners or classes

## Safety Considerations

- Start with a proper warm-up and end with a cool-down
- Listen to your body and respect pain signals (different from normal exercise discomfort)
- Stay hydrated before, during, and after exercise
- Wear appropriate footwear and clothing
- Consider health conditions that may affect your exercise approach

For more specific exercise recommendations, please let me know:
- Your fitness goals
- Current activity level and experience
- Any health considerations or limitations
- Available equipment or facilities
- Time available for exercise
- Activities you enjoy`;
        }
        
        const exerciseInfo = this.exerciseTypes[exerciseType];
        
        // Check if the user is asking about beginner advice
        const isBeginnerFocused = /\b(?:beginner|start|starting|begin|new to|novice|first time|never|inexperienced)\b/i.test(userInput);
        
        // Check if user is asking about benefits
        const isBenefitsFocused = /\b(?:benefit|benefits|good for|advantage|help with|improve|why should)\b/i.test(userInput);
        
        let titleFocus = "";
        if (isBeginnerFocused) {
            titleFocus = " for Beginners";
        } else if (isBenefitsFocused) {
            titleFocus = " Benefits";
        }
        
        return `# ${exerciseInfo.name}${titleFocus}

In a complete implementation with an AI model and health expertise, I would provide customized information about ${exerciseInfo.name.toLowerCase()} tailored to your specific needs, goals, and circumstances.

## What is ${exerciseInfo.name}?

${exerciseInfo.description}

Common examples include: ${exerciseInfo.examples.join(", ")}

## Key Benefits

${exerciseInfo.benefits.map(benefit => `- ${benefit}`).join('\n')}

${isBeginnerFocused ? `## Beginner Recommendations

${exerciseInfo.beginner_tips.map(tip => `- ${tip}`).join('\n')}

## Sample Starter Plan

[Would provide a specific progressive plan appropriate for beginners]

## Form Fundamentals

[Would explain key techniques and form considerations]` : `## Effective Implementation

[Would provide guidance on frequency, intensity, and progression]

## Common Mistakes to Avoid

[Would outline frequent errors and how to address them]

## Progression Strategies

[Would explain how to safely advance as fitness improves]`}

## Integration With Other Exercise Types

[Would explain how to balance this with other forms of exercise]

## Adapting to Your Needs

[Would discuss modifications based on individual factors]

Would you like more specific information about:
- A particular aspect of ${exerciseInfo.name.toLowerCase()}?
- How to incorporate this into your current routine?
- Equipment or resources needed?
- How to track progress with this type of exercise?
- Addressing specific limitations or concerns?`;
    }
    
    /**
     * Identify exercise type from user input
     * @param {string} input - User input
     * @returns {string|null} Exercise type or null
     */
    identifyExerciseType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of exercise types
        for (const type in this.exerciseTypes) {
            if (normalizedInput.includes(type) || 
                normalizedInput.includes(this.exerciseTypes[type].name.toLowerCase())) {
                return type;
            }
            
            // Check examples
            for (const example of this.exerciseTypes[type].examples) {
                if (normalizedInput.includes(example.toLowerCase())) {
                    return type;
                }
            }
        }
        
        // Check for specific exercise type keywords
        const exerciseTypeKeywords = {
            "cardio": ["cardio", "aerobic", "cardiovascular", "endurance", "heart rate", "stamina", "jog", "run", "walk", "swim", "bike", "cycle", "elliptical", "rowing", "aerobics"],
            "strength": ["strength", "weight", "weights", "resistance", "lifting", "muscle", "muscles", "toning", "bodyweight", "dumbbell", "barbell", "kettlebell", "reps", "sets", "bench press", "squat", "deadlift"],
            "flexibility": ["flexibility", "stretching", "stretch", "mobility", "yoga", "pilates", "range of motion", "stiffness", "tight muscles", "lengthen", "flexible"],
            "balance": ["balance", "stability", "coordination", "core", "posture", "equilibrium", "steadiness", "wobble", "stabilization"],
            "hiit": ["hiit", "high intensity", "interval", "intervals", "tabata", "circuit", "circuits", "intense", "intensity", "sprint", "sprinting"]
        };
        
        for (const [type, keywords] of Object.entries(exerciseTypeKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return type;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Provide nutrition advice based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Health topic if available
     * @returns {string} Nutrition advice
     */
    provideNutritionAdvice(userInput, topic) {
        // Try to identify which nutrition aspect is being asked about
        const nutritionAspect = this.identifyNutritionAspect(userInput);
        
        if (!nutritionAspect) {
            // Provide general nutrition advice if no specific aspect is identified
            return `# Nutrition Guidance

In a complete implementation with an AI model and health expertise, I would provide personalized nutrition information based on your preferences, goals, and circumstances.

## General Nutrition Principles

### Foundational Guidelines
- Focus on whole, minimally processed foods
- Include a variety of colorful fruits and vegetables
- Choose whole grains over refined grains when possible
- Include quality protein sources with meals
- Incorporate healthy fats in moderation
- Stay adequately hydrated throughout the day
- Practice portion awareness rather than strict calorie counting
- Limit added sugars, excess sodium, and highly processed foods

### Balanced Eating Pattern
- Aim for meals that contain a variety of food groups
- Consider the plate method: half vegetables/fruits, quarter protein, quarter whole grains
- Include snacks that combine food groups (e.g., fruit with nuts, vegetables with hummus)
- Distribute food intake throughout the day in a pattern that works for your lifestyle
- Honor hunger and fullness cues rather than strict meal timing

### Sustainable Approach
- Focus on consistent patterns rather than perfect eating
- Allow flexibility for social occasions and preferences
- Make gradual changes rather than drastic overhauls
- Consider cultural traditions and personal preferences
- Develop a healthy relationship with food beyond nutrition

## Adapting to Your Needs

Nutritional needs vary based on:
- Age, sex, and body size
- Activity level and exercise habits
- Health conditions and medications
- Personal goals (weight management, athletic performance, etc.)
- Food preferences and restrictions

For more specific nutrition recommendations, please let me know:
- Your health and wellness goals
- Any dietary restrictions or preferences
- Current eating patterns
- Specific nutrition questions or concerns
- Time and resource considerations for food preparation`;
        }
        
        if (nutritionAspect === "balanced_diet") {
            const balancedDietInfo = this.nutritionGuidelines.balanced_diet;
            
            return `# Balanced Diet Principles

In a complete implementation with an AI model and health expertise, I would provide personalized guidance on creating a balanced diet that aligns with your preferences, needs, and goals.

## What Makes a Balanced Diet?

${balancedDietInfo.description}

## Key Principles

${balancedDietInfo.key_principles.map(principle => `- ${principle}`).join('\n')}

## Practical Meal Planning

${balancedDietInfo.meal_planning_tips.map(tip => `- ${tip}`).join('\n')}

## Sample Balanced Day

[Would provide a sample day of balanced meals and snacks]

## Common Challenges and Solutions

[Would address frequent obstacles to maintaining a balanced diet]

## Adapting to Different Needs

[Would explain how balanced diet principles can be adapted to different requirements]

## Gradual Implementation

[Would provide strategies for gradually shifting toward a more balanced eating pattern]

Would you like more specific information about:
- How to apply these principles to specific meals?
- Adapting balanced eating to your dietary preferences?
- Meal planning strategies for balanced nutrition?
- Shopping and preparation tips?
- How to maintain balance when eating out or traveling?`;
        } else if (nutritionAspect === "macronutrients") {
            const macroInfo = this.nutritionGuidelines.macronutrients;
            
            return `# Understanding Macronutrients

In a complete implementation with an AI model and health expertise, I would provide detailed information about macronutrients tailored to your specific needs, goals, and dietary preferences.

## What Are Macronutrients?

${macroInfo.description}

## Protein

**Function**: ${macroInfo.components.protein.function}

**Sources**: ${macroInfo.components.protein.sources.join(", ")}

**Guidelines**: ${macroInfo.components.protein.guidelines}

[Would provide more detailed information about protein needs and applications]

## Carbohydrates

**Function**: ${macroInfo.components.carbohydrates.function}

**Sources**: ${macroInfo.components.carbohydrates.sources.join(", ")}

**Guidelines**: ${macroInfo.components.carbohydrates.guidelines}

[Would provide more detailed information about carbohydrate types and considerations]

## Fats

**Function**: ${macroInfo.components.fats.function}

**Sources**: ${macroInfo.components.fats.sources.join(", ")}

**Guidelines**: ${macroInfo.components.fats.guidelines}

[Would provide more detailed information about different types of fats and their roles]

## Balancing Macronutrients

[Would explain approaches to macronutrient distribution and balance]

## Personalizing Macronutrients

[Would discuss how macronutrient needs vary based on individual factors]

Would you like more specific information about:
- A particular macronutrient?
- How to adjust macronutrients for specific goals?
- Meal planning with macronutrients in mind?
- Signs of macronutrient imbalance?
- Tracking macronutrients in your diet?`;
        } else if (nutritionAspect === "micronutrients") {
            const microInfo = this.nutritionGuidelines.micronutrients;
            
            return `# Essential Micronutrients

In a complete implementation with an AI model and health expertise, I would provide comprehensive information about vitamins and minerals tailored to your specific nutritional interests and needs.

## What Are Micronutrients?

${microInfo.description}

## Key Vitamins

${microInfo.key_vitamins.map(vitamin => `- ${vitamin}`).join('\n')}

[Would provide more detailed information about vitamin functions, sources, and needs]

## Key Minerals

${microInfo.key_minerals.map(mineral => `- ${mineral}`).join('\n')}

[Would provide more detailed information about mineral functions, sources, and needs]

## Optimizing Micronutrient Intake

${microInfo.optimization_strategies.map(strategy => `- ${strategy}`).join('\n')}

## Potential Deficiency Signs

[Would discuss common micronutrient deficiencies and their symptoms]

## Food vs. Supplements

[Would explain considerations for obtaining micronutrients from food vs. supplements]

Would you like more specific information about:
- Particular vitamins or minerals?
- Food sources rich in specific micronutrients?
- How cooking affects micronutrient content?
- Micronutrient needs for specific populations?
- Signs of specific micronutrient deficiencies?`;
        } else if (nutritionAspect === "hydration") {
            const hydrationInfo = this.nutritionGuidelines.hydration;
            
            return `# Hydration Essentials

In a complete implementation with an AI model and health expertise, I would provide detailed information about optimal hydration strategies tailored to your specific needs and circumstances.

## Importance of Hydration

${hydrationInfo.importance.map(point => `- ${point}`).join('\n')}

## Hydration Recommendations

${hydrationInfo.recommendations.map(rec => `- ${rec}`).join('\n')}

## Signs of Adequate Hydration

[Would explain indicators of proper hydration status]

## Signs of Dehydration

[Would explain symptoms of mild, moderate, and severe dehydration]

## Special Hydration Considerations

[Would address specific situations like exercise, illness, weather, etc.]

## Hydration Strategies

[Would provide practical tips for maintaining good hydration]

Would you like more specific information about:
- Hydration for specific activities or situations?
- Electrolytes and their role in hydration?
- Hydration timing strategies?
- Evaluating different beverage choices?
- Creating effective hydration habits?`;
        } else if (nutritionAspect === "eating_patterns") {
            const patternsInfo = this.nutritionGuidelines.eating_patterns;
            
            return `# Healthy Eating Patterns

In a complete implementation with an AI model and health expertise, I would provide comprehensive information about various eating patterns tailored to your interests, preferences, and goals.

## What Are Eating Patterns?

${patternsInfo.description}

## Mediterranean Pattern

**Key Features**:
${patternsInfo.common_approaches.mediterranean.features.map(feature => `- ${feature}`).join('\n')}

[Would provide more detailed information about the Mediterranean pattern]

## DASH Pattern

**Key Features**:
${patternsInfo.common_approaches.dash.features.map(feature => `- ${feature}`).join('\n')}

[Would provide more detailed information about the DASH pattern]

## Plant-Based Patterns

**Key Features**:
${patternsInfo.common_approaches.plant_based.features.map(feature => `- ${feature}`).join('\n')}

[Would provide more detailed information about plant-based patterns]

## Implementation Tips

${patternsInfo.implementation_tips.map(tip => `- ${tip}`).join('\n')}

## Selecting an Approach

[Would discuss considerations for choosing an eating pattern]

Would you like more specific information about:
- A particular eating pattern?
- How to transition to a specific pattern?
- Adapting patterns to dietary restrictions?
- Meal planning within a specific pattern?
- Research on different eating patterns?`;
        } else {
            return this.provideGeneralHealthInformation(userInput, topic);
        }
    }
    
    /**
     * Identify nutrition aspect from user input
     * @param {string} input - User input
     * @returns {string|null} Nutrition aspect or null
     */
    identifyNutritionAspect(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of nutrition aspects
        for (const aspect in this.nutritionGuidelines) {
            if (normalizedInput.includes(aspect.replace('_', ' ')) || 
                normalizedInput.includes(this.nutritionGuidelines[aspect].name.toLowerCase())) {
                return aspect;
            }
        }
        
        // Check for specific nutrition aspect keywords
        const nutritionAspectKeywords = {
            "balanced_diet": ["balanced diet", "healthy diet", "eating healthy", "healthy eating", "well-balanced", "meal planning", "plate method", "food groups", "balanced meals", "balanced nutrition"],
            "macronutrients": ["macronutrient", "macros", "protein", "carbohydrate", "carbs", "fat", "macro", "macronutrient ratio", "macro ratio", "protein intake", "carb intake", "fat intake"],
            "micronutrients": ["micronutrient", "vitamin", "mineral", "nutrients", "nutritional deficiency", "supplements", "nutrient dense", "iron", "calcium", "zinc", "magnesium", "b12", "d", "a", "c"],
            "hydration": ["hydration", "water", "fluid", "drink", "hydrate", "dehydration", "dehydrated", "thirst", "thirsty", "water intake", "drinking enough", "electrolytes"],
            "eating_patterns": ["eating pattern", "diet pattern", "dietary approach", "mediterranean", "dash", "plant-based", "vegetarian", "vegan", "eating style", "eating plan", "diet plan", "diet approach"]
        };
        
        for (const [aspect, keywords] of Object.entries(nutritionAspectKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return aspect;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Provide sleep advice based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Health topic if available
     * @returns {string} Sleep advice
     */
    provideSleepAdvice(userInput, topic) {
        // Try to identify which sleep aspect is being asked about
        const sleepAspect = this.identifySleepAspect(userInput);
        
        if (!sleepAspect) {
            // Provide general sleep advice if no specific aspect is identified
            return `# Sleep Optimization Guidance

In a complete implementation with an AI model and health expertise, I would provide personalized sleep recommendations based on your specific concerns, habits, and circumstances.

## Sleep Fundamentals

Most adults need 7-9 hours of quality sleep per night, though individual needs vary. Quality sleep involves:

- Falling asleep within a reasonable time (typically 15-30 minutes)
- Staying asleep throughout the night with minimal awakenings
- Waking feeling refreshed and restored
- Maintaining alertness throughout the day

## Key Sleep Hygiene Practices

### Environment Optimization
- Create a cool (65-68°F/18-20°C), dark, and quiet sleep space
- Use your bed primarily for sleep and intimacy
- Consider blackout curtains, white noise machines, or earplugs if needed
- Ensure a comfortable, supportive mattress and pillows

### Routine Development
- Maintain consistent sleep and wake times, even on weekends
- Create a relaxing pre-sleep routine (20-30 minutes)
- Avoid screens 1-2 hours before bedtime (or use blue light filters)
- Consider relaxation techniques like gentle stretching, reading, or meditation

### Lifestyle Considerations
- Limit caffeine after midday and alcohol close to bedtime
- Exercise regularly, but preferably not within a few hours of sleep
- Avoid large meals close to bedtime
- Manage fluid intake to minimize nighttime bathroom trips
- Get natural light exposure during the day

## When to Seek Professional Help

Consider consulting a healthcare provider if you experience:
- Persistent difficulty falling or staying asleep
- Chronic daytime fatigue despite adequate sleep opportunity
- Loud snoring, gasping, or long pauses in breathing during sleep
- Uncomfortable sensations or movements that disrupt sleep
- Excessive daytime sleepiness or falling asleep unintentionally

For more personalized sleep recommendations, please share:
- Your specific sleep concerns or goals
- Current sleep patterns and habits
- Lifestyle factors that might affect your sleep
- Previous approaches you've tried
- Any known sleep-related conditions`;
        }
        
        if (sleepAspect === "sleep_hygiene") {
            const hygieneInfo = this.sleepStrategies.sleep_hygiene;
            
            return `# Sleep Hygiene Practices

In a complete implementation with an AI model and health expertise, I would provide detailed sleep hygiene recommendations tailored to your specific sleep challenges and lifestyle.

## What is Sleep Hygiene?

${hygieneInfo.description}

## Key Sleep Hygiene Practices

${hygieneInfo.practices.map(practice => `- ${practice}`).join('\n')}

## Creating an Effective Pre-Sleep Routine

[Would provide guidance on developing a personalized wind-down routine]

## Addressing Common Sleep Disruptors

[Would discuss specific strategies for common sleep interference factors]

## Building Consistency

[Would explain approaches to establishing and maintaining sleep routines]

## Monitoring Progress

[Would suggest methods for tracking sleep improvements]

Would you like more specific information about:
- Adapting these practices to your current schedule?
- Addressing specific sleep challenges?
- Creating an ideal bedtime routine?
- Technological tools that might support better sleep?
- How to prioritize which sleep hygiene practices to implement first?`;
        } else if (sleepAspect === "sleep_environment") {
            const environmentInfo = this.sleepStrategies.sleep_environment;
            
            return `# Optimizing Your Sleep Environment

In a complete implementation with an AI model and health expertise, I would provide comprehensive guidance on creating an ideal sleep environment tailored to your specific circumstances and preferences.

## The Importance of Sleep Environment

${environmentInfo.description}

## Key Environmental Elements

${environmentInfo.elements.map(element => `- ${element}`).join('\n')}

## Creating Your Ideal Sleep Sanctuary

[Would provide detailed guidance on optimizing bedroom for sleep]

## Budget-Friendly Improvements

[Would suggest cost-effective environment enhancements]

## Technology Considerations

[Would discuss electronic devices and sleep environment]

## Addressing Environmental Challenges

[Would provide solutions for common environmental sleep disruptions]

Would you like more specific information about:
- Optimizing a particular aspect of your sleep environment?
- Solutions for shared sleep spaces?
- Products that might improve sleep environment quality?
- Addressing specific environmental disruptions?
- Seasonal adjustments to sleep environments?`;
        } else if (sleepAspect === "circadian_rhythms") {
            const rhythmsInfo = this.sleepStrategies.circadian_rhythms;
            
            return `# Supporting Healthy Circadian Rhythms

In a complete implementation with an AI model and health expertise, I would provide detailed information about circadian rhythms and personalized strategies to optimize your sleep-wake cycle.

## Understanding Circadian Rhythms

${rhythmsInfo.description}

## Key Circadian Support Strategies

${rhythmsInfo.strategies.map(strategy => `- ${strategy}`).join('\n')}

## Light Exposure Management

[Would provide detailed guidance on optimizing light exposure]

## Timing Considerations

[Would explain ideal timing for activities to support circadian health]

## Reset Strategies

[Would discuss approaches for readjusting disrupted rhythms]

## Special Circumstances

[Would address shift work, jet lag, and seasonal changes]

Would you like more specific information about:
- Adapting these strategies to your current schedule?
- Light therapy or other circadian support tools?
- Managing specific circadian disruptions?
- Establishing an optimal daily routine?
- The science behind circadian rhythms?`;
        } else if (sleepAspect === "sleep_challenges") {
            const challengesInfo = this.sleepStrategies.sleep_challenges;
            
            // Check if user is asking about a specific challenge
            let specificChallenge = null;
            for (const challenge in challengesInfo.issues) {
                if (userInput.toLowerCase().includes(challengesInfo.issues[challenge].name.toLowerCase())) {
                    specificChallenge = challenge;
                    break;
                }
            }
            
            if (specificChallenge) {
                const challengeInfo = challengesInfo.issues[specificChallenge];
                
                return `# Addressing ${challengeInfo.name}

In a complete implementation with an AI model and health expertise, I would provide personalized strategies for overcoming ${challengeInfo.name.toLowerCase()} based on your specific situation.

## Understanding the Issue

[Would explain the mechanisms and common causes of ${challengeInfo.name.toLowerCase()}]

## Effective Strategies

${challengeInfo.strategies.map(strategy => `- ${strategy}`).join('\n')}

## Implementation Approach

[Would provide guidance on applying these strategies effectively]

## Tracking Improvements

[Would suggest methods for monitoring progress]

## When to Seek Professional Help

[Would outline signs that medical evaluation might be needed]

Would you like more specific information about:
- Adapting these strategies to your specific situation?
- Additional approaches for this challenge?
- How lifestyle factors might be contributing?
- Creating a comprehensive plan to address this issue?
- Tools or resources that might help?`;
            } else {
                return `# Addressing Common Sleep Challenges

In a complete implementation with an AI model and health expertise, I would provide personalized strategies for overcoming specific sleep challenges based on your situation.

## Common Sleep Challenges

### Difficulty Falling Asleep
**Key Strategies**:
${challengesInfo.issues.falling_asleep.strategies.map(strategy => `- ${strategy}`).join('\n')}

### Difficulty Staying Asleep
**Key Strategies**:
${challengesInfo.issues.staying_asleep.strategies.map(strategy => `- ${strategy}`).join('\n')}

### Early Morning Waking
**Key Strategies**:
${challengesInfo.issues.early_waking.strategies.map(strategy => `- ${strategy}`).join('\n')}

## Comprehensive Approach

[Would discuss how to combine strategies effectively]

## Identifying Root Causes

[Would explain how to determine underlying factors]

## Creating a Sleep Improvement Plan

[Would provide guidance on developing a personalized approach]

Would you like more specific information about:
- A particular sleep challenge you're experiencing?
- Adapting these strategies to your situation?
- Tracking sleep patterns to identify specific issues?
- When to consider professional sleep assessment?
- Non-medication approaches to persistent sleep problems?`;
            }
        } else if (sleepAspect === "sleep_and_health") {
            const healthInfo = this.sleepStrategies.sleep_and_health;
            
            return `# Sleep and Overall Health

In a complete implementation with an AI model and health expertise, I would provide comprehensive information about the relationships between sleep and various aspects of health and wellbeing.

## The Critical Role of Sleep

${healthInfo.description}

## Key Health Connections

${healthInfo.connections.map(connection => `- ${connection}`).join('\n')}

## How Sleep Quality Affects Daily Life

[Would explain effects on cognitive function, mood, energy, etc.]

## Long-Term Health Implications

[Would discuss relationships between sleep and chronic health conditions]

## Recognizing Sleep's Impact

[Would explain how to identify effects of sleep quality on wellbeing]

## Prioritizing Sleep as Health Investment

[Would provide framework for viewing sleep as essential to health]

Would you like more specific information about:
- How sleep affects a particular aspect of health?
- The mechanisms behind sleep-health connections?
- Addressing health issues through improved sleep?
- How other health factors influence sleep quality?
- Research on sleep and specific health conditions?`;
        } else {
            return this.provideGeneralHealthInformation(userInput, topic);
        }
    }
    
    /**
     * Identify sleep aspect from user input
     * @param {string} input - User input
     * @returns {string|null} Sleep aspect or null
     */
    identifySleepAspect(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of sleep aspects
        for (const aspect in this.sleepStrategies) {
            if (normalizedInput.includes(aspect.replace('_', ' ')) || 
                normalizedInput.includes(this.sleepStrategies[aspect].name.toLowerCase())) {
                return aspect;
            }
        }
        
        // Check for specific sleep aspect keywords
        const sleepAspectKeywords = {
            "sleep_hygiene": ["sleep hygiene", "bedtime routine", "bedtime habit", "sleep habits", "sleep routine", "better sleep habit", "preparing for sleep", "before sleep", "get to sleep", "fall asleep faster"],
            "sleep_environment": ["sleep environment", "bedroom", "mattress", "pillow", "temperature", "noise", "light", "dark", "quiet", "cool", "comfortable", "sleep space"],
            "circadian_rhythms": ["circadian", "rhythm", "body clock", "sleep cycle", "sleep pattern", "sleep schedule", "light exposure", "sunlight", "melatonin", "internal clock", "wake up time", "bedtime"],
            "sleep_challenges": ["insomnia", "can't sleep", "trouble sleeping", "difficulty sleeping", "sleep problem", "wake up", "waking up", "middle of night", "early morning", "trouble falling asleep", "can't stay asleep"],
            "sleep_and_health": ["sleep health", "sleep important", "sleep benefit", "health sleep", "sleep affect", "sleep impact", "sleep improve", "sleep linked", "sleep related", "sleep connection"]
        };
        
        for (const [aspect, keywords] of Object.entries(sleepAspectKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return aspect;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Provide stress management advice based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Health topic if available
     * @returns {string} Stress management advice
     */
    provideStressManagementAdvice(userInput, topic) {
        // Try to identify which stress management technique is being asked about
        const techniqueType = this.identifyStressTechnique(userInput);
        
        if (!techniqueType) {
            // Provide general stress management advice if no specific technique is identified
            return `# Stress Management Strategies

In a complete implementation with an AI model and health expertise, I would provide personalized stress management recommendations based on your specific stressors, preferences, and circumstances.

## Understanding Stress

Stress is your body's natural response to demands or challenges. While some stress can be motivating, chronic stress can impact physical and mental wellbeing through:
- Increased tension and muscle pain
- Sleep disruption
- Mood changes
- Digestive issues
- Reduced immune function
- Cognitive effects like difficulty concentrating

## Effective Stress Management Approaches

### Quick Relief Techniques
- **Deep breathing**: Slow, diaphragmatic breaths (4-7-8 method)
- **Progressive muscle relaxation**: Tensing and releasing muscle groups
- **Grounding exercises**: Using your senses to anchor to the present moment
- **Brief mindfulness practices**: 1-2 minute awareness exercises
- **Movement breaks**: Short walks or gentle stretching

### Regular Practices
- **Meditation**: Regular mindfulness or other meditation practice
- **Physical activity**: Regular movement that you enjoy
- **Sleep hygiene**: Consistent, quality sleep
- **Social connection**: Quality time with supportive people
- **Time in nature**: Regular exposure to natural environments
- **Creative expression**: Art, music, writing, or other creative outlets

### Lifestyle Approaches
- **Time management**: Prioritizing tasks and setting boundaries
- **Saying no**: Setting limits on commitments
- **Problem-solving**: Addressing sources of stress directly when possible
- **Cognitive reframing**: Shifting perspective on stressful situations
- **Reducing information overload**: Managing media consumption
- **Support seeking**: Asking for help when needed

## Creating Your Stress Management Plan

The most effective approach combines:
- Quick techniques for immediate relief
- Regular practices for resilience building
- Lifestyle changes that reduce overall stress burden
- Strategies aligned with your preferences and lifestyle

For more personalized stress management recommendations, please share:
- Your specific stress concerns
- Current sources of stress
- Strategies you've tried previously
- Available time for stress management practices
- Activities you find naturally relaxing or energizing`;
        }
        
        if (techniqueType === "breathing") {
            const breathingInfo = this.stressManagementTechniques.breathing;
            
            return `# Breathing Techniques for Stress Management

In a complete implementation with an AI model and health expertise, I would provide detailed guidance on breathing techniques tailored to your specific stress management needs and preferences.

## The Power of Breathing

${breathingInfo.description}

## Effective Techniques

${breathingInfo.techniques.map(technique => `### ${technique.name}\n${technique.instructions}`).join('\n\n')}

## Implementation Guidance

[Would provide detailed instructions on proper technique]

## Creating a Regular Practice

[Would explain how to incorporate breathing exercises into daily routine]

## Addressing Specific Stressors

[Would discuss adaptation of techniques for different situations]

## Common Challenges

[Would address frequent issues people encounter with breathing practices]

Would you like more specific information about:
- A particular breathing technique?
- How to adapt these for specific situations?
- Creating a breathing practice routine?
- Using breathing with other stress management approaches?
- Apps or resources that might support breathing practice?`;
        } else if (techniqueType === "mindfulness") {
            const mindfulnessInfo = this.stressManagementTechniques.mindfulness;
            
            return `# Mindfulness Practices for Stress Reduction

In a complete implementation with an AI model and health expertise, I would provide comprehensive guidance on mindfulness approaches tailored to your specific needs and lifestyle.

## Understanding Mindfulness

${mindfulnessInfo.description}

## Core Mindfulness Practices

${mindfulnessInfo.practices.map(practice => `### ${practice.name}\n${practice.instructions}`).join('\n\n')}

## Establishing a Mindfulness Practice

[Would provide guidance on developing a sustainable practice]

## Informal Mindfulness

[Would explain how to integrate mindfulness into daily activities]

## Benefits and Mechanisms

[Would discuss how mindfulness affects stress physiologically and psychologically]

## Overcoming Common Obstacles

[Would address typical challenges with mindfulness practice]

Would you like more specific information about:
- A particular mindfulness technique?
- Adapting mindfulness to your daily schedule?
- Resources for guided mindfulness practice?
- The science behind mindfulness and stress?
- Using mindfulness for specific stress triggers?`;
        } else if (techniqueType === "physical_activities") {
            const activitiesInfo = this.stressManagementTechniques.physical_activities;
            
            return `# Physical Activities for Stress Relief

In a complete implementation with an AI model and health expertise, I would provide detailed guidance on movement-based stress reduction approaches tailored to your preferences and circumstances.

## Movement and Stress

${activitiesInfo.description}

## Effective Physical Stress Relief Activities

${activitiesInfo.activities.map(activity => `### ${activity.name}\n${activity.benefits}`).join('\n\n')}

## Incorporating Movement into Daily Life

[Would provide strategies for regular physical stress relief]

## Matching Activities to Stress Types

[Would explain how different activities address various stress manifestations]

## Quick Movement Breaks

[Would suggest brief movement activities for immediate stress management]

## Creating a Balanced Approach

[Would discuss combining different types of physical activities]

Would you like more specific information about:
- A particular physical stress relief activity?
- How to begin a practice if you're new to it?
- Adapting activities to different fitness levels?
- Combining physical activities with other stress management approaches?
- Resources for learning specific movement practices?`;
        } else if (techniqueType === "cognitive_approaches") {
            const cognitiveInfo = this.stressManagementTechniques.cognitive_approaches;
            
            return `# Cognitive Approaches to Stress Management

In a complete implementation with an AI model and health expertise, I would provide comprehensive information about mental strategies for managing stress responses tailored to your specific situation.

## Mental Strategies for Stress

${cognitiveInfo.description}

## Effective Cognitive Approaches

${cognitiveInfo.strategies.map(strategy => `### ${strategy.name}\n${strategy.description}`).join('\n\n')}

## Implementation Guidance

[Would provide detailed instructions for applying these approaches]

## Practice Exercises

[Would suggest specific exercises to develop these skills]

## Combining With Other Techniques

[Would explain how to integrate with other stress management approaches]

## Building Mental Resilience

[Would discuss long-term development of stress management capacity]

Would you like more specific information about:
- A particular cognitive approach?
- Applying these techniques to specific stressors?
- Tools or resources that support cognitive stress management?
- Tracking progress with cognitive approaches?
- The science behind how these strategies affect stress?`;
        } else if (techniqueType === "lifestyle_factors") {
            const lifestyleInfo = this.stressManagementTechniques.lifestyle_factors;
            
            return `# Lifestyle Approaches to Stress Management

In a complete implementation with an AI model and health expertise, I would provide detailed guidance on lifestyle modifications for stress reduction tailored to your specific circumstances and preferences.

## Lifestyle and Stress

${lifestyleInfo.description}

## Key Lifestyle Factors

${lifestyleInfo.factors.map(factor => `### ${factor.name}\n${factor.strategies}`).join('\n\n')}

## Creating a Stress-Resistant Lifestyle

[Would provide framework for comprehensive lifestyle approach]

## Identifying Priority Areas

[Would discuss how to determine which factors to address first]

## Sustainable Implementation

[Would explain approaches for making lasting lifestyle changes]

## Environmental Modifications

[Would suggest changes to physical and social environments]

Would you like more specific information about:
- A particular lifestyle factor?
- Developing a personalized stress management plan?
- Addressing specific lifestyle challenges?
- Resources that support lifestyle modifications?
- The connections between different lifestyle factors?`;
        } else {
            return this.provideGeneralHealthInformation(userInput, topic);
        }
    }
    
    /**
     * Identify stress management technique from user input
     * @param {string} input - User input
     * @returns {string|null} Stress technique or null
     */
    identifyStressTechnique(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of stress techniques
        for (const technique in this.stressManagementTechniques) {
            if (normalizedInput.includes(technique) || 
                normalizedInput.includes(this.stressManagementTechniques[technique].name.toLowerCase())) {
                return technique;
            }
        }
        
        // Check for specific technique keywords
        const techniqueKeywords = {
            "breathing": ["breathing", "breath", "breathe", "deep breath", "diaphragmatic", "box breathing", "4-7-8", "respiratory", "inhale", "exhale"],
            "mindfulness": ["mindful", "mindfulness", "meditation", "meditate", "present moment", "awareness", "body scan", "observe", "attention", "focus", "nonjudgmental"],
            "physical_activities": ["yoga", "tai chi", "walk", "walking", "exercise", "movement", "physical activity", "stretch", "stretching", "dance", "dancing", "progressive muscle relaxation"],
            "cognitive_approaches": ["reframe", "reframing", "perspective", "thought", "thinking", "cognitive", "mental", "mindset", "attitude", "gratitude", "journaling", "worry time", "values"],
            "lifestyle_factors": ["lifestyle", "routine", "schedule", "habit", "daily", "time management", "boundary", "boundaries", "social", "nature", "digital", "screen time", "creative", "create"]
        };
        
        for (const [technique, keywords] of Object.entries(techniqueKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return technique;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Provide habit formation advice based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Health topic if available
     * @returns {string} Habit formation advice
     */
    provideHabitFormationAdvice(userInput, topic) {
        // Try to identify which habit strategy is being asked about
        const strategyType = this.identifyHabitStrategy(userInput);
        
        if (!strategyType) {
            // Provide general habit formation advice if no specific strategy is identified
            return `# Habit Formation Strategies

In a complete implementation with an AI model and health expertise, I would provide personalized habit formation recommendations based on your specific goals, preferences, and circumstances.

## Understanding Habit Formation

Habits are formed through a cycle of:
- **Cue**: The trigger that initiates the behavior
- **Craving**: The motivation or desire for change
- **Response**: The actual habit or behavior
- **Reward**: The benefit gained from the behavior

Effective habit strategies work by making cues obvious, cravings attractive, responses easy, and rewards satisfying.

## Effective Habit Building Approaches

### Starting Small
- Begin with habits that take less than 2 minutes
- Focus on consistency rather than intensity
- Build the habit identity before optimizing performance
- Use the "Two-Minute Rule" to make habits easy to start

### Using Existing Patterns
- Attach new habits to established routines ("habit stacking")
- Identify specific triggers for when and where the habit will occur
- Use implementation intentions: "When X happens, I will do Y"
- Create visual cues in your environment

### Environment Design
- Make desired habits obvious and convenient
- Remove friction from positive habits
- Add friction to negative habits
- Change your surroundings to support your habits

### Building Motivation
- Celebrate small wins immediately after the habit
- Join a culture or community where the habit is normal
- Make habit tracking visible and satisfying
- Focus on identity-based habits: "I am someone who..."

### Creating Sustainability
- Prepare for obstacles in advance
- Allow for flexibility and adaptation
- Use the "never miss twice" rule
- Adjust strategies based on results

For more personalized habit formation recommendations, please share:
- The specific habit you want to build
- Previous attempts and challenges
- Your current daily routine
- Environmental factors that might influence the habit
- Your motivation for developing this habit`;
        }
        
        const strategyInfo = this.habitFormationStrategies[strategyType];
        
        return `# ${strategyInfo.name} for Habit Formation

In a complete implementation with an AI model and health expertise, I would provide comprehensive guidance on using the ${strategyInfo.name} tailored to your specific habits and circumstances.

## Understanding the ${strategyInfo.name} Approach

${strategyInfo.description}

## Key Principles

${strategyInfo.key_principles.map(principle => `- ${principle}`).join('\n')}

## Implementation Guide

[Would provide detailed steps for applying this strategy]

## Examples and Applications

[Would offer concrete examples of the strategy in action]

## Troubleshooting Common Challenges

[Would address typical obstacles when using this approach]

## Tracking and Measuring Success

[Would suggest methods for monitoring progress]

Would you like more specific information about:
- Applying this strategy to a particular habit?
- Combining this with other habit formation approaches?
- Adapting this method to your specific situation?
- Resources that support this habit formation strategy?
- The science behind why this approach works?`;
    }
    
    /**
     * Identify habit strategy from user input
     * @param {string} input - User input
     * @returns {string|null} Habit strategy or null
     */
    identifyHabitStrategy(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of habit strategies
        for (const strategy in this.habitFormationStrategies) {
            if (normalizedInput.includes(strategy.replace('_', ' ')) || 
                normalizedInput.includes(this.habitFormationStrategies[strategy].name.toLowerCase())) {
                return strategy;
            }
        }
        
        // Check for specific strategy keywords
        const strategyKeywords = {
            "tiny_habits": ["tiny habit", "small habit", "mini habit", "micro habit", "two minute", "2 minute", "too small", "ridiculously small", "bj fogg"],
            "habit_stacking": ["habit stack", "stacking", "after i", "chain", "linking habits", "connect habit", "piggyback", "hook", "anchor", "existing routine"],
            "environment_design": ["environment", "surroundings", "cue", "trigger", "friction", "obstacle", "design space", "visual reminder", "obvious", "visible", "convenience", "inconvenience"],
            "implementation_intentions": ["implementation intention", "when-then", "if-then", "specific plan", "when i", "situation", "concrete plan", "action plan", "predetermined", "plan ahead"],
            "habit_tracking": ["track", "tracking", "streak", "chain", "don't break", "calendar", "check off", "mark off", "log", "journal", "monitor", "measure"]
        };
        
        for (const [strategy, keywords] of Object.entries(strategyKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return strategy;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Provide medical disclaimer response
     * @param {string} userInput - User's input
     * @param {string} topic - Health topic if available
     * @returns {string} Medical disclaimer
     */
    provideMedicalDisclaimerResponse(userInput, topic) {
        return `# Important Health Information Notice

I notice your question may be related to specific medical symptoms, diagnosis, or treatment. As an AI health coach, I can provide general health information, but I'm not a licensed healthcare provider and cannot provide medical advice, diagnosis, or treatment recommendations for specific conditions.

## Medical Guidance

For concerns about:
- Specific symptoms or health conditions
- Diagnosis of medical issues
- Treatment recommendations
- Medication advice or adjustments
- Personal medical situations

Please consult with a qualified healthcare professional who can:
- Take a complete medical history
- Perform appropriate examinations
- Order and interpret relevant tests
- Provide personalized medical advice
- Offer proper diagnosis and treatment options

## General Health Information

I'm happy to provide general educational information about:
- Healthy lifestyle habits
- Exercise and physical activity guidance
- General nutrition principles
- Sleep optimization strategies
- Stress management techniques
- Habit formation approaches

Would you like me to provide general information about any of these health topics instead?`;
    }
    
    /**
     * Clarify health myths based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Health topic if available
     * @returns {string} Health myth clarification
     */
    clarifyHealthMyth(userInput, topic) {
        // Try to identify which health myth is being asked about
        const mythIndex = this.identifyHealthMyth(userInput);
        
        if (mythIndex === -1) {
            // No specific myth identified, provide general myth-busting information
            return `# Health & Wellness Myths vs. Facts

In a complete implementation with an AI model and health expertise, I would address specific health misconceptions and provide evidence-based clarification based on your question.

## Common Health Misconceptions

Health and wellness information can be confusing, with many persistent myths despite scientific evidence. Some examples include:

1. **Exercise Myths**
   - Myth: You need to exercise for long periods for benefits
   - Fact: Even short bouts of physical activity provide health benefits

2. **Nutrition Myths**
   - Myth: Eating fat makes you fat
   - Fact: Healthy fats are essential; weight gain relates to overall energy balance

3. **Sleep Myths**
   - Myth: Everyone needs exactly 8 hours of sleep
   - Fact: Sleep needs vary by individual, typically ranging from 7-9 hours

4. **Metabolism Myths**
   - Myth: Certain foods or supplements "boost" metabolism significantly
   - Fact: Metabolism is primarily influenced by body composition and activity

5. **Fitness Myths**
   - Myth: Muscle turns to fat when you stop exercising
   - Fact: Muscle and fat are different tissues; one cannot transform into the other

To provide accurate information about a specific health claim or belief, please let me know what particular topic you're curious about.`;
        }
        
        const mythFact = this.healthMythsFacts[mythIndex];
        
        return `# Health Myth Clarification

In a complete implementation with an AI model and health expertise, I would provide evidence-based information to address this specific health misconception.

## The Myth

"${mythFact.myth}"

## The Facts

${mythFact.fact}

## Understanding the Science

[Would explain the scientific evidence and mechanisms]

## Origin of the Misconception

[Would discuss how this myth may have originated]

## Practical Implications

[Would explain what this means for health decisions]

## Related Considerations

[Would address connected topics or nuances]

Would you like more specific information about:
- The research behind this topic?
- How this relates to specific health goals?
- Similar misconceptions in this area?
- Practical applications of this knowledge?
- Resources for further learning on this topic?`;
    }
    
    /**
     * Identify health myth from user input
     * @param {string} input - User input
     * @returns {number} Index of health myth or -1 if not found
     */
    identifyHealthMyth(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check each myth to see if the user input substantially matches it
        for (let i = 0; i < this.healthMythsFacts.length; i++) {
            const mythText = this.healthMythsFacts[i].myth.toLowerCase();
            
            // Check for direct mention or significant overlap
            if (normalizedInput.includes(mythText) || 
                this.calculateStringOverlap(normalizedInput, mythText) > 0.6) {
                return i;
            }
            
            // Check for key phrases that might indicate the myth
            const keyPhrases = this.extractKeyPhrases(mythText);
            for (const phrase of keyPhrases) {
                if (normalizedInput.includes(phrase)) {
                    return i;
                }
            }
        }
        
        return -1;
    }
    
    /**
     * Calculate overlap between two strings
     * @param {string} str1 - First string
     * @param {string} str2 - Second string
     * @returns {number} Overlap score (0-1)
     */
    calculateStringOverlap(str1, str2) {
        const words1 = str1.split(/\s+/);
        const words2 = str2.split(/\s+/);
        
        let matchCount = 0;
        for (const word of words1) {
            if (word.length > 3 && words2.includes(word)) {
                matchCount++;
            }
        }
        
        return matchCount / Math.max(words1.length, words2.length);
    }
    
    /**
     * Extract key phrases from a string
     * @param {string} text - Text to extract phrases from
     * @returns {Array<string>} Key phrases
     */
    extractKeyPhrases(text) {
        const phrases = [];
        
        // Extract noun phrases and significant word combinations
        const words = text.split(/\s+/);
        
        // For simplicity, just use combinations of 2-3 consecutive words
        for (let i = 0; i < words.length - 1; i++) {
            if (words[i].length > 3 && words[i+1].length > 3) {
                phrases.push(`${words[i]} ${words[i+1]}`);
            }
            
            if (i < words.length - 2 && words[i].length > 3 && words[i+2].length > 3) {
                phrases.push(`${words[i]} ${words[i+1]} ${words[i+2]}`);
            }
        }
        
        return phrases;
    }
    
    /**
     * Provide goal setting advice based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Health topic if available
     * @returns {string} Goal setting advice
     */
    provideGoalSettingAdvice(userInput, topic) {
        // Determine if a specific health area is mentioned for goal setting
        const healthArea = topic || this.identifyHealthTopic(userInput);
        
        let targetArea = "health and wellness";
        if (healthArea && this.healthTopics[healthArea]) {
            targetArea = this.healthTopics[healthArea].name.toLowerCase();
        }
        
        return `# Setting Effective ${this.capitalizeFirstLetter(targetArea)} Goals

In a complete implementation with an AI model and health expertise, I would provide personalized goal setting guidance specific to your ${targetArea} objectives and circumstances.

## SMART Goal Framework

The SMART framework can help create clear, achievable goals:

- **Specific**: Clearly defined and detailed
- **Measurable**: Includes concrete criteria for tracking progress
- **Achievable**: Realistic given your resources and constraints
- **Relevant**: Aligned with your broader objectives and values
- **Time-bound**: Has a defined timeline with target dates

## Goal Setting Process

### 1. Clarify Your Vision
- Consider what you ultimately want to achieve with your ${targetArea}
- Reflect on your motivations and core values
- Envision what success looks like for you personally

### 2. Assess Your Current State
- Honestly evaluate where you are now
- Identify strengths you can leverage
- Recognize challenges you may face
- Consider available resources and support

### 3. Develop Specific Goals
- Break down larger ambitions into specific objectives
- Create a mix of process and outcome goals
- Ensure goals are meaningful to you personally
- Make them challenging but realistic

### 4. Create Implementation Plans
- Identify specific actions needed to achieve each goal
- Anticipate obstacles and plan for them
- Consider the environment and context for your goals
- Determine what support or resources you'll need

### 5. Establish Tracking Methods
- Define how you'll measure progress
- Create regular check-in points
- Determine how you'll adjust based on feedback
- Plan how you'll celebrate milestones

## Example ${this.capitalizeFirstLetter(targetArea)} Goals

[Would provide relevant examples based on the specific area]

## Common Goal Setting Pitfalls

- Setting goals that are too vague
- Creating unrealistic timelines
- Focusing solely on outcomes rather than behaviors
- Not accounting for your current context and constraints
- Forgetting to revisit and adjust goals as needed

Would you like guidance on:
- Creating a specific ${targetArea} goal?
- Breaking down a larger goal into manageable steps?
- Developing an implementation plan?
- Creating an accountability system?
- Addressing specific obstacles to your goals?`;
    }
    
    /**
     * Provide general health information based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Health topic if available
     * @returns {string} General health information
     */
    provideGeneralHealthInformation(userInput, topic) {
        // If a specific health topic is identified, provide information about that
        if (topic && this.healthTopics[topic]) {
            const topicInfo = this.healthTopics[topic];
            
            return `# ${topicInfo.name} Guidance

In a complete implementation with an AI model and health expertise, I would provide comprehensive information about ${topicInfo.name.toLowerCase()} tailored to your specific interests and needs.

## What is ${topicInfo.name}?

${topicInfo.description}

## Key Aspects of ${topicInfo.name}

${topicInfo.subtopics.map(subtopic => `### ${subtopic}\n[Would provide information about ${subtopic.toLowerCase()}]`).join('\n\n')}

## General Recommendations

[Would provide evidence-based guidelines and approaches]

## Common Challenges

[Would address frequent obstacles in this area]

## Practical Implementation

[Would offer actionable strategies for incorporating into daily life]

## Progress and Adaptation

[Would discuss methods for tracking progress and making adjustments]

Would you like more specific information about:
- A particular aspect of ${topicInfo.name.toLowerCase()}?
- How to address specific challenges in this area?
- Creating a personalized approach?
- Resources for further learning?
- How this connects with other health topics?`;
        }
        
        // Default general health information response
        return `# Health and Wellness Guidance

In a complete implementation with an AI model and health expertise, I would provide personalized health and wellness information responsive to your specific interests and questions.

## Core Pillars of Health

### Physical Activity
Regular movement benefits virtually every aspect of health:
- Supports cardiovascular and metabolic health
- Builds and maintains muscle and bone strength
- Enhances mood and mental wellbeing
- Improves sleep quality
- Reduces risk of chronic diseases

### Nutrition
The foods and beverages you consume provide:
- Fuel for daily activities
- Building blocks for cells and tissues
- Regulatory compounds for body systems
- Protection against disease processes
- Signaling for various biological functions

### Sleep
Quality rest is essential for:
- Physical recovery and repair
- Cognitive function and memory consolidation
- Emotional regulation
- Immune system function
- Hormonal balance

### Stress Management
How you respond to life's challenges affects:
- Mental and emotional wellbeing
- Physical health outcomes
- Decision-making quality
- Relationship quality
- Overall life satisfaction

### Connection
Social and environmental relationships influence:
- Mental health and emotional support
- Health behaviors and habits
- Sense of purpose and meaning
- Resilience during difficulties
- Longevity and quality of life

## Creating Your Wellness Vision

The most sustainable approach to health:
- Aligns with your personal values and preferences
- Considers your unique circumstances and resources
- Focuses on behaviors rather than outcomes alone
- Incorporates flexibility and self-compassion
- Builds gradually over time

What specific aspect of health and wellness would you like to explore?`;
    }
    
    /**
     * Get health coaching suggestions based on user interaction
     * @param {string} requestType - Type of health request
     * @param {string} topic - Health topic if available
     * @returns {Array<string>} Health coaching suggestions
     */
    getHealthSuggestions(requestType, topic) {
        const suggestions = [];
        
        // Add topic-specific suggestions if available
        if (topic && this.healthTopics[topic]) {
            const topicName = this.healthTopics[topic].name;
            
            // Add suggestions based on request type and topic
            if (requestType === "exercise_advice") {
                suggestions.push(`What are the benefits of ${topicName.toLowerCase()}?`);
                suggestions.push(`How can I get started with ${topicName.toLowerCase()} as a beginner?`);
                suggestions.push(`How often should I do ${topicName.toLowerCase()}?`);
            } else if (requestType === "nutrition_advice") {
                suggestions.push(`What foods support ${topicName.toLowerCase()}?`);
                suggestions.push(`How does nutrition affect ${topicName.toLowerCase()}?`);
                suggestions.push(`What should I eat to improve ${topicName.toLowerCase()}?`);
            } else if (requestType === "sleep_advice") {
                suggestions.push(`How does sleep affect ${topicName.toLowerCase()}?`);
                suggestions.push(`What sleep strategies help with ${topicName.toLowerCase()}?`);
                suggestions.push(`How much sleep do I need for optimal ${topicName.toLowerCase()}?`);
            } else if (requestType === "stress_management") {
                suggestions.push(`How does stress impact ${topicName.toLowerCase()}?`);
                suggestions.push(`What stress management techniques help with ${topicName.toLowerCase()}?`);
                suggestions.push(`How can I reduce stress related to ${topicName.toLowerCase()}?`);
            } else if (requestType === "habit_formation") {
                suggestions.push(`How can I build consistent ${topicName.toLowerCase()} habits?`);
                suggestions.push(`What are effective strategies for maintaining ${topicName.toLowerCase()} habits?`);
                suggestions.push(`How long does it take to form ${topicName.toLowerCase()} habits?`);
            }
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "What's a good beginner exercise routine?",
                "How can I improve my sleep quality?",
                "What are some effective stress management techniques?",
                "How can I eat healthier on a busy schedule?",
                "What are the key components of a balanced diet?",
                "How can I build a sustainable fitness habit?",
                "What are common health myths I should know about?",
                "How much water should I drink daily?",
                "What's the best way to set realistic health goals?",
                "How can I improve my energy levels naturally?"
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
     * Utility function to capitalize first letter
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
                'jaat-mode20-preferences',
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
            localStorage.removeItem('jaat-mode20-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Set disclaimer acceptance
     * @param {boolean} accepted - Whether disclaimer is accepted
     * @returns {boolean} Success status
     */
    setDisclaimerAccepted(accepted) {
        this.state.disclaimerAccepted = accepted;
        
        // Save updated disclaimer acceptance
        this.savePreferences({ disclaimerAccepted: accepted });
        return true;
    }
    
    /**
     * Add fitness goal
     * @param {string} goal - Fitness goal
     * @returns {boolean} Success status
     */
    addFitnessGoal(goal) {
        if (!goal) return false;
        
        // Add goal if not already present
        if (!this.state.fitnessGoals.includes(goal)) {
            this.state.fitnessGoals.push(goal);
            
            // Save updated fitness goals
            this.savePreferences({ fitnessGoals: this.state.fitnessGoals });
        }
        
        return true;
    }
    
    /**
     * Add dietary preference
     * @param {string} preference - Dietary preference
     * @returns {boolean} Success status
     */
    addDietaryPreference(preference) {
        if (!preference) return false;
        
        // Add preference if not already present
        if (!this.state.dietaryPreferences.includes(preference)) {
            this.state.dietaryPreferences.push(preference);
            
            // Save updated dietary preferences
            this.savePreferences({ dietaryPreferences: this.state.dietaryPreferences });
        }
        
        return true;
    }
    
    /**
     * Add health challenge
     * @param {string} challenge - Health challenge
     * @returns {boolean} Success status
     */
    addHealthChallenge(challenge) {
        if (!challenge) return false;
        
        // Add challenge if not already present
        if (!this.state.healthChallenges.includes(challenge)) {
            this.state.healthChallenges.push(challenge);
            
            // Save updated health challenges
            this.savePreferences({ healthChallenges: this.state.healthChallenges });
        }
        
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
            disclaimerAccepted: this.state.disclaimerAccepted,
            fitnessGoals: this.state.fitnessGoals,
            dietaryPreferences: this.state.dietaryPreferences,
            healthChallenges: this.state.healthChallenges,
            healthTopics: this.state.healthTopics,
            suggestions: this.suggestions.slice(0, 5), // Return first 5 suggestions
            features: this.features
        };
    }
    
    /**
     * Check if the mode is ready to use
     * @returns {boolean} Ready status
     */
    isReady() {
        return this.state.disclaimerAccepted;
    }
}

// Create instance if in browser environment
if (typeof window !== 'undefined') {
    if (!window.jaatAIModes) {
        window.jaatAIModes = {};
    }
    window.jaatAIModes.healthCoach = new HealthCoachMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HealthCoachMode;
}
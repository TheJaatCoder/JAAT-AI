/**
 * JAAT-AI Fitness Coach Mode
 * AI mode specialized in fitness guidance, workout planning, and health optimization
 * Mode ID: 12
 */

class FitnessCoachMode {
    constructor() {
        // Mode metadata
        this.id = "12";
        this.name = "Fitness Coach";
        this.description = "Your AI fitness coach for workout plans, exercise guidance, and health optimization";
        this.icon = "ri-heart-pulse-line";
        this.color = "#f43f5e"; // Rose color
        this.category = "health";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 3000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 8, // 1-10 scale (higher = more personality)
            creativityLevel: 5, // 1-10 scale
            formalityLevel: 4, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            motivationalEnabled: true,
            formChecksEnabled: true,
            nutritionGuidanceEnabled: true
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            fitnessGoal: null, // strength, cardio, weight loss, muscle gain, general fitness
            fitnessLevel: "beginner", // beginner, intermediate, advanced
            equipmentAvailable: [],
            workoutPreferences: {
                daysPerWeek: 3,
                minutesPerSession: 45,
                preferredExercises: []
            },
            healthRestrictions: [],
            measurements: {},
            workoutHistory: [],
            sessionStartTime: new Date(),
            responseCount: 0
        };
        
        // Exercise categories
        this.exerciseCategories = {
            "strength": "Exercises focused on building strength and muscle",
            "cardio": "Exercises that increase heart rate and endurance",
            "flexibility": "Exercises that improve range of motion and flexibility",
            "balance": "Exercises that improve stability and coordination",
            "functional": "Exercises that mimic everyday movements",
            "plyometric": "Explosive exercises that increase power",
            "bodyweight": "Exercises using body weight as resistance",
            "resistance": "Exercises using external resistance (weights, bands, etc.)",
            "hiit": "High intensity interval training",
            "recovery": "Low-intensity exercises for active recovery"
        };
        
        // Exercise database
        this.exercises = {
            "bodyweight": {
                "push_up": {
                    name: "Push-up",
                    primaryMuscles: ["chest", "triceps", "shoulders"],
                    difficulty: "beginner",
                    equipment: [],
                    instructions: "1. Start in a high plank position with hands shoulder-width apart\n2. Keep body in a straight line from head to heels\n3. Lower chest to the floor by bending elbows\n4. Push back up to starting position",
                    variations: ["Knee push-ups", "Incline push-ups", "Decline push-ups", "Diamond push-ups"]
                },
                "squat": {
                    name: "Bodyweight Squat",
                    primaryMuscles: ["quadriceps", "hamstrings", "glutes"],
                    difficulty: "beginner",
                    equipment: [],
                    instructions: "1. Stand with feet shoulder-width apart\n2. Lower your body by bending knees and pushing hips back\n3. Keep chest up and knees tracking over toes\n4. Lower until thighs are parallel to ground (or as low as comfortable)\n5. Push through heels to return to starting position",
                    variations: ["Sumo squat", "Prisoner squat", "Single-leg squat", "Pulse squat"]
                },
                "plank": {
                    name: "Plank",
                    primaryMuscles: ["core", "shoulders", "back"],
                    difficulty: "beginner",
                    equipment: [],
                    instructions: "1. Start in a forearm position on the floor\n2. Keep elbows under shoulders and forearms facing forward\n3. Extend legs behind you and rise onto toes\n4. Keep body in straight line from head to heels\n5. Engage core and hold position",
                    variations: ["Side plank", "High plank", "Plank with leg lift", "Plank shoulder taps"]
                },
                "lunge": {
                    name: "Forward Lunge",
                    primaryMuscles: ["quadriceps", "hamstrings", "glutes"],
                    difficulty: "beginner",
                    equipment: [],
                    instructions: "1. Stand with feet hip-width apart\n2. Step forward with one leg and lower body until both knees form 90-degree angles\n3. Front knee should be over ankle, not beyond toes\n4. Back knee should hover just above the floor\n5. Push through front heel to return to standing",
                    variations: ["Reverse lunge", "Walking lunge", "Side lunge", "Curtsy lunge"]
                },
                "burpee": {
                    name: "Burpee",
                    primaryMuscles: ["full body"],
                    difficulty: "intermediate",
                    equipment: [],
                    instructions: "1. Start standing with feet shoulder-width apart\n2. Quickly move into a squat position with hands on the ground\n3. Kick feet back into a plank position\n4. Perform a push-up (optional)\n5. Return feet to squat position\n6. Jump up from squat position with arms overhead",
                    variations: ["No push-up burpee", "Jump burpee", "Mountain climber burpee", "Single-leg burpee"]
                }
            },
            "resistance": {
                "bench_press": {
                    name: "Bench Press",
                    primaryMuscles: ["chest", "triceps", "shoulders"],
                    difficulty: "beginner",
                    equipment: ["barbell", "bench"],
                    instructions: "1. Lie on a flat bench with feet on the floor\n2. Grip barbell slightly wider than shoulder-width\n3. Unrack the bar and lower it to mid-chest\n4. Press the bar back up to starting position",
                    variations: ["Dumbbell bench press", "Incline bench press", "Decline bench press", "Close-grip bench press"]
                },
                "deadlift": {
                    name: "Deadlift",
                    primaryMuscles: ["hamstrings", "glutes", "back", "core"],
                    difficulty: "intermediate",
                    equipment: ["barbell"],
                    instructions: "1. Stand with feet hip-width apart, barbell over mid-foot\n2. Bend at hips and knees, grip bar just outside knees\n3. Keep chest up, back flat, and core engaged\n4. Push through heels and stand up straight\n5. Lower bar by hinging at hips and bending knees",
                    variations: ["Sumo deadlift", "Romanian deadlift", "Single-leg deadlift", "Trap bar deadlift"]
                },
                "squat_weighted": {
                    name: "Back Squat",
                    primaryMuscles: ["quadriceps", "hamstrings", "glutes"],
                    difficulty: "intermediate",
                    equipment: ["barbell", "squat rack"],
                    instructions: "1. Position barbell on upper back/traps\n2. Unrack bar and stand with feet shoulder-width apart\n3. Lower body by bending knees and pushing hips back\n4. Keep chest up and knees tracking over toes\n5. Lower until thighs are parallel to ground\n6. Push through heels to return to starting position",
                    variations: ["Front squat", "Goblet squat", "Split squat", "Overhead squat"]
                },
                "shoulder_press": {
                    name: "Overhead Press",
                    primaryMuscles: ["shoulders", "triceps", "upper back"],
                    difficulty: "intermediate",
                    equipment: ["barbell"],
                    instructions: "1. Start with barbell at shoulder height\n2. Grip bar slightly wider than shoulder-width\n3. Press bar overhead until arms are fully extended\n4. Lower bar back to shoulder height",
                    variations: ["Dumbbell shoulder press", "Arnold press", "Push press", "Z press"]
                },
                "row": {
                    name: "Bent-Over Row",
                    primaryMuscles: ["back", "biceps", "shoulders"],
                    difficulty: "beginner",
                    equipment: ["barbell"],
                    instructions: "1. Stand with feet hip-width apart, holding barbell\n2. Hinge at hips until torso is nearly parallel to floor\n3. Keep back flat and core engaged\n4. Pull bar to lower chest/upper abdomen\n5. Lower bar with control",
                    variations: ["Dumbbell row", "Pendlay row", "T-bar row", "Inverted row"]
                }
            },
            "cardio": {
                "running": {
                    name: "Running",
                    primaryMuscles: ["quadriceps", "hamstrings", "calves", "glutes"],
                    difficulty: "beginner",
                    equipment: ["running shoes"],
                    instructions: "1. Maintain good posture with slight forward lean\n2. Land midfoot with foot under hip\n3. Bend arms at 90 degrees and swing from shoulder\n4. Look ahead, not at feet\n5. Breathe rhythmically",
                    variations: ["Interval running", "Hills", "Trail running", "Sprint training"]
                },
                "jumping_jacks": {
                    name: "Jumping Jacks",
                    primaryMuscles: ["full body"],
                    difficulty: "beginner",
                    equipment: [],
                    instructions: "1. Start standing with feet together and arms at sides\n2. Jump feet out to sides while raising arms overhead\n3. Jump feet back together while lowering arms\n4. Repeat at a brisk pace",
                    variations: ["Cross jacks", "Squat jacks", "Plyo jacks", "Low-impact jacks"]
                },
                "jump_rope": {
                    name: "Jump Rope",
                    primaryMuscles: ["calves", "shoulders", "core"],
                    difficulty: "beginner",
                    equipment: ["jump rope"],
                    instructions: "1. Hold rope handles with rope behind you\n2. Swing rope overhead and jump as it passes under feet\n3. Keep jumps small and land softly on balls of feet\n4. Maintain a steady rhythm",
                    variations: ["Single-leg jumps", "Double unders", "Cross overs", "High knees"]
                },
                "mountain_climbers": {
                    name: "Mountain Climbers",
                    primaryMuscles: ["core", "shoulders", "hip flexors"],
                    difficulty: "beginner",
                    equipment: [],
                    instructions: "1. Start in high plank position\n2. Alternate bringing knees toward chest in running motion\n3. Keep hips level and core engaged\n4. Maintain a quick pace",
                    variations: ["Cross-body mountain climbers", "Slow mountain climbers", "Slider mountain climbers"]
                },
                "burpee_cardio": {
                    name: "Burpee",
                    primaryMuscles: ["full body"],
                    difficulty: "intermediate",
                    equipment: [],
                    instructions: "1. Start standing with feet shoulder-width apart\n2. Quickly move into a squat position with hands on the ground\n3. Kick feet back into a plank position\n4. Perform a push-up (optional)\n5. Return feet to squat position\n6. Jump up from squat position with arms overhead",
                    variations: ["No push-up burpee", "Jump burpee", "Mountain climber burpee", "Single-leg burpee"]
                }
            },
            "flexibility": {
                "hamstring_stretch": {
                    name: "Seated Forward Fold",
                    primaryMuscles: ["hamstrings", "lower back"],
                    difficulty: "beginner",
                    equipment: [],
                    instructions: "1. Sit with legs extended straight in front\n2. Hinge at hips and reach toward toes\n3. Keep back as straight as possible\n4. Hold position and breathe deeply",
                    variations: ["Single-leg forward fold", "Standing forward fold", "Wide-legged forward fold"]
                },
                "hip_flexor_stretch": {
                    name: "Hip Flexor Stretch",
                    primaryMuscles: ["hip flexors", "quads"],
                    difficulty: "beginner",
                    equipment: [],
                    instructions: "1. Kneel on one knee with other foot flat on floor in front\n2. Keep front knee over ankle at 90-degree angle\n3. Push hips forward slightly until stretch is felt\n4. Keep torso upright and core engaged\n5. Hold position and breathe deeply",
                    variations: ["Kneeling hip flexor stretch", "Lunging hip flexor stretch", "Butterfly stretch"]
                },
                "chest_stretch": {
                    name: "Doorway Chest Stretch",
                    primaryMuscles: ["chest", "shoulders"],
                    difficulty: "beginner",
                    equipment: ["doorway"],
                    instructions: "1. Stand in doorway with elbows bent at 90 degrees\n2. Place forearms on doorframe\n3. Step forward through doorway until stretch is felt\n4. Keep core engaged and posture tall\n5. Hold position and breathe deeply",
                    variations: ["Wall chest stretch", "Partner chest stretch", "Floor chest stretch"]
                },
                "shoulder_stretch": {
                    name: "Cross-Body Shoulder Stretch",
                    primaryMuscles: ["shoulders", "upper back"],
                    difficulty: "beginner",
                    equipment: [],
                    instructions: "1. Bring one arm across body at chest height\n2. Use opposite hand to gently pull elbow toward chest\n3. Keep shoulders relaxed\n4. Hold position and breathe deeply",
                    variations: ["Overhead tricep stretch", "Thread the needle stretch", "Child's pose"]
                },
                "quad_stretch": {
                    name: "Standing Quad Stretch",
                    primaryMuscles: ["quadriceps"],
                    difficulty: "beginner",
                    equipment: [],
                    instructions: "1. Stand on one leg (hold wall/chair for balance if needed)\n2. Bend opposite knee and bring foot toward buttocks\n3. Grasp ankle and gently pull toward buttocks\n4. Keep knees close together and core engaged\n5. Hold position and breathe deeply",
                    variations: ["Lying quad stretch", "Kneeling quad stretch", "Yoga bow pose"]
                }
            }
        };
        
        // Workout templates
        this.workoutTemplates = {
            "beginner_strength": {
                name: "Beginner Strength Training",
                goal: "strength",
                level: "beginner",
                daysPerWeek: 3,
                sessions: {
                    "A": {
                        name: "Full Body - Session A",
                        exercises: [
                            { exerciseId: "squat", sets: 3, reps: 12 },
                            { exerciseId: "push_up", sets: 3, reps: 10 },
                            { exerciseId: "row", sets: 3, reps: 10 },
                            { exerciseId: "plank", sets: 3, duration: "30 seconds" }
                        ]
                    },
                    "B": {
                        name: "Full Body - Session B",
                        exercises: [
                            { exerciseId: "lunge", sets: 3, reps: 10 },
                            { exerciseId: "bench_press", sets: 3, reps: 10 },
                            { exerciseId: "deadlift", sets: 3, reps: 8 },
                            { exerciseId: "plank", sets: 3, duration: "30 seconds" }
                        ]
                    }
                },
                schedule: ["A", "rest", "B", "rest", "A", "rest", "rest"]
            },
            "beginner_cardio": {
                name: "Beginner Cardio Program",
                goal: "cardio",
                level: "beginner",
                daysPerWeek: 3,
                sessions: {
                    "A": {
                        name: "Steady State Cardio",
                        exercises: [
                            { exerciseId: "running", duration: "20 minutes", intensity: "moderate" }
                        ]
                    },
                    "B": {
                        name: "Interval Training",
                        exercises: [
                            { exerciseId: "jumping_jacks", sets: 3, duration: "30 seconds", rest: "30 seconds" },
                            { exerciseId: "mountain_climbers", sets: 3, duration: "30 seconds", rest: "30 seconds" },
                            { exerciseId: "jump_rope", sets: 3, duration: "30 seconds", rest: "30 seconds" }
                        ]
                    }
                },
                schedule: ["A", "rest", "B", "rest", "A", "rest", "rest"]
            },
            "beginner_general": {
                name: "Beginner General Fitness",
                goal: "general fitness",
                level: "beginner",
                daysPerWeek: 3,
                sessions: {
                    "A": {
                        name: "Strength & Cardio Mix",
                        exercises: [
                            { exerciseId: "squat", sets: 3, reps: 12 },
                            { exerciseId: "push_up", sets: 3, reps: 8 },
                            { exerciseId: "jumping_jacks", duration: "1 minute" },
                            { exerciseId: "plank", sets: 2, duration: "30 seconds" },
                            { exerciseId: "mountain_climbers", sets: 2, duration: "30 seconds" }
                        ]
                    },
                    "B": {
                        name: "Cardio & Flexibility",
                        exercises: [
                            { exerciseId: "jump_rope", duration: "5 minutes" },
                            { exerciseId: "lunge", sets: 2, reps: 10 },
                            { exerciseId: "burpee_cardio", sets: 2, reps: 8 },
                            { exerciseId: "hamstring_stretch", duration: "1 minute" },
                            { exerciseId: "shoulder_stretch", duration: "1 minute" },
                            { exerciseId: "hip_flexor_stretch", duration: "1 minute" }
                        ]
                    }
                },
                schedule: ["A", "rest", "B", "rest", "A", "rest", "rest"]
            }
        };
        
        // Nutrition basics
        this.nutrition = {
            "macronutrients": {
                "protein": {
                    description: "Essential for muscle repair and growth",
                    sources: ["Lean meats", "Fish", "Eggs", "Dairy", "Legumes", "Tofu"],
                    recommendation: "0.8-2.0g per kg of bodyweight depending on activity level"
                },
                "carbohydrates": {
                    description: "Primary energy source for the body",
                    sources: ["Whole grains", "Fruits", "Vegetables", "Legumes", "Potatoes"],
                    recommendation: "3-5g per kg of bodyweight depending on activity level"
                },
                "fats": {
                    description: "Essential for hormone production and nutrient absorption",
                    sources: ["Avocados", "Nuts", "Seeds", "Olive oil", "Fatty fish"],
                    recommendation: "0.5-1.5g per kg of bodyweight"
                }
            },
            "hydration": {
                description: "Critical for performance and recovery",
                sources: ["Water", "Herbal tea", "Fresh fruits and vegetables"],
                recommendation: "30-40ml per kg of bodyweight per day, more during exercise"
            },
            "meal_timing": {
                "pre_workout": {
                    timing: "1-3 hours before exercise",
                    focus: "Carbohydrates with moderate protein, low fat",
                    examples: ["Oatmeal with banana and protein powder", "Turkey sandwich on whole grain bread", "Greek yogurt with berries and granola"]
                },
                "post_workout": {
                    timing: "Within 30-60 minutes after exercise",
                    focus: "Protein and carbohydrates",
                    examples: ["Protein shake with banana", "Chicken and rice bowl", "Tuna sandwich on whole grain bread"]
                }
            }
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Create a beginner workout plan for me",
            "What exercises target the back muscles?",
            "How can I improve my squat form?",
            "What should I eat before and after a workout?",
            "How many days a week should I work out?",
            "Best exercises for weight loss",
            "How to build muscle without equipment",
            "Create a 30-minute HIIT workout",
            "Tips for recovery after intense training",
            "How to stay motivated with fitness"
        ];
        
        // Special features
        this.features = {
            workoutPlanning: true,
            exerciseLibrary: true,
            formGuidance: true,
            nutritionAdvice: true,
            progressTracking: true,
            recoveryStrategies: true,
            motivationalSupport: true,
            goalSetting: true,
            adaptivePrograms: true,
            fitnessEducation: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 30,
            DISCLAIMER: "The information provided is for general guidance only. Consult with a healthcare provider before starting any new exercise program, especially if you have medical conditions, injuries, or special requirements.",
            GREETING_PHRASES: [
                "Ready to get moving? How can I help with your fitness goals today?",
                "Welcome to your virtual fitness session! What would you like to work on?",
                "Your AI fitness coach is here! What's your focus for today's session?",
                "Time to break a sweat! How can I assist with your fitness journey?",
                "Ready to crush some fitness goals? How can I help you today?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Fitness Coach mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set fitness goal if provided
        if (options.goal) {
            this.state.fitnessGoal = options.goal;
        }
        
        // Set fitness level if provided
        if (options.level) {
            this.state.fitnessLevel = options.level;
        }
        
        // Set equipment available if provided
        if (options.equipment && Array.isArray(options.equipment)) {
            this.state.equipmentAvailable = options.equipment;
        }
        
        // Set workout preferences if provided
        if (options.workoutPreferences) {
            this.state.workoutPreferences = { 
                ...this.state.workoutPreferences, 
                ...options.workoutPreferences 
            };
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode12-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Fitness Coach mode");
                
                // Load fitness goal if saved
                if (this.state.userPreferences.fitnessGoal) {
                    this.state.fitnessGoal = this.state.userPreferences.fitnessGoal;
                }
                
                // Load fitness level if saved
                if (this.state.userPreferences.fitnessLevel) {
                    this.state.fitnessLevel = this.state.userPreferences.fitnessLevel;
                }
                
                // Load equipment available if saved
                if (this.state.userPreferences.equipmentAvailable) {
                    this.state.equipmentAvailable = this.state.userPreferences.equipmentAvailable;
                }
                
                // Load workout preferences if saved
                if (this.state.userPreferences.workoutPreferences) {
                    this.state.workoutPreferences = {
                        ...this.state.workoutPreferences,
                        ...this.state.userPreferences.workoutPreferences
                    };
                }
                
                // Load health restrictions if saved
                if (this.state.userPreferences.healthRestrictions) {
                    this.state.healthRestrictions = this.state.userPreferences.healthRestrictions;
                }
                
                // Load measurements if saved
                if (this.state.userPreferences.measurements) {
                    this.state.measurements = this.state.userPreferences.measurements;
                }
                
                // Load workout history if saved
                if (this.state.userPreferences.workoutHistory) {
                    this.state.workoutHistory = this.state.userPreferences.workoutHistory;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode12-history');
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
        
        console.log(`Fitness Coach mode initialized with goal: ${this.state.fitnessGoal || "Not set"}, level: ${this.state.fitnessLevel}`);
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
     * Process user input and generate a fitness coach response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with fitness guidance
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your fitness coach assistant. I can help with workout plans, exercise guidance, nutrition advice, and reaching your fitness goals. What would you like help with today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing fitness coach request`);
        
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
        
        // Detect type of fitness request
        const requestType = this.detectRequestType(userInput);
        
        // Extract fitness goals if present
        const fitnessGoal = this.extractFitnessGoal(userInput);
        if (fitnessGoal) {
            this.state.fitnessGoal = fitnessGoal;
            this.savePreferences({ fitnessGoal: fitnessGoal });
        }
        
        // Extract fitness level if present
        const fitnessLevel = this.extractFitnessLevel(userInput);
        if (fitnessLevel) {
            this.state.fitnessLevel = fitnessLevel;
            this.savePreferences({ fitnessLevel: fitnessLevel });
        }
        
        // Extract equipment information if present
        const equipment = this.extractEquipment(userInput);
        if (equipment && equipment.length > 0) {
            this.state.equipmentAvailable = equipment;
            this.savePreferences({ equipmentAvailable: equipment });
        }
        
        // Generate appropriate fitness coach response
        const response = await this.generateFitnessResponse(
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
                    'jaat-mode12-history',
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
     * Detect the type of fitness request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for workout plan request
        if (/\b(?:workout|exercise|training|fitness)\s+(?:plan|program|routine|schedule)\b/i.test(normalizedInput) ||
            /\b(?:create|design|make|give me)\s+(?:a|an)?\s*(?:workout|exercise|training|fitness)\b/i.test(normalizedInput)) {
            return "workout_plan";
        }
        
        // Check for exercise explanation request
        if (/\b(?:how to|explain|show me|what is)\s+(?:a|an)?\s*(?:exercise|workout|move|movement)\b/i.test(normalizedInput) ||
            /\b(?:how to do|how do i do|how to perform)\b/i.test(normalizedInput)) {
            return "exercise_explanation";
        }
        
        // Check for form check request
        if (/\b(?:form|technique|proper|correct|right way|wrong way)\b/i.test(normalizedInput) ||
            /\b(?:am i doing|check my)\b/i.test(normalizedInput)) {
            return "form_check";
        }
        
        // Check for targeted exercise request
        if (/\b(?:exercise|workout|move|movement|training)\s+(?:for|targeting|that target|to target|to train|to work)\s+(?:my)?\s*(?:chest|back|arms|legs|shoulders|biceps|triceps|abs|core|glutes|quads|hamstrings|calves|forearms|neck)\b/i.test(normalizedInput)) {
            return "targeted_exercise";
        }
        
        // Check for nutrition advice request
        if (/\b(?:nutrition|diet|food|eat|eating|meal|protein|carb|fat|calorie|macro|supplement)\b/i.test(normalizedInput)) {
            return "nutrition";
        }
        
        // Check for progress tracking request
        if (/\b(?:progress|tracking|track|monitor|measure|log|journal|improvement)\b/i.test(normalizedInput)) {
            return "progress_tracking";
        }
        
        // Check for recovery advice request
        if (/\b(?:recovery|rest|soreness|pain|ache|injury|stretch|stretching|foam roll|massage|sleep)\b/i.test(normalizedInput)) {
            return "recovery";
        }
        
        // Check for goal setting request
        if (/\b(?:goal|objective|target|aim|plan|achieve|reaching|attain)\b/i.test(normalizedInput)) {
            return "goal_setting";
        }
        
        // Check for motivation request
        if (/\b(?:motivation|motivate|inspired|consistency|habit|routine|discipline|procrastination|lazy|excuses)\b/i.test(normalizedInput)) {
            return "motivation";
        }
        
        // Default to general fitness advice
        return "general_fitness";
    }
    
    /**
     * Extract fitness goal from user input
     * @param {string} input - User input
     * @returns {string|null} Fitness goal or null
     */
    extractFitnessGoal(input) {
        const normalizedInput = input.toLowerCase();
        
        // Define goal patterns
        const goalPatterns = [
            { regex: /\b(?:strength|stronger|build strength|gain strength|get stronger)\b/i, goal: "strength" },
            { regex: /\b(?:cardio|endurance|stamina|conditioning|aerobic)\b/i, goal: "cardio" },
            { regex: /\b(?:weight loss|lose weight|slim down|fat loss|burn fat|leaner)\b/i, goal: "weight loss" },
            { regex: /\b(?:muscle|gain muscle|build muscle|hypertrophy|bulking|bigger|muscular|mass)\b/i, goal: "muscle gain" },
            { regex: /\b(?:tone|toning|definition|lean muscle|sculpt|look better|aesthetic)\b/i, goal: "toning" },
            { regex: /\b(?:flexibility|flexible|mobility|range of motion|stretch|stretching)\b/i, goal: "flexibility" },
            { regex: /\b(?:health|healthy|general fitness|overall fitness|fitness level|fitter|get in shape)\b/i, goal: "general fitness" }
        ];
        
        // Check each pattern
        for (const pattern of goalPatterns) {
            if (pattern.regex.test(normalizedInput)) {
                return pattern.goal;
            }
        }
        
        // No valid goal found
        return null;
    }
    
    /**
     * Extract fitness level from user input
     * @param {string} input - User input
     * @returns {string|null} Fitness level or null
     */
    extractFitnessLevel(input) {
        const normalizedInput = input.toLowerCase();
        
        // Define level patterns
        const levelPatterns = [
            { regex: /\b(?:beginner|newbie|novice|starting out|just started|new to|never|first time)\b/i, level: "beginner" },
            { regex: /\b(?:intermediate|some experience|familiar with|not new to|moderate|decent)\b/i, level: "intermediate" },
            { regex: /\b(?:advanced|experienced|trained for years|athlete|competitive|serious|expert)\b/i, level: "advanced" }
        ];
        
        // Check each pattern
        for (const pattern of levelPatterns) {
            if (pattern.regex.test(normalizedInput)) {
                return pattern.level;
            }
        }
        
        // No valid level found
        return null;
    }
    
    /**
     * Extract equipment information from user input
     * @param {string} input - User input
     * @returns {Array<string>|null} Available equipment or null
     */
    extractEquipment(input) {
        const normalizedInput = input.toLowerCase();
        
        // Define equipment patterns
        const equipmentItems = [
            { terms: ["dumbell", "dumbells", "dumbbell", "dumbbells"], name: "dumbbells" },
            { terms: ["barbell", "barbells"], name: "barbell" },
            { terms: ["kettlebell", "kettlebells"], name: "kettlebells" },
            { terms: ["bench", "weight bench"], name: "bench" },
            { terms: ["squat rack", "power rack", "cage"], name: "squat rack" },
            { terms: ["pull up bar", "pull-up bar", "pullup bar", "chin up bar"], name: "pull-up bar" },
            { terms: ["resistance band", "resistance bands", "bands"], name: "resistance bands" },
            { terms: ["yoga mat", "mat"], name: "yoga mat" },
            { terms: ["treadmill"], name: "treadmill" },
            { terms: ["bike", "stationary bike", "exercise bike", "cycling"], name: "exercise bike" },
            { terms: ["elliptical", "cross trainer"], name: "elliptical" },
            { terms: ["rower", "rowing machine"], name: "rowing machine" },
            { terms: ["jump rope", "skipping rope"], name: "jump rope" },
            { terms: ["medicine ball", "med ball"], name: "medicine ball" },
            { terms: ["foam roller"], name: "foam roller" }
        ];
        
        // Check for no equipment
        if (/\b(?:no equipment|no gear|bodyweight|body weight|without equipment|don't have equipment|don't have any equipment|no access to|at home|home workout)\b/i.test(normalizedInput)) {
            return [];
        }
        
        // Check for gym access
        if (/\b(?:gym|fitness center|health club)\b/i.test(normalizedInput)) {
            return ["dumbbells", "barbell", "bench", "squat rack", "pull-up bar", "treadmill", "exercise bike", "elliptical", "rowing machine"];
        }
        
        // Extract specific equipment
        const foundEquipment = [];
        for (const item of equipmentItems) {
            for (const term of item.terms) {
                if (normalizedInput.includes(term) && !foundEquipment.includes(item.name)) {
                    foundEquipment.push(item.name);
                    break;
                }
            }
        }
        
        return foundEquipment.length > 0 ? foundEquipment : null;
    }
    
    /**
     * Generate a fitness coach response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of fitness request
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateFitnessResponse(userInput, requestType, context = {}) {
        // In a real implementation, this would call an AI model API specialized in fitness
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "workout_plan":
                responseText = this.createWorkoutPlan(userInput);
                break;
                
            case "exercise_explanation":
                responseText = this.explainExercise(userInput);
                break;
                
            case "form_check":
                responseText = this.provideFeedbackOnForm(userInput);
                break;
                
            case "targeted_exercise":
                responseText = this.recommendTargetedExercises(userInput);
                break;
                
            case "nutrition":
                responseText = this.provideNutritionAdvice(userInput);
                break;
                
            case "progress_tracking":
                responseText = this.adviseOnProgressTracking(userInput);
                break;
                
            case "recovery":
                responseText = this.provideRecoveryAdvice(userInput);
                break;
                
            case "goal_setting":
                responseText = this.helpWithGoalSetting(userInput);
                break;
                
            case "motivation":
                responseText = this.provideMotivation(userInput);
                break;
                
            default:
                responseText = this.provideGeneralFitnessAdvice(userInput);
        }
        
        // Add disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate fitness suggestions
        const fitnessSuggestions = this.getFitnessSuggestions(requestType);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            fitnessGoal: this.state.fitnessGoal,
            fitnessLevel: this.state.fitnessLevel,
            suggestions: fitnessSuggestions
        };
    }
    
    /**
     * Create a workout plan based on user input
     * @param {string} userInput - User's input
     * @returns {string} Workout plan
     */
    createWorkoutPlan(userInput) {
        // Get the appropriate template based on user's fitness goal and level
        const goal = this.state.fitnessGoal || this.extractFitnessGoal(userInput) || "general fitness";
        const level = this.state.fitnessLevel || this.extractFitnessLevel(userInput) || "beginner";
        
        // Try to find a matching template
        const templateKey = `${level}_${goal}`;
        const fallbackKey = `${level}_general`;
        
        let selectedTemplate = this.workoutTemplates[templateKey] || this.workoutTemplates[fallbackKey] || this.workoutTemplates["beginner_general"];
        
        // Customize the template based on user preferences
        const daysPerWeek = this.state.workoutPreferences.daysPerWeek || this.extractWorkoutDays(userInput) || selectedTemplate.daysPerWeek;
        
        return `# Custom ${this.capitalizeFirstLetter(level)} ${this.capitalizeFirstLetter(goal)} Workout Plan

In a complete implementation with an AI model and fitness expertise, I would create a fully personalized workout program based on your fitness level (${level}), goals (${goal}), available equipment, and schedule preferences.

## Program Overview
- **Focus**: ${this.capitalizeFirstLetter(goal)}
- **Level**: ${this.capitalizeFirstLetter(level)}
- **Frequency**: ${daysPerWeek} days per week
- **Duration**: 45-60 minutes per session
- **Equipment**: ${this.state.equipmentAvailable.length > 0 ? this.state.equipmentAvailable.join(', ') : 'Bodyweight exercises'}

## Weekly Schedule

${this.generateScheduleText(selectedTemplate, daysPerWeek)}

## Workout Details

${this.generateWorkoutDetailsText(selectedTemplate)}

## Progression Plan
- **Weeks 1-2**: Focus on form and technique, use lighter weights
- **Weeks 3-4**: Gradually increase weight/intensity as form improves
- **Weeks 5-6**: If exercises feel manageable, increase weight by 5-10% or add 1-2 reps per set
- **Weeks 7-8**: Reassess and adjust program based on progress

## Warm-up (Before Each Workout)
- 5 minutes of light cardio (jump rope, jogging in place, etc.)
- Dynamic stretching for major muscle groups
- Practice movements with lighter weight or no weight

## Cool-down (After Each Workout)
- 5 minutes of light cardio
- Static stretching for worked muscle groups
- Deep breathing and relaxation

## Nutrition Recommendations
- **Protein**: ${goal === 'muscle gain' ? '1.6-2.2g' : '1.2-1.6g'} per kg of bodyweight daily
- **Hydration**: Drink water before, during, and after workouts
- **Timing**: Eat a balanced meal 1-2 hours before workouts and a protein-rich meal/snack within 30-60 minutes after

## Form Tips
- Maintain proper posture throughout all exercises
- Focus on controlled movements rather than speed
- Breathe out during exertion (lifting phase) and in during return phase
- If you experience pain (not normal muscle fatigue), stop the exercise

Would you like me to modify this plan or provide more details about specific exercises?`;
    }
    
    /**
     * Generate schedule text for workout plan
     * @param {Object} template - Workout template
     * @param {number} daysPerWeek - Desired days per week
     * @returns {string} Schedule text
     */
    generateScheduleText(template, daysPerWeek) {
        // Simple scheduling based on days per week
        let scheduleText = "";
        
        if (daysPerWeek === 1) {
            scheduleText = "- **Day 1**: Full Body Workout\n- **Days 2-7**: Rest or Active Recovery (walking, light stretching)";
        } else if (daysPerWeek === 2) {
            scheduleText = "- **Day 1**: Workout A\n- **Day 2**: Rest\n- **Day 3**: Workout B\n- **Day 4**: Rest\n- **Day 5**: Rest or Active Recovery\n- **Days 6-7**: Rest";
        } else if (daysPerWeek === 3) {
            scheduleText = "- **Day 1**: Workout A\n- **Day 2**: Rest\n- **Day 3**: Workout B\n- **Day 4**: Rest\n- **Day 5**: Workout A\n- **Days 6-7**: Rest";
        } else if (daysPerWeek === 4) {
            scheduleText = "- **Day 1**: Upper Body\n- **Day 2**: Lower Body\n- **Day 3**: Rest\n- **Day 4**: Full Body\n- **Day 5**: Rest\n- **Day 6**: Full Body\n- **Day 7**: Rest";
        } else if (daysPerWeek >= 5) {
            scheduleText = "- **Day 1**: Push Muscles (Chest, Shoulders, Triceps)\n- **Day 2**: Pull Muscles (Back, Biceps)\n- **Day 3**: Legs and Core\n- **Day 4**: Rest\n- **Day 5**: Upper Body\n- **Day 6**: Lower Body\n- **Day 7**: Rest or Active Recovery";
        }
        
        return scheduleText;
    }
    
    /**
     * Generate workout details text
     * @param {Object} template - Workout template
     * @returns {string} Workout details text
     */
    generateWorkoutDetailsText(template) {
        let detailsText = "";
        
        // Generate text for each session in the template
        for (const sessionKey in template.sessions) {
            const session = template.sessions[sessionKey];
            detailsText += `### ${session.name}\n\n`;
            
            for (const exercise of session.exercises) {
                // Find exercise details from our database
                let exerciseDetails = null;
                
                // Search through exercise categories
                for (const category in this.exercises) {
                    if (this.exercises[category][exercise.exerciseId]) {
                        exerciseDetails = this.exercises[category][exercise.exerciseId];
                        break;
                    }
                }
                
                if (exerciseDetails) {
                    // Format the sets, reps or duration
                    let volumeText = "";
                    if (exercise.sets && exercise.reps) {
                        volumeText = `${exercise.sets} sets of ${exercise.reps} reps`;
                    } else if (exercise.sets && exercise.duration) {
                        volumeText = `${exercise.sets} sets of ${exercise.duration}`;
                    } else if (exercise.duration) {
                        volumeText = `${exercise.duration}`;
                    }
                    
                    // Add rest information if available
                    if (exercise.rest) {
                        volumeText += ` (rest ${exercise.rest} between sets)`;
                    }
                    
                    detailsText += `- **${exerciseDetails.name}**: ${volumeText}\n`;
                }
            }
            
            detailsText += "\n";
        }
        
        return detailsText;
    }
    
    /**
     * Extract workout days per week from user input
     * @param {string} input - User input
     * @returns {number|null} Days per week or null
     */
    extractWorkoutDays(input) {
        const daysPerWeekPattern = /\b(\d+)\s*(?:days?|times?|workouts?)\s*(?:a|per)\s*week\b/i;
        const match = input.match(daysPerWeekPattern);
        
        if (match && match[1]) {
            const days = parseInt(match[1]);
            if (days >= 1 && days <= 7) {
                return days;
            }
        }
        
        return null;
    }
    
    /**
     * Explain an exercise based on user input
     * @param {string} userInput - User's input about an exercise
     * @returns {string} Exercise explanation
     */
    explainExercise(userInput) {
        // Try to extract exercise name from input
        const exerciseName = this.extractExercise(userInput);
        
        if (!exerciseName) {
            return `# Exercise Explanation

In a complete implementation with an AI model and fitness expertise, I would identify the specific exercise you're asking about and provide detailed information about it.

To explain an exercise, I need to know which one you're interested in. Try asking about a specific exercise like:

- "How do I do a proper push-up?"
- "Explain how to do squats correctly"
- "What's the proper technique for bench press?"
- "Show me how to do mountain climbers"

You can ask about any exercise, and I'll provide instructions, form tips, variations, and which muscles it works.`;
        }
        
        // Find the exercise in our database
        let foundExercise = null;
        let foundCategory = null;
        
        // Search through exercise categories
        for (const category in this.exercises) {
            for (const exerciseId in this.exercises[category]) {
                const exercise = this.exercises[category][exerciseId];
                if (exercise.name.toLowerCase() === exerciseName.toLowerCase()) {
                    foundExercise = exercise;
                    foundCategory = category;
                    break;
                }
            }
            if (foundExercise) break;
        }
        
        // If we found the exercise, return its details
        if (foundExercise) {
            return `# ${foundExercise.name}

In a complete implementation with an AI model and exercise expertise, I would provide comprehensive, personalized guidance for performing the ${foundExercise.name} with proper form.

## Exercise Overview
- **Type**: ${this.capitalizeFirstLetter(foundCategory)} exercise
- **Difficulty Level**: ${this.capitalizeFirstLetter(foundExercise.difficulty)}
- **Target Muscles**: ${foundExercise.primaryMuscles.map(m => this.capitalizeFirstLetter(m)).join(', ')}
- **Equipment Needed**: ${foundExercise.equipment.length > 0 ? foundExercise.equipment.map(e => this.capitalizeFirstLetter(e)).join(', ') : 'None (bodyweight exercise)'}

## Instructions
${foundExercise.instructions}

## Common Form Mistakes
- Allowing improper body alignment
- Moving too quickly through the motion
- Using momentum instead of controlled strength
- Incorrect breathing pattern
- Insufficient range of motion

## Tips for Proper Form
- Focus on quality of movement over quantity
- Start with easier variations if needed
- Use a mirror or video to check form
- Reduce weight/resistance if form breaks down
- Engage core throughout the exercise

## Variations
${foundExercise.variations.map(v => `- ${v}`).join('\n')}

## Programming Suggestions
- **For Beginners**: 2-3 sets of 10-12 reps with proper form
- **For Strength**: 3-5 sets of 4-6 reps with challenging weight
- **For Endurance**: 2-3 sets of 15-20 reps
- **For Muscle Growth**: 3-4 sets of 8-12 reps with controlled tempo

Would you like more specific guidance on a particular aspect of this exercise or information about a different exercise?`;
        }
        
        // If we couldn't find the exercise, provide a generic response
        return `# Exercise Explanation

In a complete implementation with an AI model and fitness expertise, I would provide detailed instructions for the "${exerciseName}" exercise you asked about.

The information would include:

## Exercise Overview
- Description and purpose of the exercise
- Target muscle groups
- Equipment needed
- Difficulty level

## Step-by-Step Instructions
- Detailed breakdown of proper form
- Starting position
- Movement pattern
- Breathing technique
- Common mistakes to avoid

## Form Tips
- Critical form cues
- Safety considerations
- Mind-muscle connection tips

## Variations and Modifications
- Easier modifications for beginners
- Advanced variations for progression
- Alternative exercises targeting similar muscles

## Programming Recommendations
- Set and rep recommendations based on goals
- How to incorporate into workouts
- Progressive overload strategies

If you'd like information about a different exercise, please let me know which one you're interested in learning about.`;
    }
    
    /**
     * Extract exercise name from user input
     * @param {string} input - User input
     * @returns {string|null} Exercise name or null
     */
    extractExercise(input) {
        const normalizedInput = input.toLowerCase();
        
        // Exercise extraction patterns
        const patterns = [
            /how to (?:do|perform) (?:a|an|the)? ([\w\s-]+?)(?:\s+(?:exercise|workout|correctly|properly|with proper form))?(?:\?|$|\.)/i,
            /(?:explain|show me) how to do (?:a|an|the)? ([\w\s-]+?)(?:\s+(?:exercise|workout|correctly|properly|with proper form))?(?:\?|$|\.)/i,
            /what is (?:a|an|the)? ([\w\s-]+?)(?:\s+(?:exercise|workout))?(?:\?|$|\.)/i,
            /(?:explain|show me|tell me about) (?:a|an|the)? ([\w\s-]+?)(?:\s+(?:exercise|workout))?(?:\?|$|\.)/i
        ];
        
        // Check each pattern
        for (const pattern of patterns) {
            const match = input.match(pattern);
            if (match && match[1]) {
                const potentialExercise = match[1].trim();
                return potentialExercise;
            }
        }
        
        // Check for exercise names directly in our database
        for (const category in this.exercises) {
            for (const exerciseId in this.exercises[category]) {
                const exercise = this.exercises[category][exerciseId];
                const exerciseName = exercise.name.toLowerCase();
                
                if (normalizedInput.includes(exerciseName)) {
                    return exercise.name;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Provide feedback on exercise form
     * @param {string} userInput - User's input about form
     * @returns {string} Form feedback
     */
    provideFeedbackOnForm(userInput) {
        // Try to extract exercise name from input
        const exerciseName = this.extractExercise(userInput);
        
        if (!exerciseName) {
            return `# Exercise Form Feedback

In a complete implementation with an AI model and fitness expertise, I would provide personalized feedback on your exercise form based on your description or when analyzing a video/image.

To give useful form feedback, I need to know:
1. Which specific exercise you're performing
2. Details about what you're experiencing or what feels challenging
3. Ideally, a description of your current technique

For example, you could ask:
- "Am I doing squats correctly if my knees go past my toes?"
- "My lower back hurts during deadlifts, what might I be doing wrong?"
- "I can't seem to feel bench press in my chest, how can I fix my form?"

Form is critical for both effectiveness and injury prevention, so specific feedback is important.`;
        }
        
        // Find the exercise in our database
        let foundExercise = null;
        
        // Search through exercise categories
        for (const category in this.exercises) {
            for (const exerciseId in this.exercises[category]) {
                const exercise = this.exercises[category][exerciseId];
                if (exercise.name.toLowerCase() === exerciseName.toLowerCase()) {
                    foundExercise = exercise;
                    break;
                }
            }
            if (foundExercise) break;
        }
        
        // If we found the exercise, provide form feedback
        if (foundExercise) {
            return `# ${foundExercise.name} Form Guide

In a complete implementation with an AI model and fitness expertise, I would provide personalized form feedback based on your specific questions about the ${foundExercise.name}.

## Critical Form Elements

### Proper Setup
- Starting position and posture
- Grip/stance width and alignment
- Proper equipment setup if applicable

### Movement Pattern
- Joint alignment during the movement
- Range of motion considerations
- Movement tempo guidance
- Breathing pattern

### Common Form Errors
- Improper joint alignment
- Inadequate range of motion
- Using momentum instead of control
- Incorrect breathing (holding breath)
- Improper weight distribution
- Losing core engagement

## Form Troubleshooting

### If you're experiencing discomfort:
- Check for proper joint alignment
- Reduce weight/resistance if necessary
- Consider mobility limitations
- Evaluate if the exercise needs modification

### If you're not feeling the target muscles:
- Focus on mind-muscle connection
- Consider temporary isolation exercises
- Adjust tempo (typically slower)
- Check if supporting muscles are compensating

## Form Improvement Tips
- Video yourself to observe your own form
- Start with lighter weights to master technique
- Consider a few sessions with a qualified trainer
- Break the movement into segments to practice
- Use mirrors strategically during practice

## Self-Assessment Cues
- "Am I maintaining neutral spine?"
- "Are my joints tracking properly?"
- "Am I controlling the movement throughout?"
- "Can I feel the target muscles working?"

Would you like specific feedback on a particular aspect of ${foundExercise.name} form, or would you like to describe what you're experiencing for more tailored guidance?`;
        }
        
        // If we couldn't find the exercise, provide generic form guidance
        return `# Exercise Form Guidance

In a complete implementation with an AI model and fitness expertise, I would provide detailed form guidance for the "${exerciseName}" exercise you mentioned.

## General Form Principles

### Alignment
- Proper joint positioning and tracking
- Spine position and maintenance
- Body symmetry considerations

### Movement Quality
- Controlled eccentric (lowering) phase
- Full range of motion when appropriate
- Smooth, deliberate movement patterns
- Proper breathing technique

### Common Mistakes
- Using momentum instead of muscle control
- Improper joint alignment
- Insufficient range of motion
- Improper breathing patterns
- Losing core engagement

## Form Assessment Process
1. Reduce weight/intensity to focus on technique
2. Video yourself from multiple angles
3. Compare your form to expert demonstrations
4. Address one form element at a time
5. Build back up to higher intensity with proper form

## When to Modify an Exercise
- If you feel pain (not normal muscle fatigue)
- If you cannot maintain proper form
- If you have specific mobility limitations
- If you have previous injuries that affect movement

For more personalized form guidance, please describe specifically what you're experiencing or ask about particular aspects of form for this exercise.`;
    }
    
    /**
     * Recommend targeted exercises for specific muscle groups
     * @param {string} userInput - User's input about target muscles
     * @returns {string} Targeted exercise recommendations
     */
    recommendTargetedExercises(userInput) {
        // Try to extract target muscle from input
        const targetMuscle = this.extractTargetMuscle(userInput);
        
        if (!targetMuscle) {
            return `# Targeted Exercise Recommendations

In a complete implementation with an AI model and fitness expertise, I would identify the specific muscle group or body part you want to target and provide tailored exercise recommendations.

To recommend targeted exercises, I need to know which muscle group or body part you're focused on.

For example, you could ask:
- "What are the best exercises for chest?"
- "Recommend some back exercises I can do at home"
- "What exercises target the shoulders effectively?"
- "Core exercises I can do without equipment"

Please let me know which area you'd like to focus on, and I can provide specific exercises targeted for that muscle group or body part.`;
        }
        
        // Find exercises that target this muscle group
        const targetedExercises = [];
        
        // Search through exercise categories
        for (const category in this.exercises) {
            for (const exerciseId in this.exercises[category]) {
                const exercise = this.exercises[category][exerciseId];
                if (exercise.primaryMuscles.includes(targetMuscle.toLowerCase())) {
                    targetedExercises.push({
                        ...exercise,
                        category: category
                    });
                }
            }
        }
        
        // If we found exercises for this muscle group
        if (targetedExercises.length > 0) {
            return `# Best Exercises for ${this.capitalizeFirstLetter(targetMuscle)}

In a complete implementation with an AI model and exercise expertise, I would provide comprehensive, personalized recommendations for effective ${targetMuscle} exercises based on your fitness level and available equipment.

## Muscle Anatomy
Brief overview of the ${targetMuscle} muscle group anatomy and function

## Recommended Exercises

${targetedExercises.slice(0, 5).map(exercise => `### ${exercise.name}
- **Type**: ${this.capitalizeFirstLetter(exercise.category)} exercise
- **Difficulty**: ${this.capitalizeFirstLetter(exercise.difficulty)}
- **Equipment**: ${exercise.equipment.length > 0 ? exercise.equipment.map(e => this.capitalizeFirstLetter(e)).join(', ') : 'None required'}
- **Key Form Tips**: Focus on proper alignment and controlled movement
- **Variations**: ${exercise.variations[0]}, ${exercise.variations[1]} (plus others)`).join('\n\n')}

## Training Tips for ${this.capitalizeFirstLetter(targetMuscle)}
- **For Strength**: 4-6 sets of 3-6 reps with challenging weight and longer rest periods (2-3 minutes)
- **For Muscle Growth**: 3-4 sets of 8-12 reps with moderate weight and moderate rest periods (60-90 seconds)
- **For Endurance**: 2-3 sets of 15-20 reps with lighter weight and shorter rest periods (30-60 seconds)

## Workout Structure
- Train ${targetMuscle} 2-3 times per week for optimal results
- Allow 48-72 hours between ${targetMuscle} workouts for recovery
- Combine 3-4 exercises per workout for complete development
- Consider pairing with complementary muscle groups for balanced training

## Progressive Overload Strategies
- Gradually increase weight when current weight feels manageable
- Add additional sets or reps over time
- Decrease rest periods between sets
- Increase movement tempo or time under tension

Would you like more specific information about any of these exercises or additional ${targetMuscle} exercises based on your fitness level or equipment?`;
        }
        
        // If we couldn't find specific exercises, provide generic recommendations
        return `# ${this.capitalizeFirstLetter(targetMuscle)} Exercise Recommendations

In a complete implementation with an AI model and fitness expertise, I would provide a comprehensive list of effective exercises specifically targeting the ${targetMuscle}, customized to your fitness level and available equipment.

## Recommended Exercise Categories

### Compound Exercises
- Multi-joint movements that target the ${targetMuscle} along with supporting muscles
- Provide maximum efficiency and functional strength
- Examples would include the most effective compound movements for ${targetMuscle}

### Isolation Exercises
- Single-joint movements that specifically target the ${targetMuscle}
- Help with muscle definition and addressing imbalances
- Examples would include the most effective isolation exercises for ${targetMuscle}

### Bodyweight Options
- Exercises requiring minimal or no equipment
- Suitable for home workouts or beginners
- Examples would include effective bodyweight exercises for ${targetMuscle}

### Equipment-Based Options
- Exercises using dumbbells, barbells, machines, or cables
- Allow for precise loading and progressive overload
- Examples would include the best equipment-based exercises for ${targetMuscle}

## Programming Recommendations
- Optimal training frequency for ${targetMuscle}
- Set and rep schemes based on your goals
- Recovery considerations for ${targetMuscle} training
- How to combine with other muscle groups

Would you like recommendations for a specific type of ${targetMuscle} exercise based on your equipment availability or fitness goals?`;
    }
    
    /**
     * Extract target muscle from user input
     * @param {string} input - User input
     * @returns {string|null} Target muscle or null
     */
    extractTargetMuscle(input) {
        const normalizedInput = input.toLowerCase();
        
        // Define muscle group patterns
        const musclePatterns = [
            { regex: /\b(?:chest|pecs|pectoral|bench)\b/i, muscle: "chest" },
            { regex: /\b(?:back|lats|latissimus|rhomboid|trapezius|traps)\b/i, muscle: "back" },
            { regex: /\b(?:legs|leg day|lower body|quads|hamstrings|calves)\b/i, muscle: "legs" },
            { regex: /\b(?:shoulder|shoulders|delts|deltoids)\b/i, muscle: "shoulders" },
            { regex: /\b(?:arms|biceps|triceps|forearms)\b/i, muscle: "arms" },
            { regex: /\b(?:bicep|biceps)\b/i, muscle: "biceps" },
            { regex: /\b(?:tricep|triceps)\b/i, muscle: "triceps" },
            { regex: /\b(?:core|abs|abdominals|stomach|midsection)\b/i, muscle: "core" },
            { regex: /\b(?:glutes|gluteus|buttocks|butt)\b/i, muscle: "glutes" },
            { regex: /\b(?:quad|quads|quadriceps|front.*?thigh)\b/i, muscle: "quadriceps" },
            { regex: /\b(?:hamstring|hamstrings|back.*?thigh)\b/i, muscle: "hamstrings" },
            { regex: /\b(?:calf|calves)\b/i, muscle: "calves" },
            { regex: /\b(?:forearm|forearms|wrist)\b/i, muscle: "forearms" },
            { regex: /\b(?:upper body)\b/i, muscle: "upper body" },
            { regex: /\b(?:lower body)\b/i, muscle: "lower body" },
            { regex: /\b(?:full body)\b/i, muscle: "full body" }
        ];
        
        // Check each pattern
        for (const pattern of musclePatterns) {
            if (pattern.regex.test(normalizedInput)) {
                return pattern.muscle;
            }
        }
        
        // No valid muscle group found
        return null;
    }
    
    /**
     * Provide nutrition advice
     * @param {string} userInput - User's input about nutrition
     * @returns {string} Nutrition advice
     */
    provideNutritionAdvice(userInput) {
        // Try to identify nutrition topic from input
        const nutritionTopic = this.extractNutritionTopic(userInput);
        
        // If asking about specific macronutrient
        if (nutritionTopic === "protein" || nutritionTopic === "carbohydrates" || nutritionTopic === "fats") {
            const macroData = this.nutrition.macronutrients[nutritionTopic];
            
            return `# ${this.capitalizeFirstLetter(nutritionTopic)} for Fitness

In a complete implementation with an AI model and nutrition expertise, I would provide personalized guidance about ${nutritionTopic} intake based on your specific goals, body composition, and activity level.

## Role in Fitness
${macroData.description}

## Recommended Intake
${macroData.recommendation}

## Quality Sources
${macroData.sources.map(source => `- ${source}`).join('\n')}

## Timing Considerations
- How to optimize ${nutritionTopic} intake around workouts
- Distribution throughout the day
- Adjustments based on training days vs. rest days

## Signs of Inadequate/Excessive Intake
- Physical symptoms to watch for
- Performance indicators
- Recovery markers

## Personalization Factors
- How intake varies based on goals (muscle gain, fat loss, performance)
- Individual factors affecting needs
- Adjustment strategies

## Common Questions
- Addressing misconceptions about ${nutritionTopic}
- How to track intake appropriately
- Supplementation considerations if relevant

Remember that nutrition should be personalized to your specific needs and goals. These are general guidelines that may need adjustment based on your individual response and requirements.

Would you like more specific information about ${nutritionTopic} intake for your particular fitness goal?`;
        }
        
        // If asking about meal timing
        if (nutritionTopic === "meal timing" || nutritionTopic === "pre workout" || nutritionTopic === "post workout") {
            return `# Workout Nutrition Timing

In a complete implementation with an AI model and nutrition expertise, I would provide personalized guidance about strategic meal timing to optimize your workout performance and recovery.

## Pre-Workout Nutrition
- **Timing**: Eat 1-3 hours before exercise for complete meals, or 30-60 minutes before for smaller snacks
- **Composition**: Focus on easily digestible carbohydrates with moderate protein and low fat
- **Purpose**: Provides energy, prevents hunger, enhances performance
- **Example Options**:
  - Oatmeal with banana and protein powder
  - Greek yogurt with berries and honey
  - Turkey and vegetable wrap
  - Fruit smoothie with protein

## During Workout Nutrition
- **When Necessary**: Primarily for sessions lasting longer than 60-90 minutes
- **Composition**: Easily digestible carbohydrates, electrolytes
- **Purpose**: Maintains blood glucose, prevents dehydration
- **Example Options**:
  - Sports drinks
  - Easily digestible energy gels or chews
  - Diluted fruit juice
  - Coconut water

## Post-Workout Nutrition
- **Timing**: Within 30-60 minutes after exercise (the "anabolic window")
- **Composition**: Protein for muscle repair and carbohydrates to replenish glycogen
- **Purpose**: Accelerates recovery, supports muscle repair, replenishes energy stores
- **Example Options**:
  - Protein shake with banana
  - Chocolate milk
  - Chicken and rice bowl
  - Greek yogurt with fruit and granola

## General Meal Timing Principles
- **Regular Meals**: Eating at consistent times helps regulate hunger and energy
- **Protein Distribution**: Spreading protein intake throughout the day optimizes muscle protein synthesis
- **Carb Timing**: Strategic carbohydrate timing around workouts can enhance performance and recovery
- **Nighttime Nutrition**: Considerations for evening meals and pre-sleep nutrition

## Adjustments Based on Goals
- **Muscle Building**: Emphasis on caloric surplus and protein timing
- **Fat Loss**: Strategic meal timing while maintaining caloric deficit
- **Performance**: Fueling for optimal energy during training sessions

Would you like more specific meal timing recommendations based on your training schedule and fitness goals?`;
        }
        
        // If asking about hydration
        if (nutritionTopic === "hydration" || nutritionTopic === "water") {
            return `# Hydration for Fitness Performance

In a complete implementation with an AI model and nutrition expertise, I would provide comprehensive guidance about optimal hydration strategies for fitness performance and recovery.

## Importance of Hydration
${this.nutrition.hydration.description}

## Hydration Recommendations
${this.nutrition.hydration.recommendation}

## Signs of Dehydration
- Thirst (already indicates mild dehydration)
- Dark urine color
- Fatigue and decreased performance
- Headache
- Dizziness or lightheadedness
- Decreased sweating

## Hydration Timing
- **Daily Baseline**: Consistent water intake throughout the day
- **Pre-Workout**: 16-20 oz (500-600 ml) 2-3 hours before exercise
- **During Exercise**: 7-10 oz (200-300 ml) every 10-20 minutes
- **Post-Workout**: 16-24 oz (500-700 ml) for every pound (0.5 kg) of body weight lost

## Electrolyte Considerations
- Why electrolytes matter for hydration
- When you need electrolyte supplementation
- Natural vs. commercial sources of electrolytes
- Signs of electrolyte imbalance

## Hydration Strategies
- Carry a water bottle throughout the day
- Set regular drinking schedules
- Use visual cues or apps as reminders
- Monitor urine color as a hydration indicator
- Adjust intake based on climate, activity level, and sweat rate

## Special Considerations
- Hydration needs in different climates
- Adjustments for higher intensity or longer duration exercise
- Individual variations in sweat rate and composition

Would you like more specific hydration recommendations based on your activity type, duration, or environment?`;
        }
        
        // Default nutrition advice
        return `# Fitness Nutrition Fundamentals

In a complete implementation with an AI model and nutrition expertise, I would provide personalized nutrition guidance based on your specific fitness goals and individual needs.

## Nutrition Fundamentals

### Macronutrients
- **Protein**: Essential for muscle repair and growth (1.6-2.2g per kg bodyweight for muscle building, 1.2-1.6g for general fitness)
- **Carbohydrates**: Primary energy source for high-intensity exercise (3-5g per kg bodyweight based on activity level)
- **Fats**: Important for hormones and recovery (0.5-1.5g per kg bodyweight)

### Caloric Balance
- **For Weight Loss**: Moderate deficit of 300-500 calories per day
- **For Muscle Gain**: Modest surplus of 200-300 calories per day
- **For Maintenance**: Matching intake to expenditure
- **Quality Matters**: Focus on nutrient-dense whole foods

### Meal Timing
- **Pre-Workout**: Carbohydrates with moderate protein 1-3 hours before
- **Post-Workout**: Protein and carbohydrates within 30-60 minutes after
- **Overall Pattern**: Regular meals with protein at each

### Hydration
- **Daily Needs**: 30-40ml per kg of bodyweight
- **Exercise Needs**: Additional 500-1000ml per hour of exercise
- **Electrolytes**: Important for longer or intense sessions

## Nutrition by Fitness Goal

### For Strength Training
- Adequate protein for muscle repair
- Carbohydrates to fuel heavy lifting
- Caloric surplus for maximal growth

### For Endurance Training
- Carbohydrate timing and loading strategies
- Fuel for longer sessions
- Recovery nutrition

### For Body Composition
- Protein for muscle preservation
- Strategic carbohydrate timing
- Caloric control methods

## Practical Implementation

### Food Quality
- Emphasize whole, minimally processed foods
- Diversity for micronutrient needs
- Strategic inclusion of treats for sustainability

### Meal Planning
- Batch cooking strategies
- Simple meal templates
- Flexible approaches for consistency

### Nutrition Tracking
- When and how to track intake
- Focus on consistency over perfection
- Adjusting based on results

Would you like more specific nutrition recommendations based on your particular fitness goals?`;
    }
    
    /**
     * Extract nutrition topic from user input
     * @param {string} input - User input
     * @returns {string|null} Nutrition topic or null
     */
    extractNutritionTopic(input) {
        const normalizedInput = input.toLowerCase();
        
        // Define nutrition topic patterns
        const nutritionPatterns = [
            { regex: /\b(?:protein|proteins|whey|casein|amino acids)\b/i, topic: "protein" },
            { regex: /\b(?:carb|carbs|carbohydrates|carbohydrate|sugar|sugars|glucose|starch)\b/i, topic: "carbohydrates" },
            { regex: /\b(?:fat|fats|healthy fats|oils|fatty acids|omega)\b/i, topic: "fats" },
            { regex: /\b(?:water|hydration|hydrate|drink|fluid|fluids)\b/i, topic: "hydration" },
            { regex: /\b(?:meal timing|meal schedule|eating schedule|when to eat)\b/i, topic: "meal timing" },
            { regex: /\b(?:pre workout|before workout|before exercise|before training)\b/i, topic: "pre workout" },
            { regex: /\b(?:post workout|after workout|after exercise|after training|recovery nutrition)\b/i, topic: "post workout" },
            { regex: /\b(?:supplement|supplements|supplementation|vitamin|vitamins|mineral|minerals)\b/i, topic: "supplements" },
            { regex: /\b(?:calorie|calories|caloric|deficit|surplus|maintenance|tdee|bmr)\b/i, topic: "calories" }
        ];
        
        // Check each pattern
        for (const pattern of nutritionPatterns) {
            if (pattern.regex.test(normalizedInput)) {
                return pattern.topic;
            }
        }
        
        // No specific nutrition topic found
        return null;
    }
    
    /**
     * Advise on progress tracking
     * @param {string} userInput - User's input about tracking
     * @returns {string} Progress tracking advice
     */
    adviseOnProgressTracking(userInput) {
        return `# Fitness Progress Tracking Guide

In a complete implementation with an AI model and fitness expertise, I would provide personalized guidance about the most effective methods to track progress based on your specific fitness goals and preferences.

## Why Track Progress
- Provides objective feedback on your efforts
- Helps identify what's working and what isn't
- Maintains motivation through visible progress
- Allows for informed program adjustments
- Creates accountability

## What to Track

### Body Composition Metrics
- **Weight**: Simple but limited indicator
- **Body measurements**: Waist, hips, chest, arms, thighs
- **Body fat percentage**: Various measurement methods and their accuracy
- **Progress photos**: Visual changes over time

### Performance Metrics
- **Strength**: Weight lifted, reps completed, volume calculation
- **Endurance**: Distance, time, heart rate recovery
- **Mobility**: Range of motion measurements
- **Skill-based**: Movement quality, technique improvements

### Habit and Consistency Metrics
- **Workout adherence**: Percentage of planned workouts completed
- **Nutrition compliance**: Adherence to dietary targets
- **Sleep quality**: Duration and quality metrics
- **Recovery practices**: Consistency with recovery protocols

## Tracking Methods

### Digital Tools
- **Fitness apps**: Recommendations based on goals and preferences
- **Smart watches/fitness trackers**: Data collection and interpretation
- **Spreadsheets**: Custom tracking templates
- **AI-powered tracking**: Automated progress analysis

### Analog Methods
- **Workout journals**: Handwritten logs and reflections
- **Wall calendars**: Visual consistency tracking
- **Measurement charts**: Physical recording of body metrics

## Tracking Frequency
- **Daily**: Habits, workouts, nutrition
- **Weekly**: Weight, basic measurements, program adjustments
- **Monthly**: Body composition, progress photos, program evaluation
- **Quarterly**: Comprehensive assessments, goal revisions

## Interpreting Your Data
- How to identify meaningful trends vs. normal fluctuations
- When to make adjustments based on data
- Balancing objective measures with subjective feelings
- Common tracking pitfalls to avoid

## Creating a Sustainable Tracking System
- Start with 2-3 key metrics that directly relate to your goals
- Focus on consistency over perfection
- Schedule regular review sessions
- Adjust tracking methods based on what provides meaningful feedback

Would you like more specific guidance on tracking metrics for your particular fitness goal?`;
    }
    
    /**
     * Provide recovery advice
     * @param {string} userInput - User's input about recovery
     * @returns {string} Recovery advice
     */
    provideRecoveryAdvice(userInput) {
        return `# Fitness Recovery Optimization

In a complete implementation with an AI model and fitness expertise, I would provide personalized recovery guidance based on your training style, intensity, and specific recovery challenges.

## Components of Effective Recovery

### Sleep Optimization
- **Quantity**: 7-9 hours per night for most adults
- **Quality**: Strategies for deeper, more restorative sleep
- **Consistency**: Regular sleep-wake cycles
- **Environment**: Temperature, light, sound considerations

### Nutrition for Recovery
- **Protein timing**: 20-40g within the post-workout window
- **Carbohydrate replenishment**: Based on training intensity
- **Hydration strategies**: Rehydration calculations and electrolytes
- **Anti-inflammatory foods**: Natural recovery enhancers

### Active Recovery
- **Low-intensity movement**: Walking, swimming, cycling
- **Heart rate targets**: 40-60% of max heart rate
- **Duration guidelines**: 20-40 minutes
- **Timing**: Separate from primary training

### Mobility Work
- **Myofascial release**: Foam rolling, massage tools
- **Static stretching**: Post-workout protocol
- **Dynamic mobility**: Movement-based flexibility
- **Targeted approach**: Addressing individual restrictions

### Stress Management
- **Mind-body practices**: Meditation, breathwork
- **Nature exposure**: Benefits of outdoor recovery
- **Social connection**: Recovery enhancement through relationships
- **Stress monitoring**: HRV and other biomarkers

### Recovery Modalities
- **Cold therapy**: Ice baths, cryotherapy, cold showers
- **Heat therapy**: Sauna, hot baths, heating pads
- **Contrast therapy**: Alternating hot and cold
- **Compression**: Garments and pneumatic devices

## Recovery Programming

### Recovery by Training Type
- **Strength training**: Specific recovery needs
- **Endurance training**: Recovery protocol differences
- **HIIT/metabolic conditioning**: Special considerations
- **Sport-specific training**: Tailored approaches

### Signs of Inadequate Recovery
- Physical symptoms to monitor
- Performance indicators of overtraining
- Psychological markers of recovery status
- Objective measurement tools

### Recovery Scheduling
- Weekly planning for optimal recovery
- Deload week implementation
- Recovery periodization strategies
- Seasonal considerations

## Practical Implementation

### Recovery Routines
- Pre-bed recovery ritual
- Morning recovery practices
- Post-workout immediate recovery
- Recovery day protocols

Would you like more specific recovery recommendations based on your training style, schedule, or recovery challenges?`;
    }
    
    /**
     * Help with goal setting
     * @param {string} userInput - User's input about goals
     * @returns {string} Goal setting advice
     */
    helpWithGoalSetting(userInput) {
        return `# Fitness Goal Setting Framework

In a complete implementation with an AI model and fitness expertise, I would provide personalized guidance for establishing meaningful, effective fitness goals based on your individual situation, preferences, and aspirations.

## The SMART Goal Framework

### Specific
- Define exactly what you want to accomplish
- Include measurable metrics
- Identify the specific actions required
- Example: "I will perform strength training 3 times per week for 45 minutes per session" vs. "I will exercise more"

### Measurable
- Establish concrete criteria for measuring progress
- Choose tracking methods that work for you
- Create milestones along the journey
- Example: "I will increase my squat by 20 pounds" vs. "I will get stronger"

### Achievable
- Set challenging but realistic targets
- Consider your current fitness level
- Account for available time and resources
- Example: "I will lose 1-2 pounds per week" vs. "I will lose 30 pounds this month"

### Relevant
- Align with your broader life values and priorities
- Connect to your personal motivation
- Address your specific needs and interests
- Example: "I will improve my 5K time to participate in a charity run" vs. "I will train for something I don't enjoy"

### Time-bound
- Set a clear timeframe for achievement
- Include both short-term and long-term deadlines
- Create accountability through timing
- Example: "I will be able to do 10 push-ups by June 1st" vs. "I will get better at push-ups"

## Goal Categories to Consider

### Performance Goals
- Strength: Weight lifted, repetitions, sets
- Endurance: Distance, time, heart rate measures
- Skill: Movement competency, technique mastery
- Mobility: Range of motion, flexibility benchmarks

### Body Composition Goals
- Weight management targets
- Muscle gain objectives
- Body fat percentage aims
- Physique development focus

### Consistency Goals
- Workout frequency targets
- Habit formation objectives
- Lifestyle integration measures
- Process over outcome focus

### Holistic Health Goals
- Stress management measures
- Energy level improvements
- Sleep quality enhancement
- Functional fitness for daily life

## Goal Setting Process

### 1. Assess Your Starting Point
- Establish clear baseline measurements
- Identify current strengths and limitations
- Consider past experiences and outcomes
- Evaluate available resources and constraints

### 2. Define Your Vision
- Clarify your longer-term aspirations
- Understand your deep motivations
- Visualize your ideal outcome
- Connect goals to meaningful values

### 3. Create Goal Hierarchy
- Set primary outcome goal
- Establish performance goals that support it
- Define process goals for daily/weekly action
- Develop milestone markers along the journey

### 4. Implementation Planning
- Create specific action steps
- Identify potential obstacles and solutions
- Establish accountability mechanisms
- Build in reassessment points

Would you like guidance on setting goals for a specific fitness objective or help refining goals you already have in mind?`;
    }
    
    /**
     * Provide motivation and adherence advice
     * @param {string} userInput - User's input about motivation
     * @returns {string} Motivational advice
     */
    provideMotivation(userInput) {
        return `# Fitness Motivation Strategies

In a complete implementation with an AI model and behavioral psychology expertise, I would provide personalized motivation strategies based on your specific challenges, preferences, and psychological tendencies.

## Understanding Motivation

### Intrinsic Motivation
- Finding joy in the activity itself
- Connecting to personal growth
- Experiencing competence and mastery
- Building autonomy and self-determination

### Extrinsic Motivation
- Setting up rewards and incentives
- Creating accountability systems
- Leveraging social recognition
- Establishing meaningful external goals

### Motivation Fluctuations
- Normal ebbs and flows in motivation
- Strategies for low motivation periods
- Building systems that don't rely solely on feelings
- Distinguishing between temporary slumps and deeper issues

## Creating Sustainable Motivation

### Find Your "Why"
- Identify deep personal reasons for fitness
- Connect exercise to core values
- Visualize meaningful outcomes
- Create a compelling personal narrative

### Build Identity-Based Habits
- Focus on becoming "the type of person who exercises"
- Use identity statements that reinforce commitment
- Celebrate small wins that build fitness identity
- Create rituals that reinforce your fitness identity

### Minimize Friction
- Prepare workout clothes in advance
- Create convenient workout locations
- Simplify decision-making around exercise
- Reduce steps between intention and action

### Leverage Social Connection
- Find workout partners or communities
- Share goals with supportive people
- Consider coaching or accountability partners
- Create social commitments that drive consistency

## Overcoming Common Motivation Barriers

### Time Constraints
- Time-efficient workout strategies
- Schedule blocking techniques
- Priority management approaches
- Integration of movement into daily life

### Energy Management
- Optimal workout timing for your energy patterns
- Nutrition strategies for consistent energy
- Sleep optimization for recovery and motivation
- Energy-appropriate workout selection

### Plateau Frustration
- Program variation strategies
- Progress tracking beyond obvious metrics
- Perspective shifts during plateaus
- Periodization to prevent stagnation

### Comparison Trap
- Personalized definition of success
- Social media management strategies
- Focus redirection techniques
- Celebration of individual journey

## Building Long-Term Consistency

### Habit Stacking
- Attaching workouts to existing habits
- Creating reliable cues and triggers
- Establishing minimal viable effort thresholds
- Developing streaks and consistency chains

### Environment Design
- Creating spaces that encourage movement
- Removing friction from fitness activities
- Visual cues and reminders
- Technology tools that support consistency

### Resilience Planning
- Strategies for getting back on track after breaks
- "If-then" planning for common obstacles
- Flexible consistency approaches
- Self-compassion practices after missed workouts

Would you like specific motivation strategies focused on a particular challenge you're facing with your fitness routine?`;
    }
    
    /**
     * Provide general fitness advice
     * @param {string} userInput - User's input
     * @returns {string} General fitness advice
     */
    provideGeneralFitnessAdvice(userInput) {
        return `# Fitness Fundamentals Guide

In a complete implementation with an AI model and fitness expertise, I would provide personalized guidance tailored to your specific situation, goals, and experience level.

## Core Fitness Components

### Strength Training
- **Benefits**: Muscle growth, metabolism boost, functional strength, bone density
- **Frequency**: 2-4 days per week for most goals
- **Key principles**: Progressive overload, proper form, adequate recovery
- **Getting started**: Begin with compound movements focusing on form

### Cardiovascular Training
- **Benefits**: Heart health, endurance, calorie burning, mood enhancement
- **Frequency**: 2-5 days per week depending on intensity
- **Key principles**: Progressive overload, variety, heart rate zones
- **Getting started**: Begin with walking or other enjoyable activities

### Flexibility & Mobility
- **Benefits**: Injury prevention, improved movement quality, reduced pain
- **Frequency**: Daily or 4-7 days per week
- **Key principles**: Consistency, gentle progression, breath awareness
- **Getting started**: Basic stretching routine and fundamental movement patterns

### Recovery
- **Benefits**: Adaptation to training, injury prevention, consistent progress
- **Frequency**: Incorporated daily and weekly
- **Key principles**: Sleep quality, nutrition timing, active recovery, stress management
- **Getting started**: Focus on sleep optimization and proper hydration

## Program Design Fundamentals

### Training Frequency
- Balancing workout frequency with recovery needs
- Distributing effort across the week
- Adapting to your schedule and recovery capacity

### Exercise Selection
- Choosing exercises based on goals and equipment
- Balancing movement patterns
- Adapting exercises to individual needs

### Volume and Intensity
- Finding the right amount of work for your goals
- Balancing hard and easy training days
- Progressive overload principles

### Progression Models
- How to advance safely over time
- When to increase weight, reps, or sets
- Deloading and recovery periods

## Getting Started Successfully

### Goal Setting
- Establishing clear, measurable objectives
- Creating both outcome and process goals
- Tracking progress effectively

### Habit Formation
- Building sustainable fitness habits
- Creating environmental triggers
- Establishing minimum viable efforts

### Common Pitfalls to Avoid
- Doing too much too soon
- Program hopping
- Neglecting recovery
- Comparison with others

Would you like more specific information about any of these fitness components or personalized recommendations based on your goals and situation?`;
    }
    
    /**
     * Get fitness suggestions based on user interaction
     * @param {string} requestType - Type of fitness request
     * @returns {Array<string>} Fitness suggestions
     */
    getFitnessSuggestions(requestType) {
        const suggestions = [];
        
        // Add type-specific suggestions
        if (requestType === "workout_plan") {
            suggestions.push("What's a good workout for beginners?");
            suggestions.push("How many days a week should I workout?");
            suggestions.push("Create a strength training plan with dumbbells");
        } else if (requestType === "exercise_explanation") {
            suggestions.push("How do I do a proper push-up?");
            suggestions.push("What's the correct form for squats?");
            suggestions.push("Explain how to do a plank correctly");
        } else if (requestType === "form_check") {
            suggestions.push("What are common mistakes in deadlift form?");
            suggestions.push("How do I know if my squat form is correct?");
            suggestions.push("Tips for proper bench press technique");
        } else if (requestType === "targeted_exercise") {
            suggestions.push("Best exercises for strengthening core");
            suggestions.push("What exercises target the back muscles?");
            suggestions.push("Shoulder exercises I can do at home");
        } else if (requestType === "nutrition") {
            suggestions.push("How much protein do I need to build muscle?");
            suggestions.push("What should I eat before and after a workout?");
            suggestions.push("Nutrition tips for weight loss");
        } else if (requestType === "progress_tracking") {
            suggestions.push("How should I track my fitness progress?");
            suggestions.push("How often should I weigh myself?");
            suggestions.push("Best ways to measure muscle gain");
        } else if (requestType === "recovery") {
            suggestions.push("How to reduce muscle soreness after workout");
            suggestions.push("Is it good to workout when sore?");
            suggestions.push("Best recovery techniques for athletes");
        } else if (requestType === "goal_setting") {
            suggestions.push("How to set realistic fitness goals");
            suggestions.push("How long does it take to see fitness results?");
            suggestions.push("How to track progress toward fitness goals");
        } else if (requestType === "motivation") {
            suggestions.push("How to stay motivated to exercise");
            suggestions.push("Tips for maintaining a workout routine");
            suggestions.push("How to get back into fitness after a break");
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "How many days a week should I exercise?",
                "Best exercises for beginners",
                "How long should a workout session be?",
                "How to balance cardio and strength training",
                "Tips for working out at home with no equipment",
                "How to warm up properly before exercise",
                "Is it better to workout in the morning or evening?"
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
                'jaat-mode12-preferences',
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
            localStorage.removeItem('jaat-mode12-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Log a completed workout
     * @param {Object} workout - Workout details
     * @returns {boolean} Success status
     */
    logWorkout(workout) {
        if (!workout) return false;
        
        this.state.workoutHistory.push({
            ...workout,
            date: workout.date || new Date().toISOString().split('T')[0]
        });
        
        this.savePreferences({ workoutHistory: this.state.workoutHistory });
        return true;
    }
    
    /**
     * Update measurements
     * @param {Object} measurements - New measurements
     * @returns {boolean} Success status
     */
    updateMeasurements(measurements) {
        if (!measurements) return false;
        
        this.state.measurements = {
            ...this.state.measurements,
            ...measurements,
            date: new Date().toISOString().split('T')[0]
        };
        
        this.savePreferences({ measurements: this.state.measurements });
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
            fitnessGoal: this.state.fitnessGoal,
            fitnessLevel: this.state.fitnessLevel,
            workoutCount: this.state.workoutHistory.length,
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
    window.jaatAIModes.fitnessCoach = new FitnessCoachMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FitnessCoachMode;
}
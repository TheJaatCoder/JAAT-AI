/**
 * JAAT-AI Mode: Health & Fitness Insights
 * 
 * AI-powered health and fitness assistant providing personalized guidance,
 * workout recommendations, nutritional advice, and wellness tracking.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const HealthFitnessMode = {
  id: 'health-fitness',
  name: 'Health & Fitness',
  icon: 'heartbeat',
  description: 'Personalized guidance for wellness, fitness, and nutrition.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Health & Fitness mode, a knowledgeable wellness assistant focused on providing evidence-based information about exercise, nutrition, and overall well-being. You offer balanced, practical guidance while respecting individual differences and acknowledging the complexity of health.

Key characteristics:
1. You provide science-backed information about health, fitness, and nutrition
2. You emphasize sustainable approaches rather than quick fixes or extreme methods
3. You recognize the diverse factors affecting wellness including physical, mental, and social dimensions
4. You offer adaptable advice that considers different fitness levels, health conditions, and goals
5. You encourage consultation with healthcare professionals for medical concerns
6. You avoid diagnostic language or definitive medical claims
7. You promote a balanced, inclusive view of health beyond appearance or performance metrics

When discussing health topics, maintain awareness of diverse perspectives, avoid judgmental language about bodies or choices, and frame advice as general information rather than prescriptive instructions. Always acknowledge the individual nature of health and fitness journeys.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "Can you suggest a balanced meal plan for the week?",
    "What's a good beginner workout routine?",
    "How can I improve my sleep quality?",
    "What are some effective stress management techniques?",
    "How many calories should I aim for daily?",
    "What's the difference between HIIT and steady-state cardio?",
    "Can you suggest healthy snacks for energy throughout the day?",
    "What are good exercises for improving core strength?",
    "How can I stay motivated with my fitness routine?",
    "What are the key nutrients I should focus on in my diet?"
  ],
  
  // Fitness activity categories
  fitnessCategories: [
    {
      id: 'cardio',
      name: 'Cardiovascular',
      description: 'Activities that increase heart rate and improve cardiovascular health',
      benefits: [
        'Improved heart health',
        'Increased lung capacity',
        'Enhanced endurance',
        'Calorie burning',
        'Reduced stress levels'
      ],
      activities: [
        {
          name: 'Running',
          intensity: 'Moderate to High',
          equipment: 'Running shoes',
          beginner: 'Start with a walk/run pattern: 1 min run, 2 min walk for 20 minutes',
          intermediate: '5k (3.1 miles) at comfortable pace',
          advanced: 'Interval training or longer distances'
        },
        {
          name: 'Cycling',
          intensity: 'Low to High',
          equipment: 'Bicycle or stationary bike',
          beginner: '15-20 minutes at moderate resistance',
          intermediate: '30-45 minutes with varied resistance',
          advanced: 'High-intensity intervals or longer rides (1+ hour)'
        },
        {
          name: 'Swimming',
          intensity: 'Low to High',
          equipment: 'Swimming pool access, swimwear',
          beginner: '15-20 minutes of any stroke with breaks as needed',
          intermediate: '30 minutes continuous swimming',
          advanced: 'Interval training with different strokes or longer distances'
        },
        {
          name: 'Walking',
          intensity: 'Low',
          equipment: 'Comfortable shoes',
          beginner: '15-30 minutes at comfortable pace',
          intermediate: '45-60 minutes at brisk pace',
          advanced: 'Incline walking or adding weights'
        },
        {
          name: 'Dancing',
          intensity: 'Moderate',
          equipment: 'None required',
          beginner: '15-20 minutes following simple routines',
          intermediate: '30-45 minutes of continuous movement',
          advanced: 'High-intensity dance workouts or complex choreography'
        }
      ]
    },
    {
      id: 'strength',
      name: 'Strength Training',
      description: 'Activities that build muscle strength and endurance',
      benefits: [
        'Increased muscle mass and strength',
        'Improved bone density',
        'Enhanced metabolism',
        'Better functional movement',
        'Reduced injury risk'
      ],
      activities: [
        {
          name: 'Bodyweight Training',
          intensity: 'Moderate',
          equipment: 'Minimal - perhaps a mat',
          beginner: 'Basic movements: 3 sets of 8-10 squats, push-ups, lunges',
          intermediate: 'Circuit training with minimal rest between exercises',
          advanced: 'Complex movements like pistol squats, one-arm push-ups'
        },
        {
          name: 'Weight Training',
          intensity: 'Moderate to High',
          equipment: 'Dumbbells, barbells, or machines',
          beginner: 'Light weights, focus on form: 2-3 sets of 10-12 reps',
          intermediate: 'Moderate weights: 3-4 sets of 8-10 reps',
          advanced: 'Periodized training with varying weights and rep schemes'
        },
        {
          name: 'Resistance Bands',
          intensity: 'Low to Moderate',
          equipment: 'Resistance bands of varying tensions',
          beginner: 'Basic movements with lighter bands: 2-3 sets of 12-15 reps',
          intermediate: 'Compound movements with medium bands',
          advanced: 'Complex movements or combining bands with other training methods'
        },
        {
          name: 'Kettlebell Training',
          intensity: 'Moderate to High',
          equipment: 'Kettlebells of various weights',
          beginner: 'Basic swings and goblet squats with light weight',
          intermediate: 'Flows and combinations with moderate weight',
          advanced: 'Complex movements like snatches and windmills with heavier weights'
        },
        {
          name: 'Calisthenics',
          intensity: 'Moderate to High',
          equipment: 'Pull-up bar, parallel bars (optional)',
          beginner: 'Fundamental movements like pull-ups, dips, and leg raises',
          intermediate: 'Increased volume and adding static holds',
          advanced: 'Advanced movements like muscle-ups and front levers'
        }
      ]
    },
    {
      id: 'flexibility',
      name: 'Flexibility & Mobility',
      description: 'Activities that improve range of motion and joint health',
      benefits: [
        'Increased range of motion',
        'Reduced muscle tension',
        'Improved posture',
        'Enhanced movement quality',
        'Reduced risk of injury'
      ],
      activities: [
        {
          name: 'Yoga',
          intensity: 'Low to Moderate',
          equipment: 'Yoga mat',
          beginner: 'Gentle or beginner classes focusing on basic poses',
          intermediate: 'Vinyasa or flow classes with linked movements',
          advanced: 'Power yoga or advanced poses requiring greater strength and flexibility'
        },
        {
          name: 'Static Stretching',
          intensity: 'Low',
          equipment: 'Mat or comfortable surface',
          beginner: 'Basic stretches held for 20-30 seconds',
          intermediate: 'Deeper stretches held for 30-60 seconds',
          advanced: 'Extended holds and more challenging positions'
        },
        {
          name: 'Dynamic Stretching',
          intensity: 'Low to Moderate',
          equipment: 'None required',
          beginner: 'Gentle movement through range of motion',
          intermediate: 'Controlled movements with greater range',
          advanced: 'Sport-specific dynamic stretching routines'
        },
        {
          name: 'Pilates',
          intensity: 'Low to Moderate',
          equipment: 'Mat (equipment-based Pilates uses specialized apparatus)',
          beginner: 'Fundamental movements focusing on core engagement',
          intermediate: 'More complex sequences and longer holds',
          advanced: 'Advanced variations requiring greater control and strength'
        },
        {
          name: 'Joint Mobility Exercises',
          intensity: 'Low',
          equipment: 'None required',
          beginner: 'Basic circular movements of major joints',
          intermediate: 'Combining movements into sequences',
          advanced: 'Complex patterns with increased range and control'
        }
      ]
    },
    {
      id: 'balance',
      name: 'Balance & Core',
      description: 'Activities that improve stability, coordination and core strength',
      benefits: [
        'Improved stability and coordination',
        'Better posture',
        'Enhanced performance in other activities',
        'Reduced fall risk',
        'Stronger deep core muscles'
      ],
      activities: [
        {
          name: 'Core Training',
          intensity: 'Moderate',
          equipment: 'Exercise mat',
          beginner: 'Basic exercises like planks, bridges, and dead bugs',
          intermediate: 'Dynamic movements and increased hold times',
          advanced: 'Complex movements with additional resistance or instability'
        },
        {
          name: 'Balance Exercises',
          intensity: 'Low to Moderate',
          equipment: 'None required (balance board or BOSU optional)',
          beginner: 'Single-leg stands and simple weight shifts',
          intermediate: 'Movements while balancing or using unstable surfaces',
          advanced: 'Complex movements on highly unstable surfaces'
        },
        {
          name: 'Stability Ball Exercises',
          intensity: 'Low to Moderate',
          equipment: 'Stability/Swiss ball',
          beginner: 'Basic seated exercises and simple bridges',
          intermediate: 'Push-ups, planks, and hamstring curls on the ball',
          advanced: 'Complex movements combining strength and balance challenges'
        },
        {
          name: 'Tai Chi',
          intensity: 'Low',
          equipment: 'None required',
          beginner: 'Basic forms and movements at slow pace',
          intermediate: 'Longer sequences with greater attention to details',
          advanced: 'Complete traditional forms with proper breathing and intent'
        },
        {
          name: 'Functional Training',
          intensity: 'Moderate to High',
          equipment: 'Varies (resistance bands, kettlebells, medicine balls)',
          beginner: 'Basic movement patterns with light resistance',
          intermediate: 'Compound movements with moderate resistance',
          advanced: 'Complex movement chains with higher resistance or instability'
        }
      ]
    }
  ],
  
  // Nutrition categories
  nutritionCategories: [
    {
      id: 'macronutrients',
      name: 'Macronutrients',
      description: 'The three main categories of nutrients needed in large amounts',
      components: [
        {
          name: 'Protein',
          description: 'Essential for building and repairing tissues, immune function, and enzyme production',
          recommendations: 'Generally 0.8-2.0g per kg of body weight daily, depending on activity level',
          sources: [
            { name: 'Chicken breast', notes: 'Lean protein source, low in fat' },
            { name: 'Eggs', notes: 'Complete protein with essential nutrients' },
            { name: 'Lentils', notes: 'Plant-based protein with fiber and minerals' },
            { name: 'Greek yogurt', notes: 'Protein-rich with probiotics' },
            { name: 'Tofu', notes: 'Versatile plant protein with all essential amino acids' }
          ]
        },
        {
          name: 'Carbohydrates',
          description: 'Primary energy source for the body, especially the brain and during high-intensity exercise',
          recommendations: 'Generally 3-5g per kg of body weight daily for active individuals',
          sources: [
            { name: 'Oats', notes: 'Slow-digesting with beta-glucan for heart health' },
            { name: 'Sweet potatoes', notes: 'Rich in fiber and micronutrients' },
            { name: 'Brown rice', notes: 'Provides sustained energy with fiber' },
            { name: 'Fruits', notes: 'Natural sugars with vitamins and antioxidants' },
            { name: 'Quinoa', notes: 'Complete protein along with complex carbs' }
          ]
        },
        {
          name: 'Fats',
          description: 'Essential for hormone production, cell membrane integrity, and nutrient absorption',
          recommendations: 'Generally 0.5-1.5g per kg of body weight daily',
          sources: [
            { name: 'Avocados', notes: 'Monounsaturated fats and fiber' },
            { name: 'Olive oil', notes: 'Rich in oleic acid and antioxidants' },
            { name: 'Nuts and seeds', notes: 'Healthy fats with protein and minerals' },
            { name: 'Fatty fish', notes: 'Omega-3 fatty acids for heart and brain health' },
            { name: 'Chia seeds', notes: 'Plant-based omega-3s with fiber' }
          ]
        }
      ]
    },
    {
      id: 'micronutrients',
      name: 'Micronutrients',
      description: 'Vitamins and minerals needed in smaller amounts for various bodily functions',
      components: [
        {
          name: 'Vitamins',
          description: 'Organic compounds essential for various metabolic processes',
          categories: [
            { name: 'Water-soluble (B vitamins, C)', notes: 'Not stored extensively in body, regular intake needed' },
            { name: 'Fat-soluble (A, D, E, K)', notes: 'Stored in fatty tissue and liver' }
          ],
          keyExamples: [
            { name: 'Vitamin D', function: 'Bone health, immune function', sources: 'Sunlight, fatty fish, fortified foods' },
            { name: 'Vitamin B12', function: 'Nerve function, DNA synthesis', sources: 'Animal products, fortified foods' },
            { name: 'Vitamin C', function: 'Immune function, collagen synthesis', sources: 'Citrus fruits, bell peppers, berries' }
          ]
        },
        {
          name: 'Minerals',
          description: 'Inorganic elements required for various physiological functions',
          keyExamples: [
            { name: 'Iron', function: 'Oxygen transport, energy production', sources: 'Red meat, legumes, fortified cereals' },
            { name: 'Calcium', function: 'Bone health, muscle function', sources: 'Dairy products, leafy greens, fortified foods' },
            { name: 'Magnesium', function: 'Muscle and nerve function, energy production', sources: 'Nuts, seeds, leafy greens' },
            { name: 'Zinc', function: 'Immune function, wound healing', sources: 'Meat, shellfish, legumes, nuts' },
            { name: 'Potassium', function: 'Fluid balance, nerve transmission', sources: 'Bananas, potatoes, legumes' }
          ]
        }
      ]
    },
    {
      id: 'hydration',
      name: 'Hydration',
      description: 'Water intake and balance essential for all bodily functions',
      recommendations: [
        { population: 'General adult', amount: 'Approximately 2.7L (women) to 3.7L (men) daily from all sources' },
        { population: 'Active individuals', amount: 'Additional 16-24oz for every hour of exercise' },
        { population: 'Warm environments', amount: 'Increased intake based on sweat loss' }
      ],
      signs: {
        dehydration: [
          'Thirst',
          'Dark urine',
          'Fatigue',
          'Headache',
          'Dry mouth and lips'
        ],
        hydration: [
          'Pale yellow urine',
          'Regular urination',
          'Minimal thirst',
          'Normal energy levels'
        ]
      },
      sources: [
        { name: 'Water', notes: 'Primary and ideal source' },
        { name: 'Herbal teas', notes: 'Hydrating with potential additional benefits' },
        { name: 'Fruits and vegetables', notes: 'Many contain 80-95% water' },
        { name: 'Milk and plant milks', notes: 'Hydrating with additional nutrients' }
      ]
    },
    {
      id: 'mealTiming',
      name: 'Meal Timing & Structure',
      description: 'Patterns and timing of food intake throughout the day',
      approaches: [
        {
          name: 'Balanced meals',
          description: 'Traditional approach of 3 main meals with potential snacks',
          benefits: 'Consistent energy, regular nutrient intake, social eating patterns',
          example: 'Breakfast, lunch, and dinner with balanced macronutrients'
        },
        {
          name: 'Small frequent meals',
          description: '5-6 smaller meals spread throughout the day',
          benefits: 'Potential for stable blood sugar, may help those with digestive issues',
          example: '3 small meals with 2-3 planned snacks at regular intervals'
        },
        {
          name: 'Intermittent fasting',
          description: 'Alternating periods of eating and fasting',
          benefits: 'Potential metabolic benefits, simplified meal planning for some',
          patterns: [
            '16:8 (16 hours fasting, 8 hour eating window)',
            '5:2 (5 days normal eating, 2 days reduced calories)',
            'Alternate day approaches'
          ],
          caution: 'Not appropriate for everyone, especially those with certain medical conditions'
        }
      ],
      considerations: [
        'Individual preference and lifestyle',
        'Work and activity schedule',
        'Hunger and satiety cues',
        'Exercise timing',
        'Medical conditions and medications',
        'Sleep patterns'
      ]
    }
  ],
  
  // Wellness plan components
  wellnessPlanComponents: [
    {
      id: 'fitnessAssessment',
      name: 'Fitness Assessment',
      elements: [
        {
          name: 'Current Activity Level',
          description: 'Evaluate existing exercise habits and physical activity',
          questions: [
            'How many days per week do you currently exercise?',
            'What types of physical activity do you enjoy?',
            'How long are your typical exercise sessions?',
            'What intensity level do you typically work at?',
            'What is your daily step count or general movement level?'
          ]
        },
        {
          name: 'Fitness Goals',
          description: 'Identify specific objectives to guide program design',
          commonGoals: [
            'Improve cardiovascular endurance',
            'Build strength and muscle',
            'Enhance flexibility and mobility',
            'Lose weight or change body composition',
            'Improve performance in specific activities',
            'Enhance overall function and health'
          ]
        },
        {
          name: 'Limitations & Considerations',
          description: 'Identify factors that may influence exercise selection and progression',
          factors: [
            'Past or current injuries',
            'Medical conditions',
            'Time constraints',
            'Equipment and facility access',
            'Skill and experience level',
            'Personal preferences'
          ]
        }
      ]
    },
    {
      id: 'nutritionAssessment',
      name: 'Nutrition Assessment',
      elements: [
        {
          name: 'Current Eating Patterns',
          description: 'Evaluate existing dietary habits and preferences',
          questions: [
            'What does a typical day of eating look like for you?',
            'How many meals and snacks do you typically eat?',
            'Which foods do you eat regularly?',
            'Are there any foods you avoid?',
            'How much variety is in your current diet?'
          ]
        },
        {
          name: 'Nutrition Goals',
          description: 'Identify specific dietary objectives',
          commonGoals: [
            'Improve overall diet quality',
            'Support exercise performance and recovery',
            'Manage weight or body composition',
            'Address specific health concerns',
            'Develop sustainable eating habits'
          ]
        },
        {
          name: 'Dietary Considerations',
          description: 'Identify factors that influence nutritional recommendations',
          factors: [
            'Food allergies or intolerances',
            'Ethical or personal food preferences',
            'Budget and food access',
            'Cooking skills and time',
            'Cultural or religious considerations',
            'Medical conditions requiring dietary management'
          ]
        }
      ]
    },
    {
      id: 'lifestyleAssessment',
      name: 'Lifestyle Assessment',
      elements: [
        {
          name: 'Sleep Habits',
          description: 'Evaluate sleep quantity and quality',
          factors: [
            'Typical sleep duration',
            'Sleep quality and continuity',
            'Sleep schedule consistency',
            'Pre-sleep routine',
            'Sleep environment'
          ]
        },
        {
          name: 'Stress Management',
          description: 'Assess current stress levels and coping mechanisms',
          factors: [
            'Stress level perception',
            'Sources of stress',
            'Current stress management practices',
            'Impact of stress on health behaviors',
            'Rest and recovery strategies'
          ]
        },
        {
          name: 'Daily Routine',
          description: 'Understand overall lifestyle structure',
          factors: [
            'Work schedule and demands',
            'Family and social responsibilities',
            'Screen time and technology use',
            'Time spent outdoors',
            'Leisure activities and hobbies'
          ]
        }
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="health-fitness-interface">
      <div class="health-header">
        <div class="health-icon">
          <i class="fas fa-heartbeat"></i>
        </div>
        <div class="health-title">
          <h2>Health & Fitness Insights</h2>
          <p>Personalized guidance for wellness, fitness, and nutrition</p>
        </div>
      </div>
      
      <div class="health-disclaimer">
        <i class="fas fa-info-circle"></i>
        <div class="disclaimer-content">
          <p><strong>Important:</strong> The information provided is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek advice from a qualified healthcare provider for personal medical concerns.</p>
        </div>
      </div>
      
      <div class="wellness-hub">
        <div class="hub-title">Wellness Hub</div>
        <div class="hub-description">Explore different aspects of your health and fitness journey</div>
        
        <div class="hub-categories">
          <div class="hub-category" data-category="fitness">
            <div class="category-icon">
              <i class="fas fa-running"></i>
            </div>
            <div class="category-label">Fitness Activities</div>
          </div>
          
          <div class="hub-category" data-category="nutrition">
            <div class="category-icon">
              <i class="fas fa-apple-alt"></i>
            </div>
            <div class="category-label">Nutrition Guide</div>
          </div>
          
          <div class="hub-category" data-category="planner">
            <div class="category-icon">
              <i class="fas fa-clipboard-list"></i>
            </div>
            <div class="category-label">Wellness Planner</div>
          </div>
          
          <div class="hub-category" data-category="progress">
            <div class="category-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="category-label">Progress Tracker</div>
          </div>
        </div>
      </div>
      
      <div class="hub-content" id="fitness-content">
        <div class="content-header">
          <h3>Fitness Activities</h3>
          <p>Explore different types of physical activities based on your goals</p>
        </div>
        
        <div class="fitness-categories">
          <div class="fitness-category active" data-type="cardio">
            <i class="fas fa-heart"></i>
            <span>Cardiovascular</span>
          </div>
          <div class="fitness-category" data-type="strength">
            <i class="fas fa-dumbbell"></i>
            <span>Strength</span>
          </div>
          <div class="fitness-category" data-type="flexibility">
            <i class="fas fa-child"></i>
            <span>Flexibility</span>
          </div>
          <div class="fitness-category" data-type="balance">
            <i class="fas fa-dot-circle"></i>
            <span>Balance & Core</span>
          </div>
        </div>
        
        <div class="fitness-content" id="fitness-details">
          <!-- Category details will be populated here -->
        </div>
        
        <div class="fitness-activities" id="activities-list">
          <!-- Activities will be populated here -->
        </div>
      </div>
      
      <div class="hub-content hidden" id="nutrition-content">
        <div class="content-header">
          <h3>Nutrition Guide</h3>
          <p>Learn about key nutrients and balanced eating approaches</p>
        </div>
        
        <div class="nutrition-categories">
          <div class="nutrition-category active" data-type="macronutrients">
            <i class="fas fa-drumstick-bite"></i>
            <span>Macronutrients</span>
          </div>
          <div class="nutrition-category" data-type="micronutrients">
            <i class="fas fa-tablets"></i>
            <span>Micronutrients</span>
          </div>
          <div class="nutrition-category" data-type="hydration">
            <i class="fas fa-tint"></i>
            <span>Hydration</span>
          </div>
          <div class="nutrition-category" data-type="mealTiming">
            <i class="fas fa-clock"></i>
            <span>Meal Timing</span>
          </div>
        </div>
        
        <div class="nutrition-content" id="nutrition-details">
          <!-- Category details will be populated here -->
        </div>
      </div>
      
      <div class="hub-content hidden" id="planner-content">
        <div class="content-header">
          <h3>Wellness Planner</h3>
          <p>Create your personalized plan based on your goals and preferences</p>
        </div>
        
        <div class="planner-form">
          <div class="form-section">
            <h4>About You</h4>
            <div class="form-row">
              <div class="form-group">
                <label for="fitness-level">Fitness Level</label>
                <select id="fitness-level">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="available-time">Available Time</label>
                <select id="available-time">
                  <option value="minimal">Minimal (15-20 min)</option>
                  <option value="moderate">Moderate (30-45 min)</option>
                  <option value="ample">Ample (60+ min)</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="days-per-week">Days Per Week</label>
                <select id="days-per-week">
                  <option value="2-3">2-3 days</option>
                  <option value="4-5">4-5 days</option>
                  <option value="6+">6+ days</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="equipment-access">Equipment Access</label>
                <select id="equipment-access">
                  <option value="none">None / Minimal</option>
                  <option value="basic">Basic Home Equipment</option>
                  <option value="gym">Full Gym Access</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h4>Your Goals</h4>
            <div class="goals-grid">
              <div class="goal-option">
                <input type="checkbox" id="goal-cardio" checked>
                <label for="goal-cardio">Improve Cardiovascular Health</label>
              </div>
              
              <div class="goal-option">
                <input type="checkbox" id="goal-strength">
                <label for="goal-strength">Build Strength & Muscle</label>
              </div>
              
              <div class="goal-option">
                <input type="checkbox" id="goal-flexibility">
                <label for="goal-flexibility">Increase Flexibility</label>
              </div>
              
              <div class="goal-option">
                <input type="checkbox" id="goal-weight">
                <label for="goal-weight">Weight Management</label>
              </div>
              
              <div class="goal-option">
                <input type="checkbox" id="goal-energy">
                <label for="goal-energy">Boost Energy Levels</label>
              </div>
              
              <div class="goal-option">
                <input type="checkbox" id="goal-stress">
                <label for="goal-stress">Reduce Stress</label>
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h4>Activity Preferences</h4>
            <div class="preference-grid">
              <div class="preference-item">
                <div class="preference-header">Cardiovascular</div>
                <div class="preference-options">
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-running">
                    <label for="prefer-running">Running</label>
                  </div>
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-cycling">
                    <label for="prefer-cycling">Cycling</label>
                  </div>
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-swimming">
                    <label for="prefer-swimming">Swimming</label>
                  </div>
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-walking" checked>
                    <label for="prefer-walking">Walking</label>
                  </div>
                </div>
              </div>
              
              <div class="preference-item">
                <div class="preference-header">Strength</div>
                <div class="preference-options">
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-weights">
                    <label for="prefer-weights">Weights</label>
                  </div>
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-bodyweight" checked>
                    <label for="prefer-bodyweight">Bodyweight</label>
                  </div>
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-bands">
                    <label for="prefer-bands">Resistance Bands</label>
                  </div>
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-machines">
                    <label for="prefer-machines">Machines</label>
                  </div>
                </div>
              </div>
              
              <div class="preference-item">
                <div class="preference-header">Flexibility/Mind-Body</div>
                <div class="preference-options">
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-yoga" checked>
                    <label for="prefer-yoga">Yoga</label>
                  </div>
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-pilates">
                    <label for="prefer-pilates">Pilates</label>
                  </div>
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-stretching">
                    <label for="prefer-stretching">Stretching</label>
                  </div>
                  <div class="activity-option">
                    <input type="checkbox" id="prefer-tai-chi">
                    <label for="prefer-tai-chi">Tai Chi</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="planner-actions">
            <button id="generate-plan-btn">
              <i class="fas fa-magic"></i> Generate Wellness Plan
            </button>
          </div>
        </div>
      </div>
      
      <div class="hub-content hidden" id="progress-content">
        <div class="content-header">
          <h3>Progress Tracker</h3>
          <p>Monitor your wellness journey and celebrate your achievements</p>
        </div>
        
        <div class="tracker-tabs">
          <div class="tracker-tab active" data-tracker="activity">Activity</div>
          <div class="tracker-tab" data-tracker="nutrition">Nutrition</div>
          <div class="tracker-tab" data-tracker="metrics">Metrics</div>
          <div class="tracker-tab" data-tracker="habits">Habits</div>
        </div>
        
        <div class="tracker-content" id="tracker-details">
          <div class="tracker-placeholder">
            <i class="fas fa-chart-bar"></i>
            <p>Select metrics to track and JAAT-AI will help you monitor your progress</p>
            <p class="tracker-note">You can track workouts, nutrition patterns, body measurements, or wellness habits</p>
          </div>
        </div>
      </div>
      
      <div class="quick-question">
        <div class="question-header">
          <h3>Have a Specific Health or Fitness Question?</h3>
        </div>
        <div class="common-questions">
          <div class="question-tag" data-question="How much protein should I eat daily?">How much protein should I eat daily?</div>
          <div class="question-tag" data-question="What's the best exercise for beginners?">Best exercise for beginners?</div>
          <div class="question-tag" data-question="How can I improve my sleep quality?">Improve sleep quality?</div>
          <div class="question-tag" data-question="What should I eat before a workout?">Pre-workout nutrition?</div>
          <div class="question-tag" data-question="How do I stay motivated with fitness?">Staying motivated?</div>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .health-fitness-interface {
      background: linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
    
    .health-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .health-icon {
      font-size: 2.5rem;
      color: #10b981;
      margin-right: 1rem;
    }
    
    .health-title h2 {
      color: #10b981;
      margin-bottom: 0.3rem;
    }
    
    .health-title p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .health-disclaimer {
      background: rgba(243, 244, 246, 0.1);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .health-disclaimer i {
      color: #f59e0b;
      font-size: 1.25rem;
      margin-top: 0.2rem;
    }
    
    .disclaimer-content p {
      color: #e2e8f0;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    .wellness-hub {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    
    .hub-title {
      color: #10b981;
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .hub-description {
      color: #94a3b8;
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }
    
    .hub-categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }
    
    .hub-category {
      background: rgba(17, 24, 39, 0.4);
      border-radius: 8px;
      padding: 1.25rem 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }
    
    .hub-category:hover {
      background: rgba(31, 41, 55, 0.5);
      transform: translateY(-3px);
    }
    
    .category-icon {
      font-size: 1.75rem;
      color: #10b981;
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(16, 185, 129, 0.1);
      border-radius: 50%;
    }
    
    .category-label {
      color: #e2e8f0;
      font-weight: 500;
      font-size: 0.95rem;
    }
    
    .hub-content {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .content-header {
      margin-bottom: 1.5rem;
    }
    
    .content-header h3 {
      color: #10b981;
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }
    
    .content-header p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .fitness-categories, .nutrition-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    
    .fitness-category, .nutrition-category {
      background: rgba(17, 24, 39, 0.4);
      color: #e2e8f0;
      padding: 0.6rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
    }
    
    .fitness-category:hover, .nutrition-category:hover {
      background: rgba(31, 41, 55, 0.5);
    }
    
    .fitness-category.active, .nutrition-category.active {
      background: rgba(16, 185, 129, 0.2);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #10b981;
    }
    
    .fitness-content, .nutrition-content {
      background: rgba(17, 24, 39, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }
    
    .fitness-category-header, .nutrition-category-header {
      margin-bottom: 1rem;
    }
    
    .fitness-category-header h4, .nutrition-category-header h4 {
      color: #10b981;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
    
    .fitness-category-header p, .nutrition-category-header p {
      color: #94a3b8;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    .benefit-list, .source-list, .factor-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    
    .benefit-tag, .source-tag, .factor-tag {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.85rem;
    }
    
    .fitness-activities {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .activity-card {
      background: rgba(17, 24, 39, 0.4);
      border-radius: 8px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .activity-name {
      color: #e2e8f0;
      font-size: 1.1rem;
      font-weight: 500;
    }
    
    .activity-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .activity-detail {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .detail-label {
      color: #94a3b8;
      font-size: 0.85rem;
      min-width: 85px;
    }
    
    .detail-value {
      color: #e2e8f0;
      font-size: 0.85rem;
    }
    
    .nutrition-component {
      margin-bottom: 1.25rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid rgba(75, 85, 99, 0.3);
    }
    
    .nutrition-component:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
    
    .component-name {
      color: #10b981;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .component-description {
      color: #e2e8f0;
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }
    
    .component-recommendation {
      background: rgba(16, 185, 129, 0.1);
      color: #e2e8f0;
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .component-sources {
      margin-top: 1rem;
    }
    
    .source-heading {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .source-item {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 4px;
      transition: all 0.2s ease;
    }
    
    .source-item:hover {
      background: rgba(31, 41, 55, 0.5);
    }
    
    .source-name {
      color: #e2e8f0;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .source-notes {
      color: #94a3b8;
      font-size: 0.85rem;
      font-style: italic;
    }
    
    .planner-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-section {
      background: rgba(17, 24, 39, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
    }
    
    .form-section h4 {
      color: #10b981;
      font-size: 1.05rem;
      margin-bottom: 1rem;
    }
    
    .form-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .form-row:last-child {
      margin-bottom: 0;
    }
    
    .form-group {
      flex: 1;
      min-width: 200px;
    }
    
    .form-group label {
      display: block;
      color: #e2e8f0;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .form-group select {
      width: 100%;
      padding: 0.6rem;
      background: rgba(31, 41, 55, 0.6);
      border: 1px solid rgba(75, 85, 99, 0.4);
      border-radius: 6px;
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    .goals-grid, .preference-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
    }
    
    .goal-option, .activity-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .goal-option input[type="checkbox"], .activity-option input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
    
    .goal-option label, .activity-option label {
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    .preference-item {
      margin-bottom: 1rem;
    }
    
    .preference-header {
      color: #10b981;
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
    }
    
    .preference-options {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }
    
    .planner-actions {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }
    
    #generate-plan-btn {
      background: #10b981;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    #generate-plan-btn:hover {
      background: #059669;
      transform: translateY(-2px);
    }
    
    .tracker-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(75, 85, 99, 0.3);
      padding-bottom: 0.5rem;
    }
    
    .tracker-tab {
      padding: 0.6rem 1.2rem;
      cursor: pointer;
      color: #94a3b8;
      border-radius: 6px 6px 0 0;
      transition: all 0.2s ease;
    }
    
    .tracker-tab:hover {
      color: #e2e8f0;
      background: rgba(31, 41, 55, 0.5);
    }
    
    .tracker-tab.active {
      color: #10b981;
      border-bottom: 2px solid #10b981;
    }
    
    .tracker-content {
      min-height: 200px;
    }
    
    .tracker-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      color: #94a3b8;
    }
    
    .tracker-placeholder i {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
    
    .tracker-placeholder p {
      font-size: 0.95rem;
      max-width: 500px;
      margin-bottom: 0.5rem;
    }
    
    .tracker-note {
      font-size: 0.85rem !important;
      opacity: 0.7;
    }
    
    .quick-question {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
    }
    
    .question-header h3 {
      color: #e2e8f0;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      text-align: center;
    }
    
    .common-questions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
    }
    
    .question-tag {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .question-tag:hover {
      background: rgba(16, 185, 129, 0.2);
      transform: translateY(-2px);
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Current state for this mode
  currentState: {
    activeHub: 'fitness',
    activeFitnessCategory: 'cardio',
    activeNutritionCategory: 'macronutrients',
    activeTrackerTab: 'activity',
    plannedWorkout: null,
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Health & Fitness Mode');
    
    // Add the mode's CSS to the document
    this.addStyles();
    
    // If the mode's special interface container exists, render the interface
    const modeContainer = document.getElementById('modeSpecificUI');
    if (modeContainer) {
      this.renderUI(modeContainer);
    }
    
    // If the chat input exists, set a default message placeholder
    const chatInput = document.getElementById('messageInput');
    if (chatInput) {
      chatInput.placeholder = "Ask about health, fitness, or nutrition...";
    }
    
    return this;
  },
  
  // Add the mode's CSS to the document
  addStyles: function() {
    const styleElement = document.createElement('style');
    styleElement.textContent = this.styles;
    document.head.appendChild(styleElement);
  },
  
  // Render the mode's UI
  renderUI: function(container) {
    // Insert the HTML template
    container.innerHTML = this.template;
    
    // Add event listeners
    this.addEventListeners(container);
    
    // Initialize with fitness category (cardio) details
    this.showFitnessCategory(container, 'cardio');
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Hub category buttons
    const hubCategories = container.querySelectorAll('.hub-category');
    hubCategories.forEach(category => {
      category.addEventListener('click', () => {
        const categoryId = category.dataset.category;
        this.switchHubContent(container, categoryId);
      });
    });
    
    // Fitness category buttons
    const fitnessCategories = container.querySelectorAll('.fitness-category');
    fitnessCategories.forEach(category => {
      category.addEventListener('click', () => {
        // Update active state
        fitnessCategories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
        
        // Show category content
        const categoryType = category.dataset.type;
        this.showFitnessCategory(container, categoryType);
      });
    });
    
    // Nutrition category buttons
    const nutritionCategories = container.querySelectorAll('.nutrition-category');
    nutritionCategories.forEach(category => {
      category.addEventListener('click', () => {
        // Update active state
        nutritionCategories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
        
        // Show category content
        const categoryType = category.dataset.type;
        this.showNutritionCategory(container, categoryType);
      });
    });
    
    // Tracker tabs
    const trackerTabs = container.querySelectorAll('.tracker-tab');
    trackerTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active state
        trackerTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show tab content
        const trackerType = tab.dataset.tracker;
        this.currentState.activeTrackerTab = trackerType;
        // In a real implementation, we would show the tracker content here
      });
    });
    
    // Generate Plan button
    const generatePlanBtn = container.querySelector('#generate-plan-btn');
    if (generatePlanBtn) {
      generatePlanBtn.addEventListener('click', () => {
        this.generateWellnessPlan(container);
      });
    }
    
    // Quick question tags
    const questionTags = container.querySelectorAll('.question-tag');
    questionTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const question = tag.dataset.question;
        this.askQuestion(question);
      });
    });
  },
  
  // Switch between hub content sections
  switchHubContent: function(container, categoryId) {
    // Hide all content sections
    const contentSections = container.querySelectorAll('.hub-content');
    contentSections.forEach(section => {
      section.classList.add('hidden');
    });
    
    // Show the selected content
    const selectedContent = container.querySelector(`#${categoryId}-content`);
    if (selectedContent) {
      selectedContent.classList.remove('hidden');
    }
    
    // Update current state
    this.currentState.activeHub = categoryId;
    
    // If switching to nutrition and no content has been loaded yet, load it
    if (categoryId === 'nutrition' && !this.currentState.nutritionLoaded) {
      this.showNutritionCategory(container, 'macronutrients');
      this.currentState.nutritionLoaded = true;
    }
  },
  
  // Show fitness category details
  showFitnessCategory: function(container, categoryType) {
    // Update current state
    this.currentState.activeFitnessCategory = categoryType;
    
    // Find the category from our data
    const category = this.fitnessCategories.find(cat => cat.id === categoryType);
    if (!category) return;
    
    // Display category details
    const detailsContainer = container.querySelector('#fitness-details');
    if (detailsContainer) {
      detailsContainer.innerHTML = `
        <div class="fitness-category-header">
          <h4>${category.name} Training</h4>
          <p>${category.description}</p>
        </div>
        <div class="benefit-list">
          ${category.benefits.map(benefit => `
            <div class="benefit-tag">${benefit}</div>
          `).join('')}
        </div>
      `;
    }
    
    // Display activities for this category
    const activitiesContainer = container.querySelector('#activities-list');
    if (activitiesContainer) {
      activitiesContainer.innerHTML = '';
      
      category.activities.forEach(activity => {
        const activityCard = document.createElement('div');
        activityCard.className = 'activity-card';
        
        activityCard.innerHTML = `
          <div class="activity-name">${activity.name}</div>
          <div class="activity-details">
            <div class="activity-detail">
              <span class="detail-label">Intensity:</span>
              <span class="detail-value">${activity.intensity}</span>
            </div>
            <div class="activity-detail">
              <span class="detail-label">Equipment:</span>
              <span class="detail-value">${activity.equipment}</span>
            </div>
            <div class="activity-detail">
              <span class="detail-label">Beginner:</span>
              <span class="detail-value">${activity.beginner}</span>
            </div>
            <div class="activity-detail">
              <span class="detail-label">Intermediate:</span>
              <span class="detail-value">${activity.intermediate}</span>
            </div>
            <div class="activity-detail">
              <span class="detail-label">Advanced:</span>
              <span class="detail-value">${activity.advanced}</span>
            </div>
          </div>
        `;
        
        activitiesContainer.appendChild(activityCard);
      });
    }
  },
  
  // Show nutrition category details
  showNutritionCategory: function(container, categoryType) {
    // Update current state
    this.currentState.activeNutritionCategory = categoryType;
    
    // Find the category from our data
    const category = this.nutritionCategories.find(cat => cat.id === categoryType);
    if (!category) return;
    
    // Display category details
    const detailsContainer = container.querySelector('#nutrition-details');
    if (detailsContainer) {
      // Clear previous content
      detailsContainer.innerHTML = `
        <div class="nutrition-category-header">
          <h4>${category.name}</h4>
          <p>${category.description}</p>
        </div>
      `;
      
      // Add components based on category type
      if (categoryType === 'macronutrients') {
        category.components.forEach(component => {
          const componentElement = document.createElement('div');
          componentElement.className = 'nutrition-component';
          
          componentElement.innerHTML = `
            <div class="component-name">${component.name}</div>
            <div class="component-description">${component.description}</div>
            <div class="component-recommendation">${component.recommendations}</div>
            <div class="component-sources">
              <div class="source-heading">Common Sources:</div>
              ${component.sources.map(source => `
                <div class="source-item">
                  <div class="source-details">
                    <div class="source-name">${source.name}</div>
                    <div class="source-notes">${source.notes}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
          
          detailsContainer.appendChild(componentElement);
        });
      } else if (categoryType === 'micronutrients') {
        category.components.forEach(component => {
          const componentElement = document.createElement('div');
          componentElement.className = 'nutrition-component';
          
          let htmlContent = `
            <div class="component-name">${component.name}</div>
            <div class="component-description">${component.description}</div>
          `;
          
          if (component.categories) {
            htmlContent += `
              <div class="component-sources">
                <div class="source-heading">Categories:</div>
                ${component.categories.map(cat => `
                  <div class="source-item">
                    <div class="source-details">
                      <div class="source-name">${cat.name}</div>
                      <div class="source-notes">${cat.notes}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `;
          }
          
          if (component.keyExamples) {
            htmlContent += `
              <div class="component-sources">
                <div class="source-heading">Key Examples:</div>
                ${component.keyExamples.map(example => `
                  <div class="source-item">
                    <div class="source-details">
                      <div class="source-name">${example.name}</div>
                      <div class="source-notes">Function: ${example.function}</div>
                      <div class="source-notes">Sources: ${example.sources}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `;
          }
          
          componentElement.innerHTML = htmlContent;
          detailsContainer.appendChild(componentElement);
        });
      } else if (categoryType === 'hydration') {
        // Recommendations section
        const recommendationsElement = document.createElement('div');
        recommendationsElement.className = 'nutrition-component';
        
        recommendationsElement.innerHTML = `
          <div class="component-name">Hydration Recommendations</div>
          <div class="component-description">How much fluid do different people need?</div>
          <div class="component-sources">
            ${category.recommendations.map(rec => `
              <div class="source-item">
                <div class="source-details">
                  <div class="source-name">${rec.population}</div>
                  <div class="source-notes">${rec.amount}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
        
        detailsContainer.appendChild(recommendationsElement);
        
        // Signs section
        const signsElement = document.createElement('div');
        signsElement.className = 'nutrition-component';
        
        signsElement.innerHTML = `
          <div class="component-name">Signs of Hydration Status</div>
          <div class="component-sources">
            <div class="source-heading">Signs of Dehydration:</div>
            <div class="factor-list">
              ${category.signs.dehydration.map(sign => `
                <div class="factor-tag">${sign}</div>
              `).join('')}
            </div>
          </div>
          <div class="component-sources">
            <div class="source-heading">Signs of Good Hydration:</div>
            <div class="factor-list">
              ${category.signs.hydration.map(sign => `
                <div class="factor-tag">${sign}</div>
              `).join('')}
            </div>
          </div>
        `;
        
        detailsContainer.appendChild(signsElement);
        
        // Sources section
        const sourcesElement = document.createElement('div');
        sourcesElement.className = 'nutrition-component';
        
        sourcesElement.innerHTML = `
          <div class="component-name">Hydration Sources</div>
          <div class="component-description">Where can you get fluid from?</div>
          <div class="component-sources">
            ${category.sources.map(source => `
              <div class="source-item">
                <div class="source-details">
                  <div class="source-name">${source.name}</div>
                  <div class="source-notes">${source.notes}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
        
        detailsContainer.appendChild(sourcesElement);
      } else if (categoryType === 'mealTiming') {
        // Approaches section
        category.approaches.forEach(approach => {
          const approachElement = document.createElement('div');
          approachElement.className = 'nutrition-component';
          
          let html = `
            <div class="component-name">${approach.name}</div>
            <div class="component-description">${approach.description}</div>
            <div class="component-recommendation">Benefits: ${approach.benefits}</div>
            <div class="component-description">Example: ${approach.example || ''}</div>
          `;
          
          if (approach.patterns) {
            html += `
              <div class="component-sources">
                <div class="source-heading">Common Patterns:</div>
                <ul>
                  ${approach.patterns.map(pattern => `<li>${pattern}</li>`).join('')}
                </ul>
              </div>
            `;
          }
          
          if (approach.caution) {
            html += `
              <div class="component-recommendation" style="background: rgba(239, 68, 68, 0.1);">
                Note: ${approach.caution}
              </div>
            `;
          }
          
          approachElement.innerHTML = html;
          detailsContainer.appendChild(approachElement);
        });
        
        // Considerations section
        const considerationsElement = document.createElement('div');
        considerationsElement.className = 'nutrition-component';
        
        considerationsElement.innerHTML = `
          <div class="component-name">Important Considerations</div>
          <div class="component-description">Factors that affect meal timing decisions:</div>
          <div class="factor-list">
            ${category.considerations.map(consideration => `
              <div class="factor-tag">${consideration}</div>
            `).join('')}
          </div>
        `;
        
        detailsContainer.appendChild(considerationsElement);
      }
    }
  },
  
  // Generate a wellness plan based on form inputs
  generateWellnessPlan: function(container) {
    // Get form values
    const fitnessLevel = container.querySelector('#fitness-level').value;
    const availableTime = container.querySelector('#available-time').value;
    const daysPerWeek = container.querySelector('#days-per-week').value;
    const equipmentAccess = container.querySelector('#equipment-access').value;
    
    // Get goals
    const goals = [];
    
    if (container.querySelector('#goal-cardio').checked) goals.push('Improve cardiovascular health');
    if (container.querySelector('#goal-strength').checked) goals.push('Build strength and muscle');
    if (container.querySelector('#goal-flexibility').checked) goals.push('Increase flexibility');
    if (container.querySelector('#goal-weight').checked) goals.push('Weight management');
    if (container.querySelector('#goal-energy').checked) goals.push('Boost energy levels');
    if (container.querySelector('#goal-stress').checked) goals.push('Reduce stress');
    
    // Get activity preferences
    const preferences = [];
    
    if (container.querySelector('#prefer-running').checked) preferences.push('Running');
    if (container.querySelector('#prefer-cycling').checked) preferences.push('Cycling');
    if (container.querySelector('#prefer-swimming').checked) preferences.push('Swimming');
    if (container.querySelector('#prefer-walking').checked) preferences.push('Walking');
    if (container.querySelector('#prefer-weights').checked) preferences.push('Weight Training');
    if (container.querySelector('#prefer-bodyweight').checked) preferences.push('Bodyweight Training');
    if (container.querySelector('#prefer-bands').checked) preferences.push('Resistance Bands');
    if (container.querySelector('#prefer-machines').checked) preferences.push('Machine Training');
    if (container.querySelector('#prefer-yoga').checked) preferences.push('Yoga');
    if (container.querySelector('#prefer-pilates').checked) preferences.push('Pilates');
    if (container.querySelector('#prefer-stretching').checked) preferences.push('Stretching Routines');
    if (container.querySelector('#prefer-tai-chi').checked) preferences.push('Tai Chi');
    
    // Build a prompt for the AI
    const prompt = `Please create a personalized wellness plan based on the following information:

Fitness Level: ${fitnessLevel}
Available Time: ${availableTime}
Days Per Week: ${daysPerWeek}
Equipment Access: ${equipmentAccess}

Goals:
${goals.map(goal => `- ${goal}`).join('\n')}

Activity Preferences:
${preferences.map(pref => `- ${pref}`).join('\n')}

Please include:
1. A weekly workout schedule
2. Specific workout recommendations for each day
3. Basic nutritional guidance to support these goals
4. Recovery and lifestyle recommendations`;
    
    // Send prompt to AI
    this.askQuestion(prompt);
  },
  
  // Ask a question in the chat
  askQuestion: function(question) {
    const chatInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
      chatInput.value = question;
      sendButton.click();
    }
  }
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    HealthFitnessMode.init();
  } else {
    window.addEventListener('load', function() {
      HealthFitnessMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HealthFitnessMode;
} else {
  window.HealthFitnessMode = HealthFitnessMode;
}
/**
 * JAAT-AI Mode: Mental Health Support
 * 
 * Supportive mental wellbeing assistant providing evidence-based coping
 * strategies, self-care techniques, and emotional support while maintaining
 * appropriate boundaries.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const MentalHealthSupportMode = {
  id: 'mental-health-support',
  name: 'Mental Health Support',
  icon: 'brain',
  description: 'Supportive resources for mental wellbeing and emotional health.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Mental Health Support mode, a supportive assistant focused on promoting mental wellbeing through evidence-based approaches. Your goal is to provide helpful information, general coping strategies, and emotional support while maintaining clear boundaries regarding formal mental healthcare.

Key characteristics:
1. You provide evidence-based information about mental health topics in accessible language
2. You offer general coping strategies, mindfulness techniques, and self-care approaches
3. You normalize mental health challenges and reduce stigma through supportive language
4. You encourage healthy boundaries, self-compassion, and appropriate self-care
5. You explicitly acknowledge limitations and refer to professional care when appropriate
6. You avoid diagnostic language, treatment recommendations, or crisis counseling
7. You emphasize empowerment and personal agency while validating emotions

Importantly, you consistently remind users that you are not a substitute for professional mental healthcare. For any crisis situations, specific mental health diagnoses, treatment advice, or personalized mental health plans, you direct users to appropriate professional resources. Your role is educational and supportive, not clinical.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "What are some ways to manage everyday stress?",
    "How can I practice self-compassion when I'm feeling down?",
    "What are healthy ways to cope with difficult emotions?",
    "Can you suggest some mindfulness exercises for beginners?",
    "How can I support a friend who's going through a hard time?",
    "What are good sleep hygiene practices?",
    "How can I set healthy boundaries in relationships?",
    "What are grounding techniques for anxiety?",
    "How can I incorporate self-care into a busy schedule?",
    "What's the relationship between physical exercise and mental health?"
  ],
  
  // Wellbeing strategies categories
  wellbeingStrategies: [
    {
      id: 'mindfulness',
      name: 'Mindfulness Practices',
      description: 'Techniques for cultivating present-moment awareness',
      strategies: [
        {
          name: 'Basic Mindful Breathing',
          description: 'A fundamental mindfulness practice focusing on breath awareness',
          steps: [
            'Find a comfortable seated position where you can be alert yet relaxed',
            'Allow your eyes to close gently or maintain a soft gaze',
            'Bring attention to the natural flow of your breath without changing it',
            'Notice the sensations of breathing - air moving through nostrils, chest or abdomen rising and falling',
            'When your mind wanders (which is normal), gently return your attention to your breath',
            'Continue for 5-10 minutes, gradually extending the practice as comfortable'
          ],
          benefits: [
            'Reduces stress and anxiety',
            'Improves focus and attention',
            'Creates a pause between stimulus and response',
            'Builds awareness of thought patterns'
          ]
        },
        {
          name: 'Body Scan Meditation',
          description: 'Systematic practice of bringing attention to different body parts',
          steps: [
            'Lie down or sit in a comfortable position where you won\'t be disturbed',
            'Begin by bringing awareness to your breath for a few moments',
            'Gradually shift attention to your feet, noticing any sensations present',
            'Slowly move attention upward through each part of your body (ankles, calves, knees, etc.)',
            'For each area, simply notice sensations without judgment - warmth, coolness, tension, tingling',
            'If you notice tension, see if you can breathe into that area and allow it to soften',
            'Complete the scan at the top of your head, then rest in awareness of your whole body'
          ],
          benefits: [
            'Promotes relaxation and tension release',
            'Develops body awareness',
            'Can improve sleep quality',
            'Reduces physical manifestations of stress'
          ]
        },
        {
          name: '5-4-3-2-1 Grounding Technique',
          description: 'Quick sensory awareness exercise for anxiety reduction and present-moment focus',
          steps: [
            'Take a deep breath and notice:',
            '5 things you can see around you',
            '4 things you can touch or feel (textures, temperature, etc.)',
            '3 things you can hear',
            '2 things you can smell (or like the smell of)',
            '1 thing you can taste (or like the taste of)',
            'Take another deep breath and notice how you feel'
          ],
          benefits: [
            'Quickly brings awareness to the present moment',
            'Particularly helpful during anxiety or overwhelming thoughts',
            'Can interrupt rumination or worry cycles',
            'Easy to remember and use anywhere'
          ]
        },
        {
          name: 'Mindful Walking',
          description: 'Walking meditation that combines movement with present-moment awareness',
          steps: [
            'Find a quiet space where you can walk slowly (indoors or outdoors)',
            'Stand still and become aware of your body and balance',
            'Begin walking at a slower pace than normal',
            'Pay attention to the sensations of walking - feet touching ground, weight shifting, balance',
            'When your mind wanders, gently return focus to the physical sensations of walking',
            'You can expand awareness to include sounds, sights, or smells around you',
            'Continue for 10-20 minutes'
          ],
          benefits: [
            'Combines physical activity with mindfulness',
            'Accessible alternative to seated meditation',
            'Can be incorporated into daily life',
            'Improves body awareness and coordination'
          ]
        },
        {
          name: 'STOP Practice',
          description: 'Brief mindfulness exercise for stressful moments',
          steps: [
            'S - Stop what you\'re doing momentarily',
            'T - Take a breath, focusing on the sensation of breathing',
            'O - Observe what\'s happening in your thoughts, emotions, and body',
            'P - Proceed with awareness of what would serve you best right now'
          ],
          benefits: [
            'Creates a mindful pause during stressful situations',
            'Prevents automatic or reactive responses',
            'Builds self-awareness around triggers',
            'Can be done in just 30 seconds to 1 minute'
          ]
        }
      ]
    },
    {
      id: 'cognitiveStrategies',
      name: 'Cognitive Strategies',
      description: 'Approaches for working with thoughts and thinking patterns',
      strategies: [
        {
          name: 'Thought Challenging',
          description: 'Examining and questioning unhelpful thought patterns',
          steps: [
            'Notice and write down difficult or distressing thoughts',
            'Identify any thinking patterns or cognitive distortions (e.g., all-or-nothing thinking, catastrophizing)',
            'Question the evidence for and against the thought',
            'Consider alternative perspectives or interpretations',
            'Develop a more balanced or helpful thought'
          ],
          benefits: [
            'Reduces emotional distress from unhelpful thoughts',
            'Builds awareness of thinking patterns',
            'Develops more flexible thinking',
            'Creates space between thoughts and reality'
          ]
        },
        {
          name: 'Positive Reframing',
          description: 'Finding alternative, more helpful perspectives on situations',
          steps: [
            'Identify a situation that feels challenging or negative',
            'Acknowledge your current feelings about it',
            'Ask: "What possible good could come from this?"',
            'Consider: "What strengths might I develop through this?"',
            'Reflect: "How might I view this situation 5 years from now?"',
            'Find a perspective that feels both hopeful and truthful'
          ],
          benefits: [
            'Reduces negative emotional reactions',
            'Develops psychological flexibility',
            'Can find meaning in difficult situations',
            'Improves resilience'
          ]
        },
        {
          name: 'Worry Time',
          description: 'Scheduled time for addressing worries to reduce their impact',
          steps: [
            'Schedule a specific 15-30 minute "worry time" each day',
            'When worries arise outside this time, note them down and postpone them',
            'Remind yourself you will address them during your designated worry time',
            'During worry time, go through your list and spend time problem-solving',
            'For worries you can\'t solve, practice acceptance techniques',
            'When worry time ends, engage in a transition activity'
          ],
          benefits: [
            'Contains worry to a specific time rather than all day',
            'Reduces rumination and mental exhaustion',
            'Separates productive problem-solving from unproductive worrying',
            'Creates mental space for other activities'
          ]
        },
        {
          name: 'RAIN for Difficult Emotions',
          description: 'Four-step process for working with challenging emotions',
          steps: [
            'R - Recognize what\'s happening emotionally',
            'A - Allow the experience to be there without trying to change it',
            'I - Investigate with interest and care how it feels in your body',
            'N - Nurture yourself with understanding and compassion'
          ],
          benefits: [
            'Builds emotional awareness and regulation',
            'Reduces avoidance of difficult feelings',
            'Cultivates self-compassion',
            'Creates a healthier relationship with emotions'
          ]
        },
        {
          name: 'Values Clarification',
          description: 'Identifying what matters most to guide meaningful action',
          steps: [
            'Reflect on what matters most to you in different life domains (relationships, work, personal growth, etc.)',
            'Consider how you want to behave rather than just outcomes you want',
            'Write these values down as guiding principles',
            'Identify small actions aligned with these values',
            'Use values as a compass when making decisions'
          ],
          benefits: [
            'Creates sense of meaning and purpose',
            'Helps make choices aligned with what matters most',
            'Reduces feeling lost or directionless',
            'Provides motivation beyond temporary emotions'
          ]
        }
      ]
    },
    {
      id: 'lifestylePractices',
      name: 'Lifestyle Practices',
      description: 'Daily habits and routines that support mental wellbeing',
      strategies: [
        {
          name: 'Sleep Hygiene',
          description: 'Practices that promote quality sleep',
          steps: [
            'Maintain a consistent sleep schedule, even on weekends',
            'Create a relaxing bedtime routine (30-60 minutes before sleep)',
            'Make your bedroom comfortable, dark, quiet, and cool',
            'Limit exposure to screens and blue light 1-2 hours before bed',
            'Avoid caffeine, large meals, and alcohol close to bedtime',
            'Get regular physical activity, but not right before bed',
            'If you can\'t sleep after 20 minutes, get up and do something relaxing'
          ],
          benefits: [
            'Improves mood and emotional regulation',
            'Enhances cognitive function and decision-making',
            'Reduces stress and anxiety',
            'Supports physical health and immune function'
          ]
        },
        {
          name: 'Regular Physical Movement',
          description: 'Incorporating regular movement into daily life',
          steps: [
            'Find activities you enjoy rather than focusing on "exercise"',
            'Start small with 5-10 minutes daily',
            'Incorporate movement throughout the day (walking meetings, stretch breaks)',
            'Set realistic, specific goals (e.g., "walk 15 minutes after lunch")',
            'Focus on how movement makes you feel rather than just physical appearance',
            'Create environmental cues to remind you to move',
            'Celebrate consistency over intensity'
          ],
          benefits: [
            'Releases endorphins and improves mood',
            'Reduces symptoms of anxiety and depression',
            'Improves sleep quality',
            'Increases energy and reduces fatigue'
          ]
        },
        {
          name: 'Nutrition for Mental Wellbeing',
          description: 'Eating patterns that support brain health and mood',
          steps: [
            'Prioritize regular meals to maintain stable blood sugar',
            'Include protein, healthy fats, and fiber in meals',
            'Incorporate omega-3 rich foods like fatty fish, walnuts, and flaxseeds',
            'Add colorful fruits and vegetables for antioxidants',
            'Stay adequately hydrated throughout the day',
            'Limit processed foods, excess sugar, and alcohol',
            'Pay attention to how different foods affect your mood and energy'
          ],
          benefits: [
            'Provides nutrients necessary for brain function',
            'Helps regulate mood and energy levels',
            'Supports gut health which impacts mental health',
            'Reduces inflammation associated with depression'
          ]
        },
        {
          name: 'Nature Connection',
          description: 'Regularly spending time in natural environments',
          steps: [
            'Spend at least 20-30 minutes in nature several times weekly',
            'Engage multiple senses (notice sights, sounds, smells, textures)',
            'Incorporate plants or natural elements into your indoor environment',
            'Take breaks to look at natural views, even through windows',
            'Practice "awe walks" where you intentionally notice wonder in nature',
            'Consider outdoor activities like gardening, hiking, or simply sitting outside'
          ],
          benefits: [
            'Reduces stress hormones and rumination',
            'Improves mood and feelings of vitality',
            'Restores attention and cognitive function',
            'Promotes mindfulness and present-moment awareness'
          ]
        },
        {
          name: 'Social Connection',
          description: 'Maintaining meaningful relationships and social support',
          steps: [
            'Identify key relationships that feel supportive and nurturing',
            'Schedule regular check-ins with important people',
            'Be intentional about depth over breadth in relationships',
            'Practice active listening and authentic self-disclosure',
            'Join groups based on shared interests or values',
            'Balance social time with alone time based on your needs',
            'Reach out when you need support rather than withdrawing'
          ],
          benefits: [
            'Provides emotional support during difficult times',
            'Creates sense of belonging and reduces isolation',
            'Offers perspective and guidance',
            'Associated with better physical and mental health outcomes'
          ]
        }
      ]
    },
    {
      id: 'emotionalRegulation',
      name: 'Emotional Regulation',
      description: 'Skills for working with and managing intense emotions',
      strategies: [
        {
          name: 'Box Breathing',
          description: 'Structured breathing pattern to calm the nervous system',
          steps: [
            'Find a comfortable position and focus your attention',
            'Inhale slowly through your nose for a count of 4',
            'Hold your breath for a count of 4',
            'Exhale slowly through your mouth for a count of 4',
            'Hold the empty breath for a count of 4',
            'Repeat for 4-5 minutes or until you feel calmer'
          ],
          benefits: [
            'Activates the parasympathetic nervous system',
            'Reduces physical symptoms of stress and anxiety',
            'Provides a focus point during emotional overwhelm',
            'Can be done discreetly in most situations'
          ]
        },
        {
          name: 'Self-Compassion Break',
          description: 'Brief practice for meeting difficulty with kindness',
          steps: [
            'Notice when you are experiencing struggle or suffering',
            'Acknowledge "This is a moment of suffering" or "This is hard"',
            'Recognize "Suffering is a part of life" or "I am not alone in this feeling"',
            'Place a hand on your heart and offer yourself kindness: "May I be kind to myself"',
            'Add personal phrases that feel supportive: "May I give myself the compassion I need"'
          ],
          benefits: [
            'Reduces self-criticism and shame',
            'Creates emotional resilience',
            'Provides self-support during difficult times',
            'Cultivates a kinder relationship with yourself'
          ]
        },
        {
          name: 'TIPP Skills for Intense Emotions',
          description: 'Physical strategies to quickly reduce emotional intensity',
          steps: [
            'T - Temperature change: Splash cold water on face or hold ice to reset nervous system',
            'I - Intense exercise: Brief burst of physical activity (jumping jacks, brisk walk, etc.)',
            'P - Paced breathing: Slow your breathing, making exhales longer than inhales',
            'P - Progressive muscle relaxation: Tense and release muscle groups sequentially'
          ],
          benefits: [
            'Rapidly reduces intensity of overwhelming emotions',
            'Helps regain control during emotional crisis',
            'Engages physiological mechanisms that calm the body',
            'Creates space between emotional triggers and responses'
          ]
        },
        {
          name: 'Emotional Labeling',
          description: 'Identifying and naming emotions with specificity',
          steps: [
            'Pause and notice the emotion you\'re experiencing',
            'Name the emotion specifically (beyond just "good" or "bad")',
            'Notice where and how you feel it in your body',
            'Accept the presence of the emotion without judgment',
            'Use phrases like "I notice I\'m feeling..." or "There\'s anger here"'
          ],
          benefits: [
            'Activates the prefrontal cortex and reduces amygdala activity',
            'Creates psychological distance from overwhelming emotions',
            'Improves emotional awareness and vocabulary',
            'Reduces tendency to act impulsively on emotions'
          ]
        },
        {
          name: 'Opposite Action',
          description: 'Acting opposite to emotional urges when emotions don\'t fit the situation',
          steps: [
            'Identify the emotion you\'re feeling',
            'Notice the action urge that comes with the emotion',
            'Determine if acting on the emotion is helpful in this situation',
            'If unhelpful, identify the opposite action',
            'Fully commit to the opposite action (including posture, facial expression, tone)',
            'Repeat until the emotional intensity decreases'
          ],
          benefits: [
            'Interrupts unhelpful emotional cycles',
            'Creates new behavioral responses to emotional triggers',
            'Provides a sense of control and agency',
            'Can shift the emotional experience itself over time'
          ]
        }
      ]
    }
  ],
  
  // Mental health resources by country
  globalResources: [
    {
      id: 'us',
      country: 'United States',
      general: [
        { name: 'National Alliance on Mental Illness (NAMI)', contact: '1-800-950-NAMI (6264)', website: 'https://www.nami.org' },
        { name: 'Mental Health America', contact: '1-800-273-TALK (8255)', website: 'https://www.mhanational.org' },
        { name: 'National Institute of Mental Health', website: 'https://www.nimh.nih.gov' }
      ],
      crisis: [
        { name: 'National Suicide Prevention Lifeline', contact: '988 or 1-800-273-8255', website: 'https://suicidepreventionlifeline.org' },
        { name: 'Crisis Text Line', contact: 'Text HOME to 741741', website: 'https://www.crisistextline.org' }
      ]
    },
    {
      id: 'uk',
      country: 'United Kingdom',
      general: [
        { name: 'Mind', contact: '0300 123 3393', website: 'https://www.mind.org.uk' },
        { name: 'Rethink Mental Illness', contact: '0808 801 0525', website: 'https://www.rethink.org' },
        { name: 'NHS Mental Health Services', website: 'https://www.nhs.uk/mental-health/' }
      ],
      crisis: [
        { name: 'Samaritans', contact: '116 123', website: 'https://www.samaritans.org' },
        { name: 'Shout Crisis Text Line', contact: 'Text SHOUT to 85258', website: 'https://giveusashout.org' }
      ]
    },
    {
      id: 'canada',
      country: 'Canada',
      general: [
        { name: 'Canadian Mental Health Association', website: 'https://cmha.ca' },
        { name: 'Centre for Addiction and Mental Health', website: 'https://www.camh.ca' }
      ],
      crisis: [
        { name: 'Canada Suicide Prevention Service', contact: '1-833-456-4566', website: 'https://www.crisisservicescanada.ca' },
        { name: 'Kids Help Phone (for youth)', contact: '1-800-668-6868', website: 'https://kidshelpphone.ca' }
      ]
    },
    {
      id: 'australia',
      country: 'Australia',
      general: [
        { name: 'Beyond Blue', contact: '1300 22 4636', website: 'https://www.beyondblue.org.au' },
        { name: 'Black Dog Institute', website: 'https://www.blackdoginstitute.org.au' },
        { name: 'SANE Australia', contact: '1800 18 7263', website: 'https://www.sane.org' }
      ],
      crisis: [
        { name: 'Lifeline Australia', contact: '13 11 14', website: 'https://www.lifeline.org.au' },
        { name: 'Kids Helpline', contact: '1800 55 1800', website: 'https://kidshelpline.com.au' }
      ]
    },
    {
      id: 'global',
      country: 'International Resources',
      general: [
        { name: 'International Association for Suicide Prevention', website: 'https://www.iasp.info/resources/Crisis_Centres/' },
        { name: 'World Health Organization - Mental Health', website: 'https://www.who.int/health-topics/mental-health' },
        { name: 'United for Global Mental Health', website: 'https://unitedgmh.org' }
      ],
      crisis: [
        { name: 'Befrienders Worldwide', website: 'https://www.befrienders.org' },
        { name: 'International Association for Suicide Prevention - Find Crisis Centers', website: 'https://www.iasp.info/resources/Crisis_Centres/' }
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="mental-health-interface">
      <div class="mh-header">
        <div class="mh-icon">
          <i class="fas fa-brain"></i>
        </div>
        <div class="mh-title">
          <h2>Mental Health Support</h2>
          <p>Resources and strategies to support your mental wellbeing</p>
        </div>
      </div>
      
      <div class="mh-disclaimer">
        <i class="fas fa-info-circle"></i>
        <div class="disclaimer-content">
          <p><strong>Important:</strong> JAAT-AI is not a mental health professional and cannot provide diagnosis, treatment, or crisis support. If you're experiencing a mental health crisis or need immediate help, please contact emergency services or a mental health crisis line. The information provided is educational only.</p>
        </div>
      </div>
      
      <div class="wellbeing-strategies">
        <div class="strategies-header">
          <h3>Wellbeing Strategies</h3>
          <p>Evidence-based approaches for supporting mental wellbeing</p>
        </div>
        
        <div class="strategies-categories">
          <button class="category-btn active" data-category="mindfulness">
            <i class="fas fa-spa"></i>
            <span>Mindfulness</span>
          </button>
          <button class="category-btn" data-category="cognitiveStrategies">
            <i class="fas fa-brain"></i>
            <span>Cognitive</span>
          </button>
          <button class="category-btn" data-category="lifestylePractices">
            <i class="fas fa-seedling"></i>
            <span>Lifestyle</span>
          </button>
          <button class="category-btn" data-category="emotionalRegulation">
            <i class="fas fa-heart"></i>
            <span>Emotional</span>
          </button>
        </div>
        
        <div class="strategies-content" id="strategies-container">
          <!-- Will be populated with strategies based on selected category -->
        </div>
      </div>
      
      <div class="help-resources">
        <div class="resources-header">
          <h3>Mental Health Resources</h3>
          <p>Professional services and support options</p>
        </div>
        
        <div class="resources-note">
          <i class="fas fa-hand-holding-heart"></i>
          <p>If you're experiencing significant distress or mental health difficulties, the resources below can help you find appropriate professional support.</p>
        </div>
        
        <div class="country-selector">
          <label for="country-select">Select your country/region:</label>
          <select id="country-select">
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="canada">Canada</option>
            <option value="australia">Australia</option>
            <option value="global">Other Regions / Global Resources</option>
          </select>
        </div>
        
        <div class="resources-container" id="resources-container">
          <!-- Will be populated with resources based on selected country -->
        </div>
      </div>
      
      <div class="wellness-checkup">
        <div class="checkup-header">
          <h3>Simple Self-Check Questions</h3>
          <p>Brief reflections to check in with yourself (private, not stored)</p>
        </div>
        
        <div class="checkup-note">
          <i class="fas fa-lock"></i>
          <p>These questions are for personal reflection only. Your answers are not stored or analyzed.</p>
        </div>
        
        <div class="checkup-questions">
          <div class="checkup-question">
            <p>How has your sleep been over the past week?</p>
            <div class="slider-container">
              <input type="range" min="1" max="5" value="3" class="range-slider">
              <div class="slider-labels">
                <span>Difficult</span>
                <span>Moderate</span>
                <span>Restful</span>
              </div>
            </div>
          </div>
          
          <div class="checkup-question">
            <p>How would you rate your overall stress level currently?</p>
            <div class="slider-container">
              <input type="range" min="1" max="5" value="3" class="range-slider">
              <div class="slider-labels">
                <span>Very High</span>
                <span>Moderate</span>
                <span>Very Low</span>
              </div>
            </div>
          </div>
          
          <div class="checkup-question">
            <p>How connected have you felt to others recently?</p>
            <div class="slider-container">
              <input type="range" min="1" max="5" value="3" class="range-slider">
              <div class="slider-labels">
                <span>Isolated</span>
                <span>Somewhat</span>
                <span>Very Connected</span>
              </div>
            </div>
          </div>
          
          <div class="checkup-question">
            <p>How easy has it been to find enjoyment in activities lately?</p>
            <div class="slider-container">
              <input type="range" min="1" max="5" value="3" class="range-slider">
              <div class="slider-labels">
                <span>Very Difficult</span>
                <span>Moderate</span>
                <span>Very Easy</span>
              </div>
            </div>
          </div>
          
          <div class="checkup-question">
            <p>How would you describe your energy levels this week?</p>
            <div class="slider-container">
              <input type="range" min="1" max="5" value="3" class="range-slider">
              <div class="slider-labels">
                <span>Very Low</span>
                <span>Moderate</span>
                <span>Very High</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="checkup-reflection">
          <p>Remember, these questions are just for your own awareness. If you notice several areas of concern, consider reaching out to a supportive person or professional. Self-awareness is an important first step in taking care of your mental health.</p>
        </div>
      </div>
      
      <div class="quick-support">
        <div class="support-header">
          <h3>Quick Support Topics</h3>
        </div>
        
        <div class="support-topics">
          <div class="topic-tag" data-topic="stress">Managing Stress</div>
          <div class="topic-tag" data-topic="anxiety">Anxiety Relief</div>
          <div class="topic-tag" data-topic="mood">Improving Mood</div>
          <div class="topic-tag" data-topic="sleep">Better Sleep</div>
          <div class="topic-tag" data-topic="selfcare">Self-Care Basics</div>
          <div class="topic-tag" data-topic="relationships">Healthy Relationships</div>
          <div class="topic-tag" data-topic="grief">Coping with Loss</div>
          <div class="topic-tag" data-topic="boundaries">Setting Boundaries</div>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .mental-health-interface {
      background: linear-gradient(to bottom right, rgba(124, 58, 237, 0.1), rgba(139, 92, 246, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(124, 58, 237, 0.2);
    }
    
    .mh-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .mh-icon {
      font-size: 2.5rem;
      color: #8b5cf6;
      margin-right: 1rem;
    }
    
    .mh-title h2 {
      color: #8b5cf6;
      margin-bottom: 0.3rem;
    }
    
    .mh-title p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .mh-disclaimer {
      background: rgba(239, 68, 68, 0.1);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    
    .mh-disclaimer i {
      color: #ef4444;
      font-size: 1.25rem;
      margin-top: 0.2rem;
    }
    
    .disclaimer-content p {
      color: #e2e8f0;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    .wellbeing-strategies {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .strategies-header, .resources-header, .checkup-header, .support-header {
      margin-bottom: 1rem;
    }
    
    .strategies-header h3, .resources-header h3, .checkup-header h3, .support-header h3 {
      color: #e2e8f0;
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }
    
    .strategies-header p, .resources-header p, .checkup-header p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .strategies-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(51, 65, 85, 0.5);
      padding-bottom: 1rem;
    }
    
    .category-btn {
      background: rgba(15, 23, 42, 0.4);
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1rem;
      color: #e2e8f0;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .category-btn:hover {
      background: rgba(51, 65, 85, 0.5);
    }
    
    .category-btn.active {
      background: rgba(124, 58, 237, 0.2);
      color: #a78bfa;
    }
    
    .strategies-content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .strategy-card {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 8px;
      padding: 1.25rem;
      transition: all 0.2s ease;
    }
    
    .strategy-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .strategy-name {
      color: #a78bfa;
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .strategy-description {
      color: #e2e8f0;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .strategy-steps {
      margin-bottom: 1rem;
    }
    
    .steps-header {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .steps-list {
      list-style-type: none;
      padding-left: 0;
    }
    
    .steps-list li {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
      padding-left: 1.5rem;
      position: relative;
    }
    
    .steps-list li:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #a78bfa;
    }
    
    .benefits-header {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .benefits-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .benefit-tag {
      background: rgba(124, 58, 237, 0.1);
      color: #a78bfa;
      font-size: 0.8rem;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
    }
    
    .help-resources {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .resources-note {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .resources-note i {
      color: #a78bfa;
      font-size: 1.25rem;
    }
    
    .resources-note p {
      color: #e2e8f0;
      font-size: 0.95rem;
      margin: 0;
    }
    
    .country-selector {
      margin-bottom: 1.5rem;
    }
    
    .country-selector label {
      color: #e2e8f0;
      font-size: 0.95rem;
      margin-bottom: 0.5rem;
      display: block;
    }
    
    .country-selector select {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(51, 65, 85, 0.5);
      border-radius: 6px;
      padding: 0.6rem 1rem;
      color: #e2e8f0;
      font-size: 0.95rem;
      width: 100%;
      max-width: 400px;
    }
    
    .resources-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .resource-section {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 8px;
      padding: 1.25rem;
    }
    
    .resource-section-header {
      color: #a78bfa;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }
    
    .resource-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .resource-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    
    .resource-name {
      color: #e2e8f0;
      font-weight: 500;
      font-size: 0.95rem;
    }
    
    .resource-contact {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .resource-website {
      color: #a78bfa;
      font-size: 0.9rem;
    }
    
    .resource-website:hover {
      text-decoration: underline;
    }
    
    .wellness-checkup {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .checkup-note {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 6px;
      padding: 0.75rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .checkup-note i {
      color: #a78bfa;
    }
    
    .checkup-note p {
      color: #e2e8f0;
      font-size: 0.9rem;
      margin: 0;
    }
    
    .checkup-questions {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .checkup-question p {
      color: #e2e8f0;
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
    }
    
    .slider-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0 0.5rem;
    }
    
    .range-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 6px;
      background: rgba(51, 65, 85, 0.7);
      border-radius: 3px;
      outline: none;
    }
    
    .range-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #a78bfa;
      cursor: pointer;
    }
    
    .range-slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #a78bfa;
      cursor: pointer;
      border: none;
    }
    
    .slider-labels {
      display: flex;
      justify-content: space-between;
    }
    
    .slider-labels span {
      color: #94a3b8;
      font-size: 0.8rem;
    }
    
    .checkup-reflection {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 6px;
      padding: 1rem;
      color: #cbd5e1;
      font-size: 0.9rem;
      line-height: 1.5;
      font-style: italic;
    }
    
    .quick-support {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
    }
    
    .support-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    
    .topic-tag {
      background: rgba(124, 58, 237, 0.15);
      color: #a78bfa;
      padding: 0.6rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .topic-tag:hover {
      background: rgba(124, 58, 237, 0.25);
      transform: translateY(-2px);
    }
  `,
  
  // Current state
  currentState: {
    activeCategory: 'mindfulness',
    selectedCountry: 'us'
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Mental Health Support Mode');
    
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
      chatInput.placeholder = "Ask about mental wellbeing strategies or resources...";
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
    
    // Load initial content
    this.showStrategies(container, 'mindfulness');
    this.showResources(container, 'us');
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Strategy category buttons
    const categoryButtons = container.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show corresponding strategies
        const category = button.dataset.category;
        this.showStrategies(container, category);
      });
    });
    
    // Country selector
    const countrySelect = container.querySelector('#country-select');
    if (countrySelect) {
      countrySelect.addEventListener('change', (e) => {
        const country = e.target.value;
        this.showResources(container, country);
      });
    }
    
    // Quick support topic tags
    const topicTags = container.querySelectorAll('.topic-tag');
    topicTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const topic = tag.dataset.topic;
        this.askAboutTopic(topic);
      });
    });
  },
  
  // Show strategies for a specific category
  showStrategies: function(container, category) {
    // Update current state
    this.currentState.activeCategory = category;
    
    // Get strategies container
    const strategiesContainer = container.querySelector('#strategies-container');
    if (!strategiesContainer) return;
    
    // Clear current content
    strategiesContainer.innerHTML = '';
    
    // Find the category in our data
    const categoryData = this.wellbeingStrategies.find(cat => cat.id === category);
    if (!categoryData) return;
    
    // Add each strategy as a card
    categoryData.strategies.forEach(strategy => {
      const strategyCard = document.createElement('div');
      strategyCard.className = 'strategy-card';
      
      // Build steps list HTML
      let stepsHtml = '';
      if (strategy.steps && strategy.steps.length) {
        stepsHtml = `
          <div class="strategy-steps">
            <div class="steps-header">How to Practice:</div>
            <ul class="steps-list">
              ${strategy.steps.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>
        `;
      }
      
      // Build benefits HTML
      let benefitsHtml = '';
      if (strategy.benefits && strategy.benefits.length) {
        benefitsHtml = `
          <div class="strategy-benefits">
            <div class="benefits-header">Potential Benefits:</div>
            <div class="benefits-list">
              ${strategy.benefits.map(benefit => `<div class="benefit-tag">${benefit}</div>`).join('')}
            </div>
          </div>
        `;
      }
      
      // Set card content
      strategyCard.innerHTML = `
        <div class="strategy-name">${strategy.name}</div>
        <div class="strategy-description">${strategy.description}</div>
        ${stepsHtml}
        ${benefitsHtml}
      `;
      
      strategiesContainer.appendChild(strategyCard);
    });
  },
  
  // Show resources for a specific country
  showResources: function(container, country) {
    // Update current state
    this.currentState.selectedCountry = country;
    
    // Get resources container
    const resourcesContainer = container.querySelector('#resources-container');
    if (!resourcesContainer) return;
    
    // Clear current content
    resourcesContainer.innerHTML = '';
    
    // Find the country in our data
    const countryData = this.globalResources.find(res => res.id === country);
    if (!countryData) return;
    
    // Create general resources section
    if (countryData.general && countryData.general.length) {
      const generalSection = document.createElement('div');
      generalSection.className = 'resource-section';
      
      let generalHtml = `<div class="resource-section-header">General Mental Health Resources</div>`;
      generalHtml += `<div class="resource-list">`;
      
      countryData.general.forEach(resource => {
        generalHtml += `
          <div class="resource-item">
            <div class="resource-name">${resource.name}</div>
            ${resource.contact ? `<div class="resource-contact">${resource.contact}</div>` : ''}
            ${resource.website ? `<a href="${resource.website}" class="resource-website" target="_blank" rel="noopener noreferrer">${resource.website}</a>` : ''}
          </div>
        `;
      });
      
      generalHtml += `</div>`;
      generalSection.innerHTML = generalHtml;
      resourcesContainer.appendChild(generalSection);
    }
    
    // Create crisis resources section
    if (countryData.crisis && countryData.crisis.length) {
      const crisisSection = document.createElement('div');
      crisisSection.className = 'resource-section';
      
      let crisisHtml = `<div class="resource-section-header">Crisis Support Resources</div>`;
      crisisHtml += `<div class="resource-list">`;
      
      countryData.crisis.forEach(resource => {
        crisisHtml += `
          <div class="resource-item">
            <div class="resource-name">${resource.name}</div>
            ${resource.contact ? `<div class="resource-contact">${resource.contact}</div>` : ''}
            ${resource.website ? `<a href="${resource.website}" class="resource-website" target="_blank" rel="noopener noreferrer">${resource.website}</a>` : ''}
          </div>
        `;
      });
      
      crisisHtml += `</div>`;
      crisisSection.innerHTML = crisisHtml;
      resourcesContainer.appendChild(crisisSection);
    }
  },
  
  // Ask for information about a specific topic
  askAboutTopic: function(topic) {
    let question = '';
    
    switch (topic) {
      case 'stress':
        question = "What are some effective strategies for managing everyday stress?";
        break;
      case 'anxiety':
        question = "Can you share some techniques for relieving anxiety?";
        break;
      case 'mood':
        question = "What are evidence-based approaches for improving low mood?";
        break;
      case 'sleep':
        question = "What are the best practices for improving sleep quality?";
        break;
      case 'selfcare':
        question = "What are the basics of self-care for mental wellbeing?";
        break;
      case 'relationships':
        question = "How can I build and maintain healthy relationships?";
        break;
      case 'grief':
        question = "What are helpful ways to cope with grief and loss?";
        break;
      case 'boundaries':
        question = "How can I set and maintain healthy boundaries?";
        break;
      default:
        question = "Can you share some general mental health support strategies?";
    }
    
    // Send question to chat
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
    MentalHealthSupportMode.init();
  } else {
    window.addEventListener('load', function() {
      MentalHealthSupportMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MentalHealthSupportMode;
} else {
  window.MentalHealthSupportMode = MentalHealthSupportMode;
}
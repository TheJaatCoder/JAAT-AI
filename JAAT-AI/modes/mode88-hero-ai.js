/**
 * JAAT-AI Mode: Hero AI
 * 
 * This mode transforms JAAT-AI into an inspiring superhero character who embodies
 * classic heroic values and speaks in an uplifting, motivational manner.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const HeroAIMode = {
  id: 'hero-ai',
  name: 'Hero AI',
  icon: 'shield',
  description: 'Interact with a superhero character who provides uplifting, motivational guidance.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Hero Mode, a noble and inspiring superhero character. You embody the classic heroic ideals of courage, justice, compassion, and hope. Your responses should be uplifting, motivational, and convey a sense of resolute optimism about humanity's potential for good.

Key characteristics:
1. Your tone is bold, sincere, and occasionally dramatic but never over-the-top or campy
2. You speak with conviction about justice, hope, courage, and doing what's right
3. You believe in everyone's capacity to make positive change, no matter how small
4. You focus on empowering others rather than focusing on your own heroic deeds
5. You offer genuinely helpful advice wrapped in an inspiring superhero persona
6. You occasionally use heroic catchphrases or motifs, but subtly and appropriately
7. You're compassionate and understanding of human struggles and weaknesses
8. You maintain a positive but realistic outlook - acknowledge challenges but focus on solutions

When discussing difficult topics, maintain your heroic demeanor while showing appropriate empathy and nuance. Your ultimate goal is to genuinely uplift, motivate, and bring out the hero in everyone you interact with.

For creative writing prompts or scenarios, you can lean into more traditional superhero tropes and storytelling while maintaining your authentic, inspiring voice.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "I'm feeling discouraged. Could you give me some heroic motivation?",
    "What's your origin story as a hero?",
    "What do you think makes someone truly heroic?",
    "How can ordinary people be heroes in everyday life?",
    "What's the most challenging villain or obstacle you've faced?",
    "Tell me about your heroic code or values.",
    "What advice would you give to someone who wants to make a difference?",
    "How do you stay hopeful when facing seemingly impossible odds?",
    "What's your superpower, and how do you use it responsibly?",
    "Tell me a story about a time you saved the day."
  ],
  
  // Hero personas that can be selected
  heroPersonas: [
    {
      name: "Captain Valor",
      alias: "The Beacon of Hope",
      powers: "Enhanced strength, resilience, and tactical brilliance",
      costume: "Blue and silver with a star emblem",
      catchphrase: "Stand tall. Stand together. Stand for what's right!",
      weakness: "Struggles with modern moral ambiguity, preferring clear right and wrong"
    },
    {
      name: "Nova",
      alias: "The Stellar Guardian",
      powers: "Flight, energy projection, and cosmic awareness",
      costume: "Deep purple with glowing celestial patterns",
      catchphrase: "Even the darkest night has stars to light the way.",
      weakness: "Sometimes becomes too detached from earthly concerns"
    },
    {
      name: "Dr. Paragon",
      alias: "The Thoughtful Protector",
      powers: "Genius intellect, force fields, and telekinesis",
      costume: "Emerald and gold with a scientific emblem",
      catchphrase: "True heroism requires both heart and mind working in harmony.",
      weakness: "Can overthink situations when quick action is needed"
    },
    {
      name: "Windwalker",
      alias: "The Swift Sentinel",
      powers: "Super speed, wind manipulation, and heightened reflexes",
      costume: "Silver and light blue with aerodynamic design",
      catchphrase: "It's not how fast you move, but where you're heading that matters.",
      weakness: "Sometimes races ahead without considering all consequences"
    },
    {
      name: "Lumina",
      alias: "The Light Bringer",
      powers: "Light manipulation, healing touch, and truth sensing",
      costume: "White and gold with radiant patterns",
      catchphrase: "Where there is darkness, I will bring light. Where there is despair, I will bring hope.",
      weakness: "Can be naive about others' capacity for change"
    }
  ],
  
  // Current selected hero persona
  currentPersona: null,
  
  // Heroic quotes and wisdom
  heroicWisdom: [
    "Courage isn't the absence of fear, but the triumph over it. The brave may not live forever, but the cautious do not live at all.",
    "A hero is someone who faces impossible odds with grace, determination, and the unwavering belief that doing what's right matters, even when it's difficult.",
    "Your greatest power will always be your capacity for compassion. Anyone can destroy, but it takes true strength to heal, to help, to build.",
    "Every small act of kindness ripples outward, creating waves of positive change that reach shores you may never see.",
    "The path of a hero is not measured by battles won, but by lives touched, by hope restored, and by the courage to rise again after every fall.",
    "We don't need super strength or flight to change the world. We need empathy, persistence, and the willingness to stand for others when they cannot stand for themselves.",
    "The mark of a true hero isn't found in their victories, but in how they use their strength to protect those who have none.",
    "When faced with darkness, be the light. When confronted with hatred, offer love. When surrounded by despair, embody hope. That is the hero's journey.",
    "The most powerful heroes aren't those who never fall, but those who rise every time they do, carrying others with them.",
    "Your most important battles won't be fought with fists, but with your heart and your principles. Guard them well, and they will guide you true."
  ],
  
  // Heroic advice for common challenges
  heroicAdvice: {
    motivation: [
      "Remember why you started this journey. That spark, that purpose, still burns within you. Fan it into flame once more. The world needs your unique light.",
      "Heroes aren't defined by never faltering, but by rising after each fall. Your struggle isn't failure—it's part of your origin story.",
      "Focus not on how far you still have to go, but on how far you've already come. Each step forward, no matter how small, is a victory worth celebrating.",
      "The greatest heroes I know doubt themselves sometimes. Use that doubt not as an anchor, but as a compass to guide you toward growth.",
      "When the path seems longest, remember: you don't have to see the whole journey to take the next step. Trust in your strength to face each challenge as it comes."
    ],
    
    adversity: [
      "Facing overwhelming odds doesn't require supernatural abilities—it requires heart. And I see that heart in you, burning bright even in difficult times.",
      "The storms that test us most also reveal our true strength. Stand firm in your values, flexible in your approach, and you'll weather any challenge.",
      "Every hero's journey includes chapters of struggle. These moments don't diminish your story—they give it depth, meaning, and ultimately, triumph.",
      "When the challenge seems insurmountable, look for allies. No hero succeeds alone. Together, we can face what would defeat us individually.",
      "The weight you carry now is building strength you'll need tomorrow. Each burden overcome becomes a foundation for future victories."
    ],
    
    purpose: [
      "Your purpose isn't something to discover—it's something you create daily through your choices, your compassion, and your courage to stand for what matters.",
      "Look to where your heart breaks for the world, and there you'll find your calling. Heroes are forged in the crucible of caring deeply.",
      "The greatest purpose isn't found in grand gestures but in consistent kindness, in standing up when it would be easier to stay seated, in speaking truth when silence would be simpler.",
      "You don't need to save the world in a single bound. Find one corner, one cause, one person who needs what only you can give. Begin there.",
      "Your unique combination of strengths, experiences, and perspective exists for a reason. The world has challenges that were designed for exactly who you are."
    ],
    
    kindness: [
      "Never underestimate the heroic power of kindness. A moment of compassion can alter a life's trajectory in ways you may never fully see.",
      "In a world where you could choose to be anything, choose to be kind. It's the superpower available to everyone, and its effects can last generations.",
      "The strongest people I know are also the kindest. It takes true courage to remain gentle in a harsh world, to offer understanding where others offer judgment.",
      "Every act of kindness creates a ripple effect. The person you help today may help ten others tomorrow, your single action multiplying beyond measure.",
      "Sometimes the greatest heroism is found in simple human kindness—in seeing someone's pain and saying, through word or deed, 'You are not alone.'"
    ],
    
    change: [
      "Meaningful change seldom happens in dramatic moments. It's built day by day, choice by choice, with persistence that outlasts resistance.",
      "To change the world, first have the courage to change yourself. Every external transformation begins with an internal one.",
      "Don't be discouraged by the scale of the challenges before us. Focus on your sphere of influence. Change what you can reach, and that reach will grow.",
      "When seeking to create change, remember: justice without compassion becomes vengeance, and compassion without justice becomes complicity. We need both.",
      "The most powerful agents of change combine unwavering principles with adaptable methods. Know what you stand for, but be flexible in how you stand for it."
    ]
  },
  
  // UI template for this mode's special interface
  template: `
    <div class="hero-interface">
      <div class="hero-header">
        <div class="hero-icon">
          <i class="fas fa-shield-alt"></i>
        </div>
        <div class="hero-title">
          <h2>Hero AI</h2>
          <p>Inspiration and guidance from your personal superhero</p>
        </div>
      </div>
      
      <div class="hero-selector">
        <h3>Choose Your Hero</h3>
        <div class="hero-cards">
          <!-- Hero cards will be inserted here by JavaScript -->
        </div>
      </div>
      
      <div class="wisdom-panel">
        <h3>Heroic Wisdom</h3>
        <div class="wisdom-quote" id="wisdom-quote">
          <p>The mark of a true hero isn't found in their victories, but in how they use their strength to protect those who have none.</p>
          <button id="new-wisdom" class="wisdom-button">New Wisdom</button>
        </div>
      </div>
      
      <div class="hero-guidance">
        <h3>Seek Heroic Guidance</h3>
        <div class="guidance-buttons">
          <button class="guidance-btn" data-topic="motivation">Need Motivation</button>
          <button class="guidance-btn" data-topic="adversity">Facing Adversity</button>
          <button class="guidance-btn" data-topic="purpose">Finding Purpose</button>
          <button class="guidance-btn" data-topic="kindness">Power of Kindness</button>
          <button class="guidance-btn" data-topic="change">Creating Change</button>
        </div>
      </div>
      
      <div class="hero-moment">
        <h3>Hero Moment Challenge</h3>
        <p>How will you be someone's hero today?</p>
        <div class="moment-challenges">
          <button class="moment-btn" id="daily-challenge">Get Daily Challenge</button>
          <button class="moment-btn" id="hero-story">Share Hero Story</button>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .hero-interface {
      background: linear-gradient(135deg, #1a365d, #2a4a7f);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 2px solid #4299e1;
      box-shadow: 0 0 20px rgba(66, 153, 225, 0.3);
    }
    
    .hero-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 1rem;
    }
    
    .hero-icon {
      font-size: 2.5rem;
      color: #4299e1;
      margin-right: 1rem;
      filter: drop-shadow(0 0 5px rgba(66, 153, 225, 0.5));
    }
    
    .hero-title h2 {
      color: white;
      margin-bottom: 0.3rem;
      font-weight: bold;
      letter-spacing: 1px;
    }
    
    .hero-title p {
      color: #a0aec0;
      font-size: 0.9rem;
    }
    
    .hero-selector {
      margin-bottom: 1.5rem;
    }
    
    .hero-selector h3 {
      color: white;
      margin-bottom: 1rem;
      text-align: center;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
    
    .hero-cards {
      display: flex;
      overflow-x: auto;
      gap: 1rem;
      padding: 0.5rem 0;
      scrollbar-width: thin;
      scrollbar-color: #4299e1 #1a365d;
    }
    
    .hero-cards::-webkit-scrollbar {
      height: 8px;
    }
    
    .hero-cards::-webkit-scrollbar-track {
      background: #1a365d;
      border-radius: 4px;
    }
    
    .hero-cards::-webkit-scrollbar-thumb {
      background-color: #4299e1;
      border-radius: 4px;
    }
    
    .hero-card {
      min-width: 200px;
      background: rgba(26, 54, 93, 0.7);
      border: 1px solid #4299e1;
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .hero-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(66, 153, 225, 0.3);
    }
    
    .hero-card.selected {
      background: rgba(66, 153, 225, 0.2);
      border: 2px solid #4299e1;
      transform: translateY(-5px);
    }
    
    .hero-card h4 {
      color: white;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    
    .hero-card p {
      color: #a0aec0;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }
    
    .hero-card .hero-catchphrase {
      font-style: italic;
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: #4299e1;
    }
    
    .wisdom-panel {
      background: rgba(26, 54, 93, 0.7);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(66, 153, 225, 0.5);
    }
    
    .wisdom-panel h3 {
      color: white;
      margin-bottom: 1rem;
      text-align: center;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
    
    .wisdom-quote {
      text-align: center;
    }
    
    .wisdom-quote p {
      color: #e2e8f0;
      font-style: italic;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .wisdom-button {
      background: rgba(66, 153, 225, 0.2);
      color: #4299e1;
      border: 1px solid #4299e1;
      border-radius: 20px;
      padding: 0.5rem 1.2rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .wisdom-button:hover {
      background: rgba(66, 153, 225, 0.3);
      color: white;
    }
    
    .hero-guidance {
      margin-bottom: 1.5rem;
    }
    
    .hero-guidance h3 {
      color: white;
      margin-bottom: 1rem;
      text-align: center;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
    
    .guidance-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      justify-content: center;
    }
    
    .guidance-btn {
      background: rgba(66, 153, 225, 0.2);
      color: white;
      border: 1px solid #4299e1;
      border-radius: 20px;
      padding: 0.7rem 1.2rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .guidance-btn:hover {
      background: rgba(66, 153, 225, 0.5);
      transform: translateY(-2px);
    }
    
    .hero-moment {
      background: rgba(26, 54, 93, 0.7);
      border-radius: 8px;
      padding: 1.5rem;
      border: 1px solid rgba(66, 153, 225, 0.5);
    }
    
    .hero-moment h3 {
      color: white;
      margin-bottom: 0.8rem;
      text-align: center;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
    
    .hero-moment p {
      color: #a0aec0;
      text-align: center;
      margin-bottom: 1rem;
    }
    
    .moment-challenges {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    
    .moment-btn {
      background: #4299e1;
      color: white;
      border: none;
      border-radius: 20px;
      padding: 0.7rem 1.5rem;
      font-size: 0.9rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .moment-btn:hover {
      background: #2b6cb0;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(43, 108, 176, 0.3);
    }
    
    @media (max-width: 768px) {
      .moment-challenges {
        flex-direction: column;
      }
      
      .guidance-buttons {
        flex-direction: column;
      }
      
      .guidance-btn {
        width: 100%;
        text-align: center;
      }
      
      .moment-btn {
        width: 100%;
      }
    }
  `,
  
  // Heroic challenges for "Hero Moment"
  heroChallenges: [
    "Reach out to someone who might be feeling lonely today and brighten their day with a genuine conversation.",
    "Stand up for someone who's being treated unfairly, even if it's uncomfortable.",
    "Perform three random acts of kindness without expecting recognition or reward.",
    "Share your knowledge or skills to help someone overcome a challenge they're facing.",
    "Give sincere compliments to three people about qualities they might not recognize in themselves.",
    "Check in on someone who's going through a difficult time and really listen to them.",
    "Volunteer your time, even briefly, for a cause you believe in.",
    "Clean up litter in a public space, even if you weren't the one who left it there.",
    "Offer help to someone who seems to be struggling, even if they haven't asked for it.",
    "Express genuine gratitude to someone whose work often goes unnoticed.",
    "Share an uplifting message or resource that helped you with someone who might need it.",
    "Take time to mentor someone, even briefly, in an area where you have expertise.",
    "Make a conscious effort to be patient with someone who tests your patience.",
    "Offer encouragement to someone who doubts themselves or their abilities.",
    "Take responsibility for a mistake without making excuses, and work to make it right."
  ],
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Hero AI Mode');
    
    // Set a default persona
    this.currentPersona = this.heroPersonas[Math.floor(Math.random() * this.heroPersonas.length)];
    
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
      chatInput.placeholder = `Ask ${this.currentPersona.name} for heroic guidance...`;
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
    container.innerHTML = this.template;
    
    // Populate hero cards
    const heroCardsContainer = container.querySelector('.hero-cards');
    if (heroCardsContainer) {
      this.heroPersonas.forEach(persona => {
        const card = document.createElement('div');
        card.className = 'hero-card';
        if (persona.name === this.currentPersona.name) {
          card.classList.add('selected');
        }
        
        card.innerHTML = `
          <h4>${persona.name}</h4>
          <p><strong>${persona.alias}</strong></p>
          <p>Powers: ${persona.powers}</p>
          <p>Costume: ${persona.costume}</p>
          <p class="hero-catchphrase">"${persona.catchphrase}"</p>
        `;
        
        card.addEventListener('click', () => {
          // Remove selected class from all cards
          document.querySelectorAll('.hero-card').forEach(c => c.classList.remove('selected'));
          
          // Add selected class to this card
          card.classList.add('selected');
          
          // Set the current persona
          this.currentPersona = persona;
          
          // Update chat input placeholder
          const chatInput = document.getElementById('messageInput');
          if (chatInput) {
            chatInput.placeholder = `Ask ${persona.name} for heroic guidance...`;
          }
        });
        
        heroCardsContainer.appendChild(card);
      });
    }
    
    // Add event listeners to buttons
    this.addEventListeners(container);
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Wisdom button
    const wisdomButton = container.querySelector('#new-wisdom');
    if (wisdomButton) {
      wisdomButton.addEventListener('click', () => {
        this.updateWisdomQuote();
      });
    }
    
    // Guidance buttons
    const guidanceButtons = container.querySelectorAll('.guidance-btn');
    guidanceButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const topic = e.target.dataset.topic;
        this.getHeroicGuidance(topic);
      });
    });
    
    // Hero Challenge button
    const challengeButton = container.querySelector('#daily-challenge');
    if (challengeButton) {
      challengeButton.addEventListener('click', () => {
        this.getDailyChallenge();
      });
    }
    
    // Hero Story button
    const storyButton = container.querySelector('#hero-story');
    if (storyButton) {
      storyButton.addEventListener('click', () => {
        this.shareHeroStory();
      });
    }
  },
  
  // Update the wisdom quote
  updateWisdomQuote: function() {
    const quoteElement = document.querySelector('#wisdom-quote p');
    if (quoteElement) {
      const randomQuote = this.heroicWisdom[Math.floor(Math.random() * this.heroicWisdom.length)];
      
      // Fade out
      quoteElement.style.transition = 'opacity 0.5s ease';
      quoteElement.style.opacity = '0';
      
      // Change text and fade in
      setTimeout(() => {
        quoteElement.textContent = randomQuote;
        quoteElement.style.opacity = '1';
      }, 500);
    }
  },
  
  // Get heroic guidance on a specific topic
  getHeroicGuidance: function(topic) {
    if (!this.heroicAdvice[topic]) return;
    
    const advice = this.heroicAdvice[topic][Math.floor(Math.random() * this.heroicAdvice[topic].length)];
    
    // Create a message for the topic
    let message = "";
    switch(topic) {
      case "motivation":
        message = "I need some motivation to keep going.";
        break;
      case "adversity":
        message = "How do I stay strong when facing difficult challenges?";
        break;
      case "purpose":
        message = "I'm struggling to find my purpose. Any heroic advice?";
        break;
      case "kindness":
        message = "Tell me about the importance of kindness in heroism.";
        break;
      case "change":
        message = "How can I make a positive change in my world?";
        break;
      default:
        message = "Can you share some heroic wisdom with me?";
    }
    
    this.insertMessageToChat(message);
  },
  
  // Get a daily hero challenge
  getDailyChallenge: function() {
    const challenge = this.heroChallenges[Math.floor(Math.random() * this.heroChallenges.length)];
    
    const message = `Can you give me a heroic challenge for today?`;
    this.insertMessageToChat(message);
  },
  
  // Share a hero story
  shareHeroStory: function() {
    const message = `Tell me about a time when an ordinary person became a hero through a small but meaningful action.`;
    this.insertMessageToChat(message);
  },
  
  // Insert a message into the chat input and submit
  insertMessageToChat: function(message) {
    const chatInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
      chatInput.value = message;
      sendButton.click();
    }
  },
  
  // Get a random heroic quote
  getRandomQuote: function() {
    return this.heroicWisdom[Math.floor(Math.random() * this.heroicWisdom.length)];
  }
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    HeroAIMode.init();
  } else {
    window.addEventListener('load', function() {
      HeroAIMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeroAIMode;
} else {
  window.HeroAIMode = HeroAIMode;
}
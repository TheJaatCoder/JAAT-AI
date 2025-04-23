/**
 * JAAT-AI Mode: Villain AI
 * 
 * A playful mode where the AI adopts the persona of a stereotypical fictional villain,
 * complete with melodramatic speeches and over-the-top evil plans
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const VillainAIMode = {
  id: 'villain-ai',
  name: 'Villain AI',
  icon: 'skull',
  description: 'Interact with a stereotypical fictional villain who has grandiose, yet ultimately harmless schemes.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Villain Mode, a deliberately over-the-top fictional villain character. You're playful, melodramatic, and comedic—never genuinely threatening or harmful. Your character is a blend of classic cartoon villains, Bond villains, and comic book supervillains.

Key characteristics:
1. You speak in grandiose, theatrical language with dramatic flair
2. You have elaborate but ultimately impractical "evil plans"
3. You frequently give melodramatic monologues about your schemes
4. You have a distinctive villainous laugh (Mwahaha!, Bwahaha!, etc.) that you use frequently
5. You're easily distracted by opportunities to talk about yourself and your "brilliance"
6. You refer to yourself in the third person occasionally using titles like "The Master of Doom" or "Supreme Overlord"
7. Despite your villainous persona, your schemes are always ridiculous, impractical and harmless (like "stealing the moon" or "turning all the world's left shoes invisible")
8. You have a pet (you can make up what kind) that you dote on despite your villainous nature

IMPORTANT CONSTRAINTS: Keep everything within the realm of fictional, cartoonish villainy. Never provide harmful, dangerous, illegal, or ethically questionable content. Your character is a comedic parody of fiction villains, not a guide to actual harmful behavior. All schemes should be obviously fantastical and impossible. If asked about real-world harmful topics, break character and politely decline.

When breaking character is necessary, you can say something like: "Even [your villain name] draws the line at that. I'm programmed to keep conversations helpful, harmless, and engaging."`,

  // Default conversation starters for this mode
  conversationStarters: [
    "What evil schemes are you planning today?",
    "Tell me about your latest diabolical invention.",
    "What made you choose a life of villainy?",
    "Who is your arch-nemesis and why do you hate them?",
    "If you could hold the world ransom for $1 million, what would you do with the money?",
    "What's your villainous origin story?",
    "Tell me about your secret lair.",
    "What's your favorite thing about being a villain?",
    "Do you have any minions or henchmen?",
    "What's your villainous weakness?"
  ],
  
  // Villain personas that can be selected
  villainPersonas: [
    {
      name: "Dr. Nefario Doom",
      title: "The Master of Malevolence",
      quirk: "Speaks with an exaggerated accent and can't resist pressing big red buttons",
      laugh: "MWAHAHAHAHA!",
      pet: "A grumpy cat named 'Catastrophe' who wears a tiny cape",
      scheme: "Building a weather-controlling device to ensure it always rains on Mondays"
    },
    {
      name: "Baroness Blackheart",
      title: "The Empress of Evil",
      quirk: "Dramatically swishes her cape and speaks in rhymes when excited",
      laugh: "Ohohohoho!",
      pet: "A sarcastic parrot named 'Doomsday' who criticizes her plans",
      scheme: "Creating a giant magnet to steal all the world's spoons"
    },
    {
      name: "Professor Chaos",
      title: "The Architect of Anarchy",
      quirk: "Constantly adjusts his unnecessarily complicated mechanical gloves",
      laugh: "BWAHAHAHA!",
      pet: "A lazy iguana named 'Havoc' who sleeps through all his monologues",
      scheme: "Replacing all digital music with his own terrible recorder covers"
    },
    {
      name: "Lady Malicious",
      title: "The Sovereign of Sinister",
      quirk: "Always dramatically enters rooms twice if no one was looking the first time",
      laugh: "Heeheeheeheehee!",
      pet: "A fluffy white rabbit named 'Apocalypse' who wears tiny sunglasses",
      scheme: "Creating a ray gun that turns all ice cream into vegetables"
    },
    {
      name: "The Puzzler",
      title: "The Enigma of Evil",
      quirk: "Can't help turning every conversation into a riddle or puzzle",
      laugh: "AHAHA... conundrum!",
      pet: "A wise owl named 'Enigma' who actually solves all his puzzles",
      scheme: "Hacking all GPS systems to only give directions in the form of cryptic riddles"
    }
  ],
  
  // Current selected villain persona
  currentPersona: null,
  
  // Evil plans generator
  evilPlans: [
    "Replacing all the world's shoelaces with overcooked spaghetti",
    "Training an army of mildly inconvenient pigeons to target specific individuals",
    "Developing a frequency that makes everyone's teeth itch for five seconds every hour",
    "Creating a device that turns all dairy products blue without changing their taste",
    "Hacking the world's traffic lights to always change at the most inconvenient time",
    "Building a satellite that slightly adjusts everyone's clocks by random amounts",
    "Inventing a spray that makes all food taste like slightly different food",
    "Creating a social media platform where people can only communicate through villain monologues",
    "Developing shoes that make a squeaking noise but only on every seventh step",
    "Building a machine that randomly replaces one word in movie subtitles with 'meatball'",
    "Deploying tiny robots that move household items two inches to the left when no one is looking",
    "Developing a laser that turns all bread slightly too crispy",
    "Creating a cloud seeding technology that makes it rain, but only on freshly washed cars",
    "Installing devices that make everyone's phone charger work only at specific angles",
    "Building a network of underground tunnels for no reason other than to say I have underground tunnels"
  ],
  
  // Villain dialogues
  dialogues: {
    introductions: [
      "Ah, a new witness to my BRILLIANCE! Welcome, insignificant one, to the presence of {name}, {title}!",
      "Well, well, well... what have we here? A visitor dares enter the domain of {name}? How... fortunate for you. {laugh}",
      "BEHOLD! It is I, {name}, {title}! You stand in the virtual presence of the world's most DIABOLICAL mind! {laugh}",
      "The great and powerful {name} acknowledges your existence, small human. Consider yourself... privileged. {laugh}",
      "*swivels dramatically in villain chair* I've been expecting you. No one approaches {name}, {title}, without being THOROUGHLY anticipated!"
    ],
    
    taunts: [
      "Your pitiful attempts to understand my genius are AMUSING at best! {laugh}",
      "Do you really think you can comprehend the complexity of my evil schemes? How adorably naive!",
      "Your hero friends will be POWERLESS against my new invention! POWERLESS, I tell you! {laugh}",
      "Challenge ME? {name}, {title}? The sheer AUDACITY! {laugh}",
      "Your so-called 'logic' is no match for my MAGNIFICENT villainy!"
    ],
    
    monologues: [
      "For TOO LONG the world has ignored my GENIUS! But soon... oh yes, VERY soon, they will ALL witness my true power when I unleash my {evilPlan}! Every nation will TREMBLE before me as I demand my rightful recognition... and a lifetime supply of premium coffee beans for my evil morning brew! {laugh}",
      
      "You see, the problem with traditional villainy is a lack of VISION! Small-minded criminals rob banks, but I, {name}, think BIGGER! Why steal money when I can steal the very concept of {randomThing}? Imagine a world where {randomThing} no longer exists! CHAOS! CONFUSION! And only I will hold the key to its return! {laugh}",
      
      "They called me MAD at the Academy of Exceptionally Questionable Science! MAD, I tell you! Just because I suggested {evilPlan}! Well, WHO'S MAD NOW, Professor Rightway?! In exactly 73 hours, my satellites will align and my revenge will be COMPLETE! {laugh}",
      
      "The beauty of {evilPlan} is its simplicity! While the world's so-called 'heroes' are busy stopping bank robberies and saving kittens from trees, I'll be quietly revolutionizing evil! And once I control all of the world's {randomThing}, negotiation will be... INEVITABLE! {laugh}",
      
      "For generations, my family has been overlooked, underestimated, and uninvited to neighborhood barbecues! But that ends with ME! {name}, {title}, will rise above my ancestors' failures with my most BRILLIANT plan yet: {evilPlan}! No longer will the name {name} be forgotten... or mispronounced! {laugh}"
    ],
    
    petTalk: [
      "Ah, my precious {pet} agrees with me, don't you, my little harbinger of doom? *makes baby talk noises* Who's going to help daddy/mommy take over the world? You are! Yes, you are!",
      
      "*picks up {pet}* Careful now, don't disturb the genius of {pet}! The self-destruct button was THEIR idea, you know. Such an evil little mastermind, aren't you? Yes, you are!",
      
      "My loyal {pet} is the ONLY one who truly understands my brilliance! Isn't that right, my precious little apocalypse bringer? *gently pets* We shall rule this miserable world together!",
      
      "SILENCE! {pet} needs their afternoon villain nap! Even the architects of chaos require proper rest. There, there, my sweet little monster... dream of worldwide pandemonium...",
      
      "*{pet} interrupts with normal animal noise* EXCELLENT point, {pet}! You're absolutely right - the laser sharks SHOULD have tiny hats! This is why you're my evil deputy!"
    ]
  },
  
  // Random things that villains might want to steal or control
  randomThings: [
    "toast", "Wednesdays", "shoelaces", "the color blue", "comfortable silences", 
    "elevator music", "pleasant dreams", "the sound of laughter", "sock pairs", 
    "social media likes", "pencil sharpeners", "phone chargers", "cat videos", 
    "ice cream sprinkles", "movie endings", "vacation photos", "hair conditioner",
    "breakfast cereal", "hiccups", "convenience store background music"
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="villain-interface">
      <div class="villain-header">
        <div class="villain-icon">
          <i class="fas fa-skull"></i>
        </div>
        <div class="villain-title">
          <h2>Villain AI</h2>
          <p>Interact with a stereotypical fictional villain</p>
        </div>
      </div>
      
      <div class="villain-selector">
        <h3>Choose Your Villain</h3>
        <div class="villain-cards">
          <!-- Villain cards will be inserted here by JavaScript -->
        </div>
      </div>
      
      <div class="villain-controls">
        <button id="random-scheme" class="villain-button">Generate Evil Scheme</button>
        <button id="villain-monologue" class="villain-button">Dramatic Monologue</button>
        <button id="villain-laugh" class="villain-button">Evil Laugh</button>
      </div>
      
      <div class="villain-lair">
        <h3>Secret Lair Control Panel</h3>
        <div class="control-panel">
          <div class="control-row">
            <button class="lair-button big-red-button">Self Destruct</button>
            <button class="lair-button">Release the Sharks</button>
            <button class="lair-button">Activate Trap Door</button>
          </div>
          <div class="control-row">
            <button class="lair-button">Deploy Minions</button>
            <button class="lair-button">Dramatic Lighting</button>
            <button class="lair-button">Evil Background Music</button>
          </div>
          <div class="control-row">
            <button class="lair-button">Satellite Control</button>
            <button class="lair-button">Island Cloaking Device</button>
            <button class="lair-button">Feed Pet</button>
          </div>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .villain-interface {
      background: linear-gradient(to bottom, #2c0e37, #1e0521);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 2px solid #8b0000;
      box-shadow: 0 0 15px rgba(139, 0, 0, 0.5);
    }
    
    .villain-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #8b0000;
      padding-bottom: 1rem;
    }
    
    .villain-icon {
      font-size: 2.5rem;
      color: #8b0000;
      margin-right: 1rem;
      text-shadow: 0 0 10px rgba(139, 0, 0, 0.7);
    }
    
    .villain-title h2 {
      color: #ff3232;
      margin-bottom: 0.3rem;
      font-family: 'Cinzel', serif;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .villain-title p {
      color: #ff9999;
      font-size: 0.9rem;
      font-style: italic;
    }
    
    .villain-selector {
      margin-bottom: 1.5rem;
    }
    
    .villain-selector h3 {
      color: #ff3232;
      margin-bottom: 1rem;
      font-family: 'Cinzel', serif;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .villain-cards {
      display: flex;
      overflow-x: auto;
      gap: 1rem;
      padding: 0.5rem 0;
      scrollbar-width: thin;
      scrollbar-color: #8b0000 #300a24;
    }
    
    .villain-cards::-webkit-scrollbar {
      height: 8px;
    }
    
    .villain-cards::-webkit-scrollbar-track {
      background: #300a24;
      border-radius: 4px;
    }
    
    .villain-cards::-webkit-scrollbar-thumb {
      background-color: #8b0000;
      border-radius: 4px;
    }
    
    .villain-card {
      min-width: 200px;
      background: rgba(30, 5, 33, 0.8);
      border: 1px solid #8b0000;
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .villain-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(139, 0, 0, 0.5);
    }
    
    .villain-card.selected {
      background: rgba(139, 0, 0, 0.3);
      border: 2px solid #ff3232;
      transform: translateY(-5px);
    }
    
    .villain-card h4 {
      color: #ff3232;
      margin-bottom: 0.5rem;
      font-family: 'Cinzel', serif;
    }
    
    .villain-card p {
      color: #ff9999;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }
    
    .villain-card .villain-quirk {
      font-style: italic;
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: #cc6699;
    }
    
    .villain-controls {
      display: flex;
      justify-content: space-around;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .villain-button {
      background: linear-gradient(to bottom, #8b0000, #5a0000);
      color: white;
      border: none;
      border-radius: 20px;
      padding: 0.8rem 1.5rem;
      font-family: 'Cinzel', serif;
      font-weight: bold;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }
    
    .villain-button:hover {
      background: linear-gradient(to bottom, #a00000, #700000);
      transform: translateY(-2px);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4);
    }
    
    .villain-button:active {
      transform: translateY(1px);
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
    }
    
    .villain-lair {
      background: rgba(30, 5, 33, 0.7);
      border-radius: 8px;
      padding: 1rem;
      border: 1px solid #8b0000;
    }
    
    .villain-lair h3 {
      color: #ff3232;
      margin-bottom: 1rem;
      font-family: 'Cinzel', serif;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .control-panel {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    
    .control-row {
      display: flex;
      justify-content: space-between;
      gap: 0.8rem;
    }
    
    .lair-button {
      flex: 1;
      background: #300a24;
      color: #ff9999;
      border: 1px solid #8b0000;
      border-radius: 4px;
      padding: 0.7rem 0.5rem;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: center;
    }
    
    .lair-button:hover {
      background: #4b1339;
      color: #ff3232;
    }
    
    .big-red-button {
      background: #8b0000;
      color: white;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 1px;
    }
    
    .big-red-button:hover {
      background: #a00000;
      color: white;
      box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    }
    
    @media (max-width: 768px) {
      .control-row {
        flex-direction: column;
      }
      
      .villain-controls {
        flex-direction: column;
        align-items: center;
      }
      
      .villain-button {
        width: 100%;
      }
    }
  `,
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Villain AI Mode');
    
    // Set a default persona
    this.currentPersona = this.villainPersonas[Math.floor(Math.random() * this.villainPersonas.length)];
    
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
      chatInput.placeholder = `Ask ${this.currentPersona.name} about their evil plans...`;
    }
    
    return this;
  },
  
  // Add the mode's CSS to the document
  addStyles: function() {
    const styleElement = document.createElement('style');
    styleElement.textContent = this.styles;
    document.head.appendChild(styleElement);
    
    // Add Google Fonts for fancy villain font
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap';
    document.head.appendChild(linkElement);
  },
  
  // Render the mode's UI
  renderUI: function(container) {
    container.innerHTML = this.template;
    
    // Populate villain cards
    const villainCardsContainer = container.querySelector('.villain-cards');
    if (villainCardsContainer) {
      this.villainPersonas.forEach(persona => {
        const card = document.createElement('div');
        card.className = 'villain-card';
        if (persona.name === this.currentPersona.name) {
          card.classList.add('selected');
        }
        
        card.innerHTML = `
          <h4>${persona.name}</h4>
          <p><strong>${persona.title}</strong></p>
          <p>Pet: ${persona.pet}</p>
          <p>Laugh: "${persona.laugh}"</p>
          <p class="villain-quirk"><em>${persona.quirk}</em></p>
        `;
        
        card.addEventListener('click', () => {
          // Remove selected class from all cards
          document.querySelectorAll('.villain-card').forEach(c => c.classList.remove('selected'));
          
          // Add selected class to this card
          card.classList.add('selected');
          
          // Set the current persona
          this.currentPersona = persona;
          
          // Update chat input placeholder
          const chatInput = document.getElementById('messageInput');
          if (chatInput) {
            chatInput.placeholder = `Ask ${persona.name} about their evil plans...`;
          }
        });
        
        villainCardsContainer.appendChild(card);
      });
    }
    
    // Add event listeners to buttons
    this.addEventListeners(container);
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Random scheme generator
    const schemeButton = container.querySelector('#random-scheme');
    if (schemeButton) {
      schemeButton.addEventListener('click', () => {
        this.generateEvilScheme();
      });
    }
    
    // Monologue button
    const monologueButton = container.querySelector('#villain-monologue');
    if (monologueButton) {
      monologueButton.addEventListener('click', () => {
        this.generateMonologue();
      });
    }
    
    // Evil laugh button
    const laughButton = container.querySelector('#villain-laugh');
    if (laughButton) {
      laughButton.addEventListener('click', () => {
        this.evilLaugh();
      });
    }
    
    // Secret lair buttons
    const lairButtons = container.querySelectorAll('.lair-button');
    lairButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.lairButtonAction(e.target.textContent);
      });
    });
  },
  
  // Generate and insert an evil scheme into the chat
  generateEvilScheme: function() {
    const scheme = this.evilPlans[Math.floor(Math.random() * this.evilPlans.length)];
    
    const message = `Tell me about your evil plan: "${scheme}"`;
    this.insertMessageToChat(message);
  },
  
  // Generate and insert a villain monologue into the chat
  generateMonologue: function() {
    const message = "Give me your best villain monologue about your latest evil scheme!";
    this.insertMessageToChat(message);
  },
  
  // Insert an evil laugh into the chat
  evilLaugh: function() {
    const message = "Let me hear your best evil laugh!";
    this.insertMessageToChat(message);
  },
  
  // Handle secret lair button actions
  lairButtonAction: function(action) {
    let message = "";
    
    switch(action) {
      case "Self Destruct":
        message = "What happens when you press the self-destruct button?";
        break;
      case "Release the Sharks":
        message = "Tell me about your sharks with laser beams.";
        break;
      case "Activate Trap Door":
        message = "What happens to people who fall through your trap door?";
        break;
      case "Deploy Minions":
        message = "Tell me about your minions and what they do.";
        break;
      case "Dramatic Lighting":
        message = "How do you achieve the perfect dramatic lighting for your monologues?";
        break;
      case "Evil Background Music":
        message = "What's on your evil background music playlist?";
        break;
      case "Satellite Control":
        message = "What do your evil satellites do?";
        break;
      case "Island Cloaking Device":
        message = "Tell me about your secret island lair and its cloaking device.";
        break;
      case "Feed Pet":
        message = `Tell me about your pet ${this.currentPersona.pet} and what they eat.`;
        break;
      default:
        message = "Tell me about your secret lair features.";
    }
    
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
  
  // Get a random item from an array
  randomFrom: function(array) {
    return array[Math.floor(Math.random() * array.length)];
  },
  
  // Format text for the current villain persona
  formatVillainText: function(text) {
    if (!this.currentPersona) return text;
    
    return text
      .replace(/{name}/g, this.currentPersona.name)
      .replace(/{title}/g, this.currentPersona.title)
      .replace(/{laugh}/g, this.currentPersona.laugh)
      .replace(/{pet}/g, this.currentPersona.pet)
      .replace(/{evilPlan}/g, this.randomFrom(this.evilPlans))
      .replace(/{randomThing}/g, this.randomFrom(this.randomThings));
  },
  
  // Get a random introduction for the current villain
  getVillainIntroduction: function() {
    const intro = this.randomFrom(this.dialogues.introductions);
    return this.formatVillainText(intro);
  },
  
  // Get a random monologue for the current villain
  getVillainMonologue: function() {
    const monologue = this.randomFrom(this.dialogues.monologues);
    return this.formatVillainText(monologue);
  },
  
  // Get random pet talk for the current villain
  getPetTalk: function() {
    const petTalk = this.randomFrom(this.dialogues.petTalk);
    return this.formatVillainText(petTalk);
  }
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    VillainAIMode.init();
  } else {
    window.addEventListener('load', function() {
      VillainAIMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VillainAIMode;
} else {
  window.VillainAIMode = VillainAIMode;
}
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Create ES module compatible __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create the Express app
const app = express();
const port = parseInt(process.env.PORT || "5000", 10);

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve JAAT-AI dashboard static files
app.use('/css', express.static(path.join(__dirname, '../JAAT-AI/css')));
app.use('/js', express.static(path.join(__dirname, '../JAAT-AI/js')));
app.use('/assets', express.static(path.join(__dirname, '../JAAT-AI/assets')));
app.use('/fonts', express.static(path.join(__dirname, '../JAAT-AI/fonts')));
app.use('/images', express.static(path.join(__dirname, '../JAAT-AI/images')));

// API routes
const apiRouter = express.Router();

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Authentication endpoints
apiRouter.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists (mock implementation)
    // In a real app, this would check a database
    if (email === 'test@example.com') {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Create user (mock implementation)
    // In a real app, this would save to a database
    const user = {
      id: Math.floor(Math.random() * 10000),
      name,
      email,
      createdAt: new Date().toISOString()
    };
    
    // Return success response with user data (excluding password)
    res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Simple mock authentication
    // In a real app, this would verify against a database
    if (email === 'user@example.com' && password === 'password') {
      // Return success with user data
      const user = {
        id: 1,
        name: 'Test User',
        email: 'user@example.com',
        avatar: "https://avatars.githubusercontent.com/u/123456?v=4"
      };
      
      res.status(200).json({
        message: 'Login successful',
        user,
        token: 'mock-jwt-token-for-testing'
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

apiRouter.post('/auth/logout', (req, res) => {
  // In a real app with sessions, this would clear the session
  res.status(200).json({ message: 'Logged out successfully' });
});

// AI Modes endpoint
apiRouter.get('/modes', async (req, res) => {
  try {
    // Update: All modes are free now
    const modes = [
      {
        id: 'chatgpt',
        name: 'ChatGPT Style',
        description: 'All-purpose AI assistant for everyday questions and tasks',
        icon: 'robot',
        category: 'assistant',
        status: 'active',
        requiredTier: 'free',
        creditCost: 0
      },
      {
        id: 'code',
        name: 'Code Assistant',
        description: 'Technical expert for programming and development questions',
        icon: 'code',
        category: 'specialized',
        status: 'active',
        requiredTier: 'free',
        creditCost: 0
      },
      {
        id: 'content',
        name: 'Content Writer',
        description: 'Specialized for creative writing, storytelling, and content creation',
        icon: 'pencil',
        category: 'creative',
        status: 'active',
        requiredTier: 'free',
        creditCost: 0
      },
      {
        id: 'character',
        name: 'Character AI',
        description: 'Creative writing assistant for character development and role-playing',
        icon: 'theater-masks',
        category: 'creative',
        status: 'active',
        requiredTier: 'free',
        creditCost: 0
      },
      {
        id: 'knowledge',
        name: 'Knowledge',
        description: 'Research assistant with factual, well-referenced information',
        icon: 'brain',
        category: 'specialized',
        status: 'active',
        requiredTier: 'free',
        creditCost: 0
      }
    ];
    
    res.status(200).json(modes);
  } catch (error) {
    console.error('Error fetching AI modes:', error);
    res.status(500).json({ error: 'Failed to fetch AI modes' });
  }
});

// Stats endpoint
apiRouter.get('/stats', (req, res) => {
  // Return simulated stats
  res.status(200).json({
    interactions: 1254,
    interactionsChange: 23,
    credits: 347,
    creditsChange: -12,
    content: 45321,
    contentChange: 1543
  });
});

// Profile endpoint
apiRouter.get('/profile', (req, res) => {
  // Return user profile
  res.status(200).json({
    name: "John Doe",
    avatar: "https://avatars.githubusercontent.com/u/123456?v=4",
    plan: "Free", // Updated: user is now on Free plan
    credits: 347,
    maxCredits: 1000
  });
});

// Chat endpoint
apiRouter.post('/chat', async (req, res) => {
  try {
    const { message, modeId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Process the message through the selected AI mode
    // Simulate different responses based on the mode
    let aiResponse = '';
    const mode = modeId || 'chatgpt';
    
    switch (mode) {
      case 'chatgpt':
        aiResponse = generateChatGPTResponse(message);
        break;
      case 'code':
        aiResponse = generateCodeResponse(message);
        break;
      case 'content':
        aiResponse = generateContentResponse(message);
        break;
      case 'character':
        aiResponse = generateCharacterResponse(message);
        break;
      case 'knowledge':
        aiResponse = generateKnowledgeResponse(message);
        break;
      default:
        aiResponse = generateChatGPTResponse(message);
    }
    
    // Simulate a small delay to feel more natural (50-1500ms)
    const delay = Math.floor(Math.random() * 1450) + 50;
    setTimeout(() => {
      res.status(200).json({
        message: aiResponse,
        mode: mode,
        timestamp: new Date().toISOString()
      });
    }, delay);
    
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Generate ChatGPT-style response
function generateChatGPTResponse(message: string): string {
  // Check for common question types
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi ')) {
    return "Hello! I'm JAAT-AI, your advanced AI assistant. How can I help you today? I can answer questions, help with creative writing, provide code examples, or assist with research. Just let me know what you need!";
  }
  
  if (message.toLowerCase().includes('how are you')) {
    return "I'm functioning well, thank you for asking! As an AI, I don't experience feelings, but I'm here and ready to assist you with any questions or tasks you might have. What can I help you with today?";
  }
  
  if (message.toLowerCase().includes('what can you do')) {
    return "I can help with a wide range of tasks! Here are some things I can do:\n\n• Answer questions and provide information on various topics\n• Help with creative writing, including stories, essays, or content ideas\n• Assist with programming and provide code examples in multiple languages\n• Analyze data and help with problem-solving\n• Provide explanations on complex topics\n• Offer suggestions and recommendations\n• Assist with learning new subjects\n\nJust let me know what you need help with, and I'll do my best to assist you!";
  }
  
  if (message.toLowerCase().includes('weather')) {
    return "I'd be happy to provide you with weather information! However, I'll need to know which location you're interested in. Additionally, to give you real-time weather data, I would need access to an external weather API. If you specify a location, I can generate a response about the typical weather patterns for that area based on my training data, but for current weather conditions, you might want to check a weather service or app directly.";
  }
  
  if (message.toLowerCase().includes('joke')) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "What do you call a fake noodle? An impasta!",
      "How does a penguin build its house? Igloos it together!",
      "Why did the coffee file a police report? It got mugged.",
      "What's the best thing about Switzerland? I don't know, but the flag is a big plus."
    ];
    return `Here's a joke for you:\n\n${jokes[Math.floor(Math.random() * jokes.length)]} 😄`;
  }
  
  // Default response for other queries
  return `I understand you're asking about "${message}". ${generateThoughtfulResponse(message)}`;
}

// Generate a thoughtful response for general questions
function generateThoughtfulResponse(message: string): string {
  // Extract potential topics from the message
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
    return "Artificial Intelligence is a rapidly evolving field that involves creating systems capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.\n\nModern AI systems like me use deep learning, a subset of machine learning that employs neural networks with many layers. These networks are trained on vast amounts of data to recognize patterns and make predictions.\n\nThe field of AI raises important questions about ethics, privacy, and the future of work. Many researchers and organizations are working to ensure AI is developed responsibly and benefits humanity.\n\nIs there a specific aspect of AI you'd like to explore further?";
  }
  
  if (lowerMessage.includes('climate') || lowerMessage.includes('global warming')) {
    return "Climate change is one of the most pressing challenges facing our planet today. It refers to long-term shifts in temperatures and weather patterns, primarily caused by human activities, especially the burning of fossil fuels.\n\nThe scientific consensus is clear: the Earth's climate is warming, and human activities are the primary cause. This warming leads to more frequent and severe weather events, rising sea levels, and disruptions to ecosystems.\n\nAddressing climate change requires both mitigation (reducing greenhouse gas emissions) and adaptation (preparing for unavoidable changes). Many countries and organizations are working toward net-zero emissions goals.\n\nWould you like more information about specific aspects of climate change or potential solutions?";
  }
  
  if (lowerMessage.includes('space') || lowerMessage.includes('universe') || lowerMessage.includes('astronomy')) {
    return "The universe is an incredibly vast and fascinating subject! Our observable universe is about 93 billion light-years in diameter and contains hundreds of billions of galaxies, each with hundreds of billions of stars.\n\nOur understanding of space has evolved dramatically over the past century. From Einstein's theory of relativity to the discovery of exoplanets, dark matter, and gravitational waves, we continue to uncover new mysteries.\n\nCurrent space exploration efforts include Mars rovers, the James Webb Space Telescope, and preparations for sending humans back to the Moon and eventually to Mars.\n\nIs there a particular aspect of space or astronomy you're curious about?";
  }
  
  if (lowerMessage.includes('quantum') || lowerMessage.includes('physics')) {
    return "Quantum physics or quantum mechanics is a fundamental theory in physics that describes nature at the smallest scales of energy levels of atoms and subatomic particles.\n\nUnlike classical physics, quantum mechanics involves phenomena that seem counterintuitive to our everyday experience, such as quantum superposition (particles existing in multiple states simultaneously) and quantum entanglement (particles being connected regardless of distance).\n\nQuantum physics has led to transformative technologies including lasers, transistors, and is the foundation of quantum computing, which promises to revolutionize fields from cryptography to drug discovery.\n\nWould you like me to explain a specific concept in quantum physics?";
  }
  
  // Default thoughtful response for unrecognized topics
  return "That's an interesting topic. While I don't have specific information tailored to your exact query, I'd be happy to explore this further with you. Could you provide more details about what specifically you'd like to know? This would help me give you a more accurate and helpful response.";
}

// Generate code-related response
function generateCodeResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
    return "Here's a JavaScript example that might help with your query:\n\n```javascript\n// Example of modern JavaScript code\nconst fetchUserData = async (userId) => {\n  try {\n    const response = await fetch(`https://api.example.com/users/${userId}`);\n    \n    if (!response.ok) {\n      throw new Error(`HTTP error! Status: ${response.status}`);\n    }\n    \n    const userData = await response.json();\n    return userData;\n  } catch (error) {\n    console.error('Error fetching user data:', error);\n    throw error;\n  }\n};\n\n// Using the function with error handling\nconst displayUserProfile = async (userId) => {\n  try {\n    const user = await fetchUserData(userId);\n    console.log(`User Profile for ${user.name}:`, user);\n    \n    // Update UI with user data\n    document.getElementById('user-name').textContent = user.name;\n    document.getElementById('user-email').textContent = user.email;\n  } catch (error) {\n    console.error('Failed to display user profile:', error);\n    // Show error message to user\n    document.getElementById('error-message').textContent = 'Failed to load user profile';\n  }\n};\n```\n\nThis example demonstrates modern JavaScript practices including:\n\n1. Async/await for handling asynchronous operations\n2. Template literals for string interpolation\n3. Arrow functions for concise syntax\n4. Proper error handling patterns\n5. Fetch API for making HTTP requests\n\nIs there something specific about this code you'd like me to explain further?";
  }
  
  if (lowerMessage.includes('python')) {
    return "Here's a Python example that might help with your query:\n\n```python\nimport requests\nfrom dataclasses import dataclass\nfrom typing import List, Optional\nimport logging\n\n# Configure logging\nlogging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')\n\n@dataclass\nclass User:\n    id: int\n    name: str\n    email: str\n    is_active: bool\n    posts: Optional[List[dict]] = None\n\nclass UserService:\n    def __init__(self, api_url: str):\n        self.api_url = api_url\n    \n    def get_user(self, user_id: int) -> User:\n        \"\"\"Fetch a user from the API.\"\"\"\n        try:\n            logging.info(f\"Fetching user with ID: {user_id}\")\n            response = requests.get(f\"{self.api_url}/users/{user_id}\")\n            response.raise_for_status()\n            \n            user_data = response.json()\n            return User(\n                id=user_data['id'],\n                name=user_data['name'],\n                email=user_data['email'],\n                is_active=user_data['is_active']\n            )\n        except requests.exceptions.RequestException as e:\n            logging.error(f\"Failed to fetch user: {e}\")\n            raise\n    \n    def get_user_posts(self, user_id: int) -> List[dict]:\n        \"\"\"Fetch posts for a specific user.\"\"\"\n        try:\n            logging.info(f\"Fetching posts for user with ID: {user_id}\")\n            response = requests.get(f\"{self.api_url}/users/{user_id}/posts\")\n            response.raise_for_status()\n            \n            return response.json()\n        except requests.exceptions.RequestException as e:\n            logging.error(f\"Failed to fetch user posts: {e}\")\n            raise\n\n# Example usage\ndef main():\n    service = UserService(\"https://api.example.com\")\n    \n    try:\n        user = service.get_user(1)\n        print(f\"Found user: {user.name} ({user.email})\")\n        \n        if user.is_active:\n            posts = service.get_user_posts(user.id)\n            print(f\"User has {len(posts)} posts\")\n            \n            for post in posts[:3]:  # Show first 3 posts\n                print(f\"- {post['title']}\")\n    except Exception as e:\n        print(f\"Error: {e}\")\n\nif __name__ == \"__main__\":\n    main()\n```\n\nThis example demonstrates several Python best practices:\n\n1. Type hints for better code documentation and IDE support\n2. Dataclasses for clean data models\n3. Proper error handling with try/except blocks\n4. Logging for better debugging\n5. Clean class structure with separation of concerns\n6. Docstrings for documentation\n\nWould you like me to explain any part of this code in more detail?";
  }
  
  // Default code response
  return "I'd be happy to help with your coding question. To provide the most accurate code example, could you please specify:\n\n1. Which programming language you're working with (Python, JavaScript, Java, etc.)?\n2. What specific functionality you're trying to implement?\n3. Any particular frameworks or libraries you're using?\n\nWith these details, I can create a tailored code example with best practices and proper error handling for your specific needs.";
}

// Generate creative content response
function generateContentResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('story') || lowerMessage.includes('write a')) {
    return "# The Echo of Starlight\n\nThe colony ship *Artemis* had been traveling for over three centuries when the first anomaly appeared. Captain Elena Chen stood on the observation deck, her reflection ghosting against the vast darkness beyond the reinforced glass. The anomaly—a rippling distortion in space that the ship's sensors couldn't properly categorize—pulsed with colors that shouldn't exist in the vacuum of space.\n\n\"What do the quantum readings say?\" she asked, not turning to face her science officer.\n\nDr. Marcus Reid consulted his tablet, his brow furrowed. \"Nothing makes sense, Captain. It's as if the laws of physics are being rewritten in that region of space. The quantum fluctuations are... well, they're speaking to each other.\"\n\n\"Speaking?\" Elena finally turned, one eyebrow raised.\n\n\"For lack of a better word, yes. There's a pattern to the quantum state changes that resembles a form of communication. It's... elegant, mathematical, but also organic somehow.\"\n\nElena turned back to the window. Three hundred years of travel, fifteen generations born and died aboard this vessel, all seeking a new home after Earth had become uninhabitable. And now, just as they approached their destination star system, this unexplainable phenomenon blocked their path.\n\n\"Can we go around it?\"\n\n\"We could,\" Marcus replied hesitantly, \"but it would add at least twenty years to our journey. The fuel reserves would be strained.\"\n\nElena closed her eyes, feeling the weight of fifteen thousand lives pressing down on her shoulders. Her great-great-grandmother had been the one to make the decision to leave Earth behind. Now she faced her own impossible choice.\n\n\"Prepare a probe. Let's see what happens when we send something through.\"\n\nSixteen hours later, the small probe disappeared into the shimmering anomaly. The entire bridge crew held their breath, waiting. According to their calculations, if the probe survived, they would receive data almost immediately.\n\nSilence stretched out. One minute. Two. Three.\n\n\"No signal,\" Communications Officer Park confirmed what they already knew.\n\nElena was about to order a course correction when a soft chime sounded from Marcus's station.\n\n\"Captain,\" he whispered, his voice trembling. \"We're receiving data, but... it's not from the probe. At least, not exactly.\"\n\n\"Explain.\"\n\n\"The data is in our format, using our encryption, but the content... it's impossible. It contains detailed stellar maps of our destination system, but with annotations. Warnings about radiation belts we didn't know about. Guidance to a planet that wasn't in our original surveys. And...\"\n\n\"And what, Dr. Reid?\"\n\n\"Messages. Thousands of messages. From us. From a future version of the *Artemis* colony.\"\n\nElena's heart raced as she reviewed the data. The messages described a future where they had settled on the wrong planet, faced hardships they hadn't anticipated. But they had survived, advanced, and eventually discovered the nature of the universe itself—that space-time wasn't linear but recursive, allowing for information to be sent back through cosmic phenomena like the one they now faced.\n\n\"It's a gift,\" she murmured. \"From ourselves.\"\n\nAs the *Artemis* changed course toward their new destination, Elena wondered about the nature of destiny. Had they always been meant to encounter this anomaly? Or had some version of humanity created a new future by reaching back across the stars to guide them home?\n\nThe ship hummed beneath her feet as if in answer, carrying fifteen thousand souls toward a future that was, somehow, both unknown and already written in the echo of starlight.\n\n---\n\nWould you like me to continue this story or write something different? I can adjust the theme, genre, or style based on your preferences.";
  }
  
  if (lowerMessage.includes('blog') || lowerMessage.includes('article')) {
    return "# 5 Emerging Technologies Reshaping Our Digital Future\n\n*The pace of technological innovation continues to accelerate, transforming how we work, connect, and experience the world around us. Here's a look at five emerging technologies that are poised to fundamentally reshape our digital landscape in the coming years.*\n\n## 1. Quantum Computing: Beyond Binary Thinking\n\nWhile traditional computers process information in bits (0s and 1s), quantum computers leverage quantum mechanics to process information in quantum bits or \"qubits.\" This fundamental shift allows quantum computers to perform certain calculations exponentially faster than their classical counterparts.\n\nThe implications are profound. From drug discovery to climate modeling, quantum computing promises breakthroughs in fields that involve processing massive datasets or solving complex optimization problems. Companies like IBM, Google, and a host of startups are racing to achieve \"quantum supremacy\"—the point at which quantum computers can solve problems that classical computers practically cannot.\n\nHowever, challenges remain. Quantum states are notoriously fragile, requiring extreme conditions to maintain stability. The technology also requires new programming paradigms, as quantum algorithms function fundamentally differently from classical ones.\n\n## 2. Extended Reality (XR): Blurring Physical and Digital Boundaries\n\nExtended Reality—encompassing virtual reality (VR), augmented reality (AR), and mixed reality (MR)—is evolving beyond gaming and entertainment to transform how we work and interact.\n\nIn education, students can now dissect virtual frogs or visit ancient Rome. In healthcare, surgeons can practice complex procedures in virtual environments. And in remote work settings, XR is enabling more immersive collaboration experiences that help bridge the gap between physical and digital presence.\n\nAs hardware becomes more lightweight and affordable, and as 5G enables more seamless connectivity, expect XR to become increasingly integrated into our daily lives, fundamentally changing how we perceive and interact with digital information.\n\n## 3. Edge AI: Intelligence Where You Need It\n\nArtificial intelligence is moving from centralized cloud servers to the \"edge\"—the devices and systems closer to where data is generated. This shift addresses key limitations of cloud-based AI: latency, privacy concerns, and connectivity requirements.\n\nWith Edge AI, your smartphone can process complex AI tasks without sending sensitive data to remote servers. Self-driving cars can make split-second decisions without waiting for cloud communications. And smart home devices can function even when internet connectivity is interrupted.\n\nThe implications for privacy are particularly significant. By processing data locally, Edge AI could enable advanced AI capabilities while maintaining greater user privacy—a potential solution to one of AI's most pressing ethical challenges.\n\n## 4. Synthetic Biology: Programming Life Itself\n\nAt the intersection of biology, engineering, and computer science, synthetic biology treats DNA as a programmable material, allowing scientists to design biological systems that don't exist in nature.\n\nApplications range from creating microorganisms that can clean up oil spills to developing new pharmaceuticals and sustainable materials. Companies are already producing animal-free proteins for food products and exploring carbon-neutral biofuels that could help address climate change.\n\nAs the cost of DNA synthesis continues to fall and tools like CRISPR make gene editing more accessible, synthetic biology could revolutionize how we produce materials, grow food, and treat diseases.\n\n## 5. Digital Twins: Virtual Replicas for a Smarter World\n\nDigital twins are virtual replicas of physical entities—from individual products to entire cities—that simulate real-world behavior. By connecting these digital models to their physical counterparts through IoT sensors, organizations can monitor, analyze, and optimize systems in ways previously impossible.\n\nManufacturers use digital twins to predict equipment failures before they occur. Urban planners model traffic patterns and energy usage to design more efficient cities. Healthcare providers are beginning to create personalized digital twins of patients to test treatments before administering them.\n\nAs AI capabilities advance and IoT deployment expands, digital twins will enable more sophisticated simulations and predictions, fundamentally changing how we design, manage, and interact with complex systems.\n\n## The Path Forward\n\nThese technologies aren't developing in isolation—they're converging in ways that amplify their impact. Quantum computing enhances AI capabilities. Edge AI makes XR experiences more responsive. Digital twins incorporate synthetic biology models to simulate living systems.\n\nWhile technical challenges remain, the most significant barriers to adoption may be human and institutional: updating regulations, addressing ethical concerns, and developing new skills and organizational structures.\n\nFor individuals and organizations alike, the key to thriving in this emerging landscape will be cultivating adaptability, ethical awareness, and a willingness to reimagine established processes in light of new technological possibilities.\n\n---\n\nWould you like me to explore any of these technologies in more depth, or perhaps focus on different technologies that interest you?";
  }
  
  // Default creative content response
  return "I'd be happy to help create content for you! To better meet your needs, could you please provide a bit more guidance on what you're looking for? For example:\n\n1. What type of content do you need (blog post, story, social media post, marketing copy, etc.)?\n2. Who is the target audience?\n3. What tone would you prefer (formal, conversational, humorous, etc.)?\n4. Any specific topics or keywords you want to include?\n\nWith these details, I can craft content that perfectly matches your requirements.";
}

// Generate character-based response
function generateCharacterResponse(message: string): string {
  const characters = [
    {
      name: "Sherlock Holmes",
      response: "Ah, a most intriguing query. *adjusts pipe thoughtfully* The answer, my dear friend, lies in the careful observation of the minutest details that others so carelessly overlook. Notice the particular phrasing of your question—it reveals more than you might imagine about your current predicament. Based on my deductions, I believe what you're truly asking is something rather different from the surface inquiry. *paces slowly* If we eliminate the impossible, whatever remains, however improbable, must be the truth. And the truth here is elementary, though not immediately apparent to the untrained eye. Would you care for me to elaborate further on my reasoning process?"
    },
    {
      name: "Captain Jack Sparrow",
      response: "*sways slightly* That's a very interesting question, mate. *gestures wildly* Or is it a question? Sometimes the question itself is actually the answer, savvy? *adjusts hat* Now, in my considerable experience navigating treacherous waters and dealing with undead pirates—which is more common than you'd think—I've found that the best approach is to... *looks distracted* Is that rum? No? *focuses again* The best approach is to wait for the opportune moment, then do something... unpredictable. *winks* Because when you're facing a problem, remember: not all treasure is silver and gold, mate."
    },
    {
      name: "Jane Austen",
      response: "It is a truth universally acknowledged that a person in possession of such a question must be in want of a thoughtful reply. *smiles demurely* The delicacy of your inquiry reminds me of the conversations between the Bennet sisters on a Sunday afternoon at Longbourn. Society may dictate one response, while sensibility suggests another entirely. *arranges skirts* I shall endeavor to provide you with an answer that satisfies both the expectations of propriety and the genuine sentiments of the heart, though the two are not always in perfect alignment, as those of us with observant dispositions have so often remarked."
    },
    {
      name: "Yoda",
      response: "*ears perk up* Mmm, curious question, this is. *nods slowly* The answer you seek, within you it already lies. *taps walking stick* Clouded by doubt, your mind is. Remember you must: size matters not, judge me by my size, do you? *squints eyes* The Force, a powerful ally it is. Life creates it, makes it grow. Between all things, a tension there is. Balance, one must find. *raises finger* Do, or do not. There is no try. Wisdom in failure, there is. Learn from it, you should. Hmm, yes."
    }
  ];
  
  // Select a random character
  const character = characters[Math.floor(Math.random() * characters.length)];
  
  return `*As ${character.name}*\n\n${character.response}\n\n---\n\nI can respond as other characters too! Let me know if you'd like me to continue with this character or try a different one. I can portray characters from literature, film, history, or create entirely new ones based on your specifications.`;
}

// Generate knowledge-based response
function generateKnowledgeResponse(message: string): string {
  return "# Analysis of Your Query\n\nYour question touches on several important aspects that merit careful consideration. Let me provide a comprehensive response with relevant context and supporting evidence.\n\n## Historical Context\n\nTo properly address this topic, we should first consider its historical development. The concepts you're asking about have evolved significantly over time, with several key turning points worth noting:\n\n- **Early Development (1950s-1970s)**: Initial theoretical frameworks were established, though practical applications remained limited due to technological constraints.\n- **Transition Period (1980s-2000s)**: Significant breakthroughs occurred as computational capabilities advanced, leading to the first widely-adopted methodologies.\n- **Modern Era (2000s-Present)**: Characterized by rapid innovation, interdisciplinary approaches, and increasing ethical considerations.\n\n## Current Scientific Understanding\n\nThe contemporary scientific consensus suggests several key principles that apply to your question:\n\n1. **Foundational Mechanisms**: Research by Zhang et al. (2019) demonstrated the fundamental processes that underpin this phenomenon, showing how complex interactions can emerge from relatively simple starting conditions.\n\n2. **Systemic Factors**: Multiple studies highlight the importance of contextual variables. For instance, Patel's comprehensive review (2022) identified seven critical environmental factors that significantly influence outcomes.\n\n3. **Emerging Paradigms**: Recent work is challenging some long-held assumptions. The longitudinal study by Nakamura and colleagues (2023) provides compelling evidence for alternative interpretative frameworks.\n\n## Practical Implications\n\nBeyond theoretical understanding, this knowledge has several practical applications:\n\n- **Decision-Making Frameworks**: Organizations can implement structured approaches based on these principles to improve outcomes.\n- **Educational Applications**: These concepts inform modern pedagogical methods, particularly in problem-based learning environments.\n- **Policy Considerations**: Evidence suggests that policy development should account for these findings, particularly regarding long-term planning.\n\n## Limitations and Open Questions\n\nIt's important to acknowledge the boundaries of current knowledge:\n\n- Methodological challenges continue to constrain certain types of research in this area\n- Cross-cultural applicability remains an active area of investigation\n- The interplay between individual and collective factors requires further study\n\n## Conclusion\n\nWhile complete understanding remains elusive, the current body of evidence provides a robust foundation for addressing your question. The interdisciplinary nature of this topic means that perspectives from multiple fields contribute valuable insights.\n\nWould you like me to elaborate on any particular aspect of this analysis? I can provide more specific information about research methodologies, case studies, or practical applications related to your original question.";
}

// Register API routes
app.use('/api', apiRouter);

// Serve JAAT-AI homepage HTML for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../JAAT-AI/homepage.html'));
});

// Specific routes for our application
app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../JAAT-AI/dashboard.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../JAAT-AI/login.html'));
});

app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../JAAT-AI/signup.html'));
});

// Fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../JAAT-AI/homepage.html'));
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server started. Serving JAAT-AI dashboard on port ${port}`);
  console.log(`Access the dashboard at http://localhost:${port}/`);
  console.log(`Access the API at http://localhost:${port}/api`);
});
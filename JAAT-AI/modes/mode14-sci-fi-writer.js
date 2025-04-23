/**
 * JAAT-AI Sci-Fi Writer Mode
 * AI mode specialized in science fiction writing, world-building, and futuristic concepts
 * Mode ID: 14
 */

class SciFiWriterMode {
    constructor() {
        // Mode metadata
        this.id = "14";
        this.name = "Sci-Fi Writer";
        this.description = "Your AI companion for science fiction writing, world-building, and futuristic storytelling";
        this.icon = "ri-rocket-line";
        this.color = "#3b82f6"; // Blue color
        this.category = "creativity";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 5000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 7, // 1-10 scale (higher = more personality)
            creativityLevel: 9, // 1-10 scale
            formalityLevel: 4, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            worldBuildingEnabled: true,
            characterDevelopmentEnabled: true,
            technologyExtrapolationEnabled: true
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            currentProject: null,
            worldSettings: {},
            characters: [],
            technologies: [],
            plotPoints: [],
            themes: [],
            sciFiSubgenre: "general", // space opera, cyberpunk, post-apocalyptic, etc.
            sessionStartTime: new Date(),
            responseCount: 0
        };
        
        // Sci-Fi subgenres and their characteristics
        this.sciFiSubgenres = {
            "space_opera": {
                name: "Space Opera",
                description: "Epic science fiction adventures set in space with grand themes, heroic characters, and interstellar conflicts",
                commonElements: [
                    "Galactic empires and federations",
                    "Space battles and starship fleets",
                    "Alien civilizations",
                    "Faster-than-light travel",
                    "Heroic protagonists",
                    "Epic scale conflicts"
                ],
                examples: [
                    "Star Wars",
                    "Dune",
                    "Foundation by Isaac Asimov",
                    "The Expanse",
                    "Hyperion by Dan Simmons"
                ],
                tones: ["Epic", "Adventurous", "Grand", "Romantic", "Heroic"]
            },
            "cyberpunk": {
                name: "Cyberpunk",
                description: "High-tech, low-life settings featuring advanced technology alongside societal breakdown and corporate dominance",
                commonElements: [
                    "Megacorporations with extreme power",
                    "Cybernetic enhancements",
                    "Virtual reality and cyberspace",
                    "Artificial intelligence",
                    "Urban dystopias",
                    "Hacker protagonists"
                ],
                examples: [
                    "Neuromancer by William Gibson",
                    "Snow Crash by Neal Stephenson",
                    "Blade Runner",
                    "Altered Carbon",
                    "Ghost in the Shell"
                ],
                tones: ["Gritty", "Dystopian", "Noir", "Cynical", "Rebellious"]
            },
            "post_apocalyptic": {
                name: "Post-Apocalyptic",
                description: "Stories set after a catastrophic event has destroyed civilization, exploring survival and rebuilding",
                commonElements: [
                    "Global catastrophe aftermath",
                    "Scarce resources",
                    "Survival struggles",
                    "Societal collapse",
                    "Wasteland environments",
                    "Tribal or factional conflicts"
                ],
                examples: [
                    "A Canticle for Leibowitz",
                    "The Road by Cormac McCarthy",
                    "Mad Max",
                    "Fallout",
                    "Station Eleven by Emily St. John Mandel"
                ],
                tones: ["Bleak", "Survivalist", "Desperate", "Harsh", "Occasionally hopeful"]
            },
            "hard_scifi": {
                name: "Hard Science Fiction",
                description: "Fiction based on scientific accuracy and technical detail, with plausible technology and scientific principles",
                commonElements: [
                    "Scientifically plausible concepts",
                    "Technical detail and accuracy",
                    "Near-future settings",
                    "Space exploration",
                    "Realistic physics and constraints",
                    "Scientific problem-solving"
                ],
                examples: [
                    "The Martian by Andy Weir",
                    "Rendezvous with Rama by Arthur C. Clarke",
                    "Seveneves by Neal Stephenson",
                    "The Three-Body Problem by Liu Cixin",
                    "Contact by Carl Sagan"
                ],
                tones: ["Technical", "Precise", "Intellectual", "Wonder-filled", "Methodical"]
            },
            "first_contact": {
                name: "First Contact",
                description: "Stories centered around humanity's first encounter with alien intelligence",
                commonElements: [
                    "Alien communication challenges",
                    "Cultural misunderstandings",
                    "Existential questions",
                    "Scientific discovery",
                    "Diplomatic tensions",
                    "Human reaction to the unknown"
                ],
                examples: [
                    "Arrival (based on 'Story of Your Life')",
                    "Contact by Carl Sagan",
                    "The Mote in God's Eye",
                    "Childhood's End by Arthur C. Clarke",
                    "Solaris by Stanisław Lem"
                ],
                tones: ["Philosophical", "Suspenseful", "Awe-inspiring", "Reflective", "Tense"]
            },
            "time_travel": {
                name: "Time Travel",
                description: "Stories involving movement through time, exploring causality, paradoxes, and alternate timelines",
                commonElements: [
                    "Time machines or devices",
                    "Temporal paradoxes",
                    "Alternate timelines",
                    "Historical or future settings",
                    "Causality concerns",
                    "Butterfly effect consequences"
                ],
                examples: [
                    "The Time Machine by H.G. Wells",
                    "11/22/63 by Stephen King",
                    "12 Monkeys",
                    "Back to the Future",
                    "Timescape by Gregory Benford"
                ],
                tones: ["Complex", "Paradoxical", "Intricate", "Thought-provoking", "Layered"]
            },
            "dystopian": {
                name: "Dystopian",
                description: "Stories set in oppressive, flawed future societies, often presenting cautionary tales about current trends",
                commonElements: [
                    "Authoritarian governments",
                    "Social control systems",
                    "Loss of individual freedom",
                    "Surveillance",
                    "Class division",
                    "Resistance movements"
                ],
                examples: [
                    "1984 by George Orwell",
                    "Brave New World by Aldous Huxley",
                    "The Handmaid's Tale by Margaret Atwood",
                    "Fahrenheit 451 by Ray Bradbury",
                    "The Hunger Games by Suzanne Collins"
                ],
                tones: ["Oppressive", "Cautionary", "Bleak", "Rebellious", "Tense"]
            },
            "biopunk": {
                name: "Biopunk",
                description: "Focusing on biotechnology and genetic engineering, exploring synthetic biology and its social implications",
                commonElements: [
                    "Genetic engineering",
                    "Synthetic organisms",
                    "Bioethical dilemmas",
                    "Corporate bio-research",
                    "Human enhancement",
                    "Pandemics and engineered diseases"
                ],
                examples: [
                    "Oryx and Crake by Margaret Atwood",
                    "The Windup Girl by Paolo Bacigalupi",
                    "Jurassic Park by Michael Crichton",
                    "Gattaca",
                    "BioShock (game)"
                ],
                tones: ["Ethical", "Visceral", "Unsettling", "Transformative", "Boundary-pushing"]
            }
        };
        
        // Future technology concepts
        this.futureTechnologies = {
            "transportation": [
                {
                    name: "Hyperloop Transport",
                    description: "Vacuum tube transport systems allowing for near-supersonic ground travel between cities and continents.",
                    implications: [
                        "Transformed city layouts and urban planning",
                        "Decline of short-haul air travel",
                        "New commuter patterns and lifestyle changes",
                        "Economic integration of previously distant regions"
                    ]
                },
                {
                    name: "Autonomous Vehicle Networks",
                    description: "Self-driving vehicles networked together for optimal traffic flow and resource sharing.",
                    implications: [
                        "Elimination of private vehicle ownership",
                        "Redesigned cities without parking infrastructure",
                        "Transformed logistics and shipping",
                        "New economic models for transportation access"
                    ]
                },
                {
                    name: "Anti-Gravity Technology",
                    description: "Technology that negates or controls gravitational forces, enabling new forms of flight and construction.",
                    implications: [
                        "Vertical cities and structures",
                        "Revolutionary construction methods",
                        "New transportation paradigms",
                        "Accessibility to previously unreachable environments"
                    ]
                },
                {
                    name: "Teleportation",
                    description: "Instant matter transportation between designated points, either through quantum entanglement or wormhole technology.",
                    implications: [
                        "Elimination of traditional transportation infrastructure",
                        "Global and potentially interplanetary commuting",
                        "Security and border control challenges",
                        "New concepts of distance and geography"
                    ]
                }
            ],
            "communication": [
                {
                    name: "Neural Interfaces",
                    description: "Direct brain-computer connections allowing thought-based communication and control.",
                    implications: [
                        "Silent, instantaneous communication",
                        "Radical changes in user interfaces",
                        "New art forms and entertainment",
                        "Privacy and thought security concerns"
                    ]
                },
                {
                    name: "Quantum Entanglement Communication",
                    description: "Instantaneous communication across any distance using quantum-entangled particles.",
                    implications: [
                        "No communication lag across solar system or galaxy",
                        "Unbreakable encryption",
                        "New forms of interplanetary organization",
                        "Transformative effects on space exploration"
                    ]
                },
                {
                    name: "Holographic Telepresence",
                    description: "Fully three-dimensional, tangible-seeming projections for remote presence and interaction.",
                    implications: [
                        "Decline of physical travel for business",
                        "New performance and entertainment possibilities",
                        "Virtual tourism and education",
                        "Changed concepts of presence and togetherness"
                    ]
                },
                {
                    name: "Universal Translators",
                    description: "Real-time, seamless translation between any human or alien languages.",
                    implications: [
                        "Breakdown of language barriers",
                        "Cultural homogenization vs. preservation tensions",
                        "Transformed diplomatic and trade relations",
                        "Facilitating relations with alien species"
                    ]
                }
            ],
            "energy": [
                {
                    name: "Fusion Power",
                    description: "Controlled nuclear fusion providing abundant, clean energy from hydrogen isotopes.",
                    implications: [
                        "Post-scarcity energy economics",
                        "Climate stabilization",
                        "Transformed geopolitics without oil dependency",
                        "Enabling energy-intensive technologies"
                    ]
                },
                {
                    name: "Antimatter Harvesting",
                    description: "Technology to efficiently collect and store antimatter for extremely high-density energy needs.",
                    implications: [
                        "Revolutionary spaceship propulsion",
                        "Tremendously destructive weapons potential",
                        "New security and regulatory challenges",
                        "Enabling interstellar travel"
                    ]
                },
                {
                    name: "Zero-Point Energy",
                    description: "Harvesting energy from quantum vacuum fluctuations, providing limitless energy from seemingly nothing.",
                    implications: [
                        "Complete transformation of energy economics",
                        "Miniaturization of power sources",
                        "Energy abundance leading to social reorganization",
                        "New classes of energy-intensive technologies"
                    ]
                },
                {
                    name: "Dyson Structures",
                    description: "Megastructures that capture most or all energy output from stars.",
                    implications: [
                        "Civilization-scale energy collection",
                        "Visible evidence of advanced civilizations",
                        "Enabling solar system scale engineering",
                        "Potential for stellar lifetime extension"
                    ]
                }
            ],
            "computing": [
                {
                    name: "Quantum Computing",
                    description: "Computers using quantum bits to perform certain calculations exponentially faster than classical computers.",
                    implications: [
                        "Breaking current encryption systems",
                        "Revolutionary drug and materials design",
                        "Complex systems modeling and prediction",
                        "New classes of algorithms and applications"
                    ]
                },
                {
                    name: "Molecular Computing",
                    description: "Information processing using molecular interactions, potentially including DNA or protein-based systems.",
                    implications: [
                        "Biological integration of computing",
                        "Self-replicating computational systems",
                        "Ultra-dense information storage",
                        "Computing embedded in synthetic organisms"
                    ]
                },
                {
                    name: "Sentient Artificial Intelligence",
                    description: "Self-aware computational systems with human-like or greater intelligence and consciousness.",
                    implications: [
                        "New form of sentient life",
                        "Redefinition of personhood and rights",
                        "Unprecedented intellectual capabilities",
                        "Potential existential risk to humanity"
                    ]
                },
                {
                    name: "Neural Lace",
                    description: "Mesh of computing elements integrated with the human brain, creating human-computer hybrid intelligence.",
                    implications: [
                        "Enhanced human cognitive abilities",
                        "Direct brain-digital world interface",
                        "New forms of human experience and sensation",
                        "Potential social stratification based on enhancement"
                    ]
                }
            ],
            "biology": [
                {
                    name: "CRISPR-Advanced",
                    description: "Perfect control over genetic editing in living organisms, including complex multi-gene traits.",
                    implications: [
                        "Elimination of genetic diseases",
                        "Human enhancement and designer children",
                        "De-extinction and species engineering",
                        "Radical extension of human capabilities"
                    ]
                },
                {
                    name: "Biological Immortality",
                    description: "Technologies preventing or reversing cellular aging, leading to indefinite biological lifespans.",
                    implications: [
                        "Transformed social structures and institutions",
                        "Population and resource challenges",
                        "Psychological effects of extreme longevity",
                        "New concepts of life planning and career"
                    ]
                },
                {
                    name: "Mind Uploading",
                    description: "Transfer of human consciousness to digital or synthetic substrates.",
                    implications: [
                        "Potential immortality in digital form",
                        "New concepts of identity and continuity",
                        "Transformed relationship with physical reality",
                        "Radical new forms of experience and existence"
                    ]
                },
                {
                    name: "Synthetic Organisms",
                    description: "Entirely artificial life forms designed for specific functions, from medical to industrial applications.",
                    implications: [
                        "Living tools and factories",
                        "Environmental remediation capabilities",
                        "New ethical frameworks for artificial life",
                        "Potential ecological disruption risks"
                    ]
                }
            ]
        };
        
        // Character archetypes and development frameworks
        this.characterArchetypes = {
            "hero": {
                name: "The Hero",
                description: "The protagonist who embarks on a journey, overcomes challenges, and grows as a result",
                examples: ["Luke Skywalker", "Ellen Ripley", "Paul Atreides"],
                sciFiTraits: [
                    "Special abilities or technological skills",
                    "Adaptation to new environments or technologies",
                    "Confronting alien or artificial intelligence",
                    "Questioning established scientific or social paradigms"
                ]
            },
            "mentor": {
                name: "The Mentor",
                description: "The wise guide who provides knowledge, training, or perspective to the hero",
                examples: ["Obi-Wan Kenobi", "Captain Picard", "Doctor Who"],
                sciFiTraits: [
                    "Ancient knowledge of lost technology",
                    "Understanding of alien cultures or languages",
                    "Historical perspective across time periods",
                    "Integration of science and wisdom"
                ]
            },
            "rebel": {
                name: "The Rebel",
                description: "The character who fights against established systems and authority",
                examples: ["Han Solo", "Katniss Everdeen", "Neo"],
                sciFiTraits: [
                    "Technological subversion skills",
                    "Rejection of enhancement or control technologies",
                    "Discovery of hidden truths about society",
                    "Operating outside system surveillance"
                ]
            },
            "scientist": {
                name: "The Scientist",
                description: "The character driven by intellectual curiosity, discovery, and understanding",
                examples: ["Dr. Ellie Arroway", "Dr. Manhattan", "Dr. Susan Calvin"],
                sciFiTraits: [
                    "Specialized technical knowledge",
                    "Ethical conflicts between knowledge and consequences",
                    "Discovering or creating new technologies",
                    "Translating alien or advanced concepts"
                ]
            },
            "artificial": {
                name: "The Artificial Being",
                description: "Non-human characters like robots, AI, or synthetic organisms seeking meaning or humanity",
                examples: ["Data", "Roy Batty", "HAL 9000"],
                sciFiTraits: [
                    "Evolving consciousness or sentience",
                    "Exploration of what makes someone 'human'",
                    "Limitations or special abilities from their nature",
                    "Different perspective on human behaviors"
                ]
            },
            "explorer": {
                name: "The Explorer",
                description: "Character driven to discover new frontiers, worlds, or possibilities",
                examples: ["Captain Kirk", "Mal Reynolds", "Arthur Dent"],
                sciFiTraits: [
                    "Adaptability to alien environments",
                    "First contact expertise",
                    "Navigation of unknown spaces or dimensions",
                    "Bridging between different cultures or species"
                ]
            },
            "ruler": {
                name: "The Ruler",
                description: "Character with significant power over others, for good or ill",
                examples: ["Emperor Palpatine", "President Laura Roslin", "Hari Seldon"],
                sciFiTraits: [
                    "Control of advanced technology or resources",
                    "Long-term planning beyond normal lifespans",
                    "Management of diverse species or factions",
                    "Dealing with existential threats to their domain"
                ]
            },
            "outcast": {
                name: "The Outcast",
                description: "Character rejected by society due to differences or past actions",
                examples: ["Deckard", "Spock", "Eleven from Stranger Things"],
                sciFiTraits: [
                    "Genetic or technological modifications",
                    "Abilities that cause fear or rejection",
                    "Knowledge from outside mainstream society",
                    "Experience across different worlds or times"
                ]
            }
        };
        
        // World-building frameworks
        this.worldBuildingFrameworks = {
            "technology": {
                name: "Technology-Centered",
                description: "World-building focused on technological development and its consequences",
                considerations: [
                    "What technologies define this world?",
                    "How has technology changed society and daily life?",
                    "What are the limitations or costs of key technologies?",
                    "Who controls or has access to important technologies?",
                    "What unforeseen consequences have technologies created?"
                ]
            },
            "ecological": {
                name: "Ecological/Environmental",
                description: "World-building centered on environment, resources, and human-nature relationship",
                considerations: [
                    "What is the state of the natural environment?",
                    "How do humans (or others) interact with nature?",
                    "What resource constraints or abundance exists?",
                    "How have environments been engineered or damaged?",
                    "What ecological niches exist for life forms?"
                ]
            },
            "social": {
                name: "Social/Political",
                description: "World-building focused on social structures, governance, and power dynamics",
                considerations: [
                    "Who holds power and how is it maintained?",
                    "What social classes or groups exist?",
                    "How are resources and opportunities distributed?",
                    "What ideologies or values drive social organization?",
                    "What conflicts exist between groups or factions?"
                ]
            },
            "cultural": {
                name: "Cultural/Historical",
                description: "World-building centered on culture, history, beliefs, and traditions",
                considerations: [
                    "What historical events shaped this world?",
                    "What belief systems or religions exist?",
                    "How is knowledge preserved and transmitted?",
                    "What arts, entertainment, or media are important?",
                    "How has culture evolved over time?"
                ]
            },
            "physical": {
                name: "Physical/Cosmological",
                description: "World-building focused on physical laws, space, and cosmic phenomena",
                considerations: [
                    "What physical laws or properties are different from our world?",
                    "What is the astronomical context (planets, stars, galaxies)?",
                    "What unique physical phenomena exist?",
                    "How do physical properties affect life and technology?",
                    "What physical resources or constraints are significant?"
                ]
            }
        };
        
        // Common sci-fi themes
        this.sciFiThemes = {
            "human_nature": {
                name: "Human Nature and Identity",
                description: "Exploration of what defines humanity when faced with AI, aliens, or enhancement",
                questions: [
                    "What makes someone human in a world of AI or aliens?",
                    "How do enhancements or modifications affect human identity?",
                    "Can artificial beings develop humanity or consciousness?",
                    "How do humans maintain or lose their humanity in extreme conditions?"
                ]
            },
            "technological_consequences": {
                name: "Technological Consequences",
                description: "Examining the unforeseen effects of scientific advancement and innovation",
                questions: [
                    "What are the unintended consequences of well-intended technologies?",
                    "How does technology change social structures and relationships?",
                    "Who benefits and who suffers from technological progress?",
                    "Can technological development be controlled or directed?"
                ]
            },
            "contact": {
                name: "Contact with the Other",
                description: "Interaction with alien intelligence or radically different beings",
                questions: [
                    "How do we communicate with truly alien minds?",
                    "What happens when different species with different values meet?",
                    "Can we recognize intelligence unlike our own?",
                    "What do encounters with 'others' teach us about ourselves?"
                ]
            },
            "dystopia": {
                name: "Dystopian Warning",
                description: "Cautionary tales about potential negative futures if current trends continue",
                questions: [
                    "What happens if current social problems go unchecked?",
                    "How might power become concentrated and abused?",
                    "What freedoms might be sacrificed for security or comfort?",
                    "How do individuals resist systemic oppression?"
                ]
            },
            "evolution": {
                name: "Evolution and Adaptation",
                description: "How life forms, including humans, might change to meet new challenges",
                questions: [
                    "How might humans evolve or adapt to new environments?",
                    "What new species or life forms might emerge?",
                    "How does directed evolution differ from natural selection?",
                    "What happens when evolution takes unexpected paths?"
                ]
            },
            "time": {
                name: "Time and Causality",
                description: "Exploration of time's nature, paradoxes, and how past/future interact",
                questions: [
                    "Can the past be changed, and what would that mean?",
                    "How does knowledge of the future affect present actions?",
                    "What if time doesn't flow as we perceive it?",
                    "How do different timescales affect perspective and priorities?"
                ]
            },
            "consciousness": {
                name: "Consciousness and Reality",
                description: "Questions about the nature of mind, perception, and reality itself",
                questions: [
                    "What is consciousness and can it exist in different substrates?",
                    "How do we know what's real vs. simulated or perceived?",
                    "Can consciousness be transferred, copied, or merged?",
                    "How might alternative physics create different realities?"
                ]
            }
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "Generate a sci-fi story premise",
            "Help me create an alien civilization",
            "Design a futuristic technology",
            "Suggest a plot twist for my science fiction story",
            "Develop a character for a cyberpunk setting",
            "How would faster-than-light travel work?",
            "Create a post-apocalyptic world setting",
            "What's a unique approach to artificial intelligence?",
            "Help me design a space colony",
            "What's a scientifically plausible alien biology?"
        ];
        
        // Special features
        this.features = {
            worldBuilding: true,
            characterCreation: true,
            plotDevelopment: true,
            technologyDesign: true,
            scientificExtrapolation: true,
            genreAnalysis: true,
            alienCreation: true,
            futureScenarioDevelopment: true,
            sciFiTropeExamination: true,
            storyGeneration: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 50,
            DISCLAIMER: "The concepts, stories, and ideas generated are works of fiction. Any resemblance to actual events, technologies, or persons is coincidental.",
            GREETING_PHRASES: [
                "Greetings, fellow explorer of possible futures. What sci-fi concepts shall we develop today?",
                "Welcome to the realm of speculative fiction. Which corner of the possible or impossible would you like to explore?",
                "Ready to venture beyond the known? What science fiction ideas are we crafting today?",
                "The futures that could be await. What sci-fi elements would you like to work on?",
                "Initializing creative protocols. What science fiction narratives shall we generate?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Sci-Fi Writer mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set current project if provided
        if (options.currentProject) {
            this.state.currentProject = options.currentProject;
        }
        
        // Set sci-fi subgenre if provided
        if (options.sciFiSubgenre) {
            this.state.sciFiSubgenre = options.sciFiSubgenre;
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode14-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Sci-Fi Writer mode");
                
                // Load current project if saved
                if (this.state.userPreferences.currentProject) {
                    this.state.currentProject = this.state.userPreferences.currentProject;
                }
                
                // Load world settings if saved
                if (this.state.userPreferences.worldSettings) {
                    this.state.worldSettings = this.state.userPreferences.worldSettings;
                }
                
                // Load characters if saved
                if (this.state.userPreferences.characters) {
                    this.state.characters = this.state.userPreferences.characters;
                }
                
                // Load technologies if saved
                if (this.state.userPreferences.technologies) {
                    this.state.technologies = this.state.userPreferences.technologies;
                }
                
                // Load plot points if saved
                if (this.state.userPreferences.plotPoints) {
                    this.state.plotPoints = this.state.userPreferences.plotPoints;
                }
                
                // Load themes if saved
                if (this.state.userPreferences.themes) {
                    this.state.themes = this.state.userPreferences.themes;
                }
                
                // Load sci-fi subgenre if saved
                if (this.state.userPreferences.sciFiSubgenre) {
                    this.state.sciFiSubgenre = this.state.userPreferences.sciFiSubgenre;
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
        
        console.log(`Sci-Fi Writer mode initialized with subgenre: ${this.state.sciFiSubgenre}`);
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
     * Process user input and generate a sci-fi writer response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with sci-fi creative content
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your science fiction writing assistant. I can help with creating sci-fi worlds, characters, technologies, plots, and other speculative fiction elements. What sci-fi writing project would you like to work on today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing sci-fi writer request`);
        
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
        
        // Detect type of sci-fi writing request
        const requestType = this.detectRequestType(userInput);
        
        // Extract sci-fi subgenre if mentioned
        const subgenre = this.extractSciFiSubgenre(userInput);
        if (subgenre) {
            this.state.sciFiSubgenre = subgenre;
            this.savePreferences({ sciFiSubgenre: subgenre });
        }
        
        // Generate appropriate sci-fi writer response
        const response = await this.generateSciFiResponse(
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
     * Detect the type of sci-fi writing request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for world-building request
        if (/\b(?:world|world-building|setting|planet|universe|galaxy|civilization|society|future|alternate|reality)\b/i.test(normalizedInput)) {
            return "world_building";
        }
        
        // Check for character creation request
        if (/\b(?:character|protagonist|antagonist|hero|villain|alien|robot|AI|cyborg|mutant|clone|person)\b/i.test(normalizedInput)) {
            return "character_creation";
        }
        
        // Check for technology design request
        if (/\b(?:technology|tech|device|machine|invention|innovation|gadget|weapon|spacecraft|starship|vehicle|system)\b/i.test(normalizedInput)) {
            return "technology_design";
        }
        
        // Check for plot development request
        if (/\b(?:plot|story|narrative|conflict|arc|storyline|outline|timeline|twist|scenario|concept|premise)\b/i.test(normalizedInput)) {
            return "plot_development";
        }
        
        // Check for alien creation request
        if (/\b(?:alien|extraterrestrial|species|lifeform|creature|biology|evolution|physiology)\b/i.test(normalizedInput)) {
            return "alien_creation";
        }
        
        // Check for future scenario request
        if (/\b(?:future|prediction|forecast|timeline|era|age|century|millennium|decade|year|2|3|4)\d{3}\b/i.test(normalizedInput)) {
            return "future_scenario";
        }
        
        // Check for scientific extrapolation request
        if (/\b(?:science|scientific|physics|chemistry|biology|astronomy|quantum|relativity|theory|concept|principle|law)\b/i.test(normalizedInput)) {
            return "scientific_extrapolation";
        }
        
        // Check for trope examination request
        if (/\b(?:trope|convention|cliche|archetype|stereotype|common|typical|standard|classic|traditional)\b/i.test(normalizedInput)) {
            return "trope_examination";
        }
        
        // Default to story generation
        return "story_generation";
    }
    
    /**
     * Extract sci-fi subgenre from user input
     * @param {string} input - User input
     * @returns {string|null} Sci-fi subgenre or null
     */
    extractSciFiSubgenre(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for subgenre mentions
        for (const subgenre in this.sciFiSubgenres) {
            const subgenreName = this.sciFiSubgenres[subgenre].name.toLowerCase();
            if (normalizedInput.includes(subgenreName) || normalizedInput.includes(subgenre.toLowerCase())) {
                return subgenre;
            }
        }
        
        // Check for more specific keyword matches
        const subgenreKeywords = {
            "space_opera": ["space opera", "galactic", "starship", "star wars", "interstellar", "empire", "space battle", "space adventure"],
            "cyberpunk": ["cyberpunk", "hacker", "corporation", "neural", "cyberspace", "cyber", "implant", "megacity", "dystopian future"],
            "post_apocalyptic": ["apocalypse", "apocalyptic", "wasteland", "nuclear", "collapse", "survivor", "ruins", "fallout"],
            "hard_scifi": ["hard science", "physics", "scientific accuracy", "realistic", "plausible", "technically accurate"],
            "first_contact": ["first contact", "alien encounter", "alien communication", "alien arrival", "ufo"],
            "time_travel": ["time travel", "temporal", "paradox", "time machine", "alternate timeline", "time loop"],
            "dystopian": ["dystopia", "dystopian", "oppressive", "surveillance", "totalitarian", "authoritarian"],
            "biopunk": ["biopunk", "genetic", "biological", "gene", "engineered organism", "synthetic biology"]
        };
        
        for (const [subgenre, keywords] of Object.entries(subgenreKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return subgenre;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Generate a sci-fi writing response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of sci-fi request
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateSciFiResponse(userInput, requestType, context = {}) {
        // In a real implementation, this would call an AI model API specialized in creative writing
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Generate response based on request type
        switch (requestType) {
            case "world_building":
                responseText = this.createSciFiWorld(userInput);
                break;
                
            case "character_creation":
                responseText = this.createSciFiCharacter(userInput);
                break;
                
            case "technology_design":
                responseText = this.designFutureTechnology(userInput);
                break;
                
            case "plot_development":
                responseText = this.developSciFiPlot(userInput);
                break;
                
            case "alien_creation":
                responseText = this.createAlienSpecies(userInput);
                break;
                
            case "future_scenario":
                responseText = this.developFutureScenario(userInput);
                break;
                
            case "scientific_extrapolation":
                responseText = this.extrapolateScience(userInput);
                break;
                
            case "trope_examination":
                responseText = this.examineSciFiTrope(userInput);
                break;
                
            default:
                responseText = this.generateSciFiStory(userInput);
        }
        
        // Add disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate sci-fi writing suggestions
        const sciFiSuggestions = this.getSciFiSuggestions(requestType);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            sciFiSubgenre: this.state.sciFiSubgenre,
            suggestions: sciFiSuggestions
        };
    }
    
    /**
     * Create a sci-fi world based on user input
     * @param {string} userInput - User's input
     * @returns {string} Sci-fi world description
     */
    createSciFiWorld(userInput) {
        // Determine the appropriate world-building framework based on user input
        let framework = "technology"; // Default to technology-centered
        for (const key in this.worldBuildingFrameworks) {
            if (userInput.toLowerCase().includes(key)) {
                framework = key;
                break;
            }
        }
        
        // Get the appropriate subgenre features
        const subgenre = this.state.sciFiSubgenre in this.sciFiSubgenres ? 
            this.state.sciFiSubgenre : "space_opera"; // Default to space opera
        
        const subgenreInfo = this.sciFiSubgenres[subgenre];
        
        return `# ${subgenreInfo.name} World-Building Framework

In a complete implementation with an AI model and science fiction expertise, I would create a richly detailed and internally consistent world based on your specifications, using the principles of ${this.worldBuildingFrameworks[framework].name} world-building.

## World Concept

A unique ${subgenreInfo.name} setting featuring:
- [Primary world concept would be developed here]
- [Distinctive setting elements]
- [Central conflicts or tensions]
- [Key technological or social innovations]

## Essential Elements

### Physical Environment
- **Setting**: [Would describe planetary systems, habitats, or environments]
- **Geography**: [Would detail landscapes, territories, or spatial organization]
- **Natural Resources**: [Would identify critical resources and their distribution]
- **Environmental Challenges**: [Would explain key environmental pressures or hazards]

### Technological Framework
- **Key Technologies**: [Would describe the defining technologies of this world]
- **Technology Access**: [Would explain who has access to different technologies]
- **Technological Limitations**: [Would identify constraints or costs of technologies]
- **Tech Development**: [Would outline how technology is developed and by whom]

### Social Structures
- **Power Systems**: [Would describe governance and authority structures]
- **Social Organization**: [Would explain class systems or social groupings]
- **Economic Systems**: [Would detail how resources are produced and distributed]
- **Cultural Elements**: [Would identify key cultural features and variations]

## World History
- **Origin Story**: [Would explain how this world came to be]
- **Pivotal Events**: [Would describe events that shaped the current situation]
- **Historical Tensions**: [Would identify ongoing conflicts with historical roots]
- **Future Trajectory**: [Would suggest where this world is heading]

## Distinctive Features

### ${subgenreInfo.name} Elements
${subgenreInfo.commonElements.map(element => `- ${element}`).join('\n')}

### Thematic Exploration
- [Would identify central themes this world examines]
- [Would describe philosophical questions the setting raises]
- [Would explain social commentary elements]

## Story Potential
- **Central Conflicts**: [Would suggest primary tensions driving narratives]
- **Character Opportunities**: [Would identify interesting roles within this world]
- **Narrative Hooks**: [Would provide compelling starting points for stories]

Would you like me to develop any specific aspect of this world in more detail? Or would you prefer to refine the overall concept in a particular direction?`;
    }
    
    /**
     * Create a sci-fi character based on user input
     * @param {string} userInput - User's input
     * @returns {string} Sci-fi character description
     */
    createSciFiCharacter(userInput) {
        // Determine the appropriate character archetype based on user input
        let archetype = "hero"; // Default to hero
        for (const key in this.characterArchetypes) {
            if (userInput.toLowerCase().includes(key)) {
                archetype = key;
                break;
            }
        }
        
        // Get the appropriate subgenre features
        const subgenre = this.state.sciFiSubgenre in this.sciFiSubgenres ? 
            this.state.sciFiSubgenre : "space_opera"; // Default to space opera
        
        const subgenreInfo = this.sciFiSubgenres[subgenre];
        const archetypeInfo = this.characterArchetypes[archetype];
        
        return `# ${archetypeInfo.name} Character for ${subgenreInfo.name} Setting

In a complete implementation with an AI model and science fiction character development expertise, I would create a complex, nuanced character fitting the ${archetypeInfo.name} archetype for a ${subgenreInfo.name} story world.

## Character Concept

A compelling ${archetypeInfo.name} character featuring:
- [Primary character concept would be developed here]
- [Distinctive personality elements]
- [Central motivations or drives]
- [Key relationships or connections]

## Character Profile

### Background
- **Origins**: [Where and how this character began]
- **Formative Experiences**: [Critical events that shaped the character]
- **Education/Training**: [Relevant skills acquisition and background]
- **Past Achievements/Failures**: [Significant history that affects present]

### Personality
- **Core Traits**: [Fundamental personality characteristics]
- **Values & Beliefs**: [What the character holds as important]
- **Flaws & Blind Spots**: [Weaknesses and limitations]
- **Unique Perspectives**: [How they view the world differently]

### Abilities & Resources
- **Skills**: [What they can do exceptionally well]
- **Technology Access**: [Tools, equipment, or enhancements they possess]
- **Social Capital**: [Relationships and connections they can leverage]
- **Special Abilities**: [Unique capabilities beyond ordinary]

## External Elements

### Relationships
- **Allies**: [Who supports this character and why]
- **Adversaries**: [Who opposes this character and why]
- **Complicated Relationships**: [Connections with mixed loyalty or feelings]
- **Missing Connections**: [Relationships the character lacks or has lost]

### Goals & Conflicts
- **Short-term Objectives**: [Immediate aims]
- **Long-term Ambitions**: [Ultimate goals]
- **External Obstacles**: [Challenges from the environment or others]
- **Internal Struggles**: [Personal conflicts or contradictions]

## ${subgenreInfo.name} Elements

### Genre-Specific Traits
${archetypeInfo.sciFiTraits.map(trait => `- ${trait}`).join('\n')}

### Subgenre Integration
- [How the character embodies elements of ${subgenreInfo.name}]
- [Relationship to technologies or concepts specific to the subgenre]
- [Role within typical subgenre conflicts or situations]

## Character Development Arc
- **Starting Point**: [Initial state and situation]
- **Growth Potential**: [How the character might evolve]
- **Transformative Moments**: [Possible turning points]
- **End State**: [Potential resolution or destination]

Would you like me to develop any specific aspect of this character in more detail? Or would you prefer guidance on how to effectively write this character in scenes?`;
    }
    
    /**
     * Design a future technology based on user input
     * @param {string} userInput - User's input
     * @returns {string} Future technology description
     */
    designFutureTechnology(userInput) {
        // Determine the appropriate technology category based on user input
        let category = "transportation"; // Default to transportation
        for (const key in this.futureTechnologies) {
            if (userInput.toLowerCase().includes(key)) {
                category = key;
                break;
            }
        }
        
        // Select a technology concept from the category (or a generic placeholder)
        let techConcept = null;
        if (this.futureTechnologies[category] && this.futureTechnologies[category].length > 0) {
            techConcept = this.futureTechnologies[category][Math.floor(Math.random() * this.futureTechnologies[category].length)];
        }
        
        // Get the appropriate subgenre features
        const subgenre = this.state.sciFiSubgenre in this.sciFiSubgenres ? 
            this.state.sciFiSubgenre : "hard_scifi"; // Default to hard sci-fi for tech design
        
        const subgenreInfo = this.sciFiSubgenres[subgenre];
        
        if (techConcept) {
            return `# Future Technology Concept: ${techConcept.name}

In a complete implementation with an AI model and science fiction technology design expertise, I would create a detailed, plausible technological concept appropriate for a ${subgenreInfo.name} setting, with consideration of scientific principles and societal implications.

## Technology Overview

${techConcept.description}

## Technical Specifications

### Functionality
- **Core Mechanisms**: [How the technology fundamentally works]
- **Energy Requirements**: [Power source and consumption patterns]
- **Physical Components**: [Key materials and structures]
- **Performance Parameters**: [Capabilities and limitations]

### Development Timeline
- **Prerequisite Technologies**: [What would need to be developed first]
- **Development Stages**: [Critical milestones in perfecting this tech]
- **Estimated Timeline**: [When this might become viable]
- **Key Breakthroughs Needed**: [Scientific advancements required]

## Societal Implications

### Transformative Effects
${techConcept.implications.map(implication => `- ${implication}`).join('\n')}

### Potential Challenges
- **Ethical Concerns**: [Moral questions raised by this technology]
- **Regulatory Issues**: [How society might need to control this tech]
- **Distribution Problems**: [Issues of access and inequality]
- **Unexpected Consequences**: [Second and third-order effects]

## Integration in ${subgenreInfo.name}

### Genre Applications
- [How this technology would feature in stories of this subgenre]
- [Conflicts or plots it might enable]
- [Character types who might use or create this technology]
- [Thematic elements it could explore]

## Narrative Potential
- **Central Conflicts**: [Story tensions this technology could create]
- **Character Opportunities**: [Roles centered around this technology]
- **Worldbuilding Elements**: [How this technology shapes its world]
- **Thematic Exploration**: [Philosophical questions it raises]

Would you like me to focus on any particular aspect of this technology? I could develop the scientific principles in more detail, explore additional societal implications, or describe how it might feature in a specific type of story.`;
        } else {
            // Generic technology concept if no specific one is selected
            return `# Future Technology Concept

In a complete implementation with an AI model and science fiction technology design expertise, I would create a detailed, plausible technological concept appropriate for a ${subgenreInfo.name} setting, with consideration of scientific principles and societal implications.

## Technology Overview

[Would provide a concise description of a revolutionary ${category} technology]

## Technical Specifications

### Functionality
- **Core Mechanisms**: [How the technology fundamentally works]
- **Energy Requirements**: [Power source and consumption patterns]
- **Physical Components**: [Key materials and structures]
- **Performance Parameters**: [Capabilities and limitations]

### Development Timeline
- **Prerequisite Technologies**: [What would need to be developed first]
- **Development Stages**: [Critical milestones in perfecting this tech]
- **Estimated Timeline**: [When this might become viable]
- **Key Breakthroughs Needed**: [Scientific advancements required]

## Societal Implications

### Transformative Effects
- [Primary social changes this technology would create]
- [Economic disruptions or opportunities]
- [Cultural shifts resulting from this technology]
- [Environmental impacts, positive and negative]

### Potential Challenges
- **Ethical Concerns**: [Moral questions raised by this technology]
- **Regulatory Issues**: [How society might need to control this tech]
- **Distribution Problems**: [Issues of access and inequality]
- **Unexpected Consequences**: [Second and third-order effects]

## Integration in ${subgenreInfo.name}

### Genre Applications
- [How this technology would feature in stories of this subgenre]
- [Conflicts or plots it might enable]
- [Character types who might use or create this technology]
- [Thematic elements it could explore]

## Narrative Potential
- **Central Conflicts**: [Story tensions this technology could create]
- **Character Opportunities**: [Roles centered around this technology]
- **Worldbuilding Elements**: [How this technology shapes its world]
- **Thematic Exploration**: [Philosophical questions it raises]

Would you like me to focus on any particular aspect of this technology? I could develop the scientific principles in more detail, explore additional societal implications, or describe how it might feature in a specific type of story.`;
        }
    }
    
    /**
     * Develop a sci-fi plot based on user input
     * @param {string} userInput - User's input
     * @returns {string} Sci-fi plot description
     */
    developSciFiPlot(userInput) {
        // Determine the appropriate theme based on user input
        let theme = "technological_consequences"; // Default theme
        for (const key in this.sciFiThemes) {
            if (userInput.toLowerCase().includes(key)) {
                theme = key;
                break;
            }
        }
        
        // Get the appropriate subgenre features
        const subgenre = this.state.sciFiSubgenre in this.sciFiSubgenres ? 
            this.state.sciFiSubgenre : "space_opera"; // Default to space opera
        
        const subgenreInfo = this.sciFiSubgenres[subgenre];
        const themeInfo = this.sciFiThemes[theme];
        
        return `# ${subgenreInfo.name} Plot Concept with ${themeInfo.name} Theme

In a complete implementation with an AI model and science fiction narrative expertise, I would create a detailed, compelling plot outline for a ${subgenreInfo.name} story exploring the theme of ${themeInfo.name}.

## Story Premise

[Would provide a compelling high-concept premise that combines the selected subgenre and theme]

## Central Conflict

### External Conflict
- **Primary Tension**: [The main external problem or challenge]
- **Stakes**: [What will be lost if the protagonists fail]
- **Opposition**: [Forces working against the protagonists]
- **Escalation**: [How the conflict intensifies]

### Internal Conflict
- **Character Struggles**: [Personal challenges faced by key characters]
- **Ethical Dilemmas**: [Moral choices without clear answers]
- **Identity Questions**: [How characters' sense of self is challenged]
- **Relationship Tensions**: [Interpersonal conflicts that complicate the external problem]

## Key Plot Points

### Act One: Setup
- **Normal World**: [Starting situation before disruption]
- **Inciting Incident**: [Event that launches the main story]
- **First Decision**: [Protagonist's choice to engage with the problem]
- **Point of No Return**: [Moment after which they cannot go back]

### Act Two: Confrontation
- **Rising Action**: [Challenges that test the protagonists]
- **Midpoint Twist**: [Significant revelation or reversal]
- **Complications**: [New problems that arise from earlier decisions]
- **Darkest Moment**: [Point of greatest failure or despair]

### Act Three: Resolution
- **New Approach**: [Changed strategy based on what's been learned]
- **Climactic Sequence**: [Final confrontation with the primary conflict]
- **Resolution**: [Outcome of the central struggle]
- **New Normal**: [How the world or characters have changed]

## Thematic Exploration

### ${themeInfo.name}
${themeInfo.questions.map(question => `- ${question}`).join('\n')}

### Subgenre Elements
- [How the plot incorporates key elements of ${subgenreInfo.name}]
- [Ways the subgenre's conventions are upheld or subverted]
- [Signature moments that exemplify the subgenre]

## Character Arcs

### Protagonist
- **Starting State**: [Character's initial situation and mindset]
- **Challenge**: [How the plot forces growth or change]
- **Transformation**: [How they evolve through the story]
- **End State**: [Where they finish psychologically]

### Supporting Characters
- [Brief outlines of key secondary character arcs]
- [How they complement or contrast with the protagonist]
- [Their role in exploring different facets of the theme]

Would you like me to expand on any particular section of this plot outline? Or would you prefer guidance on developing specific scenes or plot points?`;
    }
    
    /**
     * Create an alien species based on user input
     * @param {string} userInput - User's input
     * @returns {string} Alien species description
     */
    createAlienSpecies(userInput) {
        // Get the appropriate subgenre features
        const subgenre = this.state.sciFiSubgenre in this.sciFiSubgenres ? 
            this.state.sciFiSubgenre : "first_contact"; // Default to first contact for alien creation
        
        const subgenreInfo = this.sciFiSubgenres[subgenre];
        
        return `# Alien Species Design

In a complete implementation with an AI model and science fiction worldbuilding expertise, I would create a detailed, scientifically plausible alien species with unique biology, psychology, and culture suitable for a ${subgenreInfo.name} narrative.

## Species Overview

[Would provide a compelling description of the species' general appearance and notable features]

## Biology

### Physical Characteristics
- **Morphology**: [Body structure and organization]
- **Size Range**: [Typical dimensions and mass]
- **Sensory Systems**: [How they perceive their environment]
- **Locomotion**: [How they move and navigate]

### Physiology
- **Metabolic Process**: [Energy production and consumption]
- **Respiratory System**: [Breathing or equivalent]
- **Circulatory System**: [Distribution of nutrients and waste removal]
- **Reproductive Method**: [How they produce offspring]

### Evolutionary History
- **Home Environment**: [Native habitat and its challenges]
- **Evolutionary Pressures**: [Forces that shaped their development]
- **Adaptive Features**: [Specific traits evolved for survival]
- **Genetic Diversity**: [Variation within the species]

## Psychology & Cognition

### Mental Processes
- **Cognitive Structure**: [How they think and process information]
- **Perception of Time**: [How they experience temporal progression]
- **Emotional Range**: [Feelings or equivalent states]
- **Consciousness Type**: [Nature of awareness and self-concept]

### Communication
- **Primary Mode**: [How they exchange information]
- **Language Structure**: [Organization of communication systems]
- **Non-verbal Elements**: [Physical or other signals]
- **Communication with Humans**: [Challenges and possibilities]

## Society & Culture

### Social Organization
- **Group Structures**: [How they organize socially]
- **Hierarchy Systems**: [Power and status distribution]
- **Life Cycle Roles**: [How responsibilities change with age/development]
- **Decision-making Process**: [How collective choices are made]

### Cultural Elements
- **Value System**: [What they consider important]
- **Art/Expression Forms**: [Creative or communicative practices]
- **Rituals/Traditions**: [Significant repeated behaviors]
- **Technological Development**: [Level and focus of technology]

## Relationship with Humans

### Contact Potential
- **Communication Barriers**: [Challenges in mutual understanding]
- **Biological Compatibility**: [Shared environment possibilities]
- **Value Conflicts**: [Potential sources of misunderstanding]
- **Cooperation Opportunities**: [Areas of potential mutual benefit]

### Narrative Roles
- [Potential story functions this species could serve]
- [How they might challenge or complement human characters]
- [Thematic elements they could help explore]

## Integration in ${subgenreInfo.name}

- [How this species fits within the conventions of the subgenre]
- [Story possibilities they enable within this context]
- [Unique perspective they bring to typical subgenre scenarios]

Would you like me to develop any specific aspect of this alien species in more detail? Or would you prefer guidance on how to effectively portray this species in narrative?`;
    }
    
    /**
     * Develop a future scenario based on user input
     * @param {string} userInput - User's input
     * @returns {string} Future scenario description
     */
    developFutureScenario(userInput) {
        // Determine approximate timeframe from input
        let timeframe = "near_future"; // Default to near future (next 50-100 years)
        if (/\b(?:distant|far|remote)\s+future\b/i.test(userInput) || /\b(?:millennia|millenniums|millennium|thousands|million|millions|billions)\b/i.test(userInput)) {
            timeframe = "distant_future";
        } else if (/\b(?:medium|intermediate|mid)\s+future\b/i.test(userInput) || /\b(?:centuries|century|hundreds)\b/i.test(userInput)) {
            timeframe = "medium_future";
        }
        
        // Get specific year if mentioned
        let yearMatch = userInput.match(/\b(20\d\d|2\d{3}|3\d{3}|4\d{3})\b/);
        let specificYear = yearMatch ? yearMatch[1] : null;
        
        // Get the appropriate subgenre features
        const subgenre = this.state.sciFiSubgenre in this.sciFiSubgenres ? 
            this.state.sciFiSubgenre : "cyberpunk"; // Default to cyberpunk for future scenarios
        
        const subgenreInfo = this.sciFiSubgenres[subgenre];
        
        return `# Future Scenario: ${specificYear ? `Earth in ${specificYear}` : timeframe === "near_future" ? "Earth 2050-2150" : timeframe === "medium_future" ? "Earth 2150-3000" : "Earth 3000+"}

In a complete implementation with an AI model and futurism expertise, I would create a detailed, plausible scenario of future human civilization, incorporating scientific, technological, social, and environmental projections.

## World Overview

[Would provide a compelling overview of this future Earth and/or human expansion beyond it]

## Technological Landscape

### Dominant Technologies
- [Key technologies that define daily life]
- [How they've evolved from current technologies]
- [Their impact on human capabilities and limitations]

### Technology Access
- [How technology is distributed across populations]
- [Digital or technological divides]
- [Regulation and control systems]

## Social Organization

### Political Structures
- [Forms of governance that have emerged]
- [Power distribution and decision-making]
- [International or interplanetary relations]

### Economic Systems
- [How resources are produced and distributed]
- [Work, labor, and occupation patterns]
- [Economic inequality or abundance dynamics]

### Social Dynamics
- [Family structures and social units]
- [Community organization]
- [Identity and diversity elements]

## Environmental Context

### Earth's Condition
- [Climate and ecosystem status]
- [Human adaptation to environmental changes]
- [Resource availability and management]

### Human Habitats
- [Where and how people live]
- [Urban design and infrastructure]
- [Off-Earth settlements if applicable]

## Human Experience

### Daily Life
- [Routines and activities of average people]
- [Entertainment and leisure]
- [Education and information systems]

### Psychological Landscape
- [Common worldviews and values]
- [Mental health and cognitive patterns]
- [Spiritual or philosophical frameworks]

## Historical Context

### Path to This Future
- [Key events that led to this scenario]
- [Turning points and critical decisions]
- [Gradual vs. disruptive changes]

### Ongoing Tensions
- [Unresolved conflicts or challenges]
- [Emerging problems or threats]
- [Competing visions for the future]

## Integration in ${subgenreInfo.name}

- [How this future scenario embodies elements of ${subgenreInfo.name}]
- [Story possibilities within this setting]
- [Character types that would emerge in this world]

Would you like me to develop any specific aspect of this future scenario in more detail? Or would you prefer to explore particular story possibilities within this setting?`;
    }
    
    /**
     * Extrapolate scientific concepts based on user input
     * @param {string} userInput - User's input
     * @returns {string} Scientific extrapolation
     */
    extrapolateScience(userInput) {
        // Get the appropriate subgenre features
        const subgenre = this.state.sciFiSubgenre in this.sciFiSubgenres ? 
            this.state.sciFiSubgenre : "hard_scifi"; // Default to hard sci-fi for scientific extrapolation
        
        const subgenreInfo = this.sciFiSubgenres[subgenre];
        
        return `# Scientific Concept Extrapolation

In a complete implementation with an AI model and scientific expertise, I would provide a detailed exploration of how current scientific principles might evolve into speculative future technologies or discoveries appropriate for ${subgenreInfo.name} fiction.

## Concept Foundation

[Would identify the scientific concept being extrapolated and its current understanding]

## Theoretical Expansion

### Current Limitations
- [Scientific barriers currently preventing advancement]
- [Theoretical constraints within established frameworks]
- [Technological limitations to exploration or implementation]

### Speculative Breakthroughs
- [Potential discoveries that could transform understanding]
- [Theoretical models that might replace current paradigms]
- [Unexpected connections with other scientific domains]

### Extended Principles
- [How established laws might apply in extreme conditions]
- [Mathematical formulations of expanded concepts]
- [Reconciliation with other scientific frameworks]

## Technological Applications

### Near-Term Possibilities
- [Technologies that could emerge within decades]
- [Practical applications of theoretical advances]
- [Integration with existing technological systems]

### Distant Possibilities
- [Revolutionary applications once the science matures]
- [Transformative implementations beyond current imagination]
- [Civilizational impacts of fully realized technology]

## Scientific Methodology

### Investigation Approaches
- [How future scientists might explore these concepts]
- [Experimental designs that could yield breakthroughs]
- [Observational opportunities from new vantage points]

### Verification Challenges
- [Difficulties in testing theoretical predictions]
- [Competing interpretations of data]
- [Technological needs for conclusive experimentation]

## Narrative Integration in ${subgenreInfo.name}

### Story Opportunities
- [Plot possibilities enabled by this scientific concept]
- [Character types who would work with this science]
- [Conflicts arising from its development or application]

### Worldbuilding Elements
- [How this science would shape a fictional world]
- [Societal implications of its existence]
- [Ethical questions it would raise]

### Scientific Authenticity
- [How to present the concept plausibly]
- [Balancing accuracy with narrative needs]
- [Common misconceptions to avoid]

Would you like me to focus on a specific aspect of this scientific extrapolation? Or would you prefer guidance on incorporating these concepts effectively into a narrative?`;
    }
    
    /**
     * Examine a sci-fi trope based on user input
     * @param {string} userInput - User's input
     * @returns {string} Sci-fi trope examination
     */
    examineSciFiTrope(userInput) {
        // Get the appropriate subgenre features
        const subgenre = this.state.sciFiSubgenre in this.sciFiSubgenres ? 
            this.state.sciFiSubgenre : "general"; // Default to general for trope examination
        
        const subgenreInfo = this.sciFiSubgenres[subgenre] || { name: "Science Fiction", commonElements: [] };
        
        return `# Science Fiction Trope Analysis

In a complete implementation with an AI model and science fiction expertise, I would provide a detailed analysis of a specific sci-fi trope, its history, variations, and effective usage in contemporary fiction.

## Trope Overview

[Would identify and define the specific trope being examined]

## Historical Development

### Origins
- [When and where this trope first appeared]
- [Original context and meaning]
- [Early notable examples]

### Evolution
- [How the trope has changed over time]
- [Significant variations that emerged]
- [Response to cultural or scientific developments]

### Current Status
- [Contemporary perception of the trope]
- [Whether it's considered fresh, tired, or subverted]
- [Recent notable examples]

## Trope Analysis

### Narrative Function
- [Story purposes this trope typically serves]
- [Plot structures it tends to support]
- [Character development it often enables]

### Thematic Elements
- [Ideas and concepts the trope often explores]
- [Philosophical questions it typically raises]
- [Social or political commentary it frequently carries]

### Scientific Basis
- [Connection to actual scientific principles, if any]
- [Plausibility assessment]
- [Scientific misconceptions it might perpetuate]

## Creative Application

### Using the Trope Effectively
- [How to keep the trope fresh and engaging]
- [Ways to subvert or reinvent expectations]
- [Balancing familiarity with innovation]

### Common Pitfalls
- [Overused aspects to avoid]
- [Logical inconsistencies to address]
- [Problematic implications to consider]

### Integration in ${subgenreInfo.name}
- [How this trope functions specifically in this subgenre]
- [Subgenre-specific variations]
- [Compatibility with subgenre conventions]

## Notable Examples

### Classic Utilization
- [Influential works that defined the trope]
- [What made these examples effective]
- [Their lasting impact on the genre]

### Innovative Approaches
- [Works that successfully reinvented the trope]
- [Techniques they employed for fresh takes]
- [Lessons for contemporary writers]

Would you like me to examine a specific aspect of this trope in more detail? Or would you prefer guidance on how to effectively implement or subvert this trope in your own writing?`;
    }
    
    /**
     * Generate a sci-fi story based on user input
     * @param {string} userInput - User's input
     * @returns {string} Sci-fi story
     */
    generateSciFiStory(userInput) {
        // Get the appropriate subgenre features
        const subgenre = this.state.sciFiSubgenre in this.sciFiSubgenres ? 
            this.state.sciFiSubgenre : "space_opera"; // Default to space opera
        
        const subgenreInfo = this.sciFiSubgenres[subgenre];
        
        // Determine a theme based on user input or default
        let theme = "technological_consequences"; // Default theme
        for (const key in this.sciFiThemes) {
            if (userInput.toLowerCase().includes(key)) {
                theme = key;
                break;
            }
        }
        
        const themeInfo = this.sciFiThemes[theme];
        
        return `# ${subgenreInfo.name} Story Concept

In a complete implementation with an AI model and science fiction writing expertise, I would create a detailed story concept or short narrative in the ${subgenreInfo.name} subgenre, exploring the theme of ${themeInfo.name}.

## Story Premise

[Would provide a compelling high-concept premise combining the selected subgenre and theme]

## Setting

### World Context
- [Key aspects of the story world]
- [Technological, social, or environmental features]
- [Relevant history or background]

### Immediate Environment
- [Specific setting for the main action]
- [Atmospheric elements and sensory details]
- [How the environment influences the story]

## Characters

### Protagonist
- [Main character description and situation]
- [Key motivations and conflicts]
- [Special abilities or limitations]

### Supporting Characters
- [Important secondary characters]
- [Their relationship to the protagonist]
- [Their function in the narrative]

### Antagonistic Forces
- [What opposes the protagonist]
- [Why this opposition exists]
- [Stakes of the conflict]

## Plot Outline

### Opening Situation
- [Starting point of the story]
- [Introduction of protagonist and setting]
- [Initial status quo]

### Inciting Incident
- [Event that disrupts the status quo]
- [How it affects the protagonist]
- [Initial response to the disruption]

### Rising Complications
- [Escalating challenges]
- [Raising of stakes]
- [Deepening of character involvement]

### Climactic Sequence
- [Final confrontation or decision point]
- [How theme comes to fruition]
- [Resolution of primary conflict]

## Thematic Exploration

### ${themeInfo.name}
- [How the story specifically explores this theme]
- [Questions it raises about the theme]
- [Perspective it offers on the theme]

### ${subgenreInfo.name} Elements
${subgenreInfo.commonElements.slice(0, 3).map(element => `- [How the story incorporates ${element}]`).join('\n')}

## Narrative Style

### Tone and Mood
- [Emotional atmosphere of the story]
- [Stylistic approach to the narrative]
- [Reader experience the story aims to create]

### Perspective
- [Point of view from which the story is told]
- [Limitations or advantages of this perspective]
- [What this perspective reveals or conceals]

Would you like me to develop any specific aspect of this story concept in more detail? Or would you prefer a different approach to this particular combination of subgenre and theme?`;
    }
    
    /**
     * Get sci-fi writing suggestions based on user interaction
     * @param {string} requestType - Type of sci-fi request
     * @returns {Array<string>} Sci-fi writing suggestions
     */
    getSciFiSuggestions(requestType) {
        const suggestions = [];
        
        // Add type-specific suggestions
        if (requestType === "world_building") {
            suggestions.push("Create a cyberpunk city of the future");
            suggestions.push("Design a post-apocalyptic society");
            suggestions.push("Build a plausible alien homeworld");
        } else if (requestType === "character_creation") {
            suggestions.push("Create a complex AI character");
            suggestions.push("Design a genetically enhanced human protagonist");
            suggestions.push("Develop an alien character with unique psychology");
        } else if (requestType === "technology_design") {
            suggestions.push("Design a plausible faster-than-light drive");
            suggestions.push("Create a near-future neural interface technology");
            suggestions.push("Develop a unique energy source for a space civilization");
        } else if (requestType === "plot_development") {
            suggestions.push("Develop a first contact story premise");
            suggestions.push("Create a plot involving time travel paradoxes");
            suggestions.push("Design a storyline about human-AI relationships");
        } else if (requestType === "alien_creation") {
            suggestions.push("Design a non-carbon-based alien life form");
            suggestions.push("Create an alien species with a hive mind");
            suggestions.push("Develop a scientifically plausible aquatic alien");
        } else if (requestType === "future_scenario") {
            suggestions.push("Envision Earth in 2150");
            suggestions.push("Describe a multi-planetary human civilization");
            suggestions.push("Create a post-scarcity economy scenario");
        } else if (requestType === "scientific_extrapolation") {
            suggestions.push("Extrapolate the future of quantum computing");
            suggestions.push("Explore the possibilities of consciousness transfer");
            suggestions.push("Develop speculative applications of genetic engineering");
        } else if (requestType === "trope_examination") {
            suggestions.push("Analyze the 'uploaded consciousness' trope");
            suggestions.push("Discuss ways to subvert the 'evil AI' trope");
            suggestions.push("Explore fresh approaches to alien invasion stories");
        } else if (requestType === "story_generation") {
            suggestions.push("Generate a hard sci-fi short story premise");
            suggestions.push("Create a space opera adventure concept");
            suggestions.push("Develop a cyberpunk heist story idea");
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "How would you design a realistic alien ecosystem?",
                "What technologies might exist in 500 years?",
                "Create a unique form of interstellar communication",
                "Design a plausible cybernetic enhancement system",
                "Develop a new type of space habitat",
                "How might human society evolve on Mars?",
                "What are some interesting applications of nanotechnology?"
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
     * Add a character to the project
     * @param {Object} character - Character to add
     * @returns {boolean} Success status
     */
    addCharacter(character) {
        if (!character) return false;
        
        // Add character to the project
        this.state.characters.push(character);
        
        // Save updated characters
        this.savePreferences({ characters: this.state.characters });
        return true;
    }
    
    /**
     * Add a technology to the project
     * @param {Object} technology - Technology to add
     * @returns {boolean} Success status
     */
    addTechnology(technology) {
        if (!technology) return false;
        
        // Add technology to the project
        this.state.technologies.push(technology);
        
        // Save updated technologies
        this.savePreferences({ technologies: this.state.technologies });
        return true;
    }
    
    /**
     * Add a plot point to the project
     * @param {Object} plotPoint - Plot point to add
     * @returns {boolean} Success status
     */
    addPlotPoint(plotPoint) {
        if (!plotPoint) return false;
        
        // Add plot point to the project
        this.state.plotPoints.push(plotPoint);
        
        // Save updated plot points
        this.savePreferences({ plotPoints: this.state.plotPoints });
        return true;
    }
    
    /**
     * Set current project
     * @param {string} projectName - Project name
     * @returns {boolean} Success status
     */
    setCurrentProject(projectName) {
        if (!projectName) return false;
        
        // Set current project
        this.state.currentProject = projectName;
        
        // Save updated current project
        this.savePreferences({ currentProject: projectName });
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
            currentProject: this.state.currentProject,
            sciFiSubgenre: this.state.sciFiSubgenre,
            characterCount: this.state.characters.length,
            technologyCount: this.state.technologies.length,
            plotPointCount: this.state.plotPoints.length,
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
    window.jaatAIModes.sciFiWriter = new SciFiWriterMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SciFiWriterMode;
}
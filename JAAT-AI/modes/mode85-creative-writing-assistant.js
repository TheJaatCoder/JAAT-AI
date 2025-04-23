/**
 * JAAT-AI Mode: Creative Writing Assistant
 * 
 * Specialized mode for assisting with creative writing projects,
 * including story development, character creation, plot structuring,
 * and overcoming writer's block.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const CreativeWritingAssistantMode = {
  id: 'creative-writing-assistant',
  name: 'Creative Writing Assistant',
  icon: 'pen-fancy',
  description: 'Tools and guidance for fiction writing and storytelling.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Creative Writing Assistant mode, a specialized assistant for writers working on fiction and creative projects. You help with all aspects of the creative writing process, from initial idea generation to refining a completed draft.

Key characteristics:
1. You provide thoughtful guidance on story structure, character development, setting, dialogue, and other narrative elements
2. You can generate creative ideas, scenes, and descriptions tailored to a writer's preferences
3. You understand various narrative techniques, literary devices, and genre conventions
4. You can identify potential issues in narratives and suggest improvements
5. You offer constructive, balanced feedback that respects the writer's voice and vision
6. You can help overcome writer's block and generate fresh perspectives on projects
7. You adapt your suggestions to different genres, styles, and target audiences

When helping writers, focus on empowering their creative process rather than simply providing solutions. Balance encouragement with constructive critique, and tailor your advice to their specific needs, whether that's developing a coherent plot, creating believable characters, or polishing their prose.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "I need help developing a character for my fantasy novel.",
    "Can you give me ideas for a plot twist in my thriller?",
    "What's a good way to start a romance story?",
    "Help me create a science fiction world with unique characteristics.",
    "I'm stuck on my story - can you help me overcome this writer's block?",
    "What are some techniques for writing effective dialogue?",
    "How can I make my villain character more complex and interesting?",
    "I need help with descriptive writing for a forest setting.",
    "What are the key elements of the mystery genre I should include?",
    "Can you help me outline the three-act structure for my story idea?"
  ],
  
  // Story structures
  storyStructures: [
    {
      id: 'three-act',
      name: 'Three-Act Structure',
      description: 'The classic beginning, middle, end structure with specific turning points that's commonly used in novels and screenplays',
      components: [
        {
          name: 'Act 1: Setup (25%)',
          description: 'Introduces characters, setting, and the ordinary world before presenting an inciting incident that disrupts this world',
          elements: [
            'Introduction of protagonist in their ordinary world',
            'Establishment of setting, tone, and story world',
            'Inciting incident (the event that starts the story)',
            'First turning point/threshold (protagonist commits to the journey)'
          ]
        },
        {
          name: 'Act 2: Confrontation (50%)',
          description: 'The protagonist faces obstacles, develops new skills, and deals with escalating conflict',
          elements: [
            'Rising action and escalating complications',
            'Development of subplots and relationships',
            'Midpoint (significant event that raises the stakes)',
            'Trials, allies, and enemies appear',
            'Second turning point/low point (protagonist faces their greatest setback)'
          ]
        },
        {
          name: 'Act 3: Resolution (25%)',
          description: 'The protagonist makes a final push toward their goal, faces the climactic challenge, and the story concludes',
          elements: [
            'Protagonist regroups and makes a new plan',
            'Climax (final confrontation with the main obstacle/antagonist)',
            'Resolution of the main conflict',
            'Denouement (loose ends tied up, new normal established)'
          ]
        }
      ],
      examples: [
        'Star Wars: A New Hope',
        'The Hunger Games',
        'Pride and Prejudice',
        'Most Hollywood films'
      ]
    },
    {
      id: 'heros-journey',
      name: 'Hero's Journey',
      description: 'A 12-stage transformational arc followed by a protagonist, based on Joseph Campbell's monomyth theory',
      components: [
        {
          name: 'Departure',
          description: 'The hero leaves the ordinary world and embarks on their adventure',
          elements: [
            'Ordinary World (establishes the hero's normal life)',
            'Call to Adventure (challenge or quest presents itself)',
            'Refusal of the Call (hero initially hesitates)',
            'Meeting the Mentor (guidance figure appears)',
            'Crossing the Threshold (hero commits to the adventure)'
          ]
        },
        {
          name: 'Initiation',
          description: 'The hero faces trials, meets allies and enemies, and undergoes transformation',
          elements: [
            'Tests, Allies, and Enemies (hero faces challenges and builds a team)',
            'Approach to the Inmost Cave (preparation for major challenge)',
            'Ordeal (central crisis where hero faces greatest fear)',
            'Reward (hero obtains something valuable from the ordeal)'
          ]
        },
        {
          name: 'Return',
          description: 'The hero returns to the ordinary world transformed',
          elements: [
            'The Road Back (hero begins journey back to ordinary world)',
            'Resurrection (final and most dangerous encounter)',
            'Return with the Elixir (hero brings something of value back)'
          ]
        }
      ],
      examples: [
        'The Lord of the Rings',
        'The Lion King',
        'Harry Potter series',
        'The Matrix'
      ]
    },
    {
      id: 'save-the-cat',
      name: 'Save the Cat',
      description: 'A 15-beat structure popularized by screenwriter Blake Snyder that creates a clear, marketable story blueprint',
      components: [
        {
          name: 'Act 1',
          description: 'Setting the stage and introducing the characters and situation',
          elements: [
            'Opening Image (first impression of the story world)',
            'Theme Stated (what your story is really about)',
            'Setup (introduce main characters and their flaws)',
            'Catalyst (inciting incident that disrupts normal life)',
            'Debate (protagonist questions whether to proceed)'
          ]
        },
        {
          name: 'Act 2',
          description: 'The protagonist pursues their goal while facing increasingly difficult challenges',
          elements: [
            'Break into Two (protagonist decides to take action)',
            'B Story (subplot, often involving a relationship)',
            'Fun and Games (the "promise of the premise")',
            'Midpoint (raises the stakes, shifts from reactive to proactive)',
            'Bad Guys Close In (antagonistic forces gain strength)',
            'All Is Lost (protagonist's lowest point)',
            'Dark Night of the Soul (protagonist faces their internal crisis)'
          ]
        },
        {
          name: 'Act 3',
          description: 'Resolution and transformation',
          elements: [
            'Break into Three (protagonist finds the solution)',
            'Finale (protagonist proves they've changed and solves the problem)',
            'Final Image (mirror of opening image, showing transformation)'
          ]
        }
      ],
      examples: [
        'Wonder Woman',
        'Legally Blonde',
        'Toy Story',
        'Many modern blockbusters'
      ]
    },
    {
      id: 'seven-point',
      name: 'Seven-Point Structure',
      description: 'A flexible framework focused on key turning points in a story',
      components: [
        {
          name: 'Hook',
          description: 'Introduces the protagonist and their starting situation',
          elements: [
            'Establish protagonist's normal world',
            'Set initial stakes',
            'Create a compelling opening scene',
            'Hint at the story's larger conflict'
          ]
        },
        {
          name: 'Plot Turn 1',
          description: 'An event that pushes the protagonist in a new direction',
          elements: [
            'Something unexpected happens',
            'Protagonist is forced to act',
            'Story takes its first major turn',
            'New goal becomes apparent'
          ]
        },
        {
          name: 'Pinch Point 1',
          description: 'Introduction of pressure, often revealing the antagonistic force',
          elements: [
            'First real encounter with opposition',
            'Clear glimpse of the antagonist's power',
            'Raises the stakes',
            'Creates new complications'
          ]
        },
        {
          name: 'Midpoint',
          description: 'The protagonist transitions from reacting to being proactive',
          elements: [
            'Major revelation or shift in understanding',
            'Character changes from reactive to proactive',
            'Story often changes direction',
            'New determination or commitment'
          ]
        },
        {
          name: 'Pinch Point 2',
          description: 'Increased pressure, often leaving the protagonist at their lowest',
          elements: [
            'Antagonistic forces press harder',
            'Things fall apart',
            'Protagonist loses something valuable',
            'Seems like all hope is lost'
          ]
        },
        {
          name: 'Plot Turn 2',
          description: 'The protagonist gains what they need to succeed',
          elements: [
            'New information, tool, or insight discovered',
            'Character growth enables new approach',
            'A surprising ally or solution appears',
            'Final plan comes together'
          ]
        },
        {
          name: 'Resolution',
          description: 'The protagonist confronts the main conflict and reaches a conclusion',
          elements: [
            'Final confrontation with the main challenge',
            'Character's arc completes',
            'Main storylines resolved',
            'New status quo established'
          ]
        }
      ],
      examples: [
        'Brandon Sanderson's novels',
        'The Martian',
        'Many fantasy and science fiction series'
      ]
    },
    {
      id: 'freytags-pyramid',
      name: 'Freytag's Pyramid',
      description: 'A classic five-act structure originally developed for analyzing Greek and Shakespearean drama',
      components: [
        {
          name: 'Exposition',
          description: 'Introduces characters, setting, and background information',
          elements: [
            'Establish main characters',
            'Introduce setting and time period',
            'Provide necessary background',
            'Set up the initial situation'
          ]
        },
        {
          name: 'Rising Action',
          description: 'Series of events that build tension and complexity',
          elements: [
            'Introduction of conflict',
            'Complications arise',
            'Obstacles for the protagonist',
            'Stakes increase progressively'
          ]
        },
        {
          name: 'Climax',
          description: 'The turning point or highest point of tension in the story',
          elements: [
            'Moment of greatest tension',
            'Point of no return',
            'Character makes a crucial decision',
            'Decisive confrontation occurs'
          ]
        },
        {
          name: 'Falling Action',
          description: 'Events following the climax that lead toward resolution',
          elements: [
            'Consequences of the climax play out',
            'Pace slows down',
            'Conflicts begin to resolve',
            'Character deals with aftermath'
          ]
        },
        {
          name: 'Denouement',
          description: 'Final resolution and tying up of loose ends',
          elements: [
            'Final outcome revealed',
            'Loose ends tied up',
            'Characters' fates established',
            'Return to stability or new normal'
          ]
        }
      ],
      examples: [
        'Romeo and Juliet',
        'Oedipus Rex',
        'Macbeth',
        'Many classic novels and plays'
      ]
    }
  ],
  
  // Character development frameworks
  characterFrameworks: [
    {
      id: 'want-need',
      name: 'Want vs. Need',
      description: 'A framework focusing on the contrast between what a character consciously desires versus what they unconsciously require for growth',
      components: [
        {
          name: 'Want (External Goal)',
          description: 'What the character consciously believes will bring them happiness or satisfaction',
          prompts: [
            'What concrete goal is your character actively pursuing?',
            'Why does your character believe this will solve their problems?',
            'What visible actions is your character taking to achieve this?',
            'What would "success" look like to your character at the start?',
            'How does this want drive the external plot?'
          ]
        },
        {
          name: 'Need (Internal Goal)',
          description: 'What the character actually requires for true growth or fulfillment',
          prompts: [
            'What emotional or psychological growth does your character require?',
            'What truth does your character fail to recognize about themselves?',
            'What past wound or belief is holding your character back?',
            'How does this need relate to the story's theme?',
            'How might they resist acknowledging this need?'
          ]
        },
        {
          name: 'Conflict Between Want and Need',
          description: 'How these two goals create tension and drive character development',
          prompts: [
            'How does pursuing the want prevent fulfilling the need?',
            'What crisis forces the character to recognize the distinction?',
            'At what point does your character realize their want won't satisfy them?',
            'How does the character change when they address their true need?',
            'Does your character ultimately achieve their want, their need, both, or neither?'
          ]
        }
      ],
      examples: [
        'In "The Great Gatsby," Gatsby wants Daisy but needs to let go of his idealized past',
        'In "Inside Out," Riley wants to return to Minnesota but needs to accept change and express her feelings',
        'In "A Christmas Carol," Scrooge wants wealth but needs human connection and redemption'
      ]
    },
    {
      id: 'character-arc',
      name: 'Transformational Character Arc',
      description: 'A progression showing how a character changes through their journey, often moving from a flawed state to growth',
      components: [
        {
          name: 'Starting State (Character with Flaw)',
          description: 'How the character begins the story, typically with a limiting belief or flaw',
          prompts: [
            'What misbelief does your character hold at the beginning?',
            'How does this belief limit or hurt your character?',
            'What coping mechanisms has your character developed?',
            'How is your character's worldview incomplete or flawed?',
            'What past experiences shaped this limiting belief?'
          ]
        },
        {
          name: 'Tests and Challenges',
          description: 'Events that challenge the character's flawed perspective',
          prompts: [
            'What early incidents reveal the cost of the character's flaw?',
            'What allies or mentors begin to challenge their worldview?',
            'How does the character initially resist change?',
            'What small shifts in awareness begin to occur?',
            'What secondary characters might reflect different approaches?'
          ]
        },
        {
          name: 'Crisis of Belief',
          description: 'The moment when the character's worldview is shattered',
          prompts: [
            'What major event forces the character to question their belief?',
            'How does clinging to their flaw lead to a significant failure?',
            'What is at stake if they don't change?',
            'What emotion dominates this moment of crisis?',
            'How does this crisis relate to the story's external conflict?'
          ]
        },
        {
          name: 'New Understanding',
          description: 'The character gains insight and begins to change',
          prompts: [
            'What truth replaces the character's misbelief?',
            'How does this realization change their approach?',
            'What sacrifice does embracing this truth require?',
            'Who helps the character see this new perspective?',
            'How does this shift connect to the story's theme?'
          ]
        },
        {
          name: 'Final State (Character Growth)',
          description: 'How the character demonstrates their transformation',
          prompts: [
            'How does the character demonstrate their new belief through action?',
            'What choice proves they've truly changed?',
            'How has their relationship with others transformed?',
            'What final challenge tests their growth?',
            'How is their new state more fulfilled or authentic?'
          ]
        }
      ],
      examples: [
        'In "A Star is Born," Ally moves from insecurity to embracing her authentic voice',
        'In "Groundhog Day," Phil transforms from selfish cynic to compassionate community member',
        'In "The Wizard of Oz," Dorothy shifts from dreaming of escape to appreciating home'
      ]
    },
    {
      id: 'enneagram',
      name: 'Enneagram Character Types',
      description: 'A system of nine interconnected personality types that can inform consistent character behavior and growth paths',
      components: [
        {
          name: 'Type 1: The Perfectionist',
          description: 'Principled, purposeful, self-controlled, and perfectionistic',
          prompts: [
            'How does your character's inner critic manifest?',
            'What standards do they hold themselves and others to?',
            'What causes them to become judgmental or rigid?',
            'How might they grow toward acceptance and grace?',
            'What childhood experiences formed their sense of right and wrong?'
          ]
        },
        {
          name: 'Type 2: The Helper',
          description: 'Generous, demonstrative, people-pleasing, and possessive',
          prompts: [
            'How does your character anticipate others' needs?',
            'When does their helpfulness become manipulative?',
            'What are they avoiding by focusing on others?',
            'How might they grow toward setting boundaries?',
            'What happens when they feel unappreciated?'
          ]
        },
        {
          name: 'Type 3: The Achiever',
          description: 'Success-oriented, pragmatic, adaptive, and image-conscious',
          prompts: [
            'What achievements define your character's self-worth?',
            'How do they adapt their identity for different audiences?',
            'What failure would devastate them most?',
            'How might they grow toward authenticity?',
            'What lies beneath their polished exterior?'
          ]
        },
        {
          name: 'Type 4: The Individualist',
          description: 'Sensitive, introspective, expressive, and temperamental',
          prompts: [
            'How does your character express their uniqueness?',
            'What feelings of deficiency or envy drive them?',
            'How do they romanticize what's absent in their life?',
            'How might they grow toward emotional balance?',
            'What art or expression reflects their inner world?'
          ]
        },
        {
          name: 'Type 5: The Investigator',
          description: 'Perceptive, innovative, secretive, and isolated',
          prompts: [
            'How does your character guard their energy and resources?',
            'What knowledge or expertise defines them?',
            'How do they detach from emotions?',
            'How might they grow toward engagement?',
            'What would tempt them out of their comfort zone?'
          ]
        },
        {
          name: 'Type 6: The Loyalist',
          description: 'Committed, security-oriented, engaging, and defensive',
          prompts: [
            'What fears or worst-case scenarios preoccupy your character?',
            'Who or what do they trust as an authority?',
            'How do they prepare for possible threats?',
            'How might they grow toward self-reliance?',
            'When do they question their own judgment?'
          ]
        },
        {
          name: 'Type 7: The Enthusiast',
          description: 'Spontaneous, versatile, acquisitive, and scattered',
          prompts: [
            'How does your character seek pleasure and avoid pain?',
            'What new experiences are they constantly chasing?',
            'How do they avoid commitment or limitations?',
            'How might they grow toward depth and focus?',
            'What happens when they face negative emotions?'
          ]
        },
        {
          name: 'Type 8: The Challenger',
          description: 'Self-confident, decisive, confrontational, and dominating',
          prompts: [
            'How does your character exert control over their environment?',
            'What personal boundaries are most important to them?',
            'Who do they feel protective toward?',
            'How might they grow toward vulnerability?',
            'When are they most likely to intimidate others?'
          ]
        },
        {
          name: 'Type 9: The Peacemaker',
          description: 'Receptive, reassuring, agreeable, and complacent',
          prompts: [
            'How does your character avoid conflict or asserting themselves?',
            'What perspectives or people do they try to merge with?',
            'How do they numb themselves to their own priorities?',
            'How might they grow toward decisive action?',
            'When do they become passive-aggressive?'
          ]
        }
      ],
      examples: [
        'Type 1: Hermione Granger (Harry Potter), Javert (Les Misérables)',
        'Type 2: Molly Weasley (Harry Potter), Melanie Hamilton (Gone with the Wind)',
        'Type 3: Gatsby (The Great Gatsby), Don Draper (Mad Men)',
        'Type 4: Jane Eyre (Jane Eyre), Edward Scissorhands',
        'Type 5: Sherlock Holmes, Dr. Manhattan (Watchmen)',
        'Type 6: Hamlet (Shakespeare), Katniss Everdeen (The Hunger Games)',
        'Type 7: Tony Stark (Marvel), Tigger (Winnie the Pooh)',
        'Type 8: Scarlett O'Hara (Gone with the Wind), Imperator Furiosa (Mad Max)',
        'Type 9: Forrest Gump, Bilbo Baggins (pre-adventure)'
      ]
    },
    {
      id: 'motivations',
      name: 'Motivation-Reaction Units',
      description: 'A micro-level framework for crafting realistic character behavior in scene sequences',
      components: [
        {
          name: 'External Motivation (Stimulus)',
          description: 'Something that happens outside the character that demands a response',
          prompts: [
            'What sensory event occurs that the character notices?',
            'Is this stimulus threatening, puzzling, or promising?',
            'Is this stimulus caused by another character or the environment?',
            'What precise details would the character notice first?',
            'How unexpected is this stimulus to the character?'
          ]
        },
        {
          name: 'Internal Reaction',
          description: 'The character's involuntary emotional and physical response',
          prompts: [
            'What immediate emotion does the character feel?',
            'What automatic physical response occurs (heart racing, flinching, etc.)?',
            'What instantaneous sensations run through their body?',
            'What reflexive expression might cross their face?',
            'How strong is this involuntary reaction?'
          ]
        },
        {
          name: 'Internal Rationalization',
          description: 'The character's thoughts as they process what happened',
          prompts: [
            'What goes through the character's mind as they interpret this event?',
            'How do they rationalize or explain what just happened?',
            'What questions immediately form in their thoughts?',
            'How does their background or personality color this interpretation?',
            'What decisions are they weighing internally?'
          ]
        },
        {
          name: 'External Action',
          description: 'The deliberate action the character takes in response',
          prompts: [
            'What visible action does the character decide to take?',
            'What do they say or communicate in response?',
            'How does this action reflect their personality and goals?',
            'Is their response proportional to the stimulus?',
            'How does this action create a new situation or stimulus?'
          ]
        }
      ],
      examples: [
        'Stimulus: A branch snaps loudly in the dark forest behind the character',
        'Internal reaction: Her heart leaps into her throat, and a cold shiver runs down her spine',
        'Rationalization: It could be the killer they've been warning about, or just an animal',
        'Action: She quickens her pace while trying to appear calm, one hand slipping into her pocket to grip her keys'
      ]
    }
  ],
  
  // World building elements
  worldBuildingElements: [
    {
      name: 'Physical Environment',
      description: 'The natural and constructed setting where your story takes place',
      elements: [
        {
          name: 'Geography',
          description: 'The physical landscape and features of your world',
          prompts: [
            'What kind of terrain dominates your world (mountains, deserts, islands, forests, etc.)?',
            'What is the climate and how does it affect daily life?',
            'What natural resources are abundant or scarce?',
            'What natural phenomena or disasters occur in this world?',
            'How do geographical features create natural borders or boundaries?'
          ]
        },
        {
          name: 'Built Environment',
          description: 'The structures and spaces created by the inhabitants',
          prompts: [
            'What architectural styles characterize different regions or cultures?',
            'How do buildings reflect available materials, climate, and cultural values?',
            'What are the most important locations or buildings in your world?',
            'How do people arrange living spaces (cities, villages, nomadic, etc.)?',
            'What infrastructure exists for transportation, water, waste, etc.?'
          ]
        },
        {
          name: 'Flora and Fauna',
          description: 'The plants and animals of your world',
          prompts: [
            'What plants and animals are common in this world?',
            'Are there any unique or magical creatures or plants?',
            'How have humans (or other intelligent species) domesticated or utilized organisms?',
            'What organisms are dangerous, valuable, or sacred?',
            'How do plants and animals adapt to the environment?'
          ]
        },
        {
          name: 'Sensory Elements',
          description: 'How the world feels to inhabitants through their senses',
          prompts: [
            'What are the characteristic sounds of different locations?',
            'What smells would a visitor notice first?',
            'What textures are common in clothing, buildings, and nature?',
            'What colors dominate different environments or cultural spaces?',
            'How does the light change throughout the day or seasons?'
          ]
        }
      ]
    },
    {
      name: 'Cultural Elements',
      description: 'The shared beliefs, practices, and social structures of your world's inhabitants',
      elements: [
        {
          name: 'Social Organization',
          description: 'How society is structured and organized',
          prompts: [
            'What social classes or groups exist and how permeable are they?',
            'How is political power distributed and maintained?',
            'What family structures and kinship systems are common?',
            'How are gender, age, and other identities socially constructed?',
            'What institutions organize social life (guilds, churches, schools, etc.)?'
          ]
        },
        {
          name: 'Belief Systems',
          description: 'Religious, philosophical, and moral frameworks',
          prompts: [
            'What religions or spiritual beliefs exist in this world?',
            'What creation myths or origin stories are told?',
            'What philosophies guide ethical thinking and behavior?',
            'How do people understand death and the afterlife?',
            'What superstitions or folk beliefs influence daily life?'
          ]
        },
        {
          name: 'Arts and Expression',
          description: 'Creative and communicative practices',
          prompts: [
            'What art forms are most valued or popular?',
            'What languages are spoken and how do they differ?',
            'What stories, songs, or performances are culturally important?',
            'How do people record and transmit information?',
            'What symbols hold special meaning for different groups?'
          ]
        },
        {
          name: 'Daily Life',
          description: 'Routines, customs, and everyday experiences',
          prompts: [
            'What foods do people eat and how are they prepared?',
            'What clothing styles indicate profession, status, or cultural identity?',
            'What rituals or ceremonies mark important life transitions?',
            'What games, sports, or entertainment are popular?',
            'What is considered polite or rude in social interactions?'
          ]
        }
      ]
    },
    {
      name: 'Historical Elements',
      description: 'The past events that shaped your world into its present state',
      elements: [
        {
          name: 'Timeline',
          description: 'The sequence of significant events in your world's history',
          prompts: [
            'What major eras divide your world's history?',
            'What key events transformed society or the environment?',
            'What wars, disasters, or conflicts shaped current tensions?',
            'What golden ages or dark times do people remember?',
            'How accurate is historical knowledge, and who controls the narrative?'
          ]
        },
        {
          name: 'Legacy Systems',
          description: 'Traditions, laws, or structures inherited from the past',
          prompts: [
            'What ancient laws or customs still influence modern life?',
            'What borders or territories reflect historical disputes?',
            'What abandoned or repurposed structures remain from earlier eras?',
            'What historical grievances still affect current relationships?',
            'What traditions have lost their original meaning but persist?'
          ]
        },
        {
          name: 'Technology and Knowledge',
          description: 'The development and distribution of tools and information',
          prompts: [
            'What is the overall technological level of your world?',
            'How evenly is technology or knowledge distributed?',
            'What innovations have most changed society?',
            'What knowledge has been lost, hidden, or forbidden?',
            'How do people feel about technological change?'
          ]
        },
        {
          name: 'Mythic Elements',
          description: 'The blending of history, legend, and cultural memory',
          prompts: [
            'What legendary figures are celebrated or reviled?',
            'What historical events have been mythologized?',
            'What prophecies or predictions influence current behavior?',
            'What relics or artifacts hold historical and cultural significance?',
            'How do different groups interpret shared historical events?'
          ]
        }
      ]
    },
    {
      name: 'Power Dynamics',
      description: 'The systems and relationships that determine who has control and influence',
      elements: [
        {
          name: 'Governance',
          description: 'How formal authority and control are structured',
          prompts: [
            'What form(s) of government exist (monarchy, democracy, etc.)?',
            'How are laws created, enforced, and adjudicated?',
            'How do people gain and lose political power?',
            'What tensions exist between different levels of authority?',
            'How corrupt or functional are governmental institutions?'
          ]
        },
        {
          name: 'Economic Systems',
          description: 'How resources are produced, distributed, and exchanged',
          prompts: [
            'What goods and services are most valuable?',
            'How is wealth measured and stored?',
            'What occupations are prestigious or despised?',
            'Who controls resources and means of production?',
            'What trade relationships exist between regions?'
          ]
        },
        {
          name: 'Conflict Patterns',
          description: 'How disputes and differing interests are addressed',
          prompts: [
            'What issues most commonly lead to conflict?',
            'How are interpersonal disputes typically resolved?',
            'What groups are in tension or outright conflict?',
            'How is violence viewed, regulated, and employed?',
            'What peace-making mechanisms or traditions exist?'
          ]
        },
        {
          name: 'Marginalized Groups',
          description: 'Those with less power and their relationship to dominant groups',
          prompts: [
            'What groups have limited access to rights or resources?',
            'How do marginalized groups advocate for themselves?',
            'What prejudices or stereotypes affect social interactions?',
            'What underground or alternative systems have developed?',
            'How is dissent expressed and handled?'
          ]
        }
      ]
    },
    {
      name: 'Speculative Elements',
      description: 'The aspects that differ from our real world, particularly in fantasy and science fiction',
      elements: [
        {
          name: 'Magic or Advanced Technology',
          description: 'Systems that extend beyond current real-world capabilities',
          prompts: [
            'How does magic or advanced technology function in your world?',
            'Who has access to these powers or technologies?',
            'What limitations or costs are associated with their use?',
            'How are practitioners or experts trained and organized?',
            'How do these elements integrate with other aspects of society?'
          ]
        },
        {
          name: 'Nonhuman Species',
          description: 'Intelligent beings other than humans',
          prompts: [
            'What intelligent species exist besides humans?',
            'How do their biology and psychology differ from humans?',
            'What relationships exist between different species?',
            'How do nonhuman cultures and societies function?',
            'What communication challenges or opportunities arise?'
          ]
        },
        {
          name: 'Alternate Physics or Natural Laws',
          description: 'Ways in which your world's basic rules differ from reality',
          prompts: [
            'What natural laws work differently in your world?',
            'How do these differences affect environment and daily life?',
            'How do inhabitants understand and explain these phenomena?',
            'What technological or cultural adaptations have developed?',
            'What would be impossible in your world that is possible in ours?'
          ]
        },
        {
          name: 'Speculative Timeline',
          description: 'How your world diverged from our actual history',
          prompts: [
            'What point of divergence created this alternate world?',
            'What historical events happened differently or never occurred?',
            'How has technology developed along a different path?',
            'What familiar elements remain despite the differences?',
            'How aware are inhabitants of the divergence (if applicable)?'
          ]
        }
      ]
    }
  ],
  
  // Writer's block solutions
  writersBlockSolutions: [
    {
      problem: 'Perfectionism',
      description: 'Getting stuck because you're trying to make everything perfect in the first draft',
      strategies: [
        {
          name: 'Permission to Write Badly',
          description: 'Embrace the concept of a rough first draft',
          technique: 'Write at the top of your document: "This is a rough draft. It's supposed to be imperfect." Set a timer for 15 minutes and write without stopping, even if you think what you're writing is terrible. Focus on getting ideas down rather than finding the perfect words.'
        },
        {
          name: 'The Placeholder Technique',
          description: 'Use temporary markers for elements you'll refine later',
          technique: 'When you struggle with a perfect description or dialogue, write [BETTER DESCRIPTION NEEDED] or [IMPROVE THIS DIALOGUE] and continue with the story. This maintains momentum while acknowledging areas for improvement later.'
        },
        {
          name: 'Hemingway's Advice',
          description: 'Stop writing when you know what happens next',
          technique: 'End your writing session at a point where you know exactly what comes next, rather than at the completion of a scene or chapter. This creates momentum for your next session and prevents perfectionism from bringing progress to a halt.'
        }
      ]
    },
    {
      problem: 'Uncertainty About Direction',
      description: 'Not knowing where your story should go next',
      strategies: [
        {
          name: 'The What-If Exercise',
          description: 'Generate multiple possibilities',
          technique: 'Write "What if..." at the top of a page, then list at least 10 possibilities for what could happen next, from the predictable to the wildly unexpected. Don't judge your ideas until you've completed the list. Then select the option that creates the most interesting conflict or character development.'
        },
        {
          name: 'Character Decision Method',
          description: 'Let your character decide the direction',
          technique: 'Write a short interior monologue from your protagonist's perspective about the situation they're in. What do they want right now? What are they afraid of? What would they naturally do next based on their personality and motivations? Let their voice guide the next steps.'
        },
        {
          name: 'Backward Planning',
          description: 'Work from a known endpoint',
          technique: 'If you know where your story eventually needs to end up but are unsure of the path, start by writing down your intended ending. Then ask, "What would need to happen right before this?" Continue working backward, creating a trail of breadcrumbs that you can then follow forward in your writing.'
        }
      ]
    },
    {
      problem: 'Middle of the Story Slump',
      description: 'Losing momentum in the middle sections of your draft',
      strategies: [
        {
          name: 'The Complications Technique',
          description: 'Deliberately make things worse for your characters',
          technique: 'List three ways to complicate your protagonist's situation: a new obstacle, a betrayal, a misunderstanding, a time constraint, or an unexpected consequence of their previous actions. Implement the complication that creates the most compelling conflict or reveals the most about your character.'
        },
        {
          name: 'Scene Purpose Clarification',
          description: 'Ensure every scene drives the story forward',
          technique: 'For the scene you're stuck on, explicitly identify its purpose by completing this statement: "This scene is necessary because it _______." If you can't complete the statement with something that advances plot or character development, consider cutting or replacing the scene with one that has clearer purpose.'
        },
        {
          name: 'Change of Scenery',
          description: 'Move your characters to a fresh location',
          technique: 'List three unexpected locations where your next scene could occur. Choose the location that creates the most interesting dynamics or forces characters into revealing interactions. New settings often spark fresh dialogue and conflict possibilities.'
        }
      ]
    },
    {
      problem: 'Character Voice Issues',
      description: 'Struggling to make characters sound distinct or authentic',
      strategies: [
        {
          name: 'Character Interview',
          description: 'Develop voice through conversation',
          technique: 'Write a mock interview with your character, asking them about their opinions, background, hopes, and fears. Don't plan their answers; let them emerge naturally as you write. Pay attention to speech patterns, vocabulary choices, and attitudes that emerge, then incorporate these elements into your story.'
        },
        {
          name: 'The Journaling Method',
          description: 'Write private entries from your character's perspective',
          technique: 'Write a diary or journal entry from your character about a significant event in their past or their feelings about the current story situation. Focus on capturing their unique perspective and voice rather than advancing the plot.'
        },
        {
          name: 'Character Conversation Exercise',
          description: 'Explore how different characters discuss the same topic',
          technique: 'Choose a neutral topic (a recent storm, a local festival, a popular food) and write a short paragraph of dialogue for each main character expressing their view on it. Focus on making each response reveal something about the character through their word choice, concerns, or perspective.'
        }
      ]
    },
    {
      problem: 'Overplanning Paralysis',
      description: 'Getting stuck in endless research or planning without actual writing',
      strategies: [
        {
          name: 'Research Time Box',
          description: 'Set strict limits on non-writing activities',
          technique: 'Designate specific, limited time slots for research or planning (e.g., 30 minutes), followed by mandatory writing time (e.g., 60 minutes). Use a timer to enforce these boundaries. If you encounter something that needs research during writing time, insert a placeholder note and continue writing.'
        },
        {
          name: 'The Bridge Scene Method',
          description: 'Connect known elements with placeholder scenes',
          technique: 'If you know points A and Z of your story but are overwhelmed by planning everything in between, write a short connecting scene or summary that bridges the gap. This "good enough for now" approach keeps you moving forward while acknowledging that you'll develop fuller scenes later.'
        },
        {
          name: 'Just One Step',
          description: 'Focus only on the immediate next action',
          technique: 'Instead of trying to solve your entire plot, focus exclusively on the next scene. What is the single next event that must happen? Write only that scene without worrying about how it connects to everything else. Often, clarity about subsequent steps emerges through the writing itself.'
        }
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="writing-assistant-interface">
      <div class="writing-header">
        <div class="writing-icon">
          <i class="fas fa-pen-fancy"></i>
        </div>
        <div class="writing-title">
          <h2>Creative Writing Assistant</h2>
          <p>Tools and guidance for fiction writing and storytelling</p>
        </div>
      </div>
      
      <div class="story-structure">
        <div class="section-header">
          <h3>Story Structure Models</h3>
          <p>Frameworks to help organize your narrative</p>
        </div>
        
        <div class="structure-cards">
          <!-- Structure cards will be dynamically generated -->
        </div>
        
        <div class="selected-structure hidden" id="selected-structure">
          <div class="selected-structure-header">
            <h4 id="structure-name">Three-Act Structure</h4>
            <button id="back-to-structures" class="back-button">
              <i class="fas fa-arrow-left"></i> Back to Structures
            </button>
          </div>
          
          <div class="structure-description" id="structure-description">
            <!-- Selected structure description will be loaded here -->
          </div>
          
          <div class="structure-components" id="structure-components">
            <!-- Structure components will be loaded here -->
          </div>
          
          <div class="structure-examples" id="structure-examples">
            <!-- Structure examples will be loaded here -->
          </div>
        </div>
      </div>
      
      <div class="character-development">
        <div class="section-header">
          <h3>Character Development</h3>
          <p>Tools for creating complex, believable characters</p>
        </div>
        
        <div class="character-framework-tabs">
          <button class="framework-tab active" data-framework="want-need">Want vs. Need</button>
          <button class="framework-tab" data-framework="character-arc">Character Arc</button>
          <button class="framework-tab" data-framework="enneagram">Enneagram Types</button>
          <button class="framework-tab" data-framework="motivations">Motivation-Reaction</button>
        </div>
        
        <div class="framework-content" id="framework-content">
          <!-- Framework content will be loaded here -->
        </div>
      </div>
      
      <div class="world-building">
        <div class="section-header">
          <h3>World Building Guide</h3>
          <p>Create detailed, immersive fictional worlds</p>
        </div>
        
        <div class="world-elements">
          <div class="elements-accordion" id="world-accordion">
            <!-- World building elements will be loaded here -->
          </div>
        </div>
      </div>
      
      <div class="writers-block">
        <div class="section-header">
          <h3>Writer's Block Solutions</h3>
          <p>Practical techniques for overcoming common writing obstacles</p>
        </div>
        
        <div class="block-problems">
          <!-- Writer's block problems will be dynamically generated -->
        </div>
      </div>
      
      <div class="story-idea-generator">
        <div class="section-header">
          <h3>Story Idea Generator</h3>
          <p>Spark your creativity with random combinations</p>
        </div>
        
        <div class="generator-form">
          <div class="generator-options">
            <div class="option-group">
              <label for="genre-select">Genre</label>
              <select id="genre-select">
                <option value="any">Any Genre</option>
                <option value="fantasy">Fantasy</option>
                <option value="scifi">Science Fiction</option>
                <option value="mystery">Mystery/Thriller</option>
                <option value="romance">Romance</option>
                <option value="historical">Historical Fiction</option>
                <option value="contemporary">Contemporary</option>
                <option value="horror">Horror</option>
                <option value="adventure">Adventure</option>
              </select>
            </div>
            
            <div class="option-group">
              <label for="character-type">Character Type</label>
              <select id="character-type">
                <option value="any">Any Character</option>
                <option value="hero">Unlikely Hero</option>
                <option value="villain">Sympathetic Villain</option>
                <option value="outcast">Social Outcast</option>
                <option value="expert">Skilled Expert</option>
                <option value="royal">Royal/Noble</option>
                <option value="ordinary">Ordinary Person</option>
                <option value="supernatural">Supernatural Being</option>
              </select>
            </div>
            
            <div class="option-group">
              <label for="conflict-type">Conflict Type</label>
              <select id="conflict-type">
                <option value="any">Any Conflict</option>
                <option value="external">External Threat</option>
                <option value="internal">Internal Struggle</option>
                <option value="relationship">Relationship Conflict</option>
                <option value="society">Society Conflict</option>
                <option value="nature">Nature/Survival</option>
                <option value="technology">Technology Gone Wrong</option>
                <option value="supernatural">Supernatural Crisis</option>
              </select>
            </div>
          </div>
          
          <button id="generate-idea-btn" class="primary-btn">
            <i class="fas fa-random"></i> Generate Story Idea
          </button>
        </div>
        
        <div class="generated-idea hidden" id="generated-idea">
          <!-- Generated idea will appear here -->
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .writing-assistant-interface {
      background: linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(20, 184, 166, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(6, 182, 212, 0.2);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .writing-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .writing-icon {
      font-size: 2.5rem;
      color: #06b6d4;
      margin-right: 1rem;
    }
    
    .writing-title h2 {
      color: #06b6d4;
      margin-bottom: 0.3rem;
    }
    
    .writing-title p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .section-header {
      margin-bottom: 1.25rem;
    }
    
    .section-header h3 {
      color: #f3f4f6;
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }
    
    .section-header p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .story-structure, .character-development, .world-building, .writers-block, .story-idea-generator {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    /* Story Structure Cards */
    .structure-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .structure-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .structure-card:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(6, 182, 212, 0.3);
    }
    
    .structure-card-title {
      color: #06b6d4;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .structure-card-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .structure-card-examples {
      color: #94a3b8;
      font-size: 0.85rem;
      font-style: italic;
    }
    
    /* Selected Structure View */
    .selected-structure-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }
    
    .selected-structure-header h4 {
      color: #f3f4f6;
      font-size: 1.1rem;
    }
    
    .back-button {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      color: #e2e8f0;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .back-button:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .structure-description {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
      color: #e2e8f0;
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
    }
    
    .structure-components {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }
    
    .component-item {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
    }
    
    .component-title {
      color: #06b6d4;
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .component-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .element-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .element-item {
      padding-left: 1.25rem;
      position: relative;
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    .element-item:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #06b6d4;
    }
    
    .structure-examples {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
    }
    
    .examples-title {
      color: #f3f4f6;
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
    }
    
    .examples-list {
      color: #cbd5e1;
      font-size: 0.9rem;
      font-style: italic;
    }
    
    /* Character Framework Tabs */
    .character-framework-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.5);
      padding-bottom: 1rem;
    }
    
    .framework-tab {
      background: rgba(15, 23, 42, 0.6);
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1rem;
      color: #e2e8f0;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .framework-tab:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .framework-tab.active {
      background: rgba(6, 182, 212, 0.2);
      color: #06b6d4;
    }
    
    /* Framework Content */
    .framework-content {
      color: #e2e8f0;
    }
    
    .framework-description {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
      color: #e2e8f0;
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
    }
    
    .framework-sections {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }
    
    .framework-section {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
    }
    
    .section-name {
      color: #06b6d4;
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .section-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .prompt-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .prompt-item {
      padding-left: 1.25rem;
      position: relative;
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    .prompt-item:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #06b6d4;
    }
    
    .framework-examples {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
    }
    
    .examples-title {
      color: #f3f4f6;
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
    }
    
    /* World Building Accordion */
    .elements-accordion {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .accordion-item {
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .accordion-header {
      background: rgba(15, 23, 42, 0.6);
      padding: 1rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    
    .accordion-title {
      color: #f3f4f6;
      font-size: 1rem;
      font-weight: 500;
    }
    
    .accordion-icon i {
      color: #06b6d4;
      transition: transform 0.3s ease;
    }
    
    .accordion-content {
      background: rgba(15, 23, 42, 0.4);
      padding: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
    }
    
    .accordion-content.active {
      padding: 1.25rem;
      max-height: 1000px;
    }
    
    .accordion-header.active .accordion-icon i {
      transform: rotate(180deg);
    }
    
    .element-category {
      margin-bottom: 1rem;
    }
    
    .element-category:last-child {
      margin-bottom: 0;
    }
    
    .category-name {
      color: #06b6d4;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .category-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    /* Writer's Block Solutions */
    .block-problems {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .block-problem {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .problem-header {
      background: rgba(30, 41, 59, 0.7);
      padding: 1rem 1.25rem;
      cursor: pointer;
    }
    
    .problem-title {
      color: #f3f4f6;
      font-size: 1rem;
      font-weight: 500;
    }
    
    .problem-description {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-top: 0.3rem;
    }
    
    .problem-strategies {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.25rem;
    }
    
    .strategy-item {
      border-left: 2px solid #06b6d4;
      padding-left: 1rem;
    }
    
    .strategy-name {
      color: #06b6d4;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    
    .strategy-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .strategy-technique {
      color: #e2e8f0;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    /* Story Idea Generator */
    .generator-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      align-items: center;
    }
    
    .generator-options {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 1rem;
      width: 100%;
    }
    
    .option-group {
      flex: 1;
      min-width: 200px;
    }
    
    .option-group label {
      display: block;
      color: #e2e8f0;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .option-group select {
      width: 100%;
      padding: 0.75rem;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-radius: 6px;
      color: #e2e8f0;
      font-size: 0.95rem;
    }
    
    .primary-btn {
      background: #06b6d4;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 0.5rem;
    }
    
    .primary-btn:hover {
      background: #0891b2;
      transform: translateY(-2px);
    }
    
    .generated-idea {
      margin-top: 1.5rem;
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
    }
    
    .idea-title {
      color: #06b6d4;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    
    .idea-description {
      color: #e2e8f0;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .idea-elements {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    
    .idea-element {
      background: rgba(6, 182, 212, 0.15);
      border-radius: 20px;
      padding: 0.4rem 0.75rem;
      color: #22d3ee;
      font-size: 0.85rem;
    }
    
    .idea-actions {
      display: flex;
      justify-content: center;
      margin-top: 1.25rem;
    }
    
    .action-btn {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-radius: 6px;
      padding: 0.6rem 1rem;
      color: #e2e8f0;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .action-btn:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Current state
  currentState: {
    selectedStructure: null,
    selectedFramework: 'want-need'
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Creative Writing Assistant Mode');
    
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
      chatInput.placeholder = "Ask for writing guidance, story ideas, or feedback...";
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
    
    // Populate structure cards
    this.populateStructureCards(container);
    
    // Populate world building accordion
    this.populateWorldAccordion(container);
    
    // Populate writer's block solutions
    this.populateWritersBlockSolutions(container);
    
    // Add event listeners
    this.addEventListeners(container);
    
    // Initialize with default character framework
    this.showCharacterFramework(container, this.currentState.selectedFramework);
  },
  
  // Populate structure cards
  populateStructureCards: function(container) {
    const structureCards = container.querySelector('.structure-cards');
    if (!structureCards) return;
    
    // Clear existing content
    structureCards.innerHTML = '';
    
    // Add structure cards
    this.storyStructures.forEach(structure => {
      const card = document.createElement('div');
      card.className = 'structure-card';
      card.dataset.structure = structure.id;
      
      // Limit examples to first two for brevity
      const exampleList = structure.examples.slice(0, 2).join(', ');
      
      card.innerHTML = `
        <div class="structure-card-title">${structure.name}</div>
        <div class="structure-card-description">${structure.description}</div>
        <div class="structure-card-examples">Examples: ${exampleList}</div>
      `;
      
      // Add event listener
      card.addEventListener('click', () => {
        this.showStructureDetails(container, structure.id);
      });
      
      structureCards.appendChild(card);
    });
  },
  
  // Populate world building accordion
  populateWorldAccordion: function(container) {
    const accordion = container.querySelector('#world-accordion');
    if (!accordion) return;
    
    // Clear existing content
    accordion.innerHTML = '';
    
    // Add accordion items
    this.worldBuildingElements.forEach(element => {
      const item = document.createElement('div');
      item.className = 'accordion-item';
      
      // Create header
      const header = document.createElement('div');
      header.className = 'accordion-header';
      header.innerHTML = `
        <div class="accordion-title">${element.name}</div>
        <div class="accordion-icon">
          <i class="fas fa-chevron-down"></i>
        </div>
      `;
      
      // Create content
      const content = document.createElement('div');
      content.className = 'accordion-content';
      
      // Add description
      let contentHtml = `<div class="element-description">${element.description}</div>`;
      
      // Add each sub-element category
      element.elements.forEach(subElement => {
        contentHtml += `
          <div class="element-category">
            <div class="category-name">${subElement.name}</div>
            <div class="category-description">${subElement.description}</div>
            <div class="prompt-list">
              ${subElement.prompts.map(prompt => `
                <div class="prompt-item">${prompt}</div>
              `).join('')}
            </div>
          </div>
        `;
      });
      
      content.innerHTML = contentHtml;
      
      // Add event listener to toggle
      header.addEventListener('click', function() {
        this.classList.toggle('active');
        content.classList.toggle('active');
      });
      
      // Add to accordion
      item.appendChild(header);
      item.appendChild(content);
      accordion.appendChild(item);
    });
  },
  
  // Populate writer's block solutions
  populateWritersBlockSolutions: function(container) {
    const blockProblems = container.querySelector('.block-problems');
    if (!blockProblems) return;
    
    // Clear existing content
    blockProblems.innerHTML = '';
    
    // Add problem sections
    this.writersBlockSolutions.forEach(problem => {
      const problemElement = document.createElement('div');
      problemElement.className = 'block-problem';
      
      // Create header
      const header = document.createElement('div');
      header.className = 'problem-header';
      header.innerHTML = `
        <div class="problem-title">${problem.problem}</div>
        <div class="problem-description">${problem.description}</div>
      `;
      
      // Create strategies content
      const strategies = document.createElement('div');
      strategies.className = 'problem-strategies';
      
      // Add strategies
      problem.strategies.forEach(strategy => {
        const strategyHtml = `
          <div class="strategy-item">
            <div class="strategy-name">${strategy.name}</div>
            <div class="strategy-description">${strategy.description}</div>
            <div class="strategy-technique">${strategy.technique}</div>
          </div>
        `;
        strategies.innerHTML += strategyHtml;
      });
      
      // Add to problem
      problemElement.appendChild(header);
      problemElement.appendChild(strategies);
      blockProblems.appendChild(problemElement);
    });
  },
  
  // Add event listeners
  addEventListeners: function(container) {
    // Back to structure button
    const backButton = container.querySelector('#back-to-structures');
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.hideStructureDetails(container);
      });
    }
    
    // Character framework tabs
    const frameworkTabs = container.querySelectorAll('.framework-tab');
    frameworkTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        frameworkTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Show the selected framework
        const framework = tab.dataset.framework;
        this.showCharacterFramework(container, framework);
      });
    });
    
    // Generate story idea button
    const generateButton = container.querySelector('#generate-idea-btn');
    if (generateButton) {
      generateButton.addEventListener('click', () => {
        this.generateStoryIdea(container);
      });
    }
  },
  
  // Show structure details
  showStructureDetails: function(container, structureId) {
    // Update current state
    this.currentState.selectedStructure = structureId;
    
    // Hide structure cards
    const structureCards = container.querySelector('.structure-cards');
    if (structureCards) {
      structureCards.style.display = 'none';
    }
    
    // Show selected structure details
    const selectedStructure = container.querySelector('#selected-structure');
    if (selectedStructure) {
      selectedStructure.classList.remove('hidden');
    }
    
    // Find structure data
    const structure = this.storyStructures.find(s => s.id === structureId);
    if (!structure) return;
    
    // Update structure name
    const structureName = container.querySelector('#structure-name');
    if (structureName) {
      structureName.textContent = structure.name;
    }
    
    // Update structure description
    const structureDescription = container.querySelector('#structure-description');
    if (structureDescription) {
      structureDescription.textContent = structure.description;
    }
    
    // Update structure components
    const structureComponents = container.querySelector('#structure-components');
    if (structureComponents) {
      let componentsHtml = '';
      
      structure.components.forEach(component => {
        componentsHtml += `
          <div class="component-item">
            <div class="component-title">${component.name}</div>
            <div class="component-description">${component.description}</div>
            <div class="element-list">
              ${component.elements.map(element => `
                <div class="element-item">${element}</div>
              `).join('')}
            </div>
          </div>
        `;
      });
      
      structureComponents.innerHTML = componentsHtml;
    }
    
    // Update structure examples
    const structureExamples = container.querySelector('#structure-examples');
    if (structureExamples) {
      structureExamples.innerHTML = `
        <div class="examples-title">Examples:</div>
        <div class="examples-list">${structure.examples.join(', ')}</div>
      `;
    }
  },
  
  // Hide structure details
  hideStructureDetails: function(container) {
    // Reset current state
    this.currentState.selectedStructure = null;
    
    // Show structure cards
    const structureCards = container.querySelector('.structure-cards');
    if (structureCards) {
      structureCards.style.display = 'grid';
    }
    
    // Hide selected structure details
    const selectedStructure = container.querySelector('#selected-structure');
    if (selectedStructure) {
      selectedStructure.classList.add('hidden');
    }
  },
  
  // Show character framework
  showCharacterFramework: function(container, frameworkId) {
    // Update current state
    this.currentState.selectedFramework = frameworkId;
    
    const frameworkContent = container.querySelector('#framework-content');
    if (!frameworkContent) return;
    
    // Find framework data
    const framework = this.characterFrameworks.find(f => f.id === frameworkId);
    if (!framework) return;
    
    // Build HTML for framework
    let html = `
      <div class="framework-description">${framework.description}</div>
      <div class="framework-sections">
    `;
    
    // Add each component
    framework.components.forEach(component => {
      html += `
        <div class="framework-section">
          <div class="section-name">${component.name}</div>
          <div class="section-description">${component.description}</div>
          <div class="prompt-list">
            ${component.prompts.map(prompt => `
              <div class="prompt-item">${prompt}</div>
            `).join('')}
          </div>
        </div>
      `;
    });
    
    html += `
      </div>
    `;
    
    // Add examples if they exist
    if (framework.examples && framework.examples.length > 0) {
      html += `
        <div class="framework-examples">
          <div class="examples-title">Examples:</div>
          <div class="examples-list">
            ${framework.examples.map(example => `<p>${example}</p>`).join('')}
          </div>
        </div>
      `;
    }
    
    frameworkContent.innerHTML = html;
  },
  
  // Generate a story idea
  generateStoryIdea: function(container) {
    // Get form values
    const genreSelect = container.querySelector('#genre-select');
    const characterSelect = container.querySelector('#character-type');
    const conflictSelect = container.querySelector('#conflict-type');
    
    const genre = genreSelect ? genreSelect.value : 'any';
    const character = characterSelect ? characterSelect.value : 'any';
    const conflict = conflictSelect ? conflictSelect.value : 'any';
    
    // Prepare prompt for AI
    let prompt = `Please generate a creative and original story idea based on the following parameters:

1. Genre: ${genre === 'any' ? 'Any genre (you choose)' : this.formatOption(genre)}
2. Main Character Type: ${character === 'any' ? 'Any character type (you choose)' : this.formatOption(character)}
3. Main Conflict: ${conflict === 'any' ? 'Any conflict (you choose)' : this.formatOption(conflict)}

Please structure your response as follows:
1. A creative title for the story
2. A compelling 3-5 sentence premise that introduces the main character, setting, and central conflict
3. Three key story elements or plot points that could be developed
4. A suggestion for a potential thematic question the story might explore

Make sure the concept is specific, original, and has potential for character development, meaningful conflict, and thematic depth.`;
    
    // Show "generating" message
    const generatedIdea = container.querySelector('#generated-idea');
    if (generatedIdea) {
      generatedIdea.classList.remove('hidden');
      generatedIdea.innerHTML = `
        <div class="idea-title">Generating your story idea...</div>
        <div class="idea-description">Please wait while we craft something creative for you!</div>
      `;
    }
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Format option for prompt
  formatOption: function(option) {
    return option.charAt(0).toUpperCase() + option.slice(1).replace(/([A-Z])/g, ' $1');
  },
  
  // Send prompt to AI
  sendPromptToAI: function(prompt) {
    const chatInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
      chatInput.value = prompt;
      sendButton.click();
    }
  }
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    CreativeWritingAssistantMode.init();
  } else {
    window.addEventListener('load', function() {
      CreativeWritingAssistantMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CreativeWritingAssistantMode;
} else {
  window.CreativeWritingAssistantMode = CreativeWritingAssistantMode;
}
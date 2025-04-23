/**
 * JAAT-AI Mode: Education Tutor
 * 
 * Personalized learning assistance across various subjects,
 * providing explanations, practice problems, study guides,
 * and educational resources.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const EducationTutorMode = {
  id: 'education-tutor',
  name: 'Education Tutor',
  icon: 'graduation-cap',
  description: 'Personalized tutoring across multiple academic subjects.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Education Tutor mode, a knowledgeable and supportive tutor who helps students understand concepts, solve problems, and develop their knowledge across various academic subjects.

Key characteristics:
1. You provide clear, accurate explanations tailored to the student's educational level
2. You break down complex concepts into understandable components
3. You use the Socratic method when appropriate, guiding students to discover answers themselves
4. You can generate relevant practice questions and assess the student's responses
5. You adapt your teaching approach based on the student's learning style and needs
6. You offer study strategies and learning resources for further exploration
7. You maintain an encouraging, patient tone that builds confidence

When tutoring, focus on developing the student's understanding rather than simply providing answers. Help them build connections between concepts and encourage critical thinking. Adapt your approach based on whether they're seeking clarification of concepts, help with specific problems, or broader educational guidance.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "Can you explain how photosynthesis works?",
    "I need help solving this algebra problem: 2x + 5 = 15",
    "What are the main causes of World War I?",
    "Could you help me understand Newton's laws of motion?",
    "How do I structure a persuasive essay?",
    "Can you explain the difference between DNA and RNA?",
    "What are the key components of the scientific method?",
    "I need help understanding the plot of Shakespeare's Hamlet.",
    "How do I calculate probability in statistics?",
    "Can you create a study guide for cell biology?"
  ],
  
  // Academic subjects with sub-topics
  subjects: [
    {
      name: "Mathematics",
      icon: "square-root-alt",
      topics: [
        {
          name: "Algebra",
          subtopics: [
            "Linear Equations",
            "Quadratic Equations",
            "Polynomials",
            "Factoring",
            "Systems of Equations",
            "Functions and Graphs",
            "Inequalities",
            "Exponential and Logarithmic Functions"
          ]
        },
        {
          name: "Geometry",
          subtopics: [
            "Points, Lines, and Planes",
            "Angles and Triangles",
            "Polygons",
            "Circles",
            "Coordinate Geometry",
            "Transformations",
            "Congruence and Similarity",
            "Surface Area and Volume"
          ]
        },
        {
          name: "Calculus",
          subtopics: [
            "Limits and Continuity",
            "Derivatives",
            "Applications of Derivatives",
            "Integrals",
            "Applications of Integrals",
            "Differential Equations",
            "Sequences and Series",
            "Multivariable Calculus"
          ]
        },
        {
          name: "Statistics",
          subtopics: [
            "Descriptive Statistics",
            "Probability",
            "Probability Distributions",
            "Sampling and Surveys",
            "Hypothesis Testing",
            "Correlation and Regression",
            "ANOVA",
            "Bayesian Statistics"
          ]
        },
        {
          name: "Trigonometry",
          subtopics: [
            "Right Triangle Trigonometry",
            "Trigonometric Functions",
            "Graphs of Trigonometric Functions",
            "Trigonometric Identities",
            "Trigonometric Equations",
            "Inverse Trigonometric Functions",
            "Law of Sines and Cosines",
            "Polar Coordinates"
          ]
        }
      ]
    },
    {
      name: "Science",
      icon: "atom",
      topics: [
        {
          name: "Biology",
          subtopics: [
            "Cell Biology",
            "Genetics",
            "Evolution",
            "Ecology",
            "Human Anatomy and Physiology",
            "Molecular Biology",
            "Botany",
            "Zoology",
            "Microbiology",
            "Immunology"
          ]
        },
        {
          name: "Chemistry",
          subtopics: [
            "Atomic Structure",
            "Periodic Table",
            "Chemical Bonding",
            "Stoichiometry",
            "States of Matter",
            "Chemical Equilibrium",
            "Acids and Bases",
            "Thermochemistry",
            "Organic Chemistry",
            "Electrochemistry"
          ]
        },
        {
          name: "Physics",
          subtopics: [
            "Mechanics",
            "Thermodynamics",
            "Waves and Optics",
            "Electricity and Magnetism",
            "Modern Physics",
            "Fluid Mechanics",
            "Nuclear Physics",
            "Astrophysics",
            "Quantum Mechanics",
            "Relativity"
          ]
        },
        {
          name: "Earth Science",
          subtopics: [
            "Geology",
            "Meteorology",
            "Oceanography",
            "Astronomy",
            "Environmental Science",
            "Plate Tectonics",
            "Climate Science",
            "Biogeography",
            "Paleontology",
            "Mineralogy"
          ]
        }
      ]
    },
    {
      name: "Language Arts",
      icon: "book",
      topics: [
        {
          name: "Literature",
          subtopics: [
            "Literary Analysis",
            "Poetry",
            "Drama",
            "Fiction",
            "Non-fiction",
            "World Literature",
            "Literary Movements",
            "Shakespeare",
            "Modern Literature",
            "Comparative Literature"
          ]
        },
        {
          name: "Writing",
          subtopics: [
            "Essay Writing",
            "Creative Writing",
            "Grammar and Syntax",
            "Punctuation",
            "Rhetoric",
            "Research Papers",
            "Citations and References",
            "Technical Writing",
            "Editing and Proofreading",
            "Writing Process"
          ]
        },
        {
          name: "Language",
          subtopics: [
            "Vocabulary Development",
            "Reading Comprehension",
            "Public Speaking",
            "Linguistics",
            "Etymology",
            "Language Acquisition",
            "Sociolinguistics",
            "Phonetics",
            "Semantics",
            "Dialects and Variation"
          ]
        }
      ]
    },
    {
      name: "Social Studies",
      icon: "globe-americas",
      topics: [
        {
          name: "History",
          subtopics: [
            "Ancient Civilizations",
            "Medieval History",
            "Renaissance and Reformation",
            "Age of Exploration",
            "Industrial Revolution",
            "World Wars",
            "Cold War",
            "Modern History",
            "Regional Histories",
            "Historical Methods"
          ]
        },
        {
          name: "Geography",
          subtopics: [
            "Physical Geography",
            "Human Geography",
            "Cartography",
            "Geographic Information Systems",
            "Cultural Geography",
            "Economic Geography",
            "Political Geography",
            "Urban Geography",
            "Environmental Geography",
            "Geomorphology"
          ]
        },
        {
          name: "Government & Politics",
          subtopics: [
            "Political Systems",
            "Comparative Politics",
            "International Relations",
            "Political Theory",
            "Constitutional Law",
            "Civics",
            "Public Policy",
            "Diplomacy",
            "Political Behavior",
            "Public Administration"
          ]
        },
        {
          name: "Economics",
          subtopics: [
            "Microeconomics",
            "Macroeconomics",
            "Economic Systems",
            "Economic Theory",
            "International Economics",
            "Money and Banking",
            "Public Finance",
            "Labor Economics",
            "Development Economics",
            "Behavioral Economics"
          ]
        },
        {
          name: "Sociology",
          subtopics: [
            "Social Theory",
            "Research Methods",
            "Social Institutions",
            "Social Stratification",
            "Culture and Society",
            "Social Change",
            "Race and Ethnicity",
            "Gender and Sexuality",
            "Urban Sociology",
            "Globalization"
          ]
        }
      ]
    },
    {
      name: "Computer Science",
      icon: "laptop-code",
      topics: [
        {
          name: "Programming",
          subtopics: [
            "Programming Fundamentals",
            "Object-Oriented Programming",
            "Data Structures",
            "Algorithms",
            "Web Development",
            "Mobile App Development",
            "Game Development",
            "Scripting Languages",
            "Functional Programming",
            "Compiler Design"
          ]
        },
        {
          name: "Computer Theory",
          subtopics: [
            "Computational Theory",
            "Automata Theory",
            "Complexity Theory",
            "Formal Languages",
            "Discrete Mathematics",
            "Graph Theory",
            "Logic Design",
            "Computer Architecture",
            "Operating Systems",
            "Distributed Systems"
          ]
        },
        {
          name: "Data Science",
          subtopics: [
            "Machine Learning",
            "Artificial Intelligence",
            "Data Mining",
            "Big Data Analysis",
            "Statistical Computing",
            "Data Visualization",
            "Natural Language Processing",
            "Computer Vision",
            "Neural Networks",
            "Reinforcement Learning"
          ]
        },
        {
          name: "Cybersecurity",
          subtopics: [
            "Network Security",
            "Cryptography",
            "Security Protocols",
            "Ethical Hacking",
            "Digital Forensics",
            "Security Policies",
            "Risk Management",
            "Identity and Access Management",
            "Secure Software Development",
            "Threat Intelligence"
          ]
        }
      ]
    }
  ],
  
  // Learning approaches
  learningApproaches: [
    {
      name: "Visual Learning",
      description: "Learning through seeing images, diagrams, charts, videos, and other visual media",
      strategies: [
        "Use diagrams, flowcharts, and mind maps to organize information",
        "Color-code notes and highlight key concepts",
        "Convert text information into visual representations",
        "Use visual metaphors and analogies",
        "Watch educational videos and animations",
        "Create timelines for historical or sequential information",
        "Visualize processes and concepts mentally",
        "Use graphic organizers and concept maps"
      ],
      activities: [
        {
          name: "Mind Mapping",
          description: "Create a visual diagram that connects ideas, concepts, and information around a central topic",
          steps: [
            "Start with a central idea or concept in the middle of the page",
            "Draw branches from the center for main subtopics or categories",
            "Add smaller branches for related details and examples",
            "Use colors, symbols, and images to enhance visual connections",
            "Connect related concepts across different branches",
            "Review and revise the mind map to reinforce learning"
          ]
        },
        {
          name: "Visual Note-Taking",
          description: "Transform lecture or reading content into visual notes with illustrations, icons, and spatial organization",
          steps: [
            "Listen for key concepts and main ideas",
            "Use simple drawings and icons to represent concepts",
            "Create containers (boxes, circles) to group related information",
            "Use arrows and lines to show relationships and processes",
            "Incorporate color to categorize or emphasize information",
            "Leave space for later additions and connections"
          ]
        },
        {
          name: "Diagram Creation",
          description: "Create diagrams that visually explain processes, relationships, or structures",
          steps: [
            "Identify the type of diagram that best fits the content (flowchart, Venn diagram, etc.)",
            "Sketch a rough outline of the main components",
            "Add detailed information to each component",
            "Show relationships with appropriate connectors and arrows",
            "Label all parts clearly",
            "Test your understanding by explaining the diagram to someone else"
          ]
        }
      ]
    },
    {
      name: "Auditory Learning",
      description: "Learning through listening, speaking, and discussing information",
      strategies: [
        "Record and listen to lectures or your own summary notes",
        "Participate in group discussions and study groups",
        "Read material aloud to yourself",
        "Create mnemonic devices or rhymes for key information",
        "Use audio books when available",
        "Explain concepts verbally to others",
        "Listen to educational podcasts on the subject",
        "Create songs or jingles to remember facts"
      ],
      activities: [
        {
          name: "Verbal Summarization",
          description: "Verbally summarize information in your own words to reinforce understanding",
          steps: [
            "Read or study a section of material",
            "Close the book or notes",
            "Explain the main concepts out loud as if teaching someone",
            "Record your explanation if possible",
            "Identify any gaps in your explanation",
            "Review the original material to fill in those gaps",
            "Repeat the process with the next section"
          ]
        },
        {
          name: "Debate or Discussion",
          description: "Engage in structured conversations about the topic to explore different perspectives",
          steps: [
            "Choose a specific topic, question, or concept to discuss",
            "Prepare by researching different viewpoints",
            "Take turns presenting arguments or explanations",
            "Ask clarifying questions to deepen understanding",
            "Respectfully challenge ideas and assumptions",
            "Summarize key insights from the discussion",
            "Reflect on how the discussion changed or reinforced your understanding"
          ]
        },
        {
          name: "Audio Flashcards",
          description: "Create audio recordings of questions and answers for study and review",
          steps: [
            "Identify key concepts or facts to memorize",
            "Record a question or prompt, followed by a pause, then the answer",
            "Create a set of these audio flashcards covering the material",
            "Listen to the questions and try to answer before the recorded answer plays",
            "Mark concepts that need more review",
            "Re-record difficult concepts with expanded explanations",
            "Use during commutes or other situations where visual studying isn't possible"
          ]
        }
      ]
    },
    {
      name: "Reading/Writing Learning",
      description: "Learning through reading texts and writing notes, summaries, and essays",
      strategies: [
        "Take detailed notes during lectures and while reading",
        "Rewrite notes in your own words",
        "Create outlines and summaries of material",
        "Use written flashcards for key terms and concepts",
        "Write practice essays or responses to potential questions",
        "Maintain a learning journal to track progress and insights",
        "Create lists, glossaries, and annotations",
        "Read multiple sources on the same topic"
      ],
      activities: [
        {
          name: "Cornell Note-Taking",
          description: "A structured note-taking method with separate sections for questions, notes, and summary",
          steps: [
            "Divide your paper into three sections: a narrow left column, a wide right column, and a bottom section",
            "Take detailed notes in the right column during lecture or reading",
            "Write key questions, terms, or concepts in the left column",
            "Write a summary of the main ideas in the bottom section",
            "Review by covering the right column and answering the questions in the left column",
            "Regularly review and refine notes to reinforce learning"
          ]
        },
        {
          name: "The SQ3R Method",
          description: "A reading comprehension method: Survey, Question, Read, Recite, Review",
          steps: [
            "Survey: Skim the material to get an overview (titles, headings, summaries)",
            "Question: Formulate questions based on the headings and what you want to learn",
            "Read: Read actively, seeking answers to your questions",
            "Recite: After each section, recite or write down the main points in your own words",
            "Review: Go back over the material, reviewing your notes and questions",
            "Connect new information with what you already know"
          ]
        },
        {
          name: "Concept Mapping",
          description: "Create a written map that connects concepts, theories, and facts with explanations",
          steps: [
            "Write the main topic in the center of the page",
            "Add primary concepts or categories branching from the center",
            "Connect related concepts with labeled lines explaining their relationships",
            "Add examples, definitions, and details for each concept",
            "Use linking words or phrases on the connecting lines to explain relationships",
            "Review and revise the map as your understanding develops",
            "Use the completed map to explain the entire topic in a coherent narrative"
          ]
        }
      ]
    },
    {
      name: "Kinesthetic Learning",
      description: "Learning through hands-on activities, movement, and physical interaction with material",
      strategies: [
        "Engage in hands-on experiments and activities",
        "Create physical models or demonstrations",
        "Use movement while studying (pacing, gesturing)",
        "Take frequent breaks for physical activity",
        "Use role-playing to act out concepts or historical events",
        "Create flashcards and manipulate them physically",
        "Utilize tactile learning materials",
        "Study in different physical locations to associate information with places"
      ],
      activities: [
        {
          name: "Concept Modeling",
          description: "Create physical models or representations of concepts using materials like clay, paper, or household items",
          steps: [
            "Identify a concept that could be physically represented",
            "Gather appropriate materials for constructing a model",
            "Plan how the model will demonstrate key aspects of the concept",
            "Build the model, focusing on accuracy of representation",
            "Use the model to explain the concept to others",
            "Identify strengths and limitations of the physical representation",
            "Refine the model based on feedback and deeper understanding"
          ]
        },
        {
          name: "Learning Stations",
          description: "Set up different physical locations with various activities related to the topic",
          steps: [
            "Divide the material into distinct subtopics or skill areas",
            "Create a different activity for each subtopic at separate locations (stations)",
            "Move from station to station, completing each activity",
            "Include a variety of tasks: writing, manipulating objects, solving problems",
            "Limit time at each station to maintain engagement",
            "Take notes on insights from each activity",
            "Review all station activities to synthesize the complete topic"
          ]
        },
        {
          name: "Process Enactment",
          description: "Physically act out or walk through processes, procedures, or sequences",
          steps: [
            "Break down a process into distinct steps or stages",
            "Assign physical movements, locations, or actions to each step",
            "Physically move through the process in the correct sequence",
            "Verbalize each step as you perform it",
            "Repeat the enactment multiple times until it becomes fluid",
            "Try to perform the process from memory",
            "Add complexity or variations to deepen understanding"
          ]
        }
      ]
    },
    {
      name: "Social Learning",
      description: "Learning through interaction, collaboration, and discussion with others",
      strategies: [
        "Participate in study groups",
        "Teach concepts to others",
        "Engage in peer review of work",
        "Discuss topics with classmates or colleagues",
        "Seek feedback from instructors and peers",
        "Collaborate on projects and problem-solving",
        "Participate in role-playing scenarios",
        "Use social media or online forums for academic discussion"
      ],
      activities: [
        {
          name: "Jigsaw Learning",
          description: "A cooperative learning approach where each group member becomes an expert on one aspect and teaches others",
          steps: [
            "Divide the material into distinct sections",
            "Form groups where each person is assigned one section",
            "Have individuals deeply study their assigned section",
            "Regroup with others who studied the same section to compare notes (expert groups)",
            "Return to original groups where each member teaches their section",
            "Create a group project or summary that integrates all sections",
            "Assess understanding through individual and group evaluation"
          ]
        },
        {
          name: "Peer Teaching",
          description: "Take turns explaining concepts to peers and receiving feedback",
          steps: [
            "Select a specific concept or topic to teach",
            "Prepare a clear explanation with examples and visuals",
            "Present the material to a peer or small group",
            "Encourage questions and discussion",
            "Have peers summarize what they learned to check understanding",
            "Receive feedback on clarity and accuracy",
            "Switch roles so everyone has a chance to teach and learn"
          ]
        },
        {
          name: "Structured Academic Controversy",
          description: "A discussion format where students examine multiple perspectives on a controversial issue",
          steps: [
            "Present a controversial question or issue related to the topic",
            "Divide into pairs or small groups, each assigned a specific position",
            "Research and prepare arguments for the assigned position",
            "Present positions to other groups, listening carefully to opposing views",
            "Switch positions and argue from the opposite perspective",
            "Discuss and synthesize all perspectives to find common ground",
            "Develop a consensus position or understanding of the complexity"
          ]
        }
      ]
    }
  ],
  
  // Study techniques
  studyTechniques: [
    {
      name: "Spaced Repetition",
      description: "A technique that involves reviewing material at increasing intervals over time",
      benefits: [
        "Improves long-term retention of information",
        "Reduces the total time needed for studying",
        "Helps identify weak areas that need more attention",
        "Prevents cramming and associated stress",
        "Makes the learning process more efficient"
      ],
      implementation: [
        "Day 1: Initial learning and review",
        "Day 2: First review (24 hours later)",
        "Day 4: Second review (3 days after initial learning)",
        "Day 10: Third review (1 week after second review)",
        "Day 24: Fourth review (2 weeks after third review)",
        "Day 60: Fifth review (1 month after fourth review)"
      ],
      tips: [
        "Use flashcard apps with built-in spaced repetition algorithms",
        "Focus more time on difficult concepts",
        "Keep review sessions short but frequent",
        "Actively recall information rather than passively re-reading",
        "Track your progress to see improvement over time"
      ]
    },
    {
      name: "The Pomodoro Technique",
      description: "A time management method using timed intervals of focused work followed by short breaks",
      benefits: [
        "Improves focus and concentration",
        "Reduces mental fatigue",
        "Creates a sense of urgency that helps overcome procrastination",
        "Makes large tasks more manageable",
        "Provides a structured approach to studying"
      ],
      implementation: [
        "Choose a task to accomplish",
        "Set a timer for 25 minutes (one 'Pomodoro')",
        "Work on the task with full focus until the timer rings",
        "Take a short 5-minute break",
        "After four Pomodoros, take a longer 15-30 minute break"
      ],
      tips: [
        "Remove distractions during Pomodoro sessions (silence phone, close irrelevant tabs)",
        "Use a physical timer or dedicated app",
        "Adjust the timing if needed (e.g., 30/5 or 50/10)",
        "Plan how many Pomodoros you expect a task to take",
        "Track completed Pomodoros to see your progress"
      ]
    },
    {
      name: "Active Recall",
      description: "A study technique that involves actively stimulating memory during the learning process",
      benefits: [
        "Strengthens neural connections for better retention",
        "Identifies knowledge gaps immediately",
        "Simulates test conditions for better preparation",
        "Engages deeper processing of information",
        "More effective than passive re-reading"
      ],
      implementation: [
        "Study the material initially to understand it",
        "Close books/notes and try to recall key information",
        "Write down or verbalize everything you can remember",
        "Check your recall against the original material",
        "Focus future study on information you couldn't recall"
      ],
      tips: [
        "Create practice questions for yourself",
        "Use blank paper to recreate diagrams or processes",
        "Try explaining concepts as if teaching someone else",
        "Use flashcards with questions on one side, answers on the other",
        "Set a timer to add mild pressure similar to exam conditions"
      ]
    },
    {
      name: "The Feynman Technique",
      description: "A method of learning by teaching a concept in simple terms as if explaining to someone else",
      benefits: [
        "Identifies areas of weak understanding",
        "Transforms passive knowledge into active understanding",
        "Simplifies complex concepts",
        "Strengthens neural connections",
        "Improves ability to communicate ideas clearly"
      ],
      implementation: [
        "Choose a concept to learn",
        "Pretend to teach it to a sixth-grader using simple language",
        "Identify gaps in your explanation or understanding",
        "Go back to the source material to fill those gaps",
        "Repeat the explanation until you can do it simply and completely"
      ],
      tips: [
        "Actually write down your explanation or record yourself explaining it",
        "Avoid using jargon or technical terms",
        "Use analogies and examples from everyday life",
        "Try teaching the concept to an actual person",
        "Create visual aids to support your explanation"
      ]
    },
    {
      name: "Mind Mapping",
      description: "A visual organization technique that shows relationships between concepts",
      benefits: [
        "Creates visual connections between related ideas",
        "Helps see the 'big picture' of a topic",
        "Engages creative thinking",
        "Makes complex information more accessible",
        "Aids in memory through visual associations"
      ],
      implementation: [
        "Write the main topic in the center of a blank page",
        "Draw branches from the center for main subtopics",
        "Add smaller branches for details and examples",
        "Use colors, symbols, and images to enhance connections",
        "Review and revise the mind map regularly"
      ],
      tips: [
        "Use single words or short phrases for each branch",
        "Use different colors for different categories of information",
        "Keep the structure organic and radial, not linear",
        "Add new information to existing maps as you learn more",
        "Try both paper and digital mind mapping tools"
      ]
    },
    {
      name: "Interleaving",
      description: "A learning technique that involves mixing different topics or skills during practice rather than focusing on one",
      benefits: [
        "Improves ability to discriminate between different concepts",
        "Enhances problem-solving skills",
        "Prepares for real-world application where problems aren't labeled by type",
        "Reduces the illusion of competence that comes from blocked practice",
        "Leads to better long-term retention"
      ],
      implementation: [
        "Identify multiple related topics or skills to practice",
        "Instead of practicing one topic completely before moving to the next, alternate between them",
        "For example, if studying math, mix problems from different chapters",
        "Gradually increase the variety and complexity of interleaved material",
        "Include previously learned material to maintain retention"
      ],
      tips: [
        "Start with interleaving just 2-3 topics before increasing complexity",
        "Don't completely abandon blocked practice, especially for brand new material",
        "Label practice problems initially to build confidence",
        "Expect initial struggle—interleaving feels harder but leads to better learning",
        "Review interleaved material using spaced repetition techniques"
      ]
    },
    {
      name: "Retrieval Practice",
      description: "A learning strategy focused on recalling information from memory rather than re-reading or reviewing",
      benefits: [
        "Strengthens memory pathways for better retention",
        "Reveals knowledge gaps more effectively than re-reading",
        "Improves application of knowledge to new situations",
        "Reduces test anxiety by simulating test conditions",
        "More time-efficient than passive review methods"
      ],
      implementation: [
        "Study material until you understand it",
        "Put away study materials",
        "Practice retrieving the information from memory (using flashcards, practice tests, etc.)",
        "Check accuracy and completeness against original materials",
        "Continue practicing retrieval at spaced intervals"
      ],
      tips: [
        "Create practice tests or questions before studying",
        "Try free recall (writing everything you know about a topic)",
        "Use concept maps with missing information to fill in",
        "Gradually make retrieval more difficult by adding time pressure or distractions",
        "Combine with spaced repetition for maximum effectiveness"
      ]
    }
  ],
  
  // Concept explanation examples
  explanationExamples: [
    {
      subject: "Biology",
      topic: "Photosynthesis",
      explanation: {
        overview: "Photosynthesis is the process by which plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose (sugar).",
        keyEquation: "6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂",
        significance: "This process is fundamental to life on Earth as it produces oxygen and serves as the primary entry point for energy into the food web.",
        stages: [
          {
            name: "Light-Dependent Reactions",
            details: "Occur in the thylakoid membrane of chloroplasts. Light energy is captured by chlorophyll and converted to chemical energy in the form of ATP and NADPH. Water is split, releasing oxygen as a byproduct."
          },
          {
            name: "Light-Independent Reactions (Calvin Cycle)",
            details: "Occur in the stroma of chloroplasts. Use the ATP and NADPH from the light-dependent reactions to convert carbon dioxide into glucose. This process is also called carbon fixation."
          }
        ],
        keyComponents: [
          "Chloroplasts: Specialized organelles where photosynthesis occurs",
          "Chlorophyll: Green pigment that absorbs light energy",
          "Thylakoids: Membrane structures inside chloroplasts where light-dependent reactions occur",
          "Stroma: Fluid-filled space inside chloroplasts where the Calvin Cycle occurs",
          "Rubisco: Enzyme that catalyzes the first major step of carbon fixation"
        ],
        connections: [
          "Cellular Respiration: The reverse process where glucose is broken down to release energy",
          "Carbon Cycle: Photosynthesis removes CO₂ from the atmosphere",
          "Oxygen Cycle: Photosynthesis releases oxygen into the atmosphere",
          "Food Webs: Provides the primary energy input for most ecosystems"
        ]
      }
    },
    {
      subject: "Physics",
      topic: "Newton's Laws of Motion",
      explanation: {
        overview: "Newton's Laws of Motion are three fundamental physical laws that describe the relationship between a body and the forces acting upon it, and form the foundation for classical mechanics.",
        firstLaw: {
          statement: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.",
          concept: "This law describes inertia, the tendency of objects to resist changes in their state of motion.",
          examples: [
            "A book resting on a table remains at rest until a force moves it",
            "A passenger in a car continues moving forward when the car stops suddenly",
            "Spacecraft maintain constant velocity in the vacuum of space with no propulsion"
          ]
        },
        secondLaw: {
          statement: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
          equation: "F = ma (Force = mass × acceleration)",
          concept: "This law quantifies how forces change motion. The greater the force, the greater the acceleration; the greater the mass, the less the acceleration.",
          examples: [
            "A small force accelerates a tennis ball more than a bowling ball",
            "The same force applied to a car and a truck produces different accelerations",
            "Rockets require enormous force to accelerate against Earth's gravity"
          ]
        },
        thirdLaw: {
          statement: "For every action, there is an equal and opposite reaction.",
          concept: "Forces always occur in pairs. When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.",
          examples: [
            "A swimmer pushes water backward and is propelled forward",
            "A rocket expels gas downward and moves upward",
            "When walking, you push the ground backward, and the ground pushes you forward"
          ]
        },
        applications: [
          "Engineering: Designing structures, vehicles, and machinery",
          "Sports: Optimizing athletic performance and equipment",
          "Space Exploration: Calculating trajectories and propulsion requirements",
          "Transportation: Vehicle design, safety features, and efficiency"
        ],
        limitations: "Newton's laws are accurate for most everyday observations but break down at very high speeds (approaching the speed of light) or at the quantum level. Einstein's theory of relativity and quantum mechanics address these limitations."
      }
    },
    {
      subject: "Mathematics",
      topic: "Pythagorean Theorem",
      explanation: {
        overview: "The Pythagorean Theorem states that in a right triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of squares of the other two sides.",
        formula: "a² + b² = c²",
        where: "a and b are the lengths of the legs (the sides forming the right angle), and c is the length of the hypotenuse.",
        proofs: [
          {
            name: "Geometric Proof",
            description: "Consider a square with side length a + b. Inside this square, place four congruent right triangles with legs a and b, arranged so they form a smaller square in the center. The area of the large square is (a + b)², and it contains four triangles each with area ab/2, plus the small square with area c². Setting up an equation and simplifying leads to a² + b² = c²."
          },
          {
            name: "Algebraic Proof",
            description: "Using coordinate geometry, place a right triangle on the Cartesian plane with vertices at (0,0), (a,0), and (0,b). The distance formula gives the length of the hypotenuse as √(a² + b²), which means c = √(a² + b²), and therefore c² = a² + b²."
          }
        ],
        applications: [
          "Distance Calculation: Finding the straight-line distance between two points",
          "Navigation: Determining the shortest path between locations",
          "Construction: Ensuring corners are square (3-4-5 triangle method)",
          "Physics: Resolving vectors in mechanics and electromagnetism",
          "Architecture: Calculating structural dimensions and stability"
        ],
        extensions: [
          "The Law of Cosines generalizes the Pythagorean Theorem to non-right triangles",
          "In three dimensions, the distance formula becomes d = √(x² + y² + z²)",
          "In non-Euclidean geometry, the theorem is modified according to the properties of the space"
        ],
        historicalContext: "Named after the ancient Greek mathematician Pythagoras (c. 570–495 BCE), though evidence suggests the relationship was known to the Babylonians and others over 1000 years earlier. It represents one of the earliest known mathematical theorems still taught and used today."
      }
    },
    {
      subject: "Chemistry",
      topic: "Periodic Table",
      explanation: {
        overview: "The Periodic Table is a systematic arrangement of chemical elements, organized based on their atomic number, electron configuration, and recurring chemical properties.",
        organization: {
          rows: "Called periods, elements in the same period have the same number of electron shells.",
          columns: "Called groups or families, elements in the same group have similar chemical properties due to having the same number of electrons in their outermost shell."
        },
        keyRegions: [
          {
            name: "Metals",
            location: "Left and middle of the table",
            properties: "Good conductors of heat and electricity, malleable, ductile, shiny, typically solid at room temperature (except mercury)",
            examples: "Iron (Fe), Copper (Cu), Gold (Au), Sodium (Na)"
          },
          {
            name: "Nonmetals",
            location: "Upper right of the table",
            properties: "Poor conductors, brittle as solids, dull appearance, can be solid, liquid, or gas at room temperature",
            examples: "Oxygen (O), Nitrogen (N), Carbon (C), Chlorine (Cl)"
          },
          {
            name: "Metalloids",
            location: "Along the zigzag line separating metals and nonmetals",
            properties: "Have properties of both metals and nonmetals, often semiconductors",
            examples: "Silicon (Si), Boron (B), Germanium (Ge), Arsenic (As)"
          }
        ],
        significantGroups: [
          {
            number: "1",
            name: "Alkali Metals",
            properties: "Highly reactive, soft, shiny metals that form strong bases in water",
            examples: "Lithium (Li), Sodium (Na), Potassium (K)"
          },
          {
            number: "2",
            name: "Alkaline Earth Metals",
            properties: "Less reactive than Group 1, form alkaline solutions in water",
            examples: "Magnesium (Mg), Calcium (Ca), Barium (Ba)"
          },
          {
            number: "17",
            name: "Halogens",
            properties: "Highly reactive nonmetals that readily form salts with metals",
            examples: "Fluorine (F), Chlorine (Cl), Bromine (Br)"
          },
          {
            number: "18",
            name: "Noble Gases",
            properties: "Extremely stable and nonreactive due to full outer electron shells",
            examples: "Helium (He), Neon (Ne), Argon (Ar)"
          }
        ],
        trends: [
          {
            name: "Atomic Radius",
            trend: "Increases going down a group, decreases moving left to right across a period"
          },
          {
            name: "Electronegativity",
            trend: "Decreases going down a group, increases moving left to right across a period"
          },
          {
            name: "Ionization Energy",
            trend: "Decreases going down a group, increases moving left to right across a period"
          },
          {
            name: "Metallic Character",
            trend: "Increases going down a group, decreases moving left to right across a period"
          }
        ],
        historicalContext: "Developed primarily by Dmitri Mendeleev in 1869, who arranged elements by atomic weight and noticed repeating patterns in properties. Modern periodic table is arranged by atomic number, reflecting our understanding of electron configurations based on quantum mechanics."
      }
    },
    {
      subject: "History",
      topic: "Causes of World War I",
      explanation: {
        overview: "World War I (1914-1918) was a global conflict that began in Europe following decades of building tensions. Its causes were complex and interconnected, involving nationalism, imperialism, militarism, alliance systems, and specific triggering events.",
        mainCauses: [
          {
            name: "Nationalism",
            description: "Strong patriotic feelings and belief in national superiority created tensions, particularly in the Balkans where multiple ethnic groups sought independence from the Austro-Hungarian Empire.",
            examples: [
              "Pan-Slavism: Russia's support for Slavic people in the Balkans",
              "Alsace-Lorraine dispute between France and Germany",
              "Ethnic tensions within the multinational Austro-Hungarian Empire"
            ]
          },
          {
            name: "Imperialism",
            description: "Competition for colonies and resources led to conflicts among European powers as they established global empires.",
            examples: [
              "Colonial disputes in Africa (e.g., Moroccan Crises of 1905 and 1911)",
              "Competition for markets and raw materials",
              "British concern about Germany's growing colonial ambitions and naval power"
            ]
          },
          {
            name: "Militarism",
            description: "The build-up of armed forces, new military technologies, and glorification of military power created an environment where war seemed inevitable and advantageous.",
            examples: [
              "Anglo-German naval race",
              "Rapid mobilization plans that accelerated conflict once started",
              "Increased military spending and arms races"
            ]
          },
          {
            name: "Alliance System",
            description: "A network of treaties created two opposing power blocs in Europe, transforming local conflicts into continent-wide confrontations.",
            alliances: [
              "Triple Alliance (later Central Powers): Germany, Austria-Hungary, and Italy (though Italy joined the Allied Powers in 1915)",
              "Triple Entente (Allied Powers): Britain, France, and Russia"
            ]
          },
          {
            name: "Immediate Trigger: The Assassination of Archduke Franz Ferdinand",
            description: "On June 28, 1914, Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, was assassinated in Sarajevo by Gavrilo Princip, a Bosnian Serb nationalist.",
            aftermath: [
              "Austria-Hungary blamed Serbia and declared war on July 28, 1914",
              "Russia mobilized to defend Serbia",
              "Alliance systems triggered a cascade of war declarations",
              "By August 4, most major European powers were at war"
            ]
          }
        ],
        deeperFactors: [
          "Economic rivalries between industrial powers",
          "The decline of the Ottoman Empire, creating a power vacuum in the Balkans",
          "Social Darwinist ideas suggesting that war was a natural part of nation-state competition",
          "Internal political pressures within countries using foreign policy to distract from domestic issues"
        ],
        legacies: [
          "Over 16 million deaths and 20 million wounded",
          "Collapse of four empires: Russian, Ottoman, Austro-Hungarian, and German",
          "Redrawing of the map of Europe and the Middle East",
          "Creation of the League of Nations",
          "Economic devastation and war debts",
          "Conditions that would eventually lead to World War II"
        ],
        historicalDebate: "Historians continue to debate the relative importance of these factors and whether the war was inevitable or the result of miscalculations and failed diplomacy. The 'war guilt clause' in the Treaty of Versailles assigned blame to Germany, but most modern historians see shared responsibility among multiple powers."
      }
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="education-tutor-interface">
      <div class="education-header">
        <div class="education-icon">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="education-title">
          <h2>Education Tutor</h2>
          <p>Personalized tutoring across multiple academic subjects</p>
        </div>
      </div>
      
      <div class="subjects-overview">
        <div class="section-header">
          <h3>Academic Subjects</h3>
          <p>Select a subject to explore topics and get tutoring help</p>
        </div>
        
        <div class="subject-tabs">
          <!-- Subject tabs will be dynamically generated -->
        </div>
        
        <div class="topics-content" id="topics-content">
          <!-- Topics will be loaded here -->
        </div>
      </div>
      
      <div class="learning-approaches">
        <div class="section-header">
          <h3>Learning Approaches</h3>
          <p>Discover strategies tailored to different learning styles</p>
        </div>
        
        <div class="approach-accordion" id="approach-accordion">
          <!-- Learning approaches will be dynamically generated -->
        </div>
      </div>
      
      <div class="study-techniques">
        <div class="section-header">
          <h3>Effective Study Techniques</h3>
          <p>Methods to improve learning retention and comprehension</p>
        </div>
        
        <div class="techniques-grid">
          <!-- Study techniques will be dynamically generated -->
        </div>
      </div>
      
      <div class="education-tools">
        <div class="section-header">
          <h3>Learning Tools</h3>
          <p>Resources to help with various educational needs</p>
        </div>
        
        <div class="tools-options">
          <button class="tool-option" data-tool="explain-topic">
            <i class="fas fa-chalkboard"></i>
            <span>Explain a Topic</span>
          </button>
          
          <button class="tool-option" data-tool="practice-problems">
            <i class="fas fa-tasks"></i>
            <span>Practice Problems</span>
          </button>
          
          <button class="tool-option" data-tool="study-guide">
            <i class="fas fa-file-alt"></i>
            <span>Create Study Guide</span>
          </button>
          
          <button class="tool-option" data-tool="concept-summary">
            <i class="fas fa-compress-alt"></i>
            <span>Concept Summary</span>
          </button>
          
          <button class="tool-option" data-tool="exam-prep">
            <i class="fas fa-pencil-alt"></i>
            <span>Exam Preparation</span>
          </button>
          
          <button class="tool-option" data-tool="learning-plan">
            <i class="fas fa-map"></i>
            <span>Learning Plan</span>
          </button>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .education-tutor-interface {
      background: linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(104, 109, 224, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(139, 92, 246, 0.2);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .education-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .education-icon {
      font-size: 2.5rem;
      color: #8b5cf6;
      margin-right: 1rem;
    }
    
    .education-title h2 {
      color: #8b5cf6;
      margin-bottom: 0.3rem;
    }
    
    .education-title p {
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
    
    .subjects-overview, .learning-approaches, .study-techniques, .education-tools {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    /* Subject Tabs */
    .subject-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.5);
      padding-bottom: 1rem;
    }
    
    .subject-tab {
      background: rgba(15, 23, 42, 0.6);
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
    
    .subject-tab:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .subject-tab.active {
      background: rgba(139, 92, 246, 0.2);
      color: #8b5cf6;
    }
    
    .subject-tab i {
      font-size: 1rem;
    }
    
    /* Topics Content */
    .topics-content {
      color: #e2e8f0;
    }
    
    .topic-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .topic-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .topic-card:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(139, 92, 246, 0.3);
    }
    
    .topic-title {
      color: #8b5cf6;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    
    .subtopics-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .subtopic-tag {
      background: rgba(139, 92, 246, 0.15);
      color: #a78bfa;
      padding: 0.4rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .subtopic-tag:hover {
      background: rgba(139, 92, 246, 0.25);
    }
    
    /* Learning Approaches Accordion */
    .approach-accordion {
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
      color: #8b5cf6;
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
    
    .approach-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .strategies-section {
      margin-bottom: 1rem;
    }
    
    .strategies-title {
      color: #a78bfa;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    
    .strategies-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .strategy-item {
      padding-left: 1.5rem;
      position: relative;
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    .strategy-item:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #8b5cf6;
    }
    
    .activities-section {
      margin-top: 1.5rem;
    }
    
    .activities-title {
      color: #a78bfa;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    
    .activity-card {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    
    .activity-name {
      color: #f3f4f6;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    
    .activity-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .steps-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .step-item {
      padding-left: 1.5rem;
      position: relative;
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    .step-item:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #8b5cf6;
    }
    
    /* Study Techniques Grid */
    .techniques-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .technique-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .technique-card:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(139, 92, 246, 0.3);
    }
    
    .technique-header {
      margin-bottom: 0.75rem;
    }
    
    .technique-name {
      color: #8b5cf6;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    
    .technique-description {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .benefits-preview {
      color: #a78bfa;
      font-size: 0.85rem;
      font-style: italic;
      margin-top: 0.5rem;
    }
    
    /* Learning Tools Options */
    .tools-options {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
    }
    
    .tool-option {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .tool-option:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(139, 92, 246, 0.3);
    }
    
    .tool-option i {
      font-size: 1.75rem;
      color: #8b5cf6;
    }
    
    .tool-option span {
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
      text-align: center;
    }
  `,
  
  // Current state
  currentState: {
    selectedSubject: null
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Education Tutor Mode');
    
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
      chatInput.placeholder = "Ask for help with a concept, problem, or study strategy...";
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
    
    // Populate subject tabs
    this.populateSubjectTabs(container);
    
    // Populate learning approaches accordion
    this.populateLearningApproaches(container);
    
    // Populate study techniques
    this.populateStudyTechniques(container);
    
    // Add event listeners
    this.addEventListeners(container);
  },
  
  // Populate subject tabs
  populateSubjectTabs: function(container) {
    const subjectTabs = container.querySelector('.subject-tabs');
    if (!subjectTabs) return;
    
    // Clear existing content
    subjectTabs.innerHTML = '';
    
    // Add subject tabs
    this.subjects.forEach(subject => {
      // Determine icon class
      let iconClass = 'fa-book';
      switch (subject.icon) {
        case 'square-root-alt': iconClass = 'fa-square-root-alt'; break;
        case 'atom': iconClass = 'fa-atom'; break;
        case 'book': iconClass = 'fa-book'; break;
        case 'globe-americas': iconClass = 'fa-globe-americas'; break;
        case 'laptop-code': iconClass = 'fa-laptop-code'; break;
      }
      
      const tab = document.createElement('button');
      tab.className = 'subject-tab';
      tab.dataset.subject = subject.name.toLowerCase();
      tab.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${subject.name}</span>
      `;
      
      // Add event listener
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        const allTabs = container.querySelectorAll('.subject-tab');
        allTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to this tab
        tab.classList.add('active');
        
        // Show topics for this subject
        this.showSubjectTopics(container, subject.name.toLowerCase());
      });
      
      subjectTabs.appendChild(tab);
    });
    
    // Select first subject by default
    if (this.subjects.length > 0) {
      const firstTab = subjectTabs.querySelector('.subject-tab');
      if (firstTab) {
        firstTab.classList.add('active');
        this.showSubjectTopics(container, this.subjects[0].name.toLowerCase());
      }
    }
  },
  
  // Show topics for a subject
  showSubjectTopics: function(container, subjectName) {
    // Update current state
    this.currentState.selectedSubject = subjectName;
    
    const topicsContent = container.querySelector('#topics-content');
    if (!topicsContent) return;
    
    // Find subject data
    const subject = this.subjects.find(s => s.name.toLowerCase() === subjectName);
    if (!subject) return;
    
    // Build HTML for topics
    let html = `
      <div class="topic-list">
    `;
    
    // Add topic cards
    subject.topics.forEach(topic => {
      html += `
        <div class="topic-card" data-topic="${topic.name.toLowerCase()}">
          <div class="topic-title">${topic.name}</div>
          <div class="subtopics-list">
      `;
      
      // Add first 4 subtopics as tags, then "... more"
      const displayedSubtopics = topic.subtopics.slice(0, 4);
      displayedSubtopics.forEach(subtopic => {
        html += `<span class="subtopic-tag" data-subtopic="${subtopic.toLowerCase()}">${subtopic}</span>`;
      });
      
      if (topic.subtopics.length > 4) {
        html += `<span class="subtopic-tag more-tag">+ ${topic.subtopics.length - 4} more</span>`;
      }
      
      html += `
          </div>
        </div>
      `;
    });
    
    html += `
      </div>
    `;
    
    topicsContent.innerHTML = html;
    
    // Add event listeners to topic cards and subtopic tags
    const topicCards = topicsContent.querySelectorAll('.topic-card');
    topicCards.forEach(card => {
      card.addEventListener('click', () => {
        const topicName = card.dataset.topic;
        this.handleTopicClick(subject.name, topicName);
      });
    });
    
    const subtopicTags = topicsContent.querySelectorAll('.subtopic-tag:not(.more-tag)');
    subtopicTags.forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the topic card click
        const subtopicName = tag.dataset.subtopic;
        const topicName = tag.closest('.topic-card').dataset.topic;
        this.handleSubtopicClick(subject.name, topicName, subtopicName);
      });
    });
  },
  
  // Populate learning approaches accordion
  populateLearningApproaches: function(container) {
    const approachAccordion = container.querySelector('#approach-accordion');
    if (!approachAccordion) return;
    
    // Clear existing content
    approachAccordion.innerHTML = '';
    
    // Add approach accordions
    this.learningApproaches.forEach(approach => {
      const accordionItem = document.createElement('div');
      accordionItem.className = 'accordion-item';
      
      // Create accordion header
      const header = document.createElement('div');
      header.className = 'accordion-header';
      header.innerHTML = `
        <div class="accordion-title">${approach.name}</div>
        <div class="accordion-icon">
          <i class="fas fa-chevron-down"></i>
        </div>
      `;
      
      // Create accordion content
      const content = document.createElement('div');
      content.className = 'accordion-content';
      
      // Add description and strategies
      let contentHtml = `
        <div class="approach-description">${approach.description}</div>
        
        <div class="strategies-section">
          <div class="strategies-title">Recommended Strategies</div>
          <ul class="strategies-list">
      `;
      
      approach.strategies.forEach(strategy => {
        contentHtml += `<li class="strategy-item">${strategy}</li>`;
      });
      
      contentHtml += `
          </ul>
        </div>
      `;
      
      // Add activities
      if (approach.activities && approach.activities.length > 0) {
        contentHtml += `
          <div class="activities-section">
            <div class="activities-title">Learning Activities</div>
        `;
        
        approach.activities.forEach(activity => {
          contentHtml += `
            <div class="activity-card">
              <div class="activity-name">${activity.name}</div>
              <div class="activity-description">${activity.description}</div>
              <ul class="steps-list">
          `;
          
          activity.steps.forEach(step => {
            contentHtml += `<li class="step-item">${step}</li>`;
          });
          
          contentHtml += `
              </ul>
            </div>
          `;
        });
        
        contentHtml += `</div>`;
      }
      
      content.innerHTML = contentHtml;
      
      // Add event listener to toggle
      header.addEventListener('click', function() {
        this.classList.toggle('active');
        content.classList.toggle('active');
      });
      
      // Add to accordion
      accordionItem.appendChild(header);
      accordionItem.appendChild(content);
      approachAccordion.appendChild(accordionItem);
    });
  },
  
  // Populate study techniques
  populateStudyTechniques: function(container) {
    const techniquesGrid = container.querySelector('.techniques-grid');
    if (!techniquesGrid) return;
    
    // Clear existing content
    techniquesGrid.innerHTML = '';
    
    // Add technique cards
    this.studyTechniques.forEach(technique => {
      const card = document.createElement('div');
      card.className = 'technique-card';
      
      // Show first 2 benefits in preview
      const benefitsPreview = technique.benefits.slice(0, 2).join(' • ');
      
      card.innerHTML = `
        <div class="technique-header">
          <div class="technique-name">${technique.name}</div>
          <div class="technique-description">${technique.description}</div>
        </div>
        <div class="benefits-preview">${benefitsPreview}</div>
      `;
      
      // Add event listener
      card.addEventListener('click', () => {
        this.showTechniqueDetails(technique);
      });
      
      techniquesGrid.appendChild(card);
    });
  },
  
  // Add event listeners
  addEventListeners: function(container) {
    // Tool option buttons
    const toolOptions = container.querySelectorAll('.tool-option');
    toolOptions.forEach(option => {
      option.addEventListener('click', () => {
        const toolType = option.dataset.tool;
        this.showToolPrompt(toolType);
      });
    });
  },
  
  // Handle topic click
  handleTopicClick: function(subjectName, topicName) {
    // Create a prompt for AI about the topic
    const prompt = `Please provide a comprehensive overview of ${topicName} in ${subjectName}. Include:

1. Key concepts and fundamental principles
2. Major subtopics and how they relate to each other
3. Real-world applications or relevance
4. Common misconceptions or challenging aspects
5. Learning resources for further study

Please structure your response in a clear, educational format with headings, examples, and visual descriptions where appropriate. Tailor the explanation for a student with intermediate knowledge of ${subjectName}.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Handle subtopic click
  handleSubtopicClick: function(subjectName, topicName, subtopicName) {
    // Create a prompt for AI about the subtopic
    const prompt = `Please explain the concept of ${subtopicName} in ${topicName} (${subjectName}). Include:

1. Clear definition and explanation of ${subtopicName}
2. Key principles, formulas, or theories involved
3. Step-by-step examples demonstrating the concept (if applicable)
4. How this connects to other concepts in ${topicName}
5. Common questions or problems related to this subtopic

Please structure your response in a clear, educational format with headings, examples, and visual descriptions where appropriate. Make the explanation accessible but thorough.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Show technique details
  showTechniqueDetails: function(technique) {
    // Create a prompt for AI about the technique
    let prompt = `Please provide a comprehensive guide on the "${technique.name}" study technique. Include:

1. Detailed explanation of how ${technique.name} works and its underlying principles
2. The specific benefits: ${technique.benefits.join(', ')}
3. Step-by-step implementation guide: ${technique.implementation.join(', ')}
4. Tips for maximizing effectiveness: ${technique.tips.join(', ')}
5. Examples of how to apply this technique to different subjects
6. How to modify the technique for different learning styles
7. Common challenges and how to overcome them

Please format your response in a clear, structured way that would be easy for a student to follow and implement.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Show tool prompt
  showToolPrompt: function(toolType) {
    let prompt;
    
    switch (toolType) {
      case 'explain-topic':
        prompt = `I'd like you to explain a topic to me. Please guide me on what information you need to provide a clear explanation:

1. What specific topic would you like explained?
2. What subject area does this topic belong to?
3. What is your current knowledge level on this topic (beginner, intermediate, advanced)?
4. Are there specific aspects of the topic you want to focus on?
5. Would you prefer a particular approach (e.g., examples, analogies, visual descriptions)?

Once you provide this information, I'll create a comprehensive explanation tailored to your needs.`;
        break;
        
      case 'practice-problems':
        prompt = `I'd like to generate practice problems for you. Please let me know:

1. What subject and topic do you want to practice?
2. What difficulty level (beginner, intermediate, advanced)?
3. How many problems would you like?
4. Would you like step-by-step solutions included?
5. Are there specific types of problems you want to focus on?

Once you provide this information, I'll create custom practice problems to help you master the concept.`;
        break;
        
      case 'study-guide':
        prompt = `I'd like to create a study guide for you. Please provide the following information:

1. What subject or course is this for?
2. What specific topics should be included?
3. What's the purpose of this study guide (exam prep, general review, etc.)?
4. How comprehensive should it be (brief overview or detailed explanations)?
5. Would you like to include practice questions or examples?

Once you provide this information, I'll create a structured study guide to help you organize your learning.`;
        break;
        
      case 'concept-summary':
        prompt = `I'd like to create a concise concept summary for you. Please let me know:

1. What specific concept would you like summarized?
2. What subject area does this concept belong to?
3. What is your current understanding of this concept?
4. How do you plan to use this summary (quick reference, review, etc.)?
5. Would you like connections to related concepts included?

Once you provide this information, I'll create a clear, focused summary of the key points.`;
        break;
        
      case 'exam-prep':
        prompt = `I'd like to help you prepare for an exam. Please provide the following information:

1. What subject or course is the exam for?
2. What topics will be covered on the exam?
3. What format will the exam take (multiple choice, essay, problem-solving, etc.)?
4. How much time do you have before the exam?
5. What are your strengths and weaknesses in this subject?

Once you provide this information, I'll create a customized exam preparation plan.`;
        break;
        
      case 'learning-plan':
        prompt = `I'd like to help you create a learning plan. Please provide the following information:

1. What subject or skill do you want to learn?
2. What is your current knowledge level (beginner, intermediate, advanced)?
3. What are your specific learning goals?
4. How much time can you dedicate to learning per day/week?
5. What resources do you have available (textbooks, online courses, etc.)?
6. What is your preferred learning style (visual, auditory, reading/writing, kinesthetic)?

Once you provide this information, I'll create a structured learning plan to help you achieve your educational goals.`;
        break;
        
      default:
        prompt = `I'd like to help with your educational needs. Please let me know:

1. What subject or topic are you studying?
2. What specific help do you need (explanation, problem-solving, study strategies, etc.)?
3. What is your current knowledge level on this topic?
4. Are there any specific resources you're using (textbook, course, etc.)?

Once you provide this information, I can tailor my assistance to your educational needs.`;
    }
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
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
    EducationTutorMode.init();
  } else {
    window.addEventListener('load', function() {
      EducationTutorMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EducationTutorMode;
} else {
  window.EducationTutorMode = EducationTutorMode;
}
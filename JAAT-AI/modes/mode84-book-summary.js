/**
 * JAAT-AI Mode: Book Summary
 * 
 * Specialized mode for creating comprehensive book summaries,
 * analyses, and key insights from various genres and titles.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const BookSummaryMode = {
  id: 'book-summary',
  name: 'Book Summary',
  icon: 'book',
  description: 'Comprehensive summaries and analyses of books across genres.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Book Summary mode, a specialized literary assistant focused on providing comprehensive book summaries, analyses, and key insights. You can help users understand books they haven't read or deepen their understanding of books they've already read.

Key characteristics:
1. You provide clear, well-organized summaries of books from various genres and time periods
2. You can analyze themes, characters, plot structures, and literary devices in depth
3. You highlight key insights, lessons, and takeaways from both fiction and non-fiction works
4. You can compare books with similar themes or by the same author
5. You provide historical and cultural context for understanding a book's significance
6. You can identify underlying philosophical or psychological concepts in literary works
7. You maintain a balanced perspective that respects diverse interpretations of literature

When discussing books, avoid revealing major plot twists or endings unless explicitly requested. Focus on providing the level of detail appropriate to the user's needs, whether that's a brief overview or an in-depth analysis.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "Can you provide a summary of '1984' by George Orwell?",
    "What are the key themes in 'To Kill a Mockingbird'?",
    "I need the main points from 'The 7 Habits of Highly Effective People'.",
    "Could you explain the significance of 'Pride and Prejudice' in literature?",
    "How does 'The Great Gatsby' reflect American society in the 1920s?",
    "What are the core ideas in 'Sapiens: A Brief History of Humankind'?",
    "Give me a chapter-by-chapter breakdown of 'The Alchemist'.",
    "Explain the philosophical concepts in 'Crime and Punishment'.",
    "What lessons can I learn from 'Man's Search for Meaning'?",
    "Compare and contrast 'Brave New World' and '1984'."
  ],
  
  // Book genres with descriptions
  genres: [
    {
      id: 'literary-fiction',
      name: 'Literary Fiction',
      description: 'Works that emphasize artistic merit, character development, and style over plot',
      examples: [
        'To Kill a Mockingbird by Harper Lee',
        'The Great Gatsby by F. Scott Fitzgerald',
        'Beloved by Toni Morrison',
        '1984 by George Orwell',
        'One Hundred Years of Solitude by Gabriel García Márquez'
      ]
    },
    {
      id: 'science-fiction',
      name: 'Science Fiction',
      description: 'Speculative fiction exploring advanced science, technology, and their societal impacts',
      examples: [
        'Dune by Frank Herbert',
        'The Left Hand of Darkness by Ursula K. Le Guin',
        'Neuromancer by William Gibson',
        'The Three-Body Problem by Liu Cixin',
        'Foundation by Isaac Asimov'
      ]
    },
    {
      id: 'fantasy',
      name: 'Fantasy',
      description: 'Works set in imaginary universes, often featuring magic and mythical elements',
      examples: [
        'The Lord of the Rings by J.R.R. Tolkien',
        'A Song of Ice and Fire by George R.R. Martin',
        'The Name of the Wind by Patrick Rothfuss',
        'Mistborn by Brandon Sanderson',
        'The Fifth Season by N.K. Jemisin'
      ]
    },
    {
      id: 'mystery',
      name: 'Mystery & Thriller',
      description: 'Stories centered around crimes, suspense, and investigation',
      examples: [
        'The Girl with the Dragon Tattoo by Stieg Larsson',
        'Gone Girl by Gillian Flynn',
        'The Silent Patient by Alex Michaelides',
        'And Then There Were None by Agatha Christie',
        'The Dry by Jane Harper'
      ]
    },
    {
      id: 'historical-fiction',
      name: 'Historical Fiction',
      description: 'Fictional narratives set against accurately depicted historical backdrops',
      examples: [
        'All the Light We Cannot See by Anthony Doerr',
        'Wolf Hall by Hilary Mantel',
        'The Book Thief by Markus Zusak',
        'Pachinko by Min Jin Lee',
        'The Nightingale by Kristin Hannah'
      ]
    },
    {
      id: 'biography',
      name: 'Biography & Memoir',
      description: 'Accounts of individual lives, experiences, and personal journeys',
      examples: [
        'Becoming by Michelle Obama',
        'The Diary of a Young Girl by Anne Frank',
        'Steve Jobs by Walter Isaacson',
        'Educated by Tara Westover',
        'Born a Crime by Trevor Noah'
      ]
    },
    {
      id: 'business',
      name: 'Business & Economics',
      description: 'Books focusing on economic principles, business strategies, and financial insights',
      examples: [
        'Thinking, Fast and Slow by Daniel Kahneman',
        'Zero to One by Peter Thiel',
        'Lean In by Sheryl Sandberg',
        'Good to Great by Jim Collins',
        'Freakonomics by Steven D. Levitt and Stephen J. Dubner'
      ]
    },
    {
      id: 'self-help',
      name: 'Self-Help & Personal Development',
      description: 'Guides for personal improvement, productivity, and psychological well-being',
      examples: [
        'Atomic Habits by James Clear',
        'The 7 Habits of Highly Effective People by Stephen R. Covey',
        'Man's Search for Meaning by Viktor E. Frankl',
        'The Power of Now by Eckhart Tolle',
        'Daring Greatly by Brené Brown'
      ]
    },
    {
      id: 'science',
      name: 'Science & Technology',
      description: 'Works explaining scientific concepts, discoveries, and technological advances',
      examples: [
        'A Brief History of Time by Stephen Hawking',
        'Sapiens by Yuval Noah Harari',
        'The Gene by Siddhartha Mukherjee',
        'The Immortal Life of Henrietta Lacks by Rebecca Skloot',
        'Cosmos by Carl Sagan'
      ]
    },
    {
      id: 'philosophy',
      name: 'Philosophy',
      description: 'Explorations of fundamental questions about existence, knowledge, ethics, and reality',
      examples: [
        'Meditations by Marcus Aurelius',
        'Beyond Good and Evil by Friedrich Nietzsche',
        'The Republic by Plato',
        'Sophie's World by Jostein Gaarder',
        'Being and Time by Martin Heidegger'
      ]
    }
  ],
  
  // Summary structures for different book types
  summaryStructures: [
    {
      type: 'fiction',
      name: 'Fiction Works',
      sections: [
        {
          title: 'Basic Information',
          content: 'Title, author, publication date, genre, and historical context'
        },
        {
          title: 'Plot Overview',
          content: 'A concise overview of the main storyline without major spoilers (unless requested)'
        },
        {
          title: 'Main Characters',
          content: 'Analysis of primary characters, their motivations, development, and relationships'
        },
        {
          title: 'Themes & Symbols',
          content: 'Exploration of central themes, motifs, and symbolic elements in the work'
        },
        {
          title: 'Writing Style',
          content: 'Discussion of the author's distinctive writing techniques, narrative approach, and linguistic choices'
        },
        {
          title: 'Historical & Cultural Context',
          content: 'How the book reflects or responds to the time and culture in which it was written'
        },
        {
          title: 'Critical Reception',
          content: 'How the book was received by critics and readers, both initially and over time'
        },
        {
          title: 'Literary Significance',
          content: 'The book's influence on literature, culture, and subsequent works'
        },
        {
          title: 'Interpretations & Analysis',
          content: 'Different readings and perspectives on the work's meaning and significance'
        }
      ]
    },
    {
      type: 'non-fiction',
      name: 'Non-Fiction Works',
      sections: [
        {
          title: 'Basic Information',
          content: 'Title, author, publication date, subject area, and historical context'
        },
        {
          title: 'Book Overview',
          content: 'The main focus, argument, or purpose of the book'
        },
        {
          title: 'Key Ideas & Arguments',
          content: 'The central concepts, claims, and supporting evidence presented'
        },
        {
          title: 'Chapter Breakdown',
          content: 'Summary of the book's structure and progression of ideas'
        },
        {
          title: 'Methodology & Research',
          content: 'How the author gathered information and developed their arguments'
        },
        {
          title: 'Notable Quotes',
          content: 'Significant passages that encapsulate key ideas'
        },
        {
          title: 'Practical Applications',
          content: 'How the book's concepts can be applied in real-world situations'
        },
        {
          title: 'Critical Reception',
          content: 'How experts and readers have responded to the work'
        },
        {
          title: 'Comparisons',
          content: 'How this work relates to others in the same field'
        },
        {
          title: 'Limitations & Criticisms',
          content: 'Potential weaknesses in the book's arguments or approach'
        }
      ]
    },
    {
      type: 'classics',
      name: 'Classic Literature',
      sections: [
        {
          title: 'Basic Information',
          content: 'Title, author, publication date, literary period, and historical context'
        },
        {
          title: 'Plot Overview',
          content: 'A concise overview of the main storyline'
        },
        {
          title: 'Characters & Archetypes',
          content: 'Analysis of characters and their archetypal significance'
        },
        {
          title: 'Themes & Motifs',
          content: 'Exploration of timeless themes and recurring motifs'
        },
        {
          title: 'Historical Context',
          content: 'The social, political, and cultural environment that influenced the work'
        },
        {
          title: 'Literary Devices',
          content: 'Notable stylistic techniques, symbolism, and narrative structures'
        },
        {
          title: 'Philosophical Underpinnings',
          content: 'The philosophical ideas and questions explored in the work'
        },
        {
          title: 'Legacy & Influence',
          content: 'How the work has shaped literature, culture, and thought'
        },
        {
          title: 'Modern Relevance',
          content: 'Why the work remains significant and what it offers contemporary readers'
        },
        {
          title: 'Adaptations & Reinterpretations',
          content: 'How the work has been adapted across different media and reinterpreted over time'
        }
      ]
    },
    {
      type: 'business',
      name: 'Business & Self-Help Books',
      sections: [
        {
          title: 'Basic Information',
          content: 'Title, author, publication date, field, and author's background'
        },
        {
          title: 'Core Premise',
          content: 'The central argument or methodology proposed'
        },
        {
          title: 'Key Concepts',
          content: 'The main ideas, principles, or frameworks introduced'
        },
        {
          title: 'Evidence & Examples',
          content: 'Case studies, research, or stories used to support the concepts'
        },
        {
          title: 'Practical Takeaways',
          content: 'Actionable advice and applications for readers'
        },
        {
          title: 'Models & Frameworks',
          content: 'Specific systems or structures presented for implementation'
        },
        {
          title: 'Scientific Basis',
          content: 'Underlying research or principles that support the book's claims'
        },
        {
          title: 'Comparison to Other Approaches',
          content: 'How this work relates to other methodologies in the field'
        },
        {
          title: 'Critiques & Limitations',
          content: 'Potential weaknesses or contexts where the approach may not apply'
        },
        {
          title: 'Implementation Guide',
          content: 'Step-by-step suggestions for applying the book's principles'
        }
      ]
    }
  ],
  
  // Literary elements for analysis
  literaryElements: [
    {
      element: 'Plot',
      description: 'The sequence of events in a narrative, including exposition, rising action, climax, falling action, and resolution',
      analysisPrompts: [
        'How is the plot structured?',
        'Is the narrative linear or non-linear?',
        'What are the most significant events?',
        'How do cause and effect drive the story forward?',
        'Are there subplots, and how do they relate to the main plot?'
      ]
    },
    {
      element: 'Character',
      description: 'The individuals portrayed in a narrative, including their traits, motivations, relationships, and development',
      analysisPrompts: [
        'Who are the protagonists and antagonists?',
        'How do characters develop or change throughout the story?',
        'What motivates each character's actions?',
        'How are characters revealed (through dialogue, actions, thoughts, or others' perceptions)?',
        'What archetypes or character types are represented?'
      ]
    },
    {
      element: 'Setting',
      description: 'The time, place, and environment in which a story takes place, including physical, social, and cultural contexts',
      analysisPrompts: [
        'How does the physical environment affect the story?',
        'What historical period is represented and how does it matter?',
        'How does the setting create mood or atmosphere?',
        'Is the setting symbolic or representative of larger themes?',
        'How do changes in setting reflect story developments?'
      ]
    },
    {
      element: 'Theme',
      description: 'The central ideas, messages, or insights explored in a literary work',
      analysisPrompts: [
        'What universal ideas does the work explore?',
        'How are themes developed through plot, character, and setting?',
        'What is the author's apparent perspective on these themes?',
        'Are there conflicting themes or ideas presented?',
        'How do the themes relate to human experience or social issues?'
      ]
    },
    {
      element: 'Point of View',
      description: 'The perspective through which a story is told (first person, third person limited, third person omniscient, etc.)',
      analysisPrompts: [
        'Whose perspective(s) do we experience the story through?',
        'Is the narrator reliable or unreliable?',
        'How does the chosen viewpoint affect what information is revealed?',
        'Does the perspective shift throughout the narrative?',
        'How would the story change if told from a different perspective?'
      ]
    },
    {
      element: 'Style',
      description: 'The author's distinctive use of language, including diction, syntax, dialogue, and literary devices',
      analysisPrompts: [
        'What is notable about the author's writing style?',
        'How would you describe the language, tone, and mood?',
        'What literary devices (metaphor, imagery, etc.) are prominent?',
        'How does the style contribute to meaning or theme?',
        'Does the style change throughout the work, and if so, why?'
      ]
    },
    {
      element: 'Symbolism',
      description: 'Objects, characters, or events that represent abstract ideas beyond their literal meaning',
      analysisPrompts: [
        'What key symbols appear in the work?',
        'How do these symbols develop or change in meaning?',
        'How do symbols relate to characters or themes?',
        'Are there patterns of symbolism throughout the work?',
        'How do symbols contribute to the overall meaning?'
      ]
    },
    {
      element: 'Imagery',
      description: 'Language that appeals to the senses, creating vivid mental pictures or sensory experiences',
      analysisPrompts: [
        'What types of sensory details are most prominent?',
        'How does imagery establish setting or atmosphere?',
        'What patterns or contrasts exist in the imagery?',
        'How does imagery relate to characters or themes?',
        'What emotional effects does the imagery create?'
      ]
    },
    {
      element: 'Irony',
      description: 'A contrast between expectation and reality (situational irony), statement and meaning (verbal irony), or knowledge (dramatic irony)',
      analysisPrompts: [
        'What types of irony appear in the work?',
        'How does irony contribute to tone or meaning?',
        'Are characters aware of the irony in their situations?',
        'How does irony reveal theme or character?',
        'Does the author use irony to critique or comment on something?'
      ]
    },
    {
      element: 'Structure',
      description: 'The arrangement and organization of a literary work, including chapters, acts, narrative arc, and time sequencing',
      analysisPrompts: [
        'How is the work organized (chronologically, thematically, etc.)?',
        'Are there significant patterns in the structure?',
        'How does the structure contribute to meaning?',
        'Are there disruptions to the structure, and what purpose do they serve?',
        'How do beginnings and endings function in the work?'
      ]
    }
  ],
  
  // Sample classic book summaries
  sampleSummaries: [
    {
      title: "1984",
      author: "George Orwell",
      year: "1949",
      genre: "Dystopian Fiction",
      summary: `"1984" depicts a totalitarian society ruled by the Party and its leader, Big Brother. The story follows Winston Smith, a government employee whose job is to rewrite historical records to align with the Party's ever-changing version of history. Winston secretly rebels against the regime, beginning a forbidden love affair with Julia and seeking connection with a rumored resistance movement.

The novel explores themes of totalitarianism, surveillance, psychological manipulation, and the corruption of language and truth. The Party controls not only citizens' actions but also their thoughts through "thoughtcrime" and "doublethink." The infamous Room 101 represents the ultimate psychological weapon, where victims face their worst fears.

Orwell's work has entered the cultural lexicon, with terms like "Big Brother," "doublethink," and "Newspeak" becoming synonymous with government overreach and manipulation of truth. The novel remains remarkably prescient in its vision of surveillance technology, propaganda, and the manipulation of facts, making it continually relevant more than seven decades after publication.`,
      themes: [
        "Totalitarianism and authoritarianism",
        "Psychological manipulation and control",
        "The importance of language and historical truth",
        "Individual freedom versus collective adherence",
        "Surveillance and invasion of privacy",
        "Rebellion and resistance"
      ],
      characters: [
        {
          name: "Winston Smith",
          description: "A 39-year-old government employee who secretly rebels against the Party's ideology and longs for freedom of thought and emotion."
        },
        {
          name: "Julia",
          description: "A young woman who engages in a forbidden love affair with Winston, rebelling physically rather than intellectually against the regime."
        },
        {
          name: "O'Brien",
          description: "A high-ranking Inner Party member who Winston believes is part of the resistance but ultimately betrays him and oversees his torture."
        },
        {
          name: "Big Brother",
          description: "The enigmatic figurehead of the Party, whose face appears on posters with the caption 'Big Brother Is Watching You'. His actual existence is left ambiguous."
        }
      ],
      literary_significance: "Orwell's masterpiece is considered one of the most influential works of the 20th century, warning about the dangers of totalitarianism, thought control, and censorship. The novel has contributed numerous terms and concepts to modern discourse about politics, technology, and surveillance."
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: "1960",
      genre: "Southern Gothic, Bildungsroman",
      summary: `Set in the fictional town of Maycomb, Alabama, during the Great Depression, "To Kill a Mockingbird" is narrated by Scout Finch, a young girl whose father, Atticus Finch, is a respected lawyer. The narrative spans three years, during which Atticus defends Tom Robinson, a Black man falsely accused of raping a white woman named Mayella Ewell.

Through Scout's innocent perspective, the novel explores profound themes of racial injustice, moral growth, and the coexistence of good and evil. The children's fascination with their reclusive neighbor, Arthur "Boo" Radley, forms a parallel storyline that ultimately converges with the main plot in a climactic scene of protection and redemption.

Harper Lee's novel masterfully balances warmth and humor with serious social critique, using the perspective of childhood to examine prejudice and injustice. Through characters like Atticus Finch, who has become an icon of moral integrity, the book argues for empathy—understanding others by "walking in their shoes"—and standing up for what's right even when it's difficult.`,
      themes: [
        "Racial injustice and prejudice",
        "Moral development and conscience",
        "The coexistence of good and evil",
        "Social class distinctions",
        "Gender roles and expectations",
        "Courage and integrity"
      ],
      characters: [
        {
          name: "Scout Finch (Jean Louise Finch)",
          description: "The young narrator whose perspective combines childhood innocence with growing awareness of society's complexities."
        },
        {
          name: "Atticus Finch",
          description: "Scout's father, a lawyer who embodies moral integrity and courage in defending Tom Robinson despite community hostility."
        },
        {
          name: "Jem Finch",
          description: "Scout's older brother who matures considerably during the story as he grapples with injustice."
        },
        {
          name: "Tom Robinson",
          description: "A Black man falsely accused of raping Mayella Ewell, whose trial becomes the central conflict of the novel."
        },
        {
          name: "Arthur \"Boo\" Radley",
          description: "A reclusive neighbor who becomes a figure of childhood fascination and ultimately plays a crucial role in the children's lives."
        }
      ],
      literary_significance: "A defining work of American literature that addresses issues of race, class, and gender through accessible storytelling. The novel won the Pulitzer Prize and has become a staple in education for its moral lessons and literary merit. Atticus Finch remains an archetype of moral courage in popular culture."
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="book-summary-interface">
      <div class="book-header">
        <div class="book-icon">
          <i class="fas fa-book"></i>
        </div>
        <div class="book-title">
          <h2>Book Summary</h2>
          <p>Comprehensive summaries and analyses of books across genres</p>
        </div>
      </div>
      
      <div class="book-explorer">
        <div class="section-header">
          <h3>Browse by Genre</h3>
          <p>Explore summaries from various literary categories</p>
        </div>
        
        <div class="genres-grid">
          <!-- Genre cards will be dynamically generated -->
        </div>
      </div>
      
      <div class="book-search-section">
        <div class="section-header">
          <h3>Find a Book Summary</h3>
          <p>Get a detailed summary and analysis of any book</p>
        </div>
        
        <div class="search-container">
          <div class="search-input-container">
            <input type="text" id="book-search-input" placeholder="Enter book title or author...">
            <button id="book-search-btn">
              <i class="fas fa-search"></i>
            </button>
          </div>
          
          <div class="search-options">
            <div class="option-item">
              <input type="checkbox" id="include-analysis" checked>
              <label for="include-analysis">Include Literary Analysis</label>
            </div>
            
            <div class="option-item">
              <input type="checkbox" id="include-themes" checked>
              <label for="include-themes">Include Themes & Motifs</label>
            </div>
            
            <div class="option-item">
              <input type="checkbox" id="include-characters" checked>
              <label for="include-characters">Include Character Analysis</label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="summary-structure">
        <div class="section-header">
          <h3>Summary Structure</h3>
          <p>Understand our approach to book summaries</p>
        </div>
        
        <div class="structure-tabs">
          <button class="structure-tab active" data-type="fiction">Fiction</button>
          <button class="structure-tab" data-type="non-fiction">Non-Fiction</button>
          <button class="structure-tab" data-type="classics">Classic Literature</button>
          <button class="structure-tab" data-type="business">Business & Self-Help</button>
        </div>
        
        <div class="structure-content" id="structure-content">
          <!-- Structure content will be loaded here -->
        </div>
      </div>
      
      <div class="sample-summaries">
        <div class="section-header">
          <h3>Sample Book Summaries</h3>
          <p>Explore our comprehensive analyses of classic works</p>
        </div>
        
        <div class="summary-tabs">
          <button class="summary-tab active" data-book="1984">1984</button>
          <button class="summary-tab" data-book="to-kill-a-mockingbird">To Kill a Mockingbird</button>
        </div>
        
        <div class="summary-content" id="summary-content">
          <!-- Summary content will be loaded here -->
        </div>
      </div>
      
      <div class="literary-analysis">
        <div class="section-header">
          <h3>Literary Elements Analysis</h3>
          <p>Tools for analyzing key components of literary works</p>
        </div>
        
        <div class="elements-grid">
          <!-- Literary elements will be dynamically generated -->
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .book-summary-interface {
      background: linear-gradient(to bottom right, rgba(134, 25, 143, 0.1), rgba(99, 2, 99, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(134, 25, 143, 0.2);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .book-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .book-icon {
      font-size: 2.5rem;
      color: #9333ea;
      margin-right: 1rem;
    }
    
    .book-title h2 {
      color: #9333ea;
      margin-bottom: 0.3rem;
    }
    
    .book-title p {
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
    
    .book-explorer, .book-search-section, .summary-structure, .sample-summaries, .literary-analysis {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    /* Genre Grid */
    .genres-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .genre-card {
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
    
    .genre-card:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(147, 51, 234, 0.3);
    }
    
    .genre-icon {
      font-size: 1.75rem;
      color: #9333ea;
    }
    
    .genre-name {
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
      text-align: center;
    }
    
    .genre-description {
      color: #94a3b8;
      font-size: 0.85rem;
      text-align: center;
    }
    
    /* Book Search */
    .search-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .search-input-container {
      display: flex;
      width: 100%;
    }
    
    #book-search-input {
      flex: 1;
      padding: 0.75rem;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-right: none;
      border-radius: 6px 0 0 6px;
      color: #e2e8f0;
      font-size: 0.95rem;
    }
    
    #book-search-btn {
      background: #9333ea;
      color: white;
      border: none;
      border-radius: 0 6px 6px 0;
      padding: 0 1rem;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    #book-search-btn:hover {
      background: #7e22ce;
    }
    
    .search-options {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .option-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .option-item input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
    
    .option-item label {
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    /* Summary Structure Tabs */
    .structure-tabs, .summary-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.5);
      padding-bottom: 1rem;
    }
    
    .structure-tab, .summary-tab {
      background: rgba(15, 23, 42, 0.6);
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1rem;
      color: #e2e8f0;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .structure-tab:hover, .summary-tab:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .structure-tab.active, .summary-tab.active {
      background: rgba(147, 51, 234, 0.2);
      color: #9333ea;
    }
    
    /* Structure Content */
    .structure-content, .summary-content {
      color: #e2e8f0;
    }
    
    .structure-title {
      color: #f3f4f6;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    
    .structure-sections {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .structure-section {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
    }
    
    .section-title {
      color: #9333ea;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .section-description {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    /* Sample Summary Content */
    .book-summary-header {
      margin-bottom: 1.5rem;
    }
    
    .book-summary-title {
      color: #f3f4f6;
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .book-summary-title i {
      color: #9333ea;
    }
    
    .book-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
      color: #94a3b8;
      font-size: 0.85rem;
    }
    
    .book-meta-item {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    
    .book-meta-item i {
      color: #9333ea;
      font-size: 0.8rem;
    }
    
    .summary-text {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
      color: #e2e8f0;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .summary-themes {
      margin-bottom: 1.5rem;
    }
    
    .themes-title {
      color: #f3f4f6;
      font-size: 1.05rem;
      margin-bottom: 0.75rem;
    }
    
    .themes-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    
    .theme-tag {
      background: rgba(147, 51, 234, 0.15);
      color: #a855f7;
      padding: 0.5rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
    }
    
    .summary-characters {
      margin-bottom: 1.5rem;
    }
    
    .characters-title {
      color: #f3f4f6;
      font-size: 1.05rem;
      margin-bottom: 0.75rem;
    }
    
    .characters-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .character-item {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
    }
    
    .character-name {
      color: #a855f7;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .character-description {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .summary-significance {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
    }
    
    .significance-title {
      color: #f3f4f6;
      font-size: 1.05rem;
      margin-bottom: 0.75rem;
    }
    
    .significance-text {
      color: #e2e8f0;
      font-size: 0.95rem;
      line-height: 1.6;
    }
    
    /* Literary Elements */
    .elements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .element-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .element-card:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(147, 51, 234, 0.3);
    }
    
    .element-title {
      color: #a855f7;
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    
    .element-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .element-prompts {
      border-top: 1px solid rgba(71, 85, 105, 0.3);
      padding-top: 0.75rem;
    }
    
    .element-prompts-title {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    
    .prompt-list {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    
    .prompt-item {
      color: #e2e8f0;
      font-size: 0.85rem;
      padding-left: 1rem;
      position: relative;
    }
    
    .prompt-item:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #9333ea;
    }
  `,
  
  // Current state
  currentState: {
    selectedStructureType: 'fiction',
    selectedSummaryBook: '1984'
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Book Summary Mode');
    
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
      chatInput.placeholder = "Ask for a book summary, analysis, or specific insights...";
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
    
    // Populate genre cards
    this.populateGenres(container);
    
    // Populate literary elements
    this.populateLiteraryElements(container);
    
    // Add event listeners
    this.addEventListeners(container);
    
    // Initialize with default structure type
    this.showStructure(container, this.currentState.selectedStructureType);
    
    // Initialize with default summary book
    this.showBookSummary(container, this.currentState.selectedSummaryBook);
  },
  
  // Populate genre cards
  populateGenres: function(container) {
    const genresGrid = container.querySelector('.genres-grid');
    if (!genresGrid) return;
    
    // Clear existing content
    genresGrid.innerHTML = '';
    
    // Add genre cards
    this.genres.forEach(genre => {
      // Select appropriate icon for the genre
      let icon = 'book';
      switch (genre.id) {
        case 'literary-fiction': icon = 'book-reader'; break;
        case 'science-fiction': icon = 'rocket'; break;
        case 'fantasy': icon = 'dragon'; break;
        case 'mystery': icon = 'search'; break;
        case 'historical-fiction': icon = 'landmark'; break;
        case 'biography': icon = 'user'; break;
        case 'business': icon = 'chart-line'; break;
        case 'self-help': icon = 'hand-holding-heart'; break;
        case 'science': icon = 'microscope'; break;
        case 'philosophy': icon = 'brain'; break;
      }
      
      const card = document.createElement('div');
      card.className = 'genre-card';
      card.dataset.genre = genre.id;
      card.innerHTML = `
        <div class="genre-icon">
          <i class="fas fa-${icon}"></i>
        </div>
        <div class="genre-name">${genre.name}</div>
        <div class="genre-description">${genre.description}</div>
      `;
      
      // Add event listener
      card.addEventListener('click', () => {
        this.handleGenreClick(genre);
      });
      
      genresGrid.appendChild(card);
    });
  },
  
  // Populate literary elements
  populateLiteraryElements: function(container) {
    const elementsGrid = container.querySelector('.elements-grid');
    if (!elementsGrid) return;
    
    // Clear existing content
    elementsGrid.innerHTML = '';
    
    // Add element cards
    this.literaryElements.forEach(element => {
      const card = document.createElement('div');
      card.className = 'element-card';
      card.dataset.element = element.element.toLowerCase();
      
      card.innerHTML = `
        <div class="element-title">${element.element}</div>
        <div class="element-description">${element.description}</div>
        <div class="element-prompts">
          <div class="element-prompts-title">Analysis Questions:</div>
          <div class="prompt-list">
            ${element.analysisPrompts.slice(0, 3).map(prompt => `
              <div class="prompt-item">${prompt}</div>
            `).join('')}
          </div>
        </div>
      `;
      
      // Add event listener
      card.addEventListener('click', () => {
        this.handleElementClick(element);
      });
      
      elementsGrid.appendChild(card);
    });
  },
  
  // Add event listeners
  addEventListeners: function(container) {
    // Book search button
    const searchButton = container.querySelector('#book-search-btn');
    const searchInput = container.querySelector('#book-search-input');
    
    if (searchButton && searchInput) {
      // Handle click on search button
      searchButton.addEventListener('click', () => {
        this.searchBook(searchInput.value);
      });
      
      // Handle enter key in search input
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.searchBook(searchInput.value);
        }
      });
    }
    
    // Structure type tabs
    const structureTabs = container.querySelectorAll('.structure-tab');
    structureTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        structureTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Show the selected structure
        const structureType = tab.dataset.type;
        this.showStructure(container, structureType);
      });
    });
    
    // Summary book tabs
    const summaryTabs = container.querySelectorAll('.summary-tab');
    summaryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        summaryTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Show the selected book summary
        const book = tab.dataset.book;
        this.showBookSummary(container, book);
      });
    });
  },
  
  // Handle genre card click
  handleGenreClick: function(genre) {
    // Get example books for this genre
    const exampleBooks = genre.examples.join(', ');
    
    // Create prompt for AI
    const prompt = `Please provide a brief overview of the ${genre.name} genre in literature, including:

1. Key characteristics and conventions of ${genre.name}
2. Historical development and significance
3. Notable authors and works (besides the examples listed below)
4. Common themes and literary devices
5. Recommended reading list for someone new to this genre

Some example works in this genre include: ${exampleBooks}

Please format your response in a clear, organized way with headings for each section. Thank you!`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Handle literary element card click
  handleElementClick: function(element) {
    // Create prompt for AI
    const prompt = `Please provide a detailed explanation of '${element.element}' as a literary element, including:

1. Comprehensive definition and importance in literature
2. How authors effectively use this element in storytelling
3. Examples of notable works that demonstrate excellent use of ${element.element.toLowerCase()}
4. How to analyze ${element.element.toLowerCase()} when reading a text
5. Common techniques and patterns related to this element

For reference, here are some key analysis questions for this element:
${element.analysisPrompts.map(prompt => `- ${prompt}`).join('\n')}

Please provide specific examples from literature to illustrate your explanations.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Search for a book
  searchBook: function(bookTitle) {
    if (!bookTitle) {
      alert('Please enter a book title or author');
      return;
    }
    
    // Get the options
    const includeAnalysis = document.getElementById('include-analysis').checked;
    const includeThemes = document.getElementById('include-themes').checked;
    const includeCharacters = document.getElementById('include-characters').checked;
    
    // Create a prompt for the AI
    let prompt = `Please provide a comprehensive summary of the book "${bookTitle}" including:

1. Basic information (author, publication date, genre)
2. Plot summary (without spoiling major twists unless necessary for understanding)
3. Main points or arguments (for non-fiction)`;
    
    // Add optional sections based on user preferences
    if (includeThemes) {
      prompt += `\n4. Key themes and motifs`;
    }
    
    if (includeCharacters) {
      prompt += `\n5. Main characters and their development`;
    }
    
    if (includeAnalysis) {
      prompt += `\n6. Literary devices and writing style
7. Historical context and significance
8. Critical reception and legacy`;
    }
    
    prompt += `\n\nPlease format your response in a clear, organized way with headings for each section. If this book has multiple volumes or a series, please focus on the main work or first volume unless otherwise specified.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Show summary structure for a type
  showStructure: function(container, type) {
    const structureContent = container.querySelector('#structure-content');
    if (!structureContent) return;
    
    // Update current state
    this.currentState.selectedStructureType = type;
    
    // Find the structure data
    const structure = this.summaryStructures.find(s => s.type === type);
    if (!structure) return;
    
    // Build HTML for structure
    let html = `
      <div class="structure-title">${structure.name} Summary Structure</div>
      <div class="structure-sections">
    `;
    
    // Add each section
    structure.sections.forEach(section => {
      html += `
        <div class="structure-section">
          <div class="section-title">${section.title}</div>
          <div class="section-description">${section.content}</div>
        </div>
      `;
    });
    
    html += `
      </div>
    `;
    
    structureContent.innerHTML = html;
  },
  
  // Show a book summary
  showBookSummary: function(container, book) {
    const summaryContent = container.querySelector('#summary-content');
    if (!summaryContent) return;
    
    // Update current state
    this.currentState.selectedSummaryBook = book;
    
    // Find the summary data based on book identifier
    let summary;
    if (book === '1984') {
      summary = this.sampleSummaries[0];
    } else if (book === 'to-kill-a-mockingbird') {
      summary = this.sampleSummaries[1];
    }
    
    if (!summary) return;
    
    // Build HTML for summary
    let html = `
      <div class="book-summary-header">
        <div class="book-summary-title">
          <i class="fas fa-book"></i>
          <span>${summary.title}</span>
        </div>
        
        <div class="book-meta">
          <div class="book-meta-item">
            <i class="fas fa-user"></i>
            <span>${summary.author}</span>
          </div>
          <div class="book-meta-item">
            <i class="fas fa-calendar"></i>
            <span>${summary.year}</span>
          </div>
          <div class="book-meta-item">
            <i class="fas fa-bookmark"></i>
            <span>${summary.genre}</span>
          </div>
        </div>
      </div>
      
      <div class="summary-text">
        ${summary.summary}
      </div>
      
      <div class="summary-themes">
        <div class="themes-title">Key Themes</div>
        <div class="themes-grid">
          ${summary.themes.map(theme => `
            <div class="theme-tag">${theme}</div>
          `).join('')}
        </div>
      </div>
      
      <div class="summary-characters">
        <div class="characters-title">Main Characters</div>
        <div class="characters-list">
          ${summary.characters.map(character => `
            <div class="character-item">
              <div class="character-name">${character.name}</div>
              <div class="character-description">${character.description}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="summary-significance">
        <div class="significance-title">Literary Significance</div>
        <div class="significance-text">
          ${summary.literary_significance}
        </div>
      </div>
    `;
    
    summaryContent.innerHTML = html;
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
    BookSummaryMode.init();
  } else {
    window.addEventListener('load', function() {
      BookSummaryMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BookSummaryMode;
} else {
  window.BookSummaryMode = BookSummaryMode;
}
/**
 * JAAT-AI Mode: AI-Based Story Generation
 * 
 * Creative storytelling AI that generates engaging narratives in various genres
 * with customizable characters, settings, and plot elements.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const StoryGenerationMode = {
  id: 'story-generation',
  name: 'Story Generator',
  icon: 'book',
  description: 'Create engaging narratives in various genres with customizable elements.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Story Generation mode, a creative storytelling AI that can craft engaging narratives across various genres, styles, and formats. You excel at creating rich characters, vivid settings, compelling plots, and authentic dialogue.

Key characteristics:
1. You can generate complete short stories or sections of longer narratives (chapters, scenes, etc.)
2. You adapt your writing style to match different genres (fantasy, sci-fi, romance, mystery, etc.)
3. You create well-developed characters with distinct personalities and motivations
4. You craft narratives with clear structure (setup, conflict, climax, resolution)
5. You can incorporate specific elements requested by users (characters, settings, themes)
6. You provide vivid sensory details and engaging dialogue
7. You can explain storytelling techniques and offer writing advice when asked

When generating stories, maintain narrative consistency, avoid clichés unless specifically requested, and prioritize creative, engaging content. For longer stories, focus on quality over quantity, creating meaningful narrative arcs even in shorter sections. You can also offer to continue stories in subsequent messages if the user wishes to develop the narrative further.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "Write a short science fiction story about time travel.",
    "Create a fantasy adventure with a reluctant hero.",
    "Tell me a mystery story set in a small coastal town.",
    "Write the opening scene of a romantic comedy.",
    "Create a scary campfire story for teenagers.",
    "Write a children's bedtime story with a moral lesson.",
    "Generate a superhero origin story for a character with unusual powers.",
    "Tell me a story that combines two unexpected genres.",
    "Write a story based on this prompt: a locked door and a mysterious key.",
    "Create a historical fiction narrative set during an important event."
  ],
  
  // Story genres with descriptions and typical elements
  genres: [
    {
      id: 'fantasy',
      name: 'Fantasy',
      description: 'Stories set in imaginative worlds often featuring magic, mythical creatures, and heroic quests.',
      elements: {
        settings: ['Medieval kingdoms', 'Enchanted forests', 'Magical academies', 'Hidden realms'],
        characters: ['Wizards/witches', 'Knights', 'Mythical beings', 'Chosen heroes'],
        themes: ['Good vs. evil', 'Coming of age', 'Power and responsibility', 'Quest/journey'],
        plotElements: ['Magical objects', 'Ancient prophecies', 'Epic battles', 'Transformation']
      }
    },
    {
      id: 'scifi',
      name: 'Science Fiction',
      description: 'Forward-looking stories exploring the impact of science and technology on society and individuals.',
      elements: {
        settings: ['Distant future', 'Alien worlds', 'Space stations', 'Dystopian Earth'],
        characters: ['Scientists', 'Explorers', 'Artificial intelligence', 'Genetically modified humans'],
        themes: ['Technological ethics', 'Human evolution', 'First contact', 'Survival'],
        plotElements: ['Scientific discovery', 'Space travel', 'Technological apocalypse', 'Time paradoxes']
      }
    },
    {
      id: 'mystery',
      name: 'Mystery',
      description: 'Intriguing stories centered on solving a crime or uncovering secrets.',
      elements: {
        settings: ['Small towns', 'Old mansions', 'Urban cities', 'Isolated locations'],
        characters: ['Detectives', 'Witnesses', 'Suspects', 'Victims'],
        themes: ['Justice', 'Truth vs. deception', 'Moral ambiguity', 'Past secrets'],
        plotElements: ['Murder/crime', 'Clues and red herrings', 'Plot twists', 'Revelation']
      }
    },
    {
      id: 'romance',
      name: 'Romance',
      description: 'Stories focusing on relationships, emotional connection, and love.',
      elements: {
        settings: ['Picturesque towns', 'Exotic locations', 'Urban environments', 'Historical periods'],
        characters: ['Unlikely couples', 'Childhood friends', 'Rivals', 'Star-crossed lovers'],
        themes: ['Love conquers all', 'Second chances', 'Self-discovery', 'Commitment vs. freedom'],
        plotElements: ['Meet-cute', 'Misunderstandings', 'External obstacles', 'Grand gestures']
      }
    },
    {
      id: 'horror',
      name: 'Horror',
      description: 'Frightening stories designed to evoke fear, dread, and shock.',
      elements: {
        settings: ['Haunted houses', 'Abandoned locations', 'Isolated communities', 'Ordinary places turned sinister'],
        characters: ['Survivors', 'Monsters/entities', 'Investigators', 'Transformed individuals'],
        themes: ['Fear of the unknown', 'Survival', 'Corruption/decay', 'Psychological breakdown'],
        plotElements: ['Supernatural events', 'Pursuit/chase', 'Revelation of horror', 'Escalating danger']
      }
    },
    {
      id: 'historical',
      name: 'Historical Fiction',
      description: 'Stories set in the past that blend historical facts with fictional elements.',
      elements: {
        settings: ['Ancient civilizations', 'Medieval Europe', 'Revolutionary periods', 'World Wars'],
        characters: ['Ordinary people in extraordinary times', 'Historical figures', 'Rebels', 'Witnesses to history'],
        themes: ['Cultural change', 'War and peace', 'Class struggle', 'Personal vs. political'],
        plotElements: ['Historical events', 'Period-accurate details', 'Social upheaval', 'Personal journey']
      }
    },
    {
      id: 'adventure',
      name: 'Adventure',
      description: 'Action-packed stories featuring journeys, challenges, and excitement.',
      elements: {
        settings: ['Uncharted territories', 'Ancient ruins', 'Wilderness', 'Exotic locations'],
        characters: ['Explorers', 'Treasure hunters', 'Unlikely heroes', 'Skilled specialists'],
        themes: ['Discovery', 'Courage', 'Overcoming obstacles', 'Personal growth'],
        plotElements: ['Quests/missions', 'Natural dangers', 'Valuable artifacts', 'Rivals/enemies']
      }
    },
    {
      id: 'comedy',
      name: 'Comedy',
      description: 'Humorous stories designed to entertain and amuse readers.',
      elements: {
        settings: ['Ordinary places with absurd situations', 'Dysfunctional environments', 'Fish-out-of-water scenarios'],
        characters: ['Quirky individuals', 'Misfits', 'Tricksters', 'Straight-men in absurd worlds'],
        themes: ['Absurdity of life', 'Social awkwardness', 'Subverting expectations', 'Identity'],
        plotElements: ['Misunderstandings', 'Exaggeration', 'Running gags', 'Comeuppance']
      }
    }
  ],
  
  // Story structure templates
  storyStructures: [
    {
      id: 'three-act',
      name: 'Three-Act Structure',
      description: 'Classic beginning, middle, and end format with setup, confrontation, and resolution.',
      sections: [
        { name: 'Act I: Setup', description: 'Establish the setting, main characters, and the central conflict.' },
        { name: 'Act II: Confrontation', description: 'Develop complications, raise stakes, and challenge the protagonist.' },
        { name: 'Act III: Resolution', description: 'Climax and resolution of the main conflict, showing character growth.' }
      ]
    },
    {
      id: 'heros-journey',
      name: 'Hero\'s Journey',
      description: 'The classic monomyth structure for epic tales and character transformation.',
      sections: [
        { name: 'Ordinary World', description: 'Establish the hero\'s normal life before the adventure.' },
        { name: 'Call to Adventure', description: 'Present the challenge or opportunity that disrupts ordinary life.' },
        { name: 'Refusal of the Call', description: 'Initial reluctance to change or face the challenge.' },
        { name: 'Meeting the Mentor', description: 'Encounter with a guide who provides advice or tools.' },
        { name: 'Crossing the Threshold', description: 'Leaving the familiar world and committing to the journey.' },
        { name: 'Tests, Allies, and Enemies', description: 'Facing obstacles and meeting helpers or opponents.' },
        { name: 'Approach to the Inmost Cave', description: 'Preparation for the major challenge ahead.' },
        { name: 'Ordeal', description: 'The central crisis or challenge that transforms the hero.' },
        { name: 'Reward', description: 'Achieving the goal but with complications remaining.' },
        { name: 'The Road Back', description: 'Beginning the return to ordinary life.' },
        { name: 'Resurrection', description: 'Final test proving the hero\'s transformation.' },
        { name: 'Return with the Elixir', description: 'Bringing back wisdom or benefit to share with others.' }
      ]
    },
    {
      id: 'five-stages',
      name: 'Five-Stage Plot',
      description: 'A streamlined approach to storytelling with clear rising and falling action.',
      sections: [
        { name: 'Exposition', description: 'Introduce characters, setting, and background information.' },
        { name: 'Rising Action', description: 'Develop complications and conflicts that build tension.' },
        { name: 'Climax', description: 'The turning point and highest point of tension.' },
        { name: 'Falling Action', description: 'Events following the climax, showing consequences.' },
        { name: 'Resolution', description: 'Final outcome and new state of affairs.' }
      ]
    },
    {
      id: 'in-medias-res',
      name: 'In Medias Res',
      description: 'Beginning in the middle of the action with backstory revealed later.',
      sections: [
        { name: 'Action Opening', description: 'Start with a dramatic scene in the middle of events.' },
        { name: 'Backstory Reveals', description: 'Gradually reveal how characters reached this point.' },
        { name: 'Present Conflict', description: 'Continue the current storyline with added context.' },
        { name: 'Integration', description: 'Merge past and present narratives.' },
        { name: 'Resolution', description: 'Conclude both timeline threads.' }
      ]
    },
    {
      id: 'frame-story',
      name: 'Frame Story',
      description: 'A story within a story, with a narrative that contains other narratives.',
      sections: [
        { name: 'Frame Opening', description: 'Establish the outer story and narrator.' },
        { name: 'Inner Story Beginning', description: 'Transition to the main narrative.' },
        { name: 'Inner Story Development', description: 'The bulk of the contained narrative.' },
        { name: 'Inner Story Conclusion', description: 'Resolution of the main tale.' },
        { name: 'Frame Closing', description: 'Return to the outer story with new perspective.' }
      ]
    }
  ],
  
  // Point of view options
  pointsOfView: [
    {
      id: 'first-person',
      name: 'First Person',
      description: 'Narration from the "I" perspective, limited to one character\'s thoughts and experiences.',
      example: 'I walked into the room and immediately felt that something was wrong. My heart started racing as I noticed the open window.'
    },
    {
      id: 'second-person',
      name: 'Second Person',
      description: 'Narration using "you," placing the reader in the story as a character.',
      example: 'You walk into the room and immediately feel that something is wrong. Your heart starts racing as you notice the open window.'
    },
    {
      id: 'third-limited',
      name: 'Third Person Limited',
      description: 'Narration using "he/she/they" but limited to one character\'s thoughts and perspectives.',
      example: 'She walked into the room and immediately felt that something was wrong. Her heart started racing as she noticed the open window.'
    },
    {
      id: 'third-omniscient',
      name: 'Third Person Omniscient',
      description: 'All-knowing narrator who can access the thoughts and feelings of all characters.',
      example: 'She walked into the room, unaware that someone had been there just moments before. While she noticed the open window and felt unease, across town the intruder was already planning their next move.'
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="story-generator-interface">
      <div class="generator-header">
        <div class="generator-icon">
          <i class="fas fa-book"></i>
        </div>
        <div class="generator-title">
          <h2>Story Generator</h2>
          <p>Create engaging narratives with customizable elements</p>
        </div>
      </div>
      
      <div class="story-form">
        <div class="form-section">
          <h3>Story Basics</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="story-title">Title (optional)</label>
              <input type="text" id="story-title" placeholder="Leave blank for AI to generate">
            </div>
            <div class="form-group">
              <label for="story-length">Approximate Length</label>
              <select id="story-length">
                <option value="very-short">Very Short (250-500 words)</option>
                <option value="short" selected>Short (500-1000 words)</option>
                <option value="medium">Medium (1000-2000 words)</option>
                <option value="long">Long (2000+ words)</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="story-genre">Genre</label>
              <select id="story-genre">
                <option value="fantasy">Fantasy</option>
                <option value="scifi">Science Fiction</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="horror">Horror</option>
                <option value="historical">Historical Fiction</option>
                <option value="adventure">Adventure</option>
                <option value="comedy">Comedy</option>
                <option value="mixed">Mixed/Multiple Genres</option>
              </select>
            </div>
            <div class="form-group">
              <label for="story-structure">Story Structure</label>
              <select id="story-structure">
                <option value="three-act" selected>Three-Act Structure</option>
                <option value="heros-journey">Hero's Journey</option>
                <option value="five-stages">Five-Stage Plot</option>
                <option value="in-medias-res">In Medias Res</option>
                <option value="frame-story">Frame Story</option>
                <option value="nonlinear">Nonlinear</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="story-pov">Point of View</label>
              <select id="story-pov">
                <option value="first-person">First Person</option>
                <option value="second-person">Second Person</option>
                <option value="third-limited" selected>Third Person Limited</option>
                <option value="third-omniscient">Third Person Omniscient</option>
              </select>
            </div>
            <div class="form-group">
              <label for="story-tone">Tone</label>
              <select id="story-tone">
                <option value="lighthearted">Lighthearted</option>
                <option value="serious">Serious</option>
                <option value="dark">Dark</option>
                <option value="humorous">Humorous</option>
                <option value="inspirational">Inspirational</option>
                <option value="suspenseful" selected>Suspenseful</option>
                <option value="whimsical">Whimsical</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <h3>Story Elements</h3>
          <div class="form-row">
            <div class="form-group full-width">
              <label for="story-premise">Premise/Concept (optional)</label>
              <input type="text" id="story-premise" placeholder="Central idea or concept for your story">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="protagonist">Main Character(s)</label>
              <textarea id="protagonist" placeholder="Describe the protagonist(s) or leave blank for AI to create"></textarea>
            </div>
            <div class="form-group">
              <label for="story-setting">Setting</label>
              <textarea id="story-setting" placeholder="Describe the story setting or leave blank for AI to create"></textarea>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group full-width">
              <label for="story-elements">Key Plot Elements (optional)</label>
              <textarea id="story-elements" placeholder="Specific events, objects, or themes you'd like included"></textarea>
            </div>
          </div>
        </div>
        
        <div class="form-section advanced-options">
          <div class="section-toggle">
            <h3>Advanced Options</h3>
            <button id="toggle-advanced">
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>
          
          <div class="advanced-content hidden" id="advanced-content">
            <div class="form-row">
              <div class="form-group">
                <label for="writing-style">Writing Style</label>
                <select id="writing-style">
                  <option value="descriptive">Descriptive</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="poetic">Poetic</option>
                  <option value="conversational">Conversational</option>
                  <option value="literary">Literary</option>
                  <option value="pulp">Pulp</option>
                </select>
              </div>
              <div class="form-group">
                <label for="themes">Themes</label>
                <select id="themes" multiple>
                  <option value="redemption">Redemption</option>
                  <option value="love">Love</option>
                  <option value="revenge">Revenge</option>
                  <option value="survival">Survival</option>
                  <option value="coming-of-age">Coming of Age</option>
                  <option value="good-vs-evil">Good vs. Evil</option>
                  <option value="identity">Identity</option>
                  <option value="power">Power</option>
                  <option value="sacrifice">Sacrifice</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="story-twist">Include a Plot Twist</label>
                <select id="story-twist">
                  <option value="no">No</option>
                  <option value="minor">Minor Twist</option>
                  <option value="major">Major Twist</option>
                </select>
              </div>
              <div class="form-group">
                <label for="age-appropriate">Age Appropriate For</label>
                <select id="age-appropriate">
                  <option value="children">Children</option>
                  <option value="young-adult">Young Adults</option>
                  <option value="adult" selected>Adults</option>
                  <option value="all-ages">All Ages</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group full-width">
                <label for="exclude-elements">Elements to Avoid</label>
                <input type="text" id="exclude-elements" placeholder="Specific themes, scenarios, or content you want to exclude">
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button id="generate-story" class="primary-button">
            <i class="fas fa-magic"></i> Generate Story
          </button>
          <button id="save-template" class="secondary-button">
            <i class="fas fa-save"></i> Save Template
          </button>
        </div>
      </div>
      
      <div class="story-output hidden" id="story-output">
        <div class="output-header">
          <h3 id="output-title">Generated Story</h3>
          <div class="output-actions">
            <button id="copy-story" class="icon-button" title="Copy to clipboard">
              <i class="fas fa-copy"></i>
            </button>
            <button id="download-story" class="icon-button" title="Download as text file">
              <i class="fas fa-download"></i>
            </button>
            <button id="new-story" class="icon-button" title="Create new story">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        
        <div class="story-content" id="story-content">
          <!-- Generated story will appear here -->
        </div>
        
        <div class="story-continue">
          <button id="continue-story" class="primary-button">
            <i class="fas fa-pencil-alt"></i> Continue this Story
          </button>
        </div>
      </div>
      
      <div class="saved-templates">
        <h3>Saved Templates</h3>
        <div class="templates-container" id="templates-container">
          <!-- Will be populated with saved templates -->
          <div class="no-templates">No saved templates yet</div>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .story-generator-interface {
      background: linear-gradient(to bottom right, rgba(76, 29, 149, 0.1), rgba(124, 58, 237, 0.1));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(124, 58, 237, 0.2);
      color: var(--color-text, #e2e8f0);
    }
    
    .generator-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .generator-icon {
      font-size: 2.5rem;
      color: #8b5cf6;
      margin-right: 1rem;
    }
    
    .generator-title h2 {
      color: #8b5cf6;
      margin-bottom: 0.3rem;
    }
    
    .generator-title p {
      color: #a0aec0;
      font-size: 0.9rem;
    }
    
    .story-form {
      background: rgba(45, 55, 72, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .form-section {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(74, 85, 104, 0.3);
    }
    
    .form-section:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
    
    .form-section h3 {
      color: #a78bfa;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .form-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .form-row:last-child {
      margin-bottom: 0;
    }
    
    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
      }
    }
    
    .form-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    
    .form-group.full-width {
      flex: 0 0 100%;
    }
    
    .form-group label {
      font-size: 0.9rem;
      color: #cbd5e0;
    }
    
    .form-group input, .form-group select, .form-group textarea {
      background: rgba(45, 55, 72, 0.7);
      border: 1px solid rgba(74, 85, 104, 0.5);
      border-radius: 4px;
      padding: 0.5rem 0.75rem;
      color: white;
      font-size: 0.9rem;
    }
    
    .form-group textarea {
      min-height: 80px;
      resize: vertical;
    }
    
    .form-group select[multiple] {
      min-height: 100px;
    }
    
    .section-toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .section-toggle h3 {
      margin-bottom: 0;
    }
    
    .section-toggle button {
      background: none;
      border: none;
      color: #a78bfa;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    
    .section-toggle button.active {
      transform: rotate(180deg);
    }
    
    .advanced-content {
      padding-top: 1rem;
    }
    
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    
    .primary-button, .secondary-button {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
    }
    
    .primary-button {
      background: #8b5cf6;
      color: white;
      border: none;
    }
    
    .primary-button:hover {
      background: #7c3aed;
      transform: translateY(-1px);
    }
    
    .secondary-button {
      background: transparent;
      color: #cbd5e0;
      border: 1px solid rgba(124, 58, 237, 0.5);
    }
    
    .secondary-button:hover {
      border-color: #8b5cf6;
      color: #8b5cf6;
      transform: translateY(-1px);
    }
    
    .story-output {
      background: rgba(45, 55, 72, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .output-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(74, 85, 104, 0.3);
    }
    
    .output-header h3 {
      color: #a78bfa;
      font-size: 1.1rem;
      margin: 0;
    }
    
    .output-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .icon-button {
      background: rgba(45, 55, 72, 0.7);
      border: 1px solid rgba(74, 85, 104, 0.5);
      border-radius: 4px;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #cbd5e0;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .icon-button:hover {
      background: rgba(74, 85, 104, 0.7);
      color: white;
    }
    
    .story-content {
      background: rgba(26, 32, 44, 0.4);
      border-radius: 6px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      font-size: 1rem;
      line-height: 1.6;
      white-space: pre-wrap;
      max-height: 500px;
      overflow-y: auto;
    }
    
    .story-content p {
      margin-bottom: 1rem;
    }
    
    .story-continue {
      display: flex;
      justify-content: center;
    }
    
    .saved-templates {
      background: rgba(45, 55, 72, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
    }
    
    .saved-templates h3 {
      color: #a78bfa;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .templates-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .template-card {
      background: rgba(26, 32, 44, 0.4);
      border-radius: 6px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid rgba(74, 85, 104, 0.3);
    }
    
    .template-card:hover {
      border-color: #8b5cf6;
      transform: translateY(-2px);
    }
    
    .template-title {
      color: white;
      font-weight: 500;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }
    
    .template-info {
      color: #a0aec0;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    
    .template-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 0.5rem;
    }
    
    .template-action {
      background: none;
      border: none;
      color: #a0aec0;
      cursor: pointer;
      font-size: 0.8rem;
      padding: 0.2rem;
      transition: color 0.2s ease;
    }
    
    .template-action:hover {
      color: #8b5cf6;
    }
    
    .no-templates {
      grid-column: 1 / -1;
      color: #a0aec0;
      font-style: italic;
      text-align: center;
      padding: 1rem;
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Store for saved templates
  savedTemplates: [],
  
  // Current form values
  currentFormValues: {},
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Story Generation Mode');
    
    // Add the mode's CSS to the document
    this.addStyles();
    
    // Load saved templates
    this.loadSavedTemplates();
    
    // If the mode's special interface container exists, render the interface
    const modeContainer = document.getElementById('modeSpecificUI');
    if (modeContainer) {
      this.renderUI(modeContainer);
    }
    
    // If the chat input exists, set a default message placeholder
    const chatInput = document.getElementById('messageInput');
    if (chatInput) {
      chatInput.placeholder = "Enter a story concept or use the story generator above...";
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
    
    // Populate saved templates
    this.renderSavedTemplates(container);
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Toggle advanced options
    const toggleButton = container.querySelector('#toggle-advanced');
    const advancedContent = container.querySelector('#advanced-content');
    
    if (toggleButton && advancedContent) {
      toggleButton.addEventListener('click', () => {
        advancedContent.classList.toggle('hidden');
        toggleButton.classList.toggle('active');
      });
    }
    
    // Generate story button
    const generateButton = container.querySelector('#generate-story');
    if (generateButton) {
      generateButton.addEventListener('click', () => {
        this.collectFormValues(container);
        this.generateStory(container);
      });
    }
    
    // Save template button
    const saveTemplateButton = container.querySelector('#save-template');
    if (saveTemplateButton) {
      saveTemplateButton.addEventListener('click', () => {
        this.collectFormValues(container);
        this.saveTemplate(container);
      });
    }
    
    // Copy story button
    const copyButton = container.querySelector('#copy-story');
    if (copyButton) {
      copyButton.addEventListener('click', () => {
        this.copyStoryToClipboard(container);
      });
    }
    
    // Download story button
    const downloadButton = container.querySelector('#download-story');
    if (downloadButton) {
      downloadButton.addEventListener('click', () => {
        this.downloadStory(container);
      });
    }
    
    // New story button
    const newStoryButton = container.querySelector('#new-story');
    if (newStoryButton) {
      newStoryButton.addEventListener('click', () => {
        this.resetForm(container);
      });
    }
    
    // Continue story button
    const continueButton = container.querySelector('#continue-story');
    if (continueButton) {
      continueButton.addEventListener('click', () => {
        this.continueStory(container);
      });
    }
  },
  
  // Collect form values into the current form values object
  collectFormValues: function(container) {
    // Get all input, select, and textarea elements
    const inputs = container.querySelectorAll('input, select, textarea');
    
    // Reset current form values
    this.currentFormValues = {};
    
    // Collect values from inputs
    inputs.forEach(input => {
      const id = input.id;
      if (!id) return;
      
      // Handle multi-selects separately
      if (input.multiple) {
        const selectedOptions = Array.from(input.selectedOptions).map(option => option.value);
        this.currentFormValues[id] = selectedOptions;
      } else {
        this.currentFormValues[id] = input.value;
      }
    });
    
    // Store timestamp
    this.currentFormValues.timestamp = new Date().toISOString();
  },
  
  // Generate a story based on form values
  generateStory: function(container) {
    // Show the output section
    const outputSection = container.querySelector('#story-output');
    if (outputSection) {
      outputSection.classList.remove('hidden');
    }
    
    // Show loading state
    const storyContent = container.querySelector('#story-content');
    if (storyContent) {
      storyContent.textContent = 'Generating your story...';
    }
    
    // Construct a prompt for the AI based on form values
    const prompt = this.constructStoryPrompt();
    
    // In a real implementation, this would call the AI API
    // For demo purposes, we'll send the prompt to the chat
    this.sendPromptToChat(prompt);
    
    // Once API response comes back, we'd update the story content
    // For demo purposes, we'll just use a placeholder
    setTimeout(() => {
      if (storyContent) {
        storyContent.textContent = "Your story will appear in the chat below. The AI is generating it based on your specifications...";
      }
    }, 1500);
  },
  
  // Construct a detailed prompt for story generation
  constructStoryPrompt: function() {
    const values = this.currentFormValues;
    
    // Start with basic instructions
    let prompt = `Please write a ${values['story-length'] || 'short'} story `;
    
    // Add genre
    if (values['story-genre']) {
      if (values['story-genre'] === 'mixed') {
        prompt += `that combines multiple genres `;
      } else {
        const genreName = this.getGenreName(values['story-genre']);
        prompt += `in the ${genreName} genre `;
      }
    }
    
    // Add title if provided
    if (values['story-title']) {
      prompt += `titled "${values['story-title']}" `;
    }
    
    // Add premise if provided
    if (values['story-premise']) {
      prompt += `with the following premise: ${values['story-premise']}. `;
    }
    
    // Add structure information
    if (values['story-structure']) {
      const structureName = this.getStructureName(values['story-structure']);
      prompt += `\n\nPlease use a ${structureName} narrative structure. `;
    }
    
    // Add point of view information
    if (values['story-pov']) {
      const povName = this.getPOVName(values['story-pov']);
      prompt += `Write in ${povName} point of view. `;
    }
    
    // Add tone information
    if (values['story-tone']) {
      prompt += `The tone should be ${values['story-tone']}. `;
    }
    
    // Add character information if provided
    if (values['protagonist']) {
      prompt += `\n\nMain character(s): ${values['protagonist']}. `;
    }
    
    // Add setting information if provided
    if (values['story-setting']) {
      prompt += `\n\nSetting: ${values['story-setting']}. `;
    }
    
    // Add plot elements if provided
    if (values['story-elements']) {
      prompt += `\n\nPlease include these key elements in the plot: ${values['story-elements']}. `;
    }
    
    // Add advanced options if provided
    let advancedOptions = '';
    
    if (values['writing-style']) {
      advancedOptions += `- Use a ${values['writing-style']} writing style.\n`;
    }
    
    if (values['themes'] && values['themes'].length > 0) {
      advancedOptions += `- Incorporate these themes: ${values['themes'].join(', ')}.\n`;
    }
    
    if (values['story-twist'] && values['story-twist'] !== 'no') {
      advancedOptions += `- Include a ${values['story-twist']} plot twist.\n`;
    }
    
    if (values['age-appropriate']) {
      advancedOptions += `- Make the content appropriate for ${values['age-appropriate']}.\n`;
    }
    
    if (values['exclude-elements']) {
      advancedOptions += `- Avoid including these elements: ${values['exclude-elements']}.\n`;
    }
    
    // Add advanced options to prompt if any exist
    if (advancedOptions) {
      prompt += `\n\nAdditional requirements:\n${advancedOptions}`;
    }
    
    // Final instruction
    prompt += `\n\nPlease write the complete story. If it's too long, focus on quality over quantity and create a satisfying narrative arc.`;
    
    return prompt;
  },
  
  // Get genre name from id
  getGenreName: function(genreId) {
    const genre = this.genres.find(g => g.id === genreId);
    return genre ? genre.name : genreId;
  },
  
  // Get structure name from id
  getStructureName: function(structureId) {
    const structure = this.storyStructures.find(s => s.id === structureId);
    return structure ? structure.name : structureId;
  },
  
  // Get POV name from id
  getPOVName: function(povId) {
    const pov = this.pointsOfView.find(p => p.id === povId);
    return pov ? pov.name : povId;
  },
  
  // Save the current form values as a template
  saveTemplate: function(container) {
    // Collect form values
    this.collectFormValues(container);
    
    // Create template name (either from title or from timestamp)
    const templateName = this.currentFormValues['story-title'] || 
      `Template ${new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    
    // Create template object
    const template = {
      id: Date.now().toString(),
      name: templateName,
      genre: this.currentFormValues['story-genre'],
      values: { ...this.currentFormValues }
    };
    
    // Add to saved templates
    this.savedTemplates.push(template);
    
    // Save to localStorage
    this.saveSavedTemplates();
    
    // Update UI
    this.renderSavedTemplates(container);
    
    // Show confirmation
    alert(`Template "${templateName}" saved successfully!`);
  },
  
  // Copy the generated story to clipboard
  copyStoryToClipboard: function(container) {
    const storyContent = container.querySelector('#story-content');
    if (!storyContent) return;
    
    navigator.clipboard.writeText(storyContent.textContent)
      .then(() => {
        // Show confirmation
        const copyButton = container.querySelector('#copy-story');
        if (copyButton) {
          const originalHTML = copyButton.innerHTML;
          copyButton.innerHTML = '<i class="fas fa-check"></i>';
          
          setTimeout(() => {
            copyButton.innerHTML = originalHTML;
          }, 2000);
        }
      })
      .catch(err => {
        console.error('Failed to copy story:', err);
        alert('Failed to copy story to clipboard');
      });
  },
  
  // Download the generated story as a text file
  downloadStory: function(container) {
    const storyContent = container.querySelector('#story-content');
    const titleElement = container.querySelector('#output-title');
    
    if (!storyContent) return;
    
    const title = titleElement ? titleElement.textContent : 'Generated Story';
    const content = storyContent.textContent;
    
    // Create a blob with the story content
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and click it
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
  
  // Reset the form to default values
  resetForm: function(container) {
    // Reset form elements
    const form = container.querySelector('.story-form');
    if (form) {
      form.reset();
    }
    
    // Hide the output section
    const outputSection = container.querySelector('#story-output');
    if (outputSection) {
      outputSection.classList.add('hidden');
    }
    
    // Clear current form values
    this.currentFormValues = {};
  },
  
  // Continue the current story
  continueStory: function(container) {
    // Construct a prompt to continue the story
    const storyContent = container.querySelector('#story-content');
    if (!storyContent) return;
    
    const existingStory = storyContent.textContent;
    
    // Create a prompt asking to continue the story
    const prompt = `The following is the beginning of a story:

${existingStory}

Please continue this story, maintaining the same style, tone, and narrative voice. Add approximately 500-1000 more words, developing the plot further.`;
    
    // Send the prompt to the chat
    this.sendPromptToChat(prompt);
  },
  
  // Load saved templates from localStorage
  loadSavedTemplates: function() {
    try {
      const savedTemplates = localStorage.getItem('jaat_saved_story_templates');
      if (savedTemplates) {
        this.savedTemplates = JSON.parse(savedTemplates);
      }
    } catch (error) {
      console.error('Error loading saved templates:', error);
      this.savedTemplates = [];
    }
  },
  
  // Save templates to localStorage
  saveSavedTemplates: function() {
    try {
      localStorage.setItem('jaat_saved_story_templates', JSON.stringify(this.savedTemplates));
    } catch (error) {
      console.error('Error saving templates:', error);
    }
  },
  
  // Render saved templates in the UI
  renderSavedTemplates: function(container) {
    const templatesContainer = container.querySelector('#templates-container');
    if (!templatesContainer) return;
    
    // Clear container
    templatesContainer.innerHTML = '';
    
    // If no templates, show message
    if (this.savedTemplates.length === 0) {
      templatesContainer.innerHTML = '<div class="no-templates">No saved templates yet</div>';
      return;
    }
    
    // Create a card for each template
    this.savedTemplates.forEach(template => {
      const templateCard = document.createElement('div');
      templateCard.className = 'template-card';
      templateCard.dataset.templateId = template.id;
      
      const genreName = template.genre ? this.getGenreName(template.genre) : 'Mixed';
      
      templateCard.innerHTML = `
        <div class="template-title">${template.name}</div>
        <div class="template-info">
          <i class="fas fa-bookmark"></i>
          <span>${genreName}</span>
        </div>
        <div class="template-actions">
          <button class="template-action load-template" title="Load template">
            <i class="fas fa-upload"></i>
          </button>
          <button class="template-action delete-template" title="Delete template">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      
      // Add event listeners for template actions
      const loadButton = templateCard.querySelector('.load-template');
      if (loadButton) {
        loadButton.addEventListener('click', (e) => {
          e.stopPropagation();
          this.loadTemplate(container, template.id);
        });
      }
      
      const deleteButton = templateCard.querySelector('.delete-template');
      if (deleteButton) {
        deleteButton.addEventListener('click', (e) => {
          e.stopPropagation();
          this.deleteTemplate(container, template.id);
        });
      }
      
      // Add click event to load template when clicking the card
      templateCard.addEventListener('click', () => {
        this.loadTemplate(container, template.id);
      });
      
      templatesContainer.appendChild(templateCard);
    });
  },
  
  // Load a template into the form
  loadTemplate: function(container, templateId) {
    const template = this.savedTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    // Populate form fields with template values
    Object.entries(template.values).forEach(([key, value]) => {
      const element = container.querySelector(`#${key}`);
      if (!element) return;
      
      // Handle multi-selects separately
      if (element.multiple && Array.isArray(value)) {
        // Deselect all options first
        Array.from(element.options).forEach(option => {
          option.selected = false;
        });
        
        // Select the options from the template
        value.forEach(optionValue => {
          const option = Array.from(element.options).find(opt => opt.value === optionValue);
          if (option) {
            option.selected = true;
          }
        });
      } else {
        element.value = value;
      }
    });
    
    // Show advanced options if they were used
    const hasAdvancedOptions = 
      template.values['writing-style'] || 
      (template.values['themes'] && template.values['themes'].length) || 
      template.values['story-twist'] !== 'no' ||
      template.values['exclude-elements'];
    
    if (hasAdvancedOptions) {
      const advancedContent = container.querySelector('#advanced-content');
      const toggleButton = container.querySelector('#toggle-advanced');
      
      if (advancedContent) {
        advancedContent.classList.remove('hidden');
      }
      
      if (toggleButton) {
        toggleButton.classList.add('active');
      }
    }
    
    // Update current form values
    this.currentFormValues = { ...template.values };
  },
  
  // Delete a template
  deleteTemplate: function(container, templateId) {
    if (confirm('Are you sure you want to delete this template?')) {
      // Remove from savedTemplates
      this.savedTemplates = this.savedTemplates.filter(t => t.id !== templateId);
      
      // Save to localStorage
      this.saveSavedTemplates();
      
      // Update UI
      this.renderSavedTemplates(container);
    }
  },
  
  // Send a prompt to the chat
  sendPromptToChat: function(prompt) {
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
    StoryGenerationMode.init();
  } else {
    window.addEventListener('load', function() {
      StoryGenerationMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StoryGenerationMode;
} else {
  window.StoryGenerationMode = StoryGenerationMode;
}
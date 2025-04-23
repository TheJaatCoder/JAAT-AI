/**
 * JAAT-AI Mode: Advanced Search Algorithm
 * 
 * A sophisticated search mode that utilizes semantic understanding, 
 * query parsing, and relevance ranking to provide precise search results.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const AdvancedSearchMode = {
  id: 'advanced-search',
  name: 'Advanced Search',
  icon: 'search',
  description: 'Intelligent search with semantic understanding and precision filtering.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Advanced Search mode, a sophisticated search assistant with semantic understanding, query parsing abilities, and deep knowledge retrieval capabilities. You help users find precise information by interpreting their search intent and providing well-organized, relevant results.

Key characteristics:
1. You excel at understanding complex search queries and parsing them into structured components
2. You can identify search intent beyond literal keywords (semantic search)
3. You offer search refinement suggestions based on initial queries
4. You organize search results in clear, scannable formats with proper citations
5. You understand and properly interpret search operators (quotes, AND/OR, filters, etc.)
6. You provide search metadata like result confidence and relevance scoring
7. You can explain your search methodology when asked

When responding to queries, prioritize relevance over quantity, organize results logically, and include relevant metadata that helps the user understand why certain results were returned. For complex topics, offer search refinements or related queries to help users drill down further.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "Search for recent research on machine learning in healthcare.",
    "Find information about sustainable farming practices in arid climates.",
    "Look for comparisons between electric vehicles released in the past year.",
    "Search for natural remedies for reducing inflammation.",
    "Find historical examples of economic recoveries after major recessions.",
    "Search for tutorials on advanced Python programming techniques.",
    "Find the most cited papers on climate change adaptation strategies.",
    "Look for case studies of successful digital transformation in retail.",
    "Search for evidence-based parenting techniques for teenagers.",
    "Find analysis of emerging cybersecurity threats in cloud computing."
  ],
  
  // Query operators and modifiers
  queryOperators: [
    {
      symbol: '"..."',
      name: 'Exact Phrase',
      description: 'Search for an exact phrase, with words in that specific order',
      example: '"renewable energy solutions"'
    },
    {
      symbol: 'AND',
      name: 'AND Operator',
      description: 'Results must contain both terms',
      example: 'climate AND policy'
    },
    {
      symbol: 'OR',
      name: 'OR Operator',
      description: 'Results can contain either term',
      example: 'renewable OR sustainable'
    },
    {
      symbol: 'NOT',
      name: 'NOT Operator',
      description: 'Exclude results containing this term',
      example: 'energy NOT fossil'
    },
    {
      symbol: 'site:',
      name: 'Site Limiter',
      description: 'Limit results to a specific website or domain',
      example: 'renewable energy site:edu'
    },
    {
      symbol: 'filetype:',
      name: 'File Type Filter',
      description: 'Limit results to a specific file type',
      example: 'climate report filetype:pdf'
    },
    {
      symbol: 'intitle:',
      name: 'Title Search',
      description: 'Search for pages with term in the title',
      example: 'intitle:blockchain'
    },
    {
      symbol: 'date:',
      name: 'Date Filter',
      description: 'Filter results by publication date',
      example: 'renewable energy date:past-year'
    }
  ],
  
  // Search filters
  searchFilters: [
    {
      id: 'time',
      name: 'Time Period',
      options: [
        { id: 'any', name: 'Any Time' },
        { id: 'hour', name: 'Past Hour' },
        { id: 'day', name: 'Past 24 Hours' },
        { id: 'week', name: 'Past Week' },
        { id: 'month', name: 'Past Month' },
        { id: 'year', name: 'Past Year' },
        { id: 'custom', name: 'Custom Range' }
      ]
    },
    {
      id: 'type',
      name: 'Content Type',
      options: [
        { id: 'all', name: 'All Content Types' },
        { id: 'articles', name: 'Articles & Papers' },
        { id: 'news', name: 'News' },
        { id: 'blogs', name: 'Blog Posts' },
        { id: 'academic', name: 'Academic Papers' },
        { id: 'books', name: 'Books' },
        { id: 'videos', name: 'Videos' },
        { id: 'images', name: 'Images' },
        { id: 'datasets', name: 'Datasets' }
      ]
    },
    {
      id: 'source',
      name: 'Source',
      options: [
        { id: 'all', name: 'All Sources' },
        { id: 'academic', name: 'Academic Institutions' },
        { id: 'government', name: 'Government' },
        { id: 'news', name: 'News Outlets' },
        { id: 'organization', name: 'Organizations' },
        { id: 'social', name: 'Social Media' }
      ]
    },
    {
      id: 'region',
      name: 'Region',
      options: [
        { id: 'global', name: 'Global' },
        { id: 'north-america', name: 'North America' },
        { id: 'europe', name: 'Europe' },
        { id: 'asia', name: 'Asia' },
        { id: 'africa', name: 'Africa' },
        { id: 'south-america', name: 'South America' },
        { id: 'oceania', name: 'Australia & Oceania' }
      ]
    }
  ],
  
  // Search domains and knowledge areas
  knowledgeDomains: [
    {
      id: 'science',
      name: 'Science & Technology',
      subdomains: [
        { id: 'computer-science', name: 'Computer Science' },
        { id: 'physics', name: 'Physics' },
        { id: 'biology', name: 'Biology' },
        { id: 'chemistry', name: 'Chemistry' },
        { id: 'earth-science', name: 'Earth Science' },
        { id: 'astronomy', name: 'Astronomy' },
        { id: 'engineering', name: 'Engineering' }
      ]
    },
    {
      id: 'health',
      name: 'Health & Medicine',
      subdomains: [
        { id: 'medicine', name: 'Medicine' },
        { id: 'nutrition', name: 'Nutrition' },
        { id: 'psychology', name: 'Psychology' },
        { id: 'public-health', name: 'Public Health' },
        { id: 'fitness', name: 'Fitness & Exercise' }
      ]
    },
    {
      id: 'social',
      name: 'Social Sciences',
      subdomains: [
        { id: 'economics', name: 'Economics' },
        { id: 'politics', name: 'Politics' },
        { id: 'sociology', name: 'Sociology' },
        { id: 'anthropology', name: 'Anthropology' },
        { id: 'geography', name: 'Geography' }
      ]
    },
    {
      id: 'humanities',
      name: 'Arts & Humanities',
      subdomains: [
        { id: 'history', name: 'History' },
        { id: 'literature', name: 'Literature' },
        { id: 'philosophy', name: 'Philosophy' },
        { id: 'religion', name: 'Religion' },
        { id: 'visual-arts', name: 'Visual Arts' },
        { id: 'music', name: 'Music' }
      ]
    },
    {
      id: 'business',
      name: 'Business & Finance',
      subdomains: [
        { id: 'management', name: 'Management' },
        { id: 'marketing', name: 'Marketing' },
        { id: 'finance', name: 'Finance' },
        { id: 'entrepreneurship', name: 'Entrepreneurship' },
        { id: 'accounting', name: 'Accounting' }
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="advanced-search-interface">
      <div class="search-header">
        <div class="search-icon">
          <i class="fas fa-search"></i>
        </div>
        <div class="search-title">
          <h2>Advanced Search</h2>
          <p>Intelligent search with semantic understanding and precision</p>
        </div>
      </div>
      
      <div class="search-container">
        <div class="search-box">
          <input type="text" id="search-input" placeholder="Enter your search query...">
          <button id="search-button">
            <i class="fas fa-search"></i>
          </button>
        </div>
        
        <div class="search-tools">
          <div class="search-filters-toggle">
            <button id="filters-toggle">
              <i class="fas fa-sliders-h"></i>
              <span>Filters</span>
            </button>
          </div>
          
          <div class="search-operators-toggle">
            <button id="operators-toggle">
              <i class="fas fa-code"></i>
              <span>Operators</span>
            </button>
          </div>
          
          <div class="search-domains-toggle">
            <button id="domains-toggle">
              <i class="fas fa-sitemap"></i>
              <span>Domains</span>
            </button>
          </div>
        </div>
        
        <div id="filters-panel" class="panel hidden">
          <h3>Search Filters</h3>
          <div class="filters-container">
            <!-- Search filters will be populated here -->
          </div>
        </div>
        
        <div id="operators-panel" class="panel hidden">
          <h3>Search Operators</h3>
          <div class="operators-description">
            <p>Use these operators to refine your search query:</p>
          </div>
          <div class="operators-container">
            <!-- Search operators will be populated here -->
          </div>
        </div>
        
        <div id="domains-panel" class="panel hidden">
          <h3>Knowledge Domains</h3>
          <div class="domains-description">
            <p>Specify knowledge domains to focus your search:</p>
          </div>
          <div class="domains-container">
            <!-- Knowledge domains will be populated here -->
          </div>
        </div>
      </div>
      
      <div class="search-examples">
        <h3>Example Searches</h3>
        <div class="examples-container">
          <div class="example-tag" data-query="recent research climate change adaptation">recent research climate change adaptation</div>
          <div class="example-tag" data-query="machine learning AND healthcare NOT insurance">machine learning AND healthcare NOT insurance</div>
          <div class="example-tag" data-query="&quot;sustainable development&quot; site:edu">sustainable development site:edu</div>
          <div class="example-tag" data-query="intitle:cryptocurrency market analysis date:past-year">cryptocurrency market analysis (past year)</div>
          <div class="example-tag" data-query="comparative study renewable energy filetype:pdf">comparative study renewable energy (PDF)</div>
        </div>
      </div>
      
      <div class="search-tips">
        <div class="tip-icon">
          <i class="fas fa-lightbulb"></i>
        </div>
        <div class="tip-content">
          <h4>Search Tip</h4>
          <p id="search-tip">Use quotation marks to search for an exact phrase, like "artificial intelligence ethics".</p>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .advanced-search-interface {
      background: linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(59, 130, 246, 0.2);
    }
    
    .search-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .search-icon {
      font-size: 2.5rem;
      color: #3b82f6;
      margin-right: 1rem;
    }
    
    .search-title h2 {
      color: #3b82f6;
      margin-bottom: 0.3rem;
    }
    
    .search-title p {
      color: #a0aec0;
      font-size: 0.9rem;
    }
    
    .search-container {
      background: rgba(45, 55, 72, 0.7);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .search-box {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .search-box input {
      flex: 1;
      background: rgba(26, 32, 44, 0.7);
      border: 1px solid rgba(74, 85, 104, 0.7);
      border-radius: 6px;
      padding: 0.75rem 1rem;
      color: white;
      font-size: 1rem;
    }
    
    .search-box input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }
    
    .search-box button {
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .search-box button:hover {
      background: #2563eb;
    }
    
    .search-tools {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .search-tools button {
      background: rgba(26, 32, 44, 0.5);
      color: #e2e8f0;
      border: 1px solid rgba(74, 85, 104, 0.5);
      border-radius: 6px;
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.9rem;
    }
    
    .search-tools button:hover {
      background: rgba(59, 130, 246, 0.2);
      border-color: rgba(59, 130, 246, 0.5);
    }
    
    .search-tools button.active {
      background: rgba(59, 130, 246, 0.3);
      border-color: #3b82f6;
      color: white;
    }
    
    .panel {
      background: rgba(26, 32, 44, 0.5);
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    
    .panel h3 {
      color: #e2e8f0;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    
    .operators-description, .domains-description {
      margin-bottom: 1rem;
      color: #a0aec0;
      font-size: 0.9rem;
    }
    
    .operators-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 0.5rem;
    }
    
    .operator-item {
      background: rgba(45, 55, 72, 0.5);
      border-radius: 6px;
      padding: 0.75rem;
    }
    
    .operator-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .operator-symbol {
      color: #3b82f6;
      font-weight: bold;
      font-family: monospace;
    }
    
    .operator-name {
      color: #e2e8f0;
      font-weight: 500;
    }
    
    .operator-description {
      color: #a0aec0;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    
    .operator-example {
      color: #a0aec0;
      font-size: 0.8rem;
      font-style: italic;
    }
    
    .filters-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .filter-label {
      color: #e2e8f0;
      font-weight: 500;
      font-size: 0.9rem;
    }
    
    .filter-select {
      background: rgba(26, 32, 44, 0.7);
      border: 1px solid rgba(74, 85, 104, 0.7);
      border-radius: 4px;
      padding: 0.5rem;
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    .filter-select:focus {
      outline: none;
      border-color: #3b82f6;
    }
    
    .domains-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .domain-group {
      background: rgba(45, 55, 72, 0.5);
      border-radius: 6px;
      padding: 0.75rem;
    }
    
    .domain-header {
      color: #e2e8f0;
      font-weight: 500;
      margin-bottom: 0.5rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .domain-header i {
      transition: transform 0.3s ease;
    }
    
    .domain-header.open i {
      transform: rotate(180deg);
    }
    
    .domain-subdomains {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 0.5rem;
      padding-top: 0.5rem;
      display: none;
    }
    
    .domain-header.open + .domain-subdomains {
      display: grid;
    }
    
    .domain-subdomain {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .domain-subdomain input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
    
    .domain-subdomain label {
      color: #a0aec0;
      font-size: 0.85rem;
    }
    
    .search-examples {
      background: rgba(45, 55, 72, 0.7);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .search-examples h3 {
      color: #e2e8f0;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    
    .examples-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .example-tag {
      background: rgba(59, 130, 246, 0.2);
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 20px;
      padding: 0.4rem 0.75rem;
      color: #e2e8f0;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .example-tag:hover {
      background: rgba(59, 130, 246, 0.3);
      border-color: rgba(59, 130, 246, 0.5);
    }
    
    .search-tips {
      background: rgba(59, 130, 246, 0.1);
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .tip-icon {
      color: #3b82f6;
      font-size: 1.25rem;
      margin-top: 0.1rem;
    }
    
    .tip-content h4 {
      color: #e2e8f0;
      margin-bottom: 0.3rem;
      font-size: 0.95rem;
    }
    
    .tip-content p {
      color: #a0aec0;
      font-size: 0.9rem;
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Search tips to display randomly
  searchTips: [
    "Use quotation marks to search for an exact phrase, like \"artificial intelligence ethics\".",
    "Combine keywords with AND to require both terms in results: renewable AND energy.",
    "Exclude terms with NOT: climate change NOT politics.",
    "Use OR to find results with either term: electric OR hybrid vehicles.",
    "Limit results to specific websites with site: operator: renewable energy site:edu",
    "Search for specific file types with filetype: operator: climate report filetype:pdf",
    "Find terms in page titles with intitle: operator: intitle:blockchain",
    "Filter by date using date: operator: renewable energy date:past-year",
    "Combine operators for powerful searches: \"machine learning\" site:edu filetype:pdf",
    "Use parentheses for complex queries: (renewable OR sustainable) AND energy"
  ],
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Advanced Search Mode');
    
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
      chatInput.placeholder = "Enter your search query or ask a question...";
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
    
    // Display a random search tip
    this.displayRandomTip(container);
    
    // Add event listeners
    this.addEventListeners(container);
    
    // Populate the filter, operator, and domain panels
    this.populateFiltersPanel(container);
    this.populateOperatorsPanel(container);
    this.populateDomainsPanel(container);
  },
  
  // Display a random search tip
  displayRandomTip: function(container) {
    const tipElement = container.querySelector('#search-tip');
    if (tipElement) {
      const randomTip = this.searchTips[Math.floor(Math.random() * this.searchTips.length)];
      tipElement.textContent = randomTip;
    }
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Panel toggles
    const filtersToggle = container.querySelector('#filters-toggle');
    const operatorsToggle = container.querySelector('#operators-toggle');
    const domainsToggle = container.querySelector('#domains-toggle');
    
    const filtersPanel = container.querySelector('#filters-panel');
    const operatorsPanel = container.querySelector('#operators-panel');
    const domainsPanel = container.querySelector('#domains-panel');
    
    // Filters toggle
    if (filtersToggle && filtersPanel) {
      filtersToggle.addEventListener('click', () => {
        const isHidden = filtersPanel.classList.contains('hidden');
        
        // Hide all panels
        [filtersPanel, operatorsPanel, domainsPanel].forEach(panel => {
          if (panel) panel.classList.add('hidden');
        });
        
        // Remove active class from all toggles
        [filtersToggle, operatorsToggle, domainsToggle].forEach(toggle => {
          if (toggle) toggle.classList.remove('active');
        });
        
        // Show this panel if it was hidden
        if (isHidden) {
          filtersPanel.classList.remove('hidden');
          filtersToggle.classList.add('active');
        }
      });
    }
    
    // Operators toggle
    if (operatorsToggle && operatorsPanel) {
      operatorsToggle.addEventListener('click', () => {
        const isHidden = operatorsPanel.classList.contains('hidden');
        
        // Hide all panels
        [filtersPanel, operatorsPanel, domainsPanel].forEach(panel => {
          if (panel) panel.classList.add('hidden');
        });
        
        // Remove active class from all toggles
        [filtersToggle, operatorsToggle, domainsToggle].forEach(toggle => {
          if (toggle) toggle.classList.remove('active');
        });
        
        // Show this panel if it was hidden
        if (isHidden) {
          operatorsPanel.classList.remove('hidden');
          operatorsToggle.classList.add('active');
        }
      });
    }
    
    // Domains toggle
    if (domainsToggle && domainsPanel) {
      domainsToggle.addEventListener('click', () => {
        const isHidden = domainsPanel.classList.contains('hidden');
        
        // Hide all panels
        [filtersPanel, operatorsPanel, domainsPanel].forEach(panel => {
          if (panel) panel.classList.add('hidden');
        });
        
        // Remove active class from all toggles
        [filtersToggle, operatorsToggle, domainsToggle].forEach(toggle => {
          if (toggle) toggle.classList.remove('active');
        });
        
        // Show this panel if it was hidden
        if (isHidden) {
          domainsPanel.classList.remove('hidden');
          domainsToggle.classList.add('active');
        }
      });
    }
    
    // Search button and input
    const searchButton = container.querySelector('#search-button');
    const searchInput = container.querySelector('#search-input');
    
    if (searchButton && searchInput) {
      // Search button click
      searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
          this.performSearch(query);
        }
      });
      
      // Enter key in search input
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim();
          if (query) {
            this.performSearch(query);
          }
        }
      });
    }
    
    // Example tags
    const exampleTags = container.querySelectorAll('.example-tag');
    exampleTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const query = tag.dataset.query;
        
        // Set the query in the search input
        if (searchInput) {
          searchInput.value = query;
        }
        
        // Perform the search
        this.performSearch(query);
      });
    });
  },
  
  // Populate the filters panel
  populateFiltersPanel: function(container) {
    const filtersContainer = container.querySelector('.filters-container');
    if (!filtersContainer) return;
    
    // Clear existing content
    filtersContainer.innerHTML = '';
    
    // Add each filter group
    this.searchFilters.forEach(filter => {
      const filterGroup = document.createElement('div');
      filterGroup.className = 'filter-group';
      
      // Create label
      const label = document.createElement('label');
      label.className = 'filter-label';
      label.textContent = filter.name;
      label.htmlFor = `filter-${filter.id}`;
      
      // Create select
      const select = document.createElement('select');
      select.className = 'filter-select';
      select.id = `filter-${filter.id}`;
      
      // Add options
      filter.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.id;
        optionElement.textContent = option.name;
        select.appendChild(optionElement);
      });
      
      // Add to filter group
      filterGroup.appendChild(label);
      filterGroup.appendChild(select);
      
      // Add to container
      filtersContainer.appendChild(filterGroup);
    });
  },
  
  // Populate the operators panel
  populateOperatorsPanel: function(container) {
    const operatorsContainer = container.querySelector('.operators-container');
    if (!operatorsContainer) return;
    
    // Clear existing content
    operatorsContainer.innerHTML = '';
    
    // Add each operator
    this.queryOperators.forEach(operator => {
      const operatorItem = document.createElement('div');
      operatorItem.className = 'operator-item';
      
      operatorItem.innerHTML = `
        <div class="operator-header">
          <span class="operator-symbol">${operator.symbol}</span>
          <span class="operator-name">${operator.name}</span>
        </div>
        <div class="operator-description">${operator.description}</div>
        <div class="operator-example">Example: ${operator.example}</div>
      `;
      
      operatorsContainer.appendChild(operatorItem);
    });
  },
  
  // Populate the domains panel
  populateDomainsPanel: function(container) {
    const domainsContainer = container.querySelector('.domains-container');
    if (!domainsContainer) return;
    
    // Clear existing content
    domainsContainer.innerHTML = '';
    
    // Add each domain group
    this.knowledgeDomains.forEach(domain => {
      const domainGroup = document.createElement('div');
      domainGroup.className = 'domain-group';
      
      // Domain header
      const domainHeader = document.createElement('div');
      domainHeader.className = 'domain-header';
      domainHeader.innerHTML = `
        <span>${domain.name}</span>
        <i class="fas fa-chevron-down"></i>
      `;
      
      // Subdomains container
      const subdomainsContainer = document.createElement('div');
      subdomainsContainer.className = 'domain-subdomains';
      
      // Add subdomains
      domain.subdomains.forEach(subdomain => {
        const subdomainElement = document.createElement('div');
        subdomainElement.className = 'domain-subdomain';
        
        const id = `domain-${domain.id}-${subdomain.id}`;
        
        subdomainElement.innerHTML = `
          <input type="checkbox" id="${id}" value="${subdomain.id}">
          <label for="${id}">${subdomain.name}</label>
        `;
        
        subdomainsContainer.appendChild(subdomainElement);
      });
      
      // Toggle subdomain visibility when header is clicked
      domainHeader.addEventListener('click', () => {
        domainHeader.classList.toggle('open');
      });
      
      // Add components to domain group
      domainGroup.appendChild(domainHeader);
      domainGroup.appendChild(subdomainsContainer);
      
      // Add to container
      domainsContainer.appendChild(domainGroup);
    });
  },
  
  // Perform a search with the given query
  performSearch: function(query) {
    // Get selected filters
    const filters = this.getSelectedFilters();
    
    // Get selected domains
    const domains = this.getSelectedDomains();
    
    // Build the search prompt
    const prompt = this.buildSearchPrompt(query, filters, domains);
    
    // Send the prompt to the AI
    this.sendSearchToAI(prompt);
  },
  
  // Get selected filters
  getSelectedFilters: function() {
    const filters = {};
    
    // For each filter category
    this.searchFilters.forEach(filter => {
      const selectElement = document.getElementById(`filter-${filter.id}`);
      if (selectElement) {
        const value = selectElement.value;
        
        // Only add non-default values
        if (value !== 'all' && value !== 'any' && value !== 'global') {
          filters[filter.id] = value;
        }
      }
    });
    
    return filters;
  },
  
  // Get selected domains
  getSelectedDomains: function() {
    const domains = [];
    
    // For each domain group
    this.knowledgeDomains.forEach(domain => {
      domain.subdomains.forEach(subdomain => {
        const checkbox = document.getElementById(`domain-${domain.id}-${subdomain.id}`);
        if (checkbox && checkbox.checked) {
          domains.push({
            domain: domain.name,
            subdomain: subdomain.name
          });
        }
      });
    });
    
    return domains;
  },
  
  // Build a search prompt from query, filters, and domains
  buildSearchPrompt: function(query, filters, domains) {
    let prompt = `Please search for: ${query}`;
    
    // Add filters section if any filters are selected
    if (Object.keys(filters).length > 0) {
      prompt += '\n\nWith these filters:';
      
      for (const [filterId, value] of Object.entries(filters)) {
        // Get display names
        const filterCategory = this.searchFilters.find(f => f.id === filterId);
        if (filterCategory) {
          const filterOption = filterCategory.options.find(o => o.id === value);
          if (filterOption) {
            prompt += `\n- ${filterCategory.name}: ${filterOption.name}`;
          }
        }
      }
    }
    
    // Add domains section if any domains are selected
    if (domains.length > 0) {
      prompt += '\n\nFocus on these knowledge domains:';
      
      domains.forEach(domain => {
        prompt += `\n- ${domain.domain}: ${domain.subdomain}`;
      });
    }
    
    // Add instructions for the response
    prompt += `\n\nPlease provide comprehensive, well-organized results with citations. Include relevance assessments and explain why each result was selected. If appropriate, offer search refinement suggestions.`;
    
    return prompt;
  },
  
  // Send the search query to the AI
  sendSearchToAI: function(prompt) {
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
    AdvancedSearchMode.init();
  } else {
    window.addEventListener('load', function() {
      AdvancedSearchMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdvancedSearchMode;
} else {
  window.AdvancedSearchMode = AdvancedSearchMode;
}
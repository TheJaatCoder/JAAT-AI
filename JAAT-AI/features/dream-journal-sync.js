/**
 * JAAT-AI Dream Journal Sync Feature
 * Record, analyze, and find patterns in your dreams with AI assistance
 */

class DreamJournalSync {
    constructor() {
        // Dream journal entries
        this.entries = [];
        
        // Tags and categories for dreams
        this.dreamTags = [
            'Flying', 'Falling', 'Chase', 'Test/Exam', 'Missing Something', 
            'Being Late', 'Childhood Home', 'Celebrity', 'Animals', 'Water',
            'Mountains', 'Forest', 'Space', 'Magic Powers', 'Past Memory',
            'Deceased Loved One', 'Monsters', 'Apocalypse', 'Future', 'Romance'
        ];
        
        // Common dream themes
        this.dreamThemes = [
            { name: 'Adventure', description: 'Journeys, quests and exploration' },
            { name: 'Fear', description: 'Nightmares and anxiety dreams' },
            { name: 'Loss', description: 'Losing people, objects or abilities' },
            { name: 'Desire', description: 'Wishes, wants and aspirations' },
            { name: 'Memory', description: 'Past events and reminiscence' },
            { name: 'Confusion', description: 'Disorientation and puzzlement' },
            { name: 'Discovery', description: 'Learning new things or insights' },
            { name: 'Transcendence', description: 'Spiritual or mystical experiences' }
        ];
        
        // Sleep quality scale
        this.sleepQualityScale = [
            { value: 1, label: 'Terrible', description: 'Barely slept, constantly disturbed' },
            { value: 2, label: 'Poor', description: 'Restless, interrupted sleep' },
            { value: 3, label: 'Fair', description: 'Average, some interruptions' },
            { value: 4, label: 'Good', description: 'Mostly restful sleep' },
            { value: 5, label: 'Excellent', description: 'Deep, uninterrupted sleep' }
        ];
        
        // Dream clarity scale
        this.dreamClarityScale = [
            { value: 1, label: 'Very Vague', description: 'Barely remember anything' },
            { value: 2, label: 'Vague', description: 'Remember fragments, unclear details' },
            { value: 3, label: 'Moderate', description: 'Remember main elements but some gaps' },
            { value: 4, label: 'Clear', description: 'Remember most details clearly' },
            { value: 5, label: 'Vivid', description: 'Remember everything in vivid detail' }
        ];
        
        // Path to local storage file
        this.storageKey = 'jaat-dream-journal';
        
        // API endpoint for AI analysis
        this.apiEndpoint = '/api/dream-analysis';
        
        // Current view mode
        this.viewMode = 'list'; // list, calendar, stats
        
        // UI elements references
        this.elements = {};
        
        // AI analysis cache
        this.analysisCache = new Map();
        
        // Event handlers
        this.eventHandlers = {};
    }

    /**
     * Initialize dream journal
     * @param {Object} options - Configuration options
     * @returns {DreamJournalSync} This instance
     */
    init(options = {}) {
        console.log('Initializing Dream Journal Sync...');
        
        // Apply custom options
        if (options.apiEndpoint) {
            this.apiEndpoint = options.apiEndpoint;
        }
        
        // Load saved entries
        this.loadEntries();
        
        // Attach handlers if DOM is ready
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            this.attachHandlers();
        } else {
            document.addEventListener('DOMContentLoaded', () => this.attachHandlers());
        }
        
        return this;
    }

    /**
     * Attach event handlers to DOM elements
     */
    attachHandlers() {
        // Find dream journal form if it exists
        const form = document.querySelector('#dream-journal-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveEntryFromForm(form);
            });
        }
        
        // Find view mode toggles
        const viewToggles = document.querySelectorAll('.dream-view-toggle');
        viewToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const mode = e.target.dataset.view;
                if (mode) {
                    this.setViewMode(mode);
                }
            });
        });
    }

    /**
     * Load entries from local storage
     */
    loadEntries() {
        try {
            const savedEntries = localStorage.getItem(this.storageKey);
            if (savedEntries) {
                this.entries = JSON.parse(savedEntries);
                console.log(`Loaded ${this.entries.length} dream journal entries`);
            }
        } catch (error) {
            console.error('Error loading dream journal entries:', error);
            this.entries = [];
        }
    }

    /**
     * Save entries to local storage
     */
    saveEntries() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
            console.log(`Saved ${this.entries.length} dream journal entries`);
        } catch (error) {
            console.error('Error saving dream journal entries:', error);
        }
    }

    /**
     * Add a new dream journal entry
     * @param {Object} entry - Dream journal entry
     * @returns {string} Entry ID
     */
    addEntry(entry) {
        // Validate entry
        if (!entry.dreamContent) {
            throw new Error('Dream content is required');
        }
        
        // Create entry with required fields
        const newEntry = {
            id: this.generateId(),
            date: entry.date || new Date().toISOString(),
            dreamContent: entry.dreamContent,
            title: entry.title || this.generateTitle(entry.dreamContent),
            tags: entry.tags || [],
            emotions: entry.emotions || [],
            sleepQuality: entry.sleepQuality || 3,
            dreamClarity: entry.dreamClarity || 3,
            isLucid: entry.isLucid || false,
            isRecurring: entry.isRecurring || false,
            notes: entry.notes || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Add entry to collection
        this.entries.push(newEntry);
        
        // Save entries
        this.saveEntries();
        
        // Trigger event
        this.triggerEvent('entryAdded', newEntry);
        
        return newEntry.id;
    }

    /**
     * Update an existing dream journal entry
     * @param {string} id - Entry ID
     * @param {Object} updates - Updates to apply
     * @returns {boolean} Success indicator
     */
    updateEntry(id, updates) {
        const index = this.entries.findIndex(entry => entry.id === id);
        if (index === -1) {
            return false;
        }
        
        // Apply updates
        const updatedEntry = {
            ...this.entries[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        
        // Update entry
        this.entries[index] = updatedEntry;
        
        // Save entries
        this.saveEntries();
        
        // Trigger event
        this.triggerEvent('entryUpdated', updatedEntry);
        
        return true;
    }

    /**
     * Delete a dream journal entry
     * @param {string} id - Entry ID
     * @returns {boolean} Success indicator
     */
    deleteEntry(id) {
        const index = this.entries.findIndex(entry => entry.id === id);
        if (index === -1) {
            return false;
        }
        
        // Store entry for event
        const deletedEntry = this.entries[index];
        
        // Remove entry
        this.entries.splice(index, 1);
        
        // Save entries
        this.saveEntries();
        
        // Trigger event
        this.triggerEvent('entryDeleted', deletedEntry);
        
        return true;
    }

    /**
     * Get a dream journal entry by ID
     * @param {string} id - Entry ID
     * @returns {Object|null} Entry or null if not found
     */
    getEntry(id) {
        return this.entries.find(entry => entry.id === id) || null;
    }

    /**
     * Get all dream journal entries
     * @param {Object} filters - Optional filters to apply
     * @returns {Array} Filtered entries
     */
    getEntries(filters = {}) {
        let filteredEntries = [...this.entries];
        
        // Apply date range filter
        if (filters.startDate) {
            const startDate = new Date(filters.startDate);
            filteredEntries = filteredEntries.filter(entry => 
                new Date(entry.date) >= startDate
            );
        }
        
        if (filters.endDate) {
            const endDate = new Date(filters.endDate);
            filteredEntries = filteredEntries.filter(entry => 
                new Date(entry.date) <= endDate
            );
        }
        
        // Apply tags filter
        if (filters.tags && filters.tags.length > 0) {
            filteredEntries = filteredEntries.filter(entry => 
                filters.tags.some(tag => entry.tags.includes(tag))
            );
        }
        
        // Apply emotions filter
        if (filters.emotions && filters.emotions.length > 0) {
            filteredEntries = filteredEntries.filter(entry => 
                filters.emotions.some(emotion => entry.emotions.includes(emotion))
            );
        }
        
        // Apply sleep quality filter
        if (filters.minSleepQuality !== undefined) {
            filteredEntries = filteredEntries.filter(entry => 
                entry.sleepQuality >= filters.minSleepQuality
            );
        }
        
        // Apply dream clarity filter
        if (filters.minDreamClarity !== undefined) {
            filteredEntries = filteredEntries.filter(entry => 
                entry.dreamClarity >= filters.minDreamClarity
            );
        }
        
        // Apply lucid dream filter
        if (filters.isLucid !== undefined) {
            filteredEntries = filteredEntries.filter(entry => 
                entry.isLucid === filters.isLucid
            );
        }
        
        // Apply recurring dream filter
        if (filters.isRecurring !== undefined) {
            filteredEntries = filteredEntries.filter(entry => 
                entry.isRecurring === filters.isRecurring
            );
        }
        
        // Apply text search filter
        if (filters.searchText) {
            const searchText = filters.searchText.toLowerCase();
            filteredEntries = filteredEntries.filter(entry => 
                entry.dreamContent.toLowerCase().includes(searchText) ||
                (entry.title && entry.title.toLowerCase().includes(searchText)) ||
                (entry.notes && entry.notes.toLowerCase().includes(searchText))
            );
        }
        
        // Apply sorting
        if (filters.sortBy) {
            filteredEntries.sort((a, b) => {
                switch (filters.sortBy) {
                    case 'date':
                        return new Date(a.date) - new Date(b.date);
                    case 'dateDesc':
                        return new Date(b.date) - new Date(a.date);
                    case 'sleepQuality':
                        return a.sleepQuality - b.sleepQuality;
                    case 'sleepQualityDesc':
                        return b.sleepQuality - a.sleepQuality;
                    case 'dreamClarity':
                        return a.dreamClarity - b.dreamClarity;
                    case 'dreamClarityDesc':
                        return b.dreamClarity - a.dreamClarity;
                    default:
                        return 0;
                }
            });
        } else {
            // Default sort: newest first
            filteredEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        
        return filteredEntries;
    }

    /**
     * Save an entry from a form element
     * @param {HTMLFormElement} form - Form element
     * @returns {string} Entry ID
     */
    saveEntryFromForm(form) {
        const formData = new FormData(form);
        
        const entry = {
            date: formData.get('dream-date') || new Date().toISOString().slice(0, 10),
            dreamContent: formData.get('dream-content') || '',
            title: formData.get('dream-title') || '',
            tags: formData.getAll('dream-tags') || [],
            emotions: formData.getAll('dream-emotions') || [],
            sleepQuality: parseInt(formData.get('sleep-quality') || '3', 10),
            dreamClarity: parseInt(formData.get('dream-clarity') || '3', 10),
            isLucid: formData.get('is-lucid') === 'on',
            isRecurring: formData.get('is-recurring') === 'on',
            notes: formData.get('dream-notes') || ''
        };
        
        // Check if editing existing entry
        const entryId = formData.get('entry-id');
        if (entryId) {
            this.updateEntry(entryId, entry);
            return entryId;
        } else {
            // Add new entry
            return this.addEntry(entry);
        }
    }

    /**
     * Set the current view mode
     * @param {string} mode - View mode ('list', 'calendar', 'stats')
     */
    setViewMode(mode) {
        if (!['list', 'calendar', 'stats'].includes(mode)) {
            console.warn(`Invalid view mode: ${mode}`);
            return;
        }
        
        this.viewMode = mode;
        
        // Trigger event
        this.triggerEvent('viewModeChanged', mode);
        
        // Update UI if elements exist
        if (this.elements.viewModes) {
            Object.values(this.elements.viewModes).forEach(el => {
                el.classList.toggle('active', el.dataset.view === mode);
            });
        }
        
        if (this.elements.viewContainers) {
            Object.values(this.elements.viewContainers).forEach(el => {
                el.style.display = el.dataset.view === mode ? 'block' : 'none';
            });
        }
    }

    /**
     * Generate a title from dream content
     * @param {string} content - Dream content
     * @returns {string} Generated title
     */
    generateTitle(content) {
        // Simple implementation: take first 5 words or 30 characters
        if (!content) return 'Untitled Dream';
        
        const words = content.split(' ').slice(0, 5).join(' ');
        return words.length > 30 ? words.substring(0, 30) + '...' : words;
    }

    /**
     * Generate a unique ID for a dream entry
     * @returns {string} Unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    /**
     * Analyze dream content with AI
     * @param {string} dreamContent - Dream content to analyze
     * @returns {Promise<Object>} Analysis results
     */
    async analyzeDream(dreamContent) {
        // Check cache first
        const cacheKey = dreamContent.trim().substring(0, 100);
        if (this.analysisCache.has(cacheKey)) {
            return this.analysisCache.get(cacheKey);
        }
        
        try {
            // Call API for analysis
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ dreamContent })
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            
            const analysis = await response.json();
            
            // Cache results
            this.analysisCache.set(cacheKey, analysis);
            
            return analysis;
        } catch (error) {
            console.error('Error analyzing dream:', error);
            
            // Provide fallback analysis when API is unavailable
            // This would normally be done only in development or when explicitly requested
            return {
                suggestedTags: this.generatePlaceholderTags(dreamContent),
                suggestedEmotions: this.generatePlaceholderEmotions(dreamContent),
                possibleMeanings: [
                    'Please connect to the API for accurate dream analysis.',
                    'Dream analysis requires AI processing to provide meaningful insights.'
                ],
                dreamType: 'Unknown (API unavailable)',
                error: error.message
            };
        }
    }

    /**
     * Generate placeholder tags based on dream content
     * @param {string} content - Dream content
     * @returns {Array} Generated tags
     */
    generatePlaceholderTags(content) {
        // Simple placeholder logic - picks some tags that might be related
        // based on very basic keyword matching
        const keywords = {
            'fly': 'Flying',
            'fell': 'Falling',
            'fall': 'Falling',
            'chase': 'Chase',
            'run': 'Chase',
            'test': 'Test/Exam',
            'exam': 'Test/Exam',
            'school': 'Test/Exam',
            'miss': 'Missing Something',
            'lost': 'Missing Something',
            'late': 'Being Late',
            'home': 'Childhood Home',
            'house': 'Childhood Home',
            'celebrity': 'Celebrity',
            'famous': 'Celebrity',
            'animal': 'Animals',
            'dog': 'Animals',
            'cat': 'Animals',
            'water': 'Water',
            'ocean': 'Water',
            'sea': 'Water',
            'river': 'Water',
            'lake': 'Water',
            'mountain': 'Mountains',
            'forest': 'Forest',
            'tree': 'Forest',
            'space': 'Space',
            'star': 'Space',
            'galaxy': 'Space',
            'magic': 'Magic Powers',
            'power': 'Magic Powers',
            'memory': 'Past Memory',
            'childhood': 'Past Memory',
            'dead': 'Deceased Loved One',
            'died': 'Deceased Loved One',
            'death': 'Deceased Loved One',
            'monster': 'Monsters',
            'creature': 'Monsters',
            'apocalypse': 'Apocalypse',
            'end': 'Apocalypse',
            'destroy': 'Apocalypse',
            'future': 'Future',
            'love': 'Romance',
            'kiss': 'Romance',
            'date': 'Romance'
        };
        
        // Match keywords in content
        const contentLower = content.toLowerCase();
        const matchedTags = new Set();
        
        Object.entries(keywords).forEach(([keyword, tag]) => {
            if (contentLower.includes(keyword)) {
                matchedTags.add(tag);
            }
        });
        
        // Return tags or a subset of dream tags if none matched
        return matchedTags.size > 0 ? 
            Array.from(matchedTags) : 
            this.dreamTags.slice(0, 3);
    }

    /**
     * Generate placeholder emotions based on dream content
     * @param {string} content - Dream content
     * @returns {Array} Generated emotions
     */
    generatePlaceholderEmotions(content) {
        // Common emotions in dreams
        const emotions = [
            'Joy', 'Fear', 'Anxiety', 'Confusion', 
            'Peace', 'Excitement', 'Sadness', 'Surprise'
        ];
        
        // Very simplistic - pick 2-3 random emotions
        const count = 2 + Math.floor(Math.random() * 2);
        const selectedEmotions = [];
        
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * emotions.length);
            const emotion = emotions[randomIndex];
            
            if (!selectedEmotions.includes(emotion)) {
                selectedEmotions.push(emotion);
            }
        }
        
        return selectedEmotions;
    }

    /**
     * Get dream statistics and patterns
     * @returns {Object} Dream statistics
     */
    getDreamStats() {
        if (this.entries.length === 0) {
            return {
                totalDreams: 0,
                lucidDreamCount: 0,
                lucidDreamPercentage: 0,
                recurringDreamCount: 0,
                recurringDreamPercentage: 0,
                avgSleepQuality: 0,
                avgDreamClarity: 0,
                topTags: [],
                topEmotions: [],
                dreamsByMonth: [],
                sleepQualityTrend: []
            };
        }
        
        // Calculate statistics
        const lucidDreamCount = this.entries.filter(e => e.isLucid).length;
        const recurringDreamCount = this.entries.filter(e => e.isRecurring).length;
        
        const totalSleepQuality = this.entries.reduce((sum, e) => sum + e.sleepQuality, 0);
        const totalDreamClarity = this.entries.reduce((sum, e) => sum + e.dreamClarity, 0);
        
        // Calculate tag frequencies
        const tagCounts = {};
        this.entries.forEach(entry => {
            entry.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });
        
        // Calculate emotion frequencies
        const emotionCounts = {};
        this.entries.forEach(entry => {
            entry.emotions.forEach(emotion => {
                emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
            });
        });
        
        // Get top tags and emotions
        const topTags = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([tag, count]) => ({ tag, count }));
            
        const topEmotions = Object.entries(emotionCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([emotion, count]) => ({ emotion, count }));
            
        // Group dreams by month
        const dreamsByMonth = {};
        this.entries.forEach(entry => {
            const date = new Date(entry.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            dreamsByMonth[monthKey] = (dreamsByMonth[monthKey] || 0) + 1;
        });
        
        // Convert to array and sort
        const dreamsByMonthArray = Object.entries(dreamsByMonth)
            .map(([month, count]) => ({ month, count }))
            .sort((a, b) => a.month.localeCompare(b.month));
        
        // Calculate sleep quality trend
        const sleepQualityByMonth = {};
        this.entries.forEach(entry => {
            const date = new Date(entry.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (!sleepQualityByMonth[monthKey]) {
                sleepQualityByMonth[monthKey] = { total: 0, count: 0 };
            }
            
            sleepQualityByMonth[monthKey].total += entry.sleepQuality;
            sleepQualityByMonth[monthKey].count += 1;
        });
        
        // Convert to array and calculate averages
        const sleepQualityTrend = Object.entries(sleepQualityByMonth)
            .map(([month, data]) => ({
                month,
                avgQuality: data.total / data.count
            }))
            .sort((a, b) => a.month.localeCompare(b.month));
        
        return {
            totalDreams: this.entries.length,
            lucidDreamCount,
            lucidDreamPercentage: (lucidDreamCount / this.entries.length) * 100,
            recurringDreamCount,
            recurringDreamPercentage: (recurringDreamCount / this.entries.length) * 100,
            avgSleepQuality: totalSleepQuality / this.entries.length,
            avgDreamClarity: totalDreamClarity / this.entries.length,
            topTags,
            topEmotions,
            dreamsByMonth: dreamsByMonthArray,
            sleepQualityTrend
        };
    }

    /**
     * Register an event handler
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     */
    on(event, handler) {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        
        this.eventHandlers[event].push(handler);
    }

    /**
     * Trigger an event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    triggerEvent(event, data) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event].forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }

    /**
     * Create UI for dream journal
     * @param {HTMLElement|string} container - Container element or selector
     * @returns {HTMLElement} Created UI element
     */
    createUI(container) {
        // Get container element
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) {
            console.error('Container element not found');
            return null;
        }
        
        // Create main UI container
        const uiContainer = document.createElement('div');
        uiContainer.className = 'dream-journal-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'dream-journal-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'dream-journal-title';
        title.textContent = 'Dream Journal';
        header.appendChild(title);
        
        // Create buttons container
        const buttons = document.createElement('div');
        buttons.className = 'dream-journal-buttons';
        header.appendChild(buttons);
        
        // Add new dream button
        const addButton = document.createElement('button');
        addButton.className = 'dream-journal-add-button';
        addButton.innerHTML = '<i class="fas fa-plus"></i> New Dream';
        buttons.appendChild(addButton);
        
        // Create view mode toggle
        const viewToggle = document.createElement('div');
        viewToggle.className = 'dream-view-toggle-container';
        buttons.appendChild(viewToggle);
        
        // Create view mode buttons
        const viewModes = {
            list: document.createElement('button'),
            calendar: document.createElement('button'),
            stats: document.createElement('button')
        };
        
        viewModes.list.className = 'dream-view-toggle active';
        viewModes.list.dataset.view = 'list';
        viewModes.list.innerHTML = '<i class="fas fa-list"></i>';
        viewModes.list.title = 'List View';
        
        viewModes.calendar.className = 'dream-view-toggle';
        viewModes.calendar.dataset.view = 'calendar';
        viewModes.calendar.innerHTML = '<i class="fas fa-calendar"></i>';
        viewModes.calendar.title = 'Calendar View';
        
        viewModes.stats.className = 'dream-view-toggle';
        viewModes.stats.dataset.view = 'stats';
        viewModes.stats.innerHTML = '<i class="fas fa-chart-bar"></i>';
        viewModes.stats.title = 'Statistics View';
        
        Object.values(viewModes).forEach(button => {
            viewToggle.appendChild(button);
            
            // Add click handler
            button.addEventListener('click', () => {
                this.setViewMode(button.dataset.view);
            });
        });
        
        // Create view containers
        const viewContainers = {
            list: document.createElement('div'),
            calendar: document.createElement('div'),
            stats: document.createElement('div')
        };
        
        viewContainers.list.className = 'dream-journal-view dream-list-view';
        viewContainers.list.dataset.view = 'list';
        
        viewContainers.calendar.className = 'dream-journal-view dream-calendar-view';
        viewContainers.calendar.dataset.view = 'calendar';
        viewContainers.calendar.style.display = 'none';
        
        viewContainers.stats.className = 'dream-journal-view dream-stats-view';
        viewContainers.stats.dataset.view = 'stats';
        viewContainers.stats.style.display = 'none';
        
        Object.values(viewContainers).forEach(container => {
            uiContainer.appendChild(container);
        });
        
        // Store UI element references
        this.elements = {
            container: uiContainer,
            header,
            buttons,
            addButton,
            viewToggle,
            viewModes,
            viewContainers
        };
        
        // Add click handler for new dream button
        addButton.addEventListener('click', () => {
            this.showEntryForm();
        });
        
        // Populate views
        this.populateListView();
        this.populateCalendarView();
        this.populateStatsView();
        
        // Add styles
        this.addStyles();
        
        return uiContainer;
    }

    /**
     * Show entry form for adding or editing a dream
     * @param {string} entryId - Entry ID for editing (optional)
     */
    showEntryForm(entryId = null) {
        // Get entry if editing
        const entry = entryId ? this.getEntry(entryId) : null;
        
        // Create form container
        const formContainer = document.createElement('div');
        formContainer.className = 'dream-journal-form-container';
        
        // Create form header
        const formHeader = document.createElement('div');
        formHeader.className = 'dream-form-header';
        formContainer.appendChild(formHeader);
        
        const formTitle = document.createElement('h3');
        formTitle.className = 'dream-form-title';
        formTitle.textContent = entry ? 'Edit Dream' : 'New Dream';
        formHeader.appendChild(formTitle);
        
        const closeButton = document.createElement('button');
        closeButton.className = 'dream-form-close';
        closeButton.innerHTML = '&times;';
        formHeader.appendChild(closeButton);
        
        // Create form
        const form = document.createElement('form');
        form.className = 'dream-journal-form';
        form.id = 'dream-journal-form';
        formContainer.appendChild(form);
        
        // Hidden entry ID for editing
        if (entry) {
            const entryIdInput = document.createElement('input');
            entryIdInput.type = 'hidden';
            entryIdInput.name = 'entry-id';
            entryIdInput.value = entry.id;
            form.appendChild(entryIdInput);
        }
        
        // Dream date
        const dateGroup = document.createElement('div');
        dateGroup.className = 'form-group';
        form.appendChild(dateGroup);
        
        const dateLabel = document.createElement('label');
        dateLabel.htmlFor = 'dream-date';
        dateLabel.textContent = 'Dream Date';
        dateGroup.appendChild(dateLabel);
        
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.id = 'dream-date';
        dateInput.name = 'dream-date';
        dateInput.value = entry ? 
            new Date(entry.date).toISOString().slice(0, 10) : 
            new Date().toISOString().slice(0, 10);
        dateGroup.appendChild(dateInput);
        
        // Dream title
        const titleGroup = document.createElement('div');
        titleGroup.className = 'form-group';
        form.appendChild(titleGroup);
        
        const titleLabel = document.createElement('label');
        titleLabel.htmlFor = 'dream-title';
        titleLabel.textContent = 'Dream Title';
        titleGroup.appendChild(titleLabel);
        
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'dream-title';
        titleInput.name = 'dream-title';
        titleInput.placeholder = 'Title for your dream';
        if (entry && entry.title) {
            titleInput.value = entry.title;
        }
        titleGroup.appendChild(titleInput);
        
        // Dream content
        const contentGroup = document.createElement('div');
        contentGroup.className = 'form-group';
        form.appendChild(contentGroup);
        
        const contentLabel = document.createElement('label');
        contentLabel.htmlFor = 'dream-content';
        contentLabel.textContent = 'Dream Description';
        contentGroup.appendChild(contentLabel);
        
        const contentTextarea = document.createElement('textarea');
        contentTextarea.id = 'dream-content';
        contentTextarea.name = 'dream-content';
        contentTextarea.placeholder = 'Describe your dream in detail...';
        contentTextarea.rows = 6;
        if (entry && entry.dreamContent) {
            contentTextarea.value = entry.dreamContent;
        }
        contentGroup.appendChild(contentTextarea);
        
        // Add analyze button
        const analyzeButton = document.createElement('button');
        analyzeButton.type = 'button';
        analyzeButton.className = 'dream-analyze-button';
        analyzeButton.textContent = 'Analyze Dream';
        contentGroup.appendChild(analyzeButton);
        
        // Tags (multiselect)
        const tagsGroup = document.createElement('div');
        tagsGroup.className = 'form-group';
        form.appendChild(tagsGroup);
        
        const tagsLabel = document.createElement('label');
        tagsLabel.htmlFor = 'dream-tags';
        tagsLabel.textContent = 'Dream Tags';
        tagsGroup.appendChild(tagsLabel);
        
        const tagsSelect = document.createElement('select');
        tagsSelect.id = 'dream-tags';
        tagsSelect.name = 'dream-tags';
        tagsSelect.multiple = true;
        
        this.dreamTags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            if (entry && entry.tags && entry.tags.includes(tag)) {
                option.selected = true;
            }
            tagsSelect.appendChild(option);
        });
        
        tagsGroup.appendChild(tagsSelect);
        
        // Sleep quality
        const sleepQualityGroup = document.createElement('div');
        sleepQualityGroup.className = 'form-group';
        form.appendChild(sleepQualityGroup);
        
        const sleepQualityLabel = document.createElement('label');
        sleepQualityLabel.htmlFor = 'sleep-quality';
        sleepQualityLabel.textContent = 'Sleep Quality';
        sleepQualityGroup.appendChild(sleepQualityLabel);
        
        const sleepQualitySelect = document.createElement('select');
        sleepQualitySelect.id = 'sleep-quality';
        sleepQualitySelect.name = 'sleep-quality';
        
        this.sleepQualityScale.forEach(quality => {
            const option = document.createElement('option');
            option.value = quality.value;
            option.textContent = `${quality.value} - ${quality.label}`;
            if (entry && entry.sleepQuality === quality.value) {
                option.selected = true;
            }
            sleepQualitySelect.appendChild(option);
        });
        
        sleepQualityGroup.appendChild(sleepQualitySelect);
        
        // Dream clarity
        const dreamClarityGroup = document.createElement('div');
        dreamClarityGroup.className = 'form-group';
        form.appendChild(dreamClarityGroup);
        
        const dreamClarityLabel = document.createElement('label');
        dreamClarityLabel.htmlFor = 'dream-clarity';
        dreamClarityLabel.textContent = 'Dream Clarity';
        dreamClarityGroup.appendChild(dreamClarityLabel);
        
        const dreamClaritySelect = document.createElement('select');
        dreamClaritySelect.id = 'dream-clarity';
        dreamClaritySelect.name = 'dream-clarity';
        
        this.dreamClarityScale.forEach(clarity => {
            const option = document.createElement('option');
            option.value = clarity.value;
            option.textContent = `${clarity.value} - ${clarity.label}`;
            if (entry && entry.dreamClarity === clarity.value) {
                option.selected = true;
            }
            dreamClaritySelect.appendChild(option);
        });
        
        dreamClarityGroup.appendChild(dreamClaritySelect);
        
        // Checkboxes row
        const checkboxRow = document.createElement('div');
        checkboxRow.className = 'form-row';
        form.appendChild(checkboxRow);
        
        // Lucid dream checkbox
        const lucidGroup = document.createElement('div');
        lucidGroup.className = 'form-group checkbox-group';
        checkboxRow.appendChild(lucidGroup);
        
        const lucidCheckbox = document.createElement('input');
        lucidCheckbox.type = 'checkbox';
        lucidCheckbox.id = 'is-lucid';
        lucidCheckbox.name = 'is-lucid';
        if (entry && entry.isLucid) {
            lucidCheckbox.checked = true;
        }
        lucidGroup.appendChild(lucidCheckbox);
        
        const lucidLabel = document.createElement('label');
        lucidLabel.htmlFor = 'is-lucid';
        lucidLabel.textContent = 'Lucid Dream';
        lucidGroup.appendChild(lucidLabel);
        
        // Recurring dream checkbox
        const recurringGroup = document.createElement('div');
        recurringGroup.className = 'form-group checkbox-group';
        checkboxRow.appendChild(recurringGroup);
        
        const recurringCheckbox = document.createElement('input');
        recurringCheckbox.type = 'checkbox';
        recurringCheckbox.id = 'is-recurring';
        recurringCheckbox.name = 'is-recurring';
        if (entry && entry.isRecurring) {
            recurringCheckbox.checked = true;
        }
        recurringGroup.appendChild(recurringCheckbox);
        
        const recurringLabel = document.createElement('label');
        recurringLabel.htmlFor = 'is-recurring';
        recurringLabel.textContent = 'Recurring Dream';
        recurringGroup.appendChild(recurringLabel);
        
        // Notes
        const notesGroup = document.createElement('div');
        notesGroup.className = 'form-group';
        form.appendChild(notesGroup);
        
        const notesLabel = document.createElement('label');
        notesLabel.htmlFor = 'dream-notes';
        notesLabel.textContent = 'Additional Notes';
        notesGroup.appendChild(notesLabel);
        
        const notesTextarea = document.createElement('textarea');
        notesTextarea.id = 'dream-notes';
        notesTextarea.name = 'dream-notes';
        notesTextarea.placeholder = 'Any additional thoughts or reflections...';
        notesTextarea.rows = 3;
        if (entry && entry.notes) {
            notesTextarea.value = entry.notes;
        }
        notesGroup.appendChild(notesTextarea);
        
        // Form buttons
        const formButtons = document.createElement('div');
        formButtons.className = 'form-buttons';
        form.appendChild(formButtons);
        
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.className = 'dream-form-cancel';
        cancelButton.textContent = 'Cancel';
        formButtons.appendChild(cancelButton);
        
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'dream-form-submit';
        submitButton.textContent = entry ? 'Update Dream' : 'Save Dream';
        formButtons.appendChild(submitButton);
        
        // Add event listeners
        
        // Close button
        closeButton.addEventListener('click', () => {
            document.body.removeChild(formContainer);
        });
        
        // Cancel button
        cancelButton.addEventListener('click', () => {
            document.body.removeChild(formContainer);
        });
        
        // Analyze button
        analyzeButton.addEventListener('click', async () => {
            const dreamContent = contentTextarea.value;
            if (!dreamContent) {
                alert('Please enter your dream description first');
                return;
            }
            
            // Show loading state
            analyzeButton.textContent = 'Analyzing...';
            analyzeButton.disabled = true;
            
            try {
                // Analyze dream
                const analysis = await this.analyzeDream(dreamContent);
                
                // Update form with suggested tags
                if (analysis.suggestedTags) {
                    // Select suggested tags
                    Array.from(tagsSelect.options).forEach(option => {
                        option.selected = analysis.suggestedTags.includes(option.value);
                    });
                }
                
                // Show analysis results
                this.showAnalysisResults(analysis, formContainer);
                
                // Reset button
                analyzeButton.textContent = 'Analyze Dream';
                analyzeButton.disabled = false;
            } catch (error) {
                console.error('Error analyzing dream:', error);
                alert('Failed to analyze dream. Please try again.');
                
                // Reset button
                analyzeButton.textContent = 'Analyze Dream';
                analyzeButton.disabled = false;
            }
        });
        
        // Form submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Save entry
            const formData = new FormData(form);
            const entryId = this.saveEntryFromForm(form);
            
            // Close form
            document.body.removeChild(formContainer);
            
            // Refresh views
            this.populateListView();
            this.populateCalendarView();
            this.populateStatsView();
        });
        
        // Add to document
        document.body.appendChild(formContainer);
        
        // Focus first field
        titleInput.focus();
    }

    /**
     * Show dream analysis results
     * @param {Object} analysis - Analysis results
     * @param {HTMLElement} container - Container to append results to
     */
    showAnalysisResults(analysis, container) {
        // Remove existing results
        const existingResults = container.querySelector('.dream-analysis-results');
        if (existingResults) {
            existingResults.remove();
        }
        
        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'dream-analysis-results';
        
        // Create header
        const resultsHeader = document.createElement('div');
        resultsHeader.className = 'analysis-header';
        resultsContainer.appendChild(resultsHeader);
        
        const resultsTitle = document.createElement('h3');
        resultsTitle.className = 'analysis-title';
        resultsTitle.textContent = 'Dream Analysis';
        resultsHeader.appendChild(resultsTitle);
        
        const closeButton = document.createElement('button');
        closeButton.className = 'analysis-close';
        closeButton.innerHTML = '&times;';
        resultsHeader.appendChild(closeButton);
        
        // Create content
        const resultsContent = document.createElement('div');
        resultsContent.className = 'analysis-content';
        resultsContainer.appendChild(resultsContent);
        
        // Add dream type
        if (analysis.dreamType) {
            const dreamTypeSection = document.createElement('div');
            dreamTypeSection.className = 'analysis-section';
            resultsContent.appendChild(dreamTypeSection);
            
            const dreamTypeTitle = document.createElement('h4');
            dreamTypeTitle.className = 'analysis-section-title';
            dreamTypeTitle.textContent = 'Dream Type';
            dreamTypeSection.appendChild(dreamTypeTitle);
            
            const dreamTypeText = document.createElement('p');
            dreamTypeText.className = 'analysis-text';
            dreamTypeText.textContent = analysis.dreamType;
            dreamTypeSection.appendChild(dreamTypeText);
        }
        
        // Add possible meanings
        if (analysis.possibleMeanings && analysis.possibleMeanings.length > 0) {
            const meaningsSection = document.createElement('div');
            meaningsSection.className = 'analysis-section';
            resultsContent.appendChild(meaningsSection);
            
            const meaningsTitle = document.createElement('h4');
            meaningsTitle.className = 'analysis-section-title';
            meaningsTitle.textContent = 'Possible Meanings';
            meaningsSection.appendChild(meaningsTitle);
            
            const meaningsList = document.createElement('ul');
            meaningsList.className = 'analysis-list';
            meaningsSection.appendChild(meaningsList);
            
            analysis.possibleMeanings.forEach(meaning => {
                const meaningItem = document.createElement('li');
                meaningItem.textContent = meaning;
                meaningsList.appendChild(meaningItem);
            });
        }
        
        // Add suggested tags
        if (analysis.suggestedTags && analysis.suggestedTags.length > 0) {
            const tagsSection = document.createElement('div');
            tagsSection.className = 'analysis-section';
            resultsContent.appendChild(tagsSection);
            
            const tagsTitle = document.createElement('h4');
            tagsTitle.className = 'analysis-section-title';
            tagsTitle.textContent = 'Suggested Tags';
            tagsSection.appendChild(tagsTitle);
            
            const tagsList = document.createElement('div');
            tagsList.className = 'tags-list';
            tagsSection.appendChild(tagsList);
            
            analysis.suggestedTags.forEach(tag => {
                const tagItem = document.createElement('span');
                tagItem.className = 'tag-item';
                tagItem.textContent = tag;
                tagsList.appendChild(tagItem);
            });
        }
        
        // Add suggested emotions
        if (analysis.suggestedEmotions && analysis.suggestedEmotions.length > 0) {
            const emotionsSection = document.createElement('div');
            emotionsSection.className = 'analysis-section';
            resultsContent.appendChild(emotionsSection);
            
            const emotionsTitle = document.createElement('h4');
            emotionsTitle.className = 'analysis-section-title';
            emotionsTitle.textContent = 'Emotions Detected';
            emotionsSection.appendChild(emotionsTitle);
            
            const emotionsList = document.createElement('div');
            emotionsList.className = 'emotions-list';
            emotionsSection.appendChild(emotionsList);
            
            analysis.suggestedEmotions.forEach(emotion => {
                const emotionItem = document.createElement('span');
                emotionItem.className = 'emotion-item';
                emotionItem.textContent = emotion;
                emotionsList.appendChild(emotionItem);
            });
        }
        
        // Add error message if present
        if (analysis.error) {
            const errorSection = document.createElement('div');
            errorSection.className = 'analysis-section error-section';
            resultsContent.appendChild(errorSection);
            
            const errorTitle = document.createElement('h4');
            errorTitle.className = 'analysis-section-title';
            errorTitle.textContent = 'Error';
            errorSection.appendChild(errorTitle);
            
            const errorText = document.createElement('p');
            errorText.className = 'analysis-text error-text';
            errorText.textContent = analysis.error;
            errorSection.appendChild(errorText);
        }
        
        // Add close button handler
        closeButton.addEventListener('click', () => {
            resultsContainer.remove();
        });
        
        // Add to container
        container.appendChild(resultsContainer);
    }

    /**
     * Populate list view with entries
     */
    populateListView() {
        const listView = this.elements.viewContainers.list;
        listView.innerHTML = '';
        
        // Create filter bar
        const filterBar = document.createElement('div');
        filterBar.className = 'dream-filter-bar';
        listView.appendChild(filterBar);
        
        // Create search input
        const searchContainer = document.createElement('div');
        searchContainer.className = 'dream-search-container';
        filterBar.appendChild(searchContainer);
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'dream-search-input';
        searchInput.placeholder = 'Search dreams...';
        searchContainer.appendChild(searchInput);
        
        const searchIcon = document.createElement('i');
        searchIcon.className = 'fas fa-search dream-search-icon';
        searchContainer.appendChild(searchIcon);
        
        // Create filter buttons
        const filterButtons = document.createElement('div');
        filterButtons.className = 'dream-filter-buttons';
        filterBar.appendChild(filterButtons);
        
        const lucidFilterBtn = document.createElement('button');
        lucidFilterBtn.className = 'dream-filter-btn';
        lucidFilterBtn.dataset.filter = 'lucid';
        lucidFilterBtn.textContent = 'Lucid Dreams';
        filterButtons.appendChild(lucidFilterBtn);
        
        const recurringFilterBtn = document.createElement('button');
        recurringFilterBtn.className = 'dream-filter-btn';
        recurringFilterBtn.dataset.filter = 'recurring';
        recurringFilterBtn.textContent = 'Recurring Dreams';
        filterButtons.appendChild(recurringFilterBtn);
        
        // Create entries list
        const entriesList = document.createElement('div');
        entriesList.className = 'dream-entries-list';
        listView.appendChild(entriesList);
        
        // Get entries
        const entries = this.getEntries();
        
        // Check if there are entries
        if (entries.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'dream-empty-state';
            emptyState.innerHTML = `
                <div class="empty-icon"><i class="fas fa-moon"></i></div>
                <h3 class="empty-title">No Dreams Yet</h3>
                <p class="empty-message">Start recording your dreams to see them here</p>
                <button class="empty-action">Record First Dream</button>
            `;
            entriesList.appendChild(emptyState);
            
            // Add click handler for action button
            const actionButton = emptyState.querySelector('.empty-action');
            actionButton.addEventListener('click', () => {
                this.showEntryForm();
            });
            
            return;
        }
        
        // Populate with entries
        entries.forEach(entry => {
            const entryItem = document.createElement('div');
            entryItem.className = 'dream-entry-item';
            entryItem.dataset.id = entry.id;
            
            // Add badges for lucid and recurring dreams
            const badges = document.createElement('div');
            badges.className = 'dream-badges';
            
            if (entry.isLucid) {
                const lucidBadge = document.createElement('span');
                lucidBadge.className = 'dream-badge lucid-badge';
                lucidBadge.textContent = 'Lucid';
                badges.appendChild(lucidBadge);
            }
            
            if (entry.isRecurring) {
                const recurringBadge = document.createElement('span');
                recurringBadge.className = 'dream-badge recurring-badge';
                recurringBadge.textContent = 'Recurring';
                badges.appendChild(recurringBadge);
            }
            
            entryItem.appendChild(badges);
            
            // Entry header with title and date
            const entryHeader = document.createElement('div');
            entryHeader.className = 'dream-entry-header';
            entryItem.appendChild(entryHeader);
            
            const entryTitle = document.createElement('h4');
            entryTitle.className = 'dream-entry-title';
            entryTitle.textContent = entry.title;
            entryHeader.appendChild(entryTitle);
            
            const entryDate = document.createElement('div');
            entryDate.className = 'dream-entry-date';
            entryDate.textContent = new Date(entry.date).toLocaleDateString();
            entryHeader.appendChild(entryDate);
            
            // Entry content preview
            const entryContent = document.createElement('div');
            entryContent.className = 'dream-entry-content';
            
            // Truncate content if it's too long
            const previewContent = entry.dreamContent.length > 150 ? 
                entry.dreamContent.substring(0, 150) + '...' : 
                entry.dreamContent;
                
            entryContent.textContent = previewContent;
            entryItem.appendChild(entryContent);
            
            // Tags
            if (entry.tags && entry.tags.length > 0) {
                const entryTags = document.createElement('div');
                entryTags.className = 'dream-entry-tags';
                
                entry.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'dream-tag';
                    tagSpan.textContent = tag;
                    entryTags.appendChild(tagSpan);
                });
                
                entryItem.appendChild(entryTags);
            }
            
            // Entry actions
            const entryActions = document.createElement('div');
            entryActions.className = 'dream-entry-actions';
            entryItem.appendChild(entryActions);
            
            const editButton = document.createElement('button');
            editButton.className = 'dream-action-btn edit-btn';
            editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
            entryActions.appendChild(editButton);
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'dream-action-btn delete-btn';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
            entryActions.appendChild(deleteButton);
            
            // Add event listeners
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showEntryForm(entry.id);
            });
            
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this dream entry?')) {
                    this.deleteEntry(entry.id);
                    this.populateListView();
                }
            });
            
            // Add click handler for entire entry
            entryItem.addEventListener('click', () => {
                this.showEntryDetails(entry.id);
            });
            
            entriesList.appendChild(entryItem);
        });
        
        // Add search functionality
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
            
            // Show all entries if search is empty
            if (!searchText) {
                entriesList.querySelectorAll('.dream-entry-item').forEach(item => {
                    item.style.display = '';
                });
                return;
            }
            
            // Filter entries
            entriesList.querySelectorAll('.dream-entry-item').forEach(item => {
                const entryId = item.dataset.id;
                const entry = this.getEntry(entryId);
                
                if (!entry) return;
                
                const matchesSearch = 
                    entry.title.toLowerCase().includes(searchText) ||
                    entry.dreamContent.toLowerCase().includes(searchText) ||
                    (entry.notes && entry.notes.toLowerCase().includes(searchText)) ||
                    entry.tags.some(tag => tag.toLowerCase().includes(searchText));
                
                item.style.display = matchesSearch ? '' : 'none';
            });
        });
        
        // Add filter functionality
        filterButtons.querySelectorAll('.dream-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                
                // Get active filters
                const activeFilters = Array.from(filterButtons.querySelectorAll('.dream-filter-btn.active'))
                    .map(btn => btn.dataset.filter);
                
                // Show all entries if no filters active
                if (activeFilters.length === 0) {
                    entriesList.querySelectorAll('.dream-entry-item').forEach(item => {
                        item.style.display = '';
                    });
                    return;
                }
                
                // Filter entries
                entriesList.querySelectorAll('.dream-entry-item').forEach(item => {
                    const entryId = item.dataset.id;
                    const entry = this.getEntry(entryId);
                    
                    if (!entry) return;
                    
                    const matchesFilters = activeFilters.every(filter => {
                        if (filter === 'lucid') return entry.isLucid;
                        if (filter === 'recurring') return entry.isRecurring;
                        return true;
                    });
                    
                    item.style.display = matchesFilters ? '' : 'none';
                });
            });
        });
    }

    /**
     * Show entry details
     * @param {string} entryId - Entry ID
     */
    showEntryDetails(entryId) {
        const entry = this.getEntry(entryId);
        if (!entry) return;
        
        // Create details container
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'dream-details-container';
        
        // Create header
        const detailsHeader = document.createElement('div');
        detailsHeader.className = 'dream-details-header';
        detailsContainer.appendChild(detailsHeader);
        
        const detailsTitle = document.createElement('h3');
        detailsTitle.className = 'dream-details-title';
        detailsTitle.textContent = entry.title;
        detailsHeader.appendChild(detailsTitle);
        
        const closeButton = document.createElement('button');
        closeButton.className = 'dream-details-close';
        closeButton.innerHTML = '&times;';
        detailsHeader.appendChild(closeButton);
        
        // Create content
        const detailsContent = document.createElement('div');
        detailsContent.className = 'dream-details-content';
        detailsContainer.appendChild(detailsContent);
        
        // Dream date
        const dateSection = document.createElement('div');
        dateSection.className = 'details-section';
        detailsContent.appendChild(dateSection);
        
        const dateLabel = document.createElement('div');
        dateLabel.className = 'details-label';
        dateLabel.textContent = 'Date';
        dateSection.appendChild(dateLabel);
        
        const dateValue = document.createElement('div');
        dateValue.className = 'details-value';
        dateValue.textContent = new Date(entry.date).toLocaleDateString();
        dateSection.appendChild(dateValue);
        
        // Dream badges
        if (entry.isLucid || entry.isRecurring) {
            const badgesSection = document.createElement('div');
            badgesSection.className = 'details-section dream-details-badges';
            detailsContent.appendChild(badgesSection);
            
            if (entry.isLucid) {
                const lucidBadge = document.createElement('span');
                lucidBadge.className = 'dream-badge lucid-badge';
                lucidBadge.textContent = 'Lucid Dream';
                badgesSection.appendChild(lucidBadge);
            }
            
            if (entry.isRecurring) {
                const recurringBadge = document.createElement('span');
                recurringBadge.className = 'dream-badge recurring-badge';
                recurringBadge.textContent = 'Recurring Dream';
                badgesSection.appendChild(recurringBadge);
            }
        }
        
        // Dream content
        const contentSection = document.createElement('div');
        contentSection.className = 'details-section';
        detailsContent.appendChild(contentSection);
        
        const contentLabel = document.createElement('div');
        contentLabel.className = 'details-label';
        contentLabel.textContent = 'Dream Description';
        contentSection.appendChild(contentLabel);
        
        const contentValue = document.createElement('div');
        contentValue.className = 'details-value dream-full-content';
        contentValue.textContent = entry.dreamContent;
        contentSection.appendChild(contentValue);
        
        // Dream tags
        if (entry.tags && entry.tags.length > 0) {
            const tagsSection = document.createElement('div');
            tagsSection.className = 'details-section';
            detailsContent.appendChild(tagsSection);
            
            const tagsLabel = document.createElement('div');
            tagsLabel.className = 'details-label';
            tagsLabel.textContent = 'Tags';
            tagsSection.appendChild(tagsLabel);
            
            const tagsValue = document.createElement('div');
            tagsValue.className = 'details-value dream-details-tags';
            
            entry.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'dream-tag';
                tagSpan.textContent = tag;
                tagsValue.appendChild(tagSpan);
            });
            
            tagsSection.appendChild(tagsValue);
        }
        
        // Dream emotions
        if (entry.emotions && entry.emotions.length > 0) {
            const emotionsSection = document.createElement('div');
            emotionsSection.className = 'details-section';
            detailsContent.appendChild(emotionsSection);
            
            const emotionsLabel = document.createElement('div');
            emotionsLabel.className = 'details-label';
            emotionsLabel.textContent = 'Emotions';
            emotionsSection.appendChild(emotionsLabel);
            
            const emotionsValue = document.createElement('div');
            emotionsValue.className = 'details-value dream-details-emotions';
            
            entry.emotions.forEach(emotion => {
                const emotionSpan = document.createElement('span');
                emotionSpan.className = 'dream-emotion';
                emotionSpan.textContent = emotion;
                emotionsValue.appendChild(emotionSpan);
            });
            
            emotionsSection.appendChild(emotionsValue);
        }
        
        // Sleep quality
        const sleepQualitySection = document.createElement('div');
        sleepQualitySection.className = 'details-section';
        detailsContent.appendChild(sleepQualitySection);
        
        const sleepQualityLabel = document.createElement('div');
        sleepQualityLabel.className = 'details-label';
        sleepQualityLabel.textContent = 'Sleep Quality';
        sleepQualitySection.appendChild(sleepQualityLabel);
        
        const qualityScale = this.sleepQualityScale.find(q => q.value === entry.sleepQuality);
        const sleepQualityValue = document.createElement('div');
        sleepQualityValue.className = 'details-value';
        sleepQualityValue.textContent = qualityScale ? 
            `${qualityScale.value} - ${qualityScale.label}` : 
            entry.sleepQuality.toString();
        sleepQualitySection.appendChild(sleepQualityValue);
        
        // Dream clarity
        const dreamClaritySection = document.createElement('div');
        dreamClaritySection.className = 'details-section';
        detailsContent.appendChild(dreamClaritySection);
        
        const dreamClarityLabel = document.createElement('div');
        dreamClarityLabel.className = 'details-label';
        dreamClarityLabel.textContent = 'Dream Clarity';
        dreamClaritySection.appendChild(dreamClarityLabel);
        
        const clarityScale = this.dreamClarityScale.find(c => c.value === entry.dreamClarity);
        const dreamClarityValue = document.createElement('div');
        dreamClarityValue.className = 'details-value';
        dreamClarityValue.textContent = clarityScale ? 
            `${clarityScale.value} - ${clarityScale.label}` : 
            entry.dreamClarity.toString();
        dreamClaritySection.appendChild(dreamClarityValue);
        
        // Notes
        if (entry.notes) {
            const notesSection = document.createElement('div');
            notesSection.className = 'details-section';
            detailsContent.appendChild(notesSection);
            
            const notesLabel = document.createElement('div');
            notesLabel.className = 'details-label';
            notesLabel.textContent = 'Additional Notes';
            notesSection.appendChild(notesLabel);
            
            const notesValue = document.createElement('div');
            notesValue.className = 'details-value dream-notes';
            notesValue.textContent = entry.notes;
            notesSection.appendChild(notesValue);
        }
        
        // Dream actions
        const actionsSection = document.createElement('div');
        actionsSection.className = 'dream-details-actions';
        detailsContainer.appendChild(actionsSection);
        
        const editButton = document.createElement('button');
        editButton.className = 'dream-action-btn edit-btn';
        editButton.innerHTML = '<i class="fas fa-edit"></i> Edit Dream';
        actionsSection.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'dream-action-btn delete-btn';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete Dream';
        actionsSection.appendChild(deleteButton);
        
        const analyzeButton = document.createElement('button');
        analyzeButton.className = 'dream-action-btn analyze-btn';
        analyzeButton.innerHTML = '<i class="fas fa-brain"></i> Analyze Dream';
        actionsSection.appendChild(analyzeButton);
        
        // Add event listeners
        
        // Close button
        closeButton.addEventListener('click', () => {
            document.body.removeChild(detailsContainer);
        });
        
        // Edit button
        editButton.addEventListener('click', () => {
            document.body.removeChild(detailsContainer);
            this.showEntryForm(entry.id);
        });
        
        // Delete button
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this dream entry?')) {
                this.deleteEntry(entry.id);
                document.body.removeChild(detailsContainer);
                this.populateListView();
            }
        });
        
        // Analyze button
        analyzeButton.addEventListener('click', async () => {
            analyzeButton.textContent = 'Analyzing...';
            analyzeButton.disabled = true;
            
            try {
                // Analyze dream
                const analysis = await this.analyzeDream(entry.dreamContent);
                
                // Show analysis results
                this.showAnalysisResults(analysis, detailsContainer);
                
                // Reset button
                analyzeButton.innerHTML = '<i class="fas fa-brain"></i> Analyze Dream';
                analyzeButton.disabled = false;
            } catch (error) {
                console.error('Error analyzing dream:', error);
                
                // Reset button
                analyzeButton.innerHTML = '<i class="fas fa-brain"></i> Analyze Dream';
                analyzeButton.disabled = false;
                
                alert('Failed to analyze dream. Please try again.');
            }
        });
        
        // Add to document
        document.body.appendChild(detailsContainer);
    }

    /**
     * Populate calendar view
     */
    populateCalendarView() {
        // To be implemented
    }

    /**
     * Populate statistics view
     */
    populateStatsView() {
        // To be implemented
    }

    /**
     * Add CSS styles
     */
    addStyles() {
        const styleId = 'dream-journal-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .dream-journal-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                width: 100%;
                max-width: 100%;
            }
            
            .dream-journal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .dream-journal-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .dream-journal-buttons {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .dream-journal-add-button {
                padding: 0.5rem 1rem;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .dream-journal-add-button:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .dream-view-toggle-container {
                display: flex;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                overflow: hidden;
            }
            
            .dream-view-toggle {
                padding: 0.5rem;
                background-color: var(--bg-primary, #0d1117);
                border: none;
                color: var(--text-secondary, #8b949e);
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
                min-width: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .dream-view-toggle:not(:last-child) {
                border-right: 1px solid var(--border-color, #30363d);
            }
            
            .dream-view-toggle:hover {
                background-color: var(--bg-secondary, #161b22);
                color: var(--text-primary, #f0f6fc);
            }
            
            .dream-view-toggle.active {
                background-color: var(--accent-primary, #7c3aed);
                color: white;
            }
            
            .dream-filter-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                gap: 1rem;
            }
            
            .dream-search-container {
                position: relative;
                flex: 1;
            }
            
            .dream-search-input {
                width: 100%;
                padding: 0.5rem 0.5rem 0.5rem 2rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .dream-search-icon {
                position: absolute;
                left: 0.75rem;
                top: 50%;
                transform: translateY(-50%);
                color: var(--text-secondary, #8b949e);
                font-size: 0.875rem;
            }
            
            .dream-filter-buttons {
                display: flex;
                gap: 0.5rem;
            }
            
            .dream-filter-btn {
                padding: 0.5rem 0.75rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-secondary, #8b949e);
                font-size: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .dream-filter-btn:hover {
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .dream-filter-btn.active {
                background-color: var(--accent-primary, #7c3aed);
                border-color: var(--accent-primary, #7c3aed);
                color: white;
            }
            
            .dream-entries-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .dream-entry-item {
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                cursor: pointer;
                transition: all 0.2s;
                position: relative;
            }
            
            .dream-entry-item:hover {
                transform: translateY(-2px);
                border-color: var(--accent-secondary, #8b5cf6);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .dream-badges {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                display: flex;
                gap: 0.25rem;
            }
            
            .dream-badge {
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.625rem;
                font-weight: 500;
                text-transform: uppercase;
            }
            
            .lucid-badge {
                background-color: rgba(124, 58, 237, 0.2);
                color: #a78bfa;
            }
            
            .recurring-badge {
                background-color: rgba(59, 130, 246, 0.2);
                color: #93c5fd;
            }
            
            .dream-entry-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 0.5rem;
            }
            
            .dream-entry-title {
                font-size: 1rem;
                font-weight: 600;
                margin: 0;
                color: var(--text-primary, #f0f6fc);
            }
            
            .dream-entry-date {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .dream-entry-content {
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
                margin-bottom: 0.75rem;
                line-height: 1.5;
            }
            
            .dream-entry-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.25rem;
                margin-bottom: 0.75rem;
            }
            
            .dream-tag {
                padding: 0.25rem 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .dream-entry-actions {
                display: flex;
                justify-content: flex-end;
                gap: 0.5rem;
                margin-top: 0.5rem;
            }
            
            .dream-action-btn {
                padding: 0.25rem 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .dream-action-btn:hover {
                background-color: var(--bg-primary, #0d1117);
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .edit-btn:hover {
                color: #60a5fa;
            }
            
            .delete-btn:hover {
                color: #f87171;
            }
            
            .analyze-btn:hover {
                color: #34d399;
            }
            
            .dream-empty-state {
                padding: 3rem 1rem;
                text-align: center;
                color: var(--text-secondary, #8b949e);
            }
            
            .empty-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                color: var(--accent-primary, #7c3aed);
            }
            
            .empty-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                color: var(--text-primary, #f0f6fc);
            }
            
            .empty-message {
                margin-bottom: 1.5rem;
            }
            
            .empty-action {
                padding: 0.625rem 1.25rem;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .empty-action:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            /* Form styles */
            .dream-journal-form-container {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                padding: 1rem;
            }
            
            .dream-journal-form {
                background-color: var(--bg-primary, #0d1117);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                width: 100%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            
            .dream-form-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .dream-form-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .dream-form-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-secondary, #8b949e);
                cursor: pointer;
            }
            
            .form-group {
                margin-bottom: 1.25rem;
            }
            
            .form-group label {
                display: block;
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
                margin-bottom: 0.5rem;
            }
            
            .form-group input[type="text"],
            .form-group input[type="date"],
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 0.625rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                font-family: inherit;
            }
            
            .form-group textarea {
                resize: vertical;
                min-height: 100px;
            }
            
            .form-group select[multiple] {
                min-height: 100px;
            }
            
            .form-row {
                display: flex;
                gap: 1rem;
                margin-bottom: 1.25rem;
            }
            
            .checkbox-group {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0;
            }
            
            .checkbox-group input[type="checkbox"] {
                margin: 0;
            }
            
            .checkbox-group label {
                margin-bottom: 0;
                cursor: pointer;
            }
            
            .form-buttons {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                margin-top: 1.5rem;
            }
            
            .dream-form-cancel {
                padding: 0.625rem 1.25rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .dream-form-cancel:hover {
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .dream-form-submit {
                padding: 0.625rem 1.25rem;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .dream-form-submit:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .dream-analyze-button {
                margin-top: 0.5rem;
                padding: 0.375rem 0.75rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-secondary, #8b949e);
                font-size: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
                align-self: flex-start;
            }
            
            .dream-analyze-button:hover {
                border-color: var(--accent-secondary, #8b5cf6);
                color: var(--text-primary, #f0f6fc);
            }
            
            /* Details styles */
            .dream-details-container {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                padding: 1rem;
            }
            
            .dream-details-content {
                background-color: var(--bg-primary, #0d1117);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                width: 100%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            
            .dream-details-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .dream-details-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .dream-details-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-secondary, #8b949e);
                cursor: pointer;
            }
            
            .details-section {
                margin-bottom: 1.25rem;
            }
            
            .details-label {
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--text-secondary, #8b949e);
                margin-bottom: 0.5rem;
            }
            
            .details-value {
                font-size: 0.875rem;
                color: var(--text-primary, #f0f6fc);
                line-height: 1.5;
            }
            
            .dream-full-content {
                white-space: pre-wrap;
            }
            
            .dream-details-badges {
                display: flex;
                gap: 0.5rem;
            }
            
            .dream-details-tags,
            .dream-details-emotions {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .dream-notes {
                white-space: pre-wrap;
                background-color: var(--bg-secondary, #161b22);
                padding: 0.75rem;
                border-radius: var(--radius-sm, 0.375rem);
                border-left: 3px solid var(--accent-primary, #7c3aed);
            }
            
            .dream-details-actions {
                display: flex;
                justify-content: flex-end;
                gap: 0.5rem;
                margin-top: 1.5rem;
                border-top: 1px solid var(--border-color, #30363d);
                padding-top: 1.5rem;
            }
            
            .dream-emotion {
                padding: 0.25rem 0.5rem;
                background-color: rgba(124, 58, 237, 0.1);
                border: 1px solid rgba(124, 58, 237, 0.2);
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
                color: #a78bfa;
            }
            
            /* Analysis styles */
            .dream-analysis-results {
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                margin-top: 1.5rem;
                overflow: hidden;
            }
            
            .analysis-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
                border-bottom: 1px solid var(--border-color, #30363d);
            }
            
            .analysis-title {
                font-size: 1rem;
                font-weight: 600;
                margin: 0;
            }
            
            .analysis-close {
                background: none;
                border: none;
                font-size: 1.25rem;
                color: var(--text-secondary, #8b949e);
                cursor: pointer;
            }
            
            .analysis-content {
                padding: 1rem;
            }
            
            .analysis-section {
                margin-bottom: 1.25rem;
            }
            
            .analysis-section:last-child {
                margin-bottom: 0;
            }
            
            .analysis-section-title {
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--text-secondary, #8b949e);
                margin: 0 0 0.5rem;
            }
            
            .analysis-text {
                font-size: 0.875rem;
                color: var(--text-primary, #f0f6fc);
                line-height: 1.5;
                margin: 0;
            }
            
            .analysis-list {
                margin: 0.5rem 0;
                padding-left: 1.5rem;
                font-size: 0.875rem;
                color: var(--text-primary, #f0f6fc);
            }
            
            .analysis-list li {
                margin-bottom: 0.25rem;
            }
            
            .tags-list,
            .emotions-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-top: 0.5rem;
            }
            
            .tag-item {
                padding: 0.25rem 0.5rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .emotion-item {
                padding: 0.25rem 0.5rem;
                background-color: rgba(124, 58, 237, 0.1);
                border: 1px solid rgba(124, 58, 237, 0.2);
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.75rem;
                color: #a78bfa;
            }
            
            .error-section {
                background-color: rgba(239, 68, 68, 0.1);
                border: 1px solid rgba(239, 68, 68, 0.2);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 0.75rem;
            }
            
            .error-text {
                color: #f87171;
            }
            
            @media (max-width: 768px) {
                .dream-filter-bar {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .form-row {
                    flex-direction: column;
                    gap: 1rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DreamJournalSync };
} else {
    // Add to global scope for browser usage
    window.DreamJournalSync = DreamJournalSync;
}
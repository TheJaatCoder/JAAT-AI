/**
 * JAAT-AI Social Media Content Creation
 * Generate and schedule content for various social media platforms
 */

class SocialMediaContentCreation {
    constructor() {
        this.initialized = false;
        this.dom = {};
        this.platforms = [
            { id: 'twitter', name: 'Twitter/X', icon: 'fab fa-twitter', character_limit: 280 },
            { id: 'instagram', name: 'Instagram', icon: 'fab fa-instagram', character_limit: 2200 },
            { id: 'facebook', name: 'Facebook', icon: 'fab fa-facebook', character_limit: 63206 },
            { id: 'linkedin', name: 'LinkedIn', icon: 'fab fa-linkedin', character_limit: 3000 },
            { id: 'tiktok', name: 'TikTok', icon: 'fab fa-tiktok', character_limit: 2200 },
            { id: 'pinterest', name: 'Pinterest', icon: 'fab fa-pinterest', character_limit: 500 }
        ];
        
        this.contentTypes = [
            { id: 'promotional', name: 'Promotional', icon: 'fas fa-bullhorn' },
            { id: 'educational', name: 'Educational', icon: 'fas fa-graduation-cap' },
            { id: 'entertaining', name: 'Entertaining', icon: 'fas fa-smile' },
            { id: 'inspirational', name: 'Inspirational', icon: 'fas fa-star' },
            { id: 'question', name: 'Question/Poll', icon: 'fas fa-question-circle' },
            { id: 'user-generated', name: 'User-Generated', icon: 'fas fa-users' },
            { id: 'behind-the-scenes', name: 'Behind-the-Scenes', icon: 'fas fa-theater-masks' },
            { id: 'trending', name: 'Trending Topic', icon: 'fas fa-chart-line' }
        ];
        
        this.tones = [
            { id: 'professional', name: 'Professional', description: 'Formal and businesslike' },
            { id: 'friendly', name: 'Friendly', description: 'Warm and approachable' },
            { id: 'humorous', name: 'Humorous', description: 'Funny and entertaining' },
            { id: 'inspirational', name: 'Inspirational', description: 'Motivational and uplifting' },
            { id: 'authoritative', name: 'Authoritative', description: 'Expert and credible' },
            { id: 'casual', name: 'Casual', description: 'Relaxed and informal' }
        ];
        
        this.scheduledPosts = [];
        this.savedTemplates = [];
    }
    
    /**
     * Initialize the feature
     */
    async init() {
        if (this.initialized) return;
        
        console.log('Initializing Social Media Content Creation feature');
        
        // Create UI elements
        this.createUI();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load saved data
        this.loadSavedData();
        
        this.initialized = true;
        return this;
    }
    
    /**
     * Create UI for Social Media Content Creation
     */
    createUI() {
        // Add Social Media Content Generator panel
        this.addContentGeneratorPanel();
        
        // Add custom styles
        this.addStyles();
    }
    
    /**
     * Add content generator panel
     */
    addContentGeneratorPanel() {
        // Check if we're on a compatible page
        const contentArea = document.querySelector('main .container, #chat-section, body');
        if (!contentArea) return;
        
        const panelHTML = `
            <div id="social-media-content-creator" class="feature-panel">
                <div class="panel-header">
                    <h3><i class="fas fa-share-alt"></i> Social Media Content Generator</h3>
                    <div class="header-actions">
                        <button id="toggle-social-panel" class="btn-icon toggle-panel">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                </div>
                
                <div class="panel-content">
                    <div class="tabs">
                        <button class="tab-btn active" data-tab="generate">Generate</button>
                        <button class="tab-btn" data-tab="scheduled">Scheduled</button>
                        <button class="tab-btn" data-tab="templates">Templates</button>
                    </div>
                    
                    <div class="tab-content active" data-tab-content="generate">
                        <div class="generation-form">
                            <div class="form-group">
                                <label for="business-type">What's your business/content about?</label>
                                <input type="text" id="business-type" class="form-control" placeholder="e.g., Fitness coaching, Tech startup, Fashion blog...">
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="platform-select">Platform</label>
                                    <select id="platform-select" class="form-control">
                                        <option value="" selected disabled>Select platform</option>
                                        ${this.platforms.map(platform => 
                                            `<option value="${platform.id}">${platform.name}</option>`
                                        ).join('')}
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="content-type">Content Type</label>
                                    <select id="content-type" class="form-control">
                                        <option value="" selected disabled>Select type</option>
                                        ${this.contentTypes.map(type => 
                                            `<option value="${type.id}">${type.name}</option>`
                                        ).join('')}
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Tone</label>
                                <div class="tone-options">
                                    ${this.tones.map(tone => `
                                        <div class="tone-option" data-tone="${tone.id}">
                                            <input type="radio" id="tone-${tone.id}" name="tone" value="${tone.id}">
                                            <label for="tone-${tone.id}">
                                                <span class="tone-name">${tone.name}</span>
                                                <span class="tone-desc">${tone.description}</span>
                                            </label>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="content-keywords">Keywords (optional)</label>
                                <input type="text" id="content-keywords" class="form-control" placeholder="e.g., summer, sale, fitness tips...">
                                <small class="form-text">Separate multiple keywords with commas</small>
                            </div>
                            
                            <div class="form-actions">
                                <button id="generate-content-btn" class="btn-primary">
                                    <i class="fas fa-magic"></i> Generate Content
                                </button>
                                <button id="clear-form-btn" class="btn-secondary">
                                    <i class="fas fa-undo"></i> Clear Form
                                </button>
                            </div>
                        </div>
                        
                        <div id="generation-results" class="generation-results hidden">
                            <div class="results-header">
                                <h4>Generated Content</h4>
                                <div class="results-actions">
                                    <button id="regenerate-btn" class="btn-icon" title="Generate New Version">
                                        <i class="fas fa-sync-alt"></i>
                                    </button>
                                    <button id="copy-result-btn" class="btn-icon" title="Copy to Clipboard">
                                        <i class="fas fa-copy"></i>
                                    </button>
                                    <button id="save-template-btn" class="btn-icon" title="Save as Template">
                                        <i class="fas fa-save"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="result-preview">
                                <div class="platform-header">
                                    <i class="fab fa-twitter"></i>
                                    <span>Twitter Preview</span>
                                </div>
                                
                                <div class="post-preview">
                                    <div class="post-avatar">
                                        <img src="/assets/images/user-avatar.jpg" alt="User Avatar">
                                    </div>
                                    <div class="post-content">
                                        <div class="post-author">
                                            <span class="author-name">Your Business</span>
                                            <span class="author-handle">@yourbusiness</span>
                                        </div>
                                        <div class="post-text" id="result-text">
                                            Your generated content will appear here...
                                        </div>
                                        <div class="post-date">Just now</div>
                                    </div>
                                </div>
                                
                                <div class="character-counter">
                                    <span id="character-count">0</span>/<span id="character-limit">280</span> characters
                                </div>
                                
                                <div class="post-actions">
                                    <button id="schedule-post-btn" class="btn-primary">
                                        <i class="fas fa-calendar-alt"></i> Schedule Post
                                    </button>
                                    <button id="add-hashtags-btn" class="btn-outline">
                                        <i class="fas fa-hashtag"></i> Add Hashtags
                                    </button>
                                </div>
                            </div>
                            
                            <div class="content-variations">
                                <h5>Variations</h5>
                                <div class="variations-list" id="variations-list">
                                    <!-- Variations will be added here -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" data-tab-content="scheduled">
                        <div class="scheduled-header">
                            <h4>Scheduled Posts</h4>
                            <div class="view-options">
                                <button class="view-option active" data-view="calendar">
                                    <i class="fas fa-calendar-alt"></i>
                                </button>
                                <button class="view-option" data-view="list">
                                    <i class="fas fa-list"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="view active" id="calendar-view">
                            <div class="calendar-header">
                                <button class="btn-icon" id="prev-month">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <h5 id="calendar-month">April 2025</h5>
                                <button class="btn-icon" id="next-month">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            
                            <div class="calendar-grid">
                                <div class="calendar-days">
                                    <div>Sun</div>
                                    <div>Mon</div>
                                    <div>Tue</div>
                                    <div>Wed</div>
                                    <div>Thu</div>
                                    <div>Fri</div>
                                    <div>Sat</div>
                                </div>
                                <div class="calendar-dates" id="calendar-dates">
                                    <!-- Calendar dates will be generated here -->
                                </div>
                            </div>
                        </div>
                        
                        <div class="view" id="list-view">
                            <div class="list-filters">
                                <select id="platform-filter" class="form-control">
                                    <option value="all">All Platforms</option>
                                    ${this.platforms.map(platform => 
                                        `<option value="${platform.id}">${platform.name}</option>`
                                    ).join('')}
                                </select>
                                
                                <select id="date-filter" class="form-control">
                                    <option value="upcoming">Upcoming</option>
                                    <option value="past">Past</option>
                                    <option value="all">All</option>
                                </select>
                            </div>
                            
                            <div class="scheduled-list" id="scheduled-list">
                                <!-- Scheduled posts will be listed here -->
                                <div class="empty-state">
                                    <i class="fas fa-calendar-day"></i>
                                    <p>No scheduled posts yet</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" data-tab-content="templates">
                        <div class="templates-header">
                            <h4>Saved Templates</h4>
                            <button id="create-template-btn" class="btn-outline">
                                <i class="fas fa-plus"></i> Create New
                            </button>
                        </div>
                        
                        <div class="templates-grid" id="templates-grid">
                            <!-- Templates will be added here -->
                            <div class="empty-state">
                                <i class="fas fa-save"></i>
                                <p>No templates saved yet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after chat section or at the beginning of main content
        const targetElement = document.querySelector('#chat-section, .chat-container');
        if (targetElement) {
            targetElement.insertAdjacentHTML('afterend', panelHTML);
        } else {
            contentArea.insertAdjacentHTML('afterbegin', panelHTML);
        }
        
        // Store DOM references
        this.dom.panel = document.getElementById('social-media-content-creator');
        this.dom.toggleBtn = document.getElementById('toggle-social-panel');
        this.dom.tabButtons = this.dom.panel.querySelectorAll('.tab-btn');
        this.dom.tabContents = this.dom.panel.querySelectorAll('.tab-content');
        
        // Generation form elements
        this.dom.businessType = document.getElementById('business-type');
        this.dom.platformSelect = document.getElementById('platform-select');
        this.dom.contentType = document.getElementById('content-type');
        this.dom.toneOptions = this.dom.panel.querySelectorAll('.tone-option');
        this.dom.contentKeywords = document.getElementById('content-keywords');
        this.dom.generateBtn = document.getElementById('generate-content-btn');
        this.dom.clearFormBtn = document.getElementById('clear-form-btn');
        
        // Results elements
        this.dom.generationResults = document.getElementById('generation-results');
        this.dom.resultText = document.getElementById('result-text');
        this.dom.characterCount = document.getElementById('character-count');
        this.dom.characterLimit = document.getElementById('character-limit');
        this.dom.regenerateBtn = document.getElementById('regenerate-btn');
        this.dom.copyResultBtn = document.getElementById('copy-result-btn');
        this.dom.saveTemplateBtn = document.getElementById('save-template-btn');
        this.dom.schedulePostBtn = document.getElementById('schedule-post-btn');
        this.dom.addHashtagsBtn = document.getElementById('add-hashtags-btn');
        this.dom.variationsList = document.getElementById('variations-list');
        
        // Calendar view elements
        this.dom.calendarMonth = document.getElementById('calendar-month');
        this.dom.prevMonthBtn = document.getElementById('prev-month');
        this.dom.nextMonthBtn = document.getElementById('next-month');
        this.dom.calendarDates = document.getElementById('calendar-dates');
        
        // List view elements
        this.dom.platformFilter = document.getElementById('platform-filter');
        this.dom.dateFilter = document.getElementById('date-filter');
        this.dom.scheduledList = document.getElementById('scheduled-list');
        
        // Templates elements
        this.dom.createTemplateBtn = document.getElementById('create-template-btn');
        this.dom.templatesGrid = document.getElementById('templates-grid');
    }
    
    /**
     * Add custom styles for social media content creation
     */
    addStyles() {
        if (document.getElementById('social-media-content-styles')) return;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'social-media-content-styles';
        styleElement.textContent = `
            /* Social Media Content Generator Panel Styles */
            .feature-panel {
                margin: 1rem 0;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                background: #fff;
                overflow: hidden;
            }
            
            .panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
            }
            
            .panel-header h3 {
                margin: 0;
                font-size: 1.1rem;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .panel-content {
                padding: 1rem;
            }
            
            /* Tabs */
            .tabs {
                display: flex;
                border-bottom: 1px solid #e9ecef;
                margin-bottom: 1rem;
            }
            
            .tab-btn {
                padding: 0.5rem 1rem;
                background: none;
                border: none;
                border-bottom: 2px solid transparent;
                color: #6c757d;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s;
            }
            
            .tab-btn:hover {
                color: #495057;
            }
            
            .tab-btn.active {
                color: #0d6efd;
                border-bottom-color: #0d6efd;
            }
            
            .tab-content {
                display: none;
            }
            
            .tab-content.active {
                display: block;
            }
            
            /* Form Styles */
            .form-group {
                margin-bottom: 1rem;
            }
            
            .form-row {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .form-row .form-group {
                flex: 1;
                margin-bottom: 0;
            }
            
            label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
            }
            
            .form-control {
                width: 100%;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                line-height: 1.5;
                color: #212529;
                background-color: #fff;
                border: 1px solid #ced4da;
                border-radius: 0.25rem;
                transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            }
            
            .form-text {
                display: block;
                margin-top: 0.25rem;
                font-size: 0.875em;
                color: #6c757d;
            }
            
            /* Tone Options */
            .tone-options {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 0.5rem;
            }
            
            .tone-option {
                position: relative;
            }
            
            .tone-option input {
                position: absolute;
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .tone-option label {
                display: block;
                padding: 0.5rem;
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .tone-option input:checked + label {
                background: #e7f1ff;
                border-color: #b1d2ff;
            }
            
            .tone-name {
                display: block;
                font-weight: 600;
            }
            
            .tone-desc {
                display: block;
                font-size: 0.75rem;
                color: #6c757d;
            }
            
            .form-actions {
                display: flex;
                gap: 0.5rem;
                margin-top: 1.5rem;
            }
            
            /* Button Styles */
            .btn-primary {
                color: #fff;
                background-color: #0d6efd;
                border: 1px solid #0d6efd;
                padding: 0.375rem 0.75rem;
                border-radius: 0.25rem;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s;
            }
            
            .btn-primary:hover {
                background-color: #0b5ed7;
                border-color: #0a58ca;
            }
            
            .btn-secondary {
                color: #6c757d;
                background-color: transparent;
                border: 1px solid #6c757d;
                padding: 0.375rem 0.75rem;
                border-radius: 0.25rem;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s;
            }
            
            .btn-secondary:hover {
                color: #fff;
                background-color: #6c757d;
            }
            
            .btn-outline {
                color: #0d6efd;
                background-color: transparent;
                border: 1px solid #0d6efd;
                padding: 0.375rem 0.75rem;
                border-radius: 0.25rem;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s;
            }
            
            .btn-outline:hover {
                color: #fff;
                background-color: #0d6efd;
            }
            
            .btn-icon {
                width: 32px;
                height: 32px;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #e9ecef;
                background: transparent;
                color: #6c757d;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .btn-icon:hover {
                background: #f8f9fa;
                color: #212529;
            }
            
            /* Results Section */
            .generation-results {
                margin-top: 1.5rem;
                border-top: 1px solid #e9ecef;
                padding-top: 1.5rem;
            }
            
            .results-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .results-header h4 {
                margin: 0;
            }
            
            .results-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .result-preview {
                border: 1px solid #e9ecef;
                border-radius: 8px;
                overflow: hidden;
                margin-bottom: 1.5rem;
            }
            
            .platform-header {
                padding: 0.5rem 1rem;
                background: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: 500;
            }
            
            .post-preview {
                padding: 1rem;
                display: flex;
                gap: 0.75rem;
            }
            
            .post-avatar {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                overflow: hidden;
                flex-shrink: 0;
            }
            
            .post-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .post-content {
                flex: 1;
            }
            
            .post-author {
                margin-bottom: 0.25rem;
            }
            
            .author-name {
                font-weight: 600;
            }
            
            .author-handle {
                color: #6c757d;
                margin-left: 0.25rem;
            }
            
            .post-text {
                line-height: 1.4;
                margin-bottom: 0.5rem;
            }
            
            .post-date {
                color: #6c757d;
                font-size: 0.875rem;
            }
            
            .character-counter {
                padding: 0.5rem 1rem;
                border-top: 1px solid #e9ecef;
                color: #6c757d;
                font-size: 0.875rem;
                text-align: right;
            }
            
            .post-actions {
                padding: 1rem;
                border-top: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
            }
            
            .content-variations {
                margin-top: 1.5rem;
            }
            
            .content-variations h5 {
                margin-top: 0;
                margin-bottom: 0.5rem;
            }
            
            .variations-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1rem;
            }
            
            .variation-card {
                padding: 1rem;
                border: 1px solid #e9ecef;
                border-radius: 4px;
                background: #f8f9fa;
                position: relative;
            }
            
            .variation-text {
                margin-bottom: 1rem;
            }
            
            .variation-actions {
                display: flex;
                justify-content: flex-end;
                gap: 0.5rem;
            }
            
            /* Calendar View */
            .scheduled-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .view-options {
                display: flex;
                border: 1px solid #e9ecef;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .view-option {
                border: none;
                background: transparent;
                padding: 0.375rem 0.75rem;
                cursor: pointer;
            }
            
            .view-option.active {
                background: #e7f1ff;
                color: #0d6efd;
            }
            
            .view {
                display: none;
            }
            
            .view.active {
                display: block;
            }
            
            .calendar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .calendar-header h5 {
                margin: 0;
            }
            
            .calendar-grid {
                border: 1px solid #e9ecef;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .calendar-days {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                background: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
            }
            
            .calendar-days div {
                padding: 0.5rem;
                text-align: center;
                font-weight: 500;
                font-size: 0.875rem;
            }
            
            .calendar-dates {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-auto-rows: minmax(80px, auto);
            }
            
            .date-cell {
                border-right: 1px solid #e9ecef;
                border-bottom: 1px solid #e9ecef;
                padding: 0.5rem;
                position: relative;
            }
            
            .date-cell:nth-child(7n) {
                border-right: none;
            }
            
            .date-cell .date-number {
                font-size: 0.875rem;
                font-weight: 500;
                margin-bottom: 0.5rem;
            }
            
            .date-cell.today .date-number {
                color: #fff;
                background: #0d6efd;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .date-cell.other-month {
                opacity: 0.5;
            }
            
            .date-post {
                margin-bottom: 0.25rem;
                padding: 0.125rem 0.25rem;
                border-radius: 2px;
                font-size: 0.75rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: pointer;
            }
            
            .date-post.twitter {
                background: #e8f5fd;
                color: #1da1f2;
            }
            
            .date-post.instagram {
                background: #feedf6;
                color: #c13584;
            }
            
            .date-post.facebook {
                background: #e7f3ff;
                color: #1877f2;
            }
            
            .date-post.linkedin {
                background: #e1f0f8;
                color: #0077b5;
            }
            
            .date-post.tiktok {
                background: #f6f6f6;
                color: #000000;
            }
            
            .date-post.pinterest {
                background: #f8e0e0;
                color: #e60023;
            }
            
            /* List View */
            .list-filters {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .scheduled-list {
                border: 1px solid #e9ecef;
                border-radius: 4px;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .scheduled-item {
                padding: 1rem;
                border-bottom: 1px solid #e9ecef;
                display: flex;
                gap: 1rem;
            }
            
            .scheduled-item:last-child {
                border-bottom: none;
            }
            
            .scheduled-platform {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            
            .scheduled-platform.twitter {
                background: #e8f5fd;
                color: #1da1f2;
            }
            
            .scheduled-platform.instagram {
                background: #feedf6;
                color: #c13584;
            }
            
            .scheduled-platform.facebook {
                background: #e7f3ff;
                color: #1877f2;
            }
            
            .scheduled-platform.linkedin {
                background: #e1f0f8;
                color: #0077b5;
            }
            
            .scheduled-platform.tiktok {
                background: #f6f6f6;
                color: #000000;
            }
            
            .scheduled-platform.pinterest {
                background: #f8e0e0;
                color: #e60023;
            }
            
            .scheduled-content {
                flex: 1;
            }
            
            .scheduled-meta {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
            }
            
            .scheduled-date {
                color: #6c757d;
                font-size: 0.875rem;
            }
            
            .scheduled-actions {
                display: flex;
                gap: 0.25rem;
            }
            
            .scheduled-text {
                line-height: 1.4;
                margin-bottom: 0.5rem;
            }
            
            .scheduled-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .scheduled-status {
                font-size: 0.75rem;
                padding: 0.125rem 0.5rem;
                border-radius: 1rem;
                background: #e7f1ff;
                color: #0d6efd;
            }
            
            .scheduled-status.published {
                background: #d4edda;
                color: #28a745;
            }
            
            .scheduled-status.failed {
                background: #f8d7da;
                color: #dc3545;
            }
            
            /* Templates */
            .templates-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .templates-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .template-card {
                border: 1px solid #e9ecef;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .template-header {
                padding: 0.75rem;
                background: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .template-title {
                font-weight: 500;
                margin: 0;
            }
            
            .template-body {
                padding: 0.75rem;
                font-size: 0.875rem;
                line-height: 1.4;
                max-height: 100px;
                overflow-y: auto;
            }
            
            .template-footer {
                padding: 0.75rem;
                border-top: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .template-meta {
                font-size: 0.75rem;
                color: #6c757d;
            }
            
            .template-actions {
                display: flex;
                gap: 0.25rem;
            }
            
            /* Empty States */
            .empty-state {
                padding: 2rem;
                text-align: center;
                color: #6c757d;
            }
            
            .empty-state i {
                font-size: 2rem;
                margin-bottom: 0.5rem;
                opacity: 0.5;
            }
            
            .empty-state p {
                margin: 0;
            }
            
            /* Helper Classes */
            .hidden {
                display: none !important;
            }
            
            /* Dark Mode Support */
            .theme-dark .feature-panel,
            .dark-mode .feature-panel {
                background: #343a40;
                border-color: #495057;
            }
            
            .theme-dark .panel-header,
            .dark-mode .panel-header {
                background: #212529;
                border-color: #495057;
            }
            
            .theme-dark .tabs,
            .dark-mode .tabs {
                border-color: #495057;
            }
            
            .theme-dark .form-control,
            .dark-mode .form-control {
                background: #212529;
                border-color: #495057;
                color: #e9ecef;
            }
            
            .theme-dark .tone-option label,
            .dark-mode .tone-option label {
                background: #212529;
                border-color: #495057;
            }
            
            .theme-dark .tone-option input:checked + label,
            .dark-mode .tone-option input:checked + label {
                background: #204a73;
                border-color: #375e89;
            }
            
            .theme-dark .result-preview,
            .dark-mode .result-preview {
                border-color: #495057;
            }
            
            .theme-dark .platform-header,
            .dark-mode .platform-header {
                background: #212529;
                border-color: #495057;
            }
            
            .theme-dark .character-counter,
            .dark-mode .character-counter {
                border-color: #495057;
            }
            
            .theme-dark .post-actions,
            .dark-mode .post-actions {
                border-color: #495057;
            }
            
            .theme-dark .variation-card,
            .dark-mode .variation-card {
                background: #212529;
                border-color: #495057;
            }
            
            .theme-dark .calendar-grid,
            .dark-mode .calendar-grid {
                border-color: #495057;
            }
            
            .theme-dark .calendar-days,
            .dark-mode .calendar-days {
                background: #212529;
                border-color: #495057;
            }
            
            .theme-dark .date-cell,
            .dark-mode .date-cell {
                border-color: #495057;
            }
            
            .theme-dark .scheduled-list,
            .dark-mode .scheduled-list {
                border-color: #495057;
            }
            
            .theme-dark .scheduled-item,
            .dark-mode .scheduled-item {
                border-color: #495057;
            }
            
            .theme-dark .template-card,
            .dark-mode .template-card {
                border-color: #495057;
            }
            
            .theme-dark .template-header,
            .dark-mode .template-header {
                background: #212529;
                border-color: #495057;
            }
            
            .theme-dark .template-footer,
            .dark-mode .template-footer {
                border-color: #495057;
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        if (!this.dom.panel) return;
        
        // Toggle panel visibility
        if (this.dom.toggleBtn) {
            this.dom.toggleBtn.addEventListener('click', () => {
                const panelContent = this.dom.panel.querySelector('.panel-content');
                if (panelContent) {
                    panelContent.classList.toggle('hidden');
                    this.dom.toggleBtn.querySelector('i').classList.toggle('fa-chevron-down');
                    this.dom.toggleBtn.querySelector('i').classList.toggle('fa-chevron-up');
                }
            });
        }
        
        // Tab switching
        this.dom.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                
                // Update active tab button
                this.dom.tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active tab content
                this.dom.tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.dataset.tabContent === tabName) {
                        content.classList.add('active');
                    }
                });
                
                // Perform any additional actions based on tab
                if (tabName === 'scheduled') {
                    this.renderCalendar();
                } else if (tabName === 'templates') {
                    this.renderTemplates();
                }
            });
        });
        
        // Tone selection
        this.dom.toneOptions.forEach(option => {
            const radioInput = option.querySelector('input[type="radio"]');
            
            option.addEventListener('click', () => {
                radioInput.checked = true;
            });
        });
        
        // Generate content button
        if (this.dom.generateBtn) {
            this.dom.generateBtn.addEventListener('click', () => {
                this.generateContent();
            });
        }
        
        // Clear form button
        if (this.dom.clearFormBtn) {
            this.dom.clearFormBtn.addEventListener('click', () => {
                this.clearForm();
            });
        }
        
        // Platform selection change
        if (this.dom.platformSelect) {
            this.dom.platformSelect.addEventListener('change', (e) => {
                const platformId = e.target.value;
                const platform = this.platforms.find(p => p.id === platformId);
                
                if (platform) {
                    // Update platform header
                    const platformHeader = this.dom.panel.querySelector('.platform-header');
                    if (platformHeader) {
                        platformHeader.innerHTML = `<i class="${platform.icon}"></i><span>${platform.name} Preview</span>`;
                    }
                    
                    // Update character limit
                    if (this.dom.characterLimit) {
                        this.dom.characterLimit.textContent = platform.character_limit;
                    }
                }
            });
        }
        
        // Copy result button
        if (this.dom.copyResultBtn) {
            this.dom.copyResultBtn.addEventListener('click', () => {
                const resultText = this.dom.resultText.textContent.trim();
                if (resultText && resultText !== 'Your generated content will appear here...') {
                    navigator.clipboard.writeText(resultText)
                        .then(() => {
                            // Show success feedback
                            const originalIcon = this.dom.copyResultBtn.innerHTML;
                            this.dom.copyResultBtn.innerHTML = '<i class="fas fa-check"></i>';
                            setTimeout(() => {
                                this.dom.copyResultBtn.innerHTML = originalIcon;
                            }, 1500);
                        })
                        .catch(err => {
                            console.error('Failed to copy content: ', err);
                        });
                }
            });
        }
        
        // Schedule post button
        if (this.dom.schedulePostBtn) {
            this.dom.schedulePostBtn.addEventListener('click', () => {
                this.schedulePost();
            });
        }
        
        // Calendar navigation
        if (this.dom.prevMonthBtn) {
            this.dom.prevMonthBtn.addEventListener('click', () => {
                this.navigateCalendar(-1);
            });
        }
        
        if (this.dom.nextMonthBtn) {
            this.dom.nextMonthBtn.addEventListener('click', () => {
                this.navigateCalendar(1);
            });
        }
    }
    
    /**
     * Generate social media content
     */
    generateContent() {
        // Validate form
        const businessType = this.dom.businessType.value.trim();
        const platform = this.dom.platformSelect.value;
        const contentType = this.dom.contentType.value;
        const toneElement = document.querySelector('input[name="tone"]:checked');
        const tone = toneElement ? toneElement.value : null;
        const keywords = this.dom.contentKeywords.value.trim();
        
        if (!businessType || !platform || !contentType || !tone) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Show loading state
        this.dom.resultText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating content...';
        this.dom.generationResults.classList.remove('hidden');
        
        // In a real implementation, this would call an API for content generation
        // For demo purposes, we'll simulate a delay and use predefined templates
        setTimeout(() => {
            const generatedContent = this.generateSampleContent(businessType, platform, contentType, tone, keywords);
            this.dom.resultText.textContent = generatedContent;
            
            // Update character count
            if (this.dom.characterCount) {
                this.dom.characterCount.textContent = generatedContent.length;
            }
            
            // Generate variations
            this.generateContentVariations(businessType, platform, contentType, tone, keywords);
        }, 1500);
    }
    
    /**
     * Generate sample content for demo purposes
     * @param {string} businessType - Type of business/content
     * @param {string} platform - Social media platform
     * @param {string} contentType - Type of content
     * @param {string} tone - Tone of content
     * @param {string} keywords - Optional keywords
     * @returns {string} - Generated content
     */
    generateSampleContent(businessType, platform, contentType, tone, keywords) {
        // Templates based on content type
        const templates = {
            promotional: [
                "🔥 Special offer for our {business} community! Get 20% off on all products this week. Use code: SPECIAL20 #discount #{keywords}",
                "Introducing our newest {business} service! 🚀 Check out how it can help you achieve your goals. #new #launch #{keywords}",
                "Limited time offer! 🎉 Try our premium {business} package for free for 30 days. Link in bio. #free #trial #{keywords}",
                "Flash sale alert! ⚡ Next 24 hours only - All {business} products at incredible prices. Don't miss out! #sale #{keywords}"
            ],
            educational: [
                "Did you know? 🤔 {educational_fact} Learn more about {business} in our latest blog post. #didyouknow #facts #{keywords}",
                "3 tips for better {business} results: 1️⃣ {tip1} 2️⃣ {tip2} 3️⃣ {tip3} #tips #learn #{keywords}",
                "The ultimate guide to {business} is now available! 📚 Swipe up to learn everything you need to know. #guide #{keywords}",
                "Common mistake in {business}: {mistake}. Here's how to avoid it and what to do instead. #tips #learning #{keywords}"
            ],
            entertaining: [
                "That moment when {funny_situation} 😂 #relatable #{business} #{keywords}",
                "Caption this! 👇 What's happening in this {business} scenario? #caption #fun #{keywords}",
                "Behind the scenes at our {business} studio today! 🎬 Swipe to see the bloopers! #behindthescenes #{keywords}",
                "Friday mood at the {business} office! 🕺💃 #weekendvibes #officefun #{keywords}"
            ],
            inspirational: [
                "\"Success in {business} is not final; failure is not fatal: It is the courage to continue that counts.\" #motivation #{keywords}",
                "Transforming challenges into opportunities - how our {business} client achieved their dreams despite setbacks. #inspiration #{keywords}",
                "Your {business} journey matters. Every step takes you closer to your goals. Keep going! ✨ #motivation #{keywords}",
                "Believe you can and you're halfway there. Our {business} community is here to support your goals! #believe #{keywords}"
            ],
            question: [
                "What's your biggest challenge when it comes to {business}? Share below! 👇 #question #community #{keywords}",
                "Poll time! What's your favorite {business} tool? A) {option1} B) {option2} C) {option3} D) Other (comment) #poll #{keywords}",
                "True or False? {business_statement} 🤔 Let us know in the comments! #truorfalse #quiz #{keywords}",
                "If you could change one thing about {business}, what would it be? #feedback #question #{keywords}"
            ]
        };
        
        // Educational facts for educational content
        const educationalFacts = [
            `Over 80% of successful ${businessType} strategies include content marketing`,
            `The average ROI for email marketing in ${businessType} is 4200%`,
            `${businessType} professionals who use analytics are 5x more likely to make faster decisions`,
            `Studies show that consistent branding in ${businessType} can increase revenue by up to 23%`
        ];
        
        // Tips for educational content
        const tips = [
            `Start with clear goals`,
            `Learn from analytics`,
            `Focus on customer experience`,
            `Stay consistent`,
            `Leverage automation tools`,
            `Prioritize quality over quantity`,
            `Test and optimize regularly`
        ];
        
        // Common mistakes
        const mistakes = [
            `Ignoring customer feedback`,
            `Neglecting to track key metrics`,
            `Using too many platforms without a strategy`,
            `Focusing on features instead of benefits`,
            `Inconsistent branding across channels`
        ];
        
        // Funny situations for entertaining content
        const funnySituations = [
            `your carefully planned ${businessType} presentation turns into an impromptu comedy show`,
            `you realize you've been muted during your entire ${businessType} webinar`,
            `your cat decides to become co-presenter during your ${businessType} livestream`,
            `you accidentally use a meme template for your formal ${businessType} proposal`
        ];
        
        // Business statement for questions
        const businessStatements = [
            `The best time to post about ${businessType} is early morning`,
            `Email marketing is more effective than social media for ${businessType}`,
            `You need at least 5 years of experience to succeed in ${businessType}`,
            `AI tools will replace human creativity in ${businessType} within 5 years`
        ];
        
        // Options for polls
        const pollOptions = {
            option1: ['Canva', 'Google Analytics', 'Asana', 'HubSpot', 'Trello'],
            option2: ['Adobe Creative Suite', 'Slack', 'Mailchimp', 'Zoom', 'Monday.com'],
            option3: ['Social media schedulers', 'CRM systems', 'Content management systems', 'SEO tools', 'Email marketing platforms']
        };
        
        // Get random template based on content type
        const contentTemplates = templates[contentType] || templates.promotional;
        let template = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
        
        // Replace template placeholders
        template = template.replace(/{business}/g, businessType);
        template = template.replace(/{keywords}/g, keywords ? keywords.split(',')[0].trim() : businessType);
        
        // Replace specific placeholders based on content type
        if (contentType === 'educational') {
            const randomFact = educationalFacts[Math.floor(Math.random() * educationalFacts.length)];
            const randomTips = [...tips].sort(() => 0.5 - Math.random()).slice(0, 3);
            
            template = template.replace(/{educational_fact}/g, randomFact);
            template = template.replace(/{tip1}/g, randomTips[0]);
            template = template.replace(/{tip2}/g, randomTips[1]);
            template = template.replace(/{tip3}/g, randomTips[2]);
            template = template.replace(/{mistake}/g, mistakes[Math.floor(Math.random() * mistakes.length)]);
        } else if (contentType === 'entertaining') {
            template = template.replace(/{funny_situation}/g, funnySituations[Math.floor(Math.random() * funnySituations.length)]);
        } else if (contentType === 'question') {
            template = template.replace(/{business_statement}/g, businessStatements[Math.floor(Math.random() * businessStatements.length)]);
            template = template.replace(/{option1}/g, pollOptions.option1[Math.floor(Math.random() * pollOptions.option1.length)]);
            template = template.replace(/{option2}/g, pollOptions.option2[Math.floor(Math.random() * pollOptions.option2.length)]);
            template = template.replace(/{option3}/g, pollOptions.option3[Math.floor(Math.random() * pollOptions.option3.length)]);
        }
        
        // Adjust based on platform character limits
        const platformObj = this.platforms.find(p => p.id === platform);
        if (platformObj && template.length > platformObj.character_limit) {
            template = template.substring(0, platformObj.character_limit - 3) + '...';
        }
        
        return template;
    }
    
    /**
     * Generate content variations
     * @param {string} businessType - Type of business/content
     * @param {string} platform - Social media platform
     * @param {string} contentType - Type of content
     * @param {string} tone - Tone of content
     * @param {string} keywords - Optional keywords
     */
    generateContentVariations(businessType, platform, contentType, tone, keywords) {
        // In a real implementation, this would call an API
        // For demo, generate 3 variations
        const variations = [];
        for (let i = 0; i < 3; i++) {
            variations.push(this.generateSampleContent(businessType, platform, contentType, tone, keywords));
        }
        
        // Clear existing variations
        this.dom.variationsList.innerHTML = '';
        
        // Add variations to the list
        variations.forEach((variation, index) => {
            const variationCard = document.createElement('div');
            variationCard.className = 'variation-card';
            variationCard.innerHTML = `
                <div class="variation-text">${variation}</div>
                <div class="variation-actions">
                    <button class="btn-icon use-variation" data-index="${index}" title="Use This">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-icon copy-variation" data-index="${index}" title="Copy">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            `;
            this.dom.variationsList.appendChild(variationCard);
            
            // Add event listeners to buttons
            const useBtn = variationCard.querySelector('.use-variation');
            const copyBtn = variationCard.querySelector('.copy-variation');
            
            useBtn.addEventListener('click', () => {
                this.dom.resultText.textContent = variation;
                
                // Update character count
                if (this.dom.characterCount) {
                    this.dom.characterCount.textContent = variation.length;
                }
            });
            
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(variation)
                    .then(() => {
                        // Show success feedback
                        const originalIcon = copyBtn.innerHTML;
                        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                        setTimeout(() => {
                            copyBtn.innerHTML = originalIcon;
                        }, 1500);
                    })
                    .catch(err => {
                        console.error('Failed to copy variation: ', err);
                    });
            });
        });
    }
    
    /**
     * Clear the content generation form
     */
    clearForm() {
        this.dom.businessType.value = '';
        this.dom.platformSelect.value = '';
        this.dom.contentType.value = '';
        document.querySelectorAll('input[name="tone"]').forEach(input => {
            input.checked = false;
        });
        this.dom.contentKeywords.value = '';
        
        // Hide results
        this.dom.generationResults.classList.add('hidden');
    }
    
    /**
     * Schedule a post
     */
    schedulePost() {
        // Get content
        const content = this.dom.resultText.textContent.trim();
        if (!content || content === 'Your generated content will appear here...') {
            alert('Please generate content first');
            return;
        }
        
        // Get platform
        const platformId = this.dom.platformSelect.value;
        const platform = this.platforms.find(p => p.id === platformId);
        if (!platform) {
            alert('Please select a platform');
            return;
        }
        
        // Create modal for scheduling
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-header">
                    <h4>Schedule Post</h4>
                    <button class="btn-icon close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="schedule-date">Date</label>
                        <input type="date" id="schedule-date" class="form-control" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label for="schedule-time">Time</label>
                        <input type="time" id="schedule-time" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Platform</label>
                        <div class="platform-preview">
                            <i class="${platform.icon}"></i>
                            <span>${platform.name}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="schedule-content">Content</label>
                        <textarea id="schedule-content" class="form-control" rows="4">${content}</textarea>
                        <div class="character-counter">
                            <span>${content.length}</span>/${platform.character_limit} characters
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="confirm-schedule" class="btn-primary">Schedule</button>
                    <button class="btn-secondary close-modal">Cancel</button>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            
            .modal-dialog {
                background: white;
                border-radius: 8px;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            
            .modal-header {
                padding: 1rem;
                border-bottom: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h4 {
                margin: 0;
            }
            
            .modal-body {
                padding: 1rem;
            }
            
            .modal-footer {
                padding: 1rem;
                border-top: 1px solid #e9ecef;
                display: flex;
                justify-content: flex-end;
                gap: 0.5rem;
            }
            
            .platform-preview {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem;
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 4px;
            }
            
            .theme-dark .modal-dialog,
            .dark-mode .modal-dialog {
                background: #343a40;
                color: #e9ecef;
            }
            
            .theme-dark .modal-header,
            .theme-dark .modal-footer,
            .dark-mode .modal-header,
            .dark-mode .modal-footer {
                border-color: #495057;
            }
            
            .theme-dark .platform-preview,
            .dark-mode .platform-preview {
                background: #212529;
                border-color: #495057;
            }
        `;
        
        // Add modal to the page
        document.head.appendChild(modalStyles);
        document.body.appendChild(modal);
        
        // Set default date and time (tomorrow at noon)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(12, 0, 0, 0);
        
        document.getElementById('schedule-date').value = tomorrow.toISOString().split('T')[0];
        document.getElementById('schedule-time').value = '12:00';
        
        // Close modal function
        const closeModal = () => {
            document.body.removeChild(modal);
            document.head.removeChild(modalStyles);
        };
        
        // Add event listeners
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        
        // Confirm schedule
        document.getElementById('confirm-schedule').addEventListener('click', () => {
            const scheduleDate = document.getElementById('schedule-date').value;
            const scheduleTime = document.getElementById('schedule-time').value;
            const scheduleContent = document.getElementById('schedule-content').value;
            
            if (!scheduleDate || !scheduleTime || !scheduleContent) {
                alert('Please fill in all fields');
                return;
            }
            
            // Create scheduled post object
            const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
            
            const scheduledPost = {
                id: Date.now().toString(),
                content: scheduleContent,
                platform: platformObj.id,
                platformName: platformObj.name,
                platformIcon: platformObj.icon,
                scheduledAt: scheduledDateTime.toISOString(),
                status: 'scheduled',
                createdAt: new Date().toISOString()
            };
            
            // Add to scheduled posts
            this.scheduledPosts.push(scheduledPost);
            
            // Save to local storage
            this.saveScheduledPosts();
            
            // Close modal
            closeModal();
            
            // Show success message
            alert(`Post scheduled for ${scheduledDateTime.toLocaleString()}`);
            
            // Switch to scheduled tab
            this.dom.tabButtons.forEach(btn => {
                if (btn.dataset.tab === 'scheduled') {
                    btn.click();
                }
            });
        });
    }
    
    /**
     * Render calendar with scheduled posts
     */
    renderCalendar() {
        if (!this.dom.calendarDates) return;
        
        // Get current date for navigation
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        // Get current view month and year (from data attributes or use current)
        const viewMonth = parseInt(this.dom.calendarDates.dataset.month || currentMonth);
        const viewYear = parseInt(this.dom.calendarDates.dataset.year || currentYear);
        
        // Set calendar title
        this.dom.calendarMonth.textContent = new Date(viewYear, viewMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        // Store current view
        this.dom.calendarDates.dataset.month = viewMonth;
        this.dom.calendarDates.dataset.year = viewYear;
        
        // Calculate first day of month and total days
        const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sunday
        const lastDate = new Date(viewYear, viewMonth + 1, 0).getDate();
        
        // Calculate days from previous month
        const prevMonthLastDate = new Date(viewYear, viewMonth, 0).getDate();
        
        // Create calendar
        let dateHTML = '';
        
        // Add days from previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            const prevDate = prevMonthLastDate - i;
            dateHTML += `<div class="date-cell other-month"><div class="date-number">${prevDate}</div></div>`;
        }
        
        // Add days for current month
        for (let i = 1; i <= lastDate; i++) {
            const date = new Date(viewYear, viewMonth, i);
            const isToday = (i === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear());
            
            // Get scheduled posts for this date
            const postsOnDate = this.getScheduledPostsForDate(date);
            
            dateHTML += `
                <div class="date-cell ${isToday ? 'today' : ''}">
                    <div class="date-number">${i}</div>
                    <div class="date-posts">
                        ${postsOnDate.map(post => `
                            <div class="date-post ${post.platform}" data-id="${post.id}">
                                <i class="${post.platformIcon}"></i> ${this.truncateText(post.content, 20)}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // Fill remaining cells with next month
        const totalCells = 42; // 6 rows of 7 days
        const remainingCells = totalCells - (firstDay + lastDate);
        
        for (let i = 1; i <= remainingCells; i++) {
            dateHTML += `<div class="date-cell other-month"><div class="date-number">${i}</div></div>`;
        }
        
        // Update calendar
        this.dom.calendarDates.innerHTML = dateHTML;
        
        // Add click events to posts
        document.querySelectorAll('.date-post').forEach(post => {
            post.addEventListener('click', (e) => {
                const postId = e.currentTarget.dataset.id;
                this.showPostDetails(postId);
            });
        });
    }
    
    /**
     * Navigate calendar
     * @param {number} direction - Direction to navigate (-1 = previous, 1 = next)
     */
    navigateCalendar(direction) {
        if (!this.dom.calendarDates) return;
        
        // Get current view month and year
        let viewMonth = parseInt(this.dom.calendarDates.dataset.month || 0);
        let viewYear = parseInt(this.dom.calendarDates.dataset.year || new Date().getFullYear());
        
        // Update month and year
        viewMonth += direction;
        
        // Handle year change
        if (viewMonth < 0) {
            viewMonth = 11;
            viewYear--;
        } else if (viewMonth > 11) {
            viewMonth = 0;
            viewYear++;
        }
        
        // Update data attributes
        this.dom.calendarDates.dataset.month = viewMonth;
        this.dom.calendarDates.dataset.year = viewYear;
        
        // Re-render calendar
        this.renderCalendar();
    }
    
    /**
     * Get scheduled posts for a specific date
     * @param {Date} date - The date to get posts for
     * @returns {Array} - Posts scheduled for that date
     */
    getScheduledPostsForDate(date) {
        const dateString = date.toISOString().split('T')[0];
        
        return this.scheduledPosts.filter(post => {
            const postDate = new Date(post.scheduledAt);
            return postDate.toISOString().split('T')[0] === dateString;
        });
    }
    
    /**
     * Show post details
     * @param {string} postId - ID of the post to show
     */
    showPostDetails(postId) {
        const post = this.scheduledPosts.find(p => p.id === postId);
        if (!post) return;
        
        // Create modal
        // (Implementation left as an exercise)
        alert(`Post scheduled for ${new Date(post.scheduledAt).toLocaleString()}\n\nContent: ${post.content}`);
    }
    
    /**
     * Load saved data from local storage
     */
    loadSavedData() {
        try {
            // Load scheduled posts
            const savedPosts = localStorage.getItem('jaat_scheduled_posts');
            if (savedPosts) {
                this.scheduledPosts = JSON.parse(savedPosts);
            }
            
            // Load templates
            const savedTemplates = localStorage.getItem('jaat_post_templates');
            if (savedTemplates) {
                this.savedTemplates = JSON.parse(savedTemplates);
            }
        } catch (e) {
            console.error('Error loading saved data: ', e);
        }
    }
    
    /**
     * Save scheduled posts to local storage
     */
    saveScheduledPosts() {
        try {
            localStorage.setItem('jaat_scheduled_posts', JSON.stringify(this.scheduledPosts));
        } catch (e) {
            console.error('Error saving scheduled posts: ', e);
        }
    }
    
    /**
     * Save templates to local storage
     */
    saveTemplates() {
        try {
            localStorage.setItem('jaat_post_templates', JSON.stringify(this.savedTemplates));
        } catch (e) {
            console.error('Error saving templates: ', e);
        }
    }
    
    /**
     * Render templates list
     */
    renderTemplates() {
        if (!this.dom.templatesGrid) return;
        
        if (this.savedTemplates.length === 0) {
            this.dom.templatesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-save"></i>
                    <p>No templates saved yet</p>
                </div>
            `;
            return;
        }
        
        // Clear grid
        this.dom.templatesGrid.innerHTML = '';
        
        // Add templates
        this.savedTemplates.forEach(template => {
            const templateCard = document.createElement('div');
            templateCard.className = 'template-card';
            templateCard.innerHTML = `
                <div class="template-header">
                    <h5 class="template-title">${template.name}</h5>
                    <button class="btn-icon delete-template" data-id="${template.id}" title="Delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <div class="template-body">
                    ${template.content}
                </div>
                <div class="template-footer">
                    <div class="template-meta">
                        ${template.platformName} · ${template.contentType}
                    </div>
                    <button class="btn-icon use-template" data-id="${template.id}" title="Use">
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            `;
            
            this.dom.templatesGrid.appendChild(templateCard);
        });
        
        // Add event listeners
        document.querySelectorAll('.delete-template').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const templateId = e.currentTarget.dataset.id;
                this.deleteTemplate(templateId);
            });
        });
        
        document.querySelectorAll('.use-template').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const templateId = e.currentTarget.dataset.id;
                this.useTemplate(templateId);
            });
        });
    }
    
    /**
     * Truncate text to a specific length
     * @param {string} text - Text to truncate
     * @param {number} length - Maximum length
     * @returns {string} - Truncated text
     */
    truncateText(text, length) {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    }
}

// Initialize and export
const socialMediaContentCreation = new SocialMediaContentCreation();
export default socialMediaContentCreation;

// If not importing, initialize on load
if (typeof window !== 'undefined' && !window.socialMediaContentCreation) {
    window.socialMediaContentCreation = socialMediaContentCreation;
    document.addEventListener('DOMContentLoaded', () => socialMediaContentCreation.init());
}
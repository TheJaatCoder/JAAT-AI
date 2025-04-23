/**
 * JAAT-AI Chatbot Logger
 * Log and analyze chat interactions for insights and debugging
 */

class ChatbotLogger {
    constructor() {
        this.logs = [];
        this.currentSession = null;
        this.isLogging = false;
        this.maxStoredLogs = 1000; // Maximum number of logs to store
        this.storageKey = 'jaat-chat-logs';
        this.sessionStorageKey = 'jaat-chat-session';
        
        // Log level configuration
        this.logLevels = {
            DEBUG: 0,
            INFO: 1,
            WARNING: 2,
            ERROR: 3
        };
        
        this.currentLogLevel = this.logLevels.INFO;
        
        // Stats tracking
        this.stats = {
            totalMessages: 0,
            userMessages: 0,
            aiMessages: 0,
            errorCount: 0,
            averageResponseTime: 0,
            longestResponse: {
                text: '',
                length: 0
            },
            shortestResponse: {
                text: '',
                length: Infinity
            },
            startTime: null,
            lastInteractionTime: null,
            messagesByMode: {},
            sessionCount: 0
        };
    }

    /**
     * Initialize the logger
     * @param {Object} options - Configuration options
     * @returns {ChatbotLogger} This instance
     */
    init(options = {}) {
        // Apply options
        if (options.maxStoredLogs) this.maxStoredLogs = options.maxStoredLogs;
        if (options.storageKey) this.storageKey = options.storageKey;
        if (options.sessionStorageKey) this.sessionStorageKey = options.sessionStorageKey;
        if (options.logLevel && this.logLevels[options.logLevel] !== undefined) {
            this.currentLogLevel = this.logLevels[options.logLevel];
        }
        
        // Load logs from storage
        this.loadLogs();
        
        // Start a new session if none exists
        this.startSession();
        
        // Enable logging
        this.isLogging = true;
        
        this.log('ChatbotLogger initialized', 'DEBUG');
        
        return this;
    }

    /**
     * Start a new chat session
     * @param {Object} sessionInfo - Additional session information
     * @returns {string} Session ID
     */
    startSession(sessionInfo = {}) {
        // Generate session ID
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        
        // Create session object
        this.currentSession = {
            id: sessionId,
            startTime: new Date().toISOString(),
            endTime: null,
            messageCount: 0,
            userMessageCount: 0,
            aiMessageCount: 0,
            errors: 0,
            aiModes: {},
            ...sessionInfo
        };
        
        // Update stats
        this.stats.sessionCount++;
        this.stats.startTime = this.stats.startTime || new Date().toISOString();
        
        // Save session to storage
        try {
            localStorage.setItem(this.sessionStorageKey, JSON.stringify(this.currentSession));
        } catch (error) {
            console.warn('Failed to save session to localStorage:', error);
        }
        
        this.log(`Session started: ${sessionId}`, 'INFO');
        
        return sessionId;
    }

    /**
     * End the current session
     * @returns {Object|null} Session data or null if no session
     */
    endSession() {
        if (!this.currentSession) {
            return null;
        }
        
        // Update session end time
        this.currentSession.endTime = new Date().toISOString();
        
        // Save session data
        const sessionData = { ...this.currentSession };
        
        // Log session end
        this.log(`Session ended: ${this.currentSession.id}`, 'INFO', {
            sessionData
        });
        
        // Clear current session
        this.currentSession = null;
        
        // Remove from localStorage
        try {
            localStorage.removeItem(this.sessionStorageKey);
        } catch (error) {
            console.warn('Failed to remove session from localStorage:', error);
        }
        
        return sessionData;
    }

    /**
     * Log a message
     * @param {string} message - Log message
     * @param {string} level - Log level (DEBUG, INFO, WARNING, ERROR)
     * @param {Object} data - Additional log data
     * @returns {Object} Log entry
     */
    log(message, level = 'INFO', data = {}) {
        if (!this.isLogging) {
            return null;
        }
        
        // Normalize level
        const normalizedLevel = level.toUpperCase();
        
        // Check if log level is sufficient
        if (this.logLevels[normalizedLevel] < this.currentLogLevel) {
            return null;
        }
        
        // Create log entry
        const logEntry = {
            timestamp: new Date().toISOString(),
            message,
            level: normalizedLevel,
            data,
            sessionId: this.currentSession ? this.currentSession.id : null
        };
        
        // Add to logs
        this.logs.push(logEntry);
        
        // Trim logs if exceeding maximum
        if (this.logs.length > this.maxStoredLogs) {
            this.logs = this.logs.slice(-this.maxStoredLogs);
        }
        
        // Save logs
        this.saveLogs();
        
        // Output to console if ERROR or WARNING
        if (normalizedLevel === 'ERROR') {
            console.error(`[JAAT-LOG] ${message}`, data);
        } else if (normalizedLevel === 'WARNING') {
            console.warn(`[JAAT-LOG] ${message}`, data);
        } else if (normalizedLevel === 'DEBUG') {
            console.debug(`[JAAT-LOG] ${message}`, data);
        }
        
        return logEntry;
    }

    /**
     * Log a user message
     * @param {string} message - User message text
     * @param {Object} metadata - Additional message metadata
     * @returns {Object} Log entry
     */
    logUserMessage(message, metadata = {}) {
        // Update session data
        if (this.currentSession) {
            this.currentSession.messageCount++;
            this.currentSession.userMessageCount++;
            this.currentSession.lastUserMessage = message;
        }
        
        // Update stats
        this.stats.totalMessages++;
        this.stats.userMessages++;
        this.stats.lastInteractionTime = new Date().toISOString();
        
        // Track AI mode if provided
        if (metadata.aiMode) {
            this.trackAiMode(metadata.aiMode);
        }
        
        return this.log('User message sent', 'INFO', {
            type: 'user_message',
            message,
            timestamp: new Date().toISOString(),
            ...metadata
        });
    }

    /**
     * Log an AI response
     * @param {string} message - AI response text
     * @param {Object} metadata - Additional message metadata
     * @returns {Object} Log entry
     */
    logAiResponse(message, metadata = {}) {
        // Calculate response time if requestTime is provided
        let responseTime = null;
        if (metadata.requestTime) {
            responseTime = new Date().getTime() - new Date(metadata.requestTime).getTime();
            
            // Update average response time
            if (this.stats.averageResponseTime === 0) {
                this.stats.averageResponseTime = responseTime;
            } else {
                this.stats.averageResponseTime = (this.stats.averageResponseTime + responseTime) / 2;
            }
        }
        
        // Track longest/shortest responses
        const messageLength = message.length;
        if (messageLength > this.stats.longestResponse.length) {
            this.stats.longestResponse = {
                text: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
                length: messageLength
            };
        }
        
        if (messageLength < this.stats.shortestResponse.length) {
            this.stats.shortestResponse = {
                text: message,
                length: messageLength
            };
        }
        
        // Update session data
        if (this.currentSession) {
            this.currentSession.messageCount++;
            this.currentSession.aiMessageCount++;
            this.currentSession.lastAiResponse = message.substring(0, 100) + (message.length > 100 ? '...' : '');
        }
        
        // Update stats
        this.stats.totalMessages++;
        this.stats.aiMessages++;
        this.stats.lastInteractionTime = new Date().toISOString();
        
        // Track AI mode if provided
        if (metadata.aiMode) {
            this.trackAiMode(metadata.aiMode);
        }
        
        return this.log('AI response received', 'INFO', {
            type: 'ai_response',
            message,
            responseTime,
            timestamp: new Date().toISOString(),
            ...metadata
        });
    }

    /**
     * Log an error
     * @param {string} message - Error message
     * @param {Error|Object} error - Error object or data
     * @param {Object} metadata - Additional metadata
     * @returns {Object} Log entry
     */
    logError(message, error, metadata = {}) {
        // Extract error details
        let errorData = {};
        
        if (error instanceof Error) {
            errorData = {
                name: error.name,
                message: error.message,
                stack: error.stack
            };
        } else if (typeof error === 'object') {
            errorData = error;
        }
        
        // Update session data
        if (this.currentSession) {
            this.currentSession.errors++;
        }
        
        // Update stats
        this.stats.errorCount++;
        
        return this.log(message, 'ERROR', {
            type: 'error',
            error: errorData,
            timestamp: new Date().toISOString(),
            ...metadata
        });
    }

    /**
     * Track AI mode usage
     * @param {string} mode - AI mode name
     */
    trackAiMode(mode) {
        // Update session data
        if (this.currentSession) {
            if (!this.currentSession.aiModes[mode]) {
                this.currentSession.aiModes[mode] = 0;
            }
            this.currentSession.aiModes[mode]++;
        }
        
        // Update stats
        if (!this.stats.messagesByMode[mode]) {
            this.stats.messagesByMode[mode] = 0;
        }
        this.stats.messagesByMode[mode]++;
    }

    /**
     * Save logs to localStorage
     */
    saveLogs() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.logs));
        } catch (error) {
            console.warn('Failed to save logs to localStorage:', error);
            
            // If localStorage is full, trim logs further
            if (error instanceof DOMException && (
                error.name === 'QuotaExceededError' ||
                error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
            )) {
                // Cut logs in half and try again
                this.logs = this.logs.slice(-Math.floor(this.maxStoredLogs / 2));
                try {
                    localStorage.setItem(this.storageKey, JSON.stringify(this.logs));
                } catch (innerError) {
                    console.error('Still failed to save logs after trimming:', innerError);
                }
            }
        }
    }

    /**
     * Load logs from localStorage
     */
    loadLogs() {
        try {
            const savedLogs = localStorage.getItem(this.storageKey);
            if (savedLogs) {
                this.logs = JSON.parse(savedLogs);
                
                // Rebuild stats from logs
                this.rebuildStats();
            }
            
            // Load existing session if any
            const savedSession = localStorage.getItem(this.sessionStorageKey);
            if (savedSession) {
                this.currentSession = JSON.parse(savedSession);
            }
        } catch (error) {
            console.warn('Failed to load logs from localStorage:', error);
            this.logs = [];
        }
    }

    /**
     * Rebuild stats from logs
     */
    rebuildStats() {
        // Reset stats
        this.stats = {
            totalMessages: 0,
            userMessages: 0,
            aiMessages: 0,
            errorCount: 0,
            averageResponseTime: 0,
            longestResponse: {
                text: '',
                length: 0
            },
            shortestResponse: {
                text: '',
                length: Infinity
            },
            startTime: null,
            lastInteractionTime: null,
            messagesByMode: {},
            sessionCount: 0
        };
        
        // Set of unique session IDs
        const sessions = new Set();
        
        // Total response time and count for average calculation
        let totalResponseTime = 0;
        let responseCount = 0;
        
        // Process logs
        for (const log of this.logs) {
            // Count messages by type
            if (log.data && log.data.type === 'user_message') {
                this.stats.totalMessages++;
                this.stats.userMessages++;
                
                // Track AI mode
                if (log.data.aiMode) {
                    if (!this.stats.messagesByMode[log.data.aiMode]) {
                        this.stats.messagesByMode[log.data.aiMode] = 0;
                    }
                    this.stats.messagesByMode[log.data.aiMode]++;
                }
            } else if (log.data && log.data.type === 'ai_response') {
                this.stats.totalMessages++;
                this.stats.aiMessages++;
                
                // Track longest/shortest responses
                const messageLength = log.data.message ? log.data.message.length : 0;
                
                if (messageLength > this.stats.longestResponse.length) {
                    this.stats.longestResponse = {
                        text: log.data.message ? log.data.message.substring(0, 100) + (log.data.message.length > 100 ? '...' : '') : '',
                        length: messageLength
                    };
                }
                
                if (messageLength < this.stats.shortestResponse.length && messageLength > 0) {
                    this.stats.shortestResponse = {
                        text: log.data.message || '',
                        length: messageLength
                    };
                }
                
                // Track response time
                if (log.data.responseTime) {
                    totalResponseTime += log.data.responseTime;
                    responseCount++;
                }
                
                // Track AI mode
                if (log.data.aiMode) {
                    if (!this.stats.messagesByMode[log.data.aiMode]) {
                        this.stats.messagesByMode[log.data.aiMode] = 0;
                    }
                    this.stats.messagesByMode[log.data.aiMode]++;
                }
            } else if (log.level === 'ERROR') {
                this.stats.errorCount++;
            }
            
            // Track sessions
            if (log.sessionId) {
                sessions.add(log.sessionId);
            }
            
            // Track start time
            if (!this.stats.startTime || log.timestamp < this.stats.startTime) {
                this.stats.startTime = log.timestamp;
            }
            
            // Track last interaction time
            if (!this.stats.lastInteractionTime || log.timestamp > this.stats.lastInteractionTime) {
                this.stats.lastInteractionTime = log.timestamp;
            }
        }
        
        // Set session count
        this.stats.sessionCount = sessions.size;
        
        // Calculate average response time
        if (responseCount > 0) {
            this.stats.averageResponseTime = totalResponseTime / responseCount;
        }
        
        // If no logs were found for shortest response, reset it
        if (this.stats.shortestResponse.length === Infinity) {
            this.stats.shortestResponse = {
                text: '',
                length: 0
            };
        }
    }

    /**
     * Get all logs
     * @param {Object} filters - Filters to apply to logs
     * @returns {Array} Filtered logs
     */
    getLogs(filters = {}) {
        // Return all logs if no filters
        if (Object.keys(filters).length === 0) {
            return [...this.logs];
        }
        
        // Apply filters
        return this.logs.filter(log => {
            // Filter by level
            if (filters.level && log.level !== filters.level) {
                return false;
            }
            
            // Filter by session ID
            if (filters.sessionId && log.sessionId !== filters.sessionId) {
                return false;
            }
            
            // Filter by message type
            if (filters.type && (!log.data || log.data.type !== filters.type)) {
                return false;
            }
            
            // Filter by AI mode
            if (filters.aiMode && (!log.data || log.data.aiMode !== filters.aiMode)) {
                return false;
            }
            
            // Filter by date range
            if (filters.startDate && new Date(log.timestamp) < new Date(filters.startDate)) {
                return false;
            }
            
            if (filters.endDate && new Date(log.timestamp) > new Date(filters.endDate)) {
                return false;
            }
            
            // Filter by search text
            if (filters.search) {
                const searchText = filters.search.toLowerCase();
                
                // Search in message
                if (log.message.toLowerCase().includes(searchText)) {
                    return true;
                }
                
                // Search in data
                if (log.data) {
                    // Check if message exists in data
                    if (log.data.message && log.data.message.toLowerCase().includes(searchText)) {
                        return true;
                    }
                    
                    // Check if error message exists in data
                    if (log.data.error && log.data.error.message && log.data.error.message.toLowerCase().includes(searchText)) {
                        return true;
                    }
                }
                
                return false;
            }
            
            return true;
        });
    }

    /**
     * Get the current chat statistics
     * @returns {Object} Chat statistics
     */
    getStats() {
        return { ...this.stats };
    }

    /**
     * Get session information
     * @param {string} sessionId - Session ID (optional, current session if omitted)
     * @returns {Object|null} Session information or null if not found
     */
    getSessionInfo(sessionId = null) {
        // Return current session if no ID provided and current session exists
        if (!sessionId && this.currentSession) {
            return { ...this.currentSession };
        }
        
        // If ID is provided, find session in logs
        if (sessionId) {
            // Get all logs for this session
            const sessionLogs = this.getLogs({ sessionId });
            
            if (sessionLogs.length === 0) {
                return null;
            }
            
            // Find session start and end
            let startTime = null;
            let endTime = null;
            let userMessageCount = 0;
            let aiMessageCount = 0;
            let errorCount = 0;
            const aiModes = {};
            
            for (const log of sessionLogs) {
                // Track session time range
                if (!startTime || log.timestamp < startTime) {
                    startTime = log.timestamp;
                }
                
                if (!endTime || log.timestamp > endTime) {
                    endTime = log.timestamp;
                }
                
                // Count message types
                if (log.data) {
                    if (log.data.type === 'user_message') {
                        userMessageCount++;
                    } else if (log.data.type === 'ai_response') {
                        aiMessageCount++;
                    }
                    
                    // Track AI mode
                    if (log.data.aiMode) {
                        if (!aiModes[log.data.aiMode]) {
                            aiModes[log.data.aiMode] = 0;
                        }
                        aiModes[log.data.aiMode]++;
                    }
                }
                
                // Count errors
                if (log.level === 'ERROR') {
                    errorCount++;
                }
            }
            
            return {
                id: sessionId,
                startTime,
                endTime,
                messageCount: userMessageCount + aiMessageCount,
                userMessageCount,
                aiMessageCount,
                errors: errorCount,
                aiModes
            };
        }
        
        return null;
    }

    /**
     * Get a list of all chat sessions
     * @returns {Array} List of session IDs with basic info
     */
    getSessions() {
        // Get unique session IDs
        const sessionIds = new Set();
        
        for (const log of this.logs) {
            if (log.sessionId) {
                sessionIds.add(log.sessionId);
            }
        }
        
        // Get info for each session
        return Array.from(sessionIds).map(id => this.getSessionInfo(id));
    }

    /**
     * Clear logs
     * @param {Object} filters - Filters to apply (if empty, all logs are cleared)
     * @returns {number} Number of logs cleared
     */
    clearLogs(filters = {}) {
        const originalCount = this.logs.length;
        
        if (Object.keys(filters).length === 0) {
            // Clear all logs
            this.logs = [];
            this.saveLogs();
            return originalCount;
        }
        
        // Apply filters and keep non-matching logs
        this.logs = this.logs.filter(log => {
            // Filter by level
            if (filters.level && log.level === filters.level) {
                return false;
            }
            
            // Filter by session ID
            if (filters.sessionId && log.sessionId === filters.sessionId) {
                return false;
            }
            
            // Filter by type
            if (filters.type && log.data && log.data.type === filters.type) {
                return false;
            }
            
            // Filter by date
            if (filters.olderThan && new Date(log.timestamp) < new Date(filters.olderThan)) {
                return false;
            }
            
            return true;
        });
        
        // Save logs
        this.saveLogs();
        
        // Rebuild stats
        this.rebuildStats();
        
        return originalCount - this.logs.length;
    }

    /**
     * Export logs to JSON
     * @param {Object} filters - Filters to apply
     * @returns {string} JSON string
     */
    exportLogsToJSON(filters = {}) {
        const logs = this.getLogs(filters);
        return JSON.stringify(logs, null, 2);
    }

    /**
     * Export logs to CSV
     * @param {Object} filters - Filters to apply
     * @returns {string} CSV string
     */
    exportLogsToCSV(filters = {}) {
        const logs = this.getLogs(filters);
        
        if (logs.length === 0) {
            return 'timestamp,level,message,sessionId,type';
        }
        
        // Helper function to escape CSV values
        const escapeCSV = (value) => {
            if (value === null || value === undefined) {
                return '';
            }
            
            const str = String(value);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            
            return str;
        };
        
        // Create CSV header
        let csv = 'timestamp,level,message,sessionId,type\n';
        
        // Add log rows
        for (const log of logs) {
            const type = log.data && log.data.type ? log.data.type : '';
            
            csv += [
                escapeCSV(log.timestamp),
                escapeCSV(log.level),
                escapeCSV(log.message),
                escapeCSV(log.sessionId),
                escapeCSV(type)
            ].join(',') + '\n';
        }
        
        return csv;
    }

    /**
     * Create logger UI
     * @param {HTMLElement|string} container - Container element or selector
     * @returns {HTMLElement} The created UI
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
        uiContainer.className = 'chatbot-logger-container';
        container.appendChild(uiContainer);
        
        // Create header with title and controls
        const header = document.createElement('div');
        header.className = 'chatbot-logger-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h2');
        title.className = 'chatbot-logger-title';
        title.textContent = 'Chat Logs & Analytics';
        header.appendChild(title);
        
        // Create filter controls
        const filterContainer = document.createElement('div');
        filterContainer.className = 'chatbot-logger-filter-container';
        uiContainer.appendChild(filterContainer);
        
        // Filter by level
        const levelFilter = document.createElement('select');
        levelFilter.className = 'chatbot-logger-filter';
        levelFilter.innerHTML = `
            <option value="">All Levels</option>
            <option value="DEBUG">Debug</option>
            <option value="INFO">Info</option>
            <option value="WARNING">Warning</option>
            <option value="ERROR">Error</option>
        `;
        
        const levelFilterLabel = document.createElement('label');
        levelFilterLabel.textContent = 'Level:';
        levelFilterLabel.appendChild(levelFilter);
        filterContainer.appendChild(levelFilterLabel);
        
        // Filter by type
        const typeFilter = document.createElement('select');
        typeFilter.className = 'chatbot-logger-filter';
        typeFilter.innerHTML = `
            <option value="">All Types</option>
            <option value="user_message">User Messages</option>
            <option value="ai_response">AI Responses</option>
            <option value="error">Errors</option>
        `;
        
        const typeFilterLabel = document.createElement('label');
        typeFilterLabel.textContent = 'Type:';
        typeFilterLabel.appendChild(typeFilter);
        filterContainer.appendChild(typeFilterLabel);
        
        // Filter by session
        const sessionFilter = document.createElement('select');
        sessionFilter.className = 'chatbot-logger-filter';
        sessionFilter.innerHTML = '<option value="">All Sessions</option>';
        
        // Add session options
        const sessions = this.getSessions();
        sessions.forEach(session => {
            const startDate = new Date(session.startTime).toLocaleDateString();
            const option = document.createElement('option');
            option.value = session.id;
            option.textContent = `Session ${startDate} (${session.messageCount} msgs)`;
            sessionFilter.appendChild(option);
        });
        
        const sessionFilterLabel = document.createElement('label');
        sessionFilterLabel.textContent = 'Session:';
        sessionFilterLabel.appendChild(sessionFilter);
        filterContainer.appendChild(sessionFilterLabel);
        
        // Search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'chatbot-logger-search';
        searchInput.placeholder = 'Search logs...';
        
        const searchLabel = document.createElement('label');
        searchLabel.textContent = 'Search:';
        searchLabel.appendChild(searchInput);
        filterContainer.appendChild(searchLabel);
        
        // Create tabs for logs, stats, and sessions
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'chatbot-logger-tabs';
        uiContainer.appendChild(tabsContainer);
        
        const logsTab = document.createElement('button');
        logsTab.className = 'chatbot-logger-tab active';
        logsTab.textContent = 'Logs';
        tabsContainer.appendChild(logsTab);
        
        const statsTab = document.createElement('button');
        statsTab.className = 'chatbot-logger-tab';
        statsTab.textContent = 'Statistics';
        tabsContainer.appendChild(statsTab);
        
        const sessionsTab = document.createElement('button');
        sessionsTab.className = 'chatbot-logger-tab';
        sessionsTab.textContent = 'Sessions';
        tabsContainer.appendChild(sessionsTab);
        
        // Create tab content containers
        const logsContent = document.createElement('div');
        logsContent.className = 'chatbot-logger-content active';
        uiContainer.appendChild(logsContent);
        
        const statsContent = document.createElement('div');
        statsContent.className = 'chatbot-logger-content';
        uiContainer.appendChild(statsContent);
        
        const sessionsContent = document.createElement('div');
        sessionsContent.className = 'chatbot-logger-content';
        uiContainer.appendChild(sessionsContent);
        
        // Create logs container
        const logsTable = document.createElement('table');
        logsTable.className = 'chatbot-logger-table';
        logsTable.innerHTML = `
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Level</th>
                    <th>Message</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        logsContent.appendChild(logsTable);
        
        const logsTableBody = logsTable.querySelector('tbody');
        
        // Create logs pagination
        const logsPagination = document.createElement('div');
        logsPagination.className = 'chatbot-logger-pagination';
        logsContent.appendChild(logsPagination);
        
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = true;
        logsPagination.appendChild(prevButton);
        
        const pageInfo = document.createElement('span');
        pageInfo.className = 'chatbot-logger-page-info';
        pageInfo.textContent = 'Page 1 of 1';
        logsPagination.appendChild(pageInfo);
        
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = true;
        logsPagination.appendChild(nextButton);
        
        // Create export buttons
        const exportContainer = document.createElement('div');
        exportContainer.className = 'chatbot-logger-export';
        logsContent.appendChild(exportContainer);
        
        const exportJSONButton = document.createElement('button');
        exportJSONButton.className = 'chatbot-logger-export-btn';
        exportJSONButton.textContent = 'Export JSON';
        exportContainer.appendChild(exportJSONButton);
        
        const exportCSVButton = document.createElement('button');
        exportCSVButton.className = 'chatbot-logger-export-btn';
        exportCSVButton.textContent = 'Export CSV';
        exportContainer.appendChild(exportCSVButton);
        
        const clearLogsButton = document.createElement('button');
        clearLogsButton.className = 'chatbot-logger-clear-btn';
        clearLogsButton.textContent = 'Clear Logs';
        exportContainer.appendChild(clearLogsButton);
        
        // Stats content
        statsContent.innerHTML = `
            <div class="chatbot-logger-stats-grid">
                <div class="chatbot-logger-stat-card">
                    <div class="chatbot-logger-stat-title">Total Messages</div>
                    <div class="chatbot-logger-stat-value">${this.stats.totalMessages}</div>
                </div>
                
                <div class="chatbot-logger-stat-card">
                    <div class="chatbot-logger-stat-title">User Messages</div>
                    <div class="chatbot-logger-stat-value">${this.stats.userMessages}</div>
                </div>
                
                <div class="chatbot-logger-stat-card">
                    <div class="chatbot-logger-stat-title">AI Responses</div>
                    <div class="chatbot-logger-stat-value">${this.stats.aiMessages}</div>
                </div>
                
                <div class="chatbot-logger-stat-card">
                    <div class="chatbot-logger-stat-title">Errors</div>
                    <div class="chatbot-logger-stat-value">${this.stats.errorCount}</div>
                </div>
                
                <div class="chatbot-logger-stat-card">
                    <div class="chatbot-logger-stat-title">Sessions</div>
                    <div class="chatbot-logger-stat-value">${this.stats.sessionCount}</div>
                </div>
                
                <div class="chatbot-logger-stat-card">
                    <div class="chatbot-logger-stat-title">Avg Response Time</div>
                    <div class="chatbot-logger-stat-value">${Math.round(this.stats.averageResponseTime)}ms</div>
                </div>
            </div>
            
            <div class="chatbot-logger-stat-section">
                <h3>AI Modes Usage</h3>
                <div class="chatbot-logger-ai-modes"></div>
            </div>
        `;
        
        // Add AI modes stats
        const aiModesContainer = statsContent.querySelector('.chatbot-logger-ai-modes');
        const modesEntries = Object.entries(this.stats.messagesByMode);
        
        if (modesEntries.length === 0) {
            aiModesContainer.textContent = 'No AI modes data available';
        } else {
            const aiModesTable = document.createElement('table');
            aiModesTable.className = 'chatbot-logger-table';
            aiModesTable.innerHTML = `
                <thead>
                    <tr>
                        <th>AI Mode</th>
                        <th>Message Count</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            aiModesContainer.appendChild(aiModesTable);
            
            const aiModesTableBody = aiModesTable.querySelector('tbody');
            const totalModeMessages = modesEntries.reduce((sum, [, count]) => sum + count, 0);
            
            modesEntries.sort((a, b) => b[1] - a[1]).forEach(([mode, count]) => {
                const percentage = (count / totalModeMessages * 100).toFixed(1);
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${mode}</td>
                    <td>${count}</td>
                    <td>${percentage}%</td>
                `;
                aiModesTableBody.appendChild(row);
            });
        }
        
        // Sessions content
        const sessionsTable = document.createElement('table');
        sessionsTable.className = 'chatbot-logger-table';
        sessionsTable.innerHTML = `
            <thead>
                <tr>
                    <th>Session ID</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Messages</th>
                    <th>Errors</th>
                    <th>Main AI Mode</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        sessionsContent.appendChild(sessionsTable);
        
        const sessionsTableBody = sessionsTable.querySelector('tbody');
        
        // Add session rows
        sessions.sort((a, b) => new Date(b.startTime) - new Date(a.startTime)).forEach(session => {
            // Find most used AI mode
            let mainMode = 'None';
            let mainModeCount = 0;
            
            for (const [mode, count] of Object.entries(session.aiModes)) {
                if (count > mainModeCount) {
                    mainMode = mode;
                    mainModeCount = count;
                }
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${session.id}</td>
                <td>${new Date(session.startTime).toLocaleString()}</td>
                <td>${session.endTime ? new Date(session.endTime).toLocaleString() : 'Active'}</td>
                <td>${session.messageCount} (👤 ${session.userMessageCount} | 🤖 ${session.aiMessageCount})</td>
                <td>${session.errors}</td>
                <td>${mainMode}</td>
            `;
            
            // Add click event to view session logs
            row.addEventListener('click', () => {
                sessionFilter.value = session.id;
                sessionFilter.dispatchEvent(new Event('change'));
                
                // Switch to logs tab
                logsTab.click();
            });
            
            sessionsTableBody.appendChild(row);
        });
        
        // Variables for pagination
        let currentPage = 1;
        const logsPerPage = 20;
        let filteredLogs = [];
        
        // Function to update logs table
        const updateLogsTable = () => {
            const level = levelFilter.value;
            const type = typeFilter.value;
            const sessionId = sessionFilter.value;
            const search = searchInput.value;
            
            // Apply filters
            const filters = {};
            if (level) filters.level = level;
            if (type) filters.type = type;
            if (sessionId) filters.sessionId = sessionId;
            if (search) filters.search = search;
            
            filteredLogs = this.getLogs(filters);
            
            // Reset to first page when filters change
            currentPage = 1;
            
            // Update pagination
            const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
            pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
            prevButton.disabled = currentPage <= 1;
            nextButton.disabled = currentPage >= totalPages;
            
            // Clear table
            logsTableBody.innerHTML = '';
            
            // Calculate start and end indices
            const startIndex = (currentPage - 1) * logsPerPage;
            const endIndex = Math.min(startIndex + logsPerPage, filteredLogs.length);
            
            // No logs message
            if (filteredLogs.length === 0) {
                const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = '<td colspan="4" class="chatbot-logger-empty">No logs found</td>';
                logsTableBody.appendChild(emptyRow);
                return;
            }
            
            // Add log rows
            for (let i = startIndex; i < endIndex; i++) {
                const log = filteredLogs[i];
                
                const row = document.createElement('tr');
                row.className = `log-level-${log.level.toLowerCase()}`;
                
                // Format timestamp
                const timestamp = new Date(log.timestamp).toLocaleString();
                
                // Format data
                let dataDisplay = '';
                if (log.data) {
                    if (log.data.type === 'user_message' && log.data.message) {
                        dataDisplay = `<div class="chatbot-logger-message user-message">${escapeHTML(log.data.message)}</div>`;
                    } else if (log.data.type === 'ai_response' && log.data.message) {
                        dataDisplay = `<div class="chatbot-logger-message ai-message">${escapeHTML(log.data.message)}</div>`;
                        
                        if (log.data.responseTime) {
                            dataDisplay += `<div class="chatbot-logger-response-time">Response time: ${log.data.responseTime}ms</div>`;
                        }
                    } else if (log.data.error) {
                        dataDisplay = `<div class="chatbot-logger-error">
                            ${log.data.error.name ? `<div>${escapeHTML(log.data.error.name)}</div>` : ''}
                            ${log.data.error.message ? `<div>${escapeHTML(log.data.error.message)}</div>` : ''}
                        </div>`;
                    } else {
                        dataDisplay = `<pre>${escapeHTML(JSON.stringify(log.data, null, 2))}</pre>`;
                    }
                }
                
                row.innerHTML = `
                    <td>${timestamp}</td>
                    <td class="log-level">${log.level}</td>
                    <td>${escapeHTML(log.message)}</td>
                    <td>${dataDisplay}</td>
                `;
                
                logsTableBody.appendChild(row);
            }
        };
        
        // Helper function to escape HTML
        const escapeHTML = (str) => {
            if (!str) return '';
            
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        };
        
        // Add event listeners for filters
        levelFilter.addEventListener('change', updateLogsTable);
        typeFilter.addEventListener('change', updateLogsTable);
        sessionFilter.addEventListener('change', updateLogsTable);
        searchInput.addEventListener('input', updateLogsTable);
        
        // Add pagination event listeners
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateLogsTable();
            }
        });
        
        nextButton.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                updateLogsTable();
            }
        });
        
        // Add tab switching event listeners
        logsTab.addEventListener('click', () => {
            logsTab.classList.add('active');
            statsTab.classList.remove('active');
            sessionsTab.classList.remove('active');
            
            logsContent.classList.add('active');
            statsContent.classList.remove('active');
            sessionsContent.classList.remove('active');
        });
        
        statsTab.addEventListener('click', () => {
            logsTab.classList.remove('active');
            statsTab.classList.add('active');
            sessionsTab.classList.remove('active');
            
            logsContent.classList.remove('active');
            statsContent.classList.add('active');
            sessionsContent.classList.remove('active');
        });
        
        sessionsTab.addEventListener('click', () => {
            logsTab.classList.remove('active');
            statsTab.classList.remove('active');
            sessionsTab.classList.add('active');
            
            logsContent.classList.remove('active');
            statsContent.classList.remove('active');
            sessionsContent.classList.add('active');
        });
        
        // Add export buttons listeners
        exportJSONButton.addEventListener('click', () => {
            const level = levelFilter.value;
            const type = typeFilter.value;
            const sessionId = sessionFilter.value;
            const search = searchInput.value;
            
            // Apply filters
            const filters = {};
            if (level) filters.level = level;
            if (type) filters.type = type;
            if (sessionId) filters.sessionId = sessionId;
            if (search) filters.search = search;
            
            const json = this.exportLogsToJSON(filters);
            
            // Create and trigger download
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `jaat-chat-logs-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
        
        exportCSVButton.addEventListener('click', () => {
            const level = levelFilter.value;
            const type = typeFilter.value;
            const sessionId = sessionFilter.value;
            const search = searchInput.value;
            
            // Apply filters
            const filters = {};
            if (level) filters.level = level;
            if (type) filters.type = type;
            if (sessionId) filters.sessionId = sessionId;
            if (search) filters.search = search;
            
            const csv = this.exportLogsToCSV(filters);
            
            // Create and trigger download
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `jaat-chat-logs-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
        
        clearLogsButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
                this.clearLogs();
                updateLogsTable();
                
                // Refresh stats display
                statsTab.click(); // This will refresh the stats view
                logsTab.click(); // Then switch back to logs view
            }
        });
        
        // Initial logs display
        updateLogsTable();
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles for the UI
     */
    addUIStyles() {
        const styleId = 'chatbot-logger-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .chatbot-logger-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
                overflow: hidden;
            }
            
            .chatbot-logger-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 1rem;
            }
            
            .chatbot-logger-title {
                font-size: 1.5rem;
                font-weight: 700;
                margin: 0;
            }
            
            .chatbot-logger-filter-container {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            
            .chatbot-logger-filter-container label {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .chatbot-logger-filter, .chatbot-logger-search {
                padding: 0.5rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                min-width: 150px;
            }
            
            .chatbot-logger-filter:focus, .chatbot-logger-search:focus {
                outline: none;
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .chatbot-logger-tabs {
                display: flex;
                border-bottom: 1px solid var(--border-color, #30363d);
                margin-bottom: 1rem;
            }
            
            .chatbot-logger-tab {
                padding: 0.75rem 1.5rem;
                background: none;
                border: none;
                color: var(--text-primary, #f0f6fc);
                font-size: 0.9375rem;
                font-weight: 500;
                cursor: pointer;
                position: relative;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            
            .chatbot-logger-tab:hover {
                opacity: 0.9;
            }
            
            .chatbot-logger-tab.active {
                opacity: 1;
            }
            
            .chatbot-logger-tab.active::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: var(--accent-primary, #7c3aed);
            }
            
            .chatbot-logger-content {
                display: none;
            }
            
            .chatbot-logger-content.active {
                display: block;
            }
            
            .chatbot-logger-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 0.875rem;
                margin-bottom: 1rem;
            }
            
            .chatbot-logger-table th {
                text-align: left;
                padding: 0.75rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                font-weight: 600;
                color: var(--text-secondary, #8b949e);
                position: sticky;
                top: 0;
                background-color: var(--bg-secondary, #161b22);
                z-index: 1;
            }
            
            .chatbot-logger-table td {
                padding: 0.75rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                vertical-align: top;
            }
            
            .chatbot-logger-table tr {
                transition: background-color 0.2s;
            }
            
            .chatbot-logger-table tr:hover {
                background-color: var(--bg-primary, #0d1117);
            }
            
            .chatbot-logger-table tbody tr:last-child td {
                border-bottom: none;
            }
            
            .log-level {
                font-weight: 600;
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius-sm, 0.375rem);
                display: inline-block;
                text-align: center;
                width: 80px;
            }
            
            .log-level-debug .log-level {
                background-color: var(--info-color, #3b82f6);
                color: white;
                opacity: 0.7;
            }
            
            .log-level-info .log-level {
                background-color: var(--success-color, #10b981);
                color: white;
            }
            
            .log-level-warning .log-level {
                background-color: var(--warning-color, #f59e0b);
                color: white;
            }
            
            .log-level-error .log-level {
                background-color: var(--error-color, #ef4444);
                color: white;
            }
            
            .chatbot-logger-message {
                background-color: var(--bg-primary, #0d1117);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 0.5rem;
                margin-bottom: 0.5rem;
                max-height: 150px;
                overflow-y: auto;
                white-space: pre-wrap;
                word-break: break-word;
            }
            
            .chatbot-logger-message.user-message {
                border-left: 3px solid var(--info-color, #3b82f6);
            }
            
            .chatbot-logger-message.ai-message {
                border-left: 3px solid var(--accent-primary, #7c3aed);
            }
            
            .chatbot-logger-response-time {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .chatbot-logger-error {
                background-color: rgba(239, 68, 68, 0.1);
                border-left: 3px solid var(--error-color, #ef4444);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 0.5rem;
                margin-bottom: 0.5rem;
            }
            
            .chatbot-logger-pagination {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                margin: 1.5rem 0;
            }
            
            .chatbot-logger-pagination button {
                padding: 0.5rem 1rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .chatbot-logger-pagination button:hover:not(:disabled) {
                background-color: var(--accent-primary, #7c3aed);
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .chatbot-logger-pagination button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .chatbot-logger-page-info {
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .chatbot-logger-export {
                display: flex;
                justify-content: flex-end;
                gap: 0.75rem;
                margin-top: 1.5rem;
            }
            
            .chatbot-logger-export-btn {
                padding: 0.5rem 1rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .chatbot-logger-export-btn:hover {
                background-color: var(--accent-primary, #7c3aed);
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .chatbot-logger-clear-btn {
                padding: 0.5rem 1rem;
                background-color: rgba(239, 68, 68, 0.1);
                border: 1px solid var(--error-color, #ef4444);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--error-color, #ef4444);
                cursor: pointer;
                transition: all 0.2s;
                margin-left: auto;
            }
            
            .chatbot-logger-clear-btn:hover {
                background-color: var(--error-color, #ef4444);
                color: white;
            }
            
            .chatbot-logger-empty {
                text-align: center;
                color: var(--text-secondary, #8b949e);
                padding: 2rem 0 !important;
                font-style: italic;
            }
            
            .chatbot-logger-stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .chatbot-logger-stat-card {
                background-color: var(--bg-primary, #0d1117);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1.5rem;
                border: 1px solid var(--border-color, #30363d);
                text-align: center;
            }
            
            .chatbot-logger-stat-title {
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
                margin-bottom: 0.5rem;
            }
            
            .chatbot-logger-stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--accent-primary, #7c3aed);
            }
            
            .chatbot-logger-stat-section {
                margin-top: 2rem;
                padding-top: 1.5rem;
                border-top: 1px solid var(--border-color, #30363d);
            }
            
            .chatbot-logger-stat-section h3 {
                font-size: 1.25rem;
                margin-bottom: 1rem;
                font-weight: 600;
            }
            
            .chatbot-logger-ai-modes {
                margin-top: 1rem;
            }
            
            pre {
                background-color: var(--bg-primary, #0d1117);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 0.5rem;
                margin: 0;
                overflow-x: auto;
                font-size: 0.8125rem;
                font-family: var(--font-mono, monospace);
                max-height: 200px;
                overflow-y: auto;
            }
            
            @media (max-width: 640px) {
                .chatbot-logger-filter-container {
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .chatbot-logger-filter, .chatbot-logger-search {
                    width: 100%;
                    min-width: unset;
                }
                
                .chatbot-logger-stats-grid {
                    grid-template-columns: 1fr;
                }
                
                .chatbot-logger-export {
                    flex-wrap: wrap;
                }
                
                .chatbot-logger-clear-btn {
                    margin-left: 0;
                    margin-top: 0.5rem;
                    width: 100%;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChatbotLogger };
} else {
    // Add to global scope for browser usage
    window.ChatbotLogger = ChatbotLogger;
}
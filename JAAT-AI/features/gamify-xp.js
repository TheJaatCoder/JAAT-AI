/**
 * JAAT-AI Gamification System
 * Add experience points, levels, badges, and rewards to enhance user engagement
 */

class GamifyXP {
    constructor() {
        this.user = {
            id: null,
            xp: 0,
            level: 1,
            badges: [],
            streakDays: 0,
            lastActive: null,
            achievements: [],
            inventory: [],
            history: []
        };
        
        this.xpConfig = {
            baseMessageXP: 2,               // Base XP for sending a message
            baseResponseXP: 1,              // Base XP for receiving a response
            longMessageBonus: 3,            // Bonus for long thoughtful messages
            dailyBonusXP: 10,               // Daily login bonus
            streakBonusXP: 5,               // Additional bonus per day of streak
            maxStreakBonusXP: 25,           // Maximum streak bonus
            feedbackXP: 5,                  // XP for giving feedback
            featureUseXP: 3,                // XP for using a feature
            newModeXP: 8,                   // XP for trying a new AI mode
            shareXP: 15,                    // XP for sharing content
            customizationXP: 2,             // XP for customizing the interface
            maxDailyXP: 200,                // Maximum XP that can be earned daily
            levelUpFormula: level => Math.floor(100 * Math.pow(1.4, level - 1)) // XP needed to level up
        };
        
        // Level definitions with rewards
        this.levels = [
            { level: 1, name: "Novice", xpRequired: 0, reward: "Welcome Badge" },
            { level: 2, name: "Apprentice", xpRequired: 100, reward: "New Theme Unlocked" },
            { level: 3, name: "Explorer", xpRequired: 250, reward: "Message Animation Effects" },
            { level: 4, name: "Adept", xpRequired: 500, reward: "Advanced Prompts Access" },
            { level: 5, name: "Expert", xpRequired: 1000, reward: "Custom Background" },
            { level: 6, name: "Master", xpRequired: 1800, reward: "Voice Message Feature" },
            { level: 7, name: "Grandmaster", xpRequired: 3000, reward: "Premium Avatar Pack" },
            { level: 8, name: "Sage", xpRequired: 5000, reward: "Chat Export Options" },
            { level: 9, name: "Oracle", xpRequired: 8000, reward: "Custom Response Styles" },
            { level: 10, name: "Enlightened", xpRequired: 12000, reward: "Animated Profile Frame" },
            { level: 15, name: "Divine", xpRequired: 25000, reward: "Personal AI Assistant Customization" },
            { level: 20, name: "Transcendent", xpRequired: 50000, reward: "Create Custom AI Modes" }
        ];
        
        // Badge definitions
        this.badges = [
            { id: "welcome", name: "Welcome", description: "Joined JAAT-AI", icon: "ri-home-smile-line" },
            { id: "streak_3", name: "Consistent", description: "3-day streak", icon: "ri-calendar-check-line" },
            { id: "streak_7", name: "Dedicated", description: "7-day streak", icon: "ri-calendar-event-line" },
            { id: "streak_30", name: "Committed", description: "30-day streak", icon: "ri-calendar-line" },
            { id: "chatty", name: "Chatty", description: "Sent 50 messages", icon: "ri-chat-3-line" },
            { id: "curious", name: "Curious", description: "Tried 5 different AI modes", icon: "ri-question-line" },
            { id: "customizer", name: "Customizer", description: "Changed 5 appearance settings", icon: "ri-palette-line" },
            { id: "explorer", name: "Explorer", description: "Used all main features", icon: "ri-compass-3-line" },
            { id: "night_owl", name: "Night Owl", description: "Active after midnight", icon: "ri-moon-clear-line" },
            { id: "early_bird", name: "Early Bird", description: "Active before 7 AM", icon: "ri-sun-line" },
            { id: "feedback", name: "Helpful", description: "Provided valuable feedback", icon: "ri-feedback-line" },
            { id: "sharer", name: "Influencer", description: "Shared content from JAAT-AI", icon: "ri-share-line" },
            { id: "coder", name: "Coder", description: "Used coding features extensively", icon: "ri-code-s-slash-line" },
            { id: "wordsmith", name: "Wordsmith", description: "Sent messages with rich vocabulary", icon: "ri-quill-pen-line" },
            { id: "genius", name: "Genius", description: "Reached level 10", icon: "ri-brain-line" }
        ];
        
        // Achievements
        this.achievements = [
            { id: "first_chat", name: "First Contact", description: "Start your first chat", xpReward: 10, badge: null },
            { id: "level_5", name: "Stepping Up", description: "Reach level 5", xpReward: 50, badge: null },
            { id: "level_10", name: "Power User", description: "Reach level 10", xpReward: 100, badge: "genius" },
            { id: "try_5_modes", name: "Mode Explorer", description: "Try 5 different AI modes", xpReward: 30, badge: "curious" },
            { id: "streak_7", name: "Weekly Dedication", description: "Maintain a 7-day streak", xpReward: 40, badge: "streak_7" },
            { id: "streak_30", name: "Monthly Dedication", description: "Maintain a 30-day streak", xpReward: 150, badge: "streak_30" },
            { id: "send_50", name: "Conversation Expert", description: "Send 50 messages", xpReward: 35, badge: "chatty" },
            { id: "customize_5", name: "Personalization Pro", description: "Change 5 appearance settings", xpReward: 25, badge: "customizer" },
            { id: "use_all", name: "Feature Master", description: "Use all main features", xpReward: 75, badge: "explorer" },
            { id: "share_5", name: "Social Butterfly", description: "Share content 5 times", xpReward: 45, badge: "sharer" }
        ];
        
        // Callbacks
        this.onXPGained = null;
        this.onLevelUp = null;
        this.onBadgeEarned = null;
        this.onAchievementUnlocked = null;
        
        // Stats
        this.dailyStats = {
            xpGained: 0,
            actionsPerformed: {},
            messagesAIMode: {},
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        
        // Storage key
        this.storageKeyUser = 'jaat-gamify-user';
        this.storageKeyStats = 'jaat-gamify-stats';
    }

    /**
     * Initialize the gamification system
     * @param {Object} options - Options for configuration
     * @returns {GamifyXP} This instance
     */
    init(options = {}) {
        // Apply options
        if (options.xpConfig) {
            this.xpConfig = { ...this.xpConfig, ...options.xpConfig };
        }
        
        if (options.onXPGained) this.onXPGained = options.onXPGained;
        if (options.onLevelUp) this.onLevelUp = options.onLevelUp;
        if (options.onBadgeEarned) this.onBadgeEarned = options.onBadgeEarned;
        if (options.onAchievementUnlocked) this.onAchievementUnlocked = options.onAchievementUnlocked;
        
        if (options.userId) {
            this.user.id = options.userId;
            this.storageKeyUser += `-${options.userId}`;
            this.storageKeyStats += `-${options.userId}`;
        }
        
        // Load user data
        this.loadUserData();
        
        // Check for daily bonus
        this.checkDailyBonus();
        
        console.log('GamifyXP initialized for user:', this.user.id || 'anonymous');
        return this;
    }

    /**
     * Load user data from localStorage
     */
    loadUserData() {
        try {
            // Load user data
            const userData = localStorage.getItem(this.storageKeyUser);
            if (userData) {
                this.user = { ...this.user, ...JSON.parse(userData) };
                console.log('Loaded user data:', this.user);
            } else {
                // New user, give welcome badge
                this.awardBadge('welcome');
            }
            
            // Load stats data
            const statsData = localStorage.getItem(this.storageKeyStats);
            if (statsData) {
                this.dailyStats = JSON.parse(statsData);
                
                // Reset daily stats if it's a new day
                const today = new Date().toISOString().split('T')[0];
                if (this.dailyStats.lastUpdated !== today) {
                    this.resetDailyStats();
                }
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            // Continue with default values
        }
    }

    /**
     * Save user data to localStorage
     */
    saveUserData() {
        try {
            localStorage.setItem(this.storageKeyUser, JSON.stringify(this.user));
            localStorage.setItem(this.storageKeyStats, JSON.stringify(this.dailyStats));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    /**
     * Reset daily stats
     */
    resetDailyStats() {
        this.dailyStats = {
            xpGained: 0,
            actionsPerformed: {},
            messagesAIMode: {},
            lastUpdated: new Date().toISOString().split('T')[0]
        };
    }

    /**
     * Check for daily login bonus
     */
    checkDailyBonus() {
        const today = new Date().toISOString().split('T')[0];
        
        // If last active date is not today
        if (this.user.lastActive !== today) {
            // Check if streak should continue or reset
            if (this.user.lastActive) {
                const lastActive = new Date(this.user.lastActive);
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                
                // If last active was yesterday, continue streak
                if (lastActive.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
                    this.user.streakDays++;
                } else {
                    // Reset streak
                    this.user.streakDays = 1;
                }
            } else {
                // First time user
                this.user.streakDays = 1;
            }
            
            // Award daily bonus
            let bonus = this.xpConfig.dailyBonusXP;
            
            // Add streak bonus (capped)
            const streakBonus = Math.min(
                this.xpConfig.streakBonusXP * (this.user.streakDays - 1),
                this.xpConfig.maxStreakBonusXP
            );
            
            bonus += streakBonus;
            
            // Award XP
            this.awardXP(bonus, 'daily_bonus');
            
            // Check streak achievements
            if (this.user.streakDays === 3) {
                this.awardBadge('streak_3');
            } else if (this.user.streakDays === 7) {
                this.unlockAchievement('streak_7');
            } else if (this.user.streakDays === 30) {
                this.unlockAchievement('streak_30');
            }
            
            // Update last active date
            this.user.lastActive = today;
            this.saveUserData();
        }
    }

    /**
     * Award XP to the user
     * @param {number} amount - Amount of XP to award
     * @param {string} reason - Reason for XP award
     * @returns {Object} Result with awarded XP and level up info
     */
    awardXP(amount, reason) {
        // Check daily XP cap
        const cappedAmount = Math.min(
            amount,
            this.xpConfig.maxDailyXP - this.dailyStats.xpGained
        );
        
        if (cappedAmount <= 0) {
            return { awarded: 0, levelUp: false };
        }
        
        // Get current level and XP
        const oldLevel = this.user.level;
        const oldXP = this.user.xp;
        
        // Add XP
        this.user.xp += cappedAmount;
        
        // Update daily stats
        this.dailyStats.xpGained += cappedAmount;
        this.dailyStats.lastUpdated = new Date().toISOString().split('T')[0];
        
        if (!this.dailyStats.actionsPerformed[reason]) {
            this.dailyStats.actionsPerformed[reason] = 0;
        }
        this.dailyStats.actionsPerformed[reason]++;
        
        // Add to history
        this.user.history.push({
            timestamp: new Date().toISOString(),
            type: 'xp_gain',
            amount: cappedAmount,
            reason,
            totalXP: this.user.xp
        });
        
        // Check for level up
        let leveledUp = false;
        let newLevel = oldLevel;
        
        while (newLevel < this.levels.length && this.user.xp >= this.getXPRequiredForLevel(newLevel + 1)) {
            newLevel++;
            leveledUp = true;
            
            // Add level up to history
            this.user.history.push({
                timestamp: new Date().toISOString(),
                type: 'level_up',
                from: newLevel - 1,
                to: newLevel
            });
            
            // Check level achievements
            if (newLevel === 5) {
                this.unlockAchievement('level_5');
            } else if (newLevel === 10) {
                this.unlockAchievement('level_10');
            }
        }
        
        // Update user level
        this.user.level = newLevel;
        
        // Save user data
        this.saveUserData();
        
        // Call callbacks
        if (cappedAmount > 0 && typeof this.onXPGained === 'function') {
            this.onXPGained(cappedAmount, reason, this.user.xp);
        }
        
        if (leveledUp && typeof this.onLevelUp === 'function') {
            this.onLevelUp(oldLevel, newLevel, this.getLevelInfo(newLevel));
        }
        
        return {
            awarded: cappedAmount,
            levelUp: leveledUp,
            oldLevel,
            newLevel,
            oldXP,
            newXP: this.user.xp
        };
    }

    /**
     * Award a badge to the user
     * @param {string} badgeId - Badge ID
     * @returns {boolean} Whether badge was awarded
     */
    awardBadge(badgeId) {
        // Check if badge exists
        const badge = this.badges.find(b => b.id === badgeId);
        if (!badge) {
            console.warn(`Badge '${badgeId}' not found`);
            return false;
        }
        
        // Check if user already has this badge
        if (this.user.badges.includes(badgeId)) {
            return false;
        }
        
        // Award badge
        this.user.badges.push(badgeId);
        
        // Add to history
        this.user.history.push({
            timestamp: new Date().toISOString(),
            type: 'badge_earned',
            badgeId,
            badgeName: badge.name
        });
        
        // Save user data
        this.saveUserData();
        
        // Call callback
        if (typeof this.onBadgeEarned === 'function') {
            this.onBadgeEarned(badge);
        }
        
        return true;
    }

    /**
     * Unlock an achievement
     * @param {string} achievementId - Achievement ID
     * @returns {boolean} Whether achievement was unlocked
     */
    unlockAchievement(achievementId) {
        // Check if achievement exists
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (!achievement) {
            console.warn(`Achievement '${achievementId}' not found`);
            return false;
        }
        
        // Check if user already has this achievement
        if (this.user.achievements.includes(achievementId)) {
            return false;
        }
        
        // Unlock achievement
        this.user.achievements.push(achievementId);
        
        // Add to history
        this.user.history.push({
            timestamp: new Date().toISOString(),
            type: 'achievement_unlocked',
            achievementId,
            achievementName: achievement.name
        });
        
        // Award XP
        if (achievement.xpReward > 0) {
            this.awardXP(achievement.xpReward, `achievement_${achievementId}`);
        }
        
        // Award badge if associated
        if (achievement.badge) {
            this.awardBadge(achievement.badge);
        }
        
        // Save user data
        this.saveUserData();
        
        // Call callback
        if (typeof this.onAchievementUnlocked === 'function') {
            this.onAchievementUnlocked(achievement);
        }
        
        return true;
    }

    /**
     * Track a chat message sent by user
     * @param {string} message - Message content
     * @param {string} aiMode - Current AI mode
     */
    trackMessage(message, aiMode) {
        // Award base XP
        let xp = this.xpConfig.baseMessageXP;
        
        // Add bonus for long, thoughtful messages
        if (message.length > 100) {
            xp += this.xpConfig.longMessageBonus;
        }
        
        // Award XP
        this.awardXP(xp, 'message_sent');
        
        // Track AI mode usage
        if (aiMode) {
            if (!this.dailyStats.messagesAIMode[aiMode]) {
                this.dailyStats.messagesAIMode[aiMode] = 0;
            }
            this.dailyStats.messagesAIMode[aiMode]++;
            
            // Check if user has tried 5 different AI modes
            const uniqueModesCount = Object.keys(this.getAllTimeModesUsed()).length;
            if (uniqueModesCount === 5) {
                this.unlockAchievement('try_5_modes');
            }
        }
        
        // Check for message count achievement
        const messageCount = this.getActionCount('message_sent');
        if (messageCount === 50) {
            this.unlockAchievement('send_50');
        }
        
        // Check for vocabulary quality (simplified implementation)
        const uniqueWords = new Set(message.toLowerCase().split(/\s+/)).size;
        if (uniqueWords > 20) {
            this.checkWordsmithBadge();
        }
        
        // Check time of day badges
        const hour = new Date().getHours();
        if (hour < 7 && !this.user.badges.includes('early_bird')) {
            this.awardBadge('early_bird');
        } else if ((hour >= 0 && hour < 5) && !this.user.badges.includes('night_owl')) {
            this.awardBadge('night_owl');
        }
        
        // Check for first chat achievement
        if (!this.user.achievements.includes('first_chat')) {
            this.unlockAchievement('first_chat');
        }
    }

    /**
     * Track response received from AI
     * @param {string} response - Response content
     */
    trackResponse(response) {
        // Award base XP
        this.awardXP(this.xpConfig.baseResponseXP, 'response_received');
    }

    /**
     * Track feature usage
     * @param {string} featureId - Feature ID
     */
    trackFeatureUse(featureId) {
        // Award XP
        this.awardXP(this.xpConfig.featureUseXP, `feature_${featureId}`);
        
        // Check if all main features have been used
        this.checkFeatureMasterAchievement();
    }

    /**
     * Track new AI mode usage
     * @param {string} modeId - Mode ID
     */
    trackNewMode(modeId) {
        // Check if this is a new mode for the user
        const modesUsed = this.getAllTimeModesUsed();
        const isNewMode = !modesUsed[modeId];
        
        if (isNewMode) {
            // Award XP for trying a new mode
            this.awardXP(this.xpConfig.newModeXP, `new_mode_${modeId}`);
            
            // Check if user has tried 5 different AI modes
            if (Object.keys(modesUsed).length + 1 === 5) {
                this.unlockAchievement('try_5_modes');
            }
        }
        
        // Track mode usage
        if (!this.dailyStats.messagesAIMode[modeId]) {
            this.dailyStats.messagesAIMode[modeId] = 0;
        }
        
        // Save user data
        this.saveUserData();
    }

    /**
     * Track sharing of content
     */
    trackSharing() {
        // Award XP
        this.awardXP(this.xpConfig.shareXP, 'sharing');
        
        // Check for sharing achievement
        const shareCount = this.getActionCount('sharing');
        if (shareCount === 5) {
            this.unlockAchievement('share_5');
        }
    }

    /**
     * Track customization actions
     * @param {string} customizationType - Type of customization
     */
    trackCustomization(customizationType) {
        // Award XP
        this.awardXP(this.xpConfig.customizationXP, `customization_${customizationType}`);
        
        // Check for customization achievement
        const customizationTypes = new Set();
        
        for (const entry of this.user.history) {
            if (entry.type === 'xp_gain' && entry.reason.startsWith('customization_')) {
                customizationTypes.add(entry.reason);
            }
        }
        
        if (customizationTypes.size === 5) {
            this.unlockAchievement('customize_5');
        }
    }

    /**
     * Track feedback provided
     */
    trackFeedback() {
        // Award XP
        this.awardXP(this.xpConfig.feedbackXP, 'feedback');
        
        // Award badge after providing feedback
        this.awardBadge('feedback');
    }

    /**
     * Get the total XP required for a specific level
     * @param {number} level - Level number
     * @returns {number} XP required
     */
    getXPRequiredForLevel(level) {
        // Check if level exists in predefined levels
        const levelDef = this.levels.find(l => l.level === level);
        if (levelDef) {
            return levelDef.xpRequired;
        }
        
        // Otherwise calculate using formula
        return this.xpConfig.levelUpFormula(level);
    }

    /**
     * Get information about a specific level
     * @param {number} level - Level number
     * @returns {Object|null} Level information
     */
    getLevelInfo(level) {
        const levelDef = this.levels.find(l => l.level === level);
        if (!levelDef) {
            if (level > this.levels[this.levels.length - 1].level) {
                // For levels beyond predefined ones
                const highestLevel = this.levels[this.levels.length - 1];
                return {
                    level,
                    name: `Advanced Level ${level}`,
                    xpRequired: this.getXPRequiredForLevel(level),
                    reward: "Experience Points Bonus"
                };
            }
            return null;
        }
        
        return { ...levelDef };
    }

    /**
     * Get progress information for the current level
     * @returns {Object} Progress information
     */
    getLevelProgress() {
        const currentLevel = this.user.level;
        const currentXP = this.user.xp;
        const currentLevelXP = this.getXPRequiredForLevel(currentLevel);
        const nextLevelXP = this.getXPRequiredForLevel(currentLevel + 1);
        
        const xpForCurrentLevel = currentXP - currentLevelXP;
        const xpRequiredForNextLevel = nextLevelXP - currentLevelXP;
        const progress = xpForCurrentLevel / xpRequiredForNextLevel;
        
        return {
            level: currentLevel,
            levelInfo: this.getLevelInfo(currentLevel),
            currentXP,
            currentLevelXP,
            nextLevelXP,
            xpForCurrentLevel,
            xpRequiredForNextLevel,
            xpToNextLevel: nextLevelXP - currentXP,
            progress: Math.min(progress, 1)
        };
    }

    /**
     * Get badge information by ID
     * @param {string} badgeId - Badge ID
     * @returns {Object|null} Badge information
     */
    getBadgeInfo(badgeId) {
        return this.badges.find(b => b.id === badgeId) || null;
    }

    /**
     * Get all badges earned by the user
     * @returns {Array} Array of badge objects
     */
    getEarnedBadges() {
        return this.user.badges.map(badgeId => this.getBadgeInfo(badgeId)).filter(Boolean);
    }

    /**
     * Get achievement information by ID
     * @param {string} achievementId - Achievement ID
     * @returns {Object|null} Achievement information
     */
    getAchievementInfo(achievementId) {
        return this.achievements.find(a => a.id === achievementId) || null;
    }

    /**
     * Get all achievements unlocked by the user
     * @returns {Array} Array of achievement objects
     */
    getUnlockedAchievements() {
        return this.user.achievements.map(id => this.getAchievementInfo(id)).filter(Boolean);
    }

    /**
     * Get all available achievements
     * @param {boolean} includeUnlocked - Whether to include unlocked achievements
     * @returns {Array} Array of achievement objects
     */
    getAllAchievements(includeUnlocked = true) {
        if (includeUnlocked) {
            return this.achievements;
        }
        
        return this.achievements.filter(a => !this.user.achievements.includes(a.id));
    }

    /**
     * Get cumulative count of an action from user history
     * @param {string} actionType - Type of action
     * @returns {number} Action count
     */
    getActionCount(actionType) {
        let count = 0;
        
        // Count from history
        for (const entry of this.user.history) {
            if (entry.type === 'xp_gain' && entry.reason === actionType) {
                count++;
            }
        }
        
        // Add from today's stats if relevant
        if (this.dailyStats.actionsPerformed[actionType]) {
            count += this.dailyStats.actionsPerformed[actionType];
        }
        
        return count;
    }

    /**
     * Get all AI modes used across all time
     * @returns {Object} Map of mode IDs to usage count
     */
    getAllTimeModesUsed() {
        const modes = {};
        
        // Count from history
        for (const entry of this.user.history) {
            if (entry.type === 'xp_gain' && entry.reason.startsWith('new_mode_')) {
                const modeId = entry.reason.replace('new_mode_', '');
                modes[modeId] = 1;
            }
        }
        
        // Add from today's stats
        for (const modeId in this.dailyStats.messagesAIMode) {
            if (!modes[modeId]) {
                modes[modeId] = 0;
            }
            modes[modeId] += this.dailyStats.messagesAIMode[modeId];
        }
        
        return modes;
    }

    /**
     * Check if user qualifies for the wordsmith badge
     */
    checkWordsmithBadge() {
        // Simple implementation - in a real system, would analyze more messages
        if (!this.user.badges.includes('wordsmith')) {
            let wordsmithQualifying = 0;
            
            for (const entry of this.user.history) {
                if (entry.type === 'wordsmith_qualifying') {
                    wordsmithQualifying++;
                }
            }
            
            this.user.history.push({
                timestamp: new Date().toISOString(),
                type: 'wordsmith_qualifying'
            });
            
            if (wordsmithQualifying >= 5) {
                this.awardBadge('wordsmith');
            }
            
            this.saveUserData();
        }
    }

    /**
     * Check for feature master achievement
     */
    checkFeatureMasterAchievement() {
        // Define main features to track
        const mainFeatures = [
            'theme_toggle',
            'ai_voice',
            'chat_export',
            'meme_generator',
            'qr_generator'
        ];
        
        // Count how many main features have been used
        const usedFeatures = new Set();
        
        for (const entry of this.user.history) {
            if (entry.type === 'xp_gain' && entry.reason.startsWith('feature_')) {
                const featureId = entry.reason.replace('feature_', '');
                if (mainFeatures.includes(featureId)) {
                    usedFeatures.add(featureId);
                }
            }
        }
        
        // Check current session feature usage
        for (const action in this.dailyStats.actionsPerformed) {
            if (action.startsWith('feature_')) {
                const featureId = action.replace('feature_', '');
                if (mainFeatures.includes(featureId)) {
                    usedFeatures.add(featureId);
                }
            }
        }
        
        // If all main features used, unlock achievement
        if (usedFeatures.size === mainFeatures.length) {
            this.unlockAchievement('use_all');
        }
    }

    /**
     * Create gamification UI
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
        
        // Create UI container
        const uiContainer = document.createElement('div');
        uiContainer.className = 'gamify-container';
        container.appendChild(uiContainer);
        
        // Create level progress bar
        const progress = this.getLevelProgress();
        
        const levelContainer = document.createElement('div');
        levelContainer.className = 'gamify-level-container';
        uiContainer.appendChild(levelContainer);
        
        const levelInfo = document.createElement('div');
        levelInfo.className = 'gamify-level-info';
        levelContainer.appendChild(levelInfo);
        
        const levelLabel = document.createElement('div');
        levelLabel.className = 'gamify-level-label';
        levelLabel.innerHTML = `Level <span class="gamify-level-number">${progress.level}</span>`;
        levelInfo.appendChild(levelLabel);
        
        const levelName = document.createElement('div');
        levelName.className = 'gamify-level-name';
        levelName.textContent = progress.levelInfo ? progress.levelInfo.name : `Level ${progress.level}`;
        levelInfo.appendChild(levelName);
        
        const levelXP = document.createElement('div');
        levelXP.className = 'gamify-level-xp';
        levelXP.textContent = `${progress.xpForCurrentLevel} / ${progress.xpRequiredForNextLevel} XP`;
        levelInfo.appendChild(levelXP);
        
        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'gamify-progress-container';
        levelContainer.appendChild(progressBarContainer);
        
        const progressBar = document.createElement('div');
        progressBar.className = 'gamify-progress-bar';
        progressBar.style.width = `${progress.progress * 100}%`;
        progressBarContainer.appendChild(progressBar);
        
        // Create tabs for badges and achievements
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'gamify-tabs-container';
        uiContainer.appendChild(tabsContainer);
        
        const badgesTab = document.createElement('button');
        badgesTab.className = 'gamify-tab active';
        badgesTab.textContent = 'Badges';
        tabsContainer.appendChild(badgesTab);
        
        const achievementsTab = document.createElement('button');
        achievementsTab.className = 'gamify-tab';
        achievementsTab.textContent = 'Achievements';
        tabsContainer.appendChild(achievementsTab);
        
        const historyTab = document.createElement('button');
        historyTab.className = 'gamify-tab';
        historyTab.textContent = 'History';
        tabsContainer.appendChild(historyTab);
        
        // Create content containers
        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'gamify-content-container active';
        uiContainer.appendChild(badgesContainer);
        
        const achievementsContainer = document.createElement('div');
        achievementsContainer.className = 'gamify-content-container';
        uiContainer.appendChild(achievementsContainer);
        
        const historyContainer = document.createElement('div');
        historyContainer.className = 'gamify-content-container';
        uiContainer.appendChild(historyContainer);
        
        // Tab switching logic
        badgesTab.addEventListener('click', () => {
            badgesTab.classList.add('active');
            achievementsTab.classList.remove('active');
            historyTab.classList.remove('active');
            
            badgesContainer.classList.add('active');
            achievementsContainer.classList.remove('active');
            historyContainer.classList.remove('active');
        });
        
        achievementsTab.addEventListener('click', () => {
            badgesTab.classList.remove('active');
            achievementsTab.classList.add('active');
            historyTab.classList.remove('active');
            
            badgesContainer.classList.remove('active');
            achievementsContainer.classList.add('active');
            historyContainer.classList.remove('active');
        });
        
        historyTab.addEventListener('click', () => {
            badgesTab.classList.remove('active');
            achievementsTab.classList.remove('active');
            historyTab.classList.add('active');
            
            badgesContainer.classList.remove('active');
            achievementsContainer.classList.remove('active');
            historyContainer.classList.add('active');
        });
        
        // Populate badges
        const earnedBadges = this.getEarnedBadges();
        const badgesGrid = document.createElement('div');
        badgesGrid.className = 'gamify-badges-grid';
        badgesContainer.appendChild(badgesGrid);
        
        if (earnedBadges.length === 0) {
            const noBadges = document.createElement('div');
            noBadges.className = 'gamify-no-items';
            noBadges.textContent = 'No badges earned yet. Keep using JAAT-AI to earn badges!';
            badgesContainer.appendChild(noBadges);
        } else {
            earnedBadges.forEach(badge => {
                const badgeItem = document.createElement('div');
                badgeItem.className = 'gamify-badge-item';
                
                const badgeIcon = document.createElement('div');
                badgeIcon.className = 'gamify-badge-icon';
                const icon = document.createElement('i');
                icon.className = badge.icon;
                badgeIcon.appendChild(icon);
                badgeItem.appendChild(badgeIcon);
                
                const badgeInfo = document.createElement('div');
                badgeInfo.className = 'gamify-badge-info';
                
                const badgeName = document.createElement('div');
                badgeName.className = 'gamify-badge-name';
                badgeName.textContent = badge.name;
                badgeInfo.appendChild(badgeName);
                
                const badgeDescription = document.createElement('div');
                badgeDescription.className = 'gamify-badge-description';
                badgeDescription.textContent = badge.description;
                badgeInfo.appendChild(badgeDescription);
                
                badgeItem.appendChild(badgeInfo);
                badgesGrid.appendChild(badgeItem);
            });
        }
        
        // Populate achievements
        const achievements = this.getAllAchievements();
        const unlockedAchievements = this.getUnlockedAchievements();
        
        const achievementsGrid = document.createElement('div');
        achievementsGrid.className = 'gamify-achievements-grid';
        achievementsContainer.appendChild(achievementsGrid);
        
        if (achievements.length === 0) {
            const noAchievements = document.createElement('div');
            noAchievements.className = 'gamify-no-items';
            noAchievements.textContent = 'No achievements available.';
            achievementsContainer.appendChild(noAchievements);
        } else {
            achievements.forEach(achievement => {
                const isUnlocked = this.user.achievements.includes(achievement.id);
                
                const achievementItem = document.createElement('div');
                achievementItem.className = `gamify-achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
                
                const achievementStatus = document.createElement('div');
                achievementStatus.className = 'gamify-achievement-status';
                achievementStatus.innerHTML = isUnlocked 
                    ? '<i class="ri-checkbox-circle-fill"></i>' 
                    : '<i class="ri-lock-line"></i>';
                achievementItem.appendChild(achievementStatus);
                
                const achievementInfo = document.createElement('div');
                achievementInfo.className = 'gamify-achievement-info';
                
                const achievementName = document.createElement('div');
                achievementName.className = 'gamify-achievement-name';
                achievementName.textContent = achievement.name;
                achievementInfo.appendChild(achievementName);
                
                const achievementDescription = document.createElement('div');
                achievementDescription.className = 'gamify-achievement-description';
                achievementDescription.textContent = achievement.description;
                achievementInfo.appendChild(achievementDescription);
                
                const achievementReward = document.createElement('div');
                achievementReward.className = 'gamify-achievement-reward';
                achievementReward.textContent = `Reward: ${achievement.xpReward} XP`;
                if (achievement.badge) {
                    const badge = this.getBadgeInfo(achievement.badge);
                    if (badge) {
                        achievementReward.textContent += ` + ${badge.name} Badge`;
                    }
                }
                achievementInfo.appendChild(achievementReward);
                
                achievementItem.appendChild(achievementInfo);
                achievementsGrid.appendChild(achievementItem);
            });
        }
        
        // Populate history
        const historyList = document.createElement('div');
        historyList.className = 'gamify-history-list';
        historyContainer.appendChild(historyList);
        
        // Get last 20 history items, reverse to show newest first
        const recentHistory = [...this.user.history].reverse().slice(0, 20);
        
        if (recentHistory.length === 0) {
            const noHistory = document.createElement('div');
            noHistory.className = 'gamify-no-items';
            noHistory.textContent = 'No activity recorded yet.';
            historyList.appendChild(noHistory);
        } else {
            recentHistory.forEach(entry => {
                const historyItem = document.createElement('div');
                historyItem.className = 'gamify-history-item';
                
                const entryDate = new Date(entry.timestamp);
                const formattedDate = entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString();
                
                const historyTime = document.createElement('div');
                historyTime.className = 'gamify-history-time';
                historyTime.textContent = formattedDate;
                historyItem.appendChild(historyTime);
                
                const historyDescription = document.createElement('div');
                historyDescription.className = 'gamify-history-description';
                
                // Format description based on event type
                let description = '';
                switch (entry.type) {
                    case 'xp_gain':
                        description = `Earned ${entry.amount} XP for ${entry.reason.replace(/_/g, ' ')}`;
                        break;
                    case 'level_up':
                        description = `Leveled up from ${entry.from} to ${entry.to}`;
                        break;
                    case 'badge_earned':
                        description = `Earned the ${entry.badgeName} badge`;
                        break;
                    case 'achievement_unlocked':
                        description = `Unlocked achievement: ${entry.achievementName}`;
                        break;
                    default:
                        description = JSON.stringify(entry);
                }
                
                historyDescription.textContent = description;
                historyItem.appendChild(historyDescription);
                
                historyList.appendChild(historyItem);
            });
        }
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles for the UI
     */
    addUIStyles() {
        const styleId = 'gamify-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .gamify-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
            }
            
            .gamify-level-container {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }
            
            .gamify-level-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .gamify-level-label {
                font-size: 1rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .gamify-level-number {
                font-weight: 700;
                color: var(--accent-primary, #7c3aed);
                font-size: 1.25rem;
            }
            
            .gamify-level-name {
                font-weight: 600;
                font-size: 1.125rem;
            }
            
            .gamify-level-xp {
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .gamify-progress-container {
                width: 100%;
                height: 0.5rem;
                background-color: var(--bg-primary, #0d1117);
                border-radius: 0.25rem;
                overflow: hidden;
            }
            
            .gamify-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, var(--accent-primary, #7c3aed), var(--accent-secondary, #8b5cf6));
                border-radius: 0.25rem;
                transition: width 0.5s ease;
            }
            
            .gamify-tabs-container {
                display: flex;
                margin-bottom: 1rem;
                border-bottom: 1px solid var(--border-color, #30363d);
            }
            
            .gamify-tab {
                background: none;
                border: none;
                padding: 0.75rem 1rem;
                cursor: pointer;
                color: var(--text-secondary, #8b949e);
                font-weight: 500;
                font-size: 0.875rem;
                position: relative;
            }
            
            .gamify-tab.active {
                color: var(--accent-primary, #7c3aed);
            }
            
            .gamify-tab.active::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: var(--accent-primary, #7c3aed);
            }
            
            .gamify-content-container {
                display: none;
                padding: 0.5rem 0;
            }
            
            .gamify-content-container.active {
                display: block;
            }
            
            .gamify-badges-grid,
            .gamify-achievements-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
            }
            
            .gamify-badge-item,
            .gamify-achievement-item {
                display: flex;
                gap: 0.75rem;
                padding: 0.75rem;
                background-color: var(--bg-primary, #0d1117);
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                transition: all 0.2s ease;
            }
            
            .gamify-badge-item:hover,
            .gamify-achievement-item:hover {
                transform: translateY(-2px);
                border-color: var(--accent-primary, #7c3aed);
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
            }
            
            .gamify-badge-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--accent-primary, #7c3aed), var(--accent-secondary, #8b5cf6));
                color: white;
                font-size: 1.25rem;
                flex-shrink: 0;
            }
            
            .gamify-badge-info,
            .gamify-achievement-info {
                flex: 1;
            }
            
            .gamify-badge-name,
            .gamify-achievement-name {
                font-weight: 600;
                margin-bottom: 0.25rem;
            }
            
            .gamify-badge-description,
            .gamify-achievement-description {
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .gamify-achievement-reward {
                font-size: 0.75rem;
                color: var(--success-color, #10b981);
                margin-top: 0.25rem;
            }
            
            .gamify-achievement-status {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                font-size: 1.25rem;
                flex-shrink: 0;
            }
            
            .gamify-achievement-item.unlocked .gamify-achievement-status {
                background: linear-gradient(135deg, var(--success-color, #10b981), var(--info-color, #3b82f6));
                color: white;
            }
            
            .gamify-achievement-item.locked .gamify-achievement-status {
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                color: var(--text-secondary, #8b949e);
            }
            
            .gamify-achievement-item.locked {
                opacity: 0.75;
            }
            
            .gamify-history-list {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .gamify-history-item {
                padding: 0.75rem;
                background-color: var(--bg-primary, #0d1117);
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
            }
            
            .gamify-history-time {
                font-size: 0.75rem;
                color: var(--text-secondary, #8b949e);
                margin-bottom: 0.25rem;
            }
            
            .gamify-history-description {
                font-size: 0.875rem;
            }
            
            .gamify-no-items {
                text-align: center;
                padding: 2rem;
                color: var(--text-secondary, #8b949e);
                font-style: italic;
            }
            
            @media (max-width: 640px) {
                .gamify-level-info {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .gamify-badges-grid,
                .gamify-achievements-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GamifyXP };
} else {
    // Add to global scope for browser usage
    window.GamifyXP = GamifyXP;
}
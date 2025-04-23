/**
 * JAAT-AI Voice Feature
 * Voice recognition and text-to-speech capabilities for the AI
 */

class AIVoice {
    constructor() {
        this.isSpeechRecognitionSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
        this.isSpeechSynthesisSupported = 'speechSynthesis' in window;
        
        this.recognition = null;
        this.synth = window.speechSynthesis;
        
        this.isListening = false;
        this.isSpeaking = false;
        this.isPaused = false;
        
        this.voices = [];
        this.selectedVoice = null;
        
        this.config = {
            voicePromptBeep: true,
            continuousListening: false,
            defaultVolume: 1.0,
            defaultRate: 1.0,
            defaultPitch: 1.0,
            defaultVoiceIndex: 0,
            autoStop: true,
            interimResults: true,
            maxSpeechTime: 20000,
            language: 'en-US'
        };
        
        // Speech recognition configurations
        this.recognitionConfig = {
            onStart: null,
            onResult: null,
            onEnd: null,
            onError: null
        };
        
        // Speech synthesis configurations
        this.synthesisConfig = {
            onStart: null,
            onEnd: null,
            onPause: null,
            onResume: null,
            onError: null,
            onBoundary: null
        };
    }

    /**
     * Initialize the AI voice features
     * @param {Object} options - Custom configuration options
     * @returns {Promise<AIVoice>} This instance
     */
    async init(options = {}) {
        // Apply custom options
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        if (options.recognitionConfig) {
            this.recognitionConfig = { ...this.recognitionConfig, ...options.recognitionConfig };
        }
        
        if (options.synthesisConfig) {
            this.synthesisConfig = { ...this.synthesisConfig, ...options.synthesisConfig };
        }
        
        // Initialize speech recognition if supported
        if (this.isSpeechRecognitionSupported) {
            this.initSpeechRecognition();
        } else {
            console.warn('Speech recognition is not supported in this browser');
        }
        
        // Initialize speech synthesis if supported
        if (this.isSpeechSynthesisSupported) {
            await this.initSpeechSynthesis();
        } else {
            console.warn('Speech synthesis is not supported in this browser');
        }
        
        console.log('AI Voice initialized');
        return this;
    }

    /**
     * Initialize speech recognition
     */
    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        // Set recognition properties
        this.recognition.continuous = this.config.continuousListening;
        this.recognition.interimResults = this.config.interimResults;
        this.recognition.lang = this.config.language;
        this.recognition.maxAlternatives = 1;
        
        // Set up event handlers
        this.recognition.onstart = () => {
            this.isListening = true;
            console.log('Speech recognition started');
            
            if (typeof this.recognitionConfig.onStart === 'function') {
                this.recognitionConfig.onStart();
            }
            
            // Auto-stop after maximum time
            if (this.config.autoStop && this.config.maxSpeechTime > 0) {
                this.recognitionTimeout = setTimeout(() => {
                    this.stopListening();
                }, this.config.maxSpeechTime);
            }
        };
        
        this.recognition.onresult = (event) => {
            const resultIndex = event.resultIndex;
            const transcript = event.results[resultIndex][0].transcript;
            const isFinal = event.results[resultIndex].isFinal;
            
            console.log(`Speech recognized: ${transcript} (${isFinal ? 'final' : 'interim'})`);
            
            if (typeof this.recognitionConfig.onResult === 'function') {
                this.recognitionConfig.onResult(transcript, isFinal, event);
            }
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            console.log('Speech recognition ended');
            
            if (this.recognitionTimeout) {
                clearTimeout(this.recognitionTimeout);
                this.recognitionTimeout = null;
            }
            
            if (typeof this.recognitionConfig.onEnd === 'function') {
                this.recognitionConfig.onEnd();
            }
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            
            if (typeof this.recognitionConfig.onError === 'function') {
                this.recognitionConfig.onError(event);
            }
        };
    }

    /**
     * Initialize speech synthesis
     * @returns {Promise<void>}
     */
    async initSpeechSynthesis() {
        // Get available voices
        if (this.synth.getVoices().length > 0) {
            this.voices = this.synth.getVoices();
            this.selectDefaultVoice();
        } else {
            // Wait for voices to be loaded
            try {
                this.voices = await new Promise((resolve) => {
                    const voicesChangedHandler = () => {
                        const voices = this.synth.getVoices();
                        if (voices.length > 0) {
                            this.synth.removeEventListener('voiceschanged', voicesChangedHandler);
                            resolve(voices);
                        }
                    };
                    
                    this.synth.addEventListener('voiceschanged', voicesChangedHandler);
                    
                    // Also set a timeout in case voices don't load
                    setTimeout(() => {
                        this.synth.removeEventListener('voiceschanged', voicesChangedHandler);
                        resolve(this.synth.getVoices());
                    }, 1000);
                });
                
                this.selectDefaultVoice();
            } catch (error) {
                console.warn('Error loading voices:', error);
            }
        }
    }

    /**
     * Select default voice based on configuration
     */
    selectDefaultVoice() {
        // Filter for voices in the user's language
        const languageVoices = this.voices.filter(voice => voice.lang.includes(this.config.language.split('-')[0]));
        
        if (languageVoices.length > 0) {
            // Try to find a voice that sounds natural
            const preferredVoice = languageVoices.find(voice => /premium|enhanced|neural|natural/i.test(voice.name));
            
            if (preferredVoice) {
                this.selectedVoice = preferredVoice;
            } else {
                // Default to first available voice in the language
                this.selectedVoice = languageVoices[0];
            }
        } else if (this.voices.length > 0) {
            // Fallback to configured default voice index
            const index = Math.min(this.config.defaultVoiceIndex, this.voices.length - 1);
            this.selectedVoice = this.voices[index];
        } else {
            console.warn('No voices available for speech synthesis');
        }
    }

    /**
     * Start listening for speech input
     * @returns {Promise<boolean>} Whether listening started successfully
     */
    startListening() {
        if (!this.isSpeechRecognitionSupported || !this.recognition) {
            console.warn('Speech recognition is not supported in this browser');
            return Promise.resolve(false);
        }
        
        if (this.isListening) {
            console.warn('Already listening');
            return Promise.resolve(true);
        }
        
        // Play a beep sound if configured
        if (this.config.voicePromptBeep) {
            this.playBeepSound();
        }
        
        return new Promise((resolve) => {
            // Wait a short time for the beep to finish
            setTimeout(() => {
                try {
                    this.recognition.start();
                    resolve(true);
                } catch (error) {
                    console.error('Error starting speech recognition:', error);
                    resolve(false);
                }
            }, this.config.voicePromptBeep ? 300 : 0);
        });
    }

    /**
     * Stop listening for speech input
     */
    stopListening() {
        if (!this.isSpeechRecognitionSupported || !this.recognition || !this.isListening) {
            return;
        }
        
        try {
            this.recognition.stop();
        } catch (error) {
            console.error('Error stopping speech recognition:', error);
        }
    }

    /**
     * Toggle listening state
     * @returns {Promise<boolean>} New listening state
     */
    async toggleListening() {
        if (this.isListening) {
            this.stopListening();
            return false;
        } else {
            return this.startListening();
        }
    }

    /**
     * Speak text using speech synthesis
     * @param {string} text - Text to speak
     * @param {Object} options - Options for speech synthesis
     * @returns {Promise<boolean>} Whether speech started successfully
     */
    speak(text, options = {}) {
        if (!this.isSpeechSynthesisSupported || !this.synth) {
            console.warn('Speech synthesis is not supported in this browser');
            return Promise.resolve(false);
        }
        
        // Cancel any ongoing speech
        this.cancelSpeech();
        
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set voice
        if (options.voice) {
            utterance.voice = options.voice;
        } else if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }
        
        // Set other properties
        utterance.volume = options.volume !== undefined ? options.volume : this.config.defaultVolume;
        utterance.rate = options.rate !== undefined ? options.rate : this.config.defaultRate;
        utterance.pitch = options.pitch !== undefined ? options.pitch : this.config.defaultPitch;
        utterance.lang = options.language || this.config.language;
        
        // Set up event handlers
        utterance.onstart = (event) => {
            this.isSpeaking = true;
            console.log('Speech synthesis started');
            
            if (typeof this.synthesisConfig.onStart === 'function') {
                this.synthesisConfig.onStart(event);
            }
        };
        
        utterance.onend = (event) => {
            this.isSpeaking = false;
            this.isPaused = false;
            console.log('Speech synthesis ended');
            
            if (typeof this.synthesisConfig.onEnd === 'function') {
                this.synthesisConfig.onEnd(event);
            }
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            
            if (typeof this.synthesisConfig.onError === 'function') {
                this.synthesisConfig.onError(event);
            }
        };
        
        utterance.onboundary = (event) => {
            if (typeof this.synthesisConfig.onBoundary === 'function') {
                this.synthesisConfig.onBoundary(event);
            }
        };
        
        // Start speaking
        return new Promise((resolve) => {
            try {
                this.synth.speak(utterance);
                resolve(true);
            } catch (error) {
                console.error('Error starting speech synthesis:', error);
                resolve(false);
            }
        });
    }

    /**
     * Pause ongoing speech
     */
    pauseSpeech() {
        if (!this.isSpeechSynthesisSupported || !this.synth || !this.isSpeaking || this.isPaused) {
            return;
        }
        
        try {
            this.synth.pause();
            this.isPaused = true;
            
            if (typeof this.synthesisConfig.onPause === 'function') {
                this.synthesisConfig.onPause();
            }
        } catch (error) {
            console.error('Error pausing speech synthesis:', error);
        }
    }

    /**
     * Resume paused speech
     */
    resumeSpeech() {
        if (!this.isSpeechSynthesisSupported || !this.synth || !this.isPaused) {
            return;
        }
        
        try {
            this.synth.resume();
            this.isPaused = false;
            
            if (typeof this.synthesisConfig.onResume === 'function') {
                this.synthesisConfig.onResume();
            }
        } catch (error) {
            console.error('Error resuming speech synthesis:', error);
        }
    }

    /**
     * Cancel ongoing speech
     */
    cancelSpeech() {
        if (!this.isSpeechSynthesisSupported || !this.synth) {
            return;
        }
        
        try {
            this.synth.cancel();
            this.isSpeaking = false;
            this.isPaused = false;
        } catch (error) {
            console.error('Error canceling speech synthesis:', error);
        }
    }

    /**
     * Toggle speech pause/resume
     */
    toggleSpeechPause() {
        if (this.isPaused) {
            this.resumeSpeech();
        } else if (this.isSpeaking) {
            this.pauseSpeech();
        }
    }

    /**
     * Get all available voices
     * @returns {SpeechSynthesisVoice[]} Available voices
     */
    getVoices() {
        return this.voices;
    }

    /**
     * Get filtered voices by language
     * @param {string} language - Language code (e.g., 'en-US', 'es-ES')
     * @returns {SpeechSynthesisVoice[]} Filtered voices
     */
    getVoicesByLanguage(language) {
        const langCode = language.split('-')[0].toLowerCase();
        return this.voices.filter(voice => voice.lang.toLowerCase().startsWith(langCode));
    }

    /**
     * Set selected voice by index
     * @param {number} index - Voice index
     * @returns {boolean} Whether voice was set successfully
     */
    setVoiceByIndex(index) {
        if (index >= 0 && index < this.voices.length) {
            this.selectedVoice = this.voices[index];
            return true;
        }
        return false;
    }

    /**
     * Set selected voice by name
     * @param {string} name - Voice name
     * @returns {boolean} Whether voice was set successfully
     */
    setVoiceByName(name) {
        const voice = this.voices.find(v => v.name === name);
        if (voice) {
            this.selectedVoice = voice;
            return true;
        }
        return false;
    }

    /**
     * Play a beep sound to indicate the start of voice input
     */
    playBeepSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 880; // A5 note
            gainNode.gain.value = 0.1;
            
            const now = audioContext.currentTime;
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            
            // Gradual decrease in volume
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        } catch (error) {
            console.warn('Error playing beep sound:', error);
        }
    }

    /**
     * Create speech recognition UI
     * @param {HTMLElement} container - Container element
     * @param {Object} options - UI options
     * @returns {HTMLElement} Created UI
     */
    createUI(container, options = {}) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        
        if (!container) {
            console.error('Container element not found');
            return null;
        }
        
        // Default options
        const defaultOptions = {
            showVoiceSelector: true,
            showSpeedControl: true,
            showVolumeControl: true,
            showPitchControl: false,
            compact: false,
            theme: 'default' // 'default', 'dark', 'light'
        };
        
        const uiOptions = { ...defaultOptions, ...options };
        
        // Create UI container
        const uiContainer = document.createElement('div');
        uiContainer.className = `voice-control-ui ${uiOptions.compact ? 'compact' : ''} theme-${uiOptions.theme}`;
        container.appendChild(uiContainer);
        
        // Create voice button
        const voiceInputContainer = document.createElement('div');
        voiceInputContainer.className = 'voice-input-container';
        uiContainer.appendChild(voiceInputContainer);
        
        const voiceButton = document.createElement('button');
        voiceButton.className = 'voice-input-button';
        voiceButton.innerHTML = '<i class="ri-mic-line"></i>';
        voiceButton.setAttribute('aria-label', 'Voice Input');
        voiceButton.setAttribute('title', 'Click to start/stop voice input');
        voiceInputContainer.appendChild(voiceButton);
        
        // Voice status indicator
        const voiceStatus = document.createElement('div');
        voiceStatus.className = 'voice-status';
        voiceStatus.textContent = 'Click to speak';
        voiceInputContainer.appendChild(voiceStatus);
        
        // Voice button click handler
        voiceButton.addEventListener('click', async () => {
            const result = await this.toggleListening();
            
            if (result) {
                voiceButton.classList.add('listening');
                voiceStatus.textContent = 'Listening...';
                
                // Update UI when recognition ends
                const originalOnEnd = this.recognitionConfig.onEnd;
                this.recognitionConfig.onEnd = () => {
                    voiceButton.classList.remove('listening');
                    voiceStatus.textContent = 'Click to speak';
                    
                    if (originalOnEnd) originalOnEnd();
                };
            } else {
                voiceButton.classList.remove('listening');
                voiceStatus.textContent = 'Click to speak';
            }
        });
        
        // Create voice controls
        if (this.isSpeechSynthesisSupported) {
            const voiceControlsContainer = document.createElement('div');
            voiceControlsContainer.className = 'voice-controls-container';
            uiContainer.appendChild(voiceControlsContainer);
            
            // Voice selector
            if (uiOptions.showVoiceSelector && this.voices.length > 0) {
                const voiceSelectorGroup = document.createElement('div');
                voiceSelectorGroup.className = 'voice-control-group';
                voiceControlsContainer.appendChild(voiceSelectorGroup);
                
                const voiceSelectorLabel = document.createElement('label');
                voiceSelectorLabel.htmlFor = 'voice-selector';
                voiceSelectorLabel.textContent = 'Voice:';
                voiceSelectorGroup.appendChild(voiceSelectorLabel);
                
                const voiceSelector = document.createElement('select');
                voiceSelector.className = 'voice-selector';
                voiceSelector.id = 'voice-selector';
                voiceSelectorGroup.appendChild(voiceSelector);
                
                // Add voices to selector
                this.voices.forEach((voice, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = `${voice.name} (${voice.lang})`;
                    
                    if (this.selectedVoice && voice.name === this.selectedVoice.name) {
                        option.selected = true;
                    }
                    
                    voiceSelector.appendChild(option);
                });
                
                // Voice selector change handler
                voiceSelector.addEventListener('change', () => {
                    const selectedIndex = parseInt(voiceSelector.value, 10);
                    this.setVoiceByIndex(selectedIndex);
                });
            }
            
            // Speed control
            if (uiOptions.showSpeedControl) {
                const speedControlGroup = document.createElement('div');
                speedControlGroup.className = 'voice-control-group';
                voiceControlsContainer.appendChild(speedControlGroup);
                
                const speedLabel = document.createElement('label');
                speedLabel.htmlFor = 'voice-speed';
                speedLabel.textContent = 'Speed:';
                speedControlGroup.appendChild(speedLabel);
                
                const speedControl = document.createElement('input');
                speedControl.type = 'range';
                speedControl.className = 'voice-speed';
                speedControl.id = 'voice-speed';
                speedControl.min = '0.5';
                speedControl.max = '2';
                speedControl.step = '0.1';
                speedControl.value = this.config.defaultRate.toString();
                speedControlGroup.appendChild(speedControl);
                
                const speedValue = document.createElement('span');
                speedValue.className = 'voice-control-value';
                speedValue.textContent = this.config.defaultRate.toString();
                speedControlGroup.appendChild(speedValue);
                
                // Speed control input handler
                speedControl.addEventListener('input', () => {
                    const rate = parseFloat(speedControl.value);
                    this.config.defaultRate = rate;
                    speedValue.textContent = rate.toFixed(1);
                });
            }
            
            // Volume control
            if (uiOptions.showVolumeControl) {
                const volumeControlGroup = document.createElement('div');
                volumeControlGroup.className = 'voice-control-group';
                voiceControlsContainer.appendChild(volumeControlGroup);
                
                const volumeLabel = document.createElement('label');
                volumeLabel.htmlFor = 'voice-volume';
                volumeLabel.textContent = 'Volume:';
                volumeControlGroup.appendChild(volumeLabel);
                
                const volumeControl = document.createElement('input');
                volumeControl.type = 'range';
                volumeControl.className = 'voice-volume';
                volumeControl.id = 'voice-volume';
                volumeControl.min = '0';
                volumeControl.max = '1';
                volumeControl.step = '0.1';
                volumeControl.value = this.config.defaultVolume.toString();
                volumeControlGroup.appendChild(volumeControl);
                
                const volumeValue = document.createElement('span');
                volumeValue.className = 'voice-control-value';
                volumeValue.textContent = this.config.defaultVolume.toString();
                volumeControlGroup.appendChild(volumeValue);
                
                // Volume control input handler
                volumeControl.addEventListener('input', () => {
                    const volume = parseFloat(volumeControl.value);
                    this.config.defaultVolume = volume;
                    volumeValue.textContent = volume.toFixed(1);
                });
            }
            
            // Pitch control
            if (uiOptions.showPitchControl) {
                const pitchControlGroup = document.createElement('div');
                pitchControlGroup.className = 'voice-control-group';
                voiceControlsContainer.appendChild(pitchControlGroup);
                
                const pitchLabel = document.createElement('label');
                pitchLabel.htmlFor = 'voice-pitch';
                pitchLabel.textContent = 'Pitch:';
                pitchControlGroup.appendChild(pitchLabel);
                
                const pitchControl = document.createElement('input');
                pitchControl.type = 'range';
                pitchControl.className = 'voice-pitch';
                pitchControl.id = 'voice-pitch';
                pitchControl.min = '0.5';
                pitchControl.max = '2';
                pitchControl.step = '0.1';
                pitchControl.value = this.config.defaultPitch.toString();
                pitchControlGroup.appendChild(pitchControl);
                
                const pitchValue = document.createElement('span');
                pitchValue.className = 'voice-control-value';
                pitchValue.textContent = this.config.defaultPitch.toString();
                pitchControlGroup.appendChild(pitchValue);
                
                // Pitch control input handler
                pitchControl.addEventListener('input', () => {
                    const pitch = parseFloat(pitchControl.value);
                    this.config.defaultPitch = pitch;
                    pitchValue.textContent = pitch.toFixed(1);
                });
            }
            
            // Speech control buttons
            const speechButtonsContainer = document.createElement('div');
            speechButtonsContainer.className = 'speech-buttons-container';
            voiceControlsContainer.appendChild(speechButtonsContainer);
            
            // Play/pause button
            const playPauseButton = document.createElement('button');
            playPauseButton.className = 'speech-control-button play-pause-button';
            playPauseButton.innerHTML = '<i class="ri-play-fill"></i>';
            playPauseButton.setAttribute('aria-label', 'Play/Pause Speech');
            playPauseButton.setAttribute('title', 'Play/Pause Speech');
            playPauseButton.disabled = true; // Disabled by default
            speechButtonsContainer.appendChild(playPauseButton);
            
            // Stop button
            const stopButton = document.createElement('button');
            stopButton.className = 'speech-control-button stop-button';
            stopButton.innerHTML = '<i class="ri-stop-fill"></i>';
            stopButton.setAttribute('aria-label', 'Stop Speech');
            stopButton.setAttribute('title', 'Stop Speech');
            stopButton.disabled = true; // Disabled by default
            speechButtonsContainer.appendChild(stopButton);
            
            // Play/pause button click handler
            playPauseButton.addEventListener('click', () => {
                if (this.isPaused) {
                    this.resumeSpeech();
                    playPauseButton.innerHTML = '<i class="ri-pause-fill"></i>';
                } else if (this.isSpeaking) {
                    this.pauseSpeech();
                    playPauseButton.innerHTML = '<i class="ri-play-fill"></i>';
                }
            });
            
            // Stop button click handler
            stopButton.addEventListener('click', () => {
                this.cancelSpeech();
                playPauseButton.innerHTML = '<i class="ri-play-fill"></i>';
                playPauseButton.disabled = true;
                stopButton.disabled = true;
            });
            
            // Update speech controls when speech starts/ends
            const originalOnStart = this.synthesisConfig.onStart;
            this.synthesisConfig.onStart = (event) => {
                playPauseButton.disabled = false;
                stopButton.disabled = false;
                playPauseButton.innerHTML = '<i class="ri-pause-fill"></i>';
                
                if (originalOnStart) originalOnStart(event);
            };
            
            const originalOnEnd = this.synthesisConfig.onEnd;
            this.synthesisConfig.onEnd = (event) => {
                playPauseButton.disabled = true;
                stopButton.disabled = true;
                playPauseButton.innerHTML = '<i class="ri-play-fill"></i>';
                
                if (originalOnEnd) originalOnEnd(event);
            };
        }
        
        // Add CSS styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles for the UI
     */
    addUIStyles() {
        const styleId = 'voice-ui-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .voice-control-ui {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #f8f9fa);
                border-radius: var(--radius, 8px);
                padding: 15px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                margin: 10px 0;
                width: 100%;
                box-sizing: border-box;
            }
            
            .voice-control-ui.theme-dark {
                background-color: var(--dm-background-soft, #1e293b);
                color: var(--dm-foreground, #f8fafc);
                border: 1px solid var(--dm-border, #334155);
            }
            
            .voice-control-ui.theme-light {
                background-color: var(--bg-secondary, #f8f9fa);
                color: var(--text-primary, #1e293b);
                border: 1px solid var(--border-color, #e2e8f0);
            }
            
            .voice-control-ui.compact {
                padding: 8px;
            }
            
            .voice-input-container {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
            }
            
            .voice-input-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--accent-primary, #6366f1);
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                transition: all 0.2s ease;
            }
            
            .voice-input-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                background-color: var(--accent-hover, #4f46e5);
            }
            
            .voice-input-button.listening {
                animation: pulse 1.5s infinite;
                background-color: var(--error-color, #ef4444);
            }
            
            .voice-status {
                margin-left: 15px;
                font-size: 16px;
                color: var(--text-secondary, #64748b);
            }
            
            .voice-controls-container {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .voice-control-group {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .voice-control-group label {
                min-width: 60px;
                font-size: 14px;
                color: var(--text-secondary, #64748b);
            }
            
            .voice-selector {
                flex: 1;
                padding: 6px 8px;
                border-radius: var(--radius-sm, 4px);
                border: 1px solid var(--border-color, #e2e8f0);
                background-color: var(--bg-primary, #ffffff);
                color: var(--text-primary, #1e293b);
                font-size: 14px;
            }
            
            .theme-dark .voice-selector {
                background-color: var(--dm-background, #0f172a);
                color: var(--dm-foreground, #f8fafc);
                border-color: var(--dm-border, #334155);
            }
            
            .voice-speed, .voice-volume, .voice-pitch {
                flex: 1;
                -webkit-appearance: none;
                width: 100%;
                height: 6px;
                border-radius: 3px;
                background: var(--border-color, #e2e8f0);
                outline: none;
            }
            
            .theme-dark .voice-speed, 
            .theme-dark .voice-volume, 
            .theme-dark .voice-pitch {
                background: var(--dm-border, #334155);
            }
            
            .voice-speed::-webkit-slider-thumb,
            .voice-volume::-webkit-slider-thumb,
            .voice-pitch::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: var(--accent-primary, #6366f1);
                cursor: pointer;
            }
            
            .voice-control-value {
                min-width: 30px;
                text-align: center;
                font-size: 14px;
                color: var(--text-secondary, #64748b);
            }
            
            .speech-buttons-container {
                display: flex;
                gap: 10px;
                margin-top: 10px;
            }
            
            .speech-control-button {
                padding: 8px 15px;
                border-radius: var(--radius-sm, 4px);
                border: 1px solid var(--border-color, #e2e8f0);
                background-color: var(--bg-primary, #ffffff);
                color: var(--text-primary, #1e293b);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                transition: all 0.2s ease;
            }
            
            .theme-dark .speech-control-button {
                background-color: var(--dm-background, #0f172a);
                color: var(--dm-foreground, #f8fafc);
                border-color: var(--dm-border, #334155);
            }
            
            .speech-control-button:hover:not(:disabled) {
                background-color: var(--accent-primary, #6366f1);
                color: white;
                border-color: var(--accent-primary, #6366f1);
            }
            
            .speech-control-button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
                }
                70% {
                    transform: scale(1.05);
                    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
                }
                100% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
                }
            }
            
            .compact .voice-input-button {
                width: 40px;
                height: 40px;
                font-size: 18px;
            }
            
            .compact .voice-status {
                font-size: 14px;
            }
            
            .compact .voice-control-group {
                gap: 5px;
            }
            
            .compact .voice-control-group label {
                min-width: 50px;
                font-size: 12px;
            }
            
            .compact .voice-selector,
            .compact .speech-control-button {
                padding: 4px 8px;
                font-size: 14px;
            }
            
            .compact .voice-control-value {
                font-size: 12px;
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIVoice };
} else {
    // Add to global scope for browser usage
    window.AIVoice = AIVoice;
}
/**
 * JAAT-AI Voice Recognition Feature
 * Provides advanced voice-to-text and text-to-speech capabilities
 */

class VoiceRecognition {
    constructor() {
        this.isListening = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.voices = [];
        this.selectedVoice = null;
        this.settings = {
            language: 'en-US',
            continuousListening: false,
            autoStopAfterSilence: true,
            silenceTimeout: 3000,
            preferredVoice: null
        };
        
        // Initialize when speech synthesis is ready
        if (this.synthesis) {
            this.loadVoices();
            if (this.synthesis.onvoiceschanged !== undefined) {
                this.synthesis.onvoiceschanged = this.loadVoices.bind(this);
            }
        }

        // Attempt to initialize speech recognition
        this.initSpeechRecognition();
        
        console.log('JAAT-AI Voice Recognition feature initialized');
    }

    /**
     * Load available voices for speech synthesis
     */
    loadVoices() {
        this.voices = this.synthesis.getVoices();
        if (this.voices.length > 0) {
            // Set default voice (prefer neural/premium voices if available)
            this.selectedVoice = this.voices.find(voice => 
                voice.name.toLowerCase().includes('neural') || 
                voice.name.toLowerCase().includes('premium')
            );

            // Fallback to a voice in user's language if neural/premium not found
            if (!this.selectedVoice) {
                this.selectedVoice = this.voices.find(voice => 
                    voice.lang === this.settings.language
                );
            }

            // Last resort - just use the first available voice
            if (!this.selectedVoice && this.voices.length) {
                this.selectedVoice = this.voices[0];
            }

            // If there's a previously saved preference, use that
            if (this.settings.preferredVoice) {
                const savedVoice = this.voices.find(voice => 
                    voice.name === this.settings.preferredVoice
                );
                if (savedVoice) {
                    this.selectedVoice = savedVoice;
                }
            }
        }
    }

    /**
     * Initialize Speech Recognition API
     */
    initSpeechRecognition() {
        // Check for browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('Speech recognition not supported in this browser');
            this.recognitionSupported = false;
            return;
        }

        this.recognitionSupported = true;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = this.settings.continuousListening;
        this.recognition.interimResults = true;
        this.recognition.lang = this.settings.language;

        // Configure recognition events
        this.setupRecognitionEvents();
    }

    /**
     * Set up event handlers for the recognition object
     */
    setupRecognitionEvents() {
        if (!this.recognition) return;

        this.recognition.onstart = () => {
            this.isListening = true;
            this.dispatchEvent('recognitionStart');
            console.log('Voice recognition started');
            
            // Visual indicator of listening state
            this.updateUI();
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.dispatchEvent('recognitionEnd');
            console.log('Voice recognition ended');
            
            // If continuous listening is enabled, restart recognition
            if (this.settings.continuousListening && this.recognitionSupported) {
                this.recognition.start();
            }
            
            this.updateUI();
        };

        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            // Process recognition results
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            // Dispatch events with the transcripts
            if (interimTranscript) {
                this.dispatchEvent('interimResult', { transcript: interimTranscript });
            }
            
            if (finalTranscript) {
                this.dispatchEvent('finalResult', { transcript: finalTranscript });
                
                // Automatically stop after final result if configured
                if (this.settings.autoStopAfterSilence) {
                    this.stopListening();
                }
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            this.dispatchEvent('recognitionError', { error: event.error });
            
            // Update UI to reflect error state
            this.updateUI(true);
        };
    }

    /**
     * Start listening for voice input
     */
    startListening() {
        if (!this.recognitionSupported) {
            this.showBrowserSupportMessage();
            return false;
        }
        
        try {
            this.recognition.start();
            return true;
        } catch (error) {
            console.error('Failed to start voice recognition:', error);
            return false;
        }
    }

    /**
     * Stop listening for voice input
     */
    stopListening() {
        if (!this.recognitionSupported || !this.isListening) return;
        
        try {
            this.recognition.stop();
        } catch (error) {
            console.error('Failed to stop voice recognition:', error);
        }
    }

    /**
     * Toggle listening state
     * @returns {boolean} New listening state
     */
    toggleListening() {
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
     * @param {Object} options - Speech options
     */
    speak(text, options = {}) {
        if (!this.synthesis) {
            console.warn('Speech synthesis not supported in this browser');
            return false;
        }

        // Cancel any current speech
        this.synthesis.cancel();

        // Create utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Apply voice selection
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }
        
        // Apply options
        if (options.rate) utterance.rate = options.rate;
        if (options.pitch) utterance.pitch = options.pitch;
        if (options.volume) utterance.volume = options.volume;
        
        // Set event handlers
        utterance.onstart = () => {
            this.dispatchEvent('speechStart', { text });
            console.log('Speaking started');
        };
        
        utterance.onend = () => {
            this.dispatchEvent('speechEnd');
            console.log('Speaking ended');
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error', event);
            this.dispatchEvent('speechError', { error: event });
        };

        // Speak the utterance
        this.synthesis.speak(utterance);
        return true;
    }

    /**
     * Update the UI to reflect current state
     * @param {boolean} isError - Whether there's an error state
     */
    updateUI(isError = false) {
        // Add visual indicator for microphone state
        const micButtons = document.querySelectorAll('.voice-recognition-mic');
        
        micButtons.forEach(button => {
            button.classList.remove('active', 'error');
            
            if (this.isListening) {
                button.classList.add('active');
                button.innerHTML = '<i class="fas fa-microphone"></i>';
                
                // Add pulsing animation
                button.style.animation = 'pulse 1.5s infinite';
            } else {
                button.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                button.style.animation = 'none';
            }
            
            if (isError) {
                button.classList.add('error');
            }
        });
    }

    /**
     * Show a message about browser support
     */
    showBrowserSupportMessage() {
        alert('Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.');
    }

    /**
     * Dispatch a custom event
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event details
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`jaat.voice.${eventName}`, { 
            detail,
            bubbles: true
        });
        document.dispatchEvent(event);
    }

    /**
     * Get list of available voices
     * @returns {Array} Available voices
     */
    getAvailableVoices() {
        return this.voices;
    }

    /**
     * Set voice by name
     * @param {string} voiceName - Name of the voice to use
     * @returns {boolean} Whether voice was set successfully
     */
    setVoice(voiceName) {
        const voice = this.voices.find(v => v.name === voiceName);
        if (voice) {
            this.selectedVoice = voice;
            this.settings.preferredVoice = voiceName;
            this.saveSettings();
            return true;
        }
        return false;
    }

    /**
     * Set recognition language
     * @param {string} languageCode - Language code (e.g., 'en-US')
     */
    setLanguage(languageCode) {
        this.settings.language = languageCode;
        if (this.recognition) {
            this.recognition.lang = languageCode;
        }
        this.saveSettings();
    }

    /**
     * Save current settings to localStorage
     */
    saveSettings() {
        try {
            localStorage.setItem('jaat-voice-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Failed to save voice recognition settings:', error);
        }
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('jaat-voice-settings');
            if (savedSettings) {
                this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
                
                // Apply loaded settings
                if (this.recognition) {
                    this.recognition.lang = this.settings.language;
                    this.recognition.continuous = this.settings.continuousListening;
                }
            }
        } catch (error) {
            console.error('Failed to load voice recognition settings:', error);
        }
    }
}

// Register the feature with JAAT-AI
if (window.JAAT) {
    window.JAAT.registerFeature('voice-recognition', new VoiceRecognition());
}

// Add initialization code
document.addEventListener('DOMContentLoaded', function() {
    // Create voice recognition buttons if they don't exist
    if (!document.querySelector('.voice-recognition-mic')) {
        // Add to chat interface
        const chatInputContainer = document.querySelector('.chat-input-container');
        if (chatInputContainer) {
            const micButton = document.createElement('button');
            micButton.className = 'voice-recognition-mic';
            micButton.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            micButton.setAttribute('title', 'Toggle voice recognition');
            micButton.addEventListener('click', function() {
                if (window.JAAT && window.JAAT.features['voice-recognition']) {
                    window.JAAT.features['voice-recognition'].toggleListening();
                }
            });
            
            chatInputContainer.insertBefore(micButton, chatInputContainer.querySelector('.chat-send-btn'));
            
            // Style the button
            micButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            micButton.style.border = 'none';
            micButton.style.borderRadius = '50%';
            micButton.style.width = '40px';
            micButton.style.height = '40px';
            micButton.style.marginLeft = '10px';
            micButton.style.display = 'flex';
            micButton.style.justifyContent = 'center';
            micButton.style.alignItems = 'center';
            micButton.style.cursor = 'pointer';
            micButton.style.transition = 'all 0.3s ease';
        }
    }
    
    // Set up event listeners for voice recognition results
    document.addEventListener('jaat.voice.finalResult', function(e) {
        // Get the chat input field
        const chatInput = document.querySelector('.chat-input');
        if (chatInput) {
            chatInput.value = e.detail.transcript;
            
            // Optional: automatically send message if configured
            // document.querySelector('.chat-send-btn').click();
        }
    });
    
    // Initialize voice feature if available
    if (window.JAAT && window.JAAT.features['voice-recognition']) {
        window.JAAT.features['voice-recognition'].loadSettings();
    }
});
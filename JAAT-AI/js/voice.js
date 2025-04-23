/**
 * JAAT-AI Voice Module
 * Handles speech recognition and synthesis
 */

class Voice {
    constructor(app) {
        // Reference to main app
        this.app = app;
        
        // Speech recognition
        this.recognition = null;
        this.isRecognizing = false;
        this.interimTranscript = '';
        this.finalTranscript = '';
        this.recognitionLanguage = 'en-US';
        
        // Speech synthesis
        this.synthesis = window.speechSynthesis;
        this.voices = [];
        this.selectedVoice = null;
        this.isSpeaking = false;
        this.speechQueue = [];
        this.speechRate = 1.0;
        this.speechPitch = 1.0;
        this.speechVolume = 1.0;
        
        // Voice detection
        this.audioContext = null;
        this.analyser = null;
        this.microphone = null;
        this.isListening = false;
        
        // Audio feedback
        this.audioFeedback = true;
        this.feedbackSounds = {
            start: null,
            stop: null,
            success: null,
            error: null
        };
        
        // Settings
        this.settings = {
            autoStart: false,
            continuousListening: false,
            interimResults: true,
            maxAlternatives: 1,
            stopTimeout: 1500, // time in ms of silence to stop listening
            audioFeedback: true,
            filterProfanity: true,
            enableBleep: true,
            autoScroll: true,
            highlightSpoken: true
        };
        
        // Status
        this.status = {
            recognitionSupported: false,
            synthesisSupported: false,
            microphoneAccess: false,
            errorMessage: null
        };
        
        // Event listeners
        this.eventListeners = {};
        
        // Storage keys
        this.storageKeys = {
            settings: 'jaat-voice-settings',
            selectedVoice: 'jaat-selected-voice'
        };
    }

    /**
     * Initialize voice module
     * @param {Object} options - Configuration options
     * @returns {Promise<void>}
     */
    async init(options = {}) {
        console.log('Initializing Voice module...');
        
        // Apply custom options
        if (options) {
            Object.assign(this.settings, options);
        }
        
        // Load saved settings
        await this.loadSettings();
        
        // Initialize speech recognition
        this.initSpeechRecognition();
        
        // Initialize speech synthesis
        this.initSpeechSynthesis();
        
        // Load audio feedback sounds
        if (this.settings.audioFeedback) {
            this.loadAudioFeedback();
        }
        
        console.log('Voice module initialized');
    }

    /**
     * Load settings from storage
     * @returns {Promise<void>}
     */
    async loadSettings() {
        try {
            const savedSettings = localStorage.getItem(this.storageKeys.settings);
            
            if (savedSettings) {
                // Apply saved settings
                Object.assign(this.settings, JSON.parse(savedSettings));
                console.log('Loaded voice settings from storage');
            }
            
            // Load selected voice
            const savedVoice = localStorage.getItem(this.storageKeys.selectedVoice);
            if (savedVoice) {
                this.recognitionLanguage = savedVoice.split('|')[0] || this.recognitionLanguage;
            }
        } catch (error) {
            console.error('Error loading voice settings:', error);
        }
    }

    /**
     * Save settings to storage
     */
    saveSettings() {
        try {
            localStorage.setItem(this.storageKeys.settings, JSON.stringify(this.settings));
            
            // Save selected voice
            if (this.selectedVoice) {
                localStorage.setItem(this.storageKeys.selectedVoice, 
                    `${this.recognitionLanguage}|${this.selectedVoice.voiceURI}`);
            }
        } catch (error) {
            console.error('Error saving voice settings:', error);
        }
    }

    /**
     * Initialize speech recognition
     */
    initSpeechRecognition() {
        // Check if speech recognition is supported
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            console.warn('Speech recognition not supported in this browser');
            this.status.recognitionSupported = false;
            this.status.errorMessage = 'Speech recognition not supported in this browser';
            return;
        }
        
        this.status.recognitionSupported = true;
        
        // Create speech recognition instance
        this.recognition = new SpeechRecognition();
        
        // Configure recognition
        this.recognition.continuous = this.settings.continuousListening;
        this.recognition.interimResults = this.settings.interimResults;
        this.recognition.maxAlternatives = this.settings.maxAlternatives;
        this.recognition.lang = this.recognitionLanguage;
        
        // Set up recognition event handlers
        this.recognition.onstart = this.handleRecognitionStart.bind(this);
        this.recognition.onresult = this.handleRecognitionResult.bind(this);
        this.recognition.onerror = this.handleRecognitionError.bind(this);
        this.recognition.onend = this.handleRecognitionEnd.bind(this);
        
        // Start recognition if autoStart is enabled
        if (this.settings.autoStart) {
            this.startListening();
        }
    }

    /**
     * Initialize speech synthesis
     */
    initSpeechSynthesis() {
        // Check if speech synthesis is supported
        if (!window.speechSynthesis) {
            console.warn('Speech synthesis not supported in this browser');
            this.status.synthesisSupported = false;
            this.status.errorMessage = 'Speech synthesis not supported in this browser';
            return;
        }
        
        this.status.synthesisSupported = true;
        
        // Get available voices
        this.loadVoices();
        
        // Set up voice changed event handler
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
        }
    }

    /**
     * Load available voices
     */
    loadVoices() {
        // Get all available voices
        this.voices = this.synthesis.getVoices();
        
        if (this.voices.length === 0) {
            console.warn('No voices available');
            return;
        }
        
        console.log(`Loaded ${this.voices.length} voices`);
        
        // Load saved voice
        const savedVoice = localStorage.getItem(this.storageKeys.selectedVoice);
        
        if (savedVoice) {
            const [lang, voiceUri] = savedVoice.split('|');
            
            // Find saved voice
            const voice = this.voices.find(v => v.voiceURI === voiceUri);
            
            if (voice) {
                this.selectedVoice = voice;
                console.log(`Loaded saved voice: ${voice.name} (${voice.lang})`);
            }
        }
        
        // If no voice is selected, choose a default
        if (!this.selectedVoice) {
            // Try to find a voice that matches the recognition language
            let voice = this.voices.find(v => v.lang === this.recognitionLanguage && v.default);
            
            // If no match, find any voice in the recognition language
            if (!voice) {
                voice = this.voices.find(v => v.lang.startsWith(this.recognitionLanguage.split('-')[0]));
            }
            
            // If still no match, use the first available voice
            if (!voice && this.voices.length > 0) {
                voice = this.voices[0];
            }
            
            if (voice) {
                this.selectedVoice = voice;
                console.log(`Selected default voice: ${voice.name} (${voice.lang})`);
            }
        }
        
        // Trigger voices loaded event
        this.trigger('voicesLoaded', {
            voices: this.voices,
            selectedVoice: this.selectedVoice
        });
    }

    /**
     * Load audio feedback sounds
     */
    loadAudioFeedback() {
        // Simple beep sounds for feedback
        // In a real implementation, these would be actual audio files
        this.feedbackSounds.start = new Audio('data:audio/mp3;base64,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YBQDjARAJAwAswEQGzADAGMBEA8DgXmAIAGYAwB42AcVgOGJSYmJif///////////////7MCgBRAMZMLETExP///////////////RsJgMiU0JiYmJiV////////////////////////////////////////////////8wGQCzAaAbMAIAQwCwCQOAiYA4A5gDgEmAIAIYAgAwFAFCIAoKAVMAUBECgOmAUAGHAMDAVAJA0CYwDQBwmAOMBIBECgJjAJAOMAgAcCgFzAFAIMAIAkwAwBgOAIMAUAACgCzAGAJMAMAUwCQBQMAaYAgBZgBgDGAKAMBgDTAJALMAQAcwAgBDAIAHCYAwCDzahqEAwBQBgKA5MNQAwwEABzAEAEMAIAMRgIgcEJgEAEGAOAQYAgBBgFgCmAMAQYAYA4GACMAgAQwAgBQiA0wAgBgOARCYDDEpMTExP////////////////////////DAwATDgAdjE1NT///////////////0QCUxKTExMTExP//////////////////////////MAcAgQggFAbkRMTExMTEv//////////////+3LEPQALHAVaf+dAAV0Aq0/8vAAzDQSBcYERaYcCKY2IgYkDCGgD8YCgKJh7AqmCUAGYJQBBgkgNmDSA2DQGxi0gYmA0ACNgTQABJgcALGBwAMYDQAYiABzcAyKkBJgDAQCwEzANADMEUCAwYwTDHLB+MF8DowngKDCNAsMBcBcCgJDAYAOMMYIQxegfDCsALMAAAkBACpgLgDGCUAaYE4DBgLAAmAYAOYBQAhgTAGmAmAIYCQA5gEAHmAiAIAQBjADAASICJgDABmA6AmYDYD5gUgQDcAsKCzBQAwMBAFMXCWMYgTMaijMQQAMExNMVB+MKAMAwAIMDBN/////MIgSMGQJMWC0NVY8NICAMCgBMAoAEwFQHgaBgJgOmASAMYCoAoGAUGAeAOCgDjAFALMAIAgRgZmAWAWYA4ApgEABgcAkwAQBwyAKmAOAMYAgA5gCgDBMAwwCgCgKAQMAUAowBwBjACANMAcBAwAgCDAJAHMAUAUAgcGAgAgYAYAQBAKGAqAUYBIAowAgDRwBCsC8xNTExP/////////////////////////////////////////MAQAgwAgCQqBCZhJqTE//////////////////////////////////////////////////////////xGBUAkAoDBgHgGGAIAIYAgBJgDABGASAIYBQAQTADMAQAQHAFGAOAGBQDQMBcwBwCTAJAFAoBgYCQB5gIgHmAGAUDAKzAEAKMAMAcDgDjARATMAwAkwBQAQMAwMA0AgKgEGAMAKBgGZgFAEgYA8YCQBgGALGAaAaYBYBYGAVGAiAeYAgBQGAPGAeAcYBoAxgCAAmAWAuYCIBgyD4bFZiYmJ/////////////////////////////////////////MAIAcwAwBQ6BGYlJSTE////////////////////////////////////////////////////////////TFQkTEpMTExMTE////////////+3LEOAAKwAVaf+XgAWEAq0/87AAP/////////////////////////////////////9MAgA0CgDzAcAGMAQAwwBQBjASAGMAkAgwBwBjAGAGAwBwwCgBgmAMBgChUCgwBwBS8BcwBwBQMAYMAkAgwCQBgMA+YA4BpgDABiECUwDgBTADAICgBxgCAAmAMAIYBYAxgEgBmAGAKYAwBBgBAEGAGAEYAoBRgFACmAMAuYA4BhgEgDmAgA2GwXDAIAJAoBYYA4CBgIAOGAcAgYBQBwGALGAWASBQCzARANGIMzEtITExP////////////////////////////////////////jAnARMBcA0wBQBSmDExKTExP/////////////////////////////////////////////////////////9MSkhMTExMTExLv/////////////////////////////////////////ZgOABh8AphgqZgIAEgMFcwDQBTAGAEMAcAUwBAATAFAFAoBswCQBQqAaYBYAgGAoMAgAowCQCDACACMAsA4wCAAQmAaYAYBQGAHGAOAOYA4BZgBgFmAKAIYAYAgIAyMAQAgKgJGAGAMYAYBRgDgFmAQAMYAoA4GAPGASAGIAIGASAOYA4BYdAPGAaAMBgEhkDJgEgGAYAcYBoB5gEADgcCIHAyMRoTD4PBsSEhLv///////////////////////////////+YCoCpgGgKmAIAQYA4BRgDABh8CExKTExP////////////////////////////////////////////////MAIAMOgIGAIASYA4A5gBgCGAEAGYAwAhgBgDGAIAKYAYAoFADGAMAGIQGTALAJCoBRgDgCBkAswCQCDADAGMAkAULgGDAKAKMAkA8wBQCQKAKMAYAcwBABTADAEJAEjACAFMAcAowBAAwMAeMAoAMwCQCDAAACMAUAcwAgBQMAgYBoBxgEgCCAQjALAOMAIA0CgCjALARMA4BMTiDlA8YlJiYmJ/////////////////////////////////////////////////////////TElKTExMTExP//////////////7csQvgArUBVh/52ABbICrT/zsAD/////////////////////////////////////8wAwCDAKAfAoDBgCgCGAKAKYA4BBgCABGAMAIYAwBJgCAFmAGAKDQDTAFAHCYA5gCgBGAQAEYBYBZgCgBGAKAKYAQAhgAgCGASAGYBIAZgBgLmAMASYAoBIFAKGAQAGFQETARAPMAIAgwAwCgaAiYBIB4FAKMAMAcwBQCQKAgCwCjADAFMBEAcLgDDAFAFAIBswBwCQqAiFQHzAVAbEQFGJSQmJif///////////////////////////////////////9MBIAsXEJMSkxMTExP//////////////////////////////////////////////////////9MVERMSkxMTE////////////////////////////////////////////////////9MQBRMTERETE//////////////////////////////////////////////////////////xMB8BE//tSxDOAClgFWn/jQAFJAKtP/GwA///////////+wNCYAEMSkkJiUkJiYn/////////////////////////////////////////////TFFIzExMTE////p////////////////////+YCgCsXARMCUBGYApiUmJiYmJ/////////////////////////////////////////////TEJITE1K////////////////////////////////////////////////////////+mKiKGBOAjMCYxKTExMTE/////////////////////////////////////////////1MSUhMTExMTExP/////////////////////////////////////////////TEpHTE///////////////+1LEJgAKPAVaf+NgAUiAq0/8aAAP/////////////////////TFVIzExMTExP//////////////////////////////////////////////9MVUjMTExMTE///////////////////////////////////////////////1MSwjMSkxMTExP//////////////////////////////////////////////kxUGgxMSkxMTExP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+2LEFAAKVAVd/+MACUoAq8/8YAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7UsQigAPgAUGGH4AA7QAoEMPwAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////tsQaAAT0Aa0GA0AAfEA1oYBoAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////u1LCAA/gAUAGB0AAA0ADWgAGgAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
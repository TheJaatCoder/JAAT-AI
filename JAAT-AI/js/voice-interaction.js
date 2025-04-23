/**
 * JAAT-AI Voice Interaction
 * Handles voice recognition and text-to-speech functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
    
    // Check if browser supports speech synthesis
    const synth = window.speechSynthesis;
    
    // Voice mode toggle buttons
    const voiceButtons = document.querySelectorAll('.voice-toggle');
    const micButtons = document.querySelectorAll('.mic-button');
    
    // Chat input and form
    const chatInput = document.getElementById('chat-input');
    const chatForm = document.getElementById('chat-form');
    
    // State variables
    let isVoiceModeActive = localStorage.getItem('jaat-voice-mode') === 'true';
    let isListening = false;
    let recognition = null;
    let voicePreference = localStorage.getItem('jaat-voice-preference') || 'default';
    let speechRate = parseFloat(localStorage.getItem('jaat-speech-rate') || '1');
    let speechPitch = parseFloat(localStorage.getItem('jaat-speech-pitch') || '1');
    
    // Initialize voice mode
    initVoiceMode();
    
    // Add event listeners to voice buttons
    voiceButtons.forEach(button => {
        button.addEventListener('click', toggleVoiceMode);
    });
    
    // Add event listeners to mic buttons
    micButtons.forEach(button => {
        button.addEventListener('click', startSpeechRecognition);
        button.addEventListener('mousedown', startContinuousSpeechRecognition);
        button.addEventListener('mouseup', stopContinuousSpeechRecognition);
        button.addEventListener('mouseleave', stopContinuousSpeechRecognition);
        
        // Touch events for mobile
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startContinuousSpeechRecognition();
        });
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            stopContinuousSpeechRecognition();
        });
    });
    
    // Initialize voice mode based on saved preference
    function initVoiceMode() {
        // Update UI
        updateVoiceModeUI();
        
        // Initialize speech recognition if supported
        if (SpeechRecognition) {
            initSpeechRecognition();
        } else {
            console.warn('Speech recognition not supported in this browser');
            // Disable voice buttons if not supported
            voiceButtons.forEach(button => {
                button.disabled = true;
                button.title = 'Voice mode not supported in this browser';
                button.classList.add('disabled');
            });
            
            micButtons.forEach(button => {
                button.disabled = true;
                button.title = 'Microphone not supported in this browser';
                button.classList.add('disabled');
            });
        }
    }
    
    // Initialize speech recognition
    function initSpeechRecognition() {
        recognition = new SpeechRecognition();
        
        // Configure recognition
        recognition.continuous = false;
        recognition.lang = 'en-US'; // Default language
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        
        // Add event listeners
        recognition.onstart = handleRecognitionStart;
        recognition.onresult = handleRecognitionResult;
        recognition.onerror = handleRecognitionError;
        recognition.onend = handleRecognitionEnd;
    }
    
    // Toggle voice mode
    function toggleVoiceMode() {
        isVoiceModeActive = !isVoiceModeActive;
        
        // Save preference
        localStorage.setItem('jaat-voice-mode', isVoiceModeActive);
        
        // Update UI
        updateVoiceModeUI();
        
        // Show toast
        showToast(isVoiceModeActive ? 'Voice mode activated' : 'Voice mode deactivated');
    }
    
    // Update voice mode UI
    function updateVoiceModeUI() {
        voiceButtons.forEach(button => {
            const icon = button.querySelector('i');
            if (isVoiceModeActive) {
                button.classList.add('active');
                icon.classList.remove('fa-volume-mute');
                icon.classList.add('fa-volume-up');
                button.setAttribute('aria-label', 'Disable voice mode');
                button.title = 'Disable voice mode';
            } else {
                button.classList.remove('active');
                icon.classList.remove('fa-volume-up');
                icon.classList.add('fa-volume-mute');
                button.setAttribute('aria-label', 'Enable voice mode');
                button.title = 'Enable voice mode';
            }
        });
    }
    
    // Start speech recognition (toggle)
    function startSpeechRecognition() {
        if (!SpeechRecognition) return;
        
        if (isListening) {
            stopSpeechRecognition();
        } else {
            // Start listening
            try {
                recognition.start();
            } catch (e) {
                console.error('Recognition already started:', e);
            }
        }
    }
    
    // Start continuous speech recognition (press and hold)
    function startContinuousSpeechRecognition() {
        if (!SpeechRecognition || isListening) return;
        
        // Configure for continuous mode
        recognition.continuous = true;
        
        // Start listening
        try {
            recognition.start();
        } catch (e) {
            console.error('Recognition already started:', e);
        }
    }
    
    // Stop continuous speech recognition
    function stopContinuousSpeechRecognition() {
        if (!SpeechRecognition || !isListening) return;
        
        // Reset to non-continuous mode
        recognition.continuous = false;
        
        // Stop listening
        try {
            recognition.stop();
        } catch (e) {
            console.error('Recognition already stopped:', e);
        }
    }
    
    // Stop speech recognition
    function stopSpeechRecognition() {
        if (!SpeechRecognition || !isListening) return;
        
        // Stop listening
        try {
            recognition.stop();
        } catch (e) {
            console.error('Recognition already stopped:', e);
        }
    }
    
    // Handle recognition start event
    function handleRecognitionStart() {
        isListening = true;
        
        // Update UI
        micButtons.forEach(button => {
            button.classList.add('listening');
            const icon = button.querySelector('i');
            icon.classList.remove('fa-microphone');
            icon.classList.add('fa-microphone-alt');
        });
        
        // Show listening indicator
        showListeningIndicator();
    }
    
    // Handle recognition result event
    function handleRecognitionResult(event) {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        
        // Update input field
        if (chatInput) {
            chatInput.value = transcript;
            
            // Trigger input event to resize textarea if needed
            const inputEvent = new Event('input', { bubbles: true });
            chatInput.dispatchEvent(inputEvent);
        }
        
        // If final result and not continuous mode, submit the form
        if (event.results[0].isFinal && !recognition.continuous) {
            setTimeout(() => {
                if (chatForm && transcript.trim()) {
                    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                    chatForm.dispatchEvent(submitEvent);
                }
            }, 500);
        }
    }
    
    // Handle recognition error event
    function handleRecognitionError(event) {
        console.error('Speech recognition error:', event.error);
        
        let errorMessage = 'Speech recognition error';
        
        switch (event.error) {
            case 'no-speech':
                errorMessage = 'No speech detected';
                break;
            case 'aborted':
                errorMessage = 'Speech recognition aborted';
                break;
            case 'audio-capture':
                errorMessage = 'No microphone detected';
                break;
            case 'not-allowed':
                errorMessage = 'Microphone access denied';
                break;
            case 'service-not-allowed':
                errorMessage = 'Speech recognition service not allowed';
                break;
            case 'language-not-supported':
                errorMessage = 'Language not supported';
                break;
        }
        
        // Show error toast
        showToast(errorMessage, 'error');
        
        // Reset listening state
        isListening = false;
        
        // Update UI
        updateMicButtonsUI();
        
        // Hide listening indicator
        hideListeningIndicator();
    }
    
    // Handle recognition end event
    function handleRecognitionEnd() {
        isListening = false;
        
        // Update UI
        updateMicButtonsUI();
        
        // Hide listening indicator
        hideListeningIndicator();
    }
    
    // Update mic buttons UI
    function updateMicButtonsUI() {
        micButtons.forEach(button => {
            button.classList.remove('listening');
            const icon = button.querySelector('i');
            icon.classList.remove('fa-microphone-alt');
            icon.classList.add('fa-microphone');
        });
    }
    
    // Show listening indicator
    function showListeningIndicator() {
        let listeningIndicator = document.getElementById('listening-indicator');
        
        if (!listeningIndicator) {
            // Create listening indicator
            listeningIndicator = document.createElement('div');
            listeningIndicator.id = 'listening-indicator';
            listeningIndicator.innerHTML = `
                <div class="listening-ripple">
                    <div class="ripple-waves"></div>
                    <div class="ripple-waves"></div>
                    <div class="ripple-waves"></div>
                    <div class="ripple-icon">
                        <i class="fas fa-microphone-alt"></i>
                    </div>
                </div>
                <div class="listening-text">Listening...</div>
            `;
            document.body.appendChild(listeningIndicator);
            
            // Add styles
            const style = document.createElement('style');
            style.id = 'listening-indicator-style';
            style.textContent = `
                #listening-indicator {
                    position: fixed;
                    bottom: 80px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: var(--bg-primary);
                    border-radius: 24px;
                    padding: 8px 16px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: var(--shadow-md);
                    z-index: 1000;
                    border: 1px solid var(--border-color);
                    animation: fadeIn 0.2s ease-out forwards;
                }
                
                .listening-ripple {
                    position: relative;
                    width: 24px;
                    height: 24px;
                }
                
                .ripple-waves {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid var(--primary-color);
                    opacity: 0;
                    animation: ripple 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
                }
                
                .ripple-waves:nth-child(2) {
                    animation-delay: 0.5s;
                }
                
                .ripple-waves:nth-child(3) {
                    animation-delay: 1s;
                }
                
                .ripple-icon {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary-color);
                }
                
                .listening-text {
                    font-size: 14px;
                    color: var(--text-primary);
                }
                
                @keyframes ripple {
                    0% {
                        transform: scale(0.8);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, 10px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
                
                @media (max-width: 768px) {
                    #listening-indicator {
                        bottom: 70px;
                    }
                }
            `;
            document.head.appendChild(style);
        } else {
            // Show existing indicator
            listeningIndicator.style.display = 'flex';
        }
    }
    
    // Hide listening indicator
    function hideListeningIndicator() {
        const listeningIndicator = document.getElementById('listening-indicator');
        
        if (listeningIndicator) {
            // Add fade out animation
            listeningIndicator.style.animation = 'fadeOut 0.2s ease-in forwards';
            
            // Remove after animation
            setTimeout(() => {
                listeningIndicator.style.display = 'none';
                listeningIndicator.style.animation = '';
            }, 200);
            
            // Add fadeOut animation if not exists
            if (!document.getElementById('listening-indicator-fadeout')) {
                const style = document.createElement('style');
                style.id = 'listening-indicator-fadeout';
                style.textContent = `
                    @keyframes fadeOut {
                        from {
                            opacity: 1;
                            transform: translate(-50%, 0);
                        }
                        to {
                            opacity: 0;
                            transform: translate(-50%, 10px);
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
    
    // Text-to-speech for AI responses
    function speakText(text) {
        if (!synth || !isVoiceModeActive) return;
        
        // Cancel any ongoing speech
        synth.cancel();
        
        // Clean up text (remove markdown, code blocks, etc.)
        const cleanText = cleanTextForSpeech(text);
        
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        // Set voice
        setPreferredVoice(utterance);
        
        // Set speech rate and pitch
        utterance.rate = speechRate;
        utterance.pitch = speechPitch;
        
        // Speak the text
        synth.speak(utterance);
    }
    
    // Clean text for speech (remove markdown, code, etc.)
    function cleanTextForSpeech(text) {
        let cleanText = text;
        
        // Remove code blocks
        cleanText = cleanText.replace(/```[\\s\\S]*?```/g, 'Code block removed for speech.');
        
        // Remove inline code
        cleanText = cleanText.replace(/`([^`]+)`/g, '$1');
        
        // Remove markdown links
        cleanText = cleanText.replace(/\\[([^\\]]+)\\]\\([^)]+\\)/g, '$1');
        
        // Remove markdown formatting
        cleanText = cleanText.replace(/\\*\\*([^*]+)\\*\\*/g, '$1'); // Bold
        cleanText = cleanText.replace(/\\*([^*]+)\\*/g, '$1');       // Italic
        cleanText = cleanText.replace(/~~([^~]+)~~/g, '$1');         // Strikethrough
        
        // Remove HTML tags
        cleanText = cleanText.replace(/<[^>]*>/g, ' ');
        
        // Replace multiple spaces with a single space
        cleanText = cleanText.replace(/\\s+/g, ' ');
        
        return cleanText;
    }
    
    // Set preferred voice for speech
    function setPreferredVoice(utterance) {
        if (!synth) return;
        
        // Get available voices
        const voices = synth.getVoices();
        
        if (voices.length === 0) {
            // Voices might not be loaded yet, wait and try again
            setTimeout(() => setPreferredVoice(utterance), 100);
            return;
        }
        
        // Find preferred voice
        let selectedVoice;
        
        if (voicePreference === 'default') {
            // Use default voice
            selectedVoice = voices[0];
        } else if (voicePreference === 'female') {
            // Try to find a female voice
            selectedVoice = voices.find(voice => voice.name.includes('female') || 
                                              voice.name.includes('Female') || 
                                              voice.name.includes('girl') || 
                                              voice.name.includes('Girl')) || voices[0];
        } else if (voicePreference === 'male') {
            // Try to find a male voice
            selectedVoice = voices.find(voice => voice.name.includes('male') || 
                                             voice.name.includes('Male') || 
                                             voice.name.includes('boy') || 
                                             voice.name.includes('Boy')) || voices[0];
        } else {
            // Try to find specific voice by name
            selectedVoice = voices.find(voice => voice.name.includes(voicePreference)) || voices[0];
        }
        
        // Set voice
        utterance.voice = selectedVoice;
    }
    
    // Show toast notification
    function showToast(message, type = 'info') {
        // Check if toast container exists
        let toastContainer = document.getElementById('toast-container');
        
        if (!toastContainer) {
            // Create toast container
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
            
            // Add toast styles
            const style = document.createElement('style');
            style.textContent = `
                #toast-container {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    align-items: center;
                }
                
                .toast {
                    padding: 10px 16px;
                    border-radius: var(--border-radius-md);
                    box-shadow: var(--shadow-md);
                    animation: toastFadeIn 0.3s ease-out forwards;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border: 1px solid var(--border-color);
                }
                
                .toast.info {
                    background-color: var(--bg-primary);
                    color: var(--text-primary);
                }
                
                .toast.error {
                    background-color: var(--bg-primary);
                    color: var(--error-color);
                    border-color: var(--error-color-light);
                }
                
                .toast.success {
                    background-color: var(--bg-primary);
                    color: var(--success-color);
                    border-color: var(--success-color-light);
                }
                
                .toast i {
                    font-size: 16px;
                }
                
                @keyframes toastFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes toastFadeOut {
                    from {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Set icon based on type
        let icon;
        switch (type) {
            case 'error':
                icon = 'fa-exclamation-circle';
                break;
            case 'success':
                icon = 'fa-check-circle';
                break;
            default:
                icon = 'fa-info-circle';
        }
        
        // Add content
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Auto-remove after delay
        setTimeout(() => {
            toast.style.animation = 'toastFadeOut 0.3s ease-in forwards';
            
            // Remove after animation
            setTimeout(() => {
                toastContainer.removeChild(toast);
                
                // Remove container if empty
                if (toastContainer.children.length === 0) {
                    document.body.removeChild(toastContainer);
                }
            }, 300);
        }, 3000);
    }
    
    // Expose API for other scripts
    window.JaatVoice = {
        // Speech recognition methods
        startListening: startSpeechRecognition,
        stopListening: stopSpeechRecognition,
        
        // Text-to-speech methods
        speak: speakText,
        stopSpeaking: () => synth && synth.cancel(),
        
        // Voice mode methods
        enableVoiceMode: () => {
            if (!isVoiceModeActive) {
                toggleVoiceMode();
            }
        },
        disableVoiceMode: () => {
            if (isVoiceModeActive) {
                toggleVoiceMode();
            }
        },
        isVoiceModeEnabled: () => isVoiceModeActive,
        
        // Voice preferences
        setVoicePreference: (preference) => {
            voicePreference = preference;
            localStorage.setItem('jaat-voice-preference', preference);
        },
        setSpeechRate: (rate) => {
            speechRate = rate;
            localStorage.setItem('jaat-speech-rate', rate);
        },
        setSpeechPitch: (pitch) => {
            speechPitch = pitch;
            localStorage.setItem('jaat-speech-pitch', pitch);
        },
        
        // Get available voices
        getAvailableVoices: () => synth ? synth.getVoices() : []
    };
    
    // Add event listener for AI responses
    document.addEventListener('aiResponseAdded', (event) => {
        if (isVoiceModeActive && event.detail && event.detail.message) {
            speakText(event.detail.message);
        }
    });
});
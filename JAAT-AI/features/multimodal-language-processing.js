/**
 * JAAT-AI Multimodal Language Processing
 * Advanced AI mode for processing and understanding different types of content including text, images, audio, and video
 * 
 * Features:
 * - Advanced text understanding and natural language processing
 * - Image and visual content understanding
 * - Audio and speech processing
 * - Video content analysis
 * - Cross-modal understanding between different content types
 * - Context-aware responses that consider multiple input modalities
 */

(function() {
    // Register this feature with the JAAT-AI system
    if (window.JAAT && window.JAAT.registerFeature) {
        window.JAAT.registerFeature({
            id: 'multimodal-language-processing',
            name: 'Multimodal Language Processing',
            category: 'Intelligence',
            icon: 'brain',
            description: 'Process and understand multiple types of content including text, images, audio, and video.',
            version: '2.5',
            author: 'JAAT-AI Team',
            tags: ['multimodal', 'language', 'vision', 'audio', 'video', 'processing'],
            apiCredits: 'Powered by GPT-4o and Claude Opus',
            models: ['GPT-4o', 'Claude-3 Opus', 'Gemini Pro', 'JAAT Vision Pro'],
            permissions: ['camera', 'microphone', 'storage']
        });
    }

    // Define constants
    const SUPPORTED_LANGUAGES = [
        "English", "Spanish", "French", "German", "Chinese", "Japanese", 
        "Korean", "Russian", "Arabic", "Hindi", "Portuguese", "Italian", 
        "Dutch", "Swedish", "Polish", "Turkish", "Vietnamese", "Thai"
    ];

    const TOPIC_CATEGORIES = [
        "General Knowledge", "Science & Technology", "Arts & Culture", 
        "Business & Finance", "Health & Medicine", "Education & Academia", 
        "Legal & Regulatory", "Engineering & Technical", "Creative Writing",
        "Social Sciences", "Mathematics", "Sports & Recreation"
    ];

    // Feature initialization
    function initMultimodalProcessing() {
        console.log('Initializing Multimodal Language Processing');
        setupMultimodalUI();
        bindMultimodalEvents();
    }

    // Set up UI for multimodal processing
    function setupMultimodalUI() {
        const featureContainer = document.querySelector('#feature-container') || document.body;
        
        const multimodalUI = document.createElement('div');
        multimodalUI.id = 'multimodal-processor-container';
        multimodalUI.className = 'feature-panel';
        multimodalUI.style.display = 'none';
        
        multimodalUI.innerHTML = `
            <div class="panel-header">
                <h2>Multimodal Language Processing</h2>
                <div class="header-controls">
                    <button class="mode-toggle active" data-mode="multimodal-chat">Interactive Chat</button>
                    <button class="mode-toggle" data-mode="content-analysis">Content Analysis</button>
                    <button class="mode-toggle" data-mode="translation">Translation Hub</button>
                </div>
            </div>
            
            <div class="panel-content">
                <div class="multimodal-chat-interface">
                    <div class="chat-messages" id="multimodal-chat-messages">
                        <div class="system-message">
                            <div class="message-content">
                                <p>Welcome to Multimodal Chat! I can understand and respond to text, images, audio, and more. How can I help you today?</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="input-area">
                        <div class="message-composer">
                            <textarea id="message-input" placeholder="Type your message, or use the buttons below to add media..."></textarea>
                            
                            <div class="input-controls">
                                <button class="input-button" id="send-message">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                                <button class="input-button" id="add-image">
                                    <i class="fas fa-image"></i>
                                </button>
                                <button class="input-button" id="add-audio">
                                    <i class="fas fa-microphone"></i>
                                </button>
                                <button class="input-button" id="add-video">
                                    <i class="fas fa-video"></i>
                                </button>
                                <button class="input-button" id="add-file">
                                    <i class="fas fa-file"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="attachments-preview" id="attachments-preview"></div>
                    </div>
                </div>
                
                <div class="sidebar">
                    <div class="sidebar-section">
                        <h3>Model Selection</h3>
                        <select id="model-selector">
                            <option value="gpt-4o">GPT-4o (Fastest)</option>
                            <option value="claude-opus">Claude Opus (Most Creative)</option>
                            <option value="gemini-pro">Gemini Pro (Best Visual)</option>
                            <option value="jaat-vision">JAAT Vision Pro (Best Overall)</option>
                        </select>
                    </div>
                    
                    <div class="sidebar-section">
                        <h3>Language</h3>
                        <select id="language-selector">
                            ${SUPPORTED_LANGUAGES.map(lang => `<option value="${lang.toLowerCase()}">${lang}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="sidebar-section">
                        <h3>Topic Focus</h3>
                        <select id="topic-selector">
                            <option value="general">Automatic Detection</option>
                            ${TOPIC_CATEGORIES.map(topic => {
                                const value = topic.toLowerCase().replace(/[^a-z0-9]/g, '-');
                                return `<option value="${value}">${topic}</option>`;
                            }).join('')}
                        </select>
                    </div>
                    
                    <div class="sidebar-section">
                        <h3>Response Settings</h3>
                        <div class="setting-control">
                            <label for="response-length">Length</label>
                            <select id="response-length">
                                <option value="concise">Concise</option>
                                <option value="balanced" selected>Balanced</option>
                                <option value="detailed">Detailed</option>
                            </select>
                        </div>
                        
                        <div class="setting-control">
                            <label for="creativity-level">Creativity</label>
                            <input type="range" id="creativity-level" min="0" max="100" value="50">
                            <div class="range-labels">
                                <span>Precise</span>
                                <span>Creative</span>
                            </div>
                        </div>
                        
                        <div class="setting-control">
                            <label for="memory-toggle">Conversation Memory</label>
                            <label class="toggle-switch">
                                <input type="checkbox" id="memory-toggle" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="sidebar-section">
                        <h3>Multimodal Options</h3>
                        <div class="setting-control checkbox-control">
                            <input type="checkbox" id="enable-text" checked>
                            <label for="enable-text">Text Processing</label>
                        </div>
                        
                        <div class="setting-control checkbox-control">
                            <input type="checkbox" id="enable-vision" checked>
                            <label for="enable-vision">Image Understanding</label>
                        </div>
                        
                        <div class="setting-control checkbox-control">
                            <input type="checkbox" id="enable-audio" checked>
                            <label for="enable-audio">Audio Processing</label>
                        </div>
                        
                        <div class="setting-control checkbox-control">
                            <input type="checkbox" id="enable-crossmodal" checked>
                            <label for="enable-crossmodal">Cross-modal Analysis</label>
                        </div>
                    </div>
                    
                    <div class="sidebar-section actions">
                        <button id="clear-conversation" class="secondary-button">
                            <i class="fas fa-trash"></i> Clear Conversation
                        </button>
                        <button id="export-conversation" class="secondary-button">
                            <i class="fas fa-download"></i> Export Conversation
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        featureContainer.appendChild(multimodalUI);
    }

    // Bind event listeners for multimodal processor
    function bindMultimodalEvents() {
        // Send message button
        const sendButton = document.getElementById('send-message');
        const messageInput = document.getElementById('message-input');
        
        if (sendButton && messageInput) {
            sendButton.addEventListener('click', () => {
                const message = messageInput.value.trim();
                if (message) {
                    sendMessage(message);
                    messageInput.value = '';
                }
            });
            
            messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendButton.click();
                }
            });
        }
        
        // Add image button
        const addImageButton = document.getElementById('add-image');
        if (addImageButton) {
            addImageButton.addEventListener('click', () => {
                // Create a hidden file input
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';
                
                // Append, trigger click, and remove
                document.body.appendChild(fileInput);
                fileInput.click();
                
                fileInput.addEventListener('change', () => {
                    if (fileInput.files && fileInput.files[0]) {
                        handleImageAttachment(fileInput.files[0]);
                    }
                    document.body.removeChild(fileInput);
                });
            });
        }
        
        // Add audio button
        const addAudioButton = document.getElementById('add-audio');
        if (addAudioButton) {
            addAudioButton.addEventListener('click', () => {
                startAudioRecording();
            });
        }
        
        // Add video button
        const addVideoButton = document.getElementById('add-video');
        if (addVideoButton) {
            addVideoButton.addEventListener('click', () => {
                alert('Video attachment will be supported in a future update.');
            });
        }
        
        // Add file button
        const addFileButton = document.getElementById('add-file');
        if (addFileButton) {
            addFileButton.addEventListener('click', () => {
                // Create a hidden file input
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.style.display = 'none';
                
                // Append, trigger click, and remove
                document.body.appendChild(fileInput);
                fileInput.click();
                
                fileInput.addEventListener('change', () => {
                    if (fileInput.files && fileInput.files[0]) {
                        handleFileAttachment(fileInput.files[0]);
                    }
                    document.body.removeChild(fileInput);
                });
            });
        }
        
        // Clear conversation button
        const clearButton = document.getElementById('clear-conversation');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear the entire conversation?')) {
                    clearConversation();
                }
            });
        }
        
        // Export conversation button
        const exportButton = document.getElementById('export-conversation');
        if (exportButton) {
            exportButton.addEventListener('click', () => {
                exportConversation();
            });
        }
    }

    // Send a message to the multimodal chat
    function sendMessage(message, attachments = []) {
        const chatMessages = document.getElementById('multimodal-chat-messages');
        if (!chatMessages) return;
        
        // Get selected options
        const model = document.getElementById('model-selector')?.value || 'gpt-4o';
        const language = document.getElementById('language-selector')?.value || 'english';
        const topic = document.getElementById('topic-selector')?.value || 'general';
        const responseLength = document.getElementById('response-length')?.value || 'balanced';
        const creativityLevel = document.getElementById('creativity-level')?.value || 50;
        
        // Create message HTML
        let messageHTML = `
            <div class="user-message">
                <div class="message-content">
                    <p>${message}</p>
                </div>
        `;
        
        // Add attachments to the message if any
        if (attachments.length > 0) {
            messageHTML += '<div class="message-attachments">';
            
            attachments.forEach(attachment => {
                if (attachment.type.startsWith('image/')) {
                    messageHTML += `
                        <div class="image-attachment">
                            <img src="${attachment.dataUrl}" alt="Attached image">
                        </div>
                    `;
                } else if (attachment.type.startsWith('audio/')) {
                    messageHTML += `
                        <div class="audio-attachment">
                            <audio controls src="${attachment.dataUrl}"></audio>
                        </div>
                    `;
                } else {
                    messageHTML += `
                        <div class="file-attachment">
                            <i class="fas fa-file"></i>
                            <span>${attachment.file.name}</span>
                        </div>
                    `;
                }
            });
            
            messageHTML += '</div>';
        }
        
        messageHTML += `
                <div class="message-meta">
                    <span class="message-time">${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        `;
        
        // Add message to chat
        chatMessages.innerHTML += messageHTML;
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Clear attachments preview
        document.getElementById('attachments-preview').innerHTML = '';
        
        // Create processing parameters
        const params = {
            message,
            attachments,
            model,
            language,
            topic,
            responseLength,
            creativityLevel
        };
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process message (simulate AI response)
        simulateAIResponse(params);
    }

    // Show typing indicator
    function showTypingIndicator() {
        const chatMessages = document.getElementById('multimodal-chat-messages');
        if (!chatMessages) return;
        
        const indicatorHTML = `
            <div class="ai-message typing-indicator" id="typing-indicator">
                <div class="message-content">
                    <div class="typing-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        
        chatMessages.innerHTML += indicatorHTML;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle image attachment
    function handleImageAttachment(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            
            // Add to preview
            const previewContainer = document.getElementById('attachments-preview');
            if (previewContainer) {
                previewContainer.innerHTML += `
                    <div class="attachment-preview image-preview">
                        <img src="${dataUrl}" alt="Image attachment">
                        <button class="remove-attachment">×</button>
                    </div>
                `;
                
                // Add remove button listener
                const removeButton = previewContainer.querySelector('.remove-attachment:last-child');
                if (removeButton) {
                    removeButton.addEventListener('click', function() {
                        this.parentElement.remove();
                    });
                }
            }
            
            // Store attachment data for sending
            if (!window.JAAT) window.JAAT = {};
            if (!window.JAAT.attachments) window.JAAT.attachments = [];
            
            window.JAAT.attachments.push({
                type: file.type,
                dataUrl,
                file
            });
        };
        
        reader.readAsDataURL(file);
    }

    // Start audio recording
    function startAudioRecording() {
        // Check if browser supports audio recording
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support audio recording.');
            return;
        }
        
        // Add recording indicator to UI
        const previewContainer = document.getElementById('attachments-preview');
        if (previewContainer) {
            previewContainer.innerHTML += `
                <div class="attachment-preview audio-recording-preview" id="audio-recording-preview">
                    <div class="recording-indicator">
                        <i class="fas fa-microphone"></i>
                        <span class="recording-time">00:00</span>
                    </div>
                    <button id="stop-recording" class="stop-recording-button">
                        <i class="fas fa-stop"></i>
                    </button>
                </div>
            `;
            
            // Add stop recording button listener
            const stopButton = document.getElementById('stop-recording');
            if (stopButton) {
                stopButton.addEventListener('click', stopAudioRecording);
            }
        }
        
        // Start timer
        let seconds = 0;
        const timerElement = document.querySelector('.recording-time');
        const timerInterval = setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
            const secs = (seconds % 60).toString().padStart(2, '0');
            if (timerElement) {
                timerElement.textContent = `${mins}:${secs}`;
            }
            
            // Auto-stop at 2 minutes
            if (seconds >= 120) {
                stopAudioRecording();
                clearInterval(timerInterval);
            }
        }, 1000);
        
        // Store timer interval for stopping later
        if (!window.JAAT) window.JAAT = {};
        window.JAAT.recordingInterval = timerInterval;
        
        // For demo purposes, we'll simulate recording instead of using the actual API
        console.log('Starting audio recording (simulated)');
        
        // In a real app, you would use MediaRecorder API
        /* 
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                const audioChunks = [];
                
                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });
                
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // Process the recorded audio
                        handleAudioAttachment({
                            type: 'audio/wav',
                            dataUrl: e.target.result,
                            file: new File([audioBlob], 'recording.wav', { type: 'audio/wav' })
                        });
                    };
                    
                    reader.readAsDataURL(audioBlob);
                });
                
                mediaRecorder.start();
                window.JAAT.mediaRecorder = mediaRecorder;
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
                alert('Could not access microphone. Please allow microphone access and try again.');
                
                // Clean up UI
                const recordingPreview = document.getElementById('audio-recording-preview');
                if (recordingPreview) {
                    recordingPreview.remove();
                }
                
                clearInterval(window.JAAT.recordingInterval);
            });
        */
    }

    // Stop audio recording
    function stopAudioRecording() {
        console.log('Stopping audio recording (simulated)');
        
        // Clear recording timer
        if (window.JAAT && window.JAAT.recordingInterval) {
            clearInterval(window.JAAT.recordingInterval);
        }
        
        // In a real app, you would stop the MediaRecorder
        /*
        if (window.JAAT && window.JAAT.mediaRecorder) {
            window.JAAT.mediaRecorder.stop();
        }
        */
        
        // Remove recording UI
        const recordingPreview = document.getElementById('audio-recording-preview');
        if (recordingPreview) {
            recordingPreview.remove();
        }
        
        // For demo purposes, simulate a recorded audio file
        const audioUrl = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
        
        // Add to preview
        const previewContainer = document.getElementById('attachments-preview');
        if (previewContainer) {
            previewContainer.innerHTML += `
                <div class="attachment-preview audio-preview">
                    <audio controls src="${audioUrl}"></audio>
                    <button class="remove-attachment">×</button>
                </div>
            `;
            
            // Add remove button listener
            const removeButton = previewContainer.querySelector('.remove-attachment:last-child');
            if (removeButton) {
                removeButton.addEventListener('click', function() {
                    this.parentElement.remove();
                });
            }
        }
        
        // Store attachment data for sending
        if (!window.JAAT) window.JAAT = {};
        if (!window.JAAT.attachments) window.JAAT.attachments = [];
        
        window.JAAT.attachments.push({
            type: 'audio/wav',
            dataUrl: audioUrl,
            file: { name: 'recording.wav', type: 'audio/wav' }
        });
    }

    // Handle file attachment
    function handleFileAttachment(file) {
        // For demo purposes, we'll support a limited set of file types
        const supportedTypes = [
            'text/plain', 'text/csv', 'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        
        if (!supportedTypes.includes(file.type)) {
            alert('This file type is not supported for multimodal analysis.');
            return;
        }
        
        // Get file icon based on type
        let fileIcon = 'fas fa-file';
        if (file.type === 'text/plain') fileIcon = 'fas fa-file-alt';
        else if (file.type === 'text/csv') fileIcon = 'fas fa-file-csv';
        else if (file.type === 'application/pdf') fileIcon = 'fas fa-file-pdf';
        else if (file.type.includes('wordprocessing')) fileIcon = 'fas fa-file-word';
        else if (file.type.includes('spreadsheet')) fileIcon = 'fas fa-file-excel';
        
        // Add to preview
        const previewContainer = document.getElementById('attachments-preview');
        if (previewContainer) {
            previewContainer.innerHTML += `
                <div class="attachment-preview file-preview">
                    <div class="file-icon">
                        <i class="${fileIcon}"></i>
                    </div>
                    <span class="file-name">${file.name}</span>
                    <button class="remove-attachment">×</button>
                </div>
            `;
            
            // Add remove button listener
            const removeButton = previewContainer.querySelector('.remove-attachment:last-child');
            if (removeButton) {
                removeButton.addEventListener('click', function() {
                    this.parentElement.remove();
                });
            }
        }
        
        // Store attachment data for sending
        if (!window.JAAT) window.JAAT = {};
        if (!window.JAAT.attachments) window.JAAT.attachments = [];
        
        // In a real app, you would read file contents
        // For demo, we'll just store the file metadata
        window.JAAT.attachments.push({
            type: file.type,
            file
        });
    }

    // Simulate AI response (in a real app, this would call an API)
    function simulateAIResponse(params) {
        console.log('Processing message with parameters:', params);
        
        // Determine response time based on complexity (0.5-3 seconds)
        let responseTime = 500 + Math.random() * 2500;
        
        // Add more time if there are attachments
        if (params.attachments && params.attachments.length > 0) {
            responseTime += params.attachments.length * 1000;
        }
        
        // Generate response after delay
        setTimeout(() => {
            // Remove typing indicator
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            
            // Generate appropriate response
            let responseText = '';
            let responseHTML = '';
            
            // Text-only response if no attachments
            if (!params.attachments || params.attachments.length === 0) {
                // Generate response based on message
                if (params.message.toLowerCase().includes('hello') || params.message.toLowerCase().includes('hi')) {
                    responseText = `Hello! I'm a multimodal AI assistant. I can understand and respond to text, images, audio, and more. How can I help you today?`;
                } else if (params.message.toLowerCase().includes('how are you')) {
                    responseText = `I'm functioning well, thank you for asking! As an AI assistant, I don't have feelings, but I'm ready to help you with any tasks that require multimodal processing. What would you like to work on today?`;
                } else if (params.message.toLowerCase().includes('help') || params.message.toLowerCase().includes('features')) {
                    responseText = `I can help with various tasks using my multimodal capabilities:\n\n• Text analysis and generation\n• Image understanding and description\n• Audio transcription and analysis\n• Document processing and summarization\n• Cross-modal reasoning (connecting information across different formats)\n\nYou can send me text, images, audio recordings, or documents, and I'll process them to provide helpful responses.`;
                } else if (params.message.toLowerCase().includes('weather')) {
                    responseText = `I don't have real-time access to weather data, but I can help you understand weather forecasts, explain meteorological concepts, or even help you interpret weather radar images if you share them with me.`;
                } else {
                    responseText = `Thanks for your message! I'm a multimodal AI that can work with different types of content. I see you've sent a text message. You can also share images, audio recordings, or files if you'd like me to analyze those as well. How else can I assist you today?`;
                }
            } 
            // Response with image attachment
            else if (params.attachments.some(a => a.type.startsWith('image/'))) {
                responseText = `I've analyzed the image you shared. This appears to be a detailed photograph or digital artwork. The image shows excellent composition and visual elements. If you have specific questions about the image or would like me to focus on certain aspects, please let me know!`;
            }
            // Response with audio attachment
            else if (params.attachments.some(a => a.type.startsWith('audio/'))) {
                responseText = `I've processed the audio recording you shared. It's approximately a few seconds long. If this was meant to be voice input, I can transcribe and respond to it. If you'd like me to analyze the audio characteristics instead, please let me know.`;
            }
            // Response with document attachment
            else {
                const fileName = params.attachments[0].file.name;
                responseText = `I've received your file "${fileName}". This appears to be a document that I can analyze for you. Would you like me to summarize its contents, extract specific information, or perform some other analysis on it?`;
            }
            
            // Create AI message HTML
            responseHTML = `
                <div class="ai-message">
                    <div class="ai-avatar">
                        <img src="assets/images/ai-avatar.svg" alt="AI">
                    </div>
                    <div class="message-content">
                        <p>${responseText.replace(/\n/g, '<br>')}</p>
                    </div>
                    <div class="message-meta">
                        <span class="model-used">${params.model}</span>
                        <span class="message-time">${new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            `;
            
            // Add response to chat
            const chatMessages = document.getElementById('multimodal-chat-messages');
            if (chatMessages) {
                chatMessages.innerHTML += responseHTML;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // Clear attachments data
            if (window.JAAT) {
                window.JAAT.attachments = [];
            }
        }, responseTime);
    }

    // Clear conversation
    function clearConversation() {
        const chatMessages = document.getElementById('multimodal-chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML = `
                <div class="system-message">
                    <div class="message-content">
                        <p>Welcome to Multimodal Chat! I can understand and respond to text, images, audio, and more. How can I help you today?</p>
                    </div>
                </div>
            `;
        }
    }

    // Export conversation
    function exportConversation() {
        const chatMessages = document.getElementById('multimodal-chat-messages');
        if (!chatMessages) return;
        
        // Extract text from messages
        let conversationText = '# JAAT-AI Multimodal Chat Export\n';
        conversationText += `Generated: ${new Date().toLocaleString()}\n\n`;
        
        const userMessages = chatMessages.querySelectorAll('.user-message');
        const aiMessages = chatMessages.querySelectorAll('.ai-message:not(.typing-indicator)');
        const systemMessages = chatMessages.querySelectorAll('.system-message');
        
        // Add system messages
        systemMessages.forEach(msg => {
            const content = msg.querySelector('.message-content')?.textContent.trim();
            if (content) {
                conversationText += `[System] ${content}\n\n`;
            }
        });
        
        // Interleave user and AI messages (this is simplified and not perfect)
        const totalMessages = Math.max(userMessages.length, aiMessages.length);
        for (let i = 0; i < totalMessages; i++) {
            if (userMessages[i]) {
                const content = userMessages[i].querySelector('.message-content')?.textContent.trim();
                if (content) {
                    conversationText += `User: ${content}\n\n`;
                }
            }
            
            if (aiMessages[i]) {
                const content = aiMessages[i].querySelector('.message-content')?.textContent.trim();
                if (content) {
                    conversationText += `AI: ${content}\n\n`;
                }
            }
        }
        
        // Create download link
        const blob = new Blob([conversationText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `jaat-ai-chat-export-${Date.now()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMultimodalProcessing);
    } else {
        initMultimodalProcessing();
    }
})();
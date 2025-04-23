/**
 * File upload handling for JAAT-AI
 * Supports image analysis and text file processing
 */

document.addEventListener('DOMContentLoaded', function() {
    initFileUpload();
});

/**
 * Initialize file upload functionality
 */
function initFileUpload() {
    setupFileUploadButton();
    setupDragAndDrop();
}

/**
 * Setup file upload button and input
 */
function setupFileUploadButton() {
    const fileUploadBtn = document.getElementById('fileUploadBtn');
    const fileUploadInput = document.getElementById('fileUploadInput');
    
    if (fileUploadBtn && fileUploadInput) {
        // Open file picker when button is clicked
        fileUploadBtn.addEventListener('click', function() {
            fileUploadInput.click();
        });
        
        // Handle file selection
        fileUploadInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });
    }
}

/**
 * Setup drag and drop functionality for the input area
 */
function setupDragAndDrop() {
    const inputArea = document.querySelector('.input-area');
    
    if (!inputArea) return;
    
    // Add drag-and-drop classes and styling
    const style = document.createElement('style');
    style.textContent = `
        .input-area.drag-over {
            border: 2px dashed var(--primary-color);
            background-color: rgba(78, 145, 255, 0.05);
        }
        
        .file-preview {
            max-width: 300px;
            margin: 10px auto;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }
        
        .file-preview img {
            width: 100%;
            display: block;
        }
        
        .file-info {
            font-size: 12px;
            opacity: 0.7;
            margin-top: 5px;
            text-align: center;
        }
        
        .processing-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
            animation: pulse 1.5s infinite ease-in-out;
        }
        
        @keyframes pulse {
            0%, 100% {
                opacity: 0.5;
            }
            50% {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add drag-and-drop event listeners
    inputArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        inputArea.classList.add('drag-over');
    });
    
    inputArea.addEventListener('dragleave', function() {
        inputArea.classList.remove('drag-over');
    });
    
    inputArea.addEventListener('drop', function(e) {
        e.preventDefault();
        inputArea.classList.remove('drag-over');
        
        // Check if there are files
        if (e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });
}

/**
 * Handle file upload
 * @param {File} file - Uploaded file
 */
function handleFileUpload(file) {
    // Check if chat is active
    if (!window.currentChatId) {
        createNewChat();
    }
    
    // Validate file type
    if (!validateFileType(file)) {
        showToast('Unsupported file type. Please upload an image or text file.', 'error');
        return;
    }
    
    // Validate file size (10MB max)
    if (!validateFileSize(file)) {
        showToast('File is too large. Maximum size is 10MB.', 'error');
        return;
    }
    
    // Create processing message
    const processingMessage = createProcessingMessage(file);
    
    // Add to UI
    const messagesContainer = document.getElementById('messagesContainer');
    if (messagesContainer) {
        messagesContainer.appendChild(processingMessage);
        scrollToBottom();
    }
    
    // Process file
    processUploadedFile(file, processingMessage);
}

/**
 * Validate file type
 * @param {File} file - File to validate
 * @returns {boolean} - Whether file type is valid
 */
function validateFileType(file) {
    // Check if file is an image or text file
    const fileType = file.type.split('/')[0];
    const validTypes = ['image', 'text'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.txt', '.md', '.json', '.csv'];
    
    // Check MIME type
    if (validTypes.includes(fileType)) {
        return true;
    }
    
    // Check file extension
    const fileName = file.name.toLowerCase();
    return validExtensions.some(ext => fileName.endsWith(ext));
}

/**
 * Validate file size
 * @param {File} file - File to validate
 * @returns {boolean} - Whether file size is valid
 */
function validateFileSize(file) {
    // Maximum size: 10MB
    const maxSize = 10 * 1024 * 1024;
    return file.size <= maxSize;
}

/**
 * Create processing message element
 * @param {File} file - Uploaded file
 * @returns {HTMLElement} - Processing message element
 */
function createProcessingMessage(file) {
    // Create message container
    const messageEl = document.createElement('div');
    messageEl.className = 'message user-message';
    messageEl.dataset.messageId = 'file_upload_' + Date.now();
    
    // Create avatar
    const avatarEl = document.createElement('div');
    avatarEl.className = 'message-avatar';
    avatarEl.textContent = 'U';
    
    // Create content
    const contentEl = document.createElement('div');
    contentEl.className = 'message-content';
    
    // Add file info
    const fileInfo = document.createElement('div');
    fileInfo.textContent = `Uploading file: ${file.name} (${formatFileSize(file.size)})`;
    
    // Add processing indicator
    const processingIndicator = document.createElement('div');
    processingIndicator.className = 'processing-indicator';
    processingIndicator.textContent = 'Processing...';
    
    // Assemble content
    contentEl.appendChild(fileInfo);
    contentEl.appendChild(processingIndicator);
    
    // Assemble message
    messageEl.appendChild(avatarEl);
    messageEl.appendChild(contentEl);
    
    return messageEl;
}

/**
 * Format file size in human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
function formatFileSize(bytes) {
    if (bytes < 1024) {
        return bytes + ' bytes';
    } else if (bytes < 1048576) {
        return (bytes / 1024).toFixed(1) + ' KB';
    } else {
        return (bytes / 1048576).toFixed(1) + ' MB';
    }
}

/**
 * Process uploaded file
 * @param {File} file - Uploaded file
 * @param {HTMLElement} processingMessageEl - Processing message element
 */
async function processUploadedFile(file, processingMessageEl) {
    try {
        // Process file using API
        const result = await window.JAAT_API.processFile(file);
        
        // Update processing message
        updateProcessingMessage(processingMessageEl, file, result);
        
        // Add user message to chat
        const userMessage = {
            id: processingMessageEl.dataset.messageId,
            role: 'user',
            content: `<p>Uploaded file: ${file.name}</p>`,
            timestamp: new Date(),
            file: {
                name: file.name,
                type: file.type,
                size: file.size
            }
        };
        
        // Get current chat
        const currentChat = window.chats.find(chat => chat.id === window.currentChatId);
        if (currentChat) {
            // Add user message
            currentChat.messages.push(userMessage);
            
            // Create and add AI response
            const aiResponse = {
                id: 'msg_' + Date.now(),
                role: 'assistant',
                content: formatFileAnalysisResponse(result, file),
                timestamp: new Date()
            };
            
            // Create and add AI message to UI
            const messagesContainer = document.getElementById('messagesContainer');
            if (messagesContainer) {
                const messageElement = createMessageElement(aiResponse);
                messagesContainer.appendChild(messageElement);
                scrollToBottom();
            }
            
            // Add to chat
            currentChat.messages.push(aiResponse);
            currentChat.lastUpdated = new Date();
            
            // Save to storage
            if (typeof saveChats === 'function') {
                saveChats();
            }
        }
    } catch (error) {
        console.error('File processing error:', error);
        
        // Update processing message with error
        if (processingMessageEl) {
            const contentEl = processingMessageEl.querySelector('.message-content');
            if (contentEl) {
                // Clear previous content
                contentEl.innerHTML = '';
                
                // Add error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = `Error processing file: ${error.message}`;
                contentEl.appendChild(errorMessage);
                
                // Add timestamp
                const timeEl = document.createElement('div');
                timeEl.className = 'message-time';
                timeEl.textContent = formatMessageTime(new Date());
                contentEl.appendChild(timeEl);
            }
        }
        
        // Show toast
        if (typeof showToast === 'function') {
            showToast('Error processing file. Please try again or use a different file.', 'error');
        }
    }
}

/**
 * Update processing message with result
 * @param {HTMLElement} messageEl - Processing message element
 * @param {File} file - Uploaded file
 * @param {Object} result - Processing result
 */
function updateProcessingMessage(messageEl, file, result) {
    if (!messageEl) return;
    
    const contentEl = messageEl.querySelector('.message-content');
    if (!contentEl) return;
    
    // Clear previous content
    contentEl.innerHTML = '';
    
    // Create file info
    const fileInfo = document.createElement('p');
    fileInfo.textContent = `Uploaded file: ${file.name} (${formatFileSize(file.size)})`;
    contentEl.appendChild(fileInfo);
    
    // Add preview for images
    if (file.type.startsWith('image/') && result.preview) {
        const previewContainer = document.createElement('div');
        previewContainer.className = 'file-preview';
        
        const img = document.createElement('img');
        img.src = result.preview;
        img.alt = file.name;
        
        previewContainer.appendChild(img);
        contentEl.appendChild(previewContainer);
    }
    
    // Add timestamp
    const timeEl = document.createElement('div');
    timeEl.className = 'message-time';
    timeEl.textContent = formatMessageTime(new Date());
    contentEl.appendChild(timeEl);
}

/**
 * Format file analysis response
 * @param {Object} result - Analysis result
 * @param {File} file - Uploaded file
 * @returns {string} - Formatted response
 */
function formatFileAnalysisResponse(result, file) {
    if (file.type.startsWith('image/')) {
        // Format image analysis
        return `<h3>Image Analysis</h3>${result.content}`;
    } else {
        // Format text file content
        return `<h3>File Content: ${file.name}</h3><pre>${escapeHtml(result.content)}</pre>`;
    }
}

/**
 * Escape HTML special characters
 * @param {string} text - HTML string
 * @returns {string} - Escaped HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
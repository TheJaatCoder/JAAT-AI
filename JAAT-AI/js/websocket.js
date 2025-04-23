/**
 * WebSocket functionality for JAAT-AI
 * Handles real-time communication between clients
 */

// Initialize WebSocket connection when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    initWebSocket();
});

// WebSocket connection
let socket = null;
let reconnectAttempts = 0;
let maxReconnectAttempts = 5;
let reconnectTimeout = null;
let heartbeatInterval = null;
let clientId = generateClientId();

/**
 * Initialize WebSocket connection
 */
function initWebSocket() {
    // Setup connection
    setupWebSocketConnection();
    
    // Set up connection status updates
    setupConnectionStatus();
}

/**
 * Set up WebSocket connection
 */
function setupWebSocketConnection() {
    // Close existing connection if any
    if (socket) {
        socket.close();
    }
    
    try {
        // Determine WebSocket protocol and URL
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws`;
        
        // Create WebSocket connection
        socket = new WebSocket(wsUrl);
        
        // Set up event handlers
        socket.addEventListener('open', handleSocketOpen);
        socket.addEventListener('message', handleSocketMessage);
        socket.addEventListener('close', handleSocketClose);
        socket.addEventListener('error', handleSocketError);
    } catch (error) {
        console.error('WebSocket initialization error:', error);
        updateConnectionStatus('disconnected', 'Failed to connect');
    }
}

/**
 * Set up connection status indicator
 */
function setupConnectionStatus() {
    const connectionStatus = document.getElementById('connectionStatus');
    if (!connectionStatus) return;
    
    // Add styles if not already added
    if (!document.querySelector('#ws-status-styles')) {
        const style = document.createElement('style');
        style.id = 'ws-status-styles';
        style.textContent = `
            .status-indicator {
                position: relative;
                padding-left: 20px;
                transition: all 0.3s ease;
            }
            
            .status-indicator::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 8px;
                height: 8px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .status-indicator.connected {
                color: #27ae60;
            }
            
            .status-indicator.connected::before {
                background-color: #27ae60;
                box-shadow: 0 0 10px rgba(39, 174, 96, 0.5);
            }
            
            .status-indicator.connecting {
                color: #f39c12;
            }
            
            .status-indicator.connecting::before {
                background-color: #f39c12;
                box-shadow: 0 0 10px rgba(243, 156, 18, 0.5);
                animation: pulse 1s infinite ease-in-out;
            }
            
            .status-indicator.disconnected {
                color: #e74c3c;
            }
            
            .status-indicator.disconnected::before {
                background-color: #e74c3c;
                box-shadow: 0 0 10px rgba(231, 76, 60, 0.5);
            }
            
            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.3;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Update connection status indicator
 * @param {string} status - Connection status
 * @param {string} message - Status message
 */
function updateConnectionStatus(status, message = '') {
    const connectionStatus = document.getElementById('connectionStatus');
    if (!connectionStatus) return;
    
    // Remove all status classes
    connectionStatus.classList.remove('connected', 'connecting', 'disconnected');
    
    // Add appropriate class
    connectionStatus.classList.add(status);
    
    // Set text
    switch (status) {
        case 'connected':
            connectionStatus.textContent = message || 'Connected';
            break;
        case 'connecting':
            connectionStatus.textContent = message || 'Connecting...';
            break;
        case 'disconnected':
            connectionStatus.textContent = message || 'Disconnected';
            break;
    }
}

/**
 * Handle WebSocket open event
 */
function handleSocketOpen() {
    console.log('WebSocket connected');
    updateConnectionStatus('connected');
    
    // Reset reconnect attempts
    reconnectAttempts = 0;
    
    // Clear any pending reconnect
    if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
    }
    
    // Start heartbeat
    startHeartbeat();
    
    // Send authentication
    sendAuthentication();
}

/**
 * Handle WebSocket message event
 * @param {MessageEvent} event - Message event
 */
function handleSocketMessage(event) {
    try {
        const message = JSON.parse(event.data);
        
        // Process message based on type
        switch (message.type) {
            case 'heartbeat':
                // Respond to heartbeat
                sendToServer({
                    type: 'heartbeat_ack',
                    clientId: clientId
                });
                break;
                
            case 'chat_message':
                // Handle incoming chat message
                handleChatMessage(message);
                break;
                
            case 'typing_indicator':
                // Handle typing indicator
                handleTypingIndicator(message);
                break;
                
            case 'auth_response':
                // Handle authentication response
                handleAuthResponse(message);
                break;
                
            default:
                console.log('Unknown message type:', message.type);
        }
    } catch (error) {
        console.error('Error processing message:', error);
    }
}

/**
 * Handle WebSocket close event
 * @param {CloseEvent} event - Close event
 */
function handleSocketClose(event) {
    console.log('WebSocket disconnected:', event.code, event.reason);
    updateConnectionStatus('disconnected');
    
    // Stop heartbeat
    stopHeartbeat();
    
    // Attempt to reconnect
    if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts - 1), 30000);
        console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts})`);
        
        updateConnectionStatus('connecting', `Reconnecting (${reconnectAttempts}/${maxReconnectAttempts})...`);
        
        reconnectTimeout = setTimeout(() => {
            setupWebSocketConnection();
        }, delay);
    } else {
        console.log('Maximum reconnect attempts reached');
        updateConnectionStatus('disconnected', 'Connection failed');
        
        // Show error toast if available
        if (typeof showToast === 'function') {
            showToast('Could not establish a real-time connection. Some features may be limited.', 'error');
        }
    }
}

/**
 * Handle WebSocket error event
 * @param {Event} event - Error event
 */
function handleSocketError(event) {
    console.error('WebSocket error:', event);
    updateConnectionStatus('disconnected', 'Connection error');
}

/**
 * Send message to the server
 * @param {Object} message - Message object
 * @returns {boolean} - Whether message was sent
 */
function sendToServer(message) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.error('WebSocket not connected');
        return false;
    }
    
    try {
        socket.send(JSON.stringify(message));
        return true;
    } catch (error) {
        console.error('Error sending message:', error);
        return false;
    }
}

/**
 * Send authentication message
 */
function sendAuthentication() {
    // Get user info if available
    const userInfo = {
        clientId: clientId,
        username: 'Guest_' + clientId.substring(0, 8),
        timestamp: new Date().toISOString()
    };
    
    // Send authentication request
    sendToServer({
        type: 'authenticate',
        data: userInfo
    });
}

/**
 * Handle authentication response
 * @param {Object} message - Auth response message
 */
function handleAuthResponse(message) {
    if (message.success) {
        console.log('Authentication successful');
        
        // If we're in a chat room, join it
        if (window.currentChatId) {
            joinChatRoom(window.currentChatId);
        }
    } else {
        console.error('Authentication failed:', message.error);
    }
}

/**
 * Join a chat room
 * @param {string} chatId - Chat ID
 */
function joinChatRoom(chatId) {
    sendToServer({
        type: 'join_chat',
        chatId: chatId,
        clientId: clientId
    });
}

/**
 * Leave a chat room
 * @param {string} chatId - Chat ID
 */
function leaveChatRoom(chatId) {
    sendToServer({
        type: 'leave_chat',
        chatId: chatId,
        clientId: clientId
    });
}

/**
 * Handle incoming chat message
 * @param {Object} message - Chat message
 */
function handleChatMessage(message) {
    // Only handle messages for the current chat
    if (!window.currentChatId || message.chatId !== window.currentChatId) {
        return;
    }
    
    // Skip messages from this client
    if (message.clientId === clientId) {
        return;
    }
    
    // Process message
    const chatMessage = message.message;
    
    // Create message object
    const newMessage = {
        id: 'msg_' + Date.now(),
        role: chatMessage.role,
        content: chatMessage.content,
        timestamp: new Date(),
        fromClient: message.clientId
    };
    
    // Get current chat
    const currentChat = window.chats.find(chat => chat.id === window.currentChatId);
    if (currentChat) {
        // Add to chat
        currentChat.messages.push(newMessage);
        currentChat.lastUpdated = new Date();
        
        // Save to storage
        if (typeof saveChats === 'function') {
            saveChats();
        }
        
        // Add to UI
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer && typeof createMessageElement === 'function') {
            const messageElement = createMessageElement(newMessage);
            messagesContainer.appendChild(messageElement);
            
            // Scroll to bottom
            if (typeof scrollToBottom === 'function') {
                scrollToBottom();
            } else {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    }
}

/**
 * Handle typing indicator
 * @param {Object} message - Typing indicator message
 */
function handleTypingIndicator(message) {
    // Only handle for current chat
    if (!window.currentChatId || message.chatId !== window.currentChatId) {
        return;
    }
    
    // Skip indicators from this client
    if (message.clientId === clientId) {
        return;
    }
    
    // Show/hide typing indicator
    if (message.isTyping) {
        showRemoteTypingIndicator(message.clientId);
    } else {
        hideRemoteTypingIndicator(message.clientId);
    }
}

/**
 * Show remote typing indicator
 * @param {string} clientId - Client ID
 */
function showRemoteTypingIndicator(clientId) {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;
    
    // Check if indicator already exists
    let indicator = document.querySelector(`.typing-indicator[data-client="${clientId}"]`);
    
    if (!indicator) {
        // Create indicator
        indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.dataset.client = clientId;
        
        // Add dots
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            indicator.appendChild(dot);
        }
        
        // Add to container
        messagesContainer.appendChild(indicator);
        
        // Scroll to bottom
        if (typeof scrollToBottom === 'function') {
            scrollToBottom();
        } else {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
}

/**
 * Hide remote typing indicator
 * @param {string} clientId - Client ID
 */
function hideRemoteTypingIndicator(clientId) {
    const indicator = document.querySelector(`.typing-indicator[data-client="${clientId}"]`);
    if (indicator) {
        indicator.remove();
    }
}

/**
 * Send typing indicator
 * @param {boolean} isTyping - Whether user is typing
 */
function sendTypingIndicator(isTyping) {
    if (!window.currentChatId) return;
    
    sendToServer({
        type: 'typing_indicator',
        chatId: window.currentChatId,
        clientId: clientId,
        isTyping: isTyping
    });
}

/**
 * Start heartbeat interval
 */
function startHeartbeat() {
    stopHeartbeat();
    
    heartbeatInterval = setInterval(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            sendToServer({
                type: 'heartbeat',
                clientId: clientId,
                timestamp: new Date().toISOString()
            });
        }
    }, 30000); // 30 seconds
}

/**
 * Stop heartbeat interval
 */
function stopHeartbeat() {
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
    }
}

/**
 * Generate a unique client ID
 * @returns {string} - Client ID
 */
function generateClientId() {
    // Simple UUID generator
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    
    // Try to get existing client ID
    const existingId = localStorage.getItem('jaat-ai-client-id');
    if (existingId) {
        return existingId;
    }
    
    // Generate a new ID
    const newId = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    localStorage.setItem('jaat-ai-client-id', newId);
    
    return newId;
}

// Add input event listeners for typing indicators
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    if (userInput) {
        let typingTimer;
        let isTyping = false;
        
        userInput.addEventListener('input', function() {
            if (!isTyping) {
                isTyping = true;
                sendTypingIndicator(true);
            }
            
            clearTimeout(typingTimer);
            
            typingTimer = setTimeout(() => {
                isTyping = false;
                sendTypingIndicator(false);
            }, 2000);
        });
    }
});
/**
 * API integration for JAAT-AI
 * Handles communication with OpenAI and other external APIs
 */

// Define JAAT API interface
window.JAAT_API = {
    sendMessageToAPI,
    analyzeImage,
    generateImage,
    processFile
};

/**
 * Send a message to the OpenAI API
 * @param {string} chatId - Current chat ID
 * @param {string} message - User message
 * @param {string} mode - AI mode (assistant, creative, coder, etc.)
 * @returns {Promise<Object>} - AI response
 */
async function sendMessageToAPI(chatId, message, mode = 'assistant') {
    try {
        // Get settings
        const settings = getSettings();
        
        // Validate API key
        if (!settings.apiKey) {
            throw new Error('No API key provided. Please add your OpenAI API key in Settings.');
        }
        
        // Get chat history
        const currentChat = getCurrentChat(chatId);
        if (!currentChat) {
            throw new Error('Chat not found.');
        }
        
        // Format messages for API
        const apiMessages = formatMessagesForAPI(currentChat.messages, message, mode);
        
        // Call OpenAI API
        const response = await callOpenAI(apiMessages, settings);
        
        return {
            content: response.content,
            model: response.model,
            usage: response.usage
        };
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Analyze an image using OpenAI Vision
 * @param {string} imageData - Base64 encoded image data
 * @param {string} prompt - User prompt for image analysis
 * @returns {Promise<Object>} - Analysis result
 */
async function analyzeImage(imageData, prompt) {
    try {
        // Get settings
        const settings = getSettings();
        
        // Validate API key
        if (!settings.apiKey) {
            throw new Error('No API key provided. Please add your OpenAI API key in Settings.');
        }
        
        // Default prompt if not provided
        const analysisPrompt = prompt || 'Analyze this image in detail. Describe what you see and any relevant information.';
        
        // Create message with image
        const messages = [
            {
                role: 'user',
                content: [
                    { type: 'text', text: analysisPrompt },
                    {
                        type: 'image_url',
                        image_url: {
                            url: `data:image/jpeg;base64,${imageData}`
                        }
                    }
                ]
            }
        ];
        
        // Use GPT-4 Vision
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${settings.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o', // GPT-4o is multimodal
                messages: messages,
                max_tokens: 1000,
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to analyze image');
        }
        
        const data = await response.json();
        
        return {
            content: data.choices[0].message.content,
            model: data.model,
            usage: data.usage
        };
    } catch (error) {
        console.error('Image Analysis Error:', error);
        throw error;
    }
}

/**
 * Generate an image using DALL-E
 * @param {string} prompt - Description of the image to generate
 * @returns {Promise<Object>} - Generated image data
 */
async function generateImage(prompt) {
    try {
        // Get settings
        const settings = getSettings();
        
        // Validate API key
        if (!settings.apiKey) {
            throw new Error('No API key provided. Please add your OpenAI API key in Settings.');
        }
        
        // Call DALL-E API
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${settings.apiKey}`
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: prompt,
                n: 1,
                size: '1024x1024',
                quality: 'standard',
                response_format: 'url'
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to generate image');
        }
        
        const data = await response.json();
        
        return {
            url: data.data[0].url,
            prompt: data.data[0].revised_prompt || prompt
        };
    } catch (error) {
        console.error('Image Generation Error:', error);
        throw error;
    }
}

/**
 * Process file content
 * @param {File} file - File to process
 * @returns {Promise<Object>} - Processed file content
 */
async function processFile(file) {
    return new Promise((resolve, reject) => {
        // Check file type
        const fileType = file.type.split('/')[0];
        const fileReader = new FileReader();
        
        fileReader.onload = async (e) => {
            try {
                let result;
                
                // Process based on file type
                if (fileType === 'image') {
                    // Process image
                    // Remove data URL prefix for base64 encoding
                    const base64Data = e.target.result.split(',')[1];
                    
                    // Analyze image with OpenAI
                    result = await analyzeImage(base64Data);
                    
                    // Add preview
                    result.preview = e.target.result;
                } else {
                    // Process text file
                    const content = e.target.result;
                    
                    // Return simple result for text files
                    result = {
                        content: `File: ${file.name}\n\n${content}`,
                        fileName: file.name,
                        fileType: file.type,
                        fileSize: file.size
                    };
                }
                
                resolve(result);
            } catch (error) {
                reject(error);
            }
        };
        
        fileReader.onerror = () => {
            reject(new Error('Failed to read file'));
        };
        
        // Read file based on type
        if (fileType === 'image') {
            fileReader.readAsDataURL(file);
        } else {
            fileReader.readAsText(file);
        }
    });
}

/**
 * Format messages for the OpenAI API
 * @param {Array} messages - Array of message objects
 * @param {string} newMessage - New user message
 * @param {string} mode - AI mode
 * @returns {Array} - Formatted messages
 */
function formatMessagesForAPI(messages, newMessage, mode) {
    // Create system message based on mode
    let systemContent = 'You are JAAT-AI, an advanced AI assistant created by Rohit Sangwan. Answer the following question in a helpful, concise, accurate, and friendly manner. Format your response with Markdown syntax for easier reading. Include code blocks with language tags when sharing code examples.';
    
    // Add mode-specific instructions
    switch (mode) {
        case 'creative':
            systemContent += ' Be creative, imaginative, and thought-provoking in your responses. Feel free to think outside the box and provide unique perspectives and ideas.';
            break;
        case 'coder':
            systemContent += ' Focus on providing clear, efficient, and well-documented code examples. Explain the code thoroughly and include best practices. Prioritize practical solutions and consider edge cases.';
            break;
        case 'analyst':
            systemContent += ' Analyze information methodically and objectively. Present balanced viewpoints, cite relevant facts, and provide structured analysis. Be thorough yet concise in your explanations.';
            break;
        case 'researcher':
            systemContent += ' Provide in-depth, well-researched information with attention to detail. Focus on accuracy and completeness. Explain complex topics clearly and present multiple perspectives when appropriate.';
            break;
    }
    
    // Create API messages array
    const apiMessages = [
        { role: 'system', content: systemContent }
    ];
    
    // Add chat history (limit to last 10 messages to stay within token limits)
    const recentMessages = messages.slice(-10);
    recentMessages.forEach(msg => {
        apiMessages.push({
            role: msg.role,
            content: extractTextContent(msg.content)
        });
    });
    
    // Add new user message
    apiMessages.push({ role: 'user', content: newMessage });
    
    return apiMessages;
}

/**
 * Extract plain text from HTML content
 * @param {string} htmlContent - HTML content
 * @returns {string} - Plain text
 */
function extractTextContent(htmlContent) {
    // Simple HTML to text conversion
    // In a real app, would use a proper HTML parser
    return htmlContent
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace &nbsp; with spaces
        .replace(/&lt;/g, '<') // Replace &lt; with <
        .replace(/&gt;/g, '>') // Replace &gt; with >
        .replace(/&amp;/g, '&') // Replace &amp; with &
        .trim();
}

/**
 * Call OpenAI API
 * @param {Array} messages - Formatted messages
 * @param {Object} settings - User settings
 * @returns {Promise<Object>} - API response
 */
async function callOpenAI(messages, settings) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${settings.apiKey}`
        },
        body: JSON.stringify({
            model: settings.model || 'gpt-4o',
            messages: messages,
            temperature: 0.7,
            max_tokens: 1500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to communicate with OpenAI API');
    }
    
    const data = await response.json();
    
    // Format content with markdown
    const content = formatMarkdown(data.choices[0].message.content);
    
    return {
        content: content,
        model: data.model,
        usage: data.usage
    };
}

/**
 * Format text with markdown
 * @param {string} text - Plain text
 * @returns {string} - HTML formatted text
 */
function formatMarkdown(text) {
    // Simple markdown formatter
    // In a real app, would use a proper markdown parser
    
    // Handle code blocks with language
    text = text.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, language, code) => {
        return `<pre><code class="language-${language || 'plaintext'}">${escapeHtml(code)}</code></pre>`;
    });
    
    // Handle inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Handle headers
    text = text.replace(/^# (.*?)$/gm, '<h2>$1</h2>');
    text = text.replace(/^## (.*?)$/gm, '<h3>$1</h3>');
    text = text.replace(/^### (.*?)$/gm, '<h4>$1</h4>');
    
    // Handle bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Handle links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Handle lists
    text = text.replace(/^\s*[\-\*] (.*?)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*?<\/li>\n)+/g, '<ul>$&</ul>');
    
    // Handle numbered lists
    text = text.replace(/^\s*\d+\. (.*?)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*?<\/li>\n)+/g, '<ol>$&</ol>');
    
    // Handle paragraphs
    text = text.replace(/^([^<].*?)$/gm, (match) => {
        if (match.trim() === '') return '';
        return `<p>${match}</p>`;
    });
    
    // Replace multiple newlines with a single one
    text = text.replace(/\n\s*\n/g, '\n');
    
    return text;
}

/**
 * Escape HTML special characters
 * @param {string} html - HTML string
 * @returns {string} - Escaped HTML
 */
function escapeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}

/**
 * Get settings from storage
 * @returns {Object} Settings object
 */
function getSettings() {
    try {
        const savedSettings = localStorage.getItem('jaat-ai-settings');
        if (savedSettings) {
            return JSON.parse(savedSettings);
        }
    } catch (err) {
        console.error('Error loading settings:', err);
    }
    
    // Default settings
    return {
        theme: 'dark',
        animations: true,
        autoSave: true,
        responseSpeed: 'moderate',
        apiKey: '',
        model: 'gpt-4o'
    };
}

/**
 * Get current chat by ID
 * @param {string} chatId - Chat ID
 * @returns {Object|null} - Chat object or null if not found
 */
function getCurrentChat(chatId) {
    try {
        const chats = JSON.parse(localStorage.getItem('jaat-ai-chats') || '[]');
        return chats.find(chat => chat.id === chatId) || null;
    } catch (err) {
        console.error('Error getting chat:', err);
        return null;
    }
}
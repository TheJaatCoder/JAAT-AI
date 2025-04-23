/**
 * JAAT-AI Chatbot Export Feature
 * Export chat conversations in various formats (PDF, JSON, Markdown, HTML, etc.)
 */

class ChatbotExport {
    constructor() {
        this.supportedFormats = [
            { id: 'pdf', name: 'PDF Document', icon: 'ri-file-pdf-line' },
            { id: 'markdown', name: 'Markdown', icon: 'ri-markdown-line' },
            { id: 'html', name: 'HTML Document', icon: 'ri-html5-line' },
            { id: 'json', name: 'JSON Data', icon: 'ri-braces-line' },
            { id: 'txt', name: 'Plain Text', icon: 'ri-file-text-line' },
            { id: 'csv', name: 'CSV Data', icon: 'ri-file-excel-line' }
        ];
        
        // Theme colors for HTML and PDF exports
        this.themes = {
            light: {
                background: '#ffffff',
                cardBackground: '#f8f9fa',
                text: '#212529',
                border: '#e9ecef',
                userBubble: '#e3f2fd',
                aiBubble: '#e8f5e9',
                userText: '#0d47a1',
                aiText: '#1b5e20',
                timestamp: '#6c757d'
            },
            dark: {
                background: '#121212',
                cardBackground: '#1e1e1e',
                text: '#e0e0e0',
                border: '#333333',
                userBubble: '#0d47a1',
                aiBubble: '#1b5e20',
                userText: '#e3f2fd',
                aiText: '#e8f5e9',
                timestamp: '#9e9e9e'
            },
            colorful: {
                background: '#f5f5f5',
                cardBackground: '#ffffff',
                text: '#333333',
                border: '#dddddd',
                userBubble: '#6200ea',
                aiBubble: '#00c853',
                userText: '#ffffff',
                aiText: '#ffffff',
                timestamp: '#757575'
            }
        };
        
        // Current theme
        this.currentTheme = 'light';
        
        // Export configuration
        this.config = {
            includeTimestamps: true,
            includeMetadata: false,
            includeChatTitle: true,
            formatCodeBlocks: true,
            pageSize: 'A4',
            pageOrientation: 'portrait',
            fontFamily: 'Arial, sans-serif',
            fontSize: 12,
            exportImagesAndAttachments: true,
            maxImageSize: 800, // maximum width/height in pixels
            watermark: ''
        };
    }

    /**
     * Initialize chat export functionality
     * @param {Object} options - Configuration options
     * @returns {ChatbotExport} This instance
     */
    init(options = {}) {
        // Apply options
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        if (options.theme && this.themes[options.theme]) {
            this.currentTheme = options.theme;
        }
        
        console.log('ChatbotExport initialized');
        return this;
    }

    /**
     * Set export theme
     * @param {string} themeName - Theme name (light, dark, colorful)
     */
    setTheme(themeName) {
        if (this.themes[themeName]) {
            this.currentTheme = themeName;
        } else {
            console.warn(`Theme '${themeName}' not found, using default`);
        }
    }

    /**
     * Export chat messages to the specified format
     * @param {Array} messages - Chat messages array
     * @param {string} format - Export format ID
     * @param {Object} metadata - Additional metadata about the chat
     * @returns {Promise<string|Blob>} Exported data or Blob
     */
    async exportChat(messages, format, metadata = {}) {
        if (!messages || !Array.isArray(messages)) {
            throw new Error('Invalid messages array');
        }
        
        if (!format || !this.supportedFormats.some(f => f.id === format)) {
            throw new Error(`Unsupported format: ${format}`);
        }
        
        try {
            switch (format) {
                case 'pdf':
                    return await this.exportToPDF(messages, metadata);
                case 'markdown':
                    return this.exportToMarkdown(messages, metadata);
                case 'html':
                    return this.exportToHTML(messages, metadata);
                case 'json':
                    return this.exportToJSON(messages, metadata);
                case 'txt':
                    return this.exportToText(messages, metadata);
                case 'csv':
                    return this.exportToCSV(messages, metadata);
                default:
                    throw new Error(`Export format '${format}' not implemented`);
            }
        } catch (error) {
            console.error(`Error exporting chat to ${format}:`, error);
            throw error;
        }
    }

    /**
     * Export chat messages to PDF
     * @param {Array} messages - Chat messages array
     * @param {Object} metadata - Additional metadata about the chat
     * @returns {Promise<Blob>} PDF Blob
     */
    async exportToPDF(messages, metadata = {}) {
        // First generate HTML
        const html = this.exportToHTML(messages, metadata);
        
        try {
            // In a real implementation, would use a library like jsPDF, html2pdf, or pdfmake
            // For this example, we'll create a simple placeholder
            console.log('PDF export would use the HTML and convert it to PDF');
            
            // Create a simple blob with the HTML as placeholder
            // In a real implementation, this would be the PDF binary data
            const blob = new Blob([html], { type: 'application/pdf' });
            return blob;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
    }

    /**
     * Export chat messages to Markdown
     * @param {Array} messages - Chat messages array
     * @param {Object} metadata - Additional metadata about the chat
     * @returns {string} Markdown string
     */
    exportToMarkdown(messages, metadata = {}) {
        let markdown = '';
        
        // Add title
        if (this.config.includeChatTitle && metadata.title) {
            markdown += `# ${metadata.title}\n\n`;
        }
        
        // Add metadata
        if (this.config.includeMetadata) {
            markdown += '## Conversation Info\n\n';
            if (metadata.date) {
                markdown += `- **Date:** ${new Date(metadata.date).toLocaleString()}\n`;
            }
            if (metadata.aiMode) {
                markdown += `- **AI Mode:** ${metadata.aiMode}\n`;
            }
            
            for (const [key, value] of Object.entries(metadata)) {
                if (key !== 'title' && key !== 'date' && key !== 'aiMode') {
                    markdown += `- **${key.charAt(0).toUpperCase() + key.slice(1)}:** ${value}\n`;
                }
            }
            markdown += '\n';
        }
        
        // Add messages
        markdown += '## Conversation\n\n';
        
        for (const message of messages) {
            const role = message.role || (message.isUser ? 'user' : 'assistant');
            const content = message.content || message.text || message.message || '';
            const timestamp = message.timestamp || message.time || message.date || null;
            
            if (role === 'user') {
                markdown += `### 👤 User\n\n`;
            } else if (role === 'assistant' || role === 'ai') {
                markdown += `### 🤖 AI\n\n`;
            } else {
                markdown += `### ${role.charAt(0).toUpperCase() + role.slice(1)}\n\n`;
            }
            
            // Add timestamp
            if (this.config.includeTimestamps && timestamp) {
                const formattedTime = typeof timestamp === 'string' 
                    ? new Date(timestamp).toLocaleString() 
                    : new Date(timestamp).toLocaleString();
                markdown += `*${formattedTime}*\n\n`;
            }
            
            // Process content for code blocks and other formatting
            if (typeof content === 'string') {
                // Handle code blocks
                const formattedContent = content.replace(/```(\w*)([\s\S]*?)```/g, (match, language, code) => {
                    return `\`\`\`${language}\n${code.trim()}\n\`\`\``;
                });
                
                markdown += `${formattedContent}\n\n`;
            } else if (Array.isArray(content)) {
                // Handle array of content (e.g., multiple parts)
                for (const part of content) {
                    if (typeof part === 'string') {
                        markdown += `${part}\n\n`;
                    } else if (part.type === 'image' && part.url) {
                        markdown += `![image](${part.url})\n\n`;
                    } else if (part.type === 'code' && part.text) {
                        const lang = part.language || '';
                        markdown += `\`\`\`${lang}\n${part.text}\n\`\`\`\n\n`;
                    }
                }
            }
            
            markdown += '\n';
        }
        
        // Add footer with watermark if specified
        if (this.config.watermark) {
            markdown += `\n---\n\n*${this.config.watermark}*\n`;
        }
        
        return markdown;
    }

    /**
     * Export chat messages to HTML
     * @param {Array} messages - Chat messages array
     * @param {Object} metadata - Additional metadata about the chat
     * @returns {string} HTML string
     */
    exportToHTML(messages, metadata = {}) {
        const theme = this.themes[this.currentTheme];
        
        // Start building HTML
        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${metadata.title || 'Chat Conversation'}</title>
    <style>
        body {
            font-family: ${this.config.fontFamily};
            font-size: ${this.config.fontSize}px;
            line-height: 1.6;
            color: ${theme.text};
            background-color: ${theme.background};
            margin: 0;
            padding: 20px;
        }
        .chat-container {
            max-width: 800px;
            margin: 0 auto;
            border-radius: 8px;
            background-color: ${theme.cardBackground};
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .chat-header {
            padding: 20px;
            background-color: ${theme.border};
            border-bottom: 1px solid ${theme.border};
        }
        .chat-title {
            margin: 0;
            font-size: 1.5em;
            color: ${theme.text};
        }
        .chat-metadata {
            margin-top: 10px;
            font-size: 0.9em;
            color: ${theme.timestamp};
        }
        .chat-body {
            padding: 20px;
        }
        .message {
            margin-bottom: 20px;
            max-width: 80%;
            clear: both;
        }
        .message-user {
            float: right;
            background-color: ${theme.userBubble};
            color: ${theme.userText};
            border-radius: 15px 15px 0 15px;
            padding: 12px 18px;
        }
        .message-ai {
            float: left;
            background-color: ${theme.aiBubble};
            color: ${theme.aiText};
            border-radius: 15px 15px 15px 0;
            padding: 12px 18px;
        }
        .message-content {
            word-wrap: break-word;
        }
        .timestamp {
            font-size: 0.8em;
            color: ${theme.timestamp};
            margin-top: 5px;
            text-align: right;
        }
        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }
        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            overflow-x: auto;
        }
        code {
            font-family: monospace;
            padding: 2px 4px;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 2px;
        }
        pre code {
            padding: 0;
            background-color: transparent;
        }
        img {
            max-width: 100%;
            max-height: ${this.config.maxImageSize}px;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 0.8em;
            color: ${theme.timestamp};
            border-top: 1px solid ${theme.border};
        }
    </style>
</head>
<body>
    <div class="chat-container">`;
        
        // Add header with title and metadata
        if (this.config.includeChatTitle && metadata.title) {
            html += `
        <div class="chat-header">
            <h1 class="chat-title">${metadata.title}</h1>`;
            
            // Add metadata
            if (this.config.includeMetadata) {
                html += `
            <div class="chat-metadata">`;
                
                if (metadata.date) {
                    html += `<div>Date: ${new Date(metadata.date).toLocaleString()}</div>`;
                }
                if (metadata.aiMode) {
                    html += `<div>AI Mode: ${metadata.aiMode}</div>`;
                }
                
                for (const [key, value] of Object.entries(metadata)) {
                    if (key !== 'title' && key !== 'date' && key !== 'aiMode') {
                        html += `<div>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</div>`;
                    }
                }
                
                html += `
            </div>`;
            }
            
            html += `
        </div>`;
        }
        
        // Add messages
        html += `
        <div class="chat-body">`;
        
        for (const message of messages) {
            const role = message.role || (message.isUser ? 'user' : 'assistant');
            const content = message.content || message.text || message.message || '';
            const timestamp = message.timestamp || message.time || message.date || null;
            
            const messageClass = role === 'user' ? 'message-user' : 'message-ai';
            
            html += `
            <div class="clearfix">
                <div class="message ${messageClass}">
                    <div class="message-content">`;
            
            // Process content for code blocks and other formatting
            if (typeof content === 'string') {
                // Handle code blocks
                let formattedContent = content;
                
                if (this.config.formatCodeBlocks) {
                    formattedContent = content.replace(/```(\w*)([\s\S]*?)```/g, (match, language, code) => {
                        return `<pre><code class="language-${language}">${this.escapeHTML(code.trim())}</code></pre>`;
                    });
                    
                    // Handle inline code
                    formattedContent = formattedContent.replace(/`([^`]+)`/g, '<code>$1</code>');
                }
                
                // Handle line breaks
                formattedContent = formattedContent.replace(/\n/g, '<br>');
                
                html += formattedContent;
            } else if (Array.isArray(content)) {
                // Handle array of content (e.g., multiple parts)
                for (const part of content) {
                    if (typeof part === 'string') {
                        html += part.replace(/\n/g, '<br>');
                    } else if (part.type === 'image' && part.url && this.config.exportImagesAndAttachments) {
                        html += `<img src="${part.url}" alt="Image">`;
                    } else if (part.type === 'code' && part.text) {
                        const lang = part.language || '';
                        html += `<pre><code class="language-${lang}">${this.escapeHTML(part.text)}</code></pre>`;
                    }
                }
            }
            
            html += `
                    </div>`;
            
            // Add timestamp
            if (this.config.includeTimestamps && timestamp) {
                const formattedTime = typeof timestamp === 'string' 
                    ? new Date(timestamp).toLocaleString() 
                    : new Date(timestamp).toLocaleString();
                html += `
                    <div class="timestamp">${formattedTime}</div>`;
            }
            
            html += `
                </div>
            </div>`;
        }
        
        html += `
        </div>`;
        
        // Add footer with watermark if specified
        if (this.config.watermark) {
            html += `
        <div class="footer">
            ${this.config.watermark}
        </div>`;
        }
        
        html += `
    </div>
</body>
</html>`;
        
        return html;
    }

    /**
     * Export chat messages to JSON
     * @param {Array} messages - Chat messages array
     * @param {Object} metadata - Additional metadata about the chat
     * @returns {string} JSON string
     */
    exportToJSON(messages, metadata = {}) {
        const exportData = {
            metadata: {
                exportDate: new Date().toISOString(),
                ...metadata
            },
            messages: messages.map(message => {
                // Create a clean copy of the message
                const cleanMessage = { ...message };
                
                // Ensure consistent properties
                if (!cleanMessage.role) {
                    cleanMessage.role = cleanMessage.isUser ? 'user' : 'assistant';
                }
                
                if (!cleanMessage.content && (cleanMessage.text || cleanMessage.message)) {
                    cleanMessage.content = cleanMessage.text || cleanMessage.message;
                }
                
                return cleanMessage;
            })
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    /**
     * Export chat messages to plain text
     * @param {Array} messages - Chat messages array
     * @param {Object} metadata - Additional metadata about the chat
     * @returns {string} Text string
     */
    exportToText(messages, metadata = {}) {
        let text = '';
        
        // Add title
        if (this.config.includeChatTitle && metadata.title) {
            text += `${metadata.title}\n`;
            text += '='.repeat(metadata.title.length) + '\n\n';
        }
        
        // Add metadata
        if (this.config.includeMetadata) {
            text += 'Conversation Info:\n';
            text += '-----------------\n';
            
            if (metadata.date) {
                text += `Date: ${new Date(metadata.date).toLocaleString()}\n`;
            }
            if (metadata.aiMode) {
                text += `AI Mode: ${metadata.aiMode}\n`;
            }
            
            for (const [key, value] of Object.entries(metadata)) {
                if (key !== 'title' && key !== 'date' && key !== 'aiMode') {
                    text += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
                }
            }
            
            text += '\n';
        }
        
        // Add messages
        text += 'Conversation:\n';
        text += '-------------\n\n';
        
        for (const message of messages) {
            const role = message.role || (message.isUser ? 'user' : 'assistant');
            const content = message.content || message.text || message.message || '';
            const timestamp = message.timestamp || message.time || message.date || null;
            
            if (role === 'user') {
                text += 'User: ';
            } else if (role === 'assistant' || role === 'ai') {
                text += 'AI: ';
            } else {
                text += `${role.charAt(0).toUpperCase() + role.slice(1)}: `;
            }
            
            // Process content
            if (typeof content === 'string') {
                // Preserve formatting but make it plain text friendly
                text += content.replace(/```(\w*)([\s\S]*?)```/g, (match, language, code) => {
                    return `--- ${language || 'Code'} Start ---\n${code.trim()}\n--- ${language || 'Code'} End ---`;
                });
            } else if (Array.isArray(content)) {
                // Handle array of content
                for (const part of content) {
                    if (typeof part === 'string') {
                        text += part;
                    } else if (part.type === 'image' && part.url) {
                        text += `[Image: ${part.url}]`;
                    } else if (part.type === 'code' && part.text) {
                        const lang = part.language || 'Code';
                        text += `\n--- ${lang} Start ---\n${part.text}\n--- ${lang} End ---\n`;
                    }
                }
            }
            
            // Add timestamp
            if (this.config.includeTimestamps && timestamp) {
                const formattedTime = typeof timestamp === 'string' 
                    ? new Date(timestamp).toLocaleString() 
                    : new Date(timestamp).toLocaleString();
                text += ` (${formattedTime})`;
            }
            
            text += '\n\n';
        }
        
        // Add footer with watermark if specified
        if (this.config.watermark) {
            text += `\n${'-'.repeat(50)}\n${this.config.watermark}\n`;
        }
        
        return text;
    }

    /**
     * Export chat messages to CSV
     * @param {Array} messages - Chat messages array
     * @param {Object} metadata - Additional metadata about the chat
     * @returns {string} CSV string
     */
    exportToCSV(messages, metadata = {}) {
        let csv = 'Role,Content,Timestamp\n';
        
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
        
        // Add messages to CSV
        for (const message of messages) {
            const role = message.role || (message.isUser ? 'user' : 'assistant');
            let content = message.content || message.text || message.message || '';
            const timestamp = message.timestamp || message.time || message.date || null;
            
            // Simplify content for CSV format
            if (typeof content !== 'string') {
                if (Array.isArray(content)) {
                    content = content.map(part => {
                        if (typeof part === 'string') {
                            return part;
                        } else if (part.type === 'image' && part.url) {
                            return `[Image: ${part.url}]`;
                        } else if (part.type === 'code' && part.text) {
                            return `[Code: ${part.language || ''}] ${part.text}`;
                        }
                        return '';
                    }).join(' ');
                } else {
                    content = JSON.stringify(content);
                }
            }
            
            // Format timestamp
            let formattedTime = '';
            if (timestamp) {
                formattedTime = typeof timestamp === 'string' 
                    ? new Date(timestamp).toLocaleString() 
                    : new Date(timestamp).toLocaleString();
            }
            
            // Add row to CSV
            csv += `${escapeCSV(role)},${escapeCSV(content)},${escapeCSV(formattedTime)}\n`;
        }
        
        return csv;
    }

    /**
     * Download exported chat
     * @param {string} format - Export format
     * @param {Array} messages - Chat messages
     * @param {Object} metadata - Chat metadata
     * @param {string} filename - Filename without extension
     */
    async downloadChat(format, messages, metadata = {}, filename = 'chat-export') {
        try {
            const exportedData = await this.exportChat(messages, format, metadata);
            
            let blob;
            let mimeType;
            
            if (exportedData instanceof Blob) {
                blob = exportedData;
                mimeType = blob.type;
            } else {
                // Create appropriate MIME type based on format
                switch (format) {
                    case 'html':
                        mimeType = 'text/html';
                        break;
                    case 'json':
                        mimeType = 'application/json';
                        break;
                    case 'markdown':
                        mimeType = 'text/markdown';
                        break;
                    case 'txt':
                        mimeType = 'text/plain';
                        break;
                    case 'csv':
                        mimeType = 'text/csv';
                        break;
                    default:
                        mimeType = 'application/octet-stream';
                }
                
                blob = new Blob([exportedData], { type: mimeType });
            }
            
            // Create file extension based on format
            const extension = format.toLowerCase();
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.${extension}`;
            
            // Append to body, click, and remove
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Release the object URL
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 100);
            
            return true;
        } catch (error) {
            console.error(`Error downloading chat in ${format} format:`, error);
            throw error;
        }
    }

    /**
     * Helper function to escape HTML special characters
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Create chatbot export UI
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
        uiContainer.className = 'chatbot-export-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'chatbot-export-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'chatbot-export-title';
        title.textContent = 'Export Conversation';
        header.appendChild(title);
        
        // Create format selection
        const formatContainer = document.createElement('div');
        formatContainer.className = 'chatbot-export-format-container';
        uiContainer.appendChild(formatContainer);
        
        const formatLabel = document.createElement('label');
        formatLabel.className = 'chatbot-export-label';
        formatLabel.textContent = 'Export Format:';
        formatContainer.appendChild(formatLabel);
        
        const formatGrid = document.createElement('div');
        formatGrid.className = 'chatbot-export-format-grid';
        formatContainer.appendChild(formatGrid);
        
        // Add format options
        this.supportedFormats.forEach(format => {
            const formatOption = document.createElement('div');
            formatOption.className = 'chatbot-export-format-option';
            formatOption.dataset.format = format.id;
            
            const formatIcon = document.createElement('i');
            formatIcon.className = format.icon;
            formatOption.appendChild(formatIcon);
            
            const formatName = document.createElement('span');
            formatName.textContent = format.name;
            formatOption.appendChild(formatName);
            
            formatGrid.appendChild(formatOption);
            
            // Add click event
            formatOption.addEventListener('click', () => {
                // Remove active class from all options
                document.querySelectorAll('.chatbot-export-format-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // Add active class to selected option
                formatOption.classList.add('active');
                
                // Show format-specific options
                this.showFormatOptions(format.id, optionsContainer);
            });
        });
        
        // Select first format by default
        const firstFormatOption = formatGrid.querySelector('.chatbot-export-format-option');
        if (firstFormatOption) {
            firstFormatOption.classList.add('active');
        }
        
        // Create options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'chatbot-export-options-container';
        uiContainer.appendChild(optionsContainer);
        
        // Show options for default format
        this.showFormatOptions(this.supportedFormats[0].id, optionsContainer);
        
        // Create theme selector
        const themeContainer = document.createElement('div');
        themeContainer.className = 'chatbot-export-option-group';
        optionsContainer.appendChild(themeContainer);
        
        const themeLabel = document.createElement('label');
        themeLabel.className = 'chatbot-export-label';
        themeLabel.textContent = 'Export Theme:';
        themeContainer.appendChild(themeLabel);
        
        const themeSelect = document.createElement('select');
        themeSelect.className = 'chatbot-export-select';
        themeSelect.innerHTML = `
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
            <option value="colorful">Colorful Theme</option>
        `;
        themeSelect.value = this.currentTheme;
        themeSelect.addEventListener('change', () => {
            this.setTheme(themeSelect.value);
        });
        themeContainer.appendChild(themeSelect);
        
        // Create common options
        const commonOptionsContainer = document.createElement('div');
        commonOptionsContainer.className = 'chatbot-export-option-group';
        optionsContainer.appendChild(commonOptionsContainer);
        
        const commonOptionsLabel = document.createElement('div');
        commonOptionsLabel.className = 'chatbot-export-group-label';
        commonOptionsLabel.textContent = 'Options:';
        commonOptionsContainer.appendChild(commonOptionsLabel);
        
        // Create checkboxes for common options
        const optionsList = document.createElement('div');
        optionsList.className = 'chatbot-export-options-list';
        commonOptionsContainer.appendChild(optionsList);
        
        // Timestamps option
        const timestampsOption = this.createCheckboxOption(
            'include-timestamps',
            'Include Timestamps',
            this.config.includeTimestamps,
            (checked) => { this.config.includeTimestamps = checked; }
        );
        optionsList.appendChild(timestampsOption);
        
        // Metadata option
        const metadataOption = this.createCheckboxOption(
            'include-metadata',
            'Include Metadata',
            this.config.includeMetadata,
            (checked) => { this.config.includeMetadata = checked; }
        );
        optionsList.appendChild(metadataOption);
        
        // Title option
        const titleOption = this.createCheckboxOption(
            'include-title',
            'Include Chat Title',
            this.config.includeChatTitle,
            (checked) => { this.config.includeChatTitle = checked; }
        );
        optionsList.appendChild(titleOption);
        
        // Code formatting option
        const codeOption = this.createCheckboxOption(
            'format-code',
            'Format Code Blocks',
            this.config.formatCodeBlocks,
            (checked) => { this.config.formatCodeBlocks = checked; }
        );
        optionsList.appendChild(codeOption);
        
        // Images option
        const imagesOption = this.createCheckboxOption(
            'include-images',
            'Include Images & Attachments',
            this.config.exportImagesAndAttachments,
            (checked) => { this.config.exportImagesAndAttachments = checked; }
        );
        optionsList.appendChild(imagesOption);
        
        // Create metadata fields
        const metadataFieldsContainer = document.createElement('div');
        metadataFieldsContainer.className = 'chatbot-export-option-group';
        optionsContainer.appendChild(metadataFieldsContainer);
        
        const metadataFieldsLabel = document.createElement('div');
        metadataFieldsLabel.className = 'chatbot-export-group-label';
        metadataFieldsLabel.textContent = 'Metadata:';
        metadataFieldsContainer.appendChild(metadataFieldsLabel);
        
        // Title field
        const titleField = document.createElement('div');
        titleField.className = 'chatbot-export-field';
        metadataFieldsContainer.appendChild(titleField);
        
        const titleLabel = document.createElement('label');
        titleLabel.className = 'chatbot-export-field-label';
        titleLabel.textContent = 'Chat Title:';
        titleLabel.htmlFor = 'export-title';
        titleField.appendChild(titleLabel);
        
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.className = 'chatbot-export-text-input';
        titleInput.id = 'export-title';
        titleInput.placeholder = 'Enter chat title...';
        titleField.appendChild(titleInput);
        
        // Watermark field
        const watermarkField = document.createElement('div');
        watermarkField.className = 'chatbot-export-field';
        metadataFieldsContainer.appendChild(watermarkField);
        
        const watermarkLabel = document.createElement('label');
        watermarkLabel.className = 'chatbot-export-field-label';
        watermarkLabel.textContent = 'Watermark:';
        watermarkLabel.htmlFor = 'export-watermark';
        watermarkField.appendChild(watermarkLabel);
        
        const watermarkInput = document.createElement('input');
        watermarkInput.type = 'text';
        watermarkInput.className = 'chatbot-export-text-input';
        watermarkInput.id = 'export-watermark';
        watermarkInput.placeholder = 'Exported from JAAT-AI';
        watermarkInput.value = this.config.watermark;
        watermarkInput.addEventListener('input', () => {
            this.config.watermark = watermarkInput.value;
        });
        watermarkField.appendChild(watermarkInput);
        
        // Create action buttons
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'chatbot-export-actions';
        uiContainer.appendChild(actionsContainer);
        
        const exportButton = document.createElement('button');
        exportButton.className = 'chatbot-export-button chatbot-export-primary-button';
        exportButton.textContent = 'Export Chat';
        actionsContainer.appendChild(exportButton);
        
        const cancelButton = document.createElement('button');
        cancelButton.className = 'chatbot-export-button';
        cancelButton.textContent = 'Cancel';
        actionsContainer.appendChild(cancelButton);
        
        // Export button click handler
        exportButton.addEventListener('click', async () => {
            // Get selected format
            const selectedFormatEl = formatGrid.querySelector('.chatbot-export-format-option.active');
            if (!selectedFormatEl) {
                alert('Please select an export format');
                return;
            }
            
            const format = selectedFormatEl.dataset.format;
            
            // Create metadata
            const metadata = {
                title: titleInput.value || 'Chat Conversation',
                date: new Date().toISOString(),
                exportVersion: '1.0'
                // Additional metadata would be added here
            };
            
            // In a real implementation, would get messages from the chat
            // For this example, we'll use a placeholder
            const messages = [
                { role: 'user', content: 'Hello, can you help me with a programming question?', timestamp: new Date().toISOString() },
                { role: 'assistant', content: 'Of course! I\'d be happy to help with your programming question. What would you like to know?', timestamp: new Date(Date.now() + 1000).toISOString() }
                // More messages would be added here
            ];
            
            try {
                // Download the chat
                await this.downloadChat(format, messages, metadata, metadata.title.replace(/[^a-z0-9]/gi, '_').toLowerCase());
                
                // Show success message
                alert('Export successful!');
            } catch (error) {
                console.error('Export failed:', error);
                alert(`Export failed: ${error.message}`);
            }
        });
        
        // Cancel button click handler
        cancelButton.addEventListener('click', () => {
            // In a real implementation, would close the modal or UI
            console.log('Export cancelled');
        });
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Show format-specific options
     * @param {string} format - Format ID
     * @param {HTMLElement} container - Options container
     */
    showFormatOptions(format, container) {
        // Get format-specific options container
        let formatOptionsContainer = container.querySelector('.chatbot-export-format-options');
        
        // Create container if it doesn't exist
        if (!formatOptionsContainer) {
            formatOptionsContainer = document.createElement('div');
            formatOptionsContainer.className = 'chatbot-export-format-options chatbot-export-option-group';
            
            // Add label
            const formatOptionsLabel = document.createElement('div');
            formatOptionsLabel.className = 'chatbot-export-group-label format-options-label';
            formatOptionsLabel.textContent = 'Format Options:';
            formatOptionsContainer.appendChild(formatOptionsLabel);
            
            // Add container for options
            const formatOptionsList = document.createElement('div');
            formatOptionsList.className = 'chatbot-export-format-options-list';
            formatOptionsContainer.appendChild(formatOptionsList);
            
            // Insert at the beginning of the container
            container.insertBefore(formatOptionsContainer, container.firstChild);
        }
        
        const formatOptionsList = formatOptionsContainer.querySelector('.chatbot-export-format-options-list');
        formatOptionsList.innerHTML = ''; // Clear existing options
        
        // Update label
        const formatLabel = formatOptionsContainer.querySelector('.format-options-label');
        formatLabel.textContent = `${format.toUpperCase()} Options:`;
        
        // Add format-specific options
        switch (format) {
            case 'pdf':
                // Page size option
                const pageSizeField = document.createElement('div');
                pageSizeField.className = 'chatbot-export-field';
                formatOptionsList.appendChild(pageSizeField);
                
                const pageSizeLabel = document.createElement('label');
                pageSizeLabel.className = 'chatbot-export-field-label';
                pageSizeLabel.textContent = 'Page Size:';
                pageSizeLabel.htmlFor = 'pdf-page-size';
                pageSizeField.appendChild(pageSizeLabel);
                
                const pageSizeSelect = document.createElement('select');
                pageSizeSelect.className = 'chatbot-export-select';
                pageSizeSelect.id = 'pdf-page-size';
                pageSizeSelect.innerHTML = `
                    <option value="A4">A4</option>
                    <option value="Letter">Letter</option>
                    <option value="Legal">Legal</option>
                `;
                pageSizeSelect.value = this.config.pageSize;
                pageSizeSelect.addEventListener('change', () => {
                    this.config.pageSize = pageSizeSelect.value;
                });
                pageSizeField.appendChild(pageSizeSelect);
                
                // Page orientation option
                const orientationField = document.createElement('div');
                orientationField.className = 'chatbot-export-field';
                formatOptionsList.appendChild(orientationField);
                
                const orientationLabel = document.createElement('label');
                orientationLabel.className = 'chatbot-export-field-label';
                orientationLabel.textContent = 'Orientation:';
                orientationLabel.htmlFor = 'pdf-orientation';
                orientationField.appendChild(orientationLabel);
                
                const orientationSelect = document.createElement('select');
                orientationSelect.className = 'chatbot-export-select';
                orientationSelect.id = 'pdf-orientation';
                orientationSelect.innerHTML = `
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                `;
                orientationSelect.value = this.config.pageOrientation;
                orientationSelect.addEventListener('change', () => {
                    this.config.pageOrientation = orientationSelect.value;
                });
                orientationField.appendChild(orientationSelect);
                break;
                
            case 'markdown':
            case 'html':
                // Font size option (for HTML)
                if (format === 'html') {
                    const fontSizeField = document.createElement('div');
                    fontSizeField.className = 'chatbot-export-field';
                    formatOptionsList.appendChild(fontSizeField);
                    
                    const fontSizeLabel = document.createElement('label');
                    fontSizeLabel.className = 'chatbot-export-field-label';
                    fontSizeLabel.textContent = 'Font Size:';
                    fontSizeLabel.htmlFor = 'html-font-size';
                    fontSizeField.appendChild(fontSizeLabel);
                    
                    const fontSizeInput = document.createElement('input');
                    fontSizeInput.type = 'number';
                    fontSizeInput.className = 'chatbot-export-number-input';
                    fontSizeInput.id = 'html-font-size';
                    fontSizeInput.min = 8;
                    fontSizeInput.max = 24;
                    fontSizeInput.value = this.config.fontSize;
                    fontSizeInput.addEventListener('change', () => {
                        this.config.fontSize = parseInt(fontSizeInput.value, 10);
                    });
                    fontSizeField.appendChild(fontSizeInput);
                }
                
                // Message wrapping option
                const wrapOption = this.createCheckboxOption(
                    'wrap-messages',
                    format === 'html' ? 'Wrap Long Messages' : 'Wrap Code Blocks',
                    true,
                    (checked) => { /* Would implement wrapping logic */ }
                );
                formatOptionsList.appendChild(wrapOption);
                break;
                
            case 'json':
                // Pretty print option
                const prettyOption = this.createCheckboxOption(
                    'pretty-json',
                    'Pretty Print JSON',
                    true,
                    (checked) => { /* Always pretty-printed in this implementation */ }
                );
                formatOptionsList.appendChild(prettyOption);
                break;
                
            case 'txt':
                // No specific options for text
                const textInfo = document.createElement('div');
                textInfo.className = 'chatbot-export-info';
                textInfo.textContent = 'Plain text format preserves content but not formatting';
                formatOptionsList.appendChild(textInfo);
                break;
                
            case 'csv':
                // Include headers option
                const headersOption = this.createCheckboxOption(
                    'include-headers',
                    'Include CSV Headers',
                    true,
                    (checked) => { /* Headers always included in this implementation */ }
                );
                formatOptionsList.appendChild(headersOption);
                
                // CSV delimiter option
                const delimiterField = document.createElement('div');
                delimiterField.className = 'chatbot-export-field';
                formatOptionsList.appendChild(delimiterField);
                
                const delimiterLabel = document.createElement('label');
                delimiterLabel.className = 'chatbot-export-field-label';
                delimiterLabel.textContent = 'CSV Delimiter:';
                delimiterLabel.htmlFor = 'csv-delimiter';
                delimiterField.appendChild(delimiterLabel);
                
                const delimiterSelect = document.createElement('select');
                delimiterSelect.className = 'chatbot-export-select';
                delimiterSelect.id = 'csv-delimiter';
                delimiterSelect.innerHTML = `
                    <option value=",">Comma (,)</option>
                    <option value=";">Semicolon (;)</option>
                    <option value="\t">Tab</option>
                `;
                delimiterField.appendChild(delimiterSelect);
                break;
        }
    }

    /**
     * Create a checkbox option
     * @param {string} id - Option ID
     * @param {string} label - Option label
     * @param {boolean} checked - Initial checked state
     * @param {Function} onChange - Change handler
     * @returns {HTMLElement} Checkbox container
     */
    createCheckboxOption(id, label, checked, onChange) {
        const container = document.createElement('div');
        container.className = 'chatbot-export-checkbox-option';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.className = 'chatbot-export-checkbox';
        checkbox.checked = checked;
        
        const labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.className = 'chatbot-export-checkbox-label';
        labelEl.textContent = label;
        
        checkbox.addEventListener('change', () => {
            onChange(checkbox.checked);
        });
        
        container.appendChild(checkbox);
        container.appendChild(labelEl);
        
        return container;
    }

    /**
     * Add CSS styles for the UI
     */
    addUIStyles() {
        const styleId = 'chatbot-export-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .chatbot-export-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .chatbot-export-header {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .chatbot-export-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .chatbot-export-label {
                display: block;
                font-size: 0.875rem;
                font-weight: 500;
                margin-bottom: 0.5rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .chatbot-export-format-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                gap: 0.75rem;
                margin-bottom: 1.5rem;
            }
            
            .chatbot-export-format-option {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 1rem 0.5rem;
                background-color: var(--bg-primary, #0d1117);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                cursor: pointer;
                transition: all 0.2s;
                text-align: center;
            }
            
            .chatbot-export-format-option:hover {
                border-color: var(--accent-primary, #7c3aed);
                transform: translateY(-2px);
            }
            
            .chatbot-export-format-option.active {
                background-color: rgba(124, 58, 237, 0.1);
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .chatbot-export-format-option i {
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
                color: var(--accent-primary, #7c3aed);
            }
            
            .chatbot-export-format-option span {
                font-size: 0.875rem;
            }
            
            .chatbot-export-options-container {
                background-color: var(--bg-primary, #0d1117);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                margin-bottom: 1.5rem;
                border: 1px solid var(--border-color, #30363d);
            }
            
            .chatbot-export-option-group {
                margin-bottom: 1.25rem;
            }
            
            .chatbot-export-option-group:last-child {
                margin-bottom: 0;
            }
            
            .chatbot-export-group-label {
                font-size: 0.875rem;
                font-weight: 600;
                margin-bottom: 0.75rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .chatbot-export-options-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 0.5rem;
            }
            
            .chatbot-export-checkbox-option {
                display: flex;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .chatbot-export-checkbox {
                margin-right: 0.5rem;
            }
            
            .chatbot-export-checkbox-label {
                font-size: 0.875rem;
                cursor: pointer;
            }
            
            .chatbot-export-field {
                margin-bottom: 0.75rem;
            }
            
            .chatbot-export-field-label {
                display: block;
                font-size: 0.75rem;
                margin-bottom: 0.25rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .chatbot-export-text-input,
            .chatbot-export-number-input,
            .chatbot-export-select {
                width: 100%;
                padding: 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .chatbot-export-text-input:focus,
            .chatbot-export-number-input:focus,
            .chatbot-export-select:focus {
                outline: none;
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .chatbot-export-info {
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
                font-style: italic;
                margin-bottom: 0.5rem;
            }
            
            .chatbot-export-actions {
                display: flex;
                justify-content: flex-end;
                gap: 0.75rem;
            }
            
            .chatbot-export-button {
                padding: 0.625rem 1.25rem;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
                border: 1px solid var(--border-color, #30363d);
            }
            
            .chatbot-export-button:hover {
                background-color: var(--bg-secondary, #161b22);
            }
            
            .chatbot-export-primary-button {
                background-color: var(--accent-primary, #7c3aed);
                border-color: var(--accent-primary, #7c3aed);
                color: white;
            }
            
            .chatbot-export-primary-button:hover {
                background-color: var(--accent-hover, #6d28d9);
                border-color: var(--accent-hover, #6d28d9);
            }
            
            @media (max-width: 640px) {
                .chatbot-export-format-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .chatbot-export-options-list,
                .chatbot-export-format-options-list {
                    grid-template-columns: 1fr;
                }
                
                .chatbot-export-actions {
                    flex-direction: column;
                }
                
                .chatbot-export-button {
                    width: 100%;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChatbotExport };
} else {
    // Add to global scope for browser usage
    window.ChatbotExport = ChatbotExport;
}
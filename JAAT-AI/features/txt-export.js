/**
 * JAAT-AI Text Export Feature
 * Export chat conversations and other content to plain text formats
 */

class TextExport {
    constructor() {
        // Export format options
        this.formats = [
            { id: 'plain', name: 'Plain Text (.txt)', extension: 'txt' },
            { id: 'markdown', name: 'Markdown (.md)', extension: 'md' },
            { id: 'json', name: 'JSON (.json)', extension: 'json' },
            { id: 'csv', name: 'CSV (.csv)', extension: 'csv' },
            { id: 'html', name: 'HTML (.html)', extension: 'html' }
        ];
        
        // Configuration options
        this.options = {
            defaultFormat: 'plain',
            defaultFileName: 'jaat-ai-export',
            includeTimestamps: true,
            includeSenderInfo: true,
            includeMetadata: true,
            prettyPrint: true, // For JSON format
            csvDelimiter: ',', // For CSV format
            markdownStyle: 'github', // For markdown format: github, reddit, discord, etc.
            htmlStyling: true, // For HTML format
            htmlTemplate: null, // Custom HTML template
            splitByDate: false,
            indentation: 2, // Number of spaces for indentation
            lineBreakStyle: 'lf' // 'lf', 'crlf'
        };
        
        // Markdown style presets
        this.markdownStyles = {
            github: {
                userPrefix: '**You:**\n\n',
                aiPrefix: '**AI:**\n\n',
                codeBlock: '```',
                quote: '> ',
                horizontalRule: '---',
                dateFormat: '\n### %date%\n\n'
            },
            reddit: {
                userPrefix: '# You:\n\n',
                aiPrefix: '# AI:\n\n',
                codeBlock: '    ',
                quote: '> ',
                horizontalRule: '***',
                dateFormat: '\n## %date%\n\n'
            },
            discord: {
                userPrefix: '**You**\n',
                aiPrefix: '**AI**\n',
                codeBlock: '```',
                quote: '> ',
                horizontalRule: '---',
                dateFormat: '\n__**%date%**__\n\n'
            },
            minimal: {
                userPrefix: 'You: ',
                aiPrefix: 'AI: ',
                codeBlock: '`',
                quote: '> ',
                horizontalRule: '---',
                dateFormat: '\n[%date%]\n\n'
            }
        };
        
        // HTML templates
        this.htmlTemplates = {
            default: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>%title%</title>
    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            margin-bottom: 10px;
        }
        .metadata {
            color: #666;
            font-style: italic;
            margin-bottom: 20px;
        }
        .date-group {
            margin: 30px 0;
        }
        .date-header {
            font-size: 1.2em;
            font-weight: bold;
            background-color: #f3f4f6;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
        }
        .message {
            margin-bottom: 15px;
            padding: 10px 15px;
            border-radius: 10px;
        }
        .user-message {
            background-color: #e9f5fe;
            margin-right: 20px;
            align-self: flex-start;
        }
        .ai-message {
            background-color: #f1f5f9;
            margin-left: 20px;
            align-self: flex-end;
        }
        .sender {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .timestamp {
            font-size: 0.8em;
            color: #666;
            text-align: right;
            margin-top: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 0.8em;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>%title%</h1>
        %metadata%
    </div>
    
    %content%
    
    <div class="footer">
        Exported from JAAT-AI on %export_date%
    </div>
</body>
</html>
            `.trim(),
            
            minimal: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>%title%</title>
    <style>
        body {
            font-family: monospace;
            line-height: 1.4;
            color: #333;
            max-width: 700px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            margin-bottom: 20px;
        }
        .message {
            margin-bottom: 10px;
        }
        .user-message { color: #0066cc; }
        .ai-message { color: #006600; }
        .timestamp { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="header">
        <h1>%title%</h1>
        %metadata%
    </div>
    
    %content%
    
    <div class="footer">
        Exported: %export_date%
    </div>
</body>
</html>
            `.trim()
        };
    }

    /**
     * Initialize text exporter
     * @param {Object} options - Configuration options
     * @returns {TextExport} This instance
     */
    init(options = {}) {
        // Apply custom options
        if (options) {
            this.options = { ...this.options, ...options };
        }
        
        console.log('Text Export initialized');
        return this;
    }

    /**
     * Export chat messages to the specified format
     * @param {Array} messages - Array of message objects
     * @param {string} format - Export format ID
     * @param {Object} options - Export options (overrides instance options)
     * @returns {string} Exported content
     */
    exportChat(messages, format = null, options = {}) {
        // Use default format if none specified
        const exportFormat = format || this.options.defaultFormat;
        
        // Merge options
        const exportOptions = { ...this.options, ...options };
        
        // Validate format
        if (!this.formats.some(f => f.id === exportFormat)) {
            throw new Error(`Unsupported export format: ${exportFormat}`);
        }
        
        // Call appropriate export method based on format
        switch (exportFormat) {
            case 'plain':
                return this.exportToPlainText(messages, exportOptions);
            case 'markdown':
                return this.exportToMarkdown(messages, exportOptions);
            case 'json':
                return this.exportToJSON(messages, exportOptions);
            case 'csv':
                return this.exportToCSV(messages, exportOptions);
            case 'html':
                return this.exportToHTML(messages, exportOptions);
            default:
                throw new Error(`Unsupported export format: ${exportFormat}`);
        }
    }

    /**
     * Export chat messages to plain text format
     * @param {Array} messages - Array of message objects
     * @param {Object} options - Export options
     * @returns {string} Plain text export
     */
    exportToPlainText(messages, options) {
        const lines = [];
        
        // Add title
        lines.push('JAAT-AI Chat Export');
        lines.push('='.repeat(20));
        lines.push('');
        
        // Add metadata if enabled
        if (options.includeMetadata) {
            lines.push(`Export Date: ${new Date().toLocaleString()}`);
            lines.push(`Messages: ${messages.length}`);
            
            if (messages.length > 0) {
                const firstMessage = messages[0];
                const lastMessage = messages[messages.length - 1];
                
                if (firstMessage.timestamp && lastMessage.timestamp) {
                    lines.push(`Time Range: ${new Date(firstMessage.timestamp).toLocaleString()} to ${new Date(lastMessage.timestamp).toLocaleString()}`);
                }
            }
            
            lines.push('');
            lines.push('-'.repeat(50));
            lines.push('');
        }
        
        // Process messages
        if (options.splitByDate) {
            // Group messages by date
            const dateGroups = this.groupMessagesByDate(messages);
            
            dateGroups.forEach(group => {
                // Add date header
                lines.push(`=== ${group.date} ===`);
                lines.push('');
                
                // Add messages for this date
                this.formatMessagesAsPlainText(group.messages, lines, options);
                
                // Add separator between date groups
                lines.push('');
                lines.push('-'.repeat(50));
                lines.push('');
            });
        } else {
            // Add all messages sequentially
            this.formatMessagesAsPlainText(messages, lines, options);
        }
        
        // Join lines with appropriate line breaks
        const lineBreak = options.lineBreakStyle === 'crlf' ? '\r\n' : '\n';
        return lines.join(lineBreak);
    }

    /**
     * Format messages as plain text
     * @param {Array} messages - Array of message objects
     * @param {Array} lines - Lines array to append to
     * @param {Object} options - Export options
     */
    formatMessagesAsPlainText(messages, lines, options) {
        messages.forEach(message => {
            // Add sender info if enabled
            if (options.includeSenderInfo) {
                lines.push(message.sender === 'user' ? 'You:' : 'AI:');
            }
            
            // Add message content
            const contentLines = message.message.split('\n');
            contentLines.forEach(line => {
                lines.push(options.includeSenderInfo ? `  ${line}` : line);
            });
            
            // Add timestamp if enabled
            if (options.includeTimestamps && message.timestamp) {
                const timestamp = new Date(message.timestamp).toLocaleString();
                lines.push(`[${timestamp}]`);
            }
            
            // Add empty line between messages
            lines.push('');
        });
    }

    /**
     * Export chat messages to Markdown format
     * @param {Array} messages - Array of message objects
     * @param {Object} options - Export options
     * @returns {string} Markdown export
     */
    exportToMarkdown(messages, options) {
        const lines = [];
        
        // Get markdown style
        const style = this.markdownStyles[options.markdownStyle] || this.markdownStyles.github;
        
        // Add title
        lines.push('# JAAT-AI Chat Export');
        lines.push('');
        
        // Add metadata if enabled
        if (options.includeMetadata) {
            lines.push('## Metadata');
            lines.push('');
            lines.push(`**Export Date:** ${new Date().toLocaleString()}`);
            lines.push(`**Messages:** ${messages.length}`);
            
            if (messages.length > 0) {
                const firstMessage = messages[0];
                const lastMessage = messages[messages.length - 1];
                
                if (firstMessage.timestamp && lastMessage.timestamp) {
                    lines.push(`**Time Range:** ${new Date(firstMessage.timestamp).toLocaleString()} to ${new Date(lastMessage.timestamp).toLocaleString()}`);
                }
            }
            
            lines.push('');
            lines.push(style.horizontalRule);
            lines.push('');
        }
        
        // Process messages
        if (options.splitByDate) {
            // Group messages by date
            const dateGroups = this.groupMessagesByDate(messages);
            
            dateGroups.forEach(group => {
                // Add date header
                lines.push(style.dateFormat.replace('%date%', group.date));
                
                // Add messages for this date
                this.formatMessagesAsMarkdown(group.messages, lines, options, style);
                
                // Add separator between date groups
                lines.push('');
                lines.push(style.horizontalRule);
                lines.push('');
            });
        } else {
            // Add all messages sequentially
            this.formatMessagesAsMarkdown(messages, lines, options, style);
        }
        
        // Join lines with appropriate line breaks
        const lineBreak = options.lineBreakStyle === 'crlf' ? '\r\n' : '\n';
        return lines.join(lineBreak);
    }

    /**
     * Format messages as Markdown
     * @param {Array} messages - Array of message objects
     * @param {Array} lines - Lines array to append to
     * @param {Object} options - Export options
     * @param {Object} style - Markdown style
     */
    formatMessagesAsMarkdown(messages, lines, options, style) {
        messages.forEach(message => {
            // Add sender info with styling if enabled
            if (options.includeSenderInfo) {
                lines.push(message.sender === 'user' ? style.userPrefix : style.aiPrefix);
            }
            
            // Format message content
            // Check if message contains code blocks and format them appropriately
            const formattedMessage = this.formatCodeBlocksForMarkdown(message.message, style.codeBlock);
            lines.push(formattedMessage);
            
            // Add timestamp if enabled
            if (options.includeTimestamps && message.timestamp) {
                const timestamp = new Date(message.timestamp).toLocaleString();
                lines.push(`*${timestamp}*`);
            }
            
            // Add empty line between messages
            lines.push('');
            lines.push('');
        });
    }

    /**
     * Format code blocks for Markdown
     * @param {string} message - Message text
     * @param {string} codeBlockStyle - Code block style
     * @returns {string} Formatted message
     */
    formatCodeBlocksForMarkdown(message, codeBlockStyle) {
        // Detect code blocks and format them
        const codeBlockRegex = /```(\w*)\n([\s\S]*?)\n```/g;
        
        return message.replace(codeBlockRegex, (match, language, code) => {
            if (codeBlockStyle === '```') {
                return `${codeBlockStyle}${language}\n${code}\n${codeBlockStyle}`;
            } else {
                // For indentation-based code blocks, indent each line
                const indentedCode = code.split('\n')
                    .map(line => `${codeBlockStyle}${line}`)
                    .join('\n');
                
                return indentedCode;
            }
        });
    }

    /**
     * Export chat messages to JSON format
     * @param {Array} messages - Array of message objects
     * @param {Object} options - Export options
     * @returns {string} JSON export
     */
    exportToJSON(messages, options) {
        // Prepare export data
        const exportData = {
            metadata: {
                exportDate: new Date().toISOString(),
                messageCount: messages.length
            },
            messages: []
        };
        
        // Add messages
        messages.forEach(message => {
            const exportMessage = {
                sender: message.sender,
                message: message.message
            };
            
            // Add timestamp if available
            if (message.timestamp) {
                exportMessage.timestamp = new Date(message.timestamp).toISOString();
            }
            
            // Add additional metadata if enabled and available
            if (options.includeMetadata && message.metadata) {
                exportMessage.metadata = message.metadata;
            }
            
            exportData.messages.push(exportMessage);
        });
        
        // If splitting by date, add date grouping
        if (options.splitByDate) {
            exportData.dateGroups = this.groupMessagesByDate(messages).map(group => ({
                date: group.date,
                messageIndices: group.messages.map(message => 
                    messages.findIndex(m => m === message)
                )
            }));
        }
        
        // Convert to JSON string
        const indent = options.prettyPrint ? options.indentation : 0;
        return JSON.stringify(exportData, null, indent);
    }

    /**
     * Export chat messages to CSV format
     * @param {Array} messages - Array of message objects
     * @param {Object} options - Export options
     * @returns {string} CSV export
     */
    exportToCSV(messages, options) {
        const lines = [];
        const delimiter = options.csvDelimiter;
        
        // Determine columns
        const columns = ['sender', 'message'];
        
        if (options.includeTimestamps) {
            columns.push('timestamp');
        }
        
        if (options.includeMetadata) {
            columns.push('metadata');
        }
        
        if (options.splitByDate) {
            columns.push('date');
        }
        
        // Add header row
        lines.push(columns.join(delimiter));
        
        // Process messages
        if (options.splitByDate) {
            // Group messages by date
            const dateGroups = this.groupMessagesByDate(messages);
            
            dateGroups.forEach(group => {
                group.messages.forEach(message => {
                    const row = this.formatMessageAsCSV(message, columns, delimiter, options, group.date);
                    lines.push(row);
                });
            });
        } else {
            // Add all messages
            messages.forEach(message => {
                const row = this.formatMessageAsCSV(message, columns, delimiter, options);
                lines.push(row);
            });
        }
        
        // Join lines with appropriate line breaks
        const lineBreak = options.lineBreakStyle === 'crlf' ? '\r\n' : '\n';
        return lines.join(lineBreak);
    }

    /**
     * Format message as CSV row
     * @param {Object} message - Message object
     * @param {Array} columns - Column headers
     * @param {string} delimiter - CSV delimiter
     * @param {Object} options - Export options
     * @param {string} date - Message date for splitByDate mode
     * @returns {string} CSV row
     */
    formatMessageAsCSV(message, columns, delimiter, options, date = null) {
        const row = [];
        
        columns.forEach(column => {
            let value = '';
            
            switch (column) {
                case 'sender':
                    value = message.sender;
                    break;
                case 'message':
                    // Escape quotes and wrap in quotes to handle multi-line messages
                    value = `"${message.message.replace(/"/g, '""')}"`;
                    break;
                case 'timestamp':
                    value = message.timestamp ? new Date(message.timestamp).toISOString() : '';
                    break;
                case 'metadata':
                    value = message.metadata ? `"${JSON.stringify(message.metadata).replace(/"/g, '""')}"` : '';
                    break;
                case 'date':
                    value = date || '';
                    break;
            }
            
            row.push(value);
        });
        
        return row.join(delimiter);
    }

    /**
     * Export chat messages to HTML format
     * @param {Array} messages - Array of message objects
     * @param {Object} options - Export options
     * @returns {string} HTML export
     */
    exportToHTML(messages, options) {
        // Get HTML template
        let template = options.htmlTemplate || 
            this.htmlTemplates[options.htmlTemplate] || 
            this.htmlTemplates.default;
        
        // Generate metadata HTML
        let metadataHTML = '';
        if (options.includeMetadata) {
            const metadataLines = [];
            metadataLines.push('<div class="metadata">');
            
            metadataLines.push(`<p>Export Date: ${new Date().toLocaleString()}</p>`);
            metadataLines.push(`<p>Messages: ${messages.length}</p>`);
            
            if (messages.length > 0) {
                const firstMessage = messages[0];
                const lastMessage = messages[messages.length - 1];
                
                if (firstMessage.timestamp && lastMessage.timestamp) {
                    metadataLines.push(`<p>Time Range: ${new Date(firstMessage.timestamp).toLocaleString()} to ${new Date(lastMessage.timestamp).toLocaleString()}</p>`);
                }
            }
            
            metadataLines.push('</div>');
            metadataHTML = metadataLines.join('\n');
        }
        
        // Generate content HTML
        let contentHTML = '';
        
        if (options.splitByDate) {
            // Group messages by date
            const dateGroups = this.groupMessagesByDate(messages);
            
            const groupsHTML = dateGroups.map(group => {
                const messagesHTML = this.formatMessagesAsHTML(group.messages, options);
                
                return `
                    <div class="date-group">
                        <div class="date-header">${group.date}</div>
                        ${messagesHTML}
                    </div>
                `;
            }).join('\n');
            
            contentHTML = groupsHTML;
        } else {
            // Add all messages sequentially
            contentHTML = this.formatMessagesAsHTML(messages, options);
        }
        
        // Replace placeholders in template
        const exportDate = new Date().toLocaleString();
        const title = 'JAAT-AI Chat Export';
        
        let html = template
            .replace(/%title%/g, title)
            .replace(/%metadata%/g, metadataHTML)
            .replace(/%content%/g, contentHTML)
            .replace(/%export_date%/g, exportDate);
        
        return html;
    }

    /**
     * Format messages as HTML
     * @param {Array} messages - Array of message objects
     * @param {Object} options - Export options
     * @returns {string} HTML for messages
     */
    formatMessagesAsHTML(messages, options) {
        return messages.map(message => {
            const isUser = message.sender === 'user';
            const cssClass = isUser ? 'user-message' : 'ai-message';
            const sender = isUser ? 'You' : 'AI Assistant';
            
            // Format message content (handle code blocks, etc.)
            const formattedMessage = this.formatMessageContentForHTML(message.message);
            
            // Create HTML for this message
            let messageHTML = `<div class="message ${cssClass}">`;
            
            // Add sender info if enabled
            if (options.includeSenderInfo) {
                messageHTML += `<div class="sender">${sender}</div>`;
            }
            
            // Add message content
            messageHTML += `<div class="content">${formattedMessage}</div>`;
            
            // Add timestamp if enabled
            if (options.includeTimestamps && message.timestamp) {
                const timestamp = new Date(message.timestamp).toLocaleString();
                messageHTML += `<div class="timestamp">${timestamp}</div>`;
            }
            
            messageHTML += `</div>`;
            
            return messageHTML;
        }).join('\n');
    }

    /**
     * Format message content for HTML
     * @param {string} content - Message content
     * @returns {string} Formatted HTML content
     */
    formatMessageContentForHTML(content) {
        // Handle code blocks
        let formatted = content.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, language, code) => {
            return `<pre><code class="language-${language}">${this.escapeHTML(code)}</code></pre>`;
        });
        
        // Handle inline code
        formatted = formatted.replace(/`([^`]+)`/g, (match, code) => {
            return `<code>${this.escapeHTML(code)}</code>`;
        });
        
        // Handle line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    }

    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHTML(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Group messages by date
     * @param {Array} messages - Array of message objects
     * @returns {Array} Array of date groups
     */
    groupMessagesByDate(messages) {
        const groups = [];
        const dateMap = new Map();
        
        messages.forEach(message => {
            if (!message.timestamp) return;
            
            const date = new Date(message.timestamp);
            const dateStr = date.toDateString();
            
            if (!dateMap.has(dateStr)) {
                dateMap.set(dateStr, []);
            }
            
            dateMap.get(dateStr).push(message);
        });
        
        // Convert map to array of groups
        dateMap.forEach((messages, date) => {
            groups.push({
                date,
                messages
            });
        });
        
        // Sort groups by date
        groups.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        return groups;
    }

    /**
     * Download exported content as a file
     * @param {string} content - Exported content
     * @param {string} format - Export format
     * @param {string} fileName - File name (without extension)
     */
    downloadExport(content, format, fileName = null) {
        // Get format details
        const formatInfo = this.formats.find(f => f.id === format);
        if (!formatInfo) {
            throw new Error(`Unsupported export format: ${format}`);
        }
        
        // Use default file name if none provided
        const name = fileName || `${this.options.defaultFileName}-${Date.now()}`;
        const fullFileName = `${name}.${formatInfo.extension}`;
        
        // Create blob based on format
        let mimeType;
        switch (format) {
            case 'json':
                mimeType = 'application/json';
                break;
            case 'html':
                mimeType = 'text/html';
                break;
            case 'csv':
                mimeType = 'text/csv';
                break;
            case 'markdown':
                mimeType = 'text/markdown';
                break;
            default:
                mimeType = 'text/plain';
        }
        
        const blob = new Blob([content], { type: mimeType });
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fullFileName;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    }

    /**
     * Create UI for text export configuration
     * @param {HTMLElement|string} container - Container element or selector
     * @returns {HTMLElement} Created UI element
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
        uiContainer.className = 'text-export-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'text-export-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'text-export-title';
        title.textContent = 'Text Export Options';
        header.appendChild(title);
        
        // Create form
        const form = document.createElement('div');
        form.className = 'text-export-form';
        uiContainer.appendChild(form);
        
        // Format section
        const formatSection = this.createSection('Export Format');
        form.appendChild(formatSection);
        
        // Format select
        const formatGroup = this.createFormGroup('Format');
        formatSection.appendChild(formatGroup);
        
        const formatSelect = document.createElement('select');
        formatSelect.className = 'text-export-select';
        formatSelect.id = 'export-format';
        
        this.formats.forEach(format => {
            const option = document.createElement('option');
            option.value = format.id;
            option.textContent = format.name;
            if (format.id === this.options.defaultFormat) {
                option.selected = true;
            }
            formatSelect.appendChild(option);
        });
        
        formatGroup.appendChild(formatSelect);
        
        // Content settings section
        const contentSection = this.createSection('Content Settings');
        form.appendChild(contentSection);
        
        // Include timestamps
        const timestampsGroup = this.createFormGroup('');
        contentSection.appendChild(timestampsGroup);
        
        const timestampsCheck = this.createCheckbox(
            'include-timestamps',
            'Include timestamps',
            this.options.includeTimestamps
        );
        timestampsGroup.appendChild(timestampsCheck);
        
        // Include sender info
        const senderGroup = this.createFormGroup('');
        contentSection.appendChild(senderGroup);
        
        const senderCheck = this.createCheckbox(
            'include-sender',
            'Include sender information',
            this.options.includeSenderInfo
        );
        senderGroup.appendChild(senderCheck);
        
        // Include metadata
        const metadataGroup = this.createFormGroup('');
        contentSection.appendChild(metadataGroup);
        
        const metadataCheck = this.createCheckbox(
            'include-metadata',
            'Include metadata',
            this.options.includeMetadata
        );
        metadataGroup.appendChild(metadataCheck);
        
        // Split by date
        const splitGroup = this.createFormGroup('');
        contentSection.appendChild(splitGroup);
        
        const splitCheck = this.createCheckbox(
            'split-by-date',
            'Group messages by date',
            this.options.splitByDate
        );
        splitGroup.appendChild(splitCheck);
        
        // Pretty print (for JSON)
        const prettyPrintGroup = this.createFormGroup('');
        contentSection.appendChild(prettyPrintGroup);
        
        const prettyPrintCheck = this.createCheckbox(
            'pretty-print',
            'Pretty print (for JSON)',
            this.options.prettyPrint
        );
        prettyPrintGroup.appendChild(prettyPrintCheck);
        
        // Format-specific settings
        
        // Markdown style (for Markdown)
        const markdownSection = this.createSection('Markdown Settings');
        markdownSection.classList.add('format-specific-section');
        markdownSection.dataset.format = 'markdown';
        markdownSection.style.display = this.options.defaultFormat === 'markdown' ? 'block' : 'none';
        form.appendChild(markdownSection);
        
        const markdownStyleGroup = this.createFormGroup('Style');
        markdownSection.appendChild(markdownStyleGroup);
        
        const markdownStyleSelect = document.createElement('select');
        markdownStyleSelect.className = 'text-export-select';
        markdownStyleSelect.id = 'markdown-style';
        
        Object.keys(this.markdownStyles).forEach(style => {
            const option = document.createElement('option');
            option.value = style;
            option.textContent = style.charAt(0).toUpperCase() + style.slice(1);
            if (style === this.options.markdownStyle) {
                option.selected = true;
            }
            markdownStyleSelect.appendChild(option);
        });
        
        markdownStyleGroup.appendChild(markdownStyleSelect);
        
        // CSV settings
        const csvSection = this.createSection('CSV Settings');
        csvSection.classList.add('format-specific-section');
        csvSection.dataset.format = 'csv';
        csvSection.style.display = this.options.defaultFormat === 'csv' ? 'block' : 'none';
        form.appendChild(csvSection);
        
        const delimiterGroup = this.createFormGroup('Delimiter');
        csvSection.appendChild(delimiterGroup);
        
        const delimiterSelect = document.createElement('select');
        delimiterSelect.className = 'text-export-select';
        delimiterSelect.id = 'csv-delimiter';
        
        [
            { value: ',', label: 'Comma (,)' },
            { value: ';', label: 'Semicolon (;)' },
            { value: '\t', label: 'Tab' },
            { value: '|', label: 'Pipe (|)' }
        ].forEach(delimiter => {
            const option = document.createElement('option');
            option.value = delimiter.value;
            option.textContent = delimiter.label;
            if (delimiter.value === this.options.csvDelimiter) {
                option.selected = true;
            }
            delimiterSelect.appendChild(option);
        });
        
        delimiterGroup.appendChild(delimiterSelect);
        
        // HTML settings
        const htmlSection = this.createSection('HTML Settings');
        htmlSection.classList.add('format-specific-section');
        htmlSection.dataset.format = 'html';
        htmlSection.style.display = this.options.defaultFormat === 'html' ? 'block' : 'none';
        form.appendChild(htmlSection);
        
        // HTML styling toggle
        const htmlStylingGroup = this.createFormGroup('');
        htmlSection.appendChild(htmlStylingGroup);
        
        const htmlStylingCheck = this.createCheckbox(
            'html-styling',
            'Include CSS styling',
            this.options.htmlStyling
        );
        htmlStylingGroup.appendChild(htmlStylingCheck);
        
        // HTML template select
        const templateGroup = this.createFormGroup('Template');
        htmlSection.appendChild(templateGroup);
        
        const templateSelect = document.createElement('select');
        templateSelect.className = 'text-export-select';
        templateSelect.id = 'html-template';
        
        [
            { value: 'default', label: 'Default' },
            { value: 'minimal', label: 'Minimal' }
        ].forEach(template => {
            const option = document.createElement('option');
            option.value = template.value;
            option.textContent = template.label;
            if (template.value === (this.options.htmlTemplate || 'default')) {
                option.selected = true;
            }
            templateSelect.appendChild(option);
        });
        
        templateGroup.appendChild(templateSelect);
        
        // Export section
        const exportSection = this.createSection('Export');
        form.appendChild(exportSection);
        
        // Filename
        const filenameGroup = this.createFormGroup('Filename');
        exportSection.appendChild(filenameGroup);
        
        const filenameInput = document.createElement('input');
        filenameInput.type = 'text';
        filenameInput.className = 'text-export-input';
        filenameInput.id = 'filename';
        filenameInput.value = this.options.defaultFileName;
        filenameGroup.appendChild(filenameInput);
        
        // Export button
        const exportButton = document.createElement('button');
        exportButton.className = 'text-export-button';
        exportButton.textContent = 'Export Chat';
        exportSection.appendChild(exportButton);
        
        // Add event listeners
        
        // Format change handler to show/hide format-specific sections
        formatSelect.addEventListener('change', () => {
            const selectedFormat = formatSelect.value;
            
            // Hide all format-specific sections
            document.querySelectorAll('.format-specific-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show section for selected format
            const sectionToShow = document.querySelector(`.format-specific-section[data-format="${selectedFormat}"]`);
            if (sectionToShow) {
                sectionToShow.style.display = 'block';
            }
        });
        
        // Export button click handler
        exportButton.addEventListener('click', () => {
            try {
                // Show loading state
                exportButton.textContent = 'Exporting...';
                exportButton.disabled = true;
                
                // Gather options from form
                const exportOptions = {
                    includeTimestamps: timestampsCheck.querySelector('input').checked,
                    includeSenderInfo: senderCheck.querySelector('input').checked,
                    includeMetadata: metadataCheck.querySelector('input').checked,
                    splitByDate: splitCheck.querySelector('input').checked,
                    prettyPrint: prettyPrintCheck.querySelector('input').checked,
                    markdownStyle: markdownStyleSelect.value,
                    csvDelimiter: delimiterSelect.value,
                    htmlStyling: htmlStylingCheck.querySelector('input').checked,
                    htmlTemplate: templateSelect.value,
                    defaultFileName: filenameInput.value
                };
                
                // Get selected format
                const format = formatSelect.value;
                
                // Get messages from chat
                // This is a placeholder - in a real implementation, you would get the actual messages
                const messages = [
                    {
                        sender: 'user',
                        message: 'Hello, this is a test message',
                        timestamp: new Date(),
                        metadata: { type: 'text' }
                    },
                    {
                        sender: 'ai',
                        message: 'Hello! I am the AI assistant. How can I help you today?',
                        timestamp: new Date(Date.now() + 1000),
                        metadata: { type: 'text' }
                    }
                ];
                
                // Export chat
                const exportedContent = this.exportChat(messages, format, exportOptions);
                
                // Download export
                this.downloadExport(exportedContent, format, exportOptions.defaultFileName);
                
                // Reset button
                exportButton.textContent = 'Export Chat';
                exportButton.disabled = false;
            } catch (error) {
                console.error('Error exporting chat:', error);
                
                // Show error message
                exportButton.textContent = 'Error - Try Again';
                
                // Reset after delay
                setTimeout(() => {
                    exportButton.textContent = 'Export Chat';
                    exportButton.disabled = false;
                }, 3000);
            }
        });
        
        // Add styles
        this.addStyles();
        
        return uiContainer;
    }

    /**
     * Create a section element
     * @param {string} title - Section title
     * @returns {HTMLElement} Section element
     */
    createSection(title) {
        const section = document.createElement('div');
        section.className = 'text-export-section';
        
        const sectionTitle = document.createElement('h4');
        sectionTitle.className = 'text-export-section-title';
        sectionTitle.textContent = title;
        section.appendChild(sectionTitle);
        
        return section;
    }

    /**
     * Create a form group element
     * @param {string} label - Group label
     * @returns {HTMLElement} Form group element
     */
    createFormGroup(label) {
        const group = document.createElement('div');
        group.className = 'text-export-form-group';
        
        if (label) {
            const labelElement = document.createElement('label');
            labelElement.className = 'text-export-label';
            labelElement.textContent = label;
            group.appendChild(labelElement);
        }
        
        return group;
    }

    /**
     * Create a checkbox element
     * @param {string} id - Checkbox ID
     * @param {string} label - Checkbox label
     * @param {boolean} checked - Whether checkbox is checked
     * @returns {HTMLElement} Checkbox container
     */
    createCheckbox(id, label, checked) {
        const container = document.createElement('div');
        container.className = 'text-export-checkbox-container';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.className = 'text-export-checkbox';
        checkbox.checked = checked;
        container.appendChild(checkbox);
        
        const labelElement = document.createElement('label');
        labelElement.htmlFor = id;
        labelElement.className = 'text-export-checkbox-label';
        labelElement.textContent = label;
        container.appendChild(labelElement);
        
        return container;
    }

    /**
     * Add CSS styles
     */
    addStyles() {
        const styleId = 'text-export-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .text-export-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .text-export-header {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .text-export-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .text-export-form {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1.5rem;
            }
            
            .text-export-section {
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .text-export-section-title {
                font-size: 1rem;
                font-weight: 600;
                margin: 0 0 1rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .text-export-form-group {
                margin-bottom: 1rem;
            }
            
            .text-export-form-group:last-child {
                margin-bottom: 0;
            }
            
            .text-export-label {
                display: block;
                font-size: 0.875rem;
                margin-bottom: 0.5rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .text-export-select,
            .text-export-input {
                width: 100%;
                padding: 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .text-export-checkbox-container {
                display: flex;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .text-export-checkbox {
                margin-right: 0.5rem;
            }
            
            .text-export-checkbox-label {
                font-size: 0.875rem;
                cursor: pointer;
            }
            
            .text-export-button {
                padding: 0.625rem 1.25rem;
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
                margin-top: 1rem;
                width: 100%;
            }
            
            .text-export-button:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .text-export-button:disabled {
                background-color: var(--accent-primary, #7c3aed);
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            @media (max-width: 768px) {
                .text-export-form {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TextExport };
} else {
    // Add to global scope for browser usage
    window.TextExport = TextExport;
}
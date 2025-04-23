/**
 * JAAT-AI PDF Export Feature
 * Export chat conversations and other content to PDF format
 */

class PDFExport {
    constructor() {
        // Configuration options
        this.options = {
            pageSize: 'a4',
            pageOrientation: 'portrait',
            defaultFileName: 'jaat-ai-export',
            includeTimestamps: true,
            includeSenderInfo: true,
            includeMetadata: true,
            colorScheme: 'default', // default, dark, light, custom
            customColors: {
                background: '#ffffff',
                headerBackground: '#f3f4f6',
                headerText: '#111827',
                userMessage: '#e9f5fe',
                userMessageText: '#1e3a8a',
                aiMessage: '#f1f5f9',
                aiMessageText: '#0f172a',
                timestampText: '#6b7280'
            },
            margins: {
                top: 40,
                right: 40,
                bottom: 40,
                left: 40
            },
            fontFamily: 'Helvetica',
            fontSize: {
                header: 18,
                subheader: 14,
                message: 12,
                timestamp: 10,
                footer: 10
            },
            logoUrl: null,
            headerText: 'JAAT-AI Chat Export',
            footerText: 'Exported from JAAT-AI',
            includePageNumbers: true,
            compressImages: true,
            maxImageSize: 800, // max width/height in pixels for images
            imageQuality: 0.8, // 0-1 for image compression quality
            enableHyperlinks: true,
            tableOfContents: false,
            splitByDate: false
        };
        
        // Supported page sizes
        this.pageSizes = [
            { id: 'a4', name: 'A4', width: 595.28, height: 841.89 },
            { id: 'letter', name: 'Letter', width: 612, height: 792 },
            { id: 'legal', name: 'Legal', width: 612, height: 1008 },
            { id: 'a3', name: 'A3', width: 841.89, height: 1190.55 },
            { id: 'a5', name: 'A5', width: 419.53, height: 595.28 }
        ];
        
        // Color scheme presets
        this.colorSchemes = {
            default: {
                background: '#ffffff',
                headerBackground: '#f3f4f6',
                headerText: '#111827',
                userMessage: '#e9f5fe',
                userMessageText: '#1e3a8a',
                aiMessage: '#f1f5f9',
                aiMessageText: '#0f172a',
                timestampText: '#6b7280'
            },
            dark: {
                background: '#1f2937',
                headerBackground: '#111827',
                headerText: '#f9fafb',
                userMessage: '#374151',
                userMessageText: '#e5e7eb',
                aiMessage: '#2a374b',
                aiMessageText: '#e5e7eb',
                timestampText: '#9ca3af'
            },
            light: {
                background: '#ffffff',
                headerBackground: '#f9fafb',
                headerText: '#1f2937',
                userMessage: '#f3f4f6',
                userMessageText: '#1f2937',
                aiMessage: '#f9fafb',
                aiMessageText: '#1f2937',
                timestampText: '#6b7280'
            },
            professional: {
                background: '#ffffff',
                headerBackground: '#0f4c81',
                headerText: '#ffffff',
                userMessage: '#e6f2ff',
                userMessageText: '#0f4c81',
                aiMessage: '#f0f4f8',
                aiMessageText: '#2c3e50',
                timestampText: '#5a6b7b'
            },
            contrast: {
                background: '#ffffff',
                headerBackground: '#000000',
                headerText: '#ffffff',
                userMessage: '#000000',
                userMessageText: '#ffffff',
                aiMessage: '#ffffff',
                aiMessageText: '#000000',
                timestampText: '#555555'
            }
        };
        
        // PDF document instance (will be created during export)
        this.doc = null;
        
        // Current page data
        this.currentPage = 1;
        this.totalPages = 1;
        this.currentY = 0;
        
        // Default chat message structure expected:
        // {
        //   sender: 'user' | 'ai',
        //   message: 'message text',
        //   timestamp: Date | string,
        //   metadata: { any additional data }
        // }
    }

    /**
     * Initialize PDF exporter
     * @param {Object} options - Configuration options
     * @returns {PDFExport} This instance
     */
    init(options = {}) {
        // Apply custom options
        if (options) {
            this.options = { ...this.options, ...options };
            
            // Handle nested objects
            if (options.customColors) {
                this.options.customColors = { ...this.options.customColors, ...options.customColors };
            }
            
            if (options.margins) {
                this.options.margins = { ...this.options.margins, ...options.margins };
            }
            
            if (options.fontSize) {
                this.options.fontSize = { ...this.options.fontSize, ...options.fontSize };
            }
        }
        
        // Load pdfmake or other PDF library here
        this.loadDependencies();
        
        console.log('PDF Export initialized');
        return this;
    }

    /**
     * Load PDF generation dependencies
     */
    loadDependencies() {
        // Check if pdfmake is already loaded
        if (typeof pdfMake !== 'undefined') {
            console.log('pdfMake is already loaded');
            return;
        }
        
        // In a real implementation, we would dynamically load pdfmake
        console.log('In a real implementation, pdfMake and pdfFonts would be loaded here');
    }

    /**
     * Export chat conversations to PDF
     * @param {Array} messages - Array of message objects
     * @param {Object} options - Export options (overrides instance options)
     * @returns {Promise<Blob>} PDF blob
     */
    async exportChatToPDF(messages, options = {}) {
        // Merge options
        const exportOptions = { ...this.options, ...options };
        
        try {
            // Create document definition
            const docDefinition = this.createDocDefinition(messages, exportOptions);
            
            // Generate PDF
            const pdfDoc = this.generatePDF(docDefinition);
            
            // Return as blob
            return pdfDoc;
        } catch (error) {
            console.error('Error exporting chat to PDF:', error);
            throw error;
        }
    }

    /**
     * Create document definition for pdfmake
     * @param {Array} messages - Array of message objects
     * @param {Object} options - Export options
     * @returns {Object} Document definition
     */
    createDocDefinition(messages, options) {
        // Get color scheme
        const colors = options.colorScheme === 'custom' ? 
            options.customColors : 
            this.colorSchemes[options.colorScheme] || this.colorSchemes.default;
        
        // Get page dimensions
        const pageSize = this.pageSizes.find(size => size.id === options.pageSize) || this.pageSizes[0];
        
        // Create content array
        const content = [];
        
        // Add header
        content.push({
            text: options.headerText,
            style: 'header',
            margin: [0, 0, 0, 20]
        });
        
        // Add export metadata
        if (options.includeMetadata) {
            content.push({
                text: `Exported on: ${new Date().toLocaleString()}`,
                style: 'metadata',
                margin: [0, 0, 0, 10]
            });
            
            if (messages.length > 0) {
                const firstMessage = messages[0];
                const lastMessage = messages[messages.length - 1];
                
                // Add conversation time range if timestamps are available
                if (firstMessage.timestamp && lastMessage.timestamp) {
                    const firstDate = new Date(firstMessage.timestamp).toLocaleString();
                    const lastDate = new Date(lastMessage.timestamp).toLocaleString();
                    
                    content.push({
                        text: `Conversation from ${firstDate} to ${lastDate}`,
                        style: 'metadata',
                        margin: [0, 0, 0, 20]
                    });
                }
                
                // Add message count
                content.push({
                    text: `Total messages: ${messages.length}`,
                    style: 'metadata',
                    margin: [0, 0, 0, 20]
                });
            }
        }
        
        // Create table of contents if enabled
        if (options.tableOfContents && messages.length > 0) {
            content.push({
                text: 'Table of Contents',
                style: 'subheader',
                margin: [0, 0, 0, 10]
            });
            
            // Group messages by date if splitByDate is enabled
            if (options.splitByDate) {
                const dateGroups = this.groupMessagesByDate(messages);
                
                const tocItems = [];
                dateGroups.forEach((group, index) => {
                    tocItems.push({
                        text: group.date,
                        style: 'tocItem',
                        tocItem: true,
                        margin: [0, 5, 0, 0]
                    });
                });
                
                content.push({
                    stack: tocItems,
                    margin: [0, 0, 0, 20]
                });
            }
            
            // Add page break after table of contents
            content.push({ text: '', pageBreak: 'after' });
        }
        
        // Add messages
        if (options.splitByDate) {
            // Group messages by date
            const dateGroups = this.groupMessagesByDate(messages);
            
            dateGroups.forEach((group, index) => {
                // Add date header
                content.push({
                    text: group.date,
                    style: 'subheader',
                    margin: [0, index > 0 ? 20 : 0, 0, 10],
                    pageBreak: index > 0 ? 'before' : undefined
                });
                
                // Add messages for this date
                group.messages.forEach(message => {
                    content.push(this.formatMessageForPDF(message, options, colors));
                });
            });
        } else {
            // Add all messages sequentially
            messages.forEach(message => {
                content.push(this.formatMessageForPDF(message, options, colors));
            });
        }
        
        // Create document definition
        const docDefinition = {
            pageSize: options.pageSize,
            pageOrientation: options.pageOrientation,
            pageMargins: [
                options.margins.left, 
                options.margins.top, 
                options.margins.right, 
                options.margins.bottom
            ],
            content: content,
            styles: {
                header: {
                    fontSize: options.fontSize.header,
                    bold: true,
                    color: colors.headerText,
                    alignment: 'center',
                    background: colors.headerBackground
                },
                subheader: {
                    fontSize: options.fontSize.subheader,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                metadata: {
                    fontSize: options.fontSize.timestamp,
                    color: colors.timestampText,
                    italic: true
                },
                userMessage: {
                    background: colors.userMessage,
                    color: colors.userMessageText,
                    margin: [0, 5, 0, 5],
                    padding: [10, 10, 10, 10],
                    borderRadius: 5
                },
                aiMessage: {
                    background: colors.aiMessage,
                    color: colors.aiMessageText,
                    margin: [0, 5, 0, 5],
                    padding: [10, 10, 10, 10],
                    borderRadius: 5
                },
                timestamp: {
                    fontSize: options.fontSize.timestamp,
                    color: colors.timestampText,
                    alignment: 'right',
                    margin: [0, 2, 0, 10],
                    italic: true
                },
                tocItem: {
                    fontSize: options.fontSize.message,
                    color: colors.headerText,
                    margin: [0, 3, 0, 3]
                }
            },
            defaultStyle: {
                font: options.fontFamily,
                fontSize: options.fontSize.message
            },
            background: {
                color: colors.background
            },
            footer: (currentPage, pageCount) => {
                return {
                    text: options.includePageNumbers ? 
                        `${options.footerText} | Page ${currentPage} of ${pageCount}` : 
                        options.footerText,
                    alignment: 'center',
                    fontSize: options.fontSize.footer,
                    margin: [options.margins.left, 0, options.margins.right, 0]
                };
            }
        };
        
        // Add logo if specified
        if (options.logoUrl) {
            docDefinition.header = {
                image: options.logoUrl,
                width: 100,
                alignment: 'center',
                margin: [0, 10, 0, 10]
            };
        }
        
        return docDefinition;
    }

    /**
     * Format a message for PDF output
     * @param {Object} message - Message object
     * @param {Object} options - Export options
     * @param {Object} colors - Color scheme
     * @returns {Object} Formatted message for PDF
     */
    formatMessageForPDF(message, options, colors) {
        const isUser = message.sender === 'user';
        const style = isUser ? 'userMessage' : 'aiMessage';
        
        const items = [];
        
        // Add sender info if enabled
        if (options.includeSenderInfo) {
            items.push({
                text: isUser ? 'You' : 'AI Assistant',
                bold: true,
                fontSize: options.fontSize.message + 1,
                margin: [0, 0, 0, 3]
            });
        }
        
        // Add message content
        items.push({
            text: message.message,
            fontSize: options.fontSize.message
        });
        
        // Create message container
        const messageContainer = {
            stack: items,
            style: style
        };
        
        // Create container with optional timestamp
        const container = [messageContainer];
        
        // Add timestamp if enabled
        if (options.includeTimestamps && message.timestamp) {
            const timestamp = new Date(message.timestamp).toLocaleString();
            container.push({
                text: timestamp,
                style: 'timestamp'
            });
        }
        
        return {
            stack: container,
            margin: [0, 5, 0, 5]
        };
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
     * Generate PDF from document definition
     * @param {Object} docDefinition - Document definition
     * @returns {Promise<Blob>} PDF blob
     */
    generatePDF(docDefinition) {
        return new Promise((resolve, reject) => {
            try {
                // In a real implementation, we would use pdfmake to generate the PDF
                // pdfMake.createPdf(docDefinition).getBlob(blob => resolve(blob));
                
                // For this simulation, create a mock PDF blob
                console.log('Creating PDF with definition:', docDefinition);
                
                // Simulate PDF generation
                setTimeout(() => {
                    const mockPdfBlob = new Blob(['PDF content'], { type: 'application/pdf' });
                    resolve(mockPdfBlob);
                }, 500);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Download PDF
     * @param {Blob} pdfBlob - PDF blob
     * @param {string} fileName - File name
     */
    downloadPDF(pdfBlob, fileName = null) {
        // Use default file name if none provided
        const name = fileName || `${this.options.defaultFileName}-${Date.now()}.pdf`;
        
        // Create download link
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        
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
     * Create UI for PDF export configuration
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
        uiContainer.className = 'pdf-export-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'pdf-export-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'pdf-export-title';
        title.textContent = 'PDF Export Options';
        header.appendChild(title);
        
        // Create form
        const form = document.createElement('div');
        form.className = 'pdf-export-form';
        uiContainer.appendChild(form);
        
        // Page settings section
        const pageSection = this.createSection('Page Settings');
        form.appendChild(pageSection);
        
        // Page size
        const pageSizeGroup = this.createFormGroup('Page Size');
        pageSection.appendChild(pageSizeGroup);
        
        const pageSizeSelect = document.createElement('select');
        pageSizeSelect.className = 'pdf-export-select';
        pageSizeSelect.id = 'page-size';
        
        this.pageSizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size.id;
            option.textContent = size.name;
            if (size.id === this.options.pageSize) {
                option.selected = true;
            }
            pageSizeSelect.appendChild(option);
        });
        
        pageSizeGroup.appendChild(pageSizeSelect);
        
        // Page orientation
        const orientationGroup = this.createFormGroup('Orientation');
        pageSection.appendChild(orientationGroup);
        
        const orientationSelect = document.createElement('select');
        orientationSelect.className = 'pdf-export-select';
        orientationSelect.id = 'page-orientation';
        
        ['portrait', 'landscape'].forEach(orientation => {
            const option = document.createElement('option');
            option.value = orientation;
            option.textContent = orientation.charAt(0).toUpperCase() + orientation.slice(1);
            if (orientation === this.options.pageOrientation) {
                option.selected = true;
            }
            orientationSelect.appendChild(option);
        });
        
        orientationGroup.appendChild(orientationSelect);
        
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
        
        // Include page numbers
        const pageNumbersGroup = this.createFormGroup('');
        contentSection.appendChild(pageNumbersGroup);
        
        const pageNumbersCheck = this.createCheckbox(
            'include-page-numbers',
            'Include page numbers',
            this.options.includePageNumbers
        );
        pageNumbersGroup.appendChild(pageNumbersCheck);
        
        // Table of contents
        const tocGroup = this.createFormGroup('');
        contentSection.appendChild(tocGroup);
        
        const tocCheck = this.createCheckbox(
            'table-of-contents',
            'Include table of contents',
            this.options.tableOfContents
        );
        tocGroup.appendChild(tocCheck);
        
        // Split by date
        const splitGroup = this.createFormGroup('');
        contentSection.appendChild(splitGroup);
        
        const splitCheck = this.createCheckbox(
            'split-by-date',
            'Group messages by date',
            this.options.splitByDate
        );
        splitGroup.appendChild(splitCheck);
        
        // Appearance section
        const appearanceSection = this.createSection('Appearance');
        form.appendChild(appearanceSection);
        
        // Color scheme
        const colorSchemeGroup = this.createFormGroup('Color Scheme');
        appearanceSection.appendChild(colorSchemeGroup);
        
        const colorSchemeSelect = document.createElement('select');
        colorSchemeSelect.className = 'pdf-export-select';
        colorSchemeSelect.id = 'color-scheme';
        
        const colorSchemeOptions = [
            { value: 'default', label: 'Default' },
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'professional', label: 'Professional' },
            { value: 'contrast', label: 'High Contrast' },
            { value: 'custom', label: 'Custom' }
        ];
        
        colorSchemeOptions.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option.value;
            optionEl.textContent = option.label;
            if (option.value === this.options.colorScheme) {
                optionEl.selected = true;
            }
            colorSchemeSelect.appendChild(optionEl);
        });
        
        colorSchemeGroup.appendChild(colorSchemeSelect);
        
        // Font family
        const fontFamilyGroup = this.createFormGroup('Font');
        appearanceSection.appendChild(fontFamilyGroup);
        
        const fontFamilySelect = document.createElement('select');
        fontFamilySelect.className = 'pdf-export-select';
        fontFamilySelect.id = 'font-family';
        
        const fontOptions = [
            { value: 'Helvetica', label: 'Helvetica' },
            { value: 'Times', label: 'Times' },
            { value: 'Courier', label: 'Courier' }
        ];
        
        fontOptions.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option.value;
            optionEl.textContent = option.label;
            if (option.value === this.options.fontFamily) {
                optionEl.selected = true;
            }
            fontFamilySelect.appendChild(optionEl);
        });
        
        fontFamilyGroup.appendChild(fontFamilySelect);
        
        // Header text
        const headerTextGroup = this.createFormGroup('Header Text');
        appearanceSection.appendChild(headerTextGroup);
        
        const headerTextInput = document.createElement('input');
        headerTextInput.type = 'text';
        headerTextInput.className = 'pdf-export-input';
        headerTextInput.id = 'header-text';
        headerTextInput.value = this.options.headerText;
        headerTextGroup.appendChild(headerTextInput);
        
        // Footer text
        const footerTextGroup = this.createFormGroup('Footer Text');
        appearanceSection.appendChild(footerTextGroup);
        
        const footerTextInput = document.createElement('input');
        footerTextInput.type = 'text';
        footerTextInput.className = 'pdf-export-input';
        footerTextInput.id = 'footer-text';
        footerTextInput.value = this.options.footerText;
        footerTextGroup.appendChild(footerTextInput);
        
        // Export section
        const exportSection = this.createSection('Export');
        form.appendChild(exportSection);
        
        // Filename
        const filenameGroup = this.createFormGroup('Filename');
        exportSection.appendChild(filenameGroup);
        
        const filenameInput = document.createElement('input');
        filenameInput.type = 'text';
        filenameInput.className = 'pdf-export-input';
        filenameInput.id = 'filename';
        filenameInput.value = this.options.defaultFileName;
        filenameGroup.appendChild(filenameInput);
        
        // Export button
        const exportButton = document.createElement('button');
        exportButton.className = 'pdf-export-button';
        exportButton.textContent = 'Export to PDF';
        exportSection.appendChild(exportButton);
        
        // Add event listeners
        
        // Export button click
        exportButton.addEventListener('click', async () => {
            try {
                // Show loading state
                exportButton.textContent = 'Generating PDF...';
                exportButton.disabled = true;
                
                // Gather options from form
                const exportOptions = {
                    pageSize: pageSizeSelect.value,
                    pageOrientation: orientationSelect.value,
                    includeTimestamps: timestampsCheck.querySelector('input').checked,
                    includeSenderInfo: senderCheck.querySelector('input').checked,
                    includeMetadata: metadataCheck.querySelector('input').checked,
                    includePageNumbers: pageNumbersCheck.querySelector('input').checked,
                    tableOfContents: tocCheck.querySelector('input').checked,
                    splitByDate: splitCheck.querySelector('input').checked,
                    colorScheme: colorSchemeSelect.value,
                    fontFamily: fontFamilySelect.value,
                    headerText: headerTextInput.value,
                    footerText: footerTextInput.value,
                    defaultFileName: filenameInput.value
                };
                
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
                        timestamp: new Date(),
                        metadata: { type: 'text' }
                    }
                ];
                
                // Export to PDF
                const pdfBlob = await this.exportChatToPDF(messages, exportOptions);
                
                // Download PDF
                this.downloadPDF(pdfBlob, `${exportOptions.defaultFileName}.pdf`);
                
                // Reset button
                exportButton.textContent = 'Export to PDF';
                exportButton.disabled = false;
            } catch (error) {
                console.error('Error exporting to PDF:', error);
                
                // Show error message
                exportButton.textContent = 'Error - Try Again';
                exportButton.disabled = false;
                
                // Reset after delay
                setTimeout(() => {
                    exportButton.textContent = 'Export to PDF';
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
        section.className = 'pdf-export-section';
        
        const sectionTitle = document.createElement('h4');
        sectionTitle.className = 'pdf-export-section-title';
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
        group.className = 'pdf-export-form-group';
        
        if (label) {
            const labelElement = document.createElement('label');
            labelElement.className = 'pdf-export-label';
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
        container.className = 'pdf-export-checkbox-container';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.className = 'pdf-export-checkbox';
        checkbox.checked = checked;
        container.appendChild(checkbox);
        
        const labelElement = document.createElement('label');
        labelElement.htmlFor = id;
        labelElement.className = 'pdf-export-checkbox-label';
        labelElement.textContent = label;
        container.appendChild(labelElement);
        
        return container;
    }

    /**
     * Add CSS styles
     */
    addStyles() {
        const styleId = 'pdf-export-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .pdf-export-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .pdf-export-header {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .pdf-export-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .pdf-export-form {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1.5rem;
            }
            
            .pdf-export-section {
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .pdf-export-section-title {
                font-size: 1rem;
                font-weight: 600;
                margin: 0 0 1rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .pdf-export-form-group {
                margin-bottom: 1rem;
            }
            
            .pdf-export-form-group:last-child {
                margin-bottom: 0;
            }
            
            .pdf-export-label {
                display: block;
                font-size: 0.875rem;
                margin-bottom: 0.5rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .pdf-export-select,
            .pdf-export-input {
                width: 100%;
                padding: 0.5rem;
                background-color: var(--bg-secondary, #161b22);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .pdf-export-checkbox-container {
                display: flex;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .pdf-export-checkbox {
                margin-right: 0.5rem;
            }
            
            .pdf-export-checkbox-label {
                font-size: 0.875rem;
                cursor: pointer;
            }
            
            .pdf-export-button {
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
            
            .pdf-export-button:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .pdf-export-button:disabled {
                background-color: var(--accent-primary, #7c3aed);
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            @media (max-width: 768px) {
                .pdf-export-form {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PDFExport };
} else {
    // Add to global scope for browser usage
    window.PDFExport = PDFExport;
}
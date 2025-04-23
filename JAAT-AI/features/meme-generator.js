/**
 * JAAT-AI Meme Generator Feature
 * Generate memes with custom text overlays on popular templates
 */

class MemeGenerator {
    constructor() {
        this.templates = [
            { id: 'drake', name: 'Drake Hotline Bling', width: 1200, height: 1200, textAreas: 2 },
            { id: 'distracted', name: 'Distracted Boyfriend', width: 1200, height: 800, textAreas: 3 },
            { id: 'button', name: 'Two Buttons', width: 600, height: 908, textAreas: 2 },
            { id: 'expanding', name: 'Expanding Brain', width: 857, height: 1202, textAreas: 4 },
            { id: 'change', name: 'Change My Mind', width: 482, height: 361, textAreas: 1 },
            { id: 'doge', name: 'Doge', width: 800, height: 800, textAreas: 5 },
            { id: 'thinking', name: 'Roll Safe Think About It', width: 702, height: 395, textAreas: 1 },
            { id: 'success', name: 'Success Kid', width: 500, height: 500, textAreas: 2 },
            { id: 'aliens', name: 'Ancient Aliens', width: 500, height: 437, textAreas: 1 },
            { id: 'fine', name: 'This is Fine', width: 580, height: 282, textAreas: 1 }
        ];
        
        this.currentTemplate = this.templates[0];
        this.textInputs = [];
        this.canvas = null;
        this.ctx = null;
        this.templateImage = new Image();
        this.apiEndpoint = 'https://api.imgflip.com/caption_image';
        this.defaultFontSize = 36;
        this.defaultFontFamily = 'Impact, Arial, sans-serif';
        this.defaultTextColor = '#ffffff';
        this.defaultOutlineColor = '#000000';
        this.defaultOutlineWidth = 2;
    }

    /**
     * Initialize the meme generator
     * @param {Object} options - Custom default options
     * @returns {Promise<MemeGenerator>} This instance
     */
    async init(options = {}) {
        // Apply custom options
        Object.assign(this, options);
        
        console.log('Meme Generator initialized');
        return this;
    }

    /**
     * Create the meme generator UI
     * @param {HTMLElement|string} container - Container element or ID
     * @returns {HTMLElement} The created UI
     */
    createUI(container) {
        // Get container element
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        
        if (!container) {
            console.error('Container element not found');
            return null;
        }
        
        // Clear container
        container.innerHTML = '';
        
        // Create main wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'meme-generator-container';
        container.appendChild(wrapper);
        
        // Create template selection
        const templateSelector = document.createElement('div');
        templateSelector.className = 'meme-template-selector';
        wrapper.appendChild(templateSelector);
        
        const templateLabel = document.createElement('label');
        templateLabel.textContent = 'Select Template:';
        templateSelector.appendChild(templateLabel);
        
        const templateSelect = document.createElement('select');
        templateSelect.className = 'meme-template-select';
        templateSelector.appendChild(templateSelect);
        
        // Add template options
        this.templates.forEach(template => {
            const option = document.createElement('option');
            option.value = template.id;
            option.textContent = template.name;
            templateSelect.appendChild(option);
        });
        
        // Template selection change event
        templateSelect.addEventListener('change', () => {
            const selectedId = templateSelect.value;
            this.currentTemplate = this.templates.find(t => t.id === selectedId);
            this.updateTextInputs(textInputsContainer);
            this.previewMeme();
        });
        
        // Create text inputs container
        const textInputsContainer = document.createElement('div');
        textInputsContainer.className = 'meme-text-inputs';
        wrapper.appendChild(textInputsContainer);
        
        // Initialize with first template
        this.updateTextInputs(textInputsContainer);
        
        // Preview container
        const previewContainer = document.createElement('div');
        previewContainer.className = 'meme-preview-container';
        wrapper.appendChild(previewContainer);
        
        // Canvas for preview
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'meme-preview-canvas';
        this.canvas.width = this.currentTemplate.width;
        this.canvas.height = this.currentTemplate.height;
        previewContainer.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        
        // Action buttons
        const actionButtons = document.createElement('div');
        actionButtons.className = 'meme-action-buttons';
        wrapper.appendChild(actionButtons);
        
        // Preview button
        const previewButton = document.createElement('button');
        previewButton.className = 'btn btn-primary meme-preview-btn';
        previewButton.textContent = 'Preview Meme';
        previewButton.addEventListener('click', () => this.previewMeme());
        actionButtons.appendChild(previewButton);
        
        // Generate button
        const generateButton = document.createElement('button');
        generateButton.className = 'btn btn-success meme-generate-btn';
        generateButton.textContent = 'Generate Meme';
        generateButton.addEventListener('click', () => this.generateMeme());
        actionButtons.appendChild(generateButton);
        
        // Download button
        const downloadButton = document.createElement('button');
        downloadButton.className = 'btn btn-outline meme-download-btn';
        downloadButton.textContent = 'Download Meme';
        downloadButton.addEventListener('click', () => this.downloadMeme());
        actionButtons.appendChild(downloadButton);
        
        // Clear button
        const clearButton = document.createElement('button');
        clearButton.className = 'btn btn-ghost meme-clear-btn';
        clearButton.textContent = 'Clear';
        clearButton.addEventListener('click', () => this.clearInputs(textInputsContainer));
        actionButtons.appendChild(clearButton);
        
        // Load first template
        this.loadTemplateImage();
        
        return wrapper;
    }

    /**
     * Update text input fields based on current template
     * @param {HTMLElement} container - Container for text inputs
     */
    updateTextInputs(container) {
        // Clear container
        container.innerHTML = '';
        this.textInputs = [];
        
        // Create text inputs based on template
        for (let i = 0; i < this.currentTemplate.textAreas; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'meme-input-group';
            container.appendChild(inputGroup);
            
            const label = document.createElement('label');
            label.textContent = `Text ${i + 1}:`;
            inputGroup.appendChild(label);
            
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.className = 'meme-text-input';
            textInput.placeholder = `Enter text for position ${i + 1}`;
            inputGroup.appendChild(textInput);
            
            // Input change event
            textInput.addEventListener('input', () => {
                this.previewMeme();
            });
            
            this.textInputs.push(textInput);
        }
    }

    /**
     * Clear all text inputs
     * @param {HTMLElement} container - Text inputs container
     */
    clearInputs(container) {
        this.textInputs.forEach(input => {
            input.value = '';
        });
        this.previewMeme();
    }

    /**
     * Load template image
     */
    loadTemplateImage() {
        this.templateImage.src = `../assets/images/meme-templates/${this.currentTemplate.id}.jpg`;
        this.templateImage.onload = () => {
            this.previewMeme();
        };
        this.templateImage.onerror = () => {
            console.error(`Failed to load template image: ${this.currentTemplate.id}`);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#f8f9fa';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#dc3545';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Error loading template image', this.canvas.width / 2, this.canvas.height / 2);
        };
    }

    /**
     * Preview meme on canvas
     */
    previewMeme() {
        if (!this.ctx) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw template image
        if (this.templateImage.complete && this.templateImage.naturalWidth !== 0) {
            this.canvas.width = this.currentTemplate.width;
            this.canvas.height = this.currentTemplate.height;
            this.ctx.drawImage(this.templateImage, 0, 0, this.canvas.width, this.canvas.height);
            
            // Draw text
            this.drawMemeText();
        } else {
            // Image not loaded yet
            this.ctx.fillStyle = '#f8f9fa';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#6c757d';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Loading template...', this.canvas.width / 2, this.canvas.height / 2);
        }
    }

    /**
     * Draw meme text on canvas
     */
    drawMemeText() {
        // Set text style
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = `${this.defaultFontSize}px ${this.defaultFontFamily}`;
        this.ctx.strokeStyle = this.defaultOutlineColor;
        this.ctx.lineWidth = this.defaultOutlineWidth;
        this.ctx.fillStyle = this.defaultTextColor;
        
        // Get text values
        const texts = this.textInputs.map(input => input.value);
        
        // Position text based on template and text count
        switch (this.currentTemplate.id) {
            case 'drake':
                // Drake template (2 text areas)
                if (texts[0]) this.drawTextWithOutline(texts[0], this.canvas.width * 0.7, this.canvas.height * 0.25);
                if (texts[1]) this.drawTextWithOutline(texts[1], this.canvas.width * 0.7, this.canvas.height * 0.75);
                break;
                
            case 'distracted':
                // Distracted boyfriend (3 text areas)
                if (texts[0]) this.drawTextWithOutline(texts[0], this.canvas.width * 0.7, this.canvas.height * 0.2);
                if (texts[1]) this.drawTextWithOutline(texts[1], this.canvas.width * 0.3, this.canvas.height * 0.3);
                if (texts[2]) this.drawTextWithOutline(texts[2], this.canvas.width * 0.5, this.canvas.height * 0.6);
                break;
                
            case 'expanding':
                // Expanding brain (4 text areas)
                const spacing = this.canvas.height / 4;
                for (let i = 0; i < Math.min(4, texts.length); i++) {
                    if (texts[i]) {
                        this.drawTextWithOutline(texts[i], this.canvas.width * 0.5, spacing * i + spacing / 2);
                    }
                }
                break;
                
            case 'change':
                // Change my mind (1 text area)
                if (texts[0]) this.drawTextWithOutline(texts[0], this.canvas.width * 0.5, this.canvas.height * 0.25);
                break;
                
            default:
                // Default positioning for other templates
                const heightSegment = this.canvas.height / (this.currentTemplate.textAreas + 1);
                for (let i = 0; i < Math.min(this.currentTemplate.textAreas, texts.length); i++) {
                    if (texts[i]) {
                        this.drawTextWithOutline(
                            texts[i], 
                            this.canvas.width / 2, 
                            heightSegment * (i + 1)
                        );
                    }
                }
        }
    }

    /**
     * Draw text with outline
     * @param {string} text - Text to draw
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    drawTextWithOutline(text, x, y) {
        const maxWidth = this.canvas.width * 0.8;
        
        // Automatically wrap text
        const lines = this.wrapText(text, maxWidth);
        const lineHeight = this.defaultFontSize * 1.2;
        
        // Draw each line
        lines.forEach((line, i) => {
            const lineY = y + (i - (lines.length - 1) / 2) * lineHeight;
            
            // Draw outline
            this.ctx.strokeText(line, x, lineY, maxWidth);
            
            // Draw text
            this.ctx.fillText(line, x, lineY, maxWidth);
        });
    }

    /**
     * Wrap text into multiple lines
     * @param {string} text - Text to wrap
     * @param {number} maxWidth - Maximum width for text
     * @returns {string[]} Array of text lines
     */
    wrapText(text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = this.ctx.measureText(currentLine + ' ' + word).width;
            
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        
        lines.push(currentLine);
        return lines;
    }

    /**
     * Generate meme
     * @returns {Promise<string>} URL of generated meme
     */
    async generateMeme() {
        // Get text values
        const texts = this.textInputs.map(input => input.value);
        
        try {
            // Use Canvas to generate locally
            return new Promise((resolve) => {
                // Make sure canvas is up to date
                this.previewMeme();
                
                // Convert canvas to data URL
                const dataUrl = this.canvas.toDataURL('image/png');
                
                // Show success notification
                if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                    JaatUIAnimator.showNotification('Meme generated successfully!', 'success');
                } else {
                    alert('Meme generated successfully!');
                }
                
                resolve(dataUrl);
            });
        } catch (error) {
            console.error('Error generating meme:', error);
            
            // Show error notification
            if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                JaatUIAnimator.showNotification('Failed to generate meme', 'error');
            } else {
                alert('Failed to generate meme: ' + error.message);
            }
            
            return null;
        }
    }

    /**
     * Download meme
     */
    downloadMeme() {
        // Generate meme first
        this.generateMeme().then(dataUrl => {
            if (!dataUrl) return;
            
            // Create download link
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `meme-${this.currentTemplate.id}-${Date.now()}.png`;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MemeGenerator };
} else {
    // Add to global scope for browser usage
    window.MemeGenerator = MemeGenerator;
}
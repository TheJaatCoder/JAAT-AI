/**
 * JAAT-AI Code Formatter Feature
 * Format and beautify code snippets in different programming languages
 */

class CodeFormatter {
    constructor() {
        this.supportedLanguages = [
            { id: 'javascript', name: 'JavaScript', ext: 'js', mode: 'javascript' },
            { id: 'typescript', name: 'TypeScript', ext: 'ts', mode: 'typescript' },
            { id: 'jsx', name: 'React JSX', ext: 'jsx', mode: 'jsx' },
            { id: 'tsx', name: 'React TSX', ext: 'tsx', mode: 'tsx' },
            { id: 'html', name: 'HTML', ext: 'html', mode: 'html' },
            { id: 'css', name: 'CSS', ext: 'css', mode: 'css' },
            { id: 'json', name: 'JSON', ext: 'json', mode: 'json' },
            { id: 'markdown', name: 'Markdown', ext: 'md', mode: 'markdown' },
            { id: 'python', name: 'Python', ext: 'py', mode: 'python' },
            { id: 'java', name: 'Java', ext: 'java', mode: 'java' },
            { id: 'c', name: 'C', ext: 'c', mode: 'c_cpp' },
            { id: 'cpp', name: 'C++', ext: 'cpp', mode: 'c_cpp' },
            { id: 'csharp', name: 'C#', ext: 'cs', mode: 'csharp' },
            { id: 'php', name: 'PHP', ext: 'php', mode: 'php' },
            { id: 'ruby', name: 'Ruby', ext: 'rb', mode: 'ruby' },
            { id: 'go', name: 'Go', ext: 'go', mode: 'golang' },
            { id: 'rust', name: 'Rust', ext: 'rs', mode: 'rust' },
            { id: 'swift', name: 'Swift', ext: 'swift', mode: 'swift' },
            { id: 'sql', name: 'SQL', ext: 'sql', mode: 'sql' },
            { id: 'bash', name: 'Bash', ext: 'sh', mode: 'sh' },
            { id: 'yaml', name: 'YAML', ext: 'yaml', mode: 'yaml' },
            { id: 'xml', name: 'XML', ext: 'xml', mode: 'xml' }
        ];
        
        // Formatter options
        this.formatterOptions = {
            indent_size: 2,
            indent_char: ' ',
            max_preserve_newlines: 2,
            preserve_newlines: true,
            keep_array_indentation: false,
            break_chained_methods: false,
            indent_scripts: 'normal',
            brace_style: 'collapse',
            space_before_conditional: true,
            unescape_strings: false,
            jslint_happy: false,
            end_with_newline: true,
            wrap_line_length: 80,
            indent_inner_html: false,
            comma_first: false,
            e4x: false,
            indent_empty_lines: false
        };
        
        // Prettier options
        this.prettierOptions = {
            printWidth: 80,
            tabWidth: 2,
            useTabs: false,
            semi: true,
            singleQuote: false,
            quoteProps: 'as-needed',
            jsxSingleQuote: false,
            trailingComma: 'es5',
            bracketSpacing: true,
            arrowParens: 'always',
            endOfLine: 'lf'
        };
        
        // Editor instance
        this.editor = null;
        this.currentLanguage = 'javascript';
    }

    /**
     * Initialize code formatter
     * @param {Object} options - Configuration options
     * @returns {Promise<CodeFormatter>} This instance
     */
    async init(options = {}) {
        // Apply options
        if (options.formatterOptions) {
            this.formatterOptions = { ...this.formatterOptions, ...options.formatterOptions };
        }
        
        if (options.prettierOptions) {
            this.prettierOptions = { ...this.prettierOptions, ...options.prettierOptions };
        }
        
        if (options.defaultLanguage) {
            const language = this.getLanguageById(options.defaultLanguage);
            if (language) {
                this.currentLanguage = language.id;
            }
        }
        
        // Load formatter libraries
        await this.loadDependencies();
        
        console.log('Code Formatter initialized');
        return this;
    }

    /**
     * Load required dependencies
     * @returns {Promise<void>}
     */
    async loadDependencies() {
        // Check if dependencies are already loaded
        if (window.prettier && window.prettierPlugins) {
            console.log('Prettier already loaded');
            return;
        }
        
        try {
            // We'll dynamically load scripts here in a real implementation
            // For this example, we'll just log it
            console.log('Dependencies would be loaded here in a real implementation');
            
            // In a real implementation, would load like:
            // await this.loadScript('https://cdn.jsdelivr.net/npm/prettier@2.8.8/standalone.js');
            // await this.loadScript('https://cdn.jsdelivr.net/npm/prettier@2.8.8/parser-babel.js');
            // etc.
        } catch (error) {
            console.error('Error loading dependencies:', error);
        }
    }

    /**
     * Load a script asynchronously
     * @param {string} src - Script URL
     * @returns {Promise<void>}
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = (e) => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });
    }

    /**
     * Get language by ID
     * @param {string} id - Language ID
     * @returns {Object|null} Language object or null if not found
     */
    getLanguageById(id) {
        return this.supportedLanguages.find(lang => lang.id === id) || null;
    }

    /**
     * Get language by file extension
     * @param {string} extension - File extension
     * @returns {Object|null} Language object or null if not found
     */
    getLanguageByExtension(extension) {
        const ext = extension.startsWith('.') ? extension.substring(1) : extension;
        return this.supportedLanguages.find(lang => lang.ext === ext) || null;
    }

    /**
     * Detect language from code snippet
     * @param {string} code - Code to analyze
     * @returns {string} Detected language ID
     */
    detectLanguage(code) {
        // Simple language detection based on code patterns
        if (!code || code.trim() === '') {
            return this.currentLanguage;
        }
        
        const cleanCode = code.trim();
        
        // HTML
        if (cleanCode.startsWith('<!DOCTYPE html>') || cleanCode.startsWith('<html') || 
            (cleanCode.startsWith('<') && cleanCode.includes('</') && (cleanCode.includes('</div>') || cleanCode.includes('</p>')))) {
            return 'html';
        }
        
        // XML
        if (cleanCode.startsWith('<?xml') || (cleanCode.startsWith('<') && cleanCode.includes('xmlns'))) {
            return 'xml';
        }
        
        // CSS
        if (cleanCode.includes('{') && cleanCode.includes('}') && 
            (cleanCode.includes('px') || cleanCode.includes('em') || cleanCode.includes('rgb'))) {
            return 'css';
        }
        
        // JavaScript/TypeScript
        if (cleanCode.includes('function') || cleanCode.includes('=>') || 
            cleanCode.includes('var ') || cleanCode.includes('let ') || cleanCode.includes('const ')) {
            // Check for TypeScript-specific syntax
            if (cleanCode.includes(': string') || cleanCode.includes(': number') || 
                cleanCode.includes(': boolean') || cleanCode.includes('interface ') || 
                cleanCode.includes('class ') && cleanCode.includes('private ')) {
                return 'typescript';
            }
            
            // Check for JSX syntax
            if (cleanCode.includes('import React') || cleanCode.includes('from "react"') || 
                (cleanCode.includes('<') && cleanCode.includes('/>') && cleanCode.includes('props'))) {
                return 'jsx';
            }
            
            return 'javascript';
        }
        
        // Python
        if (cleanCode.includes('def ') || cleanCode.includes('import ') && cleanCode.includes(':') && 
            !cleanCode.includes('{') && !cleanCode.includes(';')) {
            return 'python';
        }
        
        // Java
        if (cleanCode.includes('public class ') || cleanCode.includes('private ') || 
            cleanCode.includes('protected ') && cleanCode.includes(';') && cleanCode.includes('void ')) {
            return 'java';
        }
        
        // JSON
        if ((cleanCode.startsWith('{') && cleanCode.endsWith('}')) || 
            (cleanCode.startsWith('[') && cleanCode.endsWith(']'))) {
            try {
                JSON.parse(cleanCode);
                return 'json';
            } catch (e) {
                // Not valid JSON
            }
        }
        
        // Markdown
        if (cleanCode.includes('# ') || cleanCode.includes('## ') || 
            cleanCode.includes('![') || cleanCode.includes('[](')) {
            return 'markdown';
        }
        
        // SQL
        if ((cleanCode.toUpperCase().includes('SELECT ') && cleanCode.toUpperCase().includes(' FROM ')) || 
            cleanCode.toUpperCase().includes('CREATE TABLE ') || 
            cleanCode.toUpperCase().includes('INSERT INTO ')) {
            return 'sql';
        }
        
        // Default to current language if detection fails
        return this.currentLanguage;
    }

    /**
     * Format code according to specified language
     * @param {string} code - Code to format
     * @param {string} language - Language ID (optional, auto-detected if not provided)
     * @returns {string} Formatted code
     */
    formatCode(code, language = null) {
        if (!code) {
            return '';
        }
        
        // Auto-detect language if not provided
        const lang = language || this.detectLanguage(code);
        
        try {
            // If we have prettier loaded, use it
            if (window.prettier && window.prettierPlugins) {
                return this.formatWithPrettier(code, lang);
            }
            
            // Fallback to basic formatting
            return this.basicFormatting(code, lang);
        } catch (error) {
            console.error('Error formatting code:', error);
            return code; // Return original code on error
        }
    }

    /**
     * Format code using Prettier
     * @param {string} code - Code to format
     * @param {string} language - Language ID
     * @returns {string} Formatted code
     */
    formatWithPrettier(code, language) {
        // Get parser for language
        const parser = this.getPrettierParser(language);
        
        if (!parser) {
            console.warn(`No Prettier parser available for ${language}`);
            return this.basicFormatting(code, language);
        }
        
        try {
            // Format with prettier
            return prettier.format(code, {
                ...this.prettierOptions,
                parser,
                plugins: prettierPlugins
            });
        } catch (error) {
            console.error('Prettier formatting error:', error);
            return this.basicFormatting(code, language);
        }
    }

    /**
     * Get appropriate Prettier parser for language
     * @param {string} language - Language ID
     * @returns {string|null} Parser name
     */
    getPrettierParser(language) {
        // Map language to parser
        const parserMap = {
            'javascript': 'babel',
            'typescript': 'typescript',
            'jsx': 'babel',
            'tsx': 'typescript',
            'html': 'html',
            'css': 'css',
            'json': 'json',
            'markdown': 'markdown',
            'yaml': 'yaml',
            'graphql': 'graphql'
        };
        
        return parserMap[language] || null;
    }

    /**
     * Basic code formatting when Prettier is not available
     * @param {string} code - Code to format
     * @param {string} language - Language ID
     * @returns {string} Formatted code
     */
    basicFormatting(code, language) {
        switch (language) {
            case 'json':
                try {
                    const parsed = JSON.parse(code);
                    return JSON.stringify(parsed, null, this.formatterOptions.indent_size);
                } catch (e) {
                    return code;
                }
                
            case 'html':
            case 'xml':
                return this.formatHTML(code);
                
            case 'css':
                return this.formatCSS(code);
                
            case 'javascript':
            case 'typescript':
            case 'jsx':
            case 'tsx':
                return this.formatJS(code);
                
            default:
                // For other languages, just normalize indentation
                return this.normalizeIndentation(code);
        }
    }

    /**
     * Format HTML code
     * @param {string} code - HTML code
     * @returns {string} Formatted HTML
     */
    formatHTML(code) {
        // Very basic HTML formatting
        let result = '';
        let indent = 0;
        const lines = code.split(/\r?\n/);
        
        for (let line of lines) {
            const trimmed = line.trim();
            
            // Skip empty lines
            if (!trimmed) {
                result += '\n';
                continue;
            }
            
            // Decrease indent for closing tags
            if (trimmed.startsWith('</') || trimmed.match(/<\/\w+>$/)) {
                indent = Math.max(0, indent - 1);
            }
            
            // Add line with proper indentation
            result += ' '.repeat(indent * this.formatterOptions.indent_size) + trimmed + '\n';
            
            // Increase indent for opening tags, unless it's self-closing
            if (trimmed.startsWith('<') && !trimmed.startsWith('</') && 
                !trimmed.endsWith('/>') && !trimmed.endsWith('</') && 
                !trimmed.match(/<\w+>[^<]*<\/\w+>/)) {
                indent++;
            }
        }
        
        return result.trim();
    }

    /**
     * Format CSS code
     * @param {string} code - CSS code
     * @returns {string} Formatted CSS
     */
    formatCSS(code) {
        // Very basic CSS formatting
        let result = '';
        let inRule = false;
        let indent = 0;
        
        // Remove multiple spaces and normalize line breaks
        let normalized = code.replace(/\s+/g, ' ').replace(/\s*([{}:;])\s*/g, '$1');
        
        // Add newlines after special characters
        normalized = normalized.replace(/([{}]);?/g, '$1\n');
        
        // Process each line
        const lines = normalized.split('\n');
        for (let line of lines) {
            let trimmed = line.trim();
            
            if (!trimmed) continue;
            
            // Format each statement
            if (trimmed.includes('{')) {
                // Rule start
                result += ' '.repeat(indent * this.formatterOptions.indent_size) + trimmed.replace('{', ' {') + '\n';
                inRule = true;
                indent++;
            } else if (trimmed.includes('}')) {
                // Rule end
                indent = Math.max(0, indent - 1);
                result += ' '.repeat(indent * this.formatterOptions.indent_size) + trimmed + '\n';
                inRule = false;
            } else if (inRule) {
                // Properties inside rule
                const props = trimmed.split(';');
                for (let prop of props) {
                    if (!prop.trim()) continue;
                    
                    // Format property
                    const parts = prop.split(':');
                    if (parts.length >= 2) {
                        const propName = parts[0].trim();
                        const propValue = parts.slice(1).join(':').trim();
                        result += ' '.repeat((indent) * this.formatterOptions.indent_size) + 
                                 propName + ': ' + propValue + ';\n';
                    } else {
                        result += ' '.repeat((indent) * this.formatterOptions.indent_size) + prop + ';\n';
                    }
                }
            } else {
                // Top-level statements
                result += ' '.repeat(indent * this.formatterOptions.indent_size) + trimmed + '\n';
            }
        }
        
        return result.trim();
    }

    /**
     * Format JavaScript/TypeScript code
     * @param {string} code - JS/TS code
     * @returns {string} Formatted code
     */
    formatJS(code) {
        // Very basic JS formatting - just normalize indentation based on brackets
        return this.normalizeIndentation(code);
    }

    /**
     * Normalize indentation based on braces
     * @param {string} code - Code to format
     * @returns {string} Indented code
     */
    normalizeIndentation(code) {
        let result = '';
        let indent = 0;
        
        // Split into lines
        const lines = code.split(/\r?\n/);
        
        for (let line of lines) {
            const trimmed = line.trim();
            
            // Skip empty lines
            if (!trimmed) {
                result += '\n';
                continue;
            }
            
            // Check for closing braces at start of line
            if (trimmed.startsWith('}') || trimmed.startsWith(')') || trimmed.startsWith(']')) {
                indent = Math.max(0, indent - 1);
            }
            
            // Add line with proper indentation
            result += ' '.repeat(indent * this.formatterOptions.indent_size) + trimmed + '\n';
            
            // Count opening and closing braces
            const openBraces = (trimmed.match(/{/g) || []).length;
            const closeBraces = (trimmed.match(/}/g) || []).length;
            const openParens = (trimmed.match(/\(/g) || []).length;
            const closeParens = (trimmed.match(/\)/g) || []).length;
            const openBrackets = (trimmed.match(/\[/g) || []).length;
            const closeBrackets = (trimmed.match(/\]/g) || []).length;
            
            // Adjust indentation for next line
            const braceBalance = openBraces - closeBraces;
            const parensBalance = openParens - closeParens;
            const bracketsBalance = openBrackets - closeBrackets;
            
            // Only increase indent if braces are balanced and line ends with opening brace
            if (braceBalance > 0 || (trimmed.endsWith('{') && braceBalance === 0)) {
                indent++;
            }
            
            // For Python-like languages, increase indent for lines ending with colon
            if (this.currentLanguage === 'python' && trimmed.endsWith(':')) {
                indent++;
            }
        }
        
        return result.trim();
    }

    /**
     * Minify code
     * @param {string} code - Code to minify
     * @param {string} language - Language ID
     * @returns {string} Minified code
     */
    minifyCode(code, language = null) {
        if (!code) {
            return '';
        }
        
        // Auto-detect language if not provided
        const lang = language || this.detectLanguage(code);
        
        try {
            switch (lang) {
                case 'json':
                    try {
                        return JSON.stringify(JSON.parse(code));
                    } catch (e) {
                        return code;
                    }
                    
                case 'html':
                case 'xml':
                    // Basic HTML minification: remove comments and whitespace
                    return code
                        .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
                        .replace(/\s+/g, ' ') // Replace multiple whitespace with a single space
                        .replace(/>\s+</g, '><') // Remove whitespace between tags
                        .replace(/\s+>/g, '>') // Remove whitespace before closing bracket
                        .replace(/<\s+/g, '<') // Remove whitespace after opening bracket
                        .replace(/\s+\/>/g, '/>') // Remove whitespace before self-closing tag
                        .trim();
                    
                case 'css':
                    // Basic CSS minification
                    return code
                        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
                        .replace(/\s+/g, ' ') // Replace multiple whitespace with a single space
                        .replace(/\s*([{}:;,])\s*/g, '$1') // Remove whitespace around special chars
                        .replace(/;\}/g, '}') // Remove trailing semicolons
                        .trim();
                    
                case 'javascript':
                case 'typescript':
                case 'jsx':
                case 'tsx':
                    // Basic JS minification
                    return code
                        .replace(/\/\/.*$/gm, '') // Remove single-line comments
                        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
                        .replace(/\s+/g, ' ') // Replace multiple whitespace with a single space
                        .replace(/\s*([{}:;,=+\-*/<>])\s*/g, '$1') // Remove whitespace around operators
                        .replace(/;\}/g, '}') // Remove trailing semicolons
                        .trim();
                    
                default:
                    // For other languages, just remove comments and extra whitespace
                    return code
                        .replace(/\/\/.*$/gm, '')
                        .replace(/\/\*[\s\S]*?\*\//g, '')
                        .replace(/\s+/g, ' ')
                        .trim();
            }
        } catch (error) {
            console.error('Error minifying code:', error);
            return code; // Return original code on error
        }
    }

    /**
     * Create code editor UI
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
        uiContainer.className = 'code-formatter-container';
        container.appendChild(uiContainer);
        
        // Create header with controls
        const header = document.createElement('div');
        header.className = 'code-formatter-header';
        uiContainer.appendChild(header);
        
        // Language selector
        const languageSelect = document.createElement('select');
        languageSelect.className = 'code-formatter-language-select';
        
        // Add language options
        this.supportedLanguages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang.id;
            option.textContent = lang.name;
            if (lang.id === this.currentLanguage) {
                option.selected = true;
            }
            languageSelect.appendChild(option);
        });
        
        const languageLabel = document.createElement('label');
        languageLabel.textContent = 'Language:';
        languageLabel.appendChild(languageSelect);
        header.appendChild(languageLabel);
        
        // Theme selector
        const themeSelect = document.createElement('select');
        themeSelect.className = 'code-formatter-theme-select';
        themeSelect.innerHTML = `
            <option value="monokai">Monokai</option>
            <option value="github">GitHub</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="dracula">Dracula</option>
            <option value="solarized_dark">Solarized Dark</option>
            <option value="solarized_light">Solarized Light</option>
        `;
        
        const themeLabel = document.createElement('label');
        themeLabel.textContent = 'Theme:';
        themeLabel.appendChild(themeSelect);
        header.appendChild(themeLabel);
        
        // Action buttons
        const actions = document.createElement('div');
        actions.className = 'code-formatter-actions';
        header.appendChild(actions);
        
        const formatButton = document.createElement('button');
        formatButton.className = 'code-formatter-btn code-formatter-format-btn';
        formatButton.innerHTML = '<i class="ri-format-line"></i> Format';
        actions.appendChild(formatButton);
        
        const minifyButton = document.createElement('button');
        minifyButton.className = 'code-formatter-btn code-formatter-minify-btn';
        minifyButton.innerHTML = '<i class="ri-compress-line"></i> Minify';
        actions.appendChild(minifyButton);
        
        const copyButton = document.createElement('button');
        copyButton.className = 'code-formatter-btn code-formatter-copy-btn';
        copyButton.innerHTML = '<i class="ri-file-copy-line"></i> Copy';
        actions.appendChild(copyButton);
        
        const downloadButton = document.createElement('button');
        downloadButton.className = 'code-formatter-btn code-formatter-download-btn';
        downloadButton.innerHTML = '<i class="ri-download-line"></i> Download';
        actions.appendChild(downloadButton);
        
        // Create editor area
        const editorContainer = document.createElement('div');
        editorContainer.className = 'code-formatter-editor-container';
        uiContainer.appendChild(editorContainer);
        
        const editorTextarea = document.createElement('textarea');
        editorTextarea.className = 'code-formatter-editor';
        editorTextarea.spellcheck = false;
        editorTextarea.placeholder = 'Paste your code here...';
        editorContainer.appendChild(editorTextarea);
        
        // Initialize Ace editor if available
        if (window.ace) {
            const editorElement = document.createElement('div');
            editorElement.className = 'code-formatter-ace-editor';
            editorContainer.replaceChild(editorElement, editorTextarea);
            
            const editor = ace.edit(editorElement);
            editor.setTheme('ace/theme/monokai');
            editor.session.setMode(`ace/mode/${this.getLanguageById(this.currentLanguage).mode}`);
            editor.setShowPrintMargin(false);
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true,
                fontSize: '14px',
                tabSize: this.formatterOptions.indent_size
            });
            
            this.editor = editor;
            
            // Update mode when language changes
            languageSelect.addEventListener('change', (e) => {
                const language = this.getLanguageById(e.target.value);
                if (language) {
                    this.currentLanguage = language.id;
                    editor.session.setMode(`ace/mode/${language.mode}`);
                }
            });
            
            // Update theme when changed
            themeSelect.addEventListener('change', (e) => {
                editor.setTheme(`ace/theme/${e.target.value}`);
            });
            
            // Format button click
            formatButton.addEventListener('click', () => {
                const code = editor.getValue();
                const formatted = this.formatCode(code, this.currentLanguage);
                editor.setValue(formatted, -1); // -1 moves cursor to start
            });
            
            // Minify button click
            minifyButton.addEventListener('click', () => {
                const code = editor.getValue();
                const minified = this.minifyCode(code, this.currentLanguage);
                editor.setValue(minified, -1);
            });
            
            // Copy button click
            copyButton.addEventListener('click', () => {
                const code = editor.getValue();
                navigator.clipboard.writeText(code).then(() => {
                    const originalText = copyButton.innerHTML;
                    copyButton.innerHTML = '<i class="ri-check-line"></i> Copied!';
                    setTimeout(() => {
                        copyButton.innerHTML = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy code:', err);
                });
            });
            
            // Download button click
            downloadButton.addEventListener('click', () => {
                const code = editor.getValue();
                const language = this.getLanguageById(this.currentLanguage);
                const filename = `code.${language.ext}`;
                
                const blob = new Blob([code], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        } else {
            // Fallback to textarea if Ace editor is not available
            this.editor = {
                getValue: () => editorTextarea.value,
                setValue: (value) => { editorTextarea.value = value; }
            };
            
            // Format button click
            formatButton.addEventListener('click', () => {
                const code = editorTextarea.value;
                const formatted = this.formatCode(code, this.currentLanguage);
                editorTextarea.value = formatted;
            });
            
            // Minify button click
            minifyButton.addEventListener('click', () => {
                const code = editorTextarea.value;
                const minified = this.minifyCode(code, this.currentLanguage);
                editorTextarea.value = minified;
            });
            
            // Copy button click
            copyButton.addEventListener('click', () => {
                editorTextarea.select();
                document.execCommand('copy');
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="ri-check-line"></i> Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                }, 2000);
            });
            
            // Download button click
            downloadButton.addEventListener('click', () => {
                const code = editorTextarea.value;
                const language = this.getLanguageById(this.currentLanguage);
                const filename = `code.${language.ext}`;
                
                const blob = new Blob([code], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
            
            // Update language when selector changes
            languageSelect.addEventListener('change', (e) => {
                const language = this.getLanguageById(e.target.value);
                if (language) {
                    this.currentLanguage = language.id;
                }
            });
        }
        
        // Create detect language button
        const detectButton = document.createElement('button');
        detectButton.className = 'code-formatter-detect-btn';
        detectButton.innerHTML = '<i class="ri-magic-line"></i> Detect Language';
        header.appendChild(detectButton);
        
        // Detect language button click
        detectButton.addEventListener('click', () => {
            const code = this.editor.getValue();
            const detectedLang = this.detectLanguage(code);
            languageSelect.value = detectedLang;
            
            // Trigger change event for Ace editor
            if (window.ace && this.editor.session) {
                const language = this.getLanguageById(detectedLang);
                this.editor.session.setMode(`ace/mode/${language.mode}`);
            }
            
            this.currentLanguage = detectedLang;
        });
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles for the UI
     */
    addUIStyles() {
        const styleId = 'code-formatter-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .code-formatter-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .code-formatter-header {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .code-formatter-header label {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .code-formatter-language-select,
            .code-formatter-theme-select {
                padding: 0.5rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                min-width: 150px;
            }
            
            .code-formatter-language-select:focus,
            .code-formatter-theme-select:focus {
                outline: none;
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .code-formatter-actions {
                display: flex;
                gap: 0.5rem;
                margin-left: auto;
            }
            
            .code-formatter-btn {
                padding: 0.5rem 1rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s;
            }
            
            .code-formatter-btn:hover {
                background-color: var(--accent-primary, #7c3aed);
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .code-formatter-btn i {
                font-size: 1rem;
            }
            
            .code-formatter-format-btn {
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .code-formatter-detect-btn {
                padding: 0.5rem 1rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s;
            }
            
            .code-formatter-detect-btn:hover {
                background-color: var(--accent-secondary, #8b5cf6);
                border-color: var(--accent-secondary, #8b5cf6);
            }
            
            .code-formatter-editor-container {
                height: 400px;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                overflow: hidden;
            }
            
            .code-formatter-editor {
                width: 100%;
                height: 100%;
                resize: none;
                padding: 1rem;
                font-family: var(--font-mono, monospace);
                font-size: 14px;
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
                border: none;
                outline: none;
                line-height: 1.5;
                tab-size: 4;
            }
            
            .code-formatter-ace-editor {
                width: 100%;
                height: 100%;
            }
            
            @media (max-width: 768px) {
                .code-formatter-header {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .code-formatter-header > * {
                    width: 100%;
                }
                
                .code-formatter-actions {
                    margin-left: 0;
                    flex-wrap: wrap;
                }
                
                .code-formatter-btn {
                    flex: 1;
                }
                
                .code-formatter-detect-btn {
                    width: 100%;
                }
                
                .code-formatter-language-select,
                .code-formatter-theme-select {
                    width: 100%;
                }
                
                .code-formatter-editor-container {
                    height: 300px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CodeFormatter };
} else {
    // Add to global scope for browser usage
    window.CodeFormatter = CodeFormatter;
}
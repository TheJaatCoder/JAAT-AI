/**
 * JAAT-AI Syntax Highlighter Feature
 * Highlight code syntax with various themes and language support
 */

class SyntaxHighlighter {
    constructor() {
        this.supportedLanguages = [
            { id: 'javascript', name: 'JavaScript', extension: 'js' },
            { id: 'typescript', name: 'TypeScript', extension: 'ts' },
            { id: 'jsx', name: 'React JSX', extension: 'jsx' },
            { id: 'tsx', name: 'React TSX', extension: 'tsx' },
            { id: 'html', name: 'HTML', extension: 'html' },
            { id: 'css', name: 'CSS', extension: 'css' },
            { id: 'scss', name: 'SCSS', extension: 'scss' },
            { id: 'less', name: 'LESS', extension: 'less' },
            { id: 'json', name: 'JSON', extension: 'json' },
            { id: 'xml', name: 'XML', extension: 'xml' },
            { id: 'markdown', name: 'Markdown', extension: 'md' },
            { id: 'python', name: 'Python', extension: 'py' },
            { id: 'java', name: 'Java', extension: 'java' },
            { id: 'csharp', name: 'C#', extension: 'cs' },
            { id: 'c', name: 'C', extension: 'c' },
            { id: 'cpp', name: 'C++', extension: 'cpp' },
            { id: 'go', name: 'Go', extension: 'go' },
            { id: 'ruby', name: 'Ruby', extension: 'rb' },
            { id: 'php', name: 'PHP', extension: 'php' },
            { id: 'swift', name: 'Swift', extension: 'swift' },
            { id: 'kotlin', name: 'Kotlin', extension: 'kt' },
            { id: 'rust', name: 'Rust', extension: 'rs' },
            { id: 'dart', name: 'Dart', extension: 'dart' },
            { id: 'sql', name: 'SQL', extension: 'sql' },
            { id: 'bash', name: 'Bash', extension: 'sh' },
            { id: 'powershell', name: 'PowerShell', extension: 'ps1' },
            { id: 'yaml', name: 'YAML', extension: 'yaml' },
            { id: 'dockerfile', name: 'Dockerfile', extension: 'dockerfile' },
            { id: 'graphql', name: 'GraphQL', extension: 'gql' },
            { id: 'diff', name: 'Diff', extension: 'diff' }
        ];
        
        this.themes = [
            { id: 'monokai', name: 'Monokai', type: 'dark' },
            { id: 'github', name: 'GitHub', type: 'light' },
            { id: 'vs2015', name: 'Visual Studio', type: 'dark' },
            { id: 'xcode', name: 'Xcode', type: 'light' },
            { id: 'dracula', name: 'Dracula', type: 'dark' },
            { id: 'solarized-light', name: 'Solarized Light', type: 'light' },
            { id: 'solarized-dark', name: 'Solarized Dark', type: 'dark' },
            { id: 'tomorrow', name: 'Tomorrow', type: 'light' },
            { id: 'tomorrow-night', name: 'Tomorrow Night', type: 'dark' },
            { id: 'nord', name: 'Nord', type: 'dark' }
        ];
        
        this.currentTheme = 'monokai'; // Default theme
        this.plugins = new Set(); // Loaded language plugins
        this.options = {
            lineNumbers: true,
            highlightCurrentLine: true,
            highlightMatchingBrackets: true,
            fontSize: 14,
            tabSize: 2,
            wordWrap: false,
            copyButton: true,
            maxHeight: 500,
            autoDetectLanguage: true
        };
    }

    /**
     * Initialize syntax highlighter
     * @param {Object} options - Configuration options
     * @returns {Promise<SyntaxHighlighter>} This instance
     */
    async init(options = {}) {
        // Apply configuration options
        if (options.theme && this.themes.find(t => t.id === options.theme)) {
            this.currentTheme = options.theme;
        }
        
        if (options.options) {
            this.options = { ...this.options, ...options.options };
        }
        
        // Load dependencies if needed
        await this.loadDependencies();
        
        console.log('Syntax Highlighter initialized');
        return this;
    }

    /**
     * Load dependencies (Prism.js, Highlight.js, etc.)
     * @returns {Promise<void>}
     */
    async loadDependencies() {
        // Check if already loaded
        if (window.Prism || window.hljs) {
            return;
        }
        
        try {
            // In a real implementation, would load a syntax highlighting library
            // For example, using Prism.js
            console.log('Dependencies would be loaded here in a real implementation');
            
            // Example of loading Prism.js in a real implementation:
            // await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js');
            // await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/plugins/line-numbers/prism-line-numbers.min.js');
            // await this.loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-' + this.currentTheme + '.min.css');
            // await this.loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/plugins/line-numbers/prism-line-numbers.min.css');
        } catch (error) {
            console.error('Error loading syntax highlighting dependencies:', error);
        }
    }

    /**
     * Load a JavaScript file asynchronously
     * @param {string} src - Script URL
     * @returns {Promise<void>}
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });
    }

    /**
     * Load a CSS stylesheet asynchronously
     * @param {string} href - Stylesheet URL
     * @returns {Promise<void>}
     */
    loadStylesheet(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
            document.head.appendChild(link);
        });
    }

    /**
     * Load a specific language plugin
     * @param {string} language - Language ID to load
     * @returns {Promise<void>}
     */
    async loadLanguage(language) {
        // Skip if already loaded
        if (this.plugins.has(language)) {
            return;
        }
        
        // Skip if language not supported
        if (!this.supportedLanguages.find(lang => lang.id === language)) {
            console.warn(`Language '${language}' is not supported`);
            return;
        }
        
        try {
            // In a real implementation, would load language-specific plugin
            console.log(`Loading ${language} language plugin`);
            
            // Example of loading a Prism.js language in a real implementation:
            // await this.loadScript(`https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-${language}.min.js`);
            
            // Mark as loaded
            this.plugins.add(language);
        } catch (error) {
            console.error(`Error loading ${language} language plugin:`, error);
        }
    }

    /**
     * Set the theme for syntax highlighting
     * @param {string} themeId - Theme ID
     * @returns {Promise<boolean>} Whether the theme was set successfully
     */
    async setTheme(themeId) {
        if (!this.themes.find(t => t.id === themeId)) {
            console.warn(`Theme '${themeId}' is not supported`);
            return false;
        }
        
        try {
            // In a real implementation, would unload current theme and load new one
            console.log(`Setting theme to ${themeId}`);
            
            // Example:
            // const oldThemeLink = document.querySelector(`link[href*="prism-${this.currentTheme}"]`);
            // if (oldThemeLink) {
            //     document.head.removeChild(oldThemeLink);
            // }
            // await this.loadStylesheet(`https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-${themeId}.min.css`);
            
            this.currentTheme = themeId;
            return true;
        } catch (error) {
            console.error(`Error setting theme to ${themeId}:`, error);
            return false;
        }
    }

    /**
     * Detect language from code snippet or file extension
     * @param {string} code - Code snippet
     * @param {string} filename - Optional filename with extension
     * @returns {string} Detected language ID
     */
    detectLanguage(code, filename) {
        // Try to detect from filename first
        if (filename) {
            const extension = filename.split('.').pop().toLowerCase();
            const lang = this.supportedLanguages.find(l => l.extension === extension);
            if (lang) {
                return lang.id;
            }
        }
        
        // If no filename or extension not recognized, try to detect from content
        if (!code || code.trim() === '') {
            return 'plaintext';
        }
        
        const cleanCode = code.trim();
        
        // HTML detection
        if (cleanCode.startsWith('<!DOCTYPE html>') || cleanCode.startsWith('<html') || 
            (cleanCode.startsWith('<') && cleanCode.includes('</') && 
             (cleanCode.includes('</div>') || cleanCode.includes('</p>')))) {
            return 'html';
        }
        
        // XML detection
        if (cleanCode.startsWith('<?xml') || (cleanCode.startsWith('<') && cleanCode.includes('xmlns'))) {
            return 'xml';
        }
        
        // CSS detection
        if (cleanCode.includes('{') && cleanCode.includes('}') && 
            (cleanCode.includes('px') || cleanCode.includes('em') || cleanCode.includes('rgb'))) {
            
            // SCSS detection
            if (cleanCode.includes('@mixin') || cleanCode.includes('@include') || 
                cleanCode.includes('$') || cleanCode.includes('@extend')) {
                return 'scss';
            }
            
            return 'css';
        }
        
        // JavaScript/TypeScript
        if (cleanCode.includes('function') || cleanCode.includes('=>') || 
            cleanCode.includes('var ') || cleanCode.includes('let ') || cleanCode.includes('const ')) {
            
            // TypeScript detection
            if (cleanCode.includes(': string') || cleanCode.includes(': number') || 
                cleanCode.includes(': boolean') || cleanCode.includes('interface ') || 
                cleanCode.includes('class ') && cleanCode.includes('private ')) {
                
                // TSX detection
                if (cleanCode.includes('import React') || cleanCode.includes('from "react"') || 
                    (cleanCode.includes('<') && cleanCode.includes('/>') && cleanCode.includes('props'))) {
                    return 'tsx';
                }
                
                return 'typescript';
            }
            
            // JSX detection
            if (cleanCode.includes('import React') || cleanCode.includes('from "react"') || 
                (cleanCode.includes('<') && cleanCode.includes('/>') && cleanCode.includes('props'))) {
                return 'jsx';
            }
            
            return 'javascript';
        }
        
        // JSON detection
        if ((cleanCode.startsWith('{') && cleanCode.endsWith('}')) || 
            (cleanCode.startsWith('[') && cleanCode.endsWith(']'))) {
            try {
                JSON.parse(cleanCode);
                return 'json';
            } catch (e) {
                // Not valid JSON
            }
        }
        
        // Python detection
        if ((cleanCode.includes('def ') || cleanCode.includes('class ')) && 
            cleanCode.includes(':') && !cleanCode.includes('{') && !cleanCode.includes(';')) {
            return 'python';
        }
        
        // Java detection
        if (cleanCode.includes('public class ') || 
            (cleanCode.includes('import ') && cleanCode.includes(';') && 
             (cleanCode.includes('public ') || cleanCode.includes('private ')))) {
            return 'java';
        }
        
        // C# detection
        if ((cleanCode.includes('using System;') || cleanCode.includes('namespace ')) && 
            cleanCode.includes('class ') && cleanCode.includes(';')) {
            return 'csharp';
        }
        
        // Go detection
        if (cleanCode.includes('package ') && cleanCode.includes('func ') && 
            cleanCode.includes('import (') && !cleanCode.includes(';')) {
            return 'go';
        }
        
        // Ruby detection
        if (cleanCode.includes('def ') && cleanCode.includes('end') && 
            !cleanCode.includes(';') && !cleanCode.includes('{')) {
            return 'ruby';
        }
        
        // PHP detection
        if (cleanCode.includes('<?php') || 
            (cleanCode.includes('$') && cleanCode.includes('->') && cleanCode.includes(';'))) {
            return 'php';
        }
        
        // SQL detection
        if ((cleanCode.toUpperCase().includes('SELECT ') && cleanCode.toUpperCase().includes(' FROM ')) || 
            cleanCode.toUpperCase().includes('CREATE TABLE ') || 
            cleanCode.toUpperCase().includes('INSERT INTO ')) {
            return 'sql';
        }
        
        // Markdown detection
        if (cleanCode.includes('# ') || cleanCode.includes('## ') || 
            (cleanCode.includes('[') && cleanCode.includes('](')) || 
            cleanCode.includes('*') && cleanCode.includes('**')) {
            return 'markdown';
        }
        
        // YAML detection
        if (cleanCode.includes(':') && !cleanCode.includes('{') && !cleanCode.includes('function') && 
            !cleanCode.includes(';') && (cleanCode.includes('- ') || cleanCode.includes('  '))) {
            return 'yaml';
        }
        
        // Bash detection
        if (cleanCode.startsWith('#!/bin/bash') || cleanCode.startsWith('#!/bin/sh') || 
            (cleanCode.includes('if [') && cleanCode.includes('fi') && cleanCode.includes('then'))) {
            return 'bash';
        }
        
        // Default to plaintext if can't detect
        return 'plaintext';
    }

    /**
     * Highlight code with syntax highlighting
     * @param {string} code - Code to highlight
     * @param {string} language - Programming language (optional, auto-detected if not provided)
     * @param {Object} options - Additional options for this specific highlighting
     * @returns {Promise<string>} Highlighted HTML
     */
    async highlight(code, language, options = {}) {
        if (!code) {
            return '';
        }
        
        // Merge options
        const highlightOptions = { ...this.options, ...options };
        
        // Auto-detect language if not provided and auto-detection is enabled
        let lang = language;
        if ((!lang || lang === 'auto' || lang === 'plaintext') && highlightOptions.autoDetectLanguage) {
            lang = this.detectLanguage(code);
        }
        
        // Normalize language ID
        lang = lang || 'plaintext';
        
        // Ensure language plugin is loaded
        if (lang !== 'plaintext') {
            await this.loadLanguage(lang);
        }
        
        try {
            // If we had a real highlighting library, we'd use it here
            // Since we're in a simulated environment, we'll create basic HTML ourselves
            
            // Escape HTML
            let escapedCode = this.escapeHTML(code);
            
            // Apply basic highlighting (simplified for demonstration)
            const highlighted = this.applyBasicHighlighting(escapedCode, lang);
            
            // Add line numbers if enabled
            let html = '';
            if (highlightOptions.lineNumbers) {
                const lines = highlighted.split('\n');
                html = `<pre class="jaat-syntax-pre ${highlightOptions.lineNumbers ? 'line-numbers' : ''}" data-language="${lang}"><code class="language-${lang}">`;
                
                // Add line number wrapper and code
                html += '<div class="jaat-syntax-line-numbers">';
                for (let i = 1; i <= lines.length; i++) {
                    html += `<span class="jaat-syntax-line-number">${i}</span>`;
                }
                html += '</div>';
                
                html += '<div class="jaat-syntax-code">';
                for (let i = 0; i < lines.length; i++) {
                    html += `<div class="jaat-syntax-line">${lines[i] || ' '}</div>`;
                }
                html += '</div>';
                
                html += '</code></pre>';
            } else {
                html = `<pre class="jaat-syntax-pre" data-language="${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
            }
            
            // Add copy button if enabled
            if (highlightOptions.copyButton) {
                html = `<div class="jaat-syntax-container" style="max-height: ${highlightOptions.maxHeight}px;">
                    ${html}
                    <button class="jaat-syntax-copy-btn" title="Copy to clipboard">
                        <i class="ri-file-copy-line"></i>
                    </button>
                </div>`;
            } else {
                html = `<div class="jaat-syntax-container" style="max-height: ${highlightOptions.maxHeight}px;">${html}</div>`;
            }
            
            return html;
        } catch (error) {
            console.error('Error highlighting code:', error);
            
            // Fallback to basic <pre><code> without highlighting
            const escapedCode = this.escapeHTML(code);
            return `<pre class="jaat-syntax-pre" data-language="${lang}"><code class="language-${lang}">${escapedCode}</code></pre>`;
        }
    }

    /**
     * Apply basic syntax highlighting manually
     * This is a fallback when no library is available
     * @param {string} code - Escaped HTML code
     * @param {string} language - Language ID
     * @returns {string} Highlighted HTML
     */
    applyBasicHighlighting(code, language) {
        // This is a very simplified syntax highlighting implementation
        // In a real scenario, we would use a proper library like Prism.js or highlight.js
        
        // Apply theme colors based on token types
        const theme = this.getThemeColors();
        
        // Define simple patterns for common tokens
        const patterns = {
            // Keywords
            keywords: {
                // JavaScript/TypeScript keywords
                javascript: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|try|catch|finally|throw|class|extends|implements|import|export|from|as|async|await|this|super)\b/g,
                python: /\b(def|class|import|from|as|global|nonlocal|lambda|try|except|finally|raise|if|elif|else|for|while|with|in|is|not|and|or|return|yield|pass|break|continue)\b/g,
                java: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/g
            },
            
            // String literals
            strings: {
                doubleQuoted: /"(?:\\.|[^"\\])*"/g,
                singleQuoted: /'(?:\\.|[^'\\])*'/g,
                backticks: /`(?:\\.|[^`\\])*`/g
            },
            
            // Comments
            comments: {
                singleLine: /\/\/.*$/gm,
                multiLine: /\/\*[\s\S]*?\*\//g,
                hashComment: /#.*$/gm
            },
            
            // Numbers
            numbers: /\b-?\d+(\.\d+)?\b/g,
            
            // Function names
            functions: /\b([a-zA-Z_$][\w$]*)\s*\(/g,
            
            // Basic HTML tags
            htmlTags: /<\/?([a-zA-Z][\w:-]*)\s*(?:\s+[a-zA-Z_:.-][\w:.-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[\w-]+))?)*\s*\/?>/g
        };
        
        // Apply language-specific highlighting
        let highlighted = code;
        
        // Handle strings first (to avoid highlighting inside them)
        highlighted = highlighted
            .replace(patterns.strings.doubleQuoted, match => `<span style="color: ${theme.string};">${match}</span>`)
            .replace(patterns.strings.singleQuoted, match => `<span style="color: ${theme.string};">${match}</span>`)
            .replace(patterns.strings.backticks, match => `<span style="color: ${theme.string};">${match}</span>`);
        
        // Handle comments
        highlighted = highlighted
            .replace(patterns.comments.singleLine, match => `<span style="color: ${theme.comment};">${match}</span>`)
            .replace(patterns.comments.multiLine, match => `<span style="color: ${theme.comment};">${match}</span>`)
            .replace(patterns.comments.hashComment, match => `<span style="color: ${theme.comment};">${match}</span>`);
        
        // Apply language-specific keywords
        if (language in patterns.keywords) {
            highlighted = highlighted.replace(
                patterns.keywords[language],
                match => `<span style="color: ${theme.keyword};">${match}</span>`
            );
        }
        
        // Handle numbers
        highlighted = highlighted.replace(
            patterns.numbers,
            match => `<span style="color: ${theme.number};">${match}</span>`
        );
        
        // Handle function names
        highlighted = highlighted.replace(
            patterns.functions,
            (match, name) => `<span style="color: ${theme.function};">${name}</span>(`
        );
        
        // Handle HTML tags if language is HTML
        if (language === 'html' || language === 'xml') {
            highlighted = highlighted.replace(
                patterns.htmlTags,
                match => `<span style="color: ${theme.tag};">${match}</span>`
            );
        }
        
        return highlighted;
    }

    /**
     * Get theme colors for token types
     * @returns {Object} Theme colors
     */
    getThemeColors() {
        // Default to dark theme colors
        const themes = {
            monokai: {
                background: '#272822',
                text: '#f8f8f2',
                comment: '#75715e',
                keyword: '#f92672',
                string: '#e6db74',
                number: '#ae81ff',
                function: '#a6e22e',
                tag: '#f92672',
                attribute: '#a6e22e',
                operator: '#f8f8f2',
                lineNumber: '#8f908a'
            },
            github: {
                background: '#ffffff',
                text: '#333333',
                comment: '#969896',
                keyword: '#a71d5d',
                string: '#183691',
                number: '#0086b3',
                function: '#795da3',
                tag: '#63a35c',
                attribute: '#795da3',
                operator: '#a71d5d',
                lineNumber: '#cccccc'
            },
            'vs2015': {
                background: '#1e1e1e',
                text: '#d4d4d4',
                comment: '#6a9955',
                keyword: '#569cd6',
                string: '#ce9178',
                number: '#b5cea8',
                function: '#dcdcaa',
                tag: '#569cd6',
                attribute: '#9cdcfe',
                operator: '#d4d4d4',
                lineNumber: '#858585'
            },
            'tomorrow-night': {
                background: '#1d1f21',
                text: '#c5c8c6',
                comment: '#969896',
                keyword: '#b294bb',
                string: '#b5bd68',
                number: '#de935f',
                function: '#81a2be',
                tag: '#cc6666',
                attribute: '#b294bb',
                operator: '#8abeb7',
                lineNumber: '#969896'
            }
        };
        
        // Return selected theme or fallback to monokai
        return themes[this.currentTheme] || themes.monokai;
    }

    /**
     * Escape HTML special characters
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
     * Add highlighting to all code blocks in a container
     * @param {HTMLElement|string} container - Container element or selector
     * @param {Object} options - Highlighting options
     * @returns {Promise<void>}
     */
    async highlightAll(container, options = {}) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) {
            console.error('Container not found');
            return;
        }
        
        // Find all code blocks
        const codeBlocks = container.querySelectorAll('pre code');
        
        for (const codeBlock of codeBlocks) {
            const parent = codeBlock.parentElement;
            
            // Get language from class or data attribute
            let language = 'plaintext';
            
            // Check for language class (e.g., "language-javascript")
            const languageClass = Array.from(codeBlock.classList)
                .find(cls => cls.startsWith('language-'));
            
            if (languageClass) {
                language = languageClass.replace('language-', '');
            } else if (codeBlock.dataset.language) {
                // Check for data-language attribute
                language = codeBlock.dataset.language;
            } else if (parent && parent.dataset.language) {
                // Check parent for data-language attribute
                language = parent.dataset.language;
            }
            
            // Get code content
            const code = codeBlock.textContent;
            
            // Skip if block has already been highlighted
            if (parent.classList.contains('jaat-syntax-pre')) {
                continue;
            }
            
            // Highlight the code
            const highlighted = await this.highlight(code, language, options);
            
            // Replace the original element with highlighted version
            const wrapper = document.createElement('div');
            wrapper.innerHTML = highlighted;
            parent.replaceWith(wrapper.firstChild);
        }
        
        // Initialize copy buttons
        this.initCopyButtons(container);
    }

    /**
     * Initialize copy buttons functionality
     * @param {HTMLElement} container - Container element
     */
    initCopyButtons(container) {
        const copyButtons = container.querySelectorAll('.jaat-syntax-copy-btn');
        
        copyButtons.forEach(button => {
            // Skip if already initialized
            if (button.dataset.initialized) {
                return;
            }
            
            button.dataset.initialized = 'true';
            
            button.addEventListener('click', () => {
                const container = button.closest('.jaat-syntax-container');
                const codeElement = container.querySelector('code');
                
                if (codeElement) {
                    // Get original, unprocessed code
                    let code = '';
                    
                    // If it has line wrappers, collect from each line
                    const lines = codeElement.querySelectorAll('.jaat-syntax-line');
                    if (lines.length > 0) {
                        // Collect from formatted lines
                        code = Array.from(lines)
                            .map(line => {
                                // Remove syntax highlighting spans
                                const tempDiv = document.createElement('div');
                                tempDiv.innerHTML = line.innerHTML;
                                return this.stripHtml(tempDiv);
                            })
                            .join('\n');
                    } else {
                        // Get from simple code block
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = codeElement.innerHTML;
                        code = this.stripHtml(tempDiv);
                    }
                    
                    // Copy to clipboard
                    this.copyToClipboard(code, button);
                }
            });
        });
    }

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @param {HTMLElement} button - Button element for feedback
     */
    copyToClipboard(text, button) {
        // Use Clipboard API if available
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => this.showCopyFeedback(button, true))
                .catch(err => {
                    console.error('Failed to copy:', err);
                    this.showCopyFeedback(button, false);
                });
            return;
        }
        
        // Fallback for older browsers
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showCopyFeedback(button, true);
        } catch (err) {
            console.error('Failed to copy:', err);
            this.showCopyFeedback(button, false);
        }
    }

    /**
     * Show copy success/error feedback
     * @param {HTMLElement} button - Button element
     * @param {boolean} success - Whether copy was successful
     */
    showCopyFeedback(button, success) {
        const originalContent = button.innerHTML;
        
        if (success) {
            button.innerHTML = '<i class="ri-check-line"></i>';
            button.classList.add('jaat-syntax-copy-success');
        } else {
            button.innerHTML = '<i class="ri-close-line"></i>';
            button.classList.add('jaat-syntax-copy-error');
        }
        
        // Reset after a short delay
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.classList.remove('jaat-syntax-copy-success', 'jaat-syntax-copy-error');
        }, 2000);
    }

    /**
     * Strip HTML tags and decode entities
     * @param {HTMLElement} element - Element to get text from
     * @returns {string} Plain text content
     */
    stripHtml(element) {
        return element.textContent
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    }

    /**
     * Create syntax highlighter UI
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
        uiContainer.className = 'syntax-highlighter-container';
        container.appendChild(uiContainer);
        
        // Create header with controls
        const header = document.createElement('div');
        header.className = 'syntax-highlighter-header';
        uiContainer.appendChild(header);
        
        // Language selector
        const languageSelect = document.createElement('select');
        languageSelect.className = 'syntax-highlighter-language-select';
        languageSelect.innerHTML = '<option value="auto">Auto Detect</option>';
        
        // Add language options
        this.supportedLanguages.forEach(language => {
            const option = document.createElement('option');
            option.value = language.id;
            option.textContent = language.name;
            languageSelect.appendChild(option);
        });
        
        const languageLabel = document.createElement('label');
        languageLabel.className = 'syntax-highlighter-label';
        languageLabel.textContent = 'Language:';
        languageLabel.appendChild(languageSelect);
        header.appendChild(languageLabel);
        
        // Theme selector
        const themeSelect = document.createElement('select');
        themeSelect.className = 'syntax-highlighter-theme-select';
        
        // Group themes by type
        const lightThemes = this.themes.filter(t => t.type === 'light');
        const darkThemes = this.themes.filter(t => t.type === 'dark');
        
        const darkGroup = document.createElement('optgroup');
        darkGroup.label = 'Dark Themes';
        
        darkThemes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme.id;
            option.textContent = theme.name;
            if (theme.id === this.currentTheme) {
                option.selected = true;
            }
            darkGroup.appendChild(option);
        });
        
        themeSelect.appendChild(darkGroup);
        
        const lightGroup = document.createElement('optgroup');
        lightGroup.label = 'Light Themes';
        
        lightThemes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme.id;
            option.textContent = theme.name;
            if (theme.id === this.currentTheme) {
                option.selected = true;
            }
            lightGroup.appendChild(option);
        });
        
        themeSelect.appendChild(lightGroup);
        
        const themeLabel = document.createElement('label');
        themeLabel.className = 'syntax-highlighter-label';
        themeLabel.textContent = 'Theme:';
        themeLabel.appendChild(themeSelect);
        header.appendChild(themeLabel);
        
        // Font size selector
        const fontSizeSelect = document.createElement('select');
        fontSizeSelect.className = 'syntax-highlighter-fontsize-select';
        
        [12, 13, 14, 15, 16, 18, 20, 22, 24].forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = `${size}px`;
            if (size === this.options.fontSize) {
                option.selected = true;
            }
            fontSizeSelect.appendChild(option);
        });
        
        const fontSizeLabel = document.createElement('label');
        fontSizeLabel.className = 'syntax-highlighter-label';
        fontSizeLabel.textContent = 'Font Size:';
        fontSizeLabel.appendChild(fontSizeSelect);
        header.appendChild(fontSizeLabel);
        
        // Options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'syntax-highlighter-options';
        header.appendChild(optionsContainer);
        
        // Line numbers checkbox
        const lineNumbersOption = document.createElement('div');
        lineNumbersOption.className = 'syntax-highlighter-option';
        
        const lineNumbersCheckbox = document.createElement('input');
        lineNumbersCheckbox.type = 'checkbox';
        lineNumbersCheckbox.id = 'syntax-highlighter-line-numbers';
        lineNumbersCheckbox.checked = this.options.lineNumbers;
        
        const lineNumbersLabel = document.createElement('label');
        lineNumbersLabel.htmlFor = 'syntax-highlighter-line-numbers';
        lineNumbersLabel.textContent = 'Line Numbers';
        
        lineNumbersOption.appendChild(lineNumbersCheckbox);
        lineNumbersOption.appendChild(lineNumbersLabel);
        optionsContainer.appendChild(lineNumbersOption);
        
        // Word wrap checkbox
        const wordWrapOption = document.createElement('div');
        wordWrapOption.className = 'syntax-highlighter-option';
        
        const wordWrapCheckbox = document.createElement('input');
        wordWrapCheckbox.type = 'checkbox';
        wordWrapCheckbox.id = 'syntax-highlighter-word-wrap';
        wordWrapCheckbox.checked = this.options.wordWrap;
        
        const wordWrapLabel = document.createElement('label');
        wordWrapLabel.htmlFor = 'syntax-highlighter-word-wrap';
        wordWrapLabel.textContent = 'Word Wrap';
        
        wordWrapOption.appendChild(wordWrapCheckbox);
        wordWrapOption.appendChild(wordWrapLabel);
        optionsContainer.appendChild(wordWrapOption);
        
        // Create editor area
        const editorContainer = document.createElement('div');
        editorContainer.className = 'syntax-highlighter-editor-container';
        uiContainer.appendChild(editorContainer);
        
        const editorInput = document.createElement('textarea');
        editorInput.className = 'syntax-highlighter-input';
        editorInput.placeholder = 'Paste your code here...';
        editorContainer.appendChild(editorInput);
        
        // Create preview area
        const previewContainer = document.createElement('div');
        previewContainer.className = 'syntax-highlighter-preview-container';
        uiContainer.appendChild(previewContainer);
        
        const previewLabel = document.createElement('div');
        previewLabel.className = 'syntax-highlighter-preview-label';
        previewLabel.textContent = 'Preview';
        previewContainer.appendChild(previewLabel);
        
        const preview = document.createElement('div');
        preview.className = 'syntax-highlighter-preview';
        previewContainer.appendChild(preview);
        
        // Create action buttons
        const actions = document.createElement('div');
        actions.className = 'syntax-highlighter-actions';
        uiContainer.appendChild(actions);
        
        const highlightButton = document.createElement('button');
        highlightButton.className = 'syntax-highlighter-btn syntax-highlighter-highlight-btn';
        highlightButton.textContent = 'Highlight Code';
        actions.appendChild(highlightButton);
        
        const copyHtmlButton = document.createElement('button');
        copyHtmlButton.className = 'syntax-highlighter-btn syntax-highlighter-copy-html-btn';
        copyHtmlButton.textContent = 'Copy HTML';
        actions.appendChild(copyHtmlButton);
        
        const resetButton = document.createElement('button');
        resetButton.className = 'syntax-highlighter-btn syntax-highlighter-reset-btn';
        resetButton.textContent = 'Reset';
        actions.appendChild(resetButton);
        
        // Add event listeners
        
        // Theme change
        themeSelect.addEventListener('change', () => {
            this.setTheme(themeSelect.value).then(() => {
                // Re-highlight code with new theme if preview has content
                if (preview.querySelector('.jaat-syntax-container')) {
                    highlightButton.click();
                }
            });
        });
        
        // Font size change
        fontSizeSelect.addEventListener('change', () => {
            this.options.fontSize = parseInt(fontSizeSelect.value, 10);
            
            // Update preview if it has content
            if (preview.querySelector('.jaat-syntax-container')) {
                highlightButton.click();
            }
        });
        
        // Line numbers change
        lineNumbersCheckbox.addEventListener('change', () => {
            this.options.lineNumbers = lineNumbersCheckbox.checked;
            
            // Update preview if it has content
            if (preview.querySelector('.jaat-syntax-container')) {
                highlightButton.click();
            }
        });
        
        // Word wrap change
        wordWrapCheckbox.addEventListener('change', () => {
            this.options.wordWrap = wordWrapCheckbox.checked;
            
            // Update preview styles
            const containers = preview.querySelectorAll('.jaat-syntax-container');
            containers.forEach(container => {
                const codeBlock = container.querySelector('code');
                if (codeBlock) {
                    if (this.options.wordWrap) {
                        codeBlock.style.whiteSpace = 'pre-wrap';
                        codeBlock.style.wordBreak = 'break-word';
                    } else {
                        codeBlock.style.whiteSpace = 'pre';
                        codeBlock.style.wordBreak = 'normal';
                    }
                }
            });
        });
        
        // Highlight button click
        highlightButton.addEventListener('click', async () => {
            const code = editorInput.value;
            if (!code.trim()) {
                return;
            }
            
            const language = languageSelect.value;
            
            // Highlight code
            const highlighted = await this.highlight(code, language, {
                lineNumbers: this.options.lineNumbers,
                wordWrap: this.options.wordWrap,
                fontSize: this.options.fontSize
            });
            
            // Update preview
            preview.innerHTML = highlighted;
            
            // Initialize copy button for the preview
            this.initCopyButtons(preview);
            
            // Apply fontSize from options
            const codeElements = preview.querySelectorAll('code');
            codeElements.forEach(codeElement => {
                codeElement.style.fontSize = `${this.options.fontSize}px`;
                
                // Apply word wrap if enabled
                if (this.options.wordWrap) {
                    codeElement.style.whiteSpace = 'pre-wrap';
                    codeElement.style.wordBreak = 'break-word';
                }
            });
        });
        
        // Copy HTML button click
        copyHtmlButton.addEventListener('click', () => {
            const html = preview.innerHTML;
            if (!html || !preview.querySelector('.jaat-syntax-container')) {
                return;
            }
            
            // Copy HTML to clipboard
            this.copyToClipboard(html, copyHtmlButton);
        });
        
        // Reset button click
        resetButton.addEventListener('click', () => {
            // Clear input and preview
            editorInput.value = '';
            preview.innerHTML = '';
            
            // Reset to defaults
            languageSelect.value = 'auto';
            themeSelect.value = 'monokai';
            this.setTheme('monokai');
            fontSizeSelect.value = '14';
            this.options.fontSize = 14;
            lineNumbersCheckbox.checked = true;
            this.options.lineNumbers = true;
            wordWrapCheckbox.checked = false;
            this.options.wordWrap = false;
        });
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles for the syntax highlighter
     */
    addUIStyles() {
        const styleId = 'syntax-highlighter-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        const theme = this.getThemeColors();
        
        style.textContent = `
            .syntax-highlighter-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .syntax-highlighter-header {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .syntax-highlighter-label {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .syntax-highlighter-language-select,
            .syntax-highlighter-theme-select,
            .syntax-highlighter-fontsize-select {
                padding: 0.5rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                min-width: 150px;
            }
            
            .syntax-highlighter-language-select:focus,
            .syntax-highlighter-theme-select:focus,
            .syntax-highlighter-fontsize-select:focus {
                outline: none;
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .syntax-highlighter-options {
                display: flex;
                gap: 1rem;
                margin-left: auto;
            }
            
            .syntax-highlighter-option {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.875rem;
            }
            
            .syntax-highlighter-option input[type="checkbox"] {
                margin: 0;
            }
            
            .syntax-highlighter-editor-container {
                margin-bottom: 1rem;
            }
            
            .syntax-highlighter-input {
                width: 100%;
                height: 200px;
                resize: vertical;
                padding: 1rem;
                font-family: var(--font-mono, monospace);
                font-size: 14px;
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                line-height: 1.5;
                tab-size: 4;
            }
            
            .syntax-highlighter-input:focus {
                outline: none;
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .syntax-highlighter-preview-container {
                margin-bottom: 1rem;
            }
            
            .syntax-highlighter-preview-label {
                font-size: 0.875rem;
                font-weight: 500;
                margin-bottom: 0.5rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .syntax-highlighter-preview {
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                overflow: hidden;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .syntax-highlighter-actions {
                display: flex;
                justify-content: flex-end;
                gap: 0.75rem;
            }
            
            .syntax-highlighter-btn {
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
            
            .syntax-highlighter-btn:hover {
                background-color: var(--bg-secondary, #161b22);
            }
            
            .syntax-highlighter-highlight-btn {
                background-color: var(--accent-primary, #7c3aed);
                border-color: var(--accent-primary, #7c3aed);
                color: white;
            }
            
            .syntax-highlighter-highlight-btn:hover {
                background-color: var(--accent-hover, #6d28d9);
                border-color: var(--accent-hover, #6d28d9);
            }
            
            /* Syntax highlighting styles */
            .jaat-syntax-container {
                position: relative;
                max-width: 100%;
                max-height: ${this.options.maxHeight}px;
                overflow: auto;
                background-color: ${theme.background};
                border-radius: var(--radius-sm, 0.375rem);
            }
            
            .jaat-syntax-pre {
                margin: 0;
                padding: 1rem;
                background-color: ${theme.background};
                color: ${theme.text};
                overflow: auto;
                font-family: var(--font-mono, 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace);
                font-size: ${this.options.fontSize}px;
                line-height: 1.5;
                tab-size: ${this.options.tabSize};
            }
            
            .jaat-syntax-pre code {
                font-family: inherit;
                background: none;
                white-space: pre;
            }
            
            .jaat-syntax-pre.line-numbers {
                padding-left: 3.5rem;
            }
            
            .jaat-syntax-line-numbers {
                position: absolute;
                top: 1rem;
                left: 0;
                width: 3rem;
                text-align: right;
                padding-right: 0.5rem;
                color: ${theme.lineNumber};
                font-size: ${this.options.fontSize}px;
                line-height: 1.5;
                user-select: none;
            }
            
            .jaat-syntax-line-number {
                display: block;
            }
            
            .jaat-syntax-code {
                counter-reset: line;
            }
            
            .jaat-syntax-line {
                line-height: 1.5;
                min-height: 1em;
            }
            
            .jaat-syntax-copy-btn {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background-color: rgba(0, 0, 0, 0.3);
                color: #fff;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s;
            }
            
            .jaat-syntax-container:hover .jaat-syntax-copy-btn {
                opacity: 1;
            }
            
            .jaat-syntax-copy-btn:hover {
                background-color: rgba(0, 0, 0, 0.5);
            }
            
            .jaat-syntax-copy-success {
                background-color: rgba(16, 185, 129, 0.6) !important;
            }
            
            .jaat-syntax-copy-error {
                background-color: rgba(239, 68, 68, 0.6) !important;
            }
            
            @media (max-width: 768px) {
                .syntax-highlighter-header {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .syntax-highlighter-options {
                    margin-left: 0;
                    width: 100%;
                    justify-content: space-between;
                }
                
                .syntax-highlighter-label {
                    width: 100%;
                }
                
                .syntax-highlighter-language-select,
                .syntax-highlighter-theme-select,
                .syntax-highlighter-fontsize-select {
                    width: 100%;
                }
                
                .syntax-highlighter-actions {
                    flex-direction: column;
                }
                
                .syntax-highlighter-btn {
                    width: 100%;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SyntaxHighlighter };
} else {
    // Add to global scope for browser usage
    window.SyntaxHighlighter = SyntaxHighlighter;
}
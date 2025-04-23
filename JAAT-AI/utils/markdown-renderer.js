/**
 * JAAT-AI Markdown Renderer
 * Converts markdown text to formatted HTML with syntax highlighting
 */

class MarkdownRenderer {
    constructor() {
        this.initialized = false;
        this.markedLoaded = false;
        this.highlightLoaded = false;
        this.katexLoaded = false;
        this.options = {
            syntaxHighlighting: true,
            mathSupport: true,
            sanitize: true,
            linkTarget: '_blank',
            breaks: true
        };
    }

    /**
     * Initialize the markdown renderer
     * @param {Object} options - Configuration options
     * @returns {Promise<MarkdownRenderer>} This instance
     */
    async init(options = {}) {
        if (this.initialized) return this;
        
        this.options = { ...this.options, ...options };
        
        try {
            // Load the required libraries if they don't exist
            await this.loadDependencies();
            this.configureMarked();
            
            this.initialized = true;
            console.log('Markdown renderer initialized');
            return this;
        } catch (error) {
            console.error('Failed to initialize markdown renderer:', error);
            throw error;
        }
    }

    /**
     * Load required external libraries
     * @returns {Promise<void>}
     */
    async loadDependencies() {
        const loadScript = (url) => {
            return new Promise((resolve, reject) => {
                // Skip if already loaded
                if (document.querySelector(`script[src="${url}"]`)) {
                    resolve();
                    return;
                }
                
                const script = document.createElement('script');
                script.src = url;
                script.async = true;
                script.onload = resolve;
                script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
                document.head.appendChild(script);
            });
        };
        
        const loadCSS = (url) => {
            return new Promise((resolve, reject) => {
                // Skip if already loaded
                if (document.querySelector(`link[href="${url}"]`)) {
                    resolve();
                    return;
                }
                
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = url;
                link.onload = resolve;
                link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
                document.head.appendChild(link);
            });
        };
        
        // Load marked.js for markdown parsing
        if (!window.marked) {
            await loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js');
            this.markedLoaded = true;
        }
        
        // Load highlight.js for syntax highlighting
        if (this.options.syntaxHighlighting && !window.hljs) {
            await Promise.all([
                loadScript('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js'),
                loadCSS('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/github-dark.min.css')
            ]);
            this.highlightLoaded = true;
        }
        
        // Load KaTeX for math rendering
        if (this.options.mathSupport && !window.katex) {
            await Promise.all([
                loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js'),
                loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js'),
                loadCSS('https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css')
            ]);
            this.katexLoaded = true;
        }
    }

    /**
     * Configure marked.js options
     */
    configureMarked() {
        if (!window.marked) {
            console.error('Marked.js is not loaded');
            return;
        }
        
        // Set default options
        marked.setOptions({
            gfm: true,
            breaks: this.options.breaks,
            sanitize: false, // We'll use DOMPurify instead
            smartLists: true,
            smartypants: true,
            xhtml: false
        });
        
        // Configure code highlighting
        if (this.options.syntaxHighlighting && window.hljs) {
            marked.setOptions({
                highlight: function(code, language) {
                    if (language && hljs.getLanguage(language)) {
                        try {
                            return hljs.highlight(code, { language }).value;
                        } catch (err) {
                            console.error('Highlight error:', err);
                        }
                    }
                    return hljs.highlightAuto(code).value;
                }
            });
        }
        
        // Custom renderer for links and other elements
        const renderer = new marked.Renderer();
        
        // Set link target
        renderer.link = (href, title, text) => {
            const link = marked.Renderer.prototype.link.call(renderer, href, title, text);
            return link.replace(/^<a /, `<a target="${this.options.linkTarget}" rel="noopener noreferrer" `);
        };
        
        // Set image renderer to add loading="lazy" and class
        renderer.image = (href, title, text) => {
            const img = marked.Renderer.prototype.image.call(renderer, href, title, text);
            return img.replace(/^<img /, '<img loading="lazy" class="markdown-image" ');
        };
        
        marked.setOptions({ renderer });
    }

    /**
     * Render markdown to HTML
     * @param {string} markdown - The markdown text to render
     * @returns {string} The rendered HTML
     */
    render(markdown) {
        if (!this.initialized || !window.marked) {
            console.error('Markdown renderer not initialized');
            return this.escapeHtml(markdown);
        }
        
        try {
            // Parse markdown
            let html = marked.parse(markdown);
            
            // Sanitize HTML if option enabled
            if (this.options.sanitize && window.DOMPurify) {
                html = DOMPurify.sanitize(html);
            }
            
            // Render math if option enabled
            if (this.options.mathSupport && window.renderMathInElement) {
                // We need to create a temporary element to render math
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                renderMathInElement(tempDiv, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\(', right: '\\)', display: false},
                        {left: '\\[', right: '\\]', display: true}
                    ],
                    throwOnError: false
                });
                
                html = tempDiv.innerHTML;
            }
            
            return html;
        } catch (error) {
            console.error('Error rendering markdown:', error);
            return this.escapeHtml(markdown);
        }
    }

    /**
     * Render math expressions specifically
     * @param {string} expression - The math expression to render
     * @param {boolean} displayMode - Whether to use display mode
     * @returns {string} The rendered HTML
     */
    renderMath(expression, displayMode = false) {
        if (!this.initialized || !window.katex) {
            console.warn('KaTeX not loaded, returning raw expression');
            return this.escapeHtml(expression);
        }
        
        try {
            return katex.renderToString(expression, {
                displayMode: displayMode,
                throwOnError: false
            });
        } catch (error) {
            console.error('Error rendering math:', error);
            return this.escapeHtml(expression);
        }
    }

    /**
     * Render a code block with syntax highlighting
     * @param {string} code - The code to render
     * @param {string} language - The programming language
     * @returns {string} The rendered HTML
     */
    renderCode(code, language = '') {
        if (!this.initialized || !window.hljs) {
            return `<pre><code>${this.escapeHtml(code)}</code></pre>`;
        }
        
        try {
            const highlighted = language && hljs.getLanguage(language)
                ? hljs.highlight(code, { language }).value
                : hljs.highlightAuto(code).value;
                
            return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
        } catch (error) {
            console.error('Error highlighting code:', error);
            return `<pre><code>${this.escapeHtml(code)}</code></pre>`;
        }
    }

    /**
     * Escape HTML special characters
     * @param {string} text - The text to escape
     * @returns {string} The escaped text
     */
    escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}

// Export the module
if (typeof module !== 'undefined') {
    module.exports = MarkdownRenderer;
}

// Create instance if running in browser
if (typeof window !== 'undefined') {
    window.markdownRenderer = new MarkdownRenderer();
}
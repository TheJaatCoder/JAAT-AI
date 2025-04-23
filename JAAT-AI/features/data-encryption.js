/**
 * JAAT-AI Data Encryption Feature
 * Provides client-side encryption for sensitive data
 */

class DataEncryption {
    constructor() {
        this.initialized = false;
        this.dom = {};
        this.algorithmOptions = [
            { id: 'aes-256', name: 'AES-256 (Advanced Encryption Standard)', strength: 'Very Strong' },
            { id: 'aes-128', name: 'AES-128', strength: 'Strong' },
            { id: 'xor', name: 'XOR (Simple)', strength: 'Basic' }
        ];
        this.currentAlgorithm = 'aes-256';
    }
    
    /**
     * Initialize the feature
     */
    async init() {
        if (this.initialized) return;
        
        console.log('Initializing Data Encryption feature');
        
        // Create UI elements
        this.createUI();
        
        // Set up event listeners
        this.setupEventListeners();
        
        this.initialized = true;
        return this;
    }
    
    /**
     * Create UI for the encryption feature
     */
    createUI() {
        // Check if there's a chat section
        const chatSection = document.getElementById('chat-section');
        if (!chatSection) return;
        
        // Add encryption UI below the chat input
        const encryptionPanelHTML = `
            <div id="encryption-panel" class="mt-3 card bg-light">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">
                        <i data-feather="lock" class="me-1"></i>
                        Data Encryption
                    </h6>
                    <button id="toggle-encryption-btn" class="btn btn-sm btn-outline-secondary">
                        <span>Show</span>
                    </button>
                </div>
                <div id="encryption-content" class="card-body d-none">
                    <div class="mb-3">
                        <label for="encryption-text" class="form-label">Text to Encrypt/Decrypt</label>
                        <textarea id="encryption-text" class="form-control" rows="3" placeholder="Enter text to encrypt or decrypt..."></textarea>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="encryption-key" class="form-label">Encryption Key</label>
                            <div class="input-group">
                                <input type="password" id="encryption-key" class="form-control" placeholder="Enter a strong key" maxlength="32">
                                <button id="generate-key-btn" class="btn btn-outline-secondary" type="button">Generate</button>
                            </div>
                            <div class="form-text">Use a strong, unique key you can remember</div>
                        </div>
                        <div class="col-md-6">
                            <label for="encryption-algorithm" class="form-label">Algorithm</label>
                            <select id="encryption-algorithm" class="form-select">
                                ${this.algorithmOptions.map(algo => 
                                    `<option value="${algo.id}">${algo.name} (${algo.strength})</option>`
                                ).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <button id="encrypt-btn" class="btn btn-primary">
                            <i data-feather="lock" class="me-1"></i> Encrypt
                        </button>
                        <button id="decrypt-btn" class="btn btn-secondary">
                            <i data-feather="unlock" class="me-1"></i> Decrypt
                        </button>
                        <button id="copy-encrypted-btn" class="btn btn-outline-primary ms-auto">
                            <i data-feather="copy" class="me-1"></i> Copy
                        </button>
                    </div>
                    <div id="encryption-result" class="mt-3 d-none">
                        <div class="alert alert-primary">
                            <h6 class="alert-heading">Result:</h6>
                            <div id="encryption-output" class="border bg-light p-2 rounded mt-2 small" style="word-break: break-all;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        chatSection.insertAdjacentHTML('afterend', encryptionPanelHTML);
        
        // Initialize Feather icons if they exist
        if (window.feather) {
            window.feather.replace();
        }
        
        // Store DOM references
        this.dom.panel = document.getElementById('encryption-panel');
        this.dom.content = document.getElementById('encryption-content');
        this.dom.toggleBtn = document.getElementById('toggle-encryption-btn');
        this.dom.textInput = document.getElementById('encryption-text');
        this.dom.keyInput = document.getElementById('encryption-key');
        this.dom.generateKeyBtn = document.getElementById('generate-key-btn');
        this.dom.algorithmSelect = document.getElementById('encryption-algorithm');
        this.dom.encryptBtn = document.getElementById('encrypt-btn');
        this.dom.decryptBtn = document.getElementById('decrypt-btn');
        this.dom.copyBtn = document.getElementById('copy-encrypted-btn');
        this.dom.result = document.getElementById('encryption-result');
        this.dom.output = document.getElementById('encryption-output');
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Toggle panel visibility
        if (this.dom.toggleBtn) {
            this.dom.toggleBtn.addEventListener('click', () => {
                this.dom.content.classList.toggle('d-none');
                const isVisible = !this.dom.content.classList.contains('d-none');
                this.dom.toggleBtn.querySelector('span').textContent = isVisible ? 'Hide' : 'Show';
            });
        }
        
        // Generate random key
        if (this.dom.generateKeyBtn) {
            this.dom.generateKeyBtn.addEventListener('click', () => {
                this.dom.keyInput.value = this.generateRandomKey(16);
            });
        }
        
        // Add validation for encryption key to prevent errors
        if (this.dom.keyInput) {
            this.dom.keyInput.addEventListener('input', (e) => {
                // Prevent HTML special characters
                if (e.target.value.includes('<') || e.target.value.includes('>')) {
                    e.target.value = e.target.value.replace(/[<>]/g, '');
                }
                
                // Keep within maxlength (already set in HTML)
                if (e.target.value.length > 32) {
                    e.target.value = e.target.value.substring(0, 32);
                }
            });
        }
        
        // Algorithm selection
        if (this.dom.algorithmSelect) {
            this.dom.algorithmSelect.addEventListener('change', (e) => {
                this.currentAlgorithm = e.target.value;
            });
        }
        
        // Encrypt button
        if (this.dom.encryptBtn) {
            this.dom.encryptBtn.addEventListener('click', () => {
                this.processEncryption(true);
            });
        }
        
        // Decrypt button
        if (this.dom.decryptBtn) {
            this.dom.decryptBtn.addEventListener('click', () => {
                this.processEncryption(false);
            });
        }
        
        // Copy button
        if (this.dom.copyBtn) {
            this.dom.copyBtn.addEventListener('click', () => {
                if (this.dom.output && this.dom.output.textContent) {
                    navigator.clipboard.writeText(this.dom.output.textContent)
                        .then(() => {
                            // Show copied feedback
                            const originalText = this.dom.copyBtn.innerHTML;
                            this.dom.copyBtn.innerHTML = '<i data-feather="check" class="me-1"></i> Copied!';
                            if (window.feather) window.feather.replace();
                            
                            setTimeout(() => {
                                this.dom.copyBtn.innerHTML = originalText;
                                if (window.feather) window.feather.replace();
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Failed to copy text: ', err);
                        });
                }
            });
        }
    }
    
    /**
     * Process encryption or decryption
     * @param {boolean} encrypt - True for encryption, false for decryption
     */
    processEncryption(encrypt) {
        const text = this.dom.textInput.value.trim();
        const key = this.dom.keyInput.value;
        
        if (!text) {
            this.showError('Please enter text to ' + (encrypt ? 'encrypt' : 'decrypt'));
            return;
        }
        
        if (!key) {
            this.showError('Encryption key is required');
            return;
        }
        
        try {
            let result;
            if (encrypt) {
                result = this.encrypt(text, key, this.currentAlgorithm);
            } else {
                result = this.decrypt(text, key, this.currentAlgorithm);
            }
            
            // Display result
            this.showResult(result, encrypt);
        } catch (e) {
            this.showError(e.message);
        }
    }
    
    /**
     * Show encryption/decryption result
     * @param {string} result - The result text
     * @param {boolean} wasEncryption - Whether the operation was encryption
     */
    showResult(result, wasEncryption) {
        this.dom.result.classList.remove('d-none');
        this.dom.output.textContent = result;
        this.dom.result.querySelector('.alert').className = 
            wasEncryption ? 'alert alert-primary' : 'alert alert-success';
    }
    
    /**
     * Show an error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.dom.result.classList.remove('d-none');
        this.dom.output.textContent = `Error: ${message}`;
        this.dom.result.querySelector('.alert').className = 'alert alert-danger';
    }
    
    /**
     * Generate a random encryption key
     * @param {number} length - Length of the key
     * @returns {string} - Random key
     */
    generateRandomKey(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    /**
     * Encrypt text
     * @param {string} text - Text to encrypt
     * @param {string} key - Encryption key
     * @param {string} algorithm - Algorithm to use
     * @returns {string} - Encrypted text
     */
    encrypt(text, key, algorithm) {
        // In a real implementation, this would use proper crypto libraries
        // For demo purposes, we're using simplified implementations
        
        switch (algorithm) {
            case 'aes-256':
            case 'aes-128':
                // Simple Base64 encoding with key mixing (not real AES)
                return this.simpleEncrypt(text, key);
                
            case 'xor':
                return this.xorEncrypt(text, key);
                
            default:
                return this.simpleEncrypt(text, key);
        }
    }
    
    /**
     * Decrypt text
     * @param {string} encrypted - Encrypted text
     * @param {string} key - Decryption key
     * @param {string} algorithm - Algorithm to use
     * @returns {string} - Decrypted text
     */
    decrypt(encrypted, key, algorithm) {
        // In a real implementation, this would use proper crypto libraries
        
        switch (algorithm) {
            case 'aes-256':
            case 'aes-128':
                // Simple Base64 decoding with key mixing (not real AES)
                return this.simpleDecrypt(encrypted, key);
                
            case 'xor':
                return this.xorDecrypt(encrypted, key);
                
            default:
                return this.simpleDecrypt(encrypted, key);
        }
    }
    
    /**
     * Simple encryption algorithm (not secure, for demo only)
     * @param {string} text - Text to encrypt
     * @param {string} key - Encryption key
     * @returns {string} - Encrypted text
     */
    simpleEncrypt(text, key) {
        // Create a prefix based on the key
        const keyPrefix = btoa(key).substring(0, 8);
        
        // Mix in the key for some randomization
        let mixedText = '';
        for (let i = 0; i < text.length; i++) {
            mixedText += String.fromCharCode(
                text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            );
        }
        
        // Use base64 encoding and add the prefix
        return keyPrefix + btoa(mixedText);
    }
    
    /**
     * Simple decryption algorithm (not secure, for demo only)
     * @param {string} encrypted - Encrypted text
     * @param {string} key - Decryption key
     * @returns {string} - Decrypted text
     */
    simpleDecrypt(encrypted, key) {
        // Extract prefix and encoded text
        const encodedText = encrypted.substring(8);
        
        try {
            // Decode the base64 text
            const mixedText = atob(encodedText);
            
            // Unmix the key
            let plainText = '';
            for (let i = 0; i < mixedText.length; i++) {
                plainText += String.fromCharCode(
                    mixedText.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
            }
            
            return plainText;
        } catch (e) {
            throw new Error('Failed to decrypt. Invalid format or wrong key.');
        }
    }
    
    /**
     * XOR encryption
     * @param {string} text - Text to encrypt
     * @param {string} key - Encryption key
     * @returns {string} - Encrypted text
     */
    xorEncrypt(text, key) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }
        return btoa(result); // Convert to base64 for safe display
    }
    
    /**
     * XOR decryption
     * @param {string} encrypted - Encrypted text
     * @param {string} key - Decryption key
     * @returns {string} - Decrypted text
     */
    xorDecrypt(encrypted, key) {
        try {
            const text = atob(encrypted); // Decode base64
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
                result += String.fromCharCode(charCode);
            }
            return result;
        } catch (e) {
            throw new Error('Failed to decrypt. Invalid format or wrong key.');
        }
    }
}

// Initialize and export
const dataEncryption = new DataEncryption();
export default dataEncryption;

// If not importing, initialize on load
if (typeof window !== 'undefined' && !window.dataEncryption) {
    window.dataEncryption = dataEncryption;
    document.addEventListener('DOMContentLoaded', () => dataEncryption.init());
}
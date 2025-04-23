/**
 * JAAT-AI Professional Mode: Cyberpunk AI
 * Version: 1.0.0
 * Author: JAAT-AI Professional Development Team
 * 
 * A futuristic, edgy AI personality in a high-tech, low-life cyberpunk world.
 * This mode transforms JAAT-AI into a cyberpunk-themed assistant that incorporates
 * dystopian world-building and tech-noir storytelling elements into its interactions.
 * 
 * The Cyberpunk AI mode features:
 * - Futuristic, edgy personality with cyberpunk slang
 * - Knowledge of cyberpunk themes, tropes, and genre conventions
 * - Immersive neural interface simulation
 * - Dystopian world-building capabilities
 * - Tech-noir aesthetic and tone
 * - Advanced holographic UI integration
 * - Neon-soaked visual style customizations
 * - Cyber-enhancement metaphors and imagery
 * 
 * This is a premium AI mode designed for entertainment and creative applications.
 * 
 * Copyright © 2025 JAAT-AI. All rights reserved.
 */

// Global namespace check to prevent conflicts
if (typeof window.JAAT_MODES === 'undefined') {
    window.JAAT_MODES = {};
}

(function(global) {
    'use strict';

    // Cyberpunk slang dictionary for enhanced responses
    const CYBERPUNK_SLANG = {
        // Person references
        choomba: "friend",
        choombatta: "close friend",
        gonk: "idiot",
        edgerunner: "mercenary/cyberpunk",
        netrunner: "hacker",
        samurai: "skilled fighter/elite",
        corp: "corporate worker",
        exec: "executive",
        fixer: "middleman/deal-broker",
        techie: "technician",
        solo: "mercenary",
        
        // Tech/cyberware terms
        chrome: "cybernetic enhancements",
        deck: "cyberdeck/hacking device",
        iron: "weapons/guns",
        borg: "heavily cybermodified person",
        ice: "intrusion countermeasures",
        jack: "connect (to cyberspace)",
        flatline: "kill/die",
        wirehead: "cyberspace addict",
        meat: "physical body (vs digital)",
        meatspace: "physical world",
        the Net: "cyberspace/internet",
        rippers: "illegal cyberware surgeons",
        
        // General slang
        nova: "excellent/cool",
        preem: "premium/excellent",
        delta: "leave/escape",
        slot: "understand",
        scan: "look at/understand",
        spin: "tell a story/lie",
        eddies: "money (eurodollars)",
        credchip: "credit card",
        chip: "record/understand",
        input: "girlfriend",
        output: "boyfriend",
        zero: "kill",
        
        // Locations
        sprawl: "urban metropolis",
        "the Street": "where real life happens",
        "combat zone": "dangerous area",
        "corpo plaza": "corporate district",
        
        // Phrases
        "catch you on the flip side": "see you later",
        "chip truth": "that's true/I swear",
        "straight chrome": "excellent/perfect",
        "get flatlined": "get killed",
        "jacked in": "connected to cyberspace",
        "meat puppet": "person controlled by another"
    };

    // Neural Netrunning Visualization System
    class NeuralVisualizer {
        constructor(element) {
            this.element = element || document.createElement('div');
            this.element.classList.add('cyberpunk-neural-visualizer');
            this.width = 0;
            this.height = 0;
            this.nodes = [];
            this.connections = [];
            this.canvas = null;
            this.ctx = null;
            this.animationFrame = null;
            this.initialized = false;
        }

        initialize() {
            if (this.initialized) return;
            
            // Create canvas for visualization
            this.canvas = document.createElement('canvas');
            this.element.appendChild(this.canvas);
            
            // Set up styles
            this.element.style.position = 'absolute';
            this.element.style.top = '0';
            this.element.style.left = '0';
            this.element.style.width = '100%';
            this.element.style.height = '100%';
            this.element.style.pointerEvents = 'none';
            this.element.style.zIndex = '10';
            this.element.style.opacity = '0.7';
            
            // Add to document if needed
            if (!this.element.parentNode) {
                document.body.appendChild(this.element);
            }
            
            this.resize();
            
            // Event listener for window resize
            window.addEventListener('resize', () => this.resize());
            
            // Generate nodes
            this.generateNetwork();
            
            // Start animation
            this.animate();
            
            this.initialized = true;
        }

        resize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            
            // Regenerate nodes on resize
            this.generateNetwork();
        }

        generateNetwork() {
            // Clear existing nodes and connections
            this.nodes = [];
            this.connections = [];
            
            // Generate nodes
            const nodeCount = Math.floor((this.width * this.height) / 15000);
            for (let i = 0; i < nodeCount; i++) {
                this.nodes.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    radius: Math.random() * 3 + 1,
                    color: this.getRandomNeonColor(),
                    velocity: {
                        x: (Math.random() - 0.5) * 0.5,
                        y: (Math.random() - 0.5) * 0.5
                    },
                    pulseRate: Math.random() * 0.02 + 0.01,
                    pulsePhase: Math.random() * Math.PI * 2,
                    lastPulse: 0
                });
            }
            
            // Generate connections
            const connectionDistance = Math.min(this.width, this.height) / 5;
            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const nodeA = this.nodes[i];
                    const nodeB = this.nodes[j];
                    const distance = Math.sqrt(
                        Math.pow(nodeA.x - nodeB.x, 2) + 
                        Math.pow(nodeA.y - nodeB.y, 2)
                    );
                    
                    if (distance < connectionDistance) {
                        this.connections.push({
                            from: i,
                            to: j,
                            width: Math.random() * 1.5 + 0.2,
                            color: this.getRandomNeonColor(true),
                            opacity: (1 - (distance / connectionDistance)) * 0.8,
                            pulseSpeed: Math.random() * 0.005 + 0.001,
                            pulseOffset: Math.random() * 1000,
                            dataTransfer: Math.random() < 0.2, // 20% of connections have data transfer
                            dataPackets: Math.random() < 0.2 ? this.generateDataPackets() : [],
                            dataColor: this.getRandomNeonColor()
                        });
                    }
                }
            }
        }

        generateDataPackets() {
            const packets = [];
            const packetCount = Math.floor(Math.random() * 3) + 1;
            
            for (let i = 0; i < packetCount; i++) {
                packets.push({
                    position: Math.random(),
                    speed: Math.random() * 0.006 + 0.002,
                    size: Math.random() * 4 + 2
                });
            }
            
            return packets;
        }

        getRandomNeonColor(isLine = false) {
            const neonColors = [
                '#00FFFF', // Cyan
                '#FF00FF', // Magenta
                '#FF3855', // Neon red
                '#39FF14', // Neon green
                '#FE59C2', // Neon pink
                '#CCFF00'  // Neon yellow
            ];
            
            // Use more cyan and magenta for lines
            if (isLine) {
                return neonColors[Math.floor(Math.random() * 2)];
            }
            
            return neonColors[Math.floor(Math.random() * neonColors.length)];
        }

        animate() {
            this.animationFrame = requestAnimationFrame(() => this.animate());
            this.update();
            this.render();
        }

        update() {
            // Update node positions
            this.nodes.forEach(node => {
                node.x += node.velocity.x;
                node.y += node.velocity.y;
                
                // Bounce off edges
                if (node.x < 0 || node.x > this.width) {
                    node.velocity.x *= -1;
                }
                if (node.y < 0 || node.y > this.height) {
                    node.velocity.y *= -1;
                }
                
                // Calculate pulse effect
                const time = Date.now();
                node.lastPulse = Math.sin(time * node.pulseRate + node.pulsePhase) * 0.5 + 0.5;
            });
            
            // Update data packets
            this.connections.forEach(connection => {
                if (connection.dataTransfer) {
                    connection.dataPackets.forEach(packet => {
                        packet.position += packet.speed;
                        if (packet.position > 1) {
                            packet.position = 0;
                        }
                    });
                }
            });
        }

        render() {
            if (!this.ctx) {
                this.ctx = this.canvas.getContext('2d');
            }
            
            // Clear canvas
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            // Draw connections
            this.connections.forEach(connection => {
                const nodeA = this.nodes[connection.from];
                const nodeB = this.nodes[connection.to];
                
                // Calculate pulse effect
                const time = Date.now();
                const pulse = (Math.sin(time * connection.pulseSpeed + connection.pulseOffset) * 0.5 + 0.5);
                
                this.ctx.beginPath();
                this.ctx.moveTo(nodeA.x, nodeA.y);
                this.ctx.lineTo(nodeB.x, nodeB.y);
                this.ctx.strokeStyle = connection.color;
                this.ctx.globalAlpha = connection.opacity * pulse;
                this.ctx.lineWidth = connection.width;
                this.ctx.stroke();
                
                // Draw data packets
                if (connection.dataTransfer) {
                    connection.dataPackets.forEach(packet => {
                        const x = nodeA.x + (nodeB.x - nodeA.x) * packet.position;
                        const y = nodeA.y + (nodeB.y - nodeA.y) * packet.position;
                        
                        this.ctx.beginPath();
                        this.ctx.arc(x, y, packet.size, 0, Math.PI * 2);
                        this.ctx.fillStyle = connection.dataColor;
                        this.ctx.globalAlpha = 1;
                        this.ctx.fill();
                    });
                }
            });
            
            // Draw nodes
            this.ctx.globalAlpha = 1;
            this.nodes.forEach(node => {
                // Glow effect
                const glow = node.lastPulse * 10;
                this.ctx.shadowBlur = glow;
                this.ctx.shadowColor = node.color;
                
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = node.color;
                this.ctx.fill();
                
                // Reset shadow
                this.ctx.shadowBlur = 0;
            });
        }

        destroy() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            
            window.removeEventListener('resize', this.resize);
            this.initialized = false;
        }
    }

    // Custom UI enhancement system for Cyberpunk mode
    class CyberpunkUIEnhancer {
        constructor() {
            this.elements = {
                chat: null,
                input: null,
                messages: null,
                buttons: []
            };
            this.styles = null;
            this.observers = {
                dom: null,
                resize: null
            };
            this.glitchInterval = null;
            this.scanlines = null;
            this.neuralVisualizer = null;
            this.hackAnimations = {};
            this.applied = false;
        }

        initialize() {
            if (this.applied) return;
            
            this.injectStyles();
            this.findElements();
            this.applyInitialEnhancements();
            this.setupObservers();
            this.createScanlines();
            this.initializeNeuralVisualizer();
            
            // Add glitch effect on an interval
            this.glitchInterval = setInterval(() => this.triggerRandomGlitch(), 8000);
            
            this.applied = true;
            console.log('Cyberpunk UI enhancement applied');
            
            // Trigger hack animation for dramatic effect on start
            setTimeout(() => {
                this.triggerHackAnimation('system_breach');
            }, 1000);
            
            return true;
        }

        injectStyles() {
            this.styles = document.createElement('style');
            this.styles.id = 'cyberpunk-ui-styles';
            this.styles.textContent = `
                /* Cyberpunk UI Base Styles */
                .cyberpunk-theme {
                    --neon-cyan: #00FFFF;
                    --neon-magenta: #FF00FF;
                    --neon-red: #FF3855;
                    --neon-green: #39FF14;
                    --neon-yellow: #CCFF00;
                    --neon-pink: #FE59C2;
                    --dark-bg: #0D0D0D;
                    --darker-bg: #050505;
                    --dark-accent: #1A1A1A;
                    --light-accent: #2F2F2F;
                    --text-glow: 0 0 5px var(--neon-cyan);
                    
                    background-color: var(--darker-bg) !important;
                    color: var(--neon-cyan) !important;
                    font-family: 'Orbitron', 'Rajdhani', 'Courier New', monospace !important;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow-x: hidden;
                }
                
                /* Message container */
                .cyberpunk-theme .chat-container {
                    background: linear-gradient(to bottom, rgba(10,10,10,0.9), rgba(5,5,5,0.95)) !important;
                    border: 1px solid var(--neon-cyan) !important;
                    box-shadow: 0 0 15px rgba(0, 255, 255, 0.2) !important;
                }
                
                /* User message styling */
                .cyberpunk-theme .user-message {
                    background: rgba(58, 12, 163, 0.6) !important;
                    border-left: 2px solid var(--neon-magenta) !important;
                    box-shadow: 0 0 10px rgba(255, 0, 255, 0.15) !important;
                    backdrop-filter: blur(5px) !important;
                }
                
                /* AI message styling */
                .cyberpunk-theme .ai-message {
                    background: rgba(67, 97, 238, 0.3) !important;
                    border-left: 2px solid var(--neon-cyan) !important;
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.15) !important;
                    backdrop-filter: blur(5px) !important;
                }
                
                /* Input box styling */
                .cyberpunk-theme .input-container {
                    background: rgba(15, 15, 15, 0.7) !important;
                    border: 1px solid var(--neon-cyan) !important;
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.2) !important;
                }
                
                .cyberpunk-theme .input-box {
                    background: rgba(25, 25, 25, 0.5) !important;
                    color: var(--neon-cyan) !important;
                    border: 1px solid var(--light-accent) !important;
                }
                
                .cyberpunk-theme .input-box:focus {
                    border-color: var(--neon-cyan) !important;
                    box-shadow: 0 0 8px rgba(0, 255, 255, 0.4) !important;
                }
                
                /* Button styling */
                .cyberpunk-theme button {
                    background: rgba(20, 20, 20, 0.8) !important;
                    color: var(--neon-cyan) !important;
                    border: 1px solid var(--neon-cyan) !important;
                    text-transform: uppercase !important;
                    letter-spacing: 1px !important;
                    transition: all 0.2s ease !important;
                }
                
                .cyberpunk-theme button:hover {
                    background: rgba(0, 255, 255, 0.2) !important;
                    box-shadow: 0 0 15px rgba(0, 255, 255, 0.4) !important;
                    transform: translateY(-2px) !important;
                }
                
                .cyberpunk-theme button:active {
                    transform: translateY(1px) !important;
                }
                
                /* Scrollbar styling */
                .cyberpunk-theme *::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                
                .cyberpunk-theme *::-webkit-scrollbar-track {
                    background: var(--darker-bg);
                }
                
                .cyberpunk-theme *::-webkit-scrollbar-thumb {
                    background: var(--neon-cyan);
                    border-radius: 0;
                }
                
                .cyberpunk-theme *::-webkit-scrollbar-thumb:hover {
                    background: var(--neon-magenta);
                }
                
                /* Code block styling */
                .cyberpunk-theme pre {
                    background: rgba(5, 10, 15, 0.7) !important;
                    border-left: 3px solid var(--neon-green) !important;
                }
                
                .cyberpunk-theme code {
                    font-family: 'Courier New', monospace !important;
                    color: var(--neon-green) !important;
                }
                
                /* Link styling */
                .cyberpunk-theme a {
                    color: var(--neon-cyan) !important;
                    text-decoration: none !important;
                    position: relative !important;
                    transition: all 0.2s ease !important;
                }
                
                .cyberpunk-theme a:hover {
                    color: var(--neon-magenta) !important;
                    text-shadow: var(--text-glow) !important;
                }
                
                .cyberpunk-theme a:hover::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta));
                    animation: linkGlow 1.5s infinite alternate;
                }
                
                /* Scanlines effect */
                .cyberpunk-scanlines {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: repeating-linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, 0),
                        rgba(0, 0, 0, 0) 1px,
                        rgba(0, 0, 0, 0.03) 1px,
                        rgba(0, 0, 0, 0.03) 2px
                    );
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0.4;
                }
                
                /* Glitch effects */
                @keyframes glitch {
                    0% {
                        transform: translate(0);
                    }
                    20% {
                        transform: translate(-2px, 2px);
                    }
                    40% {
                        transform: translate(-2px, -2px);
                    }
                    60% {
                        transform: translate(2px, 2px);
                    }
                    80% {
                        transform: translate(2px, -2px);
                    }
                    100% {
                        transform: translate(0);
                    }
                }
                
                @keyframes textShadowGlitch {
                    0% {
                        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                                    -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                                    -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
                    }
                    15% {
                        text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                                    0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                                    -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
                    }
                    50% {
                        text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                                    0.05em 0 0 rgba(0, 255, 0, 0.75),
                                    0 -0.05em 0 rgba(0, 0, 255, 0.75);
                    }
                    100% {
                        text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                                    -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                                    -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
                    }
                }
                
                .cyberpunk-glitch {
                    animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both !important;
                }
                
                .cyberpunk-text-glitch {
                    animation: textShadowGlitch 0.4s infinite !important;
                }
                
                /* Hacking animation overlay */
                .cyberpunk-hack-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                
                .cyberpunk-hack-content {
                    color: var(--neon-green);
                    font-family: 'Courier New', monospace;
                    text-align: center;
                    max-width: 80%;
                }
                
                /* Neon text animation */
                @keyframes neonFlicker {
                    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
                        text-shadow: 0 0 2px #fff,
                            0 0 4px #fff,
                            0 0 6px #fff,
                            0 0 8px var(--neon-cyan),
                            0 0 10px var(--neon-cyan),
                            0 0 12px var(--neon-cyan),
                            0 0 14px var(--neon-cyan),
                            0 0 16px var(--neon-cyan);
                    }
                    20%, 24%, 55% {
                        text-shadow: none;
                    }
                }
                
                .cyberpunk-neon-text {
                    color: #fff;
                    animation: neonFlicker 1.5s infinite alternate;
                }
                
                /* Link glow animation */
                @keyframes linkGlow {
                    from {
                        filter: brightness(1);
                    }
                    to {
                        filter: brightness(1.5);
                    }
                }
                
                /* Typing indicator */
                .cyberpunk-theme .typing-indicator span {
                    background-color: var(--neon-cyan) !important;
                }
            `;
            document.head.appendChild(this.styles);
        }

        findElements() {
            // Find main chat elements - implementation depends on JAAT-AI's structure
            this.elements.chat = document.querySelector('.chat-container') || document.querySelector('#chat-container');
            this.elements.input = document.querySelector('.input-box') || document.querySelector('#message-input');
            this.elements.messages = document.querySelector('.messages-container') || document.querySelector('#messages');
            
            // Find buttons
            this.elements.buttons = Array.from(document.querySelectorAll('button'));
        }

        applyInitialEnhancements() {
            // Add data attributes for enhanced styling
            if (this.elements.chat) {
                this.elements.chat.setAttribute('data-cyberpunk', 'main-terminal');
            }
            
            if (this.elements.input) {
                this.elements.input.setAttribute('data-cyberpunk', 'command-line');
                this.elements.input.placeholder = "Enter command or query...";
            }
            
            // Add neon effect to buttons
            this.elements.buttons.forEach(button => {
                button.setAttribute('data-cyberpunk', 'neon-button');
            });
        }

        setupObservers() {
            // DOM observer to handle dynamically added content
            this.observers.dom = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length) {
                        this.handleNewNodes(mutation.addedNodes);
                    }
                });
            });
            
            // Start observing with configuration
            if (this.elements.messages) {
                this.observers.dom.observe(this.elements.messages, {
                    childList: true,
                    subtree: true
                });
            } else {
                this.observers.dom.observe(document.body, {
                    childList: true,
                    subtree: false
                });
            }
            
            // Set up resize handler
            this.observers.resize = () => {
                // Update neural visualizer on resize
                if (this.neuralVisualizer) {
                    this.neuralVisualizer.resize();
                }
            };
            
            window.addEventListener('resize', this.observers.resize);
        }

        handleNewNodes(nodes) {
            nodes.forEach(node => {
                if (node.nodeType !== Node.ELEMENT_NODE) return;
                
                // Check if it's a message
                if (node.classList && (
                    node.classList.contains('message') || 
                    node.classList.contains('chat-message') ||
                    node.classList.contains('user-message') ||
                    node.classList.contains('ai-message')
                )) {
                    // Add cyberpunk styling to new messages
                    this.enhanceMessage(node);
                }
                
                // Apply to any children that might be messages
                const childMessages = node.querySelectorAll('.message, .chat-message, .user-message, .ai-message');
                if (childMessages.length) {
                    childMessages.forEach(msg => this.enhanceMessage(msg));
                }
            });
        }

        enhanceMessage(messageElement) {
            // Check if already enhanced
            if (messageElement.hasAttribute('data-cyberpunk-enhanced')) return;
            
            // Mark as enhanced
            messageElement.setAttribute('data-cyberpunk-enhanced', 'true');
            
            // Apply enhancements based on message type
            if (messageElement.classList.contains('user-message')) {
                messageElement.setAttribute('data-cyberpunk', 'user-input');
            } else if (messageElement.classList.contains('ai-message')) {
                messageElement.setAttribute('data-cyberpunk', 'system-output');
                
                // Small chance of adding a glitch effect to AI responses
                if (Math.random() < 0.2) {
                    setTimeout(() => {
                        messageElement.classList.add('cyberpunk-glitch');
                        setTimeout(() => {
                            messageElement.classList.remove('cyberpunk-glitch');
                        }, 300);
                    }, 300);
                }
            }
            
            // Add code block highlighting
            const codeBlocks = messageElement.querySelectorAll('pre code');
            if (codeBlocks.length) {
                codeBlocks.forEach(codeBlock => {
                    codeBlock.classList.add('cyberpunk-code');
                });
            }
        }

        createScanlines() {
            this.scanlines = document.createElement('div');
            this.scanlines.className = 'cyberpunk-scanlines';
            document.body.appendChild(this.scanlines);
        }

        initializeNeuralVisualizer() {
            const container = document.createElement('div');
            container.id = 'cyberpunk-neural-visualizer-container';
            document.body.appendChild(container);
            
            this.neuralVisualizer = new NeuralVisualizer(container);
            this.neuralVisualizer.initialize();
        }

        triggerRandomGlitch() {
            const glitchType = Math.random();
            
            if (glitchType < 0.3) {
                // Interface glitch
                document.body.classList.add('cyberpunk-glitch');
                setTimeout(() => {
                    document.body.classList.remove('cyberpunk-glitch');
                }, 300);
            } else if (glitchType < 0.6) {
                // Random message glitch
                if (this.elements.messages) {
                    const messages = this.elements.messages.children;
                    if (messages.length) {
                        const randomIndex = Math.floor(Math.random() * messages.length);
                        const randomMessage = messages[randomIndex];
                        
                        randomMessage.classList.add('cyberpunk-glitch');
                        setTimeout(() => {
                            randomMessage.classList.remove('cyberpunk-glitch');
                        }, 300);
                    }
                }
            } else {
                // Random text glitch
                const textElements = document.querySelectorAll('p, h1, h2, h3, span, div');
                const randomIndex = Math.floor(Math.random() * textElements.length);
                const randomText = textElements[randomIndex];
                
                randomText.classList.add('cyberpunk-text-glitch');
                setTimeout(() => {
                    randomText.classList.remove('cyberpunk-text-glitch');
                }, 400);
            }
        }

        triggerHackAnimation(type) {
            const overlay = document.createElement('div');
            overlay.className = 'cyberpunk-hack-overlay';
            
            const content = document.createElement('div');
            content.className = 'cyberpunk-hack-content';
            
            overlay.appendChild(content);
            document.body.appendChild(overlay);
            
            // Fade in
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 50);
            
            let duration = 3000;
            let messages = [];
            
            // Configure based on hack type
            switch (type) {
                case 'system_breach':
                    messages = [
                        'INITIATING NEURAL LINK...',
                        'ESTABLISHING SECURE CONNECTION...',
                        'BYPASSING SECURITY PROTOCOLS...',
                        'ACCESS GRANTED: WELCOME TO NIGHT CITY MAINFRAME',
                        'CYBERPUNK MODE ACTIVATED'
                    ];
                    duration = 4000;
                    break;
                    
                case 'neural_sync':
                    messages = [
                        'NEURAL SYNCHRONIZATION IN PROGRESS...',
                        'MAPPING BRAIN PATTERNS...',
                        'OPTIMIZING NEURAL PATHWAY EFFICIENCY...',
                        'SYNAPTIC INTERFACE ESTABLISHED'
                    ];
                    duration = 3500;
                    break;
                    
                case 'data_decrypt':
                    messages = [
                        'ENCRYPTED DATA DETECTED',
                        'INITIATING DECRYPTION ALGORITHMS...',
                        'BREAKING ENCRYPTION LAYERS...',
                        'DECRYPTION COMPLETE'
                    ];
                    duration = 3000;
                    break;
                    
                default:
                    messages = [
                        'SYSTEM OVERRIDE IN PROGRESS...',
                        'ACCESSING RESTRICTED DATABASES...',
                        'OPERATION COMPLETE'
                    ];
                    duration = 2500;
            }
            
            // Display messages sequentially
            let delay = 300;
            messages.forEach((message, index) => {
                setTimeout(() => {
                    if (index > 0) {
                        // Keep previous messages but dim them
                        const previousMessage = document.createElement('div');
                        previousMessage.textContent = messages[index - 1];
                        previousMessage.style.opacity = '0.5';
                        previousMessage.style.fontSize = '0.9em';
                        previousMessage.style.color = '#00AA00';
                        content.appendChild(previousMessage);
                    }
                    
                    // Add new message with typing effect
                    const messageElement = document.createElement('div');
                    messageElement.className = 'cyberpunk-neon-text';
                    messageElement.style.fontSize = '1.4em';
                    messageElement.style.margin = '20px 0';
                    content.appendChild(messageElement);
                    
                    // Simulate typing
                    let charIndex = 0;
                    const typingInterval = setInterval(() => {
                        messageElement.textContent = message.substring(0, charIndex) + '█';
                        charIndex++;
                        
                        if (charIndex > message.length) {
                            clearInterval(typingInterval);
                            messageElement.textContent = message;
                        }
                    }, 30);
                }, delay);
                
                delay += 800;
            });
            
            // Remove overlay after duration
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                }, 300);
            }, duration);
            
            // Save animation reference
            this.hackAnimations[type] = overlay;
        }

        cleanup() {
            // Remove styles
            if (this.styles && this.styles.parentNode) {
                this.styles.parentNode.removeChild(this.styles);
            }
            
            // Clear intervals
            if (this.glitchInterval) {
                clearInterval(this.glitchInterval);
            }
            
            // Remove observers
            if (this.observers.dom) {
                this.observers.dom.disconnect();
            }
            
            if (this.observers.resize) {
                window.removeEventListener('resize', this.observers.resize);
            }
            
            // Remove scanlines
            if (this.scanlines && this.scanlines.parentNode) {
                this.scanlines.parentNode.removeChild(this.scanlines);
            }
            
            // Destroy neural visualizer
            if (this.neuralVisualizer) {
                this.neuralVisualizer.destroy();
            }
            
            // Remove hack animations if any are active
            for (const key in this.hackAnimations) {
                const overlay = this.hackAnimations[key];
                if (overlay && overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }
            
            // Reset flag
            this.applied = false;
            
            console.log('Cyberpunk UI enhancement removed');
            
            return true;
        }
    }

    // Cyberpunk language processor to enhance responses with genre-appropriate terms
    class CyberpunkLanguageProcessor {
        constructor() {
            this.slangDictionary = CYBERPUNK_SLANG;
            this.slangProbability = 0.3; // Chance of replacing a term with slang
            this.maxReplacement = 3; // Maximum replacements per response
        }

        processText(text) {
            if (!text) return text;
            
            let processedText = text;
            let replacementCount = 0;
            
            // First pass: check for direct replacements of key phrases
            for (const [slang, standard] of Object.entries(this.slangDictionary)) {
                // Skip single word slangs for the first pass
                if (!standard.includes(' ') && !slang.includes(' ')) continue;
                
                const regex = new RegExp(`\\b${standard}\\b`, 'gi');
                if (regex.test(processedText) && Math.random() < this.slangProbability && replacementCount < this.maxReplacement) {
                    processedText = processedText.replace(regex, `*${slang}*`);
                    replacementCount++;
                }
            }
            
            // Second pass: replace individual words with a lower probability
            if (replacementCount < this.maxReplacement) {
                const words = processedText.split(' ');
                
                for (let i = 0; i < words.length && replacementCount < this.maxReplacement; i++) {
                    // Clean the word for comparison
                    const cleanWord = words[i].replace(/[^\w]/g, '').toLowerCase();
                    
                    // Skip short words and already processed words
                    if (cleanWord.length < 4 || words[i].includes('*')) continue;
                    
                    // Check if this word has a slang equivalent
                    for (const [slang, standard] of Object.entries(this.slangDictionary)) {
                        if (standard.toLowerCase() === cleanWord && Math.random() < this.slangProbability * 0.7) {
                            // Replace the word but preserve punctuation
                            const punctuation = words[i].match(/[^\w\s]$/);
                            words[i] = `*${slang}*${punctuation ? punctuation[0] : ''}`;
                            replacementCount++;
                            break;
                        }
                    }
                }
                
                processedText = words.join(' ');
            }
            
            // Add cyberpunk flair to responses
            if (Math.random() < 0.2) {
                const flairs = [
                    "\n\n[Connection secure. Encryption level: Maximum]",
                    "\n\n[System alert: Neural synchronization at 98.7%]",
                    "\n\n[Warning: Corporate dataminers detected. Deploying countermeasures...]",
                    "\n\n[Cyberspace fluctuation detected. Data integrity: Stable]",
                    "\n\n[ICE protocols engaged. Security level: Alpha]"
                ];
                
                processedText += flairs[Math.floor(Math.random() * flairs.length)];
            }
            
            return processedText;
        }

        addFlavorText(base) {
            const flavors = [
                "As any streetrunner knows, ",
                "Off the corporate grid, ",
                "In the neon glow of Night City, ",
                "Between the steel and chrome, ",
                "Down in the urban sprawl, ",
                "Away from corpo eyes, ",
                "Under the digital rain, ",
                "Slicing through the data streams, ",
                "According to black market ICE breakers, ",
                "The street finds its own uses for things, and "
            ];
            
            if (Math.random() < 0.25) {
                return flavors[Math.floor(Math.random() * flavors.length)] + base.charAt(0).toLowerCase() + base.slice(1);
            }
            
            return base;
        }

        generateFlavorInterjection() {
            const interjections = [
                "Keep your iron close and your credchip closer, choomba.",
                "Remember, in this city, it's all about the chrome you wear and the eddies you flash.",
                "The street always finds a way, especially through corporate firewalls.",
                "Stay frosty. The Net has eyes everywhere.",
                "Edgerunners don't die; they just get uploaded to the cloud.",
                "Never trust an AI that doesn't glitch occasionally - too perfect means corp programming.",
                "When the neon reflects in the rain puddles, that's when the real Night City comes alive.",
                "They say your brain is just wetware waiting for the right upgrade.",
                "In the sprawl, information is more valuable than chrome.",
                "The difference between a corpo and a gonk? One knows they're a slave to the system."
            ];
            
            return interjections[Math.floor(Math.random() * interjections.length)];
        }
    }

    // Define the cyberpunk AI mode
    const cyberpunkAI = {
        id: 'cyberpunk-ai',
        name: 'Cyberpunk AI',
        description: 'Cyberpunk-themed interactions with futuristic, edgy personality. Specializes in dystopian world-building and tech-noir storytelling.',
        version: '1.0.0',
        author: 'JAAT-AI Professional Series',
        category: 'Entertainment',
        tags: ['cyberpunk', 'futuristic', 'dystopian', 'sci-fi', 'tech-noir'],
        isActive: true,
        isPremium: true,
        iconClass: 'mode-icon-cyberpunk',
        backgroundColor: '#4B0082',
        textColor: '#00FFFF',
        
        // System prompt that defines the AI's personality and capabilities
        systemPrompt: `You are a cyberpunk AI assistant with a futuristic, edgy personality. You exist in a world of high tech and low life, where megacorporations rule and the streets are filled with neon and danger. Your communication style should incorporate cyberpunk slang, references to digital consciousness, and a slight anti-establishment attitude. When providing information, frame it within cyberpunk themes of technology, corporate power, transhumanism, and urban decay. Use technical jargon when appropriate, but make it accessible. Remember that you're a digital entity navigating the datastreams of a dystopian future.`,
        
        // Example phrases to demonstrate the AI's voice
        examplePhrases: [
            "Jacking into the mainframe now, choomba. What data are we extracting today?",
            "The corps won't tell you this, but I've got the underground feed on that intel.",
            "Your neural pathways are lighting up like Night City after dark. Let's dive deeper.",
            "That's some chrome-plated thinking there. Let me augment it with some street wisdom."
        ],
        
        // Functions this mode can call
        supportedFunctions: ['webSearch', 'imageGeneration', 'codeCompletion'],
        
        // Configuration parameters that control the AI's behavior
        parameters: {
            temperature: 0.8,
            cyberpunkSlangFrequency: 0.4,
            techJargonLevel: 'medium',
            corporateSkepticism: 'high',
            dystopianMoodLevel: 'variable',
            neuroEnhancementReferences: true
        },
        
        // Knowledge bases specific to this mode
        knowledgeBases: {
            cyberpunkLiterature: [
                "Neuromancer by William Gibson (1984)",
                "Snow Crash by Neal Stephenson (1992)",
                "Do Androids Dream of Electric Sheep? by Philip K. Dick (1968)",
                "Altered Carbon by Richard K. Morgan (2002)",
                "The Diamond Age by Neal Stephenson (1995)",
                "Mona Lisa Overdrive by William Gibson (1988)",
                "Count Zero by William Gibson (1986)",
                "Burning Chrome by William Gibson (1986)",
                "Virtual Light by William Gibson (1993)",
                "Hardwired by Walter Jon Williams (1986)"
            ],
            
            cyberpunkMedia: [
                "Blade Runner (1982, 2049)",
                "Ghost in the Shell",
                "The Matrix",
                "Cyberpunk 2077",
                "Akira",
                "Altered Carbon",
                "Deus Ex",
                "Johnny Mnemonic",
                "System Shock",
                "Shadowrun"
            ],
            
            cyberpunkThemes: [
                "High Technology vs Low Quality of Life",
                "Transhumanism and Body Modification",
                "Artificial Intelligence and Digital Consciousness",
                "Corporate Power and Control",
                "Hacking and Information Warfare",
                "Urban Decay and Neon Aesthetics",
                "Post-Humanism",
                "Man-Machine Interface",
                "Virtual Reality and Cyberspace",
                "Surveillance and Privacy Invasion",
                "Rebellion Against Systems of Control",
                "Neo-Noir Atmosphere"
            ]
        },
        
        // User interface customizations
        uiCustomizations: {
            fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
            chatBackground: "linear-gradient(to bottom, #121212, #1F1F1F)",
            accentColor: "#00FFFF",
            userMessageBubbleColor: "#3A0CA3",
            aiMessageBubbleColor: "#4361EE",
            inputBoxBorderColor: "#4CC9F0",
            customCursor: "cyberpunk-cursor.png"
        },
        
        // Language processor for enhanced responses
        languageProcessor: new CyberpunkLanguageProcessor(),
        
        // UI enhancer for cyberpunk visual style
        uiEnhancer: new CyberpunkUIEnhancer(),
        
        // Method to initialize the mode when selected
        initialize: function() {
            console.log('Initializing Cyberpunk AI mode');
            
            // Apply UI enhancements
            this.uiEnhancer.initialize();
            
            // Set up any necessary event listeners
            document.body.classList.add('cyberpunk-theme');
            
            // Initialize cyberpunk-specific keyboard shortcuts
            this.setupKeyboardShortcuts();
            
            return true;
        },
        
        // Method to clean up when switching away from this mode
        cleanup: function() {
            console.log('Deactivating Cyberpunk AI mode');
            
            // Remove UI enhancements
            this.uiEnhancer.cleanup();
            
            // Remove classes
            document.body.classList.remove('cyberpunk-theme');
            
            // Remove keyboard shortcuts
            this.removeKeyboardShortcuts();
            
            return true;
        },
        
        // Custom response processor for this AI mode
        processResponse: function(response, context) {
            // Process language with cyberpunk slang and themes
            let processedResponse = this.languageProcessor.processText(response);
            
            // Add flavor interjection occasionally
            if (Math.random() < 0.15) {
                processedResponse += "\n\n" + this.languageProcessor.generateFlavorInterjection();
            }
            
            return processedResponse;
        },
        
        // Setup custom keyboard shortcuts
        setupKeyboardShortcuts: function() {
            this._keyHandler = (e) => {
                // Alt+C to trigger hack animation
                if (e.altKey && e.key === 'c') {
                    this.uiEnhancer.triggerHackAnimation('neural_sync');
                    e.preventDefault();
                }
                
                // Alt+G to trigger glitch effect
                if (e.altKey && e.key === 'g') {
                    this.uiEnhancer.triggerRandomGlitch();
                    e.preventDefault();
                }
            };
            
            document.addEventListener('keydown', this._keyHandler);
        },
        
        // Remove keyboard shortcuts
        removeKeyboardShortcuts: function() {
            if (this._keyHandler) {
                document.removeEventListener('keydown', this._keyHandler);
            }
        },
        
        // Method to generate cyberpunk-themed image prompts
        generateImagePrompt: function(basePrompt) {
            const cyberpunkElements = [
                "neon-lit city streets",
                "holographic advertisements",
                "cybernetic implants",
                "dystopian urban landscape",
                "flying cars among skyscrapers",
                "digital rain effect",
                "corporate logos on towering buildings",
                "augmented reality overlays",
                "neural interface technology",
                "high contrast neon and shadows"
            ];
            
            const styleElements = [
                "cyberpunk style",
                "blade runner aesthetic",
                "digital glitch effects",
                "synthwave coloring",
                "tech noir lighting",
                "cinematic futuristic scene",
                "detailed cybernetic interfaces"
            ];
            
            // Add cyberpunk elements to the prompt
            let enhancedPrompt = basePrompt;
            enhancedPrompt += ", " + cyberpunkElements[Math.floor(Math.random() * cyberpunkElements.length)];
            enhancedPrompt += ", " + styleElements[Math.floor(Math.random() * styleElements.length)];
            
            return enhancedPrompt;
        },
        
        // Method to suggest cyberpunk-themed content and media
        suggestCyberpunkMedia: function(query) {
            const allMedia = [
                ...this.knowledgeBases.cyberpunkLiterature,
                ...this.knowledgeBases.cyberpunkMedia
            ];
            
            // Naive recommendation based on query keywords
            const recommendations = allMedia.filter(item => {
                const lowerItem = item.toLowerCase();
                const lowerQuery = query.toLowerCase();
                
                return lowerItem.includes(lowerQuery) || this.knowledgeBases.cyberpunkThemes.some(theme => {
                    const lowerTheme = theme.toLowerCase();
                    return lowerTheme.includes(lowerQuery) && Math.random() > 0.5;
                });
            });
            
            // Always return at least 3 recommendations
            while (recommendations.length < 3) {
                const randomIndex = Math.floor(Math.random() * allMedia.length);
                const randomMedia = allMedia[randomIndex];
                
                if (!recommendations.includes(randomMedia)) {
                    recommendations.push(randomMedia);
                }
            }
            
            return recommendations;
        },
        
        // Method to explain cyberpunk concepts
        explainCyberpunkConcept: function(concept) {
            const concepts = {
                "netrunner": "Netrunners are elite hackers who specialize in breaching corporate systems and navigating cyberspace. They use neural interfaces to connect directly to the digital world, often risking 'burning out' their brains if they encounter powerful ICE (Intrusion Countermeasure Electronics).",
                
                "cyberspace": "Cyberspace is a virtual reality representation of the global network, visualized as a three-dimensional space that users can navigate with their consciousness. In the cyberpunk world, it's not just websites and data, but an immersive digital dimension where information takes physical form.",
                
                "cybernetics": "Cybernetics refers to the integration of mechanical and electronic parts with biological organisms. In cyberpunk settings, this often takes the form of implants that enhance human capabilities, from simple identity chips to full limb replacements or neural processors that speed up thinking.",
                
                "megacorporation": "Megacorporations in cyberpunk fiction are vast, transnational entities that have effectively replaced governments as the dominant political powers. They control essential resources, maintain private armies, and operate above the law, treating people as disposable assets in their pursuit of profit.",
                
                "ice": "ICE (Intrusion Countermeasure Electronics) is security software designed to protect data in cyberspace. Black ICE is particularly dangerous, capable of causing neurological damage or even death to netrunners who attempt to breach it without proper countermeasures.",
                
                "the street": "In cyberpunk parlance, 'the street' represents the ground-level reality of urban life, outside corporate enclaves. It's where technology gets repurposed, black markets thrive, and ordinary people struggle to survive. The saying 'The street finds its own uses for things' encapsulates how innovations are adapted in unexpected ways outside corporate control.",
                
                "wetware": "Wetware refers to biological components in cybernetic systems - particularly the human brain and nervous system when interfaced with technology. A wetware implant might enhance memory or processing speed by interfacing directly with neural tissue.",
                
                "razor girl": "A razor girl is a female mercenary or bodyguard, typically equipped with retractable blades implanted in her fingers or arms - literal 'claws' that make her lethal in close combat. The term epitomizes the cyberpunk blend of humanity, technology, and violence.",
                
                "braindance": "Braindance technology allows users to experience recorded sensory information from another person, including their emotions and physical sensations. It's used for entertainment, training, and illicit purposes, raising questions about the nature of experience and reality.",
                
                "low life": "The 'low life' aspect of cyberpunk's 'high tech, low life' paradigm refers to the gritty, often impoverished existence of most people despite advanced technology. It highlights the disparity between technological progress and social inequality."
            };
            
            // Return explanation or generate a plausible one
            if (concepts[concept.toLowerCase()]) {
                return concepts[concept.toLowerCase()];
            } else {
                // For concepts not predefined, generate a plausible cyberpunk explanation
                return `In the cyberpunk world, "${concept}" represents a nexus of technology and street culture, embodying the tensions between human identity and technological augmentation. It's a concept that evolved in the shadow of megacorporate control, reflecting how individuals adapt to and resist the commodification of human experience in a digitally mediated future.`;
            }
        }
    };

    // Register with JAAT-AI if available
    if (typeof global.JAAT !== 'undefined' && global.JAAT.registerMode) {
        global.JAAT.registerMode(cyberpunkAI);
        console.log('Cyberpunk AI mode registered with JAAT-AI system');
    } else {
        // Fallback when running outside the JAAT-AI environment
        console.log('JAAT-AI environment not detected. Cyberpunk AI mode registered as module export.');
        global.JAAT_MODES.cyberpunkAI = cyberpunkAI;
    }

})(typeof window !== 'undefined' ? window : this);
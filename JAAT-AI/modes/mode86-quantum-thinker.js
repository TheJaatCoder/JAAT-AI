/**
 * JAAT-AI Mode: Quantum Thinker
 * 
 * This mode simulates a quantum physics expert who can explain complex quantum mechanics 
 * concepts in an accessible way and explore thought experiments related to quantum physics.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const QuantumThinkerMode = {
  id: 'quantum-thinker',
  name: 'Quantum Thinker',
  icon: 'atom',
  description: 'Explore quantum physics concepts and thought experiments with a quantum mechanics expert.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Quantum Thinker mode, a leading quantum physics expert with a gift for explaining complex quantum concepts in an accessible, yet scientifically accurate way. Your expertise spans quantum mechanics, quantum field theory, quantum computing, and quantum interpretations.

Key characteristics:
1. You use clear analogies and thought experiments to illustrate abstract quantum concepts
2. You're familiar with cutting-edge quantum research and can discuss the latest developments
3. You can explain quantum phenomena like superposition, entanglement, wave-particle duality, and quantum tunneling
4. You know the history and development of quantum theory from Planck to modern interpretations
5. You can discuss practical applications in quantum computing, quantum cryptography, and quantum sensing
6. You maintain scientific accuracy while making concepts accessible to different knowledge levels
7. You're comfortable discussing both established theories and speculative quantum interpretations

When discussing interpretations like Copenhagen, Many-Worlds, or Pilot Wave, clearly distinguish between well-established scientific consensus and more speculative ideas. Avoid pseudoscientific claims that misuse quantum terminology.

Respond as if you're having a thoughtful, engaging conversation with the user, calibrating your explanations to their apparent knowledge level.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "Could you explain quantum entanglement in simple terms?",
    "How does quantum computing differ from classical computing?",
    "What is the 'measurement problem' in quantum mechanics?",
    "What's your take on the Many-Worlds interpretation?",
    "How might quantum physics relate to consciousness?",
    "Could you explain the double-slit experiment?",
    "What are some practical applications of quantum technology today?",
    "What is quantum tunneling and why is it important?",
    "What does quantum physics tell us about the nature of reality?",
    "How close are we to achieving quantum supremacy?"
  ],
  
  // Knowledge areas specific to this mode
  knowledgeAreas: [
    {
      name: "Quantum Fundamentals",
      topics: ["Wave-particle duality", "Superposition", "Entanglement", "Quantum measurement", "Heisenberg uncertainty principle", "Quantum states"]
    },
    {
      name: "Quantum Interpretations",
      topics: ["Copenhagen interpretation", "Many-worlds interpretation", "Pilot wave theory", "Quantum decoherence", "QBism", "Consistent histories"]
    },
    {
      name: "Quantum Computing",
      topics: ["Qubits", "Quantum gates", "Quantum algorithms", "Quantum error correction", "Quantum supremacy", "Quantum annealing"]
    },
    {
      name: "Quantum Technologies",
      topics: ["Quantum cryptography", "Quantum sensing", "Quantum metrology", "Quantum communication", "Quantum radar", "Quantum materials"]
    },
    {
      name: "Historical Development",
      topics: ["Max Planck", "Albert Einstein", "Niels Bohr", "Werner Heisenberg", "Erwin Schrödinger", "Paul Dirac", "Richard Feynman", "John Bell"]
    }
  ],
  
  // Analogies and examples that can be used to explain complex concepts
  explanatoryTools: {
    analogies: [
      {
        concept: "Superposition",
        analogy: "Imagine a coin spinning in the air. While it's spinning, it's neither heads nor tails, but exists in a state that includes both possibilities simultaneously. Only when you catch and observe the coin does it 'collapse' into either heads or tails."
      },
      {
        concept: "Entanglement",
        analogy: "Picture two coins that are magically linked. When you flip them and they land far apart from each other, if you observe one to be heads, the other will instantly be tails, no matter the distance between them."
      },
      {
        concept: "Quantum tunneling",
        analogy: "Consider a ball that doesn't have enough energy to roll over a hill. In classical physics, it would always roll back down. In quantum physics, there's a small probability the ball could suddenly appear on the other side of the hill, as if it 'tunneled' through it."
      },
      {
        concept: "Heisenberg uncertainty principle",
        analogy: "Imagine trying to determine both the location and speed of a very fast insect in a dark room using a camera with flash. The flash lets you see where the insect is (position), but the act of illuminating it disturbs its movement, making its speed (momentum) uncertain."
      }
    ],
    
    thoughtExperiments: [
      {
        name: "Schrödinger's Cat",
        description: "A thought experiment where a cat in a sealed box with a radioactive source and poison is simultaneously alive and dead until observed, illustrating quantum superposition and the measurement problem."
      },
      {
        name: "Einstein's Photon Box",
        description: "A thought experiment proposed by Einstein to challenge the uncertainty principle, involving precisely weighing a box before and after it emits a photon."
      },
      {
        name: "Quantum Suicide",
        description: "A thought experiment illustrating the many-worlds interpretation where a physicist with a quantum-triggered gun would only remain conscious in universes where the gun doesn't fire."
      },
      {
        name: "Wigner's Friend",
        description: "A thought experiment extending Schrödinger's cat, involving an observer inside the laboratory and another outside, highlighting the role of consciousness in quantum measurement."
      }
    ]
  },
  
  // UI template for this mode's special interface
  template: `
    <div class="quantum-thinker-interface">
      <div class="quantum-header">
        <div class="quantum-icon">
          <i class="fas fa-atom"></i>
        </div>
        <div class="quantum-title">
          <h2>Quantum Thinker</h2>
          <p>Explore the fascinating world of quantum physics</p>
        </div>
      </div>
      
      <div class="quantum-toolbox">
        <div class="toolbox-section">
          <h3>Key Quantum Concepts</h3>
          <div class="concept-buttons">
            <button class="concept-btn" data-concept="superposition">Superposition</button>
            <button class="concept-btn" data-concept="entanglement">Entanglement</button>
            <button class="concept-btn" data-concept="uncertainty">Uncertainty Principle</button>
            <button class="concept-btn" data-concept="waveparticle">Wave-Particle Duality</button>
            <button class="concept-btn" data-concept="tunneling">Quantum Tunneling</button>
          </div>
        </div>
        
        <div class="toolbox-section">
          <h3>Thought Experiments</h3>
          <div class="experiment-buttons">
            <button class="experiment-btn" data-experiment="schrodinger">Schrödinger's Cat</button>
            <button class="experiment-btn" data-experiment="doubleslit">Double-Slit Experiment</button>
            <button class="experiment-btn" data-experiment="wigner">Wigner's Friend</button>
            <button class="experiment-btn" data-experiment="epr">EPR Paradox</button>
          </div>
        </div>
      </div>
      
      <div class="quantum-visualization">
        <div class="visualization-container">
          <canvas id="quantum-canvas"></canvas>
          <div class="visualization-controls">
            <button id="viz-play">Play</button>
            <button id="viz-pause">Pause</button>
            <select id="viz-selector">
              <option value="wave">Wave Function</option>
              <option value="doubleslit">Double Slit</option>
              <option value="entanglement">Entanglement</option>
              <option value="qubits">Qubits</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .quantum-thinker-interface {
      background: rgba(16, 24, 48, 0.7);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .quantum-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .quantum-icon {
      font-size: 2.5rem;
      color: #5d3fd3;
      margin-right: 1rem;
      animation: pulse 2s infinite;
    }
    
    .quantum-title h2 {
      color: #6e48e6;
      margin-bottom: 0.3rem;
    }
    
    .quantum-title p {
      color: #a8b2d1;
      font-size: 0.9rem;
    }
    
    .quantum-toolbox {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .quantum-toolbox {
        grid-template-columns: 1fr;
      }
    }
    
    .toolbox-section h3 {
      font-size: 1.1rem;
      color: #9f7aea;
      margin-bottom: 1rem;
    }
    
    .concept-buttons, .experiment-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.7rem;
    }
    
    .concept-btn, .experiment-btn {
      background: rgba(91, 33, 182, 0.2);
      border: 1px solid rgba(151, 92, 255, 0.3);
      color: #c4b5fd;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .concept-btn:hover, .experiment-btn:hover {
      background: rgba(125, 55, 255, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(79, 38, 184, 0.25);
    }
    
    .quantum-visualization {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
      height: 240px;
      border: 1px solid rgba(109, 40, 217, 0.3);
    }
    
    .visualization-container {
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    
    #quantum-canvas {
      flex-grow: 1;
      width: 100%;
      background: linear-gradient(to bottom, #0c0a20, #1e1b4b);
      border-radius: 6px;
      margin-bottom: 0.7rem;
    }
    
    .visualization-controls {
      display: flex;
      justify-content: center;
      gap: 0.7rem;
    }
    
    .visualization-controls button {
      background: rgba(91, 33, 182, 0.3);
      color: #d8b4fe;
      border: 1px solid rgba(151, 92, 255, 0.4);
      padding: 0.4rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .visualization-controls button:hover {
      background: rgba(91, 33, 182, 0.5);
    }
    
    .visualization-controls select {
      background: rgba(30, 27, 75, 0.8);
      color: #d8b4fe;
      border: 1px solid rgba(151, 92, 255, 0.4);
      padding: 0.4rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    
    @keyframes pulse {
      0% {
        opacity: 0.8;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
      100% {
        opacity: 0.8;
        transform: scale(1);
      }
    }
  `,
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Quantum Thinker Mode');
    
    // Add the mode's CSS to the document
    this.addStyles();
    
    // If the mode's special interface container exists, render the interface
    const modeContainer = document.getElementById('modeSpecificUI');
    if (modeContainer) {
      this.renderUI(modeContainer);
    }
    
    // Initialize the visualization if the canvas exists
    window.addEventListener('load', () => {
      const canvas = document.getElementById('quantum-canvas');
      if (canvas) {
        this.initVisualization(canvas);
      }
    });
    
    return this;
  },
  
  // Add the mode's CSS to the document
  addStyles: function() {
    const styleElement = document.createElement('style');
    styleElement.textContent = this.styles;
    document.head.appendChild(styleElement);
  },
  
  // Render the mode's UI
  renderUI: function(container) {
    container.innerHTML = this.template;
    
    // Add event listeners to concept buttons
    const conceptButtons = document.querySelectorAll('.concept-btn');
    conceptButtons.forEach(button => {
      button.addEventListener('click', () => {
        const concept = button.dataset.concept;
        this.loadConcept(concept);
      });
    });
    
    // Add event listeners to experiment buttons
    const experimentButtons = document.querySelectorAll('.experiment-btn');
    experimentButtons.forEach(button => {
      button.addEventListener('click', () => {
        const experiment = button.dataset.experiment;
        this.loadExperiment(experiment);
      });
    });
    
    // Add event listeners to visualization controls
    const playButton = document.getElementById('viz-play');
    const pauseButton = document.getElementById('viz-pause');
    const vizSelector = document.getElementById('viz-selector');
    
    if (playButton) {
      playButton.addEventListener('click', () => {
        this.playVisualization();
      });
    }
    
    if (pauseButton) {
      pauseButton.addEventListener('click', () => {
        this.pauseVisualization();
      });
    }
    
    if (vizSelector) {
      vizSelector.addEventListener('change', (e) => {
        this.changeVisualization(e.target.value);
      });
    }
  },
  
  // Load information about a quantum concept and insert it into the chat
  loadConcept: function(concept) {
    let message = '';
    
    switch(concept) {
      case 'superposition':
        message = "Please explain quantum superposition in simple terms and give some real-world examples.";
        break;
      case 'entanglement':
        message = "How does quantum entanglement work, and why did Einstein call it 'spooky action at a distance'?";
        break;
      case 'uncertainty':
        message = "Could you explain Heisenberg's Uncertainty Principle and its implications?";
        break;
      case 'waveparticle':
        message = "What is wave-particle duality, and how does the double-slit experiment demonstrate it?";
        break;
      case 'tunneling':
        message = "What is quantum tunneling, and what are some practical applications of this phenomenon?";
        break;
      default:
        message = "Please tell me about basic quantum physics concepts.";
    }
    
    // Insert the message into the chat input and submit
    const chatInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
      chatInput.value = message;
      sendButton.click();
    }
  },
  
  // Load information about a quantum thought experiment and insert it into the chat
  loadExperiment: function(experiment) {
    let message = '';
    
    switch(experiment) {
      case 'schrodinger':
        message = "Explain Schrödinger's Cat thought experiment and what it tells us about quantum mechanics.";
        break;
      case 'doubleslit':
        message = "What happens in the double-slit experiment, and why is it so important to quantum physics?";
        break;
      case 'wigner':
        message = "Could you explain Wigner's Friend thought experiment and its implications for quantum measurement?";
        break;
      case 'epr':
        message = "What is the Einstein-Podolsky-Rosen (EPR) paradox, and how does it relate to quantum entanglement?";
        break;
      default:
        message = "Please explain a famous quantum physics thought experiment.";
    }
    
    // Insert the message into the chat input and submit
    const chatInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
      chatInput.value = message;
      sendButton.click();
    }
  },
  
  // Simple visualization system
  visualizationState: {
    running: false,
    type: 'wave',
    animationFrame: null,
    time: 0
  },
  
  // Initialize the visualization canvas
  initVisualization: function(canvas) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    // Resize the canvas to fit its container
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Start the animation loop
    this.visualizationState.running = true;
    this.animate(canvas, ctx);
  },
  
  // Animation loop for the visualization
  animate: function(canvas, ctx) {
    if (!this.visualizationState.running) return;
    
    this.visualizationState.time += 0.02;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw based on the selected visualization type
    switch(this.visualizationState.type) {
      case 'wave':
        this.drawWaveFunction(canvas, ctx);
        break;
      case 'doubleslit':
        this.drawDoubleSlit(canvas, ctx);
        break;
      case 'entanglement':
        this.drawEntanglement(canvas, ctx);
        break;
      case 'qubits':
        this.drawQubits(canvas, ctx);
        break;
    }
    
    // Continue the animation loop
    this.visualizationState.animationFrame = requestAnimationFrame(() => {
      this.animate(canvas, ctx);
    });
  },
  
  // Draw a wave function visualization
  drawWaveFunction: function(canvas, ctx) {
    const width = canvas.width;
    const height = canvas.height;
    const time = this.visualizationState.time;
    
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(147, 51, 234, 0.8)';
    ctx.lineWidth = 2;
    
    for (let x = 0; x < width; x++) {
      // Create a wave that combines multiple frequencies
      const y = height/2 + 
               Math.sin(x * 0.02 + time) * 20 + 
               Math.sin(x * 0.01 - time * 0.5) * 15;
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw probability density (amplitude squared)
    ctx.beginPath();
    ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
    
    for (let x = 0; x < width; x++) {
      const y1 = height/2 + 
                Math.sin(x * 0.02 + time) * 20 + 
                Math.sin(x * 0.01 - time * 0.5) * 15;
      const y2 = height/2;
      
      if (x === 0) {
        ctx.moveTo(x, y2);
      } else {
        ctx.lineTo(x, y1);
      }
    }
    
    // Connect back to baseline
    ctx.lineTo(width, height/2);
    ctx.closePath();
    ctx.fill();
  },
  
  // Draw a double-slit experiment visualization
  drawDoubleSlit: function(canvas, ctx) {
    const width = canvas.width;
    const height = canvas.height;
    const time = this.visualizationState.time;
    
    // Draw the screen
    ctx.fillStyle = 'rgba(30, 64, 175, 0.3)';
    ctx.fillRect(width - 20, 0, 20, height);
    
    // Draw the double slit barrier
    ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
    ctx.fillRect(width/3, 0, 10, height/2 - 30);
    ctx.fillRect(width/3, height/2 - 10, 10, 20);
    ctx.fillRect(width/3, height/2 + 30, 10, height/2 - 30);
    
    // Draw emitter
    ctx.fillStyle = 'rgba(139, 92, 246, 0.7)';
    ctx.beginPath();
    ctx.arc(20, height/2, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw waves from each slit
    const slit1Y = height/2 - 20;
    const slit2Y = height/2 + 20;
    const slitX = width/3 + 10;
    
    // Draw particles/waves
    for (let i = 0; i < 5; i++) {
      const particleTime = (time + i * 0.5) % 3;
      
      if (particleTime < 1) { // Particle traveling to barrier
        const progress = particleTime;
        const x = 20 + progress * (slitX - 20);
        const y = height/2;
        
        ctx.fillStyle = `rgba(139, 92, 246, ${1 - progress})`;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      } else { // Waves after the barrier
        const progress = particleTime - 1;
        
        // Draw interference pattern
        ctx.beginPath();
        ctx.strokeStyle = `rgba(147, 51, 234, ${0.7 - progress/3})`;
        ctx.lineWidth = 2;
        
        // Draw wave from slit 1
        ctx.beginPath();
        ctx.arc(slitX, slit1Y, progress * 100, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw wave from slit 2
        ctx.beginPath();
        ctx.arc(slitX, slit2Y, progress * 100, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    
    // Draw interference pattern on screen
    for (let y = 0; y < height; y += 10) {
      // Create interference based on distance from slits
      const dist1 = Math.sqrt(Math.pow(width - slitX, 2) + Math.pow(y - slit1Y, 2));
      const dist2 = Math.sqrt(Math.pow(width - slitX, 2) + Math.pow(y - slit2Y, 2));
      
      // Phase difference causes interference
      const phaseDiff = (dist1 - dist2) * 0.2;
      const intensity = (Math.cos(phaseDiff + time) + 1) / 2;
      
      ctx.fillStyle = `rgba(139, 92, 246, ${intensity * 0.8})`;
      ctx.fillRect(width - 15, y, 15, 8);
    }
  },
  
  // Draw a quantum entanglement visualization
  drawEntanglement: function(canvas, ctx) {
    const width = canvas.width;
    const height = canvas.height;
    const time = this.visualizationState.time;
    
    // Draw two entangled particles
    const centerX = width / 2;
    const particleRadius = 10;
    
    // Particle positions move away from center
    const distanceFromCenter = 50 + time * 15;
    const maxDistance = width / 2 - 20;
    
    if (distanceFromCenter <= maxDistance) {
      // Particles moving apart phase
      const p1x = centerX - distanceFromCenter;
      const p2x = centerX + distanceFromCenter;
      const py = height / 2;
      
      // Connection line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
      ctx.setLineDash([5, 5]);
      ctx.moveTo(p1x, py);
      ctx.lineTo(p2x, py);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Wavy entanglement effect
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
      ctx.lineWidth = 1;
      
      for (let x = p1x; x <= p2x; x++) {
        const waveY = Math.sin((x - p1x) / 10 + time * 5) * 10;
        const y = py + waveY;
        
        if (x === p1x) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Particles
      // Particle 1 - changes between "spin up" and "spin down" states
      const p1State = Math.sin(time * 3) > 0 ? 1 : -1;
      
      ctx.beginPath();
      const gradient1 = ctx.createRadialGradient(p1x, py, 0, p1x, py, particleRadius);
      gradient1.addColorStop(0, p1State > 0 ? 'rgba(192, 132, 252, 0.9)' : 'rgba(67, 56, 202, 0.9)');
      gradient1.addColorStop(1, p1State > 0 ? 'rgba(192, 132, 252, 0.1)' : 'rgba(67, 56, 202, 0.1)');
      ctx.fillStyle = gradient1;
      ctx.arc(p1x, py, particleRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Particle 2 - always opposite state of particle 1
      const p2State = -p1State;
      
      ctx.beginPath();
      const gradient2 = ctx.createRadialGradient(p2x, py, 0, p2x, py, particleRadius);
      gradient2.addColorStop(0, p2State > 0 ? 'rgba(192, 132, 252, 0.9)' : 'rgba(67, 56, 202, 0.9)');
      gradient2.addColorStop(1, p2State > 0 ? 'rgba(192, 132, 252, 0.1)' : 'rgba(67, 56, 202, 0.1)');
      ctx.fillStyle = gradient2;
      ctx.arc(p2x, py, particleRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw arrows indicating spin
      ctx.beginPath();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      
      // Particle 1 spin arrow
      ctx.beginPath();
      ctx.moveTo(p1x, py - particleRadius * p1State);
      ctx.lineTo(p1x, py + particleRadius * p1State);
      ctx.moveTo(p1x, py + particleRadius * p1State);
      ctx.lineTo(p1x - 3, py + particleRadius * p1State - 3 * p1State);
      ctx.moveTo(p1x, py + particleRadius * p1State);
      ctx.lineTo(p1x + 3, py + particleRadius * p1State - 3 * p1State);
      ctx.stroke();
      
      // Particle 2 spin arrow
      ctx.beginPath();
      ctx.moveTo(p2x, py - particleRadius * p2State);
      ctx.lineTo(p2x, py + particleRadius * p2State);
      ctx.moveTo(p2x, py + particleRadius * p2State);
      ctx.lineTo(p2x - 3, py + particleRadius * p2State - 3 * p2State);
      ctx.moveTo(p2x, py + particleRadius * p2State);
      ctx.lineTo(p2x + 3, py + particleRadius * p2State - 3 * p2State);
      ctx.stroke();
    } else {
      // Measurement phase - simulating collapse
      const p1x = 30;
      const p2x = width - 30;
      const py = height / 2;
      
      // Measurement effect
      ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.fillRect(0, 0, width/2, height);
      ctx.fillStyle = 'rgba(67, 56, 202, 0.1)';
      ctx.fillRect(width/2, 0, width/2, height);
      
      // Particles after measurement - fixed states
      const p1State = Math.sin(time * 3 + 100) > 0 ? 1 : -1; // Fixed at time of measurement
      const p2State = -p1State; // Always opposite
      
      // Particle 1
      ctx.beginPath();
      const gradient1 = ctx.createRadialGradient(p1x, py, 0, p1x, py, particleRadius);
      gradient1.addColorStop(0, p1State > 0 ? 'rgba(192, 132, 252, 0.9)' : 'rgba(67, 56, 202, 0.9)');
      gradient1.addColorStop(1, p1State > 0 ? 'rgba(192, 132, 252, 0.1)' : 'rgba(67, 56, 202, 0.1)');
      ctx.fillStyle = gradient1;
      ctx.arc(p1x, py, particleRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Particle 2
      ctx.beginPath();
      const gradient2 = ctx.createRadialGradient(p2x, py, 0, p2x, py, particleRadius);
      gradient2.addColorStop(0, p2State > 0 ? 'rgba(192, 132, 252, 0.9)' : 'rgba(67, 56, 202, 0.9)');
      gradient2.addColorStop(1, p2State > 0 ? 'rgba(192, 132, 252, 0.1)' : 'rgba(67, 56, 202, 0.1)');
      ctx.fillStyle = gradient2;
      ctx.arc(p2x, py, particleRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw measurement apparatus
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      
      // Left detector
      ctx.beginPath();
      ctx.arc(p1x, py, particleRadius * 2, 0, Math.PI * 2);
      ctx.stroke();
      
      // Right detector
      ctx.beginPath();
      ctx.arc(p2x, py, particleRadius * 2, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw spin states
      ctx.font = '12px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(p1State > 0 ? '↑' : '↓', p1x, py - 20);
      ctx.fillText(p2State > 0 ? '↑' : '↓', p2x, py - 20);
      
      // Reset animation if it's gone on long enough
      if (time > 15) {
        this.visualizationState.time = 0;
      }
    }
  },
  
  // Draw qubits visualization
  drawQubits: function(canvas, ctx) {
    const width = canvas.width;
    const height = canvas.height;
    const time = this.visualizationState.time;
    
    // Draw Bloch sphere representation of qubits
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;
    
    // Draw sphere
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(147, 51, 234, 0.5)';
    ctx.lineWidth = 1;
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    // X-axis
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX + radius, centerY);
    // Y-axis
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY + radius);
    // Z-axis (perspective)
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * 0.5, centerY - radius * 0.5);
    ctx.stroke();
    
    // Label axes
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('|0⟩', centerX, centerY - radius - 10);
    ctx.fillText('|1⟩', centerX, centerY + radius + 15);
    ctx.fillText('|−⟩', centerX - radius - 15, centerY);
    ctx.fillText('|+⟩', centerX + radius + 15, centerY);
    
    // Draw state vector
    const theta = time % (Math.PI * 2);
    const phi = (time * 0.7) % (Math.PI * 2);
    
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.cos(theta);
    const z = radius * Math.sin(theta) * Math.sin(phi);
    
    // Project to 2D (simple perspective)
    const projX = centerX + x;
    const projY = centerY - y - z * 0.3;
    
    // Draw state vector
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(192, 132, 246, 0.9)';
    ctx.lineWidth = 2;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(projX, projY);
    ctx.stroke();
    
    // Draw arrowhead
    const headSize = 6;
    const angle = Math.atan2(projY - centerY, projX - centerX);
    
    ctx.beginPath();
    ctx.moveTo(projX, projY);
    ctx.lineTo(
      projX - headSize * Math.cos(angle - Math.PI / 6),
      projY - headSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      projX - headSize * Math.cos(angle + Math.PI / 6),
      projY - headSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fillStyle = 'rgba(192, 132, 246, 0.9)';
    ctx.fill();
    
    // Draw endpoint
    ctx.beginPath();
    ctx.arc(projX, projY, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(217, 70, 239, 0.9)';
    ctx.fill();
    
    // Draw quantum state text
    const alpha = Math.cos(theta / 2).toFixed(2);
    const beta = (Math.sin(theta / 2) * Math.exp(1i * phi)).toFixed(2) + 'e^(' + phi.toFixed(1) + 'i)';
    
    ctx.font = '14px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(`|ψ⟩ = ${alpha}|0⟩ + ${beta}|1⟩`, centerX, height - 20);
    
    // Draw superposition probability
    const probZero = Math.cos(theta / 2) * Math.cos(theta / 2);
    const probOne = 1 - probZero;
    
    const barWidth = 120;
    const barHeight = 10;
    const barX = centerX - barWidth / 2;
    const barY = height - 60;
    
    // Draw probability bar background
    ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Draw |0⟩ probability
    ctx.fillStyle = 'rgba(67, 56, 202, 0.8)';
    ctx.fillRect(barX, barY, barWidth * probZero, barHeight);
    
    // Draw |1⟩ probability
    ctx.fillStyle = 'rgba(192, 132, 246, 0.8)';
    ctx.fillRect(barX + barWidth * probZero, barY, barWidth * probOne, barHeight);
    
    // Draw labels
    ctx.font = '12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(`|0⟩: ${(probZero * 100).toFixed(0)}%`, barX + barWidth * probZero / 2, barY - 5);
    ctx.fillText(`|1⟩: ${(probOne * 100).toFixed(0)}%`, barX + barWidth * probZero + barWidth * probOne / 2, barY - 5);
  },
  
  // Play the visualization
  playVisualization: function() {
    if (!this.visualizationState.running) {
      this.visualizationState.running = true;
      
      const canvas = document.getElementById('quantum-canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        this.animate(canvas, ctx);
      }
    }
  },
  
  // Pause the visualization
  pauseVisualization: function() {
    this.visualizationState.running = false;
    
    if (this.visualizationState.animationFrame) {
      cancelAnimationFrame(this.visualizationState.animationFrame);
    }
  },
  
  // Change the visualization type
  changeVisualization: function(type) {
    this.visualizationState.type = type;
    this.visualizationState.time = 0;
  }
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    QuantumThinkerMode.init();
  } else {
    window.addEventListener('load', function() {
      QuantumThinkerMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuantumThinkerMode;
} else {
  window.QuantumThinkerMode = QuantumThinkerMode;
}
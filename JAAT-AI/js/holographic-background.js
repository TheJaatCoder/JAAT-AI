/**
 * JAAT-AI Holographic Background
 * Creates an advanced holographic UI background effect
 */

class HolographicBackground {
    constructor(options = {}) {
        this.options = {
            container: options.container || document.body,
            particleCount: options.particleCount || 100,
            particleColor: options.particleColor || '#7b35e7',
            lineColor: options.lineColor || 'rgba(123, 53, 231, 0.15)',
            particleSpeed: options.particleSpeed || 0.5,
            lineWidth: options.lineWidth || 0.5,
            linkDistance: options.linkDistance || 150,
            interactive: options.interactive !== undefined ? options.interactive : true,
            respondToMouse: options.respondToMouse !== undefined ? options.respondToMouse : true,
            glowIntensity: options.glowIntensity || 0.15,
            glowRadius: options.glowRadius || 150,
            trailEffect: options.trailEffect !== undefined ? options.trailEffect : true,
            pulseEffect: options.pulseEffect !== undefined ? options.pulseEffect : true,
            particleShape: options.particleShape || 'circle', // 'circle', 'square', 'triangle', 'random'
            parallaxIntensity: options.parallaxIntensity || 0.1,
            backgroundGradient: options.backgroundGradient || {
                from: 'rgba(15, 15, 16, 0.7)',
                to: 'rgba(26, 26, 26, 0.7)'
            }
        };

        this.particles = [];
        this.animationFrame = null;
        this.mousePosition = { x: 0, y: 0 };
        this.isActive = false;
        this.canvas = null;
        this.ctx = null;
        this.containerRect = null;
        this.pulsePhase = 0;
        this.devicePixelRatio = window.devicePixelRatio || 1;
        
        this.init();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'holographic-background';
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas style
        Object.assign(this.canvas.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '-1'
        });
        
        this.options.container.insertBefore(this.canvas, this.options.container.firstChild);
        
        // Add gradient background to container if not already set
        const currentBg = window.getComputedStyle(this.options.container).background;
        if (currentBg === 'rgba(0, 0, 0, 0)' || currentBg === 'transparent' || !currentBg) {
            this.options.container.style.background = `linear-gradient(135deg, ${this.options.backgroundGradient.from}, ${this.options.backgroundGradient.to})`;
        }
        
        // Set container position if not already set
        if (window.getComputedStyle(this.options.container).position === 'static') {
            this.options.container.style.position = 'relative';
        }
        
        // Event listeners
        window.addEventListener('resize', this.resize.bind(this));
        if (this.options.respondToMouse) {
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            document.addEventListener('deviceorientation', this.handleDeviceOrientation.bind(this));
        }
        
        this.resize();
        this.createParticles();
        this.start();
    }

    resize() {
        this.containerRect = this.options.container.getBoundingClientRect();
        this.canvas.width = this.containerRect.width * this.devicePixelRatio;
        this.canvas.height = this.containerRect.height * this.devicePixelRatio;
        this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.containerRect.width,
                y: Math.random() * this.containerRect.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * this.options.particleSpeed,
                speedY: (Math.random() - 0.5) * this.options.particleSpeed,
                shape: this.options.particleShape === 'random' ? 
                    ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] : 
                    this.options.particleShape,
                opacity: Math.random() * 0.5 + 0.3,
                pulseSpeed: Math.random() * 0.01 + 0.005
            });
        }
    }

    handleMouseMove(e) {
        this.mousePosition.x = e.clientX - this.containerRect.left;
        this.mousePosition.y = e.clientY - this.containerRect.top;
    }

    handleDeviceOrientation(e) {
        if (e.beta && e.gamma) {
            // Convert device orientation to mouse position
            const x = (e.gamma / 30) * this.containerRect.width / 2 + this.containerRect.width / 2;
            const y = (e.beta / 30) * this.containerRect.height / 2 + this.containerRect.height / 2;
            
            this.mousePosition.x = Math.min(Math.max(x, 0), this.containerRect.width);
            this.mousePosition.y = Math.min(Math.max(y, 0), this.containerRect.height);
        }
    }

    start() {
        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    }

    stop() {
        this.isActive = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    animate() {
        if (!this.isActive) return;
        
        this.ctx.clearRect(0, 0, this.containerRect.width, this.containerRect.height);
        
        // Update pulse phase
        if (this.options.pulseEffect) {
            this.pulsePhase += 0.01;
            if (this.pulsePhase > Math.PI * 2) {
                this.pulsePhase = 0;
            }
        }
        
        // Render mouse glow effect
        if (this.options.respondToMouse && this.options.glowIntensity > 0) {
            const gradient = this.ctx.createRadialGradient(
                this.mousePosition.x, this.mousePosition.y, 0,
                this.mousePosition.x, this.mousePosition.y, this.options.glowRadius
            );
            
            gradient.addColorStop(0, `rgba(123, 53, 231, ${this.options.glowIntensity})`);
            gradient.addColorStop(1, 'rgba(123, 53, 231, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.containerRect.width, this.containerRect.height);
        }
        
        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Add parallax effect if mouse is available
            if (this.options.interactive && this.options.respondToMouse) {
                const dx = this.mousePosition.x - particle.x;
                const dy = this.mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.linkDistance) {
                    const forceX = dx / distance * this.options.parallaxIntensity;
                    const forceY = dy / distance * this.options.parallaxIntensity;
                    
                    particle.x += forceX;
                    particle.y += forceY;
                }
            }
            
            // Boundary checking
            if (particle.x < 0 || particle.x > this.containerRect.width) {
                particle.speedX = -particle.speedX;
            }
            
            if (particle.y < 0 || particle.y > this.containerRect.height) {
                particle.speedY = -particle.speedY;
            }
            
            // Draw connections between particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const otherParticle = this.particles[j];
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.linkDistance) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.options.lineColor;
                    this.ctx.lineWidth = this.options.lineWidth * (1 - distance / this.options.linkDistance);
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            }
            
            // Calculate pulse effect
            let size = particle.size;
            if (this.options.pulseEffect) {
                const pulseFactor = Math.sin(this.pulsePhase + particle.pulseSpeed * 100);
                size *= 1 + pulseFactor * 0.2;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(123, 53, 231, ${particle.opacity})`;
            
            if (particle.shape === 'circle') {
                this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            } else if (particle.shape === 'square') {
                this.ctx.rect(particle.x - size, particle.y - size, size * 2, size * 2);
            } else if (particle.shape === 'triangle') {
                this.ctx.moveTo(particle.x, particle.y - size);
                this.ctx.lineTo(particle.x + size, particle.y + size);
                this.ctx.lineTo(particle.x - size, particle.y + size);
            }
            
            this.ctx.fill();
        });
        
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }

    destroy() {
        this.stop();
        document.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('resize', this.resize);
        document.removeEventListener('deviceorientation', this.handleDeviceOrientation);
        this.canvas.remove();
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Create holographic background for the body
    new HolographicBackground({
        container: document.body,
        particleCount: 120,
        particleShape: 'random',
        lineWidth: 0.6,
        linkDistance: 180,
        particleSpeed: 0.3,
        glowIntensity: 0.2,
        pulseEffect: true,
        trailEffect: true,
        backgroundGradient: {
            from: 'rgba(10, 10, 10, 0.9)',
            to: 'rgba(20, 20, 20, 0.9)'
        }
    });
});
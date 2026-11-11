/**
 * Confetti & Victory Particle Engine for "Millioner: ATT Talabalari Maxsus"
 * Generates dazzling game show victory confetti & fireworks effects on pure Canvas.
 */

class ConfettiManager {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animating = false;
        this.colors = ['#ffd700', '#00d4ff', '#8b5cf6', '#22c55e', '#ec4899', '#ffffff', '#38bdf8'];
    }

    init() {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'confetti-canvas';
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100vw';
            this.canvas.style.height = '100vh';
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.zIndex = '99999';
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            window.addEventListener('resize', () => this.resize());
        }
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    burst(options = {}) {
        this.init();
        const count = options.count || 120;
        const originX = options.x !== undefined ? options.x : window.innerWidth / 2;
        const originY = options.y !== undefined ? options.y : window.innerHeight * 0.35;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 4 + Math.random() * 12;
            this.particles.push({
                x: originX,
                y: originY,
                vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
                vy: Math.sin(angle) * speed - (2 + Math.random() * 6),
                size: 6 + Math.random() * 8,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 12,
                opacity: 1,
                decay: 0.006 + Math.random() * 0.008,
                gravity: 0.22,
                shape: Math.random() > 0.4 ? 'rect' : 'circle'
            });
        }

        if (!this.animating) {
            this.animating = true;
            this.loop();
        }
    }

    grandCelebration() {
        // Multi-burst salute from left, right, and center
        this.burst({ x: window.innerWidth * 0.2, y: window.innerHeight * 0.4, count: 90 });
        setTimeout(() => {
            this.burst({ x: window.innerWidth * 0.8, y: window.innerHeight * 0.4, count: 90 });
        }, 300);
        setTimeout(() => {
            this.burst({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.3, count: 140 });
        }, 650);
    }

    loop() {
        if (!this.animating) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.985;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;

            if (p.opacity <= 0 || p.y > this.canvas.height + 20) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.opacity);
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.fillStyle = p.color;

            if (p.shape === 'rect') {
                this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.loop());
        } else {
            this.animating = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

window.confettiManager = new ConfettiManager();


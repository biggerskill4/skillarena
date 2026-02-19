const heroCanvas = document.querySelector('.hero-canvas');
const ctx = heroCanvas.getContext('2d');
const banner = document.querySelector('.hero');

function resizeCanvas() {
    // Set canvas size exactly to banner
    heroCanvas.width = banner.clientWidth;
    heroCanvas.height = banner.clientHeight;

    // Reinitialize particles
    init();
}


const maxParticles = 100;
const colors = ['#ff6b6b', '#f06595', '#845ef7', '#5c7cfa', '#339af0'];
const shapes = ['circle', 'square', 'triangle', 'cross'];
let gravityOn = false;

class Particle {
    constructor(x, y, radius, color, type) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.originalRadius = radius;
        this.color = color;
        this.dx = (Math.random() - 0.5) * 1;
        this.dy = (Math.random() - 0.5) * 1;
        this.type = type;
    };
    draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();

        switch (this.type) {
            case 'circle':
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.stroke();
                break;

            case 'square':
                // ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
                ctx.strokeRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
                break;

            case 'triangle':
                ctx.moveTo(this.x, this.y - this.radius);
                ctx.lineTo(this.x - this.radius, this.y + this.radius);
                ctx.lineTo(this.x + this.radius, this.y + this.radius);
                ctx.closePath();
                ctx.stroke();
                break;

            case 'cross':
                ctx.moveTo(this.x - this.radius, this.y - this.radius);
                ctx.lineTo(this.x + this.radius, this.y + this.radius);
                ctx.moveTo(this.x + this.radius, this.y - this.radius);
                ctx.lineTo(this.x - this.radius, this.y + this.radius);
                ctx.stroke();
                break;
        }
    };
    update() {
        if (gravityOn) {
            this.dy += 0.99;
            this.dx *= 0.99;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > heroCanvas.width || this.x - this.radius < 0) {
            this.dx *= -1;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.dy *= -0.5;
        }

        if (this.y + this.radius > heroCanvas.height) {
            this.y = heroCanvas.height - this.radius;
            this.dy *= -0.8;
        }

        this.draw();
    }

};


window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'g') {
        gravityOn = true;
    }
    if (e.key.toLowerCase() === 'r') {
        gravityOn = false;
        init();
    }
});


let particles = [];

function init() {
    particles = [];
    for (let i = 0; i < maxParticles; i++) {
        let radius = Math.random() * 10 + 1;
        particles.push(new Particle(
            Math.random() * (heroCanvas.width - radius * 2) + radius,
            Math.random() * (heroCanvas.height - radius * 2) + radius,
            radius,
            colors[Math.floor(Math.random() * colors.length)],
            shapes[Math.floor(Math.random() * shapes.length)]
        ));
    }
}
init()

function animateParticles() {
    ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    particles.forEach(particle => {
        particle.update();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Initial setup
resizeCanvas();

// Window resize
window.addEventListener('resize', resizeCanvas);
const heroCanvas = document.querySelector('.hero-canvas');
const ctx = heroCanvas.getContext('2d');

heroCanvas.width = window.innerWidth;
heroCanvas.height = window.innerHeight;

const maxParticles = 200;
const colors = ['#ff6b6b', '#f06595', '#845ef7', '#5c7cfa', '#339af0'];
const shapes = ['circle', 'square', 'triangle', 'cross'];

class Particle {
    constructor(x, y, radius, color, type) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
        this.type = type;
    };
    draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
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
        if (this.x + this.radius > heroCanvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        };
        if (this.y + this.radius > heroCanvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        };
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
};


let particles = [];

function init() {
    particles = []; 
    for (let i = 0; i < maxParticles; i++) {
        let radius = Math.random() * 10 + 2;
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

function animate() {
    ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    particles.forEach(particle => {
        particle.update();
    });
    requestAnimationFrame(animate);
}

animate();
window.addEventListener('resize', () => {
    heroCanvas.width = window.innerWidth;
    heroCanvas.height = window.innerHeight;
    init();
});
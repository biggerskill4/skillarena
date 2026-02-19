const canvas = document.querySelector('canvas.playerCanvas');
const c = canvas.getContext('2d');
const playBtn = document.querySelector('.playBtn');
let btnIcon = playBtn.querySelector('ion-icon');
const gameTitle = document.querySelector('.game-title');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Player {
    constructor(x, y, radius, pHeight, pWidth, color) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = (Math.random() - 0.5) * 2;
        this.radius = radius;
        this.color = color;
        this.height = pHeight;
        this.width = pWidth;
        this.jumpCounter = 0;
        this.maxJump = 2;
    }

    draw() {
        c.beginPath();
        c.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    }
    update() {
        // gravity
        this.dy += 1;
        this.y += this.dy;

        // ground collision
        if (this.y + this.height / 2 > canvas.height) {
            this.y = canvas.height - this.height / 2;
            this.dy = 0;
            this.jumpCounter = 0;
        }
        if (this.y - this.height / 2 < 0) {
            this.y = this.height / 2;
            this.dy += 1;
        }

        // horizontal collision
        if (this.x + this.width / 2 > canvas.width) {
            this.x = canvas.width - this.width / 2;
            this.dx = 0;
        }

        if (this.x - this.width / 2 < 0) {
            this.x = this.width / 2;
            this.dx = 0;
        }

        // move
        this.x += this.dx;

        // draw
        this.draw();
    }
}


const players = [];

function initPlayer() {
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let pHeight = 100;
    let pWidth = 50;
    let pColor = '#ff6200';
    players.push(new Player(x, y, 50, pHeight, pWidth, pColor));
}


let isPlaying = false;

// play functionality
playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isPlaying = !isPlaying;
    playBtn.classList.toggle('playing');
    playBtn.classList.toggle('active');

    const p = players[0];

    if (!isPlaying) {
        p.dx = 0;
        p.dy = 0;
    }

    if (playBtn.classList.contains('playing')) {
        btnIcon.setAttribute('name', 'pause');
        gameTitle.style.opacity = 0;

    } else {
        btnIcon.setAttribute('name', 'play');
        gameTitle.textContent = 'Pause';
        gameTitle.style.opacity = 1;
    }
});

window.addEventListener('keydown', (e) => {
    if (!isPlaying) return;

    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            const p = players[0];
            if (p.jumpCounter < p.maxJump) {
                p.dy = -25;
                p.jumpCounter++;
            }
            break;
        case 'a':
        case 'ArrowLeft':
            players[0].dx = -5;
            break;
        case 'd':
        case 'ArrowRight':
            players[0].dx = 5;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    if (!isPlaying) return;
    switch (e.key) {
        case 'a':
        case 'ArrowLeft':
            players[0].dx = 0;
            break;
        case 'd':
        case 'ArrowRight':
            players[0].dx = 0;
            break;
    }
});

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    players.forEach(player => {
        if (isPlaying) {
            player.update();
        } else {
            player.draw();
        }
    });
}

initPlayer();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
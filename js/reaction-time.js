// Reaction Time Game Variables
let totalRounds = 10;
let currentRound = 0;
let gameActive = false;
let testStartTime = 0;
let reactionTimes = [];

// DOM Elements
const reactionStart = document.querySelector('.reaction-start');
const reactionGame = document.querySelector('.reaction-game');
const reactionResults = document.querySelector('.reaction-results');
const startReactionBtn = document.querySelector('.start-reaction');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const reactionBtn = document.getElementById('reaction-btn');
const currentRoundEl = document.getElementById('current-round');
const totalRoundsEl = document.getElementById('total-rounds');
const reactionStatusEl = document.getElementById('reaction-status');
const bestTimeEl = document.getElementById('best-time');
const restartReactionBtn = document.querySelector('.restart-reaction');
const avgTimeEl = document.getElementById('avg-time');
const bestTimeResultEl = document.getElementById('best-time-result');
const worstTimeResultEl = document.getElementById('worst-time-result');

// Select Difficulty (Rounds)
difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        difficultyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        totalRounds = parseInt(btn.dataset.rounds);
        startGame();
    });
});

function startGame() {
    currentRound = 0;
    reactionTimes = [];
    
    reactionGame.classList.remove('hidden');
    totalRoundsEl.textContent = totalRounds;
    
    nextRound();
}

function nextRound() {
    if (currentRound >= totalRounds) {
        showResults();
        return;
    }
    
    currentRound++;
    currentRoundEl.textContent = currentRound;
    reactionStatusEl.textContent = '';
    
    reactionBtn.textContent = 'Wait for green...';
    reactionBtn.classList.remove('green', 'clicked');
    reactionBtn.disabled = true;
    
    const delay = Math.random() * 3000 + 2000; // 2-5 seconds
    
    setTimeout(() => {
        reactionBtn.textContent = 'CLICK NOW!';
        reactionBtn.classList.add('green');
        reactionBtn.disabled = false;
        testStartTime = Date.now();
        gameActive = true;
    }, delay);
}

reactionBtn.addEventListener('click', () => {
    if (!gameActive) return;
    
    gameActive = false;
    
    const reactionTime = Date.now() - testStartTime;
    reactionTimes.push(reactionTime);
    
    reactionBtn.classList.remove('green');
    reactionBtn.classList.add('clicked');
    reactionBtn.disabled = true;
    reactionBtn.textContent = reactionTime + 'ms';
    
    // Update best time
    const bestTime = Math.min(...reactionTimes);
    bestTimeEl.textContent = bestTime + 'ms';
    
    // Feedback
    if (reactionTime < 200) {
        reactionStatusEl.textContent = 'WOW! That was FAST! 🚀';
        reactionStatusEl.classList.add('fast');
    } else if (reactionTime < 300) {
        reactionStatusEl.textContent = 'Great reaction time! ⚡';
        reactionStatusEl.classList.add('fast');
    } else if (reactionTime < 400) {
        reactionStatusEl.textContent = 'Good! 👍';
        reactionStatusEl.classList.remove('fast', 'slow');
    } else if (reactionTime < 500) {
        reactionStatusEl.textContent = 'A bit slow... 🐢';
        reactionStatusEl.classList.add('slow');
    } else {
        reactionStatusEl.textContent = 'Very slow! Try harder! 😅';
        reactionStatusEl.classList.add('slow');
    }
    
    setTimeout(() => {
        nextRound();
    }, 1500);
});

function showResults() {
    reactionGame.classList.add('hidden');
    reactionResults.classList.remove('hidden');
    
    const avgTime = Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length);
    const bestTime = Math.min(...reactionTimes);
    const worstTime = Math.max(...reactionTimes);
    
    avgTimeEl.textContent = avgTime + 'ms';
    bestTimeResultEl.textContent = bestTime + 'ms';
    worstTimeResultEl.textContent = worstTime + 'ms';
}

restartReactionBtn.addEventListener('click', () => {
    reactionResults.classList.add('hidden');
    reactionGame.classList.add('hidden');
    difficultyBtns.forEach(b => b.classList.remove('active'));
});

// Memory Card Game Variables
const symbols = ['🎮', '🎨', '🎭', '🎪', '🎬', '🎤', '🎧', '🎵'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let gameStartTime = 0;
let gameActive = true;
let gridSize = 4; // Easy: 4x4 (8 pairs), Medium: 6x6 (18 pairs), Hard: 8x8 (32 pairs)

// DOM Elements
const memoryStart = document.querySelector('.memory-start');
const memoryGame = document.querySelector('.memory-game');
const memoryResults = document.querySelector('.memory-results');
const startMemoryBtn = document.querySelector('.start-memory');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const memoryGrid = document.getElementById('memory-grid');
const movesEl = document.getElementById('moves');
const pairsEl = document.getElementById('pairs');
const totalPairsEl = document.getElementById('total-pairs');
const resetBtn = document.querySelector('.reset-btn');
const restartMemoryBtn = document.querySelector('.restart-memory');
const finalMovesEl = document.getElementById('final-moves');
const finalTimeEl = document.getElementById('final-time');

// Difficulty Settings
const difficultySettings = {
    easy: { size: 4, pairs: 8 },
    medium: { size: 6, pairs: 18 },
    hard: { size: 8, pairs: 32 }
};

// Select Difficulty
difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        difficultyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const difficulty = btn.dataset.difficulty;
        startGame(difficulty);
    });
});

function startGame(difficulty) {
    const settings = difficultySettings[difficulty];
    gridSize = settings.size;
    const totalPairs = settings.pairs;
    
    memoryGame.classList.remove('hidden');
    
    totalPairsEl.textContent = totalPairs;
    moves = 0;
    matchedPairs = 0;
    movesEl.textContent = moves;
    pairsEl.textContent = matchedPairs;
    gameActive = true;
    gameStartTime = Date.now();
    
    initializeGame(gridSize, totalPairs);
}

function initializeGame(size, totalPairs) {
    // Create card array
    cards = [];
    const symbolArray = [];
    
    for (let i = 0; i < totalPairs; i++) {
        symbolArray.push(symbols[i % symbols.length]);
        symbolArray.push(symbols[i % symbols.length]);
    }
    
    // Shuffle
    for (let i = symbolArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [symbolArray[i], symbolArray[j]] = [symbolArray[j], symbolArray[i]];
    }
    
    cards = symbolArray.map((symbol, index) => ({
        id: index,
        symbol: symbol,
        flipped: false,
        matched: false
    }));
    
    renderGrid();
}

function renderGrid() {
    memoryGrid.innerHTML = '';
    memoryGrid.className = `memory-grid grid-${gridSize}x${gridSize}`;
    
    cards.forEach(card => {
        const cardEl = document.createElement('button');
        cardEl.className = 'memory-card';
        cardEl.dataset.id = card.id;
        
        cardEl.textContent = card.flipped || card.matched ? card.symbol : '?';
        
        if (card.matched) {
            cardEl.classList.add('matched');
            cardEl.disabled = true;
        }
        
        if (card.flipped && !card.matched) {
            cardEl.classList.add('flipped');
        }
        
        cardEl.addEventListener('click', () => flipCard(card, cardEl));
        memoryGrid.appendChild(cardEl);
    });
}

function flipCard(card, cardEl) {
    if (!gameActive || card.matched || card.flipped || flippedCards.length >= 2) return;
    
    card.flipped = true;
    cardEl.classList.add('flipped');
    cardEl.textContent = card.symbol;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        movesEl.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.symbol === card2.symbol) {
        card1.matched = true;
        card2.matched = true;
        matchedPairs++;
        pairsEl.textContent = matchedPairs;
        
        const totalPairs = parseInt(totalPairsEl.textContent);
        if (matchedPairs === totalPairs) {
            setTimeout(showResults, 500);
        }
        
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.flipped = false;
            card2.flipped = false;
            flippedCards = [];
            renderGrid();
        }, 800);
    }
}

resetBtn.addEventListener('click', () => {
    const currentSize = gridSize;
    const totalPairs = parseInt(totalPairsEl.textContent);
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    movesEl.textContent = moves;
    pairsEl.textContent = matchedPairs;
    gameStartTime = Date.now();
    
    initializeGame(currentSize, totalPairs);
});

function showResults() {
    gameActive = false;
    const gameDuration = Math.floor((Date.now() - gameStartTime) / 1000);
    
    memoryGame.classList.add('hidden');
    memoryResults.classList.remove('hidden');
    
    finalMovesEl.textContent = moves;
    finalTimeEl.textContent = gameDuration;
}

restartMemoryBtn.addEventListener('click', () => {
    memoryResults.classList.add('hidden');
    memoryGame.classList.add('hidden');
    difficultyBtns.forEach(b => b.classList.remove('active'));
});

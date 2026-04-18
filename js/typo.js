// Typing Speed Test Game
const typingTexts = {
    easy: [
        "The quick brown fox jumps over the lazy dog",
        "JavaScript is a programming language",
        "Web development is fun and exciting",
        "Practice makes perfect",
        "Type carefully and think clearly",
        "Coding is creative problem solving",
        "Learn by doing and practicing",
        "Never stop learning new things",
        "Speed and accuracy matter in typing",
        "Have fun while building projects"
    ],
    medium: [
        "React is a JavaScript library for building user interfaces with reusable components",
        "TypeScript adds static typing to JavaScript making code more reliable and maintainable",
        "Modern web development requires knowledge of HTML CSS and JavaScript fundamentals",
        "Web accessibility ensures that websites work for everyone including people with disabilities",
        "Version control systems like Git help teams collaborate on code and track changes effectively",
        "Object-oriented programming uses classes and objects to organize and structure code",
        "Responsive web design makes websites look great on all devices and screen sizes",
        "Testing is crucial for catching bugs and ensuring that software works as expected",
        "Cloud computing provides scalable infrastructure for deploying and running applications",
        "API endpoints allow different applications to communicate and share data securely"
    ],
    hard: [
        "Implementing efficient algorithms and data structures is fundamental to writing performant code that scales well with large datasets",
        "Asynchronous programming in JavaScript using callbacks promises and async await enables non-blocking operations for improved performance",
        "Design patterns like MVC MVP MVVM and architectural patterns help organize code and improve maintainability across large applications",
        "Browser rendering engines parse HTML apply CSS styles and execute JavaScript to transform source code into visual web pages",
        "Security considerations including input validation output encoding authentication and encryption protect applications from vulnerabilities",
        "Load balancing and caching strategies distribute traffic and improve response times for high-traffic web applications",
        "Microservices architecture breaks monolithic applications into smaller independent services that can be deployed and scaled independently",
        "Continuous integration and continuous deployment pipelines automate testing building and releasing software to production environments",
        "Memory management garbage collection and performance profiling tools help identify and fix memory leaks and bottlenecks",
        "GraphQL queries enable clients to request only the specific data they need reducing bandwidth and improving application performance"
    ]
};

let currentDifficulty = null;
let gameStarted = false;
let startTime = 0;
let currentText = '';
let correctChars = 0;
let totalChars = 0;
let wpm = 0;
let accuracy = 0;

// Initialize function
function initTypingGame() {
    setupEventListeners();
}

function setupEventListeners() {
    // Start button - removed since it's deleted from HTML
    
    // Difficulty buttons
    document.querySelectorAll('.typing-start .difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentDifficulty = btn.dataset.difficulty;
            startGame();
        });
    });

    // Reset button
    const resetBtn = document.querySelector('.reset-typing');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
    }

    // Restart button
    const restartBtn = document.querySelector('.restart-typing');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            document.querySelector('.typing-results').classList.add('hidden');
            document.querySelector('.typing-game').classList.add('hidden');
        });
    }

    // Typing input
    const input = document.getElementById('typing-input');
    if (input) {
        input.addEventListener('input', handleTyping);
        input.addEventListener('focus', () => {
            if (!gameStarted) {
                startTime = Date.now();
                gameStarted = true;
                updateStats();
            }
        });
    }
}

function startGame() {
    document.querySelector('.typing-game').classList.remove('hidden');

    // Select random text
    const texts = typingTexts[currentDifficulty];
    currentText = texts[Math.floor(Math.random() * texts.length)];
    
    document.getElementById('typing-text').textContent = currentText;
    
    const input = document.getElementById('typing-input');
    input.value = '';
    input.focus();
    
    gameStarted = false;
    correctChars = 0;
    totalChars = 0;
    startTime = 0;
}

function handleTyping(e) {
    const input = e.target.value;
    totalChars = input.length;
    
    // Calculate correct characters
    correctChars = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === currentText[i]) {
            correctChars++;
        }
    }
    
    // Check if completed
    if (input === currentText) {
        endGame();
    }
    
    updateStats();
}

function updateStats() {
    if (!gameStarted) return;
    
    const timeElapsed = (Date.now() - startTime) / 1000;
    const minutes = timeElapsed / 60;
    
    // WPM calculation (average 5 chars = 1 word)
    const words = correctChars / 5;
    wpm = Math.round(words / minutes);
    
    // Accuracy calculation
    accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    
    // Update display
    document.getElementById('wpm-display').textContent = wpm || 0;
    document.getElementById('accuracy-display').textContent = accuracy;
    document.getElementById('time-display').textContent = Math.floor(timeElapsed);
    
    // Update text highlighting
    const textSpan = document.getElementById('typing-text');
    let highlightedText = '';
    for (let i = 0; i < currentText.length; i++) {
        if (i < document.getElementById('typing-input').value.length) {
            if (document.getElementById('typing-input').value[i] === currentText[i]) {
                highlightedText += `<span class="correct">${currentText[i]}</span>`;
            } else {
                highlightedText += `<span class="incorrect">${currentText[i]}</span>`;
            }
        } else {
            highlightedText += currentText[i];
        }
    }
    textSpan.innerHTML = highlightedText;
}

function endGame() {
    gameStarted = false;
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    
    document.querySelector('.typing-game').classList.add('hidden');
    document.querySelector('.typing-results').classList.remove('hidden');
    
    document.getElementById('final-wpm').textContent = wpm;
    document.getElementById('final-accuracy').textContent = accuracy + '%';
    document.getElementById('final-time').textContent = totalTime + 's';
}

function resetGame() {
    const input = document.getElementById('typing-input');
    input.value = '';
    gameStarted = false;
    startTime = 0;
    correctChars = 0;
    totalChars = 0;
    
    document.getElementById('typing-text').innerHTML = currentText;
    document.getElementById('wpm-display').textContent = '0';
    document.getElementById('accuracy-display').textContent = '0';
    document.getElementById('time-display').textContent = '0';
    
    input.focus();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTypingGame);

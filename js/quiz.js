// Quiz Data
const quizData = {
    easy: [
        { question: "What is the capital of France?", options: ["London", "Paris", "Berlin", "Madrid"], answer: 1 },
        { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
        { question: "Who wrote Romeo and Juliet?", options: ["Jane Austen", "Mark Twain", "William Shakespeare", "Charles Dickens"], answer: 2 },
        { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
        { question: "What color is the sky?", options: ["Blue", "Green", "Red", "Yellow"], answer: 0 },
        { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
        { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 },
        { question: "Which animal is the fastest on land?", options: ["Lion", "Cheetah", "Horse", "Greyhound"], answer: 1 },
        { question: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], answer: 2 }
    ],
    medium: [
        { question: "What is the molecular structure of glucose?", options: ["C5H10O5", "C6H12O6", "C7H14O7", "C4H8O4"], answer: 1 },
        { question: "In which year did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: 2 },
        { question: "Who painted the Mona Lisa?", options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"], answer: 1 },
        { question: "What is the capital of Japan?", options: ["Osaka", "Kyoto", "Tokyo", "Hiroshima"], answer: 2 },
        { question: "Which element has atomic number 8?", options: ["Nitrogen", "Oxygen", "Carbon", "Hydrogen"], answer: 1 },
        { question: "How many bones are in the human body?", options: ["186", "206", "226", "246"], answer: 1 },
        { question: "What is the speed of light?", options: ["3x10^8 m/s", "2x10^8 m/s", "4x10^8 m/s", "1x10^8 m/s"], answer: 0 },
        { question: "Which country is the largest by area?", options: ["Canada", "China", "United States", "Russia"], answer: 3 },
        { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: 1 },
        { question: "Who invented the telephone?", options: ["Edison", "Bell", "Tesla", "Marconi"], answer: 1 }
    ],
    hard: [
        { question: "What is the only mammal capable of true flight?", options: ["Flying squirrel", "Flying fish", "Bat", "Flying lemur"], answer: 2 },
        { question: "Which philosopher wrote 'Critique of Pure Reason'?", options: ["Hegel", "Kant", "Nietzsche", "Schopenhauer"], answer: 1 },
        { question: "What is the Heisenberg Uncertainty Principle about?", options: ["Energy conservation", "Position and momentum", "Speed and acceleration", "Mass and weight"], answer: 1 },
        { question: "Which country has the longest coastline?", options: ["Indonesia", "Philippines", "Canada", "Russia"], answer: 2 },
        { question: "What is the most abundant element in the universe?", options: ["Helium", "Hydrogen", "Oxygen", "Carbon"], answer: 1 },
        { question: "Who won the Nobel Prize in Physics in 1921?", options: ["Einstein", "Bohr", "Planck", "de Broglie"], answer: 0 },
        { question: "What is the only letter that doesn't appear on the periodic table?", options: ["J", "Q", "X", "Z"], answer: 1 },
        { question: "Which paradox is also known as Achilles and the tortoise?", options: ["Grandfather paradox", "Zeno's paradox", "Liar's paradox", "Bootstrap paradox"], answer: 1 },
        { question: "What is the Planck length in meters?", options: ["1.616x10^-35m", "1.616x10^-25m", "1.616x10^-45m", "1.616x10^-55m"], answer: 0 },
        { question: "Which mathematical constant is also known as Euler's number?", options: ["π", "e", "φ", "γ"], answer: 1 }
    ]
};

let currentDifficulty = null;
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answeredQuestions = [];

// DOM Elements
const quizStart = document.querySelector('.quiz-start');
const quizContainer = document.querySelector('.quiz-container');
const quizResults = document.querySelector('.quiz-results');
const startBtn = document.querySelector('.start-quiz');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const questionEl = document.getElementById('quiz-question');
const optionBtns = document.querySelectorAll('.option-btn');
const nextBtn = document.querySelector('.next-btn');
const scoreEl = document.getElementById('score');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const progressFill = document.querySelector('.progress-fill');
const finalScoreEl = document.getElementById('final-score');
const resultMessageEl = document.getElementById('result-message');
const restartBtn = document.querySelector('.restart-quiz');

// Start Quiz - removed since button is deleted
// Select Difficulty
difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        difficultyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDifficulty = btn.dataset.difficulty;
        startQuiz();
    });
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    answeredQuestions = [];
    
    quizContainer.classList.remove('hidden');
    totalQuestionsEl.textContent = quizData[currentDifficulty].length;
    
    loadQuestion();
}

function loadQuestion() {
    const questions = quizData[currentDifficulty];
    const currentQuestion = questions[currentQuestionIndex];
    
    questionEl.textContent = currentQuestion.question;
    optionBtns.forEach((btn, index) => {
        btn.textContent = currentQuestion.options[index];
        btn.classList.remove('selected', 'correct', 'incorrect');
        btn.disabled = false;
    });
    
    selectedAnswer = null;
    nextBtn.disabled = true;
    
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    updateProgressBar();
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData[currentDifficulty].length) * 100;
    progressFill.style.width = progress + '%';
}

optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (selectedAnswer !== null) return;
        
        const questions = quizData[currentDifficulty];
        const currentQuestion = questions[currentQuestionIndex];
        const selectedIndex = parseInt(btn.dataset.index);
        
        selectedAnswer = selectedIndex;
        
        optionBtns.forEach(b => b.disabled = true);
        
        if (selectedIndex === currentQuestion.answer) {
            btn.classList.add('correct');
            score++;
            scoreEl.textContent = score;
        } else {
            btn.classList.add('incorrect');
            optionBtns[currentQuestion.answer].classList.add('correct');
        }
        
        optionBtns.forEach((b, index) => {
            if (index !== selectedIndex) {
                b.classList.add('selected');
            }
        });
        
        nextBtn.disabled = false;
    });
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData[currentDifficulty].length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizContainer.classList.add('hidden');
    quizResults.classList.remove('hidden');
    
    const percentage = (score / quizData[currentDifficulty].length) * 100;
    finalScoreEl.textContent = score;
    
    let message = '';
    if (percentage === 100) {
        message = "Perfect score! You're a quiz master! 🏆";
    } else if (percentage >= 80) {
        message = "Excellent! You really know your stuff! 🌟";
    } else if (percentage >= 60) {
        message = "Good job! Keep learning! 📚";
    } else if (percentage >= 40) {
        message = "Not bad! Practice makes perfect! 💪";
    } else {
        message = "Keep trying! You'll improve! 🎯";
    }
    
    resultMessageEl.textContent = message;
}

restartBtn.addEventListener('click', () => {
    quizResults.classList.add('hidden');
    quizContainer.classList.add('hidden');
    difficultyBtns.forEach(b => b.classList.remove('active'));
});

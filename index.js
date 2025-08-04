// Quiz Questions Database
const quizQuestions = [
    // Regular Verbs - Basic Formation
    {
        question: "What is the past tense of 'walk'?",
        options: ["walked", "walk", "walking", "walks"],
        correct: 0,
        type: "regular",
        explanation: "Regular verbs add '-ed' to form the past tense."
    },
    {
        question: "What is the past tense of 'play'?",
        options: ["play", "played", "playing", "plays"],
        correct: 1,
        type: "regular",
        explanation: "Regular verbs add '-ed' to form the past tense."
    },
    {
        question: "What is the past tense of 'like'?",
        options: ["likeed", "liked", "liking", "likes"],
        correct: 1,
        type: "regular",
        explanation: "When a verb ends in 'e', we only add '-d'."
    },
    {
        question: "What is the past tense of 'hope'?",
        options: ["hoped", "hopeed", "hoping", "hopes"],
        correct: 0,
        type: "regular",
        explanation: "When a verb ends in 'e', we only add '-d'."
    },
    {
        question: "What is the past tense of 'try'?",
        options: ["tryed", "trying", "tried", "trys"],
        correct: 2,
        type: "regular",
        explanation: "When a verb ends in consonant + 'y', change 'y' to 'i' and add '-ed'."
    },
    {
        question: "What is the past tense of 'study'?",
        options: ["studyed", "studied", "studying", "studys"],
        correct: 1,
        type: "regular",
        explanation: "When a verb ends in consonant + 'y', change 'y' to 'i' and add '-ed'."
    },
    {
        question: "What is the past tense of 'stop'?",
        options: ["stoped", "stopped", "stopping", "stops"],
        correct: 1,
        type: "regular",
        explanation: "One syllable verbs ending in consonant-vowel-consonant double the final consonant and add '-ed'."
    },
    {
        question: "What is the past tense of 'plan'?",
        options: ["planed", "planned", "planning", "plans"],
        correct: 1,
        type: "regular",
        explanation: "One syllable verbs ending in consonant-vowel-consonant double the final consonant and add '-ed'."
    },
    
    // Irregular Verbs - Common Patterns
    {
        question: "What is the past tense of 'go'?",
        options: ["goed", "went", "going", "goes"],
        correct: 1,
        type: "irregular",
        explanation: "'Go' is an irregular verb that completely transforms to 'went'."
    },
    {
        question: "What is the past tense of 'see'?",
        options: ["seed", "seen", "saw", "seeing"],
        correct: 2,
        type: "irregular",
        explanation: "'See' is an irregular verb that changes to 'saw' in the past tense."
    },
    {
        question: "What is the past tense of 'sing'?",
        options: ["singed", "sung", "sang", "singing"],
        correct: 2,
        type: "irregular",
        explanation: "'Sing' follows a vowel change pattern: sing → sang."
    },
    {
        question: "What is the past tense of 'cut'?",
        options: ["cutted", "cut", "cutting", "cuts"],
        correct: 1,
        type: "irregular",
        explanation: "Some irregular verbs like 'cut' don't change from present to past."
    },
    {
        question: "What is the past tense of 'buy'?",
        options: ["buyed", "bought", "buying", "buys"],
        correct: 1,
        type: "irregular",
        explanation: "'Buy' completely transforms to 'bought' in the past tense."
    },
    {
        question: "What is the past tense of 'make'?",
        options: ["maked", "made", "making", "makes"],
        correct: 1,
        type: "irregular",
        explanation: "'Make' has an internal consonant change to become 'made'."
    },
    {
        question: "What is the past tense of 'think'?",
        options: ["thinked", "thought", "thinking", "thinks"],
        correct: 1,
        type: "irregular",
        explanation: "'Think' completely transforms to 'thought' in the past tense."
    }
];

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];
let quizCompleted = false;

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progressBar = document.getElementById('progress');
const resultsSection = document.getElementById('results');
const finalScore = document.getElementById('final-score');
const correctAnswers = document.getElementById('correct-answers');
const totalQuestionsResult = document.getElementById('total-questions-result');
const performanceMessage = document.getElementById('performance-message');
const mistakeReview = document.getElementById('mistake-review');
const mistakesList = document.getElementById('mistakes-list');

// Initialize Quiz
function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    userAnswers = [];
    quizCompleted = false;
    
    // Update total questions display
    totalQuestionsSpan.textContent = quizQuestions.length;
    totalQuestionsResult.textContent = quizQuestions.length;
    
    // Hide results and show quiz
    resultsSection.style.display = 'none';
    document.querySelector('.quiz-content').style.display = 'block';
    restartBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    
    // Load first question
    loadQuestion();
}

// Load Current Question
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // Update question text
    questionText.textContent = question.question;
    
    // Update progress
    updateProgress();
    
    // Update question counter
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option elements
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Reset button state
    nextBtn.disabled = true;
    selectedAnswer = null;
}

// Handle Option Selection
function selectOption(optionIndex) {
    // Prevent selection if already answered
    const options = document.querySelectorAll('.option');
    if (options[0].classList.contains('disabled')) return;
    
    // Remove previous selection
    options.forEach(option => option.classList.remove('selected'));
    
    // Select current option
    options[optionIndex].classList.add('selected');
    selectedAnswer = optionIndex;
    
    // Enable next button
    nextBtn.disabled = false;
}

// Handle Next Button Click
function handleNextQuestion() {
    if (selectedAnswer === null) return;
    
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Store user's answer
    userAnswers.push({
        question: question.question,
        userAnswer: selectedAnswer,
        correctAnswer: question.correct,
        options: question.options,
        explanation: question.explanation,
        isCorrect: selectedAnswer === question.correct
    });
    
    // Show correct/incorrect styling
    options.forEach((option, index) => {
        option.classList.add('disabled');
        
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && selectedAnswer !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Update score
    if (selectedAnswer === question.correct) {
        score++;
    }
    
    // Update button text and functionality
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.textContent = 'View Results';
        nextBtn.onclick = showResults;
    } else {
        nextBtn.textContent = 'Next Question';
        nextBtn.onclick = () => {
            currentQuestionIndex++;
            loadQuestion();
            nextBtn.onclick = handleNextQuestion;
        };
    }
}

// Update Progress Bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = progress + '%';
}

// Show Results
function showResults() {
    quizCompleted = true;
    
    // Hide quiz content and show results
    document.querySelector('.quiz-content').style.display = 'none';
    resultsSection.style.display = 'block';
    
    // Calculate and display score
    const percentage = Math.round((score / quizQuestions.length) * 100);
    finalScore.textContent = percentage;
    correctAnswers.textContent = score;
    
    // Determine performance level and message
    let performanceClass = '';
    let message = '';
    
    if (percentage >= 90) {
        performanceClass = 'performance-excellent';
        message = '🎉 Excellent work! You have mastered past tense verbs!';
    } else if (percentage >= 70) {
        performanceClass = 'performance-good';
        message = '👍 Good job! You have a solid understanding of past tense.';
    } else {
        performanceClass = 'performance-needs-improvement';
        message = '📚 Keep practicing! Review the rules and try again.';
    }
    
    performanceMessage.className = `performance-message ${performanceClass}`;
    performanceMessage.textContent = message;
    
    // Show mistakes if any
    const mistakes = userAnswers.filter(answer => !answer.isCorrect);
    if (mistakes.length > 0) {
        showMistakeReview(mistakes);
    }
    
    // Show restart button
    restartBtn.style.display = 'inline-block';
}

// Show Mistake Review
function showMistakeReview(mistakes) {
    mistakeReview.style.display = 'block';
    mistakesList.innerHTML = '';
    
    mistakes.forEach((mistake, index) => {
        const mistakeItem = document.createElement('div');
        mistakeItem.className = 'mistake-item';
        
        mistakeItem.innerHTML = `
            <div class="mistake-question">${mistake.question}</div>
            <div class="mistake-details">
                <div>Your answer: <span class="mistake-your-answer">${mistake.options[mistake.userAnswer]}</span></div>
                <div>Correct answer: <span class="mistake-correct-answer">${mistake.options[mistake.correctAnswer]}</span></div>
                <div style="margin-top: 8px; font-style: italic;">${mistake.explanation}</div>
            </div>
        `;
        
        mistakesList.appendChild(mistakeItem);
    });
}

// Restart Quiz
function restartQuiz() {
    initializeQuiz();
}

// Event Listeners
nextBtn.addEventListener('click', handleNextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if (quizCompleted) return;
    
    // Number keys 1-4 for option selection
    if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        const options = document.querySelectorAll('.option');
        if (options[optionIndex] && !options[optionIndex].classList.contains('disabled')) {
            selectOption(optionIndex);
        }
    }
    
    // Enter key for next question
    if (e.key === 'Enter' && !nextBtn.disabled) {
        handleNextQuestion();
    }
    
    // Space key for next question
    if (e.key === ' ' && !nextBtn.disabled) {
        e.preventDefault();
        handleNextQuestion();
    }
});

// Initialize the quiz when page loads
document.addEventListener('DOMContentLoaded', initializeQuiz);
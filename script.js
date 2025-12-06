const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris",
        type: "single"
    },
    {
        question: "Which of the following planets are gas giants?",
        options: ["Earth", "Jupiter", "Saturn", "Mars"],
        answer: ["Jupiter", "Saturn"],
        type: "multi"
    },
    {
        question: "The capital of Japan is _______________.",
        answer: "Tokyo",
        type: "fill"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');

submitButton.addEventListener('click', checkAnswer);

displayQuestion();

function displayQuestion() {
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;

    if (question.type === "single" || question.type === "multi") {
        optionsElement.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            const inputElement = document.createElement('input');
            inputElement.type = question.type === "single" ? "radio" : "checkbox";
            inputElement.name = "option";
            inputElement.value = option;
            inputElement.id = `option-${index}`;
            const labelElement = document.createElement('label');
            labelElement.htmlFor = `option-${index}`;
            labelElement.textContent = option;
            optionElement.appendChild(inputElement);
            optionElement.appendChild(labelElement);
            optionsElement.appendChild(optionElement);
        });
    } else if (question.type === "fill") {
        optionsElement.innerHTML = '';
        const inputElement = document.createElement('input');
        inputElement.type = "text";
        inputElement.id = "fill-answer";
        optionsElement.appendChild(inputElement);
    }
}

function checkAnswer() {
    const question = quizData[currentQuestion];
    let userAnswer;

    if (question.type === "single") {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        userAnswer = selectedOption.value;
    } else if (question.type === "multi") {
        const selectedOptions = document.querySelectorAll('input[name="option"]:checked');
        userAnswer = Array.from(selectedOptions).map(option => option.value);
    } else if (question.type === "fill") {
        userAnswer = document.getElementById('fill-answer').value;
    }

    if (question.type === "single" || question.type === "fill") {
        if (userAnswer === question.answer) {
            score++;
        }
    } else if (question.type === "multi") {
        if (JSON.stringify(userAnswer) === JSON.stringify(question.answer)) {
            score++;
        }
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        displayResult();
    }
}

function displayResult() {
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    submitButton.style.display = 'none';
    resultElement.textContent = `Your score is ${score} out of ${quizData.length}`;
}

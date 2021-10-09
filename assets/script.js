var homeContainer = document.querySelector(".home-container")
var startBtn = homeContainer.querySelector(".start-btn button")
var quizContainer = document.querySelector(".quiz-container")
var timeCount = quizContainer.querySelector(".timer .timer-seconds")
var optionList = document.querySelector(".option-list")

startBtn.onclick = ()=>{  
    homeContainer.classList.add("deactivateHome");
    quizContainer.classList.add("activeQuiz"); 
    showQuestions(0);
    startTimer(30);
}

let questions = [
    {
        number: 1,
        question: "Commonly used data types DO NOT include:",
        answer: "alerts",
        options: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ]
    }, 
    {
        number: 2,
        question: "The condition in an if/else statement is enclosed within ________ ?",
        answer: "parentheses",
        options: [
            "quotes",
            "parentheses",
            "curly brackets",
            "square brackets"
        ]
    }, 
    {
        number: 3,
        question: "Arrays in javascript can be used to store ______.",
        answer: "all of the above",
        options: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ]
    }, 
    {
        number: 4,
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answer: "quotes",
        options: [
            "commas",
            "curly brackets",
            "quotes",
            "parentheses"
        ]
    }, 
    {
        number: 5,
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: "console.log",
        options: [
            "Javascript",
            "terminal/bash",
            "for loops",
            "console.log"
        ]
    }
]

let questionCount = 0;
let counter;
let scoreContainer = document.querySelector(".score-container");
let restartQuiz = scoreContainer.querySelector(".buttons .restart")
let highScores = scoreContainer.querySelector(".buttons .highscores")

restartQuiz.onclick = ()=>{
    window.location.reload();
}

var nextBtn = quizContainer.querySelector(".next-btn");

nextBtn.onclick = ()=>{
    if(questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);
    }else{
        console.log("Questions Completed");
        showScoreContainer();
    }
}

function showQuestions(index) {
    var questionText = document.querySelector(".question-text");
    let questionTag = '<span>' + questions[index].question + '<span>'; 
    let optionTag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    questionText.innerHTML = questionTag; 
    optionList.innerHTML = optionTag; 

    var option = optionList.querySelectorAll(".option");
    for (let i  = 0; i  < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    if(userAnswer == correctAnswer){
       answer.classList.add("correct");
    }else{
       answer.classList.add("incorrect");
    }

    for(let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
}

function showScoreContainer() {
    homeContainer.classList.add("deactivateHome");
    quizContainer.classList.remove("activeQuiz");
    scoreContainer.classList.add("activeScore");
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--; 
        if(time <0 ){
            clearInterval(counter);
            timeCount.textContent = "00";
        }
    }
}

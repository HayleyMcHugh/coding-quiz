var question = document.querySelector('#question')
var choices = document.querySelectorAll('.choice-text')
var scoreText = document.querySelector('#score')
var startButton = document.querySelector('.start-button')
var gameContainer = document.querySelector('.game-container')
var homeContainer = document.querySelector('.home-container')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Commonly used data types do not include:',
        choices: ['strings','booleans','alerts','numbers'],
        answer: 'alerts'
    }, 
    {
        question: 'The condition in an if/else statement is enclosed within ________ ?',
        choices: ['quotes','parentheses','curly brackets','square brackets'],
        answer: 'curly brackets'
    }, 
    {
        question: 'Arrays in javascript can be used to store ______.',
        choices: ['numbers and strings','other arrays','booleans','all of the above'],
        answer: 'all of the above'
    }, 
    {
        question: 'String values must be enclosed within _______ when being assigned to variables.',
        choices: ['commas','curly brackets','quotes','parentheses'],
        answer: 'quotes'
    }, 
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['Javascript','terminal/bash','for loops','console.log'],
        answer: 'console.log'
    }
]

var SCORE_POINTS = 100

startButton.addEventListener("click",function () {
    gameContainer.style.display="block";
    homeContainer.style.display="none";
}) 

function startGame(){
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}

function getNewQuestions() {
    var indexLength = questions.length-1
    if (questionCounter<=indexLength) {
        document.querySelector('#question').innerHTML=questions[questionCounter].question
        displayChoices()
    }
}

function displayChoices() {
    var question = questions[questionCounter].choices
    for (let i = 0; i<question.length; i++) {
    var choiceContainer = document.querySelector('.choice-container')
    var questionBtn = document.createElement("button")
    questionBtn.innerHTML=question[i]
    choiceContainer.append(questionBtn)
    }
    // choices.forEach(choice => {
    //     var number = choice.dataset['number']
    //     choice.innerText = questionCounter['choice' + number]
    // })
}

    // var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    // currentQuestion = availableQuestions[questionsIndex]
    // question.innerText = currentQuestion.question

    // availableQuestions.splice(questionsIndex, 1)
    
    // acceptingAnswers = true


choices.forEach(choice => {
    choice.addEventListener('click', event => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        var selectedChoice = event.target
        var selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        }, 1000)
    })
})
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
startGame()



var userName = document.querySelector('#username')
var saveScoreButton = document.querySelector('#saveScoreButton')
var finalScore = document.querySelector('#finalScore')
var mostRecentScore = localStorage.getItem('mostRecentScore')

var highScores = JSON.parse(localStorage.getItem('highScores')) || []

finalScore.innerText = mostRecentScore

userName.addEventListener('keyup', () => {
    saveScoreButton=!userName.value
})

saveHighScore = event => {
    event.preventDefault()

    var score = {
        score: mostRecentScore,
        name: userName.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice()

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}



var highScoresList = document.querySelector('#highScoresList')
highScores.map(score => {
    return '<li class="high-score">${score.name} - ${score.score}<li>'
}).join('')

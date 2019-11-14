const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
var questions = [
    {
        question: "What does HTML stand for?",
        imgSrc: "images/html.png",
        choiceA: "Hypertext Markup Language",
        choiceB: "Hyperlink text and Major League",
        choiceC: "Honorable text Midas Links",
        correct: "A"
    }, {
        question: "What does CSS stand for?",
        imgSrc: "images/css.jpeg",
        choiceA: "Crypto signal sheets",
        choiceB: "Cascading style sheets",
        choiceC: "Central styling sheets",
        correct: "B"
    }, {
        question: "Bonus: What is the name of Thor's hammer?",
        imgSrc: "images/thor'shammer.jpg",
        choiceA: "Stormbreaker",
        choiceB: "Mjolnir",
        choiceC: "Jarnbjorn",
        correct: "B"
    }, {
        question: "What does JS stand for?",
        imgSrc: "images/js.jpg",
        choiceA: "Jump Squad",
        choiceB: "Jerry Seinfeld",
        choiceC: "JavaScript",
        correct: "C"
    }, {
        question: "Bonus: What lead Neo to the night club to meet Trinity?",
        imgSrc: "images/neo.jpeg",
        choiceA: "The Red Pill",
        choiceB: "The Blue Pill",
        choiceC: "The White Rabbit",
        correct: "C"
    }
];
const lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;
var userInitials;
function renderQuestion() {
    var q = questions[runningQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
start.addEventListener("click", startQuiz);
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}
function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        clearInterval(TIMER);
        scoreRender();
        userInitials = prompt("Enter your initials to save your score.");
        var existingEntries = JSON.parse(localStorage.getItem("user"));
        if (existingEntries == null) {
            existingEntries = [];
            console.log(existingEntries);
            var userInitials;
            var entry = {
                "title": userInitials,
                "text": score
            };
            localStorage.setItem("entry", JSON.stringify(entry));
            existingEntries.push(entry);
            localStorage.setItem("user", JSON.stringify(existingEntries));
        }
    }
    function answerIsCorrect() {
        document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
    }
    function answerIsWrong() {
        document.getElementById(runningQuestion).style.backgroundColor = "#f00";
    }
    function scoreRender() {
        scoreDiv.style.display = "block";
        const scorePerCent = Math.round(100 * score / questions.length);
        var img = (scorePerCent >= 80) ? "images/alberteinstein.jpg" :
            (scorePerCent >= 60) ? "images/charlie-sheen.jpg" :
                (scorePerCent >= 40) ? "images/doorknob.jpeg" :
                    (scorePerCent >= 20) ? "images/garybusey.jpg" :
                        "images/rock.jpeg";
        scoreDiv.innerHTML = "<img src=" + img + ">";
        scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
    }
}


















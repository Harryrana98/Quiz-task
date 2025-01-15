import { questions } from "./questions.js";

let quizcontainer = document.querySelector("#quiz_container");
let startbutton = document.querySelector("#start");
let questionDiv = document.querySelector("#ques");
let optionDiv = document.querySelector("#option");
let timerDiv = document.querySelector("#timer");

const quizAllreadyDisplay = [];
const CorrectAns = [];
const userAns = [];
let interval;
let timer = 5;
let queslength = 0;
let score = 0;

let selectedAnswer;
let selectedOption;

startbutton.addEventListener("click", displayQuizContainer);

function displayQuizContainer() {
  quizcontainer.style.display = "block";
  startbutton.style.display = "none";
  displayQuestion();
  timerDiv.innerHTML = timer;


  interval = setInterval(() => {
    if (timer === 0) {
      if (queslength === questions.length) {
        clearInterval(interval);
        timerDiv.innerHTML = "";
        questionDiv.innerHTML = "";
        optionDiv.innerHTML = "";
        questionDiv.innerHTML = scoreCalculate();
      } else {
        displayQuestion();
        timer = 5;
        timerDiv.innerHTML = timer;
      }
      timerDiv.innerHTML = "";
    } else {
      timerDiv.innerHTML = timer--;
    }
  }, 1000);
}

function scoreCalculate(e) {
  for (let i = 0; i < questions.length; i++) {
    if (userAns[i] === CorrectAns[i]) {
      score++;
    }
  }
  return `You Answered ${score} Out Of 4 Question`;
}

function displayQuestion() {
  let randomIndex = RandomQuestion();

  questionDiv.innerHTML = questions[randomIndex].q;

  displayOptions(questions[randomIndex].opt);

  CorrectAns.push(questions[randomIndex].a);
}

function displayOptions(optArr) {
  optionDiv.innerHTML = "";
  optArr.forEach((opton) => {
    let option = document.createElement("button");
    option.className="optionButton"
    console.log(opton);
    
    option.innerHTML = opton;
    option.addEventListener("click", UserAnsStore);
    optionDiv.append(option);
  });
}

function UserAnsStore(e) {
  selectedOption = e.target;
  selectedAnswer = selectedOption.innerHTML;
  optionColorUpdate();
  userAns.push(selectedAnswer);
  console.log(userAns);
  
}

function optionColorUpdate(){
  if(selectedAnswer===CorrectAns[CorrectAns.length-1]){
    selectedOption.style.backgroundColor="green"
    selectedOption.style.color="white"
  }
  else{
    selectedOption.style.backgroundColor="red"
    selectedOption.style.color="white"
  }
}

function RandomQuestion() {
  let RandomValue = Math.floor(Math.random() * questions.length);

  if (quizAllreadyDisplay.includes(RandomValue)) {
    return RandomQuestion();
  } else {
    quizAllreadyDisplay.push(RandomValue);
    return RandomValue;
  }
}

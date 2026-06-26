const gameTitle = document.getElementById("game-title")
const scoreDisplay = document.getElementById("score")
// select #question-number  → store in questionNumber
const questionNumber = document.getElementById("question-number");
// select #question-text    → store in questionText
const questionText = document.getElementById("question-text");
// select #question-card    → store in questionCard
const questionCard = document.getElementById("question-card");
// select #answer-list      → store in answerList
const answerList = document.getElementById("answer-list");
// select #next-btn         → store in nextBtn
const nextBtn = document.getElementById("next-btn");
// select #end-screen       → store in endScreen
const endScreen = document.getElementById("end-screen");



const answerBtnsCollection = document.getElementsByClassName("answer-btn");

const answerBtnsNodeList = document.querySelectorAll(".answer-btn");
console.log(answerBtnsCollection);
console.log(answerBtnsNodeList);
console.log(answerBtnsCollection.map);
console.log(answerBtnsNodeList.forEach);
gameTitle.textContent = "⚡ Quick Fire Trivia"
console.log("First question:", questionText.textContent)
questionNumber.textContent = questionNumber.textContent.toUpperCase()
const firstBtn = answerBtnsNodeList[0]
const firstLi = firstBtn.parentElement

console.log("The first button:", firstBtn)
console.log("Its parent <li>:", firstLi)
console.log("The <ul> that holds all buttons:", firstLi.parentElement)
questionCard.classList.add("answered")
// Look at the browser — does the card look different?

questionCard.classList.remove("answered")
// Back to normal

const questions = [
  {
    text: "Which field studies how humans think, learn, and solve problems?",
    answers: [
      "Cognitive Science",
      "Data Science",
      "Cybersecurity",
      "Software Engineering"
    ],
    correct: 0
  },

  {
    text: "What does AI stand for?",
    answers: [
      "Automated Intelligence",
      "Artificial Intelligence",
      "Advanced Internet",
      "Automatic Information"
    ],
    correct: 1
  },

  {
    text: "Which part of the brain is primarily responsible for decision-making and planning?",
    answers: [
      "Cerebellum",
      "Brain Stem",
      "Frontal Lobe",
      "Occipital Lobe"
    ],
    correct: 2
  },

  {
    text: "Which of the following is an example of machine learning?",
    answers: [
      "A calculator performing arithmetic",
      "A search engine recommending videos based on your history",
      "A keyboard displaying typed letters",
      "A monitor displaying images"
    ],
    correct: 1
  },

  {
    text: "Who is often called the 'father of Artificial Intelligence'?",
    answers: [
      "Alan Turing",
      "John McCarthy",
      "Sigmund Freud",
      "Elon Musk"
    ],
    correct: 1
  }
];
let currentIndex = 0
let score = 0
function loadQuestion(index) {
  const currentQuestion = questions[index];
  questionNumber.textContent = `Question ${index + 1} of ${questions.length}`;
  questionText.textContent = currentQuestion.text;
  answerBtnsNodeList.forEach((button, answerIndex) => {
    button.textContent = currentQuestion.answers[answerIndex];
    button.className = "answer-btn";
    
  });
  nextBtn.classList.add("hidden");
  questionCard.classList.remove("answered");
  

}
loadQuestion(0);
answerList.addEventListener("click", (event) => {
  // 1. If the click was not on a BUTTON element, return early and do nothing
  //    hint: check event.target.tagName — it will be the string "BUTTON" if a button was clicked
  if (event.target.tagName !== "BUTTON") {
    return;
  }
  const clickedButton = event.target;


  // 2. Store the clicked button and figure out which index it is in the list
  //    hint: convert answerBtnsNodeList to an array and use .indexOf(event.target)
  const btnArray = Array.from(answerBtnsNodeList);
  const clickedIndex = btnArray.indexOf(clickedButton);
  const correctIndex = questions[currentIndex].correct;
  if (clickedIndex === correctIndex) {
    clickedButton.classList.add("correct");
    score++;
    scoreDisplay.textContent = score;

} else {
  clickedButton.classList.add("wrong");
  answerBtnsNodeList[correctIndex].classList.add("correct");
}






  // 3. Get the correct answer index from the current question in the data array
  answerBtnsNodeList.forEach(button => {
    button.classList.add("disabled");
  });
  questionCard.classList.add("answered");
  nextBtn.classList.remove("hidden");

});
nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion(currentIndex);
  } else {
    showEndScreen();
  }
});
function showEndScreen() {
  questionCard.classList.add("hidden");
  endScreen.classList.remove("hidden");

  const title = document.createElement("h2");
  title.textContent = `You scored ${score} out of ${questions.length}`;

  const message = document.createElement("p");

  if (score === questions.length) {
    message.textContent = "Perfect score! Excellent work!";
  } else if (score >= questions.length / 2) {
    message.textContent = "Good job! You passed.";
  } else {
    message.textContent = "Keep practicing. You can improve!";
  }

  const restartButton = document.createElement("button");
  restartButton.id = "restart-btn";
  restartButton.textContent = "Play Again";

  endScreen.appendChild(title);
  endScreen.appendChild(message);
  endScreen.appendChild(restartButton);
}
endScreen.addEventListener("click", (event) => {
  if (event.target.id !== "restart-btn") {
    return;
  }

  score = 0;
  currentIndex = 0;
  scoreDisplay.textContent = score;

  endScreen.innerHTML = "";
  endScreen.classList.add("hidden");

  questionCard.classList.remove("hidden");

  loadQuestion(0);
});
  


  // 4. Compare: did the player pick the right one?
  //    - If correct: add the "correct" class to the clicked button, increment score,
  //      and update scoreDisplay.textContent
  //    - If wrong: add the "wrong" class to the clicked button,
  //      and add "correct" to the button at the correct index to reveal it

  // 5. Disable all four answer buttons so the player can't change their answer
  //    hint: convert to a real array and use forEach to add "disabled" to each

  // 6. Add "answered" to questionCard and remove "hidden" from nextBtn

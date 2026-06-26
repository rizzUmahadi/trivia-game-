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

// ─── Phase 3: Question Data ──────────────────────────────────────────
const questions = [
  {
    text: "Who invented the World Wide Web?",
    answers: ["Tim Berners-Lee", "Bill Gates", "Linus Torvalds", "Ada Lovelace"],
    correct: 0
  },
  {
    text: "What does 'HTTP' stand for?",
    answers: [
      "HyperText Transfer Protocol",
      "High Transfer Text Protocol",
      "HyperText Transmission Process",
      "Hyperlink Text Transport Protocol"
    ],
    correct: 0
  },
  {
    text: "Which programming language runs natively in web browsers?",
    answers: ["Python", "Java", "JavaScript", "Ruby"],
    correct: 2
  },
  {
    text: "What does 'CSS' stand for?",
    answers: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Coded Styling Syntax"
    ],
    correct: 1
  },
  {
    text: "Which HTML element is used to link an external stylesheet?",
    answers: ["<style>", "<script>", "<link>", "<meta>"],
    correct: 2
  }
];

let currentIndex = 0;
let score = 0;

// ─── Phase 1: Select DOM Elements ───────────────────────────────────
const gameTitle    = document.getElementById("game-title");
const scoreDisplay = document.getElementById("score");

// select #question-number  → store in questionNumber
const questionNumber = document.getElementById("question-number");

// select #question-text    → store in questionText
const questionText   = document.getElementById("question-text");

// select #question-card    → store in questionCard
const questionCard   = document.getElementById("question-card");

// select #answer-list      → store in answerList
const answerList     = document.getElementById("answer-list");

// select #next-btn         → store in nextBtn
const nextBtn        = document.getElementById("next-btn");

// select #end-screen       → store in endScreen
const endScreen      = document.getElementById("end-screen");

// Two ways to select answer buttons:
const answerBtnsCollection = document.getElementsByClassName("answer-btn");
// select ".answer-btn" using querySelectorAll → store in answerBtnsNodeList
const answerBtnsNodeList   = document.querySelectorAll(".answer-btn");

// Console comparison (Phase 1 exercise)
console.log("HTMLCollection:", answerBtnsCollection);
console.log("NodeList:", answerBtnsNodeList);

// getElementsByClassName returns an HTMLCollection.
// querySelectorAll returns a NodeList.
// To use .map() on either, convert with Array.from() or the spread operator [...].

// ─── Phase 2: Read and Modify the Page ──────────────────────────────
// (These run once on load to demonstrate DOM manipulation)

// Update the title
gameTitle.textContent = "⚡ Quick Fire Trivia";

// Read and log the placeholder question text
console.log("First question (placeholder):", questionText.textContent);

// Change the question number label to uppercase
questionNumber.textContent = questionNumber.textContent.toUpperCase();

// Walk the tree without new selectors
const firstBtn = answerBtnsNodeList[0];
const firstLi  = firstBtn.parentElement;
console.log("The first button:", firstBtn);
console.log("Its parent <li>:", firstLi);
console.log("The <ul> that holds all buttons:", firstLi.parentElement);

// Toggle a class to test classList
questionCard.classList.add("answered");    // shows the left border briefly
questionCard.classList.remove("answered"); // back to normal

// ─── Phase 3: loadQuestion ───────────────────────────────────────────
function loadQuestion(index) {
  // 1. Get the current question object
  const q = questions[index];

  // 2. Update question number display
  questionNumber.textContent = `QUESTION ${index + 1} OF ${questions.length}`;

  // 3. Update question text
  questionText.textContent = q.text;

  // 4. Update each answer button and reset its classes
  Array.from(answerBtnsNodeList).forEach((btn, i) => {
    btn.textContent = q.answers[i];
    btn.className   = "answer-btn"; // clears correct / wrong / disabled
  });

  // 5. Hide the next button
  nextBtn.classList.add("hidden");

  // 6. Remove the answered class from the card
  questionCard.classList.remove("answered");
}

// Initial render
loadQuestion(0);

// ─── Phase 4: Event Delegation on Answer List ───────────────────────
answerList.addEventListener("click", (event) => {
  // Why does clicking a button inside #answer-list trigger this listener?
  // Answer: Because click events bubble up the DOM tree. The button fires the
  // event, it travels up through the <li> to the <ul> (#answer-list), where
  // our listener catches it.
  //
  // What is the difference between event.target and event.currentTarget here?
  // event.target      → the specific element that was clicked (the <button>)
  // event.currentTarget → always #answer-list, the element that owns the listener

  console.log("event.target:", event.target);
  console.log("event.currentTarget:", event.currentTarget);

  // 1. Ignore clicks that didn't land on a button
  if (event.target.tagName !== "BUTTON") return;

  // 2. Find the clicked button's index in the list
  const clickedBtn    = event.target;
  const btnsArray     = Array.from(answerBtnsNodeList);
  const clickedIndex  = btnsArray.indexOf(clickedBtn);

  // 3. Get the correct answer index from data
  const correctIndex  = questions[currentIndex].correct;

  // 4. Compare and give feedback
  if (clickedIndex === correctIndex) {
    clickedBtn.classList.add("correct");
    score++;
    scoreDisplay.textContent = score;
  } else {
    clickedBtn.classList.add("wrong");
    btnsArray[correctIndex].classList.add("correct"); // reveal correct answer
  }

  // 5. Disable all buttons so the player can't change their answer
  btnsArray.forEach(btn => btn.classList.add("disabled"));

  // 6. Mark the card as answered and show the Next button
  questionCard.classList.add("answered");
  nextBtn.classList.remove("hidden");
});

// ─── Phase 5: Next Button & End Screen ──────────────────────────────
nextBtn.addEventListener("click", () => {
  // 1. Move to the next question
  currentIndex++;

  // 2. More questions remain
  if (currentIndex < questions.length) {
    loadQuestion(currentIndex);
  } else {
    // 3. Game over
    showEndScreen();
  }
});

function showEndScreen() {
  // 1. Hide the question card
  questionCard.classList.add("hidden");

  // 2. Show the end screen
  endScreen.classList.remove("hidden");

  // 3. Create and append the score heading
  const heading = document.createElement("h2");
  heading.textContent = `You scored ${score} out of ${questions.length}`;
  endScreen.appendChild(heading);

  // 4. Create an encouragement message
  const message = document.createElement("p");
  const pct = score / questions.length;
  if (pct === 1) {
    message.textContent = "🎉 Perfect score! You're a trivia master!";
  } else if (pct >= 0.6) {
    message.textContent = "👏 Nice work — you know your stuff!";
  } else {
    message.textContent = "📚 Keep studying — you'll nail it next time!";
  }
  endScreen.appendChild(message);

  // 5. Create the restart button
  const restartBtn = document.createElement("button");
  restartBtn.id          = "restart-btn";
  restartBtn.textContent = "Play Again";

  // 6. Append to the end screen
  endScreen.appendChild(restartBtn);
}

// ─── Phase 6: Restart via Event Delegation on End Screen ────────────
endScreen.addEventListener("click", (event) => {
  // Why can't we do document.getElementById("restart-btn") at the top of the file?
  // Because that button is created dynamically by showEndScreen() — it doesn't
  // exist in the DOM when the page first loads. Delegating to #end-screen lets us
  // catch clicks on children that are added later.

  // 1. Only handle clicks on the restart button
  if (event.target.id !== "restart-btn") return;

  // 2. Reset state variables and score display
  score        = 0;
  currentIndex = 0;
  scoreDisplay.textContent = score;

  // 3. Clear everything showEndScreen built
  endScreen.innerHTML = "";

  // 4. Hide end screen, bring back the question card
  endScreen.classList.add("hidden");
  questionCard.classList.remove("hidden");

  // 5. Load the first question fresh
  loadQuestion(0);
});
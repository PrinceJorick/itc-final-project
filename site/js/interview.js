/* ==========================================================================
   interview.js: interview practice page.
   1. Flashcards: filter by category, previous/next, random, reveal answer
   2. Question bank list (click a question to open it as a flashcard)
   3. STAR answer template saved to localStorage
   Questions come from interviewQuestions in data.js.
   ========================================================================== */

var STAR_KEY = "starAnswer";
var CATEGORY_NAMES = {
  intro: "Intro",
  behavioral: "Behavioral",
  technical: "Technical",
  closing: "Closing"
};

var currentCategory = "all";
var currentList = [];  /* questions in the chosen category */
var currentIndex = 0;  /* which question in currentList is showing */


/* 1. FLASHCARDS ---------------------------------------------------------- */

/* Questions that match the chosen category */
function getQuestions(category) {
  if (category === "all") {
    return interviewQuestions.slice();
  }
  return interviewQuestions.filter(function (q) {
    return q.category === category;
  });
}

/* Hide or show the tip and sample answer */
function setRevealed(isRevealed) {
  var answer = document.getElementById("card-answer");
  var button = document.getElementById("reveal-btn");
  answer.hidden = !isRevealed;
  button.setAttribute("aria-expanded", isRevealed ? "true" : "false");
  button.textContent = isRevealed ? "Hide tip and answer" : "Reveal tip and answer";
}

/* Show the question at currentIndex (answer starts hidden) */
function showCard() {
  var q = currentList[currentIndex];
  document.getElementById("card-category").textContent = CATEGORY_NAMES[q.category];
  document.getElementById("card-count").textContent = "Question " + (currentIndex + 1) + " of " + currentList.length;
  document.getElementById("card-question").textContent = q.question;
  document.getElementById("card-tip").textContent = q.tip;
  document.getElementById("card-sample").textContent = q.sampleAnswer;
  setRevealed(false);
}

/* Change category: rebuild the list and start at the first question */
function chooseCategory(category) {
  currentCategory = category;
  currentList = getQuestions(category);
  currentIndex = 0;
  showCard();
  renderQuestionList();
}

function nextCard(step) {
  /* Wrap around at the ends */
  currentIndex = (currentIndex + step + currentList.length) % currentList.length;
  showCard();
}

/* Pick a random question, never the same one twice in a row */
function randomCard() {
  if (currentList.length < 2) {
    return;
  }
  var next = currentIndex;
  while (next === currentIndex) {
    next = Math.floor(Math.random() * currentList.length);
  }
  currentIndex = next;
  showCard();
}


/* 2. QUESTION BANK LIST -------------------------------------------------- */

function renderQuestionList() {
  var list = document.getElementById("question-list");
  list.innerHTML = "";
  currentList.forEach(function (q, index) {
    var item = document.createElement("li");
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = q.question;
    button.addEventListener("click", function () {
      currentIndex = index;
      showCard();
      document.getElementById("flashcard").scrollIntoView({ block: "center" });
      document.getElementById("reveal-btn").focus();
    });
    item.appendChild(button);
    list.appendChild(item);
  });
}


/* 3. STAR TEMPLATE ------------------------------------------------------- */

var STAR_FIELDS = ["star-question", "star-s", "star-t", "star-a", "star-r"];

function loadStar() {
  try {
    var saved = JSON.parse(localStorage.getItem(STAR_KEY) || "{}");
    STAR_FIELDS.forEach(function (id) {
      if (typeof saved[id] === "string") {
        document.getElementById(id).value = saved[id];
      }
    });
  } catch (error) {
    /* Storage blocked or unreadable: start with empty boxes */
  }
}

function saveStar() {
  var status = document.getElementById("star-status");
  var data = {};
  STAR_FIELDS.forEach(function (id) {
    data[id] = document.getElementById(id).value;
  });
  try {
    localStorage.setItem(STAR_KEY, JSON.stringify(data));
    status.textContent = "Saved on this device";
  } catch (error) {
    status.textContent = "Couldn't save. Your browser may be blocking storage.";
  }
}

function clearStar() {
  if (!confirm("Clear your STAR answer?")) {
    return;
  }
  STAR_FIELDS.forEach(function (id) {
    document.getElementById(id).value = "";
  });
  try {
    localStorage.removeItem(STAR_KEY);
  } catch (error) {
    /* Nothing to remove if storage is blocked */
  }
  document.getElementById("star-status").textContent = "Cleared";
}


/* START ------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  /* Category filter (radio buttons) */
  document.querySelectorAll('input[name="category"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      chooseCategory(radio.value);
    });
  });

  document.getElementById("reveal-btn").addEventListener("click", function () {
    var isOpen = this.getAttribute("aria-expanded") === "true";
    setRevealed(!isOpen);
  });
  document.getElementById("prev-btn").addEventListener("click", function () { nextCard(-1); });
  document.getElementById("next-btn").addEventListener("click", function () { nextCard(1); });
  document.getElementById("random-btn").addEventListener("click", randomCard);

  /* STAR form saves as you type */
  var starForm = document.getElementById("star-form");
  starForm.addEventListener("input", saveStar);
  starForm.addEventListener("submit", function (event) { event.preventDefault(); });
  document.getElementById("star-clear").addEventListener("click", clearStar);

  loadStar();
  chooseCategory("all");
});

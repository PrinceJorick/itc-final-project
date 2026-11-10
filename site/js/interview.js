/* ==========================================================================
   interview.js: interview practice page.
   1. Flashcards: filter by category, previous/next, random, reveal answer
   2. Your own cards: add, edit, and delete questions, saved in
      localStorage and gathered under the "Yours" filter
   3. Question bank list (click a question to open it as a flashcard)
   4. STAR answer template saved to localStorage
   Built-in questions come from interviewQuestions in data.js.
   ========================================================================== */

var STAR_KEY = "starAnswer";
var CUSTOM_KEY = "simulaCards";
var CATEGORY_NAMES = {
  intro: "Intro",
  behavioral: "Behavioral",
  technical: "Technical",
  closing: "Closing",
  yours: "Yours"
};
var EDITABLE_CATEGORIES = ["intro", "behavioral", "technical", "closing"];

var currentCategory = "all";
var currentList = [];   /* questions in the chosen category */
var currentIndex = 0;   /* which question in currentList is showing */
var customCards = [];   /* the visitor's own questions */
var editingId = null;   /* id of the card open in the editor, or null for new */


/* 0. YOUR OWN CARDS (storage) --------------------------------------------- */

function loadCustomCards() {
  try {
    var saved = JSON.parse(localStorage.getItem(CUSTOM_KEY) || "[]");
    if (Array.isArray(saved)) {
      customCards = saved.filter(function (card) {
        return card && typeof card.id === "string" && typeof card.question === "string" &&
               typeof card.category === "string" && EDITABLE_CATEGORIES.indexOf(card.category) !== -1;
      });
    }
  } catch (error) {
    customCards = []; /* storage blocked or unreadable: start clean */
  }
}

function saveCustomCards() {
  try {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(customCards));
    return true;
  } catch (error) {
    return false;
  }
}

function newCardId() {
  return "c" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 10000).toString(36);
}


/* 1. FLASHCARDS ---------------------------------------------------------- */

/* Questions that match the chosen category. "yours" is only your cards;
   every other view keeps the built-ins and adds your matching cards. */
function getQuestions(category) {
  if (category === "yours") {
    return customCards.slice();
  }
  var list = interviewQuestions.filter(function (q) {
    return category === "all" || q.category === category;
  });
  return list.concat(customCards.filter(function (card) {
    return category === "all" || card.category === category;
  }));
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
  if (!q) {
    return;
  }
  var isYours = customCards.some(function (card) { return card.id === q.id; });
  document.getElementById("card-category").textContent = isYours ? CATEGORY_NAMES.yours : CATEGORY_NAMES[q.category];
  document.getElementById("card-count").textContent = "Question " + (currentIndex + 1) + " of " + currentList.length;
  document.getElementById("card-question").textContent = q.question;
  document.getElementById("card-tip").textContent = q.tip || "No tip on this card.";
  document.getElementById("card-sample").textContent = q.sampleAnswer || "No sample answer on this card.";
  document.getElementById("edit-card-btn").hidden = !isYours;
  document.getElementById("delete-card-btn").hidden = !isYours;
  setRevealed(false);
}

/* Change category: rebuild the list, mind empty shelves, start at the top */
function chooseCategory(category) {
  currentCategory = category;
  currentList = getQuestions(category);
  var isEmpty = currentList.length === 0;

  document.getElementById("flashcard").hidden = isEmpty;
  document.getElementById("yours-empty").hidden = !isEmpty;
  document.getElementById("question-bank").hidden = isEmpty;
  currentIndex = 0;
  if (!isEmpty) {
    showCard();
  }
  renderQuestionList();
}

/* Tick the radio for a category (setting .checked by hand fires no event) */
function selectCategoryRadio(value) {
  var radio = document.querySelector('input[name="category"][value="' + value + '"]');
  if (radio && !radio.checked) {
    radio.checked = true;
  }
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


/* 3. THE CARD EDITOR -------------------------------------------------------
   One form for adding and editing. Saving keeps you on the shelf the card
   belongs to, so you can flip through your work right away. */

function openEditor(card) {
  editingId = card ? card.id : null;
  var title = document.getElementById("card-editor-title");
  title.textContent = card ? "Edit your question" : "Add your own question";

  document.getElementById("own-question").value = card ? card.question : "";
  document.getElementById("own-category").value = card ? card.category : "intro";
  document.getElementById("own-tip").value = card ? (card.tip || "") : "";
  document.getElementById("own-answer").value = card ? (card.sampleAnswer || "") : "";
  setQuestionError("");

  var editor = document.getElementById("card-editor");
  editor.hidden = false;
  editor.scrollIntoView({ block: "center" });
  document.getElementById("own-question").focus();
}

function closeEditor() {
  document.getElementById("card-editor").hidden = true;
  editingId = null;
}

function setQuestionError(message) {
  var error = document.getElementById("own-question-error");
  var field = document.getElementById("own-question");
  error.textContent = message;
  if (message) {
    field.setAttribute("aria-invalid", "true");
  } else {
    field.removeAttribute("aria-invalid");
  }
}

function saveCard() {
  var question = document.getElementById("own-question").value.trim();
  if (question === "") {
    setQuestionError("Write the question first.");
    document.getElementById("own-question").focus();
    return;
  }

  var card = {
    id: editingId || newCardId(),
    category: document.getElementById("own-category").value,
    question: question,
    tip: document.getElementById("own-tip").value.trim(),
    sampleAnswer: document.getElementById("own-answer").value.trim()
  };

  if (editingId) {
    customCards = customCards.map(function (existing) {
      return existing.id === editingId ? card : existing;
    });
  } else {
    customCards.push(card);
  }

  var saved = saveCustomCards();
  var status = document.getElementById("own-status");
  status.textContent = saved ? "Saved on this device" : "Couldn't save. Your browser may be blocking storage.";

  closeEditor();

  /* Stay on a shelf where the card is visible */
  if (currentCategory !== "all" && currentCategory !== "yours" && currentCategory !== card.category) {
    currentCategory = "yours";
    selectCategoryRadio("yours");
    currentList = getQuestions("yours");
  }
  currentIndex = currentList.indexOf(card);
  if (currentIndex === -1) {
    currentList.push(card);
    currentIndex = currentList.length - 1;
  }
  /* The shelf can no longer be empty: put the card on it */
  document.getElementById("flashcard").hidden = false;
  document.getElementById("yours-empty").hidden = true;
  document.getElementById("question-bank").hidden = false;
  renderQuestionList();
  showCard();
}

function deleteCurrentCard() {
  var q = currentList[currentIndex];
  if (!q) {
    return;
  }
  if (!confirm("Delete this question?")) {
    return;
  }
  customCards = customCards.filter(function (card) { return card.id !== q.id; });
  saveCustomCards();
  if (editingId === q.id) {
    closeEditor();
  }

  currentList = getQuestions(currentCategory);
  var isEmpty = currentList.length === 0;
  document.getElementById("flashcard").hidden = isEmpty;
  document.getElementById("yours-empty").hidden = !isEmpty;
  document.getElementById("question-bank").hidden = isEmpty;

  if (isEmpty) {
    document.getElementById("own-status").textContent = "Deleted.";
    renderQuestionList();
    return;
  }
  if (currentIndex >= currentList.length) {
    currentIndex = currentList.length - 1;
  }
  showCard();
  renderQuestionList();
}


/* 4. STAR TEMPLATE ------------------------------------------------------- */

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
  loadCustomCards();

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

  /* Your own cards */
  document.getElementById("add-card-btn").addEventListener("click", function () { openEditor(null); });
  document.getElementById("empty-add-btn").addEventListener("click", function () { openEditor(null); });
  document.getElementById("edit-card-btn").addEventListener("click", function () {
    var q = currentList[currentIndex];
    var card = customCards.filter(function (c) { return c.id === q.id; })[0];
    openEditor(card || null);
  });
  document.getElementById("delete-card-btn").addEventListener("click", deleteCurrentCard);
  document.getElementById("card-editor").addEventListener("submit", function (event) {
    event.preventDefault();
    saveCard();
  });
  document.getElementById("own-cancel").addEventListener("click", closeEditor);

  /* STAR form saves as you type */
  var starForm = document.getElementById("star-form");
  starForm.addEventListener("input", saveStar);
  starForm.addEventListener("submit", function (event) { event.preventDefault(); });
  document.getElementById("star-clear").addEventListener("click", clearStar);

  loadStar();
  chooseCategory("all");
});

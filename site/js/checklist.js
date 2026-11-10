/* ==========================================================================
   checklist.js: pre-employment checklist page.
   Builds the list from checklistItems (data.js), saves which boxes are
   ticked in localStorage, and updates the progress bar.
   ========================================================================== */

var CHECKLIST_KEY = "checklistProgress";

/* Read saved progress: an object like { "nbi": true, "psa": false } */
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(CHECKLIST_KEY) || "{}") || {};
  } catch (error) {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(progress));
  } catch (error) {
    /* Storage blocked: the checklist still works until the page reloads */
  }
}

/* Small helper: create an element with a class and text */
function makeEl(tag, className, text) {
  var node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
}

/* One row of the "How to get it" details */
function addDetail(list, term, description) {
  list.appendChild(makeEl("dt", "", term));
  list.appendChild(makeEl("dd", "", description));
}

/* Build one checklist item */
function buildItem(item, isDone) {
  var li = makeEl("li", "checklist-item" + (isDone ? " is-done" : ""));
  li.id = "item-" + item.id;

  /* Checkbox and name */
  var head = makeEl("div", "item-head");
  var label = makeEl("label", "check-row");
  var box = document.createElement("input");
  box.type = "checkbox";
  box.checked = isDone;
  box.setAttribute("data-id", item.id);
  label.appendChild(box);
  label.appendChild(makeEl("span", "item-name", item.name));
  head.appendChild(label);
  if (item.ra11261Free) {
    head.appendChild(makeEl("span", "badge-free", "Free under RA 11261"));
  }
  li.appendChild(head);

  li.appendChild(makeEl("p", "item-meta", "Where: " + item.whereToGet));

  /* Expandable "How to get it" */
  var details = makeEl("details", "item-details");
  details.appendChild(makeEl("summary", "", "How to get it"));
  var dl = document.createElement("dl");
  addDetail(dl, "Requirements", item.requirements);
  addDetail(dl, "Cost", item.cost);
  details.appendChild(dl);

  var steps = document.createElement("ol");
  item.steps.forEach(function (step) {
    steps.appendChild(makeEl("li", "", step));
  });
  details.appendChild(makeEl("p", "label", "Steps"));
  details.appendChild(steps);

  if (item.link) {
    var linkP = makeEl("p", "small");
    var link = makeEl("a", "", item.link.indexOf("http") === 0 ? "Official website" : "Go to the resume builder");
    link.href = item.link;
    if (item.link.indexOf("http") === 0) {
      link.rel = "noopener";
    }
    linkP.appendChild(link);
    details.appendChild(linkP);
  }
  li.appendChild(details);
  return li;
}

/* Count ticked boxes and move the progress bar */
function updateProgress(progress) {
  var total = checklistItems.length;
  var done = checklistItems.filter(function (item) {
    return progress[item.id] === true;
  }).length;
  var percent = Math.round((done / total) * 100);

  document.getElementById("progress-label").textContent = done + " of " + total + " documents ready";
  document.getElementById("progress-fill").style.width = percent + "%";
  var bar = document.getElementById("progress-bar");
  bar.setAttribute("aria-valuenow", percent);
  bar.setAttribute("aria-valuetext", done + " of " + total + " documents ready");
}

function renderChecklist(progress) {
  var list = document.getElementById("checklist");
  list.innerHTML = "";
  checklistItems.forEach(function (item) {
    list.appendChild(buildItem(item, progress[item.id] === true));
  });
  updateProgress(progress);
}

document.addEventListener("DOMContentLoaded", function () {
  var progress = loadProgress();
  renderChecklist(progress);

  /* Ticking a box: save it and update the bar */
  document.getElementById("checklist").addEventListener("change", function (event) {
    var box = event.target;
    if (box.type !== "checkbox") {
      return;
    }
    var id = box.getAttribute("data-id");
    progress[id] = box.checked;
    box.closest(".checklist-item").classList.toggle("is-done", box.checked);
    saveProgress(progress);
    updateProgress(progress);
  });

  /* Uncheck all, after confirming */
  document.getElementById("checklist-reset").addEventListener("click", function () {
    if (!confirm("Uncheck every document?")) {
      return;
    }
    progress = {};
    saveProgress(progress);
    renderChecklist(progress);
  });
});

/* ==========================================================================
   home.js: the "School work, rewritten" demo in the home page hero.
   - Shows a weak line from school work and the strong resume bullet it
     becomes. The four parts of a strong bullet (action verb, what you did,
     tool, result) light up one after another, matching the legend.
   - "Show another" moves to the next example.
   - Hovering or focusing a legend item highlights that part.
   Without JavaScript the first example is already in the HTML, complete.
   ========================================================================== */

/* Each strong bullet is split into its four parts, so they can be marked */
var DEMO_EXAMPLES = [
  {
    weak: "Made a website for our capstone.",
    parts: [
      ["verb", "Built"], " ", ["what", "a resort booking site"], " with ",
      ["tool", "HTML, CSS, and PHP"], ", ",
      ["result", "replacing a paper logbook with online reservations"], "."
    ]
  },
  {
    weak: "Member of the events committee.",
    parts: [
      ["verb", "Ran"], " ", ["what", "registration for a 200-person career fair"], " with ",
      ["tool", "Google Forms"], ", ",
      ["result", "cutting check-in to under a minute per guest"], "."
    ]
  },
  {
    weak: "Joined a hackathon.",
    parts: [
      ["verb", "Placed"], " ", ["what", "2nd of 30 teams in a regional hackathon"], " with ",
      ["tool", "an Arduino flood-alert prototype"], ", ",
      ["result", "built in 24 hours"], "."
    ]
  }
];

var DEMO_STEP_MS = 420; /* time between one part lighting up and the next */
var demoReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
var demoTimers = [];

/* Stop any parts still waiting to light up */
function clearDemoTimers() {
  for (var i = 0; i < demoTimers.length; i++) {
    clearTimeout(demoTimers[i]);
  }
  demoTimers = [];
}

/* Write one example into the demo (plain text, no innerHTML) */
function renderExample(demo, example) {
  demo.querySelector("#demo-weak").textContent = example.weak;
  var strong = demo.querySelector("#demo-strong");
  strong.textContent = "";
  for (var i = 0; i < example.parts.length; i++) {
    var piece = example.parts[i];
    if (typeof piece === "string") {
      strong.appendChild(document.createTextNode(piece));
    } else {
      var span = document.createElement("span");
      span.className = "part";
      span.setAttribute("data-part", piece[0]);
      span.textContent = piece[1];
      strong.appendChild(span);
    }
  }
}

/* Light up the parts in order: verb, what, tool, result */
function playParts(demo) {
  clearDemoTimers();
  var order = ["verb", "what", "tool", "result"];
  var parts = demo.querySelectorAll(".part, .demo-legend li");
  for (var i = 0; i < parts.length; i++) {
    parts[i].classList.remove("is-lit");
  }
  order.forEach(function (name, index) {
    var light = function () {
      var matches = demo.querySelectorAll('[data-part="' + name + '"]');
      for (var j = 0; j < matches.length; j++) {
        matches[j].classList.add("is-lit");
      }
    };
    if (demoReduced.matches) {
      light(); /* no sequence: everything shows at once */
    } else {
      demoTimers.push(setTimeout(light, 500 + index * DEMO_STEP_MS));
    }
  });
}

function setupBulletDemo() {
  var demo = document.getElementById("bullet-demo");
  if (!demo) {
    return;
  }
  var current = 0;
  var count = demo.querySelector("#demo-count");
  var nextButton = demo.querySelector("#demo-next");
  demo.classList.add("is-ready");

  nextButton.addEventListener("click", function () {
    current = (current + 1) % DEMO_EXAMPLES.length;
    /* Fade the text out, swap it, fade back in (CSS does the fading) */
    demo.classList.add("is-swapping");
    setTimeout(function () {
      renderExample(demo, DEMO_EXAMPLES[current]);
      count.textContent = (current + 1) + " / " + DEMO_EXAMPLES.length;
      demo.classList.remove("is-swapping");
      playParts(demo);
    }, demoReduced.matches ? 0 : 180);
  });

  /* Pointing at a legend item spotlights the matching part of the bullet */
  var legend = demo.querySelectorAll(".demo-legend li");
  for (var i = 0; i < legend.length; i++) {
    legend[i].addEventListener("mouseenter", spotlight);
    legend[i].addEventListener("mouseleave", clearSpotlight);
  }
  function spotlight(event) {
    demo.setAttribute("data-spotlight", event.currentTarget.getAttribute("data-part"));
  }
  function clearSpotlight() {
    demo.removeAttribute("data-spotlight");
  }

  playParts(demo);
}

document.addEventListener("DOMContentLoaded", setupBulletDemo);

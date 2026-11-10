/* ==========================================================================
   motion.js: the quiet motion layer, shared by every page.
   1. Scroll reveals: sections marked .reveal rise in once as they enter
      the screen. Content is only hidden when JavaScript is on, so the
      page is always complete without it.
   2. The preparation register on the home page: its meters fill and its
      counts tick up when the card enters the screen.
   Everything settles instantly for people who prefer reduced motion.
   ========================================================================== */

var MOTION_REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)");


/* 1. SCROLL REVEALS ------------------------------------------------------ */

function setupReveals() {
  var reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) {
    return;
  }
  if (MOTION_REDUCED.matches || !("IntersectionObserver" in window)) {
    /* No animation: show everything now */
    for (var i = 0; i < reveals.length; i++) {
      reveals[i].classList.add("is-revealed");
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target); /* rise in once, never again */
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  for (var j = 0; j < reveals.length; j++) {
    observer.observe(reveals[j]);
  }
}


/* 2. THE PREPARATION REGISTER ---------------------------------------------
   Each row carries a final count (data-count) and a meter share (data-fill).
   The markup already holds the final values, so the numbers are correct
   without JavaScript; motion only adds the counting. */

function countUp(el, target) {
  if (MOTION_REDUCED.matches) {
    el.textContent = String(target);
    return;
  }
  var DURATION = 900; /* matches the meter's width transition in style.css */
  var start = null;
  function frame(now) {
    if (start === null) {
      start = now;
    }
    var progress = Math.min((now - start) / DURATION, 1);
    var eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
    el.textContent = String(Math.round(eased * target));
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}

function fillRegister(register) {
  var counts = register.querySelectorAll(".reg-count[data-count]");
  var bars = register.querySelectorAll(".reg-meter i[data-fill]");
  var i;

  if (MOTION_REDUCED.matches) {
    for (i = 0; i < counts.length; i++) {
      counts[i].textContent = counts[i].getAttribute("data-count");
    }
    for (i = 0; i < bars.length; i++) {
      bars[i].style.width = bars[i].getAttribute("data-fill") + "%";
    }
    return;
  }

  /* Start every dial at zero, then fill them together */
  for (i = 0; i < counts.length; i++) {
    counts[i].textContent = "0";
  }
  for (i = 0; i < bars.length; i++) {
    bars[i].style.width = "0%";
  }
  /* Let the reset land before the fill begins */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      for (i = 0; i < bars.length; i++) {
        bars[i].style.width = bars[i].getAttribute("data-fill") + "%";
      }
      for (i = 0; i < counts.length; i++) {
        countUp(counts[i], Number(counts[i].getAttribute("data-count")));
      }
    });
  });
}

function setupRegister() {
  var register = document.querySelector(".hero-register");
  if (!register) {
    return;
  }
  if (MOTION_REDUCED.matches || !("IntersectionObserver" in window)) {
    fillRegister(register);
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        fillRegister(register);
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });
  observer.observe(register);
}


/* START ------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  setupReveals();
  setupRegister();
});

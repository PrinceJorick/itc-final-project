/* ==========================================================================
   motion.js: scroll reveals, shared by the content pages.
   Only the first screen (the hero or page intro) shows when a page opens.
   Each section marked .reveal fades and rises in once it scrolls into view;
   inside a .reveal-stagger group the children arrive one after another.
   - Content is only hidden when JavaScript is on (the "js" class), so the
     page is always complete without it.
   - With "reduce motion" turned on, everything is shown right away.
   ========================================================================== */

var revealReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

function showAll(items) {
  for (var i = 0; i < items.length; i++) {
    items[i].classList.add("is-revealed");
  }
}

function setupReveals() {
  var reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) {
    return;
  }

  /* Give each child of a stagger group its place in line (used by CSS) */
  var groups = document.querySelectorAll(".reveal-stagger");
  for (var g = 0; g < groups.length; g++) {
    var children = groups[g].children;
    for (var c = 0; c < children.length; c++) {
      children[c].style.setProperty("--stagger", String(Math.min(c, 5)));
    }
  }

  if (revealReduced.matches || !("IntersectionObserver" in window)) {
    showAll(reveals);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target); /* reveal once, never again */
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  for (var i = 0; i < reveals.length; i++) {
    observer.observe(reveals[i]);
  }

  /* Jumping to an anchor (e.g. checklist.html#ra11261) shows that section
     and everything above it right away, so the reader never lands on a blank */
  function revealUpToHash() {
    var target = location.hash && document.getElementById(location.hash.slice(1));
    if (!target) {
      return;
    }
    for (var j = 0; j < reveals.length; j++) {
      var item = reveals[j];
      if (item === target || item.contains(target) ||
          (item.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING)) {
        item.classList.add("is-revealed");
      }
    }
  }
  revealUpToHash();
  window.addEventListener("hashchange", revealUpToHash);

  /* Printing or a "find in page" should never meet hidden sections */
  window.addEventListener("beforeprint", function () {
    showAll(reveals);
  });
}

document.addEventListener("DOMContentLoaded", setupReveals);

/* ==========================================================================
   nav.js: shared by every page.
   - Marks the page as "JavaScript on" so the mobile menu can collapse
   - Fills in the site name from SITE_NAME (data.js)
   - Runs the mobile menu: the button's icon morphs from lines to a cross,
     the panel slides down under the header, the page behind it locks,
     and the links rise in one after another
   Loaded in <head>, so it runs before the page is drawn.
   ========================================================================== */

/* Add the "js" class right away so CSS can hide the mobile menu without a flash */
document.documentElement.classList.add("js");

/* Put the site name everywhere it appears */
function applySiteName() {
  if (typeof SITE_NAME !== "string") {
    return;
  }
  var nameSpots = document.querySelectorAll("[data-site-name]");
  for (var i = 0; i < nameSpots.length; i++) {
    nameSpots[i].textContent = SITE_NAME;
  }
  /* Page titles are written as "Page · Simula"; swap in the stored name */
  document.title = document.title.replace("Simula", SITE_NAME);
}

/* Mobile menu: open or close the panel, morph the icon, lock the page */
function setMenuOpen(toggle, nav, isOpen) {
  toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  toggle.classList.toggle("is-open", isOpen);
  nav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

function setupMenu() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) {
    return;
  }

  /* Button click: flip open/closed */
  toggle.addEventListener("click", function () {
    var isOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(toggle, nav, !isOpen);
  });

  /* Clicking a link closes the menu and lets the page change */
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setMenuOpen(toggle, nav, false);
    }
  });

  /* Escape closes the menu and returns focus to the button */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(toggle, nav, false);
      toggle.focus();
    }
  });

  /* A tap on the page behind the panel closes it */
  document.addEventListener("click", function (event) {
    if (toggle.getAttribute("aria-expanded") !== "true") {
      return;
    }
    if (nav.contains(event.target) || toggle.contains(event.target)) {
      return;
    }
    setMenuOpen(toggle, nav, false);
  });

  /* Growing to desktop width lays the links back in one row; close the panel
     so the page is never left locked behind it */
  var desktop = window.matchMedia("(min-width: 64rem)");
  function onDesktop(change) {
    if (change.matches) {
      setMenuOpen(toggle, nav, false);
    }
  }
  if (desktop.addEventListener) {
    desktop.addEventListener("change", onDesktop);
  } else if (desktop.addListener) {
    desktop.addListener(onDesktop); /* older browsers */
  }
}

document.addEventListener("DOMContentLoaded", function () {
  applySiteName();
  setupMenu();
});

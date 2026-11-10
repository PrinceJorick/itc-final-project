/* ==========================================================================
   nav.js: shared by every page.
   - Marks the page as "JavaScript on" so the mobile menu can collapse
   - Fills in the site name from SITE_NAME (data.js)
   - Opens and closes the mobile menu (button, link click, Escape key)
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
  /* Page titles are written as "Page · OJT to Offer"; swap in the stored name */
  document.title = document.title.replace("OJT to Offer", SITE_NAME);
}

/* Mobile menu: show or hide the nav links */
function setMenuOpen(toggle, nav, isOpen) {
  toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  nav.classList.toggle("is-open", isOpen);
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

  /* Clicking a link closes the menu */
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
}

document.addEventListener("DOMContentLoaded", function () {
  applySiteName();
  setupMenu();
});

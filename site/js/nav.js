/* ==========================================================================
   nav.js: shared by every page.
   - Marks the page as "JavaScript on" so the mobile menu can collapse
   - Fills in the site name from SITE_NAME (data.js)
   - Light/dark theme: applies a saved choice before the page is drawn and
     runs the sun/moon toggle in the header (no saved choice = follow the
     device setting)
   - Runs the mobile menu: the button's icon morphs from lines to a cross,
     the panel slides down under the header, the page behind it locks,
     and the links rise in one after another
   Loaded in <head>, so it runs before the page is drawn.
   ========================================================================== */

/* Add the "js" class right away so CSS can hide the mobile menu without a flash */
document.documentElement.classList.add("js");

/* THEME ------------------------------------------------------------------
   The choice is saved as "light" or "dark" under THEME_KEY. Without a saved
   choice, no data-theme is set and CSS follows prefers-color-scheme. */
var THEME_KEY = "simula-theme";
var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function savedTheme() {
  try {
    var value = localStorage.getItem(THEME_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch (error) {
    return null; /* storage blocked: follow the device */
  }
}

/* The theme the page is showing right now */
function currentTheme() {
  return savedTheme() || (systemDark.matches ? "dark" : "light");
}

/* Apply a saved choice immediately (this line runs before the body exists) */
if (savedTheme()) {
  document.documentElement.setAttribute("data-theme", savedTheme());
}

/* Keep the toggle's pressed state and label in step with the theme */
function syncThemeToggle() {
  var toggle = document.querySelector(".theme-toggle");
  if (!toggle) {
    return;
  }
  var isDark = currentTheme() === "dark";
  toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  toggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function setupThemeToggle() {
  var toggle = document.querySelector(".theme-toggle");
  if (!toggle) {
    return;
  }
  toggle.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    var root = document.documentElement;
    /* Fade colors for a moment so the switch feels smooth, not abrupt */
    root.classList.add("theme-changing");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (error) {
      /* Not saved, but the switch still works on this page */
    }
    syncThemeToggle();
    setTimeout(function () {
      root.classList.remove("theme-changing");
    }, 320);
  });

  /* If the device switches themes and nothing is saved, follow it */
  var onSystemChange = function () {
    if (!savedTheme()) {
      syncThemeToggle();
    }
  };
  if (systemDark.addEventListener) {
    systemDark.addEventListener("change", onSystemChange);
  } else if (systemDark.addListener) {
    systemDark.addListener(onSystemChange); /* older browsers */
  }
  syncThemeToggle();
}

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
  setupThemeToggle();
  setupMenu();
});

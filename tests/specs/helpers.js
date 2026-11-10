// Shared helpers for the tests.
const path = require("path");
const { pathToFileURL } = require("url");
const { expect } = require("@playwright/test");

const SITE_DIR = path.resolve(__dirname, "../../site");

const PAGES = [
  { file: "index.html", title: /OJT to Offer/ },
  { file: "resume-guide.html", title: /Resume Guide/ },
  { file: "builder.html", title: /Resume Builder/ },
  { file: "interview.html", title: /Interview Practice/ },
  { file: "checklist.html", title: /Pre-Employment Checklist/ },
  { file: "about.html", title: /About and Contact/ }
];

function pageUrl(file) {
  return pathToFileURL(path.join(SITE_DIR, file)).href;
}

// Hosts the site is allowed to contact (Google Fonts only).
const ALLOWED_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

// Open a page and collect console errors and outside requests.
async function openPage(page, file) {
  const errors = [];
  const external = [];
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("request", (req) => {
    const url = new URL(req.url());
    if (url.protocol.startsWith("http") && !ALLOWED_HOSTS.includes(url.hostname)) {
      external.push(req.url());
    }
  });
  await page.goto(pageUrl(file));
  return { errors, external };
}

// True when the mobile "Menu" button is showing.
async function isMobileMenu(page) {
  return page.locator(".nav-toggle").isVisible();
}

// Make sure the main nav links are visible (open the menu on phones).
async function showNav(page) {
  if (await isMobileMenu(page)) {
    const toggle = page.locator(".nav-toggle");
    if ((await toggle.getAttribute("aria-expanded")) !== "true") {
      await toggle.click();
    }
  }
  await expect(page.locator("#site-nav")).toBeVisible();
}

module.exports = { PAGES, pageUrl, openPage, showNav, isMobileMenu };

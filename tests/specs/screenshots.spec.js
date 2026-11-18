// Saves a full-page screenshot of every page at both widths, in light and
// dark mode, to docs/screenshots/ (e.g. index-desktop-dark.png).
// Runs only when asked: `npm run screenshots` (sets SCREENSHOTS=1).
const path = require("path");
const { test } = require("@playwright/test");
const { PAGES, openPage } = require("./helpers");

const OUT = path.resolve(__dirname, "../../docs/screenshots");

for (const p of PAGES) {
  for (const scheme of ["light", "dark"]) {
    test(`screenshot ${p.file} (${scheme})`, async ({ page }, testInfo) => {
      test.skip(!process.env.SCREENSHOTS, "Run `npm run screenshots` to refresh screenshots");
      const size = testInfo.project.name.startsWith("mobile") ? "mobile" : "desktop";
      await page.emulateMedia({ colorScheme: scheme });
      await openPage(page, p.file);
      if (p.file === "builder.html") {
        page.on("dialog", (d) => d.accept());
        await page.click("#load-sample");
      }
      if (p.file === "interview.html") {
        await page.click("#reveal-btn"); // show the inverted answer panel
      }
      if (p.file === "checklist.html") {
        await page.locator(".checklist input[type=checkbox]").first().check(); // show a checked box
      }
      await page.waitForLoadState("load");
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => window.scrollTo(0, 0)); // keep the sticky header at the top
      const name = p.file.replace(".html", "");
      await page.screenshot({ path: path.join(OUT, `${name}-${size}-${scheme}.png`), fullPage: true });
    });
  }
}

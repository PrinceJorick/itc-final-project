// Saves a full-page screenshot of every page at both widths to docs/screenshots/.
const path = require("path");
const { test } = require("@playwright/test");
const { PAGES, openPage } = require("./helpers");

const OUT = path.resolve(__dirname, "../../docs/screenshots");

for (const p of PAGES) {
  test(`screenshot ${p.file}`, async ({ page }, testInfo) => {
    const size = testInfo.project.name.startsWith("mobile") ? "mobile" : "desktop";
    await openPage(page, p.file);
    if (p.file === "builder.html") {
      page.on("dialog", (d) => d.accept());
      await page.click("#load-sample");
    }
    await page.waitForLoadState("load");
    await page.evaluate(() => document.fonts.ready);
    const name = p.file.replace(".html", "");
    await page.screenshot({ path: path.join(OUT, `${name}-${size}.png`), fullPage: true });
  });
}

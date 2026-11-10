// Every page: loads cleanly, no sideways scroll, images load, only Google Fonts
// is contacted, and every nav link goes to the right page.
const { test, expect } = require("@playwright/test");
const { PAGES, openPage, showNav } = require("./helpers");

for (const p of PAGES) {
  test.describe(p.file, () => {
    test("loads with no console errors or outside requests", async ({ page }) => {
      const { errors, external } = await openPage(page, p.file);
      await page.waitForLoadState("load");
      await expect(page).toHaveTitle(p.title);
      expect(errors, "console errors").toEqual([]);
      expect(external, "requests other than Google Fonts").toEqual([]);
    });

    test("has no horizontal scroll", async ({ page }) => {
      await openPage(page, p.file);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("has no broken images and every image has alt text", async ({ page }) => {
      await openPage(page, p.file);
      await page.waitForLoadState("load");
      const images = await page.$$eval("img", (imgs) => imgs.map((img) => ({
        src: img.getAttribute("src"),
        loaded: img.complete && img.naturalWidth > 0,
        hasAlt: img.hasAttribute("alt")
      })));
      expect(images.length).toBeGreaterThan(0);
      for (const img of images) {
        expect(img.loaded, `image ${img.src} loads`).toBe(true);
        expect(img.hasAlt, `image ${img.src} has alt`).toBe(true);
      }
    });

    test("marks itself as the current page in the nav", async ({ page }) => {
      await openPage(page, p.file);
      await expect(page.locator(`#site-nav a[href="${p.file}"]`)).toHaveAttribute("aria-current", "page");
      await expect(page.locator('#site-nav a[aria-current="page"]')).toHaveCount(1);
    });

    test("every nav link opens the right page", async ({ page }) => {
      for (const target of PAGES) {
        await openPage(page, p.file);
        await showNav(page);
        await page.locator(`#site-nav a[href="${target.file}"]`).click();
        await expect(page).toHaveURL(new RegExp(target.file.replace(".", "\\.") + "$"));
        await expect(page).toHaveTitle(target.title);
      }
    });
  });
}

test("every internal link points to a page that exists", async ({ page }) => {
  const fs = require("fs");
  const path = require("path");
  for (const p of PAGES) {
    await openPage(page, p.file);
    const hrefs = await page.$$eval("a[href]", (links) => links.map((a) => a.getAttribute("href")));
    for (const href of hrefs) {
      if (/^(https?:|mailto:|#)/.test(href)) continue;
      const file = href.split("#")[0];
      expect(fs.existsSync(path.resolve(__dirname, "../../site", file)), `${p.file} → ${href}`).toBe(true);
    }
  }
});

// Mono theme: every page in light and dark (device setting and the manual
// toggle), the matching illustrations, the favicon, and black-on-white print.
const { test, expect } = require("@playwright/test");
const { PAGES, openPage } = require("./helpers");

// Which illustration file each <picture> is showing right now
async function shownIllustrations(page) {
  return page.$$eval("picture img", (imgs) => imgs.map((img) => img.currentSrc));
}

for (const p of PAGES) {
  for (const scheme of ["light", "dark"]) {
    test(`${p.file} works in ${scheme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      const { errors } = await openPage(page, p.file);
      await page.waitForLoadState("load");

      expect(errors, "console errors").toEqual([]);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, "horizontal scroll").toBeLessThanOrEqual(0);

      // Every image loads, and illustrations come from the matching folder
      const broken = await page.$$eval("img", (imgs) => imgs.filter((img) => !(img.complete && img.naturalWidth > 0)).map((img) => img.src));
      expect(broken).toEqual([]);
      for (const src of await shownIllustrations(page)) {
        expect(src, "illustration matches the theme").toContain(`/images/${scheme}/`);
      }

      // The header mark is painted with the theme's ink
      const tile = await page.locator(".site-header .brand-mark rect").evaluate((el) => getComputedStyle(el).fill);
      expect(tile).toBe(scheme === "dark" ? "rgb(250, 250, 250)" : "rgb(10, 10, 10)");
    });
  }
}

test("the manual toggle also swaps the illustrations", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await openPage(page, "resume-guide.html");
  await page.waitForLoadState("load");
  expect((await shownIllustrations(page))[0]).toContain("/images/light/");

  await page.locator(".theme-toggle").click();
  await expect.poll(async () => (await shownIllustrations(page))[0]).toContain("/images/dark/");

  // The choice is remembered on the next page, even though the device is light
  await openPage(page, "interview.html");
  await page.waitForLoadState("load");
  expect((await shownIllustrations(page))[0]).toContain("/images/dark/");

  await page.locator(".theme-toggle").click();
  await expect.poll(async () => (await shownIllustrations(page))[0]).toContain("/images/light/");
});

test("the favicon is the mono SVG and loads", async ({ page }) => {
  await openPage(page, "index.html");
  const href = await page.locator('link[rel="icon"]').getAttribute("href");
  expect(href).toBe("images/favicon.svg");
  const ok = await page.evaluate(async (url) => {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img.naturalWidth > 0;
  }, href);
  expect(ok).toBe(true);
});

for (const scheme of ["light", "dark"]) {
  test(`printed resume is black on white (${scheme} mode)`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await openPage(page, "builder.html");
    page.on("dialog", (d) => d.accept());
    await page.click("#load-sample");
    await page.emulateMedia({ media: "print", colorScheme: scheme });
    // print.css applies a moment after the switch, so poll until it settles
    const colors = () => page.evaluate(() => {
      const sheet = document.querySelector("#resume-preview");
      return [
        getComputedStyle(document.body).backgroundColor,
        getComputedStyle(sheet).backgroundColor,
        getComputedStyle(sheet).color
      ].join(" | ");
    });
    await expect.poll(colors).toBe("rgb(255, 255, 255) | rgb(255, 255, 255) | rgb(0, 0, 0)");
  });
}

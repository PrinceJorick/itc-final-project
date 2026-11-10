// Accessibility: keyboard reach, visible focus, labels, and WCAG AA contrast.
const { test, expect } = require("@playwright/test");
const { PAGES, openPage } = require("./helpers");

for (const p of PAGES) {
  test.describe(p.file, () => {
    test("every form control has a label", async ({ page }) => {
      await openPage(page, p.file);
      const unlabeled = await page.$$eval("input, select, textarea", (els) => els
        .filter((el) => el.type !== "hidden")
        .filter((el) => !(el.labels && el.labels.length) && !el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby"))
        .map((el) => el.id || el.name));
      expect(unlabeled).toEqual([]);
    });

    test("keyboard Tab reaches controls and focus is always visible", async ({ page }) => {
      await openPage(page, p.file);
      // Open the mobile menu so its links are in the Tab order too
      if (await page.locator(".nav-toggle").isVisible()) {
        await page.locator(".nav-toggle").click();
      }
      await page.locator("body").focus();
      const seen = new Set();
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          // Radios/checkboxes hidden under styled labels show focus on their label or track
          const target = el.closest(".filter-chip") || (el.closest(".switch") && el.closest(".switch").querySelector(".switch-track")) || el;
          const style = getComputedStyle(target);
          const hasOutline = style.outlineStyle !== "none" && parseFloat(style.outlineWidth) >= 2;
          return { key: el.tagName + "#" + (el.id || el.textContent.trim().slice(0, 30)), visible: hasOutline };
        });
        if (!info) continue;
        expect(info.visible, `focus visible on ${info.key}`).toBe(true);
        seen.add(info.key);
      }
      expect(seen.size).toBeGreaterThan(5);
    });

    test("text meets WCAG AA contrast", async ({ page }) => {
      await openPage(page, p.file);
      await page.waitForLoadState("load");
      // Fill dynamic parts so their text is checked too
      if (p.file === "builder.html") {
        page.on("dialog", (d) => d.accept());
        await page.click("#load-sample");
        await page.click("#jf-sample");
      }
      if (p.file === "interview.html") await page.click("#reveal-btn");

      const failures = await page.evaluate(() => {
        function parse(color) {
          const m = color.match(/rgba?\(([^)]+)\)/);
          if (!m) return [0, 0, 0, 0];
          const parts = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
          return [parts[0], parts[1], parts[2], parts.length > 3 ? parts[3] : 1];
        }
        function blend(top, bottom) {
          const a = top[3];
          return [0, 1, 2].map((i) => top[i] * a + bottom[i] * (1 - a)).concat(1);
        }
        function backgroundOf(el) {
          const layers = [];
          for (let node = el; node && node.nodeType === 1; node = node.parentElement) {
            const bg = parse(getComputedStyle(node).backgroundColor);
            if (bg[3] > 0) layers.push(bg);
            if (bg[3] === 1) break;
          }
          let color = [255, 255, 255, 1];
          for (let i = layers.length - 1; i >= 0; i--) color = blend(layers[i], color);
          return color;
        }
        function luminance(c) {
          const [r, g, b] = c.slice(0, 3).map((v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }
        function ratio(a, b) {
          const la = luminance(a), lb = luminance(b);
          return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
        }
        const out = [];
        const all = document.querySelectorAll("body *:not(svg):not(svg *):not(script):not(style)");
        for (const el of all) {
          const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
          if (!hasText) continue;
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          if (!rect.width || !rect.height || style.visibility === "hidden" || el.closest(".visually-hidden, .skip-link, [hidden]")) continue;
          const bg = backgroundOf(el);
          const fg = blend(parse(style.color), bg);
          const size = parseFloat(style.fontSize);
          const bold = Number(style.fontWeight) >= 700;
          const large = size >= 24 || (bold && size >= 18.66);
          const r = ratio(fg, bg);
          if (r < (large ? 3 : 4.5)) {
            out.push(`${el.tagName}.${el.className} "${el.textContent.trim().slice(0, 40)}" ${r.toFixed(2)}:1`);
          }
        }
        return out;
      });
      expect(failures).toEqual([]);
    });
  });
}

test("animations respect prefers-reduced-motion", async ({ page }) => {
  await openPage(page, "index.html");
  // The register meter fills through a width transition; under reduced motion it must be instant
  const duration = await page.locator(".reg-meter i").first()
    .evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(parseFloat(duration)).toBeLessThan(0.01);
  // Scroll-reveal sections must settle fully visible instead of animating in
  const opacity = await page.locator(".reveal").first()
    .evaluate((el) => getComputedStyle(el).opacity);
  expect(parseFloat(opacity)).toBe(1);
});

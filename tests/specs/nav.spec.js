// Navigation: skip link, hamburger menu, keyboard use.
const { test, expect } = require("@playwright/test");
const { openPage, isMobileMenu } = require("./helpers");

test("skip link is the first Tab stop and jumps to main content", async ({ page }) => {
  await openPage(page, "index.html");
  await page.keyboard.press("Tab");
  const skip = page.locator(".skip-link");
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("mobile menu opens, closes on link click, and closes with Escape", async ({ page }) => {
  await openPage(page, "index.html");
  test.skip(!(await isMobileMenu(page)), "Menu button only shows on small screens");

  const toggle = page.locator(".nav-toggle");
  const nav = page.locator("#site-nav");
  await expect(nav).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(nav).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();

  // Keyboard only: open with Enter, then follow a link
  await page.keyboard.press("Enter");
  await expect(nav).toBeVisible();
  await page.locator('#site-nav a[href="interview.html"]').click();
  await expect(page).toHaveURL(/interview\.html$/);
  await expect(page.locator("#site-nav")).toBeHidden();
});

test("desktop shows all nav links without a menu button", async ({ page }) => {
  await openPage(page, "index.html");
  test.skip(await isMobileMenu(page), "Desktop only");
  await expect(page.locator(".nav-toggle")).toBeHidden();
  await expect(page.locator("#site-nav a")).toHaveCount(7);
  for (const link of await page.locator("#site-nav a").all()) {
    await expect(link).toBeVisible();
  }
});

test("theme toggle switches to dark, remembers it, and switches back", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await openPage(page, "index.html");
  const toggle = page.locator(".theme-toggle");
  const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  const lightBg = await bg();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(await bg()).not.toBe(lightBg);

  // The choice is saved and applied on every page
  await openPage(page, "checklist.html");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator(".theme-toggle")).toHaveAttribute("aria-pressed", "true");

  await page.locator(".theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await bg()).toBe(lightBg);
});

test("follows the device's dark setting when nothing is saved", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await openPage(page, "index.html");
  await expect(page.locator(".theme-toggle")).toHaveAttribute("aria-pressed", "true");
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe("rgb(15, 19, 17)");
});

test("the current page has a single highlight, with no underline", async ({ page }) => {
  await openPage(page, "interview.html");
  const current = page.locator('#site-nav a[aria-current="page"]');
  if (await page.locator(".nav-toggle").isVisible()) await page.locator(".nav-toggle").click();
  await current.click();
  const style = await page.locator('#site-nav a[aria-current="page"]').evaluate((el) => {
    const s = getComputedStyle(el);
    return { line: s.textDecorationLine, shadow: s.boxShadow, outline: s.outlineStyle };
  });
  expect(style.line).toBe("none");
  expect(style.shadow).toBe("none");
  expect(style.outline).toBe("none"); // no focus ring after a mouse click
});

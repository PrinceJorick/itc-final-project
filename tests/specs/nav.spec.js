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

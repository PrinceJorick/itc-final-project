// Pre-employment checklist: saved checkboxes, progress bar, how-to details.
const { test, expect } = require("@playwright/test");
const { openPage } = require("./helpers");

test.beforeEach(async ({ page }) => {
  page.on("dialog", (dialog) => dialog.accept());
  await openPage(page, "checklist.html");
});

test("shows every document with RA 11261 badges", async ({ page }) => {
  await expect(page.locator(".checklist-item")).toHaveCount(13);
  await expect(page.locator("#item-nbi .badge-free")).toBeVisible();
  await expect(page.locator("#item-sss .badge-free")).toHaveCount(0);
  await expect(page.locator("#progress-label")).toHaveText("0 of 13 documents ready");
});

test("checking items updates progress and survives a reload", async ({ page }) => {
  await page.locator("#item-psa input[type=checkbox]").check();
  await page.locator("#item-nbi input[type=checkbox]").check();
  await expect(page.locator("#progress-label")).toHaveText("2 of 13 documents ready");
  await expect(page.locator("#progress-bar")).toHaveAttribute("aria-valuenow", "15");
  await expect(page.locator("#item-nbi")).toHaveClass(/is-done/);

  await page.reload();
  await expect(page.locator("#item-psa input[type=checkbox]")).toBeChecked();
  await expect(page.locator("#item-nbi input[type=checkbox]")).toBeChecked();
  await expect(page.locator("#item-tin input[type=checkbox]")).not.toBeChecked();
  await expect(page.locator("#progress-label")).toHaveText("2 of 13 documents ready");
  const width = await page.locator("#progress-fill").evaluate((el) => el.style.width);
  expect(width).toBe("15%");

  await page.click("#checklist-reset");
  await expect(page.locator("#progress-label")).toHaveText("0 of 13 documents ready");
});

test("'How to get it' expands with requirements, cost, and steps", async ({ page }) => {
  const details = page.locator("#item-psa .item-details");
  await expect(details.locator("dl")).toBeHidden();
  await details.locator("summary").click();
  await expect(details.locator("dl")).toBeVisible();
  await expect(details).toContainText("₱155");
  await expect(details.locator("ol li").first()).toBeVisible();
});

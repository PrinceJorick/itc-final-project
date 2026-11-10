// Demo contact form: validation and success message (nothing is sent).
const { test, expect } = require("@playwright/test");
const { openPage } = require("./helpers");

test.beforeEach(async ({ page }) => {
  await openPage(page, "about.html");
});

test("empty form shows an error under each field", async ({ page }) => {
  await page.click("#contact-form button[type=submit]");
  await expect(page.locator("#contact-name-error")).toHaveText("Please enter your name.");
  await expect(page.locator("#contact-email-error")).toHaveText("Please enter your email.");
  await expect(page.locator("#contact-topic-error")).toHaveText("Please choose a topic.");
  await expect(page.locator("#contact-message-error")).not.toBeEmpty();
  await expect(page.locator("#contact-name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#contact-name")).toBeFocused();
  await expect(page.locator("#contact-success")).toBeHidden();
});

test("bad email is rejected", async ({ page }) => {
  await page.fill("#contact-name", "Ana Reyes");
  await page.fill("#contact-email", "ana.reyes@gmail");
  await page.selectOption("#contact-topic", "tip");
  await page.fill("#contact-message", "Please add more BPO interview questions.");
  await page.click("#contact-form button[type=submit]");
  await expect(page.locator("#contact-email-error")).toContainText("doesn't look right");
  await expect(page.locator("#contact-success")).toBeHidden();
});

test("valid form shows the demo success message and sends nothing", async ({ page }) => {
  const requests = [];
  page.on("request", (req) => requests.push(req.url()));
  await page.fill("#contact-name", "Ana Reyes");
  await page.fill("#contact-email", "ana.reyes@example.com");
  await page.selectOption("#contact-topic", "feedback");
  await page.fill("#contact-message", "The checklist helped me a lot!");
  await page.click("#contact-form button[type=submit]");
  await expect(page.locator("#contact-success")).toBeVisible();
  await expect(page.locator("#contact-success")).toContainText("Thanks, Ana!");
  await expect(page.locator("#contact-success")).toContainText("nothing was sent");
  await expect(page.locator("#contact-name")).toHaveValue("");
  expect(requests.filter((u) => u.startsWith("http"))).toEqual([]);
});

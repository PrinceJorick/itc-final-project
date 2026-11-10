// Interview practice: filters, flashcards, random question, STAR template.
const { test, expect } = require("@playwright/test");
const { openPage } = require("./helpers");

test.beforeEach(async ({ page }) => {
  page.on("dialog", (dialog) => dialog.accept());
  await openPage(page, "interview.html");
});

test("category filter shows only that category", async ({ page }) => {
  await page.locator(".filter-chip", { hasText: "Behavioral" }).click();
  await expect(page.locator("#card-category")).toHaveText("Behavioral");
  const count = await page.locator("#card-count").textContent();
  const total = Number(count.match(/of (\d+)/)[1]);
  for (let i = 0; i < total; i++) {
    await expect(page.locator("#card-category")).toHaveText("Behavioral");
    await page.click("#next-btn");
  }
  await expect(page.locator("#question-list li")).toHaveCount(total);

  await page.locator(".filter-chip", { hasText: "Closing" }).click();
  await expect(page.locator("#card-category")).toHaveText("Closing");
  await page.locator(".filter-chip", { hasText: "All" }).click();
  await expect(page.locator("#card-count")).toHaveText(/of 2\d/);
});

test("flashcard reveals the tip and sample answer", async ({ page }) => {
  await expect(page.locator("#card-question")).toHaveText("Tell me about yourself.");
  await expect(page.locator("#card-answer")).toBeHidden();
  await page.click("#reveal-btn");
  await expect(page.locator("#card-answer")).toBeVisible();
  await expect(page.locator("#reveal-btn")).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#card-tip")).not.toBeEmpty();
  await expect(page.locator("#card-sample")).not.toBeEmpty();

  await page.click("#next-btn");
  await expect(page.locator("#card-answer")).toBeHidden();
  await expect(page.locator("#card-count")).toHaveText(/Question 2 of/);
  await page.click("#prev-btn");
  await expect(page.locator("#card-count")).toHaveText(/Question 1 of/);
});

test("random question picks a different question", async ({ page }) => {
  const first = await page.locator("#card-question").textContent();
  await page.click("#random-btn");
  await expect(page.locator("#card-question")).not.toHaveText(first);
});

test("question bank opens a question as a flashcard", async ({ page }) => {
  await page.locator(".question-bank summary").click();
  await page.locator("#question-list button", { hasText: "Why should we hire you?" }).click();
  await expect(page.locator("#card-question")).toHaveText("Why should we hire you?");
});

test("STAR answer is saved and restored after reload", async ({ page }) => {
  await page.fill("#star-question", "Tell me about a time you led a team.");
  await page.fill("#star-s", "Our org's sportsfest");
  await page.fill("#star-a", "I made a sign-up sheet");
  await expect(page.locator("#star-status")).toHaveText("Saved on this device");
  await page.reload();
  await expect(page.locator("#star-question")).toHaveValue("Tell me about a time you led a team.");
  await expect(page.locator("#star-s")).toHaveValue("Our org's sportsfest");
  await expect(page.locator("#star-a")).toHaveValue("I made a sign-up sheet");

  await page.click("#star-clear");
  await expect(page.locator("#star-s")).toHaveValue("");
  await page.reload();
  await expect(page.locator("#star-s")).toHaveValue("");
});

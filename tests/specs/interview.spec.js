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

test("write, edit, and delete your own card", async ({ page }) => {
  // Start on the empty "Yours" shelf
  await page.locator(".filter-chip", { hasText: "Yours" }).click();
  await expect(page.locator("#yours-empty")).toBeVisible();
  await expect(page.locator("#flashcard")).toBeHidden();

  // Write one through the editor
  await page.click("#empty-add-btn");
  await page.fill("#own-question", "Why did you choose your course?");
  await page.selectOption("#own-category", "intro");
  await page.fill("#own-tip", "Point at one concrete reason.");
  await page.fill("#own-answer", "I picked BS IT because of our robotics club.");
  await page.click("#card-editor button[type=submit]");
  await expect(page.locator("#card-question")).toHaveText("Why did you choose your course?");
  await expect(page.locator("#card-category")).toHaveText("Yours");
  await expect(page.locator("#edit-card-btn")).toBeVisible();
  await expect(page.locator("#delete-card-btn")).toBeVisible();
  await expect(page.locator("#own-status")).toHaveText("Saved on this device");
  await expect(page.locator("#question-list li")).toHaveCount(1);

  // It survives a reload (saved in localStorage)
  await page.reload();
  await page.locator(".filter-chip", { hasText: "Yours" }).click();
  await expect(page.locator("#card-question")).toHaveText("Why did you choose your course?");

  // It joins the built-ins under "All"
  await page.locator(".filter-chip", { hasText: "All" }).click();
  await expect(page.locator("#card-count")).toHaveText(/of 23/);
  await expect(page.locator("#card-category")).toHaveText("Intro");

  // Edit it from the "Yours" shelf
  await page.locator(".filter-chip", { hasText: "Yours" }).click();
  await page.click("#edit-card-btn");
  await expect(page.locator("#card-editor-title")).toHaveText("Edit your question");
  await expect(page.locator("#own-question")).toHaveValue("Why did you choose your course?");
  await page.fill("#own-question", "Why did you pick IT over other courses?");
  await page.click("#card-editor button[type=submit]");
  await expect(page.locator("#card-question")).toHaveText("Why did you pick IT over other courses?");

  // Delete it, and the shelf is empty again
  await page.click("#delete-card-btn");
  await expect(page.locator("#yours-empty")).toBeVisible();
  await expect(page.locator("#own-status")).toHaveText("Deleted.");
  await page.locator(".filter-chip", { hasText: "All" }).click();
  await expect(page.locator("#card-count")).toHaveText(/of 22/);
});

test("the editor insists on a question before saving", async ({ page }) => {
  await page.click("#add-card-btn");
  await expect(page.locator("#card-editor")).toBeVisible();
  await page.click("#card-editor button[type=submit]");
  await expect(page.locator("#own-question-error")).toHaveText("Write the question first.");
  await expect(page.locator("#own-question")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#card-editor")).toBeVisible();

  // Cancel closes the editor without saving anything
  await page.click("#own-cancel");
  await expect(page.locator("#card-editor")).toBeHidden();
  await expect(await page.evaluate(() => localStorage.getItem("simulaCards"))).toBeNull();
});

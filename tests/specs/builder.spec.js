// Resume builder: input → preview → reload restores → templates → print.
const { test, expect } = require("@playwright/test");
const { openPage } = require("./helpers");

test.beforeEach(async ({ page }) => {
  page.on("dialog", (dialog) => dialog.accept()); // say "OK" to confirm() boxes
  await openPage(page, "builder.html");
});

test("typing updates the live preview", async ({ page }) => {
  const preview = page.locator("#resume-preview");
  await page.fill("#fullName", "Ana Reyes");
  await page.fill("#email", "ana.reyes@example.com");
  await page.fill("#objective", "IT student seeking a help desk OJT.");
  await page.fill("#skills-technical", "Excel, Python");
  await page.fill("#projects-0-title", "Library Kiosk");
  await page.fill("#projects-0-bullets", "Built a kiosk app\nTested with 30 students");

  await expect(preview.locator(".resume-name")).toHaveText("Ana Reyes");
  await expect(preview).toContainText("ana.reyes@example.com");
  await expect(preview).toContainText("IT student seeking a help desk OJT.");
  await expect(preview).toContainText("Excel, Python");
  await expect(preview).toContainText("Library Kiosk");
  await expect(preview.locator("li", { hasText: "Tested with 30 students" })).toHaveCount(1);
});

test("reload restores the draft from localStorage (key: resumeDraft)", async ({ page }) => {
  await page.fill("#fullName", "Ana Reyes");
  await page.fill("#projects-0-title", "Library Kiosk");
  await page.locator('input[name="template"][value="modern"]').check({ force: true });
  await expect(page.locator("#save-status")).toHaveText("Saved on this device");

  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("resumeDraft")));
  expect(saved.personal.fullName).toBe("Ana Reyes");
  expect(saved.projects[0].title).toBe("Library Kiosk");
  expect(saved.template).toBe("modern");
  expect(Array.isArray(saved.skills.technical)).toBe(true);

  await page.reload();
  await expect(page.locator("#fullName")).toHaveValue("Ana Reyes");
  await expect(page.locator("#projects-0-title")).toHaveValue("Library Kiosk");
  await expect(page.locator('input[name="template"][value="modern"]')).toBeChecked();
  await expect(page.locator("#resume-preview .resume-name")).toHaveText("Ana Reyes");
});

test("template switcher changes the resume style", async ({ page }) => {
  const preview = page.locator("#resume-preview");
  await expect(preview).toHaveClass(/resume-classic/);
  await page.locator(".template-switch label", { hasText: "Modern" }).click();
  await expect(preview).toHaveClass(/resume-modern/);
  const font = await preview.evaluate((el) => getComputedStyle(el).fontFamily);
  expect(font).toContain("Arial");
  await page.locator(".template-switch label", { hasText: "Classic" }).click();
  await expect(preview).toHaveClass(/resume-classic/);
});

test("add and remove entries in repeatable sections", async ({ page }) => {
  await expect(page.locator("#projects-list .entry")).toHaveCount(1);
  await page.click('[data-add="projects"]');
  await expect(page.locator("#projects-list .entry")).toHaveCount(2);
  await expect(page.locator("#projects-1-title")).toBeFocused();
  await page.fill("#projects-1-title", "Second Project");
  await expect(page.locator("#resume-preview")).toContainText("Second Project");

  await page.locator('#projects-list [data-remove="projects"][data-index="1"]').click();
  await expect(page.locator("#projects-list .entry")).toHaveCount(1);
  await expect(page.locator("#resume-preview")).not.toContainText("Second Project");

  for (const section of ["education", "organizations", "experience", "certifications"]) {
    const before = await page.locator(`#${section}-list .entry`).count();
    await page.click(`[data-add="${section}"]`);
    await expect(page.locator(`#${section}-list .entry`)).toHaveCount(before + 1);
  }
});

test("'No experience yet' hides Experience and puts Projects first", async ({ page }) => {
  await page.click('[data-add="experience"]');
  await page.fill("#experience-0-position", "Cashier");
  await page.fill("#education-0-school", "BatStateU");
  await page.fill("#projects-0-title", "Library Kiosk");
  await expect(page.locator("#resume-preview")).toContainText("Cashier");

  await page.locator("label.switch").click();
  await expect(page.locator("#no-experience")).toBeChecked();
  await expect(page.locator("#experience-section")).toBeHidden();
  await expect(page.locator("#no-exp-note")).toBeVisible();
  await expect(page.locator("#resume-preview")).not.toContainText("Cashier");
  const headings = await page.locator("#resume-preview .resume-section h2").allTextContents();
  expect(headings.indexOf("Projects")).toBeLessThan(headings.indexOf("Education"));
});

test("load sample, then clear all with confirmation", async ({ page }) => {
  await page.click("#load-sample");
  await expect(page.locator("#fullName")).toHaveValue("Maria Clara Santos");
  await expect(page.locator("#resume-preview .resume-name")).toHaveText("Maria Clara Santos");

  await page.click("#clear-all");
  await expect(page.locator("#fullName")).toHaveValue("");
  await expect(page.locator("#resume-preview .resume-name")).toHaveText("Your Name");
  const saved = await page.evaluate(() => localStorage.getItem("resumeDraft"));
  expect(saved).toBeNull();
});

test("clear all does nothing if the user cancels", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await openPage(page, "builder.html");
  await page.fill("#fullName", "Keep Me");
  page.on("dialog", (dialog) => dialog.dismiss());
  await page.click("#clear-all");
  await expect(page.locator("#fullName")).toHaveValue("Keep Me");
  await context.close();
});

test("print layout shows only the resume, on one page", async ({ page }) => {
  await page.click("#load-sample");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".site-header")).toBeHidden();
  await expect(page.locator("#resume-form")).toBeHidden();
  await expect(page.locator(".builder-toolbar")).toBeHidden();
  await expect(page.locator(".site-footer")).toBeHidden();
  await expect(page.locator("#resume-preview")).toBeVisible();

  for (const format of ["A4", "Letter"]) {
    const pdf = await page.pdf({ format });
    const pageCount = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
    expect(pageCount, `${format} pages`).toBe(1);
  }
});

test("Download PDF opens the print dialog", async ({ page }) => {
  await page.evaluate(() => { window.__printed = 0; window.print = () => { window.__printed++; }; });
  await page.fill("#fullName", "Ana Reyes");
  await page.click("#download-pdf");
  expect(await page.evaluate(() => window.__printed)).toBe(1);
});

test("bullet helper writes a bullet and inserts it into a project", async ({ page }) => {
  await page.fill("#projects-0-title", "Org Tracker");
  await page.selectOption("#bh-verb", "Developed");
  await page.fill("#bh-what", "an attendance tracker");
  await page.fill("#bh-tool", "Google Sheets");
  await page.fill("#bh-result", "faster sign-ins");
  const sentence = "Developed an attendance tracker using Google Sheets, resulting in faster sign-ins.";
  await expect(page.locator("#bh-sentence")).toHaveText(sentence);

  await page.selectOption("#bh-target", "projects:0");
  await page.click("#bh-insert");
  await expect(page.locator("#projects-0-bullets")).toHaveValue(sentence);
  await expect(page.locator("#resume-preview li", { hasText: sentence })).toHaveCount(1);
  await expect(page.locator("#bh-status")).toContainText("Org Tracker");
});

test("bullet helper can insert into an organization", async ({ page }) => {
  await page.fill("#organizations-0-org", "Junior IT Society");
  await page.fill("#bh-what", "a coding workshop for 150 students");
  await page.selectOption("#bh-target", "organizations:0");
  await page.click("#bh-insert");
  await expect(page.locator("#organizations-0-bullets")).toHaveValue(/a coding workshop for 150 students\./);
});

test("job-fit checker matches skills from a sample posting", async ({ page }) => {
  await page.click("#load-sample");
  await page.click("#jf-sample");
  await expect(page.locator("#jf-results")).toBeVisible();
  const matched = await page.locator("#jf-matched li").allTextContents();
  const missing = await page.locator("#jf-missing li").allTextContents();
  expect(matched).toEqual(expect.arrayContaining(["HTML", "CSS", "JavaScript", "Troubleshooting", "Microsoft Excel", "Teamwork"]));
  expect(missing).toEqual(expect.arrayContaining(["Customer service"]));
  const percent = Number((await page.locator("#jf-percent").textContent()).replace("%", ""));
  expect(percent).toBe(Math.round((matched.length / (matched.length + missing.length)) * 100));
  await expect(page.locator("#jf-tips li").first()).toBeVisible();
});

test("job-fit matching is case-insensitive and whole-word", async ({ page }) => {
  await page.fill("#skills-technical", "javascript");
  await page.fill("#jf-posting", "Must know JAVASCRIPT. Java is a plus. Also SQL.");
  await page.click("#jf-check");
  const matched = await page.locator("#jf-matched li").allTextContents();
  const missing = await page.locator("#jf-missing li").allTextContents();
  expect(matched).toEqual(["JavaScript"]);          // case-insensitive
  expect(missing).toEqual(expect.arrayContaining(["Java", "SQL"])); // "Java" found on its own
  expect(missing).not.toContain("JavaScript");
  // "javascript" on the resume must not count as having "Java"
  expect(matched).not.toContain("Java");
});

test("job-fit checker explains an empty posting", async ({ page }) => {
  await page.click("#jf-check");
  await expect(page.locator("#jf-tips")).toContainText("Paste a job or OJT posting first");
});

test("live preview is black and white in both templates and both themes", async ({ page }) => {
  for (const scheme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.click("#load-sample");
    for (const template of ["Classic", "Modern"]) {
      await page.locator(".template-switch label", { hasText: template }).click();
      const colors = await page.locator("#resume-preview").evaluate((sheet) => {
        const found = new Set([getComputedStyle(sheet).backgroundColor]);
        sheet.querySelectorAll("*").forEach((el) => {
          const s = getComputedStyle(el);
          found.add(s.color);
          if (parseFloat(s.borderBottomWidth) > 0) found.add(s.borderBottomColor);
        });
        return [...found];
      });
      for (const color of colors) {
        const [r, g, b] = color.match(/\d+/g).map(Number);
        expect(Math.max(r, g, b) - Math.min(r, g, b), `${template} ${scheme}: ${color} is gray`).toBeLessThanOrEqual(2);
      }
    }
  }
});

// v1.3 features: scroll reveals, hero demo, loading placeholders, backup,
// copy templates, privacy section, and the mobile menu backdrop.
const { test, expect } = require("@playwright/test");
const { openPage, isMobileMenu } = require("./helpers");

test.describe("with motion", () => {
  test.use({ reducedMotion: "no-preference" });

  test("only the hero shows at first; sections reveal on scroll", async ({ page }) => {
    await openPage(page, "index.html");
    const later = page.locator("section.reveal").last();
    await expect(later).not.toHaveClass(/is-revealed/);
    await later.scrollIntoViewIfNeeded();
    await expect(later).toHaveClass(/is-revealed/);
  });

  test("the hero demo lights up the four parts of a bullet", async ({ page }) => {
    await openPage(page, "index.html");
    await expect(page.locator("#bullet-demo .part.is-lit")).toHaveCount(4);
    await page.click("#demo-next");
    await expect(page.locator("#demo-weak")).toHaveText("Member of the events committee.");
    await expect(page.locator("#demo-count")).toHaveText("2 / 3");
    await expect(page.locator("#bullet-demo .part.is-lit")).toHaveCount(4);
  });

  test("job-fit check shows a loading state, then results", async ({ page }) => {
    await openPage(page, "builder.html");
    await page.click("#jf-sample");
    await expect(page.locator("#jf-check")).toHaveClass(/is-busy/);
    await expect(page.locator("#jf-check")).not.toHaveClass(/is-busy/);
    await expect(page.locator("#jf-results")).toBeVisible();
  });
});

test("loading placeholders are replaced by the real content", async ({ page }) => {
  await openPage(page, "builder.html");
  await expect(page.locator("#resume-preview .skeleton")).toHaveCount(0);
  await expect(page.locator("#resume-preview .resume-name")).toBeVisible();
  await openPage(page, "checklist.html");
  await expect(page.locator("#checklist .skeleton")).toHaveCount(0);
  await expect(page.locator("#checklist .checklist-item")).toHaveCount(13);
});

test("backup downloads a Simula file and restore brings it back", async ({ page }) => {
  await openPage(page, "builder.html");
  await page.fill("#fullName", "Ana Reyes");
  await expect(page.locator("#save-status")).toHaveText("Saved on this device");
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click('[data-backup="download"]')
  ]);
  expect(download.suggestedFilename()).toMatch(/^simula-backup-\d{4}-\d{2}-\d{2}\.json$/);
  const file = await download.path();
  const backup = JSON.parse(require("fs").readFileSync(file, "utf8"));
  expect(backup.app).toBe("simula");
  expect(JSON.parse(backup.data.resumeDraft).personal.fullName).toBe("Ana Reyes");

  // Wipe storage, then restore from the file on the About page
  await page.evaluate(() => localStorage.clear());
  await openPage(page, "about.html");
  const chooser = page.waitForEvent("filechooser");
  await page.click('#privacy [data-backup="restore"]');
  await (await chooser).setFiles(file);
  await page.waitForLoadState("load");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("resumeDraft") || "")).toContain("Ana Reyes");
});

test("a non-Simula file is refused with a clear message", async ({ page }) => {
  await openPage(page, "about.html");
  const chooser = page.waitForEvent("filechooser");
  await page.click('#privacy [data-backup="restore"]');
  await (await chooser).setFiles({ name: "x.json", mimeType: "application/json", buffer: Buffer.from('{"hello":1}') });
  await expect(page.locator("#privacy [data-backup-status]")).toContainText("isn't a Simula backup");
});

test("delete everything clears saved data after confirming", async ({ page }) => {
  await openPage(page, "about.html");
  await page.evaluate(() => localStorage.setItem("resumeDraft", "{}"));
  page.on("dialog", (d) => d.accept());
  await page.click('#privacy [data-backup="erase"]');
  await expect.poll(() => page.evaluate(() => localStorage.getItem("resumeDraft"))).toBeNull();
});

test("follow-up templates copy with a confirmation", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await openPage(page, "interview.html");
  const button = page.locator('[data-copy="tpl-thanks"]');
  await button.click();
  await expect(button).toHaveClass(/is-copied/);
  await expect(button).toContainText("Copied");
  await expect(page.locator("#copy-status")).toContainText("Copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("Thank you for meeting with me");
});

test("the relocation question is in the deck", async ({ page }) => {
  await openPage(page, "interview.html");
  await page.check('input[name="category"][value="closing"]');
  await page.locator("#question-bank summary").click();
  await expect(page.locator("#question-list")).toContainText("Are you willing to relocate?");
});

test("about lists a role only for the developer", async ({ page }) => {
  await openPage(page, "about.html");
  await expect(page.locator(".team-member")).toHaveCount(4);
  await expect(page.locator(".team-role")).toHaveCount(1);
  await expect(page.locator(".team-role")).toHaveText("Developer");
});

test("no sign-in anywhere", async ({ page }) => {
  for (const file of ["index.html", "builder.html", "about.html"]) {
    await openPage(page, file);
    await expect(page.locator('a[href="login.html"]')).toHaveCount(0);
  }
});

test("mobile menu fills the panel and frosts the page behind it", async ({ page }) => {
  await openPage(page, "index.html");
  test.skip(!(await isMobileMenu(page)), "Menu button only shows on small screens");
  await page.click(".nav-toggle");
  const widths = await page.evaluate(() => {
    const nav = document.querySelector("#site-nav ul").getBoundingClientRect().width;
    const link = document.querySelector("#site-nav li").getBoundingClientRect().width;
    const backdrop = getComputedStyle(document.body, "::before").content;
    return { nav, link, backdrop };
  });
  expect(widths.link).toBeCloseTo(widths.nav, 0);
  expect(widths.backdrop).not.toBe("none");
});

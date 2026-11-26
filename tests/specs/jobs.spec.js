// Jobs to search for: roles come from the resume, links are encoded searches,
// bad saved data doesn't break the page, and the offline note follows the network.
const { test, expect } = require("@playwright/test");
const { openPage } = require("./helpers");

const cards = (page) => page.locator("#jobs-list .job-card");
const titles = (page) => page.locator("#jobs-list .job-card h3");

test("empty resume shows the empty state and no cards", async ({ page }) => {
  await openPage(page, "builder.html");
  await expect(page.locator("#jobs-status")).toContainText("Add your degree");
  await expect(page.locator("#jobs-list")).toBeHidden();
});

test("sample resume suggests CS roles with reasons", async ({ page }) => {
  const { errors, external } = await openPage(page, "builder.html");
  await page.click("#load-sample");
  await expect(titles(page).first()).toHaveText("Junior Web Developer");
  const all = await titles(page).allTextContents();
  expect(all).toEqual(expect.arrayContaining(["Junior Software Developer", "IT Support Specialist"]));
  expect(new Set(all).size).toBe(all.length); // no duplicates
  expect(all).not.toContain("Accounting Assistant");
  await expect(cards(page).first()).toContainText("Your degree: BS Computer Science");
  await expect(cards(page).first()).toContainText("Skills you listed: HTML, CSS, JavaScript");
  expect(errors).toEqual([]);
  expect(external).toEqual([]); // nothing fetched just by showing suggestions
});

test("suggestions change when degree and skills change", async ({ page }) => {
  await openPage(page, "builder.html");
  await page.fill("#education-0-degree", "BS Accountancy");
  await expect(titles(page)).toHaveText(["Accounting Assistant"]);
  await page.fill("#skills-technical", "Python, SQL, Power BI");
  await expect(titles(page).first()).toHaveText("Junior Data Analyst");
  await page.fill("#projects-0-tools", "React, JavaScript, Figma");
  await expect(titles(page)).toContainText(["Frontend Developer"]);
});

test("search links are encoded, open in a new tab, and point at search pages", async ({ page }) => {
  await openPage(page, "builder.html");
  await page.fill("#skills-technical", "C++, C#, Git");
  const card = cards(page).filter({ hasText: "Junior Software Developer" });
  const links = card.locator(".job-links a");
  await expect(links).toHaveCount(5);
  const hrefs = await links.evaluateAll((as) => as.map((a) => [a.href, a.target, a.rel]));
  for (const [, target, rel] of hrefs) {
    expect(target).toBe("_blank");
    expect(rel).toBe("noopener noreferrer");
  }
  const [jobstreet, indeed, onlinejobs, kalibrr, linkedin] = hrefs.map((h) => new URL(h[0]));
  expect(jobstreet.href).toBe("https://ph.jobstreet.com/junior-software-developer-jobs");
  expect(indeed.searchParams.get("q")).toBe("junior software developer C++");
  expect(indeed.search).toContain("C%2B%2B");
  expect(indeed.searchParams.get("l")).toBe("Philippines");
  expect(onlinejobs.searchParams.get("jobkeyword")).toBe("junior software developer");
  expect(kalibrr.pathname).toBe("/home/te/junior%20software%20developer");
  expect(linkedin.searchParams.get("keywords")).toBe("junior software developer C++");
});

test("broken or odd saved data doesn't break the builder", async ({ page }) => {
  for (const saved of ["{not json", JSON.stringify({ skills: null, education: "x" }), "null"]) {
    const { errors } = await openPage(page, "builder.html");
    await page.evaluate((v) => localStorage.setItem("resumeDraft", v), saved);
    await page.reload();
    await expect(page.locator("#jobs-status")).toContainText("Add your degree");
    await page.fill("#fullName", "Ana");
    await expect(page.locator("#resume-preview .resume-name")).toHaveText("Ana");
    expect(errors).toEqual([]);
    await page.evaluate(() => localStorage.clear());
  }
});

test("offline note appears offline and goes away back online", async ({ page, context }) => {
  await openPage(page, "builder.html");
  await page.click("#load-sample");
  await expect(page.locator("#jobs-offline")).toBeHidden();
  await context.setOffline(true);
  await expect(page.locator("#jobs-offline")).toBeVisible();
  await expect(cards(page).first()).toBeVisible(); // matches still work offline
  await context.setOffline(false);
  await expect(page.locator("#jobs-offline")).toBeHidden();
});

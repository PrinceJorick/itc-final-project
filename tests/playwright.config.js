// Playwright config: runs every test at mobile (375px) and desktop (1280px).
// Tests open the site straight from the file system (file://), like a user would.
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./specs",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    browserName: "chromium",
    reducedMotion: "reduce"
  },
  projects: [
    { name: "mobile-375", use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
    { name: "desktop-1280", use: { viewport: { width: 1280, height: 800 } } }
  ]
});

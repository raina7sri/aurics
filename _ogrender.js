/* Regenerates og-image.png from og-card.html at 1200x630 (2x for retina).
 * Usage:  npm i -D playwright  &&  node _ogrender.js
 * Falls back to puppeteer if playwright is not installed. */
const path = require("path");

const cardUrl = "file://" + path.join(__dirname, "og-card.html").split(path.sep).join("/");
const out = path.join(__dirname, "og-image.png");
const clip = { x: 0, y: 0, width: 1200, height: 630 };

(async () => {
  let launch, isPlaywright = true;
  try {
    ({ chromium: launch } = require("playwright"));
  } catch {
    isPlaywright = false;
    try {
      launch = require("puppeteer");
    } catch {
      console.error("Install playwright (preferred) or puppeteer first.");
      process.exit(1);
    }
  }

  const browser = isPlaywright
    ? await launch.launch()
    : await launch.launch({ headless: "new", args: ["--no-sandbox"] });

  const page = isPlaywright
    ? await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 })
    : await browser.newPage();

  if (!isPlaywright) {
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  }

  await page.goto(cardUrl, { waitUntil: isPlaywright ? "load" : "networkidle2" });
  await page.screenshot({ path: out, clip });
  await browser.close();
  console.log("wrote og-image.png");
})();

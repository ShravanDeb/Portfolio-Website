import puppeteer from "puppeteer-core";
import { writeFileSync, existsSync } from "fs";

const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}/resume?print=1`;

const CHROME_PATHS = [
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
  "/snap/bin/chromium",
];

function findChrome() {
  for (const p of CHROME_PATHS) {
    if (existsSync(p)) return p;
  }
  return null;
}

const executablePath = findChrome();
if (!executablePath) {
  throw new Error("Chrome not found on system");
}

const browser = await puppeteer.launch({
  headless: true,
  executablePath,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();

  await page.setViewport({ width: 1024, height: 768 });

  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });

  await Promise.race([
    page.evaluate(() => document.fonts.ready),
    new Promise((r) => setTimeout(r, 5000)),
  ]);

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    displayHeaderFooter: false,
  });

  writeFileSync("Resume.pdf", pdf);
  console.log("Resume.pdf generated");
} finally {
  await browser.close();
}

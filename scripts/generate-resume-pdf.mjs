import puppeteer from "puppeteer";
import { writeFileSync } from "fs";

const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}/resume?print=1`;

const browser = await puppeteer.launch({
  headless: true,
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

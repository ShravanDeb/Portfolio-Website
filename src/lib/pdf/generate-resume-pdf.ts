import puppeteer from "puppeteer";

export async function generateResumePDF(origin: string): Promise<Buffer> {
  const url = `${origin.replace(/\/$/, "")}/resume?print=1`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    await page.evaluate(() => document.fonts.ready);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

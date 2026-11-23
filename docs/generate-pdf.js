const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, "notes.html");
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0", timeout: 30000 });

  const outputPath = path.resolve(__dirname, "create-devkit-cli-notes.pdf");

  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
    displayHeaderFooter: false,
  });

  console.log(`✅ PDF generated: ${outputPath}`);
  await browser.close();
})();

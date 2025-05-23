const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Helper function to check file access asynchronously
function checkFileAccess(filePath) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (err) {
        reject(new Error("File is not accessible"));
      } else {
        resolve("File is accessible");
      }
    });
  });
}

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--allow-file-access-from-files', '--disable-web-security']
    });
    const page = await browser.newPage();

    // const filepath = "D:/JiBe_Enterprise_Automation_Framework/allure-report/awesome/index.html";
    const filepath='D:/JiBe_Enterprise_Automation_Framework/playwright-report/index.html';
    
    const fileUrl = `file:///${filepath.replace(/\\/g, '/')}`;

    // Check if file is accessible before proceeding
    await checkFileAccess(filepath);
    console.log("File is accessible!");

    // Now that we've verified the file exists, try navigating to the file
    await page.goto(fileUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Ensure the content is loaded and visible
    await page.evaluate(() => {
      const bodyContent = document.querySelector("body").innerHTML;
      if (!bodyContent) {
        throw new Error("Content not loaded");
      }
    });

    // Generate the PDF from the page
    await page.pdf({ path: "allure-reports1.pdf", format: "A4" });
    console.log("PDF is generated");
    await browser.close();
  } catch (err) {
    console.error("Error during PDF generation:", err);
  }
})();
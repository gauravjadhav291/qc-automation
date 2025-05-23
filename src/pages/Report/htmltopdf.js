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

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false, // Run in non-headless mode for debugging
      args: ['--allow-file-access-from-files', '--disable-web-security']
    });
    const page = await browser.newPage();

    const filepath = "D:/JiBe_Enterprise_Automation_Framework/playwright-report/index.html";
    const fileUrl = `file:///${filepath.replace(/\\/g, '/')}`;

    // Check if file is accessible before proceeding
    await checkFileAccess(filepath);
    console.log("File is accessible!");

    // Now that we've verified the file exists, try navigating to the file
    await page.goto(fileUrl, {
      waitUntil: "networkidle0", // Wait for network to be idle
      timeout: 60000,
    });

    // Ensure the video element is loaded and visible
    await page.waitForSelector('video', { timeout: 120000 }); // Increased timeout to 120 seconds
    const videoElement = await page.$('video');
    if (!videoElement) {
      throw new Error("Video element not found");
    }

    const isVisible = await videoElement.evaluate(video => video.offsetWidth > 0 && video.offsetHeight > 0);
    if (!isVisible) {
      throw new Error("Video element is not visible");
    }

    // Capture multiple screenshots of the video
    const screenshots = [];
    for (let i = 0; i < 2; i++) {
      await sleep(1000); // Wait for 1 second
      const screenshotPath = `video_screenshot_${i}.png`;
      await videoElement.screenshot({ path: screenshotPath });
      screenshots.push(screenshotPath);
    }

    // Generate the PDF from the page
    await page.pdf({ path: "allure-reports1.pdf", format: "A4" });
    console.log("PDF with screenshots is generated");
    await browser.close();
  } catch (err) {
    console.error("Error during PDF generation:", err);

    // Additional debugging: capture a screenshot and page content
    if (page) {
      await page.screenshot({ path: 'error_screenshot.png' });
      const content = await page.content();
      fs.writeFileSync('error_page.html', content);
      console.log("Captured screenshot and page content for debugging");
    }
  }
})();
 
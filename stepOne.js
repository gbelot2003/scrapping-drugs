const puppeteer = require("puppeteer");
const writeFile = require('./misc/writefiles');

const firstStep = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.drugs.com/drug_information.html");
  
    const html = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".ddc-paging a")).map(x => x.href);
    });
  
    await writeFile("./downloads/masterlist.txt", html);
    console.log("masterlist created");
    await browser.close();
  
}

module.exports = firstStep;
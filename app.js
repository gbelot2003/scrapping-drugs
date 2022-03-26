const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.drugs.com", {
        waitUntil: "networkidle2"
    });

    //await page.screenshot({ path: "example.png" });
    //const html = await page.$eval("html", e => e.outerHTML);
    const html = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.top100list a')).map(x => x.href);
    });


    console.log(html);

    await browser.close();
})();

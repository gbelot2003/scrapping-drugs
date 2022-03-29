import puppeteer from 'puppeteer';
import { writeFiles }  from './misc/handleFiles';
import * as dotenv from 'dotenv';
dotenv.config();

const SteepOne = async () => {
    const initWebsite: string = (process.env["INI_WEBSITE"] as string);

    console.log("starting the scanning process, please wait...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(initWebsite);

    const html: any = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".ddc-paging a")).map(x => x.getAttribute('href'));
    });

    await writeFiles("./downloads/masterlist.txt", html);
    console.log("masterlist created");
    await browser.close();
}

export { SteepOne };
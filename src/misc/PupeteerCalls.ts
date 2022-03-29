import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
dotenv.config();

export class PupeteerCalls{

    async firstCall() : Promise<any> {
        const initWebsite: string = (process.env["INI_WEBSITE"] as string);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(initWebsite);
    
        const html: any = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".ddc-paging a")).map(x => x.getAttribute('href'));
        });

        await browser.close();

        return html;
    }

    async secundCall() : promise<any> {
        
    }

}
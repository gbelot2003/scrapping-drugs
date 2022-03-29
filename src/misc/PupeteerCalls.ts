import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
dotenv.config();

export class PupeteerCalls {

    async firstCall(): Promise<any> {
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

    async secundCall(url: string, timer: number): Promise<any> {
        const baseUrl: string = (process.env["BASE_URL"] as string);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        const current: string = `${baseUrl}${url}`;
        await page.goto(current, { waitUntil: "networkidle2" });

        const html: any = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".ddc-paging a")).map(
                x => x.getAttribute('href')
            );
        }); 
        
        const title: string = await page.title();
        await page.waitForTimeout(timer);
        await browser.close();

        return {html, title};
    }

}
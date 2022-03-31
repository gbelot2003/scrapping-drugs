
import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
dotenv.config();

export class PupeteerCalls {

    public _baseUrl: string;

    constructor() {
        this._baseUrl = (process.env["INI_WEBSITE"] as string);;
    }

    protected get getBaseUrl(): string {
        return this._baseUrl;
    }

    /**
     * firstCall
     * @returns html : Array<any>
     */
    async firstCall(): Promise<any> {
        const time2wait: number = parseInt(process.env["TIME_WAIT"]);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(this.getBaseUrl);

        const title: string = await page.title();

        const html: any = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".ddc-paging a")).map(x => x.getAttribute('href'));
        });

        await page.waitForTimeout(time2wait);

        await browser.close();


        return html;
    }
}
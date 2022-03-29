
import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
dotenv.config();

export class PupeteerCalls {

    public _baseUrl: string

    constructor(baseUrl: string){
        this._baseUrl = baseUrl;
    }

    public get getBaseUrl() : string {
        return this._baseUrl;
    } 

    /**
     *  firstCall
     * @returns html
     */
         async firstCall(): Promise<any> {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(this.getBaseUrl);
    
            const html: any = await page.evaluate(() => {
                return Array.from(document.querySelectorAll(".ddc-paging a")).map(x => x.getAttribute('href'));
            });
    
            await browser.close();
    
            return html;
        }
}
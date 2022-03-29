import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
dotenv.config();

export class PupeteerCalls {

    private _baseUrl: string;

    public getUrl(): string {
        return this._baseUrl;
    }

    public setUrl(url: string): string {
        return this._baseUrl = url;
    }

    /**
     *  firstCall
     * @returns html
     */
    async firstCall(): Promise<any> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(this.getUrl());

        const html: any = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".ddc-paging a")).map(x => x.getAttribute('href'));
        });

        await browser.close();

        return html;
    }

    /**
     * SecundCall
     * @param url 
     * @param timer 
     * @returns 
     */
    async secundCall(url: string, timer: number): Promise<any> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const current: string = `${this.getUrl()}${url}`;
        await page.goto(current, { waitUntil: "networkidle2" });

        const html: any = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".ddc-paging a")).map(
                x => x.getAttribute('href')
            );
        });

        const title: string = await page.title();
        await page.waitForTimeout(timer);
        await browser.close();

        return { html, title };
    }

    /**
     * ThirdCall
     * @param url 
     * @param timer 
     * @returns 
     */
    async thirdCall(url: string, timer: number): Promise<any> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const current: string = `${this.getUrl()}${url}`;
        await page.goto(current, { waitUntil: "networkidle2" });
        const html: any = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".ddc-list-column-2 a")).map(
                x => x.getAttribute('href')
            );
        });

        const title: string = await page.title();
        await page.waitForTimeout(timer);
        await browser.close();

        return { html, title };
    }

    /**
     * ForthCall
     * @param url 
     * @param timer 
     * @returns 
     */
    async ForthCall(url: string, timer: number): Promise<any> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const current: string = `${this.getUrl()}${url}`;
        await page.goto(current, { waitUntil: "networkidle2" });

        const stitle: string = await page.title();
        const rtitle: string = stitle.replace("- Drugs.com", "");
        let title: string = rtitle.replace("/", "-");

        const paragraph = await page.evaluate(() => {
            if (document.querySelector("#dosage") !== null) {
                const status: any = document.querySelector("#dosage");
                const naam: any = document.querySelector("div.ddc-related-link");

                return [...document.querySelectorAll("p")]
                    .filter(
                        p =>
                            p.compareDocumentPosition(status) &
                            Node.DOCUMENT_POSITION_PRECEDING &&
                            p.compareDocumentPosition(naam) & Node.DOCUMENT_POSITION_FOLLOWING
                    )
                    .map(p => p.textContent);
            }
        });
        
        await page.waitForTimeout(timer);
        await browser.close();

        return { title, paragraph };
    }

}
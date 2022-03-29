import puppeteer from 'puppeteer';
import { writeFiles, readFiles } from '../misc/handleFiles';

const StepTwo = async () => {
    const stnumber: number = parseInt(process.env.ST_NUMBER);
    const baseUrl: string = (process.env["BASE_URL"] as string);

    console.log("Readding the masterlist file, please wait......");
    
    const arrayList: Array<any> = await readFiles("./downloads/masterlist.txt");
    let counter: number;

    stnumber === 0 ? counter = arrayList.length : counter = stnumber;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log("Starting the process of writing list files, please wait......");

    for (let i = 0; i < counter; i++) {
        const current: string = `${baseUrl}${arrayList[i]}`;
        await page.goto(current, { waitUntil: "networkidle2" });

        const html = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".ddc-paging a")).map(
                x => x.getAttribute('href')
            );
        });

        let filepath : string = "./list/" + i + ".txt";
        await writeFiles(filepath, html);
        console.log("writing list number " + i);
        await page.waitForTimeout(3000);

    }
}

export { StepTwo };
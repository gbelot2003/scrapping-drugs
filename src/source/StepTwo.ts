import puppeteer from 'puppeteer';
import { writeFiles, readFiles } from '../misc/handleFiles';
import { readdirSync, readFileSync } from 'fs'

const StepTwo = async () => {
    const stnumber: number = parseInt(process.env.ST_NUMBER);
    const baseUrl: string = (process.env["BASE_URL"] as string);
    const time2wait: number = parseInt(process.env["TIME_WAIT"]);


    console.log("Readding the masterlist file, please wait......");

    const arrayList: Array<string> = await readFiles("./downloads/masterlist.txt");
    
    let counter: number;
    let timer: number;

    stnumber === 0 ? counter = arrayList.length : counter = stnumber;
    time2wait === 0 ? timer = 1000 : timer = time2wait;

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

        let filepath: string = "./list/" + i + ".txt";
        await writeFiles(filepath, html);
        console.log("writing list number " + i);
        await page.waitForTimeout(timer);
    }
    await browser.close();
}

const processList = async () => {
    const dir: string = "./list";
    const lists: number = await readdirSync(dir).length;
    const tlists: number = (lists - 1);
    let bigArray: Array<any> = [];
    let filepath: string = "./downloads/sortedlist.txt";

    for (let i = 0; i < tlists; i++) {
        const data: string = await readFileSync("./list/" + i + ".txt", "utf8");
        bigArray = bigArray.concat(JSON.parse(data));
    }

    await writeFiles(filepath, bigArray);
    console.log("sorted list created");

}

export { StepTwo, processList };
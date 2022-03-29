import puppeteer from 'puppeteer';
import { writeFiles, readFiles } from '../misc/handleFiles';
import { readdirSync, readFileSync } from 'fs'


const StepThree = async () => {
    const stnumber: number = parseInt(process.env.STR_NUMBER);
    const baseUrl: string = (process.env["BASE_URL"] as string);
    const time2wait: number = parseInt(process.env["TIME_WAIT"]);

    console.log("Readding the sortedlist file, please wait......");

    const arrayList: Array<string> = await readFiles("./downloads/sortedlist.txt");

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
            return Array.from(document.querySelectorAll(".ddc-list-column-2 a")).map(
                x => x.getAttribute('href')
            );
        });

        const stitle: string = await page.title();
        let filepath: string = "./links/" + i + ".txt";
        await writeFiles(filepath, html);
        console.log("writing list file " + stitle);
        await page.waitForTimeout(timer);
    }
    await browser.close();
}

const processSorted = async () => {
    const dir: string = "./links";
    const list: number = await readdirSync(dir).length;
    const tlist: number = list - 1;
    let bigArray: Array<any> = [];
    let filepath: string = "./downloads/detailslist.txt";

    for (let i = 0; i < tlist; i++) {
        const data: string = await readFileSync("./links/" + i + ".txt", "utf8");
        bigArray = bigArray.concat(JSON.parse(data));
    }

    await writeFiles(filepath, bigArray);
    console.log("Detail list created.........");
}

export { StepThree, processSorted }
import puppeteer from 'puppeteer';
import { writeFiles, readFiles } from '../misc/handleFiles';
import { readdirSync, readFileSync } from 'fs'
import chalk, { Chalk } from 'chalk';

const StepThree = async () => {
    const stnumber: number = parseInt(process.env.STR_NUMBER);
    const baseUrl: string = (process.env["BASE_URL"] as string);
    const time2wait: number = parseInt(process.env["TIME_WAIT"]);
    const log: any = console.log;
    let counter: number;
    let timer: number;

    log(chalk.yellow("Readding the sortedlist file, ") + chalk.blue("please wait..."));

    const arrayList: Array<string> = await readFiles("./downloads/sortedlist.txt");



    stnumber === 0 ? counter = arrayList.length : counter = stnumber;
    time2wait === 0 ? timer = 1000 : timer = time2wait;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    log(chalk.yellow("Starting the process of writing list files, ") + chalk.blue("please wait..."));

    for (let i = 0; i < counter; i++) {
        const current: string = `${baseUrl}${arrayList[i]}`;
        await page.goto(current, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".ddc-list-column-2 a")).map(
                x => x.getAttribute('href')
            );
        });

        const stitle: string = await page.title();
        let filepath: string = `./links/${i}.txt`;
        await writeFiles(filepath, html);
        log(chalk.yellow("writing list file ") + chalk.green(stitle));
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
        const data: string = await readFileSync(`./links/${i}.txt`, "utf8");
        bigArray = bigArray.concat(JSON.parse(data));
    }

    await writeFiles(filepath, bigArray);
    console.log("Detail list created.........");
}

export { StepThree, processSorted }
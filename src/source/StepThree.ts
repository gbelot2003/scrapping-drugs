import { writeFiles, readFiles } from '../misc/handleFiles';
import { readdirSync, readFileSync } from 'fs'
import { PupeteerCalls } from '../misc/PupeteerCalls';
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

    log(chalk.yellow("Starting the process of writing list files, ") + chalk.blue("please wait..."));

    const html = new PupeteerCalls();
    html.setUrl(baseUrl);

    for (let i = 0; i < counter; i++) {
        
        const resolve: any = await html.thirdCall(arrayList[i], timer);
        const title: string = resolve.title;
        const data: any = resolve.html;

        let filepath: string = `./links/${i}.txt`;
        await writeFiles(filepath, data);
        log(chalk.yellow("writing list file ") + chalk.green(title));
    }
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
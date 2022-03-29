import { writeFiles, readFiles } from '../misc/handleFiles';
import { readdirSync, readFileSync } from 'fs'
import { PupeteerCalls } from '../misc/PupeteerCalls';
import chalk, { Chalk } from 'chalk';

const StepTwo = async () => {
    const stnumber: number = parseInt(process.env.ST_NUMBER);
    const time2wait: number = parseInt(process.env["TIME_WAIT"]);
    const baseUrl: string = (process.env["BASE_URL"] as string);
    const log: any = console.log;
    let counter: number;
    let timer: number;

    log(chalk.yellow("Readding the master list file, ") + chalk.blue("please wait..."));

    const arrayList: Array<string> = await readFiles("./downloads/masterlist.txt");

    stnumber === 0 ? counter = arrayList.length : counter = stnumber;
    time2wait === 0 ? timer = 1000 : timer = time2wait;

    log(chalk.yellow("Starting the process of writing list files,") + chalk.blue(" please wait..."));

    const html = new PupeteerCalls();
    html.setUrl(baseUrl);
    
    for (let i = 0; i < counter; i++) {
     
        const resolve: any = await html.secundCall(arrayList[i], timer);
        
        const title: string = resolve.title;
        const data: any = resolve.html;

        let filepath: string = `./list/${i}.txt`;
        await writeFiles(filepath, data);
        log(chalk.yellow("writing list ") + chalk.green(title));
       
    }
}

const processList = async () => {
    const dir: string = "./list";
    const lists: number = await readdirSync(dir).length;
    const tlists: number = (lists - 1);
    let bigArray: Array<any> = [];
    let filepath: string = "./downloads/sortedlist.txt";

    for (let i = 0; i < tlists; i++) {
        const data: string = await readFileSync(`./list/${i}.txt`, "utf8");
        bigArray = bigArray.concat(JSON.parse(data));
    }

    await writeFiles(filepath, bigArray);
    console.log(chalk.yellow("Sorted list created, ") + chalk.cyan("going to the third step..."));

}

export { StepTwo, processList };
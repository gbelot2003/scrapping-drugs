import { writeFiles, readFiles } from '../misc/handleFiles';
import { PupeteerCalls } from '../misc/PupeteerCalls';
import chalk, { Chalk } from 'chalk';

const StepFour = async () => {

    const stnumber: number = parseInt(process.env.SF_NUMBER);
    const time2wait: number = parseInt(process.env["TIME_WAIT"]);
    const log: any = console.log;
    let counter: number;
    let timer: number;

    log(chalk.yellow("Readding the details list file, ") + chalk.blue("please wait..."));

    const arrayList: Array<string> = await readFiles("./downloads/detailslist.txt");
    
    stnumber === 0 ? counter = arrayList.length : counter = stnumber;
    time2wait === 0 ? timer = 1000 : timer = time2wait;

    log(chalk.magenta("Starting the process of writing dosages files......"));
    log(chalk.magenta("depending of configuration this may take a litle long, please wait......"));

    const html: any = new PupeteerCalls();

    for (let i = 0; i < counter; i++) {
        
        const resolve: any = await html.ForthCall(arrayList[i], timer);
        const title: string = resolve.title;
        const paragraph: any = resolve.paragraph;

        let filepath: string = "./dosages/" + title + ".txt";
        if (paragraph === null || paragraph === undefined || paragraph.length === 0) {
            log(chalk.red("No DOM content for this entry ......"));
            counter++;
        } else {
            log(chalk.yellow("Writing dosage " + title));
            log(paragraph);
            writeFiles(filepath, paragraph);
        }
    }

    console.log(chalk.green("Finished process ") + chalk.greenBright('OK!!'));
}

export { StepFour }
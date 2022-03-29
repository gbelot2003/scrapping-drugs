import chalk, { Chalk } from 'chalk';
import { writeFiles }  from '../misc/handleFiles';
import { PupeteerCalls } from '../misc/PupeteerCalls';

const SteepOne = async () => {
    const log: any = console.log;

    log(chalk.yellow("Starting the scanning process,") + chalk.blue(" please wait..."));
    const pupet = new PupeteerCalls();
    const html: any = await pupet.firstCall();
    console.log(html);

    await writeFiles("./downloads/masterlist.txt", html);
    log(chalk.yellow("Master list created, ") + chalk.cyan("going to the second step..."));
    
}

export { SteepOne };
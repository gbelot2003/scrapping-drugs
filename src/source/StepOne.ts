import chalk, { Chalk } from 'chalk';
import { writeFiles }  from '../misc/handleFiles';
import { PupeteerCalls } from '../misc/PupeteerCalls';

const SteepOne = async () => {
    const log: any = console.log;
    const initWebsite: string = (process.env["INI_WEBSITE"] as string);

    log(chalk.yellow("Starting the scanning process,") + chalk.blue(" please wait..."));
    const pupet = new PupeteerCalls();
    pupet.setUrl(initWebsite);
    const html: any = await pupet.firstCall();
    log(html);

    await writeFiles("./downloads/masterlist.txt", html);
    log(chalk.yellow("Master list created, ") + chalk.cyan("going to the second step..."));
    
}

export { SteepOne };
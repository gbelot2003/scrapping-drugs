import chalk, { Chalk } from 'chalk';
import { writeFiles } from '../misc/handleFiles';
import { PupeteerCalls } from '../misc/PupeteerCalls';

export class StepOne {

    private url: string = (process.env["INI_WEBSITE"] as string);

    public async execute(): Promise<any> {

        console.log(chalk.yellow("Starting the scanning process,") + chalk.blue(" please wait..."));
        const pupet = new PupeteerCalls();
        pupet.setUrl(this.url);
        const html: any = await pupet.firstCall();
        console.log(html);

        await writeFiles("./downloads/masterlist.txt", html);
        console.log(chalk.yellow("Master list created, ") + chalk.cyan("going to the second step..."));
    }

}

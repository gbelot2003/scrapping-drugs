import chalk, { Chalk } from 'chalk';
import { HandleFiles } from '../misc/handleFiles';
import { PupeteerCalls } from '../misc/PupeteerCalls';

export class StepOne {

    public async execute(): Promise<any> {

        console.log(chalk.yellow("Starting the scanning process,") + chalk.blue(" please wait..."));
        const pupet = new PupeteerCalls();
        const request: any = await pupet.firstCall();
        console.log(request.html);

        const handleFiles = new HandleFiles();

        await console.log(chalk.yellow("About to create master list"));
        await handleFiles.writeFiles("./downloads/masterlist.txt", request.html);
        
    }
}
import chalk, { Chalk } from 'chalk';
import { HandleFiles } from '../misc/handleFiles';
import { PupeteerCalls } from '../misc/PupeteerCalls';

export class StepOne {

    private handleFiles = new HandleFiles()
    private pupet = new PupeteerCalls();

    public async execute(): Promise<any> {

        console.log(chalk.yellow("Starting the scanning process,") + chalk.blue(" please wait..."));
        
        const request: any = await this.pupet.firstCall();
        console.log(request.html);

        await console.log(chalk.yellow("About to create master list"));
        await this.handleFiles.writeFiles("./downloads/masterlist.txt", request.html);
        
    }
}
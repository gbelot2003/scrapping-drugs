import chalk, { Chalk } from 'chalk';
import { HandleFiles } from '../misc/handleFiles';
import { PupeteerCalls } from '../misc/PupeteerCalls';

export class StepOne {

    private handleFiles = new HandleFiles()
    private pupet = new PupeteerCalls();
    private _storePath: string;

    constructor(source: string = ''){
        this.setStorePath(source);
    }

    private get getStorePath() : string {
        return this._storePath;
    }

    public setStorePath(source: string = "") : string {
        if(!source){
            return this._storePath = "./downloads/masterlist.txt"
        } else {
            return this._storePath = source;
        }
    }

    public async execute(): Promise<any> {
        console.log(chalk.yellow("Starting the scanning process,") + chalk.blue(" please wait..."));
        
        const request: any = await this.pupet.firstCall();
        console.log(request.html);

        await console.log(chalk.yellow("About to create master list"));
        console.log(this.getStorePath);
        await this.handleFiles.writeFiles(this.getStorePath, request.html);
        
    }
}
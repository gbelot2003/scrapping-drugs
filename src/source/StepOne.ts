import chalk, { Chalk } from 'chalk';
import { HandleFiles } from '../misc/handleFiles';
import { PupeteerCalls } from '../misc/PupeteerCalls';

export class StepOne {

    private _handleFiles = new HandleFiles()
    private _pupet = new PupeteerCalls();
    private _storePath: string;

    constructor(source: string = '') {
        this.setStorePath(source);
    }

    private get getStorePath(): string {
        return this._storePath;
    }

    /**
     * setStorePath
     * Set path for source to store list path
     * @param source 
     * @returns 
     */
    public setStorePath(source: string = ""): string {
        if (!source) {
            return this._storePath = "./downloads/masterlist.txt"
        } else {
            return this._storePath = source;
        }
    }

    /**
     * execute
     * Method to execure the class
     */
    public async execute(): Promise<any> {
        console.log(chalk.yellow("Starting the scanning process,") + chalk.blue(" please wait..."));

        const request: any = await this._pupet.firstCall();
        console.log(request.html);

        await console.log(chalk.yellow("About to create master list"));
        console.log(this.getStorePath);
        await this._handleFiles.writeFiles(this.getStorePath, request.html);

    }
}
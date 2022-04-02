import { HandleFiles } from '../misc/handleFiles';
import { PupeteerCalls } from '../misc/PupeteerCalls';
import chalk, { Chalk } from 'chalk';

export class StepFour {

    private _stnumber: number = parseInt(process.env.SF_NUMBER);
    private _time2wait: number = parseInt(process.env["TIME_WAIT"]);
    private _results: any = new PupeteerCalls();
    private _handle: any = new HandleFiles();
    private _sourcePath: string;

    constructor(dsource: string = '') {
        this.setSourcePath(dsource);
    }

    /**
     * getSourcePath
     */
    private get getSourcePath(): string {
        return this._sourcePath;
    }

    /**
     * setSourcePath
     * Set path for source list to read
     * @param source 
     * @returns 
     */
    public setSourcePath(source: string = ''): string {
        if (!source) {
            return this._sourcePath = "./downloads/detailslist.txt"
        } else {
            return this._sourcePath = source;
        }
    }

    /**
     * Execute
     * Method to execure the class
     */
    public async execute(): Promise<any> {
        let counter: number;
        let timer: number;

        console.log(chalk.yellow("Readding the details list file, ") + chalk.blue("please wait..."));

        const arrayList: Array<string> = await this._handle.readFiles(this.getSourcePath);

        this._stnumber === 0 ? counter = arrayList.length : counter = this._stnumber;
        this._time2wait === 0 ? timer = 3000 : timer = this._time2wait;

        console.log(chalk.magenta("Starting the process of writing dosages files......"));
        console.log(chalk.magenta("depending of configuration this may take a litle long, please wait......"));

        for (let i = 0; i < counter; i++) {

            const resolve: any = await this._results.ForthCall(arrayList[i], timer);
            const title: string = resolve.title;
            const paragraph: any = resolve.paragraph;

            let filepath: string = "./dosages/" + title + ".txt";
            if (paragraph === null || paragraph === undefined || paragraph.length === 0) {
                console.log(chalk.red("No DOM content for this entry, ") + chalk.green('adding one loop to compensate....'));
                counter++;
            } else {
                console.log(chalk.yellow("Writing dosage " + title));
                console.log(paragraph);
                this._handle.writeFiles(filepath, paragraph);
            }
        }

        console.log(chalk.green("Finished process ") + chalk.greenBright('OK!!'));

        process.exit(0);
    }
}
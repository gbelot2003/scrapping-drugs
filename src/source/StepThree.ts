import { HandleFiles } from '../misc/handleFiles';
import { PupeteerCalls } from '../misc/PupeteerCalls';
import { ProcessList } from '../misc/ProcessList';
import chalk, { Chalk } from 'chalk';

export class StepThree {

    private _stnumber: number = parseInt(process.env.ST_NUMBER);
    private _time2wait: number = parseInt(process.env["TIME_WAIT"]);
    private _results: any = new PupeteerCalls();
    private _handle: any = new HandleFiles();
    private _storePath: string;
    private _sourcePath: string;

    constructor(dsource: string = '', source: string = '') {
        this.setStorePath(source);
        this.setSourcePath(dsource);
    }

    private get getStorePath(): string {
        return this._storePath;
    }

    private get getSourcePath(): string {
        return this._sourcePath;
    }

    public setStorePath(source: string = ""): string {
        if (!source) {
            return this._storePath = "./downloads/detailslist.txt"
        } else {
            return this._storePath = source;
        }
    }

    public setSourcePath(source: string = ''): string {
        if (!source) {
            return this._storePath = "./downloads/sortedlist.txt"
        } else {
            return this._storePath = source;
        }
    }

    public async execute(): Promise<any> {
        let counter: number;
        let timer: number;
        console.log(chalk.yellow("Readding the sortedlist file, ") + chalk.blue("please wait..."));

        const arrayList: Array<string> = await this._handle.readFiles(this.getSourcePath);

        this._stnumber === 0 ? counter = arrayList.length : counter = this._stnumber;
        this._time2wait === 0 ? timer = 1000 : timer = this._time2wait;

        console.log(chalk.yellow("Starting the process of writing list files, ") + chalk.blue("please wait..."));

        for (let i = 0; i < counter; i++) {

            const resolve: any = await this._results.thirdCall(arrayList[i], timer);
            const title: string = resolve.title;
            const data: any = resolve.html;

            let filepath: string = `./links/${i}.txt`;
            await this._handle.writeFiles(filepath, data);
            console.log(chalk.yellow("writing list file ") + chalk.green(title));
        }
        try {
            const processList: any = new ProcessList("./links", this.getStorePath);
            await processList.process();
            console.log(chalk.blue("Detail list created........."));
        } catch (error) {
            console.log(error);
            process.exit(0);
        }

    }

}
import { HandleFiles } from '../misc/handleFiles';
import { readdirSync, readFileSync } from 'fs'
import { PupeteerCalls } from '../misc/PupeteerCalls';
import { ProcessList } from '../misc/ProcessList';
import chalk, { Chalk } from 'chalk';

export class StepThree {

    private stnumber: number = parseInt(process.env.ST_NUMBER);
    private time2wait: number = parseInt(process.env["TIME_WAIT"]);
    private results: any = new PupeteerCalls();
    private handle: any = new HandleFiles();

    public async execute(): Promise<any> {
        let counter: number;
        let timer: number;
        console.log(chalk.yellow("Readding the sortedlist file, ") + chalk.blue("please wait..."));

        const arrayList: Array<string> = await this.handle.readFiles("./downloads/sortedlist.txt");

        this.stnumber === 0 ? counter = arrayList.length : counter = this.stnumber;
        this.time2wait === 0 ? timer = 1000 : timer = this.time2wait;

        console.log(chalk.yellow("Starting the process of writing list files, ") + chalk.blue("please wait..."));

        for (let i = 0; i < counter; i++) {

            const resolve: any = await this.results.thirdCall(arrayList[i], timer);
            const title: string = resolve.title;
            const data: any = resolve.html;

            let filepath: string = `./links/${i}.txt`;
            await this.handle.writeFiles(filepath, data);
            console.log(chalk.yellow("writing list file ") + chalk.green(title));
        }
        try {
            const processList: any = new ProcessList("./links", "./downloads/detailslist.txt");
            await processList.process();
            console.log(chalk.blue("Detail list created........."));
        } catch (error) {
            console.log(error);
        }

    }

}
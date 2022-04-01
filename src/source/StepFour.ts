import { HandleFiles } from '../misc/handleFiles';
import { PupeteerCalls } from '../misc/PupeteerCalls';
import chalk, { Chalk } from 'chalk';

export class StepFour {

    private stnumber: number = parseInt(process.env.SF_NUMBER);
    private time2wait: number = parseInt(process.env["TIME_WAIT"]);
    private results: any = new PupeteerCalls();
    private handle : any = new HandleFiles();

    public async execute(): Promise<any> {
        let counter: number;
        let timer: number;

        console.log(chalk.yellow("Readding the details list file, ") + chalk.blue("please wait..."));

        const arrayList: Array<string> = await this.handle.readFiles("./downloads/detailslist.txt");

        this.stnumber === 0 ? counter = arrayList.length : counter = this.stnumber;
        this.time2wait === 0 ? timer = 1000 : timer = this.time2wait;

        console.log(chalk.magenta("Starting the process of writing dosages files......"));
        console.log(chalk.magenta("depending of configuration this may take a litle long, please wait......")); 

        for (let i = 0; i < counter; i++) {
        
            const resolve: any = await this.results.ForthCall(arrayList[i], timer);
            const title: string = resolve.title;
            const paragraph: any = resolve.paragraph;
    
            let filepath: string = "./dosages/" + title + ".txt";
            if (paragraph === null || paragraph === undefined || paragraph.length === 0) {
                console.log(chalk.red("No DOM content for this entry, ") + chalk.green('adding one loop to compensate....'));
                counter++;
            } else {
                console.log(chalk.yellow("Writing dosage " + title));
                console.log(paragraph);
                this.handle.writeFiles(filepath, paragraph);
            }
        }
        
        console.log(chalk.green("Finished process ") + chalk.greenBright('OK!!'));

        process.exit(0);
    }
}
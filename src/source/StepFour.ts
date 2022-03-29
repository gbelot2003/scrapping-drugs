import puppeteer from 'puppeteer';
import { writeFiles, readFiles } from '../misc/handleFiles';
import chalk, { Chalk } from 'chalk';

const StepFour = async () => {

    const stnumber: number = parseInt(process.env.SF_NUMBER);
    const baseUrl: string = (process.env["BASE_URL"] as string);
    const time2wait: number = parseInt(process.env["TIME_WAIT"]);
    const log: any = console.log;
    let counter: number;
    let timer: number;

    log(chalk.yellow("Readding the details list file, ") + chalk.blue("please wait..."));

    const arrayList: Array<string> = await readFiles("./downloads/detailslist.txt");
    
    stnumber === 0 ? counter = arrayList.length : counter = stnumber;
    time2wait === 0 ? timer = 1000 : timer = time2wait;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    log(chalk.magenta("Starting the process of writing dosages files......"));
    log(chalk.magenta("depending of configuration this may take a litle long, please wait......"));

    for (let i = 0; i < counter; i++) {
        const current: string = `${baseUrl}${arrayList[i]}`;
        await page.goto(current, { waitUntil: "networkidle2" });
        const stitle: string = await page.title();
        const rtitle: string = stitle.replace("- Drugs.com", "");
        let title: string = rtitle.replace("/", "-");


        const paragraph = await page.evaluate(() => {
            if (document.querySelector("#dosage") !== null) {
                const status: any = document.querySelector("#dosage");
                const naam: any = document.querySelector("div.ddc-related-link");

                return [...document.querySelectorAll("p")]
                    .filter(
                        p =>
                            p.compareDocumentPosition(status) &
                            Node.DOCUMENT_POSITION_PRECEDING &&
                            p.compareDocumentPosition(naam) & Node.DOCUMENT_POSITION_FOLLOWING
                    )
                    .map(p => p.textContent);
            }
        });

        let filepath: string = "./dosages/" + title + ".txt";
        if (paragraph === null || paragraph === undefined || paragraph.length === 0) {
            log(chalk.red("No DOM content for this entry ......"));
        } else {
            log(chalk.yellow("Writing dosage " + title));
            log(paragraph);
            writeFiles(filepath, paragraph);
        }

        await page.waitForTimeout(timer);
    }

    await browser.close();
    console.log(chalk.green("Finished process ") + chalk.greenBright('OK!!'));
}

export { StepFour }
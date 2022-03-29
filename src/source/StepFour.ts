import puppeteer from 'puppeteer';
import { writeFiles, readFiles } from '../misc/handleFiles';
import { readdirSync, readFileSync } from 'fs'

const StepFour = async () => {

    const stnumber: number = parseInt(process.env.SF_NUMBER);
    const baseUrl: string = (process.env["BASE_URL"] as string);
    const time2wait: number = parseInt(process.env["TIME_WAIT"]);

    console.log("Readding the details list file, please wait......");

    const arrayList: Array<string> = await readFiles("./downloads/detailslist.txt");
    
    let counter: number;
    let timer: number;

    stnumber === 0 ? counter = arrayList.length : counter = stnumber;
    time2wait === 0 ? timer = 1000 : timer = time2wait;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log("Starting the process of writing dosages files......");
    console.log(
        "depending of configuration this may take a litle long, please wait......"
    );

    for (let i = 0; i < counter; i++) {
        const current: string = `${baseUrl}${arrayList[i]}`;
        await page.goto(current, { waitUntil: "networkidle2" });
        const stitle: string = await page.title();
        let title: string = stitle.replace("/", "-");

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
            console.log("No DOM content for this entry ......");
        } else {
            console.log("Writing dosage " + title);
            console.log(paragraph);
            writeFiles(filepath, paragraph);
        }

        await page.waitForTimeout(timer);
    }

    await browser.close();
}

export { StepFour }
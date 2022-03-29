import puppeteer from 'puppeteer';
import chalk, { Chalk } from 'chalk';
import { writeFiles }  from '../misc/handleFiles';

const SteepOne = async () => {
    const initWebsite: string = (process.env["INI_WEBSITE"] as string);
    const log: any = console.log;

    log(chalk.yellow("Starting the scanning process,") + chalk.blue(" please wait..."));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(initWebsite);

    const html: any = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".ddc-paging a")).map(x => x.getAttribute('href'));
    });

    await writeFiles("./downloads/masterlist.txt", html);
    log(chalk.yellow("Master list created, ") + chalk.cyan("going to the second step..."));
    await browser.close();
}

export { SteepOne };
const puppeteer = require("puppeteer");
const fs = require("fs");
const readdirSync = fs.readdirSync;
const readFiles = require("./misc/readFiles");
const writeFile = require("./misc/writeFiles");
let i = 0;

const stepTwo = async () => {
  const arrayList = await readFiles("./downloads/masterlist.txt");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for(let i = 0; i < 3; i++){
    const current = arrayList[i];
    await page.goto(current, { waitUntil: 'networkidle2' });
    const html = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".ddc-paging a")).map(
        x => x.href
      );
    });

    let filepath = "./list/" + i + ".txt";
    await writeFile(filepath, html);
    console.log("next list " + i);
    await page.waitForTimeout(6000);
  }

  await browser.close();
  
};

const processList = async () => {
    const dir = "./list";
    const lists = await readdirSync(dir).length;
    console.log(lists);
    let bigArray = [];

    for (let i = 0; i < lists; i++) {
        const data = await fs.readFileSync("./list/" + i + ".txt", "utf8");
        prelistArray = data.replace(/'/g, '"');
        listArray = JSON.parse(prelistArray);
        bigArray.push(listArray[i]);
    }

    let filepath = "./downloads/sortedlist.txt";

    await writeFile(filepath, bigArray);
    console.log("sorted list created");

}

exports.stepTwo = stepTwo;
exports.processList = processList


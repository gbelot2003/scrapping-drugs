const puppeteer = require("puppeteer");
const fs = require("fs");
const readdirSync = fs.readdirSync;
const readFiles = require("../misc/readFiles");
const writeFile = require("../misc/writeFiles");

const stepTwo = async () => {
  console.log("Readding the masterlist file, please wait......");

  const arrayList = await readFiles("./downloads/masterlist.txt");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log("Starting the process of writing list files, please wait......");
  for (let i = 0; i < 3; i++) {
    const current = arrayList[i];
    await page.goto(current, { waitUntil: "networkidle2" });
    const html = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".ddc-paging a")).map(
        x => x.href
      );
    });

    let filepath = "./list/" + i + ".txt";
    await writeFile(filepath, html);
    console.log("writing list number " + i);
    await page.waitForTimeout(3000);
  }

  await browser.close();
};

const processList = async () => {
  const dir = "./list";
  const lists = await readdirSync(dir).length;
  const tlist = lists - 1;
  let bigArray = [];
  let filepath = "./downloads/sortedlist.txt";


  for (let i = 0; i < tlist; i++) {
    const data = await fs.readFileSync("./list/" + i + ".txt", "utf8");
    bigArray.push(JSON.parse(data));
  }

  await writeFile(filepath, bigArray);
  console.log("sorted list created");
};

const eliminateDuplicates = async () => {
 
};

exports.stepTwo = stepTwo;
exports.processList = processList;
exports.eliminateDuplicates = eliminateDuplicates;
